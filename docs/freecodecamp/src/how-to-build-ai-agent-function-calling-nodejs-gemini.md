---
lang: en-US
title: "How to Build an AI Agent with Function Calling in Node.js Using Google Gemini"
description: "Article(s) > How to Build an AI Agent with Function Calling in Node.js Using Google Gemini"
icon: fa-brands fa-js
category:
  - Node.js
  - Express.js
  - AI
  - LLM
  - Google
  - Google Gemini
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Agent with Function Calling in Node.js Using Google Gemini"
    - property: og:description
      content: "How to Build an AI Agent with Function Calling in Node.js Using Google Gemini"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agent-function-calling-nodejs-gemini.html
prev: /programming/js/articles/README.md
date: 2026-07-25
isOriginal: false
author:
  - name: Zia Ullah
    url: https://freecodecamp.org/news/author/ziaullahzia/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef2a5058-558c-4951-abff-4d51f1c5cd15.png
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
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI Agent with Function Calling in Node.js Using Google Gemini"
  desc="Last year, a client asked me to add a conversational interface to their internal reporting tool. Staff would type a question, and the system would pull a live answer from the database. I had the first"
  url="https://freecodecamp.org/news/how-to-build-ai-agent-function-calling-nodejs-gemini"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef2a5058-558c-4951-abff-4d51f1c5cd15.png"/>

Last year, a client asked me to add a conversational interface to their internal reporting tool. Staff would type a question, and the system would pull a live answer from the database.

I had the first version running in a day. Single questions worked. But a week in, a tester typed: "What is the weather in Berlin, and how much would 500 EUR convert to in USD right now?"

The model called the weather function, returned that answer, and ignored the second half of the question entirely.

That is the gap between a chatbot and an agent. A chatbot works from training data. That's its limit. An agent doesn't have that limit. It calls a tool, reads what came back, and decides whether to keep going.

Most questions resolve in one or two tool calls. Multi-step ones take a few more. Remove that loop, and they all break.

This tutorial shows you how to build that loop with Google Gemini's function calling API and Node.js. You'll build an agent that can call real external tools: Open-Meteo for live weather, frankfurter.app for live currency rates, and a math evaluator for calculations. All three are completely free. The only API key you need is Gemini, which is also free on Google AI Studio at 1,500 requests per day.

::: info

