import { prisma } from "@/lib/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/generateToken";
import { signUpSchema } from "@/schema/auth.schema";
import z from "zod";

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: z.treeifyError(result.error) });
    }

    const { username, displayName, password, gender } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
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
    });

    generateToken(newUser.id, res);

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      gender: newUser.gender,
      profileImage: newUser.profileImage,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in signUp controller: ", error.message);
    } else {
      console.log("Unknown error: ", error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
