import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_CURRENT_USER } from "@/data/mockData";
import { useNotify } from "@/hooks/useNotify";
import { useState } from "react";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const notify = useNotify();

  const [name, setName] = useState(MOCK_CURRENT_USER.displayName);
  const [bio, setBio] = useState(MOCK_CURRENT_USER.bio);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90dvh] h-[90dvh] flex flex-col gap-0 overflow-hidden p-0">
        {/* Dialog Header */}
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="flex-1 min-h-0 px-6">
          <ScrollArea className="h-full w-full">
            <div className="grid gap-6 py-4">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  <AvatarImage src={MOCK_CURRENT_USER.profilePicture} />
                  <AvatarFallback>
                    {MOCK_CURRENT_USER.displayName?.charAt(0).toUpperCase() ??
                      "?"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="sm"
                  className="relative overflow-hidden cursor-pointer"
                  onClick={notify.featureUnavailable}
                >
                  Change Avatar
                </Button>
              </div>

              {/* Profile Form */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </ScrollArea>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="p-4 border-t shrink-0 sm:justify-center items-center">
          <Button
            className="w-full sm:w-auto cursor-pointer"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
