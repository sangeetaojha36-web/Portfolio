import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';

export const Experience: React.FC = () => {
  const { internships, leadership, skillGroups } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-clay" />
              <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
                Career & Institutional Trajectory
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white font-normal">
              Experience & Leadership
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted max-w-md font-mono">
            Virtual engineering with IBM SkillsBuild × BharatCares and student association leadership at CSIT Durg.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Internship */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={100}>
            <span className="font-mono text-xs uppercase tracking-wider text-clay font-semibold block">
              Technical Internship
            </span>
          </Reveal>

          {internships.map((intern, i) => (
            <Reveal key={i} delay={200}>
              <div className="p-8 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft transition-all hover:shadow-float">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl text-ink dark:text-white">
                    {intern.role}
                  </h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-ink dark:text-white">
                    {intern.period}
                  </span>
                </div>

                <p className="text-xs font-mono text-ink-muted dark:text-studio-muted mb-4">
                  {intern.company} • <span className="text-clay font-medium">{intern.partner}</span>
                </p>

                <p className="text-sm text-ink-muted dark:text-studio-muted leading-relaxed mb-6">
                  {intern.description}
                </p>

                <ul className="space-y-3 pt-4 border-t border-paper-border dark:border-studio-border">
                  {intern.achievements.map((ach, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-paper-border dark:border-studio-border">
                  {intern.skillsGained.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-[11px] font-mono text-ink dark:text-white hover:border-clay hover:scale-105 transition-all"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Right Column: Leadership & Training */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={150}>
            <span className="font-mono text-xs uppercase tracking-wider text-cobalt font-semibold block">
              Institutional Leadership
            </span>
          </Reveal>

          {leadership.map((item, idx) => (
            <Reveal key={idx} delay={250 + idx * 100}>
              <TiltCard className="p-6 sm:p-7 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-cobalt font-bold">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    {item.period}
                  </span>
                </div>

                <h4 className="font-serif text-xl text-ink dark:text-white mb-1">
                  {item.role}
                </h4>

                <p className="text-xs font-mono text-ink-muted dark:text-studio-muted mb-3">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted leading-relaxed">
                  {item.description}
                </p>

                {item.highlights && (
                  <ul className="space-y-1.5 mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-ink-muted dark:text-studio-muted flex items-start gap-2">
                        <i className="fas fa-check text-[10px] text-sage mt-1" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Technical Skill Groups Section */}
      <div className="pt-8">
        <Reveal>
          <h3 className="font-serif text-2xl sm:text-3xl text-ink dark:text-white mb-6">
            Technical Toolkit & Competencies
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((group, idx) => (
            <Reveal key={group.category} delay={idx * 100}>
              <TiltCard className="p-5 rounded-2xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-paper dark:bg-stone-900 flex items-center justify-center text-xs text-clay">
                    <i className={`fas ${group.icon}`} />
                  </div>
                  <h4 className="font-serif text-lg text-ink dark:text-white">
                    {group.category}
                  </h4>
                </div>

                <div className="space-y-2 mt-4 pt-3 border-t border-paper-border dark:border-studio-border">
                  {group.skills.map((s) => (
                    <div key={s.name} className="text-xs">
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-medium text-ink dark:text-white">{s.name}</span>
                        <span className="text-[10px] text-ink-faint dark:text-studio-muted">{s.proficiency}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block truncate">{s.note}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
