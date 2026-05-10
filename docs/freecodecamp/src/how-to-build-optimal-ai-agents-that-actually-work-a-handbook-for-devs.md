---
lang: en-US
title: "How to Build Optimal AI Agents That Actually Work – A Handbook for Devs"
description: "Article(s) > How to Build Optimal AI Agents That Actually Work – A Handbook for Devs"
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
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Optimal AI Agents That Actually Work – A Handbook for Devs"
    - property: og:description
      content: "How to Build Optimal AI Agents That Actually Work – A Handbook for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-optimal-ai-agents-that-actually-work-a-handbook-for-devs.html
prev: /programming/py/articles/README.md
date: 2026-05-12
isOriginal: false
author:
  - name: Tiago Capelo Monteiro
    url: https://freecodecamp.org/news/author/tiagomonteiro/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f1ca2c84-0c3f-4f20-84f2-9bad5cc1c915.png
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
  name="How to Build Optimal AI Agents That Actually Work – A Handbook for Devs"
  desc="Since moving to Silicon Valley in 2025, I've seen AI everywhere. And after I attended NVIDIA GTC 2025, one thing became very clear from many conversations I had: most companies now have AI agents runn"
  url="https://freecodecamp.org/news/how-to-build-optimal-ai-agents-that-actually-work-a-handbook-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f1ca2c84-0c3f-4f20-84f2-9bad5cc1c915.png"/>

Since moving to Silicon Valley in 2025, I've seen AI everywhere. And after I attended NVIDIA GTC 2025, one thing became very clear from many conversations I had: most companies now have AI agents running successfully in various projects or departments.

But almost no one has managed to roll them out well across an entire organization. And even where agents are deployed, they're often poorly organized.

Companies are shipping agent systems almost by guessing.

Some of the questions I heard were:

- What's the right number of AI agents in a team?
- What's the best model provider to use?
- Should the agents have a "boss" agent supervising them, or should they coordinate peer-to-peer?

In other words, the main question was:

> What is the best organizational structure for a team of AI agents?

This article tries to answer exactly that.

I previously wrote [**a book on the math behind AI**](/freecodecamp.org/the-math-behind-artificial-intelligence-book/README.md), so we won't be doing any math here.

Instead, we'll focus on how to organize agents for real business cases.

We'll use a recent AI paper from Google Research, Google DeepMind, and MIT — [<VPIcon icon="fa-brands fa-google"/>Towards a Science of Scaling Agent Systems: When and Why Agent Systems Work](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/) as our primary source.

For the code, I'll use a Jupyter notebook in Google Collab.

::: note Prerequisites

You don't need to be an expert developer to create AI agents. There are many no-code tools that can help you through the process.

But to get the most out of the examples here (and to be able to check your agents' work and understand what they're doing), you'll need:

- A general understanding of Python and what an LLM is.
- Ollama installed on your machine to run large language models locally and for free.
- A Jupyter Notebook setup. Google Colab is highly recommended if you have limited local hardware or need cloud GPUs.

:::

Let's get into it!

---

## What is an LLM?

An LLM (Large Language Model) is like a very well-read intern who has never left the library.

The LLM can quote, summarize, translate, and imitate almost any style. It can write a Python script and a Shakespearean sonnet in the same breath!

But it has limitations. For example, when an LLM is unsure, it often invents something with the same confidence it uses for topics it's sure about.

This is called hallucination.

Also, LLMs don't have memory between conversations by default, and they can't do anything on their own. For example, an LLM alone can tell you how to send an email, but it can't send one.

This is where agents come in.

---

## What Are AI Agents?

If an LLM is like an intern, an AI agent is that same intern given a desk, a laptop, and a to-do list – and the ability to act.

An agent is essentially an LLM that has been wrapped in tools, memory, and a loop.

Tools allow the agent to do things like search the web, read a particular file, send an email, and run code. Memory allows the LLM to remember what it did before in other tasks. A loop is just code that lets the LLM think, call a tool, see the result, and think again until the task is done.

In many cases, an individual agent is very useful. But what happens when you have a task too big for one intern (or agent in this case)?

Naturally, you can hire more interns! But you get new problems:

- Should you have one intern with a long to-do list (single-agent)?
- Should you have five interns all working on the same task independently (independent multi-agent)?
- How many interns should be on a team?
- Should a boss who assigns subtasks manage the interns?
- Should you have a group of peers who coordinate among themselves? A mix?

This is the exact question the Google paper we're using as our primary source here tries to answer with over 150 controlled experiments.

Just keep in mind that having more agents doesn't always mean you'll get better results. Sometimes one agent is a perfect fit. And other times you'll need more.

### Some Background

Before we dive in, an important note: these are experimental findings, not laws of physics.

The Google paper evaluated, using an exhaustive methodology, many possible teams of AI agents and providers.

