---
lang: en-US
title: "Using Recompose to write clean higher-order components"
description: "Article(s) > Using Recompose to write clean higher-order components"
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
      content: "Article(s) > Using Recompose to write clean higher-order components"
    - property: og:description
      content: "Using Recompose to write clean higher-order components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components.html
prev: /programming/js-react/articles/README.md
date: 2018-06-25
isOriginal: false
author:
  - name: JuanMa Garrido
    url : https://blog.logrocket.com/author/juanmagarrido/
cover: /assets/image/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components/banner.png
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
  name="Using Recompose to write clean higher-order components"
  desc="Learn how Recompose methods can help create cleaner HOCs and how it simplifies the development and organization of React components."
  url="https://blog.logrocket.com/using-recompose-to-write-clean-higher-order-components-3019a6daf44c"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components/banner.png"/>

::: note Editor’s note

Active maintenance of the Recompose library was [discontinued (<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose/issues/756#issuecomment-438674573) as of 25 October 2018. The author recommends using [**React Hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) instead.

:::

![Using Recompose To Write Clean Higher-Order Components](/assets/image/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components/banner.png)

If you like keeping things simple in React by creating small components with functional component syntax and then using them as pieces to create bigger ones, [<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`](https://github.com/acdlite/recompose) can help you to do the same with higher-order components (HOCs).

With Recompose, it is easier to create small higher-order components that can be composed into more complex ones. With the approach encouraged by Recompose, you won’t need more `Class` syntax to create React components.

But before going into details, let’s start reviewing some concepts…

---

## Higher-order functions

In JavaScript, we have a special type of function called higher-order functions:

> A [<FontIcon icon="fa-brands fa-wikipedia-w"/>higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) is a function that deals with other functions, either because it receives them as parameters (to execute them at some point of the function’s body), because it returns a new function when it’s called, or both.

```js
const sum = (a, b) => a + b
const multiplication = (a, b) => a * b

// Our Higher-Order Function
const getResultOperation = op => (a, b) => `The ${op.name} of ${a} and ${b} is ${op(a, b)}`

const getSumResult = getResultOperation(sum)
const getMultiplicationResult = getResultOperation(multiplication)

console.log( getSumResult(2, 5) ) // The sum of 2 and 5 is 7 
console.log( getMultiplicationResult(2, 5) ) // The multiplication of 2 and 5 is 10
```

In the example above, `getResultOperation` receives a function and returns a new one. So it is a higher-order function.

> The most popular higher-order functions in JavaScript are the array methods [<FontIcon icon="fa-brands fa-firefox"/>`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [<FontIcon icon="fa-brands fa-firefox"/>`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) or [<FontIcon icon="fa-brands fa-firefox"/>`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). They all apply some function passed as a parameter over the elements of the array to get something as a result.

---

## Higher-order components

In React, we have the equivalent of higher-order functions, but for components, the so-called higher-order components.

> A [<FontIcon icon="fa-brands fa-react"/>higher-order component](https://reactjs.org/docs/higher-order-components.html) is a function that takes a component and returns a new component.

When are higher-order components useful? Well, mostly to reuse the logic involving behavior across components. Let’s explain this with the following scenario.

Let’s assume we already have a component `Button`.

```jsx
const Button = ({ type = "primary", children, onClick }) => (
  <button className={`btn btn-${type}`} onClick={onClick}>
    {children}
  </button>
);
```

And we want to create another `ButtonWithTrack` based on this `Button` (same props on `Button` should also work on `ButtonWithTrack` and same styles applied) but with improved behavior (like keeping track of the times it has been clicked and displaying this value on the button itself).

To do this, we can do…

```jsx :collapsed-lines
import Button from "./Button";

class ButtonWithTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: 0
    };
  }
  handleClick = e => {
    let { times } = this.state;
    const { onClick } = this.props;
    this.setState({ times: ++times });
    onClick && onClick();
  };
  render() {
    const { children } = this.props;
    const { times } = this.state;
    return (
      <span onClick={this.handleClick}>
        <Button type={times > 5 ? "danger" : "primary"}>
          {children} <small>{times} times clicked</small>
        </Button>
      </span>
    );
  }
}
```

We have reused the original `Button`, so everything is OK for now.

Let’s take another component, `Link`:

```jsx
const Link = ({ type = "primary", children, href, onClick }) => (
  <a 
    style={styles}
    className={`badge badge-${type}`} href={href} onClick={onClick}
  >
    {children}
  </a>
);
```

And we want to add the exact same behavior we added to our `Button`.

What to do then? Should we repeat 90 percent of the code in two files? Or is there a way we can take out the logic added to `ButtonWithTrack` in a way it can be applied to both `Button` and `Link` components?

Higher-order components to the rescue!!

To solve this problem, we can create a higher-order component, that is, a function that takes one component and returns the enhanced version of that component with the behavior we want.

For example, we can do this:

```js :collapsed-lines
const withClickTimesTrack = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        times: 0
      };
    }
    handleClick = e => {
      e.preventDefault();
      let { times } = this.state;
      const { onClick } = this.props;
      this.setState({ times: ++times });
      onClick && onClick();
    };
    render() {
      const { children, onClick, ...props } = this.props;
      const { times } = this.state;
      return (
        <span onClick={this.handleClick}>
          <WrappedComponent
            type={times > 5 ? "danger" : "primary"}
            {...props}
          >
            {children} <small>({times} times clicked)</small>
          </WrappedComponent>
        </span>
      );
    }
  };
```

So then, we can simplify the creation of the component `ButtonWithTrack` from `Button` by using the `withClickTimesTrack` HOC like this:

```js
import withClickTimesTrack from "./hoc/withClickTimesTrack";

const Button = ({ type = "primary", children, onClick }) => (
  <button className={`btn btn-${type}`} onClick={onClick}>
    {children}
  </button>
);

const ButtonWithTrack = withClickTimesTrack(Button);
```

And also now, we can easily apply the same enhancement to other components like `Link`:

```js
import withClickTimesTrack from "./hoc/withClickTimesTrack";

const Link = ({ type = "primary", children, href, onClick }) => (
  <a 
    style={styles} 
    className={`badge badge-${type}`} 
    href={href}
    onClick={onClick}
  >
    {children}
  </a>
);
const LinkWithTrack = withClickTimesTrack(Link);
```

Cool, isn’t it?

But we can think this HOC add too many behaviors at the same time (handler, state & new UI).

Wouldn’t be better if we split the logic behind the HOC into smaller parts?

---

## Composing HOCs

OK, it’s decided! We want to have these three behaviors of the HOC isolated so we can reuse them independently in other components:

- Add `times` state
- Add custom `handleClick`
- Display the `times` state inside the element

To do this we can create three HOCs where each one will add a specific behavior…

```js title="withStateTimes.js"
const withStateTimes = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        times: 0
      };
    }
    setTimes = (times) => {
      this.setState({ times })
    }
    render() {
      const { times } = this.state
      const { setTimes } = this
      return (
        <WrappedComponent times={times} setTimes={setTimes} { ...this.props } />
      );
    }
  };
```

```js title="withHandlerClick.js"
const withHandlerClick = WrappedComponent => props => {

  let { times, setTimes, children, onClick, ..._props } = props;
    
  const handleClick = e => {
    e.preventDefault();
    setTimes( ++times );
    onClick && onClick();
  };

  return (
    {children}
  );

}
```

```js title="withDisplayTrack.js"
const withDisplayTrack = WrappedComponent => props => {
  const { children, onClick, handleClick, times, ..._props } = props;
  return (
    <span onClick={handleClick}>
      <WrappedComponent
        type={times > 5 ? "danger" : "primary"}
        {..._props}
      >
        {children} <small>({times} times clicked)</small>
      </WrappedComponent>
    </span>
  )
}
```

With these three HOCs, we can then apply them to our elements in this way…

```js
const ButtonWithTrack = withStateTimes(withHandlerClick(withDisplayTrack(Button)));
```

What’s going on here? Well, `withDisplayTrack(Button)` returns a component that is used in the call of `withHandlerClick` that will also return a component that will be used in the call of `withStateTimes` that will return our final component (`ButtonWithTrack`).

As you can see, the idea is good because we can reuse our code in this way, but creating these HOCs is a bit complicated and also applying them in this way is a bit hard to read.

Is there any improvement over this?

Recompose to the rescue!!🙂

---

## Recompose

What is Recompose? In their own words:

> [<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`](https://github.com/acdlite/recompose) is a React utility belt for function components and higher-order components. Think of it like [<FontIcon icon="fas fa-globe"/>lodash](https://lodash.com/docs/4.17.10#lodash) forReact.

So, it’s a set of methods we can use to improve the organization, creation and application of our HOC’s encouraging the use of functional stateless components combined with the composition of HOCs.

Let’s start with the most-used method of Recompose: `compose`.

### `compose`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components"
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#compose"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

With `compose`, we can *compose* multiple higher-order components into a single higher-order component.

In our scenario, with `compose`, we can now express the application of our HOCs like this:

```js
import { compose } from "recompose";

// ...

const ButtonWithTrack = compose(
  withStateTimes,
  withHandlerClick,
  withDisplayTrack
)(Button)
```

Much cleaner and easy to read, right?

### `withState`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components."
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

Another useful method of Recompose for our scenario is `withState`.

This method creates a HOC with almost the same behavior we implemented in `withStateTimes.js`

- It adds a state property
- It creates a *handler* to set the value of this state property
- It allow us to set a initial value

So, with *Recompose*, now we can express the same logic like this…

```js
...
import { withState } from "recompose";
const withStateTimes = withState('times', 'setTimes', 0)
...
```

For real? Yes, for real🙂

The utility of Recompose starts to make sense, right?

### `withHandlers`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components."
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#withHandlers"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

Let’s continue improving our scenario’s code. Let’s take the HOC `withHandlerClick`. To improve the creation of this HOC, we can use Recompose’s `withHandlers` method.

```js
import { withHandlers } from "recompose";

const withHandlerClick = withHandlers({
  handleClick: props => e => {
    let { times, onClick, setTimes } = props;
    e.preventDefault()
    setTimes( ++times );
    onClick && onClick();
  }
})
```

The `withHandlers` method takes an object map of handler creators. Each one of the properties of this object passed to `withHandlers` should be a higher-order function that accepts a set of props and returns a function handler. In this way we can generate a handler that will have access to the `props` of the component.

### `setDisplayName`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components."
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#setdisplayname"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

In our example, if we debug the code with the [<FontIcon icon="fa-brands fa-chrome"/>React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) the component returned by `withDisplayTrack` is displayed as `Unknown`.

To fix this, we can use Recompose’s `setDisplayName` to `export` a final HOC that will return a component with the name `ComponentWithDisplayTrack`.

```js
export default compose(
  setDisplayName('ComponentWithDisplayTrack'),
  withDisplayTrack
);
```

### `lifecycle`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components."
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

With the method `lifecycle` we can add lifecycle methods to our functional-syntax components.

In our scenario we could add a different version of Button that display the number of pending messages.

We can create a HOC that returns a different view of our button using a `messages` props:

```jsx
import React from "react";
import { compose, setDisplayName } from "recompose";

const withDisplayMessages = WrappedComponent => props => {
  const { children, messages, loading, ..._props } = props;
  return (
    <WrappedComponent {..._props}>
      {children}
      {loading ? (
        <span className="fas fa-spinner fa-pulse"> </span>
      ) : (
        <span className="badge badge-light">{messages}</span>
      )}
    </WrappedComponent>
  );
};

export default compose(
  setDisplayName("withDisplayMessages"),
  withDisplayMessages
);
```

And we can add a `componentDidMount` lifecycle method to our component that will add:

- A `loading` state set to `true` when our fake request starts and set to `false` when it finishes
- A `messages` state, which value will be updated with the random number returned by our fake request

Both `loading` and `messages` states managed here will add one new prop each to the returned component that will be used to propagate the corresponding values:

```jsx
import { lifecycle } from "recompose";

const getPendingMessages = () => {
  const randomNumber = Math.ceil(Math.random() * 10);
  return new Promise(resolve => {
    setTimeout(() => resolve(randomNumber), randomNumber * 1000);
  });
};

const withDidMountStateMessages = lifecycle({
  componentDidMount() {
    this.setState({ loading: true });
    getPendingMessages().then(messages => {
      this.setState({ loading: false, messages });
    });
  }
});

export default withDidMountStateMessages;
```

With these new HOCs, we can now quickly create our new type of `Button`:

```js
const ButtonWithMessages = compose(
  withDidMountStateMessages, 
  withDisplayMessages
)(Button)
```

### `defaultProps`

<SiteInfo
  name="recompose/docs/API.md at master · acdlite/recompose"
  desc="A React utility belt for function components and higher-order components."
  url="https://github.com/acdlite/recompose/blob/master/docs/API.md#defaultprops"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f61e0300d7b95e5c062fb7d7b033293b1d413a2fe04015a2e01efaa5fc0f6dc/acdlite/recompose"/>

With these HOCs, we can transfer these new behaviors into a link with very few lines. And we can add the `defaultProps` to change the default type of the link.

```js
const LinkWithMessages = compose(
  defaultProps({ type: "info" }),
  withDidMountStateMessages,
  withDisplayMessages
)(Link);
```

---

## Conclusions

With these methods we can finish our demo by easily creating another version of `Button` (just to show the flexibility of this pattern) that track the clicks from three to zero, and adds another `prop` so we can change the `type` when the countdown reaches zero.

```js
const ButtonWithTrackCountdown = compose(
  withState('times', 'setTimes', 3),
  withState('type', 'setType', 'primary'),
  withHandlers({
    handleClick: props => e => {
      let { times, onClick, setTimes, setType } = props;
      e.preventDefault()
      if ( times <= 0 ) {  setType('secondary') }
      else { setTimes( --times ) }
      onClick && onClick();
    }
  }),
  withDisplayTrack
)(Button)
```

As you can see, with Recompose it is easier to delegate the logic into small higher-order components and then *compose* them into a more complex HOC that we can use to create different versions of our components reusing most of our code.

Also, Recompose discourage the use of `Class` syntax for creating components and encourage the use of functional stateless components combined with higher components.

The most important advantages of using only function components are:

- They encourage code that is more reusable and modular
- They discourage giant, complicated components that do too many things

Basically, once you get how Recompose methods work, it simplifies the development and organization of React components.

There are a [lot more of methods (<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose/blob/master/docs/API.md) that can be used to generate more higher-order components in an easier way.

In the [official repo (<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose), you can find some [Recompose recipes (<FontIcon icon="iconfont icon-github"/>`acdlite/recompose`)](https://github.com/acdlite/recompose/wiki/Recipes) that can be useful to your project.

Also, here you have the code used in this post and a live demo of the result.

So, now that you know a bit more about *Recompose*… What is your first impression? Do you think is a good way to go when creating components?

My opinion is… that I like it! I really like the patterns encouraged by Recompose oriented to the creation of small and simple pieces (components and HOCs) that can be used to create more complex ones in an easy-to-read way and that are functional programming-oriented.

Well, that’s my opinion. What’s yours?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Recompose to write clean higher-order components",
  "desc": "Learn how Recompose methods can help create cleaner HOCs and how it simplifies the development and organization of React components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-recompose-to-write-clean-higher-order-components-3019a6daf44c.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
