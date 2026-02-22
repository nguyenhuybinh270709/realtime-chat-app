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
