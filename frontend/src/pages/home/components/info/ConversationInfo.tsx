import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getConversationDisplayInfo } from "@/utils/conversation";

interface ConversationInfoProps {
  conversation: Conversation;
  currentUserId: string;
  onClose: () => void;
}

export function ConversationInfo({
  conversation,
  currentUserId,
  onClose,
}: ConversationInfoProps) {
  const { otherUser, isGroup, displayName, avatar } =
    getConversationDisplayInfo(conversation, currentUserId);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between lg:justify-center border-b shrink-0">
        <p className="text-2xl font-semibold">Conversation Info</p>

        {/* Mobile close button */}
        <Button
          className="lg:hidden cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-6 flex flex-col items-center">
          {/* Conversation Profile */}
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {displayName?.charAt(0)?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-lg font-semibold">{displayName}</h2>
          {!isGroup && <p className="text-sm text-muted-foreground">Offline</p>}

          {isGroup ? (
            // Participants for group
            <div className="mt-6 w-full">
              <h3 className="flex text-md font-bold mb-3">
                Participants
                <span className="ml-1 text-muted-foreground">
                  ({conversation.participants.length})
                </span>
              </h3>

              <div className="space-y-2">
                {conversation.participants.map((participant) => (
                  <div
                    key={participant.user.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={participant.user.profileImage ?? undefined}
                      />
                      <AvatarFallback>
                        {participant.user.displayName
                          ?.charAt(0)
                          ?.toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-sm font-medium">
                        {participant.user.displayName ?? "Unknown"}
                        {participant.user.id === currentUserId && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            (Me)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {participant.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Bio for direct (1-1) conversation
            <div className="w-full mt-4">
              <h3 className="text-md font-bold ml-1">Bio:</h3>
              <div className="mt-1 bg-muted/30 p-4 rounded-xl border">
                <p className="text-sm text-muted-foreground">
                  {otherUser?.user.bio ?? "No bio yet"}
                </p>
              </div>
            </div>
          )}

          <Separator className="my-6 bg-zinc-300 dark:bg-zinc-600" />

          {/* Actions */}
          <div className="w-full space-y-1">
            {/* Delete Action */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  Delete conversation
                </Button>
              </AlertDialogTrigger>
              {/* Confirmation Dialog */}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone. All messages in this
                    conversation will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                {/* Dialog Actions */}
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive! hover:bg-destructive/80! cursor-pointer">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
