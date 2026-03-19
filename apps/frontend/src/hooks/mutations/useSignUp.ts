import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { signUpAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpAPI,
    onSuccess: (user) => {
      toast.success("Sign up successful");
      queryClient.setQueryData(["currentUser"], user);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
