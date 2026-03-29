export interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
}

// Generating 20 photos as requested with the naming convention 'photography-n.webp'
export const photos: Photo[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/images/photography-${i + 1}.webp`, // Placed in public/images/
  title: `Artwork ${i + 1}`,
  category: i % 2 === 0 ? "Landscape" : "Portrait", // Example categories
}));

export const categories = ["All", "Landscape", "Portrait"];
