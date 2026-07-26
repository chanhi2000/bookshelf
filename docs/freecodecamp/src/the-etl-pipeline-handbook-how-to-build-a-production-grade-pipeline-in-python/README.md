---
lang: en-US
title: "The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python"
description: "Article(s) > The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - Numpy
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
      content: "Article(s) > The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python"
    - property: og:description
      content: "The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-etl-pipeline-handbook-how-to-build-a-production-grade-pipeline-in-python/
prev: /programming/py-pandas/articles/README.md
date: 2026-07-28
isOriginal: false
author:
  - name: brooklyn
    url: https://freecodecamp.org/news/author/brkln/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/36906090-d056-4207-8632-fcdf35843018.png
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
  name="The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python"
  desc="Tracking flood risk takes one unglamorous but essential thing: clean and structured data. In this tutorial, you'll build a data pipeline yourself. You'll create a Python ETL (Extract, Transform, Load)"
  url="https://freecodecamp.org/news/the-etl-pipeline-handbook-how-to-build-a-production-grade-pipeline-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/36906090-d056-4207-8632-fcdf35843018.png"/>

Tracking flood risk takes one unglamorous but essential thing: clean and structured data.

In this tutorial, you'll build a data pipeline yourself. You'll create a Python ETL (Extract, Transform, Load) pipeline that pulls daily water-level readings from [<VPIcon icon="iconfont icon-kaggle"/>Hub'Eau](https://hubeau.eaufrance.fr/), France's official open water-data API. Then, you'll clean that data and publish it as a public dataset, just like the [<VPIcon icon="iconfont icon-kaggle"/>live version](https://kaggle.com/code/grimespoint/paris-flood-dataset-weekly-updater) does.

This tutorial is based on a real pipeline that runs once a week, on a schedule, and it keeps the [<VPIcon icon="iconfont icon-kaggle"/>Paris Flood Dataset](https://kaggle.com/datasets/grimespoint/paris-flood-dataset) updated automatically.

You won't just copy and paste code, though. The real goal is to understand *why* the pipeline works the way it does. You'll walk through the design decisions that separate a script meant to run once from a script that keeps working, unattended, for years.

You can code along with this [<VPIcon icon="iconfont icon-kaggle"/>notebook](https://kaggle.com/code/grimespoint/data-engineering-with-python-etl-pipeline). For most of the tutorial, the pipeline runs on **simulated (mock) API data**. This lets you run every cell safely, without hammering a real server. A later section shows how to switch to the live API.

By the end, you'll be able to:

- Explain and implement the Extract, Transform, Load pattern
- Manage configuration with Python `@dataclass` instead of scattering constants everywhere
- Write API-fetching code that survives network failures and paginated responses
- Apply robust type-coercion so one bad row can't crash a whole pipeline run
- Deduplicate and merge incremental data safely
- Wire everything into a single, idempotent, schedulable `main()` entry point

### Table of Contents:

- [Part 1: The Design Logic](#heading-part-1-the-design-logic)
- [Part 2: Setup and Dependencies](#heading-part-2-setup-and-dependencies)
- [Part 3: Manage Configuration with Dataclasses](#heading-part-3-manage-configuration-with-dataclasses)
- [Part 4: The Extraction Step](#heading-part-4-the-extraction-step)
- [Part 5: The Transform Step](#heading-part-5-the-transform-step)
- [Part 6: The Load Step](#heading-part-6-the-load-step)
- [Part 7: Assemble the Full Pipeline](#heading-part-7-assemble-the-full-pipeline)
- [Part 8: Go Live and Switch to the Real API](#heading-part-8-go-live-and-switch-to-the-real-api)

::: note Prerequisites

- **Python 3.10+**. The code uses type hints and dataclasses. These work from Python 3.7 onward, but 3.10+ is best.
- [<VPIcon icon="fas fa-globe"/>Knowledge of pandas DataFrames](https://leetcode.com/studyplan/introduction-to-pandas/): read data, filter rows, and basic column operations.
- Comfort with **functions and basic OOP** ([**Object-Oriented programming**](/realpython.com/python3-object-oriented-programming.md)) in Python. Don't worry, this guide explains every non-obvious piece as you go.
- Optional: a free [<VPIcon icon="iconfont icon-kaggle"/>Kaggle](https://kaggle.com/) account and the [Kaggle CLI (<VPIcon icon="iconfont icon-github"/>`Kaggle/kaggle-api`)](https://github.com/Kaggle/kaggle-api), only if you want to run the final publishing step for real.

Install the dependencies:

```sh
pip install requests pandas numpy ipykernel
```

You'll do the work inside a [<VPIcon icon="iconfont icon-kaggle"/>Jupyter notebook](https://kaggle.com/code/grimespoint/data-engineering-with-python-etl-pipeline). Download the `.ipynb` file from Kaggle, or click "Copy and Edit" to work directly on Kaggle. You'll need a Kaggle account for that.

![The menu button that provides options to download the data engineering follow along notebook on Kaggle.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/681c54fc-c12a-4c01-83ba-17368d4ccc49.png)

**Optional:** If you plan to run the notebook locally, install the `notebook` package too:

```sh
pip install notebook
```

:::

---

## Part 1: The Design Logic

Before you touch a single line of code, we'll spend three minutes on *why* the pipeline is shaped this way.

This is the **big-picture view**. Every code-level decision later traces back to one of these ideas. Read this section even if you skim everything else.

### What is an ETL Pipeline?

ETL stands for **Extract, Transform, Load**. It's the standard pattern for moving data from a source to a destination in a reliable, repeatable way.

- **Extract**: pull data from a source, like an API, a database, or files.
- **Transform**: clean, standardize, enrich, and validate the data.
- **Load**: write the result to a destination, like a warehouse, a CSV, or a public platform.

Here's how those three stages map onto this project:

| Stage | What happens here |
| --- | --- |
| **Extract** | Load existing data if it exists, then call the Hub'Eau API (via `requests`) for each gauging station |
| **Transform** | Translate French columns and entries to English, fix data types, remove duplicates |
| **Load** | Write a CSV and a metadata file, then publish to Kaggle via the CLI |

### The Architecture, at a Glance

![Schema of a simple ETL pipeline.](https://cdn.hashnode.com/uploads/covers/67c84561e3f229edf2351ba2/6bede708-bdb9-4cae-bfd8-1dc1aa0348f6.png)

Notice that "Extract" already touches two different sources: the *existing* dataset (what you already have) and the *new* data from the API. That distinction is the seed of the next idea.

### Two Patterns that Make it Production-Grade

There two patterns that make this pipeline safe to run unattended, scheduled, for years.

#### 1. Idempotency

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Idempotence](https://en.wikipedia.org/wiki/Idempotence) means when the same operation runs twice it gives the same result as if it runs once. Deduplication is what makes this pipeline idempotent. If the scheduler accidentally triggers twice, or a network retry fetches the same day again, the second run won't create duplicate rows. This matters a lot for anything that runs on a schedule with no one watching it.

#### 2. Incremental loading

A naïve pipeline would re-download the *entire* history on every run. That's slow, it wastes your API quota, and it's fragile: the more data you transfer, the more chances something fails.

An **incremental** pipeline avoids this. Instead, it:

- Checks the most recent date already in the dataset
- Requests only the data *from that date onward*
- Merges the new records into the existing dataset

You'll find this logic built explicitly in [`determine_update_range`](#incremental-update-logic).

Always ask yourself: **"Do I actually need to do this?"** That one habit separates a fragile script from a production pipeline. For example, every "expensive" or "external" step in this pipeline (network calls, disk writes, publishing) is guarded by a cheap, local check first.

---

## Part 2: Setup and Dependencies

Here's the import block. It looks unremarkable, but how it's organized is itself a best practice worth calling out.

```py
# Standard library imports
import json
import os
import random
import subprocess
from dataclasses import dataclass, field
from datetime import date, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# Third-party libraries
import numpy as np
import pandas as pd
import requests

# Display config for notebooks
pd.set_option('display.max_columns', None)   # All columns will show
pd.set_option('display.max_colwidth', None)  # Prevents cutting long column text with ...
```

::: note Code-level notes

- Imports fall into three blocks: **standard library, then third-party, then local**, with blank lines between them. This follows [<VPIcon icon="fa-brands fa-python"/>PEP 8's import-ordering convention](https://peps.python.org/pep-0008/#imports). Most [<VPIcon icon="fa-brands fa-wikipedia-w"/>auto-formatters](https://en.wikipedia.org/wiki/Pretty-printing) (`isort`, `ruff`) enforce this same grouping.
- Nothing is imported with `from module import *`. That syntax pollutes the current namespace. It makes it hard to trace where a name came from when someone debugs the code six months later. Python style guides echo this advice, including [<VPIcon icon="fa-brands fa-google"/>Google's Python Style Guide](https://google.github.io/styleguide/pyguide.html).
- The `pd.set_option(...)` calls exist purely for *notebook readability*, so wide DataFrames don't get truncated with `...`. They have zero effect on the pipeline's logic. You'd typically remove or scope them differently in a `.py` script.

---

## Part 3: Manage Configuration with Dataclasses

### Why Bother with a Config Layer at All?

Every pipeline has **knobs**: which stations to monitor, what the flood threshold is, and where to publish. The bad approach sprinkles these values as literals throughout the code as you write it. You end up with an `if level > 6000:` buried three functions deep. Then changing *any* setting means hunting through the whole file, and it's easy to update one spot and miss another.

The fix: **centralize all settings in one place.** Python's [<VPIcon icon="fa-brands fa-python"/>`@dataclass`](https://docs.python.org/3/library/dataclasses.html) decorator is a natural fit for that.

| Feature | Why it matters |
| --- | --- |
| Auto-generated `__init__`, `__repr__`, `__eq__` | You don't need to write them yourself |
| [Type hints](https://geeksforgeeks.org/python/type-hints-in-python/) | Gives you IDE autocomplete and self-documenting code |
| Optional `frozen=True` | Gives you [<VPIcon icon="fa-brands fa-stack-overflow"/>true immutability](https://stackoverflow.com/questions/66194804/what-does-frozen-mean-for-dataclasses) if you want config knobs that can't change after creation |
| `__post_init__` hook | Validates or computes derived fields once, right after construction |

Compare that to a configuration written as a plain `dict`:

```py
config = {
    "stations": ["STN001", "STN002"],
    "flood_threshold": 6000,
    "publish_url": "https://example.com/alerts",
    "retry_count": 2,
    "timeout_seconds": 5,
}
```

A plain dict gives you none of that: no immutability, no type checking, and no autocomplete.

### Code-Level Walkthrough

The pipeline defines three configuration classes. Each one has *a single responsibility*: API details, station rules, and publishing destination. Each class becomes one **module-level singleton instance**. Every other function in the pipeline reads from these singletons.

```py
@dataclass
class APIConfig:
    """API configuration for HubEau data fetching.

    Think of this as the "address book" for the API.
    """
    use_mock: bool = True
    base_url: str = "https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab"
    metric: str = "HIXnJ"  # Daily max water level (elaborated observations)
    # Pagination: fetch 20k records per request (API Limit)
    max_per_page: int = 20000
    timeout_seconds: int = 60  # Network timeout

    def __post_init__(self):
        """Validate configuration after initialization."""
        if self.max_per_page <= 0:
            raise ValueError("max_per_page must be positive")
        if self.timeout_seconds <= 0:
            raise ValueError("timeout_seconds must be positive")
```

Notice the validation inside `__post_init__`. It runs right after the auto-generated `__init__`. A misconfigured `APIConfig(max_per_page=-1)` fails loudly and immediately at startup, instead of surfacing as a bug later during an actual pipeline run.

```py
@dataclass
class StationConfig:
    """Station monitoring configuration.

    The 'what' of data collection: which stations, what's a flood?
    """
    station_codes: List[str] = field(default_factory=lambda: [
        "F700000109", "F700000110", "F700000111",
        "F700000102", "F700000103",
    ])
    flood_threshold_mm: int = 6000  # Flood alert threshold
    earliest_date: str = "1900-01-01"  # How far back to go
```

::: warning The mutable-default trap

Look closely at `station_codes`. It isn't written as `station_codes: List[str] = [...]`. That's deliberate, and it dodges one of the most common gotchas in Python. If you use a plain mutable object (a list, dict, or set) as a default argument or dataclass field, **every instance shares the same underlying object**. Mutate it on one instance, and you silently mutate it everywhere else too.

:::

Stack Overflow covers this at length in its [<VPIcon icon="fa-brands fa-stack-overflow"/>"least astonishment" mutable-default-argument discussion](https://stackoverflow.com/questions/1132941/least-astonishment-and-the-mutable-default-argument), as does [**Real Python's guide to optional arguments**](/realpython.com/python-optional-arguments.md). The fix is `field(default_factory=...)`. It calls a *fresh* factory function (here, a `lambda`) for every new instance, so each one gets its own independent list.

Explanation:

```py
# Bad: shared mutable default
@dataclass
class BadConfig:
    station_codes: list[str] = []

a = BadConfig()
b = BadConfig()

a.station_codes.append("ALERT")
print(a.station_codes)  # ['ALERT']
print(b.station_codes)  # ['ALERT']  <-- same list!!


# Good: fresh list per instance
@dataclass
class GoodConfig:
    station_codes: list[str] = field(default_factory=list)

x = GoodConfig()
y = GoodConfig()

x.station_codes.append("ALERT")
print(x.station_codes)  # ['ALERT']
print(y.station_codes)  # []  <-- independent list
```

And the last Config singleton, the Kaggle settings:

```py :collapsed-lines
@dataclass
class KaggleConfig:
    """Kaggle dataset publishing configuration."""
    dataset_slug: str = "grimespoint/paris-flood-dataset"
    input_csv: str = "kaggle/input/datasets/{slug}/paris_flood_dataset.csv"
    output_dir: Path = field(default_factory=lambda: Path("kaggle/working/kaggle_dataset"))
    mock_output_dir: Path = field(default_factory=lambda: Path("mock_output"))
    output_filename: str = "paris_flood_dataset.csv"
    mock_output_filename: str = "mock_flood_dataset.csv"
    metadata_filename: str = "dataset-metadata.json"

    # Metadata
    title: str = "Paris flood dataset"
    keywords: list = field(default_factory=lambda: [
        "tabular", "weather and climate", "environment", "europe", "time series analysis"
    ])
    geospatial_coverage: str = "Paris, France"
    update_frequency: str = "Weekly"
    license_name: str = "CC0-1.0"

    # Computed fields (set in __post_init__)
    output_csv_path: Path = field(init=False)
    metadata_path: Path = field(init=False)

    def __post_init__(self):
        """Compute derived paths after initialization."""
        self.input_csv = self.input_csv.format(slug=self.dataset_slug)
        self.output_csv_path = self.output_dir / self.output_filename
        self.metadata_path = self.output_dir / self.metadata_filename
        self.mock_output_filename = self.mock_output_dir / self.mock_output_filename

# Initialize configs - module-level singletons
API_CONFIG = APIConfig()
STATION_CONFIG = StationConfig()
KAGGLE_CONFIG = KaggleConfig()
```

This is the most common use of `__post_init__`. `output_csv_path` and `metadata_path` are marked `field(init=False)`, so you can't set them directly through the constructor. Instead, `__post_init__` computes them from other fields (`output_dir` and `output_filename`).

Use this pattern for **derived, computed values**: compute them once, in one place, instead of recomputing `output_dir / output_filename` every time you need the path elsewhere in the codebase.

See [**Real Python's data classes guide**](/realpython.com/python-data-classes.md#comparing-cards) or the data classes chapter of O'Reilly's *Fluent Python* for more on this pattern.

::: tip

The auto-generated `__repr__` gives you a readable printout for free. Call `print(API_CONFIG)`: it shows every field and value without a single line of formatting code. It's handy for quick sanity checks when you're debugging a pipeline run.

```py
print(APIConfig)
#
# prints APIConfig(use_mock=True, base_url='https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab', ...)
```

:::

---

## Part 4: The Extraction Step

The Extract phase pulls data from source systems and reads it into memory. Here, you genuinely have **two** sources to extract from: the *existing* dataset (what you already published last time) and the *new* (recent) data from the Hub'Eau API.

### Graceful File Loading

#### Design logic

What should happen the very first time this pipeline runs (and there's no existing dataset yet)? A naïve implementation would crash with a `FileNotFoundError`.

Here's the trick: `load_csv()` follows the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Null Object pattern](https://en.wikipedia.org/wiki/Null_object_pattern). Instead of raising an error, it returns an *empty* DataFrame. Every downstream function can then treat "no existing data" and "some existing data" the same way, with no special-casing needed.

#### Code-level walkthrough

This function loads a CSV file into a DataFrame. If the file doesn't exist, it returns an empty DataFrame instead of crashing.

`low_memory=False` tells pandas to read the file carefully, so it avoids mixed-type guesses. `parse_dates=True` tries to automatically convert date-like columns into dates. `delimiter=","` tells pandas the file is comma-separated.

```py
def load_csv(path: str) -> pd.DataFrame:
    """Load CSV file or return empty DataFrame if file does not exist.

    Args:
        path (str): Full path to the CSV file.

    Returns:
        pd.DataFrame: Loaded data, or empty DataFrame if file not found.

    Raises:
        pd.errors.ParserError: If the CSV is malformed.
    """
    if os.path.exists(path):
        return pd.read_csv(path, low_memory=False, parse_dates=True, delimiter=",")
    return pd.DataFrame()   # Null Object: consistent return type
```

To test, try it against a path that doesn't exist:

```py
df_missing = load_csv("/tmp/does_not_exist.csv")
print(df_missing.empty)  # True: no crash

# Callers can always do this, instead of an `is None` check:
if df_missing.empty:
    print("No existing data. Will run a full fetch from earliest date.")
```

::: tip Best practice

Return a **consistent type** from every code path in a function. A function that sometimes returns a `DataFrame` and sometimes `None` forces every caller to add a `None` check before using the result.

:::

Return a `DataFrame`, empty or not, which keeps things simpler. You never have to ask *"did I get a real result, or* `None`*?"* before using it.

### Incremental Update Logic

#### Design logic

This is the "incremental loading" pattern from Part 1 in action. Before you fetch anything, ask: *"What's the most recent record I already have, and do I actually need more?"*

::: note Strategy

check whether the existing data already covers *yesterday*.

- Yes: skip the update entirely. Nothing to do, the dataset is current.
- No: fetch starting from the day after the last known date.

```text
Existing data: Jan. 1 – Jan. 15
Yesterday: Jan. 19

Decision: fetch from Jan. 16 onwards (not from Jan. 1)
```

:::

Why *yesterday* and not *today*? Today's measurement might not be finalized on the source system yet. Hub'Eau's "elaborated observations" are a processed daily aggregate, so the safest check is against the last **fully completed** day.

#### Code-level walkthrough

`determine_update_range()` checks the newest saved date. It tells you either "you're already up to date" or "start downloading from this next date."

Step by step:

1. **The function starts with existing data**
    - `existing` is a pandas `DataFrame` that already has some rows of data.
2. **If there is no data at all**
    - `if existing.empty:`
    - If the DataFrame has zero rows, it says: *"Nothing is saved yet, so fetch everything."*
    - It returns:
      - `True` = update needed
      - `STATION_CONFIG.earliest_date` = start from the earliest allowed date
3. **Find the date column**
    - The code checks which column contains dates:
      - first tries `"date_obs_elab"`
      - then `"record_date"`
    - If neither exists, it raises an error because it doesn’t know which column to use.
4. **Convert the date column into real dates**
    - `pd.to_datetime(...)` turns the column into date objects pandas can work with.
    - `errors="coerce"` means bad date values become missing values instead of crashing.
5. **Find the latest date in the data**
    - `last_day = s.max().date()`
    - This gets the newest date already in the dataset.
6. **Compare it with yesterday**
    - `yesterday = date.today() - timedelta(days=1)`
    - The function checks whether data already includes yesterday.
7. **If data is already up to date**
    - If `last_day >= yesterday`, it returns:
      - `False` = no update needed
      - `None` = no start date needed
8. **If data is behind**
    - It sets `next_day` to the day after the last saved date.
    - Then it returns:
      - `True` = update needed
      - that next day as a string like `"2026-07-12"`

```py :collapsed-lines
def determine_update_range(existing: pd.DataFrame) -> Tuple[bool, Optional[str]]:
    """Determine whether an update is needed and from what date.

    Logic:
    1. Check if existing data covers yesterday's date
    2. If yes → no update needed
    3. If no → start fetching from day after last data

    Returns:
        Tuple[should_update, start_date]
    """
    # Case 1: nothing on disk yet
    if existing.empty:
        print("No existing data found. Will fetch all data from earliest date.")
        return True, STATION_CONFIG.earliest_date

    if "date_obs_elab" in existing.columns:
        record_colname = "date_obs_elab"
    elif "record_date" in existing.columns:
        record_colname = "record_date"
    else:
        raise KeyError("Missing date column: expected 'date_obs_elab' or 'record_date'")

    s = pd.to_datetime(existing[record_colname], errors="coerce")
    last_day = s.max().date()
    yesterday = date.today() - timedelta(days=1)

    # Case 2: already current
    if last_day >= yesterday:
        print("\nDataset already covers yesterday or later. No update needed.")
        return False, None

    # Case 3: fetch the gap
    next_day = (last_day + pd.Timedelta(days=1))
    print(f"\nWill retrieve data starting from: {next_day}")
    return True, next_day.isoformat()
```

A few things worth a note here.

First, the function checks for **two possible column names**: `date_obs_elab`, the raw API name, or the already-renamed English name `record_date`. It doesn't assume just one. This makes the function work whether you call it on freshly-fetched raw data or an already-processed CSV loaded from disk.

`errors="coerce"` shows up here, and it'll show up again (we'll dig into this in Part 5). Any date pandas can't parse becomes `NaT` (Not a Time) instead of raising an exception.

The return type is `Tuple[bool, Optional[str]]`. This [tuple](https://w3schools.com/python/python_tuples.asp) bundles two related results: *should I update, and from when?* That beats returning two separate values, or worse, one ambiguous value that means different things depending on context.

::: tip Best practice

Use `Tuple` return types (or, for more fields, a small dataclass or `NamedTuple`) to bundle related results together. Document clearly what each position means. If you return different *types* from different code paths without documentation, you'll hit a common source of confusion and bugs: *"why is this* `None` *sometimes and a string other times?"*.

Run a quick check against three scenarios:

```py
# Test 1: No existing data
should_update, start_date = determine_update_range(pd.DataFrame())
# → True, "1900-01-01"

# Test 2: Old existing data (covers only Jan 10-15)
# → True, "2026-01-16"  (the day after the last known date)

# Test 3: Recent data that already covers yesterday
# → False, None
```

:::

### Simulate the API

#### Design logic

In production, fetching means a real HTTP call:

```py
requests.get(
    "https://hubeau.eaufrance.fr/api/v2/hydrometrie/obs_elab",
    params={"code_entite": "F700000109", "size": 20000, ...}
)
```

Real API calls bring real challenges. Rather than fight those on your first read-through, this tutorial first builds and tests everything against a **mock** generator. It returns data shaped exactly like the real API. Only once the logic works does it swap in the real endpoint.

This technique is useful well beyond this project. Build and test your transform logic against fixtures or mocks first. That way, you're not into "is my parsing wrong?" and "is the network flaky right now?" at the same time.

#### Code-level walkthrough

`generate_mock_api_data()` generates fake sample data for a station, one record per day, starting from `start_date`.

How it works:

- It converts `start_date` into a real date.
- It loops for `num_days`.
- For each day, it creates a mock observation dictionary.
- It adds a small random variation to the water level so the data looks realistic.
- It randomly picks status, quality, and method labels.
- It returns a list of these dictionaries.

```py :collapsed-lines
def generate_mock_api_data(station_code: str, start_date: str, num_days: int = 10) -> List[Dict]:
    """Generate realistic mock API data for demonstration.

    Simulates what HubEau API would return: list of observation dicts.
    """
    start = pd.to_datetime(start_date).date()
    records = []

    validation_statuses = ["Donnée validée", "Donnée brute", "Donnée pré-validée"]
    qualities = ["Bonne", "Non qualifiée", "Douteuse"]
    methods = ["Mesurée", "Calculée", "Expertisée"]

    for i in range(num_days):
        obs_date = start + timedelta(days=i)
        base_level = 5500 + int(station_code[-2:])  # Varies by station
        noise = random.randint(-200, 200)
        water_level = base_level + noise

        record = {
            "code_site": "mock_" + station_code[1:],
            "code_station": "mock_" + station_code,
            "date_obs_elab": obs_date.isoformat(),
            "resultat_obs_elab": water_level,
            "date_prod": (obs_date + timedelta(days=1)).isoformat(),
            "code_statut": "1",
            "libelle_statut": random.choice(validation_statuses),
            "code_methode": "1",
            "libelle_methode": random.choice(methods),
            "code_qualification": "1",
            "libelle_qualification": random.choice(qualities),
            "longitude": 2.3522 + random.uniform(-0.01, 0.01),
            "latitude": 48.8566 + random.uniform(-0.01, 0.01),
            "grandeur_hydro_elab": "mock_HIXnJ",
        }
        records.append(record)

    return records
```

### Fetch Data for Real

#### Design logic

Two functions handle extraction. They're deliberately split according to the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) (SRP): each function should have one reason to change.

```text
fetch_all_data() (orchestrator)
    ├── fetch_single_station_data(station_1) ← handles all complexity
    ├── fetch_single_station_data(station_2) ← handles all complexity
    └── fetch_single_station_data(station_n) ← handles all complexity
```

- `fetch_single_station_data()` owns *all* the messy per-station complexity: pagination, cursor advancement, stop conditions, and network error handling.
- `fetch_all_data()` owns none of that. It just loops over stations and delegates.

This split has two payoffs. First, you can debug or swap out the pagination strategy for one station without touching the orchestration code at all. Second, if you ever want to parallelize fetching (with `concurrent.futures` or `asyncio`, for example), the orchestrator is the *only* place you'd need to touch.

#### Code-level walkthrough

`fetch_single_station_data()` fetches station data either from mock test data or from the real API, page by page, until it has everything it needs.

- **If** `use_mock=True`, it uses **fake data** instead of calling the real API.
    1. It calls `generate_mock_api_data()`
    2. Turns the result into a DataFrame
    3. Converts the date column into real pandas dates
    4. Returns that DataFrame
- **If** `use_mock=False`, it does the **real API request**:
    1. Creates a reusable HTTP session
    2. Starts from `start_date`
    3. Repeatedly asks the API for a page of data
    4. Stops when:
        - the API returns no data
        - the latest date reaches yesterday
        - the page is smaller than expected
        - a network error happens
    5. Combines all pages into one DataFrame
    6. Returns an empty DataFrame if nothing was fetched

```py :collapsed-lines
def fetch_single_station_data(station_code: str, start_date: str, use_mock: bool = True) -> pd.DataFrame:
    """Fetch all hydrometric data for a single station from mock API (default) or from the real endpoint.

    In production (cursor based pagination strategy):
    - Fetches max_per_page records per request
    - Continues until no new data or yesterday's date reached
    - Stop when: no data returned | last date >= yesterday | page was not full
    - Handles network errors gracefully
    """
    if use_mock:
        data = generate_mock_api_data(station_code, start_date, num_days=7)
        page_df = pd.DataFrame(data)
        page_df["date_obs_elab"] = pd.to_datetime(
            page_df["date_obs_elab"], errors="coerce").dt.normalize()
        return page_df

    # Real implementation
    else:
        session = requests.Session()  # Reuse TCP connection across pages
        frames = []
        cursor = start_date

        while True:
            params = {
                "code_entite": station_code,
                "grandeur_hydro_elab": API_CONFIG.metric,
                "date_debut_obs_elab": cursor,
                "size": API_CONFIG.max_per_page,
            }

            try:
                response = session.get(
                    API_CONFIG.base_url,
                    params=params,
                    timeout=API_CONFIG.timeout_seconds  # Best practice, always set
                )
                response.raise_for_status()
            except requests.RequestException as e:  # Don't let one station kill the whole pipeline
                print(f"Error fetching data for station {station_code}: {e}")
                break

            data = response.json().get("data", [])
            if not data:  # Empty response: we've exhausted this station
                break

            page_df = pd.DataFrame(data)
            page_df["date_obs_elab"] = pd.to_datetime(
                page_df["date_obs_elab"], errors="coerce").dt.normalize()
            frames.append(page_df)

            last_page_date = page_df["date_obs_elab"].max()
            yesterday = date.today() - timedelta(days=1)

            # Prevent infinite loops
            if pd.isna(last_page_date) or last_page_date.date() >= yesterday:
                break

            cursor = (last_page_date + pd.Timedelta(days=1)).strftime("%Y-%m-%d")

            if len(data) < API_CONFIG.max_per_page:
                break

    if frames:
        return pd.concat(frames, ignore_index=True)
    return pd.DataFrame()
```

**How does the pagination loop actually work?**

Let's walk through it step by step. This is the densest bit of logic in the whole notebook.

1. Send a request with `date_debut_obs_elab=cursor`: "give me records from this date on."
2. If the request fails outright (`requests.RequestException`), log it and `break`. `break` stops the loop right away and moves on. One station's network hiccup shouldn't kill the pipeline for every other station.
3. If the response has no data at all, you've caught up: `break`.
4. Otherwise, note the *latest* date seen on this page (`last_page_date`).
5. If that latest date is already `>= yesterday`, you've caught up: `break`.
6. Otherwise, advance the cursor to `last_page_date + 1 day` and loop again for the next page.
7. As a safety net: if the page returned *fewer* records than `max_per_page`, that also means you've reached the end. The API wouldn't return a partial page unless it ran out of data, so: `break`.

That last check (step 7) is a classic **pagination termination heuristic**. You don't always need a `next_page` token from the API. If a full page is `size=20000` and you get back only `4213` records, there's nothing left to fetch.

**Three specific, deliberate choices, called out:**

```py
session = requests.Session()
```

A [<VPIcon icon="fas fa-globe"/>`Session`](https://requests.readthedocs.io/en/latest/user/advanced/#session-objects) object reuses the underlying TCP connection across multiple requests to the same host. That avoids a fresh TCP/TLS handshake on every single page request. In short, it's faster for you and more polite to Hub'Eau's servers.

::: tip Best practice

Any time you call `requests.get()` more than once against the same host in a loop, reach for a `Session`.

```py
except requests.RequestException as e:
```

:::

`RequestException` is the base class for [<VPIcon icon="fas fa-globe"/>every exception](https://requests.readthedocs.io/en/latest/api/#requests.RequestException) `requests` can raise: timeouts, connection errors, HTTP errors from `raise_for_status()` and more. Catching the base class here means *any* network hiccup gets handled the same forgiving way: log it, stop fetching this station, move on.

```py
timeout=API_CONFIG.timeout_seconds
```

By default, `requests` calls **never time out**. Without an explicit timeout, a hung server can freeze your entire pipeline indefinitely. The [<VPIcon icon="fas fa-globe"/>requests advanced usage docs](https://requests.readthedocs.io/en/latest/user/advanced/#timeouts) states that requests to external servers should have a timeout attached.

::: tip Best practice

Wrap every external I/O call in `try/except`. Always fail gracefully. Log the error and let the pipeline recover or move on. This avoids one flaky request taking down an unattended weekly job.

Now the orchestrator, `fetch_all_data()`, is deliberately much simpler:

1. Loop through all station codes.
    - Fetch each station's data.
    - Keep the non-empty results.
2. Combine them into one big DataFrame.

```py
def fetch_all_data(start_date: str, use_mock: bool = True) -> pd.DataFrame:
    """Orchestrator: Fetch data for all configured stations."""
    frames = []

    for station_code in STATION_CONFIG.station_codes:
        print(f"Fetching data for station {station_code}...")
        df_station = fetch_single_station_data(station_code, start_date, use_mock=use_mock)

        if not df_station.empty:
            print(f"  Got {len(df_station)} records")
            frames.append(df_station)
        else:
            print(f"  (no data)")

    if frames:
        return pd.concat(frames, ignore_index=True)
    return pd.DataFrame()
```

:::

That's it. A loop and a `pd.concat`. All the hard-won complexity lives one layer down, exactly where SRP says it should.

---

## Part 5: The Transform Step

This is where raw, freshly-fetched data becomes something you can publish. Here's the design philosophy for this whole section: compose many small, **pure functions**. Each one takes a DataFrame in and returns a *new* DataFrame out without side effects. Avoid the one giant do-everything function trap.

```text
    (EXTRACT)
    Raw API Data
    ↓
    (TRANSFORM)
1. Type parsing (datetime, numeric)
2. Column renaming (French → English)
3. Categorical mapping (validation status, quality)
4. Derived columns computation (flood alert flags)
5. Column reordering (logical grouping)
6. Sorting & index reset
    ↓
    (LOAD)
    Publication-ready dataset
```
<!-- TODO: mermaid화 -->

Why split this into six tiny steps instead of one big function? Each piece is testable and replaceable on its own. When something breaks at 3am on a scheduled run, every function is debuggable in isolation. You can pinpoint exactly which stage produced bad output. No need to pick apart one 200-line function.

### Type Parsing and Graceful Coercion

#### Design logic

Data from a CSV or a JSON API starts out, by default, as strings. Pandas needs real types to sort dates chronologically, do date arithmetic (`last_date + timedelta(days=1)`), or compare numeric values (`water_level > 6000`). Type mismatches are a common error that break batch pipelines. One malformed row, like `"N/A"`, a truncated date, misaligned values, or stray characters and a strict parser throws an exception that kills the whole run.

::: tip Best practice

Both conversion functions below use `errors="coerce"`, so values pandas can't parse become `NaT` (Not a Time) or `NaN` (Not a Number) instead of raising an error. This is called [<VPIcon icon="fa-brands fa-stack-overflow"/>graceful coercion](https://stackoverflow.com/questions/36394814/what-is-the-significance-of-coerce-in-python-pandas).

:::

#### Code-level walkthrough

`convert_to_date()` and `convert_to_numeric()` are small helper functions that make sure certain columns have the right type.

- Both start with `df.copy()` so they don’t change the original DataFrame.
- `errors="coerce"` means bad values become missing values instead of causing a crash.

For `convert_to_date()`:

1. `df.copy()` makes a separate copy, so the original table stays unchanged
2. The loop goes through each column name in `columns`
    - `if col in df.columns` checks that the column actually exists before trying to convert it
    - `pd.to_datetime(...)` turns text like `"2026-07-12"` into real pandas date/time values
    - `errors="coerce"` means invalid values become `NaT` (missing date) instead of raising an error
    - `.dt.normalize()` removes the time part and keeps only the date at midnight

For `convert_to_numeric()`:

1. `df.copy()` is used here as well.
2. The loop goes through each column name in `columns`
    - `if col in df.columns` checks that the column actually exists before trying to convert it
    - The loop calls `pd.to_numeric()` turns text like `"12.5"` into numbers
    - `errors="coerce"` turns bad values into `NaN` instead of crashing

```py
def convert_to_date(df: pd.DataFrame, columns: List[str]) -> pd.DataFrame:
    """Convert specified columns to pandas datetime type."""
    df = df.copy()  # Never modify the original!
    for col in columns:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors="coerce").dt.normalize()
    return df


def convert_to_numeric(df: pd.DataFrame, columns: List[str]) -> pd.DataFrame:
    """Convert specified columns to numeric (float) type."""
    df = df.copy()
    for col in columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
    return df
```

Why is this useful?

- You can aggregate the data: group it, summarize it and so on...
- Dates become sortable and filterable as real dates.
- Numbers work correctly in calculations like averages, sums, or comparisons.
- It prevents bugs caused by mixed types, like `"12"` and `12`.

Both `pd.to_datetime` and `pd.to_numeric` are official pandas functions with an `errors` parameter. By default, that parameter is set to `"raise"`, which throws on bad input. The other options are `"coerce"` (replace with null) or `"ignore"` (leave untouched). See the [<VPIcon icon="iconfont icon-pandas"/>pandas `to_datetime` docs](https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html) and [<VPIcon icon="iconfont icon-pandas"/>`to_numeric` docs](https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html) for the full parameter list.

Test it against an example of messy input:

```py
messy_df = pd.DataFrame({
    "date_obs_elab": ["2026-01-15", "2026-01-16", "not a date", None],
    "resultat_obs_elab": [5800.0, "5900", "N/A", None],
})

type_safe_df = convert_to_date(messy_df, ["date_obs_elab"])
type_safe_df = convert_to_numeric(type_safe_df, ["resultat_obs_elab"])
#
# "not a date"  → NaT
# "N/A"         → NaN
# Pipeline continues safely — nothing crashed.
```

::: tip Best practice

Don't let one bad row kill an entire run. Coerce bad data to nulls rather than raising exceptions. Flag or log nulls separately if you need to investigate data quality later.

:::

This is a deliberate trade-off. A choice between *availability* (the pipeline keeps running) over *strictness* (catching every bad row immediately). That's usually the right call for a scheduled, unattended job.

#### `df.copy()`: immutability by convention

Look again at the top of both functions above: `df = df.copy()`. This single line appears at the start of **every transform function** in the pipeline, and that's not an accident.

Python DataFrames are mutable objects, passed by reference. If a function modifies `df` in place without copying first, the caller's original DataFrame changes too. That's a classic [<VPIcon icon="fa-brands fa-wikipedia-w"/>side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) and it can produce genuinely confusing bugs. Call `.copy()` first means each function's output is a brand-new object. The input the caller passed in stays *guaranteed untouched*.

::: tip Best practice

Treat DataFrames as **immutable inputs**. Return a new DataFrame rather than modify it one in place. Even if it costs a small amount of memory or CPU, the debugging win is almost always worth it for a pipeline that isn't operating at extreme scale.

:::

Finally, one auto-detecting convenience function wraps these two low-level functions. It scans text columns, guesses whether they contain dates or numbers, and calls the matching parsing function above.

`auto_convert_columns()` tries to **guess which columns are dates or numbers** and then fixes these types automatically.

How it works:

It starts with two empty lists:

- `datetime_cols` for date columns
- `numeric_cols` for number columns

It goes through each column in the DataFrame. If a column is already a real datetime or numeric type, it skips it. If the column is text-like (`object` or `string`), it looks at up to 10 non-empty sample values.

It first tries to read those values as dates:

- if that works, the column is added to `datetime_cols`

If not, it tries to read them as numbers:

- if that works, the column is added to `numeric_cols`

At the end, it converts all date columns with `convert_to_date()`. Then it converts all numeric columns with `convert_to_numeric()`

```py :collapsed-lines
def auto_convert_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Auto-detect and convert datetime and numeric columns to the correct type."""
    datetime_cols = []
    numeric_cols = []

    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            continue
        if pd.api.types.is_numeric_dtype(df[col]):
            continue

        if pd.api.types.is_object_dtype(df[col]) or pd.api.types.is_string_dtype(df[col]):
            sample = df[col].dropna().head(10)
            if len(sample) == 0:
                continue

            try:
                pd.to_datetime(sample, errors='raise', format='mixed')
                datetime_cols.append(col)
                continue
            except (ValueError, TypeError):
                pass

            try:
                pd.to_numeric(sample, errors='raise')
                numeric_cols.append(col)
                continue
            except (ValueError, TypeError):
                pass

    df = convert_to_date(df, datetime_cols)
    df = convert_to_numeric(df, numeric_cols)
    return df
```

Notice the inner `try/except` blocks here use `errors='raise'`. That's the *opposite* of the coercion strategy above, but it only runs against a small `.head(10)` **sample** of each column.

This is a type-*sniffing* step, not the final conversion. It tests *"does this column look like dates, or numbers, or neither?"* on a cheap sample. Then, it hands off the actual, forgiving conversion of the *whole* column to `convert_to_date()` or `convert_to_numeric()`. Two different `errors` strategies, two different jobs.

### Schema Translation with Bidirectional mappings

#### Design logic

The Hub'Eau API returns French column names and French categorical values, like `code_station` or `"Donnée validée"`. A dataset meant for an international audience should ship in English. If you rename columns inline, wherever it's convenient, the mapping between French and English ends up scattered across the codebase. Then you'd have no way to reverse it if you ever needed to.

::: tip The fix

define **one authoritative mapping** at the top of the module, and derive everything else from it.

:::

#### Code-level walkthrough

`API_TO_EN` maps API field names to English translations.

```py
# Primary mapping: French API columns to English column names
API_TO_EN = {
    "code_site": "location_code",
    "code_station": "station_code",
    "date_obs_elab": "record_date",
    "resultat_obs_elab": "water_level_mm",
    "date_prod": "data_production_date",
    "code_statut": "validation_status_code",
    "libelle_statut": "validation_status",
    "code_methode": "production_method_code",
    "libelle_methode": "production_method",
    "code_qualification": "quality_code",
    "libelle_qualification": "quality_assessment",
    "longitude": "longitude",
    "latitude": "latitude",
    "grandeur_hydro_elab": "hubeau_elab_code",
}

# Reverse mapping: English to French (computed automatically)
EN_TO_API = {v: k for k, v in API_TO_EN.items()}
```

The second line (`EN_TO_API`) is just a shortcut: it swaps each key and value from `API_TO_EN`. A [<VPIcon icon="fa-brands fa-python"/>dict comprehension](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) builds it. **Here's the important design point:** `EN_TO_API` isn't hand-maintained, it's *derived*. If you add, remove, or rename an entry in `API_TO_EN`, `EN_TO_API` updates automatically the next time the module runs.

There's *exactly one place* in the entire codebase where a schema change needs to happen.

Categorical *values* (not just column names) get the same treatment:

```py
CATEGORICAL_MAPPINGS = {
    "validation_status": {
        "Donnée validée": "validated",
        "Donnée brute": "raw",
        "Donnée pré-validée": "pre-validated",
    },
    "quality_assessment": {
        "Bonne": "good",
        "Non qualifiée": "unqualified",
        "Douteuse": "dubious",
    },
    "production_method": {
        "Calculée": "calculated",
        "Mesurée": "measured",
        "Expertisée": "expert-reviewed",
    },
}
```

The functions below apply these mappings, in order, to standardize column names and category values.

`rename_to_english()`:

1. If the DataFrame is empty, it returns a copy right away.
2. It builds a list of columns that are renamed from API names to English names.
    - It only renames a column if:
      - the old name exists, and
      - the new name does not already exist
3. Then it returns the renamed DataFrame.

`rename_to_api_schema()`:

1. Also returns a copy for empty data.
2. Does the reverse: English names back to API names.
3. Returns the DataFrame.

(Useful if you need to send data back in the API’s original format).

`apply_categorical_mappings()`:

1. Makes a copy so the original DataFrame is not changed.
2. For each column in `CATEGORICAL_MAPPINGS`, it replaces values using the mapping.
    - Example: `"Donnée validée"` becomes `"validated"`.
    - `.fillna(df[col_name])` keeps the original value if a value isn’t found in the mapping.
3. Returns the DataFrame.

```py
def rename_to_english(df: pd.DataFrame) -> pd.DataFrame:
    """Rename API column names to English schema names."""
    if df.empty:
        return df.copy()

    columns_to_rename = {}
    for src, dst in API_TO_EN.items():
        if src in df.columns and dst not in df.columns:
            columns_to_rename[src] = dst

    return df.rename(columns=columns_to_rename)

def rename_to_api_schema(df: pd.DataFrame) -> pd.DataFrame:
    """Rename English column names back to API schema names (defensive/reverse operation)."""
    if df.empty:
        return df.copy()

    columns_to_rename = {k: v for k, v in EN_TO_API.items() if k in df.columns}
    return df.rename(columns=columns_to_rename)
```

```py
def apply_categorical_mappings(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    for col_name, mapping in CATEGORICAL_MAPPINGS.items():
        if col_name in df.columns:
            df[col_name] = df[col_name].map(mapping).fillna(df[col_name])
    return df
```

Two defensive habits are worth a note here:

::: note Robustness to partial inputs

Both rename functions only rename columns that actually exist in the input (`if src in df.columns`).

A rename function that assumes every mapped column is always present will crash the moment it's called on a partial or differently-shaped DataFrame.

:::

`.map(mapping).fillna(df[col_name])`. [<VPIcon icon="iconfont icon-pandas"/>`Series.map`](https://pandas.pydata.org/docs/reference/api/pandas.Series.map.html) replaces every value it finds in the mapping dict and turns any value *not* found in the dict into `NaN`. Chain `.fillna(df[col_name])` right after restores the *original* value wherever the mapping didn't apply. That way, unexpected categorical values pass through unchanged instead of silently becoming null. It's a subtle but important robustness choice.

See this exact `.map()`-then-`.fillna()` idiom discussed on [<VPIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow: pandas map vs apply performance](https://stackoverflow.com/questions/19798153/difference-between-map-applymap-and-apply-methods-in-pandas).

A quick round-trip test proves the bidirectional mapping actually works:

```py
sample_api_df = pd.DataFrame({"code_station": ["F700000109"], ...})
renamed_df = rename_to_english(sample_api_df)          # French → English
reversed_df = rename_to_api_schema(renamed_df)          # English → French
# reversed_df.columns.tolist() == sample_api_df.columns.tolist()  → True
```

### Compute Flood Alerts

`add_derived_columns()` is a one-liner. It just computes `flood_alert`. If the water level is greater than the flood threshold set in the `Config`, the result is `True`. Otherwise, the result is `False`.

```py
def add_derived_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Add a computed columns based on raw data.
    """
    df = df.copy()

    if "water_level_mm" in df.columns:
        df["flood_alert"] = df["water_level_mm"] > STATION_CONFIG.flood_threshold_mm

    return df
```

### Column Ordering

Here's a small but user-facing detail: define a preferred column order once, as data, and reuse it everywhere. `COLUMN_ORDER` holds that preferred column sequence.

`order_columns()` rearranges a DataFrame so those columns come first, while any extra columns stay at the end.

```py
COLUMN_ORDER = [
    # Primary identifiers & measurements
    "station_code", "record_date", "water_level_mm", "flood_alert",
    # Metadata about the observation
    "hubeau_elab_code", "data_production_date",
    "validation_status_code", "validation_status",
    "production_method_code", "production_method",
    "quality_code", "quality_assessment",
    # Geographic info (less important)
    "location_code", "longitude", "latitude",
]

def order_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Reorder columns to preferred order."""
    present_cols = [c for c in COLUMN_ORDER if c in df.columns]
    other_cols = [c for c in df.columns if c not in present_cols]
    return df[present_cols + other_cols]
```

`other_cols` acts as a safety net: any column not explicitly listed in `COLUMN_ORDER` still gets included at the end. They're not silently dropped.

Rules, in order of priority:

- Keep identifiers and key fields up front.
- Put the most important, most frequently used, and most stable columns first.
- Group related fields together, so the table reads naturally.
- Push optional or rarely-used fields to the end.

### Deduplication

#### Design logic

Remove duplicates as you go. In an incremental pipeline, date ranges and records can overlap:

- The same day might get re-fetched, because API data arrives late or gets finalized later.
- The same observation might appear on two different pages of a paginated response.

Without deduplication, these scenarios let duplicate rows pile up in the dataset over time. This is also, recall from Part 1, exactly what makes the pipeline **idempotent**: run it once or run it five times and the resulting dataset stays identical.

The fix requires defining what makes a record **unique**. Define a composite key:

```text
key = (station_code, observation_date, water_level_value)
```

Why this specific combination? Physically, one sensor (`station_code`) reports one day's (`observation_date`) daily-maximum reading (`water_level_mm`), and that reading should be unique.

- Records from different stations obviously aren't duplicates of each other.
- Two readings on different days aren't duplicates.
- A subtler point: if the *same* station reports the *same* day but with a *different* value, that counts as a distinct observation, for example a corrected or revised measurement, not a duplicate to silently discard.

#### Code-level walkthrough

`create_dedup_key()` builds a unique text ID for each row by joining three pieces together with an underscore:

- station code
- date, as YYYY-MM-DD
- water level value

Example key:

```text
"F700000109_2024-01-15_5800.0"
```

```py
def create_dedup_key(df: pd.DataFrame) -> pd.Series:
    """Create unique deduplication key from station, day, and water level value.

    Key format: "station_code_YYYY-MM-DD_value"
    Example: "F700000109_2024-01-15_5800.0"
    """
    parts = []

    if "code_station" in df.columns:
        parts.append(df["code_station"].astype(str))

    if "date_obs_elab" in df.columns:
        parts.append(df["date_obs_elab"].dt.strftime("%Y-%m-%d"))

    if "resultat_obs_elab" in df.columns:
        parts.append(df["resultat_obs_elab"].astype(str))

    if not parts:
        return pd.Series(index=df.index, dtype="object")

    return pd.Series(
        ["_".join(row) for row in zip(*parts)],
        index=df.index
    )
```

::: info How the key-building works

`parts` ends up as a list of [<VPIcon icon="fas fa-globe"/>Series](https://geeksforgeeks.org/pandas/python-pandas-series/), one per key component (station, date, value), each the same length as the DataFrame.

:::

Read the last line from the inside out:

```py
return pd.Series(["_".join(row) for row in zip(*parts)], index=df.index)
```

`zip(*parts)` transposes that list of columns into row-wise tuples. It yields `(station_1, date_1, value_1)`, then `(station_2, date_2, value_2)`, and so on. The [<VPIcon icon="fas fa-globe"/>list comprehension](https://geeksforgeeks.org/python/python-list-comprehension/) then joins each row-tuple with underscores into one string key per row.

This *"list of columns → zip → row tuples"* idiom is a common and efficient way to combine several Series into one derived Series, without writing `.apply(lambda row: ..., axis=1)`. Row-wise `.apply` is notoriously [<VPIcon icon="fa-brands fa-stack-overflow"/>slow in pandas](https://stackoverflow.com/questions/54432583/when-should-i-not-want-to-use-pandas-apply-in-my-code) compared to [<VPIcon icon="fas fa-globe"/>vectorized](https://datacamp.com/es/tutorial/pandas-iterate-over-rows) string operations.

The actual deduplication happens in `remove_duplicates()`. It removes rows from *"new"* (freshly fetched data) that already exist in *"existing"* (historic data).

Step by step:

1. If one table is empty, it just returns `new`.
2. It enforces types in both DataFrames with `auto_convert_columns()` first, so dates and numbers compare correctly.
3. It creates a deduplication key for each row in both tables with `create_dedup_key()`.
4. It checks which keys from the fetched data don't appear in the existing historic dataset, and keeps only truly new rows.
5. It returns the filtered result, keeping the original columns from `new`.

```py
def remove_duplicates(existing: pd.DataFrame, new: pd.DataFrame) -> pd.DataFrame:
    """Remove rows from 'new' that already exist in 'existing'."""
    # Short-circuit: if either is empty, no work to do
    if existing.empty or new.empty:
        return new.copy()

    # Parse types on both sides for a fair comparison
    existing_std = auto_convert_columns(existing)
    new_std = auto_convert_columns(new)

    # Build the keys
    existing_keys = set(create_dedup_key(existing_std).dropna())
    new_keys = create_dedup_key(new_std)

    # Boolean mask: True where the new row is genuinely new
    mask = ~new_keys.isin(existing_keys)

    # Index back into the ORIGINAL (non-standardized) 'new' to preserve all columns
    result = new.iloc[new_keys[mask].index].copy()
    return result
```

Two performance and robustness details are worth to note:

First, **`existing_keys` is a `set`, not a `list`**. Testing membership (`in` / `.isin()`) against a Python `set` is [<VPIcon icon="fas fa-globe"/>$O\left(1\right)$](https://robbell.io/2009/06/a-beginners-guide-to-big-o-notation) on average, because it uses a fast hash lookup to answer *is this item already here?* directly. Testing against a `list` is $O\left(n\right)$: it has to scan item by item and it gets slower as the existing dataset grows.

For a dataset with tens of thousands of rows, checked on every single pipeline run, that difference matters and that's a textbook example of choosing the right data structure for the job. See the general discussion of [<VPIcon icon="fa-brands fa-stack-overflow"/>list vs. set lookup performance in Python](https://stackoverflow.com/questions/513882/python-list-vs-dict-for-look-up-table) and this [<VPIcon icon="fa-brands fa-stack-overflow"/>guidance](https://thelinuxcode.com/pandas-value-list/) on [<VPIcon icon="fa-brands fa-stack-overflow"/>`.isin()` performance for filtering](https://stackoverflow.com/questions/61515457/fastest-way-to-filter-a-pandas-dataframe-using-a-list).

::: info Simple rule

Use a `set` when you care about fast membership checks. Use a `list` when you care about order or duplicates.

:::

Second, `new.iloc[new_keys[mask].index]` **indexes back into the *original*, non-validated** `new` **DataFrame**, not `new_std`.

Why? `auto_convert_columns()` only ran to get *consistent types for comparison*. The caller still wants the *original* raw values and schema back for everything that survives deduplication.

Don't let a side-computation *accidentally* become your source of truth. Always modify a copy only to decide what to keep or remove. Once you've made that decision, apply it to the original data. That way you preserve the real source values for later steps.

In short:

1. First modifications are only for comparison.
2. Use that comparison to filter the original data.
3. Return the original rows unchanged, so later stages can process them.

::: tip Best practice

Keep your deduplication key simple and stable (immutable) and always short-circuit (with `if existing.empty or new.empty: return new.copy()`) before doing any heavier work. This cheap guard clause skips the expensive deduplication logic when there's no data to process.

:::

### Put it All Together in `postprocess()`

All the pieces above are small and testable on their own. The last step of **Transform** glues them together, *in order*, into the single pipeline function below:

```py
def postprocess(df: pd.DataFrame) -> pd.DataFrame:
    """Apply all post-processing transformations."""
    if df.empty:
        return df

    df = df.copy()

    print("  1. Converting types...")
    df = auto_convert_columns(df)

    print("  2. Renaming columns (French → English)...")
    df = rename_to_english(df)

    print("  3. Mapping categorical values...")
    df = apply_categorical_mappings(df)

    print("  4. Adding derived columns...")
    df = add_derived_columns(df)

    print("  5. Reordering columns...")
    df = order_columns(df)

    print("  6. Sorting and resetting index...")
    df = df.sort_values(["record_date", "station_code"]).reset_index(drop=True)

    return df
```

Notice the shape of this function: it's basically a linear script with six numbered, printed steps. Each one calls a previously-defined pure function. There's no new *logic* here, only *sequencing*. That's intentional.

::: tip Best practice

Log progress clearly at each stage. When a scheduled job fails at 3am, a clear step-by-step log is the difference between a two-minute diagnosis and an hour of guessing. A good option is to use a [<VPIcon icon="fas fa-globe"/>logger](https://geeksforgeeks.org/python/logging-in-python/). Here, this tutorial sticks with classic console printing (`print(f" 1. Converting types...")`).

:::

---

## Part 6: The Load Step

### Design Logic

**Load** is the final stage: take the processed data and move it to its destination. Typical destinations include data warehouses, data lakes, and databases.

Before publishing, the pipeline prepares two things: the output folder itself, and a metadata file that describes the dataset.

#### Code-level walkthrough
 
`create_output_dir()` makes sure an output folder exists, and creates one if it doesn't:

- If `use_mock` is `True`, it uses `KAGGLE_CONFIG.mock_output_dir`, the directory for fake data.
- Otherwise, it uses the real output directory set in `KAGGLE_CONFIG.output_dir`.

```py
def create_output_dir(use_mock: bool = False) -> None:
    """Create output directory (and parents) if it does not already exist."""
    output_dir = KAGGLE_CONFIG.mock_output_dir if use_mock else KAGGLE_CONFIG.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    # exist_ok=True: idempotent, safe to call multiple times
```

`exist_ok=True` is a small but important detail. Without it, [<VPIcon icon="fa-brands fa-python"/>`Path.mkdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.mkdir) raises `FileExistsError` if the directory already exists, which it will on every run after the first.

Setting `exist_ok=True` makes directory creation **idempotent**: calling it 100 times has the same effect as calling it once. On the filesystem, this is the "safe to re-run" idea behind the deduplication logic from Part 5. The Kaggle API follows the [<VPIcon icon="iconfont icon-kaggle"/>Data Package specification](https://frictionlessdata.io/specs/data-package/). It [<VPIcon icon="iconfont icon-kaggle"/>requires (<VPIcon icon="iconfont icon-github"/>`Kaggle/kaggle-cli`)](https://github.com/Kaggle/kaggle-cli/wiki/Dataset-Metadata/bc2684f533cd40afae28210d8f6e62b88d793d62) a descriptive `dataset-metadata.json` file alongside the CSV. This matters for the search and discoverability of the [<VPIcon icon="iconfont icon-kaggle"/>Paris flood dataset](https://kaggle.com/datasets/grimespoint/paris-flood-dataset):

```py
def create_metadata(df: pd.DataFrame, config: KaggleConfig) -> Dict:
    """Generate Kaggle dataset metadata from DataFrame and config."""
    if df.empty or "record_date" not in df.columns:
        first_date = "unknown"
        last_date = "unknown"
    else:
        first_date = df["record_date"].min().strftime("%Y-%m-%d")
        last_date = df["record_date"].max().strftime("%Y-%m-%d")

    return {
        "title": config.title,
        "id": config.dataset_slug,
        "licenses": [{"name": config.license_name}],
        "keywords": config.keywords,
        "temporalCoverage": {"startDate": first_date, "endDate": last_date},
        "geospatialCoverage": config.geospatial_coverage,
        "updateFrequency": config.update_frequency,
    }
```

Metadata comes from the `KaggleConfig` dataclass. Note that `temporalCoverage` is computed *from the data itself* (`df["record_date"].min()`/`.max()`) rather than hardcoded. Every time the pipeline runs, the metadata's date range automatically reflects reality, with zero manual bookkeeping.

Finally, `publish_to_kaggle()` uploads the updated dataset to Kaggle. It calls out to the [Kaggle CLI (<VPIcon icon="iconfont icon-github"/>`Kaggle/kaggle-api`)](https://github.com/Kaggle/kaggle-api) as an external command.

What it does:

1. Gets the current time and turns it into a text label like `Weekly update: 2026-07-13 14:30:00`
2. Builds a Kaggle command that says:
    - publish a new dataset version
    - use files from `KAGGLE_CONFIG.output_dir`
    - attach the message
    - zip the directory contents
3. Prints the command so you can see what will run
4. Runs the command with `subprocess.run(...)`

If the upload works:

- it prints `Successfully published to Kaggle.`

If it fails:

- it prints the error and then raises the error again so the failure isn't hidden.

```py
def publish_to_kaggle() -> None:
    """Publish the updated dataset to Kaggle using the Kaggle CLI."""
    timestamp = pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    message = f"Weekly update: {timestamp}"

    cmd = [
        "kaggle", "datasets", "version",
        "-p", str(KAGGLE_CONFIG.output_dir),
        "-m", message,
        "--dir-mode", "zip",
    ]

    print("Publishing to Kaggle...")
    print("Command:", " ".join(cmd))

    try:
        subprocess.run(cmd, check=True)
        print("Successfully published to Kaggle.")
    except subprocess.CalledProcessError as e:
        print(f"Error publishing to Kaggle: {e}")
        raise
```

`publish_to_kaggle` calls the Kaggle CLI (Command Line Interface) through Python's [<VPIcon icon="fa-brands fa-python"/>`subprocess`](https://docs.python.org/3/library/subprocess.html) module. This is the standard way to run an external command-line tool from a Python pipeline.

Two choices here are worth adopting as general habits, not just for Kaggle:

- **`cmd` is built as a `list`, never as a concatenated string.** Pass a list of arguments to `subprocess.run` skips invoking a shell entirely. That sidesteps [<VPIcon icon="fa-brands fa-python"/>shell-injection](https://portswigger.net/web-security/os-command-injection) risks and correctly handles arguments containing spaces or special characters. See the [<VPIcon icon="fa-brands fa-python"/>official `subprocess` security considerations](https://docs.python.org/3/library/subprocess.html#security-considerations).
- `check=True` means that if the Kaggle CLI fails, by exiting with a non-zero status, `subprocess.run` raises `CalledProcessError` instead of silently returning. Without `check=True`, a failed publish would look exactly like a successful one to the rest of the code.

---

## Part 7: Assemble the Full Pipeline

### The Global Rehearsal (Mock Mode)

The whole pipeline is built and tested in isolation. It's time to wire the blocks into one linear function. First, run it entirely against mock data. Nothing gets published this way. For Demonstration purposes, a CSV filled with artificial data will land in a local `mock_output` folder.

```py
def run_etl_pipeline(use_mock: bool = True) -> pd.DataFrame:
    """Run the complete ETL pipeline: Extract → Transform → Load to CSV."""

    # STEP 1: LOAD EXISTING DATA
    if use_mock:
        loaded_df = pd.DataFrame(mock_api_response)
        loaded_df['date_obs_elab'] = pd.to_datetime(loaded_df['date_obs_elab'])
        loaded_df = rename_to_english(loaded_df)
    else:
        loaded_df = load_csv(KAGGLE_CONFIG.input_csv)

    # STEP 2: DETERMINE UPDATE RANGE
    should_update, start_date = determine_update_range(loaded_df)
    if not should_update:
        return loaded_df   # already current: nothing more to do

    # STEP 3: EXTRACT (FETCH DATA)
    fetched_data = fetch_all_data(start_date, use_mock=use_mock)

    # STEP 4: TRANSFORM I - DEDUPLICATE
    deduped_fetched_data = remove_duplicates(loaded_df, fetched_data)

    # STEP 5: TRANSFORM II - COMBINE (MERGE WITH EXISTING)
    new_df_english = rename_to_english(deduped_fetched_data)
    merged_historical_and_new = pd.concat([loaded_df, new_df_english], ignore_index=True)

    # STEP 6: TRANSFORM III - POST-PROCESS
    processed_records = postprocess(merged_historical_and_new)

    # STEP 7: EXPORT (LOAD TO CSV)
    create_output_dir(use_mock=use_mock)
    output_path = KAGGLE_CONFIG.mock_output_filename if use_mock else KAGGLE_CONFIG.output_csv_path
    processed_records.to_csv(output_path, index=False, sep=",")

    return processed_records
```

Every one of the seven steps above corresponds to a function you already built, and tested earlier in this tutorial. **To Assemble them is almost mechanical.** That's always the payoff of composing small, single-responsibility functions:

```py
loaded_df                 = load_csv(...)                          # 1. load existing data
should_update, start_date = determine_update_range(...)            # 2. check what's needed
fetched_data               = fetch_all_data(start_date)             # 3. fetch new records
deduped_fetched_data       = remove_duplicates(existing, new_raw)   # 4. deduplicate
merged_historical_and_new  = pd.concat([existing, new_clean])       # 5. merge
processed_records          = postprocess(merged_historical_and_new) # 6. postprocess
processed_records.to_csv(...)                                       # 7. save
write_metadata() + publish_to_kaggle()                               # 8. publish
```

Each line's intent is obvious just from reading it left to right. That is exactly the point of good decomposition.

### `main()`: Pipeline Orchestration

`main()` is the [<VPIcon icon="fa-brands fa-python"/>conductor](https://docs.python.org/en/3/library/__main__.html). It wires every previously-built component together in the right order, just like `postprocess()` did one level down.

```py
def main() -> None:
    """Execute the full Paris Flood Monitoring ETL pipeline.

    EXTRACT
    1. Load the existing dataset from the Kaggle input mount
    2. Determine whether an update is needed (and from what date)
    3. Fetch new data from the Hub'Eau API

    TRANSFORM
    4. Deduplicate against the existing dataset
    5. Combine and post-process (type parsing, translation, derived cols...)

    LOAD
    6. Write the updated CSV and metadata file
    7. Publish the new dataset version to Kaggle

    Exits early if the dataset is already up to date.
    """
    final_dataset = run_etl_pipeline(use_mock=False)
    final_dataset.to_csv(KAGGLE_CONFIG.output_csv_path, index=False)
    write_metadata(final_dataset)

    print("\n[FINAL STEP] Publishing to Kaggle...")
    publish_to_kaggle()

    print("Running post-run validation")
    validate_and_analyze(final_dataset)


if __name__ == "__main__":
    main()
```

### The `if __name__ == "__main__":` Guard

```py
if __name__ == "__main__":
    main()
```

This is one of the most common idioms in Python, and it's worth understanding exactly what it does. Per the [<VPIcon icon="fa-brands fa-python"/>official Python documentation](https://docs.python.org/3/library/__main__.html) on `__main__`:

- Run the file directly (`python script.py`)
  - → the special variable `__name__` is set to `"__main__"`
  - → the condition is `True`
  - → `main()` executes.
- **Import** the file as a module elsewhere (`import script`)
  - → `__name__` is set to the module's name instead
  - → the condition is `False`
  - → `main()` does **not** run automatically.

::: tip Best practice

Always guard your entry point this way. It makes the module safely **importable** for testing individual functions, or for reuse in another script, without triggering the full pipeline (including a real publish to Kaggle!) just by importing it.

:::

---

## Part 8: Go Live and Switch to the Real API

Everything above runs safely against mock data. To point the pipeline at the real Hub'Eau API instead:

1. Note the `use_mock=False` setting above. It threads through `APIConfig.use_mock`, and the calls to `run_etl_pipeline(use_mock=False)` and `main()`.
2. Make sure `KAGGLE_CONFIG.dataset_slug` and `input_csv` point at **your own** Kaggle dataset copy before you use it. You can only publish new versions of a dataset you own. Fork both the [<VPIcon icon="iconfont icon-kaggle"/>notebook](https://kaggle.com/code/grimespoint/data-engineering-with-python-etl-pipeline) and the [<VPIcon icon="iconfont icon-kaggle"/>dataset](https://kaggle.com/datasets/grimespoint/paris-flood-dataset), then update the slug in the [`KaggleConfig`](#part-3-manage-configuration-with-dataclasses) section.
3. Install and authenticate the [Kaggle CLI (<VPIcon icon="iconfont icon-github"/>`Kaggle/kaggle-api`)](https://github.com/Kaggle/kaggle-api) if you plan to call `publish_to_kaggle()` outside of a Google Colab or Kaggle notebook.

Everything else needs **zero changes**.

### Post-Run Validation

`validate_and_analyze()` closes the loop, and it's more than just a nice-to-have. It's a welcome sanity check that runs *after* the pipeline finishes. The output is a human-readable report covering shape, data types, null counts, summary statistics on `water_level_mm`, how many flood-alert records turned up, the temporal coverage and per-station record counts.

It doesn't change any data. It exists so that whoever, or whatever monitoring system, reads the run's log output can immediately see whether this week's numbers look sane. No need to analyze the CSV by hand. Try it!

---

## Summary

You've just built a *complete* ETL pipeline that you can run again and again without breaking anything. The skeleton is here, and that same pattern repeats for almost any scheduled data job: swap out the API, the field mapping, and the destination.

For more tutorials like this one, check out my [<VPIcon icon="iconfont icon-kaggle"/>GitHub](https://github.com/hyperphantasia) or [<VPIcon icon="iconfont icon-kaggle"/>Kaggle profile](https://kaggle.com/grimespoint).

Thanks for reading!

::: info References

```component VPCard
{
  "title": "Accueil | Hubeau",
  "desc": "Simplifier l'accès aux données sur l'eau",
  "link": "https://hubeau.eaufrance.fr/",
  "logo": "https://hubeau.eaufrance.fr/sites/default/files/favicon_0.ico",
  "background": "rgba(33,183,239,0.2)"
}
```

- The [<VPIcon icon="iconfont icon-kaggle"/>updater `.py` script](https://kaggle.com/code/grimespoint/paris-flood-dataset-weekly-updater) runs live once a week and updates the original [<VPIcon icon="iconfont icon-kaggle"/>dataset](https://kaggle.com/datasets/grimespoint/paris-flood-dataset).

<SiteInfo
  name="hyperphantasia/paris-flood-dataset"
  desc="Fluctuat nec mergitur dataset generator. Fetches daily max water levels from the Seine in Paris."
  url="https://github.com/hyperphantasia/paris-flood-dataset/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1170029112/33437c4e-8898-4050-88a3-1f53054fdac1"/>

- The complete [<VPIcon icon="iconfont icon-kaggle"/>Jupyter notebook](https://kaggle.com/code/grimespoint/data-engineering-with-python-etl-pipeline) to follow this tutorial and code all along ([backup available (<VPIcon icon="iconfont icon-github"/>`hyperphantasia/kaggle`)](https://github.com/hyperphantasia/kaggle/blob/main/notebook_archive/data-engineering-with-python-etl-pipeline.ipynb)).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The ETL Pipeline Handbook: How to Build a Production-Grade Pipeline in Python",
  "desc": "Tracking flood risk takes one unglamorous but essential thing: clean and structured data. In this tutorial, you'll build a data pipeline yourself. You'll create a Python ETL (Extract, Transform, Load)",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-etl-pipeline-handbook-how-to-build-a-production-grade-pipeline-in-python/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
