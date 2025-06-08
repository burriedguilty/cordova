'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/RetroGrid.module.css";
import ScrollFadeSection from "./ScrollFadeSection";

// Add glitch effect keyframes to the component
const glitchKeyframes = `
@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff;
    transform: translate(0);
  }
  14% {
    text-shadow: 0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff;
  }
  15% {
    text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffff;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #ff00ff, 0.025em 0.025em 0 #00ffff;
  }
  50% {
    text-shadow: 0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00ffff;
    transform: translate(0);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 #ff00ff, 0.05em 0 0 #00ffff;
    transform: translate(0);
  }
  100% {
    text-shadow: -0.025em 0 0 #ff00ff, -0.025em -0.025em 0 #00ffff;
    transform: translate(0);
  }
}

@keyframes glitchText {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  83% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  92% {
    opacity: 0;
  }
  95% {
    opacity: 1;
  }
}
`;

// Komponen untuk menangani bintang-bintang dinamis dengan aman
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



const AUTHOR = "by Cordova";

const LINE1 = "Cordova&apos;s portfolio here";
const LINE2 = "Here you&apos;ll find a selection of my works.";
const LINE3 = "Digital experiments and portfolio projects.";

const WelcomeSection = () => {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);
  const [authorVisible, setAuthorVisible] = useState(false);
  
  // Add the glitch effect styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = glitchKeyframes;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  useEffect(() => {
    // Line 1 finishes typing (2.5s)
    const timer1 = setTimeout(() => setLine1Done(true), 2500);
    
    // Line 2 starts after line 1 finishes (2.5s + 2.5s = 5s)
    const timer2 = setTimeout(() => setLine2Done(true), 5000);
    
    // Line 3 starts after line 2 finishes (5s + 2.5s = 7.5s)
    const timer3 = setTimeout(() => setLine3Done(true), 7500);
    
    // Author appears 1 second after line 3 finishes (7.5s + 2.5s + 1s = 11s)
    const timer4 = setTimeout(() => setAuthorVisible(true), 11000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section className="h-screen w-full bg-black flex flex-col justify-center items-center relative">
      {/* Stars Background */}
      <div className={styles.starsContainer}>
        <StarsField />
      </div>
      
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="w-full flex items-center justify-between px-4">
          {/* Left: Logo - Always in left corner */}
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] absolute left-2 md:left-4 top-2 md:top-4">
            <video
              src="/logocorner.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
              aria-label="Logo animation"
              tabIndex={-1}
              onContextMenu={e => e.preventDefault()}
            />
          </div>
          
          {/* Center: Website Name with Glitch Effect */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-widest text-center mx-auto pt-1 md:pt-0">
            <span className="hidden xs:inline" style={{ animation: 'glitch 2s infinite' }}>CORDOVA&apos;s</span>
            <span className="xs:hidden" style={{ animation: 'glitch 2s infinite' }}>CORDOVA&apos;s</span>
            {' '}
            <span style={{
              animation: 'glitchText 3s infinite',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              textShadow: '0.05em 0 0 #ff00ff, -0.05em -0.025em 0 #00ffff',
            }}>
              GALLERY
            </span>
          </div>
          
          {/* Right: Social Button - Always in right corner */}
          <div className="w-[36px] md:w-[40px] absolute right-2 md:right-4 top-2 md:top-4">
            <a
              href="https://x.com/cordovaxyz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Cordova on X (Twitter)"
              className="rounded-full bg-neutral-900 border border-neutral-700 p-1.5 md:p-2 hover:bg-neutral-800 transition flex items-center justify-center"
            >
              {/* X (Twitter) SVG Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: 'white' }}
                suppressHydrationWarning
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </header>
      
      {/* Center Content - Optimized for mobile */}
      <ScrollFadeSection fadeOutThreshold={10} fadeOutSpeed={3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center px-4 md:px-6 relative z-10 mt-16 sm:mt-20 md:mt-0"
        >
          <div className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl w-full">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_4px_8px_rgba(255,255,255,0.25)] mb-4 md:mb-8 leading-relaxed flex flex-col gap-1">
              <div>
                <span className="typewriter-paragraph">{LINE1}</span>
              </div>
              
              {line1Done && (
                <div>
                  <span className={`typewriter-paragraph ${line2Done ? 'typing-done' : ''}`}>{LINE2}</span>
                </div>
              )}
              
              {line2Done && (
                <div>
                  <span className={`typewriter-paragraph ${line3Done ? 'typing-done' : ''}`}>{LINE3}</span>
                </div>
              )}
            </div>
          </div>
          
          {authorVisible && (
            <p className="text-base sm:text-lg md:text-xl text-white font-semibold mt-4 md:mt-8 drop-shadow-[0_2px_4px_rgba(255,255,255,0.25)] fade-in">
              {AUTHOR}
            </p>
          )}
        </motion.div>
      </ScrollFadeSection>
    </section>
  );
};

export default WelcomeSection;
