import { authRoutes } from "@/routes/auth.route";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "@/routes/user.route";
import { conversationRoutes } from "@/routes/conversation.route";
import { errorMiddleware } from "@/middleware/error.middleware";
import { messageRoutes } from "@/routes/message.route";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
