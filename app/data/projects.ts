export type ProjectLayout =
  | "editorial"
  | "campaign-grid"
  | "sequence"
  | "cinematic"
  | "publication"
  | "pitch-board"
  | "poster-wall";

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  fit?: "contain";
  kind?: "video";
  poster?: string;
  section?: string;
  group?: "h5-game" | "video-pair";
};

export type ProjectNarrative = string | string[];

export type ProjectSection = {
  label: string;
  description?: ProjectNarrative;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  insight: ProjectNarrative;
  idea?: ProjectNarrative;
  approach: ProjectNarrative;
  impact?: ProjectNarrative;
  layout: ProjectLayout;
  accent: string;
  cover: string;
  coverAlt: string;
  coverWidth?: number;
  coverHeight?: number;
  coverFit?: "contain";
  coverSection?: string;
  sections?: Record<string, ProjectSection>;
  posterNote?: string;
  mediaGroupLabels?: {
    h5Game?: string;
  };
  closingSection?: {
    title: string;
    description?: string;
    video?: {
      src: string;
      label: string;
      poster?: string;
    };
  };
  gallery: ProjectMedia[];
  video?: {
    src: string;
    poster: string;
    caption: string;
    first?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
  };
};

export const projects: Project[] = [
  {
    slug: "ocean-tide-wealth",
    title: "Ocean Tide Wealth",
    shortTitle: "Ocean Tide",
    client: "Ocean Tide Wealth",
    category: "Content and Brand",
    year: "2024 to present",
    role: "Creative Marketing Executive",
    summary:
      "An integrated marketing programme connecting financial expertise with content, social media, video, events and business development.",
    insight:
      "Financial information can quickly become technical, repetitive or difficult to engage with. The opportunity was to translate specialist knowledge into content that felt clear, timely and easily understandable.",
    approach:
      "I developed a consistent content framework across articles, newsletters, social media, video and marketing collateral. Each format was tailored to its audience, channel and purpose while maintaining a clear and recognisable brand voice.",
    impact:
      "Delivered more than 100 articles and newsletters and over 50 video assets across multiple channels. Social following increased by 82.7%, while marketing activity supported more than £10 million in completed mortgage and insurance business.",
    layout: "editorial",
    accent: "#318457",
    cover: "/projects/ocean-tide/01.jpg",
    coverAlt: "Ocean Tide Wealth business development and events portfolio",
    gallery: [
      { src: "/projects/ocean-tide/02.png", alt: "Ocean Tide Wealth cover and leaflet designs", caption: "Cover and leaflet designs" },
      { src: "/projects/ocean-tide/03.png", alt: "Ocean Tide Wealth brochure designs", caption: "Brochure designs" },
      { src: "/projects/ocean-tide/04.png", alt: "Ocean Tide Wealth case study and slide designs", caption: "Case study and presentation design" },
      { src: "/projects/ocean-tide/07.jpg", alt: "Ocean Tide Wealth additional brand design work", caption: "More design work" },
      { src: "/projects/ocean-tide/08.jpg", alt: "Ocean Tide Wealth voucher, poster and postcard designs", caption: "Print and promotional design" },
      { src: "/projects/ocean-tide/09.png", alt: "Ocean Tide Wealth festive poster designs", caption: "Festive poster design" },
      { src: "/projects/ocean-tide/videos/finance-bro-2022.mp4", alt: "Finance Bro campaign video from 2022", caption: "finance bro - 2022", width: 720, height: 1280, kind: "video", poster: "/projects/ocean-tide/videos/finance-bro-2022-poster.jpg", section: "Video work", group: "video-pair" },
      { src: "/projects/ocean-tide/videos/panel-discussion-event.mp4", alt: "Panel Discussion Event film for 11k, Regal and Ocean Tide Wealth", caption: "Panel Discussion Event 11k x Regal x Ocean Tide Wealth", width: 720, height: 1280, kind: "video", poster: "/projects/ocean-tide/videos/panel-discussion-event-poster.jpg", section: "Video work", group: "video-pair" },
    ],
  },
  {
    slug: "fanta-colourful-snacking",
    title: "Fanta Snack League",
    shortTitle: "Fanta Snack League",
    client: "Fanta",
    category: "Integrated Campaign",
    year: "2022",
    role: "Concept Development and Copywriting",
    summary:
      "A summer campaign designed to make Fanta the natural drink choice alongside after school snacks.",
    insight:
      "For secondary school students, buying snacks after class is a familiar everyday ritual. The opportunity was to make Fanta the drink naturally associated with that moment and strengthen its connection with youth snacking occasions.",
    approach: [
      "We partnered with Orion on joint packaging and developed the idea of a Snack League, turning the simple act of eating snacks and drinking Fanta into a playful competition.",
      "Selected bundles included game props that could be used for snack challenges. The campaign extended onto the Fanta NSL platform, where users could share challenge videos, unlock badges and compete for higher scores.",
      "By combining product pairing, branded packaging and interactive play, the campaign made the Fanta and snack combination both easy to recognise and fun to participate in.",
    ],
    closingSection: {
      title: "Fanta TVC",
      description:
        "A playful, deliberately repetitive animated TVC that uses absurd humour and a catchy rhythm to reinforce the brand slogan and make it more memorable.",
      video: {
        src: "/projects/fanta/videos/fanta-snack-league-tvc.mp4",
        label: "Fanta Snack League TVC",
        poster: "/projects/fanta/01-snack-league.jpg",
      },
    },
    layout: "campaign-grid",
    accent: "#f17303",
    cover: "/projects/fanta/01-snack-league.jpg",
    coverAlt: "Fanta National Snack League campaign proposal",
    gallery: [
      { src: "/projects/fanta/02-platform.jpg", alt: "Fanta occasion building platform presentation", caption: "Platform direction" },
      { src: "/projects/fanta/03-strategy.jpg", alt: "Three Fanta colourful snacking strategic routes", caption: "Strategic routes" },
      { src: "/projects/fanta/04-sports-gear.jpg", alt: "Fanta snack league sports gear activation", caption: "Participation mechanic" },
      { src: "/projects/fanta/05-social-badges.jpg", alt: "Fanta social badge and mobile content system", caption: "Social reward system" },
    ],
  },
  {
    slug: "fanta-summer-flavour",
    title: "WTFanta",
    shortTitle: "WTFanta",
    client: "Fanta and Bilibili",
    category: "Product Launch and Interactive Activation",
    year: "2022",
    role: "Concept Development, Copywriting",
    summary:
      "A summer product launch for Fanta Baobab & Tamarind, an exclusive regional flavour created for the Chinese market, using mystery, entertainment and interactive play to drive curiosity and product trial.",
    insight:
      "For teenagers facing highly structured school routines, summer offered a chance to look for something more surprising and playful. The unusual colour and unfamiliar baobab and tamarind flavour gave Fanta an opportunity to turn product discovery into a mystery worth exploring.",
    approach: [
      "We built the launch around suspense and curiosity, using the WTFanta concept to dramatise the unusualness of the new flavour and encourage trial.",
      "The campaign combined a playful TVC with an interactive activation in partnership with Bilibili. A question mark printed on the bottle acted as the entry point to a mobile H5 game, where players controlled a character through a space themed challenge, avoided obstacles and collected baobab fruit before reaching Baobab Planet.",
      "The experience connected packaging, entertainment and digital participation, turning an unfamiliar flavour into something audiences could discover, play with and ultimately try.",
    ],
    layout: "sequence",
    accent: "#e973a5",
    cover: "/projects/fanta-summer/01-product-launch.jpg",
    coverAlt: "Fanta summer new flavour campaign opening slide",
    mediaGroupLabels: {
      h5Game: "Mobile H5 Game x Bilibili",
    },
    closingSection: {
      title: "WTFanta TVC",
      description:
        "A team of flavour spies sets out to investigate the mystery behind Fanta's unexpected new taste, turning the flavour reveal into a playful investigation.",
      video: {
        src: "/projects/fanta-summer/videos/wtfanta-tvc.mp4",
        label: "WTFanta TVC",
        poster: "/projects/fanta-summer/01-product-launch.jpg",
      },
    },
    gallery: [
      { src: "/projects/fanta-summer/02-summer-context.jpg", alt: "Fanta summer audience context", caption: "Audience context" },
      { src: "/projects/fanta-summer/03-role-of-fanta.jpg", alt: "Role of Fanta within the summer platform", caption: "Brand role" },
      { src: "/projects/fanta-summer/04-platform.jpg", alt: "Fanta Find Your Weird platform", caption: "NPD platform" },
      { src: "/projects/fanta-summer/05-manifesto.jpg", alt: "Fanta and Bilibili campaign manifesto", caption: "Campaign manifesto" },
      { src: "/projects/fanta-summer/06-strategy-map.jpg", alt: "Fanta campaign strategy map", caption: "Strategy map" },
      { src: "/projects/fanta-summer/08-h5-01.jpg", alt: "Fanta and Bilibili H5 game opening screen", caption: "H5 game screen 01", width: 346, height: 748, group: "h5-game" },
      { src: "/projects/fanta-summer/09-h5-02.jpg", alt: "Fanta and Bilibili H5 game interaction screen", caption: "H5 game screen 02", width: 346, height: 748, group: "h5-game" },
      { src: "/projects/fanta-summer/10-h5-03.jpg", alt: "Fanta and Bilibili H5 game character screen", caption: "H5 game screen 03", width: 402, height: 872, group: "h5-game" },
      { src: "/projects/fanta-summer/11-h5-04.jpg", alt: "Fanta and Bilibili H5 game result screen", caption: "H5 game screen 04", width: 404, height: 872, group: "h5-game" },
      { src: "/projects/fanta-summer/07-campaign-mark.jpg", alt: "What the Fanta campaign mark", caption: "Campaign identity" },
    ],
  },
  {
    slug: "coca-cola",
    title: "Coca Cola",
    shortTitle: "Coca Cola",
    client: "Coca Cola",
    category: "CNY Integrated Campaign",
    year: "2022",
    role: "Concept Development and Copywriting",
    summary:
      "A Chinese New Year campaign concept positioning Coca Cola as the sponsor of every kind of festive gathering, connecting brand storytelling, ecommerce activation and social participation.",
    insight: [
      "For many people working away from home, Chinese New Year is not defined by one family reunion alone. It is a season filled with different kinds of gatherings, from family dinners and friendship groups to colleagues, couples and housemates.",
      "Coca Cola has long been associated with moments of celebration and togetherness. The opportunity was to bring that brand role into a contemporary Chinese New Year context and give people the freedom to celebrate with whoever mattered to them.",
    ],
    idea: [
      "Coca Cola sponsors your reunion.",
      "Whatever your New Year reunion looked like, Coca Cola could help make it happen.",
      "The idea turned the brand's association with togetherness into a tangible consumer benefit, combining festive storytelling with ecommerce rewards and social participation.",
    ],
    approach: [
      "We proposed a partnership with Taobao that invited users to search for My New Year Sponsor and enter a dedicated Coca Cola campaign experience featuring exclusive member offers and an interactive H5 game.",
      "The game reimagined the traditional Chinese Touhu activity as a digital bottle challenge, where users could win shopping rewards, earn extra attempts by inviting friends and unlock opportunities for Coca Cola to sponsor items from their shopping basket.",
      "The activation was amplified across tiktok, Weibo and Bilibili through campaign content and creator participation, with influencers and KOLs taking on the challenge across different New Year gathering scenarios.",
    ],
    layout: "cinematic",
    accent: "#e03124",
    cover: "/projects/coca-cola/01-game-challenge.jpg",
    coverAlt: "Coca-Cola Chinese New Year Douyin game challenge",
    sections: {
      "H5 Touhu Bottle Challenge": {
        label: "Interactive activation",
        description: [
          "A digital reinterpretation of the traditional Chinese Touhu game, turning a familiar festive activity into an interactive Coca Cola challenge with rewards, social participation and ecommerce conversion. Players received five attempts each day to throw straws into Coca Cola bottles and unlock rewards. The first interaction guaranteed a successful throw, creating an immediate incentive to participate and encouraging first purchase conversion.",
          "Additional attempts could be earned by inviting friends, introducing a social mechanic that extended participation beyond the individual user.",
        ],
      },
    },
    gallery: [
      { src: "/projects/coca-cola/04-concept.jpg", alt: "Coca-Cola Douyin challenge concept", caption: "Participation idea", section: "H5 Touhu Bottle Challenge" },
      { src: "/projects/coca-cola/01-game-challenge.jpg", alt: "Coca-Cola pitch-pot game challenge", caption: "Game challenge", section: "H5 Touhu Bottle Challenge" },
      { src: "/projects/coca-cola/03-interaction-flow.jpg", alt: "Coca-Cola in-app interaction flow", caption: "Interaction flow", section: "H5 Touhu Bottle Challenge" },
      { src: "/projects/coca-cola/02-social-launch.jpg", alt: "Coca-Cola social launch across Weibo and mobile", caption: "Social launch", section: "Social Media Promotion" },
      { src: "/projects/coca-cola/05-social-posters.jpg", alt: "Coca-Cola Chinese New Year social poster series", caption: "Social stories", section: "Social Media Promotion" },
    ],
    video: {
      src: "/projects/coca-cola/interaction-film.mov",
      poster: "/projects/coca-cola/01-game-challenge.jpg",
      caption: "Interactive experience recording",
      first: true,
      autoPlay: true,
      loop: true,
    },
  },
  {
    slug: "hongkong-land-brandbook",
    title: "Hongkong Land",
    shortTitle: "Hongkong Land",
    client: "Hongkong Land",
    category: "Brand Narrative",
    year: "2021",
    role: "Lead Copywriter",
    summary:
      "A 41 page brand book defining the positioning and narrative of Shanghai West Bund Financial Centre as a world class urban destination.",
    insight: [
      "Shanghai West Bund Financial Centre was designed to be more than a commercial development. Its ambition was to create an integrated urban centre bringing together international finance, fashion, tourism, culture and art within the wider West Bund district.",
      "The challenge was to translate the scale, history and future ambition of the development into one clear and coherent brand story.",
    ],
    approach: [
      "I structured the brand narrative as a gradual journey from China to Shanghai and then into Xuhui and the West Bund, giving the project a clear sense of place and context.",
      "The story moved through the area's century long history, regional overview and masterplan before introducing the brand slogan, positioning and long term vision.",
      "From there, the narrative explored five defining pillars of the development including finance, fashion, tourism, culture and art, showing how each contributed to the wider destination proposition.",
      "I developed the copy across the 41 page brand book and later took on the role of lead copywriter, overseeing the overall narrative direction and copy consistency across the final publication.",
    ],
    layout: "publication",
    accent: "#665e43",
    cover: "/projects/hongkong-land/04-brand-platform.jpg",
    coverAlt: "West Bund Financial Hub brand platform",
    gallery: [
      { src: "/projects/hongkong-land/01-waterfront.jpg", alt: "Hongkong Land West Bund Financial Hub waterfront vision", caption: "Waterfront vision" },
      { src: "/projects/hongkong-land/02-brand-title.jpg", alt: "Hongkong Land brand book title spread", caption: "Project introduction" },
      { src: "/projects/hongkong-land/03-masterplan.jpg", alt: "West Bund Financial Hub masterplan", caption: "Masterplan narrative" },
      { src: "/projects/hongkong-land/05-experience.jpg", alt: "West Bund destination experience principles", caption: "Experience pillars" },
      { src: "/projects/hongkong-land/06-location.jpg", alt: "West Bund Financial Hub location story", caption: "Location story" },
    ],
  },
  {
    slug: "mr-muscle-global-pitch",
    title: "Mr Muscle Global Pitch",
    shortTitle: "Mr Muscle",
    client: "SC Johnson",
    category: "Integrated Campaign",
    year: "2021",
    role: "Copywriting and Campaign Development",
    summary:
      "A global campaign proposal designed to shift consumers from using dish soap for general kitchen cleaning to choosing a purpose built kitchen cleaner.",
    insight:
      "Using dish soap beyond the sink had become an everyday habit because it felt convenient and good enough. The opportunity was to challenge that behaviour by showing consumers that different cleaning jobs deserve the right product.",
    idea: [
      "From Alright to All Right",
      "The creative idea challenged the habit of settling for something that simply works when a better solution already exists.",
      "You would not wash your clothes with shampoo or settle for the wrong choice elsewhere in life. So why settle for dish soap when cleaning the kitchen?",
      "Mr Muscle became the right product for the right job, offering a simpler route to a sparkling clean kitchen.",
    ],
    approach: [
      "Across seven rounds of global pitch development, we built the idea into an integrated campaign spanning TVC, celebrity content, social media, live streaming, retail activation and trade marketing.",
      "For Mid Autumn Festival, we proposed a social activation inviting consumers to share kitchens in need of a proper clean. Selected participants could receive a home cleaning visit from Mr Muscle and the campaign celebrity, bringing the idea of getting the kitchen right into a culturally relevant reunion moment.",
      "The campaign also extended into modern trade environments through island displays, gondola ends and shelf executions, reinforcing the product benefit at the point of purchase.",
    ],
    layout: "pitch-board",
    accent: "#db5f29",
    cover: "/projects/mr-muscle/01-manifesto.jpg",
    coverAlt: "Mr Muscle From Alright to Right campaign manifesto",
    gallery: [
      { src: "/projects/mr-muscle/02-strategy.jpg", alt: "Mr Muscle behavioural campaign strategy", caption: "Behavioural strategy" },
      { src: "/projects/mr-muscle/03-social.jpg", alt: "Mr Muscle celebrity social activation", caption: "Social activation" },
      { src: "/projects/mr-muscle/04-retail-sketch-a.jpg", alt: "Mr Muscle retail activation sketch", caption: "Retail study 01" },
      { src: "/projects/mr-muscle/05-retail-sketch-b.jpg", alt: "Mr Muscle retail activation corner sketch", caption: "Retail study 02" },
    ],
  },
  {
    slug: "upper-south-corner",
    title: "Upper South Corner",
    shortTitle: "Upper South Corner",
    client: "Upper South Corner",
    category: "Restaurant Campaign",
    year: "2020",
    role: "Campaign Planning and Copywriting",
    summary:
      "A restaurant launch campaign combining location based promotion with in venue customer experiences during the national holiday period.",
    insight:
      "National holidays brought travellers from different provinces and regions into the city. The campaign used the distance they had travelled as part of the promotional idea, turning where customers came from into a reason to engage with the restaurant.",
    approach: [
      "For local customers, daily step counts could be exchanged for discounts at checkout. For visitors from other cities, travel tickets were used to verify their journey, with longer travel distances unlocking greater dining discounts.",
      "The campaign also included an offline flower arrangement activity in collaboration with a local florist, adding a social and experiential element beyond the meal itself.",
    ],
    layout: "poster-wall",
    accent: "#98560d",
    cover: "/projects/upper-south-corner/01-city-lightbox.jpg",
    coverAlt: "Upper South Corner campaign shown on city lightboxes",
    posterNote:
      "By turning steps and travel distance into tangible rewards, the campaign created a simple participation mechanic that connected the restaurant experience with the wider holiday journey.",
    gallery: [
      { src: "/projects/upper-south-corner/02-coordinate-poster.jpg", alt: "Upper South Corner coordinate campaign poster", caption: "Journey marker" },
      { src: "/projects/upper-south-corner/03-poster.jpg", alt: "Upper South Corner tasting journey poster", caption: "Taste journey 01" },
      { src: "/projects/upper-south-corner/04-poster.jpg", alt: "Upper South Corner regional landscape poster", caption: "Taste journey 02" },
      { src: "/projects/upper-south-corner/05-poster.jpg", alt: "Upper South Corner flower arrangement poster", caption: "Flower pop-up" },
    ],
  },
  {
    slug: "peijie-hotpot",
    title: "Peijie Hotpot",
    shortTitle: "Peijie Hotpot",
    client: "Peijie Hotpot",
    category: "Brand Marketing",
    year: "2021 to 2022",
    role: "Campaign Planning, Creative Concept and Copywriting",
    summary:
      "A six month brand marketing programme building a consistent identity across brand communications, anniversary campaigns and seasonal content.",
    insight:
      "In a competitive hotpot market, Peijie needed a distinctive brand story that went beyond individual promotions. The opportunity was to build stronger recognition around its authentic Chongqing roots while creating a consistent identity across different customer occasions.",
    approach: [
      "Over six months, I worked across several stages of the brand's marketing, from the brand brochure and eighth anniversary campaign to the following Chinese New Year seasonal campaign.",
      "My role focused on developing core creative ideas, campaign messaging, promotional slogans and video scripts. The work connected online communications with in restaurant materials and seasonal campaigns, creating a more consistent expression of Peijie's authentic Chongqing hotpot positioning.",
    ],
    impact:
      "The programme strengthened Peijie's brand presence across multiple customer touchpoints and reinforced its association with authentic Chongqing hotpot. Continued seasonal marketing helped carry this positioning into the following year and supported ongoing customer engagement.",
    layout: "editorial",
    accent: "#a8352b",
    cover: "/projects/peijie-hotpot/01.png",
    coverAlt: "Peijie Hotpot brand marketing presentation overview",
    coverWidth: 2110,
    coverHeight: 1418,
    coverFit: "contain",
    coverSection: "Brand Brochure",
    sections: {
      "Brand Brochure": {
        label: "Brand Marketing",
        description:
          "Establishing the brand story, messaging and visual direction around Peijie's authentic Chongqing hotpot identity.",
      },
      "8th Anniversary": {
        label: "Anniversary Campaign",
        description:
          "An integrated anniversary campaign bringing the brand story across online communications, promotional materials and the in restaurant experience.",
      },
      "Chinese New Year Film": {
        label: "Seasonal Campaign",
        description:
          "A Chinese New Year brand film built around reunion, shared dining and the cultural role of hotpot during the festive season.",
      },
    },
    gallery: [
      { src: "/projects/peijie-hotpot/02.png", alt: "Peijie Hotpot product range presentation", caption: "Product range", width: 2110, height: 1418, fit: "contain", section: "Brand Brochure" },
      { src: "/projects/peijie-hotpot/03.png", alt: "Peijie Hotpot fresh ingredient brand story", caption: "Brand story", width: 2110, height: 1406, fit: "contain", section: "Brand Brochure" },
      { src: "/projects/peijie-hotpot/04.png", alt: "Peijie Hotpot cooking guide and product story", caption: "Product guide", width: 2110, height: 1420, fit: "contain", section: "Brand Brochure" },
      { src: "/projects/peijie-hotpot/anniversary/01.png", alt: "Peijie Hotpot eighth anniversary poster campaign", caption: "8th anniversary poster 01", width: 2014, height: 1132, fit: "contain", section: "8th Anniversary" },
      { src: "/projects/peijie-hotpot/anniversary/02.png", alt: "Peijie Hotpot eighth anniversary campaign design", caption: "8th anniversary poster 02", width: 2014, height: 1132, fit: "contain", section: "8th Anniversary" },
      { src: "/projects/peijie-hotpot/anniversary/03.png", alt: "Peijie Hotpot eighth anniversary campaign application", caption: "8th anniversary poster 03", width: 2036, height: 1146, fit: "contain", section: "8th Anniversary" },
      { src: "/projects/peijie-hotpot/cny/01-key-visual.png", alt: "Peijie Hotpot Chinese New Year video campaign key visual", caption: "CNY campaign key visual", width: 2048, height: 1150, fit: "contain", section: "Chinese New Year Film" },
      { src: "/projects/peijie-hotpot/cny/peijie-cny-campaign-film.mp4", alt: "Peijie Hotpot Chinese New Year campaign film", caption: "CNY campaign film", width: 1354, height: 720, kind: "video", poster: "/projects/peijie-hotpot/cny/01-key-visual.png", section: "Chinese New Year Film" },
      { src: "/projects/peijie-hotpot/05-last.png", alt: "Peijie Hotpot creative presentation closing page", caption: "Creative presentation", width: 2702, height: 1482, fit: "contain" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
