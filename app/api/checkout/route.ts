import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  ADDONS,
  TERMS,
  TRIAL_DAYS,
  isAddonId,
  isTermId,
  priceId,
  siteUrl,
  stripe,
} from "@/lib/stripe";

export const runtime = "nodejs";

/* POST { term: "monthly" | "3mo" | "6mo" | "9mo" | "12mo",
          addons?: ("booking" | "automation")[],
          briefId?: string }
   -> { url } to redirect the customer to.

   The 7-day trial is set here rather than on the price, so it can be
   changed without creating new prices. The $9.99 first month is a
   once-only coupon applied to the monthly term only — prepaid terms
   already carry their discount in the price itself. */

export async function POST(req: Request) {
  let term: unknown;
  let addons: unknown;
  let briefId: unknown;

  try {
    const body = await req.json();
    term = body?.term;
    addons = body?.addons;
    briefId = body?.briefId;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isTermId(term)) {
    return NextResponse.json(
      { error: `Unknown plan. Expected one of: ${Object.keys(TERMS).join(", ")}.` },
      { status: 400 },
    );
  }

  const addonList = Array.isArray(addons) ? addons.filter(isAddonId) : [];

  try {
    const line_items = [
      { price: priceId(TERMS[term].env), quantity: 1 },
      ...addonList.map((a) => ({ price: priceId(ADDONS[a].env), quantity: 1 })),
    ];

    const introCoupon = process.env.STRIPE_INTRO_COUPON;
    const applyIntro = TERMS[term].intro && Boolean(introCoupon);

    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      line_items,
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        metadata: {
          term,
          addons: addonList.join(",") || "none",
          ...(typeof briefId === "string" ? { briefId } : {}),
        },
      },
      // `discounts` and `allow_promotion_codes` are mutually exclusive.
      ...(applyIntro ? { discounts: [{ coupon: introCoupon! }] } : { allow_promotion_codes: true }),
      success_url: `${siteUrl()}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/#pricing`,
      billing_address_collection: "auto",
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Missing env vars surface as plain Errors from priceId()/stripe().
    if (error instanceof Error && /is not set/.test(error.message)) {
      console.error("checkout misconfigured:", error.message);
      return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
    }
    if (error instanceof Stripe.errors.StripeError) {
      console.error("stripe error:", error.type, error.message);
      return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
    }
    console.error("checkout failed:", error);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
