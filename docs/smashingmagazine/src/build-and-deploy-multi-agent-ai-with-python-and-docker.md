---
lang: en-US
title: "How to Build and Deploy a Multi-Agent AI System with Python and Docker"
description: "Article(s) > How to Build and Deploy a Multi-Agent AI System with Python and Docker"
icon: fa-brands fa-python
category:
  - Python
  - DevOps
  - Docker
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - docker
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
  - open-ai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy a Multi-Agent AI System with Python and Docker"
    - property: og:description
      content: "How to Build and Deploy a Multi-Agent AI System with Python and Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-multi-agent-ai-with-python-and-docker.html
prev: /programming/py/articles/README.md
date: 2026-02-24
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5fc16e412cae9c5b190b6cdd/6bd425e1-7427-4fe8-b1a7-80fff56102f7.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  name="How to Build and Deploy a Multi-Agent AI System with Python and Docker"
  desc="You wake up and open your laptop. Your browser has 27 tabs open, your inbox is overflowing with unread newsletters, and meeting notes are scattered across three apps. Sound familiar? Now imagine you h"
  url="https://freecodecamp.org/news/build-and-deploy-multi-agent-ai-with-python-and-docker"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5fc16e412cae9c5b190b6cdd/6bd425e1-7427-4fe8-b1a7-80fff56102f7.png"/>

You wake up and open your laptop. Your browser has 27 tabs open, your inbox is overflowing with unread newsletters, and meeting notes are scattered across three apps. Sound familiar?

Now imagine you had a team of specialized assistants that worked overnight — one to read your inputs, one to summarize the key facts, one to rank what matters most, and one to format everything into a clean daily brief waiting in your inbox.

That is exactly what this handbook walks you through building. You will create a multi-agent AI system where four Python-based agents each handle one job. You will containerize each agent with Docker so the whole thing runs reliably on any machine. And you will wire it all together with Docker Compose so you can launch the entire pipeline with a single command.

This handbook assumes you are comfortable reading Python code, but it does not assume you have used Docker before. If you have never written a Dockerfile or run a container, that is fine — the fundamentals are covered as we go.

By the end, you will have a working system that turns digital noise into an organized daily digest, and you will understand the patterns behind it well enough to adapt them to your own projects.

---

## What is a Multi-Agent System (and Why Build One)?

### How Traditional Scripts Work

A traditional Python script follows a fixed path. It reads some input, processes it through a series of hard-coded steps, and writes the output. If the input format changes even slightly, the script often breaks. Think of it like a train on a track. Trains are fast and efficient, but they can only go where the rails take them. If the track is blocked, the train stops.

### How AI Agents are Different

An AI agent is more like a bus driver. It has a destination (a goal), but it can decide which route to take based on current conditions (the data). If one road is blocked, it finds another.

Agents typically follow a loop called the **ReAct pattern**, which stands for Reasoning plus Acting. At each step, the agent thinks about what to do, takes an action, observes the result, and decides whether it has reached its goal. If not, it loops back and tries again. If so, it finishes.

In practice, this means an LLM-based agent can handle messy, unpredictable input much better than a traditional script. If a newsletter changes its format, the summarizer agent can still extract the key points because it reasons about the content rather than parsing a rigid structure.

### Why Use Multiple Agents Instead of One?

You might wonder: why not just use one powerful agent that does everything? That approach is called the "God Model" pattern, and it has real problems. When you ask a single LLM to ingest data, summarize it, prioritize it, and format it all in one prompt, you are giving it too much to think about at once. LLMs have a limited context window and limited attention. The more tasks you pile on, the more likely the model is to hallucinate, skip steps, or produce inconsistent output.

A multi-agent system solves this through **separation of concerns**. Each agent has one narrow job. The Ingestor reads and combines raw files, with no LLM needed. The Summarizer calls the LLM with a focused prompt: just summarize this text. The Prioritizer scores lines by keyword with no LLM needed. And the Formatter writes Markdown output, also with no LLM.

This design has several advantages. Each agent is simpler to build, test, and debug. You can swap out the Summarizer for a better model without touching anything else. And you can scale individual agents independently — for example, running multiple Summarizers in parallel if you have a lot of input.

---

## What is Docker (and Why Does It Matter Here)?

### The Environment Problem

If you have ever shared a Python project with someone and heard "it does not work on my machine," you already understand the problem Docker solves. Every Python project depends on specific versions of Python itself, plus libraries like `openai`, `requests`, or `beautifulsoup4`. These dependencies live in your operating system's environment. When you install a new library or upgrade Python, you might break a different project that depends on the old version.

