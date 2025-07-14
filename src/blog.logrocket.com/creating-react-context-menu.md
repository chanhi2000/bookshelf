---
lang: en-US
title: "Creating a React context menu"
description: "Article(s) > Creating a React context menu"
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
      content: "Article(s) > Creating a React context menu"
    - property: og:description
      content: "Creating a React context menu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/creating-react-context-menu.html
prev: /programming/js-react/articles/README.md
date: 2022-12-05
isOriginal: false
author:
  - name: Hulya Karakaya
    url : https://blog.logrocket.com/author/hulyakarakaya/
cover: /assets/image/blog.logrocket.com/creating-react-context-menu/banner.png
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
  name="Creating a React context menu"
  desc="Explore how to create a React context menu, the shortcuts to activate right-click menus, and how to create a custom context menu Hook."
  url="https://blog.logrocket.com/creating-react-context-menu"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/creating-react-context-menu/banner.png"/>

::: note Editor’s note:

This guide to creating a React context menu was last updated on 5 December 2022 to update the information for [**React Router v6.**](/blog.logrocket.com/migrating-react-router-v6-guide.md) This update also includes new sections about disabling the right-click context menu and creating a custom context menu Hook in React.

:::

![Creating a React Context Menu](/assets/image/blog.logrocket.com/creating-react-context-menu/banner.png)

If you right-click your browser while visiting a website, you can see your OS’s native context menu. From there, you can save, print, create a QR code for the page, and much more. You can see options like copy, paste, and cut if you highlight text. You may also see customized context menus on email or list applications and collaboration apps like Trello and Notion. These right-click menus (also known as context menus) give users more options while they are using the app.

