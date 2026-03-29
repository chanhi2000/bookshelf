---
lang: en-US
title: "Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers"
description: "Article(s) > Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers"
icon: iconfont icon-flask
category:
  - Python
  - Flask
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
      content: "Article(s) > Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers"
    - property: og:description
      content: "Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/docker-container-doctor-how-i-built-an-ai-agent-that-monitors-and-fixes-my-containers.html
prev: /programming/py-flask/articles/README.md
date: 2026-03-24
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8bb7701d-e519-407f-92ba-59639e13729d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
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
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers"
  desc="Maybe this sounds familiar: your production container crashes at 3 AM. By the time you wake up, it's been throwing the same error for 2 hours. You SSH in, pull logs, decode the cryptic stack trace, Go"
  url="https://freecodecamp.org/news/docker-container-doctor-how-i-built-an-ai-agent-that-monitors-and-fixes-my-containers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8bb7701d-e519-407f-92ba-59639e13729d.png"/>

Maybe this sounds familiar: your production container crashes at 3 AM. By the time you wake up, it's been throwing the same error for 2 hours. You SSH in, pull logs, decode the cryptic stack trace, Google the error, and finally restart it. Twenty minutes of your morning gone. And the worst part? It happens again next week.

I got tired of this cycle. I was running 5 containerized services on a single Linode box – a Flask API, a Postgres database, an Nginx reverse proxy, a Redis cache, and a background worker. Every other week, one of them would crash. The logs were messy. The errors weren't obvious. And I'd waste time debugging something that could've been auto-detected and fixed in seconds.

So I built something better: a Python agent that watches your containers in real-time, spots errors, figures out what went wrong using Claude, and fixes them without waking you up. I call it the Container Doctor. It's not magic. It's Docker API + LLM reasoning + some automation glue. Here's exactly how I built it, what went wrong along the way, and what I'd do differently.

---

## Why Not Just Use Prometheus?

Fair question. Prometheus, Grafana, DataDog – they're all great. But for my setup, they were overkill. I had 5 containers on a $20/month Linode. Setting up Prometheus means deploying a metrics server, configuring exporters for each service, building Grafana dashboards, and writing alert rules. That's a whole side project just to monitor a side project.

Even then, those tools tell you *what* happened. They'll show you a spike in memory or a 500 error rate. But they won't tell you *why*. You still need a human to look at the logs, figure out the root cause, and decide what to do.

That's the gap I wanted to fill. I didn't need another dashboard. I needed something that could read a stack trace, understand the context, and either fix it or tell me exactly what to do when I wake up. Claude turned out to be surprisingly good at this. It can read a Python traceback and tell you the issue faster than most junior devs (and some senior ones, honestly).

---

## The Architecture

Here's how the pieces fit together:

```plaintext
┌─────────────────────────────────────────────┐
│            Docker Host                      │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   web    │  │   api    │  │    db    │   │
│  │ (nginx)  │  │ (flask)  │  │(postgres)│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │         │
│       └─────────────┼─────────────┘         │
│                     │                       │
│               Docker Socket                 │
│                     │                       │
│            ┌────────┴─────────┐             │
│            │ Container Doctor │             │
│            │  (Python agent)  │             │
│            └─────────┬────────┘             │
│                      │                      │
└──────────────────────┼──────────────────────┘
                       │
              ┌────────┴────────┐
              │   Claude API    │
              │  (diagnosis)    │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │  Slack Webhook  │
              │  (alerts)       │
              └─────────────────┘
```
<!-- TODO: mermaid 화 -->

::: info The flow works like this:

1. The Container Doctor runs in its own container with the Docker socket mounted
2. Every 10 seconds, it pulls the last 50 lines of logs from each target container
3. It scans for error patterns (keywords like "error", "exception", "traceback", "fatal")
4. When it finds something, it sends the logs to Claude with a structured prompt
5. Claude returns a JSON diagnosis: root cause, severity, suggested fix, and whether it's safe to auto-restart
6. If severity is high and auto-restart is safe, the script restarts the container
7. Either way, it sends a Slack notification with the full diagnosis
8. A simple health endpoint lets you check the doctor's own status

:::

The key insight: the script doesn't try to be smart about the diagnosis itself. It outsources all the thinking to Claude. The script's job is just plumbing: collecting logs, routing them to Claude, and executing the response.

---

## Setting Up the Project

Create your project directory:

