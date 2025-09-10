---
lang: en-US
title: "We Might Need Something Between Root and Relative CSS Units for “Base Elements”"
description: "Article(s) > We Might Need Something Between Root and Relative CSS Units for “Base Elements”"
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
      content: "Article(s) > We Might Need Something Between Root and Relative CSS Units for “Base Elements”"
    - property: og:description
      content: "We Might Need Something Between Root and Relative CSS Units for “Base Elements”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/we-might-need-something-between-root-and-relative-css-units-for-base-elements.html
prev: /programming/css/articles/README.md
date: 2025-08-13
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/10/random-number-slots.png
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
  name="We Might Need Something Between Root and Relative CSS Units for “Base Elements”"
  desc="I've come to realize that perhaps we need to have a unit between root and relative values. This would bring about a whole new possibility when creating reusable components."
  url="https://css-tricks.com/we-might-need-something-between-root-and-relative-css-units-for-base-elements"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/10/random-number-slots.png"/>

CSS provides us with root and relative values.

- Root values are like `rem` and `rlh` — they’re tied to the values written in the `:root` selector (the most common one would be the `html` element).
- Relative values are like `em`, `lh`, `ch` and various others — they’re tied to the `font-size` in that specific element.

I’ve come to realize that perhaps we need to have a unit between root and relative values. Having such a unit allows us to size things without complex `em` or `lh` calculations.

---

## Let me give you an example: Prose

