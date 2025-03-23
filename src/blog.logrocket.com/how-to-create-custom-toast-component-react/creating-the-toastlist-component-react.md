---
lang: en-US
title: "Creating the `ToastList` component in React"
description: "Article(s) > (5/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (5/9) How to create a custom toast component with React"
    - property: og:description
      content: "Creating the `ToastList` component in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/creating-the-toastlist-component-react.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#creating-toastlist-component-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

Let’s define the list component now and add some props. The `ToastList` component takes in three props: `data`, `position`, and `removeToast`. The `data` prop represents an array that will contain objects, `position` determines the placement of the toast list on the page, and `removeToast` acts as a callback to be provided to the `onClose` attribute of the `Toast` component:

```jsx :collapsed-lines title="components/toast/ToastList.jsx"
import React from "react";
import Toast from "../Toast/Toast";
import "./ToastList.css";

const ToastList = ({ data, position, removeToast }) => {
  ...
};

export default ToastList;
```

To use the `position` prop, add it to the element with a `className` of `toast-list` as shown below:

```jsx :collapsed-lines title="components/toast/ToastList.jsx"
const ToastList = ({ data, position, removeToast }) => {
  return (
    <div
      className={`toast-list toast-list--${position}`}
      aria-live="assertive"
    >
      ..
    </div>
  );
};
```

Whatever position prop is passed into the toast component, it will be added as a class to those elements (recall that we already set the CSS position properties in the CSS file). Because `data` is an array, we can loop through it directly in the JSX.

First, import the `useRef` and `useEffect` Hooks from React where the `useRef` will be used to get the reference of the toast list without relying on traditional Web API methods in JavaScript. The `useEffect` Hook will be called when re-rendering is required:

```jsx
import React, { useRef, useEffect } from 'react';
```

Add this after the props destructuring:

```jsx
const listRef = useRef(null);
```

As already discussed, the structure of our `ToastList` is a simple wrapper element with `Toast` components as its contents. The `position` prop determines the dynamic CSS classes, which dictate the position of the `ToastList` on the screen.

Within its contents, we can iterate over the `data` prop and include a `Toast` component for each item in `data`, ensuring that the appropriate props are passed. For instance, we will assign the `removeToast` callback to the `onClose` prop of each `Toast` component and decide the toast-removal logic later on in the app component:

```jsx :collapsed-lines title="components/toast/ToastList.jsx"
const ToastList = ({ data, position, removeToast }) => {
  return (
    data.length > 0 && (
      <div
        className={`toast-list toast-list--${position}`}
        aria-live="assertive"
      >
        {data.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
};
```

Before proceeding, it’s important to consider the correct ordering and scrolling of toast notifications based on the position of `ToastList`. While it may appear sufficient at first glance, there are some crucial aspects to address.

By default, toast notifications are added to the list from top to bottom. Each new notification is placed at the bottom, and if the list exceeds the maximum height limit, a scrollbar appears. However, the scrollbar currently doesn’t adjust and jumps to the latest notification. This can be improved for a better user experience.

Moreover, when the `ToastList` is positioned at the bottom-left or bottom-right, the flow of toast notifications should be reversed. In other words, the most recent toast should be displayed at the top rather than the bottom. This simple adjustment is crucial for creating a position-intuitive toast list that enhances the overall user experience.

To fix the scrolling issue, we can use the `Element.scrollTo` method from the JavaScript Web API. Additionally, we will use the `useRef` and `useEffect` Hooks from the React library. This will allow us to obtain a reference to the toast list without relying on `Document.getElementById`, and enable us to adjust the scroll whenever there are changes to the `position` or `data` props:

```jsx :collapsed-lines title="components/toast/ToastList.jsx"
import React, { useEffect, useRef } from "react";

const ToastList = ({ data, position, removeToast }) => {
  const listRef = useRef(null);

  const handleScrolling = (el) => {
    const isTopPosition = ["top-left", "top-right"].includes(position);
    if (isTopPosition) {
      el?.scrollTo(0, el.scrollHeight);
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data]);

  ...
};
```

Additionally, the data reversal process can be simplified by using the spread operator on the `data` array and subsequently applying the `reverse()` method. These steps should be performed after checking if the current position of the `ToastList` is either bottom-left or bottom-right:

```jsx :collapsed-lines title="components/toast/ToastList.jsx"
const ToastList = ({ data, position, removeToast }) => {
  // ...

  const sortedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];

  return (
    sortedData.length > 0 && (
      <div
        className={`toast-list toast-list--${position}`}
        aria-live="assertive"
        ref={listRef}
      >
        {sortedData.map((toast) => (
          <Toast
            ...
          />
        ))}
      </div>
    )
  );
};  
```

This concludes our `ToastList` component. You can view its [full code here (<FontIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast/blob/main/src/components/ToastList/ToastList.jsx). If you are wondering what kind of data would be passed to `ToastList`, here’s the structure of the object array that will be provided to the `data` prop:

```js 
[
  {
    id: 1,
    message: "This is a success toast component",
    type: "success"
  }, {
    id: 2,
    message: "This is a failure toast message.",
    type: "failure"
  }, {
    id: 3,
    message: "This is a warning toast message.",
    type: "warning",
  }
];
```
