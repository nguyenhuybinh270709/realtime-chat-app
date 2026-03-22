import type { ConversationRole } from "@realtime-chat-app/shared";

const rolePriority = {
  owner: 0,
  member: 1,
} as const;

type RoleKey = keyof typeof rolePriority;

export const sortParticipants = <T extends { role: ConversationRole | null }>(
  participants: T[],
): T[] => {
  return [...participants].sort((a, b) => {
    const priorityA = rolePriority[a.role as RoleKey] ?? rolePriority.member;
    const priorityB = rolePriority[b.role as RoleKey] ?? rolePriority.member;

    return priorityA - priorityB;
  });
};
