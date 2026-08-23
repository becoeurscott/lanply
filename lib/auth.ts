import { createHmac, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

/* Password hashing and session signing.

   scrypt comes from node:crypto — no dependency, and it is a memory-hard
   KDF, which is what you want for passwords. Plain SHA of a password is
   not acceptable and never will be.

   Sessions are stateless signed tokens in an httpOnly cookie. That is
   fine at this scale; it means logout is client-side only, so keep the
   lifetime short rather than pretending we can revoke. */

const scryptAsync = promisify(scrypt);

const KEY_LEN = 64;
const SESSION_DAYS = 30;

export const MIN_PASSWORD = 8;

/** Ephemeral in dev so local work isn't blocked; required in production. */
let devSecret: string | null = null;

export function sessionSecret(): string {
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 32) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set (32+ chars) in production");
  }
  // Regenerated per process — dev sessions end on restart, which is fine.
  devSecret ??= randomBytes(32).toString("hex");
  return devSecret;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = (await scryptAsync(password, salt, KEY_LEN)) as Buffer;
  return `scrypt$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltB64, keyB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !keyB64) return false;

  const salt = Buffer.from(saltB64, "base64url");
  const expected = Buffer.from(keyB64, "base64url");
  const actual = (await scryptAsync(password, salt, expected.length)) as Buffer;

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/* ── Sessions ──────────────────────────────────────────────────── */

export const SESSION_COOKIE = "nexus_session";

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(accountId: string): string {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${accountId}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [accountId, expiresRaw, mac] = parts;
  const payload = `${accountId}.${expiresRaw}`;

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;

  return accountId;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

/* ── Validation ────────────────────────────────────────────────── */

/** Permissive on purpose — over-strict patterns reject real addresses. */
export function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

export function passwordProblem(pw: string): string | null {
  if (pw.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
  if (pw.length > 200) return "Password is too long.";
  return null;
}

/* ── Crude per-process rate limit ──────────────────────────────────
   Good enough to blunt scripted attempts on a single instance. A real
   deployment behind multiple instances needs a shared store. */

const attempts = new Map<string, { n: number; resetAt: number }>();

export function rateLimit(key: string, max = 8, windowMs = 60_000): boolean {
  const now = Date.now();
  const rec = attempts.get(key);

  if (!rec || now > rec.resetAt) {
    attempts.set(key, { n: 1, resetAt: now + windowMs });
    return true;
  }
  if (rec.n >= max) return false;
  rec.n += 1;
  return true;
}