Everything is on GitHub: [<VPIcon icon="iconfont icon-github"/>`ziaongit/nodejs-gemini-agent`](https://github.com/ziaongit/nodejs-gemini-agent).

<SiteInfo
  name="ziaongit/nodejs-gemini-agent"
  desc="Contribute to ziaongit/nodejs-gemini-agent development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-gemini-agent/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ebe71b97c62cc3210bd352c39757b3c62b249caca5cc2b252522f99b85e6fc03/ziaongit/nodejs-gemini-agent"/>

:::

---

## How Function Calling Works

Most LLM tutorials show function calling as: define a function, the model calls it, done. That framing skips the part that actually matters.

The model doesn't call your function. It can't. What happens is more like a negotiation.

You send the model a message along with a list of tool descriptions. Each description is a JSON schema: the function name, what it does, and what arguments it needs. Gemini reads those at request time to decide which tool, if any, fits what the user asked.

Here's the part that surprises people. Gemini doesn't run your code. It sends back a structured object that says: call `get_weather`, `city = Berlin`. Your code picks that up, runs the actual function, and sends the result back. Gemini checks whether that's enough to answer. If not, it requests another tool.

That exchange is the loop:

```plaintext
User message
      │
      ▼
Model + tool schemas
      │
      ▼
Response: functionCall?
      │
   YES │                          NO
      ▼                            ▼
Run the function(s)         Return text answer
      │
      ▼
Send result(s) back to model
      │
      └──── loop back ────────────┘
```
<!-- TODO: mermaid화 -->

The loop keeps running until the model decides it has enough to answer. That's what allows it to chain calls: check the weather, see the temperature is above 25°C, then decide it should also fetch the exchange rate before answering.

There's one detail that trips people up the first time. When Gemini requests multiple tools in the same response, you run all of them and return all results in a single message. Returning them one at a time in separate messages breaks the model's turn-tracking and produces unreliable output.

---

## What We're Building

In this tutorial, we'll build an AI agent with three working tools:

- `get_weather` — fetches current weather for any city via Open-Meteo (free, no API key)
- `calculate` — evaluates a math expression safely in JavaScript
- `get_exchange_rate` — fetches live currency rates via frankfurter.app (free, no API key)

There are two ways to run it: a readline CLI for quick local testing, and an Express HTTP endpoint to wire into a real application.

Full tech stack:

- **Node.js 20**: runtime (Node 18 minimum for native fetch)
- **@google/generative-ai**: official Gemini SDK
- **dotenv**: environment variable loading
- **Express**: HTTP server for the API endpoint
- **Open-Meteo API**: free weather and geocoding, no key required
- **frankfurter.app**: free currency exchange rates, no key required

Architecture:

```plaintext
┌─────────────────────────────────────────────────┐
│                   Client                         │
│         CLI (readline) / HTTP POST               │
└──────────────────────┬──────────────────────────┘
                       │  user message
                       ▼
┌─────────────────────────────────────────────────┐
│               agent.js — Agentic Loop            │
│                                                  │
│  1. Send message + tool schemas to Gemini        │
│  2. Receive response                             │
│  3. functionCalls() present?                     │
│      YES → execute tools in parallel             │
│            send all results back                 │
│            go to step 2                          │
│      NO  → return final text answer              │
└──────────────────────┬──────────────────────────┘
                       │  tool calls
                       ▼
┌─────────────────────────────────────────────────┐
│                  Tool Handlers                   │
│                                                  │
│  get_weather(city)                               │
│    └─► geocoding-api.open-meteo.com              │
│        api.open-meteo.com                        │
│                                                  │
│  calculate(expression)                           │
│    └─► JS safe evaluator (no external call)      │
│                                                  │
│  get_exchange_rate(from, to, amount?)            │
│    └─► api.frankfurter.app                       │
└─────────────────────────────────────────────────┘
```
<!-- TODO: mermaid화 -->

---

## Prerequisites

Before you start, you should have:

- Node.js 18 or higher — run `node --version` to check
- A Gemini API key from [<VPIcon icon="iconfont icon-gemini"/>aistudio.google.com](https://aistudio.google.com) — free, no card. The free tier gives you 1,500 requests a day.
- You should also know how `async/await` works in Node.js. That's about it.

---

## Project Setup

```sh
mkdir nodejs-gemini-agent && cd nodejs-gemini-agent
npm init -y
npm install @google/generative-ai dotenv express
mkdir src
```

Add a <VPIcon icon="iconfont icon-git"/>`.gitignore`, as you don't want <VPIcon icon="iconfont icon-dotenv"/>`.env` in your repo:

```sh title="file structure"
node_modules/
.env
```

Drop a <VPIcon icon="iconfont icon-dotenv"/>`.env` at the root:

```sh title=".env"
GEMINI_API_KEY=your_api_key_here
PORT=3000

# Optional: override the default model (gemini-2.0-flash)
# Uncomment if you hit free-tier quota limits
# GEMINI_MODEL=gemini-2.0-flash-lite
```

Project structure:

```sh title="file structure"
nodejs-gemini-agent/
├── src/
│   ├── tools.js        ← tool schemas for Gemini
│   ├── functions.js    ← actual implementations
│   ├── agent.js        ← the agentic loop
│   ├── index.js        ← CLI entry point
│   └── server.js       ← Express HTTP server
├── .env
├── .env.example
├── .gitignore
└── package.json
```

---

## Defining the Tools

Gemini can't see your code. It picks tools based entirely on the JSON schemas you pass in. Each schema has a name, a description, and the parameter definitions.

The description is what drives routing. Gemini reads it at request time to decide which tool fits the user's question. Focus on when to call the function, not just what it does.

```js :collapsed-lines title="tools.js"
const toolDefinitions = [
  {
    name: 'get_weather',
    description:
      'Get the current weather for a city. Returns temperature in Celsius, ' +
      'humidity percentage, and wind speed. Use this when the user asks about ' +
      'weather, temperature, or climate conditions in any location.',
    parameters: {
      type: 'OBJECT',
      properties: {
        city: {
          type: 'STRING',
          description: 'The city name, e.g. Tokyo, London, New York',
        },
      },
      required: ['city'],
    },
  },
  {
    name: 'calculate',
    description:
      'Evaluate a mathematical expression and return the numeric result. ' +
      'Use this for arithmetic, percentage calculations, or any numeric computation ' +
      'the user asks for. Do not guess at math — always call this tool.',
    parameters: {
      type: 'OBJECT',
      properties: {
        expression: {
          type: 'STRING',
          description:
            'A valid mathematical expression, e.g. "47.50 * 0.18" or "1500 / 12"',
        },
      },
      required: ['expression'],
    },
  },
  {
    name: 'get_exchange_rate',
    description:
      'Get the current exchange rate between two currencies. Can also convert ' +
      'a specific amount. Use this when the user asks about currency conversion, ' +
      'exchange rates, or how much a foreign currency amount is worth.',
    parameters: {
      type: 'OBJECT',
      properties: {
        from: {
          type: 'STRING',
          description: 'The source currency code, e.g. USD, EUR, JPY, GBP',
        },
        to: {
          type: 'STRING',
          description: 'The target currency code, e.g. USD, EUR, JPY, GBP',
        },
        amount: {
          type: 'NUMBER',
          description:
            'Amount to convert. Optional — defaults to 1 if not provided.',
        },
      },
      required: ['from', 'to'],
    },
  },
];

module.exports = { toolDefinitions };
```

Vague descriptions work most of the time. The problems show up at the edges. "Does currency stuff" routes fine on a simple question. It falls apart on anything ambiguous. "Get the current exchange rate between two currencies. Use this when the user asks about currency conversion." holds up. The extra words cost basically nothing. Debugging bad routing costs a lot more.

---

## Implementing the Tool Functions

These are the actual functions that run when the model requests them. Each receives the arguments the model decided to pass, does real work, and returns a plain JavaScript object.

```js :collapsed-lines title="functions.js"
async function get_weather({ city }) {
  // Open-Meteo uses a two-step approach: geocode the city first, then fetch weather.
  // Both APIs are free with no key required.
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const geoRes  = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results?.length) {
    return { error: `City not found: ${city}` };
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

  const weatherRes  = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();
  const current     = weatherData.current;

  return {
    city:        `${name}, ${country}`,
    temperature: `${current.temperature_2m}°C`,
    humidity:    `${current.relative_humidity_2m}%`,
    wind_speed:  `${current.wind_speed_10m} km/h`,
  };
}

function calculate({ expression }) {
  try {
    // Strip anything that is not a number or basic operator before eval.
    // This is not a complete sandbox — use a proper math parser like mathjs
    // in production if expressions come from untrusted users.
    const safe = expression.replace(/[^0-9+-*/.() %]/g, '');
    if (!safe.trim()) return { error: 'Invalid or empty expression' };

    const result = Function('"use strict"; return (' + safe + ')')();
    return { expression, result };
  } catch {
    return { error: `Could not evaluate: ${expression}` };
  }
}

async function get_exchange_rate({ from, to, amount = 1 }) {
  const url  = `https://api.frankfurter.app/latest?from=${from.toUpperCase()}&to=${to.toUpperCase()}`;
  const res  = await fetch(url);
  const data = await res.json();

  if (data.error) return { error: data.error };

  const rate      = data.rates[to.toUpperCase()];
  if (!rate) return { error: `No rate found for ${from} → ${to}` };

  const converted = parseFloat((amount * rate).toFixed(4));

  return { from: from.toUpperCase(), to: to.toUpperCase(), rate, amount, converted };
}

module.exports = { get_weather, calculate, get_exchange_rate };
```

There are a few things worth pointing out here.

Open-Meteo uses geocoding before the weather fetch. Passing latitude and longitude directly to the weather endpoint is more reliable than a city name string, and the geocoding API handles misspellings reasonably well. There are two fetch calls, but that's the trade-off for accuracy.

The `calculate` function strips everything except digits and operators before evaluation. It narrows the injection risk, but it's not a real sandbox. If you expose this over HTTP with anonymous users, use a proper math parser like [<VPIcon icon="fas fa-globe"/>mathjs](https://mathjs.org).

Frankfurter converts currency codes to uppercase before the request. Users will type "usd" or "Usd" and both should work. The API is case-sensitive on its end.

---

## Building the Agentic Loop

This is the file everything else supports. The loop itself is about 20 lines. The rest is logging and error handling.

```js :collapsed-lines title="agent.js"
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { toolDefinitions }    = require('./tools');
const { get_weather, calculate, get_exchange_rate } = require('./functions');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Map tool names to handler functions
const toolHandlers = { get_weather, calculate, get_exchange_rate };

async function runAgent(userMessage) {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    tools: [{ functionDeclarations: toolDefinitions }],
  });

  const chat = model.startChat();

  console.log(`\nUser: ${userMessage}`);
  console.log('---');

  let response = await chat.sendMessage(userMessage);
  let iterations = 0;
  const MAX_ITERATIONS = 10; // safety cap against infinite loops

  // Agentic loop
  while (iterations < MAX_ITERATIONS) {
    iterations++;
    const calls = response.response.functionCalls();

    // No tool calls — model is done, return the answer
    if (!calls || calls.length === 0) break;

    // Run all requested tools, collect results
    const toolResults = await Promise.allSettled(
      calls.map(async (call) => {
        console.log(`Calling tool: ${call.name}(${JSON.stringify(call.args)})`);

        const handler = toolHandlers[call.name];

        if (!handler) {
          return {
            functionResponse: {
              name:     call.name,
              response: { error: `Unknown tool: ${call.name}` },
            },
          };
        }

        try {
          const result = await handler(call.args);
          console.log(`Tool result: ${JSON.stringify(result)}`);
          return {
            functionResponse: {
              name:     call.name,
              response: result,
            },
          };
        } catch (err) {
          return {
            functionResponse: {
              name:     call.name,
              response: { error: err.message },
            },
          };
        }
      })
    );

    // Extract values from allSettled (fulfilled only — errors already caught above)
    const parts = toolResults
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);

    // Send all results back to the model in one message
    response = await chat.sendMessage(parts);
  }

  return response.response.text();
}

