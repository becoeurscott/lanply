import type { Block } from "@/lib/spec";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/lib/text";

type P = Extract<Block, { type: "compare" }>;

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span className="text-sm text-ink-muted">{v}</span>;
  return v ? (
    <span className="grid size-6 place-items-center rounded-full bg-accent text-xs text-accent-ink">✓</span>
  ) : (
    <span className="grid size-6 place-items-center rounded-full border border-line text-xs text-ink-muted">—</span>
  );
}

export function Compare({ heading, sub, columns, rows }: P) {
  return (
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-h2 font-medium text-balance">{rich(heading)}</h2>
        {sub && <p className="mt-5 text-lead text-ink-muted text-pretty">{sub}</p>}
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
        <div className="overflow-x-auto rounded-card border border-line bg-bg-card">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                <th className="p-5 text-left text-xs font-medium tracking-widest text-ink-muted uppercase" />
                {columns.map((c, i) => (
                  <th
                    key={c}
                    className={`p-5 text-center font-display text-sm font-semibold ${
                      i === 0 ? "text-accent" : "text-ink-muted"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0">
                  <td className="p-5 text-sm font-medium">{r.label}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-5">
                      <div className="flex justify-center">
                        <Cell v={v} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
