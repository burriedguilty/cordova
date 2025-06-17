'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import GalleryItemComponent, { GalleryItem } from './GalleryItem';
import dynamic from 'next/dynamic';

// Import Particles component dynamically with no SSR
const Particles = dynamic(() => import('./Particles'), { ssr: false });

// Breakpoints for masonry layout
const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1
};



// Hook to dynamically load images from different category folders
function useGalleryImages() {
  const [nftItems, setNftItems] = useState<GalleryItem[]>([]);
  const [memecoinItems, setMemecoinItems] = useState<GalleryItem[]>([]);
  const [junglebayItems, setJunglebayItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.nft && Array.isArray(data.nft)) {
          setNftItems(data.nft);
        }
        
        if (data.memecoin && Array.isArray(data.memecoin)) {
          setMemecoinItems(data.memecoin);
        }
        
        if (data.junglebay && Array.isArray(data.junglebay)) {
          setJunglebayItems(data.junglebay);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchImages();
  }, []);

  return { nftItems, memecoinItems, junglebayItems, loading, error };
}

const GallerySection = () => {
  const { nftItems, memecoinItems, junglebayItems, loading, error } = useGalleryImages();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const handleCategoryChange = (category: string) => {
    console.log('Category changed to:', category);
    setActiveCategory(category);
  };
  
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black opacity-80 z-0" />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {typeof window !== 'undefined' && (
          <Suspense fallback={null}>
            <Particles
              particleColors={['#00ffaa', '#0088ff', '#ffffff']} 
              particleCount={200}
              particleSpread={15}
              speed={0.2}
              particleBaseSize={120}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </Suspense>
        )}
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px 0px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth entry
            delay: 0.1
          }}
        >
          Gallery
        </motion.h2>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-20">
          <button 
            className={`px-6 py-2 rounded-full text-white transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-white/20 border border-white/40' : 'bg-white/10 hover:bg-white/15'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryChange('all');
            }}
            type="button"
          >
            All
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-white transition-all cursor-pointer ${activeCategory === 'nft' ? 'bg-white/20 border border-white/40' : 'bg-white/10 hover:bg-white/15'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryChange('nft');
            }}
            type="button"
          >
            NFT
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-white transition-all cursor-pointer ${activeCategory === 'memecoin' ? 'bg-white/20 border border-white/40' : 'bg-white/10 hover:bg-white/15'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryChange('memecoin');
            }}
            type="button"
          >
            MEMECOIN PROJECT
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-white transition-all cursor-pointer ${activeCategory === 'junglebay' ? 'bg-white/20 border border-white/40' : 'bg-white/10 hover:bg-white/15'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryChange('junglebay');
            }}
            type="button"
          >
            JUNGLEBAY
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-red-400 text-xl">{error}</div>
          </div>
        ) : (
          <>
            {/* NFT Section */}
            {(activeCategory === 'all' || activeCategory === 'nft') && (
              <div className="mb-16">
                {activeCategory === 'all' && (
                  <motion.h3 
                    className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px 0px" }}
                    transition={{ duration: 0.5 }}
                  >
                    NFT
                  </motion.h3>
                )}
                
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex w-auto -ml-4"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {nftItems.length === 0 && (
                    <div className="text-white text-center">No NFT images found. Add images to the public/nft directory.</div>
                  )}
                  {nftItems.map((item, idx) => (
                    <GalleryItemComponent key={item.src + idx} item={item} idx={idx} onImageClick={setSelectedImage} />
                  ))}
                </Masonry>
              </div>
            )}
            
            {/* MEMECOIN PROJECT Section */}
            {(activeCategory === 'all' || activeCategory === 'memecoin') && (
              <div className="mb-16">
                {activeCategory === 'all' && (
                  <motion.h3 
                    className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px 0px" }}
                    transition={{ duration: 0.5 }}
                  >
                    MEMECOIN PROJECT
                  </motion.h3>
                )}
                
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex w-auto -ml-4"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {memecoinItems.length === 0 && (
                    <div className="text-white text-center">No MEMECOIN PROJECT images found. Add images to the public/memecoin_project directory.</div>
                  )}
                  {memecoinItems.map((item, idx) => (
                    <GalleryItemComponent key={item.src + idx} item={item} idx={idx} onImageClick={setSelectedImage} />
                  ))}
                </Masonry>
              </div>
            )}
            
            {/* JUNGLEBAY Section */}
            {(activeCategory === 'all' || activeCategory === 'junglebay') && (
              <div className="mb-16">
                {activeCategory === 'all' && (
                  <motion.h3 
                    className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px 0px" }}
                    transition={{ duration: 0.5 }}
                  >
                    JUNGLEBAY
                  </motion.h3>
                )}
                
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex w-auto -ml-4"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {junglebayItems.length === 0 && (
                    <div className="text-white text-center">No JUNGLEBAY images found. Add images to the public/junglebay directory.</div>
                  )}
                  {junglebayItems.map((item, idx) => (
                    <GalleryItemComponent key={item.src + idx} item={item} idx={idx} onImageClick={setSelectedImage} />
                  ))}
                </Masonry>
              </div>
            )}
          </>
        )}
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
