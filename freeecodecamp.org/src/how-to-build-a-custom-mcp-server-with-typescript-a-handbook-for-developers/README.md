---
lang: en-US
title: "How to Build a Custom MCP Server with TypeScript - A Handbook for Developers"
description: "Article(s) > How to Build a Custom MCP Server with TypeScript - A Handbook for Developers"
icon: iconfont icon-typescript
category:
  - TypeScript
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocol
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Custom MCP Server with TypeScript - A Handbook for Developers"
    - property: og:description
      content: "How to Build a Custom MCP Server with TypeScript - A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers/
prev: /programming/ts/articles/README.md
date: 2025-06-26
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750868512407/95f366d3-9115-423a-8d63-66e53171931a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Model Context Protocol > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Custom MCP Server with TypeScript - A Handbook for Developers"
  desc="MCP (Model Context Protocol) lets you connect your code, data, and tools to AI applications like Claude and Cursor. This handbook explains how it works with real-world analogies, and shows you how to build a custom MCP server using TypeScript that fe..."
  url="https://freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750868512407/95f366d3-9115-423a-8d63-66e53171931a.png"/>

MCP (Model Context Protocol) lets you connect your code, data, and tools to AI applications like Claude and Cursor. This handbook explains how it works with real-world analogies, and shows you how to build a custom MCP server using TypeScript that feeds live data into an AI environment.

### Here’s what we’ll cover:

