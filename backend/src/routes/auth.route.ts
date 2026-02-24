import { login, signUp } from "@/controllers/auth.controller";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
