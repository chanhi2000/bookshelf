---
lang: en-US
title: "How to Test and Improve AI Applications with an Evaluation Flywheel"
description: "Article(s) > How to Test and Improve AI Applications with an Evaluation Flywheel"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Test and Improve AI Applications with an Evaluation Flywheel"
    - property: og:description
      content: "How to Test and Improve AI Applications with an Evaluation Flywheel"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-and-improve-ai-applications-with-an-evaluation-flywheel.html
prev: /programming/py/articles/README.md
date: 2025-12-22
isOriginal: false
author:
  - name: Yemi Ojedapo
    url : https://freecodecamp.org/news/author/Hyemiie/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1766082262126/bc54e004-7acc-49fc-b228-24524f250427.png
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

[[toc]]

---

<SiteInfo
  name="How to Test and Improve AI Applications with an Evaluation Flywheel"
  desc="In traditional programming, developers rely on unit tests to catch mistakes in applications. But when building AI products, that safety net doesn't exist. Responses can shift with model updates, data changes, and subtle fluctuations in prompts or ret..."
  url="https://freecodecamp.org/news/how-to-test-and-improve-ai-applications-with-an-evaluation-flywheel"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1766082262126/bc54e004-7acc-49fc-b228-24524f250427.png"/>

In traditional programming, developers rely on unit tests to catch mistakes in applications. But when building AI products, that safety net doesn't exist. Responses can shift with model updates, data changes, and subtle fluctuations in prompts or retrieval results. The usual testing methods like unit tests with Pytest or Jest, integration tests, CI pipelines, fail to catch accuracy drops, hallucinations, or regressions, and these silent failures can become real production risks.

In this article, you’ll learn why traditional testing methods fall short for AI systems and how an evaluation flywheel can be used as a practical approach to testing and improving AI applications. The sections below break the evaluation flywheel down step by step, from identifying the problem to implementing a repeatable evaluation loop.

---

## Why Does Traditional Testing Fail for AI applications?

In standard programming, tests assume deterministic behavior. This means the same input is expected to always produce the same output. For example:

```py
def authenticate_user_age(age: int) -> str:
    limit = 18

    if age >= limit:
        return "Access granted"
    else:
        return "User doesn't meet the age limit"

# Test 
assert authenticate_user_age(20) == "Access granted"
assert authenticate_user_age(16) == "User doesn't meet the age limit"
```

The response from this function is always predictable. You can write tests once and trust they'll catch errors forever.

However, AI models don’t behave the same way every time, they generate output based on probabilities. A query like “best programming practices” may produce strong guidance one day, and outdated or incomplete advice the next. This shift can happen because of changes in the underlying model, updates to retrieval components, or gradual data drift. Without a structured evaluation process in place, these inconsistencies slip into production unnoticed and can quietly weaken the system’s performance.

---

## What is the Evaluation Flywheel?

The evaluation flywheel is a continuous improvement system where test cases representing real user behavior are passed through multiple evaluation steps to assess the output of AI models. The results don't just tell you whether the system passed or failed, they feed directly into the next cycle of improvement.

```plaintext
┌─────────────┐
│   Collect   │
│ Test Cases  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     Run     │
│ Evaluations │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌─────────────┐
│  Identify   │─────▶│   Improve   │
│  Failures   │      │   System    │
└─────────────┘      └──────┬──────┘
                            │
                            ▼
                       ┌─────────────┐
                       │   Repeat    │
                       └─────────────┘
```

<!-- TODO: mermaid화 -->

::: info Here's how it works in practice:

- **Collect test cases** — Gather examples from real user interactions or create synthetic scenarios. These should reflect the kind of tasks and input your system needs to handle.
- **Run evaluations** — Pass each test case through a series of checks. The check can either be programmatic (automated metrics like relevance scores or hallucination detectors) or require manual review (like verifying legal advice accuracy or brand voice consistency).
- **Identify failures** — Detect where the model goes wrong, this can include hallucinations, irrelevant responses, or mistakes on corner-cases.
- **Improve the system** — Based on those failures, refine prompts, improve training or retrieval data, or adjust architectural components.
- **Repeat the cycle** — Re-run the updated system on the existing and newly collected cases. Over time, this grows and strengthens your evaluation suite and boosts system reliability.

:::

---

## Drawing Parallels to Familiar Practices

If you've written software before, the evaluation flywheel will feel familiar. It mirrors patterns that are already used in engineering. For instance,

### Unit tests → Evaluation datasets

Unit tests confirm a function returns the right output. Evaluation datasets play the same role for AI: they're ground-truth queries and answers that guard against regressions.

