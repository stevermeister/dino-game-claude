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
        // Keyboard input - keydown
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                gameEngine.jump();
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                gameEngine.duck();
            }
        });

        // Keyboard input - keyup (to unduck when key is released)
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                gameEngine.unduck();
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
