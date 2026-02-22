import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_CONVERSATIONS } from "@/data/mockData";
import { ConversationItem } from "@/pages/home/components/sidebar/ConversationItem";
import { useNavigate, useParams } from "react-router-dom";

export function ConversationList() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-2 space-y-1 bg-muted/40">
        {MOCK_CONVERSATIONS.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => navigate(`/conversation/${conversation.id}`)}
            active={conversation.id === id}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
