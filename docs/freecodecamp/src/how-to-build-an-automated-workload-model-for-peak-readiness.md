---
lang: en-US
title: "How to Build an Automated Workload Model for Peak Readiness"
description: "Article(s) > How to Build an Automated Workload Model for Peak Readiness"
icon: iconfont icon-newrelic
category:
  - Java
  - Spring
  - DevOps
  - New Relic
  - Dynatrace
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - spring
  - java-spring
  - springframework
  - devops
  - newrelic
  - new-relic
  - nsql
  - dynatrace
  - usql
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Automated Workload Model for Peak Readiness"
    - property: og:description
      content: "How to Build an Automated Workload Model for Peak Readiness"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-automated-workload-model-for-peak-readiness.html
prev: /devops/new-relic/articles/README.md
date: 2026-07-28
isOriginal: false
author:
  - name: Vasuki Uday Kiran Vudathala
    url: https://freecodecamp.org/news/author/vvukiran/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/470df979-1d14-4fee-9886-edacfe01c1e4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "New Relic > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/newrelic/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Dynatrace > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/dynatrace/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Automated Workload Model for Peak Readiness"
  desc="If you’ve ever spent two days pulling data out of an APM tool just to answer “how many virtual users should I run in my load test?”, this tutorial is for you. By the end, you’ll know how to derive eve"
  url="https://freecodecamp.org/news/how-to-build-an-automated-workload-model-for-peak-readiness"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/470df979-1d14-4fee-9886-edacfe01c1e4.png"/>

If you’ve ever spent two days pulling data out of an APM tool just to answer “how many virtual users should I run in my load test?”, this tutorial is for you.

By the end, you’ll know how to derive every number in your workload model directly from production telemetry, in under five minutes, with nothing left to estimate.

::: info Our Use Case:

Every year, a few weeks before Black Friday, performance engineers and SREs face the same problem: someone needs a workload model for the peak-season load test, and the clock is ticking.

The usual approach is to log into your APM tool, export CSVs, pivot data in spreadsheets, and make educated guesses about user flows. It takes days, involves multiple people, and the result is still frequently wrong.

:::

This tutorial walks you through an automated methodology that replaces that entire process with direct observability queries. I’ll show you every step using New Relic (NRQL) and Dynatrace (USQL), but the approach works on any APM platform that exposes session and transaction data.

I’ve also built a Java Spring Boot tool called the Peak Workload Analyzer that runs all of these queries automatically if you want to skip straight to the output.

::: note  Prerequisites

Before following this tutorial, you'll need:

- A New Relic or Dynatrace account with Browser and/or APM instrumentation active on your application
- Java 11 or higher installed
- Maven 3.6 or higher installed
- A historical window of at least 30 days of production traffic covering a known peak period, for example, last year’s Black Friday

Two concepts appear throughout this tutorial and are worth understanding up front:

- **Requests per second (RPS):** the number of HTTP requests your application receives in a one-second window. This becomes your primary load test target.
- **Sessions:** a single user’s continuous visit to your application, from first page to last. The session count and duration are what the concurrent user formula is built on.

:::

---

## The Problem with Manual Workload Modeling

To understand the value of this approach, it helps to map out what a typical manual workload modeling exercise actually looks like:

| Manual Task | People Involved | Typical Time | Risk of Error |
| --- | --- | --- | --- |
| Log into APM tool, navigate to correct application, set date range, handle timezone issues | SRE / Perf Eng | 30–60 min | Medium. Wrong app or timezone |
| Manually scroll traffic graphs to visually identify the busiest day | SRE / Perf Eng | 45–90 min | High. Eyes miss true peak |
| Export hourly data to CSV, pivot in Excel to find the peak hour | Perf Engineer | 1–2 hrs | High. Export limits, pivot errors |
| Manually identify top transactions from APM transaction list | Perf Eng + Dev | 2–3 hrs | High. No percentage weighting |
| Interview developers and product owners to reconstruct user journey flows | Perf Eng + BA + Dev | 4–8 hrs | Very high. Opinion-based |
| Estimate concurrent users from session counts using manual spreadsheet formula | Perf Engineer | 1–2 hrs | High. Little's Law rarely applied |
| Set SLA thresholds based on SLA documents or team memory of past incidents | Perf Eng + Architect | 1–2 hrs | Medium. Docs often outdated |
| Write up the workload model document and get stakeholder sign-off | Perf Eng + Manager | 3–4 hrs | Medium. Revision cycles |
| **TOTAL** | **2–4 people** | **13–22 hours** | **Very high overall** |

That 13–22-hour estimate doesn't include back-and-forth review cycles, time waiting for APM access permissions, or the inevitable “we need to redo this because the date range was wrong” moment that nearly every team experiences.

In practice, most organizations spend the equivalent of a full sprint week building a workload model, and then discover during the load test itself that the scenario weights were still wrong.

Beyond the engineering hours, manual workload models carry direct business risk. A model that underestimates peak traffic leads to under-provisioning. A model based on wrong user journey assumptions wastes load test capacity on low-impact flows.

Both outcomes mean your Black Friday readiness is built on guesswork, and that risk doesn't show up until the worst possible moment.

---

## The Automated Approach: What Changes

The methodology in this document replaces every manual step above with a direct, reproducible observability query. Here's the same activity list rewritten for the automated approach:

| Automated Task | People Involved | Time Required | Accuracy |
| --- | --- | --- | --- |
| Peak Workload Analyzer: enter date range, select app name, click Run | Any engineer | 2 min setup | Exact. Data-driven |
| App automatically runs Peak Day query | Automated | Automated | Exact. From telemetry |
| App automatically runs Peak Hour and Peak Minute queries | Automated | Automated | Exact. Max of 1-minute buckets |
| App automatically runs scenario mix and funnel queries | Automated | Automated | Exact. Production distribution |
| App automatically applies session formula for VU counts | Automated | Automated | High. Mathematically derived |
| App automatically builds user journeys and outcome weights | Automated | Automated | Exact. From session data |
| Generates interactive HTML dashboard and exportable JSON report | Automated | Automated | High. Fully traceable |
| **TOTAL** | **1 person** | **< 5 minutes** | **High. Evidence-based** |

The Peak Workload Analyzer reduces that 13–22 person-hour exercise to under 5 minutes for a single engineer, a 99% reduction per peak readiness cycle, with a full analysis dashboard and JSON report generated automatically. There's no query writing, spreadsheets, or manual calculation.

In this article, section 1 introduces the Peak Workload Analyzer application. The remaining sections document the full technical implementation: the exact queries the application executes at each step, the formulas it applies, and the logic behind each decision.

This serves as both a technical reference for engineers who want to understand what the tool does under the hood, and as a standalone methodology guide for teams who prefer to run queries directly.

---

## 1. The Peak Workload Analyzer

