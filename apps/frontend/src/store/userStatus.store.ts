import { create } from "zustand";

type UserStatus = {
  isOnline: boolean;
};

type State = {
  userStatus: Map<string, UserStatus>;
  setOnline: (userId: string) => void;
  setOffline: (userId: string) => void;
};

export const useUserStatusStore = create<State>((set) => ({
  userStatus: new Map(),

  setOnline: (userId) =>
    set((state) => {
      const map = new Map(state.userStatus);
      map.set(userId, { isOnline: true });
      return { userStatus: map };
    }),

  setOffline: (userId) =>
    set((state) => {
      const map = new Map(state.userStatus);
      map.set(userId, { isOnline: false });
      return { userStatus: map };
    }),
}));
