/**
 * Level and difficulty management system
 */
import { GAME_CONFIG } from '../config/gameConfig.js';
import { triggerPulse } from '../utils/animationUtils.js';

export class LevelSystem {
    constructor() {
        this.level = 1;
        this.previousLevel = 1;
        this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
        this.speedIncrement = 0;
    }

    /**
     * Reset level to initial state
     */
    reset() {
        this.level = 1;
        this.previousLevel = 1;
        this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
        this.speedIncrement = 0;
    }

    /**
     * Update level based on score
     * @param {number} score - Current game score
     */
    update(score) {
        this.speedIncrement = Math.floor(score / GAME_CONFIG.SCORE_FOR_SPEED_UP);
        this.gameSpeed = GAME_CONFIG.INITIAL_SPEED + this.speedIncrement * GAME_CONFIG.SPEED_INCREMENT_FACTOR;
        this.level = Math.floor(this.speedIncrement) + 1;

        // Trigger level up animation
        if (this.level > this.previousLevel) {
            this.previousLevel = this.level;
            triggerPulse('level');
        }
    }

    /**
     * Get current game speed
     * @returns {number}
     */
    getSpeed() {
        return this.gameSpeed;
    }

    /**
     * Get current level
     * @returns {number}
     */
    getLevel() {
        return this.level;
    }
}
