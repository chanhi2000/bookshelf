---
lang: en-US
title: "Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up."
description: "Article(s) > Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up."
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
      content: "Article(s) > Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up."
    - property: og:description
      content: "Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/solved-by-css-scroll-state-queries-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up.html
prev: /programming/css/articles/README.md
date: 2025-10-23
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/10/scroll-state-scrolled.gif
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
  name="Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up."
  desc="There’s a new type of CSS scroll-state query coming: scrolled"
  url="https://bram.us/2025/10/22/solved-by-css-scroll-state-queries-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/10/scroll-state-scrolled.gif"/>

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2025/10/scroll-state-scrolled.mp4" />

<CodePen
  user="bramus"
  slug-hash="qEboVXG"
  title="Hidey Bar Demo (Hide on Scroll Down, Show on Scroll Up // Scroll State Queries)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There’s a new type of CSS scroll-state query coming: `scrolled`

Unlike [<VPIcon icon="fa-brands fa-chrome"/>the `scrollable` scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries#scrollable), `scrolled` remembers the last direction you scrolled into, which you can use to build “hidey bars”: when scrolling down (or having scrolled down), the hidey bar hides itself. When then scrolling back up, the hidey bar reveals itself.

Here’s the code that is needed to hide a fixed header when scrolling down:

```css
html {
  container-type: scroll-state;
}

header {
  transition: translate 0.25s;
  translate: 0 0;

  /* Slide header up when last having scrolled towards the bottom */
  @container scroll-state(scrolled: bottom) {
    translate: 0 -100%;
  }
}
```

::: note

Good suggestion [<VPIcon icon="fas fa-globe"/>by meduz on Mastodon](https://front-end.social/@meduz@m.nintendojo.fr/115418937883458955), in case the header contains some interactive content that you can focus:

> Use `header:not(:focus-within)` to avoid hiding the bar if there’s focus in it.

:::

Below is a live demo using the code above. You can try it out yourself in Chrome Canary with the experimental Web Platform Features Flag enabled. If you browser does not support `scrolled` scroll-state queries, the header will remain fixed in place – a nice progressive enhancement if you’d ask me 🙂

<CodePen
  user="bramus"
  slug-hash="qEboVXG"
  title="Hidey Bar Demo (Hide on Scroll Down, Show on Scroll Up // Scroll State Queries)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The feature is expected to ship to Chrome Stable in Chrome 144. ~

::: note

If that demo looks familiar: I featured it here on bram.us before, as a demo to [**use scroll-driven animations to track and remember the scroll direction**](/bram.us/solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-up-show-it-again-when-scrolling-down.md). Thanks to `scrolled` scroll-state queries, that hack is no longer needed 🙂

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Solved by CSS Scroll State Queries: hide a header when scrolling down, show it again when scrolling up.",
  "desc": "There’s a new type of CSS scroll-state query coming: scrolled",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/solved-by-css-scroll-state-queries-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
