import {
  getCurrentUser,
  login,
  logout,
  signUp,
} from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/me", requireAuth, getCurrentUser);
authRoutes.post("/logout", logout);
