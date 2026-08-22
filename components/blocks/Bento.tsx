import type { Block } from "@/lib/spec";
import { Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";
import { Icon } from "@/components/Icons";

type P = Extract<Block, { type: "bento" }>;

export function Bento({ eyebrow, heading, sub, items }: P) {
  return (
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && <div className="mb-6"><Eyebrow>{eyebrow}</Eyebrow></div>}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="mt-16 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-6">
        {items.map((it, i) => (
          <Reveal
            key={it.title}
            delay={i * 0.06}
            className={it.span === "wide" ? "md:col-span-4" : "md:col-span-2"}
          >
            <div className="group relative flex h-full flex-col justify-end overflow-hidden rounded-card border border-line bg-bg-card p-7 transition-colors duration-300 hover:border-ink-muted/30">
              {it.icon && (
                <div className="mb-auto grid size-10 place-items-center rounded-xl border border-line bg-bg text-accent">
                  <Icon name={it.icon} />
                </div>
              )}
              <h3 className="mt-6 font-display text-h4 font-medium">{it.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
