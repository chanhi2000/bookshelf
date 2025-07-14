---
lang: en-US
title: "Positioning toast notifications"
description: "Article(s) > (9/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (9/9) How to create a custom toast component with React"
    - property: og:description
      content: "Positioning toast notifications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/positioning-toast-notifications.html
next: /blog.logrocket.com/how-to-create-custom-toast-component-react/README.md#conclusion
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#positioning-toast-notifications"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

Once again, we can retrieve the position inputs from a select combo box (which we will define shortly) by utilizing the `target` event property. Setting the current position requires just a single line of code:

```jsx
const handlePositionChange = (event) => {
  setPosition(event.target.value);
};
```

---

## Adding the position input

We can define an object to iterate over and populate our select combo box, which is responsible for showing different positions for `ToastList`:

```jsx
const positions = {
  "top-right": "Top-right",
  "top-left": "Top-left",
  "bottom-right": "Bottom-right",
  "bottom-left": "Bottom-left",
};
```

![Positioning Toast Notifications](https://blog.logrocket.com/wp-content/uploads/2020/03/positioning-toast-notifications.webp)

Adding options to the select box is now easy by looping over the positions using the `Object.keys` and providing the value as well as the label, as shown below:

```jsx
<div className="app-row">
  <label htmlFor="position">Position</label>
  <select
    id="position"
    value={position}
    onChange={handlePositionChange}
  >
    {Object.keys(positions).map((position) => (
      <option key={position} value={position}>
        {positions[position]}
      </option>
    ))}
  </select>
</div>
```

The state of the position combo box is handled by the `position` state variable, while the change of this input is managed by the `handlePositionChange` function, which we discussed in the last few steps.

---

## Adding the `ToastList`component

Finally, we conclude our app component file by adding `ToastList` at the end. We’ll use the toast and position state variables that we declared in the app component above. Additionally, we’ll pass the `removeToast` function as the `removeToast` prop of `ToastList` before exporting it as a default module:

```jsx title="App.jsx"
const App = () => {
  ...
  return (
    <div className="app">
      <h1 className="app-title">React Toast Component</h1>
      ...

      <ToastList data={toasts} position={position} removeToast={removeToast} />
    </div>
  );
};

export default App;
```

Below is a live working demonstration of our final output. You can view it in a different tab using [<FontIcon icon="iconfont icon-stackblitz"/>this link](https://stackblitz.com/edit/vitejs-vite-qhqmg5?file=src%2FApp.jsx). Alternatively, you can also [find all of the code on GitHub (<FontIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast):

<!-- TODO: stackblitz or sandplayground -->
<!-- > #### [vitejs-vite-qhqmg5 – StackBlitz](https://stackblitz.com/edit/vitejs-vite-qhqmg5?embed=1&file=src%2FApp.jsx) -->

