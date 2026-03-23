import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotify } from "@/hooks/useNotify";
import { useUserStatusStore } from "@/store/userStatus.store";
import { getConversationDisplayInfo } from "@/utils/conversation";
import type { ConversationDTO } from "@realtime-chat-app/shared";
import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";

interface ChatMainHeaderProps {
  conversation: ConversationDTO;
  currentUserId: string;
  onBack: () => void;
  toggleConversationInfo: () => void;
}

export function ChatMainHeader({
  conversation,
  currentUserId,
  onBack,
  toggleConversationInfo,
}: ChatMainHeaderProps) {
  const notify = useNotify();

  const otherParticipant = conversation.participants.find(
    (participants) => participants.user.id !== currentUserId,
  );
  const otherUserId = otherParticipant?.user.id;
  const status = useUserStatusStore((s) =>
    otherUserId ? s.userStatus.get(otherUserId) : undefined,
  );
  const isOnline = Boolean(status?.isOnline);

  const { isGroup, displayName, avatar } = getConversationDisplayInfo(
    conversation,
    currentUserId,
  );

  return (
    <header className="h-16 border-b flex items-center px-4 gap-3 shrink-0">
      {/* Back button on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Avatar */}
      <div className="relative inline-block">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={displayName} />
          <AvatarFallback>
            {displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
        {/* Online/Offline status */}
        {!conversation.isGroup && (
          <span
            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white dark:border-slate-950 ${
              isOnline ? "bg-green-500" : "bg-slate-500"
            }`}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-sm">{displayName}</p>
        {!isGroup && (
          <p className="text-xs text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1">
        {/* Voice Call */}
        <Button
          className="cursor-pointer"
          size="icon"
          variant="ghost"
          onClick={notify.featureUnavailable}
        >
          <Phone className="size-4" />
        </Button>

        {/* Video Call */}
        <Button
          className="cursor-pointer"
          size="icon"
          variant="ghost"
          onClick={notify.featureUnavailable}
        >
          <Video className="size-4" />
        </Button>

        {/* View Conversation Info */}
        <Button
          className="cursor-pointer"
          size="icon"
          variant="ghost"
          onClick={toggleConversationInfo}
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </header>
  );
}
