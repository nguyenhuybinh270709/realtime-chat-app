import { getApiErrorMessage } from "@/lib/apiError";
import { queryClient } from "@/lib/queryClient";
import { deleteGroupConversationAPI } from "@/services/conversation.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteGroupConversation = () => {
  return useMutation({
    mutationFn: deleteGroupConversationAPI,
    onSuccess: () => {
      toast.success("Conversation deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
