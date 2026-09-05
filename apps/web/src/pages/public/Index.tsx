import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-2">
            <Button variant="ghost">
              <Link to="/login">Login</Link>
            </Button>

            <Button>
              <Link to="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
              Welcome to MyApp
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Simple. Secure.{" "}
              <span className="text-muted-foreground">Built for you.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Create your account, sign in, and get started with a simple
              experience designed around you.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Simple feature cards */}
          <div className="mx-auto mt-20 grid max-w-4xl gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Simple</CardTitle>
                <CardDescription>
                  Everything you need without unnecessary complexity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secure</CardTitle>
                <CardDescription>
                  Your account and information are handled securely.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fast</CardTitle>
                <CardDescription>
                  A clean and responsive experience across devices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} FullStack App. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
