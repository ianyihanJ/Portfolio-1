"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { AnimatedGrainGradient } from "./AnimatedGrainGradient";
import { portfolioNavigation } from "./SiteHeader";
import { SoundToggle } from "./SoundToggle";
import { projects, type Project } from "../data/projects";

gsap.registerPlugin(useGSAP);

type ProjectGroup = {
  id: string;
  label: string;
  note: string;
  color: string;
  accent: string;
  ink: string;
  slugs: string[];
};

const groups: ProjectGroup[] = [
  {
    id: "ocean-tide-wealth",
    label: "Integrated marketing",
    note: "Financial services",
    color: "#b9dec6",
    accent: "#629278",
    ink: "#183126",
    slugs: ["ocean-tide-wealth"],
  },
  {
    id: "fanta",
    label: "Campaign activation",
    note: "FMCG",
    color: "#f1eca2",
    accent: "#c8b540",
    ink: "#25230f",
    slugs: ["fanta-colourful-snacking", "coca-cola", "mr-muscle-global-pitch"],
  },
  {
    id: "hongkong-land",
    label: "Brand book copywriting",
    note: "Real estate",
    color: "#f3efe4",
    accent: "#cfc5b2",
    ink: "#302b23",
    slugs: ["hongkong-land-brandbook"],
  },
  {
    id: "peijie-hotpot",
    label: "Brand marketing",
    note: "Restaurant launch",
    color: "#f4b183",
    accent: "#df7f49",
    ink: "#3d2114",
    slugs: ["upper-south-corner", "peijie-hotpot"],
  },
];

const archivedProjectCount = groups.reduce((total, group) => total + group.slugs.length, 0);

function projectsFor(group: ProjectGroup): Project[] {
  return group.slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
}

