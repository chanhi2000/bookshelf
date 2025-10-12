---
lang: en-US
title: "Using currentColor in 2025"
description: "Article(s) > Using currentColor in 2025"
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
      content: "Article(s) > Using currentColor in 2025"
    - property: og:description
      content: "Using currentColor in 2025"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-currentcolor-in-2025.html
prev: /programming/css/articles/README.md
date: 2025-04-10
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5519
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
  name="Using currentColor in 2025"
  desc="Do you need it? Not really, custom properties are probably a better bet. But it still has a bit of utility and it's fun to think about."
  url="https://frontendmasters.com/blog/using-currentcolor-in-2025/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5519"/>

Gotta give props to `currentColor`. It’s a keyword in CSS that is the OG *variable*. It wasn’t *always* there, but it was relatively usable in browsers by, say, 2010. `currentColor` is a value, that you have control over, that represents something else.

```css
.card {
  color: red;
  border: 3px solid currentColor;
}
```

What do you think the color of that border is gonna be? Not a trick question, it’s `red` my friend. You don’t have to type `red` twice. You don’t have to worry those colors that you’ve so elegantly tied together are going to drift apart. The power of computer programming lives here.

The value `currentColor` resolves to is whatever the `color` value resolves to at the element being effected by the selector. The `color` property cascades, so it could be set three levels up from the current element, or not at all, or whatever. It’ll always be *something.*

::: note p.s.

it can be `currentColor`, `currentcolor`, `CURRENTCOLOR`, `cUrrENtCoLOr` or whatever. CSS is unbothered. Just spel it right.

:::

---

## Hard Times

Business just isn’t rolling in thick anymore for `currentColor`. Search a 10 year old codebase and you’ll find a few hits, but these days, custom properties are a far more popular choice. Are you turning your back on an old friend? Yes. Is new friend better? Also yes. Just saying.

```css
.card {
  --mainColor: red;
 
  color: var(--mainColor);
  border: 3px solid var(--mainColor);
}
```

This does the same thing. It’s an extra line of code, but your fellow computer programmers will all agree that it’s much more clear and versatile.

---

## Versatile?

Definitely. Custom properties can be just about anything. It’s almost weird how permissive the value of a custom property can be. But it’s certainly not just colors. Hopefully obviously: `currentColor` only references color. There is no `currentPadding` or `currentEmotionalState` or anything.

---

## Bugs?

I figured I’d have [a play (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/XJWxVpv) for old times sake. While I was doing that, I noticed a few oddities.

```css
body {
  color: orange;
  accent-color: currentColor; /* doesn't work 🤷‍♀️ */
}
```

That one just doesn’t work (across the three major browsers I tried). Why? No I’m asking *you.* lol.

Here’s another:

```css
body {
  color: rebeccaPurple;
}
button {
  border: 1px solid currentColor;
}
```

That one isn’t a bug, I suppose, as the trouble is that user agent stylesheets tend to set the `color` of buttons themselves (e.g. `color: buttontext;`), so if you want it to work, you’ll have to set the color explicitly, or force inherit it.

```css
button {
  color: inherit;
  border: 1px solid currentColor;
}
```

I also swore I found an issue with relative color syntax and currentColor, but now that I’m typing and fact checking I can’t find it again so I’ll just leave it at that.

---

## But is it still cool though?

I feel like I’ve made the point that it’s not amazingly useful anymore, but I might also argue that it’s not a terrible idea when the intentionality matches up just right. For instance, say you’ve got icons where the `fill` should always match the text color. That’s a fine use case really.

```css
nav {
  color: salmon;

  svg.icon {
    fill: currentColor;
  }
}
```

Another step further, we could pop a little shadow on those icons that is based on that color.

```css
nav {
  color: salmon;

  svg.icon {
    fill: currentColor;
    filter: drop-shadow(
      0 1px 0 oklch(from currentcolor calc(l - 0.25) c h));
  }
}
```

Here’s a video of that and some other stuff working together. No custom properties here, all `currentColor`:

<VidStack src="https://videopress.com/embed/JlJiTKxm?cover=1&autoPlay=0&controls=1&loop=0&muted=0&persistVolume=1&playsinline=0&preloadContent=metadata&useAverageColor=1&hd=0" />

I have stuck in my memory [<VPIcon icon="fas fa-globe"/>a Simurai post from 2014](https://simurai.com/blog/2014/05/04/cssconf) where he showed off the power of this as well.

![Nice.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/cssconf-color3.gif?resize=1008%2C560&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using currentColor in 2025",
  "desc": "Do you need it? Not really, custom properties are probably a better bet. But it still has a bit of utility and it's fun to think about.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-currentcolor-in-2025.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
