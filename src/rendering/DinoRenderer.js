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
        const legAnimation = Math.floor(score / 5) % 2 === 0;

        // Main body (rounded rectangle)
        ctx.fillStyle = COLORS.DINO;
        ctx.beginPath();
        ctx.roundRect(dino.x + 8, dino.y + 15, 25, 28, 5);
        ctx.fill();

        // Tail
        ctx.fillStyle = COLORS.DINO;
        ctx.beginPath();
        ctx.moveTo(dino.x + 8, dino.y + 25);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 20, dino.x - 8, dino.y + 15);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 22, dino.x + 8, dino.y + 30);
        ctx.closePath();
        ctx.fill();

        // Neck
        ctx.fillStyle = COLORS.DINO;
        ctx.beginPath();
        ctx.roundRect(dino.x + 25, dino.y + 8, 10, 15, 3);
        ctx.fill();

        // Head
        ctx.fillStyle = COLORS.DINO;
        ctx.beginPath();
        ctx.ellipse(dino.x + 32, dino.y + 10, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = COLORS.DINO;
        ctx.beginPath();
        ctx.ellipse(dino.x + 38, dino.y + 12, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Mouth line
        ctx.strokeStyle = COLORS.DINO_DARK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dino.x + 34, dino.y + 14);
        ctx.lineTo(dino.x + 40, dino.y + 14);
        ctx.stroke();

        // Eye (white background)
        ctx.fillStyle = COLORS.DINO_EYE_WHITE;
        ctx.beginPath();
        ctx.arc(dino.x + 34, dino.y + 8, 3, 0, Math.PI * 2);
        ctx.fill();

        // Eye pupil
        ctx.fillStyle = COLORS.DINO_EYE_BLACK;
        ctx.beginPath();
        ctx.arc(dino.x + 35, dino.y + 8, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Back spikes
        ctx.fillStyle = COLORS.DINO_DARK;
        const spikePositions = [12, 20, 28];
        spikePositions.forEach(pos => {
            ctx.beginPath();
            ctx.moveTo(dino.x + pos, dino.y + 15);
            ctx.lineTo(dino.x + pos + 3, dino.y + 10);
            ctx.lineTo(dino.x + pos + 6, dino.y + 15);
            ctx.closePath();
            ctx.fill();
        });

        // Tiny arms
        ctx.fillStyle = COLORS.DINO_DARK;
        ctx.beginPath();
        ctx.roundRect(dino.x + 28, dino.y + 25, 3, 8, 1);
        ctx.fill();
        // Arm claws
        ctx.fillRect(dino.x + 28, dino.y + 32, 2, 2);
        ctx.fillRect(dino.x + 29, dino.y + 32, 2, 2);

        // Animated legs with proper dinosaur feet
        ctx.fillStyle = COLORS.DINO_DARK;
        if (legAnimation) {
            // Front leg
            ctx.beginPath();
            ctx.roundRect(dino.x + 20, dino.y + dino.height - 7, 6, 17, 2);
            ctx.fill();
            // Front foot
            ctx.beginPath();
            ctx.ellipse(dino.x + 23, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg (bent back)
            ctx.beginPath();
            ctx.roundRect(dino.x + 10, dino.y + dino.height - 4, 6, 14, 2);
            ctx.fill();
            // Back foot
            ctx.beginPath();
            ctx.ellipse(dino.x + 13, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Front leg (bent back)
            ctx.beginPath();
            ctx.roundRect(dino.x + 20, dino.y + dino.height - 4, 6, 14, 2);
            ctx.fill();
            // Front foot
            ctx.beginPath();
            ctx.ellipse(dino.x + 23, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg
            ctx.beginPath();
            ctx.roundRect(dino.x + 10, dino.y + dino.height - 7, 6, 17, 2);
            ctx.fill();
            // Back foot
            ctx.beginPath();
            ctx.ellipse(dino.x + 13, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add toes on feet
        ctx.fillStyle = '#1a7a3d';
        if (legAnimation) {
            // Front foot toes
            ctx.fillRect(dino.x + 20, dino.y + dino.height + 9, 1, 2);
            ctx.fillRect(dino.x + 22, dino.y + dino.height + 10, 1, 2);
            ctx.fillRect(dino.x + 24, dino.y + dino.height + 9, 1, 2);
            // Back foot toes
            ctx.fillRect(dino.x + 10, dino.y + dino.height + 9, 1, 2);
            ctx.fillRect(dino.x + 12, dino.y + dino.height + 10, 1, 2);
            ctx.fillRect(dino.x + 14, dino.y + dino.height + 9, 1, 2);
        } else {
            // Front foot toes
            ctx.fillRect(dino.x + 20, dino.y + dino.height + 9, 1, 2);
            ctx.fillRect(dino.x + 22, dino.y + dino.height + 10, 1, 2);
            ctx.fillRect(dino.x + 24, dino.y + dino.height + 9, 1, 2);
            // Back foot toes
            ctx.fillRect(dino.x + 10, dino.y + dino.height + 9, 1, 2);
            ctx.fillRect(dino.x + 12, dino.y + dino.height + 10, 1, 2);
            ctx.fillRect(dino.x + 14, dino.y + dino.height + 9, 1, 2);
        }
    }
}
