---
lang: en-US
title: "Get the number of auto-fit/auto-fill columns in CSS"
description: "Article(s) > Get the number of auto-fit/auto-fill columns in CSS"
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
      content: "Article(s) > Get the number of auto-fit/auto-fill columns in CSS"
    - property: og:description
      content: "Get the number of auto-fit/auto-fill columns in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/count-auto-fill-columns.html
prev: /programming/css/articles/README.md
date: 2025-08-06
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6567
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
  name="Get the number of auto-fit/auto-fill columns in CSS"
  desc="The whole point of auto-fit and auto-fill is that you aren't saying how many columns to use. But if you knew how many the browser chose, you can make nice design decisions."
  url="https://frontendmasters.com/blog/count-auto-fill-columns/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6567"/>

[](https://gist.github.com/thebabydino/645471b8aa19fb1164e512962b6c4f0f/raw/d4ad52fef89cfaa2207882f7a6078a9779a2de34/number-of-auto-fit-columns.md)

Ever wanted to get the number of `auto-fit`/`auto-fill` columns in a grid? For example, because you want to highlight just the items in the first or last row or column? Do something special just for even or for odd rows or columns (e.g. zebra striping)? Or for any one specific row or column? Create responsive non-rectangular grids? And all of this with zero breakpoints?

This is all doable with pure CSS by using container query units, CSS variables, and CSS mathematical functions! Of course, it also involves navigating browser bugs and support gaps. But at the end of the day, it is possible to do it cross-browser!

Let’s see how!

---

## The Basic Idea

### Setup

We start with a `.grid` with a lot of items, let’s say `100`. I normally prefer to generate them in a loop using a preprocessor to avoid clutter in the HTML and to make it easy to change their number, but it’s also possible to do so using Emmet. For the demos illustrating the concept here, we’re using [<FontIcon icon="iconfont icon-pug"/>Pug](https://pugjs.org/api/getting-started.html), and also numbering our items via their text content:

```pug
.grid  
  - for(let i = 0; i < 100; i++)  
    .item #{i + 1}
```

Our `.grid` has `auto-fit` columns:

```css
.grid {
  --u: 7em;

  display: grid;
  grid-template-columns: repeat(auto-fit, var(--u));
  container-type: inline-size
}
```

This means our `.grid` has as many columns of unit width `u` as can fit within its own `content-box` width. This width is flexible and is given by the page layout, we don’t know it. However, its children (the `.item` elements) can know it as `100cqw` in container query units. To have these container units available for the `.grid` element’s children (and pseudos), we’ve made the `.grid` an inline container.

This *should* work just fine. And it does, in both Chrome and Firefox. However, if we try it out in Safari, we see our `.grid` is collapsed into a point. Unfortunately, in Safari, `auto-fit` grids break if they are also containers. (Note: this [<FontIcon icon="iconfont icon-webkit"/>Safari bug is actually fixed](https://bugs.webkit.org/show_bug.cgi?id=282326), it’s just waiting to make it’s way to a stable release.)

We have two options in this case.

The first would be to replace `auto-fit` with `auto-fill`. When we have as many items as we do in this case, we can use either of them, the difference between them is only noticeable [when we don’t even have enough items to fill one row (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/gOayvpb).

```css
.grid {
  --u: 7em;

  display: grid;
  grid-template-columns: repeat(auto-fill, var(--u));
  container-type: inline-size
}
```

The second would be to put the `.grid` inside a wrapper `.wrap` element and move the `container` property on the wrapper.

```css
.wrap { container-type: inline-size }

.grid {
  --u: 7em;

  display: grid;
  grid-template-columns: repeat(auto-fit, var(--u))
}
```

We’re going for the first option here.

Now we’re getting to the interesting part!

### Getting the number of columns

In theory, we could get the number `n` of columns on the `.item` children of the `.grid` via division, whose result we round down (if the container width of `100cqw` is 2.23 times the unit width `u` of a column, then we round down this ratio to get the number of columns we can fit, which is 2 in this case):

```css
--n: round(down, 100cqw/var(--u))
```

In practice, while this *should* work, it only works in Safari (since [<FontIcon icon="iconfont icon-webkit"/>Sept 2024](https://webkit.org/blog/15860/release-notes-for-safari-technology-preview-203/)) in Chrome (since [<FontIcon icon="fa-brands fa-chrome"/>June 2025](https://developer.chrome.com/release-notes/138?authuser=1&hl=en)), and where we can test it out by displaying it using [<FontIcon icon="fa-brands fa-stack-overflow"/>the counter hack](https://stackoverflow.com/a/40179718/1397351):

```css
.grid::before {
  --n: round(down, 100cqw/var(--u));

  counter-reset: n var(--n);
  content: counter(n)
}
```

We’ve wrapped this inside a `@supports` block so we have a message that lets us know about this failing in non-supporting browsers (basically Firefox), where we see the following:

![the result in non-supporting browsers: no number of columns can be computed](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/458856822-01b5ed8e-2dc6-42d4-86e4-a0bf73c184fe.png?resize=1024%2C512&ssl=1)

In Safari and Chrome, things look like in the recording below:

<VidStack src="videopress/6c8d173a-0c31-4fae-a55c-6b2978581e61" />

We can see we have a problem when we have one column and it overflows the parent: the ratio between the parent `.grid` width of `100cqw` and the column unit width `u` drops below `1`, so we can fit one item `0` times inside the `content-box` width of the `.grid`. And this is reflected in the `n` value, even though, in practice, we cannot have a grid with less than one column. However, the fix for this is simple: use a `max()` function to make sure `n` is always at least `1`.

```css
--n: max(1, round(down, 100cqw/var(--u)))
```

Whenever the division result drops below `1`, the result of the `max()` function isn’t the `round()` value anymore, but `1` instead.

You can see it in action in demo below, but keep in mind it can only compute the number of columns in supporting browsers (Safari/Chrome):

<CodePen
  user="thebabydino"
  slug-hash="zxGyRZX"
  title="number of auto-fill columns using length division, no Firefox"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Great, but what Firefox? The [<FontIcon icon="fa-brands fa-firefox"/>Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1827404) looks like it’s dormant, so we cannot get the ratio between two length values there.

### Extending support

However, we have [a clever hack (<FontIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j) to solve the problem!

The idea behind is the following: the tangent of an acute angle in a right triangle is the ratio between the length of the cathetus opposing the angle and the length of the cathetus adjacent to it. So basically, the tangent is a ratio between two length values and *such a ratio is precisely what we need*.

![basic trigonometry recap](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/458914425-90bc6a99-75b9-48c9-ab0d-3e7b48358589.png?resize=1024%2C527&ssl=1)

Now you may be wondering what right triangle and what angle do we even have here. Well, we can imagine building a triangle where a cathetus has the same length as the `.grid` parent’s `content-box` width (`100cqw` on the `.item` elements, which we’ll call `w`) and the other has the same length as the column unit width (`u`).

The tangent of the angle opposing the cathetus of length `w` is the ratio between `w` and `u`. Okay, but what is this angle?

![using trigonometric functions to get around browser support gaps](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/458929259-01f2a7cf-dd36-4c3a-9230-d0f0e1dcd6ba.png?resize=1024%2C512&ssl=1)

We can get this angle using the `atan2()` function, which takes two arguments, the length of the opposing cathetus `w` and the length of the adjacent cathetus `u`:

```css
--a: atan2(var(--w), var(--u))
```

Having the angle `a` and knowing that the ratio `f` between `w` and `u` is the tangent of this angle, we can write:

```css
--f: tan(var(--a))
```

Or, replacing the angle in the formula:

```css
--f: tan(atan2(var(--w), var(--u)))
```

In general, know that a length ratio like `w/u` can always be computed as `tan(atan2(w, u))`.

Rounding down this ratio `f` gives us the number of columns of unit width `u` that fit within the `.grid` parent’s `content-box` width `w`.

```css
--n: round(down, var(--f))
```

So we can write it all as follows, introducing also the correction that the number of columns needs to be at least `1`:

```css
--f: tan(atan2(var(--w), var(--u)));
--n: max(1, round(down, var(--f)))
```

That’s it, that’s the formula for `--n` in the case when we don’t have support for getting the ratio of two length values! There is one catch, though: both `--w` and `--u` have to be registered as lengths in order for `atan2()` [<FontIcon icon="fas fa-globe"/>to work properly](https://bsky.app/profile/anatudor.bsky.social/post/3kxmt5qlbbi2e)!

Putting it all together, the relevant code for our demo looks as follows:

```css
.grid {
  --u: 7em;

  display: grid;
  grid-template-columns: repeat(auto-fill, var(--u));
  container-type: inline-size
}

.grid::before, .item {
  --w: 100cqw;
  --f: var(--w)/var(--u);
  --n: max(1, round(down, var(--f)));
}

@supports not (scale: calc(100cqh/3lh)) {
  @property --w {
    syntax: '<length-percentage>';
    initial-value: 0px;
    inherits: true
  }

  @property --u {
    syntax: '<length-percentage>';
    initial-value: 0px;
    inherits: true
  }

  .grid::before, .item { --f: tan(atan2(var(--w), var(--u))) }
}
```

Note that the `.grid` pseudo is only needed to display the `--n` value (using the counter hack) for us to see in the demo without having to register it and then look for it in DevTools (which is the tactic I most commonly use to check the computed value of a CSS variable).

<CodePen
  user="thebabydino"
  slug-hash="MYwZzrY"
  title="number of auto-fill columns with fallback for length division #1: glitch"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Almost there, but not exactly.

### Fixing tiny issues

If you’ve played with resizing the demo above, you may have noticed something is off in Firefox at times. At certain points when the `.grid` element’s `content-box` width `w` is a multiple of the unit column width `u`, for example, when `w` computes to `1008px` and the unit column with `u` of `112px` fits inside it exactly `9` times, Firefox somehow computes the number of columns as being smaller (`8` instead of `9`, in this example).

My first guess was this is probably due to some rounding errors in getting the angle via `atan2()` and then going back from an angle to a ratio using `tan()`. Indeed, if we register `--f` so we can see its value in DevTools, it’s displayed as `8.99999` in this case, even though `1008px/112px` is exactly `9`.

![rounding error caught by Firefox DevTools](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/458947888-cb10b290-d1e2-4ea6-b918-64732facca70.png?resize=1024%2C689&ssl=1)

So this means rounding down `f` results in the number of columns `n` being computed as `8`, even though it’s actually `9`. Hmm, in this case, it might be better to round `f` to a tiny precision of `.00001` *before* rounding it down to get the number of columns `n`:

```css
--f: round(tan(atan2(var(--w), var(--u))), .00001)
```

This seems to get the job done.

<CodePen
  user="thebabydino"
  slug-hash="ZYGVwLM"
  title="number of auto-fill columns with fallback for length division #2: glitch fix"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Still, I’m a bit worried this still might fail in certain scenarios, even though I’ve kept resizing obsessively in Firefox and haven’t encountered any problems after rounding `f`.

So let’s make sure we’re on the safe side and place the `.grid` in a wrapper `.wrap`, make this wrapper the `container`, compute the number of columns `n` on the `.grid` and use it to set the `grid-template-columns`. This way, the essential CSS becomes:

```css
.wrap {
  container-size: inline-type;
}

.grid {
  --w: 100cqw;
  --u: 7em;
  --f: var(--w) / var(--u);
  --n: max(1, round(down, var(--f)));

  display: grid;
  grid-template-columns: repeat(var(--n), var(--u));
  justify-content: center;
}

@supports not (scale: calc(100cqh / 3lh)) {
  @property --w {
    syntax: "<length-percentage>";
    initial-value: 0px;
    inherits: true;
  }

  @property --u {
    syntax: "<length-percentage>";
    initial-value: 0px;
    inherits: true;
  }

  .grid {
    --f: round(tan(atan2(var(--w), var(--u))), 0.00001);
  }
}
```

Note that we may also use `1fr` instead of `var(--u)` for the `grid-template-columns` property if we want the `.item` elements to stretch.

<CodePen
  user="thebabydino"
  slug-hash="PwqXVBK"
  title="number of columns fitting with fallback for length division #3: bulletproof"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Mind the `gap`

Nice, but oftentimes we also want to have a gap in between our rows and columns, so let’s see how the number of columns can be computed in that case.

Whenever we have `n` columns, we have `n - 1` gaps in between them.

<CodePen
  user="thebabydino"
  slug-hash="LEVqOpZ"
  title="Gaps for n columns"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This means that `n` times the unit column width plus `(n - 1)` times the gap space adds up to the container’s `content-box` width:

$$
n\times{u}+\left(n-1\right)\times{s}=w
$$

If we add `s` on both sides in the equation above, we get:

$$
\begin{align*}
n\times{u}+\left(n-1\right)\times{s}+s&=w+s
n\times{u}+n\times{s}-s+s&=w+s
n\times{u}+n\times{s}&=w+s
n\times\left(u+s\right)&=w+s
n&=\frac{\left(w+s\right)}{\left(u+s\right)}
\end{align*}
$$

Putting this into CSS, our ratio looks as follows:

```css
(var(--w) + var(--s)) / (var(--u) + var(--s))
```

Note that in our case, it’s the fraction `f` that we compute this way before we round it to get the number of items `n` and ensure `n` is always at least `1`.

Also note that the CSS variables we need to register for the no `calc()` length division fallback are the numerator and denominator of this fraction. So our essential CSS becomes:

```css
.wrap {
  container-size: inline-type;
}

.grid {
  --w: 100cqw;
  --u: 7em;
  --s: 3vmin;
  --p: calc(var(--w) + var(--s)); /* numerator */
  --q: calc(var(--u) + var(--s)); /* denominator */
  --f: var(--p) / var(--q);
  --n: max(1, round(down, var(--f)));

  display: grid;
  grid-gap: var(--s);
  grid-template-columns: repeat(var(--n), 1fr);
}

@supports not (scale: calc(100cqh / 3lh)) {
  @property --p {
    /* numerator */
    syntax: "<length-percentage>";
    initial-value: 0px;
    inherits: true;
  }

  @property --q {
    /* denominator */
    syntax: "<length-percentage>";
    initial-value: 0px;
    inherits: true;
  }

  .grid {
    --f: round(tan(atan2(var(--p), var(--q))), 0.00001);
  }
}
```

<CodePen
  user="thebabydino"
  slug-hash="QwbYWrX"
  title="number of columns fitting, gap case + fallback"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Let’s Go Wild!

And let’s see where we can use this!

### Highlighting items on a certain column

In order to do something like this, we use the item indices. Once `sibling-index()` is supported cross-browser, we’ll be able to do this:

```css
.item { --i: calc(sibling-index() - 1) }
```

Note that we need to subtract `1` because `sibling-index()` is `1`-based and we need our index `i` to be `0`-based for modulo and division purposes.

Until then, we add these indices in `style` attributes when generating the HTML:

```pug
.grid  
  - for(let i = 0; i < 100; i++)  
    .item(style=`--i: ${0}`) #{i + 1}
```

Let’s say we want to highlight the items on the first column. We get the number of columns `n` just like before. An item is on the first column if `i%n` (which gives us the `0`-based index of the column an item of index `i` is on) is `0`. Now given I used the word *if* there, you might be thinking about [**the new CSS `if()` function**](/css-tricks.com/lightly-poking-at-the-css-if-function-in-chrome-137.md). However, we have a way better supported method here.

If the column index `i%n` is `0`, then `min(1, i%n)` is `0`. If the column index `i%n` isn’t `0`, then `min(1, i%n)` is `1`. So we can do the following:

```css
.item {
  --nay: min(1, mod(var(--i), var(--n))); /* 1 if NOT on the first column */
  --yay: calc(1 - var(--nay)); /* 1 if on the first column! */
}
```

So then we can use `--yay` to highlight the items on the first column by [**styling them differently**](/css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration.md), for example by giving them a different `background`:

```css
.item {
  --nay: min(1, mod(var(--i), var(--n))); /* 1 if NOT on the first column */
  --yay: calc(1 - var(--nay)); /* 1 if on the first column! */

  background: color-mix(in srgb, #fcbf49 calc(var(--yay)*100%), #dedede)
}
```

You can see it in action in the live demo below:

<CodePen
  user="thebabydino"
  slug-hash="gbpqaXK"
  title="highlight first variable grid column, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Now let’s say we want to highlight the items on the last column. In this case, the column index `i%n` is `n - 1`, which means that their difference is `0`:
<!-- TODO: LaTeX 로 표현 -->

$$
\left(n-1\right)-\left(i%n\right)=0
$$

Using this, we can do something very similar to what we did before, as the minimum between `1` and this difference is `0` for items on the last column and `1` for those that aren’t on the last column:

```css
.item {
  /* 1 if NOT on the last column */
  --nay: min(1, (var(--n) - 1) - mod(var(--i), var(--n))));
  /* 1 if on the last column! */
  --yay: calc(1 - var(--nay));
}
```

For example, if `n` is `7`, then the column index `i%n` can be `0`, `1`, … `6` and `n - 1` is `6`. If our item of index `i` is on the last column, then its column index `i%n = i%7 = 6`, so the difference between `n - 1 = 7 - 1 = 6` and `i%n = i%7 = 6` is `0`. If our item of index i isn’t on the last column, then its column index `i%n = i%7 < 6`, so the difference between `n - 1 = 6` and `i%n < 6` is `1` or bigger. Taking the minimum between `1` and this difference ensures we always get either `0` or `1`.
<!-- TODO: LaTeX 로 표현 -->

<CodePen
  user="thebabydino"
  slug-hash="NPqoxWK"
  title="highlight last variable grid column, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In general, if we want to highlight a column of index `k` (`0`-based, but we can just subtract `1` in the formula below if it’s given `1`-based), we need to compute the difference between it and `i%n` (the column index of an item of index `i`), then use the absolute value of this difference inside the `min()`:

```css
.item {
  --dif: var(--k) - mod(var(--i), var(--n));
  --abs: abs(var(--dif));
  --nay: min(1, var(--abs)); /* 1 if NOT on column k */
  --yay: calc(1 - var(--nay)); /* 1 if on column k! */
}
```

The difference and its absolute value are `0` when the item of index `i` is on column `k` and different (bigger in the case of absolute value) when it isn’t.

We need the absolute value here because, while the difference between `n - 1` and `i%7` is always `0` or bigger, that is not the case for the difference between any random `k` and `i%n`. For example, if `n` is `7` and `k` is `2`, the `k - i%n` difference is negative when `k` is smaller than `i%n`, for example when `i%n` is `5`. And we need the difference that goes into the `min()` to be `0` or bigger in order for the `min()` to always give us either `0` or `1`.
<!-- TODO: LaTeX 로 표현 -->

All modern stable browsers support `abs()`, but for the best possible browser support, we can still test for support and use [**the fallback**](/css-tricks.com/using-absolute-value-sign-rounding-and-modulo-in-css-today.md):

```css
@supports not (scale: abs(-2)) {
  .item { --abs: max(var(--dif), -1*(var(--dif))) }
}
```

Also, note that if the selected column index `k` is equal to `n` or bigger, no items get selected.

In the interactive demo below, clicking an item selects all items on the same column:

<CodePen
  user="thebabydino"
  slug-hash="raVPYqx"
  title="highlight column of index k on variable grid, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It does this by setting `--k` (in the `style` attribute of the `.grid`) to the index of that column.

![A code snippet from a web developer's browser console showcasing CSS rules for items in a grid layout, including custom properties for styling.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/460213331-95aec4e4-3664-4112-97ea-750361218e3f.png?resize=1024%2C558&ssl=1)

Chrome DevTools screenshot showing `--k` being set on the `.grid` parent and used in computations on `.item` children

We can also highlight items on either odd or even columns:

```css
.item {
  /* 1 if on an even column, 0 otherwise */
  --even: min(1, mod(mod(var(--i), var(--n)), 2));
  /* 1 if on an odd colum, 0 otherwise */
  --odd: calc(1 - var(--even));
}
```

<CodePen
  user="thebabydino"
  slug-hash="OPVqzKJ"
  title="highlight odd/ even variable grid columns, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is a particular case of highlighting every `k`-th column starting from column `j` (again, `j` is a `0`-based index and smaller than `k`):

```css
.item {
  --dif: var(--j) - mod(mod(var(--i), var(--n)), var(--k));
  --abs: abs(var(--dif));
  --nay: min(1, var(--abs));
  /* 1 if on one of every kth col starting from col of index j */
  --yay: calc(1 - var(--nay));
}
```

<CodePen
  user="thebabydino"
  slug-hash="Jodzpeq"
  title="highlight every kth column of variable grid from jth one, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Highlighting items on a certain row

If we want to highlight the items on the first row, this means their index `i` must be smaller than the number of columns `n`. This means the difference `n - i` must be bigger than `0` for items on the first row. If we clamp it to the `[0, 1]` interval, we get a value that’s `0` on every row but the first and `1` on the first row.
<!-- TODO: LaTeX 로 표현 -->

```css
.item {
  --yay: clamp(0, var(--n) - var(--i), 1)  /* 1 if on the first row! */
}
```

<CodePen
  user="thebabydino"
  slug-hash="pvJGpzJ"
  title="highlight first variable grid row, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There is more than one way to skin a cat however, so another approach would be to get the row index, which is the result of `i/n` rounded down. If this is `0`, the item of index `i` is on the first row. If it’s bigger than `0`, it isn’t. This makes the minimum between `1` and `i/n` rounded down be `0` when the item of index `i` is on the first row and `1` when it isn’t.
<!-- TODO: LaTeX 로 표현 -->

```css
.item {
  --nay: min(1, round(down, var(--i)/var(--n))); /* 1 if NOT on the first row */
  --yay: calc(1 - var(--nay)); /* 1 if on the first row! */
}
```

This second approach can be modified to allow for highlighting the items on any row of index `k` as the difference between `k` and `i/n` rounded down (the row index) is `0` if the item of index `i` is on the row of index `k` and non-zero otherwise:

```css
.item {
  --dif: var(--k) - round(down, var(--i)/var(--n));
  --abs: abs(var(--dif));
  --nay: min(1, var(--abs)); /* 1 if NOT on row of index k */
  --yay: calc(1 - var(--nay)); /* 1 if on row of index k! */
}
```

<CodePen
  user="thebabydino"
  slug-hash="raVRpVe"
  title="highlight row of index k on variable grid, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Highlighting the items on any row includes the last one. For this, we need to know the total number `t` of items on our grid. This means `(t - 1)` is the index of the last grid item, and we can get the index of the row it’s on (that is, the index of the final row) by rounding down `(t - 1)/n`. Then we substitute `k` in the previous formula with the index of the final row we’ve just obtained this way.
<!-- TODO: LaTeX 로 표현 -->

```css
.item {
  /* 1 if NOT on last row */
  --nay: min(1, round(down, (var(--t) - 1)/var(--n)) - round(down, var(--i)/var(--n)));
  /* 1 if on last row! */
  --yay: calc(1 - var(--nay));
}
```

There are two things to note here.

One, we don’t need the absolute value here anymore, as the last row index is always going to be bigger or equal to any other row index.

Two, we’re currently passing the total number of items `t` to the CSS as a custom property when generating the HTML:

```pug
- let t = 24; //- total number of items on the grid  
  
.wrap  
  .grid(style=`--t: ${t}`)  
    - for(let i = 0; i < t; i++)  
      .item(style=`--i: ${i}`) #{i + 1}
```

But once `sibling-count()` is supported cross-browser, we won’t need to do this anymore and we’ll be able to write:

```css
.item { --t: sibling-count() }
```

<CodePen
  user="thebabydino"
  slug-hash="jEPJGNV"
  title="highlight last variable grid row, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Just like before, we can highlight items on odd or even rows.

```css
.item {
  /* 1 if on an even row */
  --even: min(1, mod(round(down, var(--i)/var(--n)), 2));
  /* 1 if on an odd row */
  --odd: calc(1 - var(--even));
}
```

<CodePen
  user="thebabydino"
  slug-hash="qEdvpzy"
  title="highlight odd/ even variable grid rows, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And the odd/ even scenario is a particular case of highlighting items on every `k`-th row, starting from row of index `j`.

```css
.item {
  --dif: var(--j) - mod(round(down, var(--i)/var(--n)), var(--k));
  --abs: abs(var(--dif));
  --nay: min(1, var(--abs));
  /* 1 if on one of every kth row starting from row of index j */
  --yay: calc(1 - var(--nay));
}
```

<CodePen
  user="thebabydino"
  slug-hash="jEPJJWx"
  title="highlight every kth row of variable grid from jth one, no breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Taking it Further

Another thing this technique can be used for is creating responsive grids of non-rectangular shapes with no breakpoints. An example would be the hexagon grid below. We aren’t going into the details of it here, but know it was done using this technique plus a few more computations to get the right hexagon alignment.

<CodePen
  user="thebabydino"
  slug-hash="QwWQqeR"
  title="Pure CSS responsive hex grid, no breakpoints!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get the number of auto-fit/auto-fill columns in CSS",
  "desc": "The whole point of auto-fit and auto-fill is that you aren't saying how many columns to use. But if you knew how many the browser chose, you can make nice design decisions.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/count-auto-fill-columns.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
