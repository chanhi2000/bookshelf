---
lang: en-US
title: "Modern CSS Layouts: You Might Not Need A Framework For That"
description: "Article(s) > Modern CSS Layouts: You Might Not Need A Framework For That"
icon: fa-brands fa-css3-alt
category: 
  - CSS
  - Article(s)
tag: 
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Modern CSS Layouts: You Might Not Need A Framework For That"
    - property: og:description
      content: "Modern CSS Layouts: You Might Not Need A Framework For That"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/modern-css-layouts-no-framework-needed.html
prev: /programming/css/articles/README.md
date: 2024-05-22
isOriginal: false
author:
  - name: Brecht De Ruyte
    url : https://smashingmagazine.com/author/brecht-de-ruyte/
cover: https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/modern-css-layouts-no-framework-needed.jpg
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
  name="Modern CSS Layouts: You Might Not Need A Framework For That"
  desc="It’s easy to get lost in a sea of CSS frameworks and libraries, each promising easier styling and smoother layouts. Brecht De Ruyte demonstrates four CSS utility classes (plus a bonus) using techniques that allow them to be used practically anywhere you need a particular layout — be it Grid or Flexbox — with configurable options."
  url="https://smashingmagazine.com/2024/05/modern-css-layouts-no-framework-needed/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/modern-css-layouts-no-framework-needed.jpg"/>

It’s easy to get lost in a sea of CSS frameworks and libraries, each promising easier styling and smoother layouts. But amidst this abundance, the modern CSS features we have today offer simpler and more flexible approaches without the added dependencies or abstractions. Brecht De Ruyte demonstrates four CSS utility classes (plus a bonus) using techniques that allow them to be used practically anywhere you need a particular layout — be it Grid or Flexbox — with configurable options.

Establishing layouts in CSS is something that we, as developers, often delegate to whatever framework we’re most comfortable using. And even though it’s possible to configure a framework to get just what we need out of it, how often have you integrated an entire CSS library simply for its layout features? I’m sure many of us have done it at some point, dating back to the days of 960.gs, Bootstrap, Susy, and Foundation.

Modern CSS features have significantly cut the need to reach for a framework simply for its layout. Yet, I continue to see it happen. Or, I empathize with many of my colleagues who find themselves re-creating the same Grid or Flexbox layout over and over again.

In this article, we will gain greater control over web layouts. **Specifically, we will create four CSS classes that you will be able to take and use immediately on just about any project or place where you need a particular layout that can be configured to your needs.**

While the concepts we cover are key, the real thing I want you to take away from this is the **confidence to use CSS for those things we tend to avoid doing ourselves**. Layouts *used* to be a challenge on the same level of styling form controls. Certain creative layouts may still be difficult to pull off, but the way CSS is designed today solves the burdens of the established layout patterns we’ve been outsourcing and re-creating for many years.

---

## What We’re Making

We’re going to establish four CSS classes, each with a different layout approach. The idea is that if you need, say, a fluid layout based on Flexbox, you have it ready. The same goes for the three other classes we’re making.

And what exactly are these classes? Two of them are Flexbox layouts, and the other two are Grid layouts, each for a specific purpose. We’ll even extend the Grid layouts to leverage CSS Subgrid for when that’s needed.

Within those two groups of Flexbox and Grid layouts are two utility classes: one that auto-fills the available space — we’re calling these **“fluid” layouts** — and another where we have greater control over the columns and rows — we’re calling these **“repeating” layouts**.

Finally, we’ll integrate CSS Container Queries so that these layouts respond to their own size for responsive behavior rather than the size of the viewport. Where we’ll start, though, is organizing our work into Cascade Layers, which further allow you to control the level of specificity and prevent style conflicts with your own CSS.

---

## Setup: Cascade Layers & CSS Variables

A technique that I’ve used a few times is to define Cascade Layers at the start of a stylesheet. I like this idea not only because it keeps styles neat and organized but also because we can influence the specificity of the styles in each layer by organizing the layers in a specific order. All of this makes the utility classes we’re making easier to maintain and integrate into your own work without running into specificity battles.

I think the following three layers are enough for this work:

```css
@layer reset, theme, layout;
```

