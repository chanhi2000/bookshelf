---
lang: en-US
title: "Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar"
description: "Article(s) > Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar"
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
      content: "Article(s) > Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar"
    - property: og:description
      content: "Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/eliminate-jumps-in-horizontal-centering-by-forcing-a-scroll-bar.html
prev: /programming/css/articles/README.md
date: 2017-01-05
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
  name="Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar"
  desc="You are likely aware of the page centering technique of adding auto left and right margins to an outer div:"
  url="https://css-tricks.com/eliminate-jumps-in-horizontal-centering-by-forcing-a-scroll-bar"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

You are likely aware of the page centering technique of adding auto left and right margins to an outer div:

```css
#page-wrap {
  margin: 0 auto;
}
```

One of the shortcomings of this technique is that when used on websites with multiple pages, the layout can appear to “jump” a little bit when going back and forth between pages that require scroll bars and pages that do not. This is because the ~16px width of the scroll bar in the browser window causes the content area to become that much narrower and the wrap div re-centers itself in the narrower content area causing the jump.

One way to eliminate this jump is to force scroll bars onto every page regardless if they need them or not. This may annoy some purists out there, but I think it’s a decent solution.

This is one way to do it, which forces the page to always be just a little bit taller than the browser window forcing a right scroll bar:

```css
html {
  height: 100%;
  margin-bottom: 0.01em;
}
```

It’s a good idea, but it doesn’t seem to get the job done in Firefox.

Here is a way you can force only the right sidebar with a nasty and unsemantic hack:

```css
#scroll {
  position: absolute;
  top: 0;
  bottom: -0.1px;
  width: 1em;
  z-index: -1;
}
```

Then just include an empty div in your HTML with an id of “scroll”. Like I said, this is kind of a nasty way to do it, here is a much cleaner way:

```css
html {
  height: 102%;
}
```

Here is another solution, which effectively forces both horizontal and vertical scrollbars:

```css
html {
  overflow: scroll;
}
```

You can see an example of this working in [<FontIcon icon="iconfont icon-css-tricks"/>this example](https://css-tricks.com/examples/ForceScrollBar/). It would be nice if we could get just the vertical scroll bar by assigning overflow-y to scroll, ~but again it doesn’t work in Firefox.~ UPDATE: Actually, I’ve been shown the light. Assigning overflow-y to scroll **does work**, and it works in Firefox, Safari, and IE 6, and that makes it the **best solution**:

```css
html {
  overflow-y: scroll; 
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Eliminate “Jumps” in Horizontal Centering By Forcing a Scroll Bar",
  "desc": "You are likely aware of the page centering technique of adding auto left and right margins to an outer div:",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/eliminate-jumps-in-horizontal-centering-by-forcing-a-scroll-bar.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
