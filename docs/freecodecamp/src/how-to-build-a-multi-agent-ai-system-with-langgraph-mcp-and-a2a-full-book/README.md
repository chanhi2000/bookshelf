---
lang: en-US
title: "How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]"
description: "Article(s) > How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]"
icon: iconfont icon-mcp
category:
  - Python
  - Streamlit
  - DevOps
  - Docker
  - AI
  - LLM
  - LangGraph
  - MCP
  - Ollama
  - Alibaba
  - Qwen
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - streamlit
  - py-streamlit
  - devops
  - docker
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langgraph
  - lang-graph
  - mcp
  - model-context-protocols
  - ollama
  - alibaba
  - qwen
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]"
    - property: og:description
      content: "How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-agent-ai-system-with-langgraph-mcp-and-a2a-full-book/
prev: /ai/mcp/articles/README.md
date: 2026-04-30
isOriginal: false
author:
  - name: Sandeep Bharadwaj Mannapur
    url: https://freecodecamp.org/news/author/sandeep-mannapur/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/41b8ee2f-3097-497e-b008-0259f6c10772.png
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
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangGraph > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langgraph/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
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
  "title": "Qwen > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/qwen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]"
  desc="Building a single AI agent that answers questions or runs searches is a solved problem. A handful of tutorials and a few hours of work will get you there. What most tutorials skip is the engineering l"
  url="https://freecodecamp.org/news/how-to-build-a-multi-agent-ai-system-with-langgraph-mcp-and-a2a-full-book"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/41b8ee2f-3097-497e-b008-0259f6c10772.png"/>

Building a single AI agent that answers questions or runs searches is a solved problem. A handful of tutorials and a few hours of work will get you there.

What most tutorials skip is the engineering layer that comes next: the part that makes a multi-agent system reliable enough to run in production.

How do you recover state after a process crash? How do you give agents standardized access to tools without writing a proprietary adapter for every integration? How do you coordinate agents built with different frameworks? How do you know when agent output quality is degrading?

These are infrastructure questions, and this book answers them with working code you can run on your own machine. No cloud accounts, no API keys, no ongoing cost.

You'll work with four technologies that tackle these problems at the protocol level:

1. **LangGraph** for stateful agent orchestration,
2. **MCP (Model Context Protocol)** for standardized tool integration,
3. **A2A (Agent-to-Agent Protocol)** for cross-framework agent coordination, and
4. **Ollama** for local LLM inference.

To make every concept concrete, you'll build a real system throughout: a Learning Accelerator that plans study roadmaps, explains topics from your own notes, runs quizzes, and adapts based on the results. The use case is the teaching vehicle. The architecture is the real subject.

That architecture pattern (specialized agents coordinating through open protocols) runs in production today for sales enablement (agents that onboard reps and adapt training paths), compliance training (agents that certify employees through regulatory curricula), customer support (agents that build knowledge bases and track escalation topics), and engineering onboarding (agents that walk new hires through codebases).

The domain changes. The infrastructure patterns don't.

::: info 📦 Get the Complete Code

