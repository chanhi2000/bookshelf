---
lang: en-US
title: "Stop Trusting AI Code Blindly: A React Code Refactoring Case Study"
description: "Article(s) > Stop Trusting AI Code Blindly: A React Code Refactoring Case Study"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - AI
  - LLM
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stop Trusting AI Code Blindly: A React Code Refactoring Case Study"
    - property: og:description
      content: "Stop Trusting AI Code Blindly: A React Code Refactoring Case Study"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-trusting-ai-code-blindly-a-react-code-refactoring-case-study.html
prev: /programming/js-react/articles/README.md
date: 2026-06-04
isOriginal: false
author:
  - name: Tapas Adhikary
    url: https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/87edcb4f-6985-4392-8af5-b0f7daff9f5b.png
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

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Stop Trusting AI Code Blindly: A React Code Refactoring Case Study"
  desc="If you're a developer (or even a little bit familiar with all the AI developments of the past few years), the term Vibe Coding shouldn't be new to you. It is a software development practice where you "
  url="https://freecodecamp.org/news/stop-trusting-ai-code-blindly-a-react-code-refactoring-case-study"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/87edcb4f-6985-4392-8af5-b0f7daff9f5b.png"/>

If you're a developer (or even a little bit familiar with all the AI developments of the past few years), the term `Vibe Coding` shouldn't be new to you. It is a software development practice where you describe what you want to AI (an LLM) in plain English, and in response, it gives you the source code for it.

You don't write anything manually line-by-line. You just completely focus on the vibe, like features, look-and-feel, and so on – and the AI generates the actual code for you. It's amazing and powerful.

Like millions of other software developers, I use and advocate the use of AI to a great extent. We should be using AI as a tool to expedite deliverables, to get repetitive work done, to make boilerplate, and anything that AI can help us with to stay productive.

But we shouldn't be doing any of this blindly, especially when it comes to delivering AI-generated work to customers.

All the modern AI tools like Claude, Gemini, or ChatGPT provide a warning upfront that AI can make mistakes. And we as users must double-check the responses before using them. Here's a similar notice from Claude:

![Claude AI notice](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/060451dc-a9d4-45d2-95b7-0b22a11cc29b.png)

::: important The main message is this

don't trust AI-generated code blindly. You must do your due diligence before you think of pushing it to production.

:::

To illustrate this, in this article you'll learn from a recent case study I did on generating some React-based source code for an Analytics Dashboard app with AI.

The AI gave me some error-free source code that I could run to see the app. But when I started digging deeper into it, I found potential bugs and tech debt that I needed to address. The generated source code was far from being ready for production and needed a great deal of refactoring.

