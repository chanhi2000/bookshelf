---
lang: en-US
title: "How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows"
description: "Article(s) > How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows"
icon: iconfont icon-langchain
category:
  - AI
  - LLM
  - LangChain
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows"
    - property: og:description
      content: "How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-langchain-and-langgraph-a-beginners-guide-to-ai-workflows.html
prev: /ai/langchain/articles/README.md
date: 2025-11-06
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762363391314/34c1c950-b257-40b2-a03d-cbaf1bfbd4b6.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows"
  desc="Artificial intelligence is moving fast. Every week, new tools appear that make it easier to build apps powered by large language models. But many beginners still get stuck on one question: how do you structure the logic of an AI application? How do y..."
  url="https://freecodecamp.org/news/how-to-use-langchain-and-langgraph-a-beginners-guide-to-ai-workflows"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762363391314/34c1c950-b257-40b2-a03d-cbaf1bfbd4b6.png"/>

Artificial intelligence is moving fast. Every week, new tools appear that make it easier to build apps powered by large language models.

But many beginners still get stuck on one question: how do you structure the logic of an AI application? How do you connect prompts, memory, tools, and APIs in a clean way?

That is where popular open-source frameworks like [<VPIcon icon="iconfont icon-langchain"/>LangChain](https://langchain.com/) and [<VPIcon icon="iconfont icon-langchain"/>LangGraph](https://langchain.com/langgraph) come in.

Both are part of the same ecosystem, and they’re designed to help you build complex AI workflows without reinventing the wheel.

LangChain focuses on building sequences of steps called chains, while LangGraph takes things a step further by adding memory, branching, and feedback loops to make your AI more intelligent and flexible.

This guide will help you understand what these tools do, how they differ, and how you can start using them to build your own AI projects.

---

## What is LangChain?

[<VPIcon icon="fas fa-globe"/>LangChain](https://turingtalks.ai/p/how-to-build-better-ai-workflows-with-langchain) is a Python and JavaScript framework that helps you build language model-powered applications. It provides a structure for connecting models like GPT, data sources, and tools into a single flow.

Instead of writing long prompt templates or hardcoding logic, you use components like chains, tools, and agents.

A simple example is chaining prompts together. For instance, you might first ask the model to summarize text, and then use the summary to generate a title. LangChain lets you define both steps and connect them in code.

Here is a basic example in Python:

```py
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = PromptTemplate.from_template("Summarize the following text:\n{text}")
chain = LLMChain(prompt=prompt, llm=llm)
result = chain.run({"text": "LangChain helps developers build AI apps faster."})
print(result)
```

This simple chain takes text and runs it through an OpenAI model to get a summary. You can add more steps, like a second chain to turn that summary into a title or a question.

LangChain provides modules for prompt templates, models, retrievers, and tools so you can build workflows without managing the raw API logic.

Here is the full [<VPIcon icon="iconfont icon-langchain"/>LangChain documentation](https://docs.langchain.com/oss/python/langchain/overview).

### Why LangChain Was Not Enough

LangChain made it easy to build straight-line workflows.

But most real-world applications are not linear. When [**building a chatbot**](/freecodecamp.org/build-a-custom-ai-chat-application-with-nextjs.md), summarizer, or an autonomous agent, you often need loops, memory, and conditions.

For example, if the AI makes a wrong assumption, you might want it to try again. If it needs more data, it should call a search tool. Or if a user changes context, the AI should remember what was discussed earlier.

LangChain’s chains and agents could do some of this, but the flow was hard to visualize and manage. You had to write nested chains or use callbacks to handle decisions.

Developers wanted a better way to represent how AI systems actually think. Not in straight lines, but as graphs where outputs can lead to different paths.

That’s what led to LangGraph.

---

## What is LangGraph?

LangGraph is an extension of LangChain that introduces a graph-based approach to AI workflows.

Instead of chaining steps in one direction, LangGraph lets you define nodes and edges like a flowchart. Each node can represent a task, an action, or a model call.

This structure allows loops, branching, and parallel paths. It’s perfect for building agent-like systems where the model reasons, decides, and acts.

Here is an example of a simple LangGraph setup:

```py
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain.agents import Tool

def multiply(a: int, b: int):
    return a * b
tools = [Tool(name="multiply", func=multiply, description="Multiply two numbers")]
llm = ChatOpenAI(model="gpt-4o-mini")
agent_executor = create_react_agent(llm, tools)
graph = StateGraph()
graph.add_node("agent", agent_executor)
graph.set_entry_point("agent")
graph.add_edge("agent", END)
app = graph.compile()
response = app.invoke({"input": "Use the multiply tool to get 8 times 7"})
print(response)
```

This example shows a basic agent graph.

The AI receives a request, reasons about it, decides to use the tool, and completes the task. You can imagine extending this to more complex graphs where the AI can retry, call APIs, or fetch new information.

LangGraph gives you full control over how the AI moves between states. Each node can have conditions. For example, if an answer is incomplete, you can send it back to another node to refine it.

This makes LangGraph ideal for building systems that need multiple reasoning steps, like document analysis bots, code reviewers, or research assistants.

Here is the full [<VPIcon icon="iconfont icon-langchain"/> LangGraph documentation](https://docs.langchain.com/oss/python/langgraph/overview).

---

## LangChain vs LangGraph

LangChain and LangGraph share the same foundation, but they approach workflows differently.

LangChain is linear. Each chain or agent moves from one step to the next in a sequence. It is simpler to start with, especially for prompt engineering, retrieval-augmented generation, and structured pipelines.

LangGraph is dynamic. It represents workflows as graphs that can loop, branch, and self-correct. It is more powerful when building agents that need reasoning, planning, or memory.

A good analogy is this: LangChain is like writing a list of tasks in order. LangGraph is like drawing a flowchart where decisions can lead to different actions or back to previous steps.

Most developers start with LangChain to learn the basics, then move to LangGraph when they want to build more interactive or autonomous AI systems.

---

## When to Use Each

If you’re building simple tools like text summarizers, chatbots, or document retrievers, LangChain is enough. It’s easy to get started and integrates well with popular models like GPT, Claude, and Gemini.

If you want to build multi-step agents, or apps that think and adapt, go with LangGraph. You can define how the AI reacts to different outcomes, and you get more control over retry logic, context switching, and feedback loops.

In practice, many developers combine both. LangChain provides the building blocks, while LangGraph organizes how those blocks interact.

---

## Adding Memory and Persistence

Both LangChain and LangGraph support memory, which allows your AI to remember context between interactions. This is useful when you’re building chatbots, assistants, or agents that need to carry information across steps.

For example, if a user introduces themselves once, the AI should be able to recall that detail later in the conversation.

In LangChain, memory is handled through built-in modules like `ConversationBufferMemory` or `ConversationSummaryMemory`. These let you store previous inputs and outputs so the model can reference them in future responses.

Here’s a simple example using LangChain:

```py
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain_openai import ChatOpenAI

memory = ConversationBufferMemory()
llm = ChatOpenAI(model="gpt-4o-mini")
conversation = ConversationChain(llm=llm, memory=memory)

conversation.predict(input="Hello, I am Manish.")
response = conversation.predict(input="What did I just tell you?")
print(response)
```

In this case, the model remembers your previous message and answers accordingly. The memory object acts like a running conversation log, keeping track of the dialogue as it evolves.

LangGraph takes this a step further by embedding memory into the graph’s state. Each node in the graph can access or update shared memory, allowing your AI to maintain context across multiple reasoning steps or branches. This approach is especially useful when building agents that loop, revisit nodes, or depend on previous interactions.

Here’s how memory can be added inside a LangGraph workflow:

```py
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-4o-mini")
memory = ConversationBufferMemory()

agent = create_react_agent(llm)
graph = StateGraph()

# Add node with access to memory
graph.add_node("chat", lambda state: agent.invoke({"input": state["input"], "memory": memory}))
graph.set_entry_point("chat")
graph.add_edge("chat", END)

app = graph.compile()

app.invoke({"input": "Hello, I am Manish."})
response = app.invoke({"input": "What did I just tell you?"})
print(response)
```

Here, the graph keeps track of memory between invocations. Even though each call runs through the same node, the shared `ConversationBufferMemory` retains what was said earlier. This design lets you build agents that remember user context, maintain history, and adapt as they move between nodes.

Whether you use LangChain or LangGraph, adding memory is what turns a simple workflow into a stateful system, one that can carry on a conversation, refine its reasoning, and respond more naturally over time.

---

## Monitoring and Debugging with LangSmith

[<VPIcon icon="iconfont icon-langchain"/>LangSmith](https://langchain.com/langsmith/observability) is another important tool from the LangChain ecosystem. It helps you visualize, monitor, and debug your AI applications.

When building workflows, you often want to see how the model behaves, how much it costs, and where things go wrong.

LangSmith records every call made by your chains and agents. You can view input and output data, timing, token usage, and errors. It provides a dashboard that shows how your system performed across multiple runs.

You can integrate LangSmith easily by setting your environment variable:

```sh
export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY="your_api_key_here"
```

Then, every LangChain or LangGraph process you run will automatically log to LangSmith. This helps developers find bugs, optimize prompts, and understand how the workflow behaves at each step.

Note that while Langchain and LangGraph are open source, Langsmith is a paid platform. Langsmith is a good-to-have tool and not a requirement to build AI workflows.

---

## The LangChain Ecosystem

LangChain is not just one library. It has grown into an ecosystem of tools that work together.

- **LangChain Core**: The main framework for chains, prompts, and memory.
- **LangGraph**: A graph-based extension for building adaptive workflows.
- **LangSmith**: A debugging and monitoring platform for AI apps.
- **LangServe**: A deployment layer that lets you turn your chains and graphs into APIs with one command.

Together, these tools form a complete stack for building, managing, and deploying language model applications. You can start with a simple chain, evolve it into a graph-based system, test it with LangSmith, and deploy it using LangServe.

---

## Conclusion

LangChain and LangGraph make it easier to move from prompts to production-ready AI systems. LangChain helps you build linear flows that connect models, data, and tools. LangGraph lets you go further by building adaptive and intelligent workflows that reason and learn.

For beginners, starting with LangChain is the best way to understand how language models can interact with other components. As your projects grow, LangGraph will give you the flexibility to handle complex logic and long-term state.

Whether you are building a chatbot, an agent, or a knowledge assistant, these tools will help you go from idea to implementation faster and more reliably.

::: info

Hope you enjoyed this article. Signup for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also* [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use LangChain and LangGraph: A Beginner’s Guide to AI Workflows",
  "desc": "Artificial intelligence is moving fast. Every week, new tools appear that make it easier to build apps powered by large language models. But many beginners still get stuck on one question: how do you structure the logic of an AI application? How do y...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-langchain-and-langgraph-a-beginners-guide-to-ai-workflows.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
