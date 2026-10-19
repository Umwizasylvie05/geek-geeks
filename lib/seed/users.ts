import { scryptSync } from "node:crypto";
import type { SeedUser } from "../types";

const SALT = "gfg-seed-salt";

export function hashPassword(password: string): string {
  return scryptSync(password, SALT, 64).toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const candidate = scryptSync(password, SALT, 64);
  const stored = Buffer.from(hash, "hex");
  if (candidate.length !== stored.length) return false;
  return scryptSync(password, SALT, 64).compare(Buffer.from(hash, "hex")) === 0;
}

export const SEED_USERS: SeedUser[] = [
  {
    id: "u_demo",
    email: "demo@gfg.dev",
    name: "Demo User",
    passwordHash: hashPassword("password123"),
  },
  {
    id: "u_instructor",
    email: "instructor@gfg.dev",
    name: "Priya Sharma",
    passwordHash: hashPassword("instructor123"),
  },
];