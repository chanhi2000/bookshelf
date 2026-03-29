---
lang: en-US
title: "Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained"
description: "Article(s) > Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
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
      content: "Article(s) > Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained"
    - property: og:description
      content: "Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/efficient-data-processing-in-python-batch-vs-streaming-pipelines.html
prev: /programming/py-pandas/articles/README.md
date: 2026-04-13
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0cd359d4-9628-4b17-8dc4-a3a2a83172c8.png
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

[[toc]]

---

<SiteInfo
  name="Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained"
  desc="Every data pipeline makes a fundamental choice before any code is written: does it process data in chunks on a schedule, or does it process data continuously as it arrives? This choice — batch versus "
  url="https://freecodecamp.org/news/efficient-data-processing-in-python-batch-vs-streaming-pipelines"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0cd359d4-9628-4b17-8dc4-a3a2a83172c8.png"/>

Every data pipeline makes a fundamental choice before any code is written: does it process data in chunks on a schedule, or does it process data continuously as it arrives?

This choice — batch versus streaming — shapes the architecture of everything downstream. The tools you use, the guarantees you can make about data freshness, the complexity of your error handling, and the infrastructure you need to run it all follow directly from this decision.

Getting it wrong is expensive. Teams that build streaming pipelines when batch would have sufficed end up maintaining complex infrastructure for a problem that didn't require it.

Teams that build batch pipelines when their use case demands real-time processing discover the gap at the worst possible moment — when a stakeholder asks why the dashboard is six hours out of date.

In this article, you'll learn what batch and streaming pipelines actually are, how they differ in terms of architecture and tradeoffs, and how to implement both patterns in Python. By the end, you'll have a clear framework for choosing the right approach for any data engineering problem you solve.

::: note Prerequisites

To follow along comfortably, make sure you have:

- Practice writing Python functions and working with modules
- Familiarity with pandas DataFrames and basic data manipulation
- A general understanding of what ETL pipelines do — extract, transform, load

:::

---

## What Is a Batch Pipeline?

A batch pipeline processes a bounded, finite collection of records together — a file, a database snapshot, a day's worth of transactions. It runs on a schedule, say, hourly, nightly, weekly, reads all the data for that period, transforms it, and writes the result somewhere. Then it stops and waits until the next run.

The mental model is simple: **collect, then process**. Nothing happens between runs.

In a retail ETL context, a typical batch pipeline might look like this:

1. At midnight, extract all orders placed in the last 24 hours from the transactional database
2. Join with the product catalogue and customer dimension tables
3. Compute daily revenue aggregates by region and product category
4. Load the results into the data warehouse for reporting

The pipeline runs, finishes, and produces a complete, consistent snapshot of yesterday's business. By the time analysts arrive in the morning, the warehouse is up to date.

### Implementing a Batch Pipeline in Python

A batch pipeline in its simplest form is a Python script with three clearly separated stages: extract, transform, load.

```py
import pandas as pd
from datetime import datetime, timedelta

def extract(filepath: str) -> pd.DataFrame:
    """Load raw orders from a daily export file."""
    df = pd.read_csv(filepath, parse_dates=["order_timestamp"])
    return df

def transform(df: pd.DataFrame) -> pd.DataFrame:
    """Clean and aggregate orders into daily revenue by region."""
    # Filter to completed orders only
    df = df[df["status"] == "completed"].copy()

    # Extract date from timestamp for grouping
    df["order_date"] = df["order_timestamp"].dt.date

    # Aggregate: total revenue and order count per region per day
    summary = (
        df.groupby(["order_date", "region"])
        .agg(
            total_revenue=("order_value_gbp", "sum"),
            order_count=("order_id", "count"),
            avg_order_value=("order_value_gbp", "mean"),
        )
        .reset_index()
    )
    return summary

def load(df: pd.DataFrame, output_path: str) -> None:
    """Write the aggregated result to the warehouse (here, a CSV)."""
    df.to_csv(output_path, index=False)
    print(f"Loaded {len(df)} rows to {output_path}")

# Run the pipeline
raw = extract("orders_2024_06_01.csv")
aggregated = transform(raw)
load(aggregated, "warehouse/daily_revenue_2024_06_01.csv")
```

::: info Let's walk through what this code is doing:

- `extract` reads a CSV file representing a daily order export. The `parse_dates` argument tells pandas to interpret the `order_timestamp` column as a datetime object rather than a plain string — this matters for the date extraction step in transform.
- `transform` does two things: it filters out any orders that didn't complete (returns, cancellations), and then groups the remaining orders by date and region to produce revenue aggregates. The `.agg()` call computes three metrics per group in a single pass.
- `load` writes the result to a destination — in production this would be a database insert or a cloud storage upload, but the pattern is the same regardless.

