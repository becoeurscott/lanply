import type { Block } from "@/lib/spec";
import { Reveal } from "@/components/Reveal";

type P = Extract<Block, { type: "logos" }>;

export function Logos({ caption, items }: P) {
  return (
    <section className="border-y border-line py-14">
      <div className="container-x">
        <Reveal>
          {caption && (
            <p className="text-center text-xs font-medium tracking-widest text-ink-muted uppercase">{caption}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-7">
            {items.map((name) => (
              <span
                key={name}
                className="font-display text-lg font-semibold tracking-tight text-ink-muted opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
