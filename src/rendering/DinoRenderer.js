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

        // Main body (rounded rectangle) with gradient
        const bodyGradient = ctx.createLinearGradient(dino.x + 8, dino.y + 15, dino.x + 33, dino.y + 43);
        bodyGradient.addColorStop(0, COLORS.DINO_LIGHT);
        bodyGradient.addColorStop(0.5, COLORS.DINO);
        bodyGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 8, dino.y + 15, 25, 28, 5);
        ctx.fill();

        // Body shadow for depth
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.beginPath();
        ctx.ellipse(dino.x + 15, dino.y + 40, 10, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly (lighter color)
        ctx.fillStyle = COLORS.DINO_BELLY;
        ctx.beginPath();
        ctx.ellipse(dino.x + 18, dino.y + 28, 8, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail with gradient
        const tailGradient = ctx.createLinearGradient(dino.x - 8, dino.y + 15, dino.x + 8, dino.y + 30);
        tailGradient.addColorStop(0, COLORS.DINO_LIGHT);
        tailGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = tailGradient;
        ctx.beginPath();
        ctx.moveTo(dino.x + 8, dino.y + 25);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 20, dino.x - 8, dino.y + 15);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 22, dino.x + 8, dino.y + 30);
        ctx.closePath();
        ctx.fill();

        // Neck with gradient
        const neckGradient = ctx.createLinearGradient(dino.x + 25, dino.y + 8, dino.x + 35, dino.y + 23);
        neckGradient.addColorStop(0, COLORS.DINO_LIGHT);
        neckGradient.addColorStop(1, COLORS.DINO);
        ctx.fillStyle = neckGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 25, dino.y + 8, 10, 15, 3);
        ctx.fill();

        // Head with gradient
        const headGradient = ctx.createRadialGradient(dino.x + 30, dino.y + 8, 2, dino.x + 32, dino.y + 10, 10);
        headGradient.addColorStop(0, COLORS.DINO_HIGHLIGHT);
        headGradient.addColorStop(0.5, COLORS.DINO);
        headGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.ellipse(dino.x + 32, dino.y + 10, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout with gradient
        const snoutGradient = ctx.createLinearGradient(dino.x + 33, dino.y + 12, dino.x + 43, dino.y + 12);
        snoutGradient.addColorStop(0, COLORS.DINO);
        snoutGradient.addColorStop(1, COLORS.DINO_LIGHT);
        ctx.fillStyle = snoutGradient;
        ctx.beginPath();
        ctx.ellipse(dino.x + 38, dino.y + 12, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nostril detail
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.beginPath();
        ctx.arc(dino.x + 41, dino.y + 11, 1, 0, Math.PI * 2);
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

        // Eye highlight for life
        ctx.fillStyle = COLORS.DINO_EYE_HIGHLIGHT;
        ctx.beginPath();
        ctx.arc(dino.x + 34.5, dino.y + 7.5, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Back spikes with 3D effect
        const spikePositions = [12, 20, 28];
        spikePositions.forEach(pos => {
            // Spike shadow
            ctx.fillStyle = COLORS.DINO_SHADOW;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos + 1, dino.y + 15);
            ctx.lineTo(dino.x + pos + 3, dino.y + 10);
            ctx.lineTo(dino.x + pos + 7, dino.y + 15);
            ctx.closePath();
            ctx.fill();

            // Spike main
            const spikeGradient = ctx.createLinearGradient(dino.x + pos, dino.y + 15, dino.x + pos + 3, dino.y + 10);
            spikeGradient.addColorStop(0, COLORS.DINO_DARK);
            spikeGradient.addColorStop(1, COLORS.DINO_LIGHT);
            ctx.fillStyle = spikeGradient;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos, dino.y + 15);
            ctx.lineTo(dino.x + pos + 3, dino.y + 10);
            ctx.lineTo(dino.x + pos + 6, dino.y + 15);
            ctx.closePath();
            ctx.fill();

            // Spike highlight
            ctx.fillStyle = COLORS.DINO_HIGHLIGHT;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos + 2, dino.y + 14);
            ctx.lineTo(dino.x + pos + 3, dino.y + 11);
            ctx.lineTo(dino.x + pos + 3.5, dino.y + 13);
            ctx.closePath();
            ctx.fill();
        });

        // Tiny arms with gradient
        const armGradient = ctx.createLinearGradient(dino.x + 28, dino.y + 25, dino.x + 31, dino.y + 33);
        armGradient.addColorStop(0, COLORS.DINO);
        armGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = armGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 28, dino.y + 25, 3, 8, 1);
        ctx.fill();

        // Arm claws with detail
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.fillRect(dino.x + 28, dino.y + 32, 2, 2);
        ctx.fillRect(dino.x + 29, dino.y + 32, 2, 2);

        // Animated legs with proper dinosaur feet and gradients
        if (legAnimation) {
            // Front leg with gradient
            const frontLegGradient = ctx.createLinearGradient(dino.x + 20, dino.y + dino.height - 7, dino.x + 26, dino.y + dino.height + 10);
            frontLegGradient.addColorStop(0, COLORS.DINO);
            frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = frontLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 20, dino.y + dino.height - 7, 6, 17, 2);
            ctx.fill();

            // Front foot
            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 23, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg (bent back) with gradient
            const backLegGradient = ctx.createLinearGradient(dino.x + 10, dino.y + dino.height - 4, dino.x + 16, dino.y + dino.height + 10);
            backLegGradient.addColorStop(0, COLORS.DINO);
            backLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = backLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 10, dino.y + dino.height - 4, 6, 14, 2);
            ctx.fill();

            // Back foot
            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 13, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Front leg (bent back) with gradient
            const frontLegGradient = ctx.createLinearGradient(dino.x + 20, dino.y + dino.height - 4, dino.x + 26, dino.y + dino.height + 10);
            frontLegGradient.addColorStop(0, COLORS.DINO);
            frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = frontLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 20, dino.y + dino.height - 4, 6, 14, 2);
            ctx.fill();

            // Front foot
            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 23, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg with gradient
            const backLegGradient = ctx.createLinearGradient(dino.x + 10, dino.y + dino.height - 7, dino.x + 16, dino.y + dino.height + 10);
            backLegGradient.addColorStop(0, COLORS.DINO);
            backLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = backLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 10, dino.y + dino.height - 7, 6, 17, 2);
            ctx.fill();

            // Back foot
            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 13, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add toes on feet with improved detail
        ctx.fillStyle = COLORS.DINO_SHADOW;
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

        // Add subtle scale texture
        ctx.fillStyle = 'rgba(39, 174, 96, 0.15)';
        const scalePositions = [
            {x: 12, y: 20}, {x: 16, y: 22}, {x: 20, y: 20},
            {x: 24, y: 22}, {x: 12, y: 26}, {x: 16, y: 28},
            {x: 20, y: 26}, {x: 24, y: 28}, {x: 12, y: 32},
            {x: 16, y: 34}, {x: 20, y: 32}
        ];
        scalePositions.forEach(pos => {
            ctx.beginPath();
            ctx.arc(dino.x + pos.x, dino.y + pos.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
