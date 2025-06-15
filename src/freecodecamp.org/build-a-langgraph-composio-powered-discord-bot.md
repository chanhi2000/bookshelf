---
lang: en-US
title: "How to Build a LangGraph and Composio-Powered Discord Bot"
description: "Article(s) > How to Build a LangGraph and Composio-Powered Discord Bot"
icon: fa-brands fa-node
category:
  - Node.js
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a LangGraph and Composio-Powered Discord Bot"
    - property: og:description
      content: "How to Build a LangGraph and Composio-Powered Discord Bot"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-langgraph-composio-powered-discord-bot.html
prev: /programming/js-node/articles/README.md
date: 2025-06-25
isOriginal: false
author:
  - name: Shrijal Acharya
    url : https://freecodecamp.org/news/author/shricodev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750798930964/65dd7078-e4e7-42d0-a797-1e7d72690513.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a LangGraph and Composio-Powered Discord Bot"
  desc="With the rise of AI tools over the past couple years, most of us are learning how to use them in our projects. And in this article, I’ll teach you how to build a quick Discord bot with LangGraph and Composio. You’ll use LangGraph nodes to build a bra..."
  url="https://freecodecamp.org/news/build-a-langgraph-composio-powered-discord-bot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750798930964/65dd7078-e4e7-42d0-a797-1e7d72690513.png"/>

With the rise of AI tools over the past couple years, most of us are learning how to use them in our projects. And in this article, I’ll teach you how to build a quick Discord bot with LangGraph and Composio.

You’ll use LangGraph nodes to build a branching flow that processes incoming messages and detects intent like chat, support, or tool usage. It’ll then route them to the right logic based on what the user says.

I know it may sound a bit weird to use LangGraph for a Discord bot, but you’ll soon see that this project is a pretty fun way to visualize how node-based AI workflows actually run.

For now, the workflow is simple: you’ll figure out if the user is just chatting, asking a support question, or requesting that the bot perform an action, and respond based on that.

::: info What you will learn: 👀

- How to use LangGraph to create an AI-driven workflow that powers your bot’s logic.
- How you can integrate Composio to let your bot take real-world actions using external tools.
- How you can use Discord.js and handle different message types like replies, threads, and embeds.
- How you can maintain per-channel context using message history and pass it into AI.

:::

By the end of this article, you’ll have a quite decent and functional Discord bot that you can add to your server. It replies to users based on message context and even has tool-calling support! (And there’s a small challenge for you to implement something yourself.) 😉

::: note Prerequisites

Make sure you have Discord installed on your machine so you can test the bot easily.

This project is designed to demonstrate how you can build a bot powered by LangGraph and Composio. Before proceeding, it is helpful to have a basic understanding of:

- How to work with Node.js
- Rough idea of what LangGraph is and how it works
- How to work with Discord.js
- What AI Agents are

:::

