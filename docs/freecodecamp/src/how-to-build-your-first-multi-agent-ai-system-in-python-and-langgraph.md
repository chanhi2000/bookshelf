---
lang: en-US
title: "How to Build Your First Multi-Agent AI System in Python and LangGraph"
description: "Article(s) > How to Build Your First Multi-Agent AI System in Python and LangGraph"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - LangGraph
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
  - langgraph
  - lang-graph
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your First Multi-Agent AI System in Python and LangGraph"
    - property: og:description
      content: "How to Build Your First Multi-Agent AI System in Python and LangGraph"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph.html
prev: /ai/langgraph/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e31f27b0-dc4a-4a64-98d7-eca151b738ce.png
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
  "title": "LangGraph > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langgraph/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your First Multi-Agent AI System in Python and LangGraph"
  desc="In this tutorial, I'll show you how to build a multi-agent AI system in Python with no orchestration framework. We'll also implement this in LangGraph with nodes, edges, and shared state. The point of"
  url="https://freecodecamp.org/news/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e31f27b0-dc4a-4a64-98d7-eca151b738ce.png"/>

In this tutorial, I'll show you how to build a multi-agent AI system in Python with no orchestration framework. We'll also implement this in LangGraph with nodes, edges, and shared state.

The point of building both versions is to show you the difference between doing it with and without a framework.

The simple Python version shows how little code you actually need to build a multi-agent system. The LangGraph version shows what a workflow framework enables for building such systems.

The agents run locally with Ollama and Qwen so you'll have no API costs.

---

## Background

Large language models are capable of solving surprisingly complex tasks with a single prompt. For many applications, that's exactly the right approach.

But as workflows grow, a single prompt often has to do too many things at once. Combining all of those responsibilities into one prompt can make it harder to maintain, extend, and reason about the problem, especially for a smaller local model.

A common solution is to break the work into smaller steps to create a multi-agent system instead of relying on one agent to perform all the tasks.

To follow this tutorial, you'll need [<VPIcon icon="iconfont icon-ollama"/>Ollama](https://ollama.com/) installed on your machine and a free Ollama account. The tutorial works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model from Ollama.

---

## What is a Multi-Agent System?

In this tutorial, a multi-agent system is simply a collection of AI agents that collaborate to complete a larger task.

Each agent has:

- a specific responsibility
- its own prompt and instructions
- a defined place in the workflow

Rather than asking one model to solve the entire problem, the workload is divided into smaller, focused tasks. Because each agent has a narrower objective, its prompt is typically simpler and easier for the model to follow consistently.

This tutorial intentionally keeps the system simple. There's no memory, tool calling, or complex patterns. Instead, the focus is on a simple use case to show the building blocks for a multi-agent AI system.

### When to Use a Multi-Agent System

Multi-agent systems make sense when a task naturally breaks into distinct steps or roles, such as planning, writing, reviewing, or using different specialized prompts for different parts of the workflow. If single agent can handle the task well with a clear prompt and produce the output reliably, adding more agents can just introduce extra complexity, latency, and overhead.

In general, use multiple agents when separation of responsibilities clearly improves the result, and use a single agent when the task is still manageable as one coherent interaction.

---

## Motivation and Architecture

In this tutorial, we'll build a simple AI-powered study guide generator using a small Qwen local LLM and Ollama. Given a topic in the prompt, the system produces a structured study guide that contains outline, notes, and review questions. A single agent prompt looks like this:

```md title="prompt"
Create a beginner-friendly study guide for this topic: {topic}

The output should have exactly these sections:

1. Outline
- Break the topic into 3 short study sections

2. Notes
- Write short, clear study notes for each section
- Keep the explanations concise and easy to understand

3. Review Questions
- Write 3 short review questions based on the notes

Return the result in clean Markdown.
```

The single agent has to do several jobs at once to generate the study guide based on the prompt above. That’s a lot to do for a smaller local model in one shot and the quality of output likely won't be the best.

