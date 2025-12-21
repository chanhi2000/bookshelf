---
lang: en-US
title: "How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support"
description: "Article(s) > How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Node.js
  - AI
  - LLM
  - Google
  - Google Gemini
  - Google Drive
  - Google Sheets
  - Tool
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - node
  - nodejs
  - node-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
  - google-drive
  - google-sheets
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support"
    - property: og:description
      content: "How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-google-sheet-ai-agent.html
prev: /programming/ts/articles/README.md
date: 2025-09-26
isOriginal: false
author:
  - name: Shrijal Acharya
    url : https://freecodecamp.org/news/author/shricodev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758896336162/ed8b3c6b-2b3a-49ad-b60d-b2a42efbe19e.png
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
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemin/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Drive > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/google-drive/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Excel > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/xls/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support"
  desc="With the rise of AI agents and agentic systems, we’re no longer just generating text or images, we’re teaching AI how to take actions. Instead of asking, “Can AI write this for me?” you can now ask, “Can AI do this for me?” From updating CRMs to mana..."
  url="https://freecodecamp.org/news/how-to-build-a-google-sheet-ai-agent"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758896336162/ed8b3c6b-2b3a-49ad-b60d-b2a42efbe19e.png"/>

With the rise of AI agents and agentic systems, we’re no longer just generating text or images, we’re teaching AI how to take actions. Instead of asking, “Can AI write this for me?” you can now ask, “Can AI do this for me?” From updating CRMs to managing tasks, agents can now connect to real tools and get things done.

In this article, you’ll build an AI agent that can talk, think, and even update your Google Sheets using Composio, Next.js, and Gemini TTS.

::: info What's Covered?

In this tutorial, you'll learn how to build your own AI agent for Google Sheets with voice support that can use tools from Composio. You’ll learn these along the way:

- What an AI Agent is
- How to use Composio to add integrations to your agent.
- How to stream responses from a Next.js API route with Vercel AI SDK.
- How to work with the Gemini text-to-speech API.

:::

---

## What’s this Sheet Agent?

First, what is an AI Agent? An AI agent is a system that can act independently to achieve goals. For example, it can book a flight, send an email, or search a database.

Generative AI, like ChatGPT, mainly focuses on creating output such as text, images, or code. An agent is different because it can make decisions, plan, and take actions in the real world, not just generate content.

