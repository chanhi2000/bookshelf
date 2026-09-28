---
lang: en-US
title: "TimescaleDB Course – PostgreSQL for Time-Series Data"
description: "Article(s) > TimescaleDB Course – PostgreSQL for Time-Series Data"
icon: iconfont icon-postgresql
category:
  - Python
  - Data Science
  - PostgreSQL
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - data-science
  - sql
  - postgres
  - postgresql
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > TimescaleDB Course – PostgreSQL for Time-Series Data"
    - property: og:description
      content: "TimescaleDB Course – PostgreSQL for Time-Series Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/timescaledb-course-postgresql-for-time-series-data.html
prev: /data-science/postgresql/articles/README.md
date: 2026-09-24
isOriginal: false
author:
  - name: Beau Carnes
    url: https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/7f80f393-8745-47c8-b5ad-03cceb530a1f.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="TimescaleDB Course – PostgreSQL for Time-Series Data"
  desc="Managing massive, rapidly growing datasets efficiently is a critical skill for modern developers. Whether you are tracking API request logs, monitoring IoT fleet telemetry, or building dashboards for "
  url="https://freecodecamp.org/news/timescaledb-course-postgresql-for-time-series-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/7f80f393-8745-47c8-b5ad-03cceb530a1f.jpg"/>

Managing massive, rapidly growing datasets efficiently is a critical skill for modern developers. Whether you are tracking API request logs, monitoring IoT fleet telemetry, or building dashboards for AI agents, unoptimized time-series data can quickly slow standard PostgreSQL queries to a crawl. We just posted a new course on the freeCodeCamp.org YouTube channel that will teach you all about TimescaleDB

You'll get hands-on experience with TimescaleDB in this course, discovering how to upgrade PostgreSQL into an optimized time-series database. You will learn to optimize query speeds, drastically reduce storage footprints, and ensure your dashboards stay fast at scale.

Key concepts and hands-on projects include:

- **Hypertables & Chunk Management**<br/>Learn how TimescaleDB automatically partitions your data by time to speed up queries and streamline data retention without painful row deletions.
- **Columnar Storage & Compression**<br/>Discover how converting older row data into column-oriented batches can shrink your database size by over 90% and massively speed up analytical queries.
- **Continuous Aggregates**<br/>Stop recalculating identical data! You'll build incremental, automatically updating materialized views (and aggregate "ladders") that keep dashboards returning results in milliseconds.
- **Hyperfunctions & Gap Filling**<br/>Master specialized time-series functions for calculating percentiles, distinct counts, handling counter resets, and smoothing out data gaps for clean frontend charting.
- **Data Tiering & Vector Search**<br/>Explore moving older, cold data out of expensive local SSDs into cheaper S3 object storage seamlessly, and see how to combine standard time-series queries with AI vector search.

The course walks you through building two complete, production-ready projects from scratch:

1. **An AI Agent Flight Recorder**<br/>Track millions of language model inferences, tool calls, costs, and latencies locally in Docker.
2. **An EV Charger Fleet Telemetry System**<br/>Monitor 2,000 devices reporting every 10 seconds, deployed directly on the fully-managed Tiger Cloud platform.

Watch the full TimescaleDB Course on [<VPIcon icon="fa-brands fa-youtube"/>the freeCodeCamp.org YouTube channel](https://youtu.be/gYTA8nQN030) (4-hour watch).

<VidStack src="youtube/gYTA8nQN030" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "TimescaleDB Course – PostgreSQL for Time-Series Data",
  "desc": "Managing massive, rapidly growing datasets efficiently is a critical skill for modern developers. Whether you are tracking API request logs, monitoring IoT fleet telemetry, or building dashboards for ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/timescaledb-course-postgresql-for-time-series-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
