// Import modular game components
import { GameEngine } from './src/core/GameEngine.js';
import { InputHandler } from './src/core/InputHandler.js';

// Get canvas
const canvas = document.getElementById('gameCanvas');

// Initialize game engine
const game = new GameEngine(canvas);

// Setup input handlers
InputHandler.setup(game, canvas);

// Setup mute button
document.getElementById('mute-btn').addEventListener('click', () => {
    const isMuted = game.soundManager.toggleMute();
    document.getElementById('mute-btn').textContent = isMuted ? '🔇' : '🔊';

    // Restart background music if unmuting during gameplay
    if (!isMuted && game.gameStarted && !game.gameOver) {
        game.soundManager.startBackgroundMusic();
    }
});

// Initialize mute button state
document.getElementById('mute-btn').textContent = game.soundManager.isMuted() ? '🔇' : '🔊';
