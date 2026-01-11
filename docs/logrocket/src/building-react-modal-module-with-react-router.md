---
lang: en-US
title: "Building a React modal module with React Router"
description: "Article(s) > Building a React modal module with React Router"
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
      content: "Article(s) > Building a React modal module with React Router"
    - property: og:description
      content: "Building a React modal module with React Router"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-react-modal-module-with-react-router.html
prev: /programming/js-react/articles/README.md
date: 2023-05-03
isOriginal: false
author:
  - name: Doğacan Bilgili
    url : https://blog.logrocket.com/author/dbilgili/
cover: /assets/iamge/blog.logrocket.com/building-react-modal-module-with-react-router/banner.png
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
  name="Building a React modal module with React Router"
  desc="In this article, we’ll explore how to build a modal module for React with React Router and discuss the various aspects of modals."
  url="https://blog.logrocket.com/building-react-modal-module-with-react-router"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/iamge/blog.logrocket.com/building-react-modal-module-with-react-router/banner.png"/>

::: note Editor’s note

This guide to building a modal module for React with React Router was last updated on 2 May 2023 to reflect recent changes to React Router. This update also includes a new section on the pros and cons of React Router. Check out our guide to* [**migrating to React Router v6**](/blog.logrocket.com/migrating-react-router-v6-guide.md) *before getting started.*

:::

![Building a React Modal Module With React Router](/assets/iamge/blog.logrocket.com/building-react-modal-module-with-react-router/banner.png)

Modals are very useful for displaying one view on top of another. However, they are more than an absolutely positioned `<div>` element wrapping everything regarding implementation, especially if you need dynamic URLs, page refreshes, or a simple scrolling interaction on a mobile device.

In this article, we’ll explore how to build a modal module for React with React Router. We will also discuss the various aspects of modals and identify solutions to satisfy the requirements that come with creating dynamic URLs, page refreshes, and other features.

---

## What is React Router?

Before starting to shape the modal component, let’s start with some basics of the React Router package. [**React Router is a popular routing library for React**](/blog.logrocket.com/react-router-v6-guide.md) that allows you to build single-page applications with multiple views or pages, similar to traditional multi-page apps.

