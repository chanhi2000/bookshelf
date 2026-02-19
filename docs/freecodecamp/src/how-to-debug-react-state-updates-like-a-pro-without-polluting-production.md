---
lang: en-US
title: "How to Debug React State Updates Like a Pro (Without Polluting Production)"
description: "Article(s) > How to Debug React State Updates Like a Pro (Without Polluting Production)"
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
      content: "Article(s) > How to Debug React State Updates Like a Pro (Without Polluting Production)"
    - property: og:description
      content: "How to Debug React State Updates Like a Pro (Without Polluting Production)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-react-state-updates-like-a-pro-without-polluting-production.html
prev: /programming/js-react/articles/README.md
date: 2026-02-03
isOriginal: false
author:
  - name: Kelechi Apugo
    url: https://freecodecamp.org/news/author/Laviedegeorge/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770067225475/d0910306-5756-465a-8b6f-adf839fe004a.png
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
  name="How to Debug React State Updates Like a Pro (Without Polluting Production)"
  desc="When you’re debugging a large React codebase, you might start to feel like a detective. Especially when you are looking for unexpected state changes, components that re-render when they like, or Context values that disappear into thin air without any..."
  url="https://freecodecamp.org/news/how-to-debug-react-state-updates-like-a-pro-without-polluting-production"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770067225475/d0910306-5756-465a-8b6f-adf839fe004a.png"/>

When you’re debugging a large React codebase, you might start to feel like a detective. Especially when you are looking for unexpected state changes, components that re-render when they like, or Context values that disappear into thin air without any prior warning sign.

And the main difficulty isn’t necessarily what went wrong – it’s pinpointing where it went wrong.

React offers powerful ways to change state, but it doesn’t specify who or what caused those changes. In large apps with many layers of components, hooks, and contexts, this lack of insight can turn simple bugs into frustrating, time-consuming puzzles.

This is where more innovative debugging methods become crucial. Before now, the go-to solution was to sprinkle `console.log` calls at key points or to fall back to DevTools.

But these days, you can write a small but powerful utility function that can catch the criminal involved in the crimes against your codebase. This utility function can log changes, display meaningful stack traces, and work smoothly with `useState`, `useReducer`, Context providers, and custom hooks. And all of the above can occur while remaining invisible in production.

This article guides you through how to use this helper function to improve clarity, minimise guesswork, and debug efficiently without affecting performance or code cleanliness in your live environment.

---

## The Problem

React’s state system is powerful, but it hides too much information when something goes wrong – for example, when an unexpected update happens or a component re-renders endlessly. React doesn’t tell you *what* triggered the update, *what* changed, or *why* it happened. This lack of visibility creates several challenges.

The first is that you can’t easily see which component, function, or effect initiated a state update. In large applications, where the same state may be modified from multiple places, this quickly turns debugging into guesswork. Without clear traces, developers often sprinkle `console.log` throughout their code to find the source of a single update.

Secondly, React lacks a built-in method for directly comparing previous and current values. This complicates diagnosing whether a bug stems from an incorrect calculation, a faulty API response, or erroneous business logic. The challenge increases with nested objects, arrays, or shared context.

Thirdly, Context updates can trigger re-renders across the entire tree, even for components wrapped in memoisation. But React doesn’t explain *why* a particular provider changed, leaving teams to wonder what triggered the cascade.

Finally, infinite loops caused by effects, unstable dependencies, or repeated setState calls provide no clues in the console. You only see symptoms like “loading…” repeating endlessly, with no indication of the source.

All of this makes debugging complex React apps frustrating, slow, and often misleading without additional tools or structured techniques.

---

## Why This Problem Exists

React intentionally conceals its internal update process to keep the framework fast and predictable.

Because of this:

- `setState()` doesn’t report where it was called from
- Context re-renders can originate from anywhere.
- State overrides can happen silently.
- Debugging often relies on manually adding console logs.

In large applications, this lack of visibility makes it nearly impossible to trace unexpected state changes.

---

## My Solution: `createDebugSetter`

A small helper function, `createDebugSetter`, wraps your state setter and logs:

- The label of the state
- The new value
- A complete stack trace showing exactly where the update originated

And best of all, it automatically disables itself in production using `NODE_ENV` so there’s no impact on your live app.

### `createDebugSetter`

