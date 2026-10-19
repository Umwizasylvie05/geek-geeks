import type { Course } from "../types";

function course(
  slug: string,
  title: string,
  tagline: string,
  description: string,
  category: string,
  instructor: string,
  instructorTitle: string,
  price: number | null,
  rating: number,
  reviewCount: number,
  enrolled: number,
  level: Course["level"],
  durationHours: number,
  modules: { title: string; lessons: { title: string; durationMin: number }[] }[],
  learningOutcomes: string[],
  reviews: { author: string; rating: number; text: string }[]
): Course {
  return {
    id: `c_${slug}`,
    slug,
    title,
    tagline,
    description,
    category,
    instructor,
    instructorTitle,
    price,
    rating,
    reviewCount,
    enrolled,
    modules,
    level,
    durationHours,
    thumbnailSeed: slug,
    learningOutcomes,
    reviews,
  };
}

export const COURSES: Course[] = [
  course(
    "data-structures-bootcamp", "Data Structures Bootcamp", "Arrays to graphs in one guided track.",
    "A structured, example-driven walk through the data structures you will build on for the rest of your career — arrays, linked lists, stacks, queues, trees, maps, and graphs. Every module pairs a concept with a runnable example and a checkpoint problem.",
    "DSA", "Dr. Meera Natarajan", "Senior Software Engineer, Nimbus", 49, 4.7, 1284, 28410,
    "Intermediate", 26,
    [
      { title: "Arrays and Strings", lessons: [
        { title: "Array Basics and Traversal Patterns", durationMin: 22 },
        { title: "Sliding Window Fundamentals", durationMin: 28 },
        { title: "Two Pointers in Action", durationMin: 25 },
      ] },
      { title: "Linked Lists", lessons: [
        { title: "Singly Linked List Deep Dive", durationMin: 24 },
        { title: "Reverse and Merge Patterns", durationMin: 27 },
      ] },
      { title: "Trees and Graphs", lessons: [
        { title: "Binary Tree Traversals", durationMin: 26 },
        { title: "BFS and DFS on Graphs", durationMin: 30 },
      ] },
    ],
    ["Confidently implement every core data structure from scratch", "Recognize which structure fits a problem in seconds", "Solve 30+ guided practice problems"],
    [
      { author: "Kiran Patel", rating: 5, text: "The checkpoint problems are perfectly sized; I actually finished something each week." },
      { author: "Sofia Marino", rating: 4, text: "Clear diagrams, honest complexity analysis. Minor: some recording volume dips." },
    ]
  ),
  course(
    "dsa-interview-mastery", "DSA Interview Mastery", "The algorithm track most asked about.",
    "A problem-first curriculum for coding interviews: learn the core patterns (prefix sums, sliding windows, binary search variants, DP, graphs) and drill them against the exact difficulty band seen in real interviews.",
    "DSA", "Omar Haddad", "Ex-Staff Engineer, Quantix", 79, 4.9, 3122, 91200,
    "Advanced", 42,
    [
      { title: "Core Patterns", lessons: [
        { title: "The Pattern Map", durationMin: 18 },
        { title: "Sliding Window and Two Pointers", durationMin: 34 },
        { title: "Binary Search on Answer", durationMin: 31 },
      ] },
      { title: "Dynamic Programming", lessons: [
        { title: "Memoization First", durationMin: 29 },
        { title: "1D DP Questions", durationMin: 36 },
        { title: "2D / Grid DP", durationMin: 33 },
      ] },
      { title: "Graphs and Advanced", lessons: [
        { title: "Topological Sorting", durationMin: 28 },
        { title: "Shortest Path Families", durationMin: 35 },
      ] },
    ],
    ["Solve medium and hard questions with a repeatable framework", "Explain solutions conversationally like interviewers expect", "Track your solving streak and blind spots automatically"],
    [
      { author: "Aisha Bello", rating: 5, text: "Pattern map alone is worth the price. I went from panic to method." },
      { author: "Lukas Meyer", rating: 5, text: "The complexity reasoning segments are the best I've seen online." },
    ]
  ),
  course(
    "python-zero-to-pro", "Python: Zero to Pro", "Start coding in Python the fast way.",
    "A hands-on introduction for complete beginners that moves into functions, classes, modules, and a taste of data science tooling — with weekly mini-projects instead of eternal theory.",
    "Languages", "Elena Petrova", "Curriculum Lead, Streamline Labs", 19, 4.6, 2541, 120400,
    "Beginner", 18,
    [
      { title: "The Basics", lessons: [
        { title: "Your First Python Program", durationMin: 12 },
        { title: "Variables, Types, and Conditionals", durationMin: 20 },
        { title: "Loops and List Comprehensions", durationMin: 22 },
      ] },
      { title: "Functions and Classes", lessons: [
        { title: "Defining Functions Well", durationMin: 24 },
        { title: "Classes, Objects, and Magic Methods", durationMin: 28 },
      ] },
      { title: "Real Python", lessons: [
        { title: "Modules and Packaging", durationMin: 26 },
        { title: "Capstone: A CLI Quiz Game", durationMin: 40 },
      ] },
    ],
    ["Write idiomatic, readable Python by the end of week two", "Build and run your first real project", "Comfortably read other people's Python code"],
    [
      { author: "Grace Mwangi", rating: 5, text: "The mini-project at the end of each section kept me honest." },
      { author: "Danilo Costa", rating: 4, text: "Great pace; would love a longer capstone." },
    ]
  ),
  course(
    "java-fundamentals", "Java Fundamentals", "Compile-time safety, runtime power.",
    "Learn Java properly: types, classes, collections, streams, and JVM behavior. Designed for people arriving from dynamically typed languages.",
    "Languages", "Rafael Dumont", "Solution Architect, HelioSoft", 29, 4.5, 812, 14820,
    "Beginner", 24,
    [
      { title: "Language Core", lessons: [
        { title: "Syntax, Types, and Control Flow", durationMin: 26 },
        { title: "Object-Oriented Java", durationMin: 30 },
        { title: "Generics and Collections", durationMin: 28 },
      ] },
      { title: "Modern Java", lessons: [
        { title: "Streams and Lambdas", durationMin: 24 },
        { title: "Exceptions and Resource Handling", durationMin: 21 },
      ] },
    ],
    ["Read and write idiomatic modern Java", "Understand the JVM's memory model", "Build a small CLI application end to end"],
    [
      { author: "Yuki Tanaka", rating: 5, text: "Finally a Java course that doesn't bore you with console trivia for six hours." },
    ]
  ),
  course(
    "javascript-confident", "Confident JavaScript", "Proto, closure, async — handled.",
    "The conceptual JS course: this binding, closures, prototypes, the event loop, promises, and async/await — with exercises that actually challenge your mental model.",
    "Languages", "Nadia Karim", "Senior Frontend Engineer, PixelForge", 24, 4.8, 1765, 45200,
    "Intermediate", 20,
    [
      { title: "The Tricky Core", lessons: [
        { title: "Closures and this", durationMin: 28 },
        { title: "Prototypes and Classes", durationMin: 24 },
      ] },
      { title: "Async JavaScript", lessons: [
        { title: "The Event Loop", durationMin: 22 },
        { title: "Promises and async/await", durationMin: 27 },
      ] },
    ],
    ["Predict this-binding without checking", "Explain the event loop to a friend", "Handle async pipelines without spaghetti"],
    [
      { author: "Marco Rossi", rating: 5, text: "The mental-model-first approach is fantastic." },
    ]
  ),
  course(
    "web-dev-complete", "Complete Web Development", "HTML, CSS, React, Node — the full stack.",
    "Build and deploy real applications: semantic HTML, modern CSS, responsive layout, React fundamentals, Node APIs, and databases. A project-oriented full-stack path.",
    "Web Dev", "Sana Iqbal", "Principal Engineer, CloudWire", 59, 4.7, 4234, 310000,
    "Intermediate", 48,
    [
      { title: "Frontend Foundations", lessons: [
        { title: "Semantic HTML and Accessibility", durationMin: 24 },
        { title: "CSS Layout and Design Tokens", durationMin: 32 },
      ] },
      { title: "React", lessons: [
        { title: "Components and Props", durationMin: 28 },
        { title: "Hooks and State Management", durationMin: 34 },
      ] },
      { title: "Backend and Databases", lessons: [
        { title: "Building REST APIs with Node", durationMin: 30 },
        { title: "SQL and ORMs", durationMin: 26 },
      ] },
      { title: "Capstone", lessons: [
        { title: "Ship a Full-Stack App", durationMin: 60 },
      ] },
    ],
    ["Ship a real full-stack application", "Build accessible, responsive interfaces", "Design and query a database schema"],
    [
      { author: "Oliver Brown", rating: 5, text: "The capstone is exactly the confidence builder beginners need." },
      { author: "Nina Volkova", rating: 4, text: "Occasionally fast-paced; keep the docs open." },
    ]
  ),
  course(
    "react-in-depth", "React In Depth", "State, effects, and performance without the guesswork.",
    "Go beyond tutorials: reconciliation, rendering behavior, hooks rules, memoization, and designing components that survive real products.",
    "Web Dev", "Diego Fernandez", "React Core Contributor (fictional)", 39, 4.8, 980, 33400,
    "Advanced", 14,
    [
      { title: "Rendering", lessons: [
        { title: "Reconciliation and Keys", durationMin: 25 },
        { title: "When Components Re-render", durationMin: 28 },
      ] },
      { title: "Hooks in Practice", lessons: [
        { title: "Designing Custom Hooks", durationMin: 26 },
        { title: "Performance and Memoization", durationMin: 24 },
      ] },
    ],
    ["Predict when your app re-renders", "Write maintainable custom hooks", "Profile and fix real performance problems"],
    [
      { author: "Hannah Lee", rating: 5, text: "Finally understand why my app re-rendered. Worth it alone." },
    ]
  ),
  course(
    "system-design-foundations", "System Design Foundations", "The vocabulary of scale.",
    "Learn the building blocks: load balancers, caches, queues, databases, CDNs, and how to sketch a system on a whiteboard with confidence.",
    "System Design", "Viktor Petrov", "Distinguished Architect, Cobalt Peak", 49, 4.8, 2211, 118500,
    "Beginner", 30,
    [
      { title: "Building Blocks", lessons: [
        { title: "Load Balancing and Proxies", durationMin: 26 },
        { title: "Caching Top to Bottom", durationMin: 28 },
        { title: "Message Queues", durationMin: 24 },
      ] },
      { title: "Storage", lessons: [
        { title: "SQL vs NoSQL Revisited", durationMin: 22 },
        { title: "Replication and Sharding", durationMin: 29 },
      ] },
      { title: "Putting It Together", lessons: [
        { title: "Whiteboard Walkthroughs", durationMin: 35 },
      ] },
    ],
    ["Sketch any common system with the right vocabulary", "Justify trade-offs instead of naming buzzwords", "Run a mock system design interview warm-up"],
    [
      { author: "Rebecca Adams", rating: 5, text: "The trade-off tables alone level up every answer I give." },
    ]
  ),
  course(
    "distributed-systems-masterclass", "Distributed Systems Masterclass", "Consistency, consensus, and failure.",
    "A rigorous tour: the CAP theorem told honestly, quorums, consensus protocols, distributed state, and how famous systems actually work under the hood.",
    "System Design", "Amara Diop", "Fellow, Vertex Labs", 89, 4.9, 604, 18900,
    "Advanced", 40,
    [
      { title: "Consistency", lessons: [
        { title: "Consistency Models", durationMin: 32 },
        { title: "PA/EL and Practical CAP", durationMin: 27 },
      ] },
      { title: "Consensus", lessons: [
        { title: "Quorums and the Split-Brain Problem", durationMin: 30 },
        { title: "How Raft Works, Agent-Style", durationMin: 38 },
      ] },
      { title: "Real Systems", lessons: [
        { title: "A Distributed Queue Under the Hood", durationMin: 28 },
      ] },
    ],
    ["Explain consistency models precisely", "Describe consensus protocols with diagrams", "Debug distributed systems with the right mental tools"],
    [
      { author: "Thomas Nguyen", rating: 5, text: "Rare to find this level of rigor outside a textbook." },
    ]
  ),
  course(
    "interview-prep-mastery", "Interview Prep Mastery", "Process, behavior, and system rounds.",
    "A complete interview simulator: resume teardown, behavioral storytelling with STAR, company research strategy, and timed mock rounds across coding and system design.",
    "Interview Prep", "Farida Hussain", "Career Coach (fictional), Cobalt Peak Alums", 34, 4.6, 1410, 52100,
    "Beginner", 12,
    [
      { title: "Foundations", lessons: [
        { title: "The Interview Process, Explained", durationMin: 18 },
        { title: "Resume and LinkedIn Teardown", durationMin: 22 },
      ] },
      { title: "Behavioral Rounds", lessons: [
        { title: "STAR Storytelling", durationMin: 20 },
        { title: "Handling the Curveballs", durationMin: 17 },
      ] },
      { title: "Practice", lessons: [
        { title: "Mock Interview Scripts", durationMin: 30 },
      ] },
    ],
    ["Narrate your experience with impact", "Handle any behavioral prompt without freezing", "Run a full mock interview loop by yourself"],
    [
      { author: "Ethan Clarke", rating: 5, text: "The mock scripts are shockingly close to the real thing." },
    ]
  ),
  course(
    "sql-and-databases", "SQL and Databases for Everyone", "Query, model, optimize.",
    "From your first SELECT to indexing and query planning, with a data-modeling project woven through every chapter.",
    "Web Dev", "Priyanka Verma", "Data Platform Lead, DataBridge", 29, 4.7, 1632, 74300,
    "Beginner", 22,
    [
      { title: "Querying", lessons: [
        { title: "CRUD and Filtering", durationMin: 20 },
        { title: "Joins and Aggregations", durationMin: 28 },
      ] },
      { title: "Modeling", lessons: [
        { title: "Designing a Schema", durationMin: 26 },
        { title: "Normalization Practically", durationMin: 22 },
      ] },
      { title: "Performance", lessons: [
        { title: "Indexes and EXPLAIN", durationMin: 25 },
      ] },
    ],
    ["Write correct queries the first time", "Model data that survives changing requirements", "Read query plans and find slow spots"],
    [
      { author: "Marta Kowalska", rating: 5, text: "The normalization chapter finally made a confusing topic click." },
    ]
  ),
  course(
    "frontend-frecuencia", "Frontend Fundamentals in Practice", "Design tokens, layout, and craft.",
    "A design-engineer's course: color systems, typography, responsive layout, component APIs, and accessibility — everything that separates styled from designed.",
    "Web Dev", "Lucia Romero", "Design Engineer, Marblewave", 24, 4.5, 732, 19200,
    "Beginner", 15,
    [
      { title: "Design Systems", lessons: [
        { title: "Tokens and Theming", durationMin: 22 },
        { title: "Typography and Spacing", durationMin: 20 },
      ] },
      { title: "Layout and Components", lessons: [
        { title: "Responsive Layout Patterns", durationMin: 26 },
        { title: "Building Accessible Components", durationMin: 28 },
      ] },
    ],
    ["Build a coherent design language", "Make layouts degrade gracefully at every size", "Ship accessible interfaces by default"],
    [
      { author: "Gabriel Santos", rating: 4, text: "Beautiful and practical; some sections beg for a follow-up course." },
    ]
  ),
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}