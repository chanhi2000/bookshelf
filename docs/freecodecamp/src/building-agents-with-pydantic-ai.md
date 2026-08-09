---
lang: en-US
title: "How to Build Production-Grade Agents with Pydantic AI"
description: "Article(s) > How to Build Production-Grade Agents with Pydantic AI"
icon: iconfont icon-pydantic
category:
  - Python
  - Pydantic
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pydantic
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Production-Grade Agents with Pydantic AI"
    - property: og:description
      content: "How to Build Production-Grade Agents with Pydantic AI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/building-agents-with-pydantic-ai.html
prev: /programming/py-pydantic/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Jay Mehta
    url: https://freecodecamp.org/news/author/jay87mehta/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/39375594-36fd-4ef4-9b5f-c2fcd3fd5197.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pydantic > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pydantic/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build Production-Grade Agents with Pydantic AI"
  desc="Building AI agents with raw LLM SDKs works fine for prototypes until you need structured outputs, testable code, and production reliability. The gap shows up in a predictable way. Your notebook code w"
  url="https://freecodecamp.org/news/building-agents-with-pydantic-ai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/39375594-36fd-4ef4-9b5f-c2fcd3fd5197.png"/>

Building AI agents with raw LLM SDKs works fine for prototypes until you need structured outputs, testable code, and production reliability.

The gap shows up in a predictable way. Your notebook code works, so you move it toward production and start patching: a try/except around json.loads, a helper to strip markdown fences, a few if statements to check field types, a retry loop, a dispatch function mapping tool names to callables. None of these are hard on their own. Together, they become the majority of your codebase, and the actual agent logic disappears under the glue.

This article walks through six of those problems in the order you'd hit them, and shows how Pydantic AI solves each one, with code:

1. Unstructured outputs require brittle parsing — your output schema lives in an English prompt string, disconnected from the dict your code expects.
2. Tool definitions are boilerplate-heavy — ~70 lines of hand-written JSON schema and dispatch code for three tools, with nothing keeping the schema in sync with your function signatures.
3. No clean way to pass runtime context — once the framework calls your tools, you can't hand them a database connection or a user ID without reaching for globals or closures.
4. Testing requires real LLM calls — every test costs money, takes seconds, needs network access, and flakes.
5. Retry and validation logic is hand-rolled — you rewrite the same validate/re-prompt/retry pattern in every agent you build.
6. Switching models means rewriting integration code — each provider has a different SDK shape, tool format, and response structure.

We'll use one running example throughout: a receipt analysis agent. It takes raw receipt text (what you'd get from a photo-to-text scan), calls tools to look up merchant categories and exchange rates, and returns a typed summary — merchant, spending category, itemized breakdown, and a confidence score — that a budgeting dashboard or expense tool can consume directly. Structured input, tool calls for lookups, typed output for downstream systems. It's a common enough shape that the problems it surfaces will look familiar.

By the end you'll have a working agent with typed outputs, dependency-injected tools, business-rule validation with automatic retry, and a test suite that runs in milliseconds without an API key.

---

## A Quick Word on Pydantic AI

Pydantic is Python based data validation library. You define a schema as a normal Python class with type hints, and Pydantic enforces it at runtime — coercing types where sensible, rejecting what doesn't fit, and raising precise errors that name the offending field

```py
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str
    amount: float = Field(gt=0)

Item(name="Espresso", amount="2.50")  # → amount=2.5, coerced
Item(name="Espresso", amount=-1)      # → ValidationError: amount must be > 0
```

Pydantic AI is an agent framework that handles the LLM boundary — turning your models into provider-native schema requests, parsing and validating what comes back, generating tool definitions from function signatures, injecting dependencies, and retrying on validation failure. Your agent logic stays Python; the framework handles the translation in both directions.

::: note Prerequisites

This article assumes you're comfortable with:

- **Python 3.10+** — type hints, dataclasses, async/await
- **LLM API basics** — you've made at least a few calls to OpenAI, Anthropic, or similar SDKs
- **Agent concepts** — you understand what an AI agent is (LLM + tools + reasoning loop). If not, start with [<VPIcon icon="fas fa-globe"/>AI Agents — A Builder's Guide](https://jay-g-mehta.github.io/ai-agents)

You don't need prior experience with Pydantic AI. We'll build up from scratch.

:::

---

## The Problem: Building Agents Without a Framework

To expose and explain these problems better, we'll use a running example: a receipt analysis agent. It takes raw receipt text (what you'd get from a photo-to-text scan), categorizes spending, looks up merchant info, and returns a structured summary. This gives you the merchant name, spending category, itemized breakdown, and a confidence score. Downstream systems (a budgeting dashboard, an expense report tool) consume this structured output directly.

