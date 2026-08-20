import type { Block } from "@/lib/spec";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "cta" }>;

export function Cta({ heading, sub, primary, secondary }: P) {
  return (
    <section className="py-section">
      <div className="container-x">
        <Reveal>
          <div className="glow relative overflow-hidden rounded-card border border-line bg-bg-raise px-6 py-16 text-center sm:px-8 sm:py-20">
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
              {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Button href={primary.href} full>{primary.label}</Button>
                {secondary && (
                  <Button href={secondary.href} variant="ghost" full>
                    {secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
