export type VisualArchiveItem = {
  slug: string;
  title: string;
  type: string;
  year: string;
  summary: string;
  image: string;
  gallery: string[];
};

export const visualArchive: VisualArchiveItem[] = [
  {
    slug: "the-unknown-colour",
    title: "The Unknown Colour",
    type: "Interactive H5 test",
    year: "2020",
    summary: "An interactive colour study turning instinctive choices into an expressive visual identity.",
    image: "/portfolio/page-15.jpg",
    gallery: ["/portfolio/page-15.jpg", "/portfolio/page-17.jpg", "/portfolio/page-18.jpg", "/portfolio/page-19.jpg"],
  },
  {
    slug: "fanta-x-bilibili",
    title: "Fanta x Bilibili",
    type: "AR and H5 game",
    year: "2022",
    summary: "A playful summer activation connecting packaging, augmented reality and a mobile game experience.",
    image: "/portfolio/page-16.jpg",
    gallery: ["/portfolio/page-16.jpg", "/portfolio/page-10.jpg", "/portfolio/page-09.jpg", "/portfolio/page-12.jpg"],
  },
  {
    slug: "poster-studies",
    title: "Poster Studies",
    type: "Graphic design",
    year: "2018 to 2022",
    summary: "Typographic and image-led experiments exploring rhythm, hierarchy and visual interruption.",
    image: "/portfolio/page-17.jpg",
    gallery: ["/portfolio/page-17.jpg", "/portfolio/page-08.jpg", "/portfolio/page-15.jpg", "/portfolio/page-11.jpg"],
  },
  {
    slug: "digital-portraits",
    title: "Digital Portraits",
    type: "Digital painting",
    year: "2019 to 2024",
    summary: "A continuing portrait practice focused on atmosphere, gesture and character-led colour.",
    image: "/portfolio/page-18.jpg",
    gallery: ["/portfolio/page-18.jpg", "/portfolio/page-19.jpg", "/portfolio/page-15.jpg", "/portfolio/page-17.jpg"],
  },
  {
    slug: "webtoons",
    title: "Webtoons",
    type: "Illustration",
    year: "Ongoing",
    summary: "Sequential illustration experiments combining cinematic framing with intimate everyday storytelling.",
    image: "/portfolio/page-19.jpg",
    gallery: ["/portfolio/page-19.jpg", "/portfolio/page-18.jpg", "/portfolio/page-17.jpg", "/portfolio/page-15.jpg"],
  },
  {
    slug: "printed-matter",
    title: "Printed Matter",
    type: "Posters and postcards",
    year: "2024",
    summary: "Small-format printed pieces where editorial systems meet tactile materials and event communication.",
    image: "/portfolio/page-08.jpg",
    gallery: ["/portfolio/page-08.jpg", "/portfolio/page-05.jpg", "/portfolio/page-06.jpg", "/portfolio/page-17.jpg"],
  },
];

export function getVisualArchiveItem(slug: string) {
  return visualArchive.find((item) => item.slug === slug);
}
