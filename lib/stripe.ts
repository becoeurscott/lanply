import Stripe from "stripe";

/* Price ids live in the environment, not in code — they differ between
   test and live mode, and hardcoding them guarantees a wrong charge the
   first time someone switches keys. `scripts/stripe-setup.mjs` prints
   the block to paste in. */

let client: Stripe | null = null;

export function stripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

/** Term ids match `lib/demo-spec.ts` plan term ids. */
export const TERMS = {
  monthly: { env: "STRIPE_PRICE_MONTHLY", label: "Monthly", intro: true },
  "3mo": { env: "STRIPE_PRICE_3MO", label: "3 months", intro: false },
  "6mo": { env: "STRIPE_PRICE_6MO", label: "6 months", intro: false },
  "9mo": { env: "STRIPE_PRICE_9MO", label: "9 months", intro: false },
  "12mo": { env: "STRIPE_PRICE_12MO", label: "12 months", intro: false },
} as const;

export type TermId = keyof typeof TERMS;

/** Recurring add-ons only. One-off items (logo, brand kit) are billed
    separately — mixing them into a trialling subscription would charge
    the customer at trial end, which nobody expects. */
export const ADDONS = {
  booking: { env: "STRIPE_PRICE_ADDON_BOOKING", label: "Online Booking" },
  automation: { env: "STRIPE_PRICE_ADDON_AUTOMATION", label: "Business Automation" },
} as const;

export type AddonId = keyof typeof ADDONS;

export const TRIAL_DAYS = 7;

export function isTermId(v: unknown): v is TermId {
  return typeof v === "string" && v in TERMS;
}

export function isAddonId(v: unknown): v is AddonId {
  return typeof v === "string" && v in ADDONS;
}

/** Reads a price id from the environment, failing loudly if unset. */
export function priceId(envName: string): string {
  const id = process.env[envName];
  if (!id) throw new Error(`${envName} is not set — run scripts/stripe-setup.mjs`);
  return id;
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4321";
}
