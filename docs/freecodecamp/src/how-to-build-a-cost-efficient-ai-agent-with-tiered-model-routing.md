---
lang: en-US
title: "How to Build a Cost-Efficient AI Agent with Tiered Model Routing"
description: "Article(s) > How to Build a Cost-Efficient AI Agent with Tiered Model Routing"
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
      content: "Article(s) > How to Build a Cost-Efficient AI Agent with Tiered Model Routing"
    - property: og:description
      content: "How to Build a Cost-Efficient AI Agent with Tiered Model Routing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-cost-efficient-ai-agent-with-tiered-model-routing.html
prev: /programming/py/articles/README.md
date: 2026-04-09
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3a60436b-cbd7-4005-8e52-36291d815eea.png
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
  name="How to Build a Cost-Efficient AI Agent with Tiered Model Routing"
  desc="Most AI agent tutorials make the same mistake: they route every task to the most expensive model available. A character count doesn't need GPT-4. A presence check doesn't need Sonnet. A regex doesn't "
  url="https://freecodecamp.org/news/how-to-build-a-cost-efficient-ai-agent-with-tiered-model-routing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3a60436b-cbd7-4005-8e52-36291d815eea.png"/>

Most AI agent tutorials make the same mistake: they route every task to the most expensive model available.

A character count doesn't need GPT-4. A presence check doesn't need Sonnet. A regex doesn't need anything except Python.

The mistake isn't using AI — it's not knowing when to stop using it.

This tutorial shows you how to build a tiered routing system that sends tasks to the cheapest model that can solve them. The pattern is called the cost curve. It comes from a comment thread on a DEV.to article, implemented by three developers over a weekend, and it cut the per-URL cost of a real SEO audit agent from \\(0.006 to effectively \\)0 for most pages.

By the end, you'll have a working `cost_curve.py` module you can drop into any agent project.

::: info What You'll Build

A three-tier routing function that:

- Runs deterministic Python checks first — zero API cost
- Escalates to Claude Haiku only for genuinely ambiguous cases — ~$0.0001 per call
- Escalates to Claude Sonnet only when semantic judgment is required — ~$0.006 per call
- Falls back gracefully when any tier fails
- Returns a consistent result schema regardless of which tier handled the request

