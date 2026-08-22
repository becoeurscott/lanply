import type { SiteSpec } from "@/lib/spec";

/* Nexus Site's own landing page.

   Model: the page is free to see, hosting is the product. No testimonial or
   stats block appears here on purpose — both need real customers, and invented
   social proof on a live business page is a liability, not a shortcut. */

export const demoSpec: SiteSpec = {
  meta: {
    name: "Nexus Site",
    title: "Nexus Site — a premium website for your business, free to see",
    description:
      "Answer five questions and see a real, designer-grade page for your business at no cost. Keep it live on your own domain for $20 a month. Cancel anytime.",
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
        { label: "Pricing", href: "#pricing" },
        { label: "Add-ons", href: "#addons" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "See my page free", href: "/brief" },
    },
    {
      type: "hero",
      eyebrow: "Free to see · $20 a month to keep",
      headline: "A website that looks expensive. *Free to see it.*",
      sub: "Answer five questions and we build a real page for your business — no cost, no card. Keep it live on your own domain for $20 a month, and cancel whenever you want.",
      primary: { label: "See my page free", href: "/brief" },
      secondary: { label: "How it works", href: "#process" },
      visual: "mockup",
    },
    {
      type: "marquee",
      caption: "Built for",
      items: [
        "Online sellers",
        "Salons",
        "Restaurants",
        "Trades",
        "Clinics",
        "Coaches",
        "Photographers",
        "Consultants",
      ],
    },
    {
      type: "process",
      eyebrow: "How it works",
      heading: "See it first. *Pay later, or never.*",
      sub: "Most people want to know the catch. There isn't one — here is the whole process.",
      steps: [
        {
          title: "Answer five questions",
          body: "Five minutes, plain language. What you sell and who buys it. No design words needed.",
        },
        {
          title: "See your page, free",
          body: "We build a real page for your business and show it to you. No card, no commitment. Do not like it? Walk away.",
        },
        {
          title: "Go live on your domain",
          body: "Pick a plan. We register your domain and a person builds and finishes the final site by hand.",
        },
        {
          title: "We host and maintain it",
          body: "Live in two to three days. Send changes by chat whenever you need them.",
        },
      ],
    },
    {
      type: "bento",
      eyebrow: "What you get",
      heading: "A real website. *Not AI slop.*",
      sub: "You can tell when a site was spat out by a machine. That is the thing we built this to avoid.",
      items: [
        {
          icon: "◈",
          span: "wide",
          title: "A design system built by hand",
          body: "The type scale, spacing, colour and motion were measured off genuinely premium sites and written into code — not guessed at by a model each time. Every page inherits them, so nothing we publish can come out looking cheap.",
        },
        {
          icon: "◐",
          title: "You build nothing",
          body: "No editor to learn, no drag and drop, no dashboard to log into. You answer questions and we do the rest.",
        },
        {
          icon: "⌘",
          title: "Your domain, included",
          body: "We register it, point it and handle the certificate. It stays in your name.",
        },
        {
          icon: "◎",
          title: "Fast on a phone",
          body: "Statically rendered and mobile-first, because that is where most of your visitors actually are.",
        },
        {
          icon: "✎",
          span: "wide",
          title: "Changes by chat, not by ticket",
          body: "New price, new photo, new section, new opening hours — send a message and we change it on the real site. No hourly rate, no waiting on a developer, no learning an interface to fix one word.",
        },
      ],
    },
    {
      type: "compare",
      heading: "How it compares",
      sub: "Including the parts where the alternatives beat us.",
      columns: ["Nexus Site", "Design agency", "Wix / Squarespace"],
      rows: [
        { label: "Time to live", values: ["2–3 days", "4–6 weeks", "Your weekend"] },
        { label: "Cost to see a real design", values: ["Free", "$2,000–6,000", "Free trial"] },
        { label: "Ongoing cost", values: ["$20/mo", "Hosting extra", "$16–40/mo"] },
        { label: "Someone builds it for you", values: [true, true, false] },
        { label: "Change it without a developer", values: [true, false, true] },
        { label: "Fully bespoke art direction", values: [false, true, false] },
      ],
    },
    {
      type: "plans",
      eyebrow: "Pricing",
      heading: "One price. *Cheaper if you stay.*",
      sub: "Everything is included at every term. The only thing that changes is how long you commit.",
      terms: [
        {
          id: "monthly",
          label: "Monthly",
          rate: "$20",
          unit: "/month",
          billed: "Billed monthly. Cancel anytime.",
          intro: "First month $5",
          credits: "3 changes a month",
          cta: { label: "Start 7 days free", href: "/brief" },
        },
        {
          id: "3mo",
          label: "3 months",
          rate: "$17",
          unit: "/month",
          billed: "$51 billed upfront.",
          save: "Save $9",
          credits: "4 changes a month",
          cta: { label: "Start 7 days free", href: "/brief" },
        },
        {
          id: "6mo",
          label: "6 months",
          rate: "$15",
          unit: "/month",
          billed: "$90 billed upfront.",
          save: "Save $30",
          credits: "6 changes a month",
          cta: { label: "Start 7 days free", href: "/brief" },
        },
        {
          id: "12mo",
          label: "12 months",
          rate: "$12",
          unit: "/month",
          billed: "$144 billed upfront.",
          save: "Save $96",
          featured: true,
          credits: "10 changes a month",
          cta: { label: "Start 7 days free", href: "/brief" },
        },
      ],
      includes: [
        "Your domain registered and renewed",
        "Hosting, SSL and global delivery",
        "Mobile version, built properly",
        "Changes by chat, no developer needed",
        "Visitor analytics",
        "7 days free, then cancel anytime",
      ],
      note: "Seven days free on every plan. Prefer to own the code outright? Buy the project for $299 and take it anywhere.",
    },
    {
      type: "addons",
      eyebrow: "Add-ons",
      heading: "Add only what you *actually need*",
      sub: "Start at $20 and bolt on the rest as the business grows. Every add-on can be cancelled on its own.",
      groups: [
        {
          title: "Selling online",
          items: [
            { name: "Payment links", price: "$10/mo", note: "Stripe, PayPal or your local provider" },
            { name: "Product catalogue", price: "$15/mo", note: "Browse and order by WhatsApp" },
            { name: "Full store", price: "$35/mo", note: "Cart, checkout and stock" },
            { name: "Product photo cleanup", price: "$49", note: "Per 20 images, backgrounds removed" },
          ],
        },
        {
          title: "Getting more customers",
          items: [
            { name: "Booking and appointments", price: "$12/mo" },
            { name: "Automation", price: "$15/mo", note: "Email follow-up, CRM, WhatsApp alerts" },
            { name: "SEO setup and monthly report", price: "$18/mo" },
            { name: "Blog", price: "$12/mo" },
            { name: "Second language", price: "$10/mo" },
          ],
        },
        {
          title: "Brand and content",
          items: [
            { name: "Logo and brand kit", price: "$99", note: "One-off" },
            { name: "Copywriting refresh", price: "$79", note: "One-off" },
            { name: "Extra page", price: "$8/mo", note: "About, services, gallery, contact" },
          ],
        },
        {
          title: "Running the business",
          items: [
            { name: "Business email", price: "$6/mo", note: "you@yourdomain" },
            { name: "Priority support", price: "$15/mo", note: "Same-day changes" },
            { name: "Extra changes", price: "$9", note: "Pack of 5" },
            { name: "Buy the project outright", price: "$299", note: "Full code, host it anywhere" },
          ],
        },
      ],
    },
    {
      type: "faq",
      heading: "The questions everyone asks",
      items: [
        {
          q: "What is the catch with the free page?",
          a: "There isn't one, but here is exactly how it works. Showing you a page costs us very little, so we do it for free to prove the quality before asking for money. You only pay when you want it live on your own domain. If you never subscribe, you are never charged, and we keep your page for 30 days in case you change your mind.",
        },
        {
          q: "Do I own the site?",
          a: "While you subscribe, we host and maintain it and the domain stays in your name. If you want the code itself, buy the project outright for $299 and take the whole repository anywhere you like. Otherwise, cancelling ends the hosting and the site goes offline.",
        },
        {
          q: "What happens if I cancel?",
          a: "Your plan stops renewing and the site goes offline at the end of the period you have paid for. Prepaid terms are not refunded, so if you want to test the water first, start on monthly and switch later.",
        },
        {
          q: "How long until my site is live?",
          a: "You see the free page straight away. Once you subscribe, the finished site is live on your domain in two to three days, because a person builds and checks it rather than a script publishing it instantly.",
        },
        {
          q: "Is this just AI slop?",
          a: "No. The layout, typography, spacing and motion come from a design system written by hand, and a person finishes every site before it goes live. AI helps draft the first version of the words. It does not make the design decisions.",
        },
        {
          q: "Can I use a domain I already own?",
          a: "Yes. We point it at your site and set up the certificate at no extra cost. If you do not have one, we register it for you and it is included in the price.",
        },
        {
          q: "I sell products. Can I take payments?",
          a: "Yes. Add payment links for $10 a month if you already use Stripe, PayPal or a local provider, or a full store with cart, checkout and stock for $35 a month. If you just want people to order by WhatsApp, the product catalogue is $15 a month.",
        },
        {
          q: "What counts as one change?",
          a: "One request. A new price, a swapped photo, a rewritten paragraph or a whole new section each count as one. Plans include between three and ten a month, unused ones roll over, and extra packs are $9 for five.",
        },
      ],
    },
    {
      type: "cta",
      heading: "See your page before you *pay anything*",
      sub: "Five questions. No card. If you do not like what we build, you have lost five minutes.",
      primary: { label: "See my page free", href: "/brief" },
      secondary: { label: "Read the FAQ", href: "#faq" },
    },
    { type: "wordmark", text: "Nexus Site" },
    {
      type: "footer",
      logo: "Nexus Site",
      blurb: "Premium websites for small businesses. Free to see, $20 a month to keep live.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", href: "#process" },
            { label: "Pricing", href: "#pricing" },
            { label: "Add-ons", href: "#addons" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Contact", href: "#" },
            { label: "Support", href: "#" },
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
      legal: "© 2026 Nexus Site. All rights reserved.",
    },
  ],
};
