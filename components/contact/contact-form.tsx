"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Mock submit — no backend in this demo.
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-easy" />
        <h2 className="mt-3 text-lg font-extrabold text-foreground">
          Message sent
        </h2>
        <p className="mt-1 text-sm text-faint">
          Thanks for reaching out — we read everything (and reply to most).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-muted">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ada Lovelace"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">Subject</span>
        <select
          name="subject"
          className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>Content suggestion</option>
          <option>Bug report</option>
          <option>Account help</option>
          <option>Partnership</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us what is on your mind…"
        />
      </label>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          <Send className="size-4" />
          {loading ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}