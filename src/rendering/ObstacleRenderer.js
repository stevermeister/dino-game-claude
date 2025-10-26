/**
 * Obstacle rendering module
 */
import { COLORS } from '../config/gameConfig.js';

export class ObstacleRenderer {
    /**
     * Render obstacles
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Obstacle[]} obstacles - Array of obstacles
     */
    static render(ctx, obstacles) {
        obstacles.forEach(obstacle => {
            this.drawCactus(ctx, obstacle);
        });
    }

    /**
     * Draw a detailed cactus
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Obstacle} obstacle - The obstacle to render
     */
    static drawCactus(ctx, obstacle) {
        const x = obstacle.x;
        const y = obstacle.y;
        const width = obstacle.width;
        const height = obstacle.height;

        // Cactus body
        ctx.fillStyle = '#2d6e3a';
        ctx.strokeStyle = '#1a4d2e';
        ctx.lineWidth = 1;

        // Main body with rounded top
        ctx.beginPath();
        ctx.roundRect(x + 4, y, width - 8, height, [8, 8, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Add darker shading on the right side
        ctx.fillStyle = '#1a4d2e';
        ctx.fillRect(x + width - 8, y + 8, 3, height - 8);

        // Add cactus arms based on height (taller cactus gets arms)
        if (height > 35) {
            // Left arm
            ctx.fillStyle = '#2d6e3a';
            ctx.strokeStyle = '#1a4d2e';
            ctx.beginPath();
            ctx.roundRect(x - 2, y + height * 0.4, 6, height * 0.35, [3, 0, 0, 3]);
            ctx.fill();
            ctx.stroke();

            // Left arm tip going up
            ctx.beginPath();
            ctx.roundRect(x - 2, y + height * 0.3, 6, height * 0.15, [3, 3, 0, 0]);
            ctx.fill();
            ctx.stroke();

            // Right arm
            ctx.beginPath();
            ctx.roundRect(x + width - 4, y + height * 0.5, 6, height * 0.3, [0, 3, 3, 0]);
            ctx.fill();
            ctx.stroke();

            // Right arm tip going up
            ctx.beginPath();
            ctx.roundRect(x + width - 4, y + height * 0.35, 6, height * 0.2, [3, 3, 0, 0]);
            ctx.fill();
            ctx.stroke();

            // Shading on arms
            ctx.fillStyle = '#1a4d2e';
            ctx.fillRect(x + width - 2, y + height * 0.4, 2, height * 0.4);
        }

        // Add spines/needles
        ctx.strokeStyle = '#4a8c5c';
        ctx.lineWidth = 1;
        const spineCount = Math.floor(height / 8);
        for (let i = 0; i < spineCount; i++) {
            const spineY = y + 10 + (i * (height - 10) / spineCount);
            // Left spines
            ctx.beginPath();
            ctx.moveTo(x + 5, spineY);
            ctx.lineTo(x + 2, spineY - 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + 5, spineY);
            ctx.lineTo(x + 2, spineY + 2);
            ctx.stroke();

            // Right spines
            ctx.beginPath();
            ctx.moveTo(x + width - 5, spineY);
            ctx.lineTo(x + width - 2, spineY - 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + width - 5, spineY);
            ctx.lineTo(x + width - 2, spineY + 2);
            ctx.stroke();
        }

        // Add some highlight for a 3D effect
        ctx.fillStyle = 'rgba(139, 195, 74, 0.3)';
        ctx.fillRect(x + 6, y + 4, 3, height - 8);
    }
}
