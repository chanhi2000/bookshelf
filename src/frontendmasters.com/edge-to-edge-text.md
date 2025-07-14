---
lang: en-US
title: "Edge to Edge Text"
description: "Article(s) > Edge to Edge Text"
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
      content: "Article(s) > Edge to Edge Text"
    - property: og:description
      content: "Edge to Edge Text"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/edge-to-edge-text.html
prev: /programming/css/articles/README.md
date: 2024-10-31
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4294
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
  name="Edge to Edge Text"
  desc="A rather exceptional CSS trick discovered by Roman Komarov that uses scroll driven animations to resize lines of text to fit exactly to their container."
  url="https://frontendmasters.com/blog/edge-to-edge-text/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4294"/>

I kid you not: Roman Komarov’s [<FontIcon icon="fas fa-globe"/>Fit-to-Width Text](https://kizu.dev/fit-to-width-text/) is one of my favorite CSS tricks I’ve ever seen. It’s, uh, quite a treat (that’s all you’re going to get here on Halloween, sorry). It’s just *so strange.* The end result is that you can size a line of text such that it hits the left and right edge of a container perfectly.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-31-at-12.41.00%E2%80%AFPM.png?resize=996%2C738&ssl=1)

This is a very legitimate need that people have been solving for ages. If the container is a fixed size, you can solve it by setting ultra specific font sizes. But more likely these days, containers are of unknown widths, leaving us to JavaScript for figuring out how big of text we can fit in there. [<FontIcon icon="fas fa-globe"/>FitText](http://fittextjs.com/) was a seminal example. These days, we can also do it with [**container units**](/frontendmasters.com/container-queries-and-units.md#what-are-container-query-units), but it’s still extremely fiddly. Wouldn’t it be nice to be like `font-size: make-it-fit;`?

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-31-at-12.41.41%E2%80%AFPM.png?resize=1024%2C671&ssl=1)

Roman’s trick is as close to that as can be. Check out [**his post**](/frontendmasters.com/container-queries-and-units.md#what-are-container-query-units) for all the details, but the core concept is that it uses scroll-driven animations. The text gets set *pretty big* by default, then a scroll-driven animation is set on it which runs scales the text *down* essentially until `animation-range: entry-crossing;` is fulfilled then stops. Here’s an example with just one word (free free to resize and see):

<CodePen
  user="chriscoyier"
  slug-hash="ExqLrqg"
  title="Fit Text with Scroll Driven Aniamtions"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The absolute core of the idea is:

```scss
@supports (animation-range: entry-crossing) {
  .fit-to-width {
    font-size: 12rem; /* max-font-size */
    overflow: hidden;

    & > * {
      inline-size: max-content;
      transform-origin: 0 0;
      animation: apply-text-ratio linear;
      animation-timeline: view(inline);
      animation-range: entry-crossing;
      display: block;
    }
  }
}

@keyframes apply-text-ratio {
  from {
    scale: 0;
    margin-block-end: -1lh;
  }
}
```

Like Roman’s original demo, it works great on multiple lines, actually showing off the power of the technique much better. The design of “multiple lines sized to fit exactly on a line” made me think of those “In this house we believe…” signs, so I made my own:

<CodePen
  user="chriscoyier"
  slug-hash="bGXexKz"
  title="My Yard Sign"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

That demo has `contenteditable` on it so you can mess with the letters and see it work.

If, like me, you have a hard time wrapping your mind around the trick, note that you can inspect the animations in Chrome DevTools and see how each span has a different length of animation:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-31-at-3.27.35%E2%80%AFPM.png?resize=1024%2C292&ssl=1)

I think the longer the animation the more the text *scales down toward zero.* Phew —I told you it was weird.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Edge to Edge Text",
  "desc": "A rather exceptional CSS trick discovered by Roman Komarov that uses scroll driven animations to resize lines of text to fit exactly to their container.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/edge-to-edge-text.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
