---
lang: en-US
title: "A handful of reasons JavaScript won’t be available"
description: "Article(s) > A handful of reasons JavaScript won’t be available"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - piccalil.li
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A handful of reasons JavaScript won’t be available"
    - property: og:description
      content: "A handful of reasons JavaScript won’t be available"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-handful-of-reasons-javascript-wont-be-available.html
prev: /programming/js/articles/README.md
date: 2024-07-31
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-handful-of-reasons-javascript-wont-be-available/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A handful of reasons JavaScript won’t be available"
  desc="It’s always safe to assume JavaScript will not be available, so here’s a quick list of very realistic reasons it won’t be."
  url="https://piccalil.li/blog/a-handful-of-reasons-javascript-wont-be-available"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-handful-of-reasons-javascript-wont-be-available/"/>

1. A browser extension has interfered with the site
2. A spotty connection hasn’t loaded the dependencies correctly
3. Internal IT policy has blocked dependencies
4. WIFI network has blocked certain CDNs
5. A user is viewing your site on a train which has just gone into a tunnel
6. A device doesn’t have enough memory available
7. There’s an error in your JavaScript
8. An `async` fetch request wasn’t fenced off in a `try` `catch` and has failed
9. A user has a JavaScript toggle accidentally turned off
10. A user uses a JavaScript toggle to prevent ads loading
11. An ad blocker has blocked your JavaScript from loading
12. A user is using [<VPIcon icon="fa-brands fa-wikipedia-w"/>Opera Mini](https://en.wikipedia.org/wiki/Opera_Mini)
13. A user has [<VPIcon icon="fa-brands fa-google"/>data saving turned on](https://support.google.com/pixelphone/answer/7055392?hl=en-GB)
14. Rogue, interfering scripts have been added by Google Tag manager
15. The browser has locked up trying to parse your JS bundle

That’s just a quick list of things I thought of on the top of my head. I could probably list off a bunch of others, but 15 items shows you how *likely* it is JavaScript will not be available, or available in a limited fashion.

Makes sense to build with [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md), right?

::: info

[<VPIcon icon="fas fa-globe"/>Stuart Langridge](https://kryogenix.org/) made [<VPIcon icon="fas fa-globe"/>this really handy flow](https://kryogenix.org/code/browser/everyonehasjs.html) that does a great job of visualising all the problems that **will** happen.

:::

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A handful of reasons JavaScript won’t be available",
  "desc": "It’s always safe to assume JavaScript will not be available, so here’s a quick list of very realistic reasons it won’t be.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-handful-of-reasons-javascript-wont-be-available.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
