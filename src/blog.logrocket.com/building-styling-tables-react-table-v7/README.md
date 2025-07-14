---
lang: en-US
title: "What’s new in React Table v7?"
description: "Article(s) > What’s new in React Table v7?"
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
      content: "Article(s) > What’s new in React Table v7?"
    - property: og:description
      content: "What’s new in React Table v7?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7/
prev: /programming/js-react/articles/README.md
date: 2020-04-02
isOriginal: false
author:
  - name: John Au-Yeung
    url : https://blog.logrocket.com/author/johnau-yeung/
cover: /assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg
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
  name="What’s new in React Table v7?"
  desc="The latest version of React Table, react-table v7, provides a modern, Hooks-based API that helps us create tables in React with little hassle."
  url="https://blog.logrocket.com/building-styling-tables-react-table-v7"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg"/>

It’s widely acknowledged that creating a table with React is a pain. No surprise, then, that there are many libraries to make creating tables easier for React apps. One of these packages is [**`react-table`**](/blog.logrocket.com/complete-guide-building-smart-data-table-react.md). It provides a modern, Hooks-based API to let us create tables in React with little hassle.

![Building And Styling Tables With react-table v7](/assets/image/blog.logrocket.com/building-styling-tables-react-table-v7/banner.jpeg)

With the latest major release, [React Table v7 (<FontIcon icon="iconfont icon-github"/>`tannerlinsley/react-table`)](https://github.com/tannerlinsley/react-table/releases/tag/v7.0.0), creator Tanner Linsley aimed to refactor the entire library to a UI-, style-, and markup-agnostic table building tool that uses Hooks exclusively.

In this tutorial, we’ll tell you all you need to know about the latest version of `react-table` (at the time of writing, the most recent release is [React Table v7.6.3 (<FontIcon icon="iconfont icon-github"/>`tannerlinsley/react-table`)](https://github.com/tannerlinsley/react-table/releases)), outline the major changes and new features shipped with React Table v7, and see them in action with a basic example.

---

## Introducing React Table v7

In March 2020, React Table creator Tanner Linsley released[React Table v7 (<FontIcon icon="iconfont icon-github"/>`tannerlinsley/react-table`)](https://github.com/tannerlinsley/react-table/releases/tag/v7.0.0), which he described as “the culmination of over a years \[sic\] worth of work to refactor the entire library to a hooks-only UI/Style/Markup agnostic table building utility.”

<VidStack src="youtube/fwOZUU3OqmY" />

React Table v7 is comprised of a collection of React Hooks and plugins designed to help you compose logical features of complex data grids into a single, performant, extensible, and unopinionated API, which is returned by the primary `useTable` hook.

As a headless utility, React Table v7 doesn’t render or supply data table UI elements out of the box. That means you’re responsible for rendering your own table markup using the state and callback of the hooks provided by React Table.

```component VPCard
{
  "title": "New features in React Table 7",
  "desc": "(1/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/new-features-in-react-table-v7.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Creating a basic table with React Table v7",
  "desc": "(2/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/creating-a-basic-table-with-react-table-v7.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Adding a footer",
  "desc": "(3/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/adding-a-footer.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Sorting",
  "desc": "(4/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/sorting.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Filtering",
  "desc": "(5/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/filtering.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Pagination",
  "desc": "(6/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/pagination.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Integrating React Table v7 with Material UI",
  "desc": "(7/7) What’s new in React Table v7?",
  "link": "/blog.logrocket.com/building-styling-tables-react-table-v7/integrating-react-table-v7-with-material-ui.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

---

## Conclusion

As we can see, react-table is capable of creating tables with lots of capabilities without having to create everything from scratch ourselves.

It provides us with a Hooks-based API to create tables, which is important since some devs would like to switch to using function components with Hooks now.

There are many more examples to showcase what react-table can do on [its official GitHub repo (<FontIcon icon="iconfont icon-github"/>`tannerlinsley/react-table`)](https://github.com/tannerlinsley/react-table). Some examples are simplified from the examples on their official website.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s new in React Table v7?",
  "desc": "The latest version of React Table, react-table v7, provides a modern, Hooks-based API that helps us create tables in React with little hassle.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-styling-tables-react-table-v7.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
