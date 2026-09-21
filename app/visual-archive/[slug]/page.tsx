import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "../../components/PageFrame";
import { VisualDetailGallery } from "../../components/VisualDetailGallery";
import { getVisualArchiveItem, visualArchive } from "../../data/visuals";

type VisualDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return visualArchive.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: VisualDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getVisualArchiveItem(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function VisualDetailPage({ params }: VisualDetailPageProps) {
  const { slug } = await params;
  const item = getVisualArchiveItem(slug);
  if (!item) notFound();

  return (
    <PageFrame theme="light" className="visual-detail-frame">
      <VisualDetailGallery item={item} />
    </PageFrame>
  );
}
