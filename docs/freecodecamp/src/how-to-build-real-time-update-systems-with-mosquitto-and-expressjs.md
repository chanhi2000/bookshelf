---
lang: en-US
title: "How to Build Real-Time Update Systems with MQTT and Express.js"
description: "Article(s) > How to Build Real-Time Update Systems with MQTT and Express.js"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Real-Time Update Systems with MQTT and Express.js"
    - property: og:description
      content: "How to Build Real-Time Update Systems with MQTT and Express.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-real-time-update-systems-with-mosquitto-and-expressjs.html
prev: /programming/js-express/articles/README.md
date: 2026-03-11
isOriginal: false
author:
  - name: David Aniebo
    url: https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f39f54d7-d39b-46aa-9046-9a88315369d4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Real-Time Update Systems with MQTT and Express.js"
  desc="Real-time updates are everywhere – like live sports scores, stock tickers, chat applications, and IoT dashboards. If you want to build systems that push data to users the moment it changes, you need t"
  url="https://freecodecamp.org/news/how-to-build-real-time-update-systems-with-mosquitto-and-expressjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f39f54d7-d39b-46aa-9046-9a88315369d4.png"/>

Real-time updates are everywhere – like live sports scores, stock tickers, chat applications, and IoT dashboards. If you want to build systems that push data to users the moment it changes, you need the right tools.

Message Queuing Telemetry Transport (MQTT) is a lightweight messaging protocol that excels at this. Combined with a broker like Mosquitto and a web framework like Express, you can build a production-ready real-time system in a single afternoon.

In this tutorial, you'll build a complete real-time football (soccer) sports update system from scratch. You'll create an admin interface for uploading scores and match details, a viewer interface for watching live updates, and a backend that uses MQTT to broadcast changes instantly to every connected client.

By the end of this guide, you'll understand how to integrate MQTT with Express, set up the Mosquitto broker, and deliver real-time data to web browsers using Server-Sent Events. You will have a working system that you can extend for production use.

::: info What You Will Learn

During this tutorial, you'll learn how to:

- Connect an Express server to an MQTT broker using the MQTT.js library
- Publish and subscribe to MQTT topics for real-time messaging
- Use Server-Sent Events to push MQTT messages to web browsers
- Build a REST application programming interface (API) for match and score management
- Create a simple admin interface for uploading match data
- Create a viewer interface that updates in real time without page refreshes

:::

::: note Prerequisites

Before you start, you should have:

- Node.js version 18 or later installed on your machine
- Basic familiarity with JavaScript, Express, and HTML
- A terminal or command line for running commands
- Docker installed (optional, for running Mosquitto in a container)

:::

If you don't have Node.js installed, you can download it from the official Node.js website.

---

## Understanding the Architecture

The system has three main parts:

1. **Admin interface** – A web page where you create matches, update scores, and add events such as goals and cards.
2. **Express server** – Receives HyperText Transfer Protocol (HTTP) requests from the admin, publishes data to MQTT, subscribes to MQTT topics, and streams updates to viewers via Server-Sent Events.
3. **Viewer interface** – A web page that connects to the server and displays live scores and events as they arrive.

::: info How the flow works

