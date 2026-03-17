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

    socket.on("conversation_updated", handleConversationUpdated);

    return () => {
      socket.off("conversation_updated", handleConversationUpdated);
    };
  }, []);
};
