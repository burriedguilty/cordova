'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import glareStyles from "../styles/GlareEffect.module.css";

// Define GalleryItem interface
export interface GalleryItem {
  src: string;
  title: string;
  description?: string;
  link?: string;
  category?: string;
}

// Glassmorphism styles for consistent application
const glassCardStyle = {
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)'
};

interface GalleryItemProps {
  item: GalleryItem;
  idx: number;
  onImageClick: (item: GalleryItem) => void;
}

const GalleryItemComponent = ({ item, idx, onImageClick }: GalleryItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move for dynamic glare effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate position as percentage
    const posX = (x / width) * 100;
    const posY = (y / height) * 100;
    
    // Apply custom property for the glare position
    containerRef.current.style.setProperty('--glare-position-x', `${posX}%`);
    containerRef.current.style.setProperty('--glare-position-y', `${posY}%`);
  };
  
  return (
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
        ref={containerRef}
        className={`relative w-full h-80 cursor-pointer overflow-hidden rounded-lg ${glareStyles.glareContainer}`}
        onClick={() => onImageClick(item)}
        onMouseMove={handleMouseMove}
      >
        <div className={glareStyles.glareEffect} />
        <Image 
          src={item.src} 
          alt={item.title} 
          className="object-cover transition-transform duration-300 hover:scale-110 relative z-0" 
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
  );
};

export default GalleryItemComponent;
