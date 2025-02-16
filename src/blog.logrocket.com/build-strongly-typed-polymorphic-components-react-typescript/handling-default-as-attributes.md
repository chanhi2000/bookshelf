---
lang: en-US
title: "Handling default `as` attributes"
description: "Article(s) > (6/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (6/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Handling default `as` attributes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//handling-default-as-attributes.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#handling-default-as-attributes"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

Consider again our current solution:

```tsx
export const Text = <C extends React.ElementType>({
  as,
  children,
  ...restProps
}: TextProps<C>) => {
  const Component = as || "span"; // 👈 look here

  return <Component {...restProps}>{children}</Component>;
};
```

Particularly, pay attention to where a default element is provided if the `as` prop is omitted.

```tsx
const Component = as || "span"
```

This is properly represented in the JavaScript world by implementation: if `as` is optional, it’ll default to a `span`.

The question is, how does TypeScript handle this case when `as` isn’t passed? Are we equally passing a default type?

Well, the answer is no, but below’s a practical example. Let’s say you went ahead to use the `Text` component as follows:

```jsx
<Text>Hello Text world</Text>
```

Note that we’ve passed no `as` prop here. Will TypeScript be aware of the valid props for this component?

Let’s go ahead and add an `href`:

```tsx
<Text href="https://www.google.com">Hello Text world</Text>
```

If you go ahead and do this, you’ll get no errors. That’s bad.

A `span` should not receive an `href` prop / attribute. While we default to a `span` in the implementation, TypeScript is unaware of this default. Let’s fix this with a simple, generic default assignment:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

/**
* See default below. TS will treat the rendered element as a 
span and provide typings accordingly
*/
export const Text = <C extends React.ElementType = "span">({
  as,
  children,
  ...restProps
}: TextProps<C>) => {
  const Component = as || "span";
  return <Component {...restProps}>{children}</Component>;
};
```

The important bit is highlighted below:

```tsx
<C extends React.ElementType = "span">
```

Et voilà! The previous example we had should now throw an error when you pass `href` to the `Text` component without an `as` prop.

The error should read: `Property 'href' does not exist on type ...`.

![Property Href Does Not Exist On Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/property-href-doesnt-exist-error-1.png)
