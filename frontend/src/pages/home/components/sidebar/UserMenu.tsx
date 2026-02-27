import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { ProfileDialog } from "@/pages/home/components/dialog/ProfileDialog";
import { SettingsDialog } from "@/pages/home/components/dialog/SettingsDialog";
import { useState } from "react";
import { useLogout } from "@/hooks/mutations/useLogout";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";

export function UserMenu() {
  const { data: user } = useGetCurrentUser();

  const { mutate, isPending } = useLogout();

  const { theme, setTheme } = useTheme();

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  const [activeDialog, setActiveDialog] = useState<
    "profile" | "settings" | null
  >(null);

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setActiveDialog(null);
    }
  };

  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 px-2 cursor-pointer hover:bg-accent"
          >
            <Avatar className="size-7">
              <AvatarImage src={user?.profileImage || ""} />
              <AvatarFallback>
                {user?.displayName.charAt(0)?.toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{user?.displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" side="top">
          {/* Profile */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setActiveDialog("profile")}
          >
            <UserIcon className="mr-2 size-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          {/* Settings */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setActiveDialog("settings")}
          >
            <SettingsIcon className="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          {/* Theme */}
          <DropdownMenuSub open={themeOpen} onOpenChange={setThemeOpen}>
            <DropdownMenuSubTrigger
              className="cursor-pointer "
              onClick={() => {
                setThemeOpen((prev) => !prev);
              }}
            >
              <ThemeIcon className="mr-2 size-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            {/* Theme Options */}
            <DropdownMenuSubContent>
              {/* Light */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 size-4" />
                <span>Light</span>
                {theme === "light" && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>

              {/* Dark */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 size-4" />
                <span>Dark</span>
                {theme === "dark" && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>

              {/* System */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 size-4" />
                <span>System</span>
                {theme === "system" && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            onClick={() => mutate()}
            disabled={isPending}
          >
            <LogOutIcon className="text-destructive mr-2 size-4" />
            <span>{isPending ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dialog */}
      <ProfileDialog
        open={activeDialog === "profile"}
        onOpenChange={handleDialogChange}
      />

      {/* Setting Dialog */}
      <SettingsDialog
        open={activeDialog === "settings"}
        onOpenChange={handleDialogChange}
      />
    </>
  );
}
