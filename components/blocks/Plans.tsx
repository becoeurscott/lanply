"use client";

import { useState } from "react";
import type { Block } from "@/lib/spec";
import { Button, Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "plans" }>;

/* One price, one axis: term length. Showing four full plan cards side by side
   makes an identical feature list look like four different products — so the
   term is a selector and the shared includes are listed once underneath. */

export function Plans({ eyebrow, heading, sub, note, terms, includes }: P) {
  const initial = Math.max(
    0,
    terms.findIndex((t) => t.featured),
  );
  const [active, setActive] = useState(initial);
  const term = terms[active];

  if (!term) return null;

  return (
    <Section id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <div className="mb-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
        {/* Term selector */}
        <div
          role="tablist"
          aria-label="Billing term"
          className="flex flex-wrap justify-center gap-2 rounded-pill border border-line bg-bg-raise p-2 sm:inline-flex sm:w-auto"
        >
          {terms.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="relative rounded-pill px-5 py-2.5 text-sm font-medium"
                style={{
                  background: on ? "var(--accent)" : "transparent",
                  color: on ? "var(--accent-ink)" : "var(--ink-muted)",
                  transition: "background 300ms cubic-bezier(0.16,1,0.3,1), color 300ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {t.label}
                {t.save && !on && (
                  <span className="ml-2 text-xs text-accent">{t.save}</span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Selected term */}
      <Reveal delay={0.14} className="mx-auto mt-8 max-w-3xl">
        <div className="rounded-card border border-line bg-bg-card p-8 sm:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-medium tracking-tight">{term.rate}</span>
                {term.unit && <span className="text-lead text-ink-muted">{term.unit}</span>}
              </div>
              <p className="mt-3 text-sm text-ink-muted">{term.billed}</p>
              {term.intro && (
                <p className="mt-4 inline-flex rounded-pill border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent">
                  {term.intro}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              {term.save && (
                <p className="mb-3 font-display text-h4 font-medium text-accent">{term.save}</p>
              )}
              <p className="mb-5 text-sm text-ink-muted">{term.credits}</p>
              <Button href={term.cta.href}>{term.cta.label}</Button>
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">
              Every plan includes
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {includes.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {note && <p className="mt-6 text-center text-sm text-ink-muted">{note}</p>}
      </Reveal>
    </Section>
  );
}
