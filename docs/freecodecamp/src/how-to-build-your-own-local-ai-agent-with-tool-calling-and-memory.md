---
lang: en-US
title: "How to Build Your Own Local AI Agent with Tool Calling and Memory"
description: "Article(s) > How to Build Your Own Local AI Agent with Tool Calling and Memory"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - Ollama
  - LangChain
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
  - ollama
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own Local AI Agent with Tool Calling and Memory"
    - property: og:description
      content: "How to Build Your Own Local AI Agent with Tool Calling and Memory"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-local-ai-agent-with-tool-calling-and-memory.html
prev: /ai/langchain/articles/README.md
date: 2026-07-08
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7c284bf8-1dd8-40e3-9ff5-4ec4c8f97948.png
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
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Build Your Own Local AI Agent with Tool Calling and Memory"
  desc="In this tutorial, I'll show you how to build a local AI agent with tool calling and short-term memory using LangChain v1, Ollama, Qwen, and Python. The agent decides on its own when to call tools, and"
  url="https://freecodecamp.org/news/how-to-build-your-own-local-ai-agent-with-tool-calling-and-memory"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7c284bf8-1dd8-40e3-9ff5-4ec4c8f97948.png"/>

In this tutorial, I'll show you how to build a local AI agent with tool calling and short-term memory using LangChain v1, Ollama, Qwen, and Python.

The agent decides on its own when to call tools, and it remembers the conversation from turn to turn so you can ask follow-up questions naturally. Everything runs on your own machine to preserve privacy and has no API costs.

---

## Background

Local LLMs can't reach the outside world on their own. Ask one what time it is or how many words are in a sentence, and it'll often guess or say no unless you give it a way to find the answer. The model only has what's in its training data and what you typed in the prompt.

Second, models don't have memory. They forget everything the moment you send a new message. You ask a question, get an answer, ask a follow-up and the model has no idea what you're referring to. Every turn starts from zero.

Cloud hosted models like Claude and ChatGPT already support these features. But local LLMs do not. In this tutorial, I'll show you how to build a local AI agent that fixes both problems. It calls Python functions on its own when it needs to, and it remembers the conversation so follow-up questions work like they should. It runs entirely on your local machine to preserve privacy and has no API costs.

To follow along, you'll need Ollama installed on your machine. The example works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model in Ollama.

---

## What is Tool Calling?

Tool calling is a pattern where the LLM decides when to run your Python functions instead of you calling them upfront. A tool is just a Python function the model is allowed to call. The model decides when to call it and what arguments to pass. You decide what the tool actually does.

Under the hood, the model doesn't run code directly. It emits a structured request that says, in effect, "call this tool with these arguments." Your code executes the function, sends the result back to the model, and the model decides what to do next: call another tool or produce a final answer.

Not every model supports tool calling well. Qwen is a strong open-weight option for local tool-calling experiments, which is why I'm using it here.

LangChain v1's `create_agent` handles tool calling. You give it a model, a list of tools, and a system prompt, and it takes care of the call-and-respond cycle until the model is done.

---

## What is Memory in an LLM?

LLMs are stateless. Every call sends the full conversation as input, and the model responds based on only what's in that input. "Memory" in an agent is just the pattern of what you choose to send back to the model on the next call.

There are two kinds that matter in practice:

1. Short-term memory is the current conversation's history. Sending it back on the next call is what makes multi-turn conversations feel coherent. It goes away when the session ends.
2. Long-term memory is facts and past exchanges you want to carry across sessions. It lives in a database or vector store and gets loaded when relevant.

We'll use short-term memory for this tutorial. It's the simplest useful form and it's what turns an agent into something that can hold a real conversation.

LangChain v1 supports short-term memory through a checkpointer, which is a state that stores conversation history between `invoke()` calls, keyed by a thread ID. We'll use the built-in InMemorySaver for short-term memory.

---

## Motivation and Architecture

The motivation behind this project is to get one step closer to making the AI agent similar to Claude or ChatGPT using local LLMs. It also expands the utility of a local LLM by giving it more capabilities.

