import { Socket } from "socket.io";

export const conversationSocketHandler = (socket: Socket) => {
  socket.on("join_conversation", (conversationId: string) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined ${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId: string) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} leaved ${conversationId}`);
  });
};
