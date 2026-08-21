"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* The client-facing intake. Deliberately five plain questions — asking for
   design vocabulary is how briefs get abandoned. The answers are stitched
   into one prose brief for the generator. */

const QUESTIONS = [
  {
    key: "business",
    label: "What is the business, and what do you sell?",
    placeholder: "We roast coffee in Lyon and sell subscriptions to offices and homes.",
    rows: 3,
  },
  {
    key: "audience",
    label: "Who buys it, and what problem does it solve for them?",
    placeholder: "Office managers who are tired of bad coffee and want one supplier they can trust.",
    rows: 3,
  },
  {
    key: "different",
    label: "Why should someone pick you over the alternatives?",
    placeholder: "We roast to order, deliver within 48 hours, and there is no minimum contract.",
    rows: 3,
  },
  {
    key: "proof",
    label: "Any real numbers, prices, customers or quotes we can use?",
    placeholder: "Prices from €29/month. 400 offices in France. Quote from Marie at Studio Nord.",
    rows: 4,
  },
  {
    key: "tone",
    label: "Brand colour, font, and the tone you want. Anything you hate?",
    placeholder: "Deep green, warm and human but not cute. No corporate jargon.",
    rows: 3,
  },
] as const;

type Answers = Record<string, string>;

export default function BriefPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filled = QUESTIONS.filter((q) => (answers[q.key] ?? "").trim().length > 0).length;
  const ready = filled >= 3;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const brief = QUESTIONS.map((q) => {
      const a = (answers[q.key] ?? "").trim();
      return a ? `${q.label}\n${a}` : null;
    })
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <main className="container-x max-w-2xl py-24">
      <h1 className="font-display text-h2 font-medium text-balance">
        Tell us about the business
      </h1>
      <p className="mt-5 text-lead text-ink-muted text-pretty">
        Five questions, about five minutes. Answer in plain language — no design words needed.
        Skip anything that does not apply.
      </p>

      <form onSubmit={submit} className="mt-14 space-y-10">
        {QUESTIONS.map((q, i) => (
          <div key={q.key}>
            <label htmlFor={q.key} className="flex gap-3 font-display text-h4 font-medium">
              <span className="text-ink-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {q.label}
            </label>
            <textarea
              id={q.key}
              rows={q.rows}
              value={answers[q.key] ?? ""}
              placeholder={q.placeholder}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))}
              className="mt-4 w-full resize-y rounded-card border border-line bg-bg-card p-4 text-sm leading-relaxed transition-colors outline-none placeholder:text-ink-muted/50 focus:border-accent"
            />
          </div>
        ))}

        {error && (
          <p role="alert" className="rounded-card border border-line bg-bg-card p-4 text-sm text-ink">
            {error}
          </p>
        )}

        <div className="flex flex-col items-stretch gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            {ready ? `${filled} of ${QUESTIONS.length} answered` : "Answer at least three to continue"}
          </p>
          <button
            type="submit"
            disabled={!ready || busy}
            className="inline-flex items-center justify-center rounded-pill bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? "Building your page…" : "Build my page"}
          </button>
        </div>
      </form>
    </main>
  );
}
