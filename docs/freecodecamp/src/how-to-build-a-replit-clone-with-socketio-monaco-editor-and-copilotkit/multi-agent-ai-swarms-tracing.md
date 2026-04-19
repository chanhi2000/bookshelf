---
lang: en-US
title: "How to Trace Multi-Agent AI Swarms with Jaeger v2"
description: "Article(s) > How to Trace Multi-Agent AI Swarms with Jaeger v2"
icon: fa-brands fa-golang
category:
  - Python
  - DevOps
  - Docker
  - AI
  - LLM
  - Anthropic
  - Claude
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
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Trace Multi-Agent AI Swarms with Jaeger v2"
    - property: og:description
      content: "How to Trace Multi-Agent AI Swarms with Jaeger v2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/multi-agent-ai-swarms-tracing.html
prev: /programming/py/articles/README.md
date: 2026-04-24
isOriginal: false
author:
  - name: Christopher Galliart
    url: https://freecodecamp.org/news/author/hatmanstack/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/308710e6-cfe6-4007-887a-c49a5e2e6b9a.png
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
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Trace Multi-Agent AI Swarms with Jaeger v2"
  desc="When you run a single AI agent, debugging is straightforward. You read the log, you see what happened. When you run five agents in a swarm, each spawning its own tool calls and producing its own outpu"
  url="https://freecodecamp.org/news/multi-agent-ai-swarms-tracing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/308710e6-cfe6-4007-887a-c49a5e2e6b9a.png"/>

When you run a single AI agent, debugging is straightforward. You read the log, you see what happened.

When you run five agents in a swarm, each spawning its own tool calls and producing its own output, "read the log" stops being a strategy.

