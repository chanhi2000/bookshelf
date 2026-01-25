---
lang: en-US
title: "How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js"
description: "Article(s) > How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js"
icon: fa-brands fa-js
category:
  - Node.js
  - Next.js
  - AI
  - LLm
  - Google
  - Google Gemini
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js"
    - property: og:description
      content: "How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-social-media-post-scheduler-using-gemini-and-late-api-in-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2026-01-31
isOriginal: false
author:
  - name: David Asaolu
    url : https://freecodecamp.org/news/author/de/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769794478505/be596e27-4c88-45b3-8547-f715c82e0eda.png
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

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js"
  desc="Social media has become a vital tool for people and businesses to share ideas, promote products, and connect with their target audience. But creating posts regularly and managing schedules across multiple platforms can be time-consuming and repetitiv..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-social-media-post-scheduler-using-gemini-and-late-api-in-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769794478505/be596e27-4c88-45b3-8547-f715c82e0eda.png"/>

Social media has become a vital tool for people and businesses to share ideas, promote products, and connect with their target audience. But creating posts regularly and managing schedules across multiple platforms can be time-consuming and repetitive.

In this tutorial, you’ll learn how to build an AI-powered social media post scheduler using [<VPIcon icon="iconfont icon-gemini"/>Gemini](https://ai.google.dev/gemini-api/docs/quickstart), [<VPIcon icon="fas fa-globe"/>Late API](https://docs.getlate.dev/), and [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/).

We’ll use the Gemini API to generate engaging social media content from user prompts, Next.js to handle both the frontend and backend of the application, and Late API to publish and schedule posts across multiple social media platforms from a single platform.

![Social media platforms](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3hreWI5cGw0MnRxenc5NGJqdHczYjdmNjh2Zmxrb2c3ZXo2empzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/azjux6zMBW3cWxK21P/giphy.gif)

::: note Prerequisites

To fully understand this tutorial, you need to have a basic understanding of React or Next.js.

We will use the following tools:

- [<VPIcon icon="fas fa-globe"/>Late API](https://getlate.dev/): A social media API that lets you create and schedule posts across 13 social media platforms from a single dashboard.
- [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/): A React framework for building fast, scalable web applications, handling both the frontend and backend.
- [<VPIcon icon="iconfont icon-gemini"/>Google Gemini API](https://ai.google.dev/gemini-api/docs/quickstart): Provides access to Google’s AI models for generating text and other content based on user prompts.

:::

---

## Setup and Installation

Create a new Next.js project using the following code snippet:

```sh
npx create-next-app post-scheduler
```

Install the project dependencies. We’ll use [Day.js (<VPIcon icon="iconfont icon-github" />`iamkun/dayjs`)](https://github.com/iamkun/dayjs) to work with JavaScript dates, making it easier to schedule and publish social media posts at the correct time.

```sh
npm i @google/genai dayjs utc
```

Next, add a <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file containing your Gemini API key at the root of your Next.js project:

```sh title=".env.local"
GEMINI_API_KEY=<paste_your API key>
```

Once everything is set up, your Next.js project is ready. Now, let's start building! 🚀

![Late API and the available social media platforms](https://cdn.hashnode.com/res/hashnode/image/upload/v1769613408264/abd09717-9403-4480-a319-a0d430b635a3.png)

---

## How to Schedule Social Media Posts with Late

**Late** is an all-in-one social media scheduling platform that allows you to connect your social media accounts and publish posts across multiple platforms. In this section, you’ll learn how to create and schedule social media posts using the Late dashboard.

To get started, create a [<VPIcon icon="fas fa-globe"/>Late account](https://getlate.dev/) and sign in.

![Sign in and get Late API key](https://cdn.hashnode.com/res/hashnode/image/upload/v1769613666616/61074a32-5fa3-4c14-8e96-dfc8a86fec0f.png)

Create an API key and add it to the <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file within your Next.js project.

```sh title=".env.local"
LATE_API_KEY=<your_API_key>
```

![Copy Late API key](https://cdn.hashnode.com/res/hashnode/image/upload/v1769613764201/5dbd7d92-0fa8-46d3-9bf0-a145ef4fe65e.png)

Connect your social media accounts to Late so you can manage and publish posts across all platforms.

![Social media platforms](https://cdn.hashnode.com/res/hashnode/image/upload/v1769613835179/fa6ec3df-4cca-4fc9-bfac-3b5f2815dfdd.png)

After connecting your social media accounts via OAuth, you can start writing, posting, and scheduling content directly to your social media platforms.

![Twitter (X) account connected](https://cdn.hashnode.com/res/hashnode/image/upload/v1769613994931/d9862aa7-2a57-4373-afe0-8513eea6bffd.png)

Late lets you write your post content and attach media files directly from the dashboard.

![Create Social media contents from your dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1769614064645/0eea26fe-6d51-4ae3-8b33-d96cc539e88d.png)

You can choose when your content should be published: post immediately, schedule for later, add it to a job queue, or save it as a draft.

![Publish your post](https://cdn.hashnode.com/res/hashnode/image/upload/v1769614116012/c241c2ed-37d3-4973-8d62-0e288e97f561.png)

Once a post is published, you can view its status and preview it directly in the dashboard using the post link.

![Social media post created with Late](https://cdn.hashnode.com/res/hashnode/image/upload/v1769614187249/574ec680-7aad-4701-aa7f-9db4aebb146a.png)

🎉 **Congratulations!** You’ve successfully created your first post using the Late dashboard. In the next sections, you’ll learn how to use the [<VPIcon icon="fas fa-globe"/>Late API](https://docs.getlate.dev/core/posts) to create and schedule posts directly from your applications.

---

## How to Build the Next.js App Interface

In this section, you’ll build the user interface for the application. The app uses a single-page route with conditional rendering to display recent posts, an AI prompt input field, and a form that allows users to create or schedule posts.

![App Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1769614332014/a6348263-bdba-4100-a63e-0698ee7a9ed4.gif)

Before we proceed, create a <VPIcon icon="iconfont icon-typescript"/>`types.d.ts` file within your Next.js project and copy the following code snippet into the file:

```ts title="types.d.ts"
interface Post {
  _id: string;
  content: string;
  scheduledFor: string;
  status: string;
}

interface AIFormProps {
  handleGeneratePost: (e: React.FormEvent<HTMLFormElement>) => void;
  useAI: boolean;
  setUseAI: React.Dispatch<React.SetStateAction<boolean>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  disableBtn: boolean;
}

interface FormProps {
  handlePostSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  disableBtn: boolean;
  setUseAI: React.Dispatch<React.SetStateAction<boolean>>;
  useAI: boolean;
}
```

The <VPIcon icon="iconfont icon-typescript"/>`types.d.ts` file defines all the data structures and type declarations used throughout the application.

Copy the following code snippet into the <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` file:

```tsx title="page.tsx"
"use client";
import Nav from "./components/Nav";
import { useState } from "react";
import NewPost from "./components/NewPost";
import PostsQueue from "./components/PostsQueue";

export default function Page() {
  const [showPostQueue, setShowPostQueue] = useState<boolean>(false);
  return (
    <div className='w-full h-screen'>
      <Nav showPostQueue={showPostQueue} setShowPostQueue={setShowPostQueue} />
      {showPostQueue ? <PostsQueue /> : <NewPost />}
    </div>
  );
}
```

The `Page` component renders the `Nav` component and uses conditional rendering to display either the `PostsQueue` or `NewPost` component based on the value of the `showPostQueue` state.

Create a `components` folder to store the page components used in the application.

```sh
cd app
mkdir components && cd components
touch Nav.tsx NewPost.tsx PostElement.tsx PostsQueue.tsx
```

Add the code snippet below to the <VPIcon icon="fa-brands fa-react"/>`Nav.tsx` file:

```tsx title="Nav.tsx"
export default function Nav({
  showPostQueue,
  setShowPostQueue,
}: {
  showPostQueue: boolean;
  setShowPostQueue: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav>
      <h2>Post Scheduler</h2>

      <button onClick={() => setShowPostQueue(!showPostQueue)}>
        {showPostQueue ? "New Post" : "Schedule Queue"}
      </button>
    </nav>
  );
}
```

Copy the following code snippet into the <VPIcon icon="fa-brands fa-react"/>`PostsQueue.tsx` file:

```tsx title="PostsQueue.tsx"
"use client";
import { useEffect, useState, useCallback } from "react";
import PostElement from "./PostElement";

export default function PostsQueue() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold'>Scheduled Posts</h2>

      {loading ? (
        <p className='text-sm'>Loading scheduled posts...</p>
      ) : (
        <div className='mt-4'>
          {posts.length > 0 ? (
            posts.map((post) => <PostElement key={post._id} post={post} />)
          ) : (
            <p>No scheduled posts available.</p>
          )}
        </div>
        )}
      </div>
  );
}
```

The <VPIcon icon="fa-brands fa-react"/>`PostsQueue.tsx` component displays a list of previously created posts along with their current status, showing whether each post has been published or scheduled for a later time. While the data is being loaded, it shows a loading message, and once loaded, it renders each post using the `PostElement` component.

Add the following to the <VPIcon icon="fa-brands fa-react"/>`PostElement.tsx` component:

```tsx title="PostElement.tsx"
export default function PostElement({ post }: { post: Post }) {
  export const formatReadableTime = (isoString: string) => {
    const date = new Date(isoString); // parses UTC automatically
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // set to false for 24h format
    });
  };

  return (
    <div className="p-4 border flex items-center justify-between  space-x-4 rounded mb-2 hover:bg-gray-100 cursor-pointer">
      <div>
        <p className="font-semibold text-sm">{post.content.slice(0, 100)}</p>
        <p className="text-blue-400 text-xs">
          Scheduled for: {formatReadableTime(post.scheduledFor)}
        </p>
      </div>

      <p className="text-sm text-red-500">{post.status}</p>
    </div>
  );
}
```

Finally, copy the following code snippet into the <VPIcon icon="fa-brands fa-react"/>`NewPost.tsx` file:

```tsx :collapsed-lines title="NewPost.tsx"
"use client";
import { useState } from "react";

export default function NewPost() {
 const [disableBtn, setDisableBtn] = useState<boolean>(false);
 const [useAI, setUseAI] = useState<boolean>(false);
 const [content, setContent] = useState<string>("");
 const [prompt, setPrompt] = useState<string>("");
 const [date, setDate] = useState<string>("");

 //👇🏻 generates post content
 const handleGeneratePost = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setDisableBtn(true);
 };

 //👇🏻 create/schedule post
 const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 };

 return (
  <div className='w-full p-4  h-[90vh] flex flex-col items-center justify-center border-t'>
   <h3 className='text-xl font-bold'>New Post</h3>

   {useAI ? (
    <AIPromptForm
     handleGeneratePost={handleGeneratePost}
     useAI={useAI}
     setUseAI={setUseAI}
     prompt={prompt}
     setPrompt={setPrompt}
     disableBtn={disableBtn}
    />
   ) : (
    <PostForm
     handlePostSubmit={handlePostSubmit}
     content={content}
     setContent={setContent}
     date={date}
     setDate={setDate}
     disableBtn={disableBtn}
     setUseAI={setUseAI}
     useAI={useAI}
    />
   )}
  </div>
 );
}
```

The `NewPost` component conditionally renders the `AIPromptForm` and the `PostForm`. When a user chooses to generate content using AI, the AIPromptForm component is displayed to collect the prompt. Once the content is generated, the PostForm component is shown, allowing the user to edit, create, or schedule the post.

Add the components below inside the <VPIcon icon="fa-brands fa-react"/>`NewPost.tsx` file:

```tsx :collapsed-lines title="NewPost.tsx"
export const AIPromptForm = ({
  handleGeneratePost,
  useAI,
  setUseAI,
  prompt,
  setPrompt,
  disableBtn,
}: AIFormProps) => {
  return (
    <form onSubmit={handleGeneratePost}>
      <p onClick={() => setUseAI(!useAI)}>Exit AI </p>
      <textarea
        rows={3}
        required
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
      />
      <button type="submit" disabled={disableBtn}>
        {disableBtn ? "Generating..." : "Generate Post with AI"}
      </button>
    </form>
  );
};

// 👇🏻 Post Form component
export const PostForm = ({
  handlePostSubmit,
  content,
  setContent,
  date,
  setDate,
  disableBtn,
  setUseAI,
  useAI,
}: FormProps) => {
  const getNowForDatetimeLocal = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <p onClick={() => setUseAI(!useAI)}>Generate posts with AI </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="What's happening?"
        required
        maxLength={280}
      />
      <input
        type="datetime-local"
        min={getNowForDatetimeLocal()}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button disabled={disableBtn} type="submit">
        {disableBtn ? "Posting..." : "Create post"}
      </button>
    </form>
  );
};
```

Congratulations! You've completed the application interface.

---

## How to integrate Gemini API for Post Generation

Here, you will learn how to generate post content from the user's prompt using the Gemini API.

Before we proceed, make sure you have copied your API key from the [<VPIcon icon="iconfont icon-gemini"/>Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key).

![Create Gemini API key](https://cdn.hashnode.com/res/hashnode/image/upload/v1769615386615/ccbf6a95-fe63-412a-955f-b4fa5e4234fe.png)

Create an <VPIcon icon="fas fa-folder-open"/>`api` folder inside the Next.js <VPIcon icon="fas fa-folder-open"/>`app` directory. This folder will contain the API routes used to generate AI content and create or schedule posts using the Late API.

```sh
cd app && mkdir api
```

Next, create a <VPIcon icon="fas fa-folder-open"/>`generate` folder inside the <VPIcon icon="fas fa-folder-open"/>`api` directory and add a <VPIcon icon="iconfont icon-typescript"/>`route.ts` file. Copy the following code into the file:

```ts :collapsed-lines title="api/generate/route.ts"
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
    You are a social media post generator, very efficient in generating engaging posts for Twitter (X). Given a topic, generate a creative and engaging post that captures attention and encourages interaction. This posts will always be within the character limit of X (Twitter) which is 280 characters, which includes any hashtags or mentions, spaces, punctuation, and emojis.

    The user will provide a topic or theme, and you will generate a post based on that input.
    Here is the instruction from the user:
    "${prompt}"`,
    });
    if (!response.text) {
      return NextResponse.json(
        {
          message: "Encountered an error generating the post.",
          success: false,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: response.text, success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating post.", success: false },
      { status: 500 },
    );
  }
}
```

The `api/generate` endpoint accepts the user's prompt and generates post content using the [<VPIcon icon="iconfont icon-gemini"/>Gemini API](https://ai.google.dev/gemini-api/docs/quickstart#javascript_1).

Now you can send a request to the newly created `/api/generate` endpoint from the `NewPost` component. Update the `handleGeneratePost` function as shown below:

```ts
const handleGeneratePost = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setDisableBtn(true);
  const result = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await result.json();
  if (data.success) {
    setUseAI(false);
    setContent(data.message);
    setPrompt("");
  }
  setDisableBtn(false);
};
```

The `handleGeneratePost` function accepts the user's prompt and returns the AI-generated content.

---

## How to Use Late API in Next.js

[<VPIcon icon="fas fa-globe"/>Late](https://docs.getlate.dev/core/posts#create-a-draft-scheduled-or-immediate-post) provides API endpoints that let you create, schedule, and manage posts programmatically. This allows you to integrate social media posting directly into your applications or automation workflows.

To get started, copy your Late API key and the account ID of your social media platforms into the <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file:

```sh title=".env.local"
LATE_API_KEY=<Late_API_key>
ACCOUNT_ID=<social_media_acct_id>

# Gemini API key
GEMINI_API_KEY=<gemini_API_key>
```

![Connect Twitter (X) account and copy account ID](https://cdn.hashnode.com/res/hashnode/image/upload/v1769615724826/e9500298-caa6-41a6-8d83-74d144d5c535.png)

::: note

In this tutorial, we will be using Twitter (X) as the social media platform for scheduling posts. You can adapt the same workflow to other platforms supported by Late API by updating the platform and accountId values in your API requests.

:::

Create an `api/post` endpoint to accept post content and schedule or publish posts using the Late API.

```sh
cd api
mkdir post && cd post
touch route.ts
```

Then, add the following POST method to <VPIcon icon="fas fa-folder-open"/>`post/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`:

```ts :collapsed-lines title="post/route.ts"
import { NextRequest, NextResponse } from "next/server";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export async function POST(req: NextRequest) {
  const { content, publishAt } = await req.json();

  // Determine if the post should be scheduled or published immediately
  const nowUTC = publishAt ? dayjs(publishAt).utc() : null;
  const publishAtUTC = nowUTC ? nowUTC.format("YYYY-MM-DDTHH:mm") : null;

  try {
    const response = await fetch("https://getlate.dev/api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        platforms: [
          {
            platform: "twitter",
            accountId: process.env.ACCOUNT_ID!,
          },
        ],
        publishNow: !publishAt,
        scheduledFor: publishAtUTC,
      }),
    });

    const { post, message } = await response.json();

    if (post?._id) {
      return NextResponse.json({ message, success: true }, { status: 201 });
    }

    return NextResponse.json(
      { message: "Error occurred", success: false },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error scheduling post.", success: false },
      { status: 500 },
    );
  }
}
```

From the code snippet above:

- The `api/post` endpoint accepts the post’s content and an optional `publishAt` time.
- If `publishAt` is `null`, the post is published immediately. Otherwise, the time is converted to UTC for scheduling.
- It then sends a request to the Late API using your API key and the account ID to create or schedule the post on the selected social media platform.

You can also add a **GET** method to the `/api/post` endpoint to retrieve posts that have already been created or scheduled:

```ts
export async function GET() {
  try {
    const response = await fetch(
      "https://getlate.dev/api/v1/posts?platform=twitter",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.LATE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { posts } = await response.json();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts.", success: false },
      { status: 500 },
    );
  }
}
```

Next, update the `handlePostSubmit` function in <VPIcon icon="fa-brands fa-react"/>`NewPost.tsx` to send a POST request to `/api/post`. This will create or schedule the post and notify the user of the result:

```ts
const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setDisableBtn(true);

  const now = new Date();
  const selected = date ? new Date(date) : null;
  const publishAt = !selected || selected <= now ? null : date;

  const result = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, publishAt }),
  });

  const { message, success } = await result.json();

  if (success) {
    setContent("");
    setDate("");
    alert("Success: " + message);
  } else {
    alert("Error: " + message);
  }

  setDisableBtn(false);
};
```

Finally, fetch all scheduled or published posts and render them in the `PostsQueue` component:

```ts
const fetchScheduledPosts = useCallback(async () => {
  try {
    const response = await fetch("/api/post", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setPosts(data.posts);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchScheduledPosts();
}, [fetchScheduledPosts]);
```

🎉 Congratulations! You’ve successfully built an AI-powered social media post scheduler using Next.js, Gemini API, and Late API.

The source code for this tutorial is available on [GitHub (<VPIcon icon="iconfont icon-github" />`dha-stix/ai-post-scheduler`)](https://github.com/dha-stix/ai-post-scheduler).

<VidStack src="youtube/pW2GU3r8bTs" />

---

## Conclusion

In this tutorial, you’ve learnt how to create and schedule social media posts across multiple platforms using a single scheduling platform, Late, and how to generate AI content using the Gemini API.

The [<VPIcon icon="fas fa-globe"/>Late API](https://getlate.dev/) is a powerful tool for automating social media tasks, posting at specific intervals, managing multiple accounts, and tracking analytics – all from one platform. By combining it with generative AI models like Gemini and automation tools like n8n or Zapier, you can build automated workflows that keep your audience engaged with minimal effort.

The [<VPIcon icon="iconfont icon-gemini"/>Gemini API](https://ai.google.dev/gemini-api/docs/quickstart) also makes it easy to integrate AI-powered text, images, or code generation directly into your applications, opening up a wide range of creative possibilities.

Thank you for reading! 🎉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Social Media Post Scheduler Using Gemini and Late API in Next.js",
  "desc": "Social media has become a vital tool for people and businesses to share ideas, promote products, and connect with their target audience. But creating posts regularly and managing schedules across multiple platforms can be time-consuming and repetitiv...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-social-media-post-scheduler-using-gemini-and-late-api-in-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
