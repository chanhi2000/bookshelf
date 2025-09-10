---
lang: en-US
title: "What's the Difference Between the useMemo and useCallback Hooks?"
description: "Article(s) > What's the Difference Between the useMemo and useCallback Hooks?"
icon: fa-brands fa-react
category: 
  - Node.js
  - React.js
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What's the Difference Between the useMemo and useCallback Hooks?"
    - property: og:description
      content: "What's the Difference Between the useMemo and useCallback Hooks?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/difference-between-usememo-and-usecallback-hooks.html
prev: /programming/js-react/articles/README.md
date: 2024-07-16
isOriginal: false
author:
  - name: Kunal Nalawade
    url : https://freecodecamp.org/news/author/KunalN25/
cover: https://freecodecamp.org/news/content/images/2024/07/photo-1619410283995-43d9134e7656.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What's the Difference Between the useMemo and useCallback Hooks?"
  desc="React provides various hooks that make it easier to manage application state and other React features in functional components. Hooks provide class component features to functional components, and they don't need a lot of code compared to class compo..."
  url="https://freecodecamp.org/news/difference-between-usememo-and-usecallback-hooks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/photo-1619410283995-43d9134e7656.jpeg"/>

React provides various hooks that make it easier to manage application state and other React features in functional components. Hooks provide class component features to functional components, and they don't need a lot of code compared to class components.

Hooks also make your life easier by providing some convenient features. Among these hooks, we have `useMemo` and `useCallback` that help improve your website's performance.

In today's tutorial, we are going to discuss both the `useMemo` and `useCallback` hooks. You'll learn the difference between them and when to use each hook.

---

## The `useMemo` Hook

The `useMemo` hook *memoizes* the return value of an expensive calculation between renders. Memoizing means storing the value as a cached value so that the value need not be calculated again (unless it's required).

`useMemo` is a hook used for optimising the performance of your renders. Normally, when you declare a variable inside a component, it gets re-created on every render. If it stores the return value of a function, then the function gets called every time your component renders.

Normally, this wouldn't be a problem. But, what if the function is expensive? What if it takes a longer time to execute? Take the following example:

```jsx
function calculate() {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result;
}

function App1() {
  const [count, setCount] = useState(0);

  const value = calculate();

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

When you click on 'Increment Count', it takes a few seconds to update the count state. This is because the `calculate` function runs every time a component re-renders after state change.

Now, imagine if there were multiple state variables in the component, each serving its own purpose. Each state update would cause a re-render and execute this expensive function.

These state variables could be completely unrelated to the expensive calculation performed, which would cause unnecessary delays. This would affect the performance of your website and could lead to a terrible user experience.

`useMemo` can help you tackle this issue. Let's first understand its syntax:

```jsx
const value = useMemo(expensiveFunction, [...dependencyArray])
```

The `useMemo` hook should be declared at the top level of your component. It takes the following arguments:

- `expensiveFunction` contains the expensive calculation you want to perform. If you have declared the function outside, pass the function reference only, without the brackets. You can also pass arrow functions directly.
- `dependencyArray` contains list of dependencies for the hook. The expensive function will be called only when one of these dependencies is updated. You can pass state variables or props that are dependent on this calculation. Any other state updates will not trigger the function.

On the first render, `useMemo` returns the result of `expensiveFunction` and caches the result. During the subsequent renders, it will return the cached value if no dependencies have changed. If they change, then it will call the function again.

Let's use this in our case:

```jsx
const [dependentCount, setDependentCount] = useState(10);

const value = useMemo(calculate, [dependentCount]);

return (
  <div className="App">

    // ...

    <button onClick={() => setDependentCount(dependentCount + 1)}>
      Increment Dependent Count
    </button>
    <p>Dependent Count: {dependentCount}</p>
  </div>
);
```

We have created another state `dependentCount` that we assume is dependent on the expensive calculation. When this state updates and renders the component, the `calculate` function will run.

But if any other state changes, then `useMemo` will return the cached value instead of running the function again.

Let's test this by adding a `console.log` inside the function:

![Output with `useMemo`](https://freecodecamp.org/news/content/images/2024/07/image-28.png)

Now, when you click "Increment Count", the rendering is faster, since the `calculate` function is not getting called on every render. This is the same during every other state update not listed in the useMemo dependency array.

But when you click on "Increment dependent Count", it takes time to render the updated value. This is because `dependentCount` is a dependency of `useMemo` and changing it calls the expensive function, so the component takes time to re-render.

In this way, with `useMemo`, you can control the execution of an expensive function by calling it only for state updates that actually need the value returned. This can drastically improve your app's performance.

::: tip When to use `useMemo`

- When you have a state dependent on an expensive calculation, but you don't want to run the calculation on every render.
- When you declare an array or object inside a component, its reference changes on every render, even though the value remains the same. Wrapping the values inside `useMemo` maintains referential equality and prevents unnecessary re-renders. This is essential when there's a `useEffect` dependent on the array or object.
- When you are rendering lists using `Array.map` that do not need to change unless a certain state value changes.

:::

---

## The `useCallback` Hook

Similar to `useMemo`, you can also use this hook to optimise performance. The `useCallback` hook memoizes a callback function and returns it.

Note that the `useCallback` hook memoizes the function itself, not its return value. `useMemo` caches the functions return value so that the function need not execute again. `useCallback` caches the function definition or the function reference.

A function declared inside a component gets re-created on every component render, similar to a variable. The difference is, it gets rendered with a different reference every time. So, a `useEffect` dependent on this function will execute again on each render. A similar thing happens with child components.

Let's take an example:

```jsx :collapsed-lines
const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setValue("Kunal");
  };
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Count: {count}</p>
      <p>Value: {value}</p>
      <SlowComponent handleClick={handleClick} />
    </div>
  );
};

