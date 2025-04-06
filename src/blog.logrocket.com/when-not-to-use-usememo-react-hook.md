---
lang: en-US
title: "When not to use the useMemo React Hook"
description: "Article(s) > When not to use the useMemo React Hook"
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
      content: "Article(s) > When not to use the useMemo React Hook"
    - property: og:description
      content: "When not to use the useMemo React Hook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/when-not-to-use-usememo-react-hook.html
prev: /programming/js-react/articles/README.md
date: 2023-03-10
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/when-not-to-use-usememo-react-hook/banner.png
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
  name="When not to use the useMemo React Hook"
  desc="Learn when not to use the useMemo React Hook, such as when a memoized value is not used frequently or a computation is not expensive."
  url="https://blog.logrocket.com/when-not-to-use-usememo-react-hook"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/when-not-to-use-usememo-react-hook/banner.png"/>

::: note Editor’s note

This article was last updated on 10 March 2023. To read more on React Hooks, check out this [**cheat sheet**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md).

:::

![Understanding When Not To Use The UseMemo React Hook](/assets/image/blog.logrocket.com/when-not-to-use-usememo-react-hook/banner.png)

Despite its usefulness in optimizing React performance, I’ve observed that some developers have a tendency to employ the `useMemo` Hook excessively. To delve deeper into this issue, I decided do some code explorations to determine scenarios where the use of `useMemo` may not be beneficial.

In this article, we’ll explore scenarios in which you might be overusing `useMemo`.

---

## What is the `useMemo` Hook?

The `useMemo` Hook in React is a performance optimization tool that allows you to memoize expensive computations and avoid unnecessary re-renders. When you use `useMemo`, you can calculate the value of a variable or function once and reuse it across multiple renders, rather than recalculating it every time your component re-renders.

This can significantly improve the performance of your application, particularly if you have complex or time-consuming computations that need to be done in your components.

It’s important to note that you should only use `useMemo` when you have expensive computations that need to be memoized. Using it for every value in your component can actually hurt performance, as `useMemo` itself has a small overhead.

Let’s take at some examples and scenarios in which you should reconsider using the `useMemo` Hook in a React app.

---

## When not to use `useMemo`

### Don’t use `useMemo` if your operation is inexpensive

Consider the example component below:

```jsx
/** 
 * @param {number} page 
 * @param {string} type 
 **/
const myComponent({page, type}) { 
  const resolvedValue = useMemo(() => {
     return getResolvedValue(page, type)
  }, [page, type])

  return <ExpensiveComponent resolvedValue={resolvedValue}/> 
}
```

In this example, it’s easy to justify the author’s use of `useMemo`. What goes through their mind is they don’t want the `ExpensiveComponent` to be re-rendered when the reference to `resolvedValue` changes.

While that’s a valid concern, there are two questions to ask to justify the use of `useMemo` at any given time.

First, is the function passed into `useMemo` an expensive one? In this case, is the `getResolvedValue` computation an expensive one?

