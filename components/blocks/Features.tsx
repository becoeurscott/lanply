import type { Block } from "@/lib/spec";
import { Card, Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "features" }>;

export function Features({ eyebrow, heading, sub, items }: P) {
  return (
    <Section id="features">
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && <div className="mb-6">{<Eyebrow>{eyebrow}</Eyebrow>}</div>}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.07}>
            <Card className="h-full">
              {f.icon && (
                <div className="mb-5 grid size-10 place-items-center rounded-xl border border-line bg-bg text-lg">
                  {f.icon}
                </div>
              )}
              <h3 className="font-display text-h4 font-medium">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
