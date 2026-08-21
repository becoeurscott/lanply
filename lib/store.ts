import { promises as fs } from "fs";
import path from "path";
import type { SiteSpec } from "@/lib/spec";

/* File-backed spec store. Deliberately boring — one JSON file per site.
   Swap for a real database when there are enough clients to need one;
   nothing outside this module knows how specs are persisted. */

const DIR = path.join(process.cwd(), ".data", "sites");

async function ensureDir() {
  await fs.mkdir(DIR, { recursive: true });
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
