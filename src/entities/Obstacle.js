/**
 * Obstacle entity class
 */
import { OBSTACLE_CONFIG, GROUND_CONFIG, CANVAS_CONFIG } from '../config/gameConfig.js';

export class Obstacle {
    /**
     * Create an obstacle
     * @param {number} [height] - Optional height, randomly chosen if not provided
     */
    constructor(height = null) {
        this.width = OBSTACLE_CONFIG.WIDTH;
        this.height = height || this.randomHeight();
        this.x = CANVAS_CONFIG.WIDTH;
        this.y = GROUND_CONFIG.Y - this.height;
    }

    /**
     * Get a random obstacle height
     * @returns {number}
     */
    randomHeight() {
        return Math.random() > 0.5
            ? OBSTACLE_CONFIG.MIN_HEIGHT
            : OBSTACLE_CONFIG.MAX_HEIGHT;
    }

    /**
     * Update obstacle position
     * @param {number} speed - Game speed
     */
    update(speed) {
        this.x -= speed;
    }

    /**
     * Check if obstacle is off screen
     * @returns {boolean}
     */
    isOffScreen() {
        return this.x + this.width < 0;
    }

    /**
     * Get obstacle bounds for collision detection
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
