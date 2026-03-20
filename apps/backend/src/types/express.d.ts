import type { AuthUser } from "@/types/user";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
