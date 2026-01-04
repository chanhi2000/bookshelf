---
lang: en-US
title: "How to Fix Memory Leaks in React Applications"
description: "Article(s) > How to Fix Memory Leaks in React Applications"
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
      content: "Article(s) > How to Fix Memory Leaks in React Applications"
    - property: og:description
      content: "How to Fix Memory Leaks in React Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/fix-memory-leaks-in-react-apps.html
prev: /programming/js-react/articles/README.md
date: 2025-09-25
isOriginal: false
author:
  - name: Olaleye Blessing
    url : https://freecodecamp.org/news/author/Jongbo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758741256644/817dba0f-bf49-424c-9b13-86bf81dc327f.png
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
  name="How to Fix Memory Leaks in React Applications"
  desc="Have you ever noticed your React application getting slower the longer you use it? This could be a result of memory leaks. Memory leaks are a common performance issue in React applications. They can slow down your application, crash your browser, and..."
  url="https://freecodecamp.org/news/fix-memory-leaks-in-react-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758741256644/817dba0f-bf49-424c-9b13-86bf81dc327f.png"/>

Have you ever noticed your React application getting slower the longer you use it? This could be a result of memory leaks. Memory leaks are a common performance issue in React applications. They can slow down your application, crash your browser, and frustrate users.

In this tutorial, you’ll learn what causes memory leaks and how to fix them.

::: note Prerequisites

Before you move on, make sure you have:

- Basic knowledge of JavaScript, React, and React hooks
- Understanding of event handling, timers, and asynchronous calls
- A React development setup.

:::

If you don’t have a React development setup, you can head over to the [memory-leak repo (<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-fix-memory-leak`)](https://github.com/Olaleye-Blessing/freecodecamp-fix-memory-leak). Run the commands below to set it up:

```sh
# clone the repo
git clone <https://github.com/Olaleye-Blessing/freecodecamp-fix-memory-leak.git>
cd freecodecamp-fix-memory-leak.git     # navigate to the folder
pnpm install                            # install the packages
pnpm dev                                # start development
```

---

## What Are Memory Leaks in React?

In JavaScript, memory leaks happen when an application allocates memory but fails to release it. This occurs even after the memory is no longer needed.

In React, memory leaks happen when a component creates resources but does not remove them when it unmounts. These resources can be event listeners, timers, or subscriptions.

As a user stays longer in the application, these unreleased resources accumulate. This accumulation causes the application to consume more RAM. This will eventually lead to several problems:

- A slow application
- The browser crashing
- A poor user experience

For example, a component might create a “resize” event listener when it mounts, but forgets to remove it when it unmounts. This builds up memory as the user stays longer in the application and resizes the screen.

---

## When Does A Component Unmount?

A component unmounts when it no longer exists in the DOM. This can happen if:

### 1. A user navigates away from the page

```tsx
<Routes>
  <Route path="/posts" element={<Posts />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

The dashboard component will unmount immediately when a user navigates from `/dashboard` to any other route in the application.

### 2. A component is conditionally rendered

```tsx
function App() {
  const [show, setShow] = useState(true);

  return <div>{show && <Component />}</div>;
}
```

`<Component />` will unmount when `show` becomes false.

### 3. A component key changes

```tsx
function App() {
  const [key, setKey] = useState(Date.now());
    
  return (
    <>
      <button onClick={() => setKey(Date.now())}>Change Key</button>
      <Form key={key} />
    </>
  );
}
```

The `<Form />` component will unmount every time the key changes. Also note that a new `<Form />` component will mount each time the key changes.

---

## Common Causes Of Memory Leaks And How To Fix Them

As said earlier, there will be a memory leak when resources are not removed after a component unmounts. React `useEffect` allows you to return a function that will be called when a component unmounts.

```tsx
useEffect(() => {
  return () => {
    // code to remove resources
  };
}, []);
```

You can clean any created resources in this returned function. We will go through how to clean up some of these resources.

### Event Listeners

Event listeners persist if they are not removed after a component unmounts. Look at the code below:

```tsx
import { useEffect, useState } from "react";

const EventListener = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      console.log("__ Resizing Event Listerner __", width);
      setWindowWidth(width);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return <div>Width is: {windowWidth}</div>;
};

export default EventListener;
```

We do not remove the resize event listener on unmount, so every mount adds a new listener. This failure to clean up leads to a memory leak.

![GIF shows multiple 'resize' event listeners being created each time a component mounts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149182882/58ddc026-d6b8-4120-9144-53b6d87fb63e.gif)

As shown in the GIF above, we log the width in the console every time we resize the window’s width. We still log the same information after component unmounts. Also, when we check the “Event Listeners” tab, the number of listeners keeps increasing by 2 instead of being just 1 each time we remount the component.

We see two listeners when the component mounts because React uses StrictMode in development. This helps to see side effects in the development mode. The same reason the listeners increase by 2 any time we mount the component.

To fix this memory leak, we need to remove the event listener in our cleanup function.

```tsx
useEffect(() => {
  // previous code

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

The cleanup function runs when the component unmounts. This, in turn, removes our event listener and prevents a memory leak.

![GIF shows a 'resize' event listener that is removed when the component unmounts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149497654/f95d75b4-f41f-4bb0-806b-546555be813a.gif)

Notice this time, nothing is shown in the console when we hide the component. Also, the resize event listener was reduced to 0 when we hid (unmounted) the component, and increased to 1 when we showed (mounted) it.

### Timers

Timers like `setInterval` and `setTimeout` can also cause memory leaks if they are not cleared after the component unmounts. Look at this:

```tsx
const Timers = () => {
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log("__ Set Interval __");
      setCountDown((prev) => prev + 1);
    }, 1000);
  }, []);

  console.log({ countDown });

  return <div>Countdown: {countDown}</div>;
};
```

The interval will continue to run even after React hides or unmounts the component.

Note that, in React 18+, React ignores a state update when a component already unmounts.

![GIF shows a countdown timer component that continues to run and update state after it has been unmounted from the DOM.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149517577/34868e3e-e8f6-495a-a2f8-ef0e1e745051.gif)

In the GIF, we notice that the console stops showing "__ Outside effect ” anytime we hide/unmount the component. But the string, " Interval __”, shows every time.

We can fix this by using the cleanup function. All timers (`setInterval`, `setTimeout`) return a unique timer ID that we can use to clear the timer after the component unmounts.

```tsx
const [countDown, setCountDown] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
    console.count("__ Interval __");
    setCountDown((prev) => prev + 1);
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