- [What is the Model Context Protocol (MCP)?](#heading-what-is-the-model-context-protocol-mcp)
- [Why MCP is Necessary](#heading-why-mcp-is-necessary)
- [RAG vs MCP](#heading-rag-vs-mcp)
- [MCP Documentation](#heading-mcp-documentation)
- [How AI Apps Talk to MCP Servers — A Practical Example](#heading-how-ai-apps-talk-to-mcp-servers-a-practical-example)
- [How MCP Servers Work Internally](#heading-how-mcp-servers-work-internally)
- [The MCP Architecture — How It All Fits Together](#heading-the-mcp-architecture-how-it-all-fits-together)
- [Opportunities for Web Developers](#heading-opportunities-for-web-developers)
- [MCP Server Setup and Integration](#heading-mcp-server-setup-and-integration)

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. **Basic understanding of TypeScript or JavaScript:** While we’ll use TypeScript here, knowledge of JavaScript alone is enough to follow the examples.
2. **Familiarity with Node.js and npm:** You should know how to initialize a project, install packages, and run scripts using node and npm.
3. **Experience with working in the terminal/command line:** Especially for understanding concepts like stdin and stdout, and running local servers.
4. **Comfort with environment variables (.env files):** You’ll be setting API keys and other sensitive data in a .env file.
5. **Basic knowledge of REST APIs and HTTP concepts:** This helps in understanding how we used AI tools to fetch context before MCP and why MCP simplifies the process.
6. **Familiarity with Google Cloud / API Console (optional but recommended):** Since this handbook involves integrating with Google Calendar, you should know how to:
    - Generate a public Google API key
    - Find or create a Google Calendar and access its ID
7. **Cursor editor installed (optional but recommended):** To follow the final integration steps with the AI-powered code editor.
8. **Some exposure to AI tools like Claude, Cursor, or ChatGPT:** This helps you grasp how MCP bridges external data with AI context.

:::

I’ve also created a video to go along with this handbook. If you’re the type who likes to learn from video as well as text, you can check it out here:

<VidStack src="youtube/XC49e0pliEE" />

---

## What is the Model Context Protocol (MCP)?

Let's start from the very beginning: what exactly is the MCP? MCP stands for **Model Context Protocol**. And if we break it down word by word - "model", "context", and "protocol" - it actually becomes quite easy to understand.

But before diving in, here's a quick background: Model Context Protocol was developed by a company called [<FontIcon icon="iconfont icon-anthropic"/>Anthropic](https://anthropic.com). You've probably heard of them. They're the ones who built [<FontIcon icon="iconfont icon-claude"/>Claude](https://claude.ai), the popular AI assistant. They first introduced MCP in November of 2024, and in a short time it’s become a standard adopted by tons of other companies as well, including Microsoft.

Now, let's explore what MCP really means by understanding each term.

### What does "Protocol" mean?

Let's start with the last word: Protocol. What does "Protocol" mean? Well, it’s a set of rules.

As developers, we work with protocols all the time. For example, when we work with the **HTTP protocol**, it's not just random communication - there's a set of rules we follow. When we build REST APIs, we use specific methods like `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. We transfer data in specific formats like JSON, XML, or even JSON-RPC. All of this is structured communication that follows a protocol.

In a similar way, AI agents or AI-based applications also need to follow a structured approach when exchanging information. We'll explore that more in a bit, but for now, just remember: a protocol is simply a set of rules.

### What is a "Model"?

Next, let's talk about the “Model”. The term "Model" is something you’re likely already quite familiar with. We all use models in one way or another, especially large language models or LLMs.

Take GPT from OpenAI, Gemini from Google, Claude from Anthropic - you may use these every day. There are tons of models available now, like the newer DeepSeek and so on. The point is, we already interact with models regularly. We ask questions, and they give us answers.

But have you ever wondered how these LLMs actually work? Most people think that when you ask a model something, it goes and searches the internet for answers. But that's not how it works.

What these models actually do is **predict the next word** in a sentence - that's it. They're **language experts** - they don't know "facts" in real-time or pull live data from the web. Instead, they've been trained with a huge amount of information beforehand (pre-trained). Then when you ask something, they try to figure out: "What word most likely comes next based on what the user just said?"

That's why when you ask something, the reply appears word by word - like it's typing. And no, that's not some fancy frontend animation. That's just how LLMs work: they predict one word at a time. It looks like typing because it is being generated in real time, one word at a time.

That's the core of **Generative AI**. They're experts in natural language - understanding how we speak, predicting what we're likely to say next and generating responses accordingly.

### What is "Context"?

Now let's move to “Context”. In English, context means the subject or background of something. For example, when you send an email, you add a subject line. And just by looking at the subject, the recipient gets an idea of what the email is about - even before opening it.

Similarly, when you talk to a model like ChatGPT or Claude, you provide a few lines - maybe a question or some background. That input becomes the “Context”.

The model's response entirely depends on the context you provide. It uses that context to start predicting the next word. If the model already knows what you're referring to, based on the context, it'll give you an accurate answer. But if you don't provide enough context, it can't help you properly - even if it's a powerful LLM.

Let me give you a simple example: Suppose you go to Claude and ask, *"Who am I?"* Will it be able to answer that? No, it won't. But if in a previous message you had told Claude, *"Hey, I'm Sumit"* and then later in the same session ask *"Who am I?"*, it will say, *"You're Sumit."* Why? Because now it has context.

So, context is just background info - and the better context you give, the better the model can respond. That's how these LLMs are designed to work.

### Putting It All Together: What is Model Context Protocol?

So when we say “Model Context Protocol”, we're talking about a **set of rules or protocols** that define how to feed **context** into a **model**. Now, what is this context we're feeding? It could be any kind of external information - something outside the model's default knowledge.

It’s like going to Claude Desktop and telling it, *“Hey, I’m Sumit!”* and then asking "*Who am I?*". Again, it’ll know because you told it before.

But here's the catch: models don't magically know about your calendar, your emails, your databases or your files. So how do you make that data available to them? That's where MCP comes in.

MCP lets us feed these external pieces of information - like your schedule, your project data, or anything else - into a model, but in a structured and standardized way. And that's what makes MCP so powerful.

![Model Context Protocol - Structured Communication](https://cdn.hashnode.com/res/hashnode/image/upload/v1750671107217/c0c8c59d-5c2c-451e-9649-0889cae36c05.png)

---

## Why MCP is Necessary

Now that you understand what MCP is, let's talk about why we need it. Why did Anthropic even invent this thing in the first place?

Let's think about how we use different code editors in our day-to-day work. One really powerful, AI-equipped modern code editor is [Cursor](https://cursor.com). Personally, I don't use it regularly, but it’s perfect for this demonstration. Imagine you are inside your Cursor editor. And, as many of you know, you can chat with Cursor while coding. You can ask it to explain something, generate code, refactor logic, and so on.

### The MCP Connector in Action

Now let's say you ask Cursor something that depends on data from your local machine - maybe a large email database or your own personal documents. Can Cursor access that data by default? No, it can't. But what if - and this is the important part - what if you connect a custom-made component to Cursor?

Let's call it an **MCP server**. If you connect your MCP server to Cursor, then here's what happens: Cursor still can't access your files directly. But now, when you ask it a question, it will turn to this MCP server and say: "*Hey, do you know anything about this?*" And the MCP server - since you've built it to connect with your files or databases - will fetch the relevant information, turn it into context, and feed that back to the model. Now the model has the necessary background to generate a smart, informed reply.

And the best part? You're not limited to just one connector. You can connect multiple MCP servers to your application.

### Universal Access Across Platforms

Let's now walk through a real example - something I'll actually show you later with code examples in this handbook.

![How MCP Server communicates with Local Data and generate Response](https://cdn.hashnode.com/res/hashnode/image/upload/v1750678334371/7244b0ee-f015-48f2-9433-2cf29a194b06.jpeg)

Say you ask Cursor: "*Do I have any meetings today?*" Now to answer that, the AI would need access to your schedule, right? Let's say you use Google Calendar to manage your meetings. Can Cursor directly connect to your Google Calendar? No, it can't. And not just Cursor - ChatGPT or Claude can't access your calendar either, not unless you manually build that integration.

But here's the thing: what if you want this to work universally? Like, no matter where you ask the question from? You might ask it from Cursor today, but someone else might ask from ChatGPT tomorrow.

In both cases, we want these tools to access your calendar and return the same result. To make that possible, we need a universal way to connect - and that's exactly what an MCP server enables. If you create an MCP server that follows the protocol and hooks into your calendar, then any AI application that supports MCP can connect to it and get the right context. That's another reason MCP is so powerful.

![How MCP feeds context to Cursor Editor](https://cdn.hashnode.com/res/hashnode/image/upload/v1750671538182/0955d5b2-48ce-4e12-877b-0eeb7d2ddad2.png)

### Developers are Key

And the best part? You (the developer) are the one who will build these MCP servers. This isn't something regular users can build - you need coding skills for this.

This is one reason AI won’t replace developers just yet

### Beyond Built-in Integrations

Let's compare that with what used to happen before. For example, today, ChatGPT lets you do web searches - you can just ask it to find something online, and it'll fetch the result. But this feature is only there because [<FontIcon icon="iconfont icon-openai"/>OpenAI](https://openai.com), the makers of ChatGPT, built it into the app.

Now imagine your own product - like my logicBase Labs website. Let's say students come to the site and ask questions through a chat box you’ve built. That AI assistant belongs to you - it's part of your software. You can connect it to any model, like GPT, Claude, whatever, that understands natural language. But you still need to feed it the right information so it can respond meaningfully.

So what do you do? You build your own MCP server, maybe using Node.js, Python, or Java - whatever tech stack you're comfortable with. This MCP server is a completely standalone app. Now you also build your chat interface - the UI where students type questions. You connect it to the LLM (like GPT or Claude) and to your custom-built MCP server.

### The Power of Reusability

Here's the best part: your MCP server is now independent and reusable. You could even give it to another company, like another EdTech company wants to use your calendar or data handling logic. They can just modify your MCP server, replace the logic with their own data, and use it with their chat client. And boom - it's a universal solution now.

Even better, let's say the data inside my logicBase Labs website changes in the future. No problem! I won’t need to rewrite the connector logic. The code that fetches and formats the data stays the same. The content might change, but the structure is stable.

### The Burden without MCP

But if I wasn’t using MCP, what would I have to do? I’d need to build everything into my client. Every AI assistant would need to carry the burden of logic, context building, and data retrieval. If anything changed - say the GitHub repo’s structure, the schedule format, or the database schema - I’d have to go and update every single client individually. That's a nightmare!

### A Practical GitHub Example

Let me give you another solid example. Suppose you want to connect your GitHub to Cursor. You want to say something like: "*Hey, push my code to GitHub*" - and it just works. To make that happen without MCP, what would you normally need to do? You'd have to:

- Read through the [<FontIcon icon="iconfont icon-github"/>GitHub API documentation](https://docs.github.com/en/rest)
- Write integration logic
- Handle OAuth authentication
- Deal with access tokens and API limits

It's complex. It's messy. But imagine this: What if GitHub themselves released their own MCP server? Then all you need to do is:

- Plug that MCP server into Cursor
- Let the model discover the capabilities
- Say: "*Push my code*"

And boom - it works! You don't need to write any custom integration logic. That's the magic of MCP. And here's the best part: GitHub already released their [official MCP server (<FontIcon icon="iconfont icon-github"/>`github/github-mcp-server`)](https://github.com/github/github-mcp-server). You can use it right now.

### Why MCP Matters for Developers

So I hope you now see the bigger picture. MCP servers are a game-changer. They don't just reduce your workload - they create new job opportunities for developers like us. This isn't going to "replace your job". Rather, it's creating new, valuable work that didn't exist before.

---

## RAG vs MCP

Now that we’ve covered MCP, let’s look at another popular approach called [<FontIcon icon="fa-brands fa-wikipedia-w"/>RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) and see how they differ. Many AI builders start by using RAG to ground their models in static knowledge, so it’s helpful to see how that approach compares to streaming live data with MCP.

### What is RAG?

First up, what is RAG? **Retrieval-Augmented Generation** is a technique in which an AI model reaches out to an external “library” of documents at the moment you ask a question. It pulls back just the pages it needs, tucks them into your prompt and then writes its answer using those exact excerpts. In other words, it dynamically augments itself with relevant text from a large corpus.

### RAG: The “Mise en Place” Prep

Imagine you’re the head chef preparing for service. Before the doors open, you and your team do a full **mise en place**: chop, measure, and arrange every ingredient on your counter so it’s ready the moment you need it. When orders start flying in, you simply grab what’s already laid out - no running back to the pantry.

How it works:

1. Retrieve: Your system searches a document store for the most relevant “ingredients” (text snippets).
2. Augment: Those snippets get mixed into your AI prompt.
3. Generate: The model cooks up an answer grounded in that batch of information.

RAG is great for static or rarely changing content (think policy manuals, research papers, or any “recipe book” that doesn’t get rewritten mid-service).

### MCP: The Rolling Assistant Cart

Now imagine halfway through dinner you realize you need a fresh herb or a special garnish that wasn’t prepped. Instead of halting the kitchen, you wheel over an assistant cart loaded with whatever new items appear - they bring you that garnish the second it’s ready.

How it works:

1. Subscribe/Stream: Your AI client opens a live line to the data source.
2. Deliver: As soon as new data (like a live order update or sensor reading) is available, it rolls up to you.
3. Consume: Your model can tap into that fresh data anytime during generation.

MCP is great for scenarios needing up-to-the-minute info (like live dashboards, chatbots feeding off recent user activity, IoT sensor streams, and so on).

### Bringing It All Together

- RAG alone: Best when your "mise en place" is extensive enough to cover everything you need - pre-prepared background knowledge.
- MCP alone: Required when you need “a rolling cart” of fresh ingredients at one's fingertips.
- Combined approach: Do your background “mise en place” with RAG for in-depth context, and keep the assistant cart rolling with MCP to provide live updates - so your AI has deep background knowledge along with real-time freshness.

---

## MCP Documentation

Now let's check out the [<FontIcon icon="iconfont icon-mcp"/>official MCP documentation](https://modelcontextprotocol.io/introduction). It’ll help things start to feel much clearer. So what does the definition say?

::: info MCP Documentation (<FontIcon icon="iconfont icon-mcp"/><code>modelcontextprotocol.io</code>)

> MCP is an open protocol that standardizes how applications provide context to LLMs.

Yep - exactly what we've already talked about. And then comes a brilliant line from the docs:

> Think of MCP like a USB-C port for AI applications.

<SiteInfo
  name="Introduction - Model Context Protocol"
  desc="Get started with the Model Context Protocol (MCP)"
  url="https://modelcontextprotocol.io/introduction/"
  logo="https://mintlify.s3-us-west-1.amazonaws.com/mcp/_generated/favicon/favicon.ico?v=3"
  preview="https://mcp.mintlify.app/mintlify-assets/_next/image?url=%2Fapi%2Fog%3Fdivision%3DDocumentation%26title%3DIntroduction%26description%3DGet%2Bstarted%2Bwith%2Bthe%2BModel%2BContext%2BProtocol%2B%2528MCP%2529%26logoLight%3Dhttps%253A%252F%252Fmintlify.s3.us-west-1.amazonaws.com%252Fmcp%252Flogo%252Flight.svg%26logoDark%3Dhttps%253A%252F%252Fmintlify.s3.us-west-1.amazonaws.com%252Fmcp%252Flogo%252Fdark.svg%26primaryColor%3D%252309090b%26lightColor%3D%2523FAFAFA%26darkColor%3D%252309090b%26backgroundLight%3D%2523FAFAFA%26backgroundDark%3D%25230e0e10&w=1200&q=100"/>

:::

Let's pause here, because this analogy is super important. Think about the USB-C port on modern devices. We all use it. But remember how things were before? Back in the day, your computer would have tons of different ports - HDMI, VGA, USB-A, audio jack, you name it. You'd have to manage different cables for everything. Maybe your mouse was USB-A, your keyboard used some other port, and your external monitor needed HDMI. It was a mess.

![USB-C universal connector analogy](https://cdn.hashnode.com/res/hashnode/image/upload/v1750678229073/7df559c2-48bf-4a39-8415-31276609ca98.jpeg)

But now? Everything uses USB-C. One universal connector for data, power, audio, video - everything. That's exactly what MCP is for AI applications. Instead of building separate integrations or connectors for each AI tool (Cursor, ChatGPT, Claude, and so on), you now build one standardized MCP server and any AI tool that supports MCP can connect to it. That's why this protocol is such a big deal.

---

## How AI Apps Talk to MCP Servers — A Practical Example

Let me walk you through one more example just to help you really get this. Imagine you're using Claude. You ask it a simple question: “*Do I have a meeting today?"*

### Scenario: Asking Claude About Your Schedule

Now, Claude doesn't actually have that information. If you haven't connected any MCP server, it'll give you a vague answer. Probably something nice and generic, because it's good at natural language - but not specific. But if you want a real answer - something factual - you need to feed it context. And that's where the MCP server steps in.

![Claude vague answer without MCP](https://cdn.hashnode.com/res/hashnode/image/upload/v1750671970459/c1cecbfc-1012-4580-ba95-ccfeb0854129.png)

### Discovering the Right MCP Server

Let's say Claude is connected to an MCP server. Now things get interesting. As soon as you ask the question, Claude will first look at the list of MCP servers it's connected to. Then it'll intelligently choose the right one and ask:

*"Hey, what are your capabilities?"*

Because your MCP server might be able to do many things. Maybe it can:

- Give a full list of calendar events
- Check if there's a meeting on a specific day
- Fetch data from Google Calendar
- Summarize documents

So the model first figures out:

*"Which of these capabilities do I need?"*

In this case, it decides:

*"Okay, I just need to know if the user has a meeting today."*

Then Claude sends a message to the MCP server - in a specific format, which we'll look at shortly. It's kind of like how REST APIs work. The message says something like:

*"Here's the date. Tell me if the user has a meeting."*

### MCP Server Fetches and Returns the Data

Now the MCP server takes that input, connects to Google Calendar (or whichever source you've set it up with) and runs the necessary logic. Eventually, it sends back a response, usually in a structured format like **JSON-RPC**. It might return a list of meetings or just one - whatever applies.

### Model Converts Structured Data into Natural Language

Now here's the beauty of it. Even though the MCP server is giving back something technical (like JSON), Claude will never show that to the user. Because it's a **language model**, it will convert that structured data into a smooth, natural sentence like:

*"Yes, you have a meeting with Dr. Chuck at 4 PM."*

![Claude positive answer with MCP Server](https://cdn.hashnode.com/res/hashnode/image/upload/v1750672087724/efa2637d-1a35-4f7a-b8f6-2d9183580c23.png)

### Under the Hood: Abstracting the Complexity

To the user, it feels like magic. But behind the scenes, a lot just happened:

- The model found the right MCP server
- It selected the right capability
- It passed the correct input
- The server ran logic, got the data, and returned a structured result
- And finally, the model turned that into human language

### Mirroring Standard Web App Workflows

This is exactly how our websites work too. Let's say a user visits your website and types something in a message box. You fetch data in the backend, maybe call an API or run a DB query. That response comes back in JSON — but the user never sees that. What they see is the final polished UI response. Same principle here. So I hope it's now clear how powerful this system is.

---

## How MCP Servers Work Internally

Now let's go one step deeper and understand how an MCP server actually works under the hood - technically. An MCP server primarily works through something called **standard input and output**, or in programming terms, `stdin` and `stdout`. So what does that mean? Let's break it down with an example.

You know when you open a terminal in the Cursor editor, it gives you a basic shell where you can type in commands? That terminal is using your machine's standard input and output system.

Now typically, when websites communicate with APIs, they use REST APIs over HTTP. But with MCP servers - especially when they're used locally - we don't use HTTP. Here's why: many times, your MCP server is running on your own machine, connected to local databases or files. So instead of going through network calls, it uses direct system-level communication through `stdin` and `stdout`.

![MCP local transport process similar to REST API](https://cdn.hashnode.com/res/hashnode/image/upload/v1750678140969/9f22b8a9-9c56-45cc-95ae-5b946e379133.jpeg)

Let's say you're inside Cursor, and you type something like:

```sh
echo "hello"
```

What happens? The terminal reads your input (`stdin`), processes it and prints `hello` back to you via `stdout`. This same pattern is used by MCP servers.

Now imagine the AI application (like Claude) is trying to talk to your MCP server. How does it do that? It doesn't send an HTTP request like a web client. Instead, it writes the request directly into the MCP server's **standard input** - just like how a terminal command works. And then your MCP server reads that input, performs the necessary action (maybe it talks to Google Calendar, a database, a filesystem, whatever) and once it's done, it sends the response back using **standard output**.

Let's imagine a real-life conversation between Claude and your MCP server. You ask Claude:

*"Do I have a meeting today?"*

Claude realizes it doesn't have this information on its own. So what does it do? First, it discovers the tools or methods available - it checks all connected MCP servers to see what they can do. Then it intelligently figures out the best method to use. Let's say it figures out:

*"Alright, I should call the* `calendar` *method."*

It then writes a structured input into your MCP server's stdin, something like:

```json
{
  "method": "calendar",
  "params": {
    "date": "2025-06-16"
  }
}
```

Okay, the real format may differ, but conceptually it's like this. Your MCP server then receives that input, runs the logic, maybe pulls data from your Google Calendar, and then responds like this:

```json
{
  "result": {
    "meetings": [
      {
        "title": "Team Sync",
        "time": "4:00 PM"
      }
    ]
  }
}
```

Now here's the kicker: Claude doesn't show this JSON to the user.

It reads that raw data, runs its natural language model, and finally says:

*"Yes, you have a meeting 'Team Sync' today at 4 PM."*

That's the entire lifecycle. And the user? They don't even know what's going on behind the scenes. Just like when a non-technical person uses your website, they don't know about fetch calls or JSON responses. They just see a smooth UI. Same deal here.

And this `stdin`/`stdout` approach works great locally - especially for data on your machine. Later, we'll see how things work differently when you connect to remote services. But for now, just remember:

MCP doesn't use HTTP calls for local communication. It works through the terminal - `stdin` and `stdout`.

And that makes it fast, secure, and incredibly flexible.

---

## The MCP Architecture — How It All Fits Together

Let's now take a look at the MCP architecture. Once you see the structure, everything we've discussed will make even more sense. Here's what the diagram shows (the diagram was collected from the [<FontIcon icon="iconfont icon-mcp"/>MCP documentation](https://modelcontextprotocol.io/introduction)):

![MCP architecture diagram from the docs](https://cdn.hashnode.com/res/hashnode/image/upload/v1750672357388/9d07577d-447e-4a13-b205-1d0e72b5d18a.png)

We have a **host** - that could be Claude, or any AI-powered application. This host is connected to one or more **MCP servers** through the **MCP protocol**. And these MCP servers are in turn connected to **external data sources**, which could be local files or remote services like APIs, calendars, databases, and so on.

Now what does the MCP server do? It retrieves data from those external sources, prepares the appropriate context, and feeds it back to the host using the MCP protocol. That context is then used by the LLM to generate a relevant, natural-sounding response.

All this communication - at least when done locally - happens via standard input and output (`stdin` and `stdout`) like we discussed earlier.

Let's go over the components one by one.

### 1. MCP Host

First, we have the MCP host. This is the AI application, something like Claude, Cursor, or even your own AI interface. If we compare this to traditional web architecture, the host is like the server of your website - the main brain that runs the show. In the context of Cursor, the Cursor editor itself is the MCP host.

### 2. MCP Client

Next, we have the MCP client. So what's the client in this context? Well, in web development, think of a user's browser as the client - not the user themselves, but the actual browser that sends requests and receives responses. In the MCP world, the MCP client is the internal part of the host that connects to MCP servers.

Let's take Cursor again as an example.

If you go into Cursor's settings, you'll see something called **MCP Tools**. That's where you can add any custom MCP server. Cursor has a built-in client that lets you plug in your own server. If you were building your own editor like Cursor, you'd need to write this client logic yourself to handle things like discovering servers, formatting requests, and reading responses. Good news is, there's [<FontIcon icon="iconfont icon-mcp"/>already a spec and libraries](https://modelcontextprotocol.io/quickstart/client) to help with that too.

### 3. MCP Server

Then, of course, comes the MCP server, which we've already talked about at length. It's the tool you build that knows how to fetch or generate context from files, APIs, calendars, anything. You can make it with Node, Python, Java - anything you like. As long as it follows the protocol, it'll work. And remember - it can be reused across different AI apps. That's the beauty of MCP.

### 4. Data Sources - Local or Remote

Last but not least, we have the data sources. Your MCP server needs to pull data from somewhere. That "somewhere" could be:

- A local SQLite or Postgres DB
- Your file system
- An external API like Google Calendar or GitHub
- A third-party SaaS dashboard
- Anything else that holds relevant context

The point is: you abstract away the data handling into your MCP server. So the AI host doesn't care how the data is fetched - it just gets structured context in return.

So to recap:

- The **MCP host** is your AI application (like Claude, Cursor, or a custom app).
- The **MCP client** is the bridge inside that host that connects to external MCP servers.
- The **MCP server** is what you, the developer, build - to deliver context.
- And the **data sources** are whatever backend services or files hold your knowledge.

Everything talks to each other via the MCP protocol. And locally, it all happens through `stdin`/`stdout`, like a conversation between programs in the terminal. So that's the whole summary in one go. I hope you understand how it all works.

![MCP components talk to each other](https://cdn.hashnode.com/res/hashnode/image/upload/v1750672511389/bd68a3f8-7bf3-4fcc-b631-c99a4ea05667.png)

---

## Opportunities for Web Developers

### SDK Options: Pick Your Language

Alright, soon we will start building an MCP server - and for that, we'll be using the TypeScript SDK. Now, if you look at the documentation, you'll notice that there are many SDKs available. You can build MCP servers using:

- C#
- Java
- Kotlin
- Python
- Ruby
- Swift (for mobile)
- and of course, TypeScript - which is essentially JavaScript with superpowers!

And since JavaScript is like my mother tongue, I'll naturally go with TypeScript here. Now, don't worry - this won't be super technical. I'm not going to sit and code line-by-line with you, but I will walk you through the important parts so you get a clear understanding.

### From Backend Service to AI-Enabled Developer

What you'll find is that everything we'll be doing here is stuff you likely already know. Because this is still just regular coding. You're going to build a backend service - just like one you may have done hundreds of times before. The only difference is that now, your application will be part of the **MCP ecosystem**.

Think of it like this: As a developer, you're not switching careers. You're not abandoning your current skills. You're still doing what you've always done - writing logic, structuring data, managing APIs. The only shift is in **where** you're plugging that code in. Instead of just serving HTTP requests or returning React components, now your code will be used to feed context into LLMs. And that, right there, is the bridge into the AI world.

Let's be real: in today's world, just building yet another CRUD application isn't enough. If your app isn't deeply integrated into the AI ecosystem, it's going to get left behind. But if you understand concepts like MCP, and if you know how to build and expose structured context to any model, then you're not just a developer anymore. You're an AI-enabled developer!

You're building the infrastructure that connects real-world data to AI applications. And that's huge! That's why I truly believe this whole MCP ecosystem is going to explode in the coming months and years. I believe companies all over the world are going to start building and publishing their own MCP servers - just like how everyone now builds APIs or SDKs. Soon, we'll reach a point where people won't visit your company website to fill out a form or read static FAQs. They'll just ask a question inside ChatGPT, Claude, or Cursor, like:

*"What are the pricing plans for logicBase Labs?"*

And they'll get a response - not because those models are trained on your website, but because you've built an MCP server that gives them real-time, personalized, authenticated data.

So yes, now let's go ahead and build our first MCP server - quickly and in a way that's easy to follow. Because ultimately, this is where developers like you belong: bringing together the best of your existing skills and applying them inside the AI universe.

---

## MCP Server Setup and Integration

So, to build an MCP server, we've landed on the official GitHub repo page for [MCP's TypeScript SDK (<FontIcon icon="iconfont icon-github"/>`modelcontextprotocol/typescript-sdk`)](https://github.com/modelcontextprotocol/typescript-sdk). Now, for those of you who don't know TypeScript, there's nothing to worry about. Because TypeScript is basically a superset of JavaScript. So even if you're not familiar with TypeScript, it's totally fine. You can write your code in plain JavaScript, and since every valid JavaScript code is also valid TypeScript, you're good to go.

And if you're a regular JavaScript developer, you'll find everything here familiar - just like you'd expect from any typical docs. They've provided a small, simple template for a TypeScript server. It's a single, minimal server setup, and that's exactly the template I would use to build my own server. Let's walk through the setup.

My project is a Node.js project. I've created a <FontIcon icon="fa-brands fa-js"/>`server.js` file, and honestly, that's the only file I've used in this project. All the code is written inside that one file.

Step-by-step, here's what I did:

#### 1. Initialize the project

```sh
npm init
```

This creates the <FontIcon icon="iconfont icon-json"/>`package.json` file.

#### 2. Install the required MCP package

Run the install command (mentioned in the [docs (<FontIcon icon="iconfont icon-github"/>`modelcontextprotocol/typescript-sdk`)](https://github.com/modelcontextprotocol/typescript-sdk)).

```sh
npm install @modelcontextprotocol/sdk
```

#### 3. Import and create the MCP server

I imported `McpServer` from the installed package and then created a new instance using `new McpServer()`. You need to pass an object with a name and version:

```js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// create the MCP server
const server = new McpServer({
    name: "Sumit's Calendar",
    version: "1.0.0",
});
```

#### 4. Add a tool (function)

Tools are the functions your AI client can invoke. I used `server.tool()` function from the SDK and passed three things:

- A meaningful name: `getMyCalendarDataByDate` so that my AI application can understand which tool to call
- Input validation using `zod`
- An async callback function that fetches meeting data

```js
// register the tool to MCP
server.tool(
  "getMyCalendarDataByDate",
  {
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Please provide a valid date string.",
    }),
  },
  async ({ date }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(await getMyCalendarDataByDate(date)),
        },
      ],
    };
  }
);
```

The callback receives the validated date and uses it to call an async controller function called `getMyCalendarDataByDate` that fetches data from Google Calendar. Now we will write the function.

#### 5. Google Calendar Integration

First we need to install the <FontIcon icon="fa-brands fa-npm"/>`googleapis` package with the below command in the terminal:

```sh
npm install googleapis
```

Then import `google` object from the installed the package.

```ts
import { google } from "googleapis";
```

Now let’s write the function `getMyCalendarDataByDate` and call the `google.calendar` method according to [<FontIcon icon="fa-brands fa-google"/>Google Calendar API](https://developers.google.com/workspace/calendar/api/quickstart/nodejs). This `google.calendar()` method receives an object as parameter and we need to mention `version` and `auth` here. `version` is simply the Calendar API version number and `auth` is the Google API Public Key for authentication.

```js
async function getMyCalendarDataByDate(date) {
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_PUBLIC_API_KEY,
  });
}
```

Here, you can see that I’ve used the Google API public key as an environment variable. So, we’ll create a <FontIcon icon="fas fa-file-lines"/>`.env` file in the root of the project directory and add the following inside that file:

```sh title=".env"
GOOGLE_PUBLIC_API_KEY=WRITE_YOUR_GOOGLE_PUBLIC_API_KEY
```

Don’t forget to replace with your own Google Public API Key. You can grab your public key from [<FontIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://cloud.google.com/cloud-console).

Now we need to calculate the `start` and `end` of the given date (UTC) received as `string` in the `date` parameter of the `getMyCalendarDataByDate` function.

```js
// Calculate the start and end of the given date (UTC)
const start = new Date(date);
start.setUTCHours(0, 0, 0, 0);
const end = new Date(start);
end.setUTCDate(end.getUTCDate() + 1);
```

Now it’s time to fetch the list of events from my Google Public Calendar. For that, according to Google Calendar API, we need to call the `calendar.events.list` function and pass necessary options to it:

```js
const res = await calendar.events.list({
  calendarId: process.env.CALENDAR_ID,
  timeMin: start.toISOString(),
  timeMax: end.toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: "startTime",
});
```

Here you can see, I have mentioned my Public Calendar ID using another environment variable called `CALENDAR_ID`. So go back to your <FontIcon icon="fas fa-file-lines"/>`.env` file and set the new environment variable:

```sh title=".env"
CALENDAR_ID=YOUR_OWN_PUBLIC_CALENDAR_ID
```

Just a quick note - your `CALENDAR_ID` will be simply your Google Email address, for example `someone@gmail.com`. Also don’t forget to make your calendar public, otherwise this example and API setup will not work.

To make your Google Calendar public, you need to adjust the calendar's sharing settings in Google Calendar on a computer. Navigate to the calendar you want to share, then find the "Access permissions for events" section and check the box labeled "Make available to public". You can then choose the level of access you want to grant others.

Here's a step-by-step guide:

- Go to [<FontIcon icon="fa-brands fa-google"/>Google Calendar](https://calendar.google.com/) on your computer.
- Find the calendar you want to share under the "My calendars" section on the left side of the screen.
- Click on the three dots (More) next to the calendar name and select "Settings and sharing".
- Under "Access permissions for events," check the box next to "Make available to public".

And for the `timeMin` and `timeMax` options I have used the `start` and `end` date time we just calculated above.

Now we will get the `events` array from `res.data.items` and then map through those events to get the final `meetings` array. We also need to handle blank array for no events.

```js
const events = res.data.items || [];
const meetings = events.map((event) => {
  const start = event.start.dateTime || event.start.date;
  return `${event.summary} at ${start}`;
});

if (meetings.length > 0) {
  return {
    meetings,
  };
} else {
  return {
    meetings: [],
  };
}
```

Let’s do some error handling. We will simply push our above event fetching logic inside a `try/catch` block and handle error inside the `catch` block. So below is our updated code:

```js :collapsed-lines
try {
  const res = await calendar.events.list({
    calendarId: process.env.CALENDAR_ID,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items || [];
  const meetings = events.map((event) => {
    const start = event.start.dateTime || event.start.date;
    return `${event.summary} at ${start}`;
  });

  if (meetings.length > 0) {
    return {
      meetings,
    };
  } else {
    return {
      meetings: [],
    };
  }
} catch (err) {
  return {
    error: err.message,
  };
}
```

To run the server locally using `stdin`/`stdout`, I used the `stdioServerTransport()` function from the MCP package and passed it to the server's `start()` method. This part looks like:

```js
const transport = stdioServerTransport();
server.start(transport);
```

Then I wrapped everything inside an async `init()` function to avoid top-level `await` and call the `init` function.

```js
function init() {
  const transport = stdioServerTransport();
  server.start(transport);
}

init();
```

#### 6. Final Source Code

So below is the complete code for my <FontIcon icon="fa-brands fa-js"/>`server.js` file:

```js :collapsed-lines title="server.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { google } from "googleapis";
import { z } from "zod";

dotenv.config();

// create the MCP server
const server = new McpServer({
  name: "Sumit's Calendar",
  version: "1.0.0",
});

// tool function
async function getMyCalendarDataByDate(date) {
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_PUBLIC_API_KEY,
  });

  // Calculate the start and end of the given date (UTC)
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  try {
    const res = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items || [];
    const meetings = events.map((event) => {
      const start = event.start.dateTime || event.start.date;
      return `${event.summary} at ${start}`;
    });

    if (meetings.length > 0) {
      return {
        meetings,
      };
    } else {
      return {
        meetings: [],
      };
    }
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

// register the tool to MCP
server.tool(
  "getMyCalendarDataByDate",
  {
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Please provide a valid date string.",
    }),
  },
  async ({ date }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(await getMyCalendarDataByDate(date)),
        },
      ],
    };
  }
);

