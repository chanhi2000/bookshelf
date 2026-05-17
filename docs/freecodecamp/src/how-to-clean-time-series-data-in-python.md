---
lang: en-US
title: "How to Clean Time Series Data in Python"
description: "Article(s) > How to Clean Time Series Data in Python"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Clean Time Series Data in Python"
    - property: og:description
      content: "How to Clean Time Series Data in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-clean-time-series-data-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-18
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/bf717910-4e75-44c5-8ea1-fd55eb574100.png
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

[[toc]]

---

<SiteInfo
  name="How to Clean Time Series Data in Python"
  desc="Real-world time series data is rarely clean. Sensors drop out, systems clock-drift, pipelines duplicate records, and manual data entry introduces mistakes. By the time a dataset reaches your notebook,"
  url="https://freecodecamp.org/news/how-to-clean-time-series-data-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/bf717910-4e75-44c5-8ea1-fd55eb574100.png"/>

Real-world time series data is rarely clean. Sensors drop out, systems clock-drift, pipelines duplicate records, and manual data entry introduces mistakes. By the time a dataset reaches your notebook, it has passed through collection, transmission, and storage, each step a potential source of corruption.

Cleaning time series data is harder than cleaning tabular data because time is a structural constraint. You can't shuffle rows or impute a missing value with a column mean without pulling future data into a past observation. Every cleaning decision has to respect temporal ordering, or it breaks the integrity of everything built on top of it.

This guide walks through the full cleaning pipeline in Python: from raw data arrival to a dataset ready for feature engineering or modelling. We'll cover missing value detection and imputation, outlier identification and treatment, duplicate handling, frequency alignment, noise smoothing, and schema validation, applied to sample sensor data throughout.

::: info

