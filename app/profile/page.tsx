import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, Flame, Mail, Trophy, UserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { platformStats } from "@/lib/repo";
import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your GeeksforGeeks account and progress.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const stats = platformStats();

  const badges = [
    { icon: Flame, label: `${5 + (user.name.length % 40)} day streak`, color: "text-medium" },
    { icon: Trophy, label: "Solved 12 problems", color: "text-primary" },
    { icon: Award, label: "Early adopter", color: "text-easy" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <header className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size="lg" />
          <div>
            <h1 className="flex items-center gap-2 text-xl font-extrabold text-foreground">
              <UserRound className="size-5 text-primary" />
              {user.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-faint">
              <Mail className="size-3.5" /> {user.email}
            </p>
            <p className="mt-0.5 text-xs text-faint">
              {user.email.includes("instructor")
                ? "Course instructor on GeeksforGeeks"
                : "Learning DSA and web development here"}
            </p>
          </div>
        </div>
        <LogoutButton />
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {/* Badges */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">Badges & stats</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-line bg-surface p-4 text-center"
                >
                  <b.icon className={cn("mx-auto size-6", b.color)} />
                  <p className="mt-2 text-sm font-semibold text-foreground">{b.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-foreground">Recent activity</h2>
            <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-faint">
              Your solved problems and bookmarks will show here once you get
              going. Head to the{" "}
              <Link href="/practice" className="font-semibold text-link hover:underline">
                practice area
              </Link>{" "}
              to start.
            </p>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Account
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-faint">Role</dt>
                <dd className="font-medium text-foreground">
                  {user.email.includes("instructor") ? "Instructor" : "Learner"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-faint">Member since</dt>
                <dd className="font-medium text-foreground">2024</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-faint">Plan</dt>
                <dd className="font-medium text-primary">Free forever ✦</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-primary to-emerald-600 p-5 text-white">
            <p className="font-extrabold">The whole platform is free.</p>
            <ul className="mt-2 space-y-1 text-sm text-white/90">
              <li>• {stats.articles}+ tutorials</li>
              <li>• {stats.problems}+ practice problems</li>
              <li>• {stats.courses}+ courses</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}