import type { Article, ContentBlock, Difficulty } from "../types";
import { codeFor } from "./code";
import { slugify, thumb } from "../utils";

// Deterministic pseudo-random generator (mulberry32)
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

const pick = <T,>(r: () => number, arr: T[]): T =>
  arr[Math.floor(r() * arr.length)];

const AUTHORS = [
  "Priya Sharma",
  "Daniel Okafor",
  "Mei-Ling Chen",
  "Carlos Rivera",
  "Amara Diallo",
  "Jonas Weber",
  "Fatima Al-Sayed",
  "Tomás Herrera",
  "Ananya Rao",
  "Liam Gallagher",
  "Hana Sato",
  "Ivan Petrov",
];

const LEADS = [
  "is one of those topics that looks intimidating in a textbook but turns out to be refreshingly direct once you have a clean mental model. In this",
  "shows up everywhere in real software — from search rankings to game engines. This",
  "is a classic building block that interviewers love because a single question can test arrays, loops, and analysis at once. This",
];
const LEADS_TAIL = [
  "tutorial, we break the idea into small pieces, walk through a complete runnable implementation, and analyze the trade-offs you need to reason about.",
  "guide walks through the intuition first, then a working implementation with complexity analysis and the common mistakes people make.",
  "guide takes you from the core idea to a polished implementation, with edge cases and a complexity comparison at the end.",
];

const MID_FILL = [
  "The key insight is that simple, correct code beats clever, unreadable code in almost every production setting. Once the fundamentals are internalized, the optimizations become obvious instead of magical.",
  "You'll notice a pattern across each of these techniques: represent the data clearly, define the invariant you want to preserve, and verify it on a tiny example before scaling up.",
  "A good way to build intuition here is to run the algorithm by hand on a small input. Your fingers will discover the edge cases long before the compiler does.",
];

const WHY_POINTS = [
  "solid grasp of the underlying pattern reduces the time spent debugging",
  "the complexity analysis tells you whether your solution will fit the constraints",
  "knowing when (and when not) to use the technique separates average from strong solutions",
  "most interview discussions start from this pattern and extend it in one direction",
];

const TABLE_ROWS = [
  ["Naive / brute force", "O(n^2)", "O(1)"],
  ["Optimized / standard", "O(n log n)", "O(1)"],
  ["Advanced variant", "O(n)", "O(n)"],
];

const COMPARE_ITEM_1 = "Understand the core idea and the invariant being maintained";
const COMPARE_ITEM_2 = "Trace a tiny example by hand before writing any code";
const COMPARE_ITEM_3 = "Compare with the obvious alternative to justify the choice";
const COMPARE_ITEM_4 = "Build a runnable snippet and test boundary inputs";

interface TopicDef {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  contentType: string;
  difficulty?: Difficulty;
  code?: string;
  introHook: string;
  closingIp: string;
  relatedProblemSlug?: string;
  tags: string[];
}

