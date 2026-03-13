import { prisma } from "@/lib/prisma";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/generateToken";
import { loginSchema } from "@/schema/auth.schema";
import z from "zod";
import { authUserSelect } from "@/types/auth";
import { signUpService } from "@/services/auth.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await signUpService(req.body);

    generateToken(newUser.id, res);

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation failed",
          details: z.flattenError(result.error),
        },
      });
    }

    const { username, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { username: username },
      select: {
        ...authUserSelect,
        hashedPassword: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: {
          message: "Invalid username or password",
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: {
          message: "Invalid username or password",
        },
      });
    }

    generateToken(user.id, res);

    // Remove hashedPassword from response
    const { hashedPassword: hashedPassword, ...userResponse } = user;

    return res.status(200).json(userResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in login controller: ", error.message);
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

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json(req.user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getCurrentUser controller: ", error.message);
    } else {
      console.error("Unknown error: ", error);
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in logout controller: ", error.message);
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