Some of the providers where:

- OpenAI (ChatGPT)
- Google (Gemini)
- Anthropic (Claude)

The results of each differed by model family:

- OpenAI models gained most from centralized/hybrid setups
- Google models showed a clear efficiency plateau
- Anthropic models were more sensitive to coordination overhead.

Since it's a persuasive study based on a lot of experiments, your team can consider these to be strong guidelines you can use when choosing a model family.

---

## A Decision Algorithm for Creating Optimal AI Agents

Now, we'll take the research in the article and convert it into a simple-to-apply algorithm that anyone can use to create AI agents to automate their work.

The main objective of this algorithm is to help you decide, with the Google paper as a scientific reference, if you need just one agent or a couple more.

This way, instead of explaining the article step by step, I'll show you how to actually apply it to solve your problems.

### 1. Check Your Budget

If you have limited hardware, I recommend starting with Ollama.

Ollama is a tool that allows you to run LLMs on your personal computer. And when you run it locally, it's free (and open source).

If you use an API from OpenAI, Google, or Anthropic to access their models, you'll start spending money.

As of 6 of may 2026, OpenAI's GPT-5.5 costs \\(5.00 per 1M tokens, but for GPT-5.4 mini, it costs \\)0.75 per 1M tokens.

If you have limited cloud resources, you can use Google Colab to access GPUs and run larger and newer billion-parameter LLMs. Often, newer LLMs have better results in image generation, coding, and others.

You can also use LLMs with Ollama in Google Colab.

If you have a company project, I recommend this same cloud-based option. It allows you to build a demo and run evaluations in an environment with more memory than most local office hardware provides.

If you have a flexible budget, you can use professional APIs like Claude or Gemini.

Always remember that agents cost tokens, and tokens cost money.

### 2. Start with Only ONE Agent

Always begin with a single agent. Usually, if you're using frontier models, they'll have better performance than older open source models.

### 3. Measure Performance

According to the paper, if a single agent's real-world success rate (how well it works and how accurately it performs) is more than 45%, then there's typically no need to create a team of agents for the task.

To measure this, run the agent on 50–100 representative tasks. Then, score each against a quality bar you defined before starting (human review, a known-good answer, or a checklist).

Note that the paper's 45% finding is only one-directional: it identifies when **not** to add agents (above 45%). But the rule doesn't go the other way and state that if performance is below 45%, that means another agent or two will help.

The authors state that "coordination benefits arise from matching communication topology to task structure, not from scaling the number of agents".

Basically, if your agent underperforms, fix the agent first! Don't just automatically think you need another agent.

If you determine, for your project, that a single agent works, then go ahead to step 7. If the single agent's performance is below 45%, first try improving it (better prompts, tools, or model). Only consider creating a team of agents if the task is naturally parallel (see the next step).

### 4. Assess Task Parallelism

A big question then becomes, why use multiple agents at all? Here's how you can decide:

If your task involves just one continuous job, a single agent typically does it better and cheaper.

But multiple agents can help when you can clearly split your project into discrete subtasks. Then a different specialist (agent) can tackle each subtask and multiple agents can work on multiple tasks in parallel.

In this step of our algorithm, you want to see if the task you're trying to apply the AI agents to is naturally parallel.

A task is naturally parallel if it can be split into independent subtasks. For example:

- Searching for the best flight across five different websites.
- Summarizing ten separate news articles at once.

Examples where tasks are not naturally parallel:

