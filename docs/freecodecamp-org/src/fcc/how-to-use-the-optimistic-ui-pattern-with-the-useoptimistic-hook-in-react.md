---
lang: en-US
title: "How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React"
description: "Article(s) > How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React"
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
      content: "Article(s) > How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React"
    - property: og:description
      content: "How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-optimistic-ui-pattern-with-the-useoptimistic-hook-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-12-13
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765561440350/c3546e6c-8b23-476a-86d4-b63fd2cb9f6c.png
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
  name="How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React"
  desc="Have you ever clicked a Like icon on a social media app and noticed the count jumps instantly? The colour of the icon changes at the same time, even before the server finishes the action. Now imagine you hit the same Like button, but it takes its swe..."
  url="https://freecodecamp.org/news/how-to-use-the-optimistic-ui-pattern-with-the-useoptimistic-hook-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765561440350/c3546e6c-8b23-476a-86d4-b63fd2cb9f6c.png"/>

Have you ever clicked a `Like` icon on a social media app and noticed the count jumps instantly? The colour of the icon changes at the same time, even before the server finishes the action.

Now imagine you hit the same Like button, but it takes its sweet time in making the server call, performing the DB updates, and getting you the response back to update the state of the Like button.

Which experience would you like the most? You are most likely to select the first scenario. We all love “instant feedback”. The magic of instant feedback is powered by a pattern called the `Optimistic UI Pattern`.

In this article, we will uncover:

- What does Optimistic UI really mean?
- Why does it massively improve the user experience?
- How does React 19’s new useOptimistic() hook make it easier than ever?
- How to implement a real-world scenario using the Optimistic Pattern
- A bunch of use cases where you will be able to use this pattern.

By the end, you will be proactively thinking of using this design pattern to improve the UX of your project.

This article is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns initiative](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC). Please check it out.

<VidStack src="youtube/x03yX-yNxas" />

---

## What is Optimistic UI?

`Optimistic UI` (also known as optimistic updates) is a pattern that helps you update the UI immediately, assuming the server operation will succeed, and if it later fails, you roll back the UI to the correct state.

Instead of waiting for the round-trip of the client request, database write, server response, and then the UI render, the UI just updates instantly. This dramatically increases what’s called the `perceived speed`. The user of the application perceives the UI update as instant – but the actual operation may take place in the background.

### Without an Optimistic Update

If you’re not using the optimistic pattern, it’s just a traditional client-server mechanism, where:

- At the client side, a user interacts with a UI element.
- An [<VPIcon icon="fa-brands fa-youtube"/>async call](https://youtu.be/WQdCffdPPKI) (request) is made to the server.
- The server processes the request and may make DB updates.
- On a successful case, the server sends back the response to the client.
- The client updates the relevant UI.
- In an error case, the server sends back the error response to the client.
- The client informs the user about the error.

![Without an Optimistic Update](https://cdn.hashnode.com/res/hashnode/image/upload/v1765334108586/aabd3f16-b175-4b1d-ae33-94f33e1b894a.png)

In this case, the user has to wait for the success/failure of the request to perceive any change after their interaction. This wait is neither uniform nor optimal. It may vary based on the network speed, network latency, and deployment strategies of the application.

### With an Optimistic Update:

When you’re using an optimistic update, here’s how things go:

- At the client side, a user interacts with a UI element.
- The UI gets updated instantly, and the user perceives the feedback immediately.
- In parallel, in the background, the client initiates the server call.
- The server processes the request and may make DB updates.
- On a successful case, the server doesn’t do anything else, as the UI has been updated already, assuming this call will succeed.
- In an error case, the server sends back the error response to the client.
- The client rolls back the eager, optimistic UI update it made.

![With an Optimistic Update](https://cdn.hashnode.com/res/hashnode/image/upload/v1765334174203/e8bef9ba-28b6-45e0-8f22-0fc1468e3219.png)

In this case, the user doesn’t wait for the server round-trip to complete before the UI is updated. It’s much faster, assuming that, in most cases, the parallel server call will succeed.

With this comparison, we can now understand why Optimistic Updates matter in modern UI.

- It improves perceived speed
- It keeps users engaged
- It eliminates the awkward feelings like “Did my click work?”

And so on. Optimistic updates are critical for real-time feeling features like chat messages, likes, comments, cart updates, poll votes, collaborative editing, and more. Even AI-driven apps that take time to respond benefit from optimistic placeholders like “Thinking…”, “Sending…” and so on.

---

## How Does it Work Under the Hood?

Under the hood, there are actually two states:

1. The Actual State: This is the actual source of truth. This data should be in sync with the server.
2. The Optimistic State: This is temporary and instantly shown to the user.

When the server request succeeds, do nothing. Your optimistic state is now correct. If the server request fails, perform a rollback, and return UI the actual state.

React 19 introduced a built-in hook to help with this pattern called `useOptimistic()` . In the next section, we will take a deep dive into it with code and working internals.

### The `useOptimistic()` Hook in React 19

`useOptimistic()` is a React hook introduced in React 19 to help with optimistic updates. The syntax and usage of the hook go like this:

```jsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

When an async action is underway, the `useOptimistic()` hook allows you to show different states.

It accepts:

1. **currentState**: your real source of truth (useState, Redux, server state, and so on)
2. **updateFn**: a pure function that says how to compute the optimistic value

It returns:

1. **optimisticState**: the temporary UI state
2. **addOptimisticUpdate(input)**: function you call to apply immediate updates

Take a look at the picture below. It shows the relationship between the current state and the optimistic state clearly:

![Anatomy](https://cdn.hashnode.com/res/hashnode/image/upload/v1765434835916/249e71eb-bba6-4b98-951a-feb397dc36e2.png)

Here’s what’s going on there:

1. We pass the current state and an updater function to the `useOptimistic` hook.
2. The updater function takes the current state and a user input to compute and return the next optimistic state.
3. The input to the updater function is supplied using the `addOptimistic(input)` function.
4. Finally, the optimistic state value is used in the component.

Let’s now build something exciting using this hook to understand its internals better.

---

## How to Build an Optimistic Like Button

We will be building the Like button functionality optimistically. The flow will be like this:

- The user clicks on the Like button.
- We update the Like button’s state immediately and optimistically.
- In parallel, we send the server call to persist the value into the DB (we will simulate it)
- Then we handle any error scenarios.

First, let’s simulate a network call to the server using JavaScript’s Promise object and the `setTimeout()` web API:

```jsx
// simulate a network call to the Server
async function sendLikeToServer(postId) {
  await new Promise((r) => setTimeout(r, 700));

  if (Math.random() < 0.2) throw new Error("Network failed");
  console.log(`Sent a like for the post id ${postId}`);
  return { success: true };
}
```

The `sendLikeToServer` function takes a post ID as a parameter and simulates a fake network call using a Promise and a delay of 700 ms. It pretends to submit a request to the server to persist a post’s likes value.

To make it a bit more realistic, we have created a random error. The function will throw an error randomly so that we can understand the rollback scenario as well.

Next, we will create the real source of truth, the actual state for the Like count:

```jsx
const [likes, setLikes] = useState(initialLikes);
```

Then, create the optimistic state value with the `useOptimistic()` hook:

```jsx
const [optimisticLikes, addOptimisticLike] = useOptimistic(likes, (currentLikes, delta) => currentLikes + delta);
```

Let’s understand this declaration well:

- We have passed the actual state value (likes) and the updater function to the `useOptimistic()` hook.
- Take a look at the updater function, `(currentLikes, delta) => currentLikes + delta`. It’s an arrow function that gets the current like value and a delta. It returns the sum of the current like value and the delta. The return value logic is your own business logic. For incrementing the like count, it makes sense to increase the current like value by a delta value (of 1).
- Now, the question is, how do we get this delta value? Who passes it? That’s where the return values of `useOptimistic()` come in handy. The `addOptimisticLike` is a function through which we can pass that delta value. How? Let’s take a look.

When someone clicks on the Like button, we need to handle the click event and increase the like count value. So here is a `handleLike()` function which does that:

```jsx
const handleLike = async () => {
  addOptimisticLike(1);
  try {
    await sendLikeToServer(postId);
    setLikes((prev) => prev + 1);
  } catch (err) {
    console.error("Like failed:", err);
    setLikes((s) => s); 
  }
};
```

::: info A lot is happening here:

- We call the `addOptimisticLike()` function with a delta value of 1. This call will ensure that the updater function `(currentLikes, delta) => currentLikes + delta` of the `useOptimistic()` will be called. The return value will be set to the optimistic state, that is, `optimisticLikes`.
- This optimistic state value we use in the JSX. So we can see the increased like count immediately.
- Then we make the fake server call, and also update the actual state, provided the server call was successful.
- In case of an error, the control goes into the catch-block, where we roll back the likes value to the previous one. This will also sync the optimistic state’s value with a rollback.

:::

Here is the complete code of the `LikeButton` component:

```jsx :collapsed-lines
import { startTransition, useOptimistic, useState } from "react";

// simulate a network call to the Server
async function sendLikeToServer(postId) {
  await new Promise((r) => setTimeout(r, 700));

  if (Math.random() < 0.2) throw new Error("Network failed");
  console.log(`Sent a like for the post id ${postId}`);
  return { success: true };
}

// The Like Button Component
export default function LikeButton({ postId, initialLikes = 0 }) {
  // the "real" source of truth for likes (committed)
  const [likes, setLikes] = useState(initialLikes);
  // optimistic state and updater function
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, delta) => currentLikes + delta
  );

  const handleLike = async () => {
    // 1) Apply optimistic change *immediately*
    addOptimisticLike(1);

    // 2) Start server call in low priority to avoid blocking UI

    try {
      await sendLikeToServer(postId);
      // On success, commit the real state update:
      // IMPORTANT: update the real state so optimistic snapshot eventually matches
      setLikes((prev) => prev + 1);
    } catch (err) {
      // On error, rollback the real state (or trigger a refetch)
      // Because we never incremented likes (real), just leave likes unchanged
      // But we should show an error to user:
      console.error("Like failed:", err);
      // Optionally: show toast or set an error state
      // And — to force the optimistic view to refresh and reflect real state,
      // call setLikes to current value
      setLikes((s) => s); // no-op but will cause optimistic to reflect the
                          // committed value Or you can trigger a re-fetch of the 
                          // post state
    }
  };

  return (
    <div className="flex">
      <button onClick={handleLike}>❤️ {optimisticLikes}</button>
      <button onClick={() => startTransition(async () => handleLike())}>
        ❤️ {optimisticLikes}
      </button>
    </div>
  );
}
```

Have you noticed that we have wrapped the `handleLike()` call with the `startTransition`?

Without this, React gives us a warning:

> “An optimistic state update occurred outside a transition or action.”

This is because optimistic updates are **low-priority visual updates**, not critical ones.

Using `startTransition()` ensures that:

- React doesn’t block rendering
- We do not get the warning
- We get a smooth, optimistic experience

The transitions are part of React’s concurrency model that helps us improve the performance of React applications. If you are interested in learning various performance optimisation techniques, [<VPIcon icon="fa-brands fa-youtube"/>here is a two-part guide for you](https://youtu.be/G8Mk6lsSOcw).

---

## The Pitfalls and Anti-Patterns

With any design pattern, we need to be aware of possible pitfalls, misuses, and anti-patterns. Here are a few things you should be aware of:

- Don’t assume that the server call will be successful. Network failure will happen, and you need to have a way to roll back. Rollback is the heart of optimistic UI. Omitting the rollback logic will cause adverse consequences.
- Don’t try hiding the bad UX behind optimistic updates. The Optimistic UI is not a fix or replacement for poor designs.
- Don’t perform any expensive work in optimistic updates. Keep the optimistic updater function lean, pure, and fast.

---

## 15 Days of React Design Patterns

I have some great news for you: after my *40 days of the JavaScript* initiative, I have now started a brand new initiative called [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC).

If you enjoyed learning from this article, I am sure you will love this series, featuring the 15+ most important React design patterns. Check it out and join for FREE:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765439781697/751c2051-5dc2-4a88-bcc2-037f6ce0e91e.png)

---

## Before We End...

That’s all! I hope you found this article insightful. You can find all the source code used in this tutorial on the [tapaScript GitHub (<VPIcon icon="iconfont icon-github"/>`tapascript/15-days-of-react-design-patterns`)](https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-08).

<SiteInfo
  name="15-days-of-react-design-patterns/day-03/compound-components-patterns at main · tapascript/15-days-of-react-design-patterns"
  desc="Learn to write clean React Code by understanding the most useful design patterns. - tapascript/15-days-of-react-design-patterns"
  url="https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-03/compound-components-patterns/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/833dd837ca19e00065e93c414d5a3fbfe45ed309b850ba333dd71cbf5649e894/tapascript/15-days-of-react-design-patterns"/>

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Grab the [<VPIcon icon="fas fa-globe"/>React Hooks Cheatsheet](https://tapascript.io/books/react-hooks-cheatsheet).
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Join my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/zHHXx4vc2H), and let’s learn together.
- Subscribe to my fortnightly newsletter, [<VPIcon icon="fas fa-globe"/>The Commit Log](https://tapascript.substack.com/subscribe?utm_medium=fcc).

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Optimistic UI Pattern with the useOptimistic() Hook in React",
  "desc": "Have you ever clicked a Like icon on a social media app and noticed the count jumps instantly? The colour of the icon changes at the same time, even before the server finishes the action. Now imagine you hit the same Like button, but it takes its swe...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-optimistic-ui-pattern-with-the-useoptimistic-hook-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
