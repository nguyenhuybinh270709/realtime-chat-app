import { getApiErrorMessage } from "@/lib/apiError";
import { signUpAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      toast.success("Sign up successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
