'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/RetroGrid.module.css';
import ScrollFadeSection from './ScrollFadeSection';

// Component for handling stars animation
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
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
    setStars(starElements);
  }, [mounted]);

  if (!mounted) return null;
  return <div className={styles.stars}>{stars}</div>;
};

const AUTHOR = "by Cordova";

const WelcomeSection = () => {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);
  const [authorVisible, setAuthorVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add the glitch effect styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      .typewriter-paragraph {
        overflow: hidden;
        white-space: nowrap;
        animation: typing 2.5s steps(40, end) forwards;
        display: inline-block;
        word-break: break-word;
        overflow-wrap: break-word;
        width: 100%;
        border-right: none !important;
        position: relative;
      }
      
      /* Override any potential cursor styles from other sources */
      .typewriter-paragraph::after,
      .typewriter-paragraph::before {
        display: none !important;
        content: none !important;
      }
      
      .no-cursor {
        border-right: none !important;
      }
      
      .no-cursor::after {
        content: none !important;
        display: none !important;
        border: none !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Line 1 finishes typing (2.5s)
    const timer1 = setTimeout(() => setLine1Done(true), 2500);
    
    // Line 2 starts after line 1 finishes (2.5s + 2.5s = 5s)
    const timer2 = setTimeout(() => setLine2Done(true), 5000);
    
    // Line 3 starts after line 2 finishes (5s + 2.5s = 7.5s)
    const timer3 = setTimeout(() => setLine3Done(true), 7500);
    
    // Author appears after line 3 finishes (7.5s + 3.5s = 11s)
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
      <div className={styles.starsContainer} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
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
            />
          </div>
          
          {/* Center: Website Name with Green Glitch Effect */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white tracking-widest text-center mx-auto pt-1 md:pt-0">
            <span style={{
              animation: 'greenGlitch 4s infinite',
              letterSpacing: '0.1em',
              display: 'inline-block',
              position: 'relative',
              textShadow: '0.05em 0 0 rgba(0, 255, 127, 0.75), -0.05em -0.025em 0 rgba(0, 255, 170, 0.75)'
            }}>
              go where you breathe free
            </span>
          </div>
          
          {/* Right: Social Dropdown Menu - Always in right corner */}
          <div className="w-[40px] md:w-[44px] absolute right-2 md:right-4 top-2 md:top-4">
            <div className="relative" ref={dropdownRef}>
              <button 
                className="rounded-full bg-neutral-900 border border-neutral-700 p-1.5 md:p-2 hover:bg-neutral-800 transition flex items-center justify-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Social Media Links"
                aria-expanded={dropdownOpen}
              >
                {/* Profile Icon SVG */}
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  style={{ color: 'white' }}
                  suppressHydrationWarning
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-md shadow-lg border border-neutral-700 z-50">
                  <div className="py-1">
                    <a 
                      href="https://x.com/cordovaxyz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-white hover:bg-neutral-800 transition"
                    >
                      {/* X (Twitter) Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      X
                    </a>
                    
                    <a 
                      href="https://instagram.com/cordovaxyz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-white hover:bg-neutral-800 transition"
                    >
                      {/* Instagram Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </a>
                    
                    <a 
                      href="https://junglebayisland.com/homeartists" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-white hover:bg-neutral-800 transition"
                    >
                      {/* JungleBay Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M19.75 2C21.539 2 23 3.461 23 5.25v13.5c0 1.789-1.461 3.25-3.25 3.25H4.25C2.461 22 1 20.539 1 18.75V5.25C1 3.461 2.461 2 4.25 2h15.5zm.25 2H4v16h16V4zm-7 3.5c2.486 0 4.5 2.014 4.5 4.5s-2.014 4.5-4.5 4.5-4.5-2.014-4.5-4.5 2.014-4.5 4.5-4.5zm-5.5 1a1 1 0 110 2 1 1 0 010-2zm5.5.5c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5z" />
                      </svg>
                      JungleBay Home Artists
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Center Content - Optimized for mobile */}
      <ScrollFadeSection fadeOutThreshold={10} fadeOutSpeed={3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-6 relative z-10 mt-16 sm:mt-20 md:mt-0"
        >
          <div className="max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl w-full">
            <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_4px_8px_rgba(255,255,255,0.25)] mb-4 md:mb-8 leading-relaxed flex flex-col gap-1">
              <div className="break-words">
                <span className="typewriter-paragraph no-cursor">A small corner for storing</span>
              </div>
              
              {line1Done && (
                <div className="break-words">
                  <span className={`typewriter-paragraph no-cursor ${line2Done ? 'typing-done' : ''}`}>
                    <span className="hidden xs:inline">visual notes—digital pieces</span>
                    <span className="xs:hidden">visual notes—digital pieces</span>
                  </span>
                </div>
              )}
              
              {line2Done && (
                <div className="break-words">
                  <span className={`typewriter-paragraph no-cursor ${line3Done ? 'typing-done' : ''}`}>
                    <span className="hidden xs:inline">and creative projects that have taken shape over time.</span>
                    <span className="xs:hidden">and creative projects over time.</span>
                  </span>
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

      {/* Green Glitch Animation Keyframes */}
      <style jsx global>{`
        @keyframes greenGlitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(0, 255, 127, 0.75), -0.05em -0.025em 0 rgba(0, 255, 170, 0.75);
            transform: translate(0);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(0, 255, 127, 0.75), 0.025em 0.025em 0 rgba(0, 255, 170, 0.75);
          }
          30% {
            text-shadow: -0.05em -0.025em 0 rgba(0, 255, 127, 0.75), 0.025em 0.025em 0 rgba(0, 255, 170, 0.75);
          }
          45% {
            text-shadow: 0.025em 0.05em 0 rgba(0, 255, 127, 0.75), 0.05em 0 0 rgba(0, 255, 170, 0.75);
            transform: translate(0.01em, 0.01em);
          }
          60% {
            text-shadow: 0.025em 0.05em 0 rgba(0, 255, 127, 0.75), 0.05em 0 0 rgba(0, 255, 170, 0.75);
            transform: translate(-0.01em, -0.01em);
          }
          75% {
            text-shadow: -0.025em 0 0 rgba(0, 255, 127, 0.75), -0.025em -0.025em 0 rgba(0, 255, 170, 0.75);
            transform: translate(0.01em, 0);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(0, 255, 127, 0.75), -0.025em -0.025em 0 rgba(0, 255, 170, 0.75);
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
};

export default WelcomeSection;
