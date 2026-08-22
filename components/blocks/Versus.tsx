import type { Block } from "@/lib/spec";
import { Eyebrow, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "versus" }>;

/* Side-by-side proof for the "not AI slop" claim.

   Both panels are drawn in code and fully abstract — the weak example shows
   the *characteristics* of cheap output (rainbow gradients, cramped rhythm,
   competing accents, tiny type, emoji as art direction) without depicting any
   real company's site. Nothing here is a screenshot of anyone's work. */

function Bar({
  w,
  h = 6,
  color = "var(--ink)",
  opacity = 0.14,
}: {
  w: string;
  h?: number;
  color?: string;
  opacity?: number;
}) {
  return <div className="rounded-full" style={{ width: w, height: h, background: color, opacity }} />;
}

/* ── The weak version ─────────────────────────────────────────── */
function SlopPage() {
  return (
    <div className="h-full overflow-hidden rounded-lg" style={{ background: "#12101c" }}>
      {/* cramped nav, too many links, no breathing room */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: "#1a1730" }}>
        <div className="flex items-center gap-1">
          <div className="size-3 rounded" style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }} />
          <Bar w="26px" h={4} color="#fff" opacity={0.5} />
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Bar key={i} w="16px" h={3} color="#fff" opacity={0.3} />
          ))}
        </div>
      </div>

      {/* rainbow gradient hero, centred everything, no hierarchy */}
      <div
        className="flex flex-col items-center gap-1.5 px-4 py-5 text-center"
        style={{ background: "linear-gradient(135deg,#7c3aed 0%,#db2777 50%,#f59e0b 100%)" }}
      >
        <Bar w="82%" h={9} color="#fff" opacity={0.95} />
        <Bar w="66%" h={9} color="#fff" opacity={0.95} />
        <div className="mt-1 flex flex-col items-center gap-1">
          <Bar w="74%" h={3} color="#fff" opacity={0.7} />
          <Bar w="60%" h={3} color="#fff" opacity={0.7} />
          <Bar w="68%" h={3} color="#fff" opacity={0.7} />
        </div>
        {/* two buttons, different sizes, competing colours */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="h-5 w-16 rounded" style={{ background: "#22c55e" }} />
          <div className="h-4 w-12 rounded-full" style={{ background: "#06b6d4" }} />
        </div>
      </div>

      {/* emoji as art direction, cards crammed together */}
      <div className="grid grid-cols-3 gap-1 px-3 py-3">
        {["🚀", "✨", "💡"].map((e) => (
          <div key={e} className="rounded p-1.5 text-center" style={{ background: "#1a1730" }}>
            <div className="text-[13px] leading-none">{e}</div>
            <div className="mt-1 flex flex-col items-center gap-0.5">
              <Bar w="80%" h={3} color="#fff" opacity={0.45} />
              <Bar w="95%" h={2} color="#fff" opacity={0.22} />
              <Bar w="88%" h={2} color="#fff" opacity={0.22} />
              <Bar w="92%" h={2} color="#fff" opacity={0.22} />
            </div>
          </div>
        ))}
      </div>

      {/* another gradient band, because why not */}
      <div className="mx-3 mb-3 rounded p-2" style={{ background: "linear-gradient(90deg,#ec4899,#8b5cf6)" }}>
        <div className="flex flex-col items-center gap-1">
          <Bar w="55%" h={4} color="#fff" opacity={0.9} />
          <div className="h-3.5 w-14 rounded" style={{ background: "#fbbf24" }} />
        </div>
      </div>
    </div>
  );
}

/* ── The real version ─────────────────────────────────────────── */
function PremiumPage() {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-line" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <Bar w="34px" h={6} />
        <div className="flex items-center gap-3">
          <Bar w="20px" h={3} opacity={0.1} />
          <Bar w="20px" h={3} opacity={0.1} />
          <div className="h-4 w-11 rounded-full" style={{ background: "var(--accent)" }} />
        </div>
      </div>

      {/* generous space, clear hierarchy, one accent */}
      <div className="flex flex-col items-center gap-2.5 px-5 pt-9 pb-8 text-center">
        <div className="h-3.5 w-16 rounded-full border" style={{ borderColor: "var(--line)" }} />
        <div className="mt-1 flex w-full flex-col items-center gap-1.5">
          <Bar w="78%" h={13} opacity={0.9} />
          <Bar w="52%" h={13} opacity={0.9} />
        </div>
        <div className="mt-1.5 flex w-full flex-col items-center gap-1.5">
          <Bar w="56%" h={3} opacity={0.16} />
          <Bar w="44%" h={3} opacity={0.16} />
        </div>
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-full" style={{ background: "var(--accent)" }} />
          <div className="h-6 w-16 rounded-full border" style={{ borderColor: "var(--line)" }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 px-5 pb-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-line p-2.5" style={{ background: "var(--bg-card)" }}>
            <div className="size-3.5 rounded" style={{ background: "var(--ink)", opacity: 0.1 }} />
            <div className="mt-2.5 flex flex-col gap-1.5">
              <Bar w="72%" h={4} opacity={0.4} />
              <Bar w="100%" h={2.5} opacity={0.12} />
              <Bar w="82%" h={2.5} opacity={0.12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Versus({ eyebrow, heading, sub, leftLabel, leftPoints, rightLabel, rightPoints }: P) {
  const panels = [
    { label: leftLabel, points: leftPoints, Page: SlopPage, good: false },
    { label: rightLabel, points: rightPoints, Page: PremiumPage, good: true },
  ];

  return (
    <Section id="versus">
      <Reveal className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <div className="mb-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {panels.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.1}>
            <div
              className="flex h-full flex-col rounded-card border p-5 sm:p-6"
              style={{
                borderColor: p.good ? "color-mix(in oklab, var(--accent) 45%, transparent)" : "var(--line)",
                background: "var(--bg-raise)",
              }}
            >
              <div className="mb-5 flex items-center gap-2.5">
                <span
                  className="grid size-6 shrink-0 place-items-center rounded-full text-xs"
                  style={{
                    background: p.good ? "var(--accent)" : "transparent",
                    color: p.good ? "var(--accent-ink)" : "var(--ink-muted)",
                    border: p.good ? "none" : "1px solid var(--line)",
                  }}
                >
                  {p.good ? "✓" : "✕"}
                </span>
                <h3 className="font-display text-h4 font-medium">{p.label}</h3>
              </div>

              <div className="aspect-[4/3] w-full">
                <p.Page />
              </div>

              <ul className="mt-6 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm text-ink-muted">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ background: p.good ? "var(--accent)" : "var(--ink-muted)", opacity: p.good ? 1 : 0.4 }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
