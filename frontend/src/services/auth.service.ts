import { api } from "@/lib/axios";

interface SignUpPayload {
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

export const signUpAPI = async (data: SignUpPayload) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};
