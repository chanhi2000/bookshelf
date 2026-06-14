---
lang: en-US
title: "How to Find Stock-Specific Moves in the S&P 500 with Python"
description: "Article(s) > How to Find Stock-Specific Moves in the S&P 500 with Python"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - Matplotlib
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Find Stock-Specific Moves in the S&P 500 with Python"
    - property: og:description
      content: "How to Find Stock-Specific Moves in the S&P 500 with Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-find-stock-specific-moves-in-the-s-p-500-with-python.html
prev: /programming/py/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4588a4f3-fb34-40af-8a43-ab746e1152b0.png
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

[[toc]]

---

<SiteInfo
  name="How to Find Stock-Specific Moves in the S&P 500 with Python"
  desc="On June 12, 2026, SPY closed up 0.54%. EchoStar (SATS) dropped 11%. Lennar (LEN) dropped 4.9%. Most of the other 500 stocks in the index barely moved beyond what SPY’s own gain would predict. That gap"
  url="https://freecodecamp.org/news/how-to-find-stock-specific-moves-in-the-s-p-500-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4588a4f3-fb34-40af-8a43-ab746e1152b0.png"/>

On June 12, 2026, SPY closed up 0.54%. EchoStar (SATS) dropped 11%. Lennar (LEN) dropped 4.9%. Most of the other 500 stocks in the index barely moved beyond what SPY’s own gain would predict.

That gap is the entire premise of this article. Every stock has a normal relationship to the market: how much it tends to rise when SPY rises, how much it tends to fall when SPY falls.

Once you know that relationship, you can calculate what a stock should have done on any given day and compare it to what it actually did. Most days, for most stocks, there’s almost nothing left over. Some days, for a handful of stocks, there’s a lot left over, and that’s where the real story is.

This article builds a Python scanner that runs that comparison across the entire S&P 500 every day, flags the stocks with the largest gap between expected and actual return, and checks whether news, volume, or sector activity explains what happened.

::: note Prerequisites

To follow along, you should be comfortable with basic Python, pandas DataFrames, loops, functions, and simple plotting with matplotlib.

You’ll also need:

- Python 3.9 or later
- An EODHD API key
- The following Python libraries: `requests`, `pandas`, `numpy`, `matplotlib`, and `statsmodels`
- Basic familiarity with daily returns, beta, alpha, volume, z-scores, and stock tickers

:::

You don't need advanced quantitative finance knowledge. The goal is to build a practical scanner that separates market-driven moves from stock-specific moves, then checks whether volume and news help explain the abnormal return.

---

## Setting Up: Importing Packages

```py
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import statsmodels.api as sm
from statsmodels.regression.rolling import RollingOLS

plt.style.use('ggplot')
```

`requests` and `pandas` handle the API calls and all the data wrangling. `RollingOLS` from `statsmodels` runs the rolling regression that estimates each stock's beta and alpha against SPY, which is the core of the scanner. `ggplot` gives the charts a cleaner look than matplotlib's default.

---

## Building the S&P 500 Universe

