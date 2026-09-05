export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthCTX {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
