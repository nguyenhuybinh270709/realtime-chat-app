import { api } from "@/lib/axios";

interface CreateMessageBody {
  body: string;
  conversationId: string;
}

export const createMessageAPI = async (
  data: CreateMessageBody,
): Promise<Message> => {
  const res = await api.post("/messages", data);

  return res.data;
};

export const getMessagesAPI = async (
  conversationId: string,
): Promise<Message[]> => {
  const res = await api.get(`/messages/${conversationId}`);

  return res.data;
};
