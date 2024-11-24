---
lang: en-US
title: "Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices"
description: "Article(s) > Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices"
icon: fa-brands fa-node
category:
  - Node.js
  - Redis
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - redis
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices"
    - property: og:description
      content: "Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-real-time-multiplayer-tic-tac-toe-game-using-websockets-and-microservices.html
prev: /programming/js-node/articles/README.md
date: 2024-11-19
isOriginal: false
author: Birks Sachdev
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731400068976/3c951db9-929a-4d13-ba77-759932833a9a.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices"
  desc="In this tutorial, we’ll build a real-time multiplayer Tic-Tac-Toe game using Node.js, Socket.IO, and Redis. This game allows two players to connect from different browser tabs, take turns playing, and see real-time updates as they play. We'll use Red..."
  url="https://freecodecamp.org/news/build-a-real-time-multiplayer-tic-tac-toe-game-using-websockets-and-microservices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1731400068976/3c951db9-929a-4d13-ba77-759932833a9a.jpeg"/>

In this tutorial, we’ll build a **real-time multiplayer Tic-Tac-Toe game** using **Node.js**, **Socket.IO**, and **Redis**. This game allows two players to connect from different browser tabs, take turns playing, and see real-time updates as they play. We'll use **Redis** to manage game state synchronization across multiple WebSocket servers, making our application scalable.

By the end, you'll have a fully functional game with real-time capabilities and a solid understanding of how to use WebSockets and Redis to build scalable real-time applications.

---

## What You Will Learn

- How to use **Socket.IO** for real-time communication.
- How to use **Redis Pub/Sub** to synchronize game state across multiple clients.
- How to set up a scalable WebSocket server architecture.

::: note Prerequisites

Before we start, make sure you have the following installed:

- Node.js (v16 or higher)
- Redis
- Docker (optional, for running Redis in a container)
- Basic knowledge of JavaScript, Node.js, and WebSockets.

:::

---

## Project Overview

We'll build a real-time Tic-Tac-Toe game with the following features:

- **Two players** can connect and play a game.
- The game board updates in real-time across different browser tabs.
- The game announces a winner or declares a draw when the board is full.

We’ll use:

- **Node.js** with **Socket.IO** for handling WebSocket connections.
- **Redis** Pub/Sub to manage game state synchronization across clients.

---

## Step 1: Setting Up Your Development Environment

### Installing Node.js

Ensure you have Node.js installed on your system:

```sh
node -v
```

If you don’t have it installed, download it from [<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en).

### Installing Redis

You can install Redis locally or run it in a Docker container.

#### macOS (Using Homebrew)

