---
lang: en-US
title: "How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails"
description: "Article(s) > How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails"
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
      content: "Article(s) > How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails"
    - property: og:description
      content: "How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-safe-agent-loop-from-exit-conditions-to-audit-trails.html
prev: /programming/py/articles/README.md
date: 2026-06-16
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e135008490269cb3022acbf/0b4027d7-f2d5-42d6-bdc5-5eeec278425d.png
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
  name="How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails"
  desc="In July 2025, a Claude Code recursion loop burned between 16,000 USD and 50,000 USD in five hours. There was no crash or error, just agents doing exactly what they were told, indefinitely, because nob"
  url="https://freecodecamp.org/news/how-to-build-a-production-safe-agent-loop-from-exit-conditions-to-audit-trails"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e135008490269cb3022acbf/0b4027d7-f2d5-42d6-bdc5-5eeec278425d.png"/>

In July 2025, a Claude Code recursion loop burned between 16,000 USD and 50,000 USD in five hours. There was no crash or error, just agents doing exactly what they were told, indefinitely, because nobody told them when to stop.

Four months later, a four-agent LangChain loop ran for eleven days and cost 47,000 USD. Nobody noticed until the invoice arrived. The pipeline worked correctly in testing, and the agents were doing exactly what they were told. Same pattern.

This tutorial is about that missing instruction.

You'll build five small Python primitives that catch most agent loop failures before they ship:

- A **spec writer** that forces you to define done before the loop starts
- A **circuit breaker** that kills the loop when it exceeds hard limits
- A **ledger** that records every turn in an append-only SQLite audit trail
- An **agent loop** that ties all three together
- A **review surface** that forces human attestation before downstream systems receive anything

By the end you'll have a working repo you can drop into any agent project. The full code is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/production-safe-agent-loop`](https://github.com/dannwaneri/production-safe-agent-loop).

---

## Why This Keeps Happening

The math that got companies into trouble was simple. A chatbot costs roughly 0.04 USD per interaction. An orchestrated multi-agent workflow costs 1.20 USD. That's a 30x multiplier — and production benchmarks show it can reach 70x on complex tasks.

The problem isn't that agents are expensive. The problem is that most teams budgeted for chatbot costs and deployed agent architectures. Gartner found the token consumption gap between pilot chatbots and production agent workflows sits at 5-30x. The FinOps Foundation's 2026 State of FinOps report found 73% of enterprises say AI costs exceeded original projections.

The mechanism is straightforward once you see it. When an agent fails a task and retries, it doesn't start fresh. It re-reads the entire context window — every prior failed attempt — before trying again. Iteration one costs 100 tokens. Iteration two costs 200. Iteration ten costs thousands. You're paying for every failure, over and over, in milliseconds.

```py
# This is the entire problem in three lines
while True:
    result = agent.run(task)
    # done when...?
```

That question mark is where the money goes.

The other thing making it worse: agents don't fail loudly. Traditional code hits an undefined state and crashes. An LLM hits ambiguity and tries to be helpful. It retries. It reformats the tool call. It spins up a verification agent. The verification agent finds something. A correction agent fires. Nobody defined what "correct" means. The loop looks beautiful on every dashboard you have — activity, tool calls, completion rate — while quietly burning through your budget.

Gartner predicts that 40% of agentic projects will be scrapped by 2027 due to economic failure. Most of that failure is preventable. Not with better models, but with exit conditions.

::: note Prerequisites

- Python 3.10+
- An Anthropic API key (or any provider — more on that later)
- Basic familiarity with Python classes and SQLite

```sh
git clone https://github.com/dannwaneri/production-safe-agent-loop
cd production-safe-agent-loop
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-...
```

:::

---

## Phase 1: Define Done Before You Build

The most expensive mistake in agent development isn't a bad model choice or a missing retry limit. It's starting the build before you can answer one question in one sentence:

**What does done look like?**

Most teams can't answer it. Not because they're careless, but because nothing forces them to before they open the terminal. The spec writer is that forcing function.

```py title="spec_writer.py"
from spec_writer import SpecWriter

spec = SpecWriter(db_path="spec.db").run()
```

When you call `.run()`, it won't return until you've answered three questions:

1. What does this do?
2. What does this NOT do?
3. What does done look like in one sentence?

The third question is the one that matters. It's also the hardest. "The agent audits the site" is not an answer. "The agent crawls the target URL, extracts all `<title>` and `<meta description>` tags, flags any missing or over-length, and stops" is an answer. One of those gives the circuit breaker something to enforce.

