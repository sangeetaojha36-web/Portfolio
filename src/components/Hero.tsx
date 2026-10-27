import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';
import { Magnetic } from './Magnetic';
import { RotatingText } from './RotatingText';
import { playClickSound, playPopSound } from '../utils/audio';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { profile } = PORTFOLIO_DATA;

  const scrollTo = (id: string) => {
    playClickSound();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const focusPhrases = [
    'intelligent systems',
    'predictive ML pipelines',
    'conversational NLP tools',
    'computer vision engines',
    'human-centered software'
  ];

  return (
    <section
      id="home"
      className="relative pt-36 sm:pt-44 pb-20 px-6 sm:px-10 max-w-6xl mx-auto flex flex-col justify-center min-h-[90vh]"
    >
      {/* Category Tagline with interactive pulse */}
      <Reveal delay={100}>
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-clay" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
            AI / ML & Software Developer • Bhilai, India
          </span>
        </div>
      </Reveal>

      {/* Main Poetic Kinetic Statement */}
      <Reveal delay={200}>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink dark:text-white leading-[1.08] tracking-tight mb-8">
          Crafting{' '}
          <RotatingText phrases={focusPhrases} />{' '}
          for timeless digital experiences.
        </h1>
      </Reveal>

      {/* Architectural Lead Description */}
      <Reveal delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-8">
            <p className="text-lg sm:text-xl text-ink-muted dark:text-studio-muted leading-relaxed font-normal">
              {profile.heroDescription}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs text-ink-muted dark:text-studio-muted border-l border-paper-border dark:border-studio-border pl-5">
            <div className="group cursor-default">
              <span className="text-ink dark:text-white font-medium block group-hover:text-clay transition-colors">Education</span>
              <span>B.Tech CSE, CSIT Durg (2023–27)</span>
            </div>
            <div className="group cursor-default">
              <span className="text-ink dark:text-white font-medium block group-hover:text-cobalt transition-colors">Internship</span>
              <span>IBM SkillsBuild × BharatCares</span>
            </div>
            <div className="group cursor-default">
              <span className="text-ink dark:text-white font-medium block group-hover:text-sage transition-colors">Leadership</span>
              <span>Vice President, The SEnA</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Action triggers with Magnetic pull */}
      <Reveal delay={400}>
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollTo('#works')}
              data-cursor="EXPLORE"
              className="px-6 py-3.5 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs tracking-tight shadow-soft hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>Explore Selected Works</span>
              <i className="fas fa-arrow-down text-[10px] transform group-hover:translate-y-0.5 transition-transform" />
            </button>
          </Magnetic>

          <Magnetic strength={0.35}>
            <button
              onClick={() => scrollTo('#playground')}
              data-cursor="PLAY"
              className="px-6 py-3.5 rounded-full bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border text-ink dark:text-white font-medium text-xs tracking-tight shadow-soft hover:bg-stone-100 dark:hover:bg-white/5 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <i className="fas fa-flask text-clay text-[11px]" />
              <span>Interactive Playground</span>
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={() => {
                playPopSound();
                onOpenResume();
              }}
              data-cursor="PDF"
              className="px-5 py-3.5 rounded-full text-xs font-mono text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-file-pdf text-[11px] text-cobalt" />
              <span>Resume PDF</span>
            </button>
          </Magnetic>
        </div>
      </Reveal>

      {/* 3 Pillars of Philosophy Vignettes with 3D Tilt */}
      <Reveal delay={500}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 border-t border-paper-border dark:border-studio-border">
          {profile.philosophy.map((item, idx) => (
            <TiltCard
              key={item.title}
              className="p-5 rounded-2xl bg-paper-card/75 dark:bg-studio-card/75 border border-paper-border dark:border-studio-border shadow-soft hover:border-clay/40 transition-colors"
            >
              <span className="font-mono text-[10px] text-ink-faint dark:text-studio-muted block mb-2">
                0{idx + 1} / PERSPECTIVE
              </span>
              <h3 className="font-serif text-xl text-ink dark:text-white mb-2 font-normal">
                {item.title}
              </h3>
              <p className="text-xs text-ink-muted dark:text-studio-muted leading-relaxed">
                {item.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
