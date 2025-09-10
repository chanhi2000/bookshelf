---
lang: en-US
title: "Should the CSS light-dark() Function Support More Than Light and Dark Values?"
description: "Article(s) > Should the CSS light-dark() Function Support More Than Light and Dark Values?"
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
      content: "Article(s) > Should the CSS light-dark() Function Support More Than Light and Dark Values?"
    - property: og:description
      content: "Should the CSS light-dark() Function Support More Than Light and Dark Values?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/should-the-css-light-dark-function-support-more-than-light-and-dark-values.html
prev: /programming/css/articles/README.md
date: 2025-09-02
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url : https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/light-dark.webp
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
  name="Should the CSS light-dark() Function Support More Than Light and Dark Values?"
  desc="The light-dark() function is currently designed to support just two color schemes. Should it support others? Sunkanmi Fafowora says yes and no."
  url="https://css-tricks.com/should-the-css-light-dark-function-support-more-than-light-and-dark-values"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/light-dark.webp"/>

One of the newer CSS features that has piqued my interest: the [<VPIcon icon="iconfont icon-css-tricks"/>`light-dark()`](https://css-tricks.com/almanac/functions/l/light-dark/) function. And I’ve been closely following it ever since [<VPIcon icon="iconfont icon-web-dev"/>it became Baseline back in May 2024](https://web.dev/articles/light-dark).

<BaselineStatus featureid="light-dark" />

---

## `light-dark()` function, briefly

If you don’t know, the `light-dark()` function takes two color arguments: one for light mode and one for dark mode. Hence, the name `light-dark()`. It toggles between the two light and dark values based on a user’s preferences. [**Sara Joy has a wonderful article**](/css-tricks.com/come-to-the-light-dark-side.md) where you can get a much more detailed explanation.

The key thing is that the function requires you to use the [<VPIcon icon="iconfont icon-css-tricks"/>`color-scheme`](https://css-tricks.com/almanac/properties/c/color-scheme/) property to activate those two color modes:

```css
:root {
  color-scheme: light dark;
}

.element {
  color: light-dark(brown, black);
}
```

And, depending on the user’s preference, one of those two modes is applied.

---

## Just two modes?

That said, I’ve been wondering for a while now: **Should the `light-dark()` function support more than light and dark color modes?**

[<VPIcon icon="iconfont icon-css-tricks"/>I wrote about `light-dark()` for the CSS-Tricks Almanac.](https://css-tricks.com/almanac/functions/l/light-dark/) During my research, I found myself wishing the function could do more, specifically that it lacks support for other types of color schemes that a user might prefer, such as grayscale, high contrast, and low contrast.

Does `light-dark()` even need a high-contrast mode?

I’d say both yes *and* no. Let’s go back in time to when `light-dark()` was initially proposed somewhere around 2022. [Emilio Cobos (<VPIcon icon="iconfont icon-github"/>`emilio`)](https://github.com/emilio) asked [for a function to support light and dark mode changes (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561), and [it was added to the specifications (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/pull/9439).

Done and handled, right? Not so fast. [The ticket was indeed closed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561#event-10554262492) when [Jacob Miller chimed in (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561#issuecomment-1754069460):

::: info

> Just saw this from [<VPIcon icon="iconfont icon-github"/>`@bramus`](https://github.com/bramus)‘s post, and I suspect that things are already closed / there’s no changing things now, but I see this as an approach that doesn’t actually solve for the issues people are facing with theming, and does so in a way that will create a trap for them when pursuing proper theming support.
> 
> […]
> 
> We shouldn’t ship single-purpose tools for the browser, but rather ones that scale and we can build upon.

:::

Good thing he chimed in, because that prompted Bramus to [reopen the ticket (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561#issuecomment-1755088882):

::: info

> I think this was mistakingly done so. The end goal is to have something like `schemed-value()`, with `light-dark()` being an intermediary step towards the final solution.

:::

That’s a big deal! Bramus is saying that the `light-dark()` function is an intermediary solution on the way to a  `schemed-value()` function. In other words, shipping `light-dark()` was never the intended end goal. It’s a step along the way to this other more robust `schemed-value()` feature.

---

## Custom color schemes

[<VPIcon icon="fas fa-globe"/>Bramus has already written](https://bram.us/2023/10/09/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark/#schemed-value) a bunch about the `schemed-value()` concept. It could look something like this:

```css
:root {
  color-scheme: dark light custom;
}

body {
  color: schemed-value(
    light lightblue, /* Value used for light color-scheme */ 
    dark crimson, /* Value used for dark color-scheme */ 
    --custom green /* Value used for --custom color-scheme */
    );
}
```

This isn’t possible with `light-dark()`. In fact, before the function can support more than two modes, the [<VPIcon icon="iconfont icon-css-tricks"/>`color-scheme`](https://css-tricks.com/almanac/properties/c/color-scheme/) property has to be extended with more than the `light` and `dark` values. Only then can `light-dark()` be extended because, remember, `light-dark()` needs the `color-scheme` property in order to do its thing.

Specifically, we’d need `color-scheme` to accept some sort of “custom” color scheme value. [Tab Atkins provides a possible example (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9660#issuecomment-1834713634) in the ticket. The idea is to register a custom color scheme using a `@color-scheme` at-rule that defines the scheme’s properties, such as what particular color keywords are mapped to, and then use that color scheme’s ident on the `color-scheme` property that is declared on the root element:

```css
@color-scheme --high-contast {
  base-scheme: dark;
  canvascolor: black;
  canvastext: white;
  accentcolor: white;
  /* other properties set to specific colors */
}

html {
  color-scheme: --high-contrast;
}
```

With that in place, the custom color scheme can be used as its own standalone value in the forthcoming `schemed-value()` function:

```css
@color-scheme --high-contast {
  /* ... */
}

html {
  color-scheme: --high-contrast light dark;
}

body {
  color: schemed-value(--high-contrast, black, white);
}
```

Breaking it all down:

- We register a custom color scheme (e.g. `--high-contrast`) in a `@color-scheme` at-rule.
- We define the color scheme’s properties in the at-rule, such as whether its base theme is `light` or `dark` and what certain values color keywords map to.
- We declare the custom color scheme on the `color-scheme` property at the root level (i.e., `html { color-scheme: --high-contrast;}`).
- We apply the custom color scheme by declaring it on color-related properties by way of the `schemed-value()` function.

So, not only will `light-dark()` change, the CSS `color-scheme` property will most likely have its own at-rule to allow for custom `color-scheme` values.

---

## We need more color theme support, but not in `light-dark()`

This begs my earlier question: Does the `light-dark()` function really need to support more than two color scheme modes? [<VPIcon icon="fas fa-globe"/>Bramus has an answer](https://bram.us/2023/10/09/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark/#schemed-value):

::: info

> When `schemed-value()` ever becomes a thing, `light-dark()` would become syntactic sugar for it.

:::

*A-ha!* This means `light-dark()` doesn’t need to support multiple modes because `schemed-value()` has the power to extend `light-dark()` by its own virtue:

```css
light-dark(<color>, <color>); = schemed-value(light <color>, dark <color>);
```

Is `light-dark()` an intermediary step? Yes, it is. And should it be extended to support multiple modes, including custom color schemes? It certainly could, but it doesn’t have to be. Instead, we can register and define a custom color scheme in an at-rule and make sure the `color-scheme` property can read it. That way, we get the simplicity of a two-mode function that can be further abstracted to support additional custom modes, if needed.

In fact, it goes beyond color schemes. [There is even an open ticket to extend `light-dark()` for images (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](http://github.com/w3c/csswg-drafts/issues/12513), and the discussions surrounding it seem to agree on a new function specifically designed for it.

---

## What about custom functions?

But, wait! Doesn’t a lot of this sound a lot like what we’ve been hearing about the work happening with [**custom functions**](/css-tricks.com/functions-in-css.md)? Indeed, [Tab came back with a possible approach using the `if()` function (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10577#issuecomment-2237170305), and the [Chris Lilley retagged the ticket as a result (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10577#issuecomment-2267203890). That’s when [Bramus demonstrated (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10577#issuecomment-2888805091) how we could reasonably replicate the `light-dark()` function with a custom CSS function:

```css
:root {
  /* ensures light mode comes first */
  --scheme: light;

  /* dark mode is set here */
  @media (prefers-color-scheme: dark) {
    --scheme: dark;
  }
}

/* custom function returns any two values depending on whether system is in light or dark mode */
@function --light-dark(--light-color, --dark-color) {
  result: if(style(--scheme: dark): var(--dark-color) ; else: var(--light-color));
}

p {
  font-size: --light-dark(
    2rem,
    2.5rem
  ); /* returns 2rem if system is in light mode and 2.5rem if system is in dark mode */
}
```

Nothing is set in stone! The only thing we know for sure is that we have a working `light-dark()` function and it’s Baseline widely available for use. Custom functions a work in progress and only available in [<VPIcon icon="iconfont icon-caniuse"/>Chromium-based browsers](https://caniuse.com/?search=%40function) at the time I’m writing this.

---

## The path forward

[**I’ve been exploring everything color-related for a while now**](/css-tricks.com/css-color-functions.md), and I’d like to know your thoughts: Are you excited about the upcoming changes to `light-dark()`? Do you think `light-dark()` should support more color modes like high contrast?

Let me know your thoughts in the comment section below. Feel free to also comment on any of the W3C GitHub comment threads linked in this post to share your thoughts and concerns for the coming new features.

::: info More on `light-dark()`

<SiteInfo
  name="light-dark() | CSS-Tricks"
  desc="The light-dark() function takes two color values—one for “light” mode and one for “dark” mode, and automatically switches between them depending on"
  url="https://css-tricks.com/almanac/functions/l/light-dark//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png"/>

```component VPCard
{
  "title": "Come to the light-dark() Side",
  "desc": "Dark mode interfaces have matured a lot in the past few years. We all know the ”traditional” approach using media queries but in this article, Sara Joy demonstrates modern CSS features that make respecting user color scheme preferences pretty darn easy.",
  "link": "/css-tricks.com/come-to-the-light-dark-side.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Exploring the CSS contrast-color() Function… a Second Time",
  "desc": "The contrast-color() function doesn’t check color contrast, but rather it outright resolves to either black or white (whichever one contrasts the most with your chosen color). Safari Technology Preview recently implemented it and we explore its possible uses in this article.",
  "link": "/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Poking at the CSS if() Function a Little More: Conditional Color Theming",
  "desc": "The CSS if() function enables us to use values conditionally, but what exactly does if() do? Let's look at a possible real-world use case.",
  "link": "/css-tricks.com/poking-at-the-css-if-function-a-little-more-conditional-color-theming.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```



<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Should the CSS light-dark() Function Support More Than Light and Dark Values?",
  "desc": "The light-dark() function is currently designed to support just two color schemes. Should it support others? Sunkanmi Fafowora says yes and no.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/should-the-css-light-dark-function-support-more-than-light-and-dark-values.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
