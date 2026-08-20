import Link from "next/link";
import type { Block } from "@/lib/spec";

type P = Extract<Block, { type: "footer" }>;

export function Footer({ logo, blurb, columns, legal }: P) {
  return (
    <footer className="border-t border-line py-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.5fr_2fr]">
          <div>
            <div className="font-display text-[15px] font-semibold tracking-tight">{logo}</div>
            {blurb && <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{blurb}</p>}
          </div>
          {columns && (
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((c) => (
                <div key={c.title}>
                  <div className="text-xs font-medium tracking-widest text-ink-muted uppercase">{c.title}</div>
                  <ul className="mt-4 space-y-2.5">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {legal && <p className="mt-14 border-t border-line pt-8 text-xs text-ink-muted">{legal}</p>}
      </div>
    </footer>
  );
}
