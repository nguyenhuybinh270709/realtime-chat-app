import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import {
  messageDtoSchema,
  SOCKET_EVENTS,
  type MessageDTO,
} from "@realtime-chat-app/shared";

export const createMessageService = async (
  body: string,
  conversationId: string,
  senderId: string,
): Promise<MessageDTO> => {
  const isParticipant = await prisma.conversationParticipant.findFirst({
    where: { conversationId: conversationId, userId: senderId },
  });
  if (!isParticipant) {
    throw createError(403, "You are not in this conversation");
  }

  const message = await prisma.$transaction(async (tx) => {
    const message = await tx.message.create({
      data: {
        body,
        conversationId,
        senderId,
      },
      include: {
        sender: {
          select: {
            id: true,
            displayName: true,
            profileImage: true,
          },
        },
      },
    });

    await tx.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessagePreview: message.body,
        lastMessageAt: message.createdAt,
      },
    });

    return message;
  });

  const participants = await prisma.conversationParticipant.findMany({
    where: { conversationId },
    select: { userId: true },
  });

  getIO().to(conversationId).emit(SOCKET_EVENTS.MESSAGE.CREATED, message);
  participants.forEach((participant) => {
    getIO().to(participant.userId).emit(SOCKET_EVENTS.CONVERSATION.UPDATED, {
      conversationId,
      lastMessagePreview: message.body,
      lastMessageAt: message.createdAt,
    });
  });

  return messageDtoSchema.parse(message);
};

export const getMessagesService = async (
  conversationId: string,
  currentUserId: string,
): Promise<MessageDTO[]> => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { userId: currentUserId } },
    },
  });
  if (!conversation) {
    throw createError(403, "Access denied");
  }

  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          displayName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messageDtoSchema.array().parse(messages);
};
