// Web Audio API based Minecraft Java Edition sound effects system
// Uses official Minecraft Java Edition sound assets with zero-latency pre-decoded buffers

import clickOgg from '../assets/sounds/click.ogg';
import clickMp3 from '../assets/sounds/click.mp3';
import orbOgg from '../assets/sounds/orb.ogg';
import orbMp3 from '../assets/sounds/orb.mp3';
import levelupOgg from '../assets/sounds/levelup.ogg';
import levelupMp3 from '../assets/sounds/levelup.mp3';

// Detect whether the browser supports OGG Vorbis audio
const canPlayOgg = (): boolean => {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return false;
  try {
    const audio = new Audio();
    return audio.canPlayType('audio/ogg; codecs="vorbis"') !== '';
  } catch {
    return false;
  }
};

const isOgg = canPlayOgg();

const SOUND_ASSETS = {
  click: isOgg ? clickOgg : clickMp3,
  orb: isOgg ? orbOgg : orbMp3,
  levelup: isOgg ? levelupOgg : levelupMp3,
} as const;

type SoundKey = keyof typeof SOUND_ASSETS;

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private buffers: Map<SoundKey, AudioBuffer> = new Map();
  private loadingPromises: Map<SoundKey, Promise<AudioBuffer | null>> = new Map();
  private lastExpTime: number = 0;
  private expCombo: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('szut_mc_audio_muted');
      this.isMuted = saved === 'true';

      // Preload critical audio buffers after initial render
      const preload = () => {
        this.loadBuffer('click');
        this.loadBuffer('orb');
      };

      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(preload);
      } else {
        setTimeout(preload, 100);
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('szut_mc_audio_muted', String(muted));
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  private async loadBuffer(key: SoundKey): Promise<AudioBuffer | null> {
    if (this.buffers.has(key)) {
      return this.buffers.get(key)!;
    }
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key)!;
    }

    const promise = (async () => {
      try {
        const ctx = this.getContext();
        if (!ctx) return null;

        const url = SOUND_ASSETS[key];
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arrayBuffer = await res.arrayBuffer();

        const decoded = await new Promise<AudioBuffer>((resolve, reject) => {
          const res = ctx.decodeAudioData(arrayBuffer, resolve, reject);
          if (res && typeof res.then === 'function') {
            res.then(resolve).catch(reject);
          }
        });

        this.buffers.set(key, decoded);
        return decoded;
      } catch (err) {
        console.warn(`[SZUT-MC SoundManager] Failed to load buffer for ${key}:`, err);
        return null;
      }
    })();

    this.loadingPromises.set(key, promise);
    return promise;
  }

  private playBuffer(key: SoundKey, volume: number = 0.4, pitch: number = 1.0) {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    const cached = this.buffers.get(key);
    if (cached) {
      this.spawnSourceNode(ctx, cached, volume, pitch);
      return;
    }

    // If buffer is still loading, wait for it or fallback
    this.loadBuffer(key).then((buf) => {
      if (buf && !this.isMuted) {
        this.spawnSourceNode(ctx, buf, volume, pitch);
      } else {
        this.playFallbackAudio(key, volume, pitch);
      }
    }).catch(() => {
      this.playFallbackAudio(key, volume, pitch);
    });
  }

  private spawnSourceNode(ctx: AudioContext, buffer: AudioBuffer, volume: number, pitch: number) {
    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = pitch;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(0);
    } catch {
      // Audio playback safety catch
    }
  }

  private playFallbackAudio(key: SoundKey, volume: number, pitch: number) {
    try {
      const audio = new Audio(SOUND_ASSETS[key]);
      audio.volume = Math.min(1, Math.max(0, volume));
      if ('playbackRate' in audio) {
        audio.playbackRate = pitch;
      }
      audio.play().catch(() => {});
    } catch {
      // Audio playback fallback safety catch
    }
  }

  /**
   * Classic Minecraft Java Edition GUI button click (ui.button.click / random/click.ogg)
   * Sharp, solid wooden click matching the vanilla Minecraft menu interface.
   */
  public playClick() {
    this.playBuffer('click', 0.45, 1.0);
  }

  /**
   * Minecraft Java Edition Experience Orb pickup sound (entity.experience_orb.pickup / random/orb.ogg)
   * Used for copy-to-clipboard success and positive interactions.
   * Includes authentic subtle pitch variation and combo pitch steps for consecutive copies.
   */
  public playExp() {
    if (this.isMuted) return;

    const now = Date.now();
    if (now - this.lastExpTime < 1200) {
      this.expCombo = Math.min(this.expCombo + 1, 5);
    } else {
      this.expCombo = 0;
    }
    this.lastExpTime = now;

    // Pitch variation authentic to MC: base pitch 1.0 + subtle random variation + combo pitch step
    const randomPitch = (Math.random() - 0.5) * 0.08;
    const comboStep = this.expCombo * 0.07;
    const pitch = Math.min(1.35, Math.max(0.85, 1.0 + randomPitch + comboStep));

    this.playBuffer('orb', 0.5, pitch);
  }

  /**
   * Alias for playExp()
   */
  public playOrb() {
    this.playExp();
  }

  /**
   * Backward-compatible level up method.
   * Mapped to playExp() so all existing copy actions and alerts immediately play
   * the authentic experience orb pickup sound.
   */
  public playLevelUp() {
    this.playExp();
  }

  /**
   * Minecraft Level Up chime fanfare (random/levelup.ogg)
   */
  public playLevelUpFanfare() {
    this.playBuffer('levelup', 0.45, 1.0);
  }

  /**
   * Minecraft item pickup / pop sound
   */
  public playPop() {
    this.playBuffer('orb', 0.35, 1.25);
  }
}

export const sounds = new SoundManager();
