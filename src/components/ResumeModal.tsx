import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'document' | 'structured'>('document');
  const { profile, internships, education, leadership, skillGroups, projects, spokenLanguages, interests, training } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border rounded-3xl shadow-float text-ink dark:text-white overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-paper-border dark:border-studio-border bg-paper dark:bg-studio-bg shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-paper-card dark:bg-stone-800 text-clay flex items-center justify-center text-lg border border-paper-border dark:border-studio-border shadow-soft">
              <i className="fas fa-file-pdf" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-ink dark:text-white flex items-center gap-2">
                <span>{profile.name} — Curriculum Vitae</span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-clay">
                  PDF 2026
                </span>
              </h3>
              <p className="text-xs text-ink-muted dark:text-studio-muted font-mono">
                {profile.title} • {profile.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumePdfPath}
              download="Sangeeta_Ojha_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg text-xs font-medium tracking-tight shadow-soft hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-download text-[10px]" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-paper dark:bg-stone-800 border border-paper-border dark:border-studio-border text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-sm" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-paper-border dark:border-studio-border bg-paper/60 dark:bg-studio-card shrink-0 text-xs font-mono">
          <button
            onClick={() => setActiveTab('document')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'document'
                ? 'bg-ink dark:bg-white text-paper dark:text-studio-bg font-semibold shadow-soft'
                : 'text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white'
            }`}
          >
            <i className="fas fa-file-pdf" />
            <span>PDF Viewer</span>
          </button>
          <button
            onClick={() => setActiveTab('structured')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-2 ${
              activeTab === 'structured'
                ? 'bg-ink dark:bg-white text-paper dark:text-studio-bg font-semibold shadow-soft'
                : 'text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white'
            }`}
          >
            <i className="fas fa-list-check" />
            <span>Structured Overview</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {activeTab === 'document' ? (
            <div className="flex flex-col items-center bg-paper-subtle dark:bg-stone-900 p-4 rounded-2xl border border-paper-border dark:border-studio-border">
              {/* PDF Preview container */}
              <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-paper-border dark:border-studio-border bg-white shadow-soft">
                <iframe
                  src={`${profile.resumePdfPath}#toolbar=0&navpanes=0`}
                  title="Sangeeta Ojha Resume PDF"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Action row under PDF */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={profile.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs flex items-center gap-2 hover:opacity-90 shadow-soft"
                >
                  <i className="fas fa-external-link-alt text-[10px]" />
                  <span>Open PDF in New Tab</span>
                </a>
                <a
                  href={profile.resumePdfPath}
                  download="Sangeeta_Ojha_Resume.pdf"
                  className="px-4 py-2 rounded-full bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border text-ink dark:text-white text-xs font-mono flex items-center gap-2 hover:border-clay"
                >
                  <i className="fas fa-download text-[10px]" />
                  <span>Direct Download (.PDF)</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="p-6 rounded-2xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-serif text-2xl text-ink dark:text-white">{profile.name}</h4>
                    <p className="text-xs font-mono text-clay font-medium">{profile.title}</p>
                  </div>
                  <div className="text-xs text-ink-muted dark:text-studio-muted font-mono space-y-1">
                    <p><i className="fas fa-envelope text-clay mr-2" />{profile.email}</p>
                    <p><i className="fas fa-phone text-cobalt mr-2" />{profile.phone}</p>
                    <p><i className="fas fa-location-dot text-sage mr-2" />{profile.location}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted leading-relaxed border-t border-paper-border dark:border-studio-border pt-3 font-normal">
                  {profile.statement}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-clay mb-3 font-semibold">
                  Technical Skills
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {skillGroups.map((g, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                      <p className="font-serif text-base text-ink dark:text-white mb-1">{g.category}</p>
                      <p className="text-ink-muted dark:text-studio-muted font-mono text-[11px] leading-relaxed">
                        {g.skills.map((s) => s.name).join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-cobalt mb-3 font-semibold">
                  Education
                </h4>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h5 className="font-serif text-base text-ink dark:text-white">{edu.degree}</h5>
                        <p className="text-xs font-mono text-ink-muted dark:text-studio-muted">{edu.institution} • {edu.period}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-ink dark:text-white">{edu.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internship */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-sage mb-3 font-semibold">
                  Internship
                </h4>
                {internships.map((intern, i) => (
                  <div key={i} className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="font-serif text-lg text-ink dark:text-white">{intern.role}</h5>
                      <span className="text-xs font-mono text-ink-muted dark:text-studio-muted">
                        {intern.period}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-clay">
                      {intern.company} • {intern.partner}
                    </p>
                    <ul className="space-y-1.5 pt-2">
                      {intern.achievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-ink-muted dark:text-studio-muted flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-clay mt-1.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects Highlight */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-clay mb-3 font-semibold">
                  Projects
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-ink dark:text-white">{proj.name}</span>
                        <span className="text-[10px] font-mono text-clay">{proj.category}</span>
                      </div>
                      <p className="text-xs text-ink-muted dark:text-studio-muted line-clamp-2">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                  <span className="font-mono text-clay font-bold block mb-1">Training</span>
                  <p className="text-ink-muted dark:text-studio-muted text-[11px] font-mono">{training.join(' • ')}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                  <span className="font-mono text-cobalt font-bold block mb-1">Languages</span>
                  <p className="text-ink-muted dark:text-studio-muted text-[11px] font-mono">{spokenLanguages.join(', ')}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                  <span className="font-mono text-sage font-bold block mb-1">Interests</span>
                  <p className="text-ink-muted dark:text-studio-muted text-[11px] font-mono">{interests.join(', ')}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-paper-border dark:border-studio-border bg-paper dark:bg-studio-bg flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-ink-muted dark:text-studio-muted font-mono">
            <span>Direct contact: </span>
            <a href={`mailto:${profile.email}`} className="text-clay hover:underline">
              {profile.email}
            </a>
            <span className="mx-2">•</span>
            <a href={`tel:${profile.phone}`} className="hover:text-clay">
              {profile.phone}
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
