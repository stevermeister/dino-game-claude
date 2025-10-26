/**
 * Obstacle management system
 */
import { Obstacle } from '../entities/Obstacle.js';
import { OBSTACLE_CONFIG } from '../config/gameConfig.js';

export class ObstacleSystem {
    constructor() {
        this.obstacles = [];
        this.timer = 0;
        this.spawnInterval = OBSTACLE_CONFIG.INITIAL_INTERVAL;
    }

    /**
     * Reset obstacle system
     */
    reset() {
        this.obstacles = [];
        this.timer = 0;
        this.spawnInterval = OBSTACLE_CONFIG.INITIAL_INTERVAL;
    }

    /**
     * Update obstacles
     * @param {number} speed - Game speed
     * @param {number} speedIncrement - Speed increment for difficulty
     * @returns {number} Points earned from removed obstacles
     */
    update(speed, speedIncrement) {
        let pointsEarned = 0;
        this.timer++;

        // Spawn new obstacle
        if (this.timer > this.spawnInterval) {
            this.obstacles.push(new Obstacle());
            this.timer = 0;
            this.spawnInterval = Math.max(
                OBSTACLE_CONFIG.MIN_INTERVAL,
                OBSTACLE_CONFIG.INITIAL_INTERVAL - speedIncrement
            );
        }

        // Update existing obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.update(speed);

            // Remove off-screen obstacles
            if (obstacle.isOffScreen()) {
                this.obstacles.splice(i, 1);
                pointsEarned++;
            }
        }

        return pointsEarned;
    }

    /**
     * Get all obstacles
     * @returns {Obstacle[]}
     */
    getObstacles() {
        return this.obstacles;
    }
}