A multi-agent system helps by splitting the one big prompt into three specialized agents. It makes it easier for the small model to handle the tasks. The agents in the the workflow are:

- Planner: breaks the topic into logical sections.
- Teacher: writes concise study notes for each section.
- Quiz Writer: generates review questions to reinforce the material.

This workflow can be implemented in two ways. In the simple Python version, the Python code coordinates the steps to call agents.

In the LangGraph version, the same flow is expressed with nodes, edges, and shared state. The agents are still the same and LangGraph models the workflow as a graph. Each node performs one task, updates the shared state, and passes that state to the next node to get the final output.

---

## Step 1: Install Ollama and Dependencies

Install Ollama and pull the model:

```sh
ollama pull qwen3.5:4b
```

Set up the Python environment:

```sh
python3 -m venv venv
source venv/bin/activate
pip install langchain-ollama langgraph
```

---

## Step 2: Simple Python Version

The plain Python version uses three focused LLM calls or agents (planner, teacher, and quiz writer) coordinated by regular Python code .

The `ask()` function sends a system prompt and user input to the model and returns the response text. The `run_agent()` function wraps that call and prints how long each step takes.

Then the code defines three small agents with their own specific prompts:

- `planner_agent()` creates a 3-part outline for the topic.
- `teacher_agent()` turns that outline into short beginner-friendly notes.
- `quiz_agent()` creates 3 review questions from the notes.

The `build_study_guide()` function runs those three agents in sequence, passing each output into the next step.

Save this as <VPIcon icon="fa-brands fa-python"/>`study_guide_v1.py`.

```py :collapsed-lines title="study_guide_v1.py"
import time
from langchain_ollama import ChatOllama

# Local Ollama model used by all three agents.
MODEL = ChatOllama(model="qwen3.5:4b", temperature=0)


def ask(system: str, user: str) -> str:
    """Run one LLM call with a system prompt and user input."""
    response = MODEL.invoke([
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ])
    return response.content


def run_agent(name: str, system: str, user: str) -> str:
    """Helper that logs how long each agent takes."""
    print(f"Calling agent {name}...")
    start = time.time()
    result = ask(system, user)
    print(f"Finished {name} in {time.time() - start:.1f}s")
    return result


# Agent 1: create a short outline
def planner_agent(topic: str) -> str:
    return run_agent(
        "planner_agent",
        "Break this topic into 3 short study sections.",
        topic,
    )


# Agent 2: turn the outline into notes
def teacher_agent(topic: str, outline: str) -> str:
    return run_agent(
        "teacher_agent",
        "Write short beginner-friendly notes using the outline. Keep it concise.",
        f"Topic: {topic}\n\nOutline:\n{outline}",
    )


# Agent 3: write review questions from the notes
def quiz_agent(topic: str, notes: str) -> str:
    return run_agent(
        "quiz_agent",
        "Write 3 short review questions based on the notes.",
        f"Topic: {topic}\n\nNotes:\n{notes}",
    )


def build_study_guide(topic: str) -> str:
    """Run all three agents in sequence and combine their output."""
    outline = planner_agent(topic)
    notes = teacher_agent(topic, outline)
    quiz = quiz_agent(topic, notes)

    return (
        f"# Study Guide: {topic}\n\n"
        f"## Outline\n{outline}\n\n"
        f"## Notes\n{notes}\n\n"
        f"## Review Questions\n{quiz}\n"
    )


if __name__ == "__main__":
    print("Warming up model...")
    MODEL.invoke("Say ready.")
    print("Model ready.\n")

    topic = input("Enter a study topic: ").strip()
    print("\n" + build_study_guide(topic))
```

Run it:

```sh
python study_guide_v1.py
```

That’s already a working multi-agent system. Each agent is just a focused LLM call. Python coordinates the flow and there's no framework needed. For fixed sequence workflows like this, plain Python is often the best place to start.

---

## Step 3: LangGraph Version with Nodes and Edges

