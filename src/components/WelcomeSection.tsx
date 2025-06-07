'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/RetroGrid.module.css";
import ScrollFadeSection from "./ScrollFadeSection";

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



const WEBSITE_NAME = "PORTFOLIO SITE";
const AUTHOR = "by John Doe";

const LINE1 = "Welcome to my creative space.";
const LINE2 = "Here you'll find a selection of my works.";
const LINE3 = "Digital experiments and portfolio projects.";

const socials = [
  { name: "GitHub", url: "https://github.com/", icon: "/globe.svg" },
  { name: "Twitter", url: "https://twitter.com/", icon: "/window.svg" },
  { name: "LinkedIn", url: "https://linkedin.com/", icon: "/vercel.svg" }
];

const WelcomeSection = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);
  const [authorVisible, setAuthorVisible] = useState(false);
  
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
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-10">
        {/* Mini Icon */}
        <div className="flex items-center">
          <video
            src="/logocorner.webm"
            autoPlay
            loop
            muted
            playsInline
            width={96}
            height={96}
            className="rounded select-none pointer-events-none"
            aria-label="Logo animation"
            tabIndex={-1}
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
        {/* Website Name */}
        <div className="text-xl md:text-2xl font-bold text-white tracking-widest text-center flex-1">
          {WEBSITE_NAME}
        </div>
        {/* Social Button Panel */}
        <div className="flex items-center justify-end min-w-[40px]">
          <button
            aria-label="Open Social Panel"
            onClick={() => setPanelOpen((v) => !v)}
            className="rounded-full bg-neutral-900 border border-neutral-700 p-2 hover:bg-neutral-800 transition"
          >
            {/* Using a client-only component to avoid hydration issues with browser extensions */}
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: 'white' }}
              suppressHydrationWarning
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="8" r="1" />
              <circle cx="12" cy="16" r="1" />
              <circle cx="12" cy="12" r="1" />
            </svg>
          </button>
          <AnimatePresence>
            {panelOpen && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.25 }}
                className="absolute top-16 right-8 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-20"
              >
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition"
                  >
                    <Image src={s.icon} alt={s.name} width={20} height={20} />
                    {s.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Center Content */}
      <ScrollFadeSection fadeOutThreshold={10} fadeOutSpeed={3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center px-4 relative z-10"
        >
          <div className="max-w-2xl w-full">
            <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_8px_rgba(255,255,255,0.25)] mb-8 leading-relaxed flex flex-col gap-1">
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
            <p className="text-xl text-white font-semibold mt-8 drop-shadow-[0_2px_4px_rgba(255,255,255,0.25)] fade-in">
              {AUTHOR}
            </p>
          )}
        </motion.div>
      </ScrollFadeSection>
      
      {/* Social panel removed to prevent duplication */}
    </section>
  );
};

export default WelcomeSection;
