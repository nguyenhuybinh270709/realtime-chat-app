import { getApiErrorMessage } from "@/lib/apiError";
import { loginAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginAPI,
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
