---
lang: en-US
title: "How to Build AI Applications That Switch Models Automatically"
description: "Article(s) > How to Build AI Applications That Switch Models Automatically"
icon: iconfont icon-pydantic
category:
  - Python
  - Pydantic
  - AI
  - LLM
  - Google
  - Google Gemini
  - OpenAI
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
  - google
  - gemini
  - google-gemini
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build AI Applications That Switch Models Automatically"
    - property: og:description
      content: "How to Build AI Applications That Switch Models Automatically"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-applications-that-switch-models-automatically.html
prev: /programming/py-pydantic/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Chidiebere Njoku
    url: https://freecodecamp.org/news/author/chidiebere-njoku/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/521c4138-0d77-4fc3-8c39-8bfc7107a0ed.png
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
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
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
  name="How to Build AI Applications That Switch Models Automatically"
  desc="Large Language Models (LLMs) have fundamentally changed how we build modern software. But relying on a single AI model for every user request creates serious production risks. API outages happen. Prop"
  url="https://freecodecamp.org/news/build-ai-applications-that-switch-models-automatically"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/521c4138-0d77-4fc3-8c39-8bfc7107a0ed.png"/>

Large Language Models (LLMs) have fundamentally changed how we build modern software.

But relying on a single AI model for every user request creates serious production risks. API outages happen. Proprietary models can be expensive for simple tasks. And cheaper open-source models might struggle with complex logical reasoning.

When my team and I built an enterprise-grade AI engine for our customer support platform, we relied on a single top-tier model for everything.

Within a month, we faced two massive issues: a widespread API outage completely froze our app, and our monthly API bill rose because we used expensive reasoning models to answer simple FAQs.

To fix this, I built a resilient, multi-model orchestrator. In this guide, you'll learn how to build an intelligent, multi-tiered AI application using Python that routes prompts dynamically and handles model fallbacks automatically.

---

## Prerequisites and Environment Setup

To follow along with this tutorial, you should have the following setup:

- Basic proficiency with Python and asynchronous programming.
- Python 3.9 or higher installed on your system.
- A code editor such as Visual Studio Code.
- API keys for at least two model providers (for example, OpenAI and Anthropic), or local models running via Ollama.

### Package Installation

Open your terminal and install the required dependencies:

```sh
pip install openai anthropic python-dotenv pydantic
```

### Local Directory Structure

Organize your project directory like this to keep your code clean:

```sh title="file structure"
📂ai-model-router/
├── .env
├── README.md
└── app.py
```

### Environment Configuration

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the root of your project directory and add your credentials:

```sh title=".env"
OPENAI_API_KEY=your_openai_api_key_here ANTHROPIC_API_KEY=your_anthropic_api_key_here ENVIRONMENT=development
```

---

## The Problem with Single-Model Architectures

