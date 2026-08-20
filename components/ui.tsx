import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-section ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-raise px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink-muted uppercase">
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  full = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** Fill the container — used in the mobile drawer and stacked hero CTAs. */
  full?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:brightness-110 hover:-translate-y-0.5"
      : "border border-line text-ink hover:bg-bg-raise hover:-translate-y-0.5";
  return (
    <Link href={href} className={`${base} ${styles} ${full ? "w-full" : ""}`}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-card border border-line bg-bg-card p-7 transition-colors duration-300 hover:border-ink-muted/30 ${className}`}
    >
      {children}
    </div>
  );
}
