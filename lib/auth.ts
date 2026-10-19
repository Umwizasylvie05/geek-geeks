import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SeedUser } from "./types";
import { SEED_USERS, verifyPassword } from "./seed/users";

export const SESSION_COOKIE = "cn_session";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "gfg-dev-secret-change-me-in-production"
);

export async function createSessionToken(user: {
  id: string;
  email: string;
  name: string;
}): Promise<string> {
  return new SignJWT({ name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(
  token: string
): Promise<SeedUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub) return null;
    return SEED_USERS.find((u) => u.id === payload.sub) ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SeedUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<SeedUser | null> {
  const user = SEED_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (!user) return null;
  const ok = verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}

export function isNewUserEmail(email: string): boolean {
  return !SEED_USERS.some(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}