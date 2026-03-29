---
lang: en-US
title: "How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]"
description: "Article(s) > How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]"
icon: fa-brands fa-python
category:
  - Python
  - NumPy
  - Pandas
  - Matplotlib
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - numpy
  - py-numpy
  - pandas
  - py-pandas
  - matplotlib
  - py-matplotlib
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]"
    - property: og:description
      content: "How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-positioning-based-crude-oil-strategy-in-python.html
prev: /programming/py-numpy/articles/README.md
date: 2026-04-11
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c18002cf-6519-4b76-b068-3b443cb0f347.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]"
  desc="Commitment of Traders (COT) data gets referenced a lot in commodity trading, especially when people talk about crowded positioning, speculative sentiment, or reversal risk. But most of that discussion"
  url="https://freecodecamp.org/news/build-a-positioning-based-crude-oil-strategy-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c18002cf-6519-4b76-b068-3b443cb0f347.png"/>

Commitment of Traders (COT) data gets referenced a lot in commodity trading, especially when people talk about crowded positioning, speculative sentiment, or reversal risk. But most of that discussion stays at the idea level. It rarely becomes a rule that can actually be tested.

That was the starting point for this project.

I wanted to see whether crude oil positioning data could be turned into something more useful than a vague market read. Not a polished macro narrative. An actual strategy framework that could be coded, tested, and challenged.

The goal here was not to begin with a finished strategy. It was to start with a reasonable hypothesis, build the signal step by step, and see what survived once the data was involved.

For this, I used FinancialModelingPrep’s Commitment of Traders data along with historical West Texas Intermediate (WTI) crude oil prices. The first idea was simple: if speculative positioning becomes extreme, maybe that tells us something about what crude oil might do next. But as the build progressed, that idea had to be narrowed, filtered, and reworked before it became usable.

So this article is not a clean showcase of a strategy that worked on the first try. It's the full process of getting there.

::: note Prerequisites

To follow along with this article, you'll need a basic familiarity with Python and the pandas library, as we'll do most of the data manipulation and analysis using DataFrames. The following packages should be installed in your environment: `requests`, `numpy`, `pandas`, and `matplotlib`.

You'll also need a FinancialModelingPrep API key required to pull both the COT and WTI crude oil price data. If you don't have one, you can register for a free account on the FinancialModelingPrep website.

Finally, a general understanding of what the Commitment of Traders report is and what non-commercial positioning represents will help you follow the reasoning behind the signal construction, though it's not strictly necessary to get value from the code itself.

This article also assumes some baseline familiarity with financial markets and trading concepts. If terms like long and short positioning, open interest, or speculative sentiment are unfamiliar, it may be worth spending a little time with those before diving in.

:::

---

## The Initial Idea: Use Positioning Extremes to Define Market Regimes

The first version of the idea was not a trading rule. It was a framework.

If speculative positioning in crude oil becomes extreme, that probably means different things depending on what happens next. A market that is heavily long and still getting more crowded is not the same as a market that is heavily long but starting to unwind. The same logic applies on the bearish side too.

So instead of forcing one blunt signal like “extreme long means short” or “extreme short means buy,” I started by splitting the market into regimes.

The two variables I used were simple. First, how extreme positioning is relative to recent history. Second, whether that positioning is still building or starting to reverse.

That gave me four possible states:

- bullish buildup
- bullish unwind
- bearish buildup
- bearish unwind

This felt like a better starting point than jumping straight into a strategy. It let me treat COT data as a way to describe market state first, then test whether any of those states actually led to useful price behavior.

At this stage, I still didn't know whether any of these regimes would hold up. The point was just to create a structure that could be tested properly.

---

## Importing Packages

We’ll keep the packages import minimal and simple.

```py
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

plt.rcParams["figure.figsize"] = (14,6)
plt.style.use("ggplot")

api_key = "YOUR FMP API KEY"
base_url = "https://financialmodelingprep.com/stable" 
```

Nothing fancy here. Make sure to replace YOUR FMP API KEY with your actual FMP API key. If you don’t have one, you can obtain it by opening a FMP developer account.

---

## Pulling the Data: COT + WTI Crude Prices using FMP APIs

To build this strategy, I needed two datasets. First, I needed COT data for crude oil. Second, I needed historical WTI crude oil prices.

I started with the COT market list to identify the correct crude oil contract.

```py
url = f"{base_url}/commitment-of-traders-list?apikey={api_key}"
r = requests.get(url)
cot_list = pd.DataFrame(r.json())

crude_candidates = cot_list[
    cot_list.astype(str)
    .apply(lambda col: col.str.contains("crude", case=False, na=False))
    .any(axis=1)
]

crude_candidates
```

![COT market list](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f6de5da0-9876-4928-8b36-59730cab64e2.png)

This gives a filtered list of crude-related contracts from the COT universe. In this case, the key contract I used was CL.

```py
cot_symbol = "CL"
start_date = "2010-01-01"
end_date = "2026-03-20"

url = f"{base_url}/commitment-of-traders-report?symbol={cot_symbol}&from={start_date}&to={end_date}&apikey={api_key}"
r = requests.get(url)

cot_df = pd.DataFrame(r.json())
cot_df["date"] = pd.to_datetime(cot_df["date"])
cot_df = cot_df.sort_values("date").drop_duplicates(subset="date").reset_index(drop=True)
cot_df = cot_df.rename(columns={"date": "cot_date"})

cot_df.head()
```

This returns the weekly COT records for crude oil:

![Weekly COT crude oil data](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/7ac107b3-dda6-4568-b535-9ab5533448e1.png)

The main fields I needed later were:

- `date`
- `openInterestAll`
- `noncommPositionsLongAll`
- `noncommPositionsShortAll`

