---
lang: en-US
title: "Staggered Animation with CSS sibling-* Functions"
description: "Article(s) > Staggered Animation with CSS sibling-* Functions"
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
      content: "Article(s) > Staggered Animation with CSS sibling-* Functions"
    - property: og:description
      content: "Staggered Animation with CSS sibling-* Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/staggered-animation-with-css-sibling-functions.html
prev: /programming/css/articles/README.md
date: 2025-11-07
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7631
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
  name="Staggered Animation with CSS sibling-* Functions"
  desc="The new CSS sibling-index() (and -count()) functions are perfect for staggered timing affects. This goes a little step further staggering both before and after a selected element."
  url="https://frontendmasters.com/blog/staggered-animation-with-css-sibling-functions/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7631"/>

The CSS functions `sibling-index()` and `sibling-count()` return an element’s position relative to its siblings and the total number of siblings, including itself. This is useful for styling elements based on their positions.

```html
<div class="parent"> <!-- sibling-count() = 3 -->
  <div class="child"></div> <!-- sibling-index() = 1 -->
  <div class="child"></div> <!-- sibling-index() = 2 -->
  <div class="child"></div> <!-- sibling-index() = 3 -->
</div>
```

For instance, to create a pyramid chart, we could proportionally increase the widths of elements as they align.

The integers returned by `sibling-index()` and `sibling-count()` can be easily computed with other data types like length, angle, and time. An incremental or decremental time sequence is the foundation of any staggered animation where elements animate consecutively. For example:

```css
.el {
  animation-delay: calc(sibling-index() * 0.1s);
}
```

This post covers a demo where selecting an item causes the preceding and succeeding items to disappear sequentially from the outside.

<CodePen
  user="rpsthecoder"
  slug-hash="EaPREMe"
  title="Staggered Animation with `sibling-*` CSS Functions"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Layout

```html
<main class="cards-wrapper">
  <div class="cards"><input type="checkbox" aria-label="movie, only yesterday"></div>
  <div class="cards"><input type="checkbox" aria-label="movie, the wind rises"></div>
  <div class="cards"><input type="checkbox" aria-label="movie, howl's moving castle"></div>
  <div class="cards"><input type="checkbox" aria-label="movie, ponyo"></div>
  <div class="cards"><input type="checkbox" aria-label="movie, the cat returns"></div>
</main>
```

```css
.cards-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.cards {
  width: 15vw;
  aspect-ratio: 3/4.2;
  contain: layout;
  /* etc. */

  input[type="checkbox"] {
    position: absolute;
    inset: 0;
  }
}
```

This HTML contains a group of `.cards` inside a `.cards-wrapper`, arranged horizontally using flexbox. Each card has a checkbox covering its entire size, triggering selection on click.

---

## The Selectors

Before seeing what happens when a card is selected, let’s see the different CSS selectors we’ll be using to target the different parts of the user interface.

```css
.cards:has(:checked) {

  /* Style rules for the chosen card (the one with a checked box).
    Highlight the chosen card. */   

  .cards-wrapper:has(:checked) .cards:not(&) {
    /* Style rules for the remaining cards when one is chosen.  
      Animate the unchosen cards to disappear. */ 
  }

  & ~ .cards {
    /* Style rules for cards to the right-side of the chosen one. 
       Set a decremental delay time for the disappearance. */

    .cards:not(&) {
       /* Style rules for cards that aren't to the right of the chosen one. 
          Set an incremental delay time. */
    }
  } 
}
```

---

## The Declarations

### Highlight The Chosen Card

The selected card gets a grey dashed border:

```css
border: 2px dashed #888;
```

### Animate The Unchosen Cards to Disappear

```css
opacity: 0;
width: 0; 
display: none; 
transition: 0.3s calc(var(--n) * 0.2s) all;
transition-behavior: allow-discrete;

input { 
  pointer-events: none; 
}
```

1. Zero `opacity` and `width` create a fade out and horizontal shrinking of the card, including the space the card occupies.
2. `transition-behavior: allow-discrete` allows `display: none` to apply at the *end* of the transition, which is appropriate as we do want to apply that to remove them from the accessibility tree.
3. The `transition` time, affecting `all` properties that change, is `0.3s`. The transition delay is a multiple of `0.2s` and the CSS variable `--n` (to be discussed)
4. To prevent unchosen cards from being clicked and chosen while disappearing, their checkbox `input` get `pointer-events: none`

### Decremental Delay Time for Cards On The Right

