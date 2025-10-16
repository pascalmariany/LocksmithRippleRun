type AudioContextType = AudioContext | null;

let audioContext: AudioContextType = null;
let masterGain: GainNode | null = null;
let isMuted = false;

export function initAudio() {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = isMuted ? 0 : 0.3;
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  if (masterGain) {
    masterGain.gain.value = isMuted ? 0 : 0.3;
  }
  localStorage.setItem('locksmith-muted', isMuted.toString());
  return isMuted;
}

export function getMuted() {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('locksmith-muted');
  isMuted = stored === 'true';
  return isMuted;
}

function playNote(frequency: number, duration: number, type: OscillatorType = 'sine', gain = 0.2) {
  if (!audioContext || !masterGain || isMuted) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(masterGain);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export function playCellClick() {
  initAudio();
  playNote(800, 0.1, 'sine', 0.15);
}

export function playKeySelect() {
  initAudio();
  playNote(600, 0.15, 'triangle', 0.2);
}

export function playUnlock() {
  initAudio();
  if (!audioContext || !masterGain || isMuted) return;

  const now = audioContext.currentTime;
  const ctx = audioContext;
  const master = masterGain;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, now + i * 0.08);

    gainNode.gain.setValueAtTime(0.15, now + i * 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(master);

    oscillator.start(now + i * 0.08);
    oscillator.stop(now + i * 0.08 + 0.3);
  });
}

export function playVictory() {
  initAudio();
  if (!audioContext || !masterGain || isMuted) return;

  const now = audioContext.currentTime;
  const ctx = audioContext;
  const master = masterGain;
  const melody = [523.25, 587.33, 659.25, 783.99, 880.00];

  melody.forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, now + i * 0.12);

    gainNode.gain.setValueAtTime(0.2, now + i * 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(master);

    oscillator.start(now + i * 0.12);
    oscillator.stop(now + i * 0.12 + 0.4);
  });
}

export function playUndo() {
  initAudio();
  playNote(400, 0.1, 'sawtooth', 0.1);
}

export function playReset() {
  initAudio();
  if (!audioContext || !masterGain || isMuted) return;

  const now = audioContext.currentTime;
  const ctx = audioContext;
  const master = masterGain;

  [600, 500, 400].forEach((freq, i) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, now + i * 0.06);

    gainNode.gain.setValueAtTime(0.15, now + i * 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(master);

    oscillator.start(now + i * 0.06);
    oscillator.stop(now + i * 0.06 + 0.2);
  });
}

let musicOscillators: OscillatorNode[] = [];
let musicGain: GainNode | null = null;
let isMusicPlaying = false;

export function startBackgroundMusic() {
  if (!audioContext || !masterGain || isMuted || isMusicPlaying) return;

  initAudio();

  const baseNotes = [261.63, 329.63, 392.00, 523.25];

  musicGain = audioContext.createGain();
  musicGain.gain.setValueAtTime(0, audioContext.currentTime);
  musicGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 2);
  musicGain.connect(masterGain);

  const playPattern = () => {
    if (!audioContext || !musicGain || isMuted) return;

    const ctx = audioContext;
    const mgain = musicGain;
    const pattern = [0, 2, 1, 3, 2, 1, 0, 2];
    const duration = 0.4;

    pattern.forEach((noteIndex, i) => {
      setTimeout(() => {
        if (!ctx || !mgain || isMuted) return;

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseNotes[noteIndex], ctx.currentTime);

        noteGain.gain.setValueAtTime(0.3, ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration * 0.8);

        osc.connect(noteGain);
        noteGain.connect(mgain);

        osc.start();
        osc.stop(ctx.currentTime + duration);

        musicOscillators.push(osc);
      }, i * duration * 1000);
    });

    setTimeout(playPattern, pattern.length * duration * 1000);
  };

  playPattern();
  isMusicPlaying = true;
}

export function stopBackgroundMusic() {
  musicOscillators.forEach(osc => {
    try {
      osc.stop();
    } catch (e) {}
  });
  musicOscillators = [];

  if (musicGain && audioContext) {
    musicGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
  }

  isMusicPlaying = false;
}

export function isMusicActive() {
  return isMusicPlaying;
}