![Architecture-diagram](https://cdn.hashnode.com/uploads/covers/6904c2dbd42ef6b1f9e61c3e/e6d0b007-764d-41bf-8d05-9e37971bd78e.png)

When you submit a score update in the admin panel, the Express server publishes a message to the MQTT broker. The server also subscribes to those same topics. When a message arrives, the server forwards it to all connected viewers through Server-Sent Events. The viewers update their display without refreshing the page.

:::

---

## What is MQTT and Why Use It?

MQTT stands for Message Queuing Telemetry Transport. It's a lightweight, publish-subscribe messaging protocol designed for low bandwidth and unreliable networks. It's widely used in Internet of Things (IoT) applications, but it works well for any real-time system where you need to broadcast updates to many subscribers.

Here are some reasons to use MQTT for a sports update system:

- **Low overhead**: Messages are small and efficient, which helps when you have many clients.
- **Built-in Quality of Service (QoS)**: You can choose how many times a message is delivered (at most once, at least once, or exactly once).
- **Topic-based routing**: You organize messages by topic (for example, `sports/football/match/123`) so subscribers receive only what they need.
- **Broker-based**: A central broker (Mosquitto) handles all message distribution, so your application logic stays simple.

Mosquitto is a popular, open-source MQTT broker that's easy to install and configure.

### MQTT Topic Design

MQTT uses a hierarchical topic structure. For this project, the topics are:

- `sports/football/match/{id}`: One topic per match. When you publish the full match object here, any subscriber receives the complete state. This makes it easy to add new match fields later without changing the topic structure.
- `sports/football/scores`: A single topic for score-related notifications. Messages include a `type` field (`match_created` or `score_update`) so subscribers can handle them differently.
- `sports/football/events`: A topic for match events such as goals and cards. Subscribers receive `{ type: 'match_event', matchId, event }`.

The `#` wildcard in a subscription means "match this level and all levels below." So `sports/football/#` subscribes to every topic under `sports/football`, including `sports/football/match/abc123` and `sports/football/scores`. The `+` wildcard matches exactly one level. For example, `sports/+/match/#` would match any sport, not just football.

### Why Server-Sent Events Instead of WebSockets?

You might wonder why this tutorial uses Server-Sent Events (SSE) instead of WebSockets. Both can push data to the browser. The main difference:

- **Server-Sent Events**: One-way (server to client). Built on HTTP. Automatic reconnection in the browser. Simpler to implement. No extra libraries.
- **WebSockets**: Two-way. Requires a different protocol. More flexible but more complex.

For a sports score viewer, you only need server-to-client updates. The viewer never sends messages back over the same channel. Server-Sent Events is a better fit. If you later need the client to send commands (for example, to filter by league), you can add a separate HTTP API or switch to WebSockets.

---

## Project Setup

Start by creating a new folder for your project and initialize it with npm. The `mkdir` command creates the directory, `cd` moves into it, and `npm init -y` creates a <VPIcon icon="iconfont icon-json"/>`package.json` file with default values without prompting you for input.

```sh
mkdir mqtt-football-scores
cd mqtt-football-scores
npm init -y
```

Install the required dependencies. Each package serves a specific role in the application. Run this command in the project root directory.

```sh
npm i express cors mqtt uuid
```

- `express`: Web framework for the HTTP server and API. It provides routing, middleware, and static file serving.
- `cors`: Enables Cross-Origin Resource Sharing so your frontend can call the API from a different origin (for example, if you serve the HTML from a different port or domain).
- `mqtt`: MQTT client for Node.js. It handles connection, publish, subscribe, reconnection, and Quality of Service (QoS) flows.
- `uuid`: Generates unique identifiers (Universally Unique Identifiers) for matches and events. Each ID is practically unique across all systems.

Next, create the following folder structure. The <VPIcon icon="fas fa-folder-open"/>`server` folder holds the Node.js backend code. The <VPIcon icon="fas fa-folder-open"/>`public` folder holds the HTML, CSS, and client-side JavaScript that the browser loads. The <VPIcon icon="fas fa-folder-open"/>`routes` subfolder keeps the match-related route handlers separate from the main server file.

```sh title="file structure"
mqtt-football-scores/
├── server/
│   ├── index.js
│   ├── sse.js
│   └── routes/
│       └── matches.js
├── public/
│   ├── index.html
│   ├── admin.html
│   └── viewer.html
├── mosquitto.conf
├── docker-compose.yml
└── package.json
```

Add `"type": "module"` to your <VPIcon icon="iconfont icon-json"/>`package.json` so you can use JavaScript modules (import and export). The `type` field tells Node.js to treat `.js` files as ES modules, which allows you to use `import` and `export` syntax instead of CommonJS `require` and `module.exports`.

```json title="pacakge.json"
{
  "name": "mqtt-football-scores",
  "version": "1.0.0",
  "type": "module",
  "main": "server/index.js"
}
```

---

## How to Set Up the MQTT Broker

You need an MQTT broker running before the server can connect. You have three options.

### Option 1: Docker (Recommended)

Create a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file. This file defines a single service named `mosquitto` that runs the Eclipse Mosquitto 2 image. The `ports` directive maps port 1883 on your host to port 1883 in the container so your Express server can connect. The `volumes` directive mounts your local `mosquitto.conf` into the container so the broker uses your configuration. The `restart: unless-stopped` option ensures the container restarts automatically if it crashes or if you reboot your machine.

```yaml title="docker-compose.yml"
version: "3.8"

services:
  mosquitto:
    image: eclipse-mosquitto:2
    container_name: mqtt-football-mosquitto
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
    restart: unless-stopped
```

Create a <VPIcon icon="fas fa-gears"/>`mosquitto.conf` file. The `listener 1883` directive tells Mosquitto to listen on port 1883 for MQTT connections. The `protocol mqtt` specifies the standard MQTT protocol (as opposed to WebSocket). The `allow_anonymous true` setting permits connections without a username and password, which is fine for local development but should be disabled in production. The `log_dest stdout` and `log_type all` directives send all log output to the console so you can debug connection issues.

```plaintext title="mosquitto.conf"
listener 1883
protocol mqtt
allow_anonymous true
log_dest stdout
log_type all
```

Start the broker:

```sh
docker-compose up -d
```

### Option 2: Local Install

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

On macOS with Homebrew:

```sh
brew install mosquitto
mosquitto -c mosquitto.conf
```

@tab <VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="fa-brands fa-debian"/>

On Ubuntu or Debian:

```sh
sudo apt install mosquitto mosquitto-clients
sudo systemctl start mosquitto
```

:::

### Option 3: Public Test Broker

You can use the public test broker at `test.mosquitto.org` without installing anything. Set the environment variable when you start the server:

```sh
MQTT_BROKER=mqtt://test.mosquitto.org npm start
```

Note: The public broker is shared and not suitable for production. Use it only for development and testing.

---

## How to Build the Express Server

In this step, you'll create the main server that powers the real-time application. The Express server handles HTTP requests, serves static files like HTML and JavaScript, and acts as the bridge between the browser and the MQTT broker. It also provides endpoints that allow data to be sent and received in real time. Essentially, this server is the backbone of the application, enabling communication between all components.

Begin by creating the main server file at <VPIcon icon="fas fa-folder-open"/>`server/`<VPIcon icon="fa-brands fa-js"/>`index.js`:

```js :collapsed-lines title="server/index.js"
import express from 'express';
import cors from 'cors';
import mqtt from 'mqtt';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { matchRoutes } from './routes/matches.js';
import { setupSSE, addSSEClient } from './sse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

let mqttClient = null;

function connectMQTT() {
  mqttClient = mqtt.connect(MQTT_BROKER, {
    clientId: `football-scores-${uuidv4().slice(0, 8)}`,
    reconnectPeriod: 3000,
    connectTimeout: 10000,
  });

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker at', MQTT_BROKER);
    mqttClient.subscribe('sports/football/#', { qos: 1 }, (err) => {
      if (err) console.error('Subscribe error:', err);
    });
  });

  mqttClient.on('error', (err) => {
    console.error('MQTT error:', err.message);
  });

  mqttClient.on('close', () => {
    console.log('MQTT connection closed');
  });

  mqttClient.on('reconnect', () => {
    console.log('MQTT reconnecting...');
  });

  return mqttClient;
}

const mqttClientInstance = connectMQTT();
const { publishMatch, publishScoreUpdate, publishEvent, getMatches } = matchRoutes(mqttClientInstance);
setupSSE(mqttClientInstance);

app.get('/api/events', (req, res) => addSSEClient(res));
app.post('/api/matches', publishMatch);
app.patch('/api/matches/:id/score', publishScoreUpdate);
app.post('/api/matches/:id/events', publishEvent);
app.get('/api/matches', getMatches);

app.listen(PORT, () => {
  console.log(`Football Scores Server running at http://localhost:${PORT}`);
  console.log(`Admin (upload):  http://localhost:${PORT}/admin.html`);
  console.log(`Viewer:          http://localhost:${PORT}/viewer.html`);
});
```

::: info Here is what each part does:

- **Imports**: The `fileURLToPath` and `dirname` utilities replicate the `__dirname` variable that CommonJS provides, since ES modules don't have it. You need `__dirname` to build the path to the <VPIcon icon="fas fa-folder-open"/>`public` folder.
- **Environment variables**: `MQTT_BROKER` defaults to `mqtt://localhost:1883` so the server connects to a local Mosquitto instance. You can override it for Docker or a remote broker. `PORT` defaults to 3000.
- **Middleware**: `cors()` allows requests from any origin, which is useful during development. `express.json()` parses JSON request bodies. `express.static()` serves files from `public` so `/admin.html` and `/viewer.html` are available.
- **connectMQTT**: Creates an MQTT client with a unique client ID (required by the broker), a 3-second reconnect interval, and a 10-second connection timeout. On connect, it subscribes to `sports/football/#` with QoS 1. The `#` wildcard means "all topics under sports/football."
- **matchRoutes**: Returns the route handlers that create matches, update scores, and add events. Each handler publishes to MQTT and responds with JSON.
- **setupSSE**: Registers a listener on the MQTT client's `message` event. When a message arrives, it forwards the payload to all connected Server-Sent Events clients.
- **addSSEClient**: Called when a viewer opens `/api/events`. It sets the response headers for Server-Sent Events, flushes the headers so the connection stays open, and adds the response object to a set of active clients.
- **Routes**: The GET `/api/events` route establishes the Server-Sent Events stream. The POST, PATCH, and GET routes for matches delegate to the handlers from `matchRoutes`.

