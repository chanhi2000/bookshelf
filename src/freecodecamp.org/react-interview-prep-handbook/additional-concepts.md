---
lang: ko-KR
title: "Additional Concepts"
description: "Article(s) > (4/6) The React Interview Prep Handbook – Essential Topics and Code Examples" 
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
      content: "Article(s) > (4/6) The React Interview Prep Handbook – Essential Topics and Code Examples"
    - property: og:description
      content: "Additional Concepts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/additional-concepts.html
date: 2024-10-11
isOriginal: false
author: Kunal Nalawade
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The React Interview Prep Handbook – Essential Topics and Code Examples",
  "desc": "Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ...",
  "link": "/freecodecamp.org/react-interview-prep-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The React Interview Prep Handbook – Essential Topics and Code Examples"
  desc="Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ..."
  url="https://freecodecamp.org/news/react-interview-prep-handbook#heading-additional-concepts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"/>

Here are some additional concepts that can be helpful:

---

## Why not Use Index as Keys while Rendering Lists?

When you render lists in React using the `Array.map` method, you are asked to provide a unique `key` prop to each item being rendered. This key is used to distinguish elements from each other.

Indices are unique, so it's tempting to use them as keys for simplicity. However, indices of elements are not stable.

Elements often get added or deleted in an array. The order of elements could get changed too. In these cases, value of `key` prop changes and may lead to unpredictable behavior.

Let's consider the following list:

```jsx
const items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' }
]
export const App = () => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        {item.name}
      </li>
    ))}
  </ul>
);
```

Each rendered item in the list has its index as the key. If we delete `Item B` from the list, the references of the other elements get changed.

React uses keys to uniquely identify list elements, so that rendering them becomes easier. React often re-uses these elements for quick renders. However, if an element gets deleted, the keys of all subsequent elements are updated.

React may reuse the deleted key or render the entire list again which could lead to performance issues. Instead of indices, choose something unique, preferably username, email or an ID generated by database.

---

## Higher Order Components

A higher order component (HOC) is a function that takes a component as an argument and returns a new component that wraps the original one. HOCs allow you to provide additional functionality to a component as well as re-use it across multiple components.

Rather than providing a short explanation here, I would recommend the following article that explains HOCs with various examples:

```component VPCard
{
  "title": "How to Use Higher-Order Components in React",
  "desc": "Higher-order components (HOCs) are a powerful feature of the React library. They allow you to reuse component logic across multiple components.  In React, a higher-order component is a function that takes a component as an argument and returns a new ...",
  "link": "/freecodecamp.org/higher-order-components-in-react.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Lazy Loading

Lazy loading is a web development pattern that delays the loading of resources like images, videos, or non-essential components. It helps web pages load faster by first loading the content necessary for interaction, and then loading the rest of the content.

One example of lazy loading is an E-commerce product catalog page. The page first loads the names and prices of products and clickable elements. Then, it loads the images and other UI elements.

In React, lazy loading can be implemented using `React.lazy()` and `Suspense`:

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export const App = () => {
  return (
    <div>
      <h1>Showing lazy component below</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};
```

- Once you have identified a component to lazy load, use the `React.lazy()` function to dynamically import the lazy component.
- Wrap the lazy-loaded component inside `Suspense`. It renders a fallback (default) component till the lazy component loads.

This way, you can load a React component on demand. This is also known as code splitting**.** The code is split and some part of the React code is loaded dynamically when needed.

Code splitting optimizes the performance of React applications that have large, complex components. By using `Suspense`, you can display a temporary UI to the user, so they don't have to stare at a blank screen while a component is loading.

Code splitting breaks your application into several chunks, with each chunk being loaded independently. So, this process is also known as chunking**.**

---

## Difference Between Client-side and Server-side Rendering

There are two ways to render webpages in React. Let's have a look:

::: tabs

@tab:active Server Side Rendering (SSR)

- Web Page is generated and rendered on the server before sending to the client. Client receives complete web page from the server and displays it directly to the user.
- Loading the prepared HTML helps with faster loading times, improving the user experience. This is especially beneficial for users with slower internet connections.
- Since the web page is already prepared, it helps search engines better index your website, making it more SEO-friendly.
- SSR can increase server load if the page is updated frequently. Pages with dynamic content can take longer to update because they need to re-render often.
- SSR is used for marketing, blogging and news websites where initial load times and SEO are important.

@tab Client Side Rendering (CSR)

- A basic HTML file is sent to the client, and then it renders dynamic content using JavaScript.
- Initial load times are slower because preparing and rendering the content mostly happens on the client side.
- Since it initially renders basic HTML and adds JavaScript content later, search engines may not be able to index your content, making it less SEO-friendly.
- For web pages with dynamic content, rendering times are faster since all the rendering happens on client side.
- CSR is used for websites with dynamic content and frequent user interactions like social media platforms or dashboards.

:::