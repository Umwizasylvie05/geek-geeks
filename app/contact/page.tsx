import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GeeksforGeeks team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground">Contact us</h1>
      <p className="mt-2 max-w-xl text-[15px] text-muted">
        Spot a bug, want a topic covered, or have feedback on the demo? We
        would love to hear from you.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-faint">
        <Mail className="size-4" />
        Prefer email? hello@gfg.dev
      </div>
    </div>
  );
}