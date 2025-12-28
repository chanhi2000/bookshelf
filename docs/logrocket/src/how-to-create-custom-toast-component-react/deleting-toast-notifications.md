---
lang: en-US
title: "Deleting toast notifications"
description: "Article(s) > (8/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (8/9) How to create a custom toast component with React"
    - property: og:description
      content: "Deleting toast notifications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/deleting-toast-notifications.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#deleting-toast-notifications"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

Removing an individual toast notification is a relatively straightforward task, especially when compared to displaying a toast notification. To accomplish this, we can make use of a function that accepts an `id` parameter. By filtering the array of toast notifications, we can quickly identify and remove the notification that doesn’t correspond to the given id, and then apply this filtered array using the `setToasts` method:

```jsx
const removeToast = (id) => {
  setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
};
```

Removing all notifications is even simpler. Just use the `setToasts` state method and pass an empty array as its current state:

```jsx
const removeAllToasts = () => {
  setToasts([]);
};
```

Later, we will use these two methods as prop values or click events in order to clear the notifications.

---

## Auto-deleting toast notifications

Before addressing the auto-close duration input for the toasts, we need to handle the auto-close checkbox input, which enables or disables the duration input.

Additionally, whenever the value of this checkbox changes, we should clear all existing toasts to ensure their display remains synchronized. We can take advantage of the `removeAllToasts` method here that we defined in the last step:

```jsx
const handleAutoCloseChange = () => {
  setAutoClose((prevAutoClose) => !prevAutoClose);
  removeAllToasts();
};
```

We can manage the duration input with the help of the target property of the JavaScript `e``vent` object for input elements. By grabbing the currently selected value from the event target, we can then set it as the current state for the duration state variable:

```jsx
const handleDurationChange = (event) => {
  setAutoCloseDuration(Number(event.target.value));
};
```

To change the default auto-delete duration, simply modify the default value of the `autoCloseDuration` state variable from five to your desired duration.

---

## Adding the auto-deletion controls

Let’s proceed to the JSX part and add two app rows to encompass the input checkbox responsible for toggling the auto-close duration input and the duration input itself.

The checked state of this checkbox is controlled by the `autoClose` state variable, and its change is managed by the `handleAutoCloseChange` function that we defined in one of the previous steps:

![Auto-Deletion Toast Controls In Action](https://blog.logrocket.com/wp-content/uploads/2020/03/auto-deletion-controls.webp)

The availability of the duration input depends on the current value of `autoClose`. The state of this input is managed by the `autoCloseDuration` state variable, and its change is handled by the `handleDurationChange` function, which we discussed in one of the previously mentioned steps:

```jsx :collapsed-lines
<div className="app-row">
  <input
    id="toggleDuration"
    type="checkbox"
    checked={autoClose}
    onChange={handleAutoCloseChange}
  />
  <label htmlFor="toggleDuration">Auto-dismiss?</label>
</div>

<div className="app-row">
  <label htmlFor="duration">Duration (seconds)</label>
  <input
    id="duration"
    type="number"
    min="1"
    max="5"
    value={autoCloseDuration}
    onChange={handleDurationChange}
    disabled={!autoClose}
  />
</div>
```
