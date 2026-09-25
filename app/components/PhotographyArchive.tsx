"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { photographyCollections } from "../data/photography";

gsap.registerPlugin(useGSAP);

const londonCollection =
  photographyCollections.find((collection) => collection.slug === "london") ??
  photographyCollections[0];

const londonGridImageIndexes = [0, 2, 4, 6, 8, 10, 12, 15, 18, 21, 25, 29];
const gridImages = londonGridImageIndexes.map((imageIndex, gridIndex) => ({
  src: londonCollection.images[imageIndex] ?? londonCollection.cover,
  gridIndex,
}));

type TransitionMask = {
  clipPath: string;
};

export function PhotographyArchive() {
  const root = useRef<HTMLDivElement>(null);
  const [transitionMask, setTransitionMask] = useState<TransitionMask | null>(null);

  useGSAP(
    () => {
      if (document.documentElement.dataset.platform === "windows") return;

      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };
          const items = gsap.utils.toArray<HTMLElement>(
            ".photo-sticky-grid-item",
            root.current,
          );
          const columns = Array.from({ length: 3 }, () => [] as HTMLElement[]);
          items.forEach((item, index) => columns[index % 3].push(item));

          if (reduceMotion) {
            gsap.set(".photo-sticky-grid", { autoAlpha: 1, scale: isMobile ? 1.5 : 1.9 });
            gsap.set(columns[0], { xPercent: isMobile ? -42 : -44, yPercent: 0 });
            gsap.set(columns[2], { xPercent: isMobile ? 42 : 44, yPercent: 0 });
            gsap.set(columns[1], {
              yPercent: (index) =>
                index < Math.floor(columns[1].length / 2)
                  ? isMobile
                    ? -44
                    : -36
                  : isMobile
                    ? 44
                    : 36,
            });
            gsap.set(".photo-sticky-heading", { autoAlpha: 1, yPercent: 0 });
            gsap.set(".photo-enter-cta", { autoAlpha: 1, clearProps: "transform" });
            return;
          }

          gsap.set(".photo-sticky-grid", {
            autoAlpha: 1,
            scale: isMobile ? 0.78 : 0.68,
          });
          gsap.set(".photo-sticky-heading", { autoAlpha: 0, yPercent: 115 });
          gsap.set(".photo-enter-cta", { autoAlpha: 0, y: 24 });
          gsap.set(columns[0], { yPercent: -78 });
          gsap.set(columns[1], { yPercent: 78 });
          gsap.set(columns[2], { yPercent: -78 });

          const timeline = gsap.timeline({
            delay: 0.18,
            defaults: { ease: "power3.inOut" },
          });

          timeline
            .to(
              ".photo-sticky-grid",
              {
                autoAlpha: 1,
                scale: isMobile ? 0.94 : 0.84,
                duration: 0.48,
                ease: "power2.out",
              },
              0,
            )
            .to(items, { yPercent: 0, duration: 0.82, stagger: 0.018 }, 0)
            .to(
              ".photo-sticky-grid",
              { scale: isMobile ? 1.5 : 1.9, duration: 1.08 },
              0.74,
            )
            .to(columns[0], { xPercent: isMobile ? -42 : -44, duration: 1.02 }, 0.74)
            .to(columns[2], { xPercent: isMobile ? 42 : 44, duration: 1.02 }, 0.74)
            .to(
              columns[1],
              {
                yPercent: (index) =>
                  index < Math.floor(columns[1].length / 2)
                    ? isMobile
                      ? -44
                      : -36
                    : isMobile
                      ? 44
                      : 36,
                duration: 0.72,
              },
              0.98,
            )
            .to(
              ".photo-sticky-heading",
              { autoAlpha: 1, yPercent: 0, duration: 0.68, ease: "power3.out" },
              1.82,
            )
            .to(
              ".photo-enter-cta",
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.48,
                ease: "power2.out",
                clearProps: "transform",
              },
              2.08,
            );

          return () => timeline.kill();
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!transitionMask) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.location.assign("/photography/collections");
        return;
      }
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const timeline = gsap.timeline({
        onComplete: () => window.location.assign("/photography/collections"),
      });

      timeline
        .to(".photo-route-transition", {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          duration: 0.92,
          ease: "power3.inOut",
        })
        .fromTo(
          ".photo-route-transition img",
          { scale: 1.14, filter: "blur(6px)" },
          { scale: 1, filter: "blur(0px)", duration: 0.92, ease: "power3.out" },
          0,
        );

      return () => {
        timeline.kill();
        document.body.style.overflow = previousOverflow;
      };
    },
    { dependencies: [transitionMask], scope: root, revertOnUpdate: true },
  );

  const enterCollections = () => {
    if (transitionMask) return;
    if (document.documentElement.dataset.platform === "windows") {
      window.location.assign("/photography/collections");
      return;
    }

    const source = root.current?.querySelector<HTMLElement>("[data-transition-source='true']");
    const rect = source?.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const top = Math.max(0, rect?.top ?? viewportHeight * 0.42);
    const left = Math.max(0, rect?.left ?? viewportWidth * 0.42);
    const right = Math.max(0, viewportWidth - (rect?.right ?? viewportWidth * 0.58));
    const bottom = Math.max(0, viewportHeight - (rect?.bottom ?? viewportHeight * 0.58));

    setTransitionMask({
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 18px)`,
    });
  };

  return (
    <div ref={root} className="photography-index">
      <section className="photo-sticky-block" aria-label="Photography introduction">
        <div className="photo-sticky-wrapper">
          <ul className="photo-sticky-grid" aria-hidden="true">
            {gridImages.map((image) => (
              <li
                className="photo-sticky-grid-item"
                data-transition-source={image.gridIndex === 4 ? "true" : undefined}
                key={`${image.src}-${image.gridIndex}`}
              >
                <Image src={image.src} alt="" width={640} height={800} sizes="28vw" />
              </li>
            ))}
          </ul>

          <div className="photo-sticky-copy">
            <div className="photo-sticky-copy-inner">
              <div className="photo-sticky-title-reveal">
                <h1 className="photo-sticky-heading portfolio-display-title">Photography</h1>
              </div>
              <button
                className="photo-enter-cta"
                type="button"
                disabled={Boolean(transitionMask)}
                onClick={enterCollections}
                aria-label="Enter photography collections"
                data-cuelume-press="arrival"
              >
                <span>Enter collections</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {transitionMask ? (
        <div
          className="photo-route-transition"
          style={{ clipPath: transitionMask.clipPath }}
          aria-hidden="true"
        >
          <Image
            src="/photography/opening-gradient.png"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
    </div>
  );
}
