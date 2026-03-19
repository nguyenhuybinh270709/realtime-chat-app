import { BASE_EVENTS } from "./base.events";
import { CONVERSATION_EVENTS } from "./conversation.events";
import { MESSAGE_EVENTS } from "./message.events";
import { USER_EVENTS } from "./user.events";

export const SOCKET_EVENTS = {
  BASE: BASE_EVENTS,
  USER: USER_EVENTS,
  CONVERSATION: CONVERSATION_EVENTS,
  MESSAGE: MESSAGE_EVENTS,
} as const;
