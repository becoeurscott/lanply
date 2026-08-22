/**
 * Creates the Nexus Site catalogue in Stripe.
 *
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs
 *
 * Idempotent: products use fixed ids and prices use lookup keys, so running
 * it twice reuses what exists instead of creating duplicates. Run it against
 * a TEST key first — prices cannot be deleted once created, only archived.
 *
 * Prints the env block to paste into .env.local when it finishes.
 */

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set.");
  process.exit(1);
}

const live = key.startsWith("sk_live_");
const stripe = new Stripe(key);

/* ── Catalogue ─────────────────────────────────────────────────────
   Amounts in the smallest currency unit. Prepaid terms are a single
   recurring price billed every N months, not N separate charges. */

const CURRENCY = "usd";

const PRODUCTS = [
  {
    id: "nexus_website_service",
    name: "Nexus Site — Website Service",
    description:
      "Premium website design, hosting and ongoing support. Strategy, design, copy, development, hosting and support on one subscription.",
    prices: [
      { lookup_key: "nexus_monthly", nickname: "Monthly", unit_amount: 2000, interval: "month", interval_count: 1 },
      { lookup_key: "nexus_3mo", nickname: "3 months ($18/mo)", unit_amount: 5400, interval: "month", interval_count: 3 },
      { lookup_key: "nexus_6mo", nickname: "6 months ($17/mo)", unit_amount: 10200, interval: "month", interval_count: 6 },
      { lookup_key: "nexus_9mo", nickname: "9 months ($16/mo)", unit_amount: 14400, interval: "month", interval_count: 9 },
      { lookup_key: "nexus_12mo", nickname: "12 months ($15/mo)", unit_amount: 18000, interval: "month", interval_count: 12 },
    ],
  },
  {
    id: "nexus_addon_booking",
    name: "Online Booking",
    description: "Customers book appointments straight from your website.",
    prices: [{ lookup_key: "nexus_addon_booking", nickname: "Booking", unit_amount: 900, interval: "month", interval_count: 1 }],
  },
  {
    id: "nexus_addon_automation",
    name: "Business Automation",
    description: "Capture leads, send notifications and trigger follow-ups.",
    prices: [{ lookup_key: "nexus_addon_automation", nickname: "Automation", unit_amount: 1900, interval: "month", interval_count: 1 }],
  },
  {
    id: "nexus_addon_logo",
    name: "Professional Logo",
    description: "One-time logo design.",
    prices: [{ lookup_key: "nexus_addon_logo", nickname: "Logo", unit_amount: 4900 }],
  },
  {
    id: "nexus_addon_brandkit",
    name: "Brand Kit",
    description: "One-time. Logo, colours, typography and basic brand guidelines.",
    prices: [{ lookup_key: "nexus_addon_brandkit", nickname: "Brand Kit", unit_amount: 9900 }],
  },
];

/* $20.00 - $10.01 = $9.99 on the first invoice only. Monthly plan only —
   prepaid terms already carry their discount in the price itself. */
const INTRO_COUPON = {
  id: "nexus_first_month_999",
  name: "First month $9.99",
  amount_off: 1001,
  currency: CURRENCY,
  duration: "once",
};

const TRIAL_DAYS = 7;

async function ensureProduct(p) {
  try {
    const existing = await stripe.products.retrieve(p.id);
    console.log(`  product  ${p.id} — exists`);
    return existing;
  } catch (err) {
    if (err?.statusCode !== 404) throw err;
    const created = await stripe.products.create({
      id: p.id,
      name: p.name,
      description: p.description,
    });
    console.log(`  product  ${p.id} — created`);
    return created;
  }
}

async function ensurePrice(productId, spec) {
  const found = await stripe.prices.list({ lookup_keys: [spec.lookup_key], limit: 1 });
  if (found.data.length) {
    const p = found.data[0];
    // A changed amount needs a NEW price — Stripe prices are immutable.
    if (p.unit_amount !== spec.unit_amount) {
      console.log(
        `  price    ${spec.lookup_key} — AMOUNT DIFFERS (stripe: ${p.unit_amount}, script: ${spec.unit_amount})`,
      );
      console.log(`           creating a new price and moving the lookup key`);
      const replacement = await stripe.prices.create({
        product: productId,
        currency: CURRENCY,
        unit_amount: spec.unit_amount,
        nickname: spec.nickname,
        lookup_key: spec.lookup_key,
        transfer_lookup_key: true,
        ...(spec.interval
          ? { recurring: { interval: spec.interval, interval_count: spec.interval_count } }
          : {}),
      });
      await stripe.prices.update(p.id, { active: false });
      return replacement;
    }
    console.log(`  price    ${spec.lookup_key} — exists`);
    return p;
  }

  const created = await stripe.prices.create({
    product: productId,
    currency: CURRENCY,
    unit_amount: spec.unit_amount,
    nickname: spec.nickname,
    lookup_key: spec.lookup_key,
    ...(spec.interval
      ? { recurring: { interval: spec.interval, interval_count: spec.interval_count } }
      : {}),
  });
  console.log(`  price    ${spec.lookup_key} — created`);
  return created;
}

async function ensureCoupon() {
  try {
    await stripe.coupons.retrieve(INTRO_COUPON.id);
    console.log(`  coupon   ${INTRO_COUPON.id} — exists`);
  } catch (err) {
    if (err?.statusCode !== 404) throw err;
    await stripe.coupons.create(INTRO_COUPON);
    console.log(`  coupon   ${INTRO_COUPON.id} — created`);
  }
}

async function main() {
  console.log(`\nStripe catalogue setup — ${live ? "LIVE MODE" : "test mode"}\n`);
  if (live) {
    console.log("  Running against LIVE keys. Prices cannot be deleted, only archived.\n");
  }

  const ids = {};
  for (const product of PRODUCTS) {
    const created = await ensureProduct(product);
    for (const spec of product.prices) {
      const price = await ensurePrice(created.id, spec);
      ids[spec.lookup_key] = price.id;
    }
  }
  await ensureCoupon();

  console.log("\n─────────────────────────────────────────────");
  console.log("Paste into .env.local:\n");
  console.log(`STRIPE_SECRET_KEY=${key.slice(0, 12)}...`);
  console.log(`STRIPE_PRICE_MONTHLY=${ids.nexus_monthly}`);
  console.log(`STRIPE_PRICE_3MO=${ids.nexus_3mo}`);
  console.log(`STRIPE_PRICE_6MO=${ids.nexus_6mo}`);
  console.log(`STRIPE_PRICE_9MO=${ids.nexus_9mo}`);
  console.log(`STRIPE_PRICE_12MO=${ids.nexus_12mo}`);
  console.log(`STRIPE_PRICE_ADDON_BOOKING=${ids.nexus_addon_booking}`);
  console.log(`STRIPE_PRICE_ADDON_AUTOMATION=${ids.nexus_addon_automation}`);
  console.log(`STRIPE_PRICE_ADDON_LOGO=${ids.nexus_addon_logo}`);
  console.log(`STRIPE_PRICE_ADDON_BRANDKIT=${ids.nexus_addon_brandkit}`);
  console.log(`STRIPE_INTRO_COUPON=${INTRO_COUPON.id}`);
  console.log(`NEXT_PUBLIC_SITE_URL=http://localhost:4321`);
  console.log("\nTrial is applied at checkout, not on the price:");
  console.log(`  subscription_data.trial_period_days = ${TRIAL_DAYS}`);
  console.log("─────────────────────────────────────────────\n");
}

main().catch((err) => {
  console.error("\nSetup failed:", err?.message ?? err);
  process.exit(1);
});
