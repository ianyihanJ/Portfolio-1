"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type VisualArchiveItem = {
  title: string;
  type: string;
  year: string;
  image: string;
};

export function InteractiveVisualGallery({ items }: { items: VisualArchiveItem[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const tiltX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const tiltY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const dragOrigin = useRef<number | null>(null);
  const orbitItems = Array.from({ length: 18 }, (_, index) => ({
    ...items[index % items.length],
    orbitIndex: index,
  }));

  useGSAP(
    () => {
      if (!root.current) return;
      tiltX.current = gsap.quickTo(root.current, "--visual-tilt-x", { duration: 0.8, ease: "power3.out" });
      tiltY.current = gsap.quickTo(root.current, "--visual-tilt-y", { duration: 0.8, ease: "power3.out" });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".visual-orbit-card", root.current);
      cards.forEach((card, index) => {
        const relative = index - active;
        const wrapped = relative > orbitItems.length / 2
          ? relative - orbitItems.length
          : relative < -orbitItems.length / 2
            ? relative + orbitItems.length
            : relative;
        gsap.to(card, {
          xPercent: wrapped * 108,
          y: Math.abs(wrapped) * 32,
          rotation: wrapped * 12,
          rotationY: wrapped * -22,
          scale: wrapped === 0 ? 1 : Math.max(0.66, 0.85 - Math.abs(wrapped) * 0.055),
          autoAlpha: Math.abs(wrapped) > 2.25 ? 0 : 1,
          zIndex: 20 - Math.abs(wrapped),
          duration: 0.9,
          ease: "power3.inOut",
        });
      });
    },
    { dependencies: [active, orbitItems.length], scope: root },
  );

  return (
    <section
      ref={root}
      className="visual-orbit"
      aria-label="Interactive visual archive"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        tiltX.current?.(((event.clientY - rect.top) / rect.height - 0.5) * -6);
        tiltY.current?.(((event.clientX - rect.left) / rect.width - 0.5) * 8);

        if (dragOrigin.current !== null) {
          const distance = event.clientX - dragOrigin.current;
          if (Math.abs(distance) > 48) {
            setActive((value) => (value + (distance < 0 ? 1 : -1) + orbitItems.length) % orbitItems.length);
            dragOrigin.current = event.clientX;
          }
        }
      }}
      onPointerLeave={() => {
        dragOrigin.current = null;
        tiltX.current?.(0);
        tiltY.current?.(0);
      }}
      onPointerDown={(event) => {
        dragOrigin.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={() => {
        dragOrigin.current = null;
      }}
    >
      <header className="visual-orbit-copy">
        <p>Interactive visual gallery</p>
        <span>Move to tilt · Drag to orbit · Select a card</span>
      </header>
      <div className="visual-orbit-deck">
        {orbitItems.map((item, index) => (
          <button
            className="visual-orbit-card"
            type="button"
            key={`${item.title}-${item.orbitIndex}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <Image src={item.image} alt={`${item.title}, ${item.type}`} width={900} height={1125} sizes="(max-width: 767px) 62vw, 31vw" />
            <span className="visual-orbit-card-caption">
              <strong>{item.title}</strong>
              <small>{item.type} · {item.year}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="visual-orbit-controls" aria-label="Visual selection">
        {items.map((item, index) => (
          <button type="button" key={item.title} onClick={() => setActive(index)} aria-label={`Show ${item.title}`}>
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
