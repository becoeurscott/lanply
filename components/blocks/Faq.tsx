import type { Block } from "@/lib/spec";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "faq" }>;

export function Faq({ heading, items }: P) {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.05}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-h4 font-medium [&::-webkit-details-marker]:hidden">
                  {it.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
