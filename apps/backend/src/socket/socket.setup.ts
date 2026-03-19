import { conversationSocketHandler } from "@/socket/handlers/conversation.handler";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";
import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected: ", socket.id);

    socket.on(SOCKET_EVENTS.USER.JOIN, (userId: string) => {
      if (!userId) return;

      socket.join(userId);
      console.log("User joined: ", userId);
    });

    conversationSocketHandler(socket);

    socket.on(SOCKET_EVENTS.BASE.DISCONNECT, () => {
      console.log("User disconnected: ", socket.id);
    });
  });
};
