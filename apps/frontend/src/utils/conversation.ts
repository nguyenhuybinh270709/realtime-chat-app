import {
  type ConversationDTO,
  CONVERSATION_ACTION,
  type ConversationActionPayload,
} from "@realtime-chat-app/shared";

export function getConversationDisplayInfo(
  conversation: ConversationDTO,
  currentUserId: string,
) {
  const isGroup = conversation.isGroup;

  const otherParticipant = conversation.participants.find(
    (participant) => participant.user.id !== currentUserId,
  );

  const displayName = isGroup
    ? (conversation.conversationName ?? "")
    : (otherParticipant?.user.displayName ?? "Unknown");

  const avatar = isGroup
    ? undefined
    : (otherParticipant?.user.profileImage ?? undefined);

  return {
    isGroup,
    otherParticipant,
    displayName,
    avatar,
  };
}

export const updateConversationList = (
  conversationList: ConversationDTO[],
  targetConversationId: string,
  actions: ConversationActionPayload[],
  currentUserId: string,
): ConversationDTO[] => {
  const targetConversation = conversationList.find(
    (conversation) => conversation.id === targetConversationId,
  );
  if (!targetConversation) return conversationList;

  let updatedConversation = { ...targetConversation };
  let shouldRemoveConversation = false;
  let hasNewMessage = false;

  for (const action of actions) {
    switch (action.type) {
      case CONVERSATION_ACTION.PARTICIPANT_LEFT: {
        if (action.userId === currentUserId) {
          shouldRemoveConversation = true;
        } else {
          updatedConversation = {
            ...updatedConversation,
            participants: updatedConversation.participants.filter(
              (participant) => participant.user.id !== action.userId,
            ),
          };
        }
        break;
      }

      case CONVERSATION_ACTION.ROLE_UPDATED: {
        updatedConversation = {
          ...updatedConversation,
          participants: updatedConversation.participants.map((participant) =>
            participant.user.id === action.userId
              ? { ...participant, role: action.newRole }
              : participant,
          ),
        };
        break;
      }

      case CONVERSATION_ACTION.LAST_MESSAGE_UPDATED: {
        hasNewMessage = true;

        updatedConversation = {
          ...updatedConversation,
          lastMessagePreview:
            action.lastMessagePreview ?? updatedConversation.lastMessagePreview,
          lastMessageAt: action.lastMessageAt
            ? new Date(action.lastMessageAt)
            : updatedConversation.lastMessageAt,
        };
        break;
      }
    }

    if (shouldRemoveConversation) break;
  }

  if (shouldRemoveConversation) {
    return conversationList.filter(
      (conversation) => conversation.id !== targetConversationId,
    );
  }

  const otherConversations = conversationList.filter(
    (conversation) => conversation.id !== targetConversationId,
  );

  return hasNewMessage
    ? [updatedConversation, ...otherConversations]
    : [...otherConversations, updatedConversation];
};
