import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateConversation } from "@/hooks/mutations/useCreateConversation";
import { useFindUserByUsername } from "@/hooks/mutations/useFindUserByUsername";
import { getApiErrorMessage } from "@/lib/apiError";

interface CreateDirectChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDirectChatDialog({
  open,
  onOpenChange,
}: CreateDirectChatDialogProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: findUserByUsername, isPending: isFindingUser } =
    useFindUserByUsername();
  const { mutateAsync: createConversation, isPending: isCreating } =
    useCreateConversation();

  const resetState = () => {
    setUsername("");
    setError(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }

    onOpenChange(open);
  };
  const handleSubmit = async () => {
    setError(null);

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    try {
      const user = await findUserByUsername(trimmedUsername);

      const conversation = await createConversation({
        userIds: [user.id],
      });

      onOpenChange(false);
      setUsername("");

      navigate(`/conversations/${conversation.id}`);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Start Direct Chat
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Enter username..."
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          className="cursor-pointer"
          onClick={handleSubmit}
          disabled={isFindingUser || isCreating}
        >
          {isFindingUser || isCreating ? "Loading..." : "Start Chat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
