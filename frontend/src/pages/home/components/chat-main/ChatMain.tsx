import { MOCK_MESSAGES } from "@/data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMainHeader } from "./ChatMainHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { MessageSquarePlus } from "lucide-react";
import { useGetConversationById } from "@/hooks/queries/useGetConversationById";
import AppLoader from "@/components/AppLoader";
import { ConversationNotFound } from "@/pages/home/components/chat-main/ConversationNotFound";

interface ChatMainProps {
  currentUserId: string;
  toggleConversationInfo: () => void;
}

export function ChatMain({
  currentUserId,
  toggleConversationInfo,
}: ChatMainProps) {
  const navigate = useNavigate();

  const { conversationId } = useParams();

  const { data: conversation, isLoading } =
    useGetConversationById(conversationId);

  if (isLoading) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center space-y-5">
        <AppLoader />
      </main>
    );
  }

  if (!conversation) {
    return <ConversationNotFound />;
  }

  const messages = MOCK_MESSAGES.filter(
    (message) => message.conversationId === conversationId,
  );

  return (
    <main className="flex flex-col w-full h-full bg-background overflow-hidden">
      {/* Chat Header */}
      <ChatMainHeader
        conversation={conversation}
        currentUserId={currentUserId}
        onBack={() => navigate("/")}
        toggleConversationInfo={toggleConversationInfo}
      />

      {/* Chat Messages */}
      <div className="flex-1 min-h-0">
        {messages.length > 0 ? (
          <MessageList
            messages={messages}
            conversation={conversation}
            currentUserId={currentUserId}
          />
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
