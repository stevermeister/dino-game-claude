/**
 * Game configuration and constants
 */

export const CANVAS_CONFIG = {
    WIDTH: 800,
    HEIGHT: 200
};

export const DINO_CONFIG = {
    X: 50,
    Y: 150,
    WIDTH: 40,
    HEIGHT: 50,
    JUMP_POWER: -12,
    GRAVITY: 0.6
};

export const GROUND_CONFIG = {
    Y: 180,
    HEIGHT: 20
};

export const OBSTACLE_CONFIG = {
    WIDTH: 20,
    MIN_HEIGHT: 30,
    MAX_HEIGHT: 50,
    INITIAL_INTERVAL: 100,
    MIN_INTERVAL: 50
};

export const GAME_CONFIG = {
    INITIAL_SPEED: 5,
    SPEED_INCREMENT_FACTOR: 0.5,
    SCORE_INCREMENT: 0.1,
    SCORE_PER_OBSTACLE: 10,
    SCORE_FOR_SPEED_UP: 100
};

export const COLORS = {
    DINO: '#2ecc71',
    DINO_DARK: '#27ae60',
    DINO_LIGHT: '#48e68a',
    DINO_BELLY: '#a8e6c1',
    DINO_HIGHLIGHT: '#5ef59f',
    DINO_SHADOW: '#1e8449',
    DINO_EYE_WHITE: 'white',
    DINO_EYE_BLACK: 'black',
    DINO_EYE_HIGHLIGHT: 'rgba(255, 255, 255, 0.6)',
    OBSTACLE: '#e74c3c',
    GROUND: '#333',
    GROUND_PATTERN: '#555',
    CANVAS_BG: '#f7f7f7'
};

export const STORAGE_KEYS = {
    HIGH_SCORE: 'dinoHighScore'
};