Next, I pulled the WTI crude oil price data using FMP’s commodity price endpoint.

```py
price_symbol = "CLUSD"
start_date = "2010-01-01"
end_date = "2026-03-20"

url = f"{base_url}/historical-price-eod/full?symbol={price_symbol}&from={start_date}&to={end_date}&apikey={api_key}"
r = requests.get(url)

price_df = pd.DataFrame(r.json())
price_df["date"] = pd.to_datetime(price_df["date"])
price_df = price_df.sort_values("date").drop_duplicates(subset="date").reset_index(drop=True)

price_df
```

![WTI crude oil price data](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/6bbd3f99-618f-4e80-a2e4-04157f108b9c.png)

Since the COT dataset is weekly, I converted the price series into weekly bars using the Friday close.

```py
price_df["date"] = pd.to_datetime(price_df["date"])
price_df = price_df.sort_values("date").drop_duplicates(subset="date").reset_index(drop=True)

weekly_price = price_df.set_index("date").resample("W-FRI").agg({
    "symbol": "last",
    "open": "first",
    "high": "max",
    "low": "min",
    "close": "last",
    "volume": "sum",
    "vwap": "mean"
}).dropna().reset_index()

weekly_price["weekly_return"] = weekly_price["close"].pct_change()
weekly_price = weekly_price.rename(columns={"date": "price_date"})

weekly_price
```

This step matters because the two datasets need to live on the same time scale. If I kept prices daily while COT stayed weekly, the signal alignment would become messy very quickly.

![WTI crude oil price data weekly](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/cba82494-e180-4278-ac41-a5f3490346f5.png)

Finally, I aligned each COT observation with the next weekly WTI price bar.

```py
merged_df = pd.merge_asof(
    cot_df.sort_values("cot_date"),
    weekly_price.sort_values("price_date"),
    left_on="cot_date",
    right_on="price_date",
    direction="forward"
)

merged_df[["cot_date", "price_date", "close", "weekly_return", "openInterestAll", "noncommPositionsLongAll", "noncommPositionsShortAll"]]
```

![COT & Price Data merged](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/65b8ed6d-d4ef-43f5-99a2-1b4a5fd80459.png)

The output is one clean working table with:

- the COT report date
- the matched WTI weekly price date
- weekly crude price data
- the main positioning fields needed for feature engineering

That is the full base dataset for the strategy. With this in place, the next step is to turn the raw positioning data into something more useful.

---

## Turning Raw COT Data Into Usable Features

At this point, the raw data was ready, but it still wasn't useful as a signal. The COT report gives positioning numbers, but those numbers by themselves don't say much unless they're turned into something comparable over time.

So the next step was to build a few features that could describe positioning in a more meaningful way.

I started with the net non-commercial position. This is just the difference between non-commercial longs and non-commercial shorts.

```py
merged_df["net_position"] = merged_df["noncommPositionsLongAll"] - merged_df["noncommPositionsShortAll"]
```

This gives the raw speculative bias. A positive value means non-commercial traders are net long. A negative value means they're net short.

But raw net positioning has a problem. The size of the market changes over time, so a value that looked extreme in one period may not mean the same thing in another. To fix that, I normalized it by open interest.

```py
merged_df["net_position_ratio"] = merged_df["net_position"] / merged_df["openInterestAll"]
```

This made the signal much more useful. Instead of looking at absolute positioning, I was now looking at positioning as a share of the total market.

Next, I needed to know whether that positioning was still building or starting to unwind. For that, I calculated the week-over-week change in the ratio.

```py
merged_df["net_position_ratio_change"] = merged_df["net_position_ratio"].diff()
```

This was important because the direction of change adds context. An extreme long position that's still increasing isn't the same as an extreme long position that has started to fall.

The last feature was the most important one: a rolling percentile of the positioning ratio. I used a 104-week window.

```py
def rolling_percentile(x):
    return pd.Series(x).rank(pct=True).iloc[-1]

merged_df["position_percentile_104"] = merged_df["net_position_ratio"].rolling(104).apply(rolling_percentile)
```

This tells us how extreme the current positioning is relative to the last two years. A value above 0.80 means the market is in the top 20% of bullish positioning relative to that recent history. A value below 0.20 means the market is in the bottom 20%.

After adding all four features, I checked the output.

```py
merged_df[["cot_date","price_date","net_position","net_position_ratio","net_position_ratio_change","position_percentile_104"]]
```

![final merged_df](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/a94f7dee-fdc6-4495-829a-eee72d95a43d.png)

The first few rows of `net_position_ratio_change` were `NaN`, which is expected since the first row has no prior week to compare with. The first 103 rows of `position_percentile_104` were also `NaN` because the rolling window needs 104 weeks of history before it can calculate the percentile.

That was fine. What mattered was that the dataset now had four usable pieces:

- raw speculative positioning
- normalized positioning
- weekly change in positioning
- a rolling measure of how extreme that positioning is

This was the point where the COT data stopped being just a table of trader positions and started becoming something that could be turned into a regime model.

---

## Building the First Version of the Regime Model

Once the features were ready, the next step was to turn them into actual market states.

The main idea was simple: positioning extremes on their own aren't enough. A market can stay heavily long or heavily short for a long time. What matters more is what happens while positioning is extreme. Is it still building, or has it started to reverse?

That's why I used two dimensions:

- the 104-week positioning percentile
- the weekly change in the positioning ratio

With those two variables, I defined four regimes.

