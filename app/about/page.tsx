import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "What GeeksforGeeks is and why we built it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground">About GeeksforGeeks</h1>
      <div className="prose-cn mt-6 space-y-5 text-[15px] leading-relaxed text-muted">
        <p>
          GeeksforGeeks is a practice-first learning platform for software
          development. We publish deep, original tutorials on data structures
          and algorithms, languages, web development, and system design — and
          pair every concept with a hands-on problem you can solve right in your
          browser.
        </p>
        <p>
          No paywalls, no gated content. Every tutorial, problem, and course on
          GeeksforGeeks is free. We believe the fundamentals of engineering should be
          learnable by anyone with an internet connection and enough curiosity
          to keep going.
        </p>
        <p>
          This is a demo build: the content, companies, and users you will find
          here are fictional and exist to exercise a complete, production-shaped
          product experience.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Target, title: "Practice first", body: "Reading is listening; solving is knowledge." },
          { icon: GraduationCap, title: "Structured paths", body: "Courses and categories that build on each other." },
          { icon: Users, title: "Community", body: "Comments, threads, and shared progress." },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-line bg-surface p-5">
            <c.icon className="size-6 text-primary" />
            <h2 className="mt-3 font-bold text-foreground">{c.title}</h2>
            <p className="mt-1 text-sm text-faint">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 p-6 text-white">
        <h2 className="text-lg font-extrabold">Want to get involved?</h2>
        <p className="mt-1 text-sm text-white/85">
          Say hello through the contact page.
        </p>
        <Link
          href="/contact"
          className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-primary"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}