import { Link } from "react-router-dom";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Logo } from "@/components/logo";

export default function Register() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center">
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Create your account
        </h2>

        <RegisterForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
