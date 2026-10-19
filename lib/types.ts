export type CodeLang = "cpp" | "java" | "python" | "javascript";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  children: Category[];
  description: string;
}

export interface CodeBlockData {
  id: string;
  title?: string;
  code: Record<CodeLang, string>;
}

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "code"; block: CodeBlockData }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; variant: "note" | "tip" | "warning"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] };

export interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  subcategory?: string;
  contentType: string;
  author: string;
  difficulty?: Difficulty;
  readTimeMin: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  description: string;
  content: ContentBlock[];
  relatedProblemSlug?: string;
  thumbnail: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  companies: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  acceptanceRate: number;
  solutionSummary: string;
  submissions: number;
  solved: number;
}

export interface Lesson {
  title: string;
  durationMin: number;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  instructor: string;
  instructorTitle: string;
  price: number | null; // null => Free
  rating: number;
  reviewCount: number;
  enrolled: number;
  modules: Module[];
  level: "Beginner" | "Intermediate" | "Advanced";
  durationHours: number;
  thumbnailSeed: string;
  learningOutcomes: string[];
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}

export interface Comment {
  id: string;
  articleId: string;
  parentId: string | null;
  author: string;
  avatar?: string;
  body: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

export interface SeedUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

export interface NavLink {
  label: string;
  href: string;
  sections: { title: string; items: { label: string; href: string }[] }[];
}