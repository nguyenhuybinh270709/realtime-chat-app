import { createMessage, getMessages } from "@/controllers/message.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.post("/", requireAuth, createMessage);
messageRoutes.get("/:conversationId", requireAuth, getMessages);
