---
lang: en-US
title: "How to Reduce Round Trip Time (RTT) with Next.js"
description: "Article(s) > How to Reduce Round Trip Time (RTT) with Next.js"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Reduce Round Trip Time (RTT) with Next.js"
    - property: og:description
      content: "How to Reduce Round Trip Time (RTT) with Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-reduce-round-trip-time-rtt-with-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2025-11-06
isOriginal: false
author:
  - name: Chukwudi Nweze
    url : https://freecodecamp.org/news/author/Chukwudinweze/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762424304223/4d818ff7-0fe2-448d-8acd-3da092bc55a4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Reduce Round Trip Time (RTT) with Next.js"
  desc="Have you ever wondered why some websites load almost immediately and others leave you looking at a blank screen, even when your internet connection is fast? In some cases, your internet speed may not be the issue. It is usually because of Round Trip ..."
  url="https://freecodecamp.org/news/how-to-reduce-round-trip-time-rtt-with-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762424304223/4d818ff7-0fe2-448d-8acd-3da092bc55a4.png"/>

Have you ever wondered why some websites load almost immediately and others leave you looking at a blank screen, even when your internet connection is fast? In some cases, your internet speed may not be the issue. It is usually because of Round Trip Time (RTT), which is how long it takes your browser to send a request to a server and get a response.

The internet depends on physical infrastructure: fiber-optic cables, satellites, and data centers often located thousands of kilometers away. Network requests travel at high speed, but they are still limited by the speed of light (around 300,000 km/s). For instance, a network request from Lagos, Nigeria to a server in San Francisco, USA travels more than 12,000 km, and takes about 150–200 milliseconds for a single round trip under ideal conditions. Multiply that by the 20–30 requests a typical web page makes (for HTML, CSS, images, APIs and more), and those milliseconds quickly add up to seconds of delay before a page fully loads.

In this article, we’ll explain in detail what Round Trip Time(RTT) is, why it is one of the most overlooked factors in web performance, and how you can use Next.js to minimize the number of RTTs to make your applications feel fast and responsive. You will learn how features like Server-Side Rendering (SSR), React Server Components (RSC), image optimization, and caching all work together to reduce Round Trip Time in a web page.

---

## What is Round Trip Time (RTT)?

When you visit a website, the browser makes a network request to a server. The server processes the request and then sends a response back. The Round Trip Time is the complete duration of this journey in milliseconds, which includes:

1. **Travel Time**: The amount of time it took the network request to get to the server.
2. **Processing Time**: The amount of time the server took to process the request.
3. **Return Time**: The amount of time it took the response get back to the browser.

