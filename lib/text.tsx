import type { ReactNode } from "react";

/** Renders *highlighted* spans in the accent colour. */
export function rich(input: string): ReactNode {
  return input.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <span key={i} className="text-accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    )
  );
}