The Peak Workload Analyzer is a Java Spring Boot application that implements the complete Automated Workload Model methodology in a single command.

It connects directly to New Relic or Dynatrace, runs all six query steps automatically, calculates concurrent users, identifies user journeys, and produces an interactive real-time dashboard with exportable JSON results, with no manual query writing required.

### 1.1 Quick Start

```sh
# 1. Build the project
mvn clean package

# 2. Start the web server
java -jar target/peak-workload-analyzer-1.0.0.jar

# 3. Open browser
open http://localhost:8080

# 4. Select provider tab: New Relic or Dynatrace
# 5. Enter API credentials
# 6. Select application and set date range
# 7. Click Run Analysis
```

### 1.2 What the Application Does Automatically

| Automated Step | Methodology Step | Output | Corresponds to Doc Section |
| --- | --- | --- | --- |
| Runs peak day query | Step 1 | Peak date | Section 3 |
| Runs peak hour query | Step 2 | Peak hour | Section 4 |
| Runs peak minute and derives RPS | Step 3 | Target RPS | Section 5 |
| Runs scenario mix and funnel queries | Step 4 | Percentage weights | Section 6 |
| Calculates concurrent users via session formula | Step 5 | VU count | Section 7 |
| Profiles active sessions and VU pool ceiling | Step 6 | VU pool | Section 8 |
| Generates interactive HTML dashboard and exportable JSON report | Output | HTML Dashboard and JSON | Section 9 |

### 1.3 Output Files

```sh title="file structure"
output/
├── peak-analysis-report.json    # All metrics in structured JSON
├── peak-analysis-report.html    # Interactive dashboard (12 widgets)
├── user-journeys.json           # Top user flows with % weights
└── logs/
    └── analysis.log
```

::: info GitHub Repository

