---
lang: en-US
title: "The Rise of AI Agents: How Software Is Learning to Act"
description: "Article(s) > The Rise of AI Agents: How Software Is Learning to Act"
icon: iconfont icon-typescript
category:
  - Python
  - AI
  - LLM
  - OpenAI
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Rise of AI Agents: How Software Is Learning to Act"
    - property: og:description
      content: "The Rise of AI Agents: How Software Is Learning to Act"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-rise-of-ai-agents-how-software-is-learning-to-act.html
prev: /programming/py/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1351f6d0-79c2-491b-a8e7-943cc9ece905.png
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

[[toc]]

---

<SiteInfo
  name="The Rise of AI Agents: How Software Is Learning to Act"
  desc="Software has always been reactive. You click a button, it responds. You call an API, it returns data. Even the most sophisticated systems have historically depended on explicit instructions and tightl"
  url="https://freecodecamp.org/news/the-rise-of-ai-agents-how-software-is-learning-to-act"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1351f6d0-79c2-491b-a8e7-943cc9ece905.png"/>

Software has always been reactive.

You click a button, it responds. You call an API, it returns data.

Even the most sophisticated systems have historically depended on explicit instructions and tightly defined workflows. That model is starting to break.

A new class of software is emerging that doesn't just respond, but act.

This shift isn't cosmetic. It changes how software is designed, how systems are operated, and how work itself is executed.

Instead of encoding every step of a workflow, developers are now defining goals, constraints, and tools, then letting software figure out the execution path. The result is software that behaves less like a function and more like an operator.

In this article, you'll learn what AI agents actually are, how they differ from traditional software systems, and why they're starting to represent a major shift in modern software design.

This article is written for developers, technical founders, engineering managers, and anyone building software systems with AI components.

You don't need prior experience building AI agents, but it helps to be familiar with Basic Python syntax and Large language models (LLMs)

---

## From Deterministic Systems to Goal-Driven Execution

Traditional software systems are deterministic. Given the same input, they produce the same output.

This predictability is what makes them reliable, but it's also what limits them. Any variation in workflow requires new code, new conditions, and new branches.

AI agents introduce a different model. They're goal-driven rather than instruction-driven. Instead of specifying every step, you define an objective and provide access to tools. The agent decides how to achieve the objective, often adapting in real time.

Consider a simple task like summarizing a set of documents and emailing the result. In a traditional system, you would write a pipeline that loads documents, processes them, formats the output, and sends an email. Each step is explicitly coded.

With an agent, the system might look more like this:

```py
from openai import OpenAI

client = OpenAI()
goal = "Summarize all documents in /reports and email a concise briefing to the leadership team"
tools = [
    "read_files",
    "summarize_text",
    "send_email"
]
response = client.responses.create(
    model="gpt-4.1",
    input=f"Goal: {goal}. Available tools: {tools}"
)
print(response.output_text)
```

This example is simplified, but it captures the shift. The developer defines intent and capability. The agent determines execution.

---

## The Core Components of an AI Agent

To understand how agents work, it helps to break them into components. At a high level, most agents consist of reasoning, memory, and tools.

Reasoning is handled by a large language model. This is what allows the agent to interpret goals, plan actions, and adapt when something fails. It's not just generating text, it's generating decisions.

Memory allows the agent to maintain context across steps. Without memory, the agent behaves like a stateless function. With memory, it can track progress, recall past actions, and refine its approach.

[**Tools are what make the agent useful**](/freecodecamp.org/how-to-build-your-first-mcp-server-using-fastmcp.md). A tool can be anything from an API to a database query to a shell command. The agent doesn't need to know how the tool works internally. It only needs to know when and how to use it.

Here is a minimal example of tool usage in an agent loop:

```py
def agent_loop(goal, tools):
    context = []
    
    while True:
        prompt = f"Goal: {goal}\nContext: {context}\nWhat should be done next?"
        
        decision = model.generate(prompt)
        
        if decision == "DONE":
            break
        
        if decision.startswith("USE_TOOL"):
            tool_name, tool_input = parse_tool_call(decision)
            result = tools[tool_name](tool_input)
            context.append(result)
        else:
            context.append(decision)
    
    return context
```

This loop is where the agent “acts.” It observes, decides, executes, and updates its understanding.

---

## Why AI Agents Are Emerging Now

The idea of autonomous software isn't new. What has changed is the capability of the underlying models.

Large language models can now reason across multiple steps, interpret unstructured inputs, and generate structured outputs that can drive real systems.

