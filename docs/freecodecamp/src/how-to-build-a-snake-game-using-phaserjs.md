---
lang: en-US
title: "How to Build a Snake Game using Phaser.js"
description: "Article(s) > How to Build a Snake Game using Phaser.js"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Snake Game using Phaser.js"
    - property: og:description
      content: "How to Build a Snake Game using Phaser.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-snake-game-using-phaserjs.html
prev: /programming/js/articles/README.md
date: 2025-08-30
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756416799827/d337175f-cbf1-40d1-8228-e5f3933ba3d1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Snake Game using Phaser.js"
  desc="If you’ve ever wanted to make a small game that runs in the browser, Phaser.js is a great place to start. It’s a simple JavaScript library that helps you build interactive 2-D games that you can play in the browser. In this guide, you’ll learn what P..."
  url="https://freecodecamp.org/news/how-to-build-a-snake-game-using-phaserjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756416799827/d337175f-cbf1-40d1-8228-e5f3933ba3d1.png"/>

If you’ve ever wanted to make a small game that runs in the browser, Phaser.js is a great place to start. It’s a simple JavaScript library that helps you build interactive 2-D games that you can play in the browser.

In this guide, you’ll learn what Phaser is and then use it to build the popular Snake game. The snake moves on a grid. It eats food to grow. It dies if it hits a wall or itself. The full project fits in two files, and the code is split into small blocks so it’s easy to follow.

By the end, you’ll be able to understand and copy the code, run it, and tweak it. You’ll also learn why each part exists and how it fits into the Phaser way of doing things.

