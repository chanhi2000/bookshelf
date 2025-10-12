---
lang: en-US
title: "React Internals: Which useEffect runs first?"
description: "Article(s) > React Internals: Which useEffect runs first?"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React Internals: Which useEffect runs first?"
    - property: og:description
      content: "React Internals: Which useEffect runs first?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/react-internals-which-useeffect-runs-first.html
prev: /programming/js-react/articles/README.md
date: 2025-04-28
isOriginal: false
author:
  - name: Teng Wei Herr
    url : https://frontendmasters.com/blog/author/weiherrteng/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5672
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Internals: Which useEffect runs first?"
  desc="It's not particularly obvious, but a child's useEffect will run before a parent's will. Let's look at why."
  url="https://frontendmasters.com/blog/react-internals-which-useeffect-runs-first/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5672"/>

[<VPIcon icon="fa-brands fa-react"/>`useEffect`](https://react.dev/reference/react/useEffect) is one of the most commonly used hooks in the React community. Regardless of how much experience you have with React, you’ve probably used it before.

But have you ever run into situations where **`useEffect` hooks run in an unexpected order** when multiple layers of components are involved?

Let’s start with a quick quiz. **What’s the correct order of these `console.log` statements in the console?**

```jsx
function Parent({ children }) {
  console.log("Parent is rendered");
  useEffect(() => {
    console.log("Parent committed effect");
  }, []);

  return <div>{children}</div>;
}

function Child() {
  console.log("Child is rendered");
  useEffect(() => {
    console.log("Child committed effect");
  }, []);

  return <p>Child</p>;
}

export default function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}
```

::: details Answer

```plaintext
// initial render  
Parent is rendered  
Child is rendered  
  
// useEffects  
Child committed effect  
Parent committed effect
```

:::

If you got it right—nice job! If not, no worries—most React devs get this wrong too. In fact, this isn’t something that’s clearly documented or explained on the official React website.

Let’s explore why children components are rendered last but their effects are committed first. We’ll dive into how and when React renders components and commits effects (`useEffect`). We’ll touch on a few React internal concepts like the **React Fiber architecture** and its **traversal algorithm**.

---

## Overview of React Internals

According to [<VPIcon icon="fa-brands fa-react"/>React official documentation](https://react.dev/learn/render-and-commit), the entire React’s component lifecycle can be roughly divided into 3 phases: **_Trigger → Render → Commit_**

### Triggering a render

- The component’s initial render, or state updates with `setState`.
- A state update is put in a queue and scheduled to be processed by the React Scheduler.

### Rendering

- React calls the component and works on the state update.
- React reconciles and marks it as “dirty” for commit phase.
- Create new DOM node internally.

### Committing to the DOM

- Apply actual DOM manipulation.
- Runs effects (`useEffect`, `useLayoutEffect`).

---

## React Fiber Tree

Before diving into the traversal algorithm, we need to understand the **React Fiber** architecture. I’ll try to keep this introduction beginner-friendly.

Internally, React uses a tree-like data structure called **fiber tree** to represent the component hierarchy and track updates.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-22-at-9.40.32%E2%80%AFAM.png?resize=887%2C1024&ssl=1)

From the diagram above, we can tell that **fiber tree is not exactly a one-to-one mapping of DOM tree**. It includes **additional information** that help React manage rendering more efficiently.

Each node in this tree is called a **fiber node.** There are different kinds of fiber nodes such as `HostComponent` which refers to a **native DOM element**, like `<div>` or `<p>` in the diagram. `FiberRootNode` is the root node and will point to a different `HostRoot` node during each new render.

Every fiber node contains properties like `props`, `state`, and most importantly:

1. `child` - The child of the fiber.
2. `sibling` - The sibling of the fiber.
3. `return` - The return value of the fiber is the parent fiber.

These information allows React to form a tree.

Every time there is a state update, React will construct a new fiber tree and compare against the old tree internally.

::: note

If you’re interested in the detail, please check out [<VPIcon icon="fas fa-globe"/>JSer’s blog](https://jser.dev/series/react-source-code-walkthrough) or his super cool project [<VPIcon icon="fas fa-globe"/>React Internal Explorer](https://jser.pro/ddir/rie?reactVersion=18.3.1&snippetKey=hq8jm2ylzb9u8eh468)!

:::

---

## How Fiber Tree Is Traversed

Generally, React reuses the same traversal algorithm in many use cases.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/React-traverse.gif?resize=1024%2C576&ssl=1)

The animation above shows how React walks the fiber tree. Notice that **each node is stepped twice**. The rule is simple:

1. Traverse downwards.
2. In each fiber node, React checks
    1. If there’s a child, move to the child.
    2. If there’s no child, step again the current node. Then,
        1. If there’s a sibling, move to the sibling.
        2. If there’s no sibling, move up to its parent.

This traversal algorithm ensures each node is stepped twice.

Now, let’s revisit the quiz above.

---

## Render Phase

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Copy-of-React-traverse.gif?resize=1024%2C576&ssl=1)

