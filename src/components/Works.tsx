import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';
import { Magnetic } from './Magnetic';
import { playClickSound, playPopSound, playSynapsePulse, playChimeSound } from '../utils/audio';

// Simulated terminal run data for each project
const SIMULATED_RUNS: Record<string, { cmd: string; steps: string[]; outcome: string }> = {
  'ai-interviewer': {
    cmd: 'python -m ai_interviewer.evaluate --role "AI/ML" --input "gradient descent pipelines"',
    steps: [
      '[1/4] Ingesting text stream... (12 tokens parsed)',
      '[2/4] Generating scikit-learn TF-IDF matrix & lexical density index...',
      '[3/4] Computing cosine similarity against model answers (similarity: 0.932)...',
      '[4/4] Evaluating technical depth: 94% | Clarity: 91%'
    ],
    outcome: 'Result: Candidate demonstrates strong algorithmic mastery. Session score logged.'
  },
  'serenity-wellness': {
    cmd: 'node serenity.js --companion sera --intent "mindful_reflection"',
    steps: [
      '[1/3] Sera NLP agent initializing with empathetic context filter...',
      '[2/3] Analyzing emotional cadence: state: "reflective / seeking quiet"',
      '[3/3] Loading Star-Gazer module + gratitude journal daily prompt...'
    ],
    outcome: 'Sera: "Take a deep breath. Today’s celestial sky is clear over Bhilai."'
  },
  'ai-career-path': {
    cmd: 'python career_recommender.py --skills "Python, scikit-learn, NLP" --interest "AI"',
    steps: [
      '[1/3] Parsing academic background: B.Tech CSE (CSIT Durg, CGPA 7.8)...',
      '[2/3] Computing KNN classification across 45 tech industry trajectories...',
      '[3/3] Weighting IBM SkillsBuild virtual internship experience...'
    ],
    outcome: 'Top Recommendation: AI / Machine Learning Engineer (96.4% match score)'
  },
  'face-emotion': {
    cmd: 'python detect_emotion.py --source webcam_0 --cascade haarcascade_frontalface.xml',
    steps: [
      '[1/3] Initializing OpenCV video capture @ 60fps...',
      '[2/3] Bounding box localized [x: 184, y: 142, w: 210, h: 210]...',
      '[3/3] CNN classification: { Happy: 0.88, Focused: 0.09, Surprise: 0.03 }'
    ],
    outcome: 'Emotion Detected: Focused & Confident (Inference latency: 14ms)'
  },
  'food-express': {
    cmd: 'npm run test:firebase -- --sync-cart --restaurant-id "delhi-express"',
    steps: [
      '[1/3] Connecting to Firebase Firestore database...',
      '[2/3] Calculating cart state with dynamic taxes and discount vouchers...',
      '[3/3] Emitting real-time order tracking WebSocket notification...'
    ],
    outcome: 'Order #FE-89241 confirmed • Estimated delivery: 22 mins'
  },
  'taskvibe': {
    cmd: 'localStorage.setItem("taskvibe_store", JSON.stringify(tasks))',
    steps: [
      '[1/3] Evaluating task priorities: [High: 3, Medium: 5, Archived: 12]...',
      '[2/3] Synchronizing client-side zero-latency offline cache...',
      '[3/3] Updating streak analytics & completion heatmap...'
    ],
    outcome: 'Sync status: 100% offline-ready • Memory footprint: 1.2 KB'
  }
};