Virtual environments help, but they only isolate Python packages. They do not isolate the operating system, system libraries, or other tools your code might need. And they do not guarantee that someone else can recreate your exact environment. For a multi-agent system, this problem gets worse. Each agent might need different dependencies. If they share an environment, their dependencies can conflict.

### How Docker Solves This

Docker packages your code, its dependencies, and a minimal operating system into a single unit called a **container**. When you run that container, it behaves exactly the same way regardless of what machine it is running on — your laptop, a coworker's computer, or a cloud server. Think of a Docker container like a shipping container for software. The contents are sealed inside, protected from the outside environment.

There are a few key Docker concepts to understand:

**Image** — A read-only template that contains your code, dependencies, and a minimal OS. You build an image from a Dockerfile. Think of it as a recipe.

**Container** — A running instance of an image. When you "run" an image, Docker creates a container from it. Think of it as a dish made from the recipe.

**Dockerfile** — A text file with instructions for building an image. It specifies the base OS, what to install, what code to copy in, and what command to run when the container starts.

**Volume** — A way to share files between your computer and a container, or between multiple containers. Our agents will use a shared volume to pass data to each other.

**Docker Compose** — A tool for defining and running multiple containers together. You describe all your containers in a single YAML file, and Compose handles building, networking, and ordering them.

### How Docker Layers Work

Docker builds images in layers. Each instruction in a Dockerfile creates a new layer. Docker caches these layers, so if a layer has not changed since the last build, Docker reuses the cached version instead of rebuilding it. This is why Dockerfiles are structured in a specific order: the base OS layer rarely changes, the dependency installation layer changes when <VPIcon icon="fas fa-file-lines"/>`requirements.txt` changes, and the application code layer changes on every code edit. By putting dependency installation before the code copy, Docker only re-runs `pip install` when your requirements actually change, making rebuilds much faster — seconds instead of minutes.

### Docker vs. No Docker

To be clear, you do not strictly need Docker for this tutorial. You can run all four agents as plain Python scripts. But without Docker you face dependency conflicts from a shared environment, manual process management for scaling, having to redo all setup on every new machine, complex orchestration for testing, and painful Python version management when one agent needs 3.8 and another needs 3.10. With Docker, each agent has its own isolated environment, you run multiple containers in parallel with one command, `docker compose up` produces identical results everywhere, and each container runs its own Python version independently.

For a personal project, either approach works. But if you ever want to share this system, deploy it to a server, or run it in the cloud, Docker makes the difference between "here is a README with 15 setup steps" and "run `docker compose up`."

---

## How to Plan the Architecture

Before writing any code, it is worth mapping out how the pieces fit together. The full system consists of four agents arranged in a sequential pipeline, all orchestrated by Docker Compose. Data flows through the Ingestor Agent, the Summarizer Agent, the Prioritizer Agent, and the Formatter Agent in that order. Each agent reads from a shared volume, processes its input, writes the result, and exits. Docker Compose enforces execution order by waiting for each container to finish successfully before starting the next one.

This is a synchronous pipeline: agents run one at a time, in sequence. It is the simplest multi-agent pattern to implement and understand. For more complex systems, you could replace the shared volume with a message broker like Redis or RabbitMQ, which lets agents run asynchronously and react to events. But for this daily-digest use case, the sequential approach is exactly right.

In terms of responsibilities:

- **Ingestor** — Reads and combines raw files from <VPIcon icon="fas fa-folder-open"/>`/data/input/` into <VPIcon icon="fas fa-file-lines"/>`ingested.txt`. No LLM required.
- **Summarizer** — Distills key points from <VPIcon icon="fas fa-file-lines"/>`ingested.txt` into <VPIcon icon="fas fa-file-lines"/>`summary.txt`. The only agent that requires an LLM.
- **Prioritizer** — Scores items by urgency keywords, turning <VPIcon icon="fas fa-file-lines"/>`summary.txt` into <VPIcon icon="fas fa-file-lines"/>`prioritized.txt`. No LLM.
- **Formatter** — Produces the final Markdown report, <VPIcon icon="fa-brands fa-markdown"/>`daily_digest.md`. No LLM.

Notice that only one of the four agents actually calls an LLM. The others are plain Python. This is intentional — you should only use an LLM when you need reasoning or language understanding. Everything else should be deterministic code. It is cheaper, faster, and more predictable.

---

## Prerequisites and Environment Setup

You need the following tools installed before starting:

- **Python** 3.10 or higher — the language for the agents
- **Docker Desktop** (Engine 20.10+) — the container runtime
- **Docker Compose** v2 (included with Docker Desktop) — multi-container orchestration
- **Git** 2.30+ — version control
- **OpenAI Python SDK** (`openai >= 1.0`) — LLM API access
- **Redis or RabbitMQ** (optional) — async message queuing
- **PostgreSQL** (optional) — persistent data storage

### How to Install Python

Download Python from [<VPIcon icon="fa-brands fa-python"/>python.org](https://python.org/). On Windows, check the "Add Python to PATH" box during installation. On macOS, you can use Homebrew:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install python@3.12
```

@tab <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>

```sh
sudo apt update && sudo apt install python3 python3-pip
```

:::

### How to Install Docker

Docker Desktop is the easiest way to get started on Windows and macOS. Download it from [<VPIcon icon="fa-brands fa-docker"/>docker.com](https://docker.com/) and follow the prompts. On Windows, Docker Desktop requires WSL2 — the installer will guide you through enabling it. On Linux, install Docker Engine directly:

```sh
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose-v2
sudo usermod -aG docker $USER  # So you don't need sudo for docker commands
```

After installing, log out and back in for the group change to take effect.

### How to Verify Your Setup

Open your terminal and run these commands. Each should print a version number without errors:

```sh
python --version        # Should show 3.10 or higher
docker --version        # Should show 20.10 or higher
docker compose version  # Should show v2.x
git --version           # Should show 2.30 or higher
```

If any command fails, go back to the installation step for that tool. The most common issue is that the command is not in your PATH.

---

## How to Set Up the Project Structure

Each agent lives in its own directory with its own code, Dockerfile, and requirements file. This isolation means you can build, test, and update each agent independently. Create the following structure:

```sh :collapsed-lines title="file structure"
multi-agent-digest/
├── agents/
│   ├── ingestor/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── summarizer/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── prioritizer/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── formatter/
│       ├── app.py
│       ├── Dockerfile
│       └── requirements.txt
├── data/
│   └── input/          # Your raw files go here
├── output/              # The final digest appears here
├── tests/               # Unit and integration tests
├── .env                 # API keys (gitignored!)
├── .gitignore
├── docker-compose.yml
└── README.md
```

You can create the folders quickly from the terminal:

```sh
mkdir -p multi-agent-digest/agents/{ingestor,summarizer,prioritizer,formatter}
mkdir -p multi-agent-digest/{data/input,output,tests}
cd multi-agent-digest
```

---

## How to Build Each Agent Step by Step

Every agent follows the same simple pattern: read an input file from the shared volume, do its job, and write an output file. This consistency makes the system easy to understand and extend.

### The Ingestor Agent

The Ingestor is the entry point of the pipeline. Its job is to read all text files from the input folder and combine them into a single file that the Summarizer can process. This is the simplest agent — no external libraries, no API calls, just file reading and writing.

```py :collapsed-lines title="agents/ingestor/app.py"
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("ingestor")

INPUT_DIR = "/data/input"
OUTPUT_FILE = "/data/ingested.txt"

def ingest():
    content = ""
    files_processed = 0
    for filename in sorted(os.listdir(INPUT_DIR)):
        filepath = os.path.join(INPUT_DIR, filename)
        if os.path.isfile(filepath):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content += f"\n--- {filename} ---\n"
                    content += f.read()
                    content += "\n"
                    files_processed += 1
            except Exception as e:
                logger.error(f"Failed to read {filename}: {e}")

    if files_processed == 0:
        logger.warning("No input files found in /data/input/")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        out.write(content)
    logger.info(f"Ingested {files_processed} files -> {OUTPUT_FILE}")

if __name__ == "__main__":
    ingest()
```

The `logging.basicConfig` block sets up structured logging. Every agent uses the same log format, so when Docker Compose runs them together, you get a clean, consistent timeline. The `sorted(os.listdir())` call ensures files are processed in alphabetical order — without it, the order depends on the filesystem and can vary between machines. The `try/except` block around each file read means a single corrupted file will not crash the entire pipeline. And if no files are found at all, the agent writes an empty output file rather than crashing, so downstream agents can handle empty input gracefully.

```dockerfile title="agents/ingestor/Dockerfile"
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
CMD ["python", "app.py"]
```

`FROM python:3.10-slim` starts with a minimal Linux image that has Python pre-installed. The `-slim` variant is about 120 MB versus 900 MB for the full image. `WORKDIR /app` sets the working directory inside the container. `COPY requirements.txt` and `RUN pip install` handle dependencies at build time, not runtime. `COPY app.py` copies the application code last because it changes most often, and Docker caches previous layers. `CMD` specifies the command to run when the container starts.

Since the Ingestor uses only standard library modules, its <VPIcon icon="fas fa-file-lines"/>`requirements.txt` can be empty:

```plaintext title="requirements.txt"
# No external dependencies needed
```

### The Summarizer Agent

The Summarizer is the most complex agent in the pipeline. It reads the ingested text and calls an LLM API to produce a concise summary. This is the only agent that makes a network call, which means it is the only one that can fail due to external factors: the API might be down, you might hit rate limits, or your key might be invalid.

```py :collapsed-lines title="agents/summarizer/app.py"
import os
import logging
import time
from openai import OpenAI, RateLimitError, APIError

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("summarizer")

INPUT_FILE = "/data/ingested.txt"
OUTPUT_FILE = "/data/summary.txt"

client = OpenAI()  # reads OPENAI_API_KEY from environment

SYSTEM_PROMPT = (
    "You are a helpful assistant that summarizes long text "
    "into key bullet points. Each bullet should be one "
    "concise sentence capturing a core insight."
)

MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

def summarize(text, retries=MAX_RETRIES):
    """Call the LLM API with retry logic for rate limits."""
    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": text[:8000]}
                ],
                max_tokens=1000,
                temperature=0.3,
            )
            return response.choices[0].message.content
        except RateLimitError:
            wait = RETRY_DELAY * (attempt + 1)
            logger.warning(f"Rate limited. Retrying in {wait}s...")
            time.sleep(wait)
        except APIError as e:
            logger.error(f"API error: {e}")
            raise
    raise RuntimeError("Max retries exceeded for LLM API call")

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        raw_text = f.read()

    if not raw_text.strip():
        logger.warning("Empty input. Writing fallback summary.")
        summary = "No content to summarize."
    else:
        try:
            summary = summarize(raw_text)
        except Exception as e:
            logger.error(f"Summarization failed: {e}")
            summary = f"Summarization failed: {e}"

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(summary)
    logger.info(f"Summary written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
```

The `OpenAI()` client automatically reads the `OPENAI_API_KEY` environment variable — you do not need to pass the key explicitly in code, which is both cleaner and safer. The `text[:8000]` slice limits how much text is sent to the API. Sending fewer tokens means faster responses and lower cost. For production, you would want smarter chunking that splits on sentence or paragraph boundaries rather than a raw character count.

**Temperature 0.3** makes the output more focused and deterministic, which is ideal for summarization. The retry logic catches `RateLimitError` specifically and waits longer each time (5, 10, then 15 seconds) — this is called **exponential backoff**. Other API errors raise immediately because retrying them will not help. If the input is empty or the API fails completely, the agent writes a fallback message instead of crashing, so the downstream agents can still run.

`agents/summarizer/requirements.txt`:

```plaintext
openai>=1.0
```

The Dockerfile is identical to the Ingestor's.

### The Prioritizer Agent

The Prioritizer takes the LLM-generated summary and scores each line based on urgency keywords. This is a rule-based agent — no LLM call needed. It is fast, deterministic, and free.

```py :collapsed-lines title="agents/prioritizer/app.py"
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("prioritizer")

INPUT_FILE = "/data/summary.txt"
OUTPUT_FILE = "/data/prioritized.txt"

PRIORITY_KEYWORDS = [
    "urgent", "today", "asap", "important",
    "deadline", "critical", "action required"
]

def score_line(line):
    """Count how many priority keywords appear in a line."""
    lower = line.lower()
    return sum(1 for kw in PRIORITY_KEYWORDS if kw in lower)

def prioritize():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    scored = [(line, score_line(line)) for line in lines]
    scored.sort(key=lambda x: x[1], reverse=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        for line, score in scored:
            out.write(f"[{score}] {line}\n")

    logger.info(f"Prioritized {len(scored)} items -> {OUTPUT_FILE}")

if __name__ == "__main__":
    prioritize()
```

The scoring function counts how many priority keywords appear in each line. A line containing "urgent deadline" scores 2, and a line with no keywords scores 0. The scored lines are sorted in descending order, so the most urgent items appear first. Each line is prefixed with its score in brackets, like `[2] Urgent: quarterly report due today`. In a more advanced system, you could replace this keyword scorer with an LLM-based ranker, but for a daily digest, simple keyword matching works surprisingly well.

This agent has no pip dependencies, so the Dockerfile skips the requirements step:

```dockerfile title="agents/prioritizer/Dockerfile"
FROM python:3.10-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

### The Formatter Agent

The Formatter is the final agent in the pipeline. It reads the scored lines and writes a clean Markdown document to the output directory.

```py :collapsed-lines title="agents/formatter/app.py"
import os
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("formatter")

INPUT_FILE = "/data/prioritized.txt"
OUTPUT_FILE = "/output/daily_digest.md"

def format_to_markdown():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    today = datetime.now().strftime('%Y-%m-%d')

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        out.write("# Your Daily AI Digest\n\n")
        out.write(f"**Date:** {today}\n\n")
        out.write("## Top Insights\n\n")
        for line in lines:
            if '] ' in line:
                score = line.split(']')[0][1:]
                content = line.split('] ', 1)[1]
                out.write(f"- **Priority {score}**: {content}\n")
            else:
                out.write(f"- {line}\n")

    logger.info(f"Digest written to {OUTPUT_FILE}")

if __name__ == "__main__":
    format_to_markdown()
```

Notice that the Formatter writes to `/output` instead of `/data`. This is a separate volume mount in Docker Compose. The `/data` volume is internal plumbing that agents use to communicate, while the `/output` volume maps to a folder on your host machine where you can access the final result. The `split('] ', 1)` with `maxsplit=1` ensures that bracket characters inside the actual content do not break the parsing.

The Dockerfile is the same as the Prioritizer's (no external dependencies).

---

## How to Handle Secrets and API Keys

::: warning

Never commit API keys or secrets to version control. A leaked OpenAI key can rack up thousands of dollars in charges before you notice.

:::

### Using .env Files for Development

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in your project root:

```sh title=".env"
# .env -- DO NOT COMMIT THIS FILE
OPENAI_API_KEY=sk-your-key-here
```

Then immediately add it to your <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```plaintext title=".gitignore"
# .gitignore
.env
output/
data/ingested.txt
data/summary.txt
data/prioritized.txt
__pycache__/
*.pyc
```

Docker Compose reads <VPIcon icon="iconfont icon-dotenv"/>`.env` files automatically when it starts. In your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`, you reference the variable with `${OPENAI_API_KEY}`, and Compose substitutes the real value at runtime. The key never appears in your Dockerfile, your code, or your version history.

### How to Use Docker Secrets for Production

For production deployments on Docker Swarm or Kubernetes, environment variables are visible in process listings and inspect commands. Docker secrets are more secure:

```sh
# Create the secret
echo "sk-your-key-here" | docker secret create openai_key -
```

```yaml title="docker-compose.yml"
# Reference in docker-compose.yml (Swarm mode only)
services:
  summarizer:
    secrets:
      - openai_key

secrets:
  openai_key:
    external: true
```

The secret gets mounted as a read-only file at <VPIcon icon="fas fa-folder-open"/>`/run/secrets/openai_key` inside the container. Your code reads the key from that file instead of from an environment variable.

---

## How to Orchestrate Everything with Docker Compose

With all four agents built, Docker Compose ties them together. It builds each container, mounts the shared volumes, passes environment variables, and enforces the correct execution order.

```yaml :collapsed-lines title="docker-compose.yml"
version: "3.9"

services:
  ingestor:
    build: ./agents/ingestor
    container_name: agent_ingestor
    volumes:
      - ./data:/data
    restart: "no"

  summarizer:
    build: ./agents/summarizer
    container_name: agent_summarizer
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      ingestor:
        condition: service_completed_successfully
    volumes:
      - ./data:/data
    deploy:
      resources:
        limits:
          memory: 512M
    restart: "no"

  prioritizer:
    build: ./agents/prioritizer
    container_name: agent_prioritizer
    depends_on:
      summarizer:
        condition: service_completed_successfully
    volumes:
      - ./data:/data
    restart: "no"

  formatter:
    build: ./agents/formatter
    container_name: agent_formatter
    depends_on:
      prioritizer:
        condition: service_completed_successfully
    volumes:
      - ./data:/data
      - ./output:/output
    restart: "no"
```

The `depends_on` with `condition: service_completed_successfully` is the key to the sequential pipeline. This setting (available in Compose v2) tells Docker to wait until the previous container exits with a zero exit code before starting the next one. Without this condition, `depends_on` only waits for the container to *start*, not to *finish* — which would cause race conditions where the Summarizer tries to read a file the Ingestor has not written yet.

The **volume mounts** (`./data:/data`) map your local data folder into each container. All agents share this volume, which is how they pass files to each other. The Formatter also gets `./output:/output` so the final digest lands on your host machine. The **memory limit** of 512M on the Summarizer prevents it from consuming too much RAM. And `restart: "no"` ensures Docker does not restart the agents after they finish, since they are batch jobs.

### How to Run the Pipeline

```sh
docker compose up --build
```

The `--build` flag tells Compose to rebuild the images before running. You will see structured logs from each agent in sequence:

```plaintext
agent_ingestor    | 2025-01-20 07:00:01 [INFO] ingestor: Ingested 3 files
agent_summarizer  | 2025-01-20 07:00:04 [INFO] summarizer: Summary written
agent_prioritizer | 2025-01-20 07:00:05 [INFO] prioritizer: Prioritized 8 items
agent_formatter   | 2025-01-20 07:00:05 [INFO] formatter: Digest written
```

When all four containers finish, open <VPIcon icon="fas fa-folder-open"/>`output/`<VPIcon icon="fa-brands fa-markdown"/>`daily_digest.md` to see your morning brief.

---

## How to Test the Pipeline

### Unit Tests

Because each agent's core logic is a plain Python function, you can test it in isolation without Docker.

```py title="tests/test_prioritizer.py"
import sys
sys.path.insert(0, 'agents/prioritizer')
from app import score_line

def test_urgent_keyword_scores_one():
    assert score_line("This is urgent") == 1

def test_multiple_keywords_stack():
    assert score_line("Urgent and important deadline") == 3

def test_no_keywords_scores_zero():
    assert score_line("Regular project update") == 0

def test_scoring_is_case_insensitive():
    assert score_line("URGENT DEADLINE ASAP") == 3
```

Run the tests with pytest:

```sh
pip install pytest
python -m pytest tests/ -v
```

Writing tests for each agent's core function means you can catch bugs before you build any Docker images, saving a lot of time compared to debugging inside running containers.

### Integration Tests

To test the full pipeline end-to-end, create known input files and verify the expected output:

```sh
# Create test data
mkdir -p data/input
echo "Urgent: quarterly report due today" > data/input/test.txt
echo "Regular standup notes, no blockers" >> data/input/test.txt

# Run the pipeline
docker compose up --build

# Verify the output exists and contains expected content
test -f output/daily_digest.md && echo "File exists: PASS" || echo "File missing: FAIL"
grep -q "Priority" output/daily_digest.md && echo "Content check: PASS" || echo "Content check: FAIL"
```

---

## How to Add Logging and Observability

Every agent uses Python's `logging` module with a consistent format. When Docker Compose runs all four containers, it interleaves their logs with container name prefixes, giving you a unified timeline of the entire pipeline.

For production systems, consider switching to JSON-formatted logs. They are easier to parse with log aggregation tools like the ELK Stack, Grafana Loki, or AWS CloudWatch:

```py
import json
import logging

class JSONFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "agent": record.name,
            "message": record.getMessage(),
        })
