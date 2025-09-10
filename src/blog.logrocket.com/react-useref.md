---
lang: en-US
title: "How to use the React useRef Hook effectively"
description: "Article(s) > How to use the React useRef Hook effectively"
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
      content: "Article(s) > How to use the React useRef Hook effectively"
    - property: og:description
      content: "How to use the React useRef Hook effectively"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-useref.html
prev: /programming/js-react/articles/README.md
date: 2025-04-07
isOriginal: false
author:
  - name: Rahul Chhodde
    url : https://blog.logrocket.com/author/rahulchhodde/
cover: /assets/image/blog.logrocket.com/react-useref/banner.png
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
  name="How to use the React useRef Hook effectively"
  desc="Learn how to use React useRef for managing references, avoiding re-renders, and applying best practices in functional components."
  url="https://blog.logrocket.com/react-useref"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-useref/banner.png"/>

Functional components in React utilize built-in Hooks to implement stateful behavior and lifecycle methods. One of these Hooks is `useRef`, which is pretty convenient for referencing values in React.

![React Useref Hooks](/assets/image/blog.logrocket.com/react-useref/banner.png)

In this guide, we will examine the `useRef` Hook in React, learn how to use it, see some of its applications, and discuss best practices to ensure its consistent implementation in future React apps.

---

## What is `useRef` in React?

When working with React, we should always utilize built-in library tools, which are created and optimized for specific scenarios. The `useRef` Hook is one such tool that helps us handle references to mutable values in React. It acts as a container storing a reference to a mutable value while persisting it between component re-renders.

The following flowchart illustrates the persistence of a referenced value with `useRef` without triggering any re-render to the corresponding component:

![Flowchart On Persistence Of Referenced Value ](/assets/image/blog.logrocket.com/react-useref/JBWjbwFw.png)

In technical terms, the container here is called a mutable reference object, and the value it holds is called a reference.

If you are new to React, [**this React Hooks cheat sheet**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) can teach you how to use all the major Hooks in React with practical examples.

---

## React `useRef` syntax

When used, the `useRef` Hook returns a mutable object with a `current` property, which is a reference to the object’s current value.

Let’s understand `useRef` with an example, while also exploring its syntax and observing how it functions without triggering re-renders when its value changes:

```js
import { useRef } from "react";

export default function Counter() {
  const countRef = useRef(0);

  const incrementCount = () => {
    countRef.current += 1;
    console.log(`Current count: ${countRef.current}`);
  };

  return (
    <div>
      <p>Check the console for updates.</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
```

In the above example, the `countRef` variable returns a mutable reference object with zero as its initial reference value. Using the object’s current property, this value is updated whenever the “increment” button is pressed:

<CodePen
  user="c99rahul"
  slug-hash="MYWWdRx"
  title="React useRef Counter example"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

A change in the `countRef.current` property here will not re-render the corresponding `<Counter/>` component, and that’s why we are observing changes in the developer console in this example rather than in the UI.

### TypeScript `useRef` syntax

When using TypeScript, it is important to specify the type of data a `useRef` object will hold. Here’s a quick snippet showing both simple and advanced TypeScript type specifications `useRef`:

```ts
interface UserInfo {
  name: string;
  age?: number;
}

function SomeComponent() {
  const messageRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userRef = useRef<UserInfo>({ name: "John Doe" });
  // ...
}
```

---

## Key differences between `useRef` and `useState`

Like `useRef`, the `useState` Hook also persists values, but there’s a subtle difference between them.  
The major difference between these two Hooks is the basic philosophy of their functioning, which broadly defines their three main distinctions:

- The `useState` Hook always provides the current state value on every render, while the `useRef` Hook is designed to persist values across renders
- A change triggered through `useState` always re-renders the related component, while a change in a `useRef` reference never changes the UI
- With `useState`, we can’t change the state directly. Instead, we use a getter-setter pattern to mutate and manage values. With a `useRef` object, we can directly mutate the value by modifying the current property of the reference object whenever required

