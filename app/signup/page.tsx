import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a free GeeksforGeeks account.",
};

export default function SignupPage() {
  return (
    <div className="fade-in mx-auto flex min-h-[70vh] max-w-[1400px] items-center px-4 py-10">
      <AuthForm mode="signup" />
    </div>
  );
}