Equally important is the ecosystem around them. APIs are more standardized, infrastructure is more programmable, and data is more accessible. This makes it easier to expose tools and let them interact with real systems helping build some of the [<VPIcon icon="fas fa-globe"/>best AI agents](https://nexos.ai/blog/best-ai-agents/) in use today.

There's also an economic driver. Many workflows today are still manual, even in highly digitized organizations. These workflows often involve coordination across systems, interpretation of data, and decision-making under uncertainty. This is exactly the kind of work agents are suited for.

---

## The Illusion and Reality of Autonomy

It's tempting to describe AI agents as fully autonomous. In practice, most are not. They operate within constraints defined by developers. They rely on tools that expose only certain actions. They're often monitored, rate-limited, and evaluated at each step.

What makes them different isn't complete autonomy, but partial autonomy. They can decide how to execute within a bounded environment.

This distinction matters because it affects how systems are designed. You're not building a system that always behaves predictably. You're building a system that explores a solution space and converges on an outcome.

That introduces new challenges. Agents can take inefficient paths. They can misinterpret goals. They can fail in ways that are hard to debug because the failure isn't a single error, but a chain of decisions.

---

## Designing Agents That Work in Practice

Building an agent is easy. Building one that works reliably is harder. The difference comes down to control.

One approach is to constrain the agent’s [<VPIcon icon="fas fa-globe"/>action space](https://milvus.io/ai-quick-reference/what-is-an-action-space-in-rl). Instead of giving it open-ended access, you define a limited set of tools with clear interfaces. This reduces ambiguity and makes behavior more predictable.

Another approach is to introduce intermediate checkpoints. Instead of letting the agent run freely, you validate its decisions at key steps. You can do this through rules, secondary models, or even human review.

Here's an example of adding a validation layer:

```py
def safe_execute(tool, input_data):
    if not validate_input(tool, input_data):
        return "Invalid input"
    
    result = tool(input_data)
    
    if not validate_output(tool, result):
        return "Invalid output"
    
    return result
```

This pattern is critical in production systems. It turns an unconstrained agent into a controlled system that can still adapt, but within safe boundaries.

---

## Multi-Agent Systems and Coordination

As agents become more capable, a single agent is often not enough. Complex tasks can be decomposed into multiple agents, each responsible for a specific function.

For example, one agent might handle data retrieval, another might handle analysis, and a third might handle communication. These agents can coordinate by passing structured messages.

```py
class Message:
    def __init__(self, sender, receiver, content):
        self.sender = sender
        self.receiver = receiver
        self.content = content

def send_message(agent, message):
    return agent.process(message)
message = Message("retriever", "analyst", "Data collected from API")
response = send_message(analyst_agent, message)
```

This model starts to resemble a distributed system, but with agents instead of services. Coordination becomes a first-class concern. You need to define protocols, handle failures, and ensure consistency across agents.

---

## Where AI Agents Are Already Delivering Value

Despite the hype, there are concrete areas where agents are already useful. Internal tooling is one of them. Automating repetitive workflows, generating reports, and orchestrating tasks across systems are all well-suited for agents.

Customer support is another area. Agents can handle complex queries that require accessing multiple systems, not just retrieving canned responses.

Security and compliance workflows are also a strong fit. These often involve monitoring signals, correlating data, and taking action based on rules that aren't always deterministic.

What these use cases have in common is that they involve structured environments with clear objectives and measurable outcomes. Agents perform best when the problem space is bounded, even if the execution path is not.

---

## The Shift in Software Design

The rise of AI agents isn't just about adding a new feature. It's about changing the abstraction layer of software.

Instead of writing code that directly implements behavior, you're designing systems that enable behavior. You define goals, expose capabilities, and enforce constraints. The actual execution becomes dynamic.

This requires a different mindset. Debugging is no longer just about tracing code. It's about understanding decision paths. Testing is no longer just about input-output pairs. It's about evaluating behavior across scenarios.

Observability becomes critical. You need to log not just what the system did, but why it did it. This includes prompts, intermediate decisions, and tool interactions.

---

## What Comes Next

AI agents are still in the relatively early stages. The current generation is powerful but imperfect. Reliability is a major challenge. So is cost, especially when agents require multiple model calls per task.

But the direction is clear: software is moving from static execution to dynamic action. The boundary between user and system is becoming less rigid. Instead of telling software what to do step by step, users will increasingly define outcomes and let systems figure out the rest.

This doesn't eliminate the need for engineers. It changes what engineers do. The focus shifts from implementing logic to designing systems that can reason, act, and adapt.

The rise of AI agents marks a transition. Software is no longer just a tool. It's becoming an actor.

::: info About Author

Join my [<VPIcon icon="fas fa-globe"/>Applied AI newsletter](https://applyaito.substack.com/) to learn how to build and ship real AI systems. Practical projects, production-ready code, and direct Q&A. You can also* [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Rise of AI Agents: How Software Is Learning to Act",
  "desc": "Software has always been reactive. You click a button, it responds. You call an API, it returns data. Even the most sophisticated systems have historically depended on explicit instructions and tightl",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-rise-of-ai-agents-how-software-is-learning-to-act.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