```

To use this formatter, replace the `basicConfig` call with a handler:

```py
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger = logging.getLogger("summarizer")
logger.addHandler(handler)
logger.setLevel(logging.INFO)
```

The most useful metrics to track include the number of files ingested per run, Summarizer latency (time from API call to response), LLM token usage for cost tracking, the number of errors and retries per agent, and whether <VPIcon icon="fa-brands fa-markdown"/>`daily_digest.md` was successfully generated. A simple approach for personal use is to write a JSON metrics file alongside the digest in the output directory. For team or production use, consider adding Prometheus metrics or sending data to a monitoring service.

---

## Cost, Rate Limits, and Graceful Degradation

The Summarizer is the only agent that calls a paid API. Here is what you can expect to pay:

| **Model** | **Input Cost** | **Output Cost** | **Cost per Daily Run** |
| :--- | :--- | :--- | :--- |
| `gpt-4o-mini` | \(0.15 / 1M tokens | \)0.60 / 1M tokens | Less than \(0.01 |
| `gpt-4o` | \)2.50 / 1M tokens | \(10.00 / 1M tokens | \)0.02 to \(0.10 |
| Local model (Ollama) | Free (uses your hardware) | Free | \)0.00 |

For a daily personal digest processing a few thousand tokens of input, `gpt-4o-mini` costs less than a penny per run. That works out to roughly three dollars per year.

To protect against unexpected bills, set a monthly spending cap in your OpenAI dashboard. You can also set per-minute rate limits to prevent runaway usage if a bug causes repeated API calls.

Beyond the retry logic already built into the Summarizer, you can cache LLM responses so that if the same input text appears again you reuse the previous summary instead of calling the API. Use the cheapest model that gives acceptable results — for summarization, `gpt-4o-mini` usually works as well as `gpt-4o` at a fraction of the cost. And batch requests when possible by combining many small texts into one API call.

The Summarizer already writes a fallback message when the API fails. This is the most important form of graceful degradation: the pipeline keeps running, and you get a less useful digest instead of nothing at all. If the digest is critical for your workflow, add an alerting step — for example, you could extend the Formatter to send a Slack notification when the Summarizer falls back.

---

## Security and Privacy Considerations

When you feed personal data emails, meeting notes, private newsletters into an LLM, you need to think carefully about where that data goes.

Text you send to OpenAI or similar providers leaves your machine and is processed on their servers. As of early 2025, OpenAI's API does not use submitted data for model training by default, but policies can change. Always check your provider's current data retention and usage policies. If your input contains personally identifiable information like names, email addresses, or phone numbers, consider stripping it before calling the API, or use a local model.

The intermediate files created during the pipeline (<VPIcon icon="fas fa-file-lines"/>`ingested.txt`, <VPIcon icon="fas fa-file-lines"/>`summary.txt`, <VPIcon icon="fas fa-file-lines"/>`prioritized.txt`) contain processed versions of your raw input. For personal use, keep them for debugging and delete manually. For automated pipelines, add a cleanup step that deletes intermediate files after the digest is generated. If you operate in the EU, review GDPR requirements around data minimization, right to deletion, and records of processing.

To secure your containers, use minimal base images like `python:3.10-slim` to reduce the attack surface, run containers as a non-root user by adding a `USER` directive to your Dockerfiles, update base images regularly (at least monthly) to pick up security patches, and scan your images for vulnerabilities using `docker scout` or Trivy.

---

## How to Use a Local LLM for Full Privacy (Ollama)

If you want to keep all data on your machine and avoid sending anything to external APIs, you can swap the OpenAI API for a local model running through **Ollama**. Ollama lets you run open-source LLMs locally, handling model weight downloads, memory management, and serving an API.

To set up Ollama:

```sh
# Install Ollama (macOS or Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model (llama3 is a good general-purpose choice)
ollama pull llama3

