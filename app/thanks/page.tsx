import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're all set — Nexus Site",
  description: "Your trial has started. Here's what happens next.",
};

/* Post-checkout landing. Deliberately restates the billing terms: the
   moment after paying is when people most want to know exactly what they
   just agreed to, and saying it here prevents support mail later. */

const NEXT_STEPS = [
  {
    title: "Tell us about your business",
    body: "If you haven't filled in the brief yet, it takes about five minutes.",
  },
  {
    title: "We create your website",
    body: "Strategy, structure, design and copy, built around what you sell.",
  },
  { title: "You review it", body: "You'll get a link to see it and request changes before launch." },
  { title: "We launch and host it", body: "We connect your domain and keep everything running." },
];

export default function ThanksPage() {
  return (
    <main className="container-x flex min-h-screen max-w-2xl flex-col justify-center py-24">
      <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-bg-raise px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink-muted uppercase">
        Trial started
      </span>

      <h1 className="mt-7 font-display text-h2 font-medium text-balance">
        You&rsquo;re all set. <span className="text-accent">Let&rsquo;s build your website.</span>
      </h1>

      <p className="mt-5 text-lead text-ink-muted text-pretty">
        Your 7 days free have started. We&rsquo;ve emailed your receipt and the link to your brief.
      </p>

      <ol className="mt-12 divide-y divide-line border-y border-line">
        {NEXT_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-5 py-5">
            <span className="font-display text-sm text-ink-muted tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-display text-h4 font-medium">{s.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Link
          href="/brief"
          className="inline-flex items-center justify-center rounded-pill bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110"
        >
          Fill in my brief
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-pill border border-line px-6 py-3 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-bg-raise"
        >
          Back to home
        </Link>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-ink-muted">
        You will not be charged during the 7-day trial. After it ends, your first month is $9.99 on
        the monthly plan, then $20/month. Prepaid plans are billed upfront at their stated rate. You
        can cancel future renewals at any time.
      </p>
    </main>
  );
}