const SlowComponent = React.memo(({ handleClick, value }) => {

  // Intentially making the component slow
  for (let i = 0; i < 1000000000; i++) {}

  return (
    <div>
      <h1>Slow Component</h1>
      <button onClick={handleClick}>Click Me</button>

    </div>
  );
});
```

Here, we have a `SlowComponent` as the child of the `App` component. When a parent component renders, all of its child components render, regardless of whether anything has changed inside them.

To avoid unnecessary renders of the child components, we generally use the `React.memo` function. This basically caches the component and only re-renders it if its props have changed.

Now, when you click on 'Increment Count', it still takes a long time to render, because `SlowComponent` re-renders on state change. But why is that? We're not changing any of its props.

On the surface, we may not appear to change the value of `handleClick` prop. But, since functions are re-created with a different reference, on every render of the App component, its child (that is `SlowComponent`) renders.

To maintain referential equality, we wrap this function's definition inside a `useCallback`.

Let's understand its syntax:

```jsx
const cachedFn = useCallback(fn, [...dependencyArray])
```

`useCallback` takes the following arguments:

- `fn` is the function you want to cache. It is the function definition that you want to create, and can take any arguments and return any value.
- `dependencyArray` is a list of dependencies, changes to which trigger re-creation of the function. You can pass state values or props that are dependent on this function.

On the first render, React creates the function (does not call it) and caches it. On the subsequent renders, the cached function is returned to you. Remember, this hook returns and caches the *function* and not its return value.

Let's use this hook in our example:

```jsx
import { useCallback } from "react";

const App = () => {

  // ...

  const handleClick = useCallback(() => {
    setValue("Kunal");
  }, [value, setValue]);

  // ...
};
```

Here, we have wrapped the function inside a `useCallback` and passed two dependencies that are involved with this function.

Now, when you click on 'Increment Count', the rendering is much faster. This is because the `handleClick` reference is cached between renders and hence, `SlowComponent` does not re-render.

But when you click on the button inside `SlowComponent` it will re-render. This is because when the `value` state changes, the `handleClick` method is created again and so the props of the slow component have changed.

![Value takes time to render](https://freecodecamp.org/news/content/images/2024/07/image-33.png)

You can add many more states to the `App` component and update them without inhibiting performance as long as you don't update `value`'s state.

### When to use `useCallback`

- When you have event handlers defined for an element inside your component, wrap them inside a `useCallback` to avoid unnecessary re-creations of event handlers.
- When you call a function inside a `useEffect`, you usually pass the function as a dependency. To avoid using `useEffect` unnecessarily on every render, wrap the function definition inside a `useCallback`.
- If you are writing a custom hook, and it returns a function, it is recommended to wrap it inside a `useCallback`. So, there's no need for the users to worry about optimizing the hook - rather, they can focus on their own code.

---

## Differences Between `useMemo` and `useCallback`

Let's summarize the differences between the two hooks:

- `useMemo` caches the return value of a function. `useCallback` caches the function definition itself.
- `useMemo` is used when you have an expensive calculation you want to avoid on every render.
- `useCallback` is used to cache a function to avoid re-creating it on every re-render.
- `useMemo` makes sure that an expensive function should only be called for state values dependent on it.
- `useCallback` creates stable functions that maintain the same reference between renders. This avoids unnecessary rendering of child components.

And here are a few more things to remember. Use these hooks only if you want to memoize expensive calculations or prevent unnecessary re-renders. Do not use `useMemo` and `useCallback` everywhere.

For regular functions, these hooks don't make much difference. Overusing them will make your code unreadable. Instead, you can figure out other ways to improve app performance.

---

## Conclusion

`useMemo` and `useCallback` are useful hooks in React that can help you optimize performance of your web app. It is important to understand the difference between the two and their usages.

In this article, we have discussed how both hooks work. `useMemo` caches the result of an expensive calculation, while `useCallback` caches the function reference. We also listed down scenarios when you should use each hook. Together, both these hooks can make your website faster.

I hope this article helps clear up any confusion. If you have further questions or comments regarding the post, reach out to me on Twitter. I would love to hear suggestions. Till next time, goodbye!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What's the Difference Between the useMemo and useCallback Hooks?",
  "desc": "React provides various hooks that make it easier to manage application state and other React features in functional components. Hooks provide class component features to functional components, and they don't need a lot of code compared to class compo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/difference-between-usememo-and-usecallback-hooks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
