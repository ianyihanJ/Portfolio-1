"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { AnimatedGrainGradient } from "./AnimatedGrainGradient";
import { portfolioNavigation } from "./SiteHeader";
import { SoundToggle } from "./SoundToggle";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

export function HeroStage() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.85 },
        });

        intro
          .from(".figma-header", { y: -18, autoAlpha: 0 })
          .from(".figma-title-line", { yPercent: 112, stagger: 0.08 }, "<0.08")
          .from(".figma-caption-detail", { y: 18, autoAlpha: 0 }, "<0.22")
          .from(".figma-action", { y: 10, autoAlpha: 0, stagger: 0.07 }, "<0.2")
          .from(".figma-footer", { autoAlpha: 0, duration: 0.5 }, "<0.15");
      });

      return () => media.revert();
    },
    { scope: root },
  );

  const scramble = contextSafe((element: HTMLElement, label: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(element, {
      duration: 0.42,
      scrambleText: {
        text: label.toUpperCase(),
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        speed: 0.8,
      },
      ease: "none",
      overwrite: true,
    });
  });

  return (
    <main ref={root} className="figma-home">
      <section className="figma-hero" aria-labelledby="figma-home-title">
        <AnimatedGrainGradient variant="home" />
        <header className="figma-header" data-node-id="12:308">
          <a className="figma-brand" href="/" aria-label="Yihan Jiang home" data-cuelume-hover="tick">
            Yihan Jiang
          </a>

          <nav className="figma-desktop-nav" aria-label="Primary navigation">
            {portfolioNavigation.map((item, index) => (
              <a
                className={index === 0 ? "is-active" : ""}
                href={item.href}
                key={item.href}
                onMouseEnter={(event) => scramble(event.currentTarget, item.label)}
                data-cuelume-hover="tick"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="figma-menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="figma-mobile-nav"
            data-cuelume-toggle="toggle"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </header>

        <nav
          id="figma-mobile-nav"
          className={`figma-mobile-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {portfolioNavigation.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="figma-cover-caption" data-node-id="12:34">
          <h1 id="figma-home-title">
            <span className="figma-title-mask">
              <span className="figma-title-line">YIHAN’S</span>
            </span>
            <span className="figma-title-mask">
              <span className="figma-title-line">PORTFOLIO</span>
            </span>
          </h1>

          <div className="figma-caption-detail">
            <p>
              Based in London and working globally. Creative marketing, campaigns,
              visual direction and photography.
            </p>
            <div className="figma-actions">
              <a className="figma-action" href="mailto:ian.yihan.jiang@gmail.com" data-cuelume-press="pulse">
                Get in touch
              </a>
              <a
                className="figma-action"
                href="/documents/Yihan_Jiang_CV_2026.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        <Image className="figma-edge-line figma-edge-line-white" src="/figma/hero-line-1.svg" alt="" width={1231} height={5} />
        <Image className="figma-edge-line figma-edge-line-gold" src="/figma/hero-line-2.svg" alt="" width={1200} height={5} />
        <Image className="figma-edge-line figma-edge-line-yellow" src="/figma/hero-line-3.svg" alt="" width={1200} height={5} />
      </section>

      <footer className="figma-footer" data-node-id="12:15">
        <p>© 2026 Yihan Jiang. All rights reserved.</p>
        <SoundToggle className="figma-sound" />
      </footer>
    </main>
  );
}
