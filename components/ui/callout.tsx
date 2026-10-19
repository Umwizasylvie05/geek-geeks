import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  note: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    icon: <Info className="size-4 text-blue-600" />,
    label: "Note",
  },
  tip: {
    border: "border-primary",
    bg: "bg-primary-soft",
    icon: <Lightbulb className="size-4 text-primary" />,
    label: "Tip",
  },
  warning: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    icon: <TriangleAlert className="size-4 text-amber-600" />,
    label: "Warning",
  },
} as const;

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <aside
      className={cn(
        "my-5 rounded-lg border-l-4 p-4 text-sm leading-relaxed",
        v.border,
        v.bg
      )}
    >
      <div className="mb-1 flex items-center gap-2 font-semibold text-foreground">
        {v.icon}
        {title ?? v.label}
      </div>
      <div className="text-muted">{children}</div>
    </aside>
  );
}