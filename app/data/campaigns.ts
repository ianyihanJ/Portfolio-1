export type CampaignPage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Campaign = {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  insight: string;
  approach: string;
  accent: string;
  ink: string;
  rowColor?: string;
  rowInk?: string;
  pages: CampaignPage[];
};

function makePages(
  slug: string,
  title: string,
  count: number,
  width: number,
  height: number,
): CampaignPage[] {
  return Array.from({ length: count }, (_, index) => {
    const pageNumber = index + 1;
    return {
      src: `/campaigns/${slug}/page-${String(pageNumber).padStart(2, "0")}.jpg`,
      alt: `${title} campaign deck, page ${pageNumber}`,
      width,
      height,
    };
  });
}

export const campaigns: Campaign[] = [
  {
    slug: "isam-securities",
    title: "iSAM Securities",
    shortTitle: "iSAM Securities",
    client: "iSAM Securities",
    category: "Marketing Strategy",
    year: "2026",
    role: "Marketing Strategy and Campaign Proposal",
    summary:
      "A marketing pitch focused on building greater consistency across LinkedIn, digital content and event communications for an institutional trading brand.",
    insight:
      "iSAM Securities had strong specialist expertise, but its marketing often appeared as individual pieces rather than part of a consistent brand narrative. Competitor analysis showed that stronger firms were building authority through recurring content formats, expert commentary, clearer data presentation and more distinctive visual identities.",
    approach:
      "I reviewed iSAM's LinkedIn, website, editorial content and event presence alongside key competitors, then translated the findings into practical recommendations across content, design and audience engagement. The proposal included a recurring LinkedIn series, a four week content plan, visual and data visualisation concepts, and a video campaign framework designed to make specialist market content more engaging and recognisable.",
    accent: "#227e73",
    ink: "#f8f7f1",
    pages: makePages("isam-securities", "iSAM Securities", 12, 1920, 1080),
  },
  {
    slug: "calleton",
    title: "Calleton",
    shortTitle: "Calleton",
    client: "Calleton",
    category: "Social Campaign",
    year: "2021",
    role: "Campaign Strategy and Creative Planning",
    summary:
      "A vitamin E campaign that connects product education with search, social conversation, H5 interactions and retail activation.",
    insight:
      "Functional nutrition language can feel distant from daily life. The opportunity was to turn vitamin E deficiency into a recognisable, shareable cultural prompt.",
    approach:
      "The proposal builds from market and competitor research into an acquisition-to-retention system across trending topics, Douyin, Xiaohongshu and a mini programme.",
    accent: "#00956d",
    ink: "#f8f7f1",
    pages: makePages("calleton", "Calleton", 15, 1800, 1272),
  },
  {
    slug: "allmed-life",
    title: "Allmed Life",
    shortTitle: "Allmed Life",
    client: "Allmed Life",
    category: "Integrated Campaign",
    year: "2022",
    role: "Campaign Strategy and Creative Planning",
    summary:
      "A research-led campaign proposal turning the brand idea of many-sided living into social participation and digital experiences.",
    insight:
      "The audience did not fit a single definition of wellbeing. The campaign needed to recognise the different roles, moods and ambitions that shape everyday life.",
    approach:
      "The deck moves from category and audience research into a phased creative platform spanning emoji-led social content, an H5 experience and a mini programme.",
    accent: "#fccf04",
    ink: "#171713",
    rowColor: "#fcf3ca",
    rowInk: "#171713",
    pages: makePages("allmed-life", "Allmed Life", 12, 1800, 1273),
  },
  {
    slug: "music-app",
    title: "Xiami Music",
    shortTitle: "Xiami Music",
    client: "Xiami Music",
    category: "Brand and Content Strategy",
    year: "2020",
    role: "Research, Strategy and Creative Direction",
    summary:
      "A visual brand review and content proposal exploring how a Chinese music platform could turn its character into a richer social ecosystem.",
    insight:
      "Music platforms were competing on similar catalogues and functionality. A distinctive brand character and participatory content system offered a more ownable relationship with listeners.",
    approach:
      "The deck combines category research, brand history and campaign analysis with content territories for radio, commerce, live formats and playful music discovery.",
    accent: "#1b1b1a",
    ink: "#ffea00",
    rowColor: "#ffffff",
    rowInk: "#171713",
    pages: makePages("music-app", "Xiami Music", 25, 1920, 1080),
  },
];

export function getCampaign(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}
