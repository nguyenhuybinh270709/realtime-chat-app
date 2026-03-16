import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Todos:

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
