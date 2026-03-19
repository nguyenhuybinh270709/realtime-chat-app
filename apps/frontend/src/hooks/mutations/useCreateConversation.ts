import { useMutation } from "@tanstack/react-query";
import { createConversationAPI } from "@/services/conversation.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: createConversationAPI,
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