The full ready-to-run repository for this handbook [is on GitHub here (<VPIcon icon="iconfont icon-github"/>`sandeepmb/freecodecamp-multi-agent-ai-system`)](http://github.com/sandeepmb/freecodecamp-multi-agent-ai-system). Clone it and follow along, or use it as a reference implementation while you read.

<SiteInfo
  name="sandeepmb/freecodecamp-multi-agent-ai-system"
  desc="Contribute to sandeepmb/freecodecamp-multi-agent-ai-system development by creating an account on GitHub."
  url="https://github.com/sandeepmb/freecodecamp-multi-agent-ai-system/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/47e56f0046e6eed35dca20cf91cea2bd02e048d3a534078dc7a7b2fdab77f130/sandeepmb/freecodecamp-multi-agent-ai-system"/>

:::

---

## Table of Contents

- [Chapter 1: When to Use Multiple Agents](#heading-chapter-1-when-to-use-multiple-agents)
- [Chapter 2: Stateful Orchestration with LangGraph](#heading-chapter-2-stateful-orchestration-with-langgraph)
- [Chapter 3: Standardized Tool Access with MCP](#heading-chapter-3-standardized-tool-access-with-mcp)
- [Chapter 4: Building the Four-Agent System](#heading-chapter-4-building-the-four-agent-system)
- [Chapter 5: State Persistence and Human Oversight](#heading-chapter-5-state-persistence-and-human-oversight)
- [Chapter 6: Observability with Langfuse](#heading-chapter-6-observability-with-langfuse)
- [Chapter 7: Evaluating Agent Quality with DeepEval](#heading-chapter-7-evaluating-agent-quality-with-deepeval)
- [Chapter 8: Cross-Framework Coordination with A2A](#heading-chapter-8-cross-framework-coordination-with-a2a)
- [Chapter 9: The Complete System and What's Next](#heading-chapter-9-the-complete-system-and-whats-next)

---

## Introduction

::: info What You'll Build

The system you'll build has four agents coordinated by LangGraph, two MCP servers giving those agents access to external tools, two A2A services that allow cross-framework agent delegation, Langfuse capturing full traces, and DeepEval running automated quality checks.

Here is what that looks like end to end:

![Figure 1. The complete system. LangGraph orchestrates the four agents. Each agent accesses tools through MCP. The Progress Coach delegates to external agents via A2A, including a CrewAI agent, a different framework entirely. Ollama runs all inference locally. Langfuse captures every trace.](https://cdn.hashnode.com/uploads/covers/6983b18befedc65b9820e223/4bcaabd4-644a-4787-a8ae-de0c4e7ca73c.png)

:::

You'll build each layer incrementally. By the time the system is complete, you'll understand not just how to wire these technologies together but why each one exists and what production failure mode it prevents.

### The Technology Stack

| Technology | Version | Role |
| --- | --- | --- |
| LangGraph | 1.1.0 | Stateful multi-agent graph orchestration |
| MCP | 1.26.0 | Standardized agent-to-tool protocol |
| A2A SDK | 0.3.25 | Cross-framework agent-to-agent protocol |
| Ollama | latest | Local LLM inference (no API keys) |
| CrewAI | 1.13.0 | Cross-framework interop via A2A |
| Langfuse | 4.0.1 | Distributed tracing and observability |
| DeepEval | 3.9.1 | LLM-as-judge evaluation |

### Prerequisites

You should be comfortable with:

- **Python 3.11 or higher**: type hints, dataclasses, async/await basics
- **Basic LLM concepts**: prompts, completions, tool calling
- **Command line**: creating virtual environments, running scripts

You don't need prior experience with LangGraph, MCP, A2A, or any agent framework. This handbook builds from first principles.

### Hardware Requirements

| Setup | RAM | VRAM | Model | Notes |
| --- | --- | --- | --- | --- |
| Minimum | 16 GB | 8 GB | `qwen2.5:7b` | Fully functional |
| Recommended | 32 GB | 24 GB | `qwen2.5-coder:32b` | Best tool-calling reliability |
| CPU-only | 32 GB | None | `qwen2.5:7b` | Works but 5 to 10 times slower |

### 💡 Why Model Size Matters for Agents

Agents call tools by generating structured JSON arguments. A model that hallucinates tool names or misformats arguments fails silently: the tool call doesn't execute, the agent loops, and you hit the iteration limit without a clear error.

Models under 7B parameters produce these JSON formatting errors frequently. The 7 to 9B range is the minimum viable tier for reliable tool calling in production.

---

## Chapter 1: When to Use Multiple Agents

Before writing any code, you should answer a question that most multi-agent tutorials skip entirely: does your problem actually need multiple agents?

This matters because adding agents has a real cost. More agents means more moving parts, more potential failure points, shared state that can be corrupted from multiple directions, and debugging that requires following execution across process boundaries. A single agent with good tools is often the simpler, faster, and more reliable solution.

So the question isn't "should I use multiple agents?" as though multi-agent is inherently superior. The question is "does my problem have characteristics that justify the coordination overhead?"

### 1.1 When a Single Agent is the Right Answer

A single agent is usually the right architecture when the problem has one primary job that fits in one context window.

An agent that researches a topic and summarizes it: one job, one context window, one agent. An agent that reviews a pull request and posts comments: one job. An agent that answers customer questions from a knowledge base: one job. An agent that extracts structured data from a document: one job.

In these cases, adding a second agent doesn't simplify anything. It adds a coordination layer, a shared state contract, a new failure surface, and debugging complexity, in exchange for no architectural benefit. The single agent does the whole job. You give it good tools and it works.

The model for a single agent is straightforward:

```plaintext
User input → Agent (with tools) → Response
```
<!-- TODO: mermiad화-->

The agent may call tools in a loop (search, read, write, verify) but a single LLM with the right tool access handles the full task. This is the right starting point for most AI automation work, and it's often the right finishing point too.

### 1.2 The Real Criteria for Multiple Agents

A problem warrants multiple agents when it has *genuinely distinct specializations*: subtasks so different in their tools, LLM call patterns, temperature requirements, or failure modes that combining them into one agent creates more problems than it solves.

Here are the specific conditions that justify the coordination overhead:

#### Different tools for different subtasks

If one part of the workflow needs filesystem access, another needs database writes, and a third needs to call an external API, there's a natural seam for agent separation.

Each agent uses only the tools it needs, which means each agent is easier to test and reason about in isolation.

#### Different LLM call patterns

Some tasks need a single structured output call with `temperature=0`. Others need a multi-turn tool-calling loop that terminates when the LLM decides it has enough context.

Mixing these patterns in one agent creates a function that does too many different things and fails in different ways depending on which path executes.

#### Different temperature and model requirements

Structured planning output wants low temperature for consistency. Creative explanation wants slightly higher temperature for variety. Grading wants low temperature for analytical consistency.

If these three tasks share one agent with one temperature setting, you're making compromises in every direction.

#### Fault isolation requirements

If one subtask can fail without stopping the others, you need a boundary between them. An agent that plans a curriculum can succeed even if the quiz grading service is temporarily down. If they're in the same process with the same failure surface, a grading error takes down planning too.

#### Independent deployment needs

If different parts of the system might need to run at different scales, be updated independently, or be built by different teams using different frameworks, agent separation maps to deployment separation. The A2A protocol (Chapter 8) makes this concrete.

#### Cross-framework collaboration

If you want to use a CrewAI agent for one task and a LangGraph agent for another, because different frameworks have different strengths, you need a protocol for them to communicate. That protocol is A2A.

None of these conditions by themselves mandate multi-agent. Two of them probably do. All of them make a strong case.

### 1.3 The Cost You're Paying

Before committing to a multi-agent architecture, name what you're paying for it.

**Shared state complexity:** Every agent reads from and writes to a shared state object. If two agents write to the same field, you need a merge strategy. If one agent writes bad data, every subsequent agent gets bad input.

The state definition becomes a contract that all agents must honor, and changes to that contract require updating every agent.

**Harder debugging:** A failure in a single agent shows up in one stack trace. A failure in a multi-agent system might be caused by bad output from three steps earlier, persisted in state, passed to a second agent, which produced output that caused the failure you're seeing now. The chain of causation crosses agent boundaries.

**Latency multiplication:** Each agent makes at least one LLM call. A four-agent system makes a minimum of four LLM calls per session, often more when agents use tools in loops. At 2 to 5 seconds per Ollama call, that adds up quickly.

**More infrastructure:** Multi-agent systems benefit from state persistence, observability, evaluation, and human oversight, all of which take time to set up. A single agent can often run without any of this. A multi-agent system in production really can't.

You should go into a multi-agent architecture with eyes open about these costs, and you should be able to name the specific benefits that justify them.

### 1.4 Why This System Uses Four Agents

The Learning Accelerator uses four agents. Here is the honest technical justification for each separation – again, not because multi-agent is better, but because these four tasks are different enough that combining any two would make the combined agent worse at both.

| Agent | What it does | Why it's a separate agent |
| --- | --- | --- |
| **Curriculum Planner** | Takes a learning goal, produces a structured study roadmap | One LLM call, `temperature=0.1`, `format="json"`. Zero tools. Fast, deterministic, fails fast on bad input. Mixing tool-calling behavior here would add noise to structured output. |
| **Explainer** | Reads source notes via MCP, explains topics to the student | Multi-turn tool-calling loop. `temperature=0.3`. Loop count is non-deterministic: the LLM decides when it has enough context. Completely different execution pattern from the Planner. |
| **Quiz Generator** | Generates questions (creative), then grades answers (analytical) | Two separate LLM calls with different temperatures. Interactive: pauses for user input. Also runs as a standalone A2A service (Chapter 8). Can't do this if bundled with another agent. |
| **Progress Coach** | Synthesizes results, updates topic status, routes to next topic or ends | Makes the only cross-agent A2A call (to the CrewAI Study Buddy). Reads and writes MCP memory. Manages the routing decision that determines whether the graph loops or ends. |

The Curriculum Planner and Explainer alone justify separation: one does structured JSON output with no tools, the other does a multi-turn tool-calling loop. Putting these in one agent means one function that sometimes calls tools in a loop and sometimes doesn't, at different temperatures, returning different types of output. That's not one agent with a broad capability. That's two agents pretending to be one.

The Quiz Generator's dual-temperature pattern (creative question generation at 0.4, analytical grading at 0.1) and its need to run as a standalone A2A service make the case for its own boundary.

The Progress Coach is the coordinator. It synthesizes everything and makes the routing decision, which is exactly the wrong job to share with any other agent.

This is the pattern worth looking for in your own problems: if you can't explain why two tasks should be the same agent, they probably shouldn't be.

The same reasoning applies in production systems. A compliance training platform has a curriculum agent (builds the certification path), a content delivery agent (presents regulatory material from a content MCP server), an assessment agent (tests comprehension, records results), and a certification agent (evaluates readiness, issues certificates).

Each has different tools, different failure modes, and different update cadences. The separation isn't architectural philosophy. It's the direct consequence of what each task needs.

### 1.5 Setting Up the Project

With the architectural reasoning established, let's build the system.

#### Install Ollama and pull your model

Ollama runs local LLMs as an OpenAI-compatible server on `localhost:11434`.

macOS and Linux:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

Windows: Download the installer from [<VPIcon icon="iconfont icon-ollama"/>ollama.com](https://ollama.com) and run it.

Pull the model that matches your hardware:

```sh
# 8 GB VRAM
ollama pull qwen2.5:7b

# 24 GB VRAM: stronger tool calling, recommended if you have it
ollama pull qwen2.5-coder:32b

# Verify it works
ollama run qwen2.5:7b "Say hello in one sentence."
```

You should see a short response. Keep Ollama running as a background server: it stays alive between calls.

#### Clone the repository

```sh
git clone https://github.com/sandeepmb/freecodecamp-multi-agent-ai-system
cd freecodecamp-multi-agent-ai-system
```

#### Set up the virtual environment

```sh
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

The <VPIcon icon="fas fa-file-lines"/>`requirements.txt` pins every dependency to a tested version:

```plaintext title="requirements.txt"
langgraph==1.1.0
langgraph-checkpoint-sqlite==3.0.3
langchain-core==1.0.0
langchain-ollama==1.0.0

mcp==1.26.0
a2a-sdk==0.3.25
crewai==1.13.0

langfuse==4.0.1
deepeval==3.9.1

litellm==1.82.4
openai==2.8.0
httpx==0.28.1
fastapi==0.115.0
uvicorn==0.34.0
streamlit==1.43.2

pydantic==2.11.9
python-dotenv==1.1.1
tenacity==8.5.0

pytest==8.3.0
pytest-asyncio==0.25.0
```

::: warning Don't upgrade dependency versions

The agent frameworks in this stack, particularly LangGraph, langchain-core, and the A2A SDK, have breaking changes between minor versions. The pinned versions are tested together. Running `pip install --upgrade` on any of them risks breaking imports or behavior.

:::

#### Configure your environment

```sh
cp .env.example .env
```

Open <VPIcon icon="iconfont icon-dotenv"/>`.env` and set your model:

```sh title=".env"
# .env: set this to match what you pulled
OLLAMA_MODEL=qwen2.5:7b
OLLAMA_BASE_URL=http://localhost:11434

# Storage
CHECKPOINT_DB=data/checkpoints.db
NOTES_PATH=study_materials/sample_notes

# A2A services (used in Chapter 8)
QUIZ_SERVICE_URL=http://localhost:9001
STUDY_BUDDY_URL=http://localhost:9002
USE_A2A_QUIZ=true
USE_STUDY_BUDDY=true

# Langfuse: leave empty for now, configured in Chapter 6
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_HOST=http://localhost:3000
```

#### Verify the setup

```sh
python main.py --help
```

You should see the argparse help output with no errors. If you see import errors, check that the virtual environment is activated.

::: note 📌 Checkpoint

You have Ollama running, dependencies installed, and the environment configured. The project structure looks like this:

```sh title="file structure"
freecodecamp-multi-agent-ai-system/
├── src/
│   ├── agents/           # LangGraph agent nodes
│   ├── graph/            # State definition and workflow
│   ├── mcp_servers/      # MCP tool servers
│   ├── a2a_services/     # A2A protocol services and client
│   ├── crewai_agent/     # CrewAI agent served via A2A
│   └── observability/    # Langfuse setup
├── tests/                # Unit and evaluation tests
├── study_materials/
│   └── sample_notes/     # Markdown files the Explainer reads
├── docs/
├── data/                 # SQLite checkpoint DB (created at runtime)
├── main.py
├── Makefile
├── docker-compose.yml    # Langfuse local stack
├── requirements.txt
└── .env.example
```

Everything in <VPIcon icon="fas fa-folder-open"/>`src/` follows the standard Python <VPIcon icon="fas fa-folder-open"/>`src/` layout. The <VPIcon icon="iconfont icon-toml"/><VPIcon icon="iconfont icon-toml"/>`pyproject.toml` adds <VPIcon icon="fas fa-folder-open"/>`src/` to the Python path so tests can import `from graph.state import AgentState` without path gymnastics.

:::

In the next chapter, you'll build the first piece of the system: the LangGraph graph that coordinates all four agents. You'll start with the shared state definition that every agent reads and writes.

---

## Chapter 2: Stateful Orchestration with LangGraph

LangGraph models a multi-agent workflow as a directed graph. Nodes are Python functions: your agent code. Edges define the routing between them. Every node reads from and writes to a shared state object. LangGraph checkpoints that state to SQLite after every node runs.

That last part is what makes it a production tool rather than a convenience wrapper. A naïve multi-agent loop written as a `for` loop loses everything the moment it crashes. LangGraph doesn't. The checkpoint survives the crash, and `graph.invoke()` with the same session ID picks up exactly where it left off.

This chapter builds the graph foundation: the shared state definition that all four agents use, the first working agent node, and the graph that wires it together.

### 2.1 The Shared State

Every node in the graph receives the complete state as a `dict` and returns a partial update with only the keys it changed. LangGraph merges that update into the full state and saves a checkpoint before calling the next node.

The state definition in <VPIcon icon="fas fa-folder-open"/>`src/graph/`<VPIcon icon="fa-brands fa-python"/>`state.py` starts with four dataclasses that hold structured data, then defines the `AgentState` TypedDict that LangGraph manages:

```py :collapsed-lines title="graph/state.py"
from __future__ import annotations

import json
from dataclasses import dataclass, field, asdict
from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


@dataclass
class Topic:
    """A single topic within the study roadmap."""
    title: str
    description: str
    estimated_minutes: int
    prerequisites: list[str] = field(default_factory=list)
    # pending → in_progress → completed | needs_review
    status: str = "pending"

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> "Topic":
        return cls(
            title=data["title"],
            description=data["description"],
            estimated_minutes=data["estimated_minutes"],
            prerequisites=data.get("prerequisites", []),
            status=data.get("status", "pending"),
        )


@dataclass
class StudyRoadmap:
    """The full study plan produced by the Curriculum Planner."""
    goal: str
    total_weeks: int
    topics: list[Topic]
    weekly_hours: int = 5

    def is_complete(self) -> bool:
        return all(t.status in ("completed", "needs_review") for t in self.topics)


@dataclass
class QuizResult:
    """The complete result of one quiz session on a single topic."""
    topic: str
    questions: list
    score: float       # 0.0 to 1.0
    weak_areas: list[str]
    timestamp: str = ""

    def passed(self) -> bool:
        return self.score >= 0.5


class AgentState(TypedDict):
    """
    The shared state for the Learning Accelerator graph.

    Partial updates: when a node returns {"approved": True}, LangGraph
    merges that into the existing state. It does NOT replace the whole dict.
    Nodes only return the keys they changed.

    The one exception is `messages`: it uses the add_messages reducer,
    which appends to the list instead of replacing it.
    """
    messages: Annotated[list[BaseMessage], add_messages]
    session_id: str
    goal: str
    roadmap: StudyRoadmap | None
    approved: bool
    current_topic_index: int
    quiz_results: list[QuizResult]
    weak_areas: list[str]
    study_materials_path: str
    error: str | None
```

A few design decisions worth understanding here.

::: important Why TypedDict and not a regular class?

LangGraph requires dict-compatible objects. TypedDict gives you type safety (your IDE catches misspelled keys) while remaining dict-compatible. It's the right tool for this specific use case.

:::

::: important Why `add_messages` on the `messages` field?

Every other field in `AgentState` uses last-write-wins semantics. If two nodes write to `roadmap`, the second one wins. But conversation messages should accumulate. The `add_messages` reducer tells LangGraph to append new messages rather than replace the list. This preserves the full conversation history across all agent calls.

:::

::: important Why dataclasses for `Topic`, `StudyRoadmap`, and `QuizResult`?

Because agents need to read and update structured data without accidentally typo-ing a key. `topic.title` raises an `AttributeError` immediately if the field doesn't exist. `topic["titl"]` silently returns `None`. For structured data that multiple agents touch, dataclasses are safer than plain dicts.

:::

The <VPIcon icon="fas fa-folder-open"/>`src/graph/`<VPIcon icon="fa-brands fa-python"/>`state.py` file also contains three utility functions that agent nodes use to read from state safely:

```py title="graph/state.py (continued)"
def initial_state(
    goal: str,
    session_id: str,
    study_materials_path: str = "study_materials/sample_notes",
) -> dict:
    """Create the initial state for a new study session."""
    return {
        "messages": [],
        "session_id": session_id,
        "goal": goal,
        "roadmap": None,
        "approved": False,
        "current_topic_index": 0,
        "quiz_results": [],
        "weak_areas": [],
        "study_materials_path": study_materials_path,
        "error": None,
    }


def get_current_topic(state: dict) -> Topic | None:
    """Get the topic currently being studied, or None if done."""
    roadmap = state.get("roadmap")
    if roadmap is None:
        return None
    idx = state.get("current_topic_index", 0)
    if idx >= len(roadmap.topics):
        return None
    return roadmap.topics[idx]


def session_is_complete(state: dict) -> bool:
    """True when all topics have been studied."""
    roadmap = state.get("roadmap")
    if roadmap is None:
        return True
    idx = state.get("current_topic_index", 0)
    return idx >= len(roadmap.topics)
```

`initial_state()` is always how you create a new session. Never build the dict manually. It ensures every field has a valid default and no required key is accidentally missing.

### 2.2 The Curriculum Planner: the First Agent Node

The Curriculum Planner is the simplest agent in the system: one LLM call, one JSON response, one dataclass output. No tools, no loops. It demonstrates the pattern every agent follows: read from state, call LLM, parse output, return partial state update.

```py title="agents/curriculum_planner.py"
import json
import os

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_ollama import ChatOllama

from graph.state import StudyRoadmap, Topic

MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

PLANNER_SYSTEM_PROMPT = """You are an expert curriculum designer. Your job is to
create a structured study roadmap when given a learning goal.

Return ONLY valid JSON with no prose, no markdown code fences, no explanation.
The JSON must match this exact schema:

{
  "goal": "the original learning goal exactly as given",
  "total_weeks": <integer between 1 and 12>,
  "weekly_hours": <integer between 3 and 10>,
  "topics": [
    {
      "title": "Short topic name (3-6 words)",
      "description": "One clear sentence explaining what this topic covers",
      "estimated_minutes": <integer between 30 and 120>,
      "prerequisites": ["title of earlier topic if required, else empty list"],
      "status": "pending"
    }
  ]
}

Rules:
- Order topics from foundational to advanced
- prerequisites must reference earlier topic titles exactly as written
- Aim for 4 to 6 topics
- status must always be "pending"
"""
```

Two things about the model setup here. First, `temperature=0.1`. Very low, because structured JSON output needs consistency. A higher temperature introduces variation that makes JSON parsing unreliable.

Second, `format="json"`. This is Ollama's JSON mode, a constraint at the inference level. The model can't produce output that isn't valid JSON, regardless of what the prompt asks. It's stronger than just telling the model to output JSON in the system prompt.

```py
def build_planner_llm() -> ChatOllama:
    return ChatOllama(
        model=MODEL_NAME,
        base_url=OLLAMA_BASE_URL,
        temperature=0.1,
        format="json",
    )
```

The parser is separated from the node function intentionally. This makes it independently testable without an LLM call. All 11 unit tests in <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_curriculum_planner.py` call `parse_roadmap_json()` directly:

```py :collapsed-lines title="tests/test_curriculum_planner.py"
def parse_roadmap_json(json_string: str) -> StudyRoadmap:
    """Parse the LLM's JSON output into a StudyRoadmap dataclass."""
    try:
        data = json.loads(json_string)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"LLM returned invalid JSON.\n"
            f"Error: {e}\n"
            f"Raw output (first 300 chars): {json_string[:300]}"
        )

    required = ["goal", "total_weeks", "topics"]
    for field in required:
        if field not in data:
            raise ValueError(f"LLM JSON missing required field: '{field}'")

    if not isinstance(data["topics"], list) or len(data["topics"]) == 0:
        raise ValueError("LLM JSON 'topics' must be a non-empty list")

    topics = []
    for i, t in enumerate(data["topics"]):
        for field in ["title", "description", "estimated_minutes"]:
            if field not in t:
                raise ValueError(f"Topic {i} missing required field: '{field}'")
        topics.append(Topic(
            title=t["title"],
            description=t["description"],
            estimated_minutes=int(t["estimated_minutes"]),
            prerequisites=t.get("prerequisites", []),
            status=t.get("status", "pending"),
        ))

    return StudyRoadmap(
        goal=data["goal"],
        total_weeks=int(data["total_weeks"]),
        weekly_hours=int(data.get("weekly_hours", 5)),
        topics=topics,
    )
```

The node function itself follows the same pattern that every agent in this system uses:

```py :collapsed-lines title="tests/test_curriculum_planner.py"
def curriculum_planner_node(state: dict) -> dict:
    """
    LangGraph node: Curriculum Planner

    Reads:  state["goal"]
    Writes: state["roadmap"], state["messages"], state["error"]
    """
    goal = state.get("goal", "").strip()
    if not goal:
        return {"error": "No learning goal provided."}

    print(f"\n[Curriculum Planner] Building roadmap for: '{goal}'")

    llm = build_planner_llm()
    messages = [
        SystemMessage(content=PLANNER_SYSTEM_PROMPT),
        HumanMessage(content=f"Create a study roadmap for: {goal}"),
    ]

    print(f"[Curriculum Planner] Calling {MODEL_NAME}...")
    response = llm.invoke(messages)

    try:
        roadmap = parse_roadmap_json(response.content)
    except ValueError as e:
        print(f"[Curriculum Planner] Parse error: {e}")
        return {
            "error": str(e),
            "messages": messages + [response],
        }

    print(f"[Curriculum Planner] Created {len(roadmap.topics)} topics")

    # Return ONLY the keys this node changed
    return {
        "roadmap": roadmap,
        "messages": messages + [response],
        "error": None,
    }
```

Notice the return value: `{"roadmap": roadmap, "messages": ..., "error": None}`. Not the full state – only the three keys this node touched. LangGraph merges these into the existing state. Every other field stays unchanged.

### 2.3 The Graph Definition

The graph is wiring, not logic. All business logic lives in the agent modules. <VPIcon icon="fas fa-folder-open"/>`src/graph/`<VPIcon icon="fa-brands fa-python"/>`workflow.py` only describes which nodes exist, how they connect, and what decisions the routing functions make:

```py :collapsed-lines title="graph/workflow.py"
import os
import sqlite3
from pathlib import Path

from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import END, START, StateGraph

from agents.curriculum_planner import curriculum_planner_node
from agents.explainer import explainer_node
from agents.human_approval import human_approval_node
from agents.progress_coach import progress_coach_node
from agents.quiz_generator import quiz_generator_node
from graph.state import AgentState, session_is_complete


def route_after_approval(state: dict) -> str:
    if state.get("approved", False):
        return "explainer"
    return "curriculum_planner"


def route_after_coach(state: dict) -> str:
    if session_is_complete(state):
        return "end"
    return "explainer"


def build_graph(
    db_path: str = "data/checkpoints.db",
    interrupt_before: list | None = None,
):
    Path("data").mkdir(exist_ok=True)
    if db_path == "data/checkpoints.db":
        db_path = os.getenv("CHECKPOINT_DB", db_path)

    builder = StateGraph(AgentState)

    # Register all five nodes
    builder.add_node("curriculum_planner", curriculum_planner_node)
    builder.add_node("human_approval", human_approval_node)
    builder.add_node("explainer", explainer_node)
    builder.add_node("quiz_generator", quiz_generator_node)
    builder.add_node("progress_coach", progress_coach_node)

    # Static edges
    builder.add_edge(START, "curriculum_planner")
    builder.add_edge("curriculum_planner", "human_approval")
    builder.add_edge("explainer", "quiz_generator")
    builder.add_edge("quiz_generator", "progress_coach")

    # Conditional edges
    builder.add_conditional_edges(
        "human_approval",
        route_after_approval,
        {"explainer": "explainer", "curriculum_planner": "curriculum_planner"},
    )
    builder.add_conditional_edges(
        "progress_coach",
        route_after_coach,
        {"explainer": "explainer", "end": END},
    )

    # IMPORTANT: create the connection directly, not via context manager.
    # SqliteSaver.from_conn_string() returns a context manager. If you use
    # `with SqliteSaver.from_conn_string(...) as checkpointer:`, the connection
    # closes when the `with` block exits. The graph object lives longer than
    # build_graph(), so the connection must stay open for the process lifetime.
    conn = sqlite3.connect(db_path, check_same_thread=False)
    checkpointer = SqliteSaver(conn)

    return builder.compile(
        checkpointer=checkpointer,
        interrupt_before=interrupt_before or [],
    )


graph = build_graph()
```

#### 💡 The SqliteSaver connection pattern

The `check_same_thread=False` flag is required. SQLite's default behavior prevents a connection created on one thread from being used on another.

LangGraph runs node functions and checkpoint writes on different threads internally. Without this flag, you'll get `ProgrammingError: SQLite objects created in a thread can only be used in that same thread` at runtime. The flag is safe here because LangGraph serializes checkpoint writes: there's no concurrent write contention.

The routing functions are pure Python. No LLM calls. They read from state and return a string. That string determines which node runs next. Keep control flow logic in Python, not in LLMs. An LLM routing decision introduces non-determinism into your graph's control flow, which makes it very hard to reason about and test.

The `interrupt_before` parameter defaults to an empty list. The terminal interface uses `interrupt()` *inside* `human_approval_node` to pause for roadmap approval, which you'll see in Chapter 5, so no compile-time interrupt is needed.

The Streamlit UI (Chapter 9) passes `interrupt_before=["quiz_generator"]` to stop the graph before the quiz node runs, so `input()` is never called inside the graph thread. The same graph builder supports both modes.

Here is what the complete graph looks like:

![Figure 2. The complete LangGraph graph. Static edges are solid. Conditional edges are dashed. The routing function determines which path executes at runtime.](https://cdn.hashnode.com/uploads/covers/6983b18befedc65b9820e223/96774b41-787f-420b-ac36-a6883c79bb3c.png)

### 2.4 Run it and Verify

With the Curriculum Planner node and graph in place, you can run the first end-to-end test:

```sh :collapsed-lines
python main.py "Learn Python closures and decorators from scratch"
#
# ============================================================
# Learning Accelerator
# Session ID: a3f1b2c4
# Goal: Learn Python closures and decorators from scratch
# ============================================================
# 
# [Curriculum Planner] Building roadmap for: 'Learn Python closures...'
# [Curriculum Planner] Calling qwen2.5:7b...
# [Curriculum Planner] Created 5 topics
# 
# Proposed Study Plan
# ============================================================
# Goal: Learn Python closures and decorators from scratch
# Duration: 2 weeks @ 5 hrs/week
# 
#   1. Python Functions Review (45 min)
#      Review function definition, arguments, return values, and scope basics
#   2. Scope and the LEGB Rule (60 min)
#      Understand how Python resolves variable names across nested scopes
#   3. Closures Explained (75 min) (needs: Scope and the LEGB Rule)
#      ...
```

The graph pauses here. The `interrupt()` call inside `human_approval_node` causes it to stop, save a checkpoint, and return control to the caller. Your terminal is waiting. Type `yes` to continue or `no` to regenerate.

::: note 📌 Checkpoint

You have a working graph with state persistence. The session ID printed at the top is stored in <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-database"/>`checkpoints.db`. If you kill the process now and run `python main.py --resume a3f1b2c4`, it will pick up exactly at the approval prompt. Checkpointing is already working.


Now run the unit tests to verify the parsing logic:

```sh
pytest tests/test_state.py tests/test_curriculum_planner.py -v
```

Expected: 35 tests, all passing, no Ollama required. These tests exercise `parse_roadmap_json()`, the state dataclasses, and the utility functions: everything except the actual LLM call.

The enterprise pattern here: a sales enablement system follows the same graph structure. A curriculum planner generates an onboarding path for a new sales rep, a manager approves it before training begins, then the study loop runs through product knowledge topics. The graph checkpoints after every topic. If a rep comes back after lunch, the system resumes exactly where they left off.

:::

In the next chapter, you'll add the Model Context Protocol so your agents have standardized tool access, then build the Explainer: the first agent that calls tools in a loop and iterates until it has enough context to write a grounded explanation.

---

## Chapter 3: Standardized Tool Access with MCP

The Explainer agent needs to read your study notes before it can explain anything. The Progress Coach needs to store and retrieve session data. Both could call Python functions directly, but that would couple every agent to the filesystem layout, the storage schema, and however you implemented those functions.

The Model Context Protocol solves this with a clean separation: agents describe *what* they need, tool servers handle *how* it's done. Change the storage backend, and no agent code changes. Build the same tool server once, and any MCP-compatible agent (LangGraph, CrewAI, Claude Desktop, or anything else) can use it.

### 3.1 MCP's Three Primitives

MCP has three types of capabilities a server can expose:

1. **Tools** are executable functions the agent calls with arguments. `read_study_file(filename)` is a Tool. The agent controls when it's called and with what arguments. The server handles the implementation.
2. **Resources** are structured data the agent reads, identified by a URI. `notes://index` is a Resource. Think of these as read-only HTTP GET endpoints. The server controls what data is available, the agent reads it on demand.
3. **Prompts** are reusable prompt templates the server owns and the agent requests by name. This system doesn't use Prompts heavily, but they exist for cases where a tool server wants to own the prompt design for its domain.

The key distinction: Tools are about actions, Resources are about data. If the agent needs to *do* something, it's a Tool. If the agent needs to *read* something structured, it's a Resource.

#### 💡 MCP as a stable contract

Think of MCP as the stable contract between agents and tools. The Explainer agent knows the tool is called `read_study_file` and takes a `filename` argument. Whether the implementation reads from disk, fetches from an S3 bucket, or queries a database is invisible to the agent.

That's the value. You can swap the implementation without touching any agent code.

### 3.2 Build the Filesystem MCP Server

The filesystem server gives agents access to your study notes. It exposes three tools and one resource.

```py :collapsed-lines title="mcp_servers/filesystem_server.py"
import os
from pathlib import Path
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Filesystem Server")

# Path configured via environment variable
NOTES_BASE = Path(os.getenv("NOTES_PATH", "study_materials/sample_notes"))


@mcp.tool()
def list_study_files() -> list[str]:
    """
    List all available study note files.

    Returns a list of filenames relative to the notes directory.
    Example: ['closures.md', 'decorators.md', 'python_basics.md']

    Always call this first to discover what materials are available
    before attempting to read specific files.
    """
    if not NOTES_BASE.exists():
        return []
    return sorted([
        str(f.relative_to(NOTES_BASE))
        for f in NOTES_BASE.rglob("*.md")
    ])


@mcp.tool()
def read_study_file(filename: str) -> str:
    """
    Read the full content of a study note file.

    Args:
        filename: The filename to read, exactly as returned by
                  list_study_files(). Example: 'closures.md'

    Returns the full text content, or an error string if not found.
    Never raises. Errors are returned as strings so the agent
    can handle them gracefully.
    """
    file_path = NOTES_BASE / filename

    # Security: path traversal prevention.
    # Without this, an agent could call read_study_file("../../.env")
    # and expose your API keys. We resolve both paths and verify
    # the requested file is inside the notes directory.
    try:
        resolved = file_path.resolve()
        resolved.relative_to(NOTES_BASE.resolve())
    except ValueError:
        return (
            f"Error: path traversal attempt blocked for '{filename}'. "
            f"Only files within the notes directory are accessible."
        )

    if not file_path.exists():
        available = list_study_files()
        return f"Error: '{filename}' not found. Available: {available}"

    if file_path.suffix != ".md":
        return f"Error: only .md files are accessible, got '{file_path.suffix}'"

    try:
        return file_path.read_text(encoding="utf-8")
    except (PermissionError, OSError) as e:
        return f"Error reading '{filename}': {e}"


@mcp.tool()
def search_notes(query: str) -> list[dict]:
    """
    Search across all study notes for a keyword or phrase.

    Args:
        query: The search term. Case-insensitive substring match.

    Returns a list of matches, each with keys: 'file', 'line_number', 'line'.
    Maximum 20 results to avoid overwhelming the context window.
    """
    if not NOTES_BASE.exists():
        return []

    results = []
    query_lower = query.lower()

    for file_path in sorted(NOTES_BASE.rglob("*.md")):
        rel_path = str(file_path.relative_to(NOTES_BASE))
        try:
            lines = file_path.read_text(encoding="utf-8").splitlines()
        except (UnicodeDecodeError, PermissionError, OSError):
            continue

        for line_num, line in enumerate(lines, 1):
            if query_lower in line.lower():
                results.append({
                    "file": rel_path,
                    "line_number": line_num,
                    "line": line.strip(),
                })
                if len(results) >= 20:
                    return results

    return results


@mcp.resource("notes://index")
def get_notes_index() -> str:
    """
    Resource: index of all available study materials with file sizes.
    URI: notes://index
    """
    files = list_study_files()
    if not files:
        return "# Study Materials Index\n\nNo study materials found."

    lines = ["# Study Materials Index\n"]
    for filename in files:
        file_path = NOTES_BASE / filename
        try:
            size_kb = file_path.stat().st_size / 1024
            lines.append(f"- **{filename}** ({size_kb:.1f} KB)")
        except OSError:
            lines.append(f"- **{filename}** (size unknown)")
    lines.append(f"\nTotal: {len(files)} file(s)")
    return "\n".join(lines)


if __name__ == "__main__":
    print(f"[Filesystem MCP] Starting server")
    print(f"[Filesystem MCP] Serving files from: {NOTES_BASE.resolve()}")
    mcp.run()
```

`@mcp.tool()` and `@mcp.resource()` are the entire integration surface. FastMCP reads the function name (which becomes the tool name), the docstring (which becomes the description the LLM reads to decide whether to use the tool), and the type annotations (which become the argument schema). That's the full contract between the server and any client that connects to it.

The docstrings deserve attention. The LLM calling these tools reads the docstring to decide when to use the tool and with what arguments. A vague docstring (something like "reads a file") leads to incorrect tool selection. The docstrings in this server tell the agent exactly when to call each tool and what format the arguments should be in.

### 3.3 Build the Memory MCP Server

The memory server gives agents a session-scoped key-value store. The Explainer writes which topics it has explained. The Progress Coach reads that history before deciding what to do next.

```py :collapsed-lines title="mcp_servers/memory_server.py"
from datetime import datetime, timezone
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Memory Server")

# In-process store: {session_id: {key: {"value": str, "updated_at": str}}}
# For production: replace with Redis or PostgreSQL.
# The MCP interface stays identical. Only this dict changes.
_store: dict[str, dict] = {}


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@mcp.tool()
def memory_set(session_id: str, key: str, value: str) -> str:
    """
    Store a value in session memory.

    Values are always strings. Use JSON for complex data:
    memory_set(session_id, 'quiz_scores', json.dumps([0.8, 0.6]))

    Args:
        session_id: Scopes this data to one study session.
        key: Descriptive name. Examples: 'explained_topics', 'last_quiz_score'
        value: String value. Use JSON for lists or dicts.
    """
    if session_id not in _store:
        _store[session_id] = {}
    _store[session_id][key] = {"value": value, "updated_at": _now_iso()}
    return f"Stored '{key}' for session '{session_id}'"


@mcp.tool()
def memory_get(session_id: str, key: str) -> str:
    """
    Retrieve a value from session memory.

    Returns the stored value, or the string "null" if the key doesn't exist.
    Returns "null" (not Python None) so the LLM can handle the missing case
    without type errors.
    """
    session = _store.get(session_id, {})
    entry = session.get(key)
    return "null" if entry is None else entry["value"]


@mcp.tool()
def memory_list_keys(session_id: str) -> list[str]:
    """List all keys stored for a session. Returns [] if none exist."""
    return list(_store.get(session_id, {}).keys())


@mcp.tool()
def memory_delete(session_id: str, key: str) -> str:
    """Delete a specific key from session memory."""
    session = _store.get(session_id, {})
    if key in session:
        del session[key]
        return f"Deleted '{key}' from session '{session_id}'"
    return f"Key '{key}' not found in session '{session_id}'"


@mcp.resource("notes://session/{session_id}")
def get_session_summary(session_id: str) -> str:
    """Full summary of everything stored for a session. URI: notes://session/{session_id}"""
    session = _store.get(session_id, {})
    if not session:
        return f"# Session Memory: {session_id}\n\nNo data stored yet."
    lines = [f"# Session Memory: {session_id}\n"]
    for key, entry in sorted(session.items()):
        lines.append(f"## {key}")
        lines.append(f"- Value: {entry['value']}\n")
    return "\n".join(lines)


if __name__ == "__main__":
    print("[Memory MCP] Starting server")
    mcp.run()
```

The `_store` dict is intentionally simple. The entire memory server could be replaced with a Redis backend and no agent code would change. Only the implementation of `memory_set` and `memory_get` would. That's the value of the protocol boundary.

The choice to return the string `"null"` rather than Python `None` from `memory_get` is deliberate. When a `ToolMessage` contains `None`, some model versions handle it poorly. Returning `"null"` gives the LLM a string it can reason about ("the key doesn't exist yet") without type-handling edge cases.

### 3.4 How Agents Use MCP Tools: the Tool-calling Loop

The Explainer agent is where everything from Chapter 2 (state) and Chapter 3 (MCP) comes together. It's also the first agent in the system that makes multiple LLM calls: one per tool invocation, iterating until the LLM decides it has enough information to write an explanation.

In <VPIcon icon="fas fa-folder-open"/>`src/agents/`<VPIcon icon="fa-brands fa-python"/>`explainer.py`, the MCP server functions are imported directly as Python functions and wrapped with LangChain's `@tool` decorator:

```py :collapsed-lines title="agents/explainer.py (setup section)"
import json, os
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from langchain_ollama import ChatOllama

from graph.state import get_current_topic
from mcp_servers.filesystem_server import list_study_files, read_study_file, search_notes
from mcp_servers.memory_server import memory_get, memory_set

MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")


@tool
def tool_list_files() -> list[str]:
    """
    List all available study note files in the notes directory.
    Returns filenames like ['closures.md', 'decorators.md'].
    Call this FIRST to discover what materials exist before reading any file.
    """
    return list_study_files()


@tool
def tool_read_file(filename: str) -> str:
    """
    Read the complete content of a study note file.
    Args:
        filename: Exact filename as returned by tool_list_files().
    Returns the full file text, or an error string if not found.
    """
    return read_study_file(filename)


@tool
def tool_search_notes(query: str) -> str:
    """
    Search across all study notes for a keyword or phrase.
    Args:
        query: Search term (case-insensitive). Example: 'nonlocal', 'closure'
    Returns a JSON string with matching lines and their file locations.
    """
    results = search_notes(query)
    if not results:
        return "No matches found."
    return json.dumps(results, indent=2)


@tool
def tool_memory_get(session_id: str, key: str) -> str:
    """
    Retrieve a value from session memory.
    Args:
        session_id: The current session ID (from state).
        key: The memory key to look up.
    Returns the stored value, or 'null' if not found.
    """
    return memory_get(session_id, key)


@tool
def tool_memory_set(session_id: str, key: str, value: str) -> str:
    """
    Store a value in session memory for later agents to read.
    Args:
        session_id: The current session ID (from state).
        key: Descriptive key name.
        value: String value. Use JSON for complex data.
    """
    return memory_set(session_id, key, value)


EXPLAINER_TOOLS = [
    tool_list_files, tool_read_file, tool_search_notes,
    tool_memory_get, tool_memory_set,
]
TOOL_MAP = {t.name: t for t in EXPLAINER_TOOLS}
```

#### ⚠️ Direct import vs. subprocess transport

In this tutorial, MCP tools are imported as Python functions and wrapped with `@tool`. This runs everything in one process. It's simpler for development, has zero subprocess overhead, and easy to test.

In production, MCP servers run as separate processes communicating over stdio or HTTP. You'd use `MultiServerMCPClient` from `langchain-mcp-adapters` to connect. The agent code is nearly identical in both modes – only the tool wrapping changes.

The Explainer's system prompt tells the LLM not just what tools are available, but *how to use them in sequence*:

```py
EXPLAINER_SYSTEM_PROMPT = """You are an expert tutor explaining topics to a student.

Your explanations must be grounded in the student's actual study materials.
Use the available tools to find and read relevant notes before explaining.

APPROACH (follow this sequence):
1. Call tool_list_files() to see what materials are available
2. Call tool_search_notes(topic) to find which files cover this topic
3. Call tool_read_file(filename) to read the most relevant file(s)
4. Check prior context: call tool_memory_get(session_id, 'explained_topics')
5. Write your explanation based on what you found in the notes

EXPLANATION FORMAT:
- Start with a real-world analogy (1-2 sentences)
- State the core concept clearly (2-3 sentences)
- Show a concrete code example from the student's notes
- End with one common mistake or gotcha to watch out for

After writing the explanation, store what you explained:
  tool_memory_set(session_id, 'explained_topics', <comma-separated topic titles>)
"""
```

The tool-calling loop in `explainer_node` is the core mechanism worth understanding carefully:

```py :collapsed-lines title="agents/explainer.py (node function)"
def execute_tool_call(tool_call: dict) -> str:
    """Execute a tool call and return the result as a string. Never raises."""
    name = tool_call["name"]
    args = tool_call["args"]
    if name not in TOOL_MAP:
        return f"Error: unknown tool '{name}'. Available: {list(TOOL_MAP.keys())}"
    try:
        result = TOOL_MAP[name].invoke(args)
        if isinstance(result, (list, dict)):
            return json.dumps(result)
        return str(result)
    except Exception as e:
        return f"Error executing {name}({args}): {type(e).__name__}: {e}"


def explainer_node(state: dict) -> dict:
    """
    LangGraph node: Explainer Agent

    Reads:  state["roadmap"], state["current_topic_index"], state["session_id"]
    Writes: state["messages"], state["error"]
    """
    topic = get_current_topic(state)
    if topic is None:
        return {"error": "No current topic found."}

    session_id = state.get("session_id", "unknown")
    print(f"\n[Explainer] Topic: '{topic.title}'")

    llm = ChatOllama(
        model=MODEL_NAME,
        base_url=OLLAMA_BASE_URL,
        temperature=0.3,
    ).bind_tools(EXPLAINER_TOOLS)

    messages = [
        SystemMessage(content=EXPLAINER_SYSTEM_PROMPT),
        HumanMessage(content=(
            f"Please explain this topic to me: '{topic.title}'\n"
            f"Context: {topic.description}\n"
            f"Session ID for memory calls: {session_id}"
        )),
    ]

    max_iterations = 8
    final_response = None

    for iteration in range(max_iterations):
        print(f"[Explainer] LLM call {iteration + 1}/{max_iterations}...")
        response = llm.invoke(messages)
        messages.append(response)

        if not response.tool_calls:
            final_response = response
            print(f"[Explainer] Complete after {iteration + 1} LLM call(s)")
            break

        print(f"[Explainer] {len(response.tool_calls)} tool call(s) requested:")
        for tool_call in response.tool_calls:
            print(f"  → {tool_call['name']}({tool_call['args']})")
            result = execute_tool_call(tool_call)
            log_result = result[:100] + "..." if len(result) > 100 else result
            print(f"    ← {log_result}")

            # The tool_call_id must match the ID the LLM assigned to the request.
            # Without this, the LLM can't correlate result to request.
            messages.append(ToolMessage(
                content=result,
                tool_call_id=tool_call["id"],
            ))

    if final_response is None:
        return {
            "messages": messages,
            "error": f"Explainer reached max iterations ({max_iterations}).",
        }

    print(f"[Explainer] Explanation: {len(final_response.content)} characters")
    return {"messages": messages, "error": None}
```

Let's walk through what happens during one execution:

**LLM call 1:** The LLM receives the system prompt and the human message asking for an explanation of "Closures Explained". It responds with tool calls: `tool_list_files()` and `tool_search_notes("closure")`. No text explanation yet.

**Tool execution:** `tool_list_files()` returns `["closures.md", "decorators.md", "python_basics.md"]`. `tool_search_notes("closure")` returns matching lines from `closures.md`. Both results are appended to the message list as `ToolMessage` objects with the matching `tool_call_id`.

**LLM call 2:** The LLM now has the file list and search results. It requests `tool_read_file("closures.md")`.

**Tool execution:** The full content of `closures.md` is returned as a `ToolMessage`.

**LLM call 3:** The LLM has read the notes. It calls `tool_memory_set(session_id, "explained_topics", "Closures Explained")` to record that this topic was covered.

**LLM call 4:** With context stored, the LLM produces the final explanation. No more tool calls in the response. The loop exits. The explanation is grounded in what's actually in your notes, not in the model's training data.

The `tool_call_id` matching on line `tool_call_id=tool_call["id"]` deserves attention. When the LLM requests a tool call, it assigns it an ID. The `ToolMessage` must include that same ID so the LLM can correlate the result to the request. Without it, the conversation is malformed and the model produces garbage output or errors.

The `max_iterations = 8` limit is a production circuit breaker. A confused model that calls tools indefinitely would otherwise run until you kill it. Eight iterations is enough for any legitimate explanation task. If a model reaches the limit, the error state triggers, and you can adjust the system prompt or switch to a larger model.

### 3.5 Run the Explainer

Approve the roadmap when prompted, then watch the tool-calling loop in action

After approval:

```sh
python main.py
#
# [Explainer] Topic: 'Python Functions Review'
# [Explainer] LLM call 1/8...
#   → tool_list_files({})
#     ← ["closures.md", "decorators.md", "python_basics.md"]
# [Explainer] LLM call 2/8...
#   → tool_search_notes({'query': 'functions'})
#     ← [{"file": "python_basics.md", "line_number": 12, "line": "## Functions"}]
# [Explainer] LLM call 3/8...
#   → tool_read_file({'filename': 'python_basics.md'})
#     ← # Python Basics\n\n## Variables and Types...
# [Explainer] LLM call 4/8...
#   → tool_memory_set({'session_id': 'a3f1b2c4', 'key': 'explained_topics', ...})
#     ← Stored 'explained_topics' for session 'a3f1b2c4'
# [Explainer] LLM call 5/8...
# [Explainer] Complete after 5 LLM call(s)
# [Explainer] Explanation: 487 characters
```

Every arrow (`→`) is a tool call the LLM requested. Every back-arrow (`←`) is the result returned to the LLM. The loop terminates at LLM call 5 because that response contains the final explanation and no further tool requests.

::: note 📌 Checkpoint

Run the MCP server tests to verify the tools work independently of the LLM:

```sh
pytest tests/test_mcp_servers.py -v
```

Expected: 36 tests, all passing, no Ollama required. These tests call the tool functions directly as Python functions. No subprocess, no protocol overhead. The tools work in both modes (direct Python import and MCP protocol) because the tool functions are just regular Python.

The enterprise connection here: a compliance training system using this same pattern would have an MCP server exposing the regulatory content library instead of study notes. Agents query it by topic, read requirements, and generate certification assessments from the actual regulatory text, not from what the model thinks the regulations say. The grounding is the point.

:::

In the next chapter, you'll add the Quiz Generator and Progress Coach, wire the conditional routing that makes the graph loop automatically through all topics, and run the complete four-agent system end to end.

---

## Chapter 4: Building the Four-Agent System

The first three chapters built the foundation: a shared state definition, a graph that checkpoints after every node, two MCP servers, and the Explainer agent that uses those servers to ground its explanations in your actual notes. What you have is an LLM that reads files and explains topics.

This chapter completes the system. You'll add the Quiz Generator and Progress Coach, wire the conditional routing that makes the graph loop through every topic automatically, and run a complete end-to-end session.

### 4.1 The Quiz Generator: LLM as Judge

The Quiz Generator is the most architecturally interesting agent in the system because it uses two LLM calls with different purposes and different temperatures, deliberately kept separate.

**The generation call** produces questions from the Explainer's output. It uses `temperature=0.4` (enough creativity to produce varied, non-repetitive questions across multiple topics) and `format="json"` to enforce structured output.

**The grading call** evaluates the student's answer. It uses `temperature=0.1`. Analytical, consistent. Grading the same answer twice should produce the same score. Using the same temperature as generation would let the creative settings bleed into the analytical evaluation.

This is a production pattern worth naming: when one workflow has subtasks with fundamentally different requirements, giving them separate LLM calls with separate configurations produces better results than a single call that tries to do both.

```py :collapsed-lines title="agents/quiz_generator.py"
import json
import os
from datetime import datetime, timezone

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama import ChatOllama

from graph.state import QuizQuestion, QuizResult, get_current_topic

MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

GENERATION_PROMPT = """You are a quiz designer for a student learning programming.

Given a topic and explanation, generate {n} quiz questions that test
genuine understanding, not just the ability to repeat memorized phrases.

Good questions require the student to:
  - Apply a concept to a new situation
  - Explain WHY something works, not just WHAT it does
  - Identify edge cases or common mistakes
  - Compare related concepts

Return ONLY valid JSON with no prose or markdown:
{{
  "questions": [
    {{
      "question": "Clear, specific question text ending with ?",
      "expected_answer": "Model answer in 1-3 sentences",
      "difficulty": "easy|medium|hard"
    }}
  ]
}}

Rules:
  - Include at least one question about a common mistake or gotcha
  - expected_answer should be concise but complete
  - Avoid yes/no questions. Ask for explanation or demonstration
"""

GRADING_PROMPT = """You are a fair teacher grading a student's answer.

Question: {question}
Model answer: {expected_answer}
Student's answer: {student_answer}

Grade the student's answer honestly. Be generous with partial credit:
  - Fundamentally correct with minor gaps: 0.7-0.9
  - Correct concept but imprecise: 0.5-0.7
  - Partially correct: 0.3-0.5
  - Fundamentally wrong: 0.0-0.2

Return ONLY valid JSON with no prose or markdown:
{{
  "correct": true,
  "score": 0.85,
  "feedback": "One specific sentence of feedback",
  "missing_concept": "Key concept missed, or empty string if answer is correct"
}}
"""
```

The `generate_questions` and `grade_answer` functions implement these two calls independently. Both are importable and callable as plain Python. No graph required. This makes them testable in isolation and reusable by the A2A service you'll build in Chapter 8.

```py :collapsed-lines 
def generate_questions(topic: str, explanation: str, n: int = 3) -> list[dict]:
    """Generate n quiz questions from the Explainer's output."""
    llm = ChatOllama(
        model=MODEL_NAME,
        base_url=OLLAMA_BASE_URL,
        temperature=0.4,
        format="json",
    )

    prompt = GENERATION_PROMPT.format(n=n)
    try:
        response = llm.invoke([
            SystemMessage(content=prompt),
            HumanMessage(content=f"Topic: {topic}\n\nExplanation:\n{explanation}"),
        ])
        data = json.loads(response.content)
        questions = data.get("questions", [])
        if questions and isinstance(questions, list):
            return questions
    except Exception as e:
        print(f"[Quiz Generator] LLM call failed during question generation: {e}")

    # Fallback: one generic question
    return [{
        "question": f"In your own words, explain the key concept of {topic} and why it matters.",
        "expected_answer": "A clear explanation demonstrating conceptual understanding.",
        "difficulty": "medium",
    }]


def grade_answer(question: str, expected: str, student_answer: str) -> dict:
    """Grade a student's answer using the LLM as judge."""
    llm = ChatOllama(
        model=MODEL_NAME,
        base_url=OLLAMA_BASE_URL,
        temperature=0.1,   # Analytical: grading must be consistent
        format="json",
    )

    prompt = GRADING_PROMPT.format(
        question=question,
        expected_answer=expected,
        student_answer=student_answer,
    )

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        return json.loads(response.content)
    except Exception as e:
        print(f"[Quiz Generator] LLM call failed during grading: {e}")
        return {
            "correct": False,
            "score": 0.5,
            "feedback": "Could not grade automatically. Please review manually.",
            "missing_concept": "",
        }
```

The `run_quiz` function orchestrates the interactive terminal session. It calls `generate_questions`, presents each question to the student via `input()`, grades each answer as it arrives, and builds the `QuizResult`:

```py :collapsed-lines
def run_quiz(topic: str, explanation: str) -> QuizResult:
    """Run an interactive quiz session in the terminal."""
    print(f"\n{'='*60}")
    print(f"Quiz: {topic}")
    print(f"{'='*60}")
    print("Answer each question in your own words. Press Enter to submit.\n")

    questions_data = generate_questions(topic, explanation, n=3)
    graded_questions = []
    total_score = 0.0
    weak_areas = []

    for i, q_data in enumerate(questions_data, 1):
        question_text = q_data["question"]
        expected = q_data["expected_answer"]
        difficulty = q_data.get("difficulty", "medium")

        print(f"Question {i} [{difficulty}]: {question_text}")
        user_answer = input("Your answer: ").strip()
        if not user_answer:
            user_answer = "(no answer provided)"

        print("Grading...")
        grade = grade_answer(question_text, expected, user_answer)

        score = float(grade.get("score", 0.0))
        correct = bool(grade.get("correct", False))
        feedback = grade.get("feedback", "")
        missing = grade.get("missing_concept", "")

        total_score += score
        status = "✓" if correct else "✗"
        print(f"{status} Score: {score:.0%}. {feedback}\n")

        if missing:
            weak_areas.append(missing)

        graded_questions.append(QuizQuestion(
            question=question_text,
            expected_answer=expected,
            user_answer=user_answer,
            correct=correct,
            feedback=feedback,
            score=score,
        ))

    avg_score = total_score / len(questions_data) if questions_data else 0.0
    correct_count = sum(1 for q in graded_questions if q.correct)

    print(f"{'='*60}")
    print(f"Quiz complete! Score: {avg_score:.0%} ({correct_count}/{len(graded_questions)} correct)")
    if weak_areas:
        print(f"Areas to review: {', '.join(set(weak_areas))}")
    print(f"{'='*60}\n")

    return QuizResult(
        topic=topic,
        questions=graded_questions,
        score=avg_score,
        weak_areas=list(set(weak_areas)),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
```

The LangGraph node extracts the Explainer's output from the message history and calls `run_quiz`. It then accumulates the result and the weak areas into state:

```py :collapsed-lines
def quiz_generator_node(state: dict) -> dict:
    """
    LangGraph node: Quiz Generator

    Reads:  state["roadmap"], state["current_topic_index"], state["messages"]
    Writes: state["quiz_results"], state["weak_areas"], state["error"]
    """
    topic = get_current_topic(state)
    if topic is None:
        return {"error": "No current topic. Curriculum Planner must run first"}

    # Extract the Explainer's final response from message history.
    # The Explainer's output is the last AIMessage that has no tool_calls.
    # Tool-calling responses have content too, but they also have tool_calls set.
    from langchain_core.messages import AIMessage
    messages = state.get("messages", [])
    explanation = ""
    for msg in reversed(messages):
        if isinstance(msg, AIMessage) and msg.content and not getattr(msg, "tool_calls", None):
            explanation = msg.content
            break

    if not explanation:
        print("[Quiz Generator] Warning: no explanation found, generating generic quiz")
        explanation = f"Topic: {topic.title}. {topic.description}"

    print(f"\n[Quiz Generator] Generating quiz for: '{topic.title}'")
    quiz_result = run_quiz(topic.title, explanation)

    existing_results = state.get("quiz_results", [])
    all_weak_areas = list(set(
        state.get("weak_areas", []) + quiz_result.weak_areas
    ))

    return {
        "quiz_results": existing_results + [quiz_result],
        "weak_areas": all_weak_areas,
        "error": None,
        # Pass state forward explicitly to preserve it across interrupt/resume
        "roadmap": state.get("roadmap"),
        "current_topic_index": state.get("current_topic_index", 0),
        "session_id": state.get("session_id", ""),
    }
```

#### 💡 Why `quiz_results` accumulates instead of replaces

The Progress Coach needs the current quiz result. The session summary needs all of them. The node appends to the existing list (`existing_results + [quiz_result]`) rather than replacing it.

`weak_areas` follows the same pattern: `set(existing + new)` deduplicates across topics so the final weak areas list is the union of everything the student struggled with in the session.

### 4.2 The Progress Coach: Synthesis and Routing

The Progress Coach does three things in sequence: evaluate the quiz result, give the student feedback, and decide what happens next. The routing decision (loop to the next topic or end the session) is its most consequential responsibility.

```py :collapsed-lines title="agents/progress_coach.py"
import json
import os
from datetime import datetime, timezone

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama import ChatOllama

from graph.state import QuizResult, StudyRoadmap, get_latest_quiz_result
from mcp_servers.memory_server import memory_set

MODEL_NAME = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
PASS_THRESHOLD = 0.5

COACHING_PROMPT = """You are an encouraging learning coach reviewing a student's quiz results.

Provide a brief, warm coaching message (2-3 sentences max) based on:
  - The topic studied
  - Their score (0.0 = 0%, 1.0 = 100%)
  - Any weak areas identified

Return ONLY valid JSON:
{{
  "summary": "2-3 sentence encouraging summary",
  "encouragement": "One short motivational sentence for next steps"
}}

Be specific. Reference the topic and any weak areas by name.
Never be discouraging. A low score means "more practice needed", not "you failed."
"""
```

The `get_coaching_message` function makes a single LLM call with `temperature=0.4` and `format="json"`. The warmth in the response requires some temperature. `temperature=0.1` would produce technically correct but dry feedback:

```py :collapsed-lines title="agents/progress_coach.py"
def get_coaching_message(topic: str, score: float, weak_areas: list[str]) -> dict:
    """Ask the LLM for a personalised coaching message."""
    llm = ChatOllama(
        model=MODEL_NAME,
        base_url=OLLAMA_BASE_URL,
        temperature=0.4,
        format="json",
    )
    context = {
        "topic":         topic,
        "score_percent": f"{score:.0%}",
        "weak_areas":    weak_areas if weak_areas else ["none identified"],
    }
    try:
        response = llm.invoke([
            SystemMessage(content=COACHING_PROMPT),
            HumanMessage(content=json.dumps(context)),
        ])
        return json.loads(response.content)
    except Exception as e:
        print(f"[Progress Coach] LLM call failed: {e}")
        return {
            "summary":      f"You scored {score:.0%} on {topic}. Keep going!",
            "encouragement": "Every topic builds on the last.",
        }
```

The node function ties everything together. It reads the latest quiz result, updates the topic status in the roadmap, persists progress to MCP memory, prints feedback, and advances the topic index:

```py :collapsed-lines title="agents/progress_coach.py"
def progress_coach_node(state: dict) -> dict:
    """
    LangGraph node: Progress Coach

    Reads:  state["quiz_results"], state["roadmap"],
            state["current_topic_index"], state["session_id"]
    Writes: state["roadmap"], state["current_topic_index"],
            state["messages"], state["error"]
    """
    latest = get_latest_quiz_result(state)
    if latest is None:
        return {"error": "No quiz results. Quiz Generator must run first"}

    roadmap = state.get("roadmap")
    if roadmap is None:
        return {"error": "No roadmap found"}

    idx = state.get("current_topic_index", 0)
    session_id = state.get("session_id", "unknown")
    score = latest.score

    print(f"\n[Progress Coach] Topic: '{latest.topic}'")
    print(f"[Progress Coach] Score: {score:.0%}")
    if latest.weak_areas:
        print(f"[Progress Coach] Weak areas: {', '.join(latest.weak_areas)}")

    # Get coaching message from LLM
    coaching = get_coaching_message(latest.topic, score, latest.weak_areas)

    # Update topic status in the roadmap
    topics = roadmap.get("topics", []) if isinstance(roadmap, dict) else roadmap.topics
    if idx < len(topics):
        topic = topics[idx]
        new_status = "completed" if score >= PASS_THRESHOLD else "needs_review"
        if isinstance(topic, dict):
            topic["status"] = new_status
        else:
            topic.status = new_status

    # Advance the topic index
    next_idx = idx + 1
    all_done = next_idx >= len(topics)

    # Persist progress to MCP memory
    memory_set(session_id, f"progress_topic_{idx}", json.dumps({
        "topic":      latest.topic,
        "score":      score,
        "weak_areas": latest.weak_areas,
        "timestamp":  datetime.now(timezone.utc).isoformat(),
    }))

    # Print coaching feedback
    print(f"\n{'─'*60}")
    print(f"Coach: {coaching['summary']}")
    print(f"{coaching['encouragement']}")

    if all_done:
        results = state.get("quiz_results", [])
        avg = sum(r.score for r in results) / max(len(results), 1)
        print(f"\nSession complete! Average: {avg:.0%}")
    else:
        next_topic = topics[next_idx]
        next_title = next_topic.get("title") if isinstance(next_topic, dict) else next_topic.title
        print(f"\nNext topic: '{next_title}'")
    print(f"{'─'*60}\n")

    return {
        "roadmap":              roadmap,
        "current_topic_index":  next_idx,
        "messages":             [AIMessage(content=coaching["summary"])],
        "error":                None,
    }
```

Two things worth understanding in this function.

::: important Why update topic status before advancing the index?

Because the status change (`"pending"` to `"completed"` or `"needs_review"`) must happen at `topics[idx]`, not `topics[next_idx]`. The index is incremented *after* updating the current topic's status. Getting this order wrong means the wrong topic gets marked. It's a subtle bug that's easy to miss because the session still runs correctly to the eye.

:::

::: important Why write to MCP memory?

The Progress Coach persists each topic's result via `memory_set`. This serves a production use case: if the session is resumed after a crash or pause, the memory server has a record of what was covered and how the student performed. The Explainer can check this history via `tool_memory_get` when explaining subsequent topics, adapting its emphasis based on where the student struggled.

:::

### 4.3 Wiring the Complete Graph

With all four agents defined, <VPIcon icon="fa-brands fa-python"/>`workflow.py` wires them into the complete graph. The wiring itself is the shortest file in the system: fewer than 50 lines that are almost entirely `add_node`, `add_edge`, and `add_conditional_edges` calls.

```py :collapsed-lines title="graph/workflow.py"
import os
import sqlite3
from pathlib import Path

from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import END, START, StateGraph

from agents.curriculum_planner import curriculum_planner_node
from agents.explainer import explainer_node
from agents.human_approval import human_approval_node
from agents.progress_coach import progress_coach_node
from agents.quiz_generator import quiz_generator_node
from graph.state import AgentState, session_is_complete


def route_after_approval(state: dict) -> str:
    if state.get("approved", False):
        return "explainer"
    return "curriculum_planner"


def route_after_coach(state: dict) -> str:
    if session_is_complete(state):
        return "end"
    return "explainer"


def build_graph(
    db_path: str = "data/checkpoints.db",
    interrupt_before: list | None = None,
):
    """
    Build and compile the Learning Accelerator graph.

    Args:
        db_path:          Path to the SQLite checkpoint database.
        interrupt_before: Optional list of node names to pause before.
                          Used by the Streamlit UI to intercept quiz_generator.
    """
    Path("data").mkdir(exist_ok=True)
    if db_path == "data/checkpoints.db":
        db_path = os.getenv("CHECKPOINT_DB", db_path)

    builder = StateGraph(AgentState)

    builder.add_node("curriculum_planner", curriculum_planner_node)
    builder.add_node("human_approval",     human_approval_node)
    builder.add_node("explainer",          explainer_node)
    builder.add_node("quiz_generator",     quiz_generator_node)
    builder.add_node("progress_coach",     progress_coach_node)

    builder.add_edge(START, "curriculum_planner")
    builder.add_edge("curriculum_planner", "human_approval")
    builder.add_edge("explainer",          "quiz_generator")
    builder.add_edge("quiz_generator",     "progress_coach")

    builder.add_conditional_edges(
        "human_approval",
        route_after_approval,
        {"explainer": "explainer", "curriculum_planner": "curriculum_planner"},
    )
    builder.add_conditional_edges(
        "progress_coach",
        route_after_coach,
        {"explainer": "explainer", "end": END},
    )

    # CRITICAL: Create the connection directly. Do NOT use a context manager.
    # The connection must stay open for the process lifetime.
    # SqliteSaver requires check_same_thread=False because LangGraph runs
    # node functions and checkpoint writes on different threads.
    conn = sqlite3.connect(db_path, check_same_thread=False)
    checkpointer = SqliteSaver(conn)

    return builder.compile(
        checkpointer=checkpointer,
        interrupt_before=interrupt_before or [],
    )


graph = build_graph()
```

The `interrupt_before` parameter deserves a closer look here. The terminal interface (<VPIcon icon="fa-brands fa-python"/>`main.py`) uses `interrupt()` inside `human_approval_node` to pause for roadmap approval. No `interrupt_before` needed.

The Streamlit UI (Chapter 9) needs a different kind of pause: it must stop before `quiz_generator_node` runs so that `input()` is never called inside the graph thread. The `build_graph(interrupt_before=["quiz_generator"])` call in <VPIcon icon="fa-brands fa-python"/>`streamlit_app.py` produces a separate graph instance configured for UI use.

The terminal graph and the UI graph are compiled from the same builder. Only the pause point differs.

The routing functions are pure Python with no LLM calls. `route_after_approval` reads `state["approved"]`, a boolean the human approval node writes. `route_after_coach` calls `session_is_complete(state)`, which checks whether the topic index has advanced past the roadmap. All control flow is deterministic Python, not probabilistic LLM output.

### 4.4 The Complete Execution Flow

Here's what happens when you run `python main.py "Learn Python closures"` and type `yes` at the approval prompt:

```plaintext
START
  ↓
curriculum_planner_node
  reads:  state["goal"]
  writes: state["roadmap"], state["messages"]
  ↓
human_approval_node
  interrupt() pauses here. Waits for user input.
  user types "yes"
  writes: state["approved"] = True + full state forward
  ↓  route_after_approval → "explainer"
explainer_node (topic 0)
  reads:  state["roadmap"], state["current_topic_index"]
  calls:  tool_list_files, tool_search_notes, tool_read_file
  writes: state["messages"]
  ↓
quiz_generator_node (topic 0)
  reads:  state["messages"] (extracts explanation)
  calls:  run_quiz() → 3 questions, 3 graded answers
  writes: state["quiz_results"], state["weak_areas"]
  ↓
progress_coach_node (topic 0)
  reads:  state["quiz_results"], state["roadmap"]
  writes: state["roadmap"] (topic 0 status updated)
          state["current_topic_index"] = 1
          state["messages"] (coaching message)
  ↓  route_after_coach → "explainer" (more topics remain)
explainer_node (topic 1)
  ...
  ↓
  [loop continues until current_topic_index >= len(roadmap.topics)]
  ↓  route_after_coach → "end"
END
```
<!-- TODO: mermiad화 -->

LangGraph checkpoints state after every node. If the process crashes between `quiz_generator_node` and `progress_coach_node`, the next `graph.invoke(None, config=config)` with the same session ID resumes from `progress_coach_node`. The quiz result is already in state.

### 4.5 Run the Complete System

With all four nodes registered:

```sh
rm -f data/checkpoints.db
python main.py "Learn Python closures and decorators from scratch"
```

You'll see the planner, the approval prompt, then the full loop:

```plaintext :collapsed-lines
[Curriculum Planner] Building roadmap for: 'Learn Python closures...'
[Curriculum Planner] Created roadmap: 5 topics, 4 weeks
  1. Python Functions (60 min)
  2. Scopes and Namespaces (45 min)
  3. Inner Functions (60 min)
  4. Creating Closures (75 min)
  5. Decorator Basics (60 min)

[Human Approval] Pausing for roadmap review...
> yes
[Human Approval] Roadmap approved. Starting study session.

[Explainer] Topic: 'Python Functions'
[Explainer] LLM call 1/8...
  → tool_list_files({})
    ← ["closures.md", "decorators.md", "python_basics.md"]
[Explainer] LLM call 2/8...
  → tool_read_file({'filename': 'python_basics.md'})
    ← # Python Basics...
[Explainer] Complete after 4 LLM call(s)
[Explainer] Explanation: 1938 characters

[Quiz Generator] Generating quiz for: 'Python Functions'

============================================================
Quiz: Python Functions
============================================================
Question 1 [medium]: What is the difference between...
Your answer: Functions are first-class objects...
Grading...
✓ Score: 80%. Good explanation of first-class functions.

...

[Progress Coach] Topic: 'Python Functions'
[Progress Coach] Score: 73%
────────────────────────────────────────────────────────────
Coach: You have a solid grasp of Python functions, especially...
Keep building on this foundation as you move into closures!

Next topic: 'Scopes and Namespaces'
────────────────────────────────────────────────────────────

[Explainer] Topic: 'Scopes and Namespaces'
...
```

The loop runs automatically. When `progress_coach_node` writes `current_topic_index = 1`, `route_after_coach` returns `"explainer"`, and the graph calls `explainer_node` with the updated index. No external loop in <VPIcon icon="fa-brands fa-python"/>`main.py`. The graph topology handles the iteration.

::: note 📌 Checkpoint

Run the full test suite:

```sh
pytest tests/ -v
```

Expected: 184 tests collected, eval tests automatically deselected. The unit tests cover the quiz and coach nodes without requiring Ollama:

```sh
pytest tests/test_quiz_and_coach.py -v
```

These tests mock the LLM calls and verify the state contract: that `quiz_results` accumulates correctly, that `current_topic_index` increments, and that the routing functions return the right strings.

:::

In the next chapter, you'll dig into the two production capabilities that have quietly been working since Chapter 2: state persistence that survives crashes, and human-in-the-loop oversight that pauses the graph for approval and resumes when the user responds.

---

## Chapter 5: State Persistence and Human Oversight

Two problems have quietly been solved in the background since Chapter 2: the system can survive crashes, and it can pause mid-execution to wait for a human decision. This chapter makes both explicit. Understanding them is what separates a demo from a production system.

### 5.1 What Checkpointing Actually Does

Every time a LangGraph node completes, the framework serializes the full `AgentState` to SQLite and writes it under a `thread_id`. That thread ID is the session ID you create at the start of `run_session`.

The database structure is straightforward:

```plaintext
data/checkpoints.db
  └── checkpoints table
        thread_id = "a3f1b2c4"   ← your session ID
        checkpoint blob           ← serialized AgentState after each node
```

Multiple checkpoints accumulate per session, one after each node. LangGraph always loads the latest. When you call `graph.invoke(None, config={"configurable": {"thread_id": "a3f1b2c4"}})`, LangGraph reads the most recent checkpoint for that thread ID and picks up from there.

The `get_langfuse_config` function in <VPIcon icon="fas fa-folder-open"/>`src/observability/`<VPIcon icon="fa-brands fa-python"/>`langfuse_setup.py` builds the config dict that carries the thread ID:

```py title="observability/langfuse_setup.py"
def get_langfuse_config(session_id: str) -> dict:
    """
    Build the graph run config with session ID as the checkpoint thread ID.

    The config is passed to graph.invoke() on every call: both the initial
    invocation and any subsequent resume calls. LangGraph uses the thread_id
    to find and load the right checkpoint.
    """
    config = {
        "configurable": {
            "thread_id": session_id,
        }
    }
    # If Langfuse is configured, callbacks are added here (Chapter 6)
    handler = get_langfuse_handler(session_id)
    if handler:
        config["callbacks"] = [handler]
    return config
```

This config object is the single piece of context that connects every `graph.invoke` call in a session to the same checkpoint history.

#### 💡 The SqliteSaver connection pattern

SqliteSaver can be initialised in two ways. The context manager form (`with SqliteSaver.from_conn_string(...) as checkpointer`) closes the connection when the `with` block exits. Since `graph = build_graph()` is a module-level variable that lives for the entire process, the `with` block would close the connection immediately after `build_graph()` returns. Every subsequent `graph.invoke` call would fail trying to write to a closed database.

The correct pattern is `conn = sqlite3.connect(db_path, check_same_thread=False)` followed by `checkpointer = SqliteSaver(conn)`. The connection stays open for the process lifetime.

The `check_same_thread=False` flag is required. SQLite's default prevents a connection created on one thread from being used on another. LangGraph runs node functions and checkpoint writes on different threads internally. Without this flag you get `ProgrammingError: SQLite objects created in a thread can only be used in that same thread` at runtime.

### 5.2 The Human Approval Node: Interrupt and Resume

The Human Approval node uses `interrupt()` to pause the graph mid-execution. This is how LangGraph implements human-in-the-loop: execution stops inside the node, state is checkpointed, and control returns to the caller. When the caller calls `graph.invoke(Command(resume=value), config=config)`, execution resumes inside the same node at the exact line where `interrupt()` was called, with `decision` set to `value`.

```py :collapsed-lines title="agents/human_approval.py"
from langgraph.types import interrupt
from graph.state import StudyRoadmap


def human_approval_node(state: dict) -> dict:
    """
    LangGraph node: Human Approval

    Reads:  state["roadmap"]
    Writes: state["approved"]: True if approved, False if rejected.
            Also returns all other state keys explicitly (see note below).

    When approved=False, the conditional edge routes back to the
    Curriculum Planner to generate a new roadmap.
    When approved=True, the graph continues to the Explainer.
    """
    roadmap = state.get("roadmap")

    if roadmap is None:
        return {"approved": True}

    print(f"\n[Human Approval] Pausing for roadmap review...")

    # interrupt() pauses execution here.
    # The dict passed to interrupt() is the payload. The caller reads this
    # to know what to display to the user.
    # Execution resumes when Command(resume=value) is called by the caller.
    decision = interrupt({
        "type":   "roadmap_approval",
        "roadmap": roadmap,
        "prompt": (
            "Does this study plan look good?\n"
            "  Type 'yes' to start studying\n"
            "  Type 'no' to generate a different plan"
        ),
    })

    approved = str(decision).lower().strip() in ("yes", "y", "ok", "approve")

    if approved:
        print(f"[Human Approval] Roadmap approved. Starting study session.")
    else:
        print(f"[Human Approval] Roadmap rejected. Regenerating...")

    # LangGraph 1.1.0: after Command(resume=...), the next node receives only
    # the keys returned by this node. Not the full pre-interrupt checkpoint.
    # Returning the complete state explicitly ensures downstream agents
    # (explainer, quiz_generator, progress_coach) receive roadmap, session_id, etc.
    return {
        "approved":              approved,
        "roadmap":               roadmap,
        "goal":                  state.get("goal", ""),
        "session_id":            state.get("session_id", ""),
        "current_topic_index":   state.get("current_topic_index", 0),
        "quiz_results":          state.get("quiz_results", []),
        "weak_areas":            state.get("weak_areas", []),
        "study_materials_path":  state.get("study_materials_path",
                                           "study_materials/sample_notes"),
        "error":                 None,
    }
```

The comment about LangGraph 1.1.0 at the bottom of this function documents a real behaviour you will hit in production: after `Command(resume=...)`, the next node's state only contains what the interrupted node explicitly returns. If the node returns only `{"approved": True}`, the explainer node receives a state with no `roadmap`, no `session_id`, no `current_topic_index`, and immediately returns an error.

This is not a bug in your code. It's a known behaviour of LangGraph 1.1.0's state propagation after interrupt/resume. The fix is to return the full state explicitly.

Every state key that downstream nodes need must appear in the return dict. Nodes that run after an interrupt/resume boundary should be treated as if they're receiving state from scratch, not from a merged checkpoint.

#### 💡 `interrupt()` vs interrupt_before

LangGraph offers two ways to pause a graph. `interrupt_before=["node_name"]` in `builder.compile()` pauses *before* the named node and is configured at compile time. `interrupt()` called *inside* a node pauses in the middle of that node's execution and can include a payload (a dict that the caller reads to know what to show the user).

This system uses `interrupt()` inside `human_approval_node` because the approval step needs to pass the roadmap object to the caller. The `interrupt_before` approach would pause before the node runs, but the roadmap is built *inside* the node's predecessor (`curriculum_planner_node`). Using `interrupt()` lets the node receive the roadmap, construct the approval payload, and pause, all in the right sequence.

The Streamlit UI uses `build_graph(interrupt_before=["quiz_generator"])` for a different reason: it needs to stop the graph before `quiz_generator_node` runs so that `input()` is never called inside the graph thread. Both mechanisms are correct for their respective use cases.

### 5.3 Handling the Interrupt in <VPIcon icon="fa-brands fa-python"/>`main.py`

The caller of `graph.invoke` needs to handle the case where the graph pauses. LangGraph signals a pause by including `"__interrupt__"` in the result dict. The interrupt payload (the dict you passed to `interrupt()`) is in `result["__interrupt__"][0].value`.

```py :collapsed-lines title="main.py"
# the interrupt/resume loop

from langgraph.types import Command

result = graph.invoke(state, config=config)

while "__interrupt__" in result:
    interrupt_payload = result["__interrupt__"][0].value
    roadmap = interrupt_payload.get("roadmap")

    # Display the roadmap for the user to review
    if roadmap:
        print(f"\n{'='*60}")
        print("Proposed Study Plan")
        print(f"{'='*60}")
        print(f"Goal: {roadmap.goal}")
        print(f"Duration: {roadmap.total_weeks} weeks @ "
              f"{roadmap.weekly_hours} hrs/week\n")
        for i, topic in enumerate(roadmap.topics, 1):
            prereqs = (f" (needs: {', '.join(topic.prerequisites)})"
                       if topic.prerequisites else "")
            print(f"  {i}. {topic.title} ({topic.estimated_minutes} min){prereqs}")
            print(f"     {topic.description}")

    print(f"\n{interrupt_payload.get('prompt', 'Continue?')}")
    user_input = input("> ").strip()

    # Resume the graph with the user's decision.
    # Command(resume=value) is how you pass input back to the interrupted node.
    result = graph.invoke(Command(resume=user_input), config=config)
```

The `while` loop handles the case where rejecting the roadmap causes the planner to regenerate, which triggers another interrupt. If the user types `no`, the graph runs `curriculum_planner_node` again, returns a new roadmap, hits `interrupt()` again, and the loop shows the new plan. The user can keep rejecting until satisfied. The loop only exits when the graph runs to completion without hitting another interrupt.

The structure is worth understanding precisely:

```plaintext
graph.invoke(initial_state, config)
  → runs: curriculum_planner → human_approval (interrupt() fires)
  → returns: {"__interrupt__": [...]}  ← caller reads roadmap from here

main.py shows roadmap, collects "yes"

graph.invoke(Command(resume="yes"), config)
  → resumes: human_approval (decision = "yes", approved = True)
  → continues: explainer → quiz_generator → progress_coach → ... → END
  → returns: final state dict  ← no "__interrupt__" key
```

The `config` dict with the `thread_id` is identical on both `graph.invoke` calls. This is how LangGraph knows to load the checkpoint from the interrupted node rather than starting fresh.

### 5.4 Resuming a Crashed Session

The same mechanism that handles approval also handles crash recovery. If the process dies between `explainer_node` and `quiz_generator_node`, the SQLite checkpoint has the full state as of the last completed node. Starting a new process and invoking with the same `thread_id` picks up from there.

The `--resume` flag in <VPIcon icon="fa-brands fa-python"/>`main.py` implements this:

```py titl="main.py"
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Learning Accelerator")
    parser.add_argument("goal", nargs="?",
                        default="Learn Python closures and decorators from scratch")
    parser.add_argument("--resume", metavar="SESSION_ID",
                        help="Resume an existing session by ID")
    args = parser.parse_args()

    if args.resume:
        run_session(goal="", session_id=args.resume)
    else:
        run_session(goal=args.goal)
```

Inside `run_session`, a resume and a fresh start differ in exactly one line:

```py titl="main.py"
# For a new session: provide initial state
state = initial_state(goal, session_id)

# For a resume: pass None. LangGraph loads from the checkpoint.
state = None if is_resume else initial_state(goal, session_id)

result = graph.invoke(state, config=config)
```

When `state` is `None`, LangGraph loads the most recent checkpoint for the `thread_id` in `config` and continues from the last completed node. The session ID printed when the original session started is all you need:

```sh
# Original session printed: Session ID: a3f1b2c4
# Process died mid-session

python main.py --resume a3f1b2c4
#
# ============================================================
# Learning Accelerator
# Session ID: a3f1b2c4
# Resuming existing session...
# ============================================================
# 
# [Explainer] Topic: 'Creating Closures'
# ...
```

The graph picks up at the next uncompleted node. Topics that already ran (with their explanations, quiz results, and coaching messages) stay in state. Only the remaining work runs.

### 5.5 The Deserialization Detail You Need to Know

When LangGraph loads a checkpoint from SQLite, it deserializes the stored state back into Python objects. For primitive types (strings, ints, lists of strings), this is transparent. For your custom dataclasses (`Topic`, `StudyRoadmap`, `QuizResult`), LangGraph uses its internal msgpack serializer and may return them as plain dicts rather than dataclass instances.

This is why `get_current_topic`, `session_is_complete`, and `get_latest_quiz_result` in <VPIcon icon="fa-brands fa-python"/>`state.py` all handle both forms:

```py title="state.py"
def get_current_topic(state: dict) -> Topic | None:
    roadmap = state.get("roadmap")
    if roadmap is None:
        return None

    # After checkpoint deserialization, roadmap may be a dict
    if isinstance(roadmap, dict):
        topics_raw = roadmap.get("topics", [])
    else:
        topics_raw = roadmap.topics

    idx = state.get("current_topic_index", 0)
    if idx >= len(topics_raw):
        return None

    t = topics_raw[idx]
    # Individual topics may also be dicts after deserialization
    if isinstance(t, dict):
        return Topic.from_dict(t)
    return t
```

And it's why `Topic`, `StudyRoadmap`, and `QuizResult` each have `from_dict` classmethods. Not as a convenience, but as a necessity for resume to work correctly.

The same pattern applies in any production system that checkpoints custom objects. If your state contains dataclasses or Pydantic models, instrument every state accessor to handle both the live form and the deserialized form. Don't assume the type will be what you put in. Verify it at the point of use.

### 5.6 Test Session Persistence

Run a session, kill it mid-way, and verify that the resume works:

```sh
rm -f data/checkpoints.db
python main.py "Learn Python closures"
```

After the roadmap appears and you type `yes`, wait until you see `[Explainer] Complete after N LLM call(s)`. Then press <kbd>Ctrl</kbd>+<kbd>C</kbd> to kill the process. Note the session ID printed at the start.

Now resume:

```sh
python main.py --resume <session-id>
```

The session should continue from the Quiz Generator. The explanation is already in state, so it goes straight to the questions for the first topic.

::: note 📌 Checkpoint

Run the checkpointing tests:

```sh
pytest tests/test_checkpointing.py -v
```

Expected: 20 tests, all passing. These tests verify the checkpoint round-trip: that a session interrupted mid-run can be resumed and produces the expected state, and that the dict-vs-dataclass deserialization is handled correctly.

The enterprise connection: a sales enablement platform uses the same checkpoint pattern for manager approval.

When the curriculum agent builds a training plan for a new hire, the graph pauses and sends the manager a notification. The manager reviews the plan in a web dashboard, approves or modifies it, and submits. That HTTP POST calls `graph.invoke(Command(resume=decision), config=config)`. The LangGraph code is identical to the terminal version. Only the notification mechanism and input collection differ.

:::

In the next chapter, you'll add observability: Langfuse capturing every agent call, LLM invocation, and tool execution as a structured trace you can query and visualise.

---

## Chapter 6: Observability with Langfuse

A multi-agent system that produces wrong output with no error is harder to debug than one that crashes. Standard infrastructure metrics (CPU, memory, request latency, error rate) tell you the system is healthy while the agents are reasoning incorrectly. You need a different kind of observability: one that captures not just whether a call was made, but what the model decided and why.

Langfuse provides this. It records every LLM call, every tool invocation, and the full message history at each step, grouped into traces by session. When something goes wrong, you open the trace for that session and see exactly what each agent received, what it called, and what it returned.

This chapter adds Langfuse to the system with a single integration point and a graceful degradation pattern: the system runs identically with or without Langfuse configured.

### 6.1 Run Langfuse Locally with Docker

Langfuse is self-hosted for this tutorial. All traces stay on your machine – no API keys required, no data leaves your network. The <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in the repository starts the full Langfuse stack:

```yaml title="docker-compose.yml"
services:
  langfuse-server:
    image: langfuse/langfuse:3
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/langfuse
      NEXTAUTH_URL: http://localhost:3000
      NEXTAUTH_SECRET: local-dev-secret-change-in-production
      SALT: local-dev-salt-change-in-production
      ENCRYPTION_KEY: "0000000000000000000000000000000000000000000000000000000000000000"
      LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: "true"
      TELEMETRY_ENABLED: "false"

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: langfuse
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - langfuse_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d langfuse"]
      interval: 5s
      retries: 10

volumes:
  langfuse_postgres_data:
```

Start the stack:

```sh
docker compose up -d
```

Wait about 20 seconds for Postgres to initialise. Then open `http://localhost:3000`, create an account (local, no email verification required), and create a project called `learning-accelerator`.

Langfuse will show you your API keys under **Settings → API Keys**. Copy both the public and secret keys into your <VPIcon icon="iconfont icon-dotenv"/>`.env`:

```sh title=".env"
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_HOST=http://localhost:3000
```

### 6.2 The Observability Module

The integration lives entirely in <VPIcon icon="fas fa-folder-open"/>`src/observability/`<VPIcon icon="fa-brands fa-python"/>`langfuse_setup.py`. Every other file in the project is unchanged. Agent nodes don't import from this module, call any Langfuse functions, or know whether observability is running.

This is the correct architecture for observability. If you add logging calls inside agent functions, you've coupled agent logic to the observability framework. Replacing Langfuse with a different tool means touching every agent. The callback pattern keeps that coupling out of your business logic entirely.

The module has four functions with one-way dependencies. Each builds on the previous:

```py title="observability/langfuse_setup.py"
import os

def _langfuse_configured() -> bool:
    """
    Check whether Langfuse credentials are present in the environment.

    Returns False if either key is missing or empty. In that case the
    system runs without observability rather than raising an error.
    """
    public_key = os.getenv("LANGFUSE_PUBLIC_KEY", "").strip()
    secret_key = os.getenv("LANGFUSE_SECRET_KEY", "").strip()
    return bool(public_key and secret_key)
```

`_langfuse_configured()` is the guard used by every other function. No credentials means no Langfuse, but the system still runs. This is the graceful degradation pattern: observability is a production enhancement, not a hard dependency.

```py title="observability/langfuse_setup.py"
def get_langfuse_handler(session_id: str, user_id: str = "local"):
    """
    Create a Langfuse callback handler for a session, or None if not configured.

    The handler is a LangChain CallbackHandler that Langfuse provides.
    When attached to graph.invoke(), it intercepts every LLM call, tool call,
    and chain invocation automatically. No changes to agent code required.
    """
    if not _langfuse_configured():
        return None

    try:
        from langfuse.langchain import CallbackHandler

        return CallbackHandler(
            public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
            secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
            host=os.getenv("LANGFUSE_HOST", "http://localhost:3000"),
            session_id=session_id,
            user_id=user_id,
            tags=["learning-accelerator", "local-inference"],
            metadata={
                "model":     os.getenv("OLLAMA_MODEL", "qwen2.5:7b"),
                "framework": "langgraph",
            },
        )
    except ImportError:
        print("[Observability] langfuse not installed. Run: pip install langfuse")
        return None
    except Exception as e:
        print(f"[Observability] Failed to create handler: {e}")
        return None
```

The `session_id` passed to `CallbackHandler` groups all traces from one study session together in the Langfuse UI. Every LLM call, tool invocation, and node execution from that session appears under a single session view. You can follow the complete reasoning chain from goal input to final quiz result.

The `tags` list appears as filterable labels in Langfuse. If you run multiple projects, `"learning-accelerator"` lets you filter to just this system's traces.

```py title="observability/langfuse_setup.py"
def get_langfuse_config(
    session_id: str,
    user_id: str = "local",
    extra_config: dict | None = None,
) -> dict:
    """
    Build the complete LangGraph run config for a session.

    Merges the checkpoint thread_id with the Langfuse callback handler.
    This is the only function main.py calls. One function, one config dict,
    everything set up.

    Returns a dict ready to pass as `config` to graph.invoke().
    """
    config = {
        "configurable": {"thread_id": session_id},
    }

    if extra_config:
        config.update(extra_config)

    handler = get_langfuse_handler(session_id, user_id)
    if handler:
        config["callbacks"] = [handler]
        print(f"[Observability] Tracing session {session_id} → "
              f"{os.getenv('LANGFUSE_HOST', 'http://localhost:3000')}")
    else:
        print(f"[Observability] Langfuse not configured. Running without tracing.")

    return config
```

`get_langfuse_config` merges two concerns into one dict: the `thread_id` that LangGraph uses for checkpointing, and the `callbacks` list that LangChain uses to route observability events.

These two keys coexist because `graph.invoke(state, config=config)` passes the full config to LangGraph, which routes `configurable` keys to the checkpointer and `callbacks` to the callback system. Neither system interferes with the other.

```py title="observability/langfuse_setup.py"
def flush_langfuse() -> None:
    """
    Flush pending traces before process exit.

    Langfuse sends traces in a background thread. Without this call,
    the last few seconds of traces may be lost when the process exits.
    Call this at the end of main.py, after all graph.invoke() calls.
    """
    if not _langfuse_configured():
        return
    try:
        from langfuse import Langfuse
        Langfuse().flush()
    except Exception:
        pass  # Best-effort. Don't crash on exit.
```

The `flush` call matters in practice. Langfuse batches traces and sends them asynchronously. A short-running process like `python main.py` can exit before the batch is sent. `flush()` blocks until the queue is empty.

### 6.3 The Single Integration Point

Everything above integrates into <VPIcon icon="fa-brands fa-python"/>`main.py` in exactly two places:

```py title="main.py"
from observability.langfuse_setup import get_langfuse_config, flush_langfuse

def run_session(goal: str, session_id: str | None = None) -> None:
    ...
    # One function call replaces: {"configurable": {"thread_id": session_id}}
    # It returns that same dict, plus callbacks if Langfuse is configured.
    config = get_langfuse_config(session_id)

    result = graph.invoke(state, config=config)
    while "__interrupt__" in result:
        ...
        result = graph.invoke(Command(resume=user_input), config=config)

    print_session_summary(result)

    # Flush before exit
    flush_langfuse()
```

That's the complete integration. No imports in agent files. No Langfuse calls scattered through the codebase. No conditional checks in node functions. The callback handler intercepts calls at the LangChain framework level. Your agent code is untouched.

#### 💡 What the callback system captures automatically

The `CallbackHandler` hooks into LangChain's callback protocol. Every time a LangChain-compatible object (`ChatOllama`, a tool, a chain, a graph node) starts or finishes execution, it fires callback events. Langfuse's handler catches these and records them as trace spans.

For this system, that means every `llm.invoke()` call across all five agents, every `TOOL_MAP[name].invoke(args)` call in the Explainer's tool-calling loop, every node start and end time, and the full message history at each step are all captured without any code change in the agents.

### 6.4 What You See in the Langfuse UI

Run a session with Langfuse configured:

```sh
python main.py "Learn Python closures"
```

Open `localhost:3000` and navigate to **Traces**. You'll see a trace for your session. Expand it:

```plaintext
Session: a3f1b2c4
  ├── curriculum_planner_node       245ms
  │     └── ChatOllama.invoke       238ms
  │           input:  "Create a study roadmap for..."
  │           output: {"goal": "Learn Python closures", "topics": [...]}
  │
  ├── human_approval_node           (interrupted, user input collected)
  │
  ├── explainer_node                4,821ms
  │     ├── ChatOllama.invoke       312ms   → tool_list_files()
  │     ├── tool_list_files         2ms     ← ["closures.md", ...]
  │     ├── ChatOllama.invoke       287ms   → tool_read_file("closures.md")
  │     ├── tool_read_file          1ms     ← "# Python Closures\n..."
  │     ├── ChatOllama.invoke       1,204ms → (no tool calls. final explanation)
  │     └── tool_memory_set         1ms
  │
  ├── quiz_generator_node           8,342ms
  │     ├── ChatOllama.invoke       1,890ms  (question generation)
  │     ├── ChatOllama.invoke       892ms    (grading Q1)
  │     ├── ChatOllama.invoke       874ms    (grading Q2)
  │     └── ChatOllama.invoke       891ms    (grading Q3)
  │
  └── progress_coach_node           1,102ms
        └── ChatOllama.invoke       1,088ms
```

There are three things this trace tells you immediately that no infrastructure metric would reveal.

1. **Latency breakdown by agent.** The Quiz Generator takes 8 seconds across four LLM calls. If you need to optimise latency, the grading calls are the target: three calls at ~900ms each, potentially parallelisable.
2. **Tool call sequence.** The Explainer called `tool_list_files`, then `tool_read_file`, then wrote to memory, in the right order. If the sequence is wrong, you see it here before you look at any code.
3. **LLM input and output at every step.** If the Curriculum Planner produces a malformed roadmap, you see the raw LLM output in the trace. If the grader gives an incorrect score, you see what it received and what it returned.

### 6.5 Graceful Degradation

The system is designed to run identically with and without Langfuse. If you don't set the environment variables, `_langfuse_configured()` returns False and `get_langfuse_config` returns the minimal config with only `thread_id`:

```py
# Without Langfuse configured
config = get_langfuse_config("a3f1b2c4")
# Returns: {"configurable": {"thread_id": "a3f1b2c4"}}

# With Langfuse configured
config = get_langfuse_config("a3f1b2c4")
# Returns: {"configurable": {"thread_id": "a3f1b2c4"},
#           "callbacks": [<CallbackHandler>]}
```

The agent nodes receive neither version of this config. They only receive `state`. The config is consumed by LangGraph and LangChain infrastructure, not by your business logic.

This is the right production pattern. Observability infrastructure should fail silently and degrade gracefully. An outage in your tracing backend shouldn't take down your application.

### 6.6 Run the Observability Tests

```sh
pytest tests/test_observability.py -v
```

Expected: 16 tests passing, no Langfuse server required. The tests mock the `_langfuse_configured` check and verify:

- `get_langfuse_config` always includes `thread_id` in `configurable`
- No `callbacks` key appears when Langfuse is not configured
- `flush_langfuse` is a no-op when credentials are missing
- `get_langfuse_handler` returns `None` on `ImportError` without raising

None of these tests require the Langfuse server to be running. They verify the integration logic: that the module behaves correctly in both the configured and unconfigured state.

The enterprise connection: production multi-agent systems in regulated industries use observability for compliance as much as debugging. Langfuse traces provide an auditable record of every LLM call (input, output, timestamp, session ID) that can be exported for regulatory review. The same trace that helps you debug a wrong quiz score can demonstrate to an auditor what the model was given and what it produced.

In the next chapter, you'll add automated quality evaluation: DeepEval running LLM-as-judge tests that verify the Explainer's output is faithful to your notes, and the Quiz Generator's questions are relevant to the topic.

---

## Chapter 7: Evaluating Agent Quality with DeepEval

Observability tells you what happened. Evaluation tells you whether what happened was any good.

A multi-agent system can run to completion with no errors while still producing explanations that hallucinate facts, questions that test the wrong thing, and grading that scores incorrect answers as correct.

These failures are invisible to infrastructure metrics. They're invisible to most unit tests. The only reliable way to catch them is to evaluate the LLM's outputs using another LLM as the judge.

This chapter adds automated quality evaluation using DeepEval with a custom `OllamaJudge` class. All evaluation runs locally. No cloud API keys, no per-evaluation cost.

### 7.1 LLM-as-Judge Evaluation

LLM-as-judge is the pattern of using one LLM call to evaluate the output of another. Given an explanation the Explainer produced, a judge model reads the explanation and the source notes and answers a structured question: "Is every claim in this explanation supported by the notes?"

This isn't a perfect evaluation. The judge model can also be wrong. But for the kind of qualitative assessment that matters here (is the explanation faithful? are the questions relevant? is the grading fair?), a carefully prompted LLM judge consistently outperforms rule-based heuristics and is far more practical than human review at scale.

DeepEval provides the evaluation framework. It handles the judge prompt construction, scoring rubrics, and metric aggregation. You provide the test cases and optionally a custom model.

### 7.2 The OllamaJudge Class

DeepEval uses OpenAI by default. To keep evaluation local, you subclass `DeepEvalBaseLLM` and wire it to your Ollama instance:

```py :collapsed-lines title="tests/test_eval.py"
import os
from deepeval.models import DeepEvalBaseLLM
from langchain_ollama import ChatOllama


class OllamaJudge(DeepEvalBaseLLM):
    """
    Custom judge model using local Ollama.

    DeepEval supports custom models via the DeepEvalBaseLLM interface.
    We wrap ChatOllama to provide synchronous and async generation.

    The judge runs at temperature=0.0 for consistency. The same answer
    evaluated twice should produce the same score.
    """

    def __init__(self):
        self.model_name = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
        self.base_url   = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

    def load_model(self):
        return ChatOllama(
            model=self.model_name,
            base_url=self.base_url,
            temperature=0.0,   # Deterministic for evaluation
        )

    def generate(self, prompt: str) -> str:
        return self.load_model().invoke(prompt).content

    async def a_generate(self, prompt: str) -> str:
        return self.generate(prompt)

    def get_model_name(self) -> str:
        return f"ollama/{self.model_name}"


def get_judge_model():
    """Return an OllamaJudge, or None if deepeval is not installed."""
    try:
        return OllamaJudge()
    except ImportError:
        return None
```

`temperature=0.0` on the judge is a deliberate choice. You want evaluation to be stable: run the same test twice and get the same score. A higher temperature introduces variance that makes it hard to tell whether a score change reflects a real quality change or random sampling.

### 7.3 The Two-tier Test Strategy

The test suite uses two tiers with different execution profiles.

**Unit tests** are fast, no Ollama required, and they run on every code change. These verify the structural contracts: does `generate_questions` return a list of dicts with the right keys? Does `grade_answer` always return a dict with `correct`, `score`, and `feedback`? Does `get_coaching_message` always return `summary` and `encouragement`?

**Eval tests** are slow (30 to 120 seconds each), require Ollama running, and run before significant changes or releases. These verify quality: is the Explainer's output faithful to the notes? Do the grader's scores track with actual answer quality?

The separation is enforced in two places. First, <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` adds `addopts = "-m 'not eval'"` so `pytest tests/` skips eval tests by default:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
pythonpath = ["src"]
testpaths  = ["tests"]
asyncio_mode = "auto"
addopts    = "-m 'not eval'"
markers = [
    "unit: fast tests, no external dependencies",
    "eval: slow evaluation tests requiring Ollama (LLM-as-judge)",
]
```

Second, every eval test class and function is decorated with `@pytest.mark.eval`:

```py
@pytest.mark.eval
class TestExplainerQuality:
    ...
```

Running eval tests explicitly:

```sh
pytest tests/test_eval.py -m eval -v -s
```

The `-s` flag disables output capture so you can see the model's scores and reasoning in real time.

### 7.4 Shared Fixtures in <VPIcon icon="fa-brands fa-python"/>`conftest.py`

.<VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`conftest.py` holds fixtures shared across all test files:

```py :collapsed-lines title="tests/conftest.py"
import sys
from pathlib import Path
import pytest

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))


def pytest_configure(config):
    """Register custom markers so pytest doesn't warn about unknown marks."""
    config.addinivalue_line(
        "markers",
        "eval: marks tests requiring Ollama (deselect with -m 'not eval')"
    )
    config.addinivalue_line(
        "markers",
        "unit: marks fast tests with no external dependencies"
    )


@pytest.fixture
def sample_roadmap():
    """A minimal StudyRoadmap for use in unit tests."""
    from graph.state import StudyRoadmap, Topic
    return StudyRoadmap(
        goal="Learn Python closures",
        total_weeks=2,
        topics=[
            Topic(
                title="Closures Explained",
                description="Understand how closures capture enclosing scope variables",
                estimated_minutes=60,
            ),
            Topic(
                title="Practical Closure Patterns",
                description="Apply closures to real problems: factories, memoisation",
                estimated_minutes=45,
                prerequisites=["Closures Explained"],
            ),
        ],
    )


@pytest.fixture
def sample_state(sample_roadmap):
    """A minimal AgentState dict for use in unit tests."""
    from graph.state import initial_state
    state = initial_state("Learn Python closures", "test-session-001")
    state["roadmap"] = sample_roadmap
    state["current_topic_index"] = 0
    return state


@pytest.fixture
def closures_note_content():
    """
    The content of closures.md, used as retrieval context in faithfulness tests.
    Falls back to an inline summary if the file doesn't exist.
    """
    notes_path = (
        Path(__file__).parent.parent
        / "study_materials/sample_notes/closures.md"
    )
    if notes_path.exists():
        return notes_path.read_text(encoding="utf-8")
    return (
        "A closure is a nested function that remembers variables from its "
        "enclosing scope even after the enclosing function returns."
    )
```

The `closures_note_content` fixture is the retrieval context for faithfulness tests. DeepEval's `FaithfulnessMetric` asks the judge to verify each claim in the explanation against this content. If the Explainer invents a fact not present in the notes, the metric catches it.

### 7.5 The Explainer Quality Tests

The eval tests for the Explainer answer two questions: is the output faithful to the notes, and is it relevant to what was asked?

```py :collapsed-lines title="tests/test_eval.py"
def run_explainer(topic_title: str, topic_description: str, session_id: str) -> str:
    """Run the Explainer agent and return its final explanation text."""
    from graph.state import StudyRoadmap, Topic, initial_state
    from agents.explainer import explainer_node
    from langchain_core.messages import AIMessage

    state = initial_state(f"Learn {topic_title}", session_id)
    state["roadmap"] = StudyRoadmap(
        goal=f"Learn {topic_title}",
        total_weeks=1,
        topics=[Topic(topic_title, topic_description, 60)],
    )
    state["current_topic_index"] = 0

    result = explainer_node(state)

    # Extract the final response: last AIMessage with no tool_calls
    for msg in reversed(result.get("messages", [])):
        if (isinstance(msg, AIMessage) and msg.content
                and not getattr(msg, "tool_calls", None)):
            return msg.content
    return ""


@pytest.mark.eval
class TestExplainerQuality:

    FAITHFULNESS_THRESHOLD = 0.6
    RELEVANCY_THRESHOLD    = 0.6

    @pytest.fixture(autouse=True)
    def setup(self, closures_note_content):
        """Run the Explainer once, reuse the output across all tests in this class."""
        self.retrieval_context = [closures_note_content]
        self.explanation = run_explainer(
            topic_title="Closures Explained",
            topic_description="Understand how closures capture enclosing scope variables",
            session_id="eval-test-001",
        )
        if not self.explanation:
            pytest.skip("Explainer returned empty output. Check Ollama is running.")

    def test_explanation_is_faithful_to_notes(self):
        """
        The explanation should not hallucinate facts not in the source notes.

        FaithfulnessMetric asks the judge: is every claim in the output
        supported by the retrieval context (the notes)?
        A low score means the agent is making things up.
        """
        from deepeval.test_case import LLMTestCase
        from deepeval.metrics import FaithfulnessMetric

        judge = get_judge_model()
        if judge is None:
            pytest.skip("Could not initialise judge model")

        test_case = LLMTestCase(
            input="Explain Python closures",
            actual_output=self.explanation,
            retrieval_context=self.retrieval_context,
        )
        metric = FaithfulnessMetric(
            model=judge,
            threshold=self.FAITHFULNESS_THRESHOLD,
            include_reason=True,
        )
        metric.measure(test_case)

        print(f"\n[Faithfulness] Score: {metric.score:.3f}")
        if hasattr(metric, "reason"):
            print(f"[Faithfulness] Reason: {metric.reason}")

        assert metric.score >= self.FAITHFULNESS_THRESHOLD, (
            f"Faithfulness {metric.score:.3f} below {self.FAITHFULNESS_THRESHOLD}.\n"
            f"The explanation may contain hallucinated facts.\n"
            f"Reason: {getattr(metric, 'reason', 'not available')}"
        )

    def test_explanation_is_relevant_to_topic(self):
        """The explanation should address what was actually asked."""
        from deepeval.test_case import LLMTestCase
        from deepeval.metrics import AnswerRelevancyMetric

        judge = get_judge_model()
        if judge is None:
            pytest.skip("Could not initialise judge model")

        test_case = LLMTestCase(
            input="Explain Python closures",
            actual_output=self.explanation,
        )
        metric = AnswerRelevancyMetric(
            model=judge,
            threshold=self.RELEVANCY_THRESHOLD,
        )
        metric.measure(test_case)

        print(f"\n[Relevancy] Score: {metric.score:.3f}")

        assert metric.score >= self.RELEVANCY_THRESHOLD, (
            f"Relevancy {metric.score:.3f} below {self.RELEVANCY_THRESHOLD}.\n"
            f"The explanation may have wandered off-topic."
        )
```

The `autouse=True` fixture in `TestExplainerQuality` runs the Explainer once and reuses the output across both tests. This avoids making two separate LLM calls (one per test) when the same explanation can serve both metrics.

### 7.6 The Grading Quality Tests

These tests verify that the grader's scores track with actual answer quality. They don't need DeepEval metrics. They call `grade_answer` directly and assert score ranges:

```py :collapsed-lines title="tests/test_eval.py"
@pytest.mark.eval
class TestGradingQuality:

    def test_correct_answer_scores_high(self):
        """A clearly correct answer should score >= 0.65."""
        from agents.quiz_generator import grade_answer

        result = grade_answer(
            question="What are the three requirements for a Python closure?",
            expected=(
                "A closure requires: 1) a nested inner function, "
                "2) the inner function references a variable from the enclosing scope, "
                "3) the enclosing function returns the inner function."
            ),
            student_answer=(
                "You need a nested function that uses variables from the outer "
                "function's scope, and the outer function has to return the inner function."
            ),
        )
        print(f"\n[GradeQuality] Correct answer: {result.get('score', 0):.2f}")
        assert result.get("score", 0) >= 0.65, (
            f"Correct answer scored too low: {result['score']:.2f}\n"
            f"Feedback: {result.get('feedback', '')}"
        )

    def test_wrong_answer_scores_low(self):
        """A clearly wrong answer should score <= 0.35."""
        from agents.quiz_generator import grade_answer

        result = grade_answer(
            question="What is a Python closure?",
            expected=(
                "A closure is a nested function that captures and remembers "
                "variables from its enclosing scope after the enclosing function returns."
            ),
            student_answer=(
                "A closure is a class that closes over its attributes "
                "and prevents external access to them."
            ),
        )
        print(f"\n[GradeQuality] Wrong answer: {result.get('score', 0):.2f}")
        assert result.get("score", 0) <= 0.35, (
            f"Wrong answer scored too high: {result['score']:.2f}\n"
            f"The grader may be too lenient."
        )

    def test_partial_answer_scores_middle(self):
        """A partially correct answer should score between 0.3 and 0.75."""
        from agents.quiz_generator import grade_answer

        result = grade_answer(
            question="What is late binding in closures and how do you fix it?",
            expected=(
                "Late binding means closures look up variable values at call time, "
                "not at definition time. Fix: use default argument values "
                "(lambda i=i: i instead of lambda: i)."
            ),
            student_answer=(
                "Late binding means the closure uses the variable's current value "
                "when called, not when defined."  # Knows what, not how to fix
            ),
        )
        score = result.get("score", 0)
        print(f"\n[GradeQuality] Partial answer: {score:.2f}")
        assert 0.3 <= score <= 0.75, (
            f"Partial answer should score 0.3 to 0.75, got {score:.2f}"
        )
```

These three tests together give you calibration confidence: the grader rewards correct answers, penalises wrong ones, and gives appropriate partial credit. If any of the three fails after a model change or prompt update, you know immediately which direction the grader drifted.

### 7.7 The Coaching Quality Test

The coaching test uses DeepEval's `GEval` metric, a general-purpose evaluator where you write your own evaluation criteria in plain English:

```py :collapsed-lines title="tests/test_eval.py"
@pytest.mark.eval
class TestProgressCoachQuality:

    COACHING_QUALITY_THRESHOLD = 0.6

    def test_coaching_message_is_encouraging_and_specific(self):
        """
        Coaching messages should be warm, specific, and actionable.

        GEval lets you write evaluation criteria in plain English.
        The judge scores the output 0.0 to 1.0 against those criteria.
        """
        from deepeval.test_case import LLMTestCase, LLMTestCaseParams
        from deepeval.metrics import GEval
        from agents.progress_coach import get_coaching_message

        judge = get_judge_model()
        if judge is None:
            pytest.skip("Could not initialise judge model")

        coaching = get_coaching_message(
            topic="Python Closures",
            score=0.67,
            weak_areas=["late binding", "nonlocal keyword"],
        )
        coaching_text = (
            f"Summary: {coaching.get('summary', '')}\n"
            f"Encouragement: {coaching.get('encouragement', '')}"
        )

        test_case = LLMTestCase(
            input=(
                "Generate coaching feedback for a student who scored 67% on "
                "Python Closures and struggled with late binding and nonlocal"
            ),
            actual_output=coaching_text,
        )
        metric = GEval(
            name="CoachingQuality",
            criteria=(
                "Evaluate whether this coaching message is: "
                "1) Encouraging without being dishonest about the score, "
                "2) Specific to the topic and weak areas mentioned, "
                "3) Actionable. Gives the student a clear next step. "
                "4) Concise. 2 to 4 sentences total. "
                "A poor message is generic, vague, or condescending."
            ),
            evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT],
            model=judge,
            threshold=self.COACHING_QUALITY_THRESHOLD,
        )
        metric.measure(test_case)

        print(f"\n[CoachingQuality] Score: {metric.score:.3f}")

        assert metric.score >= self.COACHING_QUALITY_THRESHOLD, (
            f"Coaching quality {metric.score:.3f} below threshold.\n"
            f"Message:\n{coaching_text}"
        )
```

`GEval` is the most flexible metric DeepEval offers. You describe what "good" looks like in plain language, and the judge scores against those criteria. Use it when you have qualitative requirements that are hard to express as a formula but easy to describe in words.

### 7.8 Run the Evaluation Suite

Unit tests (fast, no Ollama):

```sh
pytest tests/ -v
# 184 tests, eval tests automatically excluded
```

Eval tests (slow, Ollama required):

```sh
pytest tests/test_eval.py -m eval -v -s
```

You'll see output like:

```plaintext title="outptu"
[TestExplainerQuality] Running Explainer for closures topic...
[TestExplainerQuality] Explanation length: 1,847 chars

[Faithfulness] Score: 0.782 (threshold: 0.600)
[Faithfulness] Reason: All major claims trace back to the closures.md source material.
PASSED

[Relevancy] Score: 0.841
PASSED

[GradeQuality] Correct answer: 0.82
PASSED

[GradeQuality] Wrong answer: 0.15
PASSED

[GradeQuality] Partial answer: 0.55
PASSED

[CoachingQuality] Score: 0.731
PASSED
```

#### 💡 Setting thresholds conservatively

Local 7B models score 0.6 to 0.8 on faithfulness and relevancy metrics. Cloud models typically score 0.8 to 0.95. The thresholds in these tests are set at 0.6: low enough to pass reliably with a local model, high enough to catch significant degradation.

If you upgrade to a larger model and want stricter quality gates, raise the thresholds. If a test is consistently failing with a model that produces good output subjectively, lower the threshold and document why.

The enterprise connection: an evaluation suite like this is how you manage the model update problem in production. When you swap from one model version to another, run the eval tests before deploying.

If faithfulness drops below threshold, the model change introduces hallucination risk. Roll it back. If the grader starts scoring correct answers too low, the threshold drift will affect student experience. The eval tests are your regression suite for LLM behaviour, the same way unit tests are your regression suite for code logic.

In the next chapter, you'll add the A2A protocol layer. The Quiz Generator becomes a standalone service that any agent or framework can call, and a CrewAI agent joins the system that the Progress Coach delegates to when a student needs supplementary help.

---

## Chapter 8: Cross-Framework Coordination with A2A

Every agent in the system so far is a Python function that LangGraph calls. That's fine, and for most production systems, keeping everything in one framework is the right choice.

But real infrastructure sometimes requires something different: an agent built with a different framework, maintained by a different team, deployed independently, and callable by anything that speaks HTTP.

The Agent-to-Agent (A2A) protocol makes this possible. A2A is an open standard (built on JSON-RPC 2.0 and HTTP) that gives any agent a standard way to advertise what it can do and accept tasks from any caller, regardless of what framework the caller uses.

A LangGraph agent and a CrewAI agent that have never heard of each other can coordinate through A2A the same way two REST services coordinate through HTTP.

This chapter adds two A2A services to the system: the Quiz Generator exposed as a standalone service, and a CrewAI Study Buddy that the Progress Coach calls when a student needs a different explanation angle.

### 8.1 How A2A Works

A2A has three concepts worth understanding before writing any code.

**The Agent Card** is a JSON document served at `/.well-known/agent-card.json`. It describes what the agent can do: its name, capabilities, skills, and how to send it tasks.

Any A2A client fetches this first to discover whether the agent can handle its request. The Agent Card is the agent's public API contract, analogous to an OpenAPI spec for a REST service.

**Task submission** uses a single endpoint: `POST /tasks/send`. The request is a JSON-RPC 2.0 envelope wrapping a message: a role (`"user"`) and a list of parts (typically one `TextPart` with JSON content). The agent processes the task and responds with a message in the same format.

**Framework independence** is the point. The A2A server handles all the HTTP and protocol mechanics. Your agent code goes in an `AgentExecutor` subclass: an `execute()` method that receives the parsed request and emits the response. The framework building the executor (LangGraph, CrewAI, or anything else) never appears in the protocol layer. Callers see only HTTP.

```plaintext
Caller (any framework)
  ↓  GET /.well-known/agent-card.json   ← discover capabilities
  ↓  POST /tasks/send                   ← submit task (JSON-RPC 2.0)
  ↑  response with result artifacts
A2A Server (Starlette + uvicorn)
  ↓  calls AgentExecutor.execute()
Your agent logic (LangGraph / CrewAI / anything)
```
<!-- TODO: mermaid화 -->

### 8.2 The Quiz Generator as an A2A Service

.<VPIcon icon="fas fa-folder-open"/>`src/a2a_services/`<VPIcon icon="fa-brands fa-python"/>`quiz_service.py` wraps `generate_questions` and `grade_answer` (the same functions used in Chapter 4) as an A2A service. Nothing in those functions changes.

**The Agent Card** first:

```py title="a2a_services/quiz_service.py"
from a2a.types import AgentCapabilities, AgentCard, AgentSkill

QUIZ_SKILL = AgentSkill(
    id="generate_and_grade_quiz",
    name="Generate and Grade Quiz",
    description=(
        "Given a topic and optional explanation text, generates quiz questions "
        "that test conceptual understanding. If answers are provided, grades "
        "each answer and returns scores with identified weak areas."
    ),
    tags=["quiz", "assessment", "education", "grading"],
    examples=[
        "Generate a quiz on Python closures",
        "Grade these answers for a decorators quiz",
    ],
)

QUIZ_AGENT_CARD = AgentCard(
    name="Quiz Generator Service",
    description=(
        "Generates and grades quizzes using LLM-as-judge. "
        "Framework-agnostic: works with any A2A-compatible agent."
    ),
    url="http://localhost:9001/",
    version="1.0.0",
    defaultInputModes=["text"],
    defaultOutputModes=["text"],
    capabilities=AgentCapabilities(streaming=False),
    skills=[QUIZ_SKILL],
)
```

The Agent Card is served automatically at `GET /.well-known/agent-card.json` by the A2A framework. You don't write a handler for it.

**The AgentExecutor** contains the actual quiz logic. It receives the parsed A2A request, calls `generate_questions` and optionally `grade_answer`, and emits the result:

```py :collapsed-lines title="a2a_services/quiz_service.py"
from a2a.server.agent_execution import AgentExecutor, RequestContext
from a2a.server.events import EventQueue
from a2a.types import Message, TextPart
from agents.quiz_generator import generate_questions, grade_answer


class QuizAgentExecutor(AgentExecutor):
    """
    Handles incoming A2A quiz tasks.

    Request format (JSON in the TextPart):
    {
        "topic":       "Python Closures",
        "explanation": "A closure is...",   (optional)
        "answers":     ["answer 1", ...]    (optional. omit for questions only)
    }
    """

    async def execute(
        self,
        context: RequestContext,
        event_queue: EventQueue,
    ) -> None:
        # Parse request
        request_text = ""
        for part in context.current_request.params.message.parts:
            if isinstance(part, TextPart):
                request_text += part.text

        try:
            request_data = json.loads(request_text)
        except json.JSONDecodeError:
            request_data = {"topic": request_text}

        topic             = request_data.get("topic", "General Knowledge")
        explanation       = request_data.get("explanation", "")
        provided_answers  = request_data.get("answers", [])

        # Generate questions (synchronous blocking call in thread pool)
        questions_data = await asyncio.to_thread(
            generate_questions, topic, explanation, 3
        )

        if not provided_answers:
            # No answers. Return questions only.
            result = {
                "status":    "questions_ready",
                "topic":     topic,
                "questions": questions_data,
            }
        else:
            # Grade provided answers
            graded     = []
            total      = 0.0
            weak_areas = []

            for q_data, answer in zip(questions_data, provided_answers):
                grade = await asyncio.to_thread(
                    grade_answer,
                    q_data["question"],
                    q_data["expected_answer"],
                    answer,
                )
                score = float(grade.get("score", 0.0))
                total += score
                if grade.get("missing_concept"):
                    weak_areas.append(grade["missing_concept"])
                graded.append({
                    "question": q_data["question"],
                    "answer":   answer,
                    "score":    score,
                    "correct":  bool(grade.get("correct", False)),
                    "feedback": grade.get("feedback", ""),
                })

            result = {
                "status":           "graded",
                "topic":            topic,
                "score":            total / len(questions_data) if questions_data else 0.0,
                "questions":        questions_data,
                "graded_questions": graded,
                "weak_areas":       list(set(weak_areas)),
            }

        # Emit result. A2A sends this back to the caller.
        await event_queue.enqueue_event(
            Message(
                role="agent",
                parts=[TextPart(text=json.dumps(result, indent=2))],
            )
        )

    async def cancel(self, context: RequestContext, event_queue: EventQueue) -> None:
        pass
```

`asyncio.to_thread` wraps the synchronous `generate_questions` and `grade_answer` calls. The A2A executor is async. It runs in an event loop. Calling a blocking function directly would freeze the loop and block all other tasks. `to_thread` runs the blocking function in a thread pool and awaits the result without blocking the event loop.

**Starting the server:**

```py
from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore

def create_quiz_server():
    handler = DefaultRequestHandler(
        agent_executor=QuizAgentExecutor(),
        task_store=InMemoryTaskStore(),
    )
    app = A2AStarletteApplication(
        agent_card=QUIZ_AGENT_CARD,
        http_handler=handler,
    )
    return app.build()

if __name__ == "__main__":
    uvicorn.run(create_quiz_server(), host="0.0.0.0", port=9001, log_level="warning")
```

```sh
python src/a2a_services/quiz_service.py
# [Quiz A2A Service] Starting on http://localhost:9001
# [Quiz A2A Service] Agent Card: http://localhost:9001/.well-known/agent-card.json
```

Verify it's running:

```sh
curl http://localhost:9001/.well-known/agent-card.json
```

```json title="agent-card.json"
{
  "name": "Quiz Generator Service",
  "description": "Generates and grades quizzes...",
  "url": "http://localhost:9001/",
  "skills": [
    {
      "id": "generate_and_grade_quiz",
      "name": "Generate and Grade Quiz"
    }
  ]
}
```

### 8.3 The A2A Client

.<VPIcon icon="fas fa-folder-open"/>`src/a2a_services/`<VPIcon icon="fa-brands fa-python"/>`a2a_client.py` keeps the HTTP and protocol details out of agent code. The Progress Coach never constructs JSON-RPC envelopes. It calls `delegate_quiz_task` and gets a result dict back.

```py :collapsed-lines title="a2a_services/a2a_client.py"

import httpx
import json
import uuid

QUIZ_SERVICE_URL  = os.getenv("QUIZ_SERVICE_URL",  "http://localhost:9001")
STUDY_BUDDY_URL   = os.getenv("STUDY_BUDDY_URL",   "http://localhost:9002")
DEFAULT_TIMEOUT   = 120.0


def discover_agent(base_url: str) -> dict:
    """Fetch an Agent Card to discover capabilities. Returns {} if unreachable."""
    card_url = f"{base_url.rstrip('/')}/.well-known/agent-card.json"
    try:
        response = httpx.get(card_url, timeout=5.0)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"[A2A Client] Cannot reach {card_url}: {e}")
        return {}


def send_task(
    base_url: str,
    message_text: str,
    task_id: str | None = None,
    timeout: float = DEFAULT_TIMEOUT,
) -> dict:
    """
    Submit a task to an A2A agent via JSON-RPC 2.0.     The JSON-RPC envelope is what A2A requires. Your caller doesn't
    need to know about the envelope. It just passes a text payload.
    Pass an explicit task_id when you need an idempotency key; otherwise
    a UUID is generated for you.
    """
    payload = {
        "jsonrpc": "2.0",
        "id":      1,
        "method":  "tasks/send",
        "params": {
            "id":      task_id or str(uuid.uuid4()),
            "message": {
                "role":  "user",
                "parts": [{"type": "text", "text": message_text}],
            },
        },
    }

    url = f"{base_url.rstrip('/')}/tasks/send"
    try:
        response = httpx.post(url, json=payload, timeout=timeout)
        response.raise_for_status()
        data = response.json()

        # Extract text from the A2A response envelope:
        # result.artifacts[0].parts[0].text
        result    = data.get("result", {})
        artifacts = result.get("artifacts", [])
        if artifacts:
            for part in artifacts[0].get("parts", []):
                if part.get("type") == "text":
                    try:
                        return json.loads(part["text"])
                    except json.JSONDecodeError:
                        return {"text": part["text"]}

        # Fallback: check status message
        status = result.get("status", {})
        for part in status.get("message", {}).get("parts", []):
            if part.get("type") == "text":
                try:
                    return json.loads(part["text"])
                except json.JSONDecodeError:
                    return {"text": part["text"]}

        return result

    except httpx.TimeoutException:
        return {"error": f"Service timed out after {timeout}s"}
    except httpx.ConnectError:
        return {"error": f"Cannot connect to {url}"}
    except Exception as e:
        return {"error": f"A2A task failed: {e}"}


def delegate_quiz_task(
    topic: str,
    explanation: str,
    answers: list[str] | None = None,
    quiz_service_url: str = QUIZ_SERVICE_URL,
) -> dict:
    """High-level helper: delegate a quiz task to the Quiz A2A service."""
    payload = json.dumps({
        "topic":       topic,
        "explanation": explanation,
        "answers":     answers or [],
    })
    return send_task(quiz_service_url, payload)


def is_quiz_service_available(quiz_service_url: str = QUIZ_SERVICE_URL) -> bool:
    """Quick health check: is the quiz service reachable?"""
    return bool(discover_agent(quiz_service_url))
```

`discover_agent` is the health check. It fetches the Agent Card at `/.well-known/agent-card.json` with a 5-second timeout. If that succeeds, the service is reachable and can accept tasks. The Progress Coach calls this before delegating. If it returns `{}`, the coach falls back to local quiz generation without ever trying the full task submission.

### 8.4 The CrewAI Study Buddy

The Study Buddy demonstrates the core A2A value proposition: a LangGraph agent calling a CrewAI agent through a protocol neither knows about.

.<VPIcon icon="fas fa-folder-open"/>`src/crewai_agent/`<VPIcon icon="fa-brands fa-python"/>`study_buddy.py` builds a CrewAI agent, wraps it in an A2A `AgentExecutor`, and serves it on port 9002. The LangGraph Progress Coach never imports CrewAI. The CrewAI agent never imports LangGraph. They communicate only through HTTP.

The CrewAI side:

```py :collapsed-lines title="crewai_agent/study_buddy.py"
from crewai import Agent, Crew, LLM, Process, Task
from crewai.tools import BaseTool

MODEL_NAME     = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")


class TopicAnalyserTool(BaseTool):
    """
    Structures the Study Buddy's approach before generating its response.

    In production this might query a knowledge graph or curriculum database.
    For the tutorial, it produces structured guidance from the inputs.
    """
    name:        str = "topic_analyser"
    description: str = (
        "Analyse a study topic and weak areas to produce a structured "
        "list of key concepts to focus on."
    )
    args_schema: type = TopicAnalyserInput

    def _run(self, topic: str, weak_areas: list[str] | None = None) -> str:
        areas = weak_areas or []
        return json.dumps({
            "topic":              topic,
            "focus_areas":        areas or [f"Core concepts of {topic}"],
            "suggested_approach": f"Start with fundamentals, then address: {', '.join(areas)}.",
            "study_tip": (
                "Try explaining the concept out loud in your own words. "
                "If you can teach it simply, you understand it."
            ),
        })


def build_study_buddy_crew(topic: str, explanation: str, weak_areas: list[str]) -> Crew:
    """Build a CrewAI crew for a specific study assistance request."""
    llm = LLM(model=f"ollama/{MODEL_NAME}", base_url=OLLAMA_BASE_URL)

    agent = Agent(
        role="Study Buddy",
        goal=(
            "Provide clear, encouraging supplementary explanations that help "
            "students understand difficult concepts from a fresh angle."
        ),
        backstory=(
            "You are an experienced tutor who specialises in finding alternative "
            "explanations and analogies that make difficult ideas click."
        ),
        llm=llm,
        tools=[TopicAnalyserTool()],
        verbose=False,
        allow_delegation=False,
    )

    weak_text = (
        f"The student struggled with: {', '.join(weak_areas)}"
        if weak_areas else "No specific weak areas identified."
    )

    task = Task(
        description=(
            f"A student is studying '{topic}'. They received this explanation:\n\n"
            f"{explanation[:1000]}\n\n"
            f"{weak_text}\n\n"
            f"Use the topic_analyser tool to structure your approach. Then provide:\n"
            f"1) A fresh analogy that explains the core concept differently\n"
            f"2) One concrete example targeting the weak area(s)\n"
            f"3) One practical tip for remembering this concept\n"
            f"Keep your response concise and encouraging (150-250 words)."
        ),
        agent=agent,
        expected_output=(
            "A study assistance response with a fresh analogy, "
            "a targeted example, and a memory tip."
        ),
    )

    return Crew(
        agents=[agent],
        tasks=[task],
        process=Process.sequential,
        verbose=False,
    )
```

The A2A wrapper bridges the CrewAI crew to the A2A protocol. This is `StudyBuddyExecutor`, the same structure as `QuizAgentExecutor`, but calling `crew.kickoff()` instead of quiz functions:

```py :collapsed-lines
class StudyBuddyExecutor(AgentExecutor):
    """
    Bridges the A2A protocol to CrewAI execution.

    The LangGraph system has no idea this is CrewAI.
    The CrewAI crew has no idea it's serving an A2A request.
    """

    async def execute(
        self,
        context: RequestContext,
        event_queue: EventQueue,
    ) -> None:
        # Parse request
        request_text = ""
        for part in context.current_request.params.message.parts:
            if isinstance(part, TextPart):
                request_text += part.text

        try:
            request_data = json.loads(request_text)
        except json.JSONDecodeError:
            request_data = {"topic": request_text}

        topic       = request_data.get("topic", "General Topic")
        explanation = request_data.get("explanation", "")
        weak_areas  = request_data.get("weak_areas", [])

        # CrewAI's kickoff() is synchronous. Run in thread pool
        # to avoid blocking the async event loop.
        try:
            crew        = build_study_buddy_crew(topic, explanation, weak_areas)
            crew_result = await asyncio.to_thread(crew.kickoff)
            result_text = crew_result.raw if hasattr(crew_result, "raw") else str(crew_result)

            result = {
                "source":     "crewai_study_buddy",
                "topic":      topic,
                "weak_areas": weak_areas,
                "assistance": result_text,
                "status":     "complete",
            }
        except Exception as e:
            result = {
                "source":     "crewai_study_buddy",
                "topic":      topic,
                "assistance": f"Could not generate supplementary help for '{topic}'.",
                "status":     "error",
                "error":      str(e),
            }

        await event_queue.enqueue_event(
            Message(
                role="agent",
                parts=[TextPart(text=json.dumps(result, indent=2))],
            )
        )
```

`asyncio.to_thread(crew.kickoff)` is the critical line. CrewAI's `kickoff()` is synchronous and blocking. It can run for 30 to 60 seconds depending on the model and task complexity.

Calling it directly in an `async` function would freeze the entire A2A server during that time, preventing it from accepting any other requests. `asyncio.to_thread` runs it in Python's default thread pool, freeing the event loop to handle other requests while the crew runs.

### 8.5 The Progress Coach Fallback Pattern

The Progress Coach module ships two helpers for talking to A2A services. Each one tries the external service first and falls back to a local default on any failure.

The Study Buddy helper is wired into `progress_coach_node` and runs whenever a topic score is below the pass threshold.

The quiz delegation helper is provided as a ready-to-use building block for readers who want to route grading through the A2A service instead of running it inline. The default flow keeps quiz generation local for simplicity.

Both helpers use the same circuit-breaker pattern: probe the Agent Card first, time-bound the actual task call, and never let an external failure surface to the user.

```py title="agents/progress_coach.py"
QUIZ_SERVICE_URL = "http://localhost:9001"

def try_a2a_quiz_delegation(topic, explanation, answers) -> dict | None:
    """
    Attempt to delegate quiz grading to the A2A Quiz Service.
    Returns the grading result, or None on any failure.

    Note: USE_A2A_QUIZ is read at call time, not at module load time.
    Reading env vars at import time causes test isolation failures.
    The env var state at import time gets baked in for the process lifetime.
    """
    use_a2a = os.getenv("USE_A2A_QUIZ", "true").lower() == "true"
    if not use_a2a:
        return None

    try:
        from a2a_services.a2a_client import delegate_quiz_task, is_quiz_service_available

        if not is_quiz_service_available(QUIZ_SERVICE_URL):
            print(f"[Progress Coach] Quiz A2A service unavailable. Using local.")
            return None

        print(f"[Progress Coach] Delegating quiz to A2A: {QUIZ_SERVICE_URL}")
        result = delegate_quiz_task(topic=topic, explanation=explanation, answers=answers)

        if "error" in result:
            print(f"[Progress Coach] A2A failed: {result['error']}")
            return None

        return result

    except Exception as e:
        print(f"[Progress Coach] A2A error: {e}")
        return None


def try_study_buddy_assistance(topic, explanation, weak_areas) -> str | None:
    """
    Request supplementary help from the CrewAI Study Buddy.
    Returns assistance text, or None if the service is unavailable.
    """
    study_buddy_url = os.getenv("STUDY_BUDDY_URL", "http://localhost:9002")
    use_study_buddy = os.getenv("USE_STUDY_BUDDY", "true").lower() == "true"

    if not use_study_buddy:
        return None

    try:
        from a2a_services.a2a_client import request_study_assistance, is_study_buddy_available

        if not is_study_buddy_available(study_buddy_url):
            return None

        result = request_study_assistance(
            topic=topic,
            explanation=explanation,
            weak_areas=weak_areas,
            study_buddy_url=study_buddy_url,
        )

        if result.get("status") == "error" or "error" in result:
            return None

        return result.get("assistance", "")

    except Exception as e:
        return None
```

The comment about `os.getenv` at call time is worth internalising. Reading an environment variable at module import time (`USE_A2A = os.getenv("USE_A2A_QUIZ", "true") == "true"` at the top of the file) bakes in the value that was present when the module was first imported. Tests that set the env var before calling a function won't see the change because the module already ran. Reading inside the function guarantees the current value at every call.

### 8.6 Running the Full Three-Terminal Setup

With all services in place, the full system uses three terminals.

**Terminal 1:** The main Learning Accelerator:

```sh
source .venv/bin/activate
python main.py "Learn Python closures"
```

**Terminal 2:** The Quiz Generator A2A service:

```sh
source .venv/bin/activate
python src/a2a_services/quiz_service.py
```

**Terminal 3:** The CrewAI Study Buddy:

```sh
source .venv/bin/activate
python src/crewai_agent/study_buddy.py
```

Or using Make:

```sh
make services   # Terminals 2 and 3 in background
make run        # Terminal 1
```

When the Progress Coach runs with both services up, you'll see:

```plaintext title="output"
[Progress Coach] Score: 35%
[Progress Coach] Delegating quiz to A2A: http://localhost:9001
[Quiz A2A] Task received: topic='Python Functions', answers_provided=3
[Quiz A2A] Task complete: status=graded
[Progress Coach] A2A quiz complete: score=35%
[Progress Coach] Requesting study assistance from CrewAI Study Buddy...
[Study Buddy A2A] Request: topic='Python Functions', weak_areas=['first-class functions']
[Study Buddy A2A] Task complete (287 chars)

────────────────────────────────────────────────────────────
Coach: You scored 35% on Python Functions. That's a solid foundation to build on...

📚 Study Buddy says:
Think of functions like variables with superpowers. Just as you can pass a number
to another function, you can pass a function too...
────────────────────────────────────────────────────────────
```

When either service is not running, the Progress Coach falls back gracefully:

```plaintext title="output"
[A2A Client] Cannot reach http://localhost:9001/.well-known/agent-card.json: Connection refused
[Progress Coach] Quiz A2A service unavailable. Using local.
```

The session continues. The student never sees the error.

::: note 📌 Checkpoint

Run the A2A tests:

```sh
pytest tests/test_a2a.py tests/test_crewai_interop.py -v
```

Expected: 44 tests, all passing. These tests mock the HTTP calls and verify that `delegate_quiz_task` constructs the right JSON-RPC payload, that `discover_agent` handles connection errors gracefully, and that `build_study_buddy_crew` produces a properly configured Crew. No running services required.

The enterprise connection: A2A is what makes agent systems composable at the organisational level. A compliance training platform built by one team (LangGraph) can call a certification verification service built by another team (CrewAI, or any HTTP service) without either team needing to know the other's implementation details. The A2A protocol is the contract. Both sides honor it. The rest is internal.

:::

In the final chapter, you'll see the complete system running end to end, walk through how to extend it, and look at where the multi-agent ecosystem is heading next.

---

## Chapter 9: The Complete System and What's Next

Everything is built. Four LangGraph agents coordinating through a shared state, two MCP servers providing tool access, two A2A services running as independent processes, Langfuse capturing decision-level traces, DeepEval running quality gates, and a Streamlit UI that makes the whole thing usable without a terminal.

This chapter is the runbook: how every piece fits together, how to run it, how to extend it, and where the patterns apply beyond the Learning Accelerator.

### 9.1 <VPIcon icon="fa-brands fa-python"/>`main.py`: the Entry Point

.<VPIcon icon="fa-brands fa-python"/>`main.py` is under 140 lines. It does four things: load configuration, handle command-line arguments, run the graph with the interrupt/resume loop, and print the session summary.

Every other concern (agents, tools, observability, persistence) is handled by the modules <VPIcon icon="fa-brands fa-python"/>`main.py` imports.

```py :collapsed-lines title="main.py"
import sys
import os
import uuid
from pathlib import Path

# Add src/ to Python path before any project imports
sys.path.insert(0, str(Path(__file__).parent / "src"))

from dotenv import load_dotenv
load_dotenv()

from graph.workflow import graph
from graph.state import initial_state
from observability.langfuse_setup import get_langfuse_config, flush_langfuse


def run_session(goal: str, session_id: str | None = None) -> None:
    """Run a complete interactive study session with Langfuse tracing."""
    is_resume = session_id is not None
    if not session_id:
        session_id = str(uuid.uuid4())[:8]

    # get_langfuse_config() builds the full run config:
    #   - thread_id for SQLite checkpointing
    #   - Langfuse callback handler (if LANGFUSE_PUBLIC_KEY is set)
    config = get_langfuse_config(session_id)

    print(f"\n{'='*60}")
    print(f"Learning Accelerator")
    print(f"Session ID: {session_id}")
    if is_resume:
        print(f"Resuming existing session...")
    else:
        print(f"Goal: {goal}")
    print(f"{'='*60}")

    # For a new session: initial state. For resume: None. LangGraph loads from checkpoint.
    state = None if is_resume else initial_state(goal, session_id)
    result = graph.invoke(state, config=config)

    # Interrupt/resume loop
    from langgraph.types import Command
    while "__interrupt__" in result:
        interrupt_payload = result["__interrupt__"][0].value
        roadmap = interrupt_payload.get("roadmap")
        if roadmap:
            # Display roadmap (abbreviated for chapter. See repo for the full version.)
            print_roadmap(roadmap)
        print(f"\n{interrupt_payload.get('prompt', 'Continue?')}")
        user_input = input("> ").strip()
        result = graph.invoke(Command(resume=user_input), config=config)

    if result.get("error"):
        print(f"\n[ERROR] {result['error']}")
        return

    print_session_summary(result)
    flush_langfuse()   # Ensure all traces are sent before exit


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Learning Accelerator")
    parser.add_argument("goal", nargs="?",
                        default="Learn Python closures and decorators from scratch")
    parser.add_argument("--resume", metavar="SESSION_ID",
                        help="Resume an existing session by ID")
    args = parser.parse_args()

    if args.resume:
        run_session(goal="", session_id=args.resume)
    else:
        run_session(goal=args.goal)
```

Three things worth noting about this file.

**The graph is imported as a module-level singleton.** `from graph.workflow import graph` runs `build_graph()` once at import time. The compiled graph lives for the entire process: same SqliteSaver connection, same registered nodes.

This is intentional. Multiple `graph.invoke` calls (initial plus any resumes from interrupts) all use the same compiled graph with the same checkpointer.

**State handling for resume is one line.** `state = None if is_resume else initial_state(...)`. Passing `None` tells LangGraph to load the latest checkpoint for the `thread_id` in `config`. That's the entire resume mechanism from the caller's side.

**The** `while` **loop handles both approval and rejection.** If the user types `no`, the conditional edge routes back to `curriculum_planner`, which generates a new roadmap, which triggers another `interrupt()`. The loop keeps showing new roadmaps until the user approves one.

### 9.2 The Three-Terminal Startup

The full system needs three processes running simultaneously. The <VPIcon icon="iconfont icon-gnu"/>`Makefile` provides one-command targets:

```sh
make setup      # First time only: create venv and install dependencies
make langfuse   # Optional: start self-hosted Langfuse
make services   # Start both A2A services in background
make run        # Start main application (foreground)
```

The `services` target:

```makefile title="Makefile"
services: stop
    @echo "Starting A2A services..."
    $(PYTHON) src/a2a_services/quiz_service.py &
    @sleep 1
    $(PYTHON) src/crewai_agent/study_buddy.py &
    @sleep 1
    @echo ""
    @echo "Services started:"
    @echo "  Quiz:        http://localhost:9001"
    @echo "  Study Buddy: http://localhost:9002"
```

Verify everything is reachable:

```sh
curl http://localhost:9001/.well-known/agent-card.json
curl http://localhost:9002/.well-known/agent-card.json
curl http://localhost:3000                   # Langfuse UI
```

### 9.3 A Complete Session, End to End

With Ollama running, the A2A services up, and Langfuse configured:

```sh
make services
make run
```

The goal input, approval, and topic loop:

```plaintext :collapsed-lines title="output"
============================================================
Learning Accelerator
Session ID: 8660e1d6
Goal: Learn Python closures and decorators from scratch
============================================================

[Observability] Tracing session 8660e1d6 → http://localhost:3000

[Curriculum Planner] Building roadmap for: 'Learn Python closures...'
[Curriculum Planner] Calling qwen2.5:7b...
[Curriculum Planner] Created roadmap: 5 topics, 4 weeks
  1. Python Functions: 60 min
  2. Scopes and Namespaces (needs: Python Functions): 45 min
  3. Inner Functions (needs: Scopes and Namespaces): 60 min
  4. Creating Closures (needs: Inner Functions): 75 min
  5. Decorator Basics (needs: Creating Closures): 60 min

[Human Approval] Pausing for roadmap review...

============================================================
Proposed Study Plan
============================================================
Goal: Learn Python closures and decorators from scratch
Duration: 4 weeks @ 5 hrs/week

  1. Python Functions (60 min)
     Understand how functions are first-class objects in Python.
  ...

Does this study plan look good?
  Type 'yes' to start studying
  Type 'no' to generate a different plan
> yes

[Human Approval] Roadmap approved. Starting study session.

[Explainer] Topic: 'Python Functions'
[Explainer] LLM call 1/8...
  → tool_list_files({})
    ← ["closures.md", "decorators.md", "python_basics.md"]
[Explainer] LLM call 2/8...
  → tool_read_file({'filename': 'python_basics.md'})
    ← # Python Basics...
[Explainer] Complete after 4 LLM call(s)

[Quiz Generator] Generating quiz for: 'Python Functions'
[Progress Coach] Delegating quiz to A2A: http://localhost:9001
[Quiz A2A] Task received: topic='Python Functions', answers_provided=3
[Quiz A2A] Task complete: status=graded

[Progress Coach] Score: 67%
[Progress Coach] Requesting study assistance from CrewAI Study Buddy...
[Study Buddy A2A] Task complete (287 chars)

────────────────────────────────────────────────────────────
Coach: You've got a solid foundation in Python functions...

📚 Study Buddy says:
Think of functions like variables with superpowers...

Next topic: 'Scopes and Namespaces'
────────────────────────────────────────────────────────────
```

That single session exercises every component in the system: LangGraph orchestration, SQLite checkpointing, human-in-the-loop interrupt, MCP tool calling, A2A delegation to both the Quiz service and the CrewAI Study Buddy, and Langfuse tracing. The session summary prints at the end. The trace appears in Langfuse within seconds.

### 9.4 The Streamlit UI

The terminal interface is fine for development. For daily use, and for demonstrating the system to anyone who isn't going to open a terminal, the system needs a web UI.

.<VPIcon icon="fa-brands fa-python"/>`streamlit_app.py` at the project root provides one. The architectural point is worth understanding: **the LangGraph code in** <VPIcon icon="fas fa-folder-open"/>`src/` **is unchanged**. The same graph that powers <VPIcon icon="fa-brands fa-python"/>`main.py` powers the web app. Only the I/O mechanism is different. `input()` and `print()` become Streamlit widgets, and the interrupt/resume pattern becomes button clicks with `st.session_state` carrying context across reruns.

Streamlit reruns the entire Python script on every user interaction. Anything that needs to persist across reruns lives in `st.session_state`, a dict Streamlit preserves between runs. The LangGraph session ID, run config, roadmap, topic index, and quiz progress all live there.

The app is structured as a state machine with five screens (goal input, roadmap approval, explaining, quizzing, complete) and `st.session_state.screen` determines what renders on each rerun.

The architectural wrinkle is that `quiz_generator_node` calls `run_quiz()` which uses `input()` to collect answers from the terminal. Calling that from Streamlit would freeze the browser. The fix is a UI-specific graph compiled with `interrupt_before=["quiz_generator"]`:

```py title="streamlit_app.py (key excerpt)"
from graph.workflow import build_graph
from graph.state import initial_state, StudyRoadmap, QuizResult
from agents.quiz_generator import generate_questions, grade_answer

# UI-specific graph: pauses BEFORE quiz_generator so the UI can
# handle quiz I/O without input() being called inside the graph.
ui_graph = build_graph(
    db_path="data/checkpoints_ui.db",
    interrupt_before=["quiz_generator"],
)
```

The UI handles the quiz itself by calling `generate_questions` and `grade_answer` directly from the app layer (same functions, different caller). Once the quiz is complete, the app uses `graph.update_state()` to inject the `QuizResult` back into the checkpoint as if `quiz_generator_node` had run, then resumes the graph to execute the Progress Coach:

```py
def advance_after_quiz(quiz_result: QuizResult):
    """After UI-handled quiz completes, inject result and resume graph."""
    config = st.session_state.graph_config

    # Tell LangGraph quiz_generator has already run with this result
    ui_graph.update_state(
        config,
        {
            "quiz_results":        existing + [quiz_result],
            "weak_areas":          all_weak,
            "roadmap":             st.session_state.roadmap,
            "current_topic_index": st.session_state.current_topic_index,
        },
        as_node="quiz_generator",
    )

    # Resume. Runs progress_coach, then either explainer (next topic) or END.
    # Because interrupt_before=["quiz_generator"], if a next topic exists
    # the graph pauses again before its quiz_generator.
    result = ui_graph.invoke(None, config=config)
```

This is the pattern worth remembering: `graph.update_state(config, values, as_node=...)` lets the caller patch the checkpoint as if a specific node had produced those values. It's how you inject results from code running outside the graph back into the graph's state flow.

Run it:

```sh
make streamlit
# or: streamlit run streamlit_app.py
```

![Figure 3. The Streamlit web interface. Same LangGraph code, same MCP servers, same A2A services. Different I/O.](https://cdn.hashnode.com/uploads/covers/6983b18befedc65b9820e223/0eb788a1-5333-440e-802a-4159a413ea6b.png)

The browser opens at `http://localhost:8501`. You get the same system with a web UI. Goal input becomes a form. Roadmap approval becomes two buttons. The explanation renders as formatted markdown. Quiz questions appear one at a time with an answer field. Coach feedback shows in an info box before the next topic.

When the session completes, the summary screen shows per-topic scores and the session ID for terminal resume.

#### 💡 The Streamlit `session_state` pattern

Streamlit reruns the entire script on every user interaction. Anything that must survive across reruns lives in `st.session_state`, a dict that Streamlit preserves between runs. The LangGraph `session_id` and `graph_config` both go there. So does the current screen, the roadmap, the current question index, the graded answers, and the list of completed `QuizResult` objects.

The app is effectively a state machine where `st.session_state.screen` determines what renders and the state machine transitions happen in response to button clicks.

This is the payoff of protocol-first architecture: the system has a terminal UI, a web UI, and the option to add a React frontend, a Slack bot, or an iOS app next, and the LangGraph code in <VPIcon icon="fas fa-folder-open"/>`src/` is untouched through all of it.

### 9.5 The Project Structure, Final

After everything is built, the repository layout is:

```sh title="file structure"
freecodecamp-multi-agent-ai-system/
├── src/
│   ├── agents/
│   │   ├── curriculum_planner.py   # JSON roadmap generation
│   │   ├── explainer.py             # MCP tool-calling loop
│   │   ├── quiz_generator.py        # Two-call pattern + grading
│   │   ├── progress_coach.py        # Synthesis + A2A delegation
│   │   └── human_approval.py        # interrupt() / Command resume
│   ├── graph/
│   │   ├── state.py                 # AgentState + 4 dataclasses
│   │   └── workflow.py              # StateGraph definition
│   ├── mcp_servers/
│   │   ├── filesystem_server.py     # Tools: list, read, search
│   │   └── memory_server.py         # Tools: get, set, delete, list
│   ├── a2a_services/
│   │   ├── quiz_service.py          # Quiz agent on :9001
│   │   └── a2a_client.py            # JSON-RPC client + discovery
│   ├── crewai_agent/
│   │   └── study_buddy.py           # CrewAI agent on :9002
│   └── observability/
│       └── langfuse_setup.py        # Callback handler + config
├── tests/                           # 182 unit + 12 eval tests
├── study_materials/sample_notes/    # Explainer's source content
├── docs/                            # ARCHITECTURE.md, MODEL_SELECTION.md
├── data/                            # SQLite checkpoints (created at runtime)
├── main.py                          # Terminal entry point
├── streamlit_app.py                 # Web UI entry point
├── Makefile                         # One-command targets
├── docker-compose.yml               # Self-hosted Langfuse
├── requirements.txt                 # Pinned versions
└── pyproject.toml                   # pythonpath + pytest config
```

### 9.6 Extending the System

The architecture supports extension in several directions, all without touching existing code.

**Add a new agent.** Write a node function in <VPIcon icon="fas fa-folder-open"/>`src/agents/`<VPIcon icon="fa-brands fa-python"/>`your_agent.py`. Register it in <VPIcon icon="fa-brands fa-python"/>`workflow.py` with `builder.add_node("your_agent", your_agent_node)`. Add the edges that connect it to existing nodes. Every other agent continues to work unchanged because agents don't know about each other. They only know about state.

**Swap the inference backend.** Every agent uses `ChatOllama` pointing at `OLLAMA_BASE_URL`. Setting that URL to a LiteLLM gateway (which speaks Ollama's API on the front and routes to OpenAI, Anthropic, or any other provider on the back) switches all four agents to the new backend with zero code change. The API is the contract.

**Add an MCP tool.** Add a `@mcp.tool()` function to <VPIcon icon="fa-brands fa-python"/>`filesystem_server.py` or <VPIcon icon="fa-brands fa-python"/>`memory_server.py`. Add a corresponding `@tool` wrapper in <VPIcon icon="fa-brands fa-python"/>`explainer.py` and include it in `EXPLAINER_TOOLS`. The agent's system prompt tells the LLM when to use the new tool. No other changes needed.

**Add a new A2A service.** Create a new module under <VPIcon icon="fas fa-folder-open"/>`a2a_services/` following the <VPIcon icon="fa-brands fa-python"/>`quiz_service.py` pattern: Agent Card, Executor subclass, uvicorn server. Add a client function in <VPIcon icon="fa-brands fa-python"/>`a2a_client.py`. Any agent that needs it calls the client function. The service is a separate process and can be deployed, scaled, and restarted independently of the main application.

**Migrate state to PostgreSQL.** Replace `SqliteSaver` with `PostgresSaver` in <VPIcon icon="fa-brands fa-python"/>`workflow.py`. Set the connection string to your Postgres instance. Nothing else changes. LangGraph's checkpoint interface is backend-agnostic.

**Add authentication to A2A services.** Wrap `create_quiz_server()`'s Starlette app with authentication middleware. The A2A protocol supports this. Agent Cards can declare authentication schemes, and clients pass credentials in the task envelope. Production deployments outside a trusted network should do this.

Each of these extensions exercises one specific layer of the architecture. None of them requires rewriting the layers below.

::: note 📌 Checkpoint

Run the full test suite with everything running:

```sh
make services
pytest tests/ -v
# 184 tests, eval tests skipped by default
```

Then run the eval tests with Ollama:

```sh
pytest tests/test_eval.py -m eval -s -v
# 12 eval tests: checks quality, faithfulness, grading calibration
```

Finally, exercise the full system manually:

```sh
make run
# Follow the prompts, complete a session
# Check Langfuse UI for the trace
```

All three verification steps pass. The system is complete.

:::

### 9.7 Five Extensions, Ordered by Effort

You have a working four-agent system. That's the hard part. The rest is incremental. Each direction below is a natural next step, not a rewrite.

#### 1. Swap the inference backend to a managed gateway (under an hour of work).

Every agent in the system uses `ChatOllama` pointing at `OLLAMA_BASE_URL`. Set that URL to a LiteLLM gateway instead. LiteLLM speaks Ollama's API on the front and routes to OpenAI, Anthropic, Together, or any other provider on the back. All four agents switch to the new backend with one environment variable change.

The same approach handles fallback routing: configure LiteLLM to try GPT-4, fall back to Claude if it fails, fall back to a local model if both are down. Your agent code doesn't know any of this happens.

#### 2. Add an authentication layer to the A2A services (a few hours of work).

The Agent Card can declare authentication schemes. Production A2A deployments should require bearer tokens or mTLS certificates. Wrap `create_quiz_server()`'s Starlette app with FastAPI-compatible auth middleware, update the <VPIcon icon="fa-brands fa-python"/>`a2a_client.py` to pass credentials in the task envelope, and the services become safe to expose outside a trusted network.

The A2A protocol supports this natively. The bearer token goes in the HTTP `Authorization` header like any other REST service.

#### 3. Migrate SQLite checkpointing to PostgreSQL (half a day including testing).

Replace `SqliteSaver` with `PostgresSaver` in <VPIcon icon="fa-brands fa-python"/>`workflow.py`. Set the connection string to your Postgres instance. LangGraph's checkpoint interface is backend-agnostic.

This matters for multi-instance deployments. SQLite works for a single process, but PostgreSQL lets you run multiple instances of <VPIcon icon="fa-brands fa-python"/>`main.py` (or the Streamlit app) against the same checkpoint store, so sessions survive instance restarts and can be picked up by any instance.

#### 4. Add streaming responses (a day or two of work).

LangGraph supports `graph.astream()` for token-level streaming from agent nodes. Update the Streamlit UI to consume the stream and render the explanation as it's generated. Users see output starting in 500ms instead of waiting 3-4 seconds for the full response.

The Explainer is the agent that benefits most. It produces 1,500 to 2,500 character explanations, and the perceived latency improvement is significant.

#### 5. Build a mobile-friendly frontend (a week of focused work).

Replace the Streamlit UI with a React or Next.js frontend that calls a FastAPI wrapper around the graph. The wrapper exposes the same five-screen flow (goal input, roadmap approval, explanation, quiz, complete) as REST endpoints. The LangGraph code in <VPIcon icon="fas fa-folder-open"/>`src/` doesn't change at all. The quiz collection and grading pattern stays identical to what the Streamlit app does now. The API contract is:

```plaintext
POST /api/sessions                     → create session, return session_id + roadmap
POST /api/sessions/:id/approval        → body: {"approved": true/false}
GET  /api/sessions/:id/current         → current topic, explanation, questions
POST /api/sessions/:id/answer          → submit one quiz answer, get graded response
GET  /api/sessions/:id/summary         → final summary when complete
```

This is the architecture you'd build if the Learning Accelerator became a real product. The graph runs on the backend. The frontend is a thin client. The production hardening checklist in Appendix C applies.

### 9.8 Production Hardening

The system as written is tutorial-grade. It runs locally, handles errors gracefully, and demonstrates every concept correctly. It's not ready to serve thousands of concurrent users at enterprise scale.

Here's what changes for that, in order of how much work each item requires.

**Per-request rate limiting.** Add token budgets per agent enforced at the orchestrator level. Not as guidelines but as hard limits.

A 4-agent system with 5 tool calls per agent is 20+ LLM calls per user request. At scale, cost becomes an engineering concern before architecture does. The LiteLLM gateway makes this straightforward. It tracks spend per session and can enforce caps.

**Checkpoint migration safety.** Version your `AgentState` schema. When you deploy a new version of the system, in-flight workflows checkpointed against the old schema will try to deserialize with the new code. If fields are added or removed, those workflows fail mid-flight.

Treat checkpoint format as a public API: add new fields as optional with defaults, deprecate removed fields for a release cycle before deleting them, and test schema migrations as part of your deployment pipeline.

**Cold start handling.** Agent containers with model weights and heavy dependencies can take 30 to 60 seconds to cold start. Production request rates can't tolerate users waiting a minute while a container initializes. Either maintain a warm pool of containers (cost trade-off) or design fallback paths that tolerate cold start delays with a simpler, faster backup agent. There is no third option. Don't pretend cold starts won't happen.

**Observability at scale.** Local Langfuse works for development. Production deployments need either managed Langfuse or a similar distributed tracing backend that can handle millions of traces per day.

The decision-level tracing is what you need. Infrastructure metrics alone can't tell you what went wrong in a multi-agent reasoning chain. Request latency can be fine while the model is producing wrong answers.

**Evaluation in CI.** The DeepEval tests from Chapter 7 should run as part of your deployment pipeline. Every new model, prompt, or agent change triggers a full eval suite. If faithfulness drops below threshold, the change is blocked. This is the regression suite for LLM behaviour, your insurance against gradual quality erosion.

**Content safety.** Agent outputs should pass through content filters before reaching users or production systems. The Explainer is grounded in your notes, but the LLM can still produce hallucinations or content that violates policies.

A schema validation layer plus a content filter before the output reaches the database or the user is non-negotiable in any production environment where the consequence of a bad output matters.

Appendix C contains the complete hardening checklist.

### 9.9 Where the Ecosystem is Going in 2026

A few trends are reshaping how multi-agent systems get built, and both are worth watching as you plan your next project.

#### Protocol consolidation

MCP and A2A both shipped v1.0 specs in 2025. Google, Anthropic, Salesforce, SAP, and dozens of other vendors signed on. The agentic era is following the same standardisation arc that REST did for web services: messy at first, then a few clear winners that everything else converges on.

The implication for your work: standardising your tool access on MCP and your agent coordination on A2A now is a low-risk bet. These protocols will still be relevant in three years. Framework choices will come and go.

#### Local-first infrastructure

The gap between local and cloud inference quality keeps narrowing. A year ago, running a multi-agent system on a local 7B model was a demo, not a production tool. Today, Qwen 2.5 at 7 to 32B parameters handles tool calling reliably enough for production workflows.

The privacy, cost, and latency benefits of local inference are significant. Some industries genuinely can't send data to external APIs. Architectures that work well locally also work well with managed gateways. Architectures built around a specific cloud provider's features tend to be harder to migrate.

#### Longer context, narrower agents

Context windows keep growing. 1M+ tokens is available on several commercial models now. This pushes against the case for multi-agent systems in general: if one agent can hold the full conversation and reason over everything, why split the work?

The answer has shifted. Multi-agent is no longer about context window management. It's about specialisation, failure isolation, and independent deployment.

The reasons are discussed in Chapter 1. As single-agent capability increases, the bar for "does this problem warrant multi-agent" moves higher. Many teams building multi-agent systems today could achieve the same outcomes with a single agent and better tools.

The patterns in this handbook still apply. The question is just when to reach for them.

### 9.10 Where to Apply These Patterns

The Learning Accelerator is a teaching vehicle. The patterns are what transfer. These production systems use this architecture today.

#### 1. Sales enablement

A curriculum agent builds an onboarding path for a new sales rep. A content agent explains product features from an internal knowledge base via MCP. An assessment agent tests comprehension. A progress agent tracks certification across multiple product areas. Managers approve curricula via the human-in-the-loop gate before training begins.

#### 2. Compliance training

Domain-specific curriculum agents for HIPAA, SOX, GDPR. Content agents grounded in the actual regulatory text (not the model's training data) via MCP servers. Assessment agents with stricter grading thresholds and audit logs that can be exported for regulators. The human-in-the-loop gate becomes a legal review step before the training is assigned.

#### 3. Customer support

An intake agent categorises tickets. A research agent reads knowledge base articles via MCP. A drafting agent composes responses. A review agent checks for policy compliance before sending. The A2A layer lets a Salesforce agent call a ServiceNow agent call a custom LangGraph agent: cross-system without bespoke integrations.

#### 4. Engineering onboarding

A codebase agent walks new hires through the repository. A tooling agent explains the development environment. A review agent answers questions about coding standards. All are grounded in the actual codebase and docs via MCP servers pointing at internal repos.

The common thread: each of these has the architectural markers from Chapter 1. Different tools for different subtasks. Different LLM call patterns. Specialisation that would compromise one shared agent. Fault isolation requirements.

The multi-agent architecture isn't chosen for novelty. It's chosen because the problem shape matches.

### 9.11 What to Build Next

A few suggestions for where to take this, from lightest lift to largest.

1. **Add your own MCP tools:** Point the filesystem server at your own notes directory. Write an MCP server that queries your preferred knowledge source: Notion, Confluence, your team's documentation site. The tool-calling loop works identically. Only the server implementation changes.
2. **Fork the curriculum:** The Learning Accelerator assumes programming topics. Change the prompts in `curriculum_planner.py` to your domain: medical education, language learning, legal training. The graph structure stays the same.
3. **Build a companion analytics agent:** Add a sixth agent that runs periodically (not in the main graph) and summarises learning patterns across sessions. It reads from the checkpoint database, the Langfuse traces, and MCP memory. It produces weekly progress reports. This is a great extension because it exercises every part of the system without modifying existing code.
4. **Write your own handbook:** The best way to solidify these patterns is to teach them. Build a different multi-agent system for a different problem and document what you learned. The infrastructure patterns (MCP for tools, A2A for agent coordination, LangGraph for orchestration, checkpointing for resilience, LLM-as-judge for evaluation) apply to any multi-agent problem. The specific agents and tools change.

---

## Conclusion

You started this handbook with a single question: does your problem actually warrant multiple agents? That question kept the rest of the engineering honest.

Every agent in the Learning Accelerator exists because the task it handles is genuinely different from the others. Different tools, different LLM call patterns, different temperatures, different failure modes.

We didn't choose multi-agent architecture for its own sake. We chose it because the problem shape required it.

Every technology layer above that decision followed the same discipline.

- LangGraph gave you stateful orchestration and checkpointing because a production system cannot lose state on a crash.
- MCP standardised tool access because agents shouldn't be coupled to specific implementations.
- A2A made cross-framework coordination possible because real infrastructure sometimes spans multiple frameworks.
- Langfuse captured decision-level traces because infrastructure metrics alone can't tell you whether an agent is reasoning correctly.
- DeepEval ran quality gates because the only reliable way to evaluate LLM output is another LLM judging against explicit criteria.
- The Streamlit UI demonstrated that the LangGraph code is I/O-agnostic.
- The same graph powers a terminal session and a web app.

The engineering principle underneath all of this is the one worth carrying forward: **every boundary in a well-designed multi-agent system is a protocol, not a coupling**.

Agents talk to state through a TypedDict contract. Agents talk to tools through MCP. Agents talk to each other through A2A. Agents talk to observability through LangChain callbacks.

Each of those boundaries can be swapped, replaced, or extended without touching the rest. That's what makes the system production-grade. Not the specific frameworks you used, but the discipline of keeping those frameworks behind clear interfaces.

Whatever you build next, keep that principle in view. Models will change. Frameworks will change. The agentic era's specific tooling will evolve faster than any handbook can keep up with. Good architectural decisions outlive all of it.

::: info

The complete code for this handbook is at [github.com/sandeepmb/freecodecamp-multi-agent-ai-system (<VPIcon icon="iconfont icon-github"/>`sandeepmb/freecodecamp-multi-agent-ai-system`)](https://github.com/sandeepmb/freecodecamp-multi-agent-ai-system). Clone it, run it, fork it, extend it. If you build something interesting on top of these patterns, I'd genuinely like to hear about it.

<SiteInfo
  name="sandeepmb/freecodecamp-multi-agent-ai-system"
  desc="Contribute to sandeepmb/freecodecamp-multi-agent-ai-system development by creating an account on GitHub."
  url="https://github.com/sandeepmb/freecodecamp-multi-agent-ai-system/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/47e56f0046e6eed35dca20cf91cea2bd02e048d3a534078dc7a7b2fdab77f130/sandeepmb/freecodecamp-multi-agent-ai-system"/>

:::

Now go build something.

---

## Appendix A: Framework Comparison

Frameworks covered in this handbook and when each one fits. This table reflects the state of the ecosystem as of early 2026. Specific features change. The fit-for-purpose reasoning tends to stay stable.

| Framework | What it is | When to use | When to skip |
| --- | --- | --- | --- |
| **LangGraph** | Stateful agent graph with checkpointing, conditional routing, and native HITL | Production multi-agent workflows where state persistence and deterministic routing matter | Simple single-agent tasks with no state |
| **CrewAI** | Role-based multi-agent framework with declarative crews and tasks | Rapid prototyping of role-based agent collaborations. Use cases that fit the crew metaphor naturally. | Complex branching logic or custom control flow. The crew abstraction gets in the way. |
| **AutoGen** | Microsoft's conversational multi-agent framework with group chat patterns | Research and exploratory work. Multi-agent scenarios driven by conversation patterns. | Production systems requiring strict control flow and explicit state management |
| **LlamaIndex** | RAG-first framework with strong data ingestion and retrieval | Systems where retrieval over unstructured data is the core problem | Pure agent orchestration. You'd end up using LangGraph or similar on top. |
| **LangChain** | Broad toolkit for LLM app primitives. Foundation that LangGraph sits on | Lower-level building blocks (prompts, output parsers, chains) used inside agents | Orchestration itself. Use LangGraph for graph-based multi-agent systems. |
| **MCP** (protocol) | Model Context Protocol. Standardised agent-to-tool interface | Any system where tool implementations should be swappable and cross-framework reusable | Single-use internal tools where a Python function works fine |
| **A2A** (protocol) | Agent-to-Agent Protocol. Cross-framework agent coordination over HTTP | Cross-team or cross-framework agent coordination, independent deployment of agents | Tightly coupled agents that always deploy together. Direct function calls are simpler. |

Here's a rule of thumb for choosing the orchestrator: LangGraph's strengths (checkpointing, interrupt/resume, explicit state contracts) become essential in production. CrewAI is great when the role-based metaphor maps cleanly to your domain. AutoGen's group-chat pattern fits research and exploratory work better than strict production control flow.

Don't let framework preference override problem shape. If your problem is a graph, use LangGraph. If your problem is a conversation, use AutoGen.

And note that MCP and A2A aren't in competition with these frameworks. They're the integration layer underneath. Build your agent in LangGraph, expose it as an A2A service, use MCP for its tools. You can mix and match all three regardless of which orchestration framework you chose.

---

## Appendix B: Model Selection Guide

All agents in this system use Ollama for local inference. Model choice determines whether tool calling works reliably. Models under 7B parameters tend to produce malformed JSON and hallucinate tool names often enough to fail in agentic use.

### Recommendations by VRAM

| VRAM | Model | Pull command | Best for |
| --- | --- | --- | --- |
| 8 GB | `qwen2.5:7b` | `ollama pull qwen2.5:7b` | General purpose, reliable tool calling |
| 8 GB | `qwen3:8b` | `ollama pull qwen3:8b` | Better reasoning, same VRAM class |
| 24 GB | `qwen2.5-coder:32b` | `ollama pull qwen2.5-coder:32b` | Best tool calling at this tier |
| 24 GB | `qwen3:32b` | `ollama pull qwen3:32b` | Best overall at this tier |
| CPU only | `qwen2.5:7b` (Q4_K_M) | `ollama pull qwen2.5:7b` | Works, 5 to 10 times slower |

**On macOS,** Apple Silicon unified memory is shared between CPU and GPU. A 16 GB unified memory Mac gives roughly 8 GB to the model. Check via Apple menu → About This Mac → chip info.

**Minimum viable tier for production agentic use: 7B parameters.** Sub-7B models handle chat fine but produce too many JSON formatting errors for reliable tool calling.

The `format="json"` constraint in Ollama helps. It's an inference-time guarantee of valid JSON. But the model still needs to produce *meaningful* JSON, not just parseable JSON, and that requires the 7B+ parameter count.

### Temperature Settings Used in This System

These are the settings baked into each agent. Never use `temperature > 0.5` for any agent that produces structured JSON output. Parsing becomes unreliable.

```py
# Structured output: Curriculum Planner, Quiz Generator grading
ChatOllama(temperature=0.1, format="json")

# Tool-calling loop: Explainer
ChatOllama(temperature=0.3)

# Creative generation: Quiz Generator questions, Progress Coach
ChatOllama(temperature=0.4, format="json")

# Deterministic evaluation: DeepEval OllamaJudge
ChatOllama(temperature=0.0)
```

**Why different temperatures matter:** A single agent with one temperature setting compromises every task it handles. Structured JSON planning needs 0.1 for consistency. Creative question generation benefits from 0.4 for variety. Grading needs 0.1 for fairness.

If one agent did all three with `temperature=0.25`, planning would produce parse errors and question generation would produce repetitive questions. Splitting these into different agents with different temperature configurations is one of the core justifications for multi-agent architecture in this system.

### Switching Models

Change `OLLAMA_MODEL` in <VPIcon icon="iconfont icon-dotenv"/>`.env`. No code changes needed.

```sh
# .env
OLLAMA_MODEL=qwen2.5-coder:32b
OLLAMA_BASE_URL=http://localhost:11434
```

Then pull the model if you haven't:

```sh
ollama pull qwen2.5-coder:32b
```

All four agents automatically use the new model on the next run.

### Eval Test Thresholds by Model

Thresholds in <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_eval.py` are calibrated for 7B models at 0.6. Larger models typically score higher. If you upgrade and want stricter quality gates, raise these:

| Model tier | Faithfulness | Relevancy | Question Quality | Notes |
| --- | --- | --- | --- | --- |
| 7-8B local | 0.65-0.80 | 0.70-0.85 | 0.65-0.80 | Default thresholds at 0.6 |
| 32B local | 0.80-0.90 | 0.85-0.95 | 0.80-0.90 | Can raise thresholds to 0.75 |
| GPT-4 / Claude | 0.85-0.98 | 0.90-0.98 | 0.85-0.95 | Can raise thresholds to 0.85 |

Set the threshold at roughly 10 percentage points below the typical score. Too close to the typical score and you get flaky tests. Too far and you miss regressions.

---

## Appendix C: Production Hardening Checklist

The system as written is tutorial-grade. Before deploying at scale, work through this checklist. Each item maps to a real failure mode that appears in production deployments.

### Orchestration and State

- [ ] **Replace SQLite with PostgreSQL** for checkpointing. SQLite works for single-process. Postgres is required for multi-instance deployments.
- [ ] **Version your** `AgentState` **schema.** Add new fields as optional with defaults. Deprecate removed fields for a release cycle before deleting.
- [ ] **Test schema migrations** as part of your deployment pipeline. In-flight workflows must survive rolling deployments.
- [ ] **Set explicit timeout budgets** on every agent call. Propagate the timeout from the orchestrator to every downstream service.
- [ ] **Add circuit breakers** around every external service call (LLM API, A2A services, MCP servers). Retry storms amplify production pressure.

### Inference and Cost

- [ ] **Route through an inference gateway** (LiteLLM or similar) with rate limiting, model fallback, and per-session cost tracking.
- [ ] **Enforce per-agent token budgets** at the orchestrator level. Hard limits, not guidelines.
- [ ] **Cap** `max_iterations` on every tool-calling loop. The Explainer has `max_iterations=8`. Verify each agent has a similar cap.
- [ ] **Monitor per-session cost** and alert when a session exceeds the budget. A confused agent can loop indefinitely otherwise.

### Observability

- [ ] **Move Langfuse to managed or high-availability self-hosted.** Local Langfuse doesn't scale to production trace volumes.
- [ ] **Capture session-level traces** with structured tags (user ID, feature flag, model version) so you can filter and compare.
- [ ] **Set up alerting** on error rate spikes, token cost spikes, and latency regressions.
- [ ] **Sample traces** in production. 100% sampling becomes expensive. 10 to 20% sampling with full capture of errors is typically enough.
- [ ] **Export traces to a data warehouse** periodically for long-term analysis and regulatory audit.

### Evaluation and Quality

- [ ] **Run the eval suite in CI** on every deployment. Block deployments that fail quality thresholds.
- [ ] **Maintain a regression test set** of known-good inputs and expected outputs. Run this before every model change.
- [ ] **Track quality metrics over time.** Gradual drift is harder to catch than a sudden regression.
- [ ] **Have human-review sampling** for high-risk decisions. Not every output, but a statistically meaningful sample.

### Security

- [ ] **Add authentication to A2A services.** Bearer tokens, mTLS, or OAuth depending on your environment.
- [ ] **Audit MCP tool implementations** for path traversal, injection, and privilege escalation. The `read_study_file` function in this system shows the pattern.
- [ ] **Sanitise LLM inputs.** Anything the model sees can influence its behaviour, including indirect prompt injection from retrieved content.
- [ ] **Validate structured outputs** before applying them to production systems. Schema validation, policy rules, safety filters.
- [ ] **Maintain immutable audit logs** of every decision that results in a production action. Required for regulated industries.
- [ ] **Implement human-in-the-loop thresholds** for high-risk actions. Automation for low-risk, escalation for high-risk.
- [ ] **Rotate credentials** for API keys, database connections, and service tokens.

### Reliability and Failure Modes

- [ ] **Design fallback paths** for every external dependency. The Progress Coach's A2A fallback pattern in this system is the model: try the service, fall back silently on any failure.
- [ ] **Handle cold starts** for agent containers. Warm pool or tolerable fallback. Never let users wait 60 seconds for a container to initialise.
- [ ] **Implement content filters** on agent outputs. Hallucinations happen even with grounded inputs.
- [ ] **Set up health checks** for every service. A2A Agent Cards serve as health endpoints. Any client can fetch them to verify reachability.
- [ ] **Test graceful degradation** explicitly. Kill services one at a time and verify the main app stays responsive.

### Governance

- [ ] **Document every agent's responsibilities.** What tools it uses, what state it reads and writes, what failure modes are expected.
- [ ] **Maintain a prompt version registry** tied to git commits. Know which prompt was in production when an issue occurred.
- [ ] **Review and approve model upgrades.** Swapping a model version can change output behaviour in ways that break downstream assumptions.
- [ ] **Establish a rollback procedure** for both code and model changes. Rolling back a bad deployment should take minutes, not hours.

This isn't an exhaustive list, but it covers the failure modes that actually appear in production deployments of multi-agent systems. Work through it before your first public launch, and revisit it quarterly as the system evolves.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multi-Agent AI System with LangGraph, MCP, and A2A [Full Book]",
  "desc": "Building a single AI agent that answers questions or runs searches is a solved problem. A handful of tutorials and a few hours of work will get you there. What most tutorials skip is the engineering l",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-agent-ai-system-with-langgraph-mcp-and-a2a-full-book/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
