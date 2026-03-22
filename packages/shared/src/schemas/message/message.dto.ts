import { z } from "zod";
import { userDtoSchema } from "../user";

export const messageDtoSchema = z.object({
  id: z.string(),
  body: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  sender: userDtoSchema,
  createdAt: z.coerce.date(),
});
export type MessageDTO = z.infer<typeof messageDtoSchema>;
