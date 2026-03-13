import { createMessageService } from "@/services/message.service";
import type { NextFunction, Request, Response } from "express";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body: messageBody, conversationId } = req.body;
    const senderId = req.user!.id;

    const message = await createMessageService(
      messageBody,
      conversationId,
      senderId,
    );

    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
