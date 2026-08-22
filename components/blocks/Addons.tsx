import type { Block } from "@/lib/spec";
import { Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "addons" }>;

/* Add-ons carry the margin, so they get a real section rather than a footnote
   under pricing. Grouped by job — a visitor scans for their own category
   first, then the price. */

export function Addons({ eyebrow, heading, sub, groups }: P) {
  return (
    <Section id="addons">
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <div className="mb-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <div className="h-full rounded-card border border-line bg-bg-card p-7">
              <h3 className="font-display text-h4 font-medium">{g.title}</h3>
              <ul className="mt-6 divide-y divide-line">
                {g.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 py-3.5">
                    <div>
                      <span className="text-sm">{item.name}</span>
                      {item.note && (
                        <span className="mt-0.5 block text-xs text-ink-muted">{item.note}</span>
                      )}
                    </div>
                    <span className="shrink-0 font-display text-sm font-medium text-accent tabular-nums">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
