"use client";

import Image from "next/image";
import { BookOpenText, FileText, Instagram, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { DiaText } from "@/components/ui/dia-text";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGrainGradient } from "./AnimatedGrainGradient";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const storyImages = [
  { src: "/about/story-01.jpg", alt: "Orange product study" },
  { src: "/about/story-02.jpg", alt: "Peanut butter product photograph" },
  { src: "/about/story-03.jpg", alt: "Hand-drawn fish studies" },
  { src: "/about/story-04.jpg", alt: "Colourful striped installation" },
  { src: "/about/story-05.jpg", alt: "Pine tree against a blue sky" },
  { src: "/about/story-06.jpg", alt: "Creative studio collage" },
  { src: "/about/story-07.jpg", alt: "Portrait of Yihan Jiang" },
];

const experience = [
  {
    company: "Ocean Tide Wealth Ltd",
    location: "London, UK",
    dates: "Apr 2024 - Present",
    role: "Marketing Executive",
    description:
      "I plan and deliver integrated campaigns across social, email, video, editorial content and live events, combining creative production with CRM and performance analysis. During this period, annual lead volume grew from 47 to 221, while the brand's social following increased by 82.7%.",
  },
  {
    company: "Ogilvy & Mather Advertising",
    location: "Shanghai, China",
    dates: "Jun 2021 - Jun 2022",
    role: "Copywriter Intern",
    description:
      "I developed campaign concepts, scripts, manifestos and social content for brands including Coca-Cola, Nestlé, Fanta, Buick and Tencent Games, while supporting pitches through research, strategic thinking and data visualisation.",
  },
  {
    company: "Jiangxi Radio and Television Station",
    location: "Jiangxi, China",
    dates: "Jan 2021 - Mar 2021",
    role: "Media Analyst Intern",
    description:
      "I tracked social performance and audience response to inform content formats and publishing schedules, contributing to a 25% month-on-month increase in organic traffic.",
  },
];

const education = [
  {
    institution: "King's College London",
    location: "London, UK",
    dates: "Sep 2022 - Sep 2023",
    qualification: "MA Cultural and Creative Industries",
    detail: "High merit",
  },
  {
    institution: "Jiangxi Normal University",
    location: "Jiangxi, China",
    dates: "Sep 2018 - Jun 2022",
    qualification: "BA Advertising",
    detail: "GPA 88.2 / 100",
  },
];

const skillGroups = [
  {
    category: "Creative Design",
    skills: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro, Canva, CapCut",
  },
  {
    category: "Content & Digital",
    skills: "SEO / SEM, email marketing, WordPress, Mailchimp",
  },
  {
    category: "Marketing Analytics",
    skills: "Power BI, SQL, Google Analytics 4",
  },
  {
    category: "Productivity",
    skills: "Microsoft Word, PowerPoint, Excel",
  },
  {
    category: "Languages",
    skills: "Fluent in English and Mandarin",
  },
];

type FoldPanel = "experience" | "education" | "skills";

