---
lang: en-US
title: "What is the virtual DOM in React?"
description: "Article(s) > What is the virtual DOM in React?"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is the virtual DOM in React?"
    - property: og:description
      content: "What is the virtual DOM in React?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/the-virtual-dom-react.html
prev: /programming/js-react/articles/README.md
date: 2025-02-26
isOriginal: false
author:
  - name: Ibadehin Mojeed
    url : https://blog.logrocket.com/author/ibadehinmojeed/
cover: /assets/image/blog.logrocket.com/the-virtual-dom-react/banner.png
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
  name="What is the virtual DOM in React?"
  desc="Learn the characteristics of the virtual document object model (DOM), explore its benefits in React, and review a practical example."
  url="https://blog.logrocket.com/the-virtual-dom-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/the-virtual-dom-react/banner.png"/>

The virtual DOM is a fundamental React concept; if you’ve written any React code within the last few years, you’ve probably heard of it. However, you might not understand how it works and why React uses it.

![what is the virtual DOM in react](/assets/image/blog.logrocket.com/the-virtual-dom-react/banner.png)

In this article, we’ll define the characteristics of the virtual document object model (DOM), explore its benefits in React, and review a practical example. Let’s get started!

---

## What is the virtual DOM?

The virtual DOM is a lightweight, memory-based representation of the real DOM that enables React to update user interfaces by calculating the minimal set of changes needed. When a component’s state changes, React creates a new virtual DOM and then compares it with the previous version using a diffing algorithm.

It then updates only the parts of the real DOM that have actually changed. This makes for a better user experience because it reduces the number of [**direct manipulations**](/blog.logrocket.com/patterns-efficient-dom-manipulation-vanilla-javascript.md) to the browser’s DOM.

---

::: note Editor’s note

