import { MessageCircle } from "lucide-react";

export function NoConversationSelected() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50/40 dark:bg-zinc-950/40">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-border">
          <MessageCircle className="size-10 text-primary" />
        </div>

        <div className="mt-3 space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready to chat?
          </h2>
          <p className="text-lg text-muted-foreground">
            Select a conversation to start messaging
          </p>
        </div>

        <div className="mt-8 h-px w-32 bg-linear-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
}
