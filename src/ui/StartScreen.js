/**
 * Start screen UI module
 */

export class StartScreen {
    constructor() {
        this.container = document.getElementById('start-screen');
    }

    /**
     * Show start screen
     */
    show() {
        if (this.container) {
            this.container.classList.remove('hidden');
        }
    }

    /**
     * Hide start screen
     */
    hide() {
        if (this.container) {
            this.container.classList.add('hidden');
        }
    }

    /**
     * Check if start screen is visible
     * @returns {boolean}
     */
    isVisible() {
        return this.container && !this.container.classList.contains('hidden');
    }
}