This is a common real-world pattern: structured input, tool calls for lookups, and typed output for downstream systems. Let's see what building it looks like with raw OpenAI SDK calls.

---

## Problem 1: Unstructured Outputs Require Brittle Parsing

At its core, every interaction with an LLM is just text in, text out. Your entire contract with the model (the input data, the goal, and the desired output format) is crammed into a single text prompt. There's no schema, type system, or compiler enforcing correctness. You describe what you want in English and hope the model complies.

Here's the straightforward implementation using the OpenAI SDK. Notice how the system prompt has to encode the input context, the task instruction, *and* the output schema all in one blob of text:

```py :collapsed-lines
import json
from openai import OpenAI

client = OpenAI()

def analyze_receipt(receipt_text: str) -> dict:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": """Analyze this receipt and return JSON:
{
    "merchant": "string",
    "category": "one of: food, transport, utilities, entertainment, shopping, other",
    "total": float,
    "currency": "string",
    "items": [{"name": "string", "amount": float}],
    "is_business_expense": bool,
    "confidence": float between 0 and 1
}"""},
            {"role": "user", "content": receipt_text}
        ]
    )

    raw = response.choices[0].message.content

    # Parse the response
    try:
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1].rsplit("```", 1)[0]
        result = json.loads(raw)
    except json.JSONDecodeError:
        raise ValueError(f"LLM returned invalid JSON: {raw[:200]}")

    # Validate fields manually
    allowed_categories = {"food", "transport", "utilities", "entertainment", "shopping", "other"}
    if result.get("category") not in allowed_categories:
        result["category"] = "other"

    return result
```

This code is clean and readable, and it works in your notebook. But the fundamental issue is that your entire contract with the LLM (the input, goal, and output format) lives in an unstructured string. There's nothing enforcing that contract on either side.

If you push it toward production, the problems start to surface:

- **The prompt _is_ the schema, and it's just English:** The system prompt describes the output format in natural language. There's nothing connecting that description to the `dict` your code actually expects. Add a field to the prompt and forget to handle it downstream, and you don't get an error until production.
- **The LLM doesn't always return clean JSON:** It wraps output in ` ```json ``` ` fences, adds explanatory text before/after, includes trailing commas, or returns a partial response on timeout. Your parsing code handles one case (fences) but not the others.
- **There's no real validation:** Is `total` actually a number, or did the LLM return the string `"$45.99"`? Is `confidence` between 0 and 1, or did it return `95` (percent)? Does the `items` list contain dicts with the right keys? You'd have to check all of this manually.
- **Failures are silent or catastrophic:** The category fallback (`result["category"] = "other"`) hides a problem that should trigger a retry. The `json.loads` failure raises an exception with no path to recovery.

What we actually need is a way to define the output schema once, in code, as a typed data structure, not an English description in a prompt string. The schema should be the single source of truth for both the LLM and the consuming code.

We also need the framework to enforce the schema automatically and validate the LLM's response against the type definitions, with proper errors on mismatch.

And finally, we need retry on validation failure without manual logic. If the output doesn't match the schema, re-prompt the LLM with the validation error so it can self-correct.

In short: the output format should be a *contract* expressed in the type system, not a *suggestion* expressed in English.

### How Pydantic AI Solves This

Pydantic AI lets you define the output as a Pydantic model. The framework handles schema generation, prompt injection, JSON parsing, validation, and retry. And this is all derived from that single model definition:

```py :collapsed-lines
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from enum import Enum


class SpendingCategory(str, Enum):
    FOOD = "food"
    TRANSPORT = "transport"
    UTILITIES = "utilities"
    ENTERTAINMENT = "entertainment"
    SHOPPING = "shopping"
    OTHER = "other"


class LineItem(BaseModel):
    name: str
    amount: float