export const Works: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTerminalId, setActiveTerminalId] = useState<string | null>(null);
  const [terminalRunning, setTerminalRunning] = useState<boolean>(false);
  const [terminalStep, setTerminalStep] = useState<number>(0);

  const categories = ['All', 'AI & Machine Learning', 'Web & Interactive', 'Systems & Tools'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const toggleTerminal = (projectId: string) => {
    if (activeTerminalId === projectId) {
      playPopSound();
      setActiveTerminalId(null);
      setTerminalRunning(false);
      setTerminalStep(0);
    } else {
      playClickSound();
      setActiveTerminalId(projectId);
      setTerminalRunning(true);
      setTerminalStep(0);

      // Animate simulated steps
      const sim = SIMULATED_RUNS[projectId];
      if (sim) {
        sim.steps.forEach((_, idx) => {
          setTimeout(() => {
            setTerminalStep(idx + 1);
            playSynapsePulse(380 + idx * 80);
          }, (idx + 1) * 350);
        });

        setTimeout(() => {
          setTerminalRunning(false);
          playChimeSound();
        }, (sim.steps.length + 1) * 350);
      }
    }
  };

  return (
    <section id="works" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-clay" />
              <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
                Portfolio & Engineering Works
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white font-normal">
              Selected Works
            </h2>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPopSound();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-ink dark:bg-white text-paper dark:text-studio-bg font-semibold shadow-sm scale-105'
                    : 'text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Projects Showcase */}
      <div className="space-y-16">
        {filteredProjects.map((project, idx) => {
          const sim = SIMULATED_RUNS[project.id];
          const isTerminalOpen = activeTerminalId === project.id;

          return (
            <Reveal key={project.id} delay={idx * 100}>
              <article className="group p-6 sm:p-10 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft transition-all duration-300 hover:shadow-float">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Details Column */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Metadata Line */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted dark:text-studio-muted mb-4">
                        <span className="font-semibold text-ink dark:text-white">
                          {project.number} / 06
                        </span>
                        <span>•</span>
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="text-clay">{project.category}</span>
                        <span>•</span>
                        <span>{project.context}</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-serif text-3xl sm:text-4xl text-ink dark:text-white mb-2 font-normal group-hover:text-clay transition-colors">
                        {project.name}
                      </h3>
                      <p className="font-mono text-xs text-ink-muted dark:text-studio-muted mb-4">
                        {project.subtitle}
                      </p>

                      {/* Narrative Description */}
                      <p className="text-sm sm:text-base text-ink-muted dark:text-studio-muted leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>

                      {/* Metrics Badges */}
                      {project.metrics && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="px-3.5 py-2 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border hover:scale-105 transition-transform"
                            >
                              <span className="text-[10px] font-mono text-ink-faint dark:text-studio-muted block uppercase">
                                {m.label}
                              </span>
                              <span className="text-xs font-mono font-semibold text-ink dark:text-white">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((t) => (
                          <span
                            key={t.name}
                            className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-[11px] font-mono text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-paper-border dark:border-studio-border">
                      <Magnetic>
                        <button
                          onClick={() => setSelectedProject(project)}
                          data-cursor="CASE STUDY"
                          className="px-4 py-2 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg text-xs font-medium tracking-tight shadow-soft hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <span>Read Case Study</span>
                          <i className="fas fa-arrow-right text-[10px]" />
                        </button>
                      </Magnetic>

                      {/* Interactive Terminal Run Simulation Trigger */}
                      {sim && (
                        <Magnetic>
                          <button
                            onClick={() => toggleTerminal(project.id)}
                            data-cursor="RUN"
                            className={`px-4 py-2 rounded-full text-xs font-mono border transition-all flex items-center gap-1.5 ${
                              isTerminalOpen
                                ? 'bg-stone-900 text-amber-300 border-amber-400/50 shadow-sm'
                                : 'bg-paper dark:bg-stone-900 border-paper-border dark:border-studio-border text-ink dark:text-white hover:border-clay'
                            }`}
                          >
                            <i className="fas fa-terminal text-[10px]" />
                            <span>{isTerminalOpen ? 'Hide Terminal' : 'Live CLI Simulation'}</span>
                          </button>
                        </Magnetic>
                      )}

                      {project.link && project.link !== '#' && !project.link.includes('github') && (
                        <Magnetic>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="VISIT"
                            className="px-4 py-2 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white text-xs font-mono hover:border-clay hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                          >
                            <span>Live Site</span>
                            <i className="fas fa-external-link-alt text-[10px]" />
                          </a>
                        </Magnetic>
                      )}

                      {project.githubUrl && (
                        <Magnetic>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="CODE"
                            className="w-9 h-9 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white flex items-center justify-center text-xs hover:border-clay hover:scale-105 active:scale-95 transition-all"
                            title="GitHub Repository"
                          >
                            <i className="fab fa-github" />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  </div>

                  {/* Right Vignette Preview Card with 3D Tilt */}
                  <div className="lg:col-span-5">
                    <TiltCard
                      cursorLabel="VIEW"
                      onClick={() => setSelectedProject(project)}
                      className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-paper-subtle to-paper dark:from-stone-900 dark:to-studio-card border border-paper-border dark:border-studio-border flex flex-col items-center justify-center p-8 cursor-pointer group-hover:border-clay/50 shadow-soft"
                    >
                      {/* Visual Ambient Glow */}
                      <div
                        className="absolute w-44 h-44 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                        style={{ backgroundColor: project.accentColor }}
                      />

                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div
                          className="w-16 h-16 rounded-2xl bg-white dark:bg-studio-bg shadow-soft border border-paper-border dark:border-studio-border flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          style={{ color: project.accentColor }}
                        >
                          <i className={`fas ${project.vignetteIcon}`} />
                        </div>

                        <span className="font-serif text-2xl text-ink dark:text-white mb-1">
                          {project.name}
                        </span>
                        <span className="font-mono text-xs text-ink-muted dark:text-studio-muted">
                          {project.role}
                        </span>

                        <span className="mt-5 px-3 py-1 rounded-full bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border text-[11px] font-mono text-ink-muted dark:text-studio-muted group-hover:text-clay group-hover:border-clay transition-colors">
                          Click to inspect case study
                        </span>
                      </div>
                    </TiltCard>
                  </div>
                </div>

                {/* Inline Simulated Interactive Terminal Drawer */}
                {isTerminalOpen && sim && (
                  <div className="mt-8 pt-6 border-t border-paper-border dark:border-studio-border animate-fadeIn">
                    <div className="rounded-2xl bg-[#0b0f19] border border-stone-800 p-5 font-mono text-xs text-stone-300 shadow-inner">
                      {/* Terminal header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          <span className="text-[11px] text-stone-500 ml-2">
                            sangeeta@engine: ~/{project.id}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500">
                          {terminalRunning ? '⚡ executing...' : '✓ ready'}
                        </span>
                      </div>

                      {/* Command Line */}
                      <div className="text-emerald-400 mb-2 flex items-center gap-2">
                        <span className="text-stone-500">$</span>
                        <span>{sim.cmd}</span>
                      </div>

                      {/* Step logs with animated reveal */}
                      <div className="space-y-1.5 my-3 pl-3 border-l-2 border-stone-800">
                        {sim.steps.slice(0, terminalStep).map((s, sIdx) => (
                          <div key={sIdx} className="text-stone-400 transition-opacity duration-200">
                            {s}
                          </div>
                        ))}
                      </div>

                      {/* Final Outcome */}
                      {terminalStep >= sim.steps.length && (
                        <div className="pt-2 text-clay font-medium flex items-center gap-2 animate-fadeIn">
                          <i className="fas fa-check-circle text-emerald-400 text-xs" />
                          <span>{sim.outcome}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
