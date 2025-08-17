---
lang: en-US
title: "Avoiding common mistakes in React Hooks"
description: "Article(s) > Avoiding common mistakes in React Hooks"
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
      content: "Article(s) > Avoiding common mistakes in React Hooks"
    - property: og:description
      content: "Avoiding common mistakes in React Hooks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/avoiding-common-mistakes-in-react-hooks.html
prev: /programming/js-react/articles/README.md
date: 2021-01-07
isOriginal: false
author:
  - name: Kelvin Gobo
    url : https://blog.logrocket.comhttps://blog.logrocket.com/author/kelvingobo/
cover: /assets/image/blog.logrocket.com/banner.png
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
  name="Avoiding common mistakes in React Hooks"
  desc="Even though React Hooks components have been around for a few years now, there are still some common mistakes that we can learn to avoid."
  url="https://blog.logrocket.com/avoiding-common-mistakes-in-react-hooks"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/banner.png"/>

Even though React Hooks components have been around for a few years now, there are still some mistakes that happen quite often when using these features. In this article, we will discuss some common missteps when making the transition to React Hooks and how to avoid them.

---

## Code duplication due to side effects

![react hooks](/assets/image/blog.logrocket.com/banner.png)

While React Hooks components allow us to achieve the same functionality as its predecessor, the process by which this happens is [**significantly different.**](/blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes.md) With `class` components, side effects are run during the various component lifecycles. By comparison, React Hooks runs side effects as a result of changes to the component’s state. This can sometimes lead to duplication.

Take, for example, a `Counter` component that updates the page title any time the state `count` is updated:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

You’ll notice `componentDidMount` and `componentDidUpdate` have the same code. This is because the code has to be run both when the component is added to the DOM, and on all subsequent state updates. This duplication happens because we have to run the same side effect at different stages of the component lifecycle. Even if the code is extracted into a method, the method still has to be called twice, which does not help to avoid duplication.

Since React Hooks run side effects as a result of state changes, you can avoid the problem of duplication like so:

```jsx
import React, { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Click me </button>
    </div>
  );
}
```

Since `useEffect` by default runs after every render and on subsequent updates, it solves the problem of duplication.