```ts
export function createDebugSetter(
  label: string,
  setter:
    | React.Dispatch<React.SetStateAction<unknown>>
    | React.Dispatch<unknown>
): React.Dispatch<React.SetStateAction<unknown>> | React.Dispatch<unknown> {
  // In production, return the original setter unchanged
  if (import.meta.env.PROD /* vite-react */) {
    return setter;
  }

  // Create a wrapper that logs before calling the original setter
  return (value: React.SetStateAction<unknown> | unknown) => {
    // Log the state change
    console.groupCollapsed(
      `%c🔄 [${label}] State Update`,
      "color: #adad01; font-weight: bold;"
    );
    console.log("🆕 New value:", value);
    console.trace("📍 Update triggered from:");
    console.groupEnd();

    // Call the original setter
    setter(value);
  };
}
```

The function above is a **debugging wrapper for React state setters** that logs during development.

It takes two parameters: a label for identification and the `setState` function you want to debug. In development mode, every state update triggers a collapsible console log that shows the new value and the stack trace of the update's origin. In production, the hook skips entirely and returns the original setter unchanged, ensuring zero runtime overhead in deployed applications.

How it does it:

```ts
  // In production, return the original setter unchanged
  if (import.meta.env.PROD /* vite-react */) {
    return setter;
  }
```

In production, the `createDebugSetter` function returns the React `setState` as-is. This is because we don’t want to log anything when our code is running in a production environment. Here, we’re using the `import.meta.env.PROD` from React-vite. It returns a `Boolean` value that tells us if it’s in the production environment or not.

If it’s not in production, we return the modified setter below.

```ts
  // Create a wrapper that logs before calling the original setter
  return (value: React.SetStateAction<unknown> | unknown) => {
    // Log the state change
    console.groupCollapsed(
      `%c🔄 [${label}] State Update`,
      "color: #adad01; font-weight: bold;"
    );
    console.log("🆕 New value:", value);
    console.trace("📍 Update triggered from:");
    console.groupEnd();

    // Call the original setter
    setter(value);
  };
```

This new setter function first logs a collapsible console group with the label and emoji. Then it shows the new value being set. After that, it displays a stack trace showing where the update was triggered. Lastly, it calls the original setter to actually update the state.

### Practical Examples of createDebugSetter

Let’s now see how `createDebugSetter` can be used in several places within a codebase.

#### Context Providers

You can use `createDebugSetter` within a Context provider to log state changes when `setState` is called. This can help log and trace state changes whenever `setState` is called in a Context Provider anywhere in the application.

```tsx :collapsed-lines
import { createContext, useContext, useState, type ReactNode } from "react";
import { createDebugSetter } from "../utils/createDebugSetter";

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserOriginal] = useState<User | null>(null);

  // Wrap setter with debug functionality
  const setUser = createDebugSetter(
    "UserContext",
    setUserOriginal
  ) as React.Dispatch<React.SetStateAction<User | null>>;

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      role: "user",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
```

In the above code sample, we create a modified `setUserOriginal` called `setUser` that uses `createDebugSetter` under the hood. We then expose it to the context value instead of `setUserOriginal` .

Whenever `setUser` is called, it triggers `createDebugSetter` which does its job of checking the environment the code is running in, and returns a modified setter that will call `setUserOriginal` after the logging process, or will return `setUserOriginal` as-is.

This is useful because Context updates can trigger many re-renders. This reveals exactly who changed the shared state.

#### `useState`

As you saw in the Context provider example above, we can use the same technique in regular components that use React state setters (just as in Context providers). We log and trace the value. It also shows where it was triggered from within the component or application.

```tsx :collapsed-lines
import { useState } from "react";
import { useDebugSetter } from "../hooks/useDebugSetter";

export function UseStateExample() {
  const [count, setCountOriginal] = useState(0);
  const [name, setNameOriginal] = useState("React");

  // Wrap setters with debug functionality
  const setCount = useDebugSetter("Counter", setCountOriginal);
  const setName = useDebugSetter("Name", setNameOriginal);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleNameChange = () => {
    setName(name === "React" ? "Vite" : "React");
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>useState Example</h2>
      <p>Open the console to see debug logs when state changes.</p>

      <div style={{ marginTop: "15px" }}>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button onClick={handleIncrement} style={{ marginRight: "10px" }}>
          Increment
        </button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <button onClick={handleNameChange}>Toggle Name</button>
      </div>
    </div>
  );
}
```

This works exactly like the Context providers example. The only differences are that the component uses the `setCount` and `setName` functions out of the box in buttons and related components. Also, unlike the Context provider, this component has local state that can be passed to its child components if needed.

