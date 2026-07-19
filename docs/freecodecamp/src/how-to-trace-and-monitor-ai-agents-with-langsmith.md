---
lang: en-US
title: "How to Trace and Monitor AI Agents with LangSmith"
description: "Article(s) > How to Trace and Monitor AI Agents with LangSmith"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - LangChain
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
  - langchain
  - lang-chain
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Trace and Monitor AI Agents with LangSmith"
    - property: og:description
      content: "How to Trace and Monitor AI Agents with LangSmith"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-trace-and-monitor-ai-agents-with-langsmith.html
prev: /ai/langchain/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6ff293d4-dea5-462b-b79b-c319d77458f0.png
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
  name="How to Trace and Monitor AI Agents with LangSmith"
  desc="In this tutorial, I'll show you how to trace and monitor a local AI agent with LangSmith. We'll build a small local AI agent and then enable LangSmith tracing for it so that we can inspect model calls"
  url="https://freecodecamp.org/news/how-to-trace-and-monitor-ai-agents-with-langsmith"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6ff293d4-dea5-462b-b79b-c319d77458f0.png"/>

In this tutorial, I'll show you how to trace and monitor a local AI agent with LangSmith. We'll build a small local AI agent and then enable LangSmith tracing for it so that we can inspect model calls, tool usage, and request latency in a web UI.

We'll be using LangChain v1, Ollama, Qwen, and Python. Everything runs on your own machine except the observability layer, so the agent itself has no model API costs.

---

## Background

Building a local AI agent is the easy part. The harder part starts later, when the agent behaves differently after a prompt change, starts using the wrong tool, or becomes slower without an obvious reason.

With regular software, we usually rely on logs and metrics to understand what changed. Agents need that too, but they also need visibility into the actual chain of decisions inside a request. A single user message might trigger a model call, one or more tool calls, and several intermediate steps before the final answer is returned.

If we only look at the final output, we miss most of what matters. We can tell that something went wrong, but not where it went wrong.

That’s why observability matters for AI agents. In this tutorial, we’ll set up LangSmith tracing for a local LangChain agent so we can inspect each request, see which tools were called, and understand how the agent behaved step by step

To follow along, you’ll need Ollama installed on your machine. The tutorial works on macOS, Windows, and Linux. I’m using a MacBook Pro with 32 GB of RAM, but you can run the same setup on a lower-memory machine by choosing a smaller Qwen model.

---

## What is Observability and Monitoring?

Monitoring tells us that something is wrong. It gives us signals like higher latency, more failures, more tool errors, or rising usage over time.

Observability helps us understand why it's wrong. It lets us inspect what happened inside a request. For an AI agent, that means looking at the prompt, the model calls, the tool calls, the outputs, and the timing for each step.

In practice, observability usually includes three things:

- Traces: the full step-by-step path of a request
- Logs: records of events, outputs, and errors
- Metrics: numbers tracked over time, like latency, failures, and usage

For AI agents, this matters because the final answer alone usually isn’t enough. If the output is wrong or slow, we need a way to see whether the problem came from the model, the prompt, the tool choice, or something in the middle of the agent loop. The goal is to understand what happened and where it went wrong.

---

## What is LangSmith?

