import React, { useState, useEffect, ReactNode } from 'react';

interface ScrollFadeSectionProps {
  children: ReactNode;
  fadeOutThreshold?: number; // Persentase scroll dimana fade out mulai (0-100)
  fadeOutSpeed?: number; // Kecepatan fade out (semakin besar semakin cepat)
}

const ScrollFadeSection: React.FC<ScrollFadeSectionProps> = ({
  children,
  fadeOutThreshold = 15, // Default mulai fade out pada 15% scroll
  fadeOutSpeed = 2.5, // Default kecepatan fade
}) => {
  const [opacity, setOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      // Hitung persentase scroll
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;
      
      // Hitung opacity berdasarkan scroll
      if (scrollPercentage <= fadeOutThreshold) {
        // Belum mencapai threshold, opacity tetap 1
        setOpacity(1);
      } else {
        // Mulai fade out setelah melewati threshold
        const fadeOutPercentage = scrollPercentage - fadeOutThreshold;
        const newOpacity = Math.max(0, 1 - (fadeOutPercentage * fadeOutSpeed / 100));
        setOpacity(newOpacity);
      }
    };
    
    // Tambahkan event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener saat component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fadeOutThreshold, fadeOutSpeed]);
  
  return (
    <div 
      style={{ 
        opacity, 
        transition: 'opacity 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFadeSection;
