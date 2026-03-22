import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@realtime-chat-app/shared";

let io: Server<ClientToServerEvents, ServerToClientEvents>;

export const initSocket = (server: HTTPServer) => {
  io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};
