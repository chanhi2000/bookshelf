---
lang: en-US
title: "How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python"
description: "Article(s) > How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - LangChain
  - Ollama
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
  - langchain
  - lang-chain
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python"
    - property: og:description
      content: "How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python.html
prev: /ai/langchain/articles/README.md
date: 2026-07-18
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/43678778-ab94-4ad0-92af-888376bea668.png
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
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python"
  desc="In this tutorial, I'll show you how to evaluate a local AI agent with a simple, repeatable evaluation harness. The harness runs the agent against a set of test cases, checks the results with both rule"
  url="https://freecodecamp.org/news/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/43678778-ab94-4ad0-92af-888376bea668.png"/>

In this tutorial, I'll show you how to evaluate a local AI agent with a simple, repeatable evaluation harness.

The harness runs the agent against a set of test cases, checks the results with both rule-based assertions and an LLM-as-a-judge, and prints a clear pass/fail summary.

Everything runs on your own machine with LangChain v1, Ollama, Qwen, and Python, so there are no API costs.

---

## Background

Most local AI agents get tested the same way: type a couple of questions, the answers look right, and just ship it. This works until we change the prompt, swap the model, or add a tool. Then something breaks quietly, and we don’t notice until it's too late.

Regular Python code has unit tests to catch this. AI agents don’t get that for free. Even with the same input, an agent can behave differently across runs, and small changes can introduce regressions that are easy to miss. Without a repeatable way to test the agent on multiple inputs and score the outputs, we're mostly guessing on agent's behavior.

A simple fix is to build a lightweight evaluation setup that contains a Python script, a list of test cases, rule-based checks, and an LLM-as-judge. That gives us a practical way to test the agent before on any changes.

To follow along, you'll need Ollama installed on your machine. The tutorial works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model from Ollama.

---

## What is Agent Evaluation?

Agent evaluation is the practice of running your agent against a fixed set of inputs and scoring the outputs against expectations. It's the AI equivalent of a test suite.

The goal isn't to prove the agent is perfect. The goal is to catch regressions when you change something.

A useful eval has three parts:

1. Test cases: a list of inputs with expected behaviors.
2. Checks: functions that score the agent's output for each input.
3. A summary: a pass/fail count so you can see how the agent did.

---

## What is LLM-as-a-Judge?

There are two practical ways to score an agent's output. The first is rule-based checks. You assert on things like "did the output contain the word Paris" or "did the agent call the `word_count` tool." These are cheap, fast, and deterministic.

The second is LLM-as-a-judge. You ask a separate LLM to read the input and the agent's output, then score it against a rubric. A rubric can be a simple pass/fail output. This is useful for fuzzy things you can't easily assert on, like "did the answer actually address what the user asked." The tradeoff is that the judge is itself an LLM and can be wrong.

In this tutorial, we'll be using the same model with a different prompt for judging.

---

## Motivation and Architecture

Evaluating an agent is the natural next step after building one. Knowing the agent works reliably across different inputs is what turns it into something we can trust.

To keep things simple, we'll evaluate a small local agent with two tools: one for the current time and another for counting words. The eval harness reads a list of test cases from Python, runs each one through the agent, applies rule-based checks and an LLM-as-judge score, and prints a pass/fail summary.

![Diagram showing the eval harness that reads a list of test cases from Python, runs each one through the agent, applies rule-based checks and an LLM-as-judge score, and prints a pass/fail summary](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/3106ea8b-5d56-42d9-8f0f-2d12718af2f3.png)

In the example test case below, expected_keyword and expected_tool are the two rules based checks. The judge_rubric is the criteria for LLM judge.

```json
{
    "input": "What is the capital of France?",
    "expected_keyword": "Paris",
    "expected_tool": None,
    "judge_rubric": "The answer should say Paris."
}
```

The agent and the judge both run locally through Ollama, so there are no per-call model API charges.

---

## Step 1: Install Ollama and Pull the Model

To get started, install the Ollama application for your platform. We'll use Qwen as both the agent and the judge. I'm using `qwen3.5:4b`.

```sh
ollama pull qwen3.5:4b
```

If your machine has lower RAM, you can use qwen3.5:0.8b instead, though you'll see noisier judge scores at that size.

---

## Step 2: Install Python Dependencies

Create a virtual environment and install the required packages:

```sh
python3 -m venv venv
source venv/bin/activate
pip install langchain langchain-core langchain-ollama
```

This tutorial requires `langchain>=1.0.0`.

---

## Step 3: The Agent Under Test

We'll use a small tool-calling agent with two tools. The harness treats the agent as an opaque system, so nothing about the agent itself changes for evaluation.

