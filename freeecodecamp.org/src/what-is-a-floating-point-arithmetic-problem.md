---
lang: en-US
title: "What is a Floating-Point Arithmetic Problem?"
description: "Article(s) > What is a Floating-Point Arithmetic Problem?"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is a Floating-Point Arithmetic Problem?"
    - property: og:description
      content: "What is a Floating-Point Arithmetic Problem?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-floating-point-arithmetic-problem.html
prev: /academics/coen/articles/README.md
date: 2024-10-24
isOriginal: false
author: Syeda Maham Fahim
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729588035734/9824633d-727a-49ce-9080-0fa3a7b18ed6.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is a Floating-Point Arithmetic Problem?"
  desc="Have you ever worked with numbers like 1/3, where the result is 0.33333… and continues forever? As humans, we naturally round off such numbers, but have you ever wondered how computers handle them? In this article, you’ll explore how computers manage..."
  url="https://freecodecamp.org/news/what-is-a-floating-point-arithmetic-problem"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729588035734/9824633d-727a-49ce-9080-0fa3a7b18ed6.jpeg"/>

Have you ever worked with numbers like $\frac{1}{3}$, where the result is 0.33333… and continues forever? As humans, we naturally round off such numbers, but have you ever wondered how computers handle them?

In this article, you’ll explore how computers manage continuous values, including the concept of precision errors. We’ll examine the floating-point arithmetic problem, a universal issue that affects many programming languages. We’ll focus specifically on how JavaScript addresses this challenge.

Additionally, you’ll learn how binary operations work behind the scenes, the threshold at which JavaScript truncates numbers based on the IEEE 754 standard, and introduce `BigInt` as a solution for accurately handling larger numbers without precision loss.

First, let's consider an example. Can you guess the output of this operation?

```js
console.log(0.1 + 0.2);
// Output: 0.30000000000000004
```

You may think the answer is $0.3$, right? But no, the actual output is:

You must be wondering why this is happening. Why so many extra zeros, and why does it end with a $4$?

The answer is simple: the numbers $0.1$ and $0.2$ cannot be precisely represented in JavaScript (that is, "exactly" or "accurately.")

It sounds simple, right? But the explanation is a bit more complex.

So, what do you think—bug or feature?

Well, it’s not a bug. It’s actually a fundamental issue with how computers handle numbers, specifically floating-point numbers.

---

## Why Does This Happen?

Let’s understand this with basic math.

When you add $0.1$ and $0.2$, it should be equal to $\frac{1}{3}$ in fraction form, which in decimal is 0.33333... and it never ends. This means that $3$ repeats itself infinitely. We can’t write it down exactly, so we approximate it to something like $0.333$ or $0.333333$ to save time and space.

Similarly, in a computer, we also have to approximate because $\frac{1}{3}$ or 0.3333... would be a very large number and take up infinite space (which we don’t have).

This leads to what we call the floating-point arithmetic problem.

---

## Floating-Point Arithmetic Problem

In simple terms, floating-point numbers are numbers that cannot be written down exactly, so we approximate them. In a computer, this kind of approximation can lead to small precision errors, which we call the floating-point arithmetic problem.

---

## Binary Explanation

Now that we've covered the simple explanation, let’s also understand this in binary terms. JavaScript handles everything in binary behind the scenes.

Binary is a number system that only uses two digits: $0$ and $1$.

### Why Can’t 0.1 and 0.2 Be Represented Exactly in Binary?

The core issue is that not all decimal numbers can be perfectly represented as binary fractions.

Let’s take $0.1$ as an example:

When you try to represent $0.1$ in binary, you’ll find out that it can’t be expressed as a finite binary fraction. Instead, it becomes a repeating fraction, much like how $\frac{1}{3}$ in decimal becomes 0.333..., repeating forever.

In binary, 0.1 becomes:

```plaintext
0.0001100110011001100110011001100110011... (repeating infinitely)
```

