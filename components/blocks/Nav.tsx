"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Block } from "@/lib/spec";
import { Button } from "@/components/ui";

type P = Extract<Block, { type: "nav" }>;

export function Nav({ logo, links, cta }: P) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-[15px] font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {logo}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        {cta && (
          <div className="hidden md:block">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        )}

        {/* Hamburger — two bars that morph into a cross. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute inset-x-0 block h-px bg-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute inset-x-0 block h-px bg-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "top-1.5 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Drawer */}
      <div
        className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
        style={{
          maxHeight: open ? "70vh" : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 400ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="container-x flex flex-col gap-1 py-6">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                transition: "transform 400ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)",
                transform: open ? "translateY(0)" : "translateY(8px)",
                opacity: open ? 1 : 0,
              }}
              className="border-b border-line py-4 font-display text-h4 font-medium"
            >
              {l.label}
            </Link>
          ))}
          {cta && (
            <div
              style={{
                transitionDelay: open ? `${60 + links.length * 45}ms` : "0ms",
                transition: "transform 400ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)",
                transform: open ? "translateY(0)" : "translateY(8px)",
                opacity: open ? 1 : 0,
              }}
              className="mt-6"
            >
              <Button href={cta.href} full>
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
