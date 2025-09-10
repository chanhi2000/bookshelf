---
lang: en-US
title: "Why you should adopt React Hooks instead of classes"
description: "Article(s) > Why you should adopt React Hooks instead of classes"
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
      content: "Article(s) > Why you should adopt React Hooks instead of classes"
    - property: og:description
      content: "Why you should adopt React Hooks instead of classes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes.html
prev: /programming/js-react/articles/README.md
date: 2020-11-12
isOriginal: false
author:
  - name: Nwose Lotanna
    url : https://blog.logrocket.com/author/nwoselotanna/
cover: /assets/image/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes/banner.png
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
  name="Why you should adopt React Hooks instead of classes"
  desc="In this post, we will look at functional components using React Hooks and why you should use them over class components."
  url="https://blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes/banner.png"/>

In this post, we will look at functional components using React Hooks that were introduced in version 16 of React and why you should use them over class components. This post is suited to React developers who are familiar with classes and new React developers who are wondering which one to use.

---

## What are React Hooks?

![Why you should adopt React Hooks instead of classes](/assets/image/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes/banner.png)

According to the [<VPIcon icon="fa-brands fa-react"/>official documentation](https://reactjs.org/docs/hooks-intro.html), Hooks brings into a functional component all the powers previously accessible in class components and made them available in functional components. With React Hooks, you can now use state and other features of React outside of the construct of a class:

```jsx
import React, { useState } from "react";
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

`useState` is one of the Hooks available for use in a React functional component. Although Hooks were released last year, they shipped with some added advantages like having no breaking changes. This means that it is totally backward-compatible and it is optional to use, meaning you can choose to stick to classes if you want or you can try out Hooks.

---

## Why you should consider Hooks over classes

With the introduction of Hooks, you can now do everything you would normally do in a class, inside a functional component. This is a game-changer because you have fewer concepts to learn and fewer lines of code to write too. Before last year, React developers already used classes so it may not be easy to leave something you have been using for a while for something new but since Hooks are optional, you can give it a try without any blowbacks.

---

## Lifecycle methods in functional components

React developers know that you cannot really escape using lifecycle methods if you use class components, `componentDidMount` is one of the most popular ones. It runs after the first component render has been executed. To illustrate, let us create a class component to return a header about this LogRocket blog:

```jsx
class NewComponent extends React.Component {
  componentDidMount() {
    console.log("The first render has executed!");
  }

  render() {
    return (
      <div>
        <h3>You are reading a LogRocket article</h3>
      </div>
    );
  }
}

```

Now after this is run, you have to include the `componentWillUnmount` lifecycle to destroy this one already mounted. Now thanks to React Hooks, you can get this same lifecycle method behavior inside a functional component, I think this is revolutionary:

```jsx
const FunComponent = () => {
  React.useEffect(() => {
    console.log("The first render has executed!");
  }, []);
  return (
    <div>
      <h3>You are reading a LogRocket article</h3>
    </div>
  );
};
```

This code block above uses a React Hook called `UseEffect` and with the empty array second argument it returns the same output with the class component we defined above.

---

## State management in functional components

This is probably the next question you asked after seeing that Hooks can act like lifecycle methods in functional components, and yes you can now handle state in a functional component thanks to Hooks. To implement state in a simple clicker class used to count down from a hundred, this is how most people might go about doing it:

```jsx
class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 100
    };
  }
 
  render() {
    return (
      <>
        <p>counter: {this.state.counter} counts left</p>
        <button onClick={() => this.setState({ counter: this.state.counter - 1 })}>
          Click
        </button>
      <>
    );
  }
}
```

Now you know you must have super props for stateful logic, now to achieve this with a functional component, this is what it looks like:

```jsx
const FunComponent = () => {
  const [counter, setCounter] = React.useState(100);
 
  return (
    <>
      <p>{counter} more counts to go!</p>
      <button onClick={() => setCounter(counter - 1)}>Click</button>
    <>
  );
};
```

The `useState` Hook is used to handle stateful logic in functional components and the syntax is really as easy as it seems. Here are a few other reasons you may want to write functional components instead of classes.

---

## Fewer lines of code

So with a functional component, you write fewer lines of code on average compared to the equivalent in a class component. Here is a small example where we return a div tag that contains a small heading with a class component:

```jsx
import React, { Component } from "react";
class NewComponent extends Component {
  render() {
    return (
      <div>
        <h3>You are reading a LogRocket article</h3>
      </div>
    );
  }
}
```

For a functional component it would look like this:

```jsx
import React from "react";

const FunComponent = () => {
  return (
    <div>
      <h3>You are reading a LogRocket article</h3>
    </div>
  );
};
```

---

## Easier learning curve

In the example above you can see that there are fewer concepts to learn or understand in a functional component than in a class component. A functional component is a simple function that only returns JSX, while on the side of the class component, you have to understand the render method and how it is used to extend `React.component`.

---

## No need to use “this” again

This is a well-debated point but even the React team confirms that the use of classes in JavaScript can be [<VPIcon icon="fa-brands fa-react"/>confusing sometimes for developers and even machines](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines). One of the confusing things is using `this` for things like passing properties and how it works in different languages. To illustrate, imagine you had a heading component with a title:

```jsx
<Heading title="blog" />
```

Passing this title property has a very distinct syntax for both functional components and class components. For a class component, the code block will look like this:

```jsx
class NewComponent extends React.Component {
  render() {
    const { title } = this.props;
    return <h3>You are reading a LogRocket {title}</h3>;
  }
}
```

We had to bind it to `this.props` to output “You are reading a LogRocket blog” on render, meanwhile, you do not have to bother about this while using a functional component to achieve the same results:

```jsx
const FunComponent = ({ title }) => {
  return <h3>You are reading a LogRocket {title}</h3>;
};
```

---

## Conclusion

This post is an overview of React Hooks and reasons why you should use them in functional components instead of class components. If you would like to learn more about React Hooks, check out [<VPIcon icon="fa-brands fa-react"/>the official documentation](https://reactjs.org/docs/hooks-overview.html) and if you just want to learn how to refactor your app from classes to functional components with Hooks then [check out this great article](https://blog.logrocket.com/practical-react-hooks-how-to-refactor-your-app-to-use-hooks-b1867e7b0a53/). I hope you find this helpful, happy hacking!
<!-- TODO: /blog.logrocket.com/practical-react-hooks-how-to-refactor-your-app-to-use-hooks.md -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why you should adopt React Hooks instead of classes",
  "desc": "In this post, we will look at functional components using React Hooks and why you should use them over class components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