The spec stores to SQLite and returns a `SpecResult` dataclass with a `session_id`. That ID becomes the thread connecting your spec, your ledger rows, and your loop result. One session, traceable end to end.

```py
@dataclass(frozen=True)
class SpecResult:
    what_it_does: str
    what_it_does_not: str
    done_looks_like: str
    session_id: str
```

`frozen=True` matters. The spec is a commitment, not a draft. Once it's written, the loop runs against it. No mid-run revisions.

For testing, `SpecWriter` accepts injectable `input_fn` and `output_fn` callables. No stdin monkey-patching required. See <VPIcon icon="fas fa-folder-open"/>`tests/test_spec_writer.py` for working examples — the suite uses a small `scripted_input` helper that returns answers from a generator, and writes to a per-test SQLite file via pytest's `tmp_path` fixture. SQLite's `:memory:` isn't safe here, because `SpecWriter` opens a fresh connection per method and each `:memory:` connection is its own isolated database.

---

## Phase 2: Enforce Done at Runtime

Defining the exit condition upstream is discipline. The circuit breaker is enforcement.

```py title="circuit_breaker.py"
from circuit_breaker import CircuitBreaker, CircuitBreakerError

breaker = CircuitBreaker(turn_limit=5, token_limit=15000)
breaker.check(turn_count, accumulated_tokens)  # raises on breach
```

Two ceilings. Both hard.

`turn_limit` caps how many times the loop can call the LLM. `token_limit` caps total token consumption across all turns. Either one tripping raises `CircuitBreakerError` immediately.

The boundary is strict: `turn_count == turn_limit` is allowed. `turn_count == turn_limit + 1` trips. No grace periods or warnings. A hard stop forces a human checkpoint.

```py :collapsed-lines
from dataclasses import dataclass

@dataclass
class CircuitBreakerError(Exception):
    reason: str          # "turn_ceiling" or "token_ceiling"
    turn_count: int
    accumulated_tokens: int

    def __post_init__(self) -> None:
        super().__init__(
            f"circuit breaker tripped: {self.reason} "
            f"(turn={self.turn_count}, tokens={self.accumulated_tokens})"
        )


class CircuitBreaker:
    def __init__(self, turn_limit: int = 5, token_limit: int = 15000) -> None:
        self.turn_limit = turn_limit
        self.token_limit = token_limit

    def check(self, turn_count: int, accumulated_tokens: int) -> None:
        if turn_count > self.turn_limit:
            self._trip("turn_ceiling", turn_count, accumulated_tokens)
        if accumulated_tokens > self.token_limit:
            self._trip("token_ceiling", turn_count, accumulated_tokens)

    def _trip(self, reason: str, turn_count: int, accumulated_tokens: int) -> None:
        print(
            "\n=== CIRCUIT BREAKER CHECKPOINT ===\n"
            f"reason         : {reason}\n"
            f"turn_count     : {turn_count} / limit {self.turn_limit}\n"
            f"tokens_used    : {accumulated_tokens} / limit {self.token_limit}\n"
            "action         : halt loop, surface to human reviewer\n"
            "=================================="
        )
        raise CircuitBreakerError(
            reason=reason,
            turn_count=turn_count,
            accumulated_tokens=accumulated_tokens,
        )
```

`CircuitBreakerError` is an exception, not a return code. That's intentional. A return code can be ignored. An uncaught exception can't. Silent breach is impossible. The human-readable checkpoint banner is printed to stdout by `_trip()` *before* the exception is raised, so even if a caller swallows the exception the operator still sees state.

The critical rule: call `.check()` **before** every LLM call, not after. Post-flight checking means you've already burned the tokens before you knew the limit was exceeded.

```py
# Wrong — post-flight
result = client.messages.create(...)
breaker.check(turn_count, accumulated_tokens)  # too late

# Right — pre-flight
breaker.check(turn_count, accumulated_tokens)  # raises before any spend
result = client.messages.create(...)
```

The defaults (5 turns, 15,000 tokens) match a tight tutorial demo. Your production budget is different. Tune at instantiation:

```py
# Production example — tighter token budget, more turns
breaker = CircuitBreaker(turn_limit=10, token_limit=50000)
```

---

## Phase 3: Record Everything

The circuit breaker protects your bank account. The ledger protects your understanding of what happened.

