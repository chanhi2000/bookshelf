---
lang: en-US
title: "React Context tutorial: Complete guide with practical examples"
description: "Article(s) > React Context tutorial: Complete guide with practical examples"
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
      content: "Article(s) > React Context tutorial: Complete guide with practical examples"
    - property: og:description
      content: "React Context tutorial: Complete guide with practical examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-context-tutorial.html
prev: /programming/js-react/articles/README.md
date: 2025-02-17
isOriginal: false
author:
  - name: Adebiyi Adedotun
    url : https://blog.logrocket.com/author/adebiyial/
cover: /assets/image/blog.logrocket.com/react-context-tutorial/banner.png
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
  name="React Context tutorial: Complete guide with practical examples"
  desc="Let's review React Context API. When should you use it to avoid prop drilling, and how does it compare to Redux?"
  url="https://blog.logrocket.com/react-context-tutorial"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-context-tutorial/banner.png"/>

::: note Editor’s note

This article was last updated in February 2025 by [<FontIcon icon="fas fa-globe"/>Vijit Ail](https://blog.logrocket.com/author/vijitail/) to add use cases and detailed examples that align with the latest React 19 updates, expand commentary on Redux vs Context, and remove outdated information related to the `class` component.

:::

![](/assets/image/blog.logrocket.com/react-context-tutorial/banner.png)

You’ve likely encountered situations where passing data through many components becomes cumbersome. That’s where React Context comes into the picture.

React Context was introduced in React v.16.3. It enables us to pass data through our component trees, allowing our components to communicate and share data at various levels. This guide will explore everything you need to know about using Context effectively. Let’s dive right into it.

---

## What is React Context?

[**Passing props**](/blog.logrocket.com/how-props-passed-components-react.md) through each intermediate component can be tedious and make your code harder to maintain. That’s why React Context was introduced.

React Context is a great feature that enables you to manage and share state across the React application without needing to pass props through every level of the component tree. It is quite handy when you have a deeply nested component structure, and you need to pass specific data from a top-level component down to a deeply nested child component.

### How to use React Context

1. **Create a Context** — First, you create a Context using the `createContext()` function. This creates a special object that stores the state that you want to share
2. **Provide the Context**— You add the `<Context />` component to the top of the component tree that needs access to the shared state
3. **Use the Context** — Any child component wrapped within the `<Context>` component can access the shared data using the `useContext()` Hook or the `<Context.Consumer />` component

---

## Understanding the `useContext()` Hook

The `useContext()` Hook in React is a useful function that enables components to access shared data easily without having to pass down props through the component tree. It can read and subscribe to `a context` directly from any component.

Here’s a basic usage for `useContext()`:

```jsx
// Assume MyContext is created somewhere in your app

const MyComponent = () => {
    const contextValue = useContext(MyContext);
    // you can use contextValue anywhere in this component
}
```

By calling, `useContext(MyContext)`, you get the current value from the nearest `<MyContext />` provider above your component in the tree. If no provider is found, the `useContext()` Hook returns the default value defined when you created `MyContext`.

Components using `useContext()` automatically re-render whenever the context value changes, making sure that your UI is always up to date with the latest context value.

---

## Use cases for React Context

When working with React, there are plenty of scenarios where Context can make your life much easier.

### Themes

Let’s consider, that you are working on an app that supports both [**light and dark modes**](/blog.logrocket.com/react-light-dark-mode-css-theme-ui.md). Instead of passing the theme prop through every level of the component tree, you can wrap a `Context` component at the top of the app, generally in the entry component. This way, any component can access the current theme state directly from the `Context` and change its styling accordingly.

### Logged-in user

In certain cases, components need to know who the current user is. By storing the user information in `Context`, any component can access it without the need for [**prop drilling**](/blog.logrocket.com/solving-prop-drilling-react-apps.md). The user name can be displayed in the top navigation and in the profile section with the use of `Context`.

### Routing

Popular routing libraries like `react-router` and `wouter` use `Context` under the hood to keep track of the current routing state. This enables the app to know which route is currently active, and render the route component accordingly.

### State management

As your app continues to grow, managing data flow across the application can get tedious. `Context` helps by lifting the state to a parent component, making it accessible to any component that needs it. Often, developers pair `Context` with a reducer to manage complex state logic, which simplifies the code and makes the app maintainable in the long run.

---

## React Context usage with examples

Let’s explore some uses of React Context with, well, some real-world context:

### Basic example

Let’s see a simple implementation of how we can manage light and dark themes using React `Context`.

First, we need to create a context that will hold the value of the active theme and an updater function that will toggle it:

```jsx
const ThemeContext = createContext();
```

Next, we will create a `<ThemeProvider />` component that wraps our entire app and provides the theme context to all child components:

```jsx
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <div className={`app-theme-${theme}`}>{children}</div>
    </ThemeContext>
  );
};
```

In the above code, we are using the `<ThemeContext />` component to make the `theme` and `toggleTheme()` available to any component that consumes the context.

Now, create a `<ThemeSwitcher />` component that will provide a button for the users to toggle between the themes. We use the `useContext()` Hook to access the `theme` and `toggleTheme()` provided by the `<ThemeProvider />` component:

```jsx
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};
```

Let’s create a `<Header />` component to display the app title and the `<ThemeSwitcher />` component:

```jsx
const Header = () => (
  <header>
    <h1>My App</h1>
    <ThemeSwitcher />
  </header>
);
```

And finally, we wrap the `<Main />` component with the `<ThemeProvider />` so that all child components have access to the `theme` context:

```jsx
const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Header />
      <main>
        <p>Hello World!</p>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
```

### Toast messages

Another common usage of React Context, is to display [**toast messages**](/blog.logrocket.com/using-react-toastify-style-toast-messages.md). Let’s explore how React Context helps in displaying toast messages from different components.

Similar to above, we first need to create a context that will manage our toast messages:

```jsx :collapsed-lines title="ToastContext.jsx"
import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts([...toasts, { id, message }]);

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      );
    }, 3000);
  };

  return (
    <ToastContext value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext>
  );
};

export const useToast = () => useContext(ToastContext);
```

The `<ToastProvider />` component manages the state of toasts. It renders all the toasts in a fixed container. It also provides an `addToast()` function to display new toast messages and remove them automatically after three seconds using the `setTimeout()` method.

In the following code snippet, there are multiple child components like `<Navbar />`, `<Profile />`, `<Home />` that use the `addToast()` function to trigger the toast messages:

```jsx :collapsed-lines title="App.jsx"
import { ToastProvider, useToast } from "./ToastContext";
import "./styles.css";

// Navbar Component
const Navbar = () => {
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast("You have been logged out.");
  };

  return (
    <nav>
      <h1>Toast Example</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

// Home Component
const Home = () => {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast("Welcome to the Home Page!");
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleClick}>Show Home Toast</button>
    </div>
  );
};

// Profile Component
const Profile = () => {
  const { addToast } = useToast();

  const handleUpdate = () => {
    addToast("Profile updated successfully!");
  };

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

// Dashboard Component with Nested Components
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Home />
      <Profile />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <Dashboard />
    </ToastProvider>
  );
}
```

The `useToast()` custom Hook promotes code reusability by providing a simple API to access toast functionality in any child component:

```jsx
// props drilling
<Navbar addToast={addToast} />
<Dashboard addToast={addToast} />
<Home addToast={addToast} />
<Profile addToast={addToast} />
```

Instead of passing the `addToast()` function as a prop, Context has enabled the child components to trigger toast messages directly. This makes the approach scalable as you add more components to your app.

This example demonstrates how React Context can be used to manage shared functionalities like toast messages.

### Consuming Context with `use()` Hook

The `use()` Hook in React is a special API introduced to simplify the interaction between components and asynchronous data and context. It enables a more flexible approach than the traditional `useContext()` Hook, allowing us to conditionally read values from a context or handle promises directly within a component.

In this example, we will review how `use()` Hook, can be used to access user data from Context value.

In the `<UserProvider />` component, we have a mock user object with `email` and `mobile` properties. This component wraps its children with `<UserContext />`, providing user data to any component inside it.

The `useUser()` custom Hook is defined to access the `UserContext` value using the `use()` Hook. This custom Hook can be used inside an if condition or a loop since it uses `use()` Hook under the hood:

```jsx title="UserContext.jsx"
import React, { createContext, use } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const user = {
    email: "johndoe@example.com",
    mobile: "123-456-7890",
  };

  return <UserContext value={user}>{children}</UserContext>;
};

export const useUser = () => use(UserContext);
```

In the <FontIcon icon="fa-brands fa-react"/>`App.jsx`, we have created a `<ProfileDetails />` component to display the user data. Initially, both mobile and email are masked to indicate sensitive information. The `showData` state variable is used to track whether to unmask the data. When the `showData` flag is `true`, the user data is updated by accessing the value from the `useUser()` custom Hook:

```jsx :collapsed-lines title="App.jsx"
import { useState } from "react";
import "./styles.css";
import { UserProvider, UserContext, useUser } from "./UserContext";

const ProfileDetails = () => {
  let mobile = "****";
  let email = "****";
  const [showData, setShowData] = useState(false);

  const toggleData = () => {
    setShowData((prev) => !prev);
  };

  if (showData) {
    const user = useUser();
    mobile = user.mobile;
    email = user.email;
  }

  return (
    <div>
      <h2>Profile Details</h2>
      <button onClick={toggleData}>
        {showData ? "Hide Data" : "Show Data"}
      </button>
      <p>Mobile: {mobile}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default function App() {
  return (
    <UserProvider>
      <ProfileDetails />
    </UserProvider>
  );
}
```

In this example, we saw how the new `use()` Hook can be used to access React Context and conditionally reveal or hide data based on user interaction.

### Usage with Reducer

In this example, we’ll see how [**the `useReducer` Hook**](/blog.logrocket.com/react-usereducer-hook-ultimate-guide.md) can be used with React Context. We will build a [**simple shopping cart app**](/blog.logrocket.com/build-ecommerce-app-from-scratch-with-react-native.md) that will allow users to add, remove and adjust the quantity of the cart items.

Let’s start by defining the Context:

```jsx
const CartContext = createContext();
```

The `CartContext` will provide the state and updater functions for the cart items to the child components.

Now, let’s define a set of action types. These constants will help us identify what kind of update we want to do on the cart items:

```jsx
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
```

These constants will be used by the reducer function to handle the dispatched actions.

Next, we will define the state of the cart. The cart starts as an empty array, and will be updated as products are added by the user:

```jsx
const initialState = {
  cart: [],
};
```

The reducer function is where we will manage how the cart state updates in response to the defined actions.

- `**ADD_TO_CART**` — Add a product or increase its quantity if it already exists
- `REMOVE_FROM_CART` — Remove a product from the cart
- `INCREMENT_QUANTITY` — Increase the quantity of a product
- `DECREMENT_QUANTITY` — Decrease the quantity of a product

Here’s our reducer function:

```jsx :collapsed-lines
function reducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.product.id
      );

      if (existingProductIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingProductIndex].quantity += 1;
        return { ...state, cart: newCart };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: 1 }],
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.productId),
      };
    case INCREMENT_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: newCart };
    }
    case DECREMENT_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.id === action.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
}
```

Next, we will implement the main component that will use the `useReducer` Hook to manage the cart’s state. The `useReducer` Hook returns the current state and a dispatch function to trigger state updates:

```jsx :collapsed-lines title="MyApp.jsx"
import React, { useReducer, useContext } from "react";

function MyApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, productId });
  };

  const incrementQuantity = (productId) => {
    dispatch({ type: INCREMENT_QUANTITY, productId });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: DECREMENT_QUANTITY, productId });
  };

  const cartValue = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  };

  return (
    <CartContext value={cartValue}>
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </CartContext>
  );
}
```

In the above code snippet, functions like `addToCart()` and `removeFromCart()` use the `dispatch()` function to trigger the actions, and the `<CartContext />` components wrap the `<ProductList />` and `<Cart />` components so that they can use the context values to read and update the cart state.

Create the `<ProductList />` and `<Cart />` components as shown in the snippet below:

```jsx :collapsed-lines title="ProductList.jsx"
function ProductList() {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 49.99 },
    { id: 3, name: "Product 3", price: 19.99 },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <span className="cart-buttons">
              <button onClick={() => decrementQuantity(item.id)}>-</button>
              <button onClick={() => incrementQuantity(item.id)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

The `<ProductList />` component displays products and enables the user to add them to the cart. The `<Cart />` component shows items in the cart and provides buttons to adjust quantities or remove the items.

This approach is ideal for managing complex state logic and sharing the state across multiple child components. It enables you to keep the business logic clean and in a centralized manner making the app easier to maintain.

### Deciding between `useState()` and `useReducer()`

When deciding between `useState()` and `useReducer()`, you should carefully review your app’s use case and state logic.

For example, `useState()` works great when working with independent pieces of state, like toggling a switch or a dialog box, managing form inputs, etc.

On the other hand, using `useReducer()` is preferable when you have complex state logic where the new state depends on the previous state’s value. It centralizes the state update logic into a single function, as we have seen in the shopping cart example. If your component’s state management starts to get complicated with `useState()`, it’s a good sign to consider switching to `useReducer()` for a more organized approach.

You can check out [<FontIcon icon="iconfont icon-codesandbox"/>the working demo here](https://codesandbox.io/p/sandbox/559l56?file=%2Fsrc%2FApp.js).

### Improving performance

When building React applications, especially larger ones, managing [**how components render**](/blog.logrocket.com/react-native-new-architecture-sync-async-rendering.md) becomes important, as it directly impacts the performance of the application. Using React Context is a great way to share data across components, but it can lead to unnecessary re-renders if not used carefully.

Let’s explore how to optimize React Context using a simple task management app as an example:

```jsx :collapsed-lines title="App.jsx"
import React, { useState, useContext, useEffect } from "react";

const TaskContext = React.createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design homepage", completed: false },
    { id: 2, text: "Develop backend", completed: false },
  ]);

  const addTask = (taskText) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: taskText, completed: false },
    ]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const contextValue = {
    tasks,
    addTask,
    toggleTaskCompletion,
  };

  return (
    <TaskContext value={contextValue}>{children}</TaskContext>
  );
}

