---
lang: en-US
title: "How to Build and Schedule Local AI Assistants for Daily Tasks"
description: "Article(s) > How to Build and Schedule Local AI Assistants for Daily Tasks"
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
      content: "Article(s) > How to Build and Schedule Local AI Assistants for Daily Tasks"
    - property: og:description
      content: "How to Build and Schedule Local AI Assistants for Daily Tasks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-schedule-local-ai-assistants-for-daily-tasks.html
prev: /ai/langchain/articles/README.md
date: 2026-07-14
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/67ad144a-050e-4d98-a7c3-9f0a2c9b5648.png
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
  name="How to Build and Schedule Local AI Assistants for Daily Tasks"
  desc="Most AI agents are reactive as they wait for us to ask something. In this tutorial, I'll show you how to build local AI assistants that run on a schedule, handle the tasks you care about, and generate"
  url="https://freecodecamp.org/news/how-to-build-and-schedule-local-ai-assistants-for-daily-tasks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/67ad144a-050e-4d98-a7c3-9f0a2c9b5648.png"/>

Most AI agents are reactive as they wait for us to ask something. In this tutorial, I'll show you how to build local AI assistants that run on a schedule, handle the tasks you care about, and generate daily digests for it. Each Assistant is an AI agent and the goal is to automate repetitive work with a cron-driven setup that saves you time.

We'll use Python to create a simple local scheduler, a directory of agents, and Ollama running the model locally so you avoid per-call API charges and keep inference on your own machine.

---

## Background

Many of us have AI agents that can perform useful tasks – but they still need to be triggered. What if you could build a system that runs every day, automatically invokes those agents, and delivers the results without any manual effort? As an example, Claude uses the `/loop` command to scheduling recurring tasks.

In this tutorial, we'll build a lightweight daily scheduler that does exactly that. Every day, it invokes three read-only AI agents on a schedule. The same pattern can be extended to automate virtually any recurring AI-powered workflow. The AI agent acts as your assistant to complete the task.

To follow this tutorial, you'll need Ollama installed on your machine. The example works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model from Ollama.

---

## Motivation and Architecture

The motivation behind this project is simple: I want AI agent workers to handle repetitive tasks for me. Instead of doing tasks manually, I can have specialized agents do the work automatically.

Another benefit of this approach is privacy and control. Since everything runs locally, the agents, prompts, and outputs remain on my machine. There's no need to rely on external automation platforms or send workflow data to third-party services.

The architecture is intentionally lightweight. A scheduler runs once a day and invokes a set of read-only AI agents.

Each agent is responsible for a single task: checking GOOGL stock performance, summarizing the latest AI news, and generating a weather brief. The agent scheduler executes them independently, collects their outputs, and stores the results as markdown file in outputs folder. As the needs grow, we can add more agents to the folder to create additional recurring workflows. The agent scheduler code won't change.

```sh title="file structure"
project/
├── scheduler.py
├── outputs/
├── agents/
    ├── googl_stock.py
    ├── ai_news.py
    └── weather_brief.py
```

---

## Step 1: Install Ollama and Pull the Model

First, install Ollama for your platform.

We'll use Qwen for the local model.

```sh
ollama pull qwen3.5:4b
```

---

## Step 2: Install Python Dependencies

Create a virtual environment and install the packages:

```sh
python3 -m venv venv
source venv/bin/activate
pip install langchain langchain-ollama requests
```

It requires LangChain >= 1.0.0

One of the example agents uses Ollama's hosted web search API for fresh AI news. That API requires an [<VPIcon icon="iconfont icon-ollama"/>Ollama account](https://docs.ollama.com/api/authentication#api-keys) and an API key in `OLLAMA_API_KEY`.

Set the key like this:

```sh
export OLLAMA_API_KEY="paste-key-here"
```

---

## Step 3: Define the Agent Format

Every agent is a Python file in the <VPIcon icon="fas fa-folder-open"/>`agents/` folder with two attributes:

- `NAME`
- `run()`

`run()` takes no arguments and returns a string. Whatever it returns gets written to a timestamped Markdown file in `outputs/`.

Create the folder structure:

```sh
mkdir -p agents outputs
touch agents/__init__.py
```

---

## Step 4: Create the Agent Scheduler

The agent scheduler does three small jobs:

1. Loads every agent module from <VPIcon icon="fas fa-folder-open"/>`agents/`
2. Calls `run()` on each one
3. Saves the result to `outputs/`

That's the whole agent scheduler. There's no state file or per-agent scheduling logic. The OS scheduler decides when the agent scheduler fires, and the agent scheduler executes every agent each time and saves the output from the agents as markdown file in outputs/ folder.

To add more agents, simply add them to the agents/ folder. The agent scheduler doesn't need to change.

Save this as <VPIcon icon="fa-brands fa-python"/>`scheduler.py`:

```py :collapsed-lines title="scheduler.py"
import importlib
from datetime import datetime
from pathlib import Path

# Folder that contains all agent files.
AGENTS_DIR = Path("agents")

# Folder where the output files will be written.
OUTPUTS_DIR = Path("outputs")


def load_agents():
    """Import every valid agent module from the agents/ folder."""
    agents = []

    # Look through all Python files in agents/
    for path in sorted(AGENTS_DIR.glob("*.py")):
        # Skip private helper files like __init__.py
        if path.name.startswith("_"):
            continue

        # Import the file as a Python module, e.g. agents.googl_stock
        module = importlib.import_module(f"agents.{path.stem}")

        # Only keep modules that define NAME and run()
        if hasattr(module, "NAME") and hasattr(module, "run"):
            agents.append(module)
        else:
            print(f"[skip] {path.name} (missing NAME or run)")

    return agents


def main():
    """Load all agents, run them, and save their outputs."""
    # Create the outputs/ folder if it doesn't exist yet.
    OUTPUTS_DIR.mkdir(exist_ok=True)

    # Run every agent we found.
    for agent in load_agents():
        print(f"[run]  {agent.NAME}")

        try:
            # Call the agent's run() function.
            output = agent.run()

            # Create a timestamped filename like:
            # outputs/weather-brief-2026-07-03_08-00-39.md
            timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            out_path = OUTPUTS_DIR / f"{agent.NAME}-{timestamp}.md"

            # Write the returned text to disk.
            out_path.write_text(output)

            print(f"[ok]   {agent.NAME} -> {out_path}")
        except Exception as e:
            # If one agent fails, log it and continue with the others.
            print(f"[fail] {agent.NAME}: {e}")


if __name__ == "__main__":
    main()
```

---

## Step 5: Add Three Real Agents

Here are three simple, read-only agents.

### Agent 1: GOOGL Stock Check

Save this as <VPIcon icon="fas fa-folder-open"/>`agents/`<VPIcon icon="fa-brands fa-python"/>`googl_stock.py`.

It fetches GOOGL's daily quote data, computes the change in Python, and asks the local model to turn that into a short summary.

```py :collapsed-lines title="agents/googl_stock.py"
import requests
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

NAME = "googl-stock"


def fetch_googl():
    url = "https://query1.finance.yahoo.com/v8/finance/chart/GOOGL?interval=1d&range=1d"
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
    r.raise_for_status()

    meta = r.json()["chart"]["result"][0]["meta"]
    price = meta["regularMarketPrice"]
    prev = meta["chartPreviousClose"]
    change = price - prev
    pct = (change / prev) * 100 if prev else 0

    return {
        "symbol": "GOOGL",
        "price": round(price, 2),
        "previous_close": round(prev, 2),
        "change": round(change, 2),
        "pct_change": round(pct, 2),
    }


def run():
    data = fetch_googl()

    agent = create_agent(
        model=ChatOllama(model="qwen3.5:4b", temperature=0),
        tools=[],
        system_prompt=(
            "You write short stock summaries. "
            "Given stock data, write 2 concise Markdown bullet points explaining "
            "the price move and whether it was an up or down day."
        ),
    )

    result = agent.invoke({
        "messages": [{"role": "user", "content": str(data)}]
    })

    return (
        "# GOOGL Daily Summary\n\n"
        f"{result['messages'][-1].content}\n\n"
        f"**Raw data:** `{data}`\n"
    )
```