:::

The server serves static files from the <VPIcon icon="fas fa-folder-open"/>`public` folder, so your HTML pages are available at the root.

---

## How to Implement the Match Routes

In this step, you'll create the route handlers that manage matches, scores, and events. These routes allow the server to receive requests from the admin interface, update match data, and publish real-time updates to MQTT. They also store match information in memory so it can be retrieved and updated during the session.

Begin by creating the file at <VPIcon icon="fas fa-folder-open"/>`server/routes/`<VPIcon icon="fa-brands fa-js"/>`matches.js`:

```js :collapsed-lines title="server/routes/matches.js"
import { v4 as uuidv4 } from 'uuid';

const TOPIC_MATCH = 'sports/football/match';
const TOPIC_SCORES = 'sports/football/scores';
const TOPIC_EVENTS = 'sports/football/events';

const matches = new Map();

function publish(client, topic, payload, qos = 1) {
  if (!client?.connected) {
    console.warn('MQTT not connected, message not published');
    return false;
  }
  client.publish(topic, JSON.stringify(payload), { qos, retain: false });
  return true;
}

export function matchRoutes(mqttClient) {
  return {
    publishMatch: (req, res) => {
      const { homeTeam, awayTeam, league, venue, kickoff } = req.body;
      if (!homeTeam || !awayTeam) {
        return res.status(400).json({ error: 'homeTeam and awayTeam are required' });
      }

      const match = {
        id: uuidv4(),
        homeTeam,
        awayTeam,
        homeScore: 0,
        awayScore: 0,
        league: league || 'Premier League',
        venue: venue || 'TBD',
        kickoff: kickoff || new Date().toISOString(),
        status: 'scheduled',
        minute: 0,
        events: [],
        createdAt: new Date().toISOString(),
      };

      matches.set(match.id, match);

      const topic = `\({TOPIC_MATCH}/\){match.id}`;
      publish(mqttClient, topic, match);
      publish(mqttClient, TOPIC_SCORES, { type: 'match_created', match });

      res.status(201).json(match);
    },

    publishScoreUpdate: (req, res) => {
      const { id } = req.params;
      const { homeScore, awayScore, minute, status } = req.body;

      const match = matches.get(id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }

      if (homeScore !== undefined) match.homeScore = homeScore;
      if (awayScore !== undefined) match.awayScore = awayScore;
      if (minute !== undefined) match.minute = minute;
      if (status !== undefined) match.status = status;

      const topic = `\({TOPIC_MATCH}/\){id}`;
      publish(mqttClient, topic, match);
      publish(mqttClient, TOPIC_SCORES, {
        type: 'score_update',
        matchId: id,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        minute: match.minute,
        status: match.status,
      });

      res.json(match);
    },

    publishEvent: (req, res) => {
      const { id } = req.params;
      const { type, team, player, minute, description } = req.body;

      const match = matches.get(id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }

      const event = {
        id: uuidv4().slice(0, 8),
        type: type || 'goal',
        team,
        player: player || 'Unknown',
        minute: minute ?? match.minute,
        description: description || `\({type}: \){player}`,
        timestamp: new Date().toISOString(),
      };

      match.events.push(event);
      if (type === 'goal') {
        if (team === match.homeTeam) match.homeScore++;
        else if (team === match.awayTeam) match.awayScore++;
      }

      const topic = `\({TOPIC_MATCH}/\){id}`;
      publish(mqttClient, topic, match);
      publish(mqttClient, TOPIC_EVENTS, { type: 'match_event', matchId: id, event });

      res.status(201).json({ match, event });
    },

    getMatches: (req, res) => {
      const list = Array.from(matches.values()).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      res.json(list);
    },
  };
}
```

The routes use an in-memory `Map` to store matches. In production, you would replace this with a database such as PostgreSQL or MongoDB.

::: info Explanation of the key logic:

- **publish**: A helper that checks if the MQTT client is connected before publishing. If the broker is down, it logs a warning instead of throwing. The `retain: false` option means the broker doesn't store the last message for new subscribers.
- **publishMatch**: Validates that `homeTeam` and `awayTeam` are present. Creates a match object with default values for league, venue, kickoff, status, and events. Stores it in the Map, publishes to the match-specific topic and the scores topic, and returns the match with status 201 (Created).
- **publishScoreUpdate**: Looks up the match by ID. If not found, returns 404. Updates only the fields that are provided (using `!== undefined` so you can set a score to 0). Publishes the full match and a score_update notification.
- **publishEvent**: Creates an event object with a short unique ID. Pushes it to the match's events array. If the event type is `goal`, increments the home or away score based on the team. Publishes the updated match and an event notification.
- **getMatches**: Converts the Map to an array, sorts by `createdAt` descending (newest first), and returns the list as JSON.

:::

MQTT topics used:

