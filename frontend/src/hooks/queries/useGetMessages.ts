import { getMessagesAPI } from "@/services/message.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (conversationId?: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessagesAPI(conversationId!),
    enabled: Boolean(conversationId),
  });
};