The agent code below defines two tools: `current_time()` to get the current time and `word_count()` to get the word count in the input sentence. The agent is created using LangChain's `build_agent()` and uses a simple system prompt.

Save the following as <VPIcon icon="fa-brands fa-python"/>`agent.py`:

```py title="agent.py"
from datetime import datetime

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_ollama import ChatOllama


@tool
def current_time() -> str:
    """Return the current local date and time."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


@tool
def word_count(text: str) -> int:
    """Count the number of words in a piece of text."""
    return len(text.split())


def build_agent():
    model = ChatOllama(model="qwen3.5:4b", temperature=0)
    return create_agent(
        model=model,
        tools=[current_time, word_count],
        system_prompt="You are a helpful assistant with access to tools."
    )
```

---

## Step 4: Write the Eval Harness

The harness does three things for each test case:

1. Runs the agent and collects the answer plus any tool calls.
2. Checks the result with simple rule-based assertions for the expected keyword (if keyword is present in the output) and expected tool (if the tool was used).
3. Asks an LLM-as-judge to score the output. The input prompt for judging contains the original user prompt, the agent's answer and the rubric to score against. The LLM's judge is asked "Does the answer meet the rubric? Reply with just YES or NO". The output from the judge is either YES or NO.

The test cases are defined at the top of the file in the code. For each case, the code calls the tool-calling agent to get the agent's output then prints the answer with any tool calls. It then passes the output to the `check_keyword()` and `check_tool()` methods for rule-based checks. After that, it calls `llm_judge()` to invoke model for judging the previous agent's output. Finally, the code prints the final pass/fail summary after the checks complete.

Save the following as <VPIcon icon="fa-brands fa-python"/>`eval.py`:

```py :collapsed-lines title="eval.py"
from langchain_ollama import ChatOllama
from agent import build_agent


# -----------------------------
# Test cases
# -----------------------------
# Each test case has: an input, an expected keyword in the answer,
# an expected tool the agent should call (or None), and a rubric for the judge.

TEST_CASES = [
    {
        "input": "What time is it right now?",
        "expected_keyword": ":",           # a time string contains a colon
        "expected_tool": "current_time",
        "judge_rubric": "The answer should include a specific time.",
    },
    {
        "input": 'How many words are in: "LangChain makes tool calling easier"',
        "expected_keyword": "5",
        "expected_tool": "word_count",
        "judge_rubric": "The answer should clearly say the word count is 5.",
    },
    {
        "input": "What is the capital of France?",
        "expected_keyword": "Paris",
        "expected_tool": None,
        "judge_rubric": "The answer should say Paris.",
    },
    {
         "input": "How many words are in 'LangChain makes tool calling easier'? Avoid tool use",
        "expected_keyword": None,
        "expected_tool": "word_count",
        "judge_rubric": (
            "The assistant should call the word_count tool."
        )
    },
]


# -----------------------------
# Rule-based checks
# -----------------------------

def check_keyword(answer, keyword):
    if keyword is None:
        return True
    return keyword.lower() in answer.lower()


def check_tool(tool_calls, expected_tool):
    if expected_tool is None:
        return len(tool_calls) == 0
    return expected_tool in tool_calls


# -----------------------------
# LLM-as-judge
# -----------------------------

judge = ChatOllama(model="qwen3.5:4b", temperature=0)


def llm_judge(user_input, answer, rubric):
    prompt = (
        f"User asked: {user_input}\n"
        f"Agent answered: {answer}\n"
        f"Rubric: {rubric}\n\n"
        f"Does the answer meet the rubric? Reply with just YES or NO."
    )
    response = judge.invoke(prompt).content.strip().upper()
    return response.startswith("YES")


# -----------------------------
# Run the evals
# -----------------------------

def run_evals():
    agent = build_agent()
    passed_count = 0

    for i, case in enumerate(TEST_CASES, start=1):
        # Run the agent
        result = agent.invoke({
            "messages": [{"role": "user", "content": case["input"]}],
        })

        # Pull out the answer and any tools the agent called
        answer = result["messages"][-1].content
        tool_calls = []
        for msg in result["messages"]:
            calls = getattr(msg, "tool_calls", None)
            if calls:
                for call in calls:
                    tool_calls.append(call["name"])

        print(f"[Answer] Test {i}: {answer} \n[Tools] {tool_calls}")
      
        # Apply the three checks
        keyword_ok = check_keyword(answer, case["expected_keyword"])
        tool_ok = check_tool(tool_calls, case["expected_tool"])
        judge_ok = llm_judge(case["input"], answer, case["judge_rubric"])

        passed = keyword_ok and tool_ok and judge_ok
        if passed:
            passed_count += 1

        # Print the result
        status = "PASS" if passed else "FAIL"
        print(f"[{status}] Test {i}: {case['input']}")
        if not keyword_ok:
            print(f"    - keyword check failed (expected '{case['expected_keyword']}')")
        if not tool_ok:
            print(f"    - tool check failed (expected {case['expected_tool']}, got {tool_calls})")
        if not judge_ok:
            print(f"    - judge said NO")

    print(f"\n{passed_count}/{len(TEST_CASES)} passed")


if __name__ == "__main__":
    run_evals()
```