// set transport
async function init() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// call the initialization
init();
```

Then install the necessary `dotenv`, `googleapis`, and `zod` packages with the below command:

```sh
npm install dotenv googleapis zod
```

Now you can start the server with the command `node server.js` in your terminal and check whether everything is working properly or not. In case you get any warning to add a `type: “module”` line inside your <FontIcon icon="iconfont icon-json"/>`package.json` file, go ahead and do that. This warning is expected because we are using ES Module syntax for importing our packages instead of default Common JS syntax.

Finally, we are done with the coding part.

#### 7. Connecting with Cursor editor

After setting up the server, I needed to register it inside the **Cursor** editor:

Start by opening Cursor Settings → Tools & Integrations → New MCP Server.

![How to connect MCP Server in cursor](https://cdn.hashnode.com/res/hashnode/image/upload/v1750673140780/14ac470e-38e7-4cf4-bef8-823fc155c015.png)

Inside the object, provide a new object with the below properties according to [Cursor Client setup guide](https://docs.cursor.com/context/model-context-protocol#manual-configuration) mentioned in the [Cursor Docs](https://docs.cursor.com/welcome):

- A name: `Sumit's Calendar Data`
- Command: `node`
- Arguments: full path to <FontIcon icon="fa-brands fa-js"/>`server.js`
- Environment variables: API key and Calendar ID

