import { authRoutes } from "@/routes/auth.route";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server in running on port ${PORT}`);
});
