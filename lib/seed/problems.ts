import type { Example, Problem } from "../types";

const COMPANIES = [
  "Nimbus",
  "PixelForge",
  "DataBridge",
  "CloudWire",
  "Quantix",
  "Streamline",
  "HelioSoft",
  "Vertex Labs",
  "Marblewave",
  "Cobalt Peak",
];

function problem(
  slug: string,
  title: string,
  difficulty: Problem["difficulty"],
  description: string,
  examples: Example[],
  constraints: string[],
  summary: string,
  extraTags: string[] = [],
  companyIdx: number[]
): Problem {
  const solved = 4000 + Math.floor(Math.abs(Math.sin(slug.length * 37)) * 45000);
  const submissions = Math.floor(solved / (0.3 + Math.abs(Math.cos(slug.length * 13)) * 0.6));
  const acceptance = Math.min(95, Math.max(12, Math.round(((solved / submissions) * 100) * 100) / 100));
  const baseTags: Record<Problem["difficulty"], string[]> = {
    Easy: ["Array", "Beginner"],
    Medium: ["Array", "Algorithm"],
    Hard: ["Advanced", "Optimization"],
  };
  return {
    id: `p_${slug}`,
    slug,
    title,
    difficulty,
    tags: [...baseTags[difficulty], ...extraTags],
    companies: companyIdx.map((i) => COMPANIES[i % COMPANIES.length]),
    description,
    examples,
    constraints,
    acceptanceRate: acceptance,
    solutionSummary: summary,
    submissions,
    solved,
  };
}

