---
lang: en-US
title: "How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers"
description: "Article(s) > How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers"
icon: fa-brands fa-node
category:
  - Node.js
  - DevOps
  - Cloudflare
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - devops
  - cloudflare
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers"
    - property: og:description
      content: "How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers.html
prev: /devops/cloudflare/articles/README.md
date: 2026-01-06
isOriginal: false
author:
  - name: Mayur Vekariya
    url : https://freecodecamp.org/news/author/mayur9210/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767626158079/0b9e58c9-9299-4342-8c97-1a2de185cc60.png
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
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers"
  desc="Have you ever wanted to add an AI-powered chatbot to your website, like Intercom or Drift, without paying high monthly fees? In this tutorial, you'll learn how to build a fully functional, embeddable AI chatbot widget using Cloudflare's serverless st..."
  url="https://freecodecamp.org/news/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767626158079/0b9e58c9-9299-4342-8c97-1a2de185cc60.png"/>

Have you ever wanted to add an AI-powered chatbot to your website, like Intercom or Drift, without paying high monthly fees? In this tutorial, you'll learn how to build a fully functional, embeddable AI chatbot widget using Cloudflare's serverless stack.

You will build a production-ready AI chatbot widget that you can embed on any website with a single script tag. It’ll be similar to Intercom or Drift – but it’s completely free and under your control.

By the end, you will have a chatbot that:

- Streams AI responses in real-time for a natural typing effect
- Answers questions from your FAQ using RAG (Retrieval Augmented Generation)
- Remembers conversations across page reloads
- Supports dark and light modes
- Works on any website with one line of code

::: note Prerequisites

Before you start, make sure you have:

