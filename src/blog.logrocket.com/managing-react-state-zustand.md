---
lang: en-US
title: "Managing React state with Zustand"
description: "Article(s) > Managing React state with Zustand"
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
      content: "Article(s) > Managing React state with Zustand"
    - property: og:description
      content: "Managing React state with Zustand"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/managing-react-state-zustand.html
prev: /programming/js-react/articles/README.md
date: 2021-02-14
isOriginal: false
author:
  - name: Lorenz Weiß
    url : https://blog.logrocket.com/author/lorenzweis/
cover: /assets/image/blog.logrocket.com/managing-react-state-zustand/banner.png
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
  name="Managing React state with Zustand"
  desc="Learn how to use Zustand for managing and persisting state within React apps, as well as comparing Zustand to Redux, Jotai, and Recoil."
  url="https://blog.logrocket.com/managing-react-state-zustand"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/managing-react-state-zustand/banner.png"/>

::: note Editor’s note

This article was updated on 14 February 2022 to remove any outdated information and add the [Using Zustand to persist state](#using-zustand-persist-state) section.

:::

![Managing React State With Zustand](/assets/image/blog.logrocket.com/managing-react-state-zustand/banner.png)

To manage state in modern frontend frameworks, Redux has always been king. But now, many new competitors are entering the fray with new ideas, desperate to overthrow Redux with the promise of ease-of-use and simplicity.

I, for one, am excited about the growing number of new ways to manage your state. In this article, I’ll cover the simplest and smallest of all: Zustand.

---

## What is Zustand?

First of all, I’m not claiming that [<FontIcon icon="fas fa-globe"/>Zustand](https://zustand.surge.sh/) is currently the best tool to use. As in most cases, the question of which tool is the best cannot really be answered, or at least it must be answered with the dreaded phrase, “It depends.”

![Tweet That Reads, "Becoming A Senior Engineer Is Just Saying "It Depends" Over And Over Again Until You Quit/Retire"](/assets/image/blog.logrocket.com/managing-react-state-zustand/funny-tweet.png)

To get the full picture of Zustand, let’s go over some of the details of the library, how it is positioned in the market, and compare it to other libraries.

Zustand was created and is maintained by the creators of `react-spring`, `react-three-fiber`, and many other awesome tools, [<FontIcon icon="fas fa-globe"/>Poimandres](https://pmnd.rs/). At 1.5kB, it’s probably the smallest library of all—you can read through the source code in a matter of minutes.

---

## Getting started with Zustand

Zustand is known for its simplicity. On the (really beautiful) website they created for their package, you can see a very simple example written in just four lines of code that creates a globally available state:

```jsx
import create from 'zustand'

const useStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
}))
```

The main function of the state management library is called `create`. It accepts a callback function as its first argument, which in turn accepts a `set` function that should be used when manipulating memory.

The function `create` then returns another function, which in our case, is called `useStore`. As you can see from the name of the return value, it returns a Hook, so you can insert it anywhere in your React application, like so:

```jsx title="BearCounter.jsx"
function BearCounter() {
  const bears = useStore(state => state.bears)
  return <h1>{bears} around here ...</h1>
}
```

Wherever this Hook is injected and the state used, the component will rerender when the state changes, making it a fully functional global state with these small lines of code.

You can also extract the action, which changes the state anywhere you want from the same Hook like this:

```jsx title="Controls.jsx"
function Controls() {
  const increasePopulation = useStore(state => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

But, what about performing async actions or fetching something from a server that you save to your store?

Well, you can make your mutation function asynchronous and Zustand will set your state when it’s ready. That way you don’t need to worry about asynchronous functions inside your component anymore:

```jsx
const useStore = create(set => ({
  fishies: {},
  fetch: async pond => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  }
}))
```

State management can’t be simpler, right? But it looks very similar to other modern tools like Jotai or Recoil, you say? It may seem that way, but let’s look at some of the differences between these libraries.

---

## Using Zustand to persist state

One of the most common use cases for using a global state management tool is that you want to persist your state over the lifecycle of your website. For example, if you create a survey tool, you want to save the user’s answers and state.

Now, if the user accidentally reloads your page, all the answers and the pointer would be lost. This is a common use case where you want to persist this exact state.

That is, even if the user reloads the page or closes the window, the responses and state are retained and can be restored when the user visits the site again.

Zustand solves this particular use case with a nice “battery-included” middleware called `persist` that persists your store in any way you want. The only thing you need to do to persist your state in your application’s `sessionStorage` is to add the following:

```jsx
import create from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(persist(
  (set, get) => ({
    anwers: [],
    addAnAnswer: (answer) => set((prevState) => (
      { answers: [...prevState.answers, answer] }
    ))
  }),
  {
    name: "answer-storage", // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
))
```

As you can see, the store is exactly the same as without the persistence. The only difference is that it is additionally wrapped with persist middleware. You also need to give the store a unique name to identify it in the browser.

Optionally, you can also decide which persistence you want; by default, this is `localStorage`, but you can also choose `sessionStorage` if you want the state to be persistent only within the user’s session.

---

## Is Zustand better than Redux?

Redux is probably still the most widely used library when it comes to managing global states. However, libraries like Zustand try to tackle the problem of managing global states in a more pragmatic and simpler way.

Let’s examine how exactly Zustand differs from Redux.

### Simplicity

One drawback to using Redux is the amount of code you have to write to have global state. You have to create reducers, actions, and dispatch functions just to change a very simple state.

The power of Zustand is that creating a global state can be done with four lines of code. That is, if your state is simple, state can save you a lot of time.

### Scope

Redux, like Context, needs to be wrapped with a `provider` component that injects state into all components packaged with `provider` so that you can use that state in all packaged React components.

With Zustand, this is not necessary. After you create the store, you can inject it wherever you want and once for all components in the project. But that’s probably one of the biggest advantages of state: code that’s not in React.

So you can get data from your state in functions that are called without a React component. For example, using a request function before making a request to the backend.

### Developer experience

One of the biggest advantages of libraries like Redux that are popular and have been around for a while is that the developer experience, documentation, and the community are a lot better, so it is easier to find help or answers to your problems.

Even though I would say it is also the case with Redux vs. Zustand, I think the developer experience of Zustand is still positive. The documentation is similar to the library itself, pragmatic, and focused on the things you actually need.

Obviously, it’s not used as widely as Redux, and therefore the community and resources are not as widely spread. However, because the library is pretty simplistic, there aren’t as many questions, problems, or tutorials.

In addition to the community and documentation, one of the first arguments you get when discussing Redux versus another library is that the Redux development tools are powerful.

First, I don’t think you should decide on a library only by its debug tools, but it is a valid argument. But in Zustand, you can use the [debug tool (<FontIcon icon="iconfont icon-github"/>`pmndrs/zustand`)](https://github.com/pmndrs/zustand#redux-devtools) as you would in Redux store. Isn’t that amazing?

![Redux Debug Tool](/assets/image/blog.logrocket.com/managing-react-state-zustand/redux-debug-tool.png)

---

## Zustand vs. Jotai vs. Recoil

Interestingly, the [<FontIcon icon="iconfont icon-gtihub"/>`pmndrs/jotai`](https://github.com/pmndrs/jotai/issues/13) library and Zustand are from the same creators. But, the difference lies in the mental modal and how you structure your application.

[<FontIcon icon="fas fa-globe"/>According to the Jotai docs](https://jotai.org/docs/basics/comparison), “Zustand is basically a single store (you could create multiple stores, but they are separated.) Jotai is primitive atoms and composing them. In this sense, it’s the matter of programming mental model.

“Jotai can be seen as a replacement for `useState+useContext`. Instead of creating multiple contexts, atoms share one big context. Zustand is an external store and the hook is to connect the external world to the React world.”

The last sentence is, in my opinion, the most important one when it comes to what makes Zustand so different from other state management tools. It was basically built for React but is not tied to it.

This means it can be a tool to connect the React world with the nonReact world. How is this possible? Because the state is not built on top of React’s context API. You probably also noticed that you don’t need to add a root provider somewhere in your application during installation.

---

## What makes Zustand so special?

There are two things that impress me about Zustand: it’s not only for React and it’s 100 percent unopinionated.

I’ve mentioned it before, but what makes Zustand a great tool is that it’s not tied to the React context, and thus, not tied to use within a React application or React itself.

For example, you can combine the state of different applications no matter what framework they use (I’m looking at you, micro frontends).

Also, it’s completely unopinionated. While this sounds pretty obvious, in the world of state management in React, I immediately jumped on the Redux ecosystem bandwagon without even thinking about what benefits it could bring.

Zustand is one of the examples (and this is also true for the other libraries like Jotai or Recoil) where simplicity wins over over-engineering.

---

## Disadvantages of using Zustand

Overall, Zustand is a great library for pragmatic programmers and those who use React, but in combination with another library.

However, Zustand has its cons as well. For one, the documentation could be improved. As of the time of writing, the only documentation at the moment is the [project’s readme (<FontIcon icon="iconfont icon-github"/>`pmndrs/zustand`)](https://github.com/pmndrs/zustand/blob/master/readme.md).

While it’s well written so you can easily understand the library, it doesn’t cover all of the use cases.

For instance, if we look at the `persist` function, you can see two configuration options in the example, but to see all available options, you must open the code and check the implementation directly. Or, if you use TypeScript, you might figure it out by the typings.

Store structure is clunky, as well. When creating a store, it must always be done within the `create` function, and the `edit` functions need the `set` function added to the `callback` function.

This means you must write your `state` functions within the scope of the `callback` function or you must pass the `set` function to it. This can be clunky when writing more complex manipulation functions.

---

## The current state of state management

In my opinion, the days of how we used Redux originally are numbered. Global state management can be quite tricky and, therefore, should be something that is not made artificially complicated.

I’m not saying Redux isn’t useful, but it can cause you to over-engineer an initially simple state, which is why I was so impressed with the idea that Zustand touts simplicity. Now, we have plenty of options to choose from, so Redux may no longer be the default go-to for all of your state management.

But in the end, it can really vary from project to project and to say that there is one library that solves all of our problems is not realistic, but at least we have more options, and it should not be the default option to choose Redux for your state management in all applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Managing React state with Zustand",
  "desc": "Learn how to use Zustand for managing and persisting state within React apps, as well as comparing Zustand to Redux, Jotai, and Recoil.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/managing-react-state-zustand.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