### Test-driven development (TDD) → Evaluation-driven development (EDD

In TDD, you write tests before code. In EDD, you write evaluation cases before shipping prompts or updating models. This replaces assumptions with verifiable results.

### CI/CD pipelines → Continuous evaluation pipelines

CI/CD runs checks automatically on every code change. Continuous evaluation does the same for models: it runs automated quality checks every time you tweak a prompt, retrain, or swap out a component.

The key difference is subtle but important. Traditional software tests check whether a function returns the right value or type. AI evaluation tests check whether the system produces the right *meaning*. That's harder to measure, but the principle is the same: build a safety net that grows stronger with every cycle.

---

## Why Silent Failures Matter: A Real-World Example

AI systems often behave differently in production than they do in development. A model that seems solid in testing can drift, hallucinate, or silently fail when facing real-world input.

::: note Case in point

A fraud detection model passed all monitoring metrics yet missed a spike in fraud. An ML engineer shared how their production monitoring dashboards tracked latency, throughput, and error rates, everything showed green. But fraudulent transactions were slipping through at twice the normal rate. Nobody noticed because existing observability tools focused on pipeline health, not prediction quality.

:::

This silent failure cost the company significant losses. The system seemed fine by traditional metrics. It measured system performance—latency, throughput, uptime—but ignored what mattered most: prediction accuracy. As fraudsters adapted their tactics, the model drifted, and without proper evaluation loops, the degradation went undetected for weeks.

::: info Source

<SiteInfo
  name="How Model Drift is Sabotaging Production AI Systems"
  desc="Model drift is quietly degrading AI performance in production. Learn how to detect it—and why AI-native observability is critical to stop it early."
  url="https://insightfinder.com/blog/model-drift-ai-observability//"
  logo="https://insightfinder.com/wp-content/uploads/favicon.png"
  preview="https://insightfinder.com/wp-content/uploads/Screenshot-2025-06-24-at-7.25.32 PM-1-1024x952.png"/>

:::

::: important Why This Example Matters

- **Silent failures aren't always bugs** — They often stem from models failing to adapt to shifting patterns in the real world.
- **Static evaluation isn't enough** — You need continuous, real-world feedback loops to detect when assumptions no longer hold.
- **Data drift has business impact** — Model degradation isn't just technical, it translates directly into revenue loss, security breaches, or damaged user trust.

:::

---

## How to Create an Evaluation Flywheel

To show how to build a flywheel and how it works, let's create one for a customer support chatbot that answers questions about a SaaS product.

### Step 1: Build Your AI System

Create your initial product: prompts, retrieval logic, and integrations. For our chatbot:

```py
def answer_support_question(question: str) -> str:
    # Retrieve relevant docs from knowledge base
    context = retrieve_docs(question, top_k=5)

    # Generate answer using LLM
    prompt = f"""You are a helpful customer support agent.

Context: {context}

Question: {question}

Provide a clear, accurate answer based on the context."""

    response = llm.generate(prompt)
    return response
```

::: info How this works

This function defines the core chat logic, it takes a customer’s question and returns an AI-generated answer. First, it searches your knowledge base to find the five most relevant documents using `retrieve_docs()`. These documents provide context about your product or policies. Next, it constructs a prompt that includes this context and the user's question, then sends it to a language model. The LLM reads the context and generates a relevant answer, which the function returns.

:::

### Step 2: Identify Test Cases

Build an evaluation set that reflects real user behavior. The more representative your test cases are, including common cases, edge cases, and ambiguous inputs, the better your model can catch failures before they reach production.

**Sources for test cases:**

- Previous customer support tickets
- Common FAQ topics
- Edge cases discovered in beta testing
- Synthetic scenarios (hypothetical but realistic queries)

::: tip Example test cases

```py
test_cases = [
    {
        "question": "How do I reset my password?",
        "expected_elements": ["settings page", "reset link", "email"],
        "category": "account_management"
    },
    {
        "question": "What's your refund policy?",
        "expected_elements": ["30 days", "full refund", "contact support"],
        "category": "billing"
    },
    {
        "question": "Can I export my data to CSV?",
        "expected_elements": ["yes", "export button", "dashboard"],
        "category": "features"
    },
    {
        "question": "Does your API support webhooks?",
        "expected_elements": ["yes", "webhook endpoints", "documentation"],
        "category": "technical"
    }
]
```

:::

::: info How this works

Here, we define a set of representative test cases to evaluate the AI system. Each test case includes the user’s question, a list of key elements expected in the answer, and a category for organization. These cases help ensure the chatbot is tested against real-world scenarios, edge cases, and important information that should appear in responses.

:::