export const PROBLEMS: Problem[] = [
  problem(
    "two-sum", "Two Sum", "Easy",
    "Given a list of integers, return the indices of the two numbers that add up to a target value. Assume exactly one valid pair exists and the same element cannot be used twice.",
    [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    ["2 <= nums.length <= 10^4", "-10^9 <= nums[i], target <= 10^9", "Exactly one valid solution exists"],
    "Scan the array once, keeping a hash map from value to index. For each element compute the complement and check the map before inserting the current element.",
    ["Hashing", "HashMap"], [0, 2, 5]
  ),
  problem(
    "reverse-linked-list", "Reverse Linked List", "Easy",
    "Reverse a singly linked list in place and return the new head. Iterative and recursive solutions are both acceptable.",
    [
      { input: "1 -> 2 -> 3 -> 4 -> 5", output: "5 -> 4 -> 3 -> 2 -> 1" },
      { input: "1 -> 2", output: "2 -> 1" },
      { input: "[]", output: "[]" },
    ],
    ["0 <= number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
    "Thread three pointers (prev, current, next), rewiring each node's next pointer backwards. Handle the null and single-node cases up front.",
    ["Linked List", "Pointers"], [1, 3, 7]
  ),
  problem(
    "sort-an-array", "Sort an Array", "Medium",
    "Given an array of integers, sort it in non-decreasing order without using your language's built-in sort in the exploratory solution. You may, however, mention comparisons with library sort in your written complexity analysis.",
    [
      { input: "nums = [5, 2, 3, 1]", output: "[1, 2, 3, 5]" },
      { input: "nums = [5, 1, 1, 2, 0, 0]", output: "[0, 0, 1, 1, 2, 5]" },
    ],
    ["1 <= nums.length <= 5 * 10^4", "-10^5 <= nums[i] <= 10^5"],
    "Use a merge sort or a randomized quick sort core. Both run at O(n log n) average and, unlike naive sorts, handle adversarial inputs gracefully with the right pivot choice.",
    ["Sorting", "Divide and Conquer"], [0, 4, 6]
  ),
  problem(
    "binary-search", "Binary Search", "Easy",
    "Given a sorted array of integers and a target, return the index of the target or -1 if it is absent.",
    [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1" },
    ],
    ["1 <= nums.length <= 10^4", "-10^4 <= nums[i], target <= 10^4", "nums is sorted ascending"],
    "Maintain lo and hi around the candidate window; compute mid with lo + (hi - lo) / 2 and narrow the window based on comparison, never on bounds that would loop forever.",
    ["Binary Search", "Searching"], [2, 3, 8]
  ),
  problem(
    "maximum-subarray-sum", "Maximum Subarray Sum", "Medium",
    "Find the largest sum of any contiguous subarray inside an integer array.",
    [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "Subarray [4, -1, 2, 1] sums to 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5, 4, -1, 7, 8]", output: "23" },
    ],
    ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    "Kadane's algorithm: track the best sum ending at the current position, resetting it to the current element whenever continuing makes it worse. Single pass, O(n).",
    ["Dynamic Programming", "Greedy"], [0, 2, 5]
  ),
  problem(
    "nth-fibonacci", "Nth Fibonacci Number", "Easy",
    "Return the n-th Fibonacci number, where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2).",
    [
      { input: "n = 2", output: "1" },
      { input: "n = 3", output: "2" },
      { input: "n = 10", output: "55" },
    ],
    ["0 <= n <= 30"],
    "Simple bottom-up DP keeps only the last two values, giving O(n) time and O(1) space.",
    ["Dynamic Programming", "Math"], [3, 4, 9]
  ),
  problem(
    "bfs-graph-traversal", "BFS Graph Traversal", "Medium",
    "Traverse an undirected graph starting from a given node, returning the order in which nodes are first visited using breadth-first search. Neighbors are visited in the order they appear in each adjacency list.",
    [
      { input: "adj = [[1, 2], [2], [0, 3], [3]], start = 2", output: "[2, 0, 3, 1]" },
      { input: "adj = [[1], [0]], start = 0", output: "[0, 1]" },
    ],
    ["1 <= n <= 10^4, 0 <= edges <= 2 * 10^4", "Graph is connected and simple"],
    "Push the start into a queue and a visited set; repeatedly pop, visit, and enqueue unseen neighbors. The queue's FIFO order guarantees shortest-hop ordering on unweighted graphs.",
    ["Graph", "Queue"], [1, 6, 7]
  ),
  problem(
    "valid-palindrome", "Valid Palindrome", "Easy",
    "A phrase is a palindrome if it reads the same forwards and backwards after converting uppercase letters to lowercase and removing all non-alphanumeric characters. Return true if the input is such a phrase.",
    [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" },
      { input: "s = \"race a car\"", output: "false" },
      { input: "s = \" \"", output: "true" },
    ],
    ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters"],
    "Skip non-alphanumerics with a helper, then compare from both ends, moving inward. This runs in O(n) with O(1) space.",
    ["Strings", "Two Pointers"], [0, 3, 8]
  ),
  problem(
    "valid-parentheses", "Valid Parentheses", "Easy",
    "Given a string containing only the characters ()[] {}, determine whether the brackets are well-formed and correctly nested.",
    [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" },
      { input: "s = \"([)]\"", output: "false" },
    ],
    ["1 <= s.length <= 10^4", "s consists of brackets only"],
    "Push every opening bracket onto a stack; on a closing bracket, expect the matching opener at the top, otherwise fail early. The stack is empty at the end if valid.",
    ["Stack", "Strings"], [2, 5, 9]
  ),
  problem(
    "invert-binary-tree", "Invert Binary Tree", "Easy",
    "Swap every left and right child of a binary tree and return the new root.",
    [
      { input: "root = [4, 2, 7, 1, 3, 6, 9]", output: "[4, 7, 2, 9, 6, 3, 1]" },
      { input: "root = [2, 1, 3]", output: "[2, 3, 1]" },
      { input: "root = []", output: "[]" },
    ],
    ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    "Recursion with a twist: swap children, then recurse into both subtrees. The swap happens before worrying about the subtrees, which works because each subtree is handled independently.",
    ["Tree", "Recursion"], [1, 4, 6]
  ),
  problem(
    "merge-two-sorted-lists", "Merge Two Sorted Lists", "Easy",
    "Merge two sorted linked lists into a single sorted linked list by rewiring nodes, not by creating new ones.",
    [
      { input: "l1 = [1, 2, 4], l2 = [1, 3, 4]", output: "[1, 1, 2, 3, 4, 4]" },
      { input: "l1 = [], l2 = []", output: "[]" },
      { input: "l1 = [], l2 = [0]", output: "[0]" },
    ],
    ["0 <= number of nodes <= 50", "-100 <= Node.val <= 100", "Both lists sorted ascending"],
    "Walk both lists with a dummy head, repeatedly attaching the smaller current node. Attach whatever remains of the longer list at the end.",
    ["Linked List", "Merge"], [0, 3, 7]
  ),
  problem(
    "longest-common-prefix", "Longest Common Prefix", "Easy",
    "Return the longest string that is a prefix of every string in an input array, or an empty string if none exists.",
    [
      { input: "strs = [\"flower\", \"flow\", \"flight\"]", output: "\"fl\"" },
      { input: "strs = [\"dog\", \"racecar\", \"car\"]", output: "\"\"" },
    ],
    ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] consists of lowercase letters"],
    "Start with the first string as the candidate prefix and shrink it against every following string until it is a prefix of each.",
    ["Strings", "Trie"], [2, 8]
  ),
  problem(
    "contains-duplicate", "Contains Duplicate", "Easy",
    "Return true if any value appears at least twice in the array.",
    [
      { input: "nums = [1, 2, 3, 1]", output: "true" },
      { input: "nums = [1, 2, 3, 4]", output: "false" },
    ],
    ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    "Insert every element into a hash set; if an insert returns false the value already exists.",
    ["Hashing", "Set"], [0, 5]
  ),
  problem(
    "largest-rectangle-histogram", "Largest Rectangle in Histogram", "Hard",
    "Given an array of bar heights, find the largest rectangle that can be formed by consecutive bars in the histogram.",
    [
      { input: "heights = [2, 1, 5, 6, 2, 3]", output: "10", explanation: "The 2x5 base uses heights 5 and 6." },
      { input: "heights = [2, 4]", output: "4" },
    ],
    ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    "A monotonic increasing stack keeps start indices while heights are rising; when a smaller height arrives, pop and compute the max area for each popped bar using the new boundary.",
    ["Stack", "Monotonic Stack"], [0, 4, 7]
  ),
  problem(
    "binary-tree-inorder", "Binary Tree Inorder Traversal", "Easy",
    "Return the in-order traversal of a binary tree's node values: left subtree, root, right subtree.",
    [
      { input: "root = [1, null, 2, 3]", output: "[1, 3, 2]" },
      { input: "root = []", output: "[]" },
      { input: "root = [1]", output: "[1]" },
    ],
    ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    "Recursive in-order is a three-line classic. The iterative version uses an explicit stack to simulate the recursive call frames.",
    ["Tree", "Traversal"], [1, 6]
  ),
  problem(
    "activity-selection", "Activity Selection", "Easy",
    "Given start and end times for activities, select the maximum number of non-overlapping activities. An activity ends right when another starts, they do not overlap.",
    [
      { input: "start = [1, 3, 0, 5, 8, 5], end = [2, 4, 6, 7, 9, 9]", output: "4" },
      { input: "start = [1, 2], end = [3, 3]", output: "1" },
    ],
    ["1 <= n <= 10^4", "0 <= start[i] < end[i] <= 10^9"],
    "Sort by end time and greedily pick the activity that finishes earliest and does not overlap the previously chosen one.",
    ["Greedy", "Sorting"], [3, 8]
  ),
  problem(
    "single-number", "Single Number", "Easy",
    "Every element in an array appears exactly twice except for one which appears once. Find that element using only constant extra space.",
    [
      { input: "nums = [2, 2, 1]", output: "1" },
      { input: "nums = [4, 1, 2, 1, 2]", output: "4" },
      { input: "nums = [1]", output: "1" },
    ],
    ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4"],
    "XOR all elements together. Duplicates cancel in pairs, leaving exactly the single non-repeated number, all in O(1) space.",
    ["Bits", "XOR"], [0, 5, 9]
  ),
  problem(
    "move-zeroes", "Move Zeroes", "Easy",
    "Move all zeroes to the end of the array while preserving the relative order of non-zero elements, in place and with minimal writes.",
    [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "nums = [0]", output: "[0]" },
    ],
    ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    "Use a slow pointer for the write position. Every non-zero overwrites the slow pointer, then zeroes are written at the tail.",
    ["Array", "Two Pointers"], [1, 5, 7]
  ),
  problem(
    "best-time-to-buy-stock", "Best Time to Buy and Sell Stock", "Easy",
    "Given daily prices, choose one day to buy and one later day to sell to maximize profit. Return the maximum profit or 0 if no profit is possible.",
    [
      { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5", explanation: "Buy at 1, sell at 6." },
      { input: "prices = [7, 6, 4, 3, 1]", output: "0" },
    ],
    ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    "Track the cheapest price seen so far and compute the profit of selling at each day, keeping the maximum.",
    ["Array", "Sliding Window"], [2, 6]
  ),
  problem(
    "climbing-stairs", "Climbing Stairs", "Easy",
    "You climb a staircase taking 1 or 2 steps at a time. Return the number of distinct ways to reach the top of n steps.",
    [
      { input: "n = 2", output: "2", explanation: "1+1 and 2." },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1." },
    ],
    ["1 <= n <= 45"],
    "The number of ways to reach step k is the sum of ways to reach k-1 and k-2, which is exactly the Fibonacci recurrence.",
    ["Dynamic Programming", "Math"], [3, 4, 8]
  ),
  problem(
    "majority-element", "Majority Element", "Easy",
    "An element is a majority if it appears more than n/2 times in the array. Return the majority element, which is guaranteed to exist.",
    [
      { input: "nums = [3, 2, 3]", output: "3" },
      { input: "nums = [2, 2, 1, 1, 1, 2, 2]", output: "2" },
    ],
    ["1 <= nums.length <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9", "Majority always exists"],
    "Boyer-Moore voting holds a candidate and a counter, canceling pairs of different values; the surviving candidate is the majority.",
    ["Array", "Voting"], [0, 2, 9]
  ),
  problem(
    "rotate-array", "Rotate Array", "Medium",
    "Rotate an array to the right by k steps, where k may be larger than the array length.",
    [
      { input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3", output: "[5, 6, 7, 1, 2, 3, 4]" },
      { input: "nums = [-1, -100, 3, 99], k = 2", output: "[3, 99, -1, -100]" },
    ],
    ["1 <= nums.length <= 10^5", "0 <= k <= 10^5"],
    "Normalize k with modulo. Reverse the whole array, then reverse the first k elements and the rest — the classic three-reversal trick.",
    ["Array", "Reverse"], [1, 3, 7]
  ),
  problem(
    "group-anagrams", "Group Anagrams", "Medium",
    "Group strings that are anagrams of each other (same letters, different order) into lists and return the set of groups in any order.",
    [
      { input: "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]", output: "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]" },
      { input: "strs = [\"\"]", output: "[[\"\"]]" },
    ],
    ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100"],
    "Key each string by a sorted signature or a 26-length character-count tuple in a hash map, then collect strings sharing a key.",
    ["Hashing", "Strings"], [2, 5, 8]
  ),
  problem(
    "longest-substring", "Longest Substring Without Repeating", "Medium",
    "Return the length of the longest substring that has no repeated characters.",
    [
      { input: "s = \"abcabcbb\"", output: "3", explanation: "\"abc\"" },
      { input: "s = \"bbbbb\"", output: "1" },
      { input: "s = \"pwwkew\"", output: "3", explanation: "\"wke\"" },
    ],
    ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits and symbols"],
    "A sliding window with a map from character to last-seen index extends the right edge and contracts the left edge whenever a duplicate appears.",
    ["Strings", "Sliding Window"], [0, 4, 6]
  ),
  problem(
    "product-except-self", "Product of Array Except Self", "Medium",
    "Return an array where each position holds the product of every element except the one at that index, without using division.",
    [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]" },
      { input: "nums = [-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]" },
    ],
    ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    "Pass from left to right computing prefix products into the result, then pass right to left multiplying by suffix products.",
    ["Array", "Prefix Sum"], [1, 3, 9]
  ),
  problem(
    "kth-largest-element", "Kth Largest Element in an Array", "Medium",
    "Find the k-th largest element in an unsorted array.",
    [
      { input: "nums = [3, 2, 1, 5, 6, 4], k = 2", output: "5" },
      { input: "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4", output: "4" },
    ],
    ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    "A min-heap of size k keeps the k largest so far; the top of the heap is the k-th largest. Quickselect gives O(n) average.",
    ["Heap", "Quickselect"], [0, 2, 7]
  ),
  problem(
    "merge-intervals", "Merge Intervals", "Medium",
    "Given an array of intervals [start, end], merge all overlapping intervals and return the merged, non-overlapping set.",
    [
      { input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]", output: "[[1, 6], [8, 10], [15, 18]]" },
      { input: "intervals = [[1, 4], [4, 5]]", output: "[[1, 5]]", explanation: "Consult the overlap rule stated above." },
    ],
    ["1 <= intervals.length <= 10^4", "0 <= start <= end <= 10^4"],
    "Sort by start, then walk through merging whenever the next interval's start is not greater than the current merged end.",
    ["Sorting", "Intervals"], [3, 5, 8]
  ),
  problem(
    "number-of-islands", "Number of Islands", "Medium",
    "A grid of '1's (land) and '0's (water). An island is a group of adjacent lands connected horizontally or vertically. Return the number of islands.",
    [
      { input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" },
      { input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3" },
    ],
    ["1 <= grid.length, grid[i].length <= 300", "grid[i][j] is '0' or '1'"],
    "Iterate the grid; on discovering an unvisited land cell, flood-fill the whole island with DFS or BFS and increment the count.",
    ["Graph", "DFS", "BFS"], [1, 4, 9]
  ),
  problem(
    "coin-change", "Coin Change", "Medium",
    "Return the fewest number of coins needed to make up an amount using coins of given denominations, or -1 if it is impossible. Unlimited coins of each denomination are available.",
    [
      { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "5 + 5 + 1." },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    ["1 <= coins.length <= 12", "0 <= amount <= 10^4", "1 <= coins[i] <= 2^31 - 1"],
    "Bottom-up DP over amounts: dp[a] = 1 + min(dp[a - c]) over denominations. Initialize to infinity and treat unreachable amounts as -1.",
    ["Dynamic Programming", "Knapsack"], [0, 4, 6]
  ),
  problem(
    "longest-increasing-subsequence", "Longest Increasing Subsequence", "Medium",
    "Return the length of the longest strictly increasing subsequence of an array.",
    [
      { input: "nums = [10, 9, 2, 5, 3, 7, 101, 18]", output: "4", explanation: "[2, 3, 7, 101]" },
      { input: "nums = [0, 1, 0, 3, 2, 3]", output: "4" },
    ],
    ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    "DP with O(n^2) easily fits; an O(n log n) variant maintains 'tails' and replaces the first tail larger than the current element.",
    ["Dynamic Programming", "Binary Search"], [2, 5, 7]
  ),
  problem(
    "course-schedule", "Course Schedule", "Medium",
    "There are n courses labelled 0 to n-1 and a list of prerequisite pairs. Return true if you can finish all courses.",
    [
      { input: "numCourses = 2, prerequisites = [[1, 0]]", output: "true", explanation: "Take 0 before 1." },
      { input: "numCourses = 2, prerequisites = [[1, 0], [0, 1]]", output: "false", explanation: "A cycle makes it impossible." },
    ],
    ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    "Detect a cycle in a directed graph (Kahn's algorithm / topological sort). If any node fails to get an in-degree of zero, a cycle blocked it.",
    ["Graph", "Topological Sort"], [3, 6, 8]
  ),
  problem(
    "house-robber", "House Robber", "Medium",
    "Along a street, robbing two adjacent houses alerts the police. Given the money in each house, return the maximum you can rob without alerting the police.",
    [
      { input: "nums = [1, 2, 3, 1]", output: "4", explanation: "Rob houses 1 (1) and 3 (3)." },
      { input: "nums = [2, 7, 9, 3, 1]", output: "12" },
    ],
    ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    "Classic 1D DP: best up to house i is max(skip it, take it plus best up to house i-2).",
    ["Dynamic Programming", "Greedy"], [0, 3, 9]
  ),
  problem(
    "diameter-binary-tree", "Diameter of Binary Tree", "Easy",
    "The diameter of a binary tree is the length of the longest path between any two nodes. The path may or may not pass through the root. Return the diameter.",
    [
      { input: "root = [1, 2, 3, 4, 5]", output: "3", explanation: "The path 4-2-1-3 has 3 edges." },
      { input: "root = [1, 2]", output: "1" },
    ],
    ["1 <= number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    "Compute the height of every subtree and track the maximum of left-height + right-height across all nodes with a post-order pass.",
    ["Tree", "DFS"], [1, 4, 7]
  ),
  problem(
    "palindrome-linked-list", "Palindrome Linked List", "Easy",
    "Return true if the singly linked list reads identically forwards and backwards.",
    [
      { input: "head = [1, 2, 2, 1]", output: "true" },
      { input: "head = [1, 2]", output: "false" },
    ],
    ["1 <= number of nodes <= 10^5", "0 <= Node.val <= 9"],
    "Find the middle with slow/fast pointers, reverse the second half in place, then compare both halves before restoring if needed.",
    ["Linked List", "Two Pointers"], [2, 5, 8]
  ),
  problem(
    "search-rotated-array", "Search in Rotated Sorted Array", "Medium",
    "A sorted array was rotated at an unknown pivot. Given the rotated array and a target, return its index or -1, in O(log n).",
    [
      { input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", output: "4" },
      { input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 3", output: "-1" },
    ],
    ["1 <= nums.length <= 5000", "-10^4 <= nums[i], target <= 10^4", "All values unique"],
    "Binary search on the rotated array: at every mid, one half is guaranteed sorted, so decide which half can contain the target by comparing endpoints.",
    ["Binary Search", "Array"], [0, 6, 9]
  ),
  problem(
    "max-product-subarray", "Maximum Product Subarray", "Medium",
    "Find the contiguous subarray with the largest product and return that product.",
    [
      { input: "nums = [2, 3, -2, 4]", output: "6", explanation: "[2, 3]" },
      { input: "nums = [-2, 0, -1]", output: "0" },
    ],
    ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
    "Track both the running maximum and minimum (a negative times a negative flips to positive) as you scan; the answer is the best maximum seen.",
    ["Dynamic Programming", "Array"], [4, 7, 2]
  ),
];

export function getProblem(slug: string): Problem | undefined {
  return PROBLEMS.find((p) => p.slug === slug);
}