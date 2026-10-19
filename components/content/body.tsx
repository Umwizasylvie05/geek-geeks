import Image from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { Article, ContentBlock } from "@/lib/types";
import { LANGS, LANG_LABELS } from "@/lib/seed/code";
import { highlightCode } from "@/lib/highlight";
import { Callout } from "../ui/callout";
import { CodeBlock, type TabbedCode } from "./code-block";

export interface TocEntry {
  id: string;
  level: 2 | 3;
  text: string;
}

export function tocFromContent(content: ContentBlock[]): TocEntry[] {
  return content
    .filter((b) => b.type === "h2" || b.type === "h3")
    .map((b) =>
      b.type === "h2"
        ? { id: b.id, level: 2 as const, text: b.text }
        : { id: b.id, level: 3 as const, text: b.text }
    );
}

export async function highlightBlock(
  block: ContentBlock
): Promise<TabbedCode[] | null> {
  if (block.type !== "code") return null;
  const langs = LANGS.filter((l) => block.block.code[l].trim().length > 0);
  const highlighted: TabbedCode[] = [];
  for (const lang of langs) {
    const plain = block.block.code[lang];
    const html = await highlightCode(plain, lang, block.block.title);
    highlighted.push({ lang, label: LANG_LABELS[lang], html, plain });
  }
  return highlighted;
}

export async function ArticleBody({
  article,
}: {
  article: Article;
}) {
  const blocks: React.ReactNode[] = [];

  for (const block of article.content) {
    switch (block.type) {
      case "p":
        blocks.push(<p key={blocks.length}>{block.text}</p>);
        break;
      case "h2":
        blocks.push(
          <h2 key={blocks.length} id={block.id}>
            {block.text}
          </h2>
        );
        break;
      case "h3":
        blocks.push(
          <h3 key={blocks.length} id={block.id}>
            {block.text}
          </h3>
        );
        break;
      case "list": {
        const items = block.items.map((item, i) => <li key={i}>{item}</li>);
        blocks.push(
          block.ordered ? (
            <ol key={blocks.length}>{items}</ol>
          ) : (
            <ul key={blocks.length}>{items}</ul>
          )
        );
        break;
      }
      case "code": {
        const tabs = await highlightBlock(block);
        if (tabs) {
          blocks.push(
            <CodeBlock key={blocks.length} blocks={tabs} title={block.block.title} />
          );
        }
        break;
      }
      case "callout":
        blocks.push(
          <Callout key={blocks.length} variant={block.variant} title={block.title}>
            {block.text}
          </Callout>
        );
        break;
      case "table":
        blocks.push(
          <div
            key={blocks.length}
            className="my-5 overflow-x-auto rounded-lg border border-line"
          >
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left text-foreground">
                  {block.headers.map((h) => (
                    <th key={h} className="px-4 py-2.5 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn("border-b border-line last:border-0", ri % 2 === 1 && "bg-surface-2/60")}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        break;
      case "image":
        blocks.push(
          <figure key={blocks.length} className="my-6">
            <Image
              src={block.src}
              alt={block.alt}
              width={800}
              height={420}
              className="w-full rounded-xl border border-line"
            />
            {block.caption ? (
              <figcaption className="mt-2 text-center text-xs text-faint">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="article-body text-[16px]">
      {blocks.map((block, i) => (
        <Fragment key={i}>{block}</Fragment>
      ))}
    </div>
  );
}