class ReceiptAnalysis(BaseModel):
    merchant: str
    category: SpendingCategory
    total: float = Field(gt=0)
    currency: str = Field(min_length=3, max_length=3)
    items: list[LineItem]
    is_business_expense: bool
    confidence: float = Field(ge=0, le=1)


receipt_agent = Agent(
    "openai:gpt-4o",
    output_type=ReceiptAnalysis,
    system_prompt="Analyze the provided receipt and extract structured details.",
)

result = receipt_agent.run_sync("CAFE PARIS\n€12.50\nCroissant x2 €5.00\nEspresso €2.50\nCroque Monsieur €5.00")
print(result.output)
# merchant='CAFE PARIS' category=<SpendingCategory.FOOD: 'food'> total=12.5 ...
```

So what's different here?

First, the schema is the model. `ReceiptAnalysis` defines the fields, types, and constraints. Pydantic AI converts this into the appropriate JSON schema for the LLM and validates the response against it. One definition, used everywhere.

Second, there's no parsing of code. You don't strip markdown fences, call `json.loads`, or catch `JSONDecodeError`. The framework handles all of that.

Also, validation is real. `Field(ge=0, le=1)` on `confidence` means a value of `95` is rejected, not silently accepted. `SpendingCategory` as an Enum means only valid categories are allowed with no fallback masking.

Finally, retry is automatic. If the LLM returns output that fails validation, Pydantic AI sends the validation error back to the model and asks it to correct itself. There's no hand-rolled retry loop.

The function returns a `ReceiptAnalysis` object: typed, validated, and IDE-autocomplete-friendly. Not a `dict` you hope has the right keys.

#### What happens beneath the surface

When you define `output_type=ReceiptAnalysis`, Pydantic AI does a few key things on each agent run.

On the way in, it generates a JSON schema from your Pydantic model and injects it into the LLM request. Depending on the model provider, this uses the native structured output / tool-call mechanism (OpenAI's `response_format`, Anthropic's tool-use, and so on) so the LLM knows *exactly* what structure to produce.

On the way back, it takes the LLM's raw response, parses it against the Pydantic model, and runs full validation (type coercion, field constraints, and enum membership). If validation fails, it feeds the error message back into the conversation and asks the LLM to correct its output (automatically, up to a configurable retry limit).

```md
┌──────────────────────────────────────────────────────────────────────┐
│                    Pydantic AI — Structured Output Flow              │
│                                                                      │
│  ┌────────────────┐         ┌──────────────────────────────────┐     │
│  │  Your Code     │         │  Pydantic AI Framework           │     │
│  │                │         │                                  │     │
│  │  output_type = │────────>│  1. Generate JSON schema from    │     │
│  │  ReceiptAnalysis         │     ReceiptAnalysis model        │     │
│  │                │         │                                  │     │
│  └────────────────┘         │  2. Inject schema into LLM      │     │
│                             │     request (provider-native     │     │
│                             │     format: response_format,     │     │
│                             │     tool_call, etc.)             │     │
│                             │              │                   │     │
│                             └──────────────┼───────────────────┘     │
│                                            ▼                         │
│                             ┌──────────────────────────────────┐     │
│                             │           LLM                    │     │
│                             │  Sees schema → produces JSON     │     │
│                             └──────────────┬───────────────────┘     │
│                                            │                         │
│                                            ▼                         │
│                             ┌──────────────────────────────────┐     │
│                             │  Pydantic AI Framework           │     │
│                             │                                  │     │
│                             │  3. Parse raw LLM response       │     │
│                             │  4. Validate against model:      │     │
│                             │     - Type checks                │     │
│                             │     - Field constraints (ge, le) │     │
│                             │     - Enum membership            │     │
│                             │              │                   │     │
│                             │         ┌────┴────┐              │     │
│                             │         │         │              │     │
│                             │      PASS ✓    FAIL ✗            │     │
│                             │         │         │              │     │
│                             │         ▼         ▼              │     │
│                             │  Return typed  Send validation   │     │
│                             │  object        error back to LLM │     │
│                             │                for self-correct   │     │
│                             │                (auto-retry)       │     │
│                             └──────────────────────────────────┘     │
│                                            │                         │
│                                            ▼                         │
│                             ┌──────────────────────────────────┐     │
│                             │  Your Code receives:             │     │
│                             │  result.output → ReceiptAnalysis │     │
│                             │  (typed, validated, ready to use)│     │
│                             └──────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
```
<!-- TODO: mermaid화-->

You define the contract once as a Python class. The framework handles both sides of the LLM boundary, telling the model what to produce and verifying that it did.

---

## Problem 2: Tool Definitions are Boilerplate-Heavy

Your receipt agent needs tools that let it look up merchant categories, check exchange rates, and query spending history.

Here's what that would look like with raw function calling:

```py :collapsed-lines
tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_merchant_category",
            "description": "Look up the spending category for a merchant name",
            "parameters": {
                "type": "object",
                "properties": {
                    "merchant_name": {
                        "type": "string",
                        "description": "The merchant name from the receipt"
                    }
                },
                "required": ["merchant_name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_exchange_rate",
            "description": "Get current exchange rate between two currencies",
            "parameters": {
                "type": "object",
                "properties": {
                    "from_currency": {
                        "type": "string",
                        "description": "Source currency code (e.g., EUR)"
                    },
                    "to_currency": {
                        "type": "string",
                        "description": "Target currency code (e.g., USD)"
                    }
                },
                "required": ["from_currency", "to_currency"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_spending_history",
            "description": "Get spending totals by category for a date range",
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "description": "Spending category"
                    },
                    "days": {
                        "type": "integer",
                        "description": "Number of past days to query"
                    }
                },
                "required": ["category", "days"]
            }
        }
    }
]


