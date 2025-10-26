/**
 * Dino Runner Game - Main Entry Point
 * Modular architecture with separate concerns
 */

import { GameEngine } from './src/core/GameEngine.js';
import { InputHandler } from './src/core/InputHandler.js';

// Get canvas element
const canvas = document.getElementById('gameCanvas');

// Initialize game engine
const game = new GameEngine(canvas);

// Setup input handlers
InputHandler.setup(game, canvas);

// Export for debugging if needed
window.game = game;
