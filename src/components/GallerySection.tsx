'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import styles from "../styles/RetroGrid.module.css";

// Define GalleryItem interface
export interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

// Glassmorphism styles for consistent application
const glassCardStyle = {
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)'
};

// StarsField component for background animation
const StarsField: React.FC = () => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Only generate stars on the client to avoid hydration errors
    const starElements = Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      return (
        <div
          key={i}
          className={styles.star}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            '--duration': `${duration}s`,
            '--delay': `${delay}s`,
            opacity: top > 70 ? 1 : 0.3 + (top / 100) * 0.7
          } as React.CSSProperties}
        />
      );
    });
    setStars(starElements);
  }, [mounted]);

  if (!mounted) return null;
  return <div className={styles.stars}>{stars}</div>;
};

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1
};

// Hook to directly load images from the gallery and recent folders
function useGalleryImages() {
  const [recentItems, setRecentItems] = useState<GalleryItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Directly define the gallery images from the public folder
    const galleryImageList = [
      { src: '/gallery/download.jpeg', title: 'Gallery Image 1' },
      { src: '/gallery/download (1).jpeg', title: 'Gallery Image 2' },
      { src: '/gallery/download (2).jpeg', title: 'Gallery Image 3' },
      { src: '/gallery/download (3).jpeg', title: 'Gallery Image 4' },
      { src: '/gallery/download (4).jpeg', title: 'Gallery Image 5' },
      { src: '/gallery/download (5).jpeg', title: 'Gallery Image 6' },
      { src: '/gallery/images.jpeg', title: 'Gallery Image 7' }
    ];
    
    // Directly define the recent images
    const recentImageList = [
      { src: '/recent/project1.jpg', title: 'Project 1' },
      { src: '/recent/project2.jpeg', title: 'Project 2' },
      { src: '/recent/project3.jpeg', title: 'Project 3' }
    ];
    
    setGalleryItems(galleryImageList);
    setRecentItems(recentImageList);
    setLoading(false);
  }, []);

  return { recentItems, galleryItems, loading };
}

const GallerySection = () => {
  const { recentItems, galleryItems, loading } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
  // Close modal when pressing escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Stars Background - static */}
      <div className={styles.starsContainer}>
        <StarsField />
      </div>
      
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-12 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px 0px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth entry
            delay: 0.1
          }}
        >
          Recent Work
        </motion.h2>
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {loading && (
            <div className="text-white">Loading recent work...</div>
          )}
          {!loading && recentItems.length === 0 && (
            <div className="text-white">No recent work found. Add images to <code>public/recent</code>.</div>
          )}
          {!loading && recentItems.map((item, idx) => (
            <motion.div
              key={item.src + idx}
              className="mb-8 overflow-hidden shadow-lg transition-all duration-300 rounded-lg" 
              style={glassCardStyle}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ 
                duration: 0.9,
                ease: [0.25, 1, 0.5, 1], // Custom cubic bezier for smooth, elegant entry
                delay: 0.15 * idx, // Slightly longer staggered delay for more pronounced effect
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div 
                className="relative w-full h-80 cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item)}
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  className="object-cover transition-transform duration-300 hover:scale-110" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: 'transparent'
                  }}
                />
              </div>
              
            </motion.div>
          ))}
        </Masonry>

        <motion.h2 
          className="text-3xl font-bold text-white text-center mb-12 mt-24 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px 0px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth entry
            delay: 0.1
          }}
        >
          Past Gallery
        </motion.h2>
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {galleryItems.length === 0 && (
            <div className="text-white">No gallery items found. Add to <code>src/gallery/galleryData.ts</code>.</div>
          )}
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.src + idx}
              className="mb-8 rounded-lg overflow-hidden shadow-lg backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300" 
              style={glassCardStyle}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ 
                duration: 0.9,
                ease: [0.25, 1, 0.5, 1], // Custom cubic bezier for smooth, elegant entry
                delay: 0.15 * idx, // Slightly longer staggered delay for more pronounced effect
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div 
                className="relative w-full h-80 cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(item)}
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  className="object-cover transition-transform duration-300 hover:scale-110" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: 'transparent'
                  }}
                />
              </div>
              
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Full-screen image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              />
              <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg">
                <div className="relative w-full h-[80vh]">
                  <Image 
                    src={selectedImage.src} 
                    alt={selectedImage.title} 
                    className="object-contain" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 80vw"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: 'transparent'
                    }}
                  />
                </div>
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
