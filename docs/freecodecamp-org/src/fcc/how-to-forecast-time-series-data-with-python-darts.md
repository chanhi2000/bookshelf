---
lang: en-US
title: "How to Forecast Time Series Data with Python Darts"
description: "Article(s) > How to Forecast Time Series Data with Python Darts"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - Matplotlib
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Forecast Time Series Data with Python Darts"
    - property: og:description
      content: "How to Forecast Time Series Data with Python Darts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-forecast-time-series-data-with-python-darts.html
prev: /programming/py-pandas/articles/README.md
date: 2025-10-07
isOriginal: false
author:
  - name: Adejumo Ridwan Suleiman
    url : https://freecodecamp.org/news/author/adejumo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759775700643/6f7d18b3-2060-4708-b56e-3450acf58546.png
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
  name="How to Forecast Time Series Data with Python Darts"
  desc="When analyzing time series data, your main objective is to consider the period during which the data is collected and how your variable of interest changes over time. There are various libraries for time series forecasting in Python, and Darts is one..."
  url="https://freecodecamp.org/news/how-to-forecast-time-series-data-with-python-darts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759775700643/6f7d18b3-2060-4708-b56e-3450acf58546.png"/>

When analyzing time series data, your main objective is to consider the period during which the data is collected and how your variable of interest changes over time.

