import { useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/pages/home/components/sidebar/Sidebar";
import { ConversationInfo } from "@/pages/home/components/conversation-details/ConversationInfo";
import { useGetConversations } from "@/hooks/queries/useGetConversations";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { ChatMain } from "@/pages/home/components/chat-main/ChatMain";
import { NoConversationSelected } from "@/pages/home/components/chat-main/components/NoConversationSelected";
import AppLoader from "@/components/AppLoader";
import { useSocketConversation } from "@/hooks/socket/useSocketConversation";

export default function Home() {
  const { conversationId } = useParams();

  const { data: conversations } = useGetConversations();
  const { data: currentUser } = useGetCurrentUser();

  useSocketConversation(conversationId);

  const [isConversationInfoOpen, setIsConversationInfoOpen] = useState(false);

  const activeConversation = conversations?.find(
    (conversation) => conversation.id === conversationId,
  );

  if (!currentUser) return <AppLoader />;

  return (
    <div className="h-dvh flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${conversationId ? "hidden" : "flex"} lg:flex w-full lg:w-2/7 border-r shrink-0`}
      >
        <Sidebar
          conversations={conversations ?? []}
          currentUser={currentUser}
          activeConversationId={conversationId}
        />
      </aside>

      {/* Main Chat */}
      <main className="flex-1 min-w-0 flex h-full relative">
        {conversationId ? (
          <ChatMain
            currentUserId={currentUser.id}
            conversationId={conversationId}
            toggleConversationInfo={() =>
              setIsConversationInfoOpen((prev) => !prev)
            }
          />
        ) : (
          <NoConversationSelected />
        )}

        {/* Mobile Conversation Info */}
        {activeConversation && (
          <div
            className={`lg:hidden absolute inset-0 z-50 bg-background transition-transform duration-300 ease-in-out ${isConversationInfoOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <ConversationInfo
              conversation={activeConversation}
              currentUserId={currentUser.id}
              onClose={() => setIsConversationInfoOpen(false)}
            />
          </div>
        )}
      </main>

      {/* Desktop Conversation Info */}
      {activeConversation && (
        <aside
          className={`hidden lg:flex border-l shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${isConversationInfoOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-l-0"}`}
        >
          <div className="w-80 h-full shrink-0">
            <ConversationInfo
              conversation={activeConversation}
              currentUserId={currentUser.id}
              onClose={() => setIsConversationInfoOpen(false)}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