# Then you ALSO need to write the dispatch logic:
def handle_tool_call(tool_call):
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)

    if name == "lookup_merchant_category":
        return lookup_merchant_category(args["merchant_name"])
    elif name == "get_exchange_rate":
        return get_exchange_rate(args["from_currency"], args["to_currency"])
    elif name == "get_spending_history":
        return get_spending_history(args["category"], args["days"])
    else:
        raise ValueError(f"Unknown tool: {name}")
```

For three tools, you've written ~70 lines of JSON schema plus dispatch code. The schema is disconnected from the actual function signatures: change a parameter name in the function and forget to update the schema, and it silently breaks at runtime.

### What the Solution Should Look Like

Instead, the tool definition should be derived from the function itself. The function's name, docstring, and type hints already describe what the tool does and what arguments it takes. That should be enough.

It should also be automatically kept in sync. If you rename a parameter or change its type, the schema sent to the LLM should update without you touching a second file.

And it should be dispatch-free. The framework should call the right function directly. No manual if/elif chain mapping string names to callables.

### How Pydantic AI Solves This

In Pydantic AI, a tool is just a function with a decorator. The framework generates the JSON schema from the function's signature and docstring, and handles dispatch automatically:

```py :collapsed-lines
from pydantic_ai import Agent, RunContext

receipt_agent = Agent(
    "openai:gpt-4o",
    output_type=ReceiptAnalysis,
    system_prompt="Analyze the provided receipt and extract structured details.",
)


@receipt_agent.tool_plain
def lookup_merchant_category(merchant_name: str) -> str:
    """Look up the spending category for a merchant name."""
    # Your actual implementation
    categories_db = {"CAFE PARIS": "food", "UBER": "transport", "NETFLIX": "entertainment"}
    return categories_db.get(merchant_name.upper(), "other")


@receipt_agent.tool_plain
def get_exchange_rate(from_currency: str, to_currency: str) -> float:
    """Get current exchange rate between two currencies."""
    # Your actual implementation — call an API, hit a cache, etc.
    rates = {"EUR_USD": 1.08, "GBP_USD": 1.27}
    return rates.get(f"{from_currency}_{to_currency}", 1.0)


@receipt_agent.tool_plain
def get_spending_history(category: str, days: int) -> dict:
    """Get spending totals by category for a date range."""
    # Your actual implementation
    return {"category": category, "total": 142.50, "transaction_count": 12}
