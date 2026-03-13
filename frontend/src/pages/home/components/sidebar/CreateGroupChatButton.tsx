import { Button } from "@/components/ui/button";
import { CreateGroupChatDialog } from "@/pages/home/components/dialog/CreateGroupChatDialog";
import { Users } from "lucide-react";
import { useState } from "react";

export function CreateGroupChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="size-9 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Users className="size-4" />
      </Button>

      <CreateGroupChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
