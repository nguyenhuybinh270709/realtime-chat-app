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
  conversationName: string;
  isGroup: boolean;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  participants: Participant[];
};

type Message = {
  id: string;
  fromMe: boolean;
  body: string;
  conversationId: string;
};
