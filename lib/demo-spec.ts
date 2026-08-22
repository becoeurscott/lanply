import type { SiteSpec } from "@/lib/spec";

/* Nexus Site's own landing page.

   Copy is the client's own, implemented as written. Deliberately no
   testimonial or stats-of-results block: both need real customers, and
   invented social proof on a live business page is a liability. */

export const demoSpec: SiteSpec = {
  meta: {
    name: "Nexus Site",
    title: "Nexus Site — premium business websites without the agency bill",
    description:
      "We build your premium business website for $0 upfront. Start with 7 days free, then $9.99 for your first month, then $20/month. Cancel future renewals anytime.",
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
        { label: "What you get", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Get My Website", href: "/brief" },
    },
    {
      type: "hero",
      eyebrow: "7 days free · then $9.99 first month",
      headline: "Your business deserves better than an *AI-looking website*",
      sub: "We build your premium business website for $0 upfront. No expensive agency bill, no complicated website builder, no generic AI template — just a professional, conversion-focused site designed around your business, your customers and your goals.",
      primary: { label: "Get My Website", href: "/brief" },
      secondary: { label: "See how it works", href: "#process" },
      note: "Hosting and domain are the only core costs. Cancel future renewals anytime.",
      visual: "mockup",
    },
    {
      type: "versus",
      eyebrow: "First impressions",
      heading: "Look professional. *Get taken seriously.*",
      sub: "Your website is often the first impression people have of your business. It should make them think one of these things, not the other.",
      leftLabel: "“Made by AI in five minutes.”",
      leftPoints: [
        "Rainbow gradients doing the job typography should be doing",
        "Five colours competing, so nothing is actually emphasised",
        "Emoji standing in for art direction",
        "Everything crammed together with no breathing room",
        "Body text too small to read on a phone",
      ],
      rightLabel: "“These people are professional.”",
      rightPoints: [
        "Strategic structure, planned before anything is designed",
        "Premium design with one accent colour, used on purpose",
        "Conversion-focused content that moves visitors toward action",
        "Generous space between sections so the eye can rest",
        "Human-directed quality, checked before it goes live",
      ],
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
      heading: "A website built around your business — *not a template*",
      sub: "You don't need to learn WordPress. You don't need to understand hosting. You don't need to become a designer. You tell us about your business, and we handle the rest.",
      steps: [
        {
          title: "Tell us about your business",
          body: "Give us your business name, services, target customers and goals.",
        },
        {
          title: "We build your website",
          body: "We create the structure, messaging and visual experience around your business.",
        },
        {
          title: "Review your site",
          body: "See your website and request changes before launch.",
        },
        {
          title: "Go live",
          body: "Connect your domain and launch your new website.",
        },
        {
          title: "We keep it running",
          body: "Hosting, maintenance and support stay with Nexus Site.",
        },
      ],
    },
    {
      type: "features",
      eyebrow: "What you get",
      heading: "Everything your business needs *to be taken seriously*",
      items: [
        {
          icon: "◈",
          title: "Premium website design",
          body: "A modern website designed specifically for your business.",
        },
        {
          icon: "◎",
          title: "Conversion-focused structure",
          body: "Clear sections, calls-to-action and contact paths designed to move visitors toward action.",
        },
        {
          icon: "▤",
          title: "Mobile-first experience",
          body: "Your website looks great on phones, tablets and desktops.",
        },
        {
          icon: "✎",
          title: "Professional content",
          body: "Clear messaging that explains what you do, who you help and why customers should choose you.",
        },
        {
          icon: "⚑",
          title: "SEO foundation",
          body: "Search-friendly structure, metadata and essential technical SEO setup.",
        },
        {
          icon: "◐",
          title: "Fast, secure hosting",
          body: "Your website stays online with SSL and managed hosting.",
        },
        {
          icon: "⌘",
          title: "Domain connection",
          body: "Use your own business domain, or get help choosing one.",
        },
        {
          icon: "◔",
          title: "Ongoing maintenance",
          body: "Your website doesn't get abandoned after launch.",
        },
        {
          icon: "◇",
          title: "Human-directed quality",
          body: "Technology helps us work faster. Your final website still needs to look, feel and read like a real business.",
        },
      ],
    },
    {
      type: "showcase",
      heading: "Stop paying thousands *for a website*",
      body: "Traditional agencies can turn a simple business website into a major project. Nexus Site keeps the model simple: one website, one subscription.",
      bullets: [
        "Design fees",
        "Development fees",
        "Monthly maintenance",
        "Hosting",
        "Updates",
        "Then another invoice when you need a change",
      ],
    },
    {
      type: "stats",
      items: [
        { value: "$0", label: "Website design & setup" },
        { value: "$0", label: "Development fee" },
        { value: "$0", label: "Setup fee" },
        { value: "$20/mo", label: "Hosting + website service" },
      ],
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
        "Website design and setup included",
        "Fast, secure managed hosting with SSL",
        "Connect your own domain, or get help choosing one",
        "Mobile-first build",
        "SEO foundation",
        "Ongoing maintenance and support",
      ],
      note: "Prepaid plans reduce your effective monthly price. Future renewals can be cancelled anytime. Domain registration is priced separately according to the domain extension you choose.",
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
              price: "+$9/mo",
              note: "Let customers book appointments directly. For salons, barbers, consultants, coaches, photographers and service providers.",
            },
            {
              name: "Business Automation",
              price: "+$19/mo",
              note: "Capture leads, send notifications, trigger follow-ups and connect your forms to your tools.",
            },
          ],
        },
        {
          title: "Brand identity",
          items: [
            {
              name: "Professional Logo",
              price: "$49",
              note: "One-time. A brand identity that matches the quality of your business.",
            },
            {
              name: "Brand Kit",
              price: "$99",
              note: "One-time. Logo, colour palette, typography and basic brand guidelines.",
            },
          ],
        },
      ],
    },
    {
      type: "bento",
      eyebrow: "Built for real businesses",
      heading: "Your website should *work while you do*",
      sub: "A website isn't just a digital business card. It should answer questions, build trust, show what you offer, make contacting you easy, and turn visitors into customers.",
      items: [
        {
          span: "wide",
          title: "“I need customers.”",
          body: "Your website clearly communicates what you offer and gives visitors an obvious next step.",
        },
        {
          title: "“I need to look professional.”",
          body: "Your site presents your business like an established brand.",
        },
        {
          title: "“I don't have time to build a website.”",
          body: "We handle the technical work.",
        },
        {
          title: "“I don't want to spend thousands.”",
          body: "Your website design and setup are included.",
        },
        {
          span: "wide",
          title: "“I might need more later.”",
          body: "Start with the essentials and add booking, automation, branding and other features when you need them.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Build an online presence your customers *can trust*",
      sub: "Your domain is waiting. Your customers are searching. Let's give them somewhere worth landing. Premium website, $0 upfront, $9.99 first month, $20/month after. Cancel future renewals anytime.",
      primary: { label: "Start my 7-day free trial", href: "/brief" },
      secondary: { label: "Read the FAQ", href: "#faq" },
    },
    {
      type: "faq",
      heading: "Frequently asked questions",
      items: [
        {
          q: "Is the website really free?",
          a: "Your website design and initial setup are included at no upfront design or development charge. Nexus Site charges for the website service, hosting and related infrastructure.",
        },
        {
          q: "Do I need to know how to build websites?",
          a: "No. Tell us about your business and we handle the website creation.",
        },
        {
          q: "Can I use my own domain?",
          a: "Yes. You can connect your existing domain or purchase a new one.",
        },
        {
          q: "What happens after the 7-day trial?",
          a: "Your first paid month is $9.99. After the first month, the standard monthly price is $20 unless you choose a prepaid savings plan.",
        },
        {
          q: "Can I cancel?",
          a: "Yes. You can cancel future renewals at any time. Prepaid plans are subject to their stated refund terms.",
        },
        {
          q: "Can I add booking later?",
          a: "Yes. You can start with the website and add features such as booking and automation whenever your business needs them.",
        },
        {
          q: "Is the website generated entirely by AI?",
          a: "Technology may assist our process, but Nexus Site is not selling an untouched AI-generated template. The goal is a polished website built around your business and its customers.",
        },
        {
          q: "Can you redesign my existing website?",
          a: "Yes. Nexus Site can offer website redesign as part of the service.",
        },
        {
          q: "What kind of businesses can use Nexus Site?",
          a: "Almost any business that needs a professional online presence, including service businesses, restaurants, professionals, consultants, startups, creators and local businesses.",
        },
      ],
    },
    { type: "wordmark", text: "Nexus Site" },
    {
      type: "footer",
      logo: "Nexus Site",
      blurb: "Your business. Your brand. Your website. Premium websites without the premium agency bill.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", href: "#process" },
            { label: "What you get", href: "#features" },
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
