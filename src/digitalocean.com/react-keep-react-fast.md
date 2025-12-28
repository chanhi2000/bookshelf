---
lang: en-US
title: "5 Tips to Improve the Performance of Your React Apps"
description: "Article(s) > 5 Tips to Improve the Performance of Your React Apps"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 5 Tips to Improve the Performance of Your React Apps"
    - property: og:description
      content: "5 Tips to Improve the Performance of Your React Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/react-keep-react-fast.html
prev: /programming/js-react/articles/README.md
date: 2020-03-08
isOriginal: false
author: William Le
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  name="5 Tips to Improve the Performance of Your React Apps"
  desc="Here’s an up-to-date (March 2020) guide on performance optimization for React apps. We’ll cover things such as memo, PureComponent, React.lazy and Suspense."
  url="https://digitalocean.com/community/tutorials/react-keep-react-fast"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

Has your React app been feeling kinda sluggish? Are you afraid of turning on the “paint flash” in Chrome DevTools because of what you might see? Try out these 5 performance tips!

This article contain 5 performance tips for React development. You can use this table of contents to navigate quickly around this article.

---

## Use memo and PureComponent

Consider this simplistic React app below. Do you think that `<ComponentB>` will re-render if only `props.propA` changes value?

```jsx
import React from 'react';

const MyApp = (props) => {
  return (
    <div>
      <ComponentA propA={props.propA}/>
      <ComponentB propB={props.propB}/>
    </div>
  );
};

const ComponentA = (props) => {
  return <div>{props.propA}</div>
};

const ComponentB = (props) => {
  return <div>{props.propB}</div>
};
```

The answer is YES! This is because `MyApp` is actually re-evaluated (or re-rendered 😏) and `<ComponentB>` is in there. So even though its own props didn’t change, it’s parent component causes it to re-render.

This concept also applies to `render` methods for Class-based React components.

The authors of React perceived this wouldn’t always be the desired result, and there would be some easy performance gains by simply comparing old and new props before re-rendering… this is essentially what [**React.memo**](/digitalocean.com/react-learning-react-memo.md) and React.PureComponent are designed to do!

---

Let’s use memo with functional components, (we’ll look at Class-based components after):

```jsx
import React, { memo } from 'react';

// 🙅‍♀️
const ComponentB = (props) => {
  return <div>{props.propB}</div>
};

// 🙆‍♂️
const ComponentB = memo((props) => {
  return <div>{props.propB}</div>
});
```

That’s it! You just need to wrap `<ComponentB>` with a `memo()` function. Now it will only re-render when `propB` actually changes value regardless of how many times its parent re-renders!

---

Let’s look at PureComponent. It’s essentially equivalent to memo, but it’s for class-based components.

```jsx
import React, { Component, PureComponent } from 'react';

// 🙅‍♀️
class ComponentB extends Component {
  render() {
    return <div>{this.props.propB}</div>
  }
}

// 🙆‍♂️
class ComponentB extends PureComponent {
  render() {
    return <div>{this.props.propB}</div>
  }
}
```

These performance gains are almost too easy! You might wonder why React components don’t automatically include these internal safeguards against excessive re-rendering.

There’s actually a hidden cost with memo and PureComponent. Since these helpers compare old/new props, this can actually be its own performance bottlenecks. For example, if your props are very large, or you’re passing React components as props, the comparison of old/new props can be costly.

Silver bullets in the world of programming are rare! And memo/PureComponent aren’t an exception. You’ll definitely want to test drive them in a measured, thoughtful way. In some cases, they can surprise you how much computational savings they can yield.

For React Hooks, check out [**`useMemo`**](/digitalocean.com/react-usememo.md) as a similar way to prevent unnecessary computational work

---

## Avoid Anonymous Functions

Functions that are inside the main body of a component are usually event handlers, or callbacks. In many cases you might be tempted to use anonymous functions for them:

```jsx
import React from 'react';

function Foo() {
  return (
    <button onClick={() => console.log('boop')}> // 🙅‍♀️
      BOOP
    </button>
  );
}
```

Since anonymous functions aren’t assigned an identifier (via `const/let/var`), they aren’t persistent whenever this functional component inevitably gets rendered again. This causes JavaScript to allocate new memory each time this component is re-rendered instead of allocating a single piece of memory only once when using “named functions”:

```jsx
import React, { useCallback } from 'react';

// Variation 1: naming and placing handler outside the component 
const handleClick = () => console.log('boop');
function Foo() {
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}

// Variation 2: "useCallback"
function Foo() {
  const handleClick = useCallback(() => console.log('boop'), []);
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}
```

[<VPIcon icon="fa-brands fa-react"/>useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) is another way to avoid the pitfalls of anonymous functions, but it has similar tradeoffs that accompany `React.memo` that we covered earlier.