[Peak Workload Analyzer (<VPIcon icon="iconfont icon-github"/>`vasukiudaykiranvudathala/peak-workload-analyzer`)](https://github.com/vasukiudaykiranvudathala/peak-workload-analyzer).

<SiteInfo
  name="vasukiudaykiranvudathala/peak-workload-analyzer"
  desc="Contribute to vasukiudaykiranvudathala/peak-workload-analyzer development by creating an account on GitHub."
  url="https://github.com/vasukiudaykiranvudathala/peak-workload-analyzer/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/40c29905985a7baf797abd7fa8087a578c902ce79cd72c5571f4e4a6a05cb624/vasukiudaykiranvudathala/peak-workload-analyzer"/>

You can clone it and follow along, or use it as a reference implementation.

:::

If you prefer to run queries directly rather than use the application, each section from Section 3 onwards documents exactly what the application executes, with annotations explaining the logic and expected output.

---

## 2. Methodology Overview

The Automated Workload Model follows a six-step drill-down pipeline. The user supplies a historical window and the queries progressively narrow to the exact worst-case scenario at each level of granularity.

The diagram below illustrates the six stages and their primary outputs.

![Flowchart showing the six-step automated workload model pipeline: Input (historical window) flows into Step 1 (Peak Day), Step 2 (Peak Hour), Step 3 (Peak Minute), Steps 4 to 6 (Mix and VUs), and finally Output (Workload Model). Below the pipeline, a callout box explains growth factor multipliers: 1.2x conservative, 1.3x moderate, 1.5x aggressive, and 2.0x stress ceiling, with the formula Target RPS equals Peak RPS times Growth times Safety Buffer 1.1.](https://cdn.hashnode.com/uploads/covers/69dc0874aadf1107e22fd84f/5c94d1d0-c0f2-464d-8155-1bcb650ee5fa.png)

::: note Six-step pipeline

Peak Day → Peak Hour → Peak Minute → Scenario Mix → Concurrent Users → Active Sessions. Each step feeds the next to derive load test parameters from production telemetry.

:::

### 2.1 Key Metrics at Each Stage

| Stage | Primary Metric | Secondary Metrics | Used For |
| --- | --- | --- | --- |
| **Peak Day** | Total requests per calendar day | Unique sessions, avg response time | Scoping all subsequent queries |
| **Peak Hour** | Requests per 1-hour bucket | P50/P95/P99 latency per hour | Load test duration window |
| **Peak Minute** | Max requests in any 60-second window | Peak RPS = count / 60 | Load test RPS target |
| **Scenario Mix** | % share of each transaction type | P95 per scenario, funnel drop-offs | Weighting load test scenarios |
| **Concurrency** | (Hourly Sessions × Avg Session Duration sec) / 3600 | Session duration, pages/session | VU count in load test engine |
| **Active Sessions** | uniqueCount(session) at peak minute | New vs returning split, bounce rate | Total VU pool size |

### 2.2 Growth Factor Application

Your production telemetry tells you what last year's peak looked like, but this year's peak will almost certainly be larger.

The growth factor is a multiplier you apply to last year's numbers to size your load test for expected growth, so you're testing against where traffic is heading, not where it has been.

Choose a multiplier based on your traffic trajectory:

- **1.2x:** Conservative — established platform, mature market
- **1.3x:** Moderate — active user acquisition, new markets
- **1.5x:** Aggressive — recent product launches, marketing campaigns
- **2.0x:** Stress ceiling — worst-case, infrastructure limit discovery

The full load test target formula is: Load Test Target RPS = Peak Minute RPS x Growth Factor x Safety Buffer (1.1)

The 1.1 safety buffer adds a 10% headroom above your growth-adjusted target, accounting for traffic spikes within the peak minute that averages won't capture.

---

## 3. Step 1 – Identify the Peak Day

This query aggregates total requests per calendar day across your historical window. The date with the highest throughput becomes the peak day and anchors all subsequent queries.

User Input: You'll need a start and end date covering your known peak season from the previous year. For example: November 15, 2025 to December 15, 2025.

### 3.1 New Relic – NRQL

New Relic stores your application's telemetry as event data you can query with NRQL, its SQL-like query language.

To find the peak day, you query across your full historical window and aggregate request counts by calendar day.

New Relic captures two relevant data sources: Browser data (PageView events, what real users experienced in their browsers) and APM data (Transaction events, what the server processed).

The two queries below check each source, since the busiest day from the user's perspective and the server's perspective should agree, and a mismatch is worth investigating.

#### 3.1.1 Browser PageViews per Day

```sql
-- Step 1a: Peak Day — Browser PageView data
-- Run in: New Relic One > Query your data > Query Builder
--
SELECT
  count(*) AS total_page_views,
  uniqueCount(session) AS unique_sessions,
  average(duration) AS avg_load_ms,
  percentile(duration, 95) AS p95_load_ms
FROM PageView
WHERE appName = 'your-app-name'
FACET dateOf(timestamp)
SINCE '2025-11-15 00:00:00'
UNTIL '2025-12-15 23:59:59'
LIMIT 60
-- Note: Omit ORDER BY — uniqueCount(session) prevents ORDER BY on PageView.
-- Click the total_page_views column header in Query Builder to sort descending.
```

#### 3.1.2 APM Transactions per Day

```sql
-- Step 1b: Peak Day — APM Transaction data (server-side / SPA)
--
SELECT
  count(*) AS apm_transactions,
  rate(count(*), 1 minute) AS avg_rpm,
  average(duration) AS avg_response_sec,
  percentile(duration, 95) AS p95_response_sec,
  filter(count(*), WHERE error IS TRUE) AS error_count
FROM Transaction
WHERE
  appName = 'your-app-name'
  AND transactionType = 'Web'
FACET dateOf(timestamp)
SINCE '2025-11-15 00:00:00'
UNTIL '2025-12-15 23:59:59'
LIMIT 60
```

### 3.2 Dynatrace - USQL

Dynatrace approaches the same problem from the session level. Its User Session Query Language (USQL) queries the usersession entity, where each row represents one complete user visit. Instead of counting individual requests, you aggregate sessions and their total user actions per day to find the busiest one.

The query below groups sessions by calendar day and orders by total action count, surfacing the peak day at the top.

```sql
-- Step 1 — Dynatrace USQL: Peak day from user sessions
--
SELECT
  DATE(startTime)          AS calendar_day,
  COUNT(*)                 AS session_count,
  SUM(userActionCount)     AS total_actions,
  AVG(duration)            AS avg_session_ms
FROM usersession
WHERE
  startTime > '2025-11-15T00:00:00'
  AND startTime < '2025-12-15T23:59:59'
  AND applicationType = 'BROWSER'
GROUP BY DATE(startTime)
ORDER BY total_actions DESC
```

The dashboard below shows the output of this query rendered by the Peak Workload Analyzer. The summary cards at the top confirm the identified peak day and its headline metrics, the bar chart shows request volume across the full 30-day window with the peak day highlighted, and the table ranks the top five days so you can see how clear the peak is relative to the surrounding days.

![Peak Workload Analyzer output identifying November 28, 2025 as the peak day with 152,840 requests and 28,410 unique sessions. Bar chart shows 30-day request volume with November 28 as the clear highest bar at 153K. Table lists top 5 days by request volume with response time and latency metrics.](https://cdn.hashnode.com/uploads/covers/69dc0874aadf1107e22fd84f/949ac5db-72e4-49b7-9c3a-9e6fe85498f3.png)

---

## 4. Step 2 – Drill into the Peak Hour

Scoped to the peak day, this query buckets traffic into 1-hour intervals. The busiest hour becomes your peak hour and sets the duration window for your load test.

### 4.1 New Relic – NRQL

Now that you know the peak day, this step narrows to the busiest hour within it. The queries below bucket the peak day's traffic into one-hour intervals using NRQL's TIMESERIES function, so you can see how load rose and fell across the day.

The first query works from server-side Transaction data, while the second uses BrowserInteraction events, which matter for single-page applications where most user activity happens without full page loads.

```sql
-- Step 2a: Peak Hour — server-side transaction volume
--
SELECT
  count(*) AS requests_per_hour,
  rate(count(*), 1 minute) AS avg_rpm_within_hour,
  average(duration) AS avg_response_sec,
  percentile(duration, 50, 95, 99) AS latency_pct
FROM Transaction
WHERE 1=1
AND appName = 'your-app-name'
AND transactionType = 'Web'
TIMESERIES 1 hour
SINCE '2025-11-28 00:00:00'
UNTIL '2025-11-28 23:59:59'
```

```sql
-- Step 2b: For SPA applications — BrowserInteraction is the key event type
--
SELECT
  count(*) AS interactions,
  uniqueCount(session) AS concurrent_sessions,
  average(duration) AS avg_interaction_ms,
  filter(count(*), WHERE category = 'Route change') AS navigations
FROM BrowserInteraction
WHERE 1=1
AND appName = 'your-app-name'
TIMESERIES 1 hour
SINCE '2025-11-28 00:00:00'
UNTIL '2025-11-28 23:59:59'
```

### 4.2 Dynatrace – USQL

The Dynatrace equivalent buckets sessions into hourly slots across the peak day and orders them by total user actions. The busiest slot is your peak hour.

Because USQL works at the session level, this also gives you session counts and P95 session duration per hour, which help confirm that the busiest hour by volume is also demanding in terms of user engagement.

```sql
-- Step 2 --- Dynatrace USQL: Peak Hour from user sessions
-- 
SELECT
  DATETIME(startTime, 'HH:00', 'yyyy-MM-dd HH:mm') AS peak_hour,
  COUNT(*) AS session_count,
  SUM(userActionCount) AS total_actions,
  AVG(duration) AS avg_session_ms,
  PERCENTILE(duration, 95) AS p95_session_ms
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T00:00:00'
AND startTime < '2025-11-28T23:59:59'
AND applicationType = 'BROWSER'
GROUP BY DATETIME(startTime, 'HH:00', 'yyyy-MM-dd HH:mm')
ORDER BY total_actions DESC
```

![Peak Workload Analyzer output identifying 11:00 to 12:00 as the peak hour with 29,640 requests, 4,280 active sessions, and 820ms P95 latency. Bar chart shows 24-hour request distribution with the 11:00 hour as the highest bar at 29,640. Table lists the top 5 hours ranked by request volume with active sessions and P50, P95, P99 latency metrics.](https://cdn.hashnode.com/uploads/covers/69dc0874aadf1107e22fd84f/fdee2f23-f120-4e25-9edf-321f27af337f.png)

---

## 5. Step 3 – Analyze the Peak Minute

Your infrastructure must handle the peak minute – the worst single 60-second window. This gives you your load test RPS target.

::: info Formula

$$
\text{Target\:RPS}=\frac{\text{Peak\:Minute\:Request\:Count}{60}
$$

:::

### 5.1 New Relic – NRQL

New Relic doesn't have a native 60-second bucket function, so you find the peak minute by running a TIMESERIES 1 minute query across the peak hour. This returns request counts for every minute in that hour, and the highest one is your peak minute. Dividing that count by 60 gives you the baseline RPS target for your load test.

```sql
-- Step 3a: Drill to Peak Minute within the peak hour
-- Replace 11:00:00 / 11:59:59 with your actual peak hour
--
SELECT
  count(*) AS requests_per_minute,
  uniqueCount(session) AS active_sessions_per_min,
  rate(count(*), 1 second) AS rps,
  percentile(duration, 95) AS p95_latency
FROM Transaction
WHERE 1=1
AND appName = 'your-app-name'
AND transactionType = 'Web'
TIMESERIES 1 minute
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

```sql
-- Step 3b: Get the max 1-minute request count
-- peak_rps is your load test baseline target (before growth multiplier)

SELECT
  max(count(*)) AS peak_minute_requests,
  max(rate(count(*), 1 second)) AS peak_rps
FROM Transaction
WHERE 1=1
AND appName = 'your-app-name'
AND transactionType = 'Web'
TIMESERIES 1 minute
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

::: important Key Output from Step 3

You now have your Peak RPS target. Example: peak minute = 4,800 requests, so baseline = 80 RPS. With 1.3x growth and 1.1x safety buffer: 80 × 1.3 × 1.1 = **114 RPS ceiling** for your load test.

:::

### 5.2 Dynatrace – USQL

Dynatrace reaches the same result by grouping sessions into minute-level buckets across the peak hour and ordering by volume. The busiest minute sits at the top. Since USQL works at the session level, the count reflects sessions started in that minute, which you then convert to an RPS target the same way.

```sql
-- Step 3a: Peak Minute: session counts per minute within peak hour
-- Buckets sessions into 1-minute slots --- highest bucket = peak minute

SELECT
  DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm') AS peak_minute,
  COUNT(*) AS session_count,
  SUM(userActionCount) AS total_actions,
  AVG(duration) AS avg_session_ms,
  PERCENTILE(duration, 95) AS p95_session_ms
FROM usersession
WHERE
  startTime > '2025-11-28T11:00:00'
  AND startTime < '2025-11-28T11:59:59'
  AND applicationType = 'BROWSER'
GROUP BY DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm')
ORDER BY session_count DESC

-- The top row = your peak minute.
-- session_count is not request count --- see Step 3b below for RPS derivation.
```

```sql
-- Step 3b: Derive RPS from concurrent users in peak minute
--
-- USQL works at session level, not request level.
-- RPS is derived using the concurrent user formula applied per minute:
-- Concurrent Users = (sessions_in_minute x avg_duration_sec) / 60
-- RPS estimate = concurrent_users / avg_response_time_sec
--
-- For accurate request-level RPS use Dynatrace Service metrics in the UI:
-- Observe > Services > [your service] > Metrics > Request count, 1m resolution

SELECT
  DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm') AS peak_minute,
  COUNT(*) AS session_count,
  AVG(duration) / 1000 AS avg_duration_sec,
  (COUNT(*) * (AVG(duration) / 1000)) / 60 AS concurrent_users_in_minute,
  COUNT(*) / 60 AS sessions_per_second
FROM usersession
WHERE
  startTime > '2025-11-28T11:00:00'
  AND startTime < '2025-11-28T11:59:59'
  AND applicationType = 'BROWSER'
GROUP BY DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm')
ORDER BY session_count DESC
LIMIT 1
--
-- LIMIT 1 returns only the peak minute row.
-- concurrent_users_in_minute is your VU count for that 60-second window.
-- sessions_per_second is a session arrival rate (not HTTP RPS).
```

![Peak Workload Analyzer output identifying 11:23 as the peak minute with 4,920 requests, giving a baseline of 82 RPS, a 107 RPS growth-adjusted target, and a 114 RPS safety target. Bar chart shows 60-minute request volume with the 11:23 minute as the highest bar. A callout box shows the RPS derivation: 4,920 requests divided by 60 equals 82 baseline RPS, then 1.3x growth plus 1.1x safety buffer gives a 114 RPS load test ceiling. Table lists the top 5 peak minutes ranked by request count.](https://cdn.hashnode.com/uploads/covers/69dc0874aadf1107e22fd84f/2e61be8a-7047-4c37-a4cd-e3d692ebfc7f.png)

---

## 6. Step 4 – Build the Scenario Mix

Query the actual distribution of URLs and transactions during the peak hour. This produces evidence-based scenario weights, not estimates.

### 6.1 New Relic – NRQL

This step queries what your users actually did during the peak hour, so your scenario weights come from real traffic instead of guesswork.

New Relic gives you three angles on this. The first query ranks transactions by volume to show which server-side operations dominate. The second ranks the URLs users actually visited, which is the browser-side view. The third runs a funnel to show how sessions moved through key steps and where they dropped off. Together these tell you which scenarios to include in your load test and how heavily to weight each one.

```sql
-- Step 4a: Scenario mix --- APM transaction distribution
--
SELECT
  count(*) AS hit_count,
  percentage(count(*), WHERE name IS NOT NULL) AS pct_of_total,
  average(duration) AS avg_ms,
  percentile(duration, 95) AS p95_ms
FROM Transaction
WHERE 1=1
AND appName = 'your-app-name'
AND transactionType = 'Web'
FACET name
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
LIMIT 20
ORDER BY hit_count DESC
```

```sql
-- Step 4b: Browser perspective --- top routes visited by users
--
SELECT
  count(*) AS views,
  uniqueCount(session) AS unique_sessions,
  average(duration) AS avg_load_ms
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
AND pageUrl NOT LIKE '%/static/%'
AND pageUrl NOT LIKE '%/api/%'
FACET pageUrl
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
LIMIT 20

-- Note: ORDER BY views DESC omitted --- uniqueCount(session) prevents it.
-- Click the views column header in Query Builder to sort descending.
```

```sql
-- Step 4c: Funnel analysis --- user journey drop-off at each stage

SELECT
  funnel(session,
    WHERE pageUrl LIKE '%/' AS 'Homepage',
    WHERE pageUrl LIKE '%/category/%' AS 'Category Browse',
    WHERE pageUrl LIKE '%/search%' AS 'Search',
    WHERE pageUrl LIKE '%/product/%' AS 'Product Detail',
    WHERE pageUrl LIKE '%/cart%' AS 'Cart',
    WHERE pageUrl LIKE '%/checkout%' AS 'Checkout',
    WHERE pageUrl LIKE '%/confirmation%' AS 'Order Confirm'
  ) AS checkout_funnel
FROM PageView
WHERE appName = 'your-app-name'
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

### 6.2 Dynatrace – USQL

The Dynatrace version gets the scenario mix from user actions rather than page URLs. It groups the peak hour's activity by action name and ranks by frequency, so the most common user actions surface at the top. These frequencies become your scenario weights, the same way the New Relic transaction and URL counts do.

```sql
-- Top user action names during peak hour --- Dynatrace USQL
--
SELECT
  userActionName,
  COUNT(*) AS action_count,
  AVG(duration) AS avg_duration_ms,
  PERCENTILE(duration, 95) AS p95_ms
FROM useraction
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
GROUP BY userActionName
ORDER BY action_count DESC
LIMIT 20
```

### 6.3 Sample Scenario Mix Output

Here's what a completed scenario mix looks like once the queries above are combined. Each row is a user flow, with its share of total traffic, the resulting RPS target, average and P95 response times. These percentages become the scenario weights in your load test, and the RPS column tells you how much load to send through each one.

| Scenario / User Flow | Hit Count | % Load | Target RPS | Avg (ms) | P95 SLA |
| --- | --- | --- | --- | --- | --- |
| Homepage → Browse Category | 42,840 | 28% | 23.0 | 320 | < 800ms |
| Search → Product Listing | 35,200 | 23% | 18.9 | 450 | < 1,200ms |
| Product Detail Page (PDP) | 29,600 | 19% | 15.6 | 280 | < 700ms |
| Add to Cart | 18,400 | 12% | 9.8 | 190 | < 500ms |
| Cart → Checkout Start | 12,800 | 8% | 6.6 | 520 | < 1,500ms |
| Checkout → Payment | 8,760 | 6% | 4.9 | 1,200 | < 3,500ms |
| Order Confirmation | 4,980 | 4% | 3.3 | 240 | < 600ms |

---

## 7. Step 5 – Concurrent Users

Concurrent users are the number of users actively present on the system within a given time window. When working from session-level data, which is the most reliable source from New Relic Browser or Dynatrace RUM, the correct formula is:

$$
\text{Concurrent\:Users}=\frac{\left(\text{Hourly\:Sessions}\times\text{Avg\:Session\:Duration\:in\:seconds}\right)}{3600}
$$

This formula derives from the definition of concurrency: if a session lasts D seconds and there are S sessions arriving per hour, then at any moment the expected number of overlapping sessions is (S × D) / 3600. The divisor 3600 converts the hourly session count into a per-second arrival rate.

::: tip Example

4,280 sessions in the peak hour × 444 seconds avg duration / 3600 = **529 concurrent users** at any given second. Apply growth factor: 529 × 1.3 = **688 VUs**.

:::

::: important Why not RPS x avg response time?

The RPS x avg response time formula (Little’s Law at transaction level) calculates how many requests are in-flight simultaneously, which is useful for server thread pool sizing. The session-level formula above is more appropriate for sizing Virtual Users in a load test, because VUs represent whole users navigating through a journey, not individual HTTP requests.

:::

Ultimately, it's a good idea to use both: transaction concurrency for infrastructure sizing and session concurrency for VU count.

### 7.1 New Relic – NRQL

This step turns session data into the Virtual User counts your load test engine actually needs.

New Relic gives you two views. The first query applies the concurrency formula per journey outcome, so you can see how many VUs each scenario (converted, cart abandon, bounce, and so on) requires. The second runs the formula across the whole peak hour to produce a single total, which is a useful sanity check against the VU pool ceiling you calculate in the next step.

```sql
-- Step 5a: Concurrent Users = (Hourly Sessions x Avg Session Duration in sec) / 3600
-- FACET by journey_outcome (NOT by session --- that would give 1 row per session)
-- uniqueCount(session) counts distinct sessions within each outcome bucket
--
SELECT
  uniqueCount(session) AS hourly_sessions,
  average(sessionDuration) AS avg_session_duration_sec,
  (uniqueCount(session) * average(sessionDuration)) / 3600 AS concurrent_users
FROM PageView
WHERE appName = 'your-app-name'
FACET
  CASE
    WHEN latest(pageUrl) LIKE '%/confirmation%' THEN 'converted'
    WHEN latest(pageUrl) LIKE '%/payment%' THEN 'payment_drop'
    WHEN latest(pageUrl) LIKE '%/checkout%' THEN 'checkout_drop'
    WHEN latest(pageUrl) LIKE '%/cart%' THEN 'cart_abandon'
    WHEN latest(pageUrl) LIKE '%/product/%' THEN 'browse_exit'
    ELSE 'early_exit'
  END AS journey_outcome
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

```sql
-- Step 5b: Total concurrent users across entire peak hour
-- Formula: (total sessions x avg session duration seconds) / 3600

SELECT
  uniqueCount(session) AS hourly_sessions,
  average(sessionDuration) AS avg_session_duration_sec,
  (uniqueCount(session) * average(sessionDuration)) / 3600 AS concurrent_users_formula,
  uniqueCount(session) / 60 AS sessions_per_minute
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
--
-- Example output:
-- hourly_sessions = 4,280
-- avg_session_duration_sec = 444
-- concurrent_users_formula = (4280 x 444) / 3600 = 528.2 -> round to 529
-- Apply 1.3x growth: 529 x 1.3 = 688 VUs
```

### 7.2 Dynatrace – USQL

The Dynatrace version applies the identical formula, with one difference to watch: the duration field is in milliseconds, so it's divided by 1000 to get seconds before the calculation. The query returns the concurrent user count across the peak hour, which converts directly into your VU pool size.

```sql
-- Concurrent Users = (Hourly Sessions x Avg Session Duration in seconds) / 3600
-- Dynatrace duration field is already in milliseconds --- divide by 1000
--
SELECT
  COUNT(*) AS hourly_sessions,
  AVG(duration) / 1000 AS avg_session_duration_sec,
  (COUNT(*) * AVG(duration) / 1000) / 3600 AS concurrent_users
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
```

```sql
-- Per outcome segment (maps to load test scenario VU split):

SELECT
  COUNT(*) AS hourly_sessions,
  AVG(duration) / 1000 AS avg_session_duration_sec,
  (COUNT(*) * AVG(duration) / 1000) / 3600 AS concurrent_users
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
GROUP BY
  CASE WHEN userActions.name[userActionCount - 1] LIKE '%confirmation%' THEN 'converted'
       WHEN userActions.name[userActionCount - 1] LIKE '%cart%' THEN 'cart_abandon'
       ELSE 'other' END
```

---

## 8. Step 6 – Active Sessions and Total VU Pool

The distinct session count during the peak hour represents the total session population observed in that window. It can be used as an upper allocation bound for the Virtual User pool, while the concurrency calculation from Step 5 estimates how many users were active simultaneously.

Use both values when configuring the load test:

- **Concurrent users from Step 5:** the expected number of simultaneously active VUs.
- **Distinct active sessions from Step 6:** the total session population represented across the peak-hour workload.

### 8.1 New Relic – NRQL

This step establishes the hard ceiling for your VU pool: the total number of distinct sessions active during the peak minute. New Relic gives you this through uniqueCount(session), plus a fuller session profile to inform your test setup.

The first query returns the raw active session count. The others break that population down by new versus returning users and session depth, which help you shape realistic think times and navigation patterns in your load test scenarios.

```sql
-- Step 6a: Full session picture for the peak hour
-- total_active_sessions is your VU pool ceiling
-- Note: sessionDuration and sessionPageViews are Browser agent attributes.
-- They require New Relic Browser agent to be instrumented on your app.
--
SELECT
  uniqueCount(session) AS distinct_sessions_in_peak_hour,
  average(sessionDuration) AS avg_session_duration_sec,
  percentile(sessionDuration, 50, 90) AS session_duration_pct,
  average(sessionPageViews) AS avg_pages_per_session,
  filter(uniqueCount(session), WHERE sessionPageViews = 1) AS bounce_sessions,
  filter(uniqueCount(session), WHERE sessionPageViews >= 5) AS engaged_sessions
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

```sql
-- Step 6b: New vs returning --- affects cache warm state in load test.
-- nr.customAttribute.isNewUser is a CUSTOM attribute --- your team must set
-- this via the Browser API: newrelic.setCustomAttribute("isNewUser", true/false)
-- If not instrumented, use nr.session (first visit = new) or omit this query.

SELECT
  uniqueCount(session) AS session_count,
  average(duration) AS avg_page_load_ms
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
FACET nr.customAttribute.isNewUser
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

```sql
-- Step 6c: Sessions active each minute across the peak hour.
-- Use this to see the shape of traffic within the hour.
-- The max bar = your peak concurrent session minute.
--
SELECT
  uniqueCount(session) AS active_sessions
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
TIMESERIES 1 minute
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

### 8.2 Dynatrace – USQL

Dynatrace stores all session attributes natively on the usersession entity, with no custom instrumentation required. The queries below produce the same session profile as the NRQL queries above, plus a few extra fields Dynatrace exposes by default.

```sql
-- Step 6a --- Dynatrace USQL: Full session profile for peak hour
-- total_sessions is your VU pool ceiling
--
SELECT
  COUNT(*) AS total_sessions,
  AVG(duration) / 1000 AS avg_duration_sec,
  AVG(userActionCount) AS avg_actions_per_session,
  (COUNT(*) * (AVG(duration) / 1000)) / 3600 AS concurrent_users,
  (COUNT(*) * (AVG(duration) / 1000)) / 3600 * 1.3 AS vus_1_3x,
  (COUNT(*) * (AVG(duration) / 1000)) / 3600 * 1.3 * 1.1 AS vus_with_buffer,
  SUM(CASE WHEN userActionCount = 1 THEN 1 ELSE 0 END) AS bounce_sessions,
  SUM(CASE WHEN userActionCount >= 5 THEN 1 ELSE 0 END) AS engaged_sessions
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
```

```sql
-- Step 6b --- New vs returning users (built-in field --- no custom instrumentation needed)
-- newUser is a native boolean field on the usersession entity
--
SELECT
  SUM(CASE WHEN newUser = TRUE THEN 1 ELSE 0 END) AS new_users,
  SUM(CASE WHEN newUser = FALSE THEN 1 ELSE 0 END) AS returning_users,
  COUNT(*) AS total_sessions,
  AVG(duration) / 1000 AS avg_duration_sec,
  AVG(userActionCount) AS avg_actions
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
```

```sql
-- Step 6c --- Sessions per minute within peak hour
-- ORDER BY minute_slot ASC keeps time order for the sparkline chart
--
SELECT
  DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm') AS minute_slot,
  COUNT(*) AS active_sessions
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
GROUP BY DATETIME(startTime, 'HH:mm', 'yyyy-MM-dd HH:mm')
ORDER BY minute_slot ASC
```

```sql
-- Step 6d --- Session depth: how many pages/actions per session
-- Informs think time distribution in load test scripts
--
SELECT
  CASE
    WHEN userActionCount = 1 THEN "1 action (bounce)"
    WHEN userActionCount BETWEEN 2 AND 3 THEN "2-3 actions"
    WHEN userActionCount BETWEEN 4 AND 6 THEN "4-6 actions"
    WHEN userActionCount >= 7 THEN "7+ actions (engaged)"
  END AS depth_bucket,
  COUNT(*) AS session_count
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
GROUP BY depth_bucket
ORDER BY session_count DESC
```

---

## 9. Final Workload Model

After running all six steps, every number in the workload model is directly traceable to a query result, not an estimate.

### 9.1 Summary Parameters

This table brings together every number the six steps produced into a single workload model. The left columns show the values derived from last year's peak, the growth-adjusted column applies your chosen multiplier, and the source query column points back to the exact step each number came from, so anyone reviewing the model can trace it to real telemetry.

| Parameter | Ex: Value (Last Year Peak) | Ex: Value (1.3x Growth) | Source Query |
| --- | --- | --- | --- |
| **Peak Day** | November 28, 2025 | (same reference) | Step 1 NRQL/USQL |
| **Peak Hour** | 11:00 - 12:00 | (same reference) | Step 2 NRQL/USQL |
| **Peak Minute RPS** | 82 RPS | 107 RPS | Step 3 NRQL/USQL |
| **Total Active Sessions (VU Pool)** | 4,280 | 5,564 | Step 6 NRQL/USQL |
| **Number of Top Scenarios** | 7 | 7 | Step 4 NRQL/USQL |
| **Test Duration** | 60 minutes | 60 minutes | Step 2 NRQL/USQL |

### 9.2 Scenario VU Allocation

This table breaks the total VU pool down across the individual scenarios, using the weights from Step 4. Each row gives you the load percentage, the target RPS, the concurrent VU count, and the P95 SLA for one scenario, which is everything you need to configure that scenario directly in your load test engine.

| Scenario | Ex: Load % | Ex: Target RPS | Ex: Concurrent VUs | Ex: P95 SLA |
| --- | --- | --- | --- | --- |
| Homepage → Browse | 28% | 23.0 | 1,558 | < 800ms |
| Search → PLP | 23% | 18.9 | 1,280 | < 1,200ms |
| Product Detail (PDP) | 19% | 15.6 | 1,057 | < 700ms |
| Add to Cart | 12% | 9.8 | 668 | < 500ms |
| Cart → Checkout | 8% | 6.6 | 445 | < 1,500ms |
| Checkout → Payment | 6% | 4.9 | 334 | < 3,500ms |
| Order Confirmation | 4% | 3.3 | 222 | < 600ms |

---

## 10. User Journey – Landing Page to Exit Page

Understanding the full user journey from the first page a visitor lands on to the last page they exit from is the most powerful insight observability data can provide for load testing.

Rather than modeling abstract "transactions", this section shows how to reconstruct the complete path each session takes: entry source, navigation steps, drop-off point, and final outcome, using a corrected four-query chain that produces both individual session records and aggregated path counts.

The FUNNEL() query (Step 4) and the per-session FACET session query serve different purposes.

1. The FUNNEL() counts sessions that visited each step but can't tell you where a session exited.
2. The FACET session query tells you each session's entry and exit page but returns one row per session, not a count matrix. A separate aggregation query (7B) is required to count how many sessions shared each entry+exit combination.

### 10.1 The User Journey Map

The complete e-commerce journey spans nine steps across five distinct phases. Each phase has its own load profile, response time characteristic, and drop-off risk that must be modeled independently in your load test.

| Phase | Steps | Sessions (peak hr) | Drop-off risk | Load test priority |
| --- | --- | --- | --- | --- |
| **Acquisition** | Entry sources → Homepage | 28,410 entered | 13% bounce on landing | Medium |
| **Discovery** | Browse / Search → PDP | 24,716 → 17,330 | 30% exit before cart | High |
| **Intent** | Add to Cart → Cart Review | 13,637 → 8,580 | 37% cart abandon | Critical |
| **Conversion** | Checkout → Payment → Review | 5,054 → 4,088 | 7% payment failure | Critical |
| **Completion** | Order Confirmation → Post-order | 3,706 confirmed | Low - session ends | Low |

### 10.2 The Four-Query Chain

Four queries are required to get the complete picture. Each serves a different analytical purpose and feeds a different part of the workload model.

| Query | Name | What it returns | Used for |
| --- | --- | --- | --- |
| **7A** | Per-session record | One row per session: entry page, exit page, duration, pages visited, converted flag | Individual session analysis, outlier detection, sample debugging |
| **7B** | Entry × exit matrix | One row per entry+exit combination: session count for each path pairing - this is the heatmap | Path frequency analysis, identifying biggest drop-off combinations |
| **7C** | Per-session with outcome bucket | One row per session with a CASE-classified outcome: converted, cart_abandon, checkout_drop, payment_drop, browse_exit, early_exit | Segment-level analysis before aggregation |
| **7D** | Outcome counts for workload model | One row per outcome bucket: count, percentage of total, avg duration, avg pages - directly feeds VU weights | Workload model scenario weighting - the most important query |

### 10.3 Query 7A – Per-Session Record

This query returns one row per session. It tells you exactly where each individual session entered and exited, how long it lasted, how many pages it visited, and whether it converted. It can't produce heatmap cell counts on its own, as that requires Query 7B.

```sql
-- Query 7A: One row per session
-- Use for: individual session analysis, debugging, outlier detection
-- Cannot produce heatmap counts --- use Query 7B for that
--
SELECT
  session,
  earliest(pageUrl) AS entry_page,
  latest(pageUrl) AS exit_page,
  count(pageUrl) AS pages_visited,
  max(timestamp) - min(timestamp) AS session_duration_ms,
  filter(count(*), WHERE pageUrl LIKE '%/confirmation%') AS converted
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
FACET session
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
LIMIT 1000

-- ORDER BY not supported with multiple aggregations on FACET session.
-- Sort by session_duration_ms column in Query Builder UI instead.
```

**Sample output from Query 7A:**

| session | entry_page | exit_page | pages | duration_ms | converted |
| --- | --- | --- | --- | --- | --- |
| sess_a3f8c2 | / | /confirmation | 8 | 862,000 | 1 (yes) |
| sess_b7d1e9 | /category/electronics | /cart | 5 | 545,000 | 0 (no) |
| sess_c2a4f1 | / | /cart | 4 | 348,000 | 0 (no) |
| sess_d9e3b7 | /search?q=shoes | /confirmation | 6 | 693,000 | 1 (yes) |
| sess_e1f5a2 | /product/jacket | /product/jacket | 1 | 45,000 | 0 (no) |

::: note

The `duration_ms` column is calculated as `max(timestamp) - min(timestamp)`. It's the wall-clock time between the first and last page view in the session, **not a response time.** For sess_a3f8c2 above, 862,000 ms = **approximately 14 minutes and 22 seconds of total session time.**

:::

### 10.4 Query 7B – Entry × Exit Matrix (the Heatmap)

This is the query that produces the heatmap cell counts. It uses a dual-FACET on `earliest(pageUrl)` and `latest(pageUrl)` to group sessions by which page they entered on and which page they last visited before leaving. The count(\*) gives the number of sessions in each entry+exit combination.

```sql
-- Query 7B: Heatmap cell counts
-- Use for: path frequency matrix, identifying biggest drop-off combinations
-- THIS is what produces the cell values

SELECT
  count(*) AS session_count
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
FACET
  earliest(pageUrl) AS entry_page,
  latest(pageUrl) AS exit_page
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
LIMIT 100
ORDER BY session_count DESC
```

::: tip Sample output from Query 7B:

| entry_page | exit_page | session_count | Interpretation |
| --- | --- | --- | --- |
| / | /cart | **1,840** | Biggest drop - 1,840 sessions reached cart from homepage but went no further |
| /category | /cart | **2,100** | Category browsers stuck at cart -largest single abandonment group |
| /product | /confirmation | **1,620** | Deep-link buyers - entered directly on PDP and completed purchase. Highest intent segment. |
| / | /checkout | 820 | Reached checkout but dropped before payment |
| /search | /cart | 980 | Searchers abandoning at cart |
| / | /confirmation | 280 | Full homepage-to-conversion journey |
| / | (exit) | 954 | Early bounce - left the site entirely from homepage |

:::

#### How to read the heatmap cells:

Row = the page where (`earliest(pageUrl)`) was recorded (`entry page`). Column = the page where (`latest(pageUrl)`) was recorded (`exit page`). `Cell value = count(*)` from Query 7B is the number of sessions that shared that exact entry+exit combination. It is NOT session duration, response time, or request count.

Example: row / · col /cart = 1,840 means 1,840 sessions entered on the homepage and their last recorded page was /cart. They didn't go further.

### 10.5 Query 7C – Per-Session with Outcome Classification

Query 7C adds a CASE statement to Query 7A, classifying every session into a named outcome bucket based on their exit page. This is the intermediate step before aggregation. It lets you inspect individual sessions within each outcome category before rolling them up.

```sql
-- Query 7C: Per-session with outcome bucket (CASE classification)
-- Use for: segment-level analysis, inspecting individual sessions per outcome
-- Intermediate step --- run Query 7D to get the aggregated counts

SELECT
  session,
  earliest(pageUrl) AS entry_page,
  latest(pageUrl) AS exit_page,
  count(pageUrl) AS pages_visited,
  max(timestamp) - min(timestamp) AS session_duration_ms,
  filter(count(*), WHERE pageUrl LIKE '%/confirmation%') AS converted,
  CASE
    WHEN latest(pageUrl) LIKE '%/confirmation%' THEN 'converted'
    WHEN latest(pageUrl) LIKE '%/payment%' THEN 'payment_drop'
    WHEN latest(pageUrl) LIKE '%/checkout%' THEN 'checkout_drop'
    WHEN latest(pageUrl) LIKE '%/cart%' THEN 'cart_abandon'
    WHEN latest(pageUrl) LIKE '%/product/%' THEN 'browse_exit'
    ELSE 'early_exit'
  END AS journey_outcome
FROM PageView
WHERE 1=1
AND appName = 'your-app-name'
FACET session
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
LIMIT 1000
```

### 10.6 Query 7D – Outcome Counts for Workload Model (Most Important)

Query 7D is the most valuable query in this section for load testing. It collapses all sessions into six outcome buckets and returns a count, average duration, and average pages for each. The **percentage of total column maps directly to VU weights** in your k6 or JMeter configuration.

```sql
-- Query 7D: Outcome counts for workload model
-- Use for: scenario weighting --- pct_of_total -> VU weight in load test
-- This is the query that replaces stakeholder opinion with production data

SELECT
  count(*) AS session_count
FROM PageView
WHERE appName = 'your-app-name'
FACET
  CASE
    WHEN latest(pageUrl) LIKE '%/confirmation%' THEN 'converted'
    WHEN latest(pageUrl) LIKE '%/payment%' THEN 'payment_drop'
    WHEN latest(pageUrl) LIKE '%/checkout%' THEN 'checkout_drop'
    WHEN latest(pageUrl) LIKE '%/cart%' THEN 'cart_abandon'
    WHEN latest(pageUrl) LIKE '%/product/%' THEN 'browse_exit'
    ELSE 'early_exit'
  END AS journey_outcome
SINCE '2025-11-28 11:00:00'
UNTIL '2025-11-28 11:59:59'
```

::: tip Output from Query 7D which maps directly to load test scenario VU weights:

| journey_outcome | session_count | % total | avg duration | avg pages | Load test action |
| --- | --- | --- | --- | --- | --- |
| browse_exit | 7,214 | 25.4% | 3m 08s | 2.8 | Browse-only scenario - 25% VU weight |
| **cart_abandon** | **5,380** | **18.9%** | 5m 12s | 4.1 | Cart-exit scenario - 19% VU weight, stresses cart API |
| early_exit | 4,694 | 16.5% | 0m 52s | 1.1 | Bounce traffic - 16% VU weight, minimal think time |
| checkout_drop | 4,396 | 15.5% | 8m 44s | 5.9 | Checkout-abandon - 15% VU weight, tests shipping form |
| **converted** | **3,706** | **13.1%** | 14m 20s | 8.2 | Full funnel - 13% VU weight, most critical path |
| payment_drop | 3,020 | 10.6% | 11m 02s | 7.1 | Payment-drop - 11% VU weight, stresses payment API |

:::

### 10.7 Dynatrace – USQL Equivalent

Dynatrace has a significant advantage for journey analysis: the `usersession` entity already stores the complete action sequence on the session record itself. The first and last action are accessible via array indexing, with no subquery or dual-FACET needed.

```sql
-- Dynatrace USQL: per-session journey record with outcome
-- usersession stores the full action array natively on the entity
--
SELECT
  sessionId,
  userActions.name[0] AS entry_action,
  userActions.name[userActionCount - 1] AS exit_action,
  COUNT(userActions) AS total_actions,
  duration AS session_ms,
  CASE WHEN userActions.name[userActionCount - 1]
    LIKE '%confirmation%' THEN 'converted'
    ELSE 'not_converted' END AS outcome
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
ORDER BY duration DESC
LIMIT 500
```

```sql
-- Dynatrace USQL: heatmap counts --- no subquery needed
-- userActions.name[0] = first action, [-1] = last action
--
SELECT
  userActions.name[0] AS entry_action,
  userActions.name[userActionCount - 1] AS exit_action,
  COUNT(*) AS session_count
FROM usersession
WHERE 1=1
AND startTime > '2025-11-28T11:00:00'
AND startTime < '2025-11-28T11:59:59'
AND applicationType = 'BROWSER'
GROUP BY
  userActions.name[0],
  userActions.name[userActionCount - 1]
ORDER BY session_count DESC
LIMIT 50
```

---

## 11. Conclusion

If you’ve followed this tutorial end to end, you now have a workload model where every number (RPS target, VU count, scenario weight, test duration) traces back to a specific observability query against real traffic.

That traceability is what makes a load test credible: you can show exactly why you chose 114 RPS instead of guessing 100, and exactly why your checkout scenario gets 15% of VUs instead of a number someone estimated in a meeting.

The next step is to clone the Peak Workload Analyzer from GitHub, point it at your own New Relic or Dynatrace account, and run it against last year’s peak window. The output will tell you whether your current load test configuration is calibrated to real traffic, or to someone’s best guess from a planning call.

**The Core Principle:** Every number in your load test configuration should trace to a query against real production data. If you can't point to the observability record that justifies a VU count, an RPS target, or a scenario weight, that number is a guess. This methodology eliminates guesswork from peak readiness.

### 11.1 Quick Reference: Complete Query Sequence

| Step | Goal | New Relic (NRQL) | Dynatrace (USQL) | Output |
| --- | --- | --- | --- | --- |
| **1** | Peak day | PageView / Transaction FACET dateOf(timestamp) | usersession GROUP BY DATE(startTime) ORDER BY total_actions DESC | Peak date |
| **2** | Peak hour | Transaction TIMESERIES 1 hour | usersession GROUP BY DATETIME(startTime,'HH:00',...) ORDER BY total_actions DESC | Peak hour slot |
| **3** | Peak minute / RPS | Transaction TIMESERIES 1 minute | usersession GROUP BY DATETIME(startTime,'HH:mm',...) ORDER BY session_count DESC | Peak minute + RPS |
| **4** | Scenario mix | Transaction FACET name + PageView FACET pageUrl | useraction GROUP BY userActionName ORDER BY action_count DESC | % weights |
| **5** | VUs per scenario | (uniqueCount(session) × average(sessionDuration)) / 3600 FACET journey_outcome | (COUNT(\*) × AVG(duration)/1000) / 3600 | Per-scenario VUs |
| **6** | Total VU pool | uniqueCount(session) | COUNT(*), AVG(duration)/1000, (COUNT(*) × AVG(duration)/1000)/3600 FROM usersession | VU ceiling |
| **7A** | Per-session record | SELECT session, earliest/latest(pageUrl), count(pageUrl) FROM PageView FACET session | SELECT userId, userActions.name[0], userActions.name[userActionCount-1] FROM usersession | 1 row / session |
| **7B** | Path matrix (heatmap) | count(\*) FACET earliest(pageUrl), latest(pageUrl) ORDER BY session_count DESC | GROUP BY userActions.name[0], userActions.name[userActionCount-1] | Heatmap cell counts |
| **7C** | Per-session + outcome bucket | SELECT session, earliest/latest(pageUrl), CASE(latest(pageUrl)) AS journey_outcome FROM PageView FACET session | SELECT userId, userActions.name[userActionCount-1], CASE(...) AS journey_outcome FROM usersession | 1 row / session + outcome label |
| **7D** | Outcome VU weights | count(\*) FACET CASE(latest(pageUrl)) AS journey_outcome | GROUP BY full CASE expression ORDER BY session_count DESC | Scenario % split |

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Automated Workload Model for Peak Readiness",
  "desc": "If you’ve ever spent two days pulling data out of an APM tool just to answer “how many virtual users should I run in my load test?”, this tutorial is for you. By the end, you’ll know how to derive eve",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-automated-workload-model-for-peak-readiness.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