function TaskList() {
  const { tasks, toggleTaskCompletion } = useContext(TaskContext);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTask() {
  const { addTask } = useContext(TaskContext);

  useEffect(() => {
    console.log(`<AddTask />`);
  });

  const handleAddTask = () => {
    const taskText = prompt("Enter task description:");
    if (taskText) {
      addTask(taskText);
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskList />
      <AddTask />
    </TaskProvider>
  );
}

export default App;
```

In the above code, we have a `TaskContext` that contains the task items and the `addTask()` function. While this is straightforward, it comes with a downside: each time an item gets added or completed, the context value changes. Additionally, all the components using the `TaskContext` change. This includes the `<AddTask />` component, which is only concerned with adding items and not displaying it.

This occurs because the context value is an object, which means it will be recreated on each render. Thus, React thinks that the context value has changed.

So how do we optimize this? We have to separate the context into two contexts: one for task items and another for task actions. By splitting states and actions into different contexts, we ensure that components only react to the data they need. For instance, `<TaskList />` only cares about the task items, while `<AddTask />` only needs to know how to add a new task:

```jsx :collapsed-lines title="App.jsx"
const TaskContext = React.createContext();
const TaskActionContext = React.createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Design homepage", completed: false },
    { id: 2, text: "Develop backend", completed: false },
  ]);

  const taskStateValue = {
    tasks,
  };

  const addTask = useCallback((taskText) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: taskText, completed: false },
    ]);
  }, []);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const taskActionValue = useMemo(
    () => ({
      addTask,
      toggleTaskCompletion,
    }),
    [addTask, toggleTaskCompletion]
  );

  return (
    <TaskContext value={taskStateValue}>
      <TaskActionContext value={taskActionValue}>{children}</TaskActionContext>
    </TaskContext>
  );
}
```

We also wrap the action functions with `useCallback()` to make sure that they remain stable across renders. This is important for preventing unnecessary updates in components that consume these functions.

This not only improves performance but also makes the app more predictable and easier to maintain. When a task is toggled, only the `<TaskList />` updates, not the `<AddTask />` component, because we have clearly defined what each component cares about.

---

## Redux vs. React Context

The optimized approach discussed in the previous example may work well for most use cases. It might not suffice when your applications grow in complexity.

If you find yourself handling deeply nested components or managing a large global state, it might be time to consider [**a state management library like Redux**](/blog.logrocket.com/understanding-redux-tutorial-examples.md). Redux provides a more structured way to manage state changes and can handle complex state updates more efficiently than context alone.

Does Redux replace React Context? The short answer is no, it doesn’t. Context and Redux are two different tools, and comparison often arises from misconceptions about what each tool is designed for. Although Context can be orchestrated to act as a state management tool, it wasn’t designed for that purpose, so you’d have to put in extra effort to make it work. There are already many state management tools that work well and will ease your troubles.

Choosing between React Context and Redux should be based on the complexity and needs of your application’s data and business logic. React Context is effective for avoiding props drilling and simple state management. State management libraries like Redux, Zustand, etc. are better for use cases that involve complex states in large-scale or enterprise-level applications. They also provide access to advanced features like time-travel debugging, async middleware, action logging, etc.

In my experience with Redux, it can be relatively complex to achieve something that is easier to solve today with Context. Keep in mind that prop drilling and global state management are where Redux and Context’s paths cross. Redux has more functionality in this area. Ultimately, Redux and Context should be considered complementary tools that work together instead of as alternatives. My recommendation is to use Redux for complex global state management and Context for prop drilling.

---

## Conclusion

In this article, we reviewed what React Context is, when we should us![e it to avoid prop drilling, its use cases with examples, and how we can use Context most effectively. We also cleared up some misconceptions surrounding React Context and Redux.

The main takeaways from this article include the following:

- The React Context API is designed for prop drilling
- If you use Context for global state management, use it sparingly
- If you can’t be prudent with Context, try Redux
- Redux can be used independently from React
- Redux is not the only state management tool available

I hope you enjoyed this tutorial!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Context tutorial: Complete guide with practical examples",
  "desc": "Let's review React Context API. When should you use it to avoid prop drilling, and how does it compare to Redux?",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-context-tutorial.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
