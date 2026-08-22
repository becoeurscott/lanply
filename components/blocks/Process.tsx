import type { Block } from "@/lib/spec";
import { Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "process" }>;

/* Full class strings so Tailwind's scanner sees them. */
const COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export function Process({ eyebrow, heading, sub, steps }: P) {
  return (
    <Section id="process">
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && <div className="mb-6"><Eyebrow>{eyebrow}</Eyebrow></div>}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="relative mt-16">
        {/* connecting rail */}
        <div className="absolute inset-x-0 top-5 hidden h-px bg-line lg:block" />
        <div className={`grid gap-10 sm:grid-cols-2 ${COLS[steps.length] ?? "lg:grid-cols-4"}`}>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09} className="relative">
              <div className="grid size-10 place-items-center rounded-full border border-line bg-bg-card font-display text-sm font-semibold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-6 font-display text-h4 font-medium">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