```py
merged_df["regime"] = "neutral"

merged_df.loc[(merged_df["position_percentile_104"] > 0.8) & (merged_df["net_position_ratio_change"] > 0), "regime"] = "bullish_buildup"
merged_df.loc[(merged_df["position_percentile_104"] > 0.8) & (merged_df["net_position_ratio_change"] < 0), "regime"] = "bullish_unwind"
merged_df.loc[(merged_df["position_percentile_104"] < 0.2) & (merged_df["net_position_ratio_change"] < 0), "regime"] = "bearish_buildup"
merged_df.loc[(merged_df["position_percentile_104"] < 0.2) & (merged_df["net_position_ratio_change"] > 0), "regime"] = "bearish_unwind"
```

Here's what each one means:

- **bullish buildup**: positioning is already very bullish, and it's still getting more bullish
- **bullish unwind**: positioning is very bullish, but that bullishness has started to fade
- **bearish buildup**: positioning is already very bearish, and it's still getting more bearish
- **bearish unwind**: positioning is very bearish, but that bearishness has started to ease

Anything that didn't meet one of those extreme conditions stayed in the `neutral` bucket.

After assigning the regimes, I checked how many observations fell into each one.

```py
print(merged_df["regime"].value_counts())
```

![regime count](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5133085c-281c-46fc-8ab6-fa414aa1d682.png)

This output matters because it tells us whether the framework is usable or too sparse. In this case, neutral was still the largest group, which is expected. Most weeks shouldn't be extreme. The four regime buckets were smaller, but still had enough observations to test properly.

I also looked at a sample of the classified rows.

```py
merged_df[["cot_date","price_date","net_position_ratio","net_position_ratio_change","position_percentile_104","regime"]].tail(10)
```

![merged_df + regime](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/9dd1352c-932f-4fd9-bb84-071b61433121.png)

At this point, the raw COT data had been turned into a regime model. The next question was whether any of these regimes actually led to useful price behavior.

---

## First Test: What Happens After Each Regime?

At this point, I had a regime framework, but not a strategy. Before turning any of these states into trades, I wanted to know what crude oil actually did after each one.

So the next step was to measure forward returns after every regime over four holding windows:

- 1 week
- 2 weeks
- 4 weeks
- 8 weeks

I started by creating the forward return columns from the weekly close series.

```py
merged_df["fwd_return_1w"] = merged_df["close"].shift(-1) / merged_df["close"] - 1
merged_df["fwd_return_2w"] = merged_df["close"].shift(-2) / merged_df["close"] - 1
merged_df["fwd_return_4w"] = merged_df["close"].shift(-4) / merged_df["close"] - 1
merged_df["fwd_return_8w"] = merged_df["close"].shift(-8) / merged_df["close"] - 1

merged_df[["cot_date","price_date","close","regime","fwd_return_1w","fwd_return_2w","fwd_return_4w","fwd_return_8w"]].tail(12)
```

Each of these columns answers a simple question. If crude oil is in a given regime this week, what happens over the next 1, 2, 4, or 8 weeks?

![forward return columns from the weekly close series](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/cde3faca-cb6d-43b6-81d4-15f6ec660205.png)

The last few rows had NaN values, which is normal. There is no future price data available beyond the end of the dataset, so the longest horizons drop off first.

Next, I grouped the data by regime and calculated a few summary statistics:

- count
- average forward return
- median forward return
- hit rate

```py
regime_summary = merged_df.groupby("regime").agg(
    count=("regime", "size"),
    avg_1w=("fwd_return_1w", "mean"),
    median_1w=("fwd_return_1w", "median"),
    hit_rate_1w=("fwd_return_1w", lambda x: (x > 0).mean()),
    avg_2w=("fwd_return_2w", "mean"),
    median_2w=("fwd_return_2w", "median"),
    hit_rate_2w=("fwd_return_2w", lambda x: (x > 0).mean()),
    avg_4w=("fwd_return_4w", "mean"),
    median_4w=("fwd_return_4w", "median"),
    hit_rate_4w=("fwd_return_4w", lambda x: (x > 0).mean()),
    avg_8w=("fwd_return_8w", "mean"),
    median_8w=("fwd_return_8w", "median"),
    hit_rate_8w=("fwd_return_8w", lambda x: (x > 0).mean())
).reset_index()

regime_summary
```

![grouped data by regime](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5e522449-c64a-4a7c-a4b6-43723b3241bd.png)

This table was the first real test of the framework, and it immediately ruled out some of the original ideas.

The results weren't great for the raw regime model. In fact, they were weaker than I expected.

A few things stood out:

- `neutral` often outperformed the regime buckets
- `bullish_buildup` looked consistently weak
- `bearish_buildup` also looked weak
- `bearish_unwind` looked stronger at first glance, but some of that came from a few large upside outliers
- `bullish_unwind` was the only regime that looked somewhat stable across multiple horizons

That changed the direction of the project.

Up to this point, the plan was to build a full four-regime framework and maybe convert multiple states into trade rules. After looking at the forward returns, that no longer made sense. Most of the regimes were not adding much value.

So instead of carrying all four forward, I started focusing on the one regime that still looked promising: **bullish unwind.**

Before making that decision, I wanted to look at the distributions visually and see whether the averages were hiding anything important.

---

## Looking at the Regimes More Closely

The summary table already told me that most of the raw regime framework was weak, but I still wanted to look at the behavior visually before dropping anything.

I started with a simple chart that places WTI crude oil next to the speculative net positioning ratio.

```py
plt.plot(merged_df["price_date"], merged_df["close"], label="wti close")
plt.plot(merged_df["price_date"], merged_df["net_position_ratio"] * 100, label="net position ratio x 100")
plt.title("WTI crude oil price vs speculative net positioning")
plt.xlabel("date")
plt.ylabel("value")
plt.legend()
plt.show()
```

![WTI crude oil price vs speculative net positioning](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/e1655a05-0c3a-4d4f-8f5d-51dc20e8b305.png)

