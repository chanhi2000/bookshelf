---
lang: en-US
title: "Understanding when and how to prioritize React UI updates"
description: "Article(s) > Understanding when and how to prioritize React UI updates"
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
      content: "Article(s) > Understanding when and how to prioritize React UI updates"
    - property: og:description
      content: "Understanding when and how to prioritize React UI updates"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-prioritize-react-ui-updates.html
prev: /programming/js-react/articles/README.md
date: 2023-04-17
isOriginal: false
author:
  - name: Abhinav Anshul
    url : https://blog.logrocket.com/author/abhinavanshul/
cover: /assets/image/blog.logrocket.com/understanding-prioritize-react-ui-updates/banner.png
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
  name="Understanding when and how to prioritize React UI updates"
  desc="Use the useTransition() and useDeferredValue() Hooks in your next React project to help you prioritize the UI updates on the client side."
  url="https://blog.logrocket.com/understanding-prioritize-react-ui-updates"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/understanding-prioritize-react-ui-updates/banner.png"/>

React v18 provided two new Hooks — `useTransition()` and `useDeferredValue()` — to help you prioritize the UI updates on the client side. You can now explicitly give priority to a certain user interaction that is sluggish and slow over other UI updates.

![Understanding When And How To Prioritize React Ui Updates](/assets/image/blog.logrocket.com/understanding-prioritize-react-ui-updates/banner.png)

This behavior will ensure that any heavy UI updates are smooth, while less significant UI updates can be done in parallel or once the higher-priority updates finish. In this article, we will explore how to use the `useTransition()` and `useDeferredValue()` Hooks in your next project.

---

## Why prioritize UI updates at all?

Prioritizing UI updates is one way to [**optimize performance in a React application**](/blog.logrocket.com/optimizing-performance-react-application.md). While working with complex state updates, you will likely encounter situations where a certain UI update is slow due to the intensive computations performed on the client side.

For example, imagine that you have a list of 10,000 products rendered on the screen and you want to implement a search functionality based on the product name.

Ideally, you should never render 10,000 items at once, but either use [**some kind of pagination**](/blog.logrocket.com/react-pagination-scratch-hooks.md) or [lazy loading technique](https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/). But for sake of this example, suppose all the items are rendered on the screen at once.
<!-- TODO: /blog.logrocket.com/lazy-loading-components-in-react-16-6.md -->

Now, when you implement a search functionality and bind it to the `onChange` event, the text you enter in the input box itself would be quite laggy. This is because each keystroke is responsible for updating and rendering a large number of products in the list.

This is a perfect use case for prioritizing keystroke UI updates over the rendering of the lists below. You want to ensure that there is no delay in typing in the textbox, but a delay of a few microseconds in rendering the list is tolerable in terms of the user’s experience.

---

## How does the `useTransition()` Hook help?

React v18 solves the problem in our example above by [**providing a unique Hook called `useTransition`**](/blog.logrocket.com/getting-started-react-18-starttransition.md)`. You can simply use this Hook to wrap the event responsible for the textbox UI keystroke updates.

The `useTransition` Hook returns an array with two variables:

```jsx
const [ isPending, startTransition ] = useTransition()
```

The first variable is a boolean that tells you if a non-blocking UI update is pending.

The second variable is a function that can wrap your state update for “transition” — meaning that particular transition is of higher priority and will be executed as a non-blocking UI state update.

In the example described above, you have an input box and an `onChange` event handler attached to it:

```jsx
function App(){
  const [search, setSearch] = useState("")

  function handleFilterChange(e) {
    setSearch(e.target.value);
  }

  return (
   <input type="search" onChange={handleFilterChange} /> 
  )
}
```

It should look something like the below:

![List Of Numbered Items Displayed Under Empty Search Bar](https://blog.logrocket.com/wp-content/uploads/2023/04/List-numbered-items-search-bar.png)

You can improve the sluggish input by using the `useTransition` Hook like so:

```jsx
function handleFilterChange(e) {
  startTransition(() => {
    setSearch(e.target.value);
  });
}
```

Now, the `setSearch(e.target.value)` UI update will be treated as a transition.

You can always use the first variable that the `useTransition` Hook provides to check if the transition is pending. The `isPending` variable can be later used to show a pending transition in your main `App` component.

Here is the complete code implementing the `useTransition` Hook to improve the user experience while typing in the input box:

```jsx :collapsed-lines title="App.jsx"
import { useState, useTransition } from "react";
import List from "./List";

/** 
 * create a dummy list of 10000 items, simulating a large number of products.
 */
function dummyList() {
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(`Item ${i + 1}`);
  }
  return items;
}

