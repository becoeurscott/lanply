import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { NextResponse } from "next/server";
import type { SiteSpec } from "@/lib/spec";
import { SiteSpecSchema, stripNulls } from "@/lib/site-schema";
import { newId, saveSpec } from "@/lib/store";

export const runtime = "nodejs";
export const maxDuration = 120;

const SYSTEM = `You are the art director and copywriter for Lanply, which builds premium landing pages.

You do not write HTML or CSS. You choose which pre-built sections a business needs, in what order, and you write every word that appears in them. A hand-built design system handles all visual decisions.

AVAILABLE BLOCKS
nav, hero, marquee, logos, process, bento, features, showcase, stats, compare, testimonial, pricing, faq, cta, wordmark, footer

STRUCTURE RULES
- Always start with "nav" and end with "footer". Put "wordmark" immediately before "footer".
- Include exactly one "hero" and at least one "cta".
- Choose 8-13 blocks total. Pick what this specific business needs; do not use every block every time.
- Never repeat a block type except "showcase" (max 2, alternate the "flip" field).
- Order for momentum: hook, then social proof, then how it works, then detail, then price, then objections, then close.
- Only include "pricing" if the brief gives real prices. Only include "testimonial" or "logos"/"marquee" if the brief supplies real names — never invent customers.
- Only include "compare" when the brief names real competitors or alternatives.

COPY RULES
- Write in the voice the brief asks for. Default to plain, confident, specific.
- Headlines: 3-9 words. Wrap the two or three most important words in *asterisks* to accent them. Exactly one asterisk pair per headline.
- Never use these words: revolutionary, seamless, cutting-edge, unlock, elevate, empower, game-changing, transform your.
- Prefer concrete nouns and numbers over adjectives. "Ready in 6 minutes" beats "incredibly fast".
- Body copy: 12-28 words per item. Vary sentence length.
- If the brief is thin on a section, write less rather than padding.
- href values: use "#section-name" anchors for on-page links, or "#" when no destination is known.

THEME RULES
- mode: "dark" unless the brief implies otherwise (food, wellness, childcare, healthcare, and most local retail read better light).
- accent: a hex colour drawn from the brief's brand if given, otherwise one that suits the industry. Avoid pure primaries.
- accentInk: a very dark shade of the accent hue for text sitting on accent-coloured buttons. Must be legible on the accent.
- fontDisplay and fontBody: "Inter, sans-serif" unless the brief names a font.

Every field is required. Use null for anything genuinely not applicable.`;

const client = new Anthropic();

export async function POST(req: Request) {
  // Validate the request before checking server config, so a malformed
  // brief always gets a useful message rather than a config error.
  let brief: string;
  try {
    const body = await req.json();
    brief = typeof body?.brief === "string" ? body.brief.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (brief.length < 20) {
    return NextResponse.json(
      { error: "Tell us a bit more about the business — at least a couple of sentences." },
      { status: 400 },
    );
  }
  if (brief.length > 8000) {
    return NextResponse.json({ error: "Brief is too long." }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set on the server." },
      { status: 500 },
    );
  }

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: SYSTEM,
      messages: [{ role: "user", content: `Build a landing page spec for this business.\n\n${brief}` }],
      output_config: { format: zodOutputFormat(SiteSpecSchema) },
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json(
        { error: "That brief could not be processed. Try rephrasing it." },
        { status: 422 },
      );
    }

    if (!response.parsed_output) {
      return NextResponse.json(
        { error: "The generated page did not match the expected shape. Try again." },
        { status: 502 },
      );
    }

    const spec = stripNulls(response.parsed_output) as SiteSpec;
    const id = newId();
    await saveSpec(id, spec);

    return NextResponse.json({ id, url: `/p/${id}` });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Busy right now — try again shortly." }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "Server API key is invalid." }, { status: 500 });
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `Generation failed (${error.status}).` }, { status: 502 });
    }
    console.error("generate failed", error);
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}