# Verify it is running
ollama list
```

Replace the OpenAI API call in the Summarizer with a request to Ollama's local API:

```py
import requests

def summarize_locally(text):
    """Call a local Ollama instance from inside a Docker container."""
    url = "http://host.docker.internal:11434/api/generate"
    payload = {
        "model": "llama3",
        "prompt": (
            "Summarize the following text into key "
            f"bullet points:\n\n{text}"
        ),
        "stream": False
    }
    try:
        resp = requests.post(url, json=payload, timeout=120)
        resp.raise_for_status()
        return resp.json().get('response', 'No response')
    except requests.exceptions.RequestException as e:
        return f"Ollama error: {e}"
```

The `host.docker.internal` hostname lets a container communicate with services running on the host machine. Ollama runs on your host (not inside a container), so this is how the Summarizer reaches it.

::: note

On Linux, `host.docker.internal` may not resolve by default. Add this to your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` under the summarizer service: `extra_hosts: ["host.docker.internal:host-gateway"]`

:::

Local models are slower than cloud APIs and require decent hardware (at least 8 GB of RAM for smaller models, 16 GB or more for larger ones). But they are free, fully private, and work without an internet connection.

---

## Example Seed Data and Expected Output

To test the full pipeline without real newsletters, create these sample input files:

```plaintext title="data/input/newsletter_ai.txt"
AI Weekly Roundup - January 2025
OpenAI released a new reasoning model this week.
URGENT: New EU AI Act regulations take effect in March.
Google announced updates to their Gemini model family.
A startup raised $50M for AI-powered code review tools.
```