module.exports = { runAgent };
```

The `MAX_ITERATIONS` cap isn't paranoia. A model can get into a loop if a tool keeps returning an error and the model keeps retrying. 10 iterations is more than enough for any real query. A complex multi-tool question typically resolves in two or three turns.

`Promise.allSettled` runs all requested tools in parallel rather than sequentially. When the model requests both weather and exchange rate in the same response, they fetch simultaneously. Individual tool failures get caught inside the map rather than letting one failure abort the others.

The logging is intentional. When you're building and testing an agent, watching the tool calls happen in real time tells you whether the routing is working. Production code would route these to a structured logger instead of console output, but the information is the same.

---

## The CLI Entry Point

`require('dotenv').config()` runs first so your API key loads before anything else. After that it's a standard readline loop: each line you type goes to `runAgent`, the response prints, and the loop waits for the next input.

```js :collapsed-lines title="index.js"
require('dotenv').config();
const readline     = require('readline');
const { runAgent } = require('./agent');

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {
  console.log('Gemini Agent — type your question, or "exit" to quit\n');

  while (true) {
    const input = await ask('You: ');
    if (input.toLowerCase() === 'exit') break;
    if (!input.trim()) continue;

    try {
      const answer = await runAgent(input);
      console.log(`\nAgent: ${answer}\n`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }

  rl.close();
}

main();
```

---

## Adding an Express HTTP Server

The CLI is useful for testing. For integrating into an app, you need an HTTP endpoint.

```js title="server.js"
require('dotenv').config();
const express      = require('express');
const { runAgent } = require('./agent');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/agent', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required and must be a string' });
  }

  try {
    const answer = await runAgent(message);
    res.json({ answer });
  } catch (err) {
    console.error('[agent error]', err.message);
    res.status(500).json({ error: 'Agent failed to process the request' });
  }
});

