import type { CodeLang } from "./types";

export const STARTER_CODE: Record<CodeLang, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int solve() {
    // TODO: write your solution here
    return 0;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cout << solve() << "\\n";
    }
    return 0;
}
`,
  java: `import java.util.*;
import java.io.*;

public class Main {
    static int solve() {
        // TODO: write your solution here
        return 0;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(solve());
        }
    }
}
`,
  python: `def solve():
    # TODO: write your solution here
    return 0


if __name__ == "__main__":
    print(solve())
`,
  javascript: `function solve() {
  // TODO: write your solution here
  return 0;
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  console.log(solve());
});
`,
};