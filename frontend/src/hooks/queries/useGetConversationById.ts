import { getConversationByIdAPI } from "@/services/conversation.service";
import { useQuery } from "@tanstack/react-query";

export const useGetConversationById = (conversationId?: string) => {
  return useQuery({
    queryKey: ["conversations", conversationId],
    queryFn: () => getConversationByIdAPI(conversationId!),
    enabled: Boolean(conversationId),
  });
};
