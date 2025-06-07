import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Interface for image metadata
interface ImageMetadata {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

export async function GET() {
  try {
    // Path to the recent directory
    const recentDir = path.join(process.cwd(), 'public', 'recent');
    
    // Check if directory exists
    if (!fs.existsSync(recentDir)) {
      return NextResponse.json([]);
    }
    
    // Read the directory
    const files = fs.readdirSync(recentDir);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Sort by modification time (newest first)
    const sortedImageFiles = imageFiles
      .map(file => ({
        name: file,
        mtime: fs.statSync(path.join(recentDir, file)).mtime
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
      .map(file => file.name);
    
    // Take only the first 3 images
    const recentImages = sortedImageFiles.slice(0, 3);
    
    // Create image metadata objects
    const imageMetadata: ImageMetadata[] = recentImages.map(file => {
      const baseName = path.basename(file, path.extname(file));
      const jsonPath = path.join(recentDir, `${baseName}.json`);
      
      // Default metadata
      let metadata: ImageMetadata = {
        src: `/recent/${file}`,
        title: baseName
      };
      
      // Try to load JSON metadata if it exists
      if (fs.existsSync(jsonPath)) {
        try {
          const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          metadata = {
            ...metadata,
            ...jsonData
          };
        } catch (e) {
          console.error(`Error parsing JSON metadata for ${file}:`, e);
        }
      }
      
      return metadata;
    });
    
    return NextResponse.json(imageMetadata);
  } catch (error) {
    console.error('Error reading recent images:', error);
    return NextResponse.json({ error: 'Failed to read recent images' }, { status: 500 });
  }
}
