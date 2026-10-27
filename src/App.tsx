import React, { useState, useEffect } from 'react';
import { BackgroundVignette } from './components/BackgroundVignette';
import { InteractiveCursor } from './components/InteractiveCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { Playground } from './components/Playground';
import { PersonBehind } from './components/PersonBehind';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgress } from './components/ScrollProgress';

export const App: React.FC = () => {
  // Default theme is dark studio mode; users can toggle to warm paper light mode anytime
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sangeeta_theme');
      if (saved === 'light') return false;
      return true; // default to dark
    } catch {
      return true;
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sangeeta_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sangeeta_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 ${
        darkMode ? 'bg-studio-bg text-white' : 'bg-paper text-ink'
      }`}
    >
      {/* Reading Progress Line & Floating Back to Top */}
      <ScrollProgress />

      {/* Interactive Contextual Magnetic Cursor */}
      <InteractiveCursor />

      {/* Subtle architectural background grid */}
      <div className="fixed inset-0 grid-bg-paper pointer-events-none z-0" />

      {/* Organic Light Vignette with Mouse Parallax */}
      <BackgroundVignette darkMode={darkMode} />

      {/* Floating Pill Navigation with Active Scroll Tracking */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Editorial Canvas */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <Works />
        <Playground />
        <PersonBehind onOpenResume={() => setIsResumeOpen(true)} />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* PDF Resume Drawer / Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