```

That's it. No JSON schema dictionaries. No dispatch function. The same three tools in ~25 lines instead of ~70. What the framework does for you:

- **Schema generation from type hints:** `merchant_name: str` becomes `{"type": "string"}` in the JSON schema. The docstring becomes the tool's `description`. Parameter names become property names. It's all derived from what you already wrote.
- **Automatic dispatch:** When the LLM calls `get_exchange_rate`, the framework routes to the decorated function directly. No string matching and no manual mapping.
- **Sync guaranteed:** Rename `from_currency` to `source_currency` in the function signature and the schema updates automatically on the next run. There's no second place to forget.

---

## Problem 3: No Clean Way to Pass Runtime Context

With automatic dispatch (Problem 2), the framework calls your tool functions, not you. You no longer control the call site, so you can't just pass `db` or `user_id` as extra arguments.

And those aren't things the LLM should provide either. You need a side-channel to deliver runtime dependencies into tools that the framework invokes on your behalf.

Without that mechanism, you end up with something like this:

```py
# Option A: Global state (untestable, unsafe)
db = get_database_connection()
current_user = None  # Set somewhere else... hopefully before tools run

def get_spending_history(category: str, days: int) -> dict:
    # Uses global `db` and `current_user` — how do you test this?
    # How do you run two users concurrently?
    return db.query(
        "SELECT sum(amount) FROM transactions WHERE user_id = ? AND category = ? AND date > ?",
        current_user.id, category, days_ago(days)
    )


# Option B: Closure-based (awkward, deeply nested)
def make_tools(db, user):
    def get_spending_history(category: str, days: int) -> dict:
        return db.query(...)  # Captures db and user from enclosing scope

    def lookup_merchant_category(merchant_name: str) -> str:
        return db.query(...)  # Same closure trick

    return [get_spending_history, lookup_merchant_category]

# Every time you add a dependency, you restructure the closure nesting
```

Both approaches make testing painful. You can't easily swap in a mock database or a test user without restructuring the code.

### What the Solution Should Look Like

For a better solution, you should declare what your tools need. Express dependencies (DB, HTTP client, user session) as typed requirements that are separate from tool arguments the LLM provides.

You should also inject at runtime, not definition time. Pass the concrete instances when you run the agent, not when you define the tools. This keeps tool definitions pure and reusable.

And swap dependencies for testing. Substitute a real database with an in-memory mock, or a real user with a test fixture, without changing tool code.

### How Pydantic AI Solves This

Pydantic AI has a first-class dependency injection system. You define a `deps_type` on the agent, and tools receive those dependencies via a typed `RunContext`, with no globals or closures:

```py :collapsed-lines
from dataclasses import dataclass
from pydantic_ai import Agent, RunContext

@dataclass
class ReceiptDeps:
    db: DatabaseClient
    user_id: str
    http_client: HttpClient


receipt_agent = Agent(
    "openai:gpt-4o",
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
)


@receipt_agent.tool
def get_spending_history(ctx: RunContext[ReceiptDeps], category: str, days: int) -> dict:
    """Get spending totals by category for a date range."""
    return ctx.deps.db.query(
        "SELECT sum(amount), count(*) FROM transactions WHERE user_id = ? AND category = ? AND date > ?",
        ctx.deps.user_id, category, days_ago(days)
    )


@receipt_agent.tool
def get_exchange_rate(ctx: RunContext[ReceiptDeps], from_currency: str, to_currency: str) -> float:
    """Get current exchange rate between two currencies."""
    response = ctx.deps.http_client.get(f"/rates/{from_currency}/{to_currency}")
    return response.json()["rate"]


# At runtime — pass real dependencies
result = receipt_agent.run_sync(
    "CAFE PARIS\n€12.50\nCroissant x2",
    deps=ReceiptDeps(
        db=get_database_connection(),
        user_id="user_123",
        http_client=HttpClient(base_url="https://api.exchangerate.host"),
    ),
)

