import { MessageDTO } from "../schemas";
import { SOCKET_EVENTS } from "./";
import {
  ConversationCreatedPayload,
  ConversationRemovedPayload,
  ConversationUpdatedPayload,
} from "./conversation";

export interface ServerToClientEvents {
  // Base
  [SOCKET_EVENTS.BASE.CONNECT]: () => void;
  [SOCKET_EVENTS.BASE.DISCONNECT]: () => void;

  // Conversation
  [SOCKET_EVENTS.CONVERSATION.UPDATED]: (
    payload: ConversationUpdatedPayload,
  ) => void;
  [SOCKET_EVENTS.CONVERSATION.REMOVED]: (
    payload: ConversationRemovedPayload,
  ) => void;
  [SOCKET_EVENTS.CONVERSATION.CREATED]: (
    payload: ConversationCreatedPayload,
  ) => void;

  // Message
  [SOCKET_EVENTS.MESSAGE.CREATED]: (payload: MessageDTO) => void;

  // User
  [SOCKET_EVENTS.USER.ONLINE]: (payload: { userId: string }) => void;
  [SOCKET_EVENTS.USER.OFFLINE]: (payload: { userId: string }) => void;
  [SOCKET_EVENTS.USER.ONLINE_LIST]: (payload: { users: string[] }) => void;
}

export interface ClientToServerEvents {
  // Conversation
  [SOCKET_EVENTS.CONVERSATION.JOIN]: (conversationId: string) => void;
  [SOCKET_EVENTS.CONVERSATION.LEAVE]: (conversationId: string) => void;

  // User
  [SOCKET_EVENTS.USER.JOIN]: (userId: string) => void;
}
