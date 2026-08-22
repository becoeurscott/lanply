/* ── Site spec ─────────────────────────────────────────────────────
   This is the ONLY thing the AI produces or edits. It is small
   (~1-2k tokens), so a chat edit costs a fraction of a cent and can
   never break the layout — the blocks below own all the design.     */

export type Cta = { label: string; href: string };

export type Block =
  | { type: "nav"; logo: string; links: Cta[]; cta?: Cta }
  | {
      type: "hero";
      eyebrow?: string;
      headline: string;
      /** Words wrapped in *asterisks* render in the accent colour. */
      sub: string;
      primary: Cta;
      secondary?: Cta;
      image?: string;
      /** Code-drawn product mockup, shown when no image is supplied. */
      visual?: "mockup";
    }
  | { type: "logos"; caption?: string; items: string[] }
  | {
      type: "features";
      eyebrow?: string;
      heading: string;
      sub?: string;
      items: { title: string; body: string; icon?: string }[];
    }
  | { type: "showcase"; heading: string; body: string; bullets?: string[]; image?: string; flip?: boolean }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "testimonial"; quote: string; name: string; role: string; avatar?: string }
  | {
      type: "pricing";
      heading: string;
      sub?: string;
      plans: { name: string; price: string; note?: string; features: string[]; featured?: boolean; cta: Cta }[];
    }
  | { type: "faq"; heading: string; items: { q: string; a: string }[] }
  | { type: "cta"; heading: string; sub?: string; primary: Cta; secondary?: Cta }
  | { type: "marquee"; caption?: string; items: string[] }
  | {
      type: "bento";
      eyebrow?: string;
      heading: string;
      sub?: string;
      items: { title: string; body: string; icon?: string; span?: "wide" | "normal" }[];
    }
  | {
      type: "process";
      eyebrow?: string;
      heading: string;
      sub?: string;
      steps: { title: string; body: string }[];
    }
  | {
      type: "compare";
      heading: string;
      sub?: string;
      columns: string[];
      rows: { label: string; values: (boolean | string)[] }[];
    }
  | {
      type: "plans";
      eyebrow?: string;
      heading: string;
      sub?: string;
      /** Risk-reversal line under the selector, e.g. trial + cancel terms. */
      note?: string;
      terms: {
        id: string;
        label: string;
        rate: string;
        unit?: string;
        billed: string;
        save?: string;
        intro?: string;
        credits: string;
        featured?: boolean;
        cta: Cta;
      }[];
      /** Shared across every term — listed once, not repeated per card. */
      includes: string[];
    }
  | {
      type: "addons";
      eyebrow?: string;
      heading: string;
      sub?: string;
      groups: {
        title: string;
        items: { name: string; price: string; note?: string }[];
      }[];
    }
  | {
      type: "versus";
      eyebrow?: string;
      heading: string;
      sub?: string;
      leftLabel: string;
      leftPoints: string[];
      rightLabel: string;
      rightPoints: string[];
    }
  | { type: "wordmark"; text: string }
  | { type: "footer"; logo: string; blurb?: string; columns?: { title: string; links: Cta[] }[]; legal?: string };

export type SiteSpec = {
  meta: { name: string; title: string; description: string };
  theme: {
    mode: "dark" | "light";
    /** any CSS colour; oklch recommended */
    accent: string;
    accentInk: string;
    fontDisplay: string;
    fontBody: string;
  };
  blocks: Block[];
};
