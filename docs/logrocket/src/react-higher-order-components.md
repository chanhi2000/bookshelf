---
lang: en-US
title: "How to use React higher-order components"
description: "Article(s) > How to use React higher-order components"
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
      content: "Article(s) > How to use React higher-order components"
    - property: og:description
      content: "How to use React higher-order components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-higher-order-components.html
prev: /programming/js-react/articles/README.md
date: 2025-02-20
isOriginal: false
author:
  - name: Hussain Arif
    url : https://blog.logrocket.com/author/hussain-arif/
cover: /assets/image/blog.logrocket.com/react-higher-order-components/banner.png
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
  name="How to use React higher-order components"
  desc="Learn the fundamentals of React’s high-order components and play with some code samples to help you understand how it works."
  url="https://blog.logrocket.com/react-higher-order-components"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-higher-order-components/banner.png"/>

Higher-order components (HOCs) powerful patterns in React that allow developers to enhance components by wrapping them with additional functionality. They provide a reusable way to manage cross-cutting concerns, such as authentication, logging, or global state management, without modifying the original component directly.

![how to use react higher order components](/assets/image/blog.logrocket.com/react-higher-order-components/banner.png)

While [**Hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) have largely replaced HOCs for logic reuse, HOCs still offer unique advantages in certain scenarios, particularly when working with legacy codebases or performing complex component transformations.

::: info Update history:

