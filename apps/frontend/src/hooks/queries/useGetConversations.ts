import { getConversationsAPI } from "@/services/conversation.service";
import { useQuery } from "@tanstack/react-query";

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversationsAPI,
  });
};