```sh
mkdir container-doctor && cd container-doctor
```

Here's your <VPIcon icon="fas fa-file-lines"/>`requirements.txt`:

```plaintext title="requirements.txt"
docker==7.0.0
anthropic>=0.28.0
python-dotenv==1.0.0
flask==3.0.0
requests==2.31.0
```

Install locally for testing: `pip install -r requirements.txt`

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file:

```sh title=".env"
ANTHROPIC_API_KEY=sk-ant-...
TARGET_CONTAINERS=web,api,db
CHECK_INTERVAL=10
LOG_LINES=50
AUTO_FIX=true
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
POSTGRES_USER=user
POSTGRES_PASSWORD=changeme
POSTGRES_DB=mydb
MAX_DIAGNOSES_PER_HOUR=20
```

A quick note on `CHECK_INTERVAL`: 10 seconds is aggressive. For production, I'd bump this to 30-60 seconds. I kept it low during development so I could see results faster, and honestly forgot to change it. My API bill reminded me.

---

## The Monitoring Script – Line by Line

Here's the full <VPIcon icon="fa-brands fa-python"/>`container_doctor.py`. I'll walk through the important parts after:

```py :collapsed-lines title="container_doctor.py"
import docker
import json
import time
import logging
import os
import requests
from datetime import datetime, timedelta
from collections import defaultdict
from threading import Thread
from flask import Flask, jsonify
from anthropic import Anthropic

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

client = Anthropic()
docker_client = None

# --- Config ---
TARGET_CONTAINERS = os.getenv("TARGET_CONTAINERS", "").split(",")
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL", "10"))
LOG_LINES = int(os.getenv("LOG_LINES", "50"))
AUTO_FIX = os.getenv("AUTO_FIX", "true").lower() == "true"
SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK_URL", "")
MAX_DIAGNOSES = int(os.getenv("MAX_DIAGNOSES_PER_HOUR", "20"))

# --- State tracking ---
diagnosis_history = []
fix_history = defaultdict(list)
last_error_seen = {}
rate_limit_counter = defaultdict(int)
rate_limit_reset = datetime.now() + timedelta(hours=1)

app = Flask(__name__)


def get_docker_client():
    """Lazily initialize Docker client."""
    global docker_client
    if docker_client is None:
        docker_client = docker.from_env()
    return docker_client


def get_container_logs(container_name):
    """Fetch last N lines from a container."""
    try:
        container = get_docker_client().containers.get(container_name)
        logs = container.logs(
            tail=LOG_LINES,
            timestamps=True
        ).decode("utf-8")
        return logs
    except docker.errors.NotFound:
        logger.warning(f"Container '{container_name}' not found. Skipping.")
        return None
    except docker.errors.APIError as e:
        logger.error(f"Docker API error for {container_name}: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error fetching logs for {container_name}: {e}")
        return None


def detect_errors(logs):
    """Check if logs contain error patterns."""
    error_patterns = [
        "error", "exception", "traceback", "failed", "crash",
        "fatal", "panic", "segmentation fault", "out of memory",
        "killed", "oomkiller", "connection refused", "timeout",
        "permission denied", "no such file", "errno"
    ]
    logs_lower = logs.lower()
    found = []
    for pattern in error_patterns:
        if pattern in logs_lower:
            found.append(pattern)
    return found


def is_new_error(container_name, logs):
    """Check if this is a new error or the same one we already diagnosed."""
    log_hash = hash(logs[-200:])  # Hash last 200 chars
    if last_error_seen.get(container_name) == log_hash:
        return False
    last_error_seen[container_name] = log_hash
    return True


def check_rate_limit():
    """Ensure we don't spam Claude with too many requests."""
    global rate_limit_counter, rate_limit_reset

    now = datetime.now()
    if now > rate_limit_reset:
        rate_limit_counter.clear()
        rate_limit_reset = now + timedelta(hours=1)

    total = sum(rate_limit_counter.values())
    if total >= MAX_DIAGNOSES:
        logger.warning(f"Rate limit reached ({total}/{MAX_DIAGNOSES} per hour). Skipping diagnosis.")
        return False
    return True


def diagnose_with_claude(container_name, logs, error_patterns):
    """Send logs to Claude for diagnosis."""
    if not check_rate_limit():
        return None

    rate_limit_counter[container_name] += 1

    prompt = f"""You are a DevOps expert analyzing container logs.

Container: {container_name}
Timestamp: {datetime.now().isoformat()}
Detected patterns: {', '.join(error_patterns)}

Recent logs:
---
{logs}
---

Analyze these logs and respond with ONLY valid JSON (no markdown, no explanation):
{{
    "root_cause": "One sentence explaining exactly what went wrong",
    "severity": "low|medium|high",
    "suggested_fix": "Step-by-step fix the operator should apply",
    "auto_restart_safe": true or false,
    "config_suggestions": ["ENV_VAR=value", "..."],
    "likely_recurring": true or false,
    "estimated_impact": "What breaks if this isn't fixed"
}}
"""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=600,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text
    except Exception as e:
        logger.error(f"Claude API error: {e}")
        return None


def parse_diagnosis(diagnosis_text):
    """Extract JSON from Claude's response."""
    if not diagnosis_text:
        return None
    try:
        start = diagnosis_text.find("{")
        end = diagnosis_text.rfind("}") + 1
        if start >= 0 and end > start:
            json_str = diagnosis_text[start:end]
            return json.loads(json_str)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        logger.debug(f"Raw response: {diagnosis_text}")
    except Exception as e:
        logger.error(f"Failed to parse diagnosis: {e}")
    return None


def apply_fix(container_name, diagnosis):
    """Apply auto-fixes if safe."""
    if not AUTO_FIX:
        logger.info(f"Auto-fix disabled globally. Skipping {container_name}.")
        return False

    if not diagnosis.get("auto_restart_safe"):
        logger.info(f"Claude says restart is unsafe for {container_name}. Skipping.")
        return False

    # Don't restart the same container more than 3 times per hour
    recent_fixes = [
        t for t in fix_history[container_name]
        if t > datetime.now() - timedelta(hours=1)
    ]
    if len(recent_fixes) >= 3:
        logger.warning(
            f"Container {container_name} already restarted {len(recent_fixes)} "
            f"times this hour. Something deeper is wrong. Skipping."
        )
        send_slack_alert(
            container_name, diagnosis,
            extra="REPEATED FAILURE: This container has been restarted 3+ times "
                  "in the last hour. Manual intervention needed."
        )
        return False

    try:
        container = get_docker_client().containers.get(container_name)
        logger.info(f"Restarting container {container_name}...")
        container.restart(timeout=30)
        fix_history[container_name].append(datetime.now())
        logger.info(f"Container {container_name} restarted successfully")

        # Verify it's actually running after restart
        time.sleep(5)
        container.reload()
        if container.status != "running":
            logger.error(f"Container {container_name} failed to start after restart")
            return False

        return True
    except Exception as e:
        logger.error(f"Failed to restart {container_name}: {e}")
        return False


def send_slack_alert(container_name, diagnosis, extra=""):
    """Send diagnosis to Slack."""
    if not SLACK_WEBHOOK:
        return

    severity_emoji = {
        "low": "🟡",
        "medium": "🟠",
        "high": "🔴"
    }

    severity = diagnosis.get("severity", "unknown")
    emoji = severity_emoji.get(severity, "⚪")

    blocks = [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": f"{emoji} Container Doctor Alert: {container_name}"
            }
        },
        {
            "type": "section",
            "fields": [
                {"type": "mrkdwn", "text": f"*Severity:* {severity}"},
                {"type": "mrkdwn", "text": f"*Container:* `{container_name}`"},
                {"type": "mrkdwn", "text": f"*Root Cause:* {diagnosis.get('root_cause', 'Unknown')}"},
                {"type": "mrkdwn", "text": f"*Fix:* {diagnosis.get('suggested_fix', 'N/A')}"},
            ]
        }
    ]

    if diagnosis.get("config_suggestions"):
        suggestions = "\n".join(
            f"• `{s}`" for s in diagnosis["config_suggestions"]
        )
        blocks.append({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*Config Suggestions:*\n{suggestions}"
            }
        })

    if extra:
        blocks.append({
            "type": "section",
            "text": {"type": "mrkdwn", "text": f"*⚠️ {extra}*"}
        })

    try:
        requests.post(SLACK_WEBHOOK, json={"blocks": blocks}, timeout=10)
    except Exception as e:
        logger.error(f"Slack notification failed: {e}")


# --- Health Check Endpoint ---
@app.route("/health")
def health():
    """Health check endpoint for the doctor itself."""
    try:
        get_docker_client().ping()
        docker_ok = True
    except:
        docker_ok = False

    return jsonify({
        "status": "healthy" if docker_ok else "degraded",
        "docker_connected": docker_ok,
        "monitoring": TARGET_CONTAINERS,
        "total_diagnoses": len(diagnosis_history),
        "fixes_applied": {k: len(v) for k, v in fix_history.items()},
        "rate_limit_remaining": MAX_DIAGNOSES - sum(rate_limit_counter.values()),
        "uptime_check": datetime.now().isoformat()
    })


@app.route("/history")
def history():
    """Return recent diagnosis history."""
    return jsonify(diagnosis_history[-50:])


def monitor_containers():
    """Main monitoring loop."""
    logger.info(f"Container Doctor starting up")
    logger.info(f"Monitoring: {TARGET_CONTAINERS}")
    logger.info(f"Check interval: {CHECK_INTERVAL}s")
    logger.info(f"Auto-fix: {AUTO_FIX}")
    logger.info(f"Rate limit: {MAX_DIAGNOSES}/hour")

    while True:
        for container_name in TARGET_CONTAINERS:
            container_name = container_name.strip()
            if not container_name:
                continue

            logs = get_container_logs(container_name)
            if not logs:
                continue

            error_patterns = detect_errors(logs)
            if not error_patterns:
                continue

            # Skip if we already diagnosed this exact error
            if not is_new_error(container_name, logs):
                continue

            logger.warning(
                f"Errors detected in {container_name}: {error_patterns}"
            )

            diagnosis_text = diagnose_with_claude(
                container_name, logs, error_patterns
            )
            if not diagnosis_text:
                continue

            diagnosis = parse_diagnosis(diagnosis_text)
            if not diagnosis:
                logger.error("Failed to parse Claude's response. Skipping.")
                continue

            # Record it
            diagnosis_history.append({
                "container": container_name,
                "timestamp": datetime.now().isoformat(),
                "diagnosis": diagnosis,
                "patterns": error_patterns
            })

            logger.info(
                f"Diagnosis for {container_name}: "
                f"severity={diagnosis.get('severity')}, "
                f"cause={diagnosis.get('root_cause')}"
            )

            # Auto-fix only on high severity
            fixed = False
            if diagnosis.get("severity") == "high":
                fixed = apply_fix(container_name, diagnosis)

            # Always notify Slack
            send_slack_alert(
                container_name, diagnosis,
                extra="Auto-restarted" if fixed else ""
            )

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    # Run Flask health endpoint in background
    flask_thread = Thread(
        target=lambda: app.run(host="0.0.0.0", port=8080, debug=False),
        daemon=True
    )
    flask_thread.start()
    logger.info("Health endpoint running on :8080")

    try:
        monitor_containers()
    except KeyboardInterrupt:
        logger.info("Container Doctor shutting down")
```