The scanner needs a current list of S&P 500 tickers and their sectors. [<VPIcon icon="fas fa-globe"/>EODHD’s fundamentals endpoint](https://eodhd.com/lp/fundamental-data-api) for the index returns this directly.

```py
api_key = 'eodhd api key'

url = f'https://eodhd.com/api/fundamentals/GSPC.INDX?api_token={api_key}&fmt=json&filter=Components'
r = requests.get(url)
components = r.json()

universe = pd.DataFrame(components).T[['Code', 'Sector']].rename(columns={
    'Code': 'ticker',
    'Sector': 'sector'
}).reset_index(drop=True)

tickers = universe['ticker'].tolist()

print(f'universe size: {len(universe)}')
print(universe['sector'].value_counts())
#
# universe size: 503
# sector
# Technology                83
# Industrials               75
# Financial Services        70
# Healthcare                59
# Consumer Cyclical         54
# Consumer Defensive        35
# Utilities                 31
# Real Estate               31
# Communication Services    24
# Energy                    21
# Basic Materials           20
# Name: count, dtype: int64
```

503 tickers, because the S&P 500 includes a handful of dual-class share structures. Technology and Industrials make up nearly a third of the index between them, which matters later when a cluster of moves shows up concentrated in one sector.

SPY is fetched separately in the next step and never enters this list. It’s the benchmark, not a candidate.

---

## Fetching Prices, Volume, and Daily Returns

The regression needs a full year of price and volume history for every ticker in the universe, plus SPY as the benchmark. This historical data can be fetched using [<VPIcon icon="fas fa-globe"/>EODHD's historical EOD endpoint](https://eodhd.com/lp/historical-eod-api).

```py
end_date = pd.Timestamp.today().strftime('%Y-%m-%d')
start_date = (pd.Timestamp.today() - pd.Timedelta(days=365)).strftime('%Y-%m-%d')

def fetch_ohlcv(ticker, start, end):
    url = f'https://eodhd.com/api/eod/{ticker}.US?from={start}&to={end}&api_token={api_key}&fmt=json'
    r = requests.get(url)
    data = r.json()
    df = pd.DataFrame(data)[['date', 'adjusted_close', 'volume']]
    df['date'] = pd.to_datetime(df['date'])
    df = df.set_index('date')
    df.columns = [ticker, f'{ticker}_vol']
    return df

all_prices = {}
all_volumes = {}

for ticker in tickers + ['SPY']:
    try:
        result = fetch_ohlcv(ticker, start_date, end_date)
        all_prices[ticker] = result[ticker]
        all_volumes[ticker] = result[f'{ticker}_vol']
        print(f'{ticker} DONE')
    except:
        print(f'{ticker} ERROR')

prices = pd.DataFrame(all_prices)
volumes = pd.DataFrame(all_volumes)
```

![Historical prices data](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/72926ade-bc8a-43ee-9f12-5d1386f68f6a.png)

Two wide dataframes come out of the loop, one for price and one for volume, both indexed by date with a column per ticker. 251 trading days across exactly one year, 504 columns because the 503 S&P 500 tickers plus SPY all came back successfully.

### Calculating Daily Returns

Adjusted close converts directly into daily percentage returns, which is what the regression actually runs on, not raw price.

```py
prices = prices.sort_index()
volumes = volumes.sort_index()

prices = prices.apply(pd.to_numeric, errors='coerce')
volumes = volumes.apply(pd.to_numeric, errors='coerce')

prices = prices.ffill(limit=3)

returns = prices.pct_change(fill_method=None)
returns = returns.iloc[1:]

missing_pct = returns.isna().mean()

valid_tickers = missing_pct[missing_pct <= 0.10].index.tolist()

if 'SPY' not in valid_tickers:
    valid_tickers.append('SPY')

returns = returns[valid_tickers]
volumes = volumes[valid_tickers]

spy_returns = returns['SPY']
stock_returns = returns.drop(columns=['SPY'])

stock_returns.head()
```

![Historical returns data](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/9bb4bd2f-7935-4b3e-abab-b48e9692ffb8.png)

A couple of tickers, including Q, came back with NaN prices on certain days. This is the kind of one-off gap a 503-ticker pull is bound to hit.

Forward-filling that gap on the price itself, capped at three trading days, is what `ffill(limit=3)` does before the percentage change is taken. So the return calculated from it reflects an actual assumption: no new price, no change, instead of a fabricated number from filling the return directly.

Anything with a gap longer than three days still shows up as NaN in `returns` and gets dropped by the 10% missing threshold rather than patched.

`fill_method=None` on `pct_change` matters too, since pandas would otherwise forward-fill before differencing on its own, which is the exact shortcut this fix avoids. Two tickers came out as 501 instead of 503 after the filter, both falling above the missing threshold.

---

## Estimating Rolling Beta and Alpha

Every stock has a normal sensitivity to SPY: how much it tends to move when the market moves. Beta captures that sensitivity, and a 60-day rolling window gives a stable estimate without overreacting to any single day. `RollingOLS` runs that regression for every ticker in one pass.

```py
window = 60

rolling_beta = pd.DataFrame(np.nan, index=stock_returns.index, columns=stock_returns.columns)
rolling_alpha = pd.DataFrame(np.nan, index=stock_returns.index, columns=stock_returns.columns)

spy_with_const = sm.add_constant(spy_returns)

for ticker in stock_returns.columns:
    model = RollingOLS(stock_returns[ticker], spy_with_const, window=window).fit()
    rolling_beta[ticker] = model.params['SPY']
    rolling_alpha[ticker] = model.params['const']

print(f'beta estimated for: {rolling_beta.notna().any().sum()} tickers')
print(f'date range with estimates: {rolling_beta.dropna(how="all").index[0].date()} to {rolling_beta.dropna(how="all").index[-1].date()}')
```

![Rolling Beta](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/f27dd33e-d398-4b96-ae28-6cd959f041ec.png)

![Rolling Alpha](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/09663bdc-aa76-4d0a-b56d-26750d81ee65.png)

`sm.add_constant` adds the intercept term to SPY's return series so the regression solves for both alpha and beta together. `model.params['SPY']` is the beta, `model.params['const']` is the alpha, pulled straight out of the fitted model for every ticker in the loop.

PGR's beta sitting around -0.42 to -0.53 in early June stands out immediately, an insurance name moving consistently opposite to the market over that stretch, while CSX holds steady near 0.43 to 0.49, a much more textbook beta for an industrial name.

---

## Computing the Residual Return

Beta and alpha describe what a stock should have done given how SPY moved. Subtracting that expected return from what the stock actually did leaves the residual, the part of the move that has nothing to do with the market.

Using today’s beta to judge today’s move would let the move influence the very benchmark it’s being measured against, so both get shifted back a day first.

```py
beta_shifted = rolling_beta.shift(1)
alpha_shifted = rolling_alpha.shift(1)

spy_aligned = spy_returns.reindex(stock_returns.index)

expected_returns = alpha_shifted.add(beta_shifted.multiply(spy_aligned, axis=0))
residuals = stock_returns - expected_returns
```

![Expected returns](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/af067b9b-ea59-4d9f-9195-b9ab3c9d483f.png)

![Residuals](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/baaf8818-2cd9-4e29-9342-6a0eeb3a8504.png)

`expected_returns` is yesterday's alpha plus yesterday's beta times today's SPY return, the prediction a stock's normal market relationship would have made. `residuals` is the actual return minus that prediction.

Most of these numbers sit in a narrow band, a few tenths of a percent either way. This is exactly what a market-driven move looks like once the market's own contribution has been removed.

---

## Scoring the Residual With a Drift-Corrected Z-Score

A residual of 0.03 means nothing on its own. Some stocks routinely have noisier idiosyncratic moves than others, so the same residual needs to be judged against that stock’s own recent history, not a fixed threshold applied across all the names.

```py
window_z = 20

resid_mean = residuals.shift(1).rolling(window_z).mean()
resid_std = residuals.shift(1).rolling(window_z).std()

zscore = (residuals - resid_mean) / resid_std

zscore.tail()
```

![Residual Z-Score](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/13a240ae-8bff-4ca8-8a3a-026061cf065e.png)

The rolling mean is in there deliberately, not just the rolling standard deviation. Some stocks carry a small persistent drift in their residuals, a slight tendency to run a touch above or below zero over any given stretch, and scoring against that drift rather than against zero keeps the z-score honest about what’s actually unusual for that specific stock.

Both the mean and the standard deviation get shifted by a day for the same reason beta and alpha did: today’s score can’t be built from a distribution that includes today’s own value.

AFL’s -2.31 on June 8 and SOLV’s -2.31 the same day already clear the threshold worth paying attention to (two standard deviations below their own recent norm), while SOLV swings to +2.40 the very next day.

---

## Adding Multi-Day Confirmation

A single day’s z-score can be noise, one stray print that happens to land outside the normal range. Compounding the residual over the trailing 3 and 5 days checks whether the move actually held.

```py
residuals_3d = (1 + residuals).rolling(3).apply(np.prod, raw=True) - 1
residuals_5d = (1 + residuals).rolling(5).apply(np.prod, raw=True) - 1

print('3-day compounded residuals (last 5 rows, first 5 tickers):')
print(residuals_3d.iloc[-5:, :5].round(4))
print('\n5-day compounded residuals (last 5 rows, first 5 tickers):')
print(residuals_5d.iloc[-5:, :5].round(4))
```

![3-day, 5-day compounded residuals](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/b09c82a2-ff33-4ac9-bd59-ccbb44c0a50f.png)

Compounding rather than summing matters here because residual returns multiply through time the same way regular returns do.

AIZ's residual climbs from 2.4% over 3 days to a near-flat 0.6% over 5, which means most of that move was concentrated in the most recent stretch and the earlier days were closer to neutral. MNST shows the opposite shape: a steady build from 2% to 4.4% to 5.8% across the three windows in the days leading into June 11, a sustained drift rather than a single spike.

---

## Confirming With Volume

A large residual return on ordinary trading volume is easier to dismiss than the same move with twice the usual number of shares changing hands. Volume is the check on whether the move had real participation behind it.

```py
vol_mean = volumes.shift(1).rolling(20).mean()
volume_ratio = volumes / vol_mean

volume_ratio = volume_ratio.drop(columns=['SPY'], errors='ignore')

print('volume ratios (last 5 rows, first 5 tickers):')
print(volume_ratio.iloc[-5:, :5].round(2))
```

![Volume ratios](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/b7eb8cbf-ded4-46c9-b185-6a7f5ef4c64b.png)

The 20-day average volume used as the denominator is shifted by a day for the same reason every other rolling statistic in this scanner is: today's elevated volume shouldn't be allowed to inflate the baseline it's being measured against.

None of these five tickers cross 1.5x on these particular days, which is the threshold that turns a volume reading into a meaningful confirmation rather than ordinary day-to-day variation. A ratio above 1.5 paired with a z-score outside 2 standard deviations is a stronger candidate than either signal showing up alone.

---

## Building the Alpha Investigation Queue

Every piece built so far points at the same trading day. Pulling the most recent row out of each one and joining them by ticker turns five separate dataframes into the single table the whole scanner exists to produce.

```py
scan_date = stock_returns.index[-1]

queue = pd.DataFrame({
    'sector': universe.set_index('ticker')['sector'],
    'actual_return': stock_returns.loc[scan_date],
    'spy_return': spy_returns.loc[scan_date],
    'beta': beta_shifted.loc[scan_date],
    'expected_return': expected_returns.loc[scan_date],
    'residual': residuals.loc[scan_date],
    'zscore': zscore.loc[scan_date],
    'residual_3d': residuals_3d.loc[scan_date],
    'residual_5d': residuals_5d.loc[scan_date],
    'volume_ratio': volume_ratio.loc[scan_date]
})

queue = queue.dropna()
queue = queue.reindex(queue['zscore'].abs().sort_values(ascending=False).index)
queue['high_confidence'] = (queue['zscore'].abs() > 2.0) & (queue['volume_ratio'] > 1.5)

queue.head(10)
```

![](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/dca16809-83ab-4ba2-bd77-a7acd5135d2a.png)

A few names stand out for different reasons.

**SATS, the volume outlier:** Down almost 11% while SPY was up half a percent. A beta of 1.55 would have called for a small gain, not a double-digit drop, and the residual lands near -12%. Volume ran more than six times its 20-day average, the highest ratio in the table.

**LEN, the extreme score:** A z-score of -3.9, the single most negative number anywhere in the queue. Beta of 1.45 predicted a modest gain on a day SPY was up. The stock fell almost 5% instead.

**MOS and ALB, a possible shared story:** Both Basic Materials, both positive, both backed by elevated volume, sitting back to back in the ranking. Worth checking for a common catalyst before treating either one as an independent idiosyncratic move.

**TKO, a flag with a catch:** Clears the high-confidence bar on the numbers alone, but the ticker maps to two different companies depending on the source, TKO Group Holdings and Tikehau Capital. That collision turns into a real problem once the news search runs.

---

## Checking the Story Against the News

A z-score only says a move was unusual, not why it happened. Pulling recent headlines for the flagged names is the only way to find out whether there’s an actual story behind the number. We’ll fetch the news data using [<VPIcon icon="fas fa-globe"/>EODHD’s financial news endpoint](https://eodhd.com/financial-apis/stock-market-financial-news-api).

```py
def fetch_news(ticker, start, end):
    url = f'https://eodhd.com/api/news?s={ticker}.US&from={start}&to={end}&limit=3&api_token={api_key}&fmt=json'
    r = requests.get(url)
    data = r.json()
    return [item['title'] for item in data[:3]]

news_start = (scan_date - pd.Timedelta(days=3)).strftime('%Y-%m-%d')
news_end = scan_date.strftime('%Y-%m-%d')

high_conf = queue[queue['high_confidence']].head(10)
remaining = queue[~queue['high_confidence']].head(max(0, 10 - len(high_conf)))
news_candidates = pd.concat([high_conf, remaining])

news_results = {}
for ticker in news_candidates.index:
    headlines = fetch_news(ticker, news_start, news_end)
    news_results[ticker] = headlines
    print(f'\n{ticker}:')
    if headlines:
        for h in headlines:
            print(f'  - {h}')
    else:
        print('  no news found')
#
# LEN:
#   - Lennar Corp (LEN) Q2 2026 Earnings Call Highlights: Strong Margins and Strategic Adjustments ...
#   - Why Lennar (LEN) Stock Is Down Today
#   - Update: Equities Rise as SpaceX Soars; Wall Street Logs Weekly Gain Amid Iran Deal Optimism
#
# SATS:
#   - Stocks Rally on Hopes for a Near-term US-Iran Interim Peace Agreement
#   - Stock Market Today, June 12: EchoStar Falls as SpaceX-Linked Rally Meets DISH DBS Payment Risk
#   - Why EchoStar (SATS) Stock Is Falling Today
#
# MOS:
#   - S&amp;P 500 Movers: KLAC, MOS
#   - Top 10 most oversold S&amp;P 500 stocks
#   - Mosaic (MOS) Down 5% Since Last Earnings Report: Can It Rebound?
#
# ALB:
#   - DuPont Achieves Renewable Power Milestone in US Healthcare Sites
#   - S&amp;P 500 Movers: KLAC, MOS
#   - ATI and BWX Technologies Extend Strategic Partnership Through 2030
#
# TKO:
#   - Tikehau Capital: Disclosure of Shares Repurchases from 05 June 2026 to 11 June 2026
#   - Here's Why We're Wary Of Buying TKO Group Holdings' (NYSE:TKO) For Its Upcoming Dividend
#   - Tikehau Capital: Extension of the Share Repurchase Mandate
#
# FOX:
#   - Fox Could Unlock 800+ World Cup Ad Spots
#   - World Cup Economics: How Much Boost Could The US Get?
#   - Why Is Fox (FOXA) Up 3.3% Since Last Earnings Report?
#
# DPZ:
#   - Is Domino's (DPZ) Valuation Reset Revealing a Deeper Shift in Its Competitive Moat?
#   - Domino's Pizza (DPZ) Stock Valuation Check After Mixed Recent Performance
#   - Is Domino's Pizza, Inc. (DPZ) A Good Stock To Buy Now?
#
# CTAS:
#   - UniFirst Shareholders Approve Transaction with Cintas
#   - Cintas Stock Bears Are Overlooking This Profit Engine
#
# CTVA:
#   - Corteva sees higher restructuring charges, plans to cease production at Spanish site
#   - Zacks Industry Outlook Highlights Corteva, Archer Daniels Midland, The Scotts, Miracle-Gro, Adecoagro and Mission Produce
#   - 5 Agriculture Operations Stocks to Benefit From Innovation-Driven Growth
#
# TSN:
#   - Tyson Foods Installs New COO As Beef Woes And Valuation Discount Persist
#   - Why JBS Is Closing Plants Even as Beef Prices Hit Records
#   - Tyson Foods, Inc. (TSN) is Attracting Investor Attention: Here is What You Should Know
```

The high-confidence stocks get pulled first, with the remaining slots filled by the next highest z-scores if fewer than 10 clear that bar. This is why DPZ, CTAS, CTVA, and TSN show up here despite not carrying the flag.

**SATS holds up.** A direct headline ties the drop to DISH DBS payment risk, surfacing on the exact day the residual shows up and lining up with the volume spike.

**LEN holds up, too.** "Why Lennar (LEN) Stock Is Down Today" is about as direct a confirmation as a headline gets, backed by a Q2 earnings call reference that explains why the market would be repricing the stock specifically.

**TKO breaks.** Every headline returned is about Tikehau Capital, a French asset manager that happens to share the same ticker as TKO Group Holdings on a different exchange. The high-confidence flag fired correctly. The news search picked the wrong company entirely.

**MOS and ALB stay unexplained.** ALB's headlines are about DuPont and a defense partnership, neither relevant. MOS gets a real mention in passing, a "down 5% since last earnings" line, but nothing that explains a same-day move. The shared-catalyst theory from the queue doesn't get resolved here either way.

---

## Visualizing the Abnormal Movers

### Actual vs Expected Return

A stock’s actual return only earns attention here if it breaks away from what beta alone would have predicted. A scatter against the expected return is the fastest way to see which ones did.

```py
fig, ax = plt.subplots(figsize=(9, 7))

sector_list = queue['sector'].unique()
colors = plt.cm.tab20(np.linspace(0, 1, len(sector_list)))
sector_colors = dict(zip(sector_list, colors))

for sector in sector_list:
    subset = queue[queue['sector'] == sector]
    ax.scatter(
        subset['expected_return'], subset['actual_return'],
        s=subset['volume_ratio'] * 40,
        color=sector_colors[sector],
        label=sector, alpha=0.7, edgecolors='black', linewidth=0.5
    )

lims = [queue[['expected_return', 'actual_return']].min().min(),
        queue[['expected_return', 'actual_return']].max().max()]
ax.plot(lims, lims, color='black', linestyle='--', linewidth=1)

ax.set_xlabel('expected return (beta-adjusted)')
ax.set_ylabel('actual return')
ax.set_title(f'Actual vs Expected Return - {scan_date.date()}')
ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left', fontsize=8)
plt.tight_layout()
plt.show()
```

![Actual vs Expected Return](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ef383587-3a4d-4e80-9024-58bfc22e0db4.png)

Most of the 487 points crowd close to the dashed line, sitting in the narrow band near zero where actual and expected return roughly agree. This is what the bulk of any given day’s trading actually looks like once beta is accounted for.

SATS sits far below the line on the right side of the chart, the largest bubble in the entire plot, its size scaled directly to the 6.28x volume ratio that confirmed the move.

The big grey Technology-colored point near the bottom is LEN, also well clear of the line and large enough to stand out against the Consumer Cyclical points clustered tighter to the diagonal.

A handful of other points drift noticeably off the line in both directions without being flagged as high-confidence, a reminder that distance from the line alone doesn’t guarantee a real story, which is exactly what the volume and news checks exist to settle.

### Top 30 Abnormal Movers by Z-Score

A z-score ranking alone tells you which moves were statistically unusual. Pairing each bar with its volume ratio shows which of those moves also had real trading activity behind them, since the two together matter more than either alone.

```py
top30 = queue.head(30).sort_values('zscore')

fig, ax = plt.subplots(figsize=(8, 6))
bar_colors = ['#2ca02c' if z > 0 else '#d62728' for z in top30['zscore']]
ax.barh(top30.index, top30['zscore'], color=bar_colors)

for i, (ticker, row) in enumerate(top30.iterrows()):
    ax.text(row['zscore'] + (0.1 if row['zscore'] > 0 else -0.1),
             i, f'vol={row["volume_ratio"]:.1f}x',
             va='center', ha='left' if row['zscore'] > 0 else 'right', fontsize=7)

ax.axvline(2.0, color='black', linestyle='--', linewidth=1)
ax.axvline(-2.0, color='black', linestyle='--', linewidth=1)
ax.set_xlabel('z-score')
ax.set_title(f'Top 30 Abnormal Movers by Z-Score - {scan_date.date()}')
plt.tight_layout()
plt.show()
```

![Top 30 Abnormal Movers by Z-Score](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/76ebb3d3-e1fe-4969-a1c0-ed9858563742.png)

LEN’s bar runs past -3.9, well clear of the -2.0 reference line, with a 2.4x volume label sitting right at the tip.

SATS follows close behind at roughly -3.0. But the number that actually stands out next to it is the volume label, 6.3x, the highest ratio anywhere on the chart and a much stronger confirmation than LEN’s.

On the positive side, MOS and ALB sit at the top of the green bars within a fraction of each other, both backed by volume north of 1.5x. This is consistent with the queue’s earlier suggestion that the two might share a catalyst.

ADBE is the one worth lingering on. Its bar barely crosses -1.6, short of the -2.0 threshold that would have earned it a high-confidence flag. But its volume ratio of 4.2x is among the highest in the entire chart. That combination, a moderate z-score paired with unusually heavy volume, is exactly the kind of case a fixed threshold misses and a chart like this one catches instead.

### Trailing Abnormal Returns

A single day’s residual can’t say whether a move is building or already over. Lining up the 1, 3, and 5-day windows for the same set of stocks separates the two.

```py
top15 = queue.head(15)
heatmap_data = top15[['residual', 'residual_3d', 'residual_5d']]
heatmap_data.columns = ['1-day', '3-day', '5-day']

fig, ax = plt.subplots(figsize=(7, 5))
im = ax.imshow(heatmap_data.values, cmap='RdYlGn', aspect='auto', vmin=-0.1, vmax=0.1)

ax.set_xticks(range(len(heatmap_data.columns)))
ax.set_xticklabels(heatmap_data.columns)
ax.set_yticks(range(len(heatmap_data.index)))
ax.set_yticklabels(heatmap_data.index)
ax.grid(False)

for i in range(heatmap_data.shape[0]):
    for j in range(heatmap_data.shape[1]):
        ax.text(j, i, f'{heatmap_data.values[i, j]:.1%}', ha='center', va='center', fontsize=8)

ax.set_title(f'Trailing Abnormal Returns - {scan_date.date()}')
plt.colorbar(im, ax=ax, label='abnormal return')
plt.tight_layout()
plt.show()
```

![Trailing Abnormal Returns](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/13bb39fb-d4b5-442b-be75-216f869a4b9b.png)

ALB is the clearest example of a move that built rather than spiked, going from 7.0% on day one to 11.8% over three days and settling at 10.5% over five, each window deepening the color rather than reversing it.

SATS tells the opposite story. The 1-day column shows -11.8% (by far the darkest red cell in the entire heatmap), but the 3-day and 5-day columns fade to -2.9% and -2.3%. This means that most of the damage was already priced in within the first session and the days that followed barely added to it.

CVNA shows a third pattern entirely, a move that got worse before it got better: -6.4% on day one widens to -8.9% over three days, the single deepest red cell outside of SATS’s first column, before narrowing back to -4.4% by day five.

Three names, three different shapes, and none of that distinction would be visible from the single-day z-score table alone.

---

## Conclusions and Ideas for Next Steps

A few things stood out from today’s scan:

- 31 out of 487 stocks cleared the high-confidence bar, roughly 6%, which is a reasonable hit rate for a daily flag.
- SATS and LEN both had real news behind the move, the best-case outcome for this kind of scanner.
- TKO is a reminder that a ticker can mean two different companies depending on the data source.
- MOS and ALB moving together with no news confirmation is worth a closer look, not just a glance at the table.

A few ways to take this further:

- Match news by company name instead of ticker. That alone would've caught the TKO collision.
- Pull more than 3 headlines per stock. ALB and MOS both got thin results.
- Run this daily and keep a log, a single day’s queue can’t tell you if a move held or reversed.
- Add a sector check. Two stocks from the same sector flagging together is worth a second look before calling either one idiosyncratic.

Beta explains most of what a stock does on most days. The exceptions are rare, and even then, it still takes a real check before you know if one means anything.

With that being said, you’ve reached the end of the article. Hope you learned something new and useful. Thank you very much for your time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Find Stock-Specific Moves in the S&P 500 with Python",
  "desc": "On June 12, 2026, SPY closed up 0.54%. EchoStar (SATS) dropped 11%. Lennar (LEN) dropped 4.9%. Most of the other 500 stocks in the index barely moved beyond what SPY’s own gain would predict. That gap",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-find-stock-specific-moves-in-the-s-p-500-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