Since computers have limited memory, they can’t store this infinite sequence exactly. Instead, they have to cut off the number at some point, which introduces a small rounding error. This is why $0.1$ in binary is only an approximation of the actual value.

Like $0.1$, $0.2$ can’t be exactly represented in binary. It becomes:

```plaintext
0.00110011001100110011001100110011... (repeating infinitely)
```

Again, the computer truncates (cutting off part of a number to fit a limit or remove extra digits) this infinite binary sequence, leading to a small error in representation.

So, what happens when we add $0.1$ + $0.2$? When you add `0.1 + 0.2` in JavaScript, the binary approximations for $0.1$ and $0.2$ are added together. But since both values are only approximations, the result is also an approximation.

Instead of getting exactly $0.3$, you get something close to this:

```js
console.log(0.1 + 0.2); 
// Output: 0.30000000000000004
```

This slight error occurs because neither $0.1$ nor $0.2$ can be represented exactly in binary, so the final result has a small rounding error.

---

## How Does JavaScript Truncate the Number?

Now, the question arises: how does JavaScript know when to truncate the value?

::: info Truncation

Truncation means cutting off or shortening a number by removing extra digits beyond a certain point.

:::

There’s a maximum and minimum limit for it.

To handle this in the computer world, we have a standard that defines how floating-point numbers are stored and calculated.

---

## IEEE 754 Standard

JavaScript uses the IEEE 754 standard to handle floating-point arithmetic.

The standard defines safe integer limits for the `Number` type in JavaScript without precision loss:

- **Maximum Safe Integer:** $2^{53} - 1$ or $9007199254740991$
- **Minimum Safe Integer:** $-\left(2^{53}-1\right)$ or $-9007199254740991$

Beyond these limits, JavaScript cannot accurately represent integers due to the way floating-point arithmetic works.

For this reason, JavaScript provides two constants to represent these limits:

- `Number.MAX_SAFE_INTEGER`
- `Number.MIN_SAFE_INTEGER`

### What If I Need a Bigger Number?

If you need to work with numbers larger than the Maximum Safe Integer (like those used in cryptography or finance), JavaScript has a solution: BigInt.

### Enter BigInt

`BigInt` is a built-in object that allows you to work with whole numbers beyond the safe integer limit. It enables you to represent numbers larger than $9007199254740991$, so you don't need to worry about precision errors here!

To use `BigInt`, simply append an `n` to the end of an integer literal:

```js
const bigNumber = 1234567890123456789012345678901234567890n;
```

Alternatively, you can use the `BigInt` constructor:

```js
const bigNumber = BigInt("1234567890123456789012345678901234567890");
```

#### Operations with BigInt

You can perform arithmetic operations with `BigInt`, like addition, subtraction, multiplication, and even exponentiation. However, there’s a catch: you can’t mix `BigInt` with regular `Number` types in arithmetic operations without explicitly converting between them.

For example, this won’t work:

```js
let result = bigNumber + 5; // Error: cannot mix BigInt and other types
```

You would need to convert the `Number` to `BigInt` first:

```js
let result = bigNumber + BigInt(5); // Now it works!
```

### Where Do We Use BigInt?

`BigInt` is particularly useful in areas requiring precision, such as:

- Cryptographic algorithms
- Handling large datasets
- Financial calculations requiring exactness

### In Summary

- The safe integer limit in JavaScript ensures accurate number representation for integers between $-\left(2^{53}-1\right)$ and $2^{53}-1$.
- Precision errors occur due to floating-point arithmetic when handling certain numbers (like $0.1+0.2$.
- If you need numbers bigger than the safe limit, `BigInt` is your friend. But remember, mixing `BigInt` and `Number` types require explicit conversions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is a Floating-Point Arithmetic Problem?",
  "desc": "Have you ever worked with numbers like 1/3, where the result is 0.33333… and continues forever? As humans, we naturally round off such numbers, but have you ever wondered how computers handle them? In this article, you’ll explore how computers manage...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-floating-point-arithmetic-problem.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