![Working of an AI Agent](https://cdn.hashnode.com/res/hashnode/image/upload/v1757925559119/187f2b32-ddf0-46fb-8359-8cb62699da57.webp)

Large language models (LLMs) often power these agents. The LLM provides reasoning and conversation skills, while the agent layer adds tools that enable it to act beyond simple generation.

So, you might have guessed it. Today, we're building an AI agent that can access real data from Google Sheets and even make changes to it.

---

## How to Set Up the Project

It's fairly simple to get this project up and running. Follow these steps:

First, you need to clone the repository:

```sh
git clone https://github.com/shricodev/google-sheet-super-agent.git
cd google-sheet-super-agent
```

Next, you need to install the dependencies:

```sh
npm i
```

Then set up the environment variables and run the development server:

```sh
# API key for Google Gemini (direct access)
GEMINI_API_KEY=

# API key for Composio to access tool integrations (especially Google Sheets)
COMPOSIO_API_KEY=

# Composio user ID (get this from your Composio dashboard after login)
COMPOSIO_GOOGLE_SHEET_USER_ID=

# Auth config ID for Google Sheets inside Composio
GOOGLE_SHEETS_AUTH_CONFIG_ID=

# API key for Google Generative AI SDK (Gemini SDK client)
GOOGLE_GENERATIVE_AI_API_KEY=

# Secret key for signing/encrypting sessions.
# Generate with `openssl rand -base64 32`
SESSION_SECRET=<secret_key_for_session>
```

To get the Composio API key, create an [<VPIcon icon="fas fa-globe"/>account](https://platform.composio.dev/auth) and log in to the dashboard. You can find the API key in your default project settings.

For the `COMPOSIO_GOOGLE_SHEET_USER_ID`, you can obtain it after connecting an account in the Google Sheets Auth configuration in Composio.

![Google Sheets account connection button in Composio](https://cdn.hashnode.com/res/hashnode/image/upload/v1757925645287/a727f2d0-c151-4dea-96bf-3d2b6317cc8d.png)

---

## Core Components in the Application

There are mainly three core logical components in this project:

### 1. Initiate Connection

This is fairly straightforward. You need to initiate a connection with Composio to use the integrations, which in our case is Google Sheets.

```ts
// ...Rest of the code

const connection = await composio.connectedAccounts.initiate(
  userID,
  googleSheetAuthConfigID,
  // Comment this out if you want to allow multiple accounts
  // {
  //   allowMultiple: true,
  // },
);

infoLog(
  "Please visit the following URL to authorize: ",
  connection.redirectUrl ? connection.redirectUrl : "Something went wrong!",
);
```

### 2. Set up TTS with Gemini API

For this project, I decided to go with Gemini for TTS generation instead of OpenAI only because they recently (end of August 2025) launched their TTS API.

You can read more about it here: [<VPIcon icon="iconfont icon-gemini"/>Gemini Speech Generation (text-to-speech)](https://ai.google.dev/gemini-api/docs/speech-generation).

```ts :collapsed-lines
import { errorLog } from "@/lib/logger";
import { ttsSchema } from "@/lib/validators/tts";
import { GoogleGenAI } from "@google/genai";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import wav from "wav";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function convertL16ToWav(pcmBuffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    writer.on("data", (chunk) => {
      chunks.push(chunk);
    });

    writer.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    writer.on("error", reject);

    const readable = new Readable({
      read() {
        this.push(pcmBuffer);
        this.push(null); // End the stream
      },
    });

    readable.pipe(writer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedBody = ttsSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: parsedBody.error.message,
        },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    const { text } = parsedBody.data;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const data = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const mimeType =
      result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType;

    if (typeof data !== "string") {
      errorLog("Invalid audio data received:", { data, mimeType });
      return NextResponse.json(
        { error: "Audio data is not a string." },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    if (!data || data.length === 0) {
      errorLog("Empty audio data received:", { data, mimeType });
      return NextResponse.json(
        { error: "Empty audio data received." },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    try {
      const audioBuffer = Buffer.from(data, "base64");

      console.log("Generated audio:", {
        bufferSize: audioBuffer.length,
        contentType: mimeType || "unknown",
        mimeType,
        textLength: text.length,
      });

      // Check if it's L16 PCM format that needs conversion
      if (
        mimeType?.startsWith("audio/L16") ||
        mimeType?.startsWith("audio/l16")
      ) {
        const wavBuffer = await convertL16ToWav(audioBuffer);

        return new NextResponse(new Uint8Array(wavBuffer), {
          headers: {
            "Content-Type": "audio/wav",
            "Content-Length": wavBuffer.length.toString(),
            "Cache-Control": "no-cache",
            "Accept-Ranges": "bytes",
          },
        });
      }

      return new NextResponse(new Uint8Array(audioBuffer), {
        headers: {
          "Content-Type": mimeType || "audio/mpeg",
          "Content-Length": audioBuffer.length.toString(),
          "Cache-Control": "no-cache",
          "Accept-Ranges": "bytes",
        },
      });
    } catch (bufferError) {
      errorLog(bufferError, "API /tts (buffer error)");
      return NextResponse.json(
        { error: "Invalid base64 audio data." },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  } catch (error) {
    errorLog(error, "API /tts");
    return NextResponse.json(
      { message: "Error generating audio." },
      { status: 500 },
    );
  }
}
```

This one's a bit more involved. For some reason, Gemini's API returns the data in the `audio/L16` format and not in the `mp3` or `wav` format that we're used to using.

And you can't really play this audio format directly in your browser. So, first, we need to convert it to `wav` format using the `convertL16ToWav` function. Then, we can return the `wav` buffer as the response.

This took me forever to implement. I didn't know there was something like `audio/L16` that I couldn't play in my browser. I had to do a lot of googling to figure this one out.

All in all, all it's doing is wrap the raw audio in a WAV file that looks like mono, 24kHz, 16-bit PCM.

And if you want to use the OpenAI package, which is much easier to use as it returns the speech in `mp3` format, check out this project of mine: [shricodev/voice-chat-ai-agent (TTS) (<VPIcon icon="iconfont icon-github"/>`shricodev/voice-chat-ai-configurable-agent`)](https://github.com/shricodev/voice-chat-ai-configurable-agent/blob/main/app/api/tts/route.ts).

### 3. Handle User Queries

This is the last piece of the puzzle. Here's where the actual tool call logic happens.

```ts :collapsed-lines
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { Composio } from "@composio/core";
import { NextResponse } from "next/server";
import { chatSchema } from "@/lib/validators/chat";
import { StatusCodes } from "http-status-codes";
import { errorLog } from "@/lib/logger";
import { VercelProvider } from "@composio/vercel";

// ...Rest of the code

const tools = await composio.tools.get(userID, {
  toolkits: ["GOOGLESHEETS"],
});

let conversationContext = "";
if (conversationHistory && conversationHistory.length > 0) {
  conversationContext = conversationHistory
    .map((conversation) => {
      return `${conversation.role}: ${conversation.content}`;
    })
    .join("\n");
}

const systemPrompt = `
You are an intelligent Google Sheets assistant. You can help users analyze, query, and manipulate data in their Google Sheets.

Sheet ID: ${sheetID}
User ID: ${userID}

Guidelines:
- Always use the Google Sheets tools to access real data from the spreadsheet
- Provide clear, actionable insights based on the actual data
- If you need to read data, use the appropriate Google Sheets tools first
- Format your responses in a clear, professional manner
- If asked about calculations, use the actual data from the sheet

Always generate a short summary of what you got done. like if the user asked
you to make changes, then write in short about what all changes you did. If
they asked you to summarize the data, then write in short about what the data
is all about.

---

Previous conversation in this document:

${conversationContext}
`;

const result = streamText({
  model: google("gemini-2.5-pro"),
  system: systemPrompt,
  prompt,
  tools: tools,
  toolChoice: "auto",
});

return result.toUIMessageStreamResponse({ sendReasoning: true });
```

This code lives in the Next.js app router. First, we fetch the tools from Composio using the `composio.tools.get` function. We use `auto` as the tool choice, which means that the agent will use the tools it has the most confidence in.

Then, we create the system prompt that will guide the agent on how to behave.

Finally, we call the `streamText` function, which streams the response instead of waiting for the entire response before sending it to the client, passing in the tools, system prompt, and the model to use. Then, we send the response in the `UIMessageStreamResponse` format so it can be easily displayed on the UI.

::: info Google Sheet Agent in Action

Here's a quick demo of the agent in action:

<VidStack src="youtube/emXE8q1Irao" />

:::

---

## Conclusion

So, what do you think of the project so far? This was a really fun project for me to work on.

Go ahead, clone the repository, and give it a try with your Google Sheet. Even after all of this, it is a fairly small project with super simple logic, which I believe you've already understood completely.

Do I suggest you use it on an important Google Sheet? Not at all. Remember, it's just an AI model that can access tools from Composio. You can never be 100% sure with AI. While building this project, I did run into cases where the AI picked the wrong tools and even messed up the sheet entirely. But, you can always try it on a not-so-important sheet to see how it all works.

You can find the entire source code here: [<VPIcon icon="iconfont icon-github"/>`shricodev/google-sheet-super-agent`](https://github.com/shricodev/google-sheet-super-agent).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Google Sheet AI Agent with Composio and Gemini TTS Support",
  "desc": "With the rise of AI agents and agentic systems, we’re no longer just generating text or images, we’re teaching AI how to take actions. Instead of asking, “Can AI write this for me?” you can now ask, “Can AI do this for me?” From updating CRMs to mana...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-google-sheet-ai-agent.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
