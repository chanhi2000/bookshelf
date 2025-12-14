---
lang: en-US
title: "What Else Could Container Queries... Query?"
description: "Article(s) > What Else Could Container Queries... Query?"
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
      content: "Article(s) > What Else Could Container Queries... Query?"
    - property: og:description
      content: "What Else Could Container Queries... Query?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/what-else-could-container-queries-query.html
prev: /programming/css/articles/README.md
date: 2025-12-12
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/container-style-queries.png
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
  name="What Else Could Container Queries... Query?"
  desc="How far can we really go with container queries? There are dozens of media queries now, so what if there were dozens of container queries as well? What could we use them for?"
  url="https://css-tricks.com/what-else-could-container-queries-query"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/container-style-queries.png"/>

I’ll admit, when container queries first shipped back in 2022, I didn’t really pay attention. I mean, why [**container size queries**](/css-tricks.com/smart-layouts-with-container-queries.md) when we already have [**media queries**](/css-tricks.com/a-complete-guide-to-css-media-queries.md)? Why [**container style queries**](/css-tricks.com/digging-deeper-into-container-style-queries.md) when custom properties inherit anyway (they don’t work with standard properties… *yet*)? Their use cases seemed like edge cases to me, enabling us to do things that we could already do but in a different way.

Here’s a container size queries demo by [<VPIcon icon="iconfont icon-css-tricks"/>Kevin Powell](https://css-tricks.com/author/kevinpowell/). As a note, all major browsers support size queries in the following demo, but other demos in this article may require the latest Chrome.

<CodePen
  user="anon"
  slug-hash="NWZgQwE"
  title="container queries are awesome part 4 - smart design patterns"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Container style queries (with the new [**range syntax**](/css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if.md)) demo by, *uh*, me:

<CodePen
  user="anon"
  slug-hash="raxpXLO"
  title="CSS range syntax demo (container style queries and CSS variables)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And more recently, we’ve seen a couple more types of container queries pop up.

### Container Scroll-State Queries

Container scroll-state queries came along with their unique capabilities — the ability to find out whether a container is scrollable, or is scroll-snapped to a scroll target, or has `position: sticky` and is ‘stuck.’ Literally, as I’m writing this, Chrome announced [<VPIcon icon="fa-brands fa-chrome"/>`scrolled` support](https://developer.chrome.com/blog/chrome-144-beta?hl=en#scroll-state_scrolled_support), which is a bit different to `scrollable`.

Container scroll-state queries demo by our very own [<VPIcon icon="iconfont icon-css-tricks"/>Geoff Graham](https://css-tricks.com/author/geoffgraham/):

<CodePen
  user="anon"
  slug-hash="OPLwNma"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And that’s not all we’ve got…

### Anchored container queries

The latest container query feature is [<VPIcon icon="fa-brands fa-chrome"/>anchored container queries](https://developer.chrome.com/blog/anchored-container-queries), which enable us to query fallback positions. Imagine that you anchor-position a tooltip caret to the left side of a tooltip, but then there’s no room to display the tooltip, so you flip it to the opposite side of whatever triggers it using `position-try-fallbacks: flip-inline`. Well, an anchored container query can detect when the tooltip position is flipped so that we can also flip the tooltip caret to the opposite side of the tooltip.

<CodePen
  user="anon"
  slug-hash="gbrMGYx"
  title="Anchored container queries demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### What else?

So, it got me thinking, *how far can we really go with container queries?* [**There are dozens of media queries now**](/css-tricks.com/a-complete-guide-to-css-media-queries.md), so what if there were dozens of container queries as well? What could we use them for?

#### Get any computed value

Recently I was exploring [**the current and future methods of getting the value of a CSS property and using it with another property**](/css-tricks.com/on-inheriting-and-sharing-property-values.md), and as you can imagine, container size queries were mentioned since they unlock [**container query units**](/css-tricks.com/css-length-units.md#relative-units). I mean, have you ever added a wrapper element or defined an existing one as a container just to access container query units?

```css
<parent> {
  /* Gimme container query units! */
  container-type: inline-size;

  <child> {
    width: 100cqi;
  }
}
```

Now, I don’t love container queries as a means of getting values because the syntax can be a bit long-winded for that (longer than the example above, and size queries in particular are a bit quirky), but the fact that we can use them to do a little more than querying is testament to how versatile they are as a feature. As an alternative, [**I suggested a CSS function**](/css-tricks.com/on-inheriting-and-sharing-property-values.md) called `compute()`, where if you wanted the `height` of something (or the “something” of anything), we could steal it from another element like this:

```css
<parent> {
  <child> {
    /* Computed height of <child> */
    property: compute(height, self);
    /* Computed height of the parent */
    property: compute(height, inherit);
    /* Computed height of #abc element */
    property: compute(height, #abc);
  }
}
```

This would save us from having to implement a container size query just to use its container query units, and would also apply to all properties. Besides, a container size query wouldn’t help us to acquire the un-computed declared value that we actually typed out. For that, the `inherit()` function has been proposed and [<VPIcon icon="fas fa-globe"/>Roma even shows us how to use it](https://blog.kizu.dev/play-with-inherit-function/) in Chrome Canary.

To add, I really like the keyword approach and would love to see more keywords like [**`currentColor`**](/css-tricks.com/currentcolor.md) (e.g., [`currentBackgroundColor` has been proposed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5292)).

Still, if container queries could be extended to get the value of *any* CSS property, I definitely wouldn’t say no to that! The flexibility to pass properties/values between elements is way too enticing.

#### Query any CSS property

This feature has actually been on the slate since container style queries were first proposed, but there’s no telling when it will arrive. This container style query upgrade will enable us to query the (un-computed/declared) value of any CSS property instead of just custom properties (although you won’t be able to ‘get’ and use those values, at least as far as I know).

*Any* CSS property? Uh, doesn’t that make all of the other container queries redundant? Not quite, no.

Container scroll-state queries detect snapping and stickiness, for which there are no pseudo-classes — but maybe there should be? They also detect scrollability, since, for example, `overflow: scroll` and `overflow: visible` doesn’t mean that the content is actually overflowing, only that we’re allowed to scroll the container if it does. Finally, anchored container queries don’t query the `position-try-fallbacks` value, they detect *when*, for example, the `position-area` is flipped.

So, you know, they do a whole bunch of stuff, and that’s why this upgrade for container style queries won’t replace them. In fact, I can totally see dozens of new container query features hitting the web within the next few years.

#### So, what else could container queries do?

Before container queries were even a thing, great ideas were being put forward. Of course, some of them actually became container queries whereas others are still just that — great ideas that haven’t gone anywhere (again…*yet?*).

- [Adam Argyle suggested (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5989#issuecomment-783702864) some interesting things that would later become scroll-state queries, in addition to being able to query whether something’s on-screen, wrapping, or ellipsing, which I’d love to see.
- [Adam also suggested being able to count child nodes (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5989#issuecomment-858739994), an idea that later became `sibling-count()` and `sibling-index()`, although I’d still like to see the container query approach.
- In a similar vein, Matthew Dean pointed out that [some container queries could instead or also be pseudo-classes (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6402#issuecomment-1094141090), which I agree with. Matthew also suggested that [container queries could be used to query whether a flex container is wrapped (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6402#issuecomment-1094140594), and which row/column of a flexbox/grid container we’re in.

I’m confident that we’ll see these ideas realized at some point, either as container queries or as some other syntax. Heck, since it’s December, I’ll make it my prediction for 2026: container queries will rule 2026. What else do *you* want container queries to do?

::: info References

<SiteInfo
  name="An Interactive Guide to CSS Container Queries"
  desc="Learn how to use CSS container queries today."
  url="https://ishadeed.com/article/css-container-query-guide//"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/container-query/twitter-card.jpg"/>

<SiteInfo
  name="Detect fallback positions with anchored container queries from Chrome 143  |  Blog  |  Chrome for Developers"
  desc="Detect fallback positions with anchored container queries from Chrome 143"
  url="https://developer.chrome.com/blog/anchored-container-queries/"
  logo="https://gstatic.com/devrel-devsite/prod/vc5f006f889cc1db1408e856ba3b3ed5c9ee7e9490e5b06b7170054e5ec4f4567/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/anchored-container-queries/image/thumbnail.png"/>

```component VPCard
{
  "title": "Play With Inherit Function",
  "desc": "One of the things that might flight under many people’s radars is the incoming `inherit()`. Not the `inherit` keyword — we had it for quite a while already. Now it is available in Chrome Canary with the “experimental web platform features” flag, so, if you want, you can go play with it!",
  "link": "https://blog.kizu.dev/play-with-inherit-function//",
  "logo": "https://blog.kizu.dev/favicon.svg",
  "background": "rgba(68,189,254,0.2)"
}
```


```component VPCard
{
  "title": "On Inheriting and Sharing Property Values",
  "desc": "There are many ways to share properties, but what would it look like to inherit and use any parent property value on a child?",
  "link": "/css-tricks.com/on-inheriting-and-sharing-property-values.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "container queries | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "Style queries in Container Queries provide a way to query the current styling of a container, and conditionally apply additional CSS to the contents of that container.",
  "link": "https://caniuse.com?search=container+queries/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Else Could Container Queries... Query?",
  "desc": "How far can we really go with container queries? There are dozens of media queries now, so what if there were dozens of container queries as well? What could we use them for?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/what-else-could-container-queries-query.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
