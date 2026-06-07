---
lang: en-US
title: "Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up"
description: "Article(s) > Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up"
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
      content: "Article(s) > Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up"
    - property: og:description
      content: "Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/beyond-nvidia-where-the-ai-infra-trade-actually-shows-up.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-30
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/31d12d22-a89b-44c1-8786-ef568be6e6b8.png
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
  name="Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up"
  desc="The AI capex trade is usually discussed like one clean idea. Capex simply means capital expenditure, or the money companies spend on long-term assets like data centers, chips, servers, power systems, "
  url="https://freecodecamp.org/news/beyond-nvidia-where-the-ai-infra-trade-actually-shows-up"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/31d12d22-a89b-44c1-8786-ef568be6e6b8.png"/>

The AI capex trade is usually discussed like one clean idea. Capex simply means capital expenditure, or the money companies spend on long-term assets like data centers, chips, servers, power systems, and other infrastructure.

NVIDIA. Hyperscalers. Data centers. Power demand. Everything gets pushed into the same bucket and called "AI infrastructure."

But I don't think this is very useful anymore.

Capex doesn't move through the market as a headline. It moves through a chain. A cloud company decides to spend more on AI infrastructure, but that spending has to pass through chips, semiconductor equipment, servers, networking, data centers, power systems, cooling, and construction before it becomes usable compute.

That's where the story gets more interesting.

The obvious AI names still matter, but they're not the whole map. If AI capex is becoming one of the biggest investment cycles in the market, then the better question isn't just:

> *"Which companies are AI stocks?"*

It's actually:

> *"Where does the money actually travel?"*

In this article, we'll use Python and [<VPIcon icon="fas fa-globe"/>EODHD](https://eodhd.com/) data to build a simple AI capex map. The goal isn't to create a buy list. The goal is to separate the theme into layers, compare fundamentals with market recognition, and see where the AI infrastructure trade is already showing up in the data.

::: note Prerequisites

Before following along, you should be comfortable with basic Python, especially working with dictionaries, lists, functions, and pandas DataFrames.

You’ll also need:

- Python 3.9 or later
- An EODHD API key
- The following Python libraries: `requests`, `pandas`, `numpy`, and `matplotlib`
- Basic familiarity with financial metrics like revenue growth, profit margin, P/E ratio, stock returns, volatility, and drawdown

You don’t need advanced finance knowledge for this article. The goal is to show how data visualization can help map a market theme, not to build a complete valuation model or stock recommendation engine.

:::

---

## What We're Investigating

The lazy version of this article would be a list of AI stocks.

That's not what I want to do here.

The more useful approach is to treat AI capex as a spending chain and ask where each part of that chain appears in the market.

A company selling GPUs is exposed to the theme in one way. A company building electrical systems for data centers is exposed in a completely different way. Both can benefit from the same capex cycle, but the economics, margins, valuation, and market behavior may look very different.

So the investigation has three parts.

First, we'll create a working AI infrastructure universe across layers like chips, semiconductor equipment, servers, networking, data centers, power, cooling, and construction.

Second, we'll pull fundamentals and price data from EODHD to measure two things:

- **Fundamental signal:** Is the business showing growth and profitability?
- **Market recognition signal:** Has the stock already been rewarded by the market?

Third, we'll map the companies into a matrix and look for patterns.

The main output isn't a ranking of the "best AI infrastructure stocks." It's a clearer view of where the AI capex trade has already shown up, where it looks concentrated, and where the physical infrastructure layer starts becoming hard to ignore.

---

## Import the Required Packages

We'll keep the setup light. This is an analysis notebook, not a production system.

```py
import requests
import pandas as pd
import numpy as np
from datetime import date, timedelta
import matplotlib.pyplot as plt
```

These packages cover everything we need here.

`requests` will call the EODHD API, `pandas` will handle the tables, and `numpy` will help with basic calculations. We'll use `date` and `timedelta` for the one-year price window, and `matplotlib` for the charts.

---

## Building the AI Capex Universe

