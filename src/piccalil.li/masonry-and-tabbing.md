---
lang: en-US
title: "I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry"
description: "Article(s) > I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry"
    - property: og:description
      content: "I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/masonry-and-tabbing.html
prev: /programming/css/articles/README.md
date: 2024-05-13
isOriginal: false
author:
  - name: Andy Bell
    url : https://piccalil.li/author/andy-bell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/fe191d2f680cf1fd73f795740e9aa8617d79f3c71028674745c49099b2f911a9/png?url=https://piccalil.li/og/masonry-and-tabbing/&width=1024&height=526&retina=true
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
  name="I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry"
  desc="There’s a lot of chatter about CSS masonry at the moment. Should it be called “masonry” and should it be grid? Let’s worry about the basics first."
  url="https://piccalil.li/blog/masonry-and-tabbing/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/fe191d2f680cf1fd73f795740e9aa8617d79f3c71028674745c49099b2f911a9/png?url=https://piccalil.li/og/masonry-and-tabbing/&width=1024&height=526&retina=true"/>

Back in 2022 I made this site: [<VPIcon icon="fas fa-globe"/>Be the browser’s mentor, not its micromanager](https://buildexcellentwebsit.es/). There’s some key principles on there which is a nice little collection of tiles.

![The tiles in Arc — a Chromium browser — render as a standard grid](https://piccalilli.imgix.net/images/blog/tiles-in-arc.jpg?auto=format&w=1500)

The trick during [<VPIcon icon="fa-brands fa-youtube"/>the talk](https://youtu.be/5uhIiI9Ld5M) — that I made this site for — was that the grid is actually progressively enhanced with masonry where browsers support it, but no one in the audience would have known that had I not told them. It’s the magic of progressive enhancement: everyone gets a fantastic experience, so they don’t even consider if they are getting the “best” experience. They already are because everything works for them.

Anyway, this is how it looks in Safari Technology Preview. It’s subtle, but it’s a nice enhancement.

![The tiles in Safari Technology Preview which supports masonry](https://piccalilli.imgix.net/images/blog/titles-in-safari.jpg?auto=format&w=1500)

The way the layout works is there’s a [<VPIcon icon="fas fa-globe"/>flexible layout composition](https://cube.fyi/composition.html), aptly named `.grid`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(
    var(--grid-placement, auto-fill),
    minmax(var(--grid-min-item-size, 16rem), 1fr)
  );
  gap: var(--gutter, var(--space-s-l));
}
```

Using a [<VPIcon icon="fas fa-globe"/>CUBE exception](https://cube.fyi/exception.html), I added a masonry enhancement:

```css
.grid[data-rows='masonry'] {
  grid-template-rows: masonry;
  align-items: start;
}
```

The nice thing about this exception is yes, it slaps the masonry `grid-template-rows` value in, but also, aligns items to the start, so they at least only size vertically to the size of the content where masonry isn’t available.

The reason I chose this pattern was because I knew there would be no tabbing issues because it’s just headings and paragraphs with one link. I created a little demo to show you the problem with tabbing in the current iteration of masonry, available in Firefox and Safari Technology preview:

<CodePen
  link="https://codepen.io/piccalilli/pen/QWRLppP/4d48e09379584b3ba36f9ee39b4b5f5b"
  title="Masonry"
  :default-tab="['css','result']"
  :theme="dark"/>

For those of you without those browsers, here’s what it looks like.

<VidStack src="https://assets.codepen.io/174183/masonry-tabbing.mp4" />

The tabbing order is *wild* — especially in Firefox. That’s sorta expected though because masonry layouts pack items into available space to get that stonework-like effect — hence the name masonry.

This is a real problem though because with one line of CSS you can create a pretty serious accessibility issue. I dunno how it would get fixed, so maybe the best thing is for me to warn you not to use masonry if there’s focusable elements in play.

---

## Which opinion on syntax do I have?

[<VPIcon icon="fa-brands fa-safari"/>WebKit asked for opinions](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/) and [<VPIcon icon="fa-brands fa-chrome"/>Google answered](https://developer.chrome.com/blog/masonry), so here’s my opinion. I honestly don’t mind either of their approaches. I was thinking a while ago masonry feels like a flexbox kind of deal because by nature of a masonry layout, it’s flexible, which to me screams flexbox. I am not smart enough for CSS specs though, so I’ll take whatever I’m given as long as it works.

Masonry is already available as a grid value though. What do sites that already use that experimental value do? Sure it’s part of a one-liner, but [<VPIcon icon="fa-brands fa-chrome"/>Google’s suggestion certainly isn’t](https://developer.chrome.com/blog/masonry). It’s a whole layout system in itself, which is a hell of a refactor! On the flip-side, I’m sure we’d rather have agreed standards than potentially half-baked ideas.

To be honest, I think masonry as a design pattern is pretty darn antiquated. I liked the [<VPIcon icon="fa-brands fa-safari"/>example that Jen used in the WebKit post](https://webkit.org/wp-content/uploads/image7-megamenu-light.png) — using masonry to tidy up one of those mega menus — but in reality, unless you’re building Pintrest or Unsplash-like photographic UIs, you can probably do better without masonry anyway, which begs the question: are there better things for the browsers to be focusing on?

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "I’m worried about the tabbing behaviour, rather than the syntax and name of CSS masonry",
  "desc": "There’s a lot of chatter about CSS masonry at the moment. Should it be called “masonry” and should it be grid? Let’s worry about the basics first.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/masonry-and-tabbing.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
