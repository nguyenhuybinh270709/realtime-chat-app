import { NoConversationSelected } from "@/pages/home/components/chat-main/NoConversationSelected";
import { ChatMain } from "@/pages/home/components/chat-main/ChatMain";
import Home from "@/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignUp from "@/pages/signup/SignUp";
import Login from "@/pages/login/Login";

function App() {
  return (
    <div className="h-dvh overflow-hidden">
      <Toaster position="top-right" richColors closeButton />

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<NoConversationSelected />} />
          <Route path="conversation/:id" element={<ChatMain />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
