---
lang: en-US
title: "The Odometer Effect (without JavaScript)"
description: "Article(s) > The Odometer Effect (without JavaScript)"
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
      content: "Article(s) > The Odometer Effect (without JavaScript)"
    - property: og:description
      content: "The Odometer Effect (without JavaScript)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-odometer-effect-in-css.html
prev: /programming/css/articles/README.md
date: 2026-03-02
isOriginal: false
author:
  - name: Preethi Sam
    url: https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8762
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
  name="The Odometer Effect (without JavaScript)"
  desc="We can take a value set in an HTML attribute and use it in CSS, even extracting each individual digit in order to animate separately. "
  url="https://frontendmasters.com/blog/the-odometer-effect-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8762"/>

With CSS, we can fill numbers into HTML elements now, thanks to the `attr()` function and a bit of trickery. This allows design effects to be applied to those numbers. Today, we’ll look at an odometer effect, meaning numbers that “spin” vertically, like the mileage meter on a vehicle. This effect is useful for dynamically displaying numeric values and drawing the user’s attention when the values change, such as a rolling number of online users, a tracked price, or a timer.

<CodePen
  user="anon"
  slug-hash="myEZKME"
  title="CSS odometer effect"
  :default-tab="['css','result']"
  :theme="dark"/>

The above example shows an amount upto the place value of millions. I’ll include more examples as we go.

```html
<data id="amount" value="3284915">
  <span class="digit"> <!-- Millions --> </span>
  <span class="digit"> <!-- Hundred Thousands --> </span>
  <span class="digit"> <!-- Ten Thousands --> </span>
  <span class="digit"> <!-- Thousands --> </span>
  <span class="digit"> <!-- Hundreds --> </span>
  <span class="digit"> <!-- Tens --> </span>
  <span class="digit"> <!-- Ones --> </span>
</data>
```

The amount is in the `value` attribute of the `<data>` element. You can use any other suitable element and attribute combination, like `<div data-price="60589">`. I’ve not included the comma separator in the HTML now; we’ll get to that later.

---

## Autofill Numbers

Let’s first *get* the number from the HTML attribute into a CSS variable using the `attr(<attr-name> <attr-type>)` function.

```css
#amount {
  --amt: attr(value number);
}
```

We’ll also need each `.digit`’s position, for which we use `sibling-index()`.

```css
#amount {
  --amt: attr(value number);

  .digit {
    --si: sibling-index();
  }
}
```

Now, we fill each `.digit`’s pseudo-elements with each digit from the number. To extract the digits from the number one by one, we use the `mod()` function.

```css
.amt {
  --amt: attr(value number);

  .digit {
    --si: sibling-index();

    /* autofill digits */
    &::after {
       /* Divide the number by the power of 10, round down, 
          and use mod() to isolate a single integer (0-9) */
      counter-set: n mod(round(down,var(--amt)/(10000/pow(10,var(--si)-1))),10);
      content: counter(n);
    }
  }
}
```

::: note

The CSS `mod()` function returns the remainder of a division.

:::

To make it easier to demonstrate, here’s an example of autofilling digits for a three-digit number:

```html
<data id="weight" value="420">
  <span class="digit"></span>
  <span class="digit"></span>
  <span class="digit"></span>
  gms
</data>
```

```css
#weight {
  --wgt: attr(value number);

  .digit {
    --si: sibling-index();

    &::after {
      counter-set: n mod(round(down,var(--wgt)/(100/pow(10,var(--si)-1))),10);
      content: counter(n);
    }
  }
}
```

Here’s how the math works:

```plaintext
sibling-index() = 1  
  
mod(round(down, 420/(100/pow(10,1-1))), 10)  
mod(round(down, 420/(100/pow(10, 0))), 10)  
mod(round(down, 420/(100/1)), 10)  
mod(round(down, 420/100), 10)  
mod(round(down, 4.2), 10)  
mod(4, 10)  
**= 4  
**  
  
sibling-index() = 2  
  
mod(round(down, 420/(100/pow(10,2-1))), 10)  
mod(round(down, 420/(100/pow(10, 1))), 10)  
mod(round(down, 420/(100/10)), 10)  
mod(round(down, 420/10), 10)  
mod(round(down, 42), 10)  
mod(42, 10)  
**= 2  
**  
  
sibling-index() = 3  
  
mod(round(down, 420/(100/pow(10,3-1))), 10)  
mod(round(down, 420/(100/pow(10, 2))), 10)  
mod(round(down, 420/(100/100)), 10)  
mod(round(down, 420/1), 10)  
mod(round(down, 420), 10)  
mod(420, 10)  
**= 0**
```

