import type { SVGProps } from "react";

/* Line icons, 24px grid, 1.5 stroke, currentColor.

   Stroke-based rather than filled — filled icons read cheaper at small
   sizes. Any unknown name falls back to rendering the string itself, so
   specs that carry an emoji or glyph still work. */

const P = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PATHS: Record<string, React.ReactNode> = {
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" {...P} />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" {...P} />
    </>
  ),
  pen: (
    <>
      <path d="M4 20h4L19.5 8.5a2.12 2.12 0 0 0-3-3L5 17v3Z" {...P} />
      <path d="M14.5 6.5l3 3" {...P} />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" {...P} />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 8.3-7 9.5-4.1-1.2-7-5.1-7-9.5V6l7-3Z" {...P} />
      <path d="M9 12l2 2 4-4" {...P} />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" {...P} />
      <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" {...P} />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.5-5.8" {...P} />
      <path d="M20 4v4.5h-4.5" {...P} />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" {...P} />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" {...P} />
      <circle cx="12" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="4" width="6" height="5" rx="1.5" />
      <rect x="15" y="4" width="6" height="5" rx="1.5" />
      <rect x="9" y="15" width="6" height="5" rx="1.5" />
      <path d="M6 9v3.5h12V9M12 12.5V15" {...P} />
    </>
  ),
  hexagon: (
    <>
      <path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3Z" {...P} />
      <path d="M12 8.5l3.5 2v3l-3.5 2-3.5-2v-3l3.5-2Z" {...P} />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 2-.9 2-1.9 0-1.3-1.2-1.6-1.2-2.7 0-.9.8-1.6 1.8-1.6h1.6a4.3 4.3 0 0 0 4.3-4.3c0-3.6-3.8-6.5-8.5-6.5Z" {...P} />
      <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 8.5L4.5 12l4 3.5M15.5 8.5l4 3.5-4 3.5" {...P} />
      <path d="M13.5 5.5l-3 13" {...P} />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.6 5.5-5.6s5.5 2.3 5.5 5.6" {...P} />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.9M17 14.8c2.1.5 3.5 2.5 3.5 5.2" {...P} />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18" {...P} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" {...P} />
    </>
  ),
  wallet: (
    <>
      <path d="M3.5 8a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V8Z" {...P} />
      <path d="M19 11h-3.2a1.8 1.8 0 0 0 0 3.6H19" {...P} />
    </>
  ),
  plus: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" {...P} />
    </>
  ),
};

export function Icon({
  name,
  className = "size-5",
  ...rest
}: { name?: string; className?: string } & SVGProps<SVGSVGElement>) {
  if (!name) return null;
  const path = PATHS[name];

  // Unknown key: render whatever was supplied (emoji, glyph) unchanged.
  if (!path) return <span aria-hidden>{name}</span>;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden
      {...rest}
    >
      {path}
    </svg>
  );
}
