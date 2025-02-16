---
lang: en-US
title: "Supporting refs in polymorphic components"
description: "Article(s) > (10/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (10/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Supporting refs in polymorphic components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/supporting-refs-polymorphic-components.html
next: /blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/README.md#conclusion-and-ideas-for-next-steps
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#supporting-refs-polymorphic-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

Do you remember every reference to `React.ComponentPropsWithoutRef` so far? 😅 Component props … *without* refs. Well, now’s the time to put the refs in!

This is the final and most complex part of our solution. I’ll need you to be patient here, but I’ll also do my best to explain every step in detail.

First things first, do you remember [**how `refs` in React work**](/blog.logrocket.com/complete-guide-react-refs.md)? The most important concept here is that you just don’t pass `ref` as a prop and expect it to be passed down into your component like every other prop. The recommended way to handle `refs` in your functional components is to use the [**`forwardRef` function**](/blog.logrocket.com/cleaning-up-the-dom-with-forwardref-in-react/).

Let’s start off on a practical note.

If you go ahead and pass a `ref` to our `Text` component now, you’ll get an error that reads `Property 'ref' does not exist on type ...`.

```tsx
// Create the ref object 
const divRef = useRef<HTMLDivElement | null>(null);
... 
// Pass the ref to the rendered Text component
<Text as="div" ref={divRef}>
  Hello Text world
</Text>
```

![Property Ref Does Not Exist Error](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/property-ref-doesnt-exist-error.jpeg)

This is expected.

Our first shot at supporting refs will be to use `forwardRef` in the `Text` component as shown below:

```tsx
// before 
export const Text = <C extends React.ElementType = "span">({
  as,
  color,
  children,
}: PolymorphicComponentProp<C, TextProps>) => {
  ...
};


// after
import React from "react";

export const Text = React.forwardRef(
  <C extends React.ElementType = "span">({
    as,
    color,
    children,
  }: PolymorphicComponentProp<C, TextProps>) => {
    ...
  }
);
```

This is essentially just wrapping the previous code in `React.forwardRef`, that’s all.

Now, `React.forwardRef` has the following signature:

```tsx
React.forwardRef((props, ref) ... )
```

Essentially, the second argument received is the `ref` object. Let’s go ahead and handle that:

```tsx
type PolymorphicRef<C extends React.ElementType> = unknown;

export const Text = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: PolymorphicComponentProp<C, TextProps>,
    // 👇 look here
    ref?: PolymorphicRef<C>
  ) => {
    ...
  }
);
```

What we’ve done here is added the second argument, `ref`, and declared its type as `PolymorphicRef`, which just points to `unknown` for now.

Note that `PolymorphicRef` takes in the generic `C`. This is similar to previous solutions — the `ref` object for a `div` differs from that of a `span`, so we need to take into consideration the element type passed to the `as` prop.

Point your attention to the `PolymorphicRef` type. How can we get the `ref` object type based on the `as` prop?

Let me give you a clue: `React.ComponentPropsWithRef`!

Note that this says *with* ref. Not *without* ref.

Essentially, if this were a bundle of keys (which, in fact, it is), it’ll include all the relevant component props based on the element type, plus the ref object.

![The ComponentPropsWithRef Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/componentpropswithref-type.png)

So now, if we know this object type contains the `ref` key, we may as well get that ref type by doing the following:

```tsx
// before 
type PolymorphicRef<C extends React.ElementType> = unknown;

// after 
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];
```

Essentially, `React.ComponentPropsWithRef<C>` returns an object type, e.g.,

```tsx
{
  ref: SomeRefDefinition, 
  // ... other keys, 
  color: string 
  href: string 
  // ... etc
}
```

To pick out just the `ref` type, we can then do this:

```tsx
React.ComponentPropsWithRef<C>["ref"];
```

Note that the syntax is similar to the property accessor syntax in JavaScript, i.e., `["ref"]`. Now that we’ve got the `ref` prop typed, we can go ahead and pass that down to the rendered element:

```tsx
export const Text = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: PolymorphicComponentProp<C, TextProps>,
    ref?: PolymorphicRef<C>
  ) => {
    //...

    return (
      <Component {...style} ref={ref}> // 👈 look here
        {children}
      </Component>
    );
  }
);
```

We’ve made decent progress! In fact, if you go ahead and check the usage of `Text` like we did before, there’ll be no more errors:

```tsx
// create the ref object 
const divRef = useRef<HTMLDivElement | null>(null);
... 
// pass ref to the rendered Text component
<Text as="div" ref={divRef}>
  Hello Text world
</Text>
```

However, our solution still isn’t as strongly typed as I’d like. Let’s go ahead and change the ref passed to the `Text` as shown below:

```tsx
// create a "button" ref object 
const buttonRef = useRef<HTMLButtonElement | null>(null);
... 
// pass a button ref to a "div". NB: as = "div"
<Text as="div" ref={buttonRef}>
  Hello Text world
</Text>
```

TypeScript should throw an error here, but it doesn’t. We’re creating a `button` ref, but passing it to a `div` element. That’s not right.

![No Error Thrown When A Wrong Element Ref Is Passed](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/no-error-thrown.png)

If you take a look at the exact type of `ref`, it looks like this:

```tsx
React.RefAttributes<unknown>.ref?: React.Ref<unknown>
```

Do you see the `unknown` in there? That’s a sign of weak typing. We should ideally have `HTMLDivElement` in there to explicitly define the ref object as a `div` element ref.

We’ve got work to do. Let’s first look at the types for the other props of the `Text` component, which still reference the `PolymorphicComponentProp` type. Change this to a new type called `PolymorphicComponentPropWithRef`. This will just be a union of `PolymorphicComponentProp` and the ref prop. (You guessed right.)

Here it is:

```tsx
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & 
{ ref?: PolymorphicRef<C> };
```

This is just a union of the previous `PolymorphicComponentProp` and `{ ref?: PolymorphicRef<C> }`.

Now we need to change the props of the component to reference the new `PolymorphicComponentPropWithRef` type:

```tsx
// before
type TextProps = { color?: Rainbow | "black" };

export const Text = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: PolymorphicComponentProp<C, TextProps>,
    ref?: PolymorphicRef<C>
  ) => {
    ...
  }
);


// now 
type TextProps<C extends React.ElementType> = 
PolymorphicComponentPropWithRef<
  C,
  { color?: Rainbow | "black" }
>;

export const Text = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: TextProps<C>, // 👈 look here
    ref?: PolymorphicRef<C>
  ) => {
    ...
  }
);
```

We’ve updated `TextProps` to reference `PolymorphicComponentPropWithRef` and that’s now passed as the props for the `Text` component. Lovely!

There’s one final thing to do: provide a type annotation for the `Text` component. It looks similar to:

```tsx
export const Text : TextComponent = ...
```

`TextComponent` is the type annotation we’ll write. Here it is fully written out:

```tsx
type TextComponent = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => React.ReactElement | null;
```

This is essentially a functional component that takes in `TextProps` and returns `React.ReactElement | null`, where `TextProps` is as defined earlier:

```tsx
type TextProps<C extends React.ElementType> = 
PolymorphicComponentPropWithRef<
  C,
  { color?: Rainbow | "black" }
>;
```

With this, we now have a complete solution!

I’m going to share the complete solution now. It may seem daunting at first, but remember we’ve worked line by line through everything you see here. Read it with that confidence.

```tsx :collapsed-lines
import React from "react";

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
* This is the updated component props using PolymorphicComponentPropWithRef
*/
type TextProps<C extends React.ElementType> = 
PolymorphicComponentPropWithRef<
  C,
  { color?: Rainbow | "black" }
>;

/**
* This is the type used in the type annotation for the component
*/
type TextComponent = <C extends React.ElementType = "span">(
  props: TextProps<C>
) => React.ReactElement | null;

export const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, color, children }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "span";

    const style = color ? { style: { color } } : {};

    return (
      <Component {...style} ref={ref}>
        {children}
      </Component>
    );
  }
);
```

And there you go!