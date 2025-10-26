/**
 * Input handling module
 */

export class InputHandler {
    /**
     * Setup input handlers
     * @param {GameEngine} gameEngine - Game engine instance
     * @param {HTMLCanvasElement} canvas - Game canvas
     */
    static setup(gameEngine, canvas) {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                gameEngine.jump();
            }
        });

        // Canvas click input
        canvas.addEventListener('click', () => {
            gameEngine.jump();
        });

        // Restart button
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                gameEngine.start();
            });
        }
    }
}