app.listen(PORT, () => {
  console.log(`Agent server running on http://localhost:${PORT}`);
});
```

Start it:

```sh
node src/server.js
```

Call it:

```sh
curl -X POST http://localhost:3000/agent \
-H "Content-Type: application/json" \
-d '{"message": "What is the weather in Paris?"}'
```

Response:

```json
{
  "answer": "The current weather in Paris, France is 19°C with 65% humidity and wind speeds of 12 km/h."
}
```

The POST body is a plain `{ message }` object. The response is a plain `{ answer }` string. The agent handles the rest.

---

## Testing the Agent

Start the CLI:

```sh
node src/index.js
```

The `You:` prompt comes from the readline in <VPIcon icon="fa-brands fa-js"/>`index.js`. The `User:` line and `---` separator are logged by <VPIcon icon="fa-brands fa-js"/>`agent.js` at the start of each run. This is the same logging discussed in the agentic loop section.

Single tool — weather:

```plaintext
You: What's the weather in Tokyo?

User: What's the weather in Tokyo?
---
Calling tool: get_weather({"city":"Tokyo"})
Tool result: {"city":"Tokyo, JP","temperature":"31°C","humidity":"72%","wind_speed":"8 km/h"}

Agent: The current weather in Tokyo, Japan is 31°C with 72% humidity and wind speeds of 8 km/h.
```

Two tools — chained reasoning:

```plaintext
You: What is the weather in Tokyo? If it's above 20°C, convert 10000 JPY to EUR.

