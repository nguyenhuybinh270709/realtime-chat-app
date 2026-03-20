import { z } from "zod";

export const createMessageInputSchema = z.object({
  body: z.string().min(1, "Message cannot be empty"),
  conversationId: z.uuid("Invalid conversation ID"),
});
export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;
