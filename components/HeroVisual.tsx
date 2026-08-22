import { Card } from "@/components/ui";

/* Hero visual, drawn in code rather than illustrated.

   Deliberately not an image: it renders from the same tokens as the rest of
   the page, so it restyles itself when the accent changes, stays sharp at any
   density, and costs nothing to ship. It abstracts a page rather than faking
   a screenshot — no invented client, no unreadable generated text. */

function Bar({ w, h = 8, accent = false }: { w: string; h?: number; accent?: boolean }) {
  return (
    <div
      className="rounded-full"
      style={{
        width: w,
        height: h,
        background: accent ? "var(--accent)" : "var(--ink)",
        opacity: accent ? 1 : 0.14,
      }}
    />
  );
}

function MiniCard() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-line bg-bg p-3">
      <div className="mb-1 size-5 rounded-md" style={{ background: "var(--ink)", opacity: 0.1 }} />
      <Bar w="70%" h={6} />
      <Bar w="90%" h={5} />
      <Bar w="55%" h={5} />
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative">
      <Card className="overflow-hidden !p-0">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2.5 rounded-full"
                style={{ background: "var(--ink)", opacity: 0.16 }}
              />
            ))}
          </div>
          <div
            className="ml-2 h-5 flex-1 rounded-full"
            style={{ background: "var(--ink)", opacity: 0.06 }}
          />
        </div>

        {/* abstracted page */}
        <div className="px-6 pt-7 pb-8 sm:px-10 sm:pt-10 sm:pb-12">
          <div className="flex items-center justify-between">
            <Bar w="72px" h={9} />
            <div className="hidden items-center gap-4 sm:flex">
              <Bar w="42px" h={6} />
              <Bar w="42px" h={6} />
              <Bar w="42px" h={6} />
              <div
                className="h-6 w-16 rounded-full"
                style={{ background: "var(--accent)", opacity: 0.9 }}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3.5 text-center sm:mt-14">
            <div
              className="h-5 w-28 rounded-full border"
              style={{ borderColor: "var(--line)" }}
            />
            <div className="mt-2 flex w-full flex-col items-center gap-2.5">
              <Bar w="min(78%, 420px)" h={18} />
              <Bar w="min(58%, 320px)" h={18} />
            </div>
            <div className="mt-2 flex w-full flex-col items-center gap-2">
              <Bar w="min(52%, 300px)" h={7} />
              <Bar w="min(40%, 230px)" h={7} />
            </div>
            <div className="mt-4 flex gap-2.5">
              <div className="h-8 w-28 rounded-full" style={{ background: "var(--accent)" }} />
              <div className="h-8 w-24 rounded-full border" style={{ borderColor: "var(--line)" }} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-14">
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
      </Card>

      {/* phone, overlapping — shows the mobile version exists without a second section */}
      <div
        className="absolute -right-2 -bottom-6 hidden w-[132px] rounded-[22px] border border-line bg-bg-card p-2 shadow-2xl shadow-black/40 sm:block"
        aria-hidden
      >
        <div className="rounded-[15px] border border-line bg-bg px-3 py-4">
          <div className="flex items-center justify-between">
            <Bar w="34px" h={5} />
            <div className="flex flex-col gap-[3px]">
              <div className="h-px w-3" style={{ background: "var(--ink)", opacity: 0.3 }} />
              <div className="h-px w-3" style={{ background: "var(--ink)", opacity: 0.3 }} />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-1.5">
            <Bar w="100%" h={9} />
            <Bar w="72%" h={9} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <Bar w="90%" h={4} />
            <Bar w="64%" h={4} />
          </div>
          <div className="mt-4 h-6 w-full rounded-full" style={{ background: "var(--accent)" }} />
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-8 rounded-md border border-line" />
            <div className="h-8 rounded-md border border-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
