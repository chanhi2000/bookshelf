---
lang: en-US
title: "Pure components in React: Using PureComponent and React.memo"
description: "Article(s) > Pure components in React: Using PureComponent and React.memo"
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
      content: "Article(s) > Pure components in React: Using PureComponent and React.memo"
    - property: og:description
      content: "Pure components in React: Using PureComponent and React.memo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/pure-component-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-03-03
isOriginal: false
author:
  - name: Glad Chinda
    url : https://blog.logrocket.com/author/gladchinda/
cover: /assets/image/blog.logrocket.com/pure-component-in-react/banner.png
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
  name="Pure components in React: Using PureComponent and React.memo"
  desc="Learn how to memoize components in React using React.PureComponent and the React.memo API, and cover the fundamentals of React components."
  url="https://blog.logrocket.com/pure-component-in-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/pure-component-in-react/banner.png"/>

As React applications grow in complexity, performance optimization becomes a priority to prevent performance decline. React provides two ways to prevent unnecessary re-renders: `PureComponent` for class components, and `React.memo` for functional components.

![pure components in react using Using PureComponent and React.memo](/assets/image/blog.logrocket.com/pure-component-in-react/banner.png)

In this tutorial, we’ll learn how to memoize components in React using [<VPIcon icon="fa-brands fa-react"/>`React.PureComponent`](https://react.dev/reference/react/PureComponent) and the [<VPIcon icon="fa-brands fa-react"/>`React.memo`API](https://react.dev/reference/react/memo). We’ll cover some of the fundamentals of React components before we dive into an example.

You can keep up with the changes and suggestions for the React framework on the [React RFCs repository (<VPIcon icon="iconfont icon-github"/>`reactjs/rfcs`)](https://github.com/reactjs/rfcs).

---

## What are React components?

Like most modern JavaScript frameworks, React is component-based. A component is usually defined as a function of its state and props.

React supports two types of components: class components and functional components. [**A functional component**](/blog.logrocket.com/fundamentals-functional-programming-react.md) is a plain JavaScript function that returns JSX. A class component is a JavaScript class that extends `React.Component` and returns JSX inside a render method.

The following code snippet shows a simple `ReactHeader` component defined as both a class component and a functional component:

```jsx
// CLASS COMPONENT
class ReactHeader extends React.Component {
  render() {
    return (
      <h1>
        React {this.props.version || 17} Documentation
      </h1>
    )
  }
}


// FUNCTIONAL COMPONENT
function ReactHeader(props) {
  return (
    <h1>
      React {props.version || 17} Documentation
    </h1>
  )
}
```

::: note Editor’s note

This post was updated by [<VPIcon icon="fas fa-globe"/>Chizaram Ken](https://blog.logrocket.com/author/emmanuelodioko/) in March 2025 to compare and contrast the use of `PureComponent` and the more modern `React.memo`.

:::

---

## Why is optimization in React important?

React components tend to re-render frequently during normal application usage. This behavior can occur when props change, state updates, or parent components re-render.

Without proper optimization, these re-renders can become unnecessary and impact performance — especially in large applications with complex component trees, and when components must handle frequent data updates.

---

## What is a pure component in React?

Based on the concept of purity in functional programming paradigms, a function is said to be pure if it meets the following two conditions:

- Its return value is only determined by its input values
- Its return value is always the same for the same input values

A React component is considered pure if it renders the same output for the same state and props. For this type of class component, React provides the `PureComponent` base class. Class components that extend the `React.PureComponent` class are treated as pure components.

Pure components have some performance improvements and render optimizations because React implements the [<VPIcon icon="fa-brands fa-react"/>`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) method for them with a shallow comparison of props and state.

---

## How does a pure component work?

When a parent component re-renders, `PureComponent` performs two key comparisons. It compares the current props with the next props, and compares the current state with the next state.

If neither props nor state has changed (based on shallow comparison), React skips [**the re-render process**](/blog.logrocket.com/how-when-to-force-react-component-re-render.md) entirely. This automatic optimization helps prevent unnecessary renders and improves application performance. In practice, a React pure component looks like the following:

```jsx
import React from 'react';

class PercentageStat extends React.PureComponent {

  render() {
    const { label, score = 0, total = Math.max(1, score) } = this.props;

    return (
      <div>
        <h6>{ label }</h6>
        <span>{ Math.round(score / total * 100) }%</span>
      </div>
    )
  }

}

export default PercentageStat;
```

---

## Are React functional components pure?

Functional components are very useful in React, especially when you want to isolate state management from the component. That’s why they are often called stateless components.

However, [**functional components**](/blog.logrocket.com/testing-state-changes-in-react-functional-components.md) cannot leverage the performance improvements and render optimizations that come with `React.PureComponent` because, by definition, they are not classes.

If you want React to treat a functional component as a pure component, you’ll have to convert the functional component to a class component that extends `React.PureComponent`.

Check out the simple example below:

```jsx
// FUNCTIONAL COMPONENT
function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{ label }</h6>
      <span>{ Math.round(score / total * 100) }%</span>
    </div>
  )
}


// CONVERTED TO PURE COMPONENT
class PercentageStat extends React.PureComponent {

  render() {
    const { label, score = 0, total = Math.max(1, score) } = this.props;

    return (
      <div>
        <h6>{ label }</h6>
        <span>{ Math.round(score / total * 100) }%</span>
      </div>
    )
  }

}
```

---

## React stateless function components

React stateless function components are functions that do not manage any state. They are a simple way to define components that don’t need to manage state or lifecycle methods.

In essence, stateless function components are JavaScript functions that return React items after receiving props as input. Stateless functional components are used when a component doesn’t need to maintain its own state or lifecycle methods.

Typically, these components have consistent output based on their inputs because they have no state or side effects.

If you give a stateless function component a set of props, it will always render the same JSX. A simple example is:

```jsx
const Title = ({ title }) => {
  return <h1>{title}</h1>;
};
```

While functional components don’t have direct lifecycle methods, they still go through the same three phases as class components:

1. **Mounting —**`useEffect(() => {}, [])`This Hook is similar to `componentDidMount` in class components. The function inside `useEffect` runs after the component is first rendered
2. **Updating —**`useEffect(() => {})`If you omit the dependency array (`[]`), `useEffect` will run after every render (similar to `componentDidUpdate`)
3. **Unmounting —**`useEffect(() => { return () => {} })`The function returned inside `useEffect` (the cleanup function) is equivalent to `componentWillUnmount` in class components and is used to clean up resources when the component unmounts or before it re-renders

Note that `useEffect` is not a direct equivalent to lifecycle methods, but rather a different paradigm for handling side effects in your components.

---

## Using React function components

Function components are a simpler way to write components in React. They are JavaScript functions that accept props and return React elements as earlier said.

Here’s a basic example:

```jsx
const ProductCard = ({ name, price, description, inStock }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <span>${price}</span>
      <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
};
```

The term “stateless function components,” has been outdated since the introduction of Hooks. Modern function components can handle a lot of things, including managing state using `useState`, handling side effects using `useEffect`, accessing context, and maintaining references with `useRef`.

---

## Using the `{ pure }` HOC from Recompose

In the past, optimizing a functional component so that React could treat it as a pure component wasn’t going to necessarily require that you convert the component to a class component.

The [Recompose (<VPIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose) package then provides a broad collection of [<VPIcon icon="fa-brands fa-react"/>higher-order components (HOCs)](https://reactjs.org/docs/higher-order-components.html) that are very useful for dealing with functional components. This package exports a [`{ pure }` (<VPIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose/blob/master/docs/API.md#pure) HOC that tries to optimize a React component by preventing updates on the component unless a prop has changed, using `shallowEqual()` to test for changes.

Using the pure HOC, our functional component can be wrapped as follows:

```jsx
import React from 'react';
import { pure } from 'recompose';

function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{ label }</h6>
      <span>{ Math.round(score / total * 100) }%</span>
    </div>
  )
}

