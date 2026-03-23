import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStatusStore } from "@/store/userStatus.store";
import type { ConversationParticipantDTO } from "@realtime-chat-app/shared";

interface ParticipantItemProp {
  participant: ConversationParticipantDTO;
  currentUserId: string;
}

export const ParticipantItem = ({
  participant,
  currentUserId,
}: ParticipantItemProp) => {
  const isOnline = useUserStatusStore(
    (s) => s.userStatus.get(participant.user.id)?.isOnline,
  );

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition">
      <div className="relative inline-block">
        <Avatar className="h-10 w-10">
          <AvatarImage src={participant.user.profileImage ?? undefined} />
          <AvatarFallback>
            {participant.user.displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>

        <span
          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white dark:border-slate-950 ${
            isOnline ? "bg-green-500" : "bg-slate-500"
          }`}
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium">
          {participant.user.displayName ?? "Unknown"}
          {participant.user.id === currentUserId && (
            <span className="ml-1 text-xs text-muted-foreground">(Me)</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground capitalize">
          {participant.role}
        </p>
      </div>
    </div>
  );
};