We now save the ID of the timer and use this ID to clear the interval when the component unmounts. The same method applies to `setTimeout`; save the ID and clear it with `clearTimeout`.

![GIF shows a countdown timer component that stops running and updating state after it unmounts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149580900/7c37c824-93db-4b73-8ff4-c45c6404bb65.gif)

### Subscriptions

When a component subscribes to external data, it’s always appropriate to unsubscribe after the component unmounts. Most data source returns a callback function to unsubscribe from such data. Take Firebase for an example:

```tsx
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const Subscriptions = () => {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cities"), () => {
        // Respond to data
        // ...
    });
  }, [])

    return <div>Subscriptions</div>;
};

export default Subscriptions;
```

The `onSnapshot` function from `firebase/firestore` gets real-time updates from our database. It returns a callback function that stops listening to the DB updates. If you fail to call this function, our app continues to listen to these updates even when it no longer needs them.

```tsx
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "cities"), () => {
    // Respond to data
    // ...
  });

  return () => {
    unsubscribe();
  };
}, []);
```

Calling `unsubscribe()` in the returned function means we are no longer interested in listening to the data updates.

### Async Operations

One common mistake is not cancelling an API call when it’s no longer needed. It's a waste of resources to allow an API call to keep running when the component unmounts. This is because the browser continues to hold references in memory until the promise resolves. Look at this example:

```tsx :collapsed-lines
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  views: number;
}

const ApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Post[] | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);

        console.time("POSTS");
        const req = await fetch("<http://localhost:3001/posts>");
        const res = await req.json();
        console.timeLog("POSTS");
        setData(res.posts);
      } catch (error) {
        setError("Try again");
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <p>ApiCall Component</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data ? (
        <p>Views: {data[0].views}</p>
      ) : null}
    </div>
  );
};

export default ApiCall;
```

This component fetches a list of posts from our server immediately it mounts. It changes the UI based on the state of the API call:

- It displays a loading text when you click the button.
- It shows an error if the API fails.
- It shows the data if the API succeeds.

We have a simple server that returns the list of posts. The problem with the server is that it takes three seconds for it to return the list of posts.

What happens when a user comes to this page but decides to leave before three seconds? (We simulate leaving the page by clicking the Hide Component button.)

![GIF shows a component that continues with an API call after it unmounts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149803784/bf5cf55f-75fe-472f-9a08-653c53bdafaa.gif)

As you can see, the browser still holds a reference to the request even though it’s no longer needed.

A proper way to fix this is to cancel the request when the component unmounts. We can do this by using the [<VPIcon icon="fa-brands fa-firefox" />AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). We can use the `abort` method to cancel the request before it gets completed, thereby releasing memory.

```tsx :collapsed-lines
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  views: number;
}

const ApiCall = () => {
  // previous code

  useEffect(() => {
    const controller = new AbortController();

    const getTodos = async () => {
      try {
        // previous code

        const req = await fetch("<http://localhost:3001/posts>", {
          signal: controller.signal,
        });

        // previous code
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was cancelled");
          return;
        }

        setError("Try again");
      } finally {
        setLoading(false);
      }
    };

    getTodos();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <p>ApiCall Component</p>
      {/* previous code */}
    </div>
  );
};

export default ApiCall;
```

We created a controller to track our API request when the component mounts. We then attach the controller to our API request. Our cleanup function cancels the request if the users leave the page within three seconds.

We can see the result of this in the GIF below:

![GIF shows an API call being cancelled after its component unmounts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758149811531/5497edbd-050c-4059-b088-239e8c5b65ef.gif)

Most production React applications use external libraries to fetch APIs. For example, [<VPIcon icon="fas fa-globe"/>react query](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation#using-fetch) allows us to cancel a processing promise:

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch("/todos", { signal });
    const todos = await todosResponse.json();

    return todos;
  },
});
```

---

## Conclusion

Memory leaks can significantly impact your React application's performance and user experience. You can prevent these issues by properly cleaning up resources when a component unmounts. In summary, always remember to:

- Remove event listeners with `removeEventListener`.
- Clear timers with `clearInterval` and `clearTimeout`.
- Unsubscribe from external data sources.
- Cancel API requests using `AbortController`.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fix Memory Leaks in React Applications",
  "desc": "Have you ever noticed your React application getting slower the longer you use it? This could be a result of memory leaks. Memory leaks are a common performance issue in React applications. They can slow down your application, crash your browser, and...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/fix-memory-leaks-in-react-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
