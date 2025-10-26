// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let gameStarted = false;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem('dinoHighScore') || 0;
let animationId;
let startTime = 0;
let elapsedTime = 0;
let level = 1;
let previousLevel = 1;

// Game speed
let gameSpeed = 5;
let speedIncrement = 0;

// Dino properties
const dino = {
    x: 50,
    y: 150,
    width: 40,
    height: 50,
    dy: 0,
    jumpPower: -12,
    gravity: 0.6,
    isJumping: false
};

// Obstacle array
let obstacles = [];
let obstacleTimer = 0;
let obstacleInterval = 100;

// Ground properties
const ground = {
    y: 180,
    height: 20
};

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Trigger pulse animation on an element
function triggerPulse(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('pulse');
    // Force reflow to restart animation
    void element.offsetWidth;
    element.classList.add('pulse');
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('score').textContent = Math.floor(score);
    document.getElementById('high-score').textContent = Math.floor(highScore);
    document.getElementById('level').textContent = level;
    document.getElementById('speed').textContent = `${gameSpeed.toFixed(1)}x`;
    document.getElementById('time').textContent = formatTime(elapsedTime);
}

// Draw dino
function drawDino() {
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Dino eye
    ctx.fillStyle = 'white';
    ctx.fillRect(dino.x + 25, dino.y + 10, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(dino.x + 28, dino.y + 13, 3, 3);

    // Dino legs
    ctx.fillStyle = '#27ae60';
    if (Math.floor(score / 10) % 2 === 0) {
        ctx.fillRect(dino.x + 5, dino.y + dino.height, 8, 10);
        ctx.fillRect(dino.x + 27, dino.y + dino.height, 8, 10);
    } else {
        ctx.fillRect(dino.x + 10, dino.y + dino.height, 8, 10);
        ctx.fillRect(dino.x + 22, dino.y + dino.height, 8, 10);
    }
}

// Draw ground
function drawGround() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, ground.y, canvas.width, ground.height);

    // Ground pattern
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i - (score % 20), ground.y);
        ctx.lineTo(i - (score % 20), ground.y + ground.height);
        ctx.stroke();
    }
}

// Create obstacle
function createObstacle() {
    const height = Math.random() > 0.5 ? 30 : 50;
    const obstacle = {
        x: canvas.width,
        y: ground.y - height,
        width: 20,
        height: height
    };
    obstacles.push(obstacle);
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = '#e74c3c';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Update obstacles
function updateObstacles() {
    obstacleTimer++;

    if (obstacleTimer > obstacleInterval) {
        createObstacle();
        obstacleTimer = 0;
        obstacleInterval = Math.max(50, 100 - speedIncrement);
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameSpeed;

        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score += 10;

            // Pulse animation for score
            triggerPulse('score-box');

            // Update high score
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('dinoHighScore', highScore);
                triggerPulse('high-score-box');
            }
        }
    });
}

// Check collision
function checkCollision() {
    for (let obstacle of obstacles) {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            return true;
        }
    }
    return false;
}

// Update dino
function updateDino() {
    // Apply gravity
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    // Ground collision
    if (dino.y + dino.height >= ground.y) {
        dino.y = ground.y - dino.height;
        dino.dy = 0;
        dino.isJumping = false;
    }
}

// Jump function
function jump() {
    if (!dino.isJumping && dino.y >= ground.y - dino.height) {
        dino.dy = dino.jumpPower;
        dino.isJumping = true;
    }
}

// Start game
function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    obstacles = [];
    obstacleTimer = 0;
    gameSpeed = 5;
    speedIncrement = 0;
    level = 1;
    previousLevel = 1;
    startTime = Date.now();
    elapsedTime = 0;
    dino.y = ground.y - dino.height;
    dino.dy = 0;
    dino.isJumping = false;

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

    gameLoop();
}

// End game
function endGame() {
    gameOver = true;
    gameStarted = false;

    document.getElementById('final-score').textContent = Math.floor(score);
    document.getElementById('final-high-score').textContent = Math.floor(highScore);
    document.getElementById('game-over').classList.remove('hidden');

    cancelAnimationFrame(animationId);
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawGround();
    drawDino();
    drawObstacles();

    // Update game elements
    updateDino();
    updateObstacles();

    // Update elapsed time
    elapsedTime = (Date.now() - startTime) / 1000;

    // Increase difficulty
    speedIncrement = Math.floor(score / 100);
    gameSpeed = 5 + speedIncrement * 0.5;
    level = Math.floor(speedIncrement) + 1;

    // Check for level up
    if (level > previousLevel) {
        previousLevel = level;
        triggerPulse('level');
    }

    // Update score
    score += 0.1;
    updateScoreDisplay();

    // Check collision
    if (checkCollision()) {
        endGame();
        return;
    }

    // Continue game loop
    animationId = requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameStarted && !gameOver) {
            startGame();
        } else if (gameOver) {
            startGame();
        } else {
            jump();
        }
    }
});

canvas.addEventListener('click', () => {
    if (!gameStarted && !gameOver) {
        startGame();
    } else if (gameOver) {
        startGame();
    } else {
        jump();
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    startGame();
});

// Initialize display
updateScoreDisplay();
