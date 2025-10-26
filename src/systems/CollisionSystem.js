/**
 * Collision detection system
 */

export class CollisionSystem {
    /**
     * Check if two rectangles collide
     * @param {Object} rect1 - First rectangle {x, y, width, height}
     * @param {Object} rect2 - Second rectangle {x, y, width, height}
     * @returns {boolean}
     */
    static checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    /**
     * Check if dino collides with any obstacle
     * @param {Dino} dino - The dino entity
     * @param {Obstacle[]} obstacles - Array of obstacles
     * @returns {boolean}
     */
    static checkDinoObstacleCollision(dino, obstacles) {
        const dinoBounds = dino.getBounds();

        for (let obstacle of obstacles) {
            const obstacleBounds = obstacle.getBounds();
            if (this.checkCollision(dinoBounds, obstacleBounds)) {
                return true;
            }
        }

        return false;
    }
}
