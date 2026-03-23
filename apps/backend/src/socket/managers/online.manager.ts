const onlineUsers = new Map<string, Set<string>>();

export const addOnlineUser = (userId: string, socketId: string) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId)!.add(socketId);
};

export const removeOnlineUser = (socketId: string) => {
  for (const [userId, sockets] of onlineUsers.entries()) {
    if (sockets.has(socketId)) {
      sockets.delete(socketId);

      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        return { userId, isOffline: true };
      }

      return { userId, isOffline: false };
    }
  }

  return null;
};

export const isUserOnline = (userId: string) => {
  return onlineUsers.has(userId);
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};