Most teams log for debugging — they want to know what went wrong after it went wrong. The ledger has a different purpose. It's governance. Every row is proof that the loop stayed within its boundaries, or didn't, and exactly when.

```py title="ledger.py"
from ledger import Ledger

ledger = Ledger(db_path="ledger.db")
ledger.write(
    session_id=spec.session_id,
    turn_count=1,
    state_origin="llm",
    input_str=task,
    token_delta=523,
    execution_time_ms=1240,
    pass_fail=True,
)
```

One row per turn. Append-only, no updates, and no deletes. The immutability is the point: a ledger you can edit isn't a ledger, it's a notebook.

The schema:

```sql
CREATE TABLE IF NOT EXISTS ledger (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id         TEXT    NOT NULL,
    turn_count         INTEGER NOT NULL,
    state_origin       TEXT    NOT NULL,
    input_hash         TEXT    NOT NULL,
    token_delta        INTEGER NOT NULL,
    execution_time_ms  INTEGER NOT NULL,
    pass_fail          INTEGER NOT NULL,  -- 1=pass, 0=fail
    breach_reason      TEXT,              -- NULL unless circuit breaker fired
    created_at         TEXT    NOT NULL   -- ISO 8601, UTC
);
CREATE INDEX IF NOT EXISTS idx_ledger_session ON ledger(session_id);
```

The index makes `get_session(session_id)` — the primary read path — a constant-time lookup as the ledger grows.

Three decisions worth explaining:

1. `input_hash` **not** `input_text`**.** The raw input string never persists. Only its SHA-256 hash does. There are two benefits to this: identical inputs across runs are detectable, and PII never enters the audit trail.
2. `pass_fail` **as** `INTEGER` **not** `BOOLEAN`**.** SQLite has no boolean type. `1` and `0` are canonical. Clean Python ergonomics at the API edge, correct SQL types on disk.
3. `created_at` **as** `datetime.now(timezone.utc).isoformat()`**.** `datetime.utcnow()` was deprecated in Python 3.12. Timezone-aware timestamps avoid the footgun in any system that crosses timezones.

Retrieve by session:

```py
rows = ledger.get_session(spec.session_id)
for row in rows:
    print(f"Turn {row.turn_count}: {'PASS' if row.pass_fail else 'FAIL'} "
          f"| {row.token_delta} tokens | {row.execution_time_ms}ms")
```

---

## Phase 4: The Loop That Respects Its Boundaries

The agent loop wires the three primitives together. It's the only component that calls the LLM. Everything else is local.

```py title="agent_loop.py"
from agent_loop import AgentLoop

loop = AgentLoop(spec, breaker, ledger, client)
result = loop.run(task)
# LoopResult(success, turns, total_tokens, session_id, breach_reason)
```

The anatomy of a turn, in order:

1. `circuit_breaker.check(turn_count, accumulated_tokens)` — raises if either ceiling is exceeded
2. `client.messages.create(...)` — the actual LLM call
3. `ledger.write(...)` — one row, append-only
4. If `stop_reason == "end_turn"`, return. Otherwise loop.

Pre-flight checking before every LLM call, with no exceptions.

```py :collapsed-lines
def run(self, task: str) -> LoopResult:
    session_id = self.spec.session_id
    messages: list[dict] = [{"role": "user", "content": task}]
    turn = 0
    total_tokens = 0

    try:
        while True:
            turn += 1
            self.circuit_breaker.check(turn, total_tokens)

            started = time.perf_counter()
            response = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                system=self._system_prompt(),
                messages=messages,
            )
            elapsed_ms = int((time.perf_counter() - started) * 1000)

            turn_tokens = (
                getattr(response.usage, "input_tokens", 0)
                + getattr(response.usage, "output_tokens", 0)
            )
            total_tokens += turn_tokens

            text = self._text_from(response)
            messages.append({"role": "assistant", "content": text})

            self.ledger.write(
                session_id=session_id,
                turn_count=turn,
                state_origin="llm",
                input_str=task,
                token_delta=turn_tokens,
                execution_time_ms=elapsed_ms,
                pass_fail=True,
            )

            if getattr(response, "stop_reason", "end_turn") == "end_turn":
                return LoopResult(
                    success=True,
                    turns=turn,
                    total_tokens=total_tokens,
                    session_id=session_id,
                )

            messages.append({"role": "user", "content": "continue"})

    except CircuitBreakerError as err:
        self.ledger.write(
            session_id=session_id,
            turn_count=turn,
            state_origin="circuit_breaker",
            input_str=task,
            token_delta=0,
            execution_time_ms=0,
            pass_fail=False,
            breach_reason=err.reason,
        )
        return LoopResult(
            success=False,
            turns=turn,
            total_tokens=total_tokens,
            session_id=session_id,
            breach_reason=err.reason,
        )

def _system_prompt(self) -> str:
    return (
        "You are an agent working on a tightly-scoped task.\n\n"
        f"What this does: {self.spec.what_it_does}\n"
        f"What this does NOT do: {self.spec.what_it_does_not}\n"
        f"Done looks like: {self.spec.done_looks_like}\n"
    )

@staticmethod
def _text_from(response) -> str:
    content = getattr(response, "content", None)
    if not content:
        return ""
    block = content[0]
    return getattr(block, "text", "") or ""
```