# In tests — swap with mocks, no code changes to tools
result = receipt_agent.run_sync(
    "CAFE PARIS\n€12.50\nCroissant x2",
    deps=ReceiptDeps(
        db=InMemoryDb(fake_transactions),
        user_id="test_user",
        http_client=MockHttpClient(fixed_rate=1.08),
    ),
)
```

::: info What this gives you

- **Tools declare what they need, not how to get it:** `ctx.deps.db` is typed. Your IDE autocompletes methods on it, and a type checker catches misuse. The tool doesn't know or care whether it's a real Postgres connection or a test mock.
- **No globals, no closures:** Dependencies flow in explicitly at `run_sync()` time. Two concurrent users get two separate `ReceiptDeps` instances with no shared mutable state.
- **Testing is trivial:** Swap `DatabaseClient` for `InMemoryDb`, and swap `HttpClient` for `MockHttpClient`. The tool code is unchanged. There's no monkeypatching, dependency injection frameworks, or test fixtures reaching into module-level state.
- **The LLM never sees dependencies:** `RunContext` isn't exposed as a tool parameter. The LLM only sees `category` and `days`. The framework strips it out of the schema automatically.

:::

---

## Problem 4: Testing Requires Real LLM Calls

You want to verify that your agent handles edge cases: receipts in foreign currencies, missing merchant names, or ambiguous categories. But every test hits the real API:

```py
def test_foreign_currency_receipt():
    # This test:
    # - Costs money (API call)
    # - Takes 2-5 seconds
    # - Is non-deterministic (might pass today, fail tomorrow)
    # - Requires network access (breaks in CI without secrets)
    result = analyze_receipt("CAFÉ PARIS\n€12.50\nCroissant x2")
    assert result["currency"] == "EUR"
    assert result["category"] == "food"  # Might return "dining" instead — flaky!
```

You can't run this in CI reliably. You can't run 50 edge case tests without burning through your API budget. You end up with either no tests or integration tests that flake.

### What the Solution Should Look Like

First, swap the LLM for a deterministic stand-in — something that returns predictable, controlled responses so tests are fast, free, and repeatable.

Next, keep the agent logic intact. The test should exercise the real tool dispatch, validation, and output parsing. Only the model is faked.

Finally, assert on behavior, not LLM wording. Verify that the right tools were called with the right arguments, and that the output matches the expected structure.

### How Pydantic AI Solves This

Pydantic AI provides `TestModel` and `FunctionModel`. These are drop-in model replacements that let you control exactly what the "LLM" returns, without network calls:

```py :collapsed-lines
from pydantic_ai import Agent
from pydantic_ai.models.test import TestModel
from pydantic_ai.models.function import FunctionModel


# TestModel — returns a predictable, schema-valid response automatically
def test_receipt_analysis_structure():
    """Test that the agent returns a valid ReceiptAnalysis object."""
    with receipt_agent.override(model=TestModel()):
        result = receipt_agent.run_sync(
            "CAFE PARIS\n€12.50\nCroissant x2",
            deps=ReceiptDeps(
                db=InMemoryDb(fake_transactions),
                user_id="test_user",
                http_client=MockHttpClient(fixed_rate=1.08),
            ),
        )
        # TestModel fills fields with valid dummy data matching the schema
        assert isinstance(result.output, ReceiptAnalysis)
        assert 0 <= result.output.confidence <= 1


# FunctionModel — you control the exact response for specific scenarios
def test_foreign_currency_triggers_exchange_rate_tool():
    """Test that a EUR receipt causes the agent to call get_exchange_rate."""

    def mock_model(messages, info):
        # Simulate the LLM deciding to call the exchange rate tool
        return ModelResponse(
            tool_calls=[ToolCall(name="get_exchange_rate", args={"from_currency": "EUR", "to_currency": "USD"})]
        )

    with receipt_agent.override(model=FunctionModel(mock_model)):
        result = receipt_agent.run_sync(
            "CAFE PARIS\n€12.50\nCroissant x2",
            deps=ReceiptDeps(
                db=InMemoryDb(fake_transactions),
                user_id="test_user",
                http_client=MockHttpClient(fixed_rate=1.08),
            ),
        )
        # Assert the exchange rate tool was actually invoked
        tool_calls = [msg for msg in result.all_messages() if hasattr(msg, "tool_name")]
        assert any(tc.tool_name == "get_exchange_rate" for tc in tool_calls)
