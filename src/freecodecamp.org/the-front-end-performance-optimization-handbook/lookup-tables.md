---
lang: en-US
title: "Lookup Tables"
description: "Article(s) > (15/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (15/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Lookup Tables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/lookup-tables.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-lookup-tables"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

When there are many conditional statements, using switch and if-else is not the best choice. In such cases, you might want to try lookup tables. Lookup tables can be constructed using arrays and objects.

```js
switch (index) {
  case '0': return result0
  case '1': return result1
  case '2':  return result3
  case '4': return result4
  case '5': return result5
  case '6': return result6
  case '7': return result7
  case '8': return result8
  case '9': return result9
  case '10': return result10
  case '11': return result11
}
```

This switch statement can be converted to a lookup table:

```js
const results = [result0,result1,result2,result3,result4,result5,result6,result7,result8,result9,result10,result11]

return results[index]
```

If the conditional statements are not numerical values but strings, you can use an object to build a lookup table:

```js
const map = {
  red: result0,
  green: result1,
}

return map[color]
```

---

## Why lookup tables are better for many conditions:

### 1. Constant time complexity ($O\left(1\right)$)

Lookup tables provide direct access to the result based on the index/key, making the operation time constant regardless of how many options there are. In contrast, both if-else chains and switch statements have linear time complexity ($O\left(n\right)$) because in the worst case, they might need to check all conditions.

### 2. Performance gains with many conditions

As the number of conditions increases, the performance advantage of lookup tables becomes more significant. For a small number of cases (2-5), the difference is negligible, but with dozens or hundreds of cases, lookup tables are substantially faster.

### 3. Code brevity

As shown in the examples, lookup tables typically require less code, making your codebase more maintainable.

### 4. Dynamic configuration

Lookup tables can be easily populated dynamically:

```js
const actionMap = {};

// Dynamically populate the map
function registerAction(key, handler) {
  actionMap[key] = handler;
}

// Register different handlers
registerAction('save', saveDocument);
registerAction('delete', deleteDocument);

// Use it
if (actionMap[userAction]) {
  actionMap[userAction]();
}
```

### 5. Reduced cognitive load

When there are many conditions, lookup tables eliminate the mental overhead of following long chains of logic.

::: info When to use each approach:

- **If-else**: Best for a few conditions (2-3) with complex logic or different variables being checked
- **Switch**: Good for moderate number of conditions (4-10) checking against the same variable
- **Lookup tables**: Ideal for many conditions (10+) or when you need O(1) access time

:::

In real applications, lookup tables might be populated from external sources like databases or configuration files, making them flexible for scenarios where the mapping logic might change without requiring code modifications.
