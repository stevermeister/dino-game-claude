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
        ctx.fillStyle = COLORS.OBSTACLE;
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
}
