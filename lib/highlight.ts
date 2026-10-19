import { codeToHtml } from "shiki";
import type { CodeLang } from "./types";

const THEME = "github-dark";

export async function highlightCode(
  code: string,
  lang: CodeLang,
  title?: string
): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: THEME,
    structure: "classic",
    meta: title ? { title } : undefined,
  });
}

export async function highlightAll(
  blocks: { code: string; lang: CodeLang; title?: string }[]
): Promise<string[]> {
  return Promise.all(
    blocks.map((b) => highlightCode(b.code, b.lang, b.title))
  );
}