import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { loginAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      toast.success("Login successful");
      queryClient.setQueryData(["currentUser"], user);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