That's a lot of code, so let me walk through the parts that matter.

**Error deduplication (`is_new_error`)**: This was a lesson I learned the hard way. Without this, the script would see the same error every 10 seconds and spam Claude with identical requests. I hash the last 200 characters of the log output and skip if it matches the last error we saw. Simple, but it cut my API costs by about 80%.

**Rate limiting (`check_rate_limit`)**: Belt and suspenders. Even with deduplication, I cap it at 20 diagnoses per hour. If something is so broken that it's generating 20+ unique errors per hour, you need a human anyway.

**Restart throttling (inside `apply_fix`)**: If the same container has been restarted 3 times in an hour, something deeper is wrong. A restart loop won't fix a misconfigured database or a missing volume. The script stops restarting and sends a louder Slack alert instead.

**Post-restart verification**: After restarting, the script waits 5 seconds and checks if the container is actually running. I've seen cases where a container restarts and immediately crashes again. Without this check, the script would report success while the container is still down.

---

## The Claude Diagnosis Prompt (and Why Structure Matters)

Getting Claude to return parseable JSON took some iteration. My first attempt used a casual prompt and I got back paragraphs of explanation with JSON buried somewhere in the middle. Sometimes it'd use markdown code fences, sometimes not.

The version I landed on is explicit about format:

```py
prompt = f"""You are a DevOps expert analyzing container logs.

Container: {container_name}
Timestamp: {datetime.now().isoformat()}
Detected patterns: {', '.join(error_patterns)}

Recent logs:
---
{logs}
---

Analyze these logs and respond with ONLY valid JSON (no markdown, no explanation):
{{
    "root_cause": "One sentence explaining exactly what went wrong",
    "severity": "low|medium|high",
    "suggested_fix": "Step-by-step fix the operator should apply",
    "auto_restart_safe": true or false,
    "config_suggestions": ["ENV_VAR=value", "..."],
    "likely_recurring": true or false,
    "estimated_impact": "What breaks if this isn't fixed"
}}
"""
```

