// Subtle Web Audio sound effects for educational tactile feedback
class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Lazy initialized on first user gesture
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq: number, duration: number = 0.05, type: OscillatorType = 'sine', volume: number = 0.08) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  playCompare() {
    this.playTone(440, 0.04, 'triangle', 0.05);
  }

  playSwap() {
    this.playTone(660, 0.06, 'sine', 0.07);
  }

  playSuccess() {
    this.playTone(587.33, 0.08, 'sine', 0.08);
    setTimeout(() => this.playTone(880, 0.12, 'sine', 0.09), 90);
  }

  playStep() {
    this.playTone(380, 0.03, 'sine', 0.04);
  }

  playClick() {
    this.playTone(400, 0.03, 'sine', 0.04);
  }

  playReset() {
    this.playTone(320, 0.05, 'sine', 0.05);
  }
}

export const soundEffects = new SoundSynthesizer();