There's one issue with analyzing AI infrastructure stocks: AI capex exposure isn't a clean financial field.

No API directly tells us that a company is "30% exposed to AI data center spending" or "highly tied to GPU infrastructure." So we need a research universe first.

For this article, I used an LLM as a research assistant to draft the first version of the AI capex chain, then manually reviewed the companies before pulling fundamentals and price data from EODHD.

The universe is split into layers:

- Demand-side hyperscalers
- AI compute and chips
- Semiconductor equipment
- Servers and storage
- Networking
- Data centers
- Power and electrification
- Cooling and industrial systems
- Construction and engineering

```py :collapsed-lines
ai_capex_universe = [
    {'ticker': 'MSFT.US', 'company': 'Microsoft', 'capex_layer': 'Demand-side hyperscalers', 'exposure_level': 'High', 'reason': 'Major cloud and AI infrastructure spender through Azure'},
    {'ticker': 'AMZN.US', 'company': 'Amazon', 'capex_layer': 'Demand-side hyperscalers', 'exposure_level': 'High', 'reason': 'Large AI and cloud infrastructure spender through AWS'},
    {'ticker': 'GOOGL.US', 'company': 'Alphabet', 'capex_layer': 'Demand-side hyperscalers', 'exposure_level': 'High', 'reason': 'Major AI infrastructure spender across Google Cloud and internal AI systems'},
    {'ticker': 'META.US', 'company': 'Meta Platforms', 'capex_layer': 'Demand-side hyperscalers', 'exposure_level': 'High', 'reason': 'Large AI compute and data center spending program'},

    {'ticker': 'NVDA.US', 'company': 'NVIDIA', 'capex_layer': 'AI compute and chips', 'exposure_level': 'Very High', 'reason': 'Core GPU and accelerator supplier for AI training and inference'},
    {'ticker': 'AMD.US', 'company': 'Advanced Micro Devices', 'capex_layer': 'AI compute and chips', 'exposure_level': 'High', 'reason': 'AI accelerator and data center CPU exposure'},
    {'ticker': 'AVGO.US', 'company': 'Broadcom', 'capex_layer': 'AI compute and chips', 'exposure_level': 'High', 'reason': 'Custom silicon and networking exposure for AI infrastructure'},
    {'ticker': 'MRVL.US', 'company': 'Marvell Technology', 'capex_layer': 'AI compute and chips', 'exposure_level': 'High', 'reason': 'Custom silicon, networking, and data infrastructure exposure'},

    {'ticker': 'AMAT.US', 'company': 'Applied Materials', 'capex_layer': 'Semiconductor equipment', 'exposure_level': 'High', 'reason': 'Supplies equipment used in advanced chip manufacturing'},
    {'ticker': 'LRCX.US', 'company': 'Lam Research', 'capex_layer': 'Semiconductor equipment', 'exposure_level': 'High', 'reason': 'Semiconductor manufacturing equipment supplier'},
    {'ticker': 'KLAC.US', 'company': 'KLA', 'capex_layer': 'Semiconductor equipment', 'exposure_level': 'High', 'reason': 'Process control and inspection tools for chip manufacturing'},
    {'ticker': 'ASML.US', 'company': 'ASML', 'capex_layer': 'Semiconductor equipment', 'exposure_level': 'Very High', 'reason': 'Critical lithography equipment supplier for advanced chips'},

    {'ticker': 'DELL.US', 'company': 'Dell Technologies', 'capex_layer': 'Servers and storage', 'exposure_level': 'High', 'reason': 'AI server and enterprise hardware exposure'},
    {'ticker': 'HPE.US', 'company': 'Hewlett Packard Enterprise', 'capex_layer': 'Servers and storage', 'exposure_level': 'Medium', 'reason': 'Server, storage, and enterprise infrastructure exposure'},
    {'ticker': 'SMCI.US', 'company': 'Super Micro Computer', 'capex_layer': 'Servers and storage', 'exposure_level': 'High', 'reason': 'AI server systems and data center hardware exposure'},

    {'ticker': 'ANET.US', 'company': 'Arista Networks', 'capex_layer': 'Networking', 'exposure_level': 'High', 'reason': 'Data center networking supplier tied to AI cluster buildouts'},
    {'ticker': 'CSCO.US', 'company': 'Cisco', 'capex_layer': 'Networking', 'exposure_level': 'Medium', 'reason': 'Networking and enterprise infrastructure exposure'},

    {'ticker': 'EQIX.US', 'company': 'Equinix', 'capex_layer': 'Data centers', 'exposure_level': 'Medium', 'reason': 'Global data center and interconnection infrastructure'},
    {'ticker': 'DLR.US', 'company': 'Digital Realty', 'capex_layer': 'Data centers', 'exposure_level': 'Medium', 'reason': 'Data center real estate exposure'},

    {'ticker': 'VRT.US', 'company': 'Vertiv', 'capex_layer': 'Power and electrification', 'exposure_level': 'High', 'reason': 'Power and thermal infrastructure for data centers'},
    {'ticker': 'ETN.US', 'company': 'Eaton', 'capex_layer': 'Power and electrification', 'exposure_level': 'Medium', 'reason': 'Electrical systems and power management exposure'},
    {'ticker': 'PWR.US', 'company': 'Quanta Services', 'capex_layer': 'Power and electrification', 'exposure_level': 'Medium', 'reason': 'Grid, power, and infrastructure construction exposure'},
    {'ticker': 'CEG.US', 'company': 'Constellation Energy', 'capex_layer': 'Power and electrification', 'exposure_level': 'Medium', 'reason': 'Power demand beneficiary from data center expansion'},

    {'ticker': 'TT.US', 'company': 'Trane Technologies', 'capex_layer': 'Cooling and industrial systems', 'exposure_level': 'Medium', 'reason': 'Cooling and climate systems exposure for buildings and infrastructure'},
    {'ticker': 'CARR.US', 'company': 'Carrier Global', 'capex_layer': 'Cooling and industrial systems', 'exposure_level': 'Medium', 'reason': 'Cooling, HVAC, and infrastructure systems exposure'},
    {'ticker': 'JCI.US', 'company': 'Johnson Controls', 'capex_layer': 'Cooling and industrial systems', 'exposure_level': 'Medium', 'reason': 'Building systems, controls, and cooling infrastructure exposure'},

    {'ticker': 'EME.US', 'company': 'EMCOR Group', 'capex_layer': 'Construction and engineering', 'exposure_level': 'Medium', 'reason': 'Electrical and mechanical construction exposure'},
    {'ticker': 'FIX.US', 'company': 'Comfort Systems USA', 'capex_layer': 'Construction and engineering', 'exposure_level': 'Medium', 'reason': 'Mechanical and electrical services for commercial infrastructure'}
]

universe = pd.DataFrame(ai_capex_universe)

universe.head()
```

