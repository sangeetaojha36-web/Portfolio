import React from 'react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border rounded-3xl p-6 sm:p-10 shadow-float text-ink dark:text-white overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-paper dark:bg-stone-800 border border-paper-border dark:border-studio-border text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white flex items-center justify-center transition-colors"
        >
          <i className="fas fa-times text-sm" />
        </button>

        {/* Top Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted dark:text-studio-muted mb-4">
          <span className="font-semibold text-clay">{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.role}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white mb-2 font-normal">
          {project.name}
        </h3>
        <p className="font-mono text-xs text-ink-muted dark:text-studio-muted mb-6">
          {project.subtitle} — {project.context}
        </p>

        {/* Narrative Description */}
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-ink-muted dark:text-studio-muted leading-relaxed space-y-4 mb-8 font-normal">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Metrics if present */}
        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-2xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border"
              >
                <span className="text-[10px] font-mono text-ink-faint dark:text-studio-muted block uppercase">
                  {m.label}
                </span>
                <span className="text-sm font-mono font-bold text-ink dark:text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Core Highlights */}
        {project.highlights && (
          <div className="p-6 rounded-2xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-clay font-bold mb-3">
              Key Engineering Achievements
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted flex items-start gap-2.5">
                  <i className="fas fa-check text-clay text-[10px] mt-1 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-ink-faint dark:text-studio-muted mb-3">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t.name}
                className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-paper-border dark:border-studio-border">
          {project.link && project.link !== '#' && !project.link.includes('github') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs tracking-tight shadow-soft hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>Launch Live Site</span>
              <i className="fas fa-external-link-alt text-[10px]" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white text-xs font-mono hover:border-clay transition-colors flex items-center gap-2"
            >
              <i className="fab fa-github" />
              <span>Source Repository</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-xs font-mono text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