The full implementation is part of [<VPIcon icon="iconfont icon-github"/>`dannwaneri/seo-agent`](https://github.com/dannwaneri/seo-agent), an open-core SEO audit agent. The cost curve module is the premium routing layer, and the principle applies to any agent with mixed-complexity tasks.

:::

::: note Prerequisites

- Python 3.11 or higher
- An Anthropic API key
- Basic familiarity with Python and the Claude API

:::

---

## The Problem with Calling Claude on Everything

Here's what most agent code looks like:

```py
def audit_url(snapshot: dict) -> dict:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        messages=[{"role": "user", "content": build_prompt(snapshot)}]
    )
    return parse_response(response)
```

This works. It also calls Sonnet for every URL in the list — including the ones where the title is 142 characters long and the answer is obviously FAIL without any model involvement.

Claude Sonnet 4 is priced at \\(3 per million input tokens and \\)15 per million output tokens. A typical page snapshot is around 500 input tokens. That's \\(0.0015 per URL just for input — before output tokens. Across a 20-URL weekly audit, the total is around \\)0.12. Not expensive. But most of those pages have mechanical SEO issues: missing descriptions, titles over 60 characters, no canonical tag. A character count catches all of that. You don't need a model.

The cost curve fixes this by routing based on what the task actually requires, not on what the model is capable of.

---

## The Cost Curve Explained

In the cost curve, we have three tiers, three tools, and three price points:

### Tier 1 — Deterministic Python. Cost: $0

Check title length, description length, H1 count, canonical presence. These are not judgment calls. They're string operations. If title length > 60, FAIL. No model needed.

### Tier 2 — Claude Haiku. Cost: ~$0.0001 per call

Title present but only 4 characters long. Description present but only 30 characters. Status code is a redirect. These pass the mechanical audit but something is off. Haiku is fast and cheap enough that escalating ambiguous cases costs less than the debugging time you'd spend on false positives.

### Tier 3 — Claude Sonnet. Cost: ~$0.006 per call

Pages Haiku flags as needing semantic judgment. "This title passes length but reads like a navigation label." "This description duplicates the title verbatim." Sonnet earns its cost on genuinely hard cases — not on every URL in the list.

The routing decision happens before any API call. The result schema is identical regardless of which tier handled the request.

---

## Project Setup

```sh
mkdir cost-curve-demo && cd cost-curve-demo
pip install anthropic
```

Set your API key:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
export ANTHROPIC_API_KEY="sk-ant-..."
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

:::

Create <VPIcon icon="fa-brands fa-python"/>`cost_curve.py` — you'll build this module step by step.

---

## Tier 1: Deterministic Python

Tier 1 runs first on every URL. It checks four fields using only Python string operations. There's no API call, no latency, and no cost.

```py :collapsed-lines title="cost_curve.py"
import json
import logging
import os
import re
from datetime import datetime, timezone

import anthropic

logger = logging.getLogger(__name__)

REDIRECT_CODES = {301, 302, 307, 308}

# Fields that trigger Tier 2 escalation
# Title or description present but suspiciously short
AMBIGUOUS_TITLE_MAX = 10   # chars — present but too short to be real
AMBIGUOUS_DESC_MAX = 50    # chars — present but too short to be useful


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _build_result(snapshot: dict, method: str) -> dict:
    """Base result skeleton — same schema regardless of tier."""
    return {
        "url": snapshot.get("final_url", ""),
        "final_url": snapshot.get("final_url", ""),
        "status_code": snapshot.get("status_code"),
        "title": {"value": None, "length": 0, "status": "PASS"},
        "description": {"value": None, "length": 0, "status": "PASS"},
        "h1": {"count": 0, "value": None, "status": "PASS"},
        "canonical": {"value": None, "status": "PASS"},
        "flags": [],
        "human_review": False,
        "audited_at": _now_iso(),
        "method": method,
        "needs_tier3": False,
    }


def tier1_check(snapshot: dict) -> dict:
    """
    Pure Python SEO checks. Zero API calls.

    Returns a result dict with method="deterministic".
    Sets needs_tier3=False always — Tier 1 never escalates to Tier 3 directly.
    Escalation to Tier 2 is decided by the router, not here.
    """
    result = _build_result(snapshot, "deterministic")

    title = snapshot.get("title") or ""
    description = snapshot.get("meta_description") or ""
    h1s = snapshot.get("h1s") or []
    canonical = snapshot.get("canonical") or ""

    # Title check
    result["title"]["value"] = title or None
    result["title"]["length"] = len(title)
    if not title or len(title) > 60:
        result["title"]["status"] = "FAIL"
        msg = "Title is missing" if not title else f"Title is {len(title)} characters (max 60)"
        result["flags"].append(msg)

    # Description check
    result["description"]["value"] = description or None
    result["description"]["length"] = len(description)
    if not description or len(description) > 160:
        result["description"]["status"] = "FAIL"
        msg = "Meta description is missing" if not description else f"Meta description is {len(description)} characters (max 160)"
        result["flags"].append(msg)

    # H1 check
    result["h1"]["count"] = len(h1s)
    result["h1"]["value"] = h1s[0] if h1s else None
    if len(h1s) == 0:
        result["h1"]["status"] = "FAIL"
        result["flags"].append("H1 tag is missing")
    elif len(h1s) > 1:
        result["h1"]["status"] = "FAIL"
        result["flags"].append(f"Multiple H1 tags found ({len(h1s)})")

    # Canonical check
    result["canonical"]["value"] = canonical or None
    if not canonical:
        result["canonical"]["status"] = "FAIL"
        result["flags"].append("Canonical tag is missing")

    return result
```

The key design decision: `tier1_check()` never decides whether to escalate. It just runs the checks and returns. The router decides escalation based on the result.

---

## Tier 2: Claude Haiku for Ambiguous Cases

Tier 2 runs when Tier 1 detects something mechanical but the result might need a second look. A 4-character title present but clearly wrong. A 30-character description that's technically there but useless. A redirect status that needs a human-readable explanation.

Haiku is the right model here. It's fast, cheap (\\(1 input / \\)5 output per million tokens), and sufficient for triage-level judgment. The prompt asks a narrow question: is this ambiguous enough to need Sonnet?

```py :collapsed-lines title="cost_curve.py"
def tier2_check(snapshot: dict) -> dict:
    """
    Claude Haiku call for ambiguous cases.

    Returns result with method="haiku".
    Sets needs_tier3=True if Haiku determines the case needs semantic judgment.
    Falls back to Tier 1 result on API error.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise OSError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)

    title = snapshot.get("title") or ""
    description = snapshot.get("meta_description") or ""
    status_code = snapshot.get("status_code")

    prompt = f"""You are an SEO auditor doing a quick triage check.

Page data:
- Title: {repr(title)} ({len(title)} chars)
- Meta description: {repr(description)} ({len(description)} chars)
- Status code: {status_code}

Answer these two questions with only "yes" or "no":
1. Does this page need semantic judgment beyond simple length/presence checks? 
   (e.g. title is present but clearly wrong, description is present but meaningless)
2. Is the status code a redirect that needs investigation?

Respond in this exact JSON format and nothing else:
{{"needs_tier3": true_or_false, "reason": "one sentence explanation"}}"""

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=150,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text.strip()
        # Strip markdown fences if present
        if raw.startswith("```"):
            lines = raw.splitlines()
            raw = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])
        parsed = json.loads(raw)

        result = _build_result(snapshot, "haiku")
        # Copy Tier 1 field checks — Haiku doesn't redo those
        t1 = tier1_check(snapshot)
        result["title"] = t1["title"]
        result["description"] = t1["description"]
        result["h1"] = t1["h1"]
        result["canonical"] = t1["canonical"]
        result["flags"] = t1["flags"]
        result["needs_tier3"] = parsed.get("needs_tier3", False)
        if result["needs_tier3"]:
            result["flags"].append(f"Escalated to Tier 3: {parsed.get('reason', '')}")

        return result

    except Exception as exc:
        logger.warning("[tier2] Haiku API error: %s — falling back to Tier 1 result", exc)
        fallback = tier1_check(snapshot)
        fallback["method"] = "haiku-fallback"
        return fallback
