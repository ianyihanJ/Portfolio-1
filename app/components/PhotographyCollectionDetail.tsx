"use client";

import Image from "next/image";
import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { PhotographyCollection } from "../data/photography";
import { PhotographyCollectionHeroTitle } from "./PhotographyCollectionHeroTitle";

gsap.registerPlugin(useGSAP);

export function PhotographyCollectionDetail({
  collection,
}: {
  collection: PhotographyCollection;
}) {
  const root = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dragStartX = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const galleryImages = collection.images.filter((image) => image !== collection.cover);
  const orderedImages = [collection.cover, ...galleryImages];
  const imageCount = orderedImages.length;

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === null ? null : (current - 1 + imageCount) % imageCount,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === null ? null : (current + 1) % imageCount,
    );
  };

  useGSAP(
    () => {
      document.getElementById("photo-collection-route-handoff")?.remove();

      const media = gsap.matchMedia();
      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const targets = root.current?.querySelectorAll<HTMLElement>(
            ".photo-detail-title-wrap > *",
          );
          if (!targets) return;

          if (!context.conditions?.animate) {
            gsap.set(targets, { y: 0, autoAlpha: 1 });
            return;
          }

          gsap.fromTo(
            targets,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.82,
              stagger: 0.08,
              ease: "power3.out",
            },
          );
        },
      );

      return () => media.revert();
    },
    { dependencies: [collection.slug], scope: root, revertOnUpdate: true },
  );

  useEffect(() => {
    if (activeImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImageIndex(null);
      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          current === null ? null : (current + 1) % imageCount,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          current === null ? null : (current - 1 + imageCount) % imageCount,
        );
      }
    };

    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, imageCount]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distance) < 48) return;
    if (distance < 0) showNextImage();
    else showPreviousImage();
  };

  const handleHorizontalWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 24) {
      return;
    }
    event.preventDefault();
    if (wheelLocked.current) return;

    wheelLocked.current = true;
    if (event.deltaX > 0) showNextImage();
    else showPreviousImage();

    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 320);
  };

  return (
    <article ref={root} className="photo-detail" aria-labelledby="photo-detail-title">
      <header className="photo-detail-index-header">
        <div className="photo-detail-title-wrap">
          <p>{collection.place} / {collection.year}</p>
          <PhotographyCollectionHeroTitle id="photo-detail-title" title={collection.title} />
          <p className="photo-detail-description">{collection.description}</p>
        </div>
      </header>

      <section className="photo-detail-gallery" aria-label={collection.title + " photographs"}>
        <div className="photo-detail-grid">
          {orderedImages.map((image, index) => (
            <button
              className="photo-detail-grid-item reveal"
              type="button"
              key={image}
              aria-label={"Open photograph " + (index + 1) + " from " + collection.title}
              onClick={() => setActiveImageIndex(index)}
              data-cuelume-press="bloom"
            >
              <Image
                src={image}
                alt={collection.title + ", photograph " + (index + 1)}
                fill
                sizes="(max-width: 767px) 48vw, 31vw"
                priority={index < 3}
              />
            </button>
          ))}
        </div>
      </section>

      <footer className="photo-detail-footer">
        <p>{collection.title}</p>
        <p>{collection.place}</p>
        <a href="/photography/collections">All collections</a>
      </footer>

      {activeImageIndex !== null ? (
        <div
          className="photo-lightbox-editorial"
          role="dialog"
          aria-modal="true"
          aria-label={collection.title + " image viewer"}
        >
          <div className="photo-lightbox-editorial-panel">
            <button
              ref={closeButton}
              className="photo-lightbox-close"
              type="button"
              onClick={() => setActiveImageIndex(null)}
              data-cuelume-press="droplet"
            >
              <X aria-hidden="true" />
              <span>Close gallery</span>
            </button>

            <div className="photo-lightbox-title">
              <h2>{collection.title}</h2>
              <p>{collection.place}</p>
            </div>

            <div
              className="photo-lightbox-stage-shell"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                dragStartX.current = null;
              }}
              onWheel={handleHorizontalWheel}
            >
              <button
                className="photo-lightbox-nav photo-lightbox-nav-previous"
                type="button"
                aria-label="Show previous photograph"
                onClick={showPreviousImage}
              >
                <ArrowLeft aria-hidden="true" />
              </button>

              <figure className="photo-lightbox-stage" key={orderedImages[activeImageIndex]}>
                <Image
                  src={orderedImages[activeImageIndex]}
                  alt={collection.title + ", selected photograph"}
                  fill
                  sizes="(max-width: 767px) 100vw, 70vw"
                  priority
                />
              </figure>

              <button
                className="photo-lightbox-nav photo-lightbox-nav-next"
                type="button"
                aria-label="Show next photograph"
                onClick={showNextImage}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>

            <div className="photo-lightbox-filmstrip" aria-label="Choose a photograph">
              {orderedImages.map((image, index) => (
                <button
                  className={index === activeImageIndex ? "is-active" : undefined}
                  type="button"
                  key={image}
                  aria-label={"Show photograph " + (index + 1)}
                  aria-pressed={index === activeImageIndex}
                  onClick={() => setActiveImageIndex(index)}
                  data-cuelume-press="tick"
                >
                  <Image src={image} alt="" fill sizes="84px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
