---
lang: en-US
title: "Displaying toast notifications using the `showToast` method"
description: "Article(s) > (7/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (7/9) How to create a custom toast component with React"
    - property: og:description
      content: "Displaying toast notifications using the `showToast` method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/displaying-toast-notifications-using-the-showtoast-method.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#displaying-toast-notifications-using-showtoast-method"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

In the `showToast` method, we will create a new object with the `showToast` parameter and add it to the toasts using the `setToasts` state method. Additionally, we will check for the `autoClose` value, which is essentially a checkbox state. If enabled, the toast will be automatically removed after the specified `autoCloseDuration`:

```jsx
const showToast = (message, type) => {
  const toast = {
    id: Date.now(),
    message,
    type,
  };

  setToasts((prevToasts) => [...prevToasts, toast]);

  if (autoClose) {
    setTimeout(() => {
      removeToast(toast.id);
    }, autoCloseDuration * 1000);
  }
};
```

---

## Adding trigger buttons

In the JSX, we can use native HTML buttons and pass the `showToast` method to their `onClick` event handlers in order to trigger a specific type of toast with a designated message. Furthermore, we can include a button that, when clicked, removes all available toasts at once. Here’s an example to illustrate this functionality:

```jsx
<div className="app-row app-row--group">
  <button onClick={() => showToast("A success message", "success")}>
    Show Success Toast
  </button>
  <button onClick={() => showToast("A failure message", "failure")}>
    Show Error Toast
  </button>
  <button onClick={() => showToast("A warning message", "warning")}>
    Show Warning Toast
  </button>
  <button onClick={removeAllToasts}>Clear Toasts</button>
</div>
```
