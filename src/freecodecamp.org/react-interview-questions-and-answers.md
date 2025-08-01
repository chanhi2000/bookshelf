---
lang: en-US
title: "React Interview Questions – Interview Prep with Answers and Examples"
description: "Article(s) > React Interview Questions – Interview Prep with Answers and Examples"
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
      content: "Article(s) > React Interview Questions – Interview Prep with Answers and Examples"
    - property: og:description
      content: "React Interview Questions – Interview Prep with Answers and Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-questions-and-answers.html
prev: /programming/js-react/articles/README.md
date: 2022-06-07
isOriginal: false
author: Joel Olawanle
cover: https://freecodecamp.org/news/content/images/2022/06/cover-template.jpg
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
  name="React Interview Questions – Interview Prep with Answers and Examples"
  desc="By Joel Olawanle React is a JavaScript library for creating user interfaces. It's used in over 30,000 live websites and has over 70,000 GitHub stars.  According to the 2021 Stack Overflow developer survey, React has surpassed jQuery as the most popul..."
  url="https://freecodecamp.org/news/react-interview-questions-and-answers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/06/cover-template.jpg"/>

React is a JavaScript library for creating user interfaces. It's used in over 30,000 live websites and has over 70,000 GitHub stars.

According to the [<FontIcon icon="fas fa-globe"/>2021 Stack Overflow developer survey](https://insights.stackoverflow.com/survey/2021#section-most-popular-technologies-web-frameworks), React has surpassed jQuery as the most popular web framework, and holds approximately 40.14% of the market share. React was also the most sought-after, with one out of every four developers using it.

Over 8,000 industry leaders, including LinkedIn, Twitter, and AirBnB, use React.

A React developer's average annual salary in the United States is $120,000. Many businesses and companies use React, which forces them to constantly look for new talent.

In this article, we will go over some React basics and then look at some interview questions and their proper answers to help you succeed in any React interview you may have.

---

## What is React?

React is an open-source front-end JavaScript library for creating user interfaces. It is declarative, efficient, and flexible, and it adheres to the component-based approach, which allows us to create reusable UI components.

Developer primarily use React to create Single Page Applications and the library focuses solely on the view layer of MVC. It is also extremely fast.

---

## Features of React

React has many features that set it apart, but here are a few highlights:

- React employs the Virtual DOM as opposed to a real/browser DOM.
- React uses unidirectional one-way data binding.
- It is used to develop web applications as well as mobile applications using [<FontIcon icon="fa-brands fa-react"/>React Native](https://reactnative.dev/), which allows us to build cross-platform applications.

---

## How to Start a New Project in React

We can create a React app from scratch by initalizing a project and installing all dependencies. But the easiest way is by using [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) via the command below:

```sh
npx create-react-app my-app
```

::: note

`my-app` is the name of the application we are creating, but you can change it to any name of your choice.

:::

You can read more on how to [get started with React in this article](https://freecodecamp.org/news/get-started-with-react-for-beginners/).

---

## What Does DOM Stand For?

The term "DOM" stands for **D**ocument **O**bject **M**odel and refers to the representation of the entire user interface of a web application as a tree data structure.

### Types of DOM

We have two types of DOM which are the Virual DOM and the Real DOM.

---

## Advantages and Disadvantages of React

Here are some of the advantages and disadvantages of React:

### Advantages of React

1. It has a shorter learning curve for JavaScript developers and a large number of manuals, tutorials, and training materials are available because of its active community.
2. React is search engine friendly
3. It makes it easier to create rich UI and custom components.
4. React has quick rendering
5. The use of JSX allows us to write code that is simpler, more appealing, and easier to understand.

### Disadvantages of React

1. Because React is a frontend library, other languages and libraries are required to build a complete application.
2. It can be difficult for inexperienced programmers to understand because it employs JSX.
3. Existing documentation is quickly out of date due to the short development cycles.

---

## What is JSX?

JavaScript XML is abbreviated as JSX. JSX enables and simplifies the creation of HTML in React, resulting in more readable and understandable markup.

For example:

```jsx
const App = () => {
  return (
    <div>
       <h1>Hello World</h1>
    </div>
  )
}
```

You can read more about [JSX in React in this article](/freecodecamp.org/jsx-in-react-introduction.md).

```component VPCard
{
  "title": "JSX in React – Explained with Examples",
  "desc": "JSX is one of the core concepts of React. So if you understand it well, you'll be able to write better React code. In this article, we'll explore: What is JSX in React and how to use it How JSX is transformed to React.createElement What is a JSX exp...",
  "link": "/freecodecamp.org/jsx-in-react-introduction.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Why can't Browsers Read JSX?

JSX is not a valid JavaScript code, and there is no built-in implementation that allows the browser to read and understand it. We need to transpile the code from JSX into valid JavaScript code that the browser can understand, and we use [<FontIcon icon="fas fa-globe"/>Babel](https://babeljs.io/), a JavaScript compiler/transpiler, to accomplish this.

::: note

[<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`](https://github.com/facebook/create-react-app) uses Babel internally for the JSX to JavaScript conversion, but you can also set up your own babel configuration using Webpack.

:::

You can read more about [JSX in React in this article](/freecodecamp.org/jsx-in-react-introduction.md).

```component VPCard
{
  "title": "JSX in React – Explained with Examples",
  "desc": "JSX is one of the core concepts of React. So if you understand it well, you'll be able to write better React code. In this article, we'll explore: What is JSX in React and how to use it How JSX is transformed to React.createElement What is a JSX exp...",
  "link": "/freecodecamp.org/jsx-in-react-introduction.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## What are Components?

A component is a self-contained, reusable code block that divides the user interface into smaller pieces rather than building the entire UI in a single file.

There are two kinds of components in React: functional and class components.

### What is a Class Component?

Class components are ES6 classes that return JSX and necessitate the use of React extensions. Because it was not possible to use state inside functional components in earlier versions of React (16.8), functional components were only used for rendering UI.

Example:

```jsx
import React, { Component } from 'react'
export default class App extends Component {
  render() {
    return (
      <div>
         <h1>Hello World</h1>
      </div>
    )
  }
}
```

Read more about React [components and the types of components](https://freecodecamp.org/news/react-components-jsx-props-for-beginners/) in this article.

### What is a Functional Component?

A JavaScript/ES6 function that returns a React element is referred to as a functional component (JSX).

Since the introduction of React Hooks, we have been able to use states in functional components, which has led to many people adopting them due to their cleaner syntax.

Example:

```jsx
import React from 'react'
const App = () => {
  return (
    <div>
       <h1>Hello World</h1>
    </div>
  )
}
export default App;
```

Read more about React [components and the types of components](https://freecodecamp.org/news/react-components-jsx-props-for-beginners/) in this article.

### Difference between Functional and Class components

<table><tbody><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4"><strong> &nbsp;Functional Components &nbsp; &nbsp; </strong></span><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4"><strong>&nbsp;Class Components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong></span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">A functional component is a JavaScript/ES6 function that takes an argument, props, and returns JSX.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">You must extend from React in order to use a class component. Create a component and a render function that returns a React element.</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">There is no render method used in functional components.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">It must have the render() method returning JSX</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">Functional components run from top to bottom and cannot be kept alive once the function is returned.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">The class component is instantiated, and various life cycle methods are kept alive and are run and invoked depending on the phase of the class component.</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">They are also known as stateless components because they only accept data and display it in some form, and they are primarily responsible for UI rendering.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">They are also referred to as Stateful components because they implement logic and state.</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">React lifecycle methods cannot be used in functional components.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">React lifecycle methods can be used inside class components.</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">Hooks like </span><span class="inline-code author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4"><span>useState()</span></span><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4"> were created to be used in functional components to make them Stateful.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">It requires different syntax inside a class component to implement hooks.</span></div></td></tr><tr><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">Constructors are not used.</span></div></td><td><div class="ace-line gutter-author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4 ace-ltr"><span class=" author-d-1gg9uz65z1iz85zgdz68zmqkz84zo2qowz82zpihz77zcerkden8iz78zz86zz75zz66zz71z0z85zz87zz69zqrz72zz85z0z77zz81z4">Constructor are used as it needs to store state.&nbsp;</span></div></td></tr></tbody></table>

---

## How to Use CSS in React

There are 3 ways to style a react application with CSS:

- Inline Styles
- External Styling
- CSS in JS

Read more on [how to style a React application in this article](https://freecodecamp.org/news/how-to-style-react-apps-with-css/).

---

## What is the Use of render() in React?

`Render()` is used in the class component to return the HTML that will be displayed in the component. It is used to read props and state and return our JSX code to our app's root component.

---

## What are Props?

Props are also referred to as properties. They are used to transfer data from one component to the next (parent component to child component). They are typically used to render dynamically generated data.

Note: A child component can never send props to a parent component since this flow is unidirectional (parent to child).

Example:

```jsx
function App({name, hobby}) {
    return (
      <div>
        <h1>My name is {name}.</h1>
        <p>My hobby is {hobby}.</p>
      </div>
    );
}

export default App;
```

Read more about [how props works in React here](https://freecodecamp.org/news/how-to-use-props-in-react/).

---

## What is State in React?

State is a built-in React Object that is used to create and manage data within our components. It differs from props in that it is used to store data rather than pass data.

State is mutable (data can change) and accessible through `this.state()`.

Example:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John Doe"
    };
  }

  render() {
    return (
      <div>
        <h1>My name is {this.state.name}</h1>
      </div>
    );
  }
}
```

---

## How to Update the State of a Component in React

It is important to know that when we update a state directly it won’t re-render the component – meaning we don’t get to see the update.

If we want it to re-render, then we have to use the `setState()` method which updates the component’s state object and re-reders the component.

Example:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John Doe"
    };
  }
  changeName = () => {
    this.setState({name: "Jane Doe"});
  }
  render() {
    return (
      <div>
        <h1>My {this.state.name}</h1>
        <button
          type="button"
          onClick={this.changeName}
        >Change Name</button>
      </div>
    );
  }
}
```

You can learn more [here](https://freecodecamp.org/news/react-js-for-beginners-props-state-explained/).

---

## How to Differentiate Between State and Props

State and props are JavaScript objects with distinct functions.

Props are used to transfer data from the parent component to the child component, whereas state is a local data storage that is only available to the component and cannot be shared with other components.

---

## What is an Event in React?

In React, an event is an action that can be triggered by a user action or a system generated event. Mouse clicks, web page loading, key press, window resizes, scrolls, and other interactions are examples of events.

Example:

```jsx
// For class component
<button type="button" onClick={this.changeName} >Change Name</button>

