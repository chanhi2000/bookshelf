---
lang: en-GB
title: "A Bit of a New Look"
description: "Article(s) > A Bit of a New Look"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - dbushell.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Bit of a New Look"
    - property: og:description
      content: "A Bit of a New Look"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/a-bit-of-a-new-look.html
prev: /academics/system-design/articles/README.md
date: 2016-02-29
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Bit of a New Look"
  desc="A Bit of a New Look"
  url="https://dbushell.com/2016/02/29/a-bit-of-a-new-look/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **10 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

I redesigned my website!

This iteration has taken longer than usual because the visual changes are much more dramatic. I’m really pleased with the results:

![dbushell.com design circa 2016](https://dbushell.com/images/blog/2016/dbushell-v8-intro.png)

It’s been two years since I last updated the design. That is a record because it’s usually an annual tradition. Past updates include: [**2014**](/dbushell.com/spring-refresh.md), [**2013**](/dbushell.com/a-new-home.md), [**2012**](/dbushell.com/spring-cleaning-redesigning-dbushell-com.md), and [**2011**](/dbushell.com/designing-a-new-me.md). Last year I improved [**performance**](/dbushell.com/critical-css-and-performance.md) and [**deployment**](/dbushell.com/wordpress-to-metalsmith.md).

---

## Business priorities

While I loved the simplicity of my previous homepage, it wasn’t selling me as a business. It made for a wonderful portfolio cover but nowadays I need to convert passersby into paying clients. That means content (and sparkles).

I’m in the process of rewriting [<VPIcon icon="fas fa-globe"/>my services](https://dbushell.com/services/) page and I’ve introduced two new pages speaking directly to [<VPIcon icon="fas fa-globe"/>clients](https://dbushell.com/working-with-clients/) and [<VPIcon icon="fas fa-globe"/>web agencies](https://dbushell.com/working-with-agencies/). The content is, as always, a work in progress.

---

## Design inspiration

The retro style emerged from the small “For Hire” sign I created for my sidebar/footer last year. It was well received but a few people noted it could be mistaken for an ad because it didn’t fit into my design. Too nice to consider removing, I realised it was the ideal starting point to inject more colour and personality into my website.

![dbushell.com brand colours](https://dbushell.com/assets/images/dbushell-for-hire.svg)

dbushell.com brand colours

I spent a long time adjusting the colours to discover the perfect palette:

![dbushell.com brand colours](https://dbushell.com/images/blog/2016/dbushell-v8-colours.svg)

dbushell.com brand colours

And from here I experimented with typography. I wasn’t sure how the script/hand-written style would translate online. It’s tricky because such a variety in weights doesn’t suit the web. Web fonts are heavy; a big performance cost. Ultimately I knew this style wouldn’t be viable to use for headings. I settled on a simple sans-serif, [<VPIcon icon="fas fa-globe"/>Futura](https://typekit.com/fonts/futura-pt) being the natural choice.

---

## Responsive navigation

I’ve always been a fan of off-canvas navigation but I was concerned my previous version was a little too hidden. Is a link unseen a link unclicked? I’ll put that hypothesis to the test. My new design has a fixed header with an overflow menu that prioritises key pages.

![dbushell.com responsive navigation](https://dbushell.com/images/blog/2016/dbushell-v8-nav.gif)

---

## The build

I was short on time to complete this project (if I ever wanted to ship something). Rather than building from scratch I decided to use my existing CSS as a foundation. Things have gotten a little messy because I didn’t have a clear vision for the design initially. My front-end optimisation has regressed but after launch I’ll tighten up the bolts.

Previous incarnations of my website have had ridiculously good support for legacy browsers. Unnecessarily so, but I’ve always seen it as an exercise in “best practice”. When building from the ground up, progressive enhancement makes such support a natural by-product, for the most part! Retrofitting on the other hand isn’t so simple and requires more dedicated testing. In the interest of my own sanity I’ve abandoned old IE. No one would have noticed, I know my analytics, but it still feels a shame to lose that backwards compatibility. That said, it’s still looking good in IE9!

---

## Just because I can

My [**old typography**](/dbushell.com/two-week-build.md#typography) used CSS gradients and text shadows to create custom link underlines. I’ve taken this one step further:

![dbushell.com link hover effect](https://dbushell.com/images/blog/2016/dbushell-v8-links.gif)

Yeah I know, the animations are overkill, but so many websites these days don’t even underline links. It’s a bit of fun for now.

What do you think? Like my new website? Let me know on Twitter [<VPIcon icon="fas fa-mastodon"/>`@dbushell`](https://social.lol/@db/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Bit of a New Look",
  "desc": "A Bit of a New Look",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/a-bit-of-a-new-look.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
