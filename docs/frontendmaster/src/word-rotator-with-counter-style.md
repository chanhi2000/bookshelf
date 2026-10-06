---
lang: en-US
title: "Word Rotator with @counter-style"
description: "Article(s) > Word Rotator with @counter-style"
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
      content: "Article(s) > Word Rotator with @counter-style"
    - property: og:description
      content: "Word Rotator with @counter-style"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/word-rotator-with-counter-style.html
prev: /programming/css/articles/README.md
date: 2026-06-05
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9947
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
  name="Word Rotator with @counter-style"
  desc="Using @counter-style for tricky visual effects like word rotation and obfuscation."
  url="https://blog.master.dev/word-rotator-with-counter-style/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9947"/>

In [**the last article**](/blog.master.dev/obscuring-text-with-counter-style.md), we covered a few ways for generating character strings to be used for data obfuscation. We looked at the counter style *systems*: `symbolic`, `alphabetic`, and `numeric`. Now, let’s get into even more uses of `@counter-style` and discover additional systems.

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

## Word Rotator

A word rotator is an interface designed to cycle through a predefined list of words or phrases within a static sentence. It serves as a tool to create visually appealing elements such as dynamic taglines and creative banners.

This example is made with `@counter-style`:

<CodePen
  user="anon"
  slug-hash="qEqZyRQ"
  title="Word rotator with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

### A Set of Words

First, let’s compile a set of words that we’ll be rotating. These words will be stored in the `symbols` descriptor of `@counter-style`.

```css
@counter-style words {
  symbols: startups enterprises nonprofits educators visionaries;
}
```

Similar to an array, we can maintain a group of words through the `@counter-style` declaration and later access each word based on its index/count. The system option for this is `cyclic`, which allows us to loop through predefined lists of symbols. It sequentially processes the provided symbols and automatically resets to the beginning of the list once the final item is reached.

```css
@counter-style words {
  system: cyclic;
  symbols: startups enterprises nonprofits educators visionaries;
}
```

Let’s illustrate how `cyclic` works with a list using an example:

<CodePen
  user="anon"
  slug-hash="zxodxqx"
  title="@counter-style on a list 3"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that by the fourth list item, the list marker has cycled back to “a”.

### The Index/Count

For an array in JavaScript, we’d use a `for` loop to increment a number and use it as an index to fetch the array values sequentially. Similarly, in CSS, we’ll increment a count, and use it to fetch the words sequentially.

To set an incrementable number, we use a registered custom property of type integer. Here’s how you can define a custom property:

```css
@property --i {
  syntax: "<integer>";
  initial-value: 1;
  inherits: true;
}
```

Now, let’s use this custom property in the word rotator.

```css
#rotator::after {
  counter-reset: i calc(var(--i));
  content: counter(i, words);
}
```

`counter-reset` resets the counter `i` with the new value of `--i` as it increments. The count `--i` is wrapped in `calc()` so that `--i` is evaluated each time its value changes.

`counter(i, words)` will fetch the corresponding word to the running counter’s value, similar to an array, like `words[i]`, that fetches a word from the current index in a loop.

Let’s set the loop now.

### The Loop/Animation

The initial value of `--i` was declared in the `@property` rule. Its final value will be the total number of words plus one, so all the words are looped through, and the last in the loop is the first word in the set. If you want it to stop at the last word then `--i` will be the same as the total number of words.

```css
main:hover #rotator::after {
  --i: 6;
  transition: --i 3s linear;
}
```

In 3 seconds, `--i` transitions from its initial value of 1 to 6. Here’s the result:

<CodePen
  user="anon"
  slug-hash="WboEbQa"
  title="Word rotator with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

To give a nice animation effect for when words change, we can incorporate keyframe animations to add a shrink and expand effect to the words at the intervals when they appear.

```css
@keyframes blink {
  17%, 34%, 35%, 52%, 53%, 70%, 71%, 88% {
    transform: scale(0);
    opacity: 0;
  }
  22%, 26%, 39%, 43%, 56%, 60%, 72%, 76% {
    transform: scale(1);
    opacity: 1;
  }
}
```

