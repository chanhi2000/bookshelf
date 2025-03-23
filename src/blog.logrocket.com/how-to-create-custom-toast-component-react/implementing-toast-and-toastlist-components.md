---
lang: en-US
title: "Implementing toast and `ToastList` components"
description: "Article(s) > (6/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (6/9) How to create a custom toast component with React"
    - property: og:description
      content: "Implementing toast and `ToastList` components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/implementing-toast-and-toastlist-components.html
date: 2023-06-21
isOriginal: false
author:
  - name: Uzochukwu Eddie Odozi
    url : https://blog.logrocket.com/author/uzochukwuodozi/
cover: /assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to create a custom toast component with React",
  "desc": "Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them.",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to create a custom toast component with React"
  desc="Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them."
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#implementing-toast-toastlist-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

To achieve a consistent display across all browsers, let’s incorporate a global stylesheet that establishes default settings and normalizes the appearance of specific elements. We can accomplish this by modifying the index.css file, which we cleared at the start of the tutorial.

Feel free to include a CSS base or reset of your preference; for simplicity, I’ll be using a basic reset combined with a few custom properties:

```css :collapsed-lines
:root {
  --secondary-hue: 25;
  --input-radius: 0.25em;
  --input-margin: 0.5em;
  --input-padding: 1em;
  --input-border-width: 1px;
  --paragraph-margin: 1em;
  --text-leading: 1.5;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font: 1em / var(--text-leading) sans-serif;
  background-color: hsl(var(--secondary-hue) 15% 90%);
  color: hsl(var(--secondary-hue) 10% 25%);
}

p {
  margin: 0;
}

p + p {
  margin-top: var(--paragraph-margin);
}

input,
select,
button {
  padding: var(--input-padding);
  border: var(--input-border-width) solid hsl(var(--secondary-hue) 10% 45%);
  border-radius: var(--input-radius);
  font: inherit;
  line-height: 1;
  background-color: hsl(var(--secondary-hue) 10% 95%);
  color: inherit;
}

input,
select {
  background-color: hsl(var(--secondary-hue) 0% 100%);
}

label + input,
label + select,
label + button {
  margin-top: var(--input-margin);
}

input[type='checkbox'] + label {
  margin-left: var(--input-margin);
}

button {
  cursor: pointer;
  border-style: solid;
  border-color: hsl(var(--secondary-hue) 0% 0%);
  background-color: hsl(var(--secondary-hue) 0% 0%);
  color: hsl(var(--secondary-hue) 10% 90%);
}

[disabled] {
  opacity: 0.5;
}
```

The CSS above functions as a style reset for the application, normalizing default styles and providing optimized spacing and sizing for elements such as the body, paragraphs, and form inputs. Additionally, we use CSS variables to control most of the customizable aspects.

For the app-specific layout settings, I’m using the following CSS to align and size up different settings and inputs, which you may ignore if you are implementing toast notifications in an existing project:

```css
:root {
  --app-width: 500px;
  --app-spacing: 2em;
  --app-title-size: 1.5em;
  --app-group-gap: 1em;
  --app-group-gap-lg: 1.5em;
}
#root {
  display: flex;
  min-height: 100vh;
  padding: var(--app-spacing);
}
.app {
  margin: auto;
  padding: var(--app-spacing);
  max-width: var(--app-width);
}
.app-title {
  margin-top: 0;
  text-align: center;
  font-size: var(--app-title-size);
}
.app-row + .app-row {
  margin-top: var(--app-group-gap-lg);
}
.app-row input:not([type="checkbox"]),
.app-row select,
.app-row button {
  width: 100%;
}
.app-row--group {
  display: grid;
  gap: var(--app-group-gap) var(--app-group-gap-lg);
}
@media only screen and (min-width: 650px) {
  .app-row--group {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## Defining the states

Let’s begin by importing React and the `useState` Hook into our App.jsx file. By using the `useState` Hook, we can establish state variables to effectively manage and track various data states within our application:

```jsx title="App.jsx"
import React, { useState } from "react";
import ToastList from "./components/ToastList/ToastList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1 className="app-title">React Toast Notifications</h1>
    </div>
  );
};

export default App;
```

Create a function called `showToast` and pass two parameters called `message` and `type`:

```jsx
const showToast = (message, type) => {}
```

After importing the `useState` Hook, create a bunch of state variables to manage an array of toast messages, their automatic closing, the duration of automatic closing, and the `ToastList` position:

```jsx
const [toasts, setToasts] = useState([]);
const [autoClose, setAutoClose] = useState(true);
const [autoCloseDuration, setAutoCloseDuration] = useState(5);
const [position, setPosition] = useState("bottom-right");
```

You may modify the default states of these state variables, based on your requirements and considering the defaults you supplied to the PropTypes, if you’re using them. Our plan is to display the appropriate toast when a specific button is clicked, based on the position selected by the user. If no position is selected, the default position (bottom-right) will be used.
