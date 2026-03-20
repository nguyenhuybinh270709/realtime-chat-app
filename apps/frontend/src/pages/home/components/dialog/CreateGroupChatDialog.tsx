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
import { X } from "lucide-react";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserDTO } from "@realtime-chat-app/shared";

interface CreateGroupChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupChatDialog({
  open,
  onOpenChange,
}: CreateGroupChatDialogProps) {
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  const [conversationName, setConversationName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<UserDTO[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: findUserByUsername, isPending: isFindingUser } =
    useFindUserByUsername();
  const { mutateAsync: createConversation, isPending: isCreating } =
    useCreateConversation();

  const resetState = () => {
    setConversationName("");
    setUsername("");
    setSelectedParticipants([]);
    setError(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }

    onOpenChange(open);
  };
  const handleAddUser = async () => {
    if (isFindingUser) return;

    setError(null);

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    try {
      const user = await findUserByUsername(trimmedUsername);

      if (user.id === currentUser?.id) {
        setError("You cannot add yourself");
        return;
      }

      const isAlreadyAdded = selectedParticipants.some((p) => p.id === user.id);

      if (isAlreadyAdded) {
        setError("User already added");
        return;
      }

      setSelectedParticipants((prev) => [...prev, user]);
      setUsername("");
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };
  const handleRemoveUser = (id: string) => {
    setSelectedParticipants((prev) => prev.filter((p) => p.id !== id));
  };
  const handleCreateGroup = async () => {
    setError(null);

    if (selectedParticipants.length < 2) {
      setError("Group must have at least 2 other users");
      return;
    }

    try {
      const conversation = await createConversation({
        conversationName: conversationName.trim() || undefined,
        userIds: selectedParticipants.map((participant) => participant.id),
      });

      onOpenChange(false);

      navigate(`/conversations/${conversation.id}`);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90dvh] flex flex-col space-y-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create Group Chat
          </DialogTitle>
        </DialogHeader>

        {/* Group name */}
        <div className="space-y-2">
          <p className="text-md font-medium">Group name</p>
          <Input
            placeholder="Group name (optional)"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />
        </div>

        {/* Add participant */}
        <div className="space-y-2">
          <p className="text-md font-medium">Participants</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddUser();
                }
              }}
            />

            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              onClick={handleAddUser}
              disabled={isFindingUser}
            >
              Add
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Participants list */}
        {selectedParticipants.length > 0 && (
          <div className="flex flex-col gap-2 overflow-y-auto max-h-48">
            {selectedParticipants.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border bg-muted/40 p-2"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.profileImage ?? undefined}
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {(user.displayName || user.username).charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* displayName + username */}
                  <div className="flex flex-col leading-tight">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive cursor-pointer"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  <X className="size-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Create group button */}
        <div>
          <Button
            className="w-full cursor-pointer"
            onClick={handleCreateGroup}
            disabled={isFindingUser || isCreating}
          >
            {isCreating ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
