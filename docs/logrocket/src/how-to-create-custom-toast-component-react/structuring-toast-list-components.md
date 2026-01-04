---
lang: en-US
title: "Structuring toast list components"
description: "Article(s) > (4/9) How to create a custom toast component with React" 
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
      content: "Article(s) > (4/9) How to create a custom toast component with React"
    - property: og:description
      content: "Structuring toast list components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-create-custom-toast-component-react/structuring-toast-list-components.html
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
  url="https://blog.logrocket.com/how-to-create-custom-toast-component-react#structuring-toast-list-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-create-custom-toast-component-react/banner.png"/>

The toast notifications should be flexible enough to be put across all four corners of the viewport. We’ll have four different positions for the toast elements, which will be determined by a container list that will be wrapping up all our toast notifications:

1. Top-right
2. Bottom-right
3. Top-left
4. Bottom-left

The positions will be added dynamically, depending on the position props added to the toast list component that we are going to define in this segment.

The basic structure of our toast list will consist of a wrapper element that acts as a list of toast messages. It would look something like the following:

```jsx
<div class="toast-list toast-list--top-left" aria-live="assertive">
  <div class="toast ...">...</div>
  <div class="toast ...">...</div>
  <div class="toast ...">...</div>
  <div class="toast ...">...</div>
</div>
```

If you notice, we are also using the [<VPIcon icon="fa-brands fa-firefox" />`aria-live` [attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) for our toast list, just to indicate to the screen reader that the list will update with time. Later on, we will use this structure to construct the JSX for the toast list component.

---

## Styling the toast container

Let’s create another folder inside the `components` directory named `ToastList`. Inside it, create a CSS file named <VPIcon icon="fa-brands fa-css3-alt"/>`ToastList.css`, which is responsible for styling, structuring, and positioning our `ToastList` component, as well as adding appropriate animations to the toast notifications.

First, let’s define some CSS custom properties to centralize the configuration and customization of various settings such as sizing, spacing, and more:

```css
:root {
  --toast-speed: 250ms;
  --toast-list-scrollbar-width: 0.35em;
  --toast-list-width: 400px;
  --toast-list-padding: 1em;
}
```

The toast list needs to remain fixed to the viewport, regardless of the scroll position of the document contents. This is essential to ensure a consistent display of toast notifications to the user. The container should have its contents positioned slightly inward from the edges of the viewport, and its width should be limited on larger screens.

To avoid requiring the user to scroll the document to see the notifications, the toast list should be restricted to a maximum height equal to the viewport height. The list can be scrolled vertically to access the notifications as needed. The following CSS setup for the toast list can help us achieve all of that:

```css
.toast-list {
  position: fixed;
  padding: var(--toast-list-padding);
  width: 100%;
  max-width: var(--toast-list-width);
  max-height: 100vh;
  overflow: hidden auto;
}
```

Next, we need to define various positional variations for the toast list. These variations can be dynamically added later, depending on the position prop in the React component to ensure its proper functioning:

```css :collapsed-lines
.toast-list--top-left {
  top: 0;
  left: 0;
}
.toast-list--top-right {
  top: 0;
  right: 0;
}
.toast-list--bottom-left {
  bottom: 0;
  left: 0;
}
.toast-list--bottom-right {
  bottom: 0;
  right: 0;
}
```

The next CSS styles are for animations to slide the toast either left or right of the page based on the list’s position. We are going to use the CSS keyframes rule and the animation and transition properties to add the appropriate slide-in and slide-out animations:

```css :collapsed-lines
@keyframes toast-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes toast-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.toast-list--top-left .toast,
.toast-list--bottom-left .toast {
  animation: toast-in-left var(--toast-speed);
}

.toast-list--top-right .toast,
.toast-list--bottom-right .toast {
  animation: toast-in-right var(--toast-speed);
}

.toast-list .toast {
  transition: transform var(--toast-speed), opacity var(--toast-speed),
    box-shadow var(--toast-speed) ease-in-out;
}
```

For the additional scrollbar decorations, check out [the full <VPIcon icon="fa-brands fa-css3-alt"/>`ToastList.css` file here (<VPIcon icon="iconfont icon-github"/>`c99rahul/react-toast`)](https://github.com/c99rahul/react-toast/blob/main/src/components/ToastList/ToastList.css).
