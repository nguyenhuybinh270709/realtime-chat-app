export const CONVERSATION_EVENTS = {
  // client → server
  JOIN: "conversation:join",
  LEAVE: "conversation:leave",

  // server → client
  CREATED: "conversation:created",
  UPDATED: "conversation:updated",
  REMOVED: "conversation:removed",
} as const;

export type ConversationEvent =
  (typeof CONVERSATION_EVENTS)[keyof typeof CONVERSATION_EVENTS];
