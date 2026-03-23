import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@realtime-chat-app/shared";
import { useUserStatusStore } from "@/store/userStatus.store";

export const useUserStatus = () => {
  const setOnline = useUserStatusStore((s) => s.setOnline);
  const setOffline = useUserStatusStore((s) => s.setOffline);

  useEffect(() => {
    const handleOnline = ({ userId }: { userId: string }) => {
      setOnline(userId);
    };

    const handleOffline = ({ userId }: { userId: string }) => {
      setOffline(userId);
    };

    const handleOnlineList = ({ users }: { users: string[] }) => {
      users.forEach((id) => setOnline(id));
    };

    socket.on(SOCKET_EVENTS.USER.ONLINE, handleOnline);
    socket.on(SOCKET_EVENTS.USER.OFFLINE, handleOffline);
    socket.on(SOCKET_EVENTS.USER.ONLINE_LIST, handleOnlineList);

    return () => {
      socket.off(SOCKET_EVENTS.USER.ONLINE, handleOnline);
      socket.off(SOCKET_EVENTS.USER.OFFLINE, handleOffline);
      socket.off(SOCKET_EVENTS.USER.ONLINE_LIST, handleOnlineList);
    };
  }, [setOnline, setOffline]);
};