- **_20 February 2025_**: Updated by [<VPIcon icon="fas fa-globe"/>Nelson Michael](https://blog.logrocket.com/author/nelsonmichael/) to address the evolving role of HOCs alongside hooks and modernize examples to better serve the current needs of developers
- **_19 September 2023_**

:::

---

When structuring a React application, developers often need to reuse logic across multiple components. Hooks have become the [**go-to solution**](/blog.logrocket.com/react-hooks-the-good-the-bad-and-the-ugly.md) for state management and logic encapsulation since their introduction in React 16.8. However, HOCs remain useful in specific scenarios, particularly for complex component transformations and cross-cutting concerns.

---

## What are HOCs and when should you use them?

A higher-order component is a function that takes a component as an argument and returns a new, enhanced component.

Both HOCs and Hooks encapsulate stateful logic, but they do so differently and are suited for different use cases.

To illustrate the difference, let’s compare two implementations of a simple counter feature—one using a HOC and another using a custom Hook.

### HOC approach

```jsx
// HOC that adds counter functionality to a component
const withCounter = (WrappedComponent) => {
  return function CounterWrapper(props) {
    const [count, setCount] = useState(0);
    return (
      <WrappedComponent 
        count={count}
        increment={() => setCount(prev => prev + 1)}
        {...props}
      />
    );
  };
};
```

### Hook approach

```jsx
// Custom Hook that provides counter functionality
const useCounter = () => {
  const [count, setCount] = useState(0);
  return {
    count,
    increment: () => setCount(prev => prev + 1)
  };
};

// Usage

const Counter = () => {
  const {count, increment} = useCounter();
  return (
      <>
        <button>Increment</button>
        <p>Clicked:{count}</p>
      </>
  )
}
```

![A clicking increment](/assets/image/blog.logrocket.com/react-higher-order-components/clicking-increment-1.webp)

Notice that while both approaches achieve similar functionality, the HOC pattern wraps an existing component to enhance it, whereas a custom Hook extracts reusable logic without altering the component hierarchy.

Overall, while both approaches manage state similarly, the HOC is ideal for wrapping and enhancing an existing component without directly modifying it, whereas a custom Hook offers a cleaner solution for sharing stateful logic across multiple components without adding an extra layer.

---

## The structure of a higher-order component

According to [<VPIcon icon="fa-brands fa-react"/>React’s documentation](https://reactjs.org/docs/higher-order-components.html), a typical React HOC has the following definition:

::: info

> “A higher-order component is a function that takes in a component and returns a new component.”

:::

Using code, we can rewrite the above statement like so:

```jsx
const newComponent = higherFunction(WrappedComponent);
```

In this line:

- `newComponent` — The enhanced component
- `higherFunction` — A function that enhances `WrappedComponent`
- `WrappedComponent` — The base component whose functionality we want to extend

---

## Creating a higher-order component

First, create a function that takes the base component as an argument and returns a new component with added functionality. In a functional HOC, you can use Hooks for state and side effects:

```jsx
import React, { useState, useEffect } from 'react';

const withEnhancement = (BaseComponent) => {
  return function EnhancedComponent(props) {
    // HOC-specific logic using hooks
    return <BaseComponent {...props} />;
  };
};
```

### Enhancing the component

Inside the `EnhancedComponent` function, you can use Hooks to manage state and perform side effects. Hooks like `useState`, `useEffect`, and `useRef` can be used to implement additional behavior:

```jsx
const withEnhancement = (BaseComponent) => {
  return function EnhancedComponent(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      // Perform side effects here
    }, [count]);

    return <BaseComponent count={count} setCount={setCount} {...props} />;
  };
};
```

### Using the HOC

To use your functional HOC, wrap a component by passing it as an argument to your HOC function. The result will be a new component with the enhanced functionality:

```jsx
const EnhancedComponent = withEnhancement(BaseComponent);
```

### Using the enhanced component

You can use `EnhancedComponent` in your application just like any other React component, with the added functionality from the HOC:

```jsx
function App() {
  return <EnhancedComponent />;
}
```

In the next segment of the article, we will see React’s HOC concept in action.

---

## Using higher-order components

Let’s dive into a practical use case for HOCs.

### Initializing our repository

We first need to create a blank React project. To do so, execute the following commands:

```sh
npx create-react-app hoc-tutorial 
cd hoc-tutorial #navigate to the project folder.
cd src #go to codebase
mkdir components #will hold all our custom components
```

For this article, we will build two custom components to demonstrate HOC usage:

- <VPIcon icon="fa-brands fa-js"/>`ClickIncrease.js` — This component will render a button and a piece of text. When the user clicks the button (an `onClick` event), the `fontSize` property of the text will increase
- <VPIcon icon="fa-brands fa-js"/>`HoverIncrease.js` — Similar to `ClickIncrease`, but it will listen for `onMouseOver` events instead

In your project, navigate to the `components` folder and create these two files. Once done, your file structure should look like this:

![File Structure](/assets/image/blog.logrocket.com/react-higher-order-components/file-structure-1.png)

Now that we have laid out the groundwork for the project, let’s build our custom components.

### Coding our components

In <VPIcon icon="fa-brands fa-js"/>`ClickIncrease.js`, write the following code:

```jsx title="components/ClickIncrease.js"
import React, { useState } from 'react';

function ClickIncrease() {
  const [fontSize, setFontSize] = useState(10); // Set initial value to 10.   return (
    <button onClick={() => setFontSize(size => size + 1)}>
      Increase with click
    </button>
    <p style={{ fontSize: `${fontSize}px` }}>
      Size of font: {fontSize}px
    </p>
  );
}

export default ClickIncrease;
```

Next, in <VPIcon icon="fa-brands fa-js"/>`HoverIncrease.js`, use the following code:

```jsx title="components/HoverIncrease.js"
import React, { useState } from 'react';

function HoverIncrease() {
  const [fontSize, setFontSize] = useState(10);

  return (
    <div onMouseOver={() => setFontSize(size => size + 1)}>
      <p style={{ fontSize: `${fontSize}px` }}>
        Size of font: {fontSize}px
      </p>
    </div>
  );
}

export default HoverIncrease;
```

Finally, render these components in the main <VPIcon icon="fa-brands fa-react"/>`App.js` file:

```jsx title="App.js"
import React from 'react';
import ClickIncrease from './components/ClickIncrease';
import HoverIncrease from './components/HoverIncrease';

function App() {
  return (
    <div>
      <ClickIncrease />
      <HoverIncrease />
    </div>
  );
}

export default App;
```

Let’s test it out! This is the expected result:

![Increase with click](/assets/image/blog.logrocket.com/react-higher-order-components/increase-with-click-1.webp)

### Creating and using our HOC function

Within the <VPIcon icon="fas fa-folder-open"/>`components` folder, create a file called <VPIcon icon="fa-brands fa-js"/>`withCounter.js`. Here, start by writing the following code:

```jsx title="components/withCounter.js"
import React from "react";
const UpdatedComponent = (OriginalComponent) => {
  function NewComponent(props) {
    //render OriginalComponent and pass on its props.
    return ;
  }
  return NewComponent;
};
export default UpdatedComponent;
```

Let’s deconstruct this code piece by piece. In the start, we created a function called `UpdatedComponent` that takes in an argument called `OriginalComponent`. In this case, the `OriginalComponent` will be the React element, which will be wrapped.

Then, we told React to render `OriginalComponent` to the UI. We will implement enhancement functionality later in this article.

When that’s done, it’s time to use the `UpdatedComponent` function in our app. To do so, first go to the `HoverIncrease.js` file and write the following lines:

```jsx title="HoverIncrease.js"
import withCounter from "./withCounter.js" //import the withCounter function

// ..further code ..

function HoverIncrease() {
  // ..further code
}
// replace your 'export' statement with:

export default withCounter(HoverIncrease);
// We have now converted HoverIncrease to an HOC function.
```

Next, do the same process with the `ClickIncrease` module:

```jsx title="components/ClickIncrease.js"
import withCounter from "./withCounter";

function ClickIncrease() {
  //...further code
}

export default withCounter(ClickIncrease);
// ClickIncrease is now a wrapped component of the withCounter method.
```

This will be the result:

![Size Of Font Increasing](/assets/image/blog.logrocket.com/react-higher-order-components/site-font-increasing.webp)

Notice that our result is unchanged. This is because we haven’t made changes to our HOC yet. In the next section, you will learn how to share props between our components.

---

## Sharing props

Using higher-order components, React allows developers to share props among wrapped components.

First, add a `name` prop in <VPIcon icon="fa-brands fa-js"/>`withCounter.js` as follows:

```jsx title="components/withCounter.js"
const UpdatedComponent = (OriginalComponent) => {
  function NewComponent(props) {
    return <OriginalComponent name="LogRocket" {...props} />;
  }
  return NewComponent;
};
export default UpdatedComponent;
```

Next, modify the child components to read this prop:

```jsx title="components/HoverIncrease.js"
function HoverIncrease(props) {
  return (
    <div>
      Value of 'name' in HoverIncrease: {props.name}
    </div>
  );
}
export default withCounter(HoverIncrease);
```

```jsx title="components/ClickIncrease.js"
function ClickIncrease(props) {
  return (
    <div>
      Value of 'name' in ClickIncrease: {props.name}
    </div>
  );
}
export default withCounter(ClickIncrease);
```

![Value Of Name](/assets/image/blog.logrocket.com/react-higher-order-components/value-name.png)

As shown above, HOCs allow developers to efficiently share props across multiple components.

---

## Sharing state variables with Hooks

Just like with props, we can share state variables using Hooks within HOCs. This enables us to encapsulate and reuse logic across multiple components.

### Implementing the HOC

In <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-js"/>`withCounter.js`, define an HOC that manages a `counter` state and an `incrementCounter` function:

```jsx title="components/withCounter.js"
import React, { useState } from 'react';

const withCounter = (OriginalComponent) => {
  function NewComponent(props) {
    const [counter, setCounter] = useState(10) // Initialize counter state

    return (
      <OriginalComponent
        counter={counter}
        incrementCounter={() => setCounter(counter + 1)}
        {...props}
      />
    )
  }
  return NewComponent
};

export default withCounter;
```

### Explanation

- **State initialization**: — The `counter` state is initialized with a value of `10`
- **Increment function**: — The `incrementCounter` function updates the counter value
- **Prop forwarding**: — The HOC passes `counter` and `incrementCounter` as props to the wrapped component

### Using the HOC in child components

Modify the `HoverIncrease` and `ClickIncrease` components to use the shared state and function:

```jsx title="components/HoverIncrease.js"
import withCounter from './withCounter'

function HoverIncrease(props) {
  return (
    <div onMouseOver={props.incrementCounter}>
      <p>Value of 'counter' in HoverIncrease: {props.counter}</p>
    </div>
  )
}

export default withCounter(HoverIncrease)
```

```jsx title="components/ClickIncrease.js"
import withCounter from './withCounter'

function ClickIncrease(props) {
  return (
    <button onClick={props.incrementCounter}>
      Increment counter
    </button>
    <p>Value of 'counter' in ClickIncrease: {props.counter}</p>
  )
}

export default withCounter(ClickIncrease)
```

Here is the expected result:

![Increment Counter](/assets/image/blog.logrocket.com/react-higher-order-components/increment-counter-1.webp)

While HOCs are useful for sharing logic across multiple components, they do not share state between different instances of wrapped components. If a shared state is required across multiple components, consider using [**React’s Context API**](/blog.logrocket.com/react-context-tutorial.md), which provides an efficient way to manage global state.

---

## Passing parameters

Even though our code works, consider the following situation: what if we want to increment the value of `counter` with a custom value? Via HOCs, we can even tell React to pass specific data to certain child components. This is made possible with parameters.

### Enabling support for parameters

Modify <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-js"/>`withCounter.js` to accept an `increaseCount` parameter:

```jsx title="components/withCounter.js"
//This function will now accept an 'increaseCount' parameter.
const UpdatedComponent = (OriginalComponent, increaseCount) => { 
  function NewComponent(props) {
    return (
      // this time, increment the 'size' variable by 'increaseCount'
      incrementCounter={() => setCounter((size) => size + increaseCount)}
      />
    );
  //further code..
  }
}
```

In this piece of code, we informed React that our function will now take in an additional parameter called `increaseCount`.

### Using parameters in wrapped components

Modify the `HoverIncrease` and `ClickIncrease` components to use this parameter:

```jsx
//In HoverIncrease, change the 'export' statement:
export default withCounter(HoverIncrease, 10); //value of increaseCount is 10.
//this will increment the 'counter' Hook by 10.
//In ClickIncrease:
export default withCounter(ClickIncrease, 3); //value of increaseCount is 3.
//will increment the 'counter' state by 3 steps.
```

By passing a custom value (`increaseCount`) to the HOC, we can dynamically control the increment behavior in each wrapped component.

Here is the expected result:

![Clicking Increment Counters](/assets/image/blog.logrocket.com/react-higher-order-components/clicking-increment-counters-1.webp)

In the end, the <VPIcon icon="fa-brands fa-js"/>`withCounter.js` file should look like this:

```jsx title="components/withCounter.js"
import React from "react";
import { useState } from "react";

const UpdatedComponent = (OriginalComponent, increaseCount) => {
  function NewComponent(props) {
    const [counter, setCounter] = useState(10);
    return (
      name="LogRocket"
      counter={counter}
      incrementCounter={() => setCounter((size) => size + increaseCount)}
      />
    );
  }
  return NewComponent;
};

export default UpdatedComponent;
```

<VPIcon icon="fa-brands fa-js"/>`HoverIncrease.js` should look like this:

```jsx title="components/HoverIncrease.js"
import { useState } from "react";
import withCounter from "./withCounter";

function HoverIncrease(props) {
  const [fontSize, setFontSize] = useState(10);
  const { counter, incrementCounter } = props;
  
  return (
    setFontSize((size) => size + 1)}>
    Increase on hover
    Size of font in onMouseOver function: {fontSize}
    Value of 'name' in HoverIncrease: {props.name}
    incrementCounter()}>
    Increment counter Value of 'counter' in HoverIncrease: {counter}
  );
}

export default withCounter(HoverIncrease, 10);
```

And finally, your `ClickIncrease` component should have the following code:

```jsx
import { useEffect, useState } from "react";
import withCounter from "./withCounter";
function ClickIncrease(props) {
const { counter, incrementCounter } = props;
const [fontSize, setFontSize] = useState(10);
return (
setFontSize((size) => size + 1)}>
Increase with click
Size of font in onClick function: {fontSize}
Value of 'name' in ClickIncrease: {props.name}
incrementCounter()}>Increment counter
Value of 'counter' in ClickIncrease: {counter}
);
}
export default withCounter(ClickIncrease, 3);
```

---

## HOCs vs. Hooks: How to choose

Choosing between higher-order components (HOCs) and Hooks depends on two key factors: component transformation and code organization.

### Component transformation

- **Use HOCs when you need to:**
  - Modify the rendering behavior of components, such as conditionally rendering based on permissions
  - Handle cross-cutting concerns like authentication, logging, error handling, or [**conditional rendering**](/blog.logrocket.com/react-conditional-rendering-9-methods.md)
- **Use Hooks when you need to:**
  - Share stateful logic, such as form handling or data fetching, without altering the component hierarchy
  - Handle side effects, such as subscriptions, timers, or API calls that need to run on component mount or update

### Code organization

- **HOCs** — Excel at providing consistent component wrappers and managing complex component transformations
- **Hooks** — Allow you to compose stateful logic efficiently without introducing unnecessary layers in the component tree:

![](https://paper-attachments.dropboxusercontent.com/s_D5E68C0C40BBE2A2BD0A43D7BFA01F32C04A2EE6B1898A4A374FDC5336287645_1739356282315_Screenshot+2025-02-12+at+11.30.39AM.png)

---

## Modern implementation patterns

HOCs and Hooks can complement each other to create robust solutions. Below is a real-world authentication example:

```jsx :collapsed-lines
// Authentication HOC
const withAuth = (WrappedComponent, requiredRole) => {
  return function AuthWrapper(props) {
    const { isAuthenticated, userRole } = useAuth(); // Custom hook for auth state
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (requiredRole && userRole !== requiredRole) {
        navigate('/unauthorized');
      }
    }, [isAuthenticated, userRole, navigate]);

    if (!isAuthenticated) {
      return null; // Optionally return a loader while determining authentication
    }

    return <WrappedComponent {...props} />;
  };
};

// Usage with a protected component
const AdminDashboard = ({ data }) => {
  return <div>Admin Dashboard Content</div>;
};

export default withAuth(AdminDashboard, 'admin');
```

Here’s another example demonstrating performance optimization using Hooks within an HOC:

```jsx :collapsed-lines
// Performance optimization HOC using hooks
const withDataFetching = (WrappedComponent, fetchConfig) => {
  return function DataFetchingWrapper(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { cache } = useCacheContext();
    const { notify } = useNotification();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cachedData = cache.get(fetchConfig.key);
          if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
          }

          const response = await fetch(fetchConfig.url);
          const result = await response.json();

          cache.set(fetchConfig.key, result);
          setData(result);
        } catch (err) {
          setError(err);
          notify({
            type: 'error',
            message: 'Failed to fetch data',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [fetchConfig.url, fetchConfig.key]);

    return <WrappedComponent {...props} data={data} loading={loading} error={error} />;
  };
};
```

For a broader perspective on advanced React logic reuse, see “[**The modern guide to React state patterns**](/blog.logrocket.com/modern-guide-react-state-patterns.md).”

---

## Performance considerations

If your HOC involves expensive computations, consider [**performance optimization techniques**](/blog.logrocket.com/death-by-a-thousand-cuts-a-checklist-for-eliminating-common-react-performance-issues.md) like memoization to prevent unnecessary re-renders. Below is an example using `useMemo` and `React.memo`:

```jsx :collapsed-lines
// Assume expensiveDataProcessing is an expensive function that processes props.data

const expensiveDataProcessing = (data) => { 
  // ...expensive computations... 
  return data; // Replace with the actual processed result 
};

const withOptimizedData = (WrappedComponent) => { 
  function OptimizedDataWrapper(props) { 
    const memoizedProps = useMemo(() => ({ 
        ...props, 
        processedData: expensiveDataProcessing(props.data), 
    }), [props.data]); 
    return <WrappedComponent {...memoizedProps} />; 
  }
  return React.memo(OptimizedDataWrapper); 
}; 
export default withOptimizedData;
```

---

## Common HOC patterns and best practices

### Composition of multiple HOCs

When enhancing a base component with several cross-cutting concerns (such as authentication, [**data fetching**](/blog.logrocket.com/fetch-api-node-js.md), error handling, and analytics), you can compose multiple HOCs into one.

To compose multiple HOCs directly:

```jsx
const composedComponent = withAuth(withData(withLogging(BaseComponent)));
```

Alternatively, use a `compose` utility to combine multiple functions from right to left:

```jsx
// Utility
const compose = (...functions) => x =>
  functions.reduceRight((acc, fn) => fn(acc), x);

// Usage
const composedComponent = compose(withAuth, withData, withLogging)(BaseComponent);
```

![](https://paper-attachments.dropboxusercontent.com/s_D5E68C0C40BBE2A2BD0A43D7BFA01F32C04A2EE6B1898A4A374FDC5336287645_1739358942323_Screenshot+2025-02-12+at+12.15.22PM.png)

### Key considerations when composing HOCs

#### Order matters:

```jsx
// These will behave differently:
const enhance1 = compose(withAuth, withDataFetching);
const enhance2 = compose(withDataFetching, withAuth);
```

#### Props flow

```jsx
// Props flow through each HOC in the chain
const withProps = compose(
  withAuth,        // Adds isAuthenticated
  withDataFetching // Adds data, loading
);
// Final component receives: { isAuthenticated, data, loading, ...originalProps }
```

#### Performance considerations:

Avoid excessive composition:

```jsx
const tooManyHOCs = compose(
  withAuth,
  withData,
  withLogging,
  withTheme,
  withTranslation,
  withRouter,
  withRedux
);
// Each layer adds complexity and potential performance impact
```

A better approach is to combine related concerns:

```jsx
const withDataFeatures = compose(
  withData,
  withLoading,
  withError
);

const withAppFeatures = compose(
  withAuth,
  withAnalytics
);
```

#### Debugging:

```jsx
const withDebug = (WrappedComponent) => {
  return function DebugWrapper(props) {
    console.log('Component:', WrappedComponent.name);
    console.log('Props:', props);
    return <WrappedComponent {...props} />;
  };
};

const enhance = compose(
  withDebug, // Add at different positions to debug specific layers
  withAuth,
  withDebug,
  withDataFetching
);
```

#### Reusable compositions:

```jsx :collapsed-lines
const withDataProtection = compose(
  withAuth,
  withErrorBoundary,
  withLoading
);

const withAnalytics = compose(
  withTracking,
  withMetrics,
  withLogging
);

// Use them together or separately
const EnhancedComponent = compose(
  withDataProtection,
  withAnalytics
)(BaseComponent);
```

### Adding type-safety

Ensuring type safety for HOCs improves maintainability. Below is an example of a type-safe HOC in TypeScript:

```tsx :collapsed-lines
import React, { useState, useEffect } from 'react';

interface WithDataProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchConfig {
  url: string;
}

function withData<T, P extends object>(
  WrappedComponent: React.ComponentType<P & WithDataProps<T>>,
  fetchConfig: FetchConfig
): React.FC<P> {
  return function WithDataComponent(props: P) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      fetch(fetchConfig.url)
        .then((response) => response.json())
        .then((result: T) => {
          setData(result);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err);
          setLoading(false);
        });
    }, [fetchConfig.url]);

    return (
      <WrappedComponent {...props} data={data} loading={loading} error={error} />
    );
  };
}

export default withData;
```

### Common HOC problem: Passing props correctly

One important thing to note is that the process of passing down props to an HOC’s child component is different than that of a non-HOC component.

For example, look at the following code:

```jsx title="App.jsx"
function App() {
  return (
    {/*Pass in a 'secretWord' prop*/}
  );
}
function HoverIncrease(props) {
  // read prop value:
  console.log("Value of secretWord: " + props.secretWord);
  // further code..
}
```

In theory, we should get the message `Value of secretWord: pineapple` in the console. However, that’s not the case here:

![Value of secretword](/assets/image/blog.logrocket.com/react-higher-order-components/value-secretword.png)

In this case, the `secretWord` prop is actually being passed to the `withCounter` function and not to the `HoverIncrease` component.

To solve this issue, we have to make a simple change to `withCounter.js`:

```jsx
const UpdatedComponent = (OriginalComponent, increaseCount) => {
  function NewComponent(props) {
    return (
      // Pass down all incoming props to the HOC's children:
      {...props}
      />
    );
  }
  return NewComponent;
};
```

This minor fix solves our problem:

![Value of secretword with problem fixed](/assets/image/blog.logrocket.com/react-higher-order-components/value-secretword-problem-fixed.png)

---

## Conclusion

This article covered the fundamentals of React’s higher-order components, including best practices, performance optimizations, debugging strategies, and type safety. Experimenting with the provided code samples will help solidify your understanding. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use React higher-order components",
  "desc": "Learn the fundamentals of React’s high-order components and play with some code samples to help you understand how it works.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-higher-order-components.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
