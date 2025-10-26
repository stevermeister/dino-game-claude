/**
 * Ground rendering module
 */
import { COLORS, CANVAS_CONFIG } from '../config/gameConfig.js';

export class GroundRenderer {
    /**
     * Render the ground
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Ground} ground - Ground entity
     * @param {number} score - Current score for pattern animation
     */
    static render(ctx, ground, score) {
        // Draw ground base
        ctx.fillStyle = COLORS.GROUND;
        ctx.fillRect(0, ground.y, CANVAS_CONFIG.WIDTH, ground.height);

        // Draw ground pattern
        ctx.strokeStyle = COLORS.GROUND_PATTERN;
        ctx.lineWidth = 2;
        for (let i = 0; i < CANVAS_CONFIG.WIDTH; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i - (score % 20), ground.y);
            ctx.lineTo(i - (score % 20), ground.y + ground.height);
            ctx.stroke();
        }
    }
}
