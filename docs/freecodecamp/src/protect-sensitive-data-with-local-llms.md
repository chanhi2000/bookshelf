---
lang: en-US
title: "How to Protect Sensitive Data by Running LLMs Locally with Ollama"
description: "Article(s) > How to Protect Sensitive Data by Running LLMs Locally with Ollama"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - OpenAI
  - LangChain
  - Ollama
  - Ollama
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
  - langchain
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Protect Sensitive Data by Running LLMs Locally with Ollama"
    - property: og:description
      content: "How to Protect Sensitive Data by Running LLMs Locally with Ollama"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/protect-sensitive-data-with-local-llms.html
prev: /programming/py/articles/README.md
date: 2026-03-06
isOriginal: false
author:
  - name: Manoj Aggarwal
    url: https://freecodecamp.org/news/author/manojag/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/f332e2f1-1bb5-450c-ae4a-d2ca4c6b2fe2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Protect Sensitive Data by Running LLMs Locally with Ollama"
  desc="Whenever engineers are building AI-powered applications, use of sensitive data is always a top priority. You don't want to send users' data to an external API that you don't control. For me, this happ"
  url="https://freecodecamp.org/news/protect-sensitive-data-with-local-llms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/f332e2f1-1bb5-450c-ae4a-d2ca4c6b2fe2.png"/>

Whenever engineers are building AI-powered applications, use of sensitive data is always a top priority. You don't want to send users' data to an external API that you don't control.

