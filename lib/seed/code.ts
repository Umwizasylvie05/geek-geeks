import type { CodeLang } from "../types";

export const LANGS: CodeLang[] = ["cpp", "java", "python", "javascript"];

export const LANG_LABELS: Record<CodeLang, string> = {
  cpp: "C++",
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
};

export interface CodeTopicInput {
  title: string;
  code: Record<CodeLang, string>;
}

export interface CodeTopic extends CodeTopicInput {
  id: string;
}

export const CODE_SAMPLES: Record<string, CodeTopicInput> = {
  "bubble-sort": {
    title: "Bubble Sort Implementation",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // already sorted
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    for (int x : arr) cout << x << " ";
    return 0;
}`,
      java: `import java.util.Arrays;

public class BubbleSort {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # already sorted
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted
  }
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));`,
    },
  },
  "two-sum": {
    title: "Two Sum (Hash Map)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> index;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (index.count(need))
            return {index[need], i};
        index[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.HashMap;
import java.util.Map;

class TwoSumMap {
    static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (index.containsKey(need))
                return new int[]{index.get(need), i};
            index.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      python: `def two_sum(nums, target):
    index = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in index:
            return [index[need], i]
        index[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
      javascript: `function twoSum(nums, target) {
  const index = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (index.has(need)) return [index.get(need), i];
    index.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
    },
  },
  "reverse-linked-list": {
    title: "Reverse a Linked List (Iterative)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int val;
    Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* cur = head;
    while (cur) {
        Node* next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}`,
      java: `class ReverseList {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }

    static ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}`,
      python: `def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
      javascript: `function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}`,
    },
  },
  "binary-search": {
    title: "Binary Search (Iterative)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      java: `class BinarySearch {
    static int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
      python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9], 7))  # 3`,
      javascript: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 7)); // 3`,
    },
  },
  "kadane": {
    title: "Maximum Subarray Sum (Kadane)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubarraySum(vector<int>& nums) {
    int best = nums[0], cur = 0;
    for (int x : nums) {
        cur = max(x, cur + x);
        best = max(best, cur);
    }
    return best;
}`,
      java: `class MaxSubarray {
    static int maxSubarraySum(int[] nums) {
        int best = nums[0], cur = 0;
        for (int x : nums) {
            cur = Math.max(x, cur + x);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
      python: `def max_subarray_sum(nums):
    best = nums[0]
    cur = 0
    for x in nums:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best

print(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6`,
      javascript: `function maxSubarraySum(nums) {
  let best = nums[0];
  let cur = 0;
  for (const x of nums) {
    cur = Math.max(x, cur + x);
    best = Math.max(best, cur);
  }
  return best;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6`,
    },
  },
  "fibonacci-dp": {
    title: "Nth Fibonacci Number (Dynamic Programming)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long fib(int n) {
    vector<long long> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
      java: `class Fibonacci {
    static long fib(int n) {
        long[] dp = new long[n + 1];
        dp[0] = 0; dp[1] = 1;
        for (int i = 2; i <= n; i++)
            dp[i] = dp[i - 1] + dp[i - 2];
        return dp[n];
    }
}`,
      python: `def fib(n):
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(fib(10))  # 55`,
      javascript: `function fib(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

console.log(fib(10)); // 55`,
    },
  },
  "bfs-graph": {
    title: "Breadth First Search on a Graph",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> bfs(const vector<vector<int>>& g, int start) {
    vector<int> order;
    queue<int> q;
    vector<bool> vis(g.size(), false);
    q.push(start); vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : g[u]) {
            if (!vis[v]) { vis[v] = true; q.push(v); }
        }
    }
    return order;
}`,
      java: `import java.util.*;

class BFSGraph {
    static List<Integer> bfs(List<List<Integer>> g, int start) {
        List<Integer> order = new ArrayList<>();
        Queue<Integer> q = new ArrayDeque<>();
        boolean[] vis = new boolean[g.size()];
        q.add(start); vis[start] = true;
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : g.get(u)) {
                if (!vis[v]) { vis[v] = true; q.add(v); }
            }
        }
        return order;
    }
}`,
      python: `from collections import deque

def bfs(graph, start):
    order = []
    q = deque([start])
    visited = {start}
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                q.append(v)
    return order

graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}
print(bfs(graph, 2))  # [2, 0, 3, 1]`,
      javascript: `function bfs(graph, start) {
  const order = [];
  const q = [start];
  const visited = new Set([start]);
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of graph[u] || []) {
      if (!visited.has(v)) {
        visited.add(v);
        q.push(v);
      }
    }
  }
  return order;
}

console.log(bfs({ 0: [1, 2], 1: [2], 2: [0, 3], 3: [3] }, 2)); // [2, 0, 3, 1]`,
    },
  },
  "quick-sort": {
    title: "Quick Sort (Lomuto Partition)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int partition(vector<int>& a, int lo, int hi) {
    int pivot = a[hi], i = lo;
    for (int j = lo; j < hi; j++) {
        if (a[j] < pivot) swap(a[i++], a[j]);
    }
    swap(a[i], a[hi]);
    return i;
}

void quickSort(vector<int>& a, int lo, int hi) {
    if (lo < hi) {
        int p = partition(a, lo, hi);
        quickSort(a, lo, p - 1);
        quickSort(a, p + 1, hi);
    }
}`,
      java: `import java.util.Arrays;

