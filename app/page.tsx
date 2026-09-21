import type { Metadata } from "next";
import { HeroStage } from "./components/HeroStage";

export const metadata: Metadata = {
  title: "Yihan Jiang | Creative Portfolio",
  description:
    "Selected campaigns, visual design, editorial work and photography by Yihan Jiang.",
};

export default function Home() {
  return <HeroStage />;
}
