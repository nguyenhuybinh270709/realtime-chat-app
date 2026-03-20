import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userSelect } from "@/types/user";
import {
  loginInputSchema,
  signUpInputSchema,
  userDtoSchema,
  type UserDTO,
} from "@realtime-chat-app/shared";

export const signUpService = async (body: unknown): Promise<UserDTO> => {
  const parseResult = signUpInputSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError(
      400,
      "Validation failed",
      z.flattenError(parseResult.error),
    );
  }

  const { username, displayName, password, gender } = parseResult.data;

  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    throw createError(409, "Username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const newUser = await prisma.user.create({
    data: {
      username: username,
      displayName: displayName,
      hashedPassword: hashedPassword,
      gender: gender,
      profileImage: profileImage,
    },
    select: userSelect,
  });

  return userDtoSchema.parse(newUser);
};

export const loginService = async (body: unknown): Promise<UserDTO> => {
  const parseResult = loginInputSchema.safeParse(body);

  if (!parseResult.success) {
    throw createError(
      400,
      "Validation failed",
      z.flattenError(parseResult.error),
    );
  }

  const { username, password } = parseResult.data;

  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      ...userSelect,
      hashedPassword: true,
    },
  });

  if (!user) {
    throw createError(401, "Invalid username or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordCorrect) {
    throw createError(401, "Invalid username or password");
  }

  // Remove hashedPassword from response
  const { hashedPassword: hashedPassword, ...userResponse } = user;

  return userDtoSchema.parse(userResponse);
};
