import { createConversation } from "@/controllers/conversation.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const conversationRoutes = express.Router();

conversationRoutes.post("/", requireAuth, createConversation);
