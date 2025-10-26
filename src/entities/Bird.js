import { CANVAS_CONFIG } from '../config/gameConfig.js';

export default class Bird {
    constructor() {
        this.width = 30;
        this.height = 20;
        this.x = CANVAS_CONFIG.WIDTH;

        // Birds fly at different heights (high, medium, or low)
        const heights = [60, 90, 120]; // Different flying heights
        this.y = heights[Math.floor(Math.random() * heights.length)];

        // Wing animation state
        this.wingUp = true;
        this.wingAnimationCounter = 0;
        this.wingAnimationSpeed = 5; // Frames per wing flap
    }

    update(speed) {
        this.x -= speed;

        // Animate wings
        this.wingAnimationCounter++;
        if (this.wingAnimationCounter >= this.wingAnimationSpeed) {
            this.wingUp = !this.wingUp;
            this.wingAnimationCounter = 0;
        }
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
