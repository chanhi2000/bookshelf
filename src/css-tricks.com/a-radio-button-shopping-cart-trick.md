---
lang: en-US
title: "A Radio Button Shopping Cart Trick"
description: "Article(s) > A Radio Button Shopping Cart Trick"
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
      content: "Article(s) > A Radio Button Shopping Cart Trick"
    - property: og:description
      content: "A Radio Button Shopping Cart Trick"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/a-radio-button-shopping-cart-trick.html
prev: /programming/css/articles/README.md
date: 2025-08-27
isOriginal: false
author:
  - name: Preethi
    url: https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/add-to-cart-animation.jpg
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
  name="A Radio Button Shopping Cart Trick"
  desc="Here's an approach for animating products added to a shopping cart that handles an infinite number of items using a variation of the ol' Checkbox Hack."
  url="https://css-tricks.com/a-radio-button-shopping-cart-trick"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/add-to-cart-animation.jpg"/>

::: note Editor’s note

This is a really clever idea that Preethi shared, but you will also see that it comes with accessibility drawbacks because it uses duplicated interactive elements. There are other ways to approach this sort of thing, as Preethi mentions, and we’ll look at one of them in a future article.

:::

Two large pizzas for yourself, or twelve small ones for the kids party — everyone’s gone through the process of adding items to an online cart. Groceries. Clothing. Deli orders. It’s great when that process is simple, efficient, and maybe even a little quirky.

This post covers a design referred as infinite selection. *Metaphorically* infinite.

Here’s how it works:

<CodePen
  user="rpsthecoder"
  slug-hash="RNWRjva"
  title="Infinite Selection"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s right, you click an item and it jumps right into the shopping cart, complete with a smooth transition that shows it happening. You can add as many items as you want!

And guess what: all of it is done in CSS — well, except the part that keeps count of selected items — and all it took is a combination of radio form inputs in the markup.

I’m going to walk you through the code, starting with the layout, but before that, I want to say up-front that this is just one approach. There are for sure other ways to go about this, and this specific way comes with its own considerations and limitations that we’ll get into.

---

## The Layout

Each item (or product, whatever you want to call it) is a wrapper that contains two radio form inputs sharing the same `name` value — a *radio group*.

```html
<div class="items flat-white">
  <input type="radio" name="r3" title="Flat White">
  <input type="radio" name="r3" title="Flat White">
</div>
```

When you check one in a duo, the other gets unchecked automatically, leading to a see-saw of check and uncheck between the two, no matter which one is clicked.

Each item (or radio group) is absolutely positioned, as are the two inputs it contains:

```css
.items {   
  position: absolute;

  input { 
    position: absolute; 
    inset: 0; 
  }
}
```

The `inset` property is stretching the inputs to cover the entire space, making sure they are clickable without leaving any dead area around them.

Now we arrange everything in a layout. We’ll use `translate` to move the items from a single point (where the centered cart is) to another point that is a litte higher and spread out. You can code this layout anyway you like, as long as the radio buttons inside can make their way to the cart when they are selected.

```css
.items {
  --y: 100px; /* Vertical distance from the cart */

  &:not(.cart) {
    transform: translate(var(--x), calc(-1 * var(--y)));
  }
  &.espresso { 
    --x: 0px;  /* Horizontal dist. from the cart */
  }
  &.cappuccino { 
    --x: -100%; 
  }
  &.flat-white { 
    --x: 100%; 
  }
}
```

So, yeah, a little bit of configuration to get things just right for your specific use case. It’s a little bit of [**magic numbering**](/css-tricks.com/magic-numbers-in-css.md) that perhaps another approach could abstract away.

---

## Selecting Items

When an item (`<input>`) is selected (`:checked`), it shrinks and moves (`translate`) to where the cart is:

```css
input:checked {
  transform: translate(calc(-1 * var(--x)), var(--y)) scale(0);
}
```

What happens under the hood is that the second radio input in the group is *checked*, which immediately *unchecks* the first input in the group, thanks to the fact that they share the same `name` attribute in the HTML. This gives us a bit of boolean logic a là the [**Checkbox Hack**](/css-tricks.com/the-checkbox-hack.md) that we can use to trigger the transition.

So, if that last bit of CSS moves the selected item to the shopping cart, then we need a `transition` to animate it. Otherwise, the item sorta zaps itself over, Star Trek style, without you telling.

```css
input:checked{
  transform: translate(calc(-1 * var(--x)), var(--y)) scale(0);
  transition: transform .6s linear;
}
```

---

## Keeping Count

The whole point of this post is getting a selected item to the cart. There’s no “Cart” page to speak of, at least for the purposes of this demo. So, I thought it would be a good idea to show how many items have been added to the cart. A little label with the count should do the trick.

```js
let n = 0;
const CART_CNT = document.querySelector("output");
document.querySelectorAll("[type='radio']").forEach(radio => {
  radio.onclick = () => {
    CART_CNT.innerText = ++n;
    CART_CNT.setAttribute("arial-label", `${n}`)
  }
});
```

Basically, we’re selecting the cart object (the `<output>` element) and, for each click on a radio input, we increase an integer that represents the count, which is slapped onto the shopping card icon as a label. Sorry, no removing items from the cart for this example… you’re completely locked in. 😅

---

## Accessibility?

Honestly, I wrestled with this one and there probably isn’t a bulletproof way to get this demo read consistently by screen readers. We’re working with two interactive elements in each group, and need to juggle how they’re exposed to assistive tech when toggling their states. As it is, there are cases where one radio input is read when toggling into an item, and the other input is read when toggling back to it. In other cases, both inputs in the groups are announced, which suggests multiple options in each group when there’s only one.

I did add a hidden `<span>` in the markup that is revealed with keyboard interaction as a form of instruction. I’ve also inserted an `aria-label` on the `<output>` that announces the total number of cart items as they are added.

Here’s the final demo once again:

<CodePen
  user="rpsthecoder"
  slug-hash="RNWRjva"
  title="Infinite Selection"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Maybe Use View Transitions Instead?

I wanted to share this trick because I think it’s a clever approach that isn’t immediately obvious at first glance. But this also smells like a situation where the modern [**View Transition API**](/css-tricks.com/toe-dipping-into-view-transitions.md) might be relevant.

[Adrian Bece writes all about it in a Smashing Magazine piece.](https://smashingmagazine.com/2023/12/view-transitions-api-ui-animations-part1/#example-3-running-multiple-transitions) In fact, his example is exactly the same: animating items added to a shopping cart. What’s nice about this is that it only takes two elements to build the transition: the item and the cart label. Using CSS, we can hook those elements up with a [<VPIcon icon="iconfont icon-css-tricks"/>`view-transition-name`](https://css-tricks.com/almanac/properties/v/view-transition-name/), define a [<VPIcon icon="iconfont icon-css-tricks"/>`@keyframes`](https://css-tricks.com/almanac/rules/k/keyframes/) animation for moving the item, then trigger it on click. No duplicate elements or state juggling needed!
<!-- TODO: /smashingmagazine.com/view-transitions-api-ui-animations-part1/#example-3-running-multiple-transitions.md -->

Alternatively, if you’re working with just a few items then perhaps a checkbox input is another possible approach that only requires a single element per item. the downside, of course, is that it limits how many items you can add to the card.

But if you need to add an *infinite* number of items and the View Transition API is out of scope, then perhaps this radio input approach is worth considering.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Radio Button Shopping Cart Trick",
  "desc": "Here's an approach for animating products added to a shopping cart that handles an infinite number of items using a variation of the ol' Checkbox Hack.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/a-radio-button-shopping-cart-trick.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
