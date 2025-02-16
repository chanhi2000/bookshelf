---
lang: en-US
title: "React useLayoutEffect vs. useEffect Hooks with examples"
description: "Article(s) > React useLayoutEffect vs. useEffect Hooks with examples"
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
      content: "Article(s) > React useLayoutEffect vs. useEffect Hooks with examples"
    - property: og:description
      content: "React useLayoutEffect vs. useEffect Hooks with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples.html
prev: /programming/js-react/articles/README.md
date: 2023-07-12
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/banner.png
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
  name="React useLayoutEffect vs. useEffect Hooks with examples"
  desc="This guide to the useEffect and useLayoutEffect Hooks explores how each handles heavy computations and visual changes."
  url="https://blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/banner.png"/>

::: note Editor’s note

This post was last updated on 12 July 2023 to further elaborate on the differences in when and how the `useEffect` and `useLayoutEffect` Hooks are fired.

:::

![React UseLayoutEffect Vs. UseEffect Hooks With Examples](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/banner.png)

Assuming you understand the difference between `useEffect` and `useLayoutEffect`, would you be able to explain them in simple terms? Or can you describe their nuances with practical examples?

In this tutorial, we’ll explore the differences between React’s `useEffect` and `useLayoutEffect` Hooks, such as how they handle heavy computations and inconsistent visual changes, with code examples that will reinforce your understanding of the concepts.

---

## What is the `useEffect` Hook?

The `useEffect` Hook is a powerful tool in React that helps developers manage side effects in functional components. It runs asynchronously after the browser repaints the screen.

This hook is commonly used for handling side effects such as fetching data, working with subscriptions, or interacting with the DOM. Essentially, `useEffect` lets you control what happens in your component based on different situations, making your code more flexible and efficient.

---

## What is the `useLayoutEffect` Hook?

The `useLayoutEffect` Hook is a variation of the `useEffect` Hook that runs synchronously before the browser repaints the screen. It was designed to handle side effects that require immediate DOM layout updates.

`useLayoutEffect` ensures that any changes made within the hook are applied synchronously before the browser repaints the screen. While this might not seem ideal, it is highly encouraged in specific use cases, such as when measuring DOM elements, or animating or transitioning elements.

For example, a DOM mutation that must be visible to the user should be fired synchronously before the next paint, preventing the user from receiving a visual inconsistency. We’ll see an example of this later in the article.

---

## What’s the difference between `useEffect` and `useLayoutEffect`?

Sprinkled all over the two previous sections are pointers to the differences between `useEffect` and `useLayoutEffect`. Perhaps the most prominent of these is that the `useLayoutEffect` Hook is a variation of the `useEffect` Hook that runs synchronously before the browser repaints the screen.

Because the `useLayoutEffect` is a variation of the `useEffect` Hook, the signatures for both are exactly the same:

```js
useEffect(() => {
  // do something
}, [dependencies])

useLayoutEffect(() => {
  // do something
}, [dependencies])
```

If you were to go through a codebase and replace every `useEffect` call with `useLayoutEffect`, it would work in most cases. For example, I’ve taken an example from the [<FontIcon icon="fas fa-globe"/>React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/examples/fetching-data) that fetches data from a remote server and changes the implementation to use `useLayoutEffect` over `useEffect`:

![React Hooks Cheatsheet Example](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/react-hooks-cheatsheet-example.gif)

In our example, the code will still work. Now, we’ve established an important fact: `useEffect` and `useLayoutEffect` have the same signature. This trait makes it [**easy to assume that these two Hooks**](/blog.logrocket.com/understanding-common-frustrations-react-hooks.md) behave in the same way.

However, the second part of the aforementioned quote above feels a little fuzzier to most people. It states that `useLayoutEffect` runs synchronously before the browser repaints the screen. Essentially, the differences between `useEffect` and `useLayoutEffect` lie in when the two are fired and how they run.

Let’s consider the following contrived counter application:

```js title="Counter.jsx"
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // perform side effect
    sendCountToServer(count)
  }, [count])

  return (
    <div>
      <h1> {`The current count is ${count}`} </h1>
      <button onClick={() => setCount(count => count + 1)}>
        Update Count
      </button>
    </div>
  );
}
// 
// render Counter
<Counter />
```