- Planning a trip from start to finish (you must choose a destination before booking a hotel, for example – so those tasks can't be completed in parallel).
- Managing a bank transfer (the funds must be verified before they're sent).

If the task is naturally parallel, you may benefit from more agents, and you should continue on to step 5. If it's not (the task is sequential or step-by-step), stop. According to the article's research, multi-agent teams will just negatively impact the result in these cases and you should stick to one agent.

In this case (not naturally parallel), you can just work on improving your prompts, tools, or your model for the single agent. Then after it beats the 45%, go to step 7. ### 5. Pick the Topology by Task Type

Now we'll decide on the structure for our agent team.

Topology simply means the structure of a system. In this case, we're talking about the structure of the team of AI agents.

This step only applies once you've decided you need multiple agents. Both topologies we'll examine here are multi-agent.

If the task is based on analysis or structured work, it's better to use a centralized model. A centralized model is like a manager managing a group of interns below them. The interns report to the manager, and the manager coordinates them.

A centralized model is good for pipelines like financial reports.

According to the study, this reduces error amplification from ~17x to 4x. This means that, when the manager makes a mistake, instead of 17 errors being created by the interns, there are more like 4 errors.

If the task is more related to exploration, use a decentralized model.

They're good for open-ended research or audits where agents review the same material from different angles.

A decentralized model is like interns in a team brainstorming ideas for a new product for the company or discussing over lunch how to make a process faster.

### 6. Cap the Team Size and Available Tools Per Agent

According to the paper, AI agent success starts to degrade after about 3–4 agents.

They also explain that each agent should have access to the minimum tools necessary (1–3 tools per agent). The more tools each agent has, the worse it performs.

### 7. Build Evaluations

Now, you have something that works most of the time. But how can you ensure the agents will scale across the organization? For this reason, now you need to establish internal tests before scaling the agents.

These internal tests are called evals (evaluations).

For each evaluation, you'll need to have clear metrics that let you know how the agents are performing in each evaluation.

You'll want to measure things like accuracy, efficiency, and trajectory. Accuracy tells us if the model got it right. Efficiency reports how fast and cheap it was to process the request. And trajectory shows if the model used the right tools to do the task.

Remember, in AI and engineering in general, if you can't measure the system's performance, you can't trust the system.

This way, you can start seeing how well the model performs with the data your organization works with and its context. Using these evals, you can help the agents become more independent and better over time.

Evals might be:

- Input emails and output responses expected
- Input customer support transcripts and outputs summarized action items
- Input complex legal contracts and outputs identified high-risk clauses

Then you see how close the agent's or agents' outputs are to the expected output.

You can also try different models and go through this decision algorithm again to see which models work best for your use case. After all, new models are often better than previous models.

With this workflow in place, you'll create more accurate and efficient agents.

Now let's look at this algorithm in action using three use cases.

---

## Three Code Examples

In this section, I'll explain how I ran the code in the Jupyter notebook. I recommend that you copy the code and run it yourself so you can follow along and understand how it works.

We'll start the code in the sections I defined in the Google Colab so that you understand everything.

::: info

You can find the [here on GitHub as well (<VPIcon icon="iconfont icon-github"/>`tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook`)](https://github.com/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook). I used the MIT license for this code.

<SiteInfo
  name="tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook"
  desc="A practical, research-backed handbook for deciding when (and how) to build AI agent teams that actually ship"
  url="https://github.com/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/50f45e6d50dade5222176efc05e246ccd0d597ff563f378fb747565f69359384/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook"/>

:::

### 1. Installing Utilities, Python Libraries, and Doing Config

```sh
sudo apt update && sudo apt install -y pciutils
sudo apt-get install -y zstd
curl -fsSL https://ollama.com/install.sh | sh
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/c91a3d8b-18dd-4850-bca6-ae707e69736c.png) -->

This code essentially prepares the notebook to run AI agents.

The first line updates the package list and installs hardware detection tools to identify your GPU. The second line installs a high-speed decompression utility needed to unpack model files. Finally, it downloads the official Ollama setup script and executes it to install the software.

Ollama is an open-source tool that allows you to use LLMs on your computer.

```sh
pip install uv
uv pip install langchain-ollama ollama crewai duckduckgo-search langchain-community ddgs faker
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/d86340f3-3a19-4a89-9975-ecb4116d379a.png) -->

Here, we downloaded the `uv` Python package. It's like pip but far faster and safer.

With this, we can download the rest of the Python libraries much more quickly.

```py
import socket
import subprocess
import threading
import time

import ollama
from crewai import Agent, Crew, LLM, Process, Task
from IPython.display import Markdown
from langchain_ollama.llms import OllamaLLM

from crewai.tools import tool
from langchain_community.tools import DuckDuckGoSearchRun

from faker import Faker
```

<!-- ![60effe35-2293-4201-afb0-f561a64470e4](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/60effe35-2293-4201-afb0-f561a64470e4.png) -->

With the above code, we imported all the Python libraries needed to create optimal AI agents.

Let's see what each one does:

- [<VPIcon icon="iconfont icon-github"/>`python/cpython`](https://github.com/python/cpython/blob/main/Lib/socket.py): Connects your computer to others over a network.
- [<VPIcon icon="iconfont icon-github"/>`python/cpython`](https://github.com/python/cpython/blob/main/Lib/subprocess.py): Lets Python launch and control other programs on your computer.
- [<VPIcon icon="iconfont icon-github"/>`python/cpython`](https://github.com/python/cpython/blob/main/Lib/threading.py): Runs multiple tasks at once so one slow process doesn't freeze the whole code.
- [<VPIcon icon="iconfont icon-github"/>`python/cpython`](https://github.com/python/cpython/blob/main/Modules/timemodule.c): Handles delays and timestamps, like making the code wait or measuring speed.
- [<VPIcon icon="iconfont icon-github"/>`ollama/ollama-python`](https://github.com/ollama/ollama-python): The tool we'll use for talking to AI models running locally on your machine.
- [<VPIcon icon="iconfont icon-github"/>`crewAIInc/crewAI`](https://github.com/crewAIInc/crewAI): Organizes multiple AI agents to work together like a specialized team.
- [<VPIcon icon="iconfont icon-github"/>`ipython/ipython`](https://github.com/ipython/ipython): Powers interactive coding features and pretty-printing in tools like Jupyter.
- [langchain_ollama (<VPIcon icon="iconfont icon-github"/>`langchain-ai/langchain`)](https://github.com/langchain-ai/langchain/blob/master/libs/partners/ollama/README.md): Plugs local Ollama models into the popular LangChain AI framework.
- [<VPIcon icon="iconfont icon-github"/>`langchain-ai/langchain-community`](https://github.com/langchain-ai/langchain-community): Offers hundreds of extra "connectors" to link AI to the outside world.
- [<VPIcon icon="iconfont icon-github"/>`joke2k/faker`](https://github.com/joke2k/faker): Generates realistic "dummy" data (names, emails) for testing your code safely.

```py
fake = Faker("en_US")

Faker.seed(42)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/6d896775-9db5-4d1a-b144-07b035f1dc35.png) -->

In these two lines of code, we configured the Faker Python library to generate fake data in English from the United States.

### 2. Starting the Ollama Server, Getting the Model and Tools

```py
with open("ollama.log", "w") as log_file:
    process = subprocess.Popen(["ollama", "serve"], stdout=log_file, stderr=log_file)

def is_server_ready(port=11434):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

print("Booting Ollama server...")
max_retries = 20
ready = False

for i in range(max_retries):
    if is_server_ready():
        ready = True
        break
    time.sleep(1)
    if i % 5 == 0:
        print(f"Still waiting... ({i}s)")

if ready:
    print("\n Success! Ollama is running and ready for models.")
    !curl -s http://localhost:11434 | grep "Ollama is running"
else:
    print("\n Error: Ollama server failed to start. Check 'ollama.log' for details.")
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/1daf506b-fb25-4487-9bb3-887b37bb0aaf.png) -->

This code helps ensure that your local environment is fully prepared before your AI models try to run.

AI servers often take some time to boot, so just be patient.

This script prevents "connection refused" errors by using a background process to start Ollama and a network "handshake" to confirm that it's awake.

```sh
ollama pull mistral-small3.2
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/ce54b7e0-0b4f-4751-b797-ac4bd45cae63.png) -->

In this line, we loaded the `mistral-small3.2` LLM to the Google Colab notebook.

Mistral is a model developed by a well-known French startup, Mistral AI SAS.

```py
_ddg = DuckDuckGoSearchRun()

@tool("web_search")
def web_search(query: str) -> str:
    """Search the public web via DuckDuckGo. Input: a concise search query string. Returns: top result snippets as plain text."""
    return _ddg.run(query)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/0cadabf5-d454-418d-844c-3167a68283bd.png) -->

In this code we've created a tool for our agents to use: we're giving the agents the ability to search the web with DuckDuckGo. DuckDuckGo is one of the most popular privacy-focused search engines on the web.

This is crucial because it enables our agents to provide recent information they haven't yet been programmed to know.

### 3. Testing the Model

Now we'll write the code that's the layout where we'll define and test the LLM.

We're initializing both a standard model for direct tasks and a specialized LLM object for the CrewAI framework. It's the specialized LLM object for the CrewAI framework that we'll use to power our AI agents.

This initial configuration is important because it validates that your machine is properly communicating with the software before you try to create AI agents.

```py
AI_prompt = "Write a quick system prompt for an AI agent whose job is to summarize financial documents."

AI_model = OllamaLLM(model="mistral-small3.2")

crew_llm = LLM(
    model="ollama/mistral-small3.2",
    base_url="http://localhost:11434"
)

print("Running Mistral...")
AI_response = AI_model.invoke(AI_prompt)
display(Markdown(f"### AI Output:\n{AI_response}"))
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/5f76b8c8-6713-40dd-a624-fc83fb35f666.png) -->

### 4. Running the AI Agents

Now, we'll run three different agent configurations.

The first one is a single agent for sequential tasks. The second one is a centralized team, and the third one is a decentralized team.

#### Sequential Tasks with a Single Agent

```py
doc_5_1 = f"""{fake.company()} {fake.company_suffix()} — Q3 2026 Earnings Report
Prepared by: {fake.name()}, CFO
KEY METRICS
Revenue: ${fake.random_int(50, 500)}M (up {fake.random_int(5, 25)}% YoY)
Net Income: ${fake.random_int(10, 80)}M
Operating Margin: {fake.random_int(12, 28)}%
Active Customers: {fake.random_int(10_000, 500_000):,}
Cash on Hand: ${fake.random_int(100, 900)}M
Employee Headcount: {fake.random_int(200, 5000):,}
MANAGEMENT COMMENTARY
{fake.paragraph(nb_sentences=5)}
RISK FACTORS
{fake.paragraph(nb_sentences=4)}
"""
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/15c0b2f4-9e8e-4ed1-950b-2d897502ae28.png) -->

In this code, we prepared the general template where the fake data will be generated.

```py
print(doc_5_1)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/c16aa43e-da98-4255-be6e-0ba60b342163.png) -->

```plaintext
Rodriguez, Figueroa and Sanchez and Sons — Q3 2026 Earnings Report
Prepared by: Megan Mcclain, CFO
KEY METRICS
Revenue: $94M (up 23% YoY)
Net Income: $64M
Operating Margin: 13%
Active Customers: 25,622
Cash on Hand: $195M
Employee Headcount: 1,991
MANAGEMENT COMMENTARY
Own night respond red information last everything. Serve civil institution. Choice whatever from behavior benefit. Page southern role movie win her.
RISK FACTORS
Stop peace technology officer relate. Product significant world. Term herself law street class. Decide environment view possible participant commercial. Clear here writer policy news.
```

With this code, we printed the document the agent will process.

```py
analyst = Agent(
    role="Senior Financial Document Specialist",
    goal=(
        "Read the provided document end-to-end, extract the 5 most decision-relevant KPIs "
        "(with units, period, and source line when available), and produce a CEO-ready summary. "
        "When a figure is missing or ambiguous, use web_search to verify it against public sources."
    ),
    backstory=(
        "You have 10+ years auditing 10-Ks, earnings releases, and investor decks at a Big Four firm. "
        "You work linearly, cite page/section for every metric, and never invent numbers — "
        "if a value isn't in the text, you search for it or mark it as 'not disclosed'."
    ),
    tools=[web_search],
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/528b2693-3b24-4119-b88e-3eda4d1d9141.png) -->

In this code, we defined an agent that acts as an analyst. This analyst will analyze the report that's generated. It will also have access to DuckDuckGo.

```py
task_1 = Task(
    description=(
        "Analyze the following document for KPI metrics.\n\n"
        "DOCUMENT:\n"
        f"{doc_5_1}"
    ),
    agent=analyst,
    expected_output="A list of 5 key KPIs found in the text.",
)

task_2 = Task(
    description="Based on the KPIs extracted in the previous task, write a professional executive summary.",
    agent=analyst,
    expected_output="A 200-word summary suitable for a CEO.",
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/b5737a9c-ccc8-477c-b859-bf6de5a82f87.png) -->

The analyst will only have two tasks: one is to find KPI metrics and the second is to write a report of the document. So, in this way we have sequential tasks performed by only one AI agent, and we're following the empirical guidelines of the Google paper.

```py
sequential_crew = Crew(
    agents=[analyst],
    tasks=[task_1, task_2],
    process=Process.sequential
)

print("Running Case 1: Sequential...")
result_1 = sequential_crew.kickoff()
display(Markdown(f"### Case 1 Result:\n{result_1}"))
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/c1a24352-e8e3-4f49-a2d0-c7e0bd75d3db.png) -->

```plaintext :collapsed-lines
Dear CEO,

I am pleased to present a concise overview of Rodriguez, Figueroa and Sanchez and Sons Q3 2026 Earnings Report. Our company has demonstrated strong financial performance this quarter. We reported a significant increase in revenue, achieving $94 million, which represents a substantial 23% year-over-year growth. This growth is a testament to our effective business strategies and the increasing demand for our products or services.

Our net income for the quarter stands at $64 million, showcasing our ability to maintain robust profitability. The operating margin of 13% further highlights our efficient cost management and operational excellence. Customer satisfaction and engagement continue to be a priority, as evidenced by our growing base of 25,622 active customers.

In terms of liquidity, we have a solid cash position of $195 million, ensuring that we have the necessary resources to seize new opportunities and navigate any challenges that may arise. Our employee headcount of 1,991 reflects our commitment to talent acquisition and development.

In conclusion, this quarter's results underscore our strong market position and the successful execution of our business strategies. We remain optimistic about our future prospects and are committed to driving sustainable growth and shareholder value. Let's continue to build on this momentum in the coming quarters.

Best Regards, [Your Name]
```

Finally, we've run the agent we created and the above is the agent's report.

#### Centralized Team of Four Agents

Now we'll create a team of four agents so you can see how multiple agents work.

This team researches lithium market trends to carry out financial modeling and generate an investment proposal based on data.

A centralized team works here because each step feeds into the next. We start our research, then we study the research, and finally we make a recommendation.

Let's build the first one that will research the market:

```py
researcher = Agent(
    role="Commodity Market Researcher (Battery Metals)",
    goal=(
        "Produce dated, sourced price data points for 2026 lithium carbonate and lithium hydroxide forecasts. "
        "Always pull from web_search; never guess. Return each data point as: value, unit, date, source URL."
    ),
    backstory=(
        "Ex-analyst at a commodities desk. You trust only primary sources (IEA, Benchmark Mineral Intelligence, "
        "Fastmarkets, company filings) and you flag any figure that lacks a verifiable source."
    ),
    tools=[web_search],
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/6d204267-0a65-4b0a-b93a-844282724550.png) -->

The first agent we created will search the web for data related to lithium. For this task it will have access to DuckDuckGo.

Now we'll create an agent that knows and works in finance to model the data the researcher got.

```py
finance_pro = Agent(
    role="Capex Financial Modeler",
    goal=(
        "Take the researcher's price data and run a 10-year NPV and IRR simulation at a 10% discount rate, "
        "stating all assumptions explicitly and returning a table plus a short narrative."
    ),
    backstory=(
        "You've built DCF models for gigafactory investments. You show your formulas, label base/bull/bear cases, "
        "and refuse to produce a number without stating the inputs behind it."
    ),
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/375e5943-3bd4-4c05-8ab1-4fcc10dab892.png) -->

The finance agent will use the researcher's information and make simulations of it.

From there, we'll define another agent that will advise us on strategy based on the financial model:

```py
strategy_advisor = Agent(
    role="Investment Strategy Advisor",
    goal=(
        "Synthesize the researcher's price data and the modeler's NPV/IRR results into a "
        "clear go/no-go recommendation, with the top 3 risks and the conditions under which "
        "the recommendation flips."
    ),
    backstory=(
        "Former MD at a project-finance fund. You translate models into decisions and always "
        "name the sensitivities that would change your call."
    ),
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/daf6b079-cb53-410b-a2cb-5d7d933a13f6.png) -->

This way, we have one agent to do the research, another to do the modeling, and a final one to advise us on strategy.

```py
centralized_crew = Crew(
    agents=[researcher, finance_pro, strategy_advisor],
    tasks=[
        Task(description="Research 2026 lithium price forecasts.", agent=researcher, expected_output="Price data points."),
        Task(description="Run an NPV simulation using prices.", agent=finance_pro, expected_output="Full NPV report."),
        Task(description="Issue a go/no-go recommendation based on the NPV report.", agent=strategy_advisor, expected_output="Go/no-go memo with top 3 risks."),
    ],
    process=Process.hierarchical,
    manager_llm=crew_llm
)

print("Running Case 2: Centralized (Hierarchical)...")
result_2 = centralized_crew.kickoff()
display(Markdown(f"### Case 2 Result:\n{result_2}"))
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/90723254-2519-4187-a208-d014c7b20b66.png) -->

Now, we create the 4th agent. This is the`manager_llm`, and it auto-spawns the manager that will review the other agents' work.

Then, we run the three agents together.

#### Decentralized Team of Three Agents

Now we'll create a decentralized team of three agents. Once again, the first step is to create the data.

A decentralized model fits here because the auditors review the same data from different angles. Also, the auditors cross-reference findings.

```py
groups = ["Group A (men)", "Group B (women)", "Group C (under-40)", "Group D (over-40)"]
hiring_stats = "\n".join(
    f"{g}: {fake.random_int(40, 120)} applicants, {fake.random_int(5, 25)} hired"
    for g in groups
)
feedback = "\n".join(
    f'- Candidate {fake.name()}: "{fake.sentence(nb_words=12)}"'
    for _ in range(6)
)
doc_5_3 = f"""Q1 2026 Hiring Audit Data — {fake.company()}
APPLICANT POOL & SELECTION RATES
{hiring_stats}
INTERVIEWER FEEDBACK NOTES (sample)
{feedback}
"""
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/5ff84edc-306e-460b-bb3a-181254cbab79.png) -->

We also defined a general template to generate the fake data.

```py
print(doc_5_3)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/d68ddc9a-15c6-4f0f-aa12-ecdf08e6c7d0.png) -->

```plaintext
Q1 2026 Hiring Audit Data — Zimmerman Inc
APPLICANT POOL & SELECTION RATES
Group A (men): 81 applicants, 6 hired
Group B (women): 69 applicants, 6 hired
Group C (under-40): 80 applicants, 17 hired
Group D (over-40): 74 applicants, 7 hired
INTERVIEWER FEEDBACK NOTES (sample)
- Candidate Tommy Walter: "Defense material those poor central cause seat much section investment on gun."
- Candidate Brenda Snyder PhD: "Check civil quite others his other life edge."
- Candidate Terri Frazier: "Race Mr environment political born itself law west."
- Candidate Deborah Mason: "Medical blood personal success medical current hear claim well."
- Candidate Tamara George: "Affect upon these story film around there water beat magazine attorney set she campaign."
- Candidate Joshua Baker: "Institution deep much role cut find yet practice just military building different full open discover detail."
```

Above is the fake data we generated.

Now, we'll create three auditors.

The first auditor focuses on the demographic groups of the people it hires.

```py
auditor_a = Agent(
    role="Statistical Hiring Auditor",
    goal=(
        "Compute selection-rate ratios across demographic groups for the Q1 hiring batch, "
        "apply the 4/5ths rule, and flag any group where the ratio falls below 0.80. "
        "Use web_search only to confirm regulatory definitions."
    ),
    backstory=(
        "Former EEOC compliance analyst. You are rigorously numerical, cite the Uniform "
        "Guidelines on Employee Selection Procedures, and never draw qualitative conclusions "
        "outside your lane."
    ),
    tools=[web_search],
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/bd05e48c-156e-4f34-aaa7-6ded4e460a46.png) -->

Then we'll define the second auditor for recruitment processing. This one seeks to find bias in the way interviews are conducted.

```py
auditor_b = Agent(
    role="Qualitative Bias Reviewer",
    goal=(
        "Read interview notes and written feedback for coded language, inconsistent rubric "
        "application, and sentiment skew across candidate groups. Combine your findings with "
        "the statistical auditor's numbers into one final report."
    ),
    backstory=(
        "I/O psychologist with a focus on structured-interview research. You cite specific "
        "phrases as evidence and distinguish 'concerning pattern' from 'isolated incident'."
    ),
    tools=[web_search],
    llm=crew_llm,
    verbose=True,
    allow_delegation=False,
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/bcb01353-cab0-4fa1-8ca5-22aacc8ed88e.png) -->

Finally, we create a third auditor that will focus on whether the the various hiring policies are met or not.

```py
auditor_c = Agent(
    role="Process & Policy Compliance Auditor",
    goal=(
        "Review the hiring process for adherence to documented policy: structured-interview "
        "use, rubric consistency, and required approval steps. Cross-check the statistical "
        "and qualitative findings to surface root-cause process gaps."
    ),
    backstory=(
        "Internal audit lead with an HR-ops background. You map findings to specific policy "
        "clauses and recommend concrete process fixes."
    ),
    tools=[web_search],
    llm=crew_llm,
    verbose=True,
    allow_delegation=True,
)
```

![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/d1be79dd-7346-4d6a-b794-672050a97aa4.png)

In each auditor initialization, we define 'allow_delegation=True'. This way, the agents know they can communicate with each other.

Then we give each auditor a task.

```py
task_audit_stats = Task(
    description=(
        "Audit the Q1 hiring batch for structural bias. "
        "Compute selection rates per group and flag any disparities.\n\n"
        "DATA:\n"
        f"{doc_5_3}"
    ),
    agent=auditor_a,
    expected_output="A report highlighting any group disparities found.",
)

task_audit_review = Task(
    description=(
        "Review the findings of the Statistical Auditor and add qualitative "
        "context from the interviewer notes in the original document."
    ),
    agent=auditor_b,
    expected_output="A final combined audit report with numbers and narrative.",
)

task_audit_process = Task(
    description=(
        "Using the statistical and qualitative findings above, identify process-level root "
        "causes (e.g. unstructured interviews, missing rubrics, approval gaps) and propose fixes."
    ),
    agent=auditor_c,
    expected_output="A process-gap list with policy references and recommended fixes.",
)
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/5af5e0b0-14d7-4a5b-a274-a0df4b7012cb.png) -->

Finally, we assemble the auditor team:

```py
decentralized_crew = Crew(
    agents=[auditor_a, auditor_b, auditor_c],
    tasks=[task_audit_stats, task_audit_review, task_audit_process],
    process=Process.sequential,
)

print("Running Case 3: Decentralized (Peer Review)...")
result_3 = decentralized_crew.kickoff()
display(Markdown(f"### Case 3 Result:\n{result_3}"))
```

<!-- ![](https://cdn.hashnode.com/uploads/covers/66b61567c4f938d4d78aca50/c9cfff42-eb86-4f57-9840-7f85cc83768a.png) -->

```plaintext :collapsed-lines

Case 3 Result:
Combined Audit Report: Q1 Hiring Batch Audit for Structural Bias
Statistical Audit Findings:

    Applicant Pool and Selection Rates:
        Group A (men): 81 applicants, 6 hired
            Selection Rate: 6/81 = 0.074074 (7.41%)
        Group B (women): 69 applicants, 6 hired
            Selection Rate: 6/69 = 0.08696 (8.70%)
        Group C (under-40): 80 applicants, 17 hired
            Selection Rate: 17/80 = 0.2125 (21.25%)
        Group D (over-40): 74 applicants, 7 hired
            Selection Rate: 7/74 = 0.094595 (9.46%)

    Selection Rate Ratios:
        Group A / Group B: 0.074074 / 0.08696 = 0.85 (85%)
        Group C / Group D: 0.2125 / 0.094595 = 2.24 (224%)

    Application of the 4/5ths Rule:
        Group A (men) vs Group B (women): The selection rate ratio is 0.85, which is above the 0.80 threshold.
        Group C (under-40) vs Group D (over-40): The selection rate ratio is 2.24, which is above the 0.80 threshold.

    Conclusion: Based on the selection rate analysis, no group disparities are flagged as falling below the 0.80 threshold according to the 4/5ths rule.

Qualitative Audit Findings:
Group A (men) vs Group B (women):

    Concerning Patterns:
        Feedback Inconsistency:
            Isolated Incident: "Candidate lacked experience but showed strong potential."
                This feedback was given to a female candidate but not to similarly situated male candidates.
        Sentiment Skew:
            Concerning Pattern: More frequently in female candidate assessments the phrases "needs improvement in leadership skills" and "less assertive" were observed.

Group C (under-40) vs Group D (over-40):

    Concerning Patterns:
        Feedback Inconsistency:
            Concerning Pattern: Phrases like "strong strategic thinker" and "in-depth industry knowledge" frequently used to describe over-40 candidates.
                Similar competence indicators were not noted in feedback for candidates under 40.        Sentiment Skew:
            Isolated Incident: For a few under-40 candidates, feedback noted "lacks experience in leading teams."
                This sentiment was not applied to under-40 candidates with similar profiles but differed in gender.

Additional Notes:

    Rubric Application:
        Concerning Pattern: The rubric application was inconsistent when evaluating "leadership skills" and "assertiveness" especially between male and female candidates.
        Isolated Incident: Some reviewers emphasized "cultural fit" for female candidates which was not a requirement and was not consistently applied.

Final Conclusion:

Based on the selection rate analysis, no group disparities are flagged as falling below the 0.80 threshold according to the 4/5ths rule. However, qualitative findings indicate potential biases in feedback and rubric application which could influence hiring decisions. Recommendations:

    Standardize evaluation criteria and implement unbiased language in evaluations.
    Conduct further training to ensure consistent understanding and application of rubric standards across all reviewers.
    Monitor the impact of these interventions in future hiring cycles to ensure equitable selection practices.
```

Above, you can see the report from the three auditors about the hiring process.

---

## Conclusion: The Future of AI is Evals

If you remember one thing from this article, let it be this: **The organizations that win with AI agents are not the ones with the most agents. They are the ones with the best evals.**

The Google paper gave us simple rules for picking agent architectures. Those rules are very useful, and I've laid them out in the form of an algorithm.

But those rules were derived from benchmarks, not an organization's data. For that reason, you have to build your own evals. Nobody knows what "correct" looks like in your domain except you.

This is the same point made by Sam Bhagwat in [<VPIcon icon="fas fa-globe"/>Principles of Building AI Agents](https://mastra.ai/blog/principles-of-ai-engineering), which I'd recommend to anyone shipping agents.

So here's the playbook again:

1. **Check your budget first:** Tokens cost money. Know what you can spend per task.
2. **Always start with one agent:** If it solves the task >45% of the time, ship it. Don't add agents.
3. **Only build a team if the task is naturally parallel:** Sequential tasks get worse with a team.
4. **Match topology to task:** For analysis it is better a centralized team. For open web research it is betetr a decentralized team. If it is sequential, it is better just one agent.
5. **Cap teams at 3–4 agents and no more than 3 tools per agent:** Like in real life the smaller the team the more agile and less mistakes it makes.
6. **Put a supervisor on any parallel setup:** According to the study, unchecked swarms amplify errors ~17×. Supervised ones ~4×.
7. **Build evals before you scale:** Synthetic tests, historical back-tests, LLM-as-judge with human calibration.

And keep humans in the loop for high-stakes decisions.

Once again, agents are like interns. Now, whether they produce great work or burn down the organization depends on how well you organize and check their work.

::: info

You can find the [code on GitHub here (<VPIcon icon="iconfont icon-github"/>`tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook`)](https://github.com/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook).

<SiteInfo
  name="tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook"
  desc="A practical, research-backed handbook for deciding when (and how) to build AI agent teams that actually ship"
  url="https://github.com/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/50f45e6d50dade5222176efc05e246ccd0d597ff563f378fb747565f69359384/tiagomonteiro0715/How-to-Build-Optimal-AI-Agents-That-Actually-Work-Handbook"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Optimal AI Agents That Actually Work – A Handbook for Devs",
  "desc": "Since moving to Silicon Valley in 2025, I've seen AI everywhere. And after I attended NVIDIA GTC 2025, one thing became very clear from many conversations I had: most companies now have AI agents runn",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-optimal-ai-agents-that-actually-work-a-handbook-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
