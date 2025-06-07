# Gallery Folder Usage Guide

This folder is for managing the content of your GallerySection component.

## How to Add Gallery Items

1. **Add Images:**
   - Place your gallery images in the `src/gallery/images/` folder.
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`.

2. **Gallery Data:**
   - Edit the `src/gallery/galleryData.ts` file to add or update gallery items.
   - Each item should have at least:
     - `src`: relative path to the image (e.g. `images/myproject.jpg`)
     - `title`: project or artwork title
     - `description` (optional): short description
     - `link` (optional): URL to project, repo, or details

### Example `galleryData.ts`
```typescript
export interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: 'images/myproject.jpg',
    title: 'My Project',
    description: 'Short description here',
    link: 'https://github.com/username/project'
  },
  // Add more items...
];
```

## Rules
- Only use local images for best performance. Avoid hotlinking external URLs.
- Keep image file names descriptive and unique.
- For each new project/artwork, add a new object to `galleryItems`.
- You can update the GallerySection to map through `galleryItems` for dynamic rendering.

---

**Folder Structure Example:**
```
src/
  gallery/
    images/
      myproject.jpg
      anotherwork.png
    galleryData.ts
    README.md
```