```

The fallback is the critical piece. If Haiku fails — rate limit, network error, malformed response — the function returns the Tier 1 result rather than crashing. The audit continues. The URL gets flagged with `method="haiku-fallback"` so you can identify it later.

---

## Tier 3: Claude Sonnet for Semantic Judgment

Tier 3 is where the full extraction prompt runs. This is the same call you'd make in a naïve implementation — the difference is that only a small fraction of URLs reach this tier.

```py :collapsed-lines title="cost_curve.py"
def tier3_check(snapshot: dict) -> dict:
    """
    Claude Sonnet call for semantic judgment.

    Returns result with method="sonnet".
    This is the full extraction prompt — same as calling the model directly.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise OSError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=api_key)

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
- title: FAIL if null or length > 60 characters, or if present but clearly not a real title
- description: FAIL if null or length > 160 characters, or if present but meaningless
- h1: FAIL if count is 0 or count > 1
- canonical: FAIL if null
- audited_at: use current UTC time"""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text.strip()
        if raw.startswith("```"):
            lines = raw.splitlines()
            raw = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

        result = json.loads(raw)
        result["method"] = "sonnet"
        result["needs_tier3"] = False
        return result

    except Exception as exc:
        logger.warning("[tier3] Sonnet API error: %s — falling back to Tier 1 result", exc)
        fallback = tier1_check(snapshot)
        fallback["method"] = "sonnet-fallback"
        return fallback
```

Note the prompt addition in Tier 3 that isn't in Tier 1: `"or if present but clearly not a real title"` and `"or if present but meaningless"`. That's the semantic judgment Haiku identified as needed. Tier 3 acts on it.

---

## The Router: audit_url()

The router is the public interface. Everything else is an implementation detail.

```py
def audit_url(snapshot: dict, tiered: bool = False) -> dict:
    """
    Route a page snapshot through the appropriate audit tier.

    Args:
        snapshot: Page data from browser.py — must contain final_url,
                  status_code, title, meta_description, h1s, canonical.
        tiered: If False, delegates directly to Tier 3 (Sonnet).
                If True, routes through the cost curve.

    Returns:
        Audit result dict with method field indicating which tier ran.
    """
    if not tiered:
        # Non-tiered mode: call Sonnet directly, same as v1 behavior
        return tier3_check(snapshot)

    # Tier 1: always runs first
    t1_result = tier1_check(snapshot)

    # Check if escalation to Tier 2 is warranted
    title = snapshot.get("title") or ""
    description = snapshot.get("meta_description") or ""
    status_code = snapshot.get("status_code")

    needs_tier2 = (
        # Title present but suspiciously short
        (title and len(title) < AMBIGUOUS_TITLE_MAX) or
        # Description present but suspiciously short
        (description and len(description) < AMBIGUOUS_DESC_MAX) or
        # Redirect status — may need explanation
        (status_code in REDIRECT_CODES)
    )

    if not needs_tier2:
        # Tier 1 result is definitive — return without any API call
        return t1_result

    # Tier 2: Haiku triage
    t2_result = tier2_check(snapshot)

    if not t2_result.get("needs_tier3", False):
        # Haiku determined no semantic judgment needed
        return t2_result

    # Tier 3: Sonnet for semantic judgment
    return tier3_check(snapshot)
