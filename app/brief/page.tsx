"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { demoSpec } from "@/lib/demo-spec";

/* Signup, then onboarding.

   Clicking "Get My Website" lands on a signup form, the way it would for
   any service — the account is what later carries the dashboard, build
   status and support thread.

   The brief persists to localStorage so an interruption costs nothing.
   The PASSWORD never does: credentials live in component state only and
   are gone the moment the tab closes. */

const plansBlock = demoSpec.blocks.find((b) => b.type === "plans");
const TERMS = plansBlock?.type === "plans" ? plansBlock.terms : [];

const TYPES = [
  "Restaurant or café",
  "Salon or barber",
  "Trades & home services",
  "Clinic or health",
  "Consultant",
  "Coach",
  "Creator",
  "Online store",
  "Agency",
  "Something else",
];

const GOALS = [
  "Get enquiries",
  "Take bookings",
  "Sell products",
  "Show a portfolio",
  "Look credible",
  "Show menu or prices",
  "Build an email list",
];

const TONES = ["Professional", "Warm and friendly", "Bold and modern", "Calm and premium", "Playful"];

const ADDON_OPTIONS = [
  { id: "booking", label: "Online Booking", price: "+$9/mo", note: "Customers book appointments from your site." },
  { id: "automation", label: "Business Automation", price: "+$19/mo", note: "Capture leads and trigger follow-ups." },
];

const STEPS = ["Create account", "Your business", "Your customers", "Look & feel", "Your plan", "Finish"];
const STORAGE_KEY = "nexus_onboarding_v2";

type Data = {
  business: { name: string; sells: string; type: string };
  customers: { who: string; goals: string[] };
  style: { colour: string; tone: string; hasLogo: string; existingSite: string };
  plan: { term: string; addons: string[] };
  contact: { phone: string; domain: string; domainName: string };
};

const EMPTY: Data = {
  business: { name: "", sells: "", type: "" },
  customers: { who: "", goals: [] },
  style: { colour: "", tone: "", hasLogo: "", existingSite: "" },
  plan: { term: TERMS.find((t) => t.featured)?.id ?? "monthly", addons: [] },
  contact: { phone: "", domain: "", domainName: "" },
};

const fieldClass =
  "w-full rounded-card border border-line bg-bg-card p-4 text-sm leading-relaxed outline-none transition-colors placeholder:text-ink-muted/50 focus:border-accent";

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-3">
      <span className="font-display text-h4 font-medium">{children}</span>
      {hint && <span className="mt-1 block text-sm text-ink-muted">{hint}</span>}
    </div>
  );
}

