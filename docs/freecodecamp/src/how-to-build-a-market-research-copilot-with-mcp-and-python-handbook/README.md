---
lang: en-US
title: "How to Build a Market Research Copilot with MCP and Python [Full Handbook]"
description: "Article(s) > How to Build a Market Research Copilot with MCP and Python [Full Handbook]"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - Jupyter Notebook
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - jupyter
  - py-jupyter
  - jupyternotebook
  - jupyter-notebook
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Market Research Copilot with MCP and Python [Full Handbook]"
    - property: og:description
      content: "How to Build a Market Research Copilot with MCP and Python [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-market-research-copilot-with-mcp-and-python-handbook/
prev: /programming/py-pandas/articles/README.md
date: 2026-05-07
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/97192f8e-e5c5-4339-8974-90d823d93a86.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
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

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Market Research Copilot with MCP and Python [Full Handbook]"
  desc="Most financial AI tools are good at one thing: summarizing a stock. You ask about Apple, NVIDIA, or Tesla, and they give you a clean overview of price action, a few ratios, and maybe some company cont"
  url="https://freecodecamp.org/news/how-to-build-a-market-research-copilot-with-mcp-and-python-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/97192f8e-e5c5-4339-8974-90d823d93a86.png"/>

Most financial AI tools are good at one thing: summarizing a stock. You ask about Apple, NVIDIA, or Tesla, and they give you a clean overview of price action, a few ratios, and maybe some company context. That can be useful, but it falls short the moment the task becomes more like real research.

Real research usually starts with a view. Not a ticker. A trader, analyst, or product team is more likely to ask something like, “Apple looks attractive because downside has been controlled and business quality remains high. Does the data actually support that?” That's a different problem. A summary can't answer it properly because the system needs to test the claim itself, not just describe the company around it.

In this tutorial, we're going to build a financial research copilot that does exactly that. It takes a natural-language thesis, pulls historical prices and fundamentals through EODHD’s MCP server, turns those inputs into structured evidence, and returns a short research memo with a verdict.

---

::: note Prerequisites

Before starting, make sure you have the following in place.

You will need Python 3.9 or later, along with these libraries: `mcp`, `openai`, `numpy`, and `pandas`. Install them with pip before running any code.

You will also need two API keys. One from EODHD for historical prices and fundamentals data, and one from OpenAI for parsing and memo generation. If you don't have an EODHD key, you can get one by registering for a developer account at [<VPIcon icon="fas fa-globe"/>eodhd.com](http://eodhd.com).

The tutorial assumes basic familiarity with Python and async programming. You don't need a background in finance, but it helps to understand what a P/E ratio and drawdown mean before reading the evidence-building sections.

A Jupyter notebook environment is recommended for running the sanity checks, though any Python environment that supports `await` will work.

:::

---

## What This Copilot Actually Produces

Before getting into the pipeline, it helps to see the kind of output we're building toward. The easiest way to understand this project is to look at one real example.

Suppose the user gives the system this prompt:

> I think Apple looks attractive because downside has been controlled and business quality remains high. Can you test that for AAPL over the last 180 days?

The copilot doesn't respond with a loose summary of Apple. It turns that into a structured research memo:

```md :collapsed-lines
1. Thesis under review  

Apple appears attractive due to controlled downside and sustained high business 
quality.

2. Supporting evidence  

Over the past 180 days, maximum drawdown was limited to -13.82%, suggesting relatively contained downside.Profitability metrics are strong, with a 35.37% operating margin and 27.04% profit margin. Returns on capital are high, with ROA at 24.38% and ROE at 152.02%, indicating efficient asset use and strong  capital efficiency. Growth metrics support ongoing business strength, with quarterly revenue growth of 15.70% and earnings growth of 18.30% year-over-year. Forward estimates also remain positive, with expected earnings growth of 9.68% and 
revenue growth of 6.87%.

3. Evidence that weakens the thesis  

Net EPS revisions over the past 30 days are negative (-3), indicating some deterioration in analyst sentiment.

4. Missing evidence  

No material gaps in the provided dataset.

5. Verdict  

partially_supported - There is more supporting evidence than contradicting evidence, but the thesis is not fully confirmed.

6. Bottom-line assessment  

Apple demonstrates strong and consistent business quality supported by high margins, returns, and continued growth. Downside has been relatively contained over the observed period, though not negligible. However, negative earnings 
revisions introduce some caution, leaving the thesis supported but not conclusively established.
```

This example makes the goal of the project much clearer. We're not building a system that simply tells us what happened to Apple. We're building one that takes a claim, checks it against market and fundamentals data, and returns a structured judgment.