### Agent 2: AI News Digest

Save this as <VPIcon icon="fas fa-folder-open"/>`agents/`<VPIcon icon="fa-brands fa-python"/>`ai_news.py`.

This agent uses Ollama's web search API to pull recent AI news results, then asks the local model to turn them into a short digest. The `OLLAMA_API_KEY`is the same one that is used for my [**Personal Web Research AI Agent**](/freecodecamp.org/build-a-personal-ai-web-research-agent-with-ollama-and-qwen.md) tutorial.

```py :collapsed-lines title="agents/ai_news.py"
import os
import requests
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

NAME = "ai-news"


def search_news():
    r = requests.post(
        "https://ollama.com/api/web_search",
        headers={"Authorization": f"Bearer {os.getenv('OLLAMA_API_KEY')}"},
        json={"query": "latest AI news", "max_results": 5},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()["results"]


def run():
    results = search_news()

    agent = create_agent(
        model=ChatOllama(model="qwen3.5:4b", temperature=0),
        tools=[],
        system_prompt=(
            "You write short AI news digests. "
            "Given search results, produce 3-5 Markdown bullet points. "
            "Each bullet should summarize one important story and end with its source URL."
        ),
    )

    result = agent.invoke({
        "messages": [{"role": "user", "content": str(results)}]
    })

    return f"# Daily AI News Digest\n\n{result['messages'][-1].content}\n"
```

### Agent 3: Weather Brief

Save this as <VPIcon icon="fas fa-folder-open"/>`agents/weather_brief.py`.

```py :collapsed-lines title="agents/weather_brief.py"
import requests
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

NAME = "weather-brief"


def fetch_weather():
    r = requests.get("https://wttr.in/New+York?format=j1", timeout=15)
    r.raise_for_status()

    current = r.json()["current_condition"][0]
    return {
        "temp_f": current["temp_F"],
        "feels_like_f": current["FeelsLikeF"],
        "humidity": current["humidity"],
        "wind_mph": current["windspeedMiles"],
        "description": current["weatherDesc"][0]["value"],
    }


def run():
    weather = fetch_weather()

    agent = create_agent(
        model=ChatOllama(model="qwen3.5:4b", temperature=0),
        tools=[],
        system_prompt=(
            "You write short weather briefs. "
            "Given current weather data, write 2 concise Markdown bullet points "
            "summarizing the conditions in plain English."
        ),
    )

    result = agent.invoke({
        "messages": [{"role": "user", "content": str(weather)}]
    })

    return f"# Daily Weather Brief\n\n{result['messages'][-1].content}\n"
```

---

## Step 6: Add Agent Scheduler to cron

The Agent Scheduler is designed to be triggered by your OS scheduler. Every time it runs, it executes all agents in the agents/ folder.

We need to use the full path to Python inside the virtual environment. Schedulers usually don't inherit your shell's `PATH`, so a bare `python` often won't work the way you expect.

:::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

On macOS, you can use either `launchd` or `cron`. `launchd` is the macOS-native scheduler, but for this tutorial, I'm using `cron` as it works for Linux as well.

Create a run_scheduler.sh script and put it alongside your code. Paste Ollama API key in placeholder.

```sh
#!/bin/bash

export OLLAMA_API_KEY="<key>"
cd /full/path/to/project
/full/path/to/project/venv/bin/python3 scheduler.py >> runner.log 2>&1
```

Make it executable by doing `chmod +x run_scheduler.sh` in the terminal. You can test it by doing `./run_scheduler.sh` in your terminal.

Open your crontab:

```sh
crontab -e
```

Add this line:

```sh
0 8 * * * /full/path/to/project/run_scheduler.sh
```

This runs the <VPIcon icon="fa-brands fa-python"/>`scheduler.py` every day at 8:00 AM. The <VPIcon icon="fas fa-file-lines"/>`runner.log` captures both normal output and errors.

::: tip One caveat

if your machine is asleep when the cron job is supposed to run, that invocation is usually just missed.

:::

@tab <VPIcon icon="fa-brands fa-windows"/> Windows with Task Scheduler

