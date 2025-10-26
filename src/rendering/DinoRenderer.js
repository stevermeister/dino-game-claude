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
        // If dino is ducking, render ducking pose
        if (dino.isDucking) {
            this.renderDucking(ctx, dino, score);
        } else if (dino.isJumping) {
            this.renderJumping(ctx, dino, score);
        } else {
            this.renderRunning(ctx, dino, score);
        }
    }

    /**
     * Render dino in running pose
     */
    static renderRunning(ctx, dino, score) {
        // Smoother leg animation with 4 states
        const legAnimationState = Math.floor(score / 3) % 4;

        // Tail sway based on running animation
        const tailSway = Math.sin(score * 0.3) * 2;

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

        // Tail with gradient and dynamic sway
        const tailGradient = ctx.createLinearGradient(dino.x - 8, dino.y + 15, dino.x + 8, dino.y + 30);
        tailGradient.addColorStop(0, COLORS.DINO_LIGHT);
        tailGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = tailGradient;
        ctx.beginPath();
        ctx.moveTo(dino.x + 8, dino.y + 25);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 20 + tailSway, dino.x - 8, dino.y + 15 + tailSway);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 22 + tailSway, dino.x + 8, dino.y + 30);
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

        // Eye with blinking
        if (dino.isBlinking) {
            // Draw closed eye
            ctx.strokeStyle = COLORS.DINO_EYE_BLACK;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(dino.x + 31, dino.y + 8);
            ctx.lineTo(dino.x + 37, dino.y + 8);
            ctx.stroke();
        } else {
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
        }

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

        // Smooth 4-state leg animation
        this.renderLegs(ctx, dino, legAnimationState);

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

    /**
     * Render smooth leg animation
     */
    static renderLegs(ctx, dino, state) {
        // Front and back leg positions vary based on state for smoother animation
        const legConfigs = [
            { frontHeight: 17, backHeight: 14, frontY: -7, backY: -4 },  // State 0
            { frontHeight: 14, backHeight: 17, frontY: -4, backY: -7 },  // State 1
            { frontHeight: 15, backHeight: 15, frontY: -5, backY: -5 },  // State 2
            { frontHeight: 16, backHeight: 13, frontY: -6, backY: -3 }   // State 3
        ];

        const config = legConfigs[state];

        // Front leg with gradient
        const frontLegGradient = ctx.createLinearGradient(dino.x + 20, dino.y + dino.height + config.frontY, dino.x + 26, dino.y + dino.height + 10);
        frontLegGradient.addColorStop(0, COLORS.DINO);
        frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = frontLegGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 20, dino.y + dino.height + config.frontY, 6, config.frontHeight, 2);
        ctx.fill();

        // Front foot
        ctx.fillStyle = COLORS.DINO_DARK;
        ctx.beginPath();
        ctx.ellipse(dino.x + 23, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Back leg with gradient
        const backLegGradient = ctx.createLinearGradient(dino.x + 10, dino.y + dino.height + config.backY, dino.x + 16, dino.y + dino.height + 10);
        backLegGradient.addColorStop(0, COLORS.DINO);
        backLegGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = backLegGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 10, dino.y + dino.height + config.backY, 6, config.backHeight, 2);
        ctx.fill();

        // Back foot
        ctx.fillStyle = COLORS.DINO_DARK;
        ctx.beginPath();
        ctx.ellipse(dino.x + 13, dino.y + dino.height + 9, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add toes on feet
        ctx.fillStyle = COLORS.DINO_SHADOW;
        // Front foot toes
        ctx.fillRect(dino.x + 20, dino.y + dino.height + 9, 1, 2);
        ctx.fillRect(dino.x + 22, dino.y + dino.height + 10, 1, 2);
        ctx.fillRect(dino.x + 24, dino.y + dino.height + 9, 1, 2);
        // Back foot toes
        ctx.fillRect(dino.x + 10, dino.y + dino.height + 9, 1, 2);
        ctx.fillRect(dino.x + 12, dino.y + dino.height + 10, 1, 2);
        ctx.fillRect(dino.x + 14, dino.y + dino.height + 9, 1, 2);
    }

    /**
     * Render dino in jumping pose
     */
    static renderJumping(ctx, dino, score) {
        // Tail up during jump for dynamic pose
        const tailUpOffset = -5;

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

        // Tail with gradient - pointing up during jump
        const tailGradient = ctx.createLinearGradient(dino.x - 8, dino.y + 15, dino.x + 8, dino.y + 30);
        tailGradient.addColorStop(0, COLORS.DINO_LIGHT);
        tailGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = tailGradient;
        ctx.beginPath();
        ctx.moveTo(dino.x + 8, dino.y + 25);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 15 + tailUpOffset, dino.x - 8, dino.y + 10 + tailUpOffset);
        ctx.quadraticCurveTo(dino.x - 5, dino.y + 17 + tailUpOffset, dino.x + 8, dino.y + 28);
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

        // Mouth line - slightly open during jump (excited!)
        ctx.strokeStyle = COLORS.DINO_DARK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dino.x + 34, dino.y + 14);
        ctx.quadraticCurveTo(dino.x + 37, dino.y + 15, dino.x + 40, dino.y + 14);
        ctx.stroke();

        // Eye - wide open during jump (no blinking)
        ctx.fillStyle = COLORS.DINO_EYE_WHITE;
        ctx.beginPath();
        ctx.arc(dino.x + 34, dino.y + 8, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye pupil - slightly larger
        ctx.fillStyle = COLORS.DINO_EYE_BLACK;
        ctx.beginPath();
        ctx.arc(dino.x + 35, dino.y + 8, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Eye highlight
        ctx.fillStyle = COLORS.DINO_EYE_HIGHLIGHT;
        ctx.beginPath();
        ctx.arc(dino.x + 34.5, dino.y + 7.5, 1, 0, Math.PI * 2);
        ctx.fill();

        // Back spikes
        const spikePositions = [12, 20, 28];
        spikePositions.forEach(pos => {
            ctx.fillStyle = COLORS.DINO_SHADOW;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos + 1, dino.y + 15);
            ctx.lineTo(dino.x + pos + 3, dino.y + 10);
            ctx.lineTo(dino.x + pos + 7, dino.y + 15);
            ctx.closePath();
            ctx.fill();

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

            ctx.fillStyle = COLORS.DINO_HIGHLIGHT;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos + 2, dino.y + 14);
            ctx.lineTo(dino.x + pos + 3, dino.y + 11);
            ctx.lineTo(dino.x + pos + 3.5, dino.y + 13);
            ctx.closePath();
            ctx.fill();
        });

        // Arms
        const armGradient = ctx.createLinearGradient(dino.x + 28, dino.y + 25, dino.x + 31, dino.y + 33);
        armGradient.addColorStop(0, COLORS.DINO);
        armGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = armGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 28, dino.y + 25, 3, 8, 1);
        ctx.fill();

        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.fillRect(dino.x + 28, dino.y + 32, 2, 2);
        ctx.fillRect(dino.x + 29, dino.y + 32, 2, 2);

        // Legs tucked up during jump
        // Front leg
        const frontLegGradient = ctx.createLinearGradient(dino.x + 20, dino.y + dino.height - 12, dino.x + 26, dino.y + dino.height);
        frontLegGradient.addColorStop(0, COLORS.DINO);
        frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = frontLegGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 20, dino.y + dino.height - 12, 6, 12, 2);
        ctx.fill();

        // Front foot
        ctx.fillStyle = COLORS.DINO_DARK;
        ctx.beginPath();
        ctx.ellipse(dino.x + 23, dino.y + dino.height - 1, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Back leg
        const backLegGradient = ctx.createLinearGradient(dino.x + 10, dino.y + dino.height - 10, dino.x + 16, dino.y + dino.height);
        backLegGradient.addColorStop(0, COLORS.DINO);
        backLegGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = backLegGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 10, dino.y + dino.height - 10, 6, 10, 2);
        ctx.fill();

        // Back foot
        ctx.fillStyle = COLORS.DINO_DARK;
        ctx.beginPath();
        ctx.ellipse(dino.x + 13, dino.y + dino.height - 1, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Toes
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.fillRect(dino.x + 20, dino.y + dino.height - 1, 1, 2);
        ctx.fillRect(dino.x + 22, dino.y + dino.height, 1, 2);
        ctx.fillRect(dino.x + 24, dino.y + dino.height - 1, 1, 2);
        ctx.fillRect(dino.x + 10, dino.y + dino.height - 1, 1, 2);
        ctx.fillRect(dino.x + 12, dino.y + dino.height, 1, 2);
        ctx.fillRect(dino.x + 14, dino.y + dino.height - 1, 1, 2);

        // Scales
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

    /**
     * Render dino in ducking pose
     */
    static renderDucking(ctx, dino, score) {
        const legAnimation = Math.floor(score / 3) % 2 === 0;

        // Adjusted positions for ducking pose
        const duckOffsetY = 20; // How much lower the body sits

        // Compressed body (more horizontal)
        const bodyGradient = ctx.createLinearGradient(dino.x + 8, dino.y + 25, dino.x + 38, dino.y + 40);
        bodyGradient.addColorStop(0, COLORS.DINO_LIGHT);
        bodyGradient.addColorStop(0.5, COLORS.DINO);
        bodyGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 8, dino.y + 25, 30, 18, 4);
        ctx.fill();

        // Body shadow
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.beginPath();
        ctx.ellipse(dino.x + 20, dino.y + 42, 12, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly
        ctx.fillStyle = COLORS.DINO_BELLY;
        ctx.beginPath();
        ctx.ellipse(dino.x + 20, dino.y + 32, 10, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail extending back (horizontal)
        const tailGradient = ctx.createLinearGradient(dino.x - 10, dino.y + 28, dino.x + 8, dino.y + 32);
        tailGradient.addColorStop(0, COLORS.DINO_LIGHT);
        tailGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = tailGradient;
        ctx.beginPath();
        ctx.moveTo(dino.x + 8, dino.y + 28);
        ctx.quadraticCurveTo(dino.x - 8, dino.y + 26, dino.x - 12, dino.y + 28);
        ctx.quadraticCurveTo(dino.x - 8, dino.y + 30, dino.x + 8, dino.y + 32);
        ctx.closePath();
        ctx.fill();

        // Neck (lowered)
        const neckGradient = ctx.createLinearGradient(dino.x + 30, dino.y + 20, dino.x + 36, dino.y + 28);
        neckGradient.addColorStop(0, COLORS.DINO_LIGHT);
        neckGradient.addColorStop(1, COLORS.DINO);
        ctx.fillStyle = neckGradient;
        ctx.beginPath();
        ctx.roundRect(dino.x + 30, dino.y + 20, 8, 10, 2);
        ctx.fill();

        // Head (lower position)
        const headGradient = ctx.createRadialGradient(dino.x + 32, dino.y + 18, 2, dino.x + 34, dino.y + 20, 8);
        headGradient.addColorStop(0, COLORS.DINO_HIGHLIGHT);
        headGradient.addColorStop(0.5, COLORS.DINO);
        headGradient.addColorStop(1, COLORS.DINO_DARK);
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.ellipse(dino.x + 34, dino.y + 20, 7, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        const snoutGradient = ctx.createLinearGradient(dino.x + 35, dino.y + 22, dino.x + 43, dino.y + 22);
        snoutGradient.addColorStop(0, COLORS.DINO);
        snoutGradient.addColorStop(1, COLORS.DINO_LIGHT);
        ctx.fillStyle = snoutGradient;
        ctx.beginPath();
        ctx.ellipse(dino.x + 39, dino.y + 22, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nostril
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.beginPath();
        ctx.arc(dino.x + 41, dino.y + 21, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Mouth
        ctx.strokeStyle = COLORS.DINO_DARK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dino.x + 36, dino.y + 24);
        ctx.lineTo(dino.x + 41, dino.y + 24);
        ctx.stroke();

        // Eye (focused, no blinking while ducking)
        ctx.fillStyle = COLORS.DINO_EYE_WHITE;
        ctx.beginPath();
        ctx.arc(dino.x + 36, dino.y + 18, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.DINO_EYE_BLACK;
        ctx.beginPath();
        ctx.arc(dino.x + 36.5, dino.y + 18, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.DINO_EYE_HIGHLIGHT;
        ctx.beginPath();
        ctx.arc(dino.x + 36.2, dino.y + 17.7, 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Back spikes (fewer visible when ducking)
        const spikePositions = [14, 24, 34];
        spikePositions.forEach(pos => {
            ctx.fillStyle = COLORS.DINO_SHADOW;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos + 1, dino.y + 25);
            ctx.lineTo(dino.x + pos + 2, dino.y + 22);
            ctx.lineTo(dino.x + pos + 5, dino.y + 25);
            ctx.closePath();
            ctx.fill();

            const spikeGradient = ctx.createLinearGradient(dino.x + pos, dino.y + 25, dino.x + pos + 2, dino.y + 22);
            spikeGradient.addColorStop(0, COLORS.DINO_DARK);
            spikeGradient.addColorStop(1, COLORS.DINO_LIGHT);
            ctx.fillStyle = spikeGradient;
            ctx.beginPath();
            ctx.moveTo(dino.x + pos, dino.y + 25);
            ctx.lineTo(dino.x + pos + 2, dino.y + 22);
            ctx.lineTo(dino.x + pos + 4, dino.y + 25);
            ctx.closePath();
            ctx.fill();
        });

        // Arms (not visible or very small when ducking)

        // Legs in running position (still moving while ducking)
        if (legAnimation) {
            // Front leg
            const frontLegGradient = ctx.createLinearGradient(dino.x + 24, dino.y + 38, dino.x + 28, dino.y + 50);
            frontLegGradient.addColorStop(0, COLORS.DINO);
            frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = frontLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 24, dino.y + 38, 4, 12, 2);
            ctx.fill();

            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 26, dino.y + 49, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg
            const backLegGradient = ctx.createLinearGradient(dino.x + 14, dino.y + 40, dino.x + 18, dino.y + 50);
            backLegGradient.addColorStop(0, COLORS.DINO);
            backLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = backLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 14, dino.y + 40, 4, 10, 2);
            ctx.fill();

            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 16, dino.y + 49, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Front leg
            const frontLegGradient = ctx.createLinearGradient(dino.x + 24, dino.y + 40, dino.x + 28, dino.y + 50);
            frontLegGradient.addColorStop(0, COLORS.DINO);
            frontLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = frontLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 24, dino.y + 40, 4, 10, 2);
            ctx.fill();

            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 26, dino.y + 49, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Back leg
            const backLegGradient = ctx.createLinearGradient(dino.x + 14, dino.y + 38, dino.x + 18, dino.y + 50);
            backLegGradient.addColorStop(0, COLORS.DINO);
            backLegGradient.addColorStop(1, COLORS.DINO_DARK);
            ctx.fillStyle = backLegGradient;
            ctx.beginPath();
            ctx.roundRect(dino.x + 14, dino.y + 38, 4, 12, 2);
            ctx.fill();

            ctx.fillStyle = COLORS.DINO_DARK;
            ctx.beginPath();
            ctx.ellipse(dino.x + 16, dino.y + 49, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Toes
        ctx.fillStyle = COLORS.DINO_SHADOW;
        ctx.fillRect(dino.x + 24, dino.y + 49, 1, 1.5);
        ctx.fillRect(dino.x + 26, dino.y + 49.5, 1, 1.5);
        ctx.fillRect(dino.x + 28, dino.y + 49, 1, 1.5);
        ctx.fillRect(dino.x + 14, dino.y + 49, 1, 1.5);
        ctx.fillRect(dino.x + 16, dino.y + 49.5, 1, 1.5);
        ctx.fillRect(dino.x + 18, dino.y + 49, 1, 1.5);

        // Scales
        ctx.fillStyle = 'rgba(39, 174, 96, 0.15)';
        const scalePositions = [
            {x: 12, y: 30}, {x: 16, y: 32}, {x: 20, y: 30},
            {x: 24, y: 32}, {x: 28, y: 30}, {x: 32, y: 32}
        ];
        scalePositions.forEach(pos => {
            ctx.beginPath();
            ctx.arc(dino.x + pos.x, dino.y + pos.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
