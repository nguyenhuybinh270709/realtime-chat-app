import { conversationSocketHandler } from "@/socket/handlers/conversation.handler";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";
import { Server, Socket } from "socket.io";
import {
  addOnlineUser,
  removeOnlineUser,
  getOnlineUsers,
} from "@/socket/managers/online.manager";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on(SOCKET_EVENTS.USER.JOIN, (userId: string) => {
      if (!userId) return;

      socket.join(userId);
      addOnlineUser(userId, socket.id);

      socket.emit(SOCKET_EVENTS.USER.ONLINE_LIST, {
        users: getOnlineUsers(),
      });

      socket.broadcast.emit(SOCKET_EVENTS.USER.ONLINE, { userId });
    });

    conversationSocketHandler(socket);

    socket.on(SOCKET_EVENTS.BASE.DISCONNECT, () => {
      const result = removeOnlineUser(socket.id);
      if (!result) return;

      const { userId, isOffline } = result;

      if (!isOffline) return;

      socket.broadcast.emit(SOCKET_EVENTS.USER.OFFLINE, {
        userId,
      });
    });
  });
};