This guide is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>Full-Stack: Vibe Coding to Production Ready](https://youtube.com/playlist?list=PLIJrr73KDmRwySan3tObLmLZp0NYWSmCT) series. You can check it out if you’d like:

<VidStack src="youtube/NMkUVKue2jk" />

Let's start.

---

## The Prompt

First, we need a prompt to inform the AI in plain English that it should generate the source code for the Analytics Dashboard.

Here is the prompt – read it carefully:

```md
Act as an expert React developer. 

I need a complex 'Creator Analytics Dashboard' for a video platform created using React.

It should include: 

- 1. A header with a user profile. 
- 2. Three summary cards showing total views, videos, and comments. 
- 3. A data table showing recent videos with their individual stats. 
- 4. A sidebar with navigation options. 

Use Tailwind CSS for styling. 

Fetch fake data for the dashboard using fetch with a 1-second timeout to simulate a network request. 

Make it in a way so that I can copy and paste it easily.
```

It's a straightforward request to create a Creator Analytics Dashboard with a bunch of feature requests using React and TailwindCSS.

Now, if we take up this prompt and use it on any of the AI tools like ChatGPT, Claude, or Gemini, it will generate the source code for us automatically.

---

## The Generated React Code

Here's the AI-generated source code from the prompt. As you can see, it's a complete React component with state management, side effect management, and JSX.

```tsx :collapsed-lines
import { useEffect, useState } from "react";

export default function CreatorDashboard() {
  const [stats, setStats] = useState({ views: 0, subs: 0, revenue: 0 });
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isMounted) {
          setStats({ views: '1.2M', subs: '45K', revenue: '$3,400' });
          setVideos([
            { id: 1, title: 'Vibe Coding Explained', views: '100K' },
            { id: 2, title: 'React 19 Features', views: '85K' }
          ]);
          setComments([{ id: 1, text: 'Great video!' }]);
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  if (isLoading) return <div className="p-10 text-center text-xl">Loading Dashboard...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">tapaScript</h2>
        <ul>
           <li className="mb-2 p-2 bg-blue-50 text-blue-700 rounded cursor-pointer">Dashboard</li>
           <li className="mb-2 p-2 hover:bg-gray-50 rounded cursor-pointer">Analytics</li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Creator Analytics</h1>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <span className="font-semibold">Tapas Adhikary</span>
          </div>
        </header>

        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Views</h3>
            <p className="text-3xl font-bold mt-2">{stats.views}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
           <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Videos</h2>
              {videos.map(v => <div key={v.id} className="border-b p-3">{v.title}</div>)}
           </div>
           <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Comments</h2>
              {comments.map(c => <div key={c.id} className="border-b p-3 text-sm text-gray-600">{c.text}</div>)}
           </div>
        </div>
      </div>
    </div>
  );
}
```

Note that if you try the same prompt again, it will generate slightly different source code as the LLM's responses are probabilistic and non-deterministic. It can produce different responses for the same prompt across multiple calls.

Alright, let's try out the generated code.

---

## The Dashboard App

Now, copy that AI-generated code and paste it into any React project. When you run it, you should see a beautiful Creator Analytics Dashboard matching the functionalities mentioned in the prompt.

![Dashboard UI](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/c28d7c3c-bda8-46b2-91d7-4fb905207823.png)

This is amazing and powerful. As a developer, we must leverage it as much as possible. But as a developer, you also need to act like human guardrails to make sure that the generated code is modular, scalable, and bug-free.

Let's now do the walkthrough of the AI-generated code.

---

## The Code Walkthrough and Identifying Problems

Before you read further, go back and read the generated source code once more. This time, slowly, carefully – like a code reviewer.

What have you found? Let's see if your findings match the list from my case study.

### Problem 1: The God Component Syndrome

In software engineering, we have the `Single Responsibility Principle(SRP)`. It means a function or component should do exactly one thing.

But here, our `CreatorDashboard` is acting as a "God Component". It manages state, it fetches data from the network, it renders the sidebar, it renders the header, the card, the tables...everything.

If the marketing team asks you to reuse that Stats Card on the marketing landing page, you simply can't. You need to rewrite it, as it's locked inside the giant file.

### Problem 2: The State Soup Problem

Look at the top of the component. Five different `useState` declarations. When a component renders, tracking which piece of text triggered it becomes a nightmare. This should either be grouped or, even better, managed by a dedicated data fetching library like TanStack Query.

Remember, the fewer states you manage in your component, the better your life will be as a React developer.

### Problem 3: The Data Fetching Anti-Pattern

AI loves to use `useEffect` for data fetching. It's one of the biggest anti-patterns in modern React. This is because the hook useEffect was never meant for data fetching. It doesn't handle caching, it doesn't handle retries if the network drops, and if the user navigates away and comes back, it forces a hard reload on the data every single time.

Modern React provides a better mechanism for data fetching. I've written a [**Handbook on how to use Suspense and Error Boundary**](/freecodecamp.org/the-modern-react-data-fetching-handbook-suspense-use-and-errorboundary-explained.md) to handle data fetching in React. You can give it a read.

### Problem 4: The Missing Types Problem

We haven't mentioned TypeScript explicitly in the prompt. So, AI gave us JavaScript by default. Now, the problem is, can we guarantee what the `videos` array holds? What does a video object look like? We don't know, and our editor also can't help us.

---

## Refactoring the AI-Generated Code

Now that we've identified the problems, the next logical step is to refactor the code to make it better.

### Refactoring Strategy

The image below shows the refactoring strategy we'll follow. We'll break the giant AI-generated component into logical, smaller components like Header, Sidebar, RecentComments, and so on.

We also need to handle the data outside of the component and make the data fetching mechanism reusable for other components in the application to leverage it. To do this, we'll apply the `Custom Hook Pattern`.

![Refactored code strategy](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/15e028fc-efd0-428b-bfde-7d851634bfbf.png)

### Define Types

First, let's define all the types needed for the data objects. We need type definitions for video status, comments, and overall creator status.

```ts
// We use 'type' or 'interface' in TypeScript to define the shape of an object.

export interface CreatorStat {
  label: string;
  value: string | number;
}

export interface VideoStats {
  id: string; // ID should always be a string (UUID) or number, we'll enforce string here
  title: string;
  views: number;
  publishedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}
```

### Break the Monoliths

Next, we'll solve the problem of SRP violation and the problem of `CreatorDashboard` being a God Component. Refactor the giant component by breaking it into multiple smaller components:

- **Header**: A component represents the header of the analytics dashboard.

```tsx
function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Creator Analytics</h1>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
        <span className="font-semibold">Tapas Adhikary</span>
      </div>
    </header>
  );
}

export default Header;
```

- **Sidebar**: The sidebar component holds the navigation links.

```tsx
export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">tapaScript</h2>
      <ul>
        <li className="mb-2 p-2 bg-blue-50 text-blue-700 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="mb-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
          Analytics
        </li>
      </ul>
    </div>
  );
}
```

- **StatCard**: This component accepts a status label and value and renders them. Note how we've applied the types here on the label and value props.

```tsx
// 1. We define the Props interface.
// "Props" are the arguments passed into a React component.
// We are enforcing that whoever uses this component MUST pass a label and a value.
interface StatCardProps {
    label: string;
    value: string | number;
}

// 2. We extract the props cleanly using destructuring: { label, value }
function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
        {label}
      </h3>
      <p className="text-3xl font-extrabold mt-2 text-gray-900">{value}</p>
    </div>
  );
}

export default StatCard;
```

- **VideoTable**: This component lists out all the video information. So, it accepts an array of videos. Notice that we've solved the type problem here. Now we know that each video in the videos array is of the `VideoStats` type that we defined earlier.

```tsx
import type { VideoStats } from '../types';

interface VideoTableProps {
  // We expect an array of VideoStats objects.
  videos: VideoStats[];
}

function VideoTable({ videos }: VideoTableProps) {
  if (videos.length === 0) {
    return <div className="p-6 text-center text-gray-500">No videos uploaded yet.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Recent Videos</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {videos.map((video) => (
          <li key={video.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
            <span className="font-medium text-gray-900">{video.title}</span>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-semibold">
              {video.views.toLocaleString()} views
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoTable;
```

- **RecentComments**: A component to show the list of comments.

```tsx
import type { Comment } from "../types";

interface RecentCommentProps {
  // We expect an array of Comment objects.
  videos: Comment[];
}

function RecentCommentList({ comments }: RecentCommentProps) {
  if (comments.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You don't have any comments posted.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Recent Comments</h2>
      {comments.map((c) => (
        <div key={c.id} className="border-b p-3 text-sm text-gray-600">
          {c.text}
        </div>
      ))}
    </div>
  );
}

export default RecentCommentList;
```

### Custom Hook to Handle Data

Now that we have the components defined, and all of them are presentational components, they need data to render information on the dashboard. Also, we don't want to handle all the states inside our component. A custom hook would be a great choice here.

The hook handles the fetch call to get analytics data and tracks them using the state. We return the needed state values from the hook so that anyone using the hook anywhere would get this information. It's completely reusable.

```tsx :collapsed-lines
import { useEffect, useState } from "react";
import type { Comment, CreatorStat, VideoStats } from "./types";

export function useDashboardData() {
  const [stats, setStats] = useState<CreatorStat[]>([]);
  const [videos, setVideos] = useState<VideoStats[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isMounted) {
          setStats([
            { label: "Views", value: "1.2M" },
            { label: "subs", value: "45K" },
            { label: "revenue", value: "$3,400" },
          ]);
          setVideos([
            {
              id: 1,
              title: "Vibe Coding Explained",
              views: "100K",
            },
            { id: 2, title: "React 19 Features", views: "85K" },
          ]);
          setComments([
            { id: 1, text: "Great video!" },
            { id: 2, text: "Fantastic video!" },
          ]);
          setIsLoading(false);
        }
      } catch (err) {
        setError(`Failed to fetch data: ${err?.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    stats,
    videos,
    comments,
    isLoading,
    error,
  };
}
```

### Everything Together

Finally, it's time to change the giant `CreatorDashboard` component. We'll first import all the smaller components created, and then call the hook to get the stats, videos, comments, and loading and error states. After that, it's just about using them.

```tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RecentCommentList from "./components/RecentComments";
import StatCard from "./components/StatCard";
import VideoTable from "./components/VideoTable";