// Wrap component using the `pure` HOC from recompose
export default pure(PercentageStat);
```

However, the [**Recompose library**](/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components-3019a6daf44c/) is no longer a recommended approach to optimizing React components because it has been officially deprecated. Its functionality has been largely replaced by React Hooks, which effectively addresses the same issues.

React now provides us with `React.memo` as the official way to optimize a functional component.

---

## How to use `React.memo`

Functional components in React can now leverage similar performance optimizations as `PureComponent` through the use of [**`React.memo` Hook**](/blog.logrocket.com/react-memo.md). While functional components don’t inherently skip re-renders, they can be wrapped with `memo` to achieve the same optimization.

With `React.memo`, you can create memoized functional components that prevent unnecessary updates. This functionality is particularly useful when dealing with components that receive the same set of props.

Using the `React.memo` API, the previous functional component can be wrapped as follows:

```jsx
import React, { memo } from 'react';

function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{ label }</h6>
      <span>{ Math.round(score / total * 100) }%</span>
    </div>
  )
}

// Wrap component using `React.memo()`
export default memo(PercentageStat);
```

It is important to note that, unlike `PureComponent`, `memo` only compares props. However, in functional components, calling the state setter with the same state already prevents re-renders by default, even without `memo`.

### `React.memo` API implementation details

There are a few things worth considering about the implementation of the `React.memo` API.  
For one, `React.memo` is a [**higher-order component**](/blog.logrocket.com/react-higher-order-components.md). It takes a React component as its first argument and returns a special type of React component that allows the renderer to render the component while memoizing the output. Therefore, if the component’s props are shallowly equal, the `React.memo` component will bail out the updates.

`React.memo` works with all React components. The first argument passed to `React.memo` can be any type of React component. However, for class components, you should use `React.PureComponent` instead of `React.memo`.

`React.memo` also works with components rendered from the server using `ReactDOMServer`.

### Custom bailout condition

The `React.memo` API can take a second argument: the `arePropsEqual()` function. The default behavior of `React.memo` is to shallowly compare the component props. However, with the `arePropsEqual()` function, you can customize the bailout condition for component updates. The `arePropsEqual()` function is defined with two parameters: `prevProps` and `nextProps`.

The `arePropsEqual()` function returns `true` when the props are compared to be equal, thereby preventing the component from re-rendering,. It returns `false` when the props are not equal.

The following code snippet uses a custom bailout condition:

```jsx
import React, { memo } from 'react';

