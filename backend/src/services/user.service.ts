import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/schema/user.schema";
import z from "zod";

export const updateProfileService = async (
  body: unknown,
  currentUserId: string,
) => {
  const parseResult = updateProfileSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError(
      400,
      "Validation failed",
      z.flattenError(parseResult.error),
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUserId,
    },
    data: parseResult.data,
    select: {
      id: true,
      displayName: true,
      bio: true,
    },
  });

  return updatedUser;
};

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
