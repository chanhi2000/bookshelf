---
lang: en-US
title: "Problems with this simple implementation"
description: "Article(s) > (3/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (3/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Problems with this simple implementation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//problems-simple-implementation.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#problems-simple-implementation"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

The implementation in the previous section, while quite standard, has many demerits. Let’s explore some of these.

---

## 1. The `as` prop can receive invalid HTML elements

Presently, it is possible for a user to write the following:

```jsx
<MyComponent as="emmanuel">Hello Wrong Element</MyComponent>
```

The `as` prop passed here is `emmanuel`. Emmanuel is obviously a wrong HTML element, but the browser also tries to render this element.

![Rendering A Wrong HTML Element Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/rendering-a-wrong-html-element-type.png)

An ideal development experience is to show some kind of error during development. For example, a user may make a simple typo — `divv` instead of `div` — and would get no indication of what’s wrong.

---

## 2. Wrong attributes can be passed for valid elements

Consider the following component usage:

```jsx
<MyComponent as="span" href="https://www.google.com">
   Hello Wrong Attribute
</MyComponent>
```

A consumer can pass a `span` element to the `as` prop, and an `href` prop as well.

This is technically invalid. A `span` element does not (and should not) take in an `href` attribute. That is invalid HTML syntax. However, a consumer of the component we’ve built could still go ahead to write this and get no errors during development.

---

## 3. No attribute support!

Consider the simple implementation again:

```jsx
const MyComponent = ({ as, children }) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

The only props this component accepts are `as` and `children`, nothing else. There’s no attribute support for even valid `as` element props, i.e., if `as` were an anchor element `a`, we should also support passing an `href` to the component.

```jsx
<MyComponent as="a" href="...">A link </MyComponent>
```

Even though `href` is passed in the example above, the component implementation receives no other props. Only `as` and `children` are deconstructed.

Your initial thoughts may be to go ahead and spread every other prop passed to the component as follows:

```jsx
const MyComponent = ({ as, children, ...rest }) => {
  const Component = as || "span";

  return <Component {...rest}>{children}</Component>;
};
```

This seems like a decent solution, but now it highlights the second problem mentioned above. Wrong attributes will now be passed down to the component as well.

Consider the following:

```jsx
<MyComponent as="span" href="https://www.google.com">
   Hello Wrong Attribute
</MyComponent>
```

And note the eventual rendered markup:

![A Span Element With An Href Attribute](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/span-element-with-href-attribute.png)

A `span` with an `href` is invalid HTML.

::: important Why is this bad?

To recap, the current issues with our simple implementation is subpar because:

- It provides a terrible developer experience
- It is not type-safe. Bugs can (and will) creep in

:::

How do we resolve these concerns? To be clear, there’s no magic wand to wave here. However, we’re going to leverage TypeScript to ensure you build strongly typed polymorphic components.

Upon completion, developers using your components will avoid the runtime errors above and instead catch them during development or build time — all thanks to TypeScript.
