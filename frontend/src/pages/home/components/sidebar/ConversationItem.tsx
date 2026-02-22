import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_MESSAGES } from "@/data/mockData";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
  active?: boolean;
}

export const ConversationItem = ({
  conversation,
  active,
  onClick,
}: ConversationItemProps) => {
  const lastMessage =
    MOCK_MESSAGES.filter(
      (message) => message.conversationId === conversation.id,
    ).slice(-1)[0]?.body ?? "Send a message to start the chat";

  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-[auto_1fr] items-center gap-3 p-3 cursor-pointer transition-colors rounded-lg hover:bg-muted hover:text-accent-foreground ${active ? "bg-primary/6 text-primary" : ""}`}
    >
      {/* Conversation Image */}
      <Avatar className="h-12 w-12 border">
        <AvatarImage
          src={conversation.profilePicture}
          alt={conversation.displayName}
        />
        <AvatarFallback>
          {conversation.displayName?.charAt(0)?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      {/* Conversation Content */}
      <div className="min-w-0 overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-2 mb-1">
          {/* Conversation Name */}
          <h4 className="font-semibold text-sm truncate">
            {conversation.displayName}
          </h4>
          {/* Last Message Time */}
          <span className="text-[10px] text-foreground/60 whitespace-nowrap uppercase">
            12:00
          </span>
        </div>

        {/* Message Preview */}
        <p className="text-xs text-muted-foreground dark:text-white/70 truncate">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};