This chart isn't meant to compare the two series on the same scale. It's just a quick way to see whether large moves in crude oil tend to happen when speculative positioning is becoming stretched.

Next, I plotted the 104-week positioning percentile itself.

```py
plt.plot(merged_df["price_date"], merged_df["position_percentile_104"])
plt.axhline(0.8, linestyle="--", color="b")
plt.axhline(0.2, linestyle="--", color="b")
plt.title("104-week positioning percentile")
plt.xlabel("date")
plt.ylabel("percentile")
plt.show()
```

![104-week positioning percentile](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5547d52a-001f-4f30-9479-4414e7b74498.png)

This made the regime logic easier to understand. Any time the percentile moved above 0.80, the market entered the bullish extreme zone. Any time it dropped below 0.20, the market entered the bearish extreme zone.

Then I looked at how many observations actually fell into each regime.

```py
regime_counts = merged_df["regime"].value_counts()

plt.bar(regime_counts.index, regime_counts.values)
plt.title("Regime counts")
plt.xlabel("regime")
plt.ylabel("count")
plt.xticks(rotation=30)
plt.show()
```

![Regime counts](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/6eee2a9a-2876-41c9-9204-8d1e0b0b13f4.png)

The regime counts looked reasonable. Neutral was still the largest bucket, and the four signal regimes had enough observations to test without being too sparse.

After that, I plotted the average 4-week forward return by regime.

```py
avg_4w = regime_summary.set_index("regime")["avg_4w"].sort_values()

plt.bar(avg_4w.index, avg_4w.values)
plt.title("Average 4-week forward return by regime")
plt.xlabel("regime")
plt.ylabel("average return")
plt.xticks(rotation=30)
plt.show()
```

![Average 4-week forward return by regime](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/00ba5ce0-89df-4a9d-8559-1a96c113447b.png)

This was the first strong sign that the original framework was too broad. Both buildup regimes looked weak. `bullish_unwind` was slightly positive, but not by much. `bearish_unwind` looked strongest on average, which was interesting, but I still didn't trust that result without checking the distribution.

So I looked at the 4-week hit rate next.

```py
hit_4w = regime_summary.set_index("regime")["hit_rate_4w"].sort_values()

plt.bar(hit_4w.index, hit_4w.values)
plt.title("4-week hit rate by regime")
plt.xlabel("regime")
plt.ylabel("hit rate")
plt.xticks(rotation=30)
plt.show()
```

![4-week hit rate by regime](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/93a8bf60-3c69-4c6d-a198-85cda789d3dc.png)

The hit rates told a similar story. `bullish_unwind` was one of the better regimes, but still not strong enough to justify calling it a strategy. `neutral` was still doing too well, which meant the regime filter wasn't creating a very clean edge yet.

At that point, I wanted to check whether the averages were being distorted by a few large moves. So I plotted the 4-week return distribution for each regime.

```py
plot_df = merged_df[["regime", "fwd_return_4w"]].dropna()

plot_df.boxplot(column="fwd_return_4w", by="regime", grid=False)
plt.title("4-week forward return distribution by regime")
plt.suptitle("")
plt.xlabel("regime")
plt.ylabel("4-week forward return")
plt.xticks(rotation=30)
plt.show()
```

![4-week forward return distribution by regime](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/849b0d06-0699-4482-84d3-fef2b35f3475.png)

This chart made the problem much clearer.

`bearish_unwind` looked strong on average, but that strength came from a few very large upside outliers. That made it less convincing as a base strategy.

`bullish_buildup` and `bearish_buildup` were weak both in the summary table and in the distribution.

`bullish_unwind` was the only regime that looked somewhat stable without depending too much on a handful of extreme observations.

That changed the direction of the build.

Up to this point, the idea was to test a full regime framework and maybe keep multiple paths. After these charts, that no longer made sense. Most of the framework had already done its job by showing what not to use.

So instead of carrying all four regimes forward, I narrowed the focus to just one: bullish unwind.

---

## Narrowing the Focus: Keeping Two Extra Variants for Comparison

At this point, `bullish_unwind` was already the main regime worth paying attention to. The buildup regimes were weak, and `bearish_unwind` was less convincing because a big part of its strength came from a few outsized moves.

So the focus was already shifting toward `bullish_unwind`.

Still, before fully committing to it, I kept two additional unwind-based variants in the next step just for comparison:

- a long signal based on `bearish_unwind`
- a combined long signal that fires on either unwind regime

That way, the first round of backtests could show whether `bullish_unwind` was actually better in practice, or whether the broader unwind logic worked better as a whole.

```py
merged_df["long_bullish_unwind"] = (merged_df["regime"] == "bullish_unwind").astype(int)
merged_df["long_bearish_unwind"] = (merged_df["regime"] == "bearish_unwind").astype(int)
merged_df["long_any_unwind"] = merged_df["regime"].isin(["bullish_unwind", "bearish_unwind"]).astype(int)

print("number of trades:\n", merged_df[["long_bullish_unwind", "long_bearish_unwind", "long_any_unwind"]].sum())
merged_df[["cot_date","price_date","regime","long_bullish_unwind","long_bearish_unwind","long_any_unwind"]].tail()
```

This creates three simple binary signals:

- `long_bullish_unwind` is 1 only when the regime is bullish_unwind
- `long_bearish_unwind` is 1 only when the regime is bearish_unwind
- `long_any_unwind` is 1 when either unwind regime appears

The output also gives the number of signal occurrences for each one, which matters because the next step is a proper backtest. A signal can look interesting conceptually, but if it barely appears, there isn't much to test.

![number of signal occurrences](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/0975eaf6-a8a9-408b-a490-f71559fc0f7b.png)

