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
