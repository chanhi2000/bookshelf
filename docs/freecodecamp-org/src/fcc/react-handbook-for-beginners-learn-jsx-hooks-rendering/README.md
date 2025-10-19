---
lang: en-US
title: "The React Handbook for Beginners – JSX, Hooks, and Rendering Explained"
description: "Article(s) > The React Handbook for Beginners – JSX, Hooks, and Rendering Explained"
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
      content: "Article(s) > The React Handbook for Beginners – JSX, Hooks, and Rendering Explained"
    - property: og:description
      content: "The React Handbook for Beginners – JSX, Hooks, and Rendering Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-handbook-for-beginners-learn-jsx-hooks-rendering/
prev: /programming/js-react/articles/README.md
date: 2025-10-23
isOriginal: false
author:
  - name: Oluwatobi Sofela
    url : https://freecodecamp.org/news/author/oluwatobiss/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761170169453/445fd0f5-54f9-4be5-bacf-2e6c6acd1f21.png
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
  name="The React Handbook for Beginners – JSX, Hooks, and Rendering Explained"
  desc="React is one of the most powerful and widely used libraries for building user interfaces with JavaScript. From small components to large-scale front-end and full-stack applications, React gives you the flexibility to create interactive, efficient, an..."
  url="https://freecodecamp.org/news/react-handbook-for-beginners-learn-jsx-hooks-rendering"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761170169453/445fd0f5-54f9-4be5-bacf-2e6c6acd1f21.png"/>

React is one of the most powerful and widely used libraries for building user interfaces with JavaScript. From small components to large-scale front-end and full-stack applications, React gives you the flexibility to create interactive, efficient, and modern features.

But learning React can feel overwhelming. With so many new terms, patterns, and frameworks like Next.js in the mix, it’s easy to feel lost.

That’s why this handbook focuses on React itself without unnecessary distractions. Once you’ve mastered React at its core, you’ll have the confidence to use it with or without frameworks to build anything you can imagine.

