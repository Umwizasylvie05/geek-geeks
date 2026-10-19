import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GeeksforGeeks handles your data.",
};

const SECTIONS = [
  {
    h: "What we collect",
    body: "In this demo build, accounts are simulated in-memory and nothing is stored persistently. In production, we would collect only what you give us: an email address, a display name, and your learning progress.",
  },
  {
    h: "Cookies",
    body: "We use a single session cookie to keep you logged in, plus your browser's local storage to remember interaction state (bookmarks, votes). No tracking or advertising cookies are used.",
  },
  {
    h: "Your choices",
    body: "You can clear these at any time from your browser settings. Deleting the session cookie logs you out; clearing local storage resets saved interactions.",
  },
  {
    h: "Changes",
    body: "If this policy ever changes, we will note it here. This is a fictional demo site — treat everything as illustrative.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-faint">Last updated: January 2026</p>
      <div className="mt-8 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold text-foreground">{s.h}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}