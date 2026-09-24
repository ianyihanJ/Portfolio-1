export type CampaignPage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CampaignNarrative = string | string[];

export type CampaignRecognition = {
  lead: string;
  award: string;
  tail: string;
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
  insight: CampaignNarrative;
  idea?: CampaignNarrative;
  approach: CampaignNarrative;
  recognition?: CampaignRecognition;
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
      "I reviewed iSAM's LinkedIn, website, editorial content and event presence alongside key competitors, then translated the findings into practical recommendations across content, design and audience engagement. The proposal included a recurring LinkedIn series, a four-week content plan, visual and data visualisation concepts, and a video campaign framework designed to make specialist market content more engaging and recognisable.",
    accent: "#227e73",
    ink: "#f8f7f1",
    pages: makePages("isam-securities", "iSAM Securities", 12, 1920, 1080),
  },
  {
    slug: "calleton",
    title: "Calleton",
    shortTitle: "Calleton",
    client: "Calleton",
    category: "Integrated Campaign",
    year: "2020",
    role: "Campaign Strategy and Creative Design",
    summary:
      "A vitamin E product campaign connecting nutrition education with social content, interactive experiences and retail activation.",
    insight:
      "Calleton was launching a new bread product enriched with vitamin E, but awareness of vitamin E and its nutritional value remained relatively limited among younger consumers. The opportunity was to make an overlooked nutritional benefit easier to understand, more relevant to everyday life and more engaging to share.",
    approach: [
      "The strategy was developed through industry, product, competitor and consumer analysis, then structured around a phased journey from awareness to engagement and retention.",
      "The first stage focused on social exposure through educational and story-led content, supported by KOLs and platforms including TikTok and Xiaohongshu (RedNote). A second wave combined online content with offline activations to extend reach and encourage participation.",
      "The final stage introduced social sharing mechanics, gamified H5 experiences and consumer incentives to support acquisition and retention. The campaign was further extended through branded merchandise and metro advertising, creating a consistent presence across digital and physical touchpoints.",
    ],
    recognition: {
      lead: "The project received a",
      award: "National Gold Prize",
      tail: "at the Academy Award of Advertising Festival of College Students.",
    },
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
    year: "2021",
    role: "Campaign Strategy and Creative Design",
    summary:
      "A brand campaign for a facial cleansing towel built around the idea that both products and people can have more than one side.",
    insight: [
      "The facial cleansing towel category had become increasingly difficult to differentiate, with similar product features and limited emotional connection between brands and consumers.",
      "Allmed Life offered a dual-sided product combining thickness and softness. For its audience of young urban professionals, this became a wider creative opportunity. Just as the product had more than one side, consumers also moved between different identities, emotions and ambitions in everyday life.",
    ],
    idea: [
      "A Thousand and One Sides",
      "Discover the beauty of your infinite possibilities.",
      "The concept connected the functional dual-sided product design with the many sides of modern life, giving the brand a more distinctive emotional territory beyond product performance.",
    ],
    approach: [
      "The campaign was developed through market, consumer, competitor and product analysis, then structured across three stages of the customer journey.",
      "The first stage used scenario-based experiences to create emotional connection and attract new audiences through shared identities and everyday moments. The second simplified product and brand messages into recognisable visual cues and content themes, helping strengthen awareness and brand recall.",
      "The third focused on social content and ongoing community engagement, encouraging consumers to express different sides of themselves while building longer-term interaction with the brand. The wider proposal extended the platform across advertising, TVC concepts, branded merchandise, digital performance and media planning, creating a consistent campaign system from awareness through to retention.",
    ],
    recognition: {
      lead: "The project won",
      award: "National Third Prize",
      tail: "in Campaign Planning at the National College Student Advertising Art Competition.",
    },
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
    category: "Brand Research and Strategy",
    year: "2020",
    role: "Research, Brand Analysis and Creative Design",
    summary:
      "A research study examining how Xiami Music built a distinctive brand identity within China's competitive music streaming market.",
    insight: [
      "China's major music platforms offered increasingly similar core services, making brand character, content culture and community experience important points of differentiation.",
      "Xiami stood out through its distinctive visual identity, recognisable cute shrimp mascot (XIAMI means Shrimp in Chinese), strong music discovery experience and long-standing support for independent musicians. Rather than competing through functionality alone, the brand had developed a particular creative character and relationship with music audiences.",
    ],
    approach: [
      "The study began with an overview of the Chinese music streaming category and its key marketing characteristics, followed by competitor analysis across NetEase Cloud Music, QQ Music, Kugou Music and Kuwo Music.",
      "I then focused on Xiami through several dimensions, tracing its development from its origins as EMUMO through its later evolution as Xiami Music, alongside its brand personality, advertising creativity, media performance, recent marketing trends and promotion initiatives.",
      "The research also explored how Xiami used design, original music, independent artist support and creative content to build a more distinctive cultural identity. The final section translated these findings into potential content directions across radio, commerce, live formats and interactive music discovery.",
      "FYI: Founded in Hangzhou in 2006 as EMUMO, Xiami later became part of Alibaba in 2013. Its music streaming service officially ended on 5 February 2021.",
    ],
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
