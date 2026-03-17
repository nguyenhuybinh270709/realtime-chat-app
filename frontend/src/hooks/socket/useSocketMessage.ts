import { queryClient } from "@/lib/queryClient";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/socket/events";
import { useEffect } from "react";

export const useSocketMessage = (conversationId: string) => {
  useEffect(() => {
    if (!conversationId) return;

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData<Message[]>(
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

    socket.on(SOCKET_EVENTS.MESSAGE.NEW, handleNewMessage);
    socket.on(SOCKET_EVENTS.BASE.CONNECT, handleConnect);

    if (socket.connected) {
      socket.emit(SOCKET_EVENTS.CONVERSATION.JOIN, conversationId);
    }

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE.NEW, handleNewMessage);
      socket.off(SOCKET_EVENTS.BASE.CONNECT, handleConnect);
      socket.emit(SOCKET_EVENTS.CONVERSATION.LEAVE, conversationId);
    };
  }, [conversationId]);
};
