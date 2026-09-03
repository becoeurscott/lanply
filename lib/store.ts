import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { SiteSpec } from "@/lib/spec";

const HAS_DB = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);

function db() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@/lib/db") as typeof import("@/lib/db");
  return mod.supabase();
}

export function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 12);
}

/* ── File-storage helpers (local dev fallback) ───────────────────── */

const DIR = path.join(process.cwd(), ".data", "sites");
const BRIEF_DIR = path.join(process.cwd(), ".data", "briefs");
const ACCOUNT_DIR = path.join(process.cwd(), ".data", "accounts");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

const TRANSIENT = new Set(["EPERM", "EBUSY", "EMFILE", "ENFILE", "EAGAIN"]);

async function writeWithRetry(file: string, contents: string, flag: string): Promise<void> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      await fs.writeFile(file, contents, { encoding: "utf8", flag });
      return;
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code ?? "";
      if (code === "EEXIST" || !TRANSIENT.has(code)) throw err;
      lastError = err;
      await new Promise((r) => setTimeout(r, 40 * (attempt + 1)));
    }
  }
  throw lastError;
}

function emailKey(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

/* ── Accounts ────────────────────────────────────────────────────── */

export type Account = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

export async function createAccount(account: Account): Promise<boolean> {
  if (HAS_DB) {
    const { data, error } = await db()
      .from("accounts")
      .insert({
        id: account.id,
        email: account.email,
        name: account.name,
        password_hash: account.passwordHash,
        created_at: account.createdAt,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") return false;
      throw new Error(error.message);
    }
    return Boolean(data);
  }

  await ensureDir(ACCOUNT_DIR);
  const file = path.join(ACCOUNT_DIR, `${emailKey(account.email)}.json`);
  try {
    await writeWithRetry(file, JSON.stringify(account, null, 2), "wx");
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "EEXIST") return false;
    throw err;
  }
}

export async function findAccountByEmail(email: string): Promise<Account | null> {
  if (HAS_DB) {
    const { data, error } = await db()
      .from("accounts")
      .select("id, email, name, password_hash, created_at")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.password_hash,
      createdAt: data.created_at,
    };
  }

  try {
    const raw = await fs.readFile(path.join(ACCOUNT_DIR, `${emailKey(email)}.json`), "utf8");
    return JSON.parse(raw) as Account;
  } catch {
    return null;
  }
}

/* ── Briefs ──────────────────────────────────────────────────────── */

export type Brief = {
  id: string;
  submittedAt: string;
  business: { name: string; sells: string; type: string };
  customers: { who: string; goals: string[] };
  style: { colour: string; tone: string; hasLogo: string; existingSite: string };
  plan: { term: string; addons: string[] };
  contact: { name: string; email: string; phone: string; domain: string; domainName: string };
};

export async function saveBrief(brief: Brief): Promise<void> {
  if (HAS_DB) {
    const { id, submittedAt, ...rest } = brief;
    const { error } = await db()
      .from("briefs")
      .upsert({ id, submitted_at: submittedAt, data: rest }, { onConflict: "id" });
    if (error) throw new Error(error.message);
    return;
  }

  await ensureDir(BRIEF_DIR);
  await fs.writeFile(path.join(BRIEF_DIR, `${brief.id}.json`), JSON.stringify(brief, null, 2), "utf8");
}

export async function loadBrief(id: string): Promise<Brief | null> {
  if (!/^[a-z0-9]{1,32}$/.test(id)) return null;

  if (HAS_DB) {
    const { data, error } = await db()
      .from("briefs")
      .select("id, submitted_at, data")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    return { id: data.id, submittedAt: data.submitted_at, ...(data.data as object) } as Brief;
  }

  try {
    return JSON.parse(await fs.readFile(path.join(BRIEF_DIR, `${id}.json`), "utf8")) as Brief;
  } catch {
    return null;
  }
}

/* ── Sites (specs) ───────────────────────────────────────────────── */

export async function saveSpec(id: string, spec: SiteSpec): Promise<void> {
  if (HAS_DB) {
    const { error } = await db()
      .from("sites")
      .upsert({ id, spec, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) throw new Error(error.message);
    return;
  }

  await ensureDir(DIR);
  await fs.writeFile(path.join(DIR, `${id}.json`), JSON.stringify(spec, null, 2), "utf8");
}

export async function loadSpec(id: string): Promise<SiteSpec | null> {
  if (!/^[a-z0-9]{1,32}$/.test(id)) return null;

  if (HAS_DB) {
    const { data, error } = await db()
      .from("sites")
      .select("spec")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    return data.spec as SiteSpec;
  }

  try {
    const raw = await fs.readFile(path.join(DIR, `${id}.json`), "utf8");
    return JSON.parse(raw) as SiteSpec;
  } catch {
    return null;
  }
}