It allows you to map different URLs to different components, handle browser history, and create various routing structures. With over [50k stars on GitHub (<VPIcon icon="iconfont icon-github" />`remix-run/react-router`)](https://github.com/remix-run/react-router), React Router has a huge community and is considered the main tool for building complex React apps. We’ll use four components from this package:

- `BrowserRouter`: This component allows you to store your current location in a browser address using URLs and navigate using the browser’s built-in history stack
- `Route`: A component that maps to a specific URL and renders a specific component when matched to that URL
- `Link`: This component allows the user to navigate to another page by clicking it
- `Routes`: Allows you to define the set of child route components

### Pros and cons of React Router

React Router has several advantages and disadvantages. First, React Router accelerates your page-to-page navigation and improves your app’s performance. It also supports various types of routing strategies. Additionally, you can use React Router with various React libraries and frameworks like Redux and Next.js. React Router also allows you to manage the browser’s history stack. And lastly, React Router has a large and active community.

Although React Router has some solid advantages, it still has some disadvantages. For those new to React Router, it can present a steep learning curve, especially with components like `Route`, `Switch`, `Link`, and `BrowserRouter`. React Router also takes time to load all React components in the first mount, and you’ll have unusable data loaded on the first render. Lastly, if your application grows, you will have management, support, and scalability trouble.

---

## Getting started with basic routing

First, go ahead and install `react-router-dom` through npm with the following command:

```sh
npm install react-router-dom --save
```

Then, at the very top level of your application, use the `<BrowserRouter/>` component to wrap your app with the following code:

```jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Inside `<App/>`, you’ll need to specify the routes to render a specific view when one (or none) of them match. Let’s assume we have three different components to render: `<Home/>`, `<About/>`, and `<Contact/>`. We’ll create a navigation menu that will be visible at the very top of the application. This way, we can create a layout for all pages.

The `<Link/>` or `<NavLink/>` components from `react-router-dom` are used for navigation purposes, while `<NavLink/>` has the special feature of being applicable to a specific styling when the current URL matches. However, functionality-wise, you can use either one. Now, I am going to create the basic structure of the navigation menu by creating a component named `Layout.js`:

```jsx
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <div className="menu">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
```

Next, we’ll implement the mechanism that matches the URL and renders a specific component. `<Routes/>` renders the first matching location specified by its `<Route/>` children. When nothing is matched, the last `<Route/>` returns `<NoMatch/>` component, as shown below:

```jsx
return (
  <div className="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </div>
);
```

---

## What are modals?

Modals are windows that appear at the top of the screen. We usually use a modal for important information or to ask for user input. We can also use modals to require an immediate response from the user, notify users of urgent information, and confirm user decisions. To learn more about creating well-made modals, check out our guide to [<VPIcon icon="iconfont icon-logrocket"/>implementing modal windows that don’t hurt UX](https://blog.logrocket.com/ux-design/implementing-modal-windows-that-dont-hurt-ux/).

The modal component has a wrapper element that spans the whole screen — width and height. So, they have visual priority over all other elements. This area also acts as a `clickedOutside` detector. Then, the actual modal element is positioned relative to that wrapper element. Here’s an example of a modal router element:

![React Router Modal Element Example](/assets/iamge/blog.logrocket.com/building-react-modal-module-with-react-router/React-router-modal-element-example.png)

---

## Creating a modal component

So far, we’ve implemented the basic routing structure. Now, we can create a modal component and work on displaying it as an overlay. Although various methods exist for creating modal components, we’ll only cover one.

Below is an example of a `<Modal/>` functional component using the [`useNavigate`](/blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library.md) React Router Hook to access the router history and call the `navigate('/')` method to change the application URL and redirect to the homepage when the modal is closed on click to `.modal-wrapper`.

`onClick={e => e.stopPropagation()}` is used to prevent the propagation of the `click` event and trigger the `onClick` on `.modal-wrapper`, which would close the modal when the actual `.modal` element is activated. Here’s what that looks like:

```jsx
import { useNavigate } from 'react-router-dom';

export function Modal() {
  const navigate = useNavigate();
  return (
    <div
      className="modal-wrapper"
      onClick={() => navigate('/')}
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <p>
          CONTENT
        </p>
      </div>
    </div>
  );
}
```

Styling the `.modal-wrapper` is just as important. Below, you can find the basic styling used to make it span the whole screen and appear above the content. Using `-webkit-overflow-scrolling: touch` enables elastic scroll on iOS devices, as shown below:

```css
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
```

### Opening the modal view

The modal component we created should render on top of the existing view when a specific URL is matched, meaning that somehow we have to change the URL so the routing mechanism can decide what to render. We know that `<Routes/>` renders the first matching location, but a modal overlay needs two `<Route/>` components rendering at the same time.

This can be achieved by putting the modal `<Route/>` out of `<Routes/>` and rendering it conditionally. In this case, we should be able to detect if a modal is active or not. The easiest way to do this is by passing a `state` variable along with a `<Link/>` component.

Like how we used the `<Link/>` component to create the navigation menu, we’ll use it to trigger a modal view. The usage shown below lets us define a `state` variable, which is then made available in the `location` prop that we can access within any component using [`useLocation`](/blog.logrocket.com/using-hooks-react-router.md#use-location) Hook. Here’s what that looks like:

```jsx
<Link
  className="frontpage-job"
  to="/modal/1"
  state={{ previousLocation: location }}
>
  Open Modal
</Link>
```

Now, you can put this anywhere you want. Clicking the **link** will change the URL to `/modal/1`. I will store the `location` data as a `previousLocation` in the state along with the `<Link/>`. Then, we will use it to set up routing with a modal.

### Matching the modal location

This section is particularly important because it identifies the mechanism for displaying a modal on top of an existing view, even though the location parameter changes when a modal is opened. When we click the **`Open Modal` link** defined in the previous section, it will change the location path to `/modal/1`, which matches nothing in `<Routes/>`. So, we have to define the following `<Route/>` somewhere, like this:

```jsx
<Routes>
  <Route path="/modal/:id" element={<Modal />} />
</Routes>
```

We want to display the `<Modal/>` component as an overlay. However, putting it inside `<Routes/>` would match it and only render the `<Modal/>` component. As a result, there would be no overlay. To resolve this problem, we need to define it both inside and outside of `<Routes/>` with extra conditions.

Below, you’ll see the modified version of the same snippet. There are several changes. Let’s list them quickly:

- There is a previous location as `previousLocation` variable stored in the location state
- `<Routes/>` is using a `location` prop
- There is `<Route path="/modal/:id" element={<Modal />} />` used outside of the main `<Routes/>`, and [**conditionally rendered**](/blog.logrocket.com/react-conditional-rendering-9-methods.md)

When a modal is opened, we need to store the previous location object and pass this to `<Routes/>` instead of letting it use the current location object by default. This tricks `<Routes/>` into thinking it’s still on the previous location — for example, `/` — even though the location changes to `/modal/1` after the modal is opened.

---

This can be achieved by setting the `location` prop on `<Routes/>`. The following snippet replaces the `previousLocation` with the current location object when there is no open modal. When you open a modal, it doesn’t modify the `previousLocation`.

As a result, we can pass it to `<Routes/>` to make it think we’re still on the same location, even though we changed the location by opening a modal. Given that `<Modal/>` component has the necessary stylings, this results in two different views rendering on top of each other:

```jsx
export default function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div className="app">
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/modal/:id" element={<Modal />} />
        </Routes>
      )}
    </div>
  );
}
```

### Preventing the scroll underneath the modal

When you open the modal on some browsers, it may have the content below scrolling underneath the modal, which is not a desirable interaction. Using `overflow: hidden` on `body` is the first attempt to block scrolling on the entire page. However, although this method works fine on desktop, it fails on mobile Safari since it basically ignores `overflow: hidden` on `body`.

There are several different npm packages attempting to remedy this scroll-locking issue virtually across all platforms. I found the [<VPIcon icon="fa-brands fa-npm"/>`body-scroll-lock`](https://npmjs.com/package/body-scroll-lock) package quite useful. From this package, you can import `disableBodyScroll` and `enableBodyScroll` functions. These functions accept a reference to the element for which you want scrolling to persist as an input. When the modal is open, we want to disable scrolling for the entire page, except for the modal itself.

Therefore, we need to call `disableBodyScroll` and `enableBodyScroll` functions when the `modal` component is mounted and unmounted, respectively. To get a reference to the parent `<div>` of the modal component, we can use the [`useRef`](/blog.logrocket.com/usestate-vs-useref.md) Hook from React and pass it as a ref to the parent `<div>`.

The code snippet below disables scrolling when the modal is open and enables it again when the `modal` component is about to be unmounted. Using `modalRef` as the input for these imported functions prevents the content of the `modal` component from being scroll-locked. Below is the modified version of the `modal` component:

```jsx :collapsed-lines
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function Modal() {
  const modalRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);
    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="modal-wrapper"
      onClick={() => navigate('/')}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        CONTENT
      </div>
    </div>
  )
}
```

---

## Conclusion

You now have an understanding of how a modal view works, as well as a sense of some of the problems you may encounter while implementing your own integration. For a fully functional example, visit [<VPIcon icon="iconfont icon-codesandbox"/>this CodeSandbox project](https://codesandbox.io/s/fast-water-07et6d).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a React modal module with React Router",
  "desc": "In this article, we’ll explore how to build a modal module for React with React Router and discuss the various aspects of modals.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-react-modal-module-with-react-router.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
