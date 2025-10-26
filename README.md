# Dino Runner Game

A modular, well-structured browser-based dinosaur runner game built with vanilla JavaScript.

## Project Structure

The game has been refactored into a modular architecture for easy maintenance and improvement of individual components:

```
dino-game-claude/
├── index.html              # Main HTML file
├── style.css               # Game styles
├── game.js                 # Entry point
└── src/
    ├── config/            # Configuration & constants
    │   └── gameConfig.js  # All game constants and settings
    │
    ├── utils/             # Utility functions
    │   ├── timeUtils.js   # Time formatting utilities
    │   ├── storageUtils.js # LocalStorage helpers
    │   └── animationUtils.js # Animation helpers
    │
    ├── entities/          # Game entities
    │   ├── Dino.js        # Dino character class
    │   ├── Obstacle.js    # Obstacle class
    │   └── Ground.js      # Ground class
    │
    ├── systems/           # Game systems
    │   ├── CollisionSystem.js  # Collision detection
    │   ├── ScoreSystem.js      # Score management
    │   ├── LevelSystem.js      # Level & difficulty
    │   └── ObstacleSystem.js   # Obstacle spawning & management
    │
    ├── rendering/         # Rendering modules
    │   ├── DinoRenderer.js     # Dino rendering
    │   ├── ObstacleRenderer.js # Obstacle rendering
    │   ├── GroundRenderer.js   # Ground rendering
    │   └── Renderer.js         # Main rendering coordinator
    │
    ├── ui/                # UI management
    │   ├── ScoreDisplay.js     # Score display updates
    │   ├── GameOverScreen.js   # Game over screen
    │   └── StartScreen.js      # Start screen
    │
    └── core/              # Core game engine
        ├── GameEngine.js   # Main game loop & coordination
        └── InputHandler.js # Input handling
```

## Architecture Benefits

### Separation of Concerns
Each module has a single, well-defined responsibility:
- **Config**: Centralized game settings
- **Utils**: Reusable utility functions
- **Entities**: Game objects with their own state
- **Systems**: Game logic and mechanics
- **Rendering**: Visual presentation layer
- **UI**: User interface management
- **Core**: Game engine coordination

### Easy to Improve
You can now improve each component independently:

- **Want better graphics?** → Modify rendering modules
- **Need new game mechanics?** → Add/modify systems
- **Want new entities?** → Create new entity classes
- **Need to tweak difficulty?** → Update config values
- **Improve UI/UX?** → Modify UI modules

### Maintainability
- Clear file organization
- Small, focused modules
- Easy to locate and fix bugs
- Simple to add new features

## How to Run

1. Open `index.html` in a modern web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## How to Play

- Press **SPACE** or **Click** to jump
- Avoid obstacles
- Score increases over time and for each obstacle passed
- Game speed increases as you progress

## Game Features

- Classic endless runner gameplay
- Jump mechanics with realistic gravity
- Progressive difficulty (speed increases with score)
- Level system with visual feedback
- Random obstacle generation
- Score tracking with local storage for high scores
- Responsive controls (keyboard and mouse)
- Clean, modern UI with animations
- Time tracking
- Game over and restart functionality

## Customization Examples

### Change Game Difficulty
Edit `src/config/gameConfig.js`:
```javascript
export const GAME_CONFIG = {
    INITIAL_SPEED: 5,        // Change starting speed
    SPEED_INCREMENT_FACTOR: 0.5, // Adjust difficulty curve
    // ...
};
```

### Modify Dino Appearance
Edit `src/rendering/DinoRenderer.js`:
```javascript
// Change colors, sizes, or add new visual elements
```

### Add New Game Mechanics
Create a new system in `src/systems/`:
```javascript
// Example: PowerUpSystem.js
export class PowerUpSystem {
    // Your new game mechanic
}
```

### Change Colors
Edit `src/config/gameConfig.js`:
```javascript
export const COLORS = {
    DINO: '#2ecc71',        // Change dino color
    OBSTACLE: '#e74c3c',    // Change obstacle color
    // ...
};
```

## Development

The game uses ES6 modules, so it requires a modern browser that supports:
- ES6 Classes
- ES6 Modules (import/export)
- Canvas API
- LocalStorage

## Browser Compatibility

Works on all modern browsers that support HTML5 Canvas and ES6 modules:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT License

## Credits

Built with Claude Code