This is ideal for monitoring unforeseen local state changes or loops triggered by effects.

#### useReducer

React reducers are used to calculate complex logic before updating the state. This can introduce unwanted side effects during the complex phase. `createDebugSetter` can help in debugging, as shown below:

```tsx :collapsed-lines
import { useReducer } from "react";
import { createDebugSetter } from "../utils/createDebugSetter";

interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; step: number };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.step };
    default:
      return state;
  }
}

export function UseReducerExample() {
  const [state, dispatchOriginal] = useReducer(counterReducer, {
    count: 0,
    step: 1,
  });

  // Wrap dispatch with debug functionality
  const dispatch = createDebugSetter("CounterReducer", dispatchOriginal);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>useReducer Example</h2>
      <p>Open the console to see debug logs for reducer actions.</p>

      <div style={{ marginTop: "15px" }}>
        <p>
          Count: <strong>{state.count}</strong>
        </p>
        <p>
          Step: <strong>{state.step}</strong>
        </p>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => dispatch({ type: "increment" })}
            style={{ marginRight: "10px" }}
          >
            Increment (+{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "decrement" })}
            style={{ marginRight: "10px" }}
          >
            Decrement (-{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "reset" })}
            style={{ marginRight: "10px" }}
          >
            Reset
          </button>
          <button
            onClick={() =>
              dispatch({ type: "setStep", step: state.step === 1 ? 5 : 1 })
            }
          >
            Toggle Step ({state.step === 1 ? "1→5" : "5→1"})
          </button>
        </div>
      </div>
    </div>
  );
}
```

`dispatchOriginal`, which is the main dispatch function, is replaced with a custom function called `dispatch` that uses `createDebugSetter`. When the custom `dispatch` function is called, it does the job of `createDebugSetter` and by extension, the job of `dispatchOriginal` .

This is perfect for logging reducer actions and understanding complex state transitions.

#### Custom Hooks

Custom hooks are not left out of the equation, as they can use `setState` in some cases. They’re also capable of running complex logic that could backfire when updating `state`.

```tsx :collapsed-lines
import { useState, useEffect } from "react";
import { useDebugSetter } from "../hooks/useDebugSetter";

// Custom hook that manages a timer
function useTimer(initialSeconds: number = 0) {
  const [seconds, setSecondsOriginal] = useState(initialSeconds);
  const [isRunning, setIsRunningOriginal] = useState(false);

  // Wrap setters with debug functionality
  const setSeconds = useDebugSetter("Timer.seconds", setSecondsOriginal);
  const setIsRunning = useDebugSetter("Timer.isRunning", setIsRunningOriginal);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setSeconds]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  };
}

export function CustomHookExample() {
  const timer = useTimer(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>Custom Hook Example</h2>
      <p>Open the console to see debug logs for internal hook state changes.</p>

      <div style={{ marginTop: "15px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatTime(timer.seconds)}
        </p>
        <p>
          Status: <strong>{timer.isRunning ? "Running" : "Stopped"}</strong>
        </p>

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={timer.start}
            disabled={timer.isRunning}
            style={{ marginRight: "10px" }}
          >
            Start
          </button>
          <button
            onClick={timer.stop}
            disabled={!timer.isRunning}
            style={{ marginRight: "10px" }}
          >
            Stop
          </button>
          <button onClick={timer.reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
```

As shown in previous examples, `setSecondsOriginal` and `setIsRunningOriginal` are replaced with `setSeconds` and `setIsRunning`. The latter uses the `createDebugSetter` helper function. This enables console log statements to be printed every second for better visualisation.

Custom hooks often hide multiple internal updates, making it hard to see exactly where each begins.

---

## Best Practices for Using `createDebugSetter`

When using helper functions like `createDebugSetter`, it’s best to keep in mind why you’re actually using them. For our purpose here, we’re using it to debug a React application. So I’ll share some tips that will help with this debugging process.

### Use Clear Labels

Using labels that can say where `createDebugSetter` was triggered from is a step in the right direction. Detailed labels will help you better understand where and why the issue may be occurring. Also, keep in mind that the `createDebugSetter` utility function could be used in several places in your application, and improper labelling could make debugging difficult.

Using the name of the component or area that calls it as the label for `createDebugSetter` can also be a good pointer for clear labelling, as shown below.

```ts
// Bad
createDebugSetter("aaa", setUser)
createDebugSetter("1", setUser)

// Good 
createDebugSetter("UserContextProvider", setUser)
createDebugSetter("From UserContextProvider", setUser)
// Too long but can still work
createDebugSetter("From UserContextProvider in user-context.tsx file", setUser)
```

