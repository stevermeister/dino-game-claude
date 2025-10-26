/**
 * Score display UI module
 */
import { formatTime } from '../utils/timeUtils.js';

export class ScoreDisplay {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.levelElement = document.getElementById('level');
        this.speedElement = document.getElementById('speed');
        this.timeElement = document.getElementById('time');
    }

    /**
     * Update all score displays
     * @param {Object} data - Score data
     */
    update(data) {
        if (this.scoreElement) {
            this.scoreElement.textContent = data.score;
        }
        if (this.highScoreElement) {
            this.highScoreElement.textContent = data.highScore;
        }
        if (this.levelElement) {
            this.levelElement.textContent = data.level;
        }
        if (this.speedElement) {
            this.speedElement.textContent = `${data.speed.toFixed(1)}x`;
        }
        if (this.timeElement) {
            this.timeElement.textContent = formatTime(data.time);
        }
    }
}
