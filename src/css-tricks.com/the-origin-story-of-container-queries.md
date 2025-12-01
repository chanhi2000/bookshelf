---
lang: en-US
title: "The Origin Story of Container Queries"
description: "Article(s) > The Origin Story of Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Origin Story of Container Queries"
    - property: og:description
      content: "The Origin Story of Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-origin-story-of-container-queries.html
prev: /programming/css/articles/README.md
date: 2019-12-16
isOriginal: false
author:
  - name: Robin Rendle
    url : https://css-tricks.com/author/robinrendle/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/container-queries.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Origin Story of Container Queries"
  desc="Container queries don’t exist today but a lot of web developers have been arguing in their favor lately. At first, the idea sounds relatively simple: whereas"
  url="https://css-tricks.com/the-origin-story-of-container-queries"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/container-queries.png"/>

[<VPIcon icon="fas fa-globe"/>Container queries](https://wicg.github.io/container-queries/) don’t exist today but a lot of web developers have been arguing in their favor lately. At first, the idea sounds relatively simple: whereas media queries allow us to make style changes based on the width of the browser, container queries would allow us to make style updates when the width of an element’s parent changes.

That’s an important distinction to make and would likely solve a ton of daily problems for most web developers, especially those working on large design systems with components that are designed to be used without any context of the elements around them.

Zach Leatherman walks us through the history of container queries to date and how calls for their support started:

> Container Queries are an often requested feature of the web platform. It has become almost cliché to mention it when talking about problems we’d like the web platform to solve. Container Queries would go a long way toward helping web developers do their jobs better and its omission is a huge limitation when developing component-based code for the web.

I’ve found in my work on a big ol’ design system that media queries just don’t cut it anymore when it comes to making components because our team frequently needs to change the styles of an element based on the width of the parent element. So, my hot take on this subject is that, after CSS Grid, container queries are the next big piece of the web design layout puzzle.

As [<VPIcon icon="fas fa-globe"/>Ethan Marcotte wrote](https://ethanmarcotte.com/wrote/on-container-queries/) on the subject some time ago:

> Speaking just for myself, I know container queries would revolutionize my design practice, and better prepare responsive design for mobile, desktop, tablet—and whatever’s coming next.

<SiteInfo
  name="The Origin Story of Container Queries—zachleat.com"
  desc="A post by Zach Leatherman (zachleat)"
  url="https://zachleat.com/web/origin-container-queries"
  logo="https://zachleat.com/img/built/eeKNB-2F7b-192.jpeg"
  preview="https://screenshot.11ty.app/https%3A%2F%2Fzachleat.com%2Fopengraph%2Fweb%2Forigin-container-queries%2F%3Fcache%3D_20251031/opengraph/"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Origin Story of Container Queries",
  "desc": "Container queries don’t exist today but a lot of web developers have been arguing in their favor lately. At first, the idea sounds relatively simple: whereas",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-origin-story-of-container-queries.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
