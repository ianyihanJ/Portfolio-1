"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

export const portfolioNavigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Photography", href: "/photography" },
  { label: "Contact me", href: "/about#contact" },
];

export function SiteHeader({ mobileMenuColor }: { mobileMenuColor?: string }) {
  const [open, setOpen] = useState(false);
  const [activeNavigation, setActiveNavigation] = useState<string | null>(null);

  return (
    <>
      <header className={`site-header${open ? " menu-is-open" : ""}`}>
        <a className="identity" href="/" aria-label="Yihan Jiang home" data-cuelume-hover="tick">
          Yihan Jiang
        </a>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {portfolioNavigation.map((link) => (
            <a key={link.href} href={link.href} data-cuelume-hover="tick">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          data-cuelume-toggle="toggle"
          onClick={() => {
            setActiveNavigation(null);
            setOpen((value) => !value);
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <nav
        id="mobile-navigation"
        className={`mobile-navigation${open ? " is-open" : ""}${activeNavigation ? " has-active-item" : ""}`}
        style={
          mobileMenuColor
            ? ({ "--mobile-menu-bg": mobileMenuColor } as CSSProperties)
            : undefined
        }
        aria-label="Mobile navigation"
        onPointerLeave={() => setActiveNavigation(null)}
      >
        {portfolioNavigation.map((link) => (
          <a
            className={activeNavigation === link.href ? "is-active" : undefined}
            key={link.href}
            href={link.href}
            onBlur={() => setActiveNavigation(null)}
            onClick={() => {
              setActiveNavigation(null);
              setOpen(false);
            }}
            onFocus={() => setActiveNavigation(link.href)}
            onPointerDown={() => setActiveNavigation(link.href)}
            onPointerEnter={() => setActiveNavigation(link.href)}
            onPointerLeave={() => setActiveNavigation(null)}
          >
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
