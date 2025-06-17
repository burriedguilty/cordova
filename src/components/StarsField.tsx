'use client';

import { useEffect, useState } from 'react';
import styles from "../styles/RetroGrid.module.css";

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

export default StarsField;
