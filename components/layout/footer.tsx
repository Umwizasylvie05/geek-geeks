import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "./logo";

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "size-4"} aria-hidden>
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "size-4"} aria-hidden>
      <path d="M12.152,6.896c-0.948,0 -2.415,-1.078 -3.96,-1.04c-2.04,0.027 -3.91,1.183 -4.961,3.014c-2.117,3.675 -0.546,9.103 1.519,12.09c1.013,1.454 2.208,3.09 3.792,3.039c1.52,-0.065 2.09,-0.987 3.935,-0.987c1.831,0 2.35,0.987 3.96,0.948c1.637,-0.026 2.676,-1.48 3.676,-2.948c1.156,-1.688 1.636,-3.325 1.662,-3.415c-0.039,-0.013 -3.182,-1.221 -3.22,-4.857c-0.026,-3.04 2.48,-4.494 2.597,-4.559c-1.429,-2.09 -3.623,-2.324 -4.39,-2.376c-2,-0.156 -3.675,1.09 -4.61,1.09z" />
    </svg>
  );
}

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Legal", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact Us", href: "/contact" },
      { label: "Advertise with us", href: "/contact" },
      { label: "GFG Corporate Solution", href: "/about" },
      { label: "Campus Training Program", href: "/about" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "POTD", href: "/practice" },
      { label: "Job-A-Thon", href: "/practice" },
      { label: "Blogs", href: "/category/dsa" },
      { label: "Nation Skill Up", href: "/courses" },
    ],
  },
  {
    title: "Tutorials",
    links: [
      { label: "Programming Languages", href: "/category/languages" },
      { label: "DSA", href: "/category/dsa" },
      { label: "Web Technology", href: "/category/web-dev" },
      { label: "AI, ML & Data Science", href: "/courses" },
      { label: "DevOps", href: "/courses" },
      { label: "CS Core Subjects", href: "/category/cs-fundamentals" },
      { label: "Interview Preparation", href: "/category/interview-prep" },
      { label: "Software and Tools", href: "/category/system-design" },
    ],
  },
  {
    title: "Courses",
    links: [
      { label: "ML and Data Science", href: "/courses" },
      { label: "DSA and Placements", href: "/courses?category=dsa" },
      { label: "Web Development", href: "/courses?category=web-dev" },
      { label: "Programming Languages", href: "/courses?category=languages" },
      { label: "DevOps & Cloud", href: "/courses" },
      { label: "GATE", href: "/courses?category=dsa" },
      { label: "Trending Technologies", href: "/courses" },
    ],
  },
  {
    title: "Videos",
    links: [
      { label: "DSA", href: "/category/dsa" },
      { label: "Python", href: "/category/python" },
      { label: "Java", href: "/category/java" },
      { label: "C++", href: "/category/cplusplus" },
      { label: "Web Development", href: "/category/web-dev" },
      { label: "Data Science", href: "/courses" },
      { label: "System Design", href: "/category/system-design" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-nav">
      <div className="px-4 py-12 lg:px-8">
        {/* Columns: brand + addresses + apps, then links */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(5,1fr)] lg:mt-0">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-extrabold text-foreground">
                GeeksforGeeks
              </span>
            </Link>

            <address className="mt-4 flex flex-col gap-1 text-sm not-italic leading-relaxed text-faint">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin className="size-4 text-primary" />
                Corporate &amp; Communications Address:
              </span>
              A-143, 6th Floor, Sovereign Corporate Tower, Sector-136, Noida,
              Uttar Pradesh (201305)
            </address>

            <address className="mt-4 flex flex-col gap-1 text-sm not-italic leading-relaxed text-faint">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin className="size-4 text-primary" />
                Registered Address:
              </span>
              K 061, Tower K, Gulshan Vivante Apartment, Sector 137, Noida,
              Gautam Buddh Nagar, Uttar Pradesh, 201305
            </address>

            <div className="mt-auto grid max-w-[260px] grid-cols-2 gap-2.5">
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2 py-2 text-left transition-colors hover:border-primary hover:text-primary"
              >
                <PlayStoreIcon className="size-3.5" />
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-faint">
                    GFG App on
                  </span>
                  <span className="block text-xs font-semibold text-foreground">
                    Play Store
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2 py-2 text-left transition-colors hover:border-primary hover:text-primary"
              >
                <AppStoreIcon className="size-3.5" />
                <span className="leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-faint">
                    GFG App on
                  </span>
                  <span className="block text-xs font-semibold text-foreground">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-faint transition-colors hover:text-link"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <p className="px-4 py-5 text-center text-xs text-faint lg:px-8">
          @GeeksforGeeks, Sanchhaya Education Private Limited, All rights reserved
        </p>
      </div>
    </footer>
  );
}