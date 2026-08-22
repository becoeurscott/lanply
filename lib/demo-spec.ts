import type { SiteSpec } from "@/lib/spec";

/* Nexus Site's own landing page.

   Positioning: a managed premium website service — strategy, design, copy,
   development, hosting and support on one subscription. How the work gets
   produced internally is not customer-facing and is never mentioned here.

   Two standing rules for this file:
   - No testimonial or results-stat block until there are real customers.
     Invented social proof on a live business page is a liability.
   - Never say "free website" — the customer pays for the service. Say
     "$0 design and setup fee" and state the price plainly. */

export const demoSpec: SiteSpec = {
  meta: {
    name: "Nexus Site",
    title: "Nexus Site — premium websites for businesses, without the agency price",
    description:
      "Premium website design, hosting and ongoing support on one simple subscription. $0 design and setup fee — 7 days free, then $9.99 your first month, $20/month after.",
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
      logo: "Nexus Site",
      links: [
        { label: "How it works", href: "#process" },
        { label: "What's included", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Get My Website", href: "/brief" },
    },
    {
      type: "hero",
      eyebrow: "$0 design & setup fee",
      headline: "A website that looks like it was *built for your business*",
      sub: "Premium website design, hosting and ongoing support. One simple subscription.",
      primary: { label: "Get My Website", href: "/brief" },
      secondary: { label: "See how it works", href: "#process" },
      note: "7 days free, then $9.99 your first month and $20/month after. Domain priced separately. Cancel future renewals anytime.",
      visual: "mockup",
    },
    {
      type: "marquee",
      caption: "Built for businesses that want to grow",
      items: [
        "Local businesses",
        "Service businesses",
        "Restaurants",
        "Consultants",
        "Creators",
        "Professionals",
        "Startups",
        "Agencies",
        "Entrepreneurs",
      ],
    },
    {
      type: "process",
      eyebrow: "How it works",
      heading: "You tell us about your business. *We handle the rest.*",
      sub: "No builder to learn, no hosting to understand, no designer to hire.",
      steps: [
        {
          title: "Tell us about your business",
          body: "Your name, services, customers and goals. Five minutes, plain language.",
        },
        {
          title: "We create your website",
          body: "Strategy, structure, design and copy — built around what you actually sell.",
        },
        {
          title: "You review it",
          body: "See your website and request changes before anything goes live.",
        },
        {
          title: "We launch it",
          body: "We connect your domain and put your site online.",
        },
        {
          title: "We host and maintain it",
          body: "Hosting, updates and support stay with us. Need a change? Ask.",
        },
      ],
    },
    {
      type: "versus",
      eyebrow: "The difference",
      heading: "Built for your business. *Not for anyone's.*",
      sub: "Most cheap websites are a stock layout with a new logo dropped in. Your customers can tell.",
      leftLabel: "A generic template",
      leftPoints: [
        "Stock layout with your logo dropped into it",
        "Colours that belong to somebody else's brand",
        "Copy that could describe any business in your industry",
        "Everything crowded together with no breathing room",
        "Text too small to read comfortably on a phone",
      ],
      rightLabel: "Built for your business",
      rightPoints: [
        "Structure planned around what you actually sell",
        "One accent colour, chosen for your brand",
        "Copy written about your customers and your offer",
        "Generous space so the important things stand out",
        "Checked line by line before it launches",
      ],
    },
    {
      type: "features",
      eyebrow: "What's included",
      heading: "Six things, *one subscription*",
      sub: "Everything an agency would quote you for, without the quote.",
      items: [
        {
          icon: "target",
          title: "Strategy",
          body: "We work out what your site needs to say, to whom, and in what order — before anything is designed.",
        },
        {
          icon: "layout",
          title: "Design",
          body: "A premium, modern design made for your business, not adapted from a stock layout.",
        },
        {
          icon: "pen",
          title: "Copy",
          body: "Clear messaging that explains what you do, who you help and why customers should choose you.",
        },
        {
          icon: "code",
          title: "Development",
          body: "Built properly: fast, mobile-first, and search-friendly from the first day.",
        },
        {
          icon: "shield",
          title: "Hosting",
          body: "Fast, secure managed hosting with SSL. Your website stays online and we keep an eye on it.",
        },
        {
          icon: "refresh",
          title: "Support",
          body: "Your website doesn't get abandoned after launch. Need something changed? Just ask.",
        },
      ],
    },
    {
      type: "showcase",
      heading: "Stop paying thousands *for a website*",
      body: "Traditional agencies turn a simple business website into a major project — design fees, development fees, maintenance, hosting, then another invoice every time you need a change. We keep it to one line.",
      visual: "cost",
    },
    {
      type: "plans",
      eyebrow: "Pricing",
      heading: "One website. *One simple subscription.*",
      sub: "Monthly gives you maximum flexibility. Prepaying gives you a lower effective monthly rate.",
      terms: [
        {
          id: "monthly",
          label: "Monthly",
          rate: "$20",
          unit: "/mo",
          billed: "Maximum flexibility. Billed monthly.",
          intro: "7 days free, then $9.99 first month",
          cta: { label: "Choose Monthly", href: "/brief" },
        },
        {
          id: "3mo",
          label: "3 months",
          rate: "$18",
          unit: "/mo",
          billed: "$54 billed upfront.",
          save: "Save $6",
          cta: { label: "Choose 3 Months", href: "/brief" },
        },
        {
          id: "6mo",
          label: "6 months",
          rate: "$17",
          unit: "/mo",
          billed: "$102 billed upfront.",
          save: "Save $18",
          cta: { label: "Choose 6 Months", href: "/brief" },
        },
        {
          id: "9mo",
          label: "9 months",
          rate: "$16",
          unit: "/mo",
          billed: "$144 billed upfront.",
          save: "Save $36",
          cta: { label: "Choose 9 Months", href: "/brief" },
        },
        {
          id: "12mo",
          label: "12 months",
          rate: "$15",
          unit: "/mo",
          billed: "$180 billed upfront.",
          save: "Save $60",
          featured: true,
          cta: { label: "Best Value", href: "/brief" },
        },
      ],
      includes: [
        "$0 design and setup fee",
        "Strategy, design, copy and development",
        "Fast, secure managed hosting with SSL",
        "Connect your own domain, or get help choosing one",
        "Ongoing maintenance and support",
        "7 days free, cancel future renewals anytime",
      ],
      note: "Prepaid plans reduce your effective monthly price. Domain registration is priced separately according to the extension you choose.",
    },
    {
      type: "addons",
      eyebrow: "Add-ons",
      heading: "Need more *than a website?*",
      sub: "Start simple. Add what your business actually needs, whenever it needs it.",
      groups: [
        {
          title: "Grow your business",
          items: [
            {
              name: "Online Booking",
              icon: "calendar",
              price: "+$9/mo",
              note: "Customers book appointments straight from your website.",
            },
            {
              name: "Business Automation",
              icon: "workflow",
              price: "+$19/mo",
              note: "Capture leads, send notifications and trigger follow-ups.",
            },
          ],
        },
        {
          title: "Brand identity",
          items: [
            {
              name: "Professional Logo",
              icon: "hexagon",
              price: "$49",
              note: "One-time.",
            },
            {
              name: "Brand Kit",
              icon: "palette",
              price: "$99",
              note: "One-time. Logo, colours, typography and basic guidelines.",
            },
          ],
        },
      ],
    },
    {
      type: "cta",
      heading: "Give your customers somewhere *worth landing*",
      sub: "$0 design and setup fee. 7 days free, then $9.99 your first month and $20/month after. Cancel future renewals anytime.",
      primary: { label: "Get My Website", href: "/brief" },
      secondary: { label: "Read the FAQ", href: "#faq" },
    },
    {
      type: "faq",
      heading: "Frequently asked questions",
      items: [
        {
          q: "What does $0 upfront actually mean?",
          a: "There is no design or setup fee. You pay for the website service, hosting and support: 7 days free, $9.99 for your first month, then $20 a month, or less on a prepaid plan.",
        },
        {
          q: "Do I need to know anything technical?",
          a: "No. Tell us about your business and we handle the design, the build, the launch and the hosting.",
        },
        {
          q: "Can I use my own domain?",
          a: "Yes. Connect a domain you already own, or we can help you choose and register a new one. Domain registration is priced separately by extension.",
        },
        {
          q: "Can I cancel?",
          a: "Yes. You can cancel future renewals at any time. Prepaid plans are subject to their stated refund terms.",
        },
        {
          q: "Can I add booking or automation later?",
          a: "Yes. Start with the website and add features whenever your business needs them.",
        },
        {
          q: "Can you redesign my existing website?",
          a: "Yes. Website redesign is part of the service.",
        },
      ],
    },
    { type: "wordmark", text: "Nexus Site" },
    {
      type: "footer",
      logo: "Nexus Site",
      blurb: "Premium websites for businesses. Without the agency price.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", href: "#process" },
            { label: "What's included", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Add-ons", href: "#addons" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Get started", href: "/brief" },
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
      legal: "Nexus Site © 2026",
    },
  ],
};
