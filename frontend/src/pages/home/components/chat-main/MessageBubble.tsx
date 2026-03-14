import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  conversation: Conversation;
  currentUserId: string;
}

export function MessageBubble({
  message,
  conversation,
  currentUserId,
}: MessageBubbleProps) {
  const sender = conversation.participants.find(
    (p) => p.user.id === message.senderId,
  )?.user;

  const avatar = sender?.profileImage ?? undefined;
  const displayName = sender?.displayName ?? "Unknown";

  const fromMe = message.senderId === currentUserId;

  return (
    <div className={`flex gap-3 ${fromMe ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!fromMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message wrapper */}
      <div
        className={`flex flex-col max-w-[80%] ${
          fromMe ? "items-end" : "items-start"
        }`}
      >
        {/* displayName (group chat only) */}
        {!fromMe && conversation.isGroup && (
          <p className="text-xs text-muted-foreground mb-1">{displayName}</p>
        )}

        {/* Message */}
        <div
          className={`px-4 py-2 rounded-2xl text-sm break-all whitespace-pre-wrap ${
            fromMe
              ? "bg-blue-100 dark:bg-blue-600 dark:text-white shadow-sm rounded-tr-sm"
              : "bg-white dark:bg-gray-700 text-accent-foreground rounded-tl-sm"
          }`}
        >
          {message.body}
        </div>
      </div>
    </div>
  );
}
