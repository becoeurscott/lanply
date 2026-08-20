import type { Block } from "@/lib/spec";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

type P = Extract<Block, { type: "testimonial" }>;

export function Testimonial({ quote, name, role, avatar }: P) {
  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-h3 leading-relaxed font-medium text-balance sm:text-[1.75rem] sm:leading-[1.4]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-9 flex items-center justify-center gap-3">
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="size-10 rounded-full border border-line object-cover" />
          )}
          <div className="text-left">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-sm text-ink-muted">{role}</div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