<CodePen
  user="anon"
  slug-hash="dPpbGNJ"
  title="CSS autofill digits"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adding Separators

When we add a separator character in the mix, using `sibling-index()` alone won’t give the right position of the digits following the separator. We have to exclude the separators from the math. Here’s an example:

```html
<data id="amount" value="7459328">
  <span class="digit"></span>
  <span class="digit"></span>
  <span class="separator">,</span>
  <span class="digit"></span>
  <span class="digit"></span>
  <span class="separator">,</span>
  <span class="digit"></span>
  <span class="digit"></span>
  <span class="digit"></span>
  KRW
</data>
```

```css
.digit {
  --si: sibling-index();

  &::after {
    counter-set: n mod(round(down,var(--amt)/(1000000/pow(10,var(--i)))),10);
    content: counter(n);
  }

  /* first two digits  */
  &:nth-child(-n+2)::after { 
    --i: var(--si) - 1; 
  }

  /* third and fourth digits */
  &:where(:nth-child(3 of .digit),:nth-child(4 of .digit))::after { 
    --i: var(--si) - 2; 
  }

  /* last three digits */
  &:nth-last-child(-n+3)::after { 
    --i: var(--si) - 3; 
  }
}
```

For each separator break, decrement the sibling index by 1 for the following digits.

<CodePen
  user="anon"
  slug-hash="azmodJJ"
  title="CSS autofill digits"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Animation

Now that the digits can be automatically separated into distinct elements, we can apply any animation we want to them individually. For the odometer effect, I’m adding animations that slide the digits up and down as the count decreases, mimicking the rolling style.

```css
@property --n {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}
@keyframes count {
  from { --n: 9;  } 
  to { --n: 0; }
}
@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(-100%); }
}
```

The `--n` variable, of integer type, is animated in the `@keyframes` animation `count`, decrementing from 9 to 0.  

```css
&::after {
  /* Save the digit in a variable */
  --digit: mod(round(down, var(--amt) / (1000000/pow(10, var(--i)))), 10);

  /* Show whichever is higher: the active countdown value (--n) or the target digit. Prevents the counter from dropping below the final value. */
  counter-set: n max(var(--n), var(--digit));
  content: counter(n);

  /* The 1s is the countdown animation. 
     The 0.11s (1/9) slide animation repeats until countdown hits the target digit. */
  animation: linear 1s, linear 0.11s calc(9 - var(--digit)) ;
}
&:nth-of-type(even)::after {
  animation-name: count, slideUp;
}
&:nth-of-type(odd)::after {
  animation-name: count, slideDown;
}
```

The demo from before:

<CodePen
  user="anon"
  slug-hash="myEZKME"
  title="CSS odometer effect"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Varying Speed and Style

Since the animation uses repeated vertical displacement to create the rolling effect, to speed up, pause, or slow down the digits, either by count or position (sibling index), set any animation’s time, delay, or repetition based on the count, position, or both.

Here’s an example where the later counts are slightly slower:

```css
&:after {
  animation: 
    1.4s linear, 
    0.11s linear calc(5 - var(--digit)), 
    0.22s linear 0.55s calc(4 - var(--digit)); 
}
&:nth-of-type(even)::after {
  animation-name: count, slideUp, slideUp;
}
&:nth-of-type(odd)::after {
  animation-name: count, slideDown, slideDown;
}
```

<CodePen
  user="anon"
  slug-hash="MYjgreW"
  title="CSS odometer effect 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s one where there’s no count or rolling, just a jittery effect.

```css
animation: 0.1s linear calc(0.1s * var(--si));
```

<CodePen
  user="anon"
  slug-hash="pvEzpRz"
  title="CSS odometer effect 3"
  :default-tab="['css','result']"
  :theme="dark"/>

Although this post covered the odometer effect, its concept can be applied to other graphic effects involving numbers. Being able to autofill numbers into individual elements, and compute and animate them, all in CSS, simplifies designing visual changes for dynamic numeric values on screen.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Odometer Effect (without JavaScript)",
  "desc": "We can take a value set in an HTML attribute and use it in CSS, even extracting each individual digit in order to animate separately. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-odometer-effect-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
