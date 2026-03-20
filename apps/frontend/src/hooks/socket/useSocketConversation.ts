import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/queryClient";
import {
  updateConversationList,
  type ConversationUpdatePayload,
} from "@/utils/conversation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SOCKET_EVENTS, type ConversationDTO } from "@realtime-chat-app/shared";

export const useSocketConversation = (conversationId?: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleConversationCreated = ({
      conversation,
    }: {
      conversation: ConversationDTO;
    }) => {
      queryClient.setQueryData<ConversationDTO[]>(
        ["conversations"],
        (old = []) => {
          if (old.some((c) => c.id === conversation.id)) return old;
          return [conversation, ...old];
        },
      );
    };
    const handleConversationUpdated = (payload: ConversationUpdatePayload) => {
      queryClient.setQueryData<ConversationDTO[]>(
        ["conversations"],
        (conversations) => updateConversationList(conversations, payload),
      );
    };
    const handleConversationDeleted = ({
      conversationId: deletedConversationId,
    }: {
      conversationId: string;
    }) => {
      queryClient.setQueryData<ConversationDTO[]>(
        ["conversations"],
        (conversations = []) =>
          conversations.filter(
            (conversation) => conversation.id !== deletedConversationId,
          ),
      );

      if (deletedConversationId === conversationId) {
        toast.success("Group has been deleted");
        navigate("/");
      }
    };

    socket.on(SOCKET_EVENTS.CONVERSATION.CREATED, handleConversationCreated);
    socket.on(SOCKET_EVENTS.CONVERSATION.UPDATED, handleConversationUpdated);
    socket.on(SOCKET_EVENTS.CONVERSATION.DELETED, handleConversationDeleted);

    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION.CREATED, handleConversationCreated);
      socket.off(SOCKET_EVENTS.CONVERSATION.UPDATED, handleConversationUpdated);
      socket.off(SOCKET_EVENTS.CONVERSATION.DELETED, handleConversationDeleted);
    };
  }, [conversationId, navigate]);
};