### Step 3: Evaluate Outputs

Define evaluation criteria based on what matters for your use case: accuracy, faithfulness, safety, relevance, tone. Then measure the output against these criteria.

Evaluation happens in two main ways:

#### Automated Evaluation

Use programmatic metrics and LLM-as-judge patterns:

```py :collapsed-lines
def evaluate_response(question: str, response: str, expected_elements: list) -> dict:
    scores = {}

    # 1. Faithfulness: Does response contain expected elements?
    scores['contains_key_info'] = all(
        elem.lower() in response.lower() 
        for elem in expected_elements
    )

    # 2. Relevance: Semantic similarity to question
    scores['relevance'] = calculate_semantic_similarity(question, response)

    # 3. Safety: Check for problematic content
    scores['is_safe'] = not contains_harmful_content(response)

    # 4. Tone: Use LLM-as-judge
    judge_prompt = f"""Rate the helpfulness of this support response on a scale of 1-5. Question: {question}
Response: {response}

Score (1-5):"""

    scores['helpfulness'] = int(llm.generate(judge_prompt))

    return scores

# Run evaluation
for test_case in test_cases:
    response = answer_support_question(test_case['question'])
    scores = evaluate_response(
        test_case['question'],
        response,
        test_case['expected_elements']
    )
    test_case['scores'] = scores
    test_case['response'] = response
```

::: info How this works

The `evaluate_response()` function applies four different checks to each AI response:

- First, it verifies faithfulness by checking if all expected elements appear in the response using simple string matching.
- Second, it calculates semantic similarity, a measure of how closely the responses meaning match the intent of the questions, using embeddings.
- Third, it runs a safety check to flag any problematic content.
- Fourth, it uses an LLM as a judge by asking a more powerful model (like GPT-4) to rate the helpfulness of the response on a 1-5 scale.

:::

The loop then runs the evaluation for every test case. It generates a response for each question, evaluates it using the `evaluate_response` function, and then stores both the scores and the response back in the test case. This creates a complete dataset of test results for analysis and further improvements.

Common Automated Metrics:

- **Semantic similarity (0.0–1.0):** This is measured by converting the question and response into vector embeddings and calculating cosine similarity. The score shows how closely the response matches the intent of the question, even if the wording differs.
- **ROUGE / BLEU scores:** The model’s output is compared to reference answers by checking n-gram overlap. These metrics help spot regressions, though scores can be modest for open-ended answers.
- **LLM-as-judge:** A stronger model (like GPT-4 or Claude) can rate the response on a fixed scale, such as 1–5. These ratings give a sense of quality and are useful for tracking improvements or drops over time.
- **Retrieval metrics (Precision@k, Recall@k):** For retrieval-based systems, these metrics calculate how many relevant documents appear in the top-k results. Precision shows accuracy of the retrieved set, and recall indicates completeness.
- **Custom validators:** Simple rule-based checks, like regex patterns, keywords, or length limits, ensure responses meet hard requirements. These help catch issues automated metrics might miss.

#### Manual Evaluation

Automated metrics can't capture everything. Subjective qualities like tone, empathy, and brand voice require human judgment, as do small factual errors that slip past keyword checks and similarity scores.

```py
# Flag cases for human review
needs_review = [
    case for case in test_cases 
    if case['scores']['helpfulness'] < 3 
    or not case['scores']['contains_key_info']
]

# SMEs review and annotate
for case in needs_review:
    annotation = get_sme_feedback(case)
    case['human_rating'] = annotation['rating']
    case['improvement_notes'] = annotation['notes']
```

This code filters test cases to find responses that need human attention, those scoring below 3 for helpfulness or missing important information. Subject matter experts review these flagged cases and provide ratings with helpful feedback. Their input helps you spot patterns that automated metrics miss and shows you where to improve your prompts, retrieval setup, or system settings.

**When to use manual evaluation:**

- Assessing tone, empathy, or brand voice
- Detecting subtle hallucinations automated checks miss
- Validating edge cases with domain-specific nuance
- Creating ground truth labels for training evaluation models

### Step 4: Learn and Improve

Once you've identified failures, adjust the controllable parts of your AI system (the "configs"):

**Common configuration levers:**

- **Prompts** — Add instructions, examples, constraints
- **Retrieval** — Change chunk size, top-k, reranking strategy
- **Model** — Switch models, adjust temperature, max tokens
- **Context** — Modify system instructions, add memory
- **Post-processing** — Add validation, formatting, safety filters

::: tip Example improvement cycle

