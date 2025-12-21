---
lang: en-US
title: "Shared State Complexity in React - A Complete Handbook for Developers"
description: "Article(s) > Shared State Complexity in React - A Complete Handbook for Developers"
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
      content: "Article(s) > Shared State Complexity in React - A Complete Handbook for Developers"
    - property: og:description
      content: "Shared State Complexity in React - A Complete Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/shared-state-complexity-in-react-handbook.html
prev: /programming/ts/articles/README.md
date: 2025-08-01
isOriginal: false
author:
  - name: Henry Adepegba
    url : https://freecodecamp.org/news/author/henrywinnerman/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754003865317/3c91ac36-2e1b-4e03-ac54-64a100e44c8f.png
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
  name="Shared State Complexity in React - A Complete Handbook for Developers"
  desc="Imagine you're building a simple shopping website. You have a product page where users can add items to their cart, and a header that displays the number of items in the cart. Sounds simple, right? But here's the challenge: how does the header know w..."
  url="https://freecodecamp.org/news/shared-state-complexity-in-react-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754003865317/3c91ac36-2e1b-4e03-ac54-64a100e44c8f.png"/>

Imagine you're building a simple shopping website. You have a product page where users can add items to their cart, and a header that displays the number of items in the cart. Sounds simple, right? But here's the challenge: **how does the header know when someone adds an item on a completely different part of the page?**

This is the **shared state problem**, which occurs when different parts of your application need to access and update the same information. In small apps, this isn't a big deal. But as your app grows, managing shared state becomes one of the most complex and frustrating parts of React development.

In this handbook, you'll learn:

- What props and prop drilling are, and why they become problematic
- How to recognize when you have a shared state problem
- Multiple solutions to manage shared state effectively
- When to use each solution
- How to avoid common mistakes that even experienced developers make

By the end, you'll understand how to build React applications that stay organized and maintainable as they grow.

### What we’ll cover:

- [Understanding the Building Blocks: Props in React](#heading-understanding-the-building-blocks-props-in-react)
- [What is Prop Drilling and Why is it a Problem?](#heading-what-is-prop-drilling-and-why-is-it-a-problem)
- [Solution 1: React Context API - Understanding the Concept](#heading-solution-1-react-context-api-understanding-the-concept)
- [Advanced Context Patterns and Concepts](#heading-advanced-context-patterns-and-concepts)
- [Solution 2: State Management Libraries Explained](#heading-solution-2-state-management-libraries-explained)
- [Performance Optimization Strategies Explained](#heading-performance-optimization-strategies-explained)
- [Testing Shared State: A Comprehensive Approach](#heading-testing-shared-state-a-comprehensive-approach)
- [When to Use Each Approach: A Decision Framework](#heading-when-to-use-each-approach-a-decision-framework)
- [Common Pitfalls and How to Avoid Them](#heading-common-pitfalls-and-how-to-avoid-them)
- [Best Practices for Maintainable Shared State](#heading-best-practices-for-maintainable-shared-state)
- [Conclusion: Building Maintainable React Applications](#heading-conclusion-building-maintainable-react-applications)

---

::: note Prerequisites: What You Should Know Before Reading This Guide

:::: tabs

@tab:active Essential React Knowledge

**React Fundamentals (Required)**

- **Functional components**: You should be comfortable writing and using React functional components
- **JSX syntax**: Understanding how to write JSX, use curly braces for JavaScript expressions, and handle events
- **Basic props**: Know how to pass and receive props between parent and child components
- **useState hook**: You should understand how `useState` works, including state updates and re-renders

```jsx
// You should be comfortable with code like this:
function MyComponent({ title }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**`useEffect` Hook (Recommended)**

- Basic understanding of side effects in React
- When and why to use `useEffect`
- How dependency arrays work
- This helps with understanding performance optimization sections

@tab JavaScript Prerequisites

**ES6+ Features (Required)**

- **Arrow Functions**: `const myFunc = () => {}`
- **Destructuring**: `const { name, age } = person` and `const [first, second] = array`
- **Spread Operator**: `...array` and `...object`
- **Template Literals**: Using backticks and `${variable}` syntax
- **Array methods**: `map()`, `filter()`, `find()`, `reduce()` - these appear frequently in state updates

```jsx
// You should understand this syntax:
const newItems = [...existingItems, newItem];
const { name, price } = product;
const updatedItems = items.map(item => 
  item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
);
```

**Asynchronous JavaScript (Helpful)**

- **Promises and async/await**: For understanding API calls in state management
- **Basic error handling**: try/catch blocks

**Objects and Arrays (Required)**

- How to create, modify, and access nested objects and arrays
- Understanding reference vs. value equality
- Why direct mutation is problematic in React

@tab React Concepts You'll Encounter

**Component Hierarchy (Required)**

- How parent and child components relate
- Data flow from parent to child
- Why data can't easily flow "sideways" between sibling components

**Re-rendering Behavior (Important)**

- When React components re-render
- Why changing state causes re-renders
- Basic understanding that creating new objects/functions causes re-renders

**Event Handling (Required)**

```jsx
// You should be comfortable with:
<button onClick={() => handleClick(item.id)}>
<input onChange={(e) => setValue(e.target.value)} />
```

::::

---

## Development Environment

### Tools You Should Have

- **React DevTools**: Browser extension for debugging React components
- **Code editor**: VS Code, WebStorm, or similar with React syntax highlighting
- **Node.js and npm/yarn**: For installing packages mentioned in examples

### Helpful but Not Required

- **TypeScript basics**: Some examples mention TypeScript benefits
- **Testing knowledge**: The testing section assumes some familiarity with Jest/React Testing Library
- **Build tools**: Basic understanding of Create React App or Vite

---

## Conceptual Understanding

### Why State Management Matters

You should have experienced or understand these pain points:

- Passing data through multiple component levels
- Keeping data synchronized across different parts of your app
- Managing complex application state

### Basic Performance Awareness

- Understanding that unnecessary re-renders can slow down apps
- Awareness that some operations are more expensive than others

---

## What You DON'T Need to Know

### Advanced React Patterns

- Higher-Order Components (HOCs)
- Render props (though we explain them in the article)
- Class components or lifecycle methods
- Advanced hooks like `useLayoutEffect` or `useImperativeHandle`

### Complex State Management

- You don't need prior experience with Redux, Context API, or other state libraries. I’ll explain everything from scratch

### Advanced JavaScript

- Closures, prototypes, or advanced functional programming concepts
- Complex async patterns beyond basic promises

---

## Self-Assessment Questions

Before diving in, ask yourself:

1. Can I build a simple React app with multiple components?
2. Do I understand how to pass data from parent to child via props?
3. Can I handle form inputs with useState?
4. Do I know when a React component re-renders?
5. Am I comfortable with array methods like `map()` and `filter()`?

If you answered "yes" to most of these, you're ready for this handbook!

---

## Recommended Preparation

**If you need to brush up on React basics:**

- Complete the official React tutorial (tic-tac-toe game)
- Build a simple todo app with local state
- Practice passing props between components

**If you need JavaScript review:**

- Practice array destructuring and spread syntax
- Review arrow functions and array methods
- Get comfortable with async/await

**Quick warm-up exercise:** Try building a simple counter app where:

- Parent component holds the count state
- Multiple child components display or modify the count
- You'll quickly see why prop drilling becomes a problem!

---

## What This Guide Will Teach You

By the end, you'll understand:

- Why and when shared state becomes complex
- How to solve prop drilling with Context API
- When to use Redux, Zustand, or other state libraries
- How to optimize performance with shared state
- Testing strategies for state management
- Best practices for maintainable code

The guide is designed to take you from "I know basic React" to "I can architect state management for complex applications" with plenty of examples and explanations along the way.

---

## Understanding the Building Blocks: Props in React

Before we get into complex state management, let's understand the fundamentals.

### What are props?

**Props** (short for "properties") are how React components communicate with each other. Think of props like passing notes between classrooms in a school - they carry information from one component to another.

```jsx :collapsed-lines
// This is a simple component that displays a person's information
function PersonCard(props) {
  // props is an object containing all the data passed to this component
  return (
    <div className="person-card">
      {/* We access the data using props.propertyName */}
      <h2>{props.name}</h2>           {/* Shows the person's name */}
      <p>Age: {props.age}</p>         {/* Shows the person's age */}
      <p>Job: {props.job}</p>         {/* Shows the person's job */}
    </div>
  );
}

// This is how we USE the PersonCard component and pass it props
function App() {
  return (
    <div>
      {/* 
        We're creating a PersonCard component and passing it three props:
        - name: "Sarah"
        - age: 28  
        - job: "Developer"
      */}
      <PersonCard 
        name="Sarah" 
        age={28} 
        job="Developer" 
      />

      {/* We can create another PersonCard with different props */}
      <PersonCard 
        name="Mike" 
        age={35} 
        job="Designer" 
      />
    </div>
  );
}
```

::: info Let's break down what's happening:

1. **PersonCard** is a function that receives `props` as its parameter
2. `props` is a JavaScript object containing all the data we passed: `{name: "Sarah", age: 28, job: "Developer"}`
3. We access individual pieces of data using dot notation: `props.name`, `props.age`, `props.job`
4. The curly braces `{}` tell React "this is JavaScript code, not regular text"
5. When we use `<PersonCard name="Sarah" age={28} job="Developer" />`, React automatically creates the props object

:::

### A more modern way: Destructuring props

Instead of writing `props.name` every time, we can use **destructuring** to extract the values directly:

```jsx
// Instead of this:
function PersonCard(props) {
  return (
    <div className="person-card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Job: {props.job}</p>
    </div>
  );
}

// We can write this (destructuring the props object):
function PersonCard({ name, age, job }) {
  // JavaScript destructuring extracts name, age, and job from the props object
  // It's like saying: "Take the props object and create separate variables"
  return (
    <div className="person-card">
      <h2>{name}</h2>        {/* No need for props.name anymore */}
      <p>Age: {age}</p>      {/* Just use the variable directly */}
      <p>Job: {job}</p>
    </div>
  );
}
```

::: info What destructuring does:

- `{ name, age, job }` tells JavaScript: "Extract the `name`, `age`, and `job` properties from the props object"
- It creates separate variables with those names
- This makes our code cleaner and easier to read

:::

---

## What is Prop Drilling and Why is it a Problem?

**Prop drilling** happens when you need to pass data through multiple layers of components, even when the middle components don't use that data. It's like playing telephone through several people who don't care about the message.

### A simple example: Passing a username

```jsx :collapsed-lines
// Let's say we want to show a user's name in a deeply nested component
function App() {
  const userName = "Alice";  // This data starts here at the top

  return (
    <div>
      <h1>My Shopping App</h1>
      {/* We pass userName down to Header */}
      <Header userName={userName} />
    </div>
  );
}

function Header({ userName }) {
  // Header receives userName but doesn't actually display it
  // It just passes it down to Navigation
  return (
    <header>
      <div className="logo">ShopSmart</div>
      {/* Header passes userName to Navigation */}
      <Navigation userName={userName} />
    </header>
  );
}

function Navigation({ userName }) {
  // Navigation also doesn't display userName
  // It just passes it down to UserMenu
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/products">Products</a>
      {/* Navigation passes userName to UserMenu */}
      <UserMenu userName={userName} />
    </nav>
  );
}

function UserMenu({ userName }) {
  // Finally! This component actually USES the userName
  return (
    <div className="user-menu">
      <span>Welcome, {userName}!</span>    {/* userName is displayed here */}
    </div>
  );
}
```

::: warning What's the problem here?

1. **Unnecessary complexity**: `Header` and `Navigation` don't care about `userName`, but they have to know about it
2. **Tight coupling**: If we want to change how `userName` works, we need to update multiple components
3. **Maintenance burden**: Adding a new piece of user data means updating four different components
4. **Confusing code**: It's hard to track where data is actually being used

:::

This is a simple example with just one piece of data. Imagine this with 5-10 different pieces of data!

### A realistic example: Shopping cart prop drilling

Now let's see how this becomes a real nightmare with a shopping cart:

```jsx :collapsed-lines
// The main App component - this is where our cart data lives
function App() {
  // useState is a React hook that creates state (data that can change)
  // It returns an array with two items:
  // 1. The current value (cartItems)
  // 2. A function to update the value (setCartItems)
  const [cartItems, setCartItems] = useState([]);  // Start with an empty array

  // Another piece of state for the total price
  const [cartTotal, setCartTotal] = useState(0);   // Start with 0

  // A function that adds items to the cart
  const addToCart = (product) => {
    // The spread operator (...) creates a new array with all existing items plus the new one
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);                    // Update the cart items
    setCartTotal(cartTotal + product.price);       // Update the total
  };

  // A function that removes items from the cart
  const removeFromCart = (productId) => {
    // filter() creates a new array with only items that don't match the ID
    const updatedItems = cartItems.filter(item => item.id !== productId);

    // find() locates the item we're removing so we can subtract its price
    const removedItem = cartItems.find(item => item.id === productId);

    setCartItems(updatedItems);                           // Update items
    setCartTotal(cartTotal - removedItem.price);          // Update total
  };

  return (
    <div className="app">
      {/* 
        We need to pass cart data to Header so it can show the cart count
        Look how many props we need to pass!
      */}
      <Header 
        cartItems={cartItems}         // Pass the entire cart array
        cartTotal={cartTotal}         // Pass the total price
        addToCart={addToCart}         // Pass the add function
        removeFromCart={removeFromCart} // Pass the remove function
      />

      {/* MainContent also needs all the cart functionality */}
      <MainContent 
        cartItems={cartItems}
        cartTotal={cartTotal}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}
```

Now let's see what happens in the Header component:

```jsx :collpased-lines
function Header({ cartItems, cartTotal, addToCart, removeFromCart }) {
  // Header receives all these props but only uses some of them
  // It needs to pass them down to other components

  return (
    <header className="header">
      <div className="logo">ShopSmart</div>

      {/* 
        Navigation needs to show cart count, so we pass cartItems
        But it doesn't need addToCart or removeFromCart
        However, we might pass them "just in case"
      */}
      <Navigation 
        cartItems={cartItems}
        cartTotal={cartTotal}
        addToCart={addToCart}           // Navigation doesn't use this
        removeFromCart={removeFromCart}  // Navigation doesn't use this either
      />

      {/* UserMenu might want to show cart total */}
      <UserMenu 
        cartTotal={cartTotal}
        addToCart={addToCart}           // UserMenu doesn't use this
        removeFromCart={removeFromCart}  // UserMenu doesn't use this either
      />
    </header>
  );
}

function Navigation({ cartItems, cartTotal, addToCart, removeFromCart }) {
  // Navigation only cares about showing the cart count
  // But it receives ALL the cart props anyway

  const itemCount = cartItems.length;  // Calculate how many items in cart

  return (
    <nav className="navigation">
      <a href="/">Home</a>
      <a href="/products">Products</a>

      {/* This is the ONLY place Navigation actually uses the cart data */}
      <a href="/cart">
        Cart 
        {/* Only show the badge if there are items */}
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </a>
    </nav>
  );
}
```

::: warning The problems are multiplying:

1. **Props pollution**: Components receive props they don't use
2. **Confusing interfaces**: It's hard to tell what each component actually needs
3. **Change ripple effects**: Modifying cart functionality might require changing 6+ components
4. **Testing complexity**: Testing Navigation requires mocking cart functions it doesn't even use
5. **Performance issues**: Changing cart data causes ALL components in the chain to re-render

:::

### Why does this happen and get worse

This pattern emerges naturally because:

1. **React is one-way data flow**: Data can only flow down from parent to child
2. **Component hierarchy**: Your UI structure determines your data flow
3. **No built-in sharing mechanism**: React doesn't provide a way for distant components to share data directly

As your app grows, you end up with:

- 10+ props being passed through 5+ levels
- Components that exist just to pass props along
- Developers afraid to refactor because they might break the prop chain
- New features requiring changes to unrelated components

---

## Solution 1: React Context API - Understanding the Concept

The **Context API** is React's built-in solution for sharing data between components without prop drilling. Think of it like a radio station that broadcasts information, and any component can tune in to listen.

### The radio station analogy

**Traditional prop drilling** is like passing a note through a chain of people:

- Person A tells Person B
- Person B tells Person C
- Person C tells Person D
- Only Person D actually needs the information

**React Context** is like a radio broadcast:

- The radio station broadcasts information
- Anyone with a radio can listen directly
- No need to pass messages through intermediaries

### What is `createContext()`?

`createContext()` is a React function that creates a "broadcasting system" for your data. It returns two things:

1. **Provider**: The "radio station" that broadcasts data
2. **Consumer**: The "radio" that components use to listen for data

```jsx
import { createContext } from 'react';

// createContext() creates our "radio station"
// We can pass a default value (like a default radio frequency)
const CartContext = createContext();

// CartContext now contains:
// - CartContext.Provider (the broadcaster)
// - CartContext.Consumer (the listener, though we rarely use this directly)
```

::: info What <code>createContext()</code> actually does:

- Creates a special React object that can share data
- The default value is used when a component tries to access the context but isn't inside a Provider
- Returns an object with Provider and Consumer components

:::

### Creating a basic Context Provider

A **Provider** is a component that makes data available to all its children:

```jsx :collapsed-lines
import { createContext, useState } from 'react';

// Step 1: Create the context
const CartContext = createContext();

// Step 2: Create a Provider component
function CartProvider({ children }) {
  // children is a special prop that contains whatever components are inside CartProvider

  // This is our cart state - same as before
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Our cart functions
  const addToCart = (product) => {
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
    setCartTotal(cartTotal + product.price);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    const removedItem = cartItems.find(item => item.id === productId);

    setCartItems(updatedItems);
    if (removedItem) {  // Make sure we found the item before subtracting
      setCartTotal(cartTotal - removedItem.price);
    }
  };

  // This object contains everything we want to share
  const cartValue = {
    cartItems,      // The array of items
    cartTotal,      // The total price
    addToCart,      // Function to add items
    removeFromCart, // Function to remove items
    itemCount: cartItems.length  // Calculated value for convenience
  };

  return (
    /* 
      CartContext.Provider is the "radio station"
      - value prop is what gets "broadcasted"
      - children are all the components that can "listen" to this broadcast
    */
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}
```

::: info Let's break down this Provider:

1. **Function component**: `CartProvider` is just a regular React component
2. **children prop**: This contains whatever JSX is placed inside `<CartProvider>...</CartProvider>`
3. **State management**: We manage cart state exactly like before with `useState`
4. **value prop**: This is crucial - whatever we put here becomes available to all child components
5. **Return JSX**: We wrap `children` in `CartContext.Provider` to "broadcast" our data

:::

### Understanding the `useContext` hook

`useContext` is a React hook that lets components "tune in" to a Context broadcast:

```jsx :collapsed-lines
import { useContext } from 'react';

function CartBadge() {
  // useContext(CartContext) "tunes in" to our cart data
  // It returns whatever we put in the value prop of CartProvider
  const cartData = useContext(CartContext);

  // cartData now contains: { cartItems, cartTotal, addToCart, removeFromCart, itemCount }

  return (
    <div className="cart-badge">
      {/* We can access any property from our cartValue object */}
      <span>Cart ({cartData.itemCount})</span>
    </div>
  );
}
```

::: info What <code>useContext()</code> does:

1. **Looks up the component tree**: Finds the nearest CartContext.Provider
2. **Returns the value**: Gives us whatever was passed to the value prop
3. **Automatically re-renders**: When the context value changes, this component updates
4. **Throws an error**: If no Provider is found, it returns the default value (or undefined)

:::

### Creating a custom hook for cleaner usage

Instead of using `useContext(CartContext)` everywhere, we can create a custom hook:

```jsx :collapsed-lines
// Custom hook that wraps useContext
function useCart() {
  // Get the cart data from context
  const context = useContext(CartContext);

  // Check if we're inside a CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

// Now components can use our custom hook
function CartBadge() {
  const { itemCount } = useCart();  // Much cleaner!

  return (
    <div className="cart-badge">
      <span>Cart ({itemCount})</span>
    </div>
  );
}
```

::: note There are various reasons to create a custom hook:

1. **Better error messages**: We get a clear error if someone forgets the Provider
2. **Cleaner imports**: Import `useCart` instead of `useContext` and `CartContext`
3. **Future flexibility**: We can add logic to the hook later if needed
4. **Type safety**: In TypeScript, this provides better type inference

:::

### Putting it all together: Complete Context example

Now let's see how our shopping cart looks with Context instead of prop drilling:

```jsx :collapsed-lines
import { createContext, useContext, useState } from 'react';

// Step 1: Create the context
const CartContext = createContext();

// Step 2: Create custom hook
function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Step 3: Create the Provider
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (product) => {
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
    setCartTotal(cartTotal + product.price);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    const removedItem = cartItems.find(item => item.id === productId);

    setCartItems(updatedItems);
    if (removedItem) {
      setCartTotal(cartTotal - removedItem.price);
    }
  };

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    itemCount: cartItems.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Step 4: Use the context in components
function App() {
  return (
    // Wrap our app in the CartProvider
    <CartProvider>
      <div className="app">
        {/* No props needed! */}
        <Header />
        <MainContent />
      </div>
    </CartProvider>
  );
}

function Header() {
  // Header doesn't need any cart props
  return (
    <header className="header">
      <div className="logo">ShopSmart</div>
      <Navigation />  {/* No props passed here either */}
      <UserMenu />
    </header>
  );
}

function Navigation() {
  // Navigation gets cart data directly from context
  const { itemCount } = useCart();

  return (
    <nav className="navigation">
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/cart">
        Cart 
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </a>
    </nav>
  );
}

function ProductCard({ product }) {
  // ProductCard gets the addToCart function directly
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>

      {/* No prop drilling needed! */}
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartSidebar() {
  // CartSidebar gets cart items and remove function directly
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-sidebar">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Export our Provider and hook for use in other files
export { CartProvider, useCart };
```

::: info Compare this to our prop drilling version:

:::: tabs

@tab:active Before (Prop Drilling):

- App passes 4 props to Header
- Header passes 4 props to Navigation (even though Navigation only needs 1)
- Navigation receives props it doesn't use
- Every component in the chain needs to know about cart structure

@tab After (Context):

- App only needs to wrap components in CartProvider
- Header doesn't handle any cart props
- Navigation directly gets only what it needs (`itemCount`)
- ProductCard directly gets only what it needs (`addToCart`)
- Each component is independent and focused

:::

---

## Advanced Context Patterns and Concepts

Now that you understand the basics, let's explore more sophisticated Context patterns that you'll encounter in real applications.

### Multiple contexts for separation of concerns

In real applications, you don't want to put everything in one giant context. Instead, you can create separate contexts for different domains:

```jsx :collapsed-lines
// Separate contexts for different types of data
const UserContext = createContext();     // User authentication and profile
const ThemeContext = createContext();    // UI theme and appearance  
const CartContext = createContext();     // Shopping cart functionality

// User Provider - handles authentication
function UserProvider({ children }) {
  const [user, setUser] = useState(null);           // Current user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  // Function to log in a user
  const login = async (email, password) => {
    try {
      // authAPI would be your authentication service (like Firebase, Auth0, etc.)
      const userData = await authAPI.login(email, password);
      setUser(userData);        // Store user information
      setIsLoggedIn(true);      // Mark as logged in
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login errors (show message to user, etc.)
    }
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);            // Clear user data
    setIsLoggedIn(false);     // Mark as logged out
    // You might also clear localStorage, redirect to login page, etc.
  };

  const value = {
    user,         // Current user object: { id, name, email, etc. }
    isLoggedIn,   // Boolean: true if user is logged in
    login,        // Function to log in
    logout,       // Function to log out
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Theme Provider - handles UI appearance
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');      // 'light' or 'dark'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'

  // Function to switch between light and dark themes
  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };

  // Function to update font size
  const updateFontSize = (size) => {
    if (['small', 'medium', 'large'].includes(size)) {
      setFontSize(size);
    }
  };

  const value = {
    theme,          // Current theme: 'light' or 'dark'
    fontSize,       // Current font size: 'small', 'medium', or 'large'
    toggleTheme,    // Function to switch themes
    updateFontSize, // Function to change font size
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hooks for each context
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// App with multiple providers
function App() {
  return (
    // You can nest providers in any order
    // Each provider makes its data available to all children
    <UserProvider>
      <ThemeProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Component using multiple contexts
function UserProfile() {
  const { user, logout } = useUser();           // Get user data
  const { theme, toggleTheme } = useTheme();    // Get theme data
  const { itemCount } = useCart();              // Get cart data

  return (
    <div className={`user-profile theme-${theme}`}>
      <h2>Welcome, {user?.name}!</h2>
      <p>Items in cart: {itemCount}</p>

      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
```

So why should you use separate contexts? First, performance considerations: components only re-render when the specific context they use changes. Second, it’s helpful for organizational purposes as related functionality is grouped together. It’s also great for reusability, as you can use UserProvider in different apps without cart functionality. And finally, it’s easier to test components that only depend on specific contexts.

### Understanding `useReducer` for complex state logic

When your context state becomes complex with multiple related values and complex update logic, `useReducer` is often a better choice than multiple `useState` calls.

#### What is `useReducer`?

`useReducer` is a React hook that manages state through a "reducer" function. Instead of directly setting state, you "dispatch actions" that describe what happened, and the reducer decides how to update the state.

Think of it like a vending machine:

- You press buttons (dispatch actions) to describe what you want
- The machine has internal logic (reducer) that determines what happens
- The machine gives you the result (new state)

```jsx :collapsed-lines
// First, let's define what actions our cart can handle
const cartActions = {
  ADD_ITEM: 'ADD_ITEM',           // Add a product to cart
  REMOVE_ITEM: 'REMOVE_ITEM',     // Remove a product completely
  UPDATE_QUANTITY: 'UPDATE_QUANTITY', // Change quantity of existing item
  CLEAR_CART: 'CLEAR_CART',       // Empty the entire cart
  APPLY_DISCOUNT: 'APPLY_DISCOUNT' // Apply a discount code
};

// The reducer function: decides how state changes based on actions
function cartReducer(state, action) {
  // state: current cart state
  // action: object describing what happened, like { type: 'ADD_ITEM', payload: product }

  switch (action.type) {
    case cartActions.ADD_ITEM: {
      const product = action.payload;  // The product being added

      // Check if this product is already in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Product exists: increase its quantity
        const updatedItems = [...state.items];  // Create a copy of items array
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],    // Copy existing item properties
          quantity: updatedItems[existingItemIndex].quantity + 1  // Increase quantity
        };

        return {
          ...state,                              // Keep other state properties
          items: updatedItems,                   // Update items array
          total: state.total + product.price,   // Add to total
          itemCount: state.itemCount + 1,       // Increase count
        };
      } else {
        // New product: add it to cart
        const newItem = { 
          ...product,     // Copy all product properties (id, name, price, and so on)
          quantity: 1     // Add quantity property
        };

        return {
          ...state,                                    // Keep other state properties
          items: [...state.items, newItem],           // Add new item to array
          total: state.total + product.price,         // Add to total
          itemCount: state.itemCount + 1,             // Increase count
        };
      }
    }

    case cartActions.REMOVE_ITEM: {
      const productId = action.payload;  // ID of product to remove

      // Find the item being removed
      const itemToRemove = state.items.find(item => item.id === productId);

      // If item doesn't exist, return state unchanged
      if (!itemToRemove) return state;

      // Remove the item from the array
      const updatedItems = state.items.filter(item => item.id !== productId);

      return {
        ...state,
        items: updatedItems,
        // Subtract the total price of removed item (price × quantity)
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        // Subtract the quantity of removed item
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }

    case cartActions.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;

      // If quantity is 0 or less, remove the item
      if (quantity <= 0) {
        return cartReducer(state, {
          type: cartActions.REMOVE_ITEM,
          payload: productId
        });
      }

      const updatedItems = state.items.map(item => {
        if (item.id === productId) {
          return { ...item, quantity };  // Update this item's quantity
        }
        return item;  // Keep other items unchanged
      });

      // Find the item to calculate price difference
      const item = state.items.find(item => item.id === productId);
      if (!item) return state;  // Item not found, no change

      const quantityDifference = quantity - item.quantity;

      return {
        ...state,
        items: updatedItems,
        total: state.total + (item.price * quantityDifference),
        itemCount: state.itemCount + quantityDifference,
      };
    }

    case cartActions.CLEAR_CART: {
      // Reset everything to initial state
      return {
        items: [],
        total: 0,
        itemCount: 0,
        discount: 0,
      };
    }

    case cartActions.APPLY_DISCOUNT: {
      const discountPercent = action.payload;  // Discount percentage (for example, 10 for 10%)
      const discountAmount = state.total * (discountPercent / 100);

      return {
        ...state,
        discount: discountAmount,
      };
    }

    default:
      // If we don't recognize the action type, return state unchanged
      return state;
  }
}

// Updated CartProvider using useReducer
function CartProvider({ children }) {
  // Initial state for our cart
  const initialState = {
    items: [],       // Array of cart items
    total: 0,        // Total price before discount
    itemCount: 0,    // Total number of items
    discount: 0,     // Discount amount
  };

  // useReducer takes two arguments:
  // 1. The reducer function (cartReducer)
  // 2. The initial state
  // It returns:
  // 1. Current state
  // 2. Dispatch function to send actions
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action creator functions - these create action objects
  const addItem = (product) => {
    dispatch({
      type: cartActions.ADD_ITEM,    // What happened
      payload: product               // The data needed
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: cartActions.REMOVE_ITEM,
      payload: productId
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: cartActions.UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  const applyDiscount = (discountPercent) => {
    dispatch({
      type: cartActions.APPLY_DISCOUNT,
      payload: discountPercent
    });
  };

  // Calculate final total (total minus discount)
  const finalTotal = state.total - state.discount;

  const value = {
    // State values
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    discount: state.discount,
    finalTotal,

    // Action functions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

::: info <code>useReducer</code> has various benefits over multiple <code>useState</code>:

1. **Centralized logic**: All cart update logic is in one place (the reducer)
2. **Predictable updates**: Actions describe what happened, reducer decides how to update
3. **Easier testing**: You can test the reducer function independently
4. **Better for complex state**: When state has multiple related values that change together
5. **Debugging**: You can log all actions to see exactly what happened

:::

---

## Solution 2: State Management Libraries Explained

While React Context is great for medium-complexity applications, larger applications often benefit from dedicated state management libraries. Let's explore the most popular options.

### Understanding Redux: The predictable state container

**Redux** is a library that provides a single, centralized store for all your application state. Think of it like a giant database that your entire app shares, with strict rules about how data can be changed.

#### Core Redux concepts

**1. Store**: The single source of truth for your app's state

```jsx
// The store is like a database that holds ALL your app's state
import { createStore } from 'redux';

// Example of what your entire app state might look like
const initialAppState = {
  user: {
    id: null,
    name: '',
    email: '',
    isLoggedIn: false
  },
  cart: {
    items: [],
    total: 0,
    discount: 0
  },
  ui: {
    theme: 'light',
    sidebarOpen: false,
    loading: false
  }
};

// The store holds this state and provides methods to interact with it
const store = createStore(rootReducer, initialAppState);

// You can get the current state at any time
const currentState = store.getState();
console.log(currentState.cart.items);  // Access cart items
console.log(currentState.user.name);   // Access user name
```

**2. Actions**: Plain objects that describe what happened

```jsx :collapsed-lines
// Actions are like event descriptions - they tell Redux what happened
// They must have a 'type' property and optionally a 'payload'

// Action to add item to cart
const addItemAction = {
  type: 'cart/addItem',              // Describes what happened
  payload: {                        // The data needed
    id: 1,
    name: 'T-Shirt',
    price: 25
  }
};

// Action to log in user
const loginAction = {
  type: 'user/login',
  payload: {
    id: 123,
    name: 'Alice',
    email: 'alice@example.com'
  }
};

// Action to toggle theme
const toggleThemeAction = {
  type: 'ui/toggleTheme'            // No payload needed
};

// Action creators: functions that create actions
function addItem(product) {
  return {
    type: 'cart/addItem',
    payload: product
  };
}

function loginUser(userData) {
  return {
    type: 'user/login',
    payload: userData
  };
}

// Usage
const action = addItem({ id: 1, name: 'T-Shirt', price: 25 });
console.log(action);  // { type: 'cart/addItem', payload: { ... } }
```

**3. Reducers**: Pure functions that specify how state changes

```jsx :collapsed-lines
// A reducer is a function that takes current state and an action,
// and returns new state. It must NEVER modify the existing state.

function cartReducer(state = { items: [], total: 0 }, action) {
  // state: current cart state
  // action: the action object describing what happened

  switch (action.type) {
    case 'cart/addItem': {
      const product = action.payload;

      // NEVER modify existing state directly!
      // Instead, create new objects/arrays
      return {
        ...state,                                    // Copy existing state
        items: [...state.items, product],           // Create new items array
        total: state.total + product.price          // Calculate new total
      };
    }

    case 'cart/removeItem': {
      const productId = action.payload;
      const itemToRemove = state.items.find(item => item.id === productId);

      return {
        ...state,
        items: state.items.filter(item => item.id !== productId),  // New array without item
        total: state.total - (itemToRemove?.price || 0)           // Subtract price
      };
    }

    default:
      // Always return current state for unknown actions
      return state;
  }
}

function userReducer(state = { id: null, name: '', isLoggedIn: false }, action) {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        ...action.payload,    // Merge user data from payload
        isLoggedIn: true      // Set login status
      };

    case 'user/logout':
      return {
        id: null,
        name: '',
        email: '',
        isLoggedIn: false
      };

    default:
      return state;
  }
}

// Root reducer: combines all reducers
function rootReducer(state = {}, action) {
  return {
    cart: cartReducer(state.cart, action),    // Handle cart actions
    user: userReducer(state.user, action),    // Handle user actions
  };
}
```

**4. Dispatch**: The only way to trigger state changes

```jsx :collapsed-lines
// You can't change Redux state directly
// Instead, you dispatch actions to describe what should happen

// Get the store's dispatch function
const { dispatch } = store;

// Dispatch actions to change state
dispatch(addItem({ id: 1, name: 'T-Shirt', price: 25 }));
dispatch(loginUser({ id: 123, name: 'Alice', email: 'alice@example.com' }));
dispatch({ type: 'user/logout' });

// Each dispatch triggers the reducer, which returns new state
```

#### How to use Redux in React components

To use Redux in React, you need the `react-redux` library, which provides two main tools:

**1. Provider**: Makes the store available to all components

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Create your Redux store
const store = createStore(rootReducer);

function App() {
  return (
    // Provider makes the store available to all child components
    <Provider store={store}>
      <div className="app">
        <Header />
        <ProductList />
        <Cart />
      </div>
    </Provider>
  );
}
```

**2. `useSelector` and `useDispatch` hooks**

```jsx :collapsed-lines
import { useSelector, useDispatch } from 'react-redux';

function ProductCard({ product }) {
  // useSelector extracts data from the Redux store
  // The function you pass gets the entire state object
  const cartItems = useSelector(state => state.cart.items);

  // useDispatch returns the dispatch function
  const dispatch = useDispatch();

  // Check if this product is already in cart
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    // Dispatch an action to add item
    dispatch(addItem(product));
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>

      <button 
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

function CartSummary() {
  // Select multiple pieces of state
  const { items, total } = useSelector(state => ({
    items: state.cart.items,
    total: state.cart.total
  }));

  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
  };

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total: ${total.toFixed(2)}</p>

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => handleRemoveItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Redux Toolkit: Modern Redux made simple

**Redux Toolkit** is the official, recommended way to write Redux logic. It simplifies Redux by providing utilities that reduce boilerplate code.

#### What Redux Toolkit provides

1. **createSlice**: Generates action creators and reducers automatically
2. **configureStore**: Sets up the store with good defaults
3. **Immer integration**: Lets you write "mutative" logic that's actually immutable

```jsx :collapsed-lines
import { createSlice, configureStore } from '@reduxjs/toolkit';

// createSlice generates action creators and reducers automatically
const cartSlice = createSlice({
  name: 'cart',                     // Name for this slice of state

  initialState: {                   // Initial state value
    items: [],
    total: 0
  },

  reducers: {                       // Reducer functions
    // Redux Toolkit uses Immer internally, so we can "mutate" state
    // (It's actually creating immutable updates behind the scenes)

    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;              // This looks like mutation!
      } else {
        state.items.push({                       // This looks like mutation!
          ...product, 
          quantity: 1 
        });
      }

      state.total += product.price;              // This looks like mutation!
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === productId);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.total -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);        // Remove from array
      }
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;                // Update quantity
        state.total += item.price * quantityDiff; // Update total
      }
    }
  }
});

// Export action creators (automatically generated by createSlice)
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Create the store with configureStore
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,        // Add cart reducer to store
    // You can add more reducers here
  }
});

// Usage in components (same as regular Redux)
function ShoppingCart() {
  // Note: state.cart because we named it 'cart' in configureStore
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total: ${total.toFixed(2)}</p>

      {items.map(item => (
        <div key={item.id}>
          <span>{item.name} - Qty: {item.quantity}</span>

          <button onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>

          <input 
            type="number" 
            value={item.quantity}
            onChange={(e) => dispatch(updateQuantity({
              productId: item.id, 
              quantity: parseInt(e.target.value)
            }))}
          />
        </div>
      ))}
    </div>
  );
}
```

Redux Toolkit is better than vanilla Redux for a few key reasons:

1. **Less boilerplate**: No need to write action creators manually
2. **Immer integration**: Write code that looks like mutations but is actually immutable
3. **Better defaults**: configureStore includes useful middleware automatically
4. **TypeScript friendly**: Better type inference and support
5. **DevTools included**: Redux DevTools work automatically

### Zustand: Simple and flexible state management

**Zustand** is a lightweight state management library that's much simpler than Redux but more powerful than Context for complex state.

```jsx :collapsed-lines
import { create } from 'zustand';

// Create a store with state and actions in one place
const useCartStore = create((set, get) => ({
  // Initial state
  items: [],
  total: 0,

  // Actions (functions that update state)
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);

    if (existingItem) {
      // Update existing item quantity
      return {
        items: state.items.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.total + product.price
      };
    } else {
      // Add new item
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        total: state.total + product.price
      };
    }
  }),

  removeItem: (productId) => set((state) => {
    const itemToRemove = state.items.find(item => item.id === productId);
    if (!itemToRemove) return state;

    return {
      items: state.items.filter(item => item.id !== productId),
      total: state.total - (itemToRemove.price * itemToRemove.quantity)
    };
  }),

  clearCart: () => set({ items: [], total: 0 }),

  // Computed values (getters)
  get itemCount() {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));

// Usage in components - very clean
function ProductCard({ product }) {
  // Only get the function we need
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartBadge() {
  // Only get the computed value we need
  const itemCount = useCartStore(state => state.itemCount);

  return (
    <div className="cart-badge">
      Cart ({itemCount})
    </div>
  );
}

function CartList() {
  // Get multiple values at once
  const { items, total, removeItem } = useCartStore(state => ({
    items: state.items,
    total: state.total,
    removeItem: state.removeItem
  }));

  return (
    <div className="cart-list">
      <h3>Your Cart - Total: ${total.toFixed(2)}</h3>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

::: info What makes Zustand special

1. **No boilerplate**: Define state and actions in one place
2. **No providers**: No need to wrap your app in a Provider component
3. **TypeScript friendly**: Excellent TypeScript support out of the box
4. **Small bundle**: Much smaller than Redux
5. **Simple mental model**: Just hooks that return state and functions

:::

#### Advanced Zustand patterns

Persistence and middleware:

```jsx :collapsed-lines
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Store with localStorage persistence and Redux DevTools
const useCartStore = create(
  devtools(                        // Adds Redux DevTools support
    persist(                       // Adds localStorage persistence
      (set, get) => ({
        items: [],
        total: 0,

        addItem: (product) => set(
          (state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
            total: state.total + product.price
          }),
          false,                   // Don't replace entire state
          'cart/addItem'           // Action name for dev tools
        ),

        removeItem: (productId) => set(
          (state) => {
            const itemToRemove = state.items.find(item => item.id === productId);
            return {
              items: state.items.filter(item => item.id !== productId),
              total: state.total - (itemToRemove?.price || 0)
            };
          },
          false,
          'cart/removeItem'
        )
      }),
      {
        name: 'cart-storage',      // localStorage key
        getStorage: () => localStorage, // Storage method
      }
    )
  )
);

// Subscriptions for side effects
useCartStore.subscribe(
  (state) => state.items,          // Watch items array
  (items) => {                     // Callback when items change
    console.log('Cart items updated:', items);

    // Update browser tab title
    document.title = `Shopping (${items.length}) - MyStore`;

    // Track analytics
    analytics.track('Cart Updated', {
      itemCount: items.length,
      cartValue: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });
  }
);
```

---

## Performance Optimization Strategies Explained

Shared state can cause performance issues when components re-render unnecessarily. Let's understand why this happens and how to prevent it.

### Why do unnecessary re-renders happen?

**Here’s the fundamental issue**: in React, when state changes, all components that use that state re-render, even if they don't actually display the changed data.

```jsx :collapsed-lines
// Problem: This context causes ALL consumers to re-render when ANY value changes
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', email: 'alice@example.com' });
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [theme, setTheme] = useState('light');

  // When ANY of these values change, ALL components using useContext(AppContext) re-render
  const value = {
    user, setUser,
    cart, setCart, 
    theme, setTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// This component only cares about theme, but re-renders when user or cart change
function ThemeToggle() {
  const { theme, setTheme } = useContext(AppContext);  // Gets ALL context data

  console.log('ThemeToggle rendering');  // This logs every time ANY context value changes

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### Solution 1: Split contexts to minimize re-renders

You can split large contexts into smaller, focused ones like this:

```jsx :collapsed-lines
// Instead of one large context, create separate contexts
const UserContext = createContext();
const CartContext = createContext();  
const ThemeContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', email: 'alice@example.com' });

  // Only components using UserContext re-render when user changes
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Only components using ThemeContext re-render when theme changes
  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Now ThemeToggle only re-renders when theme changes
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);  // Only theme data

  console.log('ThemeToggle rendering');  // Only logs when theme changes

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### Solution 2: Memoize context values to prevent object recreation

The problem is that creating new objects in render causes unnecessary re-renders:

```jsx :collapsed-lines
// ❌ WRONG: Creates new objects every render
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <CartContext.Provider value={{
      // This creates a NEW object every time CartProvider renders!
      items,                      // Same value, but new object reference
      total,                      // Same value, but new object reference
      addItem: (item) => {        // NEW function every render!
        setItems([...items, item]);
      },
      removeItem: (id) => {       // NEW function every render!
        setItems(items.filter(item => item.id !== id));
      }
    }}>
      {children}
    </CartContext.Provider>
  );
}
```

This is bad because React uses `Object.is()` to compare context values. Even if the data is the same, a new object means all consumers re-render.

```jsx :collapsed-lines
// ✅ CORRECT: Memoize the context value
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // useCallback memoizes functions - they only change when dependencies change
  const addItem = useCallback((item) => {
    setItems(prevItems => [...prevItems, item]);  // Use function update
  }, []);  // Empty dependency array means this function never changes

  const removeItem = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  // useMemo memoizes the context value object
  const value = useMemo(() => ({
    items,
    total,
    addItem,
    removeItem
  }), [items, total, addItem, removeItem]);  // Only create new object when these change

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

::: info What useCallback and useMemo do:

- `useCallback(fn, deps)`: Returns a memoized function that only changes when dependencies change
- `useMemo(fn, deps)`: Returns a memoized value that only recalculates when dependencies change

:::

### Solution 3: Select only what you need

With Redux/Zustand, make sure you’re selective about what data you subscribe to:

```jsx :collapsed-lines
// ❌ WRONG: Component re-renders when ANY cart data changes
function CartBadge() {
  const { items, total, addItem, removeItem } = useCartStore();  // Gets everything!

  // This component only shows item count, but re-renders when total changes
  return (
    <div className="cart-badge">
      Cart ({items.length})
    </div>
  );
}

// ✅ CORRECT: Only subscribe to what you need
function CartBadge() {
  // Only re-renders when items array changes
  const itemCount = useCartStore(state => state.items.length);

  return (
    <div className="cart-badge">
      Cart ({itemCount})
    </div>
  );
}

// ✅ EVEN BETTER: Use a selector for computed values
function CartBadge() {
  // Only re-renders when the computed itemCount changes
  const itemCount = useCartStore(state => 
    state.items.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <div className="cart-badge">
      Cart ({itemCount})
    </div>
  );
}
```

### Solution 4: Use React.memo for expensive components

**`React.memo`** prevents component re-renders when props haven't changed:

```jsx :collapsed-lines
// Expensive component that does heavy calculations
function ExpensiveProductList({ products, onAddToCart }) {
  console.log('ExpensiveProductList rendering');  // This should log rarely

  // Simulate expensive calculation
  const processedProducts = products.map(product => ({
    ...product,
    discountedPrice: product.price * 0.9,
    categories: product.categories.sort(),
    // ... more expensive operations
  }));

  return (
    <div className="product-list">
      {processedProducts.map(product => (
        <div key={product.id} className="product">
          <h3>{product.name}</h3>
          <p>Price: ${product.discountedPrice}</p>
          <button onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// ❌ Without memo: Re-renders every time parent renders
export default ExpensiveProductList;

// ✅ With memo: Only re-renders when props actually change
export default React.memo(ExpensiveProductList);

// ✅ With custom comparison: You control when it re-renders
export default React.memo(ExpensiveProductList, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (re-render)

  return (
    prevProps.products.length === nextProps.products.length &&
    prevProps.onAddToCart === nextProps.onAddToCart
  );
});
```

### Solution 5: Optimize with custom selector hooks

You can create reusable selector hooks for common patterns:

```jsx :collapsed-lines
// Custom hook that memoizes selectors
function useCartSelector(selector) {
  const selectedValue = useCartStore(selector);

  // The selector itself should be memoized to prevent unnecessary re-renders
  return useMemo(() => selectedValue, [selectedValue]);
}

// Pre-defined selectors for common use cases
const selectItemCount = (state) => state.items.length;
const selectTotal = (state) => state.total;
const selectIsEmpty = (state) => state.items.length === 0;
const selectItemById = (id) => (state) => state.items.find(item => item.id === id);

// Usage in components
function CartBadge() {
  const itemCount = useCartStore(selectItemCount);  // Only re-renders when count changes

  return (
    <span className="cart-badge">{itemCount}</span>
  );
}

function CartTotal() {
  const total = useCartStore(selectTotal);  // Only re-renders when total changes

  return (
    <div className="cart-total">
      Total: ${total.toFixed(2)}
    </div>
  );
}

function ProductInCart({ productId }) {
  // This selector is created with the specific productId
  const selectThisItem = useMemo(
    () => (state) => state.items.find(item => item.id === productId),
    [productId]
  );

  const item = useCartStore(selectThisItem);

  return (
    <div>
      {item ? `In cart: ${item.quantity}` : 'Not in cart'}
    </div>
  );
}
```

---

## Testing Shared State: A Comprehensive Approach

Testing shared state requires different approaches than testing isolated components. Let's explore why this is more complex and what specific strategies we need.

### Why shared state testing is different

When testing isolated components, you typically pass props directly to the component, mock external dependencies, and test the component's output based on specific inputs.

But with shared state, you face additional challenges:

- **Dependencies on external state**: Components depend on Context, Redux stores, or global state that must be provided
- **State synchronization**: You need to test that multiple components stay in sync when state changes
- **Provider setup**: Components using Context will crash without proper Provider wrappers
- **State mutations**: Testing that state updates correctly across multiple components
- **Integration behavior**: Ensuring the entire state management system works together

This means you’ll need different testing strategies. You’ll need to provide the correct state management infrastructure, test how changes in one component affect others, gracefully handle loading states, errors, and async operations, and test that optimizations work correctly.

Let's explore each approach thoroughly.

### Testing React Context

**The challenge**: Components using Context need a Provider to work, and you need to test both the Context logic and component behavior.

::: imporatant Why Context testing is unique:

Unlike regular components that receive props directly, Context consumers depend on a Provider being present in the component tree. This creates several testing challenges:

1. Components will crash if used outside a Provider
2. Each test needs its own Provider instance to avoid test interference
3. You need to test that Provider and Consumer work together correctly
4. Testing `useContext` hooks requires special setup

:::

Let’s see some strategies specific to Context.

#### Setting up Context tests

```jsx :collapsed-lines
import { render, screen, fireEvent } from '@testing-library/react';
import { createContext, useContext, useState } from 'react';

// Our Context setup (same as before)
const CartContext = createContext();

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (product) => {
    setItems(prev => [...prev, product]);
    setTotal(prev => prev + product.price);
  };

  const removeItem = (productId) => {
    setItems(prev => {
      const updatedItems = prev.filter(item => item.id !== productId);
      const removedItem = prev.find(item => item.id === productId);

      if (removedItem) {
        setTotal(current => current - removedItem.price);
      }

      return updatedItems;
    });
  };

  const value = { items, total, addItem, removeItem };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Test component that uses our Context
function TestCartComponent() {
  const { items, total, addItem, removeItem } = useCart();

  return (
    <div>
      <div data-testid="item-count">{items.length}</div>
      <div data-testid="total">${total.toFixed(2)}</div>

      <button 
        onClick={() => addItem({ id: 1, name: 'Test Product', price: 10 })}
        data-testid="add-item"
      >
        Add Item
      </button>

      {items.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          <span>{item.name}</span>
          <button 
            onClick={() => removeItem(item.id)}
            data-testid={`remove-${item.id}`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

// Helper function to render components with CartProvider
function renderWithCartProvider(component) {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
}
```

#### Writing Context tests:

```jsx
describe('Cart Context functionality', () => {
  test('should start with empty cart', () => {
    renderWithCartProvider(<TestCartComponent />);

    // Check initial state
    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total')).toHaveTextContent('$0.00');
  });

  test('should add item to cart', () => {
    renderWithCartProvider(<TestCartComponent />);

    // Click the add button
    const addButton = screen.getByTestId('add-item');
    fireEvent.click(addButton);

    // Verify item was added
    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total')).toHaveTextContent('$10.00');
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('should remove item from cart', () => {
    renderWithCartProvider(<TestCartComponent />);

    // Add item first
    fireEvent.click(screen.getByTestId('add-item'));

    // Verify item is there
    expect(screen.getByTestId('item-count')).toHaveTextContent('1');

    // Remove the item
    fireEvent.click(screen.getByTestId('remove-1'));

    // Verify item was removed
    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total')).toHaveTextContent('$0.00');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();
  });

  test('should handle multiple items', () => {
    renderWithCartProvider(<TestCartComponent />);

    // Add multiple items
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('add-item'));

    // Verify count and total
    expect(screen.getByTestId('item-count')).toHaveTextContent('3');
    expect(screen.getByTestId('total')).toHaveTextContent('$30.00');
  });

  test('should throw error when used outside provider', () => {
    // Mock console.error to avoid error output in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // This should throw an error
    expect(() => {
      render(<TestCartComponent />);  // No CartProvider wrapper
    }).toThrow('useCart must be used within a CartProvider');

    consoleSpy.mockRestore();
  });

  test('should handle edge cases', () => {
    renderWithCartProvider(<TestCartComponent />);

    // Try to remove item that doesn't exist
    const initialCount = screen.getByTestId('item-count').textContent;

    // This shouldn't crash or change anything
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('remove-999'));  // Non-existent item

    // Count should still be 1
    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
  });
});
```

#### Testing Context with different initial states:

```jsx :collapsed-lines
// Custom Provider for testing with specific initial state
function TestCartProvider({ children, initialItems = [], initialTotal = 0 }) {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);

  // Same logic as CartProvider
  const addItem = (product) => {
    setItems(prev => [...prev, product]);
    setTotal(prev => prev + product.price);
  };

  const removeItem = (productId) => {
    setItems(prev => {
      const updatedItems = prev.filter(item => item.id !== productId);
      const removedItem = prev.find(item => item.id === productId);

      if (removedItem) {
        setTotal(current => current - removedItem.price);
      }

      return updatedItems;
    });
  };

  const value = { items, total, addItem, removeItem };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

describe('Cart Context with initial state', () => {
  test('should work with pre-populated cart', () => {
    const initialItems = [
      { id: 1, name: 'Existing Product', price: 15 },
      { id: 2, name: 'Another Product', price: 25 }
    ];

    render(
      <TestCartProvider initialItems={initialItems} initialTotal={40}>
        <TestCartComponent />
      </TestCartProvider>
    );

    // Should show existing items
    expect(screen.getByTestId('item-count')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('$40.00');
    expect(screen.getByText('Existing Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
  });
});
```

### Testing Redux stores

::: important Why Redux testing requires different approaches:

Redux introduces a predictable but complex state management system that needs testing at multiple levels:

1. **Pure function testing**: Reducers are pure functions that can be tested in isolation
2. **Action creator testing**: Ensuring actions are created correctly
3. **Connected component testing**: Components that use `useSelector` and `useDispatch` need store setup
4. **Integration testing**: Testing the entire Redux flow from action dispatch to state update to component re-render
5. **Async action testing**: Testing thunks, sagas, or other async middleware

:::

Redux testing focuses on three areas: action creators, reducers, and connected components.

#### Testing reducers (pure functions):

```jsx :collapsed-lines
import cartReducer, { addItem, removeItem, updateQuantity } from './cartSlice';

describe('Cart reducer', () => {
  const initialState = {
    items: [],
    total: 0,
    itemCount: 0
  };

  test('should return initial state when called with undefined', () => {
    // Reducer should handle undefined state
    const result = cartReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  test('should handle addItem action', () => {
    const product = { id: 1, name: 'Test Product', price: 10 };
    const action = addItem(product);

    const result = cartReducer(initialState, action);

    expect(result).toEqual({
      items: [{ ...product, quantity: 1 }],
      total: 10,
      itemCount: 1
    });

    // Original state should be unchanged (immutability test)
    expect(initialState.items).toHaveLength(0);
  });

  test('should increase quantity for existing item', () => {
    const existingState = {
      items: [{ id: 1, name: 'Test Product', price: 10, quantity: 1 }],
      total: 10,
      itemCount: 1
    };

    const product = { id: 1, name: 'Test Product', price: 10 };
    const action = addItem(product);

    const result = cartReducer(existingState, action);

    expect(result).toEqual({
      items: [{ id: 1, name: 'Test Product', price: 10, quantity: 2 }],
      total: 20,
      itemCount: 2
    });
  });

  test('should handle removeItem action', () => {
    const existingState = {
      items: [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 15, quantity: 1 }
      ],
      total: 35,
      itemCount: 3
    };

    const action = removeItem(1);
    const result = cartReducer(existingState, action);

    expect(result).toEqual({
      items: [{ id: 2, name: 'Product 2', price: 15, quantity: 1 }],
      total: 15,
      itemCount: 1
    });
  });

  test('should handle updateQuantity action', () => {
    const existingState = {
      items: [{ id: 1, name: 'Test Product', price: 10, quantity: 2 }],
      total: 20,
      itemCount: 2
    };

    const action = updateQuantity({ productId: 1, quantity: 5 });
    const result = cartReducer(existingState, action);

    expect(result).toEqual({
      items: [{ id: 1, name: 'Test Product', price: 10, quantity: 5 }],
      total: 50,
      itemCount: 5
    });
  });

  test('should remove item when quantity is set to 0', () => {
    const existingState = {
      items: [{ id: 1, name: 'Test Product', price: 10, quantity: 2 }],
      total: 20,
      itemCount: 2
    };

    const action = updateQuantity({ productId: 1, quantity: 0 });
    const result = cartReducer(existingState, action);

    expect(result).toEqual({
      items: [],
      total: 0,
      itemCount: 0
    });
  });
});
```

#### Testing Redux-connected components:

```jsx :collapsed-lines
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ConnectedProductCard from './ProductCard';

// Helper to create a test store with initial state
function createTestStore(initialState = {}) {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
        ...initialState
      }
    }
  });
}

// Helper to render components with Redux store
function renderWithStore(component, store) {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
}

describe('ConnectedProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 25,
    description: 'A test product'
  };

  test('should display product information', () => {
    const store = createTestStore();

    renderWithStore(<ConnectedProductCard product={mockProduct} />, store);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
  });

  test('should add item to cart when button clicked', () => {
    const store = createTestStore();

    renderWithStore(<ConnectedProductCard product={mockProduct} />, store);

    // Initially, cart should be empty
    expect(store.getState().cart.items).toHaveLength(0);

    // Click add to cart button
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    // Check that item was added to store
    const cartState = store.getState().cart;
    expect(cartState.items).toHaveLength(1);
    expect(cartState.items[0]).toEqual({ ...mockProduct, quantity: 1 });
    expect(cartState.total).toBe(25);
  });

  test('should show "In Cart" when item is already in cart', () => {
    const store = createTestStore({
      items: [{ ...mockProduct, quantity: 1 }],
      total: 25,
      itemCount: 1
    });

    renderWithStore(<ConnectedProductCard product={mockProduct} />, store);

    // Button should be disabled and show "In Cart"
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('In Cart');
  });
});
```

#### Integration testing with multiple connected components:

```jsx :collapsed-lines
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from './test-utils';
import App from './App';

describe('Cart integration', () => {
  test('should update cart badge when item is added', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Initially, no cart badge should be visible
    expect(screen.queryByText(/cart \(/)).not.toBeInTheDocument();

    // Add a product to cart
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // Cart badge should now show 1 item
    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
  });

  test('should show cart items when cart dropdown is opened', async () => {
    const store = createTestStore({
      items: [
        { id: 1, name: 'Test Product', price: 10, quantity: 1 }
      ],
      total: 10,
      itemCount: 1
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Open cart dropdown
    fireEvent.click(screen.getByRole('button', { name: /cart/i }));

    // Should show cart item
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  test('should remove item when remove button is clicked', () => {
    const store = createTestStore({
      items: [
        { id: 1, name: 'Test Product', price: 10, quantity: 1 }
      ],
      total: 10,
      itemCount: 1
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Open cart dropdown
    fireEvent.click(screen.getByRole('button', { name: /cart/i }));

    // Remove the item
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    // Item should be gone
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();

    // Cart badge should be gone
    expect(screen.queryByText(/cart \(/)).not.toBeInTheDocument();
  });
});
```

### Testing custom hooks for state management

::: important Why custom hook testing is unique

Custom hooks can't be tested like regular functions because they use React hooks internally, which can only be called within React components. This creates specific testing challenges:

1. **React context requirement**: Hooks must be called within a React component or test environment
2. **State persistence**: Testing that state persists correctly between renders
3. **Effect testing**: Testing useEffect cleanup and dependency changes
4. **Isolation**: Testing hook logic separately from UI components
5. **Multiple render cycles**: Testing how hooks behave across re-renders

:::

You’ll need some special testing utilities:

- `renderHook()`: Renders a hook in a test component
- `act()`: Ensures state updates are processed before assertions
- Mock timers for testing delayed effects

```jsx :collapsed-lines
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart hook', () => {
  test('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  test('should add item to cart', () => {
    const { result } = renderHook(() => useCart());

    const product = { id: 1, name: 'Test Product', price: 10 };

    act(() => {
      result.current.addItem(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...product, quantity: 1 });
    expect(result.current.total).toBe(10);
    expect(result.current.itemCount).toBe(1);
  });

  test('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());

    const product = { id: 1, name: 'Test Product', price: 10 };

    // Add item first
    act(() => {
      result.current.addItem(product);
    });

    // Then remove it
    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  test('should handle multiple items', () => {
    const { result } = renderHook(() => useCart());

    const product1 = { id: 1, name: 'Product 1', price: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 15 };

    act(() => {
      result.current.addItem(product1);
      result.current.addItem(product2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.total).toBe(25);
    expect(result.current.itemCount).toBe(2);
  });
});
```

---

## When to Use Each Approach: A Decision Framework

Choosing the right state management approach is crucial for maintainable applications. Here's how to decide:

### Decision tree for state management

::: tabs

@tab:active 1.

Is the state only needed by one component and its direct children? → Use local state with `useState`:

```jsx
// Good for: Form inputs, toggles, local UI state
function ContactForm() {
  const [name, setName] = useState('');        // Only this form needs it
  const [email, setEmail] = useState('');      // Only this form needs it
  const [isSubmitting, setIsSubmitting] = useState(false); // Only this form needs it

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
```

@tab 2.

Do 3-5 components need the same data, and it doesn't change frequently? → Use React Context:

```jsx
// Good for: User authentication, theme settings, language preferences
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');  // Changes rarely

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Used by Header, Sidebar, Settings components
```

@tab 3.

Do many unrelated components need the same data that changes frequently? → Use a state management library (Redux, Zustand):

```jsx
// Good for: Shopping cart, complex forms, real-time data
const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addItem: (product) => set((state) => ({
    items: [...state.items, product],
    total: state.total + product.price
  }))
}));

// Used by ProductCard, CartBadge, CartSidebar, Checkout, etc.
```

@tab 4.

Do you need to encapsulate reusable logic across multiple components? → Create custom hooks:

```jsx
// Good for: API calls, form validation, complex calculations
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Reusable across any component that needs API data
```

:::

### Detailed comparison of approaches

Here’s a helpful table that lays out each approach along with their best use cases, pros, and cons:

| Approach | Best For | Pros | Cons | Learning Curve |
| --- | --- | --- | --- | --- |
| **Local State** | Form inputs, UI toggles, component-specific data | Simple, fast, built-in | Limited scope, prop drilling | Easy |
| **Context** | Theme, auth, moderate shared state | No prop drilling, built-in | Can cause re-renders, not great for frequent updates | Medium |
| **Redux** | Complex state, time-travel debugging, large teams | Predictable, great DevTools, scalable | Lots of boilerplate, learning curve | Hard |
| **Redux Toolkit** | Modern Redux projects | Less boilerplate than Redux, good patterns | Still complex, opinionated | Medium-Hard |
| **Zustand** | Simple global state, modern projects | Minimal boilerplate, TypeScript friendly, small | Less ecosystem, newer library | Easy-Medium |
| **Custom Hooks** | Reusable logic, moderate complexity | Composable, reusable, testable | Can get complex, need good patterns | Medium |

### Real-world examples of when to use each

#### Local State Examples

Local state excels when data is **temporary, component-specific, and doesn't need to be shared**. It provides the fastest performance and simplest code because there's no overhead of state management systems.

```jsx
// ✅ Perfect for local state
function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);    // Only this component cares
  const [isFullscreen, setIsFullscreen] = useState(false); // Only this component cares

  return (
    <div className="gallery">
      <img src={images[currentIndex]} />
      <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>
      <button onClick={() => setIsFullscreen(true)}>Fullscreen</button>
    </div>
  );
}

// ✅ Good for forms
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // All this state is specific to this form
}
```

::: info Local state works here because

- State is contained within the component that uses it
- No external subscriptions or providers are needed
- It’s easy to reason about and test
- State automatically clears when component unmounts
- Component is self-contained and reusable

:::

#### Context Examples

Context works best for **stable data that many components need but changes infrequently**. It eliminates prop drilling while avoiding the complexity of full state management libraries.

```jsx
// ✅ Perfect for Context - used by many components, changes rarely
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Authentication status doesn't change frequently
  // Many components need to know if user is logged in

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Good for theme settings
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  // Theme changes rarely but affects many components
}
```

::: info Context excels here because

- **Wide reach, stable data**: Many components need this information, but it doesn't change often
- **Built-in solution**: No external dependencies required
- **Automatic updates**: All consumers automatically re-render when the context changes
- **Clear boundaries**: Easy to understand what components have access to the data
- **Reasonable complexity**: More complex than local state but much simpler than Redux

When Context struggles:

- **Frequent updates**: Every context change causes all consumers to re-render
- **Complex state logic**: Multiple related pieces of state become unwieldy
- **Performance critical**: Large numbers of consumers can cause performance issues

:::

#### Redux/Zustand Examples

These libraries shine when you have a **complex, interconnected state that changes frequently and needs to be accessed by many unrelated components**. They provide predictable updates, debugging tools, and performance optimizations.

```jsx :collapsed-lines
// ✅ Perfect for Redux/Zustand - complex state, many components, frequent updates
const useShoppingStore = create((set, get) => ({
  // Cart data
  cart: { items: [], total: 0 },

  // User data  
  user: { profile: null, preferences: {} },

  // UI state
  ui: { 
    sidebarOpen: false, 
    currentPage: 'home',
    notifications: []
  },

  // Many actions that update different parts of state
  addToCart: (product) => set((state) => ({
    cart: {
      items: [...state.cart.items, product],
      total: state.cart.total + product.price
    }
  })),

  updateUserProfile: (profile) => set((state) => ({
    user: { ...state.user, profile }
  })),

  showNotification: (message) => set((state) => ({
    ui: {
      ...state.ui,
      notifications: [...state.ui.notifications, { id: Date.now(), message }]
    }
  }))
}));

// Used by: ProductCard, CartBadge, UserProfile, Sidebar, Notifications, etc.
```

::: info Why state management libraries excel here:

- **Centralized logic**: All state changes go through predictable update mechanisms
- **Performance optimization**: Libraries provide selector-based subscriptions to minimize re-renders
- **Debugging tools**: Redux DevTools, time-travel debugging, action tracking
- **Scalability**: Can handle complex state relationships and async operations
- **Team consistency**: Established patterns that multiple developers can follow
- **Middleware support**: Logging, persistence, error handling can be added systematically

:::

**Redux** is best for large teams, complex async flows, need for strict predictability. **Zustand** is best for modern apps that want Redux benefits without boilerplate. And **Recoil/Jotai** is best for fine-grained reactive updates and complex dependencies.

#### Custom Hook Examples

Custom hooks excel when you have **stateful logic that multiple components need, but the logic itself is more important than the data**. They provide composition and reusability while keeping complexity contained.

```jsx :collapsed-lines
// ✅ Perfect for custom hooks - reusable logic
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// ✅ Reusable API logic
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (!cancelled) {
          setError(error);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Can be used in any component that needs API data
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

::: info Why custom hooks are perfect here:

- **Logic reusability**: Same stateful behavior can be used across multiple components
- **Composition**: Hooks can be combined and built upon each other
- **Separation of concerns**: Business logic is separated from UI rendering
- **Testability**: Logic can be tested independently of components
- **Flexibility**: Each component can use the hook differently while sharing core logic
- **No provider overhead**: Unlike Context, no wrapper components needed

When custom hooks work best:

- **Cross-cutting concerns**: Authentication, API calls, form validation, local storage
- **Complex calculations**: Data processing that multiple components need
- **Third-party integrations**: Wrapping external libraries with React-friendly interfaces
- **Stateful behavior**: Managing complex state machines or multi-step processes
  
:::

---

## Common Pitfalls and How to Avoid Them

Understanding common mistakes helps you write better, more maintainable code.

### Pitfall 1: Context hell (too many nested providers)

#### The Problem:

```jsx :collapsed-lines
// ❌ WRONG: Too many nested providers make code hard to read and maintain
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider>
          <NotificationProvider>
            <AnalyticsProvider>
              <FeatureFlagProvider>
                <LocaleProvider>
                  <Router>
                    <Routes />
                  </Router>
                </LocaleProvider>
              </FeatureFlagProvider>
            </AnalyticsProvider>
          </NotificationProvider>
        </CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

::: warning Why this is bad:

- Hard to read and understand the component hierarchy
- Difficult to reorder or remove providers
- Each level of nesting adds complexity
- Testing becomes difficult with so many providers

:::

#### Solution 1: Combine related providers

```jsx
// ✅ BETTER: Group related providers together
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

function ShoppingProviders({ children }) {
  return (
    <CartProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </CartProvider>
  );
}

function App() {
  return (
    <AppProviders>
      <ShoppingProviders>
        <Router>
          <Routes />
        </Router>
      </ShoppingProviders>
    </AppProviders>
  );
}
```

#### Solution 2: Use a state management library instead

```jsx
// ✅ EVEN BETTER: Use Zustand or Redux for complex state
const useAppStore = create((set) => ({
  user: null,
  theme: 'light',
  cart: { items: [], total: 0 },
  notifications: [],

  // All actions in one place
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  addToCart: (product) => set((state) => ({
    cart: {
      items: [...state.cart.items, product],
      total: state.cart.total + product.price
    }
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  }))
}));

function App() {
  // No providers needed! Just use the store directly
  return (
    <Router>
      <Routes />
    </Router>
  );
}
```

### Pitfall 2: Massive context values causing unnecessary re-renders

#### The Problem:

```jsx :collapsed-lines
// ❌ WRONG: Putting everything in one context causes all components to re-render
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  // ... 15 more pieces of state

  // Every time ANY state changes, ALL components re-render!
  const value = {
    user, setUser,
    cart, setCart,
    theme, setTheme,
    notifications, setNotifications,
    products, setProducts,
    orders, setOrders,
    // ... and all the rest
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// This component only needs theme, but re-renders when user, cart, etc. change
function ThemeToggle() {
  const { theme, setTheme } = useContext(AppContext);  // Gets ALL context data

  console.log('ThemeToggle rendering');  // This logs way too often!

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}
```

::: warning Why this is bad:

- Components re-render when unrelated state changes
- Poor performance as your app grows
- Hard to debug which state changes cause which re-renders
- Difficult to optimize individual pieces of state

:::

#### Solution: Separate contexts by domain

```jsx :collapsed-lines
// ✅ BETTER: Separate contexts for different domains
const UserContext = createContext();
const CartContext = createContext();  
const ThemeContext = createContext();
const NotificationContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Only user-related state here
  const value = useMemo(() => ({
    user, 
    setUser, 
    isAuthenticated, 
    setIsAuthenticated
  }), [user, isAuthenticated]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  // Only theme-related state here
  const value = useMemo(() => ({
    theme, 
    setTheme, 
    fontSize, 
    setFontSize
  }), [theme, fontSize]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Now ThemeToggle only re-renders when theme changes
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);  // Only theme data

  console.log('ThemeToggle rendering');  // Only logs when theme changes

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  );
}
```

### Pitfall 3: Not memoizing context values

**The Problem:**

```jsx
// ❌ WRONG: Creates new objects every render
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <CartContext.Provider value={{
      // This creates a NEW object every time CartProvider renders!
      items,                      // Same data but new object reference
      total,                      // Same data but new object reference
      addItem: (item) => {        // NEW function every render!
        setItems([...items, item]);
      },
      removeItem: (id) => {       // NEW function every render!
        setItems(items.filter(item => item.id !== id));
      }
    }}>
      {children}
    </CartContext.Provider>
  );
}
```

::: warning Why this is bad:

- React uses `Object.is()` to compare context values
- Even if data is the same, new objects cause all consumers to re-render
- New functions break optimization in child components
- Performance degrades as more components use the context

:::

#### Solution: Memoize context values and functions

```jsx :collapsed-lines
// ✅ CORRECT: Memoize the context value and functions
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // useCallback memoizes functions - they only change when dependencies change
  const addItem = useCallback((item) => {
    setItems(prevItems => [...prevItems, item]);  // Use function update to avoid dependency
  }, []);  // Empty deps = function never changes

  const removeItem = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  // useMemo memoizes the context value object
  const value = useMemo(() => ({
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
    itemCount: items.length  // Computed value
  }), [items, total, addItem, removeItem, updateQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

::: info What <code>useCallback</code> and <code>useMemo</code> do:

- `useCallback(fn, deps)` returns the same function reference until dependencies change
- `useMemo(fn, deps)` returns the same value until dependencies change
- **Why this matters**: React components only re-render when their props change by reference

:::

### Pitfall 4: Prop drilling when Context would be better

#### The Problem:

```jsx :collapsed-lines
// ❌ WRONG: Passing user data through many components that don't use it
function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  return (
    <div>
      <Header user={user} />  {/* Header doesn't use user, just passes it down */}
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <Logo />
      <Navigation user={user} />  {/* Navigation doesn't use user either */}
    </header>
  );
}

function Navigation({ user }) {
  return (
    <nav>
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/products">Products</MenuItem>
      <UserMenu user={user} />  {/* Finally! Someone who uses user */}
    </nav>
  );
}

function UserMenu({ user }) {
  return (
    <div className="user-menu">
      <span>Welcome, {user.name}!</span>  {/* This is where user is actually used */}
      {user.role === 'admin' && <a href="/admin">Admin Panel</a>}
    </div>
  );
}
```

::: warning Why this is problematic:

- Header and Navigation don't care about user but must know about it
- Adding new user data requires updating multiple components
- Components become tightly coupled
- Testing becomes complex because you need to mock props that components don't use

:::

#### Solution: Use Context for data that skips intermediate components

```jsx :collapsed-lines
// ✅ BETTER: Use Context for data that needs to skip levels
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

function App() {
  return (
    <UserProvider>
      <div>
        <Header />  {/* No props needed! */}
      </div>
    </UserProvider>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Navigation />  {/* No props needed! */}
    </header>
  );
}

function Navigation() {
  return (
    <nav>
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/products">Products</MenuItem>
      <UserMenu />  {/* No props needed! */}
    </nav>
  );
}

function UserMenu() {
  const { user } = useUser();  // Gets user data directly from context

  return (
    <div className="user-menu">
      <span>Welcome, {user.name}!</span>
      {user.role === 'admin' && <a href="/admin">Admin Panel</a>}
    </div>
  );
}
```

### Pitfall 5: Using global state for everything

#### The Problem:

```jsx :collapsed-lines
// ❌ WRONG: Putting local UI state in global store
const useAppStore = create((set) => ({
  // Global state (good)
  user: null,
  cart: { items: [], total: 0 },
  theme: 'light',

  // Local UI state (bad - should be local to component)
  loginModalOpen: false,
  searchQuery: '',
  currentPage: 1,
  sortDirection: 'asc',
  selectedFilters: [],

  // Actions for everything
  setLoginModalOpen: (open) => set({ loginModalOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  // ... many more actions
}));

function SearchBox() {
  const { searchQuery, setSearchQuery } = useAppStore();

  // This causes ALL components using the store to re-render when user types!
  return (
    <input 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
    />
  );
}
```

::: warning Why this is bad:

- Every keystroke causes all store consumers to re-render
- Store becomes cluttered with temporary UI state
- Hard to reset state when component unmounts
- Increases coupling between unrelated components

:::

#### Solution: Keep local state local, global state global

```jsx :collapsed-lines
// ✅ BETTER: Separate local and global concerns
const useAppStore = create((set) => ({
  // Only truly global state
  user: null,
  cart: { items: [], total: 0 },
  theme: 'light',

  // Actions for global state only
  setUser: (user) => set({ user }),
  addToCart: (product) => set((state) => ({
    cart: {
      items: [...state.cart.items, product],
      total: state.cart.total + product.price
    }
  })),
  setTheme: (theme) => set({ theme })
}));

function SearchBox() {
  // Local state for local concerns
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const results = await searchAPI(searchQuery);
      // Handle results...
    } catch (error) {
      // Handle error...
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // No global re-renders!
      />
      <button onClick={handleSearch} disabled={isSearching}>
        {isSearching ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}

function LoginModal() {
  // Modal open/closed state is local to this component
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Login</button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}
```

::: info Guidelines for what belongs where:

- **Local state**: Form inputs, modal open/closed, loading states, temporary UI state
- **Global state**: User authentication, shopping cart, theme, data shared across pages

:::

### Pitfall 6: Not handling loading and error states in shared state

#### The Problem:

```jsx :collapsed-lines
// ❌ WRONG: Not handling async operations properly
const useUserStore = create((set) => ({
  user: null,

  // Missing loading and error states!
  login: async (email, password) => {
    const user = await authAPI.login(email, password);  // What if this fails?
    set({ user });
  }
}));

function LoginForm() {
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);  // No way to show loading or handle errors
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>  {/* No loading state */}
    </form>
  );
}
```

#### Solution: Always include loading and error states

```jsx :collapsed-lines
// ✅ BETTER: Handle async operations properly
const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });  // Start loading, clear previous errors

    try {
      const user = await authAPI.login(email, password);
      set({ user, loading: false, error: null });  // Success
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message || 'Login failed',  // Store error message
        user: null 
      });
    }
  },

  logout: () => {
    set({ user: null, error: null });  // Clear user and any errors
  },

  clearError: () => {
    set({ error: null });  // Allow manual error clearing
  }
}));

function LoginForm() {
  const { login, loading, error, clearError } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();  // Clear any previous errors
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}

      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}  // Disable during loading
      />

      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}  // Disable during loading
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}  {/* Show loading state */}
      </button>
    </form>
  );
}
```

---

## Best Practices for Maintainable Shared State

Following established patterns makes your code easier to understand and maintain.

### 1. Use consistent naming conventions

Be descriptive and consistent with your naming:

```jsx :collapsed-lines
// ✅ GOOD: Clear, descriptive names
const useCartStore = create((set) => ({
  // State names are clear
  items: [],
  totalPrice: 0,
  itemCount: 0,
  isLoading: false,
  error: null,

  // Action names describe what they do
  addItemToCart: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }],
    totalPrice: state.totalPrice + product.price,
    itemCount: state.itemCount + 1
  })),

  removeItemFromCart: (productId) => set((state) => {
    const itemToRemove = state.items.find(item => item.id === productId);
    if (!itemToRemove) return state;

    return {
      items: state.items.filter(item => item.id !== productId),
      totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
      itemCount: state.itemCount - itemToRemove.quantity
    };
  }),

  clearCart: () => set({
    items: [],
    totalPrice: 0,
    itemCount: 0,
    error: null
  })
}));

// ❌ BAD: Unclear, inconsistent names
const useStore = create((set) => ({
  // Unclear what these are
  data: [],
  num: 0,
  count: 0,
  loading: false,
  err: null,

  // Unclear what these do
  add: (x) => set((s) => ({ data: [...s.data, x] })),
  remove: (id) => set((s) => ({ data: s.data.filter(i => i.id !== id) })),
  clear: () => set({ data: [], num: 0 })
}));
```

### 2. Group related state and actions together

Organize your state by feature, not by type:

```jsx :collapsed-lines
// ✅ GOOD: Organized by feature domains
const useAppStore = create((set, get) => ({
  // User-related state
  user: {
    profile: null,
    preferences: {},
    isAuthenticated: false,
    loading: false,
    error: null
  },

  // Cart-related state
  cart: {
    items: [],
    total: 0,
    discount: 0,
    loading: false,
    error: null
  },

  // UI-related state
  ui: {
    theme: 'light',
    sidebarOpen: false,
    currentPage: 'home',
    notifications: []
  },

  // User actions
  userActions: {
    login: async (credentials) => {
      set((state) => ({
        user: { ...state.user, loading: true, error: null }
      }));

      try {
        const profile = await authAPI.login(credentials);
        set((state) => ({
          user: {
            ...state.user,
            profile,
            isAuthenticated: true,
            loading: false
          }
        }));
      } catch (error) {
        set((state) => ({
          user: {
            ...state.user,
            loading: false,
            error: error.message
          }
        }));
      }
    },

    logout: () => {
      set((state) => ({
        user: {
          profile: null,
          preferences: {},
          isAuthenticated: false,
          loading: false,
          error: null
        }
      }));
    }
  },

  // Cart actions
  cartActions: {
    addItem: (product) => set((state) => ({
      cart: {
        ...state.cart,
        items: [...state.cart.items, { ...product, quantity: 1 }],
        total: state.cart.total + product.price
      }
    })),

    removeItem: (productId) => {
      const state = get();
      const item = state.cart.items.find(item => item.id === productId);

      if (item) {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter(item => item.id !== productId),
            total: state.cart.total - (item.price * item.quantity)
          }
        }));
      }
    }
  },

  // UI actions
  uiActions: {
    setTheme: (theme) => set((state) => ({
      ui: { ...state.ui, theme }
    })),

    toggleSidebar: () => set((state) => ({
      ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
    })),

    addNotification: (notification) => set((state) => ({
      ui: {
        ...state.ui,
        notifications: [...state.ui.notifications, {
          id: Date.now(),
          ...notification
        }]
      }
    }))
  }
}));

