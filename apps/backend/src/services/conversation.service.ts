import { createError } from "@/errors/app.error";

import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import { conversationSelect } from "@/types/conversation";
import {
  conversationDtoSchema,
  conversationRoleEnum,
  createConversationInputSchema,
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

  participantIds.forEach((userId) => {
    getIO().to(userId).emit(SOCKET_EVENTS.CONVERSATION.CREATED, {
      conversation,
    });
  });

  return conversationDtoSchema.parse(conversation);
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

  return conversationDtoSchema.array().parse(conversations);
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

  return conversationDtoSchema.parse(conversation);
};

export const deleteGroupConversationService = async (
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

  allParticipantIds.forEach((userId) => {
    getIO().to(userId).emit(SOCKET_EVENTS.CONVERSATION.DELETED, {
      conversationId,
    });
  });
};
