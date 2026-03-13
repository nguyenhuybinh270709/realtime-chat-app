import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/schema/user.schema";
import { getUserByUsernameService } from "@/services/user.service";
import type { NextFunction, Request, Response } from "express";
import z from "zod";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const result = updateProfileSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          details: z.flattenError(result.error),
        },
      });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: result.data,
      select: {
        id: true,
        displayName: true,
        bio: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in updateProfile controller: ", error.message);
    } else {
      console.error("Unknown error: ", error);
    }

    return res.status(500).json({
      error: {
        message: "Internal server error",
      },
    });
  }
};

export const getUserByUsername = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsernameService(username);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
