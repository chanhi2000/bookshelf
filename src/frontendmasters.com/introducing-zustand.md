---
lang: en-US
title: "Introducing Zustand (State Management)"
description: "Article(s) > Introducing Zustand (State Management)"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing Zustand (State Management)"
    - property: og:description
      content: "Introducing Zustand (State Management)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-zustand.html
prev: /programming/js-react/articles/README.md
date: 2025-07-21
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6584
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
  name="Introducing Zustand (State Management)"
  desc="Zustand is a minimal, but fun and effective state management library which just may improve your render performance."
  url="https://frontendmasters.com/blog/introducing-zustand/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6584"/>

[Zustand (<VPIcon icon="iconfont icon-github"/>`pmndrs/zustand`)](https://github.com/pmndrs/zustand) is a minimal, but fun and effective state management library. It’s somewhat weird for me to write an introductory blog post on a tool that’s over 5 years old and pretty popular. But it’s popular for a reason, and there are almost certainly more developers who aren’t familiar with it than are. So if you’re in the former group, hopefully this post will be the concise and impactful introduction you didn’t know you needed.

The code for everything in this post is on [my GitHub repo (<VPIcon icon="iconfont icon-github"/>`arackaf/zustand-sandbox`)](https://github.com/arackaf/zustand-sandbox).

---

## Getting Started

We’ll look at a toy task management app that does minimal work so we can focus on state management. It shows a (static) list of tasks, a button to add a new task, a heading showing the number of tasks, and a component to change the UI view between three options.

Moreover, the same app was written 3 times, once using vanilla React context for state, once using Zustand simply but non-idiomatically, and then a third version using Zustand more properly, so we can see some of the performance benefits it offers.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/img1-app.png?resize=1024%2C665&ssl=1)

Each of the three apps is identical, except for the label above the **Add New Task** button.

Each app is broken down more or less identically as so.

```jsx title="App.jsx"
function App() {
  console.log("Rendering App");

  return (
    <div className="m-5 p-5 flex flex-col gap-2">
      <VanillaLabel />
      <AddNewTask />
      <TasksCount />
      <TasksHeader />
      <Filter />
      <TasksBody />
    </div>
  );
}
```

It’s probably more components than needed, but it’ll help us inspect render performance.

### The state we need

Our state payload for this app will include an array of tasks, a method to update the tasks, the current UI view being displayed, a function to update it, and a current filter, with, of course, a method to update it.

Those values can all be declared as various pieces of state, and then passed down the component tree as needed. This is simple and it works, but the excessive amount of prop passing, often referred to as “prop drilling,” can get annoying pretty quickly. There are many ways to avoid this, from state management libraries like Zustand, Redux, and MobX, to the regular old React context.

In this post, we’ll first explore what this looks like using React context, and then we’ll examine how Zustand can simplify things while improving performance in the process.

---

## The Vanilla Version

There’s a very good argument to be made that React’s context feature was not designed to be a state management library, but that hasn’t stopped many devs from trying. To avoid excessive prop drilling while minimizing external dependencies, developers will often store the state required for a specific part of their UI in context and access it lower in the component tree as needed.

Our app has its entire state stored like this, but that’s just a product of how unrealistically small it is.

Let’s get started. First, we have to declare our context

```tsx
const TasksContext = createContext<TasksState>(null as any);
```

Then we need a *component* that renders a *Provider* for that context, while declaring, and then passing in the actual state

```tsx
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  console.log("Rendering TasksProvider");

  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [currentView, setCurrentView] = useState<TasksView>("list");
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const value: TasksState = {
    tasks,
    setTasks,
    currentView,
    setCurrentView,
    currentFilter,
    setCurrentFilter,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
```

The logging `console.log("Rendering TasksProvider");` is present in every component in all versions of this app, so we can inspect re-renders.

Notice how we have to declare each piece of state with `useState` (or `useReducer`)

```tsx
const [tasks, setTasks] = useState<Task[]>(dummyTasks);
const [currentView, setCurrentView] = useState<TasksView>("list");
const [currentFilter, setCurrentFilter] = useState<string>("");
```

and then splice it together in our big state payload, and then render our context provider

```tsx
const value: TasksState = {
  tasks,
  setTasks,
  currentView,
  setCurrentView,
  currentFilter,
  setCurrentFilter,
};

return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
```

To *get* the current context value in a component that wants to use it, we call the `useContext` hook, and pass in the context object we declared above. To simplify this, it’s not uncommon to build a simple hook for just this purpose.

```tsx
export const useTasksContext = () => {
  return useContext(TasksContext);
};
```

Now components can grab whatever slice of state they need.

```tsx
const { currentView, tasks, currentFilter } = useTasksContext();
```

### What’s the problem?

This code is *fine*. It’s simple enough. And it works. I’ll be honest, though, as someone who works with code like this a lot, the boilerplate can become annoying pretty quickly. We have to declare each piece of state with the normal React primitives (useState, useReducer), and then also integrate it into our context payload (and typings). It’s not the worst thing to deal with; it’s just annoying.

Another downside of this code is that *all* consumers of this context will always rerender anytime *any* part of the context changes, even if that particular component is not using the part of the context that just changed. We can see that with the logging that’s in these components.

For example, changing the current UI view rerenders everything, even though only the task header, and task body read that state

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/img2-context-rerender.png?resize=544%2C510&ssl=1)