import { useDashboardData } from "./hooks/useDashboardData";

export default function CreatorDashboard() {
  const { stats, videos, comments, isLoading, error } = useDashboardData();

  if (isLoading)
    return <div className="p-10 text-center text-xl">Loading Dashboard...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        {/* Data Table & Comments - All mashed together */}
        <div className="grid grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoTable videos={videos} />
          </div>
          <RecentCommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}
```

That's all. We have now successfully refactored the big AI-generated component into smaller, reusable components and separated the data layer and state handling outside of it.

---

## A Task for You

This is optional, yet I'd encourage you to try it. The task is to take the refactoring to the next level.

Can you get rid of the `useDashboardData` hook, and handle the data fetching using the [**Suspense and Error Boundary patterns**](/freecodecamp.org/the-modern-react-data-fetching-handbook-suspense-use-and-errorboundary-explained.md)? I would love to discuss the solution with you. Please reach out on my socials (given below) or my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/sSQ7HEYrrZ).

Also, stay tuned for my upcoming article, where I'll refactor the same app with TanStack Query and teach you about fetch, mutation, and caching.

::: important Key Takeaways

This is the reality of AI-generated code. It looks like a finished product on the surface. But underneath, it's a fragile house of cards. If you try to scale this, say by adding authentication, sorting to the tables, or real-time comment updates, the file will grow to 1K+ lines of unmaintainable code.

Our job isn't to reject AI's output. Instead, it's to refactor its output to make it production-ready. You can do that only when you have strong fundamentals, and you understand the [**new definition of software engineering in the age of AI**](/freecodecamp.org/the-new-definition-of-software-engineering-in-the-age-of-ai.md).

:::

::: info If You've Read This Far...

Thank You!

I'm thrilled to announce that I've started a [<VPIcon icon="fa-brands fa-youtube"/>Full Stack FREE Course](https://youtube.com/playlist?list=PLIJrr73KDmRwySan3tObLmLZp0NYWSmCT) to take developers from vibe coding to a production-ready mental model. I'd be delighted if you check it out and take part.

- Subscribe to my [YouTube Channel <VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`](https://youtube.com/tapasadhikary)
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://x.com/tapasadhikary)
- Catch up with my [<VPIcon icon="fas fa-globe"/>React Clean Code Rules Book](https://tapascript.io/books/react-clean-code-rule-book)
- All the source code used in this article is on my [GitHub Repository (<VPIcon icon="iconfont icon-github"/>`tapascript/full-stack-vibe-to-prod`)](https://github.com/tapascript/full-stack-vibe-to-prod).

:::

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Trusting AI Code Blindly: A React Code Refactoring Case Study",
  "desc": "If you're a developer (or even a little bit familiar with all the AI developments of the past few years), the term Vibe Coding shouldn't be new to you. It is a software development practice where you ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-trusting-ai-code-blindly-a-react-code-refactoring-case-study.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