![A flow diagram illustrating a single-model AI architecture processed by one language model, creating a single point of failure and limiting cost optimization.](https://cdn.hashnode.com/uploads/covers/6a36420b52a5a7620def7e19/cbed7def-7a57-45c9-926a-1d6dce2aabb7.png)

If you route every query to a flagship model like GPT-4o or Claude 3.5 Sonnet, you'd be overspending on simple tasks. Conversely, if you route everything to a smaller, faster model like GPT-4o-mini or Claude 3.5 Haiku to save money, your system will fail when users submit complex code-generation or analytical tasks.

On top of cost concerns, single-model systems suffer from single points of failure. When an API provider goes down or rate-limits your account, your entire application crashes.

To solve this, you need an orchestration layer that evaluates prompt complexity before invoking an LLM, routes the request to the most cost-effective model, and falls back to a secondary provider if the primary provider fails.

---

## Understanding the Dynamic Model Routing Lifecycle

![Flow diagram of a dynamic multi-model AI system with intelligent model selection and automatic failover.](https://cdn.hashnode.com/uploads/covers/6a36420b52a5a7620def7e19/e0bc213c-819b-477d-b0fe-e6dd42fac733.png)

Here's how a user request journeys through a dynamic multi-model system:

First, you have the complexity analysis. The system inspects the incoming prompt using lightweight metrics to assign a task tier (Simple, Medium, or Complex).

Second, you have the model routing. The system maps the tier to the appropriate model (for example, lightweight tasks go to Haiku/Mini while heavy reasoning goes to Sonnet/GPT-4o).

You also have an automatic fallback: if the primary provider times out or throws an API error, the system automatically redirects the query to an equivalent fallback model.

---

## Step 1: Implementing Tier 1 – Prompt Complexity & Intent Analysis

First, you need a deterministic, fast way to classify prompts without making an expensive API call just to decide which model to use.

Before spending money on an LLM API call just to figure out what the user wants, we can look at the text directly in code. Think of this step as a smart gatekeeper. By checking simple things like text length, code snippets, or tricky keywords, we can figure out how hard the task is in milliseconds and for free.

Here's how we set up our classification rules inside <VPIcon icon="fa-brands fa-python"/>`app.py`:

```py :collapsed-lines title="app.py"
import re
from enum import Enum
from pydantic import BaseModel


class TaskComplexity(Enum):
    SIMPLE = "simple"      # FAQs, short summaries, basic translation
    MEDIUM = "medium"      # Standard text generation, content rewriting
    COMPLEX = "complex"    # Code writing, math logic, structural analysis


class PromptAnalyzer:
    def __init__(self):
        # Regex patterns indicative of complex tasks
        self.complex_keywords = [
            r"\brefactor\b",
            r"\bdebug\b",
            r"\bwrite code\b",
            r"\banalyze\b",
            r"\balgorithm\b",
            r"\barchitecture\b",
        ]

    def analyze_complexity(self, prompt: str) -> TaskComplexity:
        """
        Evaluates input text deterministically to output
        a TaskComplexity rating.
        """
        normalized = prompt.lower().strip()
        word_count = len(normalized.split())

        # Check for code blocks or complex request patterns
        contains_code = "```" in prompt
        has_complex_keyword = any(
            re.search(pattern, normalized)
            for pattern in self.complex_keywords
        )

        if contains_code or has_complex_keyword or word_count > 300:
            return TaskComplexity.COMPLEX
        elif word_count > 80:
            return TaskComplexity.MEDIUM
        else:
            return TaskComplexity.SIMPLE


# Example Usage
if __name__ == "__main__":
    analyzer = PromptAnalyzer()

    test_prompt = (
        "Write a Python script that implements a trie "
        "data structure with autocomplete."
    )

    complexity = analyzer.analyze_complexity(test_prompt)
    print(f"Prompt Complexity Tier: {complexity.value}")
```

### Breaking Down the Code Logic for Tier 1

- **`TaskComplexity` Enum:** Defines explicit categories for incoming requests (`SIMPLE`, `MEDIUM`, `COMPLEX`), giving us type safety across our pipeline.
- **Keyword Matching**: The `PromptAnalyzer` class sets up regex patterns looking for action words like `refactor`, `debug`, or `algorithm` that signal a heavy reasoning task.
- **Deterministic Rules in `analyze_complexity`**:
- Formatting & Length Check: We clean the string, check for Markdown code blocks (` ``` `), and calculate word counts.
- Tier Allocation:
  - If the prompt contains code blocks, trigger words, or exceeds 300 words, it immediately escalates to `COMPLEX`.
  - If it is between 80 and 300 words without code keywords, it maps to `MEDIUM`.
  - Anything shorter defaults to `SIMPLE`.

Running this snippet with a complex query checks the text, spots "write code," and outputs:

Prompt Complexity Tier: complex

---

## Step 2: Implementing Tier2– Dynamic Model Routing Logic

Now that we can successfully label a prompt as simple, medium, or complex, we need a rulebook to decide which AI model actually handles it.

This layer maps each complexity tier to a primary model and a secondary fallback model. For instance, simple queries route to budget models (gpt-4o-mini), while complex requests route to heavyweights (claude-3-5-sonnet).

Add this configuration also:

```py :collapsed-lines title="app.py"
class ModelConfig(BaseModel):
    provider: str
    model_name: str


class ModelRouter:
    def __init__(self):
        # Map task complexity tiers to primary and fallback models
        self.routing_table = {
            TaskComplexity.SIMPLE: {
                "primary": ModelConfig(
                    provider="openai",
                    model_name="gpt-4o-mini",
                ),
                "fallback": ModelConfig(
                    provider="anthropic",
                    model_name="claude-3-5-haiku-20241022",
                ),
            },
            TaskComplexity.MEDIUM: {
                "primary": ModelConfig(
                    provider="openai",
                    model_name="gpt-4o-mini",
                ),
                "fallback": ModelConfig(
                    provider="anthropic",
                    model_name="claude-3-5-haiku-20241022",
                ),
            },
            TaskComplexity.COMPLEX: {
                "primary": ModelConfig(
                    provider="anthropic",
                    model_name="claude-3-5-sonnet-20241022",
                ),
                "fallback": ModelConfig(
                    provider="openai",
                    model_name="gpt-4o",
                ),
            },
        }

    def get_models_for_tier(
        self, complexity: TaskComplexity
    ) -> tuple[ModelConfig, ModelConfig]:
        """
        Returns the primary and fallback models for a given
        task complexity tier.
        """
        config = self.routing_table[complexity]
        return config["primary"], config["fallback"]
```

### Breaking Down the Code Logic for Tier 2

- **`ModelConfig` Schema**: Uses Pydantic to ensure every model definition includes both a `provider` (for example, `"openai"`) and a specific `model_name` string.
- **`self.routing_table` Mapping**: This dictionary acts as our single source of truth for model assignments:
  - **`SIMPLE` & `MEDIUM` Tiers**: Primary target is `gpt-4o-mini` for high-throughput, low-cost output. If OpenAI fails, it falls back to Anthropic's `claude-3-5-haiku-20241022`.
  - **`COMPLEX` Tier:** Primary target flips to `claude-3-5-sonnet-20241022` for top-tier code generation and reasoning, with `gpt-4o` as the backup.
- `get_models_for_tier`: A helper function that takes the analyzed tier and safely returns a tuple of `(PrimaryModel, FallbackModel)`.

---

## Step 3: Implementing Tier3 – Automatic Fallbacks

Even the best AI providers experience downtime, rate limits, or unexpected timeouts. A production-ready app can't just throw an error screen at the user when this happens. We need an execution engine that attempts to call the primary model provider and automatically catches errors. If anything goes wrong, it instantly pivots to the secondary fallback model without breaking the workflow .

Add the execution engine code to the script:

```py :collapsed-lines title="app.py"
import os
import time

from anthropic import Anthropic, APIError as AnthropicAPIError
from dotenv import load_dotenv
from openai import OpenAI, APIError as OpenAIAPIError

load_dotenv()


class ResilientModelEngine:
    def __init__(self):
        self.openai_client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY", "dummy")
        )
        self.anthropic_client = Anthropic(
            api_key=os.getenv("ANTHROPIC_API_KEY", "dummy")
        )

    def _call_openai(self, model: str, prompt: str) -> str:
        response = self.openai_client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            timeout=10.0,
        )
        return response.choices[0].message.content

    def _call_anthropic(self, model: str, prompt: str) -> str:
        response = self.anthropic_client.messages.create(
            model=model,
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            timeout=10.0,
        )
        return response.content[0].text

    def execute_provider_call(
        self,
        config: ModelConfig,
        prompt: str,
    ) -> str:
        """
        Dispatches prompt execution to the correct provider SDK.
        """
        if config.provider == "openai":
            return self._call_openai(config.model_name, prompt)
        elif config.provider == "anthropic":
            return self._call_anthropic(config.model_name, prompt)
        else:
            raise ValueError(
                f"Unsupported provider: {config.provider}"
            )

    def execute_with_fallback(
        self,
        primary: ModelConfig,
        fallback: ModelConfig,
        prompt: str,
    ) -> tuple[str, str]:
        """
        Attempts execution on the primary model and switches to the
        fallback model if the primary provider fails.

        Returns:
            tuple[str, str]: (Response text, Model used)
        """
        try:
            print(
                f"[Attempt] Calling Primary Provider: "
                f"{primary.provider} ({primary.model_name})"
            )

            result = self.execute_provider_call(primary, prompt)

            return result, (
                f"{primary.provider}:{primary.model_name}"
            )

        except (
            OpenAIAPIError,
            AnthropicAPIError,
            Exception,
        ) as e:
            print(f"[WARNING] Primary call failed due to: {e}")

            print(
                f"[Fallback] Switching to Secondary Provider: "
                f"{fallback.provider} ({fallback.model_name})"
            )

            try:
                result = self.execute_provider_call(
                    fallback,
                    prompt,
                )

                return result, (
                    f"{fallback.provider}:"
                    f"{fallback.model_name} (Fallback)"
                )

            except Exception as fallback_error:
                raise RuntimeError(
                    "Both primary and fallback systems failed. "
                    f"Error: {fallback_error}"
                )
```

### Breaking Down the Code Logic for Tier 3

Provider Clients (`_call_openai` & `_call_anthropic`): Helper methods wrap provider SDK calls, establishing a unified strict 10-second timeout. If an API hangs, it aborts fast so the fallback can kick in without making the user wait.

`execute_provider_call` Dispatcher: Acts as an abstraction bridge, matching the requested provider string to its respective API method.

`execute_with_fallback` Resiliency Logic: Executes the primary provider first inside a try block. Catches API errors, rate limits, or network timeouts via provider-specific exceptions (OpenAIAPIError, AnthropicAPIError). Logically redirects execution to the fallback provider inside the except block. Only raises an unrecoverable `RuntimeError` if both primary and fallback providers fail. If your primary provider encounters issues, your console tracks the recovery process transparently:

```plaintext
[Attempt] Calling Primary Provider: anthropic (claude-3-5-sonnet-20241022)

[WARNING] Primary call failed due to: Connection timeout

[Fallback] Switching to Secondary Provider: `openai` (gpt-4o)
```

### Combining the Architecture into a Unified Execution Pipeline

Now you can combine all three layers into a unified pipeline.

![Unified pipeline for executing AI tasks across multiple models and workflows.](https://cdn.hashnode.com/uploads/covers/6a36420b52a5a7620def7e19/9070c55d-5c7f-4ab4-b951-9ae6175fed35.png)

Complete your <VPIcon icon="fa-brands fa-python"/>`app.py` script with this orchestration class:

```py :collapsed-lines title="app.py"
class SmartAIEngine :collapsed-lines: title="app.py"
    def __init__(self):
        self.analyzer = PromptAnalyzer()
        self.router = ModelRouter()
        self.executor = ResilientModelEngine()

    def process_request(self, user_prompt: str) -> dict:
        print("\n==========================================")
        print("Processing New Request")
        print("==========================================")

        # Step 1: Analyze prompt complexity
        complexity = self.analyzer.analyze_complexity(
            user_prompt
        )
        print(
            f"[Step 1] Prompt classified as: "
            f"{complexity.value.upper()}"
        )

        # Step 2: Determine routing target
        primary_model, fallback_model = (
            self.router.get_models_for_tier(
                complexity
            )
        )

        print(
            f"[Step 2] Selected Primary: "
            f"{primary_model.model_name}"
        )

        # Step 3: Execute request with resilient fallbacks
        response_text, executed_model = (
            self.executor.execute_with_fallback(
                primary=primary_model,
                fallback=fallback_model,
                prompt=user_prompt,
            )
        )

        return {
            "status": "success",
            "complexity_tier": complexity.value,
            "model_used": executed_model,
            "response": response_text,
        }


# Execution Pipeline Test
if __name__ == "__main__":
    engine = SmartAIEngine()

    # Query 1: Simple task
    simple_query = (
        "What is the capital of Japan? "
        "Answer in one word."
    )

    result_1 = engine.process_request(
        simple_query
    )

    print(f"Model Used: {result_1['model_used']}")
    print(f"Response: {result_1['response']}")

    # Query 2: Complex task
    complex_query = (
        "Write a Python function to debug a "
        "memory leak in a multithreaded "
        "application."
    )

    result_2 = engine.process_request(
        complex_query
    )

    print(f"Model Used: {result_2['model_used']}")
    print(
        f"Response Snippet: "
        f"{result_2['response'][:100]}..."
    )
```

### Breaking Down the Code Logic

- Unified Orchestration (`SmartAIEngine`): Initializes all three modular components—`PromptAnalyzer`, `ModelRouter`, and `ResilientModelEngine`—as instance properties.
- The Pipeline Steps:
  - Analyze: Evaluates the prompt string offline to get the complexity tier.
  - Route: Resolves primary and secondary model pairs based on that tier.
  - Execute: Calls the models resiliently and catches failure scenarios.
- Normalized Response Payload: Wraps execution details into a consistent output dictionary, keeping track of model usage, complexity categorization, and output text.

---

## Lessons Learnt from Dynamic Model Switching in Production

Building a dynamic AI routing system taught our team critical lessons about enterprise LLM architectures:

First, keep classification light. Never use a large LLM call to classify prompts for small tasks. Use regex, keyword matching, and token-length rules. Your classifier should run in under 5 milliseconds.

Second, normalize system outputs. Different model providers structure outputs differently. Make sure your application wraps responses in a consistent schema before returning data to the user interface.

Third, set a tight timeout. Provider APIs often hang instead of throwing immediate errors. Set tight request timeouts (5 to 10 seconds) on your primary model calls so your fallback triggers quickly without frustrating the end user.

And finally, track usage metrics. Log every routing decision, model fallback, and cost delta. This data will reveal whether your complexity thresholds are properly tuned over time.

---

## Conclusion

As AI applications scale, relying on a single, monolithic LLM becomes unsustainable. Intelligent model routing allows you to balance performance, latency, and cost without sacrificing response quality.

By decoupling your application from specific model providers and introducing automated routing layers, input evaluation, provider abstraction, and resilient fallbacks, you can build production AI systems that are cost-effective, fast, and resilient.

As you deploy your own applications, treat LLM providers as dynamic utilities. Use lightweight models for everyday processing, reserve flagship models for complex tasks, and handle provider transitions cleanly in code.

### Thank You for Reading!

I hope this article has given you a practical understanding of how multi-model orchestrators and dynamic routing work in real-world applications and how you can begin implementing them in your own projects.

::: info About Author

If you'd like to discuss AI engineering, Agentic AI, LLMs, RAG, MLOps, enterprise AI architecture, or AI governance, feel free to follow, like, share, and connect with me:

- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`chidiebere-njoku-921579142`)](https://linkedin.com/in/chidiebere-njoku-921579142/)
- [Explore my Github repositories (<VPIcon icon="iconfont icon-github"/>`ChidiebereNjoku`)](https://github.com/ChidiebereNjoku)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI Applications That Switch Models Automatically",
  "desc": "Large Language Models (LLMs) have fundamentally changed how we build modern software. But relying on a single AI model for every user request creates serious production risks. API outages happen. Prop",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-applications-that-switch-models-automatically.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