Notice the order because it really, really matters. The `reset` layer comes first, making it the *least* specific layer of the bunch. The `layout` layer comes in at the end, making it the *most* specific set of styles, giving them higher priority than the styles in the other two layers. If we add an unlayered style, that one would be added last and thus have the highest specificity.

![Figure 1: Inspecting Cascade Layers in Chrome’s DevTools. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/1-css-layers.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/1-css-layers.png)

::: info Related

“[Getting Started With Cascade Layers](https://smashingmagazine.com/2022/01/introduction-css-cascade-layers/)” by Stephanie Eckles.
<!-- TODO: /smashingmagazine.com/introduction-css-cascade-layers.md -->

:::

Let’s briefly cover how we’ll use each layer in our work.

### Reset Layer

The `reset` layer will contain styles [**for any user agent styles we want to “reset”**](/css-tricks.com/reboot-resets-reasoning.md). You can add your own resets here, or if you already have a reset in your project, you can safely move on without this particular layer. However, do remember that un-layered styles will be read last, so wrap them in this layer if needed.

I’m just going to drop in [**the popular `box-sizing` declaration**](https://smashingmagazine.com/2012/06/coding-qa-with-chris-coyier-box-sizing-and-css-sprites/#box-sizing) that ensures all elements are sized consistently by the `border-box` in accordance with the CSS Box Model.
<!-- TODO: /smashingmagazine.com/coding-qa-with-chris-coyier-box-sizing-and-css-sprites.md -->

```css
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
}
```

### Theme Layer

This layer provides variables scoped to the `:root` element. I like the idea of scoping variables this high up the chain because layout containers — like the utility classes we’re creating — are often wrappers around lots of other elements, and a global scope ensures that the variables are available anywhere we need them. That said, it is possible to scope these locally to another element if you need to.

Now, whatever makes for “good” default values for the variables will absolutely depend on the project. I’m going to set these with particular values, but do not assume for a moment that you have to stick with them — this is very much a configurable system that you can adapt to your needs.

Here are the only three variables we need for all four layouts:

```css
@layer theme {
  :root {
    --layout-fluid-min: 35ch;
    --layout-default-repeat: 3;
    --layout-default-gap: 3vmax;
  }
}
```

In order, these map to the following:

- Automatically-sized columns that are [<VPIcon icon="fa-brands fa-firefox"/>at least 35 characters wide](https://developer.mozilla.org/en-US/docs/Web/CSS/length#ch),
- A layout with three [<VPIcon icon="fa-brands fa-firefox"/>repeated columns](https://developer.mozilla.org/en-US/docs/Web/CSS/length#ch), and
- A [<VPIcon icon="fa-brands fa-firefox"/>gap](https://css-tricks.com/almanac/properties/g/gap/) between the layout items that is set to 3% of the [<VPIcon icon="fa-brands fa-firefox"/>largest side of the viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/length#vmax).

::: note Nnotice 

The variables are prefixed with `layout-`, which I’m using as an identifier for layout-specific values. This is my personal preference for structuring this work, but please choose a naming convention that fits your mental model — [**naming things can be hard**](/css-tricks.com/naming-things-is-only-getting-harder.md)!

:::

### Layout Layer

This layer will hold our utility class rulesets, which is where all the magic happens. For the grid, we will include a fifth class specifically for using CSS Subgrid within a grid container for those possible use cases.

```css
@layer layout {  
  .repeating-grid {}
  .repeating-flex {}
  .fluid-grid {}
  .fluid-flex {}

  .subgrid-rows {}
}
```

Now that all our layers are organized, variables are set, and rulesets are defined, we can begin working on the layouts themselves. We will start with the “repeating” layouts, one based on CSS Grid and the other using Flexbox.

---

## Repeating Grid And Flex Layouts

I think it’s a good idea to start with the “simplest” layout and scale up the complexity from there. So, we’ll tackle the “Repeating Grid” layout first as an introduction to the overarching technique we will be using for the other layouts.

### Repeating Grid

If we head into the `@layout` layer, that’s where we’ll find the `.repeating-grid` ruleset, where we’ll write the styles for this specific layout. Essentially, we are setting this up as a grid container and applying the variables we created to it to establish layout columns and spacing between them.

```css
.repeating-grid {
  display: grid;
  grid-template-columns: repeat(var(--layout-default-repeat), 1fr);
  gap: var(--layout-default-gap);
}
```

It’s not too complicated so far, right? We now have a grid container with three equally sized columns that take up one fraction (`1fr`) of the available space with a gap between them.

This is all fine and dandy, but we do want to take this a step further and turn this into a system where you can configure the number of columns and the size of the gap. I’m going to introduce two new variables scoped to this grid:

- `--_grid-repeat`: The number of grid columns.
- `--_repeating-grid-gap`: The amount of space between grid items.

Did you notice that I’ve prefixed these variables with an underscore? This was actually a JavaScript convention to specify variables that are “private” — or locally-scoped — before we had `const` and `let` to help with that. Feel free to rename these however you see fit, but I wanted to note that up-front in case you’re wondering why the underscore is there.

```css
.repeating-grid {
  --_grid-repeat: var(--grid-repeat, var(--layout-default-repeat));
  --_repeating-grid-gap: var(--grid-gap, var(--layout-default-gap));

  display: grid;
  grid-template-columns: repeat(var(--layout-default-repeat), 1fr);
  gap: var(--layout-default-gap);
}
```

::: note Notice

These variables are set to the variables in the `@theme` layer. I like the idea of assigning a global variable to a locally-scoped variable. This way, we get to leverage the default values we set in `@theme` but can easily override them without interfering anywhere else the global variables are used.

:::

Now let’s put those variables to use on the style rules from before in the same `.repeating-grid` ruleset:

```css
.repeating-grid {
  --_grid-repeat: var(--grid-repeat, var(--layout-default-repeat));
  --_repeating-grid-gap: var(--grid-gap, var(--layout-default-gap));

  display: grid;
  grid-template-columns: repeat(var(--_grid-repeat), 1fr);
  gap: var(--_repeating-grid-gap);
}
```

What happens from here when we apply the `.repeating-grid` to an element in HTML? Let’s imagine that we are working with the following simplified markup:

```html
<section class="repeating-grid">
  <div></div>
  <div></div>
  <div></div>
</section>
```

If we were to apply a `background-color` and `height` to those divs, we would get a nice set of boxes that are placed into three equally-sized columns, where any divs that do not fit on the first row automatically wrap to the next row.

<CodePen
  user="smashingmag"
  slug-hash="gOJrqmL"
  title="Layout Utility: Repeating Grid [forked]"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Now, of course, we don’t *have* to have just three columns. Let’s say we want a product grid where we want to change the repeating columns from `3` to `5` while updating the `gap` from `2vw` to `3vw` using the same HTML, only with a new class we can use override those values.

```html
<section class="repeating-grid products-grid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</section>
```

See how this is shaping up? We have a grid layout based on a set of globally-scoped variables that we can re-assign to variables that are locally-scoped to the utility class and further customized with a class of our own that adds context to the element’s purpose and allows you to adjust the responsive behavior.

```css
.products-grid {
  --grid-repeat: 2;
  --grid-gap: 2vw;

  @media (width >= 1000px) {
    --grid-repeat: 3;
    --grid-gap: 3vw;
  }
}
```

<CodePen
  user="smashingmag"
  slug-hash="YzbqBVy"
  title="Layout Utility: Repeating Grid [forked]"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The benefit is that we can overwrite our default values without polluting the HTML with superfluous classes. This is the **overarching approach** we will also use in the three other layout classes. Next up is the “Repeating Flex” version of what we just made.

### Repeating Flex

The “Repeating Grid” layout is great, but you might not always want equally-sized columns. CSS Grid is certainly capable of auto-filling elements with whatever space is available, but Flexbox is extremely proficient at it.

Let’s say we have the same five divs from before. That leaves us with two divs on the second row next to an empty column on the right. Perhaps we want those last two leftover divs to stretch out and take up the space in the empty column.

![Figure 2: Flexible items automatically fill any remaining space that would otherwise be presented as an empty third column on the second row. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/2-repeating-flex.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-layouts-no-framework-needed/2-repeating-flex.png)

Time to put the process we established with the Repeating Grid layout to use in this Repeating Flex layout. This time, we jump straight to defining the private variables on the `.repeating-flex` ruleset in the `@layout` layer since we already know what we’re doing.

```css
.repeating-flex {
  --_flex-repeat: var(--flex-repeat, var(--layout-default-repeat));
  --_repeating-flex-gap: var(--flex-gap, var(--layout-default-gap));
}
```

Again, we have two locally-scoped variables used to override the default values assigned to the globally-scoped variables. Now, we apply them to the style declarations.

```css
.repeating-flex {
  --_flex-repeat: var(--flex-repeat, var(--layout-default-repeat));
  --_repeating-flex-gap: var(--flex-gap, var(--layout-default-gap));

  display: flex;
  flex-wrap: wrap;
  gap: var(--_repeating-flex-gap);
}
```

We’re only using one of the variables to set the gap size between flex items at the moment, but that will change in a bit. For now, the important thing to note is that **we are using the `flex-wrap` property to tell Flexbox that it’s OK to let additional items in the layout wrap into multiple rows rather than trying to pack everything in a single row**.

But once we do that, we also have to configure how the flex items shrink or expand based on whatever amount of available space is remaining. Let’s [<VPIcon icon="fa-brands fa-firefox"/>nest those styles](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) inside the parent ruleset:

```css
.repeating-flex {
  --_flex-repeat: var(--flex-repeat, var(--layout-default-repeat));
  --_repeating-flex-gap: var(--flex-gap, var(--layout-default-gap));

  display: flex;
  flex-wrap: wrap;
  gap: var(--_repeating-flex-gap);

  > * {
    flex: 1 1 calc((100% / var(--_flex-repeat)) - var(--_gap-repeater-calc));
  }
}
```

If you’re wondering why I’m using the universal selector (`*`), it’s because we can’t assume that the layout items will always be divs. Perhaps they are `<article>` elements, `<section>`s, or something else entirely. The child combinator (`>`) ensures that we’re only selecting elements that are *direct* children of the utility class to prevent leakage into other ancestor styles.

The `flex` shorthand property is one of those that’s been around for many years now but still seems to mystify many of us. Before we unpack it, did you also notice that we have a new locally-scoped `--_gap-repeater-calc` variable that needs to be defined? Let’s do this:

```css
.repeating-flex {
  --_flex-repeat: var(--flex-repeat, var(--layout-default-repeat));
  --_repeating-flex-gap: var(--flex-gap, var(--layout-default-gap));

  /* New variables */
  --_gap-count: calc(var(--_flex-repeat) - 1);
  --_gap-repeater-calc: calc(
    var(--_repeating-flex-gap) / var(--_flex-repeat) * var(--_gap-count)
  );
  
  display: flex;
  flex-wrap: wrap;
  gap: var(--_repeating-flex-gap);

  > * {
    flex: 1 1 calc((100% / var(--_flex-repeat)) - var(--_gap-repeater-calc));
  }
}
```

Whoa, we actually created a second variable that `--_gap-repeater-calc` can use to properly calculate the third `flex` value, which corresponds to the `flex-basis` property, i.e., the “ideal” size we want the flex items to be.

If we take out the variable abstractions from our code above, then this is what we’re looking at:

```css
.repeating-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 3vmax

  > * {
    flex: 1 1 calc((100% / 3) - calc(3vmax / 3 * 2));
  }
}
```

Hopefully, this will help you see what sort of math the browser has to do to size the flexible items in the layout. Of course, those values change if the variables’ values change. But, in short, elements that are direct children of the `.repeating-flex` utility class are allowed to grow (`flex-grow: 1`) and shrink (`flex-shrink: 1`) based on the amount of available space while we inform the browser that the initial size (i.e., `flex-basis`) of each flex item is equal to some `calc()`-ulated value.

Because we had to introduce a couple of new variables to get here, I’d like to at least explain what they do:

- `--_gap-count`: This stores the number of gaps between layout items by subtracting 1 `from --_flex-repeat`. There’s one less gap in the number of items because there’s no gap before the first item or after the last item.
- `--_gap-repeater-calc`: This calculates the total gap size based on the individual item’s gap size and the total number of gaps between items.

From there, we calculate the total gap size more efficiently with the following formula:

```js
calc(var(--_repeating-flex-gap) / var(--_flex-repeat) * var(--_gap-count))
```

Let’s break that down further because it’s an inception of variables referencing other variables. In this example, we already provided our repeat-counting private variable, which falls back to the default repeater by setting the `--layout-default-repeat` variable.

This sets a gap, but we’re not done yet because, with flexible containers, we need to define the `flex` behavior of the container’s direct children so that they grow (`flex-grow: 1`), shrink (`flex-shrink: 1`), and with a `flex-basis` value that is calculated by multiplying the repeater by the total number of gaps between items.

Next, we divide the individual gap size (`--_repeating-flex-gap`) by the number of repetitions (`--_flex-repeat)`) to equally distribute the gap size between each item in the layout. Then, we multiply that gap size value by one minus the total number of gaps with the `--_gap-count` variable.

And that concludes our repeating grids! Pretty fun, or at least interesting, right? I like a bit of math.

Before we move to the final two layout utility classes we’re making, you might be wondering why we want so many abstractions of the same variable, as we start with one globally-scoped variable referenced by a locally-scoped variable which, in turn, can be referenced and overridden again by yet another variable that is locally scoped to another ruleset. We could simply work with the global variable the whole time, but I’ve taken us through the extra steps of abstraction.

I like it this way because of the following:

1. I can peek at the HTML and instantly see which layout approach is in use: `.repeating-grid` or `.repeating-flex`.
2. It maintains a certain separation of concerns that keeps styles in order without running into specificity conflicts.

See how clear and understandable the markup is:

```html
<section class="repeating-flex footer-usps">
  <div></div>
  <div></div>
  <div></div>
</section>
```

The corresponding CSS is likely to be a slim ruleset for the semantic `.footer-usps` class that simply updates variable values:

```css
.footer-usps {
  --flex-repeat: 3;
  --flex-gap: 2rem;
}
```

This gives me all of the context I need: the type of layout, what it is used for, and where to find the variables. I think that’s handy, but you certainly could get by without the added abstractions if you’re looking to streamline things a bit.

---

## Fluid Grid And Flex Layouts

All the repeating we’ve done until now is fun, and we can manipulate the number of repeats with container queries and media queries. But rather than repeating columns manually, let’s make the browser do the work for us with fluid layouts that automatically fill whatever empty space is available in the layout container. We may sacrifice a small amount of control with these two utilities, but we get to leverage the browser’s ability to “intelligently” place layout items with a few CSS hints.

### Fluid Grid

Once again, we’re starting with the variables and working our way to the calculations and style rules. Specifically, we’re defining a variable called `--_fluid-grid-min` that manages a column’s minimum width.

Let’s take a rather trivial example and say we want a grid column that’s at least `400px` wide with a `20px` gap. In this situation, we’re essentially working with a two-column grid when the container is greater than `820px` wide. If the container is narrower than `820px`, the column stretches out to the container’s full width.

If we want to go for a three-column grid instead, the container’s width should be about `1240px` wide. It’s all about controlling the minimum sizing values in the gap.

```css
.fluid-grid {
  --_fluid-grid-min: var(--fluid-grid-min, var(--layout-fluid-min));
  --_fluid-grid-gap: var(--grid-gap, var(--layout-default-gap));
}
```

That establishes the variables we need to calculate and set styles on the `.fluid-grid` layout. This is the full code we are unpacking:

```css
 .fluid-grid {
  --_fluid-grid-min: var(--fluid-grid-min, var(--layout-fluid-min));
  --_fluid-grid-gap: var(--grid-gap, var(--layout-default-gap));

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--_fluid-grid-min), 100%), 1fr)
  );
  gap: var(--_fluid-grid-gap);
}
```

The `display` is set to `grid`, and the `gap` between items is based on the `--fluid-grid-gap` variable. The magic is taking place in the `grid-template-columns` declaration.

This grid uses the `repeat()` function just as the `.repeating-grid` utility does. By declaring `auto-fit` in the function, the browser automatically packs in as many columns as it possibly can in the amount of available space in the layout container. Any columns that can’t fit on a line simply wrap to the next line and occupy the full space that is available there.

Then there’s the `minmax()` function for setting the minimum and maximum width of the columns. What’s special here is that we’re nesting yet another function, `min()`, within `minmax()` (which, remember, is nested in the `repeat()` function). This a bit of extra logic that sets the minimum width value of each column somewhere in a range between `--_fluid-grid-min` and `100%`, where `100%` is a fallback for when `--_fluid-grid-min` is undefined or is less than `100%`. In other words, each column is at least the full 100% width of the grid container.

The “max” half of `minmax()` is set to `1fr` to ensure that each column grows proportionally and maintains equally sized columns.

<CodePen
  user="smashingmag"
  slug-hash="GRaZzMN"
  title="Fluid grid [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

That’s it for the Fluid Grid layout! That said, please do take note that this is a *strong grid*, particularly when it is combined with modern relative units, e.g. `ch`, as it produces a grid that only scales from one column to multiple columns based on the size of the content.

### Fluid Flex

We pretty much get to re-use all of the code we wrote for the Repeating Flex layout for the Fluid Flex layout, but only we’re setting the `flex-basis` of each column by its minimum size rather than the number of columns.

```css
.fluid-flex {
  --_fluid-flex-min: var(--fluid-flex-min, var(--layout-fluid-min));
  --_fluid-flex-gap: var(--flex-gap, var(--layout-default-gap));

  display: flex;
  flex-wrap: wrap;
  gap: var(--_fluid-flex-gap);

  > * {
    flex: 1 1 var(--_fluid-flex-min);
  }
}
```

That completes the fourth and final layout utility — but there’s one bonus class we can create to use together with the Repeating Grid and Fluid Grid utilities for even more control over each layout.

---

## Optional: Subgrid Utility

Subgrid is handy because it turns any grid item into a grid container of its own that shares the parent container’s track sizing to keep the two containers aligned without having to redefine tracks by hand. It’s got [<VPIcon icon="iconfont icon-caniuse"/>full browser support](https://caniuse.com/css-subgrid) and makes our layout system just that much more robust. That’s why we can set it up as a utility to use with the Repeating Grid and Fluid Grid layouts if we need any of the layout items to be grid containers for laying out any child elements they contain.

Here we go:

```css
.subgrid-rows {
  > * {
    display: grid;
    gap: var(--subgrid-gap, 0);
    grid-row: auto / span var(--subgrid-rows, 4);
    grid-template-rows: subgrid;
  }
}
```

We have two new variables, of course:

- `--subgrid-gap`: The vertical gap between grid items.
- `--subgrid-rows` The number of grid rows defaulted to `4`.

We have a bit of a challenge: **How do we control the subgrid items in the rows?** I see two possible methods.

### Method 1: Inline Styles

We already have a variable that can technically be used directly in the HTML as an inline style:

```html
<section class="fluid-grid subgrid-rows" style="--subgrid-rows: 4;">
  <!-- items -->
</section>
```

This works like a charm since the variable informs the subgrid how much it can grow.

### Method 2: Using The `:has()` Pseudo-Class

This approach leads to verbose CSS, but sacrificing brevity allows us to automate the layout so it handles practically anything we throw at it without having to update an inline style in the markup.

Check this out:

```css
.subgrid-rows {
  &:has(> :nth-child(1):last-child) { --subgrid-rows: 1; }
  &:has(> :nth-child(2):last-child) { --subgrid-rows: 2; }
  &:has(> :nth-child(3):last-child) { --subgrid-rows: 3; }
  &:has(> :nth-child(4):last-child) { --subgrid-rows: 4; }
  &:has(> :nth-child(5):last-child) { --subgrid-rows: 5; }
  /* etc. */

  > * {
    display: grid;
    gap: var(--subgrid-gap, 0);
    grid-row: auto / span var(--subgrid-rows, 5);
    grid-template-rows: subgrid;
  }
}
```

The `:has()` selector checks if a subgrid row is the last child item in the container when that item is either the first, second, third, fourth, fifth, and so on item. For example, the second declaration:

```css
&:has(> :nth-child(2):last-child) { --subgrid-rows: 2; }
```

…is pretty much saying, *“If this is the second subgrid item and it happens to be the last item in the container, then set the number of rows to `2`.”*

Whether this is too heavy-handed, I don’t know; but I love that we’re able to do it in CSS.

The final missing piece is to declare a container on our children. Let’s give the columns a general class name, `.grid-item`, that we can override if we need to while setting each one as a `container` we can query for the sake of updating its layout when it is a certain size (as opposed to responding to the viewport’s size in a media query).

```css
:is(.fluid-grid:not(.subgrid-rows),
.repeating-grid:not(.subgrid-rows),
.repeating-flex, .fluid-flex) {
    > * {
    container: var(--grid-item-container, grid-item) / inline-size;
  }
}
```

That’s a wild-looking selector, but the verbosity is certainly kept to a minimum thanks to the `:is()` pseudo-class, which saves us from having to write this as a larger chain selector. It essentially selects the direct children of the other utilities without leaking into `.subgrid-rows` and inadvertently selecting its direct children.

The `container` property is a shorthand that combines `container-name` and `container-type` into a single declaration separated by a forward slash (`/`). The name of the container is set to one of our variables, and the type is always its `inline-size` (i.e., width in a horizontal writing mode).

The `container-type` property can only be applied to grid *containers* — not grid *items*. This means we’re unable to combine it with the `grid-template-rows: subgrid` value, which is why we needed to write a more complex selector to exclude those instances.

---

## Demo

Check out the following demo to see how everything comes together.

<CodePen
  user="smashingmag"
  slug-hash="mdYPvLR"
  title="Grid system playground [forked]"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The demo is pulling in styles from [another pen that contains the full CSS for everything we made (<VPIcon icon="fa-brands fa-codepen" />`utilitybend`)](https://codepen.io/utilitybend/pen/YzMvJmN) together in this article. So, if you were to replace the `.fluid-flex` classname from the parent container in the HTML with another one of the layout utilities, the layout will update accordingly, allowing you to compare them.

Those classes are the following:

- `.repeating-grid`,
- `.repeating-flex`,
- `.fluid-grid`,
- `.fluid-flex`.

And, of course, you have the option of turning any grid items into grid containers using the optional `.subgrid-rows` class in combination with the `.repeating-grid` and `.fluid-grid` utilities.

---

## Conclusion: Write Once And Repurpose

This was quite a journey, wasn’t it? It might seem like a lot of information, but we made something that **we only need to write once and can use practically anywhere we need a certain type of layout using modern CSS approaches**. I strongly believe these utilities can not only help you in a bunch of your work but also cut any reliance on CSS frameworks that you may be using simply for its layout configurations.

This is a combination of many techniques I’ve seen, [<VPIcon icon="fa-brands fa-youtube"/>one of them being a presentation Stephanie Eckles gave at CSS Day 2023](https://youtu.be/Y50iqMlrqU8). I love it when people handcraft modern CSS solutions for things we used to work around. Stephanie’s demonstration was clean from the start, which is refreshing as so many other areas of web development are becoming ever more complex.

After learning a bunch from CSS Day 2023, I played with Subgrid on my own and [<VPIcon icon="fas fa-globe"/>published different ideas from my experiments](https://utilitybend.com/blog/grid-ideas-creating-a-css-subgrid-utility-class-for-rows). That’s all it took for me to realize **how extensible modern CSS layout approaches are** and inspired me to create a set of utilities I could rely on, perhaps for a long time.

By no means am I trying to convince you or anyone else that these utilities are perfect and should be used everywhere or even that they’re better than `<framework-du-jour>`. One thing that I do know for certain is that by experimenting with the ideas we covered in this article, you will get a solid feel of how CSS is capable of making layout work much more convenient and robust than ever.

Create something out of this, and share it in the comments if you’re willing — I’m looking forward to seeing some fresh ideas!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Modern CSS Layouts: You Might Not Need A Framework For That",
  "desc": "It’s easy to get lost in a sea of CSS frameworks and libraries, each promising easier styling and smoother layouts. Brecht De Ruyte demonstrates four CSS utility classes (plus a bonus) using techniques that allow them to be used practically anywhere you need a particular layout — be it Grid or Flexbox — with configurable options.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/modern-css-layouts-no-framework-needed.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
