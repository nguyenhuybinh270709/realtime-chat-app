type Gender = "male" | "female";
type Role = "owner" | "member";

type User = {
  id: string;
  username: string;
  displayName: string;
  gender: Gender;
  profileImage: string | null;
  bio: string | null;

  createdAt: string;
  updatedAt: string;
};

type Participant = {
  role: Role;
  user: Pick<User, "id" | "displayName" | "profileImage" | "bio">;
};

type Conversation = {
  id: string;
  conversationName: string | null;
  isGroup: boolean;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  participants: Participant[];
};

type Message = {
  id: string;
  body: string;
  conversationId: string;
  senderId: string;

  createdAt: string;
};
