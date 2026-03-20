import { api } from "@/lib/axios";
import type { CreateMessageInput, MessageDTO } from "@realtime-chat-app/shared";

export const createMessageAPI = async (
  data: CreateMessageInput,
): Promise<MessageDTO> => {
  const res = await api.post("/messages", data);
  return res.data;
};

export const getMessagesAPI = async (
  conversationId: string,
): Promise<MessageDTO[]> => {
  const res = await api.get(`/messages/${conversationId}`);
  return res.data;
};
