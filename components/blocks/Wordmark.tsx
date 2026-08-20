import type { Block } from "@/lib/spec";

type P = Extract<Block, { type: "wordmark" }>;

export function Wordmark({ text }: P) {
  return (
    <div className="container-x -mb-4 overflow-hidden pt-10" aria-hidden>
      <div className="wordmark font-display font-semibold whitespace-nowrap select-none">{text}</div>
    </div>
  );
}
