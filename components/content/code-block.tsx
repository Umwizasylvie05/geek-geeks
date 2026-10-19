"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import type { CodeLang } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface TabbedCode {
  lang: CodeLang;
  label: string;
  html: string;
  plain: string;
}

export function CodeBlock({
  blocks,
  title,
  className,
}: {
  blocks: TabbedCode[];
  title?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const langs = useMemo(
    () => blocks.filter((b) => b.plain.trim().length > 0),
    [blocks]
  );

  const copy = async () => {
    if (!langs[active]) return;
    try {
      await navigator.clipboard.writeText(langs[active].plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <figure className={cn("my-5 overflow-hidden rounded-xl border border-line bg-code text-left", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Code2 className="size-4 shrink-0 text-primary" />
          <span className="truncate text-xs font-medium text-code-text/80">
            {title ?? (langs[active] ? langs[active].label : "Code")}
          </span>
        </div>
        <button
          onClick={copy}
          aria-label="Copy code to clipboard"
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-code-text/70 transition-colors hover:bg-white/10 hover:text-code-text"
        >
          {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {langs.length > 1 ? (
        <div className="flex items-center gap-1 border-b border-white/10 px-2">
          {langs.map((b, i) => (
            <button
              key={b.lang}
              onClick={() => setActive(i)}
              className={cn(
                "relative px-3 py-2 text-xs font-medium transition-colors",
                i === active
                  ? "text-code-text"
                  : "text-code-text/50 hover:text-code-text/80"
              )}
            >
              {b.label}
              {i === active ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
      {langs.length > 0 ? (
        <div
          className="overflow-x-auto text-[13px] leading-relaxed [&_pre]:p-3 [&_pre]:!m-0 [&_pre]:bg-transparent [&_pre]:!text-[13px] [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: langs[active].html }}
        />
      ) : null}
    </figure>
  );
}