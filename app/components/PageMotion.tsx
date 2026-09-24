"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (document.documentElement.dataset.platform === "windows") return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entranceElements = gsap.utils.toArray<HTMLElement>(".page-enter", root.current);
        if (entranceElements.length) {
          gsap.from(entranceElements, {
            y: 32,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          });
        }

        const revealElements = gsap.utils.toArray<HTMLElement>(".reveal", root.current);
        if (revealElements.length) {
          ScrollTrigger.batch(revealElements, {
            start: "top 88%",
            once: true,
            onEnter: (elements) => {
              gsap.fromTo(
                elements,
                { y: 42, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.85,
                  stagger: 0.08,
                  ease: "power3.out",
                  overwrite: "auto",
                },
              );
            },
          });
        }

        gsap.utils.toArray<HTMLElement>(".parallax-media", root.current).forEach((element) => {
          const image = element.querySelector("img");
          if (!image) return;
          gsap.fromTo(
            image,
            { yPercent: -3, scale: 1.04 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
