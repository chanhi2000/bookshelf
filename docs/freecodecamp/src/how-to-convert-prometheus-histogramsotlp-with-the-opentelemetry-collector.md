---
lang: en-US
title: "How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector"
description: "Article(s) > How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector"
icon: iconfont icon-opentelemetry
category:
  - Python
  - FastAPI
  - DevOps
  - Docker
  - OpenTelemetry
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - devops
  - docker
  - opentelemetry
  - open-telemetry
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector"
    - property: og:description
      content: "How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-prometheus-histogramsotlp-with-the-opentelemetry-collector.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-08-22
isOriginal: false
author:
  - name: Purity Udeh
    url: https://freecodecamp.org/news/author/TheOnlyPurity/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3dccb28f-d024-4c7a-9ac7-353594572842.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenTelemetry > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/opentelemetry/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector"
  desc="Modern applications often expose metrics at a /metrics endpoint using the Prometheus format. Among these metrics, histograms are particularly useful. They show how often values fall into different ran"
  url="https://freecodecamp.org/news/how-to-convert-prometheus-histogramsotlp-with-the-opentelemetry-collector"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3dccb28f-d024-4c7a-9ac7-353594572842.png"/>

Modern applications often expose metrics at a `/metrics` endpoint using the Prometheus format.

Among these metrics, histograms are particularly useful. They show how often values fall into different ranges, like HTTP request durations, database query times, or queue processing latencies.

Unlike simple averages, histograms show the full picture: you can see how many requests are fast, how many are slow, and where the occasional outliers occur that might be silently degrading the user experience.

In payment systems, for instance, a sudden spike in transactions can expose hidden bottlenecks. Most of the requests might complete quickly, but a small percentage of slow transactions can ripple through the system, impacting retries, failures, and overall throughput. Histograms help identify these issues early by showing how values are distributed and highlighting outliers that averages obscure.

But not all backends understand Prometheus metrics natively. Many modern observability platforms prefer **OTLP (OpenTelemetry Protocol)**. Forwarding Prometheus metrics without converting them can lead to incomplete or misinterpreted data. That’s why we need a pipline to scrape, transform, and export histograms into OTLP so that your observability pipeline remains consistent and actionable.

In this article, we'll use the OpenTelemetry Collector to scrape Prometheus histograms from application `/metrics` endpoints, map them to the OpenTelemetry Histogram data model, and export them to our observability backend using OTLP. The Collector acts as a bridge that preserves data fidelity while ensuring compatibility with your monitoring platform.

To make this concrete, we'll use a small FastAPI application that simulates payment transactions. It exposes two Prometheus metrics: `payment_transaction_duration_seconds` (a histogram tracking how long each transaction takes) and `payment_transactions_total` (a counter of completed transactions). You can follow along with your own instrumented application, as anything exposing Prometheus metrics at `/metrics` will work the same way. This is the metric we'll follow from the application all the way to the observability backend.

::: note Prerequisites

Before you begin, make sure you have:

- Docker installed
- An application exposing Prometheus metrics through a `/metrics` endpoint
- An OTLP-compatible observability backend
- Basic knowledge of Prometheus metrics
- Basic knowledge of YAML
- Basic familiarity with Docker and OpenTelemetry

You don't need advanced OpenTelemetry knowledge to follow this tutorial. I'll walk through the Prometheus histogram and show what happens to it as it moves through the OpenTelemetry Collector.

:::

---

## 1. How to Scrape Metrics with Prometheus Receiver

First, we'll collect metrics from the application. The demo application exposes its Prometheus metrics at the `/metrics` endpoint, and the Prometheus receiver periodically scrapes this endpoint and ingests the metrics into the observability pipeline. You can also inspect `/metrics` directly to see the data before the Collector reads it.

Configuration setup example:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: payment-demo
          scrape_interval: 15s
          static_configs:
            - targets: ["payment-api:8080"]
