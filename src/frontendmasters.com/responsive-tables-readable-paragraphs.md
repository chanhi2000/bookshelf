---
lang: en-US
title: "Responsive Tables & Readable Paragraphs"
description: "Article(s) > Responsive Tables & Readable Paragraphs"
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
      content: "Article(s) > Responsive Tables & Readable Paragraphs"
    - property: og:description
      content: "Responsive Tables & Readable Paragraphs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/responsive-tables-readable-paragraphs.html
prev: /programming/css/articles/README.md
date: 2024-12-11
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4725
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
  name="Responsive Tables & Readable Paragraphs"
  desc="You can make a table responsive by letting it horizontally scroll. But if you do that, make sure any paragraph style text isn't any wider than the screen."
  url="https://frontendmasters.com/blog/responsive-tables-readable-paragraphs/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4725"/>

I have this habit where when I’m watching a TV show where I like to read about it on my phone while I’m watching it. Reviews, summaries, fan theories, whatever. Seems like that would be distracting — but I think it’s extra engaging sometimes. I’d often end up on Wikipedia where they do episode informational summaries in a particular layout where the small screen layout had a horribly obnoxious side effect.

Here (was) the issue:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/CleanShot-2024-12-05-at-11.26.07%402x.png?resize=573%2C1024&ssl=1)

To their credit, they made the data table responsive in that it’s not zoomed out or cut off, you can horizontally scroll it. But horizontal scrolling is super terrible when you’re trying to read a paragraph of text.

Also to their credit, they’ve also (recently?) made this a bit better.

They put a wrapper element over the show description and added `max-width: 90vw;` to the styles. It was kinda funny though, as I happen to notice that and I was looking at a page where that was *still a smidge too wide* and it was cutting off like 50px of text so there was still a bit of horizontal scrolling needed.

The problem is that `90vw` is a **“magic number”**. It’s essentially saying “pretty close to the width of the screen, but like, not all of it, because there is some padding and stuff the account for.” It’s just a guess. I get it, sometimes you gotta just be close and move on, but here I’ve literally seen it fail, which is the whole downside of magic numbers.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/Screenshot-2024-12-05-at-11.33.40%E2%80%AFAM-1.png?resize=837%2C1024&ssl=1)

If they were trying to be perfect about it, that `max-width` would be set to account for all the other spacing. Something like:

```css
.shortSummaryText {
  /* 
  Viewport width minus 1rem of body padding on each side 
  and 0.5rem of padding inside the table cell, 
  minus the borders. 
  */
  max-width: calc(100dvw - 3rem - 2px); 
}
```

Maybe those things are custom properties that could be grabbed, which would be even nicer. This kind of thing can be hard to maintain so I get it.

Notice in the screenshot above they also added `position: sticky;` and stuck it to the `left` side, which is a super classy touch! That way when the table is scrolled to see the other bits of information in a row, the readable paragraphs stay readable, rather than scroll over into just blank white nothingness.

I did a fork of the classic [<VPIcon icon="fas fa-globe"/>Under-Engineered Responsive Tables](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html) to include this feature.

<CodePen
  user="chriscoyier"
  slug-hash="EaYPbGE"
  title="Under-Engineered Responsive Table (with paragraph width alteration)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Tables & Readable Paragraphs",
  "desc": "You can make a table responsive by letting it horizontally scroll. But if you do that, make sure any paragraph style text isn't any wider than the screen.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/responsive-tables-readable-paragraphs.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
