---
lang: en-US
title: "The top React UI libraries and kits in 2023"
description: "Article(s) > The top React UI libraries and kits in 2023"
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
      content: "Article(s) > The top React UI libraries and kits in 2023"
    - property: og:description
      content: "The top React UI libraries and kits in 2023"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/top-react-ui-libraries-kits.html
prev: /programming/js-react/articles/README.md
date: 2023-10-05
isOriginal: false
author:
  - name: Chidume Nnamdi
    url : https://blog.logrocket.com/author/chidumennamdi/
cover: /assets/image/blog.logrocket.com/top-react-ui-libraries-kits/banner.png
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
  name="The top React UI libraries and kits in 2023"
  desc="Learn about the most popular React UI libraries and when to use them, comparing their installation processes and features."
  url="https://blog.logrocket.com/top-react-ui-libraries-kits"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/banner.png"/>

::: note Editor’s Note

This list of React UI libraries was last updated on 5 October 2023.

:::

![The Top React UI Libraries And Kits In 2023](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/banner.png)

React is currently on top of the JavaScript food chain. Stack Overflow’s [<FontIcon icon="fa-brands fa-stack-overflow"/>2023 Developer Survey](https://survey.stackoverflow.co/2023/#web-frameworks-and-technologies:~:text=in%20that%20row.) shows React as the second most commonly used web framework, just slightly behind Node.js. Due to its popularity, many UI libraries have built custom React components to facilitate easy integration and improve the developer experience.

There are countless React UI kits and libraries available today. In this guide, we’ll highlight 14 of the most useful kits and libraries and show how you can use them in your next React app. A few of them are popular, and some are more obscure, but all of them can help address the unique needs of your next React project.

---

## What are React UI libraries?

A React UI library or React component library is a software system or toolchain that comes with a collection of components — design elements that are ready to use in React applications.

Some examples of these components or design elements in a React UI library are tables, charts, modals, navbars, cards, buttons, and maps. These components are out-of-the-box, and beautifully and uniquely styled.

The usage and popularity of React UI libraries increases linearly with the usage and popularity of React. Because of this popularity, which includes over [200K GitHub stars (<FontIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react), React developers have a nearly endless variety of UI libraries with custom components to choose from.

---

## When to use a React UI library

Building UI components from scratch can be tedious and sometimes futile. This is why component libraries exist; they provide ready-to-use design elements, thereby allowing developers to focus on building the UI without building everything from scratch.

While building everything from scratch gives you complete control, it comes with a cost: maintainability. Using UI library makes more sense in most cases and it brings with it the following benefits:

- **Speed**: By providing beautiful components or design elements, UI libraries ensure that developers focus on implementing the functionality of an app, thereby, speeding up the development process
- **Beautiful UI**: Faster development time doesn’t mean developers should compromise on the look of their application. This is why UI libraries come with beautifully designed, ready-to-use components that act as the building blocks of an application
- **Support and accessibility**: Because the web is accessed by different people with different devices and needs, it is a huge task to build components from scratch that address your users’ accessibility needs and have the correct styles on multiple devices. UI libraries take care of these and also handle the support of older browsers
- **Cross-browser compatibility**: In some cases — usually involving the use of a relatively new CSS property or browser tool — developing CSS that works with all browsers can be tricky. This can negatively affect your user’s experience. UI libraries are an effective solution for this because they have cross-browser compatibility so your application will work on all modern browsers

---

## React Bootstrap

![React Bootstrap](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/react-bootstrap.png)

[<FontIcon icon="fas fa-globe"/>React Bootstrap](https://react-bootstrap.github.io/) rebuilds Bootstrap — the most popular frontend framework for React — removing the unnecessary jQuery dependency.

Although the jQuery dependency is removed, React Bootstrap embraces its Bootstrap core and works with the entire Bootstrap stylesheet. Consequently, it is compatible with many Bootstrap themes.

As one of the oldest React frameworks, React Bootstrap has evolved and matured linearly with React. Additionally, each component is implemented with accessibility in mind, so it offers a set of accessible-by-default design elements.

To install React Bootstrap, run the following code:

```sh
npm i react-bootstrap bootstrap
```

You can easily import and use components like this:

```jsx
import Button from 'react-bootstrap/Button';

// or less ideally
import { Button } from 'react-bootstrap';

<Stack direction="horizontal" gap={2}>
  <Button as="a" variant="primary">
    Button as link
  </Button>
  <Button as="a" variant="success">
    Button as link
  </Button>
</Stack>
```

---

## Core UI

![Core UI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/core-ui.png)

[<FontIcon icon="fas fa-globe"/>Core UI](https://coreui.io/react/) is one of the most powerful React UI component libraries. It provides a robust collection of simple, customizable, easy-to-use React.js UI components and React.js Admin Templates. Consequently, Core UI provides all the design elements needed to build modern, beautiful, and responsive React.js applications, thereby cutting the development time significantly.

In addition to speeding up your development time, Core UI provides beautifully handcrafted design elements that are Bootstrap-compatible. These design elements are true React components built from scratch with Boostrap but without the jQuery dependency.

Furthermore, Core UI provides both mobile and cross-browser compatibility.

To use Core UI, install it by running the following:

```sh
npm i @coreui/react
```

Then you can import components to use like this:

```jsx
import { Alert } from '@coreui/react';
```

---

## PrimeReact

![PrimeReact](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/primereact.jpeg)

[<FontIcon icon="fas fa-globe"/>PrimeReact](https://primefaces.org/primereact/), built by [<FontIcon icon="fas fa-globe"/>PrimeTek Informatics](https://primetek.com.tr/), is one of the most extraordinary React UI kits that accelerates frontend design and development, featuring a collection of more than 70 components to choose from.

In addition to a wide variety of components, PrimeReact features custom themes, premium application templates, a11y, and responsive and touch-enabled UI components to deliver an excellent UI experience on any device.

For more details, [check out PrimeReact on GitHub (<FontIcon icon="iconfont icon-github"/>`primefaces/primereact`)](https://github.com/primefaces/primereact).

The kit is easy to install and use:

```sh
npm i primereact --save
```

For icons, you can download the `primeicons` library:

```sh
npm i primeicons --save
```

To use a component, import it at the import section of the component’s documentation:

```jsx title="PrimeButtonEx.jsx"
import { Button } from "primereact/button"

function PrimeButtonEx() {
  return (
    <div>
      <Button>Button</Button>
    </div>
  )
}
```

---

## Grommet

![Grommet](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/grommet.png)

Part design, part framework, [<FontIcon icon="fas fa-globe"/>Grommet](https://v2.grommet.io/) is a UI library based in React. It features a [<FontIcon icon="fas fa-globe"/>great set of components](https://v2.grommet.io/components) that make it easy to get started. The library also provides powerful theming tools that allow you to tailor the component library to align with your desired layout, color, and type.

The [Grommet Design Kit (<FontIcon icon="iconfont icon-github"/>`grommet/design-kit`)](https://github.com/grommet/design-kit) is a drag-and-drop tool that makes designing your layout and components a breeze. It features sticker sheets, app templates, and plenty of icons:

![Grommet UI Design](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/grommet-ui-design.jpeg)

To set up Grommet, run the following command in your React app:

```sh
npm i grommet
```

To use a component such as `Button`, destructure it from the `"grommet"` package:

```jsx title="GrommetButtonEx.jsx"
import { Grommet, Button } from "grommet"

function GrommetButtonEx() {
  return (
    <Grommet className="App">
      <Button
        label="Button" 
      />
    </Grommet>
  )
}
```

---

## Onsen UI

![Onsen UI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/onsen-ui.png)

If you want your web app to feel native, [<FontIcon icon="fas fa-globe"/>Onsen UI](https://onsen.io/) is the library for you. Onsen UI is designed to enrich the user experience with a mobile-like feel. It’s packed with features that provide the UI experience of native iOS and Android devices.

Onsen UI’s elements and components are natively designed and perfect for developing hybrid apps and web apps. The library enables you to simulate page transitions, animations, ripple effects, and popup models — basically, any effect you would find in native Android and iOS devices:

![Onsen UI Samples](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/onsen-ui-samples.png)

To [<FontIcon icon="fas fa-globe"/>use Onsen in a React app](https://onsen.io/v2/guide/react/), first install the npm packages:

```sh
npm i onsenui react-onsenui --save
```

`onsenui` contains the Onsen UI core instance. `react-onsenui` contains the React components:

```jsx title="OnsenButtonEx.jsx"
import { Page, Button } from "react-onsenui"

function OnsenButtonEx() {
    return (
        <Page>
            <Button> Click Me!!</Button>
        </Page>
    )
}
```

Then, import the Onsen CSS:

```jsx
import "onsenui/css/onsenui.css"
import "onsenui/css/onsen-css-components.css"
```

I fondly refer to Onsen UI as the native CSS of the web.

---

## MUI

![MUI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/mui.png)

[<FontIcon icon="fas fa-globe"/>MUI](https://mui.com) (previously Material UI) is based on Google’s Material Design. It provides React components built with Material Design.

To install, run the following command:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @mui/material @emotion/react @emotion/styled
```

:::

Next, import the component you want to use from the <FontIcon icon="fa-brands fa-npm"/>`@mui/material`:

```jsx title="MatButtonEx.jsx"
import Button from '@mui/material/Button';

function MatButtonEx() {
  return (
    <div>
      <Button color="primary">
        Button
      </Button>
    </div>
  )
}
```

MUI also provides beautiful [<FontIcon icon="fas fa-globe"/>premium themes and templates](https://mui.com/store/) you can purchase to jumpstart your project. Check out this article for a [**deeper dive into MUI**](/blog.logrocket.com/using-mui-react-native.md).

---

## Chakra UI

![Chakra UI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/chakra-ui.jpeg)

I am so proud of my fellow Nigerian, Segun Adebayo, for developing [<FontIcon icon="fas fa-globe"/>Chakra UI](https://chakra-ui.com/). It has a clean and neat UI and is one of the most complete React UI kits I have ever seen. Its APIs are simple but composable, and the accessibility is great.

Chakra UI has over [30.8K GitHub stars (<FontIcon icon="iconfont icon-github"/>`chakra-ui/chakra-ui`)](https://github.com/chakra-ui/chakra-ui/), and is very extensible and customizable.

Inside your React project, run the following command to install Chakra UI:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

:::

Chakra UI has a `ChakraProvider` that we must provide at the root of our application when we want to use Chakra components:

```jsx title="App.jsx"
import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component }) {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
}
```

To use a component — for example, `Button` — we have to import it from `@chakra-ui/react`:

```jsx
import { Button, ButtonGroup } from "@chakra-ui/react";
```

Then we can render `Button` like so:

```jsx title="ChakraUIButtonEx.jsx"
function ChakraUIButtonEx() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}
```

For more information about Chakra UI and its components, visit the [<FontIcon icon="fas fa-globe"/>official docs](https://chakra-ui.com/docs/components).

---

## Ant Design

![Ant Design](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/ant-design.png)

[<FontIcon icon="fas fa-globe"/>Ant Design](https://ant.design/) is regarded as one of the best React UI kits in the world. With [over 88K stars on GitHub (<FontIcon icon="iconfont icon-github"/>`ant-design/ant-design`)](https://github.com/ant-design/ant-design), it tops the list as one of the most used and downloaded React UI kits.

Ant Design incorporates and promotes global design patterns and offers features like powerful theme customization, high-quality React components, and internationalization support.

Install Ant Design like so:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add antd
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i antd
```

:::

We can import the style sheets manually:

```jsx
import 'antd/dist/antd.css';
```

We can import any component we want to use from `antd`. For example, to use `Button`, we would do this:

```jsx title="AntdEx.jsx"
import { Button } from "antd";

function AntdEx() {
  return <Button type="primary">Primary Button</Button>;
}
```

Visit this page to see all the [<FontIcon icon="fas fa-globe"/>components in Ant Design](https://ant.design/components/overview). Ant Design also has a [<FontIcon icon="fas fa-globe"/>spin-off for Angular](https://ng.ant.design/docs/introduce/en) and a [<FontIcon icon="fas fa-globe"/>spin-off for Vue.js](https://antdv.com/components/overview).

---

## Semantic UI React

![Semantic UI React](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/semantic-ui-react.png)

[<FontIcon icon="fas fa-globe"/>Semantic UI React](https://react.semantic-ui.com/) is the official Semantic UI integration for React. It is a complete React UI kit that is built on top of the Semantic UI CSS framework.

This Semantic UI React boasts over 100 components and offers the following robust features:

- **Auto-controlled state**: Stateful components are auto-controlled; there’s no need to explicitly write code to get the state or the event
- **Shorthand props**: Semantic UI React components have a shorthand syntax for passing props. For example, instead of `<Button type="primary" />`, we can write `<Button primary />`. A prop can translate to many values. For example, the `icon` props can be an icon `name`, an `<Icon />` instance, or an icon props object
- **Augmentation**: A component can be rendered as another component using the `as` props; a `Header` may be rendered as an `h3` element in the DOM

Semantic UI React is easy to install:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add semantic-ui-react semantic-ui-css
```

@tab <FontIcon icon="fa-brands fa-npm"/> 

```sh
npm i semantic-ui-react semantic-ui-css
```

:::

After installation, we can then import the minified CSS file:

```jsx
import "semantic-ui-css/semantic.min.css";
```

Now, let’s see how we can use an inbuilt Semantic UI component. Let’s use the `Button` component:

```jsx title="ButtonExampleButton.jsx"
import React from "react";
import { Button } from "semantic-ui-react";

const ButtonExampleButton = () => <Button>Click Here</Button>;

export default ButtonExampleButton;
```

To see all components in Semantic UI React, [<FontIcon icon="fas fa-globe"/>visit the official docs](https://react.semantic-ui.com/).

---

## Blueprint UI

![Blueprint UI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/blueprint-ui.png)

[<FontIcon icon="fas fa-globe"/>Blueprint UI](https://blueprintjs.com/) is a React-based UI kit for the web with over [20K stars on GitHub (<FontIcon icon="iconfont icon-github"/>`palantir/blueprint`)](https://github.com/palantir/blueprint). It is hugely optimized for building complex interfaces for desktop applications.

Installing Blueprint UI is very simple:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @blueprintjs/core react react-dom
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @blueprintjs/core react react-dom
```

:::

`@blueprintjs/core` is the core of the Blueprint UI kit. It contains over 40 components we can use. The `react-dom` and `react` packages are required for Blueprint UI to work. Additional components can be obtained from:

- `@blueprintjs/icons`
- `@blueprintjs/select`
- `@blueprintjs/datetime`
- `@blueprintjs/table`
- `@blueprintjs/timezone`

To use a component from Blueprint UI, we’ll have to import it from `@blueprintjs/core`. For example, to use the `Button` component, we will have to import it from `@blueprintjs/core`:

```jsx
import { Button } from "@blueprintjs/core";
```

Then we can render the `Button` like so:

```jsx title="BlueprintUIButtonEx.jsx"
function BlueprintUIButtonEx() {
  return (
    <div>
      <Button intent="success" text="button content">
        Click Me
      </Button>
    </div>
  );
}
```

---

## Visx

![Visx](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/visx.png)

Visx stands for Visual Components and is a collection of reusable, low-level visualization components developed by Airbnb. It consists of several standalone packages for building flexible visual interfaces with React.

Visx is open source and designed to make creating complex and interactive data visualizations easier using React components. Visx provides a set of modular, low-level building blocks for creating custom visualizations, allowing developers to have fine-grained control over the appearance and behavior of their UI.

You can install Visx with npm or yarn:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @visx/shape @visx/scale @visx/axis @visx/group @visx/text
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @visx/shape @visx/scale @visx/axis @visx/group @visx/text
```

:::

---

## Fluent UI

![Fluent UI](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/fluent-ui.png)

Fluent UI, formerly Office UI Fabric, is a set of open source, cross-platform design and user interface (UI) components and libraries developed by Microsoft. It is designed to help developers create consistent, visually appealing, and accessible user interfaces for their web and mobile applications. Fluent UI provides a comprehensive set of UI components that follow the Fluent Design System principles, such as buttons, forms, menus, and more.

To install Fluent UI, run the following code:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @fluentui/react
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @fluentui/react
```

:::

---

## Evergreen

![Evergreen](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/evergreen.png)

Evergreen is a design system and set of open source, React-based UI components created by Segment, a customer data platform company. Evergreen UI is designed to help developers build modern and elegant user interfaces for web applications. It provides a collection of reusable, customizable components that follow a minimalist design philosophy.

Evergreen can be installed by running the code below:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add evergreen-ui
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i --save evergreen-ui
```

:::

You can import and use components as seen below:

```jsx title="App.jsx"
import { Button } from 'evergreen-ui'

function App() {
  return (
    <>
      <Button marginLeft={10} marginRight={10}>Default</Button>
      <Button marginRight={10} appearance="primary">
        Primary
      </Button>
      <Button marginRight={10} appearance="minimal">
        Minimal
      </Button>
    </>
  )
}
```

---

## Mantine

![Mantine](/assets/image/blog.logrocket.com/top-react-ui-libraries-kits/mantine.png)

Mantine is an open source React component library that provides a wide range of high-quality, customizable, and accessible UI components for building modern web applications. Mantine is designed to simplify building user interfaces in React by offering a comprehensive set of components and utilities.

Install Mantine by running any of the code below:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @mantine/core @mantine/hooks
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i @mantine/core @mantine/hooks
```

:::

You can import and use components from Mantine like so:

```jsx
import { Button } from '@mantine/core';
function Demo() {
  return <Button fullWidth>Full width button</Button>;
}
```

---

## TL;DR: Library comparison

| React UI library | GitHub stars | Functions | Weekly npm downloads | Newness |
| --- | --- | --- | --- | --- |
| React Bootstrap | 21.4K | jQuery-free, ready-to-use React components styled with Bootstrap | 1,027,473 | 9 years ago |
| Core UI | 518 | jQuery-free, customizable, easy to learn React.js UI components, and React.js Admin Templates. | 27,220 | 3 years |
| PrimeReact | 3.4K | Rich set of open source UI components for React | 68,554 | 6 years |
| Grommet | 8.1K | Accessibility, modularity, responsiveness, and theming | 37,286 | 8 years |
| Onsen UI | 8.7K | Native-feeling progressive web apps (PWAs) and hybrid apps | 38,838 | 7 years |
| MUI | 83.8K | Ready-to-use foundational React components styled with Google’s Material Design | 1,905,362 | 8 years |
| Chakra UI | 478 | Simple, modular, and accessible UI Components | 960 | 4 years |
| Ant Design | 83.7K | A set of high-quality React components for building enterprise-class UI designed for web applications | 963,039 | 7 years |
| Semantic UI React | 12.9K | jQuery-free, declarative API, beautifully styled React components for enterprise-class UI | 224,892 | 6 years |
| Blueprint UI | 19.5K | Optimized for building complex, data-dense interfaces for desktop applications | 198,590 | 6 years |
| Visx | 17.8K | Visx consists of low-level visualization primitives for React | 664,000 | 3 years |
| Fluent UI | 16.4K | Robust React-based frontend framework/components for building web experiences | 143,570 | 7 years |
| Evergreen | 12.2K | Works out of the box, offers server-side rendering, flexible, composable, enterprise-grade | 11,906 | 6 years |
| Mantine | 21.6K | Free and open source,  
usable in any project, customizable, responsive, and adaptive | 277,742 | 3 years |

---

## Honorable mentions for React UI kits and libraries

If you’re interested in other React UI libraries, check out the following:

- [Atlaskit](https://atlaskit.atlassian.com/)
- [Belle](https://nikgraf.github.io/belle/#/?_k=by80vb)
- [Elemental UI](https://elemental-ui.com/)
- [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/)
- [Reakit](https://reakit.io/)
- [Rebass](https://rebassjs.org/)
- [Shards React](https://designrevision.com/downloads/shards-react/)

---

## Conclusion

In this guide, we reviewed a comprehensive list of React UI kits — everything from innovative newcomers to popular stalwarts. We also shared other React UI kits that are not quite popular but still pack a punch.

Now you should have the basic, foundational knowledge you need to select the right UI kit for your next React project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The top React UI libraries and kits in 2023",
  "desc": "Learn about the most popular React UI libraries and when to use them, comparing their installation processes and features.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/top-react-ui-libraries-kits.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
