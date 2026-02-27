type Gender = "male" | "female";

type User = {
  id: string;
  username: string;
  displayName: string;
  gender: Gender;
  profileImage?: string | null;
  bio?: string | null;

  createdAt: string;
  updatedAt: string;
};

type Conversation = {
  id: string;
  displayName: string;
  profilePicture: string;
};

type Message = {
  id: string;
  fromMe: boolean;
  body: string;
  conversationId: string;
};