You can also use `useState` to react (no pun intended) to state changes of specific state variables:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); 
  // ...
}
```

In this case, the “effect” is run any time the state `count` changes. This keeps the logic of the state and the side effect close together which is easier to read and understand.

---

## Handling actions with `useEffect`

As useful as the `useEffect` Hook can be, there are times where it can become “too useful” and thus overcomplicate code. This can be seen in the case of the `TodoList` component below:

```jsx :collapsed-lines
function TodoList({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(null);
  const fetchTodos = () => {
    setLoading(true);
    callApi()
      .then((res) => setTodos(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  useEffect(() => {
    if (!loading && !error && todos) {
      onSuccess();
    }
  }, [loading, error, todos, onSuccess]);
  return (
    <div>
      {todos.map((todo) => (
        <Todo item={todo} />
      ))}
    </div>
  );
}
```

There are two `useEffect` Hooks: one is run on initial render, and the second is run when `loading` and `error` are false but `todos` have been populated (in other words, when the API call was successful and calls the method `onSuccess` that was passed as a `prop`). This is a case of over-engineering that actually ends up complicating the code.

Since we only want to run `onSuccess` when the API call is successful, it can be invoked in the `.then` handler and the component like so:

```jsx :collapsed-lines
function TodoList({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(null);
  const fetchTodos = () => {
    setLoading(true);
    callApi()
      .then((res) => {
        setTodos(res);
        onSuccess();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <Todo item={todo} />
      ))}
    </div>
  );
}
```

To limit complications to your code, avoid handling actions with `useEffect`.

---

## Using `useState` when no re-render is required

One of the key elements of any React component is its state as it drives data flow, and the resulting update to the user interface. Every state change triggers a re-render of the component as well as its children components. To avoid performance issues, only use `useState` when absolutely necessary.

To understand this, let’s look at a simple component that has two buttons — one that updates the state `count` and another that uses the state `count` to make an API call:

```jsx :collapsed-lines
function ClickButton(props) {
  const [count, setCount] = useState(0);
  
  const onClickCount = () => {
    setCount((c) => c + 1);
  };
  
  const onClickRequest = () => {
    apiCall(count);
  };

  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}
```

In this example, you’ll see that the state is never used in the `render` method, which means it will cause an unnecessary render every time the state changes. In this case, using the `useRef` Hook will be more appropriate because it retains its value between renders and also does not cause a re-render.

The component should then be written like so:

```jsx :collapsed-lines
function ClickButton(props) {
  const count = useRef(0);
  
  const onClickCount = () => {
    count.current++;
  };

  const onClickRequest = () => {
    apiCall(count.current);
  };

  return (
    <div>
      <button onClick={onClickCount}>Counter</button>
      <button onClick={onClickRequest}>Submit</button>
    </div>
  );
}
```

To avoid unnecessary re-rendering, avoid using `useState` when the state does not update the user interface.

---

## Using `onClick` to trigger navigation

This issue is a general bad practice in web development and not specific to React Hooks. Let’s say we have a button that links to another page:

```jsx
function ClickButton(props) {
  const history = useHistory();

  const onClick = () => {
    history.push("/next-page");
  };

  return <button onClick={onClick}>Go to next page</button>;
}
```

It may be tempting to stick an `onClick` listener on the button and use `useHistory` to navigate to the subsequent page since it is simple client-side navigation … right? Wrong.

The first problem in this scenario is that this button is not detected as a link, which makes it nearly impossible to detect for screen readers. Moreover, hovering over the button does not show the subsequent link at the bottom corner of the screen, even though this is a UX hint that many users have come to associate with links.

To avoid creating confusion for users, `<Link />` should always be used to trigger navigation like so:

```jsx
function ClickButton(props) {
  return (
    <Link to="/next-page">
      <span>Go to next page</span>
    </Link>
  );
}
```

---

## Rewriting tests for React Hooks

Rewriting tests becomes a concern when a class component is converted to a function component with hooks. Understanding whether a test needs to be rewritten depends on if the test depends on an implementation specific detail of the component. A sample test is below:

```jsx
test("updateCount updates the count state", () => {
  // using enzyme
  const wrapper = mount(<Counter initialCount="0" />);
  expect(wrapper.state("count")).toBe(0);
  wrapper.instance().updateCount(1);
  expect(wrapper.state("count")).toBe(1);
});
```

If the component is written with hooks, then the test will break because it depends on properties that are specific to class components (i.e., `.state`).

A better approach would be to test from a user’s point of view because the user is not concerned with the implementation details of the component. In this case, rewriting the test will look like this:

```jsx
import { render, screen } from "@testing-library/react";

test("updateCount updates the count state", () => {
  // using React Testing Library
  render(<Counter initialCount="0" />);
  expect(screen.getByText("Initial count: 0")).toBeInTheDocument();
  userEvent.click(screen.getByText("Update count"));
  expect(screen.getByText("Initial count: 1")).toBeInTheDocument();
});
```

With this method, the test does not break as a result of changes in implementation details.

---

## Conclusion

In this article, we’ve looked at some common mistakes that occur when transitioning to React Hooks. We’ve also seen how to avoid those mistakes and best practices to follow. Learn more about React Hooks [<FontIcon icon="fa-brands fa-react"/>here](https://reactjs.org/docs/hooks-intro.html).

<SiteInfo
  name="Introducing Hooks - React"
  desc="A JavaScript library for building user interfaces"
  url="https://legacy.reactjs.org/docs/hooks-intro.html/"
  logo="https://legacy.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791"
  preview="https://legacy.reactjs.org/logo-og.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Avoiding common mistakes in React Hooks",
  "desc": "Even though React Hooks components have been around for a few years now, there are still some common mistakes that we can learn to avoid.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/avoiding-common-mistakes-in-react-hooks.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
