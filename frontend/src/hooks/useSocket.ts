import { useEffect } from "react";
import { socket } from "@/lib/socket";

export const useSocket = (isAuthenticated: boolean) => {
  useEffect(() => {
    if (!isAuthenticated) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);
};