Earlier this year, [<VPIcon icon="fas fa-globe"/>Jen Simmons](https://jensimmons.com) wrote about [<VPIcon icon="iconfont icon-webkit"/>the using the `lh` unit](https://webkit.org/blog/16831/line-height-units/) to style `margin` and `padding` for better [<VPIcon icon="fas fa-globe"/>typographical vertical rhythm](https://zellwk.com/blog/why-vertical-rhythms/).

```css
p { margin-block: 1lh; } 
```

We can expand the concept a little further to include all other spaces around the text. One way of doing this is the [<VPIcon icon="fas fa-globe"/>“Lobotomized Owl” technique](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) that [<VPIcon icon="fas fa-globe"/>Heydon Pickering](https://heydonworks.com) popularized a while ago.

```css
* + * {
  margin-top: 1lh;
}
```

Today, we can also use the `:not(:first-child)` to achieve the same effect — and that might be a tad more readable.

```css
*:not(:first-child) {
  margin-top: 1lh;
}
```

Often, we need to constrain these selectors so they don’t spill everywhere and break the rest of the page. One great class for this is `.prose`.

```css
.prose {
  *:not(:first-child) {
    margin-top: 1lh;
  }
}
```

This is simple and good — but what happens if you include typography of other sizes…? You’ll see this break down incredibly quickly (because `1lh` of a `<h2>` element can be incredibly big).

CodePen Embed Fallback
https://codepen.io/zellwk/pen/dPoByEY
Problem with lh

One way around this issue is to use [<VPIcon icon="iconfont icon-css-tricks"/>Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) on the parent element. By doing so, we can set `gap` to `1lh` and we don’t have to deal with the value of `1lh` changing on the `h2` element. (Bonus, we also don’t have to deal with margin [***collapse***](/css-tricks.com/what-you-should-know-about-collapsing-margins.md).)

```css
.prose {
  display: flex; 
  flex-direction: column;
  gap: 1lh;
}
```

CodePen Embed Fallback
https://codepen.io/zellwk/pen/PwqrwbO
Simple Prose

But we introduce a new problem here: **proximity confusion**.

Content below `<h2>` belongs within the `<h2>`. *But content above the `<h2>` belongs with the previous section header.* We should, ideally, make the spacing different to clarify their relationship.

The simplest way is to add a little margin above the `<h2>`.

But we can’t add margin above `<h2>` with `lh` since the `lh` value on `<h2>` will be different from that of the surrounding elements.

CodePen Embed Fallback
https://codepen.io/zellwk/pen/wBaLBeX
Simple Prose Without Proximity Confusion, but not ideal

We have to use a little CSS trickery and `margin-bottom` (or the logical equivalent) on the element above the `<h2>`. Here, we simply set `margin-bottom` to `1lh` since we use Flexbox and don’t have to deal with margin collapse. (If you had to deal with margin collapse, you’d have to set `margin-bottom` to `2lh`.)

CodePen Embed Fallback
https://codepen.io/zellwk/pen/JodQoJX
Simple Prose Without Proximity Confusion

Is there a better way? Well, that’s what this article is about!

But before we go there, let’s consider a different UI that has similar problems so you can begin to see the greater ramifications of this problem (and the importance of the solution).

---

## Here’s a second example: Card component

Now let’s say we have a card component that’s divided into two parts, header and content.

In these kind of components, the header is often styled with a different `font-size` than the content.

![Card component example. Large black heading says Card Header. There is a border between the header and a paragraph of placeholder text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/base-units-card.png?resize=1198%2C520&ssl=1)

To create such a card, the simplest markup may be:

```html
<div class="card">
  <h2 class="title">Card Title</h2>
  <div class="content">Card Content</div>
</div>
```

Unfortunately, we cannot use the `lh` unit to create the padding within the card — doing so causes the margin on the `<h2>` element to blow (incredibly) out of proportion!

CodePen Embed Fallback
https://codepen.io/zellwk/pen/raVEada
Card with lh — negative example

There are, of course, many ways to handle this type of situation.

One possible way is to change the markup such that the `<h2>` resides in a `<header>` element. When we do this, we can apply the padding on the `<header>`, bypassing the enlarged `1lh` problem.

```html
<div class="card">
  <header class="title">
    <h2>Card Title</h2>
  </header>
  <div class="content">Card Content</div>
</div>
```

CodePen Embed Fallback
https://codepen.io/zellwk/pen/bNdPNvm
Card with lh — Change markup

While changing the markup solves the problem, it’s not ideal — since we probably don’t want to create an extra `header` element unless it’s necessary…

Well, another possible method is to use a root value like `rlh`. This allows `<h2>` and `content` to use the same base unit, and therefore, create the same padding.

CodePen Embed Fallback
https://codepen.io/zellwk/pen/RNPzNLZ
Card with rlh

But we still run into problems if the `.card` needs to scale to different `font-size` values. Imagine you want to make a smaller card — now `1rlh` isn’t going to look right since the padding value becomes too big in proportion to the content.

CodePen Embed Fallback

What can we do?

A simple solution is to change the `padding` value according to the supported variants of the component — but this kinda thing is sorta hard-coded and not very friendly…

```css
.card-sm { --padding: 0.75rlh; }
.card-md { --padding: 1rlh; }
.card-lg { --padding: 1.25rlh; }
```

CodePen Embed Fallback
https://codepen.io/zellwk/pen/zxGVxjv
Double card — broken

What’s the alternative?

This is where an intermediary between root and relative units might come in handy.

---

## The handy in-between unit

This section is purely speculative CSS to illustrate a point. We’ll follow up with a simple way to actually do this in practice today in a later section, so hang tight and follow along conceptually for now.

Let’s say we have a unit that takes it’s reference value from a specified element. We’ll call this a `base` unit, for lack of a better name.

- So, 1 `base` font-size unit could be `1bem`.
- And 1 `base` line-height unit could be `1blh`.

Pretty easy at this point.

Imagine we can style the cards with this base unit. Then we can simply use `1blh` to quantify the padding and everything else would be sized appropriately:

```css
.card {
  > * { padding: 1blh; }  
}

.card-sm { font-size: 0.8em; }
.card-md { font-size: 1em; }
.card-lg { font-size: 1.2em; }
```

Hurrah?

Tying this back to the `.prose` example earlier, it could very well resolve the proximity confusion issue without complicating our selectors:

```css
.prose {
  h2:not(:first-child) {
    margin-top: 2blh;
  }
}
```

---

## How might this work?

For this function to be added easily to modern CSS, I could think of two possible ways:

1. Attach that to container queries.
2. Define a syntax similar to anchor positioning.

### The container query method

We already have stuff like `cqw` and `cqh` to denote [**container width and container height values**](/css-tricks.com/css-container-queries.md#aa-container-length-units). It’s not too far of a cry to say we could have a `cqem` (container-query `em`) unit or `cqlh` (container-query line-height).

There are downsides to this approach.

First, containers need to be defined in a parent element. This requires more markup and makes the code somewhat complex and unintuitive. This code below might be a possible implementation:

```html
<div class="container">
  <div class="card">
    <h2 class="title">Card Title</h2>
    <div class="content">Card Content</div>
  </div>
</div>
```

```css
.container {
  container-type: inline-size; 
}

.card {
  > * { padding: 1cqbl; }
}
```

Dealing with nested containers isn’t much a problem, because we can always set the `container-name` we want to inherit from. But, there might be a collision if we want to use different container references for `cqbl` and `cqw`.

Imagine this:

```html
<!-- We might want to inherit the cqem or cqbl from here -->
<div class="container-base">

  <!-- But we might need cqw or cqh from here -->
  <div class="two-column-grid"> 
    <div class="card">...</div>
    <div class="card">...</div>
  </div>

</div>
```

Kinda sucks to be limited by container collisions.

### Anchor positioning syntax

In this case, we first decide the base we want to inherit from. We can call this a `base-anchor`, or something similar.

Here, we can explicitly set a base anchor name — or perhaps even leave it as `none` if we don’t wanna name it. Then the rest of the elements within could inherit from this base value immediately:

```css
.card {
  base-anchor: --card; /* or perhaps none */
  > * { padding: 1blh; }
}
```

If we need to refer to this anchor from a completely unrelated component, we can leverage the anchor name and simply do this:

```css
.far-away-comp {
  base-name: --card; 
  /* Then use blh from here */
}
```

### Double anchor

One fascinating aspect I can think of is a potential double-anchor use case where the `base` component is able to inherit its `font-size` or value from yet another base or its parent element.

This flexibility lets us create component variations based on font sizes incredibly easily without needing to rely on complex `em` calculations.

Here’s an example of what I’m talking about:

```css
.prose {
  base-anchor: --prose;
  font-size: 1em;
  line-height: 1.5;
}

/* Inherits font-size from .prose */
/* This is automatic if base-name is not provided */
.card {
  base-anchor: none;
  base-name: --prose;

  /* In this case, 1blh could be 1.5em */
  > * { padding: 1blh; }
}

/* After inheriting the font size, since we have a base-anchor in the card, we adjust the font-size value accordingly, so: 
  - 1bem would mean 0.8em further in the card
  - 1blh could then mean 0.8 * 1.5em = 1.2em 
*/
.card.card-sm {
  font-size: 0.8em;
}
```

Fascinating, yeah? This brings about a whole new possibility when creating reusable components.

---

## Putting it into practice today

Let me preface this section with the fact that `bem` and `blh` does not exist today. So whatever implementation I can come up with is simply an imperfect stop-gap measure.

**Today, we are certain that we can use the `em` unit for such a purpose** — but this requires a little bit more calculation, since `em` is a relative, not a base unit.

The first step is to determine the `base` element — and the `base` font size — which we can do by setting the `base-size` property:

```css
.card { 
  --base-size: 1em; 
  font-size: var(--base-size);
}

.card-sm { 
  --base-size: 0.8em; 
}
```

We can then simulate the `bem` (base `em`) unit by dividing the intended `font-size` with the `base-size`:

```css
.card {
  h2 {
    --font-size: 2em;
    font-size: calc(var(--font-size) / var(--base-size));  
  }
}
```

Unfortunately, the above code won’t work because we can’t perform a `calc()` division with a unit-ed value. So the best we can do to remove the units from `--base-size`.

When we do this, we need to perform another `calc()` on the base element to create the actual `font-size` property:

```css
.card { 
  --base-size: 1; 
  font-size: calc(var(--base-size) * 1em);
}
```

Then we perform the same `calc()` in the `<h2>` to create its font size:

```css
.card {
  h2 {
    --font-size: 2;
    font-size: calc(var(--font-size) / var(--base-size) * 1em);  
  }
}
```

This is all starting to get a little “ugh”.

Nobody wants to all these boilerplate code. So, this is best abstracted away with a mixin, or perhaps even a function. If you use Sass, you might imagine something like this:

```scss
@mixin base-anchor() {
  font-size: calc(var(--base-size) * 1em);
}
```

If you use Tailwind, perhaps you can imagine the Tailwind utility to do the same. After all, [**Tailwind utilities can be seen as convenient Sass mixins**](/css-tricks.com/tailwinds-apply-feature-is-better-than-it-sounds.md).

```css
@utility base-anchor {
  font-size: calc(var(--base-size) * 1em);
}
```

We can then apply this utility into the base element. The code looks a little bit cleaner:

```css
.card {
  @apply base-anchor; 
  --base-size: 1; 
}

.card-sm { --base-size: 0.8; }
```

For the `<h2>`, we can create another utility to perform the calculation for us. It’ll look something like this:

```css
@utility text-relative {
  font-size: calc(var(--text-size) / var(--base-size) * 1em);
}
```

We can then use the utility like this:

```css
.card .title {
  @apply text-relative;
  --text-size: 2; 
}
```

Now, to calculate the `padding` of the card for the `.title` element, we need to reverse the `font-size` to get the `base-size` value. This is best done with a [**CSS function**](/css-tricks.com/functions-in-css.md), which is not widely supported today, but hopefully, soon!

```css
@function --bem(--multiplier) {
  result: calc(var(--text-size / var(--base-size) * 1em * --multiplier));
}
```

We can then use `--bem` to calculate the padding on the card title:

```css
.card .title {
  /* ... */
  padding-block: --bem(0.5);
  padding-inline: --bem(1);
}
```

We mentioned above that the `lh` value works better for margin and padding since it preserves vertical rhythm. So, why not create a `--blh` function too?

In this case, we can add a `--leading` variable that the function can inherit from:

```css
@function --blh(--multiplier, --lh-multiplier) {
  result: calc(
    var(
      --text-size / var(--base-size) * 1em * --multiplier *
        var(--lh-multiplier, var(--leading))
    )
  );
}
```

Then we can use `--blh` like this:

```css
.card .title {
  /* ... */
  padding-block: --blh(0.5);
  padding-inline: --blh(1);
}
```

### In the spirit of today

We can’t use `--bem` and `--blh` in production because CSS Functions are not available all browsers yet. In the spirit of making `bem` work *right now*, we can create a utility, that calculates the `--base-font-size` from the `--font-size`.

Notice this new variable is called `--base-font-size`, not `--base-size`, since `--base-size` is already used. (We cannot overwrite the CSS variable.)

```css
/* I multiplied the value by 1em here to make it easy for you to use the value */
@utility base-font-size {
  --base-font-size: calc(var(--base-size) / var(--font-size) * 1em);
}
```

We can also create a utility called `base-line-height` to get the value of the `line-height`. When we do this, it’s much easier if we also pass in a `--leading` variable:

```css
@utility base-line-height {
  --base-leading: calc(var(--base-font-size)* var(--leading));
}
```

Then we can use `calc` on `--base-leading` to get the values we want:

```css
.card .title {
  @apply text-relative;
  @apply base-font-size;
  @apply base-line-height;
  --font-size: 2; 
  padding-inline: var(--base-line-height);
  padding-block: calc(var(--base-line-height) * 0.5);
}
```

### Putting it all together

Let’s first put together the necessary utilities and functions to make this happen today:

```scss
/* The necessary utilities */
@utility base-anchor {
  font-size: calc(var(--base-size) * 1em);
}

@utility text-relative {
  font-size: calc(var(--font-size) / var(--base-size) * 1em);
}

/* To use this today */
@utility base-font-size {
  --base-font-size: calc(var(--base-size) / var(--font-size) * 1em);
}

@utility base-line-height {
  --base-line-height: calc(var(--base-font-size)* var(--leading));
}

/* Easier usage when CSS Functions become available */
@function --bem(--multiplier) {
  result: calc(var(--font-size / var(--base-size) * 1em * --multiplier));
}

@function --blh(--multiplier, --lh-multiplier) {
  result: calc(
    var(
      --font-size / var(--base-size) * 1em * --multiplier *
        var(--lh-multiplier, var(--leading))
    )
  );
}
```

Now here’s the `.card` code to achieve the functionality in Tailwind we were talking about. [<VPIcon icon="iconfont icon-tailwindcss"/>You can see it at work here](https://play.tailwindcss.com/jBfW6lrdMv?file=css).

```css :collapsed-lines
/* What we can actually use today */
.card {
  @apply base-anchor;
  --base-size: 1;
  --leading: 1.5;
  
  > * { padding: 1lh; }

  .title {
    @apply text-relative;
    @apply base-font-size;
    @apply base-line-height;
    --font-size: 2; 
    padding-inline: var(--base-line-height);
    padding-block: calc(var(--base-line-height) * 0.5);
  }
}

.card-sm {
  --base-size: 0.8;
  .title {
    --font-size: 1.2;
  }
}

/* What we can use when CSS Functions are available */
.card {
  @apply base-anchor;
  --base-size: 1;
  
  > * { padding: calc(--blh(1)); }

  .title {
    @apply text-relative;
    --text-size: 2; 
    padding-block: calc(--blh(0.5));
  }
}
```

It’s still not as pretty as the `bem` and `blh` versions I’ve shown you above, but at the very least, we achieve some sort of functionality, yeah? And it doesn’t look half bad!

---

## Using this with Splendid Labz today

[<VPIcon icon="fas fa-globe"/>Splendid Styles](https://splendidlabz.com/solutions/styles/) — the branch of [<VPIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/) that handles design and styles — contains the code you can use today.

We also included the `--bem` and `--blh` versions if you wanna play with them as well.

To use Splendid Styles, just download the library, import the `base-font-size` file, and do what you’ve just seen the above!

```sh
npm i @splendidlabz/styles
```

```css
@import '@splendidlabz/styles/typography/base-font-size.css'
```

That’s it!

Now, if you’re interested in all of the tools I’m been cooking up to make web development simpler, you can grab an early bird discount for [<VPIcon icon="fas fa-globe"/>the Splendid Pro package](https://splendidlabz.com/solutions/pro/?ref=css-tricks) today — this is available to all CSS-Tricks readers!

(I might add a lifetime option to the Styles package as it evolves to sufficiently. But it might be a year or so before that happens.)

Alright, enough promotion. Let’s come back here.

---

## What do you think about this unit between root and relative values?

I hesitate to call it “base” `em` because “base” can mean so many things. But it also sounds right at the same time.

- Does `bem` and `blh` make sense to you?
- Do you think I’m thinking a wee bit too much for this design aspect?
- Maybe you’ve got a better name for this?

I’d love to hear from you so please feel free to share your thoughts below!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "We Might Need Something Between Root and Relative CSS Units for “Base Elements”",
  "desc": "I've come to realize that perhaps we need to have a unit between root and relative values. This would bring about a whole new possibility when creating reusable components.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/we-might-need-something-between-root-and-relative-css-units-for-base-elements.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
