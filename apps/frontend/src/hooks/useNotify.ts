import { toastMessages } from "@/lib/toast";
import { toast } from "sonner";

export const useNotify = () => {
  return {
    featureUnavailable: () => toast(toastMessages.featureUnavailable),
  };
};
