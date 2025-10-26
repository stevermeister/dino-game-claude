/**
 * Renders birds with animated wings
 */
export class BirdRenderer {
    /**
     * Render a bird
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Bird} bird - Bird to render
     */
    static render(ctx, bird) {
        // Bird body (oval shape in brown)
        ctx.fillStyle = '#8B4513'; // Brown color
        ctx.beginPath();
        ctx.ellipse(bird.x + 15, bird.y + 10, 12, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Bird head (circle)
        ctx.beginPath();
        ctx.arc(bird.x + 25, bird.y + 8, 6, 0, Math.PI * 2);
        ctx.fill();

        // Beak (triangle)
        ctx.fillStyle = '#FFA500'; // Orange
        ctx.beginPath();
        ctx.moveTo(bird.x + 30, bird.y + 8);
        ctx.lineTo(bird.x + 35, bird.y + 7);
        ctx.lineTo(bird.x + 30, bird.y + 10);
        ctx.closePath();
        ctx.fill();

        // Eye (white with black pupil)
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(bird.x + 26, bird.y + 7, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(bird.x + 27, bird.y + 7, 1, 0, Math.PI * 2);
        ctx.fill();

        // Animated wings
        ctx.fillStyle = '#A0522D'; // Darker brown for wings
        if (bird.wingUp) {
            // Wings up position
            ctx.beginPath();
            ctx.ellipse(bird.x + 10, bird.y + 5, 8, 4, -Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Wings down position
            ctx.beginPath();
            ctx.ellipse(bird.x + 10, bird.y + 15, 8, 4, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Tail feathers
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(bird.x + 3, bird.y + 10);
        ctx.lineTo(bird.x, bird.y + 8);
        ctx.lineTo(bird.x, bird.y + 12);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * Render all birds
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Bird[]} birds - Array of birds
     */
    static renderAll(ctx, birds) {
        birds.forEach(bird => this.render(ctx, bird));
    }
}
