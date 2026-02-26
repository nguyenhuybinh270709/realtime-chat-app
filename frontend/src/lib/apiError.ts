import axios from "axios";

interface ApiError {
  error?: {
    message?: string;
    details?: string;
  };
  message?: string;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    if (!error.response) {
      return "Cannot connect to server. Please try again later.";
    }

    const data = error.response.data;

    return (
      data?.error?.message ??
      data?.message ??
      "Request failed. Please try again later."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}
