---
lang: en-US
title: "The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI"
description: "Article(s) > The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI"
icon: fas fa-language
category:
  - AI
  - LLM
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI"
    - property: og:description
      content: "The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-open-source-llm-agent-handbook/
prev: /ai/llm/articles/README.md
date: 2025-06-03
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url : https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748956366197/c4dd2bba-430a-4f12-a3d4-becc6707c52e.png
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

[[toc]]

---

<SiteInfo
  name="The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI"
  desc="Ever feel like your AI tools are a bit...well, passive? Like they just sit there, waiting for your next command? Imagine if they could take initiative, break down big problems, and even work together to get things done. That's exactly what LLM agents..."
  url="https://freecodecamp.org/news/the-open-source-llm-agent-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748956366197/c4dd2bba-430a-4f12-a3d4-becc6707c52e.png"/>

Ever feel like your AI tools are a bit...well, passive? Like they just sit there, waiting for your next command? Imagine if they could take initiative, break down big problems, and even work together to get things done.

That's exactly what LLM agents bring to the table. They're changing how we automate complex tasks, and they can help bring our AI ideas to life in a whole new way.

In this article, we'll explore what LLM agents are, how they work, and how you can build your very own using awesome open-source frameworks.

### What we’ll cover:

(1/11) [The Current State of LLM Agents](#heading-the-current-state-of-llm-agents)
(2/11) [What Are LLM Agents and Why Are They a Big Deal?](#heading-what-are-llm-agents-and-why-are-they-a-big-deal)
(3/11) [The Rise of Open-Source Agent Frameworks](#heading-the-rise-of-open-source-agent-frameworks)
(4/11) [Core Concepts Behind Agent Design](#heading-core-concepts-behind-agent-design)
(5/11) [Project: Automate Your Daily Schedule from Emails](#heading-project-automate-your-daily-schedule-from-emails)
(6/11) [Multi-Agent Collaboration with CrewAI](#heading-multi-agent-collaboration-with-crewai)
(7/11) [What Actually Happens During Execution?](#heading-what-actually-happens-during-execution)
(8/11) [Are LLM Agents Safe? What to Know About Security and Privacy](#heading-are-llm-agents-safe-what-to-know-about-security-and-privacy)
(9/11) [Troubleshooting & Tips](#heading-troubleshooting-and-tips)
(10/11) [Explore More Daily Automations](#heading-explore-more-daily-automations)
(11/11) [What’s Next in Agent Technology?](#heading-whats-next-in-agent-technology)

---

## The Current State of LLM Agents

LLM agents are one of the most exciting developments in AI right now. They’re already helping automate real tasks but they’re also still evolving. So where are we today?

### From Chatbots to Autonomous Agents

Large Language Models (LLMs) like GPT-4, Claude, Gemini, and LLaMA have evolved from simple chatbots into surprisingly capable reasoning engines. They've gone from answering trivia questions and generating essays to performing complex reasoning, following multi-step instructions, and interacting with tools like web search and code interpreters.

But here’s the catch: these models are **reactive**. They wait for input and give output. They don't retain memory between tasks, plan ahead, or pursue goals on their own. That’s where **LLM agents** come in – they bridge this gap by adding structure, memory, and autonomy.

### What Can Agents Do Today?

Right now, LLM agents are already being used for:

- Summarizing emails or documents
- Planning daily schedules
- Running DevOps scripts
- Searching APIs or tools for answers
- Collaborating in small “teams” to complete complex tasks

But they’re not perfect yet. Agents can still:

- Get stuck in loops
- Misunderstand goals
- Require detailed prompts and guardrails

That’s because this technology is still early-stage. Frameworks are getting better fast, but reliability and memory are still works in progress. So just keep that in mind as you experiment.

### Why Now Is the Best Time to Learn

The truth is: we’re still early. But not *too* early.

This is the perfect time to start experimenting with agents:

- The tooling is mature enough to build real projects
- The community is growing rapidly
- And you don’t need to be an AI expert just comfortable with Python

---

## What Are LLM Agents and Why Are They a Big Deal?

Before we dive into the exciting world of agents, let's quickly chat a bit more about the basics.

### What Is an LLM?

An LLM, or Large Language Model, is basically an AI that's learned from a massive amount of text from the internet – think books, articles, code, and tons more. You can picture it as a super-smart autocomplete engine. But it does way more than just finish your sentences. It can also:

- Answer tricky questions
- Summarize long articles or documents
- Write code, emails, or creative stories
- Translate languages instantly
- Even solve logic puzzles and have engaging conversations

Chances are you've heard of ChatGPT, which is powered by OpenAI's GPT models. Other popular LLMs you might come across include Claude (from Anthropic), LLaMA (by Meta), Mistral, and Gemini (from Google).

These models work by simply predicting the next word in a sentence based on the context. While that sounds straightforward, when trained on billions of words, LLMs become capable of surprisingly intelligent behavior, understanding your instructions, following step-by-step reasoning, and producing coherent responses across almost any topic you can imagine.

### So, What’s an LLM Agent?

While LLMs are super powerful, they usually just *react –* they only respond when you ask them something. An LLM agent, on the other hand, is *proactive*.

LLM agents can:

- Break down big, complex tasks into smaller, manageable steps
- Make smart decisions and figure out what to do next
- Use "tools" like web search, calculators, or even other apps
- Work towards a goal, even if it takes multiple steps or tries
- Team up with other agents to accomplish shared objectives

In short, LLM agents can think, plan, act, and adapt.

Think of an LLM agent like your super-efficient new assistant: you give it a goal, and it figures out how to achieve it all on its own.

### Why Does This Matter?

This shift from just responding to actively pursuing goals opens a ton of exciting possibilities:

- Automating boring IT or DevOps tasks
- Generating detailed reports from raw data
- Helping you with multi-step research projects
- Reading through your daily emails and highlighting key info
- Running your internal tools to take real-world actions

Unlike older, rule-based bots, LLM agents can reason, reflect, and learn from their attempts. This makes them a much better fit for real-world tasks that are messy, require flexibility, and depend on understanding context.

---

## The Rise of Open-Source Agent Frameworks

Not too long ago, if you wanted to build an AI system that could act autonomously, it meant writing a ton of custom code, painstakingly managing memory, and trying to stitch together dozens of components. It was a complex, delicate, and highly specialized job.

But guess what? That's not the case anymore.

In 2024, a wave of fantastic open-source frameworks hit the scene. These tools have made it dramatically easier to build powerful LLM agents without you having to reinvent the wheel every time.

### Popular Open-Source Agent Frameworks

| **Framework** | **Description** | **Maintainer** |
| --- | --- | --- |
| LangGraph | Graph-based framework for agent state and memory | LangChain |
| CrewAI | "Role-based, multi-agent collaboration engine" | Community (CrewAI) |
| AutoGen | Customizable multi-agent chat orchestration | Microsoft |
| AgentVerse | Modular framework for agent simulation and testing | Open-source project |

### What These Tools Enable

These frameworks give you ready-made building blocks to handle the trickier parts of creating agents:

- **Planning** – Letting agents decide their next move
- **Tool Use** – Easily connecting agents to things like file systems, web browsers, APIs, or databases
- **Memory** – Storing and retrieving past information or intermediate results for long-term context
- **Multi-Agent Collaboration** – Setting up teams of agents that work together on shared goals

### Why Use a Framework Instead of Building from Scratch?

While you *could* build a custom agent from the ground up, using a framework will save you a huge amount of time and effort. Open-source agent libraries come packed with:

- Built-in support for orchestrating LLMs
- Proven patterns for task planning, keeping track of where you are, and getting feedback
- Easy integration with popular models like OpenAI, or even models you run locally
- The flexibility to grow from a single helpful agent to entire teams of agents

Basically, these frameworks let you focus on **what your agent should do**, rather than getting bogged down in how to build all the internal workings. Plus, choosing open source means you benefit from community contributions, transparency in how they work, and the freedom to tweak them to your exact needs, without getting locked into a single vendor.

---

## Core Concepts Behind Agent Design

To really grasp how LLM agents operate, it helps to think of them as goal-driven systems that constantly cycle through observing, reasoning, and acting. This continuous loop allows them to tackle tasks that go beyond simple questions and answers, moving into true automation, tool usage, and adapting on the fly.

### The Agent Loop

Most LLM agents function based on a mental model called the **Agent Loop** a step-by-step cycle that repeats until the job is done. Here’s how it typically works:

- **Perceive:** The agent starts by noticing something in its environment or receiving new information. This could be your prompt, a piece of data, or the current state of a system.
- **Plan:** Based on what it perceives and its overall goal, the agent decides what to do next. It might break the task into smaller sub-goals or figure out the best tool for the job.
- **Act:** The agent then acts. This could mean running a function, calling an API, searching the web, interacting with a database, or even asking another agent for help.
- **Reflect:** After acting, the agent looks at the outcome: Did it work? Was the result useful? Should it try a different approach? Based on this, it updates its plan and keeps going until the task is complete.

This loop is what makes agents so dynamic. It allows them to handle ever-changing tasks, learn from partial results, and correct their course qualities that are vital for building truly useful AI assistants.

### Key Components of an Agent

To do their job effectively, agents are built around several crucial parts:

- **Tools** are how an agent interacts with the real (or digital) world. These can be anything from search engines, code execution environments, file readers, or API clients, to simple calculators or command-line scripts.
- **Memory** lets agents remember what they've done or seen across different steps. This might include previous things you've said, temporary results, or key decisions. Some frameworks offer short-term memory (just for one session), while others support long-term memory that can span multiple sessions or goals.
- **Environment** refers to the external data or system context the agent operates within think APIs, documents, databases, files, or sensor inputs. The more information and access an agent have to its environment, the more meaningful actions it can take.
- **Goal** is the agent's ultimate objective: what it's trying to achieve. Goals should be specific and clear for instance, “generate a daily schedule,” “summarize this document,” or “extract tasks from emails.”

### Multi-Agent Collaboration

For more advanced systems, you can even have multiple agents working together to hit a shared target. Each agent can be given a specific **role** that highlights its specialty just like people working on a team.

For example:

- A **researcher agent** might be tasked with gathering information.
- A **coder agent** could write Python scripts or automation routines.
- A **reviewer agent** might check the results and ensure everything is up to snuff.

These agents can chat with each other, share information, and even debate or vote on decisions. This kind of teamwork allows AI systems to tackle bigger, more complex tasks while keeping things organized and modular.

---

## Project: Automate Your Daily Schedule from Emails

### What We’re Automating

Think about your typical morning routine:

- You open your inbox.
- You quickly scan through a bunch of emails.
- You try to spot meetings, tasks, and important reminders.
- Then, you manually write a to-do list or add things to your calendar.

Let's use an LLM agent to make that process effortless. Our agent will:

- Read a list of your email messages
- Pull out time-sensitive items like meetings or deadlines
- Summarize everything into a nice, clean daily schedule

### Step 1: Install the Required Tools

To get started, you'll need three main tools: Python, VSCode, and an OpenAI API key.

#### 1. Install Python 3.9 or Higher

Grab the latest version of Python 3.9+ from the official website: 

<SiteInfo
  name="Download Python"
  desc="The official home of the Python Programming Language"
  url="https://python.org/downloads/"
  logo="https://python.org/static/favicon.ico"
  preview="https://python.org/static/opengraph-icon-200x200.png"/>

Once it's installed, double-check it by running `python --version` in your terminal.

This command simply asks your system to report the Python version currently installed. You'll want to see Python 3.9.x or something higher to ensure compatibility with our project.

#### 2. Install VSCode (Optional but Recommended)

VSCode is a fantastic, user-friendly code editor that works perfectly with Python. You can download it right here:

<SiteInfo
  name="Visual Studio Code - Code Editing. Redefined"
  desc="Visual Studio Code redefines AI-powered coding with GitHub Copilot for building and debugging modern web and cloud applications. Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows."
  url="https://code.visualstudio.com/"
  logo="https://code.visualstudio.com/assets/favicon.ico"
  preview="https://code.visualstudio.com/opengraphimg/opengraph-home.png"/>

#### 3. Get Your OpenAI API Key

Head over to:

<SiteInfo
  name="Overview - OpenAI API"
  desc="Explore resources, tutorials, API docs, and dynamic examples to get the most out of OpenAI's developer platform."
  url="https://platform.openai.com/"
  logo="https://platform.openai.com/favicon-platform.svg"
  preview="https://cdn.openai.com/API/images/platform-opengraph.png"/>

Sign in or create a new account. Navigate to your API Keys page. Click “Create new secret key” and make sure to copy that key somewhere safe for later.

#### 4. Install Python Libraries

Open your terminal or command prompt and install these essential packages:

```sh
pip install langgraph langchain openai
```

This command uses pip, Python's package manager, to download and install three crucial libraries for our agent:

- langgraph: The core framework we'll use to build our agent's workflow.
- langchain: A foundational library for working with large language models, upon which LangGraph is built.
- openai: The official Python library for connecting to OpenAI's powerful AI models.

If you're excited to try out multi-agent setups (which we'll cover in Step 5), also install CrewAI:

```sh
pip install crewai
```

This command installs CrewAI, a specialized framework that makes it easy to orchestrate multiple AI agents working together as a team.

#### 5. Set Your OpenAI API Key

You need to make sure your Python code can find and use your OpenAI API key. This is typically done by setting it as an environment variable.

::: tabs

@tab:active <FontIcon icon="iconfont icon-macos"/>,<FontIcon icon="fa-brands fa-linux"/>

On macOS/Linux, run this in your terminal (replace `your-api-key` with your actual key):

```sh
export OPENAI_API_KEY="your-api-key"
```

This command sets an environment variable named `OPENAI_API_KEY`. Environment variables are a secure way for applications (like your Python script) to access sensitive information without hardcoding it directly into the code itself.

@tab <FontIcon icon="fa-brands fa-windows"/>

On Windows (using Command Prompt), do this:

```batch
SET OPENAI_API_KEY="your-api-key"
```

This is the Windows equivalent command to set the `OPENAI_API_KEY` environment variable.

:::

Now, your Python code will be all set to talk to the OpenAI model!

### Step 2: Define the Task

We discussed this briefly in the beginning of this section. But to reiterate, this is what we’ll want our agent to do:

- Scan for meetings, events, and important tasks.
- Jot them down quickly in a notebook or an app.
- Create a rough mental plan for your day.

This routine takes time and mental energy. So having an agent do it for us will be super helpful.

### Step 3: Build the Workflow with LangGraph

#### What Is LangGraph?

LangGraph is a cool framework that helps you build agents using a "graph-based" workflow, kind of like drawing a flowchart. It's powered by LangChain and gives you a lot more control over exactly how each step in your agent's process unfolds.

Each "node" in this graph represents a decision point or a function that:

- Takes some input (its current "state").
- Does some reasoning or takes an action (often involving the LLM and its tools).
- Returns an updated output (a new "state").

You draw the connections between these nodes, and LangGraph then executes it like a smart, automated state machine.

#### Why Use LangGraph?

- You get to control the precise order of execution.
- It's fantastic for building workflows that have multiple steps or even branch off into different paths.
- It plays nicely with both cloud-based models (like OpenAI) and models you run locally.

Alright – now let’s write the code.

##### 1. Simulate Email Input

In a real application, your agent would probably connect to Gmail or Outlook to fetch your actual emails. For this example, though, we’ll just hardcode some sample messages to keep things simple:

```py
emails = """
1. Subject: Standup Call at 10 AM
2. Subject: Client Review due by 5 PM
3. Subject: Lunch with Sarah at noon
4. Subject: AWS Budget Warning – 80% usage
5. Subject: Dentist Appointment - 4 PM
"""
```

This multiline Python string, `emails`, acts as our stand-in for real email content. We're providing a simple, structured list of email subjects to demonstrate how the agent will process text.

##### 2. Define the Agent Logic

Now, we'll tell OpenAI’s GPT model how to process this email text and turn it into a summary.

```py
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, List
import operator

# Define the state for our graph
class AgentState(TypedDict):
    emails: str
    result: str

llm = ChatOpenAI(temperature=0, model="gpt-4o") # Using gpt-4o for better performance

def calendar_summary_agent(state: AgentState) -> AgentState:
    emails = state["emails"]
    prompt = f"Summarize today's schedule based on these emails, listing time-sensitive items first and then other important notes. Be concise and use bullet points:\n{emails}"
    summary = llm.invoke(prompt).content
    return {"result": summary, "emails": emails} # Ensure emails is also returned
```

Here’s what’s going on:

- **Imports**: We bring in necessary components:
  - `ChatOpenAI` to connect to the LLM,
  - `StateGraph` and `END` from `langgraph.graph` to build our agent workflow,
  - `TypedDict`, `Annotated`, and `List` from `typing` for type checking and structure,
  - `operator` (though not used in this snippet, it can help with comparisons or logic).
- **AgentState**: This `TypedDict` defines the shape of the data our agent will work with. It includes:
  - `emails`: the raw input messages.
  - `result`: the final output (the daily summary).
- **llm = ChatOpenAI(...)**: Initializes the language model. We're using GPT-4o with `temperature=0` to ensure consistent, predictable output perfect for structured summarization tasks.
- **calendar_summary_agent(state: AgentState)**: This function is the "brain" of our agent. It:
  - Takes in the current state, which includes a list of emails.
  - Extracts the emails from that state.
  - Constructs a prompt that tells the model to generate a concise daily schedule summary using bullet points, prioritizing time-sensitive items.
  - Sends this prompt to the model with `llm.invoke(prompt).content`, which returns the LLM’s response as plain text.
  - Returns a new `AgentState` dictionary containing:
    - `result`: the generated summary,
    - `emails`: preserved in case we need it downstream.

##### 3. Build and Run the Graph

Now, let's use LangGraph to map out the flow of our single-agent task and then run it.

```py
builder = StateGraph(AgentState)
builder.add_node("calendar", calendar_summary_agent)
builder.set_entry_point("calendar")
builder.set_finish_point("calendar") # END is implicit if not set explicitly

graph = builder.compile()

# Run the graph using your simulated email data
result = graph.invoke({"emails": emails})
print(result["result"])
```

Here’s what’s going on:

- `builder = StateGraph(AgentState)`: We're initiating a StateGraph object. By passing AgentState, we're telling LangGraph the expected data structure for its internal state.
- `builder.add_node("calendar", calendar_summary_agent)`: This line adds a named "node" to our graph. We're calling it "calendar", and we're linking it to our `calendar_summary_agent` function, meaning that function will be executed when this node is active.
- `builder.set_entry_point("calendar")`: This sets "calendar" as the very first step in our workflow. When we start the graph, execution will begin here.
- `builder.set_finish_point("calendar")`: This tells LangGraph that once the "calendar" node finishes its job, the entire graph process is complete.
- `graph = builder.compile()`: This command takes our defined graph blueprint and "compiles" it into an executable workflow.
- `result = graph.invoke({"emails": emails})`: This is where the magic happens! We're telling our graph to start running. We pass it an initial state that contains our emails data. The graph will then process this data through its nodes until it reaches an end point, returning the final state.
- `print(result["result"])`: Finally, we grab the summarized schedule from the result (the final state of our graph) and print it to the console.

#### Example Output

```plaintext title="output"
Your Schedule:
- 10:00 AM – Standup Call
- 12:00 PM – Lunch with Sarah
- 4:00 PM – Dentist Appointment
- Submit client report by 5:00 PM
- AWS Budget Warning – check usag
```

Boom! You've just built an AI agent that can read your emails and whip up your daily schedule. Pretty cool, right? This is a simple yet powerful peek into what LLM agents can do with just a few lines of code.

---

## Multi-Agent Collaboration with CrewAI

### What Is CrewAI?

CrewAI is an exciting open-source framework that lets you build *teams* of agents that work together seamlessly just like a real-world project team! Each agent in a CrewAI setup:

- Has a specific, specialized role.
- Can communicate and share information with its teammates.
- Collaborates to achieve a shared goal.

This multi-agent approach is super useful when your task is too big or too complex for just one agent, or when breaking it down into specialized parts makes it clearer and more efficient.

### Sample Roles for the Email Summary Task

Let's imagine our email summary task being handled by a small team of agents:

| **Agent Name** | **Role** | **Responsibility** |
| --- | --- | --- |
| Extractor | Email Scanner | "Find meetings, reminders, and tasks from emails" |
| Prioritizer | Schedule Optimizer | Sort items by urgency and time |
| Formatter | Output Generator | "Write a clean, polished daily agenda" |

### Sample CrewAI Code

```py :collapsed-lines
from crewai import Agent, Crew, Task, Process
from langchain_openai import ChatOpenAI
import os

# Set your OpenAI API key from environment variables
# os.environ["OPENAI_API_KEY"] = "YOUR_API_KEY" # Make sure this is set, or defined directly

# Initialize the LLM (using gpt-4o for better performance)
llm = ChatOpenAI(temperature=0, model="gpt-4o")

# Define the agents with specific roles and goals
extractor = Agent(
    role="Email Scanner",
    goal="Find all meetings, reminders, and tasks from the given emails, accurately extracting details like time, date, and subject.",
    backstory="You are an expert at scanning emails for key information. You meticulously extract every relevant detail.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

prioritizer = Agent(
    role="Schedule Optimizer",
    goal="Sort extracted items by urgency and time, preparing them for a daily agenda.",
    backstory="You are a master of time management, always knowing what needs to be done first. You organize tasks logically.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

formatter = Agent(
    role="Output Generator",
    goal="Generate a clean, polished, and concise daily agenda in bullet-point format, clearly listing all schedule items.",
    backstory="You are a professional secretary, ensuring all outputs are perfectly formatted and easy to read. You prioritize clarity.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

# Simulate email input
emails = """
1. Subject: Standup Call at 10 AM
2. Subject: Client Review due by 5 PM
3. Subject: Lunch with Sarah at noon
4. Subject: AWS Budget Warning – 80% usage
5. Subject: Dentist Appointment - 4 PM
"""

# Define the tasks for each agent
extract_task = Task(
    description=f"Extract all relevant events, meetings, and tasks from these emails: {emails}. Focus on precise details.",
    agent=extractor,
    expected_output="A list of extracted items with their details (e.g., '- Standup Call at 10 AM', '- Client Review due by 5 PM')."
)

prioritize_task = Task(
    description="Prioritize the extracted items by time and urgency. Meetings first, then deadlines, then other notes.",
    agent=prioritizer,
    context=[extract_task], # The output of extract_task is the input here
    expected_output="A prioritized list of schedule items."
)

format_task = Task(
    description="Format the prioritized schedule into a clean, easy-to-read daily agenda using bullet points. Ensure concise language.",
    agent=formatter,
    context=[prioritize_task], # The output of prioritize_task is the input here
    expected_output="A well-formatted daily agenda with bullet points."
)

# Instantiate the crew
crew = Crew(
    agents=[extractor, prioritizer, formatter],
    tasks=[extract_task, prioritize_task, format_task],
    process=Process.sequential, # Tasks are executed sequentially
    verbose=2 # Outputs more details during execution
)

# Run the crew
result = crew.kickoff()
print("\n########################")
print("## Final Daily Agenda ##")
print("########################\n")
print(result)
```

Here’s what’s going on:

- **Imports:** We bring in key classes from CrewAI: Agent, Crew, Task, and Process. We also import `ChatOpenAI` for our language model and os to handle environment variables.
- **llm = ChatOpenAI(...):** Just like in the LangGraph example, this sets up our OpenAI language model, making sure its responses are direct (temperature=0) and using the gpt-4o model.
- **Agent Definitions (extractor, prioritizer, formatter):**
  - Each of these variables creates an Agent instance. An agent is defined by its role (what it does), a specific goal it's trying to achieve, and a backstory (a sort of personality or expertise that helps the LLM understand its purpose better).
  - `verbose=True` is super helpful for debugging, as it makes the agents print out their "thoughts" as they work.
  - `allow_delegation=False` means these agents won't pass their assigned tasks to other agents (though this can be set to True for more complex delegation scenarios).
  - llm=llm connects each agent to our OpenAI language model.
  - **Simulated emails:** We reuse the same sample email data for this example.
- **Task Definitions (`extract_task`, `prioritize_task`, `format_task`):**
  - Each Task defines a specific piece of work that an agent needs to perform.
  - description clearly tells the agent what the task involves.
  - agent assigns this task to one of our defined agents (e.g., extractor for extract_task).
  - `context=[...]` is a critical part of CrewAI's collaboration. It tells a task to use the *output* of a previous task as its *input*. For instance, `prioritize_task` takes the extract_task's output as its context.
  - expected_output gives the agent an idea of what its result should look like, helping guide the LLM.
- `crew = Crew(...)`:
  - This is where we assemble our team! We create a Crew instance, giving it our list of agents and tasks.
  - `process=Process.sequential` tells the crew to execute tasks one after another in the order they're defined in the tasks list. CrewAI also supports more advanced processes like hierarchical ones.
  - verbose=2 will show you a very detailed log of the crew's internal workings and communication.
- `result = crew.kickoff()`: This command officially starts the entire multi-agent workflow. The agents will begin collaborating, passing information, and working through their assigned tasks in sequence.
- `fprint(result)`: Finally, the consolidated output from the entire crew's collaborative effort is printed to your console.

CrewAI cleverly handles all the communication between agents, figures out who needs to work on what and when, and passes the output smoothly from one agent to the next it's like having a mini AI assembly line!

---

## What Actually Happens During Execution?

So, whether you're using LangGraph or CrewAI, what's really going on behind the scenes when an agent runs? Let's break down the execution process:

- The system gets an **input state** (for example, your emails).
- The first agent or graph node reads this input and uses a **Large Language Model (LLM)** to make sense of it.
- Based on its understanding, the agent decides on an **action** like pulling out key events or calling a specific tool.
- If needed, the agent might **invoke tools** (like a web search or a file reader) to get more context or perform external operations.
- The result of that action is then **passed to the next agent** in the team (if it's a multi-agent setup) or returned directly to you.

Execution keeps going until:

- The task is fully completed.
- All agents have finished their assigned roles.
- A stopping condition or a designated "END" point in the workflow is reached.

Think of this as a super-smart workflow engine where every single step involves reasoning, making decisions, and remembering previous interactions.

---

## Are LLM Agents Safe? What to Know About Security and Privacy

As cool as LLM agents are, they raise an important question: *can you really trust an AI to run parts of your workflow or interact with your data?* It depends. If you’re using services like OpenAI or Anthropic, your data is encrypted in transit and (as of now) isn’t used for training.

But some data might still be temporarily logged to prevent abuse. That’s usually fine for testing and personal projects, but if you’re working with sensitive business info, customer data, or anything private, you’ll want to be careful.

Use anonymized inputs, avoid exposing full datasets, and consider running agents locally using open-source models like LLaMA or Mistral if full control matters to you.

You can also set clear boundaries for your agents so they don’t overstep. Think of it like onboarding a new intern: you wouldn’t give them access to everything on day one.

Give agents only the tools and files they need, keep logs of what they do, and always review the results before letting them make real changes.

As this tech grows, more safety features are coming like better sandboxing, memory limits, and role-based access. But for now, it’s smart to treat your agents like powerful helpers that still need some human supervision.

---

## Troubleshooting & Tips

Sometimes, agents can be a bit quirky! Here are some common issues you might run into and how to fix them:

| **Issue** | **Suggested Fix** |
| --- | --- |
| Agent seems to loop forever | Set a maximum number of iterations or define a clearer stopping point. |
| Output is too chatty or verbose | Use more specific prompts (for example, “Respond in bullet points only”). |
| Input is too long or gets cut off | Break down large pieces of content into smaller chunks and summarize them individually. |
| Agent runs too slowly | Try using a faster LLM model like gpt-3.5 or consider running a local model. |

A handy tip: You can also add print() statements or logging messages inside your agent functions to see what's happening at each stage and debug state transitions.

---

## Explore More Daily Automations

Once you've built one agent-based task, you'll find it incredibly easy to adapt the pattern for other automations. Here are some cool ideas to get your creative juices flowing:

| **Task Type** | **Example Automation** |
| --- | --- |
| DevOps Assistant | "Read system logs, detect potential issues, and suggest solutions." |
| Finance Tracker | Read bank statements or CSV files and summarize your spending habits/budgets. |
| Meeting Organizer | After a meeting, automatically extract action items and assign owners. |
| Inbox Cleaner | "Automatically label, archive, and delete non-urgent emails." |
| Note Summarizer | Convert your daily notes into a neatly formatted to-do list or summary. |
| Link Checker | Extract URLs from documents and automatically test if they're still valid. |
| Resume Formatter | Score resumes against job descriptions and format them automatically. |

Each of these can be built using the very same principles and frameworks we discussed whether that's LangGraph or CrewAI.

---

## What’s Next in Agent Technology?

LLM agents are evolving at lightning speed, and the next wave of innovation is already here:

- **Smarter memory systems**: Expect agents to have better long-term memory, allowing them to learn over extended periods and remember past conversations and actions.
- **Multi-modal agents**: Agents won't just handle text anymore! They'll be able to process and understand images, audio, and video, making them much more versatile.
- **Advanced planning frameworks**: Techniques like ReAct, Toolformer, and AutoGen are constantly improving agents' ability to reason, plan, and reduce those pesky "hallucinations."
- **Edge deployment**: Imagine agents running entirely offline on your local computer or device using lightweight models like LLaMA 3 or Mistral.

In the very near future, you'll see agents seamlessly integrated into:

- Your DevOps pipelines
- Big enterprise workflows
- Everyday productivity tools
- Mobile apps and smart devices
- Games, simulations, and educational platforms

---

## Final Summary

Alright, let's quickly recap all the cool stuff you've just learned and accomplished:

- You've gotten a solid grasp of what LLM agents are and why they're so powerful.
- You've seen how open-source frameworks like LangGraph and CrewAI make building agents much easier.
- You've built a real LLM agent using LangGraph to automate a common daily task: summarizing your inbox!
- You've explored the world of multi-agent collaboration with CrewAI, understanding how teams of AIs can work together.
- You've learned how to take these principles and scale them to automate countless other tasks.

So, next time you find yourself stuck doing something repetitive, just ask yourself: "Hey, can I build an agent for that?" The answer is probably yes!

### Resources Recap

Here are some helpful resources if you want to dive deeper into building LLM agents:

<SiteInfo
  name="crewAIInc/crewAI"
  desc="Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together seamlessly, tackling complex tasks."
  url="https://github.com/crewAIInc/crewAI/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/710601088/b287b45c-081a-4001-884d-67374219f277"/>

<SiteInfo
  name="Introduction | 🦜️🔗 LangChain"
  desc="LangChain is a framework for developing applications powered by large language models (LLMs)."
  url="https://python.langchain.com/docs/introduction/"
  logo="https://python.langchain.com/img/brand/favicon.png"
  preview="https://python.langchain.com/img/brand/theme-image.png"/>

<SiteInfo
  name="Overview - OpenAI API"
  desc="Explore resources, tutorials, API docs, and dynamic examples to get the most out of OpenAI's developer platform."
  url="https://platform.openai.com/"
  logo="https://platform.openai.com/favicon-platform.svg"
  preview="https://cdn.openai.com/API/images/platform-opengraph.png"/>

<SiteInfo
  name="Download Python"
  desc="The official home of the Python Programming Language"
  url="https://python.org/downloads/"
  logo="https://python.org/static/favicon.ico"
  preview="https://python.org/static/opengraph-icon-200x200.png"/>

<SiteInfo
  name="Visual Studio Code - Code Editing. Redefined"
  desc="Visual Studio Code redefines AI-powered coding with GitHub Copilot for building and debugging modern web and cloud applications. Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows."
  url="https://code.visualstudio.com/"
  logo="https://code.visualstudio.com/assets/favicon.ico"
  preview="https://code.visualstudio.com/opengraphimg/opengraph-home.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Open Source LLM Agent Handbook: How to Automate Complex Tasks with LangGraph and CrewAI",
  "desc": "Ever feel like your AI tools are a bit...well, passive? Like they just sit there, waiting for your next command? Imagine if they could take initiative, break down big problems, and even work together to get things done. That's exactly what LLM agents...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-open-source-llm-agent-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
