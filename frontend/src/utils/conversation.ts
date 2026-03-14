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
