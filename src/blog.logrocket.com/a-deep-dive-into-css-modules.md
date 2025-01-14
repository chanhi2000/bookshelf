---
lang: en-US
title: "A deep dive into CSS Module"
description: "Article(s) > A deep dive into CSS Module"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A deep dive into CSS Module"
    - property: og:description
      content: "A deep dive into CSS Module"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/a-deep-dive-into-css-modules.html
prev: /programming/css/articles/README.md
date: 2021-06-07
isOriginal: false
author:
  - name: Lawrence Eagles
    url : https://blog.logrocket.com/author/lawrenceoputa/
cover: /assets/image/blog.logrocket.com/a-deep-dive-into-css-modules/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A deep dive into CSS Module"
  desc="Automate tedious naming methods using CSS Module, an extra layer of abstraction that locally scopes class names."
  url="https://blog.logrocket.com/a-deep-dive-into-css-modules"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/a-deep-dive-into-css-modules/banner.png"/>

## Introduction

According to the [official CSS Module GitHub repository (<FontIcon icon="iconfont icon-github"/>`css-modules/css-modules`)](https://github.com/css-modules/css-modules), a CSS Module is a CSS file in which all class names and animation names are scoped locally by default. By contrast, in a typical CSS file, all CSS selectors live in the global scope.

![CSS Module Deep Dive](/assets/image/blog.logrocket.com/a-deep-dive-into-css-modules/banner.png)

In this tutorial, we’ll look into some common issues that frequently arise when writing CSS and learn how CSS Module can help us avoid them. Then, we’ll integrate CSS Module into a React application.

Let’s get started!

::: note Prerequisites

- Knowledge of HTML and CSS
- Working knowledge of React

:::

Familiarity with CSS Module is an added bonus!

---

## Understanding common CSS issues

All selectors in CSS are global variables. As an application scales, working with global variables and managing dependencies becomes increasingly difficult. When several developers are working on the app, things become even trickier.

Here’s why:

### Name collision

Let’s say that while styling a blog, we add the class name `post` to indicate posts on the homepage. Another developer creates the sidebar and also adds the class name `post` for posts on the sidebar. Mistakes like this lead to name collision, seen here:

```css title="styles.css"
.main .post {
  color: #000000;
  font-size: 2rem;
}

.sidebar .post {
  color: #FFFFFF;
  font-size: 1rem;
}
```

​​As an application scales, you’re more likely to encounter name collision (potentially harming performance). 

### Difficulty in clearing dead codes

When an element or a React component is deleted from our code, we also need to delete its styles. However, in large applications, it can be very hard to determine whether a class is in use. CSS does not provide a solution out of the box.

### Dependency management

Dependencies are not explicitly defined when working with global variables, making it difficult to determine which styles would be inherited or applied through [composition (<FontIcon icon="iconfont icon-github"/>`css-modules/css-modules`)](https://github.com/css-modules/css-modules#composition).

There are other implicit dependencies in CSS that are not easily identified by merely scanning the code. For example, an element with `position: absolute` is relative to its parent element with `position: relative`.

Dependencies are a huge cause of concern, and the ease of maintaining our CSS code depends greatly on how well our dependencies are structured.

---

## Evaluating solutions

[<FontIcon icon="fas fa-globe"/>BEM — Block Element Modifier](http://getbem.com/) is a popular naming convention for classes in HTML and CSS that aims to help developers understand the relationship between both languages. BEM solves the problems described above by providing strict naming rules.

In BEM, a `Block` is a standalone element that can make sense on its own; it is often a parent element like `.btn{}`. An `Element` refers to the child element of a `Block`; it has no standalone meaning and is denoted by two underscores following the name of the `Block` (e.g., `.btn__text`).

The modifier is a flag on the `Block` or `Element` used to style it. It is denoted by two hyphens to the name of the `Block` or `Element` (e.g., `.btn--primary {}`).

```css
/* Block Element */
.btn {}

/* Element that depends on the Block often a child element */
.btn__text {
  // rules
}

/* Modifiers that changes the styles of the block */
.btn--primary {}
.btn--small {}
```

The benefit of the BEM naming methodology is that all selectors are scoped by the modifiers despite being global. However, adding BEM naming manually is repetitive, fairly tedious, and prone to human error.

You may end up spending a significant amount of time figuring out whether something is a `Block` or `Element`. In my opinion, [Jeremy Thomas (<FontIcon icon="fa-brands fa-x-twitter"/>`jgthms`)](https://x.com/jgthms), the creator of [<FontIcon icon="fas fa-globe"/>Bulma CSS](https://bulma.io/), perfectly summarizes the issue:

![Bulma CSS Jeremy Thomas CSS Time Writing Graph](/assets/image/blog.logrocket.com/a-deep-dive-into-css-modules/bulma-css-jeremy-thomas-css-time-writing-.avif)

Development involves automating difficult problems, so we should be able to easily automate naming with the right tool.

::: note

Although CSS Module enables us to scope our styles, we can still declare global classes by prefixing the class name with `:global`:

```css
:global .title {
  font-size: 2rem;
}
```

:::

---

## Advantages of CSS Module

Most modern JavaScript and CSS workflows have trended towards component-based architecture, but progress on CSS has been purely conventional and not actually supported by the language.

BEM, as previously discussed, is a perfect example. A familiar saying known as the [<FontIcon icon="fa-brands fa-wikipedia-w"/>fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Indirection) declares that “every problem in computer science can be solved by one extra layer of abstraction”.

CSS Module is a thin layer of abstraction that encapsulates new concepts introduced to the language. Consequently, CSS Module is written just like plain CSS, as seen in the following code snippet:

```css title="styles.css"
.title {
  font-size: 2rem;
  font-weight: bold;
  color: red;
}
.text {
  font-size: 1.2rem;
  font-weight: 500;
  color: blue;
}
```

One difference is that in CSS Module, all our markup is written in a JavaScript file like <FontIcon icon="fa-brands fa-js"/>`index.js`:

```js title="index.js"
import styles from "./styles.css";

document.getElementById("app").innerHTML = `
  <h1 class=${styles.title}>Hello Vanilla!</h1>
  <div class=${styles.text}>
    We use the same configuration as Parcel to bundle this sandbox, you can find more
    info about Parcel 
  </div>
`;
```

When we import our CSS Module from our <FontIcon icon="fa-brands fa-js"/>`index.js` file, CSS Module exports an object with mappings from local names to global names:

```js
{
  title: "_src_styles__title",
  text: "_src_styles__text"
}
```

::: sandpack#vanilla hardcore-browser-me8ox [rtl theme=dark]

@file /styles.css

```css
.title {
  font-size: 2rem;
  font-weight: bold;
  color: red;
}

.text {
  font-size: 1.2rem;
  font-weight: 500;
  color: blue;
}
```

@file /index.js

```js
import styles from "./styles.css";

document.getElementById("app").innerHTML = `
<h1 class=${styles.title}>Hello Vanilla!</h1>
<div class=${styles.text}>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
</div>
`;
```

@file /index.html

```html
<div id="app"></div>
```

:::

<!-- https://codesandbox.io/p/sandbox/hardcore-browser-me8ox -->

We can see that CSS Module dynamically generates unique class names, automating naming for our whole team.

---

## How CSS Module works

Modern tooling like webpack, Browsify, and JSPM enables us to explicitly define cross-language dependencies. Consequently, we can explicitly describe each file’s dependencies, regardless of the type of source file.

In the code snippet below, whenever `MyComponent` is loaded or bundled, the corresponding CSS is loaded just like any other dependency:

```jsx title="MyComponent.jsx"
import './my-component-name.css';

const MyComponent = () => {
  // component codes
}
export default MyComponent;
```

CSS Module includes this new technique, which is the key capability of modern loaders. However, at the fundamental level, there is a need for a new specification to describe how these symbols are shared.

### Understanding ICSS

Although CSS Module is written like plain CSS, it actually compiles to a low-level interchangeable format called ICSS [(Interoperable CSS (<FontIcon icon="iconfont icon-github"/>`css-modules/icss`)](https://github.com/css-modules/icss) that is designed for loader implementers, not end-users. It is a superset of standard CSS and a low-level file format that enhances CSS.

You can incorporate CSS Module into a [wide range of applications (<FontIcon icon="iconfont icon-github"/>`css-modules/css-modules`)](https://github.com/css-modules/css-modules/blob/master/docs/get-started.md#setting-up-css-modules), however, we’ll style a React app.

---

## Styling a React application with CSS Module

[Create React App v2 (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app) (and higher) support CSS Module out of the box. All we have to do is use the following naming convention:

```output title="file"
[name].module.css
```

Let’s see it in action by building a simple React app! First, let’s bootstrap and run our application:

```sh
npx create-react-app button-stack
cd botton-stack
npm start
```

Next, we’ll add CSS module support for our app by simply renaming the <FontIcon icon="fa-brands fa-css3-alt"/>`App.css` file to <FontIcon icon="fa-brands fa-css3-alt"/>`App.module.css`. Update the import statement in the <FontIcon icon="fa-brands fa-react"/>`App.js` file to avoid error:

```css title="App.module.css"
.shadow {
  box-shadow: rgba(50, 50, 50, 0.2) 0 5px 5px 0;
}
.app {
  display: flex;
  justify-content: space-around;
}
.title {
  margin-top: 25%;
  text-align: center;
}
```

Update the <FontIcon icon="fa-brands fa-css3-alt"/>`Index.css` file to <FontIcon icon="fa-brands fa-css3-alth"/>`Index.module.css`, as well as the import statement in the `Index.js` file. Next, in our <FontIcon icon="fa-brands fa-react"/>`App.js` file, add the following code:

```jsx title="App.jsx"
import { title, app } from './App.module.css';
import Button from './components/Button';

function App() {
  return (
    <div>
      <h1 className={title}>CSS Module Buttons</h1>
      <article className={app}>
        <Button />
      </article>
    </div>
  );
}

export default App;
```

Though most of this code should be familiar, there are a few things we need to look out for. First, we are destructuring `title` and `app`. The styles we need are from the `styles` object, which is exported by CSS Module.

Now, we’ll need to create the `Button component`. In the `src` directory, create a `components` folder. Inside the folder, create a <FontIcon icon="fa-brands fa-react"/>`Button.js` and a <FontIcon icon="fa-brands fa-css3-alt"/>`Button.module.css` file; add the following code in the <FontIcon icon="fa-brands fa-css3-alt"/>`Button.module.css` file:

```css :collapsed-lines title="Button.module.css"
.normal-button {
  display: inline-flex;
  line-height: 2;
  text-align: center;
  padding: 1px 60px;
  font-family: "IBM Plex Sans";
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  composes: shadow from "../App.module.css"
}

.danger {
  composes: normal-button;
  background-color: rgb(255, 8, 8);
  border: 2px solid rgb(255, 8, 8);
  color: white;
}

.secondary {
  composes: normal-button;
  background-color: rgb(128, 118, 118);
  border: 2px solid rgb(128, 118, 118);
  color: white;
}

.info {
  composes: normal-button;
  background-color: rgb(6, 218, 255);
  border: 2px solid rgb(6, 218, 255);
  color: white;
}

.warning {
  composes: normal-button;
  background-color: rgb(248, 202, 49);
  border: 2px solid rgb(248, 202, 49);
  color: #ffffff;
}

.success {
  composes: normal-button;
  background-color: rgba(30, 156, 41, 0.966);
  border: 2px solid rgba(30, 156, 41, 0.966);
  color: white;
}

.primary {
  composes: normal-button;
  background-color: rgba(33, 124, 243, 0.849);
  border: 2px solid rgba(33, 124, 243, 0.849);
  color: #FFFFFF;
}
```

In this file, we have a normal button class `.normal-button` that composes the `shadow class` from the <FontIcon icon="fa-brands fa-css3-alt"/>`App.module.css`.

Composition is a feature in CSS Module that enables us to compose selectors. Consequently, we can compose a class by inheriting styles from another class, but these `composes` rules must come before other rules.

For example, the `.danger`, `.info`, `.primary`, `.warning`, and `.success` classes all inherit styles from `.normal-botton` via composition.

Our <FontIcon icon="fa-brands fa-react"/>`App.js` file should now look like the code below:

```jsx title="App.jsx"
import { title, app } from './App.module.css';
import Button from './components/Button';
function App() {
  return (
    <div>
      <h1 className={title}>CSS Module Buttons</h1>
      <article className={app}>
        <Button />
      </article>
    </div>
  );
}
export default App;
```

Our app display should look like the image here:

![CSS Module Final App](/assets/image/blog.logrocket.com/a-deep-dive-into-css-modules/css-module-final-app.png)

You can view the [full code <FontIcon icon="iconfont icon-github"/>`lawrenceagles/css-module-demo`](https://github.com/lawrenceagles/css-module-demo) for the tutorial.

---

## Conclusion

Without a doubt, CSS Module provides one of the most significant improvements to the CSS language in years! One of the best things about CSS Module is that we get to write good old CSS that can be incorporated into a variety of applications. It simply adds more power to CSS!

If your React app does not use Create React App, or it uses a version lower than version 2, you can still add support for CSS module by using the [<FontIcon icon="iconfont icon-github"/>`gajus/babel-plugin-react-css-modules`](https://github.com/gajus/babel-plugin-react-css-modules).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A deep dive into CSS Module",
  "desc": "Automate tedious naming methods using CSS Module, an extra layer of abstraction that locally scopes class names.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/a-deep-dive-into-css-modules.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