A few choices worth calling out in this body:

- **The whole `while True:` is wrapped in one `try/except CircuitBreakerError`.** The check happens at the top of every turn, so a breach is caught the same way whether it fires on turn 1 or turn 6.
- `input_str=task` on every ledger row — the original task, not the last assistant message. The `input_hash` column then groups rows that share the same starting input across the run.
- `pass_fail=True` **for every LLM turn that returns**, `False` only on breach. The pass/fail flag tracks whether the loop *reached* the row legitimately, not whether the model's output was good. Quality scoring is a separate concern.
- `_system_prompt()` **uses all three spec fields**, not just `done_looks_like`. The model needs the negative scope (`what_it_does_not`) at least as much as the positive scope.
- `time.perf_counter()` **not** `time.time()` — monotonic, immune to wall-clock adjustments mid-run.

`LoopResult.session_id` is inherited from `spec.session_id`. The ledger rows tie back to the spec without a join. One session ID, one traceable run, start to finish.

---

## Phase 5: The Review Surface

The circuit breaker protects your bank account. The ledger records what happened. But neither tells you whether what happened matched what you promised.

That gap is where bad loops get approved. Polished output, green dashboard, missed commitment. A reviewer sees the artifact, decides it looks acceptable, and signs off. Nobody asked whether the original promise was kept.

The review surface closes that gap. It reads the session from SQLite, assembles the five-element frame, and forces a comparison before anything downstream receives the output.

```py
from review_surface import ReviewSurface

rs = ReviewSurface(spec_db_path="spec.db", ledger_db_path="ledger.db")
print(rs.render(session_id))
```

Here's the five-element frame, in order:

1. **Original promise** — pulled from the spec table: what it does, what it doesn't do, what done looks like
2. **Acceptance criteria** — the `done_looks_like` field rendered as the explicit benchmark
3. **Diff** — first turn input vs final turn output, turns completed, total tokens, whether the loop breached
4. **Evidence** — all ledger rows for the session: turn-by-turn pass/fail, token delta, execution time
5. **Unresolved assumptions** — derived from breach rows and failed turns. Empty when clean.

When the reviewer is satisfied, they attest:

```py
attestation = rs.attest(
    session_id=result.session_id,
    reviewer="daniel",
    notes="Output matches spec. Approved."
)
print(attestation.frame_hash)
```

`.attest()` writes to the `attestations` table in `ledger.db`. The `frame_hash` is a SHA-256 of the canonical frame data — deterministic across reviewers attesting the same session. It's the audit receipt. It proves the reviewer saw the exact frame as rendered, not a summary or a paraphrase.

Approval confirms the process ran. Attestation confirms the reviewer compared output to commitment. When the loop touches something regulated, those are different legal documents.

```py
@dataclass(frozen=True)
class ReviewFrame:
    session_id: str
    original_promise: SpecResult
    acceptance_criteria: str
    diff: DiffResult
    evidence: tuple  # tuple[LedgerRow, ...]
    unresolved_assumptions: tuple  # tuple[str, ...]
    created_at: str
```

`ReviewFrame` is frozen for the same reason `SpecResult` is — the frame is evidence, not a draft. `evidence` and `unresolved_assumptions` are tuples because lists aren't hashable and frozen dataclasses need hashable fields.

The full end-to-end flow with the review surface lives in `examples/review_example.py` in the repo. Run it after any completed session: it renders the five-element frame, prompts for attestation, and writes the receipt if you approve.

The loop runs to you. Downstream systems get nothing until someone signs.

