import { prisma } from "@/lib/prisma";
import { getIO } from "@/lib/socket";

export const createMessageService = async (
  body: string,
  conversationId: string,
  senderId: string,
) => {
  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: {
        body: body,
        conversationId: conversationId,
        senderId: senderId,
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
    }),

    prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessagePreview: body,
        lastMessageAt: new Date(),
      },
    }),
  ]);

  getIO().to(conversationId).emit("new_message", message);

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
