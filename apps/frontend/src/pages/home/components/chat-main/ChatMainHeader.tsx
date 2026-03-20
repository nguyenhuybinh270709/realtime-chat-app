import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotify } from "@/hooks/useNotify";
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
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {displayName?.charAt(0)?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-sm">{displayName}</p>
        {!isGroup && <p className="text-xs text-muted-foreground">Offline</p>}
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
