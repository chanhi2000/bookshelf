---
lang: en-US
title: "How to Analyze Insider Transactions with Python: A CEO Buying Case Study"
description: "Article(s) > How to Analyze Insider Transactions with Python: A CEO Buying Case Study"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
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
  - fnce
  - finance
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Analyze Insider Transactions with Python: A CEO Buying Case Study"
    - property: og:description
      content: "How to Analyze Insider Transactions with Python: A CEO Buying Case Study"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-analyze-insider-transactions-with-python-a-ceo-buying-case-study.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Nikhil Adithyan
    url: https://freecodecamp.org/news/author/NikhilAdithyan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6ec83342-4382-4daf-99b7-2afef1cdf3f2.png
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
  name="How to Analyze Insider Transactions with Python: A CEO Buying Case Study"
  desc="When a CEO buys shares after their company’s stock has fallen hard, it's tempting to read the purchase as a vote of confidence. The person running the business knows more than the average investor, so"
  url="https://freecodecamp.org/news/how-to-analyze-insider-transactions-with-python-a-ceo-buying-case-study"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6ec83342-4382-4daf-99b7-2afef1cdf3f2.png"/>

When a CEO buys shares after their company’s stock has fallen hard, it's tempting to read the purchase as a vote of confidence. The person running the business knows more than the average investor, so the trade feels like a signal worth following.

But there's an obvious problem. Stocks that fall 20% or more often rebound even when no insider buys anything. If we only measure what happened after CEO purchases, we may end up crediting the insider signal for a recovery that was already common among beaten-down stocks.

In this tutorial, we'll build a Python workflow to test that properly. We'll pull Form 4 transactions, isolate CEO purchases, collapse repeated filing rows into usable events, attach historical prices, calculate drawdowns and forward returns, and then compare the purchase episodes with similar no-purchase dates from the same stocks.

The interesting part isn't just the final return table. It's everything required to turn messy regulatory filings into a dataset that can support a fair comparison. Along the way, we'll deal with duplicate transaction rows, repeated purchases by the same CEO, trading-day alignment, incomplete price histories, and one-to-one control matching.

By the end, we'll have a full event-study workflow and a more useful answer than “the stock went up after the CEO bought.”

::: note Prerequisites

You don't need an advanced finance or quantitative background to follow this tutorial. A basic understanding of Python and `pandas` should be enough.

Before starting, make sure you have:

- Python installed locally, or access to a notebook environment such as Jupyter Notebook or Google Colab
- Basic familiarity with dataframes, functions, loops, and API requests
- An EODHD API key with access to the screener, Form 4 filings, and historical EOD endpoints
- Enough API credits to process the number of stocks you choose to analyze

The full case study uses Form 4 data from 500 securities. You can run the workflow on a smaller sample first if you want to understand the code without using as many API calls.

No prior knowledge of event studies or control matching is required. We'll build those parts step by step as they appear in the analysis.

:::

---

## Import The Required Packages

We only need a small set of packages for the full workflow. `requests` handles the API calls, `pandas` and `NumPy` do most of the data work, and SciPy gives us the one-to-one matching algorithm used later for the control group.

```py
import json
import re
import numpy as np
import pandas as pd
import requests
from scipy.optimize import linear_sum_assignment
```

That's the full setup. We're only importing what the analysis actually needs, without adding extra libraries or unnecessary tooling. Make sure to install these packages using `pip` before importing them to your environment.

---

## Build The Stock Universe

Before pulling insider filings, we need a list of companies to search.

Rather than starting with one market-cap segment, we'll build a mixed universe across micro-, small-, mid-, and large-cap stocks. This gives the analysis some variation instead of letting one part of the market dominate the sample.

The market-cap buckets are:

- `micro_cap`: $50 million to $300 million
- `small_cap`: $300 million to $2 billion
- `mid_cap`: $2 billion to $10 billion
- `large_cap`: $10 billion and above

For each bucket, we'll fetch 500 screener results, randomly select 250, and combine them into a 1,000-stock universe.

```py :collapsed-lines
def fetch_stocks(filters, cap):
    api_key = 'YOUR EODHD API KEY'
    base_url = 'https://eodhd.com/api/screener'
    all_stocks = []
    for i in range(0,500,100):
        params = {
            "api_token": api_key,
            "filters": json.dumps(filters),
            "sort": "market_capitalization.desc",
            "limit": 100,
            "offset": i}
        resp = requests.get(base_url, params = params).json()
        stocks = list(pd.DataFrame(resp['data'])['code'])
        all_stocks.append(stocks)
    all_stocks = [item for sublist in all_stocks for item in sublist]
    df = pd.DataFrame(columns = ['ticker', f'cap'])
    df.ticker, df.cap = all_stocks, cap
    df = df.sample(n = 250, random_state = 42)
    return df

micro_filters = [
    ["exchange", "=", "us"],
    ["market_capitalization", ">=", 50_000_000],
    ["market_capitalization", "<", 300_000_000]
]

small_filters = [
    ["exchange", "=", "NYSE"],
    ["market_capitalization", ">=", 300_000_000],
    ["market_capitalization", "<", 2_000_000_000]
]

mid_filters = [
    ["exchange", "=", "NYSE"],
    ["market_capitalization", ">=", 2_000_000_000],
    ["market_capitalization", "<", 10_000_000_000]
]

large_filters = [
    ["exchange", "=", "NYSE"],
    ["market_capitalization", ">=", 10_000_000_000]
]

micro_stocks = fetch_stocks(micro_filters, 'micro_cap')
small_stocks = fetch_stocks(small_filters, 'small_cap')
mid_stocks = fetch_stocks(mid_filters, 'mid_cap')
large_stocks = fetch_stocks(large_filters, 'large_cap')

frames = [micro_stocks, small_stocks, mid_stocks, large_stocks]
stocks_1000 = pd.concat(frames, ignore_index = True)
stocks_1000 = stocks_1000.sample(frac = 1, random_state = 42).reset_index(drop = True)
stocks_1000
```

