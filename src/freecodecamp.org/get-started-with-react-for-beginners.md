---
lang: en-US
title: "How to Get Started With React – A Beginner's Guide"
description: "Article(s) > How to Get Started With React – A Beginner's Guide"
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
      content: "Article(s) > How to Get Started With React – A Beginner's Guide"
    - property: og:description
      content: "How to Get Started With React – A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-started-with-react-for-beginners.html
prev: /programming/js-react/articles/README.md
date: 2022-04-13
isOriginal: false
author: Joel Olawanle
cover: https://www.freecodecamp.org/news/content/images/2022/04/cover-template.png
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
  name="How to Get Started With React – A Beginner's Guide"
  desc="By Joel Olawanle React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for creating UI component-based user interfaces.  React is maintained by Meta (previously Facebook) along with a community of individual..."
  url="https://freecodecamp.org/news/get-started-with-react-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://www.freecodecamp.org/news/content/images/2022/04/cover-template.png"/>

React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for creating UI component-based user interfaces.

React is maintained by Meta (previously Facebook) along with a community of individual developers and organizations.

According to the [<FontIcon icon="fa-brands fa-stack-overflow"/>2021 Stack Overflow developer survey](https://insights.stackoverflow.com/survey/2021#section-most-popular-technologies-web-frameworks), React surpassed jQuery as the most commonly used web framework with about 40.14% of the market share. It was also the most desired, with one in every four developers using it. React is also used by over 8000 industry leaders.

In this article, we will see reasons why you should learn React and how to get started with it.

---

## Why Learn React?

There are many reasons why you should learn React, but here are some of the most frequently mentioned points highlighted by many React experts:

### React is easy to use

Many people, including myself, like React for its simplicity, flexibility, performance, usability, virtual DOM, components, and many other features.

Working with React simplifies our lives as developers because of its straightforward and modular infrastructure, which allows us to build and maintain our applications much more quickly.

### There is a high demand for React developers

In the United States, the average yearly salary for a React developer is $120,000. Many businesses and companies use React, which forces them to look for new talent on a daily basis.

If you have any reservations about learning or becoming a React developer, reconsider. There's no need to worry – there will likely always be a job for you as a React developer because there are thousands of open positions right now (even remotely).

### It is not difficult to learn the basics of React

This could be interpreted differently, as learning React as a complete beginner coder will undoubtedly take longer than learning JavaScript as an expert. But what I mean is that React is not difficult to grasp once you have thoroughly understood the fundamentals of JavaScript.

React also allows you to reuse simple pieces of functionality across your React web app.

To summarize, React is relatively simple to learn, has a large community of support with many open-source projects on Github, and offers many job opportunities.

Learning React will also help you better understand JavaScript, which will come in handy throughout your career.

Since React is a JavaScript framework, it is critical to understand certain JavaScript fundamentals in order to flow and understand React. [Here is a detailed article on all of these fundamental JavaScript concepts and methods](/freecodecamp.org/top-javascript-concepts-to-know-before-learning-react.md) such as map, filter, and many others. This will help you learn React faster.

```component VPCard
{
  "title": "Top JavaScript Concepts to Know Before Learning React",
  "desc": "By Joel Olawanle If you want to learn React – or any JavaScript framework – you'll first need to understand the fundamental JavaScript methods and concepts. Otherwise it's like a youngster learning to run before learning to walk.  Many developers cho...",
  "link": "/freecodecamp.org/top-javascript-concepts-to-know-before-learning-react.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## How to Install React

The best way to install React or create a React project is to install it with [<FontIcon icon="fa-brands fa-react"/>`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). This is one of the steps that most beginners struggle with, but in this guide, we'll go over how to get started properly and successfully.

We'll be using our terminal for this (you can either make use of an in built terminal or download any you prefer). One prerequisite is to have [<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en/download/) installed on your PC, knowing full well that NPM (or, alternatively, Yarn) is required. We'll be using NPM for this guide.

To confirm that you have Node installed on your PC, just launch your terminal/command prompt and type `node -v` and `npm -v` to see which versions you have.

