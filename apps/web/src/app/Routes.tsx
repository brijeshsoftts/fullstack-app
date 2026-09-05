import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectLayout } from "@/components/layout/ProtectLayout";

import Index from "@/pages/public/Index";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/protect/Profile";

export function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route index element={<Index />} />
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </RoutesWrapper>
    </BrowserRouter>
  );
}
