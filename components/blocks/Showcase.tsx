import type { Block } from "@/lib/spec";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "showcase" }>;

export function Showcase({ heading, body, bullets, image, flip }: P) {
  return (
    <Section>
      <div className={`grid items-center gap-14 ${image ? "lg:grid-cols-2" : "mx-auto max-w-2xl text-center"}`}>
        <Reveal className={flip ? "lg:order-2" : ""}>
          <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
          <p className="mt-5 text-lead text-ink-muted text-pretty">{body}</p>
          {bullets && (
            <ul className="mt-8 space-y-3.5">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-ink-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {image && (
          <Reveal delay={0.12} className={flip ? "lg:order-1" : ""}>
            <div className="aspect-[4/3] overflow-hidden rounded-card border border-line bg-bg-raise">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="size-full object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
