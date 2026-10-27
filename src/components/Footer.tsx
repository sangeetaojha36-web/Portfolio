import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border text-ink-muted dark:text-studio-muted text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© 2026 Sangeeta Ojha. Designed with architectural systems & code.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-stone-400">
            Set in Instrument Serif & Plus Jakarta Sans
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 hover:text-ink dark:hover:text-white transition-colors"
          >
            <span>Top</span>
            <i className="fas fa-arrow-up text-[10px]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