![An illustration showing round-trip time (RTT) communication between a client and a server, where the client request takes about 100 ms to reach the server, and the server response takes about 200 ms to return to the client](https://cdn.hashnode.com/res/hashnode/image/upload/v1761405949671/1ceaadf4-5576-41ae-9f25-e846f41b3e67.png)

### How Distance Increases Round Trip Time

Round Trip Time depends heavily on the physical distance between the client and server. For example:

- A user in Lagos, Nigeria making a network request to a server in London that is about 5,000 km away might see a round trip time of 100–150 ms.
- A server in San Francisco that is about 12,000 km could push the roundtrip time to 200–300 ms. The farther the server, the higher the round trip time.

---

## How Round Trip Time Affects Web Performance

Modern web pages make multiple network requests to load completely. Imagine loading an e-commerce product page that requires:

- 1 network request for HTML (about 200 ms)
- 5 network requests for CSS/JavaScript (about 1,000 ms)
- 10 network requests for images (about 2,000 ms)
- 4 network requests for product data via API (about 800 ms)

That shows that the product page will take 20 network requests to fully load, which is about 4 seconds of network delay.

The probability of bounce increases 32% as page load time goes from 1 second to 3 seconds ([<VPIcon icon="fa-brands fa-google"/>Google/SOASTA Research, 2017](https://thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/)). That means about one-third of visitors leave before the page even loads.

### Why Client-Side Rendering Feels Slower

In client side rendering applications, each request adds a round trip time, and traditional client-side rendering (CSR) in React apps increases this:

- The browser downloads a minimal HTML shell and a large JavaScript bundle.
- The JavaScript runs to fetch data and render the UI, requiring additional network requests.
- Each API call adds another RTT, delaying the First Contentful Paint (FCP).

First Contentful Paint (FCP) measures the time from when the user first navigated to the page to when any part of the page's content such as text, images,`<svg>` or `<canvas>` elements is rendered on the screen.

In CSR apps, FCP is delayed because the browser cannot display any meaningful content until JavaScript has finished loading, parsing, and executing the code needed to construct the UI. A regular CSR application may need 5 to 10 network round trips to get all the resources needed for the rendering of the UI, which can easily add several seconds of delay.

```jsx title="pages/index.js"
// (CSR)
import { useState, useEffect } from "react"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Fetch data after page loads
    fetch("https://api.example.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {products.length ? (
        products.map((product) => <p key={product.id}>{product.name}</p>)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
```

In the code above, when the `Home` component mounts, it initializes the state as an empty array. The `useEffect` hook then runs once to make an API request. While the request is in progress, the “Loading...” message is displayed on the screen. Once the request completes successfully, React updates the state with the fetched data and re-renders the UI to display the products. This process introduces an extra round trip, which further delays the FCP.

---

## How to Reduce Round Trip Time with Next.js

You cannot eliminate round trip time completely. Data must still travel over the network. What Next.js does is to reduce how often those network requests happen and how much data each request carries. It does this through a number of techniques, such as **Server-Side Rendering (SSR)**, **React Server Components (RSC)**, **image optimization**, and **caching or static rendering**.

### Server-Side Rendering (SSR)

Unlike traditional React.js applications, where the browser handles the majority of the work, such as fetching static files, JavaScript, and data required to render a page, the server generates the whole HTML, fetches the data, renders the page, and sends it to the browser in a single round trip time.

::: info Advantages

- **Fewer Round Trips:** Since data fetching and rendering take place on the server, the browser receives a ready-to-display page in one round trip time.
- **Improved First Contentful Paint:** Low round trip time means content displays on the page almost immediately.

```jsx title="pages/index.js"
// (SSR)
export async function getServerSideProps() {
  // Fetch data on the server
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return {
    props: { products }, // Pass data to the page
  };
}

export default function Home({ products }) {
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
```

In the code above, `getServerSideProps` runs entirely on the server. When a user visits or refreshes the page, `getServerSideProps()` is called to fetch product data from the external API. The fetched data is then pre-rendered on the server, meaning the list of products is included in the HTML before it is sent to the browser to display. This removes the additional round trip seen in CSR and improves the FCP, since users see meaningful content as soon as the page loads.

:::

### React Server Components (RSC)

Server-Side Rendering is a technique where the whole page gets generated on the server. But imagine if only some portions of a page are to be rendered on the server while others are to be rendered on the client?

React Server Components allow partition of rendering between the server and the client.

For example, a `ProductList` component can be rendered on the server, while a `SearchInput` component renders on the client to manage user interactions.

::: info Advantages

RSC reduces the overall round trip time (RTT) and also increases the page first contentful paint.

```jsx title="app/ProductList.jsx"
// (Server Component)
async function ProductList() {
  // Fetch data on the server
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
      <ClientSearch /> {/* Client Component */}
    </div>
  );
}

export default ProductList;
```

In the code above, `ProductList` is a server component with a `ClientSeacrch` component as a child component. The `ClientSearch` renders in the browser while the rest of the `ProductList` renders on the server. When the page loads, the server runs `fetch()` to retrieve product data and renders the complete HTML for the product list on the server while `ClientSearch` renders on the client side to handle user interactions.

```jsx title="components/ClientSearch.jsx"
// (Client Component)
'use client';

import { useState } from 'react';

export default function ClientSearch() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}
```

The `ClientSearch` component above handles user interactions, such as updating the search input with `useState`. It’s marked with `'use client'`, so it runs entirely in the client side.

:::

### Image Optimization

Images negatively impact round-trip time RTT when they are unoptimized, as larger files take a longer time to transfer from the server to the browser.

Next.js Image component optimizes images automatically:

- **Resizing**: It adjusts image size based on the user’s device.
- **Compression**: It uses new formats like WebP to shrink the file size significantly.
- **Lazy Loading**: Loads images only when they enter the user’s viewport, which reduces the number of initial requests.

```jsx title="pages/index.js"
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <Image
        src="/product.jpg"
        alt="Product Image"
        width={500}
        height={300}
      />
    </div>
  );
}
```

In the code above, the page uses Next.js built-in `Image` component to render an optimized image. When the page loads, Next.js optimizes the image resizing, lazy loading, and so on. This means the browser will only download the right image size for the device.

### Caching and Static Rendering

With SSR and Server Component, round trip time can still remain high if the server has to process data on every request. Next.js solves this problem with Static Site Generation (SSG) and Incremental Static Regeneration (ISR).

Here’s how it works:

- **Static Site Generation**: Pages are pre-rendered during build time, cached and delivered as static HTML from a CDN.
- **Incremental Static Regeneration**: Pages are pre-rendered but can be re-generated in the background after an interval, for example, every 60 seconds.

```jsx title="app/page.jsx"
export const revalidate = 60; // Regenerate the page every 60 seconds

export default async function Home() {
  // Fetch data on the server
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 }, 
  });
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
```

In the code above, the page uses Incremental Static Regeneration (ISR). The `revalidate = 60` option is to regenerate the page every 60 seconds. When a user visits the page, the server serves the pre-rendered HTML instantly. The `next: { revalidate: 60 }` inside the `fetch()` means that data is cached for 60 seconds. After 60 seconds, the next request will trigger the server to regenerate a fresh data.

---

## Trade-offs Across Next.js Rendering Methods

With **Server-Side Rendering (SSR)**, the browser gets the complete rendered page in only one round round trip. On the other hand, this can also lead to increased server load and a high TTFB. The TTFB (Time to First Byte) is the duration it takes for a user to see the content displayed on their browser.

With **Incremental Static Regeneration (ISR)**, the page is pre-rendered and cached, thus getting an instantaneous response from the server. The page will be re-generated depending on a fixed period (such as every 60 seconds). The downside of this method is that users might see old content before it gets updated.

In **Server Components**, rendering takes place on the server, and only interactive parts are managed on the client. With this, server-side rendering are still maintained while still allowing client interactions. The only drawback is that developers need to be very particular while deciding what to run on the server and what to run on the client.

---

## When to Use Each Rendering Method

**Server-Side Rendering (SSR)** should be applied to pages that updates frequently, such as dashboards, user profiles, and so on. SSR guarantee users to always see the latest data.

As for **Incremental Static Regeneration (ISR)**, it should be applied to pages with infrequent changes, for instance, product listings, marketing pages, or blogs.

Use **Server Components** when you want part of the page to render on the server while some sections run on the client. For instance, pages that need user interaction like search inputs or filters, while data fetching and rendering takes place on the server.

---

## Conclusion

Round Trip Time (RTT) is one of the hidden factors behind slow page loads. Each network request adds a round trip, and these network delays build up as the browser fetches several resources like scripts, images, and data files. Next.js deals with this issue by minimizing the number of network requests that need to be done before the first content paint.

- **Server-Side Rendering (SSR)** and **React Server Components (RSC)** shift data fetching and rendering to the server, which reduces client-side requests.
- **Image optimization** reduces image size and uses CDNs to deliver content faster from nearby servers.
- **Caching and static rendering** serve pre-generated pages instantly without further processing from the server.

With these techniques, you can build web applications that load faster and feel more responsive, even for users who are far from your origin server or are on slower networks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Reduce Round Trip Time (RTT) with Next.js",
  "desc": "Have you ever wondered why some websites load almost immediately and others leave you looking at a blank screen, even when your internet connection is fast? In some cases, your internet speed may not be the issue. It is usually because of Round Trip ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-reduce-round-trip-time-rtt-with-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
