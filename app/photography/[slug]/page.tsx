import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "../../components/PageFrame";
import { PhotographyCollectionDetail } from "../../components/PhotographyCollectionDetail";
import {
  getPhotographyCollection,
  photographyCollections,
} from "../../data/photography";

type PhotographyCollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return photographyCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: PhotographyCollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getPhotographyCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function PhotographyCollectionPage({
  params,
}: PhotographyCollectionPageProps) {
  const { slug } = await params;
  const collection = getPhotographyCollection(slug);
  if (!collection) notFound();

  return (
    <PageFrame theme="light" className="photography-detail-frame">
      <PhotographyCollectionDetail collection={collection} />
    </PageFrame>
  );
}