// For function component
<button type="button" onClick={changeName} >Change Name</button>
```

---

## How to Handle Events in React

Events in React are handled similarly to DOM elements. One difference we must consider is the naming of our events, which are named in camelCase rather than lowercase.

Example:

### Class Component

```jsx
class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('This button was Clicked');
  }
  render() {
    return (
      <div>
         <button onClick={this.handleClick}>Click Me</button>
      </div>
   );
  }
}
```

### Function Component

```jsx
const App = () => {
   const handleClick = () => {
      console.log('Click happened');
   };
   return (
      <div>
         <button onClick={handleClick}>Click Me</button>
      </div>
   );
};
export default App;
```

---

## How to Pass Parameters to an Event Handler

In functional components, we can do this:

```jsx
const App = () => {
   const handleClick = (name) => {
      console.log(`My name is ${name}`);
   };
   return (
      <div>
         <button onClick={() => handleClick('John Doe')}>Click Me</button>
      </div>
   );
};
export default App;
```

And in class components we can do this:

```jsx
class App extends React.Component {
  call(name) {
    console.log(`My name is ${name}`);
  }
  render() {
    return (
      <button onClick= {this.call.bind(this,"John Doe")}>
        Click the button!
      </button>
    );
  }
}
export default App;
```

---

## What is Redux?

Redux is a popular open-source JavaScript library for managing and centralizing application state. It is commonly used with React or any other view-library.

Learn more about [redux here](https://freecodecamp.org/news/redux-tutorial-for-beginners/#:~:text=Redux%20is%20a%20popular%20open,you%20how%20to%20use%20Redux.).

---

## What are React Hooks?

React hooks were added in v16.8 to allow us to use state and other React features without having to write a class.

They do not operate within classes, but rather assist us in hooking into React state and lifecycle features from function components.

### When Did We Begin to Use Hooks in React?

The React team first introduced React Hooks to the world in late October 2018, during React Conf, and then in early February 2019, with React v16. 8.0. ---

## Explain the useState() Hook

The useState Hook is a store that enables the use of state variables in functional components. You can pass the initial state to this function, and it will return a variable containing the current state value (not necessarily the initial state) and another function to update this value.

Example:

```jsx
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      // ...
    </div>
  );
}
```

---

## Explain the useEffect() Hook

The useEffect Hook allows you to perform side effects in your components like data fetching, direct DOM updates, timers like setTimeout(), and much more.

This hook accepts two arguments: the callback and the dependencies, which allow you to control when the side effect is executed.

Note: The second argument is optional.

Example:

```jsx
import React, {useState, useEffect} from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return(
    <div>
      // ...
    </div>
  )
}