We don’t need the blink effect for the first and last intervals, only the ones in between.

As mentioned earlier, 6 is the final count.
100 divided by 6 is approximately 17. The four intervals (excluding the first and last) are roughly the following, where the words grow and shrink in the middle of these intervals:

```plaintext
17-34 (word fully visible 22-26 )
35-52 (word fully visible 39-43 )
53-70 (word fully visible 56-60 )
71-88 (word fully visible 72-76 )
```

<CodePen
  user="anon"
  slug-hash="qEqZyRQ"
  title="Word rotator with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Pseudo Random Words

Sometimes, a loop through of random letters creates a visually appealing effect, such as a cipher text effect. As I mentioned in the previous article, `numeric` and `alphabetic` can help create a somewhat pseudo-randomness using random symbols.

```css
@counter-style letters {
  system: alphabetic;
  symbols: ' ' 'x' '1' 'z' '9' 's';
}
@property --i {
  syntax: "<integer>";
  initial-value: 1;
  inherits: true;
}
#rotator::after {
  counter-reset: i calc(var(--i));
  content: counter(i, letters);

}
main:hover #rotator::after {
  --i: 300;
  content: 'B2B';
  transition: --i 1s linear, content 0s 1s allow-discrete;
}
```

<CodePen
  user="anon"
  slug-hash="EaNvayV"
  title="Word rotator with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

A higher value for `--i` will produce a more jumbled sequence. The final displayed word is shown with a delay time equal to the transition time (1s) for `--i` to go from 1 to 300. For `content` to keep its delay time, `allow-discrete` is set as the `transition-behaviour`.

---

## Value-Based System

Unlike position based systems, `alphabetic` and `numeric`, the `additive` system is sign-value based. In the `additive` system, we assign a decimal value to a symbol, and when we use the system to represent a count, the result is a sequence of symbols whose values sum up to the count.

Consider this example, where we assign the glyphs for the ace, 2, and 3 of diamonds playing cards to decimal values 1, 2, and 3 using the `additive` system. The symbols are provided in the `additive-symbols` descriptor.

```css
@counter-style additive-style { 
  system: additive; 
  /* has to be in descending order */
  additive-symbols: 3 '\1F0C3', 2 '\1F0C2', 1 '\1F0C1'; 
  suffix:'';
}
```

<CodePen
  user="anon"
  slug-hash="GgNvgqy"
  title="@counter-style on a list 3"
  :default-tab="['css','result']"
  :theme="dark"/>

In the output, the count 4 is represented by the combination of 3 of diamonds (assigned value 3), and ace of diamonds (assigned value 1), totalling to a value of 4. If you want to rotate through glyphs based on the sum of their assigned values, using the `additive` system might be useful. If the count does not exceed the number of given symbols, this system behaves similarly to the `cyclic` system.

```css
@counter-style letters {
  system: additive;
  additive-symbols: 6 "\1F01E", 5 "\1F01D", 4 "\1F01C", 3 "\1F01B", 2 "\1F01A", 1 "\1F019";
}
@property --i {
  syntax: "<integer>";
  initial-value: 1;
  inherits: true;
}
#rotator::after {
  counter-reset: i calc(var(--i));
  content: counter(i, letters);
}
main:hover #rotator::after {
  --i: 6;
  transition: --i 1s;
}
```

<CodePen
  user="anon"
  slug-hash="azByzmd"
  title="Word rotator with @counter-style"
  :default-tab="['css','result']"
  :theme="dark"/>

All six mahjong tiles appear one after another.

As shown in this article and the previous one, `@counter-style` is useful in building sequences of characters, like numbers, letters, words, etc. These sequences can then be used to create both interesting bulleting systems and dynamic visual effects like the ones exemplified in the articles. CSS animation is responsible for generating the looping effect, allowing us to traverse through a count. This count, in turn, selects the appropriate symbol defined within the `@counter-style`, providing us with a mechanism to construct and rotate through sequences of symbols.

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
  "title": "Word Rotator with @counter-style",
  "desc": "Using @counter-style for tricky visual effects like word rotation and obfuscation.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/word-rotator-with-counter-style.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
