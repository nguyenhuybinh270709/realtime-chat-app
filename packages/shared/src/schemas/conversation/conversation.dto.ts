import { z } from "zod";
import { conversationRoleEnum } from "./conversation.enum";
import { userDtoSchema } from "../user";

export const conversationParticipantDtoSchema = z.object({
  role: conversationRoleEnum.nullable().optional(),
  user: userDtoSchema.pick({
    id: true,
    displayName: true,
    profileImage: true,
    bio: true,
  }),
});
export type ConversationParticipantDTO = z.infer<
  typeof conversationParticipantDtoSchema
>;

export const conversationDtoSchema = z.object({
  id: z.string(),
  conversationName: z.string().nullable(),
  isGroup: z.boolean(),
  lastMessagePreview: z.string().nullable(),
  lastMessageAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  participants: z.array(conversationParticipantDtoSchema),
});
export type ConversationDTO = z.infer<typeof conversationDtoSchema>;