So going into the strategy layer, bullish_unwind was already the main path. The other two were still kept around, but mainly to compare how much weaker or stronger they looked once the trades were actually executed.

---

## Building the First Trade Rules

Once the three unwind-based signals were ready, the next step was to turn them into actual trades.

I kept the backtest simple on purpose:

- long-only
- 4-week holding period
- non-overlapping trades

The non-overlapping part matters. If a new signal appeared while a current trade was still active, I skipped it. That kept the trade list cleaner and avoided inflating the strategy by stacking overlapping positions on top of each other.

Here is the backtest function I used.

```py
def run_fixed_hold_backtest(df, signal_col, hold_weeks=4):
    trades = []
    i = 0

    while i < len(df) - hold_weeks:
        if df.iloc[i][signal_col] == 1:
            entry_date = df.iloc[i]["price_date"]
            exit_date = df.iloc[i + hold_weeks]["price_date"]
            entry_price = df.iloc[i]["close"]
            exit_price = df.iloc[i + hold_weeks]["close"]
            trade_return = exit_price / entry_price - 1

            trades.append({
                "signal": signal_col,
                "entry_index": i,
                "exit_index": i + hold_weeks,
                "entry_date": entry_date,
                "exit_date": exit_date,
                "entry_price": entry_price,
                "exit_price": exit_price,
                "trade_return": trade_return
            })

            i += hold_weeks
        else:
            i += 1

    return pd.DataFrame(trades)
```

This function scans through the dataset, checks whether a signal is active, enters at the current weekly bar, exits four weeks later, and records the trade result.

Then I ran it for all three unwind-based signals.

```py
bullish_unwind_trades = run_fixed_hold_backtest(merged_df, "long_bullish_unwind", hold_weeks=4)
bearish_unwind_trades = run_fixed_hold_backtest(merged_df, "long_bearish_unwind", hold_weeks=4)
any_unwind_trades = run_fixed_hold_backtest(merged_df, "long_any_unwind", hold_weeks=4)
```

After that, I checked how many trades were actually executed.

```py
print("executed bullish_unwind trades:", len(bullish_unwind_trades))
print("executed bearish_unwind trades:", len(bearish_unwind_trades))
print("executed any_unwind trades:", len(any_unwind_trades))
```

![executed trades](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/e6e87883-fe88-4b04-9c55-8dd71aaf92b3.png)

This output was lower than the raw signal counts from the previous section, which is expected because overlapping signals were skipped.

Next, I built a small helper function to summarize the trade results and applied it to all three strategies.

```py
def summarize_trades(trades):
    return pd.Series({
        "trades": len(trades),
        "win_rate": (trades["trade_return"] > 0).mean(),
        "avg_trade_return": trades["trade_return"].mean(),
        "median_trade_return": trades["trade_return"].median(),
        "cumulative_return": (1 + trades["trade_return"]).prod() - 1
    })

trade_summary = pd.DataFrame({
    "bullish_unwind": summarize_trades(bullish_unwind_trades),
    "bearish_unwind": summarize_trades(bearish_unwind_trades),
    "any_unwind": summarize_trades(any_unwind_trades)
}).T

trade_summary
```

![backtest results](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/da0d8d65-74a4-4ec9-9af5-24a0a0e14b77.png)

This was the first full strategy result, and it cleared up the hierarchy very quickly.

`bullish_unwind` was still the best of the three. It wasn't strong yet, but it was clearly better than the other two.

A few things stood out:

- `bullish_unwind` had the best win rate
- `bullish_unwind` had the best average and median trade return
- `bearish_unwind` and `any_unwind` both performed badly on a cumulative basis
- Combining the two unwind regimes didn't help, just diluted the stronger one

I also wanted to see how these strategies behaved over time, not just in a summary table. So I added simple equity curves for each one.

```py

bullish_unwind_trades["equity_curve"] = (1 + bullish_unwind_trades["trade_return"]).cumprod()
bearish_unwind_trades["equity_curve"] = (1 + bearish_unwind_trades["trade_return"]).cumprod()
any_unwind_trades["equity_curve"] = (1 + any_unwind_trades["trade_return"]).cumprod()

plt.plot(bullish_unwind_trades["exit_date"], bullish_unwind_trades["equity_curve"], label="bullish unwind")
plt.plot(bearish_unwind_trades["exit_date"], bearish_unwind_trades["equity_curve"], label="bearish unwind")
plt.plot(any_unwind_trades["exit_date"], any_unwind_trades["equity_curve"], label="any unwind")
plt.title("Equity curves for 4-week unwind strategies")
plt.xlabel("date")
plt.ylabel("equity multiple")
plt.legend()
plt.show()
```

![Equity curves for 4-week unwind strategies](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/52a0865f-9054-497c-b3de-7e0ec13c28fc.png)

This chart made the same point more clearly. `bullish_unwind` was still weak in absolute terms, but it held up much better than the other two. `bearish_unwind` didn't survive the conversion from regime idea to actual strategy, and `any_unwind` was even worse because it inherited the weakness of both.

So by the end of this step, the picture was much clearer.

The broader unwind idea didn't work well as a whole. `bearish_unwind` wasn't holding up in a clean backtest. `any_unwind` was even worse. That left only one regime worth carrying further: `bullish unwind`.

Still, even that result wasn't strong enough yet. The strategy was better than the alternatives, but not good enough to stop here. In fact, we haven’t even made a profit yet.

The next step was to compare it against buy-and-hold and see whether it actually added anything useful.

---

## Comparing Bullish Unwind Against Buy-and-Hold

By this point, `bullish_unwind` had already beaten the other regime-based variants. But that still did not mean much on its own.