User: What is the weather in Tokyo? If it's above 20°C, convert 10000 JPY to EUR.
---
Calling tool: get_weather({"city":"Tokyo"})
Tool result: {"city":"Tokyo, JP","temperature":"31°C","humidity":"72%","wind_speed":"8 km/h"}

Calling tool: get_exchange_rate({"from":"JPY","to":"EUR","amount":10000})
Tool result: {"from":"JPY","to":"EUR","rate":0.006,"amount":10000,"converted":60.0}

Agent: The current temperature in Tokyo is 31°C, which is above 20°C.
Converting 10,000 JPY to EUR at the current exchange rate gives approximately 60.00 EUR.
```

Notice what happened: the model called `get_weather`, read the result (31°C), applied the conditional logic from the user's question on its own, and then called `get_exchange_rate`. You didn't write any of that branching logic. The model handled it from the description alone.

Calculator:

```plaintext
You: How much is 18% tip on a $47.50 restaurant bill?

User: How much is 18% tip on a $47.50 restaurant bill?
---
Calling tool: calculate({"expression":"47.50 * 0.18"})
Tool result: {"expression":"47.50 * 0.18","result":8.55}

Agent: An 18% tip on a $47.50 bill is $8.55, making your total $56.05.
```

Three tools in one query:

```plaintext
You: What's the weather in London and Berlin? And what is 250 GBP in EUR?

User: What's the weather in London and Berlin? And what is 250 GBP in EUR?
---
Calling tool: get_weather({"city":"London"})
Calling tool: get_weather({"city":"Berlin"})
Calling tool: get_exchange_rate({"from":"GBP","to":"EUR","amount":250})
Tool result: {"city":"London, GB","temperature":"16°C","humidity":"78%","wind_speed":"20 km/h"}
Tool result: {"city":"Berlin, DE","temperature":"22°C","humidity":"55%","wind_speed":"14 km/h"}
Tool result: {"from":"GBP","to":"EUR","rate":1.17,"amount":250,"converted":292.5}

