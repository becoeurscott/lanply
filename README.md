# Nexus Site

Premium websites for small businesses. **Free to see, $20/month to keep live.**

A visitor answers five questions and immediately sees a real page for their
business at no cost. If they want it on their own domain, they subscribe — and
a person builds, finishes and deploys the final site by hand within 2–3 days.

This is a productized service with a subscription wrapper, not a self-serve
site builder. Customers never log into an editor.

## The model

| | |
|---|---|
| Free preview | Automated, ~$0.10 in API cost, no human time |
| Base plan | $20/mo — domain, hosting, SSL, CDN, changes by chat |
| Term discounts | $17 (3mo) · $15 (6mo) · **$12 (12mo)** |
| Trial | 7 days free, cancel anytime |
| Add-ons | Payments, store, booking, automation, SEO, logo, email |
| Buyout | $299 one-off for the full repository |

The free preview exists so no human hours are spent before payment. Prepaid
terms are what make the manual build economically viable — a $144 annual plan
covers a build immediately.

## Architecture

The AI never writes CSS. It emits a schema-validated **SiteSpec**; a
deterministic renderer turns that into a page using hand-built blocks.

```
brief ──▶ Claude ──▶ SiteSpec (JSON) ──▶ Renderer ──▶ page
```

Quality is bounded by the block library, not by the model. Malformed output
fails validation instead of producing a broken page.

## Layout

```
app/globals.css          Design tokens — type scale, rhythm, motion, palette
app/brief/               Five-question intake
app/api/generate/        brief -> SiteSpec (claude-opus-5, zod-validated)
app/p/[id]/              Renders any stored spec
lib/spec.ts              SiteSpec types — the renderer's contract
lib/site-schema.ts       Zod mirror — the model's output contract
lib/demo-spec.ts         Nexus Site's own landing page
lib/store.ts             File-backed spec store (replace before production)
components/blocks/       18 hand-built premium sections
components/Renderer.tsx  spec.blocks -> React
```

## Run

```bash
npm install
npm run dev
```

Generation needs a key:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
```

## Design system

Encoded in `app/globals.css`, so every page inherits it:

1. **Tight tracking on large type** — −0.047em at display size, −0.05em on mobile
2. **Optical sizing** — Inter's `opsz` axis, so headings use the display cut
3. **Moderate heading sizes, small body** — 64px/14px desktop, 40px/14px mobile.
   The contrast does the work, not absolute size
4. **Weight 500 on headings**, not 600
5. **Layered near-blacks** — `#070707` → `#111010` → `#1a1918`
6. **One motion signature** — 600ms, `cubic-bezier(0.16,1,0.3,1)`, 70ms stagger
7. **12px card radius against 40px pills** — deliberate contrast

## Content rules

No fabricated testimonials, customer names, or statistics — on this page or any
generated one. The `testimonial` and `stats` blocks stay out of the landing page
until there are real customers to quote.

## Not built yet

- Accounts, Stripe subscriptions, trial and term billing
- Customer dashboard: build status, ETA, credit balance
- Modification chat with GitHub repo access
- Admin build queue

Until these exist, everything after "go live" is manual. `lib/store.ts` writes
to disk and will not survive on Vercel — that needs a database first.
