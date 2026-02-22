import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "@/pages/home/components/sidebar/Sidebar";
import { ConversationInfo } from "@/pages/home/components/info/ConversationInfo";
import { MOCK_CONVERSATIONS } from "@/data/mockData";

export default function Home() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showConversationInfo, setShowConversationInfo] = useState(false);

  const activeConversation = MOCK_CONVERSATIONS.find(
    (conversation) => conversation.id === id,
  );

  return (
    <div className="h-dvh flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${id ? "hidden" : "flex"} lg:flex w-full lg:w-2/7 border-r shrink-0`}
      >
        <Sidebar />
      </aside>

      {/* Main Chat Layout */}
      <main
        key={id}
        className={`flex-1 min-w-0 ${id ? "flex" : "hidden"} lg:flex h-full relative`}
      >
        {/* Main Chat Area */}
        <Outlet
          context={{
            onBack: () => navigate("/"),
            toggleConversationInfo: () =>
              setShowConversationInfo((prev) => !prev),
          }}
        />

        {/* Mobile Conversation Info */}
        {activeConversation && (
          <div
            className={`lg:hidden absolute inset-0 z-50 bg-background transition-transform duration-300 ease-in-out ${showConversationInfo ? "translate-x-0" : "translate-x-full"}`}
          >
            <ConversationInfo
              conversation={activeConversation}
              onClose={() => setShowConversationInfo(false)}
            />
          </div>
        )}
      </main>

      {/* Desktop Conversation Info */}
      {activeConversation && (
        <aside
          className={`hidden lg:flex border-l shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${showConversationInfo ? "w-80 opacity-100" : "w-0 opacity-0 border-l-0"}`}
        >
          <div className="w-80 h-full shrink-0">
            <ConversationInfo
              conversation={activeConversation}
              onClose={() => setShowConversationInfo(false)}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
