import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { deleteGroupAPI } from "@/services/conversation.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: deleteGroupAPI,
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
