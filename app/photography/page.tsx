import type { Metadata } from "next";
import { PageFrame } from "../components/PageFrame";
import { PhotographyArchive } from "../components/PhotographyArchive";

export const metadata: Metadata = {
  title: "Photography",
  description: "Travel, landscape and everyday photography by Yihan Jiang.",
};

export default function PhotographyPage() {
  return (
    <PageFrame theme="light" className="photography-frame">
      <PhotographyArchive />
    </PageFrame>
  );
}
