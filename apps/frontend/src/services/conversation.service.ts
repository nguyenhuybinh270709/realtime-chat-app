import { api } from "@/lib/axios";
import type {
  ConversationDTO,
  CreateConversationInput,
} from "@realtime-chat-app/shared";

export const getConversationsAPI = async (): Promise<ConversationDTO[]> => {
  const res = await api.get("/conversations");
  return res.data;
};

export const getConversationByIdAPI = async (
  conversationId: string,
): Promise<ConversationDTO> => {
  const res = await api.get(`/conversations/${conversationId}`);
  return res.data;
};

export const createConversationAPI = async (
  data: CreateConversationInput,
): Promise<ConversationDTO> => {
  const res = await api.post("/conversations", data);
  return res.data;
};

export const deleteGroupAPI = async (
  conversationId: string,
): Promise<{ message: string }> => {
  const res = await api.delete(`/conversations/${conversationId}`);
  return res.data;
};

export const leaveGroupAPI = async (
  conversationId: string,
): Promise<{ message: string }> => {
  const res = await api.post(`/conversations/${conversationId}/leave`);
  return res.data;
};
