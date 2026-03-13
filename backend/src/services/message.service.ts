import { prisma } from "@/lib/prisma";

export const createMessageService = async (
  body: string,
  conversationId: string,
  senderId: string,
) => {
  const message = await prisma.message.create({
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
  });

  return message;
};