2. [What Exactly Is React?](#heading-what-exactly-is-react)
3. [How to Add a React Component to a Website](#heading-how-to-add-a-react-component-to-a-website)
4. [What Is JSX?](#heading-what-is-jsx)
5. [What Is React.createElement()?](#heading-what-is-reactcreateelement)
6. [How to Use JSX](#heading-how-to-use-jsx)
7. [Time to Practice with JSX 🤸‍♂️🏋️‍♀️🏊‍♀️](#heading-time-to-practice-with-jsx)
8. [What Is a React Component?](#heading-what-is-a-react-component)
9. [How to Render Lists of Elements from an Array](#heading-how-to-render-lists-of-elements-from-an-array)
10. [How to Handle Events in React](#heading-how-to-handle-events-in-react)
11. [What Is React State?](#heading-what-is-react-state)
12. [What Is the React Ref Hook?](#heading-what-is-the-react-ref-hook)
13. [Variables vs Refs vs States in React](#heading-variables-vs-refs-vs-states-in-react)
14. [What Is the useEffect Hook?](#heading-what-is-the-useeffect-hook)
15. [How to Style React Components](#heading-how-to-style-react-components)

::: note What You Should Already Know

You will get the most value out of this handbook if you are familiar with:

- JavaScript fundamentals (variables, functions, arrays, objects)
- Basic CSS for styling
- HTML basics for structure

If you’ve ever written a small JavaScript file or built a simple “Hello World” website, you are all set!

:::

Let’s get started with the basics.

---

## What Exactly Is React?

React is a component-based JavaScript library for efficiently building user interfaces (UI).

No matter how massive or miniature your project may be, React is well-suited to help you develop any web application efficiently.

Developers primarily use React to build independent, reusable components that can be combined with other isolated user interfaces to create highly scalable applications. For instance, the image below illustrates the individual components of YouTube’s video player page.

![An Illustration of React Components. The YouTube video player page is illustrated as a combination of independent components.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760577491945/1b0f8c61-b42e-4e3c-afdc-5804fdfa0d42.webp)

In other words, React helps you build complex UIs from small, isolated components that can easily be reused in multiple applications. Each independent component tells React the exact element you want to display on screen.

![React explained: The super flexible JavaScript library for modern frontend and full-stack app development](https://cdn.hashnode.com/res/hashnode/image/upload/v1760577104799/4592a7d2-e75b-4ae6-b1f4-65cfd8e94033.webp)

The image above illustrates React as a highly adaptable library that uses JavaScript functions to build user interfaces for both mobile and web-based applications. Let’s discuss the points highlighted in the image.

### Why the “React” name?

The name stems from the idea that React renders your UI and reacts to events in the user interface it has rendered on screen.

### Is React a framework?

No, React is a [library—not a framework](https://codesweetly.com/framework-vs-library/). React serves only as an add-on feature to your application. It’s not designed to be used as an app’s primary support system.

### Is React only for web development?

No, you don’t just use React on the web. For instance, ReactDOM helps build web applications, and React Native helps build mobile applications.

### Can React be used for full-stack applications?

Absolutely. React is super flexible. You can use it in simple HTML projects, integrate it into existing code, or build complex full-stack applications. Its adaptability makes it suitable for a wide variety of development scenarios.

### What’s the primary goal of React?

React’s primary goal is for you to use JavaScript functions to return and manage the UI (HTML element) you want to render (display) on the screen. For instance, consider the following:

```jsx
function DonationUserInterface() {
  return <button>☕ Buy me a coffee</button>;
}
```

The JavaScript function above is a React component that returns the UI (HTML button element) we want to display on screen and manage with React. In fact, let’s implement the `DonationUserInterface` component on a live website using only HTML and JavaScript – no frameworks.

---

## How to Add a React Component to a Website

Follow the steps below to add a donation UI component to a live HTML website.

### Create a new project directory

```sh
mkdir codesweetly-donation-ui-001
```

::: note

You can use any name you prefer. In this guide, we’ll use `codesweetly-donation-ui-001` for demonstration.

:::

Afterward, navigate to your project directory using the command line.

```sh
cd path/to/codesweetly-donation-ui-001
```

### Create a DOM container

To add a React component to a webpage, you first need to specify the section of the page where you want to insert the UI. So, create an HTML page:

```sh
touch index.html
```

Afterward, open the new file and add the following code:

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CodeSweetly Donation UI</title>
  </head>
  <body>
    <!-- A div container (the DOM node) created for React to manage -->
    <div id="donation-ui"></div>
  </body>
</html>
```

The snippet above created a DOM node (`<div>` element), inside which we want React to display and manage a donation user interface. In other words, the `<div>` represents the website’s section you want React to manage.

Some notes:

- The `div`’s `id` attribute is the reference we’ll later use in a JavaScript file to find the container and tell React to insert a donation UI.
- Although most developers use a `<div>` tag as the DOM container, you can use other HTML elements like the `<main>` tag.
- You can have multiple DOM containers anywhere inside the `<body>` element.
- A DOM container is usually left empty, as React will overwrite its content.

### Import React, Babel, and your component

Use script tags to load React, Babel, and your component into your project’s HTML page.

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CodeSweetly Donation UI</title>
    <!-- Load the React Library -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <!-- Load the ReactDOM API -->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Load the Babel Compiler -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="donation-ui"></div>
    <!-- Load your React component -->
    <script type="text/babel" src="DonationUserInterface.js"></script>
  </body>
</html>
```

The snippet above uses the first three script tags to load React, ReactDOM, and Babel from unpkg.com.

At the same time, we use the fourth script tag to import our donation component (which we will create in the following section).

Some notes:

- The `react` package is a library containing React’s core functionality for creating React components.
- The ReactDOM API provides the required methods to use React with the DOM.
- Babel is a compiler that transforms React code into plain JavaScript, as browsers don’t understand React syntax by default.
- The `type="text/babel"` attribute tells Babel to automatically execute and convert the <VPIcon icon="fa-brands fa-js"/>`DonationUserInterface.js` script from React code into plain JavaScript.
- The setup above is recommended for learning React only. Don’t use it for public projects (production environment). You can learn how to set up React for production in my [<VPIcon icon="fa-brands fa-amazon"/>Code React Sweetly book](https://amazon.com/dp/B0FRC4R8T3?tag=codesweetly00-20).
- The scripts will not work if your internet or `unpkg.com`’s server is down. So, if nothing renders on-screen, enter each script’s `src` URL in your browser to confirm if the server responds successfully.

### Create your component

Create a <VPIcon icon="fa-brands fa-js"/>`DonationUserInterface.js` JavaScript file inside the same folder in which your HTML file is located.

```sh
touch DonationUserInterface.js
```

Then, paste the following code inside the JavaScript file you’ve just created:

```jsx title="DonationUserInterface.js"
function DonationUserInterface() {
  const [donate, setDonate] = React.useState(false);

  function createUserInterface() {
    if (donate) {
      return (
        <p>
          <a href="https://www.buymeacoffee.com/codesweetly">Support page</a>.
          Thank you so much! 🎉
        </p>
      );
    }
    return <button onClick={() => setDonate(true)}>☕ Buy me a coffee</button>;
  }
  return createUserInterface();
}

const root = ReactDOM.createRoot(document.getElementById("donation-ui"));
root.render(<DonationUserInterface />);
```

The snippet above does the following:

1. Defines a component named `DonationUserInterface`.
2. Initializes the component’s state (built-in object) with the Boolean value `false`.
3. Programs the component to return a paragraph element if the state’s `donate` variable is `true`. Otherwise, it should return a button element.
4. Creates a `ReactDOMRoot` object instance for the `donation-ui` HTML element you want React to manage. Afterwards, it assigns the newly created instance to the `root` variable.
5. Uses the object instance’s `render()` method to display the `DonationUserInterface` component inside the root `donation-ui`.

### Configure a local server

HTML files containing [<VPIcon icon="fas fa-globe"/>ES modules](https://codesweetly.com/javascript-modules-tutorial/) work only through `http://` and `https://` URLs, not locally via a `file://` URL.

Since we previously used the `type="text/babel"` attribute to convert the <VPIcon icon="fa-brands fa-js"/>`DonationUserInterface.js` JavaScript file to an ES module, we need a local server, like “Live Server” or “Servor,” to load the HTML document via an `http://` scheme. Let’s install Servor so we can use it for this project.

#### Install the Servor local server

```sh
npm install servor@4.0.2 --save-dev
```

#### Run your app

After installing Servor, use it to start your app from your terminal:

```sh
npx servor --browse --reload
```

Some notes:

- Close the server using Ctrl + C on Windows or Cmd + C on Mac.
- `--browse`: Opens the browser once the server starts.
- `--reload`: Reloads the browser whenever you update the project’s files.
- You can also add the `servor` command to the `"scripts"` field of your project’s <VPIcon icon="iconfont icon-json"/>`package.json` file:

```json title="package.json"
{
  "scripts": {
    "start": "servor --browse --reload"
  },
  "devDependencies": {
    "servor": "^4.0.2"
  }
}
```

By doing so, you can run your app from your terminal like this:

```sh
npm run start
```

And that’s it! You’ve successfully added a React component to a live website using a JavaScript function to render a donation UI on screen! 🎉

Are you asking why we’re writing HTML inside JavaScript? Well, that HTML-like code is called JSX. Let’s learn about it.

---

## What Is JSX?

JSX is a JavaScript syntax extension that allows you to build React elements with HTML-like syntax directly inside your JavaScript code.

::: tip Tips

- JSX is sometimes called JavaScript XML or JavaScript Syntax eXtension.
- While JSX looks a lot like HTML, it’s not HTML. Instead, it enables you to use HTML-like syntax along with all the strengths of JavaScript.

:::

### Can React work without JSX?

Yes. React can work independently of JSX. But JSX makes it easier to create user interfaces (UI).

In other words, whatever you can do with JSX, you can do the same with plain JavaScript. For instance, consider the two examples below. The first includes JSX syntax, while the second is regular JavaScript syntax.

#### Example 1: Create a React element with JSX

```js title="MyBio.js"
function MyBio() {
  return <h1>My name is Oluwatobi.</h1>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyBio />);
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MyBio App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="MyBio.js"></script>
  </body>
</html>
```

In the React snippet above, `<h1>My name is Oluwatobi.</h1>` and `<MyBio />` are JSX.

::: tip

React supports the `.jsx` file extension for files with JSX code. So, if you prefer to differentiate your JSX files from JavaScript, you can rename <VPIcon icon="fa-brands fa-js"/>`MyBio.js` to <VPIcon icon="fa-brands fa-react"/>`MyBio.jsx`. Just note that choosing between using `.js` vs `.jsx` for files with JSX is entirely up to you. (Your JSX code is simply a syntactic sugar for the `React.createElement()` JavaScript call.)

:::

#### Example 2: Create a React element with regular JavaScript

```js title="MyBio.js"
function MyBio() {
  return React.createElement("h1", null, "My name is Oluwatobi.");
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(MyBio));
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MyBio App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="MyBio.js"></script>
  </body>
</html>
```

Everything in the React snippet above is plain JavaScript code.

---

## What Is `React.createElement()`?

`React.createElement()` is the JavaScript alternative to JSX. It is a method for creating React elements in regular JavaScript.

Browsers can’t read the JSX syntax. This is why we typically use tools like Babel, TypeScript, and Parcel to compile JSX to a `React.createElement(component, props, ...children)` JavaScript call.

For instance, `<button className="support-btn">Buy me a coffee</button>` will transform to `React.createElement("button", { className: "support-btn" }, "Buy me a coffee ")` at runtime.

Under the hood, the `React.createElement()` method creates a JavaScript object conventionally called “React element.”

::: tip

A React element is a JavaScript object that defines the user interface (UI) you want to render on screen.

:::

A simplified version of a React element looks like this:

```js
const myBioReactElement = {
  type: "h1",
  props: {
    className: null,
    children: "My name is Oluwatobi.",
  },
};
```

`React.createElement()` is best for projects that want to avoid compiling tools like Babel. Whereas JSX is a syntactic sugar that makes React code easier to read. So, you are free to choose the syntax that works best for you (but most React projects use JSX for its simplicity).

---

## How to Use JSX

The following tips will help you get up and running with JSX so you can use it in your React projects.

### Use JSX like any JavaScript expression

You can use JSX like any other JavaScript expression because, at [<VPIcon icon="fas fa-globe"/>execution time](https://codesweetly.com/web-tech-terms-e/#execution-time), JSX transpiles into regular JavaScript.

In other words, you can store JSX expressions in variables, use them in `if` statements, or make them the return value of functions.

::: tip Example

```js title="DisplayMyName.js"
const firstName = false;
const myFirstName = <h1>My first name is Oluwatobi.</h1>;
const mylastName = <h1>My last name is Sofela.</h1>;
function DisplayMyName() {
  if (firstName) {
    return myFirstName;
  } else {
    return mylastName;
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DisplayMyName />);
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DisplayMyName App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="DisplayMyName.js"></script>
  </body>
</html>
```

The React snippet above stores JSX code in variables. We also made it the return value of a function’s `if...else` statement.

### Wrap multi-line JSX in parentheses

Wrapping your JSX code in parentheses is best when it spans across multiple lines. Doing so will make your code readable and avoid the [<VPIcon icon="fa-brands fa-stack-overflow"/>pitfalls of automatic semicolon insertion](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi).

```js
const myName = (
  <div>
    <h1>My name is Oluwatobi.</h1>
  </div>
);
```

The snippet above wraps the `div` in parentheses because it spans multiple lines.

### Wrap expressions in curly braces

Suppose you wish to write JavaScript expressions in your JSX code. In that case, wrap the expression in curly braces like so:

```js title="ExpressionInJSX.js"
function ExpressionInJSX() {
  return <h2>JSX makes it {10 * 3} times faster to build React UIs.</h2>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ExpressionInJSX />);
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ExpressionInJSX App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="ExpressionInJSX.js"></script>
  </body>
</html>
```

::: tip Tips

- React reads curly braces (`{...}`) in JSX code as a JavaScript expression.
- Using curly braces to embed a JavaScript expression works only if you use it in either of two ways:
    1. Directly between the opening and closing JSX tags:
    2. As the value of a JSX element’s attribute:

```xml
<openingTag attribute={javaScriptExpression}>I have a content</closingTag>
```

:::

### Use camelCase to name attributes

React uses [<VPIcon icon="fas fa-globe"/>camelCase](https://codesweetly.com/naming-convention-explained/#what-is-camelcase) for JSX attribute keys rather than the lowercase HTML attribute naming convention. This is because, under the hood, JSX compiles into plain JavaScript and, therefore, uses the JavaScript Web APIs.

In other words, instead of writing `readonly`, use `readOnly`. Likewise, instead of using `maxlength`, write `maxLength`. By doing so, React will gain access to JavaScript’s `readOnly` and `maxLength` Web APIs.

::: tip Example

```js
const myName = (
  <div>
    <h1 className="about-me">My name is Oluwatobi.</h1>
  </div>
);
```

:::

### Close empty JSX tags properly

React requires closing all JSX elements explicitly with `/>`, including empty tags. For instance, you’ll need to write an HTML `<img>` element as `<img />`.

::: tip Example

```js
const emptyJSXElement = <input type="button" value="Click me" />;
```

:::

### A React component can return only a single element

Creating two or more JSX elements from a component requires wrapping them in a single parent element. Otherwise, React will throw an error. This is because React components return only a single element.

::: tip Example

```js title="TwoInnerUIs.js"
function TwoInnerUIs() {
  return (
    <div>
      <h1>My name is Oluwatobi.</h1>
      <button>Buy me a coffee</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TwoInnerUIs />);
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TwoInnerUIs App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="TwoInnerUIs.js"></script>
  </body>
</html>
```

In the expression above, the `<div>` is a parent element containing two (2) inner tags.

:::

::: tip

React allows using a [<VPIcon icon="fa-brands fa-react"/>fragment](https://react.dev/reference/react/Fragment) (empty tag) to group elements. Here’s an example:

```js
function TwoInnerUIs() {
  return (
    <>
      <h1>My name is Oluwatobi.</h1>
      <button>Buy me a coffee</button>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TwoInnerUIs />);
```

Fragments are a great way to return multiple elements without creating unnecessary tags in the HTML DOM.

:::

---

## Time to Practice with JSX 🤸‍♂️🏋️‍♀️🏊‍♀️

Here is your moment to practice the JSX concepts you’ve learned.

In this exercise, you will convert the regular JavaScript code below to its JSX equivalent:

```js
function SupportCodeSweetly() {
  return React.createElement(
    "div",
    { className: "support-ui" },
    React.createElement(
      "a",
      {
        id: "support-link",
        className: "support-link",
        target: "_blank",
        href: "https://www.buymeacoffee.com/codesweetly",
      },
      "Buy me a coffee"
    ),
    ". Thank you!"
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(SupportCodeSweetly));
```

Take a moment to try it yourself before looking at the solution below. Even if you have to try a couple times, go back and read the above tips, or google a few things, it’ll help you learn the concepts better.

Ok, now that you’ve tried…

### The solution

```js
function SupportCodeSweetly() {
  return (
    <div className="support-ui">
      <a
        id="support-link"
        className="support-link"
        target="_blank"
        href="https://www.buymeacoffee.com/codesweetly"
      >
        Buy me a coffee
      </a>
      . Thank you!
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SupportCodeSweetly />);
```

The `SupportCodeSweetly` component returns the UI we want to display on-screen and manage with React. But what exactly is a React component?

---

## What Is a React Component?

A component in React is a class or function that accepts a single argument called `props` and returns an element (UI).

### Syntax of a React component

![React component syntax](https://cdn.hashnode.com/res/hashnode/image/upload/v1760626118056/8fb5818f-b39a-42c7-9399-1acc476604ee.webp)

The above image illustrates the constituent parts of a React component:

1. A JavaScript function with a Pascal case naming convention.
2. A props parameter, which is the only argument React components accept. (Tip: props is short for properties.)
3. The component’s body, where you place a sequence of statements like variables, hooks, and conditionals.
4. A return statement, which is used to output the user interface (UI) you want React to display on-screen. It can be any valid HTML element.
5. An invocator that executes the component to retrieve its user interface. The invocator can also pass arguments (props) to the component.

### Example of a React component

```js
function MyBio(props) {
  return <h1>My name is {props.firstName}.</h1>;
}
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/jlj9lg?file=%2Fsrc%2Findex.js)

The code in the snippet above is a function component that accepts a single argument (props) and returns a React element.

### React components best practices

When you’re working with components in React, there are a few best practices you should follow:

- Capitalize the first letter of your component’s name.
- Don’t use bracket notation expressions in React component tags.
- React components work best as pure functions.
- Create components at the top level of your file.
- Split long components into smaller chunks.

As it’s common practice to use components to render a list of elements, let’s now discuss how to implement this optimally.

---

## How to Render Lists of Elements from an Array

Suppose you want to create a list of React elements from an array of data. You can use the JavaScript [<VPIcon icon="fas fa-globe"/>`map()`](https://codesweetly.com/javascript-map-method/) method.

::: tip Example

```js
import ReactDOM from "react-dom/client";

// Define the bestColors array:
const bestColors = ["Blue", "White", "Pink"];

// Use the bestColors array to create a list of React elements:
const bestColorsLiElements = bestColors.map((color) => <li>{color}</li>);

// Render the array of <li> elements to the root DOM:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ul>{bestColorsLiElements}</ul>);
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/dcwwqr?file=%2Fsrc%2Findex.js)

:::

The snippet above used `map()` to create a new list of React elements by converting each of `bestColors` items to `<li>` elements.

Notice that we rendered the list of elements directly in the `root.render()` method. Typically, you would use a component to do such rendering. So, let’s do some refactoring by moving the `bestColorsLiElements` variable and the `<ul>` element into a component:

```js
import ReactDOM from "react-dom/client";

function BestColor() {
  // Define the bestColors array:
  const bestColors = ["Blue", "White", "Pink"];
  // Use the bestColors array to create a list of React elements:
  const bestColorsLiElements = bestColors.map((color) => <li>{color}</li>);
  return <ul>{bestColorsLiElements}</ul>;
}

// Render the array of <li> elements to the root DOM:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/pj62c3?file=%2Fsrc%2Findex.js)

Although the snippet above displays the right content on the screen, it’s not efficient. So, React throws a sh error. Let’s discuss the issue.

### Each React element in an array needs a unique key

If you check your sh, you will see a warning message that says: `Each child in a list should have a unique "key" prop.`

The message means that whenever you create an array of elements, React needs you to specify a unique identity for each item in the list.

The unique identity keys help React identify changes to the array.

Let’s refactor the previous snippet so that each element in the `bestColorsLiElements` has a unique `key` prop.

### How to add unique keys to each React element in an array

There are two common ways to assign unique keys to each element of an array. The first is the unrecommended way. While the second is the best technique, it is worth noting.

#### Not recommended way to assign keys to an array of React elements

One way to add unique keys is to use each item’s index as its `key` prop.

::: tip

By default, if you don’t provide a `key` prop, React uses each element’s index position in the array to identify them (`key=0`, `key=1`, and so on).

:::

::: tip Example

```js
import ReactDOM from "react-dom/client";

function BestColor() {
  const bestColors = ["Blue", "White", "Pink"];
  // Use each item's index as its key prop:
  const bestColorsLiElements = bestColors.map((color, index) => (
    <li key={index}>{color}</li>
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/yxp4sz?file=%2Fsrc%2Findex.js)

The snippet above specifies a `key` prop on each `<li>` element. It then uses each item’s `index` as the prop’s value.

:::

But note that it’s best to avoid using indexes as a React element’s `key` prop. You should use it only as a last resort when you don’t have stable IDs.

Whenever you use an index as the `key` prop, ensure the order of items in the array never changes. Otherwise, you may have severe issues with performance and component state.

#### Best way to assign keys to an array of React elements

The best way to add unique keys to each React element in an array is to use stable IDs from either of the following sources:

- **Database:** Use the database-generated IDs as the `key` props if your data comes from a database, as they are unique by default.
- `crypto.randomUUID()` **incrementing counter:** Use the `randomUUID()` method to generate Universally Unique Identifiers if you are creating and storing your data locally. (Note: This method is a web API. So, it’s available only in supporting browsers’ HTTPS contexts.)
- `uuid`: An NPM package for generating Universally Unique Identifiers if you are creating and persisting your data locally. This is a good alternative to the `randomUUID()` method for cross-platform compatibility.

::: tip Example

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function BestColor() {
  // Use each item's id as its key prop:
  const bestColorsLiElements = bestColors.map((color) => (
    <li key={color.id}>{color.name}</li>
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
export const bestColors = [
  { id: crypto.randomUUID(), name: "Blue" },
  { id: crypto.randomUUID(), name: "White" },
  { id: crypto.randomUUID(), name: "Pink" },
];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/n56z6x?file=%2Fsrc%2Findex.js)

The snippet above specifies a `key` prop on each `<li>` element. It then uses each item’s `id` as the prop’s value.

:::

::: note

Each `key` prop should be unique among its siblings – not globally. It’s okay to use the same `key` for an element in a different array.

:::

### Essential things to know about assigning keys

Here are essential facts to remember whenever you assign keys to an array of React elements.

#### 1. Set each array element’s key while creating the array

The right place to specify each array element’s unique key is directly inside the `map()` method *while creating the list of elements*.

In other words, say you extract your template element into a separate component. Set the `key` prop on the component’s invocation tag—not on the extracted template element.

::: tip Example 1: Incorrect placement of the key prop

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function ColorListElement({ color }) {
  // WRONG: Don't place the key outside the map() method.
  return <li key={color.id}>{color.name}</li>;
}

function BestColor() {
  const bestColorsLiElements = bestColors.map((color) => (
    // The key attribute above should have been set here.
    <ColorListElement color={color} />
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
export const bestColors = [
  { id: crypto.randomUUID(), name: "Blue" },
  { id: crypto.randomUUID(), name: "White" },
  { id: crypto.randomUUID(), name: "Pink" },
];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/frcspn?file=%2Fsrc%2Findex.js)

The snippet above incorrectly sets each item’s key outside the `map()` method. You should avoid such a mistake!

:::

Always set the `key` prop *while creating the array of elements*. So, the snippet above should have set the `key` on the component invocation tag – in the `map()` method.

::: tip Example 2: Correct placement of the key prop

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function ColorListElement({ color }) {
  return <li>{color.name}</li>;
}

function BestColor() {
  const bestColorsLiElements = bestColors.map((color) => (
    // CORRECT: Always define the key directly inside the map() method.
    <ColorListElement key={color.id} color={color} />
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
export const bestColors = [
  { id: crypto.randomUUID(), name: "Blue" },
  { id: crypto.randomUUID(), name: "White" },
  { id: crypto.randomUUID(), name: "Pink" },
];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/n9m7w2?file=%2Fsrc%2Findex.js)

The snippet above correctly sets each item’s key inside the `map()` method. This allows React to access the `key` value for each element in the array returned by the `map()` method.

:::

::: tip

React’s reconciliation (diffing) algorithm is programmed to access the `key` of each top-level item of the array. It never looks for the `key` in the child or descendant elements.

:::

#### 2. React does not pass keys to components

React neither transfers the `key` prop to components nor includes it as an attribute of a rendered element.

React uses keys solely to know the state of array items. They help React identify changes to the array.

So if you need to use a specific key’s value in your component or on your DOM element, you should explicitly pass it as the value of a different attribute.

::: tip Example

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function ColorListElement(props) {
  return (
    <li>
      {props.color.name} (ID: {props.id})
    </li>
  );
}

function BestColor() {
  // Use `color.id` as the `key` and `id` props' value.
  const bestColorsLiElements = bestColors.map((color) => (
    <ColorListElement key={color.id} id={color.id} color={color} />
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
export const bestColors = [
  { id: crypto.randomUUID(), name: "Blue" },
  { id: crypto.randomUUID(), name: "White" },
  { id: crypto.randomUUID(), name: "Pink" },
];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/v7yflr?file=%2Fsrc%2Findex.js)

The snippet above initializes each list item’s `id` attribute with the same value as the `key` prop. By so doing, the `ColorListElement` component can access `props.id` but not `props.key`.

:::

#### 3. Always generate the keys outside your components

Never generate keys on the fly (while [<VPIcon icon="fas fa-globe"/>rendering](https://codesweetly.com/web-tech-terms-r/#react-render) your components). Instead, create them in your data outside your components. Otherwise, React will recreate the elements on every rendering cycle because the `key`’s value will always be different.

::: tip Example 1: Incorrect place to generate the key prop

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function BestColor() {
  // WRONG: Never generate keys on the fly.
  const bestColorsLiElements = bestColors.map((color) => (
    <li key={crypto.randomUUID()}>{color}</li>
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
// The keys' values should have been set here (outside the component while creating your data).
export const bestColors = ["Blue", "White", "Pink"];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/lhwknv?file=%2Fsrc%2Findex.js)

The snippet above incorrectly generated each element’s key while rendering the `BestColor` component. You should avoid such a mistake to prevent subtle bugs caused by recreating the elements on every render.

:::

Always create each `key`’s value in your data outside the component.

::: tip Example 2: Correct place to generate the key prop

```js title="index.js"
import { createRoot } from "react-dom/client";
import { bestColors } from "./bestColors.js";

function BestColor() {
  const bestColorsLiElements = bestColors.map((color) => (
    <li key={color.id}>{color.name}</li>
  ));
  return <ul>{bestColorsLiElements}</ul>;
}

const root = createRoot(document.getElementById("root"));
root.render(<BestColor />);
```

```js title="bestColors.js"
// CORRECT: Always generate the key in your data outside the component.
export const bestColors = [
  { id: crypto.randomUUID(), name: "Blue" },
  { id: crypto.randomUUID(), name: "White" },
  { id: crypto.randomUUID(), name: "Pink" },
];
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/n56z6x?file=%2Fsrc%2Findex.js)

The snippet above correctly generated each element’s key in the array data outside the component.

:::

---

## How to Handle Events in React

Event handling in React involves configuring your JSX elements to respond to user interactions on them (such as mouse clicks, form submission, and element focus).

```jsx
<jsxTag onEvent={handleEvent}>UI Content</jsxTag>
```

Here’s what’s going on:

- `jsxTag`: React elements like `<div>`, `<button>`, and `<input>`.
- `onEvent`: The event listener you want to add to the React element. Some examples are `onClick`, `onBlur`, and `onHover`.
- `handleEvent`: The event handler function you want to use to handle (respond to) the specified `onEvent` type.

::: tip

Although you can name the event handler anything you prefer, the typical naming convention is to prefix the event’s name with “handle”. For instance, if the event’s name is `focus`, the handler’s name will be `handleFocus`.

:::

### Types of event handlers

There are two typical ways to define the event handler function in React:

- **Inline event handler:** A function defined directly on a JSX element’s opening tag as the value of the event listener prop (`onEvent`).
- **Referenced event handler:** A function defined as a separate (independent) logic and linked to an event listener attribute (`onEvent`) by name referencing.

::: tip Example: Inline event handler

```jsx
export default function App() {
  return (
    <h1 onClick={() => alert("You clicked the heading!")}>
      Oluwatobi is my name.
    </h1>
  );
}
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/7tx7l5?file=%2Fsrc%2Fcomponents%2FApp.js)

:::

::: tip Example: Referenced event handler

```js
export default function App() {
  return <h1 onClick={handleClick}>Oluwatobi is my name.</h1>;
}

const handleClick = () => alert("You clicked the heading!");
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/msfszz?file=%2Fsrc%2Fcomponents%2FApp.js)

:::

React components have a unique memory that allows them to remember things between renderings. This memory is called “state.”

---

## What Is React State?

React state is a *component’s memory* for storing data that React should remember during a component’s re-rendering and whose update should trigger a new render.

### Syntax of React state

```js
import { useState } from "react";

function App() {
  const [state, setState] = useState(initialState);

  // ...
}
```

- `state`: The variable containing the component’s state value.
- `setState`: A function for updating the state value.
- `useState`: The state Hook for initializing and retrieving the component’s state.

::: tip Example of React state

```js
import { useState } from "react";

function AboutCompany() {
  const [age, setAge] = useState(5);

  function updateAge() {
    setAge(age + 1);
  }

  return (
    <div>
      <h3>CodeSweetly is {age} years old!</h3>
      <button type="button" onClick={updateAge}>
        Click to update age
      </button>
    </div>
  );
}

export default AboutCompany;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/9mlsl7?file=%2Fsrc%2FAboutCompany.js)

When a user clicks the button UI, the `onClick` event triggers the `updateAge` event handler, which uses the `setAge` setter function to update the component’s `age` state.

:::

::: tip

React will trigger a re-render of your component every time you use `useState`’s setter function to update your state. But what exactly do the terms “trigger” and “render” mean?

:::

### React Trigger vs Render vs Commit vs Paint

Triggering, rendering, committing, and painting are the steps involved in displaying React UIs on screen. Here are the differences between the four steps:

![React Component's Lifecyle](https://cdn.hashnode.com/res/hashnode/image/upload/v1760637870319/ed8ae7a7-67c1-468a-ba5f-dbbafed8deb0.webp)

The above slide illustrates the four phases in the lifecycle of a component’s UI:

- **Trigger:** Specifies the component whose UI you want to display on the screen.
- **Render:** Calls the component you’ve triggered.
- **Commit:** Updates the DOM with the UI of the rendered component.
- **Paint:** Converts the DOM code you’ve committed into user-friendly elements that users can interact with in their browsers.

Let’s discuss these differences in detail.

### What does it mean to trigger a render in React?

The trigger event is the first step in displaying a React user interface (UI) on screen. It specifies the component whose UI you want to display on the screen. This event happens on two occasions:

#### 1. When the app starts running. The React application uses the `createRoot` method to specify the component whose UI you want to render to a DOM node.

```js
import ReactDOM from "react-dom/client";
import DonationUI from "./components/DonationUI.js";

// When the app starts running, you need to use createRoot and its render method to trigger an initial rendering of the app's root component.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DonationUI />);
```

The snippet above does the following:

- Uses the `ReactDOM.createRoot()` method to create a `ReactDOMRoot` object instance for the `root` element argument.
- Use the object instance’s `render()` method to trigger an initial rendering of the `DonationUI` component.

In other words, the `createRoot().render()` method specifies `DonationUI` as the component whose UI React should display in the `root` HTML element.

#### 2. The second reason a trigger event can happen is when a component’s (or its ancestors’) state gets updated with a set function.

```js title="DonationUI.js"
import React from "react";

function DonationUI() {
  const [donate, setDonate] = React.useState(false);
  function createUserInterface() {
    if (donate) {
      return (
        <p>
          <a href="https://www.buymeacoffee.com/codesweetly">Support page</a>.
          Thank you so much!
        </p>
      );
    }
    // The setDonate function will trigger a re-rendering of the DonationUI component.
    return <button onClick={() => setDonate(true)}>Buy me a coffee</button>;
  }
  return createUserInterface();
}

export default DonationUI;
```

::: info The snippet above does the following:

1. Defines a component named `DonationUI`.
2. Initializes the component’s state with the Boolean value `false`.
3. Programs the component to return a paragraph element if the state’s `donate` variable is `true`. Otherwise, it should return a button element.

:::

When users click the button element, the `setDonate` setter function will trigger a re-rendering of the `DonationUI` component. Below are the entry script and the HTML code so you can try it yourself locally.

```js title="index.js"
import ReactDOM from "react-dom/client";
import DonationUI from "./components/DonationUI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DonationUI />);
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CodeSweetly DonationUI</title>
  </head>
  <body>
    <main id="root"></main>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/95nvmr?file=%2Fsrc%2Fcomponents%2FDonationUI.js)

### What does it mean to render React components?

The rendering step is when React [<VPIcon icon="fas fa-globe"/>invokes (calls)](https://codesweetly.com/invoke-vs-call/) the component you’ve triggered with either the `createRoot` method or a set function. Rendering causes React to invoke a component to produce the UI you want to display on the screen. The component React will render depends on the moment the trigger event occurred:

- **For an initial trigger (at the start of the app),** React will invoke the app’s root component.
- **For update triggers (whenever a component’s state gets updated),** React will call the function component whose state update initiated the trigger event.

::: tip

Rendering a component means “calling a component” to retrieve its user interface (UI).

:::

### What does it mean to commit a React UI to the browser’s DOM?

The committing stage is when React updates the DOM with the UI of the rendered component.

There are some important things to note about this process:

- **For an initial render (at the start of the app),** React will initialize the root DOM with the root component’s UI. It will use the `appendChild()` JavaScript API to append the DOM nodes (UI) retrieved from the component into the app’s root HTML element.
- **For subsequent re-rendering (after the initial commit),** React will only update the DOM nodes if there’s a difference between the previous rendering output and the latest one. No changes will occur if the component’s latest output is the same as the previously committed one.

### What does it mean to paint the DOM nodes on the screen?

The painting (browser rendering) stage is when the browser repaints the screen to convert the DOM code to user-friendly elements. This is a browser-level process that begins once React has finished updating (committing) the DOM nodes.

Sometimes, components need to store information that shouldn’t trigger a render when updated. In these situations, you can use a ref.

---

## What Is the React Ref Hook?

The React Ref Hook lets you store values that don’t trigger re-renders when changed.

### Syntax of the React ref Hook

The `useRef` Hook accepts only one optional argument. Here is the syntax:

```js
useRef(initialValue);
```

- `initialValue`: The value to store in the component’s ref memory. Any JavaScript data type is allowed.
- `useRef()`: Returns an object (`{ current: initialValue }`).

::: tip Example of the React `ref` Hook

```js
import { useRef } from "react";

function App() {
  const myNameRef = useRef("Oluwatobi");

  function handleClick() {
    sh.log(myNameRef.current); // Outputs: "Oluwatobi"
  }

  return <button onClick={handleClick}>Click me</button>;
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/mgsxyq?file=%2Fsrc%2FApp.js)

The snippet above used the `useRef` Hook to store a value (`"Oluwatobi"`) whose update shouldn’t trigger re-renders.

:::

### React ref Hook best practices

When you’re working with React’s ref hook, there are some best practices you should follow:

- Use dot syntax to access and update a ref object’s value instead of square bracket notation.
- Avoid accessing or updating the `current` property during rendering to maintain the purity of your components.
- Don’t use a function instance as your `initialValue`. Pass the function itself, not its output.
- You can use the React ref Hook to manage your HTML DOM nodes.

But what’s the difference between refs, states, and variables, I hear you ask? Let’s find out below.

---

## Variables vs Refs vs States in React

In React, variables, refs, and states allow you to store and mutate data. But they work in different ways. Here are the main distinctions between them:

1. Does its value persist during re-rendering?
    - React Ref: Yes
    - React State: Yes
    - JavaScript Variable: No
2. Would updating its value trigger a re-rendering of the component?
    - React Ref: No
    - React State: Yes
    - JavaScript Variable: No
3. Is it plain JavaScript?
    - React Ref: Yes
    - React State: No
    - JavaScript Variable: Yes
4. Can you declare it outside a component?
    - React Ref: No
    - React State: No
    - JavaScript Variable: Yes
5. Is it usable in conditional statements, loops, or nested functions?
    - React Ref: No
    - React State: No
    - JavaScript Variable: Yes

### How do variables work in React?

A [<VPIcon icon="fas fa-globe"/>variable](https://codesweetly.com/javascript-variable/)’s value does not persist during re-rendering. Its value resets at the beginning of a new rendering.

::: tip Example

```js
import { useState } from "react";

function App() {
  let myVar = 0;
  const [myState, setMyState] = useState(0);

  function updateVar() {
    myVar = myVar + 1;
    sh.log("myVar =", myVar);
  }

  function updateState() {
    setMyState(myState + 1);
  }

  return (
    <div>
      <h2>Variable: {myVar}</h2>
      <h2>State: {myState}</h2>
      <button onClick={updateVar}>Update Variable</button>
      <button onClick={updateState}>Update State</button>
    </div>
  );
}

export default App;
```

[<VPIcon icon="fas fa-globe"/>Try Editing It](https://codesweetly.com/variables-vs-refs-vs-states-in-react/try-it-sdk-vitejs-vite-u6yjihmv)

:::

::: info The snippet above will:

- Increment the variable’s value when you click the “Update Variable” button. This modification doesn’t trigger a re-rendering of the component because React doesn’t track a variable’s changes.
- Increment the state’s value when you click the “Update State” button. This modification triggers a re-rendering of the component because React requests a re-render whenever you modify the state.
- Reset the variable’s value to zero (0) during each re-rendering of the App component. Therefore, the rendered variable’s value will always be zero (0).

:::

### How do refs work in React?

A ref’s value persists during re-rendering, but modifying it doesn’t cause React to re-render the component. In other words, a ref is a plain [<VPIcon icon="fas fa-globe"/>JavaScript object](https://codesweetly.com/javascript-properties-object/) whose value React remembers while re-rendering your component. But React doesn’t track changes to the ref’s value. So, its modifications don’t trigger a new rendering.

::: tip Example

```js
import { useState, useRef } from "react";

function App() {
  const myRef = useRef(0);
  const [myState, setMyState] = useState(0);

  function updateRef() {
    myRef.current = myRef.current + 1;
    sh.log("myRef =", myRef);
  }

  function updateState() {
    setMyState(myState + 1);
  }

  return (
    <div>
      <h2>Ref: {myRef.current}</h2>
      <h2>State: {myState}</h2>
      <button onClick={updateRef}>Update Ref</button>
      <button onClick={updateState}>Update State</button>
    </div>
  );
}

export default App;
```

[<VPIcon icon="fas fa-globe"/>Try Editing It](https://codesweetly.com/variables-vs-refs-vs-states-in-react/try-it-sdk-vitejs-vite-xyjh2fev)

:::

::: info The snippet above will:

- Increment the ref’s value when you click the “Update Ref” button. This modification doesn’t trigger a re-rendering of the component because React doesn’t monitor the ref’s changes.
- Increment the state’s value when you click the “Update State” button. This modification triggers a re-rendering of the component because React requests a re-render whenever you modify the state.
- Retains the ref and state’s value during each re-rendering of the App component.

### How do states work in React?

A state’s value persists during re-rendering. Modifying it also causes React to re-render the component.

::: tip Example

```js
import { useState, useRef } from "react";

function App() {
  let myVar = 0;
  const myRef = useRef(0);
  const [myState, setMyState] = useState(0);

  function updateVarAndRef() {
    myVar = myVar + 1;
    myRef.current = myRef.current + 1;
    sh.log("myVar =", myVar);
    sh.log("myRef =", myRef);
  }

  function updateState() {
    setMyState(myState + 1);
  }

  return (
    <div>
      <h2>Variable: {myVar}</h2>
      <h2>Ref: {myRef.current}</h2>
      <h2>State: {myState}</h2>
      <button onClick={updateVarAndRef}>Update Variable and Ref</button>
      <button onClick={updateState}>Update State</button>
    </div>
  );
}

export default App;
```

[<VPIcon icon="fas fa-globe"/>Try Editing It](https://codesweetly.com/variables-vs-refs-vs-states-in-react/try-it-sdk-vitejs-vite-gklkzfps)

:::

::: info The snippet above will:

- Increment the variable and ref’s value when you click the “Update Variable and Ref” button. This modification doesn’t trigger a re-rendering of the component because React doesn’t monitor changes to the variable or ref.
- Increment the state’s value when you click the “Update State” button. This modification triggers a re-rendering of the component because React requests a re-render whenever you modify the state.
- Resets the variable’s value during each re-rendering of the App component, while retaining the ref and state’s data.

:::

### Tips on using variables, refs, and states in React

- Use variables for values that should reset on every rendering of the component.
- Use the Ref Hook to store values that users do not need to see on screen, as changes to the ref will not trigger a re-rendering of the component.
- React state is ideal for storing values that you want to display on the screen, as state changes trigger a re-rendering of the component.

React components sometimes need to fetch data or change the DOM during different lifecycle phases: trigger, render, commit, and paint. The Effect Hook can help with these tasks.

---

## What Is the useEffect Hook?

The `useEffect` hook lets function components perform side effects outside React.

### Syntax of the useEffect Hook

The `useEffect` hook accepts two arguments. Here’s the syntax:

```jsx
useEffect(callback, array);
```

- `callback`: The required setup function for the useEffect hook.
- `array`: (Optional) The reactive dependencies list that indicates when React runs the callback.

::: tip

React runs the setup function after the component mounts or when dependencies change.

### Example of the useEffect Hook:

```jsx
import { useState, useEffect } from "react";

function AboutCompany() {
  const [age, setAge] = useState(5);

  useEffect(() => {
    document.title = `🥳🎁🎉 It's CodeSweetly's birthday! 🎉🎁🥳`;
  });

  return (
    <div>
      <h3>CodeSweetly is {age} years old!</h3>
      <button type="button" onClick={() => setAge(age + 1)}>
        Click to update age
      </button>
    </div>
  );
}

export default AboutCompany;
```

The `useEffect` code updates the browser’s title after the UI finishes rendering.

### useEffect Hook’s best practices

As always, there are some best practices to use this hook most effectively:

- Use `useEffect` to connect with things outside your React app, such as APIs or timers. If your code has no side effects, you likely don’t need it.
- Avoid adding values to the dependency array unless your effect uses them. Include only the state and props needed to prevent unnecessary re-runs.
- Declare static objects and functions outside components. Place dynamic ones inside your Effect Hook.
- When depending on object props, list each primitive value used in your effect instead of the entire object.
- Use `StrictMode` to help catch common useEffect hook issues during development.

With the basics of React covered, let’s discuss styling.

---

## How to Style React Components

The four primary ways to style React elements are:

- CSS style sheets
- Inline style attributes
- CSS Modules
- CSS-in-JS Libraries

Let’s discuss the four styling techniques.

### How to use CSS style sheets to style React elements

Below are the steps to style JSX elements with regular CSS style sheets.

#### 1. Create a CSS stylesheet

First, create a CSS stylesheet in your React projects.

```sh
touch styles.css
```

::: tip

You can create the stylesheet anywhere in your project directory.

:::

#### 2. Define your ruleset

Open the newly created CSS file and declare your styles.

::: tip Example

```css title="styles.css"
.text {
  color: seagreen;
  font-weight: bold;
}
```

The CSS snippet above instructs browsers to apply a `seagreen` color and `bold` font weight on elements with a `text` class name.

:::

#### 3. Apply the stylesheet’s ruleset to your element

Import your stylesheet into the component file containing the element you wish to style. Then, apply the stylesheet’s ruleset to it.

::: tip Example

```js ttle="App.js"
// Import your stylesheet (the path to your stylesheet may be different).
import "../styles.css";

function App() {
  return <div className="text">Oluwatobi is my name.</div>;
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/mq5xzp?file=%2Fsrc%2FApp.js)

The snippet above instructs React to apply the `"text"` ruleset on the element with a `className="text"` attribute.

:::

### How to use the inline `style` attribute to style React elements

React allows you to apply inline styles to JSX elements in the same way as inline CSS works in HTML. But there are some differences to keep in mind.

First, HTML applies inline styles as a string value:

```html
<div style="color:seagreen; font-weight:bold;">Oluwatobi is my name.</div>
```

But in React, you must define inline styles as objects, not strings:

```html
<div style={{ color: "seagreen", fontWeight: "bold" }}>
  Oluwatobi is my name.
</div>
```

The snippet above uses two sets of curly braces because in JSX (as I mentioned above), you wrap [<VPIcon icon="fas fa-globe"/>JavaScript expressions](https://codesweetly.com/javascript-statement/#what-is-a-javascript-expression-statement) inside curly braces: for instance, `<div>{myNameVariable}</div>`.

So, suppose the expression is a JavaScript object literal. In that case, you will need two sets of curly braces: for instance, `<div>{{ name: "Oluwatobi" }}</div>`.

Therefore, in `style={{ color: seagreen, fontWeight: bold }}`, the first set of curly braces (`{...}`) tells React that you want to write a JavaScript expression. The second set of curly braces (`{ color: seagreen, fontWeight: bold }`) is the JavaScript expression (an object) you are assigning as the `style` attribute’s value.

::: tip Example

```jsx title="App.js"
function App() {
  return (
    <div style={{ color: "seagreen", fontWeight: "bold" }}>
      Oluwatobi is my name.
    </div>
  );
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/84cmjf?file=%2Fsrc%2FApp.js)

The React snippet above instructs the computer to apply an inline style to the `div` element.

:::

You can see that we wrote `fontWeight` in [<VPIcon icon="fas fa-globe"/>camelCase](https://codesweetly.com/naming-convention-explained/#what-is-camelcase). This is because, under the hood, JSX compiles into plain JavaScript. So it uses the JavaScript Web APIs attribute naming convention.

To make your code easier to read, consider storing your inline style object in a separate variable like so:

```jsx title="App.js"
function App() {
  // Store your inline style object in a variable:
  const textStyles = { color: "seagreen", fontWeight: "bold" };
  return (<div style={textStyles}>Oluwatobi is my name.</div>);
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/2llmwy?file=%2Fsrc%2FApp.js)

::: tip

The Tailwind CSS framework is an inline styling tool that provides utility classes you can apply directly to an element. It offers additional features that are often lacking in regular inline styling. For example, Tailwind allows you to configure media queries and event states (such as `hover`, `focus`, and `active`) in inline styles.

:::

### How to use CSS modules to style React elements

As defined on the official [documentation (<VPIcon icon="iconfont icon-github"/>`css-modules/css-modules`)](https://github.com/css-modules/css-modules), a CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

CSS Modules share many similarities with a regular CSS style sheet. But there are some essential differences.

#### 1. Filename convention

The syntax for naming a regular CSS stylesheet is `[name].css`: for instance, <VPIcon icon="fa-brands fa-css3-alt"/>`codesweetly-styles.css`.

But a CSS module’s file naming convention is `[name].module.css`: for instance, <VPIcon icon="fa-brands fa-css3-alt"/>`codesweetly-styles.module.css`.

#### 2. Styles scope

Importing a CSS style sheet into your script file makes its rulesets available *globally* to all components (and child components) of that script.

But importing a CSS module into your script file only makes its rulesets available *locally* to the component that invokes the module’s rule. Also, that component must be in the script that imports the CSS module.

::: tip Example

Create a regular CSS stylesheet in your React project and add some rules to it:

```css title="styles.css"
.imageInfo {
  text-align: center;
  color: #442109;
}
```

Also, create a CSS module in the same project and add some rules to it:

```css title="styles.module.css"
.imageInfo {
  border: 8px ridge #71380f;
  background-color: #ffe5b4;
  padding: 20px 0 7px;
}
```

Import both the CSS stylesheet and CSS module you’ve just created into your script file:

```js title="App.js"
import "../styles.css";
import codesweetlyStyles from "../styles.module.css";

function App() {
  return (
    <div className="imageInfo">
      <h1>Random Image</h1>
      <img src="https://picsum.photos/400/400" alt="Random Image" />
      <p>Get a new image each time you refresh your browser.</p>
    </div>
  );
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/3t3nwt?file=%2Fsrc%2FApp.js)

Go ahead and run your app and check its output in your browser.

:::

After running your app, you will notice that React only applied the CSS stylesheet’s ruleset, not the CSS module’s own.

React did so because the stylesheet’s ruleset is globally available to all elements (and child components) of the page where you imported the sheet.

But the ruleset in the module is locally available only to the component that explicitly invokes the rule.

So, to use your CSS module’s style in your component, you must explicitly execute it like so:

```js title="App.js"
import "../styles.css";
import codesweetlyStyles from "../styles.module.css";

function App() {
  return (
    <div className={`imageInfo ${codesweetlyStyles.imageInfo}`}>
      <h1>Random Image</h1>
      <img src="https://picsum.photos/400/400" alt="Random Image" />
      <p>Get a new image each time you refresh your browser.</p>
    </div>
  );
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/45lkpf?file=%2Fsrc%2FApp.js)

The snippet above uses the `codesweetlyStyles.imageInfo` code to instruct React to apply the CSS module’s `imageInfo` ruleset to the `div` element.

#### 3. Composition

To compose styles together while using a regular CSS style sheet, you must apply multiple classes to your element.

::: tip Example: Compose rulesets with regular CSS style sheets

```css title="styles.css"
.container {
  border: 4px solid blueviolet;
  padding: 30px 15px;
}

.text {
  color: seagreen;
  font-weight: bold;
}
```

```js title="App.js"
import "../styles.css";

function App() {
  return <div className="container text">Oluwatobi is my name.</div>;
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/w6h74d?file=%2Fsrc%2FApp.js)

:::

Using multiple classes on an element to implement style composition is not the best practice because CSS will use the order of style definitions in the stylesheet to determine the order of precedence based on the CSS cascading rules.

But CSS modules provide a `composes` declaration that offers greater flexibility in composing your styles to suit your project’s needs.

::: tip Example: Compose rulesets with CSS modules

```css title="styles.module.css"
.container {
  border: 4px solid blueviolet;
  padding: 30px 15px;
}

.text {
  composes: container;
  color: seagreen;
  font-weight: bold;
}
```

```js title="App.js"
import styles from "../styles.module.css";

function App() {
  return <div className={styles.text}>Oluwatobi is my name.</div>;
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/j6yl9z?file=%2Fsrc%2FApp.js)

Although you can define multiple `composes` declarations in a ruleset, they must precede other rules.

:::

::: tip Example: All `composes` declarations must come before other rules

```css title="styles.module.css"
.container {
  border: 4px solid blueviolet;
  padding: 30px 15px;
}

.curved {
  border-radius: 20px;
}

.text {
  composes: container;
  composes: curved;
  color: seagreen;
  font-weight: bold;
}
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/3lqshk?file=%2Fsrc%2Fstyles.module.css)

You can simplify the `.text` ruleset by using a single `composes` declaration for multiple classes.

:::

::: tip Example: Compose classes with a single `composes` declaration

```css title="styles.module.css"
.container {
  border: 4px solid blueviolet;
  padding: 30px 15px;
}

.curved {
  border-radius: 20px;
}

.text {
  composes: container curved;
  color: seagreen;
  font-weight: bold;
}
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/x4zfyn?file=%2Fsrc%2Fstyles.module.css)

:::

### How to use a CSS-in-JS library to style React elements

A CSS-in-JS library allows you to use the complete features of CSS directly within your JavaScript file.

Some of the popular CSS-in-JS libraries are Linaria, Emotion, Pigment CSS, and Panda CSS.

Feel free to try any CSS-in-JS library you prefer. Here, we’ll use Emotion to illustrate how such a styling technique works in a React application.

So, go ahead and install the library into any of your React projects by running:

```sh
npm i @emotion/react@11.14.0
```

After you’ve installed Emotion, import it and use it in your component file like so:

```js title="App.js"
// The comment below is essential. Emotion will not work without it.
/** @jsxImportSource @emotion/react */

// Define your styles using the JavaScript object syntax.
const codesweetlyStyles = {
  border: "8px ridge #71380f",
  backgroundColor: "#ffe5b4",
  padding: "20px 0 7px",
  textAlign: "center",
  color: "maroon",
  "@media(min-width: 768px)": {
    color: "darkslategray",
  },
};

// Apply the styles to your element.
function App() {
  return (
    <div css={codesweetlyStyles}>
      <h1>Random Image</h1>
      <img src="https://picsum.photos/400/400" alt="Random Image" />
      <p>Get a new image each time you refresh your browser.</p>
    </div>
  );
}

export default App;
```

[<VPIcon icon="iconfont icon-codesandbox"/>Try it on CodeSandbox](https://codesandbox.io/p/sandbox/t4ttkx?file=%2Fsrc%2FApp.js)

::: info The snippet above does the following:

1. Uses the `/** @jsxImportSource @emotion/react */` comment (JSX Pragma) to tell the Babel JSX plugin to convert the script’s JSX calls to an Emotion function called `jsx` instead of `React.createElement`. Make sure you place the pragma directive above your import statements. Otherwise, the Emotion library will not work.
2. Defines styles in a JavaScript object.
3. Uses Emotion’s `css` prop feature to apply the styles to the JSX element.

:::

Notice that the `css` prop is like the inline `style` attribute. The main difference is that the `css` props support more CSS features like nested selectors, auto vendor-prefixing, media queries, and event states (such as `hover`, `focus`, and `active`). So, using CSS-in-JS libraries like Emotion lets you write highly flexible and responsive styles directly in your JavaScript files.

::: tip

The `css` prop works on any element that supports the `className` attribute.

:::

Now, go ahead and run your app and check its output in your browser.

And that’s it! You now know how to use the CSS-in-JS library to style your React elements.

I used Emotion in this article because I like how clean its syntax looks. Feel free to test other CSS-in-JS libraries, such as Pigment CSS. You may find one that suits you better.

---

## Overview

In this handbook, we discussed the core concepts you need to know to start building applications with React. We also used examples to practice creating and styling components.

Whether you’re considering a small personal project or a full-stack app for a larger user base, you now have the foundation to build these projects using React.

Thanks for reading!

### Dive deeper into React

This handbook has given you a peek inside my [<VPIcon icon="fa-brands fa-amazon"/>Code React Sweetly book](https://amazon.com/dp/B0FRC4R8T3?tag=codesweetly00-20). Whether you’re just starting or want to sharpen your fundamentals, the book walks you through everything from essential concepts to deploying real apps using JavaScript and TypeScript. It is practical, beginner-friendly, and designed to help you code React sweetly!

![A Beginner’s Guide to React: Learn JSX, Hooks, and Real-World App Development](https://cdn.hashnode.com/res/hashnode/image/upload/v1760698961658/f3f297da-1cd2-4777-b440-19b94daaa26f.jpeg)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The React Handbook for Beginners – JSX, Hooks, and Rendering Explained",
  "desc": "React is one of the most powerful and widely used libraries for building user interfaces with JavaScript. From small components to large-scale front-end and full-stack applications, React gives you the flexibility to create interactive, efficient, an...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-handbook-for-beginners-learn-jsx-hooks-rendering/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