With class-based components, the solution is pretty easy and doesn’t really have any downsides. It’s the recommended way to define handlers in React:

```jsx
import React from 'react';

class Foo extends Component {
  render() {
    return (
      <button onClick={() => console.log('boop')}>  {/* 🙅‍♀️ */}
        BOOP
      </button>
    );
  }
}

class Foo extends Component {
  render() {
    return (
      <button onClick={this.handleClick}>  {/* 🙆‍♂️ */}
        BOOP
      </button>
    );
  }
  handleClick = () => {  // this anonymous function is fine used like this
    console.log('boop');
  }
}
```

---

## Avoid Object Literals

This performance tip is similar to the previous section about anonymous functions. Object literals don’t have a persistent memory space, so your component will need to allocate a new location in memory whenever the component re-renders:

```jsx
function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={{
        color: 'blue',     
        background: 'gold'
      }}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}
```

Each time `<ComponentA>` is re-rendered a new object literal has to be “created” in-memory. Additionally, this also means that `<ComponentB>` is actually receiving a different `style` object. Using `memo` and `PureComponent` won’t even prevent re-renders here 😭

This tip doesn’t apply to `style` props only, but it’s typically where object literals are unwittingly used in React components.

This can be easily fixed by naming the object (outside of the component’s body of course!):

```jsx
const myStyle = {  // 🙆‍♂️
  color: 'blue',     
  background: 'gold'
};
function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={myStyle}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}
``` 

---

## Use React.lazy and React.Suspense

Part of making your React app fast can be accomplished via code-splitting. This feature was introduced to React v16 with [<VPIcon icon="fa-brands fa-react"/>React.lazy and React.Suspense](https://reactjs.org/docs/code-splitting.html#reactlazy).

If you aren’t aware, the concept of code-splitting is where your JavaScript client source (eg., your React app code) is broken into smaller chunks, and only loads these chunks in a lazy fashion. Without any code-splitting a single bundle could be very large:

```plaintext
- bundle.js (10MB!)
```

Using code-splitting, this could cause the initial network request for the bundle to be significantly smaller:

```plaintext
- bundle-1.js (5MB)
- bundle-2.js (3MB)
- bundle-3.js (2MB)
```

The initial network request will “only” need to download 5MB, and it can start showing something interesting to the end user. Imagine a blog website that only needs the header, and footer initially. Once that’s loaded it’ll begin to request the 2nd bundle that contains the actual blog posts. This is a just rudimentary example where code-splitting would be handy. 👏👏👏

### How code splitting this done in React?

If you’re using [<VPIcon icon="fa-brands fa-react"/>Create React App](https://create-react-app.dev/), it’s already configured for code-splitting, so you can simply use React.lazy and React.Suspense out of the gate! If you’re configuring webpack yourself it should look [like this (<VPIcon icon="iconfont icon-github"/>`gaearon`)](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Here’s a simple example where lazy and Suspense is implemented:

```jsx
import React, { lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
const BlogPosts = React.lazy(() => import('./BlogPosts'));

function MyBlog() {
  return (
    <div>
      <Header>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPosts />
      </Suspense>
      <Footer>
    </div>
  );
}
```

Notice the `fallback` prop. This will be shown to the user immediately while the 2nd bundle chunk is loaded (eg., `<BlogPosts>`).

Check out this great article on [**with React Suspense**](/digitalocean.com/react-code-splitting-with-react-suspense.md) 🐊

---

## Avoid Frequent Mounting/Unmounting

Many times we’re used to making components disappear using a ternary statement (or something similar):

```jsx
import React, { Component } from 'react';
import DropdownItems from './DropdownItems';

class Dropdown extends Component {
  state = {
    isOpen: false
  }
  render() {
    <a onClick={this.toggleDropdown}>
      Our Products
      {
        this.state.isOpen
          ? <DropdownItems>
          : null
      }
    </a>
  }
  toggleDropdown = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
}
```

Since `<DropdownItems>` is removed from the DOM it can cause a [<VPIcon icon="fa-brands fa-google"/>repaint/reflow](https://developers.google.com/speed/docs/insights/browser-reflow) by the browser. These can be expensive, especially if it causes other HTML elements to shift around.

In order to mitigate this, it’s advisable to avoid completely unmounting components. Instead, you can use certain strategies like setting the CSS opacity to zero, or setting CSS visibility to “none”. This will keep the component in the DOM, while making it effectively disappear without incurring any performance costs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "5 Tips to Improve the Performance of Your React Apps",
  "desc": "Here’s an up-to-date (March 2020) guide on performance optimization for React apps. We’ll cover things such as memo, PureComponent, React.lazy and Suspense. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/react-keep-react-fast.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
