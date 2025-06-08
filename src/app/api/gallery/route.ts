import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define types for our gallery items
interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

export async function GET() {
  try {
    // Define the paths to the gallery and recent directories
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    const recentPath = path.join(process.cwd(), 'public', 'recent');
    
    // Create directories if they don't exist
    ensureDirectoryExists(galleryPath);
    ensureDirectoryExists(recentPath);
    
    // Read the gallery directory
    let galleryFiles: GalleryItem[] = [];
    try {
      galleryFiles = fs.readdirSync(galleryPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/gallery/${file}`,
          title: formatTitle(file)
        }));
    } catch (err) {
      console.warn('Error reading gallery directory:', err);
      galleryFiles = [];
    }
    
    // Read the recent directory
    let recentFiles: GalleryItem[] = [];
    try {
      recentFiles = fs.readdirSync(recentPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/recent/${file}`,
          title: formatTitle(file)
        }));
    } catch (err) {
      console.warn('Error reading recent directory:', err);
      recentFiles = [];
    }
    
    return NextResponse.json({
      gallery: galleryFiles,
      recent: recentFiles
    });
  } catch (error) {
    console.error('Error reading image directories:', error);
    return NextResponse.json(
      { error: 'Failed to read image directories' },
      { status: 500 }
    );
  }
}

// Helper function to ensure a directory exists
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper function to format file names into readable titles
function formatTitle(fileName: string): string {
  return fileName
    // Remove file extension
    .replace(/\.[^.]+$/, '')
    // Replace dashes and underscores with spaces
    .replace(/[-_]/g, ' ')
    // Capitalize first letter of each word
    .replace(/\b\w/g, (char) => char.toUpperCase())
    // Clean up any extra spaces
    .replace(/\s+/g, ' ')
    .trim();
}
