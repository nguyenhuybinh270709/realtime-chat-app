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
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { useNotify } from "@/hooks/useNotify";
import { mapZodErrors } from "@/lib/zod";
import { updateProfileSchema } from "@/pages/home/schema/updateProfile.schema";
import { X } from "lucide-react";
import { useState } from "react";
import type z from "zod";

interface ProfileDialogProps {
  currentUser: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export function ProfileDialog({
  currentUser,
  open,
  onOpenChange,
}: ProfileDialogProps) {
  const { mutate, isPending } = useUpdateProfile();

  const notify = useNotify();

  const [form, setForm] = useState<UpdateProfileForm>({
    displayName: currentUser.displayName ?? "",
    bio: currentUser.bio ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateProfileForm, string>>
  >({});

  const handleChange = (field: keyof UpdateProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = updateProfileSchema.safeParse(form);

    if (!result.success) {
      setErrors(mapZodErrors<UpdateProfileForm>(result.error.issues));
      return;
    }

    setErrors({});
    mutate(result.data);
  };

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
          <form className="flex flex-col h-full" onSubmit={handleSubmit}>
            <ScrollArea className="flex-1 min-h-0">
              <div className="grid gap-6 py-6 px-5">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-muted">
                    <AvatarImage src={currentUser.profileImage ?? undefined} />
                    <AvatarFallback>
                      {currentUser.displayName?.charAt(0).toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="relative overflow-hidden cursor-pointer"
                    onClick={notify.featureUnavailable}
                  >
                    Change Avatar
                  </Button>
                </div>
                {/* Display Name */}
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="displayName"
                      value={form.displayName}
                      onChange={(e) =>
                        handleChange("displayName", e.target.value)
                      }
                      className="pr-9"
                    />
                  </div>
                  {errors.displayName && (
                    <p className="text-sm text-destructive">
                      {errors.displayName}
                    </p>
                  )}
                </div>
                {/* Bio */}
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <div className="relative">
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={form.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      className="pr-9 min-h-25 break-all"
                    />
                    {form.bio && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => handleChange("bio", "")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {errors.bio && (
                    <p className="text-sm text-destructive">{errors.bio}</p>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Dialog Footer */}
            <DialogFooter className="p-4 border-t shrink-0 sm:justify-center items-center">
              <Button
                type="button"
                className="w-full sm:w-auto cursor-pointer"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
