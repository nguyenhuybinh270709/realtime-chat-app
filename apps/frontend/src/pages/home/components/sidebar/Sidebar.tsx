import { UserMenu } from "@/pages/home/components/sidebar/components/UserMenu";
import { ConversationList } from "./components/ConversationList";
import { MessagesSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { CreateDirectChatButton } from "@/pages/home/components/sidebar/components/CreateDirectChatButton";
import { CreateGroupChatButton } from "@/pages/home/components/sidebar/components/CreateGroupChatButton";
import type { ConversationDTO, UserDTO } from "@realtime-chat-app/shared";

interface SidebarProps {
  conversations: ConversationDTO[];
  currentUser: UserDTO;
  activeConversationId?: string;
}

export function Sidebar({
  conversations,
  currentUser,
  activeConversationId,
}: SidebarProps) {
  return (
    <aside className="w-full border-r flex flex-col h-dvh overflow-hidden">
      {/* Sidebar Header */}
      <header className="p-4 space-y-4 shrink-0 border-b bg-background">
        {/* App Logo */}
        <h1 className="text-2xl font-bold tracking-tight">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <MessagesSquare className="size-6" />
            <span>Real-time Chat App</span>
          </Link>
        </h1>

        <div className="flex gap-2">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground/70" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1"
            />
          </div>

          <CreateDirectChatButton />
          <CreateGroupChatButton />
        </div>
      </header>

      {/* Conversation List */}
      <div className="flex-1 min-h-0">
        <ConversationList
          conversations={conversations}
          currentUser={currentUser}
          activeConversationId={activeConversationId}
        />
      </div>

      {/* Sidebar Footer */}
      <div className="h-16 border-t flex items-center px-4 shrink-0 bg-background">
        <UserMenu currentUser={currentUser} />
      </div>
    </aside>
  );
}
