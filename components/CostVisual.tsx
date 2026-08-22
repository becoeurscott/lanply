/* The agency-invoice pile against one subscription line.

   Amounts are illustrative of typical agency line items, not quotes from
   any named firm — the section copy already frames them as "traditional
   agencies can turn a simple website into a major project". */

const INVOICES = [
  { label: "Design fee", amount: "$1,800" },
  { label: "Development", amount: "$2,400" },
  { label: "Maintenance", amount: "$120/mo" },
  { label: "Hosting", amount: "$25/mo" },
  { label: "Change request", amount: "$350" },
];

function Row({ label, amount, dim = false }: { label: string; amount: string; dim?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-xs" style={{ color: "var(--ink-muted)", opacity: dim ? 0.55 : 1 }}>
        {label}
      </span>
      <span className="font-display text-xs font-medium tabular-nums" style={{ opacity: dim ? 0.55 : 0.9 }}>
        {amount}
      </span>
    </div>
  );
}

export function CostVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* the pile */}
      <div className="relative">
        {/* stacked paper behind, to read as "more invoices coming" */}
        <div
          className="absolute inset-x-3 -top-2 h-full rounded-card border border-line"
          style={{ background: "var(--bg-raise)", opacity: 0.5 }}
          aria-hidden
        />
        <div
          className="absolute inset-x-1.5 -top-1 h-full rounded-card border border-line"
          style={{ background: "var(--bg-raise)", opacity: 0.75 }}
          aria-hidden
        />
        <div className="relative rounded-card border border-line bg-bg-card p-5">
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--ink-muted)" }}>
            The agency way
          </p>
          <div className="mt-3 divide-y divide-line">
            {INVOICES.map((i) => (
              <Row key={i.label} {...i} />
            ))}
            <Row label="…and the next change" amount="?" dim />
          </div>
        </div>
      </div>

      {/* the one line */}
      <div className="flex flex-col justify-between rounded-card border p-5" style={{ borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)", background: "var(--bg-card)" }}>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Nexus Site
          </p>
          <div className="mt-3 divide-y divide-line">
            <Row label="Design & setup" amount="$0" />
            <Row label="Development" amount="$0" />
            <Row label="Setup fee" amount="$0" />
          </div>
        </div>
        <div className="mt-6 border-t border-line pt-5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl font-medium tracking-tight">$20</span>
            <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
              /month
            </span>
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--ink-muted)" }}>
            Hosting + website service. That's the invoice.
          </p>
        </div>
      </div>
    </div>
  );
}
