---
lang: en-US
title: "How to Build AI Agents That Remember User Preferences (Without Breaking Context)"
description: "Article(s) > How to Build AI Agents That Remember User Preferences (Without Breaking Context)"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build AI Agents That Remember User Preferences (Without Breaking Context)"
    - property: og:description
      content: "How to Build AI Agents That Remember User Preferences (Without Breaking Context)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agents-that-remember-user-preferences-without-breaking-context.html
prev: /programming/py/articles/README.md
date: 2026-02-12
isOriginal: false
author:
  - name: Nataraj Sundar
    url: https://freecodecamp.org/news/author/natarajsundar/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770832641633/da49bdca-617e-4272-b5b7-012f3c6c1d61.png
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
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build AI Agents That Remember User Preferences (Without Breaking Context)"
  desc="Why Personalization Breaks Most AI Agents Personalization is one of the most requested features in AI-powered applications. Users expect an agent to remember their preferences, adapt to their style, and improve over time. In practice, personalization..."
  url="https://freecodecamp.org/news/how-to-build-ai-agents-that-remember-user-preferences-without-breaking-context"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770832641633/da49bdca-617e-4272-b5b7-012f3c6c1d61.png"/>

## Why Personalization Breaks Most AI Agents

Personalization is one of the most requested features in AI-powered applications. Users expect an agent to remember their preferences, adapt to their style, and improve over time.

In practice, personalization is unfortunately also one of the fastest ways to break an otherwise working AI agent.

Many agents start with a simple idea: keep adding more conversation history to the prompt. This approach works for demos, but it quickly fails in real applications. Context windows grow too large. Irrelevant information leaks into decisions. Costs increase. Debugging becomes nearly impossible.

If you want a personalized agent that survives production, you need more than a large language model. You need a way to connect the agent to tools, manage multi-step workflows, and store user preferences safely over time – without turning your system into a tangled mess of prompts and callbacks.

In this tutorial, you’ll learn how to design a personalized AI agent using three core building blocks:

- **Agent Development Kit (ADK)** to orchestrate agent reasoning and execution
- **Model Context Protocol (MCP)** to connect tools with clear boundaries
- **Long-term memory** to store preferences without polluting context

Rather than focusing on setup commands or vendor-specific walkthroughs, we'll focus on the architectural patterns that make personalized agents reliable, debuggable, and maintainable.