```plaintext title="data/input/meeting_notes.txt"
Team Standup Notes - Monday
IMPORTANT: Deadline for Q1 report is this Friday.
Action required: Review the updated API documentation.
Sprint velocity is on track. No blockers reported.
```

Expected output in <VPIcon icon="fas fa-folder-open"/>`output/`<VPIcon icon="fa-brands fa-markdown"/>`daily_digest.md`:

```md title="output/daily_digest.md"
# Your Daily AI Digest

**Date:** 2025-01-20

---

## Top Insights

- **Priority 3**: IMPORTANT: Deadline for Q1 report due Friday
- **Priority 2**: URGENT: New EU AI Act regulations in March
- **Priority 1**: Action required: Review the updated API docs
- **Priority 0**: OpenAI released a new reasoning model
- **Priority 0**: Sprint velocity is on track
```

The exact summary text will vary depending on your LLM model and settings, but the structure and priority ordering should remain consistent.

---

## How to Automate Daily Execution

Now that the pipeline works end-to-end with a single command, you can schedule it to run automatically every morning.

### How to Use Cron on Linux or macOS

Open your crontab with `crontab -e` and add this line to run the pipeline every day at 7:00 AM:

```sh
0 7 * * * cd /path/to/multi-agent-digest && docker compose up --build >> cron.log 2>&1
```

