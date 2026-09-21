import type { Metadata } from "next";
import { PageFrame } from "../../components/PageFrame";
import { PhotographyCollections } from "../../components/PhotographyCollections";

export const metadata: Metadata = {
  title: "Photography Collections",
  description: "Browse travel and landscape photography collections by Yihan Jiang.",
};

export default function PhotographyCollectionsPage() {
  return (
    <PageFrame theme="light" className="photography-collections-frame">
      <PhotographyCollections />
    </PageFrame>
  );
}