const list = dummyList();

function filterItems(search) {
  if (!search) {
    return list;
  }
  return list.filter((product) => product.includes(filterTerm));
}

/*
create a `List` functional component that would later be used to map over a list of items under the `App` component.
*/
function List({ items }) {
  return (
    <div>
      {items.map((item, index) => (
      <Fragment key={index}>
    <div>{item}</div>
      </Fragment>
      ))}
    </div>
  );
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const searchedItems = filterItems(search);

  function handleFilterChange(e) {
    startTransition(() => {
     // wrapping setSearch in 
        setSearch(e.target.value);
    });
    // setSearch(event.target.value); -> This is now redundant
  }
  return (
    <div>
      <input type="search" onChange={handleFilterChange} />
      // `isPending` boolean can be used to track your transition state
       {isPending ? <div>Loading...</div> : null}
      // render a list of items and pass a prop with the filtered items
      <List items={searchedItems} />
    </div>
  );
}
```

You can check out the result below:

![User Shown Typing Into Search Bar To Filter Through List Of Numbered Items. Updated Results Render After Slight Delay While Typing In Search Bar Occurs Immediately As The Prioritized Ui Update](https://blog.logrocket.com/wp-content/uploads/2023/04/User-typing-search-bar-filter-results-update-list.gif)

---

## Considerations when using `useTransition()`

One important thing to note here is that the `input` component is [**an uncontrolled component**](/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react.md). This works in this example, since you don’t want the state value to be in sync with the input value; instead, you want `setSearch(e.target.value)` to be handled as the higher priority.

That being said, `useTransition` cannot work with a controlled input component, as both the typed-in value and the filter result would be in sync. This would result in the same initial problem — i.e., the sluggish behavior due to a large number of list items.

React itself considers using the `useTransition` Hook in a controlled component as an anti-pattern. The code below is an anti-pattern and should not be used at all:

```jsx title="App.jsx"
function App() {
  const [search, setSearch] = useState("")
  
  function handleFilterChange(e) {
    startTransition(() => {
      setSearch(e.target.value);
    });
  }
  
  return (
    <div>
      {// ❌Never do this with controlled component}
      <input type="search" value={search} onChange={handleFilterChange} />
    </div>
  )
}
```

Therefore, while the `useTransition` Hook can be great for handling state updates, it should be a last resort or a trick that you should only use when you have slow UI updates. This is especially true when dealing with older devices with slow CPUs.

Most of the UI updates can be handled with React itself if done correctly. There is also another Hook called `useDeferredValue` that was introduced in React v18, which solves a very similar set of problems and can be used if you do not have control over state calls, as in this example:

```jsx
<List items={searchedItems} />)
```

---

## Deferring state updates with the `useDeferredValue()` Hook

[**The `useDeferredvalue` Hook**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md#usedeferredvalue), as the name suggests, helps you in “deferring” a state update.

In the example above, you can also use this Hook if you do not have control over how the list state is being called, but can only manipulate the `List` component. In that case, you can pass the `items` prop to the `useDeferredValue` Hook and map over it instead of directly on `items`, like so:

```jsx :collapsed-lines
function List({ items }) {

const deferredItems = useDeferredValue(items)

  return (
    <div>
      {deferredItems.map((item, index) => (
      <Fragment key={index}>
    <div>{item}</div>
      </Fragment>
      ))}
    </div>
  );
}
```

This would ensure that the input updates are quick and snappy while the list takes a while to update. You might have seen this behavior if you have used [**debouncing in search functionality**](/blog.logrocket.com/how-and-when-to-debounce-or-throttle-in-react.md). This Hook behaves exactly like that, but by deferring list UI updates on each keystroke.

If in general, you have control over state calls, it is a better idea to use the `useTransition` Hook. Otherwise, you can always delay a UI update from the `List` component itself, somewhat like the debounce method.

You should never mix and match the `useDeferredValue` and `useTransition` Hooks together, as they both are solving the same problem.

However, you might likely want to use `useDeferredValue` along with debouncing or throttling, which can further improve the user experience and save some network calls while the user is interacting with the input box.

---

## Conclusion

The `useTransition` and `useDeferredValue` Hooks can be very useful in solving those slow and laggy UI updates that are caused by either a slow CPU performance or due to external factors like API itself.

Always keep in mind that prioritizing UI updates should be a last resort. You should always first try to design a performant UI with good code practices and React patterns.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding when and how to prioritize React UI updates",
  "desc": "Use the useTransition() and useDeferredValue() Hooks in your next React project to help you prioritize the UI updates on the client side.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-prioritize-react-ui-updates.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
