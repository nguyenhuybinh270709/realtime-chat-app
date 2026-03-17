import { BASE_EVENTS } from "@/socket/events/base.events";
import { CONVERSATION_EVENTS } from "@/socket/events/conversation.events";
import { MESSAGE_EVENTS } from "@/socket/events/message.events";
import { USER_EVENTS } from "@/socket/events/user.events";

export const SOCKET_EVENTS = {
  BASE: BASE_EVENTS,
  USER: USER_EVENTS,
  CONVERSATION: CONVERSATION_EVENTS,
  MESSAGE: MESSAGE_EVENTS,
};
