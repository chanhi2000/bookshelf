---
lang: en-US
title: "How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window"
description: "Article(s) > How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window"
    - property: og:description
      content: "How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-dart-package-analytics-tool-with-the-pub-dev-api.html
prev: /programming/dart/articles/README.md
date: 2026-09-24
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/eedcb9fa-4e77-430d-afea-9b2b76565dbf.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window"
  desc="When I published my package on pub.dev, the first few days were exciting as the number of downloads climbed. 201 downloads in a few days! Then something strange happened. The number dropped: 120, then"
  url="https://freecodecamp.org/news/build-a-dart-package-analytics-tool-with-the-pub-dev-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/eedcb9fa-4e77-430d-afea-9b2b76565dbf.png"/>

When I published my package on pub.dev, the first few days were exciting as the number of downloads climbed. 201 downloads in a few days!

Then something strange happened. The number dropped: 120, then 55. That's when I knew something wasn't right.

I didn't break anything. Nothing changed in the package. People did not stop using it.

The window moved.

That was my introduction to one of the most misunderstood things about pub.dev: the 30-day rolling download figure it shows you is not a total. It is not a cumulative count. It is a window. And when the spike that got you those initial downloads falls outside that window, your number collapses, even though every single person who downloaded your package still has it installed.

That realization sent me down a rabbit hole. If pub.dev is only showing me a 30-day window, is there a way to see the full picture? Is there an API that exposes more? What is pub.dev actually doing under the hood?

This article is about what I found, and the tool I built out of it.

---

## The Problem With the 30-Day Window

When you publish a package on pub.dev, the platform shows you a download count. If you look at any package page right now, you'll see a number labeled "downloads." Most developers assume this is the total number of times their package has been downloaded since it was published.

It is not.

pub.dev shows a 30-day rolling window. It counts how many times your package was downloaded in the last 30 days, and only the last 30 days. Everything before that is invisible.

Here is what that means in practice. You launch a package. You share it on Twitter, on LinkedIn, in developer communities. You get a spike. 200 downloads in the first week. Then things settle - maybe 10 downloads a week later.

At launch: 200 downloads are visible. After 5 weeks: 50 downloads are visible (only the last 30 days), and maybe 40 downloads after 10 weeks.

The number dropped by 75%, but your package was not abandoned or broken. It was quietly being used by the 200 people who already installed it. The downloads kept coming in, just at a slower rate than the initial spike.

The window moved and the spike fell out of it. But what was displayed on pub.dev made it look like your package was dying.

For someone tracking their package's growth, that can be misleading.

---

## How pub.dev Actually Calculates Downloads

Before looking at the APIs, it is worth understanding how pub.dev counts downloads in the first place.

pub.dev counts how many times a package archive has been downloaded from its servers. When you run `pub get` or `flutter pub get` in a project, the pub tool checks your local `PUB_CACHE` first. If the package is already cached, it uses the cached version and no download happens. A download is only counted when the package is not in your cache.

This means the download count is not a measure of how many projects use your package. It is a measure of how many times developers had to fetch it fresh from the server. If 1000 developers use your package but they all already had it cached, the download count for that period is zero.

