import React, { useState, useEffect } from 'react';
import { playClickSound } from '../utils/audio';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-clay via-amber-600 to-cobalt transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Circular Back-to-Top Indicator */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
          showBackToTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          data-cursor="TOP"
          aria-label="Scroll to top"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-paper-card/90 dark:bg-studio-card/90 backdrop-blur-md border border-paper-border dark:border-studio-border shadow-float hover:scale-110 active:scale-95 transition-all"
        >
          {/* Progress Ring */}
          <svg className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              className="text-stone-300/40 dark:text-stone-700/50"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-clay transition-all duration-100 ease-out"
            />
          </svg>

          {/* Centered Arrow / Percent on Hover */}
          <span className="relative z-10 flex items-center justify-center text-ink dark:text-white group-hover:-translate-y-0.5 transition-transform">
            <i className="fas fa-arrow-up text-xs text-ink-muted dark:text-studio-muted group-hover:text-clay transition-colors" />
          </span>

          {/* Mini tooltip percentage on hover */}
          <span className="absolute -top-7 text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink dark:bg-white text-paper dark:text-studio-bg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm whitespace-nowrap">
            {Math.round(scrollProgress)}%
          </span>
        </button>
      </div>
    </>
  );
};
