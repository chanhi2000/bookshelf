---
lang: en-US
title: "How to Build RAG AI Agents with TypeScript"
description: "Article(s) > How to Build RAG AI Agents with TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - AI
  - LLM
  - OpenAI
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
  - openai
  - chatgpt
  - chat-gpt
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build RAG AI Agents with TypeScript"
    - property: og:description
      content: "How to Build RAG AI Agents with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-rag-ai-agents-with-typescript.html
prev: /programming/ts/articles/README.md
date: 2025-04-16
isOriginal: false
author:
  - name: Maham Codes
    url : https://freecodecamp.org/news/author/MahamCodes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744814746615/72626297-def9-466a-8c1a-2cdb1b411300.png
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
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build RAG AI Agents with TypeScript"
  desc="The most powerful AI systems don’t just generate – they also retrieve, reason, and respond with context. Retrieval-Augmented Generation (RAG) is how we get there. It combines the strengths of search and generation to build more accurate, reliable, an..."
  url="https://freecodecamp.org/news/how-to-build-rag-ai-agents-with-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744814746615/72626297-def9-466a-8c1a-2cdb1b411300.png"/>

The most powerful AI systems don’t just generate – they also retrieve, reason, and respond with context. Retrieval-Augmented Generation (RAG) is how we get there. It combines the strengths of search and generation to build more accurate, reliable, and context-aware AI systems.

In this guide, you'll build a RAG-based AI agent in TypeScript using [<FontIcon icon="fas fa-globe"/>Langbase SDK](https://langbase.com/docs/sdk). You'll plug in your own data as memory, use any embedding model, retrieve relevant context, and call an LLM to generate a precise response.

By the end of this tutorial, you'll have a working RAG system that:

- Stores and retrieves documents with semantic memory
- Uses custom embeddings for vector search
- Handles user queries with relevant context
- Generates responses via OpenAI, Anthropic, or any LLM

::: note Prerequisites

Before we begin creating a RAG-based AI agent, you’ll need to have some tools ready to go.

In this tutorial, I’ll be using the following tech stack:

- [<FontIcon icon="fas fa-globe"/>Langbase](http://langbase.com/) – the platform to build and deploy your serverless AI agents.
- [<FontIcon icon="fas fa-globe"/>Langbase SDK](https://langbase.com/docs/sdk) – a TypeScript AI SDK, designed to work with JavaScript, TypeScript, Node.js, Next.js, React, and the like.
- [<FontIcon icon="iconfont icon-openai"/>OpenAI](https://openai.com/) – to get the LLM key for the preferred model.

:::

You’ll also need to:

- Sign up on [<FontIcon icon="fas fa-globe"/>Langbase](https://langbase.com/signup) to get access to the API key.
- Sign up on [<FontIcon icon="iconfont icon-openai"/>OpenAI](https://platform.openai.com/signup) to generate the LLM key for the model you want to use (for this demo, I’ll be using the `openai:text-embedding-3-large` model). You can generate the key [<FontIcon icon="iconfont icon-openai"/>here](https://platform.openai.com/api-keys).

---

## What is Agentic RAG?

Retrieval augmented generation (RAG) is an architecture for optimizing the performance of an artificial intelligence (AI) model by connecting it with external knowledge bases. RAG helps large language models (LLMs) deliver more relevant responses at a higher quality.

When we use AI agents to facilitate RAG, it becomes **Agentic RAG.** Agentic RAG systems add AI agents to the RAG pipeline to increase adaptability and accuracy. Compared to traditional RAG systems, agentic RAG allows LLMs to conduct information retrieval from multiple sources and handle more complex workflows.

Here’s the tabular comparison of RAG vs Agentic RAG:

| **Feature**  | RAG | Agentic RAG |
| ---: | :--- | :--- |
| Task Complexity | Simple query tasks – no complex decision-making | Handles complex, multi-step tasks using multiple tools and agents |
| Decision-Making | Limited – no autonomy | Agents decide what to retrieve, how to grade, reason, reflect, and generate |
| Multi-Step Reasoning | Single-step queries and responses only | Supports multi-step reasoning with retrieval, grading, filtering, and evaluation |
| Key Role | LLM + external data for answers | Adds intelligent agents for retrieval, generation, critique, and orchestration |
| Real-Time Data Retrieval | Not supported | Built for real-time retrieval and dynamic integration |
| Retrieval Integration | Static, pre-defined vector databases | Agents dynamically retrieve from diverse and flexible sources |
| Context Awareness | Static context – no runtime adaptability | High – agents adapt to queries, pull relevant context, and fetch live data if needed |

---

## Langbase SDK

The [<FontIcon icon="fas fa-globe"/>Langbase SDK](https://langbase.com/docs/sdk) makes it easy to build powerful AI tools using TypeScript. It gives you everything you need to work with any LLM, connect your own embedding models, manage document memory, and build AI agents that can reason and respond.

The SDK is designed to work with Node.js, Next.js, React, or any modern JavaScript stack. You can use it to upload documents, create semantic memory, and run AI workflows (called Pipe agents) with just a few lines of code.

[globe  Langbase](http://langbase.com) is an API-first AI platform. Its TypeScript SDK smooths out the experience, making it easy to get started without dealing with infrastructure. Just drop in your API key, write your logic, and you're good to go.

Now that you know about Langbase SDK, let’s start building the RAG agent.

---

## Step 1: Setup Your Project

We’ll be building a basic Node.js app in TypeScript that uses the Langbase SDK to create an agentic RAG system. For that, create a new directory for your project and navigate to it.

```sh
mkdir agentic-rag && cd agentic-rag
```

Then initialize a Node.js project and create different TypeScript files by running this command in your terminal:

```sh
npm init -y && touch index.ts agents.ts create-memory.ts upload-docs.ts create-pipe.ts
```

Here’s a breakdown of what each file will do in the project:

- <FontIcon icon="iconfont icon-typescript"/>`index.ts`: This is typically the entry point of a TypeScript project. It orchestrates agent creation, memory setup, and document upload.
- <FontIcon icon="iconfont icon-typescript"/>`agents.ts`: This file handles AI agent creation and configuration.
- <FontIcon icon="iconfont icon-typescript"/>`create-memory.ts`: This sets up Langbase Memory (RAG) for storing and retrieving context.
- <FontIcon icon="iconfont icon-typescript"/>`upload-docs.ts`: This file will upload documents to Memory so agents can access and use them.
- <FontIcon icon="iconfont icon-typescript"/>`create-pipe.ts`* This file sets up a [<FontIcon icon="fas fa-globe"/>Langbase Pipe agent](https://langbase.com/docs/pipe/quickstart) which is a serverless AI agent with unified APIs for every LLM.

After this, we will be using the Langbase SDK to create RAG agents and <FontIcon icon="fa-brands fa-npm"/>`dotenv` to manage environment variables. So, let's install these dependencies.

```sh
npm i langbase dotenv
```

---

## Step 2: Get Langbase API Key

Every request you send to Langbase needs an API key. You can generate API keys from the [<FontIcon icon="fas fa-globe"/>Langbase studio](https://studio.langbase.com/) by following these steps:

1. Switch to your user or org account.
2. From the sidebar, click on the `Settings` menu.
3. In the developer settings section, click on the `Langbase API keys` link.
4. From here you can create a new API key or manage existing ones.

For more details, check out the [<FontIcon icon="fas fa-globe"/>Langbase API keys](https://langbase.com/docs/api-reference/api-keys) documentation.

After generating the API key, create an <FontIcon icon="fas fa-file-lines"/>`.env` file in the root of your project and add your Langbase API key in it:

```sh title=".env"
LANGBASE_API_KEY=xxxxxxxxx
```

Replace xxxxxxxxx with your Langbase API key.

---

## Step 3: Add LLM API Keys

Once you have the Langbase API key, you’ll need the LLM key as well to run the RAG agent. If you have set up LLM API keys in your profile, the AI memory and agent pipe will automatically use them. Otherwise, navigate to the LLM API keys page and add keys for different providers like OpenAI, Anthropic, and so on.

Follow these steps to add the LLM keys:

1. Add LLM API keys in your account using [<FontIcon icon="fas fa-globe"/>Langbase studio](https://studio.langbase.com/)
2. Switch to your user or org account.
3. From the sidebar, click on the `Settings` menu.
4. In the developer settings section, click on the `LLM API keys` link.
5. From here you can add LLM API keys for different providers like OpenAI, TogetherAI, Anthropic, and so on.

---

## Step 4: Create an Agentic AI Memory

Let’s now use the Langbase SDK to create an AI memory (Langbase memory agent) where your agent can store and retrieve context.

[<FontIcon icon="fas fa-globe"/>Langbase serverless memory agents](https://langbase.com/docs/memory) (long-term memory solution) are designed to acquire, process, retain, and retrieve information seamlessly. They dynamically attach private data to any LLM, enabling context-aware responses in real time and reducing hallucinations.

These agents combine vector storage, RAG, and internet access to create a powerful managed context search API. You can use them to build smarter, more capable AI applications.

In a RAG setup, memory – when connected directly to a [<FontIcon icon="fas fa-globe"/>Langbase Pipe Agent](https://langbase.com/docs/pipe/quickstart) – becomes a memory agent. This pairing gives the LLM the ability to fetch relevant data and deliver precise, contextually accurate answers – addressing the limitations of LLMs when it comes to handling private data.

To create it, add the following code to <FontIcon icon="iconfont icon-typescript"/>`create-memory.ts` file you created in Step 1:

```ts title="create-memory.ts"
import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    const memory = await langbase.memories.create({
        name: 'knowledge-base',
        description: 'An AI memory for agentic memory workshop',
        embedding_model: 'openai:text-embedding-3-large'
    });

    console.log('AI Memory:', memory);
}

main();
```

Here’s what’s happening in the above code:

- Import the `dotenv` package to load environment variables.
- Import the `Langbase` class from the langbase package.
- Create a new instance of the Langbase class with your API key.
- Use the `memories.create` method to create a new AI memory.
- Set the name and description of the memory.
- Use the `openai:text-embedding-3-large` model for embedding.
- Log the created memory to the console.

After this, let's create the agentic memory by running the <FontIcon icon="iconfont icon-typescript"/>`create-memory.ts` file.

```sh
npx tsx create-memory.ts
```

This will create an AI memory and log the memory details to the console.

---

## Step 5: Add Documents to AI Memory

Now that you’ve created an AI memory agent, the next step is to add documents in it. These documents will serve as the context your agent can reference during interactions.

First, create a docs directory in your project root, and add two sample text files:

- [<FontIcon icon="fas fa-globe"/>`agent-architectures.txt`](https://langbase.com/docs/examples/agent-architectures)
- [<FontIcon icon="fas fa-globe"/>`langbase-faq.txt`](http://langbase.com/docs)

Next, open the <FontIcon icon="iconfont icon-typescript"/>`upload-docs.ts` file created in Step 1 and paste in the following code:

```ts :collapsed-lines title="upload-docs.ts"
import 'dotenv/config';
import { Langbase } from 'langbase';
import { readFile } from 'fs/promises';
import path from 'path';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    const cwd = process.cwd();
    const memoryName = 'knowledge-base';

    // Upload agent architecture document
    const agentArchitecture = await readFile(path.join(cwd, 'docs', 'agent-architectures.txt'));
    const agentResult = await langbase.memories.documents.upload({
        memoryName,
        contentType: 'text/plain',
        documentName: 'agent-architectures.txt',
        document: agentArchitecture,
        meta: { category: 'Examples', topic: 'Agent architecture' },
    });

    console.log(agentResult.ok ? '✓ Agent doc uploaded' : '✗ Agent doc failed');

    // Upload FAQ document
    const langbaseFaq = await readFile(path.join(cwd, 'docs', 'langbase-faq.txt'));
    const faqResult = await langbase.memories.documents.upload({
        memoryName,
        contentType: 'text/plain',
        documentName: 'langbase-faq.txt',
        document: langbaseFaq,
        meta: { category: 'Support', topic: 'Langbase FAQs' },
    });

    console.log(faqResult.ok ? '✓ FAQ doc uploaded' : '✗ FAQ doc failed');
}

main();
```

Let’s break down what’s happening in this code:

- `dotenv/config` is used to load environment variables from your .env file.
- Langbase is imported from the SDK to interact with the API.
- `readFile` from the `fs/promises` module reads each document file asynchronously.
- `path.join()` ensures file paths work across different operating systems.
- A Langbase client instance is created using your API key.
- `memories.documents.upload` is used to upload each `.txt` file to the AI memory.
- Each upload includes metadata like `category` and `topic` to help organize the content.
- Upload success or failure is logged to the console.

This step ensures your AI agent will have actual content to pull from – FAQs, architecture docs, or anything else you upload into memory.

Then, run the <FontIcon icon="iconfont icon-typescript"/>`upload-docs.ts` file to upload the documents to the AI memory by this command in your terminal. This will upload the documents to the AI memory:

```sh
npx tsx upload-docs.ts
```

---

## Step 6: Perform RAG Retrieval

In this step, we’ll perform RAG against a query using the documents we uploaded to AI memory.

Add the following code to your <FontIcon icon="iconfont icon-typescript"/>`agents.ts` file created in Step 1:

```ts title="agents.ts"
import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

export async function runMemoryAgent(query: string) {
    const chunks = await langbase.memories.retrieve({
        query,
        topK: 4,
        memory: [
            {
                name: 'knowledge-base',
            },
        ],
    });

    return chunks;
}
```

Let’s break down what this does:

- Import the `Langbase` class from the Langbase SDK.
- Initialize the Langbase client using your API key from environment variables.
- Define an async function `runMemoryAgent` that takes a query string as input.
- Use `memories.retrieve` to query the memory for the most relevant chunks, retrieving the top 4 results (`topK: 4`) from the memory named "knowledge-base".
- Return the retrieved memory chunks.

Now let's add the following code to the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file created in Step 1 to run the memory agent:

```ts title="index.ts"
import { runMemoryAgent } from './agents';

async function main() {
    const chunks = await runMemoryAgent('What is agent parallelization?');
    console.log('Memory chunk:', chunks);
}

main();
```

This code runs a Langbase memory query for “What is agent parallelization?” It uses `runMemoryAgent` to retrieve the top matching chunks from your AI memory and logs the results. It’s how you fetch relevant knowledge with RAG.

After this, run the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file to perform RAG retrieval against the query by this command in terminal:

```sh
npx tsx index.ts
```

You will see the memory agent output as retrieved memory chunks in the console as follows:

```plaintext :collapsed-lines title="output"
[
  {
    text: '---\n' +
      '\n' +
      '## Agent Parallelization\n' +
      '\n' +
      'Parallelization runs multiple LLM tasks at the same time to improve speed or accuracy. It works by splitting a task into independent parts (sectioning) or generating multiple responses for comparison (voting).\n' +
      '\n' +
      'Voting is a parallelization method where multiple LLM calls generate different responses for the same task. The best result is selected based on agreement, predefined rules, or quality evaluation, improving accuracy and reliability.\n' +
      '\n' +
      "`This code implements an email analysis system that processes incoming emails through multiple parallel AI agents to determine if and how they should be handled. Here's the breakdown:",
    similarity: 0.7146744132041931,
    meta: {
      docName: 'agent-architectures.txt',
      documentName: 'agent-architectures.txt',
      category: 'Examples',
      topic: 'Agent architecture'
    }
  },
  {
    text: 'async function main(inputText: string) {\n' +
      '\ttry {\n' +
      '\t\t// Create pipes first\n' +
      '\t\tawait createPipes();\n' +
      '\n' +
      '\t\t// Step A: Determine which agent to route to\n' +
      '\t\tconst route = await routerAgent(inputText);\n' +
      "\t\tconsole.log('Router decision:', route);\n" +
      '\n' +
      '\t\t// Step B: Call the appropriate agent\n' +
      '\t\tconst agent = agentConfigs[route.agent];\n' +
      '\n' +
      '\t\tconst response = await langbase.pipes.run({\n' +
      '\t\t\tstream: false,\n' +
      '\t\t\tname: agent.name,\n' +
      '\t\t\tmessages: [\n' +
      "\t\t\t\t{ role: 'user', content: `${agent.prompt} ${inputText}` }\n" +
      '\t\t\t]\n' +
      '\t\t});\n' +
      '\n' +
      '\t\t// Final output\n' +
      '\t\tconsole.log(\n' +
      '\t\t\t`Agent: ${agent.name} \\n\\n Response: ${response.completion}`\n' +
      '\t\t);\n' +
      '\t} catch (error) {\n' +
      "\t\tconsole.error('Error in main workflow:', error);\n" +
      '\t}\n' +
      '}\n' +
      '\n' +
      '// Example usage:\n' +
      "const inputText = 'Why days are shorter in winter?';\n" +
      '\n' +
      'main(inputText);\n' +
      '```\n' +
      '\n' +
      '\n' +
      '---\n' +
      '\n' +
      '## Agent Parallelization\n' +
      '\n' +
      'Parallelization runs multiple LLM tasks at the same time to improve speed or accuracy. It works by splitting a task into independent parts (sectioning) or generating multiple responses for comparison (voting).',
    similarity: 0.5911030173301697,
    meta: {
      docName: 'agent-architectures.txt',
      documentName: 'agent-architectures.txt',
      category: 'Examples',
      topic: 'Agent architecture'
    }
  },
  {
    text: "`This code implements a sophisticated task orchestration system with dynamic subtask generation and parallel processing. Here's how it works:\n" +
      '\n' +
      '1. Orchestrator Agent (Planning Phase):\n' +
      '   - Takes a complex task as input\n' +
      '   - Analyzes the task and breaks it down into smaller, manageable subtasks\n' +
      '   - Returns both an analysis and a list of subtasks in JSON format\n' +
      '\n' +
      '2. Worker Agents (Execution Phase):\n' +
      '   - Multiple workers run in parallel using Promise.all()\n' +
      '   - Each worker gets:\n' +
      '     - The original task for context\n' +
      '     - Their specific subtask to complete\n' +
      '   - All workers use Gemini 2.0 Flash model\n' +
      '\n' +
      '3. Synthesizer Agent (Integration Phase):\n' +
      '   - Takes all the worker outputs\n' +
      '   - Combines them into a cohesive final result\n' +
      '   - Ensures the pieces flow together naturally',
    similarity: 0.5393730401992798,
    meta: {
      docName: 'agent-architectures.txt',
      documentName: 'agent-architectures.txt',
      category: 'Examples',
      topic: 'Agent architecture'
    }
  },
  {
    text: "`This code implements an email analysis system that processes incoming emails through multiple parallel AI agents to determine if and how they should be handled. Here's the breakdown:\n" +
      '\n' +
      '1. Three Specialized Agents running in parallel:\n' +
      '   - Sentiment Analysis Agent: Determines if the email tone is positive, negative, or neutral\n' +
      '   - Summary Agent: Creates a concise summary of the email content\n' +
      '   - Decision Maker Agent: Takes the outputs from the other agents and decides:\n' +
      '     - If the email needs a response\n' +
      "     - Whether it's spam\n" +
      '     - Priority level (low, medium, high, urgent)\n' +
      '\n' +
      '2. The workflow:\n' +
      '   - Takes an email input\n' +
      '   - Runs sentiment analysis and summary generation in parallel using Promise.all()\n' +
      '   - Feeds those results to the decision maker agent\n' +
      '   - Outputs a final decision object with response requirements\n' +
      '\n' +
      '3. All agents use Gemini 2.0 Flash model and are structured to return parsed JSON responses',
    similarity: 0.49115753173828125,
    meta: {
      docName: 'agent-architectures.txt',
      documentName: 'agent-architectures.txt',
      category: 'Examples',
      topic: 'Agent architecture'
    }
  }
]
```

---

## Step 7: Create Support Pipe Agent

In this step, we will create a support agent using the Langbase SDK. Go ahead and add the following code to the <FontIcon icon="iconfont icon-typescript"/>`create-pipe.ts` file created in Step 1:

```ts title="create-pipe.ts"
import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    const supportAgent = await langbase.pipes.create({
        name: `ai-support-agent`,
        description: `An AI agent to support users with their queries.`,
        messages: [
            {
                role: `system`,
                content: `You're a helpful AI assistant.
                You will assist users with their queries.
                Always ensure that you provide accurate and to the point information.`,
            },
        ],
    });

    console.log('Support agent:', supportAgent);
}

main();
```

Let's go through the above code:

- Initialize the Langbase SDK with your API key.
- Use the `pipes.create` method to create a new [<FontIcon icon="fas fa-globe"/>pipe agent](https://langbase.com/docs/pipe/quickstart).
- Log the created pipe agent to the console.

Now run the <FontIcon icon="iconfont icon-typescript"/>`create-pipe.ts` file to create the pipe agent by this command in your terminal:

```sh
npx tsx create-pipe.ts
```

This will create a support agent and log the agent details to the console.

---

## Step 8: Generate RAG Responses

Up until now, we’ve created a Langbase memory agent, added documents in it, performed RAG retrieval against a query, and created a support agent using Langbase Pipe agent. The only thing left in creating this complete RAG agent is generating comprehensive responses using LLMs.

To do this, add the following code to the <FontIcon icon="iconfont icon-typescript"/>`agents.ts` file created in Step 1:

```ts :collapsed-lines title="agents.ts"
import 'dotenv/config';
import { Langbase, MemoryRetrieveResponse } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

export async function runAiSupportAgent({
    chunks,
    query,
}: {
    chunks: MemoryRetrieveResponse[];
    query: string;
}) {
    const systemPrompt = await getSystemPrompt(chunks);

    const { completion } = await langbase.pipes.run({
        stream: false,
        name: 'ai-support-agent',
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            {
                role: 'user',
                content: query,
            },
        ],
    });

    return completion;
}

async function getSystemPrompt(chunks: MemoryRetrieveResponse[]) {
    let chunksText = '';
    for (const chunk of chunks) {
        chunksText += chunk.text + '\n';
    }

    const systemPrompt = `
    You're a helpful AI assistant.
    You will assist users with their queries.

    Always ensure that you provide accurate and to the point information.
    Below is some CONTEXT for you to answer the questions. ONLY answer from the CONTEXT. CONTEXT consists of multiple information chunks. Each chunk has a source mentioned at the end.

For each piece of response you provide, cite the source in brackets like so: [1].

At the end of the answer, always list each source with its corresponding number and provide the document name. like so [1] Filename.doc. If there is a URL, make it hyperlink on the name.

 If you don't know the answer, say so. Ask for more context if needed.
    ${chunksText}`;

    return systemPrompt;
}

export async function runMemoryAgent(query: string) {
    const chunks = await langbase.memories.retrieve({
        query,
        topK: 4,
        memory: [
            {
                name: 'knowledge-base',
            },
        ],
    });

    return chunks;
}
```

The above code:

- Creates a function `runAiSupportAgent` that takes chunks and query as input.
- Uses the `pipes.run` method to generate responses using the LLM.
- Creates a function `getSystemPrompt` to generate a system prompt for the LLM.
- Combines the retrieved chunks to create a system prompt.
- Returns the generated completion.

Now, let's run the support agent with AI memory chunks. Add the following code to the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file:

```ts title="index.ts"
import { runMemoryAgent, runAiSupportAgent } from './agents';

async function main() {
    const query = 'What is agent parallelization?';
    const chunks = await runMemoryAgent(query);

    const completion = await runAiSupportAgent({
        chunks,
        query,
    });

    console.log('Completion:', completion);
}

main();
```

This code runs two agents: one to retrieve memory chunks relevant to a query (`runMemoryAgent`), and another (`runAiSupportAgent`) to generate a final answer using those chunks.

Then, run the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file to generate responses using the LLM.

```sh
npx tsx index.ts
```

### The Result

After running the support agent, you’ll see the following output generated in your console:

```md title="output"
Completion: Agent parallelization is a process that runs multiple LLM (Language Model) tasks simultaneously to enhance speed or accuracy. This technique can be implemented in two main ways:

1. **Sectioning**: A task is divided into independent parts that can be processed concurrently.
2. **Voting**: Multiple LLM calls generate different responses for the same task, and the best result is selected based on agreement, predefined rules, or quality evaluation. This approach improves accuracy and reliability by comparing various outputs.

In practice, agent parallelization involves orchestrating multiple specialized agents to handle different aspects of a task, allowing for efficient processing and improved outcomes.

If you need more detailed examples or further clarification, feel free to ask!
```

This is how you can build an agentic RAG system with TypeScript using the Langbase SDK.

Thank you for reading!

::: info Connect with me by 🙌:

- Subscribing to my [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`AIwithMahamCodes`)](https://youtube.com/@AIwithMahamCodes) Channel if you want to learn about AI and agents.
- Subscribing to my free newsletter [<FontIcon icon="fas fa-globe"/>The Agentic Engineer](https://mahamcodes.substack.com/) where I share all the latest AI and agents news/trends/jobs and much more.
- Follow me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`MahamDev`)](https://x.com/MahamDev).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build RAG AI Agents with TypeScript",
  "desc": "The most powerful AI systems don’t just generate – they also retrieve, reason, and respond with context. Retrieval-Augmented Generation (RAG) is how we get there. It combines the strengths of search and generation to build more accurate, reliable, an...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-rag-ai-agents-with-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
