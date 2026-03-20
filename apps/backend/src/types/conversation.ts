import type { Prisma } from "@/generated/prisma/client";

export const conversationParticipantSelect = {
  role: true,
  user: {
    select: {
      id: true,
      displayName: true,
      profileImage: true,
    },
  },
} satisfies Prisma.ConversationParticipantSelect;

export const conversationSelect = {
  id: true,
  conversationName: true,
  isGroup: true,
  lastMessagePreview: true,
  lastMessageAt: true,
  createdAt: true,
  participants: {
    select: conversationParticipantSelect,
  },
} satisfies Prisma.ConversationSelect;
