import React, { useState, useEffect } from 'react';
import { playPopSound } from '../utils/audio';

interface RotatingTextProps {
  phrases: string[];
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsTransitioning(false);
      }, 350);
    }, 4200);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    playPopSound();
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setIsTransitioning(false);
    }, 250);
  };

  return (
    <span
      onClick={handleNext}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }}
      className={`inline-block relative cursor-pointer select-none transition-colors group ${className}`}
      title="Click to cycle focus area"
    >
      <span
        className={`inline-block font-serif italic font-normal text-clay group-hover:text-amber-600 transition-all duration-300 ease-out transform ${
          isTransitioning
            ? 'opacity-0 -translate-y-2'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {phrases[index]}
      </span>
      {/* Subtle indicator underline */}
      <span className="block h-[1.5px] w-full bg-clay/30 scale-x-75 group-hover:scale-x-100 group-hover:bg-clay transition-all duration-300" />
    </span>
  );
};