React traverses the fiber tree and recursively performs **two steps** on each fiber node:

- **In the first step**, React calls the component — this is where `console.log` statement is executed. React reconciles and marks the fiber as “dirty” if state or props have changed, preparing it for the commit phase.
- **In the second step**, React constructs the new DOM node.

::: info

In the React source code, the process is named [`workLoop` (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/c44e4a250557e53b120e40db8b01fb5fd93f1e35/packages/react-reconciler/src/ReactFiberWorkLoop.js#L2484). The first step is [`beginWork()` (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/c44e4a250557e53b120e40db8b01fb5fd93f1e35/packages/react-reconciler/src/ReactFiberWorkLoop.js#L2811). The second step is [`completeWork()` (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/c44e4a250557e53b120e40db8b01fb5fd93f1e35/packages/react-reconciler/src/ReactFiberWorkLoop.js#L2831).

:::

At the end of Render phase, a new fiber tree with the updated DOM nodes is generated. At this point, **nothing has been committed to the real DOM yet.** The actual DOM mutations will happen in the Commit phase.

---

## Commit Phase

**Commit phase** is where actual **DOM mutations** and **effect flushing** (`useEffect`). The traversal pattern remains the same, but DOM mutations and effect flushing are handled in separate walks.

In this section, we’ll skip DOM mutations and focus on the effect flushing walk.

### Committing effects

React uses the same traversal algorithm. However, instead of checking whether a node has a child, it checks whether it has a subtree — which makes sense, because only React components can contain `useEffect` hooks. A DOM node like `<p>` won’t contain any React hooks.

Nothing happens in the first step, but in the second step, it commits effects.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Example-1-commit.gif?resize=1024%2C576&ssl=1)

This depth-first traversal explains why child effects are run before parent effects. This is the root cause.

::: note

In the React source code, the recursive function for committing effects is named [`recursivelyTraversePassiveMountEffect` (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/c44e4a250557e53b120e40db8b01fb5fd93f1e35/packages/react-reconciler/src/ReactFiberCommitWork.js#L3283).

:::

Now let’s check out another quiz example. The result should make more sense to you now.

```jsx :collapsed-lines
function Parent({ children }) {
  console.log("Parent is rendered");
  useEffect(() => {
    console.log("Parent committed effect");
  }, []);

  return <div>{children}</div>;
}

function Child() {
  console.log("Child is rendered");
  useEffect(() => {
    console.log("Child committed effect");
  }, []);

  return <p>Child</p>;
}

function ParentSibling() {
  console.log("ParentSibling is rendered");
  useEffect(() => {
    console.log("ParentSibling committed effect");
  }, []);

  return <p>Parent's Sibling</p>;
}

export default function App() {
  return (
    <>
      <Parent>
        <Child />
      </Parent>
      <ParentSibling />
    </>
  );
}
```

::: details Answer

```plaintext
// Initial render  
Parent is rendered  
Child is rendered  
ParentSibling is rendered  
  
// useEffects  
Child committed effect  
Parent committed effect  
ParentSibling committed effect
```

:::

During the commit phase:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Example-2-commit.gif?resize=1024%2C576&ssl=1)

Now, it should be self-explanatory why **child effects are flushed before their parents** during the commit phase.

Understanding how and when React commits `useEffect` hooks can help you avoid subtle bugs and unexpected behaviors—especially when working with complex component structures.

Welcome to React internals!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Internals: Which useEffect runs first?",
  "desc": "It's not particularly obvious, but a child's useEffect will run before a parent's will. Let's look at why.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/react-internals-which-useeffect-runs-first.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
