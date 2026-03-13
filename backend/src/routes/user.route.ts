import {
  getUserByUsername,
  updateProfile,
} from "@/controllers/user.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const userRoutes = express.Router();

userRoutes.put("/me", requireAuth, updateProfile);
userRoutes.get("/:username", requireAuth, getUserByUsername);
