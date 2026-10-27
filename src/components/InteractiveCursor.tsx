import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const pos = useRef({ mouseX: -100, mouseY: -100, curX: -100, curY: -100 });

  useEffect(() => {
    // Only enable for pointer devices that support hover (not mobile touch screens)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.mouseX = e.clientX;
      pos.current.mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    let animId: number;
    const animate = () => {
      pos.current.curX += (pos.current.mouseX - pos.current.curX) * 0.18;
      pos.current.curY += (pos.current.mouseY - pos.current.curY) * 0.18;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${pos.current.curX}px, ${pos.current.curY}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animate);

    // Contextual hover listener
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        setCursorLabel(cursorEl.getAttribute('data-cursor'));
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('a, button, input, textarea, .card-vignette');
      if (interactive) {
        setIsHovered(true);
        setCursorLabel(null);
      } else {
        setIsHovered(false);
        setCursorLabel(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Sharp Center Pointer Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-clay pointer-events-none z-[100] transition-opacity duration-300 hidden md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Trailing Organic Pill / Circle */}
      <div
        ref={circleRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99] transition-all duration-200 ease-out hidden md:flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorLabel
            ? 'px-3 py-1 -ml-8 -mt-4 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg shadow-soft text-[10px] font-mono tracking-wider font-semibold uppercase'
            : isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 rounded-full border border-clay bg-clay/10 scale-125'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border border-stone-400/40 bg-stone-300/10'
        }`}
      >
        {cursorLabel && <span>{cursorLabel}</span>}
      </div>
    </>
  );
};
