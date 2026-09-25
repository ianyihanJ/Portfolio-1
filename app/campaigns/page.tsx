import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageFrame } from "../components/PageFrame";
import { AnimatedGrainGradient } from "../components/AnimatedGrainGradient";
import { campaigns } from "../data/campaigns";
import { GradualSpacing } from "@/components/ui/gradual-spacing";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Selected campaign, activation and brand narrative work by Yihan Jiang.",
};

export default function CampaignsPage() {
  return (
    <PageFrame theme="light" className="campaigns-frame" mobileMenuColor="#98cfae">
      <section className="campaign-index" aria-labelledby="campaign-title">
        <div className="campaign-gradient-cap">
          <AnimatedGrainGradient variant="campaigns" />
          <header className="campaign-index-heading channel-gradient-copy">
            <p className="page-enter section-label">Selected campaign decks</p>
            <GradualSpacing
              className="portfolio-display-title"
              id="campaign-title"
              text="Campaigns"
            />
            <p className="page-enter">
              Integrated thinking across brand stories, launch moments, films,
              activations and social systems.
            </p>
          </header>
        </div>

        <div className="campaign-ledger" aria-label="Campaign case studies">
          {campaigns.map((campaign, index) => (
            <a
              className="campaign-ledger-row reveal"
              href={`/campaigns/${campaign.slug}`}
              key={campaign.slug}
              style={{
                "--campaign-row": campaign.rowColor ?? campaign.accent,
                "--campaign-ink": campaign.rowInk ?? campaign.ink,
              } as CSSProperties}
            >
              <div className="campaign-ledger-title">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{campaign.title}</h2>
              </div>
              <div className="campaign-ledger-meta">
                <time>{campaign.year}</time>
                <strong>{campaign.category}</strong>
              </div>
              <p>{campaign.summary}</p>
              <figure>
                <Image
                  src={campaign.pages[0].src}
                  alt=""
                  width={campaign.pages[0].width}
                  height={campaign.pages[0].height}
                  sizes="(max-width: 767px) 42vw, 25vw"
                />
              </figure>
              <span className="campaign-ledger-open">
                View campaign <ArrowUpRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
