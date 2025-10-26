/**
 * Main game engine
 */
import { Dino } from '../entities/Dino.js';
import { Ground } from '../entities/Ground.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { ScoreSystem } from '../systems/ScoreSystem.js';
import { LevelSystem } from '../systems/LevelSystem.js';
import { ObstacleSystem } from '../systems/ObstacleSystem.js';
import { Renderer } from '../rendering/Renderer.js';
import { ScoreDisplay } from '../ui/ScoreDisplay.js';
import { GameOverScreen } from '../ui/GameOverScreen.js';
import { StartScreen } from '../ui/StartScreen.js';

export class GameEngine {
    /**
     * Create game engine
     * @param {HTMLCanvasElement} canvas - Game canvas
     */
    constructor(canvas) {
        // Core components
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);

        // Game state
        this.gameStarted = false;
        this.gameOver = false;
        this.animationId = null;
        this.startTime = 0;
        this.elapsedTime = 0;

        // Entities
        this.dino = new Dino();
        this.ground = new Ground();

        // Systems
        this.scoreSystem = new ScoreSystem();
        this.levelSystem = new LevelSystem();
        this.obstacleSystem = new ObstacleSystem();

        // UI
        this.scoreDisplay = new ScoreDisplay();
        this.gameOverScreen = new GameOverScreen();
        this.startScreen = new StartScreen();

        // Initialize
        this.updateDisplay();
    }

    /**
     * Start or restart the game
     */
    start() {
        this.gameStarted = true;
        this.gameOver = false;
        this.startTime = Date.now();
        this.elapsedTime = 0;

        // Reset all systems
        this.dino.reset();
        this.scoreSystem.reset();
        this.levelSystem.reset();
        this.obstacleSystem.reset();

        // Hide screens
        this.startScreen.hide();
        this.gameOverScreen.hide();

        // Start game loop
        this.gameLoop();
    }

    /**
     * End the game
     */
    end() {
        this.gameOver = true;
        this.gameStarted = false;

        this.gameOverScreen.show(
            this.scoreSystem.getScore(),
            this.scoreSystem.getHighScore()
        );

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    /**
     * Handle jump action
     */
    jump() {
        if (!this.gameStarted && !this.gameOver) {
            this.start();
        } else if (this.gameOver) {
            this.start();
        } else {
            this.dino.jump();
        }
    }

    /**
     * Update game display
     */
    updateDisplay() {
        this.scoreDisplay.update({
            score: this.scoreSystem.getScore(),
            highScore: this.scoreSystem.getHighScore(),
            level: this.levelSystem.getLevel(),
            speed: this.levelSystem.getSpeed(),
            time: this.elapsedTime
        });
    }

    /**
     * Main game loop
     */
    gameLoop() {
        // Update elapsed time
        this.elapsedTime = (Date.now() - this.startTime) / 1000;

        // Update systems
        this.dino.update();
        this.levelSystem.update(this.scoreSystem.score);

        const obstaclesPassed = this.obstacleSystem.update(
            this.levelSystem.getSpeed(),
            this.levelSystem.speedIncrement
        );

        // Add points for obstacles
        for (let i = 0; i < obstaclesPassed; i++) {
            this.scoreSystem.addObstaclePoints();
            this.scoreSystem.updateHighScore();
        }

        // Increment score
        this.scoreSystem.incrementScore();

        // Check collision
        if (CollisionSystem.checkDinoObstacleCollision(
            this.dino,
            this.obstacleSystem.getObstacles()
        )) {
            this.end();
            return;
        }

        // Update display
        this.updateDisplay();

        // Render
        this.renderer.render({
            dino: this.dino,
            ground: this.ground,
            obstacles: this.obstacleSystem.getObstacles(),
            score: this.scoreSystem.score
        });

        // Continue loop
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}