```

The router logic is explicit and readable. Each decision point is a named condition. When `tiered=False`, behavior is identical to the v1 naive implementation — this is the backward compatibility guarantee that lets you add the cost curve incrementally without breaking existing audits.

---

## Graceful Fallback

The fallback pattern appears in both Tier 2 and Tier 3. It's worth making explicit:

```py
# Pattern used in both tier2_check() and tier3_check()
except Exception as exc:
    logger.warning("[tierN] API error: %s — falling back to Tier 1 result", exc)
    fallback = tier1_check(snapshot)
    fallback["method"] = "tierN-fallback"
    return fallback
```

Three things this does:

1. Logs the error with enough context to debug later
2. Returns a valid result — the Tier 1 deterministic check always runs regardless
3. Tags the result with the fallback method so you can filter these in your report

An agent that crashes on API errors is not production-ready. An agent that degrades gracefully and continues is.

---

## Testing the Cost Curve

Create <VPIcon icon="fa-brands fa-python"/>`test_cost_curve.py` to verify routing behavior without live API calls:

```py title="test_cost_curve.py"
import json
from unittest import mock

from cost_curve import audit_url, tier1_check


def make_snapshot(title="Normal Title Under 60 Chars",
                  description="A normal meta description that is under 160 characters and describes the page content well.",
                  h1s=["Single H1"],
                  canonical="https://example.com/page",
                  status_code=200,
                  final_url="https://example.com/page"):
    return {
        "title": title,
        "meta_description": description,
        "h1s": h1s,
        "canonical": canonical,
        "status_code": status_code,
        "final_url": final_url,
    }


def test_clean_page_returns_tier1_no_api_calls():
    """Clean page: all checks pass deterministically — no API call."""
    snapshot = make_snapshot()
    with mock.patch("anthropic.Anthropic") as mock_client:
        result = audit_url(snapshot, tiered=True)
        assert result["method"] == "deterministic"
        mock_client.assert_not_called()
    print("PASS: clean page → Tier 1, zero API calls")


def test_long_title_returns_tier1_fail_no_api_call():
    """Title >60 chars: FAIL from Tier 1, no API call."""
    snapshot = make_snapshot(title="A" * 70)
    with mock.patch("anthropic.Anthropic") as mock_client:
        result = audit_url(snapshot, tiered=True)
        assert result["method"] == "deterministic"
        assert result["title"]["status"] == "FAIL"
        mock_client.assert_not_called()
    print("PASS: title >60 → Tier 1 FAIL, zero API calls")


def test_suspiciously_short_title_escalates_to_tier2():
    """Title present but 4 chars: escalates to Tier 2."""
    snapshot = make_snapshot(title="SEO")  # 3 chars — under AMBIGUOUS_TITLE_MAX
    mock_response = mock.MagicMock()
    mock_response.content = [mock.MagicMock(
        text='{"needs_tier3": false, "reason": "title is short but not ambiguous"}'
    )]
    with mock.patch("anthropic.Anthropic") as mock_client:
        mock_client.return_value.messages.create.return_value = mock_response
        result = audit_url(snapshot, tiered=True)
        assert result["method"] == "haiku"
        assert mock_client.return_value.messages.create.call_count == 1
    print("PASS: short title → Tier 2 (Haiku called once)")


