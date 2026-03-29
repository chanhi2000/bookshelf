---
lang: en-US
title: "How to Build a Market Pulse App in Python: Real-Time & Multi-Asset"
description: "Article(s) > How to Build a Market Pulse App in Python: Real-Time & Multi-Asset"
icon: iconfont icon-streamlit
category:
  - Python
  - Streamlit
  - NumPy
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - streamlit
  - py-streamlit
  - numpy
  - py-numpy
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Market Pulse App in Python: Real-Time & Multi-Asset"
    - property: og:description
      content: "How to Build a Market Pulse App in Python: Real-Time & Multi-Asset"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-market-pulse-app-in-python-real-time-multi-asset.html
prev: /programming/py-streamlit/articles/README.md
date: 2026-04-06
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8fd6bb83-0418-41e4-9b93-a3c81325033a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Market Pulse App in Python: Real-Time & Multi-Asset"
  desc="A “market pulse” screen is basically the tab you keep open when you don’t want to stare at charts all day. It tells you what’s moving right now, what’s unusually volatile, and which names are starting"
  url="https://freecodecamp.org/news/how-to-build-a-market-pulse-app-in-python-real-time-multi-asset"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8fd6bb83-0418-41e4-9b93-a3c81325033a.png"/>

A “market pulse” screen is basically the tab you keep open when you don’t want to stare at charts all day. It tells you what’s moving right now, what’s unusually volatile, and which names are starting to move together.

Not in a research-paper way. In a product way. The kind of feed you could drop into a media platform or investing app and have it feel instantly useful.

In this tutorial, we’ll build a minimal version of that in Python using Streamlit. The dashboard has three parts:

- a Pulse table that ranks the biggest movers across your watchlist
- a Stress feed that emits event-style alerts instead of raw tick spam
- a small Correlation card that updates based on the current volatility regime

The data for the dashboard will be powered by EODHD’s real-time WebSocket feeds.

Quick expectation setting: this isn’t TradingView, and it’s not a backtester. It’s a lightweight real-time system that streams prices, maintains rolling buffers, computes a few live metrics, and turns them into UI-ready widgets.

The goal here is to build something you can actually ship as a “market pulse” feature, not a one-off notebook demo.

::: note Prerequisites

Before we get into the build, make sure you have a few basics ready.

You should be comfortable running Python scripts, installing packages with `pip`, and working with a small multi-file project.

This tutorial isn't notebook-based. We’ll be building a lightweight real-time app with separate files for streaming, state, events, correlation logic, and the Streamlit UI.

You’ll need Python 3.10+ and these packages installed:

```sh
pip install streamlit pandas websockets
```

