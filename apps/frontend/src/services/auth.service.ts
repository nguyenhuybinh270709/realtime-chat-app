import { api } from "@/lib/axios";
import type {
  LoginInput,
  SignUpInput,
  UserDTO,
} from "@realtime-chat-app/shared";

export const signUpAPI = async (data: SignUpInput): Promise<UserDTO> => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const loginAPI = async (data: LoginInput): Promise<UserDTO> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutAPI = async (): Promise<{ message: string }> => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const getCurrentUserAPI = async (): Promise<UserDTO | null> => {
  const res = await api.get("/auth/me");
  return res.data;
};
