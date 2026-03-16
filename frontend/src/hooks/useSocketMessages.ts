import { queryClient } from "@/lib/queryClient";
import { socket } from "@/lib/socket";
import { useEffect } from "react";

export const useSocketMessages = (conversationId: string) => {
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
      socket.emit("join_conversation", conversationId);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("connect", handleConnect);

    if (socket.connected) {
      socket.emit("join_conversation", conversationId);
    }

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("connect", handleConnect);
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId]);
};