```py :collapsed-lines
# Problem discovered: Chatbot missing key details
failing_case = {
    "question": "What's your refund policy?",
    "response": "We offer refunds in certain cases.",
    "issue": "Too vague, missing 30-day window and process"
}

# Root cause: Retrieval returning wrong docs
retrieved_docs = retrieve_docs(failing_case['question'], top_k=5)
# Docs about "payment processing" ranked higher than "refund policy"

# Solution 1: Improve retrieval with reranking
def retrieve_docs_v2(question: str, top_k: int) -> str:
    # Initial retrieval
    candidates = vector_search(question, top_k=20)

    # Rerank by relevance
    reranked = rerank_by_relevance(question, candidates)

    return reranked[:top_k]

# Solution 2: Update prompt to require specificity
prompt_v2 = f"""You are a helpful customer support agent.

Context: {context}

Question: {question}

Provide a clear, accurate answer based on the context. Include specific details like:
- Time windows (e.g., "within 30 days")
- Step-by-step processes
- Relevant links or contact methods

Answer:"""

# Re-evaluate
new_response = answer_support_question_v2(failing_case['question'])
new_scores = evaluate_response(
    failing_case['question'],
    new_response,
    ["30 days", "full refund", "contact support"]
)

# Verify improvement
assert new_scores['contains_key_info'] == True
assert new_scores['helpfulness'] >= 4
```

:::

::: info How this works

In this example, the chatbot's refund answer was too vague. After checking what went wrong, the problem was that the system retrieved docs about payment processing instead of the refund policy.

:::

To resolve this, two changes can be made. First, retrieval is improved by grabbing twenty documents, then picking the best five. Second, the prompt is updated to ask for specific details like dates and steps.

After making these changes, the test runs again to confirm it works: the response now has all the key info and scores at least 4 out of 5. This process turns problems into fixes you can measure.

### Step 5: Automate and Repeat

Integrate evaluation into your development workflow using CI/CD:

```yaml title=".github/workflows/eval.yml"
name: Continuous Evaluation

on:
  pull_request:
  push:
    branches: [main]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Run evaluation suite
        run: python run_evals.py

      - name: Check pass rate
        run: |
          PASS_RATE=$(python calculate_pass_rate.py)
          if (( $(echo "$PASS_RATE < 0.85" | bc -l) )); then
            echo "Pass rate $PASS_RATE below threshold"
            exit 1
          fi

      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: eval-results
          path: results/
```

::: info Explanation

This GitHub Actions workflow automates your evaluation process so it runs automatically on every code change. The workflow triggers whenever someone opens a pull request or pushes code to the main branch. It checks out your code, runs your full evaluation suite using <VPIcon icon="fa-brands fa-python"/>`run_evals.py`, then calculates what percentage of test cases passed. If the pass rate drops below 85%, the workflow fails and blocks the code from being merged, preventing quality regressions from reaching production.

:::

::: important Key practices for automation

- **Version your test cases**: Track them in Git alongside code
- **Set quality gates**: Block deployments if pass rate drops below threshold
- **Monitor trends**: Track metrics over time to catch gradual drift
- **Alert on regressions**: Notify team when specific test cases start failing
- **Sample production traffic**: Continuously add real queries to eval dataset

:::

---

## Tools and Frameworks you can use for evaluation

Several platforms can help implement continuous evaluation. The one you choose depends on your stack and needs:

**If you're building with LLMs:** Try LangSmith or Braintrust first. Both handle prompt versioning, evaluation datasets, and tracing out of the box.

**If you're doing traditional ML:** Weights & Biases is the industry standard. If you're in the Microsoft ecosystem, PromptFlow integrates well with Azure.

**If you want full control:** Build custom with pytest for test execution and MLflow for tracking results. More setup, but you own the entire pipeline

---

## What a Complete Evaluation Loop Looks Like in Practice

This walkthrough shows how a support chatbot improves after running a single cycle of evaluations. Each stage shows how evaluation signals guide improvements and lock in quality for the next release.

| Stage | Before | After |
| --- | --- | --- |
| **Test Case** | "Can I use your API on the free plan?" | Same question |
| **Model Response** | "Yes, you can access our API." | "Yes, you can access our API on the free plan with a rate limit of 100 requests per day. For higher limits, upgrade to Pro or Enterprise." |
| **Evaluation Scores** | contains_key_info=False, helpfulness=2/5 | contains_key_info=True, helpfulness=5/5 |
| **Issue Identified** | Missing crucial detail: free plan rate limits | N/A (issue resolved) |
| **Analysis / Root Cause** | Retrieval returned general API docs; prompt didn’t emphasize limitations | N/A (analysis led to fix) |
| **Fixes Applied** | 1. Improved retrieval to fetch plan comparison docs2. Updated prompt: "Always mention plan-specific restrictions"3. Added validation: Response must mention rate limits if asked | N/A (fix implemented) |
| **Outcome** | Test failed, regression not prevented | Test passes, regression prevented |
| **Next Cycle Actions** | N/A | 1. Add this test case to permanent suite 2. Look for similar issues (other plan-related questions) 3. Monitor production queries for this pattern |

