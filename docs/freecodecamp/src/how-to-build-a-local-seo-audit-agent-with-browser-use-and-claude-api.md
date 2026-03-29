---
lang: en-US
title: "How to Build a Local SEO Audit Agent with Browser Use and Claude API"
description: "Article(s) > How to Build a Local SEO Audit Agent with Browser Use and Claude API"
icon: fa-brands fa-python
category:
  - Python
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Local SEO Audit Agent with Browser Use and Claude API"
    - property: og:description
      content: "How to Build a Local SEO Audit Agent with Browser Use and Claude API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-seo-audit-agent-with-browser-use-and-claude-api.html
prev: /programming/py/articles/README.md
date: 2026-03-31
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/98f8eb73-bfe2-4990-b41a-1997a35134f2.png
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

[[toc]]

---

<SiteInfo
  name="How to Build a Local SEO Audit Agent with Browser Use and Claude API"
  desc="Every digital marketing agency has someone whose job involves opening a spreadsheet, visiting each client URL, checking the title tag, meta description, and H1, noting broken links, and pasting everyt"
  url="https://freecodecamp.org/news/how-to-build-a-local-seo-audit-agent-with-browser-use-and-claude-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/98f8eb73-bfe2-4990-b41a-1997a35134f2.png"/>

Every digital marketing agency has someone whose job involves opening a spreadsheet, visiting each client URL, checking the title tag, meta description, and H1, noting broken links, and pasting everything into a report. Then doing it again next week.

That work is deterministic. An agent can do it.

In this tutorial, you'll build a local SEO audit agent from scratch using Python, Browser Use, and the Claude API. The agent visits real pages in a visible browser window, extracts SEO signals using Claude, checks for broken links asynchronously, handles edge cases with a human-in-the-loop pause, and writes a structured report — all resumable if interrupted.

By the end, you'll have a working agent you can run against any list of URLs. It costs less than $0.01 per URL to run.

::: info What You'll Build

A seven-module Python agent that:

- Reads a URL list from a CSV file
- Visits each URL in a real Chromium browser (not a headless scraper)
- Extracts title, meta description, H1s, and canonical tag via Claude API
- Checks for broken links asynchronously using httpx
- Detects edge cases (404s, login walls, redirects) and pauses for human input
- Writes results to `report.json` incrementally — safe to interrupt and resume
- Generates a plain-English `report-summary.txt` on completion

The full code is on GitHub at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/seo-agent`](https://github.com/dannwaneri/seo-agent).

<SiteInfo
  name="dannwaneri/seo-agent"
  desc="Local AI agent that audits URLs for SEO issues using Browser Use + Claude API + Playwright"
  url="https://github.com/dannwaneri/seo-agent/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b684ed3ee51325b63a2b8f9c03e43bc9b41ef529fe34b7fb508b70b8a8e2ed1a/dannwaneri/seo-agent"/>

:::

::: note Prerequisites

- Python 3.11 or higher
- An Anthropic API key (get one at console.anthropic.com)
- Windows, macOS, or Linux
- Basic familiarity with Python and the command line

:::

---

## Why Browser Use Instead of a Scraper

The standard approach to SEO auditing is to fetch page HTML with `requests` and parse it with BeautifulSoup. That works on static pages. It breaks on JavaScript-rendered content, misses dynamically injected meta tags, and fails entirely on authenticated pages.

Browser Use (84,000+ GitHub stars, MIT license) takes a different approach. It controls a real Chromium browser, reads the DOM after JavaScript executes, and exposes the page through Playwright's accessibility tree. The agent sees what a human would see.

The practical difference: a requests-based scraper might miss a meta description injected by a React component. Browser Use won't.

The other difference worth naming: Browser Use reads pages semantically. A Playwright script breaks when a button's CSS class changes from `btn-primary` to `button-main`. Browser Use identifies it's still a "Submit" button and acts accordingly. The extraction logic lives in the Claude prompt, not in brittle CSS selectors.

---

## Project Structure

```sh title="file structure"
seo-agent/
├── index.py          # Main audit loop
├── browser.py        # Browser Use / Playwright page driver
├── extractor.py      # Claude API extraction layer
├── linkchecker.py    # Async broken link checker
├── hitl.py           # Human-in-the-loop pause logic
├── reporter.py       # Report writer
├── state.py          # State persistence (resume on interrupt)
├── input.csv         # Your URL list
├── requirements.txt
├── .env.example
└── .gitignore
```

---

## Setup

Create a project folder and install dependencies:

```sh
mkdir seo-agent && cd seo-agent
pip install browser-use anthropic playwright httpx
playwright install chromium
```

Create <VPIcon icon="fas fa-file-csv"/>`input.csv` with your URLs:

```csv title="input.csv"
url
https://example.com
https://example.com/about
https://example.com/contact
```

Create <VPIcon icon="iconfont icon-dotenv"/>`.env.example`:

```sh title=".env.example"
ANTHROPIC_API_KEY=your-key-here
```

Set your API key as an environment variable before running:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
export ANTHROPIC_API_KEY="sk-ant-..."
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

:::

Create <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```plaintext title=".gitignore"
state.json
report.json
report-summary.txt
.env
__pycache__/
*.pyc
```

---

## Module 1: State Management

The agent needs to track which URLs it has already audited. If the run is interrupted — power cut, keyboard interrupt, network error — it should resume from where it stopped, not start over.

<VPIcon icon="fa-brands fa-python"/>`state.py` handles this with a flat JSON file:

```py :collapsed-lines title="state.py"
import json
import os

