---
lang: en-US
title: "Using setState in React components"
description: "Article(s) > Using setState in React components"
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
      content: "Article(s) > Using setState in React components"
    - property: og:description
      content: "Using setState in React components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-setstate-react-components.html
prev: /programming/js-react/articles/README.md
date: 2021-07-16
isOriginal: false
author:
  - name: Nosa Obaseki
    url : https://blog.logrocket.com/author/codepanda/
cover: /assets/image/blog.logrocket.com/using-setstate-react-components/banner.png
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
  name="Using setState in React components"
  desc="Calling setState in React lifecycle methods can be tricky. Learn more about how and when to apply each method for best results."
  url="https://blog.logrocket.com/using-setstate-react-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-setstate-react-components/banner.png"/>

::: note Editor’s note

This post was last updated on 30 July 2021. It may still contain information that is out of date.

:::

![Using setState In React Components](/assets/image/blog.logrocket.com/using-setstate-react-components/banner.png)

States in React, like props, are objects that store data and affect how a component renders or behaves. Unlike props, states are managed completely within the component and can be changed over time.

User actions, network activity, API requests, or specific application behaviors can often trigger changes in state for React components.

---

## What is a component state in React?

Components that have a state are referred to as stateful components, while those that do not have states are stateless components.

A component can have an initial state set, access it, and update it. In the code block below, we are setting the component’s initial state. This is done through the constructor method:

```jsx title="Food.jsx"
import React, { Component } from 'react';

class Food extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fruits: ['apple', 'orange'],
      count: 0
    }
  }
}
```

Because states are plain JavaScript objects, `this.state` must be equal to an object:

```jsx
this.state = {
  fruits: ['apple', 'orange'],
  count: 0
}
```

Avoid confusing the `state` object with other instance properties. It’s easy to assume you can define another object in the constructor and try to use it like `state`, but the `state` instance is a special one because React manages it:

```jsx
// ...
// constructor function above
this.state = {
  fruits: ['apple', 'orange'],
  count: 0
}
    
this.user = {
  name: 'Obaseki Nosa'
}

// ...
```

Although both `this.state` and `this.user` are objects initialized in the constructor, only `this.state` reacts with `setState()` and is managed by React.

---

## How do I access a component state in React?

We can access component states like other object using `this.state.property_name`.

To access the `count` in the above example, we;ll use `this.state.count`:

```jsx
render() {
  return (
    <div className = "container">
      <h2> Hello!!!</h2>
      <p> I have {this.state.count} fruit(s)</p>
    </div>
  );
}
```

---

## How do I update my component state in React?

Although it is technically possible to write to `this.state` from anywhere in your code, it does not prompt a rerender, which would lead to unstable and incorrect state values when trying to access values through `this.state`.

The only place you should directly write to `this.state` is the component’s constructor method.

Use the `setState()` method everywhere else; doing so accepts an object that eventually merges into the component’s existing state.

For example, the following does not rerender a component:

```jsx
// Wrong
this.state.name = 'Obaseki Nosa';
```

Instead, use `setState()`.

---

## How do I use `setState()` in React?

The `setState()` schedule changes to the component’s state object and tells React that the component and its children must rerender with the updated state:

```jsx
// Correct
this.setState({name: 'Obaseki Nosa'});
```

React intentionally waits until all components call `setState()` in their event handlers before rerendering. This boosts performance by avoiding unnecessary rerenders.

`setState()` can be considered as a request instead of an immediate command to update the component. This is why trying to use `this.state` immediately after a `setState()` leads to incorrect behaviors:

```jsx
// Trying to change the value of this.state.count from previous example
this.setState({
  count: 4
});

console.log(this.state.count); // 0
```

`this.state.count` returns `0` because even though the value is set with `setState()`, it was only scheduled and not rerendered before attempting to use the value with `this.state`.

`setState()` always leads to a rerender unless `shouldComponentUpdate()` returns `false`.

---

## Using `setState()` in React lifecycle methods

Calling `setState()` in [**React’s lifecycle methods**](/blog.logrocket.com/react-lifecycle-methods-tutorial-examples.md) requires a certain level of caution. There are a few methods where calling `setState()` leads to undesirable results and others to avoid completely. Let’s look at a few methods and how they react when calling `setState()`

### `render()`

Calling `setState()` here makes it possible for a component to produce infinite loops.

The `render()` function should be pure, meaning that it does not modify a component’s state. It returns the same result each time it’s invoked, and it does not directly interact with the browser.

In this case, avoid using `setState()` here.

### `constructor()`

Do not call `setState()` in `constructor()`. Instead, if a component needs to use a local state, assign the initial state to `this.state` directly in the constructor.

### `componentDidMount()`

`componentDidMount()` invokes immediately after a component mounts. You can call `setState()` immediately in `componentDidMount()` and triggers an extra rendering, but this happens before the browser updates the screen, calling `render()`twice.

### `componentDidUpdate()`

`componentDidUpdate()` invokes immediately after updating. You can call `setState()` immediately here, but it must be wrapped in a condition like in the example below, or it causes an infinite loop:

```jsx
componentDidUpdate(prevProps, prevState) {
  let newName = 'Obaseki Nosa'
  // Don't forget to compare states
  if (prevState && prevState.name !== newName) {
    this.setState({name: newName});
  }
}
```

### `componentWillUnmount()`

Do not call `setState()` here because the component does not rerender. Once a component instance unmounts, it never mounts again.

---

## Conclusion

This concludes our overview of `setState()`. Some things to remember when using `setState()` include:

1. `setState()` is async, meaning there is no guarantee that the state has updated when trying to access the value immediately
2. You can only change `state` with `setState` and React will react to the change

Cheers!!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using setState in React components",
  "desc": "Calling setState in React lifecycle methods can be tricky. Learn more about how and when to apply each method for best results.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-setstate-react-components.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
