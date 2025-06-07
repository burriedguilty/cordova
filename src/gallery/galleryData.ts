export interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: 'gallery-1.jpg',
    title: 'Portfolio Project',
    description: 'A showcase of my design work',
    link: 'https://example.com/portfolio'
  },
  {
    src: 'gallery-2.jpg',
    title: 'UI Design System',
    description: 'Component library for modern interfaces'
  },
  {
    src: 'gallery-3.jpg',
    title: 'Photography Collection',
    description: 'Selected works from 2023-2024',
    link: 'https://example.com/photos'
  }
];
