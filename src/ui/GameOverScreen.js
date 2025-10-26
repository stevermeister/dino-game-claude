/**
 * Game over screen UI module
 */

export class GameOverScreen {
    constructor() {
        this.container = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.finalHighScoreElement = document.getElementById('final-high-score');
    }

    /**
     * Show game over screen
     * @param {number} score - Final score
     * @param {number} highScore - High score
     */
    show(score, highScore) {
        if (this.finalScoreElement) {
            this.finalScoreElement.textContent = score;
        }
        if (this.finalHighScoreElement) {
            this.finalHighScoreElement.textContent = highScore;
        }
        if (this.container) {
            this.container.classList.remove('hidden');
        }
    }

    /**
     * Hide game over screen
     */
    hide() {
        if (this.container) {
            this.container.classList.add('hidden');
        }
    }
}