pub.dev is transparent about this. From their [<VPIcon icon="fa-brands fa-dart-lang"/>official scoring documentation](https://pub.dev/help/scoring): "The download count is not a direct measure of how many users a package has. A package can have high usage with relatively low download counts, because the pub client caches the downloads in the `PUB_CACHE`."

So the number you see on pub.dev is already an undercount of actual usage. And on top of that, it is only showing you the last 30 days of that undercount.

---

## The APIs Behind pub.dev

When I realized pub.dev was only showing me a window, the first thing I did was look for APIs that might expose more. pub.dev has an official API documentation page at [<VPIcon icon="fa-brands fa-dart-lang"/>pub.dev offical api documentation](https://pub.dev/help/api). Let's walk through what is documented there.

### The Score Endpoint

```plaintext
GET https://pub.dev/api/packages/{package}/score
```

This is the official endpoint that powers the download number you see on pub.dev. You can call it yourself right now:

```sh
curl https://pub.dev/api/packages/dart_exceptor/score
```

The response looks like this:

```json
{
  "grantedPoints": 150,
  "maxPoints": 160,
  "likeCount": 5,
  "downloadCount30Days": 174,
  "tags": [
    "sdk:dart",
    "sdk:flutter",
    "platform:android",
    "platform:ios",
    "platform:linux",
    "platform:macos",
    "platform:web",
    "platform:windows"
  ]
}
```

`downloadCount30Days` is the number pub.dev shows on the package page. It is the 30-day rolling window. Nothing more, nothing less.

`likeCount` is how many developers have liked the package.

`grantedPoints` and `maxPoints` are the pub points score from the pana analyzer.

This endpoint is officially supported and officially documented. It will not change without announcement.

### The Package Metadata Endpoint

```plaintext
GET https://pub.dev/api/packages/{package}
```

```sh
curl https://pub.dev/api/packages/dart_exceptor
```

This endpoint is part of the Hosted Pub Repository Specification V2, which is what the `pub` command line tool itself uses to resolve and download packages. It returns full package metadata: every published version, the pubspec for each version, the publish timestamps, and the package's overall information.

This is what PubTrace uses to determine when a package was first published. If a package was published six weeks ago, it only has six weeks of history, not 52. The article needs to be honest about that. PubTrace reads the first publish date from this endpoint and uses it to label charts accurately.

The response is large. The important fields for PubTrace are:

```json
{
  "name": "dart_exceptor",
  "latest": {
    "version": "1.1.2",
    "published": "2026-07-12T10:00:00.000Z"
  },
  "versions": [
    {
      "version": "1.0.0",
      "published": "2026-07-01T10:00:00.000Z"
    }
  ]
}
```

### The Publisher Endpoint

```plaintext
GET https://pub.dev/api/packages/{package}/publisher
```

```sh
curl https://pub.dev/api/packages/dart_exceptor/publisher
```

Response:

```json
{
  "publisherId": null
}
```

Or for a verified publisher:

```json
{
  "publisherId": "dart.dev"
}
```

PubTrace uses this to show who built the package. If the package is under a verified publisher, that is displayed. If not, the uploader's identity is shown as unverified.

This endpoint is officially documented and officially supported.

---

## The Metrics Endpoint: The Full Story

Here is where things get interesting.

While exploring pub.dev's public surface, I found an endpoint that is not in the official API documentation but is publicly accessible and used by pub.dev itself internally:

```plaintext
GET https://pub.dev/api/packages/{package}/metrics
```

```sh
curl https://pub.dev/api/packages/dart_exceptor/metrics
```

pub.dev is explicit about this distinction. From their [<VPIcon icon="fa-brands fa-dart-lang"/>official api documentation](https://pub.dev/help/api): "pub.dev may expose API endpoints that are available publicly, but unless they are documented here, we don't consider them as officially supported, and may change or remove them without notice."

The metrics endpoint is one of these. It is public. Anyone can call it. But it is not officially supported, which means it could change. PubTrace uses it because it is the only source of the data that matters, and every number it produces from this endpoint is independently verifiable by anyone with a terminal.

The response from this endpoint includes a `scorecard` object with `weeklyVersionDownloads`. This is what pub.dev's own weekly chart is powered by. It contains 52 entries, one for each week over the last year, newest first. Each entry breaks down downloads by version range: total downloads, major version range, minor version range, and patch version range.

A simplified version of the relevant section looks like this:

```json
{
  "scorecard": {
    "weeklyVersionDownloads": {
      "totalWeeklyDownloads": [45, 38, 62, 71, 28, 19, 33, ...],
      "majorRangeWeeklyDownloads": [...],
      "minorRangeWeeklyDownloads": [...],
      "patchRangeWeeklyDownloads": [...]
    }
  }
}
```

The array has 52 entries. Index 0 is the most recent week. Index 51 is the oldest week in the dataset.

pub.dev shows you the sum of roughly the last 4 entries in `totalWeeklyDownloads` (approximately 30 days). The full 52 entries are sitting right there in the API response. Unused. Invisible to anyone looking at the pub.dev UI.

That is when I decided to build something.

---

## Building PubTrace

When I understood what the metrics endpoint exposed, the question was simple: why call these APIs manually every time I want to check a package's history, when I could build something the entire Dart and Flutter community could use?

That is how PubTrace was born.

**[<VPIcon icon="fas fa-globe"/>PubTrace](https://pubtrace.dev) is a free tool that shows the full 52-week download history of any Dart or Flutter package on pub.dev.** No account needed. No sign up. Just go to pubtrace.dev, type in any package name, and see the complete picture that pub.dev does not show you.

### What PubTrace Does

![pubtrace.dev showing the download count for one of the most popular flutter packages 'DIO'](https://cdn.hashnode.com/uploads/covers/692776609bbf6fdcde84192d/d7960309-60e9-47bb-9a63-e2f778364101.png)

PubTrace is a free, open tool available at [<VPIcon icon="fas fa-globe"/>pubtrace.dev](https://pubtrace.dev). You type in any package name published on pub.dev and PubTrace shows you:

**The cumulative download chart.** A 52-week line chart showing total downloads growing over time. Not a 30-day window. Not a weekly bar chart. A running total that shows the true growth trajectory of any package.

**The real numbers.** Total downloads across the full history window, likes, pub points, and the publisher information , all pulled directly from pub.dev's own APIs at the moment you request the page.

**How old the data is.** PubTrace shows you when the data was last fetched. The cache is explicit. There is no pretense of real-time data. It is fresh within an hour.

**The verify panel.** Every page has a verify section showing the exact curl commands used to fetch the data. You can copy any command, run it in your terminal, and reproduce every number yourself. This is the most important feature on PubTrace. It means you never have to trust PubTrace. You can verify it yourself, right now.

Here is what looking up dart_exceptor on PubTrace shows compared to pub.dev:

pub.dev shows: 174 downloads (30-day window) PubTrace shows: 174 downloads cumulatively over 8 weeks, with a chart showing exactly when the downloads came in and how the number grew

Both numbers are sourced from the same pub.dev data. PubTrace just shows the full picture.

::: info

Any developer, any package, no account required. Go to [<VPIcon icon="fas fa-globe"/>pubtrace.dev](https://pubtrace.dev) and try it.

:::

### The Architecture Decision: No Database

The most important architectural decision in PubTrace was to not store any data.

Every number you see on PubTrace is fetched live from pub.dev's APIs at the moment you request a package. There is no database of download history. There is no historical record. Every chart is computed fresh, on the server, from pub.dev's own data, right now.

This was a deliberate choice for one reason: honesty.

If PubTrace stored its own historical data, you would have to trust that PubTrace's data is correct. You would have to trust that I collected it accurately, that I did not have downtime during a collection window, that my storage was not corrupted. You would be trusting a middleman.

With the no-database architecture, you never have to trust PubTrace. Every number PubTrace shows you can be reproduced with a curl command. PubTrace is a computation layer on top of pub.dev's own data, not a source of truth in its own right.

### The 1-Hour Cache

Fetching live from pub.dev on every request would be wasteful and disrespectful to pub.dev's servers. PubTrace caches responses for one hour. This means:

If you look up `dart_exceptor` at 3pm, PubTrace fetches from pub.dev and caches the result. If someone else looks up `dart_exceptor` at 3:30pm, they get the cached result. At 4pm, the cache expires and the next request fetches fresh data.

The cache is explicit and displayed to users. You can see when the data was last fetched. There is no pretense that the data is real-time. It is fresh within an hour.

### The Verify Panel

Every package page on PubTrace has a Verify panel. It shows the exact curl commands used to fetch the data for that package. Any developer can copy those commands, run them in their terminal, and reproduce every number PubTrace shows.

This is not just a nice feature. It is the entire point. PubTrace's value is not that you trust it. It is that you do not have to.

---

## How PubTrace Computes Its Numbers

Understanding the computation helps you trust the output.

### The Cumulative Chart

![67fe11eb-6bb9-4119-83a6-431ff844d170](https://cdn.hashnode.com/uploads/covers/692776609bbf6fdcde84192d/67fe11eb-6bb9-4119-83a6-431ff844d170.png)

PubTrace takes the 52 weekly download entries from the metrics endpoint and computes a running total. Week 52 is the starting point. Each subsequent week adds its downloads to the running total. The result is a cumulative growth chart that shows the true trajectory of a package's download history.

This is fundamentally different from what pub.dev shows. pub.dev shows a bar chart of weekly downloads, which makes a consistent package with steady 30 downloads per week look flat. PubTrace shows a line chart of cumulative downloads, which shows that same package growing steadily, week after week.

Both are showing the same data. The cumulative view shows the full story.

### The Young Package Rule

If a package was published less than 52 weeks ago, PubTrace labels the chart with the actual number of weeks of data available. A package published 8 weeks ago will show 8 weeks of history, clearly labeled. PubTrace does not extrapolate or estimate missing weeks. It shows exactly what is in the data and nothing more.

### The Truncated History Rule

The metrics endpoint stores 52 weeks of data. For packages that are more than a year old, the data before 52 weeks ago is simply not available from this endpoint. PubTrace is transparent about this. The chart shows 52 weeks. It does not claim to show lifetime downloads from day one for old packages.

For packages younger than 52 weeks, the chart shows everything since launch, which is the complete history.

### The Sanity Check

Every computation PubTrace does can be verified against the raw API response. The cumulative total for a package is the sum of all 52 entries in `totalWeeklyDownloads`. You can run the curl command yourself, sum the array, and get the same number PubTrace shows. If they differ, something is wrong, and I'd like to know about it.

---

## How This Helps Engineers

### For Package Authors

The most immediate value is understanding your own package's real growth. The number on pub.dev today is not your package's story. It is a snapshot of the last 30 days. PubTrace shows you the full 52-week trajectory so you can see whether your package is growing, stable, or declining, and make decisions based on real data.

### For Portfolio and Evidence

A lot of engineers in the Dart and Flutter community are building portfolios and applying for senior roles that require demonstrating community contribution and technical impact. A download count of 55 on pub.dev is not compelling evidence. A cumulative chart showing 174 downloads growing steadily over 8 weeks, with a verifiable source, tells a very different story.

PubTrace gives you the full picture and gives you the tools to prove it. The verify panel exists specifically so that the numbers are independently confirmable. There is no need to trust you. The data speaks for itself and it is verifiable from pub.dev's own APIs.

### For the Community

Any developer can look up any public package on pub.dev through PubTrace. You can compare packages side by side. You can see how a package grew over its first year. You can make more informed decisions about which packages to depend on, not just based on pub.dev's current 30-day window, but based on the full trajectory.

### For Dart and Flutter Ecosystem Transparency

The Dart and Flutter ecosystem is growing. More packages are being published every week. But the tools for understanding that growth have been limited to pub.dev's 30-day window and its weekly bar chart. PubTrace adds a layer of historical visibility that was always in the data but never surfaced in the UI.

Every calculation is derived from pub.dev's own public APIs. Nothing is invented. Nothing is estimated beyond what the API provides. The goal is honest, quality data that any engineer can verify.

---

## Conclusion

pub.dev's 30-day rolling download figure tells you something. It does not tell you everything. For package authors trying to understand their growth and for the community trying to make informed decisions about dependencies, that window is not enough.

The data for a fuller picture exists. pub.dev exposes weekly download history through its metrics endpoint. The official APIs expose metadata, publisher information, and scores. PubTrace combines all of these, computes a cumulative view, and presents it in a way that is honest, verifiable, and useful.

No database. No estimates. No trust required. Every number traceable to a curl command against pub.dev's own APIs.

If you publish packages on pub.dev, your numbers are probably better than pub.dev is making them look. Go see the real story.

::: info

Visit [<VPIcon icon="fas fa-globe"/>pubtrace.dev](https://pubtrace.dev). Type in your package name or any package you are curious about. Check the verify panel. Run the curl commands yourself. Share the link with your team.

The data was always there. Now it is visible.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Dart Package Analytics Tool with the pub.dev API: Beyond the 30-Day Window",
  "desc": "When I published my package on pub.dev, the first few days were exciting as the number of downloads climbed. 201 downloads in a few days! Then something strange happened. The number dropped: 120, then",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-dart-package-analytics-tool-with-the-pub-dev-api.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
