# Lanply

AI-generated premium landing pages. Client fills a brief, AI produces a **site
spec**, a deterministic renderer turns that spec into a real Next.js site, and
the client refines it by chatting. Output deploys to Vercel or ships as a
project folder the client owns.

## The core idea

The AI never writes CSS. It only produces this:

```
brief ──▶ AI ──▶ SiteSpec (JSON, ~1-2k tokens) ──▶ Renderer ──▶ Next.js site
                      ▲                                              │
                      └────────── chat edit mutates spec ────────────┘
```

Why this matters:

| Free-form AI codegen | Spec-driven (this) |
| --- | --- |
| Quality varies per generation | Quality floor is fixed by the block library |
| Edits can break layout | Edits cannot break layout |
| Full regeneration per edit (~$$) | Small JSON diff per edit (~$0.001) |
| Nothing compounds | Every new block improves every future site |

## Layout

```
app/globals.css        Design tokens — type scale, rhythm, motion, palette
lib/spec.ts            SiteSpec schema — the AI's only output contract
lib/demo-spec.ts       Example spec (also Lanply's own landing page)
components/Renderer.tsx  spec.blocks -> React
components/blocks/     The asset: hand-built premium sections
components/ui.tsx      Section / Button / Card / Eyebrow primitives
components/Reveal.tsx  Shared scroll-motion signature
```

## Run

```
npm install
npm run dev
```

## What makes the output read as "premium"

These are encoded in `globals.css` and the blocks, so every generated site gets
them for free:

1. **Tight tracking on large type** (`-0.035em` at display size). The single
   strongest signal of paid design work.
2. **Fluid type scale** via `clamp()` — no breakpoint jumps.
3. **Generous vertical rhythm** — sections at `clamp(5rem, 8vw, 9.5rem)`.
4. **Restrained palette** — two neutrals, one accent, borders at ~9% opacity.
5. **One motion signature** — 0.6s, `cubic-bezier(0.16,1,0.3,1)`, 70ms stagger.
6. **1200px container** — wider starts reading like a dashboard.
7. **Ambient accent glow** at 16% opacity behind hero and final CTA.

## Roadmap

- [ ] Intake form (`/brief`) — the client-facing questionnaire
- [ ] `POST /api/generate` — brief -> SiteSpec via Claude, schema-validated
- [ ] `POST /api/edit` — chat message + current spec -> patched spec
- [ ] Preview route `/p/[id]` rendering any stored spec
- [ ] Exporter — spec -> zipped standalone Next.js project
- [ ] Vercel deploy integration
- [ ] More blocks: gallery, team, timeline, contact form, blog index