```powershell
schtasks /Create /SC DAILY /TN "AI Runner" /TR "C:\path\to\venv\Scripts\python.exe C:\path\to\scheduler.py" /ST 08:00
```

Set the working directory to your project folder in the task settings so <VPIcon icon="fas fa-folder-open"/>`agents/` and `outputs/` resolve correctly.

::::

---

## Sample Output

Run the scheduler manually first:

```sh
python scheduler.py
```

Here's what one run looks like:

```sh
python scheduler.py
#
# [run]  ai-news
# [ok]   ai-news -> outputs/ai-news-2026-07-05_17-52-12.md
# [run]  googl-stock
# [ok]   googl-stock -> outputs/googl-stock-2026-07-05_17-53-18.md
# [run]  weather-brief
# [ok]   weather-brief -> outputs/weather-brief-2026-07-05_17-53-54.md
```

The output is stored in <VPIcon icon="fas fa-folder-open"/>`outputs/` folder. The output from each agent is shown below:

```sh
ls
#
# ai-news-2026-07-05_17-52-12.md
# googl-stock-2026-07-05_17-53-18.md
# weather-brief-2026-07-05_17-53-54.md
cat googl-stock-2026-07-05_17-53-18.md 
#
# GOOGL Daily Summary
# 
# *   GOOGL closed at $359.91, down $1.30 (0.36%) from the previous close of $361.21.
# *   This marks a down day for the stock.
# 
# **Raw data:** `{'symbol': 'GOOGL', 'price': 359.91, 'previous_close': 361.21, 'change': -1.3, 'pct_change': -0.36}`
cat weather-brief-2026-07-05_17-53-54.md 
#
# Daily Weather Brief
#
# *   It's 77°F, feeling like 80°F.
# *   Partly cloudy with 9 mph winds.
cat ai-news-2026-07-05_17-52-12.md
#
# Daily AI News Digest
#
# *   After spooking the Trump administration into safety testing, Anthropic's Fable 5 and Mythos 5 models have received global release with export curbs lifted.
#     https://arstechnica.com/tech-policy/2026/07/after-spooking-trump-into-safety-testing-anthropic-ai-models-get-global-release/
# *   OpenAI has previewed three GPT-5.6 models (Sol, Terra, and Luna) with limited availability restricted to U.S. government-approved organizations.
#     https://www.deeplearning.ai/the-batch/gpt-5-6-lands-in-limbo
# ...
```

Before trusting the results, spot-check them. Smaller local models still hallucinate, and unattended agents amplify small mistakes because no one is there to catch them in real time.

To run it more frequently for testing, you can update the cron from `* 8 * * *` to `*/10 * * * *` so that it runs every 10 mins. Once you're satisfied with the setup and results, you can revert the cron to 8:00 AM everyday by setting it to `* 8 * * *`.

If you want to extend the setup, a few good next steps would be adding new agents, trying out different schedules, or setting up notifications when the agent scheduler finishes.

---

## Conclusion

In this tutorial, you built a small local AI agent scheduler that executes multiple agents from a folder. Each agent is just a Python file that calls an LLM and executes a task. The agent scheduler loads them, runs them, and writes the outputs to disk.

That gives you a nice workflow for lightweight local automation. Adding a new agent just involves dropping a file into <VPIcon icon="fas fa-folder-open"/>`agents/`, not editing scheduler config again. The model runs locally through Ollama, the outputs stay on your machine, and there aren't LLM API costs.

From here, you can add your own agents. Perhaps a summary of yesterday's Git commits or a tool to watch for new releases of a repo you care about. Anything that you'd want waiting for you in the morning but that you don't want to check yourself. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](https://darshshah.org/blog/) (recent posts include system design paper series), my work on my [<VPIcon icon="fas fa-globe"/>personal website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Schedule Local AI Assistants for Daily Tasks",
  "desc": "Most AI agents are reactive as they wait for us to ask something. In this tutorial, I'll show you how to build local AI assistants that run on a schedule, handle the tasks you care about, and generate",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-schedule-local-ai-assistants-for-daily-tasks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
