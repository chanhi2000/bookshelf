---
lang: en-US
title: "Masonry and reading order"
description: "Article(s) > Masonry and reading order"
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
      content: "Article(s) > Masonry and reading order"
    - property: og:description
      content: "Masonry and reading order"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/masonry-and-reading-order.html
prev: /programming/css/articles/README.md
date: 2024-06-10
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2579
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
  name="Masonry and reading order"
  desc="Two months back there was a bit of a hubbub about masonry layout in CSS with Jen at Apple making a case and Rachel at Google agreeing those use cases would be great, but should be based on display: masonry; not display: grid;. Then: nothing. Web standards just move at the pace that it moves […]"
  url="https://frontendmasters.com/blog/masonry-and-reading-order/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2579"/>

Two months back there was a bit of a hubbub about masonry layout in CSS with [<VPIcon icon="iconfont icon-webkit"/>Jen at Apple making a case](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/) and [<VPIcon icon="fa-brands fa-chrome"/>Rachel at Google agreeing](https://developer.chrome.com/blog/masonry) those use cases would be great, but should be based on `display: masonry;` not `display: grid;`.

Then: nothing. Web standards just move at the pace that it moves and that’s usually [<VPIcon icon="fas fa-globe"/>good slow](https://arc.net/l/quote/ubuyloem). But I admit I’m a little surprised that it’s been radio silence. I think there is a CSS Working Group meeting in Spain this very week though so we’ll see if that ignites anything.

[**My own feedback**](/frontendmasters.com/feedback-on-masonry-layout.md) said [this is partially a conversation about tabbing order](/frontendmasters.com/feedback-on-masonry-layout.md), and it definitely [**is**](/piccalil.li/masonry-and-tabbing.md). So then the bigger question becomes, does this tabbing issue need to be solved *as a part of masonry*? Or can we solve it more broadly? [<VPIcon icon="fas fa-globe"/>Rachel introduces the idea](https://rachelandrew.co.uk/archives/2024/05/26/masonry-and-reading-order/) that it *[<VPIcon icon="fas fa-globe"/>can](https://drafts.csswg.org/css-display-4/#reading-order-items)* be more broadly solved.

> … my personal hope is that we can land the proposal for`reading-order-items`before we have interoperable masonry, in whatever form it takes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Masonry and reading order",
  "desc": "Two months back there was a bit of a hubbub about masonry layout in CSS with Jen at Apple making a case and Rachel at Google agreeing those use cases would be great, but should be based on display: masonry; not display: grid;. Then: nothing. Web standards just move at the pace that it moves […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/masonry-and-reading-order.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