```

This is helpful, because it's fast and free: there's no API calls, network, or tokens burned. Tests run in milliseconds.

It's also deterministic, meaning for the same input, you get the same output, every time. There are no flaky tests due to LLM temperature or wording changes.

The real agent logic also still runs. Tool dispatch, dependency injection, and output validation are all exercised. Only the model is swapped.

It's also CI-friendly. You don't need any API keys in your CI environment, and there are no secrets to manage or rate limits to hit.

You also get two levels of control. You have `TestModel` for "does the plumbing work?" tests. And you have `FunctionModel` for "does the agent make the right decisions?" tests where you script specific LLM behaviors.

---

## Problem 5: Retry and Validation Logic is Hand-rolled

When the LLM returns a bad response, you need to retry. But the retry logic gets complex fast:

```py
def analyze_receipt_with_retry(receipt_text: str, max_retries: int = 3) -> dict:
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(...)
            raw = response.choices[0].message.content
            result = json.loads(strip_markdown(raw))

            # Validate
            if not isinstance(result.get("total"), (int, float)):
                raise ValueError("total must be numeric")
            if result.get("confidence", 0) > 1 or result.get("confidence", 0) < 0:
                raise ValueError("confidence must be 0-1")
            if result.get("category") not in ALLOWED_CATEGORIES:
                raise ValueError(f"invalid category: {result.get('category')}")

            return result

        except (json.JSONDecodeError, ValueError, KeyError) as e:
            if attempt == max_retries - 1:
                raise
            # Should we feed the error back to the LLM? Modify the prompt?
            # How do we track which attempts failed and why?
            continue

    raise RuntimeError("Should not reach here")
```

Every agent you build needs this same retry/validate/re-prompt pattern, and you rewrite it each time. The logic for feeding validation errors back to the LLM (so it can self-correct) adds another layer of complexity.

### What the Solution Should Look Like

First, validation should be declarative: that is, defined by the output schema, not by hand-written if-statements scattered through your code.

Second, retry should be automatic. If the output fails validation, the framework should re-prompt the LLM with the error message so it can self-correct.

And custom validation should plug in cleanly. For business rules beyond type checks (for example, "if category is 'other', confidence must be below 0.8"), you should be able to add validators without rewriting the retry loop.

### How Pydantic AI Solves This

Schema-level validation is already handled by the Pydantic model (as shown in Problem 1). But for business logic validation, Pydantic AI provides `result_validator`. This is a decorator that runs after parsing and can trigger an automatic retry:

```py
from pydantic_ai import Agent, RunContext, ModelRetry


receipt_agent = Agent(
    "openai:gpt-4o",
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
    retries=3,  # Max retry attempts on validation failure
)


@receipt_agent.result_validator
def validate_receipt_analysis(ctx: RunContext[ReceiptDeps], result: ReceiptAnalysis) -> ReceiptAnalysis:
    """Business logic validation — runs after schema validation passes."""

    # Rule: if total doesn't match sum of items, ask LLM to fix it
    items_sum = sum(item.amount for item in result.items)
    if abs(result.total - items_sum) > 0.01:
        raise ModelRetry(
            f"Total ({result.total}) doesn't match sum of items ({items_sum}). "
            f"Please recheck the receipt and correct either the total or the item amounts."
        )

    # Rule: low confidence + "other" category likely means the LLM gave up — retry
    if result.category == SpendingCategory.OTHER and result.confidence < 0.5:
        raise ModelRetry(
            "Category is 'other' with low confidence. Look more carefully at the "
            "merchant name and items to determine a more specific category."
        )

    return result
```

Here's what happens when validation fails:

```plaintext
┌─────────────────────────────────────────────────────────────┐
│  Automatic Retry Flow                                       │
│                                                             │
│  LLM response                                               │
│       │                                                     │
│       ▼                                                     │
│  Schema validation (Pydantic model)                         │
│       │                                                     │
│       ├── FAIL → error message sent back to LLM → retry     │
│       │                                                     │
│       ▼                                                     │
│  result_validator (your business rules)                     │
│       │                                                     │
│       ├── ModelRetry raised → message sent to LLM → retry   │
│       │                                                     │
│       ▼                                                     │
│  PASS → return typed result                                 │
└─────────────────────────────────────────────────────────────┘
```
<!-- TODO: mermaid화 -->

- Schema violations (wrong type, missing field, enum mismatch) is caught by Pydantic automatically. The validation error is sent back to the LLM as context so it knows *what* to fix.
- Business rule violations are caught by your `result_validator`. `ModelRetry` sends your custom message to the LLM, guiding it toward a correct response.
- There's no retry loop in your code. The `retries=3` parameter controls max attempts. The framework handles the loop, the re-prompting, and the error message formatting.

---

## Problem 6: Switching Models Means Rewriting Integration Code

Your agent works with OpenAI. Now you want to try Anthropic (cheaper for your use case) or run locally with Ollama (for data privacy). Each provider has a different SDK, tool-calling format, and response structure:

```py
# OpenAI
response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools  # OpenAI tool format
)
tool_calls = response.choices[0].message.tool_calls