[<VPIcon icon="fas fa-globe"/>Play the game](https://manishshivanandhan.com/snake-game-with-phaser/) here to get a feel for what you’ll be building.

---

## What is Phaser.js?

[<VPIcon icon="fas fa-globe"/>Phaser](https://phaser.io/) is a free JavaScript library for 2D games. You write plain JavaScript and let Phaser do the heavy lifting. You don’t need a build system or a game engine installer. You can start with a single HTML file and one JavaScript file.

Phaser organizes code into scenes. A scene has three common steps. You load assets in `preload`, you set up images and variables in `create`, and you update your game each frame in `update`. That small loop is the core of most arcade games.

Now let’s setup the project.

---

## Project Setup

Create a folder with two files named <VPIcon icon="fa-brands fa-html5"/>`index.html` and <VPIcon icon="fa-brands fa-js"/>`main.js`. The HTML page loads Phaser from a CDN and then loads your script.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Phaser Snake</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>body { margin: 0; background: #111; }</style>
  </head>
  <body>
    <div id="game"></div>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

This page adds a container div and includes Phaser 3 from jsDelivr. Your <VPIcon icon="fa-brands fa-js"/>`main.js` file will create the game and attach it to that div.

---

## Grid, Colors, and Game Config

Snake is easiest on a grid. You choose a tile size and a number of tiles wide and high. You also define colors for the background, the snake, and the food. Then you create a Phaser game config that points to your scene functions.

```js :collapsed-lines title="main.js"
// Size of one grid tile in pixels
const TILE = 16;

// Number of tiles across (columns) and down (rows)
// Game area = 40 * 16px wide (640px) and 30 * 16px tall (480px)
const COLS = 40;                 
const ROWS = 30;

// Total pixel width and height of the game canvas
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;

// Colors for background, snake head, snake body, and food
const COLORS = {
  bg: 0x1d1d1d,   // dark gray background
  head: 0x30c452, // bright green head
  body: 0x2aa04a, // darker green body
  food: 0xe94f37, // red food
};

// Directions represented as x and y offsets on the grid
// For example, moving left means x decreases by 1, y stays the same
const DIR = {
  left:  { x: -1, y:  0, name: 'left'  },
  right: { x:  1, y:  0, name: 'right' },
  up:    { x:  0, y: -1, name: 'up'    },
  down:  { x:  0, y:  1, name: 'down'  },
};

// Phaser game configuration
// - type: Phaser will use WebGL if possible, otherwise Canvas
// - parent: attach game canvas to <div id="game">
// - width/height: set canvas size
// - backgroundColor: dark background from COLORS
// - scene: defines which functions run during preload, create, and update
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: COLORS.bg,
  scene: { preload, create, update }
};

// Create a new Phaser game with the config
new Phaser.Game(config);
```

The `config` tells Phaser to create a canvas, set its size, and use your scene functions. `Phaser.AUTO` selects WebGL if possible and falls back to Canvas.

---

## Scene State and Helper Functions

You need to store the snake’s body as grid cells, the rectangles that draw those cells, the direction of travel, the queued input, the food cell, the score, and the movement timer. A few helper functions keep the math clean.

```js :collapsed-lines title="main.js"
// Snake state
let snake;           // Array of grid cells [{x, y}, ...]; index 0 = head
let snakeRects;      // Array of Phaser rectangles drawn at snake cell positions
let direction;       // Current direction of snake movement (object from DIR)
let nextDirection;   // Next direction chosen by player input (applied on step)
let food;            // Current food cell {x, y}
let score = 0;       // Current score count
let scoreText;       // Phaser text object that displays the score
let moveEvent;       // Phaser timer event to move snake at fixed intervals
let speedMs = 130;   // Delay in milliseconds between moves (lower = faster)

// Input state
let cursors;         // Phaser helper object for arrow keys
let spaceKey;        // Phaser Key object for Space bar (restart the game)

/**
 * Convert a grid cell (x,y) to its pixel center (px,py) on the canvas.
 * Example: (0,0) -> (8,8) if TILE=16. Ensures rectangles are centered.
 */
function gridToPixelCenter(x, y) {
  return { px: x * TILE + TILE / 2, py: y * TILE + TILE / 2 };
}

/**
 * Pick a random grid cell that is not occupied by any cell in excludeCells.
 * - Creates a Set of occupied cells as "x,y" strings for fast lookup.
 * - Keeps generating random cells until it finds a free one.
 * Used to place food so it never spawns on the snake.
 */
function randomFreeCell(excludeCells) {
  const occupied = new Set(excludeCells.map(c => `${c.x},${c.y}`));
  while (true) {
    const x = Math.floor(Math.random() * COLS);
    const y = Math.floor(Math.random() * ROWS);
    if (!occupied.has(`${x},${y}`)) return { x, y };
  }
}

/**
 * Check if direction 'a' is exactly the opposite of direction 'b'.
 * Example: left vs right, or up vs down.
 * This prevents the snake from instantly turning 180° into itself.
 */
function isOpposite(a, b) {
  return a.x === -b.x && a.y === -b.y;
}
```

`gridToPixelCenter` converts a grid cell to the center point in pixels so rectangles line up. `randomFreeCell` finds a cell not used by the snake. `isOpposite` helps block instant reversals that would cause a crash.

---

## Preload and Create

This game uses simple vector rectangles, so there are no images to load. You still define the scene functions since Phaser calls them by name from your config.

```js :collapsed-lines title="main.js"
/**
 * preload()
 * Runs once before the game starts.
 * Used for loading images, sounds, and other assets.
 * In this version, we use simple colored rectangles (no assets needed).
 */
function preload() {
  // No assets to load in this version.
}

/**
 * create()
 * Runs once after preload. Sets up the game scene.
 * - Prepares keyboard input
 * - Calls initGame() to build the snake, food, score UI, and start movement
 */
function create() {
  // Phaser helper that gives us arrow key input (up, down, left, right)
  cursors = this.input.keyboard.createCursorKeys();

  // Register the Space bar key to restart the game later
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Initialize the game state (snake, food, score, timer)
  // Using call(this) so that initGame runs in the context of the scene
  initGame.call(this);
}
```

The `create` step sets up keyboard input. It then calls `initGame` to build the first snake, place food, and start the timer. The `call(this)` ensures the helper function can use the scene’s `this`.

---

## Initialize the Game

On a fresh start or a restart, you need to clear old timers and shapes, reset the score, build a short snake in the middle, draw it, place food, and start the movement loop.

```js :collapsed-lines title="main.js"
/**
 * initGame()
 * Called when the game first starts or after pressing Space to restart.
 * - Clears old state (snake, food, timers)
 * - Resets score
 * - Creates a new snake in the center of the grid
 * - Spawns the first food
 * - Sets up score text
 * - Starts the timed loop that moves the snake
 */
function initGame() {
  // If an old movement timer exists, stop it (avoid multiple timers running)
  if (moveEvent) moveEvent.remove(false);

  // If old snake rectangles exist, destroy them to clean the screen
  if (snakeRects) snakeRects.forEach(r => r.destroy());

  // Reset the score and snake direction
  score = 0;
  direction = DIR.right;     // Snake starts moving to the right
  nextDirection = DIR.right; // Player input queue also points right

  // Find the starting position near the center of the grid
  const startX = Math.floor(COLS / 2);
  const startY = Math.floor(ROWS / 2);

  // Snake starts with 3 segments, head + 2 body pieces
  snake = [
    { x: startX,     y: startY },     // head (middle)
    { x: startX - 1, y: startY },     // body segment left of head
    { x: startX - 2, y: startY },     // tail further left
  ];

  // Create rectangle objects in Phaser to visually draw the snake
  snakeRects = snake.map((cell, i) => {
    const { px, py } = gridToPixelCenter(cell.x, cell.y); // convert grid to pixel center
    const color = i === 0 ? COLORS.head : COLORS.body;    // head is a brighter green
    const rect = this.add.rectangle(px, py, TILE - 2, TILE - 2, color); // slightly smaller for spacing
    rect.setOrigin(0.5, 0.5);                             // center anchor point
    return rect;
  });

  // Spawn food at a random free cell (not overlapping snake)
  food = randomFreeCell(snake);
  const { px, py } = gridToPixelCenter(food.x, food.y);

  // If food already exists from a previous run, remove it first
  if (this.foodRect) this.foodRect.destroy();

  // Draw the new food as a red rectangle
  this.foodRect = this.add.rectangle(px, py, TILE - 2, TILE - 2, COLORS.food);

  // If score text does not exist yet, create it
  // Otherwise (on restart), just reset its value
  if (!scoreText) {
    scoreText = this.add.text(8, 6, 'Score: 0', { fontFamily: 'monospace', fontSize: 18, color: '#fff' });
    this.add.text(8, 28, 'Arrows to move. Space to restart.', { fontFamily: 'monospace', fontSize: 14, color: '#aaa' });
  } else {
    scoreText.setText('Score: 0');
  }

  // Reset speed and create a repeating timer
  // Every "speedMs" milliseconds, stepSnake() will run to move the snake
  speedMs = 130;
  moveEvent = this.time.addEvent({
    delay: speedMs,
    loop: true,
    callback: () => stepSnake.call(this) // .call(this) keeps Phaser scene context
  });

  // If a "Game Over" message exists from the last run, remove it
  if (this.gameOverText) {
    this.gameOverText.destroy();
    this.gameOverText = null;
  }
}
```

The rectangles are one or two pixels smaller than the tile so you get a neat gap between cells. The time event calls `stepSnake` on a fixed rhythm. This rhythm is separate from the frame rate, which keeps movement stable across machines.

---

## Reading Input Each Frame

You will read the arrow keys in `update`. You don’t move the snake here. You only set the next direction. Movement happens on the timer so the game has a steady pace.

```js :collapsed-lines title="main.js"
/**
 * update()
 * This runs every frame (Phaser’s game loop).
 * - Reads player input from arrow keys
 * - Updates "nextDirection" so the snake will turn on the next step
 * - Listens for Space bar press to restart the game if it’s over
 */
function update() {
  // Check if LEFT arrow is pressed AND it’s not the opposite of current direction
  if (cursors.left.isDown && !isOpposite(DIR.left, direction)) {
    nextDirection = DIR.left;

  // Check if RIGHT arrow is pressed
  } else if (cursors.right.isDown && !isOpposite(DIR.right, direction)) {
    nextDirection = DIR.right;

  // Check if UP arrow is pressed
  } else if (cursors.up.isDown && !isOpposite(DIR.up, direction)) {
    nextDirection = DIR.up;

  // Check if DOWN arrow is pressed
  } else if (cursors.down.isDown && !isOpposite(DIR.down, direction)) {
    nextDirection = DIR.down;
  }

  // If the game is over (a "Game Over" text exists)
  // AND the Space bar was just pressed → restart the game
  if (this.gameOverText && Phaser.Input.Keyboard.JustDown(spaceKey)) {
    initGame.call(this); // Reset everything (snake, food, score, timer)
  }
}
```

This pattern prevents the snake from skipping cells if the frame rate spikes. It also makes the game feel fair. Your key presses get picked up, but the body moves on the beat set by the timer.

---

## Stepping the Snake, Eating, and Drawing

This function is the heart of the game. It picks up the queued input, computes the next head cell, checks collisions, moves or grows the snake, updates the score, and refreshes colors.

```js :collapsed-lines title="main.js"
/**
 * stepSnake()
 * This function runs every "tick" (based on the timer).
 * - Moves the snake forward by one cell
 * - Checks for collisions (wall or self)
 * - Handles eating food (grow + score)
 * - Updates the snake's rectangles on the screen
 */
function stepSnake() {
  // Apply the direction chosen in update() (queued by player input)
  direction = nextDirection;

  // Get the current head of the snake
  const head = snake[0];

  // Create a new head position by moving one cell in the current direction
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  // === Collision Check #1: Wall ===
  // If the new head is outside the grid, the game ends
  if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
    return endGame.call(this);
  }

  // === Collision Check #2: Self ===
  // If the new head overlaps any snake cell, the game ends
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      return endGame.call(this);
    }
  }

  // === Check if food was eaten ===
  const ate = newHead.x === food.x && newHead.y === food.y;

  // Add the new head cell to the front of the snake array
  snake.unshift(newHead);

  if (!ate) {
    // Case: Snake did NOT eat food → keep length the same
    // Remove last cell from snake array (tail)
    snake.pop();

    // Reuse the last rectangle object for performance
    const tailRect = snakeRects.pop();
    const { px, py } = gridToPixelCenter(newHead.x, newHead.y);
    tailRect.setPosition(px, py);       // Move it to the new head position
    snakeRects.unshift(tailRect);       // Put it at the front of the rectangle list
  } else {
    // Case: Snake DID eat food → grow longer
    // Create a new rectangle for the new head (since length increases)
    const { px, py } = gridToPixelCenter(newHead.x, newHead.y);
    const headRect = this.add.rectangle(px, py, TILE - 2, TILE - 2, COLORS.head);
    snakeRects.unshift(headRect);

    // Increase score and update text
    score += 10;
    scoreText.setText(`Score: ${score}`);

    // Place new food somewhere else
    placeFood.call(this);

    // Speed up slightly as difficulty curve
    maybeSpeedUp.call(this);
  }

  // === Update Colors ===
  // Ensure only index 0 is drawn as the "head" (bright green),
  // and the next segment becomes part of the "body"
  if (snakeRects[1]) snakeRects[1].setFillStyle(COLORS.body);
  snakeRects[0].setFillStyle(COLORS.head);
}
```

The movement rule is simple. Add a head in the current direction. If you did not eat, remove the tail. If you ate, keep the tail to grow by one. To draw this, you reuse the last rectangle when you only move. You move it to the head’s new pixel location and put it at the front of the list. When you grow, you create a new rectangle for the new head.

---

## Spawning Food and Increasing Speed

After eating, you need to place food in a new free cell. You can also nudge the speed so the game gets harder over time.

```js :collapsed-lines title="main.js"
/**
 * placeFood()
 * Spawns food at a new random cell that is NOT part of the snake.
 * - Uses randomFreeCell() to avoid collisions with the snake
 * - Moves the existing red rectangle (foodRect) to the new spot
 */
function placeFood() {
  // Pick a random free cell on the grid (not occupied by the snake)
  food = randomFreeCell(snake);

  // Convert that cell into pixel coordinates
  const { px, py } = gridToPixelCenter(food.x, food.y);

  // Move the existing food rectangle to the new position
  this.foodRect.setPosition(px, py);
}

/**
 * maybeSpeedUp()
 * Makes the game a little harder each time food is eaten.
 * - Decreases the move delay (snake moves faster)
 * - Restarts the timer with the new speed
 * - Stops speeding up once a lower bound (70ms) is reached
 */
function maybeSpeedUp() {
  // Only speed up if current speed is above the minimum threshold
  if (speedMs > 70) {
    // Make the snake faster by reducing the delay
    speedMs -= 3;

    // Remove the old movement timer
    moveEvent.remove(false);

    // Create a new timer with the updated speed
    moveEvent = this.time.addEvent({
      delay: speedMs,            // shorter delay = faster movement
      loop: true,                // repeat forever until game over
      callback: () => stepSnake.call(this) // keep "this" as the scene
    });
  }
}
```

There is a lower bound for speed so the game does not become unreadable. You can tune these numbers to match the feel you want.

---

## Game Over and Restart

When the snake hits a wall or itself, the run ends. You stop the timer and show a message. Pressing space restarts the game.

```js :collapsed-lines title="main.js"
/**
 * endGame()
 * Called when the snake hits a wall or itself.
 * - Stops the movement timer (snake no longer moves)
 * - Displays a "Game Over" message with the final score
 * - Waits for the player to press Space (handled in update()) to restart
 */
function endGame() {
  // Stop the movement timer so the snake no longer steps forward
  moveEvent.remove(false);

  // Define text style for the "Game Over" message
  const style = {
    fontFamily: 'monospace',
    fontSize: 28,
    color: '#fff',
    align: 'center'
  };

  // Message shows "Game Over", final score, and restart instructions
  const msg = `Game Over\nScore: ${score}\nPress Space to Restart`;

  // Add text to the center of the screen
  // .setOrigin(0.5, 0.5) makes the text anchor at its center
  this.gameOverText = this.add.text(WIDTH / 2, HEIGHT / 2, msg, style).setOrigin(0.5, 0.5);
}
```

The `update` function you wrote earlier listens for space using `JustDown`, so the restart happens only once per key press.

---

## How the Whole Thing Fits Together

You now have the full loop of a Phaser scene. The `preload` is empty in this version because rectangles do not need assets. The `create` step connects keyboard input and calls `initGame`. The timer created in `initGame` keeps time for movement.

The `update` step reads keys every frame and sets a future direction. The `stepSnake` function runs on the timer. It moves the head, checks for a crash, handles growth, reuses shapes for performance, and updates the score. When the run ends, `endGame` stops the timer and shows a clear message. A single key press calls `initGame` to start fresh.

This style maps well to many other small games. If you can express your game state as data and move it on a schedule, you can draw it with simple shapes or sprites. Phaser’s time events give you a clean heartbeat. Its input system gives you easy key handling. Its drawing API makes it quick to show rectangles, text, or images.

---

## Useful Next Steps

There are many small features you can add without changing the core. You can store a high score in `localStorage`. You can add simple sounds when you eat or when the game ends by loading audio in `preload` and calling `this.sound.play` in the right places.

You can make the world wrap at the edges by replacing the wall check with modulo math so the snake appears on the opposite side. You can theme the game by swapping rectangle colors or replacing rectangles with images.

Each of these additions builds on the same base. Keep the grid logic simple. Keep the state in clear arrays and objects. Move on a fixed timer. Draw based on the state. That’s the pattern.

---

## Final Thoughts

You started with a blank page and ended with a working browser game. You set up Phaser, built a scene, and used a timer to drive movement. You learned how to handle input in a safe way, how to grow the snake, how to detect collisions, and how to draw with rectangles. You kept the code tidy with small helper functions and clear names.

From here, you can branch out to other grid games like Tetris or Minesweeper, or you can try a different style like Pong or Breakout. The structure will be similar. A scene to set things up, a timer or physics step to move things along, and a few rules that define the fun. That’s the beauty of Phaser for beginners.

If you’re into online gaming, [<VPIcon icon="fas fa-globe"/>GameBoost](https://gameboost.com/) is the place to be. Discover [<VPIcon icon="fas fa-globe"/>GTA Modded Accounts](https://gameboost.com/grand-theft-auto-v/accounts) packed with exclusive upgrades. You’ll also find accounts for other fan-favorite titles like Fortnite, Grow a Garden, Clash of Clans, and more - all in one trusted marketplace.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Snake Game using Phaser.js",
  "desc": "If you’ve ever wanted to make a small game that runs in the browser, Phaser.js is a great place to start. It’s a simple JavaScript library that helps you build interactive 2-D games that you can play in the browser. In this guide, you’ll learn what P...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-snake-game-using-phaserjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
