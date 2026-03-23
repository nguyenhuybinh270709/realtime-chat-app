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
import { useDeleteGroup } from "@/hooks/mutations/useDeleteGroup";
import type { ConversationDTO } from "@realtime-chat-app/shared";
import { useLeaveGroup } from "@/hooks/mutations/useLeaveGroup";
import { useUserStatusStore } from "@/store/userStatus.store";
import { ParticipantItem } from "@/pages/home/components/conversation-details/components/ParticipantItem";

interface ConversationInfoProps {
  conversation: ConversationDTO;
  currentUserId: string;
  onClose: () => void;
}

export function ConversationInfo({
  conversation,
  currentUserId,
  onClose,
}: ConversationInfoProps) {
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup();
  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();

  const { otherParticipant, isGroup, displayName, avatar } =
    getConversationDisplayInfo(conversation, currentUserId);

  const otherUserId = otherParticipant?.user.id;
  const status = useUserStatusStore((s) =>
    otherUserId ? s.userStatus.get(otherUserId) : undefined,
  );
  const isOnline = Boolean(status?.isOnline);

  const currentUserParticipant = conversation.participants.find(
    (participant) => participant.user.id === currentUserId,
  );
  const isOwner = currentUserParticipant?.role === "owner";

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
          <div className="relative inline-block">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} alt={displayName} />
              <AvatarFallback>
                {displayName?.charAt(0)?.toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            {/* Online/Offline status */}
            {!conversation.isGroup && (
              <span
                className={`absolute bottom-0 right-0 block h-6 w-6 rounded-full border-2 border-white dark:border-slate-950 ${
                  isOnline ? "bg-green-500" : "bg-slate-500"
                }`}
              />
            )}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{displayName}</h2>
          {!isGroup && (
            <p className="text-sm text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </p>
          )}

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
                  <ParticipantItem
                    key={participant.user.id}
                    participant={participant}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Bio for direct (1-1) conversation
            <div className="w-full mt-4">
              <h3 className="text-md font-bold ml-1">Bio:</h3>
              <div className="mt-1 bg-muted/30 p-4 rounded-xl border">
                <p className="text-sm text-muted-foreground">
                  {otherParticipant?.user.bio ?? "No bio yet"}
                </p>
              </div>
            </div>
          )}

          <Separator className="my-6 bg-zinc-300 dark:bg-zinc-600" />

          {/* Actions */}
          <div className="w-full space-y-1">
            {/* Leave Action */}
            {isGroup && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  >
                    Leave group
                  </Button>
                </AlertDialogTrigger>
                {/* Confirmation Dialog */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Leave this group?</AlertDialogTitle>

                    <AlertDialogDescription>
                      {isOwner
                        ? "As the owner, leaving will transfer ownership to the next member. Are you sure you want to leave this group?"
                        : "Are you sure you want to leave this group?"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {/* Dialog Actions */}
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="cursor-pointer"
                      disabled={isLeaving}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => leaveGroup(conversation.id)}
                      className="bg-destructive! hover:bg-destructive/80! cursor-pointer"
                      disabled={isLeaving}
                    >
                      {isLeaving ? "Leaving..." : "Leave"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {/* Delete Action */}
            {isOwner && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  >
                    Delete group
                  </Button>
                </AlertDialogTrigger>
                {/* Confirmation Dialog */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this group?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This action cannot be undone. All messages in this group
                      will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {/* Dialog Actions */}
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="cursor-pointer"
                      disabled={isDeleting}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteGroup(conversation.id)}
                      className="bg-destructive! hover:bg-destructive/80! cursor-pointer"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
