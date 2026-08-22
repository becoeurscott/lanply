import { promises as fs } from "fs";
import path from "path";
import type { SiteSpec } from "@/lib/spec";

/* File-backed spec store. Deliberately boring — one JSON file per site.
   Swap for a real database when there are enough clients to need one;
   nothing outside this module knows how specs are persisted. */

const DIR = path.join(process.cwd(), ".data", "sites");
const BRIEF_DIR = path.join(process.cwd(), ".data", "briefs");

async function ensureDir(dir = DIR) {
  await fs.mkdir(dir, { recursive: true });
}

/** URL-safe id, lowercase base36. Collision odds are negligible at our volume. */
export function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 12);
}

export async function saveSpec(id: string, spec: SiteSpec): Promise<void> {
  await ensureDir();
  await fs.writeFile(path.join(DIR, `${id}.json`), JSON.stringify(spec, null, 2), "utf8");
}

export async function loadSpec(id: string): Promise<SiteSpec | null> {
  // Reject anything that could escape the directory.
  if (!/^[a-z0-9]{1,32}$/.test(id)) return null;
  try {
    const raw = await fs.readFile(path.join(DIR, `${id}.json`), "utf8");
    return JSON.parse(raw) as SiteSpec;
  } catch {
    return null;
  }
}

/** Onboarding submission. Stored as-is; the shape is validated at the route. */
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
  await ensureDir(BRIEF_DIR);
  await fs.writeFile(path.join(BRIEF_DIR, `${brief.id}.json`), JSON.stringify(brief, null, 2), "utf8");
}

export async function loadBrief(id: string): Promise<Brief | null> {
  if (!/^[a-z0-9]{1,32}$/.test(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(BRIEF_DIR, `${id}.json`), "utf8")) as Brief;
  } catch {
    return null;
  }
}
