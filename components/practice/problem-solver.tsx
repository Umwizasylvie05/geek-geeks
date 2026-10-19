"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle2, Loader2, Play, Send, Terminal, XCircle } from "lucide-react";
import type { CodeLang } from "@/lib/types";
import { LANGS, LANG_LABELS } from "@/lib/seed/code";
import { STARTER_CODE } from "@/lib/starter-code";
import { cn } from "@/lib/utils";
import { ActionBar } from "../content/action-bar";
import { Button } from "../ui/button";

const Monaco = dynamic(() => import("./monaco-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-code text-sm text-code-text">
      Loading editor…
    </div>
  ),
});

interface RunResult {
  status: string;
  passed: number;
  total: number;
  timeMs: number;
  memoryKb: number;
  language: string;
  testCases?: { name: string; passed: boolean; status: string }[];
  stdout?: string;
  error?: string;
}

export function ProblemSolver({
  slug,
  likes,
  dislikes,
}: {
  slug: string;
  likes?: number;
  dislikes?: number;
}) {
  const [lang, setLang] = useState<CodeLang>("python");
  const [code, setCode] = useState(STARTER_CODE.python);
  const [running, setRunning] = useState<null | "run" | "submit">(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const switchLang = (next: CodeLang) => {
    if (next === lang) return;
    setCode(STARTER_CODE[next]);
    setLang(next);
    setResult(null);
    setError(null);
  };

  const execute = async (action: "run" | "submit") => {
    setRunning(action);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/practice/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, language: lang, code, action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setRunning(null);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2">
        <div className="flex items-center gap-1" role="tablist" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={lang === l}
              onClick={() => switchLang(l)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                lang === l
                  ? "bg-primary text-on-primary"
                  : "text-faint hover:bg-surface-3 hover:text-foreground"
              )}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 text-xs text-faint sm:flex">
          <Terminal className="size-3.5" /> In-browser mock judge
        </span>
      </div>

      {/* Editor */}
      <div className="min-h-[420px] flex-1">
        <Monaco language={lang} value={code} onChange={setCode} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-2 px-3 py-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => execute("run")}
          disabled={running !== null}
        >
          {running === "run" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Play className="size-4" />
          )}
          Run
        </Button>
        <Button size="sm" onClick={() => execute("submit")} disabled={running !== null}>
          {running === "submit" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Submit
        </Button>
        {result ? (
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 text-sm font-bold",
              result.status === "Accepted" ? "text-easy" : "text-hard"
            )}
          >
            {result.status === "Accepted" ? (
              <CheckCircle2 className="size-4.5" />
            ) : (
              <XCircle className="size-4.5" />
            )}
            {result.status} · {result.passed}/{result.total}
          </span>
        ) : null}
      </div>

      {/* Results */}
      {error ? (
        <div className="border-t border-line bg-hard-soft px-4 py-3 text-sm font-medium text-hard">
          {error}
        </div>
      ) : result ? (
        <div className="border-t border-line bg-surface-2 px-4 py-3">
          <p className="text-xs text-faint">
            {result.language} · {result.timeMs} ms · {result.memoryKb} KB
          </p>
          <div className="mt-2 space-y-1.5">
            {result.testCases?.map((tc, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-1.5 text-xs font-medium",
                  tc.passed ? "bg-easy/10 text-easy" : "bg-hard/10 text-hard"
                )}
              >
                <span>{tc.name}</span>
                <span>{tc.status}</span>
              </div>
            ))}
            {result.stdout ? (
              <pre className="mt-2 overflow-x-auto rounded-md bg-code px-3 py-2 text-xs text-code-text">
                {result.stdout}
              </pre>
            ) : null}
          </div>
        </div>
      ) : null}

      <ActionBar targetType="problem" targetSlug={slug} likes={likes} dislikes={dislikes} />
    </div>
  );
}