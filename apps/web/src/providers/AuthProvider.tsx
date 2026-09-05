import { useProfile } from "@/features/auth/hooks/useProfile";
import type { AuthCTX } from "@/types";
import { createContext, type ReactNode } from "react";

const initialValue: AuthCTX = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthCTX>(initialValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isFetching } = useProfile();

  return (
    <AuthContext
      value={{
        user: data!,
        isAuthenticated: !!data,
        isLoading: isFetching,
      }}
    >
      {children}
    </AuthContext>
  );
}