This post was updated in March 2025 by [<FontIcon icon="fas fa-globe"/>Muhammed Ali*](https://blog.logrocket.com/author/muhammedali/) *to include a clear and succinct definition of the virtual DOM, information on how the virtual DOM works, and the benefits/pitfalls of using the virtual DOM.

:::

---

---

## How the Virtual DOM works

The virtual DOM works in three main steps:

### Rendering

When a component’s state or props change, React re-renders the component to generate a new virtual DOM tree. This tree is a representation of the UI composed of plain JavaScript objects. It mirrors the structure of the [**actual DOM**](/blog.logrocket.com/exploring-essential-dom-methods-frontend-development.md) elements but omits browser details, making it quick to create and update without direct interaction with the real DOM.

### Diffing

Once the new virtual DOM tree is created, React performs a diffing process. It compares the new tree with the previous version to identify exactly which elements have changed. This comparison matches element types using keys for list items to quickly pinpoint modifications. By isolating only the differences, React significantly minimizes the number of updates needed.

### Patching

After determining the differences, React generates a set of minimal update instructions and applies these changes to the actual DOM. This process is known as patching.

Instead of re-rendering the entire DOM tree, only the modified parts are updated. This selective updating reduces the performance overhead associated with full DOM updates. This will mean that the user interface remains fast even as the application grows in complexity.

---

## How re-rendering impacts performance

DOM operations are very fast, light operations. However, when the app data changes and triggers an update, re-rendering can be expensive.

Let’s simulate re-rendering a page with the JavaScript code below:

```js
const update = () => {
 const element = `
  <h3>JavaScript:</h3>
  <form>
   <input type="text"/>
  </form>
  <span>Time: ${new Date().toLocaleTimeString()}</span>
 `;

 document.getElementById("root1").innerHTML = element;
};

setInterval(update, 1000);
```

You can find the complete code [on CodeSandbox (<FontIcon icon="iconfont icon-codesandbox"/>`goofy-darwin-4g25ce`)](https://codesandbox.io/s/goofy-darwin-4g25ce?file=/src/index.js). The DOM tree representing the document looks like the following:
<!-- TODO: codesandbox -->

![Dom Tree Representing Example Document](/assets/image/blog.logrocket.com/the-virtual-dom-react/1-dom-tree-representing-example-document-.png)

The `setInterval()` callback in the code lets us trigger a simulated re-render of the UI after every second. As seen in the GIF below, the document DOM elements are rebuilt and repainted on each update. The text input in the UI also loses its state due to this re-rendering:

![Node Lighting Up Full Page Rerender](/assets/image/blog.logrocket.com/the-virtual-dom-react/2-node-lighting-up-full-page-re-render.gif)

As seen above, the text field loses the input value when an update occurs in the UI, which calls for optimization.

Different JavaScript frameworks offer different solutions and strategies to optimize re-rendering. However, React implements the concept of the virtual DOM.

As the name implies, the virtual DOM is a much lighter replica of the actual DOM in the form of objects. The virtual DOM can be saved in the browser memory and doesn’t directly change what is shown on the user’s browser. Implemented by several other frontend frameworks, like Vue, React’s declarative approach is unique.

---

## Benefits and pitfalls of using the React virtual DOM

Here’s what to consider when contemplating use of the virtual DOM in React:

### Benefits

- By updating only the changed elements, the virtual DOM minimizes direct, expensive manipulations of the real DOM
- The abstraction helps in writing consistent and maintainable code, as state transitions are managed internally
- Developers can focus on building UI components without manually handling DOM updates, reducing potential bugs

### Pitfalls

- For very basic UIs, the extra layer of abstraction may introduce unnecessary processing overhead
- In highly dynamic applications with frequent updates, the diffing process might become a performance concern if not optimized
- Debugging can sometimes be more challenging since developers work with a virtual representation rather than the actual DOM

---

## How is the virtual DOM different from the real DOM?

A common misconception is that the virtual DOM is faster than or rivals the actual DOM. However, this is untrue.

In fact, the virtual DOM’s operations support and add on to those of the actual DOM. Essentially, the virtual DOM provides a mechanism that allows the actual DOM to compute minimal DOM operations when re-rendering the UI.

For example, when an element in the real DOM is changed, the DOM will re-render the element and all of its children. When it comes to building complex web applications with a lot of interactivity and state changes, this approach is slow and inefficient.

Instead, in the rendering process, React employs the concept of the virtual DOM, which conforms with its declarative approach. Therefore, we can specify what state we want the UI to be in, after which React makes it happen.

After the virtual DOM is updated, React compares it to a snapshot of the virtual DOM taken just before the update, determines what element was changed, and then updates only that element on the real DOM. This is one method the virtual DOM employs to optimize performance. We’ll go into more detail later.

The virtual DOM abstracts manual DOM manipulations away from the developer, helping us to write more predictable and unruffled code so that we can focus on creating components.

Thanks to the virtual DOM, you don’t have to worry about state transitions. Once you update the state, React ensures that the DOM matches that state. For instance, in our last example, React ensures that on every re-render, only `Time` gets updated in the actual DOM. Therefore, we won’t lose the value of the input field while the UI update happens.

---

## The virtual DOM object

Let’s consider the following render code representing the React version of our previous JavaScript example:

```jsx
// ...
const update = () => {
 const element = (
  <>
   <h3>React:</h3>
   <form>
    <input type="text" />
   </form>
   <span>Time: {new Date().toLocaleTimeString()}</span>
  </>
 );
 root.render(element);
};
```

For brevity, we have removed some of the code. You can [see the complete code on CodeSandbox (<FontIcon icon="iconfont icon-codesandbox"/>`proud-sky-kw2zfb`)](https://codesandbox.io/s/proud-sky-kw2zfb?file=/src/index.js). We can also write JSX code in plain React, as follows:
<!-- TODO: codesandbox -->

```jsx
const element = React.createElement(
 React.Fragment,
 null,
 React.createElement("h3", null, "React:"),
 React.createElement(
  "form",
  null,
  React.createElement("input", {
   type: "text"
  })
 ),
 React.createElement("span", null, "Time: ", new Date().toLocaleTimeString())
);
```

Keep in mind that you can get the React equivalent of JSX code by pasting the JSX elements in a [<FontIcon icon="iconfont icon-babel"/>Babel REPL editor](https://babeljs.io/repl).

Now, if we log the React element in the console, we’ll end up with something like in the following image:

```jsx
 const element = (
  <>
   <h3>React:</h3>
   <form>
    <input type="text" />
   </form>
   <span>Time: {new Date().toLocaleTimeString()}</span>
  </>
 );
 console.log(element)
```

![React Virtual Dom Representing UI](/assets/image/blog.logrocket.com/the-virtual-dom-react/3-react-virtual-dom-representing-ui.png)

The object, as seen above, is the virtual DOM. It represents the user interface.

---

## How React implements the virtual DOM

To understand the virtual DOM strategy, we need to understand the two major phases that are involved: rendering and reconciliation.

When we render an application user interface, React creates a virtual DOM tree representing that UI and stores it in memory. On the next update, or in other words, when the data that renders the app changes, React will automatically create a new virtual DOM tree for the update.

To further explain this, we can visually represent the virtual DOM as follows:

![React Virtual DOM Implementation Rendering Reconciliation](/assets/image/blog.logrocket.com/the-virtual-dom-react/4-react-virtual-dom-implementation-rendering-reconciliation.png)

The image on the left is the initial render. As the `Time` changes, React creates a new tree with the updated node, as seen on the right side.

Remember, the virtual DOM is just an object representing the UI, so nothing gets drawn on the screen.

After React creates the new virtual DOM tree, it compares it to the previous snapshot [<FontIcon icon="fa-brands fa-react"/>using a diffing algorithm called reconciliation](https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm) to figure out what changes are necessary.

After the reconciliation process, React uses [**a renderer library like ReactDOM**](/blog.logrocket.com/managing-dom-components-reactdom.md), which takes the different information to update the rendered app. This library ensures that the actual DOM only receives and repaints the updated node or nodes:

![React Actual DOM Update Repaint](/assets/image/blog.logrocket.com/the-virtual-dom-react/5-react-actual-dom-update-repaint.png)

As seen in the image above, only the node whose data changes gets repainted in the actual DOM. The GIF below further proves this statement:

![Node Changed Data repainted Actual Dom](/assets/image/blog.logrocket.com/the-virtual-dom-react/6-node-changed-data-rapainted-actual-dom.gif)

When a state change occurs in the UI, we’re not losing the input value.

In summary, on every render, React compares the virtual DOM tree with the previous version to determine which node gets updated, ensuring that the updated node matches up with the actual DOM.

---

## The React diffing process

When React diffs two virtual DOM trees, it begins by comparing whether or not both snapshots have the same root element. If they have the same elements, like in our case, where the updated nodes are of the same `span` element type, React moves on and recurses on the attributes.

In both snapshots, no attribute is present or updated on the `span` element. React then repeats the procedure on the children. Upon seeing that the `Time` text node has changed, React will only update the actual node in the real DOM.

On the other hand, if both snapshots have different element types, which is rare in most updates, React will destroy the old DOM nodes and build a new one. For instance, going from `span` to `div`, as shown in the respective code snippets below:

```html
<span>Time: 04:36:35</span> 
<div>Time: 04:36:38</div>
```

In the following example, we render a simple React component that updates the component state after a button click:

```jsx
import { useState } from "react";

const App = () => {
 const [open, setOpen] = useState(false);

 return (
  <div className="App">
   <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
   <div className={open ? "open" : "close"}>
    I'm {open ? "opened" : "closed"}
   </div>
  </div>
 );
};
export default App;
```

Updating the component state re-renders the component. However, as shown below, on every re-render, React knows only to update the class name and the text that changed. This update will not hurt unaffected elements in the render:

![Result Update Component State Dom Changed Text](/assets/image/blog.logrocket.com/the-virtual-dom-react/7-result-update-component-state-dom-changed-text.webp)

See the [code and demo on CodeSandbox (<FontIcon icon="iconfont icon-codesandbox"/>`stupefied-sanderson-dgq4t9`)](https://codesandbox.io/s/stupefied-sanderson-dgq4t9?file=/src/App.js).
<!-- TODO: codesandbox -->

### How React diffs lists

When we modify a list of items, how React diffs the list depends on whether the items are added at the beginning or the end of the list. Consider the following list:

```html
<ul> 
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
</ul>
```

On the next update, let’s append an `item 6` at the end, like so:

```html
<ul> 
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
</ul>
```

React compares the items from the top. It matches the first, second, and third items, and knows only to insert the last item. This computation is straightforward for React.

However, let’s insert `item 2` at the beginning, as follows:

```html
<ul>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
</ul>
```

Similarly, React compares from the top, and immediately realizes that `item 3` doesn’t match `item 2` of the updated tree. It therefore sees the list as an entirely new one that needs to be rebuilt.

Instead of rebuilding the entire list, we want the DOM to compute minimal operations by only prepending `item 2`. React lets us add a `key` prop to [<FontIcon icon="fa-brands fa-react"/>uniquely identify the items](https://reactjs.org/docs/reconciliation.html#keys) as follows:

```js
<ul> 
  <li key="3">item 3</li>
  <li key="4">item 4</li>
  <li key="5">item 5</li>
</ul>

<ul> 
  <li key="2">item 2</li>
  <li key="3">item 3</li>
  <li key="4">item 4</li>
  <li key="5">item 5</li>
  <li key="6">item 6</li>
</ul>
```

With the implementation above, React would know that we have prepended `item 2` and appended `item 6`. As a result, it would work to preserve the items that are already available and add only the new items in the DOM.

If we omit the `key` prop whenever we map to render a list of items, React is kind enough to alert us in the browser console.

---

## How is the virtual DOM different from the shadow DOM?

Before we wrap up, here’s a question that often comes up. Is the shadow DOM the same as the virtual DOM? The short answer is that their behavior is different.

The shadow DOM is a tool for implementing web components. Take, for instance, the HTML `input` element `range`:

```html
<input type="range" />
```

This gives us the following result:

![Blue Grey Slider Dom Setting Indicator](/assets/image/blog.logrocket.com/the-virtual-dom-react/8-blue-grey-slider-dom-setting-indicator.png)

If we inspect the element using the browser’s developer tools, we’ll see only a simple `input` element. However, internally, browsers encapsulate and hide other elements and styles that make up the input slider.

Using Chrome DevTools, we can enable the `Show user agent shadow DOM` option from `Settings` to see the shadow DOM:

![Chrome Dev Tools Dark Mode](/assets/image/blog.logrocket.com/the-virtual-dom-react/9-chrome-dev-tools-dark-mode.png)

In the image above, the structured tree of elements from the `#shadow-root` inside the `input` element is called the shadow DOM tree. It provides a way to isolate components, including styles from the actual DOM.

Therefore, we’re sure that a widget or component’s style, like the `input` range above, is preserved no matter where it is rendered. In other words, their behavior or appearance is never affected by other elements’ styles from the real DOM.

---

## Comparison chart: Real DOM vs. virtual DOM vs. shadow DOM

The table below summarizes the differences between the real DOM, the virtual DOM, and the shadow DOM:

|  | Real DOM | Virtual DOM | Shadow DOM |
| ---: | --- | --- | --- |
| **Description** | An interface for web documents; allows scripts to interact with the document | An in-memory replica of the actual DOM | A tool for implementing web components, or an isolated DOM tree within an actual DOM for scoping purposes |
| **Relevance to developers** | Developers manually perform DOM operations to manipulate the DOM | Developers don’t have to worry about state transitions; the virtual DOM abstracts DOM manipulation away from the developer | Developers can create reusable web components without worrying about style conflicts from the hosting document |
| **Who uses them** | Implemented in browsers | Used by libraries and frameworks like React, Vue, etc. | Used by web components |
| **Project complexity** | Suitable for simple, small to medium-scale projects without complex interactivity | Suitable for complex projects with a high level of interactivity | Suitable for simple to medium-scale projects with less complex interactivity |
| **CPU and memory usage** | When compared to virtual DOM updates, real DOM uses less CPU and memory | When compared to real DOM updates, virtual DOM uses more CPU and memory | When compared to virtual DOM updates, shadow DOM uses less CPU and memory |
| **Encapsulation** | Does not support encapsulation since components can be modified outside of its scope | Supports encapsulation as components cannot be modified outside of its scope | Supports encapsulation as components cannot be modified outside of its scope |

---

## Conclusion

React uses the virtual DOM as a strategy to compute minimal DOM operations when re-rendering the UI. It is not in rivalry with or faster than the real DOM.

The virtual DOM provides a mechanism that abstracts manual DOM manipulations away from the developer, helping us to write more predictable code. It does so by comparing two render trees to determine exactly what has changed, only updating what is necessary on the actual DOM.

Like React, [**Vue also employs this strategy**](/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js.md). However, [**Svelte proposes another approach**](/blog.logrocket.com/how-to-build-simple-svelte-js-app.md) to ensure that an application is optimized, compiling all components into independent, tiny JavaScript modules, making the script very light and fast to run.

I hope you enjoyed reading this article. Be sure to share your thoughts in the comment section if you have questions or contributions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is the virtual DOM in React?",
  "desc": "Learn the characteristics of the virtual document object model (DOM), explore its benefits in React, and review a practical example.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/the-virtual-dom-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
