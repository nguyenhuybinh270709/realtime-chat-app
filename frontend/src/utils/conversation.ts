export interface ConversationUpdatePayload {
  conversationId: string;
  lastMessagePreview: string;
  lastMessageAt: string;
}

export function getConversationDisplayInfo(
  conversation: Conversation,
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
  conversations: Conversation[] = [],
  payload: ConversationUpdatePayload,
): Conversation[] => {
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