function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{ label }</h6>
      <span>{ Math.round(score / total * 100) }%</span>
    </div>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.label === nextProps.label; 
}

// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(PercentageStat, arePropsEqual);
```

We use the strict equal operator `===` because we want to check the equality between the values and their types without conversion. For example, `"1"` and `1` are not the same. Loose equality between them will return true, `"1" == 1 // true`. But, strict equality will be false, `"1"=== 1 // false`. So, we want to perform strict comparisons.

### Comparison with class components

The `arePropsEqual()` function acts very similar to the `shouldComponentUpdate()` lifecycle method in class components. Note that `arePropsEqual` works in the opposite way:

- `shouldComponentUpdate` — Returns `true` to trigger a re-render
- `arePropsEqual` — Returns `true` to prevent a re-render

---

## Migrating from a `PureComponent` class component to a function

It is important to emphasize strongly that class components are no longer recommended in new code. Although React still supports class components, the recommended approach is to use functional components.

Here’s how to convert a `PureComponent` class to a modern function component using `React.memo`.

`PureComponent` version:

```jsx
import { PureComponent } from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{this.props.name && ', '}{this.props.name}!</h3>;
  }
}
```

Converted function component with `memo`:

```jsx
import { memo } from 'react';

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

The functional component version achieves the same optimization, but it’s more concise and follows modern React practices.

---

## Important differences between `PureComponent` and `React.Memo`

Below is a brief comparison of `pureComponent` and `React.Memo`:

| Features | `PureComponent` | `React.memo` |
| --- | --- | --- |
| State handling | Compares both props and state | Only compares props; state changes are automatically optimized |
| Props access | Through `this.props` | Directly as function parameters |
| Import statement | `import { PureComponent } from 'react'` | `import { memo } from 'react'` |
| Component definition | `class MyComponent` extends `PureComponent` | `const MyComponent = memo(function MyComponent)` |
| Lifecycle methods | Uses class lifecycle methods | Uses hooks for lifecycle functionality |
| Syntax | More verbose; requires class syntax | More concise; uses function syntax |
| Performance optimization | Automatic shallow comparison | Customizable comparison through second argument |
| State declaration | `this.state = { ... }` | Uses `useState` Hook |
| Modern React alignment | Depreacted approach | Recommended modern approach |

As developers, knowing when to use a tool is important. It either tells on your optimization or makes your code unnecessarily verbose. Having said this, I will briefly point out when to use memoization and when you really shouldn’t bother about it:

- You **will want** to memoize components that re-render frequently, and components that receive the same props often
- You **won’t want** to memoize simple components (i.e. components that always receive different props), and components that rarely re-render

---

## Conclusion

With `React.memo` API, you can now enjoy the performance benefits that come from using functional components together with the optimizations that come with memoizing the components.

In this article, we covered the `React.memo` API in detail. First, we covered the differences between functional and class components in React, and then we reviewed pure components, learned how to convert a functional component to a class component, and covered how to convert a class component to a functional component.

I hope you enjoyed this article. Be sure to leave a comment if you have any questions. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Pure components in React: Using PureComponent and React.memo",
  "desc": "Learn how to memoize components in React using React.PureComponent and the React.memo API, and cover the fundamentals of React components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/pure-component-in-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