We now have a general understanding of how `useRef` differs fundamentally from `useState` and what it can achieve on its own. For a broader overview of this differentiation, you should see [**this `useState` vs. `useRef` guide**](/blog.logrocket.com/usestate-vs-useref.md)

---

## When to use `useRef` in React

To identify the need for `useRef` in your components, determine whether or not a value or reference should persist without dealing with renders.

Let’s look at some general applications of `useRef` in React that can help you decide immediately if your component really needs it.

### Accessing DOM elements with`useRef`

The `useRef` Hook works great for handling imperative actions like DOM manipulations.

Instead of using JavaScript Web API methods, such as `querySelector` or `getElementById`, to select a DOM element in React, we utilize the `useRef` Hook to hold its reference.

This approach keeps the reference to that element intact across re-renders and makes things work smoothly without bypassing the virtual DOM, maintaining your app’s integrity.

Let’s access a DOM element with `useRef` and use this reference to get the name of the HTML tag it is built with:

```jsx
function ElementTellingItsTagName() {
  const elementRef = useRef(null);
  const [tagName, setTagName] = useState("...");

  useEffect(() => {
    setTagName(elementRef.current.tagName);
  }, []);

  return (
    <p ref={elementRef}>
      This element is created using a{" "}
      <{tagName.toLowerCase()}> tag. </p> ); }
```

Note that the empty array passed as a `useEffect` dependency ensures the side-effect runs only once after the component mounts and not on subsequent renders or unmounts:

<CodePen
  user="c99rahul"
  slug-hash="bNGwYVX"
  title="DOM element selection with useRef"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Managing timeouts, event handlers, and observers

Following the same path as storing references to DOM elements, we can also manage timeouts, event handlers, and observers with `useRef`, which serves different purposes.

Here’s a small example keeping reference of a timeout with `useRef`, so that we could clear it at the time of component cleanup. This is important from a memory management perspective:

```jsx
function TimeoutExample() {
  const timeoutRef = useRef(null);
  const [message, setMessage] = useState("Waiting...");

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMessage("Timeout completed!");
    }, 3000);

    // Cleanup when component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return <p>{message}</p>;
}
```

Managing an observer would be slightly different, where you keep references of both the target node and the observer attached to that node:

```jsx
function IntersectionObserverExample() {
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => { /* Do something */ },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div ...>
      <div ref={targetRef}>
        ...
      </div>
    </div>
  );
}
```

We can also utilize `useRef` in managing event handlers that should not be recreated on component re-renders. Here’s a quick example:

```jsx
function ClickTracker() {
  const clickHandlerRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    clickHandlerRef.current = () => {
      setCount((prevCount) => prevCount + 1);
    };

    window.addEventListener("click", clickHandlerRef.current);

    return () => window.removeEventListener("click", clickHandlerRef.current);
  }, []);

  return <p>Clicks: {count}</p>;
}
```

### Storing previous state or props

As discussed, `useRef` allows your React components to persist mutable values between re-renders. Let’s explore this with a simple example, where we persist the previous count value in a counter component with `useRef`:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(null); 

  const updateCount = (amount) => {
    setCount((currentCount) => currentCount + amount);
  };

  useEffect(() => {
    // Set the state value as current reference value
    prevCountRef.current = count; 
  }, [count]);

  return (
    <>
      <p>Current count: {count}</p>
      {prevCountRef.current !== null && (
        <p>Previous count: {prevCountRef.current}</p>
      )}
      <button onClick={() => updateCount(1)}>+1</button>
      <button onClick={() => updateCount(5)}>+5</button>
    </>
  );
}
```

<CodePen
  user="c99rahul"
  slug-hash="ByawZJQ"
  title="Event listeners with useRef"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>


Note that re-renders in the above example are triggered by changes in state and not in the `useRef` reference value. Without state variations, `prevCountRef`‘s value would update, but these updates would no longer reflect in the UI.

---

## When to avoid using `useRef`

We now know the basics of `useRef` and the areas where it should be applied. Let’s also discuss some general scenarios where we should avoid it and consider better-suited alternatives.

### Triggering re-renders

Consider using `useState` over `useRef` in cases where a change in the value must trigger the component to re-render:

```jsx
// ❌ Avoid useRef for values that should trigger UI updates
const countRef = useRef(0);

