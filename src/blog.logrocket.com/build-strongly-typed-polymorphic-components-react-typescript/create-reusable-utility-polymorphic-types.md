---
lang: en-US
title: "Create a reusable utility for polymorphic types"
description: "Article(s) > (9/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (9/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Create a reusable utility for polymorphic types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//create-reusable-utility-polymorphic-types.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#create-reusable-utility-polymorphic-types"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

We’ve finally got a solution that works well. Now, however, let’s take it one step further.

The solution we have works great for our `Text` component. However, what if you’d rather have a solution you can reuse on any component of your choosing, so that you can have a reusable solution for every use case?

Let’s get started. First, here’s the current complete solution with no annotations:

```jsx :collapsed-lines
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

type Props<C extends React.ElementType> = React.PropsWithChildren<
  TextProps<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;

export const Text = <C extends React.ElementType = "span">({
  as,
  color,
  children,
  ...restProps
}: Props<C>) => {
  const Component = as || "span";

  const style = color ? { style: { color } } : {};

  return (
    <Component {...restProps} {...style}>
      {children}
    </Component>
  );
};
```

Succinct and practical.

If we made this reusable, then it has to work for any component. This means removing the hardcoded `TextProps` and representing that with a generic — so anyone can pass in whatever component props they need.

Currently, we represent our component props with the definition `Props<C>`. Where `C` represents the element type passed for the `as` prop.

We will now change that to:

```tsx
// before
Props<C>

// after 
PolymorphicProps<C, TextProps>
```

`PolymorphicProps` represents the utility type we will write shortly. However, note that this accepts two generic types, the second being the component props in question: `TextProps`.

Go ahead and define the `PolymorphicProps` type:

```tsx
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = {} // 👈 empty object for now 
```

The definition above should be understandable. `C` represents the element type passed in `as`, and `Props` is the actual component props, `TextProps`.

First, let’s split the `TextProps` we had before into the following:

```tsx
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type TextProps = { color?: Rainbow | "black" };
```

So, we’ve separated the `AsProp` from the `TextProps`. To be fair, they represent two different things. This is a nicer representation.

Now, let’s change the `PolymorphicComponentProp` utility definition to include the `as` prop, component props, and `children` prop, as we’ve done in the past:

```tsx
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>>
```

I’m sure by now you understand what’s going on here: we have an intersection type of `Props` (representing the component props) and `AsProp` representing the `as` prop. These are all passed into `PropsWithChildren` to add the `children` prop definition. Excellent!

Now, we need to include the bit where we add the `React.ComponentPropsWithoutRef<C>` definition. However, we must remember to omit props that exist in our component definition.  
Let’s come up with a robust solution.

Write out a new type that just comprises the props we’d like to omit. Namely, the keys of the `AsProp` and the component props as well.

```tsx
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
```

Remember the `keyof` utility type?

`PropsToOmit` will now comprise a union type of the props we want to omit, which is every prop of our component represented by `P` and the actual polymorphic prop `as`, represented by `AsProps`.

Put this all together nicely in the `PolymorphicComponentProp` definition:

```tsx
type AsProp<C extends React.ElementType> = {
  as?: C;
};

// before 
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>>

// after
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, 
   PropsToOmit<C, Props>>;
```

What’s important here is we’ve added the following definition:

```tsx
Omit<React.ComponentPropsWithoutRef<C>, 
   PropsToOmit<C, Props>>;
```

This basically omits the right types from `React.componentPropsWithoutRef`. Do you still [<VPIcon icon="iconfont icon-typescript"/>remember how `omit`works](https://typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)?

Simple as it may seem, you now have a solution you can reuse on multiple components across different projects!

Here’s the complete implementation:

```tsx
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
```

Now we can go ahead and use `PolymorphicComponentProp` on our `Text` component as follows:

```tsx
export const Text = <C extends React.ElementType = "span">({
  as,
  color,
  children,
  // look here 👇
}: PolymorphicComponentProp<C, TextProps>) => {
  const Component = as || "span";
  const style = color ? { style: { color } } : {};
  return <Component {...style}>{children}</Component>;
};
```

How nice! If you build another component, you can go ahead and type it like this:

```tsx
PolymorphicComponentProp<C, MyNewComponentProps>
```

Do you hear that sound? That’s the sound of victory — you’ve come so far!