When the component is mounted, the following code is painted to the user’s browser:

![Simple Counter Example](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/simple-counter-example.gif)

With every click of the button, the counter state is updated, the [**DOM mutation is printed to the screen**](https://blog.logrocket.com/8-dom-features-you-didnt-know-existed-ec2a0a28fd89/), and the effect function is triggered. Here’s what’s really happening:
<!-- TODO: /blog.logrocket.com/8-dom-features-you-didnt-know-existed.md -->

1. The user performs an action, i.e., clicking the button
2. React updates the `count state` variable internally
3. React handles the DOM mutation
4. The browser then paints this DOM change to the browser’s screen
5. The `useEffect` function is fired only after the browser has painted the DOM change(s)

With the click comes a state update, which in turn triggers a DOM mutation. The text contents of the `h1` element have to be changed from the previous `count` value to the new value.

Steps 1, 2, and 3 do not show any visual changes to the user. The user will only see a change after the browser has painted the changes or mutations to the DOM. React hands over the details about the DOM mutation to the browser engine, which figures out the entire process of painting the change to the screen.

The function passed to `useEffect` will be fired only after the DOM changes are painted on the screen. The [<FontIcon icon="fa-brands fa-react"/>official docs](https://react.dev/reference/react/useEffect) put it this way:

::: info <FontIcon icon="fa-brands fa-react"/>react.dev

> “Even if your Effect was caused by an interaction (like a click), the browser may repaint the screen before processing the state updates inside your Effect.”

:::

Another important thing to remember is that the `useEffect` function is fired asynchronously to not block the browser paint process.

::: note N.B.

Although `useEffect` is deferred until after the browser has painted, it’s guaranteed to fire before any new renders. React will always flush a previous render’s effects before starting a new update.

:::

Now, how does this differ from the `useLayoutEffect` Hook? Unlike `useEffect`, the function passed to the `useLayoutEffect` Hook is fired synchronously after all DOM mutations.

If you replaced the `useEffect` Hook with `useLayoutEffect`, the following would happen:

1. The user performs an action, i.e., clicking the button
2. React updates the `count state` variable internally
3. React handles the DOM mutation
4. The `useLayoutEffect` function is fired
5. The browser waits for `useLayoutEffect` to finish, and only then does it paint this DOM change to the browser’s screen

The `useLayoutEffect` Hook doesn’t wait for the browser to paint the DOM changes. It triggers the function right after the DOM mutations are computed. Also, keep in mind that updates scheduled inside `useLayoutEffect` will be flushed synchronously and will block the browser paint process.

---

## Examples to differentiate `useEffect` and `useLayoutEffect`

The main differences between `useEffect` and `useLayoutEffect` lie in when they are fired and how they run, but regardless, it’s hard to tangibly quantify this difference without looking at concrete examples. In this section, I’ll highlight three examples that amplify the significance of the differences between `useEffect` and `useLayoutEffect`.

### Time of execution

Modern browsers are very fast. We’ll employ some creativity to see how the time of execution differs between `useEffect` and `useLayoutEffect`. In the [<FontIcon icon="iconfont icon-codesandbox"/>first example](https://codesandbox.io/s/useeffect-uselayouteffect-time-of-execution-gtrvg?fontsize=14), we’ll consider a counter similar to the one we looked at earlier:

::: sandpack#react ohansemmanuel / useEffect-useLayoutEffect-time-of-execution [rtl theme=dark]

@file /App.js

```js
import React, { useState, useEffect, useLayoutEffect } from "react";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("USE EFFECT FUNCTION TRIGGERED");
  });

  // change the hook below to `useLayoutEffect` to see a different log order.
  useEffect(() => {
    console.log("USE LAYOUT EFFECT FUNCTION TRIGGERED");
  });

  return (
    <div className="App">
      <h1>{count}</h1>
      <h2>
        <button onClick={() => setCount(count => count + 1)}>
          Update Count
        </button>
      </h2>
    </div>
  );
}

export default App;
```

@file /styles.css

```css
body {
  background: #2980b9;
  color: #fff;
}

h1 {
  font-size: 10rem;
}
```

:::

![React Hooks Counter Example UI](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/react-hooks-counter-example-ui.png)

In this counter, we have the addition of two `useEffect` calls:

```js
useEffect(() => {
  console.log("USE EFFECT FUNCTION TRIGGERED");
});
useEffect(() => {
  console.log("USE SECOND EFFECT FUNCTION TRIGGERED");
});
```

Note that the effects log different texts depending on which is triggered, and as expected, the first effect function is triggered before the second:

![Counter Example First Function Triggered](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/counter-example-first-function-triggered.png)

When there is more than one `useEffect` call within a component, the order of the effect calls is maintained. The first is triggered, then the second, and the sequence continues. Now, what happens if the second `useEffect` Hook is replaced with a `useLayoutEffect` Hook? Let’s take a look:

```js
useEffect(() => {
    console.log("USE EFFECT FUNCTION TRIGGERED");
});
useLayoutEffect(() => {
    console.log("USE LAYOUT EFFECT FUNCTION TRIGGERED");
});
```

Even though the `useLayoutEffect` Hook is placed after the `useEffect` Hook, the `useLayoutEffect` Hook is triggered first! This is what it looks like:

![`useEffect` And `useLayoutEffect` Sequencing Example](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/useeffect-uselayouteffect-sequencing-example.png)

The `useLayoutEffect` function is triggered synchronously before the DOM mutations are painted. However, the `useEffect` function is called after the DOM mutations are painted.

In the next example, we’ll look at plotting graphs with respect to the time of execution for both the `useEffect` and `useLayoutEffect` Hooks. The example app has a button that toggles the visual state of a title, whether shaking or not. Here’s the app in action:

![`useEffect` And `useLayoutEffect` Title Shaking](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/useeffect-uselayouteffect-title-shaking.webp)

I chose this example to make sure the browser actually has some changes to paint when the button is clicked, hence the animation. The visual state of the title is toggled within a `useEffect` function call. If it interests you, you can [<FontIcon icon="iconfont icon-codesandbox"/>view the implementation](https://codesandbox.io/s/useeffect-uselayouteffect-time-of-execution-2-kqnqp?fontsize=14).

::: sandpack#react ohansemmanuel / useEffect-useLayoutEffect-time-of-execution-2 [rtl theme=dark]

@file /App.js

```js
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import "./styles.css";

function App() {
  const [isShaking, setShaking] = useState(false);
  let prevTime = useRef(0);

  useLayoutEffect(() => {
    console.log(
      "Time of click - time of effect call: ",
      performance.now() - prevTime.current
    );
    const title = document.querySelector(".title");
    if (isShaking) {
      title.classList.add("shake");
    } else {
      title.classList.remove("shake");
    }
  }, [isShaking]);

  const handleShake = () => {
    prevTime.current = performance.now();
    setShaking(prevShake => !prevShake);
  };

  return (
    <div className="App">
      <h1 className="title">Hello World</h1>
      <p>isShaking --: {isShaking ? "Yay! 😎" : "Nil 😌"}</p>
      <button className="toggler" onClick={handleShake}>
        Toggle Shake
      </button>
    </div>
  );
}

export default App;
```

@file /styles.css

```css
html,
body {
  padding: 0;
  margin: 0;
}

.App {
  font-family: sans-serif;
  text-align: center;
  background: #8cacea;
  min-height: 100vh;
}

.toggler {
  position: absolute;
  left: 40%;
  bottom: 10px;
  cursor: pointer;
  padding: 1rem 2rem;
}

.title {
  border: 1px solid red;
  margin: 20px 0;
  padding: 20px 0;
}

@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-name: shake;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}
```

:::

I gathered significant data by toggling the visual state every second, meaning I clicked the button using both the `useEffect` and `useLayoutEffect` Hooks. Then, using `performance.now`, I measured the difference between when the button was clicked and when the effect function was triggered for both `useEffect` and `useLayoutEffect`. I gathered the following data:

![Data Collection Time Evaluation](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/data-collection-time-evaluation.png)

From this data, I created a chart to visually represent the time of execution for `useEffect` and `useLayoutEffect`:

![Time Of Evaluation Graph](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/time-evaluation-graph.png)

Essentially, the graph above represents the time difference between when the `useEffect` and `useLayoutEffect` functions are triggered, which in some cases is of a magnitude greater than 10x. See how much later `useEffect` is fired when compared to `useLayoutEffect`?

You’ll see how this time difference plays a huge role in use cases like animating the DOM, which I will explain below.

### Performance

Expensive calculations are, well, expensive. If handled poorly, they can negatively impact the performance of your application. With applications that run in the browser, you have to be careful not to block the user from seeing visual updates just because you’re running a heavy computation in the background.

The behavior of both `useEffect` and `useLayoutEffect` differ in how heavy computations are handled. As stated earlier, `useEffect` will defer the execution of the effect function until after the DOM mutations are painted, making it the obvious choice out of the two.

> As an aside, I know `useMemo` is great for memoizing heavy computations. This article neglects that fact, instead comparing `useEffect` and `useLayoutEffect`. Check out this [**guide to the `useMemo` Hook**](/blog.logrocket.com/react-usememo-vs-usecallback.md) if you would like more information.

As an example, I’ve set up an app that’s not practical, but decent enough to work for our use case. [<FontIcon icon="iconfont icon-codesandbox"/>The app](https://codesandbox.io/s/useeffect-uselayouteffect-time-of-execution-gtrvg?fontsize=14) renders with an initial screen that seems harmless:

::: sandpack#react ohansemmanuel / useEffect-useLayoutEffect-time-of-execution [rtl theme=dark]

@file /App.js

```js
import React, { useState, useEffect, useLayoutEffect } from "react";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("USE EFFECT FUNCTION TRIGGERED");
  });

  // change the hook below to `useLayoutEffect` to see a different log order.
  useEffect(() => {
    console.log("USE LAYOUT EFFECT FUNCTION TRIGGERED");
  });

  return (
    <div className="App">
      <h1>{count}</h1>
      <h2>
        <button onClick={() => setCount(count => count + 1)}>
          Update Count
        </button>
      </h2>
    </div>
  );
}

export default App;
```

@file /styles.css

```css
body {
  background: #2980b9;
  color: #fff;
}

h1 {
  font-size: 10rem;
}

.App {
  font-family: sans-serif;
  text-align: center;
}
```

:::

![`useEffect` And `useLayoutEffect` Performance Render](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/useeffect-uselayouteffect-performance-render.png)

However, it has two clickable buttons that trigger some interesting changes. For example, clicking the **200 bars** button sets the count state to 200:

![200 Bars Button Output Example](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/200-bars-button-output-example.png)

It also forces the browser to paint 200 new bars to the screen:

![App Render 200 Bars](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/app-render-200-bars.png)

This is not a very performant way to render 200 bars, as I’m creating new arrays every single time. But the point of our example is to make the browser work:

```jsx
// ... 
return (
  //...
  <section
    style={{
      display: "column",
      columnCount: "5",
      marginTop: "10px" 
    }}
  >
    {new Array(count).fill(count).map(c => (
      <div 
        style={{
          height: "20px",
          background: "red",
          margin: "5px"
        }}
      >
        {c}
      </div>)
    )}
   </section>
)
```

The click also triggers a heavy computation:

```jsx
// ...
useEffect(() => {
  // do nothing when count is zero
  if (!count) {
    return;
  }
  // perform computation when count is updated.
  console.log("=== EFFECT STARTED === ");
  new Array(count).fill(1).forEach(val => console.log(val));
  console.log(`=== EFFECT COMPLETED === ${count}`);
}, [count]);
```

Within the `useEffect` function, I create a new array with a length totaling the count number, in this case, an array of 200 values. I loop over the array and print something to the console for each value in the array.

We’ll still need to pay attention to the screen update and our log consoles to see how this behaves. For `useEffect`, our screen is updated with the new count value before the logs are triggered:

![`useEffect` Logs Triggered](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/useeffect-logs-triggered.webp)

Here’s the same screencast in [<FontIcon icon="fa-brands fa-youtube"/>slow motion](https://youtu.be/M5_RlEn0XKw). There’s no way you’ll miss the screen update happening before the heavy computation! So, is this behavior the same with `useLayoutEffect`? No! Far from it.

With `useLayoutEffect`, the computation will be triggered before the browser has painted the update. The computation takes time, which eats into the browser’s paint time. Check out the same action from above replaced with `useLayoutEffect`:

![UseLayoutEffect Computation Triggered Example](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/uselayouteffect-computation-triggered-example.gif)

Again, you can watch it in [<FontIcon icon="fa-brands fa-youtube"/>slow motion](https://youtu.be/irUvYd39k4c). You can see how `useLayoutEffect` stops the browser from painting the DOM changes for a bit. You can play around with [<FontIcon icon="iconfont icon-codesandbox"/>the demo](https://codesandbox.io/s/useeffect-vs-uselayouteffect-heavy-computation-zoi53?fontsize=14), but be careful not to crash your browser.

::: sandpack#react ohansemmanuel / useEffect-useLayoutEffect-time-of-execution [rtl theme=dark]

@file /App.js

```js
import React, { useState, useEffect, useLayoutEffect } from "react";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    if (!count) {
      return;
    }
    console.log("=== EFFECT STARTED === ");
    new Array(count).fill(1).forEach(val => console.log(val));
    console.log(`=== EFFECT COMPLETED === ${count}`);
  }, [count]);

  const handleStateUpdate = count => () => {
    setCount(count);
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          border: "2px solid rgba(255,255,255,0.45)"
        }}
      >
        <button onClick={handleStateUpdate(200)}>200 bars</button>
        <button onClick={handleStateUpdate(400)}>400 bars</button>
      </section>
      <section
        style={{
          display: "column", columnCount: "5", marginTop: "10px" 
        }}>
        {new Array(count).fill(count).map(c => (
          <div 
            style={{
              height: "20px", 
              background: "red", 
              margin: "5px"
            }}
          >
            {c}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
```

@file /styles.css

```css
body {
  background: #2980b9;
}

h1 {
  font-size: 10rem;
}

.App {
  text-align: center;
  width: 100vw;
}
```

:::

Why does this difference in how heavy computations are handled matter? When possible, you should choose the `useEffect` Hook for cases where you want to be unobtrusive in the dealings of the browser paint process. In the real world, this is most of the time, except for when you’re reading layout from the DOM or doing something DOM-related that needs to be painted ASAP. In the next section, we’ll see an example in action.

### Inconsistent visual changes

`useLayoutEffect` truly shines when handling inconsistent visual changes. As an example, let’s consider these real scenarios I encountered myself while working on my [<FontIcon icon="fas fa-globe"/>Udemy video course](https://forms.gle/Qd6yZC1Lhcosnc2f8) on Advanced Patterns with React Hooks.

With `useEffect`, you get a flicker before the DOM changes are painted, which was related to how refs are passed on to custom Hooks. Initially, these refs start off as `null` before actually being set when the attached DOM node is rendered:

![`useEffect` Screencast](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/useeffect-screencast.webp)

With `useLayoutEffect`:

![`useLayoutEffect` Screencast](/assets/image/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/uselayouteffect-screencast.gif)

If you rely on these refs to perform an animation as soon as the component mounts, then you’ll find an unpleasant flickering of browser paints happening before your animation kicks in. This is the case with `useEffect`, but not `useLayoutEffect`.

Even without this flicker, sometimes you may find `useLayoutEffect` produces animations that look buttery, cleaner, and faster than `useEffect`. Be sure to test both Hooks when working with complex user interface animations.

---

## When to use `useEffect` and when to use `useLayoutEffect`

Most of the time, the `useEffect` Hook should be your first choice because it runs asynchronously and doesn’t block the browser painting process, which can slow down your application. However, when you are completely sure that the code that you wish to use will visually affect your application, such as when using animations, transitions, or when you see some visual inconsistencies, use the `useLayoutEffect` Hook instead.

---

## Conclusion

In this article, we reviewed the `useEffect` and `useLayoutEffect` Hooks in React, looking into the inner workings and best use cases for each. We also demonstrated examples of both hooks regarding their firing, performance, and visual changes.

I hope you found this guide helpful!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React useLayoutEffect vs. useEffect Hooks with examples",
  "desc": "This guide to the useEffect and useLayoutEffect Hooks explores how each handles heavy computations and visual changes.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
