import {
  getUserByUsernameService,
  updateProfileService,
} from "@/services/user.service";
import type { NextFunction, Request, Response } from "express";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await updateProfileService(req.body, req.user!.id);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
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
