-- AlterTable
ALTER TABLE "ConversationParticipant" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;
