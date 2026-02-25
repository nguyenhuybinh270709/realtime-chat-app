import type { AuthUser } from "@/types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
