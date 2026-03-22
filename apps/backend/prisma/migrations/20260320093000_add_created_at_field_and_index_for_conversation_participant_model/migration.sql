-- AlterTable
ALTER TABLE "ConversationParticipant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "ConversationParticipant_conversationId_createdAt_idx" ON "ConversationParticipant"("conversationId", "createdAt");
