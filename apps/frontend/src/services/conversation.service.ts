import { api } from "@/lib/axios";

export interface CreateConversationBody {
  conversationName?: string;
  userIds: string[];
}

export const getConversationsAPI = async (): Promise<Conversation[]> => {
  const res = await api.get("/conversations");

  return res.data;
};

export const getConversationByIdAPI = async (
  conversationId: string,
): Promise<Conversation> => {
  const res = await api.get(`/conversations/${conversationId}`);

  return res.data;
};

export const createConversationAPI = async (
  data: CreateConversationBody,
): Promise<Conversation> => {
  const res = await api.post("/conversations", data);

  return res.data;
};

export const deleteGroupConversationAPI = async (conversationId: string) => {
  await api.delete(`/conversations/${conversationId}`);
};
