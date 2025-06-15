---
lang: en-US
title: "if-else vs switch"
description: "Article(s) > (14/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
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
      content: "Article(s) > (14/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "if-else vs switch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/if-else-vs-switch.html
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
  "title": "The Front-End Performance Optimization Handbook – Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-if-else-vs-switch"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

As the number of judgment conditions increases, it becomes more preferable to use switch instead of if-else.

```js :collapsed-lines
if (color == 'blue') {

} else if (color == 'yellow') {

} else if (color == 'white') {

} else if (color == 'black') {

} else if (color == 'green') {

} else if (color == 'orange') {

} else if (color == 'pink') {

}

switch (color) {
    case 'blue': break
    case 'yellow': break
    case 'white': break
    case 'black': break
    case 'green': break
    case 'orange': break
    case 'pink': break
}
```

In situations like the one above, from a readability perspective, using switch is better (JavaScript's switch statement is not based on hash implementation but on loop judgment, so from a performance perspective, if-else and switch are the same).

---

## Why `switch` is better for multiple conditions:

### 1. Improved readability

Switch statements present a clearer visual structure when dealing with multiple conditions against the same variable. The case statements create a more organized, tabular format that's easier to scan and understand.

### 2. Cleaner code maintenance

Adding or removing conditions in a switch statement is simpler and less error-prone. With if-else chains, it's easy to accidentally break the chain or forget an "else" keyword.

### 3. Less repetition

In the if-else example, we repeat checking the same variable (`color`) multiple times, while in switch we specify it once at the top.

### 4. Better for debugging

When debugging, it's easier to set breakpoints on specific cases in a switch statement than trying to identify which part of a long if-else chain you need to target.

### 5. Intent signaling

Using switch communicates to other developers that you're checking multiple possible values of the same variable, rather than potentially unrelated conditions.

For modern JavaScript, there's another alternative worth considering for simple value mapping – object literals:

```js
const colorActions = {
  'blue': () => { /* blue action */ },
  'yellow': () => { /* yellow action */ },
  'white': () => { /* white action */ },
  'black': () => { /* black action */ },
  'green': () => { /* green action */ },
  'orange': () => { /* orange action */ },
  'pink': () => { /* pink action */ }
};

// Execute the action if it exists
if (colorActions[color]) {
  colorActions[color]();
}
```

This approach provides even better performance (O(1) lookup time) compared to both if-else and switch statement approaches.
