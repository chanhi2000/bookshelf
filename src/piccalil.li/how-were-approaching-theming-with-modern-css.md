---
lang: ko-KR
title: How we’re approaching theming with modern CSS
description: Article(s) > How we’re approaching theming with modern CSS
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
      content: Article(s) > How we’re approaching theming with modern CSS
    - property: og:description
      content: How we’re approaching theming with modern CSS
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/how-were-approaching-theming-with-modern-css.html
prev: /programming/css/articles/README.md
date: 2024-04-02
isOriginal: false
author:
  - name: Andy Bell
    url : https://piccalil.li/author/andy-bell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/cd91a000b1d813f2013ba9e0d6809e7f398029674376449e1d624e6eabe32da6/png?url=https://piccalil.li/og/how-were-approaching-theming-with-modern-css/&width=1024&height=526&retina=true
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How we’re approaching theming with modern CSS"
  desc="We’ve started a new project which requires heavy, creative theming, so I made a prototype to test some ideas out."
  url="https://piccalil.li/blog/how-were-approaching-theming-with-modern-css/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/cd91a000b1d813f2013ba9e0d6809e7f398029674376449e1d624e6eabe32da6/png?url=https://piccalil.li/og/how-were-approaching-theming-with-modern-css/&width=1024&height=526&retina=true"/>

