---
lang: en-US
title: "Selecting icons for our toast notifications"
description: "Article(s) > (2/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (2/9) How to create a custom toast component with React"
    - property: og:description
      content: "Selecting icons for our toast notifications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/selecting-icons-for-our-toast-notifications.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#selecting-icons-toast-notifications"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

Before delving into the main part of the code, let’s plan the icons we will use for the toast notifications. We need SVG icons that correspond to the different types of notifications, as well as a close button for each toast notification.

To begin, we’ll create a new folder called `Icons` within the <VPIcon icon="fas fa-folder-open"/>`components` directory. Inside this folder, we’ll create a React component named <VPIcon icon="fa-brands fa-css3-alt"/>`Icons.css`. This file controls the icon sizing and presentation and looks like this:

```css title="components/Icons.css"
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.icon--lg {
  width: 1.5em;
  height: 1.5em;
}
```

The `.icon` class essentially maintains the default size of the SVG icons wrapped inside it at `1em`. Additionally, I’ve included a larger variant of the same class to size the notification icons a bit larger than this default size.

Next, create another file inside the `Icons` directory and name it <VPIcon icon="fa-brands fa-react"/>`Icons.jsx`. Let’s import React and the above-defined CSS into it first:

```jsx title="Icons.jsx"
import React from "react";
import "./Icons.css";
```

Now, let’s select some SVG icons from the [<VPIcon icon="fas fa-font-awesome"/>FontAwesome free icon pack](https://fontawesome.com/search?o=r&m=free) and enclose them within four different components. We will export these components by name.

Feel free to choose the icons you like from your favorite icon sources. Here is an example that demonstrates how the remaining portion of the `Icons.jsx` file will appear:

```jsx title="Icons.jsx"
const CloseIcon = () => (
  <svg>...</svg>
);

const SuccessIcon = () => (
  <svg>...</svg>
);

const FailureIcon = () => (
  <svg>...</svg>
);

const WarningIcon = () => (
  <svg>...</svg>
);

export { CloseIcon, SuccessIcon, FailureIcon, WarningIcon };
```

That’s it for the icons. You may [view the finished `Icons.jsx` file here. (<VPIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast/blob/main/src/components/Icons/Icons.jsx) In the next segment, we will learn how to create our toast component, import our icons into it, and use the `.icon` class and its variant to size them appropriately.
