import {
  createConversationService,
  deleteGroupConversationService,
  getConversationByIdService,
  getConversationsService,
} from "@/services/conversation.service";
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

export const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUserId = req.user!.id;

    const conversations = await getConversationsService(currentUserId);

    return res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export const getConversationById = async (
  req: Request<{ conversationId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUserId = req.user!.id;
    const { conversationId } = req.params;

    const conversation = await getConversationByIdService(
      currentUserId,
      conversationId,
    );

    return res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const deleteGroupConversation = async (
  req: Request<{ conversationId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId } = req.params;
    const currentUserId = req.user!.id;

    await deleteGroupConversationService(conversationId, currentUserId);

    return res
      .status(200)
      .json({ message: "Conversation deleted successfully" });
  } catch (error) {
    next(error);
  }
};
