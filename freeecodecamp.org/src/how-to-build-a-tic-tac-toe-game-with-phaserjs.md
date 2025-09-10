---
lang: en-US
title: "How to Build a Tic Tac Toe Game with Phaser.js"
description: "Article(s) > How to Build a Tic Tac Toe Game with Phaser.js"
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
      content: "Article(s) > How to Build a Tic Tac Toe Game with Phaser.js"
    - property: og:description
      content: "How to Build a Tic Tac Toe Game with Phaser.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-tic-tac-toe-game-with-phaserjs.html
prev: /programming/js/articles/README.md
date: 2025-08-21
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755720429987/ba7670ba-12b0-4c0a-a09b-80936ba1a023.png
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
  name="How to Build a Tic Tac Toe Game with Phaser.js"
  desc="Tic-Tac-Toe is a great project for beginners who want to learn how to build games. It’s simple to understand but gives you the chance to learn about game state, player turns, winning logic, and user input. In this tutorial, you’ll learn how to build ..."
  url="https://freecodecamp.org/news/how-to-build-a-tic-tac-toe-game-with-phaserjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755720429987/ba7670ba-12b0-4c0a-a09b-80936ba1a023.png"/>

Tic-Tac-Toe is a great project for beginners who want to learn how to build games. It’s simple to understand but gives you the chance to learn about game state, player turns, winning logic, and user input.

