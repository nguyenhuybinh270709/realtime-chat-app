import type { ConversationDTO } from "@realtime-chat-app/shared";

export interface ConversationUpdatePayload {
  conversationId: string;
  lastMessagePreview: string;
  lastMessageAt: Date;
}

export function getConversationDisplayInfo(
  conversation: ConversationDTO,
  currentUserId: string,
) {
  const isGroup = conversation.isGroup;

  const otherUser = conversation.participants.find(
    (participant) => participant.user.id !== currentUserId,
  );

  const displayName = isGroup
    ? (conversation.conversationName ?? "")
    : (otherUser?.user.displayName ?? "Unknown");

  const avatar = isGroup
    ? undefined
    : (otherUser?.user.profileImage ?? undefined);

  return {
    isGroup,
    otherUser,
    displayName,
    avatar,
  };
}

export const updateConversationList = (
  conversations: ConversationDTO[] = [],
  payload: ConversationUpdatePayload,
): ConversationDTO[] => {
  const target = conversations.find(
    (conversation) => conversation.id === payload.conversationId,
  );

  if (!target) return conversations;

  const updatedConversation = {
    ...target,
    lastMessagePreview: payload.lastMessagePreview,
    lastMessageAt: payload.lastMessageAt,
  };

  const remainingConversations = conversations.filter(
    (c) => c.id !== payload.conversationId,
  );

  return [updatedConversation, ...remainingConversations];
};
