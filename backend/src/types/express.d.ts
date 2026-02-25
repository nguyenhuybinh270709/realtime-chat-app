import type { Prisma } from "@/generated/prisma/client";

export const authUserSelect = {
  id: true,
  username: true,
  displayName: true,
  gender: true,
  profileImage: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export type AuthUser = Prisma.UserGetPayload<{ select: typeof authUserSelect }>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
