import {
  createConversation,
  deleteGroupConversation,
  getConversationById,
  getConversations,
} from "@/controllers/conversation.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const conversationRoutes = express.Router();

conversationRoutes.post("/", requireAuth, createConversation);
conversationRoutes.get("/", requireAuth, getConversations);
conversationRoutes.get("/:conversationId", requireAuth, getConversationById);
conversationRoutes.delete(
  "/:conversationId",
  requireAuth,
  deleteGroupConversation,
);
