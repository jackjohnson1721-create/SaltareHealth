"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#gap", label: "The gap" },
  { href: "#workflow", label: "How it works" },
  { href: "#why-now", label: "Why now" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#cmc-value", label: "For CMCs" },
  { href: "#community-value", label: "For community" },
  { href: "#technology", label: "Technology" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "border-b border-white/[0.08]",
        "bg-[color:var(--color-bg-dark)]/70 backdrop-blur-md",
      )}
    >
      <div className="container-narrow flex h-14 items-center justify-between">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-[color:var(--color-fg-on-dark)]"
        >
          Saltare
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[color:var(--color-fg-muted-on-dark)] transition-colors hover:text-[color:var(--color-fg-on-dark)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-[color:var(--color-accent)] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Partner with us
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          className="md:hidden text-sm text-[color:var(--color-fg-on-dark)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-white/[0.08] bg-[color:var(--color-bg-dark)]"
        >
          <div className="container-narrow flex flex-col gap-3 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[color:var(--color-fg-muted-on-dark)] hover:text-[color:var(--color-fg-on-dark)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full bg-[color:var(--color-accent)] px-4 py-1.5 text-sm font-medium text-white w-fit"
            >
              Partner with us
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
