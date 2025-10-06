---
lang: en-US
title: "Reduce Reflows and Repaints"
description: "Article(s) > (11/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (11/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Reduce Reflows and Repaints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/reduce-reflows-and-repaints.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-reduce-reflows-and-repaints"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

---

## Browser Rendering Process

1. Parse HTML to generate DOM tree.
2. Parse CSS to generate CSSOM rules tree.
3. Combine DOM tree and CSSOM rules tree to generate rendering tree.
4. Traverse the rendering tree to begin layout, calculating the position and size information of each node.
5. Paint each node of the rendering tree to the screen.

![Diagram of browser rendering process showing the steps from HTML/CSS to rendered pixels](https://camo.githubusercontent.com/b01f818aab6cf14622f77ee3d2407b961b38b4654ab88c3fa391d2b43a77c46c/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f35363437643961643461643561353731373839313964656165353137356238332e706e67)

---

## Reflow

When the position or size of DOM elements is changed, the browser needs to regenerate the rendering tree, a process called reflow.

---

## Repaint

After regenerating the rendering tree, each node of the rendering tree needs to be painted to the screen, a process called repaint. Not all actions will cause reflow - for example, changing font color will only cause repaint. Remember, reflow will cause repaint, but repaint will not cause reflow.

Both reflow and repaint operations are very expensive because the JavaScript engine thread and the GUI rendering thread are mutually exclusive, and only one can work at a time.

What operations will cause reflow?

- Adding or removing visible DOM elements
- Element position changes
- Element size changes
- Content changes
- Browser window size changes

How to reduce reflows and repaints?

- When modifying styles with JavaScript, it's best not to write styles directly, but to replace classes to change styles.
- If you need to perform a series of operations on a DOM element, you can take the DOM element out of the document flow, make modifications, and then bring it back to the document. It's recommended to use hidden elements (display:none) or document fragments (DocumentFragement), both of which can implement this approach well.

::: tip Example of causing unnecessary reflows (inefficient):

```js
// This causes multiple reflows as each style change triggers a reflow
const element = document.getElementById('myElement');
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';
element.style.padding = '20px';
element.style.borderRadius = '5px';
```

**Optimized version 1 - using CSS classes:**

```css title="style.css"
.my-modified-element {
  width: 100px;
  height: 200px;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
}
```

```js
// Only one reflow happens when the class is added
document.getElementById('myElement').classList.add('my-modified-element');
```

**Optimized version 2 - batching style changes:**

```js
// Batching style changes using cssText
const element = document.getElementById('myElement');
element.style.cssText = 'width: 100px; height: 200px; margin: 10px; padding: 20px; border-radius: 5px;';
```

**Optimized version 3 - using document fragments (for multiple elements):**

```js
// Instead of adding elements one by one
const list = document.getElementById('myList');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}

// Only one reflow happens when the fragment is appended
list.appendChild(fragment);
```

**Optimized version 4 - take element out of flow, modify, then reinsert:**

```js
// Remove from DOM, make changes, then reinsert
const element = document.getElementById('myElement');
const parent = element.parentNode;
const nextSibling = element.nextSibling;

// Remove (causes one reflow)
parent.removeChild(element);

// Make multiple changes (no reflows while detached)
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';
element.style.padding = '20px';
element.style.borderRadius = '5px';

// Reinsert (causes one more reflow)
if (nextSibling) {
  parent.insertBefore(element, nextSibling);
} else {
  parent.appendChild(element);
}
```

**Optimized version 5 - using display:none temporarily:**

```js
const element = document.getElementById('myElement');

// Hide element (one reflow)
element.style.display = 'none';

// Make multiple changes (no reflows while hidden)
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';
element.style.padding = '20px';
element.style.borderRadius = '5px';

// Show element again (one more reflow)
element.style.display = 'block';
```

:::

By using these optimization techniques, you can significantly reduce the number of reflows and repaints, leading to smoother performance, especially for animations and dynamic content updates.
