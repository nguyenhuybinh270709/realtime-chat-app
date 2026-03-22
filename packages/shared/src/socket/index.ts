import { BASE_EVENTS } from "./base";
import { CONVERSATION_EVENTS } from "./conversation";
import { MESSAGE_EVENTS } from "./message";
import { USER_EVENTS } from "./user";

export * from "./base";
export * from "./conversation";
export * from "./message";
export * from "./user";

export * from "./socket.types";

export const SOCKET_EVENTS = {
  BASE: BASE_EVENTS,
  CONVERSATION: CONVERSATION_EVENTS,
  MESSAGE: MESSAGE_EVENTS,
  USER: USER_EVENTS,
} as const;
