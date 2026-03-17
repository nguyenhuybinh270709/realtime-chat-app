import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/queryClient";
import {
  updateConversationList,
  type ConversationUpdatePayload,
} from "@/utils/conversation";

export const useSocketConversations = () => {
  useEffect(() => {
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

    socket.on("conversation_updated", handleConversationUpdated);
    socket.on("conversation_deleted", handleConversationDeleted);

    return () => {
      socket.off("conversation_updated", handleConversationUpdated);
      socket.off("conversation_deleted", handleConversationDeleted);
    };
  }, []);
};
