import type { NextFunction, Request, Response } from "express";
import { generateToken } from "@/utils/generateToken";
import { loginService, signUpService } from "@/services/auth.service";

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await loginService(req.body);

    generateToken(user.id, res);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