If you’re not confident about any of these, try following along anyway. You might pick things up just fine. And if it ever gets confusing, you can always check out the full source code [here (<FontIcon icon="iconfont icon-github"/>`shricodev/discord-bot-langgraph-composio`)](https://github.com/shricodev/discord-bot-langgraph-composio).

---

## How to Set Up the Environment

In this section, we will get everything set up for building the project.

### Initialize the Project

Initialize a Node.js application with the following command:

::: note

💁 Here I'm using Bun, but you can choose any package manager of your choice.

:::

```sh
mkdir discord-bot-langgraph && cd discord-bot-langgraph \
&& bun init -y
```

Now, that our Node.js application is ready, let's install some dependencies.

### Install Dependencies

We'll be using the following main packages and some other helper packages:

- [<FontIcon icon="fas fa-globe"/>discord.js](https://discord.js.org): Interacts with the Discord API
- [<FontIcon icon="fas fa-globe"/>composio](https://composio.dev): Adds tools integration support to the bot
- [<FontIcon icon="fas fa-globe"/>openai](https://platform.openai.com): Enables AI-powered responses
- [<FontIcon icon="fas fa-globe"/>langchain](https://langchain.com): Manages LLM workflows
- [<FontIcon icon="fas fa-globe"/>zod](https://zod.dev): Validates and parses data safely

```sh
bun add discord.js openai @langchain/core @langchain/langgraph \
langchain composio-core dotenv zod uuid
```

### Configure Composio

💁 You’ll use Composio to add integrations to your application. You can choose the integration of your choice, but here I'm using Google sheets.

First, before moving forward, you need to get access to a Composio API key.

Go ahead and create an account on Composio, get your API key, and paste it in the <FontIcon icon="fas fa-file-lines"/>`.env` file in the root of the project:

![Composio dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lkr1pys0txedp9vam4tt.png)

```sh title=".env"
COMPOSIO_API_KEY=<your_composio_api_key>
```

Authenticate yourself with the following command:

```sh
composio login
```

Once that’s done, run the `composio whoami` command, and if you see something like the below, you’re successfully logged in.

![Output of the `composio whoami` command](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ifzbkw6u6bwnj68lwqxt.png)

You're almost there: now you just need to set up integrations. Here, I’ll use Google sheets, but again you can set up any integration you like.

Run the following command to set up the Google Sheets integration:

```sh
composio add googlesheets
```

You should see an output similar to this:

![Add Composio Google Sheets integration](https://cdn.hashnode.com/res/hashnode/image/upload/v1750336813743/9079ef2b-dc2a-4b10-b001-50e4cf98f3c5.png)

Head over to the URL that’s shown, and you should be authenticated like so:

![Composio authentication success](https://cdn.hashnode.com/res/hashnode/image/upload/v1750325571006/b0864445-7471-471f-88eb-f2ec8d832b39.png)

That's it. You’ve successfully added the Google Sheets integration and can access all its tools in your application.

Once finished, run the `composio integrations` command to verify if it worked. You should see a list of all your integrations:

![Composio list of integrations](https://cdn.hashnode.com/res/hashnode/image/upload/v1750325653419/4585b63a-5581-4102-92e4-a55dca018063.png)

### Configure Discord Integration

This is a bit off topic for this tutorial, but basically, you’ll create an application/bot on Discord and add it to your server.

You can find a guide on how to create and add a bot to your server in the [<FontIcon icon="fas fa-globe"/>Discord.js](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) documentation.

And yes, it’s free if you’re wondering whether any step here requires a pro account or anything. 😉

Make sure you populate these three environment variables:

```sh title=".env"
DISCORD_BOT_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
DISCORD_BOT_GUILD_ID=<YOUR_DISCORD_BOT_GUILD_ID>
DISCORD_BOT_CHANNEL_ID=<YOUR_DISCORD_BOT_CHANNEL_ID>
```

### Add Environment Variables

You’ll require a few other environment variables, including the OpenAI API key, for the bot to work.

Your final <FontIcon icon="fas fa-file-lines"/>`.env` file should look something like this:

```sh title=".env"
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

COMPOSIO_API_KEY=<YOUR_COMPOSIO_API_KEY>

DISCORD_BOT_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
DISCORD_BOT_GUILD_ID=<YOUR_DISCORD_BOT_GUILD_ID>
DISCORD_BOT_CHANNEL_ID=<YOUR_DISCORD_BOT_CHANNEL_ID>
```

---

## Build the Application Logic

Now that you’ve laid all the groundwork, you can finally start coding the project.

### Define Types and Utility Helpers

Let’s start by writing some helper functions and defining the types of data you’ll be working with.

It's important in any application, especially ones like the one we're building – which is prone to errors due to multiple API calls – that we set up decent logging so we know when and how things go wrong.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`logger.ts` inside the <FontIcon icon="fas fa-folder-open"/>`utils` directory and add the following lines of code:

```ts title="utils/logger.ts"
export const DEBUG = "DEBUG";
export const INFO = "INFO";
export const WARN = "WARN";
export const ERROR = "ERROR";

export type LogLevel = typeof DEBUG | typeof INFO | typeof WARN | typeof ERROR;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function log(level: LogLevel, message: string, ...data: any[]) {
  const timestamp = new Date().toLocaleString();
  const prefix = `[${timestamp}] [${level}]`;

  switch (level) {
    case ERROR:
      console.error(prefix, message, ...data);
      break;
    case WARN:
      console.warn(prefix, message, ...data);
      break;
    default:
      console.log(prefix, message, ...data);
  }
}
```

This is already looking great. Why not write a small environment variables validator? Run this during the initial program startup, and if something goes wrong, the application will exit with clear logs so users know if any environment variables are missing.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`env-validator.ts` in the <FontIcon icon="fas fa-folder-open"/>`utils` directory and add the following lines of code:

```ts :collapsed-lines title="utils/env-validator.ts"
import { log, ERROR } from "./logger.js";

export const OPENAI_API_KEY = "OPENAI_API_KEY";

export const DISCORD_BOT_TOKEN = "DISCORD_BOT_TOKEN";
export const DISCORD_BOT_GUILD_ID = "DISCORD_BOT_GUILD_ID";
export const DISCORD_BOT_CLIENT_ID = "DISCORD_BOT_CLIENT_ID";

export const COMPOSIO_API_KEY = "COMPOSIO_API_KEY";

export const validateEnvVars = (requiredEnvVars: string[]): void => {
  const missingVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    log(
      ERROR,
      "missing required environment variables. please create a .env file and add the following:",
    );
    missingVars.forEach((envVar) => console.error(`- ${envVar}`));
    process.exit(1);
  }
};
```

Now, let's also define the type of data you'll be working with:

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`types.ts` inside the <FontIcon icon="fas fa-folder-open"/>`types` directory and add the following lines of code:

```ts :collapsed-lines title="types/types.ts"
export const QUESTION = "QUESTION";
export const HELP = "HELP";
export const SUPPORT = "SUPPORT";
export const OTHER = "OTHER";
export const TOOL_CALL_REQUEST = "TOOL_CALL_REQUEST";

export type FinalAction =
  | { type: "REPLY"; content: string }
  | { type: "REPLY_IN_THREAD"; content: string }
  | {
      type: "CREATE_EMBED";
      title: string;
      description: string;
      roleToPing?: string;
    };

export type MessageChoice =
  | typeof SUPPORT
  | typeof OTHER
  | typeof TOOL_CALL_REQUEST;

export type SupportTicketType = typeof QUESTION | typeof HELP;

export type Message = {
  author: string;
  content: string;
};

export type SupportTicketQuestion = {
  description: string;
  answer: string;
};

export type SupportTicket = {
  type?: SupportTicketType;
  question?: SupportTicketQuestion;
};

export type ToolCallRequestAction = {
  // actionLog is not intended to be shown to the end-user.
  // This is solely for logging purpose.
  actionLog: string;
  status: "success" | "failed" | "acknowledged";
};
```

The types are pretty self-explanatory, but here’s a quick overview.

`Message` holds the user's input and author. Each message can be marked as support, a tool call request, or just other, like spam or small talk.

Support messages are further labeled as either help or a question using `SupportTicketType`.

The graph returns a `FinalAction`, which can be a direct reply, a reply in a thread, or an embed. If it's `CREATE_EMBED` and has `roleToPing` set, it denotes support help, so we can ping the mod.

For tool-based responses, `ToolCallRequestAction` stores the status and an internal log used for debugging.

Now, you need one last helper function to use in your nodes to extract the response from the LLM. Create a new file named <FontIcon icon="iconfont icon-typescript"/>`helpers.ts` and add the following code:

```ts title="utils/helpers.ts"
import type { AIMessage } from "@langchain/core/messages";

export function extractStringFromAIMessage(
  message: AIMessage,
  fallback: string = "No valid response generated by the LLM.",
): string {
  if (typeof message.content === "string") {
    return message.content;
  }

  if (Array.isArray(message.content)) {
    const textContent = message.content
      .map((item) => (typeof item === "string" ? item : ""))
      .join(" ");
    return textContent.trim() || fallback;
  }

  return fallback;
}
```

You're all set for now with these helper functions in place. Now, you can start coding the logic.

### Implement LangGraph Workflow

Now that you have the types defined, structure your graph and connect it with some edges.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`graph.ts` inside the <FontIcon icon="fas fa-folder-open"/>`src` directory and add the following lines of code:

```ts :collapsed-lines title="src/graph.ts"
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import {
  type FinalAction,
  type ToolCallRequestAction,
  type Message,
  type MessageChoice,
  type SupportTicket,
} from "../types/types.js";
import {
  processToolCall,
  processMessage,
  processOther,
  processSupport,
  processSupportHelp,
  processSupportQuestion,
} from "./nodes.js";
import { processMessageEdges, processSupportEdges } from "./edges.js";

const state = Annotation.Root({
  message: Annotation<Message>(),
  previousMessages: Annotation<Message[]>(),
  messageChoice: Annotation<MessageChoice>(),
  supportTicket: Annotation<SupportTicket>(),
  toolCallRequest: Annotation<ToolCallRequestAction>(),
  finalAction: Annotation<FinalAction>(),
});

export type State = typeof state.State;
export type Update = typeof state.Update;

export function initializeGraph() {
  const workflow = new StateGraph(state);

  workflow
    .addNode("process-message", processMessage)
    .addNode("process-support", processSupport)
    .addNode("process-other", processOther)

    .addNode("process-support-question", processSupportQuestion)
    .addNode("process-support-help", processSupportHelp)
    .addNode("process-tool-call", processToolCall)

    // Edges setup starts here....
    .addEdge(START, "process-message")

    .addConditionalEdges("process-message", processMessageEdges)
    .addConditionalEdges("process-support", processSupportEdges)

    .addEdge("process-other", END)
    .addEdge("process-support-question", END)
    .addEdge("process-support-help", END)
    .addEdge("process-tool-call", END);

  const graph = workflow.compile();

  // To get the graph in png
  // getGraph() is deprecated though
  // Bun.write("graph/graph.png", await graph.getGraph().drawMermaidPng());

  return graph;
}
```

The `initializeGraph` function, as the name suggests, returns the graph you can use to execute the workflow.

The `process-message` node is the starting point of the graph. It takes in the user’s message, processes it, and routes it to the appropriate next node: `process-support`, `process-tool-call`, or `process-other`.

The `process-support` node further classifies the support message and decides whether it should go to `process-support-help` or `process-support-question`.

The `process-tool-call` node handles messages when the user tries to trigger some kind of tool or action.

The `process-other` node handles everything that doesn’t fall into the support or tool call categories. These are general or fallback responses.

To help you visualize how things will shape up, here’s how the graph looks with all the different nodes (yet to work on!):

![LangGraph nodes for the Discord bot workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1750327093884/fa8e6b4e-ca61-4900-9b3b-7b3a2863c296.png)

To wire everything together, you need to define edges between nodes, including conditional edges that dynamically decide the next step based on the state.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`edges.ts` inside the <FontIcon icon="fas fa-folder-open"/>`src` directory and add the following lines of code:

```ts :collapsed-lines title="src/edges.ts"
import { END } from "@langchain/langgraph";
import { type State } from "./graph.js";
import { QUESTION, OTHER, SUPPORT, TOOL_CALL_REQUEST } from "../types/types.js";
import { log, WARN } from "../utils/logger.js";

export const processMessageEdges = (
  state: State,
): "process-support" | "process-other" | "process-tool-call" | "__end__" => {
  if (!state.messageChoice) {
    log(WARN, "state.messageChoice is undefined. Returning...");
    return END;
  }

  switch (state.messageChoice) {
    case SUPPORT:
      return "process-support";
    case TOOL_CALL_REQUEST:
      return "process-tool-call";
    case OTHER:
      return "process-other";
    default:
      log(WARN, "unknown message choice. Returning...");
      return END;
  }
};

export const processSupportEdges = (
  state: State,
): "process-support-question" | "process-support-help" | "__end__" => {
  if (!state.supportTicket?.type) {
    log(WARN, "state.supportTicket.type is undefined. Returning...");
    return END;
  }

  return state.supportTicket.type === QUESTION
    ? "process-support-question"
    : "process-support-help";
};
```

These are the edges that connect different nodes in your application. They direct the flow in your graph.

Things are really shaping up – so let’s finish the core logic by implementing all the nodes for your application.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`nodes.ts` inside the <FontIcon icon="fas fa-folder-open"/>`src` directory and add the following lines of code:

```ts :collapsed-lines title="src/nodes.ts"
import { type State, type Update } from "./graph.js";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import {
  HELP,
  TOOL_CALL_REQUEST,
  OTHER,
  QUESTION,
  SUPPORT,
} from "../types/types.js";
import { extractStringFromAIMessage } from "../utils/helpers.js";
import { OpenAIToolSet } from "composio-core";
import type { ChatCompletionMessageToolCall } from "openai/resources/chat/completions.mjs";
import { v4 as uuidv4 } from "uuid";
import { DEBUG, ERROR, INFO, log, WARN } from "../utils/logger.js";
import {
  SystemMessage,
  HumanMessage,
  ToolMessage,
  BaseMessage,
} from "@langchain/core/messages";

// feel free to use any model. Here I'm going with gpt-4o-mini
const model = "gpt-4o-mini";

const toolset = new OpenAIToolSet();
const llm = new ChatOpenAI({
  model,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
});

export const processMessage = async (state: State): Promise<Update> => {
  log(DEBUG, "message in process message:", state.message);

  const llm = new ChatOpenAI({
    model,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });

  const structuredLlm = llm.withStructuredOutput(
    z.object({
      type: z.enum([SUPPORT, OTHER, TOOL_CALL_REQUEST]).describe(`
Categorize the user's message:
- ${SUPPORT}: Technical support, help with problems, or questions about AI.
- ${TOOL_CALL_REQUEST}: User asks the bot to perform tool action (e.g., "send an email", "summarize chat", "summarize google sheets").
- ${OTHER}: General conversation, spam, or off-topic messages.
`),
    }),
  );

  const res = await structuredLlm.invoke([
    [
      "system",
      `You are an expert message analyzer AI. You need to categorize the message into
one of these categories:

- ${SUPPORT}: If the message asks for technical support, help with a problem, or questions about AIs and LLMs.
- ${TOOL_CALL_REQUEST}: If the message is a direct command or request for the bot to perform an action using external tools/services. Examples: "Summarize a document or Google Sheet", "Summarize the last hour of chat", "Send an email to devteam about this bug", "Create a Trello card for this feature request". Prioritize this if the user is asking the bot to *do* something beyond just answering.
- ${OTHER}: For general chit-chat, spam, off-topic messages, or anything not fitting ${SUPPORT} or ${TOOL_CALL_REQUEST}.
`,
    ],
    ["human", state.message.content],
  ]);

  return {
    messageChoice: res.type,
  };
};

export const processSupport = async (state: State): Promise<Update> => {
  log(DEBUG, "message in support:", state.message);

  const llm = new ChatOpenAI({
    model,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });

  const structuredLlm = llm.withStructuredOutput(
    z.object({
      type: z.enum([QUESTION, HELP]).describe(`
Type of support needed:
- ${QUESTION}: User asks a specific question seeking information or an answer.
- ${HELP}: User needs broader assistance, guidance, or reports an issue requiring intervention/troubleshooting.
`),
    }),
  );

  const res = await structuredLlm.invoke([
    [
      "system",
      `
You are a support ticket analyzer. Given a support message, categorize it as ${QUESTION} or ${HELP}.
- ${QUESTION}: For specific questions.
- ${HELP}: For requests for assistance, troubleshooting, or problem reports.
`,
    ],
    ["human", state.message.content],
  ]);

  return {
    supportTicket: {
      ...state.supportTicket,
      type: res.type,
    },
  };
};

export const processSupportHelp = async (state: State): Promise<Update> => {
  log(DEBUG, "message in support help:", state.message);

  return {
    supportTicket: {
      ...state.supportTicket,
    },
    finalAction: {
      type: "CREATE_EMBED",
      title: "🚨 Help Needed!",
      description: `A new request for help has been raised by **@${state.message.author}**.\n\n**Query:**\n> ${state.message.content}`,
      roleToPing: process.env.DISCORD_SUPPORT_MOD_ID,
    },
  };
};

export const processSupportQuestion = async (state: State): Promise<Update> => {
  log(DEBUG, "message in support question category:", state.message);

  const llm = new ChatOpenAI({
    model,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });

  const systemPrompt = `
You are a helpful AI assistant specializing in AI, and LLMs. Answer
the user's question concisely and accurately based on general knowledge in
these areas. If the question is outside this scope (e.g., personal advice,
non-technical topics), politely state you cannot answer. User's question:
`;

  const res = await llm.invoke([
    ["system", systemPrompt],
    ["human", state.message.content],
  ]);

  const llmResponse = extractStringFromAIMessage(res);
  return {
    supportTicket: {
      ...state.supportTicket,
      question: {
        description: state.message.content,
        answer: llmResponse,
      },
    },
    finalAction: {
      type: "REPLY",
      content: llmResponse,
    },
  };
};

export const processOther = async (state: State): Promise<Update> => {
  log(DEBUG, "message in other category:", state.message);

  const response =
    "This seems to be a general message. I'm here to help with technical support or perform specific actions if you ask. How can I assist you with those?";

  return {
    finalAction: {
      type: "REPLY_IN_THREAD",
      content: response,
    },
  };
};
```

There’s not much to explain for these nodes. Each node in the flow functions as a message classifier. It spins up a Chat LLM instance and uses structured output to ensure the model returns a specific label from a predefined set like `QUESTION` or `HELP` for support messages. The system prompt clearly defines what each label means, and your user message is passed in for classification.

You’re almost there. But there’s one piece missing. Can you spot it?

The `process-tool-call` node that’s supposed to handle the workflow when the user asks to use a tool. This is a big piece of the workflow.

It’s a bit longer, so I’ll explain it separately.

Modify the above <FontIcon icon="iconfont icon-typescript"/>`nodes.ts` file to add the missing node:

```ts :collapsed-lines title="src/nodes.ts"

// Rest of the code...
export const processToolCall = async (state: State): Promise<Update> => {
  log(DEBUG, "message in tool call request category:", state.message);

  const structuredOutputType = z.object({
    service: z
      .string()
      .describe("The target service (e.g., 'email', 'discord')."),
    task: z
      .string()
      .describe(
        "A concise description of the task (e.g., 'send email to X', 'summarize recent chat', 'create task Y').",
      ),
    details: z
      .string()
      .optional()
      .describe(
        "Any specific details or parameters extracted from the message relevant to the task.",
      ),
  });

  const structuredLlm = llm.withStructuredOutput(structuredOutputType);

  let parsedActionDetails: z.infer<typeof structuredOutputType> = {
    service: "unknown",
    task: "perform a requested action",
  };

  try {
    const res = await structuredLlm.invoke([
      [
        "system",
        `Parse the user's request to identify an action. Extract the target service, a description of the task, and any relevant details or parameters.
      Examples:
      - "Remind me to check emails at 5 PM": service: calendar/reminder, task: set reminder, details: check emails at 5 PM
      - "Send a summary of this conversation to #general channel": service: discord, task: send summary to channel, details: channel #general
      - "Create a bug report for 'login fails on mobile'": service: project_manager, task: create bug report, details: title 'login fails on mobile'`,
      ],
      ["human", state.message.content],
    ]);

    parsedActionDetails = res;
    log(INFO, "initial parsing action details:", parsedActionDetails);
  } catch (error) {
    log(ERROR, "initial parsing error:", error);
    return {
      toolCallRequest: {
        actionLog: `Failed to parse user request: ${state.message.content}`,
        status: "failed",
      },
      finalAction: {
        type: "REPLY_IN_THREAD",
        content:
          "I'm sorry, I had trouble understanding that action. Could you please rephrase it?",
      },
    };
  }

  try {
    log(INFO, "fetching composio tools");
    const tools = await toolset.getTools({
      apps: ["GOOGLESHEETS"],
    });

    log(INFO, `fetched ${tools.length} tools. Errors if > 128 for OpenAI:`);

    if (tools.length === 0) {
      log(WARN, "no tools fetched from Composio. skipping...");
      return {
        toolCallRequest: {
          actionLog: `Service: ${parsedActionDetails.service}, Task: ${parsedActionDetails.task}. No composio tools found`,
          status: "failed",
        },
        finalAction: {
          type: "REPLY_IN_THREAD",
          content: "Couldn't find any tools to perform your action.",
        },
      };
    }

    log(DEBUG, "starting iterative tool execution loop");

    const conversationHistory: BaseMessage[] = [
      new SystemMessage(
        "You are a helpful assistant that performs tool calls. Your task is to understand the user's request and use the available tools to fulfill the request completely. You can use multiple tools in sequence to accomplish complex tasks. Always provide a brief, conversational summary of what you accomplished after using tools.",
      ),
      new HumanMessage(state.message.content),
    ];

    let totalToolsUsed = 0;
    let finalResponse: string | null = null;

    const maxIterations = 5;
    let iteration = 0;

    while (iteration < maxIterations) {
      iteration++;
      log(
        DEBUG,
        `Iteration ${iteration}: calling LLM with ${tools.length} tools`,
      );

      const llmResponse = await llm.invoke(conversationHistory, {
        tools: tools,
      });

      log(DEBUG, `Iteration ${iteration} LLM response:`, llmResponse);

      const toolCalls = llmResponse.tool_calls;

      if ((!toolCalls || toolCalls.length === 0) && llmResponse.content) {
        finalResponse =
          typeof llmResponse.content === "string"
            ? llmResponse.content
            : JSON.stringify(llmResponse.content);
        log(
          INFO,
          `Final response received after ${iteration} iterations:`,
          finalResponse,
        );
        break;
      }

      if (toolCalls && toolCalls.length > 0) {
        log(
          INFO,
          `Iteration ${iteration}: executing ${toolCalls.length} tool(s)`,
        );
        totalToolsUsed += toolCalls.length;

        conversationHistory.push(llmResponse);

        for (const toolCall of toolCalls) {
          log(
            INFO,
            `Executing tool: ${toolCall.name} with args:`,
            toolCall.args,
          );

          const composioCompatibleToolCall: ChatCompletionMessageToolCall = {
            id: toolCall.id || uuidv4(),
            type: "function",
            function: {
              name: toolCall.name,
              arguments: JSON.stringify(toolCall.args),
            },
          };

          let toolOutputContent: string;
          try {
            const executionResult = await toolset.executeToolCall(
              composioCompatibleToolCall,
            );
            log(
              INFO,
              `Tool ${toolCall.name} execution result:`,
              executionResult,
            );
            toolOutputContent = JSON.stringify(executionResult);
          } catch (toolError) {
            log(ERROR, `Tool ${toolCall.name} execution error:`, toolError);
            const errorMessage =
              toolError instanceof Error
                ? toolError.message
                : String(toolError);

            toolOutputContent = `Error: ${errorMessage}`;
          }

          conversationHistory.push(
            new ToolMessage({
              content: toolOutputContent,
              tool_call_id: toolCall.id || uuidv4(),
            }),
          );
        }

        continue;
      }

      log(
        WARN,
        `Iteration ${iteration}: LLM provided no tool calls or content`,
      );
      break;
    }

    let userFriendlyResponse: string;

    if (totalToolsUsed > 0) {
      log(DEBUG, "Generating user-friendly summary using LLM");

      try {
        const summaryResponse = await llm.invoke([
          new SystemMessage(
            "You are tasked with creating a brief, friendly summary for a Discord user about what actions were just completed. Keep it conversational, under 2-3 sentences, and focus on what was accomplished rather than technical details. Start with phrases like 'Done!', 'Successfully completed', 'All set!', etc.",
          ),
          new HumanMessage(
            `The user requested: "${state.message.content}"

I used ${totalToolsUsed} tools across ${iteration} iterations to complete their request. ${finalResponse ? `My final response was: ${finalResponse}` : "The task was completed successfully."}

Generate a brief, friendly summary of what was accomplished.`,
          ),
        ]);

        userFriendlyResponse =
          typeof summaryResponse.content === "string"
            ? summaryResponse.content
            : `Done! I've completed your request using ${totalToolsUsed} action${totalToolsUsed > 1 ? "s" : ""}.`;

        log(INFO, "Generated user-friendly summary:", userFriendlyResponse);
      } catch (summaryError) {
        log(ERROR, "Failed to generate summary:", summaryError);
        userFriendlyResponse = `All set! I've completed your request using ${totalToolsUsed} action${totalToolsUsed > 1 ? "s" : ""}.`;
      }
    } else {
      userFriendlyResponse =
        finalResponse ||
        `I understood your request about '${parsedActionDetails.task}' but couldn't find the right tools to complete it.`;
    }

    const actionLog = `Service: ${parsedActionDetails.service}, Task: ${parsedActionDetails.task}. Used ${totalToolsUsed} tools across ${iteration} iterations.`;

    return {
      toolCallRequest: {
        actionLog,
        status: totalToolsUsed > 0 ? "success" : "acknowledged",
      },
      finalAction: {
        type: "REPLY_IN_THREAD",
        content: userFriendlyResponse,
      },
    };
  } catch (error) {
    log(ERROR, "processing tool call with Composio:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      toolCallRequest: {
        actionLog: `Error during tool call (Service: ${parsedActionDetails.service}, Task: ${parsedActionDetails.task}). Error: ${errorMessage}`,
        status: "failed",
      },
      finalAction: {
        type: "REPLY_IN_THREAD",
        content: "Sorry, I encountered an error while processing your request.",
      },
    };
  }
};
```

The part up until the first try-catch block is the same. Up until then, you're figuring out the tool the user is trying to call. Now comes the juicy part: actually handling tool calls.

At this point, you need to fetch the tools from Composio. Here, I’m just passing in Google Sheets as the option for demo purposes, but you could use literally anything once you authenticate yourself as shown above.

After fetching the tools, you enter a loop where the LLM can use them. It reviews the conversation history and decides which tools to call. You execute these calls, feed the results back, and repeat for up to 5 iterations or until the LLM gives a final answer.

This loop runs up to 5 times as a safeguard so the LLM doesn’t get stuck in an endless back-and-forth.

If tools were used, you ask the LLM to write a friendly summary for the user instead of dumping the raw JSON response. If no tools worked or none matched, just let the user know you couldn’t perform the action.

Now with that, you’re done with the difficult part (I mean, it was pretty easy though, right?). From here on, you just need to set up and work with the Discord API using Discord.js.

### Set Up Discord.js Client

In this application, you’re using slash commands. To use slash commands in Discord, you need to register them first. You can do this manually, but why not automate it as well? 😉

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`slash-deploy.ts` inside the <FontIcon icon="fas fa-folder-open"/>`utils` directory and add the following lines of code:

```ts :collapsed-lines title="utils/slash-deploy.ts"
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { log, INFO, ERROR } from "./logger.js";
import {
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_GUILD_ID,
  OPENAI_API_KEY,
  DISCORD_BOT_CLIENT_ID,
  validateEnvVars,
} from "./env-validator.js";

dotenv.config();

const requiredEnvVars = [
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_GUILD_ID,
  DISCORD_BOT_CLIENT_ID,
  OPENAI_API_KEY,
];
validateEnvVars(requiredEnvVars);

const commands = [
  {
    name: "ask",
    description: "Ask the AI assistant a question or give it a command.",
    options: [
      {
        name: "prompt",
        type: 3,
        description: "Your question or command for the bot",
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN!,
);

(async () => {
  try {
    log(INFO, "deploying slash(/) commands");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_BOT_CLIENT_ID!,
        process.env.DISCORD_BOT_GUILD_ID!,
      ),
      {
        body: commands,
      },
    );

    log(INFO, "slash(/) commands deployed");
  } catch (error) {
    log(ERROR, "deploying slash(/) commands:", error);
  }
})();
```

See your `validateEnvVars` function in action? Here, you’re specifying the environment variables that must be set before running the program. If any are missing and you try to run the program, you’ll get an error.

![Command failed output for deploying slash command to Discord](https://cdn.hashnode.com/res/hashnode/image/upload/v1750340614800/ce0b37bc-647c-4b94-9099-2e396b0ffa93.png)

The way you deploy the slash commands to Discord is using the `REST` API provided by <FontIcon icon="fa-brands fa-js"/>`discord.js`, specifically by calling `rest.put` with your command data and target guild.

Now, simply run the `commands:deploy` bun script and you should have `/ask` registered as a slash command in your Discord.

![2d5b22df-cd43-4e54-b985-b64576831316](https://cdn.hashnode.com/res/hashnode/image/upload/v1750340646555/2d5b22df-cd43-4e54-b985-b64576831316.png)

At this point, you should see the `/ask` slash command available in your server. All that’s left is to create the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file, which will be the entry point to your Discord bot.

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`index.ts` inside the <FontIcon icon="fas fa-folder-open"/>`src` directory and add the following lines of code:

```ts :collapsed-lines title="src/index.ts"
import dotenv from "dotenv";
import {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  type Interaction,
} from "discord.js";
import { initializeGraph } from "./graph.js";
import { type Message as ChatMessage } from "../types/types.js";
import { ERROR, INFO, log } from "../utils/logger.js";
import {
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_GUILD_ID,
  OPENAI_API_KEY,
  validateEnvVars,
  DISCORD_BOT_CLIENT_ID,
  COMPOSIO_API_KEY,
} from "../utils/env-validator.js";

dotenv.config();

const requiredEnvVars = [
  DISCORD_BOT_CLIENT_ID,
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_GUILD_ID,

  OPENAI_API_KEY,

  COMPOSIO_API_KEY,
];
validateEnvVars(requiredEnvVars);

const graph = initializeGraph();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// use a map to store history per channel to make it work properly with all the
// channels and not for one specific channel.
const channelHistories = new Map<string, ChatMessage[]>();

client.on(Events.ClientReady, async (readyClient) => {
  log(INFO, `logged in as ${readyClient.user.tag}. ready to process commands!`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "ask") return;

  const userPrompt = interaction.options.getString("prompt", true);
  const user = interaction.user;
  const channelId = interaction.channelId;

  if (!channelHistories.has(channelId)) channelHistories.set(channelId, []);

  const messageHistory = channelHistories.get(channelId)!;

  const currentUserMessage: ChatMessage = {
    author: user.username,
    content: userPrompt,
  };

  const graphInput = {
    message: currentUserMessage,
    previousMessages: [...messageHistory],
  };

  messageHistory.push(currentUserMessage);
  if (messageHistory.length > 20) messageHistory.shift();

  try {
    await interaction.reply({
      content: "Hmm... processing your request! 🐀",
    });

    const finalState = await graph.invoke(graphInput);

    if (!finalState.finalAction) {
      log(ERROR, "no final action found");
      await interaction.editReply({
        content: "I'm sorry, I couldn't process your request.",
      });
      return;
    }

    const userPing = `<@${user.id}>`;
    const action = finalState.finalAction;

    const quotedPrompt = `🗣️ "${userPrompt}"`;

    switch (action.type) {
      case "REPLY":
        await interaction.editReply({
          content: `${userPing}\n\n${quotedPrompt}\n\n${action.content}`,
        });
        break;

      case "REPLY_IN_THREAD":
        if (!interaction.channel || !("threads" in interaction.channel)) {
          await interaction.editReply({
            content: "Cannot create a thread in this channel",
          });
          return;
        }

        try {
          const thread = await interaction.channel.threads.create({
            name: `Action: ${userPrompt.substring(0, 50)}...`,
            autoArchiveDuration: 60,
          });

          await thread.send(
            `${userPing}\n\n${quotedPrompt}\n\n${action.content}`,
          );
          await interaction.editReply({
            content: `I've created a thread for you: ${thread.url}`,
          });
        } catch (threadError) {
          log(ERROR, "failed to create or reply in thread:", threadError);
          await interaction.editReply({
            content: `${userPing}\n\n${quotedPrompt}\n\nI tried to create a thread but failed. Here is your response:\n\n${action.content}`,
          });
        }
        break;

      case "CREATE_EMBED": {
        const embed = new EmbedBuilder()
          .setColor(0xffa500)
          .setTitle(action.title)
          .setDescription(action.description)
          .setTimestamp()
          .setFooter({ text: "Support System" });

        const rolePing = action.roleToPing ? `<@${action.roleToPing}>` : "";

        await interaction.editReply({
          content: `${userPing} ${rolePing}`,
          embeds: [embed],
        });
        break;
      }
    }
  } catch (error) {
    log(ERROR, "generating AI response or processing graph:", error);
    const errorMessage =
      "sorry, I encountered an error while processing your request.";
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: errorMessage, ephemeral: true });
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  }
});

const token = process.env.DISCORD_BOT_TOKEN!;
client.login(token);
```

At the core of our bot is the `Client` object from <FontIcon icon="fa-brands fa-js"/>`discord.js`. This represents your bot and handles everything from connecting to Discord’s API to listening for events like user messages or interactions.

What’s with that intent? Discord uses intents as a way for bots to declare what kind of data they want access to. In our case:

- `Guilds` lets the bot connect to servers
- `GuildMessages` allows it to see messages
- `MessageContent` gives access to the actual content of messages

These are quite standard, and there are many more based on different use cases. You can always check them all out [<FontIcon icon="fas fa-globe"/>here](https://discordjs.guide/popular-topics/intents.html#privileged-intents).

You also keep a `Map` to store per-channel message history so the bot can respond with context across multiple channels:

```ts
const channelHistories = new Map<string, ChatMessage[]>();
```

Discord.js provides access to a few events that you can listen to. When you work with slash commands, it registers an `Events.InteractionCreate`, which is what you’re listening to.

With every `/ask` command, you take the user's prompt and any previous messages. If `channelHistories` does not have a key with that specific channelId, meaning it's being used for the first time, you initialize it with an empty array and feed them into the AI state.

```ts
const finalState = await graph.invoke({
  message: currentUserMessage,
  previousMessages: [...messageHistory],
});
```

Depending on what the graph `finalAction.type` returns, you either:

- reply directly,
- create a thread and respond there,
- or send an embed (for support-type replies).

If a thread can’t be created, you fall back to replying in the main channel. Message history is capped at 20 to keep things lightweight.

Note that we’re not really using `previousMessages` much at the moment in the application, but I’ve prepared everything you need to handle querying previous conversations. You could easily create a new LangGraph node that queries or reasons over history if the bot needs to reference past conversations. (Take this as your challenge!)

This project should give you a basic idea of how you can use LangGraph + Composio to build a somewhat useful bot that can already handle decent stuff. There’s a lot more you could improve. I’ll leave that up to you. ✌️

Here’s a quick demo of what we’ve built so far:

<VidStack src="youtube/aeQKN0nMGRg" />

---

## Wrapping Up

By now you should have a good idea of how LangGraph works and also how to power the bot with integrations using Composio.

This is just a fraction of what you can do. Try adding more features and more integration support to the bot to fit your workflow. This can come in really handy.

If you got lost somewhere while coding along, you can find the source code [here (<FontIcon icon="iconfont icon-github"/>`aeQKN0nMGRg`)](https://github.com/shricodev/discord-bot-langgraph-composio).

So, that is it for this article. Thank you so much for reading! See you next time. 🫡

Love to build cool stuff like this? I regularly build such stuff every few weeks. Feel free to reach out to me here:

- GitHub: [<FontIcon icon="iconfont icon-github"/>`shricodev`](http://github.com/shricodev)
- Portfolio: [<FontIcon icon="fas fa-globe"/>techwithshrijal.com](http://techwithshrijal.com)
- LinkedIn: [<FontIcon icon="fa-brands fa-linkedin"/>`iamshrijal`](http://linkedin.com/in/iamshrijal)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a LangGraph and Composio-Powered Discord Bot",
  "desc": "With the rise of AI tools over the past couple years, most of us are learning how to use them in our projects. And in this article, I’ll teach you how to build a quick Discord bot with LangGraph and Composio. You’ll use LangGraph nodes to build a bra...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-langgraph-composio-powered-discord-bot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
