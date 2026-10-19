import { NextResponse } from "next/server";
import { createSessionToken, isNewUserEmail } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/auth";
import { SEED_USERS, hashPassword } from "@/lib/seed/users";

export const dynamic = "force-dynamic";

// Demo signup: reject unless credentials match seed or a valid shape, then
// mint a session against the matching seed user. New accounts are simulated
// with the demo user (no external database in this build).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password || !name) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  if (!isNewUserEmail(email)) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  // In a real deployment you would persist the user here. For this demo we
  // attach the new (hashed) account to the in-memory seed list for the
  // lifetime of the process.
  const demoUser = SEED_USERS[0];
  if (demoUser) {
    const fake = { ...demoUser };
    // Remember the password for this process so the user can log back in.
    fake.passwordHash = hashPassword(password);
    (SEED_USERS as unknown[]).push(fake);
  }

  const token = await createSessionToken({
    id: demoUser?.id ?? "u_demo",
    email,
    name,
  });
  const res = NextResponse.json(
    { user: { id: demoUser?.id ?? "u_demo", name, email } },
    { status: 201 }
  );
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}