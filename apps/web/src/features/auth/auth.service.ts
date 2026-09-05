import { apiClient } from "@/lib/apiClient";
import type { Register } from "./schema/register.schema";
import type { Login } from "./schema/login.schema";

export const authService = {
  register: (data: Register) =>
    apiClient.post("/auth/register", data).then((r) => r.data),
  login: (data: Login) =>
    apiClient.post("/auth/login", data).then((r) => r.data),
  profile: () => apiClient.get("/auth/me").then((r) => r.data?.data),
  logout: () => apiClient.post("/auth/logout").then((r) => r.data),
};
