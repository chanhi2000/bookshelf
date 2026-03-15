---
lang: en-US
title: "The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained"
description: "Article(s) > The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained"
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
      content: "Article(s) > The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained"
    - property: og:description
      content: "The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-modern-react-data-fetching-handbook-suspense-use-and-errorboundary-explained.html
prev: /programming/js-react/articles/README.md
date: 2026-02-13
isOriginal: false
author:
  - name: Tapas Adhikary
    url: https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770847474747/df826db8-4d18-45f5-a4aa-bfafa9c3aa80.png
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
  name="The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained"
  desc="Most React developers don’t break the data fetching process all at once. It usually degrades gradually, slowly. Traditionally, you may have used a useEffect here, a loading flag there, and an error state along with it to tackle data fetching. Moving ..."
  url="https://freecodecamp.org/news/the-modern-react-data-fetching-handbook-suspense-use-and-errorboundary-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770847474747/df826db8-4d18-45f5-a4aa-bfafa9c3aa80.png"/>

Most React developers don’t break the data fetching process all at once. It usually degrades gradually, slowly.

Traditionally, you may have used a `useEffect` here, a loading flag there, and an error state along with it to tackle data fetching. Moving forward, another fetch depended on the first one, then a second useEffect, and another loading and error state.

This likely continued until you started feeling like you were writing code that you yourself could’t even maintain in the future.

Requests that should run in parallel started running sequentially. Components re-rendered unnecessarily just to satisfy another data fetch request-response. Loading spinners appeared when nothing meaningfully changed. Error states got scattered inside the component.

Well, none of these things are React’s problem. These are core design problems you should be aware of while coding your React Apps.

In this handbook, we’ll walk through one React Pattern that fixes data fetching at the architecture level without ignoring real data dependencies, and without introducing any new magic. If data fetching in React has ever felt harder than it should be, this pattern will make even more sense to you.

You’ll learn how to use React’s `Suspense` with the recently introduced `use()` API to handle data fetching smoothly. In case of errors, you’ll learn how an `Error Boundary` can help handle them gracefully.

Give this one a read, and code along to get a better grip on this pattern’s mental model.

This handbook is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns initiative](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC). You can check it out if you’d like:

<VidStack src="youtube/tY8rhkLdr2A" />

We’ll use a lot of source code to demonstrate the problems with the traditional data-fetching approach and how the Suspense Pattern can improve things. I would suggest that you try the code as you read. But if you want to take a look at the source code ahead of time, you can find it on the [tapaScript GitHub (<VPIcon icon="iconfont icon-github"/>`tapascript/15-days-of-react-design-patterns`)](https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-16).

---

## The Traditional Way of Data Fetching in React

To understand why data fetching can become painful in React, we first need to understand how React works under the hood.

React works in phases. It doesn’t do everything at once. At a high level, every update in React goes through three distinct phases:

- **Render phase** – React figures out *what* the UI should look like
- **Commit phase** – React applies those changes to the DOM
- **Effect phase** – React synchronises with the outside world

This separation is intentional. It’s what allows React to be predictable, interruptible, and efficient.

Now, let’s see where data fetching with `useEffect` fits into this picture:

![The `useEffect` Phases](https://cdn.hashnode.com/res/hashnode/image/upload/v1770089281941/9a0dbc5d-6b45-4813-9e62-8bc4cbad82ea.png)

Where does `useEffect` actually run? It doesn’t run during rendering. It runs after React has already committed the UI to the DOM.

That means the flow looks like this:

1. React renders the component (without data)
2. React commits the UI
3. useEffect runs
4. Data fetching starts
5. State updates when the data arrives
6. React renders again

```jsx
useEffect(() => {
  fetchData().then(setData);
}, []);
```

Hence, the fetch only starts after the UI has already rendered.

### The Problem with the Traditional Way

Consider a very common scenario: you fetch a user, and then fetch related data using the user ID.

The traditional React data fetching solution would look like this:

```jsx
useEffect(() => {
  fetchUser().then(setUser);
}, []);

useEffect(() => {
  if (!user) return;
  fetchOrders(user.id).then(setOrders);
}, [user]);
```

What actually happens is:

- The component renders
- React commits the UI
- The first effect runs and fetches the user
- React re-renders
- The second effect runs and fetches orders

Even if the network is fast, the requests are forced to start one after another, because each fetch is triggered by a render that only happens after the previous fetch completes.

This paradigm of data fetching is called `Fetch-On-Render`. The fetching logic is no longer controlled by data dependencies – it’s controlled by render timing. But that’s not all. There are other problems with this approach: you create and maintain unnecessary states.

Now, let’s see both these problems in action by building something practical.

---

## Let’s Build a Dashboard with the Traditional Data Fetching Approach

Let’s build a simple dashboard with the traditional data fetching approach using the `useEffect` hook at the center. The dashboard will have four primary sections:

- A Static heading.
- A `Profile` section welcoming the user with their name.
- An `Order` section listing the items ordered by the user.
- An `Analytics` section showing a few metrics for the same user.

You can visualise it like this:

![Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1770184122812/d8cd8d82-9f38-4ab6-b029-e2e68dbbd66a.png)

The profile, order, and analytics sections should show the dynamic data of a user and their order and analytics. Hence, we’ll simulate three API calls to get the user details, order details, and the analytics data.

```jsx
// API to fetch User
export function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Tapas" });
    }, 1500);
  });
}

// API to fetch the Orders of a User
export function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
          `Order A for user ${userId}`,
          `Order B for user ${userId}`
      ]);
    }, 1500);
  });
}

// API to fetch the Analytics of a User
export function fetchAnalytics(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        revenue: "$12,000",
        growth: "18%",
        userId
      });
    }, 1500);
  });
}
```

As you can see in this code:

- Each of the API functions returns a promise.
- There is an intentional delay of 1.5 seconds using setTimeout to simulate the feel of a network call. The promise resolves after the delay passes.
- Once the promise gets resolved, we get the data.

Now, let’s create the Dashboard component:

```jsx :collapsed-lines
import { useEffect, useState } from "react";
import { fetchAnalytics, fetchOrders, fetchUser } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  // Step 1: Fetch user
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  // Step 2: Fetch orders (depends on user)
  useEffect(() => {
    if (!user) return;
    fetchOrders(user.id).then(setOrders);
  }, [user]);

  // Step 3: Fetch analytics (depends on user)
  useEffect(() => {
    if (!user) return;
    fetchAnalytics(user.id).then(setAnalytics);
  }, [user]);

  // Logic to ensure that user, orders, and analytics data
  // loaded before we render them on JSX
  if (!user || !orders || !analytics) {
    return <p className="text-xl m-3">Loading dashboard...</p>;
  }

  return (
    <div className="m-2">
      <header>
        <h1 className="text-5xl mb-12">📊 Dashboard</h1>
      </header>

      <h2 className="text-3xl">Welcome, {user.name}</h2>

      <h2 className="text-3xl mt-3">Orders</h2>
      <ul>
        {orders.map((o) => (
          <li className="text-xl" key={o}>
            {o}
          </li>
        ))}
      </ul>

      <h2 className="text-3xl mt-3">Analytics</h2>
      <p className="text-xl">Revenue: {analytics.revenue}</p>
      <p className="text-xl">Growth: {analytics.growth}</p>
    </div>
  );
}
```

::: info Let’s break it down

- The first thing you’ll notice is that we have three states for holding the data of users, orders, and analytics.
- Then we have three `useEffect`s to manage the fetching of data and updating the states.
- Then we show the data values in the JSX.
- We’re using a `Fetch-On-Render` methodology.

:::

However, in between, there’s an explicit logic to check if the user data, order data, or analytics data has been loaded. If the data are not loaded, then we don’t even process the JSX – rather, we show a loading message.

```js
// Logic to ensure that user, orders, and analytics data 
// loaded before we render them on JSX
if (!user || !orders || !analytics) {
  return <p className="text-xl m-3">Loading dashboard...</p>;
}
```

This is good as a measure so that the UI doesn’t crash at runtime. But this is not a declarative approach. Since React is declarative, it would make more sense if we could handle this scenario in a declarative way as well.

In `Declarative programming`, you as a programmer don’t specify how to to solve certain problems. You declare what you want to achieve, and the programming language/framework takes care of the “how” part for you. When you specify the “how” part, it becomes `imperative`, not declarative.

React is declarative because you don’t specify how to update the browser DOM to render the UI changes. You declare them using JSX, and React takes care of it under the hood.

As an alternative to the explicit imperative logic like the above, you could also handle it using loading states. You could have loading states for profile, orders, and analytics. The loading states could decide when to show the data conditionally. But this approach needs additional state management and conditional rendering of JSX.

Along with these issues, think of handling errors! Again, you would need states for error handling and the conditional logic to show and hide the error messages. That’s too much to manage.

So, with the `useEffect` strategy, data fetching in React is not that effective. We need a better pattern to handle data along with loading states and errors.

But before we move on, I want to clarify that `useEffect` isn’t bad. It has a purpose, but sometimes we don’t use it as intended. If you’re someone who wants to learn the effective usages of this hook and how to debug it properly, you can [<VPIcon icon="fa-brands fa-youtube"/>check out this session](https://youtu.be/z2VnpJ6st-4).

---

## What is Suspense?

At its core, React `Suspense` is not a loading feature. It’s a rendering coordination mechanism. Suspense allows a component to tell React, “I’m not ready to be rendered, yet”. When that happens, React pauses rendering for that part of the tree and shows a fallback UI until the required data becomes available.

![Suspense Mechanism](https://cdn.hashnode.com/res/hashnode/image/upload/v1770193224537/fb10d206-11f0-4cdf-b984-bfcf07b19ae8.png)

This is fundamentally different from how data fetching works with useEffect.

With the traditional `Fetch-On-Render` approach, React must first render a component before it’s allowed to start fetching data. Effects run after the commit phase, which means data fetching is always a reaction to rendering, never a prerequisite for it. As applications grow, this creates render-fetch-re-render loops, hidden waterfalls, and loading logic spread across components.

Suspense flips that model.

Instead of rendering first and fetching later, Suspense enables `Render-as-you-Fetch`. Data fetching can begin before React attempts to commit the UI, and rendering simply waits until the data is ready. The UI doesn’t guess when to show loading states. React coordinates it declaratively through Suspense boundaries.

With Suspense, you need to wrap the component that handles the asynchronous call.

![Suspense as Wrapper](https://cdn.hashnode.com/res/hashnode/image/upload/v1770195686150/1160a43a-6be0-488a-aa19-315ac9f33985.png)

Suspense can pause the rendering while the wrapped component is dealing with the promise. Suspense can show a fallback UI (it could be a loader, UI skeleton, and so on) until the promise is resolved (or rejected). Once the promise is resolved, Suspense replaces the fallback UI with the actual wrapped component baked with the data. No hard-coded logic, no extra state management is needed.

---

## What is the `use()` API in React?

`use()` is an API introduced in React 19 that accepts a promise and returns its resolved value. If the promise hasn’t resolved yet, React doesn’t continue rendering. It suspends. If the promise fails, React throws an error. Both cases are handled declaratively by Suspense and Error Boundaries.

```jsx
import { use } from "react";

function fetchUser() {
  return fetch("/api/user").then(res => res.json());
}

const userPromise = fetchUser();

export default function Profile() {
  const user = use(userPromise);
  return <h2>Welcome, {user.name}</h2>;
}
```

::: info What’s important here:

- `use()` is called during render
- If the promise is unresolved, rendering pauses
- No `useEffect`, no loading state

:::

`use()` is very powerful. It can read promises that depend on other promises.

```jsx
const userPromise = fetch("/api/user").then(r => r.json());

const ordersPromise = userPromise.then(user =>
  fetch(`/api/orders?userId=${user.id}`).then(r => r.json())
);

function Orders() {
  const orders = use(ordersPromise);
  return (
    <ul>
      {orders.map(o => <li key={o.id}>{o.title}</li>)}
    </ul>
  );
}
```

::: info Here

- Dependencies are expressed in data, not effects
- Rendering is coordinated automatically (declaratively)

:::

The primary mental model is: this render is not allowed to complete without this data. It suspends.

```js
const data = use(promise);
```

We need to use Suspense to handle this gap (when the promise hasn’t resolved yet) using a fallback UI, and then to continue rendering once the promise is resolved.

---

## How to Use Suspense and the `use()` API for Data Fetching

The `use()` API is what finally makes Suspense practical for data fetching. Before `use()`, Suspense could pause rendering, but React didn’t have a clean way to consume asynchronous data during render without hacks. Most examples relied on custom abstractions or libraries to bridge that gap. `use()` changed that by allowing React components to read async values directly during rendering.

When a component reads data using `use(promise)`, React treats that promise as a render dependency. If the promise hasn’t resolved yet, React pauses rendering at the nearest Suspense boundary. When it resolves, React retries rendering automatically, without manual state updates, effects, or conditional logic.

```jsx
import { Suspense, use } from "react";

const userPromise = fetch("/api/user").then(res => res.json());

function Profile() {
  const user = use(userPromise);
  return <h2>Welcome, {user.name}</h2>;
}

export default function App() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <Profile />
    </Suspense>
  );
}
```

::: info What happens here:

- Profile tries to read userPromise
- If the promise is unresolved, React pauses rendering
- React renders the nearest Suspense fallback
- When the promise resolves, React retries rendering automatically

:::

Here, there are no effects, no loading flags, and no manual re-rendering.

Now, let’s see all these in action together by rebuilding the same Dashboard app.

---

## Let’s Build the Dashboard with Suspense and the `use()` API

Now that we have a better understanding of Suspense and `use()`, let’s rewrite the same Dashboard application with it.

### Project Setup

First, you’ll need to create a React project scaffolding using [<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project). You can use the following command to create a Vite-based React project with modern toolings:

```sh
npx degit atapas/code-in-react-19#main suspense-patterns
```

This will create a React 19 project with TailwindCSS configured.

Now use the `npm i` command to install the dependencies. This will create the node_modules folder for you. At this point, the directory structure should look like this:

![React 19 Project Directory Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1770281531136/c34dcf94-7142-4033-9445-53b08d010a5e.png)

### API Services

Now under <VPIcon icon="fas fa-folder-open"/>`src/`, create a new folder called <VPIcon icon="fas fa-folder-open"/>`api/`. Then create an <VPIcon icon="fa-brands fa-js"/>`index.js` file under <VPIcon icon="fas fa-folder-open"/>`src/api/` with the following code snippet:

```jsx :collapsed-lines title="app/api/index.js"
export function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Tapas" });
    }, 1500);
  });
}

export function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
          `Order A for user ${userId}`,
          `Order B for user ${userId}`
      ]);
    }, 1500);
  });
}

export function fetchAnalytics(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        revenue: "$12,000",
        growth: "18%",
        userId
      });
    }, 1500);
  });
}
```

These are the same APIs we used before when constructing the dashboard with `useEffect`.

- `fetchUser`: For fetching the user’s profile
- `fetchOrders`: For fetching the orders made by a user
- `fetchAnalytics`: For fetching the analytics data of a user

### Create a Centralised User Resource

Now, let’s create a centralised JavaScript utility file where we can create each of the promises by calling their respective fetch methods. It’s a good practice to handle all the fetch APIs and their promises from a single place, rather than keeping them scattered. The same utility can export the promises so that we can consume them in the components.

Create a <VPIcon icon="fas fa-folder-open"/>`resources/` folder under <VPIcon icon="fas fa-folder-open"/>`src/`. Create a file <VPIcon icon="fa-brands fa-js"/>`userResource.js` file under <VPIcon icon="fas fa-folder-open"/>`src/resources/` with the following code:

```js :collapsed-lines title="resources/userResource.js"
import { fetchAnalytics, fetchOrders, fetchUser } from "../api";

let userPromise;
let ordersPromise;
let analyticsPromise;

export function createUserResources() {
  userPromise = fetchUser();

  ordersPromise = userPromise.then(user =>
    fetchOrders(user.id)
  );

  analyticsPromise = userPromise.then(user =>
    fetchAnalytics(user.id)
  );
}

export function getUserResources() {
  return {
    userPromise,
    ordersPromise,
    analyticsPromise
  };
}
```

::: info Here, we export two functions

1. The `createUserResources()` creates all the promises and keeps them ready.
2. The `getUserResources()` returns all the promises we can consume later.

:::

Now, the question is, when will we create these promises? That is, where we will call the `createUserResources()` function? We should create these promises when the application starts up, and the <VPIcon icon="fa-brands fa-react"/>`main.jsx` file would be the perfect place for that.

Open the <VPIcon icon="fa-brands fa-react"/>`main.jsx` file, import `{createUserResources}`, and invoke it immediately.

```jsx title="main.jsx"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createUserResources } from "./resources/userResource.js";

createUserResources();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Great! Our data fetching APIs and the promises are ready. Let’s create the components where we’ll be using these promises.

### Create Individual Components

We’ll create three components to compose the dashboard: Profile, Orders, and Analytics.

![Component Hierarchy](https://cdn.hashnode.com/res/hashnode/image/upload/v1770297241100/91d9c21b-afcb-40ee-a73d-34a2be0f8cad.png)

Let’s start with the Profile component. Create a folder <VPIcon icon="fas fa-folder-open"/>`components/` under the <VPIcon icon="fas fa-folder-open"/>`src/`. Now, create a `Profile.jsx` with the following code:

```jsx title="components/Profile.jsx"
import { use } from "react";
import { getUserResources } from "../resources/userResource";

export default function Profile() {
  const { userPromise } = getUserResources();
  const user = use(userPromise);
  return <h2 className="text-3xl">Welcome, {user.name}</h2>;
}
```

::: info Let’s break it down

- We imported the `use()` from React, as we’ll be dealing with the use promise here to handle it and get the user name to render.
- Next, we need the user promise. We have the `getUserResources()` function to get that, so we imported it.
- Then, inside the Profile component, we destructured `userPromise` from the `getUserResources()` function.
- After that, we passed the promise to the `use()`. We have learned that the `use()` API accepts a promise and returns the result when it is resolved. Until then, the passed-in promise itself will be returned.
- Finally, we used the resolved `user` to extract the name property and render it.

:::

Simple, right? Let’s quickly create the Orders and Analytics components.

The Orders component:

```jsx
import { use } from "react";
import { getUserResources } from "../resources/userResource";

export default function Orders() {
   const { ordersPromise } = getUserResources();
  const orders = use(ordersPromise);

  return (
    <>
      <h2 className="text-3xl mt-2">Orders</h2>
      <ul>
        {orders.map((o) => (
          <li className="text-xl" key={o}>{o}</li>
        ))}
      </ul>
    </>
  );
}
```

It has the same flow as the Profile component.

Now, let’s do the Analytics component:

```jsx
import { use } from "react";
import { getUserResources } from "../resources/userResource";

export default function Analytics() {
    const { analyticsPromise } = getUserResources();
    const analytics = use(analyticsPromise);

    return (
        <>
            <h2 className="text-3xl mt-2">Analytics</h2>
            <p className="text-xl">Revenue: {analytics.revenue}</p>
            <p className="text-xl">Growth: {analytics.growth}</p>
        </>
    );
}
```

All three components are ready. Before we move further, let’s reflect once more on what we learned about `Suspense`.

Suspense wraps a component that deals with promises (async operations). Until the promise gets resolved, the Suspense holds the rendering and can show a fallback UI in the meantime. Once the promise gets resolved and we have the value, the fallback UI gets swapped with the actual component Suspense wrapped.

So, we have the ideal case now: wrapping the `<Profile />`, `<Orders/>`, and `<Analytics/>` with the `<Suspense>…</Suspense>` boundary to handle the promises and resolved data for each of the components.

Let’s do that, but aren’t we missing something? Yeah we are: the fallback UI. Let’s create it.

### Create the Fallback UI

Now we’ll create three different fallback UI components. Create a file <VPIcon icon="fa-brands fa-react"/>`Skeletons.jsx` under the <VPIcon icon="fas fa-folder-open"/>`src/components/` with the following code:

```jsx title="components/Skeleton.jsx"
export const ProfileSkeleton = () => <p className="text-3xl m-2">Loading user...</p>;
export const OrdersSkeleton = () => <p className="text-3xl m-2">Loading orders...</p>;
export const AnalyticsSkeleton = () => <p className="text-3xl m-2">Loading analytics...</p>;
```

We now have a fallback skeleton UI for each of our components. These are very simple components that just render loading messages.

### Create the Dashboard Component with Suspense

Now we have everything to make our Dashboard work. Create a <VPIcon icon="fas fa-folder-open"/>`suspense/` folder under <VPIcon icon="fas fa-folder-open"/>`src/`. Then create a <VPIcon icon="fa-brands fa-react"/>`Dashboard.jsx` file under <VPIcon icon="fas fa-folder-open"/>`src/suspense/` with the following code:

```jsx :collapsed-lines title="suspense/Dashboard.jsx"
import { Suspense } from "react";

import Analytics from "../components/Analytics";
import Orders from "../components/Orders";
import Profile from "../components/Profile";

import {
  AnalyticsSkeleton,
  OrdersSkeleton,
  ProfileSkeleton,
} from "../components/Skeletons";

export default function Dashboard() {
  return (
    <div className="m-2">
      <header>
        <h1 className="text-5xl mb-12">📊 Dashboard</h1>
      </header>

      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
      <Suspense fallback={<OrdersSkeleton />}>
        <Orders />
      </Suspense>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
    </div>
  );
}
```

::: info First, let me explain the code:

- We imported Suspense from React, all the components, and all the fallback UI components.
- Then we rendered a static header and three suspense boundaries for each of the components. We wrapped Profile, Orders, and Analytics with Suspense, respectively. To handle the pending promise state, we have passed the individual skeleton component as the fallback to the suspense.

:::

How clean is this? If you scroll up and recheck our old implementation of the dashboard using useEffect and compare it with the one we created with suspense, the positive differences are clear.

- It’s declarative.
- There’s less code, with the chance of fewer bugs
- There’s no effect management and synchronisations
- There’s no conditional JSX

It’s a huge win 🏆.

### Run the Dashboard App

To run the dashboard app, import the dashboard component in the <VPIcon icon="fa-brands fa-react"/>`App.jsx` file and use it like this:

```jsx title="App.jsx"
import Dashboard from "./suspense/Dashboard";
function App() {
  return (
    <div className="flex items-center justify-center gap-12">
      <Dashboard />
    </div>
  );
}

export default App;
```

Next, open the terminal. Run the app using the `npm run dev` command. You get the same dashboard back, but it’s much improved:

![New dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1770184122812/d8cd8d82-9f38-4ab6-b029-e2e68dbbd66a.png)

- It loads the data of each of the sections independently.
- Each of the sections shows the data loading indicator when the promise is pending.
- It doesn’t block the entire UI.

Suspense and `use()` together are very powerful. Now you have learned that powerful pattern end-to-end.

---

## How to Handle Error Scenarios with Error Boundaries

This data fetching handbook wouldn’t be complete without talking about error scenarios and how to handle them. So far, we’ve spoken about only the happy path. But what if any of the promises are rejected? How do we handle that?

To understand this in depth, let’s reject one of the promises – say the Order promise. Open the <VPIcon icon="fa-brands fa-js"/>`index.js` file under the <VPIcon icon="fas fa-folder-open"/>`src/api/` folder and replace the `fetchOrder()` function with this updated code:

```js title="api/index.js"
export function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate failure
      if (Math.random() < 0.5) {
        reject(new Error("Failed to fetch orders"));
      } else {
        resolve([
          `Order A for user ${userId}`,
          `Order B for user ${userId}`
        ]);
      }
    }, 1500);
  });
}
```

::: info Here, the changes are

- We have simulated a failure by rejecting a promise.
- The promise gets rejected randomly and throws an error with an error message.

:::

At this point, if you refresh the UI a few times, you’ll randomly get a blank broken UI with the error message logged into the browser console. This isn’t ideal. It kills the UX of the app.

A better way of handling would be to show the error message on the UI and provide a way to retry and check if the user can recover from the error.

This is where `Error Boundary` comes in.

### Error Boundary

Error Boundaries in React exist for a simple reason: Errors are inevitable, and we must handle them gracefully. There could be:

- Network requests fail
- Data is malformed
- The assumptions break

Without boundaries, a single tiny rendering error can crash the entire React tree. Error Boundaries provide React with a structured way to handle failures.

Technically, an Error Boundary is a component that catches errors thrown during rendering. When an error occurs, React stops rendering the subtree and renders a fallback UI instead.

Let’s now create an Error Boundary. Create a file called <VPIcon icon="fa-brands fa-react"/>`ErrorBoundary.jsx` under `src/components` with the following code:

```jsx title="components/ErrorBoundary.jsx"
import { Component } from "react";
import { createUserResources } from "../resources/userResource";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleRetry = () => {
    this.setState({ error: null });
    createUserResources();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="border border-red-700 rounded p-1">
          <p className="text-xl">{this.state.error.message}</p>
          <button 
                className="bg-orange-400 rounded-xl p-1 text-black cursor-pointer" 
                onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Now, let’s understand what’s going on in the code above:

- This is a class component that inherits from `React.Component`. That’s because Error Boundaries must use class lifecycle methods, which are not available in function components.
- The component keeps track of whether an error has occurred. `state = { error: null }` means everything is rendering normally. When an error happens, this state will store the error object.
- The `static getDerivedStateFromError()` is a special lifecycle method. React automatically calls it when a child component throws an error during render.
- The `handleRetry()` method resets the error state back to null. It calls the `createUserResources()` to reinitialise the async resources.
- In the `render()` method, if an error exists, render a fallback UI, show the error message, and provide an ability to retry the error using a retry button. If no error exists, render the `children` normally. The Error Boundary becomes invisible when everything works without an error. The fallback UI also can be an external component that we can pass as a prop to the Error Boundary.

If you’re interested in diving deep into the `Error Boundary` pattern and want to learn various use cases of it, [<VPIcon icon="fa-brands fa-youtube"/>here is a dedicated video](https://youtu.be/0qxF4jb-eUg) you can check out.

### Suspense and Error Boundary

Next, we’ll now use the Error Boundary to wrap each of the Suspense boundaries so that if an error originated from any of those, it can be managed. Open the `Dashboard.jsx` file and wrap each of the Suspense boundaries with the `ErrorBoundary` component as shown below:

```jsx title="Dashboard.jsx"
import { Suspense } from "react";
import Analytics from "../components/Analytics";
import ErrorBoundary from "../components/ErrorBoundary";
import Orders from "../components/Orders";
import Profile from "../components/Profile";
import {
  AnalyticsSkeleton,
  OrdersSkeleton,
  ProfileSkeleton,
} from "../components/Skeletons";

export default function Dashboard() {
  return (
    <div className="m-2">
      <header>
        <h1 className="text-5xl mb-12">📊 Dashboard</h1>
      </header>

      <ErrorBoundary>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<OrdersSkeleton />}>
          <Orders />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<AnalyticsSkeleton />}>
          <Analytics />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

That’s it. Now, access the dashboard on the browser. Whenever the order promise rejects, we’ll get the fallback error UI from the error boundary. Note, the remaining UI isn’t broken and rendered successfully. The partial failure of the UI is also recoverable, as we have provided a retry button to attempt to revive that portion. It provides a great UX.

![Error Boundary with Suspense](https://cdn.hashnode.com/res/hashnode/image/upload/v1770301723655/36fbba52-805b-4a23-8d18-9516a413160e.png)

This is how the Suspense boundary, the `use()` API, and the Error Boundary work together to help you write scalable React code that can be maintained very easily in the future. I hope you found it helpful. All the source code used in this handbook is in the [tapaScript GitHub Repository (<VPIcon icon="iconfont icon-github"/>`tapascript/15-days-of-react-design-patterns`)](https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-16).

::: info Learn from the 15 Days of React Design Patterns

I have some great news for you: after my 40 days of JavaScript initiative, I have now completed a brand new initiative called [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC) (with Bonus Episodes).

If you enjoyed learning from this handbook, I’m sure you’ll love this series, featuring the 15+ most important React design patterns. Check it out, subscribe, and get it for free:

![<VPIcon icon="fa-brands fa-youtube"/>15 days of React Design Patterns](https://cdn.hashnode.com/res/hashnode/image/upload/v1770087890778/c89e0666-898d-448c-9d2c-443788fd4413.png)

:::

---

## Before We End…

That’s all! I hope you found this insightful.

::: info

Let’s connect:

<SiteInfo
  name="15-days-of-react-design-patterns/day-03/compound-components-patterns at main · tapascript/15-days-of-react-design-patterns"
  desc="Learn to write clean React Code by understanding the most useful design patterns. - tapascript/15-days-of-react-design-patterns"
  url="https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-03/compound-components-patterns/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea2b4b09e39496e94c0a6394780162b1dcfeeaefee47a86647662882fd121018/tapascript/15-days-of-react-design-patterns"/>

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Check out my courses, [<VPIcon icon="fa-brands fa-youtube"/>40 Days of JavaScript](https://youtube.com/playlist?list=PLIJrr73KDmRw2Fwwjt6cPC_tk5vcSICCu), [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC), and [<VPIcon icon="fa-brands fa-youtube"/>Thinking in Debugging](https://youtube.com/playlist?list=PLIJrr73KDmRwT8Msc4H3_CP5Tf8MqqqVZ).
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Join my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/zHHXx4vc2H), and let’s learn together.
- Follow my work on [GitHub (<VPIcon icon="iconfont icon-github"/>)](https://github.com/tapascript).

:::

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Modern React Data Fetching Handbook: Suspense, use(), and ErrorBoundary Explained",
  "desc": "Most React developers don’t break the data fetching process all at once. It usually degrades gradually, slowly. Traditionally, you may have used a useEffect here, a loading flag there, and an error state along with it to tackle data fetching. Moving ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-modern-react-data-fetching-handbook-suspense-use-and-errorboundary-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
