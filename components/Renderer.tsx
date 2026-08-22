import type { Block, SiteSpec } from "@/lib/spec";
import { Nav } from "@/components/blocks/Nav";
import { Hero } from "@/components/blocks/Hero";
import { Logos } from "@/components/blocks/Logos";
import { Features } from "@/components/blocks/Features";
import { Showcase } from "@/components/blocks/Showcase";
import { Stats } from "@/components/blocks/Stats";
import { Testimonial } from "@/components/blocks/Testimonial";
import { Pricing } from "@/components/blocks/Pricing";
import { Faq } from "@/components/blocks/Faq";
import { Cta } from "@/components/blocks/Cta";
import { Footer } from "@/components/blocks/Footer";
import { Marquee } from "@/components/blocks/Marquee";
import { Bento } from "@/components/blocks/Bento";
import { Process } from "@/components/blocks/Process";
import { Compare } from "@/components/blocks/Compare";
import { Wordmark } from "@/components/blocks/Wordmark";
import { Plans } from "@/components/blocks/Plans";
import { Addons } from "@/components/blocks/Addons";
import { Versus } from "@/components/blocks/Versus";

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "nav": return <Nav key={i} {...b} />;
    case "hero": return <Hero key={i} {...b} />;
    case "logos": return <Logos key={i} {...b} />;
    case "features": return <Features key={i} {...b} />;
    case "showcase": return <Showcase key={i} {...b} />;
    case "stats": return <Stats key={i} {...b} />;
    case "testimonial": return <Testimonial key={i} {...b} />;
    case "pricing": return <Pricing key={i} {...b} />;
    case "faq": return <Faq key={i} {...b} />;
    case "cta": return <Cta key={i} {...b} />;
    case "marquee": return <Marquee key={i} {...b} />;
    case "bento": return <Bento key={i} {...b} />;
    case "process": return <Process key={i} {...b} />;
    case "compare": return <Compare key={i} {...b} />;
    case "plans": return <Plans key={i} {...b} />;
    case "addons": return <Addons key={i} {...b} />;
    case "versus": return <Versus key={i} {...b} />;
    case "wordmark": return <Wordmark key={i} {...b} />;
    case "footer": return <Footer key={i} {...b} />;
  }
}

export function Renderer({ spec }: { spec: SiteSpec }) {
  const style = {
    "--accent": spec.theme.accent,
    "--accent-ink": spec.theme.accentInk,
    "--f-display": spec.theme.fontDisplay,
    "--f-body": spec.theme.fontBody,
  } as React.CSSProperties;

  return (
    <div data-mode={spec.theme.mode} style={style}>
      {spec.blocks.map(renderBlock)}
    </div>
  );
}