Theming, huh? There’s millions of ways to do it with various levels of complexity. I wanted to test some ideas for a prototype so I thought I’d blog about it too. It’s how we do things at [<VPIcon icon="fas fa-globe"/>Set Studio](https://set.studio/): test ideas to death during our [<VPIcon icon="fas fa-globe"/>thorough discovery process](https://set.studio/about/).

This prototype is not polished by any stretch of the imagination, but here’s what we’re looking at. It’s 3 web pages, all identical content-wise, but with varying levels of theming applied.

::: info What we’re building

https://css-theming-prototype.netlify.app/themeable-page/
<!-- TODO: iframe 구성 -->

:::

---

## Layers

We’re not talking `@layer` here, but more layers of code to achieve what you see above. Let’s break it down.

### Bottom layer: Foundations

Unless you build on solid foundations, your build is gonna sink. What’s the most solid foundation of the web? Semantic, structured HTML, of course. It’s imperative in our project’s context that each theme runs off the same HTML structure in each instance, so lots of effort and energy needs to be put into that to make sure we’re in the best possible position.

Decisions need to be made about CSS architecture at this point too because how the HTML is authored is going to impact how we can apply CSS. No surprises to anyone, but we’re going to be hitting up [<VPIcon icon="fas fa-globe"/>CUBE CSS](https://cube.fyi/), but there’s probably going to have to be a muted use of the [U<VPIcon icon="fas fa-globe"/>: utilities](https://cube.fyi/utility.html). That will make more sense as this post progresses, but in the context of heavy theming, semantic CSS is going to be the key for long term success, not atomic stylesheets (ASS).

### Middle layer: Skeletal CSS

It’s all about writing as much global CSS as possible that applies defaults that are ready to be easily overridden with cascade and specificity.

CSS Custom Properties are going to be *heavily* used for this process, but their defaults need to be sensible too. Think of it as building a low-fidelity wireframe then “colouring in” that wireframe with a theme. This is the prototype with no theming whatsoever.

https://css-theming-prototype.netlify.app/themeable-page/skeletal
<!-- TODO: iframe 구성 -->

Looks very similar to the base version, right? That’s because the skeletal CSS is our base. I’ve just added a custom CUBE CSS block in the mix on top of the skeletal styles.

---

## Top layer: Flair

With an extremely solid foundation in place, we literally colour it in. This layer is a combination of defining Custom Properties and writing specific [<VPIcon icon="fas fa-globe"/>CUBE CSS block](https://cube.fyi/block.html) code.

This should by far, be the lightest layer too. All the hard work has already been done at this point!

---

## How this prototype works with those layers

The HTML is pretty straightforward on this simple prototype, so let’s dig straight in to the skeletal CSS setup. In production, we’ll be using a complex, multi-layered JSON-powered design token system, but that’s too over-powered for a simple prototype. What I’ve done is instead, created what those tokens output: a `:root` block of Custom Properties:

```css
:root {
  /* Fluid type scale */
  --size-step--2: clamp(0.6944rem, 0.6376rem + 0.284vi, 0.84rem);
  --size-step--1: clamp(0.8333rem, 0.7488rem + 0.4228vi, 1.05rem);
  --size-step-0: clamp(1rem, 0.878rem + 0.6098vi, 1.3125rem);
  --size-step-1: clamp(1.2rem, 1.028rem + 0.8598vi, 1.6406rem);
  --size-step-2: clamp(1.44rem, 1.2016rem + 1.1918vi, 2.0508rem);
  --size-step-3: clamp(1.728rem, 1.402rem + 1.6302vi, 2.5635rem);
  --size-step-4: clamp(2.0736rem, 1.6323rem + 2.2063vi, 3.2043rem);
  --size-step-5: clamp(2.4883rem, 1.8963rem + 2.9602vi, 4.0054rem);
  --size-step-6: clamp(2.986rem, 2.1974rem + 3.943vi, 5.0068rem);
  --size-step-7: clamp(3.5832rem, 2.5392rem + 5.2201vi, 6.2585rem);

  /* Fluid space scale */
  --space-3xs: clamp(0.25rem, 0.2256rem + 0.122vi, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.4268rem + 0.3659vi, 0.6875rem);
  --space-xs: clamp(0.75rem, 0.6524rem + 0.4878vi, 1rem);
  --space-s: clamp(1rem, 0.878rem + 0.6098vi, 1.3125rem);
  --space-m: clamp(1.5rem, 1.3049rem + 0.9756vi, 2rem);
  --space-l: clamp(2rem, 1.7561rem + 1.2195vi, 2.625rem);
  --space-xl: clamp(3rem, 2.6341rem + 1.8293vi, 3.9375rem);
  --space-2xl: clamp(4rem, 3.5122rem + 2.439vi, 5.25rem);
  --space-3xl: clamp(6rem, 5.2683rem + 3.6585vi, 7.875rem);

  /* Colours */
  --color-light: #ffffff;
  --color-light-shade: #f3f5f7;
  --color-dark: #000000;
  --color-mid: #ebebeb;
  --color-mid-shade: #dedede;
  --color-midnight: #4a4e69;
  --color-midnight-shade: #22223b;
  --color-eggshell: #f2e9e4;
  --color-blue: #3b71fe;
  --color-blue-glare: #eef6fd;
  --color-slate: #4f5563;
}
```

Almost certainly, all the colours won’t be in the production core tokens, but in this instance I’ve added them all as constants. The really important thing about theming though is you **need to abstract into more specific, semantic variables** when applying to your CSS styles. Let me show you the next block to demonstrate:

```css
:root {
  --leading: 1.5;
  --leading-short: 1.3;
  --leading-fine: 1.1;
  --leading-flat: 1;
  --leading-loose: 1.7;
  --kerning: normal;
  --kerning-tight: -0.04ch;
  --kerning-loose: 0.1ch;
  --text-size-base: var(--size-step-0);
  --text-size-lede: var(--size-step-1);
  --text-size-meta: var(--size-step--1);
  --text-size-heading-1: var(--size-step-5);
  --text-size-heading-2: var(--size-step-4);
  --text-size-heading-3: var(--size-step-3);
  --text-size-heading-4: var(--size-step-2);
  --text-size-prose: var(--text-size-base);
  --space-gutter: var(--space-m);
  --space-gutter-s: var(--space-s);
  --space-gutter-l: var(--space-l);
  --space-regions: var(--space-xl);
  --size-wrapper-max-width: 1135px;
  --color-global-bg: var(--color-light);
  --color-global-text: var(--color-dark);
  --color-surface-bg: var(--color-mid);
  --color-surface-bg-interact: var(--color-mid-shade);
  --color-surface-text: var(--color-dark);
  --color-surface-text-interact: var(--color-dark);
  --font-base: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
  --font-display: var(--font-base);
  --font-lede: var(--font-base);
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;
  --focus-ring: 2px solid currentColor;
  --focus-ring-offset: 2px;
}
```

Now, again, this is a prototype, so it’s pretty limited, but this block is mostly powering the global CSS that’s applied directly to — and inherited by — HTML elements. The CSS isn’t generally directly using the first `:root` block. It’s using this one instead, like this:

```css
body {
  font-family: var(--font-base);
  font-size: var(--text-size-base);
  line-height: var(--leading);
  background: var(--color-global-bg);
  color: var(--color-global-text);
}
```

This means that the Flair layer only has to define properties such as `--font-base` and `--color-global-bg` to have a massive impact on the overall look and feel of the page.

You might be thinking why are fonts being defined in this Skeletal layer instead of the Foundations layer of Custom Properties? The way I see it, the base, skeletal theme is already setting these more semantic variable names and fonts are very theme-specific. I’d almost go as far as removing the default type and spacing scale from the foundations too because font choice is going to impact the type scale.

---

## Progressive Custom Properties

The power behind this system is in Custom Properties. They do two things that are magical:

1. They are affected by the cascade and specificity, allowing our theme (Flair) layer to easily modify them
2. You can pass a default value to the `var` function, which means you can set sensible defaults that are switched on demand

Take this skeletal layout for example:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(
    var(--grid-placement, auto-fill),
    minmax(var(--grid-min-item-size, 16rem), 1fr)
  );
  gap: var(--space-gutter, var(--space-s-l));
}
```

The only thing that’s not configurable is the `display` property. With the default values, the CSS translates to this:

```css
.grid {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(16rem, 1fr));
  gap: var(--space-s-l);
}
```

As soon as one of those Custom Properties is defined though, those defaults are discarded. The Skeletal version the prototype is mostly using all of these default values, allowing the theme to assume ultimate control as and when it needs to.

### Using progressive Custom Properties in components

Let’s dive in a little deeper to that concept with a good ol’ button component.

```css
.button {
  display: inline-flex;
  gap: var(--button-gap, var(--space-gutter));
  padding: var(--button-padding, 0.8em 1.5em);
  background: var(--button-bg, var(--color-surface-bg));
  color: var(--button-text, var(--color-surface-text));
  line-height: var(--button-leading, var(--leading-fine));
  border-radius: var(--button-radius, 0);
  text-decoration: none;
  text-transform: var(--button-text-transform, uppercase);
  font-weight: var(--button-font-weight, var(--font-weight-medium));
  letter-spacing: var(--button-kerning, var(--kerning-loose));
}

.button:hover {
  background: var(--button-interact-bg, var(--color-surface-bg-interact));
  color: var(--button-interact-text, var(--color-surface-text-interact));
}
```

Almost every property is using the `var` function with sensible defaults. These sensible defaults are mostly from that Skeletal `:root` block of Custom Properties, rather than directly using design tokens. This allows the theme layer to have a much bigger impact with very little code like this from the “dark” theme:

```css
:root {
  --color-global-bg: var(--color-midnight);
  --color-global-text: var(--color-eggshell);
  --color-surface-bg: var(--color-midnight-shade);
  --color-surface-bg-interact: var(--color-dark);
  --color-surface-text: var(--color-eggshell);
  --color-surface-text-interact: var(--color-eggshell);
}
```

And as shown below, that has a massive impact!

https://css-theming-prototype.netlify.app/themeable-page/dark
<!-- TODO: iframe 구성 -->

---

## Applying theme configuration

Let’s look at the two main themes: “dark” and “detailed”. For our client work, the theming is going to be *very* expansive with lots of creative details applied, but we’re keeping things mostly simple in the prototype…for now anyway.

Let’s start with “dark”:

```css :collapsed-lines
/* Custom property configuration */

:root {
  --color-global-bg: var(--color-midnight);
  --color-global-text: var(--color-eggshell);
  --color-surface-bg: var(--color-midnight-shade);
  --color-surface-bg-interact: var(--color-dark);
  --color-surface-text: var(--color-eggshell);
  --color-surface-text-interact: var(--color-eggshell);
}

/* Specific theme styles and settings */
body {
  background-image: url('https://assets.codepen.io/174183/noise.webp');
}

.quote {
  display: flex;
  align-items: flex-start;
  gap: var(--space-gutter-s);
  font-size: var(--text-size-meta);
}

.quote img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: clamp(4rem, 30%, 6rem);
  flex-shrink: 0;
  object-fit: cover;
}

