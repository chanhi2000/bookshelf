---
lang: en-US
title: "How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs"
description: "Article(s) > How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs"
icon: fas fa-language
category:
  - AI
  - LLM
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs"
    - property: og:description
      content: "How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-langbase-memory-agents.html
prev: /ai/llm/articles/README.md
date: 2025-01-18
isOriginal: false
author:
  - name: Maham Codes
    url : https://freecodecamp.org/news/author/MahamCodes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737148633610/45e0af50-6026-4953-8e1a-953a7d5b6df6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs"
  desc="It’s 2025, and Large Language Models (LLMs) still can’t access your private data. Ask them something personal, and they’ll either guess or give you the wrong answer. That’s the limitation—they’re trained on public information and don’t have access to..."
  url="https://freecodecamp.org/news/how-to-use-langbase-memory-agents"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737148633610/45e0af50-6026-4953-8e1a-953a7d5b6df6.png"/>

It’s 2025, and Large Language Models (LLMs) still can’t access your private data. Ask them something personal, and they’ll either guess or give you the wrong answer. That’s the limitation—they’re trained on public information and don’t have access to your private context.

Memory agents solve this by securely linking your private data to any LLM in real time. In this tutorial, I’ll walk you through turning an LLM into a conversational AI that chats with your personal documents using [<VPIcon icon="fas fa-globe"/>Langbase](http://langbase.com) memory agents.

---

## What are Memory Agents?

Memory is what makes interactions meaningful. It’s how systems can remember what came before, a key aspect for building truly intelligent AI agents.

Here’s the thing: LLMs might seem human-like, but they don’t have memory built in. They’re **stateless by design**. To make them useful for real-world tasks, you need to add memory. That’s where memory agents step in.

[<VPIcon icon="fas fa-globe"/>Langbase memory agents](https://langbase.com/docs/memory) (long-term memory solution) are designed to **acquire, process, retain, and retrieve** information seamlessly. They dynamically attach private data to any LLM, enabling context-aware responses in real time and reducing hallucinations.

These agents combine vector storage, Retrieval-Augmented Generation (RAG), and internet access to create a powerful managed context search API. Developers can use them to build smarter, more capable AI applications.

In a RAG setup, memory - when connected directly to a [<VPIcon icon="fas fa-globe"/>Langbase Pipe Agent](https://langbase.com/docs/pipe) - becomes a **memory agent**. This pairing gives the LLM the ability to fetch relevant data and deliver precise, contextually accurate answers—addressing the limitations of LLMs when it comes to handling private data.

::: note

Pipe is a serverless AI agent. It has agentic memory and tools. More details [<VPIcon icon="fas fa-globe"/>here](https://langbase.com/docs).

<SiteInfo
  name="Langbase Docs · Serverless AI Developer Platform"
  desc="Langbase documentation for developers. The only Serverless AI developer platform. Learn how to use Langbase to build, deploy, and ship composable hyper-personalized and trusted generative AI agents (agent pipes, memory, tools, and more)."
  url="https://langbase.com/docs/"
  logo="https://langbase.com/docs/favicon.ico"
  preview="https://langbase.com/docs/api/og?title=Langbase.com/docs"/>

:::

Here’s a diagrammatic representation of the entire process:

![Architectural diagram of memory agents workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1736776247313/6d66a33b-bf82-4a8e-96d7-1d8a6382b863.png)

---

## Securing Your Data with Memory Agents

Memory agents prioritize data security by keeping private information isolated and processed locally or within secure environments. The data used to create memory embeddings is not sent to external servers unless explicitly configured, ensuring sensitive information remains protected.

Also, access to the memory system is strictly controlled through API keys and permissions, preventing unauthorized access. This setup not only enhances AI capabilities but also maintains user trust by safeguarding their data.

---

## Use Cases for Memory Agents

Here are some practical applications of these agents:

- **Customer Support:** Deliver personalized, context-aware assistance by recalling interaction history.
- **Document Search:** Enable fast, semantic search in large datasets, manuals, or FAQs.
- **Code Assistance:** Provide project-specific documentation and debugging tips for developers.
- **Knowledge Management:** Centralize and retrieve internal information for teams efficiently.
- **Education & Training:** Provide students or employees with customized training materials, track progress, and answer questions based on stored resources.
- **Healthcare:** Securely retrieve patient records or medical history for accurate support.
- **Collaborative Workflows:** Track project history and integrate with tools for team alignment.
- **Legal Compliance:** Reference guidelines to ensure accurate and regulation-compliant decisions.

The many use cases enabled by memory agents are opening up new possibilities and changing what **Artificial General Intelligence (AGI)** can do.

::: note Prerequisites

Before we begin creating a memory agent that chats with your documents, you’ll need to have the following setup and tools ready to go.

In this tutorial, I’ll be using the following tech stack:

- [<VPIcon icon="fas fa-globe"/>BaseAI](http://baseai.dev) — the web framework for building AI agents locally.
- [<VPIcon icon="fas fa-globe"/>Langbase](http://langbase.com) — the platform to build and deploy your serverless AI agents.
- [<VPIcon icon="iconfont icon-openai"/>OpenAI](https://openai.com/) — to get the LLM key for the preferred model.

You’ll also need to:

- Sign up on [<VPIcon icon="fas fa-globe"/>Langbase](https://langbase.com/signup) to get access to the API key.
- Sign up on [<VPIcon icon="iconfont icon-openai"/>OpenAI](https://platform.openai.com/signup) to generate the LLM key for the model you want to use (for this demo, I’ll be using GPT-4o mini). You can generate the key [<VPIcon icon="iconfont icon-openai"/>here](https://platform.openai.com/api-keys).

:::

Let’s get started!

---

## Step 1: Create a Directory and Initialize npm

To start creating a memory agent that chats with your documents, you need to create a directory in your local machine and install all the relevant dev dependencies in it. You can do this by navigating to it and running the following command in the terminal:

```sh
mkdir my-project
npm init -y
npm install dotenv
```

This command will create a <VPIcon icon="iconfont icon-json"/>`package.json` file in your project directory with default values. It will also install the `dotenv` package to read environment variables from the <VPIcon icon="iconfont icon-doitenv" />`.env` file.

---

## Step 2: Create a Pipe Agent

Next, we’ll be creating a [<VPIcon icon="fas fa-globe"/>pipe agent](https://langbase.com/docs). Pipes are different from other agents, as they are serverless AI agents with agentic tools that can work with any language or framework. They are easily deployable, and with just one API they let you connect 100+ LLMs to any data to build any developer API workflow.

To create your AI agent pipe, navigate to your project directory. Run the following command:

```sh
npx baseai@latest pipe
```

Upon running, you’ll see the following prompts:

```plaintext title="output"
BaseAI is not installed but required to run. Would you like to install it? Yes/No
Name of the pipe?  pipe-with-memory
Description of the pipe? Pipe attached to a memory
Status of the pipe? Public/Private
System prompt? You are a helpful AI assistant
```

Once you are done with the name, description, and status of the AI agent pipe, everything will be set up automatically for you. Your pipe will be created successfully at <VPIcon icon="fas fa-folder-open"/>`/baseai/pipes/`<VPIcon icon="iconfont icon-typescript"/>`pipe-with-memory.ts`.

---

## Step 3: Add a .env File

Create a <VPIcon icon="iconfont icon-doitenv" />`.env` file in the root directory of your project and add the [<VPIcon icon="iconfont icon-openai"/>OpenAI](https://platform.openai.com/api-keys) and Langbase API key in it. You can access your Langbase API key from [<VPIcon icon="fas fa-globe"/>here](https://langbase.com/docs/api-reference/api-keys).

---

## Step 4: Create a Memory Agent

Next, we’ll be creating a memory and then attaching it with the Pipe to make it a memory agent. To do this, run this command in your terminal:

```sh
npx baseai@latest memory
```

Upon running this command, you’ll see the following prompts:

```plaintext title="output"
Name of the memory?  chat-with-docs-agent
Description of the pipe? FAQs docs
Do you want to create memory from the current project git repository? Yes/No
```

After this, everything will be set up automatically for you and you can access your memory created successfully at <VPIcon icon="fas fa-folder-open"/>`/baseai/memory/`<VPIcon icon="iconfont icon-typescript"/>`chat-with-docs-agent.ts`.

---

## Step 5: Add Documents to the Memory Agent

Inside <VPIcon icon="fas fa-folder-open"/>`/baseai/memory/`<VPIcon icon="iconfont icon-typescript"/>`chat-with-docs-agent.ts` you’ll see another folder called documents. This is where you’ll store the files you want your AI agent to access. For this demo, I’ll save the [<VPIcon icon="fas fa-globe"/>Pipe FAQs](https://langbase.com/docs/pipe/faqs) page as either a `.pdf` or `.txt` file. Then, I’ll convert it to a markdown file and place it in the <VPIcon icon="fas fa-folder-open"/>`baseai/memory/chat-with-docs/documents` directory.

This step ensures the memory agent can **process and retrieve** information from your documents, making the AI agent capable of answering queries based on the content you provide.

---

## Step 6: Generate Memory Embeddings

Now that you’ve added documents to the memory, the next step is to generate memory embeddings. But first, what exactly are embeddings, and why are they essential?

### What Are Memory Embeddings?

Embeddings are numerical representations of your documents that allow the AI to understand the context and relationships between words, phrases, and sentences. Think of embeddings as a way to translate your documents into a language the AI can process for semantic search and retrieval.

### Why Do You Need Memory Embeddings?

Without embeddings, the AI agent wouldn’t be able to match user queries with relevant content from your documents. By generating embeddings, you’re essentially creating a searchable index that enables accurate and efficient responses from the memory agent.

### How to Generate Embeddings

To generate embeddings for your documents, run the following command in your terminal:

```sh
npx baseai@latest embed -m chat-with-docs-agent
```

Your memory is now ready to be connected with a Pipe (memory agent), enabling your AI agent to fetch precise, context-aware responses from your documents.

---

## Step 7: Integrate Memory in Pipe Agent

Next, you have to attach the memory you created to your Pipe agent to make it a memory agent. For that, go to <VPIcon icon="fas fa-folder-open"/>`/baseai/pipes/`<VPIcon icon="fas fa-typescript"/>`pipe-with-memory.ts`. This is what it will look like at the moment:

```ts :collapsed-lines title="/baseai/pipes/pipe-with-memory.ts"
import { PipeI } from '@baseai/core';

const pipePipeWithMemory = (): PipeI => ({
    apiKey: process.env.LANGBASE_API_KEY!, // Replace with your API key https://langbase.com/docs/api-reference/api-keys
    name: 'pipe-with-memory',
    description: 'Pipe attached to a memory',
    status: 'public',
    model: 'openai:gpt-4o-mini',
    stream: true,
    json: false,
    store: true,
    moderate: true,
    top_p: 1,
    max_tokens: 1000,
    temperature: 0.7,
    presence_penalty: 1,
    frequency_penalty: 1,
    stop: [],
    tool_choice: 'auto',
    parallel_tool_calls: false,
    messages: [
        { role: 'system', content: `You are a helpful AI assistant.` }],
    variables: [],
    memory: [],
    tools: []
});

export default pipePipeWithMemory;
```

Now integrate the memory in the pipe by importing it at the top and calling it as a function in the `memory` array. This is what the code will look like after doing all of this:

```ts :collapsed-lines title="/baseai/pipes/pipe-with-memory.ts"
import { PipeI } from '@baseai/core';
import chatWithDocsAgentMemory from '../memory/chat-with-docs-agent';

const pipePipeWithMemory = (): PipeI => ({
    apiKey: process.env.LANGBASE_API_KEY!, // Replace with your API key https://langbase.com/docs/api-reference/api-keys
    name: 'pipe-with-memory',
    description: 'Pipe attached to a memory',
    status: 'public',
    model: 'openai:gpt-4o-mini',
    stream: true,
    json: false,
    store: true,
    moderate: true,
    top_p: 1,
    max_tokens: 1000,
    temperature: 0.7,
    presence_penalty: 1,
    frequency_penalty: 1,
    stop: [],
    tool_choice: 'auto',
    parallel_tool_calls: false,
    messages: [
        { role: 'system', content: `You are a helpful AI assistant.` }],
    variables: [],
    memory: [chatWithDocsAgentMemory()],
    tools: []
});

export default pipePipeWithMemory;
```

---

## Step 8: Integrate the Memory Agent in Node.js

Now we’ll integrate the memory agent you created into the Node.js project to build an interactive command-line interface (CLI) for the document attached. This Node.js project will serve as the base for testing and interacting with the memory agent (in the beginning of the tutorial, we set up a Node.js project by initializing npm).

Now, create an <VPIcon icon="iconfont icon-typescript"/>`index.ts` file:

```sh
touch index.ts
```

In this TypeScript file, import the pipe agent you created. We will use the pipe primitive from `@baseai/core` to run the pipe.

Add the following code to the <VPIcon icon="iconfont icon-typescript"/>`index.ts` file:

```ts :collapsed-lines title="index.ts"
import 'dotenv/config';
import { Pipe } from '@baseai/core';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import pipePipeWithMemory from './baseai/pipes/pipe-with-memory';

const pipe = new Pipe(pipePipeWithMemory());

async function main() {

   const initialSpinner = ora('Conversation with Memory agent...').start();
   try {
       const { completion: calculatorTool} = await pipe.run({
           messages: [{ role: 'user', content: 'Hello' }],
       });
       initialSpinner.stop();
       console.log(chalk.cyan('Report Generator Agent response...'));
       console.log(calculatorTool);
   } catch (error) {
       initialSpinner.stop();
       console.error(chalk.red('Error processing initial request:'), error);
   }


   while (true) {
       const { userMsg } = await inquirer.prompt([
           {
               type: 'input',
               name: 'userMsg',
               message: chalk.blue('Enter your query (or type "exit" to quit):'),
           },
       ]);


       if (userMsg.toLowerCase() === 'exit') {
           console.log(chalk.green('Goodbye!'));
           break;
       }


       const spinner = ora('Processing your request...').start();


       try {
           const { completion: reportAgentResponse } = await pipe.run({
               messages: [{ role: 'user', content: userMsg }],
           });


           spinner.stop();
           console.log(chalk.cyan('Agent:'));
           console.log(reportAgentResponse);
       } catch (error) {
           spinner.stop();
           console.error(chalk.red('Error processing your request:'), error);
       }
   }
}

main();
```

This code creates an interactive CLI for chatting with an AI agent, using a pipe from the `@baseai/core` library to process user input. Here's what happens:

- It imports necessary libraries such as `dotenv` for environment configuration, `inquirer` for user input, `ora` for loading spinners, and `chalk` for colored output. Make sure you install these libraries first using this command in your terminal: `npm install ora inquirer`.
- A pipe object is created from the BaseAI library using a predefined memory called `pipe-with-memory`.

In the `main()` function:

- A spinner starts while an initial conversation with the AI agent is initiated with the message 'Hello'.
- The response from the AI is displayed.
- A loop runs to continually ask the user for input and send queries to the AI agent.
- The AI's responses are shown, and the process continues until the user types "exit”.

---

## Step 9: Start the BaseAI Server

To run the memory agent locally, you need to start the BaseAI server first. Run the following command in your terminal:

```sh
npx baseai@latest dev
```

---

## Step 10: Run the Memory Agent

Run the <VPIcon icon="iconfont icon-typescript"/>`index.ts` file using the following command:

```sh
npx tsx index.ts
```

---

## The Result

In your terminal, you’ll be prompted to "Enter your query." For example, let’s ask: "What is a pipe on Langbase?" And it will give us the response with correct sources/citations as well.

With this setup, we’ve built a "Chat with Your Document" agent that uses the power of LLMs and Langbase memory agents to overcome LLMs' limitations, ensuring accurate responses without hallucinating on private data.

Here’s a demo of the end result:

<VidStack src="youtube/v2Iev-q3kuc" />

Thank you for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Langbase Memory Agents to Make Any LLM a Conversational AI for Your Docs",
  "desc": "It’s 2025, and Large Language Models (LLMs) still can’t access your private data. Ask them something personal, and they’ll either guess or give you the wrong answer. That’s the limitation—they’re trained on public information and don’t have access to...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-langbase-memory-agents.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
