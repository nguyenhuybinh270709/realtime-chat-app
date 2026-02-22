import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMainHeader } from "./ChatMainHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { MessageCircleMore, MessageSquarePlus } from "lucide-react";

export function ChatMain() {
  const navigate = useNavigate();

  const { id: conversationId } = useParams();

  const conversation = MOCK_CONVERSATIONS.find(
    (conversation) => conversation.id === conversationId,
  );

  if (!conversation) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center space-y-5">
        <MessageCircleMore className="size-20" />
        <p className="text-3xl font-semibold">Conversation not found</p>
      </main>
    );
  }

  const messages = MOCK_MESSAGES.filter(
    (message) => message.conversationId === conversationId,
  );

  return (
    <main className="flex flex-col w-full h-full bg-background overflow-hidden">
      {/* Chat Header */}
      <ChatMainHeader
        conversation={conversation}
        onBack={() => navigate("/")}
      />

      {/* Chat Messages */}
      <div className="flex-1 min-h-0">
        {messages.length > 0 ? (
          <MessageList messages={messages} conversation={conversation} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
            <div className="p-4 bg-secondary rounded-full">
              <MessageSquarePlus className="size-10" />
            </div>
            <p className="text-lg font-medium">No message yet</p>
            <p className="text-sm">Send a message to start the conversation!</p>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput />
    </main>
  );
}
