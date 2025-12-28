---
lang: en-US
title: "Building a simple polymorphic component"
description: "Article(s) > (2/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (2/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Building a simple polymorphic component"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//building-simple-polymorphic-component.html
date: 2022-05-25
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Build strongly typed polymorphic components with React and TypeScript",
  "desc": "Learn how to build strongly typed polymorphic React components with TypeScript, using familiar Chakra UI and MUI component props as guides.",
  "link": "/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build strongly typed polymorphic components with React and TypeScript"
  desc="Learn how to build strongly typed polymorphic React components with TypeScript, using familiar Chakra UI and MUI component props as guides."
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#building-simple-polymorphic-component"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

Contrary to what you may think, building your first polymorphic component is quite straightforward. Here’s a basic implementation:

```jsx
const MyComponent = ({ as, children }) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

Note here that the polymorphic prop `as` is similar to Chakra UI’s. This is the prop we expose to control the render element of the polymorphic component.

Secondly, note that the `as` prop isn’t rendered directly. The following would be wrong:

```jsx
const MyComponent = ({ as, children }) => {
  // wrong render below 👇 
  return <as>{children}</as>;
};
```

When [<VPIcon icon="fas fa-globe"/>rendering an element type at runtime](https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime), you must first assign it to a capitalized variable, and then render the capitalized variable.

![Using A Capitalized Variable](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/using-capitalized-variable.png)

Now you can go ahead and use this component as follows:

```jsx
<MyComponent as="button">Hello Polymorphic!<MyComponent>
<MyComponent as="div">Hello Polymorphic!</MyComponent>
<MyComponent as="span">Hello Polymorphic!</MyComponent>
<MyComponent as="em">Hello Polymorphic!</MyComponent>
```

Note that the different `as` prop is passed to the rendered components above.

![The Different Rendered Elements](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/different-rendered-elements.jpeg)
