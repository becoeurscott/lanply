import type { Block } from "@/lib/spec";
import { Button, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "pricing" }>;

export function Pricing({ heading, sub, plans }: P) {
  return (
    <Section id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl gap-5 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className={`flex h-full flex-col rounded-card border p-8 ${
                p.featured ? "border-accent/50 bg-bg-card shadow-xl shadow-black/10" : "border-line bg-bg-card"
              }`}
            >
              {p.featured && (
                <span className="mb-5 self-start rounded-pill bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-h4 font-medium">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight">{p.price}</span>
                {p.note && <span className="text-sm text-ink-muted">{p.note}</span>}
              </div>
              <ul className="mt-7 grow space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={p.cta.href} variant={p.featured ? "primary" : "ghost"}>
                  {p.cta.label}
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
