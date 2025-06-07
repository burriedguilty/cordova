import fs from 'fs';
import path from 'path';

// Function to get all image files from a directory
export async function getImagesFromDirectory(directoryPath: string) {
  try {
    const fullPath = path.join(process.cwd(), directoryPath);
    
    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      console.error(`Directory not found: ${fullPath}`);
      return [];
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(fullPath);
    
    // Filter for image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Map to create image objects
    return imageFiles.map(file => {
      const fileName = path.basename(file);
      // Generate a title from the filename (remove extension and replace dashes/underscores with spaces)
      const title = path.basename(file, path.extname(file))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
      
      return {
        src: `/${directoryPath}/${fileName}`,
        title,
        description: '',
      };
    });
  } catch (error) {
    console.error('Error reading image directory:', error);
    return [];
  }
}
