import { z } from "zod";

export const createConversationInputSchema = z.object({
  conversationName: z
    .string()
    .trim()
    .max(100, "Conversation name must not exceed 100 characters")
    .optional(),
  userIds: z.array(z.uuid()).min(1, "At least one participant is required"),
});
export type CreateConversationInput = z.infer<
  typeof createConversationInputSchema
>;
