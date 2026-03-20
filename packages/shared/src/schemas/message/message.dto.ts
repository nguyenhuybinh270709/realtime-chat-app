import { z } from "zod";

export const messageDtoSchema = z.object({
  id: z.string(),
  body: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  createdAt: z.coerce.date(),
});
export type MessageDTO = z.infer<typeof messageDtoSchema>;
