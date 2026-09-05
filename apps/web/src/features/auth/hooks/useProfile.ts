import { useQuery } from "@tanstack/react-query";

import { authService } from "../auth.service";

export const useProfile = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.profile,
    retry: false,
  });
};
