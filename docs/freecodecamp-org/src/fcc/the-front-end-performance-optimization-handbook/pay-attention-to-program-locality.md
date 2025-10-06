---
lang: en-US
title: "Pay Attention to Program Locality"
description: "Article(s) > (13/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (13/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Pay Attention to Program Locality"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/pay-attention-to-program-locality.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-pay-attention-to-program-locality"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

A well-written computer program often has good locality - it tends to reference data items near recently referenced data items or the recently referenced data items themselves. This tendency is known as the principle of locality. Programs with good locality run faster than those with poor locality.

---

## Locality usually takes two different forms:

- Temporal locality: In a program with good temporal locality, memory locations that have been referenced once are likely to be referenced multiple times in the near future.
- Spatial locality: In a program with good spatial locality, if a memory location has been referenced once, the program is likely to reference a nearby memory location in the near future.

### Temporal locality example:

```js
function sum(arry) {
  let i, sum = 0
  let len = arry.length

  for (i = 0; i < len; i++) {
    sum += arry[i]
  }

  return sum
}
```

In this example, the variable sum is referenced once in each loop iteration, so it has good temporal locality.

### Spatial locality example:

Program with good spatial locality:

```js
// Two-dimensional array 
function sum1(arry, rows, cols) {
  let i, j, sum = 0

  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      sum += arry[i][j]
    }
  }
  return sum
}
```

Program with poor spatial locality:

```js
// Two-dimensional array 
function sum2(arry, rows, cols) {
  let i, j, sum = 0

  for (j = 0; j < cols; j++) {
    for (i = 0; i < rows; i++) {
      sum += arry[i][j]
    }
  }
  return sum
}
```

Looking at the two spatial locality examples above, the method of accessing each element of the array sequentially starting from each row, as shown in the examples, is called a reference pattern with a stride of 1. If in an array, every k elements are accessed, it's called a reference pattern with a stride of k. Generally, as the stride increases, spatial locality decreases.

What's the difference between these two examples? Well, the first example scans the array by row, scanning one row completely before moving on to the next row. The second example scans the array by column, scanning one element in a row and immediately going to scan the same column element in the next row.

Arrays are stored in memory in row order, resulting in the example of scanning the array row by row getting a stride-1 reference pattern with good spatial locality. The other example has a stride of rows, with extremely poor spatial locality.

---

## Performance Testing

Running environment:

- CPU: i5-7400
- Browser: Chrome 70.0.3538.110

Testing spatial locality on a two-dimensional array with a length of 9000 (child array length also 9000) 10 times, taking the average time (milliseconds), the results are as follows:

The examples used are the two spatial locality examples mentioned above.

| Stride 1 | Stride 9000 |
| --- | --- |
| 124 | 2316 |

From the test results above, the array with a stride of 1 executes an order of magnitude faster than the array with a stride of 9000. So to sum up:

- Programs that repeatedly reference the same variables have good temporal locality
- For programs with a reference pattern with a stride of k, the smaller the stride, the better the spatial locality; while programs that jump around in memory with large strides will have very poor spatial locality

::: info Reference:

```component VPCard
{
  "title": "Computer Systems: A Programmer's Perspective (3rd Edition) : Bryant, Randal E., O'Hallaron, David R.: Amazon.sg: Books",
  "desc": "Computer Systems: A Programmer's Perspective (3rd Edition) : Bryant, Randal E., O'Hallaron, David R.: Amazon.sg: Books",
  "link": "https://amazon.sg/Computer-Systems-Programmers-Perspective-3rd/dp/013409266X/",
  "logo": "",
  "background": "rgba(254,189,105,0.2)"
}
```

:::
