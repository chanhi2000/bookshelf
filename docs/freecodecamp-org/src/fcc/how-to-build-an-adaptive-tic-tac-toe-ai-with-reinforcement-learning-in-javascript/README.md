---
lang: en-US
title: "How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript"
description: "Article(s) > How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript"
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
      content: "Article(s) > How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript"
    - property: og:description
      content: "How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-adaptive-tic-tac-toe-ai-with-reinforcement-learning-in-javascript/
prev: /programming/js/articles/README.md
date: 2025-10-08
isOriginal: false
author:
  - name: Mayur Vekariya
    url : https://freecodecamp.org/news/author/mayur9210/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759870150966/f65a07a6-123b-45e2-a3f2-bc099638825a.png
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
  name="How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript"
  desc="Reinforcement learning (RL) is one of the most powerful paradigms in artificial intelligence. Unlike supervised learning where you train models on labeled datasets, RL agents learn through direct interaction with their environment, receiving rewards ..."
  url="https://freecodecamp.org/news/how-to-build-an-adaptive-tic-tac-toe-ai-with-reinforcement-learning-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759870150966/f65a07a6-123b-45e2-a3f2-bc099638825a.png"/>

Reinforcement learning (RL) is one of the most powerful paradigms in artificial intelligence. Unlike supervised learning where you train models on labeled datasets, RL agents learn through direct interaction with their environment, receiving rewards or penalties for their actions.

In this tutorial, you will build a Tic-Tac-Toe AI that learns optimal strategies through Q-learning, a foundational RL algorithm. You will implement adaptive difficulty levels, visualize the learning process in real-time, and explore advanced optimization techniques.

By the end of this tutorial, you’ll have a production-ready web application that demonstrates practical RL concepts – all running directly in the browser with vanilla JavaScript.

::: info What You’ll Learn

In this tutorial, you’ll learn:

- Core reinforcement learning concepts including Q-learning, exploration vs exploitation, and reward shaping.
- How to implement a complete Q-learning algorithm with state management.
- Advanced techniques like epsilon decay and experience replay.
- How to build an interactive game with HTML5 Canvas and responsive controls.
- Performance optimization for real-time AI decision-making.
- Visualization techniques to understand the AI's learning process.

:::

::: note  Prerequisites

To get the most out of this tutorial, you should have:

- Solid understanding of JavaScript (ES6+ syntax, classes, array methods).
- Familiarity with HTML5 Canvas API for graphics rendering.
- Basic knowledge of algorithms and data structures.
- Understanding of asynchronous JavaScript (Promises, async/await).

:::

You don’t need any prior machine learning experience, as I’ll explain all RL concepts from scratch.

---

## Why Use Reinforcement Learning for Game AI?

Games provide an ideal environment for learning RL because they have:

1. **Clear state representations** – The game board at any moment
2. **Discrete action spaces** – A finite set of valid moves
3. **Immediate feedback** – Win, lose, or draw outcomes
4. **Deterministic rules** – Consistent behavior across games

Traditional game AI uses techniques like minimax with alpha-beta pruning. While effective, these approaches require you to explicitly program game strategies. RL agents, by contrast, discover optimal strategies through experience – much like humans learn through practice.

Tic-Tac-Toe serves as an excellent starting point because:

- The state space is manageable (5,478 unique positions)
- Games are short, allowing rapid iteration
- Perfect play is achievable, providing a clear success metric
- The concepts scale to more complex games

---

## How to Understand Q-Learning: The Foundation

