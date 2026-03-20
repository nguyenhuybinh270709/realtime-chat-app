import { api } from "@/lib/axios";
import type { UpdateProfileInput, UserDTO } from "@realtime-chat-app/shared";

export const updateProfileAPI = async (
  data: UpdateProfileInput,
): Promise<UserDTO> => {
  const res = await api.put("/users/me", data);
  return res.data;
};

export const getUserByUsernameAPI = async (
  username: string,
): Promise<UserDTO> => {
  const res = await api.get(`/users/${username}`);
  return res.data;
};
