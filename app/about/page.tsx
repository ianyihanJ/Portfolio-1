import type { Metadata } from "next";
import { PageFrame } from "../components/PageFrame";
import { AboutScrollStory } from "../components/AboutScrollStory";

export const metadata: Metadata = {
  title: "About",
  description: "About Yihan Jiang, a London-based creative marketing professional.",
};

export default function AboutPage() {
  return (
    <PageFrame theme="light" className="about-frame" mobileMenuColor="#ffda24">
      <AboutScrollStory />
    </PageFrame>
  );
}
