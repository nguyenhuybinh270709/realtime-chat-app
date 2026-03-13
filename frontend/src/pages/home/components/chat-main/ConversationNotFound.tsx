import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ConversationNotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col flex-1 items-center justify-center text-center relative">
      <div className="flex flex-col items-center space-y-2 max-w-sm">
        {/* Icon */}
        <div className="p-6 rounded-full bg-secondary">
          <MessageCircleMore className="size-12 text-muted-foreground" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">Conversation not found</h1>

        {/* Description */}
        <p className="text-md text-muted-foreground">
          This conversation may have been deleted or you don't have access to
          it.
        </p>

        {/* Mobile close */}
        <Button
          className="lg:hidden mt-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back to home
        </Button>
      </div>
    </main>
  );
}
