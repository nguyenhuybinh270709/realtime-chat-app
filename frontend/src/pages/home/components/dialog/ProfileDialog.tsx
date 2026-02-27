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
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";
import { useNotify } from "@/hooks/useNotify";
import { X } from "lucide-react";
import { useState } from "react";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { data: user } = useGetCurrentUser();

  const notify = useNotify();

  const [name, setName] = useState(user?.displayName);
  const [bio, setBio] = useState(user?.bio ?? "");

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
            <div className="grid gap-6 py-4 px-5">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  <AvatarImage src={user?.profileImage || ""} />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0).toUpperCase() ?? "?"}
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
                {/* Display Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pr-9"
                    />
                    {name && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 h-full w-9 hover:bg-transparent text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => setName("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {/* Bio */}
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <div className="relative">
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="pr-9 min-h-25 break-all"
                    />
                    {bio && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => setBio("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