// ✅ Utilize useState instead for such cases
const [count, setCount] = useState(0);
```

### Storing immutable values

Avoid implementing `useRef` to store values that are not expected to change at all. In such cases, consider using a JavaScript `const` variable outside the render instead. This is shown below:

```jsx
function Component() {
// ❌ Avoid storing an immutable value with useRef
const piRef = useRef(3.14);

// ✅ Use the JavaScript const instead
const pi = 3.14;

return ({ /*...*/ })
}
```

### Managing state/prop-dependents event handlers

When managing event handlers with `useRef`, make sure to examine whether or not your event handler depends on the state or any of the component props.

Let’s say the event handler depends on a prop or state variable. Instead of `useRef`, consider using the `useCallback` Hook for the event handler function to memoize the logic (which updates only when a dependency changes):

```jsx
function Component() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [count]); // Handler depends on `count`

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]); // `handleClick` only changes when `count` changes

  return <p>{count}</p>;
}
```

This approach keeps the event-handling task in sync with the dependencies. It also improves the performance by preventing the recreation of event handler logic on every render.

### Using a declarative approach to manage general events

React’s synthetic event system is capable of handling commonly used events intrinsically, which means you don’t necessarily have to handle those events with `useRef`.

Therefore, consider sticking to declarative event handling to manage events whenever possible. This avoids the unnecessary hassle of managing a reference for the event handler, attaching it to an event listener, and removing the listener at cleanup:

```jsx
function Click() {
  // ❌ Avoid useRef to handle general events
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = () => console.log("Clicked!");
    buttonRef.current?.addEventListener("click", handleClick);

    return () => buttonRef.current?.removeEventListener("click", handleClick);
  }, []);

  return <button ref={buttonRef}>Click</button>;

  // ✅ Use the declarative syntax to manage events
  const handleClick = () => console.log("Clicked!");
  return <button onClick={clickHandler}>Count</button>;
}
```

---

## React `useRef` best practices

When working with the `useRef` Hook, there are some common mistakes developers commit that may cause bugs and cost them time [**debugging apps**](/blog.logrocket.com/master-javascript-debugging-web-apps.md). Let’s look at those mistakes and also learn about corrective measures to fix such problems.

### Use the current property for access and modifications

Always remember to specify the current property when accessing or modifying a value referenced with the `useRef` hook. While it may seem like a small tip at first, it can save you from major headaches caused by hard-to-catch bugs in a huge codebase:

```jsx
function ToastNotification() {
  const toastRef = useRef(null);

  useEffect(() => {
    toastRef.show(); // ❌ Missing the current property
    toastRef.current.show(); // ✅ Always use the current property
  }, []);

  return <div ref={toastRef}>...</div>;
}
```

### Initialize with null or default values

A value or a DOM reference might not exist initially before the first render. In that case, initialize your refs with a null or meaningful default value to avoid potential errors:

```jsx
function ClickLogger() {
  // Set a meaningful default value when initializing
  const countRef = useRef(0);

  // Increment count on click
  const handleClick = () => {
    countRef.current += 1;
    console.log(`Clicked ${countRef.current} times`);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Conditional checks

In cases where a `useRef` reference can be null, always add a conditional check before accessing or modifying it to avoid reference errors.

Note that the returned `useRef` object will never be null. Therefore you should strictly check the reference value for a null value and not the object:

```jsx
function ImageLoader() {
  const imgRef = useRef(null); 

  useEffect(() => {
    const loadImage = async () => {
      const imgSrc = await getImgSrc();

      // Check if a reference value exists
      if (imgRef.current) {
        imgRef.current.src = imgSrc;
      }
    };

    loadImage();
  }, []);

  return <img ref={imgRef} alt="Loading..." />;
}    
```

### Clean up timeouts, event listeners, and observers

Always remember to clear timeouts and disconnect observers during component clean-up to avoid any memory leaks in your apps.

The same applies to event listeners too, even though most event listeners are taken care of during garbage collection by browsers. Whether you are managing an event listener with `useRef` or not, you should detach all the attached event listeners as well when cleaning up a component.

### Keep DOM manipulations simple

Instead of complicating DOM selections and manipulations, use React’s declarative approach to keep things simple to understand and easy to maintain. While doing so, you also save your app from inconsistencies created by direct DOM manipulations in the [**virtual DOM**](/blog.logrocket.com/the-virtual-dom-react.md) updates:

```jsx
function Message() {

  // ❌ Bad Practice: Direct DOM Manipulation
  const divRef = useRef(null);
  useEffect(() => {
    divRef?.current.textContent =
        "Text injected by direct DOM manipulation.";
  }, []);

  // ✅ Good Practice: Using React State to support VDOM
  const [message, setMessage] = useState("...");
  useEffect(() => {
    setMessage("Text from a state variable.");
  }, []);

  return (
    <>
      {/* Bad practice */}
      <p ref={divRef} style={{ color: "red" }}>...</p>

      {/* Good practice */}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </>
  );
}
```

### Club `useRef` with `forwardRef` to pass refs from parent to child

Normally, we use the `useRef` Hook to reference elements within components. If you want to use reference of an element (or a value) from a child component in a parent component, you should pair `useRef` with `forwardRef`, another Hook that forwards the reference to an element in the child to any parent accessing the child:

```jsx
// Forward ref to the input element for parent access
const ChildInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function ParentComponent() {
  // Create a ref for ChildInput
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // ✅ Parent can now access child's input
    }
  };

  return (
    <div>
      {/* Pass the ref to ChildInput for parent access */}
      <ChildInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

If you are interested in learning more about different types of refs, [**this complete guide to React refs**](/blog.logrocket.com/complete-guide-react-refs.md) is a must-see.

With React 19 onwards, instead of using `forwardRef`, pass `ref` as a component prop and use it with the specified element. Read more about this change in the [<VPIcon icon="fa-brands fa-react"/>React documentation](https://react.dev/reference/react/forwardRef).

---

## Practical use cases of `useRef`

Let’s touch on some patterns in React that utilize `useRef` to incorporate different features, while also using other React hooks like `useState`, `useEffect`, and more.

I’m decorating some of these examples with Tailwind CSS, which is completely optional. The rest of the process remains focused on utilizing `useRef` along with other React features to foster common use cases.

### Form handling

Let’s manage a form to generate a purchase receipt with `useRef`.

The form contains multiple inputs whose reference is managed with individual `useRef` objects that collectively help us grab the form data in a state variable. We can put all these reference objects in one parent object for better organization, as shown below:

```jsx :collapsed-lines
function ReceiptGenerator() {
  // Create refs for receipt form fields
  const formRefs = {
    customerName: useRef(null),
    itemName: useRef(null),
    quantity: useRef(null),
    price: useRef(null),
  };

  // State to store receipt data
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total
    const quantity = parseFloat(formRefs.quantity.current.value);
    const price = parseFloat(formRefs.price.current.value);
    const total = quantity * price;

    const data = {
      quantity,
      price,
      total,
    };

    // Update state with receipt data
    setReceipt(data);

    // Reset the form
    e.target.reset();

    // Focus back on the first field
    formRefs.customerName.current.focus();
  };

  return (
    <div className="...">
      { 
        /* Structure the form and render 
         * receipt based on the data received
         * on form submission.
         */
      }
    </div>
  );
}
```

In the above code, we are defining an event handler for the form submission, getting the form data using the input field references held with `useRef`, storing it in the `receipt` state variable, and then using this data to generate a purchase receipt. Here’s a working example of the same:

<CodePen
  user="c99rahul"
  slug-hash="pvodJGb"
  title="Receipt Generator"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Managing animations

It’s not complicated to apply dynamic animations to an element using `useRef`. You may use `requestAnimationFrames` to do so, or use a JavaScript animation library such as GSAP, [**Motion**](/blog.logrocket.com/creating-react-animations-with-motion.md), or AnimeJS.

The [<VPIcon icon="iconfont icon-github"/>`greensock/GSAP`](https://github.com/greensock/GSAP) library is pretty common these days, so let’s quickly create an animated card component with it and `useRef`:

```js :collapsed-lines
import gsap from "gsap";

const AnimatedCard = () => {
  const cardRef = useRef(null);
  const animationRef = useRef(null);

  const animateCard = () => {
    // Kill previous animation if exists
    if (animationRef.current) animationRef.current.kill(); 

    animationRef.current = gsap.fromTo(
      cardRef.current,
      { scale: 0.8, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "power2.out" }
    );
  };

  useEffect(() => {
    animateCard(); // Run animation on mount
  }, []);

  return (
    <div style={ /* CSS Styles */ }>
      <div ref={cardRef} style={ /* CSS Styles */ }>Animated Card</div>
    </div>
  );
}
```

After styling the card with Tailwind CSS and adding some more content to it, here’s what the final outcome looks like:

<CodePen
  user="c99rahul"
  slug-hash="WbNZdXa"
  title="Animated GSAP card x TWCSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>


The card animation plays automatically upon entering the page. Try this demo in a separate tab or use the “Animate again” button to replay the animation.

### Preserving a previous state

Let’s say you have a component that allows the user to set a nickname for their account. This component also shows their previous nickname without making a trip to the network to access a value from the database.

We can accomplish this using two state variables. However, we can do the same with just one state variable and maintain the previous state value using the `useRef` Hook.

I’m following nearly the same pattern as we followed when learning to store a previous state value with `useRef`. Here’s how it turned out:

<CodePen
  user="c99rahul"
  slug-hash="OPJmLNN"
  title="Saving last value with useRef and useState (Simplified)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Detecting clicks outside an element

Using the DOM reference provided by `useRef`, we can easily check if it contains the clicked target. Here’s what the implementation would look like:

```jsx :collapsed-lines
function TrackClicks() {
  const [message, setMessage] = useState("Click somewhere!");
  const drawerRef = useRef(null);

  function handleClick(event) {
    if (drawerRef.current && drawerRef.current.contains(event.target)) {
      setMessage("Clicked inside!");
    } else {
      setMessage("Clicked outside!");
    }
  }

  return (
    <div className="..." onClick={handleClick}>
      <div ref={drawerRef} className="...">{message}</div>
    </div>
  );
}
```

You can see a [working example of the above code here (<VPIcon icon="fa-brands fa-codepen"/>`c99rahul`)](https://codepen.io/c99rahul/pen/yyLbBrR).

<CodePen
  user="c99rahul"
  slug-hash="yyLbBrR"
  title="Detecting clicks w/ useRef"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Expanding on this baseline, we can put together a drawer component that shows up on a button click and disappears when clicked outside of itself:

<CodePen
  user="c99rahul"
  slug-hash="YPzpWGv"
  title="Drawer with useRef"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Input autofocus

Suppose your app demands automatic focusing on an input field after a certain event, such as immediately after the app finishes loading in the browser window, a button click, etc. In such a case, we can easily hook that input field with a `useRef` Hook and set focus to it using a side-effect:

```jsx
export default function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} type="text" placeholder="Type here..." />;
}
```

Let’s use this approach in the above-implemented `Drawer` component and focus the search box in the drawer as soon as the drawer is clicked open:

<CodePen
  user="c99rahul"
  slug-hash="PwYrwzm"
  title="useRef Input Focus"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you notice this example closely, I’m forwarding a `ref` from a child component (`InputBox`) to a parent component (`Drawer`), following one of the best practices we discussed previously.

---

## Conclusion

To wrap up, we learned about the `useRef` Hook in React, discussed its implementation, applications, and some do’s and don’ts. You may find all the examples discussed in this post with some bonus demos in [this CodePen collection (<VPIcon icon="fa-brands fa-codepen"/>`BayjWJ`)](https://codepen.io/collection/BayjWJ).

Try implementing the `useRef` Hook in your apps if you haven’t already. Share your questions or suggestions in the comments. I’ll be happy to learn your thoughts and help you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use the React useRef Hook effectively",
  "desc": "Learn how to use React useRef for managing references, avoiding re-renders, and applying best practices in functional components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-useref.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