Because `create-react-app` requires that you have [NPX <FontIcon icon="iconfont icon-github"/>`npm/npm`](https://github.com/npm/npm/releases/tag/v5.2.0) installed, you'll need to make sure your Node version is not less than v14.0.0 and your NPM version is not less than v5.6. Suppose you have an older version of NPM, you could use the following command to update it:

```sh
npm update -g
```

Once you've figured out NPM, you can now install React with `create-react-app`.

If you find it difficult working with terminals, you can check out this [article on how to use the command line for beginners](https://freecodecamp.org/news/command-line-for-beginners/).

### What is Create-react-app?

Though the name explains what it does, you might start to wonder what `create-react-app` really means.

Creating a React app manually is complicated and time-consuming, but `create-react-app` makes it much easier by automating all the configuration and package installation.

`create-react-app` is the best way to start building a new [single-page application](https://reactjs.org/docs/glossary.html#single-page-application) in React.

If you are interested in learning how to create a React app manually without `create-react-app`, you can check out [this guide](https://dev.to/underscorecode/creating-your-react-project-from-scratch-without-create-react-app-the-complete-guide-4kbc).

### How to Create a React Application

The first step is to start your terminal/command prompt, navigate to the folder where you want to save your React application, and then execute this command:

```sh
npx create-react-app my-app
```

::: note

`my-app` is the name of the application we are creating, but you can change it to any name of your choice.

:::

The installation process may take a few minutes. After it is done, you should see a folder that appears in your workspace with the name you gave your app. Congratulations!

### How to Run Your React Application

Now, head back to the terminal, and the first thing you need to do is navigate to the directory where the app was installed using `cd my-app`.

![Then finally run `npm start` to see your app live on `localhost:3000`. You should see something like this](https://freecodecamp.org/news/content/images/2022/04/image-9.png)

---

## Directory Structure

We've just finished the first part of this article. Now let's figure out what each file and folder in our React application means and does. This is critical either as a beginner or an experienced React developer.

![The directory structure of your newly created React app looks like this when you open it](https://freecodecamp.org/news/content/images/2022/04/image-10.png)

Let’s now start by explaining these folders and what they stand for:

### <FontIcon icon="fas fa-folder-open"/>`node_modules` folder

The <FontIcon icon="fas fa-folder-open"/>`node_modules` folder contains all of our dependencies, and this folder is ignored when we set up source control. But it is important to note that the <FontIcon icon="iconfont icon-json"/>`package.json` file works in tandem with the <FontIcon icon="fas fa-folder-open"/>`node_modules` folder because it contains information about all of the dependencies as well as some script commands.

If you delete the <FontIcon icon="fas fa-folder-open"/>`node_modules` folder, the application will break because you'll no longer have your dependencies.

To re-install these dependencies, you can use `npm install` – this will check the <FontIcon icon="iconfont icon-json"/>`pakage.json` file for a list of the dependencies and then install all of them. This will make it easy for you to push your code online or share your code with others without having to share the heavy <FontIcon icon="fas fa-folder-open"/>`node_modules` folder.

::: note

This is not just for `create-react-app`.

:::

### public folder

Although the majority of the work will be done in the <FontIcon icon="fas fa-folder-open"/>`src` folder, the public folder contains some static files, such as the HTML file. You could, for example, change the title of your web app, add CDNs such as Google Fonts, and so on.

::: note

Don't be afraid of this file because it's just a regular HTML file. The only code to remember is the `div` with the `id` `root` where the entire React application will be placed.

:::

```html
<div id="root"></div>
```

### <FontIcon icon="iconfont icon-git"/>`.gitignore` file

Just as the name suggests, it’s a file that specifies which files and folders will be ignored by our source control.

When you open the file, you will see a list of files that are being ignored, including the <FontIcon icon="fas fa-folder-open"/>`node_modules` and build folder. You can decide to add some particular files or folders.

### `build` folder

The <FontIcon icon="fas fa-folder-open"/>`build` folder is another folder that you can't see right now, but that you'll see when you build your project.

This will create a production-ready folder of static assets that can be hosted or deployed using a drag-and-drop option on a platform like Netlify.

### `src` folder

So far, we've covered some fundamental folders, but our main concern is the <FontIcon icon="fas fa-folder-open"/>`src` folder, which is where development takes place.

![Here's what the <FontIcon icon="fas fa-folder-open"/>`src` folder looks like](https://freecodecamp.org/news/content/images/2022/04/image-11.png)

Let's start with the fundamental files: <FontIcon icon="fa-brands fa-react"/>`App.js`, <FontIcon icon="fa-brands fa-react"/>`index.js`, <FontIcon icon="fa-brands fa-css3-alt"/>`index.css`, and <FontIcon icon="fa-brands fa-css3-alt"/>`App.css` (you can delete every other file for now).

### <FontIcon icon="fa-brands fa-react"/>`App.js`

This is where all of your components will eventually meet. The name of the file isn't important, but it's good practice to keep this name so that other developers can understand your code.

### <FontIcon icon="fa-brands fa-react"/>`index.js`

This is the starting point for your application. More specifically, this is where you target the `root` `id` from the <FontIcon icon="fa-brands fa-html5"/>`index.html` file and render the <FontIcon icon="fa-brands fa-react"/>`App.js` file, which is where your entire file (components and pages) will meet.

```js title="App.js"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### `App.css` and `index.css`

These both contain styles for your application. The <FontIcon icon="fa-brands fa-css3-alt"/>`index.css` file contains global styling and the <FontIcon icon="fa-brands fa-css3-alt"/>`App.css` file almost works the same as it does for the <FontIcon icon="fa-brands fa-react"/>`App.js` file – but whether we use a CSS file is entirely up to us. While getting started, we can choose to delete one and use only one CSS file.

---

## Understanding JSX

JSX is a JavaScript Extension Syntax used in React to easily write HTML and JavaScript together.

Writing code in React takes a long time because you have to use the `React.createElement` function every time, even if you are just adding a simple `div`.

![Image](https://freecodecamp.org/news/content/images/2022/04/image-12.png)

The image above depicts the exact same code written in JSX and with `React.createElement`. You can tell which is easier to write, understand, and manage by comparing the two.

[<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`](https://github.com/facebook/create-react-app) internally uses Babel for the JSX to JavaScript conversion, so you don't have to worry about configuring your own babel configuration with Webpack.

### Some Do’s and Don’t of JSX

Make sure you're aware of some of these important details so that some bugs don't get in your way:

- Your markup is usually placed after the return statement, either as a single line of code or as a block code.
- All of your code should be wrapped in a single tag. This could be a `div`, a tag with no content (`<>`), or any other tag.

```jsx title="App.js"
const App = () => {
  return (
      <h1>JSX Title</h1>
      <p>This is first JSX Element!</p>
      <p>This is another JSX Element</p>
  );
};
```

This works fine with normal markup but would result in a major error because React requires adjacent elements to be wrapped in a parent tag. This simply means that for this code to run, it must be wrapped in a parent tag, such as a div, section, article, and so on.

```jsx title="App.js"
const App = () => {
  return (
    <div>
      <h1>JSX Title</h1>
      <p>This is first JSX Element!</p>
      <p>This is another JSX Element</p>
    </div>
  );
};
```

You can also make use of the `React.Fragment` component.

### How to Add Comments to JSX Code

As a developer, it's now standard practice to always add comments to your code, and JSX is no exception. You can either use the shortcut command (Cmd + / (Mac) or Ctrl + / shortcut keys to either add or remove a particular comment).

Note: We can pretty much do anything with JSX. You can read [<FontIcon icon="fa-brands fa-react"/>this article](https://reactjs.org/docs/jsx-in-depth.html) to learn more about how JSX works.

In summary, JSX just provides syntactic sugar for the `React.createElement (component, props, ...children)` function.

---

## What Next?

Now that you know how to get started with React, the next step is to learn it properly, understand its functionalities, and so on.

Nowadays, there are a lot of great resources available for learning React, so many that it is difficult to determine which are current and useful.

Instead of attempting to take several courses at once, the best thing to do is find a helpful tutorial and complete it. Check out freeCodeCamp's [Free React Course for 2022](/freecodecamp.org/free-react-course-2022.md) or [Learn React - Full Course for Beginners](/freecodecamp.org/learn-react-course.md).

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

---

## Conclusion

So far in this article, you've learned what React is, why you should learn React, how to install it on your machine. You've also learned what each of the files in its directory structure does.

From this point there is a lot to learn about React and I wish you good luck as you continue on in your studies. If you enjoyed this article, you can support me by either [buying me a coffee](https://buymeacoffee.com/tobestjoel) or [following me on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`olawanle_joel`)](https://twitter.com/olawanle_joel).

Embark on a journey of learning! [Browse 200+ expert articles on web development](https://joelolawanle.com/contents). Check out [my blog](https://joelolawanle.com/posts) for more captivating content from me.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Started With React – A Beginner's Guide",
  "desc": "By Joel Olawanle React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for creating UI component-based user interfaces.  React is maintained by Meta (previously Facebook) along with a community of individual...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-started-with-react-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```