---
lang: en-US
title: "Code Splitting with React Suspense"
description: "Article(s) > Code Splitting with React Suspense"
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
      content: "Article(s) > Code Splitting with React Suspense"
    - property: og:description
      content: "Code Splitting with React Suspense"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/react-code-splitting-with-react-suspense.html
prev: /programming/js-react/articles/README.md
date: 2018-12-14
isOriginal: false
author: joshtronic
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
  name="Code Splitting with React Suspense"
  desc="In this article you will learn how to use React Suspense to code split and lazy load React components. "
  url="https://digitalocean.com/community/tutorials/react-code-splitting-with-react-suspense"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

`React.Suspense`, along with `React.lazy()`, introduced in v16.6, adds new functionality that allows components to wait for something before actually rendering. This new ability makes code splitting and lazy loading of React components a breeze!

---

## Getting Started

To get started, you will need to make sure you are on React v16.6 or higher. If you’re starting a new project, or if you’re working with an older project that’s not on the correct version, simply:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install --save react react-dom
```

@tab <VPIcon icon="fa-brands fa-yarm"/>

```sh
yarn add react react-dom
```

:::

And then within the component you’d like to handle lazy loading of other components, import both `Suspense` and `lazy`:

```jsx
import React, { lazy, Suspense } from 'react';
```

---

## About Code Splitting

It’s worth pointing out that while `Suspense` and `lazy` allows you to lazy load components quickly and easily, you may not see much benefit out of the gate if you are bundling your entire application up into a single script with something like Webpack.

While out of scope for this article, you can read up on code splitting with Webpack in the [<VPIcon icon="iconfont icon-webpack"/>Webpack documentation](https://webpack.js.org/guides/code-splitting/).

---

## `React.lazy()`

The `lazy()` method takes a function as the first parameter which is expected to `import` another component, like so:

```jsx
const SomeComponent = lazy(() => import('./SomeComponent');
```

Because the `import` is inside of a function passed to `lazy()`, the loading of the component won’t happen until we actually use the component, instead of being eagerly loaded with the other imports at the top of your file.

---

## `React.Suspense`

The `React.Suspense` component allows us to wrap a component up and specify a `fallback` component which will be shown while the wrapped component loads:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <SomeComponent />
</Suspense>
```

This is especially beneficial when you are loading components that are either on the large side, or happens to `import` large libraries (like `react-pdf` or `react-draft-wysiwyg`).

Even if your components aren’t in the heavyweight division, lazy loading can help out your end users that may not have the best Internet connection.

---

## Putting It All Together

To really get a feel for using `React.Suspense` and `React.lazy()` we are going to need two separate files. One is just our basic React app boilerplate, and the other is our component that will be lazy loaded.

Let’s start with the component we’re going to `import`. For this example, I’ve created a very simple component that loads the always dapper [<VPIcon icon="fas fa-globe"/>Alligator.io](http://Alligator.io) logo:

```jsx title="AlligatorioLogo.jsx"
import React from "react";

function AlligatorioLogo() {
  const imageSource = "https://uploads.codesandbox.io/uploads/user"
    + "/39d6d9f6-60d2-4a60-9eb7-9250c3417bef"
    + "/saY6-alligatorio-logo.png";

  return (
    <img
      alt="Alligator.io Logo"
      src={imageSource}
      width="250"
    />
  );
}

export default AlligatorioLogo;
```

Next up is our App’s boilerplate code and a small bit of state logic so that we can manually trigger the loading of our component:

```jsx :collapsed-lines title="App.jsx"
import React, { Component, Fragment, lazy, Suspense } from "react";
import { render } from "react-dom";

import "./styles.css";

const AlligatorioLogo = lazy(() => import("./AlligatorioLogo"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogo: false
    };
  }

  onClick = () => {
    this.setState({ showLogo: !this.state.showLogo });
  };

  render() {
    return (
      <div className="App">
        <h1>React.lazy() + &lt;React.Suspense /&gt; Demo</h1>
        <div>
          <button onClick={this.onClick}>
            {this.state.showLogo &&
              <Fragment>Click to Hide the Logo</Fragment>
            }
            {!this.state.showLogo && (
              <Fragment>Click to Show the Logo</Fragment>
            )}
          </button>
        </div>
        <hr />
        {this.state.showLogo && (
          <Suspense fallback={<div>Loading...</div>}>
            <AlligatorioLogo />
          </Suspense>
        )}
      </div>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
```

As you can see, there’s really not much to using `Suspense` and `lazy()`. Because of how simple it is, it shouldn’t be much of a burden to port existing systems to it, especially if you’re already splitting out your components into separate files.

---

## Conclusion

The introduction of `React.lazy()` and `React.Suspense` is a wonderful step forward in helping to reduce the amount of boilerplate code you need to write to build a modern web application.

While already quite powerful, `Suspense` isn’t without it’s shortcomings. The big missing piece, which is on the React Roadmap for a future v16 point release, is the ability to use `Suspense` with data fetching.

Once this data fetching functionality is available, `Suspense` will be able to wait for things like AJAX calls and show the fallback component while it loads.

It’s also worth noting that `Suspense` isn’t quite ready for use with server-side rendering.

If you’re ready to give `React.Suspense` and `React.lazy()` a spin, you can head on over to [<VPIcon icon="iconfont icon-codesandbox"/>CodeSandbox](https://codesandbox.io/s/zky05x6r6x) to see the code from this article in action!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Code Splitting with React Suspense",
  "desc": "In this article you will learn how to use React Suspense to code split and lazy load React components. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/react-code-splitting-with-react-suspense.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
