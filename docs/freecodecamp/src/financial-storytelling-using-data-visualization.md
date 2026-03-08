---
lang: en-US
title: "A Comprehensive Guide to Financial Storytelling using Data Visualization"
description: "Article(s) > A Comprehensive Guide to Financial Storytelling using Data Visualization"
icon: 
category:
  - Python
  - Pandas
  - NumPy
  - Matplotlib
  - Finance
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
  - matplotlib
  - py-matplotlib
  - fnce
  - finance
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Comprehensive Guide to Financial Storytelling using Data Visualization"
    - property: og:description
      content: "A Comprehensive Guide to Financial Storytelling using Data Visualization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/financial-storytelling-using-data-visualization.html
prev: /programming/py-pandas/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64ab3674-959f-44b5-8be2-4ca00a798621.png
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
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Finance > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/fnce/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Comprehensive Guide to Financial Storytelling using Data Visualization"
  desc="In any analysis project, raw tables of numbers often don’t tell the full story. Visualisations simplify complexity by transforming data into shapes that our brains can quickly understand, emphasising "
  url="https://freecodecamp.org/news/financial-storytelling-using-data-visualization"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64ab3674-959f-44b5-8be2-4ca00a798621.png"/>

In any analysis project, raw tables of numbers often don’t tell the full story. Visualisations simplify complexity by transforming data into shapes that our brains can quickly understand, emphasising trends, outliers, and regime shifts that might be overlooked in raw data.

This is especially vital in finance and trading, where clear visuals can uncover risks, opportunities, and patterns, directly affecting decisions on position sizing, timing, and confidence.

Today, we'll use FMP APIs to interpret earnings data: extracting announcements, surprises, and price reactions across almost 1,000 stocks to identify actionable patterns in post‑earnings movements.

Here’s exactly what we’ll build:

- **Sector heatmap**: Maps strongest 3/10-day post-earnings reactions by sector/market-cap buckets.
- **EPS scatter**: Tests if earnings beats drive returns (sector-colored, with regression).
- **Return violins**: Shows 3-day post-earnings volatility/skew by sector and market-cap.
- **Mega-tech time series**: Tracks AAPL/MSFT/NVDA post-earnings patterns over time.
- **Monthly seasonality**: Reveals calendar edges in post-earnings returns/surprises.
- **Regime cross-section**: Tests sector robustness across bull/bear/sideways markets.

::: note Prerequisites

To follow along, you should be comfortable with Python and basic data manipulation in pandas.

This is a code-first guide. I’ll focus on the workflow and the story the charts reveal, and I won’t explain every line of Python. You should be comfortable reading pandas code, loops, and basic plotting logic so you can follow along without needing a step-by-step breakdown of each block.

You’ll need:

- Python 3.10+
- A Financial Modeling Prep (FMP) API key
- pandas, numpy, matplotlib, seaborn, scipy installed
- Enough local compute and patience to run API loops across a large stock universe

:::

---

## Data Extraction

In the first part of this article, we need to collect all the data required for our visualisation exercise. Using FMP’s Stock Screener API, we will retrieve NASDAQ stocks. The first API call will return 1,000 stocks.

```py
import requests
import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

token = 'YOUR FMP TOKEN'

url = f'https://financialmodelingprep.com/stable/company-screener'
querystring = {"apikey":token,"country":"US", "exchange": "NASDAQ", "isActiveTrading": True, "isEtf": False, "isFund": False}
resp = requests.get(url, querystring).json()

df_universe = pd.DataFrame(resp)
df_universe = df_universe[df_universe['exchangeShortName'] == 'NASDAQ']
df_universe
```

This will give us 1,000 stocks! Next, we'll bin the market capitalisation to gain a better understanding of the results later on, and we will keep only four columns that are necessary: the symbol, name, market cap, and sector.

```py
bins = [0,
        250_000_000,    # 250M
        2_000_000_000,  # 2B
        10_000_000_000, # 10B
        200_000_000_000,# 200B
        float("inf")]

labels = ["Micro", "Small", "Mid", "Large", "Mega"]

df_universe["marketCap"] = pd.cut(df_universe["marketCap"], bins=bins, labels=labels, right=False)
df_universe = df_universe[['symbol', 'companyName', 'marketCap', 'sector']]
df_universe
```