[Q-learning](https://freecodecamp.org/news/an-introduction-to-q-learning-reinforcement-learning-14ac0b4493cc/) is a model-free, value-based RL algorithm. Let me break down what that means:

- **Model-free** means that the agent doesn’t need to understand the game's rules. It learns purely from experience.
- **Value-based** means that the agent learns the "value" of each action in each state, then chooses the action with the highest value.

### Core Components

There are a few key components you’ll need to understand before building this game.

First, we have **state (s)**, which here is the current game board configuration. We represent this as a 9-character string (for example, `"XO-X-----"` where `-` represents empty cells).

Next, we have **action (a)**, which is a move the AI can make. We represent this as an index from 0-8 corresponding to board positions.

Then there’s **reward (r)**, the numerical feedback from the environment:

- `+1` for winning
- `-1` for losing
- `0` for draws or ongoing games

We also have **Q-Table**, a lookup table storing $Q\left(s,a\right)$– the expected cumulative reward for taking action $a$ in state $s$.

And finally, there’s **policy**, the strategy for choosing actions. We use an epsilon-greedy policy that balances exploration and exploitation.

### The Q-Learning Update Rule

The heart of Q-learning is this update formula:

```sh
Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]
```

Where:

- `α` (alpha) = Learning rate (0 to 1) – how much to update the Q-value
- `γ` (gamma) = Discount factor (0 to 1) – how much to value future rewards
- `s'` = Next state after taking action `a`
- `max Q(s',a')` = Highest Q-value available in the next state.

This formula implements **temporal difference learning**. This means it updates our estimate of Q(s,a) based on the difference between our current estimate and a better estimate using the actual reward received plus the best possible future reward.

### How Exploration vs Exploitation Works

A critical challenge in reinforcement learning is the "exploration vs. exploitation" trade-off. To understand why this is difficult, imagine choosing a place for dinner.

- **Exploitation:** You could go to your favorite restaurant. You know the food is good, and you're almost guaranteed a satisfying meal. This is a safe, reliable choice that maximizes your immediate reward based on past experience.
- **Exploration:** You could try a new, unknown restaurant. It might be a disaster, or you might discover a new favorite that’s even better than your old one. This is a risky choice that provides no immediate guarantee, but it's the only way to gather new information and potentially find a better long-term strategy.

The same dilemma applies to our AI. If it only exploits its current knowledge, it might get stuck using a mediocre strategy, never discovering the brilliant moves that lead to a guaranteed win. If it only explores by making random moves, it will never learn to use the good strategies it finds and will play poorly.

The key is to balance the two: explore enough to find optimal strategies, but exploit that knowledge to win games.

To achieve this balance, we use an **epsilon-greedy (ϵ) strategy**. It’s a simple but powerful way to manage this trade-off:

1. We choose a small value for epsilon (ϵ), for example, 0.1 (which represents a 10% probability).
2. Before the AI makes a move, it generates a random number between 0 and 1.
3. **If the random number is less than ϵ (the 10% chance):** The AI ignores its strategy and chooses a random available move. This is **exploration**.
4. **If the random number is greater than or equal to ϵ (the 90% chance):** The AI chooses the best-known move from its Q-table.This is **exploitation**.

This ensures the AI primarily plays to win but still dedicates a small fraction of its moves to trying new things. We will also implement **epsilon decay** – starting with a higher ϵ value to encourage exploration when the AI is inexperienced, and gradually lowering it as the AI learns and becomes more confident in its strategy.

---

## Project Architecture Overview

Before you start coding, here's the structure of the application you’ll build:

```plaintext title="file structure"
tic-tac-toe-ai/
├── index.html          # Game interface with Tailwind CSS
└── game.js            # Complete game logic and AI
```

You will organize your code into two main classes in game.js:

1. **QLearning**: Implements the Q-learning algorithm.
2. **TicTacToe**: Manages game state and rendering.

---

## Table of Contents

- [How to Build the HTML Interface with Tailwind CSS](#heading-how-to-build-the-html-interface-with-tailwind-css)
- [How to Implement the Q-Learning Algorithm](#heading-how-to-implement-the-q-learning-algorithm)
- [How to Understand the Enhanced Features](#heading-how-to-understand-the-enhanced-features)
- [How to Test Your Implementation](#heading-how-to-test-your-implementation)
- [Advanced Optimizations and Extensions](#heading-advanced-optimizations-and-extensions)
- [Common Pitfalls and Solutions](#heading-common-pitfalls-and-solutions)
- [How to Extend This to Other Games](#heading-how-to-extend-this-to-other-games)

---

## How to Build the HTML Interface with Tailwind CSS

Create an <FontIcon icon="fa-brands fa-html5"/>`index.html` file with Tailwind CSS CDN:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tic-Tac-Toe AI with Q-Learning</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-600 to-purple-900 min-h-screen flex items-center justify-center p-4">

  <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🎮 Tic-Tac-Toe AI</h1>
      <p class="text-gray-600 text-lg">Watch the AI learn through reinforcement learning</p>
    </div>

    <!-- Training Indicator -->
    <div id="trainingIndicator" class="hidden bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
      <p class="font-semibold">🤖 AI is training... <span id="trainingProgress"></span></p>
    </div>

    <!-- Main Game Area -->
    <div class="grid md:grid-cols-2 gap-8">

      <!-- Canvas Section -->
      <div class="flex flex-col items-center">
        <canvas id="gameCanvas" width="400" height="400" 
                class="border-4 border-purple-500 rounded-xl shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
        </canvas>
        <div id="gameStatus" class="mt-4 text-xl font-bold text-gray-700 min-h-[30px]">
          Your turn! (X)
        </div>
      </div>

      <!-- Controls Section -->
      <div class="space-y-6">

        <!-- Game Controls -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Game Controls</h3>
          <div class="space-y-3">
            <button onclick="game.reset()" 
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              New Game
            </button>
            <button onclick="game.startTraining()" 
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Train AI (1000 games)
            </button>
            <button onclick="game.resetAI()" 
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Reset AI Memory
            </button>
          </div>
        </div>

        <!-- Difficulty Selector -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Difficulty Level</h3>
          <div class="grid grid-cols-3 gap-2">
            <button onclick="game.setDifficulty('beginner')" id="diffBeginner"
                    class="py-2 px-4 rounded-lg font-semibold text-sm transition-all bg-green-100 text-green-700 hover:bg-green-200">
              🌱 Beginner
            </button>
            <button onclick="game.setDifficulty('intermediate')" id="diffIntermediate"
                    class="py-2 px-4 rounded-lg font-semibold text-sm transition-all bg-white text-gray-700 hover:bg-gray-100 border-2 border-purple-500">
              🎯 Medium
            </button>
            <button onclick="game.setDifficulty('expert')" id="diffExpert"
                    class="py-2 px-4 rounded-lg font-semibold text-sm transition-all bg-white text-gray-700 hover:bg-gray-100">
              🔥 Expert
            </button>
          </div>
        </div>

        <!-- AI Parameters -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">AI Parameters</h3>

          <div class="space-y-4">
            <!-- Learning Rate -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Learning Rate (α)
                  <span class="group relative">
                    <span class="cursor-help text-purple-500">ⓘ</span>
                    <span class="invisible group-hover:visible absolute left-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10 shadow-xl">
                      Controls how quickly the AI updates its knowledge. Higher values = faster learning but less stability. Recommended: 0.1-0.3
                    </span>
                  </span>
                </label>
                <span id="learningRateValue" class="text-sm font-bold text-purple-600">0.1</span>
              </div>
              <input type="range" id="learningRate" min="0.01" max="0.5" step="0.01" value="0.1"
                     class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>

            <!-- Discount Factor -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Discount Factor (γ)
                  <span class="group relative">
                    <span class="cursor-help text-purple-500">ⓘ</span>
                    <span class="invisible group-hover:visible absolute left-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10 shadow-xl">
                      Determines how much the AI values future rewards vs immediate rewards. Higher = more long-term thinking. Recommended: 0.85-0.95
                    </span>
                  </span>
                </label>
                <span id="discountFactorValue" class="text-sm font-bold text-purple-600">0.9</span>
              </div>
              <input type="range" id="discountFactor" min="0.5" max="0.99" step="0.01" value="0.9"
                     class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>

            <!-- Exploration Rate -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Exploration Rate (ε)
                  <span class="group relative">
                    <span class="cursor-help text-purple-500">ⓘ</span>
                    <span class="invisible group-hover:visible absolute left-0 top-6 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10 shadow-xl">
                      Chance the AI tries random moves vs using learned strategy. Higher = more experimentation. Set to 0.01 for best play after training.
                    </span>
                  </span>
                </label>
                <span id="explorationRateValue" class="text-sm font-bold text-purple-600">0.1</span>
              </div>
              <input type="range" id="explorationRate" min="0" max="0.5" step="0.01" value="0.1"
                     class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Statistics</h3>
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">Games</div>
              <div id="gamesPlayed" class="text-2xl font-bold text-gray-800">0</div>
            </div>
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">AI Wins</div>
              <div id="aiWins" class="text-2xl font-bold text-green-600">0</div>
            </div>
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">You Win</div>
              <div id="playerWins" class="text-2xl font-bold text-red-600">0</div>
            </div>
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">Draws</div>
              <div id="draws" class="text-2xl font-bold text-gray-600">0</div>
            </div>
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">States</div>
              <div id="statesLearned" class="text-2xl font-bold text-purple-600">0</div>
            </div>
            <div class="bg-white rounded-lg p-3 text-center shadow-sm">
              <div class="text-xs text-gray-600 mb-1">Win Rate</div>
              <div id="winRate" class="text-2xl font-bold text-blue-600">0%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <script src="game.js"></script>
</body>
</html>
```

This HTML structure creates a responsive, modern interface using Tailwind CSS utility classes. The layout uses a two-column grid on medium screens and larger, with the game canvas on the left and all controls on the right. The training indicator starts hidden and only appears during AI training sessions.

All interactive elements (buttons, sliders) use `onclick` handlers and `oninput` events to communicate with the JavaScript game logic. The tooltip system uses CSS group hover states to show explanatory text when users hover over the info icons, helping them understand each parameter without cluttering the interface.

Let’s talk in a bit more detail about some key parts of the code:

- **Header Section**: Displays the game title and subtitle to introduce users to the application.
- **Training Indicator**: A yellow banner that appears only during AI training sessions, showing progress updates every 50 games. This provides visual feedback so users know the training is in progress.
- **Canvas Section**: Contains the HTML5 Canvas element where the game board is drawn. The canvas is 400x400 pixels and styled with Tailwind classes for borders and hover effects. Below it is a status message that updates based on game state.
- **Game Controls**: Three primary buttons that let users start a new game, train the AI through 1000 self-play games, or completely reset the AI's memory (clearing the Q-table).
- **Difficulty Selector**: Three buttons for choosing AI difficulty. Beginner mode makes the AI play randomly 70% of the time, Intermediate uses Q-learning, and Expert implements perfect minimax play.
- **AI Parameters**: Three range sliders with tooltips that let users adjust the core reinforcement learning hyperparameters in real-time. The tooltips appear on hover and explain what each parameter does.
- **Statistics Panel**: A grid of six cards displaying real-time metrics including games played, wins/losses/draws, learned states, and AI win rate percentage.

All interactive elements use `onclick` handlers that call methods from the `game` object defined in <FontIcon icon="fa-brands fa-js"/>`game.js`.

---

## How to Implement the Q-Learning Algorithm

Now, let's bring the theory to life. Create a <FontIcon icon="fa-brands fa-js"/>`game.js` file. We will build this file step-by-step, but if you get stuck at any point or want to see the complete code for reference, you can find the final version [on GitHub here (<FontIcon icon="iconfont icon-github"/>`mayur9210/tic-tac-toe-ai`)](https://github.com/mayur9210/tic-tac-toe-ai/blob/main/game.js).

Our code will be structured into two main classes: `QLearning`, which will handle the AI's "brain" and learning logic, and `TicTacToe`, which will manage the game state, rendering, and user interaction.

### The `QLearning` Class: The AI's Brain

This class will contain all the logic for the [reinforcement learning agent (<FontIcon icon="iconfont icon-github"/>`mayur9210/tic-tac-toe-ai`)](https://github.com/mayur9210/tic-tac-toe-ai/blob/main/game.js). Let's build it piece by piece.

#### 1. Constructor and Q-Table Management

First, let's set up the `constructor` and a method to access our Q-table. The Q-table will be a JavaScript `Map`, which is highly efficient for storing and retrieving key-value pairs where the key (the board state) is a string.

```js title="game.js"
// Q-Learning Agent with localStorage support
class QLearning {
  constructor(lr = 0.1, gamma = 0.9, epsilon = 0.1) {
    this.q = new Map(); // Stores Q-values: { state => [q_action_0, q_action_1, ...] }
    this.lr = lr; // Learning Rate (α)
    this.gamma = gamma; // Discount Factor (γ)
    this.epsilon = epsilon; // Exploration Rate (ε)
    this.difficulty = 'intermediate';
  }

  getQ(state) {
    if (!this.q.has(state)) {
      this.q.set(state, Array(9).fill(0));
    }
    return this.q.get(state);
  }
  // ...
}
```

- The `constructor` initializes our three key hyperparameters (α, γ, ϵ) and the Q-table itself.
- `getQ(state)` is a crucial helper function. It safely retrieves the array of Q-values for a given board state. If the AI has never seen this state before, it creates a new entry in the map with an array of nine zeros, representing an initial Q-value of 0 for each possible move.

#### 2. Choosing an Action (The Epsilon-Greedy Strategy)

Next, we'll implement the `getAction` method. This is where the AI decides which move to make, incorporating our difficulty levels and the epsilon-greedy strategy.

```js
getAction(state, available) {
  // Difficulty-based behavior
  if (this.difficulty === 'beginner') {
    // 70% random moves for beginner
    if (Math.random() < 0.7) {
      return available[~~(Math.random() * available.length)];
    }
  } else if (this.difficulty === 'expert') {
    // Use minimax for perfect play
    return this.getMinimaxAction(state, available);
  }

  // Intermediate: epsilon-greedy
  if (Math.random() < this.epsilon) {
    return available[~~(Math.random() * available.length)];
  }
  const q = this.getQ(state);
  return available.reduce((best, a) => q[a] > q[best] ? a : best, available[0]);
}
```

- The logic first checks the difficulty. 'Beginner' is mostly random, while 'Expert' defers to a separate, perfect-play algorithm.
- For the 'Intermediate' level, it implements the epsilon-greedy logic. With probability ϵ, it explores (chooses a random move). Otherwise, it exploits (chooses the best-known move from the Q-table).

#### 3. The Learning Rule

The `update` method is the heart of the algorithm. It's the direct implementation of the Q-learning formula we discussed earlier.

```
Q(s, a) ← Q(s, a) + α [r + γ max(a') Q(s', a') − Q(s, a)]
```

```js
update(s, a, r, s2, available2) {
  const q = this.getQ(s);
  const maxQ2 = available2.length ? Math.max(...available2.map(a_prime => this.getQ(s2)[a_prime])) : 0;
  q[a] += this.lr * (r + this.gamma * maxQ2 - q[a]);
}
```

- `maxQ2` calculates the `max Q(s',a')` part of the formula – the best possible Q-value the AI can get from its next move.
- The final line is a direct translation of the formula, updating the value of the action just taken based on the reward and future potential.

#### 4. Minimax for Expert Mode

For our 'Expert' level, we'll implement the minimax algorithm, a classic recursive algorithm from game theory that guarantees perfect play.

```js
  getMinimaxAction(state, available) {
    let bestScore = -Infinity;
    let bestMove = available[0];

    for (const move of available) {
      const newState = state.substring(0, move) + 'O' + state.substring(move + 1);
      const score = this.minimax(newState, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  minimax(state, depth, isMaximizing) {
    const winner = this.checkWinnerStatic(state);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'draw') return 0;

    const available = [...state].map((c, i) => c === '-' ? i : null).filter(x => x !== null);

    if (isMaximizing) {
      let best = -Infinity;
      for (const move of available) {
        const newState = state.substring(0, move) + 'O' + state.substring(move + 1);
        best = Math.max(best, this.minimax(newState, depth + 1, false));
      }
      return best;
    } else {
      let best = Infinity;
      for (const move of available) {
        const newState = state.substring(0, move) + 'X' + state.substring(move + 1);
        best = Math.min(best, this.minimax(newState, depth + 1, true));
      }
      return best;
    }
  }

  checkWinnerStatic(state) {
    const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const p of patterns) {
      if (state[p[0]] !== '-' && state[p[0]] === state[p[1]] && state[p[1]] === state[p[2]]) {
        return state[p[0]];
      }
    }
    return state.includes('-') ? null : 'draw';
  }
```

#### 5. Helper and Persistence Methods

Finally, let's add methods for epsilon decay, resetting the AI's memory, and saving/loading the Q-table to `localStorage`.

```js
  decay() {
    this.epsilon = Math.max(0.01, this.epsilon * 0.995);
  }

  reset() {
    this.q.clear();
    this.epsilon = 0.1;
  }

  save() {
    const data = {
      q: Array.from(this.q.entries()),
      lr: this.lr,
      gamma: this.gamma,
      epsilon: this.epsilon,
      difficulty: this.difficulty
    };
    localStorage.setItem('tictactoe_ai', JSON.stringify(data));
  }

  load() {
    const saved = localStorage.getItem('tictactoe_ai');
    if (!saved) return false;

    try {
      const data = JSON.parse(saved);
      this.q = new Map(data.q);
      this.lr = data.lr;
      this.gamma = data.gamma;
      this.epsilon = data.epsilon;
      this.difficulty = data.difficulty || 'intermediate';
      return true;
    } catch (e) {
      console.error('Failed to load AI state:', e);
      return false;
    }
  }

  clearStorage() {
    localStorage.removeItem('tictactoe_ai');
  }
}
```

### The `TicTacToe` Class: Managing the Game

Now that we have our AI "brain," we need to build the game around it. This class will handle rendering the board, processing user clicks, managing game flow, and calling the AI when it's its turn.

#### 1. Constructor and Control Initialization

The constructor sets up the game's initial state, gets a reference to the HTML canvas, and wires up event listeners for user input.

```js
class TicTacToe {
  constructor() {
    this.board = '---------';
    this.ai = new QLearning();
    this.stats = { played: 0, aiWins: 0, playerWins: 0, draws: 0 };
    this.training = false;
    this.gameOver = false;

    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = 133.33;

    this.canvas.onclick = e => this.handleClick(e);
    this.initControls();
    this.loadState();
    this.draw();
  }

  initControls() {
    ['learningRate', 'discountFactor', 'explorationRate'].forEach(id => {
      const el = document.getElementById(id);
      el.oninput = e => {
        const val = parseFloat(e.target.value);
        document.getElementById(id + 'Value').textContent = val.toFixed(2);
        if (id === 'learningRate') this.ai.lr = val;
        if (id === 'discountFactor') this.ai.gamma = val;
        if (id === 'explorationRate') this.ai.epsilon = val;
        this.saveState();
      };
    });
  }
  // ...
}
```

`initControls` connects our HTML sliders to the AI's parameters, allowing for real-time adjustments.

#### 2. Difficulty and UI Methods

These methods manage the difficulty setting and update the UI accordingly.

```js
  setDifficulty(level) {
    this.ai.difficulty = level;

    // Update button styles
    ['beginner', 'intermediate', 'expert'].forEach(diff => {
      const btn = document.getElementById(`diff${diff.charAt(0).toUpperCase() + diff.slice(1)}`);
      if (diff === level) {
        btn.className = 'py-2 px-4 rounded-lg font-semibold text-sm transition-all bg-purple-600 text-white border-2 border-purple-600';
      } else {
        btn.className = 'py-2 px-4 rounded-lg font-semibold text-sm transition-all bg-white text-gray-700 hover:bg-gray-100';
      }
    });

    if (level === 'beginner') this.setStatus('🌱 Beginner mode: AI makes more mistakes');
    else if (level === 'intermediate') this.setStatus('🎯 Medium mode: Balanced AI using Q-learning');
    else this.setStatus('🔥 Expert mode: Perfect AI using minimax algorithm');

    this.saveState();
  }
```

#### 3. Drawing and Rendering

These methods use the HTML5 Canvas API to visually represent the game state.

```js
  draw() {
    const { ctx, canvas, cellSize } = this;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    for (let i = 0; i < 9; i++) {
      const symbol = this.board[i];
      if (symbol === '-') continue;

      const x = (i % 3) * cellSize + cellSize / 2;
      const y = ~~(i / 3) * cellSize + cellSize / 2;

      ctx.strokeStyle = symbol === 'X' ? '#ef4444' : '#10b981';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';

      if (symbol === 'X') {
        const s = cellSize * 0.3;
        ctx.beginPath();
        ctx.moveTo(x - s, y - s);
        ctx.lineTo(x + s, y + s);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + s, y - s);
        ctx.lineTo(x - s, y + s);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, cellSize * 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const winner = this.checkWinner();
    if (winner?.line) this.drawWinLine(winner.line);
  }

  drawWinLine(line) {
    const [a, , c] = line;
    const startX = (a % 3) * this.cellSize + this.cellSize / 2;
    const startY = ~~(a / 3) * this.cellSize + this.cellSize / 2;
    const endX = (c % 3) * this.cellSize + this.cellSize / 2;
    const endY = ~~(c / 3) * this.cellSize + this.cellSize / 2;

    this.ctx.strokeStyle = '#fbbf24';
    this.ctx.lineWidth = 6;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }
```

#### 4. Player Interaction and the Game Loop

This is the core interactive logic. `handleClick` translates a click into a board position, `move` updates the state, and `aiMove` gets an action from the `QLearning` class and executes it.

```js
  handleClick(e) {
    if (this.gameOver || this.training) return;

    const rect = this.canvas.getBoundingClientRect();
    const col = ~~((e.clientX - rect.left) / this.cellSize);
    const row = ~~((e.clientY - rect.top) / this.cellSize);
    const idx = row * 3 + col;

    if (this.board[idx] === '-') {
      this.move(idx, 'X');
      if (!this.gameOver) setTimeout(() => this.aiMove(), 300);
    }
  }

  move(idx, player) {
    if (this.board[idx] !== '-' || this.gameOver) return false;
    this.board = this.board.substring(0, idx) + player + this.board.substring(idx + 1);
    this.draw();
    this.checkGameOver();
    return true;
  }

  aiMove() {
    if (this.gameOver) return;

    const state = this.board;
    const available = this.getAvailable();
    const action = this.ai.getAction(state, available);

    this.move(action, 'O');

    const winner = this.checkWinner();
    const reward = winner?.winner === 'O' ? 1 : winner?.winner === 'X' ? -1 : 0;
    this.ai.update(state, action, reward, this.board, this.getAvailable());
  }
```

After the AI moves, it immediately calls `this.ai.update()` to learn from the result of its action.

#### 5. The Rules Engine

These helpers determine the game's state: available moves, winner, and game over conditions.

```js
  getAvailable() {
    return [...this.board].map((c, i) => c === '-' ? i : null).filter(x => x !== null);
  }

  checkWinner() {
    const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const p of patterns) {
      if (this.board[p[0]] !== '-' && 
          this.board[p[0]] === this.board[p[1]] && 
          this.board[p[1]] === this.board[p[2]]) {
        return { winner: this.board[p[0]], line: p };
      }
    }
    return this.board.includes('-') ? null : { winner: 'draw', line: null };
  }

  checkGameOver() {
    const result = this.checkWinner();
    if (!result) return;

    this.gameOver = true;
    this.stats.played++;

    if (result.winner === 'X') {
      this.stats.playerWins++;
      if (!this.training) this.setStatus('🎉 You win!');
    } else if (result.winner === 'O') {
      this.stats.aiWins++;
      if (!this.training) this.setStatus('🤖 AI wins!');
    } else {
      this.stats.draws++;
      if (!this.training) this.setStatus('🤝 Draw!');
    }

    if (!this.training) {
      this.updateStats();
      this.saveState();
    }
  }
```

#### 6. UI and Statistics Updates

These methods connect the internal game state to the HTML elements, displaying status messages and statistics.

```js
  setStatus(msg) {
    document.getElementById('gameStatus').textContent = msg;
  }

  updateStats() {
    document.getElementById('gamesPlayed').textContent = this.stats.played;
    document.getElementById('aiWins').textContent = this.stats.aiWins;
    document.getElementById('playerWins').textContent = this.stats.playerWins;
    document.getElementById('draws').textContent = this.stats.draws;
    document.getElementById('statesLearned').textContent = this.ai.q.size;

    const winRate = this.stats.played ? (this.stats.aiWins / this.stats.played * 100).toFixed(1) : 0;
    document.getElementById('winRate').textContent = `${winRate}%`;
  }
```

#### 7. Game and AI Management

These methods are wired to the control buttons for resetting the game or the AI's memory.

```js
  reset() {
    this.board = '---------';
    this.gameOver = false;
    this.draw();
    this.setStatus('Your turn! (X)');
  }

  resetAI() {
    if (confirm('Reset AI memory? All progress will be lost.')) {
      this.ai.reset();
      this.ai.clearStorage();
      this.stats = { played: 0, aiWins: 0, playerWins: 0, draws: 0 };
      this.updateStats();
      this.reset();
      this.setStatus('AI memory reset!');
      localStorage.removeItem('tictactoe_stats');
    }
  }
```

#### 8. The Self-Play Training Loop

This is the logic for the "Train AI" button, allowing the AI to learn rapidly by playing against itself.

```js
  async startTraining() {
    this.training = true;
    document.getElementById('trainingIndicator').classList.remove('hidden');

    const originalEpsilon = this.ai.epsilon;
    this.ai.epsilon = 0.3; // Higher exploration during training

    for (let i = 0; i < 1000; i++) {
      await this.trainGame();
      this.ai.decay();
      if (i % 50 === 0) {
        document.getElementById('trainingProgress').textContent = `${i + 1}/1000`;
        await new Promise(r => setTimeout(r, 0)); // Allow UI to update
      }
    }

    this.ai.epsilon = originalEpsilon;
    this.training = false;
    document.getElementById('trainingIndicator').classList.add('hidden');
    this.updateStats();
    this.reset();
    this.setStatus('Training complete!');
    this.saveState();
  }

  async trainGame() {
    this.board = '---------';
    this.gameOver = false;
    const moves = [];

    while (!this.gameOver && this.getAvailable().length > 0) {
      const state = this.board;
      const available = this.getAvailable();
      // Alternate players (X and O) are both the AI
      const player = moves.length % 2 === 0 ? 'X' : 'O'; 
      const action = this.ai.getAction(state, available);

      moves.push({ state, action, player });
      this.move(action, player);
    }

    const winner = this.checkWinner();
    // Assign rewards after the game is over
    moves.forEach(m => {
      const reward = winner?.winner === m.player ? 1 : (winner?.winner && winner.winner !== m.player) ? -1 : 0;
      this.ai.update(m.state, m.action, reward, this.board, []);
    });
  }
```

#### 9. State Persistence

These methods orchestrate saving and loading the game state and AI's memory to `localStorage`.

```js
  saveState() {
    this.ai.save();
    localStorage.setItem('tictactoe_stats', JSON.stringify(this.stats));
  }

  loadState() {
    if (this.ai.load()) {
      const savedStats = localStorage.getItem('tictactoe_stats');
      if (savedStats) {
        this.stats = JSON.parse(savedStats);
      }
      this.updateStats();
      this.setDifficulty(this.ai.difficulty);

      // Update sliders to reflect loaded AI state
      document.getElementById('learningRate').value = this.ai.lr;
      document.getElementById('learningRateValue').textContent = this.ai.lr.toFixed(2);
      document.getElementById('discountFactor').value = this.ai.gamma;
      document.getElementById('discountFactorValue').textContent = this.ai.gamma.toFixed(2);
      document.getElementById('explorationRate').value = this.ai.epsilon;
      document.getElementById('explorationRateValue').textContent = this.ai.epsilon.toFixed(2);

      console.log('✓ Loaded AI state from localStorage');
    }
  }
}
```

#### 10. Initializing the Game

Finally, add this snippet at the end of <FontIcon icon="fa-brands fa-js"/>`game.js` to create an instance of the game once the HTML document is loaded.

```js
let game;
window.addEventListener('DOMContentLoaded', () => {
  game = new TicTacToe();
});
```

This completes our implementation! You now have a fully functional <FontIcon icon="fa-brands fa-js"/>`game.js` file. If you encountered any issues or want to double-check your work, you can compare your code against the complete source file available on GitHub: [https://github.com/mayur9210/tic-tac-toe-ai/blob/main/game.js](https://github.com/mayur9210/tic-tac-toe-ai/blob/main/game.js).

---

## How to Understand the Enhanced Features

Beyond the core Q-learning logic, this implementation includes several enhanced features to create a complete, user-friendly, and educational application. Let's explore what they are and how they work.

### 1. Adaptive Difficulty Levels

The game supports three distinct difficulty modes to cater to different players:

- **Beginner (🌱):** This mode is designed for new players. The AI makes random moves 70% of the time, providing a high chance for the player to win and learn the game's rules.
- **Intermediate (🎯):** This is the standard mode where the AI uses the Q-learning algorithm with an epsilon-greedy strategy. It presents a challenging but fair opponent that improves over time.
- **Expert (🔥):** This mode switches from reinforcement learning to the classic **minimax algorithm**. This algorithm plays a perfect game, meaning it is impossible to beat (the best a player can achieve is a draw). This serves as a benchmark for optimal play.
    

### 2. Other Enhanced Features

In addition to the difficulty levels, the application includes:

- **Real-time AI parameter tuning:** The sliders in the UI allow you to adjust the Learning Rate (α), Discount Factor (γ), and Exploration Rate (ϵ) on the fly. This lets you directly observe how different hyperparameters affect the AI's learning speed and performance.
- **Persistence with localStorage:** The AI automatically saves its Q-table and your game statistics to the browser's local storage. When you close the tab and come back later, the AI will remember everything it has learned.
- **Dedicated self-play training mode:** The "Train AI" button allows the AI to play 1,000 games against itself in a matter of seconds. This rapidly populates the Q-table and is far more efficient than learning from just human-played games.
    

---

## Putting It All Together: A Guided Test Run

Once you have the HTML (`index.html`) and JavaScript (`game.js`) files in same directory, open the HTML file in a web browser to test all the features. When you open the HTML file, it should look like as shown in the below image.

I have also [hosted this file on GitHub Pages](https://mayur9210.github.io/tic-tac-toe-ai/) if you want to see how it works.

Now that you have the application running, let's walk through how to test the features and witness the AI's learning process firsthand. This interactive testing is the most rewarding part, as you'll see the abstract concepts come to life.

### Step 1: Challenge the Untrained AI

When you first load the game, the AI is a blank slate. Its Q-table is empty. Make sure the difficulty is set to **🌱 Beginner** and play a game against it. You'll likely find it very easy to beat. It makes random, nonsensical moves because it has no experience. Notice the "States Learned" in the statistics panel is very low.

### Step 2: Train the AI

Now for the magic. Click the **"Train AI (1000 games)"** button. You'll see the yellow training indicator appear with a progress counter. In these few seconds, the AI is playing 1,000 games against itself, rapidly learning from its wins, losses, and draws. For every move in every game, it updates its Q-table, reinforcing good strategies and penalizing bad ones.

### Step 3: Challenge the Trained AI

Once training is complete, play another game on **🎯 Medium** difficulty. The difference should be dramatic. The AI will now play strategically, blocking your wins and setting up its own. It is no longer a pushover. Check the statistics panel again: you'll see the "States Learned" count has jumped significantly, representing all the new board positions it now understands.

### Step 4: Experiment with the Controls

Now that you have a trained AI, experiment with the other features:

- **Switch to 🔥 Expert:** Play against the minimax algorithm. Notice that you can't win. This demonstrates the power of a perfect-play algorithm.
- **Tweak the parameters:** Set the Exploration Rate (ε) slider to 0. The AI will become completely deterministic, always picking the move with the highest Q-value. Set it to 0.5, and watch it become more erratic and experimental again.
- **Reset the AI:** Click the "Reset AI Memory" button. This will wipe its Q-table. If you play against it now, you'll find it's back to its original, untrained state. This confirms that its "intelligence" was stored in the Q-table you just erased.
    

### Verifying the Implementation with Automated Tests

While playing the game gives you a good feel for the AI's behavior, automated tests are crucial for programmatically confirming that the underlying code is correct. This is different from the manual testing you just performed. Here, we are writing code to check our code.

The following test suite validates the three most critical features: difficulty switching, data persistence with `localStorage`, and the infallibility of the expert minimax AI. You can run these tests by copying and pasting the code into your browser's developer console while the game is open.

```js
function runTests() {
  console.log('🧪 Running enhanced tests...');

  // Test 1: Difficulty switching
  const g1 = new TicTacToe();
  g1.setDifficulty('beginner');
  console.assert(g1.ai.difficulty === 'beginner', '✓ Difficulty switching works');

  // Test 2: localStorage persistence
  const g2 = new TicTacToe();
  g2.ai.q.set('test-state', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  g2.saveState();
  const g3 = new TicTacToe();
  console.assert(g3.ai.q.has('test-state'), '✓ localStorage persistence works');

  // Test 3: Minimax never loses
  const g4 = new TicTacToe();
  g4.setDifficulty('expert');
  let expertLosses = 0;
  for (let i = 0; i < 100; i++) {
    g4.reset();
    while (!g4.gameOver) {
      const available = g4.getAvailable();
      const move = available[~~(Math.random() * available.length)];
      g4.move(move, 'X');
      if (!g4.gameOver) g4.aiMove();
    }
    const winner = g4.checkWinner();
    if (winner?.winner === 'X') expertLosses++;
  }
  console.assert(expertLosses === 0, '✓ Expert AI never loses');

  console.log('✅ All tests passed!');
}
```

How these tests work:

1. **Difficulty switching:** The first test creates a game instance, sets the difficulty, and asserts that the AI's internal property was updated correctly.
2. **Persistence:** The second test simulates saving the AI's state. It adds a dummy entry to the Q-table, saves it, creates a *new* game instance (simulating a page reload), and asserts that the new instance successfully loaded the saved data.
3. **Expert mode correctness:** The third and most rigorous test plays 100 games against the expert AI using random moves for the player. It then asserts that the expert AI never lost a single game, proving the minimax implementation is correct.
    

You can run these tests in your browser's console after loading the game as shown in the below screenshot.

![Running tests](https://cdn.hashnode.com/res/hashnode/image/upload/v1759790825366/aedc84b7-5399-4067-bf2c-b0b488192c62.png)

---

## Advanced Optimizations and Extensions

Now that you have the complete implementation, here are ways to extend it further:

### How to Implement Symmetry Reduction

You can reduce the state space by recognizing equivalent board positions:

```js
getCanonicalState(s) {
  const transforms = [
    s, this.rot90(s), this.rot180(s), this.rot270(s),
    this.flip(s), this.flip(this.rot90(s)), 
    this.flip(this.rot180(s)), this.flip(this.rot270(s))
  ];
  return transforms.sort()[0];
}

rot90(s) {
  const b = s.split('');
  return [b[6],b[3],b[0],b[7],b[4],b[1],b[8],b[5],b[2]].join('');
}

rot180(s) {
  return s.split('').reverse().join('');
}

rot270(s) {
  const b = s.split('');
  return [b[2],b[5],b[8],b[1],b[4],b[7],b[0],b[3],b[6]].join('');
}

flip(s) {
  const b = s.split('');
  return [b[2],b[1],b[0],b[5],b[4],b[3],b[8],b[7],b[6]].join('');
}
```

This symmetry reduction technique speeds up AI learning by recognizing equivalent board positions.

**How it works:**

- **getCanonicalState()**: Generates all 8 symmetric versions of a board state (4 rotations + 4 flipped versions) and returns the alphabetically first one as the standard representation
- **rot90()**: Rotates board 90° clockwise by remapping position indices
- **rot180()**: Rotates 180° by reversing the board array
- **rot270()**: Rotates 270° clockwise (or 90° counterclockwise)
- **flip()**: Mirrors the board horizontally
    

**Why this matters:** By storing only canonical states in the Q-table, the AI reduces unique positions from ~5,500 to ~700, making learning **8x faster**.

**Example:** These boards are considered identical:

```sh
X-- --- --X
--- = --- = ---
--- --- ---
(original) (180° rotation) (horizontal flip)
```

All three map to the same canonical state, so the AI only needs to learn one instead of three.

Modify `getQ()` to use canonical states. This reduces learning time by 8x since the AI recognizes rotated and flipped positions as equivalent.

### How to Add Export and Import Functionality

You can also let users share trained AI models:

```js
exportAI() {
  const data = {
    q: Array.from(this.ai.q.entries()),
    stats: this.stats,
    difficulty: this.ai.difficulty,
    timestamp: Date.now()
  };

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tictactoe-ai-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

importAI(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      this.ai.q = new Map(data.q);
      this.stats = data.stats;
      this.ai.difficulty = data.difficulty;
      this.updateStats();
      this.setStatus('✓ AI imported successfully!');
    } catch (err) {
      this.setStatus('✗ Import failed: Invalid file');
    }
  };
  reader.readAsText(file);
}
```

These methods enable sharing trained AI models between users. The `exportAI()` method packages the complete AI state (Q-table, statistics, difficulty, and timestamp) into a JSON object, creates a Blob from the JSON string, generates a temporary download URL, programmatically creates and clicks a download link, then cleans up the URL. The filename includes a timestamp for version tracking.

The `importAI()` method uses FileReader to asynchronously read an uploaded JSON file, parses it, reconstructs the Map from the array of entries, restores all game state, and updates the display. Error handling catches invalid JSON or corrupted files.

### How to Add Q-Value Heatmap Visualization

Here’s how you can visualize the AI's decision-making:

```js
drawQValueHeatmap() {
  const state = this.board;
  const qValues = this.ai.getQ(state);
  const available = this.getAvailable();

  if (available.length === 0) return;

  const maxQ = Math.max(...available.map(i => qValues[i]));
  const minQ = Math.min(...available.map(i => qValues[i]));
  const range = maxQ - minQ || 1;

  this.ctx.globalAlpha = 0.3;
  for (const i of available) {
    const normalized = (qValues[i] - minQ) / range;
    const row = ~~(i / 3);
    const col = i % 3;

    // Green for high Q-values, red for low
    const hue = normalized * 120;
    this.ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
    this.ctx.fillRect(
      col * this.cellSize + 5,
      row * this.cellSize + 5,
      this.cellSize - 10,
      this.cellSize - 10
    );

    // Draw Q-value
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = '#000';
    this.ctx.font = '14px monospace';
    this.ctx.fillText(
      qValues[i].toFixed(2),
      col * this.cellSize + 10,
      row * this.cellSize + 25
    );
  }
  this.ctx.globalAlpha = 1;
}
```

This visualization method creates a color-coded heatmap showing the AI's confidence in each available move.

It first retrieves Q-values for the current state and finds the min/max values among available positions to normalize the data. For each empty cell, it calculates a normalized score (0 to 1), converts it to a hue value (0° red for low values, 120° green for high values) using HSL color space, and fills the cell with a semi-transparent colored rectangle. It then overlays the actual Q-value as text for precise inspection.

This gives you instant visual feedback about which moves the AI considers most promising. Green cells are good moves, red cells are poor moves.

---

## Common Pitfalls and Solutions

### Issue 1: AI Does Not Improve

- **Cause**: The learning rate is too low or there hasn't been enough training.
- **Solution**: Increase the learning rate to between 0.2 and 0.3, and train for more than 2000 games.
    

### Issue 2: AI Makes Random Moves

- **Cause**: The exploration rate is too high after training.
- **Solution**: Reduce the exploration rate to 0.01 once training is complete.
    

### Issue 3: Slow Performance

- **Cause**: The state representation or Q-table lookup is inefficient.
- **Solution**: Use a Map instead of objects and implement state caching.
    

### Issue 4: AI Overfits to One Strategy

- **Cause**: There isn't enough exploration during training.
- **Solution**: Begin with a high exploration rate (ε=0.5) and gradually decrease it.
    

---

## How to Extend This to Other Games

This framework adapts to other games:

- **Connect Four**: 42-character state, 7 actions (columns)
- **Blackjack**: State includes hand values and dealer card
- **Snake**: Continuous states require function approximation
    

---

## Conclusion

You have built a complete reinforcement learning system in JavaScript. This project demonstrates:

- Core RL concepts with practical implementation
- Clean, maintainable code architecture
- Real-time training and visualization
- Advanced techniques like epsilon decay and self-play
- Three difficulty levels from beginner to expert
- Data persistence with localStorage
- Interactive tooltips for learning
    

The Q-learning foundation you have implemented powers more advanced techniques like Deep Q-Networks (DQN) used in modern game AI.

---

## Next Steps

Here are some ways to continue learning:

1. Add more difficulty levels with custom parameters
2. Implement state persistence with IndexedDB for larger Q-tables
3. Create multiplayer mode with AI observation
4. Build a neural network version with TensorFlow.js
5. Extend to Connect Four or Chess endgames
    

### Resources for Further Learning

- [Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book.html) by Sutton and Barto (free online textbook)
- [OpenAI Spinning Up](https://spinningup.openai.com/) – comprehensive RL resource
- [Deep RL Bootcamp](https://sites.google.com/view/deep-rl-bootcamp/) – Berkeley video lectures
- [Stable-Baselines3 Documentation](https://stable-baselines3.readthedocs.io/) – production RL implementations

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Adaptive Tic-Tac-Toe AI with Reinforcement Learning in JavaScript",
  "desc": "Reinforcement learning (RL) is one of the most powerful paradigms in artificial intelligence. Unlike supervised learning where you train models on labeled datasets, RL agents learn through direct interaction with their environment, receiving rewards ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-adaptive-tic-tac-toe-ai-with-reinforcement-learning-in-javascript/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
