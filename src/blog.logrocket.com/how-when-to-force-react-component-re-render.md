---
lang: en-US
title: "How and when to force a React component to re-render"
description: "Article(s) > How and when to force a React component to re-render"
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
      content: "Article(s) > How and when to force a React component to re-render"
    - property: og:description
      content: "How and when to force a React component to re-render"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-when-to-force-react-component-re-render.html
prev: /programming/js-react/articles/README.md
date: 2024-09-25
isOriginal: false
author:
  - name: Juan Cruz Martinez
    url : https://blog.logrocket.com/author/juancruzmartinez/
cover: /assets/image/blog.logrocket.com/how-when-to-force-react-component-re-render/banner.avif
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
  name="How and when to force a React component to re-render"
  desc="Learn how to force a React component to re-render, how to determine when a render is complete, and the impact of React 18 on component rendering."
  url="https://blog.logrocket.com/how-when-to-force-react-component-re-render"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-when-to-force-react-component-re-render/banner.avif"/>

::: note Editor’s note

This article was last updated by [<FontIcon icon="fas fa-globe"/>Emmanuel Odioko](https://blog.logrocket.com/author/emmanuelodioko/) on 25 September 2024 to include a discussion on the impact of React 18’s concurrent rendering and automatic batching on re-renders. It also covers how to determine when a render is complete using tools such as React’s `<Profiler>` and `performance.now()` APIs.

:::

---

## What is force re-rendering?

![How And When To Force A React Component To Re-Render](/assets/image/blog.logrocket.com/how-when-to-force-react-component-re-render/banner.avif)

Force re-rendering in React is like pressing the refresh button on a webpage, even when the page seems just fine. In React, it means telling a component to update and redraw itself, even if nothing has really changed in the data (stat/props) it uses.

Although React is usually good at knowing when it is time to update a component, there are moments when you want to take the reins and tell it to refresh a certain part of the codebase. In this article, we will explore this in more detail.

---

## Understanding React’s rendering behavior

Let’s take a closer look at how React’s rendering process works by default. To understand when and why you might need to nudge React into re-rendering, you need to get familiar with its underlying architecture.

At the heart of [<FontIcon icon="fa-brands fa-react"/>React’s rendering](https://react.dev/learn/render-and-commit) magic lies the Virtual DOM. Imagine it as a clone of the actual DOM, the structure of your webpage. React uses this Virtual DOM to figure out what needs to be updated when your data changes. It’s like having a duplicate house to practice your painting skills on before touching the real thing.

So, how does React know when to refresh the Virtual DOM and make necessary changes to the actual webpage? This happens in three stages:

1. **Render phase**: In this initial stage, React figures out what part of your component’s UI should change due to data updates. It compares the new Virtual DOM with the previous one, finding the differences
2. **Reconciliation:** Once the differences are identified, React calculates the most efficient way to update the actual DOM. This reconciliation process minimizes unnecessary work, making sure that only the elements affected by the data changes are updated
3. **Commit phase**: In this final stage, React takes the calculated changes from the previous stage and applies them to the real DOM. It’s like the moment when your paintbrush touches the house, and the new paint is applied to the walls

Understanding these stages is crucial because they provide insights into React’s default rendering behavior. And they also help us know when and how to intervene with force re-rendering when necessary. In the following sections, we’ll dive into when you might want to guide React through these stages and ensure your components stay in sync with your application’s state.

---

## Why aren’t React components re-rendering?

Generally, forcing a React component to re-render isn’t the best practice, even when React fails to update the components automatically. So, before considering forcing a re-render, we should analyze our code, as React depends on us being good hosts.

### Incorrectly updated state in React

Let’s build a simple component to demonstrate one common reason components aren’t rendering. We will build a simple app that will show a username, `Juan`, and, after pressing a button, the name will change to `Peter`.

[<FontIcon icon="iconfont icon-codesandbox"/>Here is a demonstration of the app with the complete code](https://codesandbox.io/s/react-wrong-state-change-byx8f). If you click the **Change user name** button, you will notice that nothing happens, even though we changed our state on the button:

::: sandpack#react bajcmartinez / Drafts / react-wrong-state-chnge [rtl theme=dark]

@file /App.js

```js
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState({
    name: "Juan"
  });

  function changeUserName() {
    user.name = "Peter";
    setUser(user);
  }

  return (
    <div className="App">
      <MyComponent user={user} />

      <button onClick={changeUserName}>Change user name</button>
    </div>
  );
}

function MyComponent(props) {
  return (
    <div>
      <h1>My Component</h1>
      <p>User name: {props.user.name}</p>
    </div>
  );
}
```

:::

```js
function changeUserName() {
  user.name = "Peter";
  setUser(user);
}
```

The component did not change, so there was no re-rendering trigger. Why?

React evaluates state changes by checking its [<FontIcon icon="fa-brands fa-react"/>shallow equality](https://reactjs.org/docs/shallow-compare.html) (or reference equality), which checks to see if both the preview and new value for `state` reference the same object. In our example, we updated one of the properties of the `user` object, but we technically made `setUser` the same object reference, and thus, React didn’t perceive any change in its state.

State, as described in the [<FontIcon icon="fa-brands fa-react"/>React documentation](https://reactjs.org/docs/react-component.html#state), should be treated as immutable. So, how do we fix it? We could create a new object with the correct values as follows:

```js
function changeUserName() {
  setUser({
    ...user,
    name: "Peter",
  });
}
```

Note that we are using the [<FontIcon icon="fas fa-globe"/>spread operator](https://livecodestream.dev/post/how-to-use-the-spread-operator-in-javascript/) in JavaScript to preserve the properties of the original object while updating its `name` property under a new object. [<FontIcon icon="iconfont icon-codesandbox"/>The final result can be observed here](https://codesandbox.io/s/react-correct-state-change-forked-f1wc7).

::: sandpack#react bajcmartinez / Drafts / react-correct-state-change (forked) [rtl theme=dark]

@file /App.js

```js
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState({
    name: "Juan"
  });

  function changeUserName() {
    setUser({
      ...user,
      name: "Peter"
    });
  }

  return (
    <div className="App">
      <MyComponent user={user} />

      <button onClick={changeUserName}>Change user name</button>
    </div>
  );
}

function MyComponent(props) {
  return (
    <div>
      <h1>My Component</h1>
      <p>User name: {props.user.name}</p>
    </div>
  );
}
```

:::

### Incorrectly updated props without state change

While it may seem impossible, incorrectly updating props without a state change can happen, and it usually leads to bugs. Let’s look at an example.

In this [<FontIcon icon="iconfont icon-codesandbox"/>demo](https://codesandbox.io/s/react-props-not-state-ml872), I built a clock that has a major problem: the time doesn’t change after I first load the screen. Not a very useful clock, right?

::: sandpack#react bajcmartinez / Drafts / react-props-not-state [rtl theme=dark]

@file /App.js

```js
import "./styles.css";

export default function App() {
  let myTime;

  function setMyTime() {
    myTime = new Date();
    setTimeout(() => {
      setMyTime();
    }, 1000);
  }

  setMyTime();

  return (
    <div className="App">
      <Clock myTime={myTime} />
    </div>
  );
}

function Clock(props) {
  return <p>Current time: {props.myTime.toString()}</p>;
}
```

:::

Let’s take a look at the code responsible for calculating the current time:

```jsx
let myTime;

function setMyTime() {
  myTime = new Date();
  setTimeout(() => {
    setMyTime();
  }, 1000);
}

setMyTime();
```

:::

This code looks ugly and is generally not a great way to code for a React component, but it works. Every second, the runtime will call the `setMyTime` function and will update the `myTime` variable, which is then passed to our `Clock` component for rendering:

```jsx
<Clock myTime={myTime} />
```

This demo doesn’t work because props are a reflection of state, so a standalone change in props won’t trigger a re-render. To fix it, we need a total [<FontIcon icon="iconfont icon-codesandbox"/>rewrite](https://codesandbox.io/s/react-props-as-state-forked-ii6cb).

::: sandpack#react bajcmartinez / Drafts / react-props-as-state (forked) [rtl theme=dark]

@file /App.js

```js
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [myTime, setMyTime] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  });

  function tick() {
    setMyTime(new Date());
  }

  return (
    <div className="App">
      <Clock myTime={myTime} />
    </div>
  );
}

function Clock(props) {
  return <p>Current time: {props.myTime.toString()}</p>;
}
```

:::

Notice that we introduced state to manage `myTime` and `useEffect` to start and clear the timers to avoid bugs when the component re-renders. And it works:

```js
const [myTime, setMyTime] = useState(new Date());

useEffect(() => {
  var timerID = setInterval(() => tick(), 1000);

  return () => clearInterval(timerID);
});

function tick() {
  setMyTime(new Date());
}
```

---

## Methods to re-render React components

React provides us with multiple ways to tell when to re-render the component. There are three ways we will discuss below:

1. **`setState` method**: This is the go-to method for most re-rendering scenarios. When you call [<FontIcon icon="fa-brands fa-react"/>`setState`](https://react.dev/reference/react/Component#setstate), React takes notice and starts the re-rendering process for the component. It’s like telling your component, “Hey, something’s changed, time to update!” You typically use this method when your component’s state or props change
2. **`forceUpdate`method**: Sometimes, you might have a good reason to bypass the usual state or prop changes and refresh your component entirely. The `forceUpdate` function does just that. It’s like giving your component a direct order to repaint itself, regardless of what’s happening in the background. Use this one sparingly, as it can disrupt React’s optimization
3. **`key` prop manipulation**: This is a more advanced technique. React relies on [<FontIcon icon="fa-brands fa-react"/>keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys) to determine which elements in a list have changed. By [<FontIcon icon="fa-brands fa-react"/>manipulating the key prop](https://react.dev/reference/react/useState#resetting-state-with-a-key), you can effectively force re-renders in components that rely on lists. It’s a bit like changing the name on the mailbox to get your mail forwarded to a different address. It’s useful in specific scenarios, but use it with care

These methods provide you with the means to control when and how your components re-render. But remember that with great power comes great responsibility — overusing these methods can lead to issues, which we will discuss later in this article.

---

## Forcing a React component to re-render

It’s typically frowned upon to force a component to re-render, and the failure of automatic re-rendering in React is often due to an underlying bug in our codebase. But, if you have a legitimate need to force a React component to re-render, there are a few ways to do it.

### Forcing an update on a React class component

If you are using class components in your code, you’re in luck. React provides an [<FontIcon icon="fa-brands fa-react"/>official API to force a re-render](https://reactjs.org/docs/react-component.html#forceupdate), and it’s straightforward to implement:

```js
someMethod() {
  // Force a render without state change...
  this.forceUpdate();
}
```

In any user or system event, you can call the method `this.forceUpdate()`, which will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`, and thus, forcing React to re-evaluate the Virtual DOM and DOM state.

There are some caveats to this method:

- React will trigger the normal lifecycle methods for child components, including `shouldComponentUpdate()`, so we can only force the current component to be re-rendered
- Virtual DOM will still validate its state with DOM, so React will only update the DOM if the markup changes

### Forcing an update on a function component

There’s no official API to re-render a function component, nor is there a [**React Hook**](https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/) to do so. However, there are some clever tricks to signal to React that a component should be updated.
<!-- END: /blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems.md -->

### Replace state objects with a new instance of themselves

Let’s say we want to force a refresh on our change user example above. We could do something like this:

```js
someMethod() {
  // Force a render with a simulated state change
  setUser({ ...user });
}
```

Because `user` is an object, we could copy it to a new object and set it as the new state. The same could apply to any other object or array.

### Have an empty state variable trigger updates

This method is interesting, as it creates a new object in the state. We only care about its `update` function as follows:

```js
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
```

Here, we use `useCallback` to memoize our `forceUpdate` function, thus keeping it constant throughout the component lifecycle and making it safe to be passed to child components as `props`.

Here is an example of how to use it:

```jsx title="App.js"
import React from "react";

export default function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  console.log("rendering...");

  return (
    <div className="App">
      <h1>Time to force some updates</h1>
      <button onClick={forceUpdate}>Force re-render</button>
    </div>
  );
}
```

Now, each time we click on the **Force re-render** button, the component will re-render. You can [<FontIcon icon="iconfont icon-codesandbox"/>access the live demo here](https://codesandbox.io/s/forcing-functional-component-re-render-5uj12).

::: sandpack#react bajcmartinez / Drafts / forcing-functional-component-re-render [rtl theme=dark]

@file /App.js

```js
import React from "react";

export default function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  console.log("rendering...");

  return (
    <div className="App">
      <h1>Time to force some updates</h1>
      <button onClick={forceUpdate}>Force re-render</button>
    </div>
  );
}
```

:::

---

## Determining when a render is completed in React

To measure the rendering performance of components, we can use two APIs: `<Profiler>` and `performance.now()`.

If we wrap a component with the `<Profiler>` component, we can track the rendering duration and log the time it takes to complete. The `onRender()` callback of the Profiler provides details on each render, including the time it took. Let’s take a closer look at how it works:

```jsx :collapsed-lines title="Counter.js"
//In the code below I have been able to explain the properties in detail

"use client";
import React, { Profiler, useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  const onRenderCallback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log(`Render ID: ${id}, Duration: ${actualDuration}`);
  };
  return (
    <Profiler id="Counter" onRender={onRenderCallback}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold text-blue-600 mb-4">Count: {count}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>
    </Profiler>
  );
}

export default Counter;
```

Here is what we get in our console:

![](https://paper-attachments.dropboxusercontent.com/s_F0FB2803B848D13712B2405C7FAE99AE30631F59E9268BE6ECF922CFC09B4E96_1727996665922_Screenshot+280.png)

As we can see above, the first render took approximately 1.9 milliseconds, while subsequent renders were faster. This is normal behavior, as the initial render typically involves more work. For more precise timing measurements, consider using the `performance.now()` API, a high-resolution timestamp method that measures the start and end times of specific code executions.

Let’s see how it works:

```jsx :collapsed-lines title="DetailedCounter.js"
"use client";
import React, { useState, useEffect, useRef } from "react";
function DetailedCounter() {
  const [count, setCount] = useState(0);
  const renderStartRef = useRef(0); // Store start time
  // Capture the render start time
  useEffect(() => {
    renderStartRef.current = performance.now();
    console.log("Render start time:", renderStartRef.current.toFixed(4), "ms");
  });
  // After rendering, capture the end time and calculate render duration
  useEffect(() => {
    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStartRef.current;
    console.log("Render end time:", renderEnd.toFixed(4), "ms");
    console.log("Render duration:", renderDuration.toFixed(4), "ms");
  }, [count]);
  const incrementCounter = () => {
    setCount(count + 1);
  };
  return (
    <div className="max-w-md mt-[60%] mx-auto p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Detailed Counter
      </h1>
      <p className="text-xl mb-4">Count: {count}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={incrementCounter}
      >
        Increment
      </button>
    </div>
  );
}

export default DetailedCounter;
```

Here are the results:

![](https://paper-attachments.dropboxusercontent.com/s_F0FB2803B848D13712B2405C7FAE99AE30631F59E9268BE6ECF922CFC09B4E96_1727997779602_Screenshot+281.png)

By combining React’s `<Profiler>` and `performance.now()` APIs, you can gain deeper insights into how long renders take and optimize performance accordingly.

---

## The impact of React 18’s concurrent rendering on re-renders

When React 18 was released, it introduced several optimization features, including concurrent rendering. This allows React to break down heavy renders into smaller bits, thereby improving the user experience.

To achieve this, React does two things: first, it prioritizes more urgent updates; second, it attends to less critical updates afterward. The [<FontIcon icon="fa-brands fa-react"/>`UseTransition()` Hook](https://react.dev/reference/react/useTransition) helps manage these “non-urgent” updates. When state changes are wrapped in `startTransition()`, React will delay lower-priority updates until the critical ones are complete.

This feature can lead to more frequent re-renders — one for starting the transition and the other for completing it — the overall performance will remain smoother because less critical updates are handled in the background.

Let’s explore an example to understand how React should handle top-priority and lower-priority tasks using a to-do app. For the sake of users, we will prioritize some state updates (such as adding a new to-do) while postponing less critical updates (like filtering the to-do list):

```jsx :collapsed-lines title="Todo.js"
"use client";
import React, { useState, useTransition } from "react";
function TodoApp() {
  const [todos, setTodos] = useState(["Learn React", "Learn TypeScript"]);
  const [filter, setFilter] = useState("");
  const [deferredFilter, setDeferredFilter] = useState("");
  const [isPending, startTransition] = useTransition();
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    startTransition(() => {
      setDeferredFilter(e.target.value);
    });
  };
  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(deferredFilter.toLowerCase())
  );
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Todo App</h1>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        type="text"
        placeholder="Filter todos..."
        value={filter}
        onChange={handleFilterChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={() => addTodo("New Todo")}
      >
        Add Todo
      </button>
      {isPending && <p className="text-gray-500 mb-2">Updating list...</p>}
      <ul className="list-disc list-inside bg-white p-4 rounded">
        {filteredTodos.length ? (
          filteredTodos.map((todo, idx) => (
            <li key={idx} className="p-1 border-b border-gray-200">
              {todo}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No todos match the filter.</p>
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
```

Here, the `startTransition` method wraps the filtering of to-dos, marking it as a task. React will prioritize updating the input field immediately while postponing the aforementioned filtering. This helps maintain a responsive UI even when the to-do list becomes large.

`useTransition()` ensures that when the user tries to filter their to-dos, the input remains responsive, thereby updating immediately. Without `useTransition()`, updating the filter and having to recalculate the filtered list could slow down the interface a bit, especially when we may have a large list of to-dos.

---

## The impact of React 18’s automatic batching on renders

Another important feature introduced in React 18 is automatic batching, which allows React to group multiple state updates into a single render. In React 17 and earlier versions, React would trigger separate re-renders for each state update in asynchronous code.

Think of automatic batching like a school teacher collecting students’ questions during class. Instead of answering these questions the moment they’re asked, the teacher waits until the end of the class to address them all at once. Similarly, React waits until all state changes are complete before re-rendering them, improving UI performance by reducing the number of renders.

---

## When not to force a React component to re-render

While we’ve learned that force re-rendering can be a handy tool, there are situations where you should think twice before hitting that refresh button. There are many unintended consequences to doing this, some of which are listed below:

1. **Overdoing it**: Overusing this technique can overload React’s reconciliation process, causing unnecessary work. It’s wasteful and can slow things down. Just like you wouldn’t repaint your house every day, you shouldn’t force re-render your components constantly
2. **Side effects**: Force re-rendering can lead to unintended consequences. If you force a component to re-render when it shouldn’t, you might end up with issues like data inconsistencies or UI glitches
3. **Breakdown of optimizations**: React is clever about optimizing the rendering process. It avoids unnecessary work by updating only what’s needed. When you force a re-render in React, you disrupt this optimization
4. **Debugging nightmares**: Overusing force re-rendering can also make debugging a nightmare. When you’re trying to figure out why something isn’t working as expected, the last thing you want is the extra complexity of forced re-renders

---

## Conclusion

React’s re-rendering process is essential for keeping components in sync with state and props. However, forcing a re-render in React should be done sparingly, and only when necessary, to avoid performance issues.

This article explored methods like `setState()`, `forceUpdate()`, and key manipulation to force React components to re-render. While React 18 introduced features like concurrent rendering and automatic batching, which optimize rendering, developers can still encounter situations where manual re-rendering is necessary. By understanding when to force re-rendering and using tools like React’s `<Profiler>` or `peformance.now()` APIs, you can maintain an efficient and responsive UI in your React apps.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How and when to force a React component to re-render",
  "desc": "Learn how to force a React component to re-render, how to determine when a render is complete, and the impact of React 18 on component rendering.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-when-to-force-react-component-re-render.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