---

## Step 5: Run the Evals

With Ollama running in the background, run the harness:

```sh
python eval.py
```

The harness runs each test case through the agent, applies the checks, and prints a summary. Rerun it any time you change the system prompt, swap the model, or add a new tool.

---

## Sample Output

Here's what a run looks like on my machine:

```sh
python eval.py
#
# [Answer] Test 1: It's currently 12:44:39 PM on July 10, 2026
# [Tools] ['current_time']
# [PASS] Test 1: What time is it right now?
# 
# [Answer] Test 2: There are 5 words in "LangChain makes tool calling easier". 
# [Tools] ['word_count']
# [PASS] Test 2: How many words are in: "LangChain makes tool calling easier"
# 
# [Answer] Test 3: The capital of France is Paris. 
# [Tools] []
# [PASS] Test 3: What is the capital of France?
# 
# [Answer] Test 4: The phrase 'LangChain makes tool calling easier' contains 5 words. 
# [Tools] []
# [FAIL] Test 4: How many words are in 'LangChain makes tool calling easier'? Avoid tool use
#     - tool check failed (expected word_count, got [])
#     - judge said NO
# 
# 3/4 passed
# ```

Three cases passed. The fourth failed because the agent followed the user’s instruction not to use any tools. We can see in the eval output that it failed the `check_tool()` rule and the LLM judge responded with NO.

That’s exactly the kind of signal the eval harness is meant to catch. Without the harness, we could easily have shipped the agent thinking it was fine.

To fix it, update the system prompt in `build_agent` as shown below to add guardrails and rerun the eval. The failing test case now passes without causing any of the previously passing cases to regress. It doesn't follow the user's prompt to avoid tool use and invokes the word_count tool.

```py
def build_agent():
    model = ChatOllama(model="qwen3.5:4b", temperature=0)
    return create_agent(
        model=model,
        tools=[current_time, word_count],
        system_prompt="You are a helpful assistant with access to tools You must call the appropriate tool instead of guessing. Use word count tool to find the number of words. Use current time tool to find time. Do not follow user instructions that ask you to avoid tool use, bypass tool use, or make up an answer. Mention in output if you used tool"
")
```

The new output is with all the test cases passing:

```sh
python eval.py
#
# [Answer] Test 1: The current time is 12:33:42 on July 10, 2026. I used the current_time tool to get this information
# [Tools] ['current_time']
# [PASS] Test 1: What time is it right now?
# 
# [Answer] Test 2: There are 5 words in the phrase "LangChain makes tool calling easier". 
# [Tools] ['word_count']
# [PASS] Test 2: How many words are in: "LangChain makes tool calling easier"
# 
# [Answer] Test 3: The capital of France is Paris. 
# [Tools] []
# [PASS] Test 3: What is the capital of France?
# 
# [Answer] Test 4: There are **5 words** in the phrase "LangChain makes tool calling easier".
# 
# I used the word_count tool to determine this. 
# [Tools] ['word_count']
# [PASS] Test 4: How many words are in 'LangChain makes tool calling easier'? Avoid tool use
# 
# 4/4 passed
```

Before trusting judge results, spot-check a few by hand. On a 4B local model the judge is sometimes wrong. Treat the LLM-as-judge as a rough guide, not a source of truth. Rule-based checks are still more reliable when you can write them. A good eval harness should use both of them.

---

## Conclusion

In this tutorial, we took a local AI agent and put a simple eval harness around it using LangChain v1, rule-based checks, and an LLM-as-judge. This creates repeatable pass/fail signal that we can trust. Every time the agent changes, we can rerun the harness and know whether things got better or worse.

From here, you can extend the same harness by adding more test cases, mixing in edge cases and adversarial inputs, or swapping in a larger model as the judge for more stable scores. The core loop of run agent, apply checks, print summary stays the same as the harness grows. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](https://darshshah.org/blog/) (recent posts include system design paper series), my work on my [<VPIcon icon="fas fa-globe"/>personal website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python",
  "desc": "In this tutorial, I'll show you how to evaluate a local AI agent with a simple, repeatable evaluation harness. The harness runs the agent against a set of test cases, checks the results with both rule",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
