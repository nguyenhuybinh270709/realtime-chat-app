import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { useNotify } from "@/hooks/useNotify";
import { Bell, Eye, Languages, ShieldCheck } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const notify = useNotify();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90dvh] h-[90dvh] flex flex-col gap-0 overflow-hidden p-0">
        {/* Dialog Header */}
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account preferences and security.
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Body */}
        <div className="flex-1 min-h-0 px-6">
          <ScrollArea className="h-full w-full">
            <div className="space-y-6 py-2">
              {/* Preferences */}
              <section className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground px-1 uppercase tracking-wider">
                  Preferences
                </h4>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  {/* Notifications */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">
                          Notifications
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Receive desktop alerts
                        </p>
                      </div>
                    </div>
                    <Switch
                      className="cursor-pointer"
                      defaultChecked
                      onCheckedChange={notify.featureUnavailable}
                    />
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-3 border-t">
                    <div className="flex items-center gap-3">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">Language</span>
                        <p className="text-xs text-muted-foreground">
                          English (US)
                        </p>
                      </div>
                    </div>
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant="ghost"
                      onClick={notify.featureUnavailable}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </section>

              {/* Security & Privacy */}
              <section className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground px-1 uppercase tracking-wider">
                  Security & Privacy
                </h4>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  {/* Two-Factor Auth */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">
                          Two-Factor Auth
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Add extra security
                        </p>
                      </div>
                    </div>
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant="outline"
                      onClick={notify.featureUnavailable}
                    >
                      Enable
                    </Button>
                  </div>

                  {/* Profile Visibility */}
                  <div className="flex items-center justify-between p-3 border-t">
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">
                          Profile Visibility
                        </span>
                        <p className="text-xs text-muted-foreground">Public</p>
                      </div>
                    </div>
                    <Switch
                      className="cursor-pointer"
                      onCheckedChange={notify.featureUnavailable}
                    />
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="p-4 border-t shrink-0 sm:justify-center items-center">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto cursor-pointer">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
