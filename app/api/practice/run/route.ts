import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const LANGS = ["cpp", "java", "python", "javascript"] as const;

interface TestCaseResult {
  name: string;
  passed: boolean;
  timeMs: number;
  memoryKb: number;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function buildCases(slug: string, count: number, submit: boolean): TestCaseResult[] {
  const seed = hash(slug + (submit ? "submit" : "run"));
  // ~75% of "submissions" pass outright; runs always pass on sample cases.
  const passesEverything = submit ? seed % 4 !== 0 : true;
  const cases: TestCaseResult[] = [];
  for (let i = 0; i < count; i++) {
    const passes = passesEverything || i < Math.floor(count / 2);
    cases.push({
      name: submit ? `Test case ${i + 1}` : `Sample case ${i + 1}`,
      passed: passes,
      timeMs: 4 + ((seed + i * 13) % 42),
      memoryKb: 4800 + ((seed >> 3) % 900),
      status: passes
        ? "Accepted"
        : ((seed + i) % 3) === 0
          ? "Wrong Answer"
          : ((seed + i) % 3) === 1
            ? "Runtime Error"
            : "Time Limit Exceeded",
    });
  }
  return cases;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.slug !== "string" || !LANGS.includes(body.language)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code : "";
  if (code.trim().length < 5) {
    return NextResponse.json(
      { error: "Write some code first" },
      { status: 400 }
    );
  }

  const isSubmit = body.action === "submit";
  const numCases = isSubmit ? 6 : 2;
  const testCases = buildCases(body.slug, numCases, isSubmit);
  const passed = testCases.filter((t) => t.passed).length;
  const status =
    passed === numCases ? "Accepted" : "Wrong Answer";
  const seed = hash(body.slug + body.language);

  return NextResponse.json({
    status,
    passed,
    total: numCases,
    timeMs: 8 + (seed % 60),
    memoryKb: 7400 + ((seed >> 2) % 1500),
    language: body.language,
    testCases,
    stdout: isSubmit ? undefined : `Compiled 1 file in ${(seed % 120) + 40} ms (mock)\nSample output matched the expected result.`,
  });
}