---
lang: en-US
title: "The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton"
description: "Article(s) > The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton"
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
      content: "Article(s) > The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton"
    - property: og:description
      content: "The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-nextjs-15-streaming-handbook/
prev: /programming/js-next/articles/README.md
date: 2025-08-07
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754503023167/aff9af73-7733-4525-8bf4-0ded59eceefa.png
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
  name="The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton"
  desc="Next.js is currently one of the most popular and intelligent Web Frameworks out there. But many developers using Next.js often can’t fully utilise its superpowers simply because some of its advanced concepts are hard to understand. In this in-depth t..."
  url="https://freecodecamp.org/news/the-nextjs-15-streaming-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754503023167/aff9af73-7733-4525-8bf4-0ded59eceefa.png"/>

Next.js is currently one of the most popular and intelligent Web Frameworks out there. But many developers using Next.js often can’t fully utilise its superpowers simply because some of its advanced concepts are hard to understand.

In this in-depth tutorial, you’ll dive into one such advanced concept in Next.js called [<FontIcon icon="iconfont icon-nextjs"/>Streaming](https://nextjs.org/learn/dashboard-app/streaming). Technically, this is a feature from React.js, but when used correctly with Next.js, it can massively improve the User Experience of any web application.

After reading this article, you’ll understand what streaming is and how it works. You’ll also be able to implement a super smooth User Experience on your own website. And your app? It’ll feel blazing fast and perform like a champ! So, without any further ado, let’s get started.

- [Project Setup — Demo SSR Page](#heading-project-setup-demo-ssr-page)
- [Discovering SSR Issues - UX and False Interaction](#heading-discovering-ssr-issues-ux-and-false-interaction)
- [How Streaming Can Solve The Problem](#heading-how-streaming-can-solve-the-problem)
- [Two Types of Streaming in Next.js](#heading-two-types-of-streaming-in-nextjs)
- [Next.js Automatic Streaming - loading.js](#heading-nextjs-automatic-streaming-loadingjs)
- [Forcing Dynamic Rendering for Effective Streaming](#heading-forcing-dynamic-rendering-for-effective-streaming)

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. A basic understanding of React.js, including components, hooks (`useState`), and props.
2. Familiarity with Next.js concepts such as routing, `app` directory, and server/client components.
3. Basic knowledge of Server-Side Rendering (SSR) and Static Site Generation (SSG) in Next.js.
4. Some experience working with asynchronous JavaScript, particularly Promises and `async/await`.
5. A general understanding of React Suspense and how it’s used to handle asynchronous rendering.
6. A working development environment with Node.js and npm/yarn installed.
7. Optional but helpful: Awareness of UI component libraries like shadcn/ui, as used in the example project.

:::

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out here:

<VidStack src="youtube/xTT_Sd_xqh0" />

---

## What is Streaming?

Imagine going to a website where the page shell loads almost instantly. Content like images, text, and widgets flows in piece by piece as it's ready. That's streaming in action.

Instead of waiting for the server to gather all the pieces of HTML before sending the whole bundle in one large batch, streaming permits the server to send blocks of markup as each block finishes rendering.

From the user's perspective, the page is snappier - you receive a skeleton or a header immediately, followed by the rest of the UI rolling out without a lengthy blank pause.

---

## Why Streaming Matters

Using streaming brings with it many benefits, like:

- Perceived speed: Initial chunks enable the browser to render something useful right away.
- Progressive hydration: React can hydrate interactive chunks as soon as they are received, reducing idle time.
- Better UX: Users can read or interact with parts of the page while the rest is loading.
- Elegant fallbacks: You can render light-weight placeholders (loading skeletons) where data is pending, and then swap in real content seamlessly.

By breaking your HTML into a stream rather than a monolith, you optimize both network and rendering performance. And with React 18’s server-side streaming APIs under the hood, it’s easier than ever to adopt this pattern in modern frameworks like Next.js.

---

## How Streaming Works in Next.js 15

Next.js 15 leans heavily on React 18’s built-in streaming capabilities and makes them available with minimal setup. Here’s the high-level flow:

### 1. Server Components & Suspense

When you use React’s Server Components, Next.js can begin rendering your component tree on the server. Wherever you introduce a boundary (or implicitly via a <FontIcon icon="fa-brands fa-js"/>`loading.js` file), React can pause, flush the HTML up to that point, and immediately stream it to the browser.

### 2. Automatic vs Manual Streaming

With automatic streaming, you drop a <FontIcon icon="fa-brands fa-js"/>`loading.js` file alongside any route or layout segment. Next.js will detect it, render your loading skeleton first, and stream in the rest of the page as data becomes available.

With manual streaming, on the other hand, you wrap specific parts of your UI in within your server components. Only those segments stream independently, giving you granular control.

### 3. Chunked HTML over HTTP

Under the hood, Next.js uses Node’s HTTP response streaming. As each React Server Component finishes, Next.js pipes that HTML into the response stream. The client’s browser starts parsing immediately, and React hydrates the markup into interactive React components on the fly.

### 4. Seamless Hydration

Because React knows exactly which chunks correspond to which components, it can hydrate incrementally. That means you avoid “waterfall” loading where one big hydration step blocks the rest of the page.

In the sections ahead, we’ll start with a simple **SSR demo** and then explore common pitfalls with this approach like false interactions and poor UX. Then we’ll solve those problems using Streaming.

We’ll cover both Automatic Streaming with <FontIcon icon="fa-brands fa-js"/>`loading.js` and Manual Streaming via custom Suspense boundaries, so you can choose the pattern that fits your need. You’ll also have hands-on code examples to make your Next.js 15 site feel lightning fast.

---

## Project Setup — Demo SSR Page

Let’s kick things off with a simple example. To begin, let's set up a simple Next.js project. Run the following commands in your terminal to create a Next.js boilerplate and run the `dev` server:

```sh
npx create-next-app@latest nextjs-streaming-demo
cd nextjs-streaming-demo
npm run dev
```

### Home Page

Once the development server is running, open the <FontIcon icon="fas fa-folder-open"/>`app/`<FontIcon icon="fa-brands fa-js"/><FontIcon icon="fa-brands fa-js"/>`page.js` file and update it with the following code:

```jsx title="app/page.js"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-24">
      <div>
        <h1 className="text-3xl lg:text-5xl font-bold text-center">
          Next.js Streaming
        </h1>
      </div>
      <Link href="/streaming-demo" prefetch={false}>
        <Button size="lg" className="cursor-pointer">
          Streaming Demo
        </Button>
      </Link>
    </div>
  );
}

```

This code creates a basic Homepage with a heading titled "Next.js Streaming" and a link labeled "Streaming Demo" that navigates to the `/streaming-demo` route.

### Streaming Demo Page

Now let’s create the `streaming-demo` page. Create another <FontIcon icon="fa-brands fa-js"/>`page.js` file inside <FontIcon icon="fas fa-folder-open"/>`app/streaming-demo` folder and write the below code inside it:

```jsx title="app/streaming-demo/page.js"
import ToolsCards from "@/components/tools-cards";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ToolsCards />
    </div>
  );
}

```

### `ToolsCards` Component

There’s really not much going on here. It’s a simple page which is using a component called `ToolsCard`. Now write the `ToolsCard` component code:

```jsx title="components/tools-card.js"
import IconCard from "@/components/icon-card";
import getTools from "@/lib/getTools";

const ToolsCards = async () => {
  const tools = await getTools();
  const toolsWithData = await Promise.all(tools);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
        {toolsWithData.map((tool) => (
          <IconCard key={tool} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsCards;
```

### Simulate Fake Delay With `getTools()` Function

Inside the above `ToolsCard` component, tools are fetched using a function called `getTools()`. Now let’s write the `getTools()` function inside a file called <FontIcon icon="fas fa-folder-open"/>`lib/`<FontIcon icon="fa-brands fa-js"/>`getTools.js`:

```js title="lib/getTools.js"
const TOOLS = [
  "JavaScript",
  "React",
  "Vue",
  "Svelte",
  "Preact",
  "Angular",
  "Astro",
  "Flutter",
  "Solid",
];

const getTools = async () => {
  "use server";

  return TOOLS.map((tool) => generateToolsData(tool, DELAY));
};

export default getTools;
```

The `getTools()` function is a [<FontIcon icon="iconfont icon-nextjs"/>Server Function](https://nextjs.org/docs/app/getting-started/updating-data#what-are-server-functions). It maps over an array called `TOOLS`. If you check that `TOOLS` array, it’s just a simple array of strings - names of different tools like JavaScript, React, Vue, and so on.

While mapping through that `TOOLS` array, each tool string is passed into a function called `generateToolsData()`. This function takes two parameters: the `tool` name and a `delay`. We’ve set this delay to 3000 - meaning 3000 milliseconds or 3 seconds. Now let’s create the `generateToolsData()` function. Its main goal is to simulate a fake delay:

```js title="lib/getTools.js"
async function generateToolsData(tool, delay) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * delay));

    return tool;
}
```

The above `generateToolsData()` function uses `setTimeout()` and multiplies it with a random number and your predefined `delay` value, so each item experiences a slightly different delay.

To simulate the delay, you’re using a `Promise` and awaiting it to maintain asynchronous behavior. So essentially, you’re simulating that each tool takes a bit of time to "hang." Because of this, the `TOOLS.map()` function is returning an array of `Promises`. Since this is an `async` function, it naturally returns `Promises`.

Now get back in the <FontIcon icon="fa-brands fa-js"/>`tools-card.js` file, and you’ll see that you’re getting an array of `Promises` from `getTools()`. Then, you’re passing that array to `Promise.all()`, which resolves all the `Promises` together. Finally, you get back an array of strings - one for each tool - but each one had a delay before resolving.

So, you just simulated a loading delay using `async` `setTimeout()`. But in real life, this delay could come from fetching data from a database, a network request or hitting an external API server. Basically, for any `async` operation that takes time, you’ve just simulated that behaviour.

Now, using the `toolsWithData` array, you’re running a map() again, and for each tool (which is just a string), you’re rendering an `IconCard` component. The `tool` name is passed as a prop into `IconCard`. IconCard can be just a simple presentational component that renders a card. You can use the [<FontIcon icon="iconfont icon-shadcn"/>`Card`](https://ui.shadcn.com/docs/components/card) component from the [<FontIcon icon="iconfont icon-shadcn"/>Shadcn](https://ui.shadcn.com/) UI library.

### Installing Shadcn Card Component

To install the Shadcn `Card` component, go to your terminal, stop the Next.js `dev` server, and run the below command:

```sh
npx shadcn@latest add card
```

Follow the on screen instructions, and congratulations! You have successfully installed the Shadcn `Card` component in your project. Start the Next.js `dev` server again.

### `IconCard` Component

Now create a new file inside the <FontIcon icon="fas fa-folder-open"/>`components` folder called <FontIcon icon="fa-brands fa-js"/>`icon-card.js` and write the below code inside it:

```jsx title="components/icon-card.js"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import IconComponent from "./icon-component";
import LikeButton from "./like-button";

export default function IconCard({ tool }) {
  return (
    <Card className="w-full hover:cursor-pointer hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-lg font-medium h-[28px] w-24">{tool}</div>
        <LikeButton />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <IconComponent id={tool} />
      </CardContent>
    </Card>
  );
}
```

Here you can see a card header showing the `tool` name and a “Like” Button beside it (which is its own separate component). In the card content area below, there’s an icon - rendered by another presentational `IconComponent`. Now it's time to write code for the `IconComponent` as well.

### IconComponent

Create a new file <FontIcon icon="fas fa-folder-open"/>`components/`<FontIcon icon="fa-brands fa-js"/>`icon-component.js` and write the below code to it:

```jsx :collapsed-lines title="components/icon-component.js"
const icons = [
  {
    id: "Angular",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 223 236">
        <path
          fill="url(#b)"
          d="m222.08 39.2-8.02 125.91L137.39 0l84.69 39.2Zm-53.1 162.82-57.94 33.05-57.93-33.05 11.78-28.56h92.3l11.78 28.56ZM111.03 62.68l30.36 73.8H80.68l30.36-73.8ZM7.94 165.12 0 39.19 84.69 0 7.94 165.12Z"
        />
        <path
          fill="url(#c)"
          d="m222.08 39.2-8.02 125.91L137.39 0l84.69 39.2Zm-53.1 162.82-57.94 33.05-57.93-33.05 11.78-28.56h92.3l11.78 28.56ZM111.03 62.68l30.36 73.8H80.68l30.36-73.8ZM7.94 165.12 0 39.19 84.69 0 7.94 165.12Z"
        />
        <defs>
          <linearGradient
            id="b"
            x1="49.01"
            x2="225.83"
            y1="213.75"
            y2="129.72"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E40035" />
            <stop offset=".24" stopColor="#F60A48" />
            <stop offset=".35" stopColor="#F20755" />
            <stop offset=".49" stopColor="#DC087D" />
            <stop offset=".74" stopColor="#9717E7" />
            <stop offset="1" stopColor="#6C00F5" />
          </linearGradient>
          <linearGradient
            id="c"
            x1="41.02"
            x2="156.74"
            y1="28.34"
            y2="160.34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF31D9" />
            <stop offset="1" stopColor="#FF5BE1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  }, {
    id: "Astro",
    icon: (
      <svg viewBox="0 0 85 107" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.5894 91.1365C22.7555 86.7178 21.3444 77.4335 23.3583 70.7072C26.8503 74.948 31.6888 76.2914 36.7005 77.0497C44.4375 78.2199 52.0359 77.7822 59.2232 74.2459C60.0454 73.841 60.8052 73.3027 61.7036 72.7574C62.378 74.714 62.5535 76.6892 62.318 78.6996C61.7452 83.5957 59.3086 87.3778 55.4332 90.2448C53.8835 91.3916 52.2437 92.4167 50.6432 93.4979C45.7262 96.8213 44.3959 100.718 46.2435 106.386C46.2874 106.525 46.3267 106.663 46.426 107C43.9155 105.876 42.0817 104.24 40.6845 102.089C39.2087 99.8193 38.5066 97.3081 38.4696 94.5909C38.4511 93.2686 38.4511 91.9345 38.2733 90.6309C37.8391 87.4527 36.3471 86.0297 33.5364 85.9478C30.6518 85.8636 28.37 87.6469 27.7649 90.4554C27.7187 90.6707 27.6517 90.8837 27.5847 91.1341L27.5894 91.1365Z"
          fill="white"
        />
        <path
          d="M27.5894 91.1365C22.7555 86.7178 21.3444 77.4335 23.3583 70.7072C26.8503 74.948 31.6888 76.2914 36.7005 77.0497C44.4375 78.2199 52.0359 77.7822 59.2232 74.2459C60.0454 73.841 60.8052 73.3027 61.7036 72.7574C62.378 74.714 62.5535 76.6892 62.318 78.6996C61.7452 83.5957 59.3086 87.3778 55.4332 90.2448C53.8835 91.3916 52.2437 92.4167 50.6432 93.4979C45.7262 96.8213 44.3959 100.718 46.2435 106.386C46.2874 106.525 46.3267 106.663 46.426 107C43.9155 105.876 42.0817 104.24 40.6845 102.089C39.2087 99.8193 38.5066 97.3081 38.4696 94.5909C38.4511 93.2686 38.4511 91.9345 38.2733 90.6309C37.8391 87.4527 36.3471 86.0297 33.5364 85.9478C30.6518 85.8636 28.37 87.6469 27.7649 90.4554C27.7187 90.6707 27.6517 90.8837 27.5847 91.1341L27.5894 91.1365Z"
          fill="url(#paint0_linear_1_59)"
        />
        <path
          d="M0 69.5866C0 69.5866 14.3139 62.6137 28.6678 62.6137L39.4901 29.1204C39.8953 27.5007 41.0783 26.3999 42.4139 26.3999C43.7495 26.3999 44.9325 27.5007 45.3377 29.1204L56.1601 62.6137C73.1601 62.6137 84.8278 69.5866 84.8278 69.5866C84.8278 69.5866 60.5145 3.35233 60.467 3.21944C59.7692 1.2612 58.5911 0 57.0029 0H27.8274C26.2392 0 25.1087 1.2612 24.3634 3.21944C24.3108 3.34983 0 69.5866 0 69.5866Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_59"
            x1="22.4702"
            y1="107"
            x2="69.1451"
            y2="84.9468"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D83333" />
            <stop offset="1" stopColor="#F041FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  }, {
    id: "Flutter",
    icon: (
      <svg viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.15 9.23H10l-5.38 5.39 3.07 3.07 8.46-8.46Z"
          fill="#54C5F8"
        />
        <path d="M3.08 13.08 0 10 10 0h6.15L3.08 13.08Z" fill="#54C5F8" />
        <path d="M7.7 17.7 10 20h6.15l-5.38-5.38-3.08 3.07Z" fill="#01579B" />
        <path
          d="m7.7 11.54-3.08 3.08 3.07 3.07 3.08-3.07-3.08-3.08Z"
          fill="#29B6F6"
        />
      </svg>
    ),
  }, {
    id: "JavaScript",
    icon: (
      <svg viewBox="-2 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h20v20H0V0Z" fill="#F7DF1E" />
        <path
          d="M13.43 15.62c.41.67.92 1.14 1.87 1.14.76 0 1.27-.38 1.27-.92 0-.63-.5-.89-1.36-1.24l-.48-.22c-1.37-.57-2.25-1.3-2.25-2.82 0-1.4 1.08-2.48 2.73-2.48 1.2 0 2.06.41 2.7 1.5l-1.47.94c-.34-.57-.7-.79-1.23-.79-.54 0-.9.35-.9.8 0 .57.36.79 1.18 1.14l.45.19c1.62.7 2.5 1.4 2.5 2.95 0 1.68-1.33 2.63-3.1 2.63-1.75 0-2.9-.85-3.44-1.93l1.53-.9Zm-6.64.16c.29.54.58.98 1.21.98s1.02-.25 1.02-1.17V9.17h1.87v6.42c0 1.97-1.14 2.85-2.8 2.85a2.9 2.9 0 0 1-2.82-1.74l1.52-.92Z"
          fill="#000"
        />
      </svg>
    ),
  }, {
    id: "Preact",
    icon: (
      <svg viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m10 0 10 5.77v11.55l-10 5.77-10-5.77V5.77L10 0Z"
          fill="#673AB8"
        />
        <path
          d="M2.72 17.22c1.33 1.7 5.56.41 9.55-2.7 3.99-3.12 6.27-6.9 4.94-8.61-1.33-1.7-5.56-.4-9.55 2.71-3.99 3.12-6.27 6.9-4.94 8.6Zm.57-.44c-.44-.56-.25-1.67.6-3.07A17.8 17.8 0 0 1 8.1 9.2a17.8 17.8 0 0 1 5.41-3c1.56-.48 2.68-.4 3.12.16.44.57.25 1.68-.6 3.07a17.8 17.8 0 0 1-4.22 4.53 17.8 17.8 0 0 1-5.4 3c-1.57.48-2.69.4-3.13-.17Z"
          fill="#fff"
        />
        <path
          d="M17.2 17.22c1.34-1.7-.94-5.48-4.93-8.6-4-3.12-8.22-4.41-9.55-2.71-1.33 1.7.95 5.49 4.94 8.6 4 3.12 8.22 4.42 9.55 2.71Zm-.56-.44c-.44.57-1.56.65-3.12.17a17.8 17.8 0 0 1-5.41-3 17.8 17.8 0 0 1-4.23-4.53c-.84-1.4-1.03-2.5-.59-3.07.44-.56 1.56-.64 3.12-.16a17.8 17.8 0 0 1 5.41 3 17.8 17.8 0 0 1 4.23 4.52c.84 1.4 1.03 2.5.59 3.07Z"
          fill="#fff"
        />
        <path
          d="M9.96 13.1a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06Z"
          fill="#fff"
        />
      </svg>
    ),
  }, {
    id: "React",
    icon: (
      <svg viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 12.3a2 2 0 1 0 0-4.1 2 2 0 0 0 0 4Z" fill="#61DAFB" />
        <path
          d="M11.5 14.4c6 0 11-1.8 11-4.2 0-2.3-5-4.2-11-4.2s-11 2-11 4.2c0 2.4 5 4.2 11 4.2Z"
          stroke="#61DAFB"
        />
        <path
          d="M7.9 12.3c3 5.3 7 8.6 9.1 7.5 2-1.2 1.2-6.4-1.9-11.7C12.1 3 8.1-.5 6 .7 4 2 4.8 7.1 7.9 12.3Z"
          stroke="#61DAFB"
        />
        <path
          d="M7.9 8.1c-3 5.3-4 10.5-1.9 11.7 2 1.1 6.1-2.2 9.1-7.5 3-5.2 4-10.4 1.9-11.6C15-.5 10.9 3 7.9 8.1Z"
          stroke="#61DAFB"
        />
      </svg>
    ),
  }, {
    id: "Solid",
    icon: (
      <svg viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#a)">
          <path
            d="M31.42 6.75S21.2-.77 13.3.96l-.58.2a5.48 5.48 0 0 0-2.7 1.73l-.38.58-2.9 5.01 5.02.97c2.12 1.35 4.82 1.92 7.32 1.35l8.87 1.73 3.47-5.78Z"
            fill="#76B3E1"
          />
          <path
            opacity=".3"
            d="M31.42 6.75S21.2-.77 13.3.96l-.58.2a5.48 5.48 0 0 0-2.7 1.73l-.38.58-2.9 5.01 5.02.97c2.12 1.35 4.82 1.92 7.32 1.35l8.87 1.73 3.47-5.78Z"
            fill="url(#b)"
          />
          <path
            d="m10.02 6.75-.77.19c-3.27.96-4.24 4.05-2.5 6.75 1.92 2.5 5.97 3.85 9.25 2.89l11.95-4.05S17.73 5.01 10.02 6.75Z"
            fill="#518AC8"
          />
          <path
            opacity=".3"
            d="m10.02 6.75-.77.19c-3.27.96-4.24 4.05-2.5 6.75 1.92 2.5 5.97 3.85 9.25 2.89l11.95-4.05S17.73 5.01 10.02 6.75Z"
            fill="url(#c)"
          />
          <path
            d="M25.83 15.42a8.67 8.67 0 0 0-9.25-2.89L4.63 16.39.77 23.13l21.6 3.67 3.85-6.94c.77-1.35.58-2.9-.39-4.44Z"
            fill="url(#d)"
          />
          <path
            d="M21.98 22.17a8.67 8.67 0 0 0-9.26-2.9L.77 23.14S11 30.84 18.9 28.92l.58-.2c3.28-.96 4.43-4.05 2.5-6.55Z"
            fill="url(#e)"
          />
        </g>
        <defs>
          <linearGradient
            id="b"
            x1="5.3"
            y1=".58"
            x2="29.3"
            y2="12.24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".1" stopColor="#76B3E1" />
            <stop offset=".3" stopColor="#DCF2FD" />
            <stop offset="1" stopColor="#76B3E1" />
          </linearGradient>
          <linearGradient
            id="c"
            x1="18.47"
            y1="6.28"
            x2="14.27"
            y2="20.28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#76B3E1" />
            <stop offset=".5" stopColor="#4377BB" />
            <stop offset="1" stopColor="#1F3B77" />
          </linearGradient>
          <linearGradient
            id="d"
            x1="3.55"
            y1="12.38"
            x2="27.82"
            y2="28.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#315AA9" />
            <stop offset=".5" stopColor="#518AC8" />
            <stop offset="1" stopColor="#315AA9" />
          </linearGradient>
          <linearGradient
            id="e"
            x1="14.5"
            y1="14.36"
            x2="4.7"
            y2="50.27"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4377BB" />
            <stop offset=".5" stopColor="#1A336B" />
            <stop offset="1" stopColor="#1A336B" />
          </linearGradient>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h32v29.94H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  }, {
    id: "Svelte",
    icon: (
      <svg viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.7 3.2A7.3 7.3 0 0 0 9 1L3.3 4.6A6.4 6.4 0 0 0 .4 9c-.3 1.5 0 3 .7 4.4a6.4 6.4 0 0 0-1 5c.3 1 .6 1.8 1.2 2.5A7.3 7.3 0 0 0 11 23l5.6-3.6a6.4 6.4 0 0 0 2.9-4.3c.3-1.5 0-3-.7-4.3a6.5 6.5 0 0 0 1-5.1c-.3-1-.6-1.8-1.2-2.5"
          fill="#FF3E00"
        />
        <path
          d="M8.4 21.2a4.4 4.4 0 0 1-5.5-3.3 4.1 4.1 0 0 1 .1-2.1l.1-.4.3.2c.7.5 1.4.9 2.2 1.1l.2.1v.2c0 .3 0 .6.2.8a1.3 1.3 0 0 0 1.5.6l.3-.2 5.6-3.5a1.2 1.2 0 0 0 .5-1.3l-.2-.5a1.3 1.3 0 0 0-1.4-.5c-.2 0-.3 0-.4.2l-2.1 1.3-1.2.5a4.4 4.4 0 0 1-5.4-3.2A4.1 4.1 0 0 1 3.8 8c.3-.5.7-.9 1.1-1.2l5.6-3.5a4 4 0 0 1 1.1-.5A4.4 4.4 0 0 1 17.1 6a4.1 4.1 0 0 1-.1 2.2l-.1.3-.3-.2c-.7-.5-1.4-.9-2.2-1.1h-.2V7c0-.3 0-.6-.2-.8a1.3 1.3 0 0 0-1.8-.4L6.6 9.4a1.2 1.2 0 0 0-.5 1.3l.2.4a1.3 1.3 0 0 0 1.4.5l.4-.1 2.1-1.4a4 4 0 0 1 1.2-.5 4.4 4.4 0 0 1 5.4 3.3c.1.5.1 1 0 1.6a3.9 3.9 0 0 1-1.7 2.6l-5.6 3.6-1.1.5"
          fill="#fff"
        />
      </svg>
    ),
  }, {
    id: "Vue",
    icon: (
      <svg viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.2 0-2.7 4.6L9 0H0l11.5 20L23.1 0h-8.9Z" fill="#41B883" />
        <path d="m14.2 0-2.7 4.6L9 0H4.6l7 12 6.9-12h-4.3Z" fill="#34495E" />
      </svg>
    ),
  },
];

export default function IconComponent({ id }) {
  const icon = icons.find((icon) => icon.id === id);

  return <div className="h-24 w-24 text-gray-600 mb-4">{icon.icon}</div>;
}
```

If you check the code for the `IconComponent`, you’ll see it has an array of SVG `icons`. Using the `find()` method, it selects the appropriate icon and renders it.

### `LikeButton` Client Component

Inside the <FontIcon icon="fa-brands fa-js"/>`icon-card.js` file, there’s another component called `LikeButton`. Let’s write the code for this:

```jsx title="components/like-button.js"
"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        setLiked(!liked);
      }}
      className="h-10 w-10"
    >
      <Heart
        className={`h-5 w-5 ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </Button>
  );
}
```

Notice it starts with the `'use client'` directive, because this button handles client-side interaction. It has an `onClick` event attached - so when you click it, a “love sign” appears. That interaction is happening entirely on the client side. That’s why you had to define it as a [<FontIcon icon="fa-brands fa-react"/>Client Component](https://react.dev/reference/rsc/use-client).

Inside the component, you’re using a simple `useState()` hook with `like` state variable and `setLike` function. When the button is clicked, you toggle the `like` state - if it’s `true`, it becomes `false`, and vice versa. There’s some conditional CSS too - if like is `true`, the button turns “red”. If not, it stays “grey”.

---

## Discovering SSR Issues - UX and False Interaction

Now check your browser. You’ll see, on the homepage, that you have a heading that says “Next.js Streaming”. Below that, there’s a button linked to a page called “Streaming Demo.”

Now, notice what happens when you click the "Streaming Demo" button - you click it, but the page takes a bit of time to load. And honestly, the user experience here is terrible. Because from a regular user’s point of view, it’s not clear whether the click even worked.

![Discovering SSR Issues](https://cdn.hashnode.com/res/hashnode/image/upload/v1754078491159/c3c17d5d-add0-4a1b-973e-cdcd7f4b7533.gif)

So, what’s causing this delay in loading the page? Well, it’s because the cards on that page are being loaded dynamically. You’ll see the code shortly and it’ll make more sense. But this loading process is happening asynchronously. And since everything in the page is being rendered on the server - which, as you may know, happens inside the `App` Component in Next.js - it’s being rendered as a [<FontIcon icon="fa-brands fa-react"/>Server Component](https://react.dev/reference/rsc/server-components).

Now, we’ve got two main problems here:

1. When I click the “Streaming Demo” button from the homepage, I have a poor user experience. After clicking, I have to sit and wait - because the page is taking time to load.
2. The second problem is called a **False Interaction**. Imagine this: while the page is still loading, you reload it and click on a card to give it a love reaction. But once the page finishes loading, that love reaction is gone. That means you just had a false interaction - and that can confuse your users. Why? Because technically, the page rehydrated and replaced everything - and the interaction didn’t persist. That’s exactly what you mean by a false interaction. And this is happening because of **Server Side Rendering (SSR)**. This is one of those UX downsides of SSR.

![False Interaction - SSR](https://cdn.hashnode.com/res/hashnode/image/upload/v1754078793243/44fcd1d1-a58f-427c-a2f3-a3c5749fb3fc.gif)

### Breaking Down SSR Issues

Let me break it down. When someone hits this page, the request first goes to the server. Then all the `async` operations begin. We call that **phase A**. Once that’s done, the HTML gets generated - we can call that **phase B**. Then the HTML and CSS reach the browser - let’s call that **C**. And finally, once the JS bundle fully loads in the browser, you reach the Hydration phase.

Now, if these terms (like **Page Rendering** and **Hydration**) aren’t clear to you, I recently made a [<FontIcon icon="fa-brands fa-youtube"/>full video covering Next.js rendering and Caching](https://youtu.be/g3nj8SIO7Vs). It’s a must-watch for any Next.js, React, or general web developer. You’ll learn how your web page is rendered, how Hydration works, and how the whole rendering process is coordinated between browser and server.

Everything will become crystal clear to you. So make sure you watch that video if any of this feels confusing.

![Server Side Rendering (SSR)](https://cdn.hashnode.com/res/hashnode/image/upload/v1754079434726/99146526-1387-405d-9b1d-228d29b27128.png)

Back to the main point. You should now understand that Server Side Rendering involves several blocking tasks. Meaning, while data is being fetched, nothing else moves forward. Until that’s done, the page can’t render. And if the page isn’t rendered, nothing reaches the browser. And without that, hydration can’t begin.

![SSR Blocking Behaviour](https://cdn.hashnode.com/res/hashnode/image/upload/v1754079470587/15e69637-a83f-4abe-bc0f-1e5c9fc86782.png)

These steps can’t run concurrently - they have to happen one after the other. That’s why you’re seeing this issue. Let’s say our page has 9 cards. Maybe some cards could’ve loaded earlier, but the full page waits until all 9 are ready. Result? We see everything at once - at the very end. Wouldn’t it be great if we could improve that user experience? That’s where **Streaming** comes in.

---

## How Streaming Can Solve The Problem

![SSR - Bad UX](https://cdn.hashnode.com/res/hashnode/image/upload/v1754079647605/23b58563-1583-464b-b4d2-1d3c837d8c3c.gif)

A few moments ago in the demo, you saw the whole UI load at once. From the outside, it looked like all the components rendered together - but in reality, each part of your page is rendered separately. Because in React, everything’s component-based, right?

Now, what if **Component A** finishes early? Wouldn’t it be amazing if you could just send **Component A** to the browser right away? Meanwhile, **Component B**, **C**, and so on are still processing - and once they’re ready, they stream in next! This is exactly how **Streaming** works.

Server Side Rendering is definitely faster than **Client Side Rendering**. But the real problem with SSR is the user experience. That’s why we use Streaming.

Think of it like YouTube. When you play a video, does it download fully before starting? Of course not! The video plays immediately, and the rest keeps loading in chunks - that’s buffering. As a user, you don’t feel any lag - it’s a super smooth experience. You want the same experience on your web pages, and that’s what Streaming is all about.

![Streaming in Action](https://cdn.hashnode.com/res/hashnode/image/upload/v1754079758843/1f1130f4-351a-4b80-8205-b56550c53232.png)

As you can see above , the sidebar section of the UI is already loaded. But the right-side content is still in a loading state. This is exactly the kind of experience you want to build - where parts of the page load independently, as soon as they're ready. And this is definitely better than traditional SSR, because it gives users a much smoother experience.

Now here's something important: streaming only works with **Server Components**. To implement this, React gives us a tool called [<FontIcon icon="fa-brands fa-react"/>React Suspense](https://react.dev/reference/react/Suspense). You’ll now learn how to use React Suspense to upgrade your current demo and see how you can take this streaming experience to the next level.

---

## Two Types of Streaming in Next.js

Let me bring you back to the code again. The first thing you’re going to do is get the demo I showed you earlier - that’s our starter code. I’ve saved that exact starter code in the <FontIcon icon="fas fa-code-branch"/>`starter` branch of the [GitHub repository (<FontIcon icon="iconfont icon-github"/>`logicbaselabs/nextjs-streaming`)](https://github.com/logicbaselabs/nextjs-streaming).

So from the <FontIcon icon="fas fa-code-branch"/>`starter` branch, you’ll get the exact code you’re starting with. Now, to implement streaming, you’ll start with Next.js’s default Streaming system. There are two ways to do Streaming in Next.js:

1. **The default or automatic streaming**, where you don’t really have to configure anything - you just follow a simple convention.
2. **The custom or advanced streaming**, where you manually set things up.

---

## Next.js Automatic Streaming - <FontIcon icon="fa-brands fa-js"/>`loading.js`

I’ll first show you the Automatic Streaming demo. Then I’ll walk you through how custom streaming works. Each approach will live in its own separate branch. The primary starter code stays in the <FontIcon icon="fas fa-code-branch"/>`starter` branch. Now create a new branch and call it <FontIcon icon="fas fa-code-branch"/>`automatic-streaming`, for the Automatic Streaming demo. All the code changes I make from now will go into this automatic branch.

```sh
git checkout -b automatic-streaming
```

### Create the <FontIcon icon="fa-brands fa-js"/>`loading.js` File

First, inside the <FontIcon icon="fas fa-folder-open"/>`streaming-demo` folder, you’ll create a <FontIcon icon="fa-brands fa-js"/>`loading.js` file. Inside that, you’ll return regular JSX like in any standard React page.

But instead of just showing plain text like “Loading...”, you’ll take the modern approach and build a **Skeleton UI**. This means you’ll mimic the same structure of the actual cards - but instead of real content, you’ll show placeholder skeletons. So, users will see something shaped exactly like the real card, but it’ll be in a loading state.

When the real data comes in, it will replace the placeholder in that exact same spot. That’s how you’ll build the skeleton UI - just like modern web apps do for better user experience.

### Structure the Loading Skeleton Component

Let’s now implement the same kind of loading skeletons that modern apps use. If you go to the `Home` component inside the <FontIcon icon="fas fa-folder-open"/>`app/streaming-demo/`<FontIcon icon="fa-brands fa-js"/>`page.js` file, you’ll see that everything starts from `ToolsCard`, right? There’s a wrapper `div` - `<div className="w-full min-h-screen flex justify-center items-center">` - you’ll need that as the outer container.

So first, copy that container `div` from the `Home` component and paste it into the <FontIcon icon="fa-brands fa-js"/>`loading.js` file. That’s your outer wrapper. Got it?

Then, there are two nested `divs` inside `ToolsCard` - `<div className="w-full max-w-4xl mx-auto px-4 sm:px-6"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">` - you’ll need those, too. Copy both of them and paste them as children inside the outer wrapper in <FontIcon icon="fa-brands fa-js"/>`loading.js`. Make sure to close any missing end tags properly. That’s it - the full structure is ready.

```jsx title="app/streaming-demo/loading.js"
<div className="w-full min-h-screen flex justify-center items-center">
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
      <!-- content goes here -->
    </div>
  </div>
</div>
```

### `CardSkeleton` Component

Now you need to insert 9 cards inside this layout just like the UI. To understand what each card should look like, let’s open up the <FontIcon icon="fa-brands fa-js"/>`icon-card.js` file. You’ll notice each card is just an `IconCard`, right? So you’ll use that same structure to build your loading skeletons.

To save time, let me share code for the `CardSkeleton` component inside the <FontIcon icon="fas fa-folder-open"/>`components/ui` folder - named <FontIcon icon="fa-brands fa-react"/>`card-skeleton.jsx`. Inside that component, I’m using the [<FontIcon icon="iconfont icon-shadcn"/>`Skeleton`](https://ui.shadcn.com/docs/components/skeleton) component from Shadcn. Pretty straightforward!

```js title="components/ui/card-skeleton.jsx" 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="w-full hover:cursor-pointer hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-[28px] w-24" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Skeleton className="h-24 w-24 rounded-md mb-4" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
```

### Render the Cards

On the UI, you have 9 cards in total. So you’ll render 9 of these skeleton cards. How? Inside <FontIcon icon="fa-brands fa-js"/>`loading.js`, you’ll use `Array.from({length : 9})` to create a blank array of 9 elements. Then you’ll use `map()` on it. Since you don’t need the actual array items, you can use an `underscore _` as the variable. And to set a `key` for each component, you’ll grab the index as the second parameter. For each iteration, you’ll return a component with the corresponding `key`. And that’s it! Your skeleton-based loading component is ready.

```js title="app/streaming-demo/loading.js"
import CardSkeleton from "@/components/ui/card-skeleton";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### How Automatic Streaming was Applied

Now, let’s reload the Streaming Demo page. Notice that the loading experience is already in action! No more issues with false interactions. This means that you can’t click the “Like” button while it’s loading anymore, because the actual UI hasn’t rendered yet.

So in reality, you didn’t do much. You just created a <FontIcon icon="fa-brands fa-js"/>`loading.js` file inside the <FontIcon icon="fas fa-folder-open"/>`app/streaming-demo` folder. And that alone triggered Automatic Streaming in Next.js. How?

Let’s take a look. Remember what you did? You created a <FontIcon icon="fa-brands fa-js"/>`loading.js` file, right? Because of this file structure, behind the scenes Next.js automatically wraps the page component with a React Suspense boundary.

![Automatic Streaming with <FontIcon icon="fa-brands fa-js"/>`loading.js`](https://cdn.hashnode.com/res/hashnode/image/upload/v1754079977767/5aea584f-3045-4539-ac67-e647e3afb304.png)

Take a look at the left side of the above diagram: the `Page` component is wrapped in `Suspense` on both sides. And the `fallback` used there is our custom `Loading` component. This whole wrapping is done automatically by Next.js. You could’ve done it manually by explicitly writing the `Suspense` component and its `fallback` - and that would’ve worked too. But you didn’t have to, because you’re using Next.js, a smart framework.

Next.js is basically saying:

> You don’t have to do all the heavy lifting. Just place a <FontIcon icon="fa-brands fa-js"/>`loading.js` file in the folder - I’ll handle the rest for you.

And internally, it wraps your page with a `Suspense` boundary. That’s how Automatic Streaming gets applied. And this gave you a much smoother user experience. Wherever a part of the page is ready, it gets shown immediately.

### Issues with Next.js Automatic Streaming

But take a closer look: the whole page is still appearing together. Until then, you just see skeletons as the fallback for everything. That’s definitely an upgrade compared to the previous version. But… it could still be better.

Why? Because the cards on the page don’t all take the same amount of time to render. Maybe the “JavaScript” card resolves quickly. But the “Vue.js” card takes the longest. And the delay caused by the “Vue.js” card is affecting the visibility of even the “JavaScript” card, because all the cards are shown together.

Wouldn’t it be better if you had individual card-level rendering control? How can you do that? Simple: if you wrap each card in its own Suspense boundary, you’ll get that experience.

But before jumping in, let’s analyse the actual issue here. Right now, “Card 1” completes steps through “A”, “B”, “C”, “D” - then “Card 2” starts. Then “Card 3”. Basically, the cards are loading serially.

![Serial Rendering](https://cdn.hashnode.com/res/hashnode/image/upload/v1754080238122/8e3ca78a-cc44-4f31-806f-3c1554bdc26c.png)

But what you want is for each card to be in its own Suspense boundary, so they can load concurrently. Whichever one finishes first should appear immediately. And that’s exactly what you’re going to implement next. You’ll change the code and see exactly what modifications are needed to make this work beautifully.

![Concurrent Rendering](https://cdn.hashnode.com/res/hashnode/image/upload/v1754080259781/4612905e-516d-452b-a6ec-97c0ef3c9ec1.png)

---

## Manual Streaming with Custom Suspense Boundary

Back in the code now. Before you implement this advanced feature, let’s commit the current state of your code to GitHub so you can experiment and tweak it yourself. In the terminal, let’s write the following:

```sh
git add .
git commit -m "Automatic Streaming"
```

Done! You’ll now find the code under the <FontIcon icon="fas fa-code-branch"/>`automatic-streaming` branch in the [GitHub repo (<FontIcon icon="iconfont icon-github"/>`logicbaselabs/nextjs-streaming`)](https://github.com/logicbaselabs/nextjs-streaming/tree/automatic-streaming). Now let’s move on to learning **Custom Streaming**. For that, I’m creating a new branch:

```sh
git checkout -b custom-streaming
```

Our new branch <FontIcon icon="fas fa-code-branch"/>`custom-streaming` is ready. Let’s start our Next.js dev server:

```sh
npm run dev
```

### Remove `Promise.all()`

Since you’re now going to stream manually, first delete the <FontIcon icon="fa-brands fa-js"/>`loading.js` file. So, that default streaming fallback with the Card Skeletons? That’s gone now.

Next, let’s open the <FontIcon icon="fa-brands fa-js"/>`tools-card.js` file. Here, you’re calling the `getTools()` function, which returns an array of `Promises`. Earlier, you used `Promise.all()` to resolve all of them at once. But this time, you don’t need to do that anymore. Why? Because you’re going to wrap each `IconCard` component with its own `Suspense` boundary. That means React Suspense will handle the promise resolution for each card individually.

So here’s what you’ll do:

- First, cut the `<IconCard ... />` component. You’ll reuse it shortly.
- Then, instead of `toolsWithData` - which is the resolved array you got using `Promise.all()` - you’ll now directly loop over the `tools` array (which contains the unresolved `Promises`).

So you can remove the `toolsWithData` logic entirely. Now, in your JSX, you’ll replace the old `toolsWithData.map()` with `tools.map()`.

### How to Implement Suspense for Concurrent Data Fetching in Next.js Components

Previously, each item in the loop was a resolved `string` called `tool`. But now, since you’re dealing with unresolved `Promises`, let’s rename that variable to `toolPromise`. You’ll also grab the second argument `index` so you can use it as a key.

Now, in the return statement of the `map()` function, you’ll return a `<Suspense>…</Suspense>` for each iteration. Inside each `Suspense`, you’ll render a child component called `<ToolCard>…</ToolCard>` . You haven’t created the `ToolCard` component yet - but you’ll do that in just a moment. You’ll pass `toolPromise` as a prop to the `ToolCard` component.

```jsx title="components/tools-cards.js"
const ToolsCards = async () => {
  const toolsPromise = await getTools();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
        {toolsPromise.map((toolPromise, index) => (
          <Suspense>
            <ToolsCard toolPromise={toolPromise} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
```

So, what’s happening here?

- `toolsPromise` is an array of `Promises`
- You’re mapping over that array
- On each iteration, you get a `toolPromise` and an `index`
- Since `toolPromise` takes time to resolve, you’re wrapping it inside a `<Suspense>`
- Inside that `Suspense`, you render the `ToolCard` component
- And you pass `toolPromise` as a prop to it

Hope this part is clear. Now you’ll go ahead and create the `ToolCard` component. But before that, you need to set a `fallback` inside the `Suspense` component. The fallback means that as long as the child component inside Suspense hasn’t finished resolving its `Promise`, this fallback UI will be shown instead. So you can use `<CardSkeleton />` as your fallback component. That means, until the Promise is resolved, users will see the `CardSkeleton` component. Also, you need to set a `key` for each item - and here, you can use the `index` as the `key`.

```js title="components/tools-cards.js"
{toolsPromise.map((toolPromise, index) => (
  <Suspense fallback={<CardSkeleton />} key={index}>
    <ToolsCard toolPromise={toolPromise} />
  </Suspense>
))}

```

Alright, now let’s create the `ToolCard` component. You’ll define it in the same file, just outside of the `ToolsCard` component. Let’s write the following:

```js
const ToolCard = () => {
  // code goes here
}
```

Inside the function, you’ll receive `toolPromise` as a prop. Now you’ll use React’s `use()` hook. You’ll pass `toolPromise` into `use()`, and it will return the resolved data. You’ll store that in a variable called `tool`. Then you’ll return some JSX:

```js
const ToolsCard = ({ toolPromise }) => {
  const tool = use(toolPromise);

  // return JSX here
};
```

Remember the `IconCard` component you cut out earlier? That should still be in your clipboard. You’ll simply return that here and you’ll pass the resolved `tool` as a prop into `IconCard`.

```js
const ToolsCard = ({ toolPromise }) => {
  const tool = use(toolPromise);

  return <IconCard tool={tool} />;
};
```

### Summary of Steps to Implement Manual Streaming in Next.js

Alright, let’s take a moment to clearly understand what you just did. Previously, you used to take the array of Promises returned from the `getTools()` function and resolve them all at once using `Promise.all()`. Only after all of them were resolved, you would render the components.

But now, you’re not using `Promise.all()` anymore. Instead, you’re leveraging **React Suspense**. You’re working directly with the array of Promises. Each Promise is being passed into the `ToolCard` component individually. And when that specific Promise resolves, the `ToolCard` then displays the corresponding `IconCard`. Until it’s resolved, you show the `CardSkeleton` as the fallback inside `Suspense`. Super simple!

### Final Demo

Now let’s check the terminal real quick, just to see if there are any errors. It should look good - no errors! Now if you head over to the browser, and from the homepage click on the “Streaming Demo” button, you should see the Streaming in action!

All the icons should stream in one by one. As soon as something is ready, it should appear. It’s no longer waiting for everything to resolve at once. Whichever item resolves first streams directly onto the page.

![Final Demo - Manual Streaming Demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1754080577713/2d97114e-a1b1-49f7-8b65-2aa8bd7e66e8.gif)

Here’s another cool thing: let’s say you reload the page. Now one of the cards appears early, and you give it a “love” reaction. You’ll see “No problem at all!” Even after all the other cards load, your “love” reaction stays intact. Why? Because the card you interacted with has already been hydrated. Clear?

So that old confusing behaviour - where a user would interact too early and the action would disappear - yeah, that’s no longer an issue.

![No False Interaction in Streaming SSR](https://cdn.hashnode.com/res/hashnode/image/upload/v1754080760808/7223cdae-1107-47d8-b477-0a33d4b98e1e.gif)

With just a small change, you now have a complete Streaming experience. If you want to stream at the `page` level, just use a <FontIcon icon="fa-brands fa-js"/>`loading.js` file. That way, the whole page shows a loading state covering the entire area.

But if you want to stream things individually - like different components or sections - you can simply wrap them in separate `Suspense` boundaries and handle it your own way. That’s Streaming in Next.js terms. Or, more simply, in React’s language.

---

## Forcing Dynamic Rendering for Effective Streaming

Now one final point I want to mention: remember how I kept saying “Server Side Rendering! Server Side Rendering!”? But here’s the funny part: if I run `npm run build` right now and build the app, this `streaming-demo` page will actually become a **Statically Rendered** page.

Why? Because there’s nothing dynamic going on here. So according to Next.js’s Rendering logic, this becomes an **SSG (Static Site Generation)** page. Right? If you’re not familiar with **SSG** or **SSR**, please do check out [<FontIcon icon="fa-brands fa-youtube"/>the video](https://youtu.be/xTT_Sd_xqh0) I recommended earlier. It explains everything clearly.

And for those of you who are familiar with these concepts, you know that if we build this page, it becomes a static page. This means that SSR doesn’t really apply here - because the page is already pre-generated at build time. When the user requests it, it won’t go through `getData`, `getTools`, or any Promise-based fetch - because everything is already pre-rendered and baked into the build.

Now, if this page were a true Server Side rendered page, then Streaming would make a lot more logical sense. So how can you force that? Easy! At the top of the <FontIcon icon="fas fa-folder-open"/>`app/streaming-demo/`<FontIcon icon="fa-brands fa-js"/>`page.js` file, just add this line:

```js
export const dynamic = 'force-dynamic';
```

That tells Next.js, “Hey, treat this page as dynamic, no matter what.”

Clear? Now, whether you build the app or run it in `dev` mode, this page will always be treated as a Dynamically rendered page. This means that it’ll only be rendered on the server when the user makes a request. And that’s when Streaming truly becomes meaningful.

So now if you run `npm start` and open the same site again, you’ll see the exact same streaming experience, even in `production` mode.

I hope I was able to explain clearly what Streaming is and how it works. And I really hope you now understand how and where this can be useful in your own projects.

If this tutorial was even little bit helpful in getting your first Streaming UI experience, I’d love to hear about it - and it would be great inspiration for me to write more guides like this in the future.

---

## Summary

You can find all the source code from this tutorial in [this GitHub repository (<FontIcon icon="iconfont icon-github"/>`logicbaselabs/nextjs-streaming`)](https://github.com/logicbaselabs/nextjs-streaming). If it helped you in any way, consider giving it a star to show your support!

Also, if you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts - mention me on X [<FontIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<FontIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch my coding tutorials (<FontIcon icon="fa-brands ffa-youtube"/>`@logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Next.js 15 Streaming Handbook — SSR, React Suspense, and Loading Skeleton",
  "desc": "Next.js is currently one of the most popular and intelligent Web Frameworks out there. But many developers using Next.js often can’t fully utilise its superpowers simply because some of its advanced concepts are hard to understand. In this in-depth t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-nextjs-15-streaming-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
