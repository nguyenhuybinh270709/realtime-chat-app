import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/socket/events";

export const createMessageService = async (
  body: string,
  conversationId: string,
  senderId: string,
) => {
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

  getIO().to(conversationId).emit(SOCKET_EVENTS.MESSAGE.NEW, message);
  getIO().emit(SOCKET_EVENTS.CONVERSATION.UPDATED, {
    conversationId,
    lastMessagePreview: message.body,
    lastMessageAt: message.createdAt,
  });

  return message;
};

export const getMessagesService = async (conversationId: string) => {
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

  return messages;
};
