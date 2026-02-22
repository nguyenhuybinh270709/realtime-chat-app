import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotify } from "@/hooks/useNotify";
import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface ChatMainHeaderProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ChatMainHeader({ conversation, onBack }: ChatMainHeaderProps) {
  const notify = useNotify();

  const { toggleConversationInfo } = useOutletContext<{
    toggleConversationInfo: () => void;
  }>();

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
        <AvatarImage src={conversation.profilePicture} />
        <AvatarFallback>
          {conversation.displayName?.charAt(0)?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-sm">{conversation.displayName}</p>
        <p className="text-xs text-muted-foreground">Offline</p>
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
