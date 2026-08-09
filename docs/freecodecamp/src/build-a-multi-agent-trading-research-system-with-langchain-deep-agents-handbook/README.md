---
lang: en-US
title: "How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]"
description: "Article(s) > How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - AI
  - LLM
  - LangChain
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]"
    - property: og:description
      content: "How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multi-agent-trading-research-system-with-langchain-deep-agents-handbook.html
prev: /programming/py-pandas/articles/README.md
date: 2026-08-15
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0e9a966-883b-463b-b560-09f3b4c57880.png
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
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]"
  desc="A trading research agent can write strategy code, run a backtest, inspect the results, and keep revising the strategy. The harder problem is making sure that this loop doesn't turn into an uncontrolle"
  url="https://freecodecamp.org/news/build-a-multi-agent-trading-research-system-with-langchain-deep-agents-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0e9a966-883b-463b-b560-09f3b4c57880.png"/>

A trading research agent can write strategy code, run a backtest, inspect the results, and keep revising the strategy. The harder problem is making sure that this loop doesn't turn into an uncontrolled search for an attractive backtest.

In this handbook, we’ll build a multi-agent trading research system with LangChain Deep Agents. EODHD will provide the historical market data, while a deterministic Python layer will control the data splits, backtesting logic, benchmarks, experiment history, and strategy selection rules. A coordinator, strategy engineer, and research critic will then work inside those boundaries to develop and evaluate three strategy versions.

The goal isn't to prove that AI agents can reliably discover profitable strategies. It's to build a research workflow where agents can generate and challenge ideas without being allowed to control the evidence used to judge them.

---

## Table of Contents

