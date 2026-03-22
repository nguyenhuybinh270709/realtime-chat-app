import { z } from "zod";
import {
  conversationDtoSchema,
  conversationRoleEnum,
} from "../../schemas/conversation";
import { CONVERSATION_ACTION } from "./conversation.actions";

export const conversationActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(CONVERSATION_ACTION.PARTICIPANT_LEFT),
    userId: z.string(),
  }),

  z.object({
    type: z.literal(CONVERSATION_ACTION.ROLE_UPDATED),
    userId: z.string(),
    newRole: conversationRoleEnum,
  }),

  z.object({
    type: z.literal(CONVERSATION_ACTION.LAST_MESSAGE_UPDATED),
    lastMessagePreview: z.string().nullable(),
    lastMessageAt: z.coerce.date().nullable(),
  }),
]);

export type ConversationActionPayload = z.infer<
  typeof conversationActionSchema
>;

// Updated
export const conversationUpdatedPayloadSchema = z.object({
  conversationId: z.string(),
  actions: z.array(conversationActionSchema),
});

export type ConversationUpdatedPayload = z.infer<
  typeof conversationUpdatedPayloadSchema
>;

export const createConversationUpdatedPayload = (data: {
  conversationId: string;
  actions: ConversationActionPayload[];
}): ConversationUpdatedPayload => {
  return conversationUpdatedPayloadSchema.parse(data);
};

// Removed
export const conversationRemovedReasonEnum = z.enum(["LEFT", "GROUP_DELETED"]);

export type ConversationRemovedReason = z.infer<
  typeof conversationRemovedReasonEnum
>;

export const conversationRemovedPayloadSchema = z.object({
  conversationId: z.string(),
  reason: conversationRemovedReasonEnum,
});

export type ConversationRemovedPayload = z.infer<
  typeof conversationRemovedPayloadSchema
>;

export const createConversationRemovedPayload = (data: {
  conversationId: string;
  reason: ConversationRemovedReason;
}): ConversationRemovedPayload => {
  return conversationRemovedPayloadSchema.parse(data);
};

// Created
export const conversationCreatedPayloadSchema = z.object({
  conversation: conversationDtoSchema,
});

export type ConversationCreatedPayload = z.infer<
  typeof conversationCreatedPayloadSchema
>;

export const createConversationCreatedPayload = (data: {
  conversation: z.infer<typeof conversationDtoSchema>;
}): ConversationCreatedPayload => {
  return conversationCreatedPayloadSchema.parse(data);
};