First, ensure that you have [<FontIcon icon="iconfont icon-homebrew"/>Homebrew](https://brew.sh/) installed on your system before running the commands below:

```sh
brew install redis
brew services start redis
```

Verify that the Redis container is running with the following command:

```sh
redis-cli ping
```

You should see:

```sh
PONG
```

#### Using Docker to Run Redis

```sh
docker run --name redis-server -p 6379:6379 -d redis
```

Check if Redis is running using:

```sh
docker exec -it redis-server redis-cli ping
```

---

## **Step 2: Setting Up the Project**

### 1. Create the Project Directory

```sh
mkdir tic-tac-toe
cd tic-tac-toe
npm init -y
```

### 2. Install Dependencies

```sh
npm install express socket.io redis dotenv
```

### 3. Create Environment Variables

Create a `.env` file in your project root with the following contents:

```properties title=".env"
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Step 3: Implementing the WebSocket Server with Redis

In this step, we'll set up a WebSocket server that handles real-time game interactions using **Node.js**, **Socket.IO**, and **Redis**. This server will manage the game state, handle player moves, and ensure synchronization across multiple clients using Redis Pub/Sub.

We'll break down each section of the code so you understand exactly how everything fits together.**Server Code Explanation**

Create a file named <FontIcon icon="fa-brands fa-js"/>`server.js` and add the following code:

```js title="server.js"
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';

dotenv.config(); // Load environment variables from .env file

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});
```

- **dotenv**: Loads environment variables from a `.env` file to keep sensitive information like ports and keys secure.
- **express**: Sets up a basic Express server to handle HTTP requests.
- **http**: We create an HTTP server using Node's built-in `http` module, which we'll use with **Socket.IO** for WebSocket communication.
- **Socket.IO**: This library enables real-time, bidirectional communication between the server and clients.
- **CORS Configuration**: Allows cross-origin requests from our frontend running on `localhost:5173`.

Then, to create Redis publisher and subscriber clients, we’ll add the following code to `server.js`:

```js title="server.js"
// Initialize Redis clients
const pubClient = createClient();
const subClient = createClient();
await pubClient.connect();
await subClient.connect();
```

We use **Redis** to handle real-time data synchronization between connected clients.

- **pubClient**: Used to publish messages (like game state updates).
- **subClient**: Subscribes to messages (listens for updates).
- **connect()**: Establishes a connection to the Redis server.

In this paradigm, one client is used to publish updates, and the other one subscribes to updates. This helps avoid blocking behavior, since Redis clients in **subscribe** mode can only receive messages.

To subscribe to Redis channels for game updates, we’ll add the following code to `server.js`:

```js title="server.js"
// Subscribe to the Redis channel for game updates
await subClient.subscribe('game-moves', (message) => {
  gameState = JSON.parse(message);
  io.emit('gameState', gameState);
});
```

- **subClient.subscribe**: Listens for messages on the `game-moves` channel.
- Whenever a new move is made by a player, the game state is updated in Redis, and all connected clients are informed of the new state.
- The `message` parameter contains the game state as a string. We parse it into a JavaScript object and broadcast the updated state using **Socket.IO**.

Next, to define the game state and functions, we’ll add the following code to `server.js`:

```js title="server.js"
// Define initial game state
let gameState = {
  board: Array(9).fill(null),
  xIsNext: true,
};

// Function to reset the game
function resetGame() {
  gameState = {
    board: Array(9).fill(null),
    xIsNext: true,
  };
}
```

- **gameState**: Keeps track of the current state of the board and whose turn it is (`xIsNext`).
  - The board is represented as an array of 9 cells (each can be 'X', 'O', or `null`).
  - The `xIsNext` flag determines which player's turn it is.
- **resetGame()**: Resets the board and turn indicator to their initial state, allowing for a new game to start.

Next, to handle WebSocket connections, let’s add the following code to `server.js`:

```js title="server.js"
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send the current game state to the newly connected client
  socket.emit('gameState', gameState);
```

- The `io.on('connection')` event is triggered when a new client connects.
- **socket.id**: A unique identifier for each connected client.
- We immediately send the current `gameState` to the new client so they can see the current board.

To handle player moves, we’ll add the following code to `server.js`:

```js 
  // Handle player moves
  socket.on('makeMove', (index) => {
    // Prevent making a move if cell is already taken or game is over
    if (gameState.board[index] || calculateWinner(gameState.board)) return;

    // Update the board and switch turns
    gameState.board[index] = gameState.xIsNext ? 'X' : 'O';
    gameState.xIsNext = !gameState.xIsNext;

    // Publish the updated game state to Redis
    pubClient.publish('game-moves', JSON.stringify(gameState));
    io.emit('gameState', gameState);
  });
```

- **makeMove**: This event is triggered when a player clicks on a cell.
  - **Validation**: We check if the cell is already occupied or if the game has ended before making a move.
  - **Updating Game State**: If the move is valid, we update the board and switch turns.
- The updated game state is then:
    1. **Published to Redis**: This ensures that all instances of the server stay in sync.
    2. **Broadcasted to all clients**: This immediately updates the game board for all players.

To handle game restarts, we’ll add the following code to `server.js`:

```js title="server.js"
// Handle game restarts
socket.on('restartGame', () => {
  resetGame();
  io.emit('gameState', gameState);
});
```

To handle client disconnection handling, we’ll add the following code to `server.js`:

```js title="server.js"
 socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
