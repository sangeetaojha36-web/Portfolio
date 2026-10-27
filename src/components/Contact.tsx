import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { fireConfetti } from '../utils/confetti';
import { playClickSound, playChimeSound } from '../utils/audio';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';

export const Contact: React.FC = () => {
  const { email, phone, location } = PORTFOLIO_DATA.profile;
  const { socials } = PORTFOLIO_DATA;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Portfolio Collaboration & Opportunity', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle');

  const handleCopy = (e: React.MouseEvent, text: string, type: 'email' | 'phone') => {
    playChimeSound();
    navigator.clipboard.writeText(text);
    fireConfetti(e.clientX, e.clientY);

    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const getGmailComposeUrl = () => {
    const subject = encodeURIComponent(form.subject || `Inquiry from ${form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `${form.message || 'Hello Sangeeta,\n\nI came across your portfolio and would like to connect.'}\n\nFrom: ${form.name || 'Portfolio Visitor'}\nEmail: ${form.email || 'Not provided'}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(form.subject || `Inquiry from ${form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `${form.message || 'Hello Sangeeta,\n\nI came across your portfolio and would like to connect.'}\n\nFrom: ${form.name || 'Portfolio Visitor'}\nEmail: ${form.email || 'Not provided'}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    playClickSound();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: `New Portfolio Message from ${form.name}: ${form.subject}`,
          message: form.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success !== 'false')) {
        setStatus('success');
        playChimeSound();
        const rect = e.currentTarget.getBoundingClientRect();
        fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      } else {
        setStatus('fallback');
      }
    } catch {
      // In case network, CORS, or ad-blocker blocked the endpoint
      setStatus('fallback');
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: 'Portfolio Collaboration & Opportunity', message: '' });
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct info & context */}
        <div className="lg:col-span-6 space-y-8">
          <Reveal>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
                  Contact & Inquiries
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white leading-[1.1] font-normal mb-4">
                Let's create something thoughtful together.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted dark:text-studio-muted leading-relaxed font-normal">
                Whether you are looking to discuss machine learning applications, an AI/ML internship or software role, or review projects like AI Interviewer and Serenity — my inbox is always open.
              </p>
            </div>
          </Reveal>

          {/* Contact Methods */}
          <div className="space-y-3 font-mono text-xs">
            {/* Direct Email */}
            <Reveal delay={150}>
              <div className="p-4 rounded-2xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft flex items-center justify-between gap-3 hover:border-clay transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-clay/10 text-clay flex items-center justify-center text-sm">
                    <i className="fas fa-envelope" />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-faint dark:text-studio-muted block uppercase">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-ink dark:text-white font-medium hover:text-clay transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={getGmailComposeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compose in Gmail Web"
                    className="px-3 py-1.5 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white hover:border-clay hover:scale-105 active:scale-95 transition-all text-[11px]"
                  >
                    <i className="fab fa-google mr-1 text-clay" /> Gmail
                  </a>
                  <button
                    onClick={(e) => handleCopy(e, email, 'email')}
                    data-cursor="COPY"
                    className="px-3.5 py-1.5 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white hover:border-clay hover:scale-105 active:scale-95 transition-all"
                  >
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Phone / WhatsApp */}
            <Reveal delay={250}>
              <div className="p-4 rounded-2xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft flex items-center justify-between gap-3 hover:border-cobalt transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cobalt/10 text-cobalt flex items-center justify-center text-sm">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-faint dark:text-studio-muted block uppercase">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm text-ink dark:text-white font-medium hover:text-cobalt transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={(e) => handleCopy(e, phone, 'phone')}
                  data-cursor="COPY"
                  className="px-3.5 py-1.5 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-ink dark:text-white hover:border-cobalt hover:scale-105 active:scale-95 transition-all"
                >
                  {copiedPhone ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </Reveal>

            {/* Location */}
            <Reveal delay={350}>
              <div className="p-4 rounded-2xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sage/10 text-sage flex items-center justify-center text-sm">
                  <i className="fas fa-location-dot" />
                </div>
                <div>
                  <span className="text-[10px] text-ink-faint dark:text-studio-muted block uppercase">
                    Location & University
                  </span>
                  <span className="text-sm text-ink dark:text-white font-medium">
                    {location} • CSIT Durg
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Column: Interactive Send-to-Mail Form & Socials */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal delay={200}>
            <div className="p-7 sm:p-8 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-ink dark:text-white">
                    Send a note
                  </h3>
                  <p className="text-xs text-ink-faint dark:text-studio-muted font-mono mt-0.5">
                    Directly delivered to <span className="text-clay font-medium">{email}</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-clay/10 text-clay border border-clay/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay animate-ping" />
                  Active Inbox
                </span>
              </div>

              {/* Status: SUCCESS */}
              {status === 'success' && (
                <div className="py-8 px-6 rounded-2xl bg-paper dark:bg-stone-900/80 border border-clay/30 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-clay/10 text-clay flex items-center justify-center mx-auto text-xl shadow-soft">
                    <i className="fas fa-check" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-ink dark:text-white">
                      Message Dispatched!
                    </h4>
                    <p className="text-xs text-ink-muted dark:text-studio-muted font-mono mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-ink dark:text-white">{form.name}</strong>. Your note has been delivered directly to <span className="text-clay font-medium">{email}</span>. Sangeeta will reply to you at <span className="underline">{form.email}</span>.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs hover:opacity-90 transition-all shadow-soft"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={getGmailComposeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white hover:border-clay transition-all"
                    >
                      <i className="fab fa-google text-clay mr-1.5" />
                      Backup via Gmail
                    </a>
                  </div>
                </div>
              )}

              {/* Status: FALLBACK (Direct one-click mail clients if network or CORS restricts relay) */}
              {status === 'fallback' && (
                <div className="py-6 px-6 rounded-2xl bg-paper dark:bg-stone-900/80 border border-amber-500/30 text-left space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-lg">
                      <i className="fas fa-paper-plane" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-ink dark:text-white">
                        Almost there! Send directly via your mail:
                      </h4>
                      <p className="text-[11px] text-ink-muted dark:text-studio-muted font-mono">
                        Your message has been prefilled to {email}. Choose your favorite method:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <a
                      href={getGmailComposeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border hover:border-clay flex items-center gap-2.5 transition-all text-xs font-mono text-ink dark:text-white"
                    >
                      <i className="fab fa-google text-red-500 text-sm" />
                      <span>Open in Gmail Web</span>
                    </a>
                    <a
                      href={getMailtoUrl()}
                      className="p-3 rounded-xl bg-paper-card dark:bg-stone-800 border border-paper-border dark:border-studio-border hover:border-cobalt flex items-center gap-2.5 transition-all text-xs font-mono text-ink dark:text-white"
                    >
                      <i className="fas fa-envelope text-cobalt text-sm" />
                      <span>Default Mail App</span>
                    </a>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[11px] font-mono text-ink-faint dark:text-studio-muted hover:text-clay underline"
                    >
                      ← Back to edit message
                    </button>
                  </div>
                </div>
              )}

              {/* Status: IDLE or SENDING (Standard Form) */}
              {(status === 'idle' || status === 'sending') && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-ink-muted dark:text-studio-muted mb-1.5">
                        Your name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Sharma"
                        value={form.name}
                        disabled={status === 'sending'}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-xs text-ink dark:text-white focus:outline-none focus:border-clay font-mono transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-ink-muted dark:text-studio-muted mb-1.5">
                        Your email address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. maya@company.com"
                        value={form.email}
                        disabled={status === 'sending'}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-xs text-ink dark:text-white focus:outline-none focus:border-clay font-mono transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-muted dark:text-studio-muted mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI/ML Internship Opportunity / Project Collaboration"
                      value={form.subject}
                      disabled={status === 'sending'}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-xs text-ink dark:text-white focus:outline-none focus:border-clay font-mono transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-muted dark:text-studio-muted mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Hi Sangeeta, I saw your portfolio and projects..."
                      value={form.message}
                      disabled={status === 'sending'}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-xs text-ink dark:text-white focus:outline-none focus:border-clay font-mono transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      data-cursor="SEND"
                      className="w-full sm:flex-1 py-3 rounded-full bg-ink dark:bg-white text-paper dark:text-studio-bg font-medium text-xs tracking-tight shadow-soft hover:opacity-90 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {status === 'sending' ? (
                        <>
                          <i className="fas fa-circle-notch fa-spin text-xs" />
                          <span>Delivering to {email}...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Directly to Sangeeta's Mail</span>
                          <i className="fas fa-paper-plane text-[10px]" />
                        </>
                      )}
                    </button>

                    <a
                      href={getGmailComposeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Compose in Gmail Web directly"
                      className="w-full sm:w-auto px-4 py-3 rounded-full bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-xs font-mono text-ink dark:text-white hover:border-clay hover:scale-102 transition-all flex items-center justify-center gap-1.5"
                    >
                      <i className="fab fa-google text-clay text-xs" />
                      <span>Gmail Web</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Social Profiles */}
          <Reveal delay={350}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socials.map((s) => (
                <TiltCard
                  key={s.name}
                  className="p-4 rounded-2xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-soft hover:border-clay transition-all group flex flex-col justify-between"
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <i className={`${s.icon} text-base text-ink dark:text-white group-hover:text-clay transition-colors`} />
                      <i className="fas fa-arrow-up-right-from-square text-[9px] text-stone-400 group-hover:text-ink dark:group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-serif font-normal text-ink dark:text-white block group-hover:text-clay">
                        {s.name}
                      </span>
                      <span className="text-[10px] font-mono text-ink-faint dark:text-studio-muted block truncate">
                        {s.displayUser}
                      </span>
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
