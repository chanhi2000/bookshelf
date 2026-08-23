---
lang: en-US
title: "Obscuring Text with @counter-style"
description: "Article(s) > Obscuring Text with @counter-style"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Obscuring Text with @counter-style"
    - property: og:description
      content: "Obscuring Text with @counter-style"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/obscuring-text-with-counter-style.html
prev: /programming/css/articles/README.md
date: 2026-06-03
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9889
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
  name="Obscuring Text with @counter-style"
  desc="@counter-style is useful for replacing the ::marker of lists easily, but it controls any markers-of-counters, so we can use it for more."
  url="https://blog.master.dev/obscuring-text-with-counter-style/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9889"/>

The `@counter-style` at-property in CSS helps us shift from browser defaults to user-defined web styling for list markers. Like instead of the bullet-points of unordered lists and numbers of ordered lists, you can define any marker glyphs you want. But it’s uses extend beyond that, and we’re going to use it for some trickery in this article.

List **markers** are the characters that precede each new entry in a list. They can be numbers, bullet symbols, or letters, typically denoting the position of each item in an ordered list.

However, `@counter-style` allows us to use characters that aren’t part of the usual styles as markers. Since these markers represent a **count**, they can produce a string defined by the marker style using [<VPIcon icon="fa-brands fa-firefox"/>CSS counter](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Counter_styles/Using_counters).

While typically used for bulleting lists, this spawning of text can come handy in various ways, like generating a sequence of characters to hide data or to create a word rotator. We won’t have to manually put together the sequence: `@counter-style` does it for us.

<CodePen
  user="anon"
  slug-hash="gbLrjgO"
  title="Data obscuration with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Article Series

```component VPCard
{
  "title": "Obscuring Text with @counter-style",
  "desc": "@counter-style is useful for replacing the ::marker of lists easily, but it controls any markers-of-counters, so we can use it for more.",
  "link": "/blog.master.dev/obscuring-text-with-counter-style.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Word Rotator with @counter-style",
  "desc": "Using @counter-style for tricky visual effects like word rotation and obfuscation.",
  "link": "/blog.master.dev/word-rotator-with-counter-style.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::
---

## What is `@counter-style`?

Although this at-rule is made up of a long list of [<VPIcon icon="fa-brands fa-firefox"/>descriptors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@counter-style#descriptors), the most crucial one to understand is the `system` — the algorithm used to convert the integer to a string.

```css
@counter-style <counter-style-name> { 
  system: <system-type>; 
  symbols: <symbol>+; 
}
```

In this article, you’ll learn about these algorithms and explore different ways to utilize them. The default value for `system` is `symbolic`, where `symbols` (the characters) are looped and multiplied to represent increasing values of the integer count.

### Using `@counter-style` as a list’s counter style

To use `@counter-style` as a list’s counter style, follow these steps:

1. Define the counter style using the syntax provided above.
2. Apply the counter style to the list element using the `list-style` property.

For example:

```css
@counter-style ab-loop { 
  /* system: symbolic; is the default */
  symbols: a b; 
}
ol {
  list-style: ab-loop;
}
```

When used as a list style, the result will be a sequence of characters that precede the items in the list.

<CodePen
  user="anon"
  slug-hash="EaNvxJY"
  title="@counter-style on a list 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Both of the symbols (a and b) are rotated through, and during each rotation they multiply. For a single character (one symbol), it goes like this:

```css
@counter-style a-loop { 
  /* system: symbolic; is the default */
  symbols: a; 
}
ol {
  list-style: a-loop;
}
```

<CodePen
  user="anon"
  slug-hash="azBybMb"
  title="@counter-style on a list 2"
  :default-tab="['css','result']"
  :theme="dark"/>

### Using `@counter-style` as a generic counter style

Say, for a count of 8, we get a sequence of eight ‘a’s. We can print these ‘a’s independently using `counter()` and `content`. We don’t need a list item to display them.

```css
div::after {
  display: block;
  counter-set: n 8;
  content: counter(n, a-loop);
}
```

<CodePen
  user="anon"
  slug-hash="ogYeNRx"
  title="@counter-style on a counter"
  :default-tab="['css','result']"
  :theme="dark"/>

This is the approach we’ll use in our examples.

---

## A Sequence of the Same Character

### Method 1: Counter Value

In our first example, we hide the first 12 digits (3 blocks of 4 digits, separated by a space) of a credit card number with dots. These dots are overlaid on the credit card number, keeping it hidden until needed.

```html
<div id="number">
  1234 5678 9123 4567