You’ll also need an [<VPIcon icon="fas fa-globe"/>EODHD API key](https://eodhd.com/) with access to their real-time WebSocket feeds, since the dashboard depends on live stock, forex, and crypto data.

To follow along smoothly, create these files in your project folder before starting:

```plaintext
feeds.py
pulse_store.py
events.py
correlation.py
app.py
```

One quick note before we begin: Since this app runs on live market data, what you see will depend on when you open it. During weekends or off-market hours, crypto will usually dominate the dashboard while stocks and most forex pairs stay relatively quiet. That is expected.

:::

---

## The App We’re Building

Before we touch any code, here’s what the finished dashboard looks like:

[https://gumlet.tv/watch/69b99df9554f0fb510c28ce6/](https://gumlet.tv/watch/69b99df9554f0fb510c28ce6/)

Let's go over its main features:

### Pulse Table

This is the main screen. It’s your ranked list of movers across the watchlist. Each row is one symbol, and the columns are the small set of signals we compute live: last price, 1-minute return, 5-minute return when available, 15-minute volatility, and a simple regime label.

If you open the app and only want one thing, it’s this table. You can glance at it and immediately know what deserves attention.

### Stress Feed

This is where the app stops feeling like a live ticker and starts feeling like a product feature. Instead of printing every update, we only emit events when something crosses a threshold, like a sharp 1-minute move or a volatility spike. Those events become “cards” in a feed. The point is to reduce noise, not create more of it.

### Correlation Card

This is intentionally small and conservative. Correlation in real time gets messy fast because different symbols tick at different frequencies and you need alignment. For this build, we keep it to stocks only and compute correlation off time buckets.

It’s not meant to be a full correlation matrix. It’s just a quick “what’s moving with my base symbol right now” view, and it adapts its lookback window depending on whether the base symbol is in a normal or high-vol regime.

### Control Panel

At the top, you have a few controls that make the demo feel interactive without turning it into a settings page. Top movers lets you pick how many rows you want in the Pulse table. Correlation base switches which stock you’re anchoring correlation around. Correlation bucket changes the time bucket size used for alignment, which is useful when the feed is sparse and you want correlation to stabilize.

---

## The App Architecture

If you’ve ever tried to build a live Streamlit app, you’ve probably hit the same wall. Streamlit reruns your script constantly. Any time a widget changes, any time you call `st.rerun()`, the whole file executes again from the top.

That’s great for normal dashboards, but it’s a terrible place to run an infinite WebSocket loop. If you do that in the main thread, the UI either freezes or you end up reconnecting to feeds on every rerun.

![Multi-Asset Market Pulse App Architecture](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f6431fe7-fa92-448a-8116-132af071c490.png)

So the architecture here is intentionally split into two roles.

One background worker owns the real-time work. It connects to the WebSocket feeds, ingests ticks, updates rolling buffers, computes metrics, and emits stress events. That worker runs continuously, and it keeps the latest state in memory. That’s the engine of the app.

Streamlit itself stays dumb on purpose. On every rerun, it only reads whatever state the worker has produced and renders tables and a small correlation card. There's no data fetching in the UI loop. No heavy computation. Just display. That separation is the reason the app stays stable even when you keep refreshing the page or tweaking controls.

In practice, the simplest way to do this in Python is a background thread that runs an async loop. Streamlit starts that thread once using `st.session_state` as a guard, and then the UI code just keeps rerendering from the shared state.

It’s not fancy. But it’s the difference between a “works for 30 seconds” demo and something that can sit open like a real market pulse screen.

### Code File Structure

To keep this build readable, I split the app into five small files. Each file has one job, and the Streamlit UI doesn’t touch the WebSocket logic directly.

- <VPIcon icon="fa-brands fa-python"/>`feeds.py` handles WebSocket connections and normalizes every incoming message into the same tick format.
- <VPIcon icon="fa-brands fa-python"/>`pulse_store.py` keeps rolling buffers per symbol and computes pulse metrics (returns, vol, trend, regime). This is the core state.
- <VPIcon icon="fa-brands fa-python"/>`events.py` turns the live metrics into a stress feed with cooldowns and asset-aware thresholds.
- <VPIcon icon="fa-brands fa-python"/>`correlation.py` builds the correlation card by bucketing and aligning returns, then changing the lookback window based on regime.
- <VPIcon icon="fa-brands fa-python"/>`app.py` is the Streamlit dashboard. It starts the background worker once, then keeps rerendering from shared state.

That split is what makes the app stable. The background worker can run forever. Streamlit can rerun as often as it wants without reconnecting to feeds or recomputing everything from scratch.

---

## Streaming Layer: One Queue, Many Feeds

The first step is getting real-time ticks into the system. We connect to EODHD’s WebSocket feeds for stocks, forex, and crypto, subscribe to a small watchlist, then normalize every message into one tick schema: `{symbol, asset, ts, price}`.

Once we have that, everything downstream becomes predictable.

```py :collapsed-lines title="feeds.py"
import asyncio
import json
import time
import websockets

API_KEY = "YOUR EODHD API KEY"

WS = {
    "stocks": "wss://ws.eodhistoricaldata.com/ws/us?api_token=",
    "forex":  "wss://ws.eodhistoricaldata.com/ws/forex?api_token=",
    "crypto": "wss://ws.eodhistoricaldata.com/ws/crypto?api_token=",
}

def _tick(symbol, asset, price):
    return {"symbol": symbol, "asset": asset, "ts": time.time(), "price": float(price)}

def _parse(asset, msg):
    s = msg.get("s")
    p = msg.get("p")
    if s is None or p is None:
        return None
    return _tick(s, asset, p)

async def _stream(asset, symbols, q):
    url = WS[asset] + API_KEY

    while True:
        try:
            async with websockets.connect(url, ping_interval=20, ping_timeout=20) as ws:
                sub = {"action": "subscribe", "symbols": ",".join(symbols)}
                await ws.send(json.dumps(sub))

                async for raw in ws:
                    try:
                        msg = json.loads(raw)
                    except Exception:
                        continue

                    t = _parse(asset, msg)
                    if t:
                        await q.put(t)

        except Exception:
            await asyncio.sleep(1.0)

async def start_streams(q):
    tasks = []
    tasks.append(asyncio.create_task(_stream("stocks", ["AAPL","TSLA","NVDA","AMZN","MSFT","META","GOOGL"], q)))
    tasks.append(asyncio.create_task(_stream("forex", ["EURUSD","USDINR","USDJPY","GBPUSD","AUDUSD"], q)))
    tasks.append(asyncio.create_task(_stream("crypto", ["BTC-USD","ETH-USD","BTC-USDT","ETH-USDT","SOL-USDT"], q)))
    return tasks
```

::: note

Replace YOUR EODHD API KEY with your actual EODHD API key. If you don’t have one, you can obtain it by opening an EODHD developer account.

:::

What this code is doing is simple. Each feed runs in its own async task, pushes normalized ticks into a single shared queue, and reconnects if the socket drops. We don’t try to do anything smart here. This layer is just plumbing.

### Why the Watchlist is Curated

A bigger watchlist makes the demo look impressive, but it also makes debugging and alignment harder. For the article, you want a list that’s small enough to reason about, but diverse enough to show multi-asset behavior.

One thing that will skew what you see is weekends. Stocks and most forex won’t meaningfully tick when markets are closed, while crypto runs 24/7. So if you run the app on a Sunday, crypto will naturally dominate the pulse table. That’s not a bug. It’s just what happens when only one asset class is actually moving.

In a real product, you’d solve this by ranking movers per asset class or rendering separate sections. For this build, we'll keep it simple and accept that the output depends on when you run it.

---

## Rolling State: Buffers, Returns, Volatility, Trend

This is the core of the app. We keep a rolling buffer per symbol, compute a few live signals from it, and expose everything as a compact snapshot that the UI and the event system can consume.

```py :collapsed-lines title="pulse_store.py"
import time
import math
import threading
from collections import deque

class PulseStore:
    def __init__(self, window_sec=3600):
        self.window_sec = window_sec
        self.buffers = {}
        self.latest = {}
        self.asset = {}
        self.vol_hist = {}
        self.lock = threading.Lock()

    def _buf(self, symbol):
        if symbol not in self.buffers:
            self.buffers[symbol] = deque()
        return self.buffers[symbol]

    def update(self, tick):
        symbol = tick["symbol"]
        ts = tick["ts"]
        px = tick["price"]

        with self.lock:
            b = self._buf(symbol)
            b.append((ts, px))
            self.latest[symbol] = px
            self.asset[symbol] = tick.get("asset")

            cutoff = ts - self.window_sec
            while b and b[0][0] < cutoff:
                b.popleft()

        return len(b)

    def _price_at_or_before(self, b, target_ts):
        with self.lock:
            data = list(b)

        for i in range(len(data) - 1, -1, -1):
            if data[i][0] <= target_ts:
                return data[i][1]
        return None

    def ret(self, symbol, window_sec):
        b = self.buffers.get(symbol)
        if not b:
            return None

        with self.lock:
            if len(b) < 2:
                return None
            now_ts, now_px = b[-1]

        px0 = self._price_at_or_before(b, now_ts - window_sec)
        if px0 is None:
            return None

        return (now_px / px0) - 1.0

    def ret_1m(self, symbol):
        return self.ret(symbol, 60)

    def ret_5m(self, symbol):
        return self.ret(symbol, 300)

    def ret_15m(self, symbol):
        return self.ret(symbol, 900)

    def _recent_prices(self, b, window_sec):
        with self.lock:
            data = list(b)

        if not data:
            return []

        cutoff = data[-1][0] - window_sec
        out = []
        for ts, px in data:
            if ts >= cutoff:
                out.append(px)
        return out

    def vol_15m(self, symbol):
        b = self.buffers.get(symbol)
        if not b:
            return None

        prices = self._recent_prices(b, 900)
        if len(prices) < 6:
            return None

        rets = []
        for i in range(1, len(prices)):
            rets.append(prices[i] / prices[i-1] - 1.0)

        if len(rets) < 3:
            return None

        m = sum(rets) / len(rets)
        var = sum((x - m) ** 2 for x in rets) / len(rets)
        return var ** 0.5

    def trend_15m(self, symbol):
        b = self.buffers.get(symbol)
        if not b:
            return None

        prices = self._recent_prices(b, 900)
        if len(prices) < 8:
            return None

        lp = []
        for p in prices:
            if p > 0:
                lp.append(math.log(p))

        if len(lp) < 8:
            return None

        n = len(lp)
        xs = list(range(n))

        xbar = sum(xs) / n
        ybar = sum(lp) / n

        num = 0.0
        den = 0.0
        for i in range(n):
            dx = xs[i] - xbar
            dy = lp[i] - ybar
            num += dx * dy
            den += dx * dx

        if den == 0:
            return None

        return num / den

    def _vh(self, symbol):
        if symbol not in self.vol_hist:
            self.vol_hist[symbol] = deque(maxlen=200)
        return self.vol_hist[symbol]

    def update_vol_history(self, symbol):
        v = self.vol_15m(symbol)
        if v is None:
            return None
        self._vh(symbol).append(v)
        return v

    def regime(self, symbol):
        h = self.vol_hist.get(symbol)
        if not h or len(h) < 30:
            return "unknown"

        cur = h[-1]
        hs = sorted(h)
        p80 = hs[int(0.8 * (len(hs) - 1))]

        if cur >= p80:
            return "high_vol"
        return "normal"

    def snapshot(self, symbol):
        last = self.latest.get(symbol)
        if last is None:
            return None

        out = {"symbol": symbol, "asset": self.asset.get(symbol), "last": last}

        r1 = self.ret_1m(symbol)
        r5 = self.ret_5m(symbol)
        r15 = self.ret_15m(symbol)
        v15 = self.vol_15m(symbol)
        tr = self.trend_15m(symbol)

        if r1 is not None:
            out["ret_1m"] = r1
        if r5 is not None:
            out["ret_5m"] = r5
        if r15 is not None:
            out["ret_15m"] = r15
        if v15 is not None:
            out["vol_15m"] = v15
        if tr is not None:
            out["trend_15m"] = tr

        v = self.update_vol_history(symbol)
        if v is not None:
            out["regime"] = self.regime(symbol)

        return out

    def snapshots(self):
        with self.lock:
            syms = list(self.buffers.keys())

        out = []
        for s in syms:
            snap = self.snapshot(s)
            if snap:
                out.append(snap)
        return out
```

`update()` is the entry point. Every incoming tick gets appended to that symbol’s deque, and old points get pruned so the buffer never grows unbounded.

Returns are computed using a small trick: we don’t assume we have a price exactly 60 seconds ago or 300 seconds ago. We scan backwards and grab the most recent price at or before the target timestamp. That keeps returns stable even when ticks come in unevenly.

Volatility is computed from short returns inside the last 15 minutes of prices. It’s not annualized. It’s just a live noise meter. Trend is a tiny slope on log prices over that same window, which gives a directional hint without doing anything heavy.

The `vol_hist` deque is used to label regimes. We store a rolling history of recent volatility values per symbol, then call the current state `high_vol` if it’s above the 80th percentile of that recent history. It’s intentionally simple, but it’s good enough to drive the correlation window logic later.

The concurrency issue is the reason the lock exists. The background thread is writing to deques while Streamlit is reading them. If you iterate a deque while it’s being mutated, Python will throw an error. So every place where we iterate, we first take a snapshot copy of the deque under the lock and iterate that list instead. That keeps reads safe without making the writer slow.

---

## Turning Live Stats Into Events (Stress Feed)

Once you have live metrics, the next question is what you do with them. If you stream raw ticks into a UI, you’ll drown the user in noise. What we want instead is an event feed. Small cards that only show up when something crosses a threshold.

That’s what the stress feed does. It watches the snapshot coming out of PulseStore and emits one of three event types.

- `move_1m` when the 1-minute move is large enough
- `move_5m` when the 5-minute move is large enough
- `vol_spike` when 15-minute volatility crosses a threshold

Two practical features make this usable in a real dashboard. First, cooldowns. If TSLA crosses the 1-minute threshold, we don’t want 50 duplicate events on every tick. Second, asset-aware thresholds. Crypto naturally moves more than equities, so if you use one global threshold, BTC will dominate your stress feed all day.

```py :collapsed-lines title="events.py"
import time
from collections import deque

class EventStore:
    def __init__(self, max_events=25):
        self.max_events = max_events
        self.events = deque(maxlen=max_events)
        
    def add(self, e):
        self.events.appendleft(e)

    def latest(self):
        return list(self.events)


class StressDetector:
    def __init__(self, move_thr_1m=0.0015, move_thr_5m=0.004, vol_thr=0.00025):
        self.move_thr_1m = move_thr_1m
        self.move_thr_5m = move_thr_5m
        self.vol_thr = vol_thr
        self.cooldown_sec = 30
        self.last_emit = {}
        self.thr = {
            "stocks": {"move_1m": 0.0012, "move_5m": 0.0040, "vol": 0.00006},
            "crypto": {"move_1m": 0.0025, "move_5m": 0.0080, "vol": 0.00045},
            "forex":  {"move_1m": 0.0006, "move_5m": 0.0018, "vol": 0.00015},
        }

    def _can_emit(self, symbol, etype, now):
        k = (symbol, etype)
        prev = self.last_emit.get(k)
        if prev is None:
            self.last_emit[k] = now
            return True
        if now - prev >= self.cooldown_sec:
            self.last_emit[k] = now
            return True
        return False

    def check(self, snap):
        if not snap:
            return None

        sym = snap.get("symbol")
        asset = snap.get("asset", None)
        thr = self.thr.get(asset, {"move_1m": self.move_thr_1m, "move_5m": self.move_thr_5m, "vol": self.vol_thr})
        move_thr_1m = thr["move_1m"]
        move_thr_5m = thr["move_5m"]
        vol_thr = thr["vol"]
        now = time.time()

        r5 = snap.get("ret_5m")
        r1 = snap.get("ret_1m")
        v15 = snap.get("vol_15m")

        if r5 is not None and abs(r5) >= move_thr_5m:
            if self._can_emit(sym, "move_5m", now):
                return {"ts": now, "type": "move_5m", "symbol": sym, "asset": asset, "value": float(r5)}
            return None

        if r1 is not None and abs(r1) >= move_thr_1m:
            if self._can_emit(sym, "move_1m", now):
                return {"ts": now, "type": "move_1m", "symbol": sym, "asset": asset, "value": float(r1)}
            return None

        if v15 is not None and v15 >= vol_thr:
            if self._can_emit(sym, "vol_spike", now):
                return {"ts": now, "type": "vol_spike", "symbol": sym, "asset": asset, "value": float(v15)}
            return None

        return None
```

`EventStore` is just a rolling feed. It keeps the last N events so Streamlit can render them as a table.

`StressDetector.check()` is the filter. It looks at the latest snapshot and decides whether it’s worth creating an event. The cooldown logic is what stops spam. Once a symbol emits a `move_1m` event, it won’t emit another `move_1m` for 30 seconds.

The thresholds are intentionally different per asset class. Crypto needs wider bands for both moves and volatility. Otherwise, even a quiet BTC session will look like constant stress relative to equities. This one change makes the feed feel balanced and product-like.

---

## Regime Tagging (Small but Important)

Regime is just a lightweight context label. We keep a short history of `vol_15m` per symbol and classify the current state as `high_vol` if it’s above the recent 80th percentile, otherwise normal. This gives us a stable switch we can use later. Most importantly, we use it to change the correlation lookback window depending on conditions.

### Add this to <VPIcon icon="fa-brands fa-python"/>`pulse_store.py`

You already have `PulseStore` in <VPIcon icon="fa-brands fa-python"/>`pulse_store.py`. Insert the following methods inside the `PulseStore class`, right after `vol_15m()` and `trend_15m()` (placement isn’t critical. it just keeps the file readable).

```py title="pulse_store.py"
    def _vh(self, symbol):
        if symbol not in self.vol_hist:
            self.vol_hist[symbol] = deque(maxlen=200)
        return self.vol_hist[symbol]

    def update_vol_history(self, symbol):
        v = self.vol_15m(symbol)
        if v is None:
            return None
        self._vh(symbol).append(v)
        return v

    def regime(self, symbol):
        h = self.vol_hist.get(symbol)
        if not h or len(h) < 30:
            return "unknown"

        cur = h[-1]
        hs = sorted(h)
        p80 = hs[int(0.8 * (len(hs) - 1))]

        if cur >= p80:
            return "high_vol"
        return "normal"
```

### Attach regime inside `snapshot()` in `pulse_store.py`

In the same file, inside snapshot(self, symbol), add this block near the end of the function, right before return out:

```py
    v = self.update_vol_history(symbol)
    if v is not None:
        out["regime"] = self.regime(symbol)
```

That’s it for regime tagging.

::: important Why this matters later:

Once `snapshot()` includes regime, the rest of the app can use it without recomputing anything. In the next section, the correlation card reads `store.regime(base_symbol)` and uses that to decide whether it should look back 60 minutes (normal) or just 15 minutes (high volatility). This is what stops correlation from feeling stale during spikes and overly jumpy during calm periods.

:::

---

## Correlation Card (Stocks Only, Regime-aware Window)

Correlation sounds simple until you try to do it live. In real-time feeds, different symbols tick at different moments. If you just correlate raw tick-to-tick returns, you’re basically correlating noise and timing gaps.

So we do two things to make it usable.

First, we align prices by time. We bucket ticks into fixed time bins (like 10s, 20s, 30s) and treat the last price inside each bin as the price for that bin. That gives every symbol a comparable timeline.

Second, we make the correlation window regime-aware. If the base symbol is in `high_vol`, we compute correlation on a shorter recent slice so the card reacts faster. If the regime is normal, we use a longer lookback so it doesn’t flip wildly every refresh.

We also keep this card stocks-only in the app. Multi-asset correlation is doable, but alignment becomes much harder when tick frequency differs massively across assets. This article is about building something shippable. A stable stocks card beats a flaky multi-asset one.

```py :collapsed-lines title="correlation.py"
import math

def _bucket(ts, bin_sec):
    return int(ts // bin_sec) * bin_sec

def build_price_table(store, symbols, window_sec=1800, bin_sec=10):
    table = {}
    now = None

    for s in symbols:
        b = store.buffers.get(s)
        if not b:
            continue
        if now is None:
            now = b[-1][0]
        else:
            now = max(now, b[-1][0])

    if now is None:
        return {}

    cutoff = now - window_sec

    for s in symbols:
        b = store.buffers.get(s)
        if not b:
            continue

        for ts, px in b:
            if ts < cutoff:
                continue
            k = _bucket(ts, bin_sec)
            row = table.get(k)
            if row is None:
                row = {}
                table[k] = row
            row[s] = px

    return table

def to_return_matrix(price_table, symbols):
    buckets = sorted(price_table.keys())
    if len(buckets) < 3:
        return []

    last_prices = None
    rows = []

    for bt in buckets:
        rowp = price_table[bt]
        if any(s not in rowp for s in symbols):
            continue

        prices = [float(rowp[s]) for s in symbols]

        if last_prices is None:
            last_prices = prices
            continue

        rets = []
        ok = True
        for i in range(len(symbols)):
            p0 = last_prices[i]
            p1 = prices[i]
            if p0 <= 0 or p1 <= 0:
                ok = False
                break
            rets.append(p1 / p0 - 1.0)

        last_prices = prices
        if ok:
            rows.append(rets)

    return rows

def corr(a, b):
    n = len(a)
    if n < 5:
        return None
    am = sum(a) / n
    bm = sum(b) / n
    num = 0.0
    da = 0.0
    db = 0.0
    for i in range(n):
        x = a[i] - am
        y = b[i] - bm
        num += x * y
        da += x * x
        db += y * y
    if da == 0 or db == 0:
        return None
    return num / math.sqrt(da * db)

def corr_card(store, symbols, base_symbol, bin_sec=10):
    reg = store.regime(base_symbol)
    win = 900 if reg == "high_vol" else 3600

    pt = build_price_table(store, symbols, window_sec=win, bin_sec=bin_sec)
    mat = to_return_matrix(pt, symbols)
    if not mat:
        return {"base": base_symbol, "regime": reg, "window_sec": win, "top": []}

    cols = list(zip(*mat))
    if base_symbol not in symbols:
        return {"base": base_symbol, "regime": reg, "window_sec": win, "top": []}

    bi = symbols.index(base_symbol)
    base = list(cols[bi])

    scores = []
    for i, s in enumerate(symbols):
        if s == base_symbol:
            continue
        c = corr(base, list(cols[i]))
        if c is None:
            continue
        scores.append((s, c))

    scores.sort(key=lambda x: abs(x[1]), reverse=True)
    top = [{"symbol": s, "corr": float(v)} for s, v in scores[:3]]

    return {"base": base_symbol, "regime": reg, "window_sec": win, "top": top}
```

`build_price_table()` creates the aligned timeline. It scans each symbol’s rolling buffer, buckets timestamps into fixed bins, and stores the last price per bucket.

`to_return_matrix()` converts those bucketed prices into returns, but only when every symbol has a price in the same bucket. That’s the alignment step that keeps correlation meaningful.

`corr_card()` is the actual widget output. It checks the base symbol’s regime, chooses a lookback window (15m for high-vol, 60m for normal), then computes correlations against the base symbol and returns the top matches.

Next, we’ll wire all of this into Streamlit and render the dashboard. That’s where the build starts to feel like a real app.

---

## Building the Streamlit App

At this point, we have all the moving parts. A streaming layer that produces ticks, a state engine that produces snapshots, a stress detector that emits events, and a correlation function that can generate a small card. Now we just need to wrap it in a Streamlit app without breaking everything.

The key trick is to start the real-time worker once and keep it running in the background. Streamlit reruns the script constantly, so the UI code should never reconnect to WebSockets or spin up new loops. It should only read shared state and render tables.

```py :collapsed-lines
import asyncio
import threading
import time

import pandas as pd
import streamlit as st

from feeds import start_streams
from pulse_store import PulseStore
from events import StressDetector, EventStore
from correlation import corr_card

st.set_page_config(page_title="Market Pulse", layout="wide")

st.markdown("""
<style>
html, body, [class*="css"]  { background-color: #0b0f14; color: #e6edf3; }
.stApp { background-color: #0b0f14; }
div[data-testid="stMetricValue"] { color: #e6edf3; }
div[data-testid="stMetricLabel"] { color: #9aa4af; }
[data-testid="stDataFrame"] { background-color: #0b0f14; }
</style>
""", unsafe_allow_html=True)

def _runner(state):
    async def _main():
        q = asyncio.Queue()
        await start_streams(q)

        store = PulseStore(window_sec=3600)
        detector = StressDetector()
        ev = EventStore(max_events=50)

        state["store"] = store
        state["events"] = ev
        state["detector"] = detector
        state["started_at"] = time.time()

        while True:
            t = await q.get()
            store.update(t)
            snap = store.snapshot(t["symbol"])
            e = detector.check(snap)
            if e:
                ev.add(e)

    asyncio.run(_main())

if "bg_started" not in st.session_state:
    st.session_state.bg_started = True
    st.session_state.state = {}
    th = threading.Thread(target=_runner, args=(st.session_state.state,), daemon=True)
    th.start()

state = st.session_state.state

st.title("Market Pulse")

col1, col2, col3 = st.columns([2, 2, 1])
with col1:
    st.caption("Real-time multi-asset pulse. Moves, stress events, and a simple correlation card.")
with col3:
    up = 0
    if "started_at" in state:
        up = int(time.time() - state["started_at"])
    st.metric("Uptime (s)", up)

if "store" not in state:
    st.info("Connecting to feeds and warming up buffers...")
    st.stop()

store = state["store"]
ev = state["events"]

c1, c2, c3 = st.columns(3)
with c1:
    top_k = st.slider("Top movers", 3, 10, 5)
with c2:
    base = st.selectbox("Correlation base (stocks)", ["TSLA", "AAPL"], index=0)
with c3:
    bin_sec = st.selectbox("Correlation bucket (sec)", [10, 20, 30], index=2)

snaps = store.snapshots()

def score(x):
    r1 = x.get("ret_1m")
    r5 = x.get("ret_5m")
    if r1 is not None:
        return abs(r1)
    if r5 is not None:
        return abs(r5)
    return 0.0

snaps.sort(key=score, reverse=True)
top = snaps[:top_k]

pulse_df = pd.DataFrame(top)
keep_cols = ["symbol", "asset", "last", "ret_1m", "ret_5m", "vol_15m", "regime"]
pulse_df = pulse_df[[c for c in keep_cols if c in pulse_df.columns]]

st.subheader("Pulse")
st.dataframe(pulse_df, use_container_width=True, height=260)

st.subheader("Stress feed")
events = ev.latest()[:15]
if events:
    ev_df = pd.DataFrame(events)
    ev_df["time"] = pd.to_datetime(ev_df["ts"], unit="s").dt.strftime("%H:%M:%S")
    ev_df = ev_df[["time", "type", "symbol", "asset", "value"]]
    st.dataframe(ev_df, use_container_width=True, height=260)
else:
    st.caption("No events yet.")

st.subheader("Correlation card (stocks)")
corr_symbols = ["AAPL", "TSLA"]
card = corr_card(store, corr_symbols, base_symbol=base, bin_sec=bin_sec)

st.write(card)

time.sleep(2.0)
st.rerun()
```

The background worker starts exactly once, inside a daemon thread. It owns the async WebSocket loop and keeps updating store and events in memory. Streamlit never touches the sockets.

The Pulse table comes straight from `store.snapshots()`. We sort by absolute 1-minute return when available, and fall back to 5-minute return when it exists.

The stress feed is rendered as a simple table, but we convert the raw epoch timestamp into a readable time string so it looks like a real UI.

The correlation card is a small JSON-ish object. It includes the base symbol, current regime, the window used, and the top correlations.

Finally, the refresh loop is intentionally basic. Sleep for two seconds, rerun, render the latest state. The heavy work continues in the worker thread.

::: info Final Output

The final app:

<SiteInfo
  name="Market Pulse App (1)"
  desc=""
  url="https://gumlet.tv/watch/69b99df9554f0fb510c28ce6/"
  logo="https://gumlet.tv/favicon.ico?favicon.0gt6lw3txev9b.ico"
  preview="https://video.gumlet.io/697cf00cb3fe55564293846d/69b99df9554f0fb510c28ce6/thumbnail-1-0.png?v=1773772308171&format=auto&w=1200"/>

:::

---

## What I’d Improve Next

If you want to take this beyond a demo, I’d start with a few practical upgrades.

First, split the Pulse table by asset class. A single global ranking is fine, but crypto will often dominate simply because it trades all the time and moves more. Separate tables for stocks, forex, and crypto makes the dashboard feel more balanced and closer to how a real product would present it.

Second, add light persistence. Even a tiny SQLite file or parquet dump every few minutes is enough to replay the last hour and debug issues without leaving the app running all day.

Third, route stress events somewhere useful. A webhook, a queue, or a small database table. Once events leave the UI and become part of a system, you can power alerts, newsletters, and internal monitoring.

Finally, if you want correlation to truly be multi-asset, you’ll need a stronger alignment approach. Bucketing works well for liquid equities, but for mixed tick rates you’ll want resampling logic, missing-data handling, and probably different bucket sizes per asset class.

---

## Conclusion

That’s the full build: a live market pulse screen that streams multi-asset prices, maintains rolling state in memory, converts noisy ticks into usable signals, and surfaces everything through a simple Streamlit dashboard.

The main takeaway is the pattern. Keep streaming, state, and UI separated. Compute a small set of metrics that update smoothly. Then turn those metrics into event cards and widgets that a product team can actually use.

If you already use a multi-asset feed like EODHD for pricing and coverage, this kind of dashboard becomes a straightforward extension. Not a giant engineering project, just a clean way to ship real-time market context.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Market Pulse App in Python: Real-Time & Multi-Asset",
  "desc": "A “market pulse” screen is basically the tab you keep open when you don’t want to stare at charts all day. It tells you what’s moving right now, what’s unusually volatile, and which names are starting",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-market-pulse-app-in-python-real-time-multi-asset.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