For me, this happened when I was building [FinanceGPT (<VPIcon icon="iconfont icon-github"/>`manojag115/FinanceGPT`)](https://github.com/manojag115/FinanceGPT), which is my personal open-source project that helps me with my finances. This application lets you upload your bank statements, tax forms like 1099s, and so on, and then you can ask questions in plain English like, "How much did I spend on groceries this month?" or "What was my effective tax rate last year?"

The problem is that answering these questions means sending all the sensitive transaction history, W-2s and income data to OpenAI or Anthropic or Google, which I was not comfortable with. Even after redacting PII data from these documents, I was not ok with the trade-off.

This is where Ollama comes in. Ollama lets you run large language models entirely on your own laptop. You don't need any API keys or cloud infrastructure and no data leaves your machine.

In this tutorial, I will walk you through what Ollama is, how to get started with it, and how to use it in a real Python application so that users of the application can choose to keep their data completely local.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [What is Ollama](#what-is-ollama)
- [How Ollama's API works](#how-ollamas-api-works)
- [How to call Ollama from Python](#how-to-call-ollama-from-python)
- [How to Integrate Ollama into a LangChain App](#how-to-integrate-ollama-into-a-langchain-app)
- [How to Build an LLM-Provider Agnostic App](#how-to-build-an-llm-provider-agnostic-app)
- [How to use Ollama with LangGraph](#how-to-use-ollama-with-langgraph)
- [How FinanceGPT Uses This in Practice](#how-financegpt-uses-this-in-practice)
- [Tradeoffs to be Aware Of](#tradeoffs-to-be-aware-of)
- [Conclusion](#conclusion)
- [Check Out FinanceGPT](#check-out-financegpt)
- [Resources](#resources)

---

## Prerequisites

You will need the following at a minimum:

- Python 3.10+
- A machine with at least 8GB of RAM (16GB recommended for larger models)
- Basic familiarity with Python and pip

---

## What is Ollama?

Ollama is an open-source tool that makes running LLMs locally very easy. You can think of it as Docker but for AI models. You can pull models using just one command and Ollama handles everything else like downloading the weights, managing memory and the serving the model through a local REST API.

The local REST API is compatible with OpenAI's API format which means any application that can talk to OpenAI, can switch to using Ollama without changing any code.

### Installation

First thing you would need is to download the installer from [<VPIcon icon="iconfont icon-ollama"/>ollama.com](https://ollama.com/). Once installed, you can verify it is running:

```sh
ollama --version
```

The above command checks whether Ollama was installed correctly and prints the current version.

### Pull and Run Your First Model

Ollama hosts a variety of models on [<VPIcon icon="iconfont icon-ollama"/>ollama.com/library](https://ollama.com/library). To pull and immediately chat with one, just do:

```sh
ollama run llama3.2
```

This command will download the model from ollama and start an interactive chat session with it. Note: the model size would be a few GBs depending on which model is downloaded. Alternatively, if you want to download a specific model only:

```sh
ollama pull mistral
```

This downloads a model to your machine without starting a chat session which is useful when you want to set up models in advance.

You can run the following command to list the models you have installed:

```sh
ollama list
```

This shows all models you've downloaded locally along with their sizes.

I have used the following models and they have worked great for specific tasks:

| Model | Size | Good For |
| --- | --- | --- |
| `llama3.2` | ~2GB | Fast, general purpose |
| `mistral` | ~4GB | Strong instruction following |
| `qwen2.5:7b` | ~4GB | Multilingual, reasoning |
| `deepseek-r1:7b` | ~4GB | Complex reasoning tasks |

---

## How Ollama's API works

Once Ollama is running, it will be served on localhost:11434. You can call it directly using curl:

```sh
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{ "role": "user", "content": "What is compound interest?" }],
  "stream": false
}'
```

This sends a chat message directly to Ollama's REST API from the command line, with streaming disabled so you get the full response at once. The above endpoint is to simply chat with the model. The more useful endpoint is `http://localhost:11434/v1` as this is OpenAI-compatible. This is the key feature that makes it easy to drop into existing apps that use OpenAI or other LLMs.

---

## How to Call Ollama from Python

### How to Use the Ollama Python Library

Ollama has its own Python library that is pretty intuitive to use:

```sh
pip install ollama
```

```py
from ollama import chat

response = chat(
    model='llama3.2',
    messages=[
        {'role': 'user', 'content': 'Explain what a Roth IRA is in simple terms.'}
    ]
)

print(response.message.content)
```

The above code uses Ollama's native Python SDK to send a message and print the model's reply, which is the most straightforward way to call Ollama from Python

### How to Use the OpenAI SDK with Ollama as the Backend

As mentioned earlier, Ollama has an endpoint that is OpenAI compatible, so you can also use the OpenAI Python SDK and just point it to your local server:

```sh
pip install openai
```

```py
from openai import OpenAI

client = OpenAI(
    base_url='http://localhost:11434/v1',
    api_key='ollama',  # Required by the SDK, but ignored by Ollama
)

response = client.chat.completions.create(
    model='llama3.2',
    messages=[
        {'role': 'user', 'content': 'Explain what a Roth IRA is in simple terms.'}
    ]
)

print(response.choices[0].message.content)
```

This uses the standard OpenAI Python SDK but redirects it to your local Ollama server. The `api_key` field is required by the SDK but ignored by Ollama. This pattern makes using Ollama seamless for existing applications. The code is nearly identical to what you would write for OpenAI.

---

## How to Integrate Ollama into a LangChain App

Most production applications are built with an orchestration framework like LangChain, which has a native Ollama support. This means swapping providers is just a one-line change.

Install the integration:

```sh
pip install langchain-ollama
```

### How to Create a Chat Model

```py
from langchain_ollama import ChatOllama

llm = ChatOllama(model="llama3.2")

response = llm.invoke("What is the difference between a W-2 and a 1099?")
print(response.content)
```

This creates a LangChain-compatible chat model backed by a local Ollama model, a one-line swap from `ChatOpenAI`.

Compare this to the OpenAI version and you will see that the interface is almost identical:

```py
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
```

---

## How to Build an LLM-Provider Agnostic App

The real power of the application comes from the abstraction of LLM providers. Applications like Perplexity lets users choose the LLM they want to use for their tasks. Here's a simple factory pattern that returns the right LLM based on the configuration:

```py
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from langchain_anthropic import ChatAnthropic

def get_llm(provider: str, model: str):
    """
    Return the appropriate LangChain LLM based on the provider.
    
    Args:
        provider: One of "openai", "ollama", "anthropic"
        model: The model name (e.g. "gpt-4o", "llama3.2", "claude-3-5-sonnet")
    
    Returns:
        A LangChain chat model ready to use
    """
    if provider == "openai":
        return ChatOpenAI(model=model)
    elif provider == "ollama":
        return ChatOllama(model=model)
    elif provider == "anthropic":
        return ChatAnthropic(model=model)
    else:
        raise ValueError(f"Unknown provider: {provider}")
```

The above snippet shows a helper that returns the right LangChain model based on a provider string, so the rest of your app never needs to know which LLM is running underneath.

Now the rest of your code does not need to know about the provider who's LLM is running underneath. This includes your chains, your agents and your tools. You pass `llm` around and it just works.

---

## How to use Ollama with LangGraph

If you're using LangGraph to build agents (as I covered in my [**previous article on AI agents**](/freecodecamp.org/how-to-develop-ai-agents-using-langgraph-a-practical-guide.md)), plugging in Ollama is equally seamless:

```py
from langgraph.prebuilt import create_react_agent
from langchain_ollama import ChatOllama
from langchain_core.tools import tool

@tool
def get_spending_summary(category: str) -> str:
    """Get total spending for a given category this month."""
    # In a real app, this would query your database
    return f"You spent $342.50 on {category} this month."

llm = ChatOllama(model="llama3.2")

agent = create_react_agent(
    model=llm,
    tools=[get_spending_summary]
)

response = agent.invoke({
    "messages": [{"role": "user", "content": "How much did I spend on groceries?"}]
})

print(response["messages"][-1].content)
```

This snippet builds a ReAct agent that uses a locally-running model to decide when to call tools while keeping all data on-device even during agentic workflows.

The agent will decide to call the `get_spending_summary` tool when needed and get the result using the locally running model instead of sending your data over the internet to OpenAI.

---

## How FinanceGPT Uses This in Practice

FinanceGPT is built to support OpenAI, Anthropic, Google and Ollama as LLM providers. The user sets their preference on the UI or in a config file and the application instantiates the right model using a pattern very similar to the factory pattern above.

When the user chooses Ollama, here's what happens:

1. Their bank statements and other sensitive documents are parsed locally
2. Sensitive fields like SSNs are masked before any LLM call
3. The masked data and query goes to the local Ollama server running on their own machine
4. The response comes back locally and nothing ever leaves their network

To run FinanceGPT locally with Ollama, the setup looks like this:

```sh
# 1. Pull a capable model
ollama pull llama3.2

# 2. Clone and configure FinanceGPT
git clone https://github.com/manojag115/FinanceGPT.git
cd FinanceGPT
cp .env.example .env

# 3. In .env, set your LLM provider to Ollama
# LLM_PROVIDER=ollama
# LLM_MODEL=llama3.2

# 4. Start the full stack
docker compose -f docker-compose.quickstart.yml up -d
```

With this setup, the entire application including the frontend, backend and LLM, runs on your own hardware.

---

## Tradeoffs to be Aware Of

Ollama is a great local alternative to using cloud LLMs, but it comes with its own problems.

### Response Quality

Ollama models are essentially 7B parameter models running locally, so by design they will not match GPT-4o on complex reasoning tasks. For simple Q&A and summarization tasks, the results would be comparable, but for multi-step reasoning or nuanced judgement calls, the gap is noticeable.

### Speed

Inference speed depends on the hardware that is running the model. Without a GPU, the Ollama models can take several seconds to respond. On Apple Silicon (M1/M2/M3), the performance is surprisingly good even without a dedicated GPU.

### Hardware Requirements

Small models (7B parameters) need around 8GB of RAM, however larger models (13B+) need 16GB or more. If you are building your application for end users, you cannot guarantee they have the hardware.

### Tool Use and Function Calling

Not all local models support function calling reliably. If your agent depends heavily on tool use, test your chosen model carefully. Models like `qwen2.5` and `mistral` generally handle this better than others.

The right mental model: use cloud models when you need maximum capability, and local models when privacy or cost constraints make cloud models impractical.

---

## Conclusion

In this tutorial, you learned what Ollama is, how to install it and pull models, and three different ways to call it from Python: the native Ollama library, the OpenAI-compatible SDK, and LangChain. You also saw how to build a provider-agnostic factory pattern so your app can switch between cloud and local models with a single config change.

Ollama makes local LLMs genuinely practical for production apps. The OpenAI-compatible API means integration is nearly zero-friction, and LangChain's native support means you can build provider-agnostic apps from the start.

The finance domain is an obvious fit — but the same principle applies anywhere sensitive data is involved: healthcare, legal tech, HR, personal productivity. If your app processes data that users wouldn't want stored on someone else's server, giving them a local option isn't just a nice-to-have. It's a trust feature.

---

## Check Out FinanceGPT

All the code examples here came from [FinanceGPT (<VPIcon icon="iconfont icon-github"/>`manojag115/FinanceGPT`)](https://github.com/manojag115/FinanceGPT). If you want to see these patterns in a complete app, poke around the repo. It's got document processing, portfolio tracking, tax optimization – all built with LangGraph.

If you find this helpful, [give the project a star on GitHub (<VPIcon icon="iconfont icon-github"/>`manojag115/FinanceGPT`)](https://github.com/manojag115/FinanceGPT) – it helps other developers discover it.

::: info Resources

<SiteInfo
  name="Ollama's documentation - Ollama"
  desc="Ollama is the easiest way to get up and running with large language models such as gpt-oss, Gemma 3, DeepSeek-R1, Qwen3 and more."
  url="https://docs.ollama.com/"
  logo="https://docs.ollama.com/mintlify-assets/_mintlify/favicons/ollama-9269c548/rTOd4JgM8IuYTTMj/_generated/favicon-dark/favicon.ico"
  preview="https://ollama-9269c548.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DGet%2Bstarted%26title%3DOllama%2527s%2Bdocumentation%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Follama-9269c548%252FXefrxzvUktkk84RL%252Fimages%252Flogo.png%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DXefrxzvUktkk84RL%2526q%253D85%2526s%253D03a38b5749aa7f530044e9b251dc10d8%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Follama-9269c548%252FXefrxzvUktkk84RL%252Fimages%252Flogo-dark.png%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DXefrxzvUktkk84RL%2526q%253D85%2526s%253Dc214b467f5623414c31d4e05c66110fb%26primaryColor%3D%2523000%26lightColor%3D%2523b5b5b5%26darkColor%3D%2523000%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%2523000000&w=1200&q=100"/>

<SiteInfo
  name="library"
  desc="Browse Ollama's library of models."
  url="https://ollama.com/library/"
  logo="https://ollama.com/public/android-chrome-icon-512x512.png"
  preview="https://ollama.com/public/og.png"/>

<SiteInfo
  name="ChatOllama integration - Docs by LangChain"
  desc="Integrate with the ChatOllama chat model using LangChain Python."
  url="https://docs.langchain.com/oss/python/integrations/chat/ollama/"
  logo="https://docs.langchain.com/mintlify-assets/_mintlify/favicons/langchain-5e9cc07a/YSQua9Gt91yRswvJ/_generated/favicon-dark/favicon.ico"
  preview="https://langchain-5e9cc07a.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DDocumentation%26appearance%3Dsystem%26title%3DChatOllama%2Bintegration%26description%3DIntegrate%2Bwith%2Bthe%2BChatOllama%2Bchat%2Bmodel%2Busing%2BLangChain%2BPython.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Flangchain-5e9cc07a%252FnQm-sjd_MByLhgeW%252Fimages%252Fbrand%252Flangchain-docs-dark-blue.png%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DnQm-sjd_MByLhgeW%2526q%253D85%2526s%253D5babf1a1962208fd7eed942fa2432ecb%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Flangchain-5e9cc07a%252FnQm-sjd_MByLhgeW%252Fimages%252Fbrand%252Flangchain-docs-light-blue.png%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DnQm-sjd_MByLhgeW%2526q%253D85%2526s%253D0bcd2a1f2599ed228bcedf0f535b45b1%26primaryColor%3D%2523161F34%26lightColor%3D%25237FC8FF%26darkColor%3D%2523006DDD%26backgroundLight%3D%2523FFFFFF%26backgroundDark%3D%2523030710&w=1200&q=100"/>

```component VPCard
{
  "title": "How to Develop AI Agents Using LangGraph: A Practical Guide",
  "desc": "AI agents are all the rage these days. They’re like traditional chatbots, but they have the ability to utilize a plethora of tools in the background. They can also decide which tool to use and when to use it to answer your questions. In this tutorial...",
  "link": "/freecodecamp.org/how-to-develop-ai-agents-using-langgraph-a-practical-guide.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Protect Sensitive Data by Running LLMs Locally with Ollama",
  "desc": "Whenever engineers are building AI-powered applications, use of sensitive data is always a top priority. You don't want to send users' data to an external API that you don't control. For me, this happ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/protect-sensitive-data-with-local-llms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
