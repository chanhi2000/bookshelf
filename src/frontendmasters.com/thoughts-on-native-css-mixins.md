---
lang: en-US
title: "Thoughts on Native CSS Mixins"
description: "Article(s) > Thoughts on Native CSS Mixins"
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
      content: "Article(s) > Thoughts on Native CSS Mixins"
    - property: og:description
      content: "Thoughts on Native CSS Mixins"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/thoughts-on-native-css-mixins.html
prev: /programming/css/articles/README.md
date: 2025-12-11
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8020
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
  name="Thoughts on Native CSS Mixins"
  desc="There are no browser implementations of mixins yet, nor a fleshed out spec. So perhaps now is the best time to try to understand and opine."
  url="https://frontendmasters.com/blog/thoughts-on-native-css-mixins/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8020"/>

I have some notes from various times I’ve thought about the idea of native CSS mixins so I figured I’d get ’em down on (digital) paper!

For the record, they don’t really exist yet, but Miriam Suzanne [<VPIcon icon="fas fa-globe"/>says](https://oddbird.net/2024/06/11/removing-mixins/):

> The CSS Working Group has agreed to move forward with CSS-native mixins.

And there is a [<VPIcon icon="iconfont icon-w3c"/>spec](https://w3.org/TR/css-mixins-1/), but the spec only deals with`` css
`@function` (which *does* [<VPIcon icon="fa-brands fa-firefox"/>exist](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@function)). Functions are a little similar but act only as a single value rather than a block of styles.

---

## The idea comes from Sass `@mixin`

We happen to use Sass (SCSS) at CodePen and as I write, we have 328 [<VPIcon icon="fa-brands fa-saas"/>`@mixin` definitions](https://sass-lang.com/documentation/at-rules/mixin/) in the codebase, so it’s clearly of use.

Here’s a practical-if-basic example:

```scss{1}
@mixin cover {
  position: absolute;
  inset: 0;
}
```

In Sass, that doesn’t compile to anything. You have to use it. Like:

```scss{2,6}
.modal-overlay {
  @include cover;
}
.card.disabled {
  &::before {
    @include cover;
    background: lch(0% 0 0 / 0.8);
  }
}

```

See how I’ve used it *twice* above. Compiled Sass will dump in the contents of the mixin in both places:

```css{2-3,7-8}
.modal-overlay {
  position: absolute;
  inset: 0;
}
.card.disabled {
  &::before {
    position: absolute;
    inset: 0;
    background: lch(0% 0 0 / 0.8);
  }
}

```

Things can get a little fancier in Sass, but it’s all pretty straightforward:

- Mixins can include nesting and work in nested code. They can even slot in nested content you pass to it.
- Mixins can use other mixins.
- Mixins can have parameters (like a function) and use/calculate off those values in the output.

I would assume and hope that all of this is supported in native CSS mixins. The native version, as explained so far on Miriam’s site (which will almost definitley change!), the only difference is the usage syntax:

```css{1,6}
@mixin --cover {
  position: absolute;
  inset: 0;
}
.modal-overlay {
  @apply --cover;
}

```

I imagine it’s`` css
`@apply` instead of`` css
`@include` literally because Sass uses`` css
`@include` and Sass would have a hard time “leaving it alone” when processing down to CSS.

---

## Is there enough here for browsers/standards to actually do it?

The W3C CSS Working Group has already OK’d the idea of all this, so I assume it’s already been determined there is value to native CSS having this ability at all. But what are those reasons?

- **Not having to reach for a preprocessor tool like Sass.** I don’t think this is enough of a reason all by itself for them, but personally, I do. This is a paved cowpath, as they say.
- **Preprocessor output has potentially a lot of duplicate code.** This leads to bigger CSS files. Perhaps not a huge issue with gzip/brotli in play, but still, smaller files is almost always good.
- **Integration with `--custom-properties`.** I would think the parameters could be custom properties and there could be custom properties used generally with the style block. Custom properties can change dynamically, causing re-evaluated styles, so mixins can become more powerful expressions of style based on a comparatively small custom property change.
- **Custom Properties can cascade** and be different values at different points in the DOM, so mixins might also do different things at different points in the DOM. All this custom property stuff would be impossible in a preprocessor.
- **It’s a nicer API than faking it with`` css
`@container style()`**. You can test a custom property with a style query and dump out styles in certain places now, but it doesn’t feel quite right.

I wonder what else tipped the scales toward the working group doing it.

---

## Parameter handling seems tricky

You can pass things to a mixin, which I think is pretty crucial to their value.

```css
@mixin --setColors(--color) {
  color: var(--color);
  background-color: oklch(from var(--color) calc(l - 40%) c h / 0.9);
}
```

But things can get weird with params. Like what happens if you call `setColors()` with no params? Does it just fail and output nothing?

```css
.card {
  @apply --setColors(); /* ??? */
}
```

It’s possible `--color` is set anyway at the cascade level it’s being used at, so maybe it has access to that and outputs anyway? I assume if `--color` is set at the same cascade level *and* the param is passed, the param value wins? How does `!important` factor in?

And what about typed params? And default values? Seems doable but quite verbose feeling, especially for CSS. Is it like…

```css
@mixin --setColors(
  --color type(color): red
) {
  color: var(--color);
  background-color: oklch(from var(--color) calc(l - 40%) c h / 0.9);
}
```

Maybe like that? I’m not sure what the syntax limitations are. Or maybe we don’t need default values at all because the `var()` syntax supports fallbacks already?

---

## Feels like it could open up a world of more third-party CSS usage

Imagine [<VPIcon icon="fa-brands fa-chrome"/>CSS carousels](https://chrome.dev/carousel-configurator/). They are so cool. And they are quite a bit of CSS code. Perhaps their usage could be abstracted into a`` css
`@mixin`.

The jQuery days were something like this pseudo-code:

```js title="plugins/owl-carousel.js"
$(".owl-carousel").owlCarousel({
  gap: 10, 
  navArrows: true,
  navDots: true
});
```

Which morphed into JavaScript components:

```jsx
@import SlickCarousel from "slickcarousel";

<SlickCarousel
  gap="10"
  navArrows={true}
  navDots={true}
/>
```

Maybe that becomes:

```css
@import "/node_modules/radcarousel/carousel.css";

.carousel {
  @apply --radCarousel(
    --gap: 10px,
    --navArrows: true,
    --navDots: true
  );
}
```

The jQuery version was DIY HTML and this would be too. You could call that SSR for free, kids.

---

## What about “private” variables?

I sort of remember Miriam talking about this at CSS Day this past year. I think this was the issue:

```css{2,8}
@mixin --my-thing {
  --space: 1rem;
  gap: var(--space);
  margin: var(--space);
}
.card {
  @apply --my-thing;
  padding: var(--space); /* defined or not? */
}

```

The question is, does that `--space` custom property “leak out” when you apply the mixin and thus can be used there? It either 1) does 2) doesn’t 3) some explicit syntax is needed.

I can imagine it being useful to “leak” (return) them, so say you wanted that behavior by default, but the option to not do that. Maybe it needs to be like…

```css{2-4}
@mixin --my-thing {
  @private {
    --space: 1rem;
  }
  gap: var(--space);
  margin: var(--space);
}

```

Don’t hate it. Miriams post also mentions being more explicit about what is returned like using an`` css
`@output` block or privatizing custom properties with a `!private` flag.

---

## What about source order?

What happens here?

```css{7-9}
@mixin --set-vars {
  --papaBear: 30px;
  --mamaBear: 20px;
  --babyBear: 10px;
}
.card {
  --papaBear: 50px;
  @apply --set-vars;
  margin: var(--papaBear);
}

```

What `margin` would get set here? 50px because it’s set right there? 30px because it’s being overridden by the mixin? *What if you reversed the order of the first two lines?* Will source order be the determining factor here?

---

## Are Custom Idents required?

All the examples use the `--my-mixin` style naming, with the double-dashes in front, like custom properties have. This type of using is called a “custom ident” as far as I understand it. It’s what custom functions are required to use, and they [<VPIcon icon="iconfont icon-w3c"/>share the same spec](https://w3.org/TR/css-mixins-1/), so I would think it would be required for mixins too.

```css
/* 🚫 */
@mixin doWork {
}

/* ✅ */
@mixin --doWork {
}
```

Is this just like the way forward for all custom named things forever in CSS? I think it’s required for anchor names too, but not container names? I wish it was consistent, but I like backwards compatibility better so I can live.

Wouldn’t it be better if it was required for keyframes, for example? Like if you saw this code below, is it obvious what the user-named word is and what other things are language syntax features?

```css
.leaving {
  animation: slide 0.2s forwards;
}
```

It’s `slide` here, so you’d have to go find it:

```css
@keyframes slide {
  to { translate: -200px 0; }
}
```

To me it would be much more clear if it was:

```css
.leaving {
  animation: --slide 0.2s forwards;
}
@keyframes --slide {
  to { translate: -200px 0; }
}
```

Annnnnnnd there is nothing really stopping us from doing that so maybe we should. Or take it one step further and adopt [<VPIcon icon="fas fa-globe"/>an emoji naming structure](https://nerdy.dev/css-emoji-convention).

---

## Calling Multiple Mixins

Would it be like?

```css
@apply --mixin-one, --mixin-two;
```

Maybe space-separated?

```css
@apply --mixin-one --mixin-two;
```

Or that is weird? Maybe you just gotta do it individually?

```css
@apply --mixin-one;
@apply --mixin-two;
```

Does it matter?

---

## Functions + Mixins

It seems to make sense that a mixin could call a function…

```css
@mixin --box {
  gap: --get-spacing(2);
  margin-trim: block;
  > * {
    padding: --get-spacing(4);
  }
}
```

But would it be forbidden the other way around, a function calling a mixin?

```css{2,5}
@function --get-spacing(--size) {
  @apply get-vars(); /* ??? */
  result: 
    if (
      style(--some-other-var: xxx): 3rem;
      style(--size: 2): 1rem;
      style(--size: 4): 2rem; else: 0.5rem;
    );
}

```

Or is that fine?

---

## Infinite Loops

Is it possible this opens up infinite loop problems in calculated styles? I don’t know if this is an actual problem but it’s brain-bending to me.

```css
@mixin --foo(--val) {
  --val: 2;
}

.parent {
  --val: 1;
  .thing {
    @apply --foo(--val);
    --val: if(
        style(--val: 1): 2;
        else: 1;
      );
  }
}
```

Like, when evaluating a `.thing`, `--val` is 1 because of inheritance, but then we apply a mixin which changes it to 2, then we reset it back to 1, but if it’s 1 shouldn’t it reevaluate to 2? I just don’t know.

---

## Unmixing

Miriam asks [<VPIcon icon="fas fa-globe"/>can you un-mix a mixin?](https://oddbird.net/2024/06/11/removing-mixins/) Which is a great question. It’s very worth thinking about, because if there ends up being an elegant way to do it, it makes native mixins even more powerful and a big feather in their cap above what any preprocessor can do. I don’t hate an`` css
`@unapply` at first thought.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Thoughts on Native CSS Mixins",
  "desc": "There are no browser implementations of mixins yet, nor a fleshed out spec. So perhaps now is the best time to try to understand and opine.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/thoughts-on-native-css-mixins.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
