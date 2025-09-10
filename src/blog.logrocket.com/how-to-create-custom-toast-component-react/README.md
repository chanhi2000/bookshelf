---
lang: en-US
title: "How to create a custom toast component with React"
description: "Article(s) > How to create a custom toast component with React"
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
      content: "Article(s) > How to create a custom toast component with React"
    - property: og:description
      content: "How to create a custom toast component with React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/
prev: /programming/js-react/articles/README.md
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
  name="How to create a custom toast component with React"
  desc="Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them."
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

::: note Editor’s note

This React toast component tutorial was last updated on 21 June 2023 to include a more concise code project that runs faster on less code. For more information, learn about how to [**style your toast messages using React-Toastify**](/blog.logrocket.com/using-react-toastify-style-toast-messages.md).

:::

![How To Create A Custom Toast Component With React](/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png)

Toast notifications are modal-like elements that display information to a user, often in the form of buttons or another call to action. The messages displayed are brief and can be removed via user action or automatic expiration. Most importantly, toast notifications do not interfere with the user’s interaction with your app, whether they are using a desktop or mobile device. Developers commonly use toast notifications to display, among other things:

- A success message upon a successful form submission or API request
- An error message upon a failed API request
- Chat information

In this tutorial, I’ll demonstrate how to create a custom toast component with React. We’ll use React hooks such as `useState` and `useEffect`. After creating the toast component, we’ll add simple buttons to demonstrate the toast on our page. We’ll also demonstrate how to auto-delete toast notifications.

Here’s what the toast notifications will look like after we create and call them:

![Completed Toast Notifications With Buttons And An Auto-Delete Feature](https://blog.logrocket.com/wp-content/uploads/2020/03/completed-toast-notifications-buttons-autodelete.webp)

You can reference the full source code for this tutorial in the [GitHub repo (<VPIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast). Now, let’s dive in and get started!

```component VPCard
{
  "title": "Setting up our React application",
  "desc": "(1/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/setting-up-our-react-application.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Selecting icons for our toast notifications",
  "desc": "(2/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/selecting-icons-for-our-toast-notifications.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Creating a React toast component",
  "desc": "(3/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/creating-a-react-toast-component.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Structuring toast list components",
  "desc": "(4/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/structuring-toast-list-components.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Creating the `ToastList` component in React",
  "desc": "(5/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/creating-the-toastlist-component-react.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Implementing toast and `ToastList` components",
  "desc": "(6/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/implementing-toast-and-toastlist-components.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Displaying toast notifications using the `showToast` method",
  "desc": "(7/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/displaying-toast-notifications-using-the-showtoast-method.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Deleting toast notifications",
  "desc": "(8/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/deleting-toast-notifications.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Positioning toast notifications",
  "desc": "(9/9) How to create a custom toast component with React",
  "link": "/blog.logrocket.com/how-to-create-custom-toast-component-react/positioning-toast-notifications.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

---

## Conclusion

This tutorial should give you a solid understanding of how to create a simple yet intuitive toast component that is capable of displaying multiple notifications. You should now know how to use React and its popular hooks like `useState` and `useEffect` to create, display, and dismiss toast notifications and customize the components as per the requirements of your project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to create a custom toast component with React",
  "desc": "Create a toast component in your React app that is capable of displaying multiple notifications, customizing their position, and deleting them.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