::: note

Replace `YOUR EODHD API KEY` with your actual EODHD API key. If you don’t have one, you can obtain it by opening an [<VPIcon icon="fas fa-globe"/>EODHD developer account](https://eodhd.com/).

:::

The screener returns at most 100 rows per request, so the loop moves through the first 500 results in five batches.

We then sample 250 tickers from those candidates. The fixed random seed makes the selection repeatable, so rerunning the cell produces the same sample. After that, we define the four market-cap filters and run the function for each one.

The final dataframe contains 1,000 tickers, with 250 from each bucket.

![stocks universe](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/cf6cc7ee-0796-42cc-815c-0f655c1aa434.png)

One caveat is worth stating now. The micro-cap filter uses the broader `us` exchange setting, while the other groups use `NYSE`. This is the screener sample used for the case study, but it shouldn't be treated as a perfectly representative sample of the entire US stock market.

---

## Fetch CEO Purchases And Apply The Date Filter

With the stock universe ready, we can start searching the Form 4 filings for CEO purchases using [<VPIcon icon="fas fa-globe"/>EODHD’s Insider Transactions (SEC Form 4) API](https://eodhd.com/financial-apis/insider-transactions-api).

Form 4 data contains much more than straightforward insider buying. A filing can include sales, awards, option exercises, derivative transactions, and several rows belonging to the same trade. So we can't simply download every filing and treat every record as a buying signal.

For this analysis, a transaction must satisfy all of these conditions:

- appear under non-derivative transactions
- be reported by an officer
- have an officer title that identifies the person as a CEO
- use transaction code `P`
- represent acquired shares
- contain positive values for both shares and price
- refer to common stock

We also retain both the transaction date and filing date. The transaction date tells us when the CEO bought the shares, while the filing date tells us when outside investors could observe the purchase. Later in the analysis, the filing date will become the signal date.

The following block handles the complete extraction. It defines the filtering function, runs it across the first 500 stocks, and combines all qualifying rows into one dataframe.

```py :collapsed-lines
def fetch_ceo_purchases(ticker):
    try:
        api_key = 'YOUR EODHD API KEY'

        all_form4 = []

        for i in range(0,1000,100):
            form4_url = f'https://eodhd.com/api/sec-filings/{ticker}/form4?api_token={api_key}&page[limit]=100&page[offset]={i}'
            resp = requests.get(form4_url).json()['data']
            all_form4.append(resp)

        all_form4 = [item for sublist in all_form4 for item in sublist]

        all_purchases = []

        ceo_pattern = re.compile(
            r'\bceo\b|chief executive officer|co-chief executive officer|co-ceo|chief exec officer',
            re.IGNORECASE
        )

        for filing in all_form4:
            footnote_map = {
                footnote['footnote_id']: footnote['text']
                for footnote in filing.get('footnotes', [])
            }

            for transaction in filing.get('non_derivative', []):
                officer_title = transaction.get('officer_title') or ''
                security_title = transaction.get('security_title') or ''
                shares_amount = transaction.get('shares_amount')
                price_per_share = transaction.get('price_per_share')

                is_ceo = bool(ceo_pattern.search(officer_title))

                is_purchase = (
                    transaction.get('is_officer') is True
                    and is_ceo
                    and transaction.get('transaction_code') == 'P'
                    and transaction.get('acquired_or_disposed') == 'A'
                    and shares_amount is not None
                    and shares_amount > 0
                    and price_per_share is not None
                    and price_per_share > 0
                    and 'common stock' in security_title.lower()
                )

                if not is_purchase:
                    continue

                linked_footnotes = ' '.join(
                    footnote_map.get(footnote_id, '')
                    for footnote_id in transaction.get('footnote_ids', [])
                )

                all_purchases.append({
                    'ticker': ticker,
                    'accession_number': filing['accession_number'],
                    'filed_at': filing['filed_at'],
                    'transaction_date': transaction['transaction_date'],
                    'reporting_owner_cik': transaction['reporting_owner_cik'],
                    'reporting_owner_name': transaction['reporting_owner_name'],
                    'officer_title': officer_title,
                    'security_title': security_title,
                    'shares_amount': shares_amount,
                    'price_per_share': price_per_share,
                    'total_value': transaction.get('total_value'),
                    'shares_owned_after': transaction.get('shares_owned_after'),
                    'footnotes': linked_footnotes
                })

        return all_purchases
    except:
        return None

all_ceo_purchases = []

for ticker in stocks_1000.ticker[:500]:
    ticker = ticker + '.US'
    ceo_purchases = fetch_ceo_purchases(ticker)
    if ceo_purchases:
        all_ceo_purchases.extend(ceo_purchases)
        print(f'{len(ceo_purchases)} ceo purchases found in {ticker}')
    else:
        print(f'no transaction found in {ticker}')
        
cp_df = pd.DataFrame(all_ceo_purchases)
cp_df.to_csv('ceo_purchases.csv')
```

The function requests the filings in batches of 100 and flattens the returned pages into one list. It then checks every non-derivative transaction against the CEO-purchase rules.

The CEO-title check uses a regular expression because filings don't use one perfectly consistent title. A CEO might appear as `CEO`, `Chief Executive Officer`, or `Co-CEO`, so matching only one exact string would miss valid records.

We also preserve the linked footnotes. Transaction code `P` is useful, but it doesn't tell the complete story by itself. A footnote may reveal that the purchase involved a trading plan, an offering, or another arrangement that deserves closer inspection.

I ran this step on the first 500 securities in the universe because the Form 4 endpoint can consume API credits quickly. The same loop can be extended to all 1,000 stocks for a larger sample.

Once the rows are collected, we restrict the dataset to filings submitted between the beginning of 2022 and the end of 2025.

```py
cp_df = cp_df[cp_df["filed_at"].between("2022-01-01","2025-12-31")]

cp_df.tail()
```

![CEO Purchases](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/7ee92269-bbdd-4a15-b16b-81b567eede69.png)

These are still raw filing rows rather than independent CEO-buying signals. One purchase can be split across several rows when different blocks of shares were acquired at different prices. The next step is to collapse those fragments into daily purchase events.

---

## Turn Form 4 Rows Into Daily Purchase Events

A CEO might buy shares at several prices on the same day. The filing can record each price block as a separate row, even though those rows belong to one broader purchase. If we treated every row as an independent signal, one busy purchase day could receive far more weight than another simply because it was split into more price levels.

So the next step is to group rows that share the same **ticker**, **CEO**, **filing**, and **transaction** date.

For each group, we'll add up the shares and total purchase value. We'll then calculate a weighted-average price:

**_weighted average price = total purchase value / total shares purchased_**

The following block performs the full aggregation and produces one row per daily CEO-purchase event.

```py :collapsed-lines
cp_df['purchase_value'] = (
    cp_df['shares_amount'] * cp_df['price_per_share']
)

group_columns = [
    'ticker',
    'reporting_owner_cik',
    'reporting_owner_name',
    'officer_title',
    'accession_number',
    'filed_at',
    'transaction_date'
]

daily_events = (
    cp_df.groupby(
        group_columns,
        as_index=False,
        dropna=False
    )
    .agg(
        shares_purchased=('shares_amount', 'sum'),
        total_purchase_value=('purchase_value', 'sum'),
        transaction_rows=('shares_amount', 'size'),
        shares_owned_after=('shares_owned_after', 'max')
    )
)

daily_events['weighted_average_price'] = (
    daily_events['total_purchase_value']
    / daily_events['shares_purchased']
)

daily_events.filed_at = pd.to_datetime(daily_events.filed_at)
daily_events.to_csv('ceo_purchases_grouped.csv')
daily_events.tail()
```

The `purchase_value` column gives every raw row a dollar value before aggregation. Once the rows are grouped, those values can be summed without losing the effect of the different purchase prices.

The `transaction_rows` column is useful for checking how much collapsing happened. A value of `1` means the daily event already appeared as one row. A value of `5` means five separate filing rows were combined into one purchase event.

![Grouped CEO Purchase Dataset](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/fcf772a6-ca1b-46e8-b886-bef8ce3f52e2.png)

The aggregation reduced the dataset from 625 raw transaction rows to 535 daily purchase events.

That difference isn't just housekeeping. It changes the unit of analysis from “one reported price block” to “one CEO purchase day,” which is much closer to the economic event we're trying to study.

We're still not ready to calculate returns, though. A purchase event tells us that the CEO bought, but not whether the stock was near its high, down slightly, or already deep in a drawdown. Next, we'll attach the price context that was available when each filing became public.

---

## Add Historical Prices And Drawdowns

A CEO purchase only becomes interesting in this test when we know where the stock was trading at the time.

A purchase made 5% below the yearly high is very different from one made after the stock has fallen 40%. So we now need to bring historical price data into the workflow and measure how far each stock was below its recent high when the filing became public.

We'll use adjusted close rather than the raw closing price because adjusted prices account for events such as stock splits and dividends. That gives us a more consistent series for comparing prices across time.

We pull prices from 2021 through 2025, even though the purchase analysis begins in 2022. The extra year is needed because the first 2022 observations still require enough earlier data to calculate a trailing one-year high.

The following block fetches the daily historical prices [<VPIcon icon="fas fa-globe"/>EODHD’s historical EOD endpoint](https://eodhd.com/lp/historical-eod-api) for every ticker represented in the CEO-purchase dataset and combines them into one dataframe.

```py
tickers = list(cp_df.ticker.unique())
historical_eod_entries = []

def fetch_historical_eod(ticker):
    api_key = 'YOUR EODHD API KEY'
    historical_url = f'https://eodhd.com/api/eod/{ticker}?from=2021-01-01&to=2025-12-31&period=d&api_token={api_key}&fmt=json'
    historical_resp = requests.get(historical_url).json()
    historical_filtered = []
    for item in historical_resp:
        item['ticker'] = ticker
        keys = ['ticker', 'date', 'adjusted_close']
        item = {key: item.get(key) for key in keys}
        historical_filtered.append(item)
    return historical_filtered

for ticker in tickers:
    try:
        historical_eod = fetch_historical_eod(ticker)
        historical_eod_entries.extend(historical_eod)
        print(f'{ticker} done')
    except:
        print(f'{ticker} error')
```

This code fetches the historical data and gives us one price row per ticker per trading day. Next, we calculate the rolling high and drawdown.

### Calculate The Trailing High And Drawdown

For every trading day, we want to know the highest adjusted close reached during the previous 252 trading sessions. That's roughly one trading year.

The drawdown is then calculated as:

**_drawdown = adjusted close / trailing 252-day high - 1_**

A value of `-0.20` means the stock is 20% below its trailing high. A value of `-0.35` means it's 35% below that high.

The next block sorts each stock’s price history, calculates the rolling high, and converts the result into both decimal and percentage drawdown columns.

```py
historical_df = pd.DataFrame(historical_eod_entries)
historical_df['date'] = pd.to_datetime(historical_df.date)

historical_df['rolling_high_252'] = (historical_df.groupby('ticker')['adjusted_close'].transform
                                     (lambda prices: prices.rolling(window=252, min_periods=200).max()))

historical_df['drawdown'] = (historical_df['adjusted_close']/ historical_df['rolling_high_252']- 1)
historical_df['drawdown_pct'] = (historical_df['drawdown'] * 100)
```

The `min_periods=200` argument deserves a quick explanation.

A full rolling window contains 252 trading days, but requiring exactly 252 observations would remove many early rows. Allowing the calculation after 200 sessions gives us some flexibility while still requiring a substantial amount of historical data.

Rows without enough history remain missing rather than receiving a weak drawdown estimate.

### Match Each Purchase With The Latest Available Price

Now we need to attach the price context to each CEO-purchase event.

The filing date is the signal date, but we shouldn't use the closing price from that same date. A Form 4 can be submitted before, during, or after the trading session, so the same-day close may not have been known when the filing appeared.

Instead, we use the latest completed trading day strictly before the filing date.

The next block performs that match with `merge_asof()`. Unlike a normal merge, it can match each filing with the nearest earlier price date rather than requiring both dates to be identical.

```py
cp_df.filed_at = pd.to_datetime(cp_df.filed_at)

price_columns = ['ticker', 'date', 'adjusted_close', 'rolling_high_252', 'drawdown', 'drawdown_pct']

analysis_df = pd.merge_asof(
    cp_df.sort_values(['filed_at', 'ticker']),
    historical_df[price_columns].sort_values(['date', 'ticker']),
    by='ticker',
    left_on='filed_at',
    right_on='date',
    direction='backward',
    allow_exact_matches=False
)

analysis_df = analysis_df.rename(columns={'date': 'price_date'})
```

The key setting is `allow_exact_matches=False`. It prevents a filing dated March 10 from using the March 10 closing price. The merge will instead use the latest available trading day before March 10. The merged dataframe now looks like this:

![Merged Dataset](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c0ba4514-0e32-4748-bec0-88421854df9c.png)

The merged dataframe now contains the purchase information alongside:

- `price_date`: the trading day used for the match
- `adjusted_close`: the stock price on that day
- `rolling_high_252`: the trailing one-year high
- `drawdown`: the decline expressed as a decimal
- `drawdown_pct`: the same decline expressed as a percentage

For example, a `drawdown_pct` value of `-32.4` means the stock was 32.4% below its trailing 252-day high on the last completed trading day before the filing.

We now know both that the CEO bought and how beaten down the stock was when the purchase became public.

The next problem is repeated buying. A CEO who buys several times over a few weeks shouldn't automatically create several independent signals.

---

## Convert Purchase Events Into Episodes

At this point, the dataset has one row per CEO purchase day. That's better than working with raw Form 4 rows, but it can still overcount the same underlying decision.

Imagine a CEO buys shares on Monday, again the following week, and once more two weeks later. Technically, those are three purchase events. Economically, they may be one sustained buying campaign.

Treating all three as independent signals would give frequent buyers more weight than CEOs who completed the same idea in one trade. So before calculating returns, we'll group nearby purchases into **buying episodes**.

The rule is simple: purchases by the same CEO in the same stock belong to one episode when consecutive filing dates are no more than 28 calendar days apart.

We'll first remove purchase events without a usable drawdown, sort the remaining rows by ticker, CEO, and filing date, and calculate the number of days since the previous purchase.

```py
purchase_events = analysis_df.dropna(subset=["drawdown"])
purchase_events.filed_at = pd.to_datetime(purchase_events.filed_at)
purchase_events = purchase_events.sort_values(["ticker", "reporting_owner_cik", "filed_at"])
purchase_events["days_since_previous"] = purchase_events.groupby(["ticker", "reporting_owner_cik"])["filed_at"].diff().dt.days
purchase_events["new_episode"] = purchase_events["days_since_previous"].isna() | (purchase_events["days_since_previous"] > 28)
purchase_events["episode_id"] = purchase_events.groupby(["ticker", "reporting_owner_cik"])["new_episode"].cumsum()
```

The first purchase for every ticker-CEO combination automatically starts a new episode because there's no earlier filing to compare it with.

After that, a new episode begins only when the gap from the previous filing exceeds 28 days. Purchases separated by 28 days or less stay inside the same episode.

The cumulative sum of `new_episode` gives every buying sequence its own identifier.

Now that each purchase event belongs to an episode, we can collapse the events into one row per buying sequence.

For each episode, we keep the first and last filing dates, add up the shares and purchase value, count the purchase activity, and preserve the drawdown from the first filing date.

```py
episodes = purchase_events.groupby(["ticker", "reporting_owner_cik", "reporting_owner_name", "episode_id"], 
                               as_index=False).agg(first_filing_date=("filed_at", "min"), 
                                                   last_filing_date=("filed_at", "max"),
                                                   first_transaction_date=("transaction_date", "min"),
                                                   total_shares=("shares_purchased", "sum"),
                                                   total_purchase_value=("total_purchase_value", "sum"),
                                                   purchase_days=("filed_at", "nunique"),
                                                   transaction_events=("filed_at", "size"),
                                                   initial_drawdown=("drawdown", "first"), 
                                                   initial_drawdown_pct=("drawdown_pct", "first"))
```

There are two activity counts here:

- `purchase_days` counts the number of distinct filing dates in the episode.
- `transaction_events` counts the daily purchase events that were grouped together.

The total shares and purchase value cover the entire episode. But the drawdown comes only from the first filing date because that's when the signal begins.

That detail matters for the 20% filter.

Suppose an episode starts when the stock is 18% below its high, then the CEO buys again after the drawdown reaches 24%. It would be misleading to call that an episode that began after a 20% decline.

So we group first, then apply the threshold using `initial_drawdown`.

```py
episodes_20 = episodes[episodes["initial_drawdown"] <= -0.20].copy()

print("All purchase episodes:", len(episodes))
print("20% drawdown episodes:", len(episodes_20))
print("Tickers represented:", episodes_20["ticker"].nunique())

episodes_20
```

![Purchase Episodes](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/c725daf8-16a3-461d-8269-3279310abe87.png)

![Purchase Episodes](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/8474797e-b23f-4db3-9f08-946fa4bfc783.png)

We have now reduced repeated purchases into 137 distinct CEO-buying episodes that started while the stock was at least 20% below its trailing high.

These episodes are the actual signals we'll follow through time. Next, we'll enter on the first trading day after the initial filing and measure what happened over one, three, six, and twelve months.

---

## Calculate Returns After CEO Purchases

We now have 137 CEO-buying episodes that began while the stock was at least 20% below its trailing 252-day high.

The next question is straightforward: what happened after those filings became public?

We'll use the first trading day after the episode’s initial filing as the entry date. That keeps the test realistic. An outside investor couldn't act before the Form 4 appeared, and using the next trading session also handles filings submitted on weekends or market holidays.

The return horizons are:

- 1 Month: 21 trading days
- 3 Months: 63 trading days
- 6 Months: 126 trading days
- 12 Months: 252 trading days

### Organize The Price History By Ticker

Before calculating returns, we'll create a separate, chronologically ordered price series for each stock.

This lets the return function find the correct entry date and then move forward by a fixed number of trading sessions without repeatedly filtering the full historical dataframe.

```py
episodes_20 = episodes_20.reset_index(drop = True)
episodes_20['first_filing_date'] = pd.to_datetime(episodes_20['first_filing_date'])
historical_df['date'] = pd.to_datetime(historical_df['date'])

prices = historical_df[['ticker', 'date', 'adjusted_close']].dropna().sort_values(['ticker', 'date'])
price_map = {ticker: group.reset_index(drop=True) for ticker, group in prices.groupby('ticker')}
```

`price_map` is a dictionary where each ticker points to its own dataframe of dates and adjusted closing prices.

For example, `price_map['AAT.US']` contains only the historical prices for `AAT.US`, already sorted from oldest to newest.

### Find The Entry Date And Calculate Forward Returns

Now we can write a function that handles one purchase episode at a time.

The function will:

1. locate the stock’s price history
2. find the first trading day strictly after the filing date
3. save that day’s adjusted close as the entry price
4. move forward by 21, 63, 126, and 252 trading sessions
5. calculate the return at each horizon

```py :collapsed-lines
def calculate_forward_returns(row):
    ticker_prices = price_map.get(row['ticker'])

    if ticker_prices is None:
        return pd.Series(dtype='object')

    dates = ticker_prices['date'].to_numpy(dtype='datetime64[ns]')
    entry_index = np.searchsorted(dates, np.datetime64(row['first_filing_date']), side='right')

    if entry_index >= len(ticker_prices):
        return pd.Series(dtype='object')

    entry_date = ticker_prices.loc[entry_index, 'date']
    entry_price = ticker_prices.loc[entry_index, 'adjusted_close']

    result = {'entry_date': entry_date, 'entry_price': entry_price}
    horizons = {'1m': 21, '3m': 63, '6m': 126, '12m': 252}

    for label, days in horizons.items():
        target_index = entry_index + days

        if target_index < len(ticker_prices):
            target_price = ticker_prices.loc[target_index, 'adjusted_close']
            result[f'date_{label}'] = ticker_prices.loc[target_index, 'date']
            result[f'return_{label}'] = target_price / entry_price - 1
        else:
            result[f'date_{label}'] = pd.NaT
            result[f'return_{label}'] = np.nan

    return pd.Series(result)

forward_returns = episodes_20.apply(calculate_forward_returns, axis=1)
episode_returns = pd.concat([episodes_20.reset_index(drop=True), forward_returns], axis=1)

episode_returns
```

The resulting dataframe contains the episode details, entry date, entry price, and forward returns at each horizon:

![CEO Purchase Forward Returns](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/75500507-177b-4bd7-bf42-8710eaefee45.png)

### Summarize The Raw Returns

Looking at individual episodes is useful, but we also need a compact view of the full sample.

For each horizon, we'll calculate:

- the number of available observations
- the mean return
- the median return
- the percentage of returns above zero

```py
summary = []

for horizon in ['1m', '3m', '6m', '12m']:
    returns = episode_returns[f'return_{horizon}'].dropna()

    summary.append({
        'horizon': horizon,
        'observations': len(returns),
        'mean_return': returns.mean(),
        'median_return': returns.median(),
        'positive_rate': (returns > 0).mean()
    })

summary_df = pd.DataFrame(summary)
summary_df
```

![Forward Returns Summary](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/3a527a68-a59b-4f66-bb59-ce0ac0ac4318.png)

At first glance, the results look promising. The average return reached 11.9% after three months and 35.4% after twelve months. Most twelve-month observations were also positive.

But this is exactly where it's easy to jump to the wrong conclusion.

These numbers tell us what happened after CEOs bought. They don't tell us how much of that performance came from the CEO purchase itself.

The stocks were already down at least 20%. Some of them may have rebounded simply because beaten-down stocks sometimes recover.

To separate those two effects, we need a comparison group made from similar drawdown dates where no CEO purchase occurred nearby.

---

## Build The No-Purchase Control Group

The raw return table looked encouraging, but it still gave CEO buying all the credit.

That's not a fair test. Every stock in the sample was already down at least 20%, and beaten-down stocks can rebound without any insider activity. We need to compare each CEO-purchase episode with another date where the same stock was under similar pressure but no CEO purchase happened nearby.

A valid control must satisfy six rules:

- same ticker
- same calendar year
- drawdown within five percentage points
- no more than 180 calendar days away
- no CEO purchase within 28 days before or after
- used only once

Each CEO-purchase episode is also matched only once.

### Create The Control Candidates

We'll start by finding every trading day between 2022 and 2025 when a stock was at least 20% below its trailing high.

There's one problem, though. A stock can stay below that threshold for months. If we kept every trading day, one long decline could create hundreds of nearly identical control candidates.

To avoid that, we'll split each continuous drawdown period into 28-day blocks and keep one candidate from each block.

```py
hist = historical_df[['ticker', 'date', 'adjusted_close', 'rolling_high_252', 'drawdown', 'drawdown_pct']].dropna(subset=['drawdown'])

hist['date'] = pd.to_datetime(hist['date'])
hist = hist[hist['date'].between('2022-01-01', '2025-12-31')].sort_values(['ticker', 'date'])

hist['below_20'] = hist['drawdown'] <= -0.20
hist['previous_below_20'] = hist.groupby('ticker')['below_20'].shift().fillna(False)
hist['new_state'] = hist['below_20'].ne(hist['previous_below_20'])
hist['drawdown_segment'] = hist.groupby('ticker')['new_state'].cumsum()

control_candidates = hist[hist['below_20']].copy()

control_candidates['segment_start'] = control_candidates.groupby(['ticker', 'drawdown_segment'])['date'].transform('min')
control_candidates['anchor_block'] = ((control_candidates['date'] - control_candidates['segment_start']).dt.days // 28)
control_candidates = control_candidates.sort_values(['ticker', 'date']).drop_duplicates(['ticker', 'drawdown_segment', 'anchor_block'])

control_candidates = control_candidates.reset_index(drop = True)
control_candidates
```

![Control Candidates](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/7fe986c2-f3d3-4dd8-884d-b98772b56834.png)

`below_20` marks the dates that pass the drawdown threshold.

`drawdown_segment` then separates one continuous decline from another. If the stock recovers above the threshold and falls below it again later, that becomes a new segment.

Inside each segment, `anchor_block` counts 28-day windows from the day the drawdown began. Keeping one row per block gives us a manageable set of dates without treating every session in the same decline as a fresh event.

These dates are only potential controls. We still need to remove any that occurred close to CEO buying.

### Remove Dates Near CEO Purchases

A no-purchase control should be genuinely separate from the insider signal.

For example, a drawdown date three days before a CEO filing would be a poor control. The transaction may already have happened, and the filing may simply not have appeared yet.

We therefore collect every CEO purchase filing date in the event dataset, not only the 137 episodes that passed the 20% threshold.

```py
purchase_dates = analysis_df[['ticker', 'filed_at']].dropna().drop_duplicates()
purchase_dates['filed_at'] = pd.to_datetime(purchase_dates['filed_at'])
purchase_dates = purchase_dates.rename(columns={'filed_at': 'purchase_date'})
purchase_dates
```

![purchase dates](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/384fe15f-d647-4152-9836-8ef8ac6fd427.png)

For each candidate, we now need to find the closest purchase filing before it and the closest purchase filing after it.

Two `merge_asof()` operations handle that. The first searches backward, while the second searches forward.

```py
control_candidates = pd.merge_asof(
    control_candidates.sort_values('date'),
    purchase_dates.sort_values('purchase_date'),
    by='ticker',
    left_on='date',
    right_on='purchase_date',
    direction='backward'
)

control_candidates = control_candidates.rename(columns={'purchase_date': 'previous_purchase_date'})

control_candidates = pd.merge_asof(
    control_candidates.sort_values('date'),
    purchase_dates.sort_values('purchase_date'),
    by='ticker',
    left_on='date',
    right_on='purchase_date',
    direction='forward'
)

control_candidates = control_candidates.rename(columns={'purchase_date': 'next_purchase_date'})
```

Each candidate now knows the nearest CEO purchase on either side.

We can calculate the distance from those filings and keep only dates that are more than 28 calendar days away from both.

```py
days_from_previous = (control_candidates['date'] - control_candidates['previous_purchase_date']).dt.days
days_to_next = (control_candidates['next_purchase_date'] - control_candidates['date']).dt.days

far_from_previous = control_candidates['previous_purchase_date'].isna() | (days_from_previous > 28)
far_from_next = control_candidates['next_purchase_date'].isna() | (days_to_next > 28)

control_candidates = control_candidates[far_from_previous & far_from_next]
control_candidates
```

A missing previous or next filing is fine. It simply means there was no CEO purchase on that side of the candidate within the available dataset.

![filtered candidates](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/be9c7d99-1f8a-4f5d-9631-c01185c194f8.png)

At this point, every remaining row represents a date when:

- the stock was down at least 20%
- the date wasn't part of the immediate neighborhood of a CEO purchase
- the stock had enough historical price data for the drawdown calculation

### Match Purchase Episodes With Controls

Now comes the actual matching.

We first give every CEO-purchase episode and every control candidate a unique identifier. We also extract the calendar year because matches must come from the same stock and year.

```py
purchase_pool = episodes_20.reset_index(drop = True)

purchase_pool['first_filing_date'] = pd.to_datetime(purchase_pool['first_filing_date'])
purchase_pool['year'] = purchase_pool['first_filing_date'].dt.year
purchase_pool['purchase_id'] = np.arange(len(purchase_pool))

control_candidates['year'] = control_candidates['date'].dt.year
control_candidates['control_id'] = np.arange(len(control_candidates))
```

The matching happens separately inside each ticker-year group.

Suppose a CEO bought when a stock was down 32%. We search for a no-purchase date in the same stock and year where the drawdown was close to 32%, while also keeping the dates no more than 180 calendar days apart.

A pair is valid only when:

- **drawdown difference <= 0.05**
- **calendar distance <= 180 days**

The next block builds the possible pairings and uses `linear_sum_assignment()` to select a one-to-one set of matches.

```py :collapsed-lines
matches = []
max_drawdown_gap = 0.05
max_calendar_gap = 180

for (ticker, year), purchases in purchase_pool.groupby(['ticker', 'year']):
    controls = control_candidates[(control_candidates['ticker'] == ticker) & (control_candidates['year'] == year)].copy()

    if controls.empty:
        continue

    purchase_drawdowns = purchases['initial_drawdown'].to_numpy()[:, None]
    control_drawdowns = controls['drawdown'].to_numpy()[None, :]
    drawdown_cost = np.abs(purchase_drawdowns - control_drawdowns)

    purchase_dates = purchases['first_filing_date'].to_numpy(dtype='datetime64[D]')
    control_dates = controls['date'].to_numpy(dtype='datetime64[D]')
    calendar_gap = np.abs((purchase_dates[:, None] - control_dates[None, :]).astype('timedelta64[D]').astype(int))

    valid = (drawdown_cost <= max_drawdown_gap) & (calendar_gap <= max_calendar_gap)

    if not valid.any():
        continue

    cost = drawdown_cost + calendar_gap / 1000000
    cost[~valid] = 1000000

    row_indices, column_indices = linear_sum_assignment(cost)
    keep = cost[row_indices, column_indices] < 1000000

    selected = pd.DataFrame({
        'purchase_id': purchases.iloc[row_indices[keep]]['purchase_id'].to_numpy(),
        'control_id': controls.iloc[column_indices[keep]]['control_id'].to_numpy(),
        'drawdown_gap': drawdown_cost[row_indices[keep], column_indices[keep]],
        'calendar_gap_days': calendar_gap[row_indices[keep], column_indices[keep]]
    })

    matches.append(selected)

matched_pairs = pd.concat(matches, ignore_index=True)
```

The central idea is easier than the code first makes it look.

`drawdown_cost` measures how far apart the two drawdowns are. A purchase at `-0.32` and a control at `-0.34` have a difference of `0.02`, or two percentage points.

The calendar distance is added as a very small tie-breaker. Drawdown similarity remains the main priority, but when two controls are almost equally close, the nearer date is preferred.

`linear_sum_assignment()` prevents the same control from being handed to several purchase episodes. It looks for a set of one-to-one matches that minimizes the combined cost across the group.

### Build The Final Matched Dataset

The matching result currently contains only the purchase IDs, control IDs, and distance measures.

The final step is to merge the original purchase and control details back into those pairs so we can calculate returns for both sides.

```py
selected_controls = control_candidates[['control_id', 'ticker', 'date', 'adjusted_close', 'drawdown', 'drawdown_pct']].rename(columns={'ticker': 'control_ticker',
                                                                                                                                       'date': 'control_date',
                                                                                                                                       'adjusted_close': 'control_signal_price',
                                                                                                                                       'drawdown': 'control_drawdown',
                                                                                                                                       'drawdown_pct': 'control_drawdown_pct'})

matched_sample = matched_pairs.merge(purchase_pool,on='purchase_id',how='left').merge(selected_controls,on='control_id',how='left')
matched_sample
```

Each row now contains one CEO-purchase episode and its matched no-purchase drawdown date:

![final control group](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/ea1737c8-4c08-40ab-bb6f-7e5cc8635557.png)

We now have the two groups we actually wanted from the beginning: CEO purchases after large drawdowns and similar drawdowns in the same stocks without nearby CEO buying.

---

## Compare CEO Purchases Against Similar No-Purchase Drawdowns

This is where the workflow finally earns its keep.

Each row in `matched_sample` contains two dates from the same stock:

- the first filing date of a CEO-buying episode
- a similar drawdown date with no nearby CEO purchase

From this point onward, both sides must be treated exactly the same. The CEO side enters on the first trading day after the filing date. The control side enters on the first trading day after the matched drawdown date. Both use the same adjusted prices and the same return horizons.

We'll first prepare the two signal-date columns and rebuild the ticker-level price map used earlier.

```py
matched_sample['first_filing_date'] = pd.to_datetime(matched_sample['first_filing_date'])
matched_sample['control_date'] = pd.to_datetime(matched_sample['control_date'])
historical_df['date'] = pd.to_datetime(historical_df['date'])

prices = historical_df[['ticker', 'date', 'adjusted_close']].dropna().sort_values(['ticker', 'date'])
price_map = {ticker: group.reset_index(drop=True) for ticker, group in prices.groupby('ticker')}
```

The price map gives every ticker its own ordered history. That lets us use one return function for both the purchase and control dates instead of writing separate logic for each group.

### Calculate Forward Returns From Any Signal Date

The next function takes only two inputs: a ticker and a signal date.

It finds the first trading session after that date, uses the adjusted close as the entry price, and calculates returns after 21, 63, 126, and 252 trading days.

```py :collapsed-lines
def get_forward_returns(ticker, signal_date):
    result = {
        'entry_date': pd.NaT,
        'entry_price': np.nan,
        'return_1m': np.nan,
        'return_3m': np.nan,
        'return_6m': np.nan,
        'return_12m': np.nan
    }

    ticker_prices = price_map.get(ticker)

    if ticker_prices is None or pd.isna(signal_date):
        return pd.Series(result)

    dates = ticker_prices['date'].to_numpy(dtype='datetime64[ns]')
    entry_index = np.searchsorted(dates, np.datetime64(signal_date), side='right')

    if entry_index >= len(ticker_prices):
        return pd.Series(result)

    entry_price = ticker_prices.loc[entry_index, 'adjusted_close']
    result['entry_date'] = ticker_prices.loc[entry_index, 'date']
    result['entry_price'] = entry_price

    for label, days in {'1m': 21, '3m': 63, '6m': 126, '12m': 252}.items():
        target_index = entry_index + days

        if target_index < len(ticker_prices):
            target_price = ticker_prices.loc[target_index, 'adjusted_close']
            result[f'return_{label}'] = target_price / entry_price - 1

    return pd.Series(result)
```

The important detail is `side='right'`.

It prevents either group from entering on its signal date. The CEO-purchase return starts after the filing, and the control return starts after the matched drawdown date.

The function begins with missing values for every output. If a ticker is unavailable or there's not enough future price history for a horizon, that return simply stays as `NaN`.

### Apply The Same Return Logic To Both Groups

Now we run the function twice for every matched pair.

The first pass uses the CEO-purchase ticker and filing date. The second uses the control ticker and control date. The returned columns are prefixed so the two sets remain easy to distinguish.

```py
purchase_returns = matched_sample.apply(lambda row: get_forward_returns(row['ticker'], row['first_filing_date']), axis=1).add_prefix('purchase_')
control_returns = matched_sample.apply(lambda row: get_forward_returns(row['control_ticker'], row['control_date']), axis=1).add_prefix('control_')
matched_returns = pd.concat([
    matched_sample.reset_index(drop=True),
    purchase_returns.reset_index(drop=True),
    control_returns.reset_index(drop=True)], axis=1)
```

The resulting dataframe now places both outcomes side by side:

- CEO-purchase entry date and price
- control entry date and price
- CEO-purchase returns
- control returns

Not every pair survives at every horizon. A pair is usable only when both sides have enough future price history. That's why the number of observations falls as we move toward twelve months.

### Build The Final Comparison

The last step is to compare the two return series at each horizon.

We 'll calculate:

- mean return for each group
- median return for each group
- mean return difference within the matched pairs
- median return difference within the matched pairs
- positive-return rate
- percentage of pairs where the CEO-purchase side beat the control

```py
comparison = []

for horizon in ['1m', '3m', '6m', '12m']:
    purchase_col = f'purchase_return_{horizon}'
    control_col = f'control_return_{horizon}'
    valid = matched_returns[[purchase_col, control_col]].dropna()
    differences = valid[purchase_col] - valid[control_col]

    comparison.append({
        'horizon': horizon,
        'matched_pairs': len(valid),
        'purchase_mean': valid[purchase_col].mean(),
        'control_mean': valid[control_col].mean(),
        'mean_difference': differences.mean(),
        'purchase_median': valid[purchase_col].median(),
        'control_median': valid[control_col].median(),
        'median_difference': differences.median(),
        'purchase_positive_rate': (valid[purchase_col] > 0).mean(),
        'control_positive_rate': (valid[control_col] > 0).mean(),
        'purchase_win_rate': (valid[purchase_col] > valid[control_col]).mean()
    })

comparison_df = pd.DataFrame(comparison)
comparison_df
```

The paired statistics matter here.

`median_difference` is the median of:

***CEO-purchase return - matched control return***

for every pair. It's not simply the CEO median minus the control median.

The win rate asks an even more direct question: in what percentage of matched pairs did the CEO-purchase episode actually perform better?

![final comparison](https://cdn.hashnode.com/uploads/covers/5f362fe21017f7317167b14c/37fec1de-fe7f-477b-86a8-5036eaf30a33.png)

The one-month result was weak. CEO-purchase episodes trailed the controls on the mean, median pair gap, positive-return rate, and win rate.

Three months was the one window where the result stayed consistent across the table. The CEO-purchase group returned 6.2 percentage points more on average, had a positive median paired advantage of 3.9 points, and won 59.6% of the matches.

The six- and twelve-month averages looked stronger than the typical pair. At twelve months, the CEO group returned nearly 10 percentage points more on average, yet it beat the control in only 37.9% of the comparisons.

That combination usually means a smaller number of large winners are pulling the average upward.

So the final answer is not that CEO buying always worked, or that it never mattered. The apparent edge depended heavily on the horizon, and three months was the only period where the different measures pointed in the same direction.

---

## What The Case Study Found

The raw numbers made CEO buying look broadly bullish. After twelve months, the average return was 35.4%, and nearly two-thirds of the available observations were positive.

But once we added matched no-purchase drawdowns, the story became much narrower.

- **One month showed no edge.** CEO-purchase episodes underperformed their controls on the mean, median pair gap, positive-return rate, and win rate.
- **Three months was the strongest window.** The CEO group returned 6.2 percentage points more on average and beat its matched control in 59.6% of the pairs. This was the only horizon where the major measures pointed in the same direction.
- **Six and twelve months were harder to trust.** The averages were higher for the CEO-purchase group, but the median pair gaps were negative and most individual episodes lost to their controls.
- **The drawdown itself explained a lot.** Beaten-down stocks often rebounded even without CEO buying, so the raw post-purchase returns overstated the signal.

The most defensible conclusion is not that CEO buying predicts a long-term recovery. In this sample, it looked more like a possible three-month reversal signal, and even that result should be treated as exploratory rather than a trading rule.

---

## What This Test Can And Can't Say

This was a 500-stock, screener-based sample, not the full market. The universe may carry survivorship bias, some code-`P` purchases may not have been fully discretionary, and matching similar drawdowns doesn't prove that CEO buying caused the returns. This is an exploratory case study, not a trading strategy.

The most useful part of the workflow was separating the insider signal from what beaten-down stocks already do on their own. Before adding controls, CEO purchases looked broadly bullish across several horizons. After adding them, the result became much narrower: a possible three-month edge, but no clean long-term guarantee.

That may feel less exciting than proving that CEO buying predicts a recovery. But it's a better answer. The workflow forced us to test the story we wanted to believe against a baseline, and the baseline changed the conclusion.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Analyze Insider Transactions with Python: A CEO Buying Case Study",
  "desc": "When a CEO buys shares after their company’s stock has fallen hard, it's tempting to read the purchase as a vote of confidence. The person running the business knows more than the average investor, so",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-analyze-insider-transactions-with-python-a-ceo-buying-case-study.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
