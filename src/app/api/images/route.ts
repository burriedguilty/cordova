import { NextResponse } from 'next/server';
import { getImagesFromDirectory } from '@/utils/imageUtils';

export async function GET() {
  try {
    // Get images from both directories
    const galleryImages = await getImagesFromDirectory('public/gallery');
    const recentImages = await getImagesFromDirectory('public/recent');
    
    // Filter out non-image files from recent (like JSON files)
    const filteredRecentImages = recentImages.filter(item => {
      const ext = item.src.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext || '');
    });

    return NextResponse.json({
      gallery: galleryImages,
      recent: filteredRecentImages
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
