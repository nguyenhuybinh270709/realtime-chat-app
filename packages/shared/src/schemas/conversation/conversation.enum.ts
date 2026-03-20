import { z } from "zod";

export const conversationRoleEnum = z.enum(["owner", "member"]);
export type ConversationRole = z.infer<typeof conversationRoleEnum>;
