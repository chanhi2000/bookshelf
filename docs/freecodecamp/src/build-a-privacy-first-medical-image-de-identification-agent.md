---
lang: en-US
title: "How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP"
description: "Article(s) > How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP"
icon: 
category:
  - Python
  - AI
  - LLM
  - Anthropic
  - Claude
  - MCP
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
  - anthropic
  - claude
  - mcp
  - model-context-protocols

head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP"
    - property: og:description
      content: "How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-privacy-first-medical-image-de-identification-agent.html
prev: /programming/py/articles/README.md
date: 2026-08-06
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/93b0e883-87c6-4e07-97ca-4024da3e45e3.png
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
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP"
  desc="Imagine asking an AI assistant to de-identify thousands of medical images. It runs the pipeline, tracks progress, summarizes every decision, and tells you which files need human review, all without ev"
  url="https://freecodecamp.org/news/build-a-privacy-first-medical-image-de-identification-agent"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/93b0e883-87c6-4e07-97ca-4024da3e45e3.png"/>

Imagine asking an AI assistant to de-identify thousands of medical images. It runs the pipeline, tracks progress, summarizes every decision, and tells you which files need human review, all without ever seeing a single pixel of patient data.

That sounds impossible at first. AI assistants typically need access to the data they are helping you process.

In this tutorial, you'll build an AI agent that doesn’t inspect sensitive medical images. Instead, it orchestrates a local de-identification pipeline through carefully designed tools, keeping the patient data entirely on your machine.

The technology that makes this possible is the Model Context Protocol (MCP), an open standard that lets AI models call external tools instead of relying only on their built-in capabilities.

In my previous article, [**How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research**](/freecodecamp.org/build-ai-image-de-identification-for-clinical-research.md), we already saw how to build the de-identification tool - **_Aegis_**, an open-source tool built using a MONAI (PyTorch) pipeline that removes PHI from both DICOM metadata and image pixels using OCR and NER.

I have since extended it with local MCP (Model Context Protocol) server support, and in this article we'll build that server from scratch with FastMCP. Then we'll connect it to Claude Desktop, turning Claude into an AI agent that can run, monitor, and audit de-identification jobs through natural conversation.

One note before we start: while Aegis is the example throughout, the pattern in this tutorial applies to any Python tool you want to give an AI agent access to. If you have your own pipeline, CLI, or library, you can follow along and wrap that instead.

::: info What You'll Build

By the end of this tutorial, you'll have:

- A local MCP server that exposes the Aegis de-identification pipeline as six tools.
- Claude Desktop connected to that server, with human-in-the-loop approval for each action.
- An agent you can talk to in plain English: *"De-identify this folder and tell me if anything needs manual review."*
- A verifiable audit trail on disk that you can check against everything the agent reports.

:::

::: note Prerequisites

To follow this tutorial, you should have:

