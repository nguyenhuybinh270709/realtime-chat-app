import { BASE_EVENTS } from "@/sockets/events/base.events";
import { CONVERSATION_EVENTS } from "@/sockets/events/conversation.events";
import { MESSAGE_EVENTS } from "@/sockets/events/message.events";
import { USER_EVENTS } from "@/sockets/events/user.events";

export const SOCKET_EVENTS = {
  BASE: BASE_EVENTS,
  USER: USER_EVENTS,
  CONVERSATION: CONVERSATION_EVENTS,
  MESSAGE: MESSAGE_EVENTS,
};
