import Home from "@/pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignUp from "@/pages/signup/SignUp";
import Login from "@/pages/login/Login";

import AppLoader from "@/components/AppLoader";
import { useGetCurrentUser } from "@/hooks/queries/useGetCurrentUser";

function App() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <AppLoader />;
  }

  const isAuthenticated = Boolean(user);

  return (
    <div className="h-dvh overflow-hidden">
      <Toaster position="top-right" richColors closeButton />

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/conversations/:conversationId"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
