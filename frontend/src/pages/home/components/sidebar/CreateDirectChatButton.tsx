import { Button } from "@/components/ui/button";
import { CreateDirectChatDialog } from "@/pages/home/components/dialog/CreateDirectChatDialog";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export function CreateDirectChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="size-9 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <UserPlus className="size-4" />
      </Button>

      <CreateDirectChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
