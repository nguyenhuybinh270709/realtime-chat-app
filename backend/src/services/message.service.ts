import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";

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

  getIO().to(conversationId).emit("new_message", message);
  getIO().emit("conversation_updated", {
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