:::

The three functions are deliberately kept separate. This separation — extract, transform, load — makes each stage independently testable, replaceable, and debuggable. If the transform logic changes, you don't need to modify the extract or load code.

### When Batch Works Well

Batch pipelines are the right choice when:

- **Data freshness requirements are measured in hours, not seconds.** A daily sales report doesn't need to be updated every minute. A weekly marketing attribution model certainly doesn't.
- **You're processing large historical datasets.** Backfilling two years of transaction history into a new data warehouse is inherently a batch job — the data exists, it's bounded, and you want to process it as efficiently as possible in one run.
- **Consistency matters more than latency.** Batch pipelines produce complete, point-in-time snapshots. Every row in the output was computed from the same input state. This consistency is valuable for financial reporting, regulatory compliance, and any downstream process that requires a stable, reproducible dataset.

---

## What Is a Streaming Pipeline?

A streaming pipeline processes data continuously, record by record or in small micro-batches, as it arrives. There is no "end" to the dataset — the pipeline runs indefinitely, consuming events from a source like a message queue, a Kafka topic, or a webhook, and processing each one as it comes in.

The mental model is: **process as you collect**. The pipeline is always running.

In the same retail ETL context, a streaming pipeline might handle order events as they're placed:

1. An order is placed on the website and an event is published to a message queue
2. The streaming pipeline consumes the event within milliseconds
3. It validates, enriches, and routes the event to downstream systems
4. The fraud detection service, the inventory system, and the real-time dashboard all receive updated information immediately

The difference from batch is fundamental: the data isn't sitting in a file waiting to be processed. It's flowing, and the pipeline has to keep up.

### Implementing a Streaming Pipeline in Python

Python's generator functions are the natural building block for streaming pipelines. A generator produces values one at a time and pauses between yields — which maps directly onto the idea of processing records as they arrive without loading everything into memory.

```py
import json
import time
from typing import Generator, Dict

def event_source(filepath: str) -> Generator[Dict, None, None]:
    """
    Simulate a stream of order events from a file.
    In production, this would consume from Kafka or a message queue.
    """
    with open(filepath, "r") as f:
        for line in f:
            event = json.loads(line.strip())
            yield event
            time.sleep(0.01)  # simulate arrival delay between events

def validate(event: Dict) -> bool:
    """Check that the event has the required fields and valid values."""
    required_fields = ["order_id", "customer_id", "order_value_gbp", "region"]
    if not all(field in event for field in required_fields):
        return False
    if event["order_value_gbp"] <= 0:
        return False
    return True

def enrich(event: Dict) -> Dict:
    """Add derived fields to the event before routing downstream."""
    event["processed_at"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    event["value_tier"] = (
        "high"   if event["order_value_gbp"] >= 500
        else "mid"    if event["order_value_gbp"] >= 100
        else "low"
    )
    return event

def run_streaming_pipeline(source_file: str) -> None:
    """Process each event as it arrives from the source."""
    processed = 0
    skipped = 0

    for raw_event in event_source(source_file):
        if not validate(raw_event):
            skipped += 1
            continue

        enriched_event = enrich(raw_event)

        # In production: publish to downstream topic or write to sink
        print(f"[{enriched_event['processed_at']}] "
              f"Order {enriched_event['order_id']} | "
              f"£{enriched_event['order_value_gbp']:.2f} | "
              f"tier={enriched_event['value_tier']}")
        processed += 1

    print(f"\nDone. Processed: {processed} | Skipped: {skipped}")

run_streaming_pipeline("order_events.jsonl")
```

::: info Here's what's happening:

- `event_source` is a generator function — note the `yield` keyword instead of `return`. Each call to `yield event` pauses the function and hands one event to the caller. The pipeline processes that event before the generator resumes and fetches the next one. This means only one event is in memory at a time, regardless of how large the stream is. The `time.sleep(0.01)` simulates the real-world delay between events arriving from a message queue.
- `validate` checks each event for required fields and valid values before doing anything else with it. In a streaming context, bad events are super common — network issues, upstream bugs, and schema changes all produce malformed records. Validating early and skipping invalid events is far safer than letting them propagate into downstream systems.
- `enrich` adds derived fields to the event. This can be a processing timestamp and a value tier classification. In production, this step might also join against a lookup table, call an external API, or apply a model prediction.
- `run_streaming_pipeline` ties it together. The `for` loop over `event_source` consumes events one at a time, processes each through the `validate → enrich → route` stages, and keeps a running count of processed and skipped events.

:::

### When Streaming Works Well

Streaming pipelines are the right choice when:

- **Data freshness is measured in seconds or milliseconds.** Fraud detection, real-time inventory updates, live dashboards, and alerting systems all require data to be processed immediately — a batch job running every hour would make them useless.
- **The data volume is too large to accumulate.** High-frequency IoT sensor data, clickstream events, and financial tick data can generate millions of records per hour. Accumulating all of that before processing is often impractical – you'd need enormous storage and the processing job would take too long to be useful.
- **You need to react, not just report.** Streaming pipelines can trigger downstream actions — send a notification, block a transaction, update a recommendation — in response to individual events. Batch pipelines can only report on what already happened.

---

## The Key Differences at a Glance

Here is an overview of the differences between batch and stream processing we've discussed thus far:

| **DIMENSION** | **BATCH** | **STREAMING** |
| --- | --- | --- |
| **Data model** | Bounded, finite dataset | Unbounded, continuous flow |
| **Processing trigger** | Schedule (time or event) | Arrival of each record |
| **Latency** | Minutes to hours | Milliseconds to seconds |
| **Throughput** | High (optimized for bulk processing) | Lower per-record overhead |
| **Complexity** | Lower | Higher |
| **State management** | Stateless per run | Often stateful across events |
| **Error handling** | Retry the whole job | Per-event dead-letter queues |
| **Consistency** | Strong (point-in-time snapshot) | Eventually consistent |
| **Best for** | Reporting, ML training, backfills | Alerting, real-time features, event routing |

---

## Choosing Between Batch and Streaming

Okay, all of this info is great. But *how* do you choose between batch and stream processing? The decision comes down to three questions:

### How fresh does the data need to be?

If stakeholders can tolerate results that are hours old, batch is simpler and more cost-effective. If they need results within seconds, streaming is unavoidable.

### How complex is your processing logic?

Batch jobs can join across large datasets, run expensive aggregations, and apply complex business logic without worrying about latency. Streaming pipelines must process each event quickly, which constrains how much work you can do per record.

### What's your operational capacity?

Streaming infrastructure — Kafka clusters, Flink or Spark Streaming jobs, dead-letter queues, exactly-once delivery guarantees — is significantly more complex to operate than a scheduled Python script. If your team is small or your use case doesn't demand real-time results, that complexity is cost without benefit.

Start with batch. It's simpler to build, simpler to test, simpler to debug, and simpler to maintain. Move to streaming when a specific, concrete requirement — not a hypothetical future one — makes batch insufficient. Most data problems are batch problems, and the ones that genuinely require streaming are usually obvious when you run into them.

And as you might have guessed, you may need to combine them for some data processing systems. Which is why hybrid approaches exist.

---

## The Hybrid Pattern: Lambda and Kappa Architectures

In practice, many production data systems use both patterns together. The two most common hybrid architectures are: Lambda and Kappa architecture.

[<VPIcon icon="iconfont icon-databricks"/>Lambda architecture](https://databricks.com/glossary/lambda-architecture) runs a batch layer and a streaming layer in parallel. The batch layer processes complete historical data and produces accurate, consistent results on a delay. The streaming layer processes live data and produces approximate results immediately. Downstream consumers merge both outputs — using the streaming result for freshness and the batch result for correctness.

The tradeoff is operational complexity: you're maintaining two separate processing codebases that must produce semantically equivalent results.

[<VPIcon icon="fas fa-globe"/>Kappa architecture](https://hazelcast.com/glossary/kappa-architecture/) simplifies this by using only a streaming layer, but with the ability to replay historical data through the same pipeline when you need batch-style reprocessing. This works well when your streaming framework like [<VPIcon icon="iconfont icon-kafka"/>Apache Kafka](https://kafka.apache.org/documentation/) and [<VPIcon icon="iconfont icon-apacheflink"/>Apache Flink](https://flink.apache.org/) supports log retention and replay. You get one codebase, one set of logic, and the ability to reprocess history when your pipeline changes.

Neither architecture is universally better. Lambda is more common in organizations that adopted batch processing first and added streaming incrementally. Kappa is more common in systems designed with streaming as the primary pattern.

---

## Conclusion

Batch and streaming are tools with different tradeoffs, each suited to a different class of problems. Batch pipelines excel at consistency, simplicity, and bulk throughput. Streaming pipelines excel at latency, reactivity, and continuous processing.

Understanding both patterns at the architectural level — before reaching for specific frameworks like Apache Spark, Kafka, or Flink — gives you the judgment to choose the right one and explain that choice clearly. The frameworks implement these patterns, while the judgment about which pattern fits your problem is yours to make first.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Efficient Data Processing in Python: Batch vs Streaming Pipelines Explained",
  "desc": "Every data pipeline makes a fundamental choice before any code is written: does it process data in chunks on a schedule, or does it process data continuously as it arrives? This choice — batch versus ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/efficient-data-processing-in-python-batch-vs-streaming-pipelines.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
