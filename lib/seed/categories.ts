import type { Category } from "../types";

function cat(
  id: string,
  name: string,
  description: string,
  children: Category[] = []
): Category {
  const slug = id;
  const attachParent = (c: Category): Category => ({
    ...c,
    slug: c.slug,
    parentId: id,
    children: c.children.map(attachParent),
  });
  return {
    id,
    slug,
    name,
    description,
    parentId: null,
    children: children.map(attachParent),
  };
}

export const CATEGORY_TREE: Category[] = [
  cat(
    "dsa",
    "DSA",
    "Master data structures and algorithms with hands-on tutorials.",
    [
      cat("arrays", "Arrays", "Store and manipulate sequences of elements.", [
        cat("array-basics", "Array Basics", "Core array operations and patterns."),
        cat("array-manipulation", "Array Manipulation", "Sliding windows, two pointers and more."),
      ]),
      cat("strings", "Strings", "Work with text and pattern matching.", [
        cat("string-basics", "String Basics", "Common string utilities."),
        cat("pattern-matching", "Pattern Matching", "KMP, Z-algorithm and friends."),
      ]),
      cat("linked-list", "Linked List", "Linear structures with dynamic memory.", [
        cat("singly-linked-list", "Singly Linked List", "Insert, delete and reverse in a single list."),
        cat("doubly-linked-list", "Doubly Linked List", "Bidirectional traversal tricks."),
      ]),
      cat("stack-queue", "Stack & Queue", "LIFO / FIFO containers.", [
        cat("stack", "Stack", "Expression evaluation, parsing and monotonic stacks."),
        cat("queue", "Queue", "Circular and priority queues."),
      ]),
      cat("tree", "Tree", "Hierarchical data structures.", [
        cat("binary-tree", "Binary Tree", "Traversals and tree reconstruction."),
        cat("bst", "Binary Search Tree", "Ordered trees with fast lookups."),
      ]),
      cat("graph", "Graph", "Networks of nodes and edges.", [
        cat("graph-traversal", "Graph Traversal", "BFS, DFS and connectivity."),
        cat("shortest-path", "Shortest Path", "Dijkstra, Bellman-Ford and Floyd-Warshall."),
      ]),
      cat("recursion", "Recursion", "Solve problems by reducing them to smaller selves."),
      cat("searching", "Searching", "Linear, binary and beyond."),
      cat("sorting", "Sorting", "Reorder data efficiently."),
      cat("heap", "Heap", "Priority queues and heap operations."),
      cat("hashing", "Hashing", "Fast lookups with hash tables."),
      cat("dynamic-programming", "Dynamic Programming", "Break problems into overlapping subproblems.", [
        cat("dp-1d", "1D DP", "Memoization and tabulation on one dimension."),
        cat("dp-2d", "2D DP", "Grid and sequence DP."),
      ]),
      cat("greedy", "Greedy", "Make locally optimal choices."),
      cat("backtracking", "Backtracking", "Systematic search with pruning."),
      cat("bit-magic", "Bit Manipulation", "Work at the bit level."),
      cat("matrix", "Matrix", "2D array algorithms."),
    ],
  ),
  cat(
    "languages",
    "Languages",
    "Learn programming languages from the ground up.",
    [
      cat("python", "Python", "Readable, batteries-included language.", [
        cat("python-basics", "Python Basics", "Syntax, variables and control flow."),
        cat("python-oop", "Python OOP", "Classes, objects and magic methods."),
      ]),
      cat("java", "Java", "Statically typed, JVM-based language.", [
        cat("java-basics", "Java Basics", "Syntax, control flow and arrays."),
        cat("java-oop", "Java OOP", "Classes, inheritance and interfaces."),
      ]),
      cat("cplusplus", "C++", "Systems language with manual control."),
      cat("javascript", "JavaScript", "The language of the web.", [
        cat("js-core", "JavaScript Core", "Closures, this, prototypes."),
        cat("js-async", "Async JavaScript", "Promises, async/await and callbacks."),
      ]),
    ],
  ),
  cat(
    "web-dev",
    "Web Development",
    "Build modern web applications end to end.",
    [
      cat("html-css", "HTML & CSS", "Structure and style web pages."),
      cat("react", "React", "Component-based UI development."),
      cat("nodejs", "Node.js", "JavaScript on the server."),
      cat("databases", "Databases", "SQL and NoSQL fundamentals."),
      cat("web-security", "Web Security", "Protect applications from common attacks."),
    ],
  ),
  cat(
    "system-design",
    "System Design",
    "Design large-scale, reliable systems.",
    [
      cat("design-basics", "Design Fundamentals", "Load balancers, queues, and trade-offs."),
      cat("scalability", "Scalability", "Horizontal scaling and caching."),
      cat("distributed-systems", "Distributed Systems", "Consistency, partitioning and consensus."),
      cat("microservices", "Microservices", "Splitting monoliths into services."),
      cat("design-databases", "Storage & Databases", "Sharding, replication and indexing."),
    ],
  ),
  cat(
    "interview-prep",
    "Interview Prep",
    "Prepare for technical interviews with confidence.",
    [
      cat("interview-process", "Interview Process", "What to expect at each round."),
      cat("coding-interviews", "Coding Interviews", "Strategies for algorithm rounds."),
      cat("behavioral", "Behavioral Questions", "STAR framework and common prompts."),
      cat("resume-guides", "Resume & Portfolios", "Stand out on paper."),
    ],
  ),
  cat(
    "cs-fundamentals",
    "Computer Fundamentals",
    "Core computer science concepts every engineer needs.",
    [
      cat("operating-systems", "Operating Systems", "Processes, memory and scheduling."),
      cat("dbms", "DBMS", "Transactions, indexes and query planning."),
      cat("computer-networks", "Computer Networks", "TCP/IP, HTTP and DNS."),
      cat("computer-architecture", "Computer Architecture", "CPUs, memory hierarchy and pipelines."),
    ],
  ),
];