The `>> cron.log 2>&1` part redirects all output (including errors) to a log file so you can check it later. Make sure your machine is running at the scheduled time and Docker Desktop is started.

### How to Use Task Scheduler on Windows

Open Task Scheduler and create a new task. Under "Actions," set the program to:

```sh
wsl -e bash -c 'cd /mnt/c/path/to/multi-agent-digest && docker compose up --build'
```

Set the trigger to fire every morning at your preferred time.

### How to Add Delivery Notifications

For the digest to be truly useful, you want it delivered to you rather than sitting in a folder. Here are three options:

**Email** — Extend the Formatter to send the digest via Python's `smtplib` module. You will need SMTP credentials for a service like Gmail, SendGrid, or Amazon SES.

**Slack** — Create an incoming webhook in your Slack workspace and POST the digest as a message. This takes about 10 lines of code.

**Notion or Obsidian** — Use their APIs to create a new page or note with the digest content each morning.

---

## Troubleshooting Common Errors

**Container exits with OOM error** — Large files or LLM processing are exceeding memory. Increase the memory limit in <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` under `deploy > resources > limits > memory`. Try `1G`.

**Rate limit errors from OpenAI** — The retry logic handles temporary rate limits automatically. Check your OpenAI dashboard for usage caps.

`depends_on` **does not wait for completion** — Make sure you are using `condition: service_completed_successfully`, which requires Docker Compose v2. **Permission denied on** `/output` — Volume mount permissions mismatch. Run `chmod -R 777 ./output` on the host, or add a `USER` directive to your Dockerfiles.

`OPENAI_API_KEY` **not found** — The <VPIcon icon="iconfont icon-dotenv"/>`.env` file may be missing or not in the right directory. Create <VPIcon icon="iconfont icon-dotenv"/>`.env` in the same folder as <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` and verify with `docker compose config`.

