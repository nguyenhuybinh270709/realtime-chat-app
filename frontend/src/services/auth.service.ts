import { api } from "@/lib/axios";

interface SignUpPayload {
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

interface LoginPayload {
  username: string;
  password: string;
}

export const signUpAPI = async (data: SignUpPayload) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};

export const loginAPI = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);

  return res.data;
};

export const logoutAPI = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export const getCurrentUserAPI = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
