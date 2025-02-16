---
lang: en-US
title: "Real-world examples of polymorphic components"
description: "Article(s) > (1/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (1/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Real-world examples of polymorphic components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//real-world-examples-polymorphic-components.html
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#real-world-examples-polymorphic-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

There’s a nonzero chance you’ve already used a polymorphic component. Open source [**component libraries**](https://blog.logrocket.com/build-component-library-react-typescript.md) typically implement some sort of polymorphic component.

Let’s consider some you may be familiar with: the Chakra UI `as` prop and MUI `component` prop.

---

## Chakra UI’s `as` prop
f
![Chakra UI](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/chakra-ui.jpeg)

How does [<FontIcon icon="fas fa-globe"/>Chakra UI](https://chakra-ui.com/) implement polymorphic props? The answer is by exposing an `as` prop. The `as` prop is passed to a component to determine what container element it should eventually render.

![Chakra UI As Prop](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/chakra-ui-as-prop.png)

All you need to do to use the `as` prop is pass it to the component, which in this case is `Box`:

```jsx
<Box as='button' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
  Button
</Box>
```

Now, the component will render a `button` element.

![The Box Component Rendered As A Button](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/box-component-rendered-as-button.png)

If you changed the `as` prop to a `h1`:

```jsx
<Box as="h1"> Hello </Box>
```

Now, the `Box` component renders a `h1`:

![The Box Component Rendered As An H1](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/box-component-rendered-as-h1.png)

That’s a polymorphic component at work! It can be rendered to entirely unique elements, all by passing down a single prop.

---

## MUI’s `component` prop

![MUI's Component Prop](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/MUI-component-prop.jpeg)

Similar to Chakra UI, [**MUI**](/blog.logrocket.com/definitive-guide-react-material/) allows for a polymorphic prop called `component`, which is implemented similarly: you pass it to a component and state the element or custom component you’d like to render.

Here’s an example from [<FontIcon icon="fas fa-globe"/>the official docs](https://mui.com/material-ui/guides/composition/#component-prop):

![The MUI Component Prop](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/MUI-component-prop-1.jpeg)

```jsx
<List component="nav">
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
</List>
```

`List` is passed a component prop of `nav`; when this is rendered, it’ll render a `nav` container element.

Another user may use the same component, but not for navigation; instead, they may want to render a to-do list:

```jsx
<List component="ol">
  ...
</List>
```

And in this case, `List` will render an ordered list `ol` element.

Talk about flexibility! See a [summary of the use cases (<FontIcon icon="iconfont icon-github"/>`ohansemmanuel/polymorphic-react-component`)](https://github.com/ohansemmanuel/polymorphic-react-component/blob/master/use-cases.pdf) for polymorphic components.

As you’ll come to see in the following sections of this article, polymorphic components are powerful. Apart from just accepting a prop of an element type, they can also accept custom components as props.

This will be discussed in a coming section of this article. For now, let’s get building our first polymorphic component!
