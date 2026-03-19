type AppError = {
  type: "APP_ERROR";
  statusCode: number;
  message: string;
  details?: unknown;
};

export const createError = (
  statusCode: number,
  message: string,
  details?: unknown,
): AppError => ({
  type: "APP_ERROR",
  statusCode,
  message,
  details,
});

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as AppError).type === "APP_ERROR"
  );
};