![User preferences influence an AI agent’s personalized response](https://cdn.hashnode.com/res/hashnode/image/upload/v1770578645884/2fd77443-31d5-4db3-98f0-bba685122a6f.png)

::: note Prerequisites

To follow along with this tutorial, you should have:

- Basic familiarity with Python
- A general understanding of how large language models work
- Optional: a Google Cloud account if you want to run an end-to-end demo. Otherwise, you can follow the architecture and code patterns locally with stubs. We’ll avoid deep infrastructure setup and focus on design patterns rather than deployment mechanics.

You don’t need prior experience with ADK or MCP. I’ll introduce each concept as it appears.

:::

---

## What “Personalized” Means in a Real AI Agent

![An AI agent accesses external tools through a protocol boundary/control layer](https://cdn.hashnode.com/res/hashnode/image/upload/v1770578714303/4d25a7e4-fcdd-4a1a-a12c-411e41f2021f.png)

Before writing any code, it’s important to define what personalization means in an AI agent.

Personalization is not the same as “remembering everything.” In practice, agent state usually falls into three categories:

1. **Short-term context:** Information needed to complete the current task. This belongs in the prompt.
2. **Session state:** Temporary decisions or selections made during a workflow. This should be structured and scoped to a session.
3. **Long-term memory:** Durable user preferences or facts that should persist across sessions.

![Three panels comparing short-term context, session state, and long-term memory](https://cdn.hashnode.com/res/hashnode/image/upload/v1770577191953/3df5aa02-2eb9-4214-bbef-52f18ddb353a.png)

Most problems happen when these categories are mixed together.

If you store long-term preferences directly in the prompt, the agent’s behavior becomes unpredictable. If you store everything permanently, memory grows without bounds. If you don’t scope memory at all, unrelated sessions start influencing each other.

A well-designed, personalized agent treats memory as a first-class system component, not as extra text added to a prompt.

In the next section, we'll look at how to structure the agent so these concerns stay separated.

By the end of this tutorial, you’ll understand how to design a personalized AI agent that uses long-term memory safely, connects to tools through clear boundaries, and remains debuggable as it grows.

---

## How the Agent Architecture Fits Together

![Reference architecture showing a user, an AI agent core, tools, a memory service, and an orchestration runtime](https://cdn.hashnode.com/res/hashnode/image/upload/v1770577351960/9b14cadf-d650-4098-8ce1-9fd706537bb9.png)
<!-- TODO: mermaid화 -->

The above diagram shows a high-level, personalized AI agent architecture. In it, an agent core handles reasoning and planning while interacting with a tool interface layer, a long-term memory service, and an orchestration runtime.

Let’s now understand the moving parts of a personalized agent and how they interact.

At a high level, the system has four responsibilities:

1. **Reasoning**: deciding what to do next
2. **Execution**: calling tools and services
3. **Memory**: storing and retrieving long-term preferences
4. **Boundaries**: controlling what the agent is allowed to do

A common mistake you’ll see is to blur these responsibilities together. For example, letting the model decide when to write memory, or allowing tools to execute actions without clear constraints.

Instead, you'll design the system so each responsibility has a clear owner. The core components look like this:

- **Agent core**: Handles reasoning and planning
- **Tools**: Perform external actions (read or write)
- **MCP layer**: Defines how tools are exposed and invoked
- **Memory services**: Store long-term user data safely

ADK sits at the center, orchestrating how requests flow between these components. The model never directly talks to databases or services. It reasons about actions, and ADK coordinates execution.

This separation makes the system easier to reason about, debug, and extend.

---

## How to Design the Agent Core with ADK

Before we dive in, a quick note on what ADK is**.**

**Agent Development Kit (ADK)** is an agent orchestration framework – the glue code between a large language model and your application. Instead of treating the model as a black box that directly “does things”, ADK helps you structure the agent as a system:

- The model focuses on **reasoning** (turning user intent, context, and memory into a structured plan)
- Your runtime stays in control of **execution** (deciding which tools can run, how they run, and what gets logged or persisted)

In other words, ADK is what lets you take tool calling and multi-step workflows out of a giant prompt and turn them into a maintainable and testable architecture. In this tutorial, we’ll use ADK to refer to that orchestration layer. The same patterns apply if you use a different agent framework.

::: note

The following code snippets are simplified reference examples intended to illustrate architectural patterns. They’re not production-ready drop-ins.

:::

Once you understand the architecture, you can start designing the agent core. The agent core is responsible for reasoning, not execution.

A helpful mental model is to think of the agent as a planner, not a doer. Its role is to interpret the user’s goal, consider available context and memory, and produce a structured plan that can later be executed in a controlled way.

To make this concrete, the following example shows how an agent can translate user input and memory into an explicit plan. In practice, ADK orchestrates this using a large language model, but the important idea is that the output is structured intent, not side effects.

```py
# Reference example for illustration.

from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class Step:
    tool: str
    args: Dict[str, Any]

@dataclass
class Plan:
    goal: str
    steps: List[Step]

def build_plan(user_text: str, memory: Dict[str, Any]) -> Plan:
    # In practice, the LLM produces this structure via ADK orchestration.
    goal = f"Help user: {user_text}"
    steps = []
    if memory.get("prefers_short_answers"):
        steps.append(Step(tool="set_style", args={"verbosity": "low"}))
    steps.append(Step(tool="search_docs", args={"query": user_text}))
    steps.append(Step(tool="summarize", args={"max_bullets": 5}))
    return Plan(goal=goal, steps=steps)
```

This example illustrates an important constraint: the agent produces a plan, but it doesn’t execute anything directly.

The agent decides *what* should happen and *in what order*, while ADK controls *when* and *how* each step runs. This separation lets you inspect, test, and reason about decisions before they result in real-world actions.

When personalization is involved, this distinction becomes critical. Preferences may influence planning, but execution should remain tightly controlled by the runtime.

Again, we can consider the agent to be a planner, not a doer.

It should not:

- Perform side effects directly
- Write to databases
- Call external APIs without supervision

In ADK, this separation is natural. The agent produces intents and tool calls, while the runtime controls how and when those calls are executed.

This design has two major benefits:

1. **Safety**: you can restrict which tools the agent can access
2. **Debuggability**: you can inspect decisions before execution

When personalization is involved, this becomes even more important. Preferences influence reasoning, but execution should remain tightly controlled.

---

## How to Connect Tools Safely with MCP

![Tool call routed through a control layer with request, validation, execution, and response steps.](https://cdn.hashnode.com/res/hashnode/image/upload/v1770578793149/2e3f8282-341a-4f03-9313-df3f8c9c5174.png)

Tools are how agents interact with the real world. They fetch data, generate artifacts, and sometimes perform actions with side effects.

Without clear boundaries, tool usage quickly becomes a source of fragility. Hardcoded API calls leak into prompts, tools evolve independently, and agents gain more authority than intended.

To avoid these problems, tools should be explicitly registered and invoked through a narrow interface. The following example shows a simple tool registry pattern that mirrors how MCP exposes tools to an agent without tightly coupling it to implementations.

```py
# Reference example (pseudocode for illustration)

from typing import Callable, Dict, Any

ToolFn = Callable[[Dict[str, Any]], Dict[str, Any]]

TOOLS: Dict[str, ToolFn] = {}

def register_tool(name: str):
    def decorator(fn: ToolFn):
        TOOLS[name] = fn
        return fn
    return decorator

@register_tool("search_docs")
def search_docs(args: Dict[str, Any]) -> Dict[str, Any]:
    query = args["query"]
    # Replace with your MCP client call (or local tool implementation).
    return {"results": [f"doc://example?q={query}"]}

def invoke_tool(name: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if name not in TOOLS:
        raise ValueError(f"Tool not allowed: {name}")
    return TOOLS[name](args)
```

The Model Context Protocol (MCP) provides a clean way to formalize this pattern. You can think of MCP the same way operating systems treat system calls.

An application does not directly manipulate hardware. Instead, it requests operations through well-defined system calls. The kernel decides whether the operation is allowed and how it executes.

In the same way, the agent knows *what* capabilities exist, MCP defines *how* those capabilities are invoked, and the runtime controls *when* and *whether* they execute.

This separation prevents several common problems, including hardcoded API details in prompts, unexpected breakage when tools change, and agents performing unrestricted side effects.

When designing tools, it helps to classify them by risk: read tools for safe queries, generate tools for planning or synthesis, and commit tools for irreversible actions. In a personalized agent, commit tools should be rare and tightly guarded.

![Observability around tool calls using logs, traces, and timing across decision points](https://cdn.hashnode.com/res/hashnode/image/upload/v1770580271505/d5d34514-3b98-4997-85ed-dee55e65d711.png)

---

## How to Add Long-Term Memory Without Polluting Context

![Memory candidates extracted from user input, filtered and validated, then stored asynchronously](https://cdn.hashnode.com/res/hashnode/image/upload/v1770577944241/b2a3de65-c5e2-456e-8a33-e9fd4d2695f0.png)

<!-- TODO: mermaid화 -->

Memory is where personalization either succeeds or fails.

You can start by storing everything the user says and feed it back into the prompt. This works briefly, then collapses under its own weight as context grows, costs rise, and behavior becomes unpredictable.

A better approach is to treat memory as structured, curated data so you can control what the agent remembers and why with clear admission rules. Before persisting anything, the system should explicitly decide whether the information is worth remembering. The following function demonstrates a simple memory admission policy.

```py
# Simplified Reference Only
from typing import Optional, Dict, Any

def memory_candidate(user_text: str) -> Optional[Dict[str, Any]]:
    text = user_text.lower()

    # Durable
    if "for this session" in text or "ignore after" in text:
        return None

    # Reusable
    if "my preferred language is" in text:
        return {"type": "preference", "key": "language", "value": user_text.split()[-1]}

    # Safe (basic example; add PII checks for your use case)
    if "password" in text or "ssn" in text:
        return None

    return None  # default: don’t store
```

This policy encodes three questions every memory candidate must answer:

- Is it durable? Will it still matter in the future?
- Is it reusable? Will it influence future decisions meaningfully?
- Is it safe to persist? Does it avoid sensitive or session-specific data?

Only information that passes all three checks should become long-term memory. In practice, this usually includes stable preferences and long-lived constraints, not temporary instructions or intermediate reasoning.

### Privacy, Consent, and Lifecycle Controls (Production Checklist)

Even if your admission rules are solid, long-term memory introduces governance requirements:

- **User control:** allow users to view, export, and delete stored preferences at any time.
- **Sensitive data handling:** never store secrets/PII. Run PII detection on every memory candidate (and consider redaction).
- **Retention + consent:** use explicit consent for persistent memory and apply retention windows (TTL) so memory expires unless it’s still useful.
- **Security + auditability:** encrypt at rest, restrict access by service identity, and keep an audit log of memory writes/updates.

Memory writes should also be asynchronous. The agent should never block while persisting memory, which keeps interactions responsive and avoids coupling reasoning to storage latency.

---

## How the End-to-End Agent Flow Works

![End-to-end flow showing user input, agent reasoning, tool invocation, and memory updates with feedback loops](https://cdn.hashnode.com/res/hashnode/image/upload/v1770578847727/f3cbc4b9-5bc9-4026-ae69-6fd7bc1625fc.png)

At this point, you can trace exactly how memory and tools interact during a single request. With the individual components in place, it’s helpful to see how they work together during a single request. The following example walks through the full lifecycle of a personalized interaction, from user input to response.

```py
# Reference example (pseudocode for illustration)

def handle_request(user_id: str, user_text: str) -> str:
    memory = memory_store.get(user_id)  # e.g., {"prefers_short_answers": True}
    plan = build_plan(user_text, memory)

    tool_outputs = []
    for step in plan.steps:
        out = invoke_tool(step.tool, step.args)
        tool_outputs.append({step.tool: out})

    response = render_response(goal=plan.goal, tool_outputs=tool_outputs, memory=memory)

    cand = memory_candidate(user_text)
    if cand:
        # Never block the user on storage.
        memory_store.write_async(user_id, cand)
    return response
```

At a high level, the flow looks like this:

1. The user sends a message.
2. Relevant long-term memory is retrieved.
3. The agent reasons about the request and produces a plan.
4. ADK invokes tools through MCP as needed.
5. Results flow back to the agent.
6. The agent decides whether new information should be persisted.
7. Memory is written asynchronously.
8. The final response is returned to the user.

Notice what does **not** happen: the model does not directly write memory, tools do not execute without coordination, and context does not grow without bounds. This structure keeps personalization controlled and predictable.

---

## Common Pitfalls You’ll Hit (and How to Avoid Them)

Even with a solid architecture, there are a few failure modes that show up repeatedly in real systems. Many of them stem from allowing agents to perform irreversible actions without explicit checks.

The following example shows a simple guardrail for commit-style tools that require approval before execution.

```py
# Reference example (pseudocode for illustration)

def invoke_commit_tool(name: str, args: Dict[str, Any], approved: bool) -> Dict[str, Any]:
    if not approved:
        # Require explicit confirmation or policy approval before side effects.
        return {"status": "blocked", "reason": "commit tools require approval"}

    # For example: create_ticket, send_email, submit_order, update_record
    return invoke_tool(name, args)
```

This pattern forces a clear decision point before side effects occur. It also creates an audit trail that explains *why* an action was allowed or blocked.

Other common pitfalls include over-personalization, leaky memory that persists session-specific data, uncontrolled tool growth, and debugging blind spots caused by unclear boundaries. If you see these symptoms, it usually means responsibilities are not clearly separated.

---

## What You Learned and Where to Go Next

Personalized AI agents are powerful, but they require discipline. The key insight is that personalization is a **systems problem**, not a prompt problem.

By separating reasoning from execution, structuring memory carefully, and using protocols like MCP to enforce boundaries, you can build agents that scale beyond demos and remain maintainable in production.

As you extend this system, resist the urge to add “just one more prompt tweak.” Instead, ask whether the change belongs in memory, tools, or orchestration.

That mindset will save you time as your agent grows in complexity.

::: info

If you’d like to continue the conversation, you can find me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`natarajsundar`)](https://linkedin.com/in/natarajsundar/).

:::

::: note

All diagrams in this article were created by the author for educational purposes.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI Agents That Remember User Preferences (Without Breaking Context)",
  "desc": "Why Personalization Breaks Most AI Agents Personalization is one of the most requested features in AI-powered applications. Users expect an agent to remember their preferences, adapt to their style, and improve over time. In practice, personalization...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-agents-that-remember-user-preferences-without-breaking-context.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
