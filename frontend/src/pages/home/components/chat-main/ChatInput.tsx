import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

export function ChatInput() {
  return (
    <div className="h-20 border-t-2 flex items-center px-4 shrink-0 bg-background">
      <form
        className="flex w-full max-w-3xl mx-auto gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          placeholder="Type a message..."
          className="rounded-full bg-muted border-none focus-visible:ring-1"
        />
        <Button size="icon" className="rounded-full shrink-0 cursor-pointer">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
