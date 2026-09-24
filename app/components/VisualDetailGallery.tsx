"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { VisualArchiveItem } from "../data/visuals";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function VisualDetailGallery({ item }: { item: VisualArchiveItem }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (document.documentElement.dataset.platform === "windows") return;

      const wrapper = root.current?.querySelector<HTMLElement>(".visual-horizontal-wrapper");
      const strip = root.current?.querySelector<HTMLElement>(".visual-horizontal-strip");
      if (!wrapper || !strip) return;

      const horizontalDistance = () => Math.max(strip.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(strip, {
        x: () => -horizontalDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${Math.max(horizontalDistance(), 1)}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root },
  );

  return (
    <article ref={root} className="visual-detail">
      <header className="visual-detail-intro channel-gradient-copy">
        <p className="section-label">Visual archive / {item.type} / {item.year}</p>
        <h1 className="portfolio-display-title">{item.title}</h1>
        <p>{item.summary}</p>
      </header>

      <section className="visual-horizontal-wrapper" aria-label={`${item.title} image gallery`}>
        <div className="visual-horizontal-strip">
          {item.gallery.map((image, index) => (
            <figure className="visual-horizontal-project" key={`${image}-${index}`}>
              <div className="visual-horizontal-image">
                <Image
                  src={image}
                  alt={`${item.title}, visual ${index + 1}`}
                  fill
                  sizes="(max-width: 767px) 72vw, 36vw"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")} / {String(item.gallery.length).padStart(2, "0")}</span>
                <span>{item.title} / {item.type} / {item.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="visual-detail-outro">
        <a href="/visual-archive">Return to Visuals</a>
      </footer>
    </article>
  );
}
