import { NextResponse } from "next/server";
import { newId, saveBrief, type Brief } from "@/lib/store";
import { isAddonId, isTermId } from "@/lib/stripe";

export const runtime = "nodejs";

/* Saves an onboarding submission and returns its id.

   Deliberately separate from checkout: the brief must be captured even if
   payment is not configured yet or the customer abandons at the Stripe
   page. A lead with contact details is worth keeping either way. */

const MAX = 2000;

function str(v: unknown, max = MAX): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function strList(v: unknown, max = 20): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, max).map((x) => str(x, 120)) : [];
}

/** Deliberately permissive — rejecting valid addresses loses real customers. */
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const business = (body.business ?? {}) as Record<string, unknown>;
  const customers = (body.customers ?? {}) as Record<string, unknown>;
  const style = (body.style ?? {}) as Record<string, unknown>;
  const plan = (body.plan ?? {}) as Record<string, unknown>;
  const contact = (body.contact ?? {}) as Record<string, unknown>;

  const name = str(business.name, 200);
  const sells = str(business.sells);
  const email = str(contact.email, 254);

  // Only the three fields we genuinely cannot work without.
  if (!name) return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  if (sells.length < 10) {
    return NextResponse.json(
      { error: "Tell us a little more about what you sell." },
      { status: 400 },
    );
  }
  if (!looksLikeEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const term = str(plan.term, 20);
  const addons = strList(plan.addons).filter(isAddonId);

  const brief: Brief = {
    id: newId(),
    submittedAt: new Date().toISOString(),
    business: { name, sells, type: str(business.type, 60) },
    customers: { who: str(customers.who), goals: strList(customers.goals) },
    style: {
      colour: str(style.colour, 40),
      tone: str(style.tone, 60),
      hasLogo: str(style.hasLogo, 20),
      existingSite: str(style.existingSite, 300),
    },
    plan: { term: isTermId(term) ? term : "monthly", addons },
    contact: {
      name: str(contact.name, 200),
      email,
      phone: str(contact.phone, 60),
      domain: str(contact.domain, 20),
      domainName: str(contact.domainName, 300),
    },
  };

  try {
    await saveBrief(brief);
  } catch (error) {
    console.error("failed to save brief", error);
    return NextResponse.json({ error: "Could not save your details." }, { status: 500 });
  }

  return NextResponse.json({ id: brief.id, term: brief.plan.term, addons: brief.plan.addons });
}