In this tutorial, you’ll learn how to build tic-tac-toe using [<VPIcon icon="fas fa-globe"/>Phaser.js](https://phaser.io/), a fast, fun, and open source framework for making 2D games in the browser.

If you’re new to Phaser.js, don’t worry. We’ll walk through everything step-by-step. By the end, you’ll have a working game that you can play, share, or build upon.

You can <VPIcon icon="fas fa-globe"/>[play the game here](https://manishshivanandhan.com/phaser-tic-tac-toe) to get a feel of what you are going to build.

---

## What is Phaser.js?

Phaser.js is a free and open-source JavaScript game framework. It helps developers create HTML5 games that work across web browsers. Phaser handles things like rendering graphics, detecting input, and running the game loop.

You can use Phaser to make simple games like Pong and Tic-Tac-Toe or advanced platformers and role playing games. It supports both Canvas and WebGL rendering, so your games will run smoothly on most devices.

---

## Project Setup

Create a folder for your project and add two files: <VPIcon icon="fa-brands fa-html5"/>`index.html` and <VPIcon icon="fa-brands fa-js"/>`game.js`. The HTML file loads Phaser and the JavaScript file contains the game logic. [Here is the repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/phaser-tic-tac-toe`)](https://github.com/manishmshiva/phaser-tic-tac-toe) with the finished code.

Here’s what the <VPIcon icon="fa-brands fa-html5"/>`index.html` file should look like:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Tic Tac Toe — Phaser 3</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body { height: 100%; margin: 0; background: #0f172a; display: grid; place-items: center; }
    #game { box-shadow: 0 10px 30px rgba(0,0,0,.35); border-radius: 12px; overflow: hidden; }
    .hint { color: #e2e8f0; margin-top: 10px; font-size: 14px; text-align: center; opacity: .85; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
</head>
<body>
  <div id="game"></div>
  <div class="hint">Click a cell to play. Tap “Restart” to start over.</div>
  <script src="./game.js"></script>
</body>
</html>
```

This sets up a simple HTML page, loads Phaser from a CDN, and points to your <VPIcon icon="fa-brands fa-js"/>`game.js` file. The `#game` container is where Phaser will insert the game canvas.

---

## How to Set Up the Game Configuration

Phaser games are built from a configuration object that defines things like width, height, background color, and which functions to call for loading, creating, and updating the game.

```js title="game.js"
(() => {
  const GRID = 3;
  const CELL = 120;
  const BOARD = GRID * CELL;
  const HUD = 72;
  const WIDTH = BOARD;
  const HEIGHT = BOARD + HUD;

  let scene;
  let board;
  let currentPlayer;
  let gameOver;

  let gridGfx;
  let overlayGfx;
  let marks = [];
  let statusText;
  let restartText;

  const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "#ffffff",
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: { preload, create, update }
  };

  new Phaser.Game(config);
  // ...
})
```

We start by defining constants for the grid size and cell size. The `config` object tells Phaser to create a game with these dimensions and use the `preload`, `create`, and `update` functions we will define.

---

## How to Preload Assets

Since we are drawing everything with Phaser’s graphics and text tools, we do not need to load any external images or sounds.

```js title="game.js"
function preload() {
  // No assets to load
}
```

This is a placeholder that lets Phaser call `preload` before the game starts.

---

## How to Create the Game Scene

The `create` function runs once at the start of the scene. Here we draw the grid, set up the initial state, and add UI elements.

```js title="game.js"
function create() {
  scene = this;

  gridGfx = scene.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });
  overlayGfx = scene.add.graphics();
  drawGrid();

  initGame();

  statusText = scene.add.text(WIDTH / 2, BOARD + 12, "Player X's turn", {
    fontSize: "20px",
    color: "#111",
    fontFamily: "Arial, Helvetica, sans-serif"
  }).setOrigin(0.5, 0);

  restartText = scene.add.text(WIDTH / 2, BOARD + 38, "Restart", {
    fontSize: "18px",
    color: "#2563eb",
    fontFamily: "Arial, Helvetica, sans-serif"
  }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });

  restartText.on("pointerup", hardReset);

  scene.input.on("pointerdown", onPointerDown, scene);
}
```

We created two `Graphics` objects: one for the static grid and another for the win line. Then we called `drawGrid()` and `initGame()` to set up the game board. The status text and restart button are placed below the grid. We also listened for clicks on the board with `pointerdown`.

---

## How to Draw the Grid

The grid is made up of two vertical and two horizontal lines.

```js title="game.js"
function drawGrid() {
  gridGfx.strokeLineShape(new Phaser.Geom.Line(CELL, 0, CELL, BOARD));
  gridGfx.strokeLineShape(new Phaser.Geom.Line(CELL * 2, 0, CELL * 2, BOARD));
  gridGfx.strokeLineShape(new Phaser.Geom.Line(0, CELL, BOARD, CELL));
  gridGfx.strokeLineShape(new Phaser.Geom.Line(0, CELL * 2, BOARD, CELL * 2));
}
```

We use `Phaser.Geom.Line` to define the start and end points for each line and then draw them with `strokeLineShape`.

---

## How to Initialize and Reset the Game

The `initGame` function sets up a new game, and `hardReset` is called when the restart button is clicked.

```js title="game.js"
  function initGame() {
    board = Array.from({ length: GRID }, () => Array(GRID).fill(""));
    currentPlayer = "X";
    gameOver = false;
    overlayGfx.clear();
    for (const t of marks) t.destroy();
    marks = [];
    setStatus("Player X's turn");
  }

  function hardReset() {
    initGame();
  }

  function setStatus(msg) {
    statusText && statusText.setText(msg);
  }
```

The board is represented by a 2D array filled with empty strings. The current player starts as X, and the `marks` array keeps track of text objects so we can clear them on reset.

---

## How to Handle Player Input

When the player clicks a cell, we determine its row and column and check if the move is valid.

```js title="game.js"
function onPointerDown(pointer) {
  if (gameOver) return;
  if (pointer.y > BOARD) return;

  const col = Math.floor(pointer.x / CELL);
  const row = Math.floor(pointer.y / CELL);
  if (!inBounds(row, col)) return;
  if (board[row][col] !== "") return;

  placeMark(row, col, currentPlayer);

  const win = checkWin(board);
  if (win) {
    gameOver = true;
    drawWinLine(win);
    setStatus(`Player ${currentPlayer} wins!`);
    return;
  }

  if (isFull(board)) {
    gameOver = true;
    setStatus("Draw! No more moves.");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(`Player ${currentPlayer}'s turn`);
}
```

This ensures that we only act if the game is not over, the click is inside the board, and the chosen cell is empty. After placing a mark, we check for a win or draw before switching turns.

---

## How to Place Marks on the Board

We display an X or O at the center of the clicked cell.

```js title="game.js"
function inBounds(r, c) {
  return r >= 0 && r < GRID && c >= 0 && c < GRID;
}

function placeMark(row, col, player) {
  board[row][col] = player;
  const cx = col * CELL + CELL / 2;
  const cy = row * CELL + CELL / 2;
  const t = scene.add.text(cx, cy, player, {
    fontSize: Math.floor(CELL * 0.66) + "px",
    color: "#111111",
    fontFamily: "Arial, Helvetica, sans-serif"
  }).setOrigin(0.5);
  marks.push(t);
}
```

The coordinates are calculated so the text is centered in the cell. We store the text object in the `marks` array so it can be removed when resetting.

---

## How to Check for a Winner

We check rows, columns, and diagonals to see if the current player has three in a row.

```js title="game.js"
function checkWin(b) {
  for (let r = 0; r < GRID; r++) {
    if (b[r][0] && b[r][0] === b[r][1] && b[r][1] === b[r][2]) {
      return { kind: "row", index: r };
    }
  }
  for (let c = 0; c < GRID; c++) {
    if (b[0][c] && b[0][c] === b[1][c] && b[1][c] === b[2][c]) {
      return { kind: "col", index: c };
    }
  }
  if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    return { kind: "diag" };
  }
  if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    return { kind: "anti" };
  }
  return null;
}
```

If a win is found, we return an object describing the winning line so it can be drawn.

---

## How to Detect a Draw

If every cell is filled and there is no winner, the game ends in a draw.

```js title="game.js"
function isFull(b) {
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (b[r][c] === "") return false;
    }
  }
  return true;
}
```

This loops over every cell and returns false if any are empty.

---

## How to Draw the Winning Line

A red line is drawn over the winning cells.

```js
  function drawWinLine(res) {
    overlayGfx.clear();
    overlayGfx.lineStyle(6, 0xef4444, 1);
    const pad = 14;
    const half = CELL / 2;

    if (res.kind === "row") {
      const y = res.index * CELL + half;
      overlayGfx.strokeLineShape(new Phaser.Geom.Line(pad, y, BOARD - pad, y));
    } else if (res.kind === "col") {
      const x = res.index * CELL + half;
      overlayGfx.strokeLineShape(new Phaser.Geom.Line(x, pad, x, BOARD - pad));
    } else if (res.kind === "diag") {
      overlayGfx.strokeLineShape(new Phaser.Geom.Line(pad, pad, BOARD - pad, BOARD - pad));
    } else if (res.kind === "anti") {
      overlayGfx.strokeLineShape(new Phaser.Geom.Line(BOARD - pad, pad, pad, BOARD - pad));
    }
  }
})();
```

The coordinates are calculated based on the type of win to ensure the line passes through the correct cells.

Great. Now open <VPIcon icon="fa-brands fa-html5"/>`index.html` and you can start playing the game!

![Final Game](https://cdn.hashnode.com/res/hashnode/image/upload/v1754903555585/eac6d264-a50a-4bc6-8acc-6cdf7fc214eb.png)

---

## Final Thoughts

You have now built a complete Tic Tac Toe game in Phaser.js. This includes a 3x3 grid, alternating turns, win detection with a highlight line, draw detection, and a restart button. The code uses core game development concepts like input handling, game state management, and rendering, which you can use in larger projects.

If you enjoy online games, check out [<VPIcon icon="fas fa-globe"/>GameBoost](https://gameboost.com/), the ultimate marketplace for gamers. You can find [<VPIcon icon="fas fa-globe"/>Fortnite accounts](https://gameboost.com/fortnite/accounts) with exclusive skins, along with options for other popular games like Grow a Garden, Clash of Clans, and more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Tic Tac Toe Game with Phaser.js",
  "desc": "Tic-Tac-Toe is a great project for beginners who want to learn how to build games. It’s simple to understand but gives you the chance to learn about game state, player turns, winning logic, and user input. In this tutorial, you’ll learn how to build ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-tic-tac-toe-game-with-phaserjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
