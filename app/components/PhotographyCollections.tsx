"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { photographyCollections } from "../data/photography";

gsap.registerPlugin(useGSAP);

export function PhotographyCollections() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .to(".collection-entry-curtain", {
            clipPath: "inset(50% 50% 50% 50%)",
            duration: 0.82,
            ease: "power3.inOut",
          })
          .fromTo(
            ".photo-collection-index-heading > *",
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.07 },
            "-=0.42",
          )
          .fromTo(
            ".photo-collection-preview-stack",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.68 },
            "-=0.5",
          )
          .fromTo(
            ".photo-collection-title-item",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.58, stagger: 0.035 },
            "-=0.34",
          );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="photography-collections-page"
      aria-labelledby="photo-collections-title"
    >
      <header className="photo-collection-index-heading">
        <h1 id="photo-collections-title" className="portfolio-display-title">
          Collections
        </h1>
        <p>Hover to preview. Select a place to enter.</p>
      </header>

      <div className="photo-collection-osmo-layout">
        <div className="photo-collection-preview-stack" aria-hidden="true">
          {photographyCollections.map((collection, index) => (
            <figure
              className={`photo-collection-osmo-preview${index === activeIndex ? " is-active" : ""}`}
              key={collection.slug}
            >
              <Image
                src={collection.cover}
                alt=""
                fill
                sizes="(max-width: 767px) 58vw, 34vw"
                priority={index === 0}
              />
              <figcaption>
                <span>{collection.place}</span>
                <span>{collection.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ul
          className={`photo-collection-title-list${hoveredIndex !== null ? " has-hover" : ""}`}
          onPointerLeave={() => setHoveredIndex(null)}
        >
          {photographyCollections.map((collection, index) => (
            <li
              className={`photo-collection-title-item${hoveredIndex === index ? " is-hovered" : ""}`}
              key={collection.slug}
              onPointerEnter={() => {
                setActiveIndex(index);
                setHoveredIndex(index);
              }}
            >
              <a
                href={"/photography/" + collection.slug}
                onFocus={() => {
                  setActiveIndex(index);
                  setHoveredIndex(index);
                }}
                onBlur={() => setHoveredIndex(null)}
              >
                <span className="photo-collection-title-roll">
                  <span>{collection.title}</span>
                  <span aria-hidden="true">{collection.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="collection-entry-curtain" aria-hidden="true">
        <Image
          src="/photography/opening-gradient.png"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
}