---

## Introducing Zustand

Zustand is a minimal but powerful state management library. To create state, Zustand gives you a `create` method

```tsx
import { create } from "zustand";
```

It’s easier to show this than to describe it.

```tsx
export const useTasksStore = create<TasksState>(set => ({
  tasks,
  setTasks: (arg: Task[] | ((tasks: Task[]) => Task[])) => {
    set(state => {
      return {
        tasks: typeof arg === "function" ? arg(state.tasks) : arg,
      };
    });
  },
  currentView: "list",
  setCurrentView: (newView: TasksView) => set({ currentView: newView }),
  currentFilter: "",
  setCurrentFilter: (newFilter: string) => set({ currentFilter: newFilter }),
}));
```

We pass a function to `create` and return our state. Just like that. Simple and humble. The function we pass also takes an argument, which I’ve called `set`. The result of the `create` function, which I’ve named `useTasksStore` here, will be a React hook that you use to *read* your state.

### Updating state

Updating our state couldn’t be simpler. The `set` function we see above is how we do that. Notice our updating functions like this:

```tsx
setCur`rentView: (newView: TasksView) => set({ currentView: newView }),
```

By default `set` will take what we return, and *integrate it* into the state that’s already there. So we can return the pieces that have changed, and Zustand will handle the update.

Naturally, there’s an override: if we pass `true` for the second argument to `set`, then what we return will overwrite the existing state in its entirety.

```tsx
clear: () => set({}, true);
```

The above would wipe our state, and replace it with an empty object; use this cautiously!

### Reading our state

To read our state in the components which need it, we call the hook that was returned from `create`, which would be `useTasksStore` from above. We *could* read our state in the same way we read our context above

This is not the best way to use Zustand. Keep reading for a better way to use this API.

```tsx
const { currentView, tasks, currentFilter } = useTasksStore();
```

This will work and behave exactly like our context example before.

This means changing the current UI view will again re-render all components that read *anything* from the Zustand store, whether related to this piece of state, or not.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/img3-zustand-default-rerender.png?resize=558%2C460&ssl=1)

---

## The Correct Way to Read State

It’s easy to miss in the docs the first time you read them, but when reading from your Zustand store, you shouldn’t do this:

```tsx
const { yourFields } = useTasksStore();
```

Zustand is well optimized, and will cause the component with the call to `useTasksStore` to only re-render when the *result* of the hook call changes. By default, it returns an object with your entire state. And when you change any piece of your state, the surrounding object will have to be recreated by Zustand, and will no longer match.

Instead, you should pass a selector argument into `useTasksStore`, in order to *select* the piece of state you want. The simplest usage would look like this

```tsx
const currentView = useTasksStore(state => state.currentView);
const tasks = useTasksStore(state => state.tasks);
const currentFilter = useTasksStore(state => state.currentFilter);
```

Now our call returns only the `currentView` value in the first line, or our `tasks` array, or `currentFilter` in our second and third lines, respectively.

The value returned for `currentView` will only be different if you’ve *changed* that state value, and so on with `tasks`, and `currentFilter`. That means if *none* of these values have changed, then this component will not rerender, even if *other* values in our Zustand store have changed.

If you don’t like having those multiple calls, you’re free to use Zustand’s `useShallow` helper

```tsx
import { useShallow } from "zustand/react/shallow";