// Usage is clean and organized
function ProductCard({ product }) {
  const addItem = useAppStore(state => state.cartActions.addItem);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}
```

### 3. Create selector hooks for complex data access

Make data access predictable and reusable:

```jsx :collapsed-lines
// ✅ GOOD: Dedicated selector hooks
function useCartSelectors() {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);
  const itemCount = useCartStore(state => state.itemCount);
  const isLoading = useCartStore(state => state.isLoading);
  const error = useCartStore(state => state.error);

  // Computed values
  const isEmpty = itemCount === 0;
  const hasDiscount = useCartStore(state => state.discount > 0);
  const finalTotal = totalPrice - useCartStore(state => state.discount);

  return {
    items,
    totalPrice,
    itemCount,
    isLoading,
    error,
    isEmpty,
    hasDiscount,
    finalTotal
  };
}

function useCartActions() {
  const addItem = useCartStore(state => state.addItemToCart);
  const removeItem = useCartStore(state => state.removeItemFromCart);
  const updateQuantity = useCartStore(state => state.updateItemQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const applyDiscount = useCartStore(state => state.applyDiscount);

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount
  };
}

// Clean component usage
function CartSummary() {
  const { items, finalTotal, isEmpty, isLoading } = useCartSelectors();
  const { removeItem, clearCart } = useCartActions();

  if (isLoading) return <div>Loading cart...</div>;
  if (isEmpty) return <div>Your cart is empty</div>;

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total: ${finalTotal.toFixed(2)}</p>

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

### 4. Handle side effects properly

Separate side effects from state updates:

```jsx :collapsed-lines
// ✅ GOOD: Proper side effect handling
const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (product) => {
    // Update state
    set((state) => {
      const newItems = [...state.items, { ...product, quantity: 1 }];
      const newTotal = state.totalPrice + product.price;

      return {
        items: newItems,
        totalPrice: newTotal
      };
    });

    // Handle side effects AFTER state update
    const newState = get();

    // Analytics tracking
    analytics.track('Item Added to Cart', {
      productId: product.id,
      productName: product.name,
      cartTotal: newState.totalPrice,
      itemCount: newState.items.length
    });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify({
      items: newState.items,
      totalPrice: newState.totalPrice
    }));

    // Show notification
    toast.success(`${product.name} added to cart!`);

    // Update browser tab title
    document.title = `Shopping (${newState.items.length}) - MyStore`;
  },

  removeItem: (productId) => {
    const currentState = get();
    const itemToRemove = currentState.items.find(item => item.id === productId);

    if (!itemToRemove) return;

    // Update state
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
      totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
    }));

    // Side effects
    const newState = get();

    analytics.track('Item Removed from Cart', {
      productId: itemToRemove.id,
      productName: itemToRemove.name,
      cartTotal: newState.totalPrice
    });

    localStorage.setItem('cart', JSON.stringify({
      items: newState.items,
      totalPrice: newState.totalPrice
    }));

    toast.info(`${itemToRemove.name} removed from cart`);

    document.title = `Shopping (${newState.items.length}) - MyStore`;
  }
}));
```

### 5. Implement proper error boundaries

Handle errors gracefully at the state level:

```jsx :collapsed-lines
// ✅ GOOD: Comprehensive error handling
const useApiStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,
  retryCount: 0,

  fetchData: async (url, options = {}) => {
    const { maxRetries = 3, retryDelay = 1000 } = options;

    set({ loading: true, error: null });

    const attemptFetch = async (attempt) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        set({ 
          data, 
          loading: false, 
          error: null,
          retryCount: 0 
        });

      } catch (error) {
        console.error(`Fetch attempt ${attempt} failed:`, error);

        if (attempt < maxRetries) {
          // Retry with exponential backoff
          const delay = retryDelay * Math.pow(2, attempt - 1);
          setTimeout(() => attemptFetch(attempt + 1), delay);

          set({ retryCount: attempt });
        } else {
          // Final failure
          set({ 
            loading: false, 
            error: {
              message: error.message,
              type: 'FETCH_ERROR',
              timestamp: new Date().toISOString(),
              url,
              attempts: attempt
            },
            retryCount: 0
          });
        }
      }
    };

    await attemptFetch(1);
  },

  retry: () => {
    const state = get();
    if (state.error && state.error.url) {
      state.fetchData(state.error.url);
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

// Error boundary component
class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error Boundary caught an error:', error, errorInfo);

    // Report to error tracking service
    errorTracking.report(error, {
      componentStack: errorInfo.componentStack,
      context: 'ApiErrorBoundary'
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with error handling
function DataDisplay() {
  const { data, loading, error, retry } = useApiStore();

  useEffect(() => {
    useApiStore.getState().fetchData('/api/data');
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className="error-state">
        <h3>Failed to load data</h3>
        <p>{error.message}</p>
        <p>Attempted {error.attempts} times</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

function App() {
  return (
    <ApiErrorBoundary>
      <DataDisplay />
    </ApiErrorBoundary>
  );
}
```

---

## Conclusion: Building Maintainable React Applications

Managing shared state complexity is one of the most important skills to have for building scalable React applications. The key is choosing the right tool for each situation and following established patterns.

### Summary of approaches

#### Start simple and scale up:

1. **Local state** for component-specific data
2. **Context** for moderate shared state that doesn't change frequently
3. **State management libraries** for complex, frequently-changing global state
4. **Custom hooks** for reusable stateful logic

### Key principles to remember

#### 1. Principle of least power

Use the simplest solution that meets your needs

- Don't use Redux for a theme toggle
- Don't use local state for user authentication
- Don't use Context for rapidly changing data

#### 2. Separation of concerns

Keep related state together, unrelated state apart

- Group user state separately from cart state
- Don't mix temporary UI state with persistent data
- Separate actions from selectors

#### 3. Performance matters

Optimize for your specific use case

- Memoize context values to prevent unnecessary re-renders
- Use selective subscriptions in state management libraries
- Split large contexts into smaller, focused ones

#### 4. Maintainability first

Write code that future developers (including yourself) can understand

- Use descriptive names for state and actions
- Handle loading and error states consistently
- Write comprehensive tests for your state logic

### The evolution of a typical application

Most successful React applications follow this pattern:

#### Phase 1: Simple local state

```jsx
// Start here for new features
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Simple and focused
}
```

#### Phase 2: Context for shared data

```jsx
// Move to Context when multiple components need the same data
const UserContext = createContext();
// Used by Header, Sidebar, UserProfile components
```

#### Phase 3: State management library for complex interactions

```jsx
// Scale to Redux/Zustand when state becomes complex
const useAppStore = create((set) => ({
  user: null,
  cart: { items: [], total: 0 },
  orders: [],
  // Many interconnected pieces of state
}));
```

#### Phase 4: Custom hooks for reusable patterns

```jsx
// Extract reusable logic into custom hooks
function useApi(url) {
  // Reusable API logic with loading, error, and retry
}

function useLocalStorage(key, defaultValue) {
  // Reusable localStorage sync
}
```

### Final recommendations

**For beginners**: Start with local state and Context. Master these before moving to state management libraries.

**For intermediate developers**: Learn one state management library well (Zustand or Redux Toolkit). Focus on proper error handling and performance optimization.

**For advanced developers**: Experiment with different patterns and create reusable abstractions. Focus on team consistency and maintainable architectures.

**For teams**: Establish conventions early and document your state management patterns. Code reviews should focus on proper state placement and performance implications.

The goal is not to eliminate all complexity, but to manage it in a way that scales with your application and team. Every piece of shared state should have a clear owner, predictable update patterns, and proper error handling.

::: note Remember

the best state management solution is often a combination of approaches. A well-architected React application uses local state for local concerns, Context for moderate sharing, state management libraries for complex global state, and custom hooks for reusable logic.

:::

By following these principles and patterns, you'll build React applications that are not only functional but also maintainable, performant, and enjoyable to work with as they grow in complexity.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Shared State Complexity in React - A Complete Handbook for Developers",
  "desc": "Imagine you're building a simple shopping website. You have a product page where users can add items to their cart, and a header that displays the number of items in the cart. Sounds simple, right? But here's the challenge: how does the header know w...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/shared-state-complexity-in-react-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