For this project, I'll use Ollama to run a local Qwen chat model, LangChain v1 to wire everything together, and the built-in `InMemorySaver` checkpointer for short-term memory.

When the user sends a message, the checkpointer loads the prior conversation for the current thread ID and prepends it. The model either produces an answer or emits a tool call. Tool calls run through the standard call-and-respond cycle. When the turn ends, the checkpointer saves the new messages back to the thread, so the next turn has full context.

---

## Step 1: Install Ollama and Pull the Model

To get started, install the Ollama application for your platform.

We'll use qwen3.5:4b as our model. It does supports tool calling natively. I'm using it as the chat model. If your machine has less RAM, you can use qwen3.5:0.8b instead.

```sh
ollama pull qwen3.5:4b
```

---

## Step 2: Install Python Dependencies

```sh
python3 -m venv venv
source venv/bin/activate 
pip install langchain langchain-core langchain-ollama langgraph
```

This tutorial requires `langchain>=1.0.0`.

---

## Step 3: Agent Python Code

The code does three things.

The configuration at the top defines the local Ollama model and the system prompt.

The tools section defines two tools using LangChain's `@tool` decorator. `current_time()` returns the current local date and time, and `word_count(text)` returns the number of words in a piece of text. The docstring on each tool is what the model sees when deciding whether to call it, so the wording matters.

The `main()` function builds the agent with `create_agent()`, wires in an `InMemorySaver` checkpointer for short-term memory, and runs an interactive loop. Each turn passes the user's message to the agent along with a fixed thread ID, so the checkpointer knows which conversation to load and save.

Save the code in your <VPIcon icon="fa-brands fa-python"/>`agent.py` file.

```py :collapsed-lines title="agent.py"
from datetime import datetime

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_ollama import ChatOllama
from langgraph.checkpoint.memory import InMemorySaver

CHAT_MODEL = "qwen3.5:4b"   # Ollama chat model. Must support tool calling.

SYSTEM_PROMPT = (
    "You are a helpful assistant with access to tools for getting the current time and counting words in text. "
    "Use tools when the user's request needs one. "
    "If the question doesn't need a tool, answer directly. "
    "If a tool returns an error, explain the error plainly."
)

# ----- Tools -----
@tool
def current_time() -> str:
    """Return the current local date and time.
    Use this when the user asks what time or date it is.
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@tool
def word_count(text: str) -> int:
    """Count the number of words in a piece of text.
    Use this when the user asks how long a piece of writing is,
    or asks you to count the words in something they've shared.
    Returns the word count as an integer.
    """
    return len(text.split())


TOOLS = [current_time, word_count]


# ----- Agent -----

def build_agent():
    model = ChatOllama(model=CHAT_MODEL, temperature=0)

    # InMemorySaver keeps conversation history in memory, keyed by thread ID.
    # When the process exits, the history is gone because of short-term memory.
    checkpointer = InMemorySaver()

    return create_agent(
        model=model,
        tools=TOOLS,
        system_prompt=SYSTEM_PROMPT,
        checkpointer=checkpointer,
    )


def main():
    agent = build_agent()

    # The thread ID tells the checkpointer which conversation to load and save.
    config = {"configurable": {"thread_id": "thread"}}

    print("Ready! Ask the agent something. It remembers the conversation.\n")

    # Track how many messages existed before this turn, so we can slice out
    # only the new ones (tool calls + final answer) from the returned state.
    prev_message_count = 0

    while True:
        question = input("You: ").strip()
        if not question or question.lower() == "exit":
            break

        result = agent.invoke(
            {"messages": [{"role": "user", "content": question}]},
            config=config,
        )

        # Only look at messages added during this turn, not the full history.
        new_messages = result["messages"][prev_message_count:]

        # Print any tool calls made in this turn.
        for msg in new_messages:
            tool_calls = getattr(msg, "tool_calls", None)
            if tool_calls:
                for call in tool_calls:
                    print(f"[tool call] {call['name']}({call['args']})")

        print(f"\nAnswer: {result['messages'][-1].content}\n")

        # Update the count for the next turn.
        prev_message_count = len(result["messages"])
```

