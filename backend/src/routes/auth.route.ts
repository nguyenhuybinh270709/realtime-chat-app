import { signUp } from "@/controllers/auth.controller";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
