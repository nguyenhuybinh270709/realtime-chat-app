import { getApiErrorMessage } from "@/lib/apiError";
import { logoutAPI } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("Logout successful");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