# Anthropic — completely different API shape
response = anthropic_client.messages.create(
    model="claude-sonnet-4-20250514",
    messages=messages,
    tools=anthropic_tools  # Different format than OpenAI!
)
tool_use_blocks = [b for b in response.content if b.type == "tool_use"]

# Google — yet another shape
response = genai_client.generate_content(
    contents=messages,
    tools=google_tools  # Yet another format!
)
function_calls = response.candidates[0].content.parts
```

You end up with provider-specific code paths, adapter layers, and the agent logic gets buried under integration glue.

### What the Solution Should Look Like

Start by defining the agent logic once. Your tools, output types, system prompts, and validation should be model-independent.

You should also be able to switch models by changing a string, not by rewriting SDK calls, tool schemas, or response parsing.

And you should keep provider-specific details hidden. The framework should translate your universal agent definition into whatever format each provider expects.

### How Pydantic AI Solves This

The agent definition is entirely model-agnostic. The model is just a string identifier: change it and everything else stays the same:

```py :collapsed-lines
# Your agent definition — tools, output type, deps, validators — all unchanged
receipt_agent = Agent(
    "openai:gpt-4o",  # ← this is the only line that changes
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
)

# Switch to Anthropic — same agent, same tools, same output type
receipt_agent = Agent(
    "anthropic:claude-sonnet-4-20250514",
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
)

# Switch to a local model via Ollama
receipt_agent = Agent(
    "ollama:llama3.1",
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
)

# Or make it configurable at runtime
import os

receipt_agent = Agent(
    os.getenv("RECEIPT_AGENT_MODEL", "openai:gpt-4o"),
    output_type=ReceiptAnalysis,
    deps_type=ReceiptDeps,
    system_prompt="Analyze the provided receipt and extract structured details.",
)
```

::: info What the framework handles behind the scenes

- **Tool schema translation:** Your `@receipt_agent.tool` functions are converted to OpenAI's `tools` format, Anthropic's `tools` format, or Google's `function_declarations` — whichever the chosen provider expects. You never see the difference.
- **Response normalization:** Whether the model returns `choices[0].message.tool_calls` (OpenAI), `content[].type == "tool_use"` (Anthropic), or `candidates[0].content.parts` (Google), the framework normalizes it into a consistent internal representation.
- **Provider-specific features handled transparently:** Each provider implements structured output mode, streaming, and token counting differently. The framework adapts without exposing the differences to your code.

:::

One agent definition, any model. Swap via config or environment variable.

---

## Wrapping Up

Every problem in this article comes from the same place: an LLM call is text in, text out, while the code on either side of it is typed. The raw-SDK approach bridges that gap with hand-written glue — a fence stripper, a chain of if checks, a dispatch table, a retry loop. Each piece is easy. Together they outgrow the agent logic they surround, and you own all of them.

Pydantic AI closes the gap by making the boundary a declared contract. Here's what that bought us, section by section:

| Problem | Raw SDK | Pydantic AI |
| --- | --- | --- |
| Structured output | Schema described in English, parsed by hand | `output_type=ReceiptAnalysis` — schema generated, response validated |
| Tool definitions | ~70 lines of JSON schema + dispatch | `@agent.tool_plain` on a typed function |
| Runtime context | Globals or nested closures | `deps_type` + `RunContext`, injected per run |
| Testing | Real API calls: slow, paid, flaky | `TestModel` / `FunctionModel`, no network |
| Retry & validation | Hand-rolled loop, error discarded | Field constraints + `ModelRetry`, error fed back to the model |
| Model switching | Per-provider SDK and parsing code | One string: `"openai:gpt-4o"` → `"anthropic:claude-sonnet-4-20250514"` |

The receipt agent we ended up with is a Pydantic model, a handful of typed functions, a deps dataclass, and one validator. No parsing, no dispatch, no retry loop.

The [<VPIcon icon="fas fa-globe"/>Pydantic AI docs](https://ai.pydantic.dev/) are short and worth reading end to end; everything here maps onto their API reference.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Production-Grade Agents with Pydantic AI",
  "desc": "Building AI agents with raw LLM SDKs works fine for prototypes until you need structured outputs, testable code, and production reliability. The gap shows up in a predictable way. Your notebook code w",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/building-agents-with-pydantic-ai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
