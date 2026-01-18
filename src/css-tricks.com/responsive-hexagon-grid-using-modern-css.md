---
lang: en-US
title: "Responsive Hexagon Grid Using Modern CSS"
description: "Article(s) > Responsive Hexagon Grid Using Modern CSS"
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
      content: "Article(s) > Responsive Hexagon Grid Using Modern CSS"
    - property: og:description
      content: "Responsive Hexagon Grid Using Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-hexagon-grid-using-modern-css.html
prev: /programming/css/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/hexagon-grid.png
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
  name="Responsive Hexagon Grid Using Modern CSS"
  desc="A while back, Temani tacked a repeating grid of hexagon shapes. Well, he's updated it with modern CSS features that result in fewer magic numbers. And it's impressive!"
  url="https://css-tricks.com/responsive-hexagon-grid-using-modern-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/hexagon-grid.png"/>

Five years ago I published an article on how to create [**a responsive grid of hexagon shapes**](/css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries.md). It was the only technique that didn’t require media queries or JavaScript. It works with any number of items, allowing you to easily control the size and gap using CSS variables.

<CodePen
  user="anon"
  slug-hash="zYoZBOy"
  title="Responsive hexagon grid"
  :default-tab="['css','result']"
  :theme="dark"/>

I am using `float`, `inline-block`, setting `font-size` equal to `0`, etc. In 2026, this may sound a bit hacky and outdated. Not really since this method works fine and is well supported, but can we do better using modern features? In five years, many things have changed and we can improve the above implementation and make it less hacky!

::: note

