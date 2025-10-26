/**
 * Obstacle management system
 */
import { Obstacle } from '../entities/Obstacle.js';
import Bird from '../entities/Bird.js';
import { OBSTACLE_CONFIG } from '../config/gameConfig.js';

export class ObstacleSystem {
    constructor() {
        this.obstacles = [];
        this.birds = [];
        this.timer = 0;
        this.spawnInterval = OBSTACLE_CONFIG.INITIAL_INTERVAL;
    }

    /**
     * Reset obstacle system
     */
    reset() {
        this.obstacles = [];
        this.birds = [];
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

        // Spawn new obstacle or bird
        if (this.timer > this.spawnInterval) {
            // 35% chance to spawn a bird instead of ground obstacle
            if (Math.random() < 0.35) {
                this.birds.push(new Bird());
            } else {
                this.obstacles.push(new Obstacle());
            }
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

        // Update existing birds
        for (let i = this.birds.length - 1; i >= 0; i--) {
            const bird = this.birds[i];
            bird.update(speed);

            // Remove off-screen birds
            if (bird.isOffScreen()) {
                this.birds.splice(i, 1);
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

    /**
     * Get all birds
     * @returns {Bird[]}
     */
    getBirds() {
        return this.birds;
    }
}