![](https://cdn-images-1.medium.com/max/1000/0*rAiF7Q5TqSNlRG4h.png)

Now it is time to retrieve the earnings using FMP’s Earnings Report API. We'll loop through each symbol and collect all the earnings the endpoint provides to us.

```py
symbols = df_universe['symbol'].to_list()

all_dfs = []

for symbol in symbols:
    url = f"https://financialmodelingprep.com/stable/earnings?symbol={symbol}"
    params = {"apikey": token}
    resp = requests.get(url, params=params)

    if resp.status_code != 200:
        print(f"Error for {symbol}: {resp.status_code} - {resp.text}")
        continue

    data = resp.json()
    if not data:
        print(f"No data for {symbol}")
        continue

    df_symbol = pd.DataFrame(data)
    df_symbol["symbol"] = symbol
    all_dfs.append(df_symbol)

# Single DataFrame with all earnings
df_earnings = pd.concat(all_dfs, ignore_index=True)
df_earnings = df_earnings.dropna(subset=['epsActual', 'epsEstimated', 'revenueActual','revenueEstimated'])
df_earnings
```

Now we'll calculate the surprise, both for earnings and revenue in percentage terms, so we can later compare apples with apples! We'll keep everything from 2010 onwards.

```py
df_earnings["eps_surprise"] = ((df_earnings["epsActual"] - df_earnings["epsEstimated"]) /
                               abs(df_earnings["epsEstimated"]) * 100).round(2)

df_earnings["revenue_surprise"] = ((df_earnings["revenueActual"] - df_earnings["revenueEstimated"]) /
                                   abs(df_earnings["revenueEstimated"]) * 100).round(2)

df_earnings = df_earnings[['symbol', 'date', 'eps_surprise', 'revenue_surprise']]

df_earnings["date"] = pd.to_datetime(df_earnings["date"])
df_earnings = df_earnings[df_earnings["date"] > "2009-12-31"]
```

Lastly, as a final step in gathering the data needed for visualization, using FMP’s Historical Index Full Chart API, we'll loop through the stocks in our dataframe, retrieve the historical daily prices, and calculate the return of the stock 3 and 10 trading days before and after the earnings announcement.

```py :collapsed-lines
unique_symbols = df_earnings["symbol"].unique()

price_results = []

print(f"Processing {len(unique_symbols)} symbols...")

for symbol in unique_symbols:
    # Fetch full historical prices
    url = f"https://financialmodelingprep.com/stable/historical-price-eod/full"
    params = {"apikey":token, "symbol":symbol, "from":'2009-10-01'}
    resp = requests.get(url, params=params)

    if resp.status_code != 200:
        print(f"Error for {symbol}: {resp.status_code}")
        continue

    data = resp.json()

    hist_df = pd.DataFrame(data)
    hist_df["date"] = pd.to_datetime(hist_df["date"])
    hist_df = hist_df.sort_values("date").reset_index(drop=True)

    # Get matching earnings rows
    earnings_symbol = df_earnings[df_earnings["symbol"] == symbol].copy()

    for _, row in earnings_symbol.iterrows():
        earn_date = pd.to_datetime(row["date"]).date()

        # === 3-DAY WINDOWS ===
        pre3_mask = (hist_df["date"].dt.date < earn_date) & \
                    (hist_df["date"].dt.date >= earn_date - timedelta(days=10))
        pre3 = hist_df[pre3_mask].tail(3)

        post3_mask = (hist_df["date"].dt.date > earn_date) & \
                     (hist_df["date"].dt.date <= earn_date + timedelta(days=10))
        post3 = hist_df[post3_mask].head(3)

        pre3_start = pre3["close"].iloc[0] if len(pre3) >= 3 else None
        pre3_end = pre3["close"].iloc[-1] if len(pre3) >= 1 else None
        post3_end = post3["close"].iloc[-1] if len(post3) >= 3 else None

        pct_pre_3d = ((pre3_end - pre3_start) / pre3_start * 100) if pre3_start and pre3_end else None
        pct_post_3d = ((post3_end - pre3_end) / pre3_end * 100) if pre3_end and post3_end else None

        # === 10-DAY WINDOWS ===
        pre10_mask = (hist_df["date"].dt.date < earn_date) & \
                     (hist_df["date"].dt.date >= earn_date - timedelta(days=20))
        pre10 = hist_df[pre10_mask].tail(10)

        post10_mask = (hist_df["date"].dt.date > earn_date) & \
                      (hist_df["date"].dt.date <= earn_date + timedelta(days=20))
        post10 = hist_df[post10_mask].head(10)

        pre10_start = pre10["close"].iloc[0] if len(pre10) >= 10 else None
        pre10_end = pre10["close"].iloc[-1] if len(pre10) >= 1 else None
        post10_end = post10["close"].iloc[-1] if len(post10) >= 10 else None

        pct_pre_10d = ((pre10_end - pre10_start) / pre10_start * 100) if pre10_start and pre10_end else None
        pct_post_10d = ((post10_end - pre10_end) / pre10_end * 100) if pre10_end and post10_end else None

        price_results.append({
            "symbol": symbol,
            "earn_date": earn_date,
            "month": earn_date.month,
            "pct_pre_3d": round(pct_pre_3d, 2) if pct_pre_3d else None,
            "pct_post_3d": round(pct_post_3d, 2) if pct_post_3d else None,
            "pct_pre_10d": round(pct_pre_10d, 2) if pct_pre_10d else None,
            "pct_post_10d": round(pct_post_10d, 2) if pct_post_10d else None,
            "eps_surprise": row["eps_surprise"],
            "revenue_surprise": row["revenue_surprise"]
        })



df_earnings = pd.DataFrame(price_results)
df_earnings.dropna(inplace=True)
df_earnings = df_universe.merge(df_earnings, on="symbol")
df_earnings
```

As you can see, at the end of the code, we have also merged the initial dataset, so all the information, such as name, marketCap, and sector, is now in a single dataset.

---

## Storytelling with Charts and Visuals

### Sector Heatmap

First, we'll present the Sector Heatmap of average 3-day post-earnings returns segmented by sector and market-cap category. This basic visualisation highlights areas with the most significant reactions, enabling traders to swiftly identify high-alpha sectors and market caps for earnings strategies.

```py
# Aggregate: average post-earnings returns and EPS surprise
agg = (
    df_earnings
    .dropna(subset=['pct_post_3d', 'pct_post_10d', 'eps_surprise', 'marketCap', 'sector'])
    .groupby(['sector', 'marketCap'])
    .agg(
        avg_post3d=('pct_post_3d', 'mean'),
        avg_post10d=('pct_post_10d', 'mean'),
        avg_eps_surprise=('eps_surprise', 'mean')
    )
    .reset_index()
)

# Heatmap: average 3-day post-earnings return
heatmap_3d = agg.pivot(index='sector', columns='marketCap', values='avg_post3d')

plt.figure(figsize=(12, 8))
sns.heatmap(
    heatmap_3d,
    annot=True,
    fmt='.2f',
    cmap='RdYlGn',
    center=0,
    linewidths=0.5,
    linecolor='grey'
)
plt.title('Average 3-Day Post-Earnings Return by Sector and Market-Cap Bucket')
plt.xlabel('Market-cap bucket')
plt.ylabel('Sector')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()
```

![Heatmap of average 3-day post-earnings returns by sector and market-cap bucket for NASDAQ stocks](https://cdn-images-1.medium.com/max/1000/0*u0AOCzVCWJ4NQMIS.png)

Consumer Cyclical and Materials are performing really well, with small and mid caps seeing positive reactions over 1.1%. Real Estate is also doing great, jumping up to +4.0% in mid caps. Energy and Financials are holding steady, staying close to zero. Technology, on the other hand, is showing more muted gains, under 1.1%, indicating there might be limited immediate upside from the big tech earnings.

Building on the 3‑day heatmap, we'll now look at the Sector Heatmap for average *10‑day* post‑earnings returns by sector and market‑cap category. This extends the timeframe to capture momentum persistence, revealing which sectors maintain or reverse short‑term reactions.

```py
# Heatmap: average 10-day post-earnings return
heatmap_10d = agg.pivot(index='sector', columns='marketCap', values='avg_post10d')

plt.figure(figsize=(12, 8))
sns.heatmap(
    heatmap_10d,
    annot=True,
    fmt='.2f',
    cmap='RdYlGn',
    center=0,
    linewidths=0.5,
    linecolor='grey'
)
plt.title('Average 10-Day Post-Earnings Return by Sector and Market-Cap Bucket')
plt.xlabel('Market-cap bucket')
plt.ylabel('Sector')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()
```

![Heatmap of average 10-day post-earnings returns by sector and market-cap bucket for NASDAQ stocks](https://cdn-images-1.medium.com/max/1000/0*DB7p_HYR-6jWYaaP.png)

Consumer Cyclical stands out with peaks at 3.2% (mega caps), and Industrials and Health Care show consistent gains in mid and large caps around 1.1%. Real Estate has eased after its 3-day surge. Technology has seen a small boost in mega caps (+1.8%) but remains less active overall compared to cyclicals.

### Mega‑Cap Tech Time Series

Extending the heatmaps, we’ll now look at a Mega-Cap Tech time series. It tracks 10-day post-earnings returns over time for AAPL, MSFT, NVDA, and a few other mega-cap tech names.

A bubble chart works well here because it encodes more than one thing at once. The x-axis is the earnings date, the y-axis is the 10-day post-earnings return, the bubble size scales with the absolute EPS surprise magnitude, and the color shows whether the surprise was a beat or a miss. This makes it easy to spot outlier quarters and see whether big surprises consistently lead to bigger post-earnings moves.

```py :collapsed-lines
# Define mega-cap tech tickers (top ones from data: AAPL, MSFT, NVDA, AMZN, GOOG/GOOGL, META)
tech_tickers = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOG', 'GOOGL', 'META']

# Filter data for mega-cap tech
df_tech = (
    df_earnings[df_earnings['symbol'].isin(tech_tickers)]
    .dropna(subset=['earn_date', 'pct_post_10d', 'eps_surprise'])
    .sort_values('earn_date')
    .assign(
        earn_date=lambda x: pd.to_datetime(x['earn_date'])
    )
)

# Create time-series plot: pct_post_10d vs earn_date, sized/color by eps_surprise
plt.figure(figsize=(14, 8))

# Scatter plot
scatter = plt.scatter(
    df_tech['earn_date'],
    df_tech['pct_post_10d'],
    s=np.abs(df_tech['eps_surprise']) * 50 + 20,  # Size by abs(eps_surprise)
    c=df_tech['eps_surprise'],
    cmap='RdYlBu_r',
    alpha=0.7,
    edgecolors='black',
    linewidth=0.5
)

plt.colorbar(scatter, label='EPS Surprise (%)')
plt.xlabel('Earnings Date')
plt.ylabel('10-Day Post-Earnings Return (%)')
plt.title('Mega-Cap Tech: 10-Day Post-Earnings Returns vs Time\n(Point size/color by EPS Surprise)')
plt.grid(True, alpha=0.3)

# Add trend line
z = np.polyfit(pd.to_numeric(df_tech['earn_date']), df_tech['pct_post_10d'], 1)
p = np.poly1d(z)
plt.plot(df_tech['earn_date'], p(pd.to_numeric(df_tech['earn_date'])), "r--", alpha=0.8, linewidth=2, label=f'Trend: {z[0]:.3f}x + {z[1]:.1f}')

plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

![Bubble chart of 10-day post-earnings returns over time for AAPL, MSFT, NVDA, AMZN, GOOG, GOOGL, META. Bubble size reflects EPS surprise magnitude. Color reflects beat or miss](https://cdn-images-1.medium.com/max/1500/1*vFJ_bKUzT1WGiJaiF53tEg.png)

That large red bubble around 2018 is almost certainly **AAPL’s Q4 2018 earnings miss** (Jan 2019 announcement, but fiscal Q4 2018 data) and it stands out because:

- **Large size** = massive EPS surprise magnitude (Apple cut guidance dramatically, ~10% miss)
- **Red colour** = negative surprise
- **Low Y position** = poor 10‑day return (~-10% range visible)

This was Apple’s infamous “iPhone demand warning” that triggered the January 2019 market panic. Perfect example of how one outlier event can anchor the whole trend line downward in your visualisation.

### EPS Surprise Scatter Plot

After identifying major tech trends, let's now look at the **EPS Surprise Scatter** plots. This plot checks a simple hypothesis. Do earnings beats lead to positive returns, and do misses lead to negative returns? We plot EPS surprise on the x-axis and post-earnings returns on the y-axis, then add a regression line to show the average relationship.

```py :collapsed-lines
# Prepare data: drop NaNs and convert earn_date if needed (not used here)
df_plot = (
    df_earnings
    .dropna(subset=['eps_surprise', 'pct_post_3d', 'pct_post_10d', 'sector'])
    .copy()
)

# 1. Scatter: EPS Surprise vs 3-Day Post-Return, colored by sector
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.scatterplot(
    data=df_plot,
    x='eps_surprise',
    y='pct_post_3d',
    hue='sector',
    alpha=0.6,
    s=40
)

# Regression line (overall)
slope, intercept, r_value, p_value, std_err = stats.linregress(df_plot['eps_surprise'], df_plot['pct_post_3d'])
line = slope * df_plot['eps_surprise'] + intercept
plt.plot(df_plot['eps_surprise'], line, 'red', linestyle='--', linewidth=2,
         label=f'y = {slope:.3f}x + {intercept:.2f}\nR²={r_value**2:.3f}')
plt.xlabel('EPS Surprise (%)')
plt.ylabel('3-Day Post-Earnings Return (%)')
plt.title('EPS Surprise vs 3-Day Post-Return by Sector')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True, alpha=0.3)

# 2. Scatter: EPS Surprise vs 10-Day Post-Return, colored by sector
plt.subplot(1, 2, 2)
sns.scatterplot(
    data=df_plot,
    x='eps_surprise',
    y='pct_post_10d',
    hue='sector',
    alpha=0.6,
    s=40
)

# Regression line (overall)
slope10, intercept10, r_value10, p_value10, std_err10 = stats.linregress(df_plot['eps_surprise'], df_plot['pct_post_10d'])
line10 = slope10 * df_plot['eps_surprise'] + intercept10
plt.plot(df_plot['eps_surprise'], line10, 'red', linestyle='--', linewidth=2,
         label=f'y = {slope10:.3f}x + {intercept10:.2f}\nR²={r_value10**2:.3f}')
plt.xlabel('EPS Surprise (%)')
plt.ylabel('10-Day Post-Earnings Return (%)')
plt.title('EPS Surprise vs 10-Day Post-Return by Sector')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Optional: Summary table of correlations by sector
corr_3d = df_plot.groupby('sector')[['eps_surprise', 'pct_post_3d']].corr().unstack().xs('pct_post_3d', level=1, axis=1)['eps_surprise']
corr_10d = df_plot.groupby('sector')[['eps_surprise', 'pct_post_10d']].corr().unstack().xs('pct_post_10d', level=1, axis=1)['eps_surprise']

corr_df = pd.DataFrame({
    'Corr_EPS_3Day': corr_3d.round(3),
    'Corr_EPS_10Day': corr_10d.round(3)
}).sort_values('Corr_EPS_10Day', ascending=False)
```

![Scatter plot of EPS surprise versus post-earnings returns with sector colors and overall regression line](https://cdn-images-1.medium.com/max/1500/1*rEAHbGRiyJs-NT9VPRudDQ.png)

The red dashed trend line illustrates the *typical* relationship: for every 1% EPS beat, stocks tend to gain about 0.05–0.1% over 3 to 10 days. The gentle slope suggests that while surprises can give a little boost, **they don’t guarantee large moves**.

You’ll notice that Consumer Cyclical dots mainly cluster in the upper right (beats leading to gains), and Real Estate shows a steeper increase. The wide spread around the line indicates that other factors often influence stock movements beyond surprises.

### Return Distribution Violins

Heatmaps show averages, but averages can hide risk. Violin plots show the full distribution of returns, including how wide the outcomes are and whether the tails are heavy. Here we plot 3-day post-earnings return distributions by sector and by market-cap bucket.

```py :collapsed-lines
# Prepare data
df_plot = (
    df_earnings
    .dropna(subset=['pct_post_3d', 'sector', 'marketCap'])
    .copy()
)

# 1. Violin plot: 3-day post-returns by sector
plt.figure(figsize=(15, 6))

plt.subplot(1, 2, 1)
sns.violinplot(
    data=df_plot,
    x='sector',
    y='pct_post_3d',
    inner='quartile',
    palette='Set2'
)
plt.title('Distribution of 3-Day Post-Earnings Returns by Sector (Violin)')
plt.xlabel('Sector')
plt.ylabel('3-Day Post-Earnings Return (%)')
plt.xticks(rotation=45, ha='right')
plt.grid(True, alpha=0.3)

# 2. Violin plot: 3-day post-returns by market-cap group
plt.subplot(1, 2, 2)
sns.violinplot(
    data=df_plot,
    x='marketCap',
    y='pct_post_3d',
    inner='quartile',
    palette='Set3'
)
plt.title('Distribution of 3-Day Post-Earnings Returns by Market-Cap (Violin)')
plt.xlabel('Market-cap bucket')
plt.ylabel('3-Day Post-Earnings Return (%)')
plt.xticks(rotation=45, ha='right')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()


plt.show()

# Summary statistics table
summary = df_plot.groupby(['sector', 'marketCap'])['pct_post_3d'].agg(['mean', 'median', 'std', 'count']).round(2)
print("Summary Statistics: Mean/Median/Std/Count of 3-Day Returns by Sector & Market-Cap")
print(summary)
```

![Violin plots showing distribution of 3-day post-earnings returns by sector and by market-cap bucket](https://cdn-images-1.medium.com/max/1500/1*JLOvSp-2jwD5_ZNqeqdBEw.png)

All violins concentrate near zero with modest variations (±5%), indicating that post-earnings reactions are *generally noisy and lack a clear direction.* Markets efficiently incorporate expectations, resulting in little predictable advantage. Consumer Cyclical and Materials sectors display slightly more frequent upside surprises, while small caps exhibit the greatest variability, reflecting higher risk and occasional gains. Not every visualization reveals alpha; this one honestly illustrates the difficulty involved.

### Monthly Seasonality

After observing narrow return distributions near zero, let's now look at Monthly Seasonality in four panels: average 3/10‑day post‑returns, EPS surprises, and event counts by month. This reveals calendar effects,  systematic seasonal biases ,  that can influence timing of entries despite noisy individual responses.

```py :collapsed-lines
# 1. Ensure earn_date is datetime
df_month = (
    df_earnings
    .dropna(subset=['earn_date', 'pct_post_3d', 'pct_post_10d', 'eps_surprise'])
    .copy()
)

df_month['earn_date'] = pd.to_datetime(df_month['earn_date'])

# 2. Derive month number and name
df_month['month_num'] = df_month['earn_date'].dt.month
df_month['month_name'] = df_month['earn_date'].dt.strftime('%b')

# 3. Aggregate averages by month
monthly_agg = (
    df_month
    .groupby('month_num')
    .agg(
        pct_post_3d_mean=('pct_post_3d', 'mean'),
        pct_post_10d_mean=('pct_post_10d', 'mean'),
        eps_surprise_mean=('eps_surprise', 'mean'),
        n_obs=('earn_date', 'count')
    )
    .reset_index()
    .sort_values('month_num')
)

# Keep a stable month order and names
month_order = monthly_agg['month_num'].tolist()
month_labels = df_month.drop_duplicates('month_num').set_index('month_num')['month_name'].reindex(month_order)

monthly_agg['month_name'] = month_labels.values

# 4. Plot bar charts
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Monthly Seasonality of Post-Earnings Returns and EPS Surprise', fontsize=16)

# Avg 3-day return
axes[0, 0].bar(monthly_agg['month_name'], monthly_agg['pct_post_3d_mean'], color='skyblue')
axes[0, 0].set_title('Avg 3-Day Post-Earnings Return by Month')
axes[0, 0].set_ylabel('Return (%)')
axes[0, 0].grid(alpha=0.3)

# Avg 10-day return
axes[0, 1].bar(monthly_agg['month_name'], monthly_agg['pct_post_10d_mean'], color='lightgreen')
axes[0, 1].set_title('Avg 10-Day Post-Earnings Return by Month')
axes[0, 1].set_ylabel('Return (%)')
axes[0, 1].grid(alpha=0.3)

# Avg EPS surprise
axes[1, 0].bar(monthly_agg['month_name'], monthly_agg['eps_surprise_mean'], color='salmon')
axes[1, 0].set_title('Avg EPS Surprise by Month')
axes[1, 0].set_ylabel('EPS Surprise')
axes[1, 0].grid(alpha=0.3)

# Number of observations
axes[1, 1].bar(monthly_agg['month_name'], monthly_agg['n_obs'], color='gold')
axes[1, 1].set_title('Number of Earnings Events by Month')
axes[1, 1].set_ylabel('Count')
axes[1, 1].grid(alpha=0.3)

for ax in axes.ravel():
    ax.set_xlabel('Month')
    ax.tick_params(axis='x', rotation=0)

plt.tight_layout()
plt.show()
```

![Four-panel bar charts showing monthly averages of 3-day returns, 10-day returns, EPS surprise, and event counts](https://cdn-images-1.medium.com/max/1500/1*HjdZDaUhudYQZPNvOqy-_Q.png)

Jan/Oct tend to have the best 3‑day returns, about 0.8%, while May/Jul usually see weaker results. The 10‑day trends show a similar but gentler pattern, with February and August reaching peaks. EPS surprises are slightly negative in January and May, possibly due to tough comparisons, and there are fewer events in July, August, and December because of holidays. While there’s a hint of seasonality, its impact is quite small, around 0.5%.

### Regime Cross-Section

Finally, after subtle monthly patterns, we'll look at the Regime Cross‑Section: sector 10‑day post‑earnings returns by market regime (heatmap at the top, bars below). This stress‑tests earlier findings  ( do patterns persist across bull, bear, and COVID eras), revealing rotation opportunities and regime dependence.

```py :collapsed-lines
# Prepare data with year extraction
df_regimes = (
    df_earnings
    .dropna(subset=['earn_date', 'pct_post_10d', 'sector'])
    .copy()
)

df_regimes['earn_date'] = pd.to_datetime(df_regimes['earn_date'])
df_regimes['year'] = df_regimes['earn_date'].dt.year

# Define market regimes (adjust years based on your data/market history)
# Example: Bull (2023-2025), Bear/Transition (2022), COVID (2020-2021), etc.
def assign_regime(year):
    if year >= 2023:
        return 'Bull (2023+)'
    elif year == 2022:
        return 'Bear (2022)'
    elif 2020 <= year <= 2021:
        return 'COVID Recovery'
    elif 2018 <= year <= 2019:
        return 'Pre-COVID'
    else:
        return 'Earlier'

df_regimes['market_regime'] = df_regimes['year'].apply(assign_regime)

# 1. Aggregate: average 10-day returns by sector and regime/year
agg_data = (
    df_regimes
    .groupby(['sector', 'market_regime'])['pct_post_10d']
    .agg(['mean', 'count'])
    .reset_index()
    .query('count >= 5')  # Filter low-sample regimes
)

# 2. Visualization: Heatmap first (quick overview)
plt.figure(figsize=(12, 8))

plt.subplot(2, 1, 1)
pivot_heatmap = agg_data.pivot(index='sector', columns='market_regime', values='mean')
sns.heatmap(pivot_heatmap, annot=True, fmt='.2f', cmap='RdYlGn', center=0, linewidths=0.5)
plt.title('Average 10-Day Post-Earnings Returns: Sector x Market Regime Heatmap')

# 3. Bar charts: By regime (stacked by sector)
plt.subplot(2, 1, 2)
regime_order = agg_data.groupby('market_regime')['mean'].mean().sort_values(ascending=False).index
sns.barplot(data=agg_data, x='market_regime', y='mean', hue='sector',
            palette='Set2', order=regime_order)
plt.title('Average 10-Day Returns by Market Regime (Colored by Sector)')
plt.ylabel('10-Day Post-Return (%)')
plt.xlabel('Market Regime')
plt.xticks(rotation=45, ha='right')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()

# 5. Summary tables
print("Average Returns by Sector x Market Regime (min 5 obs):")
print(agg_data.pivot(index='sector', columns='market_regime', values='mean').round(2))

# 6. Ranking: Best/worst performing sectors by regime
print("\nTop/Bottom Sectors by Regime:")
for regime in regime_order:
    regime_data = agg_data[agg_data['market_regime'] == regime].sort_values('mean', ascending=False)
    print(f"\n{regime}:")
    print(regime_data[['sector', 'mean', 'count']].round(2).head(3))
```

![Heatmap and bar chart showing average 10-day post-earnings returns by sector across market regimes](https://cdn-images-1.medium.com/max/1000/0*Pn2sH97R2DCpRl7u.png)

Consumer Cyclical does well during Bull (2023+) and COVID Recovery (~1.5–2%), but it’s less favorable in Bear 2022. Utilities turned negative before COVID. The bottom bars show the COVID era led overall gains (~1%), with Basic Materials and Industrials being the strongest. The recent Bull remains positive but less so. Sector leadership shifts depending on the market regime , there are no consistent winners.

---

## What Did We Get Out of All This Storyline?

Guiding you through six interconnected visualizations, we’ve turned 15 years of earnings data into a clear and engaging story.

Each chart responds to a specific question, yet together, they paint a bigger picture: earnings surprises influence markets, but not in the same way everywhere. Some sectors, periods, and regimes often provide consistent advantages, while others don’t.

Here’s what the data shows us:

- **No definitive alpha here, but specific opportunities are present**: Markets are mostly efficient,  returns hover near zero with weak surprise correlations ,  yet Consumer Cyclicals and Materials consistently show upside potential across different timeframes and market sizes. Timing your sector choice is important.
- **Timing windows alter the story**: 3-day reactions benefit Real Estate mid-caps (+4%), while 10-day reactions shift leadership to Consumer Cyclical mega-caps (+3.2%). Don’t assume all earnings reactions occur at the same pace.
- **Mega-tech hype isn’t eternal**: The bubble chart shows AAPL/MSFT/NVDA delivered strong returns from 2020–2022, but the falling trend since then indicates waning market enthusiasm. Don’t chase yesterday’s overhyped stocks.
- **Calendar patterns reward patience**: January and October deliver slightly stronger post-earnings returns (~0.8%), while July and August tend to have lower liquidity. Combine seasonal timing with sector choices for additional gains.
- **Market regimes change winners**: Cyclicals underperformed during COVID recovery and the bull run (2023+), while Industrials peaked during the recovery. There are no universal “best performers,” only the best performers *for now*. Adjust to the regime.
- **The actionable setup**: Small to mid-cap cyclical longs in January during bull markets combine all these signals for maximum conviction ,  where sector timing, seasonality, and regime alignment converge.

---

## Final Thoughts

This exercise shows why visualization is important in finance: raw tables of returns and surprises wouldn’t reveal these patterns.

- Heatmaps instantly highlighted sector winners.
- Scatter plots demonstrated the weak surprise‑return connection. Bubble charts narrated the mega‑tech story over time.
- Violins unveiled the harsh truth  that markets are noisy. Cross‑sectional regime analysis reminded us that yesterday’s approach doesn’t ensure tomorrow’s returns.

The effort to interpret this data pays off: you shift from passive observation to active pattern recognition. You see not just what occurred, but where and when it happened. In trading and analysis, understanding the shape of complexity often surpasses having a perfect formula.

Visual storytelling turns data into intuition . And intuition, based on evidence, outperforms guesswork every time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Comprehensive Guide to Financial Storytelling using Data Visualization",
  "desc": "In any analysis project, raw tables of numbers often don’t tell the full story. Visualisations simplify complexity by transforming data into shapes that our brains can quickly understand, emphasising ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/financial-storytelling-using-data-visualization.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