---

## Phase 6: A Real Example — SEO Audit Agent

The pattern only makes sense against a real problem. This is the same agent architecture behind my [<VPIcon icon="iconfont icon-github"/>`dannwaneri/seo-agent`](https://github.com/dannwaneri/seo-agent) project.

SEO audits have a natural cadence: crawl, surface what's broken, fix, wait for reindex. Running the agent continuously doesn't change that cadence. It just burns tokens in the empty space between the moments that matter. A cron job wired to the loop is the honest architecture.

```py :collapsed-lines title="examples/seo_audit_example.py"
import requests
from bs4 import BeautifulSoup
import anthropic
from spec_writer import SpecWriter
from circuit_breaker import CircuitBreaker
from ledger import Ledger
from agent_loop import AgentLoop

def crawl_url(url: str) -> str:
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    title = soup.find("title")
    meta_desc = soup.find("meta", attrs={"name": "description"})
    h1_tags = soup.find_all("h1")
    return (
        f"URL: {url}\n"
        f"Title: {title.text if title else 'MISSING'}\n"
        f"Meta description: "
        f"{meta_desc['content'] if meta_desc else 'MISSING'}\n"
        f"H1 count: {len(h1_tags)}\n"
        f"H1 tags: {[h.text[:50] for h in h1_tags]}"
    )

def run_seo_audit(url: str) -> None:
    # Step 1: Define done before the loop starts
    spec = SpecWriter(db_path="spec.db").run()

    # Step 2: Initialise circuit breaker and ledger
    breaker = CircuitBreaker(turn_limit=5, token_limit=15000)
    ledger = Ledger(db_path="ledger.db")
    client = anthropic.Anthropic()

    # Step 3: Crawl the URL
    site_data = crawl_url(url)

    # Step 4: Run the loop
    # AgentLoop catches CircuitBreakerError internally and returns
    # LoopResult(success=False, breach_reason=...). Branch on the
    # result — do NOT wrap loop.run() in try/except CircuitBreakerError.
    loop = AgentLoop(spec, breaker, ledger, client)
    result = loop.run(
        f"Audit this page for SEO issues:\n\n{site_data}"
    )

    # Step 5: Print the ledger
    print(f"\nResult: {'SUCCESS' if result.success else 'BREACH'}")
    if not result.success:
        print(f"Breach reason: {result.breach_reason}")
    print(f"Turns: {result.turns} | Tokens: {result.total_tokens}")
    print("\nAudit trail:")
    for row in ledger.get_session(result.session_id):
        status = "PASS" if row.pass_fail else "FAIL"
        print(f"  Turn {row.turn_count}: {status} | "
              f"{row.token_delta} tokens | {row.execution_time_ms}ms")

if __name__ == "__main__":
    import sys
    run_seo_audit(sys.argv[1] if len(sys.argv) > 1 else "https://example.com")
```

Run it:

```sh
python examples/seo_audit_example.py https://yourdomain.com
```

The spec writer prompts you. The loop runs, the circuit breaker fires if the limits are exceeded, and the ledger records every turn. The output lands in front of you and you decide what to fix.

The loop runs to you, not into a void.

---

## Pluggable LLM Client

The loop works with any client that satisfies the `LLMClient` protocol (Anthropic by default). Bring your own via a ~20-line adapter.

```py title="agent_loop.py"
from typing import Protocol, runtime_checkable


@runtime_checkable
class MessagesEndpoint(Protocol):
    def create(self, *, model: str, max_tokens: int,
               system: str, messages: list) -> object: ...


@runtime_checkable
class LLMClient(Protocol):
    messages: MessagesEndpoint
```

`messages` is an instance attribute (not a nested class) because that's how the real Anthropic SDK exposes it — `anthropic.Anthropic().messages.create(...)`. Modeling it as a nested class would mean the real client wouldn't satisfy the Protocol. The `@runtime_checkable` decorator lets you sanity-check conformance with `isinstance(client, LLMClient)`, and the repo's test suite uses exactly that assertion against the `FakeClient` test double.

Here's an OpenAI adapter example (This is illustrative. A production adapter would also map streaming, tool-use, and error shapes.):

```py title="openai_adapter.py"
# illustrative pseudocode, not production-ready.
from openai import OpenAI as _OpenAI


class _MessagesAdapter:
    def __init__(self, client):
        self._client = client

    def create(self, *, model, max_tokens, system, messages):
        completion = self._client.chat.completions.create(
            model=model,
            max_tokens=max_tokens,
            messages=[{"role": "system", "content": system}] + messages,
        )
        # Reshape OpenAI's response into the Anthropic-shaped surface
        # AgentLoop reads: response.usage.{input,output}_tokens,
        # response.content[0].text, response.stop_reason.
        return _adapt_response(completion)


class OpenAIAdapter:
    def __init__(self, api_key: str):
        self._client = _OpenAI(api_key=api_key)
        self.messages = _MessagesAdapter(self._client)  # instance attr, not a nested class
```

The adapter pattern is worth teaching explicitly. Provider APIs don't share a shape. Anthropic puts `system` at the top level. OpenAI puts it inside the messages array. An adapter shim is ~20 lines and makes the loop provider-agnostic without rewriting anything. Note that `self.messages` is assigned in `__init__` so it's a real attribute on each adapter instance, the same shape as the actual SDK.

---

## Running the Tests

```sh
python -m pytest tests/
```

With coverage:

```sh
python -m coverage run --source=circuit_breaker,ledger,spec_writer,agent_loop,review_surface -m pytest tests/
python -m coverage report -m
```

80 tests, 100% coverage on all five core modules. The loop is exercised against a `FakeClient` test double defined inline in <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_agent_loop.py`. It satisfies the `LLMClient` protocol via duck typing: `messages` is set to `self`, so `client.messages.create(...)` routes back to the same object and ships with scripted responses for each test scenario. Clone the repo and run `pytest` to see all 80 tests pass without touching the network or needing an API key.

.<VPIcon icon="fa-brands fa-python"/>`circuit_breaker.py` has 100% coverage — no untested paths. It's the financial safety component. Every path through it is exercised.

---

## What You've Built

In this tutorial, you've build five small primitives, each independently usable.

| Module | Role | Lines |
| --- | --- | --- |
| <VPIcon icon="fa-brands fa-python"/>`spec_writer.py` | Forces three answers before the loop runs | 104 |
| <VPIcon icon="fa-brands fa-python"/>`circuit_breaker.py` | Hard ceilings on turns and tokens | 41 |
| <VPIcon icon="fa-brands fa-python"/>`ledger.py` | Append-only SQLite audit trail | 113 |
| <VPIcon icon="fa-brands fa-python"/>`agent_loop.py` | The loop that respects both | 128 |
| <VPIcon icon="fa-brands fa-python"/>`review_surface.py` | Assembles the five-element frame, records human attestation | 114 |

The pattern: upstream discipline defines the boundaries. Downstream enforcement breaks the circuit. Neither trusts the model to police itself.

A loop that runs without an exit condition isn't autonomous. It's a billing event waiting to happen.

Define what done looks like before you start. That's the job, and always has been.

---

## Next Steps

The repo is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/production-safe-agent-loop`](https://github.com/dannwaneri/production-safe-agent-loop).

There are three natural extensions if you want to go further:

### 1. Graduation to Distributed Systems

The SQLite ledger works for isolated sequential loops. The moment you run multiple agents against shared state, you need serializable isolation — concurrent writes to flat JSON corrupt silently. The README documents the three tipping points where a flat ledger needs to graduate.

### 2. Cryptographic Signing

For compliance-scale systems where the auditor wasn't present when the loop ran, SQLite rows aren't enough. A database admin can run an `UPDATE` query. Ed25519 signing wraps each ledger row in a receipt that proves the log wasn't altered after execution. But that's a different tutorial.

### Wiring a Cron Job

The honest architecture for the SEO audit agent isn't 24/7 autonomous operation. It's a cron job that runs on schedule, surfaces what's broken, and stops. `0 3 * * 2 python examples/seo_audit_example.py https://yourdomain.com` is the whole thing. The loop runs to you, not into a void.

If you need this architecture built for your own stack (circuit breakers, audit trails, production-safe agent loops), I do freelance work. [<VPIcon icon="fas fa-globe"/>dannwaneri.com/ai-agents/](https://dannwaneri.com/ai-agents/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Safe Agent Loop: From Exit Conditions to Audit Trails",
  "desc": "In July 2025, a Claude Code recursion loop burned between 16,000 USD and 50,000 USD in five hours. There was no crash or error, just agents doing exactly what they were told, indefinitely, because nob",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-safe-agent-loop-from-exit-conditions-to-audit-trails.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
