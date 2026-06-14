---
lang: en-US
title: "Why Computers Can’t Count Money"
description: "Article(s) > Why Computers Can’t Count Money"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why Computers Can’t Count Money"
    - property: og:description
      content: "Why Computers Can’t Count Money"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-computers-can-t-count-money.html
prev: /academics/coen/articles/README.md
date: 2026-06-26
isOriginal: false
author:
  - name: Beau Carnes (@aniakubow)
    url: https://youtube.com/@aniakubow
cover: https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/082b96c7-eab1-439f-8454-d3ed2f6bad1d.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Computers Can’t Count Money"
  desc="Computers are incredibly fast, but they have a surprising, fundamental flaw when it comes to counting money. In our latest freeCodeCamp.org video, ”Why Computers Can’t Count Money,” Ania Kubow dives i"
  url="https://freecodecamp.org/news/why-computers-can-t-count-money"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/082b96c7-eab1-439f-8454-d3ed2f6bad1d.jpg"/>

Computers are incredibly fast, but they have a surprising, fundamental flaw when it comes to counting money.

In our latest [<FontIcon icon="fa-brands fa-free-code-camp"/>freeCodeCamp.org](http://freeCodeCamp.org) video, "[<VPIcon icon="fa-brands fa-youtube"/>Why Computers Can’t Count Money](https://youtu.be/rQxPGqPq8wk)," Ania Kubow dives into the history of a class of software bugs that once challenged major financial institutions, leading to accounts that gained or lost funds due to microscopic rounding errors.

The issue stems from how hardware processes information: because computers store numbers in binary (base-2) rather than the base-10 system humans use, they struggle to represent simple decimals like 0.1 or 0.2 exactly. Instead, machines store the closest possible approximation of these numbers. While this seems trivial for most applications, these tiny discrepancies accumulate when scaled across millions of transactions, causing financial balances to "drift" in ways that could occasionally be exploited to generate money from nothing.

This technical quirk forced the entire financial industry to rethink how they handle currency in software. Today, modern financial systems avoid floating-point numbers entirely, choosing to store values as integers to ensure absolute precision. This video explores the engineering shift required to guarantee that 0.1 plus 0.2 always equals 0.3, protecting the integrity of every payment you make online.

Watch the video on [<VPIcon icon="fa-brands fa-youtube"/>the freeCodeCamp.org YouTube channel](https://youtu.be/rQxPGqPq8wk) (6-minute watch).

<VidStack src="youtube/rQxPGqPq8wk" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Computers Can’t Count Money",
  "desc": "Computers are incredibly fast, but they have a surprising, fundamental flaw when it comes to counting money. In our latest freeCodeCamp.org video, ”Why Computers Can’t Count Money,” Ania Kubow dives i",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-computers-can-t-count-money.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
