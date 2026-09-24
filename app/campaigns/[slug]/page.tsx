import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageFrame } from "../../components/PageFrame";
import { campaigns, getCampaign } from "../../data/campaigns";

type CampaignPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};

  return {
    title: campaign.title,
    description: campaign.summary,
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const currentIndex = campaigns.findIndex((item) => item.slug === campaign.slug);
  const nextCampaign = campaigns[(currentIndex + 1) % campaigns.length];
  const [cover, ...deckPages] = campaign.pages;

  const renderNarrative = (copy: string | string[]) => {
    const paragraphs = Array.isArray(copy) ? copy : [copy];

    return (
      <div className="project-story-paragraphs">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  };

  return (
    <PageFrame
      theme="light"
      className="project-detail-frame campaign-detail-frame"
      mobileMenuColor={campaign.accent}
    >
      <article
        className="project-detail campaign-detail"
        style={{
          "--project-accent": campaign.accent,
          "--campaign-detail-ink": campaign.ink,
        } as CSSProperties}
      >
        <div className="project-case-layout">
          <aside className="project-case-panel">
            <div className="project-case-panel-inner">
              <a className="page-enter project-back-link" href="/campaigns">
                Back to campaigns
              </a>

              <header className="project-heading">
                <p className="page-enter section-label">{campaign.category}</p>
                <h1 className="page-enter portfolio-display-title project-detail-title">
                  {campaign.title}
                </h1>
                <p className="page-enter project-summary">{campaign.summary}</p>
              </header>

              <dl className="page-enter project-meta">
                <div>
                  <dt>Client</dt>
                  <dd>{campaign.client}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{campaign.year}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{campaign.role}</dd>
                </div>
              </dl>

              <section className="page-enter project-story">
                <div className="project-story-copy">
                  <h2>The insight</h2>
                  {renderNarrative(campaign.insight)}
                </div>
                {campaign.idea ? (
                  <div className="project-story-copy project-story-idea">
                    <h2>The idea</h2>
                    {renderNarrative(campaign.idea)}
                  </div>
                ) : null}
                <div className={`project-story-copy${campaign.idea ? " project-story-copy-wide" : ""}`}>
                  <h2>The approach</h2>
                  {renderNarrative(campaign.approach)}
                </div>
                {campaign.recognition ? (
                  <div className="project-story-copy project-story-copy-wide campaign-recognition">
                    <h2>Recognition</h2>
                    <p>
                      {campaign.recognition.lead}{" "}
                      <strong>{campaign.recognition.award}</strong>{" "}
                      {campaign.recognition.tail}
                    </p>
                  </div>
                ) : null}
              </section>
            </div>
          </aside>

          <div
            className="project-media-stream campaign-deck-stream"
            style={{ backgroundColor: "#fff" }}
          >
            <figure className="project-media-item campaign-deck-cover page-enter">
              <Image
                src={cover.src}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                sizes="(max-width: 767px) 100vw, 68vw"
                priority
              />
            </figure>

            <div className="campaign-deck-pages">
              {deckPages.map((page, index) => (
                <figure
                  className="campaign-deck-page reveal"
                  key={page.src}
                  style={index === deckPages.length - 1 ? { gridColumn: "auto" } : undefined}
                >
                  <Image
                    src={page.src}
                    alt={page.alt}
                    width={page.width}
                    height={page.height}
                    sizes="(max-width: 767px) 48vw, 34vw"
                  />
                </figure>
              ))}
            </div>

            <a
              className="next-project reveal"
              href={`/campaigns/${nextCampaign.slug}`}
            >
              <span>Next campaign</span>
              <strong>{nextCampaign.shortTitle}</strong>
            </a>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
