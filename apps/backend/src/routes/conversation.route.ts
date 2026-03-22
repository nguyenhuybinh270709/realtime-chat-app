import {
  createConversation,
  deleteGroup,
  getConversationById,
  getConversations,
  leaveGroup,
} from "@/controllers/conversation.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const conversationRoutes = express.Router();

conversationRoutes.post("/", requireAuth, createConversation);
conversationRoutes.get("/", requireAuth, getConversations);
conversationRoutes.get("/:conversationId", requireAuth, getConversationById);
conversationRoutes.delete("/:conversationId", requireAuth, deleteGroup);
conversationRoutes.post("/:conversationId/leave", requireAuth, leaveGroup);