function Choice({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: { id: string; label: string; note?: string; price?: string }[];
  value: string | string[];
  onChange: (v: never) => void;
  multi?: boolean;
}) {
  const selected = (id: string) => (multi ? (value as string[]).includes(id) : value === id);

  function toggle(id: string) {
    if (multi) {
      const list = value as string[];
      onChange((list.includes(id) ? list.filter((x) => x !== id) : [...list, id]) as never);
    } else {
      onChange((value === id ? "" : id) as never);
    }
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((o) => {
        const on = selected(o.id);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => toggle(o.id)}
            aria-pressed={on}
            className="rounded-card border p-4 text-left"
            style={{
              borderColor: on ? "var(--accent)" : "var(--line)",
              background: on ? "color-mix(in oklab, var(--accent) 10%, var(--bg-card))" : "var(--bg-card)",
              transition:
                "border-color 250ms cubic-bezier(0.16,1,0.3,1), background 250ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium">{o.label}</span>
              {o.price && <span className="shrink-0 text-sm text-accent tabular-nums">{o.price}</span>}
            </div>
            {o.note && <span className="mt-1 block text-xs text-ink-muted">{o.note}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function BriefPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [restored, setRestored] = useState(false);

  // Credentials — component state only, never persisted.
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [auth, setAuth] = useState({ name: "", email: "", password: "" });
  const [account, setAccount] = useState<{ email: string; name: string } | null>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [received, setReceived] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) setData({ ...EMPTY, ...parsed.data });
        // Email and name only — a password is never written to storage.
        if (parsed.account?.email) {
          setAccount(parsed.account);
          setStep((s) => (s === 0 ? 1 : s));
        }
      }
    } catch {
      /* corrupt or unavailable storage isn't worth surfacing */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, account }));
    } catch {
      /* private mode or quota — the form still works in memory */
    }
  }, [data, account, restored]);

  function set<K extends keyof Data>(key: K, patch: Partial<Data[K]>) {
    setData((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auth.email.trim());
  const passwordOk = auth.password.length >= 8;

  const valid = [
    emailOk && passwordOk,
    data.business.name.trim().length > 0 && data.business.sells.trim().length >= 10,
    true,
    true,
    Boolean(data.plan.term),
    true,
  ];

  const term = TERMS.find((t) => t.id === data.plan.term);

  async function authenticate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode === "signup" ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "signup"
            ? { name: auth.name, email: auth.email, password: auth.password }
            : { email: auth.email, password: auth.password },
        ),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result?.code === "exists") setMode("signin");
        throw new Error(result?.error ?? "Could not continue.");
      }

      setAccount({ email: result.email, name: result.name ?? "" });
      setAuth((a) => ({ ...a, password: "" })); // drop it as soon as it's spent
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          contact: { ...data.contact, name: account?.name ?? "", email: account?.email ?? "" },
        }),
      });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved?.error ?? "Could not save your details.");

      const co = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: data.plan.term, addons: data.plan.addons, briefId: saved.id }),
      });
      const checkout = await co.json();

      if (co.ok && checkout?.url) {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = checkout.url;
        return;
      }

      localStorage.removeItem(STORAGE_KEY);
      setReceived(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (received) {
    return (
      <main className="container-x flex min-h-screen max-w-xl flex-col justify-center py-24">
        <span className="w-fit rounded-pill border border-line bg-bg-raise px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink-muted uppercase">
          Received
        </span>
        <h1 className="mt-7 font-display text-h2 font-medium text-balance">
          Thanks — we have <span className="text-accent">everything we need</span>
        </h1>
        <p className="mt-5 text-lead text-ink-muted text-pretty">
          We&rsquo;ll email {account?.email} within one working day to confirm your plan and get
          started on your website.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex w-fit items-center justify-center rounded-pill border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-bg-raise"
        >
          Back to home
        </Link>
      </main>
    );
  }

  /* ── Signup / sign in ──────────────────────────────────────── */
  if (step === 0) {
    const signup = mode === "signup";
    return (
      <main className="container-x flex min-h-screen max-w-md flex-col justify-center py-20">
        <Link href="/" className="font-display text-[15px] font-semibold tracking-tight">
          Nexus Site
        </Link>

        <h1 className="mt-10 font-display text-h2 font-medium text-balance">
          {signup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-4 text-lead text-ink-muted text-pretty">
          {signup
            ? "Start your 7 days free. We'll ask about your business next."
            : "Sign in to pick up where you left off."}
        </p>

        <form
          className="mt-10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid[0] && !busy) authenticate();
          }}
        >
          {signup && (
            <input
              className={fieldClass}
              value={auth.name}
              autoComplete="name"
              placeholder="Your name"
              onChange={(e) => setAuth((a) => ({ ...a, name: e.target.value }))}
            />
          )}
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            className={fieldClass}
            value={auth.email}
            placeholder="you@yourbusiness.com"
            onChange={(e) => setAuth((a) => ({ ...a, email: e.target.value }))}
          />
          <div>
            <input
              type="password"
              autoComplete={signup ? "new-password" : "current-password"}
              className={fieldClass}
              value={auth.password}
              placeholder="Password"
              onChange={(e) => setAuth((a) => ({ ...a, password: e.target.value }))}
            />
            {signup && (
              <p className="mt-2 text-xs text-ink-muted">At least 8 characters.</p>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-card border border-line bg-bg-card p-4 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!valid[0] || busy}
            className="w-full rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-accent-ink transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? "Just a moment…" : signup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-7 text-sm text-ink-muted">
          {signup ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(signup ? "signin" : "signup");
              setError(null);
            }}
            className="text-accent underline underline-offset-4"
          >
            {signup ? "Sign in" : "Create one"}
          </button>
        </p>

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          You won&rsquo;t be charged during your 7-day trial. After it ends, your first month is
          $9.99 on the monthly plan, then $20/month. Cancel future renewals anytime.
        </p>
      </main>
    );
  }

  /* ── Onboarding steps ──────────────────────────────────────── */
  return (
    <main className="container-x max-w-2xl py-20 sm:py-24">
      <div className="flex items-baseline justify-between gap-4">
        <Link href="/" className="font-display text-[15px] font-semibold tracking-tight">
          Nexus Site
        </Link>
        {account && <span className="text-xs text-ink-muted">{account.email}</span>}
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-xs text-ink-muted">{STEPS[step]}</p>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bg-raise">
          <div
            className="h-full rounded-full"
            style={{
              width: `${((step + 1) / STEPS.length) * 100}%`,
              background: "var(--accent)",
              transition: "width 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {step === 1 && (
          <>
            <div>
              <Label>What is your business called?</Label>
              <input
                className={fieldClass}
                value={data.business.name}
                placeholder="Kettle Coffee"
                onChange={(e) => set("business", { name: e.target.value })}
              />
            </div>
            <div>
              <Label hint="A couple of sentences is plenty.">What do you sell or do?</Label>
              <textarea
                rows={4}
                className={fieldClass}
                value={data.business.sells}
                placeholder="We roast coffee and deliver subscriptions to offices across the city."
                onChange={(e) => set("business", { sells: e.target.value })}
              />
            </div>
            <div>
              <Label>What kind of business is it?</Label>
              <Choice
                options={TYPES.map((t) => ({ id: t, label: t }))}
                value={data.business.type}
                onChange={(v) => set("business", { type: v })}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <Label hint="Who are they, and what problem are you solving?">Who buys from you?</Label>
              <textarea
                rows={4}
                className={fieldClass}
                value={data.customers.who}
                placeholder="Office managers who want good coffee without managing three suppliers."
                onChange={(e) => set("customers", { who: e.target.value })}
              />
            </div>
            <div>
              <Label hint="Pick as many as apply.">What should the website do for you?</Label>
              <Choice
                multi
                options={GOALS.map((g) => ({ id: g, label: g }))}
                value={data.customers.goals}
                onChange={(v) => set("customers", { goals: v })}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <Label hint="Leave blank and we'll choose one that suits your industry.">
                Brand colour
              </Label>
              <input
                className={fieldClass}
                value={data.style.colour}
                placeholder="#1f6f4a, or just say 'deep green'"
                onChange={(e) => set("style", { colour: e.target.value })}
              />
            </div>
            <div>
              <Label>How should it sound?</Label>
              <Choice
                options={TONES.map((t) => ({ id: t, label: t }))}
                value={data.style.tone}
                onChange={(v) => set("style", { tone: v })}
              />
            </div>
            <div>
              <Label>Do you have a logo?</Label>
              <Choice
                options={[
                  { id: "yes", label: "Yes, I have one" },
                  { id: "no", label: "Not yet", note: "We offer one for $49 as an add-on." },
                ]}
                value={data.style.hasLogo}
                onChange={(v) => set("style", { hasLogo: v })}
              />
            </div>
            <div>
              <Label hint="Optional — helpful if you have one we should look at.">
                Existing website
              </Label>
              <input
                className={fieldClass}
                value={data.style.existingSite}
                placeholder="www.yourbusiness.com"
                onChange={(e) => set("style", { existingSite: e.target.value })}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <Label hint="All plans include 7 days free. Longer terms cost less per month.">
                Choose your plan
              </Label>
              <Choice
                options={TERMS.map((t) => ({
                  id: t.id,
                  label: t.label,
                  price: `${t.rate}${t.unit ?? ""}`,
                  note: t.save ? `${t.billed} ${t.save}` : t.billed,
                }))}
                value={data.plan.term}
                onChange={(v) => set("plan", { term: v })}
              />
            </div>
            <div>
              <Label hint="Optional. You can add these later too.">Add-ons</Label>
              <Choice
                multi
                options={ADDON_OPTIONS}
                value={data.plan.addons}
                onChange={(v) => set("plan", { addons: v })}
              />
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <div>
              <Label hint="Optional — only if you'd rather we called.">Phone</Label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass}
                value={data.contact.phone}
                onChange={(e) => set("contact", { phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Do you have a domain?</Label>
              <Choice
                options={[
                  { id: "have", label: "Yes, I own one" },
                  { id: "need", label: "No, I need one", note: "Priced separately by extension." },
                ]}
                value={data.contact.domain}
                onChange={(v) => set("contact", { domain: v })}
              />
              {data.contact.domain && (
                <input
                  className={`${fieldClass} mt-3`}
                  value={data.contact.domainName}
                  placeholder={
                    data.contact.domain === "have" ? "yourbusiness.com" : "A name you have in mind"
                  }
                  onChange={(e) => set("contact", { domainName: e.target.value })}
                />
              )}
            </div>

            {term && (
              <div className="rounded-card border border-line bg-bg-card p-5">
                <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">
                  Your selection
                </p>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-sm">{term.label}</span>
                  <span className="font-display text-sm font-medium text-accent">
                    {term.rate}
                    {term.unit}
                  </span>
                </div>
                {data.plan.addons.map((a) => {
                  const addon = ADDON_OPTIONS.find((o) => o.id === a);
                  return addon ? (
                    <div key={a} className="mt-2 flex items-baseline justify-between gap-4">
                      <span className="text-sm text-ink-muted">{addon.label}</span>
                      <span className="text-sm text-ink-muted">{addon.price}</span>
                    </div>
                  ) : null;
                })}
                <p className="mt-4 border-t border-line pt-4 text-xs text-ink-muted">
                  7 days free. You won&rsquo;t be charged today.
                </p>
              </div>
            )}
          </>
        )}

        {error && (
          <p role="alert" className="rounded-card border border-line bg-bg-card p-4 text-sm">
            {error}
          </p>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step <= 1 || busy}
          className="rounded-pill border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-bg-raise disabled:cursor-not-allowed disabled:opacity-30"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!valid[step]}
            className="rounded-pill bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="rounded-pill bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? "Just a moment…" : "Start my 7 days free"}
          </button>
        )}
      </div>
    </main>
  );
}