[<VPIcon icon="iconfont icon-langchain"/>LangSmith](https://docs.langchain.com/langsmith/observability) is LangChain’s observability platform for tracing, debugging, evaluating, and monitoring LLM apps and agents.

The core concepts of LangSmith are:

- Project: a container for related traces
- Trace: the full execution of one request
- Run: an individual step inside a trace, such as an LLM call or tool call
- Thread: a conversation or session grouping, useful for multi-turn agents

LangChain agents built with `create_agent` automatically support LangSmith tracing, which means you can capture model calls, tool invocations, and execution steps with no code changes. The traces get automatically uploaded to LangSmith server on every agent invocation.

LangSmith features include request traces, step-by-step run inspection, latency and usage monitoring, dashboards, project-based organization, alerts for regressions, and more.

---

## Motivation and Architecture

Monitoring is the natural next step after building an agent. Once the agent works, the next question is whether it works reliably and whether we can debug it when it doesn’t. This becomes especially important in production, where debugging real user issues is much harder without traces, metrics, and request-level visibility.

To keep things simple, we’ll monitor a small local agent with two tools: one for the current time and another for counting words. The agent runs locally through Ollama, while LangSmith captures the trace data so we can inspect it in the browser and debug/monitor it.

---

## Step 1: Install Ollama and Pull the Model

To get started, install the Ollama application for your platform. We'll use `qwen3.5:4b`.

```sh
ollama pull qwen3.5:4b
```

If your machine has lower RAM, you can use qwen3.5:0.8b instead.

---

## Step 2: Install Python Dependencies

Create a virtual environment and install the required packages:

```sh
python3 -m venv venv 
source venv/bin/activate 
pip install langchain langchain-core langchain-ollama langsmith
```

This tutorial requires `langchain>=1.0.0`.

---

## Step 3: Enable LangSmith Tracing

Create a free LangSmith account on [<VPIcon icon="iconfont icon-langchain"/>smith.langchain.com](https://smith.langchain.com). Once signed in, create a new project called MyAgentApp.

![LangSmith page to create a new project. We will create MyAgentApp project](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/b8b47668-8002-467b-a55f-310bce0e7772.png)

Then generate an API key for the project, and set the environment variables in your terminal. The LangSmith webpage will show the values to set.

```sh
export LANGSMITH_TRACING=true
export LANGSMITH_ENDPOINT=https://api.smith.langchain.com
export LANGSMITH_API_KEY=your_langsmith_api_key
export LANGSMITH_PROJECT="MyAgentApp"
```

At this point, your app is ready to send traces to LangSmith.

---

## Step 4: Build the Agent

Below is a minimal AI agent using Ollama, LangChain, and two simple tools. This is the simpler version of the tool calling agent that we created in [**How to Build Your Own Local AI Agent with Tool Calling and Memory**](/freecodecamp.org/how-to-build-your-own-local-ai-agent-with-tool-calling-and-memory.md#step-3-agent-python-code).

No additional tracing/LangSmith setup is required.

Save this file as <VPIcon icon="fa-brands fa-python"/>`trace_agent.py`:

```py :collapsed-lines title="trace_agent.py"
from datetime import datetime

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_ollama import ChatOllama

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
    model = ChatOllama(model=CHAT_MODEL, reasoning=False, temperature=0)

    return create_agent(
        model=model,
        tools=TOOLS,
        system_prompt=SYSTEM_PROMPT
    )


def main():
    agent = build_agent()

    print("Ready! Ask the agent something.\n")

    # Track how many messages existed before this turn, so we can slice out
    # only the new ones (tool calls + final answer) from the returned state.
    prev_message_count = 0

    while True:
        question = input("You: ").strip()
        if not question or question.lower() == "exit":
            break

        result = agent.invoke(
            {"messages": [{"role": "user", "content": question}]}
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


if __name__ == "__main__":
    main()
```

Because this agent is created with LangChain’s agent APIs, LangSmith tracing should capture the end-to-end execution: input, model interactions, tool calls, and final output without any additional configuration.

Run the agent:

```sh
python trace_agent.py
```

---

## Sample Output

The output looks like below. I asked the agent four questions. It invoked tools for finding the time and word length.

```sh
python trace_agent.py 
#
# Ready! Ask the agent something.
# 
# You: Hello, how are you?
# 
# Answer: I'm doing well! How about you? Is there anything specific I can help you with today?
# 
# You: What is the current time
# [tool call] current_time({})
# 
# Answer: The current local date and time is July 17, 2026 at 13:56. Is there anything else you'd like to know?
# 
# You: What is the word count for "LangSmith is awesome"
# [tool call] word_count({'text': 'LangSmith is awesome'})
# 
# Answer: The phrase "LangSmith is awesome" has a word count of 3. Let me know if you need anything else!
# 
# You: What is capital of France
# 
# Answer: The capital of France is Paris.
```

Now, we'll see how LangSmith traced the request. Go to the LangSmith Web UI and sign in. Click on your project and you can see:

- traces in your project
- the request and responses
- tool calling information
- token consumption
- latency information and other key metrics

For the above output, I can see four traces (each agent invocation creates its own trace):

![Image showing all four traces in MyAgentApp project in LangSmith UI](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/a2f80d11-8bb5-4f43-a937-20a01bef3607.png)

Inspecting trace 2, I can see the request, response, and tool calling information. I can also see the tokens consumed.

![Image showing one trace request and response  in MyAgentApp project in LangSmith UI](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/b871eeda-9efd-453f-a966-185393384868.png)

I can see the overall count, latency, error rate, and other metrics for my app. This can help in checking the overall usage and health of your AI agent.

![Image showing monitoring dashboard with count, latency and error rate metrics in LangSmith UI](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/c1863bf6-f383-4205-915d-bad6a315bade.png)

Lastly, I can setup alerts to monitor and notify if something goes wrong. For example, we can configure an alert called HighUsage and it will alert if the run count is more than once in the last 5 minutes.

![Image showing Alert setup window in LangSmith UI. ](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/c4d11b88-5ceb-4e4e-8614-e18bd2eb1c94.png)

The above setup gives you a very quick way to setup observability and monitoring for your AI Agent.

---

## Next Steps

Once tracing works, the next improvement is to add metadata and tags so traces become easier to filter and analyze. LangSmith supports custom metadata and tags to label requests by environment, app version, user tier, or workflow.

For example, you might add the below option in the config:

- `environment=dev`
- `agent_name=local-ollama-agent`
- `model=qwen3`

```py
result = agent.invoke(
            {"messages": [{"role": "user", "content": question}]},

config={
        "tags": ["dev", "local-ollama-agent"],
        "metadata": {
            "environment": "dev",
            "agent_name": "local-ollama-agent",
            "model": "qwen3"
        }
    }
)
```

This becomes useful when comparing across agents, models and enviroments.

One caveat is that LangSmith is proprietary. Using it means your trace data is sent to LangSmith’s hosted service, and there's usually a cost attached as your usage grows. For this tutorial, it's free as the trace volume is low. For most projects, it will be fine to use LangSmith.

An open-source alternative to LangSmith is [<VPIcon icon="fas fa-globe"/>Langfuse](https://langfuse.com). It provides LLM observability with traces, sessions, metadata, dashboards, and metrics, and it can be self-hosted. It provides similar features like capturing traces of LLM calls, tool executions, timing, inputs, outputs, and metadata, along with customizable dashboards and metadata-based filtering.

---

## Conclusion

In this tutorial, we took a local AI agent and added observability with LangSmith using LangChain v1, Ollama, Qwen, and Python. The result is a simple monitoring and observability setup that shows what the agent did, which tools it called, and how long each step took.

From here, you can extend the setup by adding metadata, creating separate projects for dev and prod, or trying an open-source alternative like Langfuse. The core loop stays the same: run the agent, capture the trace, inspect the result, and use that signal to improve the system.

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](http://darshshah.org/blog) (recent posts include a system design paper series), my work on my personal [<VPIcon icon="fas fa-globe"/>website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Trace and Monitor AI Agents with LangSmith",
  "desc": "In this tutorial, I'll show you how to trace and monitor a local AI agent with LangSmith. We'll build a small local AI agent and then enable LangSmith tracing for it so that we can inspect model calls",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-trace-and-monitor-ai-agents-with-langsmith.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
