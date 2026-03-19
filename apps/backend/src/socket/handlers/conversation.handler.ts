import { SOCKET_EVENTS } from "@realtime-chat-app/shared";
import { Socket } from "socket.io";

export const conversationSocketHandler = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.CONVERSATION.JOIN, (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined ${conversationId}`);
  });

  socket.on(SOCKET_EVENTS.CONVERSATION.LEAVE, (conversationId: string) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} leaved ${conversationId}`);
  });
};