Now let’s build the same study note generator with LangGraph. The roles stay the same, but LangGraph provides the orchestration:

- Each specialist becomes a **node**
- The shared dict becomes **graph state**
- The execution order becomes **edges**

Instead of a controller function manually calling agents in sequence, the flow is defined as a graph: `START -> planner -> teacher -> quiz -> END`.
<!-- TODO: mermaid화 -->

Each node reads from state and returns only the fields it updates.

Save this as <VPIcon icon="fa-brands fa-python"/>`study_guide_v2.py`:

```py :collapsed-lines title="study_guide_v2.py"
from typing import TypedDict
import time

from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END

# Local Ollama model used by all nodes.
MODEL = ChatOllama(model="qwen3.5:4b", temperature=0)


# Shared state passed between nodes.
class StudyState(TypedDict):
    topic: str
    outline: str
    notes: str
    quiz: str


def ask(system: str, user: str) -> str:
    response = MODEL.invoke([
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ])
    return response.content


def run_node(name: str, system: str, user: str) -> str:
    print(f"Calling node {name}...")
    start = time.time()
    result = ask(system, user)
    print(f"Finished {name} in {time.time() - start:.1f}s")
    return result


# Node 1: create the outline
def planner(state: StudyState) -> dict:
    return {
        "outline": run_node(
            "planner",
            "Break this topic into 3 short study sections.",
            state["topic"],
        )
    }


# Node 2: write notes from the outline
def teacher(state: StudyState) -> dict:
    return {
        "notes": run_node(
            "teacher",
            "Write short beginner-friendly notes using the outline. Keep it concise.",
            f"Topic: {state['topic']}\n\nOutline:\n{state['outline']}",
        )
    }


# Node 3: write review questions from the notes
def quiz_writer(state: StudyState) -> dict:
    return {
        "quiz": run_node(
            "quiz_writer",
            "Write 3 short review questions based on the notes.",
            f"Topic: {state['topic']}\n\nNotes:\n{state['notes']}",
        )
    }


def build_graph():
    graph = StateGraph(StudyState)

    # Add the nodes
    graph.add_node("planner", planner)
    graph.add_node("teacher", teacher)
    graph.add_node("quiz_writer", quiz_writer)

    # Define the order of execution
    graph.add_edge(START, "planner")
    graph.add_edge("planner", "teacher")
    graph.add_edge("teacher", "quiz_writer")
    graph.add_edge("quiz_writer", END)

    return graph.compile()


if __name__ == "__main__":
    print("Warming up model...")
    MODEL.invoke("Say ready.")
    print("Model ready.\n")

    app = build_graph()
    topic = input("Enter a study topic: ").strip()

    result = app.invoke({
        "topic": topic,
        "outline": "",
        "notes": "",
        "quiz": "",
    })

    print(
        f"\n# Study Guide: {topic}\n\n"
        f"## Outline\n{result['outline']}\n\n"
        f"## Notes\n{result['notes']}\n\n"
        f"## Review Questions\n{result['quiz']}\n"
    )
```

Run it:

```sh
python study_guide_v2.py
```

Both the simple Python version and LangGraph version of the code are doing the same core thing: orchestrating multiple LLM-powered steps to solve a larger task.

The simple Python version is great for lightweight orchestration. If the workflow is simple and linear, plain Python is often the most practical choice.

When the workflow needs shared state, branching, loops, or more complex agent coordination, LangGraph becomes the better fit.

---

## Sample Output

For this input:

```md title="prompt"
Enter a study topic: Newton's laws of motion
```

Both versions produce the same kind of output: a short study guide with sections, notes, and review questions.

A typical result might look like:

```sh
python study_guide_v2.py 
#
# Warming up model...
# Model ready.
# 
# Enter a study topic: Newton's laws of motion
# Calling node planner...
# Finished planner in 30.2s
# Calling node teacher...
# Finished teacher in 33.0s
# Calling node quiz_writer...
# Finished quiz_writer in 40.0s
```

