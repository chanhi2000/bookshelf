---
lang: en-US
title: "CSS Scroll Snap Points"
description: "Article(s) > CSS Scroll Snap Points"
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
      content: "Article(s) > CSS Scroll Snap Points"
    - property: og:description
      content: "CSS Scroll Snap Points"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-scroll-snap-points.html
prev: /programming/css/articles/README.md
date: 2013-12-09
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
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

```component VPCard
{
  "title": "CSS Scroll Snap Points",
  "desc": "Great to see this proposed (many people are using it nowadays, boosted by the iPhone 5s page). .gallery { scroll-snap-type: mandatory; scroll-snap-points-x: snapList(786px, 1643px, 2483px, 3264px, 4054px, 4402px); } Don’t like the fact that one needs to specify explicit values (be it in pixels, ems, or percentages), as not all children can be of the … Continue reading ”CSS Scroll Snap Points”",
  "link": "https://bram.us/2013/12/08/css-scroll-snap-points/",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

Great to see this proposed (many people are using it nowadays, boosted by [<VPIcon icon="fa-brands fa-apple"/>the iPhone 5s page](http://apple.com/iphone-5s/)).

```css
.gallery {
  scroll-snap-type: mandatory;
  scroll-snap-points-x: snapList(786px, 1643px, 2483px, 3264px, 4054px, 4402px);
}
```

Don’t like the fact that one needs to specify explicit values (be it in pixels, ems, or percentages), as not all children can be of the same height/width for example (think a set of images placed horizontally next to eachother: some may be in landscape and some in portrait mode). To bypass this a CSS (direct) child selector would seem more appropriate (just a proposal I’m making here):

```css
.gallery {
  scroll-snap-type: mandatory;
  scroll-snap-points-x: '> article';
}
```

Looking forward to see where this is headed.

<SiteInfo
  name="Setting native-like scrolling offsets in CSS with Scrolling Snap Points"
  desc="One of the arguments in favour of native vs. Web is that of user experience; particularly when it comes to scrolling. A typical interaction on touch screens (especially tablets) is the sideways swipe..."
  url="https://generatedcontent.org/post/66817675443/setting-native-like-scrolling-offsets-in-css-with/"
  logo="https://64.media.tumblr.com/avatar_d3ad4dc13583_128.pnj"
  preview="https://64.media.tumblr.com/a706796fc456aa7525a10b3265009a0f/300c56d924042f16-02/s500x750/b1f277e2594fdc
  6592d7a23cb1d9e853c53c1825.png"/>

```component VPCard
{
  "title": "CSS Scroll Snap Module Level 1",
  "desc": "This module contains features to control panning and scrolling behavior with “snap positions”. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.",
  "link": "https://drafts.csswg.org/css-snappoints//",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Scroll Snap Points",
  "desc": "Great to see this proposed (many people are using it nowadays, boosted by the iPhone 5s page). .gallery { scroll-snap-type: mandatory; scroll-snap-points-x: snapList(786px, 1643px, 2483px, 3264px, 4054px, 4402px); } Don’t like the fact that one needs to specify explicit values (be it in pixels, ems, or percentages), as not all children can be of the … Continue reading ”CSS Scroll Snap Points”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-scroll-snap-points.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