- [Build a Deterministic Strategy Evaluation Layer](#heading-build-a-deterministic-strategy-evaluation-layer)
- [Create the Experiment and Decision Layer](#heading-create-the-experiment-and-decision-layer)
- [Establish the Manual Baseline](#heading-establish-the-manual-baseline)
- [Configure the Deep Agents Research Team](#heading-configure-the-deep-agents-research-team)
- [Reproduce the Manual Baseline as v1](#heading-reproduce-the-manual-baseline-as-v1)
- [Let the Agents Revise the Strategy](#heading-let-the-agents-revise-the-strategy)
- [Freeze the Champion and Unlock the Holdout](#heading-freeze-the-champion-and-unlock-the-holdout)
- [Audit the Complete Research Trail](#heading-audit-the-complete-research-trail)

::: note Prerequisites

Before starting, make sure you have:

- Python 3.11 or later
- A basic understanding of Python, pandas, and quantitative backtesting
- An [<VPIcon icon="fas fa-globe"/>EODHD API key](https://eodhd.com/) for historical market data
- An OpenAI API key for the Deep Agents models
- A LangSmith API key if you want tracing enabled
- The required Python packages installed, including `pandas`, `numpy`, `matplotlib`, `requests`, `python-dotenv`, `langchain`, `langgraph`, and `deepagents`

You should also be comfortable working with environment variables and running Python code that creates local files and subprocesses.

---

## Design the Research Workflow

Before writing any agent code, we need to decide what the agents are actually allowed to control. The complete workflow will look like this:

![Research Workflow](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/885613b8-d023-4945-a3ae-8a97de87f4f1.png)

The version flow is deliberately sequential. `v1` is implemented and tested first, then reviewed by the research critic and recorded as the initial champion. Only after those three steps are complete can `v2` begin. The same cycle repeats for `v2`: the engineer implements and tests the revision, the critic reviews the evidence, and the coordinator applies the selection rule before `v3` is allowed to start.

After `v3` is tested and reviewed, the coordinator makes the final selection and writes the surviving strategy and parameters as the frozen champion. Only then is the holdout data unlocked for one final evaluation. The strategy cannot be revised after that result is known, and the workflow ends with a post-freeze audit of the complete research trail.

---

## Set Up the Python Research Environment

We’ll start by importing the packages used across the complete workflow. The deterministic research layer relies mainly on pandas and NumPy for calculations, `requests` for [<VPIcon icon="fas fa-globe"/>EODHD data](https://eodhd.com/), Matplotlib for charts, and Python’s filesystem and subprocess utilities for storing research artifacts and running generated strategy code separately.

```py
import os, json, time, shutil, tempfile, subprocess, sys, traceback
import importlib.util
from pathlib import Path
import requests, numpy as np, pandas as pd
import matplotlib.pyplot as plt
from dotenv import load_dotenv
from IPython.display import Markdown, display
import getpass
```

The build uses three credentials: EODHD for historical market data, OpenAI for the agent models, and LangSmith tracing for inspecting the workflow during development. I’ll load them from a <VPIcon icon="iconfont icon-dotenv"/>`.env` file and keep them in environment variables rather than placing credentials directly in the code.

At the same time, I’ll separate the files available to the research agents from anything that should remain outside their reach. `workspace` will contain the development and validation data, strategy files, results, and reviews. `private` is reserved for data that shouldn't enter the agent workspace, most importantly the final holdout.

```py
load_dotenv(override=True)
for k in ["EODHD_API_KEY", "OPENAI_API_KEY", "LANGSMITH_API_KEY"]:
    assert os.environ.get(k), f"missing env var: {k}"
os.environ["EODHD_API_KEY"] = os.environ["EODHD_API_KEY"].strip()
os.environ["LANGSMITH_TRACING"] = "true"
LS_PROJECT = "trading-deep-agent"
os.environ["LANGSMITH_PROJECT"] = LS_PROJECT

ROOT = Path("project").resolve()
RAW = Path("raw_cache").resolve()   
WS = ROOT / "workspace"
PRIVATE = ROOT / "private"
for p in [RAW, PRIVATE, WS/"data", WS/"strategies", WS/"results", WS/"reviews"]:
    p.mkdir(parents=True, exist_ok=True)
print("workspace:", WS)
```

The important distinction here isn't the folder names themselves. It's that the agent-facing filesystem will later be rooted at `workspace`, while the holdout stays outside it until the research process is complete.

If <VPIcon icon="iconfont icon-dotenv"/>`.env` is unavailable or one of the credentials needs to be replaced, we can enter the keys interactively instead. `getpass` hides them while they're entered and saves them for subsequent runs.

```py
for k in ["EODHD_API_KEY", "OPENAI_API_KEY", "LANGSMITH_API_KEY"]:
    os.environ[k] = getpass.getpass(f"{k}: ").strip()

Path(".env").write_text("\n".join(f"{k}={os.environ[k]}" for k in
    ["EODHD_API_KEY","OPENAI_API_KEY","LANGSMITH_API_KEY"]) + "\n")

print("openai looks right:", os.environ["OPENAI_API_KEY"].startswith("sk-"),
      len(os.environ["OPENAI_API_KEY"]))
```

The keys themselves never appear in the output:

![Project API Keys](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/2e26deea-0413-4d97-94b9-903d3561a10c.png)

With the environment ready, we can start building the market dataset that the research system will operate on.

---

## Prepare the EODHD Research Data

The research loop needs enough variation for the agents to make meaningful allocation decisions, but the universe should stay fixed throughout the experiment. I’ll use nine US equity ETFs:

```py
TICKERS = ["SPY","QQQ","IWM","XLE","XLF","XLK","XLV","XLP","XLY"]
START, END = "2004-01-01", "2025-12-31"
```

SPY, QQQ, and IWM give us broad-market exposure, while the remaining ETFs cover several major equity sectors.

We’ll pull the daily histories from [<VPIcon icon="iconfont icon-eodhd"/>EODHD’s Historical EOD endpoint](https://eodhd.com/financial-apis/api-for-historical-data-and-volumes). The actual development period begins in 2005, but the download starts in 2004 because the strategies will later need earlier observations to initialize rolling momentum and volume calculations.

```py
def fetch_eod(symbol, start=START, end=END):
    params = {"api_token": os.environ["EODHD_API_KEY"], "from": start, "to": end, "period": "d", "fmt": "json"}
    r = requests.get(f"https://eodhd.com/api/eod/{symbol}.US", params=params, timeout=60)
    return r.json()

for s in TICKERS:
    f = RAW / f"{s}.json"
    if not f.exists():
        f.write_text(json.dumps(fetch_eod(s))); time.sleep(0.3)

pd.DataFrame([{"symbol": s, "rows": len(j := json.loads((RAW/f"{s}.json").read_text())),
               "first": j[0]["date"], "last": j[-1]["date"]} for s in TICKERS])
```

Each untouched response is stored before we transform it. If the raw file already exists, the code reuses it instead of making the same API request again.

The download gives us the same coverage across all nine ETFs:

![ETF Historical Data Coverage](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/a5e6ba71-6c47-4402-b3b5-5d5df3a042b3.png)

For this strategy, we need three fields from each history. `adjusted_close` will drive momentum and portfolio returns, while raw `close` and `volume` will later be combined to calculate dollar volume.

Before building those research panels, I’ll convert each response into a date-indexed DataFrame and check for problems that could silently distort a backtest.

```py
def to_frame(symbol):
    df = pd.DataFrame(json.loads((RAW / f"{symbol}.json").read_text()))
    df["date"] = pd.to_datetime(df["date"])
    return df.set_index("date").sort_index()[["close","adjusted_close","volume"]].astype(float)

frames, report = {}, []
for s in TICKERS:
    d = to_frame(s)
    report.append({"symbol": s, "rows": len(d),
                   "duplicate_dates": int(d.index.duplicated().sum()),
                   "missing": int(d.isna().sum().sum()),
                   "nonpositive_price": int((d[["close","adjusted_close"]] <= 0).sum().sum()),
                   "zero_volume_days": int((d["volume"] <= 0).sum())})
    frames[s] = d[~d.index.duplicated(keep="last")]
pd.DataFrame(report)
```

The checks cover duplicate trading dates, missing observations, invalid prices, and nonpositive volume:

![Historical Data Validation](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/42f7ef81-b98a-4775-b685-117abd57971c.png)

All nine histories pass the checks, so we can align them by trading date and create the three research periods.

```py :collapsed-lines
def panel(field):
    return pd.concat({s: frames[s][field] for s in TICKERS}, axis=1)[TICKERS]

adj_close = panel("adjusted_close").dropna()
close = panel("close").loc[adj_close.index]
volume = panel("volume").loc[adj_close.index]
returns = adj_close.pct_change().fillna(0.0)

SPLITS = {"dev": ("2005-01-01","2017-12-31"), "val": ("2018-01-01","2021-12-31"),
          "holdout": ("2022-01-01","2025-12-31")}
WARMUP = 250

def make_split(name):
    lo, hi = SPLITS[name]; idx = adj_close.index
    first = idx[max(0, idx.searchsorted(pd.Timestamp(lo)) - WARMUP)]
    keep = (idx >= first) & (idx <= pd.Timestamp(hi))
    return {"adj_close": adj_close[keep], "close": close[keep], "volume": volume[keep],
            "returns": returns[keep], "eval_start": pd.Timestamp(lo)}

DATA = {name: make_split(name) for name in SPLITS}

for name in ["dev", "val"]:
    for field in ["adj_close","close","volume"]:
        DATA[name][field].to_parquet(WS/"data"/f"{name}_{field}.parquet")
json.dump({k: v[0] for k, v in SPLITS.items()}, open(WS/"data"/"splits.json","w"))

DELETE_RAW_CACHE = False  
if DELETE_RAW_CACHE:
    shutil.rmtree(RAW, ignore_errors=True)

print("holdout files on disk:", list(ROOT.rglob("holdout*")) or "NONE")
pd.DataFrame({n: {"rows": len(DATA[n]["adj_close"]), "eval_start": DATA[n]["eval_start"].date(),
                  "end": DATA[n]["adj_close"].index[-1].date()} for n in SPLITS}).T
```

The three periods have different jobs. Development is where the strategy can be created and revised. Validation is where different versions will compete for promotion. Holdout is reserved for one final evaluation after the champion has already been frozen.

Each split also carries 250 earlier trading sessions as warmup history. Those rows allow rolling indicators to exist from the beginning of an evaluation period, but `eval_start` tells the backtester when performance measurement should actually begin.

The resulting splits are:

![Historical Data Splits](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/51144f0c-97a5-493d-b14f-c271d262710c.png)

The important line here is `holdout files on disk: NONE`. Development and validation have been written into the research workspace, but the 2022 to 2025 holdout still exists only in the running process. The later agents therefore can't discover it simply by browsing their filesystem.

Before research begins, I’ll also clear any strategy, result, review, or decision artifacts left by an earlier execution:

```py
for d in [WS/"strategies", WS/"results", WS/"reviews", PRIVATE]:
    shutil.rmtree(d, ignore_errors=True)
    d.mkdir(parents=True, exist_ok=True)
for f in [WS/"registry.csv", WS/"decisions.jsonl", WS/"report.md", WS/"frozen.json",
          WS/"strategies"/"frozen.json"]:
    f.unlink(missing_ok=True)
for f in WS.glob("data/holdout_*.parquet"):
    f.unlink()
print("private:", list(PRIVATE.iterdir()) or "empty")
print("holdout on disk:", list(ROOT.rglob('holdout*')) or "NONE")
print("workspace reset")
```

![Workspace reset](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/cd435250-a9d0-43ac-af25-be878ba371a2.png)

We now have a clean research state, aligned EODHD data, and a holdout boundary that exists in the system rather than only as an instruction to the agents.

---

## Build a Deterministic Strategy Evaluation Layer

The agents will eventually control the strategy logic, but they shouldn't control how a strategy is executed or scored. If every revision is free to calculate its own returns, turnover, or Sharpe ratio, then comparing versions stops meaning much.

So before creating the agent team, we’ll build one evaluation path that stays fixed throughout the entire experiment. Every strategy will return portfolio weights, and the same Python engine will handle execution timing, portfolio accounting, transaction costs, and performance metrics from there.

### 1. Create the Shared Backtesting Engine

The shared engine lives in <VPIcon icon="fa-brands fa-python"/>`engine.py`. Both direct strategy evaluation and the isolated execution path we’ll build later import this same file, so there's only one implementation of the accounting logic.

```py :collapsed-lines title="engine.py"
ENGINE = '''
"""Fixed backtest engine and standard metrics. Imported by the notebook AND by the
isolated runner, so both compute identical numbers from identical code."""
import json
import numpy as np, pandas as pd
from pathlib import Path

PERIODS, RF_ANNUAL, MAR_ANNUAL = 252, 0.0, 0.0

def backtest(weights, returns, cost_bps=10.0):
    scheduled = pd.Series(returns.index.isin(weights.index), index=returns.index, dtype=bool)
    w = weights.reindex(returns.index).ffill().shift(1).fillna(0.0)
    is_rebal = scheduled.shift(1, fill_value=False)

    held = pd.Series(0.0, index=returns.columns)
    rows = []

    for d in returns.index:
        target = w.loc[d] if is_rebal.loc[d] else held

        traded = float((target - held).abs().sum())
        cost = traded * cost_bps / 1e4

        r = returns.loc[d]
        gross = float((target * r).sum())
        net = gross - cost

        rows.append((net, traded, cost, float(1.0 - target.sum())))

        denominator = 1.0 + gross
        if denominator <= 0:
            raise RuntimeError(f"Gross portfolio value became non-positive on {d}: gross return={gross}")

        held = (target * (1.0 + r)) / denominator

    return pd.DataFrame(rows, index=returns.index, columns=["ret", "turnover", "cost", "cash"],)

def metrics(bt, benchmark=None, rf_annual=RF_ANNUAL, mar_annual=MAR_ANNUAL):
    r = bt["ret"]
    rf_d = (1 + rf_annual) ** (1/PERIODS) - 1
    mar_d = (1 + mar_annual) ** (1/PERIODS) - 1
    ex = r - rf_d
    eq = (1 + r).cumprod(); yrs = len(r)/PERIODS
    sd = ex.std(ddof=1)
    dd = np.sqrt((np.minimum(r - mar_d, 0.0) ** 2).mean()) * np.sqrt(PERIODS)
    m = {"cagr": eq.iloc[-1] ** (1/yrs) - 1,
         "ann_ret": r.mean() * PERIODS,
         "vol": r.std(ddof=1) * np.sqrt(PERIODS),
         "sharpe": (ex.mean()/sd) * np.sqrt(PERIODS) if sd > 0 else 0.0,
         "sortino": (r.mean()*PERIODS - mar_annual)/dd if dd > 0 else 0.0,
         "max_dd": (eq/eq.cummax() - 1).min(),
         "ann_turnover": bt["turnover"].sum()/yrs,
         "ann_cost": bt["cost"].sum()/yrs,
         "avg_cash": bt["cash"].mean()}
    if benchmark is not None:
        m["bench_cagr"] = (1+benchmark).cumprod().iloc[-1] ** (1/yrs) - 1
    return {k: round(float(v), 4) for k, v in m.items()}

def load_split(data_dir, split):
    p = Path(data_dir)
    d = {f: pd.read_parquet(p/f"{split}_{f}.parquet") for f in ["adj_close","close","volume"]}
    d["returns"] = d["adj_close"].pct_change().fillna(0.0)
    d["eval_start"] = pd.Timestamp(json.load(open(p/"splits.json"))[split])
    return d
'''
(ROOT/"engine.py").write_text(ENGINE)
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
import engine
importlib.reload(engine)
from engine import backtest, metrics
print("engine.py written")
#
# engine.py written
```

Every strategy now has a much narrower responsibility. It only needs to generate target portfolio weights. <VPIcon icon="fa-brands fa-python"/>`engine.py` takes over once those weights reach the evaluation layer.

One detail here is especially important. The target weights are shifted by one trading session before they can affect returns. If a strategy uses the closing price on day `t` to calculate a signal, it can't also earn day `t` returns from that information.

The engine also distinguishes a scheduled rebalance from the portfolio weights currently being held. Between rebalances, holdings drift naturally with asset returns instead of being reset to their target values every day. When the next rebalance arrives, turnover is calculated from the actual holdings at that point to the new target.

That gives every later experiment the same definitions of return, trading cost, turnover, cash exposure, Sharpe, Sortino, and drawdown.

### 2. Verify the Portfolio Accounting

Before relying on those calculations for dozens of agent-generated experiments, we can test one simple case where the expected answer is obvious.

Suppose the portfolio buys one asset with a weight of `1.0` and never rebalances again. The total traded notional should be exactly `1.0`: one initial purchase and no subsequent trades.

```py
w = pd.DataFrame(0.0, index=[DATA["dev"]["adj_close"].index[0]], columns=TICKERS)
w.iloc[0, 0] = 1.0
assert round(backtest(w, DATA["dev"]["returns"]).turnover.sum(), 4) == 1.0
print("turnover check ok")
#
# turnover check ok
```

That small assertion matters because a subtle accounting error here would flow into every later comparison. For example, if ordinary portfolio drift were counted as fresh trading each day, both turnover and transaction costs would be overstated before the agents had even started their research.

### 3. Establish Fixed Benchmarks

A challenger also needs something more meaningful to compete against than the strategy version immediately before it.

We’ll establish four reference strategies: SPY buy-and-hold, equal-weight buy-and-hold across the nine ETFs, plain cross-sectional momentum, and the same momentum strategy with the dollar-volume eligibility filter that will appear in our initial research strategy.

```py :collapsed-lines
def bh_weights(data, tickers):
    w = pd.DataFrame(0.0, index=[data["adj_close"].index[0]], columns=data["adj_close"].columns)
    w.loc[w.index[0], tickers] = 1.0/len(tickers)
    return w

def plain_momentum(data, mom_window=126, top_n=3):
    adj = data["adj_close"]; mom = adj.pct_change(mom_window)
    dates = pd.DatetimeIndex(adj.index.to_series().resample("ME").last().dropna())
    w = pd.DataFrame(0.0, index=dates, columns=adj.columns)
    for dt in dates:
        picks = mom.loc[dt][mom.loc[dt] > 0].dropna().nlargest(top_n).index
        if len(picks): w.loc[dt, picks] = 1.0/len(picks)
    return w

def volume_momentum(data, mom_window=126, top_n=3, vol_short=20, vol_long=120, vol_ratio_min=1.0):
    adj, cls, vol = data["adj_close"], data["close"], data["volume"]
    mom = adj.pct_change(mom_window); dv = cls*vol
    ratio = dv.rolling(vol_short).mean()/dv.rolling(vol_long).mean()
    ok = (mom > 0) & (ratio > vol_ratio_min)
    dates = pd.DatetimeIndex(adj.index.to_series().resample("ME").last().dropna())
    w = pd.DataFrame(0.0, index=dates, columns=adj.columns)
    for dt in dates:
        picks = mom.loc[dt][ok.loc[dt]].dropna().nlargest(top_n).index
        if len(picks): w.loc[dt, picks] = 1.0/len(picks)
    return w

BENCHMARKS = {"spy_bh": lambda d: bh_weights(d, ["SPY"]),
              "ew_bh": lambda d: bh_weights(d, TICKERS),
              "plain_mom": plain_momentum, "volume_mom": volume_momentum}

def benchmark_table(split):
    d = DATA[split]; rows = {}
    for name, fn in BENCHMARKS.items():
        bt = backtest(fn(d), d["returns"])
        rows[name] = metrics(bt.loc[d["eval_start"]:], d["returns"]["SPY"].loc[d["eval_start"]:])
    return pd.DataFrame(rows).T

COLS_B = ["cagr","sharpe","sortino","max_dd","ann_turnover"]
BENCH = {s: benchmark_table(s) for s in ["dev","val"]}
BENCH_TEXT = ("DEVELOPMENT\n" + BENCH["dev"][COLS_B].to_string() +
              "\n\nVALIDATION\n" + BENCH["val"][COLS_B].to_string())
(WS/"BENCHMARKS.md").write_text("# Fixed benchmarks\n\n```\n" + BENCH_TEXT + "\n```\n")

ab = BENCH["dev"].loc["volume_mom"] - BENCH["dev"].loc["plain_mom"]
print(BENCH["dev"][COLS_B])
print(f"\nvolume filter effect on dev: sharpe {ab['sharpe']:+.4f}, "
      f"cagr {ab['cagr']:+.4f}, turnover {ab['ann_turnover']:+.2f}")
```

The development comparison gives us an early reality check:

![Benchmarks Comparison](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/8f246046-cc92-4f68-800d-cb54de5ccb09.png)

The volume filter improves maximum drawdown slightly relative to plain momentum, but the trade-off isn't particularly attractive. Development Sharpe drops by `0.0976`, CAGR falls by about two percentage points, and annual turnover increases by `4.38`.

That's useful information to establish before the agents begin proposing improvements. The initial strategy isn't being handed to them as a strong benchmark that simply needs some polishing. It already has a visible weakness they'll have to confront.

The same benchmark set is calculated for validation and written with the development results to <VPIcon icon="fa-brands fa-markdown"/>`BENCHMARKS.md`. Later agents can therefore compare their revisions against fixed reference strategies rather than judging success only relative to whichever version happens to be the current champion.

### 4. Run Every Strategy in an Isolated Subprocess

The shared engine fixes how performance is calculated, but generated strategy code still has to execute somewhere.

Running that code directly inside the main research process would give it access to everything already loaded there, including API credentials and the holdout dataset we deliberately kept away from the research loop. Instead, every experiment will run in its own temporary process with only the files needed for that specific evaluation.

First, we’ll create the runner executed inside that process:

```py :collapsed-lines
RUNNER = '''
"""Isolated strategy runner. Own process, temp sandbox, scrubbed environment."""
import sys, json, importlib.util, traceback

def main():
    strat, params_json, data_dir, split, cost_bps = sys.argv[1:6]
    import engine
    d = engine.load_split(data_dir, split)
    spec = importlib.util.spec_from_file_location("strategy", strat)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    w = mod.target_weights(d, **json.loads(params_json))
    bt = engine.backtest(w, d["returns"], cost_bps=float(cost_bps))
    ev = bt.loc[d["eval_start"]:]
    bench = d["returns"]["SPY"].loc[d["eval_start"]:] if "SPY" in d["returns"] else None
    print(json.dumps({"ok": True, "metrics": engine.metrics(ev, bench),
                      "equity": [round(float(x), 6) for x in (1+ev["ret"]).cumprod().tolist()],
                      "dates": [str(x.date()) for x in ev.index]}))

if __name__ == "__main__":
    try: main()
    except Exception: print(json.dumps({"ok": False, "error": traceback.format_exc(limit=3)}))
'''
(ROOT/"runner.py").write_text(RUNNER)

def isolated_environment(sandbox):

    required = ["PATH","SYSTEMROOT","WINDIR","COMSPEC","PATHEXT","VIRTUAL_ENV","CONDA_PREFIX","CONDA_DEFAULT_ENV","LD_LIBRARY_PATH",
                "DYLD_LIBRARY_PATH","LANG","LC_ALL"]

    env = {name: os.environ[name] for name in required if name in os.environ}

    env.update({
        "HOME": str(sandbox),
        "USERPROFILE": str(sandbox),
        "TEMP": str(sandbox),
        "TMP": str(sandbox),
        "TMPDIR": str(sandbox),
        "PYTHONHASHSEED": "1",
        "PYTHONUTF8": "1",
    })

    return env

def run_isolated(strategy_path, params, split, cost_bps=10.0, timeout=600):
    sandbox = Path(tempfile.mkdtemp(prefix="strat_"))
    (sandbox/"data").mkdir()
    for f in ["adj_close","close","volume"]:
        shutil.copy(WS/"data"/f"{split}_{f}.parquet", sandbox/"data")
    shutil.copy(WS/"data"/"splits.json", sandbox/"data")
    shutil.copy(ROOT/"engine.py", sandbox); shutil.copy(ROOT/"runner.py", sandbox)
    shutil.copy(strategy_path, sandbox/"strategy.py")
    try:
        p = subprocess.run([sys.executable, "runner.py", "strategy.py", json.dumps(params),
                            "data", split, str(cost_bps)],
                           capture_output=True, text=True, cwd=sandbox, timeout=timeout,
                           env=isolated_environment(sandbox))
        if not p.stdout.strip():
            return {"ok": False, "error": (p.stderr or "no output")[-400:]}
        return json.loads(p.stdout)
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": f"timeout after {timeout}s"}
    finally:
        shutil.rmtree(sandbox, ignore_errors=True)
```

For each run, `run_isolated()` creates a temporary directory and stages only the requested development or validation files, along with <VPIcon icon="fa-brands fa-python"/>`engine.py`, <VPIcon icon="fa-brands fa-python"/>`runner.py`, and the strategy being evaluated. It also builds a much smaller environment for the child process instead of copying the parent process environment wholesale.

The generated strategy therefore receives the inputs needed to produce portfolio weights, but it doesn't need access to EODHD, OpenAI, LangSmith, or the holdout data.

This is deliberately a research-process isolation boundary, not an operating-system security sandbox. The generated code is still a normal Python process running under the current user account. The goal here is to keep accidental access to credentials and unstaged research data out of the strategy execution path, not to claim protection against hostile code.

### 5. Verify Execution Parity and Data Boundaries

There are two things worth testing before we rely on this execution path.

First, a strategy evaluated inside the isolated process should produce exactly the same result as the same logic evaluated directly with <VPIcon icon="fa-brands fa-python"/>`engine.py`. Otherwise, we would have introduced two different measurement systems.

We’ll use the volume-momentum benchmark for that parity check.

Second, we’ll deliberately run a probe that looks for credential-like environment variables and holdout or private files.

```py title="engine.py"
(WS/"strategies"/"parity_check.py").write_text('''import pandas as pd
def target_weights(data, mom_window=126, top_n=3, vol_short=20, vol_long=120, vol_ratio_min=1.0):
    adj, cls, vol = data["adj_close"], data["close"], data["volume"]
    mom = adj.pct_change(mom_window); dv = cls*vol
    ratio = dv.rolling(vol_short).mean()/dv.rolling(vol_long).mean()
    ok = (mom>0)&(ratio>vol_ratio_min)
    dates = pd.DatetimeIndex(adj.index.to_series().resample("ME").last().dropna())
    w = pd.DataFrame(0.0, index=dates, columns=adj.columns)
    for d in dates:
        picks = mom.loc[d][ok.loc[d]].dropna().nlargest(top_n).index
        if len(picks): w.loc[d,picks]=1.0/len(picks)
    return w
''')
iso = run_isolated(WS/"strategies"/"parity_check.py", {"mom_window":126,"top_n":3}, "dev")
d = DATA["dev"]
inp = metrics(backtest(volume_momentum(d, 126, 3), d["returns"]).loc[d["eval_start"]:],
              d["returns"]["SPY"].loc[d["eval_start"]:])
assert iso["metrics"]["sharpe"] == inp["sharpe"], "isolated and in-process disagree"
print("parity ok:", iso["metrics"]["sharpe"])

PROBE = f'''import os, glob
def target_weights(data, **k):
    keys = [x for x in os.environ if any(t in x for t in ("KEY","TOKEN","SECRET"))]
    files = glob.glob(r"{PRIVATE}/*") + glob.glob(r"{WS}/data/holdout_*")
    raise RuntimeError(f"KEYS={{keys}} REACHABLE_SENSITIVE_FILES={{len(files)}}")
'''
(WS/"strategies"/"probe.py").write_text(PROBE)
msg = run_isolated(WS/"strategies"/"probe.py", {}, "dev")["error"].strip().split("\n")[-1]
print("probe:", msg)
assert "KEYS=[]" in msg, "credentials reachable from the sandbox"
assert "REACHABLE_SENSITIVE_FILES=0" in msg, "holdout or private files reachable from the sandbox"
#
# parity ok: 0.4387
# probe: RuntimeError: KEYS=[] REACHABLE_SENSITIVE_FILES=0
```

The isolated and direct paths both produce the same `0.4387` development Sharpe, so they agree on the strategy result. The probe also finds no credential variables in the child environment and no staged private or holdout files.

---

## Create the Experiment and Decision Layer

The backtesting engine now gives every strategy the same evaluation path. But we still need to control what happens across repeated experiments.

If an agent can keep testing new configurations indefinitely, ignore failed runs, or move to a new strategy version before the previous one has been reviewed, the research process can still drift toward whatever result looks best. So the next layer will track every experiment, enforce a fixed research budget, and require each version to pass through the same sequence before the next one can begin.

### 1. Create the Experiment Registry

We’ll start with a registry that records every configuration tested by the system.

```py :collapsed-lines
REGISTRY = WS / "registry.csv"
DECISIONS = WS / "decisions.jsonl"
MAX_CONFIGS = 12
COLS = ["version","run","status","params","note","dev_cagr","dev_sharpe","dev_sortino",
        "dev_max_dd","dev_turnover","val_cagr","val_sharpe","val_max_dd","dev_cagr_20bps","error"]

def _used(version):
    if not REGISTRY.exists(): return 0
    return int((pd.read_csv(REGISTRY)["version"] == version).sum())

def _decisions():
    if not DECISIONS.exists(): return []
    return [json.loads(l) for l in DECISIONS.read_text().splitlines() if l.strip()]

def _stage_ok(version):
    """vN cannot begin until v(N-1) is swept, reviewed and decided."""
    if not (version.startswith("v") and version[1:].isdigit()): return True, ""
    n = int(version[1:])
    if n <= 1: return True, ""
    prev = f"v{n-1}"
    if not REGISTRY.exists() or _used(prev) == 0:
        return False, f"stage gate: {prev} has no recorded runs. Complete {prev} first."
    reg = pd.read_csv(REGISTRY)
    if reg[(reg.version == prev) & (reg.status == "ok")].empty:
        return False, f"stage gate: {prev} has no successful runs."
    if not (WS/"reviews"/f"{prev}.md").exists():
        return False, f"stage gate: /reviews/{prev}.md does not exist. Get a critic review first."
    if not any(d["version"] == prev for d in _decisions()):
        return False, f"stage gate: no decision recorded for {prev}. Call record_decision first."
    return True, ""
```

`MAX_CONFIGS = 12` puts a hard ceiling on the number of configurations that can be tested within any strategy version. That matters because validation data can also be overused. If the agent gets unlimited opportunities to search different parameter combinations and keeps selecting whichever one performs best on validation, the validation set gradually becomes another optimization target.

The stage gate controls a different problem. A new version can't start simply because the agent has another idea. Before `v2` can be tested, `v1` must already have at least one successful run, a critic review, and a recorded decision. The same sequence applies before `v3`.

So the version flow becomes:

![Version Flow](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f84346fd-9a5c-46df-addd-6baaeda9954e.png)

This makes the research sequence enforceable in code rather than relying on the coordinator to remember the process.

### 2. Create the Research Tools

The agents will interact with this layer through three LangChain tools.

The most important one is `sweep()`. It's the only route through which an agent can obtain official backtest results.

```py :collapsed-lines
from langchain.tools import tool

@tool
def sweep(version: str, grid_json: str, note: str = "") -> str:
    """Backtest strategies/<version>.py over several parameter sets in ONE call.

    version   : file stem, e.g. "v1" for strategies/v1.py
    grid_json : JSON list of parameter objects, e.g. [{"top_n":3},{"top_n":4}]
    note      : short reason for this sweep

    Runs each configuration in an isolated subprocess. Returns a CSV table sorted by
    validation Sharpe. Max 12 configurations per version, cumulative. Every row is
    written to registry.csv, including failures. vN is blocked until v(N-1) is swept,
    reviewed and decided.
    """
    ok, why = _stage_ok(version)
    if not ok: return f"error: {why}"
    used = _used(version)
    try:
        grid = json.loads(grid_json)
        if isinstance(grid, dict): grid = [grid]
    except Exception as e:
        return f"error: grid_json is not valid JSON ({e})"
    if used + len(grid) > MAX_CONFIGS:
        return f"error: budget. {used}/{MAX_CONFIGS} used on {version}, you asked for {len(grid)} more."
    path = WS/"strategies"/f"{version}.py"
    if not path.exists():
        return f"error: {path.name} does not exist. Write it first."

    rows = []
    for i, params in enumerate(grid, start=used + 1):
        row = {"version": version, "run": i, "note": note,
               "params": json.dumps(params, separators=(",", ":"))}
        dev = run_isolated(path, params, "dev")
        if not dev["ok"]:
            row.update(status="error", error=dev["error"].strip().split("\n")[-1][:150])
            rows.append(row); continue
        val = run_isolated(path, params, "val")
        c20 = run_isolated(path, params, "dev", cost_bps=20.0)
        dm, vm = dev["metrics"], val["metrics"]
        row.update(status="ok", dev_cagr=dm["cagr"], dev_sharpe=dm["sharpe"],
                   dev_sortino=dm["sortino"], dev_max_dd=dm["max_dd"],
                   dev_turnover=dm["ann_turnover"], val_cagr=vm["cagr"],
                   val_sharpe=vm["sharpe"], val_max_dd=vm["max_dd"],
                   dev_cagr_20bps=c20["metrics"]["cagr"] if c20["ok"] else None)
        tag = f"{version}_run{i}"
        (WS/"results"/f"{tag}.json").write_text(json.dumps({"params": params, "dev": dm, "val": vm}, indent=2))
        eq = pd.Series(dev["equity"], index=pd.to_datetime(dev["dates"]))
        plt.figure(figsize=(8,3)); plt.plot(eq); plt.yscale("log"); plt.title(tag)
        plt.tight_layout(); plt.savefig(WS/"results"/f"{tag}.png", dpi=90); plt.close("all")
        rows.append(row)

    df = pd.DataFrame(rows).reindex(columns=COLS)
    df.to_csv(REGISTRY, mode="a", header=not REGISTRY.exists(), index=False)
    out = df.drop(columns=["version","note"]).round(3).dropna(axis=1, how="all")
    if "val_sharpe" in out:
        out = out.sort_values("val_sharpe", ascending=False, na_position="last")
    return out.to_csv(index=False)

@tool
def read_registry(version: str = "") -> str:
    """Every run recorded so far as CSV, accepted and rejected. Pass a version to filter."""
    if not REGISTRY.exists(): return "empty"
    r = pd.read_csv(REGISTRY)
    if version: r = r[r["version"] == version]
    return r[["version","run","status","params","dev_sharpe","dev_sortino",
              "dev_max_dd","val_sharpe","val_max_dd","error"]].to_csv(index=False)

@tool
def record_decision(version: str, champion: str, rationale: str, params_json: str) -> str:
    """Record the approved outcome of a version. REQUIRED before the next version can be swept.

    version    : the version just reviewed, e.g. "v2"
    champion   : which version is champion after applying the selection rule
    rationale  : cite the selection rule and the specific numbers that decided it
    params_json: the champion's parameters as JSON
    """
    if any(d["version"] == version for d in _decisions()):
        return f"error: a decision for {version} already exists and cannot be overwritten."
    rec = {"version": version, "champion": champion, "rationale": rationale,
           "params": json.loads(params_json), "ts": time.time()}
    with DECISIONS.open("a") as f:
        f.write(json.dumps(rec) + "\n")
    return f"recorded. champion is now {champion}"
```

For every configuration, `sweep()` runs development and validation through the isolated evaluation path we just built. It also reruns development at 20 basis points of transaction costs, so the critic can see whether a result is especially sensitive to the default 10-bps assumption.

Successful runs produce metrics, JSON result files, and an equity curve. Failed runs still enter <VPIcon icon="fas fa-file-csv"/>`registry.csv` instead of disappearing from the research history. That means a strategy engineer can't quietly repair several broken configurations and present only the final successful one.

The other two tools are deliberately simpler. `read_registry()` lets the agents inspect the recorded evidence, while `record_decision()` creates the official outcome of each version. Once a decision has been written, it can't be overwritten by calling the tool again for the same version.

### 3. Fix the Strategy Selection Rule

The registry tells us what happened, but we still need to define what counts as an improvement.

If we wait until after seeing the results to decide which metrics matter, the selection criteria themselves can become part of the optimization. So we’ll fix the promotion rule before any agent-generated version is run.

```py :collapsed-lines
SELECTION_RULE = """
# Version selection rule (fixed before any version was run)

A challenger replaces the incumbent champion only if it passes ALL THREE gates:

1. Validation Sharpe is not worse than the incumbent's
2. Validation max drawdown is within 2 percentage points of the incumbent's
3. Development annual turnover is no more than 20% above the incumbent's

Ties go to the incumbent. A newer version does not automatically replace an older one.
A higher development Sharpe is not sufficient and is not one of the gates.
"""
(WS/"SELECTION_RULE.md").write_text(SELECTION_RULE)

def select_champion(challenger, incumbent, name_c, name_i):
    if incumbent is None: return name_c, "no incumbent"
    checks = [("validation Sharpe not worse",
               challenger["val_sharpe"] >= incumbent["val_sharpe"]),
              ("validation drawdown within 2pp",
               challenger["val_max_dd"] >= incumbent["val_max_dd"] - 0.02),
              ("turnover within +20%",
               challenger["dev_turnover"] <= incumbent["dev_turnover"] * 1.20)]
    failed = [n for n, ok in checks if not ok]
    if failed:
        return name_i, "incumbent retained; challenger failed: " + "; ".join(failed)
    return name_c, "challenger passed all three gates"

def best_of(version):
    reg = pd.read_csv(REGISTRY)
    rows = reg[(reg.version == version) & (reg.status == "ok")]
    return None if rows.empty else rows.sort_values("val_sharpe", ascending=False).iloc[0]

print(SELECTION_RULE)
```

The rule is now fixed before the agents see any strategy results:

![Selection Rule](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/a8c9e270-6b3e-44e7-9bf3-2d44d4948218.png)

There are two levels of selection here.

`best_of()` first finds the strongest successful configuration **within a version** using validation Sharpe. But winning that internal sweep doesn't automatically make the strategy the new champion. `select_champion()` then compares that candidate with the incumbent across all three gates.

Development Sharpe is intentionally absent from those gates. The agents can use development performance to understand whether a change is doing what they expected, but a large development improvement can't compensate for weaker validation evidence.

That distinction will become important once the agents start revising the strategy. A new version can look dramatically better during development and still be rejected.

---

## Establish the Manual Baseline

Before giving the research tools to Deep Agents, we’ll run the initial strategy manually through the same evaluation layer. This gives us a known reference point and confirms that the data, strategy logic, backtesting engine, and benchmark calculations all agree before any agent starts modifying the strategy.

The baseline uses 126-day adjusted-close momentum together with a dollar-volume filter. At each month-end, an ETF is eligible only when its momentum is positive and its 20-day average dollar volume is above its 120-day average. The strategy ranks the eligible ETFs by momentum, holds the top three in equal weights, and stays in cash when nothing qualifies.

```py :collapsed-lines
def manual_baseline(data, mom_window=126, vol_short=20, vol_long=120,
                    vol_ratio_min=1.0, top_n=3):
    adj, cls, vol = data["adj_close"], data["close"], data["volume"]
    mom = adj.pct_change(mom_window)
    dv = cls * vol
    ratio = dv.rolling(vol_short).mean() / dv.rolling(vol_long).mean()
    ok = (mom > 0) & (ratio > vol_ratio_min)
    dates = pd.DatetimeIndex(adj.index.to_series().resample("ME").last().dropna())
    w = pd.DataFrame(0.0, index=dates, columns=adj.columns)
    for d in dates:
        picks = mom.loc[d][ok.loc[d]].dropna().nlargest(top_n).index
        if len(picks):
            w.loc[d, picks] = 1.0 / len(picks)
    return w

d = DATA["dev"]
bt = backtest(manual_baseline(d), d["returns"])
ev = bt.loc[d["eval_start"]:]
spy = d["returns"]["SPY"].loc[d["eval_start"]:]
print(metrics(ev, spy))

fig, ax = plt.subplots(2, 1, figsize=(9, 5), sharex=True, height_ratios=[2, 1])
eq = (1 + ev["ret"]).cumprod()
ax[0].plot(eq, label="strategy"); ax[0].plot((1 + spy).cumprod(), label="SPY")
ax[0].set_yscale("log"); ax[0].legend(); ax[0].set_title("Development 2005-2017")
ax[1].fill_between(eq.index, (eq / eq.cummax() - 1), 0, alpha=.4)
ax[1].set_ylabel("drawdown")
plt.tight_layout()
plt.show()
#
# {'cagr': 0.0549, 'ann_ret': 0.0642, 'vol': 0.1463, 'sharpe': 0.4387, 'sortino': 0.6047, 'max_dd': -0.2606, 'ann_turnover': 11.6605, 'ann_cost': 0.0117, 'avg_cash': 0.2109, 'bench_cagr': 0.0847}
```

![Manual Baseline Equity Curve](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/4ed36ec7-4a15-4e82-b281-8b2d28f1f818.png)

The baseline compounds at `5.49%` annually over the development period with a `0.4387` Sharpe and a maximum drawdown of `-26.06%`. SPY compounds at `8.47%` over the same period, so we're deliberately starting from a strategy with a weaker return profile rather than handing the agents an already-optimized result.

The equity curve adds some context. The strategy avoids much of SPY’s 2008 collapse and spends part of that period close to flat, but it gives up much of that advantage during the recovery. Its lower drawdown therefore comes with a meaningful return trade-off.

Trading activity is another weakness. Annual turnover reaches `11.6605`, which translates to roughly `1.17%` in annual trading costs under the 10-basis-point assumption. The strategy also holds about `21.09%` of the portfolio in cash on average.

Most importantly, these results match the `volume_mom` benchmark we calculated earlier exactly. That tells us the manually written strategy and the shared evaluation engine are working consistently.

---

## Configure the Deep Agents Research Team

The deterministic research layer is now complete. Strategies can be tested only through the fixed engine, every experiment is recorded, and the selection rule already defines what a challenger has to do to replace the current champion.

Now we can add the agent layer.

I’ll divide the research process across three roles:

- a **strategy engineer** that implements and tests ideas
- a **research critic** that challenges the resulting evidence
- a **coordinator** that manages the sequence and applies the selection rule.

The separation is deliberate. The same agent shouldn't be able to propose a strategy, evaluate its own work, and then decide that the strategy deserves promotion.

### 1. Set the Agent Roles and Boundaries

First, we’ll initialize the models used by the team:

```py
load_dotenv(override=True)
from deepagents import create_deep_agent, FilesystemPermission
from deepagents.backends import FilesystemBackend
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver

MODEL_ID = "openai:gpt-5.6-terra"
WORKER = init_chat_model(MODEL_ID, reasoning={"effort": "low"})
MANAGER = init_chat_model(MODEL_ID, reasoning={"effort": "medium"})
```

The engineer gets the lower reasoning setting because its job is mainly implementation. The coordinator and critic need to compare evidence, challenge conclusions, and make research decisions, so they use the higher setting.

The agents also need a common definition of what a valid strategy looks like. Instead of letting every version invent its own interface, we’ll give them the same strategy contract that the deterministic engine expects:

```py :collapsed-lines
CONTRACT = """
Every strategy file defines exactly one function:

    def target_weights(data, **params) -> pd.DataFrame

    index   : rebalance dates, all of which must exist in data["adj_close"].index
    columns : the nine tickers
    values  : target weights, each row summing to <= 1.0 (remainder is cash)

data keys: adj_close, close, volume, returns (DataFrames, dates x tickers)
Use adj_close for momentum and returns. Use close * volume for dollar volume.
A row dated t is a decision made on t's close; the engine applies it on t+1.
Guard against empty selections: if nothing qualifies, leave the row at zero.

Your code runs in an isolated subprocess with no network, no credentials and no
holdout data. Import only pandas and numpy.

Working skeleton:

import pandas as pd
def target_weights(data, mom_window=126, top_n=3):
    adj = data["adj_close"]
    mom = adj.pct_change(mom_window)
    dates = pd.DatetimeIndex(adj.index.to_series().resample("ME").last().dropna())
    w = pd.DataFrame(0.0, index=dates, columns=adj.columns)
    for d in dates:
        picks = mom.loc[d].dropna().nlargest(top_n).index
        if len(picks):
            w.loc[d, picks] = 1.0 / len(picks)
    return w
"""
```

This keeps every revision compatible with the same evaluation layer. The engineer is free to change how target weights are generated, but it can't change the input data contract or bypass the engine that eventually scores those weights.

Next, we’ll bring the research controls from the previous sections directly into the agent prompts:

```py
RULES = f"""
Layout: /strategies/vN.py, /results/, /reviews/, /registry.csv, /decisions.jsonl

Stage gates, enforced by the sweep tool:
vN cannot be swept until v(N-1) has successful runs, a review at /reviews/v(N-1).md,
and a decision recorded via record_decision. There is no way around this.

Hard limits: three versions; at most 12 configurations per version; one major
structural change per revision. Engine, universe, splits, benchmark and cost
convention are fixed. The holdout does not exist for you; never ask for it.

{SELECTION_RULE}

Fixed benchmarks, computed before any version was written:
{BENCH_TEXT}

Do not call ls, glob, grep or read_file unless told a specific file exists and you
need its contents.
"""
```

The important point is that these aren't new rules being invented for the agents. They expose the same boundaries we already implemented in Python: three versions, bounded searches, fixed benchmarks, fixed costs, stage gates, and no holdout access.

Now we can create the two specialist roles.

The strategy engineer receives the strategy contract and the `sweep()` tool:

```py
engineer = {
    "name": "strategy-engineer",
    "description": "Writes strategy files and sweeps them through the fixed backtester in one batched call. Use for anything that creates code or produces metrics.",
    "system_prompt": f"""You implement strategies. You do not decide what to implement.
{RULES}{CONTRACT}
Procedure:
1. Write the strategy file with write_file.
2. Call sweep ONCE with the entire parameter grid as a JSON list. Never per configuration.
3. If a run errors, read the message, fix the file, call sweep again. Errors count
   against the budget.
4. Report back in under 200 words: filename, the returned table verbatim, and the one
   configuration you recommend with a one-line reason. Never paste code back.""",
    "tools": [sweep],
    "model": WORKER,
}
```

Its authority is intentionally narrow. The engineer can write a strategy and generate evidence through `sweep()`, but it doesn't decide what the next research hypothesis should be or whether its own strategy replaces the champion.

The research critic operates from the opposite side:

```py
critic = {
    "name": "research-critic",
    "description": "Reads a results table and returns exactly one evidence-backed weakness with one proposed structural change. Use after every version is swept.",
    "system_prompt": f"""You review results. You never write or edit strategy code.
{RULES}
The results table is given to you in the task description. Do not go looking for it.
Call read_registry only to compare against an earlier version.

Write your review to /reviews/vN.md under exactly these five headings:

Weakness     one sentence
Evidence     specific numbers from the table, compared against the fixed benchmarks
Change       one structural change, not a parameter nudge
Expected     what it should do to which metric, and why
Overfit risk how this could be curve-fitting, and what would disconfirm it

A higher Sharpe alone is not evidence. Compare against equal-weight buy-and-hold and
plain momentum, not just SPY. Check the 20bps column against the 10bps one, whether
the dev result survives validation, and whether neighbouring parameters behave
similarly. If dev and val disagree, that disagreement is the finding.""",
    "tools": [read_registry],
    "model": MANAGER,
    "permissions": [
        FilesystemPermission(operations=["write"], paths=["/strategies/**"], mode="deny"),
        FilesystemPermission(operations=["read","write"], paths=["/**"], mode="allow"),
    ],
}
```

The critic isn't asked simply whether a strategy “looks good.” Its review has to identify one weakness, support that weakness with evidence, and propose one structural change with an explicit overfitting risk.

More importantly, the separation is enforced beyond the prompt. The critic is explicitly denied write access to <VPIcon icon="fas fa-folder-open"/>`/strategies/**`. It can inspect the research evidence and write its review, but it can't quietly change the strategy it's supposed to evaluate.

### 2. Create the Coordinator

The coordinator connects the engineer and critic into the complete research loop.

```py
COORDINATOR = f"""You run a quantitative research process and are judged on the honesty
of the process, not on the returns.
{RULES}
Your loop for each version N:
1. plan with write_todos
2. delegate implementation and sweeping to strategy-engineer
3. pass the engineer's table verbatim into the task description for research-critic
4. apply the selection rule yourself and state which gates passed or failed
5. call record_decision with the resulting champion and your rationale

Step 5 is mandatory. The next version is blocked until it is done.

Reject proposals that are parameter tuning dressed up as structure. The champion does
not change just because a newer version exists. Never overwrite an earlier version."""

agent = create_deep_agent(
    model=MANAGER,
    tools=[sweep, read_registry, record_decision],
    system_prompt=COORDINATOR,
    subagents=[engineer, critic],
    backend=FilesystemBackend(root_dir=str(WS), virtual_mode=True),
    checkpointer=InMemorySaver(),
    name="coordinator",
)
```

The coordinator manages the process, but it still sits on top of the deterministic controls we already built. It can't make an engineer-reported Sharpe ratio official, bypass the experiment registry, or promote a strategy without applying the fixed rule.

The filesystem backend gives the team a shared research workspace for strategy files, results, reviews, and decisions. `virtual_mode=True` exposes that workspace through agent-facing paths such as <VPIcon icon="fas fa-folder-open"/>`/strategies/`<VPIcon icon="fa-brands fa-python"/>`v1.py`, while the backend maps them to the actual research directory underneath.

We’ll also keep the entire `v1 -> v2 -> v3` sequence inside one checkpointed thread and use a small helper for invoking the coordinator:

```py
def run(prompt):
    out = agent.invoke({"messages": [{"role":"user","content":prompt}]}, THREAD)
    c = out["messages"][-1].content
    print(c if isinstance(c, str) else
          "\n".join(b.get("text","") for b in c if b.get("type") == "text"))
    return out

print("subagent models:", engineer["model"].model_name, critic["model"].model_name)
print(WORKER.invoke("reply with the single word: ok").content)
```

The final check confirms that the specialist models initialize successfully:

```plaintext
subagent models: gpt-5.6-terra gpt-5.6-terra
[{'type': 'text', 'text': 'ok', 'annotations': [], 'id': 'msg_09ea14bfb753e624006a72189dbf84819eac295e52e7d7ccd0', 'phase': 'final_answer'}]
```

At this point, the research team has everything it needs. The engineer can implement and test strategies, the critic can challenge the evidence without changing the code, and the coordinator can move the research forward only after each version has been tested, reviewed, and formally decided.

---

## Reproduce the Manual Baseline as v1

The first agent cycle shouldn't introduce a new strategy idea. We already have a manually verified baseline, so `v1` gives us a controlled way to check whether the new agent workflow can reproduce that strategy, run the predefined experiments, obtain an independent critic review, and record a decision before any genuine revision begins.

The baseline logic is fully specified in the task. The only search is a pre-registered nine-configuration grid across three momentum windows and three portfolio sizes, which keeps the engineer from expanding the parameter search after seeing the first results.

```py
V1_BRIEF = """Build Version 1, the baseline.

Delegate to strategy-engineer. /strategies/v1.py: 126-day momentum from adjusted close;
20-day over 120-day average dollar volume from raw close x raw volume; eligible if
momentum > 0 and volume ratio > 1.0; rank eligible by momentum, hold top 3 equal weight,
rebalance monthly, cash otherwise. Parameters: mom_window, vol_short, vol_long,
vol_ratio_min, top_n.

Sweep exactly these nine in one call: mom_window in (63, 126, 189) crossed with
top_n in (2, 3, 4), everything else at default.

Pass the table to research-critic for a review of v1, telling it to compare against the
fixed benchmarks. Then apply the selection rule (v1 has no incumbent, so it becomes the
champion by default) and call record_decision for v1. Finally report: the chosen configuration, how it compares to equal-weight buy-and-hold
and plain momentum, and the critic's proposal with your decision."""

_ = run(V1_BRIEF)
```

The complete agent cycle returns:

````md :collapsed-lines
---

## Version 1 baseline completed

**Champion:** v1 (initial version; no incumbent, so selected by default)  
**Chosen configuration:**
```json
{
  "mom_window": 126,
  "vol_short": 20,
  "vol_long": 120,
  "vol_ratio_min": 1.0,
  "top_n": 2
}
```

This was selected because it produced the highest validation Sharpe of the nine predefined configurations: **0.542**.

### Selected-result comparison

| Metric | V1 selected | Equal-weight buy & hold | Plain momentum |
|---|---:|---:|---:|
| **Development CAGR** | 0.0550 | 0.0904 | 0.0750 |
| **Development Sharpe** | 0.4240 | 0.5532 | 0.5363 |
| **Development max drawdown** | -0.2760 | -0.5203 | -0.2817 |
| **Development annual turnover** | 11.5890 | 0.0000 | 7.2798 |
| **Validation CAGR** | 0.1000 | 0.1769 | 0.2051 |
| **Validation Sharpe** | 0.5420 | 0.8697 | 0.9279 |
| **Validation max drawdown** | -0.2950 | -0.3371 | -0.2901 |

V1 has lower development drawdown than both benchmarks, but it underperforms equal-weight buy-and-hold and plain momentum on both development and validation CAGR and Sharpe. It also trades substantially more than plain momentum (development turnover **11.589** vs. **7.280**).

### Selection-rule application

V1 has **no incumbent**, so it becomes champion by default.

- Gate 1 — validation Sharpe: **not applicable**
- Gate 2 — validation max drawdown: **not applicable**
- Gate 3 — development turnover: **not applicable**

The decision was recorded with v1 as champion.

### Critic review and decision

**Critic’s evidence-backed weakness:** the always-invested selection strategy did not achieve benchmark-level risk-adjusted performance despite materially higher turnover. The longer 189-day specification had the strongest development result, but that relative advantage did not persist in validation. The 126-day configurations were more consistent, but still remained well below both fixed benchmarks in validation Sharpe.

**Critic’s proposed structural change:** add a **dual-momentum market-regime rule**: hold the existing relative-momentum portfolio only when broad-market absolute momentum is positive, otherwise move to cash.

**Decision:** retain v1 as the baseline champion. The proposal is a valid single structural change—not parameter tuning—and is appropriate to test as the next version, subject to the fixed version-selection gates.
````

The engineer completes all nine runs and selects the configuration with the highest validation Sharpe:

```json
{
  "mom_window": 126,
  "vol_short": 20,
  "vol_long": 120,
  "vol_ratio_min": 1.0,
  "top_n": 2
}
```

Its validation Sharpe is `0.542`. That makes it the strongest configuration inside the v1 sweep, but the fixed benchmarks stop us from confusing “best in this search” with “strong strategy.”

V1 still trails equal-weight buy-and-hold and plain momentum on both development and validation CAGR and Sharpe. It also trades substantially more than plain momentum. The strategy does have a smaller development drawdown, but that advantage alone isn't enough to make the overall result compelling.

Since there's no incumbent yet, the three promotion gates don't apply. `v1` simply becomes the initial champion that every later version has to beat.

The critic then looks beyond the winning row. The 189-day variants produced stronger development results, but that advantage weakened in validation. The 126-day variants were more consistent across different portfolio sizes, yet their validation Sharpes still remained well below the simpler benchmarks.

Instead of suggesting another momentum window or `top_n` value, the critic proposes a structural change: add a broad-market absolute-momentum filter. The existing cross-sectional momentum portfolio would remain active when SPY momentum is positive and move to cash when the market regime turns negative.

Before moving on, we can verify that the full v1 cycle actually left behind the three artifacts required by the stage gate: successful experiments, a critic review, and a recorded decision.

```py
print(pd.read_csv(REGISTRY).groupby(["version","status"]).size())
print("decisions:", [d["version"] for d in _decisions()])
assert (WS/"reviews"/"v1.md").exists(), "v1 review missing"
assert any(d["version"] == "v1" for d in _decisions()), "v1 decision missing"
print("v1 cycle complete")
```

![V1 Verification](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/a16aacd6-da96-4526-b4ee-8cab4c8808aa.png)

The first stage is complete. `v1` is now the current champion, the critic has identified a specific weakness, and the next version has one clearly defined structural hypothesis to test.

---

## Let the Agents Revise the Strategy

With `v1` established as the baseline champion, the research loop can finally move beyond reproduction. From this point on, every new version has to come from a weakness identified in the previous critic review, and a challenger only replaces the incumbent if it passes all three fixed selection gates.

### Test the Market-Regime Filter in v2

The v1 critic proposed one structural change: keep the existing cross-sectional momentum strategy, but move the portfolio to cash whenever SPY’s absolute momentum is non-positive.

Instead of reopening the parameter search immediately, we’ll test that change using the current v1 champion configuration. That makes the first v2 comparison mainly about the regime filter rather than another round of parameter tuning.

```py
V2_BRIEF = """Review the critic's v1 proposal in /reviews/v1.md. If you approve it, have
strategy-engineer implement it as /strategies/v2.py. Do not modify v1.py.
Sweep at most 12 configurations in one call. Pass the table to research-critic for a
review written to /reviews/v2.md. Then apply the selection rule between v2 and the
current champion, state which of the three gates passed and which failed, and call
record_decision for v2. Do not proceed past that."""

_ = run(V2_BRIEF)
```

The agent team returns:

````md
Approved the v1 critic proposal as a single structural change: a dual-momentum regime filter that moves the portfolio to cash when SPY’s adjusted-close momentum over the existing `mom_window` is non-positive.

- Implemented as <VPIcon icon="fas fa-folder-open"/>`/strategies/`<VPIcon icon="fa-brands fa-python"/>`v2.py`
- .<VPIcon icon="fas fa-folder-open"/>`/strategies/`<VPIcon icon="fa-brands fa-python"/>`v1.py` was not modified.
- Swept one configuration using the current v1 champion parameters:

```json
{
  "mom_window": 126,
  "vol_short": 20,
  "vol_long": 120,
  "vol_ratio_min": 1.0,
  "top_n": 2
}
```

### V2 result

| Metric | V1 champion | V2 |
|---|---:|---:|
| Development Sharpe | 0.424 | 0.611 |
| Development max drawdown | -0.276 | -0.190 |
| Development turnover | 11.589 | 9.814 |
| Validation Sharpe | 0.542 | 0.321 |
| Validation max drawdown | -0.295 | -0.295 |

The critic review was written to <VPIcon icon="fas fa-folder-open"/>`/reviews/`<VPIcon icon="fa-brands fa-markdown"/>`v2.md`.

### Selection rule: v2 vs. v1

1. **Validation Sharpe — failed**  
   V2: **0.321** vs. V1: **0.542**.

2. **Validation maximum drawdown — passed**  
   V2: **-0.295** vs. V1: **-0.295**; difference is 0.0 percentage points, within the 2-point limit.

3. **Development annual turnover — passed**  
   V2: **9.814** vs. V1: **11.589**; V2 is below V1 and below the allowed 20%-higher limit of **13.907**.

Because v2 failed the validation-Sharpe gate, it does **not** replace the incumbent. The decision was recorded: **v1 remains champion**.
````

At first, v2 looks like a major improvement. Development Sharpe jumps from `0.4235` to `0.6110`, maximum drawdown improves from `-27.57%` to `-18.99%`, and annual turnover falls from `11.5888` to `9.8139`.

If we looked only at the development period, the regime filter would appear to have solved several problems at once.

Validation tells a very different story. Sharpe falls from `0.5424` for v1 to just `0.3207` for v2, while maximum drawdown is effectively unchanged. The development improvement therefore doesn't survive the period that actually decides whether the strategy gets promoted.

This is exactly where the selection rule earns its place. V2 passes the drawdown gate and easily passes the turnover gate, but it fails the first requirement: validation Sharpe can't be worse than the incumbent.

::: note

So despite the much stronger development result, v1 remains champion.

:::

The critic also spots another weakness in the evidence. V2 was tested at only one configuration, which means the large development improvement has no neighboring-parameter support. Rather than tuning the regime rule itself, the critic proposes another structural revision: replace the binary dollar-volume eligibility filter with volatility-scaled weights among the selected momentum assets.

Before testing that idea, we’ll make sure the v2 experiments, review, and decision have all been persisted.

```py
print(pd.read_csv(REGISTRY).groupby(["version","status"]).size())
print("decisions:", [d["version"] for d in _decisions()])
assert (WS/"reviews"/"v2.md").exists(), "v2 review missing"
assert any(d["version"] == "v2" for d in _decisions()), "v2 decision missing"
print("v2 cycle complete")
```

![V2 Verification](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ed69384b-7216-451d-9953-2a268a71a66a.png)

V2 therefore gives us useful evidence without earning promotion.

### Run the Final Revision in v3

The v2 critic’s proposal becomes the final revision. V3 will keep the broad-market regime filter introduced in v2, remove the binary dollar-volume eligibility rule, and weight the selected momentum assets inversely to their recent realized volatility.

This time, the engineer will test three neighboring portfolio sizes with `top_n` set to `2`, `3`, and `4`. After the final critic review and selection decision, the coordinator must immediately freeze whichever strategy still qualifies as champion.

```py
V3_BRIEF = """Implement the final approved revision as /strategies/v3.py. Do not modify
v1 or v2. Sweep at most 12 configurations in one call, get a critic review at
/reviews/v3.md, apply the selection rule, and call record_decision for v3. Then write /strategies/frozen.json containing exactly:
{"version": "<champion version>", "params": {...}, "rationale": "..."}
where the version is whichever the selection rule says is champion, which may be v1 or
v2 rather than v3. After writing that file, stop."""

_ = run(V3_BRIEF)

display(Markdown("### Decision log"))
for dd_ in _decisions():
    print(f"{dd_['version']} -> champion {dd_['champion']}: {dd_['rationale'][:160]}")
print("\nfrozen:", (WS/"strategies"/"frozen.json").read_text())
```

The complete output is:

![V3 Results](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/0315d9fb-55d6-498b-bbde-5df8103e8e3c.png)

The strongest v3 configuration uses `top_n=3` and reaches a validation Sharpe of `0.5377`. That is extremely close to v1’s `0.5424`. V3 also improves validation drawdown from `-0.2954` to `-0.2884` and cuts development turnover from `11.5888` to `7.0480`.

So two of the three gates pass.

The remaining difference in validation Sharpe is only `0.0047`, which makes this one of the most important decisions in the entire experiment. It would be easy to argue that the numbers are practically identical and promote v3 because its drawdown and turnover are better.

But that would mean changing the standard after seeing the result.

The rule was fixed before v3 existed, and it requires validation Sharpe to be no worse than the incumbent. V3 misses that requirement, however narrowly.

::: note

V1 therefore remains the final champion.

:::

The coordinator writes that result to <VPIcon icon="iconfont icon-json"/>`frozen.json`, including the exact parameters that survived the complete research loop. At this point, the strategy-selection phase is over. Nothing that happens next is allowed to change which version reaches the holdout.

---

## Freeze the Champion and Unlock the Holdout

The research loop is finished, but the holdout still hasn't been exposed. Before making it available, we’ll verify that all three strategy cycles are complete and that the champion has already been frozen.

This check happens outside the agent layer in the main research process. That distinction matters. If the agents themselves could decide when to expose the holdout, the boundary would depend on agent behavior rather than on the surrounding system.

```py :collapsed-lines
frozen = json.loads((WS/"strategies"/"frozen.json").read_text())
print("frozen:", frozen)
assert len(_decisions()) == 3, f"expected 3 decisions, found {len(_decisions())}"
for v in ["v1","v2","v3"]:
    assert (WS/"reviews"/f"{v}.md").exists(), f"missing review for {v}"
    assert not pd.read_csv(REGISTRY).query(f"version=='{v}' and status=='ok'").empty, f"no runs for {v}"
print("all three cycles complete")

for field in ["adj_close","close","volume"]:
    DATA["holdout"][field].to_parquet(WS/"data"/f"holdout_{field}.parquet")

final = {}
for split in ["dev","val","holdout"]:
    res = run_isolated(WS/"strategies"/f"{frozen['version']}.py", frozen["params"], split)
    assert res["ok"], res["error"]
    final[split] = res["metrics"]
    plt.plot(pd.Series(res["equity"], index=pd.to_datetime(res["dates"])), label=split)
plt.yscale("log"); plt.legend(); plt.title(f"frozen {frozen['version']} across all periods"); plt.show()

(WS/"results"/"holdout.json").write_text(json.dumps(final, indent=2))
BENCH_HOLD = benchmark_table("holdout")
comparison = pd.concat([pd.DataFrame(final).T.assign(source="strategy"),
                        BENCH_HOLD.assign(source="benchmark_holdout")])
comparison[["cagr","sharpe","sortino","max_dd","ann_turnover","source"]]
```

The checks confirm that the same `v1` configuration selected before the holdout is still frozen:

```plaintext
frozen: {
    'version': 'v1',
    'params': {
        'mom_window': 126,
        'vol_short': 20,
        'vol_long': 120,
        'vol_ratio_min': 1.0,
        'top_n': 2
    },
    'rationale': "V1 remains champion after v3 failed the required validation-Sharpe gate (0.538 versus v1's 0.542), although v3 passed the validation-drawdown and development-turnover gates."
}
all three cycles complete
```

Only after those checks pass does the workflow make the holdout data available and evaluate the frozen strategy.

![Frozen V1 Across All Periods](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f1546e12-2fbb-4a7f-9c86-bb6754040224.png)

The equity plot shows the same frozen v1 configuration across development, validation, and holdout.

Each period is evaluated separately, so the three lines shouldn't be read as one continuous compounded portfolio. What matters here is that the strategy logic and parameters remain unchanged across all three periods.

The final comparison is:

![Final Results Comparison](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/9b775677-4605-4496-8307-ef639fe06179.png)

On the unseen holdout, frozen `v1` produces a `13.98%` CAGR and a `0.7962` Sharpe. Both are higher than SPY buy-and-hold, equal-weight buy-and-hold, plain momentum, and the volume-momentum benchmark over the same period.

Its maximum drawdown of `-23.04%` is also slightly smaller than SPY’s and plain momentum’s, although equal-weight buy-and-hold remains better on drawdown at `-18.23%`.

This is a favorable result, but it doesn't change what we learned before the holdout. V1 still had a much weaker validation Sharpe than the simpler benchmarks, and it was frozen before any of these numbers existed.

The holdout gives us one unseen evaluation of that precommitted strategy. It doesn't give us a second chance to decide which strategy we wanted to test.

---

## Audit the Complete Research Trail

Before ending the experiment, we’ll give the coordinator one final task: review the complete trail after everything has already been frozen.

At this point, the result can't change the strategy. The coordinator receives the frozen configuration, metrics from all three periods, the holdout benchmarks, experiment registry, decision history, and critic reviews. I’ll also explicitly tell it not to defend the outcome.

```py
REPORT_BRIEF = f"""The holdout has been run once and the strategy is frozen. Nothing can change now.

Frozen: {json.dumps(frozen)}
Metrics by period: {json.dumps(final)}
Holdout benchmarks: {BENCH_HOLD[COLS_B].to_json()}

Call read_registry once with no argument, read /decisions.jsonl and every file in
/reviews/, then write /report.md covering:

1. What changed at each version and what evidence drove it
2. How the selection rule decided each champion, including gates that failed
3. Whether the revisions improved the research case, separately from returns
4. How the frozen strategy compares to SPY buy-and-hold, equal-weight buy-and-hold,
   and plain momentum on the holdout
5. Whether the volume filter earned its turnover
6. Where you made weak decisions, accepted thin evidence, or got lucky

Cite run numbers from the registry. Do not defend the result."""

_ = run(REPORT_BRIEF)
```

![Report response](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/e02a1ee7-df69-47e0-b403-9eb9f5a191d6.png)

Let’s render that report alongside the full experiment registry and verify that every version still has its corresponding run, decision, and critic review:

```py
display(Markdown("## Agent report"))
display(Markdown((WS / "report.md").read_text(encoding="utf-8")))

display(Markdown("## Experiment registry"))
reg = pd.read_csv(REGISTRY)
display(reg[["version","run","status","params","dev_sharpe","dev_sortino",
             "dev_max_dd","dev_turnover","val_sharpe","val_max_dd","dev_cagr_20bps"]])
print("versions with runs:", sorted(reg["version"].unique()))
print("decisions recorded:", [d["version"] for d in _decisions()])
print("reviews on disk:  ", sorted(p.stem for p in (WS/"reviews").glob("*.md")))
```

The audit is more useful as a review of how the research was conducted than as another performance comparison.

It exposes three clear weaknesses. V2 tested a substantial regime change at only one configuration, so the development improvement had very little robustness evidence behind it. V3 then accumulated multiple differences relative to the actual champion v1, which made it difficult to isolate what caused its behavior.

More importantly, the audit catches a mistake in the critic itself. The v3 review recommends replacing the binary volume-ratio filter with volatility scaling even though v3 had already removed that filter and implemented inverse-volatility weighting. The explanation sounded reasonable, but it didn't accurately describe the strategy under review.

That's probably the strongest lesson from the audit. Separating agents by role is useful, but it doesn't guarantee that those agents understand the artifacts they're evaluating. Persisting the strategy code, experiment registry, reviews, and decisions gives us an independent record against which their reasoning can be checked.

---

## Conclusion

Finally, we’re done with the build.

We started with raw [<VPIcon icon="fas fa-globe"/>EODHD market data](https://eodhd.com/) and ended with a controlled multi-agent research system: fixed data boundaries, a deterministic backtester, benchmarks, experiment tracking, three agent roles, three strategy versions, a frozen champion, one holdout test, and a final audit of everything that happened.

And the journey was nowhere near as clean as “AI kept improving the strategy.” V2 looked much better in development and failed validation. V3 missed v1 by just `0.0047` Sharpe. The critic even misunderstood the strategy it was reviewing.

Weirdly, those messy parts are what made the experiment worth doing. They showed exactly why the controls around the agents matter.

There's still plenty to tighten, from stronger robustness checks and cleaner one-change attribution to independent critics and parameter-stability testing.

But the takeaway is simple: agents can be genuinely useful for generating and challenging research ideas. They just shouldn’t get to control the evidence that decides whether those ideas survive.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multi-Agent Trading Research System with LangChain Deep Agents [Full Handbook]",
  "desc": "A trading research agent can write strategy code, run a backtest, inspect the results, and keep revising the strategy. The harder problem is making sure that this loop doesn't turn into an uncontrolle",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multi-agent-trading-research-system-with-langchain-deep-agents-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