export default App;
```

---

## What's the Use of the useMemo() Hook?

The `useMemo()` hook is used in functional components to memoize expensive functions so that they are only called when a set input changes rather than every render.

Example:

```jsx
const result = useMemo(() => expensivesunction(input), [input]);
```

This is similar to the useCallback hook, which is used to optimize the rendering behavior of your React function components. useMemo is used to memoize expensive functions so that they do not have to be called on every render.

---

## What Is the useRefs Hook?

The `useRefs()` hook, also known as the References hook, is used to store mutable values that do not require re-rendering when they are updated. It is also used to store a reference to a specific React element or component, which is useful when we need DOM measurements or to directly add methods to the components.

When we need to do the following, we use useRefs:

- Adjust the focus, and choose between text and media playback.
- Work with third-party DOM libraries.
- Initiate imperative animations

Example:

```jsx
import React, {useEffect, useRef} from 'react';

const App = () => {
  const inputRef = useRef(null)

  useEffect(()=>{
    inputElRef.current.focus()
  }, [])

  return(
    <div>
      <input type="text" ref={inputRef} />
    </div>
  )
}

export default App;
```

---

## What are Custom Hooks?

Custom Hooks are a JavaScript function that you write to allow you to share logic across multiple components, which was previously impossible with React components.

If you're interested in learning how this works, here is a [step by step guide to help you build your own Custom React Hook](/freecodecamp.org/how-to-create-react-hooks.md).

```component VPCard
{
  "title": "How to Build Your Own React Hooks: A Step-by-Step Guide",
  "desc": "Custom React hooks are an essential tool that let you add special, unique functionality to your React applications.  In many cases, if you want to add a certain feature to your application, you can simply install a third-party library that is made to...",
  "link": "/freecodecamp.org/how-to-create-react-hooks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## What is Context in React?

Context is intended to share "global" data for a tree of React components by allowing data to be passed down and used (consumed) in whatever component we require in our React app without the use of props. It allows us to share data (state) more easily across our components.

Read more about [React Context in this guide](/freecodecamp.org/react-context-for-beginners.md).

```component VPCard
{
  "title": "React Context for Beginners – The Complete Guide (2021)",
  "desc": "React context is an essential tool for every React developer to know. It lets you easily share state in your applications. In this comprehensive guide, we will cover what React context is, how to use it, when and when not to use context, and lots mor...",
  "link": "/freecodecamp.org/react-context-for-beginners.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## What is React Router?

React router is a standard library used in React applications to handle routing and allow navigation between views of various components.

Installing this library into your React project is as simple as typing the following command into your terminal:

```sh
npm install – -save react-router-dom
```

---

## Conclusion

In this tutorial, we went over some React interview questions to help you prepare for your interviews. All of us at FreeCodeCamp wish you the best of luck and success in your interview.

Instead of attempting to take several courses at once, find a helpful tutorial and complete it if you want to learn more and master React so you can perform well in practical interview sessions. Check out freeCodeCamp's [Free React Course for 2022](/freecodecamp.org/free-react-course-2022.md) or [Learn React - Full Course for Beginners](/freecodecamp.org/learn-react-course.md).

```component VPCard
{
  "title": "Free React Course – 8 Real-World Projects and 140+ Coding Challenges",
  "desc": "React is still one of the most popular JavaScript libraries for building user interfaces. If you are a front-end developer, it is super helpful to know React. We just published a brand-new, 12-hour React course on the freeCodeCamp.org YouTube channel...",
  "link": "/freecodecamp.org/free-react-course-2022.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Learn React - Full Course for Beginners",
  "desc": "Learn all the basics to build dynamic, interactive web applications with the React JavaScript library in this full course from Bob Ziroll (@bobziroll). Upon completion of this course, you'll know everything you need in order to build web applications...",
  "link": "/freecodecamp.org/learn-react-course.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Interview Questions – Interview Prep with Answers and Examples",
  "desc": "By Joel Olawanle React is a JavaScript library for creating user interfaces. It's used in over 30,000 live websites and has over 70,000 GitHub stars.  According to the 2021 Stack Overflow developer survey, React has surpassed jQuery as the most popul...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-questions-and-answers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
