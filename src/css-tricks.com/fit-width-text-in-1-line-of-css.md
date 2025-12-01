---
lang: en-US
title: "Fit width text in 1 line of CSS"
description: "Article(s) > Fit width text in 1 line of CSS"
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
      content: "Article(s) > Fit width text in 1 line of CSS"
    - property: og:description
      content: "Fit width text in 1 line of CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/fit-width-text-in-1-line-of-css.html
prev: /programming/css/articles/README.md
date: 2025-12-09
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/04/type-scale.png
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
  name="Fit width text in 1 line of CSS"
  desc="The Chrome team recently prototyped a working solution for fitting text to the width of a container in CSS using a text-grow property."
  url="https://css-tricks.com/fit-width-text-in-1-line-of-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/04/type-scale.png"/>

[<VPIcon icon="fas fa-globe"/>From Adam](https://nerdy.dev/css-text-grow), prototyped in Chrome Canary 145:

```css
h1 {
  text-grow: per-line scale;
}
```

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/12/text-grow.mov" />

[**Danny discussed this**](/css-tricks.com/setting-line-length-in-css-and-fitting-text-to-a-container.md#watch-for-new-text-grow-text-shrink-properties) a while back when looking at different approaches for fitting text to a container, spelling out the syntax (`text-shrink` included) that you can find in [Roma Komarov’s explainer (<VPIcon icon="iconfont icon-github"/>`xplainers-by-googlers/css-fit-text`)](https://github.com/explainers-by-googlers/css-fit-text/blob/main/README.md):

```css
text-grow: <fit-target> <fit-method>? <length>?;
text-shrink: <fit-target> <fit-method>? <length>?;
```

---

## `<fit-target>`

- `per-line`: For `text-grow`, lines of text shorter than the container will grow to fit it. For `text-shrink`, lines of text *longer* than the container will *shrink* to fit it.
- `consistent`: For `text-grow`, the shortest line will grow to fit the container while all other lines grow by the same scaling factor. For `text-shrink`, the *longest* line will *shrink* to fit the container while all other lines shrink by the same scaling factor.

---

## `<fit-method>` (optional)

- `scale`: Scale the glyphs instead of changing the `font-size`.
- `scale-inline`: Scale the glyphs instead of changing the `font-size`, but only horizontally.
- `font-size`: Grow or shrink the font size accordingly.
- `letter-spacing`: The letter spacing will grow/shrink instead of the `font-size`.

---

## `<length>` (optional)

- The maximum font size for `text-grow` or minimum font size for `text-shrink`.

Notice the different fit methods — they either scale the glyphs or adjust the text’s actual `font-size`. So, naturally, the explainer [notes (<VPIcon icon="iconfont icon-github"/>`explainers-by-googlers/css-fit-text`)](https://github.com/explainers-by-googlers/css-fit-text/blob/main/README.md#detailed-design-discussion) that accessibility concerns are still being worked out. Like:

> If an end-user tries to enlarge font size, UAs should not fit enlarged lines to the container width. Is minimum-font setting enough?

Speaking of open questions, [<VPIcon icon="fas fa-globe"/>Una Kravets highlights a few on Bluesky](https://bsky.app/profile/una.im/post/3m7azmmmnes2k):

> - Should the last line of a paragraph be scaled?
> - Is the current line-height behavior as expected?
> - Should it scale non-text parts such as inline images together?

You can [contribute to the discussion (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-draftsf`)](https://github.com/w3c/csswg-drafts/issues/2528) in the GitHub issue, of course.

[<VPIcon icon="fas fa-globe"/>Donnie D’Amato wonders](https://blog.damato.design/posts/fit-text-responsibly/) if, perhaps, this idea is better suited for print styles rather than screens. That’s an excellent use case I hadn’t thought of.

We sure have come a long way from [**the days of magic numbers and FitText.js**](/css-tricks.com/fitting-text-to-a-container.md)!

<SiteInfo
  name="CSS Text Grow · December 5, 2025"
  desc="Fit width text in 1 line of CSS: h1 { text-grow : per-line scale ; } Prototype available in Canary 145+ Codepen · CSSWG · Explainer · Prior Art"
  url="https://nerdy.dev/"
  logo="https://nerdy.dev/favicon.svg"
  preview="https://nerdy.dev/media/text-grow.avif"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fit width text in 1 line of CSS",
  "desc": "The Chrome team recently prototyped a working solution for fitting text to the width of a container in CSS using a text-grow property.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/fit-width-text-in-1-line-of-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
