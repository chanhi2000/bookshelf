---
lang: en-US
title: "Named Scroll & View Timelines"
description: "Article(s) > Named Scroll & View Timelines"
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
      content: "Article(s) > Named Scroll & View Timelines"
    - property: og:description
      content: "Named Scroll & View Timelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/named-scroll-view-timelines.html
prev: /programming/css/articles/README.md
date: 2024-11-04
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4327
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
  name="Named Scroll & View Timelines"
  desc="If you give a scroll or view timeline a --custom-ident name, then any descendent can "
  url="https://frontendmasters.com/blog/named-scroll-view-timelines/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4327"/>

[**I just blogged about**](/frontendmasters.com/scroll-driven-sections.md) a way to pass information from an element that had a view timeline on itself down to it’s descendent elements. The idea is to set up CSS custom properties with `@property` and the `@keyframe` would animate those, thus the descendent’s would have access to them.

It [worked fine (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/gOVXVjj) (noting that scroll-driven animations are, so far, only in Chrome).

But Bramus [<VPIcon icon="fas fa-globe"/>noted](https://frontendmasters.com/blog/scroll-driven-sections/#comment-14255) that another possibility there was to *name* the view timeline and have the children reference that *instead*. His [<VPIcon icon="fa-brands fa-youtube"/>video on this](https://youtu.be/Dk1YA8dCgE0?list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=6&t=4s) is informative.

::: info Article Series

1. [Scroll-Driven… Sections](/frontendmasters.com/scroll-driven-sections.md)
2. [Named Scroll & View Timelines](/frontendmasters.com/named-scroll-view-timelines.md)
3. [(Up-) Scoped Scroll Timelines](/frontendmasters.com/scoped-scroll-timelines.md)
<!-- TODO: 업데이트 -->

:::

The update to my original demo was pretty easy to do. Remember it had a section with a “pull quote”. The section had the view timeline, the pull quote is what I was trying to animate. So here I *name* the timeline (and note the scroll direction: `block` means vertical in logical property world):

```css{5}
.has-pullquote {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
  view-timeline: --section-pullquote block;
}
 ```

You have to name the timeline with a `--double-sash` name like that, which in modern CSS parlance is referred to as **custom ident.** It looks like a custom property but it isn’t, it’s just a unique name.

Now that the timeline is named, any descendent can reference it for *it’s own* animation timeline. Again specific to my demo, I switched things up to work like this (just the basics):

```css{4}
blockquote {
  /* Pull quote styling... */
  animation: blockquote linear both;
  animation-timeline: --section-pullquote;
}
@keyframes blockquote {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
 ```

[Here’s an updated demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/GRVdWwr?editors=0100) using that technique instead of animating all custom properties.

<CodePen
  user="chriscoyier"
  slug-hash="GRVdWwr"
  title="Blockquote Scroller with Named View Timeline"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The actual demo updates a few more things just to have a bit more of a play and try things out. Notably, *one* of the effects still required me to animate a custom property still. That’s because I’m animating the color-stop of a gradient, and since that’s just *a part* of a whole valid value, it really needs to be done as a custom property.

Still, *most* of the animation work was moved over to using a keyframe applied directly to the descendent element itself, which I think is a logical improvement and I think it’s very cool how you can do that.

::: important Essentially

you can name a view (or scroll) animation timeline (`view-timeline` or `scroll-timeline`) and any descendent element can tap into it and base it’s animation off of that (`animation-timeline`).

:::

The fact that it works for descendents only is interesting to me. When I was playing with this to try to understand it, my first thought was to try to make a random element on the page have a `scroll-timeline` and another totally random element on the page “listen” to that one for it’s `animation-timeline`. I made them *siblings* and was confused why it wasn’t working. That ain’t gonna work, apparently, gotta have that parent/child thing going on. (Bramus’ [<VPIcon icon="fa-brands fa-youtube"/>video](https://youtu.be/Dk1YA8dCgE0?list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn&index=6&t=4s) notes another gotcha: intermediary parents with `overflow: hidden` ruining the effect, and a perfect solution: `overflow: clip`).

I updated my playing to make it a parent/child relationship, and here’s that silly idea:

<CodePen
  user="chriscoyier"
  slug-hash="JjgvNgJ"
  title="Scroll and Count in CSS Only"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There you can see the “number” using the “scroller”s `scroll-timeline` for it’s `animation-timeline` and “animating” an integer value. If I wanted to take that integer and place it *wherever* on the page, it’s somewhat limiting because the parent container necessarily has `overflow` on it so it scrolls.

It does make me wonder if anchor positioning or even some abuse of `popover` would be able to pop it out of that constrained container, but that’ll have to be an exploration for another day.

::: info Article Series

1. [Scroll-Driven… Sections](/frontendmasters.com/scroll-driven-sections.md)
2. [Named Scroll & View Timelines](/frontendmasters.com/named-scroll-view-timelines.md)
3. [(Up-) Scoped Scroll Timelines](/frontendmasters.com/scoped-scroll-timelines.md)
<!-- TODO: 업데이트 -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Named Scroll & View Timelines",
  "desc": "If you give a scroll or view timeline a --custom-ident name, then any descendent can ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/named-scroll-view-timelines.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
