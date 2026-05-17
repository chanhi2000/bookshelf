---
lang: en-GB
title: "Spring Cleaning"
description: "Article(s) > Spring Cleaning"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Spring Cleaning"
    - property: og:description
      content: "Spring Cleaning"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/spring-cleaning-redesigning-dbushell-com.html
prev: /programming/css/articles/README.md
date: 2012-02-27
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
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
  name="Spring Cleaning"
  desc="Spring Cleaning"
  url="https://dbushell.com/2012/02/27/spring-cleaning-redesigning-dbushell-com/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **14 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

May 2011 — I [**redesigned**](/dbushell.com/designing-a-new-me.md) my website (this website) with the primary goal of making it *responsive*. I was happy with the result and it has served me well, but it also lacked some of the finesse of previous iterations. Never being satisfied, I deciding to partake in a little spring cleaning. Well, a little turned into *a lot*.

![dbushell.com design progression](https://dbushell.com/images/blog/2012/website-progression.png)

“Stage one” is live! A complete overhaul of the build and a touch of class to the design. You’re seeing it now (unless you’ve arrived here from a future redesign. In that case, how long did this one last?). “Stage two” will happen at some point later this year. It’s currently noted down as “do something with my portfolio”.

---

## The Design

In making my previous design responsive I focused too much on the build on not enough on the basics. This realignment is typographic at its core. I took it upon myself to set the whole site on a **baseline grid**. An unusual and difficult choice for a website design but the vertical rhythm has added a noticeable improvement.

**White space** is one of the most powerful elements of design and I’ve given it massive respect. When designing for multiple screen sizes finding a balance in proportions is a challenge. Here I’ve used a flexible grid with percentage-based margins to ensure content is framed beautifully.

I’m very pleased with the result! Though I’m a strong believer in pushing the boat out in regards to client work, some ideas are just too new and crazy to experiment with on anyone but yourself. This website will be a platform for all of those “what if…” moments of inspiration I have in the shower, or at the bottom of a pint glass. I have a few things in store.

---

## The Build

This time around I’ve finally tamed WordPress. Or at least we have agreed to mutual terms. Either way, the comments system now works properly and looks great so please tell me what you think. Alongside the usual clean-up of plugins this build has a few noteworthy aspects:

### Responsive Design

Just like the design, the whole build of this website is based around *typography*. Specifically, the CSS [<VPIcon icon="iconfont icon-w3c"/>`em` unit](https://w3.org/TR/css3-values/#font-relative-lengths) of which all font sizes, margins, and media queries are based. Without tying layout to content in this way design breaks down rather spectacularly when the base font size is adjusted.

Another practice I’ve heavily favoured in recent months is saying “no” to media query polyfills. I use to be a big fan of [<VPIcon icon="iconfont icon-github"/>`scottjehl/Respond`](https://github.com/scottjehl/Respond) — an ingenious piece of engineering no doubt — but is it really necessary? I don’t think so. The primary targets Internet Explorer 6, 7 & 8 don’t need to respond to mobile screen sizes. I simply serve up a semi-fluid build between around 960 and 1280, similar to [<VPIcon icon="fas fa-globe"/>Nicolas Gallagher’s technique](http://nicolasgallagher.com/mobile-first-css-sass-and-ie/) but without Sass (for now). Other browser that aren’t old-IE and don’t support media queries get the basic small screen version which is still highly readable, accessible, and nicely formatted.

I’ve also found that combining both `min-` and `max-width` media queries leads to tidier CSS. More planning is required but it does mean a lot less resetting of styles. If your mobile design is miles apart from the desktop layout — which it probably is — use `max-width` to scope those styles. I’m experimenting with `min-height` on this here website too, see if you can find it…

### Resolution Independence

After [**championing scalable vector graphics**](/smashingmagazine.com/resolution-independence-with-svg.md) in the biggest web design arena there is I thought it only right to make full use of the standard. Though CSS takes care of most of the visual design, I do have a few icons and logos. They’re now 100% SVG-ized. For a couple of other graphics I’m supplying high-res sources. My portfolio section is still lacking, but then I have large plans for that in the near future anyway. The iPad 3 is almost upon us! Is your website ready?

### Performance

Page speed has improved in all the places that make a different. I’m using [<VPIcon icon="fas fa-globe"/>Socialite.js](http://socialitejs.com/) to defer those nasty bandwidth hogging external resources — new version out soon! I’ve gone from 5 `@font-face` imports down to 1. ---

## Going Forward

This new design and build is all part of a grander scheme for the work I do online. I have quite a few new and old projects that need attention, some of which will be incorporated into this website. Barring a few bug fixes, version 6 of [<VPIcon icon="fas fa-globe"/>dbushell.com](https://dbushell.com/) is ready!

What do you think?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Spring Cleaning",
  "desc": "Spring Cleaning",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/spring-cleaning-redesigning-dbushell-com.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