::: tip Example

```json
{
  "mcpServers": {
    "sumits-calendar-data": {
    "command": "node",
    "args": ["/full/path/to/project/server.js"],
    "env": {
    "GOOGLE_API_KEY": "...",
    "CALENDAR_ID": "...",
    },
    },
  },
}
```

![How to connect MCP Server in Cursor](https://cdn.hashnode.com/res/hashnode/image/upload/v1750673187700/9a07465a-0e7b-4bb7-9523-286dcf38373a.png)

:::

Save and restart Cursor. The tool will now show as **active (green)**.

#### 8. Test Your MCP Server

Now, open the Cursor chat window and type:

*"Do I have any meetings today?"*

You'll see that:

- It detects the intent
- Chooses the correct MCP tool
- Passes today's date as input
- MCP server returns structured data
- The AI client responds naturally. In my case, I saved an event inside my Google Calendar on today’s date so it returned:

*"Yes, you have a meeting with Dr. Chuck at 4:00 PM."*

It even works in other languages. If you ask the same question another language other than English, you still get the correct answer. If there are no meetings for a given date, for example if you write:

*“Do I have any meeting tomorrow?”*

It replies:

*"No, you do not have any meetings scheduled for tomorrow."*

So now your custom MCP server is fully working, feeding real data from Google Calendar into your AI editor.

This unlocks huge possibilities. Imagine the same approach with GitHub, Notion, internal dashboards, CRMs - anything. It all starts with building and wiring up your MCP server the right way.

Let me know if you would like to build one for your own project! And if this handbook was even a little bit helpful in getting your first MCP server up and running, I’d love to hear about it - it would be great inspiration for me to write more guides like this in the future.

---

## Summary

You can find all the source code from this handbook in [this GitHub repository (<FontIcon icon="iconfont icon-github"/>`logicbaselabs/mcp-tutorial`)](https://github.com/logicbaselabs/mcp-tutorial). If it helped you in any way, consider giving it a star to show your support!

Also, if you found the handbook valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts - mention me on X [<FontIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen), watch my [coding tutorials (<FontIcon icon="fa-brands fa-youtube"/>`logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Custom MCP Server with TypeScript - A Handbook for Developers",
  "desc": "MCP (Model Context Protocol) lets you connect your code, data, and tools to AI applications like Claude and Cursor. This handbook explains how it works with real-world analogies, and shows you how to build a custom MCP server using TypeScript that fe...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
