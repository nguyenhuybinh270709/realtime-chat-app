import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { leaveGroupAPI } from "@/services/conversation.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLeaveGroup = () => {
  return useMutation({
    mutationFn: leaveGroupAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