Support is limited to Chrome only because this technique uses recently released features, including [**`corner-shape`**](/css-tricks.com/almanac-properties/corner-shape.md), [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md), and [<VPIcon icon="iconfont icon-caniuse"/>unit division](https://caniuse.com/mdn-css_types_calc_typed_division_produces_unitless_number).

:::

<CodePen
  user="anon"
  slug-hash="MYeyyVr"
  title="Responsive Grid of hexagon without media queries"
  :default-tab="['css','result']"
  :theme="dark"/>

The CSS code is shorter and contains fewer [**magic numbers**](/css-tricks.com/magic-numbers-in-css.md) than the last time I approached this. You will also find some complex calculations that we will dissect together.

Before diving into this new demo, I highly recommend reading [**my previous article**](/css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries.md) first. It’s not mandatory, but it allows you to compare both methods and realize how much (and rapidly) CSS has evolved in the last five years by introducing new features that make one-difficult things like this easier.

---

## The Hexagon Shape

Let’s start with [**the hexagon shape**](/css-tip.com/hexagon.md), which is the main element of our grid. Previously, I had to rely on `clip-path: polygon()` to create it:

```css
.hexagon {
  --s: 100px;
  width: var(--s);
  height: calc(var(--s) * 1.1547);
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
}
```

But now, we can rely on the new `corner-shape` property which works alongside the [**`border-radius`**](/css-tricks.com/almanac-properties/border-radius.md) property:

```css
.hexagon {
  width: 100px;
  aspect-ratio: cos(30deg);
  border-radius: 50% / 25%;
  corner-shape: bevel;
}
```

Simpler than how we used to bevel elements, and as a bonus, we can add a border to the shape without workarounds!

<CodePen
  user="anon"
  slug-hash="yyNjgzR"
  title="Hexagon shapes (with border!)"
  :default-tab="['css','result']"
  :theme="dark"/>

The `corner-shape` property is the first modern feature we are relying on. It makes drawing [**CSS shapes**](/css-tip.com/corner-shape.md) a lot easier than traditional methods, like using [**`clip-path`**](/css-tricks.com/almanac-properties/clip-path.md). You can still keep using the `clip-path` method, of course, for better support (and if you don’t need a border on the element), but here is a [**more modern implementation**](/css-tip.com/hexagon-shape.md):

```css
.hexagon {
  width: 100px;
  aspect-ratio: cos(30deg);
  clip-path: polygon(-50% 50%,50% 100%,150% 50%,50% 0);
}
```

<CodePen
  user="anon"
  slug-hash="KKEMjxV"
  title="CSS-only hexagon shapes (the modern way)"
  :default-tab="['css','result']"
  :theme="dark"/>

There are fewer points inside the polygon, and we replaced the magic number `1.1547` with an `aspect-ratio` declaration. I won’t spend more time on the code of the shapes, but here are two articles I wrote if you want a detailed explanation with more examples:

::: info

```component VPCard
{
  "title": "Modern CSS Layouts: You Might Not Need A Framework For That",
  "desc": "It’s easy to get lost in a sea of CSS frameworks and libraries, each promising easier styling and smoother layouts. Brecht De Ruyte demonstrates four CSS utility classes (plus a bonus) using techniques that allow them to be used practically anywhere you need a particular layout — be it Grid or Flexbox — with configurable options.",
  "link": "/smashingmagazine.com/modern-css-layouts-no-framework-needed.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Drawing CSS Shapes using corner-shape",
  "desc": "After you've got a `border-radius`, you can control the shape of the corner with `corner-shape`, which unlocks a simpler and more powerful way to make shapes compared to `clip-path()`.",
  "link": "/frontendmasters.com/drawing-css-shapes-using-corner-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## The Responsive Grid

Now that we have our shape, let’s create the grid. It’s called a “grid,” but I am going to use a flexbox configuration:

```html
<div class="container">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <!-- etc. -->
</div>
```

```css
.container {
  --s: 120px; /* size  */
  --g: 10px; /* gap */
  
  display: flex;
  gap: var(--g);
  flex-wrap: wrap;
}
.container > * {
  width: var(--s);
  aspect-ratio: cos(30deg);
  border-radius: 50% / 25%;
  corner-shape: bevel;
}
```

<CodePen
  user="anon"
  slug-hash="azZmyze"
  title="The initial config"
  :default-tab="['css','result']"
  :theme="dark"/>

Nothing fancy so far. From there, we add a bottom margin to all items to create an overlap between the rows:

```css
.container > * {
  margin-bottom: calc(var(--s)/(-4*cos(30deg)));
}
```

<CodePen
  user="anon"
  slug-hash="YPWGxVN"
  title="Adding the overlap"
  :default-tab="['css','result']"
  :theme="dark"/>

The last step is to add a left margin to the first item of the even rows (i.e., 2nd, 4th, 6th, and so). This margin will create the shift between rows to achieve a perfect grid.

Said like that, it sounds easy, but it’s the trickiest part where we need complex calculations. The grid is responsive, so the “first” item we are looking for can be any item depending, on the container size, item size, gap, etc.

Let’s start with a figure:

![Two grids of hexagons, arranged side-by-side. N and M variables are between them illustrating odd rows with the N variable and even rows with M.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/s_18F6D8571AF22362C9E7B6B76C502D27430411EB4C228A75F1D753F3AAC7BF6A_1768204576487_image.png?resize=1129%2C519)

Our grid can have two aspects depending on the responsiveness. We can either have the same number of items in all the rows (Grid 1 in the figure above) or a difference of one item between two consecutive rows (Grid 2). The `N` and `M` variables represent the number of items in the rows. In Grid 1 we have `N = M`, and in Grid 2 we have `M = N - 1`.

In Grid 1, the items with a left margin are 6, 16, 26, etc., and in Grid 2, they are 7, 18, 29, etc. Let’s try to identify the logic behind those numbers.

The first item in both grids (6 or 7) is the first one in the second row, so it’s the item `N + 1`. The second item (16 or 18) is the first one in the third row, so it’s the item `N + M + N + 1`. The third item (26 or 29) is the item `N + M + N + M + N + 1`. If you look closely, you can see a pattern that we can express using the following formula:

```plaintext
N*i + M*(i - 1) + 1
```

…where `i` is a positive integer (zero excluded). The items we are looking for can be found using the following pseudo-code:

```plaintext
for(i = 0; i< ?? ;i++) {
  index = N*i + M*(i - 1) + 1
  Add margin to items[index]  
}
```

We don’t have loops in CSS, though, so we will have to do something different. We can obtain the index of each item using the new `sibling-index()` function. The logic is to test if that index respect the previous formula.

Instead of writing this:

```plaintext
index = N*i + M*(i - 1) + 1
```

…let’s express `i` using the index:

```plaintext
i = (index - 1 + M)/(N + M)
```

We know that `i` is a positive integer (zero excluded), so for each item, we get its index and test if `(index - 1 + M)/(N + M)` is a positive integer. Before that, let’s calculate the number of items, `N` and `M`.

Calculating the number of items per row is the same as calculating how many items can fit in that row.

```plaintext
N = round(down,container_size / item_size);
```

Dividing the container size by the item size gives us a number. If we [**`round()`**](/css-tricks.com/almanac-functions/round.md)` it down to the nearest integer, we get the number of items per row. But we have a gap between items, so we need to account for this in the formula:

```plaintext
N = round(down, (container_size + gap)/ (item_size + gap));
```

We do the same for `M`, but this time we need to also account for the left margin applied to the first item of the row:

```plaintext
M = round(down, (container_size + gap - margin_left)/ (item_size + gap));
```

Let’s take a closer look and identify the value of that margin in the next figure:

![Illustrating the width of a single hexagon shape and the left margin between rows, which is one half the width of an item.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/s_18F6D8571AF22362C9E7B6B76C502D27430411EB4C228A75F1D753F3AAC7BF6A_1768215274673_image.png?resize=446%2C403)

It’s equal to half the size of an item, plus half the gap:

```plaintext
M = round(down, (container_size + gap - (item_size + gap)/2)/(item_size + gap));

M = round(down, (container_size - (item_size - gap)/2)/(item_size + gap));
```

The item size and the gap are defined using the `--s` and `--g` variables, but what about the container size? We can rely on container query units and use `100cqw`.

Let’s write what we have until now using CSS:

```css
.container {
  --s: 120px;  /* size  */
  --g: 10px;   /* gap */
  
  container-type: inline-size; /* we make it a container to use 100cqw */
}
.container > * {
  --_n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  --_m: round(down,(100cqw - (var(--s) - var(--g))/2)/(var(--s) + var(--g))); 
  --_i: calc((sibling-index() - 1 + var(--_m))/(var(--_n) + var(--_m)));
  
  margin-left: ???; /* We're getting there! */
}
```

We can use `mod(var(--_i),1)` to test if `--_i` is an integer. If it’s an integer, the result is equal to 0. Otherwise, it’s equal to a value between 0 and 1. We can introduce another variable and use the new [**`if()`**](/css-tricks.com/if-css-gets-inline-conditionals.md)` function!

```css
.container {
  --s: 120px;  /* size  */
  --g: 10px;   /* gap */
  
  container-type: inline-size; /* we make it a container to use 100cqw */
}
.container > * {
  --_n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  --_m: round(down,(100cqw - (var(--s) - var(--g))/2)/(var(--s) + var(--g))); 
  --_i: calc((sibling-index() - 1 + var(--_m))/(var(--_n) + var(--_m)));
  --_c: mod(var(--_i),1);
  margin-left: if(style(--_c: 0) calc((var(--s) + var(--g))/2) else 0;);
}
```

*Tada!*

<CodePen
  user="anon"
  slug-hash="zxBKeOq"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s important to note that you need to register the variable `--_c` variable using [**`@property`**](/css-tricks.com/almanac-rules/property.md) to be able to do the comparison (I write more about this in [**“How to correctly use `if()`in CSS”**](/css-tip.com/inline-if.md)).

This is a good use case for `if()`, but we can do it differently:

```css
--_c: round(down, 1 - mod(var(--_i), 1));
```

The **[`mod()`**](https://css-tricks.com/almanac-functions/mod.md) function gives us a value between 0 and 1, where 0 is the value we want. `-1*mod()` gives us a value between -1 and 0. `1 - mod()` gives us a value between 0 and 1, but this time it’s the 1 we need. We apply `round()` to the calculation, and the result will be either 0 or 1. The `--_c` variable is now a Boolean variable that we can use directly within a calculation.

```css
margin-left: calc(var(--_c) * (var(--s) + var(--g))/2);
```

If `--_c` is equal to 1, we get a margin. Otherwise, the margin is equal to 0. This time you don’t need to register the variable using `@property`. I personally prefer this method as it requires less code, but the `if()` method is also interesting.

<CodePen
  user="anon"
  slug-hash="MYeyyVr"
  title="Responsive Grid of hexagon without media queries"
  :default-tab="['css','result']"
  :theme="dark"/>

> Should I remember all those formulas by heart?! It’s too much!

No, you don’t. I tried to provide a detailed explanation behind the math, but it’s not mandatory to understand it to work with the grid. All you have to do is update the variables that control the size and gap. No need to touch the part that set the left margin. We will even explore how the same code structure can work with more shapes!

---

## More Examples

The common use case is a hexagon shape but what about other shapes? We can, for example, consider a rhombus and, for this, we simply adjust the code that controls the shape.

From this:

```css
.container > * {
  aspect-ratio: cos(30deg);
  border-radius: 50% / 25%;
  corner-shape: bevel;
  margin-bottom: calc(var(--s)/(-4*cos(30deg)));
}
```

…to this:

```css
.container > * {
  aspect-ratio: 1;
  border-radius: 50%;
  corner-shape: bevel;
  margin-bottom: calc(var(--s)/-2);
}
```

<CodePen
  user="anon"
  slug-hash="zxBKeLz"
  title="Rhombus grid"
  :default-tab="['css','result']"
  :theme="dark"/>

A responsive grid of rhombus shapes — with no effort! Let’s try an octagon:

```css
.container > * {
  aspect-ratio: 1;
  border-radius: calc(100%/(2 + sqrt(2)));
  corner-shape: bevel;
  margin-bottom: calc(var(--s)/(-1*(2 + sqrt(2))));
}
```

<CodePen
  user="anon"
  slug-hash="KwMgJrz"
  title="Octagon grid"
  :default-tab="['css','result']"
  :theme="dark"/>

Almost! For an octagon, we need to adjust the `gap` because we need more horizontal space between the items:

```css
.container {
  --g: calc(10px + var(--s)/(sqrt(2) + 1));
  gap: 10px var(--g);
}
```

The variable `--g` includes a portion of the size `var(--s)/(sqrt(2) + 1)` and is applied as a row gap, while the column gap is kept the same (`10px`).

<CodePen
  user="anon"
  slug-hash="JoKRxwL"
  title="Octagon grid"
  :default-tab="['css','result']"
  :theme="dark"/>

From there, we can also get another type of hexagon grid:

<CodePen
  user="anon"
  slug-hash="vEKXbPv"
  title="Responsive Grid of hexagon without media queries"
  :default-tab="['css','result']"
  :theme="dark"/>

And why not a grid of circles as well? Here we go:

<CodePen
  user="anon"
  slug-hash="QwEKYRN"
  title="Circles grid"
  :default-tab="['css','result']"
  :theme="dark"/>

As you can see, we didn’t touch the complex calculation that sets the left margin in any of those examples. All we had to do was to play with the `border-radius` and `aspect-ratio` properties to control the shape and adjust the bottom margin to rectify the overlap. In some cases, we need to adjust the horizontal gap.

---

## Conclusion

I will end this article with another demo that will serve as a small homework for you:

<CodePen
  user="anon"
  slug-hash="PwzGvJV"
  title="Another hexagon grid"
  :default-tab="['css','result']"
  :theme="dark"/>

This time, the shift is applied to the odd rows rather than the even ones. I let you dissect the code as a small exercise. Try to identify the change I have made and what’s the logic behind it

::: tip Hint

try to redo the calculation steps using this new configuration.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Hexagon Grid Using Modern CSS",
  "desc": "A while back, Temani tacked a repeating grid of hexagon shapes. Well, he's updated it with modern CSS features that result in fewer magic numbers. And it's impressive!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-hexagon-grid-using-modern-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