---

## Step 4: Run the Agent

```sh
python agent.py
```

The agent starts an interactive loop. Type a question and it will either answer directly or call one or more tools before answering. The agent decides which questions will trigger tool calls. The [tool call] lines show which tools the agent picked and what arguments it passed, so you can see what it's actually doing.

Before trusting the answers, spot-check the [tool call] lines to make sure the agent called the right tool with the right arguments. Local models are smaller than hosted frontier models and tend to hallucinate more, especially on tool arguments..

As a test run, let's run the agent **without tools and memory** by commenting out these three lines:.

```py
return create_agent(
    model=model,
    # tools=TOOLS,
    # system_prompt=SYSTEM_PROMPT,
    # checkpointer=checkpointer,
)
```

Here's what my chat session looked like:

```plaintext
You: hi my name is Darsh

Answer: Hi Darsh! Nice to meet you. How can I help you today?

You: What is my name

Answer: I don't have access to personal information like your name! 

You: what is the current time

Answer: I don't have access to real-time data, so I can't provide the exact current time. 

You: What is the capital of USA

Answer: The capital of the United States is Washington, D.C.
```

It doesn't remember my name. Also, it's not able to tell the time as it doesn't have access to any tools.

Now, let's run the agent **with tools and memory**. Uncomment the three lines that you had commented and run the agent. Now you can see difference below:

```plaintext
You: hi my name is Darsh

Answer: Hello Darsh! Nice to meet you. How can I help you today?

You: What is my name

Answer: Your name is Darsh!

You: what is the current time
[tool call] current_time({})

Answer: The current time is 21:30:58 on July 1, 2026. You: what is the length of my name
[tool call] word_count({'text': 'Darsh'})

Answer: Your name "Darsh" has:
- **1 word** (it's a single word)
- **5 letters** (D-a-r-s-h)

So depending on what you meant by "length," it's either 1 word or 5 letters!

You: What is the capital of USA

Answer: The capital of the USA is Washington, D.C.
```

The agent behaved reasonably well for a 4B local model. It called `current_time` for the time question, `word_count` for counting the letters in my name.

If you want to improve tool-calling quality, you can experiment with:

1. Tool descriptions: the docstring on each tool does most of the work. A specific, action-oriented description helps the agent pick the right tool.
2. System prompt: giving the model clear guidance on when to use tools and when not to cuts down on unnecessary calls.

---

## Long-Term Memory

The short-term memory in this example only covers the current conversation thread. If you want the agent to remember things across separate chats, you need long-term memory.

In LangChain v1, long-term memory is stored in a memory store like Postgres that can be looked up again in future conversations.

To implement long-term memory, use one of two approaches: either the model uses tools to save and retrieve user information, or your agent uses middleware or surrounding Python code to automatically store facts like names and response preferences behind the scenes.

For this tutorial, short-term memory is adequate. Long-term memory is the natural next step once you want recall across sessions. You can read more about long-term memory in the [<VPIcon icon="iconfont icon-langchain"/>LangChain docs](https://docs.langchain.com/oss/python/langchain/long-term-memory).

---

## Conclusion

In this tutorial, you learned how to build a local AI agent with tool calling and short-term memory using LangChain v1's `create_agent`, the `@tool` decorator, and an `InMemorySaver` checkpointer. All of it runs on your own machine with no data leaving your laptop, and you have full control over what tools the agent has access to, without any API costs.

From here, try adding your own tools like a note-writing tool, listing files or reading files . Change the tool descriptions and see how the agent's behavior changes. Swap in different models like qwen3.5:0.8b or a larger Qwen to see how tool-calling changes with model size. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](http://darshshah.org/blog) (recent posts include a system design paper series), my work on my personal [<VPIcon icon="fas fa-globe"/>website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Local AI Agent with Tool Calling and Memory",
  "desc": "In this tutorial, I'll show you how to build a local AI agent with tool calling and short-term memory using LangChain v1, Ollama, Qwen, and Python. The agent decides on its own when to call tools, and",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-local-ai-agent-with-tool-calling-and-memory.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