The cards, succeeding the chosen one, need descending transition delay times. Thus, `--n` is decremented for each element (left to right) to the right of the chosen card.

```css
--n: calc(sibling-count() - sibling-index() + 1);
```

Let’s say the third card is chosen. The remaining cards (4 to last) have to vanish in reverse order. The math below shows each of those cards’ `--n` value and delay time (`--n` × 0.2s).

Our example has five cards, so `sibling-count()` is 5. Let’s see how `--n` calculated for each card after the 3rd (chosen) card:

```plaintext
4th card
--------  
--n = calc( sibling-count() - sibling-index() + 1 )  
--n = calc( 5 - 4 + 1 )  
--n = 2  
  
delay time = calc( var(--n) \* 0.2s )  
delay time = calc( 2 \* 0.2s )  
delay time = 0.4s  
  
  
5th card  
--------  
--n = calc( sibling-count() - sibling-index() + 1 )  
--n = calc( 5 - 5 + 1 )  
--n = 1  
  
delay time = calc( var(--n) \* 0.2s )  
delay time = calc( 1 \* 0.2s )  
delay time = 0.2s
```

### Incremental Delay Time for Cards On The Left

The `sibling-index()` value alone is enough, since the delay time of the elements (left to right) to the left of the chosen card increases outward in. First card goes first, then the second, and so forth.

```css
--n: sibling-index();
```

Here’s now `--n` calculates and thus makes the delay time for each card *before* the 3rd chosen card:

```plaintext
1st card  
--------  
--n = sibling-index()   
--n = 1  
  
delay time = calc( var(--n) \* 0.2s )  
delay time = calc( 1 \* 0.2s )  
delay time = 0.2s  
  
  
2nd card  
--------  
--n = sibling-index()   
--n = 2  
  
delay time = calc( var(--n) \* 0.2s )  
delay time = calc( 2 \* 0.2s )  
delay time = 0.4s
```

---

## The Rulesets

All combined, these are the style rules that are applied when a card is chosen:

```css
/* chosen card */
.cards:has(:checked) {

   border: 2px dashed #888;

  /* cards that aren't chosen, when one has been */
  .cards-wrapper:has(:checked) .cards:not(&) {
    opacity: 0;
    width: 0; 
    display: none; 
    transition: .3s calc(var(--n) * .2s) all;
    transition-behavior: allow-discrete;
    input { pointer-events: none; }
  }

  /* cards after the chosen one */
  & ~ .cards{
    --n: calc(sibling-count() - sibling-index() + 1);
    /* cards not after the chosen one */
    .cards:not(&){
      --n: sibling-index();
    }
  } 
}
```

::: note

Among the “cards not after the chosen one” (see above snippet) the chosen card is also included, but since it doesn’t have the `transition` declaration, there’s no effect. If you want, you can exclude it by adding `:not(:has(:checked))` to the selector, but it’s not necessary in our example.

:::

---

## The Fallback

If a browser doesn’t support `sibling-*` functions, we can calculate `--n` in JavaScript to determine the elements’ positions among their siblings.

```js
if(!CSS.supports('order', 'sibling-index()')) {

  // Turn the NodeList to an array for easier manipulation
  const CARDS = Array.from(document.querySelectorAll('.cards'));

  document.querySelector('.cards-wrapper').addEventListener('change', (e) => {

    // Index of the card with the checkbox that fired the 'change' event.
    const IDX = CARDS.indexOf(e.target.parentElement);

    // All cards after the chosen one. If there are three,
    // they get --n values of 3, 2, 1
    CARDS.slice(IDX + 1).forEach((card, idx, arr) 
      => card.style.setProperty('--n', `${arr.length - idx}`));

    // All cards up to the chosen one. If there are three,
    // they get --n values of 1, 2, 3
    CARDS.slice(0, IDX).forEach((card, idx) 
       => card.style.setProperty('--n', `${idx + 1}`));
  });
}`
```

Below is another example, where you’ll be able see an accordion sort of animation by using the `sibling-index()` function to show and hide the items, even without transition delay, but with the delay the staggered effect comes through.

<CodePen
  user="rpsthecoder"
  slug-hash="PwZBLoy"
  title="Staggered Animation with CSS `sibling-*` Functions"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Staggered Animation with CSS sibling-* Functions",
  "desc": "The new CSS sibling-index() (and -count()) functions are perfect for staggered timing affects. This goes a little step further staggering both before and after a selected element.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/staggered-animation-with-css-sibling-functions.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
