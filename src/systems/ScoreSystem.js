/**
 * Score management system
 */
import { GAME_CONFIG, STORAGE_KEYS } from '../config/gameConfig.js';
import { getStorageValue, setStorageValue } from '../utils/storageUtils.js';
import { triggerPulse } from '../utils/animationUtils.js';

export class ScoreSystem {
    constructor() {
        this.score = 0;
        this.highScore = parseInt(getStorageValue(STORAGE_KEYS.HIGH_SCORE, 0));
    }

    /**
     * Reset score to zero
     */
    reset() {
        this.score = 0;
    }

    /**
     * Increment score by base amount
     */
    incrementScore() {
        this.score += GAME_CONFIG.SCORE_INCREMENT;
    }

    /**
     * Add points for passing an obstacle
     */
    addObstaclePoints() {
        this.score += GAME_CONFIG.SCORE_PER_OBSTACLE;
        triggerPulse('score-box');
    }

    /**
     * Update high score if current score is higher
     */
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            setStorageValue(STORAGE_KEYS.HIGH_SCORE, Math.floor(this.highScore));
            triggerPulse('high-score-box');
        }
    }

    /**
     * Get current score
     * @returns {number}
     */
    getScore() {
        return Math.floor(this.score);
    }

    /**
     * Get high score
     * @returns {number}
     */
    getHighScore() {
        return Math.floor(this.highScore);
    }
}