Agent: London is currently 16°C with 78% humidity and 20 km/h winds.
Berlin is warmer at 22°C with 55% humidity and lighter winds of 14 km/h.
250 GBP converts to approximately 292.50 EUR at the current exchange rate.
```

All three tools ran in parallel. `Promise.allSettled` is why. A sequential loop would have made three serial network requests. Parallel gives you the same result in roughly the time of the slowest single request.

---

## Troubleshooting

Here are a few common issues you might encounter, and how to fix them:

### 1. `[404 Not Found] models/gemini-1.5-flash is not found for API version v1beta`

The model name is outdated. Google deprecates older aliases over time. Swap it out for `gemini-2.0-flash` in <VPIcon icon="fa-brands fa-js"/>`agent.js`. To check what models your key can actually access, run:

```sh
node -e "
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const g = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
g.listModels().then(r => r.models.forEach(m => console.log(m.name)));
"
```

### 2. `[429 Too Many Requests] You exceeded your current quota`

The `gemini-2.0-flash` free tier caps you at 1,500 requests a day. Hit that and every call returns a 429 until midnight Pacific resets the counter.

The error names the quota ID directly. `GenerateRequestsPerDayPerProjectPerModel-FreeTier` means you hit the daily cap. `GenerateRequestsPerMinutePerProjectPerModel-FreeTier` means the per-minute rate.

For the per-minute limit, the error includes a `retryDelay` field. Wait that many seconds and retry. For the daily limit, the quota is per-project. All models under the same project share it.

There are three ways out:

- **New project** (fastest): head to [aistudio.google.com](https://aistudio.google.com), spin up a new project, grab a new API key, and swap it into <VPIcon icon="iconfont icon-dotenv"/>`.env`. You get a fresh quota immediately.
- **Enable billing**: billing-enabled projects get much higher limits while keeping the free usage tier. Set up at [aistudio.google.com](https://aistudio.google.com).
- **Wait**: resets daily at midnight Pacific.

Because <VPIcon icon="fa-brands fa-js"/>`agent.js` reads the model name from `process.env.GEMINI_MODEL`, you can also switch models without touching code. Add this to your <VPIcon icon="iconfont icon-dotenv"/>`.env` to test with a lighter model:

```plaintext
GEMINI_MODEL=gemini-2.0-flash-lite
```

Remove the line when your quota resets and the agent goes back to `gemini-2.0-flash`.

### 3. `Error: GEMINI_API_KEY is not set`

Nine times out of ten, `require('dotenv').config()` is either missing or buried below other requires. Drag it to the very top of <VPIcon icon="fa-brands fa-js"/>`index.js`. Your <VPIcon icon="iconfont icon-dotenv"/>`.env` also needs to live at the project root with your actual key in it, not `your_api_key_here`.

### 4. `GoogleGenerativeAIError: 400 INVALID_ARGUMENT`

Almost always a malformed tool schema. Gemini uses uppercase type strings: `'OBJECT'`, `'STRING'`, `'NUMBER'`. JSON Schema uses lowercase. Check your `parameters.type` values.

### 5. Model Answers Without Calling Any Tools

The description is too vague or the user's question doesn't match well enough for the model to route it. Add more context to the description about when the tool should be used. The phrase "use this when the user asks about X" directly improves routing accuracy.

### 6. `TypeError: fetch is not a function`

Node 17 and below don't have native `fetch`. It was added in Node 18. Run `node --version` to check yours.

If you can't upgrade, install it with `npm install node-fetch`. Every file that calls `fetch` then needs `const fetch = require('node-fetch')` as its first line.

### 7. Tool Works in Isolation but Agent Loop Doesn't Call it

The name in `toolDefinitions` must exactly match the key in `toolHandlers`. Case matters in JavaScript. `get_Weather` and `get_weather` are two different things.

### 8. Exchange Rate Returns `No rate found`

The currency code you passed isn't supported by frankfurter.app. The API covers ~30 major currencies. Check supported codes at [frankfurter.app](https://frankfurter.app/docs/).

---

## What to Build Next

The three tools here are a foundation. The loop works the same way regardless of how many tools you add.

**Database lookup tool:** A `search_products` function that queries your PostgreSQL table turns the agent into a product assistant. Point it at your catalog, and it can answer questions about availability, pricing, and specs without you writing any routing logic.

**Write tools:** `get_*` functions make the agent read-only. Add a `create_ticket` or `send_notification` function and the agent can take actions: file a support request, trigger a workflow, update a record. Once you add write tools, think carefully about **which queries should require confirmation before executing**.

**Memory across sessions:** Right now `model.startChat()` creates a fresh conversation on every call. Pass a `history` array when starting the chat and the model remembers prior turns. Store that history in PostgreSQL or Redis keyed to the user ID, and the agent carries context across sessions.

**Streaming responses:** For a UI that shows the answer as it types rather than waiting for the full response, replace `chat.sendMessage` with `chat.sendMessageStream`. The tool call loop stays the same. Only the final response delivery changes.

**Swap the model:** The `model` string in `getGenerativeModel` is the only thing that pins you to Gemini 2.0 Flash. `gemini-2.0-flash-lite` is lighter and faster for simpler queries. For stronger reasoning on complex tasks, run the `listModels` script from the Troubleshooting section to find the latest available models. The function calling interface is identical across all Gemini models, so swapping takes one line.

::: info

The full source code for this article is on GitHub at [<VPIcon icon="iconfont icon-github"/>`ziaongit/nodejs-gemini-agent`](https://github.com/ziaongit/nodejs-gemini-agent).

<SiteInfo
  name="ziaongit/nodejs-gemini-agent"
  desc="Contribute to ziaongit/nodejs-gemini-agent development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-gemini-agent/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ebe71b97c62cc3210bd352c39757b3c62b249caca5cc2b252522f99b85e6fc03/ziaongit/nodejs-gemini-agent"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Agent with Function Calling in Node.js Using Google Gemini",
  "desc": "Last year, a client asked me to add a conversational interface to their internal reporting tool. Staff would type a question, and the system would pull a live answer from the database. I had the first",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agent-function-calling-nodejs-gemini.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