This gives us the research universe.

![AI capex stock universe (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/3c82c07a-f9fa-4d23-aba7-c17d62158589.png)

The important thing is that this table doesn't prove anything by itself. It only defines the map. The actual comparison comes from the fundamentals and historical price data we pull next.

---

## Pulling the Financial Data Behind the Story

The universe gives us the map, but the map is not the analysis.

Now we need actual data behind each company. For that, we'll use EODHD fundamentals and historical prices.

The fundamentals help us check business strength. The price data helps us see whether the market has already recognized the company as part of the AI capex trade.

### Fundamentals Data

First, we'll pull fundamentals using [<VPIcon icon="fas fa-globe"/>EODHD's fundamentals endpoint](https://eodhd.com/lp/fundamental-data-api).

```py
api_key = 'YOUR EODHD API KEY'

def get_fundamentals(ticker):
    url = f'https://eodhd.com/api/fundamentals/{ticker}?api_token={api_key}&fmt=json'
    data = requests.get(url).json()
    return data
```

::: note

Replace `YOUR EODHD API KEY` with your actual EODHD API key.

:::

This function calls the fundamentals endpoint for one ticker and returns the full JSON response.

We don't need the entire response for this analysis, so we'll extract only the fields we care about.

```py
def extract_fundamental_fields(ticker, data):
    general = data.get('General', {})
    highlights = data.get('Highlights', {})
    valuation = data.get('Valuation', {})
    technicals = data.get('Technicals', {})

    return {
        'ticker': ticker,
        'sector': general.get('Sector'),
        'industry': general.get('Industry'),
        'market_cap': highlights.get('MarketCapitalization'),
        'revenue_growth_yoy': highlights.get('QuarterlyRevenueGrowthYOY'),
        'profit_margin': highlights.get('ProfitMargin'),
        'operating_margin': highlights.get('OperatingMarginTTM'),
        'return_on_equity': highlights.get('ReturnOnEquityTTM'),
        'pe_ratio': highlights.get('PERatio'),
        'forward_pe': valuation.get('ForwardPE'),
        'beta': technicals.get('Beta')
    }
```

These fields give us a compact view of growth, profitability, valuation, and company context.

Now we can run this across the full universe.

```py
fundamental_rows = []

for ticker in universe['ticker']:
    try:
        data = get_fundamentals(ticker)
        row = extract_fundamental_fields(ticker, data)
        fundamental_rows.append(row)
        print(f'{ticker} DONE')

    except Exception as e:
        fundamental_rows.append({
            'ticker': ticker,
            'sector': np.nan,
            'industry': np.nan,
            'market_cap': np.nan,
            'revenue_growth_yoy': np.nan,
            'profit_margin': np.nan,
            'operating_margin': np.nan,
            'return_on_equity': np.nan,
            'pe_ratio': np.nan,
            'forward_pe': np.nan,
            'beta': np.nan
        })
        print(f'{ticker} ERROR')

fundamentals = pd.DataFrame(fundamental_rows)

fundamentals.head()
```

![Fundamentals Data (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c3430710-8978-4739-9217-b8b729d17c68.png)

The try block keeps the scan moving if one ticker fails. That matters because this universe mixes different types of companies, and one missing response should not break the whole analysis.

### Historical Prices Data

Next, we'll pull one year of historical prices using [EODHD's historical end-of-day prices endpoint](https://eodhd.com/lp/historical-eod-api).

```py
price_start = date.today() - timedelta(days=365)
price_end = date.today()

def get_price_history(ticker):
    url = f'https://eodhd.com/api/eod/{ticker}?api_token={api_key}&fmt=json&from={price_start.isoformat()}&to={price_end.isoformat()}&period=d'
    data = requests.get(url).json()
    prices = pd.DataFrame(data)

    if prices.empty:
        return pd.DataFrame()

    prices['date'] = pd.to_datetime(prices['date'], errors='coerce')
    prices['adjusted_close'] = pd.to_numeric(prices['adjusted_close'], errors='coerce')

    prices = prices.dropna(subset=['date', 'adjusted_close'])
    prices = prices.sort_values('date').reset_index(drop=True)

    return prices[['date', 'adjusted_close']]
```

We use adjusted close because it's cleaner for return calculations after splits and dividends.

Now we'll convert the price history into a few market signals.

```py :collapsed-lines
def calculate_market_signals(prices):
    if prices.empty or len(prices) < 60:
        return {
            'return_1y': np.nan,
            'return_6m': np.nan,
            'return_3m': np.nan,
            'volatility_1y': np.nan,
            'max_drawdown_1y': np.nan
        }

    prices = prices.copy()
    prices['daily_return'] = prices['adjusted_close'].pct_change()

    latest_close = prices['adjusted_close'].iloc[-1]

    return_1y = (latest_close / prices['adjusted_close'].iloc[0]) - 1
    return_6m = (latest_close / prices['adjusted_close'].iloc[-126]) - 1 if len(prices) >= 126 else np.nan
    return_3m = (latest_close / prices['adjusted_close'].iloc[-63]) - 1 if len(prices) >= 63 else np.nan

    volatility_1y = prices['daily_return'].std() * np.sqrt(252)

    running_high = prices['adjusted_close'].cummax()
    drawdown = (prices['adjusted_close'] / running_high) - 1
    max_drawdown_1y = drawdown.min()

    return {
        'return_1y': return_1y,
        'return_6m': return_6m,
        'return_3m': return_3m,
        'volatility_1y': volatility_1y,
        'max_drawdown_1y': max_drawdown_1y
    }
```

These signals tell us how strongly the market has already responded to each company.

Now we run the same logic for every ticker.

```py
market_rows = []

for ticker in universe['ticker']:
    try:
        prices = get_price_history(ticker)
        signals = calculate_market_signals(prices)
        signals['ticker'] = ticker
        market_rows.append(signals)
        print(f'{ticker} DONE')

    except Exception:
        market_rows.append({
            'ticker': ticker,
            'return_1y': np.nan,
            'return_6m': np.nan,
            'return_3m': np.nan,
            'volatility_1y': np.nan,
            'max_drawdown_1y': np.nan
        })
        print(f'{ticker} ERROR')

market_signals = pd.DataFrame(market_rows)

market_signals.head()
```

![Market Signals (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/3f270de4-2a76-4419-99e6-f6ab322b66f6.png)

Finally, we merge the universe, fundamentals, and market signals into one dataset.

```py
capex_data = universe.merge(fundamentals, on='ticker', how='left')
capex_data = capex_data.merge(market_signals, on='ticker', how='left')

print(capex_data.columns)
capex_data.head()
```

![Capex data columns (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/eee12f1d-846a-4d08-a968-e2cec4b538a9.png)

![Capex data (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5ba2a827-f946-4347-a914-f5c30c84cba0.png)

---

## Separating Business Strength from Market Recognition

Now comes the part that makes the analysis useful.

If we only look at stock returns, we end up chasing what already moved. If we only look at fundamentals, we miss how the market is actually treating the theme.

So I split the analysis into two simple signals:

- **Fundamental Signal:** is the business showing growth and profitability?
- **Market Recognition Signal:** has the market already rewarded the stock?

First, we need a helper function to normalize each metric.

```py
def min_max_score(series):
    series = pd.to_numeric(series, errors='coerce')

    if series.isna().all():
        return pd.Series(0, index=series.index)

    min_val = series.min()
    max_val = series.max()

    if min_val == max_val:
        return pd.Series(0.5, index=series.index)

    return (series - min_val) / (max_val - min_val)
```

This brings every metric into a 0 to 1 range, so growth, margins, returns, and drawdowns can be compared without mixing raw scales.

### Fundamental Signal

Now we build the fundamental signal.

```py
capex_data['revenue_growth_score'] = min_max_score(capex_data['revenue_growth_yoy'])
capex_data['profit_margin_score'] = min_max_score(capex_data['profit_margin'])
capex_data['operating_margin_score'] = min_max_score(capex_data['operating_margin'])
capex_data['roe_score'] = min_max_score(capex_data['return_on_equity'])

capex_data['fundamental_signal'] = (
    capex_data['revenue_growth_score'] * 0.35 +
    capex_data['operating_margin_score'] * 0.30 +
    capex_data['profit_margin_score'] * 0.20 +
    capex_data['roe_score'] * 0.15
) * 100

capex_data['fundamental_signal'] = capex_data['fundamental_signal'].round(2)
capex_data[['ticker', 'company', 'capex_layer', 'revenue_growth_yoy', 'operating_margin', 'profit_margin', 'return_on_equity', 'fundamental_signal']].sort_values('fundamental_signal', ascending=False).head(10)
```

![Fundamental signal (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/fcbea8d5-dd09-422d-910d-db0d54df9b80.png)

This signal isn't trying to crown the best company. It's just checking whether the business data supports the AI capex story.

In my run, NVIDIA clearly stood out because its revenue growth and margins were on a different level. But the interesting part was not only NVIDIA. Names like KLA, Arista, Broadcom, Microsoft, Meta, Lam Research, Alphabet, and Super Micro also appeared near the top for different reasons.

That already tells us something important: the AI capex chain has different types of winners. Some are high-margin platform businesses. Some are semiconductor equipment names. Some are high-growth hardware names with thinner margins.

### Market Recognition Signal

Now we build the market recognition signal.

```py
capex_data['return_1y_score'] = min_max_score(capex_data['return_1y'])
capex_data['return_6m_score'] = min_max_score(capex_data['return_6m'])
capex_data['return_3m_score'] = min_max_score(capex_data['return_3m'])
capex_data['drawdown_score'] = min_max_score(capex_data['max_drawdown_1y'])

capex_data['market_recognition_signal'] = (
    capex_data['return_1y_score'] * 0.40 +
    capex_data['return_6m_score'] * 0.30 +
    capex_data['return_3m_score'] * 0.20 +
    capex_data['drawdown_score'] * 0.10
) * 100

capex_data['market_recognition_signal'] = capex_data['market_recognition_signal'].round(2)
capex_data[['ticker','company','capex_layer','return_1y','return_6m','return_3m','max_drawdown_1y','market_recognition_signal']].sort_values('market_recognition_signal', ascending=False).head(10)
```

![Market recognition signal (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/03f91e5a-e63f-49db-95ec-4f718c0c25f0.png)

This is where the story gets more interesting.

The market recognition list wasn't just filled with hyperscalers or chip names. Comfort Systems, Vertiv, Quanta Services, Dell, Applied Materials, and Lam Research showed up strongly. That is the first clear sign that the AI capex trade is spreading into the physical infrastructure layer, not staying locked inside the usual mega-cap AI basket.

---

## The AI Capex Matrix: Where the Trade Actually Shows Up

At this point, we have two separate lenses.

- The fundamental signal tells us whether the business looks strong.
- The market recognition signal tells us whether the stock has already been rewarded.

Now we can put both on the same chart.

```py :collapsed-lines
plt.figure(figsize=(12, 8))

plot_data = capex_data.dropna(
    subset=['market_recognition_signal', 'fundamental_signal', 'market_cap']
).copy()

plot_data['bubble_size'] = np.sqrt(plot_data['market_cap']) / 5000

for layer in plot_data['capex_layer'].unique():
    layer_data = plot_data[plot_data['capex_layer'] == layer]

    plt.scatter(
        layer_data['market_recognition_signal'],
        layer_data['fundamental_signal'],
        s=layer_data['bubble_size'],
        alpha=0.6,
        label=layer
    )

for _, row in plot_data.iterrows():
    if row['market_recognition_signal'] > 55 or row['fundamental_signal'] > 45:
        plt.text(row['market_recognition_signal'] + 0.8, row['fundamental_signal'] + 0.8, row['ticker'].replace('.US', ''), fontsize=10)

plt.axvline(plot_data['market_recognition_signal'].median(), linestyle='--', linewidth=1)
plt.axhline(plot_data['fundamental_signal'].median(), linestyle='--', linewidth=1)

plt.text(median_market + 2, median_fundamental + 55, 'Strong fundamentals,\nmore recognized',fontsize=10)
plt.text(4, median_fundamental + 55,'Strong fundamentals,\nless recognized',fontsize=10)
plt.text(median_market + 2, 4, 'High market recognition,\nweaker fundamentals',fontsize=10)
plt.text(4, 4, 'Less clear in this framework', fontsize=10)

plt.title('AI Capex Matrix: Fundamentals vs Market Recognition')
plt.xlabel('Market Recognition Signal')
plt.ylabel('Fundamental Signal')
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.tight_layout()
plt.show()
```

![AI Capex Matrix: Fundamentals vs Market Recognition (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ece6d0b1-a270-4e68-9220-d2b50064e691.png)

This is the most useful chart in the study.

It makes one thing clear: AI capex doesn't show up in one clean cluster.

NVIDIA is the obvious fundamental outlier. That makes sense. Its growth and margins are difficult to compare with almost anything else in the universe.

But the right side of the chart is where the broader story starts. AMD, Marvell, Vertiv, Comfort Systems, Dell, Lam Research, Applied Materials, and Quanta Services show stronger market recognition. That is a very different mix of companies. Some are chip-related. Some are equipment-related. Some are physical infrastructure names.

That matters because it shows the market isn't only rewarding the most obvious AI companies. It's also rewarding the companies that help turn AI capex into actual infrastructure.

This is the main shift in the article: the AI capex trade starts looking less like a tech basket and more like a buildout chain.

---

## Which AI Infrastructure Layers Has the Market Rewarded Most?

The matrix is useful at the company level. But the AI capex trade also needs to be viewed by layer.

So next, I grouped the companies by `capex_layer` and calculated median returns and median signal scores.

```py
layer_performance = capex_data.groupby('capex_layer').agg(
    company_count=('ticker', 'count'),
    median_return_1y=('return_1y', 'median'),
    median_return_6m=('return_6m', 'median'),
    median_fundamental_signal=('fundamental_signal', 'median'),
    median_market_recognition=('market_recognition_signal', 'median')
).reset_index()

layer_performance = layer_performance.sort_values('median_return_1y', ascending=False)

layer_performance
```

![Layer performance summary (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/bfd9fa16-a5e8-4a30-ada3-d707522cdd81.png)

Then I plotted the median one-year return by infrastructure layer.

```py
plt.figure(figsize=(11, 6))

plt.barh(layer_performance['capex_layer'], layer_performance['median_return_1y'] * 100)

plt.gca().invert_yaxis()

plt.title('Median 1Y Return by AI Infrastructure Layer', fontsize=14, pad=12)
plt.xlabel('Median 1Y Return (%)')
plt.ylabel('')

plt.grid(axis='x', alpha=0.25)

plt.tight_layout()
plt.show()
```

![Median 1Y Return by AI Infrastructure Layer (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ed630cda-e8ff-43e3-aa10-a95a9b210a6a.png)

This chart is where the story becomes much less obvious.

Construction and engineering ranked at the top by median one-year return, followed by semiconductor equipment, AI compute and chips, and servers and storage. That's not the usual way people talk about the AI trade.

The takeaway is not that construction and engineering is automatically the best AI capex layer. The sample size is small, so the result should be read as directional. But it still tells us something useful: the market has been rewarding the physical buildout side of AI infrastructure, not just the companies selling chips or cloud services.

That's the larger point. Once AI capex becomes real-world infrastructure, the trade starts showing up in companies tied to equipment, servers, electrical work, and construction.

---

## The Physical Infrastructure Layer Is No Longer Hidden

This is the part of the AI capex trade that I find most useful.

The obvious AI story starts with chips and hyperscalers. But once the spending becomes real infrastructure, the list gets wider. AI data centers need servers, networking equipment, power systems, cooling, grid work, electrical construction, and physical capacity.

So I filtered the dataset to focus on the non-obvious infrastructure layers.

```py
physical_layers = ['Power and electrification', 'Cooling and industrial systems', 'Construction and engineering',
                   'Data centers', 'Servers and storage', 'Networking']

physical_infra = capex_data[capex_data['capex_layer'].isin(physical_layers)].copy()
physical_infra = physical_infra.sort_values(['market_recognition_signal', 'fundamental_signal'], ascending=False)
physical_watchlist = physical_infra[['ticker', 'company', 'capex_layer', 'revenue_growth_yoy', 'operating_margin',
                                     'return_1y', 'return_6m', 'fundamental_signal', 'market_recognition_signal']].head(12)

physical_watchlist.head(10)
```

![Physical infrastructure watchlist (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/5187a7b4-99de-4f69-8e23-df3a2625ef11.png)

Comfort Systems, Vertiv, Dell, Quanta Services, Cisco, HPE, EMCOR, Equinix, Johnson Controls, and Digital Realty all sit in different parts of the physical buildout. Some are tied to servers. Some are tied to power and electrification. Some are tied to data centers, cooling, or construction.

The key point is simple: the market is already treating parts of the physical infrastructure layer as part of the AI capex story.

That doesn't mean every name here has the same quality or the same upside. The fundamental signals vary a lot. But the table shows why looking only at "AI software" or "AI chip" names misses a large part of the spending chain.

---

## What the Market Has Already Noticed

This section is important because not every AI capex name is early.

Some companies in the chain have already moved aggressively. That doesn't make them weak companies, but it changes the question. At that point, the question is no longer just whether the company is exposed to AI infrastructure. The better question is whether the market has already priced in a large part of that exposure.

To check that, I sorted the universe by the market recognition signal.

```py
market_already_noticed = capex_data.sort_values('market_recognition_signal', ascending=False).head(10).copy()

market_already_noticed['return_1y'] = (market_already_noticed['return_1y'] * 100).round(2)
market_already_noticed['return_6m'] = (market_already_noticed['return_6m'] * 100).round(2)
market_already_noticed['return_3m'] = (market_already_noticed['return_3m'] * 100).round(2)
market_already_noticed['max_drawdown_1y'] = (market_already_noticed['max_drawdown_1y'] * 100).round(2)

market_already_noticed = market_already_noticed[['ticker', 'company', 'capex_layer', 'return_1y', 'return_6m', 'return_3m', 
                                                 'max_drawdown_1y', 'market_recognition_signal', 'fundamental_signal']]

market_already_noticed
```

![Market already noticed list (Image by Author)](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/2ac645ab-3050-453e-a4cd-a78e0a966030.png)

This list is a useful reality check.

Comfort Systems, AMD, Marvell, Vertiv, Lam Research, Dell, Applied Materials, Quanta Services, Cisco, and Alphabet all show up with strong market recognition. The mix is the important part. It includes chips, semiconductor equipment, servers, networking, power, construction, and a hyperscaler.

That tells us the AI capex trade has already broadened in price action. It's not waiting quietly in the background.

But this also means we need to be careful with the "hidden beneficiary" framing. Some infrastructure names have already delivered very large one-year returns. So the smarter follow-up question is not:

> "Which companies are exposed?"

It's:

> "How much of that exposure has the market already recognized?"

---

## What This Study Shows

The AI capex trade is easier to understand when we stop treating it as one group of "AI stocks."

The data shows three things clearly.

First, the obvious names still matter. NVIDIA remains the cleanest fundamental outlier in this universe, and chip-related names continue to sit close to the center of the AI infrastructure story.

Second, the trade has already moved beyond chips. Semiconductor equipment, servers, networking, power, and construction names all show up in the market recognition data. That makes sense. AI infrastructure isn't just model training. It needs physical capacity, electrical systems, cooling, data centers, and buildout work.

Third, market recognition and business strength don't always move together. Some companies have strong fundamentals but quieter price action. Others have already moved aggressively, even if their fundamental signal isn't as strong. That's why a simple "AI beneficiary" label isn't enough.

---

## Conclusion

AI capex isn't just a mega-cap tech story. It's a spending chain.

Once we trace that chain, the theme becomes broader and more interesting. It moves from chips to semiconductor equipment, from servers to networking, from data centers to power, cooling, and construction.

The goal of this study wasn't to find the best AI infrastructure stock. It was to build a clearer map of where the trade is already showing up.

That map matters because the next phase of the AI story may not be about who mentions AI the most. It may be about who sits closest to the infrastructure that makes AI possible.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Beyond NVIDIA: Where the AI Infra Trade Actually Shows Up",
  "desc": "The AI capex trade is usually discussed like one clean idea. Capex simply means capital expenditure, or the money companies spend on long-term assets like data centers, chips, servers, power systems, ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/beyond-nvidia-where-the-ai-infra-trade-actually-shows-up.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
