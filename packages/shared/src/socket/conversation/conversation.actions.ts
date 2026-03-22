import { ConversationRole } from "../../schemas";

export const CONVERSATION_ACTION = {
  PARTICIPANT_LEFT: "participant_left",
  ROLE_UPDATED: "role_updated",
  LAST_MESSAGE_UPDATED: "last_message_updated",
} as const;

export type ConversationAction =
  (typeof CONVERSATION_ACTION)[keyof typeof CONVERSATION_ACTION];

export const participantLeftAction = (userId: string) => ({
  type: CONVERSATION_ACTION.PARTICIPANT_LEFT,
  userId,
});

export const roleUpdatedAction = (
  userId: string,
  newRole: ConversationRole,
) => ({
  type: CONVERSATION_ACTION.ROLE_UPDATED,
  userId,
  newRole,
});

export const lastMessageUpdatedAction = (data: {
  lastMessagePreview: string | null;
  lastMessageAt: Date | null;
}) => ({
  type: CONVERSATION_ACTION.LAST_MESSAGE_UPDATED,
  ...data,
});