That distinction matters because the memo is only the final surface. Underneath it, the system first parses the thesis, pulls prices and fundamentals through [<VPIcon icon="fas fa-globe"/>EODHD’s MCP server](https://eodhd.com/financial-apis/mcp-server-for-financial-data-by-eodhd), computes the relevant signals, builds support and contradiction, assigns a verdict, and only then writes the final note. That's what gives the output its structure.

In this first part, we’ll build everything up to the evidence layers that power this kind of output.

---

## What Makes This Different from a Normal Stock Assistant

![Stock assistant vs Thesis copilot workflow comparison](https://cdn-images-1.medium.com/max/1000/1*rJirKoA1xWiuZjyENZypGg.png)

A normal stock assistant starts with a ticker and tries to explain what happened. It may summarize price action, mention a few ratios, and add some company context. That is useful when the question is broad, but it's not enough when the input is a specific investment view.

This project starts from the opposite direction. The input is not “tell me about Apple.” The input is a claim, like Apple looks attractive because downside has been controlled and business quality remains high. That changes the job of the system. It now has to test each part of that claim, decide what supports it, decide what weakens it, and be clear about what's still missing.

That one shift is what shapes the whole workflow. Instead of ending at retrieval and summarization, the pipeline has to parse the thesis, map the data to the right kind of evidence, and return a verdict. That's what makes this feel like a research copilot rather than a better stock summary tool.

---

## The Workflow

At a high level, the copilot follows a simple sequence:

- parse the user’s thesis into a structured request
- fetch historical prices and fundamentals through MCP
- turn those inputs into market and business signals
- map those signals into support, contradiction, and missing evidence
- assign a verdict
- write the final memo

That's the full loop. The output may look like a short research note, but it sits on top of a more controlled pipeline in <VPIcon icon="fa-brands fa-python"/>`core.py`.

::: info Project structure:

```sh title="file structure
project/
├── client.py
├── core.py
└── test.ipynb
```

.<VPIcon icon="fa-brands fa-python"/>`client.py` is the MCP access layer. It connects to EODHD, lists tools, calls them with retries and timeouts, and returns metadata for each request. <VPIcon icon="fa-brands fa-python"/>`core.py` contains the actual thesis-testing logic, including parsing, data fetching, signal computation, evidence building, verdict assignment, and memo generation. <VPIcon icon="iconfont icon-jupyter"/>`test.ipynb` is where the quality checks and end-to-end demos are run.

This split is useful because it keeps the tutorial easy to follow. When we move into code, each block has a clear place. MCP access stays in <VPIcon icon="fa-brands fa-python"/>`client.py`, while the research workflow stays in <VPIcon icon="fa-brands fa-python"/>`core.py`.

:::

---

## Table of Contents

- [Building the MCP Client](#heading-building-the-mcp-client)
- [Setting Up core.py](#heading-setting-up-corepyhttpcorepy)
- [Parsing a Research Prompt into a Structured Request](#heading-parsing-a-research-prompt-into-a-structured-request)
- [Fetching the Two Data Sources: Historical & Fundamental Data](#heading-fetching-the-two-data-sources-historical-amp-fundamental-data)
- [Building the First Evidence Layer from Price Data](#heading-building-the-first-evidence-layer-from-price-data)
- [Building the Second Evidence Layer from Fundamentals](#heading-building-the-second-evidence-layer-from-fundamentals)
- [What do we have so far?](#heading-what-do-we-have-so-far)
- [Classifying the Thesis](#heading-classifying-the-thesis)
- [Turning Signals into Support, Contradiction, and Missing Evidence](#heading-turning-signals-into-support-contradiction-and-missing-evidence)
- [Assigning a Verdict](#heading-assigning-a-verdict)
- [Building the Facts Object](#heading-building-the-facts-object)
- [Writing the Final Memo](#heading-writing-the-final-memo)
- [Stitching Everything Together](#heading-stitching-everything-together)
- [Demo Time! (Jupyter Notebook)](#heading-demo-time-jupyter-notebook)

---

## Building the MCP Client

We’ll start with the thinnest part of the project, which is the MCP access layer.

This file only does one job. It connects to EODHD’s MCP server, lists available tools, calls a tool with retries and a timeout, and returns a small metadata object alongside the response. The actual thesis logic doesn't belong here. Keeping this layer small makes the rest of the project much easier to reason about later.

Create a file called <VPIcon icon="fa-brands fa-python"/>`client.py` and add this:

```py :collapsed-lines title="client.py"
import time
import asyncio

from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

class EODHDMCP:
    def __init__(self, apikey, base_url=None):
        self.apikey = apikey
        self.base_url = base_url or "https://mcp.eodhd.dev/mcp"
        self._tools = None

    def _url(self):
        return f"{self.base_url}?apikey={self.apikey}"

    def _open(self):
        return streamablehttp_client(self._url())

    async def list_tools(self):
        if self._tools is not None:
            return self._tools

        async with self._open() as (read, write, _):
            async with ClientSession(read, write) as s:
                await s.initialize()
                resp = await s.list_tools()
                self._tools = [t.name for t in resp.tools]
                return self._tools

    async def call_tool(self, name, args, trace_id, timeout_s=25, retries=2):
        last = None

        for attempt in range(retries + 1):
            t0 = time.time()
            try:
                async with self._open() as (read, write, _):
                    async with ClientSession(read, write) as s:
                        await s.initialize()
                        out = await asyncio.wait_for(s.call_tool(name, args), timeout=timeout_s)
                        dt = time.time() - t0
                        meta = {
                            "trace_id": trace_id,
                            "tool": name,
                            "args": args,
                            "latency_s": round(dt, 3),
                        }
                        return out, meta
            except Exception as e:
                last = e
                if attempt < retries:
                    await asyncio.sleep(0.5 * (attempt + 1))

        raise last
```

There are only two methods that really matter here. `list_tools()` is just a quick way to inspect and cache the tools exposed by the MCP server. `call_tool()` is the method the rest of the project will actually use. It makes the request, applies timeout and retry handling, and returns both the raw output and a small metadata object.

That metadata becomes useful later because the workflow stays traceable. When the copilot returns a memo, we still know which tool was called, with what arguments, and how long it took. So even though this file is small, it gives the rest of the system a clean and inspectable access layer.

---

## Setting Up <VPIcon icon="fa-brands fa-python"/>`core.py`

Now that the MCP client is ready, we can start building the main workflow in <VPIcon icon="fa-brands fa-python"/>`core.py`.

This file will hold the actual thesis-testing logic, so the first step is to set up the imports, API clients, a few limits, and some small helper functions that the rest of the pipeline will reuse.

Create a file called <VPIcon icon="fa-brands fa-python"/>`core.py` and start with this:

```py :collapsed-lines title="core.py"
import json
import re
import time
import uuid
import asyncio
from datetime import date, timedelta

import numpy as np
import pandas as pd
from openai import OpenAI

from client import EODHDMCP

eodhd_api_key = "your eodhd api key"
mcp_base_url = "https://mcp.eodhd.dev/mcp"

openai_api_key = "your openai api key"
model_name = "gpt-5.3-chat-latest"

max_lookback_days = 365
max_tool_calls = 10
max_tickers = 5

mcp = EODHDMCP(eodhd_api_key, base_url=mcp_base_url)
oa = OpenAI(api_key=openai_api_key)

def log_event(event, trace_id, **extra):
    payload = {
        "event": event,
        "trace_id": trace_id,
        "ts": round(time.time(), 3),
    }
    payload.update(extra)
    print(json.dumps(payload, default=str))

def get_dates_from_lookback(days):
    end = date.today()
    start = end - timedelta(days=int(days))
    return start.isoformat(), end.isoformat()

def make_state():
    return {
        "tool_calls": 0,
        "tool_trace": [],
    }

def bump_tool_call(state, meta):
    state["tool_calls"] += 1
    state["tool_trace"].append(meta)

    if state["tool_calls"] > max_tool_calls:
        raise RuntimeError("tool call budget exceeded")

def to_text(out):
    if isinstance(out, str):
        return out.strip()

    if hasattr(out, "content"):
        try:
            parts = []
            for item in out.content:
                if hasattr(item, "text") and item.text is not None:
                    parts.append(item.text)
                else:
                    parts.append(str(item))
            return "\n".join(parts).strip()
        except Exception:
            pass

    return str(out).strip()
```

::: note

Replace `“your eodhd api key”` with your actual EODHD API key. If you don’t have one, you can obtain it by opening an EODHD developer account.

:::

This block does three things:

- First, it sets up the two clients we need. `mcp` is the EODHD MCP client from <VPIcon icon="fa-brands fa-python"/>`client.py`, and `oa` is the OpenAI client that will be used for parsing and memo generation later.
- Second, it defines a few small limits for the workflow. These help keep the system controlled by capping the lookback window, the number of tickers, and the number of tool calls in a single run.
- Third, it adds helper functions that the rest of the file depends on. `log_event()` gives us lightweight tracing, `get_dates_from_lookback()` converts a lookback window into start and end dates, `make_state()` and `bump_tool_call()` help track MCP usage, and `to_text()` safely converts tool output into plain text before we parse it.

---

## Parsing a Research Prompt into a Structured Request

The first thing this copilot needs to do is clean up the input. A user isn't going to send a perfectly formatted request every time. They're more likely to write a research thought in plain English and mix the thesis, ticker, and timeframe into one prompt.

That is why the system starts by turning the raw prompt into four fields:

- ticker
- lookback window
- thesis
- mode

This logic goes into <VPIcon icon="fa-brands fa-python"/>`core.py`.

```py title="core.py"
def parse_request(text):
    prompt = f"""
You are extracting fields for a financial thesis-testing copilot.

Return only valid JSON with this exact shape:
{{
  "tickers": ["AAPL"],
  "lookback_days": 180,
  "thesis": "the actual thesis statement",
  "mode": "single"
}}

Rules:
- Extract only tickers explicitly mentioned or strongly implied.
- Do not invent tickers.
- If there are multiple tickers, mode must be "watchlist".
- If there is one ticker, mode must be "single".
- If no timeframe is mentioned, use 180.
- Convert months to days using 30 days per month.
- Convert years to days using 365 days per year.
- Keep the thesis concise but faithful to the user's intent.
- Return JSON only. No markdown. No explanation.

User request:
{text}
""".strip()

    r = oa.responses.create(
        model=model_name,
        input=[{"role": "user", "content": prompt}],
    )

    raw = r.output_text.strip()

    try:
        parsed = json.loads(raw)
    except Exception:
        raise RuntimeError(f"parser returned non-json text: {raw[:500]}")

    return parsed
```

This function gives the model one very narrow job. It's not asking for an opinion or analysis. It's only asking for structured extraction. That matters because we want flexibility at the input layer, but we don't want the whole workflow to become fuzzy.

Once the model returns that JSON, Python takes over and tightens it up.

```py title="core.py"
def enforce_limits(parsed):
    tickers = parsed.get("tickers", [])
    if not isinstance(tickers, list):
        tickers = []

    tickers = [str(x).upper().strip() for x in tickers if str(x).strip()]
    tickers = tickers[:max_tickers]

    lookback_days = parsed.get("lookback_days", 180)
    try:
        lookback_days = int(lookback_days)
    except Exception:
        lookback_days = 180

    if lookback_days < 1:
        lookback_days = 1
    if lookback_days > max_lookback_days:
        lookback_days = max_lookback_days

    thesis = str(parsed.get("thesis", "")).strip()
    if not thesis:
        thesis = "No thesis provided."

    mode = parsed.get("mode", "single")
    if len(tickers) > 1:
        mode = "watchlist"
    else:
        mode = "single"

    return {
        "tickers": tickers,
        "lookback_days": lookback_days,
        "thesis": thesis,
        "mode": mode,
    }
```

This second function is what keeps the workflow controlled. It cleans the tickers, caps how many we allow in one request, clamps the time window, and makes sure the mode matches the number of tickers. So the model gives us flexibility, while the code gives us boundaries. That combination is important for a build like this.

---

## Fetching the Two Data Sources: Historical & Fundamental Data

Once the request is parsed, the next step is to pull the data that will feed the rest of the workflow. For this version, we only use two sources from EODHD: historical prices and fundamentals. That's enough to test a surprising number of thesis types without making the build unnecessarily wide.

Add these two functions to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py :collapsed-lines title="core.py"
async def fetch_prices(ticker, start_date, end_date, trace_id, state):
    args = {
        "ticker": ticker,
        "start_date": start_date,
        "end_date": end_date,
        "period": "d",
        "order": "a",
        "fmt": "json",
    }

    out, meta = await mcp.call_tool("get_historical_stock_prices", args, trace_id)
    text = to_text(out)

    bump_tool_call(state, meta)

    if not text:
        raise RuntimeError("empty response from get_historical_stock_prices")

    try:
        data = json.loads(text)
    except Exception:
        raise RuntimeError(f"price tool returned non-json text: {text[:300]}")

    if isinstance(data, dict) and data.get("error"):
        raise RuntimeError(data["error"])

    df = pd.DataFrame(data)
    if df.empty:
        return df

    keep = [c for c in ["date", "close"] if c in df.columns]
    df = df[keep].copy()
    df["ticker"] = ticker

    return df

async def fetch_fundamentals(ticker, trace_id, state):
    args = {
        "ticker": ticker,
        "include_financials": False,
        "fmt": "json",
    }

    out, meta = await mcp.call_tool("get_fundamentals_data", args, trace_id)
    text = to_text(out)

    bump_tool_call(state, meta)

    if not text:
        raise RuntimeError("empty response from get_fundamentals_data")

    try:
        data = json.loads(text)
    except Exception:
        raise RuntimeError(f"fundamentals tool returned non-json text: {text[:300]}")

    if isinstance(data, dict) and data.get("error"):
        raise RuntimeError(data["error"])

    return data
```

- `fetch_prices()` pulls daily historical data for the requested window and reduces it to the fields we actually need right now: `date`, `close`, and the ticker itself. That trimmed DataFrame is what we'll later use for return, drawdown, volatility, trend, and other market signals.
- `fetch_fundamentals()` keeps the fundamentals payload as JSON because we'll extract different categories from it in the next sections, including margins, growth, valuation, revisions, and beta.

A couple of details matter here. Both functions run through the same MCP wrapper, so they automatically inherit the timeout, retry, and metadata handling we already built in <VPIcon icon="fa-brands fa-python"/>`client.py`. Both also call `bump_tool_call()`, which lets us track how many external calls were made during a single run. That becomes useful later when we want the workflow to stay inspectable rather than feel like a black box.

---

## Building the First Evidence Layer from Price Data

Once the price data is in, the next step is to turn that raw series into something we can actually reason with. For this copilot, price history isn't the final answer, but it is still the first evidence layer. It helps us test claims around downside control, risk, momentum, and the quality of returns.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py title="core.py"
def compute_price_signals(prices_df):
    if prices_df is None or prices_df.empty:
        return {}

    df = prices_df.copy()
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["close"] = pd.to_numeric(df["close"], errors="coerce")

    df = df.dropna(subset=["date", "close"]).sort_values("date")
    if df.empty:
        return {}

    close = df["close"]
    rets = close.pct_change().dropna()

    out = {
        "n_points": int(len(close)),
        "start_price": float(close.iloc[0]),
        "end_price": float(close.iloc[-1]),
    }

    if len(close) >= 2:
        out["ret_total"] = float(close.iloc[-1] / close.iloc[0] - 1)

    if not rets.empty:
        vol_daily = float(rets.std())
        vol_annualized = float(vol_daily * np.sqrt(252))

        out["vol_daily"] = vol_daily
        out["vol_annualized"] = vol_annualized

        if vol_annualized > 0 and "ret_total" in out:
            out["ret_to_vol"] = float(out["ret_total"] / vol_annualized)

    peak = close.cummax()
    drawdown = close / peak - 1
    out["max_drawdown"] = float(drawdown.min())

    logp = np.log(close.values)
    x = np.arange(len(logp))
    if len(logp) >= 3:
        out["trend_slope"] = float(np.polyfit(x, logp, 1)[0])
    else:
        out["trend_slope"] = 0.0

    return out
```

This function gives us a compact set of market signals from a plain close-price series. `ret_total` tells us how the stock moved over the full window. `vol_annualized` tells us how noisy that move was. `max_drawdown` is useful when the thesis talks about downside control. `trend_slope` gives us a simple directional measure, and `ret_to_vol` helps us judge return quality instead of looking at raw return alone.

The important point here is that we aren't asking the model to infer all of this from raw prices. We compute it first in Python, so the later reasoning step starts from explicit signals rather than vague interpretation. That makes the whole workflow much more stable.

---

## Building the Second Evidence Layer from Fundamentals

Price data gives us one side of the thesis. The second side comes from fundamentals. This is the part that makes the project stop sounding generic. Once the copilot starts treating fundamentals as actual evidence, instead of just company profile data, the outputs become much more useful.

Add this helper first in <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py title="core.py"
def _to_float(x):
    if x in (None, "", "NA"):
        return None
    try:
        return float(x)
    except Exception:
        return None
```

This small function just cleans values before we use them. Fundamentals payloads often contain strings, nulls, or `"NA"`, so it helps to normalize everything early.

Now add the main function:

```py :collapsed-lines title="core.py"
def compute_fundamental_signals(fundamentals):
    if not isinstance(fundamentals, dict):
        return {}

    general = fundamentals.get("General", {}) or {}
    highlights = fundamentals.get("Highlights", {}) or {}
    valuation = fundamentals.get("Valuation", {}) or {}
    technicals = fundamentals.get("Technicals", {}) or {}

    earnings = fundamentals.get("Earnings", {}) or {}
    trend = earnings.get("Trend", {}) or {}

    latest_trend = None
    if isinstance(trend, dict) and trend:
        latest_key = sorted(trend.keys())[-1]
        latest_trend = trend.get(latest_key, {}) or {}
    else:
        latest_trend = {}

    out = {
        "sector": general.get("Sector"),
        "industry": general.get("Industry"),
        "employees": _to_float(general.get("FullTimeEmployees")),

        "market_cap": _to_float(highlights.get("MarketCapitalization")),
        "pe_ratio": _to_float(highlights.get("PERatio")),
        "peg_ratio": _to_float(highlights.get("PEGRatio")),
        "profit_margin": _to_float(highlights.get("ProfitMargin")),
        "operating_margin": _to_float(highlights.get("OperatingMarginTTM")),
        "roa": _to_float(highlights.get("ReturnOnAssetsTTM")),
        "roe": _to_float(highlights.get("ReturnOnEquityTTM")),
        "revenue_ttm": _to_float(highlights.get("RevenueTTM")),
        "revenue_growth_yoy": _to_float(highlights.get("QuarterlyRevenueGrowthYOY")),
        "earnings_growth_yoy": _to_float(highlights.get("QuarterlyEarningsGrowthYOY")),
        "dividend_yield": _to_float(highlights.get("DividendYield")),

        "trailing_pe": _to_float(valuation.get("TrailingPE")),
        "forward_pe": _to_float(valuation.get("ForwardPE")),
        "price_sales": _to_float(valuation.get("PriceSalesTTM")),
        "price_book": _to_float(valuation.get("PriceBookMRQ")),
        "ev_revenue": _to_float(valuation.get("EnterpriseValueRevenue")),
        "ev_ebitda": _to_float(valuation.get("EnterpriseValueEbitda")),

        "beta": _to_float(technicals.get("Beta")),

        "earnings_estimate_growth": _to_float(latest_trend.get("earningsEstimateGrowth")),
        "revenue_estimate_growth": _to_float(latest_trend.get("revenueEstimateGrowth")),
        "eps_revisions_up_30d": _to_float(latest_trend.get("epsRevisionsUpLast30days")),
        "eps_revisions_down_30d": _to_float(latest_trend.get("epsRevisionsDownLast30days")),
    }

    if out["trailing_pe"] is not None and out["forward_pe"] is not None:
        out["forward_vs_trailing_pe_change"] = out["forward_pe"] - out["trailing_pe"]

    if out["eps_revisions_up_30d"] is not None and out["eps_revisions_down_30d"] is not None:
        out["net_eps_revisions_30d"] = out["eps_revisions_up_30d"] - out["eps_revisions_down_30d"]

    return out
```

This function pulls together the parts of the fundamentals payload that matter most for thesis testing.

- From `Highlights`, we get profitability, returns on capital, growth, and market cap. From `Valuation`, we get multiples like trailing P/E, forward P/E, price-to-sales, and EV-based ratios.
- From `Technicals`, we take beta.
- From `Earnings.Trend`, we pick up forward estimate growth and revision data.

These are the fields that let us test claims around business quality, premium justification, valuation, and forward expectations in a much more concrete way.

The last two derived fields are also useful. The gap between forward P/E and trailing P/E gives us a quick way to see whether valuation is easing or staying stretched. Net EPS revisions over the last 30 days tell us whether analyst expectations are improving or deteriorating.

---

## What Do We Have So Far?

At this point, the copilot can parse a thesis, fetch prices and fundamentals, and convert both into two reusable signal layers:

- Price signals cover return, volatility, drawdown, trend, and return quality
- Fundamentals signals cover margins, returns on capital, growth, valuation, revisions, and beta.

Next, we’ll turn those signals into what a real research workflow needs: supporting evidence, weakening evidence, what’s missing, a verdict, and the final memo.

---

## Classifying the Thesis

Before the copilot can judge a thesis, it first needs to understand what kind of claim is being made.

This matters because not every thesis should be tested the same way. A claim about controlled downside should care more about drawdown and volatility. A claim about business quality should lean more on margins, returns on capital, and growth. A claim about premium justification may need both business quality and valuation context.

So instead of jumping straight from signals to a verdict, we'll add a small classification step. This gives the system a short list of claim types to work with and a cleaner summary of the thesis.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py :collapsed-lines title="core.py"
def classify_thesis(thesis):
    prompt = f"""
You are classifying a stock thesis into a few broad claim types.

Return only valid JSON like this:
{{
  "claim_types": ["controlled_downside", "business_quality"],
  "summary": "short restatement of the thesis"
}}

Allowed claim types:
- controlled_downside
- momentum_strength
- low_risk
- high_risk
- valuation_attractive
- valuation_expensive
- business_quality
- weak_business_quality
- premium_justified
- premium_not_justified

Rules:
- pick only the claim types that are clearly relevant
- do not invent extra labels
- if nothing fits strongly, return an empty list
- summary should be short and faithful

Thesis:
{thesis}
""".strip()

    r = oa.responses.create(
        model=model_name,
        input=[{"role": "user", "content": prompt}],
    )

    raw = r.output_text.strip()

    try:
        out = json.loads(raw)
    except Exception:
        raise RuntimeError(f"thesis classifier returned non-json text: {raw[:500]}")

    claim_types = out.get("claim_types", [])
    if not isinstance(claim_types, list):
        claim_types = []

    clean = []
    allowed = {
        "controlled_downside",
        "momentum_strength",
        "low_risk",
        "high_risk",
        "valuation_attractive",
        "valuation_expensive",
        "business_quality",
        "weak_business_quality",
        "premium_justified",
        "premium_not_justified",
    }

    for x in claim_types:
        x = str(x).strip()
        if x in allowed and x not in clean:
            clean.append(x)

    return {
        "claim_types": clean,
        "summary": str(out.get("summary", "")).strip(),
    }
```

This function keeps the model’s job narrow. It's not being asked to decide whether the thesis is right or wrong. It's only being asked to identify the kind of thesis it's dealing with. That makes the next step much cleaner, because the evidence engine no longer has to treat every prompt the same way.

The validation at the bottom is important too. Even though the model returns the labels, Python still filters them through an allowed set and removes anything unexpected. That keeps this step flexible, but still controlled.

---

## Turning Signals into Support, Contradiction, and Missing Evidence

This is the step where the copilot actually starts reasoning.

Up to this point, we have three things in hand. We have the thesis, we have the claim types, and we have the signal layers built from price data and fundamentals. But none of that is useful on its own unless the system can turn it into a clear argument.

That means it needs to answer three questions for every thesis:

- What in the data supports this claim?
- What in the data weakens it?
- What is still missing before we can judge it properly?

That's exactly what `build_evidence_blocks()` does. It takes the classified thesis, checks the relevant price and fundamentals signals, and sorts them into three buckets: support, contradiction, and missing evidence.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py :collapsed-lines title="core.py"
def build_evidence_blocks(thesis, thesis_tags, price_signals, fundamental_signals):
    evidence_for = []
    evidence_against = []
    missing_evidence = []

    ret_total = price_signals.get("ret_total")
    vol = price_signals.get("vol_annualized")
    dd = price_signals.get("max_drawdown")
    trend = price_signals.get("trend_slope")
    ret_to_vol = price_signals.get("ret_to_vol")

    pe = fundamental_signals.get("pe_ratio") or fundamental_signals.get("trailing_pe")
    forward_pe = fundamental_signals.get("forward_pe")
    beta = fundamental_signals.get("beta")

    profit_margin = fundamental_signals.get("profit_margin")
    operating_margin = fundamental_signals.get("operating_margin")
    roa = fundamental_signals.get("roa")
    roe = fundamental_signals.get("roe")
    revenue_growth = fundamental_signals.get("revenue_growth_yoy")
    earnings_growth = fundamental_signals.get("earnings_growth_yoy")
    earnings_estimate_growth = fundamental_signals.get("earnings_estimate_growth")
    revenue_estimate_growth = fundamental_signals.get("revenue_estimate_growth")
    net_eps_revisions = fundamental_signals.get("net_eps_revisions_30d")

    claim_types = thesis_tags.get("claim_types", [])

    if "controlled_downside" in claim_types:
        if dd is not None:
            if dd > -0.15:
                evidence_for.append(f"Maximum drawdown was relatively contained at {dd:.2%}.")
            else:
                evidence_against.append(f"Maximum drawdown reached {dd:.2%}, which weakens the controlled-downside claim.")
        else:
            missing_evidence.append("No drawdown signal available to test downside control.")

    if "momentum_strength" in claim_types:
        if trend is not None and ret_total is not None:
            if trend > 0 and ret_total > 0:
                evidence_for.append(f"Trend was positive and total return over the window was {ret_total:.2%}.")
            else:
                evidence_against.append("Trend and total return do not strongly support a momentum-strength view.")
        else:
            missing_evidence.append("No usable trend or return signal available to test momentum.")

    if "low_risk" in claim_types:
        if vol is not None:
            if vol < 0.30:
                evidence_for.append(f"Annualized volatility was {vol:.2%}, which supports a lower-risk view.")
            else:
                evidence_against.append(f"Annualized volatility was {vol:.2%}, which weakens a low-risk thesis.")
        else:
            missing_evidence.append("No volatility signal available to test risk.")

    if "high_risk" in claim_types:
        if vol is not None:
            if vol >= 0.30:
                evidence_for.append(f"Annualized volatility was {vol:.2%}, which supports a higher-risk view.")
            else:
                evidence_against.append(f"Annualized volatility was only {vol:.2%}, which does not strongly support a high-risk thesis.")
        else:
            missing_evidence.append("No volatility signal available to test risk.")

    if "valuation_attractive" in claim_types:
        if pe is not None:
            if pe < 20:
                evidence_for.append(f"P/E is {pe:.2f}, which supports a more attractive valuation view.")
            elif pe > 30:
                evidence_against.append(f"P/E is {pe:.2f}, which weakens the attractive-valuation claim.")
        else:
            missing_evidence.append("No P/E metric available to test valuation attractiveness.")

        if forward_pe is not None and pe is not None:
            if forward_pe < pe:
                evidence_for.append(f"Forward P/E ({forward_pe:.2f}) is below trailing P/E ({pe:.2f}), which can support an improving earnings setup.")

    if "valuation_expensive" in claim_types or "premium_not_justified" in claim_types:
        if pe is not None:
            if pe > 30:
                evidence_for.append(f"P/E is {pe:.2f}, which supports an expensive-valuation view.")
            else:
                evidence_against.append(f"P/E is {pe:.2f}, which does not strongly support an expensive-valuation claim.")
        else:
            missing_evidence.append("No P/E metric available to test whether valuation looks expensive.")

    if "business_quality" in claim_types or "premium_justified" in claim_types:
        quality_hits = 0

        if operating_margin is not None:
            if operating_margin >= 0.25:
                evidence_for.append(f"Operating margin is {operating_margin:.2%}, which supports strong business quality.")
                quality_hits += 1
            else:
                evidence_against.append(f"Operating margin is {operating_margin:.2%}, which is not especially strong for a quality claim.")

        if profit_margin is not None:
            if profit_margin >= 0.20:
                evidence_for.append(f"Profit margin is {profit_margin:.2%}, which supports business quality.")
                quality_hits += 1
            else:
                evidence_against.append(f"Profit margin is {profit_margin:.2%}, which weakens a strong-quality thesis.")

        if roa is not None:
            if roa >= 0.10:
                evidence_for.append(f"ROA is {roa:.2%}, which supports efficient asset use.")
                quality_hits += 1
            else:
                evidence_against.append(f"ROA is {roa:.2%}, which does not strongly support a quality claim.")

        if roe is not None:
            if roe >= 0.20:
                evidence_for.append(f"ROE is {roe:.2%}, which supports strong capital efficiency.")
                quality_hits += 1
            else:
                evidence_against.append(f"ROE is {roe:.2%}, which is weaker than expected for a strong-quality thesis.")

        if revenue_growth is not None:
            if revenue_growth > 0:
                evidence_for.append(f"Quarterly revenue growth was {revenue_growth:.2%} YoY, which supports business momentum.")
                quality_hits += 1
            else:
                evidence_against.append(f"Quarterly revenue growth was {revenue_growth:.2%} YoY, which weakens the quality claim.")

        if earnings_growth is not None:
            if earnings_growth > 0:
                evidence_for.append(f"Quarterly earnings growth was {earnings_growth:.2%} YoY, which supports operating strength.")
                quality_hits += 1
            else:
                evidence_against.append(f"Quarterly earnings growth was {earnings_growth:.2%} YoY, which weakens the quality claim.")

        if earnings_estimate_growth is not None:
            if earnings_estimate_growth > 0:
                evidence_for.append(f"Forward earnings estimate growth is {earnings_estimate_growth:.2%}, which supports a healthier forward outlook.")
            else:
                evidence_against.append(f"Forward earnings estimate growth is {earnings_estimate_growth:.2%}, which weakens the quality argument.")

        if revenue_estimate_growth is not None:
            if revenue_estimate_growth > 0:
                evidence_for.append(f"Forward revenue estimate growth is {revenue_estimate_growth:.2%}, which supports ongoing business strength.")
            else:
                evidence_against.append(f"Forward revenue estimate growth is {revenue_estimate_growth:.2%}, which weakens the quality argument.")

        if net_eps_revisions is not None:
            if net_eps_revisions > 0:
                evidence_for.append(f"Net EPS revisions over the last 30 days are positive ({net_eps_revisions:.0f}), which supports improving expectations.")
            elif net_eps_revisions < 0:
                evidence_against.append(f"Net EPS revisions over the last 30 days are negative ({net_eps_revisions:.0f}), which weakens the thesis.")

        if quality_hits == 0:
            missing_evidence.append("This version could not extract enough direct business-quality metrics to test the quality claim.")

    if "weak_business_quality" in claim_types:
        if operating_margin is not None and operating_margin < 0.15:
            evidence_for.append(f"Operating margin is only {operating_margin:.2%}, which supports a weaker-quality view.")
        if profit_margin is not None and profit_margin < 0.10:
            evidence_for.append(f"Profit margin is only {profit_margin:.2%}, which supports a weaker-quality view.")
        if revenue_growth is not None and revenue_growth <= 0:
            evidence_for.append(f"Revenue growth is {revenue_growth:.2%} YoY, which supports a weaker-quality view.")
        if earnings_growth is not None and earnings_growth <= 0:
            evidence_for.append(f"Earnings growth is {earnings_growth:.2%} YoY, which supports a weaker-quality view.")

    if beta is not None:
        if beta > 1.2:
            evidence_against.append(f"Beta is {beta:.2f}, which suggests above-market sensitivity.")
        elif beta < 0.9:
            evidence_for.append(f"Beta is {beta:.2f}, which suggests below-market sensitivity.")
    else:
        missing_evidence.append("No beta value available.")

    if ret_to_vol is None:
        missing_evidence.append("No return-to-volatility signal available.")

    if not evidence_for and not evidence_against:
        missing_evidence.append("The current data is not enough to strongly support or reject the thesis.")

    return {
        "thesis": thesis,
        "thesis_summary": thesis_tags.get("summary", ""),
        "claim_types": claim_types,
        "evidence_for": evidence_for,
        "evidence_against": evidence_against,
        "missing_evidence": list(dict.fromkeys(missing_evidence)),
    }
```

The function looks long, but the logic is simple once you break it down.

It starts by pulling the signals it needs from the two evidence layers that we built earlier. Then it checks the thesis tags one by one. If the thesis is about controlled downside, it looks at drawdown. If it's about risk, it looks at volatility and beta. If't is about business quality, it leans on margins, returns on capital, growth, and revisions. If it's about valuation, it checks multiples like P/E and the relationship between forward and trailing valuation.

That's the key shift in this project. The copilot is no longer just collecting data. It's deciding which parts of the EODHD-backed signal set actually matter for the thesis in front of it.

The three output buckets are what make this useful.

- `evidence_for` holds the points that support the claim.
- `evidence_against` holds the points that weaken it.
- `missing_evidence` makes the gaps explicit instead of letting the system sound more confident than it should.

That's what makes this feel like a thesis-testing workflow rather than a polished stock summary.

::: info Sanity Check (Jupyter Notebook)

Run this code inside <VPIcon icon="iconfont icon-jupyter"/>`test.ipynb` for a quick sanity check:

```py title="test.ipynb"
import uuid
from core import (
    fetch_prices,
    fetch_fundamentals,
    compute_price_signals,
    classify_thesis,
    build_evidence_blocks,
    make_state
)
import json

trace_id = uuid.uuid4().hex[:10]
state = make_state()

thesis = "Apple looks attractive because downside has been controlled and business quality remains high."

prices = await fetch_prices("AAPL.US", "2026-01-01", "2026-04-01", trace_id, state)
funds = await fetch_fundamentals("AAPL.US", trace_id, state)

signals = compute_price_signals(prices)
tags = classify_thesis(thesis)
evidence = build_evidence_blocks(thesis, tags, signals, funds)

print(tags)
print(json.dumps(evidence, indent=2))
```

**Expected Output:**

![Sanity check expected output](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/38ec0e04-b237-4ebb-8b26-61e2f82f36b0.png)

:::

---

## Assigning a Verdict

Once the evidence is structured, the copilot still needs one more layer before it can write a memo. It needs a controlled way to label the thesis.

That's the job of `decide_verdict()`. It looks at how much evidence supports the thesis, how much weakens it, and whether the claim still depends on missing business-quality or valuation evidence. The goal here isn't to create a perfect scoring model. It's to make sure the system doesn't jump from a few evidence strings straight into a confident conclusion.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py :collapsed-lines title="core.py"
def decide_verdict(evidence, claim_types=None):
    claim_types = claim_types or []

    evidence_for = evidence.get("evidence_for", [])
    evidence_against = evidence.get("evidence_against", [])
    missing = evidence.get("missing_evidence", [])

    n_for = len(evidence_for)
    n_against = len(evidence_against)
    n_missing = len(missing)

    quality_claim = any(x in claim_types for x in ["business_quality", "weak_business_quality", "premium_justified", "premium_not_justified"])
    valuation_claim = any(x in claim_types for x in ["valuation_attractive", "valuation_expensive", "premium_justified", "premium_not_justified"])

    if n_for == 0 and n_against == 0:
        return {
            "verdict": "unresolved_due_to_missing_evidence",
            "reason": "There is not enough usable evidence to test the thesis.",
        }

    if quality_claim and n_missing >= 1:
        if n_against > 0:
            return {
                "verdict": "weakly_supported",
                "reason": "Some evidence supports the thesis, but direct business-quality evidence is missing and contradictory signals remain.",
            }
        return {
            "verdict": "partially_supported",
            "reason": "Part of the thesis is supported, but direct business-quality evidence is missing.",
        }

    if valuation_claim and n_missing >= 1:
        return {
            "verdict": "unresolved_due_to_missing_evidence",
            "reason": "The thesis depends on valuation evidence that is not available in this version.",
        }

    if n_for > 0 and n_against == 0:
        if n_missing >= 2:
            return {
                "verdict": "partially_supported",
                "reason": "The available evidence supports the thesis, but important evidence is still missing.",
            }
        return {
            "verdict": "supported",
            "reason": "The available evidence mainly supports the thesis.",
        }

    if n_against > 0 and n_for == 0:
        return {
            "verdict": "not_supported",
            "reason": "The available evidence mainly weakens the thesis.",
        }

    if n_for > n_against:
        return {
            "verdict": "partially_supported",
            "reason": "There is more supporting evidence than contradicting evidence, but the thesis is not fully confirmed.",
        }

    if n_against >= n_for:
        return {
            "verdict": "weakly_supported",
            "reason": "Contradicting evidence is meaningful enough that the thesis is only weakly supported.",
        }

    return {
        "verdict": "unresolved_due_to_missing_evidence",
        "reason": "The evidence is mixed and does not clearly resolve the thesis.",
    }
```

The logic here is intentionally simple. It doesn't try to do fine-grained scoring. Instead, it uses the shape of the evidence to decide whether the thesis is supported, partially supported, weakly supported, not supported, or still unresolved.

A couple of checks matter more than the rest. If the thesis depends on business-quality or valuation evidence and that evidence is still missing, the verdict gets capped early instead of sounding stronger than it should. That is important because a thesis can look convincing on price behavior alone, but still be incomplete if the claim depends on fundamentals that aren't actually present.

The other useful thing about this function is that it returns both a short label and a reason. That makes the final output easier to understand later, and it also gives the memo-writing step something cleaner to work from than a bare category.

---

## Building the Facts Object

Before the memo gets written, the system first puts everything into one structured object. That object becomes the single source of truth for the final output. Instead of handing the model a mix of scattered variables, we'll give it one clean package containing the thesis, signals, company context, evidence, and verdict.

### 1. Company Context

We’ll start with a small helper that pulls the basic company context from the fundamentals payload.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py title="core.py"
def extract_company_context(fundamentals):
    if not isinstance(fundamentals, dict):
        return {}

    gen = fundamentals.get("General", {}) or {}

    out = {
        "name": gen.get("Name"),
        "code": gen.get("Code"),
        "exchange": gen.get("Exchange"),
        "sector": gen.get("Sector"),
        "industry": gen.get("Industry"),
        "country": gen.get("CountryName"),
        "market_cap": gen.get("MarketCapitalization"),
        "pe_ratio": gen.get("PERatio"),
        "beta": gen.get("Beta"),
        "dividend_yield": gen.get("DividendYield"),
        "description": gen.get("Description"),
    }

    clean = {}
    for k, v in out.items():
        if v not in (None, "", "NA"):
            clean[k] = v

    return clean
```

This function is just a cleanup step. It gives us a compact company context block that can later sit alongside the price and fundamentals signals without dragging the full fundamentals payload into the memo layer.

### 2. Single-Stock Facts Builder

Now add the single-stock facts builder:

```py title="core.py"
def build_thesis_facts(parsed, ticker, signals, fundamentals, thesis_tags, evidence):
    company = extract_company_context(fundamentals)

    facts = {
        "type": "single_name_thesis_test",
        "ticker": ticker,
        "lookback_days": parsed["lookback_days"],
        "thesis": parsed["thesis"],
        "thesis_summary": thesis_tags.get("summary", ""),
        "claim_types": thesis_tags.get("claim_types", []),
        "market_signals": {
            "ret_total": signals.get("ret_total"),
            "vol_annualized": signals.get("vol_annualized"),
            "max_drawdown": signals.get("max_drawdown"),
            "trend_slope": signals.get("trend_slope"),
            "ret_to_vol": signals.get("ret_to_vol"),
            "start_price": signals.get("start_price"),
            "end_price": signals.get("end_price"),
            "n_points": signals.get("n_points"),
        },
        "company_context": {
            "name": company.get("name"),
            "exchange": company.get("exchange"),
            "sector": company.get("sector"),
            "industry": company.get("industry"),
            "country": company.get("country"),
            "market_cap": company.get("market_cap"),
            "pe_ratio": company.get("pe_ratio"),
            "beta": company.get("beta"),
            "dividend_yield": company.get("dividend_yield"),
        },
        "description": company.get("description"),
        "evidence_for": evidence.get("evidence_for", []),
        "evidence_against": evidence.get("evidence_against", []),
        "missing_evidence": evidence.get("missing_evidence", []),
    }

    facts["verdict"] = decide_verdict(evidence, thesis_tags.get("claim_types", []))
    return facts
```

This is the main facts object for a single-stock thesis. It pulls together the parsed thesis, the market signals, the basic company context, the evidence buckets, and the verdict. At this point, the copilot has already done the reasoning work. The memo isn't deciding anything new. It's just writing from this object.

### 3. Watchlist Facts Builder

Now add the watchlist version:

```py title="core.py"
def build_watchlist_facts(parsed, tickers, signals_by_ticker, fundamentals_by_ticker, thesis_tags, evidence_by_ticker):
    per_ticker = {}

    for t in tickers:
        company = extract_company_context(fundamentals_by_ticker.get(t, {}))
        signals = signals_by_ticker.get(t, {})
        evidence = evidence_by_ticker.get(t, {})

        per_ticker[t] = {
            "company_context": {
                "name": company.get("name"),
                "sector": company.get("sector"),
                "industry": company.get("industry"),
                "market_cap": company.get("market_cap"),
                "pe_ratio": company.get("pe_ratio"),
                "beta": company.get("beta"),
            },
            "market_signals": {
                "ret_total": signals.get("ret_total"),
                "vol_annualized": signals.get("vol_annualized"),
                "max_drawdown": signals.get("max_drawdown"),
                "trend_slope": signals.get("trend_slope"),
                "ret_to_vol": signals.get("ret_to_vol"),
            },
            "evidence_for": evidence.get("evidence_for", []),
            "evidence_against": evidence.get("evidence_against", []),
            "missing_evidence": evidence.get("missing_evidence", []),
            "verdict": decide_verdict(evidence, thesis_tags.get("claim_types", []))
        }

    facts = {
        "type": "watchlist_thesis_test",
        "tickers": tickers,
        "lookback_days": parsed["lookback_days"],
        "thesis": parsed["thesis"],
        "thesis_summary": thesis_tags.get("summary", ""),
        "claim_types": thesis_tags.get("claim_types", []),
        "per_ticker": per_ticker,
    }

    return facts
```

This version does the same thing, but across multiple tickers. Instead of one top-level evidence block, it stores a per-ticker structure so the memo layer can later compare names without needing to reconstruct anything.

That is the main reason this section matters. By the time we reach the memo step, we no longer want to pass loose values around. We want one structured object that already contains:

- the thesis
- the relevant signals
- the company context
- the evidence buckets
- the verdict

That keeps the final writing step much cleaner and makes the whole workflow easier to debug.

::: info Sanity Check (Jupyter Notebook)

Run this code inside <VPIcon icon="iconfont icon-jupyter"/>`test.ipynb` for a quick sanity check:

```py title="test.ipynb"
from core import build_thesis_facts, extract_company_context

facts = build_thesis_facts(
    parsed={
        "tickers": ["AAPL"],
        "lookback_days": 180,
        "thesis": "Apple looks attractive because downside has been controlled and business quality remains high.",
        "mode": "single"
    },
    ticker="AAPL.US",
    signals=signals,
    fundamentals=funds,
    thesis_tags=tags,
    evidence=evidence
)

print(json.dumps(facts, indent=2))
```

**Expected Output:**

```json :collapsed-lines
{
  "type": "single_name_thesis_test",
  "ticker": "AAPL.US",
  "lookback_days": 180,
  "thesis": "Apple looks attractive because downside has been controlled and business quality remains high.",
  "thesis_summary": "Apple is attractive due to controlled downside and strong business quality",
  "claim_types": [
    "controlled_downside",
    "business_quality"
  ],
  "market_signals": {
    "ret_total": -0.05675067340688533,
    "vol_annualized": 0.2504818805125429,
    "max_drawdown": -0.11322450740687473,
    "trend_slope": -0.0005437843809243782,
    "ret_to_vol": -0.22656598270006817,
    "start_price": 271.01,
    "end_price": 255.63,
    "n_points": 62
  },
  "company_context": {
    "name": "Apple Inc",
    "exchange": "NASDAQ",
    "sector": "Technology",
    "industry": "Consumer Electronics",
    "country": "USA",
    "market_cap": null,
    "pe_ratio": null,
    "beta": null,
    "dividend_yield": null
  },
  "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple Vision Pro, Apple TV, Apple Watch, Beats products, and HomePod, as well as Apple branded and third-party accessories. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts, as well as advertising services include third-party licensing arrangements and its own advertising platforms. In addition, the company offers various subscription-based services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV, which offers exclusive original content and live sports; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers and resellers. The company was formerly known as Apple Computer, Inc. and changed its name to Apple Inc. in January 2007. Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.",
  "evidence_for": [
    "Maximum drawdown was relatively contained at -11.32%."
  ],
  "evidence_against": [],
  "missing_evidence": [
    "This version does not include direct business-quality metrics such as margins, growth, cash flow, or return on capital.",
    "Only basic company context is available, which is not enough on its own to confirm business quality.",
    "No beta value available."
  ],
  "verdict": {
    "verdict": "partially_supported",
    "reason": "Part of the thesis is supported, but direct business-quality evidence is missing."
  }
}
```

:::

---

## Writing the Final Memo

At this point, the hard part is already done.

By the time we reach the memo step, the copilot already has a structured facts object with the thesis, claim types, market signals, company context, evidence buckets, and verdict. So this final function isn't where the reasoning happens. It's just the presentation layer that turns that structured judgment into something readable.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py title="core.py"
def write_thesis_memo(facts):
    prompt = f"""
You are writing a short financial research memo.

Write using only the facts provided below.
Do not invent numbers, events, comparisons, or opinions beyond the supplied evidence.
If evidence is missing, say so clearly.

Use this exact structure:

1. Thesis under review
2. Supporting evidence
3. Evidence that weakens the thesis
4. Missing evidence
5. Verdict
6. Bottom-line assessment

Style rules:
- Keep it concise
- Keep it analytical and professional
- No bullet points unless necessary
- No hype
- No generic investment disclaimer language
- The bottom-line assessment should be balanced and evidence-based
- The verdict section must explicitly use the supplied verdict

Facts:
{json.dumps(facts, indent=2, default=str)}
""".strip()

    r = oa.responses.create(
        model=model_name,
        input=[{"role": "user", "content": prompt}],
    )

    return r.output_text.strip()
```

This function keeps the model boxed into one narrow task. It's not being asked to look at raw price history, raw fundamentals, or scattered variables. It's being asked to write from one clean facts object that already contains the judgment.

That separation matters because it keeps the final memo grounded. The model isn't deciding what it thinks about the stock at the last second. It's simply turning the structured output of the earlier steps into a short research note.

The prompt is also deliberately strict. It fixes the memo structure, tells the model not to invent anything, and makes the verdict explicit instead of leaving it implied. That helps the final output stay consistent even when the underlying thesis changes.

::: info Sanity Check (Jupyter Notebook)

You can test it with a facts object from the previous section:

```py
from core import write_thesis_memo

memo = write_thesis_memo(facts)
print(memo)
```

**Expected Output:**

![Sanity check expected output](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/b5f44144-8da4-4c9a-8a59-c5ac6915a6b0.png)

:::

---

## Stitching Everything Together

At this point, all the individual pieces are ready. We have the parser, the data fetchers, the signal builders, the thesis classifier, the evidence engine, the verdict layer, and the memo writer. The only thing left is to connect them into one end-to-end function.

Add this to <VPIcon icon="fa-brands fa-python"/>`core.py`:

```py :collapsed-lines title="core.py"
async def run_thesis_copilot(user_text):
    trace_id = uuid.uuid4().hex[:10]
    log_event("request_started", trace_id, text=user_text)

    parsed = enforce_limits(parse_request(user_text))
    tickers = parsed["tickers"]

    if not tickers:
        return {
            "memo": "No valid ticker was found in the request.",
            "facts": {},
            "data_used": {},
            "tool_trace_id": trace_id,
        }

    log_event(
        "parsed",
        trace_id,
        tickers=tickers,
        lookback_days=parsed["lookback_days"],
        mode=parsed["mode"],
        thesis=parsed["thesis"],
    )

    start_date, end_date = get_dates_from_lookback(parsed["lookback_days"])
    state = make_state()

    try:
        thesis_tags = classify_thesis(parsed["thesis"])

        if parsed["mode"] == "single":
            ticker = tickers[0]
            ticker_full = ticker if "." in ticker else f"{ticker}.US"

            log_event(
                "tool_phase",
                trace_id,
                mode="single",
                ticker=ticker_full,
                start_date=start_date,
                end_date=end_date,
            )

            prices = await fetch_prices(ticker_full, start_date, end_date, trace_id, state)
            funds = await fetch_fundamentals(ticker_full, trace_id, state)

            price_signals = compute_price_signals(prices)
            fundamental_signals = compute_fundamental_signals(funds)

            evidence = build_evidence_blocks(
                parsed["thesis"],
                thesis_tags,
                price_signals,
                fundamental_signals
            )

            facts = build_thesis_facts(
                parsed,
                ticker_full,
                price_signals,
                funds,
                thesis_tags,
                evidence
            )

            facts["fundamental_signals"] = fundamental_signals

            memo = write_thesis_memo(facts)

            out = {
                "memo": memo,
                "facts": facts,
                "data_used": {
                    "tickers": [ticker_full],
                    "date_range": [start_date, end_date],
                    "tools_called": [x.get("tool") for x in state["tool_trace"]],
                    "tool_calls": state["tool_calls"],
                },
                "tool_trace_id": trace_id,
            }

            log_event("request_finished", trace_id, tool_calls=state["tool_calls"])
            return out

        ticker_full = [x if "." in x else f"{x}.US" for x in tickers]

        log_event(
            "tool_phase",
            trace_id,
            mode="watchlist",
            tickers=ticker_full,
            start_date=start_date,
            end_date=end_date,
        )

        signals_by_ticker = {}
        funds_by_ticker = {}
        evidence_by_ticker = {}

        for t in ticker_full:
            prices = await fetch_prices(t, start_date, end_date, trace_id, state)
            funds = await fetch_fundamentals(t, trace_id, state)

            price_signals = compute_price_signals(prices)
            fundamental_signals = compute_fundamental_signals(funds)

            evidence = build_evidence_blocks(
                parsed["thesis"],
                thesis_tags,
                price_signals,
                fundamental_signals
            )

            signals_by_ticker[t] = {
                **price_signals,
                "fundamental_signals": fundamental_signals
            }
            funds_by_ticker[t] = funds
            evidence_by_ticker[t] = evidence

        facts = build_watchlist_facts(
            parsed,
            ticker_full,
            signals_by_ticker,
            funds_by_ticker,
            thesis_tags,
            evidence_by_ticker,
        )

        memo = write_thesis_memo(facts)

        out = {
            "memo": memo,
            "facts": facts,
            "data_used": {
                "tickers": ticker_full,
                "date_range": [start_date, end_date],
                "tools_called": [x.get("tool") for x in state["tool_trace"]],
                "tool_calls": state["tool_calls"],
            },
            "tool_trace_id": trace_id,
        }

        log_event("request_finished", trace_id, tool_calls=state["tool_calls"])
        return out

    except Exception as e:
        detail = repr(e)
        if hasattr(e, "exceptions"):
            detail = detail + " | " + " ; ".join([repr(x) for x in e.exceptions])

        log_event("request_failed", trace_id, err=detail)

        return {
            "memo": f"failed: {e}",
            "facts": {},
            "data_used": {
                "tickers": tickers,
                "date_range": [start_date, end_date],
                "tools_called": [x.get("tool") for x in state["tool_trace"]],
                "tool_calls": state["tool_calls"],
            },
            "tool_trace_id": trace_id,
        }
```

This function is just the full workflow in one place. It parses the request, fetches the data, computes the two signal layers, builds the evidence, assembles the facts object, writes the memo, and returns everything in a clean output.

The useful part is that it returns more than just the memo. It also returns the structured facts object, the tools that were used, the date range, and the trace ID. That keeps the final result inspectable instead of turning the copilot into a black box.

---

## Demo Time! (Jupyter Notebook)

### Demo 1: Testing Whether a Premium Is Actually Justified

This is a good first demo because it pushes the copilot beyond a basic single-stock check. The prompt isn't asking whether NVIDIA is a good company in general. It's asking whether NVIDIA’s premium over AMD can actually be defended using market behavior and business quality.

Here's the prompt:

```py
from core import run_thesis_copilot

q = """
Between NVDA and AMD, I think NVDA's premium is still justified by stronger market behavior and business quality.
Check that over the last 6 months.
""".strip()

result = await run_thesis_copilot(q)

print(result["memo"])
print(result["data_used"])
```

And here's the output:

![Demo 1 output](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/e4a9e881-243a-47bb-b36b-1e273deb8e04.png)

What makes this output useful is that it doesn't flatten the result into a simple yes or no. NVIDIA clearly looks stronger on business quality, but market behavior isn't as convincing, and the lack of direct valuation data stops the copilot from overclaiming.

This is the kind of behavior we want. The system isn't just comparing two companies. It's testing whether the specific claim about a premium actually holds up.

### Demo 2: Testing Whether Volatility Is Too High for the Underlying Business

The second demo shifts back to a single-stock thesis, but the claim is different. This time, the question isn't whether the company looks attractive. It's whether the stock is more volatile than the underlying business quality would justify.

Here's the prompt:

```py
q = """
TSLA feels too volatile for the underlying business quality.
Test that thesis over the last year.
""".strip()

result = await run_thesis_copilot(q)

print(result["memo"])
print(result["data_used"])
```

And here's the output:

![Demo 2 output](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/a9767ee9-d227-4478-a2aa-9ee62c46488c.png)

This result is useful because it shows a more conflicted thesis. Tesla’s recent returns and forward growth expectations offer some support, but the current profitability, recent operating trends, revisions, and volatility profile all push back against the idea that the business quality is strong enough to fully justify that risk.

So the final verdict lands where it should: not as a clean confirmation, but as a weakly supported thesis.

---

## Final Thoughts

At this point, the copilot already does the most important part well. It can take a natural-language thesis, pull the right market and fundamentals data through EODHD’s MCP layer, turn those inputs into structured evidence, and return a research memo that's much more disciplined than a normal stock summary.

At the same time, this version still has clear limits. It doesn't yet go deeper into statement-level accounting logic, it doesn't use news or catalyst context, and its handling of relative valuation can still be stronger for more demanding comparison cases.

But even with those limits, the shift here is already meaningful. The real change wasn't just connecting a model to financial data. It was moving from summarizing stocks to testing claims.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Market Research Copilot with MCP and Python [Full Handbook]",
  "desc": "Most financial AI tools are good at one thing: summarizing a stock. You ask about Apple, NVIDIA, or Tesla, and they give you a clean overview of price action, a few ratios, and maybe some company cont",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-market-research-copilot-with-mcp-and-python-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