```

![FastAPI /metrics output showing the payment transaction duration histogram in Prometheus format](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/5e891138-0408-41ee-9ae9-a68ac056aa81.png)

What's happening behind the scenes here:

`scrape_interval` controls how often the Collector scrapes the target. Here, we're using 15 seconds; adjust it based on how frequently you need metric updates and the load your application can handle.

In high-throughput systems like payment platforms or real-time processing services, the scrape interval becomes particularly important. Setting it too long may cause you to miss short-lived performance issues or transient errors, while setting it too short risks overwhelming the service with scraping requests or generating excessive network traffic.

`targets` lists the specific endpoints that expose Prometheus metrics. You can add multiple targets when you need to scrape more than one service.

Finally, `job_name` is an identifier that helps group metrics logically, making them easier to manage and analyze once they reach your backend.

![Diagram showing an OpenTelemetry Collector discovering metrics targets, assigning targets, querying endpoints, and scraping metrics.](https://cdn.hashnode.com/res/hashnode/image/upload/v1770317251340/2853e8ee-b3d9-49c4-b931-3194eb2ea7d2.png)
<!-- TODO: mermaid화 -->

---

## 2. Transforming Prometheus Histograms

Once the metrics are scraped, the next step is transformation. Prometheus exposes histograms as multiple time series:

- `_bucket` shows how many requests fall below a certain duration.
- `_sum` is the total of all observed durations.
- `_count` is the number of observations.

The `payment_transaction_duration_seconds` histogram records how long each payment transaction takes. Prometheus exposes it as `_bucket`, `_count`, and `_sum` series. When the Prometheus receiver collects these metrics, it converts them into the OpenTelemetry Histogram data model, which can then be exported through OTLP while preserving the information needed to analyze transaction latency and calculate percentiles.

Without histograms, averages obscure latency distributions. If most requests complete in 50ms but 5% take 2+ seconds, the average of 150ms masks that serious performance issue. Histograms capture the complete picture by recording how many observations fall into each latency bucket.

Keeping the distribution allows you to identify changes in latency and investigate issues such as slow database queries, overloaded services, or delays from downstream dependencies.

### Actual Prometheus Histogram

This is how your actual `/metrics` output would look, for example:

![Prometheus /metrics output showing the payment transaction duration histogram as _bucket time series with different latency boundaries](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/8d1e4857-7d39-4cb1-99f7-5ce184adb59c.png)

And here's the actual OpenTelemetry Histogram representation:

![OpenTelemetry Collector output showing the payment_transaction_duration_seconds metric as a Histogram with bucket boundaries and counts.](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/ef856e3e-99d5-42af-9f39-3eb88d752505.png)

The output above shows the same transaction-duration data represented as an OpenTelemetry Histogram. Instead of three separate Prometheus series, the Collector now has one histogram containing the count, sum, explicit bucket boundaries, and bucket counts.

---

## 3. Exporting Metrics via OTLP

Once the metrics have been scraped and processed, the Collector sends them to your observability backend using OTLP. The OTLP exporter sends the processed metrics, including histograms, counters, and gauges, to the backend.

```yaml
exporters:
  otlp:
    endpoint: "otlp.backend.example.com:4317"
    tls:
      insecure: false
```

`endpoint` specifies the backend address for receiving OTLP metrics. This typically points to a central observability platform that aggregates metrics from multiple services across your infrastructure.

`tls` ensures secure data transmission between the collector and your backend. Set `insecure: true` only when intentionally connecting to an endpoint that does not use TLS, such as some local development setups

---

## 4. Putting the Pipeline Together

We've looked at each part of the pipeline individually. Now let's connect them and follow a metric from the application all the way to the backend.

```yaml
service:
  pipelines:
    metrics:
      receivers: [prometheus]
      exporters: [otlp]
```

This is the complete path our `payment_transaction_duration_seconds` metric follows, from the FastAPI application to the observability backend. The diagram above shows this flow. The next section walks through actually running it and connecting to SigNoz

![Pipeline flow architecture](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/ba4d6362-0e7a-4194-ba89-6fb3b4687489.png)

The above architecture diagram shows a FastAPI application exposing metrics through /metrics, the OpenTelemetry Collector scraping them with the Prometheus receiver, processing the metrics, and exporting them through OTLP to an observability backend.

---

## 5. Running the OpenTelemetry Collector

We'll run the complete pipeline and verify that the transaction metrics make it from the application to SigNoz. Follow these steps (which I'll walk you through in detail below):

1. **Set up SigNoz Cloud:** Configure the endpoint and ingestion key that the Collector will use.
2. **Start the FastAPI application:** The application exposes the Prometheus metrics at `/metrics`.
3. **Start the OpenTelemetry Collector:** The Collector begins scraping the application's `/metrics` endpoint using the Prometheus receiver.
4. **Generate test transactions:** Send requests to the application to create transaction-duration measurements.
5. **Verify the Collector and backend:** Check the Collector logs to confirm that the pipeline is running, then open SigNoz and verify that the `payment_transaction_duration_seconds` metric has arrived.
6. Troubleshooting

### 5.1 Set Up SigNoz Cloud

SigNoz provides the observability backend that will receive the metrics exported by the OpenTelemetry Collector. For this demo, we'll use SigNoz Cloud as the observability backend, so there's nothing to install locally.

First, sign up for a free account at [<VPIcon icon="fas fa-globe"/>signoz.io](http://signoz.io). In the SigNoz Cloud dashboard, go to **Settings → Ingestion Keys**. The page shows your Ingestion URL, Region, and Ingestion Key.

Add these to a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in your project directory:

```sh title=".env"
SIGNOZ_INGESTION_KEY=your-real-key
SIGNOZ_OTLP_ENDPOINT=ingest.<your-region>.signoz.cloud:443
```

Treat the ingestion key like a password and never commit it or share it publicly.

Reference those variables in your Collector configuration:

```yaml
exporters:
  otlp:
    endpoint: "${SIGNOZ_OTLP_ENDPOINT}"
    tls:
      insecure: false
    headers:
      signoz-ingestion-key: "${SIGNOZ_INGESTION_KEY}"
