/**
 * Main rendering coordinator
 */
import { DinoRenderer } from './DinoRenderer.js';
import { ObstacleRenderer } from './ObstacleRenderer.js';
import { GroundRenderer } from './GroundRenderer.js';

export class Renderer {
    /**
     * Create renderer
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Render all game elements
     * @param {Object} gameState - Current game state
     */
    render(gameState) {
        this.clear();

        GroundRenderer.render(this.ctx, gameState.ground, gameState.score);
        DinoRenderer.render(this.ctx, gameState.dino, gameState.score);
        ObstacleRenderer.render(this.ctx, gameState.obstacles);
    }
}
