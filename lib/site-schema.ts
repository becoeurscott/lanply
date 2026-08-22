import { z } from "zod";

/* Zod mirror of SiteSpec, used as the structured-output contract for
   generation. Optional fields are `.nullable()` rather than `.optional()`
   because strict structured outputs require every key to be present —
   `stripNulls` below converts nulls back to absent fields. */

const Cta = z.object({ label: z.string(), href: z.string() });

const NavBlock = z.object({
  type: z.literal("nav"),
  logo: z.string(),
  links: z.array(Cta),
  cta: Cta.nullable(),
});

const HeroBlock = z.object({
  type: z.literal("hero"),
  eyebrow: z.string().nullable(),
  headline: z.string(),
  sub: z.string(),
  primary: Cta,
  secondary: Cta.nullable(),
});

const MarqueeBlock = z.object({
  type: z.literal("marquee"),
  caption: z.string().nullable(),
  items: z.array(z.string()),
});

const LogosBlock = z.object({
  type: z.literal("logos"),
  caption: z.string().nullable(),
  items: z.array(z.string()),
});

const ProcessBlock = z.object({
  type: z.literal("process"),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  sub: z.string().nullable(),
  steps: z.array(z.object({ title: z.string(), body: z.string() })),
});

const BentoBlock = z.object({
  type: z.literal("bento"),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  sub: z.string().nullable(),
  items: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      icon: z.string().nullable(),
      span: z.enum(["wide", "normal"]).nullable(),
    }),
  ),
});

const FeaturesBlock = z.object({
  type: z.literal("features"),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  sub: z.string().nullable(),
  items: z.array(
    z.object({ title: z.string(), body: z.string(), icon: z.string().nullable() }),
  ),
});

const ShowcaseBlock = z.object({
  type: z.literal("showcase"),
  heading: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).nullable(),
  flip: z.boolean().nullable(),
});

const StatsBlock = z.object({
  type: z.literal("stats"),
  items: z.array(z.object({ value: z.string(), label: z.string() })),
});

const CompareBlock = z.object({
  type: z.literal("compare"),
  heading: z.string(),
  sub: z.string().nullable(),
  columns: z.array(z.string()),
  rows: z.array(
    z.object({
      label: z.string(),
      values: z.array(z.union([z.boolean(), z.string()])),
    }),
  ),
});

const TestimonialBlock = z.object({
  type: z.literal("testimonial"),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
});

const PricingBlock = z.object({
  type: z.literal("pricing"),
  heading: z.string(),
  sub: z.string().nullable(),
  plans: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      note: z.string().nullable(),
      features: z.array(z.string()),
      featured: z.boolean().nullable(),
      cta: Cta,
    }),
  ),
});

const FaqBlock = z.object({
  type: z.literal("faq"),
  heading: z.string(),
  items: z.array(z.object({ q: z.string(), a: z.string() })),
});

const CtaBlock = z.object({
  type: z.literal("cta"),
  heading: z.string(),
  sub: z.string().nullable(),
  primary: Cta,
  secondary: Cta.nullable(),
});

const PlansBlock = z.object({
  type: z.literal("plans"),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  sub: z.string().nullable(),
  note: z.string().nullable(),
  terms: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      rate: z.string(),
      unit: z.string().nullable(),
      billed: z.string(),
      save: z.string().nullable(),
      intro: z.string().nullable(),
      credits: z.string(),
      featured: z.boolean().nullable(),
      cta: Cta,
    }),
  ),
  includes: z.array(z.string()),
});

const AddonsBlock = z.object({
  type: z.literal("addons"),
  eyebrow: z.string().nullable(),
  heading: z.string(),
  sub: z.string().nullable(),
  groups: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          price: z.string(),
          note: z.string().nullable(),
        }),
      ),
    }),
  ),
});

const WordmarkBlock = z.object({ type: z.literal("wordmark"), text: z.string() });

const FooterBlock = z.object({
  type: z.literal("footer"),
  logo: z.string(),
  blurb: z.string().nullable(),
  columns: z
    .array(z.object({ title: z.string(), links: z.array(Cta) }))
    .nullable(),
  legal: z.string().nullable(),
});

export const BlockSchema = z.discriminatedUnion("type", [
  NavBlock,
  HeroBlock,
  MarqueeBlock,
  LogosBlock,
  ProcessBlock,
  BentoBlock,
  FeaturesBlock,
  ShowcaseBlock,
  StatsBlock,
  CompareBlock,
  TestimonialBlock,
  PricingBlock,
  FaqBlock,
  CtaBlock,
  PlansBlock,
  AddonsBlock,
  WordmarkBlock,
  FooterBlock,
]);

export const SiteSpecSchema = z.object({
  meta: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  theme: z.object({
    mode: z.enum(["dark", "light"]),
    accent: z.string(),
    accentInk: z.string(),
    fontDisplay: z.string(),
    fontBody: z.string(),
  }),
  blocks: z.array(BlockSchema),
});

/** Recursively drop null-valued keys so the result matches SiteSpec's optionals. */
export function stripNulls<T>(value: T): T {
  if (Array.isArray(value)) return value.map(stripNulls) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null) continue;
      out[k] = stripNulls(v);
    }
    return out as T;
  }
  return value;
}
