---
lang: en-US
title: "Creating a React toast component"
description: "Article(s) > (3/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (3/9) How to create a custom toast component with React"
    - property: og:description
      content: "Creating a React toast component"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/creating-a-react-toast-component.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#creating-react-toast-component"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

To create a toast component, first create a folder called <FontIcon icon="fas fa-folder-open"/>`toast` inside the <FontIcon icon="fas fa-folder-open"/>`components` directory and add two files: <FontIcon icon="fa-brands fa-react"/>`Toast.js` and <FontIcon icon="fa-brands fa-css3-alt"/>`Toast.css`. We are using the `.jsx` extension for our JavaScript files and using the traditional CSS. Optionally, you can use SCSS files as well.

---

## Toast structure

Let’s discuss the structure of the Toast UI and prepare some basic markup before we move on to the steps for styling and componentizing.

The first element to consider is the toast, which will contain and wrap up the contents of every toast notification that will be displayed. Let’s also provide it with a role attribute to make the notifications [<FontIcon icon="fa-brands fa-firefox"/>ARIA-friendly](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA):

```jsx
<div className="toast" role="alert">
</div>
```

Inside the toast element, we will add other elements to display the close button, notification icon, and toast notification message. The following is the markup:

```jsx
<div className="toast" role="alert">
  <div className="toast-message">
    <div className="icon icon--lg icon--thumb">...</div>
    <p>...</p>
  </div>
  <button className="toast-close-btn" onClick={onClose}>
    <span className="icon">...</span>
  </button>
</div>
```

The button in the code above will be used to close a particular toast notification. An image icon will display depending on the type of toast. We will turn this markup into JSX later on as we approach the creation of the toast component in React.

---

## Styling the toast component

Before moving on to the React part, let’s now discuss the styling. Inside the <FontIcon icon="fa-brands fa-css3-alt"/>`Toast.css` file, we’ll add CSS custom properties that contain color and spacing information. These properties will be used in various parts of our toast component:

```css
:root {
  --toast-success-hue: 150;
  --toast-failure-hue: 20;
  --toast-warning-hue: 205;
  --toast-padding: 1.5em;
  --toast-margin: 0.5em;
  --toast-bg-color-fallback: hsl(var(--secondary-hue) 15% 100%);
  --toast-text-color-fallback: hsl(var(--secondary-hue) 10% 25%);
  --toast-opacity: 0.99;
  --toast-content-gap: 1em;
}
```

Next, let’s enhance the appearance of our toast component by applying basic coloring and shadows. We can add rounded corners to give it a more appealing look and make it slightly opaque to create a notification-like effect. When hovered, we will increase its opacity to 100%.

We’ll also position the component relatively to align the close button as desired. Additionally, we’ll add a small margin between toast siblings to create a grouped appearance while allowing them some breathing space:

```css :collapsed-lines
.toast {
  background-color: var(--toast-bg-color-fallback);
  padding: var(--toast-padding);
  box-shadow: hsl(var(--secondary-hue) 10% 10% / 10%) 0px 1px 3px 0px,
    hsl(var(--secondary-hue) 10% 10% / 5%) 0px 1px 2px 0px;
  border-radius: 0.5em;
  position: relative;
  color: var(--toast-text-color-fallback);
  opacity: var(--toast-opacity);
}

.toast:hover {
  opacity: 1;
  box-shadow: hsl(var(--secondary-hue) 10% 10% / 30%) 0px 1px 3px 0px,
    hsl(var(--secondary-hue) 10% 10% / 15%) 0px 1px 2px 0px;
}

.toast + .toast {
  margin-top: var(--toast-margin);
}
```

To enhance the alignment of the toast contents, we can apply flexbox properties to the toast message element. Additionally, we can position the close button absolutely and place it at the top-right corner:

```css :collapsed-lines
.toast-message {
  display: flex;
  gap: var(--toast-content-gap);
  align-items: top;
}

.toast-close-btn {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0;
  line-height: 1;
  height: 1em;
  width: 1em;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}
```

Let’s wrap up the toast stylesheet by adding color themes for the different types of toast notifications that we will be adding to the toast components. To make coloring simple and relatable, I have initially defined some hue values, which I’m using below with the CSS HSL function to declare the success, failure, and warning variants of the toast:

```css :collapsed-lines
.toast--success {
  color: hsl(var(--toast-success-hue) 97% 3%);
  background-color: hsl(var(--toast-success-hue) 98% 99%);
}

.toast--success .icon--thumb {
  color: hsl(var(--toast-success-hue) 90% 40%);
}

.toast--failure {
  color: hsl(var(--toast-failure-hue) 97% 3%);
  background-color: hsl(var(--toast-failure-hue) 98% 99%);
}

.toast--failure .icon--thumb {
  color: hsl(var(--toast-failure-hue) 90% 40%);
}

.toast--warning {
  color: hsl(var(--toast-warning-hue) 97% 3%);
  background-color: hsl(var(--toast-warning-hue) 98% 99%);
}

.toast--warning .icon--thumb {
  color: hsl(var(--toast-warning-hue) 90% 40%);
}
```

---

## Defining the toast component in React

Taking the above defined CSS styles and HTML structure into account, let’s now work on the React part. Inside the <FontIcon icon="fa-brands fa-react"/>`Toast.jsx` file, create an arrow function called `Toast` and set the export function as `default`. Set the parent element to empty tags for now:

```jsx title="components/toast/Toast.jsx"
import React from 'react';

const Toast = () => {
  return (
    <>
    </>
  )
};

export default Toast;
```

The function above will always return a React element. As already discussed, our toast will essentially have three types: success, failure, and warning. The toast can only be one of these three types at a time. The toast notification icon will be added based on the selected type. Additionally, the toast should have a customizable message and a button to close it.

Now, let’s return to <FontIcon icon="fa-brands fa-react"/>`Toast.jsx` and add some props. Import React above the previously discussed <FontIcon icon="fa-brands fa-css3-alt"/>`Toast.css` file, as well as the SVG icons we defined in the first segment:

```jsx title="components/toast/Toast.jsx"
import React from "react";
import "./Toast.css";

import {
  SuccessIcon,
  FailureIcon,
  WarningIcon,
  CloseIcon,
} from "../Icons/Icons";
```

In addition to the toast type, the toast component should receive a message and callback function as props. The callback will be invoked when the close button is clicked. We will use the callback function to handle the deletion of the toast from a parent component at a later stage.

::: note

Props, or properties, are used for passing data from one component to another in React.

:::

I’m declaring the props in the function component itself using ES6 object destructuring in the parameter list:

```jsx
// ...
const Toast = ({ message, type, onClose }) => {
  // ...
};
```

Consider the type values you would provide when using this component. Based on these inputs, create a lookup table that uses each input as a key and assigns the corresponding icon component as its value.

By passing the type as an index to this lookup table, we can effortlessly access the appropriate icon:

```jsx
// ...
const Toast = ({ message, type, onClose }) => {
  const iconMap = {
    success: <SuccessIcon />,
    failure: <FailureIcon />,
    warning: <WarningIcon />,
  };

  const toastIcon = iconMap[type] || null;
};
```

Now, building upon the markup we discussed in the previous segment and incorporating the props we just added to the toast component, we can easily construct the component and export it for future use:

```jsx :collapsed-lines
// ...
const Toast = ({ message, type, onClose }) => {
  const iconMap = {
    success: <SuccessIcon />,
    failure: <FailureIcon />,
    warning: <WarningIcon />,
  };

  const toastIcon = iconMap[type] || null;

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb">{toastIcon}</div>
        )}
        <p>{message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <span className="icon">
          <CloseIcon />
        </span>
      </button>
    </div>
  );
};

export default Toast;
```

As shown above, the toast receives a CSS class dynamically through the `type` prop. Additionally, a condition is added to the `.toast-message` wrapper to render the `toastIcon` only when an icon match is available for the provided type in the `iconMap` lookup table.

Furthermore, the `onClick` event handler for the close button is passed through `onClose` callback, which will be utilized in the parent components of our toast component.

You may use [<FontIcon icon="fa-brands fa-npm"/>`prop-types`](https://npmjs.com/package/prop-types) to set the prop types and their default values, which you have to install additionally. However, this isn’t strictly required in our project. I have used it in the [GitHub repository (<FontIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast/) to demonstrate it for React beginners.

Now that we’ve completed our toast component, we need to create a container component that can act as a list of multiple toast components, hold them together, and intelligently managing their positioning.
