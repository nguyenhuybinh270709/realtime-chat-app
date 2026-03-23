import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";

export const useSocketConnection = (
  isAuthenticated: boolean,
  userId?: string,
) => {
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      socket.disconnect();
      return;
    }

    if (!socket.connected) {
      socket.connect();
    } else {
      socket.emit(SOCKET_EVENTS.USER.JOIN, userId);
    }

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      socket.emit(SOCKET_EVENTS.USER.JOIN, userId);
    };

    socket.on(SOCKET_EVENTS.BASE.CONNECT, handleConnect);

    return () => {
      socket.off(SOCKET_EVENTS.BASE.CONNECT, handleConnect);
    };
  }, [isAuthenticated, userId]);
};
