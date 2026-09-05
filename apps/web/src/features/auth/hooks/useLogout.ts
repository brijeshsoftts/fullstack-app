import { useMutation } from "@tanstack/react-query";

import { notifyError } from "@/lib/notification";
import { authService } from "../auth.service";

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: authService.logout,
    onError: notifyError,
    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};