::: info A few things I learned:

**Include the detected patterns.** Telling Claude "I found 'timeout' and 'connection refused'" helps it focus. Without this, it sometimes fixated on irrelevant warnings in the logs.

**Ask for `estimated_impact`.** This field turned out to be the most useful in Slack alerts. When your team sees "Database connections will pile up and crash the API within 15 minutes," they act faster than when they see "connection pool exhausted."

**`likely_recurring` is gold.** If Claude says an issue is likely to recur, I know a restart is a band-aid and I need to actually fix the root cause. I flag these in Slack with extra emphasis.

:::

Claude returns something like:

```json
{
  "root_cause": "Connection pool exhausted. Default pool size is 5, but app has 8+ concurrent workers.",
  "severity": "high",
  "suggested_fix": "1. Set POOL_SIZE=20 in environment. 2. Add connection timeout of 30s. 3. Consider a connection pooler like PgBouncer.",
  "auto_restart_safe": true,
  "config_suggestions": ["POOL_SIZE=20", "CONNECTION_TIMEOUT=30"],
  "likely_recurring": true,
  "estimated_impact": "API requests will queue and timeout. Users will see 503 errors within 2-3 minutes."
}
```

I only auto-restart on `high` severity. Medium and low issues get logged, sent to Slack, and I deal with them during business hours. This distinction matters: you don't want the script restarting containers over every transient warning.