```

Then add <VPIcon icon="iconfont icon-dotenv"/>`.env` to your <VPIcon icon="iconfont icon-git"/>`.gitignore` so the key never gets committed:

```sh
echo ".env" >> .gitignore
```

### 5.2 Start the FastAPI Application.

Start the application on port 8080:

```sh
uvicorn app.main:app --reload --port 8080
```

Verify that the application is running:

```sh
curl http://localhost:8080/
```

![FastAPI payment demo running locally at 127.0.0.1:8080, displaying a JSON response confirming that the payment transaction demo is running](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/b27bcf94-e5da-43e6-b51f-f17fe06d90d9.png)

Now inspect the Prometheus metrics:

```sh
curl -Ls http://localhost:8080/metrics
```

![Browser showing the FastAPI payment demo running successfully at localhost:8080](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/10c4e1d5-d117-419d-8557-f94884f0bad8.png)

The `/metrics` endpoint exposes the application's Prometheus metrics, including the `payment_transaction_duration_seconds` histogram that the Collector will scrape.

### 5.3 Start the Collector

With the application running and the Collector configuration in place, start the Collector:

```sh
docker compose up --build
```

![Docker Compose logs showing the payment API running and the Collector successfully scraping its /metrics endpoint.](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/3ef283ca-bea7-4fd3-82b5-9684c3b5dea9.png)

Check the Collector logs to confirm that the pipeline is running and that metrics are being processed.

This builds the `payment-api` image, starts both containers on the shared `telemetry` network, and the Collector immediately begins scraping `/metrics` from the application using the Prometheus receiver, reading your SigNoz ingestion key and endpoint from <VPIcon icon="iconfont icon-dotenv"/>`.env` automatically.

### 5.4 Generate Test Transactions

Generate transactions with different processing times:

```sh
curl -X POST "http://localhost:8080/transactions?delay_ms=50"
curl -X POST "http://localhost:8080/transactions?delay_ms=250"
curl -X POST "http://localhost:8080/transactions?delay_ms=2500"
```

Generate additional requests if you want more observations in the histogram.

These requests create transaction-duration observations that are recorded by the `payment_transaction_duration_seconds` histogram. The Collector picks up the updated metric during its next scrape.

### 5.5 Confirm Backend Receipt

Open SigNoz Cloud and search for:

```plaintext
payment_transaction_duration_seconds
```

The metric should be represented as a **histogram**, with its bucket distribution `_bucket`, `_sum`, and `_count` available to the backend rather than appearing as unrelated Prometheus series.

![SigNoz Metrics Explorer showing payment_transaction_duration_seconds as a histogram with associated bucket, count, and sum data after being exported through the OpenTelemetry Collector.](https://cdn.hashnode.com/uploads/covers/611e0999c4783a33f5e25171/e4ea5b60-b7d4-4435-a427-d738e45ad19b.png)

### 5.6 Troubleshooting

If metrics aren't flowing correctly, start by checking the log:

```sh
docker logs <collector-container>
```

Look for connection errors, authentication failures, failed scrape attempts, or configuration errors.

Also verify that:

- The FastAPI application is running.
- `/metrics` is accessible.
- The Collector can reach the application.
- The SigNoz endpoint and ingestion key are correct.
- The <VPIcon icon="iconfont icon-dotenv"/>`.env` variables are available to the Collector.
- The receiver and exporter names match the pipeline configuration.

Use the `--dry-run` flag if available to validate before deployment.

---

## Conclusion

Prometheus histograms provide a useful view of transaction latency by showing how observations are distributed across different buckets rather than reducing them to a single average.

In this tutorial, we followed `payment_transaction_duration_seconds` from a FastAPI application's `/metrics` endpoint through the OpenTelemetry Collector and into SigNoz.

The Prometheus receiver mapped the `_bucket`, `_count`, and `_sum` series into the OpenTelemetry Histogram data model, preserving the distribution of transaction durations for analysis in the backend.

This allows the same metric to move from a Prometheus-instrumented application into an OTLP-based observability platform without manually reconstructing the histogram.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Convert Prometheus Histograms to OTLP with the OpenTelemetry Collector",
  "desc": "Modern applications often expose metrics at a /metrics endpoint using the Prometheus format. Among these metrics, histograms are particularly useful. They show how often values fall into different ran",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-prometheus-histogramsotlp-with-the-opentelemetry-collector.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
