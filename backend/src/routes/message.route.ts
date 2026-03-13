import { createMessage } from "@/controllers/message.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.post("/", requireAuth, createMessage);
