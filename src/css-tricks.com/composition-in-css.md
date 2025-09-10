---
lang: en-US
title: "Composition in CSS"
description: "Article(s) > Composition in CSS"
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
      content: "Article(s) > Composition in CSS"
    - property: og:description
      content: "Composition in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/composition-in-css.html
prev: /programming/css/articles/README.md
date: 2025-09-08
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Composition in CSS"
  desc="CSS is a composable language by nature. This composition nature is already built into the cascade. We simply don't talk about composition as a Big Thing because it's the nature of the language."
  url="https://css-tricks.com/composition-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

Tailwind and other utility libraries have been huge proponents of composition. But, to me, their version of composition has always carried a heavy sense of naïveté.

I mean, utility composition is basically adding CSS values to the element, one at a time…

```html
<div class="p-4 border-2 border-blue-500"> ... </div>
```

If we’re honest for a minute, how is this composition different from adding CSS rules directly into a class?

```css
/* This is composition too! */
.card {
  padding: 1rem; 
  border: 2px solid var(—color-blue-500)
}
```

That said, I can’t deny the fact that I’ve been thinking a lot more about composition ever since I began using Tailwind. So, here are a couple of notes that I’ve gathered together about CSS composition.

---

## It’s not a new concept

**CSS is a composable language by nature.** This composition nature is already built into the cascade. Let’s say you’ve decided to style a button with a few properties:

```css
.button {
  display: inline-flex;
  padding: 0.75em 1.5em; 
  /* other styles... */
}
```

You can always tag on other classes to modify the button’s appearance:

```html
<button class="button primary"> ... </button>
<button class="button secondary"> ... </button>
```

```css
.primary { background: orange; }
.secondary { background: pink; }
```

You can even change the appearance of other elements to a button by adding the `.button` class:

```html
<a href="#" class="button"> ... </a>
```

Composition is happening in both cases:

1. We composed `.button` onto `a`
2. We composed `.red` onto `.button`

So, CSS composition has been in existence since forever. We simply don’t talk about composition as a Big Thing because it’s the nature of the language.

---

## Developers take a pretty narrow view of composition

When developers talk about composition in CSS, they always seem to always restrict the definition of composition to the addition of classes in the HTML.

```html
<div class="one two"> ... </div>
```

What’s interesting is that few people, if any, speak about composition within CSS files — from the angle of using [<VPIcon icon="iconfont icon-sass"/>Sass mixins](https://sass-lang.com/documentation/at-rules/mixin/) or [**advanced Tailwind utilities**](/css-tricks.com/using-css-cascade-layers-with-tailwind-utilities.md).

In these cases, we are also composing styles… just not directly in the HTML!

```css
@mixin button () {
  display: inline-flex;
  padding: 0.75em 1.5em; 
  /* other styles ... */
}

.button {
  @include button; 
}
```

---

## What is composition?

Composition comes from two possible words:

- **Compose:** Put together
- **Composite:** Made up of distinct parts or elements

Both words come from the same Latin root componere, which means to arrange or direct.

In other words… all work is put together in some way, so all work is composed. This makes me wonder why composition is used in such a limited context. 🤔

Moving on…

---

## Composition doesn’t reduce bloat

Class composition reduces CSS bloat only if you’re using utility classes. However, class composition with utility classes is likely to create HTML bloat.

```html
<div class="utility composition">...</div>
<div class="one utility at a time">...</div>
<div class="may create html bloat">...</div>
```

On the other hand, class composition with selectors might not reduce CSS bloat. But they definitely introduce lesser HTML bloat.

```html
<div class="class composition">...</div>
<div class="card primary">...</div>
<div class="may override properties">...</div>
<div class="less html bloat"> ... </div>
```

Which is better?

---

## HTML bloat and CSS bloat are probably the least of your concerns

We know this:

- HTML can contain a huge amount of things and it doesn’t affect performance much.
- CSS, too.
- 500 lines of CSS is approx 12kb to 15kb (according to Claude).
- An image typically weighs 150kb or perhaps even more.

For most projects, optimizing your use of images is going to net you better weight reduction than agonizing over utility vs. selector composition.

Refactoring your codebase to decrease CSS bloat is not likely to increase performance much. Maybe a 2ms decrease in load times?

But refactoring your codebase to improve developer recognition and make it easier to style? Much more worth it.

So, I’d say:

- HTML and CSS bloat are pretty inconsequential.
- It’s worthwhile to focus on architecture, structure, and clarity instead.

---

## Advanced compositions

If we zoom out, we can see that all styles we write fall into four categories:

1. **Layouts:** Affects how we place things on the page
2. **Typography:** Everything font related
3. **Theming:** Everything color related
4. **Effects:** Nice good to have stuff like gradients, shadows, etc.

Styles from each of these four categories don’t intersect with each other. For example:

- `font-weight` belongs exclusively to the *Typography* category
- `colour` belongs exclusively to the *Theming* category

It makes sense to create composable classes per category — when that’s done, you can mix-and-match these classes together to create the final output. Very much like Lego, for the lack of a better example. (Alright, maybe Duplo for the kids?)

So your HTML might end up looking like this, assuming you do class composition for these four categories:

```html
<!-- These are all pseudo classes. Use your imagination for now! -->
<div class="layout-1 layout-2 effects-1">
  <h2 class="typography-1 theming-1"> ... </div>
  <div class="typography-2"> ... </div>
</div>
```

A real example of this would be the following, if we used classes from [<VPIcon icon="fas fa-globe"/>Splendid Styles](https://splendidlabz.com/docs/styles/) and [<VPIcon icon="fas fa-globe"/>Splendid Layouts](https://splendidlabz.com/docs/layouts/):

```html
<div class="card vertical elevation-3">
  <h2 class="inter-title"> ... </h2>
  <div class="prose"> ... </div>
</div>
```

I’m writing more about this four-category system and how I’m creating composable classes in my latest work: [<VPIcon icon="fas fa-globe"/>Unorthodox Tailwind](https://magicaldevschool.com/courses/unorthodox-tailwind/). Give it a check if you’re interested!

---

## Wrapping up

To sum up:

1. CSS is composable by nature.
2. Developers seem to be quite narrow-minded about what composition means in CSS.
3. You can do composition in the HTML or in the CSS.
4. Styles we write can be divided into four categories — layouts, typography, theming, and effects.

And finally: [<VPIcon icon="fas fa-globe"/>Splendid Styles](https://splendidlabz.com/solutions/styles/) contains classes that can aid composition in each of these four categories. [<VPIcon icon="fas fa-globe"/>Splendid Layouts](https://splendidlabz.com/solutions/layouts/) handles the layout portion. And I’m writing more about how I create composable classes in my course [<VPIcon icon="fas fa-globe"/>Unorthodox Tailwind](https://magicaldevschool.com/courses/unorthodox-tailwind/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Composition in CSS",
  "desc": "CSS is a composable language by nature. This composition nature is already built into the cascade. We simply don't talk about composition as a Big Thing because it's the nature of the language.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/composition-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
