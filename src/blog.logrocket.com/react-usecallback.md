---
lang: en-US
title: "React useCallback: When and how to use it for better performance"
description: "Article(s) > React useCallback: When and how to use it for better performance"
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
      content: "Article(s) > React useCallback: When and how to use it for better performance"
    - property: og:description
      content: "React useCallback: When and how to use it for better performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-usecallback.html
prev: /programming/js-react/articles/README.md
date: 2025-02-26
isOriginal: false
author:
  - name: Emmanuel John
    url : https://blog.logrocket.com/author/emmanueljohn/
cover: /assets/image/blog.logrocket.com/react-usecallback/banner.png
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
  name="React useCallback: When and how to use it for better performance"
  desc="Learn how React's useCallback hook boosts performance by memoizing functions and preventing unnecessary re-renders with practical examples."
  url="https://blog.logrocket.com/react-usecallback"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-usecallback/banner.png"/>

**useCallback** is a [**React Hook**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) that **memorizes functions**, ensuring they maintain a stable reference across renders unless their dependencies change. This helps optimize performance by preventing unwanted re-renders in child components.

![React `useCallback`: When And How To Use It For Better Performance](/assets/image/blog.logrocket.com/react-usecallback/banner.png)

React applications often suffer from unnecessary re-renders, which can negatively impact performance. One common cause is when functions are recreated on every render, leading to inefficiencies, especially when passed as props to memoized components. This is where [<FontIcon icon="fa-brands fa-react"/>`useCallback`](https://react.dev/reference/react/useCallback) comes in.

By the end of this guide, you’ll have a clear understanding of `useCallback` and how to use it properly in your React applications.

::: details TL;DR

**What is `useCallback` used for?**

`useCallback` is used to prevent function recreation on every render, improving performance in React applications.

**What is the difference between `useCallback` and `useMemo`**?

While [**`useCallback`**](/blog.logrocket.com/react-usememo-vs-usecallback.md#what-usecallback) memoizes functions, [**useMemo**](/blog.logrocket.com/react-usememo-vs-usecallback.md#what-usememo) memoizes values.

**When should you use callbacks?**

Callbacks are useful when passing functions to memoized components ([**`React.memo`**](/blog.logrocket.com/react-memo-vs-usememo.md)) or optimizing event handlers in performance-critical applications.

**What is the difference between `useEffect` and `useCallback`**?

Both are React hooks, but [**`useEffect`**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md) runs side effects after renders, while `useCallback` stabilizes function references.

:::

---

## Function reference stability in React

Before discussing the useCallback hook, let’s understand function reference and why function reference stability matters in React.

In JavaScript, functions are objects. Each time a function is declared inside a component, a new function instance is created with a different reference in memory. For example:

```jsx
function MyComponent() {
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return <Button onClick={handleClick} />;
}
```

In the above code snippet, `handleClick` is recreated on every render. Even if the logic inside it hasn’t changed, its reference is new. This can cause unnecessary re-rendering when the function is passed as a prop to a **memoized** child component (`React.memo`).

### Why function reference stability matters in React

When a function reference changes, any memoized child component receiving that function as a prop will re-render even if the function’s behavior hasn’t changed.

```jsx
const Parent = () => {
  const handleClick = () => console.log('Clicked');
  return <Child onClick={handleClick} />;
};

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click Me</button>;
});
```

Without stabilizing the `handleClick` function with the `useCallback` hook, `Child` will re-render on every render of `Parent`, even if the product list remains unchanged.

---

## What is useCallback?

`useCallback()` is one of React’s performance optimization hooks that caches a function declaration on every render and returns the same function without reference changes if the dependencies remain unchanged since the previous render.

### Syntax

```js
const memoizedFunction = useCallback(() => {
      //logic here
}, [dependency1, dependency2, ...]);
```

The `useCallback` hook takes two arguments. The first is the function you want to memoize, and the second is a dependency array. Whenever any value in this array changes, the function is recreated with a new reference.

---

## How useCallback prevents unnecessary re-renders

Let’s consider an ecommerce admin case study where a product list page displays the list of product items and the product item component receives a function prop to delete the product from the list.

Create a `ProductList.jsx` component in your React project and add the following:

```jsx :collapsed-lines title="ProductList.jsx"
import React, { memo, useState } from 'react';
const ProductItem = memo(({ product, onDelete }) => {
    console.log("Rendering product item component")
  return (
    <div className="p-4 w-full border rounded-md shadow-sm mb-4 flex flex-col items-center text-center">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-32 h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <button 
        onClick={() => onDelete(product.id)} 
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
});
const ProductList = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Product 1', 
      description: 'Description for Product 1', 
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp' 
    },
    { 
      id: 2, 
      name: 'Product 2', 
      description: 'Description for Product 2', 
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-4.webp' 
    },
    { 
      id: 3, 
      name: 'Product 3', 
      description: 'Description for Product 3', 
      image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp' 
    },
    { 
        id: 4, 
        name: 'Product 4', 
        description: 'Description for Product 4', 
        image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-1.webp' 
      }
  ]);
  const toggleLogin = () => {
    setIsLoggedIn(val => !val );
  };
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  return (
    <div className="w-full p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
      {isLoggedIn ? <button 
        onClick={toggleLogin} 
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mb-6"
      >
        Log out
      </button> : <button 
      onClick={toggleLogin} 
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
    >
      Log in
    </button>}
      <div className='flex space-x-10 w-full'>
        {products.length > 0 ? (
            products.map(product => (
            <ProductItem 
                key={product.id} 
                product={product} 
                onDelete={deleteProduct} 
            />
            ))
        ) : (
            <p className="text-gray-500 text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};
export default ProductList;
```

`React.memo` wraps the `ProductItem` component to prevent unnecessary re-renders. This means `ProductItem` will only re-render if its `product` or `onDelete` props change.

We’ve added console log to check whether the component re-renders when the `isLoggedIn` state updates. Without `memo`, `ProductItem` would re-render every time `isLoggedIn` changes, even if the product list remains unchanged.

Running the project should result in the following:

![`useCallback` Example](/assets/image/blog.logrocket.com/react-usecallback/usecallback-example-1.webp)

Did you notice that the `ProductItem` component re-renders every time we click the **Log in** or **Log out** button? This makes memoization ineffective.

Imagine having thousands of products in the list — these unnecessary re-renders could slow down the app significantly. If the buttons are clicked repeatedly, it might even lead to performance issues or crashes.

The problem is that each time the `isLoggedIn` state changes, the `ProductList` component re-renders and recreates the `deleteProduct` function with a new reference, causing unnecessary re-rendering when the function is passed as a prop to the memoized `ProductItem` component (`React.memo`).

To resolve this issue, we have to stabilize the `deleteProduct` function reference by wrapping it in a `useCallback` hook:

```jsx
const deleteProduct = useCallback((id) => {
  setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
}, []);
```

![useCallback Example](/assets/image/blog.logrocket.com/react-usecallback/usecallback-example-2.webp)

Now the `ProductItem` component no longer re-renders after clicking the **Log in** or **Log out** button.

---

## Avoiding unnecessary dependencies with useCallback

Imagine you’re building an e-commerce app where users can infinitely scroll through products. The product list is fetched from an API, and users can favorite items by clicking a heart icon. To optimize performance, we want to avoid unnecessary function re-creations every time the component re-renders.

If you think wrapping the `toggleFavorite` function in `useCallback` is the right approach, you’re correct.

Here is an implementation of this feature:

```jsx :collapsed-lines title="ProductList.jsx"
import React, { useState, useCallback } from 'react';

const ProductItem = React.memo(({ product, onFavorite }) => {
  console.log(`Rendering ${product.name}`);
  return (
    <div className="p-4 w-full border rounded-md shadow-sm mb-4 flex flex-col items-center text-center">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-32 h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <button 
        onClick={() => onFavorite(product.id)} 
        className={`px-4 py-2 rounded-md ${
          product.isFavorite ? 'bg-red-500' : 'bg-gray-300'
        }`}
      >
        {product.isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
      </button>
    </div>
  );
});

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp', isFavorite: false },
    { id: 2, name: 'Product 2', image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-1.webp', isFavorite: false },
    { id: 3, name: 'Product 3', image: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp', isFavorite: false }
  ]);

  const toggleFavorite = useCallback((id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
    ));
  }, [products]); 

  return (
    <div className="w-full p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
      <div className="flex space-x-10 w-full">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onFavorite={toggleFavorite} 
          />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
```

Running the project should produce the following result:

![`useCallback` Example](/assets/image/blog.logrocket.com/react-usecallback/usecallback-example-3.webp)

Did you notice that when you click the **Favorite** or **Unfavorite** button for a product, the `ProductItem` component re-renders for all products — even though we used `useCallback` to stabilize the `toggleFavorite` function?

This happens because `products` is unnecessarily included in the dependency array of `useCallback`. Every time a product’s `isFavorite` state changes, the entire `products` state updates. As a result, `toggleFavorite` gets recreated with a new reference, causing all `ProductItem` components to re-render.

We can optimize this by removing `products` from the dependency array, like this:

```jsx
const toggleFavorite = useCallback((id) => {
  setProducts((prevProducts) =>
    prevProducts.map(product =>
      product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
    )
  );
}, []);
```

Now, the `toggleFavorite` function uses the functional update pattern, ensuring that it always works with the latest state by accessing `prevProducts`, which represents the state before the update. The empty dependency array (`[]`) ensures that `toggleFavorite` is created only once and does not change unless the component unmounts or re-renders, preventing unnecessary function re-creations:

![useCallback Example](/assets/image/blog.logrocket.com/react-usecallback/usecallback-example-4.webp)

With this optimization, the `ProductItem` component now re-renders only for the specific product whose favorite status changes, significantly improving performance.

---

## Writing more efficient custom hooks with useCallback

When creating a custom Hook, wrapping any returned functions with `useCallback` is best practice to maintain a stable reference:

```jsx
function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((item) => {
    setCart((prevCart) => [...prevCart, item]);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  }, []);

  return { cart, addToCart, removeFromCart };
}
```

By doing this, you allow components that use your Hook to avoid unnecessary re-renders and optimize performance when needed.

---

## When you don’t need `useCallback`

While `useCallback` is useful for performance optimization, there are cases where it is unnecessary. Here are two key scenarios where `useCallback` is not needed:

- If you are not passing a function as a prop to a component wrapped in `memo`, then you don’t need `useCallback`.
- If memoizing a function does not bring a noticeable performance improvement, then you don’t need `useCallback`.

---

## Comparing `useCallback` to `useMemo`, `useEffect`, and `useRef`

[**`useCallback`**](https://blog.logrocket.com/react-usememo-vs-usecallback.md), [**`useMemo`**](/blog.logrocket.com/react-usememo-vs-usecallback.md), [**`useEffect`**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md), and [**`useRef`**](/blog.logrocket.com/complete-guide-react-refs.mdcreating-refs-using-useref-hook) are all React hooks that help optimize performance, but they serve different purposes. Here’s a comparison of how each one works and when to use them:

| Feature | `useCallback` | `useMemo` | `useEffect` | `useRef` |
| ---: | --- | --- | --- | --- |
| **Purpose** | Caches a function to prevent re-creation on re-renders. | Caches a computed value to avoid unnecessary recalculations. | Runs side effects (API calls, subscriptions, DOM updates) after renders. | Stores a persistent reference without triggering re-renders. |
| **Returns** | A cached function. | A cached value. | Nothing (executes code after render). | A mutable object `{'{ current: value }'}`. |
| **Triggers Re-render?** | No | No | Yes (when state changes) | No |

---

## Conclusion

In this article, we explored the `useCallback` hook and how it optimizes app performance by preventing unnecessary re-renders. We demonstrated its use with real-world examples, discussed how to write more efficient custom hooks, and identified when `useCallback` is truly needed versus when it is unnecessary.

Additionally, we compared `useCallback` with related hooks like `useMemo`, `useRef`, and `useEffect`, clarifying their use cases in React.

Now, you have a solid understanding of `useCallback` and how to use it effectively to improve your React applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React useCallback: When and how to use it for better performance",
  "desc": "Learn how React's useCallback hook boosts performance by memoizing functions and preventing unnecessary re-renders with practical examples.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-usecallback.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
