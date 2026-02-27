import { getCurrentUserAPI } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserAPI,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