Most methods on JavaScript data types are optimized, e.g. `Array.map`, `Object.getOwnPropertyNames()`, etc. If you’re performing an operation that’s not expensive (think Big O notation), then you don’t need to memoize the return value. The cost of using `useMemo` [<FontIcon icon="fas fa-globe"/>may outweigh](https://kentcdodds.com/blog/usememo-and-usecallback) the cost of reevaluating the function.

Second, given the same input values, does the reference to the memoized value change? For example, in the code block above, given the `page` as `2` and `type` as `"GET"`, does the reference to `resolvedValue` change?

The simple answer is to consider the data type of the `resolvedValue` variable. If `resolvedValue` is `primitive` (i.e., `string`, `number`, `boolean`, `null`, `undefined`, or `symbol`), then the reference never changes. By implication, the `ExpensiveComponent` won’t be re-rendered.

Consider the revised code below:

```jsx
/** 
 * @param {number} page 
 * @param {string} type 
 **/
const MyComponent({page, type}) {
  const resolvedValue = getResolvedValue(page, type)
  return <ExpensiveComponent resolvedValue={resolvedValue}/> 
}
```

Following the explanation above, if `resolvedValue` returns a string or other primitive value, and `getResolvedValue` isn’t an expensive operation, then this is perfectly correct and performant code.

As long as `page` and `type` are the same — i.e., no prop changes — `resolvedValue` will hold the same reference except the returned value isn’t a primitive (e.g., an object or array).

Remember the two questions: Is the function being memoized an expensive one, and is the returned value a primitive? With these questions, you can always evaluate your use of `useMemo`.

### Don’t use `useMemo` if you are memoizing a `defaultState` object

Consider the following code block:

```jsx
/** 
 * @param {number} page 
 * @param {string} type 
 **/
const myComponent({page, type}) { 
  const defaultState = useMemo(() => ({
    fetched: someOperationValue(),
    type: type
  }), [type])

  const [state, setState] = useState(defaultState);
  return <ExpensiveComponent /> 
}
```

The code above seems harmless to some, but the `useMemo` call there is unnecessary.

First of all, the intent here is to have a new `defaultState` object when the `type` prop changes, and not have any reference to the `defaultState` object be invalidated on every re-render.

While these are decent concerns, the approach is wrong and violates a fundamental principle: `useState` will not be reinitialized on every re-render, only when the component is remounted.

The argument passed to `useState` is better called `INITIAL_STATE`. It’s only computed (or triggered) once when the component is initially mounted:

```jsx
useState(INITIAL_STATE)
```

Although in the code block above, we are interested in getting a new `defaultState` value when the `type` array dependency for `useMemo` changes, this is a wrong judgment as `useState` ignores the newly computed `defaultState` object.

This is the same for lazily initializing `useState` as shown below:

```jsx
/**
 * @param {number} page 
 * @param {string} type 
 **/
const myComponent({page, type}) {
  // default state initializer 
  const defaultState = () => {
    console.log("default state computed")
    return {
       fetched: someOperationValue(),
       type: type
    }
  }

  const [state, setState] = useState(defaultState);
  return <ExpensiveComponent /> 
}
```

In the example above, the `defaultState` init function will only be invoked once — on mount. The function isn’t invoked on every re-render. As a result, the log “default state computed” will only be seen once, except when the component is remounted.

Here’s the previous code rewritten:

```jsx
/**
 * @param {number} page 
 * @param {string} type 
 **/
const myComponent({page, type}) {
  const defaultState = () => ({
     fetched: someOperationValue(),
     type,
   })

  const [state, setState] = useState(defaultState);

  // if you really need to update state based on prop change, 
  // do so here
  // pseudo code - if(previousProp !== prop){setState(newStateValue)}

  return <ExpensiveComponent /> 
}
```

We will now consider more subtle scenarios where you should avoid `useMemo`.

---

## Using `useMemo` as an escape hatch for the ESLint Hook warnings

![ESLint Hook Warnings](/assets/image/blog.logrocket.com/when-not-to-use-usememo-react-hook/eslint-hook-warnings.png)

While I couldn’t bring myself to read [all the comments (<FontIcon icon="iconfont icon-github"/>`cebook/create-react-app`)](https://github.com/facebook/create-react-app/issues/6880) from people who seek ways to suppress the lint warnings from the official [ESLint plugin for Hooks (<FontIcon icon="fa-brands fa-npm"/>`eslint-plugin-react-hooks`)](https://npmjs.com/package/eslint-plugin-react-hooks), I do understand their plight.

I agree with Dan Abramov [on this one (<FontIcon icon="iconfont icon-github "/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/issues/6880#issuecomment-485912528). Suppressing the `eslint-warnings` from the plugin will likely come back to bite you someday in the future.

Generally, I consider it a bad idea to suppress these warnings in production apps because you increase the likelihood of introducing subtle bugs in the near future.

With that being said, there are still some valid cases for wanting to suppress these lint warnings. Below is an example I’ve run into myself. The code’s been simplified for easier comprehension:

```jsx
function Example ({ impressionTracker, propA, propB, propC }) {
  useEffect(() => {
    // 👇Track initial impression
    impressionTracker(propA, propB, propC)
  }, [])

  return <BeautifulComponent propA={propA} propB={propB} propC={propC} />                 
}
```

This is a rather tricky problem.

In this specific use case, you don’t care whether the props change or not. You’re only interested in invoking the `track` function with whatever the initial props are. That’s how impression tracking works. You only call the impression track function when the component mounts. The difference here is you need to call the function with some initial props.

While you may think simply renaming the `props` to something like `initialProps` solves the problem, that won’t work. This is because `BeautifulComponent` relies on receiving updated prop values, too:

![Initial Props And Updated Props Example](/assets/image/blog.logrocket.com/when-not-to-use-usememo-react-hook/props-lint-warning-example.png)

In this example, you will get the lint warning message:

```plaintext
React Hook useEffect has missing dependencies: 'impressionTracker', 'propA', 'propB', and 'propC'. Either include them or remove the dependency array.
```

That’s a rather brash message, but the linter is simply doing its job. The easy solution is to use a `eslint-disable` comment, but this isn’t always the best solution because you could introduce bugs within the same `useEffect` call in the future:

```jsx
useEffect(() => {
  impressionTracker(propA, propB, propC)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

My suggestion solution is to use the `useRef` Hook to keep a reference to the initial prop values you don’t need updated:

```jsx
function Example({impressionTracker, propA, propB, propC}) {
  // keep reference to the initial values         
  const initialTrackingValues = useRef({
      tracker: impressionTracker, 
      params: {
        propA, 
        propB, 
        propC, 
    }
  })

  // track impression 
  useEffect(() => {
    const { tracker, params } = initialTrackingValues.current;
    tracker(params)
  }, []) // you get NO eslint warnings for tracker or params

  return <BeautifulComponent propA={propA} propB={propB} propC={propC} />   
}
```

In all my tests, the linter only respects `useRef` for such cases. With `useRef`, the linter understands that the referenced values won’t change and so you don’t get any warnings! Not even `useMemo` prevents these warnings.

For example:

```jsx
function Example({impressionTracker, propA, propB, propC}) {

  // useMemo to memoize the value i.e so it doesn't change
  const initialTrackingValues = useMemo({
    tracker: impressionTracker, 
    params: {
       propA, 
       propB, 
       propC, 
    }
  }, []) // 👈 you get a lint warning here

  // track impression 
  useEffect(() => {
    const { tracker, params} = initialTrackingValues
    tracker(params)
  }, [tracker, params]) // 👈 you must put these dependencies here

  return <BeautifulComponent propA={propA} propB={propB} propC={propC} />
}
```

In the faulty solution above, even though I keep track of the initial values by memoizing the initial prop values with `useMemo`, the linter still yells at me. Within the `useEffect` call, the memoized values `tracker` and `params` still have to be entered as array dependencies, too.

I’ve seen people `useMemo` in this way. It’s poor code and should be avoided. Use the `useRef` Hook, as shown in the initial solution.

In conclusion, in most legitimate cases where I really want to silent the lint warnings, I’ve found `useRef` to be a perfect ally. Embrace it.

---

## `useMemo` vs. `useRef`

Most people say to use `useMemo` for expensive calculations and for keeping referential equalities. I agree with the first but disagree with the second. Don’t use the `useMemo` Hook just for referential equalities. There’s only one reason to do this — which I discuss later.

Why is using `useMemo` solely for referential equalities a bad thing? Isn’t this what everyone else preaches?

Consider the following contrived example:

```jsx
function Bla() {
  const baz = useMemo(() => [1, 2, 3], [])
  return <Foo baz={baz} />
}
```

In the component `Bla`, the value `baz` is memoized NOT because the evaluation of the array `[1,2,3]` is expensive, but because the reference to the `baz` variable changes on every re-render.

While this doesn’t seem to be a problem, I don’t believe `useMemo` is the right Hook to use here.

One, look at the array dependency:

```jsx
useMemo(() => [1, 2, 3], [])
```

Here, an empty array is passed to the `useMemo` Hook. By implication, the value `[1,2,3]` is only computed once — when the component mounts.

So, we know two things: the value being memoized is not an expensive calculation, and it is not recomputed after mount.

If you find yourself in such a situation, I ask that you rethink the use of the `useMemo` Hook. You’re memoizing a value that is not an expensive calculation and isn’t recomputed at any point in time. There’s no way this fits the definition of the term “memoization.”

This is a terrible use of the `useMemo` Hook. It is semantically wrong and arguably costs you more in terms of memory allocation and performance.

So, what should you do?

First, what exactly is the author of the code trying to accomplish here? They aren’t trying to memoize a value; rather, they want to keep the reference to a value the same across re-renders.

In these cases, use the `useRef` Hook.

For example, if you don’t like the usage of the current property, then simply deconstruct and rename as shown below:

```jsx
function Bla() {
  const { current: baz } = useRef([1, 2, 3])
  return <Foo baz={baz} />
}
```

Problem solved.

In fact, you can use the `useRef` to keep reference to an expensive function evaluation — so long as the function doesn’t need to be recomputed on props change.

`useRef` is the right Hook for such scenarios, NOT the `useMemo` Hook.

Being able to use the `useRef` Hook to mimic [<FontIcon icon="fa-brands fa-react"/>instance variables](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) is one of the least used super powers Hooks avail us. The `useRef` Hook can do more than just keeping references to DOM nodes. Embrace it.

Please remember, the condition here is if you’re memoizing a value just because you need to keep a consistent reference to it. If you need the value to be recomputed based off of a changing prop or value, then please feel free to use the `useMemo` Hook. In some cases, you can still use `useRef` — but `useMemo` is mostly convenient given the array dependency list.

---

## Conclusion

In this article, we see that while the `useMemo` Hook is useful for performance optimizations in React apps, there are indeed scenarios in which the hook is not needed. Some of these scenarios are:

1. **When the computation is not expensive**: If a computation is relatively cheap to perform, it may not be worth using `useMemo` to memoize it. As a general rule, if a computation takes less than a few milliseconds to complete, it’s probably not worth memoizing
2. **When the computation depends on props that change frequently**. If a computation depends on props that change frequently, it may not be worth memoizing
3. **When the memoized value is not used frequently**. If a memoized value is only used in one or two places in your component, it may not be worth the overhead of using `useMemo` to memoize it. In this scenario, it may be more efficient to simply recalculate the value when it’s needed, rather than maintaining a memoized version of it

In general, it’s important to use `useMemo` judiciously and only when it’s likely to provide a measurable performance benefit. If you’re not sure whether to use useMemo, it’s a good idea to profile your application and measure the performance impact of different optimizations before making a decision.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When not to use the useMemo React Hook",
  "desc": "Learn when not to use the useMemo React Hook, such as when a memoized value is not used frequently or a computation is not expensive.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/when-not-to-use-usememo-react-hook.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
