import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { triggerCelebrationConfetti } from '../utils/confetti';
import { playClickSound, playChimeSound, playPopSound, playSynapsePulse } from '../utils/audio';

export const Playground: React.FC = () => {
  const { playground } = PORTFOLIO_DATA;
  const [activeStudy, setActiveStudy] = useState<string>('nlp-scorer');

  // ==========================================
  // Study 1 (NLP) State
  // ==========================================
  const [nlpRole, setNlpRole] = useState<'Software Developer' | 'AI/ML' | 'HR'>('AI/ML');
  const [nlpInput, setNlpInput] = useState<string>(
    'I build modular gradient descent pipelines using scikit-learn and implement tokenization workflows for conversational NLP chatbots.'
  );
  const [nlpScore, setNlpScore] = useState<{ depth: number; vocab: number; relevancy: number }>({
    depth: 88,
    vocab: 92,
    relevancy: 95,
  });

  // Re-calculate mock NLP scoring on input change
  useEffect(() => {
    const words = nlpInput.trim().split(/\s+/).filter(Boolean);
    const len = words.length;
    const technicalKeywords = [
      'pipeline', 'algorithm', 'scikit-learn', 'nlp', 'python', 'flask',
      'model', 'tokenization', 'gradient', 'neural', 'database', 'modular',
      'architecture', 'learning', 'dataset', 'evaluation', 'supervised', 'regression'
    ];
    const techCount = words.filter((w) =>
      technicalKeywords.some((k) => w.toLowerCase().includes(k))
    ).length;

    const depth = Math.min(98, Math.max(45, Math.round(len * 3.5 + techCount * 6)));
    const vocab = Math.min(96, Math.max(50, Math.round(techCount * 12 + 40)));
    const relevancy = Math.min(99, Math.max(60, Math.round(70 + techCount * 5)));

    setNlpScore({ depth, vocab, relevancy });
  }, [nlpInput, nlpRole]);

  // ==========================================
  // Study 2 (Star-Gazer Canvas) State & Ref
  // ==========================================
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [connectedStars, setConnectedStars] = useState<number>(0);
  const [customStarsCount, setCustomStarsCount] = useState<number>(0);
  const starsRef = useRef<{ x: number; y: number; r: number; alpha: number; name?: string; pulse?: number }[]>([]);

  useEffect(() => {
    if (activeStudy !== 'stargazer') return;
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 340);

    // Initial astronomical stars
    starsRef.current = [
      { x: width * 0.18, y: height * 0.28, r: 3.2, alpha: 0.95, name: 'Polaris (North Star)' },
      { x: width * 0.32, y: height * 0.22, r: 2.5, alpha: 0.85, name: 'Dubhe' },
      { x: width * 0.48, y: height * 0.32, r: 3.0, alpha: 0.9, name: 'Merak' },
      { x: width * 0.62, y: height * 0.42, r: 2.6, alpha: 0.8, name: 'Alioth' },
      { x: width * 0.76, y: height * 0.28, r: 3.5, alpha: 0.98, name: 'Vega (Alpha Lyrae)' },
      { x: width * 0.42, y: height * 0.65, r: 2.5, alpha: 0.85, name: 'Altair' },
      { x: width * 0.24, y: height * 0.74, r: 3.2, alpha: 0.92, name: 'Sirius (Dog Star)' },
      { x: width * 0.72, y: height * 0.76, r: 2.8, alpha: 0.82, name: 'Deneb' },
      { x: width * 0.88, y: height * 0.58, r: 2.4, alpha: 0.75, name: 'Betelgeuse' },
    ];

    let mouse = { x: -100, y: -100 };
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if clicked near an existing star
      const clickedStar = starsRef.current.find(
        (s) => Math.hypot(s.x - clickX, s.y - clickY) < 16
      );

      if (clickedStar) {
        playChimeSound();
        triggerCelebrationConfetti({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
        clickedStar.pulse = 1.0;
      } else {
        // Place a new star!
        playPopSound();
        starsRef.current.push({
          x: clickX,
          y: clickY,
          r: 2.8,
          alpha: 0.95,
          name: `Star #${starsRef.current.length + 1}`,
          pulse: 1.0,
        });
        setCustomStarsCount((c) => c + 1);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    let animId: number;
    const draw = () => {
      time += 0.02;
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, width, height);

      // Deep space background particles
      for (let i = 0; i < 45; i++) {
        const dx = (i * 123 + Math.sin(time + i) * 2) % width;
        const dy = (i * 231 + Math.cos(time + i) * 2) % height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(dx, dy, 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellation connection lines
      let connections = 0;
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 145) {
            connections++;
            ctx.strokeStyle = `rgba(196, 109, 78, ${0.35 * (1 - dist / 145)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
      setConnectedStars(connections);

      // Interactive mouse attraction threads
      stars.forEach((s) => {
        const distToMouse = Math.hypot(s.x - mouse.x, s.y - mouse.y);
        if (distToMouse < 110) {
          ctx.strokeStyle = `rgba(62, 107, 153, ${0.85 * (1 - distToMouse / 110)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Pulse decay
        if (s.pulse && s.pulse > 0) {
          s.pulse -= 0.03;
          ctx.strokeStyle = `rgba(255, 220, 160, ${s.pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r + (1 - s.pulse) * 20, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Ambient gentle star twinkle
        const twinkle = Math.sin(time * 2 + s.x) * 0.15;
        const radius = s.r + (s.pulse ? s.pulse * 1.5 : 0);

        // Core star
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, s.alpha + twinkle)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 4);
        glow.addColorStop(0, 'rgba(255, 235, 205, 0.55)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Label on proximity
        if (s.name && distToMouse < 90) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FAF7F2';
          ctx.fillText(s.name, s.x + 8, s.y - 6);
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, [activeStudy]);

  // ==========================================
  // Study 3 (Card Flip & Confetti) State
  // ==========================================
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(0);

  const habits = [
    {
      title: 'Gratitude Journaling',
      desc: 'Note down 3 moments of quiet clarity from your morning.',
      xp: '+50 XP',
      icon: 'fa-feather-pointed',
    },
    {
      title: 'Deep Breath Pause',
      desc: 'Box breathing: 4s inhale, 4s hold, 4s exhale, 4s rest.',
      xp: '+35 XP',
      icon: 'fa-wind',
    },
    {
      title: 'Digital Detox Session',
      desc: 'Step away from all glowing screens for a 20-minute tea walk.',
      xp: '+60 XP',
      icon: 'fa-leaf',
    },
  ];

  const handleCardFlip = (e: React.MouseEvent) => {
    if (!isFlipped) {
      playChimeSound();
      triggerCelebrationConfetti({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    } else {
      playPopSound();
    }
    setIsFlipped(!isFlipped);
  };

  // ==========================================
  // Study 4 (Neural Synapse Simulator) State
  // ==========================================
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [activationFunction, setActivationFunction] = useState<'ReLU' | 'Sigmoid' | 'GELU'>('ReLU');
  const [firingLayer, setFiringLayer] = useState<number | null>(null);
  const [neuralConfidence, setNeuralConfidence] = useState<number>(94.8);

  const fireSynapticPulse = () => {
    // Stage 1: Input fires
    setFiringLayer(0);
    playSynapsePulse(330);

    setTimeout(() => {
      // Stage 2: Hidden layer fires
      setFiringLayer(1);
      playSynapsePulse(440);
    }, 180);

    setTimeout(() => {
      // Stage 3: Second hidden layer fires
      setFiringLayer(2);
      playSynapsePulse(554.37);
    }, 360);

    setTimeout(() => {
      // Stage 4: Output prediction settled
      setFiringLayer(3);
      playSynapsePulse(659.25);
      playChimeSound();
      setNeuralConfidence(Number((92 + Math.random() * 7).toFixed(1)));
    }, 540);

    setTimeout(() => {
      setFiringLayer(null);
    }, 900);
  };

  return (
    <section id="playground" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-paper-border dark:border-studio-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-clay" />
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-studio-muted">
              Interactive Design & Code Vignettes
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ink dark:text-white font-normal">
            The Playground
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted dark:text-studio-muted max-w-md font-mono">
          Explore interactive simulations in natural language processing, neural architectures, mindfulness canvases, and tactile physics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {playground.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playClickSound();
              setActiveStudy(item.id);
            }}
            data-cursor="TEST"
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
              activeStudy === item.id
                ? 'bg-ink dark:bg-white text-paper dark:text-studio-bg font-semibold shadow-soft scale-105'
                : 'bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border text-ink-muted dark:text-studio-muted hover:text-ink dark:hover:text-white'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Interactive Vignette Display */}
      <div className="p-6 sm:p-8 rounded-3xl bg-paper-card dark:bg-studio-card border border-paper-border dark:border-studio-border shadow-float">
        
        {/* Study 1: NLP Scorer */}
        {activeStudy === 'nlp-scorer' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-border dark:border-studio-border pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-clay font-semibold">
                  Study 01 • NLP Feature Scoring
                </span>
                <h3 className="font-serif text-2xl text-ink dark:text-white">
                  Mock Interview NLP Pipeline
                </h3>
              </div>

              {/* Role Selectors */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-mono">
                {(['AI/ML', 'Software Developer', 'HR'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      playClickSound();
                      setNlpRole(r);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                      nlpRole === r
                        ? 'bg-white dark:bg-studio-bg text-ink dark:text-white font-semibold shadow-sm'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div>
              <label className="block text-xs font-mono text-ink-muted dark:text-studio-muted mb-2">
                Type or edit an answer to see real-time NLP feature metrics recalculate:
              </label>
              <textarea
                rows={3}
                value={nlpInput}
                onChange={(e) => setNlpInput(e.target.value)}
                className="w-full p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border text-sm text-ink dark:text-white focus:outline-none focus:border-clay font-mono transition-colors resize-none"
              />
            </div>

            {/* Metric gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border hover:border-clay/50 transition-colors">
                <span className="text-[10px] font-mono uppercase text-ink-muted dark:text-studio-muted block">
                  Technical Depth
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-clay">{nlpScore.depth}%</span>
                  <span className="text-[10px] text-stone-400 font-mono">Term density</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-clay transition-all duration-300" style={{ width: `${nlpScore.depth}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border hover:border-cobalt/50 transition-colors">
                <span className="text-[10px] font-mono uppercase text-ink-muted dark:text-studio-muted block">
                  Vocabulary Sophistication
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-cobalt">{nlpScore.vocab}%</span>
                  <span className="text-[10px] text-stone-400 font-mono">Lexical variety</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-cobalt transition-all duration-300" style={{ width: `${nlpScore.vocab}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border hover:border-sage/50 transition-colors">
                <span className="text-[10px] font-mono uppercase text-ink-muted dark:text-studio-muted block">
                  Role Relevancy
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-sage">{nlpScore.relevancy}%</span>
                  <span className="text-[10px] text-stone-400 font-mono">Cosine affinity</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-sage transition-all duration-300" style={{ width: `${nlpScore.relevancy}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study 2: Star-Gazer */}
        {activeStudy === 'stargazer' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-border dark:border-studio-border pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cobalt font-semibold">
                  Study 02 • Serenity Celestial Canvas
                </span>
                <h3 className="font-serif text-2xl text-ink dark:text-white">
                  Star-Gazer Constellation Engine
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-paper-border dark:border-studio-border">
                  ✨ Click canvas to place new stars
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-[#080c14] shadow-inner">
              <canvas ref={starCanvasRef} className="w-full h-80 block cursor-crosshair" />
              
              <div className="absolute top-3 right-3 text-[11px] font-mono px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-300 border border-stone-700/60 pointer-events-none">
                <span>{customStarsCount > 0 ? `+${customStarsCount} user stars placed` : 'Astronomical mode'}</span>
              </div>

              <div className="absolute bottom-3 left-4 text-[11px] font-mono text-stone-400 pointer-events-none flex items-center gap-4">
                <span>Constellation ties: <strong className="text-clay font-mono">{connectedStars}</strong> active links</span>
                <span className="hidden sm:inline text-stone-500">• Click existing star to ring harmonic chime</span>
              </div>
            </div>
          </div>
        )}

        {/* Study 3: 3D Card Flip */}
        {activeStudy === 'card-flip' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-border dark:border-studio-border pb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sage font-semibold">
                  Study 03 • Gamified Tactile Physics
                </span>
                <h3 className="font-serif text-2xl text-ink dark:text-white">
                  3D Card Flip & Habit Rewards
                </h3>
              </div>

              {/* Habit Picker */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-mono">
                {habits.map((h, i) => (
                  <button
                    key={h.title}
                    onClick={() => {
                      playClickSound();
                      setSelectedHabitIndex(i);
                      setIsFlipped(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                      selectedHabitIndex === i
                        ? 'bg-white dark:bg-studio-bg text-ink dark:text-white font-semibold shadow-sm'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {h.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
              {/* 3D Flip Card */}
              <div
                onClick={handleCardFlip}
                data-cursor="FLIP"
                className="w-72 h-88 cursor-pointer perspective-1000 group"
              >
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-700 preserve-3d shadow-float ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 backface-hidden p-6 rounded-2xl bg-gradient-to-br from-paper-card to-paper-subtle dark:from-studio-card dark:to-stone-900 border border-paper-border dark:border-studio-border flex flex-col justify-between group-hover:border-clay/60 transition-colors"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-clay font-bold uppercase tracking-wider">
                          Serenity Daily Ritual
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-clay/10 text-clay">
                          {habits[selectedHabitIndex].xp}
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl text-ink dark:text-white mt-2">
                        {habits[selectedHabitIndex].title}
                      </h4>
                      <p className="text-xs text-ink-muted dark:text-studio-muted mt-3 leading-relaxed">
                        {habits[selectedHabitIndex].desc}
                      </p>
                    </div>

                    <div className="text-center pt-4 border-t border-stone-200 dark:border-stone-800">
                      <span className="text-[11px] font-mono text-clay flex items-center justify-center gap-1.5 group-hover:scale-105 transition-transform">
                        <i className="fas fa-hand-pointer text-[10px]" />
                        <span>Tap to complete & celebrate</span>
                      </span>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 backface-hidden p-6 rounded-2xl bg-gradient-to-br from-clay/15 via-paper-card to-sage/15 dark:from-stone-900 dark:to-studio-card border border-clay/40 flex flex-col justify-between text-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="pt-4">
                      <div className="w-14 h-14 rounded-full bg-clay/20 text-clay flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner animate-bounce">
                        <i className="fas fa-check" />
                      </div>
                      <h4 className="font-serif text-2xl text-ink dark:text-white">
                        Streak Verified!
                      </h4>
                      <p className="text-xs text-ink-muted dark:text-studio-muted mt-2">
                        {habits[selectedHabitIndex].xp} synced to offline local profile.
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-stone-400">
                      Click to flip back
                    </span>
                  </div>
                </div>
              </div>

              {/* Explanation note */}
              <div className="max-w-xs space-y-3 font-mono text-xs text-ink-muted dark:text-studio-muted">
                <p>
                  <strong>Materiality Study:</strong> Developed for Serenity to make digital mental health tasks feel as physical and rewarding as writing in a leather journal.
                </p>
                <div className="p-3.5 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                  <span className="text-ink dark:text-white font-bold block mb-1">State & Sound:</span>
                  <span>{isFlipped ? 'Card Flipped • Confetti Burst Fired' : 'Awaiting user action • Tap card'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study 4: Neural Synapse Simulator */}
        {activeStudy === 'neural-network' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-border dark:border-studio-border pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-semibold">
                  Study 04 • Machine Learning Graph
                </span>
                <h3 className="font-serif text-2xl text-ink dark:text-white">
                  Neural Synapse & Weights Visualizer
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fireSynapticPulse}
                  data-cursor="PULSE"
                  className="px-4 py-2 rounded-full bg-clay text-white font-mono text-xs font-semibold hover:bg-clay/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-soft"
                >
                  <i className="fas fa-bolt text-xs" />
                  <span>Fire Synaptic Pulse</span>
                </button>
              </div>
            </div>

            {/* Neural Graph Canvas Simulation */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-white relative overflow-hidden">
              <div className="grid grid-cols-4 gap-4 items-center min-h-[220px] relative z-10">
                {/* Layer 0: Inputs */}
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Input Layer
                  </span>
                  {['Text Tokens', 'Sentiment', 'Frequency', 'Pacing'].map((inp, idx) => (
                    <div
                      key={inp}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 w-full text-center ${
                        firingLayer === 0
                          ? 'border-amber-400 bg-amber-400/20 text-amber-200 scale-105 shadow-glow'
                          : 'border-stone-800 bg-stone-900/80 text-stone-400'
                      }`}
                    >
                      x_{idx + 1}: {inp}
                    </div>
                  ))}
                </div>

                {/* Layer 1: Hidden 1 */}
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Hidden (Weights)
                  </span>
                  {['W₁₁ (0.84)', 'W₁₂ (-0.42)', 'W₁₃ (1.15)', 'W₁₄ (0.33)'].map((h) => (
                    <div
                      key={h}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 w-full text-center ${
                        firingLayer === 1
                          ? 'border-clay bg-clay/30 text-white scale-105 shadow-glow'
                          : 'border-stone-800 bg-stone-900/80 text-stone-400'
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Layer 2: Hidden 2 */}
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Activation ({activationFunction})
                  </span>
                  {['h₂₁ (ReLU)', 'h₂₂ (ReLU)', 'h₂₃ (ReLU)'].map((h) => (
                    <div
                      key={h}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 w-full text-center ${
                        firingLayer === 2
                          ? 'border-cobalt bg-cobalt/30 text-white scale-105 shadow-glow'
                          : 'border-stone-800 bg-stone-900/80 text-stone-400'
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Layer 3: Output */}
                <div className="flex flex-col items-center gap-4">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">
                    Prediction
                  </span>
                  <div
                    className={`p-3 rounded-xl border transition-all duration-300 text-center w-full ${
                      firingLayer === 3
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 scale-110 shadow-glow'
                        : 'border-stone-800 bg-stone-900 text-stone-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">
                      Classification Confidence
                    </span>
                    <span className="font-mono text-xl font-bold text-emerald-400">
                      {neuralConfidence}%
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 block mt-1">
                      Target: AI Engineer
                    </span>
                  </div>
                </div>
              </div>

              {/* Background synapsing line decoration */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C46D4E_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Interactive hyperparameter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-ink-muted dark:text-studio-muted">Learning Rate (η):</span>
                  <span className="font-bold text-clay font-mono">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.2"
                  step="0.005"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-clay cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-paper dark:bg-stone-900 border border-paper-border dark:border-studio-border flex items-center justify-between">
                <span className="text-ink-muted dark:text-studio-muted">Activation Function:</span>
                <div className="flex items-center gap-1.5">
                  {(['ReLU', 'Sigmoid', 'GELU'] as const).map((fn) => (
                    <button
                      key={fn}
                      onClick={() => {
                        playClickSound();
                        setActivationFunction(fn);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                        activationFunction === fn
                          ? 'bg-clay text-white font-bold'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
