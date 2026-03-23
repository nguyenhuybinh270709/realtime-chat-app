import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessage } from "@/hooks/mutations/useCreateMessage";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  conversationId: string;
}

export function ChatInput({ conversationId }: ChatInputProps) {
  const { mutate, isPending } = useCreateMessage(conversationId);

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    mutate({
      body: message,
      conversationId,
    });

    setMessage("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t-2 px-6 py-3 shrink-0 bg-background">
      <form
        className="flex items-end w-full max-w-3xl mx-auto gap-2"
        onSubmit={handleSubmit}
      >
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none min-h-9 max-h-26 px-6 overflow-y-auto rounded-2xl bg-muted border-none py-2 focus-visible:ring-1"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full shrink-0 cursor-pointer"
          disabled={isPending}
        >
          <SendHorizontal className="h-4 w-8" />
        </Button>
      </form>
    </div>
  );
}
