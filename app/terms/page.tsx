import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The rules of the road for GeeksforGeeks.",
};

const SECTIONS = [
  {
    h: "Acceptance",
    body: "By using GeeksforGeeks you agree to these terms. GeeksforGeeks is a demo platform; all content, companies, users, and problems are fictional and provided for educational demonstration.",
  },
  {
    h: "Content license",
    body: "Original tutorials and course material on this site are published under a teaching license: read, study, and reimplement freely. Redistribution of the platform itself is not permitted.",
  },
  {
    h: "Fair use",
    body: "Practice problems exist for you to solve on your own. Don't scrape the site, submit spam, or attempt to break the mock judge. Be nice.",
  },
  {
    h: "Liability",
    body: "The platform is provided 'as is' without warranties. We are not liable for outcomes from using the material — including interview results, which depend on far more than reading this site.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground">Terms of Use</h1>
      <p className="mt-2 text-sm text-faint">Effective: January 2026</p>
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