- Intermediate Python experience
- The Aegis repository (or your own Python tool to wrap): [<VPIcon icon="iconfont icon-github"/>`lakshmi-mahabaleshwara/aegis`](https://github.com/lakshmi-mahabaleshwara/aegis)
- Python 3.10 or later
- Claude Desktop installed (macOS or Windows); a free Claude account works for local MCP servers
- Node.js (only used for a testing tool, not for the server itself)

We'll use:

- The MCP Python SDK (`mcp`)
- FastMCP (included in the SDK)
- MCP Inspector for testing
- Claude Desktop as the MCP host

:::

If you haven't read the previous article, you don't need to rebuild the pipeline from scratch. Cloning the Aegis repository is enough, but the earlier article explains what the pipeline is actually doing under the hood.

---

## What Aegis Does

Aegis is a medical image de-identification pipeline that removes PHI from DICOM metadata and image pixels, records every action in audit reports, and routes uncertain cases for manual review.

---

## How to Set Up Aegis

Before we build the server, get Aegis installed. The server we write in the next step imports this package, so this has to be in place first.

```sh
# Get the code
git clone https://github.com/lakshmi-mahabaleshwara/aegis.git
cd aegis

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate
# On Windows: venv\Scripts\activate

# Install Aegis (editable) plus the MCP server in one step.
# The [mcp] pulls in the MCP SDK; it also installs the
# `aegis-mcp` console command you'll point Claude Desktop at.
pip install -e ".[mcp]"

# One-time: download the OCR and NER model weights
python scripts/prefetch_models.py
```

The editable install (`pip install -e`) makes the `monai_aegis` package importable from any directory and puts the `aegis-mcp` console command on your PATH (inside the venv). The MCP server depends on this, because Claude Desktop launches it from its own working directory, not from the repository root.

With the package installed, we can start building the server that exposes it.

---

## What Is MCP, and Why Use It?

The Model Context Protocol (MCP) is an open standard that lets AI applications call external tools. Instead of trying to solve everything from the information already in its context, an AI model can invoke functions exposed by an external program.

Three roles are involved:

- Host – the AI application (Claude Desktop in our case)
- Server – a small program you write that exposes tools
- Tools – Python functions with names, parameters, and descriptions that the AI can call

When Claude Desktop starts, it launches your MCP server and discovers the tools it exposes. It sees only each tool’s name, parameter schema, and docstring, not your implementation code. In practice, **your docstrings become the prompt** that helps Claude decide when to call a tool.

::: important Why use MCP at all?

If you’re comfortable with Python, you could call the Aegis library directly from your own scripts. MCP becomes valuable when you want an AI assistant to operate that pipeline through natural conversation. Instead of writing scripts or remembering command-line options, you can simply ask:

- “De-identify this folder.”
- “Is the batch finished?”
- “Which files need manual review?”
- “Summarize today’s run.”

The underlying pipeline never changes. MCP simply provides a safe interface between the AI and your software, allowing the model to orchestrate the workflow while the actual processing remains in your local Python application.

:::

We’ll use Claude Desktop as the host because it supports MCP natively. There are no bridges, extra services, or network ports to configure the server communicates with Claude Desktop over standard input/output as a local subprocess, and the entire setup is configured through a single JSON file.

---

## How the Architecture Works

![Architecture diagram showing Claude Desktop communicating with a local MCP server, which invokes the Aegis de-identification pipeline. Medical images are processed locally, and only summary results such as counts, decisions, and file paths are returned to the AI model.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/1dfe474b-d9a0-4256-9dd7-302beecef935.png)

Claude Desktop communicates with the MCP server, which invokes the Aegis pipeline locally. The pipeline processes the medical images on your machine, while only summaries such as counts, decisions, and file paths are returned to Claude.

---

## Step 1: Design the Tool Surface

Before writing code, decide what the agent can do. Our server exposes six tools:

| Tool | Purpose |
| --- | --- |
| `warm_up` | Preload the OCR and NER models in Aegis so the first real call is fast |
| `deidentify_file` | De-identify a single DICOM/JPEG/PNG file using Aegis pipeline |
| `start_batch_job` | Discover and process all DICOM/image files in a directory, in the background |
| `get_job_status` | Check the progress of a batch job initiated previously |
| `summarize_run` | Audit a completed run from its report files |
| `list_review_queue` | List files routed to manual human review |

::: important We designed these tools around three simple principles:

- Return summaries instead of sensitive data.
- Use background jobs for long-running tasks.
- Keep the tool surface small and focused.

:::

---

## Step 2: Build the MCP Server with FastMCP

Now let’s turn that design into a working MCP server. We will build it one piece at a time so you can reuse the same pattern for your own Python tools. The complete implementation lives in <VPIcon icon="fas fa-folder-open"/>`src/monai_aegis/`<VPIcon icon="fa-brands fa-python"/>`mcp_server.py`; the sections below show how it comes together.

### 1. The Server Instance

FastMCP (bundled with the MCP Python SDK) turns a decorated Python function into a tool.

```py title="src/monai_aegis/mcp_server.py"
from mcp.server.fastmcp import FastMCP

# creates a FastMCP server instance
mcp = FastMCP("aegis-mcp")
```

The string `"aegis-mcp"` is just the server's name. It's what Claude Desktop shows in its tool list. Every tool we add from here is a function decorated with `@mcp.tool()`.

### 2. Your First Tool

A tool is a decorator, a typed signature, and a docstring. Here's the one that does the real work, de-identifying a single file:

```py title="src/monai_aegis/mcp_server.py"
@mcp.tool()
def deidentify_file(input_path: str, output_dir: str = "") -> dict:
    """De-identify a single medical image (DICOM, JPEG, or PNG).

    Scrubs DICOM header PHI and redacts burned-in pixel PHI using
    OCR and NER. Returns summary statistics and the output location
    only, never the redacted text or any pixel data.
    """
    ...
    return {
        "status": "success",
        "source_file": src.name,
        "output_dir": str(out),
        "pixel_regions_detected": len(pixel_rows),
        "pixel_decisions": decisions,   # e.g. {"redacted": 4, "safelisted": 10}
        "header_tags_scrubbed": tags_scrubbed,
        "needs_manual_review": decisions.get("low_confidence", 0) > 0,
    }
```

Notice that Claude only sees the docstring, while the tool returns summary statistics rather than image data or extracted text.

### 3. Never Print to `stdout`

Do not use `print()` in an MCP server because `stdout` is reserved for JSON-RPC. Send logs to `stderr` instead.

### 4. Long Jobs Need the Async Pattern

Processing an entire directory can take several minutes, which is longer than an MCP tool call should block. Instead of waiting synchronously, `start_batch_job` creates a background thread, immediately returns a `job_id`, and lets Claude poll the progress using `get_job_status()`.

```py title="src/monai_aegis/mcp_server.py"
import threading, uuid

_jobs = {}

@mcp.tool()
def start_batch_job(input_dir: str, output_dir: str = "", mode: str = "auto") -> dict:
    """Start a background job that de-identifies all DICOM/image files
    in a directory. Returns immediately with a job_id. Use get_job_status
    to check progress, do not wait synchronously.
    """
    job_id = uuid.uuid4().hex[:8]
    _jobs[job_id] = {"job_id": job_id, "state": "queued",
                     "processed": 0, "total": None,
                     "decisions": {}, "errors": []}
    threading.Thread(
        target=_batch_worker, args=(job_id, input_dir, output_dir),
        daemon=True,
    ).start()
    return {"status": "started", "job_id": job_id,
            "next_step": f"Call get_job_status with job_id '{job_id}'."}
```

The worker thread updates `_jobs[job_id]` as it processes each file, and the polling tool just reads it back:

```py title="src/monai_aegis/mcp_server.py"
@mcp.tool()
def get_job_status(job_id: str) -> dict:
    """Return the current state, progress, and decision counts for a job."""
    return _jobs.get(job_id, {"status": "unknown", "job_id": job_id})
```

Since the MCP server is a long-running process, it can keep the job registry in memory throughout the conversation. If the server restarts, active job IDs are lost, but the de-identified files and audit reports remain safely on disk.

### 5. Heavy Models Need a Warm-Up

Aegis loads EasyOCR and a Stanford NER model, which takes time. The server builds the pipeline lazily and caches it, so it pays that cost once, and exposes a `warm_up` tool so the first *real* call doesn't run into a timeout while models load:

```py
@mcp.tool()
def warm_up() -> dict:
    """Preload the OCR and NER models so the first real call is fast."""
    _get_pipeline()   # builds and caches the pipeline on first use
    return {"status": "ready"}
```

### 6. The Audit Tools Read the Records, Not the Images

The remaining tools read the reports and review folders that Aegis already produces. Because they summarize existing audit records rather than reprocessing images, Claude can answer questions about completed runs without accessing the underlying medical images.

```py
@mcp.tool()
def summarize_run(run_dir: str) -> dict:
    """Audit a run from its CSV reports. Returns counts only — never text or tag values."""
    run = Path(run_dir).expanduser().resolve()
    pixels = _read_csv_rows(run / "aegis_pixel_detections.csv")
    tags = _read_csv_rows(run / "aegis_tag_actions.csv")
    return {
        "pixel_decisions": Counter(r["decision"] for r in pixels),  # redacted / safelisted / low_confidence
        "tag_actions": Counter(r["action"] for r in tags),          # REMOVE / REMAP / ZERO / DUMMY / ATTEST
```

```py
@mcp.tool()
def list_review_queue() -> dict:
    """List files quarantined for manual review — names only, never contents."""
    names = sorted(f for _, _, fs in os.walk(REVIEW_DIR) for f in fs if not f.startswith("."))
    return {"count": len(names), "files": names[:50]}
```

---

## Step 3: Test with MCP Inspector — Before Any AI Is Involved

If you are skeptical about all of this (I was), this step is for you. MCP Inspector is a debug UI that connects to your server and lets *you* click the tools manually.

```sh
npx @modelcontextprotocol/inspector /<ABSOLUTE PATH>/aegis/venv/bin/aegis-mcp
```

The Inspector opens on the **Servers** screen with your `aegis-mcp` server listed. Click the toggle to connect, it turns green when the server is running.

![MCP Inspector showing the Aegis MCP server connected over STDIO, with the server status active and ready for testing.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/7e952989-9e3e-4f45-9a08-579821699963.png)

Next, open the **Tools** tab. You’ll see the six tools exposed by your MCP server. Run `warm_up` first, and watch the terminal where you started the Inspector to see the OCR and NER models load.

Next, run `deidentify_file` with the path to a test image. The **Results** panel shows the tool’s JSON response, while **Messages** shows the request and response exchanged with the server.

![MCP Inspector displaying the deidentify_file tool with its input fields and the JSON response returned after processing a test medical image.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/a3d0ee93-165f-4093-bb38-70a6776d6f03.png)

---

## Step 4: Connect Claude Desktop

Open **Claude Desktop** and go to **Settings → Developer → Edit Config**. This opens (or creates) the MCP configuration file. On macOS it’s located at <VPIcon icon="fas fa-folder-open"/>`~/Library/Application Support/Claude/`<VPIcon icon="iconfont icon-json"/>`claude_desktop_config.json`, and on Windows at <VPIcon icon="fas fa-folder-open"/>`%APPDATA%\Claude\`<VPIcon icon="iconfont icon-json"/>`claude_desktop_config.json`.

Add the following `aegis` entry under `mcpServers`:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "aegis": {
      "command": "/<PATH TO AEGIS>/aegis/venv/bin/aegis-mcp",
      "args": [],
      "env": {
        "AEGIS_OUTPUT_DIR": "/<PATH TO AEGIS>/aegis/staging_output",
        "AEGIS_REVIEW_DIR": "/<PATH TO AEGIS>/aegis/staging_not_processed",
        "AEGIS_DEVICE": "mps"
      }
    }
  }
}
```

Configuration for Claude Desktop to connect to the Aegis MCP server.

A few things to check before saving:

- Use absolute paths for command, `AEGIS_OUTPUT_DIR`, and `AEGIS_REVIEW_DIR`.
- Point command to the aegis-mcp executable inside your virtual environment so Claude uses the correct Python installation and dependencies.
- Set `AEGIS_DEVICE` to `mps` for Apple Silicon, `cpu` for Intel Macs or Linux, or `cuda` if you have an NVIDIA GPU.

Save the file, **fully quit and restart Claude Desktop** (closing the window isn’t enough). In a new chat, open the **Search & Tools** menu, you should now see the **Aegis** MCP server with its six available tools.

![Claude Desktop Search & Tools menu showing the Aegis MCP server and its available tools, including warm_up, deidentify_file, start_batch_job, get_job_status, summarize_run, and list_review_queue.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/d3ec5a5e-80db-48f8-8521-ce56ada47e4c.png)

---

## Step 5: Talk to Your Agent

Time for the first conversation. Send:

> Warm up the Aegis de-identification server.

Claude will ask for permission before calling the tool. This prompt is a feature, every capability you have given the agent requires your explicit approval, and you can grant it per call or per tool.

Once approved, the models load and Claude reports back with the elapsed time.

De-identify a single file:

> De-identify the file `</test_ultrasound.dcm.>`

Claude calls `deidentify_file` and answers with the counts: how many text regions were detected, how many were redacted versus safe listed as clinical text, how many DICOM tags were scrubbed, and whether anything needs review. It narrates all of this without ever having seen the image.

![Claude Desktop conversation where the user asks the Aegis MCP server to de-identify a medical image, and Claude reports summary statistics such as detected text regions, redactions, and whether manual review is required.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/68139acd-4fc7-4ad9-9199-4d419a0062f0.png)

Next, a batch:

> Now start a batch de-identification job for </test_ultrasound>

The tool returns instantly with a job ID, and the processing continues in the background. Ask about it a moment later:

> How's that job going?

Claude remembers the job ID across turns and polls `get_job_status`, reporting files processed, running decision counts, and any errors.

Once the job finishes, you can ask Claude to summarize the run, list files requiring manual review, or generate a report for your review meeting, all from the pipeline’s audit records.

> Summarize the completed run. Does anything need manual review?
>
> What exactly was done to test_ultrasound.dcm, which header tags were touched?
>
> Draft a short de-identification summary for this run, suitable for a review meeting. Include totals, the decision breakdown, and files pending human review.

Everything in the below summary came from tool results, counts and decisions read from the pipeline's own records.

![Claude Desktop conversation showing the progress of a batch de-identification job, including processed files, decision counts, and current job status returned by the MCP server.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/70353644-c512-470c-a32e-72794d644343.png)

![Claude Desktop generating a summary report of a completed de-identification run, including totals, decision breakdowns, and files requiring manual review based on Aegis audit records.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/1b5f583c-224c-4f89-bf09-3208332beafb.png)

---

## Verification

Compare Claude’s summary with the CSV reports and <VPIcon icon="iconfont icon-json"/>`job_summary_<job_id>.json`. The numbers should match, giving you a simple way to verify everything the agent reports.

---

## Does the AI Ever See Patient Data?

No. The tools never return image pixels, OCR-extracted text, or DICOM tag values, so Claude cannot access the underlying PHI.

For example, if you ask:

> Show me the patient name detected in that file.

Claude cannot answer because that information is never exposed by the MCP tools.

However, conversation metadata does reach the model. File names, directory paths, counts, and tool outputs are processed by Claude just like any other chat. Keep these points in mind:

- **Avoid PHI in file names.** Rename files if they contain patient names or identifiers.
- **Keep error messages clean.** Don’t include sensitive DICOM values in exceptions returned by your tools.
- **Use synthetic data while developing.** This tutorial uses fake PHI. Before working with real patient data, follow your organization’s security and compliance requirements.

---

## Security Considerations

If you adapt this pattern for your own tools, consider these best practices:

- **Restrict file access.** Limit tools to approved directories instead of allowing any readable path.
- **Review tool permissions.** It’s reasonable to always allow read-only tools like `get_job_status`, but keep approval prompts for tools that modify files.
- **Return structured results.** Prefer counts and categories over raw text to reduce the chance of exposing sensitive information.
- **Pin model versions.** Using fixed OCR and NER model versions makes your pipeline more reproducible and predictable.

::: note A Note on the Word "De-identification"

In regulations such as HIPAA, **de-identification** has a specific legal meaning with defined requirements. This tutorial shows how to build an AI agent interface for a de-identification pipeline, not how to certify regulatory compliance. The pipeline intentionally routes uncertain cases for human review, and any real-world deployment should be validated against your organization’s policies and applicable regulations.

:::

---

## Where This Fits, and What's Next

MCP doesn’t change how well Aegis detects PHI, it changes **how people interact with it**. Instead of using the command line, users can run jobs, review results, and ask questions in natural language.

For automated workflows such as nightly batch processing, the CLI is still the better choice. MCP is best for interactive, human-in-the-loop tasks, while the CLI remains ideal for scheduled jobs. In both cases, the files and audit reports on disk remain the source of truth.

**Here are a few directions you can explore next:**

- **Run everything locally.** Pair the same MCP server with Ollama and Open WebUI so both the pipeline and the AI model stay on your machine.
- **Strengthen security**. Restrict tools to approved directories before deploying in a shared environment.
- **Build dataset preparation workflows**. Use the agent to de-identify data, summarize results, and prepare datasets for machine learning.
- **Add downstream analysis.** Run vision models on the de-identified outputs instead of the original images.
- **Reuse the pattern elsewhere**. The same architecture can orchestrate pipelines that remove sensitive information from legal documents, logs, financial records, or other confidential data.

---

## Conclusion

We turned an existing Python pipeline into an AI-accessible tool using MCP. The key design principle is **the model orchestrates the workflow but never sees the sensitive data.**

This pattern extends beyond medical imaging. Any pipeline that handles sensitive information: such as legal documents, financial records, or personal photos can expose safe, structured tools while keeping the underlying data private.

You can find the complete implementation in the **Aegis** repository: [https://github.com/lakshmi-mahabaleshwara/aegis (<VPIcon icon="iconfont icon-github"/>`lakshmi-mahabaleshwara/aegis`)](https://github.com/lakshmi-mahabaleshwara/aegis). If you found this tutorial useful, ***consider starring the repository to help others discover it.***

---

## References

<SiteInfo
  name="What is the Model Context Protocol (MCP)? - Model Context Protocol"
  desc="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."
  url="https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro/"
  logo="https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon-dark/favicon.ico"
  preview="https://raw.githubusercontent.com/modelcontextprotocol/docs/2eb6171ddbfeefde349dc3b8d5e2b87414c26250/images/og-image.png"/>

<SiteInfo
  name="modelcontextprotocol/python-sdk"
  desc="The official Python SDK for Model Context Protocol servers and clients"
  url="https://github.com/modelcontextprotocol/python-sdk/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/aaf031e096186b0a303724ab4bf2ed74cad4eb8e30aba82579bc6ddaafdd1031/modelcontextprotocol/python-sdk"/>

<SiteInfo
  name="Getting Started with Local MCP Servers on Claude Desktop | Claude Help Center"
  desc="The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. With the introduction of desktop extensions, installing and managing local MCP servers has become significantly easier."
  url="https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop/"
  logo="https://intercom.help/anthropic-6f71807d7c3e/assets/favicon"
  preview="https://downloads.intercomcdn.com/i/o/lupk8zyo/792494/717b10d3ebd874823db64841659b/76f3062d78ebbb04863fb1de3ef9cca0.png"/>

```component VPCard
{
  "title": "How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research",
  "desc": "Medical imaging is transforming healthcare. Researchers are training deep learning models to detect pneumonia from chest X-rays, estimate cardiac function from echocardiograms, and identify tumors fro",
  "link": "/freecodecamp.org/build-ai-image-de-identification-for-clinical-research.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

<SiteInfo
  name="lakshmi-mahabaleshwara/aegis"
  desc="Aegis: A configurable pipeline for anonymization and preprocessing of medical imaging datasets (DICOM, JPEG/PNG) for AI training."
  url="https://github.com/lakshmi-mahabaleshwara/aegis/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/74b6a915b34368b7020942e3f2ed8f0c1b58875178a25efd684658ed5580343a/lakshmi-mahabaleshwara/aegis"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Privacy-First Medical Image De-Identification Agent with Claude and MCP",
  "desc": "Imagine asking an AI assistant to de-identify thousands of medical images. It runs the pipeline, tracks progress, summarizes every decision, and tells you which files need human review, all without ev",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-privacy-first-medical-image-de-identification-agent.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
