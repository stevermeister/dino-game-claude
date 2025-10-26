/**
 * Ground entity class
 */
import { GROUND_CONFIG } from '../config/gameConfig.js';

export class Ground {
    constructor() {
        this.y = GROUND_CONFIG.Y;
        this.height = GROUND_CONFIG.HEIGHT;
    }

    /**
     * Get ground bounds
     * @returns {{y: number, height: number}}
     */
    getBounds() {
        return {
            y: this.y,
            height: this.height
        };
    }
}