</div>
```

```css
@counter-style dot {
  /* system: symbolic; is the default */
  symbols: '\2022';
}
/* Credit card number's pseudo element that'll overlay the number */
#number::after {
  /* Initializes the CSS counter named 'n' to the value 4 */
  counter-set: n 4;
  /* Displays the counter value three times, 
     formatted as dots (symbols), separated by spaces */
  content: counter(n, dot) " " counter(n, dot) " " counter(n, dot);
}
```

<CodePen
  user="anon"
  slug-hash="emBEYaa"
  title="@counter-style hide numbers 1"
  :default-tab="['css','result']"
  :theme="dark"/>

A counter of value 4 turns into four dots, as defined by the `dot` counter style. The converted counter value is shown three times with a space in between to cover the first 12 digits of the credit card number.

::: note

When using non-monospace fonts, adjust letter spacing to evenly distribute dots over numbers. Monospace fonts ensure all characters are of equal width.

:::

### Method 2: Pad Value

Remember, I mentioned earlier that `@counter-style` has a long list of descriptors? One of them is `pad`. It sets a minimum length for the generated characters. If the sequence is shorter, the pad characters fill the remaining space. This is often used to convert list numbering like 1, 2, 3 to 01, 02, 03. We can also use this to create our sequence.

```css
@counter-style ast {
  symbols: '';
  pad: 4 '\002A';
}
#number::after {
  counter-set: n 1;
  content: counter(n, ast) " " counter(n, ast) " " counter(n, ast);
}
```

In this example, `symbols` is empty. Instead, the character (asterisk) is provided in the `pad` descriptor that ensures the length is 4. This way, the counter style produces four asterisks.

<CodePen
  user="anon"
  slug-hash="OPbjJez"
  title="@counter-style hide numbers 2"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

You can also experiment with the descriptors `suffix` and `prefix` to build sequences.

:::

The number of overlaying characters doesn’t always need to match the number of hidden characters. In the example shown at the beginning of the article, there’s a sequence of long dashes covering the amount.

---

## A Sequence of Mixed Characters

We can also mix characters using positional algorithms: `alphabetic` and `numeric`. These systems can compound the `symbols` (characters) and create sequences like 231, BCA, etc. The `additive` system does something a little similar, but we’ll explore that later.

The `numeric` value uses a standard [<VPIcon icon="fa-brands fa-wikipedia-w"/>positional notation](https://en.wikipedia.org/wiki/Positional_notation), while `alphabetic` uses a [<VPIcon icon="fa-brands fa-wikipedia-w"/>bijective](https://en.wikipedia.org/wiki/Bijective_numeration) positional notation where there’s no value for 0.

::: note

A positional notation system is a method of representing numbers where the value of a digit is determined by its physical position or slot within the string.

:::

```html
<li value="0">zero</li>
<li>one</li>
<li>two</li>
<!-- more items -->
```

```css
@counter-style symbolic-loop { 
  /* system: symbolic; is the default */
  symbols: A B C; 
  suffix: " ";
}
@counter-style numeric-loop { 
  system: numeric; 
  symbols: A B C; 
  suffix: " ";
}
@counter-style alphabetic-loop { 
  system: alphabetic; 
  symbols: A B C; 
  suffix: " ";
}
```

<CodePen
  user="anon"
  slug-hash="EaNvxqx"
  title="@counter-style (symbolic, numeric, alphabetic)"
  :default-tab="['css','result']"
  :theme="dark"/>

Although specific sequences can be manually written, you can use an online base converter to find their decimal value and use counter style to create it. For instance, I want to hide a 7-digit pin code using the sequence XXYYZZX. Here’s how it’s done with `alphabetic`:

```html
<div id="pin">
  SW1A1AA
</div>
```

```css
@counter-style alphabetic-system {
  system: alphabetic;
  symbols: X Y Z;
}
#pin::after {
  counter-set: n 1225;
  content: counter(n, alphabetic-system );
}
```

```plaintext
In the alphabetic system:  
X=1, Y=2, Z=3  
  
To get the sequence XXYYZZX, we convert its base 3 (there are 3 characters) bijective notation to base 10 (decimal) notation.
  
Base 3 bijjective is 1122331 (XXYYZZX)  
  
1 \* 3^6 = 729  
1 \* 3^5 = 243  
2 \* 3^4 = 162  
2 \* 3^3 = 54  
3 \* 3^2 = 27  
3 \* 3^1 = 9  
1 \* 3^0 = 1  
  
Adding these values together, we get 1225 in base 10.
```

::: info

Here’s the online calculation for this.

```component VPCard
{
  "title": "Base Convert",
  "desc": "Online number base converter for binary, hexadecimal, octal, decimal, roman numerals, balanced ternary, negabinary, factorial, bijective, and any radix. Supports high precision and fractional values.",
  "link": "https://baseconvert.com/?bijective-3=1122331&decimal/",
  "logo": "https://baseconvert.com/logo.svg",
  "background": "rgba(59,130,246,0.2)"
}
```

:::

<CodePen
  user="anon"
  slug-hash="raWzNXE"
  title="@counter-style hide characters"
  :default-tab="['css','result']"
  :theme="dark"/>

These techniques are particularly useful for generating pseudo-random text, which will be covered in the next article. In the next article (coming soon!), we’ll also explore how to use the `cyclic` algorithm to create a word rotator and delve into the `additive` algorithm.

::: info Article Series

```component VPCard
{
  "title": "Obscuring Text with @counter-style",
  "desc": "@counter-style is useful for replacing the ::marker of lists easily, but it controls any markers-of-counters, so we can use it for more.",
  "link": "/blog.master.dev/obscuring-text-with-counter-style.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Word Rotator with @counter-style",
  "desc": "Using @counter-style for tricky visual effects like word rotation and obfuscation.",
  "link": "/blog.master.dev/word-rotator-with-counter-style.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Obscuring Text with @counter-style",
  "desc": "@counter-style is useful for replacing the ::marker of lists easily, but it controls any markers-of-counters, so we can use it for more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/obscuring-text-with-counter-style.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
