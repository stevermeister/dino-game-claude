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
        this.normalHeight = DINO_CONFIG.HEIGHT;
        this.duckHeight = DINO_CONFIG.HEIGHT * 0.6; // 60% of normal height when ducking
        this.dy = 0;
        this.jumpPower = DINO_CONFIG.JUMP_POWER;
        this.gravity = DINO_CONFIG.GRAVITY;
        this.isJumping = false;
        this.isDucking = false;
        // Animation state
        this.blinkTimer = 0;
        this.isBlinking = false;
        this.nextBlinkTime = Math.random() * 100 + 50; // Random blink interval
    }

    /**
     * Reset dino to initial state
     */
    reset() {
        this.height = this.normalHeight;
        this.y = GROUND_CONFIG.Y - this.height;
        this.dy = 0;
        this.isJumping = false;
        this.isDucking = false;
        this.blinkTimer = 0;
        this.isBlinking = false;
        this.nextBlinkTime = Math.random() * 100 + 50;
    }

    /**
     * Make dino jump
     */
    jump() {
        if (!this.isJumping && !this.isDucking && this.y >= GROUND_CONFIG.Y - this.height) {
            this.dy = this.jumpPower;
            this.isJumping = true;
        }
    }

    /**
     * Make dino duck
     */
    duck() {
        if (!this.isJumping && !this.isDucking) {
            this.isDucking = true;
            const oldHeight = this.height;
            this.height = this.duckHeight;
            // Adjust y position to keep feet on the ground
            this.y += (oldHeight - this.height);
        }
    }

    /**
     * Make dino stand up from ducking
     */
    unduck() {
        if (this.isDucking) {
            this.isDucking = false;
            const oldHeight = this.height;
            this.height = this.normalHeight;
            // Adjust y position to keep feet on the ground
            this.y -= (this.height - oldHeight);
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

        // Handle blinking animation
        this.blinkTimer++;
        if (this.blinkTimer >= this.nextBlinkTime) {
            this.isBlinking = true;
            if (this.blinkTimer >= this.nextBlinkTime + 5) { // Blink duration: 5 frames
                this.isBlinking = false;
                this.blinkTimer = 0;
                this.nextBlinkTime = Math.random() * 150 + 50; // Next blink in 50-200 frames
            }
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
