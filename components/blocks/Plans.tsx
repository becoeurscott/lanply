"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Block } from "@/lib/spec";
import { Button, Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "plans" }>;

/* One price, one axis: term length. Five full plan cards side by side would
   make an identical feature list look like five different products, so the
   term is a selector and the shared includes are listed once underneath.

   Two layout rules the earlier version got wrong:
   - The rail must never wrap. Five pills are wider than a phone, so it
     scrolls horizontally instead of stacking rows inside a rounded-pill
     container (which looked like a lozenge with rows crammed in it).
   - Centring uses `mx-auto w-fit` on a flex box. `inline-flex` sat flush
     left inside its block parent while the heading above was centred. */

export function Plans({ eyebrow, heading, sub, note, terms, includes }: P) {
  const initial = Math.max(
    0,
    terms.findIndex((t) => t.featured),
  );
  const [active, setActive] = useState(initial);
  const term = terms[active];

  if (!term) return null;

  // One badge slot, so switching terms cannot change the card's height.
  const badge = term.intro ?? term.save;

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

      <Reveal delay={0.08} className="mt-12">
        <div
          role="tablist"
          aria-label="Billing term"
          className="no-scrollbar mx-auto flex w-fit max-w-full snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-pill border border-line bg-bg-raise p-1.5"
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
                className="flex shrink-0 snap-start items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-medium whitespace-nowrap sm:px-5"
                style={{
                  background: on ? "var(--accent)" : "transparent",
                  color: on ? "var(--accent-ink)" : "var(--ink-muted)",
                  transition:
                    "background 300ms cubic-bezier(0.16,1,0.3,1), color 300ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {t.label}
                {/* Always rendered — hiding it on the active pill made the
                    rail reflow every time you switched term. */}
                {t.save && (
                  <span
                    className="text-xs"
                    style={{ color: on ? "var(--accent-ink)" : "var(--accent)", opacity: on ? 0.7 : 1 }}
                  >
                    {t.save}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.14} className="mx-auto mt-8 max-w-3xl">
        <div className="rounded-card border border-line bg-bg-card p-7 sm:p-10">
          {/* Keyed so each term change crossfades instead of snapping. */}
          <motion.div
            key={term.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-medium tracking-tight">{term.rate}</span>
                {term.unit && <span className="text-lead text-ink-muted">{term.unit}</span>}
              </div>
              <p className="mt-3 text-sm text-ink-muted">{term.billed}</p>
              {badge && (
                <p className="mt-4 inline-flex rounded-pill border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent">
                  {badge}
                </p>
              )}
            </div>

            <div className="w-full shrink-0 sm:w-auto">
              <Button href={term.cta.href} full>
                {term.cta.label}
              </Button>
            </div>
          </motion.div>

          <div className="mt-9 border-t border-line pt-8">
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

        {note && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-muted">{note}</p>
        )}
      </Reveal>
    </Section>
  );
}
