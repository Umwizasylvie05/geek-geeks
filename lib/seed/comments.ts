import type { Comment } from "../types";
import { ARTICLES } from "./articles";
import { LANGS } from "./code";

const NAMES = [
  "Rohan Verma",
  "Isabella Romano",
  "Tunde Adeyemi",
  "Chloe Dupont",
  "Arnav Singh",
  "Lena Fischer",
  "Kwame Mensah",
  "Sasha Ivanova",
  "Elena Rossi",
  "Miguel Alvarez",
  "Ayesha Khan",
  "Noah Kim",
  "Zara Coleman",
  "Felix Braun",
  "Ines Moreau",
];

const BODIES = [
  "This article finally made it click for me — the example is way clearer than my textbook's.",
  "Small nitpick: the complexity table is a simplification, but it's a great conversation starter for interviews.",
  "I implemented your example in my own language and it runs first try. Thanks!",
  "Could you add a follow-up on the harder variant? I keep failing those in practice.",
  "The 'trace by hand' tip genuinely works. I caught two off-by-one bugs I'd have missed otherwise.",
  "I appreciate that the code tabs all show the same algorithm. Comparing them is a great learning exercise.",
  "This reads well on mobile too. Nice structure with the callouts.",
  "Would love a video walkthrough of this, even a short one.",
  "The warning callout saved me — I was about to ship the naive version.",
  "Best explanation of this topic I've found. Bookmarked!",
  "One question: does this pattern extend to the two-dimensional case cleanly?",
  "Took me three reads, but once the invariant clicked, everything fell into place.",
  "The practice problem link at the end is a nice touch. Off to solve it.",
  "Is there a sample project that uses this in a real codebase?",
  "The 'pen and paper' advice sounds old-school but it's shockingly effective.",
];

function mulberry(seedStr: string) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}

export function getCommentsForArticle(articleId: string): Comment[] {
  const r = rng(mulberry(articleId));
  const count = 3 + Math.floor(r() * 4);
  const roots: Comment[] = [];
  let idc = 0;

  for (let i = 0; i < count; i++) {
    const rootAuthor = NAMES[Math.floor(r() * NAMES.length)];
    const rootId = `${articleId}-c${idc++}`;
    const replies: Comment[] = [];
    if (r() > 0.45) {
      const replyCount = 1 + Math.floor(r() * 2);
      for (let k = 0; k < replyCount; k++) {
        replies.push({
          id: `${articleId}-c${idc++}`,
          articleId,
          parentId: rootId,
          author: "GeeksforGeeks Team",
          body: `Thanks for the feedback${rootAuthor.split(" ")[0] ? ", " + rootAuthor.split(" ")[0] : ""}! We've noted it for the next revision.`,
          createdAt: dateOffset(Math.floor(r() * 2) + 1),
          likes: Math.floor(r() * 24),
          replies: [],
        });
      }
    }
    roots.push({
      id: rootId,
      articleId,
      parentId: null,
      author: rootAuthor,
      body: BODIES[Math.floor(r() * BODIES.length)],
      createdAt: dateOffset(Math.floor(r() * 40) + 1),
      likes: Math.floor(r() * 60),
      replies,
    });
  }

  return roots.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPopularComments() {
  return ARTICLES.flatMap((a) =>
    getCommentsForArticle(a.id).map((c) => ({ comment: c, articleId: a.id }))
  )
    .sort((a, b) => b.comment.likes - a.comment.likes)
    .slice(0, 5);
}

export const ALL_COMMENT_AUTHORS = NAMES;
export { LANGS };