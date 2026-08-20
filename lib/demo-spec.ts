import type { SiteSpec } from "@/lib/spec";

/* Lanply's own landing page — also a worked example of the exact
   spec shape the generator emits from a client brief. */

export const demoSpec: SiteSpec = {
  meta: {
    name: "Lanply",
    title: "Lanply — premium landing pages, built by AI in minutes",
    description:
      "Answer a short brief and get a designer-grade landing page. Change anything by chatting. Ship to your own domain the same day, and keep the code.",
  },
  theme: {
    mode: "dark",
    accent: "#ff7d00",
    accentInk: "#140900",
    fontDisplay: "Inter, sans-serif",
    fontBody: "Inter, sans-serif",
  },
  blocks: [
    {
      type: "nav",
      logo: "Lanply",
      links: [
        { label: "How it works", href: "#process" },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Start building", href: "#pricing" },
    },
    {
      type: "hero",
      eyebrow: "Live in 24 hours",
      headline: "Agency-grade landing pages, *without the agency price*",
      sub: "Answer a short brief and get a designer-quality page in minutes. Change anything by chatting with it. Ship to your own domain the same day — and keep the code.",
      primary: { label: "Build my page", href: "#pricing" },
      secondary: { label: "See how it works", href: "#process" },
    },
    {
      type: "marquee",
      caption: "Built for founders, studios and small teams",
      items: ["Northwind", "Kettle Coffee", "Aperture Labs", "Lumen", "Rove", "Basalt", "Fieldnote", "Orbit"],
    },
    {
      type: "process",
      eyebrow: "How it works",
      heading: "From blank page to live site in *four steps*",
      sub: "No design vocabulary required. You describe the business, we handle everything that makes a site look expensive.",
      steps: [
        { title: "Fill the brief", body: "Five minutes. What you sell, who buys it, and the tone you want." },
        { title: "Get a real draft", body: "A complete responsive page with written copy, structure and motion — usually inside six minutes." },
        { title: "Chat your changes", body: "Say what you want in plain language. The page updates while you watch." },
        { title: "Ship it", body: "Deploy to your domain in one click, or download the whole project folder." },
      ],
    },
    {
      type: "bento",
      eyebrow: "What you get",
      heading: "Everything a *$3,000 agency page* has",
      sub: "Except the six-week timeline, the discovery calls and the invoice.",
      items: [
        {
          icon: "◈",
          span: "wide",
          title: "A design system, not a template",
          body: "Fluid type scale, optical sizing, layered surfaces and one consistent motion signature. The quality floor is fixed in code, so no generated page can come out looking cheap.",
        },
        {
          icon: "✎",
          title: "Copy that sells",
          body: "Headlines, section text and SEO metadata written from your brief — not lorem ipsum you have to replace.",
        },
        {
          icon: "◐",
          title: "Your domain, one click",
          body: "Deploy to Vercel with SSL and a global CDN handled for you.",
        },
        {
          icon: "◎",
          title: "Fast by default",
          body: "Statically rendered with optimised fonts and images. Real Core Web Vitals, not just a pretty screenshot.",
        },
        {
          icon: "⌘",
          span: "wide",
          title: "Code you actually own",
          body: "Export the complete Next.js project — components, styles, content, all of it. Host it with us, on Vercel, or anywhere else. No proprietary editor, no subscription you cannot walk away from.",
        },
      ],
    },
    {
      type: "showcase",
      heading: "The design system does the *heavy lifting*",
      body: "Most AI site builders write CSS from scratch on every generation, so quality swings wildly and edits break layouts. Lanply works the other way around: the AI only chooses structure and words. Every visual decision comes from a system built by hand.",
      bullets: [
        "Fluid type scale with optical sizing at display sizes",
        "Consistent vertical rhythm across every section",
        "Scroll motion tuned once, applied everywhere",
        "Accessible contrast in both light and dark modes",
        "Layered surfaces instead of flat blocks of colour",
      ],
    },
    {
      type: "stats",
      items: [
        { value: "6 min", label: "Average time to first draft" },
        { value: "98+", label: "Typical Lighthouse score" },
        { value: "$0", label: "Monthly platform lock-in" },
        { value: "100%", label: "Code ownership" },
      ],
    },
    {
      type: "compare",
      heading: "How it stacks up",
      sub: "The honest version — including where the alternatives beat us.",
      columns: ["Lanply", "Design agency", "DIY builder"],
      rows: [
        { label: "Time to live", values: ["Same day", "4–6 weeks", "A weekend, if it goes well"] },
        { label: "Typical cost", values: ["$250–500", "$2,000–6,000", "$16–40/mo forever"] },
        { label: "Designer-grade output", values: [true, true, false] },
        { label: "Own the source code", values: [true, "Sometimes", false] },
        { label: "Edit without a developer", values: [true, false, true] },
        { label: "Fully bespoke art direction", values: [false, true, false] },
      ],
    },
    {
      type: "testimonial",
      quote:
        "I had quotes between two and four thousand for a single page. I had something better than all of them by the end of the afternoon, and I can still edit it myself without emailing anyone.",
      name: "Amina Diallo",
      role: "Founder, Kettle Coffee Co.",
    },
    {
      type: "features",
      eyebrow: "Details",
      heading: "The small things, *handled*",
      items: [
        { icon: "⚑", title: "SEO out of the box", body: "Titles, descriptions, Open Graph tags and a sitemap generated from your brief." },
        { icon: "◇", title: "Light and dark", body: "Both modes ship, both are contrast-checked. Pick one or offer a toggle." },
        { icon: "▤", title: "Responsive properly", body: "Fluid typography and layout, not three breakpoints with awkward gaps between them." },
        { icon: "✉", title: "Forms that work", body: "Contact and signup forms wired to your inbox, with spam protection included." },
        { icon: "◔", title: "Analytics ready", body: "Drop in Plausible, Fathom or GA with one line — no rebuild needed." },
        { icon: "♿", title: "Accessible by default", body: "Semantic markup, keyboard navigation, and reduced-motion support built in." },
      ],
    },
    {
      type: "pricing",
      heading: "One page. *One price.*",
      sub: "No retainers, no hourly billing, no surprise invoices.",
      plans: [
        {
          name: "Starter",
          price: "$250",
          note: "one-off",
          features: ["One landing page", "AI-written copy", "10 chat edits", "Deploy to Vercel", "Full project folder"],
          cta: { label: "Start with Starter", href: "#" },
        },
        {
          name: "Complete",
          price: "$500",
          note: "one-off",
          featured: true,
          features: [
            "Everything in Starter",
            "Unlimited chat edits for 30 days",
            "Custom domain setup",
            "Contact form + analytics",
            "Light and dark versions",
            "48-hour revision support",
          ],
          cta: { label: "Get Complete", href: "#" },
        },
        {
          name: "Care plan",
          price: "$75",
          note: "/month",
          features: ["Ongoing chat edits", "Hosting managed for you", "Monthly performance check", "Priority support"],
          cta: { label: "Add care plan", href: "#" },
        },
      ],
    },
    {
      type: "faq",
      heading: "Questions, answered",
      items: [
        {
          q: "Do I really own the code?",
          a: "Yes. You get the complete Next.js project folder — components, styles, content and all. Host it with us, on Vercel, or anywhere else. Nothing is locked to our platform.",
        },
        {
          q: "What if I do not like the first draft?",
          a: "Tell the chat what feels wrong and it rebuilds. Most pages land where the client wants them within three or four exchanges, and edits are included in your plan.",
        },
        {
          q: "Can I use my own brand colours and fonts?",
          a: "Yes. Give us a hex code and a font name in the brief and the whole page adapts — every colour and type decision flows from those two inputs.",
        },
        {
          q: "Is this just a template with my text dropped in?",
          a: "No. The sections are hand-built components, but the AI decides which ones your business needs, in what order, and writes the copy for each. Two clients in the same industry get genuinely different pages.",
        },
        {
          q: "What if I need more than one page?",
          a: "Extra pages are $120 each and use the same design system, so the whole site stays consistent. Most clients start with one and add later.",
        },
        {
          q: "How long does it take?",
          a: "The first draft is ready in minutes. Most clients are live on their own domain the same day.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Your page could be live *tonight*",
      sub: "Start with the brief. See the draft before you pay a cent.",
      primary: { label: "Build my page", href: "#" },
      secondary: { label: "Talk to us", href: "#" },
    },
    { type: "wordmark", text: "Lanply" },
    {
      type: "footer",
      logo: "Lanply",
      blurb: "Premium landing pages, generated and edited by AI. Built on code you own.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", href: "#process" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Contact", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ],
        },
      ],
      legal: "© 2026 Lanply. All rights reserved.",
    },
  ],
};
