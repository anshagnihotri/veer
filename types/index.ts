export type WeddingStory = {
  id: string;
  couple: string;
  location: string;
  date: string;
  image: string;
  video?: string;
  slug: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  couple: string;
  location: string;
  image: string;
};