export function ProjectDrawer() {
  const root = useRef<HTMLElement>(null);
  const cabinet = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const rotateXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rotateYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const [selected, setSelected] = useState<ProjectGroup | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            reduceMotion: boolean;
          };

          if (!reduceMotion) {
            const intro = gsap.timeline({
              defaults: { duration: 0.9, ease: "power3.out" },
            });

            intro
              .from(".projects-gradient-copy > p", {
                y: 34,
                autoAlpha: 0,
                stagger: 0.08,
              })
              .from(
                ".drawer-cabinet",
                { y: 80, rotationX: 15, autoAlpha: 0, duration: 1.2 },
                "<0.18",
              )
              .from(
                ".folder-shell",
                { y: 48, z: -80, autoAlpha: 0, stagger: 0.09 },
                "<0.18",
              );
          }

          if (desktop && !reduceMotion && cabinet.current) {
            rotateXTo.current = gsap.quickTo(cabinet.current, "rotationX", {
              duration: 0.8,
              ease: "power3.out",
            });
            rotateYTo.current = gsap.quickTo(cabinet.current, "rotationY", {
              duration: 0.8,
              ease: "power3.out",
            });
          }
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!selected || !sheet.current) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => closeButton.current?.focus(),
      });

      timeline
        .fromTo(
          ".folder-sheet-backdrop",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.38 },
        )
        .fromTo(
          sheet.current,
          { yPercent: 106, rotationX: -9, scale: 0.94 },
          { yPercent: 0, rotationX: 0, scale: 1, duration: 1.05 },
          "<0.02",
        )
        .from(
          ".folder-sheet-heading > *, .folder-project-row",
          { y: 28, autoAlpha: 0, stagger: 0.07, duration: 0.62 },
          "-=0.48",
        );

      return () => {
        timeline.kill();
        document.body.style.overflow = previousOverflow;
      };
    },
    { dependencies: [selected], scope: root, revertOnUpdate: true },
  );

  const closeFolder = () => {
    contextSafe(() => {
      if (!sheet.current) {
        setSelected(null);
        return;
      }

      gsap
        .timeline({ onComplete: () => setSelected(null) })
        .to(sheet.current, {
          yPercent: 104,
          rotationX: -7,
          scale: 0.96,
          duration: 0.72,
          ease: "power3.in",
        })
        .to(
          ".folder-sheet-backdrop",
          { autoAlpha: 0, duration: 0.3, ease: "power1.out" },
          "-=0.22",
        );
    })();
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!rotateXTo.current || !rotateYTo.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateXTo.current(-y * 2.4);
    rotateYTo.current(x * 3.2);
  };

  const onPointerLeave = () => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);
  };

  return (
    <main ref={root} className="projects-page">
      <section className="projects-gradient-cap" aria-labelledby="projects-title">
        <AnimatedGrainGradient variant="projects" />
        <header className={`figma-header projects-header${menuOpen ? " menu-is-open" : ""}`}>
          <a className="figma-brand" href="/" aria-label="Yihan Jiang home" data-cuelume-hover="tick">
            Yihan Jiang
          </a>

          <nav className="figma-desktop-nav" aria-label="Primary navigation">
            {portfolioNavigation.map((item) => (
              <a
                className={item.href === "/work" ? "is-active" : ""}
                href={item.href}
                key={item.label}
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
            aria-controls="projects-mobile-nav"
            data-cuelume-toggle="toggle"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </header>

        <nav
          id="projects-mobile-nav"
          className={`figma-mobile-nav projects-mobile-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {portfolioNavigation.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="projects-gradient-copy channel-gradient-copy">
          <p>Selected work / 2020-2026</p>
          <GradualSpacing
            className="portfolio-display-title"
            id="projects-title"
            text="Projects"
          />
          <p>Campaign thinking, visual systems and stories organised as a working archive.</p>
        </div>
      </section>

      <section className="drawer-stage" id="drawer" aria-label="Interactive project archive">
        <ContainerScroll
          titleComponent={
            <div className="drawer-stage-heading">
              <p>Open a folder</p>
              <span>Move to explore · Click to unfold</span>
            </div>
          }
        >
          <div
            className="drawer-perspective"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            <div ref={cabinet} className="drawer-cabinet">
              <div className="cabinet-topline">
                <span>YJ / Project cabinet</span>
                <span>
                  04 drawers · {String(archivedProjectCount).padStart(2, "0")} projects
                </span>
              </div>

              <div className="cabinet-well">
                {groups.map((group, index) => {
                  const folderProjects = projectsFor(group);
                  const folderStyle = {
                    "--folder": group.color,
                    "--folder-accent": group.accent,
                    "--folder-ink": group.ink,
                    "--folder-z": 20 - index,
                    "--folder-offset": `${21 + index * 56}px`,
                    "--folder-mobile-offset": `${15 + index * 42}px`,
                    "--folder-depth": `${index * -15}px`,
                    "--folder-lift": folderProjects.length > 1 ? "166px" : "116px",
                    "--tab-shift": `${[3, 31, 12, 42][index]}%`,
                  } as CSSProperties;

                  return (
                    <button
                      className="folder-shell"
                      type="button"
                      style={folderStyle}
                      key={group.id}
                      onClick={() => setSelected(group)}
                      aria-label={`Open ${group.label} folder`}
                      data-cuelume-press="bloom"
                    >
                      <span className="folder-lift">
                        <span className="folder-tab">
                          <strong>{group.label}</strong>
                          <i>{String(index + 1).padStart(2, "0")}</i>
                        </span>
                        <span className="folder-face">
                          <span className="folder-face-meta">
                            <span>{group.note}</span>
                            <span>{folderProjects.length} project{folderProjects.length > 1 ? "s" : ""}</span>
                          </span>
                          <span className="folder-preview-list">
                            {folderProjects.map((project) => (
                              <span className="folder-preview-row" key={project.slug}>
                                <span className="folder-preview-copy">
                                  <strong>{project.shortTitle}</strong>
                                  <small>{project.summary}</small>
                                </span>
                                <time>{project.year}</time>
                              </span>
                            ))}
                          </span>
                          <span className="folder-open-label">Open folder</span>
                        </span>
                      </span>
                    </button>
                  );
                })}
                <span className="cabinet-glass-front" aria-hidden="true" />
              </div>

              <div className="cabinet-base">
                <span>Archive / London</span>
                <span aria-hidden="true" />
                <span>2026</span>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {selected ? (
        <div className="folder-sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="open-folder-title">
          <div
            ref={sheet}
            className="folder-sheet"
            data-lenis-prevent
            style={
              {
                "--folder": selected.color,
                "--folder-accent": selected.accent,
                "--folder-ink": selected.ink,
              } as CSSProperties
            }
          >
            <button
              ref={closeButton}
              className="folder-sheet-close"
              type="button"
              onClick={closeFolder}
              data-cuelume-press="droplet"
            >
              Close <span aria-hidden="true">×</span>
            </button>

            <header className="folder-sheet-heading">
              <p>Project folder / {selected.note}</p>
              <h2 className="portfolio-display-title folder-sheet-title" id="open-folder-title">
                {selected.label}
              </h2>
              <span>{String(projectsFor(selected).length).padStart(2, "0")} files</span>
            </header>

            <div className="folder-project-list">
              {projectsFor(selected).map((project, index) => (
                <a className="folder-project-row" href={`/work/${project.slug}`} key={project.slug}>
                  <span className="folder-project-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="folder-project-title">
                    <strong>{project.title}</strong>
                    <small>{project.client}</small>
                  </span>
                  <span className="folder-project-role">{project.category}</span>
                  <span className="folder-project-year">{project.year}</span>
                  <span className="folder-project-thumb">
                    <Image src={project.cover} alt="" width={280} height={158} sizes="180px" />
                  </span>
                </a>
              ))}
            </div>

            <footer className="folder-sheet-footer">
              <span>Yihan Jiang · Creative portfolio</span>
              <span>Select a file to view the full case study</span>
            </footer>
          </div>
        </div>
      ) : null}
      <SoundToggle className="projects-sound-toggle" />
    </main>
  );
}
