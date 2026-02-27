import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { logoutAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.setQueryData(["currentUser"], null);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
