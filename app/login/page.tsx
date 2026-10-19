import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your GeeksforGeeks account.",
};

export default function LoginPage() {
  return (
    <div className="fade-in mx-auto flex min-h-[70vh] max-w-[1400px] items-center px-4 py-10">
      <AuthForm mode="login" />
    </div>
  );
}