import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { userSelect } from "@/types/user";
import {
  updateProfileInputSchema,
  userDtoSchema,
  type UserDTO,
} from "@realtime-chat-app/shared";
import z from "zod";

export const updateProfileService = async (
  body: unknown,
  currentUserId: string,
): Promise<UserDTO> => {
  const parseResult = updateProfileInputSchema.safeParse(body);

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
    select: userSelect,
  });

  return userDtoSchema.parse(updatedUser);
};

export const getUserByUsernameService = async (
  username: string,
): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: userSelect,
  });

  if (!user) {
    throw createError(404, "Username not found");
  }

  return userDtoSchema.parse(user);
};