STATE_FILE = os.path.join(os.path.dirname(__file__), "state.json")

_DEFAULT_STATE = {"audited": [], "pending": [], "needs_human": []}


def load_state() -> dict:
    if not os.path.exists(STATE_FILE):
        save_state(_DEFAULT_STATE.copy())
    with open(STATE_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_state(state: dict) -> None:
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


def is_audited(url: str) -> bool:
    return url in load_state()["audited"]


def mark_audited(url: str) -> None:
    state = load_state()
    if url not in state["audited"]:
        state["audited"].append(url)
    save_state(state)


def add_to_needs_human(url: str) -> None:
    state = load_state()
    if url not in state["needs_human"]:
        state["needs_human"].append(url)
    save_state(state)
```

The design is intentional: `mark_audited()` is called immediately after a URL is processed and written to the report. If the agent crashes mid-run, it loses at most one URL's work.

---

## Module 2: Browser Integration

`browser.py` does the actual page navigation. It uses Playwright directly (which Browser Use installs as a dependency) to open a visible Chromium window, navigate to the URL, capture HTTP status and redirect information, and extract the raw SEO signals from the DOM.

The key design decisions:

**Visible browser, not headless.** Set `headless=False` so you can watch the agent work. This matters for the demo and for debugging.

**Status capture via response listener.** Playwright raises an exception on 4xx/5xx responses, but the `on("response", ...)` handler fires before the exception. We capture status there.

**2-second delay between visits.** Prevents triggering rate limiting or bot detection on agency client sites.

Here is the core navigation function:

```py
import asyncio
import sys
import time
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

TIMEOUT = 20_000  # 20 seconds


def fetch_page(url: str) -> dict:
    result = {
        "final_url": url,
        "status_code": None,
        "title": None,
        "meta_description": None,
        "h1s": [],
        "canonical": None,
        "raw_links": [],
    }

    first_status = {"code": None}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        def on_response(response):
            if first_status["code"] is None:
                first_status["code"] = response.status

        page.on("response", on_response)

        try:
            page.goto(url, wait_until="domcontentloaded", timeout=TIMEOUT)
            result["status_code"] = first_status["code"] or 200
            result["final_url"] = page.url

            # Extract SEO signals from DOM
            result["title"] = page.title() or None
            result["meta_description"] = page.evaluate(
                "() => { const m = document.querySelector('meta[name=\"description\"]'); "
                "return m ? m.getAttribute('content') : null; }"
            )
            result["h1s"] = page.evaluate(
                "() => Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim())"
            )
            result["canonical"] = page.evaluate(
                "() => { const c = document.querySelector('link[rel=\"canonical\"]'); "
                "return c ? c.getAttribute('href') : null; }"
            )
            result["raw_links"] = page.evaluate(
                "() => Array.from(document.querySelectorAll('a[href]'))"
                ".map(a => a.href).filter(Boolean).slice(0, 100)"
            )

        except PlaywrightTimeout:
            result["status_code"] = first_status["code"] or 408
        except Exception as exc:
            print(f"[browser] Error: {exc}", file=sys.stderr)
            result["status_code"] = first_status["code"]
        finally:
            browser.close()

    time.sleep(2)
    return result
```

::: note A few things worth noting:

The `raw_links` cap at 100 is deliberate. DEV.to profile pages have hundreds of links — you don't need all of them for broken link detection.

The `wait_until="domcontentloaded"` setting is faster than `networkidle` and sufficient for meta tag extraction. JavaScript-rendered content needs the DOM to be ready, not all network requests to complete.

:::

---

## Module 3: Claude Extraction Layer

<VPIcon icon="fa-brands fa-python"/>`extractor.py` takes the raw page snapshot from <VPIcon icon="fa-brands fa-python"/>`browser.py` and calls Claude to produce a structured SEO audit result.

This is where most tutorials go wrong. They either write complex parsing logic in Python (fragile) or ask Claude for a free-form response and try to parse prose (unreliable). The right approach: give Claude a strict JSON schema and tell it to return nothing else.

**The prompt engineering that makes this reliable:**

```py :collapsed-lines
import json
import os
import sys
from datetime import datetime, timezone
import anthropic

MODEL = "claude-sonnet-4-20250514"
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def _strip_fences(text: str) -> str:
    """Remove accidental markdown code fences from Claude's response."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        # Drop opening fence
        lines = lines[1:] if lines[0].startswith("```") else lines
        # Drop closing fence
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text


def extract(snapshot: dict) -> dict:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise OSError("ANTHROPIC_API_KEY is not set.")

    prompt = f"""You are an SEO auditor. Analyze this page snapshot and return ONLY a JSON object.
No prose. No explanation. No markdown fences. Raw JSON only.

Page data:
- URL: {snapshot.get('final_url')}
- Status code: {snapshot.get('status_code')}
- Title: {snapshot.get('title')}
- Meta description: {snapshot.get('meta_description')}
- H1 tags: {snapshot.get('h1s')}
- Canonical: {snapshot.get('canonical')}

Return this exact schema:
{{
  "url": "string",
  "final_url": "string",
  "status_code": number,
  "title": {{"value": "string or null", "length": number, "status": "PASS or FAIL"}},
  "description": {{"value": "string or null", "length": number, "status": "PASS or FAIL"}},
  "h1": {{"count": number, "value": "string or null", "status": "PASS or FAIL"}},
  "canonical": {{"value": "string or null", "status": "PASS or FAIL"}},
  "flags": ["array of strings describing specific issues"],
  "human_review": false,
  "audited_at": "ISO timestamp"
}}

PASS/FAIL rules:
- title: FAIL if null or length > 60 characters
- description: FAIL if null or length > 160 characters  
- h1: FAIL if count is 0 (missing) or count > 1 (multiple)
- canonical: FAIL if null
- flags: list every failing field with a clear description
- audited_at: use current UTC time in ISO 8601 format"""

    response = client.messages.create(
        model=MODEL,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.content[0].text
    clean = _strip_fences(raw)

    try:
        return json.loads(clean)
    except json.JSONDecodeError as exc:
        print(f"[extractor] JSON parse error: {exc}", file=sys.stderr)
        return _error_result(snapshot, str(exc))


def _error_result(snapshot: dict, reason: str) -> dict:
    return {
        "url": snapshot.get("final_url", ""),
        "final_url": snapshot.get("final_url", ""),
        "status_code": snapshot.get("status_code"),
        "title": {"value": None, "length": 0, "status": "ERROR"},
        "description": {"value": None, "length": 0, "status": "ERROR"},
        "h1": {"count": 0, "value": None, "status": "ERROR"},
        "canonical": {"value": None, "status": "ERROR"},
        "flags": [f"Extraction error: {reason}"],
        "human_review": True,
        "audited_at": datetime.now(timezone.utc).isoformat(),
    }
```

Two things make this reliable in production:

First, `_strip_fences()` handles the case where Claude wraps its response in ` ```json` fences despite being told not to. This happens occasionally with Sonnet and consistently breaks `json.loads()` if you don't handle it.

Second, the `_error_result()` fallback means the agent never crashes on a bad Claude response — it logs the error and marks the URL for human review, then continues to the next URL.

::: note Cost

Claude Sonnet 4 is priced at \\(3 per million input tokens and \\)15 per million output tokens. A typical page snapshot is around 500 input tokens; the structured JSON response is around 300 output tokens. That works out to roughly \\(0.006 per URL — about \\)0.12 for a 20-URL audit.

:::

---

## Module 4: Broken Link Checker

<VPIcon icon="fa-brands fa-python"/>`linkchecker.py` takes the `raw_links` list from the browser snapshot and checks same-domain links for broken status using async HEAD requests.

The design choices:

- **Same-domain only.** Checking every external link on a page would take minutes and isn't what agency clients need. Filter to links on the same domain as the page being audited.
- **HEAD requests, not GET.** Faster, lower bandwidth, sufficient for status code detection.
- **Cap at 50 links.** Pages like DEV.to article listings have hundreds of internal links. Checking all of them would dominate the runtime.
- **Concurrent requests via asyncio.** All links are checked in parallel, not sequentially.

```py :collapsed-lines
import asyncio
import logging
from urllib.parse import urlparse
import httpx

CAP = 50
TIMEOUT = 5.0
logger = logging.getLogger(__name__)


def _same_domain(link: str, final_url: str) -> bool:
    if not link:
        return False
    lower = link.strip().lower()
    if lower.startswith(("#", "mailto:", "javascript:", "tel:", "data:")):
        return False
    try:
        page_host = urlparse(final_url).netloc.lower()
        parsed = urlparse(link)
        return parsed.scheme in ("http", "https") and parsed.netloc.lower() == page_host
    except Exception:
        return False


async def _check_link(client: httpx.AsyncClient, url: str) -> tuple[str, bool]:
    try:
        resp = await client.head(url, follow_redirects=True, timeout=TIMEOUT)
        return url, resp.status_code != 200
    except Exception:
        return url, True  # Timeout or connection error = broken


async def _run_checks(links: list[str]) -> list[str]:
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*[_check_link(client, url) for url in links])
    return [url for url, broken in results if broken]


def check_links(raw_links: list[str], final_url: str) -> dict:
    same_domain = [l for l in raw_links if _same_domain(l, final_url)]

    capped = len(same_domain) > CAP
    if capped:
        logger.warning("Page has %d same-domain links — capping at %d.", len(same_domain), CAP)
        same_domain = same_domain[:CAP]

    broken = asyncio.run(_run_checks(same_domain))

    return {
        "broken": broken,
        "count": len(broken),
        "status": "FAIL" if broken else "PASS",
        "capped": capped,
    }
```

---

## Module 5: Human-in-the-Loop

This is the part most automation tutorials skip. What happens when the agent hits a login wall? A page that returns 403? A URL that redirects to a "Subscribe to continue reading" page?

Most scripts either crash or silently skip. Neither is acceptable in an agency context.

`hitl.py` handles this with two functions: one that detects whether a pause is needed, and one that handles the pause itself.

```py
from state import add_to_needs_human

LOGIN_KEYWORDS = {"login", "sign in", "sign-in", "access denied", "log in", "unauthorized"}
REDIRECT_CODES = {301, 302, 307, 308}


def should_pause(snapshot: dict) -> bool:
    code = snapshot.get("status_code")

    # Navigation failed entirely
    if code is None:
        return True

    # Non-200, non-redirect
    if code != 200 and code not in REDIRECT_CODES:
        return True

    # Login wall detection
    title = (snapshot.get("title") or "").lower()
    h1s = [h.lower() for h in (snapshot.get("h1s") or [])]

    if any(kw in title for kw in LOGIN_KEYWORDS):
        return True
    if any(kw in h1 for kw in LOGIN_KEYWORDS for h1 in h1s):
        return True

    return False


def pause_reason(snapshot: dict) -> str:
    code = snapshot.get("status_code")
    if code is None:
        return "Navigation failed (None status)"
    if code != 200 and code not in REDIRECT_CODES:
        return f"Unexpected status code: {code}"
    return "Possible login wall detected"


def pause_and_prompt(url: str, reason: str) -> str:
    print(f"\n⚠️  HUMAN REVIEW NEEDED")
    print(f"   URL:    {url}")
    print(f"   Reason: {reason}")
    print(f"   Options: [s] skip  [r] retry  [q] quit\n")

    while True:
        choice = input("Your choice: ").strip().lower()
        if choice in ("s", "r", "q"):
            return {"s": "skip", "r": "retry", "q": "quit"}[choice]
        print("   Enter s, r, or q.")
```

The `should_pause()` function catches four cases: navigation failure, unexpected HTTP status, login keywords in the title, and login keywords in H1 tags. The login keyword check is what catches "Please sign in to continue" pages that return 200 but are effectively inaccessible.

In `--auto` mode (for scheduled runs), the main loop skips the `pause_and_prompt()` call and automatically handles these cases by logging the URL to `needs_human[]` in state and continuing.

---

## Module 6: Report Writer

<VPIcon icon="fa-brands fa-python"/>`reporter.py` writes results incrementally. This is important: results are written after each URL is audited, not batched at the end. If the run is interrupted, you don't lose completed work.

```py :collapsed-lines
import json
import os
from datetime import datetime, timezone

REPORT_JSON = os.path.join(os.path.dirname(__file__), "report.json")
REPORT_TXT = os.path.join(os.path.dirname(__file__), "report-summary.txt")


def _load_report() -> list:
    if not os.path.exists(REPORT_JSON):
        return []
    with open(REPORT_JSON, encoding="utf-8") as f:
        return json.load(f)


def write_result(result: dict) -> None:
    """Append or update a result in report.json."""
    entries = _load_report()
    url = result.get("url", "")

    # Update existing entry if URL already present (handles retries)
    for i, entry in enumerate(entries):
        if entry.get("url") == url:
            entries[i] = result
            break
    else:
        entries.append(result)

    with open(REPORT_JSON, "w", encoding="utf-8") as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)


def _is_overall_pass(result: dict) -> bool:
    fields = ["title", "description", "h1", "canonical"]
    for field in fields:
        if result.get(field, {}).get("status") not in ("PASS",):
            return False
    if result.get("broken_links", {}).get("status") == "FAIL":
        return False
    return True


def write_summary() -> None:
    entries = _load_report()
    passed = sum(1 for e in entries if _is_overall_pass(e))

    lines = []
    for entry in entries:
        overall = "PASS" if _is_overall_pass(entry) else "FAIL"
        failed_fields = [
            f for f in ["title", "description", "h1", "canonical", "broken_links"]
            if entry.get(f, {}).get("status") == "FAIL"
        ]
        suffix = f" [{', '.join(failed_fields)}]" if failed_fields else ""
        lines.append(f"{entry.get('url', 'unknown'):<60} | {overall}{suffix}")

    lines.append("")
    lines.append(f"{passed}/{len(entries)} URLs passed")

    with open(REPORT_TXT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
```

The deduplication in `write_result()` handles retries cleanly. If a URL is retried after a human reviews a login wall and authenticates, the new result replaces the old one rather than creating a duplicate entry.

---

## Module 7: The Main Loop

<VPIcon icon="fa-brands fa-python"/>`index.py` wires everything together. It reads the URL list, loads state, skips already-audited URLs, and runs the audit loop.

```py title="index.py"
import csv
import os
import sys
import time
import argparse

from state import load_state, is_audited, mark_audited, add_to_needs_human
from browser import fetch_page
from extractor import extract
from linkchecker import check_links
from hitl import should_pause, pause_reason, pause_and_prompt
from reporter import write_result, write_summary

INPUT_CSV = os.path.join(os.path.dirname(__file__), "input.csv")


def read_urls(path: str) -> list[str]:
    with open(path, newline="", encoding="utf-8") as f:
        return [row["url"].strip() for row in csv.DictReader(f) if row.get("url", "").strip()]


def run(auto: bool = False):
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY environment variable is not set.")
        sys.exit(1)

    urls = read_urls(INPUT_CSV)
    pending = [u for u in urls if not is_audited(u)]

    print(f"Starting audit: {len(pending)} pending, {len(urls) - len(pending)} already done.\n")

    total = len(urls)

    try:
        for i, url in enumerate(pending, start=1):
            position = urls.index(url) + 1
            print(f"[{position}/{total}] {url}", end=" -> ", flush=True)

            # Browser navigation
            snapshot = fetch_page(url)

            # Human-in-the-loop check
            if should_pause(snapshot):
                reason = pause_reason(snapshot)

                if auto:
                    print(f"AUTO-SKIPPED ({reason})")
                    add_to_needs_human(url)
                    mark_audited(url)
                    continue

                action = pause_and_prompt(url, reason)
                if action == "quit":
                    print("Exiting.")
                    break
                elif action == "skip":
                    add_to_needs_human(url)
                    mark_audited(url)
                    continue
                # "retry" falls through to re-fetch below
                snapshot = fetch_page(url)

            # Claude extraction
            result = extract(snapshot)

            # Broken link check
            links = check_links(snapshot.get("raw_links", []), snapshot.get("final_url", url))
            result["broken_links"] = links

            # Write result immediately
            write_result(result)
            mark_audited(url)

            overall = "PASS" if all(
                result.get(f, {}).get("status") == "PASS"
                for f in ["title", "description", "h1", "canonical"]
            ) and links["status"] == "PASS" else "FAIL"

            print(overall)

    except KeyboardInterrupt:
        print("\n\nInterrupted. Progress saved. Re-run to continue.")
        return

    write_summary()
    passed = sum(
        1 for e in [r for r in []]
        if all(e.get(f, {}).get("status") == "PASS" for f in ["title", "description", "h1", "canonical"])
    )
    print(f"\nAudit complete. Report saved to report.json and report-summary.txt")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--auto", action="store_true", help="Auto-skip URLs requiring human review")
    args = parser.parse_args()
    run(auto=args.auto)
```

The `KeyboardInterrupt` handler is the resume mechanism. When you press Ctrl+C, the handler prints a message and exits cleanly. Because `mark_audited()` is called after `write_result()` for each URL, the next run skips everything already processed.

---

## Running the Agent

Interactive mode (pauses on edge cases):

```sh
python index.py
```

Auto mode (skips edge cases, adds to `needs_human[]`):

```sh
python index.py --auto
```

When it runs, you'll see the browser window open for each URL and the terminal print progress:

```plaintext
Starting audit: 7 pending, 0 already done.

[1/7] https://example.com -> PASS
[2/7] https://example.com/about -> FAIL
[3/7] https://example.com/contact -> AUTO-SKIPPED (Unexpected status code: 404)
...
Audit complete. Report saved to report.json and report-summary.txt
```

To resume after an interruption:

```sh
python index.py --auto
# Starting audit: 4 pending, 3 already done.
```

---

## Scheduling for Agency Use

For recurring weekly audits, create a batch file and schedule it with Windows Task Scheduler.

Create <VPIcon icon="fas fa-gears"/>`run-audit.bat`:

```batch title="run-audit.bat"
@echo off
set ANTHROPIC_API_KEY=your-key-here
cd /d C:\Users\yourname\Desktop\seo-agent
python index.py --auto
```

In Windows Task Scheduler:

1. Create a new Basic Task
2. Set the trigger to Weekly, Monday at 7:00 AM
3. Set the action to "Start a program"
4. Browse to your <VPIcon icon="fas fa-gears"/>`run-audit.bat` file

Check <VPIcon icon="fas fa-file-lines"/>`report-summary.txt` on Monday morning. URLs in `needs_human[]` in <VPIcon icon="iconfont icon-json"/>`state.json` need manual review — login walls, paywalls, or pages that returned unexpected status codes.

For macOS/Linux, use cron:

```sh
# Run every Monday at 7am
0 7 * * 1 cd /path/to/seo-agent && ANTHROPIC_API_KEY=your-key python index.py --auto
```

---

## What the Results Look Like

I ran this agent against seven of my own published pages across Hashnode, freeCodeCamp, and DEV.to. Every single one failed.

```plaintext
https://hashnode.com/@dannwaneri                    | FAIL [h1]
https://freecodecamp.org/news/claude-code-skill     | FAIL [description]
https://freecodecamp.org/news/stop-letting-ai-guess | FAIL [description]
https://freecodecamp.org/news/rag-system-handbook   | FAIL [title, description]
https://freecodecamp.org/news/author/dannwaneri     | FAIL [description]
https://dev.to/dannwaneri/gatekeeping-panic         | FAIL [title]
https://dev.to/dannwaneri/production-rag-system     | FAIL [title]

0/7 URLs passed
```

The freeCodeCamp description issues are partly platform-level — freeCodeCamp's template sometimes truncates or omits meta descriptions for article listing pages. The DEV.to title issues are mine. Article titles that work as headlines often exceed 60 characters in the `<title>` tag.

A note on the 60-character title rule: this is a display threshold, not a ranking penalty. Google indexes titles of any length. The 60-character guideline reflects approximately how many characters fit in a desktop SERP result before truncation. Titles over 60 characters often still rank — they just get cut off in search results, which can hurt click-through rate. The agent flags display risk, not a ranking violation.

---

## Next Steps

The agent as built handles the core SEO audit workflow. Obvious extensions:

- **Performance metrics**: add a Lighthouse or PageSpeed Insights API call per URL
- **Structured data validation**: check for JSON-LD schema markup and validate it
- **Email delivery**: send <VPIcon icon="fas fa-file-lines"/>`report-summary.txt` via SMTP after the run completes
- **Multi-client support**: separate <VPIcon icon="fas fa-file-csv"/>`input.csv` files per client, separate report directories

::: info

The full code including all seven modules is at [dannwaneri/seo-agent (<VPIcon icon="iconfont icon-github"/>`dannwaneri/seo-agent`)](https://github.com/dannwaneri/seo-agent). Clone it, add your URLs, and run it.

<SiteInfo
  name="dannwaneri/seo-agent"
  desc="Local AI agent that audits URLs for SEO issues using Browser Use + Claude API + Playwright"
  url="https://github.com/dannwaneri/seo-agent/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b684ed3ee51325b63a2b8f9c03e43bc9b41ef529fe34b7fb508b70b8a8e2ed1a/dannwaneri/seo-agent"/>

:::

::: info

If you found this useful, I write about practical AI agent setups for developers and agencies at [<VPIcon icon="fa-brands fa-dev" />`dannwaneri`](https://dev.to/dannwaneri). The DEV.to companion piece covers the design decisions behind the agent — why HITL matters, why Browser Use over scrapers, and what the audit results mean for your own published content.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Local SEO Audit Agent with Browser Use and Claude API",
  "desc": "Every digital marketing agency has someone whose job involves opening a spreadsheet, visiting each client URL, checking the title tag, meta description, and H1, noting broken links, and pasting everyt",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-seo-audit-agent-with-browser-use-and-claude-api.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