- `sports/football/match/{id}`: Full match state. Used when a match is created or updated.
- `sports/football/scores`: Score change notifications. Used for match creation and score updates.
- `sports/football/events`: Match events such as goals and cards.

The `publish` function sends JavaScript Object Notation (JSON) payloads with QoS 1 (at least once delivery). MQTT defines three QoS levels: 0 (at most once), 1 (at least once), and 2 (exactly once). Level 1 ensures the broker will retry until the subscriber acknowledges the message, which reduces the chance of losing score updates if the connection drops briefly.

---

## How to Bridge MQTT to the Browser with Server-Sent Events

In this step, you'll create the Server-Sent Events (SSE) module that bridges MQTT messages to the browser. MQTT works over TCP and browsers cannot connect to it directly, so we use SSE as a lightweight HTTP-based streaming channel. SSE keeps an open connection and allows the server to push updates to connected browsers in real time. This is what enables viewers to see match updates instantly without refreshing.

Now create the file at <VPIcon icon="fas fa-folder-open"/>`server/`<VPIcon icon="fa-brands fa-js"/>`sse.js`:

```js :collapsed-lines title="server/sse.js"
const clients = new Set();

export function setupSSE(mqttClient) {
  if (!mqttClient) return;

  mqttClient.on('message', (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      const data = JSON.stringify({ topic, ...payload });
      clients.forEach((res) => {
        try {
          res.write(`data: ${data}\n\n`);
        } catch (e) {
          clients.delete(res);
        }
      });
    } catch (e) {
      console.error('SSE parse error:', e.message);
    }
  });
}

export function addSSEClient(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  clients.add(res);

  res.on('close', () => {
    clients.delete(res);
  });
}
```

::: info Explanation of each part:

- **clients Set**: A Set holds all active Server-Sent Events response objects. Using a Set makes it easy to add and remove clients without duplicates.
- **setupSSE**: Attaches a `message` listener to the MQTT client. When any message arrives on a subscribed topic, the callback runs. It parses the message payload (which is JSON), merges the topic into the payload with `{ topic, ...payload }`, and sends the result to every client. The Server-Sent Events format requires each message to be `data: {content}\n\n` (two newlines). The `forEach` loop catches write errors (for example, if a client disconnected) and removes the client from the set.
- **addSSEClient**: Sets the `Content-Type` header to `text/event-stream` so the browser treats the response as an event stream. The `Cache-Control: no-cache` and `Connection: keep-alive` headers prevent the browser or proxy from caching or closing the connection. The `X-Accel-Buffering: no` header disables buffering in Nginx, which can delay or block Server-Sent Events. The `flushHeaders` call sends the headers immediately so the connection is established. The `close` event handler removes the client when the client disconnects (closes the tab or navigates away).

:::

Server-Sent Events is one-way (server to client). For this use case, that is enough because viewers only need to receive updates, not send messages back over the same channel.

---

## How to Build the Admin Upload Interface

The admin interface is a single HTML page where match creators can create new matches, update scores, and add events such as goals or cards. It uses standard HTML forms so data can be submitted to the server, and JavaScript will later handle form submissions and dynamic updates. All the markup, styles, and script live in `public/admin.html`, which the Express server serves as a static page.

### Admin HTML Structure and Styles

The document starts with the standard HTML5 boilerplate. The `charset` and `viewport` meta tags ensure proper character encoding and responsive layout on mobile devices. The page loads the Outfit font from Google Fonts for a clean, modern look.

The Cascading Style Sheets (CSS) uses custom properties (variables) in the `:root` block so you can change the color scheme in one place. The `--bg` variable holds the dark background color, `--surface` for card backgrounds, `--accent` for the green accent color, and `--text-muted` for secondary text. The `.grid` class creates a two-column layout for form fields that collapses to one column on screens under 600 pixels wide. The `.toast` class positions the notification at the bottom-right and uses `transform` and `opacity` for a slide-in animation when the `.show` class is added.

Now create the file at <VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-html5"/>`admin.html`:

