/**
 * Dino entity class
 */
import { DINO_CONFIG, GROUND_CONFIG } from '../config/gameConfig.js';

export class Dino {
    constructor() {
        this.x = DINO_CONFIG.X;
        this.y = DINO_CONFIG.Y;
        this.width = DINO_CONFIG.WIDTH;
        this.height = DINO_CONFIG.HEIGHT;
        this.dy = 0;
        this.jumpPower = DINO_CONFIG.JUMP_POWER;
        this.gravity = DINO_CONFIG.GRAVITY;
        this.isJumping = false;
    }

    /**
     * Reset dino to initial state
     */
    reset() {
        this.y = GROUND_CONFIG.Y - this.height;
        this.dy = 0;
        this.isJumping = false;
    }

    /**
     * Make dino jump
     */
    jump() {
        if (!this.isJumping && this.y >= GROUND_CONFIG.Y - this.height) {
            this.dy = this.jumpPower;
            this.isJumping = true;
        }
    }

    /**
     * Update dino position and state
     */
    update() {
        // Apply gravity
        this.dy += this.gravity;
        this.y += this.dy;

        // Ground collision
        if (this.y + this.height >= GROUND_CONFIG.Y) {
            this.y = GROUND_CONFIG.Y - this.height;
            this.dy = 0;
            this.isJumping = false;
        }
    }

    /**
     * Get dino bounds for collision detection
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
