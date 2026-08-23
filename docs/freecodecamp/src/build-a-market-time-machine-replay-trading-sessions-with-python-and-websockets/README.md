---
lang: en-US
title: "Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets"
description: "Article(s) > Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets"
    - property: og:description
      content: "Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-market-time-machine-replay-trading-sessions-with-python-and-websockets/
prev: /programming/py-fastapi/articles/README.md
date: 2026-08-27
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ac2c7aca-36c9-4f25-9872-3f5fb44c70a6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets"
  desc="Historical market data usually arrives as a completed dataset. That's convenient for analysis, but very different from the way trading software experiences a live market. In production, events arrive "
  url="https://freecodecamp.org/news/build-a-market-time-machine-replay-trading-sessions-with-python-and-websockets"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ac2c7aca-36c9-4f25-9872-3f5fb44c70a6.png"/>

Historical market data usually arrives as a completed dataset. That's convenient for analysis, but very different from the way trading software experiences a live market. In production, events arrive one at a time, the future is unknown, and every decision depends only on what has happened so far.

In this tutorial, we’ll rebuild that experience using historical tick data. We’ll take a full AAPL trading session from EODHD, normalize more than one million trades into a deterministic event tape, and replay them according to their original timing through a controllable market clock.

Along the way, we’ll add adjustable playback speeds, pause and resume controls, seeking, and a FastAPI service that exposes the controls through REST while streaming trades over WebSockets.

We’ll also build a separate consumer that calculates rolling VWAP and market state only from the events it receives. By the end, we’ll have a complete local replay system that can feed an already-finished trading day back to event-driven software as a timed stream, while correctly rebuilding downstream state after seeks and validating the result with automated tests.

---

## Table of Contents

