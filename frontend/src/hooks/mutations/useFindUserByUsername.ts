import { getUserByUsernameAPI } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

export const useFindUserByUsername = () => {
  return useMutation({
    mutationFn: getUserByUsernameAPI,
  });
};
