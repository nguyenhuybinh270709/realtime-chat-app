import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/queryClient";
import {
  updateConversationList,
  type ConversationUpdatePayload,
} from "@/utils/conversation";
import { SOCKET_EVENTS } from "@/socket/events";

export const useSocketConversation = () => {
  useEffect(() => {
    const handleConversationCreated = ({
      conversation,
    }: {
      conversation: Conversation;
    }) => {
      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (old = []) => {
          if (old.some((c) => c.id === conversation.id)) return old;
          return [conversation, ...old];
        },
      );
    };
    const handleConversationUpdated = (payload: ConversationUpdatePayload) => {
      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (conversations) => updateConversationList(conversations, payload),
      );
    };
    const handleConversationDeleted = ({
      conversationId,
    }: {
      conversationId: string;
    }) => {
      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (conversations = []) =>
          conversations.filter(
            (conversation) => conversation.id !== conversationId,
          ),
      );
    };

    socket.on(SOCKET_EVENTS.CONVERSATION.CREATED, handleConversationCreated);
    socket.on(SOCKET_EVENTS.CONVERSATION.UPDATED, handleConversationUpdated);
    socket.on(SOCKET_EVENTS.CONVERSATION.DELETED, handleConversationDeleted);

    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION.CREATED, handleConversationCreated);
      socket.off(SOCKET_EVENTS.CONVERSATION.UPDATED, handleConversationUpdated);
      socket.off(SOCKET_EVENTS.CONVERSATION.DELETED, handleConversationDeleted);
    };
  }, []);
};