```html :collapsed-lines title="public/admin.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin - Football Scores Upload</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0f1419;
      --surface: #1a2332;
      --surface-hover: #243044;
      --accent: #00d26a;
      --accent-dim: #00a854;
      --text: #e8edf2;
      --text-muted: #8b9aab;
      --border: #2d3a4d;
      --danger: #ff4757;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 2rem;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }
    section {
      background: var(--surface);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group.full { grid-column: 1 / -1; }
    input, select {
      padding: 0.65rem 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg);
      color: var(--text);
      font-family: inherit;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-primary { background: var(--accent); color: var(--bg); }
    .btn-secondary { background: var(--surface-hover); color: var(--text); border: 1px solid var(--border); }
    .actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; }
    .badge { background: var(--accent); color: var(--bg); font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; font-weight: 600; }
    .viewer-link { margin-left: auto; color: var(--accent); text-decoration: none; font-weight: 500; }
    section h2 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-muted); }
    label { font-size: 0.85rem; font-weight: 500; color: var(--text-muted); }
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      color: var(--bg);
      background: var(--accent);
      transform: translateY(100px);
      opacity: 0;
      transition: transform 0.3s, opacity 0.3s;
      z-index: 100;
    }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast.error { background: var(--danger); }
    .match-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--bg);
      border-radius: 8px;
      margin-bottom: 0.5rem;
      border: 1px solid var(--border);
    }
    .match-score { font-size: 1.5rem; font-weight: 700; color: var(--accent); margin: 0 1rem; }
    .match-info { flex: 1; }
    .match-teams { font-weight: 600; font-size: 1rem; }
    .match-meta { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; }
    .match-actions { display: flex; gap: 0.5rem; }
    .match-actions button { padding: 0.5rem 1rem; font-size: 0.85rem; }
    .match-list { margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>⚽ Football Scores</h1>
      <span class="badge">Admin</span>
      <a href="/viewer.html" class="viewer-link">→ Open Viewer</a>
    </header>

    <section>
      <h2>Create New Match</h2>
      <form id="createMatch">
        <div class="grid">
          <div class="form-group">
            <label for="homeTeam">Home Team</label>
            <input type="text" id="homeTeam" placeholder="e.g. Manchester United" required>
          </div>
          <div class="form-group">
            <label for="awayTeam">Away Team</label>
            <input type="text" id="awayTeam" placeholder="e.g. Liverpool" required>
          </div>
          <div class="form-group">
            <label for="league">League</label>
            <input type="text" id="league" placeholder="e.g. Premier League" value="Premier League">
          </div>
          <div class="form-group">
            <label for="venue">Venue</label>
            <input type="text" id="venue" placeholder="e.g. Old Trafford">
          </div>
          <div class="form-group full">
            <label for="kickoff">Kickoff (ISO)</label>
            <input type="datetime-local" id="kickoff">
          </div>
        </div>
        <div class="actions">
          <button type="submit" class="btn-primary">Create Match</button>
        </div>
      </form>
    </section>

    <section>
      <h2>Update Score</h2>
      <form id="updateScore">
        <div class="grid">
          <div class="form-group full">
            <label for="scoreMatchId">Select Match</label>
            <select id="scoreMatchId" required>
              <option value="">-- Select match --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="homeScore">Home Score</label>
            <input type="number" id="homeScore" min="0" value="0">
          </div>
          <div class="form-group">
            <label for="awayScore">Away Score</label>
            <input type="number" id="awayScore" min="0" value="0">
          </div>
          <div class="form-group">
            <label for="minute">Minute</label>
            <input type="number" id="minute" min="0" placeholder="e.g. 67">
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status">
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="halftime">Halftime</option>
              <option value="finished">Finished</option>
            </select>
          </div>
        </div>
        <div class="actions">
          <button type="submit" class="btn-primary">Update Score</button>
        </div>
      </form>
    </section>

    <section>
      <h2>Add Match Event (Goal, Card, etc.)</h2>
      <form id="addEvent">
        <div class="grid">
          <div class="form-group full">
            <label for="eventMatchId">Select Match</label>
            <select id="eventMatchId" required>
              <option value="">-- Select match --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="eventType">Event Type</label>
            <select id="eventType">
              <option value="goal">Goal</option>
              <option value="yellow_card">Yellow Card</option>
              <option value="red_card">Red Card</option>
              <option value="substitution">Substitution</option>
              <option value="penalty">Penalty</option>
            </select>
          </div>
          <div class="form-group">
            <label for="eventTeam">Team</label>
            <input type="text" id="eventTeam" placeholder="e.g. Manchester United">
          </div>
          <div class="form-group">
            <label for="eventPlayer">Player</label>
            <input type="text" id="eventPlayer" placeholder="e.g. Marcus Rashford">
          </div>
          <div class="form-group">
            <label for="eventMinute">Minute</label>
            <input type="number" id="eventMinute" min="0" placeholder="e.g. 23">
          </div>
          <div class="form-group full">
            <label for="eventDesc">Description</label>
            <input type="text" id="eventDesc" placeholder="Optional description">
          </div>
        </div>
        <div class="actions">
          <button type="submit" class="btn-primary">Add Event</button>
        </div>
      </form>
    </section>

    <section>
      <h2>Active Matches</h2>
      <div class="match-list" id="matchList"></div>
    </section>
  </div>

  <div class="toast" id="toast"></div>
```

The three forms use `id` attributes (`createMatch`, `updateScore`, `addEvent`) so the JavaScript can attach submit handlers. The match dropdowns (`scoreMatchId` and `eventMatchId`) are populated dynamically when the page loads. The `matchList` div is the container for the list of active matches. The toast element sits outside the main container so it can be fixed to the viewport.

### Admin JavaScript Logic

The script block handles all interaction between the admin page and the server. It defines helper functions for showing notifications, fetching matches, updating the UI, and submitting data. When the page loads or after any action (create, update, or event submission), the UI refreshes so the latest match data is always visible.

```html :collapsed-lines title="public/admin.html"
  <script>
    const API = '/api';
    const toast = document.getElementById('toast');

    function showToast(msg, isError = false) {
      toast.textContent = msg;
      toast.className = 'toast show' + (isError ? ' error' : '');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    async function fetchMatches() {
      const res = await fetch(`${API}/matches`);
      return res.json();
    }

    function populateSelects(matches) {
      const opts = matches.map(m => `<option value="\({m.id}">\){m.homeTeam} vs ${m.awayTeam}</option>`).join('');
      const html = '<option value="">-- Select match --</option>' + opts;
      document.getElementById('scoreMatchId').innerHTML = html;
      document.getElementById('eventMatchId').innerHTML = html;
    }

    function renderMatchList(matches) {
      const list = document.getElementById('matchList');
      if (!matches.length) {
        list.innerHTML = '<p style="color: var(--text-muted);">No matches yet. Create one above.</p>';
        return;
      }
      list.innerHTML = matches.map(m => `
        <div class="match-card" data-id="${m.id}">
          <div class="match-info">
            <div class="match-teams">\({m.homeTeam} vs \){m.awayTeam}</div>
            <div class="match-meta">\({m.league} • \){m.status} • ${m.minute}'</div>
          </div>
          <div class="match-score">\({m.homeScore} - \){m.awayScore}</div>
          <div class="match-actions">
            <button class="btn-secondary" onclick="quickScore('\({m.id}', \){m.homeScore}, ${m.awayScore})">Update</button>
          </div>
        </div>
      `).join('');
    }

    function quickScore(id, h, a) {
      document.getElementById('scoreMatchId').value = id;
      document.getElementById('homeScore').value = h;
      document.getElementById('awayScore').value = a;
    }

    async function loadMatches() {
      const matches = await fetchMatches();
      populateSelects(matches);
      renderMatchList(matches);
    }

    document.getElementById('createMatch').onsubmit = async (e) => {
      e.preventDefault();
      const body = {
        homeTeam: document.getElementById('homeTeam').value.trim(),
        awayTeam: document.getElementById('awayTeam').value.trim(),
        league: document.getElementById('league').value.trim() || 'Premier League',
        venue: document.getElementById('venue').value.trim() || 'TBD',
        kickoff: document.getElementById('kickoff').value
          ? new Date(document.getElementById('kickoff').value).toISOString()
          : new Date().toISOString(),
      };
      try {
        const res = await fetch(`${API}/matches`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          showToast('Match created!');
          document.getElementById('createMatch').reset();
          loadMatches();
        } else showToast(data.error || 'Failed', true);
      } catch (err) {
        showToast('Network error', true);
      }
    };

    document.getElementById('updateScore').onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById('scoreMatchId').value;
      const body = {
        homeScore: parseInt(document.getElementById('homeScore').value, 10),
        awayScore: parseInt(document.getElementById('awayScore').value, 10),
        minute: parseInt(document.getElementById('minute').value, 10) || undefined,
        status: document.getElementById('status').value,
      };
      try {
        const res = await fetch(`\({API}/matches/\){id}/score`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          showToast('Score updated!');
          loadMatches();
        } else showToast(data.error || 'Failed', true);
      } catch (err) {
        showToast('Network error', true);
      }
    };

    document.getElementById('addEvent').onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById('eventMatchId').value;
      const body = {
        type: document.getElementById('eventType').value,
        team: document.getElementById('eventTeam').value.trim(),
        player: document.getElementById('eventPlayer').value.trim(),
        minute: parseInt(document.getElementById('eventMinute').value, 10) || undefined,
        description: document.getElementById('eventDesc').value.trim() || undefined,
      };
      try {
        const res = await fetch(`\({API}/matches/\){id}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          showToast('Event added!');
          loadMatches();
        } else showToast(data.error || 'Failed', true);
      } catch (err) {
        showToast('Network error', true);
      }
    };

    loadMatches();
  </script>
