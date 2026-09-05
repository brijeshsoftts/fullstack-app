import { Link } from "react-router-dom";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { Logo } from "@/components/logo";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center">
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