### Use `createDebugSetter` Only in Dev Mode

Using `createDebugSetter` only in a development environment can prevent many headaches. It’s not a good practice to mistakenly expose or log sensitive data in production. Also, logging in production can cause cluttering.

### Use `createDebugSetter` with React DevTools

**The** `createDebugSetter` may not be enough for some complex bugs. You can use `createDebugSetter` and React DevTools for a more powerful/thorough debugging session**.** Although `createDebugSetter` cannot be directly integrated with React DevTools, it shows who triggered the update, whereas React DevTools displays what was re-rendered.

### Place `createDebugSetter` in `utils`

`createDebugSetter` is a utility function, as I have mentioned above. This means you should place it in a `utils` folder so any team member can access and use it when needed across your React application.

---

## Things to Avoid

1. Avoid using debug setters in production builds. While they are safe, unnecessary logs can slow down debugging tools. Also, sensitive credentials could be logged mistakenly. There are professional tools you can use, such as Sentry, that let you trace errors and debug your app effortlessly.
2. Don’t conditionally wrap setter functions within components. Perform wrapping outside renders to prevent the creation of new setter identities.
3. Don’t rely on it to replace proper state architecture. This tool helps identify issues, but doesn’t fix poor state design.
4. Don’t depend solely on console logs. Use it as part of a broader debugging workflow, not as the only strategy.

---

## Bonus: How to Convert `createDebugSetter` to a Hook

### Converting to a Hook

The plain `createDebugSetter` function works, but it creates a new wrapper function on every render when used inside React components. By converting it into a custom hook with `useCallback`, we can ensure that the wrapper function maintains a stable reference across re-renders, preventing unnecessary performance overhead and making it safe to use in dependency arrays.

Here’s the hook version:

```tsx
import { useCallback } from "react";

export function useDebugSetter<T>(
  label: string,
  setState: React.Dispatch<React.SetStateAction<T>>
): React.Dispatch<React.SetStateAction<T>> {
  const debugSetter = useCallback(
    (newValue: React.SetStateAction<T>) => {
      // Only log in development
      if (!import.meta.env.PROD) {
        console.groupCollapsed(
          `%c🔄 State Update: ${label}`,
          "color: #2fa; font-weight: bold;"
        );
        console.log("🆕 New value:", newValue);
        console.trace("📍 Update triggered from:");
        console.groupEnd();
      }

      setState(newValue);
    },
    [label, setState]
  );

  // In production, return the original setter (no wrapping overhead)
  // In development, return the debug wrapper
  return import.meta.env.PROD ? setState : debugSetter;
}
```

### How the Hook Version Works

The core difference between the `useDebugSetter` hook and `createDebugSetter` is that the function is wrapped in a `useCallback` that logs debug information before calling the original setter. Apart from this, all other components of the functions remain the same.

### Why the Hook Version is Better

The hook version is superior for component usage because it leverages `useCallback` memoisation of the debug wrapper. This means the function reference stays the same across renders, avoiding potential re-render cascades when the setter is passed to child components or used in `useEffect` dependencies.

The plain function, by contrast, generates a brand new wrapper on every render, which can break React's optimisation strategies and cause subtle bugs. In production, both versions simply return the original setter, so there's no performance difference there – but in development, the hook prevents unnecessary work.

### When to Use the Hook

Use `useDebugSetter` whenever you're inside a React component and need to debug state updates. This covers the vast majority of cases: wrapping `useState` setters, passing debug setters to child components, or including them in effect dependencies.

Only reach for the plain `createDebugSetter` function when you're working outside React components entirely, such as in utility modules, global stores, or configuration files where hooks can't be used. For day-to-day component debugging, the hook is the right choice.

---

## Conclusion

Debugging React state doesn’t have to be guesswork. With a simple helper, you can instantly see what changed, who changed it, where the change originated, and how your app reached that state – all without touching your production environment.

This small utility function can save hours spent searching through your codebase, making you faster, more precise, and more confident in your React application’s behaviour.

Once you adopt this approach, you’ll never debug state the old way again. 🚀

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Debug React State Updates Like a Pro (Without Polluting Production)",
  "desc": "When you’re debugging a large React codebase, you might start to feel like a detective. Especially when you are looking for unexpected state changes, components that re-render when they like, or Context values that disappear into thin air without any...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-react-state-updates-like-a-pro-without-polluting-production.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
