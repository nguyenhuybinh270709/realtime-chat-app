import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { createMessageAPI } from "@/services/message.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: createMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