- A [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare account](https://dash.cloudflare.com/sign-up) (the free tier works perfectly)
- [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/) version 18 or higher installed on your computer
- Basic knowledge of JavaScript

You do not need any prior experience with Cloudflare Workers.

:::

---

## What You Will Build

Your chatbot will have two main parts:

1. **Backend Worker** (**src/index.js**): Handles chat requests, manages sessions, and connects to AI
2. **Frontend Widget** (**public/widget.js**): The embeddable UI that users interact with

You will use four Cloudflare services:

- **Workers AI**: Powers the AI responses using Meta's Llama 3 model
- **Vectorize**: Stores and searches your FAQ for relevant context (this is the RAG part)
- **KV**: Persists conversation history between sessions
- **Workers**: Runs your serverless backend at the edge

---

## How to Set Up the Project

First, create a new Cloudflare Workers project. Open your terminal and run the following command.

When it asks you for the programming language, select `javascript`, and when it asks, "Do you want to deploy your application?" select `no`, since we’re going to deploy at the end.

```sh
npm create cloudflare@latest ai-chatbot-widget -- --type=hello-world
```

Navigate into your new project directory:

```sh
cd ai-chatbot-widget
```

And install the required development dependencies:

```sh
npm i --save-dev tailwindcss autoprefixer postcss wrangler
```

Your project is now ready for development.

---

## How to Configure Wrangler

Wrangler is Cloudflare's command-line tool for developing and deploying Workers. You need to configure it to use the required services.

A [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare Worker](https://workers.cloudflare.com) is a serverless function that runs on Cloudflare's global edge network. Unlike traditional servers that run in a single location, Workers execute as close to your users as possible using more than 300 data centers worldwide. This results in faster response times and lower latency. You just write the JavaScript code, and Cloudflare takes care of all the infrastructure, scaling, and deployment.

### Create Resources (One-Time Setup)

The following resources are created via the Wrangler CLI (recommended for automation).

First, install Wrangler (if you don’t have it already):

```sh
npm i -g wrangler
```

To login, use `wrangler login`. This command will open a Cloudflare browser tab where you will need to authorize.

### Create a vectorize index (for RAG):

A [<VPIcon icon="fa-brands fa-cloudflare"/>vectorize index](https://developers.cloudflare.com/vectorize/) is a vector database that lets you perform semantic search. Instead of searching for exact keyword matches (like in traditional databases), Vectorize finds content based on meaning.

Here's how it works: You convert your FAQ questions and answers into numerical vectors (called embeddings) using an AI model. When a user asks a question, the chatbot converts that question into a vector and finds the FAQ entries with the most similar vectors. This is the "RAG" ([**Retrieval Augmented Generation**](/freecodecamp.org/retrieval-augmented-generation-rag-handbook.md)) technique, which augments the AI's response with relevant context from your knowledge base.

```sh
npx wrangler vectorize create faq-vectors --dimensions=768 --metric=cosine
```

### Create KV namespace (for session history)

[<VPIcon icon="fa-brands fa-cloudflare"/>KV (Key-Value) storage](https://developers.cloudflare.com/kv/) is Cloudflare's globally distributed database for storing simple data. Think of it like a giant dictionary: you store data using a key (the session ID) and retrieve it later using that same key.

For your chatbot, KV stores each user's conversation history. When a user returns to your website, the chatbot retrieves their session from KV and remembers what they talked about before.

```sh
npx wrangler kv namespace create CHAT_SESSIONS
```

Note the id from the output as you'll add it in the <VPIcon icon="iconfont icon-json"/>`wrangler.jsonc` file.

Create a file called <VPIcon icon="iconfont icon-json"/>`wrangler.jsonc` in your project root (you just need to replace `YOUR_KV_NAMESPACE_ID` with the ID that you received in the last step):

```json :collapsed-lines title="wrangler.jsonc"
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "ai-chatbot-widget",
  "main": "src/index.js",
  "compatibility_date": "2025-12-23",
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  },
  "ai": {
    "binding": "AI"
  },
  "vectorize": [
    {
      "binding": "VECTORIZE",
      "index_name": "faq-vectors"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "CHAT_SESSIONS",
      "id": "YOUR_KV_NAMESPACE_ID"
    }
  ]
}
```

This configuration file tells Wrangler which Cloudflare services your Worker needs access to.

Let me explain the key bindings:

- **ASSETS**: Serves static files (like your widget JavaScript and CSS) from the `public` folder
- **AI**: Connects to Cloudflare's Workers AI for running machine learning models
- **VECTORIZE**: Links to your Vectorize index for storing and searching FAQ embeddings
- **CHAT_SESSIONS**: Connects to a KV namespace for storing conversation history

---

## How to Build the Backend Worker

The backend Worker is the brain of your chatbot. It handles incoming chat messages, searches your FAQ for relevant context, sends the conversation to the AI, streams the response back to the user, and saves everything to KV for later.

Create the file <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`index.js` with this code:

```js :collapsed-lines title="index.js"
/** AI Chatbot Widget - Cloudflare Worker */
const SYS = `You are a helpful customer support assistant. Be friendly, professional, and concise. Use the FAQ context to give accurate answers. If you don't know something, say so.`;
const TTL = 30*24*60*60;
const cors = { 'Access-Control-Allow-Origin': '*' };
const json = (d, s=200, h={}) => new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json', ...cors, ...h } });
const cookie = r => r.headers.get('Cookie')?.match(/chatbot_session=([^;]+)/)?.[1];

async function faq(env, q) {
  try {
    const e = await env.AI.run('@cf/baai/bge-base-en-v1.5', { text: [q] });
    if (!e.data) return '';
    const r = await env.VECTORIZE.query(e.data[0], { topK: 3, returnMetadata: 'all' });
    return r.matches.map(m => `Q: ${m.metadata?.question}\nA: ${m.metadata?.answer}`).join('\n\n');
  } catch { return ''; }
}

async function chat(req, env) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const { message } = await req.json();
  if (!message?.trim()) return json({ error: 'Message required' }, 400);
  let sid = cookie(req), isNew = !sid;
  let sess = sid ? await env.CHAT_SESSIONS.get(sid, 'json') : null;
  if (!sess) { sid = 'sess_' + crypto.randomUUID(); sess = { id: sid, messages: [], createdAt: Date.now(), updatedAt: Date.now() }; isNew = true; }
  sess.messages.push({ role: 'user', content: message.trim(), timestamp: Date.now() });
  const ctx = await faq(env, message);
  const msgs = [{ role: 'system', content: SYS + (ctx ? `\n\nFAQ:\n${ctx}` : '') }, ...sess.messages.slice(-10).map(m => ({ role: m.role, content: m.content }))];
  const stream = await env.AI.run('@cf/meta/llama-3-8b-instruct', { messages: msgs, stream: true });
  let full = '';
  const { readable, writable } = new TransformStream({
    transform(chunk, ctrl) {
      for (const ln of new TextDecoder().decode(chunk).split('\n'))
        if (ln.startsWith('data: ') && ln.slice(6) !== '[DONE]') try { full += JSON.parse(ln.slice(6)).response || ''; } catch {}
      ctrl.enqueue(chunk);
    },
    async flush() {
      if (full) { sess.messages.push({ role: 'assistant', content: full, timestamp: Date.now() }); sess.updatedAt = Date.now(); await env.CHAT_SESSIONS.put(sid, JSON.stringify(sess), { expirationTtl: TTL }); }
    }
  });
  stream.pipeTo(writable);
  return new Response(readable, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', ...cors, ...(isNew ? { 'Set-Cookie': `chatbot_session=${sid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TTL}` } : {}) } });
}

async function seed(req, env) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const faqs = [
    ['How long does shipping take?', 'Standard 5-7 days, Express 2-3 days, Same-day in select areas.'],
    ['What is your return policy?', '30-day returns for unused items. Electronics 15 days if defective.'],
    ['Do you offer free shipping?', 'Yes! Orders over $50 get free standard shipping.'],
    ['How can I track my order?', 'Check your email for tracking or log into your account.'],
    ['What payment methods do you accept?', 'Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay.'],
    ['Do you have a warranty?', 'All products have manufacturer warranty. Extended plans available.'],
    ['Can I cancel my order?', 'Within 1 hour if not processed. Otherwise return after delivery.'],
    ['Do you ship internationally?', 'Yes, 50+ countries. 7-14 days. Duties paid by customer.'],
  ];
  try {
    const vecs = await Promise.all(faqs.map(async ([q,a], i) => {
      const e = await env.AI.run('@cf/baai/bge-base-en-v1.5', { text: [q+' '+a] });
      return { id: `faq-${i+1}`, values: e.data?.[0] || [], metadata: { question: q, answer: a } };
    }));
    await env.VECTORIZE.upsert(vecs);
    return json({ success: true, count: faqs.length });
  } catch { return json({ error: 'Seed failed' }, 500); }
}

export default {
  async fetch(req, env) {
    const p = new URL(req.url).pathname;
    if (req.method === 'OPTIONS') return new Response(null, { headers: { ...cors, 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    if (p === '/api/chat') return chat(req, env);
    if (p === '/api/history') { const s = cookie(req); return json({ messages: s ? (await env.CHAT_SESSIONS.get(s, 'json'))?.messages || [] : [] }); }
    if (p === '/api/seed') return seed(req, env);
    if (p === '/api/health') return json({ status: 'ok' });
    return env.ASSETS.fetch(req);
  }
};
```

Let me break down the key parts of this code:

- **Session management**: The `cookie` function extracts the session ID from the user's browser cookies. When a user first chats, the Worker generates a unique session ID, stores it in an HTTP-only cookie, and saves the conversation history to KV. On subsequent visits, the Worker retrieves the session and continues the conversation.
- **RAG with Vectorize**: The `faq` function implements RAG. It converts the user's question into a vector embedding using the BGE model, then queries Vectorize for the three most similar FAQ entries. This relevant context is added to the AI prompt, helping the AI give accurate, grounded answers instead of making things up.
- **Streaming responses**: The `chat` function uses a `TransformStream` to process the AI response as it streams. Each token is passed through to the client immediately, creating a natural typing effect. When the stream ends, the complete response is saved to KV.
- **Seeding FAQs**: The `seed` function populates your FAQ database. It converts each question-answer pair into a vector embedding and stores it in Vectorize. You only need to call this once after deploying.

Now that your backend is ready, let's build the frontend. But first, you need to set up Tailwind CSS to style your widget.

---

## How to Set Up Tailwind CSS

Your chatbot widget needs to look polished and professional. To achieve this, you will use [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind CSS](https://tailwindcss.com/) which is a utility-first CSS framework that lets you style elements directly in your HTML using small, single-purpose classes like `bg-black`, `rounded-full`, and `shadow-lg`.

Why Tailwind? Well, traditional CSS requires you to write separate stylesheets and invent class names. Tailwind eliminates this overhead by providing pre-built utility classes. This is especially useful for an embeddable widget because all the styles are self-contained and won't conflict with the host website's CSS.

Create the file <VPIcon icon="fa-brands fa-js"/>`tailwind.config.js` in your project root:

```js title="tailwind.config.js"
tail/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: []
};
```

This configuration tells Tailwind to scan all HTML and JavaScript files in the <VPIcon icon="fas fa-folder-open"/>`public` folder for class names. The `darkMode: 'class'` setting enables dark mode toggling by adding a `dark` class to the widget container.

Create the source CSS file at `src/`<VPIcon icon="fa-brands fa-css"/>`input.css`:

```css title="input.css"
@tailwind base;
@tailwind components;src/input.css;
@tailwind utilities;
```

This file imports Tailwind's base styles, component classes, and utility classes. When you build, Tailwind will scan your code and generate a minimal CSS file containing only the classes you actually use.

Update your <VPIcon icon="iconfont icon-json"/>`package.json` with build scripts:

```json title="package.json"
{
  "name": "ai-chatbot-widget",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/input.css -o ./public/styles.css --minify",
    "deploy": "npm run build:css && wrangler deploy",
    "dev": "npm run build:css && wrangler dev"
  },
  "devDependencies": {
      "autoprefixer": "^10.4.23",
      "postcss": "^8.5.6",
      "tailwindcss": "^3.4.19",
      "wrangler": "^4.56.0"
  }
}
```

The `build:css` script compiles and minifies your Tailwind CSS. The `deploy` and `dev` scripts automatically build the CSS before starting the development server or deploying.

With styling ready to go, let's build the widget that users will actually interact with.

---

## How to Build the Frontend Widget

The frontend widget is a self-contained JavaScript file that creates the entire chat interface. When someone adds your script to their website, it automatically creates the chat bubble button, the chat window, and handles all the interactive functionality.

Create the file <VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-js"/><VPIcon icon="fa-brands fa-js"/>`widget.js`:

```js :collapsed-lines title="widget"
/**
 * AI Chatbot Widget - Embeddable Script
 * Usage: <script src="https://your-domain.com/widget.js"></script>
 */
(function () {
  'use strict';
  const C = {
    u: window.CHATBOT_BASE_URL || '',
    t: window.CHATBOT_TITLE || 'AI Assistant',
    p: window.CHATBOT_PLACEHOLDER || 'Message...',
    g: window.CHATBOT_GREETING || '👋 Hi! How can I help you today?'
  };
  let open = 0, msgs = [], typing = 0, menu = 0;
  let dark = matchMedia('(prefers-color-scheme:dark)').matches;
  const $ = id => document.getElementById(id);
  const tog = (e, c, on) => e.classList.toggle(c, on);
  function init() {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = C.u + '/styles.css';
    document.head.appendChild(l);
    const d = document.createElement('div');
    d.id = 'cb';
    d.innerHTML = `
      <button id="cb-btn" class="fixed bottom-6 right-6 w-14 h-14 bg-black rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-[99999]">
        <svg id="cb-o" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        </svg>
        <svg id="cb-x" class="w-6 h-6 text-white absolute opacity-0 scale-50 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div id="cb-w" class="fixed bottom-24 right-6 w-[400px] h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[99999] opacity-0 scale-95 pointer-events-none transition-all origin-bottom-right bg-white dark:bg-gray-900">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">${C.t}</h3>
          </div>
          <div class="relative">
            <button id="cb-m" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>
            <div id="cb-d" class="hidden absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
              <button id="cb-th" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg id="cb-s" class="w-4 h-4 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/></svg>
                <svg id="cb-n" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                <span id="cb-tt">Dark Mode</span>
              </button>
              <button id="cb-cl" class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                Clear Chat
              </button>
            </div>
          </div>
        </div>
        <!-- Messages -->
        <div id="cb-ms" class="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50 dark:bg-gray-950"></div>
        <!-- Typing Indicator -->
        <div id="cb-ty" class="hidden px-5 pb-2 bg-gray-50 dark:bg-gray-950">
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.15s"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.3s"></span>
            </div>
            Thinking...
          </div>
        </div>
        <!-- Input -->
        <form id="cb-f" class="flex items-center gap-3 px-4 py-4 border-t bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
          <input id="cb-i" type="text" class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600" placeholder="${C.p}" autocomplete="off"/>
          <button type="submit" id="cb-se" class="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full disabled:opacity-50">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
          </button>
        </form>
      </div>`;
    document.body.appendChild(d);
    bind();
    load();
    theme();
  }
  function bind() {
    $('cb-btn').onclick = flip;
    $('cb-f').onsubmit = send;
    $('cb-m').onclick = e => { e.stopPropagation(); menu = !menu; tog($('cb-d'), 'hidden', !menu); };
    $('cb-th').onclick = () => { dark = !dark; theme(); menu = 0; tog($('cb-d'), 'hidden', 1); };
    $('cb-cl').onclick = () => { msgs = []; draw(); menu = 0; tog($('cb-d'), 'hidden', 1); };
    document.onclick = () => menu && (menu = 0, tog($('cb-d'), 'hidden', 1));
  }
  function theme() {
    tog($('cb'), 'dark', dark);
    $('cb-tt').textContent = dark ? 'Light Mode' : 'Dark Mode';
    tog($('cb-s'), 'hidden', !dark);
    tog($('cb-n'), 'hidden', dark);
  }
  function flip() {
    open = !open;
    const w = $('cb-w'), o = $('cb-o'), x = $('cb-x');
    tog(w, 'opacity-0', !open);
    tog(w, 'scale-95', !open);
    tog(w, 'pointer-events-none', !open);
    tog(w, 'opacity-100', open);
    tog(w, 'scale-100', open);
    tog(o, 'opacity-0', open);
    tog(o, 'scale-50', open);
    tog(x, 'opacity-0', !open);
    tog(x, 'scale-50', !open);
    tog(x, 'opacity-100', open);
    tog(x, 'scale-100', open);
    if (open) {
      $('cb-i').focus();
      if (!msgs.length) add('assistant', C.g);
    }
  }
  function add(r, c) {
    msgs.push({ role: r, content: c });
    draw();
  }
  function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML.replace(/\n/g, '<br>');
  }
  function draw() {
    $('cb-ms').innerHTML = msgs.map((m, i) => m.role === 'user'
      ? `<div class="flex justify-end">
          <div class="bg-black text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
            <div id="m${i}" class="text-sm whitespace-pre-wrap">${esc(m.content)}</div>
          </div>
        </div>`
      : `<div class="flex justify-start">
          <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xs">C</span>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${C.t}</span>
            </div>
            <div id="m${i}" class="text-sm leading-relaxed whitespace-pre-wrap">${esc(m.content)}</div>
          </div>
        </div>`
    ).join('');
    $('cb-ms').scrollTop = $('cb-ms').scrollHeight;
  }
  async function send(e) {
    e.preventDefault();
    const m = $('cb-i').value.trim();
    if (!m || typing) return;
    add('user', m);
    $('cb-i').value = '';
    $('cb-se').disabled = 1;
    typing = 1;
    tog($('cb-ty'), 'hidden', 0);
    try {
      const r = await fetch(C.u + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: m }),
        credentials: 'include'
      });
      if (!r.ok) throw 0;
      const rd = r.body.getReader();
      const dc = new TextDecoder();
      let t = '', idx = null;
      while (1) {
        const { done, value } = await rd.read();
        if (done) break;
        for (const ln of dc.decode(value, { stream: 1 }).split('\n')) {
          if (!ln.startsWith('data: ')) continue;
          const d = ln.slice(6);
          if (d === '[DONE]') continue;
          try {
            const p = JSON.parse(d);
            if (p.response) {
              t += p.response;
              if (idx === null) {
                tog($('cb-ty'), 'hidden', 1);
                typing = 0;
                msgs.push({ role: 'assistant', content: t });
                idx = msgs.length - 1;
                draw();
              } else {
                msgs[idx].content = t;
                const el = $('m' + idx);
                if (el) el.innerHTML = esc(t);
              }
              $('cb-ms').scrollTop = $('cb-ms').scrollHeight;
            }
          } catch {}
        }
      }
    } catch {
      tog($('cb-ty'), 'hidden', 1);
      typing = 0;
      add('assistant', 'Sorry, an error occurred.');
    } finally {
      $('cb-se').disabled = 0;
      typing = 0;
      tog($('cb-ty'), 'hidden', 1);
    }
  }
  async function load() {
    try {
      const r = await fetch(C.u + '/api/history', { credentials: 'include' });
      if (r.ok) {
        const d = await r.json();
        if (d.messages?.length) {
          msgs = d.messages;
          draw();
        }
      }
    } catch {}
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
```

The widget uses an IIFE (Immediately Invoked Function Expression) to avoid polluting the global namespace. Here are the key functions:

- **init()**: Creates the widget HTML and injects it into the page
- **bind()**: Sets up all event listeners
- **theme()**: Toggles dark/light mode
- **flip()**: Opens and closes the chat window with animations
- **draw()**: Renders all messages
- **send()**: Handles message submission with streaming
- **load()**: Loads chat history from the server

The streaming handler in `send()` is particularly important. It reads the AI response chunk by chunk and updates the UI as each token arrives. Instead of re-rendering the entire message list on each token (which would cause visual flashing), it updates only the content of the current message element. This creates a smooth typing effect.

Now you need a simple page to test everything before deploying.

---

## Create the Demo Page

The demo page serves as a testing ground during development and a showcase for your widget. When you or your users visit your deployed Worker URL directly, they will see this page with the chatbot widget already integrated.

Create <VPIcon icon="fas fa-folder-open"/>`public/`<VPIcon icon="fa-brands fa-html5"/>`index.html`: This demo page will be for your internal testing.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Chatbot Widget Demo</title>
  <link rel="stylesheet" href="/styles.css">
</head>

<body class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
  <div class="text-center text-white">
    <h1 class="text-4xl font-bold mb-4">AI Chatbot Widget</h1>
  </div>
  <script>    window.CHATBOT_BASE_URL = ''; window.CHATBOT_TITLE = 'Support'; window.CHATBOT_GREETING = "👋 Hi! I'm here to help with your questions!";  </script>
  <script src="/widget.js"></script>
</body>

</html>
```

This minimal page displays a title and loads the chatbot widget. The `CHATBOT_BASE_URL` is set to an empty string because when served from the same Worker, relative URLs work automatically. This is the exact same code someone would use to embed the widget on their own website, just with their own base URL instead.

With all the code in place, you are ready to deploy your chatbot to Cloudflare.

---

## How to Run it in Your Local System

Once all the files are added, run the command `npm run dev` to see how the chat widget looks in `http://localhost:8787`:

![How your chatbot should look](https://cdn.hashnode.com/res/hashnode/image/upload/v1766525553600/6a0dd8ed-5f2f-49ad-924d-3ef2fb143a42.png)

---

## How to Deploy to Cloudflare

Deployment is a single command. Run:

```sh
npm run deploy
```

This command first builds your Tailwind CSS, then deploys everything to Cloudflare. After deployment completes, you will see a URL like `https://ai-chatbot-widget.YOUR-SUBDOMAIN.workers.dev`.

in my case URL is `https://ai-chatbot-widget.mv.workers.dev/`

### How to Seed the FAQ Database

Before your chatbot can answer questions from your FAQ, you need to populate the Vectorize index. Run this command (replace the URL with your actual deployment URL):

```sh
curl -X POST https://ai-chatbot-widget.YOUR-SUBDOMAIN.workers.dev/api/seed
```

You should see this response:

```json
{"success":true,"count":8}
```

This means eight FAQ entries have been converted to vectors and stored in Vectorize. Your chatbot is now live and ready to answer questions!

Visit your deployment URL to test it out. Try asking about shipping, returns, or payment methods. The chatbot will respond using the FAQ context you just seeded.

Your chatbot is now live and ready to answer questions. You can check the Cloudflare dashboard to view the deployment. (The screenshot below is from the Cloudflare dashboard.)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766526373608/54e674c1-0c7c-4187-bf6f-e227763f7cef.png)

---

## How to Embed the Widget on Any Website

Now for the exciting part: adding your chatbot to any website. All it takes is two script tags before the closing `</body>` tag:

```html
<script>
  window.CHATBOT_BASE_URL = 'https://ai-chatbot-widget.YOUR-SUBDOMAIN.workers.dev';
  window.CHATBOT_TITLE = 'Your Company';
  window.CHATBOT_GREETING = '👋 How can I help you today?';
</script>
<script src="https://ai-chatbot-widget.YOUR-SUBDOMAIN.workers.dev/widget.js"></script>
```

Replace `YOUR-SUBDOMAIN` with your actual Cloudflare Workers subdomain.

Or you can also open your Cloudflare deployment URL for testing.

![Testing the chatbot](https://cdn.hashnode.com/res/hashnode/image/upload/v1766526312388/9f9a2b18-839d-44d8-b6c2-6f185c61442d.gif)

### Configuration Options

You can customize the widget using these variables:

| **Variable** | **Description** | **Default** |
| --- | --- | --- |
| `CHATBOT_BASE_URL` | Your deployed Worker URL | `''` (same origin) |
| `CHATBOT_TITLE` | Name shown in the header | `'AI Assistant'` |
| `CHATBOT_PLACEHOLDER` | Input field placeholder | `'Message...'` |
| `CHATBOT_GREETING` | Initial greeting message | `'👋 Hi! How can I help you today?'` |

---

## How to Customize Your Chatbot

Your chatbot is working, but you probably want to tailor it to your specific use case. Here are the most common customizations.

### How to Add Your Own FAQs

Open <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`index.js` and find the `seed` function. Replace the sample FAQs with your own question-answer pairs:

```js title="index.js"
const faqs = [
  ['Your question here?', 'Your answer here.'],
  ['Another question?', 'Another answer.']
  // Add more Q&A pairs
];
```

Then redeploy with `npm run deploy` and call the `/api/seed` endpoint again to update your vector database.

### How to Change the AI Personality

Edit the `SYS` constant at the top of <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`index.js`:

```js title="index.js"
const SYS = `You are a friendly assistant for [Your Company].
You help customers with [your main services].
Always be helpful and professional.`;
```

This system prompt shapes how the AI responds to users.

### How to Style the Widget

All styles use Tailwind CSS classes in <VPIcon icon="fa-brands fa-js"/>`widget.js`. To change the appearance:

- **Colors**: Change `bg-black` to your brand color
- **Size**: Adjust `w-[400px] h-[600px]` for the chat window dimensions
- **Position**: Modify `bottom-6 right-6` for placement

---

## Conclusion

Congratulations! You have built a complete AI chatbot widget that rivals expensive SaaS solutions like Intercom and Drift. Your chatbot streams AI responses in real-time, answers questions based on your FAQ using RAG, and remembers conversations across sessions—all for free.

Here is a quick recap of what you built:

- A backend Worker that handles chat, sessions, and FAQ search
- A frontend widget that can be embedded on any website
- Integration with Workers AI for intelligent responses
- Vectorize for semantic FAQ search
- KV for persistent conversation history

The Cloudflare stack offers generous free tiers that should cover most use cases:

- **Workers**: 100,000 requests per day
- **Workers AI**: 10,000 neurons per day
- **Vectorize**: 5 million vector operations per month
- **KV**: 100,000 reads and 1,000 writes per day

For most websites, you can run this chatbot completely free.

The source code for this project is available on [GitHub (<VPIcon icon="iconfont icon-github" />`mayur9210/ai-chatbot-widget`)](https://github.com/mayur9210/ai-chatbot-widget).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Embeddable AI Chatbot Widget with Cloudflare Workers",
  "desc": "Have you ever wanted to add an AI-powered chatbot to your website, like Intercom or Drift, without paying high monthly fees? In this tutorial, you'll learn how to build a fully functional, embeddable AI chatbot widget using Cloudflare's serverless st...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