I built [<VPIcon icon="iconfont icon-github"/>`HatmanStack/claude-forge`](https://github.com/HatmanStack/claude-forge) as an adversarial multi-agent coding framework on top of Claude Code. A typical run spawns a planner, an implementer, a reviewer, and a fixer. They evaluate each other's work and loop back when quality checks fail.

But when something went wrong, I had timestamps and text dumps but no way to see which agent was responsible, how long it actually took, or where the tokens went.

Jaeger fixed that. This article covers setting up Jaeger v2 with Docker, wiring it into a multi-agent system through OpenTelemetry, and what I learned along the way.

---

## What Is Distributed Tracing?

Distributed tracing tracks a single operation as it moves through multiple services. A span is one unit of work with a start time, end time, and key-value attributes. Spans nest into parent-child trees. One tree per operation is one trace.

Microservices people already know this pattern: follow an HTTP request from the gateway through auth, the database, and the cache. Same idea works for multi-agent AI. Follow one swarm invocation from the orchestrator through each subagent and its tool calls.

OpenTelemetry (OTel) is the standard. It gives you SDKs for creating spans and shipping them over OTLP. Jaeger receives that data and renders it as a searchable timeline.

---

## Why Jaeger v2?

Jaeger started at Uber and graduated as a CNCF project in 2019. v1 hit end of life in December 2025. v2 is the current release, built on the OpenTelemetry Collector framework. Single binary: collector, query service, and UI. It speaks OTLP natively on port 4317 (gRPC) and 4318 (HTTP). There's no separate collector needed for local work.

One important difference from v1: configuration moved from CLI flags and environment variables to a YAML file. The old `-e SPAN_STORAGE_TYPE=badger` env vars are silently ignored in v2. The container starts fine but falls back to in-memory storage. I lost two days of traces before noticing. More on the correct setup below.

::: note Prerequisites

- **Docker** installed and running.
- **Claude Code** installed.
- **Python 3.8+** for the tracing hook.
- **Claude Forge** or another multi-agent system to instrument.

:::

---

## Installing Docker on Debian

Skip this if you already have Docker. macOS and Windows users can use Docker Desktop. On Debian:

```sh
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/debian \
  \((. /etc/os-release && echo "\)VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

::: note Ubuntu users

replace both `linux/debian` URLs with `linux/ubuntu`.

:::

---

## Setting Up Jaeger v2

### Basic Run

For quick testing with no persistence:

```sh
docker run -d --name jaeger \
-p 16686:16686 \
-p 4317:4317 \
-p 4318:4318 \
jaegertracing/jaeger:2.17.0
```

Port 16686 is the UI. Port 4317 is OTLP/gRPC ingestion. Port 4318 is OTLP/HTTP. Remove the container and your traces are gone.

### Persistent Storage with Badger

v2 reads configuration from a YAML file, not environment variables. Save this as <VPIcon icon="fas fa-folder-open"/>`~/.local/share/jaeger/`<VPIcon icon="iconfont icon-yaml"/>`config.yaml`:

```yaml title="~/.local/share/jaeger/config.yaml"
service:
  extensions: [jaeger_storage, jaeger_query, healthcheckv2]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [jaeger_storage_exporter]
extensions:
  healthcheckv2:
    use_v2: true
    http: { endpoint: 0.0.0.0:13133 }
  jaeger_query:
    storage: { traces: main_store }
  jaeger_storage:
    backends:
      main_store:
        badger:
          directories: { keys: /badger/key, values: /badger/data }
          ephemeral: false
          ttl: { spans: 720h }
receivers:
  otlp:
    protocols:
      grpc: { endpoint: 0.0.0.0:4317 }
      http: { endpoint: 0.0.0.0:4318 }
processors:
  batch:
exporters:
  jaeger_storage_exporter:
    trace_storage: main_store
```

The Jaeger container runs as UID 10001. Docker named volumes default to root ownership. Without fixing permissions first, the container crash-loops with `mkdir /badger/key: permission denied`.

Pre-create the volume and fix ownership:

```sh
docker volume create jaeger-data
docker run --rm \
-v jaeger-data:/badger \
alpine sh -c "mkdir -p /badger/data /badger/key && chown -R 10001:10001 /badger"
```

Then run Jaeger with the config mounted in:

```sh
docker run -d --name jaeger \
--restart unless-stopped \
-v ~/.local/share/jaeger/config.yaml:/etc/jaeger/config.yaml:ro \
-v jaeger-data:/badger \
-p 16686:16686 \
-p 4317:4317 \
-p 4318:4318 \
jaegertracing/jaeger:2.17.0 \
--config /etc/jaeger/config.yaml
```

Verify persistence by running `docker restart jaeger` and confirming a previously recorded trace is still there. Hit `http://localhost:16686` and you should see the UI.

---

## Setting Up Claude Forge Tracing

### Installing Claude Forge

Install it through the Claude Code plugin marketplace:

```sh
/plugin marketplace add hatmanstack/claude-forge
/plugin install forge@claude-forge
/reload-plugins
```

The install opens a TUI to confirm scope and settings. After reload, commands use the `forge:` prefix (for example, `/forge:pipeline`).

You can also clone the repo from [<VPIcon icon="iconfont icon-github"/>`HatmanStack/claude-forge`](https://github.com/HatmanStack/claude-forge).

### Installing the Tracing Hook

From your target project directory, run the install script. For plugin installs:

```sh
cd your-project
forge-trace                # if you set up the alias from the README
# or, without the alias:
bash "$(find ~/.claude -path '*/forge*' -name install-tracing.sh 2>/dev/null | head -1)"
```

For clone installs:

```sh
cd your-project
bash /path/to/claude-forge/bin/install-tracing.sh
```

The script builds a dedicated venv at `~/.local/share/claude-forge/venv` (prefers `uv`, falls back to `python3 -m venv`), installs the OpenTelemetry packages, copies the hook into place, merges hook entries into <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.local.json`, and self-tests against the OTLP endpoint.

Pass `--no-settings` to skip the settings merge, or `--uninstall` to tear everything down.

### Opting In

Add to your shell init and restart your terminal:

```sh
export CLAUDE_FORGE_TRACING=1
```

Restart Claude Code, run `/pipeline`, then check `http://localhost:16686` for the `claude-forge` service.

---

## Understanding the Span Model

Here's what the hierarchy looks like for a typical swarm run:

```sh title="file structure"
session: "implement login form with OAuth"        # root span
├── subagent:planner
│   ├── tool:Write  (Phase-0.md)                  # mutation spans (on by default)
│   ├── tool:Write  (Phase-1.md)
│   └── subagent_result:planner                   # duration, token counts, output
├── subagent:implementer
│   ├── tool:Edit   (src/auth.ts)
│   ├── tool:Bash   (npm test)
│   ├── tool:Write  (src/oauth.ts)
│   └── subagent_result:implementer
├── subagent:reviewer
│   └── subagent_result:reviewer
└── session_complete                              # session totals
```

The root span's name comes from the first line of your prompt. Find traces by what you asked for, not by a UUID.

Subagents get an anchor span on start and a result span on completion. The result carries duration, token counts, prompt, and output.

### Three Tiers of Detail

Not all inner tool calls are equally interesting. Write, Edit, MultiEdit, and Bash are mutational: small in number, high signal. They tell you what actually changed. Read, Glob, Grep, and WebFetch are navigation: lots of them, mostly noise.

Tracing captures mutations by default. That middle ground turned out to be the right one. Before this change, you either saw nothing inside subagents or you saw 200+ spans per run.

| Mode | Subagents | Mutations (Write/Edit/Bash) | Other inner tools |
| --- | --- | --- | --- |
| Default | yes | yes | no |
| `CLAUDE_FORGE_TRACE_INNER=1` | yes | yes | yes (minus blocklist) |
| `CLAUDE_FORGE_TRACE_MUTATIONS=0` | yes | no | no (or per INNER) |

### Span Attributes

**On `session_complete`:** `session.tokens.input`, `session.tokens.output`, `session.tokens.total`, `session.tokens.turns`, `session.duration_ms`, `user.prompt` (first 2KB).

**On `subagent_result`:** `agent.description`, `agent.prompt`, `agent.output`, `agent.duration_ms`, `agent.is_error`, `agent.tokens.input`, `agent.tokens.output`.

**On* `tool:*`:** `tool.name`, `tool.input`, `tool.output`, `tool.duration_ms`, `tool.is_error`.

---

## Instrumenting a Multi-Agent Swarm

### Hook Architecture

Claude Code has lifecycle hooks that fire scripts on specific events. Four matter here:

1. **UserPromptSubmit** (create the root span),
2. **PreToolUse** (start a span),
3. **PostToolUse** (end it with results), and
4. **Stop** (finalize the trace). Each hook gets a JSON payload on stdin and runs as a subprocess.

### Sending Spans with OpenTelemetry

Here's some minimal Python to get a span into Jaeger:

```py
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource

resource = Resource.create({"service.name": "my-agent-system"})
exporter = OTLPSpanExporter(endpoint="http://localhost:4317", insecure=True)
provider = TracerProvider(resource=resource)
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer("agent-tracer")

with tracer.start_as_current_span("my-agent-task") as span:
    span.set_attribute("agent.name", "planner")
    span.set_attribute("agent.tokens.input", 1500)
    span.set_attribute("agent.tokens.output", 800)
```

Refresh `localhost:16686`, pick your service, click "Find Traces."

### Correlating Pre and Post Events

You need to match each PreToolUse to its PostToolUse. Agent-type tool calls didn't include a `tool_use_id` in the payload, so I hashed the tool name and input instead. Pre and Post carry identical `tool_input`, so the hashes line up.

```py
import hashlib, json

def correlation_key(tool_name: str, tool_input: dict) -> str:
    content = json.dumps({"tool": tool_name, "input": tool_input}, sort_keys=True)
    return hashlib.sha1(content.encode()).hexdigest()[:16]
```

### State Across Invocations

Every hook call is a separate process. No shared memory. So I wrote span context to JSON files on Pre and read them back on Post:

```sh title="file structure"
/tmp/claude-forge-tracing/<session_id>/
├── _root.json              # trace ID, root span context
├── _session_start_ns.json  # timestamp for duration calculation
├── subagent_<hash>.json    # per-subagent span context
└── tool_<hash>.json        # per-tool span context
```

File names get sanitized against path traversal. `_safe_name()` strips everything outside `[A-Za-z0-9._-]` and falls back to a SHA1 slug.

### Flushing Without Blocking

```py
try:
    provider.force_flush(timeout_millis=1000)
except Exception:
    pass  # Never block the swarm
```

I tried 2000ms first and the swarm felt slow. 100ms lost spans on cold TLS connections. 1000ms worked. If Jaeger is down, the swarm keeps running regardless.

---

## Viewing Traces in the Jaeger UI

Open `http://localhost:16686`. Pick `claude-forge` from the service dropdown. Click "Find Traces."

The trace search filters by operation name, tags, and time range. Since session spans take their name from your prompt, searching "login form" pulls up the runs where you asked for one.

The timeline view is where I spend most of my time. Every span is a horizontal bar, nested by parent-child relationships. I can see the planner took 12 seconds, the implementer 45, the reviewer 8. Click any bar to see token counts, prompts, outputs, error status.

Trace comparison puts two runs side by side. This is good for figuring out why one run succeeded and another did not.

::: important Lessons from the Trenches

**One trace per swarm, not per subagent:** My first version wiped the root span's state file on every Stop event, so each subagent started a new trace. I changed Stop to mark a timestamp while preserving the root.

**Use descriptions, not type names:** Subagents all report their type as `general-purpose`. The description field is where the actual role lives.

**Token attribution needs per-agent transcripts:** Claude Code writes subagent transcripts to <VPIcon icon="fas fa-folder-open"/>`~/.claude/projects/<project>/<session>/subagents/`<VPIcon icon="iconfont icon-json"/>`agent-*.jsonl`. Match them via `agent-*.meta.json`.

**Parse boolean env vars explicitly:** `bool("0")` in Python is `True`. Use an allowlist: `{"1", "true", "yes", "on"}`.

:::

---

## Environment Variable Reference

| Variable | Purpose |
| --- | --- |
| `CLAUDE_FORGE_TRACING=1` | Master opt-in. Hook is a no-op without this. |
| `CLAUDE_FORGE_TRACE_MUTATIONS=0` | Disable default mutation spans (Write/Edit/Bash). On by default. |
| `CLAUDE_FORGE_TRACE_INNER=1` | Capture all inner tool calls as child spans (off by default). |
| `CLAUDE_FORGE_TRACE_TOOL_BLOCKLIST` | Comma-separated tools to skip when inner tracing is on. Defaults to `Read,Glob,Grep,TodoWrite,NotebookRead`. |
| `CLAUDE_FORGE_HOOK_DEBUG=1` | Enable debug logging of raw hook payloads. Off by default. |
| `CLAUDE_FORGE_HOOK_DEBUG_LOG` | Override debug log path. Defaults to <VPIcon icon="fas fa-folder-open"/>`~/.cache/claude-forge/`<VPIcon icon="fas fa-file-lines"/>`hook.log`. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP/gRPC endpoint. Defaults to `http://localhost:4317`. |

---

## Wrapping Up

Without visibility into the process, you're being inefficient with tokens and your time. Multi-agent swarms cost real money on every run. When an agent fails and retries, or when a reviewer rejects work that was close, you're paying for that blind.

Tracing gives you the map. You find out where the failure modes are. You find out which agents burn tokens going nowhere. A 45-second implementer run might have been 10 seconds with a better planner prompt. But you would never know that without seeing the breakdown.

Get observability in early. Jaeger and OpenTelemetry make it cheap to set up. Once you can see where things go wrong you can actually fix them.

::: info

Claude Forge tracing is on the [<VPIcon icon="fas fa-code-branch"/>`main` branch (<VPIcon icon="iconfont icon-github"/>`HatmanStack/claude-forge`)](https://github.com/HatmanStack/claude-forge).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Trace Multi-Agent AI Swarms with Jaeger v2",
  "desc": "When you run a single AI agent, debugging is straightforward. You read the log, you see what happened. When you run five agents in a swarm, each spawning its own tool calls and producing its own outpu",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/multi-agent-ai-swarms-tracing.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