.quote q {
  quotes: none;
}

.grid {
  --space-flow: var(--space-l);
}

.social-proof {
  background: rgb(from var(--color-midnight-shade) r g b / 50%);
}
```

43 lines of CSS and the whole UI is transformed. As you can hopefully see, a lot of work is done with the configuration of Custom Properties.

The “detailed” theme has — no surprises to anyone — more details:

```css :collapsed-lines
/* Custom property configuration */
:root {
  --color-global-bg: var(--color-light);
  --color-global-text: var(--color-midnight-shade);
  --color-surface-bg: var(--color-blue);
  --color-surface-bg-interact: var(--color-dark);
  --color-surface-text: var(--color-light);
  --color-surface-text-interact: var(--color-light);
  --button-radius: 1.5em;
  --font-lede: Georgia, serif;
  --font-display: 'Khula', sans-serif;
  --text-size-heading-1: var(--size-step-6);
}

/* Specific theme styles and settings */
.intro {
  --space-regions: var(--space-2xl) var(--space-3xl);
  --sidebar-target-width: 11ch;

  background: linear-gradient(
    85deg,
    var(--color-blue-glare) 35%,
    var(--color-light-shade) 100%
  );
}

.intro .sidebar {
  /* Going straight for gap so it doesn't affect the wrapper */
  gap: var(--space-s) var(--space-l);
}

.lede {
  font-style: italic;
}

.quote {
  position: relative;
  border-radius: 1em;
  overflow: hidden;
}

.quote img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.quote q {
  quotes: none;
  background: var(--color-midnight-shade);
  color: var(--color-light);
  padding: 0.5em 1em;
  background: rgb(from var(--color-midnight-shade) r g b / 70%);
  backdrop-filter: blur(2px);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.grid {
  --space-flow: var(--space-l);
}

```

Sure there’s more CSS authored here, but the `:root` block is doing a *lot* of work for us. Because the foundations laid by the Foundation and Skeletal layers are solid, we’re free to express ourselves with pretty-darn loose CSS. I love that.

https://css-theming-prototype.netlify.app/themeable-page/detailed
<!-- TODO: iframe  -->
---

## This is all just the start

As I’ve mentioned a few times already, this is just an early prototype. We’re going to dig into this with a hell of a lot more detail over the coming weeks, but this is unfortunately, all I can share without breaking NDA and IP agreements. I just wanted to share my thinking and tinkering with you all!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How we’re approaching theming with modern CSS",
  "desc": "We’ve started a new project which requires heavy, creative theming, so I made a prototype to test some ideas out.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/how-were-approaching-theming-with-modern-css.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
