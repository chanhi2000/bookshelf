---
lang: en-US
title: "How to use TypeScript to build strongly typed polymorphic components in React"
description: "Article(s) > (4/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (4/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "How to use TypeScript to build strongly typed polymorphic components in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//how-to-use-typescript-build-strongly-typed-polymorphic-components-react.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#how-to-use-typescript-build-strongly-typed-polymorphic-components-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

If you’re reading this, a prerequisite is that you already know some TypeScript — at least the basics. If you have no clue what TypeScript is, I strongly recommend [<VPIcon icon="iconfont icon-typescript"/>giving this document a read](https://typescriptlang.org/docs/handbook/typescript-from-scratch.html) first.

In this section, we will use TypeScript to solve the aforementioned concerns and build strongly typed polymorphic components.

The first two requirements we will start off with include:

- The `as` prop should not receive invalid HTML element strings
- Wrong attributes should not be passed for valid elements

In the following section, we will introduce TypeScript generics to make our solution more robust, developer-friendly, and production-worthy.

---

## Ensuring the `as` prop only receives valid HTML element strings

Here’s our current solution:

```jsx
const MyComponent = ({ as, children }) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

To make the next sections of this guide practical, we’ll change the name of the component from `MyComponent` to `Text` and assume we’re building a polymorphic `Text` component.

```jsx
const Text = ({ as, children }) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

Now, with your knowledge of generics, it becomes obvious that we’re better off representing `as` with a generic type, i.e., a variable type based on whatever the user passes in.

![The As Prop](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/as-prop.png)

Let’s go ahead and take the first step as follows:

```tsx
export const Text = <C>({
  as,
  children,
}: {
  as?: C;
  children: React.ReactNode;
}) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

Note how the generic `C` is defined and then passed on in the type definition for the prop `as`.

However, if you wrote this seemingly perfect code, you’ll have TypeScript yelling out numerous errors with more squiggly red lines than you’d like 🤷‍♀️

![The JSX Generic Error](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/jsx-generic-error.png)

What’s going on here is a flaw in the [<VPIcon icon="fa-brands fa-stack-overflow"/>syntax for generics](https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics?) in `.tsx` files. There are two ways to solve this.

---

## 1. Add a comma after the generic declaration

This is the syntax for declaring multiple generics. Once you do this, the TypeScript compiler clearly understands your intent and the errors are banished.

```tsx
// note the comma after "C" below 👇
export const Text = <C,>({
  as,
  children,
}: {
  as?: C;
  children: React.ReactNode;
}) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

---

## 2. Constrain the generic

The second option is to constrain the generic as you see fit. For starters, you can just use the `unknown` type as follows:

```tsx
// note the extends keyword below 👇
export const Text = <C extends unknown>({
  as,
  children,
}: {
  as?: C;
  children: React.ReactNode;
}) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

For now, I’ll stick to the second solution because it’s closer to our final solution. In most cases, though, I use the multiple generic syntax and just add a comma.

However, with our current solution, we get another TypeScript error:

> JSX element type ‘Component’ does not have any construct or call signatures. ts(2604)

![No Construct Or Call Error](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/no-construct-or-call-error.png)

This is similar to the error we had when we worked with the `echoLength` function. Just like accessing the `length` property of an unknown variable type, the same may be said here: trying to render any generic type as a valid React component doesn’t make sense.

We need to constrain the generic only to fit the mold of a valid React element type.

To achieve this, we’ll leverage the internal React type: `React.ElementType`, and make sure the generic is constrained to fit that type:

```tsx
// look just after the extends keyword 👇
export const Text = <C extends React.ElementType>({
  as,
  children,
}: {
  as?: C;
  children: React.ReactNode;
}) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

Note that if you’re using an older version of React, you may have to import a newer React version as follows:

```jsx
import React from 'react'
```

With this, we have no more errors!

Now, if you go ahead and use this component as follows, it’ll work just fine:

```jsx
<Text as="div">Hello Text world</Text>
```

However, if you pass an invalid `as` prop, you’ll now get an appropriate TypeScript error. Consider the example below:

```jsx
<Text as="emmanuel">Hello Text world</Text>
```

And the error thrown:

> Type ‘”emmanuel”‘ is not assignable to type ‘ElementType | undefined’.

![Type Emmanuel Is Not Assignable Error](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/type-emmanuel-not-assginable-error.jpeg)

This is excellent! We now have a solution that doesn’t accept gibberish for the `as` prop and will also prevent against nasty typos, e.g., `divv` instead of `div`.

This is a much better developer experience!
