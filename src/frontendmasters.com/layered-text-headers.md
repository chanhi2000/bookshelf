---
lang: en-US
title: "Layered Text Headers"
description: "Article(s) > Layered Text Headers"
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
      content: "Article(s) > Layered Text Headers"
    - property: og:description
      content: "Layered Text Headers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/layered-text-headers.html
prev: /programming/css/articles/README.md
date: 2025-03-24
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5448
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
  name="Layered Text Headers"
  desc="Being able to control the `paint-order` in CSS means you can push the stroke behind the fill, fixing awkward issues with ruining letterform readability. "
  url="https://frontendmasters.com/blog/layered-text-headers/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5448"/>

There is a way to apply a stroke to web text across all browsers:

```css
.stroke-text {
  -webkit-text-stroke: 5px red;
}
```

Despite the vendor prefix there, it works across all browsers.

But I’ve never liked it… until recently.

I’m not sure if I’ve ever spelled out exactly why, so first let me do that. Here’s a nice R from [<VPIcon icon="fas fa-globe"/>Roslindale](https://djr.com/roslindale/).

![Black letter "R" from Roslindale font.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-8.13.27%E2%80%AFAM.png?resize=490%2C526&ssl=1)

Which is made up of vector points like all fonts:

![The same letter R as above except with blue points showing off the vector points of the letterform. Screenshot from Adobe Illustrator. ](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/CleanShot-2025-03-24-at-08.13.48%402x.png?resize=452%2C422&ssl=1)

In an application like Adobe Illustrator which gives me control over how a vector shape applies a stroke, if I stroke the *outside* it ends up looking OK as **the integrity of the letterform is preserved**.

![Gray stroke applied to the outside of the letter "R" from Roslindale.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-8.16.17%E2%80%AFAM.png?resize=784%2C804&ssl=1)

It’s a bit harder to do with Roslindale “R” with the narrow passages at the top and middle of the letterform here, but we can apply stroke to the *inside* as well and the overall shape of the letter stays the same.

![Red stroke applied to the inside of the letter "R" from Roslindale. Only 1px of stroke though because of the narrow passages. ](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-8.17.31%E2%80%AFAM.png?resize=604%2C654&ssl=1)

But if we apply a stroke to the *“middle”*, that is, straddled across the edge of the shape such that the stroke is equal on both sides, now we’ve ruined the shape of the letter and it looks like 💩.

![Green centered-aligned stroke around letter "R" from Roslindale, wrecking the letterform. ](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-8.18.02%E2%80%AFAM.png?resize=728%2C684&ssl=1)

This is even more pronounced as we deal with more text.

![Top: Outside stroke<br/>Middle: Inside stroke<br/>Bottom: Center stroke 💩](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-8.26.32%E2%80%AFAM.png?resize=1024%2C543&ssl=1)

Point is: **center aligned stroke sucks.** And guess what the only option is for `-webkit-text-stroke`? Center-aligned. And, equally sadly, all strokes in SVG, a bonkers omission for a vector painting specific language.

Alas there is a half decent and kinda fun workaround. The trick is essentially using `paint-order` (which works in CSS and SVG) to make sure that the “fill” of the element is drawn on top of the “stroke”, which effectively makes the stroke appear as if it’s outside-aligned even if it’s not actually doing that.

```css
.stroke-text {
  paint-order: stroke fill; /* fill is on top */
  -webkit-text-stroke: 5px red;
}
```

With this combo we can make stroked text tolerable:

<CodePen
  user="chriscoyier"
  slug-hash="emYKxWM"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Just putting that fill on top can fix some different awkward situations. Here’s Adam Argyle showing how a `text-shadow` can really interfere, and then fixing it by forcing that fill layer back on top again.

<CodePen
  user="argyleink"
  slug-hash="MWoeoKV"
  title="Super CSS World - a paint-order demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Wes Bos showed this off, layering on some `text-shadow` stuff as well, which resulted in a great look:

I had a play as well, and I really like the combination of being able to use a text stroke safely *and* being able to use a text shadow for an additional effect. Here the shadow comes up on top of the text giving it an actual embossed look:

<CodePen
  user="chriscoyier"
  slug-hash="mdNgVvR"
  title="Layered Text - Music Stuff Giveaway"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

You could have a play with this one, adding more text shadows or adjusting colors or whatever to get a nice look.

<CodePen
  user="chriscoyier"
  slug-hash="xbxzLxq"
  title="Layered Text 2"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Perhaps goes without saying but I’ll say it anyway: thicker typefaces are going to generally work better with this.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Layered Text Headers",
  "desc": "Being able to control the `paint-order` in CSS means you can push the stroke behind the fill, fixing awkward issues with ruining letterform readability. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/layered-text-headers.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
