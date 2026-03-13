import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/pages/home/components/chat-main/MessageBubble";

interface MessageListProps {
  messages: Message[];
  conversation: Conversation;
  currentUserId: string;
}

export function MessageList({
  messages,
  conversation,
  currentUserId,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages.length]);

  return (
    <ScrollArea className="h-full min-h-0 w-full bg-muted dark:bg-muted/70">
      <div className="max-w-[95%] mx-auto py-3 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            conversation={conversation}
            currentUserId={currentUserId}
          />
        ))}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
