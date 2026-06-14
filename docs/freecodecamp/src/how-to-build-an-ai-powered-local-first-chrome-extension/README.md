---
lang: en-US
title: "How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map"
description: "Article(s) > How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map"
icon: fa-brands fa-chrome
category:
  - Web Browser
  - Google
  - Chrome
  - Node.js
  - React.js
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map"
    - property: og:description
      content: "How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-local-first-chrome-extension.html
prev: /tool/chrome/articles/README.md
date: 2026-06-20
isOriginal: false
author:
  - name: Shola Jegede
    url: https://freecodecamp.org/news/author/sholajegede/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/26289969-a243-46ff-87aa-095d4168bf17.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map"
  desc="Your browser remembers every page you've ever opened, but it has no idea why you opened any of them. You might spend three days comparing laptops across a dozen tabs, get distracted, come back a week "
  url="https://freecodecamp.org/news/how-to-build-an-ai-powered-local-first-chrome-extension"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/26289969-a243-46ff-87aa-095d4168bf17.png"/>

Your browser remembers every page you've ever opened, but it has no idea why you opened any of them.

You might spend three days comparing laptops across a dozen tabs, get distracted, come back a week later, and your history just shows a flat list of timestamps and titles, with no sense that those visits were one thing, a decision you started and never finished.

In this tutorial, you'll build **openloops**, an open-source, local-first Chrome extension that fixes this by scanning your browsing history and grouping it into "intent threads" – the decisions, research, and open questions you keep coming back to – then scoring each one for how alive it still is. Optionally, it also uses Claude to label those threads in plain language, suggest a concrete next step, and power a chat assistant you can ask "what should I close this week?"

By the end, you'll have built:

- A Manifest V3 Chrome extension with a service worker and a full-tab dashboard
- A local pipeline that captures, cleans, segments, and clusters browsing history entirely in IndexedDB
- A clustering algorithm tuned and debugged on real (messy) browsing data
- An AI labeling layer using Claude, with a grounding step that uses brand data from context.dev
- A chat assistant that reasons across your threads and tells you what to do next
- A polished dashboard with onboarding, a design system, and a working pipeline status machine

Everything runs on-device, and the only network calls are optional and opt-in, made with your own API keys.

---

## What You'll Build

On first run, openloops greets you with a centered welcome screen that walks you through the three pipeline steps:

![openloops welcome screen, showing the three onboarding steps: scan your history, build sessions, and build your intent map](https://cdn.hashnode.com/uploads/covers/62cab1b3e62bf98e0fb0a38f/70b376c4-e08d-45c3-9526-cad948d7bc08.png)

Once you've scanned your history, built sessions, and built the intent map, your browsing reorganizes into status-grouped threads: active, stalled, and dormant. Each one has a confidence score, a plain-language summary, a concrete next step, and a **Resume** button that reopens the exact pages you left off on. The right column holds a chat assistant grounded in your own threads:

![openloops dashboard showing status-grouped intent threads on the left and an AI assistant chat reasoning about what to close this week on the right](https://cdn.hashnode.com/uploads/covers/62cab1b3e62bf98e0fb0a38f/15e4d096-76a0-44f6-9a90-d0bb4de20bb8.png)

That assistant response reasons across the user's actual threads, ranking them by how easy they are to close against how much of a real decision they still need. It also explains why, which is the most novel part of this build, and depends on the context.dev grounding step you'll add later in this tutorial.

::: note Prerequisites

To follow along, you'll need:

- **Node 18+** and a Chromium-based browser (Chrome, Brave, Edge, and so on).
- Comfort with **TypeScript** and **React**. You don't need to be an expert, but you should be comfortable reading hooks and async/await.
- Basic familiarity with **IndexedDB** is helpful but not required, as you'll learn what you need as you go.

Two parts of this build are optional and require your own API key, each with a free tier:

- An **Anthropic API key** (from [<VPIcon icon="iconfont icon-claude"/>platform.claude.com](https://platform.claude.com/settings/keys)) for AI labeling and the chat assistant
- A **context.dev API key** (from [<VPIcon icon="fas fa-globe"/>context.dev](https://context.dev/login)) for the brand-grounding step

You can build and use the entire core pipeline, capture, clustering, scoring, without either key, since both are additive layers on top of it.

:::

---

## How openloops Is Structured

Before writing any code, it helps to see the whole shape of the thing. Every stage of openloops reads from one IndexedDB store and writes to the next:

```plaintext
chrome.history (backfill) ──┐
chrome.tabs.onUpdated (live)─┴─→ raw_events
                                     │  noise filter
                                     ▼
                                  sessions
                                     │  ambient detection + clustering + scoring
                                     ▼
                               intent_threads
                                     │
                                     ▼
                              React dashboard
                                     │  optional, opt-in
                                     ├──→ brand enrichment   (context.dev)
                                     └──→ AI labeling + next step (Claude)
                                              │
                                              ▼  optional, opt-in
                                        AI assistant chat (Claude)
```

Each stage is a separate module under <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`, and each one is independently inspectable: you can open Chrome DevTools, look at `raw_events`, `sessions`, or `intent_threads` directly in the Application tab, and rebuild any single stage without touching the others.

### The Shared Types

Every stage consumes and produces the same handful of TypeScript interfaces, defined once in <VPIcon icon="fas fa-folder-open"/>`src/types.ts`:

```ts :collapsed-lines title="types.ts"
// Shared TypeScript interfaces for the openloops pipeline.
// Each stage of the pipeline consumes and produces these types.

export interface RawEvent {
  id: string;
  url: string;
  domain: string;
  title: string;
  visitedAt: number;         // epoch ms
  source: "backfill" | "live";
}

export interface Session {
  id: string;
  events: RawEvent[];
  startedAt: number;
  endedAt: number;
  domains: string[];
  keywords: string[];
}

export interface IntentThread {
  id: string;
  title: string;
  summary?: string;
  nextStep?: string;   // one concrete action to move the thread forward
  sessions: Session[];
  type: "buying" | "research" | "planning" | "learning" | "unclassified";
  confidence: number;        // 0-1
  status: "active" | "stalled" | "dormant";
  firstSeen: number;
  lastSeen: number;
  distinctDays: number;
  signals: string[];
}

export interface Brand {
  domain: string;
  name: string;
  description: string;
  industry: string;
  logoUrl: string;
  brandColor: string;
}
```

Most fields on `IntentThread`, `confidence`, `status`, `signals`, and `distinctDays` get filled in by pure local heuristics later in this guide, when you cluster and score threads. `summary` and `nextStep` stay `undefined` until the optional AI labeling step, covered after that, fills them in.

This is the pattern that makes the whole project work: the core data model functions on its own, and AI makes it richer.

### The Manifest

openloops is a Manifest V3 extension with three permissions and three host permissions:

```json title="manifest.json"
{
  "manifest_version": 3,
  "name": "openloops",
  "version": "0.0.1",
  "description": "Reconstruct your browsing history into an AI-labeled map of intent threads: active decisions, stalled research, open questions. Fully local.",

  "permissions": ["history", "tabs", "storage"],
  "host_permissions": [
    "https://api.anthropic.com/*",
    "https://api.context.dev/*",
    "https://logos.context.dev/*"
  ],

  "background": {
    "service_worker": "src/background.ts",
    "type": "module"
  },

  "options_page": "src/dashboard/index.html",

  "icons": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },

  "action": {
    "default_title": "openloops",
    "default_icon": {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png"
    }
  }
}
```

The permissions, host permissions, and `options_page` entry each carry specific weight:

- `permissions: ["history", "tabs", "storage"]` are the only permissions the *core pipeline* needs. `history` reads your browsing history for the backfill, `tabs` lets the service worker observe new page loads and lets "Resume" reopen tabs, and `storage` is where API keys and preferences live.
- `host_permissions` are separate, and only matter if you use the optional AI features. They're what let the dashboard make `fetch()` calls to Anthropic and context.dev without hitting CORS errors.
- `options_page` points at the dashboard. Setting it this way, instead of a `default_popup`, means clicking the toolbar icon opens the dashboard as a full browser tab rather than a tiny popup, which matters once you're looking at a multi-column layout with status-grouped cards and a chat panel.

---

## Table of Contents

- [How to Scaffold the Extension](#heading-how-to-scaffold-the-extension)
- [How to Capture Your Browsing History](#heading-how-to-capture-your-browsing-history)
- [How to Turn Noise into Sessions](#heading-how-to-turn-noise-into-sessions)
- [How to Cluster Sessions into Intent Threads](#heading-how-to-cluster-sessions-into-intent-threads)
- [How to Clean Up Self-Referential Noise](#heading-how-to-clean-up-self-referential-noise)
- [How to Label Threads with Claude](#heading-how-to-label-threads-with-claude)
- [How to Ground Labels with context.dev](#heading-how-to-ground-labels-with-contextdev)
- [How to Design the Dashboard](#heading-how-to-design-the-dashboard)
- [How to Build the AI Assistant](#heading-how-to-build-the-ai-assistant)

---

## How to Scaffold the Extension

Start with Vite and the [<VPIcon icon="fas fa-globe"/>CRXJS plugin](https://crxjs.dev/vite-plugin), which compiles a Manifest V3 extension with hot module reloading:

```sh
npm create vite@latest openloops -- --template react-ts
cd openloops
npm install @crxjs/vite-plugin idb react-markdown
```

Your <VPIcon icon="iconfont icon-typescript"/>`vite.config.ts` wires CRXJS to your <VPIcon icon="iconfont icon-json"/>`manifest.json`, and from there, Vite handles compiling <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`background.ts` to a real `.js` file that Chrome can load (a raw `.ts` service worker path in the manifest will fail with a registration error, which we'll debug in the next section).

The dashboard's entry point is a standard React 18 root:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>openloops</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Build it, then load it as an unpacked extension:

```sh
npm run build
```

In Chrome, go to `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the <VPIcon icon="fas fa-folder-open"/>`dist/` folder. With nothing else built yet, clicking the toolbar icon should open a blank dashboard tab, and the service worker (visible from the extension card's "service worker" link) should log `[openloops] Extension installed.` on install.

With that foundation in place, it's time to start filling `raw_events` with your actual browsing history.

---

## How to Capture Your Browsing History

Every record in openloops starts life as a `RawEvent`, the type you saw earlier: a URL, a domain, a title, a timestamp, and a `source` of either `"backfill"` or `"live"`.

Two pipelines populate it:

- A **one-time backfill** that reads your last 14 days of `chrome.history` on demand
- **Live capture**, which listens for new page loads from this point forward

Both paths share a handful of small helpers and write through the same IndexedDB layer, so it's worth building those first.

### A Few Shared Helpers

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`util.ts`:

```ts :collapsed-lines title="lib/util.ts"
export function isHttpUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www./, "");
  } catch {
    return url;
  }
}

export function isLocalHost(domain: string): boolean {
  if (domain === "localhost" || domain === "127.0.0.1") return true;
  if (domain.endsWith(".local")) return true;

  const octets = domain.split(".");
  if (octets.length === 4 && octets.every((o) => /^\d{1,3}$/.test(o))) {
    const [a, b] = octets.map(Number);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }

  return false;
}

export function hashId(url: string, visitedAt: number): string {
  const str = `\({url}|\){visitedAt}`;
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0).toString(36);
}
```

Each of these four functions solves a problem you won't notice until later in the build:

- `isHttpUrl` is the shared scheme guard used by both live capture and the backfill, and the single gate that keeps `chrome://`, `chrome-extension://`, `about:`, and `file://` URLs out of your data entirely. Both capture paths call it before anything else.
- `extractDomain` strips a leading `www.` and returns the hostname, which is a simplification: [<VPIcon icon="fas fa-globe"/>`bbc.co.uk`](http://bbc.co.uk) and [<VPIcon icon="fas fa-globe"/>`news.bbc.co.uk`](http://news.bbc.co.uk) wouldn't collapse to the same domain under this logic, since true registrable-domain extraction needs the [<VPIcon icon="fas fa-globe"/>Public Suffix List](https://publicsuffix.org/). If the URL is malformed, it just returns the input unchanged rather than throwing.
- `isLocalHost` exists for one reason: when you add brand enrichment later in this guide, you'll be sending domain names to an external API. `localhost:5173` or `192.168.1.50` are meaningless to that API and would just be wasted lookups, so it's better to filter them here, once, at the source. It checks for `localhost`, `127.0.0.1`, `.local` hostnames, and the standard private IPv4 ranges (`10.x.x.x`, `172.16.x.x`–`172.31.x.x`, `192.168.x.x`).
- `hashId` combines the URL and timestamp into a short, deterministic string using a simple hashing algorithm (djb2), so the same `(url, visitedAt)` pair always produces the same ID. This makes writes idempotent: re-running the backfill produces the *same* IDs for the *same* visits, so IndexedDB's `put` overwrites cleanly instead of duplicating, which is what makes "Scan my history" safe to click more than once.

### The Database Layer (So Far)

openloops stores everything in IndexedDB via the [<VPIcon icon="iconfont icon-github"/>`jakearchibald/idb`](https://github.com/jakearchibald/idb) wrapper, which gives you a typed, promise-based API over the raw IndexedDB calls. Create <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`:

```ts :collapsed-lines title="db/index.ts"
import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { RawEvent } from "../types";

interface OpenloopsDB extends DBSchema {
  raw_events: {
    key: string;
    value: RawEvent;
    indexes: { by_visitedAt: number };
  };
}

const DB_NAME = "openloops";
const DB_VERSION = 1;

let _db: Promise<IDBPDatabase<OpenloopsDB>> | null = null;

export function getDB(): Promise<IDBPDatabase<OpenloopsDB>> {
  if (!_db) {
    _db = openDB<OpenloopsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("raw_events")) {
          const s = db.createObjectStore("raw_events", { keyPath: "id" });
          s.createIndex("by_visitedAt", "visitedAt");
        }
      },
    });
  }
  return _db;
}

export async function clearEvents(): Promise<void> {
  const db = await getDB();
  return db.clear("raw_events");
}

export async function putEvents(events: RawEvent[]): Promise<void> {
  if (events.length === 0) return;
  const db = await getDB();
  const tx = db.transaction("raw_events", "readwrite");
  await Promise.all([...events.map((e) => tx.store.put(e)), tx.done]);
}

export async function getAllEvents(): Promise<RawEvent[]> {
  const db = await getDB();
  return db.getAllFromIndex("raw_events", "by_visitedAt");
}

export async function getEventCount(): Promise<number> {
  const db = await getDB();
  return db.count("raw_events");
}
```

Four small functions round out this first version of the database layer: `clearEvents` wipes the store, which the backfill calls first so every scan starts from a clean snapshot. `putEvents` writes a batch using IDB's `put`, which overwrites rather than duplicates. `getAllEvents` returns everything sorted by `visitedAt` via the index. And `getEventCount` returns a simple count for the dashboard.

`_db` is a module-level singleton promise, so every part of the extension, the service worker and the dashboard alike, shares one connection. `DB_VERSION` starts at `1` here. As you add sessions, intent threads, and brand data in later parts, you'll add new stores guarded by `if (!db.objectStoreNames.contains(...))` and bump this number. That guard means existing users upgrade safely without touching stores that already exist.

### Capturing New Visits Live

The service worker is the always-on part of the extension. Create <VPIcon icon="fas fa-folder-open"/>`src/background.ts`:

```ts :collapsed-lines title="background.ts"
import { hashId, extractDomain, isHttpUrl } from "./lib/util";
import { putEvents } from "./db/index";
import type { RawEvent } from "./types";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[openloops] Extension installed.");
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

const DEDUP_MS = 3_000;
const recentCaptures = new Map<number, { url: string; at: number }>();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  const url = tab.url;

  if (!isHttpUrl(url)) return;

  const last = recentCaptures.get(tabId);
  const now = Date.now();
  if (last && last.url === url && now - last.at < DEDUP_MS) {
    console.log(`[openloops] dedup skip — tab \({tabId} \){url}`);
    return;
  }

  recentCaptures.set(tabId, { url, at: now });

  const event: RawEvent = {
    id: hashId(url, now),
    url,
    domain: extractDomain(url),
    title: tab.title ?? url,
    visitedAt: now,
    source: "live",
  };

  putEvents([event]).then(() => {
    console.log(`[openloops] captured \({event.domain} — \){event.title}`);
  }).catch((err) => {
    console.error("[openloops] putEvents failed:", err);
  });
});
```

`chrome.action.onClicked` is what makes the toolbar icon open the dashboard as a tab rather than a popup, working together with the `options_page` entry in your manifest.

Live capture happens inside the `tabs.onUpdated` listener, which Chrome fires repeatedly as a page loads, redirects, and updates its title, though you should only care about the moment `changeInfo.status === "complete"`. From there, `isHttpUrl` drops anything that isn't a real web page, the dedup guard collapses the duplicate "complete" events that SPAs love to fire, and the rest becomes a `RawEvent` with `source: "live"`.

That dedup guard is best-effort by design: `recentCaptures` is a plain in-memory `Map`, and Chrome can suspend the service worker between events, which wipes the `Map` along with it. It still collapses duplicate bursts within a single waking session, just not across service worker restarts, and that's an acceptable tradeoff since `hashId` already makes any duplicate that slips through harmless once it reaches IndexedDB.

The final write also looks slightly unusual: `putEvents([event]).then(...).catch(...)` instead of `await`. The listener doesn't need to block on the write finishing, and the service worker stays alive long enough to complete a single IndexedDB write even if it's about to be suspended, so firing the write and moving on is enough.

That `source` field carries more weight than it first appears, since it's how later code distinguishes "the user actually scanned their history" from "the extension has only been open for five minutes". This matters for onboarding when you design the dashboard later in this guide.

Build and reload the extension now (`npm run build`, then click the reload icon on the extension card in `chrome://extensions`), browse a few pages, then open the service worker's DevTools by clicking "service worker" on the extension card. You'll be able to see `[openloops] captured ...` log lines appear as confirmation that live capture is working.

### Backfilling 14 Days of History

Live capture only sees what happens *after* you install the extension, so to make openloops useful immediately, you also need to backfill recent history. Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/backfill.ts`:

```ts :collapsed-lines title="pipeline/backfill.ts"
import { extractDomain, hashId, isHttpUrl } from "../lib/util";
import { putEvents, clearEvents } from "../db/index";
import type { RawEvent } from "../types";

const CONCURRENCY = 50;

async function visitsForItem(
  item: chrome.history.HistoryItem,
  startTime: number
): Promise<RawEvent[]> {
  if (!item.url) return [];
  if (!isHttpUrl(item.url)) return [];

  const visits = await chrome.history.getVisits({ url: item.url });

  const events: RawEvent[] = [];
  for (const visit of visits) {
    if (!visit.visitTime || visit.visitTime < startTime) continue;

    events.push({
      id: hashId(item.url, visit.visitTime),
      url: item.url,
      domain: extractDomain(item.url),
      title: item.title ?? item.url,
      visitedAt: visit.visitTime,
      source: "backfill",
    });
  }

  return events;
}

export async function backfillHistory(days = 14): Promise<number> {
  await clearEvents();

  const startTime = Date.now() - days * 24 * 60 * 60 * 1000;

  const historyItems = await chrome.history.search({
    text: "",
    startTime,
    maxResults: 100_000,
  });

  let totalWritten = 0;

  for (let i = 0; i < historyItems.length; i += CONCURRENCY) {
    const batch = historyItems.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map((item) => visitsForItem(item, startTime))
    );
    const events = batchResults.flat();
    await putEvents(events);
    totalWritten += events.length;
  }

  return totalWritten;
}
```

`backfillHistory` starts by calling `clearEvents` and wiping the store so each run produces a clean snapshot for the chosen window. Every real visit still exists in `chrome.history`, so nothing is lost by starting over. It then searches with `maxResults: 100_000`, since the default of 100 is far too low for anyone with more than a few days of real browsing.

Each matching `HistoryItem` goes through `visitsForItem`, which skips items that Chrome returns with no `url` at all, a quirk of some deleted-history entries, and skips non-web URLs using `isHttpUrl`, before fetching that item's full visit list.

Calling `getVisits` here, instead of relying on `search` alone, matters because `chrome.history.search` is tempting as a single call, but it collapses every visit to a URL down to just the *most recent* one. If you visited the same Stack Overflow answer three times over two days while debugging something, `search` gives you one row, and in the next section, where you segment events into sessions, you need all three: that's the difference between "one visit, three days ago" and "a sustained debugging session."

`getVisits` gives you that full timestamp list, but it returns *all* history for a URL regardless of date range, so `visitsForItem` filters by `startTime` itself. And because `chrome.history.search` can return tens of thousands of items for a heavy browser history, the backfill fans out to `getVisits` in batches of `CONCURRENCY`, set to 50, rather than firing everything at once. Chrome doesn't document a hard limit on concurrent `getVisits` calls, but 50 in flight at a time keeps things responsive without flooding it.

### Checkpoint

You can verify live capture by browsing normally and watching `raw_events` fill up: open `chrome://extensions`, click "service worker" on the openloops card, then go to the **Application** tab → **IndexedDB** → `openloops` → `raw_events`, where each row should be a `RawEvent` with `source: "live"`.

`backfillHistory` itself doesn't have a UI yet, but you'll wire it up to a "Scan my history" button when you build the dashboard rail in Part 13. For now, it's enough that it compiles and that `raw_events` is filling up from live capture. In the next part you'll start turning that raw stream into something structured: sessions.

---

## How to Turn Noise into Sessions

A real browsing history is full of activity that has nothing to do with what you were actually trying to do. An afternoon of research might be interleaved with dozens of visits to Gmail, Slack, or YouTube, along with pages whose titles are just "New Tab" or "Dashboard" because the page hadn't finished loading when the browser recorded it.

Before any of this can be grouped into something meaningful, two things need to happen: the noise needs to be filtered out, and what remains needs to be broken into sessions, contiguous stretches of activity separated by gaps in time.

This section builds both of those steps, along with a small keyword extractor that each session uses to describe what it was about, since that description is what later powers clustering.

### Filtering Out Noise

Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/noise.ts`:

```ts :collapsed-lines title="pipeline/noise.ts"
import type { RawEvent } from "../types";
import { isHttpUrl, isLocalHost } from "../lib/util";

export const BLOCKED_DOMAINS: readonly string[] = [
  "mail.google.com",
  "outlook.live.com",
  "outlook.office.com",
  "calendar.google.com",
  "slack.com",
  "app.slack.com",
  "discord.com",
  "web.whatsapp.com",
  "teams.microsoft.com",
  "messenger.com",
];

export const ADULT_DOMAINS: readonly string[] = [
  "xvideos.com",
  "pornhub.com",
  "xnxx.com",
  "xhamster.com",
  "redtube.com",
  "youporn.com",
  "spankbang.com",
];

export const JUNK_DOMAINS: readonly string[] = [
  "trk.myperfect2give.com",
  "t.buenotraffic.com",
  "bwredir.com",
  "osom.saintscommunity.net",
];

const ALL_BLOCKED = [...BLOCKED_DOMAINS, ...ADULT_DOMAINS, ...JUNK_DOMAINS];

function domainIsBlocked(domain: string): boolean {
  return ALL_BLOCKED.some(
    (blocked) => domain === blocked || domain.endsWith("." + blocked)
  );
}

export const NOISE_TITLE_PREFIXES: readonly string[] = [
  "new tab",
  "new chat",
  "untitled",
  "inbox",
  "home",
  "dashboard",
  "sign in",
  "log in",
  "loading",
];

function titleIsGeneric(title: string, domain: string): boolean {
  if (title.trim() === "") return true;
  if (title.toLowerCase() === domain.toLowerCase()) return true;

  const lower = title.toLowerCase();
  return NOISE_TITLE_PREFIXES.some((prefix) => lower.startsWith(prefix));
}

export function isNoise(event: RawEvent): boolean {
  if (!isHttpUrl(event.url)) return true;
  if (isLocalHost(event.domain)) return true;
  return domainIsBlocked(event.domain) || titleIsGeneric(event.title, event.domain);
}
```

`isNoise` is the single function the rest of the pipeline calls, and it layers four checks on top of each other, each one catching a different kind of noise.

The first two checks reuse the helpers from earlier: `isHttpUrl` and `isLocalHost` drop anything that isn't a real web page or that points at a local development server, the same filters that already protect capture. Checking them again here is a deliberate belt-and-suspenders measure: if anything ever reaches `raw_events` without having passed through capture's checks, it still can't make it into a session.

`BLOCKED_DOMAINS` covers communication and productivity tools, Gmail, Slack, Discord, WhatsApp Web, and similar. Those tools that you visit constantly but that carry no research intent of their own. `domainIsBlocked` matches both the exact domain and any subdomain, so `slack.com` in the list also catches `app.slack.com`. `ADULT_DOMAINS` and `JUNK_DOMAINS` exist for related reasons, keeping adult content and known tracker or redirect domains out of your threads entirely.

`BLOCKED_DOMAINS` is a curated, static list, and later in this guide it's complemented by a second, frequency-based detector in `ambient.ts`. This drops any domain that shows up in nearly every session regardless of what that domain actually is.

The last check, `titleIsGeneric`, catches pages whose titles tell you nothing useful: an empty title, a title that's identical to the domain name, or a title that starts with a generic prefix like "New Tab", "Dashboard", "Loading...", or "Sign in". `NOISE_TITLE_PREFIXES` is matched against the start of the lowercased title, so "Dashboard | Vercel" gets dropped right alongside a bare "Dashboard", while a content-rich title on that same domain passes through untouched.

### Extracting Keywords

Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/keywords.ts`. This isn't NLP, just frequency counting after stopword removal. This is good enough to surface something like "typescript generics" or "react hooks" from a session of related browsing:

```ts title="pipeline/keywords.ts"
import { BLOCKED_DOMAINS } from "./noise";

export const STOPWORDS: ReadonlySet<string> = new Set([
  "the", "and", "for", "with", "you", "your", "how", "what", "this", "that",
  "from", "are", "was", "not", "but", "all", "can", "has", "have", "will",
  "its", "out", "one", "get", "our", "had", "just", "about", "also", "more",
  "into", "than", "then", "when", "their", "there", "which", "would", "been",
  "his", "her", "who", "they", "she", "him", "now", "any", "way", "use",
  "using", "used", "make", "made",
  "google", "youtube", "search", "chat", "new", "home", "www", "com", "org",
  "net", "page", "site", "tab", "view", "app", "log", "sign", "login",
  "official", "free", "online", "best", "top", "open",
]);

export const PLATFORM_STOPWORDS: ReadonlySet<string> = new Set([
  "instagram", "facebook", "youtube", "claude", "google", "linkedin",
  "twitter", "reddit", "netflix", "amazon", "gmail", "whatsapp", "tiktok",
  "messenger",
  "stories", "story", "reel", "reels", "shorts", "short", "feed", "watch",
  "video", "videos", "music", "post", "posts", "message", "messages",
  "dm", "dms", "notification", "notifications", "profile", "home", "login",
  "signin", "follow", "followers",
]);

function derivedDomainLabels(): Set<string> {
  const labels = new Set<string>();
  for (const domain of BLOCKED_DOMAINS) {
    const label = domain.split(".").at(-2);
    if (label) labels.add(label);
  }
  return labels;
}

const ALL_STOP_TOKENS: ReadonlySet<string> = new Set([
  ...STOPWORDS,
  ...PLATFORM_STOPWORDS,
  ...derivedDomainLabels(),
]);

export function extractKeywords(titles: string[], max = 8): string[] {
  const freq = new Map<string, number>();

  for (const title of titles) {
    const tokens = title.toLowerCase().split(/[^a-z0-9]+/);
    for (const token of tokens) {
      if (token.length < 3) continue;
      if (/^\d+$/.test(token)) continue;
      if (ALL_STOP_TOKENS.has(token)) continue;

      freq.set(token, (freq.get(token) ?? 0) + 1);
    }
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([token]) => token);
}
```

`extractKeywords` takes the page titles from a group of events and returns the handful of words that show up most often, after stripping out everything that isn't a topic. That stripping is doing more work than the name "stopwords" suggests.

`STOPWORDS` covers common English function words like "the" and "with", plus generic site chrome like "search", "login", and "page". On its own, this would still let through tokens like "instagram" or "reels" from a title such as "Reels · Instagram", and those tokens would then show up as keywords for that session.

That gap is what `PLATFORM_STOPWORDS` closes. A title like "Reels · Instagram" or "Watch - YouTube" identifies the tool you were using, not what you were doing with it. So `PLATFORM_STOPWORDS` strips out platform and brand names along with social media UI chrome like "stories", "feed", "dm", and "notifications". Without this list, sessions on social platforms would extract keywords like "instagram" or "watch". Those would become thread titles that quietly pull unrelated sessions together during clustering, since every social-media session would share that one meaningless keyword.

`derivedDomainLabels` keeps a third source of stopwords in sync automatically: for every domain in `BLOCKED_DOMAINS`, it takes the label immediately before the top-level domain. So `mail.google.com` becomes `google` and `web.whatsapp.com` becomes `whatsapp`. Adding a new domain to that blocklist later also prevents its name from polluting keywords, without any extra bookkeeping.

With all three sets merged once at module load into `ALL_STOP_TOKENS`, `extractKeywords` itself is straightforward: lowercase every title, split on anything that isn't a letter or digit, drop tokens shorter than three characters or made entirely of digits, and drop anything in `ALL_STOP_TOKENS`. Then count what's left and return the most frequent entries.

### Extending the Database For Sessions

Sessions need a place to live. Earlier in this guide, <VPIcon icon="fas fa-folder-open"/>`src/db/index.ts` defined a schema with just `raw_events` at version 1. We'll add a `sessions` store and bump the version to 2. First, extend the schema and the `upgrade` callback:

```ts title="db/index.ts"
import type { RawEvent, Session } from "../types";

interface OpenloopsDB extends DBSchema {
  raw_events: {
    key: string;
    value: RawEvent;
    indexes: { by_visitedAt: number };
  };
  sessions: {
    key: string;
    value: Session;
    indexes: { by_startedAt: number };
  };
}

const DB_VERSION = 2;

export function getDB(): Promise<IDBPDatabase<OpenloopsDB>> {
  if (!_db) {
    _db = openDB<OpenloopsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("raw_events")) {
          const s = db.createObjectStore("raw_events", { keyPath: "id" });
          s.createIndex("by_visitedAt", "visitedAt");
        }
        if (!db.objectStoreNames.contains("sessions")) {
          const s = db.createObjectStore("sessions", { keyPath: "id" });
          s.createIndex("by_startedAt", "startedAt");
        }
      },
    });
  }
  return _db;
}
```

Then add the helper functions sessions need, alongside the `raw_events` helpers you already wrote. They follow the same shape: `putSessions` writes a batch idempotently, `clearSessions` wipes the store before a rebuild, `getAllSessions` returns everything sorted by `startedAt` via the index, and `getSessionCount` returns a total.

```ts
export async function putSessions(sessions: Session[]): Promise<void> {
  if (sessions.length === 0) return;
  const db = await getDB();
  const tx = db.transaction("sessions", "readwrite");
  await Promise.all([...sessions.map((s) => tx.store.put(s)), tx.done]);
}

export async function clearSessions(): Promise<void> {
  const db = await getDB();
  return db.clear("sessions");
}

export async function getAllSessions(): Promise<Session[]> {
  const db = await getDB();
  return db.getAllFromIndex("sessions", "by_startedAt");
}

export async function getSessionCount(): Promise<number> {
  const db = await getDB();
  return db.count("sessions");
}
```

The `if (!db.objectStoreNames.contains(...))` guard from earlier is what makes this safe: anyone who already has a version-1 database, with `raw_events` full of real data, gets the new `sessions` store added on top, without touching what's already there.

### Segmenting Events into Sessions

A session is a contiguous block of browsing activity, with a new one starting whenever the gap between two consecutive events exceeds `SESSION_GAP_MS`. Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/sessions.ts`:

```ts :collapsed-lines title="pipeline/sessions.ts"
import { getAllEvents, clearSessions, putSessions } from "../db/index";
import { isNoise } from "./noise";
import { extractKeywords } from "./keywords";
import { hashId } from "../lib/util";
import type { RawEvent, Session } from "../types";

const SESSION_GAP_MS = 30 * 60 * 1000;

function rankDomains(events: RawEvent[]): string[] {
  const freq = new Map<string, number>();
  for (const e of events) {
    freq.set(e.domain, (freq.get(e.domain) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain);
}

function buildSession(events: RawEvent[]): Session {
  const startedAt = events[0].visitedAt;
  const endedAt = events[events.length - 1].visitedAt;

  return {
    id: hashId(events[0].url, startedAt),
    events,
    startedAt,
    endedAt,
    domains: rankDomains(events),
    keywords: extractKeywords(events.map((e) => e.title)),
  };
}

export async function buildSessions(): Promise<{ events: number; sessions: number }> {
  const allEvents = await getAllEvents();

  const meaningful = allEvents.filter((e) => !isNoise(e));

  if (meaningful.length === 0) {
    await clearSessions();
    return { events: 0, sessions: 0 };
  }

  const sessions: Session[] = [];
  let currentGroup: RawEvent[] = [meaningful[0]];

  for (let i = 1; i < meaningful.length; i++) {
    const gap = meaningful[i].visitedAt - meaningful[i - 1].visitedAt;

    if (gap > SESSION_GAP_MS) {
      sessions.push(buildSession(currentGroup));
      currentGroup = [meaningful[i]];
    } else {
      currentGroup.push(meaningful[i]);
    }
  }
  sessions.push(buildSession(currentGroup));

  const substantive = sessions.filter(
    (s) => !(s.events.length === 1 && s.keywords.length === 0)
  );

  await clearSessions();
  await putSessions(substantive);

  return { events: meaningful.length, sessions: substantive.length };
}
```

::: info <code>buildSessions</code> does five things in order:

1. loads every raw event sorted by time,
2. drops anything `isNoise` flags,
3. walks the remaining list and starts a new session whenever the gap between two consecutive events exceeds `SESSION_GAP_MS` (pushing the final in-progress group once the loop ends since nothing else closes it off),
4. drops sessions that turned out to be a single event with no extractable keywords (usually stray page loads that never connected to anything else),
5. and persists the result.

:::

Each session's `domains` and `keywords` come from `rankDomains` and `extractKeywords` running over just the events in that group. `rankDomains` counts how many events came from each domain and orders them by frequency, so the most-visited domain in a session comes first.

A worked example makes "walking the list" concrete. Take five events that survive noise filtering, A through E:

```plaintext
A  t= 0 min  "TypeScript generics - Stack Overflow"   stackoverflow.com
B  t= 5 min  "TypeScript Handbook"                    typescriptlang.org
C  t=10 min  "microsoft/TypeScript - GitHub"          github.com
   ↑ gap to D = 45 min  >  SESSION_GAP_MS (30 min)  → SPLIT HERE
D  t=55 min  "React hooks explained - YouTube"         youtube.com
E  t=60 min  "useEffect cleanup - Stack Overflow"     stackoverflow.com
```

As the loop walks from A to B to C, each gap is under the 30-minute limit, so all three stay in the same group. The jump from C to D is 45 minutes, which crosses `SESSION_GAP_MS`, so the loop closes off `[A, B, C]` as Session 1 and starts a fresh group with D. From D to E is only 5 minutes, so E joins D, and that group becomes Session 2 once the loop ends.

Session 1 ends up tagged with keywords like `typescript` and `generics`, while Session 2 is tagged with `react` and `hooks`, even though both sessions happened on the same day.

`SESSION_GAP_MS` is set to 30 minutes because that's the same default that Google Analytics and similar tools use, and it works well for most browsing patterns.

The tradeoff runs in both directions: a shorter gap produces more, smaller sessions, which gives clustering a more granular signal but risks fragmenting one continuous task into several pieces. A longer gap produces fewer, larger sessions, which risks merging activity that was actually unrelated.

30 minutes is a reasonable starting point, and it's the kind of constant you can come back and tune once you see how your own threads turn out.

### Checkpoint

`buildSessions` doesn't have a UI yet either. It'll get wired up to a "Build sessions" button alongside "Scan my history" when you design the dashboard later in this guide.

For now, the goal is just for everything in this section to compile cleanly: <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`noise.ts`, <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`keywords.ts`, the updated <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`, and <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`sessions.ts` should all build without errors. `getDB()` should report version 2 the next time the extension reloads (visible in DevTools under **Application** → **IndexedDB** → `openloops`, where the database now lists both `raw_events` and `sessions` as object stores).

With sessions in place, the next section takes this structured-but-unconnected data and groups sessions together into the intent threads this whole project is named after.

---

## How to Cluster Sessions into Intent Threads

Sessions group events that happened close together in time. But the things you're actually trying to do rarely fit inside one session. Comparing laptops might span three sessions over four days. A question you keep meaning to look into might surface for ten minutes every few days for two weeks.

This section groups related sessions together into intent threads, then scores each thread for how confident openloops is that it represents something real and how alive it still is.

Two files do this work. <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`ambient.ts` detects domains that are part of your daily routine rather than any particular intent, so they don't create false similarity between unrelated sessions. <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`threads.ts` does the actual clustering and scoring.

### Detecting Ambient Domains

Some domains show up in almost every session regardless of what you're doing: [<VPIcon icon="fa-brands fa-youtube"/>youtube.com](https://youtube.com) as background noise, [<VPIcon icon="iconfont icon-github"/>github.com](https://github.com) if you're a developer who commits daily, or [<VPIcon icon="iconfont icon-claude"/>claude.ai](https://claude.ai) if you use it as a general assistant. If clustering compared sessions on these domains the same way it compares them on anything else, two completely unrelated sessions would look similar just because they both touched [<VPIcon icon="fa-brands fa-youtube"/>youtube.com](https://youtube.com), and everything would eventually merge into one enormous thread.

.<VPIcon icon="iconfont icon-typescript"/>`ambient.ts` solves this with a frequency check: a domain is ambient if it shows up on a large enough fraction of your active days, regardless of topic.

Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/ambient.ts`:

```ts :collapsed-lines title="pipeline/ambient.ts"
import type { Session } from "../types";

export const UBIQUITY_THRESHOLD = 0.6;
export const MIN_ACTIVE_DAYS = 3;

function toDay(epochMs: number): string {
  return new Date(epochMs).toDateString();
}

export function detectAmbientDomains(sessions: Session[]): Set<string> {
  const allEvents = sessions.flatMap((s) => s.events);

  const activeDays = new Set(allEvents.map((e) => toDay(e.visitedAt)));
  const totalActiveDays = activeDays.size;

  if (totalActiveDays < MIN_ACTIVE_DAYS) {
    return new Set();
  }

  const domainDayMap = new Map<string, Set<string>>();
  for (const event of allEvents) {
    const day = toDay(event.visitedAt);
    if (!domainDayMap.has(event.domain)) {
      domainDayMap.set(event.domain, new Set());
    }
    domainDayMap.get(event.domain)!.add(day);
  }

  const ambient = new Set<string>();
  for (const [domain, days] of domainDayMap) {
    const ubiquity = days.size / totalActiveDays;
    if (ubiquity >= UBIQUITY_THRESHOLD) {
      ambient.add(domain);
      console.log(
        `[openloops] ambient: \({domain} (\){days.size}/\({totalActiveDays} days, ubiquity=\){ubiquity.toFixed(2)})`
      );
    }
  }

  return ambient;
}
```

`toDay` collapses a timestamp down to a calendar-day string, so two events on the same day produce the same key, regardless of the exact time.

`detectAmbientDomains` first counts how many distinct days had any browsing activity at all – that's `totalActiveDays` – then builds a map from each domain to the set of days it appeared on. A domain's ubiquity is `days.size / totalActiveDays`, the fraction of your active days that domain showed up on. Anything at or above `UBIQUITY_THRESHOLD` 0.6 gets added to the returned set.

`MIN_ACTIVE_DAYS` exists because with only one or two days of data, almost every domain you visited would technically appear on 100% of your active days, and the detector would mark everything as ambient. Below three active days, it returns an empty set and skips detection entirely.

This approach has a real tradeoff. It correctly identifies genuinely ambient tools, but it can also suppress a domain you happened to research intensively every single day for a week, which would also cross the 60% threshold.

`UBIQUITY_THRESHOLD` is the knob for that tradeoff: raising it reduces false positives at the cost of letting some real ambient noise back in.

### Extending the Database for Intent Threads

Threads need their own store. Bump `DB_VERSION` to 3 and add `intent_threads`, indexed by `lastSeen`, so the dashboard can show the most recently active threads first:

```ts :collapsed-lines
import type { RawEvent, Session, IntentThread } from "../types";

interface OpenloopsDB extends DBSchema {
  raw_events: {
    key: string;
    value: RawEvent;
    indexes: { by_visitedAt: number };
  };
  sessions: {
    key: string;
    value: Session;
    indexes: { by_startedAt: number };
  };
  intent_threads: {
    key: string;
    value: IntentThread;
    indexes: { by_lastSeen: number };
  };
}

const DB_VERSION = 3;

export function getDB(): Promise<IDBPDatabase<OpenloopsDB>> {
  if (!_db) {
    _db = openDB<OpenloopsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("raw_events")) {
          const s = db.createObjectStore("raw_events", { keyPath: "id" });
          s.createIndex("by_visitedAt", "visitedAt");
        }
        if (!db.objectStoreNames.contains("sessions")) {
          const s = db.createObjectStore("sessions", { keyPath: "id" });
          s.createIndex("by_startedAt", "startedAt");
        }
        if (!db.objectStoreNames.contains("intent_threads")) {
          const s = db.createObjectStore("intent_threads", { keyPath: "id" });
          s.createIndex("by_lastSeen", "lastSeen");
        }
      },
    });
  }
  return _db;
}
```

Then add the matching helpers:

```ts :collapsed-lines
export async function putThreads(threads: IntentThread[]): Promise<void> {
  if (threads.length === 0) return;
  const db = await getDB();
  const tx = db.transaction("intent_threads", "readwrite");
  await Promise.all([...threads.map((t) => tx.store.put(t)), tx.done]);
}

export async function clearThreads(): Promise<void> {
  const db = await getDB();
  return db.clear("intent_threads");
}

export async function getAllThreads(): Promise<IntentThread[]> {
  const db = await getDB();
  const index = db
    .transaction("intent_threads", "readonly")
    .store.index("by_lastSeen");

  let cursor = await index.openCursor(null, "prev");
  const results: IntentThread[] = [];
  while (cursor) {
    results.push(cursor.value);
    cursor = await cursor.continue();
  }
  return results;
}

export async function getThreadCount(): Promise<number> {
  const db = await getDB();
  return db.count("intent_threads");
}
```

`putThreads`, `clearThreads`, and `getThreadCount` follow the same pattern as the `sessions` helpers from earlier. `getAllThreads` is the odd one out: instead of `getAllFromIndex`, which only returns ascending order, it opens a cursor on `by_lastSeen` in `"prev"` direction and walks it manually. That gives you threads ordered with the most recently active first, the order the dashboard wants for status-grouped cards.

### Clustering Sessions into Threads

With ambient domains identified, <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`threads.ts` now does the real work: grouping sessions into threads, then scoring and classifying each one.

The approach is [<VPIcon icon="fa-brands fa-google"/>greedy agglomerative clustering](https://research.google/blog/scaling-hierarchical-agglomerative-clustering-to-trillion-edge-graphs/). Walk through sessions in chronological order, and for each one, either merge it into the most similar existing thread or start a new thread if nothing is similar enough.

Start with the imports, the tuning constants, and the similarity calculation:

```ts :collapsed-lines title="pipeline/threads.ts"
import { getAllSessions, clearThreads, putThreads } from "../db/index";
import { detectAmbientDomains } from "./ambient";
import { hashId } from "../lib/util";
import type { Session, IntentThread } from "../types";

export const SIMILARITY_THRESHOLD = 0.15;
export const DOMAIN_WEIGHT = 0.5;
export const KEYWORD_WEIGHT = 0.5;

interface ThreadBuilder {
  id: string;
  sessions: Session[];
  domainSet: Set<string>;
  keywordSet: Set<string>;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return intersection / union;
}

function similarity(
  session: Session,
  thread: ThreadBuilder,
  ambient: Set<string>
): number {
  const sessionDomains  = new Set(session.domains.filter((d) => !ambient.has(d)));
  const threadDomains   = new Set([...thread.domainSet].filter((d) => !ambient.has(d)));
  const sessionKeywords = new Set(session.keywords);

  const domainScore   = jaccard(sessionDomains, threadDomains);
  const keywordScore  = jaccard(sessionKeywords, thread.keywordSet);

  return DOMAIN_WEIGHT * domainScore + KEYWORD_WEIGHT * keywordScore;
}
```

`ThreadBuilder` is a mutable accumulator used only during clustering: a thread in progress, with its sessions plus the union of all domains and keywords seen so far. `jaccard` is the standard set-similarity measure, the size of the intersection divided by the size of the union, returning 0 for two empty sets rather than dividing zero by zero.

`similarity` compares one candidate session against one in-progress thread. Before comparing domains, it filters ambient domains out of both sides, so a shared `youtube.com` never contributes to the score. It then computes a domain Jaccard score and a keyword Jaccard score separately, and combines them with `DOMAIN_WEIGHT` and `KEYWORD_WEIGHT`, both 0.5, giving domain overlap and keyword overlap equal say in the final number.

Next, the clustering loop itself:

```ts :collapsed-lines
function clusterSessions(
  sessions: Session[],
  ambient: Set<string>
): ThreadBuilder[] {
  const threads: ThreadBuilder[] = [];

  for (const session of sessions) {
    let bestThread: ThreadBuilder | null = null;
    let bestScore = 0;

    for (const thread of threads) {
      const score = similarity(session, thread, ambient);
      if (score > bestScore) {
        bestScore = score;
        bestThread = thread;
      }
    }

    if (bestThread && bestScore >= SIMILARITY_THRESHOLD) {
      bestThread.sessions.push(session);
      for (const d of session.domains)  bestThread.domainSet.add(d);
      for (const k of session.keywords) bestThread.keywordSet.add(k);
    } else {
      threads.push({
        id: hashId(session.id, session.startedAt),
        sessions: [session],
        domainSet:  new Set(session.domains),
        keywordSet: new Set(session.keywords),
      });
    }
  }

  return threads;
}
```

`clusterSessions` relies on `sessions` already being sorted chronologically, which `getAllSessions` guarantees via its index. For each session, it scores against every thread built so far and keeps the best match.

If that best score clears `SIMILARITY_THRESHOLD`, the session merges in and its domains and keywords get folded into the thread's accumulated sets. This means that later sessions are compared against the thread's *entire* accumulated history rather than only its seed session. If nothing clears the threshold, the session becomes the seed of a brand-new thread.

A worked example shows how this plays out. Suppose `detectAmbientDomains` returned `{ youtube.com }`, and three sessions arrive in this order:

```plaintext
S1: domains=[stackoverflow.com, typescriptlang.org]
    keywords=[typescript, generics, interface, mapped]

S2: domains=[stackoverflow.com, typescriptlang.org, github.com]
    keywords=[typescript, generics, utility, types]

S3: domains=[python.org, docs.python.org]
    keywords=[python, async, await, coroutine]
```

S1 arrives first. With no threads yet, it seeds Thread A: `domainSet = {stackoverflow.com, typescriptlang.org}`, `keywordSet = {typescript, generics, interface, mapped}`.

S2 is scored against Thread A. Neither set contains the ambient `youtube.com`, so nothing gets filtered out. The domain Jaccard is `|{stackoverflow.com, typescriptlang.org}| / |{stackoverflow.com, typescriptlang.org, github.com}|`, or 2/3 ≈ 0.667. The keyword Jaccard is `|{typescript, generics}| / |{typescript, generics, interface, mapped, utility, types}|`, or 2/6 ≈ 0.333. The combined similarity is `0.5 × 0.667 + 0.5 × 0.333 = 0.5`, comfortably above `SIMILARITY_THRESHOLD` (0.15), so S2 merges into Thread A, whose sets grow to include `github.com`, `utility`, and `types`.

S3 is scored against Thread A. There's no overlap at all between `{python.org, docs.python.org}` and Thread A's domains, or between their keyword sets, so both Jaccard scores are 0 and the combined similarity is 0. That's below the threshold, so S3 seeds a new Thread B.

The result: Thread A holds the TypeScript research across two sessions, and Thread B holds the Python session on its own.

`SIMILARITY_THRESHOLD` is the single most consequential constant in this file, and 0.15 is lower than you might guess for a 50/50 weighted Jaccard score. A starting value like 0.3 sounds more principled. That would mean two sessions need to share roughly a third of their combined domains and keywords before they're considered part of the same thread.

Run that against real, messy browsing history, though, and it produces far too many threads: sessions that were obviously part of the same research, but didn't share quite enough keywords to clear 0.3, end up scattered across separate threads.

Dropping the threshold to 0.15 lets sessions merge on weaker but still real signal. Two sessions sharing just one domain and one keyword out of several can already cross 0.15, and the result is fewer, more coherent threads that actually match what the browsing history looks like.

This is the kind of constant you tune empirically rather than deriving it from first principles: build your threads, look at the result, and adjust.

`buildThreads`, covered next, prints a table of every thread's title, type, status, confidence, and top keywords specifically so you can eyeball this. If two threads obviously belong together, lower `SIMILARITY_THRESHOLD`. If one thread is clearly several unrelated topics glued together, raise it.

### Scoring and Classifying Threads

Clustering produces groups of sessions, but a group of sessions isn't yet an `IntentThread`. The rest of <VPIcon icon="iconfont icon-typescript"/>`threads.ts` turns each group into something with a type, a confidence score, a status, and a set of human-readable signals explaining why.

A few small helpers come first:

```ts :collapsed-lines title="threads.ts"
export const BUYING_WORDS: readonly string[] = [
  "vs", "versus", "alternative", "alternatives",
  "comparison", "pricing", "price", "review", "reviews", "best",
];

export const LEARNING_WORDS: readonly string[] = [
  "how to", "tutorial", "tutorials", "docs", "documentation",
  "guide", "learn", "example", "examples", "crash course", "introduction",
];

const STATUS_ACTIVE_MS  = 48 * 60 * 60 * 1000;
const STATUS_STALLED_MS = 7  * 24 * 60 * 60 * 1000;

function toTitleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function findMatches(titles: string[], wordList: readonly string[]): string[] {
  const lower = titles.map((t) => t.toLowerCase());
  const found = new Set<string>();

  for (const word of wordList) {
    const isPhrase = word.includes(" ");
    for (const title of lower) {
      if (isPhrase) {
        if (title.includes(word)) found.add(word);
      } else {
        const tokens = title.split(/[^a-z0-9]+/);
        if (tokens.includes(word)) found.add(word);
      }
    }
  }

  return [...found];
}

function toCalendarDay(epochMs: number): string {
  return new Date(epochMs).toDateString();
}
```

`BUYING_WORDS` and `LEARNING_WORDS` are small vocabularies that signal intent. `findMatches` checks a list of page titles against one of these vocabularies, and handles single words and phrases differently: a multi-word entry like "how to" is checked as a substring, since it's specific enough that false positives are unlikely. But a single word like "review" is checked as a whole token, split out of the title on non-alphanumeric characters.

Without that distinction, "review" would match inside "overview" too, which would misclassify any thread that happened to involve an "Overview" page. `toTitleCase` and `toCalendarDay` are small formatting helpers used by the scoring function next.

That scoring function, `scoreThread`, is the longest function in the project, since it's where every signal collected so far gets turned into the fields on `IntentThread`:

```ts :collapsed-lines
function scoreThread(builder: ThreadBuilder): IntentThread {
  const { sessions, keywordSet } = builder;

  const firstSeen  = sessions[0].startedAt;
  const lastSeen   = sessions[sessions.length - 1].endedAt;

  const allEvents  = sessions.flatMap((s) => s.events);
  const totalEvents = allEvents.length;
  const daySet     = new Set(allEvents.map((e) => toCalendarDay(e.visitedAt)));
  const distinctDays = daySet.size;

  const allTitles      = allEvents.map((e) => e.title);
  const buyingMatches  = findMatches(allTitles, BUYING_WORDS);
  const learningMatches = findMatches(allTitles, LEARNING_WORDS);

  let type: IntentThread["type"];
  if (buyingMatches.length > 0) {
    type = "buying";
  } else if (learningMatches.length > 0) {
    type = "learning";
  } else if (distinctDays > 5 && sessions.length >= 3) {
    type = "planning";
  } else if (totalEvents >= 3) {
    type = "research";
  } else {
    type = "unclassified";
  }

  const age = Date.now() - lastSeen;
  const status: IntentThread["status"] =
    age < STATUS_ACTIVE_MS  ? "active"  :
    age < STATUS_STALLED_MS ? "stalled" :
    "dormant";

  const confidence = parseFloat((
    Math.min(distinctDays / 5, 1) * 0.35 +
    Math.min(sessions.length / 5, 1) * 0.25 +
    Math.min(totalEvents / 20, 1)  * 0.20 +
    (type !== "unclassified" ? 1 : 0)  * 0.20
  ).toFixed(2));

  const signals: string[] = [];

  if (distinctDays > 1)
    signals.push(`revisited across ${distinctDays} days`);
  if (type === "buying" && buyingMatches.length > 0)
    signals.push(`comparison language: ${buyingMatches.join(", ")}`);
  if (type === "learning" && learningMatches.length > 0)
    signals.push(`learning language: ${learningMatches.join(", ")}`);
  signals.push(`\({sessions.length} session\){sessions.length !== 1 ? "s" : ""}`);
  if (totalEvents > 5)
    signals.push(`${totalEvents} total events`);
  if (type === "planning")
    signals.push("sustained activity across many days");

  const ageDays = Math.floor(age / (24 * 60 * 60 * 1000));
  if (ageDays === 0)       signals.push("last active today");
  else if (ageDays === 1)  signals.push("last active yesterday");
  else                     signals.push(`last active ${ageDays} days ago`);

  const title =
    [...keywordSet].slice(0, 3).map(toTitleCase).join(" ") || "Untitled Thread";

  return {
    id: builder.id,
    title,
    sessions,
    type,
    confidence,
    status,
    firstSeen,
    lastSeen,
    distinctDays,
    signals,
  };
}
```

There's a lot here, so it's worth walking through each field on `IntentThread` in the order it's computed.

`firstSeen` and `lastSeen` come straight from the boundary sessions, since `sessions` arrives in chronological order from clustering. `distinctDays` reuses the same calendar-day collapsing as `ambient.ts`. This time it counts how many different days *this thread's* events span, regardless of how many total active days you had overall.

Classification into `type` is a cascade, and the order matters. Comparison language (`BUYING_WORDS`) is checked first, because a thread where you're comparing two frameworks is "buying" even if it also contains tutorial pages. Comparison intent is the stronger signal.

Learning language comes next. After that, `planning` is reserved for threads that span more than five distinct days *and* have at least three sessions of sustained, recurring activity rather than a single deep dive.

`research` is the catch-all for anything with at least three events that didn't match anything more specific, and `unclassified` is what's left, usually threads with too little activity to say anything confident about.

`status` is purely a function of how long ago `lastSeen` was: under 48 hours is `active`, under 7 days is `stalled`, anything older is `dormant`.

`confidence` is a weighted sum of four signals, each normalized to a maximum of 1 before weighting, so the total can't exceed 1 either. `distinctDays / 5`, capped at 1, contributes up to 35%, treating five or more distinct days as fully confident on that axis. `sessions.length / 5`, capped at 1, contributes up to 25%. `totalEvents / 20`, capped at 1, contributes up to 20%. And whether `type` is anything other than `unclassified` contributes the final 20% as an all-or-nothing bonus.

A thread revisited across five-plus days, across five-plus sessions, with twenty-plus events, that also classified cleanly, scores a full 1.0. A thread that's a single session with two events and no classification scores close to 0. `signals` is a plain-English audit trail for the confidence score and status: it explains why a thread looks the way it does, listing things like how many days it was revisited across, what comparison or learning language was found, the session and event counts, and how recently it was last active. The dashboard surfaces these directly.

Finally, `title` is a placeholder: the top three keywords from the thread's accumulated `keywordSet`, title-cased and joined with spaces, or `"Untitled Thread"` if there are none.

This is deliberately weak. Later in this guide, AI labeling replaces this heuristic title, along with `summary` and `nextStep`, with something grounded in what the thread is actually about (but the thread is fully usable without that step, too).

### Putting it Together

`buildThreads` ties everything in this section together:

```ts :collapsed-lines
export async function buildThreads(): Promise<{ sessions: number; threads: number }> {
  const sessions = await getAllSessions();

  if (sessions.length === 0) {
    await clearThreads();
    return { sessions: 0, threads: 0 };
  }

  const ambient = detectAmbientDomains(sessions);

  const builders = clusterSessions(sessions, ambient);

  const substantive = builders.filter(
    (b) => !(b.sessions.length === 1 && b.sessions[0].events.length < 3)
  );

  const threads = substantive.map(scoreThread);

  await clearThreads();
  await putThreads(threads);

  console.table(
    threads.map((t) => ({
      title:        t.title,
      type:         t.type,
      status:       t.status,
      confidence:   t.confidence,
      distinctDays: t.distinctDays,
      sessions:     t.sessions.length,
      events:       t.sessions.reduce((n, s) => n + s.events.length, 0),
      keywords:     [...new Set(t.sessions.flatMap((s) => s.keywords))].slice(0, 5).join(", "),
    }))
  );

  return { sessions: sessions.length, threads: threads.length };
}
```

The order here matters. `detectAmbientDomains` runs once, over every session, before any clustering happens, since ambient detection needs the full picture of your browsing to know what counts as "every day".

`clusterSessions` then produces `ThreadBuilder`s, which get filtered before scoring: a `ThreadBuilder` with exactly one session and fewer than three events is almost always a stray page load that didn't merge with anything, so it's dropped rather than becoming a thread with a confidence near zero.

Everything that survives gets scored by `scoreThread`, persisted, and printed via `console.table`, which is the tuning aid mentioned earlier. If you open the service worker's console after running this, every thread is laid out in a sortable table. This is the fastest way to spot a `SIMILARITY_THRESHOLD` that's too high or too low.

### Checkpoint

Like the previous two sections, `buildThreads` doesn't have a UI yet. It'll get wired up to a "Build intent map" button alongside the other two when you design the dashboard later in this guide.

For now, confirm that <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`ambient.ts`, the updated <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`, and <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`threads.ts` all build without errors, and that `getDB()` reports version 3 the next time the extension reloads. `intent_threads` should now be listed alongside `raw_events` and `sessions` in DevTools.

At this point, the entire core pipeline runs end to end, locally, with no API keys involved: your browsing history becomes raw events, raw events become sessions, and sessions become scored, classified intent threads.

Everything from here is optional and additive: cleaning up a source of self-referential noise this pipeline doesn't yet handle (which you probably want to look at and incorporate), then AI labeling, brand grounding, and the dashboard that ties it all together.

---

## How to Clean Up Self-Referential Noise

Run the pipeline a few times against your own browsing and a strange kind of thread starts appearing: one made entirely of openloops itself.

The dashboard is a web page, so every time you open it to check your threads, that page load gets captured as an event. If you're also developing the extension, your `localhost` dev server and any private-network addresses end up in the data too.

The tool ends up watching itself use itself, and that self-reference pollutes the intent map in two distinct ways which are worth separating.

### The Two Problems

The first problem is the extension's own pages. A Chrome extension's dashboard loads from a `chrome-extension://` URL, and Chrome's own internal pages use `chrome://`. Left unfiltered, opening the openloops dashboard ten times in an afternoon produces ten events on a `chrome-extension://` origin, which cluster happily into a thread about, essentially, looking at your threads.

This is circular and useless, and because you tend to open the dashboard often while the rest of your browsing is quieter, this self-thread can score deceptively high on recency and session count.

The second problem is local development infrastructure. If you're building the extension, or any local project, your history fills with `localhost:5173`, `127.0.0.1:8080`, and maybe LAN addresses like `192.168.1.40`. These are real page visits as far as Chrome is concerned, but they carry no browsing intent in the sense openloops cares about. Worse, they'd later be sent to [<VPIcon icon="fas fa-globe"/>context.dev](http://context.dev) during brand enrichment, where they can never resolve to anything and would only waste API credits.

Both problems share a root cause: the pipeline is capturing URLs that aren't really part of your browsing in the first place. The fix is to define what counts as a real, external web page once, and apply that definition everywhere a URL or domain enters the system.

### One Definition, Applied Everywhere

The two helpers that do this, `isHttpUrl` and `isLocalHost`, were written back when you first built <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`util.ts`. We deliberately introduced them early for exactly this moment.

`isHttpUrl` returns true only for `http://` and `https://` URLs, which excludes `chrome-extension://`, `chrome://`, `about:`, and `file://` in one stroke. `isLocalHost` returns true for `localhost`, loopback and private IP ranges, and `.local` hostnames.

The thing that makes them effective is consistency: the same two functions guard every entry point, so the definition of "a real page" can never drift between one part of the pipeline and another. There are three such entry points.

Live capture, in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`background.ts`, calls `isHttpUrl` before recording anything:

```ts title="background.ts"
if (!isHttpUrl(url)) return;
```

The backfill, in <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`backfill.ts`, applies the same guard to every history item before fetching its visits:

```ts title="pipeline/backfill.ts"
if (!item.url) return [];
if (!isHttpUrl(item.url)) return [];
```

And the noise filter, in <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`noise.ts`, checks both helpers at the very top of `isNoise`, before any of its domain or title rules run:

```ts title="pipeline/noise.ts"
export function isNoise(event: RawEvent): boolean {
  if (!isHttpUrl(event.url)) return true;
  if (isLocalHost(event.domain)) return true;
  return domainIsBlocked(event.domain) || titleIsGeneric(event.title, event.domain);
}
```

Capture and backfill already screen out non-web URLs, so checking `isHttpUrl` a third time inside `isNoise` looks redundant, and in normal operation it is. The third check is a guarantee: if a stray non-web event ever reaches `raw_events` through some path you didn't anticipate (like a future capture mechanism, imported data, or a bug), it still can't survive into a session.

Each stage defends its own input rather than trusting that an earlier stage did its job. This is what keeps a single missed case from silently propagating all the way into the intent map.

### Defending the Enrichment Boundary Too

The same `isLocalHost` check appears once more, in the brand enrichment step you'll build next, where domains get sent to [<VPIcon icon="fas fa-globe"/>context.dev](http://context.dev). Even though `isNoise` already strips local addresses before sessionization, the enrichment function filters them again before making any network call:

```ts
const unique = [...new Set(domains)].filter((d) => !isLocalHost(d));
```

The reasoning is the same defense-in-depth idea, applied to a boundary where the cost of a mistake is higher. A local address that somehow reached a thread's domain list shouldn't just be useless noise in the UI. It should never leave your machine as part of an API request. Putting the filter directly at the network boundary means that guarantee holds regardless of what happened upstream.

### Checkpoint

After loading the updated build, openloops should stop appearing in its own intent map. To verify, open the dashboard a handful of times, browse some real pages, then rebuild the pipeline: the `chrome-extension://` self-thread should be gone, and no `localhost` or private-IP domains should appear in any thread's domain list.

If you inspect `raw_events` in DevTools, you may still see live-captured events from before this fix, since the backfill clears and rewrites events but live capture appends. Running a fresh "Scan my history" wipes and repopulates `raw_events` cleanly under the new rules.

With the pipeline now producing a clean intent map of genuinely external browsing, it's worth making those threads more legible.

Up to now, each thread's title is just its top three keywords stitched together, and there's no summary or suggested next step at all. The next section adds the first optional, key-gated layer: AI labeling with Claude.

---

## How to Label Threads with Claude

A thread titled "Typescript Generics Handbook" is readable, but it's a description of the keywords – not of what you were trying to do. "Learning TypeScript's advanced type system" is the kind of label a person would actually write, and the difference between those two is the gap this section closes.

Claude reads each thread's keywords, domains, and sample page titles, and returns a real title, a one-sentence summary, a classification, and a concrete next step.

This is the first part of openloops that calls an external API and requires a key. Everything about its design is shaped by one constraint: the request has to survive real data, where a person might have thirty or forty threads, each carrying a dozen page titles.

The naïve version of this is to send all the threads in one request and ask for all the labels back. And that's exactly what the first implementation did. But it failed in a way worth walking through, because the fix is the most instructive part of the whole section.

### Storing Keys Locally

Before any API call, the key needs somewhere to live. openloops keeps it in `chrome.storage.local`, which never syncs anywhere and never leaves the device. Create <VPIcon icon="fas fa-folder-open"/>`src/lib/settings.ts`:

```ts title="lib/settings.ts"
export async function getApiKey(): Promise<string | null> {
  const result = await chrome.storage.local.get("anthropicApiKey");
  return (result.anthropicApiKey as string) ?? null;
}

export async function setApiKey(key: string): Promise<void> {
  await chrome.storage.local.set({ anthropicApiKey: key });
}
```

The same file later grows parallel getters and setters for the [<VPIcon icon="fas fa-globe"/>context.dev](http://context.dev) key and the assistant's model and effort preferences, all following this identical shape. So it's enough to understand this one pair to understand all of them.

### The First Version, and How it Broke

The first labeling implementation sent every thread to Claude in a single request: serialize all forty threads into one JSON payload, ask for a JSON array of forty labels in return, parse it, write it back. It worked perfectly with five or six threads during early testing, then silently produced nothing once a real history with thirty-plus threads went through it. There was no error or thrown exception, just threads that kept their old keyword titles as if the labeling had never run.

The cause was output token truncation. A request specifies `max_tokens`, the ceiling on how much the model may generate in response, and forty threads' worth of titles, summaries, and next steps is a lot of output. When the response hit that ceiling mid-generation, the JSON array was cut off partway through an opening `[` and thirty complete objects followed by half of the thirty-first and no closing `]`. `JSON.parse` on that throws, the catch block logged it and returned nothing, and because labeling was designed to fail gracefully and leave existing titles intact, the failure was invisible from the UI.

Two design changes came out of this, and both are in the final code: split the work into small batches so no single response can grow large enough to truncate, and make the parsing resilient enough that one bad batch can't take down the whole run.

### Batching the Requests

Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`label.ts`, starting with the per-batch request function:

```ts :collapsed-lines title="pipeline/label.ts"
import { getAllThreads, putThreads, getAllBrands } from "../db/index";
import type { IntentThread } from "../types";

interface ThreadDescriptor {
  id: string;
  keywords: string[];
  domains: string[];
  sampleTitles: string[];
  domainContext: string[];
}

interface LabelResult {
  id: string;
  title: string;
  summary: string;
  type: string;
  nextStep: string;
}

const VALID_TYPES: ReadonlySet<IntentThread["type"]> = new Set([
  "buying",
  "research",
  "learning",
  "planning",
  "unclassified",
]);

const BATCH_SIZE = 10;
const MAX_TOKENS_PER_BATCH = 4000;

async function callClaudeBatch(
  apiKey: string,
  systemPrompt: string,
  batch: ThreadDescriptor[],
): Promise<LabelResult[] | null> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: MAX_TOKENS_PER_BATCH,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: JSON.stringify(batch),
        },
      ],
    }),
  });

  if (!response.ok) {
    let body = "";
    try { body = (await response.text()).slice(0, 400); } catch { }
    console.error(
      `[openloops] label: API request failed\n` +
      `  → HTTP \({response.status} \){response.statusText}\n` +
      `  body: ${body || "(empty)"}`,
    );
    if (response.status === 401) {
      throw new Error("Invalid API key. Check your Anthropic API key and try again.");
    }
    throw new Error(`API request failed: \({response.status} \){response.statusText}`);
  }

  const data = await response.json();
  const raw: string = data.content[0].text;

  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/, "")
    .replace(/```\s*$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`[openloops] label: parse error: ${err instanceof Error ? err.message : String(err)}`);
    console.error(`[openloops] label: raw tail (last 400 chars):\n${raw.slice(-400)}`);
    return null;
  }
}
```

`BATCH_SIZE` of 10 with `MAX_TOKENS_PER_BATCH` of 4000 is the direct answer to the truncation problem. Ten threads' worth of labels comfortably fits inside 4000 output tokens with room to spare, so a batch can't hit the ceiling and get cut off. A history with forty threads becomes four independent requests rather than one oversized one.

The request itself uses raw `fetch` rather than Anthropic's TypeScript SDK, because the SDK isn't built to run in a browser or extension context.

Browser-originated calls to the Anthropic API also require the `anthropic-dangerous-direct-browser-access` header, which is what opts into this usage pattern. The model is Claude Haiku, the fastest and cheapest in the lineup, which is well-matched to a high-volume, structured-output task like this one where you're making several calls and want them quick.

The error handling splits into two deliberately different behaviors. An HTTP-level failure (a 401 from a bad key, a 429 from rate limiting) throws, because every subsequent batch would fail the same way and there's no point continuing. A *parse* failure, by contrast, returns `null` rather than throwing, so the caller can skip just that one batch and keep going with the rest.

The fence-stripping before `JSON.parse` handles a common real-world wrinkle: models sometimes wrap JSON output in a Markdown code fence (` ```json`), even when asked for raw JSON. The two `.replace` calls strip a leading fence and a trailing fence if present, tolerating surrounding whitespace, so a response comes through whether or not it arrived wrapped.

When parsing still fails, the catch logs the last 400 characters of the raw response, which is precisely where you'd see the truncation signature of a cut-off array, the diagnostic that would have made the original bug obvious in minutes.

### Building the Prompt and Merging Results

The public `labelThreads` function builds the descriptors, runs the batches, and merges what comes back:

```ts :collapsed-lines
export async function labelThreads(apiKey: string): Promise<{ labeled: number }> {
  const threads = await getAllThreads();
  if (threads.length === 0) return { labeled: 0 };

  const allBrands = await getAllBrands();
  const brandMap = new Map(allBrands.map((b) => [b.domain, b]));

  const descriptors: ThreadDescriptor[] = threads.map((t) => {
    const keywords = [...new Set(t.sessions.flatMap((s) => s.keywords))].slice(0, 8);
    const domains  = [...new Set(t.sessions.flatMap((s) => s.domains))].slice(0, 5);
    const titles   = [...new Set(t.sessions.flatMap((s) => s.events.map((e) => e.title)))].slice(0, 20);

    const domainContext = domains
      .map((d) => {
        const brand = brandMap.get(d);
        if (!brand || !brand.name) return null;
        let line = `\({d}: \){brand.name}`;
        if (brand.description) line += ` — ${brand.description}`;
        if (brand.industry)    line += ` (${brand.industry})`;
        return line;
      })
      .filter((s): s is string => s !== null);

    return { id: t.id, keywords, domains, sampleTitles: titles, domainContext };
  });

  const systemPrompt = `You label browsing intent threads. Return ONLY a JSON array — no markdown fences, no explanation.
Each element: { "id": "<thread id>", "title": "<3-6 word title>", "summary": "<1 sentence>", "type": "<buying|research|learning|planning|unclassified>", "nextStep": "<one concrete, specific action to move this thread forward or close the loop>" }
The nextStep must be grounded in what the person was actually looking at. Be specific — name the actual decision, comparison, or action (e.g. "Decide between MacBook Pro and Dell XPS — your open question was battery life") rather than generic advice ("continue researching"). Use the sampleTitles and domainContext to ground it.
Each thread descriptor may include a "domainContext" array of company descriptions for the sites visited. When present, use these to produce sharper, more specific titles, summaries, and next steps grounded in what each company actually does.
Respond with exactly one array covering every thread in the request.`;

  const allResults: LabelResult[] = [];
  let failedBatches = 0;
  for (let i = 0; i < descriptors.length; i += BATCH_SIZE) {
    const batch = descriptors.slice(i, i + BATCH_SIZE);
    const results = await callClaudeBatch(apiKey, systemPrompt, batch);
    if (results === null) {
      failedBatches++;
      continue;
    }
    allResults.push(...results);
  }

  const byId = new Map(allResults.map((r) => [r.id, r]));

  let labeled = 0;
  const updated = threads.map((t) => {
    const label = byId.get(t.id);
    if (!label) return t;

    const type = VALID_TYPES.has(label.type as IntentThread["type"])
      ? (label.type as IntentThread["type"])
      : t.type;

    labeled++;
    return {
      ...t,
      title:    label.title    || t.title,
      summary:  label.summary  || undefined,
      nextStep: label.nextStep || undefined,
      type,
    };
  });

  await putThreads(updated);
  return { labeled };
}
```

Each thread is compressed into a `ThreadDescriptor` carrying only what Claude needs to label it: up to eight keywords, five domains, and twenty sample page titles, capped so a thread with hundreds of events doesn't bloat the payload.

The `domainContext` field is the hook for the brand-grounding step covered in the next section. It's empty for now since no brands have been fetched yet, which is exactly why labeling works fine on its own and gets sharper once grounding is added.

The merge step is where a failed batch costs you only its own threads. Results come back as a flat list across all successful batches, indexed by thread id into `byId`.

Then every thread is walked: if a label came back for it, the AI title, summary, next step, and type are merged in, with the returned `type` validated against `VALID_TYPES` and falling back to the heuristic type if the model returned something unexpected. If no label came back, because that thread's batch failed to parse, the thread is returned untouched, keeping the keyword title and heuristic classification it already had.

A single failed batch costs you ten threads' worth of polish, not the entire run, and never corrupts a thread with malformed data.

Notice that `title`, `summary`, and `nextStep` all guard against empty strings with `|| t.title` and `|| undefined`. A thread always has a usable title even if the model returned a blank one, and `summary` and `nextStep` stay `undefined` rather than becoming empty strings. This keeps the dashboard's "does this thread have a summary?" checks honest.

### Checkpoint

Labeling needs a key and a button, both of which arrive with the dashboard later in this guide, so a full end-to-end test waits until then.

What you can verify now is that <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`settings.ts` and <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`label.ts` compile, and that the request shape is correct by calling `labelThreads` with a real key from a temporary test harness if you want immediate feedback. When it runs against built threads, the `console` will show batch progress, and your threads' titles in IndexedDB will change from keyword fragments to readable phrases, with `summary` and `nextStep` fields appearing for the first time.

The labels are already a large improvement, but they're working from keywords and bare domain names. This means a thread built around `mastra.ai` and `langchain.com` has no idea those are AI agent frameworks. It only sees two domain strings.

The next section closes that gap by resolving domains into real company descriptions before labeling. This is the grounding step that gives the AI something concrete to reason about.

---

## How to Ground Labels with context.dev

This is the most distinctive idea in openloops, so it's worth stating plainly before any code: instead of asking the model to label a thread from keywords and bare domain names, openloops first resolves each domain into a real company description – what the company is, what industry it's in, what it actually does – and feeds those descriptions into the labeling prompt. The model labels the thread knowing that `mastra.ai` and `langchain.com` are both AI agent frameworks, rather than seeing two opaque strings it has to guess about.

A thread whose keywords are "mastra langchain sholajegede" produces, ungrounded, a title like "Mastra Langchain Sholajegede", a literal echo of the keywords. Grounded with the knowledge that those domains are competing agent frameworks, the same thread becomes "Benchmarking Mastra against LangChain", a title that names the actual intent.

The raw material for a good label was always there in the browsing. What was missing was the context to interpret it, and that context is exactly what a brand-intelligence API provides.

### What the API Returns

openloops uses context.dev, which resolves a domain into a structured brand record: company name, a one-line description, industry classification, brand colors, and logo URLs. The grounding step needs the name, description, and industry, while the logo and colors get used later by the dashboard to render domain chips.

This step is entirely optional: the labeling from the previous section works without it, and grounding simply makes the output sharper when a context.dev key is present.

Like the Anthropic key, the context.dev key lives in `chrome.storage.local`, via the same getter/setter pattern in <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`settings.ts`:

```ts title="lib/settings.ts"
export async function getContextKey(): Promise<string | null> {
  const result = await chrome.storage.local.get("contextDevApiKey");
  return (result.contextDevApiKey as string) ?? null;
}

export async function setContextKey(key: string): Promise<void> {
  await chrome.storage.local.set({ contextDevApiKey: key });
}
```

Brand records also need a place to be cached, since resolving the same domain twice is wasteful and costs API credits. Bump `DB_VERSION` to 4 and add a `domain_brands` store keyed by domain:

```ts
import type { RawEvent, Session, IntentThread, Brand } from "../types";

interface OpenloopsDB extends DBSchema {
  raw_events: { key: string; value: RawEvent; indexes: { by_visitedAt: number } };
  sessions: { key: string; value: Session; indexes: { by_startedAt: number } };
  intent_threads: { key: string; value: IntentThread; indexes: { by_lastSeen: number } };
  domain_brands: {
    key: string;
    value: Brand;
  };
}

const DB_VERSION = 4;
```

Inside the `upgrade` callback, the new store is added with the same guard as the others, and `domain_brands` is keyed on `domain` rather than `id` because a domain is its own natural unique key:

```ts
if (!db.objectStoreNames.contains("domain_brands")) {
  db.createObjectStore("domain_brands", { keyPath: "domain" });
}
```

The matching helpers add one that's specific to caching, `getCachedDomains`. This returns the set of domains already resolved so the enrichment step can skip them:

```ts
export async function getBrand(domain: string): Promise<Brand | undefined> {
  const db = await getDB();
  return db.get("domain_brands", domain);
}

export async function putBrands(brands: Brand[]): Promise<void> {
  if (brands.length === 0) return;
  const db = await getDB();
  const tx = db.transaction("domain_brands", "readwrite");
  await Promise.all([...brands.map((b) => tx.store.put(b)), tx.done]);
}

export async function getAllBrands(): Promise<Brand[]> {
  const db = await getDB();
  return db.getAll("domain_brands");
}

export async function getCachedDomains(): Promise<Set<string>> {
  const db = await getDB();
  const keys = await db.getAllKeys("domain_brands");
  return new Set(keys);
}
```

### Fetching One Brand

Create <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`enrich.ts`. The core is a function that resolves a single domain, and most of its length is there to make sure a slow or failing lookup can never hang or crash the whole step:

```ts :collapsed-lines title="pipeline/enrich.ts"
import { getCachedDomains, putBrands } from "../db/index";
import { isLocalHost } from "../lib/util";
import type { Brand } from "../types";

const API_BASE        = "https://api.context.dev/v1";
const LOGO_LINK_BASE  = "https://logos.context.dev";

const REQUEST_TIMEOUT_MS = 15_000;
const BATCH_SIZE     = 3;
const BATCH_DELAY_MS = 2_000;

interface FetchResult {
  brand: Brand | null;
  errorCode?: string;
}

async function fetchBrand(domain: string, contextKey: string): Promise<FetchResult> {
  const url = `\({API_BASE}/brand/retrieve?domain=\){encodeURIComponent(domain)}`;
  const headers = { Authorization: `Bearer ${contextKey}` };

  async function attempt(): Promise<Response> {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
    try {
      return await fetch(url, { headers, signal: ctrl.signal });
    } finally {
      clearTimeout(tid);
    }
  }

  try {
    let res = await attempt();

    if (res.status === 408) {
      res = await attempt();
    }

    if (!res.ok) {
      let body = "";
      try { body = (await res.text()).slice(0, 400); } catch { }
      console.error(`[openloops] enrich: HTTP \({res.status} for "\){domain}" — ${body}`);
      return { brand: null, errorCode: String(res.status) };
    }

    let data: { status?: string; brand?: Record<string, unknown> };
    try {
      data = await res.json();
    } catch (e) {
      return { brand: null, errorCode: "parse" };
    }

    if (data.status !== "ok" || !data.brand) {
      return { brand: null, errorCode: "shape" };
    }

    const b = data.brand as {
      title?:        string;
      description?:  string;
      colors?:       { hex?: string }[];
      logos?:        { url?: string }[];
      industries?:   { eic?: { industry?: string; subindustry?: string }[] };
    };

    const logoUrl =
      b.logos?.[0]?.url ||
      `\({LOGO_LINK_BASE}?domain=\){encodeURIComponent(domain)}`;

    return {
      brand: {
        domain,
        name:        b.title                          ?? domain,
        description: b.description                    ?? "",
        industry:    b.industries?.eic?.[0]?.industry ?? "",
        logoUrl,
        brandColor:  b.colors?.[0]?.hex               ?? "",
      },
    };

  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { brand: null, errorCode: "timeout" };
    }
    return { brand: null, errorCode: "network" };
  }
}
```

The request authenticates with a bearer token and hits a single `brand/retrieve` endpoint. The `attempt` inner function wraps each call in an `AbortController` with a 15-second timeout, so a stalled connection aborts itself rather than hanging the enrichment step indefinitely.

The `finally` clears the timer whether the request succeeds, fails, or aborts. A `408` response from context.dev means a cold cache miss on their side, which their documentation says to retry once, so a single retry handles it before giving up.

The response is unpacked defensively at every level: a non-OK status returns a `FetchResult` with the HTTP code, a body that won't parse returns a `"parse"` error, and a response whose shape isn't what's expected returns a `"shape"` error.

When the brand record does come through, each field falls back to a sensible default if absent, the company name falls back to the domain itself, the description and industry to empty strings, and the logo to context.dev's keyless logo CDN if the record carries no logo URL.

Every failure path returns `{ brand: null, errorCode }` rather than throwing, which is what lets the batch driver above it treat a single domain's failure as a skip rather than a crash.

### Enriching Domains in Batches

The public `enrichDomains` function resolves a list of domains, skipping ones already cached and respecting the API's rate limit:

```ts :collapsed-lines
export async function enrichDomains(
  contextKey: string,
  domains: string[],
): Promise<{ enriched: number; failed: number; error?: string }> {
  const unique = [...new Set(domains)].filter((d) => !isLocalHost(d));

  let cached: Set<string>;
  try {
    cached = await getCachedDomains();
  } catch (err) {
    return { enriched: 0, failed: 0, error: "DB error" };
  }

  const toFetch = unique.filter((d) => !cached.has(d));
  if (toFetch.length === 0) return { enriched: 0, failed: 0 };

  let enriched = 0;
  let failed   = 0;
  let firstErrorCode: string | undefined;

  for (let i = 0; i < toFetch.length; i += BATCH_SIZE) {
    const batch   = toFetch.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((d) => fetchBrand(d, contextKey)));

    const brands = results.map((r) => r.brand).filter((b): b is Brand => b !== null);

    for (const r of results) {
      if (!r.brand) {
        failed += 1;
        if (!firstErrorCode) firstErrorCode = r.errorCode;
      }
    }

    if (brands.length > 0) {
      try {
        await putBrands(brands);
        enriched += brands.length;
      } catch (err) {
        failed += brands.length;
      }
    }

    if (i + BATCH_SIZE < toFetch.length) {
      await new Promise<void>((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  let error: string | undefined;
  if (firstErrorCode) {
    const map: Record<string, string> = {
      "401":     "401 — invalid key",
      "403":     "403 — check key permissions",
      "429":     "429 — rate limited, try again later",
      "timeout": "request timeout (15 s)",
      "network": "unreachable — check network/CORS",
    };
    error = map[firstErrorCode] ?? firstErrorCode;
  }

  return { enriched, failed, error };
}
```

The function opens by stripping local addresses with `isLocalHost`, the enrichment-boundary guard discussed in the self-referential noise section. This means that a dev server can never be sent to context.dev even if it slipped into a thread's domain list. It then removes already-cached domains via `getCachedDomains`, so re-running enrichment only ever fetches domains it hasn't seen. This keeps credit usage proportional to new browsing rather than total browsing.

The remaining domains are fetched three at a time, with a two-second pause between batches. This keeps the request rate well under the API's limit without making the user wait through a long serial queue.

Failures are tallied rather than thrown: a domain that fails to resolve increments `failed` and records its error code, but the loop carries on. The first error code encountered gets mapped to a human-readable message at the end so the UI can show something useful, such as an invalid-key or rate-limit notice.

The whole function returns counts rather than raising, which matters because the dashboard runs enrichment immediately before labeling, and a problem fetching brands should never prevent the labeling that follows it.

### How Grounding Feeds Back into Labeling

Grounding connects back to `labelThreads` from the previous section, which already builds a `domainContext` array for each thread by looking up every domain in the brand cache:

```ts
const domainContext = domains
  .map((d) => {
    const brand = brandMap.get(d);
    if (!brand || !brand.name) return null;
    let line = `\({d}: \){brand.name}`;
    if (brand.description) line += ` — ${brand.description}`;
    if (brand.industry)    line += ` (${brand.industry})`;
    return line;
  })
  .filter((s): s is string => s !== null);
```

Before enrichment runs, the brand cache is empty, every lookup returns nothing, `domainContext` is an empty array, and the prompt falls back to keywords and domain names alone.

After enrichment, the same code produces lines like `mastra.ai: Mastra — TypeScript framework for building AI agents (Developer Tools)`, and the labeling prompt's instruction to use `domainContext` "to produce sharper, more specific titles, summaries, and next steps" finally has something to work with.

The two steps are decoupled by design: labeling never requires grounding, but grounding measurably improves labeling. This is why the dashboard runs them in sequence as a single "enrich, then label" action.

### Checkpoint

Like the labeling step, enrichment is exercised through the dashboard, so the full path waits for the dashboard section. For now, confirm that <VPIcon icon="fas fa-folder-open"/>`src/pipeline/`<VPIcon icon="iconfont icon-typescript"/>`enrich.ts` and the updated <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`index.ts` compile, and that `getDB()` reports version 4 with `domain_brands` present in DevTools.

Once it runs against real threads with a context.dev key, the `domain_brands` store fills with cached records, and your thread labels should noticeably sharpen. The clearest single demonstration will be any thread built around niche or technical domains whose names don't, on their own, reveal what they are.

Every piece of the engine now exists: capture, sessions, clustering, scoring, labeling, and grounding. What's missing is the surface that drives them and shows the results.

The next section builds the dashboard, the three-column React interface with its onboarding flow and pipeline state machine, that turns this pipeline into something a person actually uses.

---

## How to Design the Dashboard

The dashboard is a single React component tree rendered into the full-tab page you wired up at the very start when you set `options_page` in the manifest.

It does three jobs: it drives the pipeline (the buttons that run scanning, session-building, thread-building, and labeling), it displays the resulting intent map (threads grouped by status), and it hosts the assistant covered in the next section.

This section focuses on the structure and the one piece of genuinely interesting logic: the state machine that decides which pipeline button is live at any moment. We'll treat the styling at a summary level here, since it's mostly conventional CSS.

### The Three-Column Layout

.<VPIcon icon="fas fa-folder-open"/>`src/dashboard/`<VPIcon icon="fa-brands fa-react"/>`App.tsx` lays out three columns inside a flex shell. The left rail holds the pipeline controls, the API-key inputs, and the status filter. The center column is the main content: either the onboarding welcome screen or the intent map of threads. The right column holds overview statistics and the assistant chat.

```plaintext
┌──────────────┬───────────────────────────┬──────────────────┐
│  LEFT RAIL   │       MAIN COLUMN         │  RIGHT COLUMN    │
│              │                           │                  │
│  Pipeline    │  Welcome screen           │  Overview stats  │
│   · Scan     │    — or —                 │                  │
│   · Sessions │  Intent map:              │  Assistant chat  │
│   · Threads  │   ACTIVE   threads        │   · messages     │
│              │   STALLED  threads        │   · composer     │
│  Keys        │   DORMANT  threads        │   · model/effort │
│  Filter      │                           │                  │
└──────────────┴───────────────────────────┴──────────────────┘
```

Each thread renders as a card showing its title, type and status pills, the AI summary, the next-step row with a Resume button, a confidence bar, and a collapsible details section with domains, keywords, and signals.

The cards are grouped into ACTIVE, STALLED, and DORMANT sections, sorted by confidence within each group. The threads most worth acting on rise to the top of the most urgent group.

The styling lives in <VPIcon icon="fas fa-folder-open"/>`src/dashboard/`<VPIcon icon="fa-brands fa-css3-alt"/>`app.css` and is conventional: a dark theme defined through CSS custom properties (a near-black background, a single orange accent at `--accent: #ff5c33`, a small scale of grays for text and borders), a monospace font for labels and metadata, and a sans-serif for content.

The design choices that matter for usability are the status-based color coding (the accent for active, a muted amber for stalled, gray for dormant) and the confidence bar's width mapping directly to the thread's confidence score.

None of the CSS is load-bearing for understanding the build, so rather than reproduce it, the rest of this section focuses on the logic the styling sits on top of.

### The Pipeline State Machine

The pipeline has a strict order: you can't build sessions before scanning history, and you can't build threads before building sessions. The dashboard encodes this as a small state machine, and getting it right is what makes the interface feel guided rather than confusing. Every button is either disabled (its input doesn't exist yet), highlighted as the next action to take, or done (re-runnable, but no longer the obvious next step).

```ts
type PipelineState = "disabled" | "next" | "done";

function pipelineStates(
  hasScanned: boolean,
  eventCount: number | null,
  sessionCount: number | null,
  threadCount: number | null,
): { scan: PipelineState; sessions: PipelineState; threads: PipelineState } {
  const hasEvents   = (eventCount   ?? 0) > 0;
  const hasSessions = (sessionCount ?? 0) > 0;
  const hasThreads  = (threadCount  ?? 0) > 0;

  if (!hasScanned)  return { scan: "next", sessions: "disabled", threads: "disabled" };
  if (!hasSessions) return { scan: "done", sessions: hasEvents ? "next" : "disabled", threads: "disabled" };
  if (!hasThreads)  return { scan: "done", sessions: "done", threads: "next" };
  return { scan: "done", sessions: "done", threads: "done" };
}
```

The function reads the presence of data at each stage and returns the state of all three buttons. Before any scan, only Scan is live, marked `next`, while the other two are disabled.

Once events exist but sessions don't, Scan flips to `done` and Sessions becomes `next`. Once sessions exist but threads don't, Threads becomes `next`. Once all three stages have produced output, everything is `done`, every step re-runnable but none demanding attention. The cascade walks the pipeline in order and lights up exactly one `next` action at a time, which is what turns a row of three buttons into a guided sequence.

The first parameter, `hasScanned`, is more subtle than a simple count. It's where a piece of plumbing from the very first capture section pays off.

The check can't just be "are there any events," because live capture starts populating `raw_events` the moment the extension is installed. There would *always* be events, and the onboarding would skip straight past the Scan step before the user had ever scanned.

The fix is the `source` field on every `RawEvent`, set to `"backfill"` or `"live"` back when you built capture. `hasScanned` comes from a dedicated query that checks specifically for backfill events:

```ts
export async function hasBackfillEvents(): Promise<boolean> {
  const db = await getDB();
  let cursor = await db.transaction("raw_events", "readonly").store.openCursor();
  while (cursor) {
    if (cursor.value.source === "backfill") return true;
    cursor = await cursor.continue();
  }
  return false;
}
```

This walks `raw_events` until it finds a single event with `source === "backfill"`, returning early the moment it does. Live-captured events alone never satisfy it, so "Scan my history" stays lit as the first step until the user actually runs a backfill, which is the correct onboarding behavior. The seemingly minor decision to tag each event with its origin, made several sections ago, is what makes this distinction possible now.

### Driving the Welcome Screen from the Same Machine

A first-time user with no threads sees a centered welcome screen instead of an empty intent map. But rather than give that screen its own separate logic, the dashboard drives it from the same `pipelineStates` output. Whichever step is currently `next` determines which single call-to-action the welcome screen shows:

```ts
let welcomeStep: 1 | 2 | 3 = 1;
let welcomeCtaLabel = "Scan my history";
let welcomeCtaClick = handleScan;
if (scanState === "next") {
  welcomeStep = 1;
  welcomeCtaLabel = scanning ? "Scanning…" : "Scan my history";
  welcomeCtaClick = handleScan;
} else if (sessionsState === "next") {
  welcomeStep = 2;
  welcomeCtaLabel = buildingSessions ? "Building…" : "Build sessions";
  welcomeCtaClick = handleBuildSessions;
} else if (threadsState === "next") {
  welcomeStep = 3;
  welcomeCtaLabel = buildingThreads ? "Building…" : "Build your intent map";
  welcomeCtaClick = handleBuildThreads;
}
```

The welcome screen's single button always mirrors the rail's `next` action, so a user can move through scan, build sessions, and build threads by clicking one prominent button three times. The moment threads exist, the welcome screen is replaced by the intent map. The rail and the welcome screen never disagree about what to do next, because both read from the same source of truth.

### Wiring the Handlers

The handlers themselves are thin: each runs a pipeline stage, then refreshes the component's view of the database. The action that runs grounding and labeling together is the one worth seeing, because it puts into practice the decoupling described in the previous two sections:

```ts
async function handleEnrichAndLabel() {
  setLabelError(null);
  setEnrichError(null);

  if (contextKey.trim() && contextKeySaved) {
    setEnriching(true);
    try {
      const allDomains = [...new Set(
        threads.flatMap((t) => t.sessions.flatMap((s) => s.domains))
      )];
      const result = await enrichDomains(contextKey.trim(), allDomains);
      if (result.error) setEnrichError(`context.dev: ${result.error}`);
      if (result.enriched > 0) {
        const all = await getAllBrands();
        setBrands(new Map(all.map((b) => [b.domain, b])));
      }
    } catch (err) {
      setEnrichError(`context.dev: ${err instanceof Error ? err.message : "unknown error"}`);
    } finally {
      setEnriching(false);
    }
  }

  setLabeling(true);
  try {
    await labelThreads(apiKey.trim());
    setThreads(await getAllThreads());
  } catch (err) {
    setLabelError(err instanceof Error ? err.message : "Labeling failed.");
  } finally {
    setLabeling(false);
  }
}
```

Enrichment runs only if a context.dev key is present, and it's wrapped so that any failure (like a network error, a bad key, or a rate limit) sets an error message but never stops execution. Labeling then runs unconditionally afterward, outside the enrichment block, so it proceeds whether enrichment succeeded, failed, or was skipped entirely for lack of a key.

That structure is the decoupling from the grounding section made concrete: grounding improves labeling when it works, and labeling degrades gracefully to keyword-and-domain context when it doesn't.

The enrichment error surfaces in amber rather than red, because it's a warning (labeling still happened) rather than a blocking failure. This is a small UI cue that matches the actual severity of what went wrong.

### The Resume Button

One interaction ties the intent map back to live browsing. Each thread card has a Resume button that reopens the pages you were on, so acting on a thread is one click rather than a hunt through history:

```ts
const RESUME_SKIP_DOMAINS = new Set([
  "google.com", "youtube.com", "bing.com", "duckduckgo.com",
  "gmail.com", "mail.google.com",
]);

function resumeThread(thread: IntentThread): void {
  const seen = new Set<string>();
  const urls: string[] = [];

  const sorted = thread.sessions
    .flatMap((s) => s.events)
    .sort((a, b) => b.visitedAt - a.visitedAt);

  for (const ev of sorted) {
    if (RESUME_SKIP_DOMAINS.has(ev.domain)) continue;
    if (seen.has(ev.url)) continue;
    seen.add(ev.url);
    urls.push(ev.url);
    if (urls.length >= 3) break;
  }

  urls.forEach((url, i) => {
    chrome.tabs.create({ url, active: i === 0 });
  });
}
```

Resume sorts the thread's events newest-first, skips search engines and webmail (which are waypoints rather than destinations you'd want to return to), dedupes by URL, and opens the three most recent meaningful pages. The first is the active tab and the rest are in the background. It's a small feature, but it's the thing that makes a thread feel like a place you can return to rather than a record of where you've been.

### Checkpoint

With the dashboard wired up, the entire pipeline is finally usable end to end through the interface. Reload the extension, open the dashboard, and you should see the welcome screen prompting you to scan.

Click through scan, build sessions, build your intent map, and the threads should appear, grouped by status. Add an Anthropic key, optionally a context.dev key, and click "Label & enrich" to see titles and next steps sharpen. The full loop you've built across every previous section now runs from a single screen.

What remains is the conversational layer on the right: an AI assistant that can reason across all your threads at once and answer questions like "what should I close this week?" The next section builds it.

---

## How to Build the AI Assistant

The labeling step asks Claude to describe one thread at a time. The assistant asks something harder: to reason across all of your threads together and answer open-ended questions about them, like what to close this week, what you've stalled on longest, or how to finish a particular one.

This is a chat interface, but a constrained one – grounded entirely in your own thread data, so its answers reference real threads by name rather than offering generic productivity advice.

The whole design rests on one idea: a chat assistant is only as good as the context it's given. So most of the work here is in building the right grounding context for each message, not in the chat mechanics themselves.

### Grounding the Conversation

Before any message goes to Claude, the assistant assembles a system prompt describing the user's threads. It does this in one of two modes, depending on whether the user has clicked into a specific thread.

With no thread selected, it builds a compact digest of every thread. With one selected, it gives rich detail on that thread and a brief list of the others.

```ts :collapsed-lines
function buildGroundingContext(
  threads: IntentThread[],
  brands: Map<string, Brand>,
  selectedThread: IntentThread | null,
): string {
  if (!selectedThread) {
    const digest = threads
      .map((t) => {
        const domains = [...new Set(t.sessions.flatMap((s) => s.domains))].slice(0, 5).join(", ");
        return `- \({t.title} (\){t.status}, \({t.type}): \){t.summary ?? "no summary yet"} | next: \({t.nextStep ?? "none"} | domains: \){domains || "none"}`;
      })
      .join("\n");

    return `\({SYSTEM_INSTRUCTION}\n\nHere is a digest of all the user's open intent threads:\n\){digest || "(no threads yet)"}`;
  }

  const keywords = [...new Set(selectedThread.sessions.flatMap((s) => s.keywords))].slice(0, 10).join(", ");
  const domains = [...new Set(selectedThread.sessions.flatMap((s) => s.domains))].slice(0, 5);

  const domainLines = domains
    .map((d) => {
      const brand = brands.get(d);
      if (brand?.description) return `- \({d}: \){brand.name} — ${brand.description}`;
      return `- ${d}`;
    })
    .join("\n");

  const sampleTitles = [...new Set(selectedThread.sessions.flatMap((s) => s.events.map((e) => e.title)))]
    .slice(0, 20)
    .map((t) => `- ${t}`)
    .join("\n");

  const otherTitles = threads
    .filter((t) => t.id !== selectedThread.id)
    .map((t) => t.title)
    .join(", ");

  return `${SYSTEM_INSTRUCTION}

The user is focused on this thread:
Title: ${selectedThread.title}
Status: ${selectedThread.status}
Type: ${selectedThread.type}
Summary: ${selectedThread.summary ?? "none"}
Next step: ${selectedThread.nextStep ?? "none"}
Keywords: ${keywords || "none"}

Domains visited:
${domainLines || "(none)"}

Recent page titles:
${sampleTitles || "(none)"}

For context, the user's other open threads are: ${otherTitles || "none"}.`;
}
```

The two modes match the two kinds of questions people ask. A question like "what should I close this week?" is about the whole set, so the digest mode gives Claude a one-line summary of every thread. This is enough breadth to compare and prioritize across all of them.

A question like "how do I finish this one?", on the other hand, is about a single thread, so the focused mode trades breadth for depth. It hands over that thread's keywords, its domains with their brand descriptions, and up to twenty real page titles, while still naming the other threads so Claude knows what else is in play.

The focused mode is where brand grounding shows up again. The same brand records fetched during enrichment get woven into the domain list, so when the user asks about a thread, Claude sees `mastra.ai: Mastra — TypeScript framework for building AI agents` rather than a bare domain. This is the identical grounding principle from labeling, now applied to conversation.

The system instruction that prefixes both modes pins the assistant to its data:

```ts
const SYSTEM_INSTRUCTION =
  `You are the assistant inside "openloops", a browser extension that reconstructs ` +
  `the user's browsing history into "intent threads" — decisions, research, or ` +
  `plans they started and haven't closed. Help the user understand and act on ` +
  `these open loops. Be concrete: reference the actual threads by name and ` +
  `suggest real next actions. You are grounded only in the thread data provided ` +
  `below — if the user asks about something not present in it, say so plainly ` +
  `rather than guessing.`;
```

The final instruction is the important one: telling the model to admit when something isn't in its data, rather than inventing a plausible answer, is what keeps the assistant trustworthy when a user asks about a thread that doesn't exist or a detail the data doesn't contain.

### Sending a Message

The send function rebuilds the grounding context fresh on every message. The assistant always reflects the current state of the threads (including any that changed since the conversation started) and posts the whole message history to Claude:

```ts :collapsed-lines
async function send(text: string) {
  const trimmed = text.trim();
  if (!trimmed || sending) return;

  if (!keySaved) {
    setError("Add your Anthropic key above to chat.");
    return;
  }

  setError(null);
  const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
  setMessages(nextMessages);
  setInput("");
  setSending(true);

  try {
    const systemPrompt = buildGroundingContext(threads, brands, selectedThread);
    const maxTokens = EFFORT_OPTIONS.find((e) => e.id === effort)?.maxTokens ?? 1024;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Check your Anthropic API key and try again.");
      }
      throw new Error(`API request failed: \({response.status} \){response.statusText}`);
    }

    const data: { content: AnthropicContentBlock[] } = await response.json();
    const reply = data.content
      .filter((b) => b.type === "text" && b.text)
      .map((b) => b.text)
      .join("");

    setMessages((prev) => [...prev, { role: "assistant", content: reply || "(empty response)" }]);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong.");
  } finally {
    setSending(false);
  }
}
```

The mechanics mirror the labeling request, the same endpoint, the same browser-access header, and the same 401-aware error handling, since both talk to the same API from the same constrained environment. The user's message gets appended to the running `messages` array, the full array is sent so the model has the conversation so far, and the assembled grounding context rides along as the `system` prompt. The reply is extracted by concatenating the text blocks from the response, with a fallback string if the model returned nothing usable.

Rebuilding `buildGroundingContext` on every send rather than once per conversation is a deliberate choice: if the user re-runs the pipeline or labels their threads mid-conversation, the next message reflects the updated data automatically, with no stale snapshot from when the chat began.

### Model and Effort Controls

The assistant exposes two selectors: which model to use and how much depth to allow. Both are persisted to `chrome.storage.local` through the same settings pattern as the keys:

```ts
const MODEL_OPTIONS = [
  { id: "claude-haiku-4-5-20251001", label: "Haiku 4.5 — fastest" },
  { id: "claude-sonnet-4-6",          label: "Sonnet 4.6 — balanced" },
  { id: "claude-opus-4-8",            label: "Opus 4.8 — most capable" },
];

const EFFORT_OPTIONS = [
  { id: "low",    label: "Low",    maxTokens: 512 },
  { id: "medium", label: "Medium", maxTokens: 1024 },
  { id: "high",   label: "High",   maxTokens: 2048 },
];
```

The model selector spans the speed-versus-capability range: Haiku for quick answers, Opus for harder reasoning over a tangled set of threads. The effort selector maps to `max_tokens`, controlling how long an answer the model may produce. This is a reasonable proxy for response depth given the Messages API has no dedicated depth control. A user wanting a one-line answer picks Low, while one wanting a reasoned, prioritized plan picks High.

### Rendering Replies and the Empty State

The assistant renders Claude's replies as Markdown, since the model naturally formats prioritized lists and step-by-step suggestions with headings and bullets. This would look like raw asterisks and hashes if rendered as plain text. Using `react-markdown`, the reply component is essentially `<ReactMarkdown>{m.content}</ReactMarkdown>` for assistant messages, with user messages rendered as plain text. The accompanying styles target the rendered Markdown elements to match the dashboard's type scale.

Before any conversation starts, the panel shows an empty state with a one-line explanation and a few suggested prompts as clickable chips, "What should I close this week?", "Summarize my open loops", "What have I stalled on longest?". These both demonstrate what the assistant can do and give a one-click way to start.

The suggested prompts shift slightly when a thread is focused, offering "How do I finish this one?" in place of the whole-set summary, matching the focused grounding mode.

A privacy line sits permanently below the composer, stating that chats send thread titles and summaries to Anthropic and nothing else leaves the device. This is the same honest disclosure principle applied throughout, placed where the user will see it before they type.

### Checkpoint

With the assistant in place, openloops is feature-complete. Reload, build your intent map, add your Anthropic key, and try the suggested prompts. Ask what to close this week and the assistant should name specific threads and reason about which are easy wins versus which need a real decision. Click into a single thread and ask how to finish it, and the answer should narrow to that thread's specifics.

The conversation reflects your real, current threads, and nothing about it leaves your machine except the thread summaries you can see in the grounding context itself.

The build is done. The final section steps back to look at what you've made: how it compares to the one mainstream attempt at this idea, what the privacy model adds up to, and where you might take it next.

---

## What You've Built, and Where to Take It

You've built a complete system: browsing history flows in through capture, gets cleaned and segmented into sessions, clustered and scored into intent threads, optionally labeled and grounded by AI, and surfaced through a dashboard with a conversational assistant. Every stage runs on your own machine, and the AI layers are optional additions on top of a pipeline that works without them.

If the clustering reminds you of Chrome's old [<VPIcon icon="fa-brands fa-google"/>Journeys](https://blog.google/products-and-platforms/products/chrome/finding-answers-gets-better-chrome/) feature, that's a fair connection. Grouping history by topic instead of by time is the same starting point.

openloops takes it further: every thread carries a confidence score and a status, the AI layer adds labels and a concrete next step, the assistant reasons across threads on demand, and the whole thing is open source and local-first. This means that you can read and change exactly what it does with your data.

### What the Privacy Model Adds Up To

Privacy shaped the build at every step, and it's worth collecting what that amounted to in one place. The entire core pipeline, capture through scored threads, runs locally in IndexedDB with no network calls of any kind. Your browsing history – the raw events, the sessions, the threads – never leaves your machine for the parts of the system that work without a key.

The two AI layers are the only paths by which any data leaves the device, and both are opt-in, gated on you providing your own API key. When they run, what they send is deliberately minimal: brand enrichment sends only bare domain names to context.dev, never URLs or page contents, and stripped of any local addresses first. Labeling and the assistant send thread titles, summaries, keywords, and sample page titles to Anthropic, the grounding context you can read directly in the code, and nothing more. Keys themselves live in `chrome.storage.local`, which never syncs.

### Where to Take it Next

The build leaves a few deliberate simplifications that make good exercises.

The most satisfying one builds directly on code you've already written. The domain side has <VPIcon icon="iconfont icon-typescript"/>`ambient.ts`, which drops domains that appear on most of your active days. But the keyword side has no equivalent, so a word that's ubiquitous *for you* (say `typescript`, if you're a TypeScript developer) survives in every session's keywords and can nudge unrelated threads together.

The fix is a frequency-based keyword detector that mirrors `detectAmbientDomains` almost line for line, counting days-per-keyword instead of days-per-domain:

```ts title="pipeline/ambient.ts"
export function detectAmbientKeywords(sessions: Session[]): Set<string> {
  const allEvents = sessions.flatMap((s) => s.events);
  const activeDays = new Set(allEvents.map((e) => new Date(e.visitedAt).toDateString()));
  const totalActiveDays = activeDays.size;
  if (totalActiveDays < MIN_ACTIVE_DAYS) return new Set();

  const keywordDayMap = new Map<string, Set<string>>();
  for (const session of sessions) {
    const day = new Date(session.startedAt).toDateString();
    for (const kw of session.keywords) {
      if (!keywordDayMap.has(kw)) keywordDayMap.set(kw, new Set());
      keywordDayMap.get(kw)!.add(day);
    }
  }

  const ambient = new Set<string>();
  for (const [kw, days] of keywordDayMap) {
    if (days.size / totalActiveDays >= UBIQUITY_THRESHOLD) ambient.add(kw);
  }
  return ambient;
}
```

You'd then strip these keywords inside `similarity` exactly as ambient domains are stripped today, filtering them out of both `sessionKeywords` and the thread's `keywordSet` before the Jaccard call.

Two smaller exercises round it out. The session gap, similarity threshold, and ambient ubiquity threshold are all hardcoded constants. Lifting them into a settings panel backed by `chrome.storage.local` (the same store the API keys already use) would let you tune clustering to your own browsing.

And `extractDomain` strips only a leading `www.`, so `news.bbc.co.uk` and `bbc.co.uk` are treated as different domains. Swapping its hostname logic for a library that uses the [<VPIcon icon="fas fa-globe"/>Public Suffix List](https://publicsuffix.org/) (the canonical list of domain suffixes like `.co.uk` that browsers use to know where a registrable domain actually ends) would collapse subdomains of the same site correctly.

Since the whole pipeline is local and inspectable, each of these is straightforward to try against your own real data and see the effect immediately.

---

## Wrapping up

openloops turns the flat, chronological record your browser keeps into a map of what you were actually trying to do, and helps you close the loops you left open.

The engineering underneath – time-gap segmentation, weighted Jaccard clustering with ambient-domain correction, heuristic scoring, AI labeling grounded in real company data, and a conversational layer over the result – is the kind of layered system where each stage is simple on its own and the value comes from how they compose.

---

## Resources

### Source Code

- The complete source is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`sholajegede/openloops`)](https://github.com/sholajegede/openloops) under the MIT license, so you can run it, read it, and reshape it to fit how you browse. If it helped you, consider giving it a star.

### Core Documentation

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome Extensions: Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3): the extension platform openloops is built on
- [<VPIcon icon="fa-brands fa-chrome"/>`chrome.history API`](https://developer.chrome.com/docs/extensions/reference/api/history): the `search` and `getVisits` methods the backfill relies on
- [<VPIcon icon="fa-brands fa-chrome"/>`chrome.tabs API`](https://developer.chrome.com/docs/extensions/reference/api/tabs): `onUpdated` for live capture and `create` for Resume
- [<VPIcon icon="fa-brands fa-chrome"/>`chrome.storage` API](https://developer.chrome.com/docs/extensions/reference/api/storage): where API keys and preferences live, locally
- [<VPIcon icon="iconfont icon-claude"/>Anthropic API reference](https://docs.claude.com/en/api/messages): the Messages endpoint used for labeling and the assistant

### Services used

- [<VPIcon icon="iconfont icon-claude"/>Anthropic Console](https://console.anthropic.com/settings/keys): create the API key for AI labeling and the assistant
- [<VPIcon icon="fas fa-globe"/>context.dev](http://context.dev) [<VPIcon icon="fas fa-globe"/>documentation](https://docs.context.dev): the brand-intelligence API used for grounding
- [<VPIcon icon="fa-brands fa-firefox"/>IndexedDB (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API): the local database every pipeline stage reads and writes

### Build tooling

- [<VPIcon icon="iconfont icon-vite"/>Vite](https://vitejs.dev/): the build tool and dev server
- [<VPIcon icon="fas fa-globe"/>CRXJS Vite plugin](https://crxjs.dev/vite-plugin): compiles a Manifest V3 extension with hot reloading
- [<VPIcon icon="iconfont icon-github"/>`jakearchibald/idb`](https://github.com/jakearchibald/idb): the typed, promise-based IndexedDB wrapper
- [<VPIcon icon="iconfont icon-github"/>`remarkjs/react-markdown`](https://github.com/remarkjs/react-markdown): renders the assistant's Markdown replies

### Debugging tools

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome extension service worker DevTools](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug): inspect live-capture logs and the pipeline `console.table` output
- The **Application → IndexedDB** panel in Chrome DevTools: browse `raw_events`, `sessions`, `intent_threads`, and `domain_brands` directly to verify each stage

::: info Further reading

- [<VPIcon icon="fa-brands fa-wikipedia-w"/>Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index): the set-similarity measure behind thread clustering
- [<VPIcon icon="fas fa-globe"/>Public Suffix List](https://publicsuffix.org/): the proper way to extract registrable domains, referenced as a future improvement

If this tutorial was useful, feel free to share it with others who might benefit. I'd really appreciate your thoughts, you can mention me on X at [<VPIcon icon="fa-brands fa-x-twitter"/>`wani_shola`](https://x.com/wani_shola) or [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sholajegede`)](https://linkedin.com/in/sholajegede).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Powered, Local-First Chrome Extension That Turns Your Browsing History into an Intent Map",
  "desc": "Your browser remembers every page you've ever opened, but it has no idea why you opened any of them. You might spend three days comparing laptops across a dozen tabs, get distracted, come back a week ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-local-first-chrome-extension.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
