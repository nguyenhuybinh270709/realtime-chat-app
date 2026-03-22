import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import { conversationSelect } from "@/types/conversation";
import { sortParticipants } from "@/utils/conversation.utils";
import {
  conversationDtoSchema,
  conversationRemovedReasonEnum,
  conversationRoleEnum,
  createConversationCreatedPayload,
  createConversationInputSchema,
  createConversationRemovedPayload,
  createConversationUpdatedPayload,
  participantLeftAction,
  roleUpdatedAction,
  SOCKET_EVENTS,
  type ConversationDTO,
} from "@realtime-chat-app/shared";
import { z } from "zod";

export const createConversationService = async (
  body: unknown,
  currentUserId: string,
): Promise<ConversationDTO> => {
  const parseResult = createConversationInputSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError(
      400,
      "Validation failed",
      z.flattenError(parseResult.error),
    );
  }

  const { conversationName, userIds } = parseResult.data;

  // Remove duplicates & exclude current user
  const otherParticipantIds = [...new Set(userIds)].filter(
    (id) => id !== currentUserId,
  );

  if (otherParticipantIds.length === 0) {
    throw createError(400, "At least one other user is required");
  }

  const participantIds = [currentUserId, ...otherParticipantIds];
  const isGroup = participantIds.length > 2;

  // Check existing 1-1 conversation
  if (!isGroup) {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: {
            userId: { in: [currentUserId, otherParticipantIds[0]] },
          },
        },
      },
      select: conversationSelect,
    });

    if (
      existingConversation &&
      existingConversation.participants.length === 2
    ) {
      return conversationDtoSchema.parse(existingConversation);
    }
  }

  const participants = await prisma.user.findMany({
    where: { id: { in: participantIds } },
    select: { id: true, displayName: true },
  });

  if (participants.length !== participantIds.length) {
    throw createError(400, "One or more participants not found");
  }

  const resolvedConversationName =
    conversationName ??
    (isGroup ? participants.map((p) => p.displayName).join(", ") : null);

  const participantCreateInputs = participantIds.map((id) => ({
    userId: id,
    ...(isGroup && {
      role:
        id === currentUserId
          ? conversationRoleEnum.enum.owner
          : conversationRoleEnum.enum.member,
    }),
  }));

  const conversation = await prisma.conversation.create({
    data: {
      conversationName: resolvedConversationName,
      isGroup,
      participants: {
        create: participantCreateInputs,
      },
    },
    select: conversationSelect,
  });

  const finalConversation = {
    ...conversation,
    participants: sortParticipants(conversation.participants),
  };

  const io = getIO();

  participantIds.forEach((userId) => {
    const payload = createConversationCreatedPayload({
      conversation: finalConversation,
    });

    io.to(userId).emit(SOCKET_EVENTS.CONVERSATION.CREATED, payload);
  });

  return conversationDtoSchema.parse(finalConversation);
};

export const getConversationsService = async (
  currentUserId: string,
): Promise<ConversationDTO[]> => {
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    select: conversationSelect,
    orderBy: [
      {
        lastMessageAt: {
          sort: "desc",
          nulls: "last",
        },
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const sortedConversations = conversations.map((conversation) => ({
    ...conversation,
    participants: sortParticipants(conversation.participants),
  }));

  return conversationDtoSchema.array().parse(sortedConversations);
};

export const getConversationByIdService = async (
  currentUserId: string,
  conversationId: string,
): Promise<ConversationDTO> => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    select: conversationSelect,
  });

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  const sortedConversation = {
    ...conversation,
    participants: sortParticipants(conversation.participants),
  };

  return conversationDtoSchema.parse(sortedConversation);
};

export const deleteGroupService = async (
  conversationId: string,
  currentUserId: string,
): Promise<void> => {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: {
      isGroup: true,
      participants: {
        select: {
          userId: true,
          role: true,
        },
      },
    },
  });

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  if (!conversation.isGroup) {
    throw createError(400, "You cannot delete a direct conversation");
  }

  const currentUserParticipant = conversation.participants.find(
    (participant) => participant.userId === currentUserId,
  );

  if (
    !currentUserParticipant ||
    currentUserParticipant.role !== conversationRoleEnum.enum.owner
  ) {
    throw createError(403, "Only the group owner can delete this conversation");
  }

  const allParticipantIds = conversation.participants.map(
    (participant) => participant.userId,
  );

  await prisma.conversation.delete({
    where: { id: conversationId },
  });

  const payload = createConversationRemovedPayload({
    conversationId,
    reason: conversationRemovedReasonEnum.enum.GROUP_DELETED,
  });

  const io = getIO();

  allParticipantIds.forEach((userId) => {
    io.to(userId).emit(SOCKET_EVENTS.CONVERSATION.REMOVED, payload);
  });
};

export const leaveGroupService = async (
  conversationId: string,
  currentUserId: string,
): Promise<void> => {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: {
      isGroup: true,
      participants: {
        select: {
          userId: true,
          role: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }
  if (!conversation.isGroup) {
    throw createError(400, "Cannot leave direct chat");
  }

  const currentUserParticipant = conversation.participants.find(
    (participant) => participant.userId === currentUserId,
  );

  if (!currentUserParticipant) {
    throw createError(403, "You are not a member of this group");
  }

  const remainingParticipants = conversation.participants.filter(
    (participant) => participant.userId !== currentUserId,
  );

  const remainingUserIds = remainingParticipants.map(
    (participant) => participant.userId,
  );

  const result = await prisma.$transaction(async (tx) => {
    await tx.conversationParticipant.delete({
      where: {
        userId_conversationId: {
          userId: currentUserId,
          conversationId: conversationId,
        },
      },
    });

    if (currentUserParticipant.role === conversationRoleEnum.enum.owner) {
      const nextOwner = remainingParticipants[0];

      if (!nextOwner) {
        await tx.conversation.delete({ where: { id: conversationId } });
        return { type: "GROUP_DELETED" as const };
      }

      await tx.conversationParticipant.update({
        where: {
          userId_conversationId: {
            userId: nextOwner.userId,
            conversationId: conversationId,
          },
        },
        data: { role: conversationRoleEnum.enum.owner },
      });

      return {
        type: "OWNER_TRANSFERRED" as const,
        newOwnerId: nextOwner.userId,
      };
    }

    return { type: "LEFT" as const };
  });

  const io = getIO();

  if (result.type === "GROUP_DELETED") {
    const payload = createConversationRemovedPayload({
      conversationId: conversationId,
      reason: conversationRemovedReasonEnum.enum.GROUP_DELETED,
    });

    io.to(currentUserId).emit(SOCKET_EVENTS.CONVERSATION.REMOVED, payload);
    return;
  }

  const removedPayload = createConversationRemovedPayload({
    conversationId: conversationId,
    reason: conversationRemovedReasonEnum.enum.LEFT,
  });

  io.to(currentUserId).emit(SOCKET_EVENTS.CONVERSATION.REMOVED, removedPayload);

  const updatedPayload = createConversationUpdatedPayload({
    conversationId: conversationId,
    actions: [
      participantLeftAction(currentUserId),
      ...(result.type === "OWNER_TRANSFERRED"
        ? [
            roleUpdatedAction(
              result.newOwnerId,
              conversationRoleEnum.enum.owner,
            ),
          ]
        : []),
    ],
  });

  remainingUserIds.forEach((userId) => {
    io.to(userId).emit(SOCKET_EVENTS.CONVERSATION.UPDATED, updatedPayload);
  });
};
