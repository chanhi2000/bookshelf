---
lang: en-US
title: "React.memo explained: When to use it (and when not to)"
description: "Article(s) > React.memo explained: When to use it (and when not to)"
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
      content: "Article(s) > React.memo explained: When to use it (and when not to)"
    - property: og:description
      content: "React.memo explained: When to use it (and when not to)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-memo.html
prev: /programming/js-react/articles/README.md
date: 2025-02-26
isOriginal: false
author:
  - name: Emmanuel John
    url : https://blog.logrocket.com/author/emmanueljohn/
cover: /assets/image/blog.logrocket.com/react-memo/banner.png
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
  name="React.memo explained: When to use it (and when not to)"
  desc="React.memo prevents unnecessary re-renders, improving performance. Discover when to use it and how it compares to useMemo and useCallback."
  url="https://blog.logrocket.com/react-memo"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-memo/banner.png"/>

React components re-render whenever their parent updates, even if their props remain unchanged. This can cause performance issues, especially with large datasets or complex UI updates. **React.memo** helps optimize performance by [**memoizing components and preventing unnecessary re-renders**](/blog.logrocket.com/optimizing-performance-react-app.md#memoizing-react-components). But does it always work?

![](/assets/image/blog.logrocket.com/react-memo/banner.png)

In this guide, you’ll learn when to use `React.memo` — and when to avoid it.

::: details TL;DR

***What is `React.memo`, and how does it work?**

`React.memo` is a higher-order component (HOC) that memoizes functional components, preventing them from re-rendering unless their props change.

***Does `React.memo` improve performance?**

Yes, it helps optimize performance by skipping unnecessary re-renders. However, it should be used only when performance issues arise, as unnecessary memoization can add complexity.

***When should you use `React.memo`?**

Use `React.memo` when:

- A component **re-renders frequently with the same props**
- The component is **expensive to render** (e.g., large lists, complex UI elements)
- It **receives props that rarely change**

**Why is my `React.memo` component still re-rendering?**

Even with `React.memo`, a component will still re-render if:

- Its **props reference** changes (e.g., new function or object instances are created every render)
- It **depends on context or state** that updates frequently
- It contains `useEffect` or subscriptions that trigger updates

**[`React.memo` vs. `useMemo`](/blog.logrocket.com/react-memo-vs-usememo.md)vs. [`useCallback`](/blog.logrocket.com/react-usememo-vs-usecallback.md) — what’s the difference?**

- `React.memo` prevents re-renders for **entire components** when props haven’t changed
- `useMemo` memoizes **computed values** to avoid expensive recalculations
- `useCallback` memoizes **functions** to prevent unnecessary re-creation

:::

---

## What is memoization?

**Memoization** is a performance optimization technique that caches the result of a function and returns the cached value for subsequent calls with the same inputs.

In React, memoization helps prevent unnecessary re-renders of components handling large datasets, resource-heavy operations, or expensive calculations.

---

## What is `React.memo`?

`React.memo` is a React API that caches functional components on the first render and returns the cached component as long as the props remain unchanged. If the props change, the component re-renders.

Under the hood, `React.memo` uses `Object.is` for a shallow comparison of the previous and new props. If they are identical, the cached version is returned; otherwise, the component re-renders.

---

## Skipping unnecessary re-rendering

Let’s consider an ecommerce case study where a product detail page displays reviews (a review component) for each product. The review component may re-render when unrelated parts of the product page update. This happens because, by default, React re-renders a child component whenever the parent component state changes.

Create a <FontIcon icon="fa-brands fa-react"/>`ProductDetailPage.jsx` component in your React project and add the following:

```jsx :collpased-lines title="pages/ProductDetailPage.jsx"
import React, { useState } from "react";

const ProductDetailPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert("Product added to cart!");
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp"
            alt="Product"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Awesome Product</h1>
          <p className="text-gray-700 mb-4">
            This is a detailed description of the awesome product. It has
            amazing features and great quality.
          </p>
          <p className="text-xl font-semibold mb-4">$49.99</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <p className="mt-2 text-sm text-gray-500">Cart Count: {cartCount}</p>
        </div>
      </div>
      {/* Review Section */}
      <ProductReview />
    </div>
  );
};
const ProductReview = () => {
  const reviews = [
    { id: 1, author: "John Doe", rating: 5, comment: "Amazing product!" },
    { id: 2, author: "Jane Smith", rating: 4, comment: "Very good quality." },
    {
      id: 3,
      author: "Alex Johnson",
      rating: 3,
      comment: "It's decent for the price.",
    },
  ];
  console.log("ProductReview was rendered at", new Date().toLocaleTimeString());
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p className="font-semibold">{review.author}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductDetailPage;
```

The `ProductDetailPage` component is the parent component of the `ProductReview` component. It maintains a `cartCount` state to track how many times the user clicks the “Add to Cart” button, updating the count and displaying a confirmation alert. The `ProductReview` component renders a list of customer reviews and logs the render time to the console for tracking performance.

Running the project should result in the following:

![React.memo Example](/assets/image/blog.logrocket.com/react-memo/react-memo-example-1.webp)

Notice how the `ProductReview` component re-renders each time the user adds the product to the cart. This re-render is unnecessary because updating the cart does not impact the customer reviews.

Since the number of reviews in the `ProductReview` component is small, the performance impact is negligible. However, let’s examine the effect when the component handles thousands of reviews. Update the `reviews` array as follows:

```jsx
const reviews = Array.from({ length: 10000 }, () => ({ id: Math.random(), author: "John Doe", rating: 5, comment: "Amazing product!" }));
```

![React.memo Example](/assets/image/blog.logrocket.com/react-memo/react-memo-example-2.webp)

At this point, adding the product to the cart introduces a noticeable lag. If you click the **Add to Cart** button multiple times in quick succession, the entire page may freeze. This happens because React re-renders all 10,000 reviews each time the state updates, significantly slowing down the application.

Clearly, excessive re-renders negatively impact performance. We can optimize this behavior by using `React.memo` to prevent unnecessary re-renders of the `ProductReview` component.

---

## Applying `React.memo`

To optimize performance, wrap the `ProductReview` component with `React.memo` as follows:

```jsx title="ProductReview.jsx"
import React, { memo } from "react";

const ProductReview =  memo(() => {
  const reviews = Array.from({ length: 10000 }, () => ({ id: Math.random(), author: "John Doe", rating: 5, comment: "Amazing product!" }));
  console.log("ProductReview was rendered at", new Date().toLocaleTimeString());

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p className="font-semibold">{review.author}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductDetailPage;
```

With this modification, `ProductReview` will only re-render when its props change, effectively preventing unnecessary re-renders when updating the cart. This simple adjustment significantly improves the application’s responsiveness and ensures better performance:

![React.memo Example](/assets/image/blog.logrocket.com/react-memo/react-memo-example-3.webp)

---

## Optimizing re-renders when props change

`React.memo` can be used to optimize re-renders by ensuring a component updates only when its props change. Let’s demonstrate this by adding a feature that allows users to change the text color of both the product name and the review header.

### Updating `ProductDetailPage`

Modify the `ProductDetailPage` component to include a dropdown that allows users to select a text color:

```jsx :collapsed-lines title="pages/ProductDetailPage.jsx"
const ProductDetailPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [color, setColor] = useState("");

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert("Product added to cart!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        {/* Product Details */}
        <div>
          <h1 className={`text-2xl font-bold mb-4 ${color}`}>
            Awesome Product
          </h1>
          <p className="text-gray-700 mb-4">
            This is a detailed description of the awesome product. It has
            amazing features and great quality.
          </p>
          <p className="text-xl font-semibold mb-4">$49.99</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <p className="my-3 text-sm text-gray-500">Cart Count: {cartCount}</p>
          <div>
            <p className="font-medium">Change Text Color</p>
            <select
              value={color}
              onChange={handleChange}
              className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Choose an option --
              </option>
              <option value="text-blue-700">Blue</option>
              <option value="text-red-700">Red</option>
              <option value="text-green-700">Green</option>
            </select>
          </div>
        </div>
      </div>
      {/* Review Section */}
      <ProductReview color={color} />
    </div>
  );
};
```

Here, we’ve added a dropdown select to choose different text colors and pass the `color` prop to the `ProductReview` component.

To access the `color` prop, make the following changes to the `ProductReview` component:

```jsx
const ProductReview = memo(({color}) => {
  const reviews = Array.from({ length: 10000 }, () => ({ id: Math.random(), author: "John Doe", rating: 5, comment: "Amazing product!" }));
  console.log("ProductReview was rendered at", new Date().toLocaleTimeString());

  return (
    <div className="mt-10">
      <h2 className={`text-xl font-bold mb-4 ${color}`}>Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p className="font-semibold">{review.author}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
```

With these modifications:

- The `ProductReview` component will re-render only when the `color` prop changes
- Changing the cart count will no longer trigger a re-render of the `ProductReview` component

This ensures better performance and prevents unnecessary renders, improving the responsiveness of the application:

![`React.memo` Example](/assets/image/blog.logrocket.com/react-memo/react-memo-example-4.webp)

---

## Skipping expensive recalculations with useMemo

Did you notice the lag in the UI after choosing a text color? This happens because when the `color` prop changes, thousands of reviews are regenerated using `Array.from()` and then re-rendered. To fix this issue, we’ll use the `useMemo` hook to cache the result of the `reviews` computation.

### Optimizing `ProductReview` with `useMemo`

```jsx
const ProductReview = memo(({ color }) => {
  const reviews = useMemo(() =>
    Array.from({ length: 10000 }, () => ({
      id: Math.random(),
      author: "John Doe",
      rating: 5,
      comment: "Amazing product!"
    })), []);

  console.log("ProductReview was rendered at", new Date().toLocaleTimeString());
  
  return (
    <div className="mt-10">
      <h2 className={`text-xl font-bold mb-4 ${color}`}>Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <p className="font-semibold">{review.author}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
```

With this modification, the `reviews` array is computed only on the first render, significantly improving performance.

### Adding dependencies to `useMemo`

```jsx
const [size, setSize] = useState(10);
const reviews = useMemo(() =>
  Array.from({ length: size }, () => ({
    id: Math.random(),
    author: "John Doe",
    rating: 5,
    comment: "Amazing product!"
  })), [size]);
```

Now, `useMemo` will recompute `reviews` each time the `size` dependency changes.

---

## Memoizing function props

By default, function definitions in React components change on every re-render. If a function is passed as a prop to a memoized component, memoization will not work unless the function itself is memoized.

### Example without memoization

```jsx title="Cart.jsx"
export default function Cart({ orderId }) {
  function handleCheckout(orderDetails) {
    post('/checkout/' + orderId + '/buy', {
      orderDetails
    });
  }

  return <Checkout onSubmit={handleCheckout} />;
}
```

In this case, `handleCheckout` is re-created every render, causing unnecessary re-renders in `Checkout`.

### Using `useMemo`

```jsx title="Cart.jsx"
export default function Cart({ orderId }) {
  const handleCheckout = useMemo(() => (orderDetails) => {
    post('/checkout/' + orderId + '/buy', {
      orderDetails
    });
  }, [orderId]);

  return <Checkout onSubmit={handleCheckout} />;
}
```

A cleaner approach is to use `useCallback`.

### Using `useCallback`

```jsx
const handleCheckout = useCallback(
  (orderDetails) => {
    post('/checkout/' + orderId + '/buy', {
      orderDetails
    });
  }, [orderId]);
```

---

## Memoizing array and object props

Similar to functions, array and object definitions change on every re-render. If an object or array is passed as props to a memoized component, memoization will not work unless they are also memoized.

### Memoizing an object

```jsx
const paymentOptions = useMemo(() => ({
  paymentMode: 'credit-card',
  amount: amount
}), [amount]);
```

### Memoizing an array

```jsx
const cardTypes = useMemo(() => ['credit-card', 'debit-card'], []);
```

By memoizing objects and arrays, we ensure that components relying on them do not re-render unnecessarily, leading to better performance and efficiency in React applications.

Just like the function definition, every array and object definition in a React component changes on every rerender and if an object or array is passed as props to a memoized component, memoization will not work.

Here is how to memoize an object:

```jsx
const paymentOptions = useMemo(() => {
  return {
    paymentMode: 'credit-card',
    amount: amount
  };
}, [amount]);
```

Here is how to memoize an array:

```jsx
const cardTypes = useMemo(() => {
  return ['credit-card', 'debit-card'];
}, []);
```

---

## Optimizing component re-rendering when context changes

By default, React re-renders components when there’s a change in context. This also applies to memoized components, as demonstrated in the following code snippet:

```jsx title="App.jsx"
import React, { createContext, useContext, useState, memo } from 'react';
const UserContext = createContext();

export const App = () => {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  return (
    <UserContext.Provider value={user}>
      <UserName />
      <p style={{ color: 'white' }}>Age: {user.age}</p>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Increment Age
      </button>
    </UserContext.Provider>
  );
};

const UserName = memo(() => {
  const { name } = useContext(UserContext);
  console.log('UserName rendered');
  return <div style={{ color: 'white' }}>User Name: {name}</div>;
});
```

Each time the user’s `age` value changes, the memoized `UserName` component still re-renders, even though the `name` value remains unchanged. To prevent this, pass only the required part of the context as a prop to the memoized component.

```jsx title="App.jsx"
import React, { createContext, useContext, useState, memo } from 'react';
const UserContext = createContext();

export const App = () => {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  return (
    <UserContext.Provider value={user}>
      <UserDisplay />
      <p style={{ color: 'white' }}>Age: {user.age}</p>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Increment Age
      </button>
    </UserContext.Provider>
  );
};

const UserDisplay = () => {
  const { name } = useContext(UserContext);
  return <UserName name={name} />;
};

const UserName = memo(({ name }) => {
  console.log('UserName rendered');
  return <div style={{ color: 'white' }}>User Name: {name}</div>;
});
```

---

## When you should avoid memoization

Avoid using memoization:

1. **If there is no noticeable lag in UI interactions.**
2. **When using values inside `useEffect`**
3. **To wrap JSX nodes**

Memoizing values used inside `useEffect` is unnecessary. Instead, move the value inside the effect:

```jsx
useEffect(() => {
  const options = {
    serverUrl: 'https://localhost:1234',
    roomId: roomId
  };

  const connection = createConnection(options);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

Wrapping JSX nodes in `useMemo` prevents conditional rendering:

```jsx
const children = useMemo(() => <ProductList items={products} />, [products]);
```

---

## Using `PureComponent` in class components

For class-based components, `React.memo`, `useMemo`, and `useCallback` will not work. Instead, use `PureComponent`, which re-renders only when its props change:

```jsx title="PureComponentExample.jsx"
class PureComponentExample extends React.PureComponent {
  render() {
    console.log('Pure Component rendered');
    return <div>{this.props.value}</div>;
  }
}
```

### Potential issues with `PureComponent`

If you pass objects or arrays that mutate without changing their reference, `PureComponent` may not detect changes:

```jsx :collapsed-lines title="App.jsx"
import React, { PureComponent } from 'react';

class ChildComponent extends PureComponent {
  render() {
    console.log('ChildComponent rendered');
    return <div>Message: {this.props.data.message}</div>;
  }
}

export default class App extends React.Component {
  state = {
    data: { message: 'Hello' }
  };

  updateMessage = () => {
    const { data } = this.state;
    data.message = 'Hello, World!'; // Mutating the state object
    this.setState({ data }); // Setting the same object reference
  };

  render() {
    return (
      <div>
        <ChildComponent data={this.state.data} />
        <button onClick={this.updateMessage}>Update Message</button>
      </div>
    );
  }
}
```

Because `this.setState({ data })` does not create a new object reference, `PureComponent` cannot detect the update, and `ChildComponent` will not re-render. To fix this, always create a new reference:

```jsx
updateMessage = () => {
  this.setState({ data: { ...this.state.data, message: 'Hello, World!' } });
};
```

---

## Comparing `React.memo` to `useMemo`, `useCallback`, and `PureComponent`

The following table will help you know when to use `React.memo`, `useMemo`, `useCallback`.

| Feature | `React.memo` | `useMemo` | `useCallback` | `PureComponent` |
| ---: | --- | --- | --- | --- |
| **Usage** | Prevent component re-renders | Avoid recalculating values | Avoid recreating functions | Avoid re-rendering in class components |
| **Scope** | Component-level | Value-level | Function-level | Class components only |

---

## Conclusion

In this article, we explored how `React.memo` can improve app performance by skipping unnecessary re-renders. We covered real-world use cases, best practices, and when to avoid memoization. Additionally, we compared `React.memo` with `useMemo`, `useCallback`, and `PureComponent` to understand their specific use cases.

By applying these techniques wisely, you can significantly enhance the efficiency of your React applications!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React.memo explained: When to use it (and when not to)",
  "desc": "React.memo prevents unnecessary re-renders, improving performance. Discover when to use it and how it compares to useMemo and useCallback.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-memo.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
