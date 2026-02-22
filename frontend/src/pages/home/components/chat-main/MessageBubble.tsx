import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  conversation: Conversation;
}

export function MessageBubble({ message, conversation }: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 ${
        message.fromMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!message.fromMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={conversation.profilePicture} />
          <AvatarFallback>
            {conversation.displayName?.charAt(0)?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message */}
      <div
        className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] wrap-break-word ${
          message.fromMe
            ? "bg-blue-100 dark:bg-blue-600 dark:text-white shadow-sm rounded-tr-sm"
            : "bg-white dark:bg-gray-700 text-accent-foreground rounded-tl-sm"
        }`}
      >
        {message.body}
      </div>
    </div>
  );
}
