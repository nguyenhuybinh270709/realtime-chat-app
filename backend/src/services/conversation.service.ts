import { createError } from "@/errors/app.error";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { createConversationSchema } from "@/schema/conversation.schema";
import z from "zod";

export const createConversationService = async (
  body: unknown,
  currentUserId: string,
) => {
  const parseResult = createConversationSchema.safeParse(body);

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
        AND: [
          { participants: { some: { userId: currentUserId } } },
          { participants: { some: { userId: otherParticipantIds[0] } } },
        ],
      },
      include: {
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    if (
      existingConversation &&
      existingConversation._count.participants === 2
    ) {
      const { _count, ...conversation } = existingConversation;
      return conversation;
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
    role: id === currentUserId ? Role.owner : Role.member,
  }));

  const conversation = await prisma.conversation.create({
    data: {
      conversationName: resolvedConversationName,
      isGroup,
      participants: {
        create: participantCreateInputs,
      },
    },
  });

  return conversation;
};

export const getConversationsService = async (currentUserId: string) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    select: {
      id: true,
      conversationName: true,
      isGroup: true,
      lastMessagePreview: true,
      lastMessageAt: true,
      createdAt: true,
      participants: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              displayName: true,
              profileImage: true,
            },
          },
        },
      },
    },
    orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
  });

  return conversations;
};

export const getConversationByIdService = async (
  currentUserId: string,
  conversationId: string,
) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    select: {
      id: true,
      conversationName: true,
      isGroup: true,
      lastMessagePreview: true,
      lastMessageAt: true,
      createdAt: true,
      participants: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              displayName: true,
              profileImage: true,
              bio: true,
            },
          },
        },
      },
    },
  });

  if (!conversation) {
    throw createError(404, "Conversation not found");
  }

  return conversation;
};