There are various libraries for time series forecasting in Python, and [<VPIcon icon="fas fa-globe"/>Darts](https://unit8co.github.io/darts/) is one of them. Unlike other forecasting libraries, Darts is a high-level forecasting library with algorithms to handle various time series data, regardless of the kind of trend they portray.

This tutorial will walk you through how you can forecast time series data using Python Darts. This will help you make meaningful insights whenever you come across time series data such as stock prices, weather measurements, and so on.

---

## What is Python Darts?

Python Darts is an open-source library for time series analysis and forecasting. It has various models ranging from statistical time series models like ARIMA, and SARIMA, to machine learning and deep learning models like Prophet, and LSTM.

It has various algorithms for handling missing imputations in time series data, and can handle time series problems ranging from univariate, multivariate to hierarchical time series.

::: note Prerequisites

Before we proceed, you will need to have the following:

- Python 3.9+ installed.
- Jupyter Notebook, Google Colab, or Positron to run your code.
- Download the [<VPIcon icon="iconfont icon-kaggle"/>Netflix stock data](https://kaggle.com/datasets/kalilurrahman/netflix-stock-data-live-and-latest).
- Have the following libraries installed:
  - `darts` for time series analysis
  - `pandas` for data wrangling
  - `matplotlib` for data visualization.

:::

---

## How to Set Up Dependencies

Load the following libraries.

```py
import matplotlib.pyplot as plt
import pandas as pd
import darts
from darts import TimeSeries
from darts.models import ARIMA
from darts.models import RegressionModel
from lightgbm import LGBMRegressor
from darts.models import RNNModel
from darts.metrics import mape
import itertools
```

---

## Understanding the Dataset

The Netflix stock data contains historical daily prices of Netflix stock from the year 2002 till date.

Load the data and have a preview of it.

```py
netflix = pd.read_csv("/kaggle/input/netflix-stock-data-live-and-latest/Netflix_stock_history.csv")
netflix['Date'] = pd.to_datetime(netflix['Date'], utc=True).dt.tz_convert(None)
netflix.head()
```

![Image showing the first 5 rows of the Netflix stock data](https://cdn.hashnode.com/res/hashnode/image/upload/v1757927775470/2d4b542c-3869-40c5-844c-a733b5cc4bea.png)

To forecast a time series data, we need a `Date` column, which we already have, and then the variable of interest. We have several variables, but for this tutorial, we will focus on the `Close` variable of Netflix stocks.

Let’s visualize the data to see how Netflix closing price performed over the years.

```py
netflix.plot(x='Date', y='Close', figsize=(10,5))
plt.show()
```

![Image showing a line chart of Netflix stock data from 2000 to date](https://cdn.hashnode.com/res/hashnode/image/upload/v1757928810807/75a1fa13-4f2e-4bdd-a539-5eaf2663843a.png)

From the chart above, you can see that Netflix stock showed exponential growth in recent years. This means that the data is non-stationary, implying that there are no consistent changes over time.

There are a lot of random fluctuations in the data, which might make it difficult to forecast. Such data usually requires advanced models to handle the various fluctuations or noise present in the data.

---

## How to Prepare the Data for Darts

Before preparing the data for Darts, you need to take note of few things.

First of all, if you look at our data preview earlier on, you would notice that it is recorded daily, we also need to fill in missing dates.

Copy and paste this code into your notebook.

```py
start = netflix['Date'].min()
end = netflix['Date'].max()

netflix = (
    netflix.set_index('Date')
           .reindex(pd.date_range(start=start, end=end, freq='D'))
           .ffill()
           .reset_index()
           .rename(columns={'index': 'Date'})
)
netflix.head()
```

The code above ensures the `netflix` dataset has a continuous daily time series by filling in missing dates.

First, it finds the earliest `start` and latest `end` dates in the data, then creates a full daily date range between them.

By setting the `Date` column as the index and using `.reindex()` method, it inserts rows for any missing dates, which initially contain `NaN`.

The `.ffill()` method (forward fill) replaces these gaps by carrying forward the last known value, which is common for stock data when markets are closed, such as weekends.

Finally, the index is reset, and the column is renamed back to `Date`, producing a clean, continuous dataset ready for time series analysis.

Next, we need to convert the data to a Darts `Timeseries` object to make it usable by the Darts library.

```py
 = TimeSeries.from_dataframe(
    netflix,
    time_col='Date',
    value_cols='Close',
)
```

The code above converts the `netflix` DataFrame into a Darts `TimeSeries` object, which is optimized for time series modeling and forecasting.

It takes the `Date` column (`time_col='Date'`) as the timeline and the `Close` column (`value_cols='Close'`) as the target values to forecast.

The resulting `series` object is now structured for use with Darts’ advanced forecasting models like ARIMA, Prophet, RNNs, and other time series algorithms.

Just like you would with any other machine learning model, you need to split your data into a training set and a validation set.

```py
train, val = series.split_before(0.8)
```

---

## How to Build a Forecasting Model

When building a forecasting model, you have the privilege of trying various models and picking the best-performing one.

The Darts library has various algorithms for time series analysis, from popular statistical algorithms like the Auto Regressive Integrated Moving Average (ARIMA) and Moving Average (MA) models, to machine learning and deep learning algorithms like Prophet and Long Short Term Memory (LSTM).

Note, I will only demonstrate how these algorithms work - it’s not necessary that we get accurate model metrics. But with further feature engineering, hyperparameter tuning, and cross-validation, you can get good results on your own.

### Classical Model

The classical mode is the use of statistical time series models such as ARIMA. ARIMA is made up of the following components:

- **AR (AutoRegressive):** Predict past values by looking at previous ones.
- **I (Integrated):** Remove trends by focusing on changes instead of raw values.
- **MA (Moving Average):** Learn from the errors of past predictions to improve accuracy.

Run the code below in your notebook to fit an ARIMA model.

```py
arima_model = ARIMA()
arima_model.fit(train)
arima_forecast = arima_model.predict(len(val))
```

To visualize the forecast by the model, call the `.plot()` method on the `forecast` object.

```py
series.plot(label='actual')
arima_forecast.plot(label='forecast')
plt.legend()
```

![Image showing the ARIMA model forecast of netflix stock ](https://cdn.hashnode.com/res/hashnode/image/upload/v1758028284156/a40f2341-cfc6-4a9f-8297-e0511c2bb254.png)

You can improve the model by adding some additional parameters to the `ARIMA()` class. You can read more about that in the [<VPIcon icon="fas fa-globe"/>Darts documentation](https://unit8co.github.io/darts/generated_api/darts.models.forecasting.arima.html).

### Machine Learning Models

Classical models like ARIMA can’t handle non-linear data. Machine learning models fill this gap. We’ll use the LightGBM model as an example.

The LightGBM is a machine learning model that builds models sequentially based on decision trees. It adds new decision trees that correct the errors of previous trees.

Although it was not designed to handle time series, with some feature engineering such as lags, rolling statistics, and seasonal indicators, you can make it learn patterns from time series data.

Run this code on your notebook to fit a LightGBM model on the Netflix data.

```py
lgbm = LGBMRegressor()
lgbm_model = RegressionModel(lags=12, model=lgbm)
lgbm_model.fit(train)
lgbm_forecast = lgbm_model.predict(len(val))
```

From the code above, the `lag` argument is set to `12`, which is the value of the Netflix stock price for 12 days before a selected day.

Let’s have a view of the forecast by running the following code.

```py
series.plot(label='actual')
lgbm_forecast.plot(label='forecast')
plt.legend()
```

![Image showing the LightGBM model forecast of netflix stock ](https://cdn.hashnode.com/res/hashnode/image/upload/v1758029933172/54f34a69-4f6b-4b44-85ab-d0b45931d701.png)

You can read more about tuning the LightGBM model from the [<VPIcon icon="fas fa-globe"/>Darts documentation](https://unit8co.github.io/darts/generated_api/darts.models.forecasting.lgbm.html) to improve the above model.

### How to Forecast with Deep Learning models

You can go for deep learning models designed for time series, such as LSTM, a kind of Recurrent Neural Network (RNN) designed to capture long-term dependencies in sequential data.

Run the following code to build the LSTM model.

```py
lstm_model = RNNModel(model='LSTM', input_chunk_length=12, output_chunk_length=6, n_epochs=100)
lstm_model.fit(train)
lstm_forecast = rnn_model.predict(len(val))
```

Now let’s visualize the forecast and see what we have.

```py
series.plot(label='actual')
lstm_forecast.plot(label='forecast')
plt.legend()
```

![Image showing the LSTM model forecast of Netflix stock ](https://cdn.hashnode.com/res/hashnode/image/upload/v1758116174578/2ff80218-2254-452d-8d4c-2f85c61612de.png)

You can look up the [<VPIcon icon="fas fa-globe"/>Darts documentation](https://unit8co.github.io/darts/generated_api/darts.models.forecasting.rnn_model.html) to improve the model and check out other deep learning models also.

---

## Model Evaluation

Now that you have three models, you need to select the best one among them using the Mean Absolute Percentage Error (MAPE).

It expresses the average absolute error as a percentage of the actual values, and the closer your value is to 0, the better your model.

Run the following to print the MAPE of each respective model.

```py
arima_error = mape(val, arima_forecast)
print("MAPE:", arima_error)
lgbm_error = mape(val, lgbm_forecast)
print("MAPE:", lgbm_error)
lstm_error = mape(val, lstm_forecast)
print("MAPE:", lstm_error)
```

```plaintext title="result"
> MAPE: 38.33262525601514
> MAPE: 39.00241495209449
> MAPE: 38.82910057097827
```

The model with the lowest MAPE is the ARIMA model with approximately 38.33, which means it’s our best-performing model.

---

## BackTesting

Darts has a feature called backtesting that allows you to evaluate your models based on historical data, using a rolling forecast.

Backtesting is like a time machine for forecasting. It simulates how your model would have performed in the past by repeatedly training it on historical data up to a certain point, making a prediction for the next step, then moving forward, and repeating the process.

This rolling evaluation simulates how the model would behave in real-world conditions, where future data is unknown, helping you measure its consistency and reliability over time, instead of just testing it once on a single validation set.

Since the ARIMA model is currently our best-performing model, run the code below to implement backtesting.

```py
# Perform backtesting on the training + validation series
backtest_series = train.concatenate(val)

# Backtest
backtest_forecast = arima_model.historical_forecasts(
    series=backtest_series,
    start=0.8,          # fraction of the series to start forecasting from
    forecast_horizon=len(val),
    stride=1,           # step size of rolling forecast
    retrain=True,       # retrain the model at each step
    verbose=True
)

# Compute metrics
error = mape(backtest_series[-len(val):], backtest_forecast)
print(f"MAPE: {error:.2f}%")
```

```plaintext title="output"
historical forecasts: 100%|██████████| 1/1 [00:02<00:00,  2.69s/it]MAPE: 47.27%
```

In the code above,

- The `start` argument defines where to start backtesting, which in this case is the last 20% series of the data.
- The `forecast_horizon` is how many steps ahead to forecast at each point.
- The `stride` is how frequently to retrain/forecast.
- The `retrain=True` refits the model at each step for realistic evaluation.

You can see that the MAPE, after backtesting, is higher because backtesting is more realistic, and it is more difficult to achieve a lower MAPE.

On your own, you can try to replicate backtesting for the other models.

---

## Hyper Parameter Tuning

The ARIMA model has three hyperparameter:

- `p` which is the AR order
- `d` which is the differencing order
- `q` which is the MA order

You can use either grid or random search to tune your ARIMA model in Darts.

```py
# Define possible values
p_values = range(0, 4)
d_values = range(0, 3)
q_values = range(0, 4)

best_mape = float('inf')
best_params = None

for p, d, q in itertools.product(p_values, d_values, q_values):
    try:
        arima_model = ARIMA(p=p, d=d, q=q)
        arima_model.fit(train)
        arima_forecast = arima_model.predict(len(val))
        arima_error = mape(val, arima_forecast)
        if arima_error < best_mape:
            best_mape = arima_error
            best_params = (p, d, q)
    except Exception as e:
        # Some combinations may fail
        continue

print(f"Best ARIMA params: p={best_params[0]}, d={best_params[1]}, q={best_params[2]} with MAPE={best_mape:.2f}%")
```

```plaintext title="output"
Best ARIMA params: p=2, d=0, q=3 with MAPE=35.95%
```

In the above code, you define a range of possible values for the `p`, `d` , and `q` components, iterating over each combination of those values and choosing the model with the best MAPE among them.

Note that each model has its specific parameter you would have to tune, and you will need to check [<VPIcon icon="fas fa-globe"/>the Darts documentation](https://unit8co.github.io/darts/userguide/hyperparameter_optimization.html) for the hyperparameters of other models.

---

## Real-World Use Cases

Forecasting time series data has a lot of real-world applications, some of which are:

- **Stock price prediction:** Like the dataset used in this tutorial, forecasting is used in finance for stock price prediction, allowing investors to manage risk.
- **Demand forecasting for inventory:** As a store owner, you can forecast product demands based on past sales of a product. This lets you know products that are in high demand.
- **Energy consumption prediction:** Governments, industries, and consumers can plan and manage energy production, distribution, and consumption efficiently, based on data from past usage. This helps to avoid blackouts and wastage, enabling them to prepare ahead.

---

## Best Practices

- **Always visualize residuals:** Residuals are the difference between forecasted values and actual values. You must visualize them to detect outliers and unusual events.
- **Perform proper backtesting:** Backtesting lets you see a more realistic model, subjected to various changes that can occur in real life. When you backtest all your models, you end up getting a model that performs well when forecasting.
- **Avoid data leakage:** Do not train your models on validation sets to avoid bias, and always use cross-validation where necessary.
- **Use domain knowledge for feature engineering:** Ensure you understand the data you are working with. This comes in handy in feature engineering, when you want to come up with new features to help your forecasting model, especially in multivariate time series forecasting.

---

## Conclusion

This tutorial is more like an overview, especially if you are new to time series, but you can build a lot just from what you have learned.

You already have an idea of what time series and forecasting are, and how you can use the Darts Python library to achieve that.

You also learned of various models for forecasting time series data, and how you can apply techniques such as backtesting and hyperparameter tuning to achieve better results.

Another interesting thing with Darts is its ability to handle [<VPIcon icon="fas fa-globe"/>hierarchical time series](https://unit8co.github.io/darts/userguide/timeseries.html#hierarchical-time-series). Here, data is structured at aggregated levels.

Darts is one of the most powerful time series libraries in Python and has a lot of models to handle various cases. You can proceed to explore models such as [<VPIcon icon="fas fa-globe"/>Transformers](https://unit8co.github.io/darts/generated_api/darts.models.forecasting.transformer_model.html) and also [<VPIcon icon="fas fa-globe"/>multi-series forecasting](https://unit8co.github.io/darts/examples/01-multi-time-series-and-covariates.html), which are used for special use cases.

If you are interested in more data science and statistics articles, don’t forget to check out [<VPIcon icon="fas fa-globe"/>my blog](https://learndata.xyz/blog).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Forecast Time Series Data with Python Darts",
  "desc": "When analyzing time series data, your main objective is to consider the period during which the data is collected and how your variable of interest changes over time. There are various libraries for time series forecasting in Python, and Darts is one...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-forecast-time-series-data-with-python-darts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
