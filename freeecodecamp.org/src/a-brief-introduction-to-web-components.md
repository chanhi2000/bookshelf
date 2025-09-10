---
lang: en-US
title: "A Brief Introduction to Web Components"
description: "Article(s) > A Brief Introduction to Web Components"
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
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Brief Introduction to Web Components"
    - property: og:description
      content: "A Brief Introduction to Web Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-brief-introduction-to-web-components.html
prev: /programming/js-react/articles/README.md
date: 2025-05-09
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746625674217/902b1ac1-f7c2-42cd-b12f-d9803e58739d.png
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
  name="A Brief Introduction to Web Components"
  desc="In a previous article, I gave a brief introduction to React. This tutorial introduces an alternative approach to building a component-based frontend. It covers the fundamentals of Web Components to build modular, reusable elements for your web applic..."
  url="https://freecodecamp.org/news/a-brief-introduction-to-web-components"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746625674217/902b1ac1-f7c2-42cd-b12f-d9803e58739d.png"/>

In a previous article, I gave a [**brief introduction to React**](/freecodecamp.org/a-brief-introduction-to-react.md). This tutorial introduces an alternative approach to building a component-based frontend. It covers the fundamentals of [<VPIcon icon="fa-brands fa-firefox"/>Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to build modular, reusable elements for your web applications.

Web Components are a set of standardized browser APIs that allow you to create custom, reusable HTML elements with encapsulated functionality. They help developers create self-contained components that can be used across different frameworks or even without any framework at all.

This tutorial assumes you have some basic programming experience and are comfortable reading and writing JavaScript. You should understand variables, functions, loops, objects, classes, and how JavaScript works in the browser. You don’t need to know anything about Web Components to get started.

The four lessons presented here are taken from my free book of code playbacks:

```component VPCard
{
  "title": "PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook//",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

This book is available for free on [<VPIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books/). The book is a hands-on guide to modern web development, covering everything from core JavaScript features to building full-stack apps with various tools and technologies.

Each lesson is presented as a [<VPIcon icon="fas fa-globe"/>code playback](https://markm208.github.io/), which is an interactive code walkthrough that shows how a program changes over time along with my explanation about what's happening. This format helps you focus on the reasoning behind the code changes.

To view a playback, click on the comments in the left panel. Each comment updates the code in the editor and highlights the change. Read the explanation, study the code, and use the built-in AI tutor if you have questions. Here's a short video that shows how to use a code playback:

After this introduction, you might want to explore the official Web Components resources: [<VPIcon icon="fa-brands fa-firefox"/>MDN Web Components Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

---

## Web Components Part 1: Your First Custom Element

This first lesson introduces building user interfaces using Web Components, which let you bundle together HTML, CSS, and JavaScript into a single reusable element.

These elements can be treated just like built-in HTML elements such as `h1`, `div`, and `img`. They're particularly useful when you want to break a page into smaller, self-contained, and reusable parts like headers, tables, or forms, while keeping the code for each organized and isolated.

In this playback, you'll learn:

- How to create a JavaScript class that represents a custom HTML element
- How to access the attributes of the web component
- How to create and use a web component in HTML

The lesson focuses on creating a `LegendHeader` component that can be reused throughout a web application. You'll see how custom elements can have attributes just like regular HTML elements (such as `src` in an `img` tag), and how these attributes can be changed from JavaScript code, triggering methods in response.

::: info View the playback here:

```component VPCard
{
  "title": "Web Components Part 1- LegendHeader - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/3/8",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

---

## Web Components Part 2: Data Communication

Building on the previous lesson, this playback demonstrates how to create multiple components that share data. I'll enhance the `LegendHeader` component to display the count of legends being tracked, and add a new `LegendTable` component that displays all the CS legends in a database using an HTML table.

A key concept introduced in this lesson is having a top-level element hold the web app's data and letting it communicate changes to the components that rely on it. This approach makes component management more organized and maintainable.

In this playback, you'll learn:

- How to create and work with multiple components
- How to set up and use 'observable attributes' in a web component
- How a top-level element can manage data and inform components when data changes

::: info View the playback here:

```component VPCard
{
  "title": "Web Components Part 2- LegendTable - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/3/9",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## Web Components Part 3: Custom Events

This lesson expands the application by adding a `NewLegendForm` component that allows users to add new legends to the database. The playback introduces the concept of custom events that 'bubble' up through the DOM, enabling top-level elements to control requests for data.

You'll learn why it's often better for components not to manage app-wide data themselves. Having a top-level element manage the entire web app's data makes components simpler and more reusable, as they don't need to know about each other or communicate directly.

In this playback, you'll learn:

- How components can generate custom events to request data instead of managing it themselves
- How a top-level element can listen for events and handle them
- How a top-level element accesses data and passes it to components that need it

::: info View the playback here:

```component VPCard
{
  "title": "Web Components Part 3- NewLegendForm - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/3/10",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## Web Components Part 4: Building a Complete App

In this final lesson, I bring everything together to create a complete application with authentication. I'll add a new `AuthBox` component and implement a light authentication system so that only registered, logged-in users can add new legends to the database.

The playback uses sessions on the server to control user access and reinforces the importance of centralized data management in component-based architecture.

In this playback, you'll learn:

- How to implement user authentication with a web component
- How to integrate all components into a complete, functional application
- Best practices for data management in component-based web applications

::: info View the playback here:

```component VPCard
{
  "title": "Web Components Part 4- AuthBox - PlaybackPress",
  "desc": "An Introduction to Web Development from Back to Front by Mark Mahoney",
  "link": "https://playbackpress.com/books/webdevbook/chapter/3/11",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

---

## React vs Web Components Comparison

Some of the main differences between React and web components can be summarized like this:

| Key Property | React | Web Components |
| ---: | --- | --- |
| **Component Definition** | Uses functions (typically) to define components | Uses JavaScript classes that extend HTMLElement |
| **Tooling Requirements** | Requires tools for installation, transpilation, bundling (npm, webpack, babel, and so on) | Native browser support with no build tools or installation required |
| **Template Syntax** | Uses JSX, an HTML-like syntax within JavaScript | Uses standard HTML in strings or HTML templates |
| **DOM Updates** | Uses Virtual DOM to efficiently batch and minimize actual DOM manipulations | Directly manipulates the DOM, typically less optimized for frequent updates |
| **Property Types** | Accepts various data types as props (strings, arrays, objects, functions) | Only accepts strings as attributes in HTML |
| **Rendering Model** | Declarative: describe what the UI should look like, React handles updates | More imperative: directly manipulate the DOM in response to changes |
| **Style Encapsulation** | No built-in style encapsulation (requires CSS-in-JS or CSS Modules) | Built-in style encapsulation with Shadow DOM |
| **Browser Support** | Works in all browsers via polyfills | Modern browsers only (may require polyfills for older browsers) |
| **Ecosystem** | Large ecosystem with many libraries and tools | Smaller ecosystem, but growing |

---

## Wrapping Up

These four lessons cover the fundamentals of Web Components, but there's much more to explore. Web Components provide a standards-based way to create reusable elements without the need for external libraries or frameworks, making them particularly valuable for building maintainable and portable code.

If you found this format helpful, explore the rest of the book to see how full web apps are built from scratch using modern tools and approaches.

Web Components represent just one approach to component-based web development. Keep building, keep reading, and try out the other playbacks when you're ready to go further.

If you have feedback about the playbacks I'd love to hear from you. You can reach me here [<VPIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Brief Introduction to Web Components",
  "desc": "In a previous article, I gave a brief introduction to React. This tutorial introduces an alternative approach to building a component-based frontend. It covers the fundamentals of Web Components to build modular, reusable elements for your web applic...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-brief-introduction-to-web-components.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