def test_tiered_false_calls_sonnet_directly():
    """tiered=False: Sonnet called regardless of snapshot content."""
    snapshot = make_snapshot()  # clean page, would be Tier 1 in tiered mode
    mock_response = mock.MagicMock()
    mock_response.content = [mock.MagicMock(text=json.dumps({
        "url": "https://example.com/page",
        "final_url": "https://example.com/page",
        "status_code": 200,
        "title": {"value": "Normal Title Under 60 Chars", "length": 27, "status": "PASS"},
        "description": {"value": "desc", "length": 4, "status": "PASS"},
        "h1": {"count": 1, "value": "Single H1", "status": "PASS"},
        "canonical": {"value": "https://example.com/page", "status": "PASS"},
        "flags": [],
        "human_review": False,
        "audited_at": "2026-04-01T00:00:00+00:00",
    }))]
    with mock.patch("anthropic.Anthropic") as mock_client:
        mock_client.return_value.messages.create.return_value = mock_response
        result = audit_url(snapshot, tiered=False)
        assert result["method"] == "sonnet"
        assert mock_client.return_value.messages.create.call_count == 1
    print("PASS: tiered=False → Sonnet called directly")


def test_haiku_api_failure_falls_back_to_tier1():
    """Haiku failure: falls back to Tier 1 result, no crash."""
    snapshot = make_snapshot(title="SEO")  # triggers Tier 2
    with mock.patch("anthropic.Anthropic") as mock_client:
        mock_client.return_value.messages.create.side_effect = Exception("rate limit")
        result = audit_url(snapshot, tiered=True)
        assert result["method"] == "haiku-fallback"
    print("PASS: Haiku failure → fallback to Tier 1, no crash")


if __name__ == "__main__":
    test_clean_page_returns_tier1_no_api_calls()
    test_long_title_returns_tier1_fail_no_api_call()
    test_suspiciously_short_title_escalates_to_tier2()
    test_tiered_false_calls_sonnet_directly()
    test_haiku_api_failure_falls_back_to_tier1()
    print("\nAll tests passed.")
```

Run it:

```sh
python test_cost_curve.py
#
# PASS: clean page → Tier 1, zero API calls
# PASS: title >60 → Tier 1 FAIL, zero API calls
# PASS: short title → Tier 2 (Haiku called once)
# PASS: tiered=False → Sonnet called directly
# PASS: Haiku failure → fallback to Tier 1, no crash
```

---

## Applying This Pattern to Your Agent

The cost curve is not SEO-specific. Any agent with mixed-complexity tasks can use it.

The principle: classify tasks by what they actually require before deciding which model to invoke.

### Customer support agent

- Tier 1: keyword matching for known FAQ topics — no model
- Tier 2: Haiku for intent classification on ambiguous queries
- Tier 3: Sonnet for complex complaints requiring judgment

### Code review agent

- Tier 1: lint rules, syntax checks — no model
- Tier 2: Haiku for common pattern detection
- Tier 3: Sonnet for architectural review

### Content moderation agent

- Tier 1: blocklist matching — no model
- Tier 2: Haiku for borderline cases
- Tier 3: Sonnet for context-dependent judgment

The implementation pattern is the same in all three cases. The `audit_url()` router becomes `route_task()`. The tier functions change their prompts and escalation conditions. The fallback logic stays identical.

The key question to ask before writing any agent code: what fraction of my inputs are mechanically solvable? That fraction goes to Tier 1. The rest escalate. The cost curve routes everything else.

---

## Wrapping Up

The full implementation — including the SEO audit agent that uses this module in production — is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/seo-agent`](https://github.com/dannwaneri/seo-agent). The `core/` directory is MIT licensed. The tiered routing lives in `premium/cost_curve.py`.

::: info

This tutorial is the companion piece to [I Was Paying \\(0.006 Per URL for SEO Audits Until I Realized Most Needed \\)0 (<VPIcon icon="fa-brands fa-dev" />`dannwaneri`)](https://dev.to/dannwaneri/i-was-paying-0006-per-url-for-seo-audits-until-i-realized-most-needed-0-132j) on DEV.to, which covers the architecture decisions behind the cost curve.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Cost-Efficient AI Agent with Tiered Model Routing",
  "desc": "Most AI agent tutorials make the same mistake: they route every task to the most expensive model available. A character count doesn't need GPT-4. A presence check doesn't need Sonnet. A regex doesn't ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-cost-efficient-ai-agent-with-tiered-model-routing.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
