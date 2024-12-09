---
lang: en-US
title: "How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time"
description: "Article(s) > How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time"
icon: fa-brands fa-react
category: 
  - Node.js
  - React.js
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time"
    - property: og:description
      content: "How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/boost-web-performance-with-prefetching.html
prev: /programming/js-react/articles/README.md
date: 2024-09-24
isOriginal: false
author: Keyur Paralkar
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/-Vqn2WrfxTQ/upload/0657c02758973f4ea5701f2bd98469a7.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

---

<SiteInfo
  name="How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time"
  desc="We've all encountered the frustration of waiting through long loading screens, only to find ourselves stuck with unresponsive pages. You see loading spinners everywhere, but nothing seems to move forward. Let me paint a clearer picture for you: This..."
  url="https://freecodecamp.org/news/boost-web-performance-with-prefetching"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/-Vqn2WrfxTQ/upload/0657c02758973f4ea5701f2bd98469a7.jpeg"/>

We've all encountered the frustration of waiting through long loading screens, only to find ourselves stuck with unresponsive pages. You see loading spinners everywhere, but nothing seems to move forward. Let me paint a clearer picture for you:

[![Multiple skeleton loader on a dashboard page](https://cdn.hashnode.com/res/hashnode/image/upload/v1726397417280/bc56c517-c63f-433e-93c6-939c3b82c556.gif)](https://dribbble.com/shots/3358709-Skeleton-Loader#)

This typically happens because the website is trying to fetch all the necessary data as soon as you land on the page. It could be that a API request is being processed, or multiple APIs are fetching data sequentially, causing delays in loading the page.

The result? A poor user experience. You might think, "How can such a large company not prioritize user experience? This is disappointing." Consequently, users often leave the site, affecting key metrics and potentially impacting revenue.

But what if you could fetch the data for these heavy pages ahead of time, so that by the time a user lands on the page, they can interact with it instantly?

This is where the concept of prefetching comes in, and that's exactly what we'll be diving into in this blog post. So without further ado, let's get started!

---

## Prefetching as a Solution

Here’s the revised version with just the grammar and spelling corrected:

For the problem above, what we want is to fetch the data for a given page before it's loaded onto the website so that the user doesn’t need to fetch the data on page load. This is called prefetching. From a technical perspective, its definition is as follows:

> It is a way to fetch the required data beforehand so that the main component doesn’t need to wait for the data, thus enhancing the experience.

This can improve the user experience, boosting the customer’s confidence in your website.

Prefetching is a simple yet elegant solution that is more user-centric than a standard process. To implement prefetching, we need to understand the user’s behavior on the website. That is, the most visited pages, or which components fetch data on small interactions (such as hover).

After analyzing such scenarios, it makes sense to apply prefetching to them. However, as developers, we should be mindful of using this concept. Too much prefetching can also slow down your website since you're trying to fetch a lot of data for future scenarios, which might block the fetching of data for the main page.

---

## How Prefetching Improves User Experience

Let us look at couple of scenarios where prefetching is beneficial:

1. Loading data/page earlier for the most visited link from your landing page. For example, consider that you have a “contact us” link. Let’s assume that this is the link that users mostly check and it contains a lot of data when it loads. Rather than loading the data when the contact us page loads, you can simply fetch the data on the homepage so that you don’t have to wait at the Contact Us page for the data. You can read more about prefetching pages [<FontIcon icon="fas fa-globe"/>here](https://web.dev/articles/link-prefetch).
2. Prefetching table data for later pages.
3. Fetching data from a parent component and loading it in the child component.
4. Prefetching data that needs to be displayed in a popover.

These are some of the ways to achieve prefetching in your application and how it helps improve the user experience.

In this blog post we will be discussing about the last scenario: *“*prefetching data that needs to be displayed in the popover”. This is a classic example where prefetching can be beneficial and provides a smoother experience to the user.

---

## Understanding The Problem

Let me define the problem here. Imagine the following scenario:

1. You have a component that displays specific information.
2. There is an element inside this component that shows another popover/tooltip when you hover on it.
3. The popover fetches data when it loads.

Now imagine that the user hovers on the element and needs to wait for the data to be fetched and displayed in the popover. During this wait, they see the skeleton loader.

The scenario will look like this:

![Example of fetching data when the popover component mounts](https://cdn.hashnode.com/res/hashnode/image/upload/v1726395720567/6ec88fab-ffe2-4f20-b934-94342f9cf3c0.gif)

It’s just frustrating how long the user has to wait whenever they hover on the image:

![User hovering images to load popover component that fetches data](https://cdn.hashnode.com/res/hashnode/image/upload/v1726395733461/3598da70-e8af-4a1a-b3cf-5c3ed62fe9cc.gif)

To solve this problem, there are two solutions that can help you get started and optimize the solution according to your needs.

---

## Solution #1: Prefetching Data in the Parent Component

This solution is inspired from [<FontIcon icon="fas fa-globe"/>Martin Fowler’s blogpost](https://martinfowler.com/articles/data-fetch-spa.html). It allows you to fetch the data before the popup appears, instead of fetching on component load.

The popup appears when you hover on it. We can fetch the data when the mouse enters the parent component. Before the actual component—the image—is hovered on, we’ll have the data for the popover and will pass it to the popover component.

This solution doesn’t remove the loading state all together but it helps to significantly lower the chances of seeing the loading state.

![Improving the UX by fetching the data from the parent component](https://cdn.hashnode.com/res/hashnode/image/upload/v1726395771616/69b6c536-8b62-4124-837a-f26746f6f305.gif)

---

## Solution #2: Prefetch Data on Page load

This solution is inspired by [<FontIcon icon="fa-brands fa-x-twitter"/>x.com](http://x.com) where, for the popover component, they fetch the data partially on the main page load and fetch the rest of the data when the component mounts.

![Twitter advertisement by XDevelopers. Text reads: "Calling all #developers! Innovate with our real-time and historical data on the X API. Get started with Pro👇". Image shows a person in a white shirt with text "Build what's next with our API @XDevelopers" and "Subscribe now!" Used by permission. From twitter.com.](https://cdn.hashnode.com/res/hashnode/image/upload/v1726395833198/c7f1fa64-986d-4bfc-83cb-f052cd560f3a.gif)

As you can see from the above video, the user’s profile details are viewed in the popover. If you look closely, the details related to followers are fetched later.

This technique is highly efficient when you have a lot of data to be displayed in the popover but fetching them can be costly on popover mount or on the main page load.

A better solution would be to partially load the required data on the main page and load the rest of the data when the component mounts.

In our example, we fetched the data for the popover when the cursor entered the image’s parent element. Now imagine that you need to fetch additional details once the popover data is loaded. So based on the above x.com’s method, we can fetch additional data on popover load. Here is the outcome of it:

![GIF explaining how we prefetch data from parent and load additional data on component mount for popover](https://cdn.hashnode.com/res/hashnode/image/upload/v1726395913909/b5f6f231-5a1e-4c44-a4eb-bd5ed863ce3b.gif)

Here, we do the following things:

- We fetch the main data which is just necessary to render the popover when mouse enters the parent component of the image.
- This gives us enough time to fetch the main data.
- On popover load, we fetch another data, which is the album count. While the user reads data like name and email, we’ll have the next data ready to be seen.

This way, we can make small and smart tweaks to minimize the blank staring of loaders on the screen 😊.

---

## How to Implement Prefetching with React

In this section we’ll briefly go through the how to implement the above prefetching example app.

### Project Setup

To get started with creating the prefetching app, follow the process below:

You can use [vitejs](https://vitejs.dev/) (this is what I used) or [<FontIcon icon="fa-brands fa-react"/>create-react-app](https://create-react-app.dev/) to create your app. Paste the command below in your terminal:

```sh
yarn create vite prefetch-example --template react-ts
```

Once the app has been created, you should have the following folder structure when you open the <FontIcon icon="fas fa-folder-open"/>`prefetch-example` folder with VS Code.

![Image of the folder structure once the vitejs app is created](https://cdn.hashnode.com/res/hashnode/image/upload/v1726764168271/2dc9bfa1-07d9-491e-96fd-e780c3623eeb.png)

Now let us dive into the components that we are going to be building for this app.

### Components

In this example we are going to be using 3 components:

- `PopoverExample`
- `UserProfile`
- `UserProfileWithFetching`

### `PopoverExample` Component

Let us start with the first component which is the `PopoverExample`. This component displays an image avatar and some text to the right side of it. It should look like this:

![Image of the PopoverExample component that contains image to the left and lorem ipsum text to the right](https://cdn.hashnode.com/res/hashnode/image/upload/v1727002319443/bcc28972-fce0-42ba-899c-274513c4a7c6.png)

The purpose of this component is to serve as an example similar to the real life scenarios. The image in this component loads a popover component when it is hovered on.

![Image of popover element that contains user information when the image is hovered](https://cdn.hashnode.com/res/hashnode/image/upload/v1727002429245/9af8f26e-f149-41f7-b124-3ec2a0f5c80a.png)

Here’s the code for the component:

```tsx
import { useState } from "react";
import { useFloating, useHover, useInteractions } from "@floating-ui/react";
import ContentLoader from "react-content-loader";
import UserProfile from "./UserProfile";
import UserProfileWithFetching from "./UserProfileWithFetching";

export const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={340}
    height={84}
    viewBox="0 0 340 84"
    backgroundColor="#d1d1d1"
    foregroundColor="#fafafa"
  >
    <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
    <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
    <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
    <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
    <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
    <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
    <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
    <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
  </ContentLoader>
);
export default function PopoverExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const handleMouseEnter = () => {
    if (Object.keys(data).length === 0) {
      setIsLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        });
    }
  };

  return (
    <div
      id="hover-example"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "left",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <span
        style={{
          padding: "1rem",
        }}
      >
        <img
          ref={refs.setReference}
          {...getReferenceProps()}
          style={{
            borderRadius: "50%",
          }}
          src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
        />
      </span>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      {isOpen && (
        <div
          className="floating"
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            backgroundColor: "white",
            color: "black",
            padding: "1rem",
            fontSize: "1rem",
          }}
          {...getFloatingProps()}
        >
          {isLoading ? (
            <MyLoader />
          ) : (
            <UserProfile hasAdditionalDetails {...data} />
          )}
          {/* <UserProfileWithFetching /> */}
        </div>
      )}
    </div>
  );
}
```

There are couple of things happening here, let me explain them step-by-step:

- We have a parent `div` named `hover-example` that contains an image and some text.
- Next, we conditionally rendered a `div` with class name of `floating`. This is the actual popover component that opens when you hover on the image.
  - We made use of the [<FontIcon icon="fas fa-globe"/>`floating-ui` library](https://floating-ui.com/) and its [<FontIcon icon="fas fa-globe"/>basic hover example](https://floating-ui.com/docs/useHover) to achieve the hover effect for the popover.
- Inside the popover we conditionally loaded the `UserProfile` and the skeleton loader. This loader appears when we are fetching the data for the user’s profile. More on this later.
- We made use of the [<FontIcon icon="iconfont icon-github"/>`danilowoz/react-content-loader`](https://github.com/danilowoz/react-content-loader) library in the `MyLoader` component. This library also has a website that helps you to create loaders, you can check it out [<FontIcon icon="fas fa-globe"/>here](https://skeletonreact.com/).

### `UserProfile` Component

Now that we have defined our `Popover` example, it is time for us to get into the details of the `UserProfile` component.

This component appears inside the popover component. The purpose of this component is to load the `name` `email` `phone` `website` details which are fetched from [<FontIcon icon="fas fa-globe"/>JSON placeholder API](https://jsonplaceholder.typicode.com/users/1).

To demonstrate the prefetching example, we have to make sure that the `UserProfile` component only acts as a presentational component; that is, no explicit fetching logic is present inside of it.

The key thing to note about this component is that fetching the data happens from the parent component which is the `PopoverExample` component. In this component, we start fetching the data when the mouse enters this component (the `mouseenter` event). This is the solution #1 we discussed previously.

This gives you enough time for fetching the data until the user hovers on the image. Here’s the code:

```tsx
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 476 124"
    backgroundColor="#d1d1d1"
    foregroundColor="#fafafa"
  >
    <rect x="4" y="43" rx="0" ry="0" width="98" height="30" />
  </ContentLoader>
);

export default function UserProfile(props: Record<string, string | boolean>) {
  const { name, email, phone, website, hasAdditionalDetails } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [additionalData, setAdditionalData] = useState(0);

  useEffect(() => {
    if (hasAdditionalDetails) {
      setIsLoading(true);
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then((resp) => resp.json())
        .then((data: Array<unknown>) => {
          const albumCount = data.reduce((acc, curr) => {
            if (curr.userId === 1) acc += 1;

            return acc;
          }, 0);
          setAdditionalData(albumCount);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [hasAdditionalDetails]);

  return (
    <div id="user-profile">
      <div id="user-name">name: {name}</div>
      <div id="user-email">email: {email}</div>
      <div id="user-phone">phone: {phone}</div>
      <div id="user-website">website: {website}</div>
      {hasAdditionalDetails && (
        <>
          {isLoading ? (
            <MyLoader />
          ) : (
            <div id="user-albums">Album Count: {additionalData}</div>
          )}
        </>
      )}
    </div>
  );
}
```

This component makes use of the `hasAdditionalDetails` prop. The purpose of this `prop` is to load additional data when the component mounts. It illustrates the solution #2 mentioned above.

### `UserProfileWithFetching` Component

This component is pretty similar to that of the `UserProfile` component. It just contains the logic for fetching data when the component loads. The purpose of this component is to show what the general solution without the prefetching technique would look like.

So this component will always load the data when the component mounts, which displays the skeleton loader.

Here is the code:

```tsx
import { useEffect, useState } from "react";
import { MyLoader } from "./PopoverExample";

export default function UserProfileWithFetching() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <MyLoader />;

  return (
    <div id="user-profile">
      <div id="user-name">name: {data.name}</div>
      <div id="user-email">email: {data.email}</div>
      <div id="user-phone">phone: {data.phone}</div>
      <div id="user-website">website: {data.website}</div>
    </div>
  );
}
```

The entire code for this app can be found [here (<FontIcon icon="iconfont icon-github"/>`keyurparalkar/prefetch-examples`)](https://github.com/keyurparalkar/prefetch-examples).

---

## Too much prefetching can also cause slowness

A word of advice, too much prefetching is not good because:

- It might slow your app down.
- It can degrade user experience if prefetching is not applied strategically.

Prefetching needs to be applied when you know the behavior of the user. That is, you are able to predict the user movement by metrics and be able to tell if they visit a page often. In that case, prefetching is a good idea.

So remember to always apply prefetching strategically.

---

## Summary

That’s all folks! Hope you like my blog post. In this blogpost, you learned that implementing prefetching can significantly enhance your web application’s speed and responsiveness, improving user satisfaction.

For further reading, please refer to the below articles:

- [Prefetching pages](https://patterns.dev/vanilla/prefetch/)
- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
- [What not to prefetch](https://addyosmani.com/blog/what-not-to-prefetch-prerender/)

For more content, you can follow me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`keurplkar`)](https://x.com/keurplkar), [GitHub (<FontIcon icon="iconfont icon-github"/>`keyurparalkar`)](http://github.com/keyurparalkar), and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`keyur-paralkar-494415107`)](https://linkedin.com/in/keyur-paralkar-494415107/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Boost Web Performance with Prefetching – Improve User Experience by Reducing Load Time",
  "desc": "We've all encountered the frustration of waiting through long loading screens, only to find ourselves stuck with unresponsive pages. You see loading spinners everywhere, but nothing seems to move forward. Let me paint a clearer picture for you: This...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/boost-web-performance-with-prefetching.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
