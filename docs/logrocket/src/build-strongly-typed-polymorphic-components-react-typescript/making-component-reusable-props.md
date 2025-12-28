---
lang: en-US
title: "Making the component reusable with its props"
description: "Article(s) > (7/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (7/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Making the component reusable with its props"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//making-component-reusable-props.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#making-component-reusable-props"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

Our current solution is much better than what we started with. Give yourself a pat on the back for making it this far — it only gets more interesting from here.

The use case to cater to in this section is very applicable in the real world. There’s a high chance that if you’re building some sort of component, then that component will also take in some specific props that are unique to the component.

Our current solution takes into consideration the `as`, `children`, and the other component props based on the `as` prop. However, what if we wanted this component to handle its own props?

Let’s make this practical. We will have the `Text` component receive a `color` prop. The `color` here will either be any of the rainbow colors or `black`.

We will go ahead and represent this as follows:

```tsx
type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";
```

Next, we must define the `color` prop in the `TextProps` object as follows:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  color?: Rainbow | "black"; // 👈 look here
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;
```

Before we go ahead, let’s have a bit of a refactor. Let’s represent the actual props of the `Text` component by a `Props` object, and specifically type only the props specific to our component in the `TextProps` object.

This will become obvious, as you’ll see below:

```tsx
// new "Props" type
type Props <C extends React.ElementType> = TextProps<C>

export const Text = <C extends React.ElementType = "span">({
  as,
  children,
  ...restProps,
}: Props<C>) => {
  const Component = as || "span";
  return <Component {...restProps}>{children}</Component>;
};
```

Now let’s clean up `TextProps`:

```tsx
// before 
type TextProps<C extends React.ElementType> = {
  as?: C;
  color?: Rainbow | "black"; // 👈 look here
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

// after
type TextProps<C extends React.ElementType> = {
  as?: C;
  color?: Rainbow | "black";
};
```

Now, `TextProps` should just contain the props that are specific to our `Text` component: `as` and `color`.

We must now update the definition for `Props` to include the types we’ve removed from `TextProps`, i.e., `children` and `React.ComponentPropsWithoutRef<C>`.

For the `children` prop, we’ll take advantage of the `React.PropsWithChildren` prop.

![The PropsWithChildren Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/propswithchildren-type.png)

`PropsWithChildren` is pretty easy to reason out. You pass it your component props, and it’ll inject the children props definition for you:

```tsx
type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>>
```

Note how we use the angle braces; this is the syntax for passing on generics. Essentially, the `React.PropsWithChildren` accepts your component props as a generic and augments it with the `children` prop. Sweet!

For `React.ComponentPropsWithoutRef<C>`, we’ll just go ahead and leverage an intersection type here:

```tsx
type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>> & 
React.ComponentPropsWithoutRef<C>
```

And here’s the full current solution:

```tsx
type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type TextProps<C extends React.ElementType> = {
  as?: C;
  color?: Rainbow | "black";
};

type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>> & 
React.ComponentPropsWithoutRef<C>

export const Text = <C extends React.ElementType = "span">({
  as,
  children,
}: Props<C>) => {
  const Component = as || "span";
  return <Component> {children} </Component>;
};
```

I know these can feel like a lot, but when you take a closer look it’ll all make sense. It’s really just putting together everything you’ve learned so far!

Having done this necessary refactor, we can now continue on to our solution. What we have now actually works. We’ve explicitly typed the `color` prop, and you may use it as follows:

```tsx
<Text color="violet">Hello world</Text>
```
