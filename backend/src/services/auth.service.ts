import { createError } from "@/errors/app.error";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schema/auth.schema";
import z from "zod";
import bcrypt from "bcrypt";
import { authUserSelect } from "@/types/auth";

export const signUpService = async (body: unknown) => {
  const parseResult = signUpSchema.safeParse(body);

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
    select: authUserSelect,
  });

  return newUser;
};
