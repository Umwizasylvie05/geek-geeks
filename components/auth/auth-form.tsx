"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Loader2, LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(isLogin ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
          name: fd.get("name"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Request failed");
        return;
      }
      router.push("/profile");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            {isLogin ? <LogIn className="size-6" /> : <UserPlus className="size-6" />}
          </span>
          <h1 className="text-xl font-extrabold text-foreground">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-faint">
            {isLogin
              ? "Log in to keep your streak and bookmarks."
              : "It takes less than a minute."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin ? (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Full name
              </span>
              <input
                name="name"
                required
                minLength={2}
                autoComplete="name"
                placeholder="Ada Lovelace"
                className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          ) : null}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-muted">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-muted">
              Password
            </span>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input
                type="password"
                name="password"
                required
                minLength={isLogin ? 1 : 8}
                autoComplete={isLogin ? "current-password" : "new-password"}
                placeholder={isLogin ? "••••••••" : "At least 8 characters"}
                className="w-full rounded-lg border border-line bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-lg bg-hard-soft px-3 py-2 text-sm font-medium text-hard">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : isLogin ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-faint">
          {isLogin ? "New to GeeksforGeeks? " : "Already have an account? "}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className="font-semibold text-link hover:underline"
          >
            {isLogin ? "Create an account" : "Log in"}
          </Link>
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-line bg-surface-2 p-4 text-center text-xs text-faint">
        <p className="font-semibold text-muted">Demo credentials</p>
        <p className="mt-1">
          demo@gfg.dev / password123
          <br />
          instructor@gfg.dev / instructor123
        </p>
      </div>
    </div>
  );
}