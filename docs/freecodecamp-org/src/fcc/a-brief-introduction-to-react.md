---
lang: en-US
title: "A Brief Introduction to React"
description: "Article(s) > A Brief Introduction to React"
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
      content: "Article(s) > A Brief Introduction to React"
    - property: og:description
      content: "A Brief Introduction to React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/a-brief-introduction-to-react.html
prev: /programming/js-react/articles/README.md
date: 2025-05-02
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746109202328/e4b0f59b-a8d1-42de-9eff-b5413ced3b93.png
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
  name="A Brief Introduction to React"
  desc="This tutorial introduces the basics of using React components in your web apps. React is a JavaScript library used to build user interfaces, especially for single-page applications where parts of the page need to update without a full page reload. It..."
  url="https://freecodecamp.org/news/a-brief-introduction-to-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746109202328/e4b0f59b-a8d1-42de-9eff-b5413ced3b93.png"/>

This tutorial introduces the basics of using [<FontIcon icon="fa-brands fa-react"/>React](https://react.dev/) components in your web apps. React is a JavaScript library used to build user interfaces, especially for single-page applications where parts of the page need to update without a full page reload. It helps developers create interactive, reusable components that manage their own state and respond efficiently to data changes.

This guide assumes you have some basic programming experience and are comfortable reading and writing JavaScript. You should understand variables, functions, loops, objects, and how JavaScript works in the browser. You don’t need to know React or any build tools, as those are introduced along the way.

---

## How this Guide Works

The three lessons presented here are taken from my free book of code playbacks:

```component VPCard
{
  "title": "PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

This book is available for free on [<FontIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books/). The book is a hands-on guide to modern web development, covering everything from core JavaScript features to building full-stack apps with tools like Node, Express, SQLite, Mongo, and GraphQL.

Each lesson is presented as a [<FontIcon icon="fas fa-globe"/>code playback](https://markm208.github.io/), which is an interactive code walkthrough that shows how a program changes over time along with my explanation about what's happening. This format helps you focus on the reasoning behind the code changes.

To view a playback, click on the comments in the left panel. Each comment updates the code in the editor and highlights the change. Read the explanation, study the code, and use the built-in AI tutor if you have questions. Here's a short video that shows how to use a code playback:

There are plenty of other great React resources out there. After you finish with this short introduction, check out the React team's official tutorial: 

<SiteInfo
  name="Quick Start - React"
  desc="The library for web and native user interfaces"
  url="https://react.dev/learn/"
  logo="https://react.dev/favicon-16x16.png"
  preview="https://react.dev/images/og-learn.png"/>

---

## Introduction to React: Your First Component

This first lesson introduces building user interfaces using small, reusable React components. Instead of writing code to directly update the DOM, you define what the UI should look like, and React takes care of syncing the DOM with your data.

The playback shows how to use `ReactDOM.render` with `React.createElement`, and then how to write the same component using JSX. Over the course of the three lessons, I'll create a site that displays some computer science legends (and one imposter).

The lesson then moves on to creating a `CustomHeader` component that takes properties or `props`. It shows how to pass data into a component and how destructuring can make that easier. By the end, you'll know how to write and reuse simple components that can be used in larger React apps.

::: info View the playback here:

```component VPCard
{
  "title": "Basic React - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/4/1",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## Building a React App with Vite

The next lesson shows how to create a modern React project using [<FontIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/). Vite takes care of the setup by creating a project folder, installing libraries, running a development server, and preparing a build for production. This lets you skip any manual configuration and start building your app right away.

I'll build on the CS Legends app from the first playback, but this time inside a project directory. I'll separate components into different files and use JSX. The playback also introduces `useState` for managing dynamic data and shows how to pass data and event handlers between components. The result is a working front-end app with clear structure and reusable code.

::: info View the playback here:

```component VPCard
{
  "title": "Using Vite to Create a React App - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/4/2",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## Connecting React to a Real Backend with Express

This final lesson extends the Vite + React app by adding a database-backed Express backend. Instead of storing the legend data in React's local state, the app will fetch and update data using an Express API. You'll create a second folder for the backend server, connect it to a database, and write routes to get and add data.

I use the `useEffect` hook to load the data from the Express server when the app starts. You'll also set up the `cors` package to allow the frontend and backend to talk to each other during development. Once everything works, the React app is built into a static bundle and is served by the Express server. The result is a full-stack web app, ready to be deployed.

::: info View the playback here:

```component VPCard
{
  "title": "Using React and Express Together - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/4/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## Wrapping Up

These three lessons cover the basics, but there's much more to learn. If you found this format helpful, explore the rest of the book to see how full web apps are built from scratch using modern tools and frameworks.

React is just one piece of the web development puzzle. Keep building, keep reading, and try out the other playbacks when you're ready to go further.

If you have feedback about the playbacks I’d love to hear from you. You can reach me here [<FontIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Brief Introduction to React",
  "desc": "This tutorial introduces the basics of using React components in your web apps. React is a JavaScript library used to build user interfaces, especially for single-page applications where parts of the page need to update without a full page reload. It...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/a-brief-introduction-to-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