```

Finally, to process the logic of the game, we’ll add the following functions to `server.js`:

```js title="server.js"
// Function to check if there's a winner
function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}
```

- **calculateWinner()**: Checks if there’s a winning combination on the board.
- **isBoardFull()**: Checks if all cells are filled, indicating a draw.

---

## Step 4: Implement the React Frontend interface

In this step, we build a simple and interactive React frontend for our Tic-Tac-Toe game. This frontend allows players to connect to the WebSocket server, make moves, and see the game board update in real-time.

In `App.jsx`, add the following code:

```jsx title="App.jsx"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null
  });

  useEffect(() => {
    socket.on('gameState', (state) => {
      setGameState(state);
    });

    return () => socket.off('gameState');
  }, []);

  const handleClick = (index) => {
    if (gameState.board[index] || gameState.winner) return;
    socket.emit('makeMove', index);
  };

  const renderCell = (index) => (
    <button onClick={() => handleClick(index)}>{gameState.board[index]}</button>
  );

  return (
    <div>
      <h1>Multiplayer Tic-Tac-Toe</h1>
      <div className="board">
        {[...Array(9)].map((_, i) => renderCell(i))}
      </div>
      <button onClick={() => socket.emit('restartGame')}>Restart Game</button>
    </div>
  );
}

export default App;
```

Here is a summary of how the React app is broken down:

- **WebSocket Connection**:
  - The frontend establishes a connection to the server using `socket.io-client`.
- **State Management**:
  - The game state (`gameState`) is managed with React's `useState` and includes:
    - The **board** (9 cells).
    - The flag **xIsNext** to indicate the current player's turn.
    - The **winner** status.
- **Real-Time Updates**:
  - The `useEffect` hook:
    - Listens for `gameState` updates from the server.
    - Updates the local game state when changes are detected.
    - Cleans up the WebSocket listener when the component is unmounted.
- **Handling Player Moves**:
  - The `handleClick` function:
    - Checks if a cell is already occupied or if the game has a winner before allowing a move.
    - Sends a `makeMove` event to the server with the clicked cell index.
- **Game Board Rendering**:
  - The `renderCell` function creates a button for each cell on the board.
    - The board is displayed using a 3x3 grid.
- **Restart Game**:
  - The "Restart Game" button emits a `restartGame` event to reset the game board for all players.
- **User Interface**:
  - A simple and interactive layout that allows players to take turns and see updates in real-time.

---

## Step 5: Running the Application

### Starting the Backend

To start the backend server, open a new terminal window and run the following commands:

```sh
cd tic-tac-toe
npm start
```

### Starting the Frontend

To start the React frontend server, open a new terminal window and run the commands below (do not use the same one which the backend server is running on, as you need both running simultaneously to run the game).

```sh
cd tic-tac-toe-client
npm run dev
```

### Accessing the Game

Open your browser and navigate to:

```sh
http://localhost:5173
```

---

## Step 6: Viewing Redis Messages in Real-Time

While the game is running, you can view Redis messages to see real-time game state updates.

Open a terminal and run:

```sh
redis-cli
SUBSCRIBE game-moves
```

This will display game updates:

```plaintext title="output"
1) "message"
2) "game-moves"
3) "{\"board\":[\"X\",null,\"O\",null,\"X\",null,null,null,null],\"xIsNext\":false}"
```

Every time a move is made or the game state changes, the server publishes the updated game state to the `game-moves` channel. Using `redis-cli`, you can monitor these updates in real-time, as the game is being played.

---

## Demo

In this demo, you'll see the Tic Tac Toe game running locally, demonstrating real-time updates as players take turns.

The gameplay showcases features such as turn switching, board updates, and game state announcements (winner or draw). This highlights how the game leverages WebSocket communication to provide a smooth, interactive experience.

<VidStack src="youtube/2aCllaBR6Xg" />

---

## Conclusion

Congratulations, you’ve successfully built a real-time multiplayer Tic-Tac-Toe game using Node.js, Socket.IO, and Redis. Here’s what you’ve learned:

- Real-time WebSocket communication using **Socket.IO**.
- Game state management using **Redis Pub/Sub**.
- Building a responsive front-end with **React**.

### Next Steps

- Add player authentication.
- Implement a chat feature.
- Deploy your application to a cloud provider for scalability.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a Real-Time Multiplayer Tic-Tac-Toe Game Using WebSockets and Microservices",
  "desc": "In this tutorial, we’ll build a real-time multiplayer Tic-Tac-Toe game using Node.js, Socket.IO, and Redis. This game allows two players to connect from different browser tabs, take turns playing, and see real-time updates as they play. We'll use Red...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-real-time-multiplayer-tic-tac-toe-game-using-websockets-and-microservices.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
