import type { Metadata } from "next";
import { ProjectDrawer } from "../components/ProjectDrawer";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected campaign, content and brand projects by Yihan Jiang.",
};

export default function WorkPage() {
  return <ProjectDrawer />;
}
