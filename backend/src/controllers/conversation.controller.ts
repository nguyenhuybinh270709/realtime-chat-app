import { createConversationService } from "@/services/conversation.service";
import type { NextFunction, Request, Response } from "express";

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const conversation = await createConversationService(
      req.body,
      req.user!.id,
    );

    return res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};
