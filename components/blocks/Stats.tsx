import type { Block } from "@/lib/spec";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

type P = Extract<Block, { type: "stats" }>;

export function Stats({ items }: P) {
  return (
    <Section className="!py-20">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="text-center">
            <div className="font-display text-h2 font-medium tracking-tight">{s.value}</div>
            <div className="mt-2 text-sm text-ink-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
