import { queryClient } from "@/lib/queryClient";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS, type MessageDTO } from "@realtime-chat-app/shared";
import { useEffect } from "react";

export const useSocketMessage = (conversationId: string) => {
  useEffect(() => {
    if (!conversationId) return;

    const handleMessageCreated = (message: MessageDTO) => {
      queryClient.setQueryData<MessageDTO[]>(
        ["messages", conversationId],
        (old = []) => {
          if (old.some((m) => m.id === message.id)) return old;
          return [...old, message];
        },
      );
    };

    const handleConnect = () => {
      socket.emit(SOCKET_EVENTS.CONVERSATION.JOIN, conversationId);
    };

    socket.on(SOCKET_EVENTS.MESSAGE.CREATED, handleMessageCreated);
    socket.on(SOCKET_EVENTS.BASE.CONNECT, handleConnect);

    if (socket.connected) {
      socket.emit(SOCKET_EVENTS.CONVERSATION.JOIN, conversationId);
    }

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE.CREATED, handleMessageCreated);
      socket.off(SOCKET_EVENTS.BASE.CONNECT, handleConnect);
      socket.emit(SOCKET_EVENTS.CONVERSATION.LEAVE, conversationId);
    };
  }, [conversationId]);
};