A strategy can look decent relative to weaker alternatives and still fail the most basic test: does it do anything better than just holding crude oil?

So the next step was to compare the raw `bullish_unwind` strategy against a simple buy-and-hold benchmark.

I started by building the buy-and-hold curve from the weekly WTI price series.

```py
buy_hold_df = weekly_price.copy()
buy_hold_df = buy_hold_df.sort_values("price_date").reset_index(drop=True)
buy_hold_df["buy_hold_curve"] = buy_hold_df["close"] / buy_hold_df["close"].iloc[0]

buy_hold_df[["price_date", "close", "buy_hold_curve"]].tail()
```

![buy/hold data](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c0a025b3-364e-46a0-b136-d24336010c52.png)

Then I plotted buy-and-hold against the raw `bullish_unwind` strategy.

```py
plt.plot(buy_hold_df["price_date"], buy_hold_df["buy_hold_curve"], label="buy and hold wti", linewidth=2, alpha=0.5)
plt.plot(bullish_unwind_trades["exit_date"], bullish_unwind_trades["equity_curve"], label="bullish unwind strategy", color="b")
plt.title("Bullish unwind strategy vs buy and hold crude oil")
plt.xlabel("date")
plt.ylabel("equity multiple")
plt.legend()
plt.show()
```

![Bullish unwind strategy vs buy and hold crude oil](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/7de51477-a1b3-4ab4-b5c3-b82589f907b9.png)

The chart was useful because it showed the exact problem with the raw signal. `bullish_unwind` was more selective than buy-and-hold, but that selectivity was not creating a real edge. The strategy had some decent stretches, but it still lagged the simpler benchmark overall.

To make that comparison more explicit, I calculated the full buy-and-hold return over the sample, then I put both results into one small summary table.

```py
buy_hold_return = buy_hold_df["buy_hold_curve"].iloc[-1] - 1

comparison_summary = pd.DataFrame({
    "strategy": ["bullish_unwind", "buy_and_hold"],
    "trades": [len(bullish_unwind_trades), np.nan],
    "win_rate": [(bullish_unwind_trades["trade_return"] > 0).mean(), np.nan],
    "avg_trade_return": [bullish_unwind_trades["trade_return"].mean(), np.nan],
    "cumulative_return": [
        (1 + bullish_unwind_trades["trade_return"]).prod() - 1,
        buy_hold_return
    ]
})

comparison_summary
```

![strategy vs b/h returns comparison](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/fe0f4949-ac97-4918-a388-43092f3215c5.png)

This was the real turning point in the article.

Even though `bullish_unwind` was the best regime-based candidate so far, it still underperformed buy-and-hold. That made the conclusion very clear: the raw signal wasn't strong enough yet.

So this was no longer a question of choosing between regimes. That part was already settled. The real question now was whether the bullish_unwind setup could be improved without turning the strategy into something over-engineered.

That's what led to the next step: adding a simple trend filter.

---

## Adding a Trend Filter

At this point, the core signal had been narrowed to `bullish_unwind`, but the raw version still wasn't good enough. It underperformed buy-and-hold, which meant the signal needed more context.

The next idea was simple: not every bullish unwind should be treated the same way. If speculative positioning is starting to unwind while crude oil is already in a weak broader trend, that long signal may not be worth taking. So I added one basic filter: only take the `bullish_unwind` trade when WTI is above its 26-week moving average.

First, I created the moving average and a binary trend flag. Then I combined that filter with the existing `bullish_unwind` regime.

```py
merged_df["ma_26"] = merged_df["close"].rolling(26).mean()
merged_df["above_ma_26"] = (merged_df["close"] > merged_df["ma_26"]).astype(int)
merged_df["long_bullish_unwind_tf"] = ((merged_df["regime"] == "bullish_unwind") & (merged_df["above_ma_26"] == 1)).astype(int)
```

This creates a filtered version of the original signal. The output also shows how many trade opportunities remain after applying the trend filter. As expected, the number drops. That isn't a problem if the remaining trades are better.

Next, I ran the same 4-week non-overlapping backtest on the filtered signal.

```py
bullish_unwind_tf_trades = run_fixed_hold_backtest(
    merged_df,
    "long_bullish_unwind_tf",
    hold_weeks=4
)

filtered_summary = pd.DataFrame({
    "bullish_unwind": summarize_trades(bullish_unwind_trades),
    "bullish_unwind_tf": summarize_trades(bullish_unwind_tf_trades)
}).T

filtered_summary
```

![original vs optimized strategy performance](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/7ab5d6b1-6ebc-4d6a-870a-a9b4048b5386.png)

This was the first major improvement in the process.

The filtered version didn't just look slightly better. It changed the profile of the strategy in a meaningful way:

- fewer trades
- higher win rate
- higher average trade return
- much stronger cumulative return

That was exactly what I wanted from a filter. It made the signal more selective, but it also made it much cleaner.

To visualize the difference, I added equity curves for the raw strategy, the filtered version, and buy-and-hold.

```py
bullish_unwind_tf_trades["equity_curve"] = (1 + bullish_unwind_tf_trades["trade_return"]).cumprod()

plt.plot(bullish_unwind_trades["exit_date"], bullish_unwind_trades["equity_curve"], label="bullish unwind")
plt.plot(bullish_unwind_tf_trades["exit_date"], bullish_unwind_tf_trades["equity_curve"], label="bullish unwind + trend filter")
plt.plot(buy_hold_df["price_date"], buy_hold_df["buy_hold_curve"], label="buy and hold wti")
plt.title("Bullish unwind strategy with and without trend filter")
plt.xlabel("date")
plt.ylabel("equity multiple")
plt.legend()
plt.show()
```

![Bullish unwind strategy with and without trend filter](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/b1bda6f8-5018-4747-941f-144dc8f8960b.png)