</body>
</html>
```

::: info Explanation of each part:

- `showToast`: updates the toast text and adds the show class to trigger the CSS animation. The isError parameter switches the toast to a red background for error messages. The setTimeout removes the show class after 3 seconds so the toast slides back out.
- `fetchMatches`: calls the GET /api/matches endpoint and returns the parsed JSON so the UI can display the latest data.
- `populateSelects`: builds option elements from the matches array and injects them into both dropdowns, so the same match list appears in the Update Score and Add Event forms.
- `renderMatchList`: either shows a placeholder when there are no matches or renders each match as a card with team names, scores, league, status, and an Update button.
- `quickScore`: pre-fills the Update Score form when you click the Update button on a match card, so you can adjust the score without re-selecting the match.
- `loadMatches`: fetches matches, populates the dropdowns, and renders the list. It runs on page load and after every successful create, update, or event submission.
- `onsubmit`: calls e.preventDefault() to stop the default form submission, builds a request body from the form values, sends a fetch request to the appropriate endpoint, and on success shows a toast and calls loadMatches to refresh the UI.

:::

---

## How to Build the Live Viewer Interface

The viewer interface displays real-time match updates and connects to the Server-Sent Events endpoint so it can receive data the moment the server pushes it.

Unlike the admin page, the viewer is read-only: it shows live scores, match events, and status updates without requiring user input. The page uses a dark theme and a connection indicator so users can see whether the real-time stream is active.

Now create the file at <VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-html5"/>`viewer.html`:

```html :collapsed-lines title="public/viewer.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Football Scores</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0e14;
      --surface: #131a24;
      --accent: #00d26a;
      --accent-glow: rgba(0, 210, 106, 0.3);
      --text: #e8edf2;
      --text-muted: #8b9aab;
      --border: #2d3a4d;
      --live: #ff4757;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 2rem;
    }
    .container { max-width: 700px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 2rem; }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--text-muted);
      animation: pulse 2s infinite;
    }
    .status-dot.connected {
      background: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .match-card {
      background: var(--surface);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .match-card.live {
      border-color: var(--live);
      box-shadow: 0 0 0 1px rgba(255, 71, 87, 0.2);
    }
    .match-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .league { 
      font-size: 0.8rem; 
      color: var(--text-muted); 
      margin-bottom: 0.25rem; 
    }
    .match-teams {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin: 1rem 0;
    }
    .team { flex: 1; text-align: center; font-weight: 600; font-size: 1.1rem; }
    .team.home { text-align: left; }
    .team.away { text-align: right; }
    .score-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      gap: 0.5rem;
    }
    .score { 
      font-size: 2rem; 
      font-weight: 700; 
      color: var(--accent); 
     }
    .status-badge { 
      font-size: 0.7rem; 
      padding: 0.2rem 0.5rem; 
      border-radius: 4px; 
      font-weight: 600; 
     }
    .status-badge.live { background: var(--live); color: white; }
    .status-badge.finished { background: var(--border); color: var(--text-muted); }
    .status-badge.scheduled { background: var(--accent); color: var(--bg); }
    .match-meta { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; }
    .events { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
    .events h4 { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; }
    .event { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; padding: 0.35rem 0; border-bottom: 1px solid var(--border); }
    .event:last-child { border-bottom: none; }
    .event-icon { width: 24px; text-align: center; font-size: 1rem; }
    .event.goal .event-icon { color: var(--accent); }
    .event.yellow_card .event-icon { color: #ffd93d; }
    .event.red_card .event-icon { color: var(--live); }
    .feed { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
    .feed h3 { font-size: 1rem; margin-bottom: 1rem; color: var(--text-muted); }
    .feed-item { font-size: 0.85rem; padding: 0.5rem 0; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .feed-item:last-child { border-bottom: none; }
    .feed-item strong { color: var(--text); }
    .empty { text-align: center; padding: 3rem 2rem; color: var(--text-muted); }
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>⚽ Live Football Scores</h1>
      <div class="status" id="status">
        <span class="status-dot" id="statusDot"></span>
        <span id="statusText">Connecting...</span>
      </div>
    </header>

    <div id="matches"></div>

    <div class="feed" id="feedSection">
      <h3>Live Feed</h3>
      <div id="feed"></div>
    </div>
  </div>
```

::: info Explanation of each part:

- `header`: displays the page title and a connection indicator so users know whether the real-time stream is active.
- `status dot`: a small circle that pulses while disconnected and turns green with a glow when the SSE connection is established.
- `matches container`: the div with id="matches" is where match cards will be rendered dynamically by JavaScript as data arrives.
- `feed section`: shows a chronological list of live updates so users can see recent events at a glance.
- `CSS theme`: uses dark colors and custom properties so the look can be adjusted in one place. The live badge and border styles highlight matches that are in progress.
- `Server-Sent Events integration`: JavaScript (added in the next step) will connect to /api/events and update this page whenever new data arrives.

:::

The header shows the title and a connection status indicator. The `matches` div is the container for match cards, populated by JavaScript. The `feed` div displays the live feed of recent updates.

### Viewer JavaScript Logic

The script powers the live viewer interface by maintaining an in-memory collection of matches and a feed of recent updates. It connects to the Server-Sent Events endpoint so data flows from the server to the browser in real time. When messages arrive, the page updates automatically to show the latest scores, events, and match details.

```html :collapsed-lines title="public/viewer.html"
  <script>
    const API = '/api';
    const matches = new Map();
    const feed = [];
    const MAX_FEED = 20;

    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const matchesEl = document.getElementById('matches');
    const feedEl = document.getElementById('feed');

    function setStatus(connected) {
      statusDot.classList.toggle('connected', connected);
      statusText.textContent = connected ? 'Live' : 'Reconnecting...';
    }

    function renderMatches() {
      const list = Array.from(matches.values()).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      if (!list.length) {
        matchesEl.innerHTML = `
          <div class="empty">
            <div class="empty-icon">⚽</div>
            <p>No matches yet. Updates will appear here in real-time.</p>
          </div>
        `;
        return;
      }
      matchesEl.innerHTML = list.map(m => `
        <div class="match-card \({m.status === 'live' ? 'live' : ''}" data-id="\){m.id}">
          <div class="match-header">
            <div>
              <div class="league">${m.league}</div>
              <div class="match-meta">\({m.venue} • \){m.kickoff ? new Date(m.kickoff).toLocaleString() : ''}</div>
            </div>
            <span class="status-badge \({m.status}">\){m.status}</span>
          </div>
          <div class="match-teams">
            <div class="team home">${m.homeTeam}</div>
            <div class="score-box">
              <span class="score">${m.homeScore}</span>
              <span>-</span>
              <span class="score">${m.awayScore}</span>
            </div>
            <div class="team away">${m.awayTeam}</div>
          </div>
          \({m.minute ? `<div class="match-meta">\){m.minute}'</div>` : ''}
          ${m.events?.length ? `
            <div class="events">
              <h4>Events</h4>
              ${m.events.map(e => `
                <div class="event ${e.type}">
                  <span class="event-icon">${getEventIcon(e.type)}</span>
                  <span>\({e.minute}' \){e.player} (\({e.team}) - \){e.description || e.type}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    function getEventIcon(type) {
      const icons = { goal: '⚽', yellow_card: '🟨', red_card: '🟥', substitution: '🔄', penalty: '⚽' };
      return icons[type] || '•';
    }

    function renderFeed() {
      const items = feed.slice(-MAX_FEED).reverse();
      feedEl.innerHTML = items.length
        ? items.map(f => `<div class="feed-item">${f}</div>`).join('')
        : '<div class="feed-item">Waiting for updates...</div>';
    }

    function addFeedItem(type, msg) {
      const time = new Date().toLocaleTimeString();
      feed.push(`<strong>\({time}</strong> | \){msg}`);
      if (feed.length > MAX_FEED) feed.shift();
      renderFeed();
    }

    function handleMessage(data) {
      if (data.match) {
        matches.set(data.match.id, data.match);
        renderMatches();
      }
      if (data.id && data.homeTeam && data.awayTeam) {
        matches.set(data.id, data);
        renderMatches();
      }
      if (data.type === 'match_created' && data.match) {
        addFeedItem('match', `New match: \({data.match.homeTeam} vs \){data.match.awayTeam}`);
      }
      if (data.type === 'score_update') {
        const m = matches.get(data.matchId);
        if (m) {
          m.homeScore = data.homeScore;
          m.awayScore = data.awayScore;
          m.minute = data.minute;
          m.status = data.status;
          matches.set(data.matchId, m);
          addFeedItem('score', `\({m.homeTeam} \){data.homeScore}-\({data.awayScore} \){m.awayTeam} (${data.minute || '?'}')`);
          renderMatches();
        }
      }
      if (data.type === 'match_event' && data.event) {
        const m = matches.get(data.matchId);
        if (m) {
          m.events = m.events || [];
          m.events.push(data.event);
          if (data.event.type === 'goal') {
            if (data.event.team === m.homeTeam) m.homeScore++;
            else if (data.event.team === m.awayTeam) m.awayScore++;
          }
          matches.set(data.matchId, m);
          addFeedItem('event', `\({data.event.type}: \){data.event.player} (\({data.event.team}) - \){data.event.minute}'`);
          renderMatches();
        }
      }
    }

    function handleSSEMessage(msg) {
      try {
        const data = JSON.parse(msg);
        if (data.topic && /^sports\/football\/match\/([^/]+)$/.test(data.topic) && data.id) {
          matches.set(data.id, data);
        }
        handleMessage(data);
      } catch (e) {}
    }

    function connectSSE() {
      const es = new EventSource(`${API}/events`);
      es.onopen = () => setStatus(true);
      es.onerror = () => {
        setStatus(false);
        es.close();
        setTimeout(connectSSE, 3000);
      };
      es.onmessage = (e) => handleSSEMessage(e.data);
    }

    async function loadInitial() {
      try {
        const res = await fetch(`${API}/matches`);
        const list = await res.json();
        list.forEach(m => matches.set(m.id, m));
        renderMatches();
      } catch (e) {
        matchesEl.innerHTML = '<div class="empty"><p>Could not load matches. Is the server running?</p></div>';
      }
    }

    loadInitial();
    connectSSE();
  </script>
</body>
</html>
```

::: info Explanation of each part

- The `matches Map`: stores match objects keyed by ID so updates can be applied efficiently without searching arrays.
- The `feed array`: keeps a small history of recent events (limited to MAX_FEED) so the live feed remains lightweight.
- `setStatus`: toggles the connected class on the status dot and updates the status text to “Live” or “Reconnecting…” so users know connection status.
- `renderMatches`: converts the Map to a sorted array (newest first). If there are no matches, it displays an empty state. Otherwise it renders cards showing league, venue, teams, scores, status badge, minute, and events.
- `getEventIcon`: returns an emoji for each event type so events are visually identifiable (goal, card, substitution, and so on).
- `renderFeed`: displays the live feed items or a placeholder message when no updates exist.
- `addFeedItem`: appends a timestamped message to the feed, keeps only the latest items, and re-renders the feed.
- `handleMessage`: processes incoming data. It updates the matches Map for full match objects, score updates, and match events. For score updates and goals it adjusts scores and adds feed items so the viewer reflects real-time changes.
- `handleSSEMessage`: parses the Server-Sent Events payload and forwards it to handleMessage. If the message contains a match topic and full match data, it stores it in the Map.
- `connectSSE`: creates an EventSource connection to /api/events. On open it marks the connection as live. On error it closes and retries after three seconds so transient network issues do not break the stream.
- `loadInitial`: fetches existing matches on page load so the viewer displays data even before real-time updates arrive.

:::

---

## How to Build the Home Page

The home page (<VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-html5"/>`index.html`) is a simple landing page that links to the viewer and admin interfaces. It uses a centered card layout with two buttons. The primary button (green) goes to the viewer, and the secondary button (outlined) goes to the admin. The page uses the same dark theme and Outfit font for consistency. There is no JavaScript – it's purely static HTML and CSS.

```html :collapsed-lines title="public/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Football Scores - MQTT Real-Time</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0e14;
      --surface: #131a24;
      --accent: #00d26a;
      --text: #e8edf2;
      --text-muted: #8b9aab;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      background: var(--surface);
      border-radius: 16px;
      padding: 2rem;
      max-width: 400px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.06);
    }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; }
    .links { display: flex; flex-direction: column; gap: 0.75rem; }
    a {
      display: block;
      padding: 1rem 1.5rem;
      background: var(--accent);
      color: var(--bg);
      text-decoration: none;
      font-weight: 600;
      border-radius: 10px;
      transition: opacity 0.2s;
    }
    a:hover { opacity: 0.9; }
    a.secondary {
      background: transparent;
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.15);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚽ Football Scores</h1>
    <p>Real-time updates via MQTT & Mosquitto</p>
    <div class="links">
      <a href="/viewer.html">View Live Scores</a>
      <a href="/admin.html" class="secondary">Admin - Upload Scores</a>
    </div>
  </div>
</body>
</html>
```

The Express server serves `index.html` when you visit the root URL (`http://localhost:3000/`) because the `express.static` middleware serves files from the <VPIcon icon="fas fa-folder-open"/>`public` folder, and Express automatically serves `index.html` when the request path is `/`.

---

## How to Run and Test the System

Start the MQTT broker (Docker or local install).

Then start the Express server:

```sh
npm start
```

Next, open `http://localhost:3000/admin.html` in the admin panel. Create a new match (for example, Manchester United vs Liverpool).

Open `http://localhost:3000/viewer.html` in another tab or window. Then update the score or add an event in the admin panel. The viewer should update within a second without refreshing.

---

## How to Extend the System for Production

The current implementation uses in-memory storage. For production, you should:

- **Add a database**: Store matches in PostgreSQL, MongoDB, or another database. Load matches on startup and persist every create, update, and event.
- **Add authentication**: Protect the admin routes with JSON Web Tokens (JWT) or session-based auth so only authorized users can upload scores.
- **Add validation**: Validate request bodies with a library such as Joi or Zod to prevent invalid data.
- **Enable TLS**: Use HTTPS for the Express server and secure WebSockets or MQTTS for the broker in production.
- **Scale horizontally**: If you run multiple server instances, each will have its own MQTT connection and SSE clients. The MQTT broker will deliver messages to all subscribers, so each instance will receive updates and forward them to its connected viewers.

---

## API Reference

For quick reference, here are the endpoints your server exposes:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/matches` | Returns all matches as a JSON array |
| POST | `/api/matches` | Creates a new match. Body: `{ homeTeam, awayTeam, league?, venue?, kickoff? }` |
| PATCH | `/api/matches/:id/score` | Updates a match score. Body: `{ homeScore?, awayScore?, minute?, status? }` |
| POST | `/api/matches/:id/events` | Adds an event. Body: `{ type?, team, player?, minute?, description? }` |
| GET | `/api/events` | Server-Sent Events stream for real-time updates |

The `status` field can be `scheduled`, `live`, `halftime`, or `finished`. The `type` field for events can be `goal`, `yellow_card`, `red_card`, `substitution`, or `penalty`.

---

## Troubleshooting

You might come across various issues as you build this. Here are some common ones:

**The server cannot connect to the MQTT broker.** Check that Mosquitto is running. If you use Docker, run `docker ps` to verify the container is up. If you use the public broker, ensure you have internet connectivity and that your firewall allows outbound connections on port 1883. **The viewer does not update when you change scores.** Open the browser developer tools and check the Network tab. The `/api/events` request should show a pending state (it stays open). If it fails or closes, check the server logs for errors. Ensure you are not behind a proxy that buffers or closes long-lived connections.

**Matches disappear when you restart the server.** The current implementation stores matches in memory. Restarting the server clears the data. Add a database as described in the production section to persist matches across restarts.

---

## Conclusion

In this tutorial, you built a real-time football sports update system using MQTT, Mosquitto, and Express. You've learned how to:

- Connect an Express server to an MQTT broker
- Publish match and score updates to MQTT topics
- Subscribe to topics and forward messages to browsers via Server-Sent Events
- Build an admin interface for creating matches and updating scores
- Build a viewer interface that displays live updates without page refreshes

The same pattern applies to other real-time systems: IoT dashboards, live notifications, collaborative editing, and more. MQTT gives you a reliable, scalable messaging layer, and Server-Sent Events gives you a simple way to push updates to web clients.

The code in this tutorial gives you a solid foundation. Try adding features such as match filtering by league, historical event logs, or push notifications to make the system your own.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Real-Time Update Systems with MQTT and Express.js",
  "desc": "Real-time updates are everywhere – like live sports scores, stock tickers, chat applications, and IoT dashboards. If you want to build systems that push data to users the moment it changes, you need t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-real-time-update-systems-with-mosquitto-and-expressjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
