import type { Block } from "@/lib/spec";

type P = Extract<Block, { type: "marquee" }>;

export function Marquee({ caption, items }: P) {
  const row = [...items, ...items];
  return (
    <section className="border-y border-line py-12">
      {caption && (
        <p className="container-x mb-8 text-center text-xs font-medium tracking-widest text-ink-muted uppercase">
          {caption}
        </p>
      )}
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {row.map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="px-10 font-display text-xl font-semibold tracking-tight whitespace-nowrap text-ink-muted opacity-60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