This chart made the change easy to see. The raw strategy was drifting, while the filtered version was much more stable and clearly stronger over the full sample.

So this was the point where the strategy started becoming usable. The signal was no longer just “extreme bullish positioning is starting to unwind.” It was: **extreme bullish positioning is starting to unwind, while crude oil is still in a broader uptrend**

That was much more specific, and much more effective.

The next question was whether this improved version was actually stable, or whether it only worked because of one lucky parameter choice.

---

## Stress-Testing the Setup

Once the trend filter improved the strategy, I still didn't want to treat that version as final without checking how fragile it was.

A setup can look strong simply because one exact combination of parameters happened to work. So the next step was to test nearby variations and see whether the result still held up.

I kept the core idea the same:

- bullish unwind
- long-only
- trend filter stays on

Then I varied three things:

- the percentile window
- the threshold that defines an extreme
- the holding period

First, I created a helper function to build bullish unwind signals using different percentile columns and threshold levels, and then, a second percentile series using a shorter 52-week window.

```py
def add_bullish_unwind_signal(df, percentile_col, high_threshold, signal_name):
    df[signal_name] = (
        (df[percentile_col] > high_threshold) &
        (df["net_position_ratio_change"] < 0) &
        (df["above_ma_26"] == 1)
    ).astype(int)
    
def rolling_percentile(x):
    return pd.Series(x).rank(pct=True).iloc[-1]

merged_df["position_percentile_52"] = merged_df["net_position_ratio"].rolling(52).apply(rolling_percentile)
```

With that in place, I built four signal variants:

- 104-week percentile with an 80th percentile threshold
- 104-week percentile with an 85th percentile threshold
- 52-week percentile with an 80th percentile threshold
- 52-week percentile with an 85th percentile threshold

```py
add_bullish_unwind_signal(merged_df, "position_percentile_104", 0.80, "sig_104_80")
add_bullish_unwind_signal(merged_df, "position_percentile_104", 0.85, "sig_104_85")
add_bullish_unwind_signal(merged_df, "position_percentile_52", 0.80, "sig_52_80")
add_bullish_unwind_signal(merged_df, "position_percentile_52", 0.85, "sig_52_85")
```

After that, I ran the same backtest across three holding periods:

- 2 weeks
- 4 weeks
- 8 weeks

```py
results = []

for signal_col in ["sig_104_80", "sig_104_85", "sig_52_80", "sig_52_85"]:
    for hold_weeks in [2, 4, 8]:
        trades = run_fixed_hold_backtest(merged_df, signal_col, hold_weeks=hold_weeks)

        if len(trades) == 0:
            continue

        results.append({
            "signal": signal_col,
            "hold_weeks": hold_weeks,
            "trades": len(trades),
            "win_rate": (trades["trade_return"] > 0).mean(),
            "avg_trade_return": trades["trade_return"].mean(),
            "median_trade_return": trades["trade_return"].median(),
            "cumulative_return": (1 + trades["trade_return"]).prod() - 1
        })

stress_test = pd.DataFrame(results)
stress_test
```

![backtest across three holding periods](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ee70c28c-86a6-4ede-821f-cde23b36cad9.png)

This output was one of the most important parts of the entire article. It showed whether the improved strategy was actually stable, or whether it only worked in one narrow version.

A few things stood out immediately.

The **104-week / 80th percentile** version was clearly the strongest family. It held up across all three holding periods:

- 2-week hold: cumulative return **38.16%**
- 4-week hold: cumulative return **45.95%**
- 8-week hold: cumulative return **19.02%**

That consistency mattered. It meant the signal wasn't collapsing the moment the hold period changed.

The **4-week hold** stood out as the best overall choice. It had:

- **26 trades**
- **65.38% win rate**
- **1.84% average trade return**
- **3.69% median trade return**
- **45.95% cumulative return**

The **8-week hold** had a slightly higher average trade return in some cases, but it came with fewer trades. That made it thinner and harder to treat as the main version.

The **104-week / 85th percentile** setup was too restrictive for the shorter holds. Its 2-week and 4-week versions turned negative, even though the 8-week hold still worked reasonably well.

The **52-week variants** were much less convincing overall. A few of them were positive, but they were not nearly as stable as the 104-week / 80th percentile version.

So by the end of this step, the final structure wasn't just the version that happened to look good once. It was the version that kept holding up even after nearby variations were tested.

That gave me a clear final setup:

- **104-week percentile**
- **80th percentile threshold**
- **bullish unwind**
- **26-week moving average filter**
- **4-week hold**

---

## The Final Strategy

By this stage, the process had already done most of the filtering.

The raw four-regime framework didn't work well as a strategy. The broader unwind idea didn't work either. The raw `bullish_unwind` signal was better than the alternatives, but still weaker than buy-and-hold.

The only version that held up after all of that was this one:

- bullish unwind
- 104-week positioning percentile
- 80th percentile threshold
- 26-week moving average filter
- 4-week hold
- non-overlapping trades

So now it made sense to stop iterating and show the final result clearly. I first locked the final signal and reran the backtest using the chosen setup.

```py
final_signal = "sig_104_80"
final_hold = 4
final_trades = run_fixed_hold_backtest(merged_df, final_signal, hold_weeks=final_hold)
final_trades["equity_curve"] = (1 + final_trades["trade_return"]).cumprod()

final_summary = pd.DataFrame({
    "metric": [
        "trades",
        "win_rate",
        "avg_trade_return",
        "median_trade_return",
        "cumulative_return"
    ],
    "value": [
        len(final_trades),
        (final_trades["trade_return"] > 0).mean(),
        final_trades["trade_return"].mean(),
        final_trades["trade_return"].median(),
        (1 + final_trades["trade_return"]).prod() - 1
    ]
})

final_summary
```

