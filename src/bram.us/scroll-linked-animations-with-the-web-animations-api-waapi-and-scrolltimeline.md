---
lang: en-US
title: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)"
description: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - bram.us
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)"
    - property: og:description
      content: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.html
prev: /programming/js/articles/README.md
date: 2021-11-24
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/11/scroll-linked-animations-waapi.jpg
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
  name="The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)"
  desc="🚨 UPDATE: The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes. Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please … Continue reading ”The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)”"
  url="https://bram.us/2021/11/24/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/11/scroll-linked-animations-waapi.jpg"/>

::: critical 🚨 UPDATE

The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes.**

Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please refer to [<VPIcon icon="fa-brands fa-chrome"/>`scroll-driven-animations`](https://developer.chrome.com/articles/scroll-driven-animations/) for an article with examples that use the updated syntax.

:::

![](https://bram.us/wordpress/wp-content/uploads/2021/11/scroll-linked-animations-waapi.jpg)

Just before I [**left on holiday**](/bram.us/gone-diving-nov-2021.md), the 2nd article I wrote for CSS-Tricks got published. In it, I take a look at the JavaScript side of the Scroll-Linked Animations specification.

With WAAPI + ScrollTimeline, a typical “progressbar as you scroll” can be coded like this:

```js
const myScrollTimeline = new ScrollTimeline({
  source: document.scrollingElement,
  orientation: 'block',
  scrollOffsets: [
    new CSSUnitValue(0, 'percent'),
    new CSSUnitValue(100, 'percent'),
  ],
});

document.querySelector("#progress").animate(
  {
    transform: ["scaleX(0)", "scaleX(1)"]
  },
  { 
    duration: 1, 
    fill: "forwards", 
    timeline: myScrollTimeline
  }
);
```

::: info

Find the details in the article.

```component VPCard
{
  "title": "Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline",
  "desc": "The Scroll-linked Animations specification is an upcoming and experimental addition that allows us to link animation-progress to scroll-progress: as you",
  "link": "/css-tricks.com/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

I like to consider this article the fourth installment in a series on Scroll-Linked Animations that I wrote:

```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)",
  "desc": "The “Scroll-linked Animations Specification” is an upcoming addition to CSS that defines a way for creating animations that are linked to a scroll offset of a scroll container. Let's take a look at how it works and what results we can achieve with it.",
  "link": "/bram.us/the-future-of-css-scroll-linked-animations-part-1.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)",
  "desc": "Let's take a look at how we can create Scroll-Linked Animations that use Element-based Offsets using @scroll-timeline from the “Scroll-linked Animations“ CSS Specification.",
  "link": "/bram.us/the-future-of-css-scroll-linked-animations-part-2.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines",
  "desc": "The Scroll-Linked Animations specification is an upcoming and experimental addition to CSS. Thanks to the @scroll-timeline at-rule and animation-timeline",
  "link": "/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline",
  "desc": "The Scroll-linked Animations specification is an upcoming and experimental addition that allows us to link animation-progress to scroll-progress: as you",
  "link": "/css-tricks.com/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)",
  "desc": "🚨 UPDATE: The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes. Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please … Continue reading ”The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
