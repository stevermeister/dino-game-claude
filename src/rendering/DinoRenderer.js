/**
 * Dino rendering module
 */
import { COLORS } from '../config/gameConfig.js';

export class DinoRenderer {
    /**
     * Render the dino
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Dino} dino - Dino entity
     * @param {number} score - Current score for animation
     */
    static render(ctx, dino, score) {
        // Draw body
        ctx.fillStyle = COLORS.DINO;
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

        // Draw eye
        ctx.fillStyle = COLORS.DINO_EYE_WHITE;
        ctx.fillRect(dino.x + 25, dino.y + 10, 8, 8);
        ctx.fillStyle = COLORS.DINO_EYE_BLACK;
        ctx.fillRect(dino.x + 28, dino.y + 13, 3, 3);

        // Draw animated legs
        ctx.fillStyle = COLORS.DINO_DARK;
        if (Math.floor(score / 10) % 2 === 0) {
            ctx.fillRect(dino.x + 5, dino.y + dino.height, 8, 10);
            ctx.fillRect(dino.x + 27, dino.y + dino.height, 8, 10);
        } else {
            ctx.fillRect(dino.x + 10, dino.y + dino.height, 8, 10);
            ctx.fillRect(dino.x + 22, dino.y + dino.height, 8, 10);
        }
    }
}
