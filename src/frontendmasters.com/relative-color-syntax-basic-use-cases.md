---
lang: en-US
title: "Relative Color Syntax — Basic Use Cases"
description: "Article(s) > Relative Color Syntax — Basic Use Cases"
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
      content: "Article(s) > Relative Color Syntax — Basic Use Cases"
    - property: og:description
      content: "Relative Color Syntax — Basic Use Cases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/relative-color-syntax-basic-use-cases.html
prev: /programming/css/articles/README.md
date: 2024-08-12
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3448
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
  name="Relative Color Syntax — Basic Use Cases"
  desc="Support for the relative color syntax in CSS is across the board now (go interop!), so here we look at some basic (and still very useful) use cases, like applying alpha to a color you have on hand."
  url="https://frontendmasters.com/blog/relative-color-syntax-basic-use-cases"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3448"/>

As of last month, Firefox 128’s support of the [<VPIcon icon="fa-brands fa-firefox"/>relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) means we’ve now got [<VPIcon icon="fas fa-globe"/>support across the board](https://caniuse.com/?search=relative%20color). I’m excited about that as it’s an extremely powerful way to manipulate colors in CSS. Plus it was [part of Interop](/frontendmasters.com/comparing-interop-2024-choices-to-the-popular-vote.md) this year so that is further proof that is trucking along nicely.

The syntax with generic names looks like this:

```css
color-function(from origin-color channel1 channel2 channel3 / alpha)
```

Here’s how it works in my head:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/relative-color-syntax.png?resize=1024%2C597&ssl=1)

---

## Add Opacity to a Color you Already Have

It’s common to have CSS custom properties set up for colors on a project.

```css
html {
  --color-yellow: oklch(80% 0.15 94);
  --color-green:  oklch(70% 0.25 140);

  ...
}
```

Now you want to use that yellow, but at about 50% opacity. How do you do that? There are actually [<VPIcon icon="fas fa-globe"/>a couple of ways to add transparency to an existing color](https://chriscoyier.net/2023/05/12/add-opacity-to-an-existing-color/), but in my opinion the relative color syntax is the nicest.

In the past, I’ve split out the color values like this:

```css
html {
  --color-yellow-lch: 80% 0.15 94;
  --color-yellow: oklch(var(--color-yellow-lch);

  ...
}
```

That way I could either use the color all together, or use the split out values to apply opacity:

```css{3}
.box {
  background: var(--color-yellow);
  border-color: oklch(var(--color-yellow-lch) / 50%);
}
```

But that can get out of hand! You could also split each color into L, C, and H, the combine those, giving you *five* variables for every color. Too much.

With the relative color syntax, breaking down colors isn’t necessary. You apply alpha (and other transformations) on demand, leaving the original single color as the only variable (token) you need.

```css{3}
.box {
  background: var(--color-yellow);
  border-color: oklch(from var(--color-yellow) l c h / 50%);
}
```

I much prefer the idea of keeping the main colors tokenized as custom properties, then tweaking them as needed on demand.

---

## Darken a Color you Already Have

In the above example, we had `--color-yellow` and I ended by saying I prefer doing one-off tweaks on demand rather than making a whole new variable. If you have a *ton* of usage of a slightly-darker version of a color, then sure, make a new variable and stay consistent. But if it’s more of a one-off, relative color syntax is awesome:

```css{6-7}
.box {
  background: var(--gray-5);

  h2 {
    color: var(--color-yellow);
    /* Darkened version of yellow */
    border-bottom: 2px solid oklch(from var(--color-yellow) calc(l - 0.4) c h);
  }
}
```

---

## Lighten a Color you Already Have

Same deal here. I’m [<VPIcon icon="fas fa-globe"/>using OKLCH because I like it](https://chriscoyier.net/2023/01/22/ok-oklch-%F0%9F%91%91/), particularly the “uniform brightness” characteristic. Meaning when doing this darkening and lightening across different colors, *it feels like it lightens/darkens the same amount*. Which feels weird to write, but it’s true. Other color spaces do not lighten and darken consistently.

```css
.box {
  background: var(--gray-5);

  h2 {
    color: var(--color-orange);
    /* Darkened version of orange */
    border-bottom: 2px solid oklch(from var(--color-orange) calc(l + 0.4) c h);
  }
}
```

<CodePen
  user="chriscoyier"
  slug-hash="MWMOWdQ"
  title="Lighten a one-off color"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Easy Variations

Avoiding making too many variables is a nice consequence of the relative color syntax, but you can still use the relative color syntax to make variables if it’s useful to have them.

I like the idea of starting with a base color, perhaps a slightly tinted gray, and then making the official variations with the relative color syntax.

```css
html {
  --base-gray: oklch(12.94% 0.02 159);
  
  --gray-1: var(--base-gray);
  --gray-2: oklch(from var(--base-gray) calc(l + 0.1) c h);
  --gray-3: oklch(from var(--base-gray) calc(l + 0.2) c h);
  --gray-4: oklch(from var(--base-gray) calc(l + 0.3) c h);
  --gray-5: oklch(from var(--base-gray) calc(l + 0.4) c h);
  --gray-6: oklch(from var(--base-gray) calc(l + 0.5) c h);
  --gray-7: oklch(from var(--base-gray) calc(l + 0.6) c h);
  --gray-8: oklch(from var(--base-gray) calc(l + 0.7) c h);
}
```

<CodePen
  user="chriscoyier"
  slug-hash="ExBbaxO"
  title="Colored Grays with Relative Color Syntax"
  :default-tab="['css','result']"
  :theme="dark"/>

---

The fact that you can *start* with any color, use *any color function*, and manipulate *any part* of the color is incredibly powerful. The above use cases are pretty basic. I’m sure more talented designers or developers who deeply know color will be able to do much more interesting things!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Relative Color Syntax — Basic Use Cases",
  "desc": "Support for the relative color syntax in CSS is across the board now (go interop!), so here we look at some basic (and still very useful) use cases, like applying alpha to a color you have on hand.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/relative-color-syntax-basic-use-cases.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