const flatten = (tree: Category[]): Category[] =>
  tree.flatMap((c) => [c, ...flatten(c.children)]);

export const ALL_CATEGORIES: Category[] = flatten(CATEGORY_TREE);

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  ALL_CATEGORIES.map((c) => [c.slug, c])
);

export function categoryById(id: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.id === id);
}

export function categoryRoot(slug: string): Category | undefined {
  return CATEGORY_TREE.find(
    (c) => c.slug === slug || c.children.some((ch) => ch.slug === slug)
  );
}

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  count: number;
  children: SidebarItem[];
}

export const NAV_MEGA_LINKS = [
  { label: "DSA", href: "/category/dsa", key: "dsa" },
  { label: "Languages", href: "/category/languages", key: "languages" },
  { label: "Web Dev", href: "/category/web-dev", key: "web-dev" },
  { label: "System Design", href: "/category/system-design", key: "system-design" },
  { label: "Interview Prep", href: "/category/interview-prep", key: "interview-prep" },
  { label: "CS Fundamentals", href: "/category/cs-fundamentals", key: "cs-fundamentals" },
  { label: "Courses", href: "/courses", key: "courses", isCourses: true },
  { label: "Practice", href: "/practice", key: "practice", isPractice: true },
];

export const TUTORIAL_LINKS: { label: string; href: string }[] = [
  { label: "DSA", href: "/category/dsa" },
  { label: "Practice Problems", href: "/practice" },
  { label: "C", href: "/category/languages" },
  { label: "C++", href: "/category/cplusplus" },
  { label: "Java", href: "/category/java" },
  { label: "Python", href: "/category/python" },
  { label: "JavaScript", href: "/category/javascript" },
  { label: "Data Science", href: "/courses" },
  { label: "Machine Learning", href: "/courses" },
  { label: "Courses", href: "/courses" },
  { label: "Linux", href: "/category/cs-fundamentals" },
  { label: "DevOps", href: "/courses" },
  { label: "SQL", href: "/category/databases" },
  { label: "Web Development", href: "/category/web-dev" },
];