---
lang: en-US
title: "How to Play and Pause CSS Animations with CSS Custom Properties"
description: "Article(s) > How to Play and Pause CSS Animations with CSS Custom Properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Play and Pause CSS Animations with CSS Custom Properties"
    - property: og:description
      content: "How to Play and Pause CSS Animations with CSS Custom Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/how-to-play-and-pause-css-animations-with-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2021-01-24
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/01/css-animation-play-state.png
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
  name="How to Play and Pause CSS Animations with CSS Custom Properties"
  desc="Mads Stoumann, writing for CSS-Tricks, starts off with a simple idea: set a Custom Property to either playing or paused to control animation-play-state. [data-animation] { /* … */ animation-play-state: var(--animps, running); } /* Use a checkbox to pause animations */ [data-animation-pause]:checked ~ [data-animation] { --animps: paused; } But one of the listed use cases is … Continue reading ”How to Play and Pause CSS Animations with CSS Custom Properties”"
  url="https://bram.us/2021/01/24/how-to-play-and-pause-css-animations-with-css-custom-properties/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/01/css-animation-play-state.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/01/css-animation-play-state.png)

[Mads Stoumann (<VPIcon icon="fa-brands fa-x-twitter"/>`madsstoumann`)](https://x.com/madsstoumann), writing for CSS-Tricks, starts off with a simple idea: set a Custom Property to either `playing` or `paused` to control `animation-play-state`.

```css
[data-animation] {
    /* … */
    animation-play-state: var(--animps, running);
}

/* Use a checkbox to pause animations */
[data-animation-pause]:checked ~ [data-animation] {
  --animps: paused;
}
```

But one of the listed use cases is great: a pure CSS slideshow that has a play/pause button:

<CodePen
  user="stoumann"
  slug-hash="NWRGavM"
  title="&lt;details&gt; Play/Pause Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

Nice one!

More use cases in the full post, including the use of an [**`IntersectionObserver`**](/bram.us/using-intersection-observers.md) to pause animations for elements that are offscreen.

::: info

```component VPCard
{
  "title": "How to Play and Pause CSS Animations with CSS Custom Properties",
  "desc": "Let’s have a look CSS @keyframes animations, and specifically about how you can pause and otherwise control them. There is a CSS property specifically for it,",
  "link": "/css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Play and Pause CSS Animations with CSS Custom Properties",
  "desc": "Mads Stoumann, writing for CSS-Tricks, starts off with a simple idea: set a Custom Property to either playing or paused to control animation-play-state. [data-animation] { /* … */ animation-play-state: var(--animps, running); } /* Use a checkbox to pause animations */ [data-animation-pause]:checked ~ [data-animation] { --animps: paused; } But one of the listed use cases is … Continue reading ”How to Play and Pause CSS Animations with CSS Custom Properties”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/how-to-play-and-pause-css-animations-with-css-custom-properties.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
