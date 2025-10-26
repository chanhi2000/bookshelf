---
lang: en-US
title: "Scroll-Driven & Fixed"
description: "Article(s) > Scroll-Driven & Fixed"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scroll-Driven & Fixed"
    - property: og:description
      content: "Scroll-Driven & Fixed"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-fixed.html
prev: /programming/css/articles/README.md
date: 2024-12-20
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4812
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
  name="Scroll-Driven & Fixed"
  desc="It's quite fun to have an element react to another element scrolling in an unexpected way! "
  url="https://frontendmasters.com/blog/scroll-driven-fixed/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4812"/>

Scroll-driven animations is a good name. They are… animations… that are… scroll-driven. As you scroll you can make something happen. The most basic kind, where a `@keyframe` is ran 0% to 100% as the element is scrolled 0% to 100% is particularly easy to wrap your mind around.

I also think it’s fun to mess with the expectations of scrolling.

```plaintext
In very light, fun-only, non-crucial ways. Not in ways that would hurt the access of content.
```

Like what if we made an element that definitely scrolled:

```css
.scrolling-element {
  height: 100dvh;
  /* ... make something inside it taller than it is ... */
}
```

But then all the content within it was `position: fixed;` so it didn’t move normally when the element was scrolled.

```css{4}
.scrolling-element {
  height: 100dvh;
  > * {
    position: fixed;
  }
}
```

Instead, we could have the elements react the scroll position however we wanted.

```css{2-3,6-7}
.scrolling-element {
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: block;
  > * {
    position: fixed;
    animation: doSomethingCool linear;
    animation-timeline: --my-scroller;
  }
}
@keyframes doSomethingCool {
  100% {
    rotate: 2turn;
  }
}
```

Here’s that basic setup:

<CodePen
  user="chriscoyier"
  slug-hash="JoPNEjB"
  title="Simple Fixed Spinner"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

<BaselineStatus featureid="scroll-driven-animations" />

I bet you could imagine that this is the same exact trick for a “scroll position indicator” bit of UI. Position that `<div>` as like a 2px tall bar and have the `scaleX` transform go from 0 to 100% and donezo.

I’ll use the same spirit here to have a whole grid of cells use that “scale to zero” animation to reveal a hidden picture.

<CodePen
  user="chriscoyier"
  slug-hash="zxOqqpx"
  title="Here's Johnny - Scroll Driven Animations"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

I think that hidden picture thing is fun! I’m imagining a game where you have to guess the picture by scrolling down *as little as possible*. Like “name that tune” only “name that movie still” or whatever.

In this next one I took the idea a bit further and create randomized positions for each of the grid cells to “fly off” to (in SCSS).

<CodePen
  user="chriscoyier"
  slug-hash="YPKqqaV"
  title="You Win - Scroll Driven Animations - Different Take"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

I find that extraordinary that that kind of interaction can be done in HTML and CSS these days.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Driven & Fixed",
  "desc": "It's quite fun to have an element react to another element scrolling in an unexpected way! ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-fixed.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
