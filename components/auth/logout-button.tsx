"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <Button variant="outline" onClick={logout} disabled={loading}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      Log out
    </Button>
  );
}