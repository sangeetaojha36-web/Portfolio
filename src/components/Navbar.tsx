import React, { useState, useEffect } from 'react';
import { Magnetic } from './Magnetic';
import { getSoundEnabled, setSoundEnabled, playPopSound, playClickSound } from '../utils/audio';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveTime, setLiveTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [soundActive, setSoundActive] = useState<boolean>(() => getSoundEnabled());

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        setLiveTime(formatter.format(now));
      } catch {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        setLiveTime(`${hours}:${minutesStr} ${ampm}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['works', 'playground', 'about', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'works', label: 'Selected Works', href: '#works' },
    { id: 'playground', label: 'Playground', href: '#playground' },
    { id: 'about', label: 'The Person Behind', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) {
      playPopSound();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Magnetic strength={0.25}>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            data-cursor="HOME"
            className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-paper-card/90 dark:bg-studio-card/90 backdrop-blur-md border border-paper-border dark:border-studio-border shadow-soft transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
            <span className="font-serif text-lg tracking-tight text-ink dark:text-white font-medium">
              Sangeeta Ojha
            </span>
            <span className="text-[11px] font-mono text-ink-muted dark:text-studio-muted hidden sm:inline">
              / AI & Software
            </span>
          </a>
        </Magnetic>

        {/* Floating Center Pill with active sliding highlight */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-soft ${
            isScrolled
              ? 'bg-paper-card/90 dark:bg-studio-card/90 border-paper-border dark:border-studio-border'
              : 'bg-paper-card/75 dark:bg-studio-card/75 border-paper-border/80 dark:border-studio-border/80'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'text-ink dark:text-white bg-stone-200/80 dark:bg-white/10 font-semibold shadow-sm'
                    : 'text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Tools (Sound, Live Time, Theme, PDF Resume) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Interactive Sound Wave Capsule */}
          <Magnetic strength={0.25}>
            <button
              onClick={handleToggleSound}
              data-cursor={soundActive ? 'MUTE' : 'AUDIO'}
              className="px-3 py-2 rounded-full bg-paper-card/85 dark:bg-studio-card/85 backdrop-blur-md border border-paper-border dark:border-studio-border text-xs font-mono text-ink-muted dark:text-studio-muted shadow-soft hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              title={soundActive ? 'Mute micro-audio effects' : 'Enable tactile audio effects'}
            >
              <span className="flex items-end gap-0.5 h-3">
                <span className={`w-0.5 rounded-full bg-clay transition-all ${soundActive ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 rounded-full bg-clay transition-all ${soundActive ? 'h-2 animate-bounce' : 'h-1'}`} />
                <span className={`w-0.5 rounded-full bg-clay transition-all ${soundActive ? 'h-3.5 animate-pulse' : 'h-1'}`} />
              </span>
              <span className="text-[11px] hidden sm:inline">{soundActive ? 'Audio: On' : 'Audio: Off'}</span>
            </button>
          </Magnetic>

          {/* Live IST Capsule */}
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-full bg-paper-card/85 dark:bg-studio-card/85 backdrop-blur-md border border-paper-border dark:border-studio-border text-xs font-mono text-ink-muted dark:text-studio-muted shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>IST {liveTime}</span>
          </div>

          {/* Theme Toggle */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => {
                playClickSound();
                onToggleTheme();
              }}
              aria-label="Toggle theme mode"
              className="w-10 h-10 rounded-full bg-paper-card/90 dark:bg-studio-card/90 backdrop-blur-md border border-paper-border dark:border-studio-border text-ink dark:text-white flex items-center justify-center text-xs shadow-soft transition-transform hover:scale-105 active:scale-95"
              title={darkMode ? 'Switch to Warm Paper' : 'Switch to Dark Studio'}
            >
              <i className={darkMode ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-stone-600'} />
            </button>
          </Magnetic>

          {/* Official PDF Resume Button */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => {
                playPopSound();
                onOpenResume();
              }}
              data-cursor="PDF"
              className="px-4 py-2 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg text-xs font-medium tracking-tight shadow-soft hover:opacity-90 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <i className="fas fa-file-pdf text-[11px]" />
              <span>Resume</span>
            </button>
          </Magnetic>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 rounded-full bg-paper-card/90 dark:bg-studio-card/90 backdrop-blur-md border border-paper-border dark:border-studio-border text-ink dark:text-white flex items-center justify-center text-xs shadow-soft"
          >
            <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-md mx-auto p-4 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-float animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-stone-100 dark:bg-white/10 text-ink dark:text-white font-semibold'
                    : 'text-ink-muted dark:text-studio-muted hover:bg-stone-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-paper-border dark:border-studio-border flex items-center justify-between text-xs font-mono text-ink-muted dark:text-studio-muted">
              <span>Bhilai, India • {liveTime}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="text-clay font-medium underline"
              >
                View PDF Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