const TOPICS: TopicDef[] = [
  {
    slug: "bubble-sort", title: "Bubble Sort Algorithm: A Beginner-Friendly Walkthrough", category: "sorting", subcategory: "sorting",
    contentType: "tutorial", difficulty: "Easy", code: "bubble-sort", relatedProblemSlug: "sort-an-array",
    introHook: "Bubble sort is usually the first sorting algorithm you meet because it is almost embarrassingly simple to explain.",
    closingIp: "Once you can write bubble sort with the early-exit optimization, you have the right instinct for more advanced sorts.",
    tags: ["Sorting", "Arrays", "Beginner"],
  },
  {
    slug: "two-sum-explained", title: "Two Sum: From Brute Force to Hash Map", category: "arrays", subcategory: "array-manipulation",
    contentType: "tutorial", difficulty: "Easy", code: "two-sum", relatedProblemSlug: "two-sum",
    introHook: "Two Sum is the gateway problem of algorithmic interviews — everyone has seen it, and it teaches the single most reusable trick there is.",
    closingIp: "Mastering the hash map trick here pays for itself within days of interviewing.",
    tags: ["Arrays", "Hashing", "Two Pointers"],
  },
  {
    slug: "reverse-linked-list", title: "Reverse a Linked List: Iteration and Recursion", category: "linked-list", subcategory: "singly-linked-list",
    contentType: "how-to", difficulty: "Easy", code: "reverse-linked-list", relatedProblemSlug: "reverse-linked-list",
    introHook: "Reversing a linked list is the definitive test of whether you actually understand pointer mutation.",
    closingIp: "Draw the three-node case once and every pointer-based list problem becomes tractable.",
    tags: ["Linked List", "Pointers", "Interview Prep"],
  },
  {
    slug: "binary-search-explained", title: "Binary Search: Implement It Without Debugging", category: "searching", subcategory: "searching",
    contentType: "guide", difficulty: "Easy", code: "binary-search", relatedProblemSlug: "binary-search",
    introHook: "Binary search halves the search space with one comparison, yet it is astonishingly easy to write off by one.",
    closingIp: "The mid = lo + (hi - lo) / 2 form is not a style trick; it prevents overflow on large arrays.",
    tags: ["Searching", "Binary Search", "Templates"],
  },
  {
    slug: "maximum-subarray-kadane", title: "Kadane's Algorithm for Maximum Subarray Sum", category: "dynamic-programming", subcategory: "dp-1d",
    contentType: "expert", difficulty: "Medium", code: "kadane", relatedProblemSlug: "maximum-subarray-sum",
    introHook: "Kadane's algorithm solves a deceptively simple question — where is the largest contiguous sum? — in a single pass.",
    closingIp: "Kadane works because it asks a local question (best sum ending here) whose answer builds from the previous one.",
    tags: ["Dynamic Programming", "Arrays", "Greedy"],
  },
  {
    slug: "fibonacci-dp", title: "Fibonacci Numbers with Dynamic Programming", category: "dynamic-programming", subcategory: "dp-1d",
    contentType: "tutorial", difficulty: "Medium", code: "fibonacci-dp", relatedProblemSlug: "nth-fibonacci",
    introHook: "Fibonacci is the hello world of dynamic programming: the naive recursion is exponential, and one line of memoization fixes it.",
    closingIp: "Spotting overlapping subproblems early is the entire art of dynamic programming.",
    tags: ["Dynamic Programming", "Recursion", "Math"],
  },
  {
    slug: "bfs-graph-traversal", title: "Breadth First Search (BFS) Explained with Code", category: "graph", subcategory: "graph-traversal",
    contentType: "guide", difficulty: "Medium", code: "bfs-graph", relatedProblemSlug: "bfs-graph-traversal",
    introHook: "Breadth first search explores a graph level by level, which makes it the default tool for shortest-path-like questions on unweighted graphs.",
    closingIp: "The queue is the whole trick: process in order of discovery and you naturally get shortest hops.",
    tags: ["Graph", "Searching", "Queue"],
  },
  {
    slug: "quick-sort-in-depth", title: "Quick Sort: How It Works and Why It Wins", category: "sorting", subcategory: "sorting",
    contentType: "guide", difficulty: "Hard", code: "quick-sort", relatedProblemSlug: "sort-an-array",
    introHook: "Quick sort's practical speed, in-place behavior, and cache friendliness make it the workhorse of real-world sorters.",
    closingIp: "Remember that worst-case O(n^2) is real (sorted input with bad pivots) — that is why good implementations randomize.",
    tags: ["Sorting", "Divide and Conquer", "Interview Prep"],
  },
  {
    slug: "palindrome-check", title: "Palindrome Checks with Two Pointers", category: "strings", subcategory: "string-basics",
    contentType: "how-to", difficulty: "Easy", code: "palindrome-check", relatedProblemSlug: "valid-palindrome",
    introHook: "The two-pointer technique turns many string problems from awkward to elegant — palindromes being the canonical example.",
    closingIp: "Two pointers are the first pattern to reach for on any symmetric string or array problem.",
    tags: ["Strings", "Two Pointers", "Beginner"],
  },
  {
    slug: "valid-parentheses", title: "Valid Parentheses with the Stack", category: "stack-queue", subcategory: "stack",
    contentType: "tutorial", difficulty: "Easy", code: "valid-parentheses", relatedProblemSlug: "valid-parentheses",
    introHook: "Matching brackets is the classic problem that gives the stack its soul: last in, first out lines up perfectly.",
    closingIp: "If something needs matching that is innermost-first, think stack before anything else.",
    tags: ["Stack", "Strings", "Parsing"],
  },
  {
    slug: "invert-binary-tree", title: "Invert a Binary Tree: Recursion in Practice", category: "tree", subcategory: "binary-tree",
    contentType: "how-to", difficulty: "Easy", code: "invert-binary-tree", relatedProblemSlug: "invert-binary-tree",
    introHook: "Inverting a binary tree is a pitch-perfect recursion exercise: the whole solution is one symmetric swap plus two calls.",
    closingIp: "If a tree problem is symmetric, the recursion usually is too — swap, recurse left, recurse right.",
    tags: ["Tree", "Recursion", "Binary Tree"],
  },
  {
    slug: "merge-two-sorted-lists", title: "Merging Two Sorted Linked Lists", category: "linked-list", subcategory: "singly-linked-list",
    contentType: "guide", difficulty: "Easy", code: "merge-sorted-lists", relatedProblemSlug: "merge-two-sorted-lists",
    introHook: "The merge step is the heart of merge sort and shows up in dozens of guises — the two-pointer-on-two-lists shape is worth memorizing.",
    closingIp: "The dummy-node trick deletes an entire class of null-pointer edge cases in linked-list code.",
    tags: ["Linked List", "Merge Sort", "Two Pointers"],
  },
  {
    slug: "longest-common-prefix", title: "Longest Common Prefix Across Strings", category: "strings", subcategory: "string-basics",
    contentType: "how-to", difficulty: "Easy", code: "longest-common-prefix", relatedProblemSlug: "longest-common-prefix",
    introHook: "Comparing strings left to right and shrinking a prefix feels trivial — but doing it cleanly teaches useful substring discipline.",
    closingIp: "When in doubt, shrink the candidate prefix; it is always safe and always simple.",
    tags: ["Strings", "Trie", "Beginner"],
  },
  {
    slug: "contains-duplicate-hashing", title: "Contains Duplicate: When a Hash Set Is Enough", category: "hashing", subcategory: "hashing",
    contentType: "tutorial", difficulty: "Easy", code: "contains-duplicate", relatedProblemSlug: "contains-duplicate",
    introHook: "The hash set is the simplest data structure that permanently changes how you think about 'did I see this before'.",
    closingIp: "Almost every 'has this appeared' question is a hash set or hash map in disguise.",
    tags: ["Hashing", "Arrays", "Sets"],
  },
  {
    slug: "introduction-to-arrays", title: "Introduction to Arrays: The Workhorse Data Structure", category: "arrays", subcategory: "array-basics",
    contentType: "tutorial", difficulty: "Easy", relatedProblemSlug: "two-sum",
    introHook: "Arrays are the data structure every other one copies from: contiguous, indexed, and blisteringly fast to iterate.",
    closingIp: "Mastering array indexing and traversal patterns unlocks everything downstream.",
    tags: ["Arrays", "Beginner", "DSA"],
  },
  {
    slug: "recursion-explained", title: "Recursion Explained With Mental Models", category: "recursion", subcategory: "recursion",
    contentType: "guide", difficulty: "Medium", relatedProblemSlug: "nth-fibonacci",
    introHook: "Recursion is not 'a function calling itself' — it is a function delegating to a smaller, identical version of the problem.",
    closingIp: "Name the base case, name the smaller case, trust the delegation, and the recursion writes itself.",
    tags: ["Recursion", "Thinking", "Functions"],
  },
  {
    slug: "monotonic-stack-guide", title: "The Monotonic Stack: Next Greater Element Patterns", category: "stack-queue", subcategory: "stack",
    contentType: "advanced", difficulty: "Hard", relatedProblemSlug: "largest-rectangle-histogram",
    introHook: "The monotonic stack is a deceptively compact trick hiding an O(n) solution to problems that look O(n^2) at first.",
    closingIp: "Whenever you need the next greater or smaller element, sketch the monotonic stack before anything else.",
    tags: ["Stack", "Monotonic Stack", "Advanced"],
  },
  {
    slug: "binary-tree-traversals", title: "Binary Tree Traversals Without Tears", category: "tree", subcategory: "binary-tree",
    contentType: "guide", difficulty: "Medium", code: "invert-binary-tree", relatedProblemSlug: "binary-tree-inorder",
    introHook: "Pre-order, in-order, and post-order are three different business trips over the same tree, and each has a signature use.",
    closingIp: "If you can write the recursive traversal, the iterative version is one small refactor away.",
    tags: ["Tree", "Traversal", "Recursion"],
  },
  {
    slug: "greedy-algorithm-principles", title: "Greedy Algorithms: When Local Choice Is Enough", category: "greedy", subcategory: "greedy",
    contentType: "guide", difficulty: "Hard", relatedProblemSlug: "activity-selection",
    introHook: "A greedy algorithm makes the locally optimal choice and prays it is globally optimal — and sometimes that prayer works with a proof.",
    closingIp: "Always ask for the exchange argument before trusting a greedy gut feeling.",
    tags: ["Greedy", "Optimization", "Proofs"],
  },
  {
    slug: "bit-manipulation-tricks", title: "Bit Manipulation Tricks Every Developer Should Know", category: "bit-magic", subcategory: "bit-magic",
    contentType: "cheatsheet", difficulty: "Medium", relatedProblemSlug: "single-number",
    introHook: "A handful of bit tricks — masking, toggling, counting — compress entire interview solutions into a single expression.",
    closingIp: "The XOR trick is the single most suspected-but-unsuspected bit cheat in interviews.",
    tags: ["Bits", "XOR", "Cheatsheet"],
  },
  {
    slug: "python-introduction", title: "Python for Beginners: A Gentle On-Ramp", category: "python", subcategory: "python-basics",
    contentType: "tutorial", difficulty: "Easy", code: "contains-duplicate",
    introHook: "Python's readability means you spend time solving problems rather than fighting syntax.",
    closingIp: "Write the readable version first; optimize only when the profiler says it matters.",
    tags: ["Python", "Beginner", "Syntax"],
  },
  {
    slug: "python-oop", title: "Object-Oriented Programming in Python", category: "python", subcategory: "python-oop",
    contentType: "guide", difficulty: "Medium",
    introHook: "Python's object model is famously flexible — classes, magic methods, and duck typing all coexist peacefully.",
    closingIp: "Use the magic methods to give your classes the same ergonomics as built-ins.",
    tags: ["Python", "OOP", "Classes"],
  },
  {
    slug: "python-vs-java", title: "Python vs Java: Choosing Your First Language", category: "python", subcategory: "python-basics",
    contentType: "guide", difficulty: "Easy",
    introHook: "The Python-versus-Java debate is really a debate about explicitness versus velocity.",
    closingIp: "Learn the second language sooner rather than later; the second one unlocks the first.",
    tags: ["Python", "Java", "Comparison"],
  },
  {
    slug: "java-basics", title: "Java Foundations: Syntax, Types, and Control Flow", category: "java", subcategory: "java-basics",
    contentType: "tutorial", difficulty: "Easy", code: "bubble-sort",
    introHook: "Java's verbosity earns its keep in type safety and tooling that catches mistakes at compile time.",
    closingIp: "The compiler is your first reviewer — let it be strict and it will protect you.",
    tags: ["Java", "Beginner", "Syntax"],
  },
  {
    slug: "java-oop-interfaces", title: "Interfaces and Inheritance in Java", category: "java", subcategory: "java-oop",
    contentType: "guide", difficulty: "Medium",
    introHook: "Interfaces in Java are contracts first, and since Java 8, default methods second.",
    closingIp: "Prefer interfaces to concrete inheritance when the goal is flexibility.",
    tags: ["Java", "OOP", "Interfaces"],
  },
  {
    slug: "cpp-pointers", title: "C++ Pointers and References, Demystified", category: "cplusplus",
    contentType: "how-to", difficulty: "Hard",
    introHook: "Pointers are just memory addresses wearing a type — the fear is the only hard part.",
    closingIp: "Modern C++ still uses pointers; the hygiene around them is what changed.",
    tags: ["C++", "Pointers", "Memory"],
  },
  {
    slug: "javascript-closures", title: "JavaScript Closures: The Function That Remembers", category: "javascript", subcategory: "js-core",
    contentType: "guide", difficulty: "Medium",
    introHook: "A closure pairs a function with the environment it was born in, which powers callbacks, modules, and more.",
    closingIp: "If you understand closures, you understand half of JavaScript's identity.",
    tags: ["JavaScript", "Closures", "Functions"],
  },
  {
    slug: "async-javascript", title: "Async JavaScript: Promises and Async/Await", category: "javascript", subcategory: "js-async",
    contentType: "guide", difficulty: "Medium", code: "promise-all",
    introHook: "Promises turn the callback pyramid into a readable vertical pipeline, and async/await finishes the job.",
    closingIp: "Learn to read the failure branches first; every async API can disappoint you.",
    tags: ["JavaScript", "Promises", "Async"],
  },
  {
    slug: "html-css-fundamentals", title: "HTML and CSS Fundamentals for Clean Layouts", category: "html-css",
    contentType: "tutorial", difficulty: "Easy",
    introHook: "HTML gives you the skeleton and CSS the skin; together they are the most forgiving medium in engineering.",
    closingIp: "Start semantic, add classes, and let CSS variables carry your design tokens.",
    tags: ["HTML", "CSS", "Layout"],
  },
  {
    slug: "react-hooks-explained", title: "React Hooks Explained With a Mental Model", category: "react",
    contentType: "guide", difficulty: "Medium",
    introHook: "Hooks let functions carry state, but the rules around them hide a disciplined mental model.",
    closingIp: "State, effects, and memoization each answer one question; keep the questions separate.",
    tags: ["React", "Hooks", "Frontend"],
  },
  {
    slug: "nodejs-event-loop", title: "The Node.js Event Loop, Illustrated", category: "nodejs",
    contentType: "explainer", difficulty: "Medium",
    introHook: "Node's event loop lets one thread juggle thousands of connections by never blocking.",
    closingIp: "Never sleep in the loop path; schedule work, don't block it.",
    tags: ["Node.js", "Event Loop", "Concurrency"],
  },
  {
    slug: "sql-vs-nosql", title: "SQL vs NoSQL: A Practitioner's Guide", category: "databases",
    contentType: "guide", difficulty: "Medium",
    introHook: "The SQL-versus-NoSQL decision is about relationships and scale, not fashion.",
    closingIp: "Start relational, reach for NoSQL only when the access pattern demands it.",
    tags: ["Databases", "SQL", "NoSQL"],
  },
  {
    slug: "web-security-basics", title: "Web Security: The Attacks Every Developer Should Prevent", category: "web-security",
    contentType: "guide", difficulty: "Hard",
    introHook: "Most web attacks are automation applied to boring mistakes — and they are all preventable.",
    closingIp: "Validate input, encode output, and never trust the client.",
    tags: ["Security", "XSS", "OWASP"],
  },
  {
    slug: "load-balancing-explained", title: "Load Balancing: Spreading the Traffic", category: "design-basics",
    contentType: "explainer", difficulty: "Easy",
    introHook: "A load balancer is the polite bouncer that decides which server handles which request.",
    closingIp: "Choose a strategy by what you are balancing: requests, sessions, or load.",
    tags: ["System Design", "Load Balancing", "Scalability"],
  },
  {
    slug: "caching-strategies", title: "Caching Strategies: Where Speed Comes From", category: "scalability",
    contentType: "guide", difficulty: "Medium",
    introHook: "Cache invalidation jokes aside, a good cache strategy is a multiplier on everything you build.",
    closingIp: "Cache reads aggressively, invalidate conservatively, and measure the hit rate.",
    tags: ["Caching", "System Design", "Redis"],
  },
  {
    slug: "microservices-vs-monolith", title: "Microservices vs Monolith: The Honest Comparison", category: "microservices",
    contentType: "guide", difficulty: "Medium",
    introHook: "The monolith is not a failure to launch; it is a blast radius decision.",
    closingIp: "Split for team autonomy and failure isolation, not for the diagram.",
    tags: ["Microservices", "Architecture", "System Design"],
  },
  {
    slug: "database-sharding", title: "Database Sharding Done in Practice", category: "design-databases",
    contentType: "advanced", difficulty: "Hard",
    introHook: "Sharding spreads one logical database across many machines by choosing a key honestly.",
    closingIp: "Pick a shard key that matches your hottest queries, and plan for redistribution.",
    tags: ["Sharding", "Databases", "Scalability"],
  },
  {
    slug: "cap-theorem", title: "The CAP Theorem, Properly Understood", category: "distributed-systems",
    contentType: "explainer", difficulty: "Hard",
    introHook: "CAP is often misquoted as 'pick two' when it really describes what happens during a partition.",
    closingIp: "During a partition you can keep serving but not everything consistently — decide which side you favor.",
    tags: ["CAP", "Distributed Systems", "Consistency"],
  },
  {
    slug: "message-queues", title: "Message Queues: Decoupling at Scale", category: "distributed-systems",
    contentType: "guide", difficulty: "Medium",
    introHook: "A queue absorbs bursts, buffers consumers, and lets producers carry on without knowing who reads.",
    closingIp: "At-least-once delivery means your consumers must be idempotent.",
    tags: ["Queues", "Kafka", "System Design"],
  },
  {
    slug: "behavioral-interviews-star", title: "Nailing Behavioral Questions with the STAR Method", category: "behavioral",
    contentType: "guide", difficulty: "Easy",
    introHook: "Behavioral rounds judge how you think under pressure, not just what you built.",
    closingIp: "Prepare five stories covering conflict, failure, leadership, and scaling impact.",
    tags: ["Interview", "Behavioral", "STAR"],
  },
  {
    slug: "coding-interview-strategies", title: "Coding Interview Strategies That Actually Work", category: "coding-interviews",
    contentType: "guide", difficulty: "Medium",
    introHook: "The coding interview is a conversation about how you think, and that changes what you practise.",
    closingIp: "Talk early, test with an example, and say your complexity out loud.",
    tags: ["Interviews", "Coding", "Strategy"],
  },
  {
    slug: "resume-guide", title: "A Resume That Gets Past the Screener", category: "resume-guides",
    contentType: "guide", difficulty: "Easy",
    introHook: "Resumes are skimmed in seconds, so each line must earn its place with measurable impact.",
    closingIp: "One strong metric beats three weak bullets every single time.",
    tags: ["Resume", "Career", "Tips"],
  },
  {
    slug: "system-design-interview", title: "The System Design Interview, Demystified", category: "interview-process",
    contentType: "guide", difficulty: "Hard",
    introHook: "System design interviews reward a structured skeleton: requirements, estimate, components, deep dives.",
    closingIp: "Drive the conversation with a clear outline and let the interviewer play tour guide.",
    tags: ["System Design", "Interviews", "Architecture"],
  },
  {
    slug: "process-scheduling", title: "Operating System Process Scheduling", category: "operating-systems",
    contentType: "explainer", difficulty: "Hard",
    introHook: "Scheduling decides which process gets the CPU, and every policy is a trade-off between fairness and throughput.",
    closingIp: "Explain a scheduler by naming its goals before its algorithms.",
    tags: ["OS", "Scheduling", "Processes"],
  },
  {
    slug: "dbms-transactions", title: "Database Transactions and ACID Properties", category: "dbms",
    contentType: "guide", difficulty: "Medium",
    introHook: "Transactions bundle reads and writes so that either all of them survive or none of them do.",
    closingIp: "ACID is a contract with the engine; isolation levels are where you compromise deliberately.",
    tags: ["DBMS", "Transactions", "ACID"],
  },
  {
    slug: "networking-tcpip", title: "TCP/IP Fundamentals: What Happens When You Click", category: "computer-networks",
    contentType: "explainer", difficulty: "Medium",
    introHook: "The network stack is a relay race where each layer trusts the next with a different job.",
    closingIp: "When something loads slowly, think TCP handshake, DNS, then your app — in that order.",
    tags: ["Networking", "TCP", "HTTP"],
  },
  {
    slug: "cpu-caching", title: "CPU Caching and the Memory Hierarchy", category: "computer-architecture",
    contentType: "explainer", difficulty: "Medium",
    introHook: "The memory hierarchy turns a 10,000x speed gap into a 1x-feeling illusion for most code.",
    closingIp: "Write cache-friendly loops and the hardware quietly keeps you fast.",
    tags: ["Architecture", "Cache", "Performance"],
  },
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

function buildContent(def: TopicDef): ContentBlock[] {
  const r = rng(mulberry(def.slug));
  const blocks: ContentBlock[] = [];
  const topic = def.title.split(":")[0];
  const leadVariant = pick(r, LEADS);
  const lead = `${topic} ${leadVariant} ${pick(r, LEADS_TAIL)}`;

  blocks.push({ type: "p", text: lead });
  blocks.push({
    type: "h2",
    id: slugify(`introduction`),
    text: `Introduction to ${topic}`,
  });
  blocks.push({ type: "p", text: lead });
  blocks.push({
    type: "p",
    text: `Before we dive in, it helps to define the terms precisely. In this ${def.contentType}, ${topic.toLowerCase()} refers to the technique and the reasoning behind it, and we keep the math minimal so you can apply the pattern immediately. ${pick(r, MID_FILL)}`,
  });
  blocks.push({
    type: "h2",
    id: "why-it-matters",
    text: "Why This Matters",
  });
  blocks.push({
    type: "p",
    text: `Strong interview answers and solid engineering decisions both start from the same place: a ${pick(r, WHY_POINTS)}. You will reuse this pattern far more often than you expect.`,
  });
  blocks.push({ type: "list", ordered: false, items: [WHY_POINTS[0], WHY_POINTS[1], WHY_POINTS[2], WHY_POINTS[3]] });

  if (def.code) {
    blocks.push({
      type: "h2",
      id: "code-example",
      text: "A Complete, Runnable Example",
    });
    blocks.push({
      type: "p",
      text: `Here is an idiomatic ${pick(r, ["implementation", "reference solution", "walkthrough"])} in the four languages we use across the platform. Switch tabs to compare the same logic side by side; note how the algorithm itself is identical and only the syntax changes.`,
    });
    blocks.push({ type: "code", block: codeFor(def.code) });

    blocks.push({
      type: "h3",
      id: "walking-through",
      text: "Walking Through the Code",
    });
    blocks.push({
      type: "p",
      text: `Line by line, the example maintains a single invariant: every step leaves the structure consistent for the next step. ${pick(r, MID_FILL)}`,
    });
    blocks.push({
      type: "callout",
      variant: "tip",
      title: "Pro tip",
      text: `Trace the example with a pen on a four-element input. Repeatedly, a hand trace exposes the edge case that reading code cannot.`,
    });
  }

  blocks.push({
    type: "h2",
    id: "complexity-analysis",
    text: "Complexity at a Glance",
  });
  blocks.push({
    type: "p",
    text: `Every implementation discussed above can be compared on time and space. The table below hides a lot of nuance, but it is the right conversation starter for an interview.`,
  });
  blocks.push({
    type: "table",
    headers: ["Approach", "Time Complexity", "Space Complexity"],
    rows: TABLE_ROWS,
  });

  blocks.push({
    type: "callout",
    variant: "warning",
    title: "Common pitfall",
    text: `Textbook inputs are small and friendly. Production inputs are adversarial: always test the largest allowed input and a few pathological shapes before trusting the estimator.`,
  });

  if (def.difficulty === "Hard" || def.difficulty === "Medium") {
    blocks.push({
      type: "h2",
      id: "interview-angle",
      text: "The Interview Angle",
    });
    blocks.push({
      type: "p",
      text: `Expect the follow-up: how would you handle a variant? A clean answer names the invariant you preserve, then extends it one small step. ${pick(r, MID_FILL)}`,
    });
    blocks.push({
      type: "list",
      ordered: false,
      items: [COMPARE_ITEM_1, COMPARE_ITEM_2, COMPARE_ITEM_3, COMPARE_ITEM_4],
    });
  }

  blocks.push({
    type: "image",
    src: thumb("art-" + def.slug, 800, 420),
    alt: `Conceptual illustration of ${topic}`,
    caption: `A high-level sketch of ${topic.toLowerCase()} (illustrative diagram).`,
  });

  blocks.push({
    type: "h2",
    id: "conclusion",
    text: "Wrapping Up",
  });
  blocks.push({ type: "p", text: def.closingIp });
  blocks.push({ type: "p", text: `If you enjoyed this ${def.contentType}, put it to work right away on the practice problem linked below — muscle memory beats reading every time.` });

  if (def.relatedProblemSlug) {
    blocks.push({
      type: "callout",
      variant: "note",
      title: "Practice this concept",
      text: `Head over to the problem ${def.relatedProblemSlug.replace(/-/g, " ")} on the practice page and solve it with what you just learned.`,
    });
  }

  return blocks;
}

function dateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

function makeArticle(def: TopicDef, index: number): Article {
  const r = rng(mulberry(def.slug + "x"));
  const readTime = 5 + Math.floor(r() * (def.code ? 6 : 3));
  const views = 800 + Math.floor(r() * 24000);
  const likes = Math.floor(views * (0.01 + r() * 0.06));
  const content = buildContent(def);

  return {
    id: `art_${index}`,
    slug: def.slug,
    title: def.title,
    categoryId: def.category,
    categorySlug: def.category,
    categoryName: def.category.replace(/-/g, " "),
    subcategory: def.subcategory,
    contentType: def.contentType,
    author: AUTHORS[index % AUTHORS.length],
    difficulty: def.difficulty,
    readTimeMin: readTime,
    tags: def.tags,
    createdAt: dateOffset(300 - index * 5),
    updatedAt: dateOffset(Math.floor(index / 3) + 1),
    views,
    likes,
    description: def.introHook,
    content,
    relatedProblemSlug: def.relatedProblemSlug,
    thumbnail: thumb(def.slug, 400, 250),
  };
}

export const ARTICLES: Article[] = TOPICS.map(makeArticle);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function categoryName(slug: string): string {
  const map: Record<string, string> = {
    arrays: "Arrays",
    strings: "Strings",
    "linked-list": "Linked List",
    "stack-queue": "Stack & Queue",
    tree: "Tree",
    graph: "Graph",
    recursion: "Recursion",
    searching: "Searching",
    sorting: "Sorting",
    heap: "Heap",
    hashing: "Hashing",
    "dynamic-programming": "Dynamic Programming",
    greedy: "Greedy",
    backtracking: "Backtracking",
    "bit-magic": "Bit Magic",
    matrix: "Matrix",
    python: "Python",
    java: "Java",
    cplusplus: "C++",
    javascript: "JavaScript",
    "html-css": "HTML & CSS",
    react: "React",
    nodejs: "Node.js",
    databases: "Databases",
    "web-security": "Web Security",
    "design-basics": "Design Fundamentals",
    scalability: "Scalability",
    "distributed-systems": "Distributed Systems",
    microservices: "Microservices",
    "design-databases": "Storage & Databases",
    "interview-process": "Interview Process",
    "coding-interviews": "Coding Interviews",
    behavioral: "Behavioral Questions",
    "resume-guides": "Resume & Portfolio",
    "operating-systems": "Operating Systems",
    dbms: "DBMS",
    "computer-networks": "Computer Networks",
    "computer-architecture": "Computer Architecture",
  };
  return map[slug] ?? slug.replace(/-/g, " ");
}