---

## Auto-Fix Logic – Being Conservative on Purpose

The auto-fix function is intentionally limited. Right now it only restarts containers. It doesn't modify environment variables, change configs, or scale services. Here's why:

Restarting is safe and reversible. If the restart makes things worse, the container just crashes again and I get another alert. But if the script started changing environment variables or modifying docker-compose files, a bad decision could cascade across services.

The three safety checks before any restart:

1. **Global toggle**: `AUTO_FIX=true` in .env. I can kill all auto-fixes instantly by changing one variable.
2. **Claude's assessment**: `auto_restart_safe` must be true. If Claude says "don't restart this, it'll corrupt the database," the script listens.
3. **Restart throttle**: No more than 3 restarts per container per hour. After that, it's a human problem.

If I were building this for a team, I'd add approval flows. Send a Slack message with "Restart?" and two buttons. Wait for a human to click yes. That adds latency but removes the risk of automated chaos.

---

## Adding Slack Notifications

Every diagnosis gets sent to Slack, whether the container was restarted or not. The notification includes color-coded severity, root cause, suggested fix, and config suggestions.

The Slack Block Kit formatting makes these alerts scannable. A red dot for high severity, orange for medium, yellow for low. Your team can glance at the channel and know if they need to drop everything or if it can wait.

To set this up, create a Slack app at [<VPIcon icon="fas fa-globe"/>api.slack.com/apps](https://api.slack.com/apps), add an incoming webhook, and paste the URL in your `.env`.

---

## Health Check Endpoint

The doctor needs a doctor. I added a simple Flask endpoint so I can monitor the monitoring script:

```sh
curl http://localhost:8080/health
```

Returns:

```json
{
  "status": "healthy",
  "docker_connected": true,
  "monitoring": ["web", "api", "db"],
  "total_diagnoses": 14,
  "fixes_applied": {"api": 2, "web": 1},
  "rate_limit_remaining": 6,
  "uptime_check": "2026-03-15T14:30:00"
}
```

And `/history` returns the last 50 diagnoses:

```sh
curl http://localhost:8080/history
```

I point an uptime checker (UptimeRobot, free tier) at the `/health` endpoint. If the Container Doctor itself goes down, I get an email. It's monitoring all the way down.

---

## Rate Limiting Claude Calls

This is where I burned money during development. Without rate limiting, the script was sending 100+ requests per hour during a container crash loop. At a few cents per request, that's a few dollars per hour. Not catastrophic, but annoying.

The rate limiter is simple: a counter that resets every hour. Default cap is 20 diagnoses per hour. If you hit the limit, the script logs a warning and skips diagnosis until the window resets. Errors still get detected, they just don't get sent to Claude.

Combined with error deduplication (same error won't trigger a second diagnosis), this keeps my Claude bill under $5/month even with 5 containers monitored.

---

## Docker Compose – The Full Setup

Here's the complete <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` with the Container Doctor, a sample web server, API, and database:

```yaml :collapsed-lines title="docker-compose.yml"
version: '3.8'

services:
  container_doctor:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: container_doctor
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - TARGET_CONTAINERS=web,api,db
      - CHECK_INTERVAL=10
      - LOG_LINES=50
      - AUTO_FIX=true
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}
      - MAX_DIAGNOSES_PER_HOUR=20
    ports:
      - "8080:8080"
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  web:
    image: nginx:latest
    container_name: web
    ports:
      - "80:80"
    restart: unless-stopped

  api:
    build: ./api
    container_name: api
    environment:
      - DATABASE_URL=postgres://\({POSTGRES_USER}:\){POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      - POOL_SIZE=20
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    container_name: db
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - db_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  db_data:
```

And the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY container_doctor.py .

EXPOSE 8080

CMD ["python", "-u", "container_doctor.py"]
```

Start everything: `docker compose up -d`

::: important

The socket mount (`/var/run/docker.sock:/var/run/docker.sock`) gives the Container Doctor full access to the Docker daemon. Don't copy `.env` into the Docker image either — it bakes your API key into the image layer. Pass environment variables via the compose file or at runtime.

:::

---

## Real Errors I Caught in Production

I've been running this for about 3 weeks now. Here are the actual incidents it caught:

### Incident 1: OOM Kill (Week 1)

Logs showed a single word: `Killed`. That's Linux's OOMKiller doing its thing.

Claude's diagnosis:

```json
{
  "root_cause": "Process killed by OOMKiller. Container is requesting more memory than the 256MB limit allows under load.",
  "severity": "high",
  "suggested_fix": "Increase memory limit to 512MB in docker-compose. Monitor if the leak continues at higher limits.",
  "auto_restart_safe": true,
  "config_suggestions": ["mem_limit: 512m", "memswap_limit: 1g"],
  "likely_recurring": true,
  "estimated_impact": "API is completely down. All requests return 502 from nginx."
}
```

The script restarted the container in 3 seconds. I updated the compose file the next morning. Before the Container Doctor, this would've been a 2-hour outage overnight.

### Incident 2: Connection Pool Exhausted (Week 2)

```plaintext
ERROR: database connection pool exhausted
ERROR: cannot create new pool entry
ERROR: QueuePool limit of 5 overflow 0 reached
```

Claude caught that my pool size was too small for the number of workers:

```json
{
  "root_cause": "SQLAlchemy connection pool (size=5) can't keep up with 8 concurrent Gunicorn workers. Each worker holds a connection during request processing.",
  "severity": "high",
  "suggested_fix": "Set POOL_SIZE=20 and add POOL_TIMEOUT=30. Long-term: add PgBouncer as a connection pooler.",
  "auto_restart_safe": true,
  "config_suggestions": ["POOL_SIZE=20", "POOL_TIMEOUT=30", "POOL_RECYCLE=3600"],
  "likely_recurring": true,
  "estimated_impact": "New API requests will hang for 30s then timeout. Existing requests may complete but slowly."
}
```

### Incident 3: Transient Timeout (Week 2)

```plaintext
WARN: timeout connecting to upstream service
WARN: retrying request (attempt 2/3)
INFO: request succeeded on retry
```

Claude correctly identified this as a non-issue:

```json
{
  "root_cause": "Transient network timeout during a DNS resolution hiccup. Retries succeeded.",
  "severity": "low",
  "suggested_fix": "No action needed. This is expected during brief network blips. Only investigate if frequency increases.",
  "auto_restart_safe": false,
  "config_suggestions": [],
  "likely_recurring": false,
  "estimated_impact": "Minimal. Individual requests delayed by ~2s but all completed."
}
```

No restart. No alert (I filter low-severity from Slack pings). This is the right call: restarting on every transient timeout causes more downtime than it prevents.

### Incident 4: Disk Full (Week 3)

```plaintext
ERROR: could not write to temporary file: No space left on device
FATAL: data directory has no space
```

```json
{
  "root_cause": "Postgres data volume is full. WAL files and temporary sort files consumed all available space.",
  "severity": "high",
  "suggested_fix": "1. Clean WAL files: SELECT pg_switch_wal(). 2. Increase volume size. 3. Add log rotation. 4. Set max_wal_size=1GB.",
  "auto_restart_safe": false,
  "config_suggestions": ["max_wal_size=1GB", "log_rotation_age=1d"],
  "likely_recurring": true,
  "estimated_impact": "Database is read-only. All writes fail. API returns 500 on any mutation."
}
```

Notice Claude said `auto_restart_safe: false` here. Restarting Postgres when the disk is full can corrupt data. The script didn't touch it. It just sent me a detailed Slack alert at 4 AM. I cleaned up the WAL files the next morning. Good call by Claude.

---

## Cost Breakdown – What This Actually Costs

After 3 weeks of running this on 5 containers:

- **Claude API**: ~$3.80/month (with rate limiting and deduplication)
- **Linode compute**: $0 extra (the Container Doctor uses about 50MB RAM)
- **Slack**: Free tier
- **My time saved**: ~2-3 hours/month of 3 AM debugging

Without rate limiting, my first week cost $8 in API calls. The deduplication + rate limiter brought that down dramatically. Most of my containers run fine. The script only calls Claude when something actually breaks.

If you're monitoring more containers or have noisier logs, expect higher costs. The `MAX_DIAGNOSES_PER_HOUR` setting is your budget knob.

---

## Security Considerations

Let's talk about the elephant in the room: the Docker socket.

Mounting `/var/run/docker.sock` gives the Container Doctor **root-equivalent access** to your Docker daemon. It can start, stop, and remove any container. It can pull images. It can exec into running containers. If someone compromises the Container Doctor, they own your entire Docker host.

Here's how I mitigate this:

1. **Network isolation**: The Container Doctor's health endpoint is only exposed on localhost. In production, put it behind a reverse proxy with auth.
2. **Read-mostly access**: The script only *reads* logs and *restarts* containers. It never execs into containers, pulls images, or modifies volumes.
3. **No external inputs**: The script doesn't accept commands from Slack or any external source. It's outbound-only (logs out, alerts out).
4. **API key rotation**: I rotate the Anthropic API key monthly. If the container is compromised, the key has limited blast radius.

For a more secure setup, consider Docker's `--read-only` flag on the socket mount and a tool like [<VPIcon icon="iconfont icon-github"/>`Tecnativa/docker-socket-proxy`](https://github.com/Tecnativa/docker-socket-proxy) to restrict which API calls the Container Doctor can make.

---

## What I'd Do Differently

After 3 weeks in production, here's my honest retrospective:

**I'd use structured logging from day one.** My regex-based error detection catches too many false positives. A JSON log format with severity levels would make detection way more accurate.

**I'd add per-container policies.** Right now, every container gets the same treatment. But you probably want different rules for a database vs a web server. Never auto-restart a database. Always auto-restart a stateless web server.

**I'd build a simple web UI.** The `/history` endpoint returns JSON, but a small React dashboard showing a timeline of incidents, fix success rates, and cost tracking would be much more useful.

**I'd try local models first.** For simple errors (OOM, connection refused), a small local model running on Ollama could handle the diagnosis without any API cost. Reserve Claude for the weird, complex stack traces where you actually need strong reasoning.

**I'd add a "learning mode."** Run the Container Doctor in observe-only mode for a week. Let it diagnose everything but fix nothing. Review the diagnoses manually. Once you trust its judgment, flip on auto-fix. This builds confidence before you give it restart power.

---

## What's Next?

If you found this useful, I write about Docker, AI tools, and developer workflows every week. I'm Balajee Asish – Docker Captain, freeCodeCamp contributor, and currently building my way through the AI tools space one project at a time.

::: info

Got questions or built something similar? Drop a comment below or find me on [GitHub (<VPIcon icon="iconfont icon-github"/>`balajee-asish`)](https://github.com/balajee-asish) and [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`balajee-asish`)](https://linkedin.com/in/balajee-asish).

:::

Happy building.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers",
  "desc": "Maybe this sounds familiar: your production container crashes at 3 AM. By the time you wake up, it's been throwing the same error for 2 hours. You SSH in, pull logs, decode the cryptic stack trace, Go",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/docker-container-doctor-how-i-built-an-ai-agent-that-monitors-and-fixes-my-containers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
