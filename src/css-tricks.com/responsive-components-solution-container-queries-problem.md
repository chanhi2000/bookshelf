---
lang: en-US
title: "Responsive Components: a Solution to the Container Queries Problem"
description: "Article(s) > Responsive Components: a Solution to the Container Queries Problem"
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
      content: "Article(s) > Responsive Components: a Solution to the Container Queries Problem"
    - property: og:description
      content: "Responsive Components: a Solution to the Container Queries Problem"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-components-solution-container-queries-problem.html
prev: /programming/css/articles/README.md
date: 2018-02-28
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Responsive Components: a Solution to the Container Queries Problem"
  desc="Container Queries, as in, the ability to style elements based on values from a particular element, like its width and height. We have media queries, but those"
  url="https://css-tricks.com/responsive-components-solution-container-queries-problem"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

*Container Queries*, as in, the ability to style elements based on values from a particular element, like its width and height. We have media queries, but those are based on the viewport not individual elements. There are [<VPIcon icon="fas fa-globe"/>plenty](https://justmarkup.com/demos/container-queries/index.html) of [<VPIcon icon="fas fa-globe"/>use cases](https://wicg.github.io/cq-usecases/#usecases) for them. It’s been said before, but I’ll say it again, if container queries existed, *the vast majority of media queries in CSS would actually be container queries*.

Discussion about how to pull it off technologically gets interesting. In my mind, ideally, we get this ability right in CSS. The trouble with doing it this way is one of circularity. Not even in regards to being able to write CSS that triggers a scenario in which the query doesn’t match anymore, which is tricky enough, but literally changing the long-standing single-pass way in which browsers render a page.

There are plenty of takes at solving this. All JavaScript of course. Dave Rupert [rounded some of them up here (<VPIcon icon="iconfont icon-github"/>`davatron5000`)](https://gist.github.com/davatron5000/bbede54cf189bf53e4de). They are all a bit different.

Seems to me the most well-suited JavaScript API for this is [<VPIcon icon="fa-brands fa-chrome"/>`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver). It’s Chrome-only as I write, but here’s a chart that should stay updated in time:

This browser support data is from [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](http://caniuse.com/#feat=resizeobserver), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 64 | 69 | No | 79 | 13.1 |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 142 | 144 | 142 | 13.4-13.7 |

That was a heck of a lot of words to intro the fact that Philip Walton just wrote [<VPIcon icon="fas fa-globe"/>a hell of an article](https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/) about doing just this. The core of it is that you use ResizeOveserver to toss classes onto elements, then style them with those classes. He concludes:

> The strategy outlined in this article:
> 
> - Will work, today, on any website
> - Is easy to implement (copy/paste-able)
> - Performs just as well as a CSS-based solution
> - Doesn’t require any specific libraries, frameworks, or build tools.
> - Leverages progressive enhancement, so users on browser that lack the required APIs or have JavaScript disabled can still use the site.

The browser support for `ResizeObserver` is a little scary, but it’s such a nice API I would expect more widespread support sooner than later.

```component VPCard
{
  "title": "Responsive Components: a Solution to the Container Queries Problem",
  "desc": "Thoughts on web development, open source, software architecture, and the future.",
  "link": "https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem//",
  "logo": "https://philipwalton.com/static/favicon-16x16-066aacdaeb.png",
  "background": "rgba(244,245,255,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Components: a Solution to the Container Queries Problem",
  "desc": "Container Queries, as in, the ability to style elements based on values from a particular element, like its width and height. We have media queries, but those",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-components-solution-container-queries-problem.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