This post will explore how to create a [<FontIcon icon="fas fa-globe"/>React](https://blog.logrocket.com/tag/react/) context menu, the shortcuts to activate right-click menus, and how to create a [**custom context menu Hook**](/blog.logrocket.com/react-render-props-vs-custom-hooks.md).

You can see the project demo below and check out [<FontIcon icon="iconfont icon-codesandbox"/>the complete code](https://codesandbox.io/p/github/Taofiqq/react-context-menu/main?file=%2FREADME.md) on GitHub or the [<FontIcon icon="fas fa-globe"/>deployed website](https://react-context-menu-livid.vercel.app/).

---

## What is React context menu?

A [<FontIcon icon="fa-brands fa-wikipedia-w"/>context menu](https://en.wikipedia.org/wiki/Context_menu) (also called right-click menu) is a graphical user interface (GUI) menu that appears upon a user interaction, such as a right-click mouse operation. Context menus offer a limited set of choices available in the current state, or context, of the OS or application to which the menus belong.

---

## Getting started with our React project

To start creating a custom right-click menu in React, we will initialize a React project using the `npx create-react-app react-context-menu` command, then go into the project folder using the command `cd react-context-menu`. For this tutorial, we will be using [<FontIcon icon="fas fa-globe"/>`styled-components`](https://styled-components.com/https://blog.logrocket.com/benefits-using-styled-components-react/) for the styling:

![React Context Menu Example](/assets/image/blog.logrocket.com/creating-react-context-menu/react-context-menu-example.webp)

### Project and folder structuring

In our <FontIcon icon="fas fa-folder-open"/>`src` file, we will create four folders:

- <FontIcon icon="fas fa-folder-open"/>`components`: This will house all the components we will be using throughout the project
- <FontIcon icon="fas fa-folder-open"/>`data`: This will store the data information that will be rendered on the webpage
- <FontIcon icon="fas fa-folder-open"/>`hooks`: This is where we will create the Hook for the right-click context menu
- <FontIcon icon="fas fa-folder-open"/>`styles`: This folder will contain a file for all of our styles

![React Context Menu Project Structure](/assets/image/blog.logrocket.com/creating-react-context-menu/react-project-folder-structure.png)

---

## How to disable the right-click context menu

If you go to your Chrome or Mozilla browser and right-click anywhere, you will see the default browser context menu like this:

![React Right-Click Context Menu Example](/assets/image/blog.logrocket.com/creating-react-context-menu/react-right-click-menu-example.png)

We will use the `onContextMenu` prop to disable this default behavior in our <FontIcon icon="fa-brands fa-react"/>`App.jsx` file. It will look like this:

```jsx title="App.jsx"
import "./App.css";

function App() {
  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        console.log("Right Click");
      }}
    >
      Context Menu
      </div>
  );
}
export default App;
```

Now, let’s see what we have in the browser:

![React Context Menu Clicking Example](/assets/image/blog.logrocket.com/creating-react-context-menu/react-context-menu-click.gif)

As you can see, when any other **part of the browser** is right-clicked, the default menu shows up, but when **Context** is right-clicked, it does not show up, and a text is logged in the console.

---

## Creating a custom right-click context menu in React

To get started, we will create a <FontIcon icon="fa-brands fa-js"/>`data.js` file in the <FontIcon icon="fas fa-folder-open"/>`data` folder and populate it with the data that we will be using for the project:

```js title="data/data.js"
export const data = [
  {
    id: 1,
    title: "Message 1",
  }, {
    id: 2,
    title: "Message 2",
  }, {
    id: 3,
    title: "Message 3",
  }, {
    id: 4,
    title: "Message 4",
  },
];
```

Then, we will create a new component inside the <FontIcon icon="fas fa-folder-open"/>`component` folder called <FontIcon icon="fa-brands fa-js"/>`MenuContext.js` and use this component in our <FontIcon icon="fa-brands fa-react"/>`App.jsx`:

```jsx title="App.jsx"
import "./App.css";
import MenuContext from "./components/MenuContext";
import { data } from "./data/data";
function App() {
  return (
    <div className="App">
      <MenuContext  />
    </div>
  );
}
export default App;
```

```jsx title="component/MenuContext.jsx"
import React, { useState, useEffect } from "react";
const MenuContext = () => {
  return (
    <div>
      MenuContext
    </div>
  );
};
export default MenuContext;
```

Now, we should have something like this in our browser:

![React Context Menu](/assets/image/blog.logrocket.com/creating-react-context-menu/react-menu-context.png)

In our previous section, we mentioned that we need to disable the default right-click context menu of the browser. We will use the `onContextMenu` prop, as it has been mentioned before:

```jsx title="component/MenuContext.js"
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        console.log("Right Click");
      }}
    >
      MenuContext
    </div>
```

Here, we use the `onContextMenu` to prevent the default browser context menu behavior and take the `event method` to prevent the browser’s default behavior. A console log was specified to display a text in our console when we right-click in the browser, as we cannot see the browser’s default context menu again:

![Example of React Right-Click Context Menu](/assets/image/blog.logrocket.com/creating-react-context-menu/react-right-click-context-menu.png)

After right-clicking and preventing the default browser behavior, a text was logged into the console (`Right Click`) to show we right-clicked.

---

## Implementing the React custom right-click menu

Now that the default right-click custom menu has been disabled, we can proceed to the custom right-click menu implementation.

First, we import our data into `App.jsx` and pass it as a prop to the `MenuContext` component. In `MenuContext`, we will destructure this prop (`data`) and map over it to render our data to the browser UI:

```jsx title="App.jsx"
import "./App.css";
import MenuContext from "./components/MenuContext";
import { data } from "./data/data";
function App() {
  return (
    <div className="App">
      <MenuContext data={data} />
    </div>
  );
}
export default App;
```

```jsx title="components/MenuContext.jsx"
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
const MenuContext = ({ data }) => {
   return (
    <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu key={item.id} title={item.title} />
        </div>
      ))}
    </div>
  );
};
export default MenuContext;
```

Here, we are mapping over the data array, returning a `Menu` component, and passing in the `ID` and `title`. In the <FontIcon icon="fa-brands fa-react"/>`Menu.jsx` file, we will use these two props as follows:

```jsx title="components/Menu.jsx"
import React from "react";
import { MenuContextContainer } from "../styles/styles";
const Menu = ({ title, key }) => {
  return (
    <>
      <MenuContextContainer key={key}>{title}</MenuContextContainer>
    </>
  );
};
export default Menu;
```

The `MenuContextContainer` is a [**styled-component**](/blog.logrocket.com/using-styled-components-react.md) coming from the <FontIcon icon="fas fa-folder-open"/>`styles` file:

```jsx title="styles/styles.js"
import styled, { css } from "styled-components";
export const MenuContextContainer = styled.div`
  border: 1px solid #ffffff2d;
  border-radius: 4px;
  padding: 18px;
  margin: 5px 0;
  box-sizing: border-box;
`;
```

Now, we can check what we have in our browser:

![React Browser Right-Click Menu Example](/assets/image/blog.logrocket.com/creating-react-context-menu/react-browser-example.png)

### Displaying the right-click context menu

When we click any **message boxes**, a console text `"Right Click"` will be logged. Now, we need to implement it so the right-click context menu displays once when any of the **boxes** are right-clicked and not four times. This is because we are rendering four items on the UI, and the menu is displayed wherever the mouse is pointed:

```jsx :collapsed-lines title="compoennts/MenuContext.jsx"

import React, { useState, useEffect } from "react";
import { ContextMenu } from "../styles/styles";
import Menu from "./Menu";
const MenuContext = ({ data }) => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu id={item.id} title={item.title} />
        </div>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
};
export default MenuContext;
```

In the <FontIcon icon="fa-brands fa-react"/>`MenuContext.jsx` file, we create two states: `clicked` and `points`. The `clicked` state (with a Booleanvalue) will monitor when the mouse is right-clicked. The `points` (with an objectstate) will be used to get the `x` and `y` coordinates of where the **mouse** was clicked.

---

## Using the `useEffect` Hook

The value of `x` and `y` will be set at default to `0`. Then, we have to make it so that when we click anywhere on the **page**, the context menu disappears just as it works for the default custom right-click menu text. To achieve that, we will register an event listener on the window by calling the [**`useEffect` Hook**](/blog.logrocket.com/guide-usestate-react.md) and creating a function called `handleClick`. We will also set the `clicked` state to `false` to not show it.

Then, we will reference the window, call the `addEventListener` method, and register a `click` event so that whenever we click anywhere in the window or browser, the document will call `handle click`. Lastly, we will attach [**a cleanup function**](/blog.logrocket.com/understanding-react-useeffect-cleanup-function.md) to remove the event listener to avoid memory leaks.

The event object contains the values of the present **coordinates** being clicked. To make it clearer, we can log `e.x` and `e.y` in the `onContextMenu` prop:

```jsx title="MenuContext.jsx"
  <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu id={item.id} title={item.title} />
        </div>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
```

Now, we can check the console to see what is logged when we click different places on the browser:

![React Context Menu Console Log Example](/assets/image/blog.logrocket.com/creating-react-context-menu/react-context-menu-consol-log.png)

I clicked four places where we were rendering our items and the `x` and `y` coordinate values were logged or returned.

In the `div` wrapping and our `Menu` items (where we already initiate the `onCotextMenu` prop), we will set the `clicked` state to `true` and the `points` to the `x` and `y` coordinates that are clicked.

---

## Styling the React context menu

`ContextMenu` is a div styled in the `styles.js` file. It will only be displayed when clicked is true. For example, only when any of the **message boxes** are clicked because we set the `click` to be `true` in the `div` wrapping the `message boxes` element.

Remember, the default value of our `clicked` state is `false`. The values for `x` and `y` are passed to the `ContextMenu` div as props and used to style the position where the context menu should be displayed. Lastly, an unordered list was created in the `ContextMenu`, which will be displayed when any **item** (`Message 1- 4`) is right-clicked:

```jsx title="styles/styles.js"
import styled, { css } from "styled-components";
export const MenuContextContainer = styled.div`
  border: 1px solid #ffffff2d;
  border-radius: 4px;
  padding: 18px;
  margin: 5px 0;
  box-sizing: border-box;
`;
export const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 18px 12px;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`;
```

Now, we can check what we have in the browser:

![React Context Right-Click Menu Final Product](/assets/image/blog.logrocket.com/creating-react-context-menu/react-context-menu-final.webp)

---

## Creating a custom context menu Hook in React

To create a custom right-click context menu Hook, we will create a file named <FontIcon icon="fa-brands fa-react"/>`useContextMenu.jsx`, where we will create the Hook function. Also, we will create an additional file in the <FontIcon icon="fas fa-folder-open"/>`components` folder called <FontIcon icon="fa-brands fa-react"/>`MenuContextHook.jsx`:

```jsx title="hooks/useContextMenu.jsx"
import { useState, useEffect } from "react";
const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};
export default useContextMenu;
```

In the `useContexMenu` Hook, we declare two states: `clicked` and `points` — just like in the previous section. Then, we use the `useEffect` Hook to register an event listener and clean up the event with the cleanup function. Lastly, `clicked`, `setClicked`, `points`, and `setPoints` are returned.

In the <FontIcon icon="fa-brands fa-react"/>`MenuContextHook.jsx` file, we will make use of this Hook as follows:

```jsx :collapsed-lines title="components/MenuContextHook.jsx"
import React from "react";
import useContextMenu from "../hooks/useContextMenu";
import { ContextMenu } from "../styles/styles";
import Menu from "./Menu";
const MenuContextHook = ({ data }) => {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  return (
    <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu key={item.id} title={item.title} />
        </div>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
};
export default MenuContextHook;
```

Basically, in this file, we are restructuring `clicked`, `setClicked`, `points`, and `setPoints` from the `useContextMenu` Hook and using it to create the custom right-click menu, as was explained in the previous section.

---

## Conclusion and considerations

This article covered the many ways to create a custom context menu in React applications. Keep in mind if you are creating your custom context menu in React, consider [<FontIcon icon="fas fa-globe"/>mobile interaction](https://blog.logrocket.com/ux-design/designing-microinteractions-better-app-ux/). Users may be unable to right-click if they use a mobile phone.

Because of this, you may need to think twice about why you need a custom context menu. It can cause bad experiences if the user wants to see the default menu.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating a React context menu",
  "desc": "Explore how to create a React context menu, the shortcuts to activate right-click menus, and how to create a custom context menu Hook.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/creating-react-context-menu.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