// ...
const { tasks, setTasks } = useTasksStore(
  useShallow(state => ({
    tasks: state.tasks,
    setTasks: state.setTasks,
  }))
);
```

The `useShallow` hook lets us return an object with the state we want, and will trigger a rerender only if a shallow check on the properties in this object change.

If you want to save a few lines of code, you’re also free to return an array with `useShallow`.

```tsx
const [tasks, setTasks] = useTasksStore(useShallow(state => [state.tasks, state.setTasks]));
```

This does the same thing.

The Zustand-optimized version of the app only uses the `useTasksStore` hook with a selector function, which means we can observe our improved re-rendering.

Changing the current UI view will only rerender the components that use the ui view part of the state.

![Console log showing rendering messages for TasksHeader, TasksBody, and TasksDetailed components.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/img4-zustand-optimized.png?resize=558%2C296&ssl=1)

For a trivial app like this, it probably won’t matter, but for a large app at scale, this can be beneficial, especially for users on slower devices.

---

## Odds & Ends

The full [Zustand docs are here (<VPIcon icon="iconfont icon-github"/>`pmndrs/zustand`)](https://github.com/pmndrs/zustand). Zustand has a delightfully small surface area, so I’d urge you to just read the docs if you’re curious.

That being said, there are a few features worth noting here.

### Async friendly

Zustand doesn’t care where or when the `set` function is called. You’re free to have async methods in your store, which call `set` after a fetch.

The docs offer this example:

```tsx
const useFishStore = create(set => ({
  fishies: {},
  fetch: async pond => {
    const response = await fetch(pond);
    set({ fishies: await response.json() });
  },
}));
```

### Reading state inside your store, but outside of `set`

We already know that we can call `set(oldState => newState)`, but what if we need (or just want) to read the *current* state inside one of our actions, unrelated to an update?

It turns out `create` also has a second argument, `get`, that you can use for this very purpose

```tsx
export const useTasksStore = create<TasksState>((set, get) => ({
```

And now you can do something like this

```tsx
logOddTasks: () => {
  const oddTasks = get().tasks.filter((_, index) => index % 2 === 0);
  console.log({ oddTasks: oddTasks });
},
```

The first line grabs a piece of state, completely detached from any updates.

### Reading state outside of React components

Zustand gives you back a React *hook* from `create`. But what if you want to read your state outside of a React component? Zustand attaches a `getState()` method directly onto your hook, which you can call anywhere.

```tsx
useEffect(() => {
  setTimeout(() => {
    console.log("Can't call a hook here");
    const tasks = useTasksStore.getState().tasks;
    console.log({ tasks });
  }, 1000);
}, []);
```

### Pushing further

Zustand also supports manual, fine-grained subscriptions; bindings for vanilla JavaScript, with no React at all; and integrates well with immutable helpers like Immer. It also has some other, more advanced goodies that we won’t try to cover here. Check out the docs if this post has sparked your interest!

---

## Concluding Thoughts

Zustand is a wonderfully simple, frankly fun library to use to manage state management in React. And as an added bonus, it can also improve your render performance.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Zustand (State Management)",
  "desc": "Zustand is a minimal, but fun and effective state management library which just may improve your render performance.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-zustand.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
