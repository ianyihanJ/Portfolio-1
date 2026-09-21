import type { Metadata } from "next";
import { PageFrame } from "../components/PageFrame";
import { InteractiveVisualGallery } from "../components/InteractiveVisualGallery";
import { AnimatedGrainGradient } from "../components/AnimatedGrainGradient";
import { visualArchive } from "../data/visuals";
import { GradualSpacing } from "@/components/ui/gradual-spacing";

export const metadata: Metadata = {
  title: "Visual Archive",
  description: "Interactive design, illustration and graphic experiments by Yihan Jiang.",
};

export default function VisualArchivePage() {
  return (
    <PageFrame theme="light" className="visuals-frame">
      <section className="visual-gradient-cap">
        <AnimatedGrainGradient variant="visuals" />
        <header className="visual-index-heading channel-gradient-copy">
          <p className="page-enter section-label">Visual archive</p>
          <GradualSpacing className="portfolio-display-title" text="Visuals" />
          <p className="page-enter">
            Selected interface ideas, illustrations, posters and visual studies from
            commissioned and self-initiated work.
          </p>
        </header>
      </section>

      <InteractiveVisualGallery items={visualArchive} />
    </PageFrame>
  );
}
