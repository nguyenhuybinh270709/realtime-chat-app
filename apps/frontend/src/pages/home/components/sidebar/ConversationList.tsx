import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationItem } from "@/pages/home/components/sidebar/ConversationItem";
import type { ConversationDTO, UserDTO } from "@realtime-chat-app/shared";
import { useNavigate } from "react-router-dom";

interface ConversationListProps {
  conversations: ConversationDTO[];
  currentUser: UserDTO;
  activeConversationId?: string;
}

export function ConversationList({
  conversations,
  currentUser,
  activeConversationId,
}: ConversationListProps) {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-2 space-y-1 bg-muted/40">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            currentUserId={currentUser.id}
            onClick={() => navigate(`/conversations/${conversation.id}`)}
            active={conversation.id === activeConversationId}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
