import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";

export const useSocketConnection = (isAuthenticated: boolean) => {
  useEffect(() => {
    if (!isAuthenticated) {
      socket.disconnect();
      return;
    }

    socket.connect();

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };

    socket.on(SOCKET_EVENTS.BASE.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.BASE.DISCONNECT, handleDisconnect);

    return () => {
      socket.off(SOCKET_EVENTS.BASE.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.BASE.DISCONNECT, handleDisconnect);
    };
  }, [isAuthenticated]);
};
