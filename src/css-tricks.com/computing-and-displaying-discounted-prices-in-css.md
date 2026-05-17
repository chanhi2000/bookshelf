---
lang: en-US
title: "Computing and Displaying Discounted Prices in CSS"
description: "Article(s) > Computing and Displaying Discounted Prices in CSS"
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
      content: "Article(s) > Computing and Displaying Discounted Prices in CSS"
    - property: og:description
      content: "Computing and Displaying Discounted Prices in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/computing-and-displaying-discounted-prices-in-css.html
prev: /programming/css/articles/README.md
date: 2026-05-14
isOriginal: false
author:
  - name: Preethi
    url: https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/css-computed-price.png
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
  name="Computing and Displaying Discounted Prices in CSS"
  desc="A clever use of CSS to calculate and display a discounted product price by providing a base price and discount amount, featuring modern CSS features like attr(), mod(), and round()."
  url="https://css-tricks.com/computing-and-displaying-discounted-prices-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/css-computed-price.png"/>

CSS math isn’t just about how things look! It can also be used to work out useful numeric information. For instance, you could calculate and show the percentage of tasks completed in a to-do list with CSS, helping users keep track of their progress. No need for script or server computation. No latency. No use of additional browser resources.

Working with math has become much simpler and more flexible. I’m going to give you an example using CSS to calculate and display a discounted price whenever you need it, using the base price and discount provided. It’s the sort of thing you see often on e-commerce sites where heavy JavaScript is used to show a product’s full price, its discount amount, and its sale price.

![Screenshot taken from [<VPIcon icon="fas fa-globe"/>gap.com](https://gap.com)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_7E3C7C97B7D8D52C02F5092EAFB87771069C4AA5BAFDB9C502DA16E57E7200D2_1776091945816_gsp-sale-prices.png?resize=2410%2C1032&ssl=1)

We can absolutely do that in CSS:

<CodePen
  user="anon"
  slug-hash="JoRByXq"
  title="Compute With CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

It does rely on some bleeding-edge features that are waiting to gain more browser support, but I think it’s still a good exercise to dig into how we will eventually be able to put these things in practice and eventually use them in our everyday work.

Here’s how I put it together.

---

## The initial markup

The interface in this specific demo displays a list of streaming services for the user to choose from — Netflix, Disney+, ~HBO~, ~HBO Now~, ~HBO Go~, HBO Max, etc. There’s a student discount offer on each subscription that takes a certain percentage amount off the full price.

```html
<li>
  <!-- Service name, base price, and selection toggle -->
  <label>
    <span>Netflix</span>
    <!-- data-price and data-discount store base price and discount offered -->
    <div class="ott-price" data-price="7.99" data-discount="0.2">$7.99</div>
    <!-- Checkbox to track if the user wants to add this service -->
    <input type="checkbox" class="is-ott-selected">
  </label>

  <!-- Toggle for the student discount -->
  <label>
    <span>Apply Student Discount <br> 20%</span>
    <input type="checkbox" class="is-ott-discounted">
  </label>
</li>

<!-- etc. -->
```

The base price and discount are included as `data-*` attributes in the element displaying the price. Just remember, the discount only kicks in when you select “Apply Student Discount,” and then you’ll see how much the price is after the discount is applied.

---

## Calculating the price cut

When the discount kicks in, the first step is to slash the base price with a line across it.

```css
/* When the discount toggle is checked inside the .ott container */
.ott:has(.is-ott-discounted:checked) {
  /* Strike through the original price */
  .ott-price {
    text-decoration: line-through;
  }
}
```

Next, let’s figure out the new discounted price using the `data-price` and `data-discount` values.

```css
.ott:has(.is-ott-discounted:checked) {
  .ott-price {
    text-decoration: line-through;
    /* 
        Calculate the new price from the data-* attributes:
        Original Price * (1 - Discount Applied)
    */
    --n: calc(attr(data-price number) * (1 - attr(data-discount number)));
  }
}
```

The [**`attr(<name> <type>)` syntax**](/css-tricks.com/almanac-functions/attr.md) is relatively new. The function used to only work with the `content` property, but now supports any CSS property… and parses values into a range of data types, whereas before they were always parsed as strings.

Those arguments:

1. **`<name>`:** This is the name of the HTML attribute we want to look at (like `href`, `data-count`, or `title`).
2. **`<type>`:** This tells CSS how to “read” the value (like a `color`, a `number`, or a `length`). It’s the newer superpower that makes the work we’re doing here possible.

In our case, we’re using the function to parse both `data-price` and `data-discount` into `numbers`, and then we subtract the discount from the price with CSS math-iness.

The upgraded `attr()` is super cool, but not Baseline as I’m writing this, so keep an eye on it.

<BaselineStatus featureid="attr" />

---

## Showing the discounted price

Here’s how we display the updated price once the discount is applied:

```css
.ott:has(.is-ott-discounted:checked) {
  .ott-price {
    text-decoration: line-through;
    --n: calc(attr(data-price number) * (1 - attr(data-discount number)));

    &::after {
      display: inline-block;
      /* Splits the variable --n into two counters: 
          'a' for the whole number (in dollars) and 'b' for the decimals (in cents) */
      counter-set: a calc(round(down, var(--n))) b calc((mod(var(--n), 1)) * 100);
      /* Output: two spaces (\2000), a dollar sign ($), the number, a dot, and the decimals */
      content: "\2000\2000$" counter(a) "." counter(b, decimal-leading-zero);
    }
  }
}
```

The [**`counter()` function**](/css-tricks.com/styling-counters-in-css.md) helps us turn the numeric value of the `--n` varable into a `content` string. Since CSS counters can’t handle decimals (they round the value by default), we treat the numbers before and after the decimal as separate counters and then combine them as strings, adding a dot between them.

1. **`calc(round(down, var(--n)))`** takes the variable `--n` and rounds it down to get the whole dollar amount (stored as `counter(a)`).
2. **`calc((mod(var(--n), 1)) * 100)`** uses the modulo [**`mod()`**](/css-tricks.com/almanac-functions/mod.md) function to isolate the fraction, then multiplies it by `100` to get the cents (stored as `counter(b)`).
3. The `content` property inserts a dollar sign before the two counters and then joins them with a dot.

We know that [**`calc()`**](/css-tricks.com/almanac-functions/calc.md) has plenty of browser support. And guess what? The `mod()` function is newly Baseline!

<BaselineStatus featureid="round-mod-rem" />

That’s only if you need decimals and all that. If you’re rounding prices, this would be plenty enough:

```css
counter-set: price calc(var(--n));
content: counter(price);
```

Here’s the demo once again:

<CodePen
  user="anon"
  slug-hash="JoRByXq"
  title="Compute With CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping up

So, there we have it, a working combination of newer CSS features (the upgraded `attr()` function), CSS math functions (`mod()`, `round()`), and custom counters to nail down something that we see in so many websites, only without scripts. When `attr()`‘s support for data types becomes a thing in all browsers, this is something you can use in your everyday work.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Computing and Displaying Discounted Prices in CSS",
  "desc": "A clever use of CSS to calculate and display a discounted product price by providing a base price and discount amount, featuring modern CSS features like attr(), mod(), and round().",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/computing-and-displaying-discounted-prices-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