export function AboutScrollStory() {
  const root = useRef<HTMLDivElement>(null);
  const [openPanels, setOpenPanels] = useState<Set<FoldPanel>>(() => new Set());

  const togglePanel = (panel: FoldPanel) => {
    setOpenPanels((currentPanels) => {
      const nextPanels = new Set(currentPanels);
      if (nextPanels.has(panel)) {
        nextPanels.delete(panel);
      } else {
        nextPanels.add(panel);
      }
      return nextPanels;
    });
  };

  useGSAP(
    () => {
      if (document.documentElement.dataset.platform === "windows") return;

      const frames = gsap.utils.toArray<HTMLElement>(".about-story-frame", root.current);
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!frames.length) return;

          const isMobile = Boolean(context.conditions?.mobile);
          const shouldReduce = Boolean(context.conditions?.reduce);
          const scales = isMobile
            ? [0.1, 0.16, 0.22, 0.28, 0.34, 0.405, 0.475]
            : [0.08, 0.145, 0.21, 0.275, 0.34, 0.41, 0.49];

          gsap.set(frames, {
            autoAlpha: 0,
            scale: (index) => scales[index],
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
          });

          if (shouldReduce) {
            gsap.set(frames.at(-1)!, { autoAlpha: 1, scale: scales.at(-1) });
            return;
          }

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".about-scroll-story",
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (isMobile ? 3.5 : 3.25))}`,
              pin: true,
              scrub: 0.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            ".about-story-copy",
            { yPercent: -10, autoAlpha: 0, duration: 0.2 },
            0,
          );

          frames.forEach((frame, frameIndex) => {
            const position = 0.16 + frameIndex * 0.58;
            const image = frame.querySelector("img");

            timeline
              .fromTo(
                frame,
                {
                  autoAlpha: 0,
                  scale: Math.max(0.1, scales[frameIndex] - 0.055),
                  yPercent: -62,
                  rotateZ: frameIndex % 2 === 0 ? -1.5 : 1.5,
                },
                {
                  autoAlpha: 1,
                  scale: scales[frameIndex],
                  yPercent: -50,
                  rotateZ: 0,
                  duration: 0.28,
                  ease: "back.out(1.45)",
                  immediateRender: false,
                },
                position,
              );

            if (image) {
              timeline.fromTo(
                image,
                { scale: 1.1, yPercent: 4 },
                {
                  scale: 1.045,
                  yPercent: -4,
                  duration: 0.54,
                  immediateRender: false,
                },
                position,
              );
            }

            if (frameIndex > 0) {
              timeline.to(
                frames[frameIndex - 1],
                {
                  autoAlpha: 0,
                  scale: scales[frameIndex - 1] + 0.055,
                  duration: 0.2,
                },
                position + 0.02,
              );
            }
          });

          const finalFrame = frames.at(-1)!;
          timeline
            .to(finalFrame, { scale: scales.at(-1), duration: 0.62 }, ">+=0.08")
            .to(".about-story-gradient", { autoAlpha: 0.12, duration: 0.5 }, "<0.08")
            .to(".about-story-stage", { backgroundColor: "#ffffff", duration: 0.5 }, "<");
        },
      );

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const parallaxLayers = gsap.utils.toArray<HTMLElement>(
          "[data-about-parallax]",
          root.current,
        );

        parallaxLayers.forEach((layer) => {
          const amount = Number(layer.dataset.aboutParallax ?? 0);

          gsap.fromTo(
            layer,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: {
                trigger: layer.closest("section, .about-fold-stack") ?? layer,
                start: "clamp(top bottom)",
                end: "clamp(bottom top)",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      }

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="about-page">
      <section className="about-scroll-story" aria-labelledby="about-title">
        <div className="about-story-stage">
          <div className="about-story-gradient">
            <AnimatedGrainGradient variant="about" />
          </div>

          <div className="about-story-copy channel-gradient-copy">
            <TextEffect
              as="h1"
              className="portfolio-display-title"
              id="about-title"
              per="char"
            >
              About me
            </TextEffect>
            <TextEffect as="p" delay={0.16}>
              Creative marketing shaped by culture, commercial clarity and visual thinking.
            </TextEffect>
          </div>

          <div className="about-story-images" aria-hidden="true">
            {storyImages.map((image, index) => (
              <figure
                className={`about-story-frame${index === storyImages.length - 1 ? " is-portrait" : ""}`}
                key={image.src}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 82vw, 52vw"
                  priority={index < 2}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="page-container about-editorial">
        <section className="about-profile">
          <div>
            <TextEffect as="h2" data-about-parallax="-4" per="line">
              {`Curious about people, obsessed with ideas.\nI mix data, customer insight and creative thinking to make marketing that actually works.`}
            </TextEffect>
            <TextEffect as="p" className="about-body-copy" data-about-parallax="-1.5" delay={0.08}>
              Based in London, with experience across campaigns, social media management, creative content and events in financial services, FMCG, real estate and hospitality.
            </TextEffect>
          </div>
        </section>

        <div className="about-fold-stack" data-about-parallax="-2.25">
          <section
            className={`about-fold-panel about-fold-experience${openPanels.has("experience") ? " is-active" : ""}`}
            id="experience"
          >
            <div className="about-fold-trigger">
              <TextEffect className="about-fold-number" per="char">01</TextEffect>
              <TextEffect className="about-fold-title portfolio-display-title" per="char">Experience</TextEffect>
            </div>
            <button
              aria-controls="experience-content"
              aria-expanded={openPanels.has("experience")}
              aria-label={`${openPanels.has("experience") ? "Collapse" : "Expand"} Experience folder`}
              className="about-fold-toggle"
              data-cuelume-press={openPanels.has("experience") ? "droplet" : "bloom"}
              onClick={() => togglePanel("experience")}
              type="button"
            >
              <span aria-hidden="true">{openPanels.has("experience") ? "−" : "+"}</span>
            </button>
            <div
              aria-hidden={!openPanels.has("experience")}
              className="about-fold-reveal"
              id="experience-content"
            >
              <div className="about-fold-content">
                <div className="about-history-list">
                  {experience.map((item) => (
                    <article className="about-history-row" key={item.company}>
                      <div className="about-entry-identity">
                        <TextEffect as="h3">{item.company}</TextEffect>
                        <TextEffect as="p" className="about-entry-meta" per="line">{`${item.location}\n${item.dates}`}</TextEffect>
                      </div>
                      <div className="about-entry-detail">
                        <TextEffect as="h3" delay={0.04}>{item.role}</TextEffect>
                        <TextEffect as="p" className="about-body-copy" delay={0.08}>{item.description}</TextEffect>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`about-fold-panel about-fold-education${openPanels.has("education") ? " is-active" : ""}`}
          >
            <div className="about-fold-trigger">
              <TextEffect className="about-fold-number" per="char">02</TextEffect>
              <TextEffect className="about-fold-title portfolio-display-title" per="char">Education</TextEffect>
            </div>
            <button
              aria-controls="education-content"
              aria-expanded={openPanels.has("education")}
              aria-label={`${openPanels.has("education") ? "Collapse" : "Expand"} Education folder`}
              className="about-fold-toggle"
              data-cuelume-press={openPanels.has("education") ? "droplet" : "bloom"}
              onClick={() => togglePanel("education")}
              type="button"
            >
              <span aria-hidden="true">{openPanels.has("education") ? "−" : "+"}</span>
            </button>
            <div
              aria-hidden={!openPanels.has("education")}
              className="about-fold-reveal"
              id="education-content"
            >
              <div className="about-fold-content">
                <div className="about-education-list">
                  {education.map((item) => (
                    <article className="about-education-row" key={item.institution}>
                      <div className="about-entry-identity">
                        <TextEffect as="h3">{item.institution}</TextEffect>
                        <TextEffect as="p" className="about-entry-meta" per="line">{`${item.location}\n${item.dates}`}</TextEffect>
                      </div>
                      <div className="about-entry-detail">
                        <TextEffect as="h3" delay={0.04}>{item.qualification}</TextEffect>
                        <TextEffect as="p" className="about-body-copy" delay={0.08}>{item.detail}</TextEffect>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`about-fold-panel about-fold-skills${openPanels.has("skills") ? " is-active" : ""}`}
          >
            <div className="about-fold-trigger">
              <TextEffect className="about-fold-number" per="char">03</TextEffect>
              <TextEffect className="about-fold-title portfolio-display-title" per="char">Skills</TextEffect>
            </div>
            <button
              aria-controls="skills-content"
              aria-expanded={openPanels.has("skills")}
              aria-label={`${openPanels.has("skills") ? "Collapse" : "Expand"} Skills folder`}
              className="about-fold-toggle"
              data-cuelume-press={openPanels.has("skills") ? "droplet" : "bloom"}
              onClick={() => togglePanel("skills")}
              type="button"
            >
              <span aria-hidden="true">{openPanels.has("skills") ? "−" : "+"}</span>
            </button>
            <div
              aria-hidden={!openPanels.has("skills")}
              className="about-fold-reveal"
              id="skills-content"
            >
              <div className="about-fold-content">
                <div className="about-skills-list">
                  {skillGroups.map((group) => (
                    <div className="about-skill-row" key={group.category}>
                      <TextEffect as="h3">{group.category}</TextEffect>
                      <TextEffect as="p" className="about-body-copy" delay={0.05}>{group.skills}</TextEffect>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="about-summary">
          <div data-about-parallax="-4">
            <p className="about-summary-statement">
              <TextEffect>Curiosity, creativity, collaboration.</TextEffect>
              <TextEffect delay={0.08}>From thinking it through to making it happen.</TextEffect>
            </p>
            <TextEffect as="p" className="about-body-copy" delay={0.08}>
              With experience across financial services and global creative agencies, I combine copywriting, content strategy, campaign analysis and hands-on production to make complex ideas clear and memorable.
            </TextEffect>
            <a href="/documents/Yihan_Jiang_CV_2026.pdf" target="_blank" rel="noreferrer">
              <TextEffect>View résumé</TextEffect>
            </a>
          </div>
        </section>

        <section className="contact-callout" id="contact">
          <div className="contact-message-wrap">
            <h2 className="contact-message">
              <TextEffect className="contact-message-line">Let&apos;s make something</TextEffect>
              <span className="contact-message-line">
                <DiaText className="contact-message-accent" text="cool together" />
              </span>
            </h2>
          </div>
          <div className="contact-links">
            <a href="mailto:ian.yihan.jiang@gmail.com" data-cuelume-press="pulse">
              <span className="contact-link-label"><Mail aria-hidden="true" /><TextEffect>Email</TextEffect></span>
            </a>
            <a href="https://www.instagram.com/iannnnnnn_7/?hl=en-gb" target="_blank" rel="noreferrer">
              <span className="contact-link-label"><Instagram aria-hidden="true" /><TextEffect>Instagram</TextEffect></span>
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/631c7def0000000023025023" target="_blank" rel="noreferrer">
              <span className="contact-link-label"><BookOpenText aria-hidden="true" /><TextEffect>Xiaohongshu</TextEffect></span>
            </a>
            <a href="/documents/Yihan_Jiang_CV_2026.pdf" target="_blank" rel="noreferrer">
              <span className="contact-link-label"><FileText aria-hidden="true" /><TextEffect>Résumé</TextEffect></span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
