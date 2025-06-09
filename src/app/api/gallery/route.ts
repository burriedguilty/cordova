import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define types for our gallery items
interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
  category?: string;
}

export async function GET() {
  try {
    // Define the paths to the category directories
    const nftPath = path.join(process.cwd(), 'public', 'nft');
    const memecoinPath = path.join(process.cwd(), 'public', 'memecoin_project');
    const junglebayPath = path.join(process.cwd(), 'public', 'junglebay');
    const galleryPath = path.join(process.cwd(), 'public', 'gallery'); // Keep original gallery for backward compatibility
    
    // Create directories if they don't exist
    ensureDirectoryExists(nftPath);
    ensureDirectoryExists(memecoinPath);
    ensureDirectoryExists(junglebayPath);
    ensureDirectoryExists(galleryPath);
    
    // Read the NFT directory
    let nftFiles: GalleryItem[] = [];
    try {
      nftFiles = fs.readdirSync(nftPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/nft/${file}`,
          title: formatTitle(file),
          category: 'NFT'
        }));
    } catch (err) {
      console.warn('Error reading NFT directory:', err);
      nftFiles = [];
    }
    
    // Read the MEMECOIN PROJECT directory
    let memecoinFiles: GalleryItem[] = [];
    try {
      memecoinFiles = fs.readdirSync(memecoinPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/memecoin_project/${file}`,
          title: formatTitle(file),
          category: 'MEMECOIN PROJECT'
        }));
    } catch (err) {
      console.warn('Error reading MEMECOIN PROJECT directory:', err);
      memecoinFiles = [];
    }
    
    // Read the JUNGLEBAY directory
    let junglebayFiles: GalleryItem[] = [];
    try {
      junglebayFiles = fs.readdirSync(junglebayPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/junglebay/${file}`,
          title: formatTitle(file),
          category: 'JUNGLEBAY'
        }));
    } catch (err) {
      console.warn('Error reading JUNGLEBAY directory:', err);
      junglebayFiles = [];
    }
    
    // Read the original gallery directory for backward compatibility
    let galleryFiles: GalleryItem[] = [];
    try {
      galleryFiles = fs.readdirSync(galleryPath)
        .filter(file => /\.(jpe?g|png)$/i.test(file))
        .map(file => ({
          src: `/gallery/${file}`,
          title: formatTitle(file),
          category: 'Gallery'
        }));
    } catch (err) {
      console.warn('Error reading gallery directory:', err);
      galleryFiles = [];
    }
    
    // Combine all files into a single array
    const allFiles = [...nftFiles, ...memecoinFiles, ...junglebayFiles, ...galleryFiles];
    
    return NextResponse.json({
      nft: nftFiles,
      memecoin: memecoinFiles,
      junglebay: junglebayFiles,
      gallery: galleryFiles,
      all: allFiles
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