[You can get the Colab notebook from GitHub and follow along (<VPIcon icon="iconfont icon-github"/>`balapriyac/data-science-tutorials`)](https://github.com/balapriyac/data-science-tutorials/blob/main/time-series-data-cleaning/time_series_data_cleaning.ipynb).

<SiteInfo
  name="data-science-tutorials/time-series-data-cleaning/time_series_data_cleaning.ipynb at main · balapriyac/data-science-tutorials"
  desc="If you&#39;re coming from one of my data science tutorials, you&#39;ll find the code and the links to the tutorials here. I hope you find them helpful. Happy learning and coding! - balapriyac/data-..."
  url="https://github.com/balapriyac/data-science-tutorials/blob/main/time-series-data-cleaning/time_series_data_cleaning.ipynb/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5683c7c1133c1cb345348ab9247fe750f60f57a98f1a4b4d6dc70877668c4a43/balapriyac/data-science-tutorials"/>


:::

::: note Prerequisites

To follow along to this guide, you'll need to be:

- Comfortable working with Python and pandas DataFrames
- Familiar with time-indexed data
- Aware of what feature engineering and machine learning modelling involve at a high level

We'll use `pandas` and `numpy` for data manipulation, `scipy` for signal smoothing and statistical tests, `scikit-learn` for anomaly detection, and `statsmodels` for seasonal decomposition. Install them before running any code in this guide:

```sh
pip install pandas numpy scipy scikit-learn statsmodels
```

:::

---

## How to Audit Your Time Series Before Cleaning It

The first rule of data cleaning is: look before you cut. Before imputing, smoothing, or dropping anything, you need a complete picture of what's wrong and where.

A good audit covers the following:

- The time index: Is it regular? Are there gaps?
- Missing value distribution: Are missing values random or clustered?
- Value range: Are there obvious gaps or sensor failures?
- Duplicate timestamps

Let's spin up a sample dataset (with some of the above problems):

```py :collapsed-lines
# Simulate one week of smart grid voltage readings (hourly)
# with realistic problems injected
periods = 168
index = pd.date_range("2024-06-01", periods=periods, freq="H")

voltage = (
    230.0
    + 3.5 * np.sin(2 * np.pi * np.arange(periods) / 24)
    + np.random.normal(0, 1.2, periods)
)

# Inject problems
voltage[14:17] = np.nan          # sensor dropout: 3 consecutive missing
voltage[42] = np.nan             # isolated missing
voltage[78] = 312.4              # spike outlier
voltage[101:104] = np.nan        # another dropout
voltage[130] = 187.2             # dip outlier

series = pd.Series(voltage, index=index, name="voltage_v")

# --- Audit ---
print("=== TIME SERIES AUDIT ===")
print(f"Period:        {series.index.min()} → {series.index.max()}")
print(f"Observations:  {len(series)}")
print(f"Expected freq: {pd.infer_freq(series.index)}")
print(f"\nMissing values: {series.isna().sum()} ({series.isna().mean()*100:.1f}%)")
print(f"Value range:    [{series.min():.2f}, {series.max():.2f}]")
print(f"Mean ± Std:     {series.mean():.2f} ± {series.std():.2f}")

# Identify consecutive missing runs
missing_mask = series.isna()
missing_runs = []
run_start = None
for i, (ts, is_missing) in enumerate(missing_mask.items()):
    if is_missing and run_start is None:
        run_start = ts
    elif not is_missing and run_start is not None:
        missing_runs.append((run_start, missing_mask.index[i - 1]))
        run_start = None

print(f"\nMissing runs ({len(missing_runs)} total):")
for start, end in missing_runs:
    print(f"  {start} → {end}")
#
# === TIME SERIES AUDIT ===
# Period:        2024-06-01 00:00:00 → 2024-06-07 23:00:00
# Observations:  168
# Expected freq: h
# 
# Missing values: 7 (4.2%)
# Value range:    [187.20, 312.40]
# Mean ± Std:     230.22 ± 7.81
# 
# Missing runs (3 total):
#   2024-06-01 14:00:00 → 2024-06-01 16:00:00
#   2024-06-02 18:00:00 → 2024-06-02 18:00:00
#   2024-06-05 05:00:00 → 2024-06-05 07:00:00
```

This audit gives you a map of the damage before you start cleaning. The key task is distinguishing between **isolated missing values**, which are imputable with local context, and **missing long runs**, which may need a different strategy or flagging for downstream consumers.

---

## How to Reindex to a Canonical Frequency

Before imputing missing values, you need to confirm your time index is actually *regular*. A common problem in ingested time series is that missing timestamps are simply absent rather than represented as `NaN` rows — which means a `.fillna()` call will never find them.

```py :collapsed-lines
# Simulate a sensor feed with missing timestamps (not just missing values)
irregular_index = index.delete([14, 15, 16, 42, 101, 102, 103])
irregular_series = series.dropna().reindex(irregular_index)

print(f"Original length:   {len(series)}")
print(f"Irregular length:  {len(irregular_series)}")
print(f"Inferred freq:     {pd.infer_freq(irregular_series.index)}")  # None = irregular

# Reindex to the full canonical hourly grid
canonical_index = pd.date_range(
    start=irregular_series.index.min(),
    end=irregular_series.index.max(),
    freq="H"
)

reindexed = irregular_series.reindex(canonical_index)

print(f"\nAfter reindex:")
print(f"Length:         {len(reindexed)}")
print(f"Missing values: {reindexed.isna().sum()}")
print(f"Inferred freq:  {pd.infer_freq(reindexed.index)}")
#
# Original length:   168
# Irregular length:  161
# Inferred freq:     None
# 
# After reindex:
# Length:         168
# Missing values: 7
# Inferred freq:  h
```

`pd.infer_freq` returning `None` is your signal that the index has gaps. After reindexing to the canonical grid, missing timestamps become explicit `NaN` rows, and now your imputation logic can find them.

---

## How to Handle Missing Values

Not all missing values should be handled the same way. A single isolated missing reading in a smooth signal is best filled with interpolation. A 3-hour sensor dropout in a volatile signal, however, might be better flagged than fabricated. Strategy should match both gap length and signal behavior.

### Forward Fill — For Step-Function Signals

Forward fill is appropriate when the variable holds its last known value until something changes it — a machine state, a setpoint, a categorical flag.

```py
# Equipment operating mode — a step signal
mode_data = pd.Series(
    ["running", "running", np.nan, np.nan, "idle", "idle", np.nan, "running"],
    index=pd.date_range("2024-06-01", periods=8, freq="H"),
    name="operating_mode"
)

filled_mode = mode_data.ffill()
print(pd.DataFrame({"original": mode_data, "ffill": filled_mode}))
#
#                     original    ffill
# 2024-06-01 00:00:00  running  running
# 2024-06-01 01:00:00  running  running
# 2024-06-01 02:00:00      NaN  running
# 2024-06-01 03:00:00      NaN  running
# 2024-06-01 04:00:00     idle     idle
# 2024-06-01 05:00:00     idle     idle
# 2024-06-01 06:00:00      NaN     idle
# 2024-06-01 07:00:00  running  running
```

### Time-Weighted Interpolation — For Continuous Signals

For continuous sensor readings, linear interpolation weighted by time handles irregular gaps correctly because it doesn't assume equal spacing.

```py :collapsed-lines
# Fill the voltage series using time-based interpolation
voltage_clean = reindexed.interpolate(method="time")

# Compare original vs filled around the first gap
gap_window = voltage_clean["2024-06-01 12:00":"2024-06-01 18:00"]
original_window = reindexed["2024-06-01 12:00":"2024-06-01 18:00"]

comparison = pd.DataFrame({
    "original":     original_window,
    "interpolated": gap_window.round(3),
    "was_missing":  original_window.isna(),
})
print(comparison)
#
#                        original  interpolated  was_missing
# 2024-06-01 12:00:00  230.290355       230.290        False
# 2024-06-01 13:00:00  226.798197       226.798        False
# 2024-06-01 14:00:00         NaN       226.848         True
# 2024-06-01 15:00:00         NaN       226.897         True
# 2024-06-01 16:00:00         NaN       226.947         True
# 2024-06-01 17:00:00  226.996356       226.996        False
# 2024-06-01 18:00:00  225.410371       225.410        False
```

### Seasonal Decomposition Imputation — For Long Gaps

For gaps longer than a few steps in a seasonal signal, interpolating across the gap ignores the seasonal pattern. A better approach is to decompose the series, impute each component separately, then reconstruct.

```py
from statsmodels.tsa.seasonal import seasonal_decompose

# Use a longer series for decomposition (needs enough periods)
long_voltage = pd.Series(
    230.0
    + 3.5 * np.sin(2 * np.pi * np.arange(336) / 24)
    + np.random.normal(0, 1.0, 336),
    index=pd.date_range("2024-06-01", periods=336, freq="H")
)

# Inject a 6-hour gap
long_voltage.iloc[100:106] = np.nan

# Interpolate first to give decompose a complete series to work with
temp_filled = long_voltage.interpolate(method="time")
decomp = seasonal_decompose(temp_filled, model="additive", period=24)

# Reconstruct: trend + seasonal + zero residual for missing positions
reconstructed = long_voltage.copy()
missing_idx = long_voltage[long_voltage.isna()].index
reconstructed[missing_idx] = (
    decomp.trend[missing_idx].fillna(method="ffill")
    + decomp.seasonal[missing_idx]
)

print(f"Missing before: {long_voltage.isna().sum()}")
print(f"Missing after:  {reconstructed.isna().sum()}")
print("\nFilled values at gap:")
print(reconstructed[missing_idx].round(3))
#
# 
#                        original  interpolated  was_missing
# 2024-06-01 12:00:00  230.290355       230.290        False
# 2024-06-01 13:00:00  226.798197       226.798        False
# 2024-06-01 14:00:00         NaN       226.848         True
# 2024-06-01 15:00:00         NaN       226.897         True
# 2024-06-01 16:00:00         NaN       226.947         True
# 2024-06-01 17:00:00  226.996356       226.996        False
# 2024-06-01 18:00:00  225.410371       225.410        False
```

The seasonal decomposition imputation respects the time-of-day pattern. As you can see, the filled values aren't a flat line across the gap but follow the expected daily curve.

---

## How to Detect and Handle Outliers

Outliers in time series are trickier than in tabular data because context matters. For example, an unusually high or low voltage might be a sensor spike or a genuine grid event. You need methods that use *temporal context*, not just global statistics.

### Z-Score with Rolling Window

A global Z-score misses local anomalies in non-stationary series. A rolling Z-score flags values that are unusual *relative to their local neighbourhood*.

::: note

A **non-stationary series** is a time series whose statistical properties—such as mean, variance, or trend—change over time instead of remaining constant.

:::

```py
window = 24  # 24-hour rolling window

roll_mean = voltage_clean.rolling(window, center=True, min_periods=1).mean()
roll_std  = voltage_clean.rolling(window, center=True, min_periods=1).std()

rolling_z = (voltage_clean - roll_mean) / roll_std

threshold = 3.0
outliers_z = rolling_z[rolling_z.abs() > threshold]

print(f"Rolling Z-score outliers detected: {len(outliers_z)}")
print(outliers_z.round(3))
#
# Rolling Z-score outliers detected: 2
# 2024-06-04 06:00:00    4.646
# 2024-06-06 10:00:00   -4.484
# Name: voltage_v, dtype: float64
```

Z-score outlier detection works best for approximately Gaussian (normal) distributions because it assumes the data is centered around a mean with symmetric spread measured by standard deviation.

### IQR-Based Outlier Detection

The interquartile range (IQR) method is more robust for detecting outliers in non-Gaussian distributions. The interquartile range (IQR) is the difference between the third quartile (Q3) and the first quartile (Q1), representing the spread of the middle 50% of the data.

```py
Q1 = voltage_clean.quantile(0.25)
Q3 = voltage_clean.quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers_iqr = voltage_clean[
    (voltage_clean < lower_bound) | (voltage_clean > upper_bound)
]

print(f"IQR bounds: [{lower_bound:.2f}, {upper_bound:.2f}]")
print(f"Outliers detected: {len(outliers_iqr)}")
print(outliers_iqr.round(2))
#
# IQR bounds: [220.16, 239.46]
# Outliers detected: 2
# 2024-06-04 06:00:00    312.4
# 2024-06-06 10:00:00    187.2
# Name: voltage_v, dtype: float64
```

### Isolation Forest — For Multivariate Outlier Detection

When you have multiple sensors, an isolated reading on one channel might look normal, but its combination with readings from other channels reveals the anomaly. Isolation Forest handles this naturally.

```py
# Build a multi-sensor DataFrame
np.random.seed(42)
n = 200

sensor_df = pd.DataFrame({
    "voltage_v":    230 + 3 * np.sin(2 * np.pi * np.arange(n) / 24) + np.random.normal(0, 1, n),
    "current_a":    15  + 0.8 * np.sin(2 * np.pi * np.arange(n) / 24) + np.random.normal(0, 0.3, n),
    "frequency_hz": 50  + np.random.normal(0, 0.05, n),
}, index=pd.date_range("2024-06-01", periods=n, freq="H"))

# Inject a multivariate anomaly — voltage drops, current spikes together
sensor_df.iloc[88, 0] = 194.2   # voltage dip
sensor_df.iloc[88, 1] = 28.7    # current surge (consistent with fault)

clf = IsolationForest(contamination=0.02, random_state=42)
sensor_df["anomaly_score"] = clf.fit_predict(sensor_df[["voltage_v", "current_a", "frequency_hz"]])

anomalies = sensor_df[sensor_df["anomaly_score"] == -1]
print(f"Anomalies detected: {len(anomalies)}")
print(anomalies[["voltage_v", "current_a", "frequency_hz"]].round(2))
#
# Anomalies detected: 4
#                      voltage_v  current_a  frequency_hz
# 2024-06-02 07:00:00     234.75      15.84         49.90
# 2024-06-04 06:00:00     233.09      15.82         50.15
# 2024-06-04 16:00:00     194.20      28.70         50.08
# 2024-06-06 05:00:00     235.09      15.41         49.91
```

In practice you'd follow up anomaly scores with domain-specific threshold rules.

### Outlier Treatment

Once outliers are identified, you can handle them in several ways:

- Cap them using Winsorization by limiting extreme values to a threshold.
- Replace them with interpolated or estimated values.
- Flag them so the model can handle them appropriately.

```py
# Winsorize: cap at the IQR bounds
voltage_winsorized = voltage_clean.clip(lower=lower_bound, upper=upper_bound)

# Replace outliers with time-interpolated values
voltage_outlier_fixed = voltage_clean.copy()
voltage_outlier_fixed[outliers_iqr.index] = np.nan
voltage_outlier_fixed = voltage_outlier_fixed.interpolate(method="time")

print("Outlier treatment comparison:")
for ts in outliers_iqr.index:
    print(f"\n  {ts}")
    print(f"    Original:     {voltage_clean[ts]:.2f}")
    print(f"    Winsorized:   {voltage_winsorized[ts]:.2f}")
    print(f"    Interpolated: {voltage_outlier_fixed[ts]:.2f}")
#
# Outlier treatment comparison:
# 
#   2024-06-04 06:00:00
#     Original:     312.40
#     Winsorized:   239.46
#     Interpolated: 232.01
# 
#   2024-06-06 10:00:00
#     Original:     187.20
#     Winsorized:   220.16
#     Interpolated: 231.43
```

Winsorization preserves the point but clips it to a plausible range — useful when you want to retain the information that something anomalous happened. Interpolation treats the outlier as if it were missing — better when you believe the reading is simply wrong.

---

## How to Remove Duplicates

Duplicate timestamps are common when data pipelines retry on failure. Unlike tabular duplicates, time series duplicates aren't always identical, a retry might deliver a slightly different reading for the same timestamp.

```py
# Inject duplicate timestamps with slightly different values (retry scenario)
dup_index = index.tolist()
dup_index.insert(20, index[20])  # exact duplicate timestamp
dup_index.insert(55, index[55])  # retry duplicate

dup_values = voltage_clean.tolist()
dup_values.insert(20, voltage_clean.iloc[20])
dup_values.insert(55, voltage_clean.iloc[55] + 0.7)  # slightly different value

dup_series = pd.Series(dup_values, index=pd.DatetimeIndex(dup_index), name="voltage_v")

print(f"Length with duplicates: {len(dup_series)}")
print(f"Duplicate timestamps:   {dup_series.index.duplicated().sum()}")

# Strategy 1: keep first (original reading)
dedup_first = dup_series[~dup_series.index.duplicated(keep="first")]

# Strategy 2: keep mean (average across retries)
dedup_mean = dup_series.groupby(level=0).mean()

print(f"\nAfter dedup (keep first): {len(dedup_first)}")
print(f"After dedup (mean):       {len(dedup_mean)}")

# Show the retry duplicate
ts_retry = index[55]
print(f"\nRetry duplicate at {ts_retry}:")
print(f"  Values:      {dup_series[ts_retry].values.round(3)}")
print(f"  Keep first:  {dedup_first[ts_retry]:.3f}")
print(f"  Mean:        {dedup_mean[ts_retry]:.3f}")
#
# Length with duplicates: 170
# Duplicate timestamps:   2
# 
# After dedup (keep first): 168
# After dedup (mean):       168
# 
# Retry duplicate at 2024-06-03 07:00:00:
#   Values:      [235.198 234.498]
#   Keep first:  235.198
#   Mean:        234.848
```

For most sensor pipelines, keep-first is the right default; the first delivery is the original reading. Mean makes sense when retries come from independent sensors measuring the same quantity.

---

## Frequency Alignment and Resampling

Real pipelines often mix data at different frequencies. For example, you may need a 1-minute meter reading merged with an hourly weather feed. Before joining them, you need to align frequencies explicitly.

```py
# 1-minute power draw readings
power_1min = pd.Series(
    42 + 18 * ((pd.date_range("2024-06-01", periods=1440, freq="T").hour.isin(range(8, 19)))).astype(int)
    + np.random.normal(0, 2, 1440),
    index=pd.date_range("2024-06-01", periods=1440, freq="T"),
    name="power_kw"
)

# Downsample to hourly: mean is appropriate for power (average over the hour)
power_hourly_mean = power_1min.resample("H").mean().round(2)

# Downsample to hourly: max (peak demand within the hour)
power_hourly_max = power_1min.resample("H").max().round(2)

# Downsample to hourly: sum (total energy = kWh)
energy_hourly_kwh = (power_1min.resample("H").sum() / 60).round(3)

comparison = pd.DataFrame({
    "mean_kw":    power_hourly_mean,
    "peak_kw":    power_hourly_max,
    "energy_kwh": energy_hourly_kwh,
}).iloc[7:13]

print(comparison)
#
#                      mean_kw  peak_kw  energy_kwh
# 2024-06-01 07:00:00    42.13    46.28      42.133
# 2024-06-01 08:00:00    60.56    64.81      60.557
# 2024-06-01 09:00:00    59.91    64.88      59.912
# 2024-06-01 10:00:00    60.07    65.16      60.066
# 2024-06-01 11:00:00    60.08    64.99      60.083
# 2024-06-01 12:00:00    59.72    63.65      59.724
```

Which aggregation you choose matters enormously for downstream use. Mean power is right for load profiling. Peak power is right for capacity planning. Sum (converted to kWh) is right for billing. You can probably see why the *right* answer is domain-specific and not technical.

---

## Smoothing Noise

Raw sensor data often contains high-frequency noise that obscures the underlying signal. Smoothing before feature engineering prevents the model from fitting to noise, but over-smoothing destroys real variation.

### Exponential Weighted Moving Average

Exponential Weighted Moving Average or EWMA gives *more weight to recent observations* and adapts quickly to level changes. This is better than a simple moving average for non-stationary signals.

```py
# Noisy temperature sensor (°C)
temp_noisy = pd.Series(
    3.5
    + 1.2 * np.sin(2 * np.pi * np.arange(168) / 24)
    + np.random.normal(0, 0.8, 168),  # high noise
    index=pd.date_range("2024-06-01", periods=168, freq="H"),
    name="temperature_c"
)

temp_ewma = temp_noisy.ewm(span=6, adjust=False).mean()
temp_sma  = temp_noisy.rolling(window=6, center=True).mean()

comparison = pd.DataFrame({
    "raw":  temp_noisy,
    "ewma": temp_ewma.round(3),
    "sma":  temp_sma.round(3),
}).iloc[22:30]

print(comparison)
#
#                           raw   ewma    sma
# 2024-06-01 22:00:00  3.212372  2.843  3.035
# 2024-06-01 23:00:00  3.106840  2.918  3.176
# 2024-06-02 00:00:00  3.712290  3.145  3.011
# 2024-06-02 01:00:00  3.344376  3.202  3.294
# 2024-06-02 02:00:00  2.148946  2.901  3.705
# 2024-06-02 03:00:00  4.241105  3.284  4.087
# 2024-06-02 04:00:00  5.677429  3.968  4.381
# 2024-06-02 05:00:00  5.400083  4.377  4.765
```

### Savitzky-Golay Filter

For signals where you need to preserve peak shapes — not just smooth them away — the [<VPIcon icon="fas fa-globe"/>Savitzky-Golay filter](https://eigenvector.com/wp-content/uploads/2020/01/SavitzkyGolay.pdf) fits a polynomial over a sliding window and is better at maintaining the height of genuine spikes.

```py
from scipy.signal import savgol_filter

temp_savgol = pd.Series(
    savgol_filter(temp_noisy.values, window_length=11, polyorder=2),
    index=temp_noisy.index,
    name="temp_savgol"
).round(3)

print(pd.DataFrame({
    "raw":    temp_noisy,
    "savgol": temp_savgol,
}).iloc[22:30])
#
#                           raw  savgol
# 2024-06-01 22:00:00  3.212372   2.960
# 2024-06-01 23:00:00  3.106840   2.944
# 2024-06-02 00:00:00  3.712290   3.114
# 2024-06-02 01:00:00  3.344376   3.379
# 2024-06-02 02:00:00  2.148946   3.809
# 2024-06-02 03:00:00  4.241105   4.288
# 2024-06-02 04:00:00  5.677429   4.749
# 2024-06-02 05:00:00  5.400083   5.138
```

---

## Schema and Sanity Validation

Cleaning without validation is incomplete. You need automated checks that run every time new data arrives — catching problems before they silently corrupt downstream models.

```py
def validate_time_series(series: pd.Series, config: dict) -> dict:
    """
    Run schema and sanity checks on a time series.
    Returns a report dict with pass/fail per check.
    """
    report = {}

    # Frequency check
    inferred = pd.infer_freq(series.index)
    report["freq_regular"] = inferred == config["expected_freq"]

    # Missing value threshold
    missing_rate = series.isna().mean()
    report["missing_below_threshold"] = missing_rate <= config["max_missing_rate"]
    report["missing_rate"] = round(missing_rate, 4)

    # Value range check
    in_range = series.dropna().between(config["min_value"], config["max_value"])
    report["values_in_range"] = in_range.all()
    report["out_of_range_count"] = (~in_range).sum()

    # Duplicate timestamps
    report["no_duplicates"] = not series.index.duplicated().any()

    # Monotonic index
    report["index_monotonic"] = series.index.is_monotonic_increasing

    return report


config = {
    "expected_freq":    "H",
    "max_missing_rate": 0.05,
    "min_value":        210.0,
    "max_value":        250.0,
}

report = validate_time_series(voltage_outlier_fixed, config)

print("=== VALIDATION REPORT ===")
for check, result in report.items():
    if check in ("missing_rate", "out_of_range_count"):
        print(f"  {check}: {result}")
    else:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"  {status}  {check}")
#
# === VALIDATION REPORT ===
#   ✗ FAIL  freq_regular
#   ✓ PASS  missing_below_threshold
#   missing_rate: 0.0
#   ✓ PASS  values_in_range
#   out_of_range_count: 0
#   ✓ PASS  no_duplicates
#   ✓ PASS  index_monotonic
```

This validator is the kind of function you wrap around every data ingestion step in a production pipeline. Run it before cleaning to know what's broken, and after cleaning to confirm everything passed.

---

## The Complete Cleaning Checklist

Here's the full sequence to run on any incoming time series dataset:

| Step | Technique | When to Use |
| --- | --- | --- |
| **Audit** | Index check, missing map, value range | Always — before anything else |
| **Reindex** | `reindex` to canonical frequency | When timestamps are absent rather than NaN |
| **Missing: short gaps** | Time interpolation | Continuous signals, gaps ≤ 3 steps |
| **Missing: step signals** | Forward fill | Categorical or setpoint data |
| **Missing: long gaps** | Seasonal decomposition impute | Seasonal signals, gaps > 6 steps |
| **Outliers: univariate** | Rolling Z-score or IQR | Single sensor, local anomalies |
| **Outliers: multivariate** | Isolation Forest | Multiple correlated sensors |
| **Outlier treatment** | Winsorize or interpolate | Depending on whether event is real |
| **Duplicates** | Keep first or group mean | Pipeline retry duplicates |
| **Resampling** | `.resample()` with correct aggregation | Frequency alignment before joins |
| **Smoothing** | EWMA or Savitzky-Golay | Noisy sensors before feature engineering |
| **Validation** | Schema + sanity checks | After cleaning, and on every new batch |

---

## Wrapping Up

The order matters. Reindex before imputing. Impute before smoothing. Validate after everything. Skipping steps or doing them out of order compounds errors in ways that are very difficult to trace back once you're looking at model predictions.

Time series cleaning isn't glamorous work, but a model trained on clean data and thoughtfully engineered features will almost always outperform a more sophisticated model trained on data that wasn't cleaned properly. Getting this pipeline right is the highest-leverage thing you can do before you try running even the simplest algorithm on your time series data.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Clean Time Series Data in Python",
  "desc": "Real-world time series data is rarely clean. Sensors drop out, systems clock-drift, pipelines duplicate records, and manual data entry introduces mistakes. By the time a dataset reaches your notebook,",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-clean-time-series-data-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