**Cannot reach Ollama from container** — `host.docker.internal` may not be resolving on Linux. Add `extra_hosts: ["host.docker.internal:host-gateway"]` to the service in <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`.

---

## Production Deployment Options

The `docker compose up` approach works well for personal use and development. When you are ready to deploy to a server or the cloud, here are your main options.

### Docker Swarm

Docker Swarm is the simplest step up from Compose. It lets you deploy across multiple machines with minimal changes to your existing Compose file:

```sh
docker swarm init
docker stack deploy -c docker-compose.yml morning-brief
```

### Kubernetes

For production at scale, Kubernetes gives you more control over scheduling, scaling, and fault tolerance. Use Kubernetes **Jobs** (not Deployments) for batch agents that run once and exit. Set resource requests and limits on each container so the cluster scheduler can allocate resources efficiently. Store API keys in **Kubernetes Secrets**, and use **CronJobs** for scheduled daily execution — they work like cron but are managed by the cluster.

### Cloud Platforms

All major cloud providers offer managed container services that can run this pipeline:

**AWS** — ECS Fargate with scheduled tasks for serverless execution, or EKS for managed Kubernetes.

**Azure** — Azure Container Instances for simple runs, or AKS for managed Kubernetes.

**GCP** — Cloud Run Jobs for serverless batch processing, or GKE for managed Kubernetes.

---

## Conclusion and Next Steps

In this handbook, you built a multi-agent AI system from scratch. You created four specialized Python agents, containerized each one with Docker, orchestrated them with Docker Compose, and added secrets handling, structured logging, retry logic, and graceful fallbacks.

The core patterns you learned — separation of concerns, containerized agents, shared-volume communication, and defensive coding against external APIs — apply far beyond this specific use case. Any time you need a reliable, modular, and reproducible AI workflow, these patterns are a solid foundation.

Here are some directions to explore next:

**Agent collaboration frameworks** — Tools like CrewAI and LangGraph let you build agents that delegate tasks to each other, negotiate priorities, and collaborate in more sophisticated ways.

**Local and fine-tuned models** — Experiment with Ollama or vLLM to run models locally. Fine-tune a small model specifically for summarization to get better results at lower cost.

**Event-driven architectures** — Replace the shared volume with Redis or RabbitMQ so agents react to events in real time rather than running on a schedule.

**Feedback loops** — Add an agent that evaluates the quality of the daily digest and adjusts the Summarizer's prompts over time. This is how production agent systems learn and improve.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy a Multi-Agent AI System with Python and Docker",
  "desc": "You wake up and open your laptop. Your browser has 27 tabs open, your inbox is overflowing with unread newsletters, and meeting notes are scattered across three apps. Sound familiar? Now imagine you h",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-multi-agent-ai-with-python-and-docker.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
