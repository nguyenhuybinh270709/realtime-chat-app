import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getConversationDisplayInfo } from "@/utils/conversation";
import { formatMessageTime } from "@/utils/formatMessageTime";

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  onClick: () => void;
  active?: boolean;
}

export const ConversationItem = ({
  conversation,
  currentUserId,
  active,
  onClick,
}: ConversationItemProps) => {
  const { avatar, displayName } = getConversationDisplayInfo(
    conversation,
    currentUserId,
  );

  return (
    <button
      type="button"
      className={`w-full text-left grid grid-cols-[auto_1fr] items-center gap-3 p-3 cursor-pointer transition-colors rounded-lg hover:bg-muted hover:text-accent-foreground ${active ? "bg-primary/6 text-primary" : ""}`}
      onClick={onClick}
    >
      {/* Conversation Image */}
      <Avatar className="h-12 w-12 border">
        <AvatarImage src={avatar} alt={displayName} />
        <AvatarFallback>
          {displayName?.charAt(0)?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      {/* Conversation Content */}
      <div className="min-w-0 overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-2 mb-1">
          {/* Conversation Name */}
          <h4 className="font-semibold text-sm truncate">{displayName}</h4>
          {/* Last Message Time */}
          <span className="text-[10px] text-foreground/60 whitespace-nowrap capitalize">
            {formatMessageTime(conversation.lastMessageAt) ?? ""}
          </span>
        </div>

        {/* Message Preview */}
        <p className="text-xs text-muted-foreground dark:text-white/70 truncate">
          {conversation.lastMessagePreview ??
            "Send a message to start the chat"}
        </p>
      </div>
    </button>
  );
};