```md title="output"
# Study Guide: Newton's laws of motion

---

## Outline
**Section 1: The Law of Inertia**
*   **Definition:** An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.
*   **Key Concept:** Inertia is the tendency of an object to resist changes in its state of motion.

**Section 2: The Law of Acceleration**
*   **Definition:** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.
*   **Formula:** $F = ma$ (Force = mass × acceleration).

**Section 3: The Law of Action and Reaction**
*   **Definition:** For every action, there is an equal and opposite reaction.
*   **Key Concept:** Forces always occur in pairs; if Object A exerts a force on Object B, Object B exerts an equal force in the opposite direction on Object A.

---

## Notes
**Section 1: The Law of Inertia**
*   **Definition:** Objects keep doing what they are doing. If it is still, it stays still. If it is moving, it keeps moving at the same speed and direction.
*   **Key Concept:** **Inertia** is the tendency of an object to resist changes in its motion.

**Section 2: The Law of Acceleration**
*   **Definition:** Force causes acceleration. The harder you push, the faster it speeds up. The heavier the object, the harder it is to move.
*   **Formula:** $F = ma$ (Force = mass × acceleration).

**Section 3: The Law of Action and Reaction**
*   **Definition:** Forces always come in pairs. When one object pushes another, the second object pushes back.
*   **Key Concept:** For every action, there is an equal and opposite reaction.

---

## Review Questions
1. What is the tendency of an object to resist changes in its motion called?
2. What is the formula for the Law of Acceleration?
3. According to the Law of Action and Reaction, how do action and reaction forces compare?
```

Both architectures solve the same problem, but one is coordinated by simple Python code and the other by an explicit graph.

---

## Common Multi-Agent Patterns

The example in this tutorial is a **sequential pipeline**. One specialist hands work to the next in a fixed order. That’s the easiest multi-agent pattern to start with, but it’s not the only one.

A few patterns are worth knowing:

- **Parallel Specialists:** Multiple agents work on the same input independently and their outputs are merged.
- **Orchestrator–Subagent:** A top-level agent breaks the task apart, delegates work, and combines results.
- **Supervisor / Router:** A routing agent decides which specialist should handle the request.
- **Human-in-the-loop:** An agent drafts the work, but a human reviews or approves it before continuing.
- **Review / Refinement loop:** One agent produces an output and another checks or improves it.

Here's an infographic showing each of these patterns visually:

![Sequential pipeline hands one specialist to next.  Parallel specialists Multiple agents work on the same input independently, then their outputs are merged. This works well when the subtasks do not depend on one another. Orchestrator–subagent A top-level agent breaks the task into parts, delegates work to specialist subagents, and combines the results. This is useful when one agent needs to coordinate several others.    Supervisor / router A routing agent decides which specialist should handle the request. This is useful when the workflow depends on the type of input rather than a fixed sequence.    Human-in-the-loop An agent drafts or prepares something, but a human approves it before the workflow continues. This is often the right pattern for sensitive or user-facing outputs.    Review / refinement loop One agent produces a result and another improves or checks it. This is useful when quality matters more than speed, though it can be heavier for smaller local models.](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/8e4f4c36-e4f9-424a-a866-d9ed485d7cca.png)

---

## Conclusion

In this tutorial, we built a simple multi-agent AI system using Python with and without LangGraph framework .

From here, try extending the example. Add a fourth node that rewrites the notes in simpler language. Add a review step that checks whether the quiz actually matches the notes. Or branch the graph so beginner topics get simpler explanations than advanced ones. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](https://darshshah.org/blog/) (recent posts include system design paper series), my work on my [<VPIcon icon="fas fa-globe"/>personal website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your First Multi-Agent AI System in Python and LangGraph",
  "desc": "In this tutorial, I'll show you how to build a multi-agent AI system in Python with no orchestration framework. We'll also implement this in LangGraph with nodes, edges, and shared state. The point of",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