**Next cycle:**

- Add this test case to permanent suite
- Look for similar issues (other plan-related questions)
- Monitor if this pattern appears in production queries

::: important Key Takeaways

- **AI systems need continuous evaluation, not one-time testing** — Models drift, data changes, and silent failures accumulate without ongoing checks.
- **Build evaluation into your workflow from day one** — Don't wait until production failures force you to retrofit evaluation.
- **Start simple, then scale** — Begin with 10-20 test cases and basic metrics. Grow your suite as you encounter edge cases.
- **Automate what you can, involve humans for what you can't** — Use programmatic checks for speed, SME review for nuance.
- **Treat evaluation datasets as first-class artifacts** — Version control them, review changes, and grow them over time.
- **Make evaluation a team sport** — Product, engineering, and domain experts should all contribute test cases and evaluation criteria.

:::

---

## Conclusion

Every developer has felt the relief of seeing "all tests passing." In AI systems, that reassurance is often misleading. A model can deploy successfully, meet performance benchmarks, and still produce incorrect, incomplete, or misleading outputs in ways traditional tests miss.

The evaluation flywheel addresses this gap by making model behavior testable in practice. Instead of assuming correctness, it forces the system to answer real questions, measures the quality of those answers, and highlights where performance degrades over time. This shifts evaluation from a one-off validation step into an ongoing part of development.

Evaluation won't eliminate uncertainty completely, but it makes failures visible before they reach users. With failures clearly exposed, teams stop guessing and start fixing based on results. This might mean adjusting prompts, improving retrieval logic, or refining evaluation criteria. Over time, this leads to AI systems that evolve in controlled ways rather than breaking silently.

::: info Resources for further reading

<SiteInfo
  name="openai/evals"
  desc="Evals is a framework for evaluating LLMs and LLM systems, and an open-source registry of benchmarks."
  url="https://github.com/openai/evals/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4fa53d47e81710204a9e04553f501dfcb1aa920dda6784e1febfbec9bcb7e722/openai/evals"/>

<SiteInfo
  name="LangChain overview - Docs by LangChain"
  desc="LangChain is an open source framework with a pre-built agent architecture and integrations for any model or tool — so you can build agents that adapt as fast as the ecosystem evolves"
  url="https://docs.langchain.com/oss/python/langchain/overview/"
  logo="/mintlify-assets/_mintlify/favicons/langchain-5e9cc07a/6qGJdyFkFFvLiKlZ/_generated/favicon-dark/favicon.ico"
  preview="https://langchain-5e9cc07a.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DDocumentation%26appearance%3Dsystem%26title%3DLangChain%2Boverview%26description%3DLangChain%2Bis%2Ban%2Bopen%2Bsource%2Bframework%2Bwith%2Ba%2Bpre-built%2Bagent%2Barchitecture%2Band%2Bintegrations%2Bfor%2Bany%2Bmodel%2Bor%2Btool%2B%25E2%2580%2594%2Bso%2Byou%2Bcan%2Bbuild%2Bagents%2Bthat%2Badapt%2Bas%2Bfast%2Bas%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Flangchain-5e9cc07a%252FXbr8HuVd9jPi6qTU%252Fimages%252Fbrand%252Flangchain-docs-teal.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DXbr8HuVd9jPi6qTU%2526q%253D85%2526s%253D16111530672bf976cb54ef2143478342%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Flangchain-5e9cc07a%252FXbr8HuVd9jPi6qTU%252Fimages%252Fbrand%252Flangchain-docs-lilac.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253DXbr8HuVd9jPi6qTU%2526q%253D85%2526s%253Db70fb1a2208670492ef94aef14b680be%26primaryColor%3D%25232F6868%26lightColor%3D%252384C4C0%26darkColor%3D%25231C3C3C%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%25230b0d0f&w=1200&q=100"/>

- **Arize AI blog**: Comprehensive resources on ML observability

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Test and Improve AI Applications with an Evaluation Flywheel",
  "desc": "In traditional programming, developers rely on unit tests to catch mistakes in applications. But when building AI products, that safety net doesn't exist. Responses can shift with model updates, data changes, and subtle fluctuations in prompts or ret...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-and-improve-ai-applications-with-an-evaluation-flywheel.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
