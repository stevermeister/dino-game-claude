/**
 * Sound management system
 */
import { getStorageValue, setStorageValue } from '../utils/storageUtils.js';

export class SoundManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.muted = getStorageValue('soundMuted', 'false') === 'true';
        this.bgMusicGain = null;
        this.bgMusicInterval = null;
    }

    playSound(frequency, duration, type = 'sine', volume = 0.3) {
        if (this.muted) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;
        gainNode.gain.value = volume;

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        // Fade out
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            this.audioContext.currentTime + duration
        );
    }

    playJump() {
        if (this.muted) return;
        // Quick upward sweep
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playScore() {
        if (this.muted) return;
        // Pleasant ding sound
        this.playSound(800, 0.1, 'sine', 0.15);
    }

    playLevelUp() {
        if (this.muted) return;
        // Triumphant ascending tones
        setTimeout(() => this.playSound(523, 0.1, 'sine', 0.2), 0);
        setTimeout(() => this.playSound(659, 0.1, 'sine', 0.2), 100);
        setTimeout(() => this.playSound(784, 0.2, 'sine', 0.2), 200);
    }

    playGameOver() {
        if (this.muted) return;
        // Descending sad tones
        setTimeout(() => this.playSound(400, 0.15, 'sawtooth', 0.3), 0);
        setTimeout(() => this.playSound(300, 0.15, 'sawtooth', 0.3), 150);
        setTimeout(() => this.playSound(200, 0.3, 'sawtooth', 0.3), 300);
    }

    startBackgroundMusic() {
        if (this.muted || this.bgMusicGain) return;

        // Simple melody loop
        const melody = [523, 587, 659, 587]; // C, D, E, D
        let noteIndex = 0;

        this.bgMusicGain = this.audioContext.createGain();
        this.bgMusicGain.connect(this.audioContext.destination);
        this.bgMusicGain.gain.value = 0.05; // Very quiet background

        const playNote = () => {
            if (this.muted || !this.bgMusicGain) return;

            const oscillator = this.audioContext.createOscillator();
            oscillator.connect(this.bgMusicGain);
            oscillator.type = 'triangle';
            oscillator.frequency.value = melody[noteIndex];

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);

            noteIndex = (noteIndex + 1) % melody.length;
        };

        playNote();
        this.bgMusicInterval = setInterval(playNote, 500);
    }

    stopBackgroundMusic() {
        if (this.bgMusicInterval) {
            clearInterval(this.bgMusicInterval);
            this.bgMusicInterval = null;
        }
        if (this.bgMusicGain) {
            this.bgMusicGain.disconnect();
            this.bgMusicGain = null;
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        setStorageValue('soundMuted', this.muted);

        if (this.muted) {
            this.stopBackgroundMusic();
        }

        return this.muted;
    }

    isMuted() {
        return this.muted;
    }
}