- [Set Up the Python Project](#heading-set-up-the-python-project)
- [Download a Full Trading Session from EODHD](#heading-download-a-full-trading-session-from-eodhd)
- [Normalize Tick Data into a Replay Tape](#heading-normalize-tick-data-into-a-replay-tape)
- [Build the Historical Replay Clock](#heading-build-the-historical-replay-clock)
- [Add Playback Controls with a Replay Session](#heading-add-playback-controls-with-a-replay-session)
- [Expose the Replay with FastAPI and WebSockets](#heading-expose-the-replay-with-fastapi-and-websockets)
- [Build a Stateful WebSocket Consumer](#heading-build-a-stateful-websocket-consumer)
- [Make Seeking State-Safe](#heading-make-seeking-state-safe)
- [Replay the Full AAPL Trading Day](#heading-replay-the-full-aapl-trading-day)
- [Test the Replay Engine](#heading-test-the-replay-engine)

::: note Prerequisites

Before starting, make sure you have:

- Python 3.10 or later installed.
- An EODHD API key with access to the historical tick-data endpoint. You can create a developer account from the [<VPIcon icon="fas fa-globe"/>EODHD pricing page](https://eodhd.com/pricing).
- A terminal and code editor.
- Basic Python knowledge, including functions, classes, dictionaries, and working with packages.
- Basic familiarity with HTTP and WebSockets. You don't need prior FastAPI experience.
- Enough local disk space to store the downloaded raw tick data and processed replay tapes. The full AAPL session used in this tutorial contains more than one million trade records.

:::

The shell commands in this tutorial use Unix-style syntax, so they work directly on macOS and Linux. On Windows, you can run them through WSL, Git Bash, or use the equivalent PowerShell commands.

---

## What We’re Building

Before touching the code, it helps to see the full system once. The replay engine will take [<VPIcon icon="fas fa-globe"/>historical trades from EODHD](https://eodhd.com/financial-apis/api-for-historical-data-and-volumes), convert them into a consistent internal format, restore their timing, and stream them to a separate consumer as if the trading day were unfolding again.

The complete flow looks like this:

![Complete flow](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/540df00a-a573-4f74-9328-b4a0f565f650.png)
<!-- TODO: mermaid화 -->

Each layer has one job. The loader retrieves and preserves the raw historical session. The normalizer validates those records and turns them into a deterministic replay tape. The clock maps historical timestamps onto wall-clock time, while the replay session adds controls such as start, pause, resume, speed changes, seek, and stop.

FastAPI sits around that replay engine. REST endpoints form the control plane, while a WebSocket carries the actual trade and replay-control events. On the other side, the consumer maintains its own rolling state only from what reaches it through that stream.

We’ll keep those responsibilities separated in the project structure:

```sh title="file structure"
market-time-machine/
├── data/
│   ├── raw/
│   └── processed/
├── replay/
│   ├── __init__.py
│   ├── config.py
│   ├── loader.py
│   ├── events.py
│   ├── clock.py
│   └── session.py
├── api/
│   ├── __init__.py
│   ├── server.py
│   └── run.py
├── consumer/
│   ├── __init__.py
│   └── consumer.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_replay.py
├── .env
├── .gitignore
└── pytest.ini
```

The important rule for the whole build is simple: the consumer should know only what has already arrived through the replay stream. It should never read ahead from the historical tape. That constraint is what makes timing, pause/resume behavior, and state reconstruction after a seek worth implementing correctly.

---

## Set Up the Python Project

Start by creating the project directories and installing the packages we’ll use for data retrieval, replay timing, the API layer, WebSocket communication, and testing.

```sh
mkdir -p market-time-machine/data/raw
mkdir -p market-time-machine/data/processed
mkdir -p market-time-machine/replay
mkdir -p market-time-machine/api
mkdir -p market-time-machine/consumer
mkdir -p market-time-machine/tests

cd market-time-machine

pip install requests fastapi "uvicorn[standard]" websockets httpx python-dotenv numpy pytest pytest-asyncio
```

Create empty <VPIcon icon="fa-brands fa-python"/>`__init__.py` files inside `replay`, `api`, `consumer`, and `tests` so Python treats each directory as a package:

```sh title="file structure"
replay/__init__.py
api/__init__.py
consumer/__init__.py
tests/__init__.py
```

We’ll fetch the [<VPIcon icon="fas fa-globe"/>historical trades from EODHD](https://eodhd.com/financial-apis/api-for-historical-data-and-volumes), so create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the project root and store your API key there:

The downloaded session will also be fairly large, so neither the credentials nor the local market-data files should be committed. Create <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```gitignore title=".gitignore"
.env
data/
__pycache__/
*.pyc
.ipynb_checkpoints/
```

::: note

If you don’t have an EODHD API key, you can easily get it by [<VPIcon icon="fas fa-globe"/>opening an EODHD developer account](https://eodhd.com/pricing).

:::

::: info After this setup, the project should look like this:

```sh title="file structure"
market-time-machine/
├── data/
│   ├── raw/
│   └── processed/
├── replay/
│   └── __init__.py
├── api/
│   └── __init__.py
├── consumer/
│   └── __init__.py
├── tests/
│   └── __init__.py
├── .env
└── .gitignore
```

The <VPIcon icon="fas fa-folder-open"/>`raw/` directory will preserve the responses received from EODHD, while <VPIcon icon="fas fa-folder-open"/>`processed/` will hold the normalized replay tapes we build from them.

:::

---

## Download a Full Trading Session from EODHD

The replay engine needs a complete trading session before it can restore any sense of time. We’ll use EODHD’s historical tick API to retrieve AAPL trades for July 15, 2026, but keep the retrieval layer separate from everything related to replay.

Two files handle this part of the project:

```sh title="file structure"
market-time-machine/
└── replay/
    ├── __init__.py
    ├── config.py
    └── loader.py
```

.<VPIcon icon="fa-brands fa-python"/>`config.py` keeps the shared API, path, and market-session settings in one place. <VPIcon icon="fa-brands fa-python"/>`loader.py` uses those settings to retrieve the session and preserve the raw responses under <VPIcon icon="fas fa-folder-open"/>`data/raw/`.

### Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`config.py`

Add the following:

```py :collapsed-lines title="replay/config.py"
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

TOKEN = os.environ.get("EODHD_API_TOKEN")
TICKS_URL = "https://eodhd.com/api/ticks/"

RAW = ROOT / "data" / "raw"
PROCESSED = ROOT / "data" / "processed"

MARKET_TZ = "America/New_York"
OPEN = "09:30:00"
CLOSE = "16:00:00"

MAX_LIMIT = 10_000
MIN_WINDOW_S = 1
CLOSE_GRACE_S = 5

FIELDS = ("mkt", "price", "seq", "shares", "sl", "sub_mkt", "ts")
NON_LAST_SALE = frozenset("IWVT47")

def token():
    if not TOKEN:
        raise RuntimeError("EODHD_API_TOKEN not set")
    return TOKEN

def redact(text):
    return str(text).replace(TOKEN, "<TOKEN>") if TOKEN else str(text)
```

The regular US equity session is defined in `America/New_York` rather than with fixed UTC timestamps. That matters because the UTC equivalent of 09:30 changes with daylight saving time.

We also extend the request window five seconds beyond 16:00 with `CLOSE_GRACE_S`. The session used in this tutorial contains closing activity immediately after 16:00:00, so the grace window keeps those records inside the download.

### Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`loader.py`

A single large request is not a safe way to retrieve a dense tick-data session. Activity changes substantially throughout the day, and any request that reaches the configured `10,000`-record limit could represent a truncated interval.

Instead, the loader will adjust its request window based on the density of the previous response.

Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`loader.py`:

```py :collapsed-lines title="replay/loader.py"
import json, time
from datetime import datetime
from zoneinfo import ZoneInfo

import requests

from . import config

def fetch(symbol, frm, to, limit=None):
    limit = limit or config.MAX_LIMIT

    r = requests.get(config.TICKS_URL, timeout=180, params={
        "s": symbol,
        "from": frm,
        "to": to,
        "limit": limit,
        "api_token": config.token(),
        "fmt": "json"
    })

    if r.status_code != 200:
        raise RuntimeError(
            f"HTTP {r.status_code} {config.redact(r.text[:200])}"
        )

    return r.json()

def bounds(date_str, grace=None):
    grace = config.CLOSE_GRACE_S if grace is None else grace
    tz = ZoneInfo(config.MARKET_TZ)
    d = datetime.strptime(date_str, "%Y-%m-%d").date()

    def at(hms):
        h, m, s = map(int, hms.split(":"))
        return datetime(
            d.year, d.month, d.day, h, m, s, tzinfo=tz
        ).timestamp()

    return int(at(config.OPEN)), int(at(config.CLOSE)) + grace

def fetch_session(symbol, date_str, tag="session", window=None,
                  force=False, verbose=True):

    raw = config.RAW / f"{symbol}_{date_str}_{tag}.jsonl"
    man = config.RAW / f"{symbol}_{date_str}_{tag}.manifest.json"

    if raw.exists() and man.exists() and not force:
        m = json.loads(man.read_text())
        print(f"cached {raw.name}: {m['ticks']:,} ticks")
        return m, raw

    start, end = window or bounds(date_str)
    cursor, win = start, 30

    total = pages = retries = 0
    first_ts = last_ts = None
    seen_fields = set()
    t0 = time.perf_counter()

    with open(raw, "w") as fh:
        while cursor < end:
            b = min(cursor + win, end)
            span = b - cursor

            payload = fetch(symbol, cursor, b)
            n = len(payload.get("ts", []))

            if n >= config.MAX_LIMIT:
                if span <= config.MIN_WINDOW_S:
                    raise RuntimeError(
                        f"second {cursor} has >= {config.MAX_LIMIT} ticks "
                        "and cannot be paginated"
                    )

                win = max(1, span // 2)
                retries += 1
                continue

            if n:
                seen_fields.update(payload.keys())

                if first_ts is None:
                    first_ts = payload["ts"][0]

                last_ts = payload["ts"][-1]

                fh.write(json.dumps({
                    "from": cursor,
                    "to": b,
                    "payload": payload
                }) + "\n")

            total += n
            pages += 1
            cursor = b

            density = n / span if span else 0
            win = int(min(
                1800,
                max(1, config.MAX_LIMIT * 0.75 / max(density, 0.01))
            ))

            if verbose and pages % 20 == 0:
                pct = 100 * (cursor - start) / (end - start)
                print(f"{pct:5.1f}% {total:,} ticks")

    m = {
        "symbol": symbol,
        "date": date_str,
        "tag": tag,
        "ticks": total,
        "pages": pages,
        "retries": retries,
        "window_from_utc": start,
        "window_to_utc": end,
        "first_timestamp_ms": first_ts,
        "last_timestamp_ms": last_ts,
        "fields": sorted(seen_fields),
        "elapsed_s": round(time.perf_counter() - t0, 1),
        "api_calls": pages * 10
    }

    man.write_text(json.dumps(m, indent=2))
    return m, raw

def read_pages(path):
    with open(path) as fh:
        for line in fh:
            if line.strip():
                yield json.loads(line)
```

The loader starts with a 30-second window. If that interval reaches the record ceiling, it retries with a smaller one instead of accepting a potentially incomplete response. For quieter periods, the next window can expand up to 30 minutes.

Each accepted response is written directly to JSONL before any normalization takes place. A manifest is stored alongside it with the session bounds, tick count, timestamps, observed fields, and retrieval statistics.

Now fetch the full AAPL session:

```py
from replay.loader import fetch_session

SYMBOL = "AAPL"
DATE = "2026-07-15"

print("=== fullday ===")

manifest, raw_path = fetch_session(
    SYMBOL,
    DATE,
    tag="fullday"
)

print(
    f" window {manifest['window_from_utc']}..{manifest['window_to_utc']} | "
    f"{manifest['ticks']:,} ticks, {manifest['pages']} pages, "
    f"{manifest['retries']} retries | "
    f"{manifest['elapsed_s']}s, {manifest['api_calls']} metered api calls"
)

print(
    f" first_ts {manifest['first_timestamp_ms']} "
    f"last_ts {manifest['last_timestamp_ms']}"
)

print(" fields:", manifest["fields"])
```

The final clean run reused the already downloaded session and produced:

![eodhd trading session download](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/3354cc45-6132-4ef8-a673-2a1cca25c00b.png)

We now have `1,032,411` raw trade records covering the full regular session and closing grace window. The `145` accepted pages and `16` retries also show why a fixed request window would have been a weak assumption for tick data this dense.

These records are still stored exactly as they came from EODHD, though. Before the replay engine can use them, they need to become a deterministic internal event sequence.

---

## Normalize Tick Data into a Replay Tape

The loader gives us the complete session, but the replay engine shouldn't work directly with EODHD’s raw response format. The tick endpoint returns fields such as timestamps, prices, sizes, sequence numbers, and market codes as parallel arrays.

Before replaying them, we need to verify those arrays line up, establish a deterministic event order, remove duplicates, and convert the result into one internal format.

That logic belongs in <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`events.py`:

```sh title="file structure"
market-time-machine/
└── replay/
    ├── config.py
    ├── loader.py
    └── events.py
```

We’ll use two objects here. `TradeEvent` represents a single trade in the format that will eventually travel over the WebSocket. `TradeTape` stores the full session efficiently in columnar NumPy arrays and materializes individual `TradeEvent` objects only when they are needed.

### Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`events.py`

Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`events.py` with:

```py :collapsed-lines title="replay/events.py"
from dataclasses import dataclass
import numpy as np

from . import config
from .loader import read_pages

@dataclass(frozen=True)
class TradeEvent:
    symbol: str
    timestamp_ms: int
    price: float
    size: int
    sequence: int
    market: str
    sub_market: str
    sale_condition: str
    source: str = "replay"

    def to_wire(self):
        sl = self.sale_condition

        return {
            "type": "trade",
            "symbol": self.symbol,
            "timestamp_ms": self.timestamp_ms,
            "price": self.price,
            "size": self.size,
            "sequence": self.sequence,
            "source": self.source,
            "metadata": {
                "market": self.market,
                "sub_market": self.sub_market or None,
                "sale_condition": sl,
                "odd_lot": "I" in sl,
                "zero_size": self.size == 0,
                "last_sale_eligible": not (
                    set(sl) & config.NON_LAST_SALE
                )
            }
        }


class TradeTape:
    def __init__(self, symbol, ts, price, size, seq, mkt, sub, sl):
        self.symbol = symbol
        self.ts = ts
        self.price = price
        self.size = size
        self.seq = seq
        self.mkt = mkt
        self.sub = sub
        self.sl = sl

    def __len__(self):
        return len(self.ts)

    def __getitem__(self, i):
        return TradeEvent(
            self.symbol,
            int(self.ts[i]),
            float(self.price[i]),
            int(self.size[i]),
            int(self.seq[i]),
            str(self.mkt[i]),
            str(self.sub[i]),
            str(self.sl[i])
        )

    def index_at(self, ts_ms):
        return int(np.searchsorted(self.ts, ts_ms, side="left"))

    def span(self):
        if not len(self):
            return None, None

        return int(self.ts[0]), int(self.ts[-1])

    def save(self, path):
        np.savez_compressed(
            path,
            ts=self.ts,
            price=self.price,
            size=self.size,
            seq=self.seq,
            mkt=self.mkt,
            sub=self.sub,
            sl=self.sl,
            symbol=np.array([self.symbol])
        )

    @classmethod
    def load(cls, path):
        z = np.load(path, allow_pickle=False)

        return cls(
            str(z["symbol"][0]),
            z["ts"],
            z["price"],
            z["size"],
            z["seq"],
            z["mkt"],
            z["sub"],
            z["sl"]
        )


def normalize(raw_path, symbol, verbose=True):
    cols = {k: [] for k in config.FIELDS}
    pages = 0

    for page in read_pages(raw_path):
        pages += 1
        p = page["payload"]

        lens = {k: len(p.get(k, [])) for k in config.FIELDS}

        if len(set(lens.values())) != 1:
            raise ValueError(
                f"ragged page {page['from']}: {lens}"
            )

        for k in config.FIELDS:
            cols[k].extend(p[k])

    ts = np.asarray(cols["ts"], dtype=np.int64)
    price = np.asarray(cols["price"], dtype=np.float64)
    size = np.asarray(cols["shares"], dtype=np.int64)
    seq = np.asarray(cols["seq"], dtype=np.int64)
    mkt = np.asarray(cols["mkt"], dtype=str)
    sub = np.asarray(cols["sub_mkt"], dtype=str)
    sl = np.asarray(cols["sl"], dtype=str)

    raw_n = len(ts)

    def arrays(mask):
        return tuple(
            a[mask]
            for a in (ts, price, size, seq, mkt, sub, sl)
        )

    keep = (
        (ts > 0)
        & np.isfinite(price)
        & (price > 0)
        & (size >= 0)
    )

    ts, price, size, seq, mkt, sub, sl = arrays(keep)

    order = np.lexsort((seq, ts))
    ts, price, size, seq, mkt, sub, sl = arrays(order)

    dup = np.zeros(len(ts), dtype=bool)

    if len(ts) > 1:
        dup[1:] = (
            (ts[1:] == ts[:-1])
            & (seq[1:] == seq[:-1])
        )

    ts, price, size, seq, mkt, sub, sl = arrays(~dup)

    tape = TradeTape(
        symbol,
        ts,
        price,
        size,
        seq,
        mkt,
        sub,
        sl
    )

    odd = sum("I" in str(s) for s in sl)
    elig = sum(
        not (set(str(s)) & config.NON_LAST_SALE)
        for s in sl
    )

    rep = {
        "pages": pages,
        "raw": raw_n,
        "kept": len(ts),
        "dropped": raw_n - len(ts) - int(dup.sum()),
        "dupes": int(dup.sum()),
        "zero_size": int((size == 0).sum()),
        "odd_lot": int(odd),
        "last_sale_eligible": int(elig),
        "seq_strict": bool(
            np.all(seq[1:] > seq[:-1])
        ) if len(seq) > 1 else True,
        "span": tape.span()
    }

    if verbose:
        n = max(1, len(ts))

        print(
            f"{rep['raw']:,} raw -> {rep['kept']:,} kept "
            f"({rep['dupes']} dupes, {rep['dropped']} invalid)"
        )

        print(
            f"zero-size {100*rep['zero_size']/n:.1f}% | "
            f"odd-lot {100*odd/n:.1f}% | "
            f"last-sale-eligible {100*elig/n:.1f}%"
        )

        print(
            f"seq strictly increasing: {rep['seq_strict']}"
        )

    return tape, rep
```

The first validation happens before we construct any trades. Since the source fields arrive as parallel arrays, every field on a page must contain the same number of observations. Otherwise, combining them could silently attach one trade’s price to another trade’s timestamp.

After that, the arrays are converted to NumPy, basic invalid records are removed, and the trades are sorted by `(timestamp, sequence)`. The timestamp gives us chronological order, while the sequence number provides deterministic ordering when several trades share the same millisecond.

Exact duplicates with the same timestamp and sequence are then removed. `TradeTape` keeps the resulting columns as arrays rather than allocating more than a million permanent Python objects, which keeps the full-day session considerably lighter in memory.

Now normalize the raw session and save it under <VPIcon icon="fas fa-folder-open"/>`data/processed/`:

```py
import json

from replay import config
from replay.events import normalize

tape, report = normalize(raw_path, SYMBOL)

tape.save(
    config.PROCESSED / f"{SYMBOL}_{DATE}_fullday.npz"
)

lo, hi = tape.span()

print(
    f"span {lo}..{hi} "
    f"({(hi-lo)/3_600_000:.2f} market hours)"
)

print("first 3 normalized events:")

for i in range(3):
    print(json.dumps(tape[i].to_wire()))
```

The actual normalization run produced:

![normalized events run](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/753f7580-f83b-4241-998b-3c06d0747dcb.png)

Only two duplicate records disappear from more than one million raw observations, and none fail the basic timestamp, price, or size checks. More importantly for replay, the normalized sequence is strictly increasing.

### Create a Smaller Tape for Benchmarks and Tests

The full-day tape will power the final replay. For the timing benchmark and automated tests, though, we don't need to run through all 6.5 hours every time.

We’ll derive a 15-minute slice from 12:00 to 12:15 ET directly from the normalized full-day tape:

```py
from datetime import datetime
from zoneinfo import ZoneInfo

from replay.events import TradeTape

tz = ZoneInfo(config.MARKET_TZ)

quiet_start = int(
    datetime(
        2026, 7, 15, 12, 0,
        tzinfo=tz
    ).timestamp() * 1000
)

quiet_end = quiet_start + 15 * 60_000

i = tape.index_at(quiet_start)
j = tape.index_at(quiet_end)

quiet_tape = TradeTape(
    tape.symbol,
    tape.ts[i:j],
    tape.price[i:j],
    tape.size[i:j],
    tape.seq[i:j],
    tape.mkt[i:j],
    tape.sub[i:j],
    tape.sl[i:j]
)

quiet_tape.save(config.PROCESSED / f"{SYMBOL}_{DATE}_quiet15m.npz")
```

We now have two processed tapes: the full session for the end-to-end replay and a smaller real market interval for repeatable timing and control tests.

---

## Build the Historical Replay Clock

We now have a deterministic sequence of trades, but there's still nothing making those trades behave like a market stream. If we simply iterate through the tape, Python will process the session as quickly as the machine allows.

The replay clock solves that by mapping historical market time onto real wall-clock time. It also lets us change the playback speed without changing the original timestamps.

A naïve version might sleep for the historical gap between every pair of trades:

```py
gap = (next_ts - current_ts) / 1000
await asyncio.sleep(gap / speed)
```

At `10x`, a 500 ms historical gap becomes 50 ms. At `100x`, it becomes 5 ms.

The problem is that `asyncio.sleep()` only guarantees that execution will resume **after** the requested delay. If each sleep wakes slightly late and the next delay is measured from that late wake-up, those errors can accumulate across a long replay.

Instead, we’ll anchor the whole replay to `time.monotonic()`:

$$
\frac{\text{historical elapsed time}}{\text{replay speed}}+\text{wall-clock start}=\text{target wall-clock time}
$$

Every event is therefore scheduled relative to the same anchor rather than relative to when the previous event happened to finish.

### Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`clock.py`

Add the clock to the replay package:

```sh title="replay/clock.py"
market-time-machine/
└── replay/
    ├── config.py
    ├── loader.py
    ├── events.py
    └── clock.py
```

Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`clock.py`:

```py :collapsed-lines title="replay/clock.py"
import asyncio, time
import numpy as np

MIN_SLEEP_S = 0.0005

class ReplayClock:
    def __init__(self, start_ms, speed=1.0):
        self.speed = float(speed)
        self._anchor_ms = float(start_ms)
        self._anchor_wall = None
        self.running = False
        self.epoch = 0

    def start(self):
        self._anchor_wall = time.monotonic()
        self.running = True
        return self

    def now_ms(self, now=None):
        if not self.running or self._anchor_wall is None:
            return self._anchor_ms

        now = now if now is not None else time.monotonic()

        return (
            self._anchor_ms
            + (now - self._anchor_wall) * 1000 * self.speed
        )

    def wall_for(self, ms):
        return (
            self._anchor_wall
            + (ms - self._anchor_ms) / 1000 / self.speed
        )

    def _reanchor(self, ms):
        self._anchor_ms = float(ms)
        self._anchor_wall = time.monotonic()
        self.epoch += 1

    def set_speed(self, speed):
        self._reanchor(self.now_ms())
        self.speed = float(speed)

    def pause(self):
        if self.running:
            self._anchor_ms = self.now_ms()
            self.running = False

    def resume(self):
        if not self.running:
            self._anchor_wall = time.monotonic()
            self.running = True
            self.epoch += 1

    def seek(self, ms):
        self._reanchor(ms)


def new_stats(speed):
    return {
        "emitted": 0,
        "batches": 0,
        "lateness": [],
        "dropped": 0,
        "speed": speed,
        "wall0": None,
        "market0": None,
        "market1": None
    }


def summarize(st):
    if not st["lateness"]:
        return {
            "emitted": st["emitted"],
            "batches": st["batches"]
        }

    a = np.asarray(st["lateness"])

    wall = (
        time.monotonic() - st["wall0"]
        if st["wall0"] else 0.0
    )

    mkt = (
        (st["market1"] - st["market0"]) / 1000
        if st["market0"] is not None else 0.0
    )

    ok = st["dropped"] == 0 and wall > 0
    realized = round(mkt / wall, 2) if ok else None

    return {
        "emitted": st["emitted"],
        "batches": st["batches"],
        "mean_batch": round(
            st["emitted"] / max(1, st["batches"]), 1
        ),
        "market_s": round(mkt, 3),
        "wall_s": round(wall, 3),
        "requested_speed": st["speed"],
        "realized_speed": realized,
        "speed_error_pct": (
            round(
                100 * (realized - st["speed"]) / st["speed"],
                2
            )
            if ok else None
        ),
        "lateness_p50_ms": round(
            float(np.percentile(a, 50)), 2
        ),
        "lateness_p95_ms": round(
            float(np.percentile(a, 95)), 2
        ),
        "lateness_max_ms": round(
            float(a.max()), 2
        ),
        "reanchor_batches_dropped": st["dropped"]
    }


async def replay_batches(
    tape,
    clock,
    start,
    stats,
    max_batch=4096
):
    i, n = start, len(tape)
    last_epoch = clock.epoch

    if stats["wall0"] is None:
        stats["wall0"] = time.monotonic()
        stats["market0"] = int(tape.ts[start])

    while i < n:
        if not clock.running:
            await asyncio.sleep(0.005)
            continue

        now = time.monotonic()

        j = min(
            int(
                np.searchsorted(
                    tape.ts,
                    clock.now_ms(now),
                    side="right"
                )
            ),
            n,
            i + max_batch
        )

        if j > i and not clock.running:
            continue

        if j > i:
            if clock.epoch == last_epoch:
                targets = clock.wall_for(
                    tape.ts[i:j].astype(np.float64)
                )

                stats["lateness"].extend(
                    ((now - targets) * 1000).tolist()
                )
            else:
                stats["dropped"] += 1
                last_epoch = clock.epoch

            stats["emitted"] += j - i
            stats["batches"] += 1
            stats["market1"] = int(tape.ts[j - 1])

            yield i, j
            i = j
            continue

        wait = clock.wall_for(float(tape.ts[i])) - now

        await asyncio.sleep(
            wait if wait > MIN_SLEEP_S else 0
        )
```

`now_ms()` tells us where the replay currently is in historical market time. `wall_for()` performs the opposite conversion and tells us when a historical timestamp should become due on the machine’s monotonic clock.

Pause, resume, speed changes, and seeking can then re-anchor that mapping without modifying the underlying tape.

The other important part is batching. At high replay speeds, scheduling one sleep for every trade would create substantial overhead of its own. `replay_batches()` instead asks how far market time has advanced and releases all trades that are already due, up to the configured batch size.

If the event loop falls slightly behind, the next batch gets larger rather than introducing another artificial delay.

### Benchmark the Replay Clock

Now load the midday tape we created in the previous section and test the first 30 seconds of market time:

```py :collapsed-lines title="replay/clock.py"
import numpy as np

from replay import config
from replay.events import TradeTape
from replay.clock import (
    ReplayClock,
    replay_batches,
    new_stats,
    summarize
)

tape = TradeTape.load(
    config.PROCESSED / "AAPL_2026-07-15_quiet15m.npz"
)

end = int(
    np.searchsorted(
        tape.ts,
        tape.ts[0] + 30_000,
        side="right"
    )
)

print(
    f"{end:,} events in the first "
    "30 market seconds of AAPL quiet15m\n"
)

async def measure():
    print(
        f"{'speed':>6} {'market_s':>9} "
        f"{'wall_s':>8} {'realized':>9} "
        f"{'err_%':>7} {'p50_ms':>7} "
        f"{'p95_ms':>7} {'max_ms':>7}"
    )

    for speed in [1, 10, 50, 100]:
        clock = ReplayClock(
            tape.ts[0],
            speed
        ).start()

        st = new_stats(speed)

        async for i, j in replay_batches(
            tape,
            clock,
            0,
            st
        ):
            if j >= end:
                break

        r = summarize(st)

        print(
            f"{r['requested_speed']:>6} "
            f"{r['market_s']:>9} "
            f"{r['wall_s']:>8} "
            f"{r['realized_speed']:>9} "
            f"{r['speed_error_pct']:>7} "
            f"{r['lateness_p50_ms']:>7} "
            f"{r['lateness_p95_ms']:>7} "
            f"{r['lateness_max_ms']:>7}"
        )

await measure()
```

The actual run produced:

![quiet15m run](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5b7a1ee8-32e8-4369-a9df-1ef8e20bb325.png)

Thirty seconds of historical market time took `30.001` seconds at 1x, `3.001` seconds at 10x, `0.6` seconds at 50x, and `0.3` seconds at 100x. The realized speeds therefore stayed very close to what we requested.

The lateness values tell us how far the scheduler missed individual event deadlines. At 10x, for example, the median lateness was `0.36 ms`, the 95th percentile was `1.12 ms`, and the worst observation in this run was `11.75 ms`.

These numbers measure the replay clock itself. They're not end-to-end WebSocket latency measurements, and this is still best-effort scheduling on Python’s event loop rather than exchange-grade timing.

---

## Add Playback Controls with a Replay Session

The replay clock knows when trades are due, but it doesn't know where the replay currently is or whether playback should be running at all. We need another layer to own the tape, track the current cursor, manage the event queue, and coordinate controls such as start, pause, resume, speed changes, seek, and stop.

That logic belongs in <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`session.py`:

```sh title="file structure"
market-time-machine/
└── replay/
    ├── config.py
    ├── loader.py
    ├── events.py
    ├── clock.py
    └── session.py
```

The distinction is useful to keep clear: the clock owns time, while the session owns state.

A replay session moves through a small set of states:

![session lifecycle](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c5351a02-2ff3-4166-9110-b1b42b8b8a74.png)

### Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`session.py`

Create <VPIcon icon="fas fa-folder-open"/>`replay/`<VPIcon icon="fa-brands fa-python"/>`session.py`:

```py :collapsed-lines title="replay/session.py"
import asyncio, collections, contextlib, uuid
from enum import Enum

from .clock import ReplayClock, replay_batches, new_stats, summarize

class State(str, Enum):
    CREATED, RUNNING, PAUSED, COMPLETED, STOPPED = (
        "created", "running", "paused", "completed", "stopped"
    )

class ReplaySession:
    PRIORITY = {
        "paused", "resumed", "speed_changed",
        "replay_reset", "session_stopped"
    }

    def __init__(self, tape, speed=1.0, warmup_ms=120_000, maxsize=256):
        self.id = uuid.uuid4().hex[:12]
        self.tape = tape
        self.warmup_ms = warmup_ms
        self.maxsize = maxsize

        self.state = State.CREATED
        self.cursor = 0
        self.clock = ReplayClock(tape.ts[0], speed)
        self.stats = new_stats(speed)

        self._q = collections.deque()
        self._wake = asyncio.Event()
        self._task = None
        self._epoch = 0
        self._lock = asyncio.Lock()

    def info(self):
        lo, hi = self.tape.span()

        return {
            "session_id": self.id,
            "symbol": self.tape.symbol,
            "state": self.state.value,
            "speed": self.clock.speed,
            "cursor": self.cursor,
            "total_events": len(self.tape),
            "market_ts_ms": int(
                self.tape.ts[min(self.cursor, len(self.tape)-1)]
            ),
            "session_start_ms": lo,
            "session_end_ms": hi,
            "queued": len(self._q)
        }

    def _ctrl(self, kind, **kw):
        msg = {
            "type": kind,
            "session_id": self.id,
            "source": "replay",
            **kw
        }

        if kind in self.PRIORITY:
            self._q.appendleft(msg)
        else:
            self._q.append(msg)

        self._wake.set()

    async def _put(self, msg):
        while len(self._q) >= self.maxsize:
            self._wake.set()
            await asyncio.sleep(0)

        self._q.append(msg)
        self._wake.set()

    async def _kill(self):
        t, self._task = self._task, None

        if t and not t.done():
            t.cancel()

            with contextlib.suppress(
                asyncio.CancelledError,
                Exception
            ):
                await t

    async def start(self):
        self.clock.start()
        self.state = State.RUNNING
        self._task = asyncio.create_task(self._run())

        self._ctrl(
            "session_started",
            info=self.info()
        )

        return self.info()

    async def pause(self):
        if self.state is State.RUNNING:
            async with self._lock:
                self.clock.pause()
                self.stats["dropped"] += 1
                self.state = State.PAUSED

                self._ctrl(
                    "paused",
                    market_ts_ms=self.info()["market_ts_ms"]
                )

        return self.info()

    async def resume(self):
        if self.state is State.PAUSED:
            async with self._lock:
                self.clock.resume()
                self.state = State.RUNNING

                if self._task is None or self._task.done():
                    self._task = asyncio.create_task(self._run())

                self._ctrl(
                    "resumed",
                    market_ts_ms=self.info()["market_ts_ms"]
                )

        return self.info()

    async def set_speed(self, speed):
        async with self._lock:
            old = self.clock.speed
            self.clock.set_speed(speed)
            self.stats["speed"] = speed

            self._ctrl(
                "speed_changed",
                old_speed=old,
                new_speed=speed
            )

        return self.info()

    async def seek(self, target_ms):
        was = self.state
        await self._kill()

        async with self._lock:
            idx = max(
                0,
                min(
                    self.tape.index_at(target_ms),
                    len(self.tape)-1
                )
            )

            self._epoch += 1
            self.cursor = idx
            self.state = State.PAUSED
            self.clock.pause()

            warm = max(
                0,
                self.tape.index_at(
                    int(self.tape.ts[idx]) - self.warmup_ms
                )
            )

            purged = sum(
                1 for m in self._q
                if m.get("type") == "trade"
            )

            self._q = collections.deque(
                m for m in self._q
                if m.get("type") != "trade"
            )

            self._ctrl(
                "replay_reset",
                reason="seek",
                target_timestamp_ms=int(self.tape.ts[idx]),
                warmup_from_ms=int(self.tape.ts[warm]),
                warmup_events=idx-warm,
                purged_stale_events=purged,
                epoch=self._epoch
            )

        for k in range(warm, idx):
            await self._put({
                **self.tape[k].to_wire(),
                "warmup": True
            })

        self._ctrl(
            "warmup_complete",
            market_ts_ms=int(self.tape.ts[idx])
        )

        async with self._lock:
            self.clock.seek(float(self.tape.ts[idx]))

            if was is State.RUNNING:
                self.clock.start()
                self.state = State.RUNNING
                self._task = asyncio.create_task(self._run())

        return self.info()

    async def stop(self):
        self.state = State.STOPPED
        await self._kill()

        self._ctrl(
            "session_stopped",
            info=self.info(),
            timing=summarize(self.stats)
        )

        return self.info()

    async def _run(self):
        epoch = self._epoch

        async for i, j in replay_batches(
            self.tape,
            self.clock,
            self.cursor,
            self.stats
        ):
            if self._epoch != epoch or self.state is State.STOPPED:
                return

            for k in range(i, j):
                await self._put(self.tape[k].to_wire())
                self.cursor = k+1

        if self._epoch == epoch and self.cursor >= len(self.tape):
            self.state = State.COMPLETED

            self._ctrl(
                "session_completed",
                info=self.info(),
                timing=summarize(self.stats)
            )

    async def events(self):
        while True:
            if not self._q:
                self._wake.clear()
                await self._wake.wait()
                continue

            m = self._q.popleft()
            yield m

            if m.get("type") in (
                "session_completed",
                "session_stopped"
            ):
                return
```

The main piece of session state is `cursor`, which points to the next position in the `TradeTape`. The producer uses `replay_batches()` from the clock layer, converts each due tape position into a wire-ready trade event, and places it onto the session queue.

Pausing freezes the clock without changing the cursor. Resuming gives the clock a new wall-time anchor and continues from the same historical position. A speed change works similarly: the clock first anchors itself at the current replay timestamp, then applies the new speed from that point forward.

The queue contains more than trades. Controls such as `paused`, `resumed`, `speed_changed`, and `replay_reset` also become events, which means the downstream consumer can react to changes in replay state instead of trying to infer them from the trade timestamps.

`seek()` is the most involved control. It stops the current producer, finds the requested position with `TradeTape.index_at()`, removes stale queued trades, and prepares a warmup window before playback continues. We’ll look at why that warmup is necessary once the stateful consumer is in place.

There's no separate terminal run for `ReplaySession` at this point. We’ll exercise these controls through the actual API and WebSocket stream once the remaining pieces of the system are connected.

---

## Expose the Replay with FastAPI and WebSockets

The replay session now has everything needed to control historical playback, but it still exists only as a Python object. To let another program create a session, control it, and receive the resulting trade stream, we’ll put a small API layer around it.

That layer lives in a separate <VPIcon icon="fas fa-folder-open"/>`api/` package:

```sh title="file structure"
market-time-machine/
├── replay/
│   └── ...
└── api/
    ├── __init__.py
    ├── server.py
    └── run.py
```

We’ll use two communication paths. REST endpoints form the control plane, while one persistent WebSocket carries the event stream.

```plaintext
Control plane

POST /sessions
POST /sessions/{id}/start
POST /sessions/{id}/pause
POST /sessions/{id}/resume
POST /sessions/{id}/speed
POST /sessions/{id}/seek
POST /sessions/{id}/stop


Event stream

WS /sessions/{id}/stream
```

A command such as pause or seek therefore arrives over HTTP, while trades and replay-control events continue flowing to the consumer through the WebSocket.

### Create <VPIcon icon="fas fa-folder-open"/>`api/`<VPIcon icon="fa-brands fa-python"/>`server.py`

Create <VPIcon icon="fas fa-folder-open"/>`api/`<VPIcon icon="fa-brands fa-python"/>`server.py`:

```py :collapsed-lines title="api/server.py"
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

from replay import config
from replay.events import TradeTape
from replay.session import ReplaySession
from replay.clock import summarize

app = FastAPI(title="Market Time Machine")

SESSIONS = {}
ATTACHED = set()

class Create(BaseModel):
    symbol: str = "AAPL"
    date: str
    tag: str = "fullday"
    speed: float = Field(1.0, gt=0)
    warmup_ms: int = 120_000

class Speed(BaseModel):
    speed: float = Field(..., gt=0)

class Seek(BaseModel):
    target_timestamp_ms: int

def get(sid):
    if sid not in SESSIONS:
        raise HTTPException(404, f"no session {sid}")
    return SESSIONS[sid]

@app.post("/sessions")
async def create(b: Create):
    path = config.PROCESSED / f"{b.symbol}_{b.date}_{b.tag}.npz"

    if not path.exists():
        raise HTTPException(404, f"no tape {path.name}")

    s = ReplaySession(
        TradeTape.load(path),
        b.speed,
        b.warmup_ms
    )

    SESSIONS[s.id] = s
    return s.info()

@app.get("/sessions/{sid}")
async def info(sid: str):
    return get(sid).info()

@app.get("/sessions/{sid}/timing")
async def timing(sid: str):
    return summarize(get(sid).stats)

@app.post("/sessions/{sid}/start")
async def start(sid: str):
    return await get(sid).start()

@app.post("/sessions/{sid}/pause")
async def pause(sid: str):
    return await get(sid).pause()

@app.post("/sessions/{sid}/resume")
async def resume(sid: str):
    return await get(sid).resume()

@app.post("/sessions/{sid}/stop")
async def stop(sid: str):
    return await get(sid).stop()

@app.post("/sessions/{sid}/speed")
async def speed(sid: str, b: Speed):
    return await get(sid).set_speed(b.speed)

@app.post("/sessions/{sid}/seek")
async def seek(sid: str, b: Seek):
    return await get(sid).seek(b.target_timestamp_ms)

@app.websocket("/sessions/{sid}/stream")
async def stream(ws: WebSocket, sid: str):
    await ws.accept()

    if sid not in SESSIONS:
        return await ws.close(4004, "unknown session")

    if sid in ATTACHED:
        return await ws.close(4009, "consumer already attached")

    ATTACHED.add(sid)

    try:
        await ws.send_json({
            "type": "attached",
            "session_id": sid
        })

        async for msg in SESSIONS[sid].events():
            await ws.send_json(msg)

    except (WebSocketDisconnect, Exception):
        pass

    finally:
        ATTACHED.discard(sid)
```

Creating a session loads the processed `.npz` tape and wraps it in a `ReplaySession`. At this point, the API never needs to call EODHD or read the raw JSONL responses again. The replay works entirely from the normalized tape.

The REST handlers stay intentionally thin. `/pause`, for example, doesn't contain any pause logic of its own:

```py
@app.post("/sessions/{sid}/pause")
async def pause(sid: str):
    return await get(sid).pause()
```

It simply passes the command to `ReplaySession`. The same pattern applies to resume, speed changes, seek, and stop. This keeps the replay behavior inside <VPIcon icon="fas fa-folder-open"/>`replay/` instead of coupling it to FastAPI.

The WebSocket endpoint handles the other direction. Once a consumer connects, the server forwards everything produced by `session.events()`:

```py
async for msg in SESSIONS[sid].events():
    await ws.send_json(msg)
```

That can be a normal trade:

```json
{
  "type": "trade",
  "symbol": "AAPL",
  "timestamp_ms": 1784122200009,
  "price": 317.46,
  "size": 3,
  "sequence": 61530328,
  "source": "replay"
}
```

or a replay-control message:

```json
{
  "type": "paused",
  "market_ts_ms": 1784122200009
}
```

Seeking will later introduce another important control event:

```json
{
  "type": "replay_reset",
  "reason": "seek",
  "target_timestamp_ms": 1784136600030
}
```

The server allows one WebSocket consumer per replay session. The current queue is a FIFO handoff, not a broadcast system, so attaching multiple consumers to the same session would cause them to divide the events rather than each receiving a complete stream.

### Create <VPIcon icon="fas fa-folder-open"/>`api/`<VPIcon icon="fa-brands fa-python"/>`run.py`

The second API file only needs to launch the FastAPI application.

Create <VPIcon icon="fas fa-folder-open"/>`api/`<VPIcon icon="fa-brands fa-python"/>`run.py`:

```py title="api/run.py"
import argparse
import uvicorn

from api.server import app

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--port", type=int, default=8765)
    a = p.parse_args()

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=a.port,
        log_level="warning"
    )
```

Start the service from the project root:

```sh
python -m api.run --port 8765
```

The replay engine now has an external control interface and a WebSocket event stream. The next piece is the program on the other end of that stream: a consumer that builds market state only from the events it receives.

---

## Build a Stateful WebSocket Consumer

The replay service can now stream historical trades, but we still need something on the other side of the WebSocket that behaves like a real downstream application.

That consumer shouldn't load the historical tape or call EODHD directly. Its entire view of the market should come from the messages arriving through the replay stream.

We’ll keep it in a separate package:

```sh title="file structure"
market-time-machine/
├── replay/
│   └── ...
├── api/
│   └── ...
└── consumer/
    ├── __init__.py
    └── consumer.py
```

For this tutorial, the consumer will maintain:

- the latest trade
- the latest last-sale-eligible trade
- cumulative volume
- a 30-second VWAP
- a 2-minute VWAP
- odd-lot and zero-size percentages
- a simple `SHORT_ABOVE` / `SHORT_BELOW` state

That final state isn't meant to be a trading strategy. We just need something genuinely stateful so we can later verify that replay controls, especially seeking, don't leave the consumer with stale market history.

### Create <VPIcon icon="fas fa-folder-open"/>`consumer/`<VPIcon icon="fa-brands fa-python"/>`consumer.py`

Create <VPIcon icon="fas fa-folder-open"/>`consumer/`<VPIcon icon="fa-brands fa-python"/>`consumer.py`:

```py :collapsed-lines title="consumer/consumer.py"
import argparse, asyncio, collections, json
import websockets

class VWAP:
    def __init__(self, window_ms):
        self.w = window_ms
        self.buf = collections.deque()
        self.pv = 0.0
        self.vol = 0.0

    def add(self, ts, px, sz):
        self.buf.append((ts, px, sz))
        self.pv += px * sz
        self.vol += sz

        cut = ts - self.w

        while self.buf and self.buf[0][0] < cut:
            _, p, s = self.buf.popleft()
            self.pv -= p * s
            self.vol -= s

        if self.vol <= 0:
            self.pv = self.vol = 0.0

    @property
    def value(self):
        return self.pv / self.vol if self.vol > 0 else None


class State:
    def __init__(self, short_ms=30_000, long_ms=120_000):
        self.short = VWAP(short_ms)
        self.long = VWAP(long_ms)

        self.last_trade = None
        self.last_sale = None
        self.signal = None

        self.n = 0
        self.vol = 0
        self.odd = 0
        self.zero = 0
        self.warming = False

    def apply(self, m):
        ts = m["timestamp_ms"]
        px = m["price"]
        sz = m["size"]
        meta = m["metadata"]

        self.short.add(ts, px, sz)
        self.long.add(ts, px, sz)

        self.last_trade = px

        if meta["last_sale_eligible"]:
            self.last_sale = px

        self.n += 1
        self.vol += sz
        self.odd += meta["odd_lot"]
        self.zero += meta["zero_size"]

        s = self.short.value
        l = self.long.value

        if s is not None and l is not None:
            self.signal = (
                "SHORT_ABOVE"
                if s > l
                else "SHORT_BELOW"
            )

    def line(self):
        f = lambda v: "--" if v is None else f"{v:.4f}"

        return (
            f"n={self.n:>7,} "
            f"vol={self.vol:>9,} "
            f"trade={f(self.last_trade):>9} "
            f"sale={f(self.last_sale):>9} "
            f"vwap30s={f(self.short.value):>9} "
            f"vwap2m={f(self.long.value):>9} "
            f"sig={self.signal or '--':<11} "
            f"odd={100*self.odd/max(1,self.n):4.1f}% "
            f"zero={100*self.zero/max(1,self.n):4.1f}%"
        )


async def run(url, every=3000):
    st = State()

    async with websockets.connect(
        url,
        max_size=None
    ) as ws:
        print("[consumer] connected", flush=True)

        async for raw in ws:
            m = json.loads(raw)
            t = m["type"]

            if t == "trade":
                st.apply(m)

                if not st.warming and st.n % every == 0:
                    print(
                        f"[consumer] {st.line()}",
                        flush=True
                    )

            elif t == "replay_reset":
                print(
                    f"[consumer] RESET -> "
                    f"{m['target_timestamp_ms']} "
                    f"({m['warmup_events']} warmup, "
                    f"{m['purged_stale_events']} purged)",
                    flush=True
                )

                st = State()
                st.warming = True

            elif t == "warmup_complete":
                st.warming = False

                print(
                    f"[consumer] WARM DONE {st.line()}",
                    flush=True
                )

            elif t in (
                "session_completed",
                "session_stopped"
            ):
                print(
                    f"[consumer] {t.upper()} "
                    f"{st.line()}",
                    flush=True
                )
                break

            else:
                print(
                    f"[consumer] {t}",
                    flush=True
                )


if __name__ == "__main__":
    p = argparse.ArgumentParser()

    p.add_argument(
        "--url",
        required=True
    )

    p.add_argument(
        "--every",
        type=int,
        default=3000
    )

    a = p.parse_args()

    asyncio.run(
        run(a.url, a.every)
    )
```

The rolling VWAP windows are based on market timestamps, not on the number of trades. Every incoming trade enters both windows, and observations older than 30 seconds or two minutes are removed as replay time advances.

So the consumer state evolves incrementally:

![consumer state incremental evolution](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/2a544ac2-4bc0-4492-bcbe-3d9d8ddbe252.png)

The important point is that none of this state comes from the original `TradeTape`. The consumer only knows about events that have crossed the WebSocket.

That works cleanly while replay time moves forward. Seeking is where things become more difficult, because moving the replay cursor without resetting the consumer would leave it carrying state from the wrong point in the trading day.

---

## Make Seeking State-Safe

Seeking isn't just a matter of moving the replay cursor. If the consumer has already built rolling state at one point in the trading day, jumping somewhere else without resetting that state would mix two different market histories.

Suppose the consumer has reached 14:00. Its two-minute VWAP still contains trades from roughly 13:58 onward. If we simply move the replay cursor back to 13:30 and continue emitting trades, those future observations remain in memory:

![stale state bug](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/3c4af22f-46d3-44f4-bb9f-77031bb5d8d7.png)
<!-- TODO: mermaid화 -->

The replay therefore needs to reset the downstream state and rebuild it around the new timestamp before normal playback continues.

### Reset and Warm Up the Consumer

The `seek()` method we added to `ReplaySession` already handles this sequence. The important part begins by stopping the current producer and locating the requested position in the tape:

```py
was = self.state
await self._kill()

async with self._lock:
    idx = max(
        0,
        min(
            self.tape.index_at(target_ms),
            len(self.tape)-1
        )
    )

    self._epoch += 1
    self.cursor = idx
    self.state = State.PAUSED
    self.clock.pause()
```

Next, it calculates a warmup point two minutes before the target:

```py
warm = max(0, self.tape.index_at(int(self.tape.ts[idx]) - self.warmup_ms))
```

We use two minutes because that matches the longest rolling window maintained by the consumer. Replaying that interval is enough to reconstruct both the 30-second and two-minute VWAPs at the new position.

Before sending those warmup trades, any normal trade messages still waiting in the session queue are removed:

```py
purged = sum(1 for m in self._q if m.get("type") == "trade")
self._q = collections.deque(m for m in self._q if m.get("type") != "trade")
```

The session then sends an explicit `replay_reset` event:

```py
self._ctrl(
    "replay_reset",
    reason="seek",
    target_timestamp_ms=int(self.tape.ts[idx]),
    warmup_from_ms=int(self.tape.ts[warm]),
    warmup_events=idx-warm,
    purged_stale_events=purged,
    epoch=self._epoch
)
```

The consumer responds by discarding its current state:

```py
elif t == "replay_reset":
    st = State()
    st.warming = True
```

Now the session can send the historical trades immediately preceding the target:

```py
for k in range(warm, idx):
    await self._put({
        **self.tape[k].to_wire(),
        "warmup": True
    })

self._ctrl(
    "warmup_complete",
    market_ts_ms=int(self.tape.ts[idx])
)
```

These trades pass through exactly the same `State.apply()` logic as normal replay events, but the consumer suppresses its regular output while `warming` is `True`.

The complete seek flow is therefore:

![seek flow](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/21601771-fce7-4e24-b309-c55da73688ee.png)

### Check the Rebuilt State

In the full-session run, we paused the replay and sought to 13:30. The first actual event at or after that requested timestamp was `1784136600030`.

The consumer received:

![rebuilt state run](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/d3f66f02-9efd-4959-bbfd-5a9e0bf4ba54.png)

The old consumer state is gone, and `3,456` historical trades have rebuilt the two rolling VWAP windows around the new point in the session. Normal timed playback can now resume without carrying market state across the seek boundary.

---

## Replay the Full AAPL Trading Day

All the pieces are now connected. The full-day tape can be controlled through FastAPI, while the separate consumer sees only the trade and control events arriving over the WebSocket.

Start the replay service in the first terminal:

```sh
python -m api.run --port 8765
```

For the final run, we’ll start at `10x`, pause the market, switch to `50x`, resume, pause again, seek to 13:30, rebuild the consumer state, and finally run toward the close at `400x`.

### Run the Full Replay

Save the following as a temporary <VPIcon icon="fa-brands fa-python"/>`demo.py` in the project root. This script is only the driver for the demonstration. The replay engine and consumer remain in the packages we already built.

```py :collapsed-lines title="demo.py"
import asyncio, os, subprocess, sys
import httpx

BASE = "http://127.0.0.1:8765"
ROOT = os.getcwd()
SEEK_1330_MS = 1784136600000

async def demo():
    async with httpx.AsyncClient(base_url=BASE, timeout=120) as c:
        r = await c.post("/sessions", json={
            "symbol": "AAPL",
            "date": "2026-07-15",
            "tag": "fullday",
            "speed": 10.0
        })

        sid = r.json()["session_id"]

        consumer = subprocess.Popen([
            sys.executable,
            "-u",
            "-m",
            "consumer.consumer",
            "--url",
            f"ws://127.0.0.1:8765/sessions/{sid}/stream",
            "--every",
            "25000"
        ], cwd=ROOT)

        await asyncio.sleep(1.5)

        controls = [
            ("START @10.0x", f"/sessions/{sid}/start", None, 4),
            ("PAUSE", f"/sessions/{sid}/pause", None, 1.5),
            (
                "SPEED 50x while paused",
                f"/sessions/{sid}/speed",
                {"speed": 50.0},
                0.3
            ),
            ("RESUME", f"/sessions/{sid}/resume", None, 3),
            ("PAUSE", f"/sessions/{sid}/pause", None, 1),
            (
                "SEEK 13:30 while paused",
                f"/sessions/{sid}/seek",
                {"target_timestamp_ms": SEEK_1330_MS},
                3
            ),
            (
                "RESUME after seek",
                f"/sessions/{sid}/resume",
                None,
                3
            ),
            (
                "SPEED 400.0x to the close",
                f"/sessions/{sid}/speed",
                {"speed": 400.0},
                2
            )
        ]

        for label, path, payload, wait in controls:
            print(f"\n--- {label} ---")

            if payload is None:
                await c.post(path)
            else:
                await c.post(path, json=payload)

            await asyncio.sleep(wait)

        for _ in range(600):
            await asyncio.sleep(1)

            state = (
                await c.get(f"/sessions/{sid}")
            ).json()

            if state["state"] in ("completed", "stopped"):
                break

        print(
            f"\nfinal: {state['state']} "
            f"{state['cursor']:,}/{state['total_events']:,}"
        )

        print(
            "timing:",
            (
                await c.get(f"/sessions/{sid}/timing")
            ).json()
        )

        if consumer.poll() is None:
            consumer.terminate()

asyncio.run(demo())
```

Run it from a second terminal:

```sh
python demo.py
```

The consumer starts as its own process and attaches to the WebSocket before playback begins.

The actual run started like this:

![final run initial stream](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/e5a50746-eaf5-471d-9775-936a2ef82e94.png)

The session can therefore be stopped, re-anchored at a different speed, and resumed without restarting the replay.

The next command moves directly to 13:30:

![final run pause](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ffa3b878-f203-4f97-b667-0d81edd33aed.png)

This is the state-safe seek from the previous section happening in the complete system. The consumer discards its old state, processes the `3,456` warmup events, and only then continues from the new market timestamp.

We can then accelerate the remainder of the session:

![accelerate final run stream](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/85eb4eda-d98c-4777-aba0-bcfeec8b16a3.png)

The consumer continues updating its state from the incoming events until the session reaches the end of the tape:

![final run complete](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/68771a22-e660-424d-b8ab-6a10ab418cbd.png)

The two counts describe different things. The session cursor finishes at `1,032,409/1,032,409`, meaning it has reached the end of the full-day tape. The consumer reports `306,343` events because its state was cleared during the seek and rebuilt from that new point onward. The seek also jumps over part of the historical tape rather than streaming every skipped trade in real time.

`realized_speed` is intentionally left unset for this run because the replay was re-anchored several times by pauses, speed changes, and the seek. A single end-to-end speed ratio wouldn't meaningfully describe a session that deliberately changed its clock along the way.

What matters here is that the same historical tape survives the complete control sequence, the consumer rebuilds its state after the seek, and playback continues through to the session close.

---

## Test the Replay Engine

The full-day run shows that the system can make it through the complete control sequence, but terminal output alone doesn't tell us whether the replay stayed ordered, respected pause boundaries, or rebuilt the correct state after a seek.

We’ll test those behaviors against the smaller `quiet15m` tape created earlier:

```sh title="file structure"
market-time-machine/
└── tests/
    ├── __init__.py
    ├── conftest.py
    └── test_replay.py
```

The test suite covers four areas: event ordering, replay timing, pause/resume behavior, and state reconstruction after seeking.

### Create <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_replay.py`

Create <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_replay.py`:

```py :collapsed-lines title="tests/test_replay.py"
import asyncio
import numpy as np
import pytest

from replay import config
from replay.events import TradeTape
from replay.session import ReplaySession
from replay.clock import ReplayClock, replay_batches, new_stats, summarize

TAPE = sorted(config.PROCESSED.glob("*_quiet15m.npz"))[0]

@pytest.fixture
def tape():
    return TradeTape.load(TAPE)

async def collect(sess, seconds):
    out = []

    async def drain():
        async for m in sess.events():
            out.append(m)

    t = asyncio.create_task(drain())
    await asyncio.sleep(seconds)
    return out, t


@pytest.mark.asyncio
async def test_ordering(tape):
    s = ReplaySession(tape, speed=500)
    out, t = await collect(s, 0.1)

    await s.start()
    await asyncio.sleep(2)
    await s.stop()
    t.cancel()

    trades = [
        m for m in out
        if m["type"] == "trade"
    ]

    assert len(trades) > 1000

    keys = [
        (m["timestamp_ms"], m["sequence"])
        for m in trades
    ]

    assert keys == sorted(keys)
    assert len(set(keys)) == len(keys)


@pytest.mark.asyncio
@pytest.mark.parametrize("speed", [10, 50, 100])
async def test_timing(tape, speed):
    end = int(
        np.searchsorted(
            tape.ts,
            tape.ts[0] + 60_000,
            side="right"
        )
    )

    clock = ReplayClock(tape.ts[0], speed).start()
    st = new_stats(speed)

    async for i, j in replay_batches(tape, clock, 0, st):
        if j >= end:
            break

    r = summarize(st)

    assert abs(r["speed_error_pct"]) < 5
    assert r["lateness_p95_ms"] < 50


@pytest.mark.asyncio
async def test_pause_resume(tape):
    s = ReplaySession(tape, speed=100)
    out, t = await collect(s, 0.05)

    await s.start()
    await asyncio.sleep(1)

    await s.pause()

    n = len([
        m for m in out
        if m["type"] == "trade"
    ])

    await asyncio.sleep(1)

    assert len([
        m for m in out
        if m["type"] == "trade"
    ]) == n

    await s.resume()
    await asyncio.sleep(1)

    await s.stop()
    t.cancel()

    seqs = [
        m["sequence"]
        for m in out
        if m["type"] == "trade"
    ]

    assert seqs == sorted(seqs)
    assert len(set(seqs)) == len(seqs)


@pytest.mark.asyncio
async def test_pause_seek_resume(tape):
    s = ReplaySession(
        tape,
        speed=200,
        warmup_ms=120_000
    )

    out, t = await collect(s, 0.05)

    await s.start()
    await asyncio.sleep(0.5)
    await s.pause()

    target = int(tape.ts[0]) + 300_000
    await s.seek(target)

    assert s.info()["state"] == "paused"

    def past():
        return [
            m for m in out
            if m["type"] == "trade"
            and not m.get("warmup")
            and m["timestamp_ms"] >= target
        ]

    await asyncio.sleep(0.4)
    assert not past()

    await s.resume()
    await asyncio.sleep(1)

    got = past()

    await s.stop()
    t.cancel()

    assert got

    seqs = [m["sequence"] for m in got]

    assert seqs == sorted(seqs)
    assert len(set(seqs)) == len(seqs)


@pytest.mark.asyncio
async def test_seek_state_equivalence(tape):
    import sys

    sys.path.insert(0, str(config.ROOT))
    from consumer.consumer import State as ConsumerState

    s = ReplaySession(
        tape,
        speed=200,
        warmup_ms=120_000
    )

    live = ConsumerState()
    reset = None
    snap = None
    out = []

    async def drain():
        nonlocal live, reset, snap

        async for m in s.events():
            out.append(m)

            if m["type"] == "trade":
                live.apply(m)

            elif m["type"] == "replay_reset":
                reset = m
                live = ConsumerState()

            elif m["type"] == "warmup_complete":
                snap = (
                    live.n,
                    live.vol,
                    live.short.value,
                    live.long.value
                )

    t = asyncio.create_task(drain())

    await s.start()
    await asyncio.sleep(1)

    await s.seek(
        int(tape.ts[0]) + 600_000
    )

    for _ in range(100):
        if snap:
            break
        await asyncio.sleep(0.05)

    await s.stop()
    t.cancel()

    assert snap

    fresh = ConsumerState()

    lo = tape.index_at(
        reset["warmup_from_ms"]
    )

    hi = tape.index_at(
        reset["target_timestamp_ms"]
    )

    for k in range(lo, hi):
        fresh.apply(tape[k].to_wire())

    n, vol, short, long = snap

    assert n == fresh.n == reset["warmup_events"]
    assert vol == fresh.vol

    assert short == pytest.approx(
        fresh.short.value,
        rel=1e-12
    )

    assert long == pytest.approx(
        fresh.long.value,
        rel=1e-12
    )

    kinds = [m["type"] for m in out]

    seg = out[
        kinds.index("replay_reset") + 1:
        kinds.index("warmup_complete")
    ]

    assert not [
        m for m in seg
        if m["type"] == "trade"
        and not m.get("warmup")
    ]
```

`test_ordering()` checks that emitted trades remain sorted by `(timestamp, sequence)` and that the same event isn't emitted twice.

The timing test runs 60 seconds of historical market time at `10x`, `50x`, and `100x`. It allows a small tolerance rather than expecting an event loop to behave like a hard real-time scheduler: realized speed must stay within 5% of the target, while 95th-percentile lateness must remain below 50 ms.

`test_pause_resume()` checks something different. Once `pause()` returns, the number of received trades should remain unchanged until playback resumes. After resuming, the resulting sequence must still be ordered and duplicate-free.

`test_pause_seek_resume()` covers the exact control pattern used in the full replay. The session pauses, moves five minutes into the tape, stays paused at the new position, and only begins releasing normal post-seek trades after `resume()`.

### Verify State Reconstruction Independently

The strongest test is `test_seek_state_equivalence()`.

When the replay seeks, the consumer receives a reset followed by two minutes of warmup events. Rather than simply checking that a `warmup_complete` message appears, this test constructs a completely fresh `ConsumerState` and independently feeds it the same historical interval directly from the tape:

```py
for k in range(lo, hi):
    fresh.apply(tape[k].to_wire())
```

The replay-built and independently rebuilt states must then agree on:

```plaintext
event count
cumulative volume
30-second VWAP
2-minute VWAP
```

The VWAP values are compared with a relative tolerance of `1e-12`. The test also checks that no normal replay trades slip into the stream between `replay_reset` and `warmup_complete`.

### Configure pytest

The asynchronous tests use `pytest-asyncio`. Create <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`conftest.py`:

```py
import pytest

def pytest_configure(config):
    config.addinivalue_line(
        "markers",
        "asyncio"
    )
```

Then add `pytest.ini` in the project root:

```toml title="pytest.ini"
[pytest]
asyncio_mode = auto
```

Run the complete suite:

```sh
pytest tests/ -v
```

The recorded run produced:

![validation run](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/b9b92abc-7cac-46ac-8e48-c7bc1352aed5.png)

The tests cover more than whether the replay eventually reaches the end of the tape. They check that historical ordering survives playback, accelerated timing remains within the expected tolerance, controls preserve the event sequence, and the state reconstructed after a seek matches an independent rebuild from the underlying historical data.

---

## Conclusion

What I liked most about this build is how different the same historical dataset feels once we give it a clock again.

We started with a completed AAPL session from [<VPIcon icon="fas fa-globe"/>EODHD](https://eodhd.com/) and ended with something that could move slowly, race ahead, pause in the middle, jump to another point in the day, and keep going while the consumer reacted only to what had reached it so far.

There's still plenty of room to take the project further. The replay could support multiple symbols, richer market state, several downstream consumers, persistent replay sessions, or even strategy and execution components that plug directly into the stream. The current version keeps those pieces out deliberately, but the core replay layer is now there to build on.

For me, that's the useful outcome of the project. EODHD gives us the historical events, but the replay layer lets another piece of software experience those events as a trading day rather than as a dataset that already knows how the day ends.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a Market Time Machine: Replay Trading Sessions with Python and WebSockets",
  "desc": "Historical market data usually arrives as a completed dataset. That's convenient for analysis, but very different from the way trading software experiences a live market. In production, events arrive ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-market-time-machine-replay-trading-sessions-with-python-and-websockets/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