That output gives the final performance profile:

![final performance profile](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f7f5219d-233d-4fe7-8ac9-2cee2026feeb.png)

Those numbers were already a big improvement over the earlier raw versions, but I still wanted the comparison in one place. So I built a final table against the two reference points:

- buy-and-hold
- raw bullish unwind

```py
final_comparison = pd.DataFrame({
    "strategy": ["buy_and_hold", "bullish_unwind_raw", "bullish_unwind_filtered"],
    "trades": [
        np.nan,
        len(bullish_unwind_trades),
        len(final_trades)
    ],
    "win_rate": [
        np.nan,
        (bullish_unwind_trades["trade_return"] > 0).mean(),
        (final_trades["trade_return"] > 0).mean()
    ],
    "avg_trade_return": [
        np.nan,
        bullish_unwind_trades["trade_return"].mean(),
        final_trades["trade_return"].mean()
    ],
    "cumulative_return": [
        buy_hold_return,
        (1 + bullish_unwind_trades["trade_return"]).prod() - 1,
        (1 + final_trades["trade_return"]).prod() - 1
    ]
})

final_comparison
```

![final performance comparison table](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/2b7a3779-1701-4221-9bd2-df0a4ac22de7.png)

This was the full payoff of the build:

- buy-and-hold: 13.67%
- raw bullish unwind: -2.13%
- filtered bullish unwind: 45.95%

The trend filter didn't just smooth the strategy a bit. It changed the result completely.

To make that visible, I plotted the three curves together.

```py
plt.plot(buy_hold_df["price_date"], buy_hold_df["buy_hold_curve"], label="buy and hold wti", linewidth=2, alpha=0.5)
plt.plot(bullish_unwind_trades["exit_date"], bullish_unwind_trades["equity_curve"], label="raw bullish unwind", color="indigo")
plt.plot(final_trades["exit_date"], final_trades["equity_curve"], label="filtered bullish unwind", color="b")
plt.title("Crude oil strategy comparison")
plt.xlabel("date")
plt.ylabel("equity multiple")
plt.legend()
plt.show()
```

![Crude oil strategy comparison](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f4e50969-c1b3-441e-bc7c-5e90327ef9f0.png)

This chart says the same thing as the table, but more directly. The raw signal drifts. Buy-and-hold is positive over the full sample, but much noisier. The filtered version is the only one that compounds in a cleaner way.

I also wanted to show where these filtered trades actually appear on the WTI chart.

```py
plt.plot(merged_df["price_date"], merged_df["close"], label="wti close", linewidth=2, alpha=0.5)
plt.scatter(merged_df.loc[merged_df[final_signal] == 1, "price_date"], merged_df.loc[merged_df[final_signal] == 1, "close"],
            s=25, label="filtered bullish unwind signal", color="b")
plt.title("Filtered bullish unwind signals on WTI crude oil")
plt.xlabel("date")
plt.ylabel("price")
plt.legend()
plt.show()
```

![Filtered bullish unwind signals on WTI crude oil](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c688c947-2819-47af-a825-13c0bac7b530.png)

This is useful because it shows the strategy is selective. It doesn't fire all the time. It only activates when positioning stays in an extreme bullish zone, starts to unwind, and the broader price trend is still intact.

I did the same on the positioning side.

```py
plt.plot(merged_df["price_date"], merged_df["position_percentile_104"], label="104-week percentile", linewidth=2, alpha=0.5)
plt.axhline(0.8, linestyle="--", label="80th percentile")
plt.scatter(merged_df.loc[merged_df[final_signal] == 1, "price_date"], merged_df.loc[merged_df[final_signal] == 1, "position_percentile_104"],
            s=25, label="trade signals", color="indigo")
plt.title("Bullish unwind signals from COT positioning extremes")
plt.xlabel("date")
plt.ylabel("percentile")
plt.legend()
plt.show()
```

![Bullish unwind signals from COT positioning extremes](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/85f8ae62-60ca-4de5-8074-213eb5296f92.png)

This final chart ties everything together. The trades only appear when the percentile is already in the extreme zone, which means the signal is still doing what it was originally designed to do. It's just doing it in a much more disciplined way than the raw regime framework.

---

## Further Improvements

There are still a few places where this can be pushed further.

The first is execution realism. Right now the strategy uses a clean weekly entry and exit rule, but it doesn't include slippage, spreads, or any contract-level execution constraints. Adding those would make the result stricter.

The second is signal depth. This version only uses non-commercial positioning, a trend filter, and a fixed hold period. It would be worth testing whether commercial positioning, volatility filters, or dynamic exits can improve the setup without overcomplicating it.

---

## Conclusion

This started as a broad COT idea, not a finished strategy. The first regime framework looked reasonable, but most of it didn't hold up once the data was tested. That part was important, because it made the final signal much narrower and much cleaner.

What survived was a very specific setup: extreme bullish positioning that starts to unwind, while WTI is still above its 26-week moving average. That version ended up outperforming both the raw signal and buy-and-hold over the tested sample.

The nice part is that the whole thing can be built from scratch with FinancialModelingPrep’s COT and commodity price data APIs, without needing to patch together multiple data sources. That made it much easier to go from idea to actual testing.

With that being said, you’ve reached the end of the article. Hope you learned something new and useful. Thank you for your time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Positioning-Based Crude Oil Strategy in Python [Full Handbook]",
  "desc": "Commitment of Traders (COT) data gets referenced a lot in commodity trading, especially when people talk about crowded positioning, speculative sentiment, or reversal risk. But most of that discussion",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-positioning-based-crude-oil-strategy-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
