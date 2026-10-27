import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';

interface PersonBehindProps {
  onOpenResume: () => void;
}

export const PersonBehind: React.FC<PersonBehindProps> = ({ onOpenResume }) => {
  const { personBehind } = PORTFOLIO_DATA.profile;

  return (
    <section id="about" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border">
      {/* Category header */}
      <Reveal>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-clay" />
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
            About & Personal Philosophy
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white font-normal mb-12">
          The Person Behind the Systems
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Narrative essay column */}
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-ink-muted dark:text-studio-muted leading-relaxed font-normal">
          <Reveal delay={100}>
            <p className="font-serif text-2xl sm:text-3xl text-ink dark:text-white leading-snug italic font-normal">
              "{personBehind.intro}"
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p>{personBehind.storyParagraph1}</p>
          </Reveal>

          <Reveal delay={300}>
            <p>{personBehind.storyParagraph2}</p>
          </Reveal>

          <Reveal delay={400}>
            <p>{personBehind.storyParagraph3}</p>
          </Reveal>

          <Reveal delay={500}>
            <div className="pt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white shadow-soft hover:scale-105 transition-transform">
                <i className="fas fa-location-dot text-clay" />
                <span>Bhilai, Chhattisgarh, India</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white shadow-soft hover:scale-105 transition-transform">
                <i className="fas fa-graduation-cap text-cobalt" />
                <span>CSIT Durg • Class of 2027</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white shadow-soft hover:scale-105 transition-transform">
                <i className="fas fa-hands-holding text-sage" />
                <span>Crochet & Craft Maker</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="pt-6">
              <button
                onClick={onOpenResume}
                data-cursor="PDF"
                className="px-6 py-3 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs tracking-tight shadow-soft hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="fas fa-file-pdf" />
                <span>Read Full Resume Document</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Tactile Vignette Cards Column with 3D Tilt */}
        <div className="lg:col-span-5 space-y-4">
          <Reveal delay={200}>
            <TiltCard className="p-6 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
              <span className="font-mono text-[10px] text-clay uppercase font-bold tracking-wider block mb-2">
                Artifact 01 • Craft & Code
              </span>
              <h4 className="font-serif text-xl text-ink dark:text-white mb-2">
                Why Crochet Informs My Code
              </h4>
              <p className="text-xs text-ink-muted dark:text-studio-muted leading-relaxed">
                Crochet requires counting stitches, maintaining uniform tension, and constructing three-dimensional forms from a single continuous thread. It is identical to functional programming: pure inputs, nested loops, and structural balance.
              </p>
            </TiltCard>
          </Reveal>

          <Reveal delay={350}>
            <TiltCard className="p-6 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
              <span className="font-mono text-[10px] text-cobalt uppercase font-bold tracking-wider block mb-2">
                Artifact 02 • Community & Voice
              </span>
              <h4 className="font-serif text-xl text-ink dark:text-white mb-2">
                Student Leadership at The SEnA
              </h4>
              <p className="text-xs text-ink-muted dark:text-studio-muted leading-relaxed">
                Serving as Vice President for 2026–27 has taught me that the best technical solutions are always collaborative. Mentoring junior students and demystifying machine learning remains one of my proudest experiences.
              </p>
            </TiltCard>
          </Reveal>

          <Reveal delay={500}>
            <TiltCard className="p-6 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
              <span className="font-mono text-[10px] text-sage uppercase font-bold tracking-wider block mb-2">
                Artifact 03 • Global Impact
              </span>
              <h4 className="font-serif text-xl text-ink dark:text-white mb-2">
                UN Sustainable Development Goals
              </h4>
              <p className="text-xs text-ink-muted dark:text-studio-muted leading-relaxed">
                Through the IBM SkillsBuild internship, I learned how to anchor machine learning models to tangible social goals: Quality Education (SDG 4) and Decent Work (SDG 8).
              </p>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