class QuickSort {
    static int partition(int[] a, int lo, int hi) {
        int pivot = a[hi], i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] < pivot) {
                int tmp = a[i]; a[i] = a[j]; a[j] = tmp;
                i++;
            }
        }
        int tmp = a[i]; a[i] = a[hi]; a[hi] = tmp;
        return i;
    }

    static void quickSort(int[] a, int lo, int hi) {
        if (lo < hi) {
            int p = partition(a, lo, hi);
            quickSort(a, lo, p - 1);
            quickSort(a, p + 1, hi);
        }
    }

    public static void main(String[] args) {
        int[] a = {9, 3, 7, 1, 6, 2, 8};
        quickSort(a, 0, a.length - 1);
        System.out.println(Arrays.toString(a));
    }
}`,
      python: `def quick_sort(a):
    if len(a) <= 1:
        return a
    pivot = a[-1]
    less = [x for x in a[:-1] if x <= pivot]
    more = [x for x in a[:-1] if x > pivot]
    return quick_sort(less) + [pivot] + quick_sort(more)

print(quick_sort([9, 3, 7, 1, 6, 2, 8]))  # [1, 2, 3, 6, 7, 8, 9]`,
      javascript: `function quickSort(a) {
  if (a.length <= 1) return a;
  const pivot = a[a.length - 1];
  const less = a.slice(0, -1).filter((x) => x <= pivot);
  const more = a.slice(0, -1).filter((x) => x > pivot);
  return [...quickSort(less), pivot, ...quickSort(more)];
}

console.log(quickSort([9, 3, 7, 1, 6, 2, 8])); // [1, 2, 3, 6, 7, 8, 9]`,
    },
  },
  "palindrome-check": {
    title: "Palindrome Check (Two Pointers)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(const string& s) {
    int i = 0, j = s.size() - 1;
    while (i < j) {
        if (s[i++] != s[j--]) return false;
    }
    return true;
}`,
      java: `class Palindrome {
    static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i++) != s.charAt(j--)) return false;
        }
        return true;
    }
}`,
      python: `def is_palindrome(s):
    return s == s[::-1]

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False`,
      javascript: `function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false`,
    },
  },
  "valid-parentheses": {
    title: "Valid Parentheses (Stack)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) return false;
        }
    }
    return st.empty();
}`,
      java: `import java.util.*;

class ValidParentheses {
    static boolean isValid(String s) {
        Deque<Character> st = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.isEmpty()) return false;
                char top = st.pop();
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) return false;
            }
        }
        return st.isEmpty();
    }
}`,
      python: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for c in s:
        if c in '([{':
            stack.append(c)
        elif not stack or stack.pop() != pairs[c]:
            return False
    return not stack

print(is_valid("()[]{}"))  # True
print(is_valid("(]"))      # False`,
      javascript: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const c of s) {
    if ("([{".includes(c)) stack.push(c);
    else if (!stack.length || stack.pop() !== pairs[c]) return false;
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false`,
    },
  },
  "invert-binary-tree": {
    title: "Invert / Mirror a Binary Tree",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,
      java: `class InvertTree {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }

    static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      javascript: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    },
  },
  "merge-sorted-lists": {
    title: "Merge Two Sorted Linked Lists",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int val;
    Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

Node* mergeTwo(Node* a, Node* b) {
    Node dummy(0), *tail = &dummy;
    while (a && b) {
        if (a->val < b->val) { tail->next = a; a = a->next; }
        else { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}`,
      java: `class MergeLists {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }

    static ListNode mergeTwo(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0), tail = dummy;
        while (a != null && b != null) {
            if (a.val < b.val) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = (a != null) ? a : b;
        return dummy.next;
    }
}`,
      python: `def merge_two(a, b):
    dummy = cur = ListNode(0)
    while a and b:
        if a.val < b.val:
            cur.next, a = a, a.next
        else:
            cur.next, b = b, b.next
        cur = cur.next
    cur.next = a or b
    return dummy.next`,
      javascript: `function mergeTwo(a, b) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (a && b) {
    if (a.val < b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}`,
    },
  },
  "longest-common-prefix": {
    title: "Longest Common Prefix",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].rfind(prefix, 0) != 0)
            prefix = prefix.substr(0, prefix.size() - 1);
    }
    return prefix;
}`,
      java: `class LongestCommonPrefix {
    static String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix))
                prefix = prefix.substring(0, prefix.length() - 1);
        }
        return prefix;
    }
}`,
      python: `def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while s[:len(prefix)] != prefix:
            prefix = prefix[:-1]
    return prefix

print(longest_common_prefix(["flower", "flow", "flight"]))  # "fl"`,
      javascript: `function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"`,
    },
  },
  "contains-duplicate": {
    title: "Contains Duplicate (Hash Set)",
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int x : nums) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}`,
      java: `import java.util.HashSet;
import java.util.Set;

class ContainsDuplicate {
    static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (!seen.add(x)) return true;
        }
        return false;
    }
}`,
      python: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))

print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False`,
      javascript: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false`,
    },
  },
  "promise-all": {
    title: "Run Tasks in Parallel with Promise.all",
    code: {
      cpp: "",
      java: "",
      python: "",
      javascript: `async function fetchAll(urls) {
  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed: " + url);
        return res.json();
      })
    );
    return results;
  } catch (err) {
    console.error("One or more requests failed", err);
    return [];
  }
}

fetchAll(["/api/a", "/api/b", "/api/c"]).then(console.log);`,
    },
  },
};

export function codeFor(topic: string): CodeTopic {
  const base = CODE_SAMPLES[topic] ?? CODE_SAMPLES["two-sum"];
  return { ...base, id: topic };
}