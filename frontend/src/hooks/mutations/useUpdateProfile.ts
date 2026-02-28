import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { updateProfileAPI } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileAPI,
    onSuccess: () => {
      toast.success("Update profile successful");
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
