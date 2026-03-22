import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/queryClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  SOCKET_EVENTS,
  type ConversationUpdatedPayload,
  type ConversationRemovedPayload,
  type ConversationCreatedPayload,
  type ConversationDTO,
} from "@realtime-chat-app/shared";
import { updateConversationList } from "@/utils/conversation";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";

export const useSocketConversation = (conversationId?: string) => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();
  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (!currentUserId) return;

    const updateCache = (
      updater: (
        prev: ConversationDTO[] | undefined,
      ) => ConversationDTO[] | undefined,
    ) => {
      queryClient.setQueryData<ConversationDTO[]>(["conversations"], updater);
    };

    const handleCreated = (payload: ConversationCreatedPayload) => {
      updateCache((prev) => {
        const conversations = prev ?? [];

        if (
          conversations.some(
            (conversation) => conversation.id === payload.conversation.id,
          )
        ) {
          return conversations;
        }

        return [payload.conversation, ...conversations];
      });
    };

    const handleUpdated = (payload: ConversationUpdatedPayload) => {
      updateCache((prev) =>
        updateConversationList(
          prev ?? [],
          payload.conversationId,
          payload.actions,
          currentUserId,
        ),
      );
    };

    const handleRemoved = (payload: ConversationRemovedPayload) => {
      updateCache((prev) => {
        const conversations = prev ?? [];
        return conversations.filter(
          (conversation) => conversation.id !== payload.conversationId,
        );
      });

      if (payload.conversationId === conversationId) {
        const messageMap = {
          LEFT: "You have left the group",
          GROUP_DELETED: "Group has been deleted",
        } as const;

        toast.info(messageMap[payload.reason]);
        navigate("/");
      }
    };

    socket.on(SOCKET_EVENTS.CONVERSATION.CREATED, handleCreated);
    socket.on(SOCKET_EVENTS.CONVERSATION.UPDATED, handleUpdated);
    socket.on(SOCKET_EVENTS.CONVERSATION.REMOVED, handleRemoved);

    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION.CREATED, handleCreated);
      socket.off(SOCKET_EVENTS.CONVERSATION.UPDATED, handleUpdated);
      socket.off(SOCKET_EVENTS.CONVERSATION.REMOVED, handleRemoved);
    };
  }, [conversationId, currentUserId, navigate]);
};
