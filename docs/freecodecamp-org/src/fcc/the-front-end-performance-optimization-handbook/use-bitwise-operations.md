---
lang: en-US
title: "Use Bitwise Operations"
description: "Article(s) > (19/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (19/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Bitwise Operations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-bitwise-operations.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook - Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-bitwise-operations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

Numbers in JavaScript are stored in 64-bit format using the IEEE-754 standard. But in bitwise operations, numbers are converted to 32-bit signed format. Even with the conversion, bitwise operations are much faster than other mathematical and boolean operations.

---

## Modulo

Since the lowest bit of even numbers is 0 and odd numbers is 1, modulo operations can be replaced with bitwise operations.

```js
if (value % 2) {
    // Odd number
} else {
    // Even number 
}
// Bitwise operation
if (value & 1) {
    // Odd number
} else {
    // Even number
}
```

::: info How it works

The `&` (bitwise AND) operator compares each bit of the first operand to the corresponding bit of the second operand. If both bits are 1, the corresponding result bit is set to 1; otherwise, it's set to 0. When we do `value & 1`, we're only checking the last bit of the number:

- For even numbers (for example, 4 = `100` in binary), the last bit is 0: `100 & 001 = 000` (0)
- For odd numbers (for example, 5 = `101` in binary), the last bit is 1: `101 & 001 = 001` (1)

:::

---

## Floor

```js
~~10.12 // 10
~~10 // 10
~~'1.5' // 1
~~undefined // 0
~~null // 0
```

::: info How it works

The `~` (bitwise NOT) operator inverts all bits in the operand. For a number `n`, `~n` equals `-(n+1)`. When applied twice (`~~n`), it effectively truncates the decimal part of a number, similar to `Math.floor()` for positive numbers and `Math.ceil()` for negative numbers.

The process:

1. First `~`: Converts the number to a 32-bit integer and inverts all bits
2. Second `~`: Inverts all bits again, resulting in the original number but with decimal part removed

:::

::: tip Example

For example:

```js
~10.12 → ~10 → -(10+1) → -11
~(-11) → -(-11+1) → -(-10) → 10
```

:::

---

## Bitmask

```js
const a = 1
const b = 2
const c = 4
const options = a | b | c
```

By defining these options, you can use the bitwise AND operation to determine if a/b/c is in the options.

```js
// Is option b in the options?
if (b & options) {
    ...
}
```

::: info How it works

In bitmasks, each bit represents a boolean flag. The values are typically powers of 2 so each has exactly one bit set.

1. `a = 1`: Binary `001`
2. `b = 2`: Binary `010`
3. `c = 4`: Binary `100`
4. `options = a | b | c`: The `|` (bitwise OR) combines them: `001 | 010 | 100 = 111` (binary) = 7 (decimal)

When checking if a flag is set with `if (b & options)`:

- `b & options` = `010 & 111` = `010` = 2 (decimal)
- Since this is non-zero, the condition evaluates to true

:::

This technique is extremely efficient for storing and checking multiple boolean values in a single number, and is commonly used in systems programming, graphics programming, and permission systems.
