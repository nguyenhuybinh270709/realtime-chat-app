import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";

export const getUserByUsernameService = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      profileImage: true,
    },
  });

  if (!user) {
    throw createError(404, "Username not found");
  }

  return user;
};
