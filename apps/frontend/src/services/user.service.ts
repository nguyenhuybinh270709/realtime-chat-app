import { api } from "@/lib/axios";

interface UpdateProfilePayload {
  displayName: string;
  bio: string;
}

export const updateProfileAPI = async (data: UpdateProfilePayload) => {
  const res = await api.put("/users/me", data);

  return res.data;
};

export const getUserByUsernameAPI = async (username: string) => {
  const res = await api.get(`/users/${username}`);

  return res.data;
};
