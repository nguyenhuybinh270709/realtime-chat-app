import { isAppError } from "@/errors/app.error";
import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (isAppError(error)) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        details: error.details,
      },
    });
  }

  console.error(error);

  return res.status(500).json({
    error: {
      message: "Internal server error",
    },
  });
};
