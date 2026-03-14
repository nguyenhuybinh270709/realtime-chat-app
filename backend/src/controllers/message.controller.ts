import {
  createMessageService,
  getMessagesService,
} from "@/services/message.service";
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

export const getMessages = async (
  req: Request<{ conversationId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId } = req.params;

    const messages = await getMessagesService(conversationId);

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
