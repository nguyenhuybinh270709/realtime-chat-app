import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";

export const useSocketUser = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;

    const joinUser = () => {
      socket.emit(SOCKET_EVENTS.USER.JOIN, userId);
    };

    if (socket.connected) {
      joinUser();
    }

    socket.on(SOCKET_EVENTS.BASE.CONNECT, joinUser);

    return () => {
      socket.off(SOCKET_EVENTS.BASE.CONNECT, joinUser);
    };
  }, [userId]);
};
