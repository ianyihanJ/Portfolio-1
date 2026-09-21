export type PhotographyCollection = {
  slug: string;
  title: string;
  place: string;
  year: string;
  description: string;
  cover: string;
  images: string[];
};

function makeImages(slug: string, count: number) {
  return Array.from(
    { length: count },
    (_, index) =>
      "/photography/" + slug + "/" + String(index + 1).padStart(2, "0") + ".jpg",
  );
}

function makeCollection(
  collection: Omit<PhotographyCollection, "cover" | "images"> & {
    imageCount: number;
    coverIndex?: number;
  },
): PhotographyCollection {
  const { imageCount, coverIndex = 0, ...metadata } = collection;
  const images = makeImages(collection.slug, imageCount);

  return {
    ...metadata,
    images,
    cover: images[coverIndex] ?? images[0],
  };
}

export const photographyCollections: PhotographyCollection[] = [
  makeCollection({
    slug: "london",
    title: "London",
    place: "London, UK",
    year: "Ongoing",
    description:
      "Markets, parks, interiors and street scenes gathered through everyday movement across London.",
    imageCount: 32,
    coverIndex: 4,
  }),
  makeCollection({
    slug: "chennai-hyderabad",
    title: "Chennai, Hyderabad",
    place: "India",
    year: "2026",
    description:
      "Wedding rituals, street movement and saturated colour observed across Chennai and Hyderabad.",
    imageCount: 13,
    coverIndex: 1,
  }),
  makeCollection({
    slug: "kuala-lumpur-penang",
    title: "Kuala Lumpur, Penang",
    place: "Malaysia",
    year: "2026",
    description:
      "Food stalls, temples, rain-soaked streets and quiet landscapes across Kuala Lumpur and Penang.",
    imageCount: 10,
    coverIndex: 3,
  }),
  makeCollection({
    slug: "valencia-madrid-seville",
    title: "Valencia, Madrid, Seville",
    place: "Spain",
    year: "Ongoing",
    description:
      "Signs, facades and late-night streets collected while moving between three Spanish cities.",
    imageCount: 14,
    coverIndex: 1,
  }),
  makeCollection({
    slug: "milano-bergamo-bologna",
    title: "Milano, Bergamo, Bologna",
    place: "Italy",
    year: "2024",
    description:
      "An architectural notebook of trees, thresholds, public rooms and street details in northern Italy.",
    imageCount: 12,
    coverIndex: 3,
  }),
  makeCollection({
    slug: "malta",
    title: "Malta",
    place: "Malta",
    year: "Ongoing",
    description:
      "Limestone streets, harbour light and everyday details from a compact Mediterranean landscape.",
    imageCount: 11,
  }),
  makeCollection({
    slug: "nice",
    title: "Nice",
    place: "Nice, France",
    year: "2023",
    description:
      "A Mediterranean study in blue water, pale architecture and sharp afternoon light.",
    imageCount: 8,
  }),
  makeCollection({
    slug: "luxembourg",
    title: "Luxembourg",
    place: "Luxembourg",
    year: "Ongoing",
    description:
      "Shopfronts, rooms and small collections that sit between domestic calm and public display.",
    imageCount: 9,
    coverIndex: 2,
  }),
  makeCollection({
    slug: "portimao",
    title: "Portimão",
    place: "Algarve, Portugal",
    year: "Ongoing",
    description:
      "Cliffs, open water and changing weather along the southern Portuguese coast.",
    imageCount: 7,
  }),
  makeCollection({
    slug: "dorset",
    title: "Dorset",
    place: "Dorset, UK",
    year: "Ongoing",
    description:
      "Coastal paths, summer grass and the broad horizon of England's Jurassic Coast.",
    imageCount: 5,
    coverIndex: 3,
  }),
  makeCollection({
    slug: "seven-sisters",
    title: "Seven Sisters",
    place: "East Sussex, UK",
    year: "2023",
    description:
      "Wind, chalk, sea and the human scale of the landscape along the English coast.",
    imageCount: 6,
    coverIndex: 4,
  }),
  makeCollection({
    slug: "cities-in-passing",
    title: "Cities in Passing",
    place: "Europe",
    year: "2023",
    description:
      "A travel notebook shaped by changing light, streets and the accidental rhythm of unfamiliar cities.",
    imageCount: 7,
    coverIndex: 1,
  }),
  makeCollection({
    slug: "flowers",
    title: "Flowers",
    place: "London, UK",
    year: "Ongoing",
    description:
      "A close study of blossom, branches and colour against clear seasonal skies.",
    imageCount: 9,
    coverIndex: 1,
  }),
];

export function getPhotographyCollection(slug: string) {
  return photographyCollections.find((collection) => collection.slug === slug);
}
