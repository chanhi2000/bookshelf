---
lang: en-US
title: "On Inheriting and Sharing Property Values"
description: "Article(s) > On Inheriting and Sharing Property Values"
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
      content: "Article(s) > On Inheriting and Sharing Property Values"
    - property: og:description
      content: "On Inheriting and Sharing Property Values"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/on-inheriting-and-sharing-property-values.html
prev: /programming/css/articles/README.md
date: 2025-11-24
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/dashy-circles.png
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
  name="On Inheriting and Sharing Property Values"
  desc="There are many ways to share properties, but what would it look like to inherit and use any parent property value on a child?"
  url="https://css-tricks.com/on-inheriting-and-sharing-property-values"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/dashy-circles.png"/>

Sometimes I want to set the value of a CSS property to that of a different property, even if I don’t know what that value is, and even if it changes later. Unfortunately though, that’s not possible (at least, there isn’t a CSS function that specifically does that).

In my opinion, it’d be super useful to have something like this (for interpolation, maybe you’d throw [`calc-size()`](https://css-tricks.com/almanac/functions/c/calc-size/) in there as well):

```css
/* Totally hypothetical */
button {
  border-radius: compute(height, self);
  border-radius: compute(height, inherit);
  border-radius: compute(height, #this);
}
```

In 2021, [<VPIcon icon="fas fa-globe"/>Lea Verou explained](https://discourse.wicg.io/t/css-function-to-reference-other-propertys-value/5593/) why, despite being proposed numerous times, implementing such a general-purpose CSS function like this isn’t feasible. Having said that, I do remain hopeful, because things are always evolving and [**the CSSWG process isn’t always linear**](/css-tricks.com/masonry-watching-a-css-feature-evolve.md).

In the meantime, even though there isn’t a CSS function that enables us to get the value of a different property, you might be able to achieve your outcome using a different method, and those methods are what we’re going to look at today.

---

## The fool-proof CSS custom properties method

We can easily get the value of a different CSS property using custom properties, but we’d need to know what the value is in order to declare the custom property to begin with. This isn’t ideal, but it does enable us to achieve *some* outcomes.

Let’s jump back to the example from the intro where we try to set the [<VPIcon icon="iconfont icon-css-tricks"/>`border-radius`](https://css-tricks.com/almanac/properties/b/border-radius/) based on the `height`, only this time we know what the height is and we store it as a CSS custom property for reusability, and so we’re able to achieve our outcome:

```css
button {
  --button-height: 3rem;
  height: var(--button-height);
  border-radius: calc(var(--button-height) * 0.3);
}
```

We can even place that `--button-height` custom property higher up in the CSS cascade to make it available to more containment contexts.

```css
:root {
  /* Declare here to use anywhere */
  --button-height: 3rem;

  header {
    --header-padding: 1rem;
    padding: var(--header-padding);
  
    /* Height is unknown (but we can calculate it) */
    --header-height: calc(var(--button-height) + (var(--header-padding) * 2));
  
    /* Which means we can calculate this, too */
    border-radius: calc(var(--header-height) * 0.3);
  
    button {
      /* As well as these, of course */
      height: var(--button-height);
      border-radius: calc(var(--button-height) * 0.3);

      /* Oh, what the heck */
      padding-inline: calc(var(--button-height) * 0.5);
    }
  }
}
```

<CodePen
  user="anon"
  slug-hash="jEWadeY"
  title="CSS variables demo (with calc())"
  :default-tab="['css','result']"
  :theme="dark"/>

I guess when my math teacher said that I’d need algebra one day. She wasn’t lying!

---

## The unsupported `inherit()` CSS function method

The `inherit()` CSS function, which isn’t currently supported by any web browser, will enable us to get the value of a parent’s property. Think: the `inherit` keyword, except that we can get the value of *any* parent property and even modify it using value functions such as `calc()`. The [<VPIcon icon="iconfont icon-w3c"/>latest draft of the CSS Values and Units Module Level 5 spec](https://w3.org/TR/css-values-5/#inherit-notation) defines how this’d work for custom properties, which wouldn’t really enable us to do anything that we can’t already do (as demonstrated in the previous example), but the hope is that it’d work for all CSS properties further down the line so that we wouldn’t need to use custom properties (which is just a tad longer):

```css
header {
  height: 3rem;

  button {
    height: 100%;

    /* Get height of parent but use it here */
    border-radius: calc(inherit(height) * 0.3);
    padding-inline: calc(inherit(height) * 0.5);
  }
}
```

There is one difference between this and the custom properties approach, though. This method depends on the fixed height of the parent, whereas with the custom properties method either the parent or the child can have the fixed height.

This means that `inherit()` wouldn’t interpolate values. For example, an `auto` value that computes to `3rem` would still be inherited as `auto`, which might compute to something else when `inherit()`-ed., Sometimes that’d be fine, but other times it’d be an issue. Personally, I’m hoping that interpolation becomes a possibility at some point, making it far more useful than the custom properties method.

Until then, there are some other (mostly property-specific) options.

---

## The `aspect-ratio` CSS property

Using the [<VPIcon icon="iconfont icon-css-tricks"/>`aspect-ratio`](https://css-tricks.com/almanac/properties/a/aspect-ratio/) CSS property, we can set the height relative to the width, and vice-versa. For example:

```css
div {
  width: 30rem;

  /* height will be half of the width */
  aspect-ratio: 2 / 1;

  /* Same thing */
  aspect-ratio: 3 / 1.5;

  /* Same thing */
  aspect-ratio: 10 / 5;

  /* width and height will be the same */
  aspect-ratio: 1 / 1;
}
```

Technically we don’t “get” the `width` or the `height`, but we do get to set one based on the other, which is the important thing (and since it’s a ratio, you don’t need to know the actual value — or unit — of either).

---

## The `currentColor` CSS keyword

The `currentColor` CSS keyword resolves to the computed value of the [<VPIcon icon="iconfont icon-css-tricks"/>`color`](https://css-tricks.com/almanac/properties/c/color/) property. Its data type is `<color>`, so we can use it in place of any `<color>` on any property on the same element. For example, if we set the `color` to `red` (or something that resolves to `red`), or if the `color` is computed as `red` via inheritance, we could then declare `border-color: currentColor` to make the border red too:

```css
body {
  /* We can set color here (and let it be inherited) */
  color: red;

  button {
    /* Or set it here */
    color: red;

    /* And then use currentColor here */
    border-color: currentColor;
    border: 0.0625rem solid currentColor;
    background: hsl(from currentColor h s 90);
  }
}
```

<CodePen
  user="anon"
  slug-hash="GgoOeXQ"
  title="currentColor demo"
  :default-tab="['css','result']"
  :theme="dark"/>

This enables us to reuse the color without having to set up custom properties, and of course if the value of `color` changes, `currentColor` will automatically update to match it.

While this isn’t the same thing as being able to get the color of literally anything, it’s still pretty useful. Actually, if something akin to `compute(background-color)` just isn’t possible, I’d be happy with more CSS keywords like `currentColor`.

In fact, `currentBackgroundColor`/`currentBackground` has [already been proposed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5292). Using `currentBackgroundColor` for example, we could set the border color to be slightly darker than the background color (`border-color: hsl(from currentBackgroundColor h s calc(l - 30))`), or mix the background color with another color and then use that as the border color (`border-color: color-mix(currentBackgroundColor, black, 30)`).

But why stop there? Why not `currentWidth`, `currentHeight`, and so on?

### The `from-font` CSS keyword

The [**`from-font`**](/css-tricks.com/from-font-value-text-decoration-thickness.md) CSS keyword is exclusive to the [<VPIcon icon="iconfont icon-css-tricks"/>`text-decoration-thickness`](https://css-tricks.com/almanac/properties/t/text-decoration/text-decoration-thickness/) property, which can be used to set the thickness of underlines. If you’ve ever hated the fact that underlines are always `1px` regardless of the `font-size` and `font-weight`, then `text-decoration-thickness` can fix that.

The `from-font` keyword doesn’t generate a value though — it’s optionally provided by the font maker and embedded into the font file, so you might not like the value that they provide, if they provide one at all. If they don’t, `auto` will be used as a fallback, which web browsers resolve to `1px`. This is fine if you aren’t picky, but it’s nonetheless unreliable (and obviously quite niche).

We can, however, specify a percentage value instead, which will ensure that the thickness is relative to the `font-size`. So, if `text-decoration-thickness: from-font` just isn’t cutting it, then we have that as a backup (something between `8%` and `12%` should do it).

---

## Don’t underestimate CSS units

You probably already know about `vw` and `vh` units (viewport width and viewport height units). These represent a percentage of the viewport’s width and height respectively, so `1vw` for example would be 1% of the viewport’s width. These units can be useful by themselves or within a `calc()` function, and used within any property that accepts a `<length>` unit.

However, [**there are plenty of other, lesser-known units**](/css-tricks.com/css-length-units.md) that can be useful in a similar way:

- `1ex`: equal to the computed x-height
- `1cap`: equal to the computed cap height
- `1ch`: equal to the computed width of the `0` glyph
- `1lh`: equal to the computed `line-height` (as long as you’re not trimming or adding to its content box, for example using `text-box` or `padding`, respectively, `lh` units could be used to determine the height of a box that has a fixed number of lines)

![Source: [<VPIcon icon="iconfont icon-w3c"/>W3](https://w3.org/TR/css-values-4/images/Typography_Line_Terms.svg)](https://css-tricks.com/wp-content/uploads/2025/10/Typography_Line_Terms.svg)

And again, you can use them, their logical variants (e.g., `vi` and `vb`), and their root variants (e.g., `rex` and `rcap`) within any property that accepts a `<length>` unit.

In addition, if you’re using [container size queries](https://css-tricks.com/css-container-queries/), you’re also free to use the following container query units within the containment contexts:

- `1cqw`: equal to 1% of the container’s computed width
- `1cqh`: equal to 1% of the container’s computed height
- `1cqi`: equal to 1% of the container’s computed inline size
- `1cqb`: equal to 1% of the container’s computed block size
- `1cqmin`: equal to `1cqi` or `1cqb`, whichever is smallest
- `1cqmax`: equal to `1cqi` or `1cqb`, whichever is largest

That `inherit()` example from earlier, you know, the one that isn’t currently supported by any web browser? Here’s the same thing but with container size queries:

```css
header {
  height: 3rem;
  container: header / size;

  @container header (width) {
    button {
      height: 100%;
      border-radius: calc(100cqh * 0.3);
      padding-inline: calc(100cqh * 0.5);
    }
  }
}
```

<CodePen
  user="anon"
  slug-hash="GgoyQKa"
  title="Container size query demo"
  :default-tab="['css','result']"
  :theme="dark"/>

Or, since we’re talking about a container and its direct child, we can use the following shorter version that doesn’t create and query a named container (we don’t need to query the container anyway, since all we’re doing is stealing its units!):

```css
header {
  height: 3rem;
  container-type: size;

  button {
    height: 100%;
    border-radius: calc(100cqh * 0.3);
    padding-inline: calc(100cqh * 0.5);
  }
}
```

However, keep in mind that `inherit()` would enable us to inherit *anything*, whereas container size queries only enable us to inherit sizes. Also, container size queries don’t work with inline containers (that’s why this version of the container is horizontally stretched), so they can’t solve every problem anyway.

---

## In a nutshell

I’m just going to throw `compute()` out there again, because I think it’d be a really great way to get the values of other CSS properties:

```css
button {
  /* self could be the default */
  border-radius: compute(height, self);
  /* inherit could work like inherit() */
  border-radius: compute(height, inherit);
  /* Nice to have, but not as important */
  border-radius: compute(height, #this);
}
```

But if it’s just not possible, I really like the idea of introducing more `currentColor`-like keywords. With the exception of keywords like `from-font` where the font maker provides the value (or not, *sigh*), keywords such as `currentWidth` and `currentHeight` would be incredibly useful. They’d make CSS easier to read, and we wouldn’t have to create as many custom properties.

In the meantime though, custom properties, `aspect-ratio`, and certain CSS units can help us in the right circumstances, not to mention that we’ll be getting `inherit()` in the future. These are heavily geared towards getting widths and heights, which is fine because that’s undoubtedly the biggest problem here, but hopefully there are more CSS features on the horizon that allow values to be used in more places.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "On Inheriting and Sharing Property Values",
  "desc": "There are many ways to share properties, but what would it look like to inherit and use any parent property value on a child?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/on-inheriting-and-sharing-property-values.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
