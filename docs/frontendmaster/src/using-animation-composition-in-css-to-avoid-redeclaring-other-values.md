---
lang: en-US
title: "Using `animation-composition` in CSS to Avoid Redeclaring Other Values"
description: "Article(s) > Using `animation-composition` in CSS to Avoid Redeclaring Other Values"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using `animation-composition` in CSS to Avoid Redeclaring Other Values"
    - property: og:description
      content: "Using `animation-composition` in CSS to Avoid Redeclaring Other Values"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/using-animation-composition-in-css-to-avoid-redeclaring-other-values.html
prev: /programming/css/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10491
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
  name="Using `animation-composition` in CSS to Avoid Redeclaring Other Values"
  desc="Here's an example. You can list multiple comma-separated box-shadows, but if you apply a *new* box-shadow, it overrides anything set before. Not true here."
  url="https://blog.master.dev/using-animation-composition-in-css-to-avoid-redeclaring-other-values/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10491"/>

If we use *multiple* `@keyframes` animate on an element where we’re changing the `transform` property, the latter will always *completely wipe out* the former declarations.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8aed-8fb1-7cd9-b27b-ec06443c334c"  
  title="Fighting Translates"
  :default-tab="['css','result']"
  :theme="dark"/>

With CSS’ `animation-composition` property, however, the `transform`s in the animations can be *combined.* (Although, for fun, try removing the `from` declarations in the `@keyframes`, it gets weird.)

As an example of proper combining, we can move an element leftward with `translate()` in a keyframe, then downward with another while `animation-composition` preserves the previous leftward displacement.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8afc-ca99-70dd-bfc5-c2b131c30e2e"
  title="Fighting Translates"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s invaluable for sequential transformations, but `animation-composition` can be just as useful even when there’s nothing to “transform”.

What this property does is quite special: **it adds to the value of an established property-value pair.**

Say there are initially multiple `box-shadow`s on an element and later we have to add another shadow as the user interacts with it. How is that usually done?

We set *all* the shadows — the initial ones and the new one — at the user interaction. For flexibility, we might store the values for the initial rings in a variable and use it in both the initial and interaction styles.

```css
/* The classic way */
.el {
  --initial-shadow: 0 0 5px black;

  box-shadow: var(--initial-shadow);

  &:hover {
    /* tack on an extra shadow */
    box-shadow: var(--initital-shadow), 0 2px 10px black;
  }
}
```

Although variables make things easier, what if **we don’t have to redeclare** the initial shadow at all on user interaction, via variables or directly, and declare only the new ring and let the browser add it outside the ones already there?

That would save us from rewriting values or from using variables, which can make it harder to scan stylesheets visually.

The `animation-composition` property can help with that. Here’s a basic example with two shadow declarations (one added via @keyframes), and you can see how they **both** apply on hover.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8b55-9dfc-7d13-9b45-eeea729c0d94"
  title="Additive Shadow"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s another example below, where if you click the “Posion Type Only” button, you can see an additional `box-shadow` be applied.

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019f7b40-7834-7f6b-9088-ee5e9be4b16d"
  title="Layer shadows with animation-composition"
  :default-tab="['css','result']"
  :theme="dark"/>

The set of Pokémon images is laid out in a grid. Each has an inward shadow in different colors.

```css
.pokemon {
  /* ivysaur */
  &:nth-child(1) {
    background-image: url('ivysaur.png');
    /* teal shadow */
    box-shadow: 2px 0 6px 1px rgb(100 147 165) inset;
  }
  /* chikorita */
  &:nth-child(2) {
    background-image: url('chikorita.png');
    /* green shadow */
    box-shadow: 2px 0 6px 1px rgb(113 154 107) inset;
  }
  /* vileplume */
  &:nth-child(3) {
    background-image: url('vileplume.png');
    /* pink shadow */
    box-shadow: 2px 0 6px 1px rgb(193 133 140) inset;
  }
  /* more */
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019f7b44-35eb-70ab-ae3c-5d4ec9655e17"
  title="A set of pokemons"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, time to set up a user interaction scenario. When a checkbox is checked to show the poison-type Pokémon, those Pokémon get two rings in the form of an inward and outward shadow.

```html
<!-- the poisonous pokemons have data-type="poisonous" -->
<div class="pokemon" data-type="poisonous"></div>

<!-- a checkbox to accent the poisonous pokemons -->
<input id="isPoisonous" type="checkbox">
<label for="isPoisonous">Poison Type Only</label>

/* when the checkbox is checked */
body:has(#isPoisonous:checked) .pokemon[data-type="poisonous"] {
  /* add two rings */
}
```

Let’s declare those extra rings in a keyframe.

```css
@keyframes focus-rings {
  to { 
    box-shadow: 0 0 0 7px white, 0 0 0 8px grey, inset 0 0 0 2px rgb(241, 52, 90);
  }
}
```

This keyframe is then applied to the selected pokemons when the checkbox is checked, with `animation-composition: add;`.

```css
body:has(#isPoisonous:checked) .pokemon[data-type="poisonous"] {
  animation: focus-rings 0.3s forwards;
  animation-composition: add;
}
```

When we use `add` for `animation-composition`, the browser strings together the animated property’s initial and newly introduced values. **It layers them**.

In our example, the shadows declared in the keyframe are now chained to the shadow that already exists.

The result once again:

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019f7b40-7834-7f6b-9088-ee5e9be4b16d"
  title="Layer shadows with animation-composition"
  :default-tab="['css','result']"
  :theme="dark"/>

For animation, we can **string up values of most list-valued CSS properties** like `filter`, `text-shadow`, and so forth.

We can also make use of `animation-composition`’s `accumulate` value. Unlike `add` that layers a property’s values, `accumulate` **compounds the values** using a relevant arithmetic.

For instance, the `aspect-ratio` values multiply when `animation-composition` is set:

```css
.box-1 { 
  aspect-ratio: 0.5; 
}
.box-2 {
  aspect-ratio: 1; 
}
.box-3 { 
  aspect-ratio: 2; 
}
:nth-child(2 of .box-1),
:nth-child(2 of .box-2),
:nth-child(2 of .box-3){
  animation: apply-ratio forwards ;
  animation-composition: accumulate;
  /* if we apply `add` here that acts as accumulate */
}
@keyframes apply-ratio {
  to { 
   /* halves the already set ratio of each box */
    aspect-ratio: 0.5; 
  }
}

/*
Note: July 2026 - A possible bug in Firefox prevents the ratio compounding
*/
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019f7b36-f478-7ea2-9ac3-45872b990611"
  title="Compounding aspect-ratio with animation-composition"
  :default-tab="['css','result']"
  :theme="dark"/>

If you’re already using animation, transition, or keyframes, and need to redeclare values for them, consider using `animation` with `animation-composition`. This eliminates the need to redeclare values or set up variables for reusability. `animation-composition` allows us to **declare only what needs to be added**, and the browser will handle the layering based on the existing values.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using `animation-composition` in CSS to Avoid Redeclaring Other Values",
  "desc": "Here's an example. You can list multiple comma-separated box-shadows, but if you apply a *new* box-shadow, it overrides anything set before. Not true here.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/using-animation-composition-in-css-to-avoid-redeclaring-other-values.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
