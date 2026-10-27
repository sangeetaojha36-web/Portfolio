// Zero-dependency browser Web Audio API micro-sound synthesizer for tactile feedback

let audioCtx: AudioContext | null = null;
let isSoundEnabled = false;

export const initAudio = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  isSoundEnabled = enabled;
  if (enabled) {
    initAudio();
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('sangeeta_sound', enabled ? 'true' : 'false');
  }
};

export const getSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return isSoundEnabled || localStorage.getItem('sangeeta_sound') === 'true';
};

// Play a soft wooden/tactile click
export const playClickSound = () => {
  if (!getSoundEnabled()) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch {
    // Graceful fallback if audio is blocked
  }
};

// Play a high harmonic celestial chime
export const playChimeSound = () => {
  if (!getSoundEnabled()) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const freqs = [587.33, 880, 1174.66]; // D5, A5, D6 chord
    freqs.forEach((f, idx) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, audioCtx.currentTime + idx * 0.03);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.03 + 0.45);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.03);
      osc.stop(audioCtx.currentTime + idx * 0.03 + 0.5);
    });
  } catch {
    // Ignore
  }
};

// Play a gentle pop
export const playPopSound = () => {
  if (!getSoundEnabled()) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch {
    // Ignore
  }
};

// Play a gentle subtle pulse on synapse activation
export const playSynapsePulse = (pitch = 440) => {
  if (!getSoundEnabled()) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, audioCtx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.11);
  } catch {
    // Ignore
  }
};
