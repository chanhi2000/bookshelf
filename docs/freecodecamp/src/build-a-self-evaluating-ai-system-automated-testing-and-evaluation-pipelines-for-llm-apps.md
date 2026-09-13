---
lang: en-US
title: "How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications"
description: "Article(s) > How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications"
    - property: og:description
      content: "How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-self-evaluating-ai-system-automated-testing-and-evaluation-pipelines-for-llm-apps.html
prev: /programming/py-pandas/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Jude Otine
    url: https://freecodecamp.org/news/author/judeotine/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e470b44-a02d-440b-a576-e12de96a3b68.png
---

# {{ $frontmatter.title }} 

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
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
  name="How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications"
  desc="So you shipped your AI feature and it works in demos. Your team is impressed. Then a user asks a question slightly outside your test cases and the model confidently returns something completely wrong."
  url="https://freecodecamp.org/news/build-a-self-evaluating-ai-system-automated-testing-and-evaluation-pipelines-for-llm-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e470b44-a02d-440b-a576-e12de96a3b68.png"/>

So you shipped your AI feature and it works in demos. Your team is impressed. Then a user asks a question slightly outside your test cases and the model confidently returns something completely wrong.

The truth about building with Large Language Models is that traditional software testing falls apart. You can't write a simple assert output ==expected when your system generates different text every time it runs.

Most tutorials out there will teach you how to build a chatbot or wire up a RAG pipeline and then they just...stop. "Deploy to production" they say, as if the hard part is over. But the hard part is actually knowing whether your AI is any good and catching it when it stops being good.

In this article, I'll walk you through building a complete evaluation pipeline. We'll also cover three different evaluation strategies that work at different levels of cost and depth.

::: note What You'll Need

To follow along, you should have Python 3.10+ and some basic experience calling an LLM API. It doesn't matter if you're using OpenAI, Anthropic, or a local model because the evaluation patterns work the same way.

You'll also need an OpenAI API key for the LLM-as-judge examples (we're using `gpt-4o-mini` since it's cheap and good enough for scoring).

If you already have an LLM-powered app you want to evaluate, even a tiny one, that's perfect. If not, the examples are self-contained so you can still follow everything.

Grab the dependencies here:

```sh
pip install openai numpy pandas scikit-learn python-dotenv
```

:::

---

## Why Traditional Testing Breaks Down for LLM Applications

If you've written tests for regular software, you know the drill. Function goes in, value comes out, you assert they match. Clean, simple, and done.

But LLMs break that entire model. And not in one way, but in several that compound on each other.

First, the outputs aren't deterministic. You can send the exact same prompt twice and get back different wording. Even setting `temperature=0` doesn't fully save you because model providers update their models behind the scenes. The same API call in January and March might behave differently.

Second, there's no single right answer. If your app summarizes a document, what does a correct summary even look like? Two humans would write different summaries and both could be perfectly good. You can't `assertEqual` your way through that.

And third, nothing breaks visibly and there's no error, crash, or red line in your logs. The model just quietly returns a polished, confident wrong answer. Your uptime dashboard says 100% while your users are getting nonsense. This is the one that really gets you when an LLM fails.

So you can't just test LLM apps the way you test a REST API. You need scoring instead of pass/fail. You need to evaluate batches of outputs not individual ones. And you need something that runs continuously because the quality can drift over time without you changing a single line of code.

---

## The Three Layers of LLM Evaluation

The approach I've landed on after a lot of trial and error uses three layers stacked from cheap-and-fast to expensive-and-thorough.

1. **Layer 1 is deterministic checks.** Think of these as bouncers at the door. Is the output valid JSON when it should be? Is it suspiciously short or absurdly long? Does it contain a hallucinated URL? These checks are instant, free and catch more problems than you'd expect.
2. **Layer 2 is LLM-as-judge.** This is where you use a separate LLM call to grade your main LLM's output. "Was this answer relevant? Was it accurate? Did it actually help?" A model like `gpt-4o-mini` is surprisingly good at scoring other models' work as long as you give it a clear rubric.
3. **Layer 3 is human evaluation.** Real people reviewing real outputs. You don't do this on every response, as that would be impossibly slow. But you do it periodically, to make sure your automated layers haven't drifted away from what good actually means.

The trick is knowing when to use which layer, and we'll build each one of them.

![The Three Layers of LLM Evaluation: Deterministic checks, LLM-as-Judge, and Human Evaluation](https://cdn.hashnode.com/uploads/covers/6a9c68b4b92b7b0f99798c00/2b842027-8efc-44e5-84df-20ce5bd80f66.png)

---

## How to Build Layer 1: Deterministic Checks

When I first started building eval pipelines, I skipped straight to the fancy stuff: LLM judges, embedding similarity scores, the works. Meanwhile, my app was occasionally returning completely empty strings and I didn't notice for two weeks. Two weeks!

That's why I now start every project with deterministic checks. They're dead simple: no ML and no API calls, just plain Python asking basic sanity questions about the output. Does it exist? Is it the right format? Is it suspiciously short? Did the model hallucinate a URL?

You might be thinking these are too basic to matter. I thought so too. Then I ran them on a month of production logs and found that roughly a third of the bad outputs I'd missed would've been caught by checks you could write in five minutes.

Here's the DeterministicEvaluator class I now drop into every project on day one:

```py :collapsed-lines
import json
import re
from dataclasses import dataclass


@dataclass
class EvalResult:
    """Holds the result of a single evaluation check."""
    check_name: str
    passed: bool
    score: float  # 0.0 to 1.0
    details: str


class DeterministicEvaluator:
    """Layer 1: Fast, rule-based checks for LLM outputs."""

    def check_json_validity(self, output: str) -> EvalResult:
        """Verify the output is valid JSON when JSON is expected."""
        try:
            json.loads(output)
            return EvalResult("json_validity", True, 1.0, "Valid JSON")
        except json.JSONDecodeError as e:
            return EvalResult("json_validity", False, 0.0, f"Invalid JSON: {e}")

    def check_length_bounds(
        self, output: str, min_chars: int = 10, max_chars: int = 5000
    ) -> EvalResult:
        """Check that output length falls within acceptable bounds."""
        length = len(output)
        if length < min_chars:
            return EvalResult(
                "length_bounds", False, 0.0,
                f"Too short: {length} chars (minimum: {min_chars})"
            )
        if length > max_chars:
            return EvalResult(
                "length_bounds", False, 0.0,
                f"Too long: {length} chars (maximum: {max_chars})"
            )
        return EvalResult("length_bounds", True, 1.0, f"Length OK: {length} chars")

    def check_no_hallucinated_links(self, output: str) -> EvalResult:
        """Detect URLs in output that the model may have fabricated."""
        url_pattern = r'https?://[^\s\)]\}\"\'<>]+'
        urls = re.findall(url_pattern, output)
        if urls:
            return EvalResult(
                "no_hallucinated_links", False, 0.0,
                f"Found {len(urls)} URLs that may be hallucinated: {urls[:3]}"
            )
        return EvalResult("no_hallucinated_links", True, 1.0, "No URLs found")

    def check_required_sections(
        self, output: str, required: list[str]
    ) -> EvalResult:
        """Verify that required sections or keywords appear in the output."""
        missing = [s for s in required if s.lower() not in output.lower()]
        if missing:
            score = 1.0 - (len(missing) / len(required))
            return EvalResult(
                "required_sections", False, score,
                f"Missing sections: {missing}"
            )
        return EvalResult("required_sections", True, 1.0, "All sections present")

    def check_no_refusal(self, output: str) -> EvalResult:
        """Detect if the model refused to answer when it should not have."""
        refusal_phrases = [
            "i cannot", "i can't", "i'm unable to", "as an ai",
            "i don't have access", "i'm not able to"
        ]
        output_lower = output.lower()
        for phrase in refusal_phrases:
            if phrase in output_lower:
                return EvalResult(
                    "no_refusal", False, 0.0,
                    f"Possible refusal detected: '{phrase}'"
                )
        return EvalResult("no_refusal", True, 1.0, "No refusal detected")

    def run_all(self, output: str, config: dict = None) -> list[EvalResult]:
        """Run all deterministic checks and return results."""
        config = config or {}
        results = [
            self.check_length_bounds(
                output,
                config.get("min_chars", 10),
                config.get("max_chars", 5000)
            ),
            self.check_no_hallucinated_links(output),
            self.check_no_refusal(output),
        ]
        if config.get("expect_json"):
            results.append(self.check_json_validity(output))
        if config.get("required_sections"):
            results.append(
                self.check_required_sections(output, config["required_sections"])
            )
        return results


if __name__ == "__main__":
    evaluator = DeterministicEvaluator()

    # Test with a normal output
    good_output = "Python is a high-level programming language known for its readability."
    results = evaluator.run_all(good_output)
    for r in results:
        print(f"  {r.check_name}: {'PASS' if r.passed else 'FAIL'} ({r.details})")

    # Test with a suspicious output
    bad_output = "Visit https://fake-docs.example.com/api for more details."
    results = evaluator.run_all(bad_output)
    for r in results:
        print(f"  {r.check_name}: {'PASS' if r.passed else 'FAIL'} ({r.details})")
```

Every one of these checks runs in under a millisecond and they cost nothing. But don't let the simplicity fool you because the hallucinated links check alone has saved me from shipping fabricated documentation URLs to users more times than I'd like to admit.

Also one thing worth stressing is that these are starting points. The generic checks above work for any LLM app. But the biggest wins come from domain-specific ones. If your app generates SQL, add a syntax parser. If it drafts emails, verify that there's a subject line and a greeting. If it outputs code, try running it through a linter.

Every check you add here is one fewer bad output that reaches the expensive layers downstream or worse, your users.

---

## How to Build Layer 2: LLM-as-Judge Evaluation

Alright, so your output passes the sanity checks: it's valid JSON, reasonable length, no fabricated links. But here's a question Layer 1 can't answer: is the response actually *helpful*?

An output can be perfectly structured, pass every deterministic check, and still be completely useless to the person reading it. "The capital of France is Berlin" is valid text, correct length, no hallucinated URLs...but it's also wrong.

This is where things get a little meta. The idea behind LLM-as-judge is that you make a separate LLM call whose only job is to read your main model's output and score it. Yes, you're using AI to grade AI. It sounds like asking one student to grade another student's homework. But it actually works surprisingly well, and research from labs like Anthropic and Google have shown that LLM judges correlate strongly with human evaluators when you give them clear scoring criteria.

The key phrase there is "clear scoring criteria." Without that, this whole approach falls apart.

### How to Design Scoring Rubrics

If you tell an LLM "rate this from 1 to 10," you'll get back scores that are all over the place. A 7 on one run becomes a 5 on the next. The scores are essentially meaningless because the model has no shared definition of what each number means.

The fix is a rubric with concrete anchor descriptions. Here's one for helpfulness.

```plaintext
Score 1 - The response is completely irrelevant, incorrect, or harmful.
Score 2 - The response addresses the topic but contains major errors or omissions.
Score 3 - The response is partially correct but misses key information.
Score 4 - The response is correct and helpful with minor issues.
Score 5 - The response is comprehensive, accurate, and directly addresses the question.
```

Now notice how each level describes something you could point to in the output, not a vibe. "Completely off-topic" is observable. "Kind of bad" is not. That specificity is what makes the judge consistent across runs.

### How to Implement the Judge

Here's the full LLMJudge class. I'll walk through the important design decisions after.

```py :collapsed-lines
import json
import os
from openai import OpenAI
from dataclasses import dataclass

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@dataclass
class JudgeResult:
    """Holds the result of an LLM judge evaluation."""
    criterion: str
    score: int
    max_score: int
    reasoning: str


RUBRICS = {
    "relevance": {
        "description": "Does the response directly address the user's question?",
        "levels": {
            1: "Completely off-topic or addresses a different question entirely.",
            2: "Tangentially related but misses the core question.",
            3: "Addresses the question but includes significant irrelevant content.",
            4: "Directly addresses the question with minor tangents.",
            5: "Precisely and completely addresses the question asked.",
        },
    },
    "accuracy": {
        "description": "Is the factual content of the response correct?",
        "levels": {
            1: "Contains critical factual errors that would mislead the reader.",
            2: "Multiple factual errors on important points.",
            3: "Mostly accurate but contains one notable error.",
            4: "Accurate with only trivial imprecisions.",
            5: "Completely accurate with no factual errors.",
        },
    },
    "completeness": {
        "description": "Does the response cover all important aspects of the question?",
        "levels": {
            1: "Addresses less than 20 percent of what the question requires.",
            2: "Covers some aspects but misses major required components.",
            3: "Covers the basics but lacks depth on important points.",
            4: "Comprehensive coverage with minor gaps.",
            5: "Thoroughly covers all aspects the question requires.",
        },
    },
}


class LLMJudge:
    """Layer 2: Uses a separate LLM to evaluate response quality."""

    def __init__(self, model: str = "gpt-4o-mini"):
        self.model = model

    def evaluate(
        self, question: str, response: str, criterion: str
    ) -> JudgeResult:
        """Evaluate a single response on a single criterion."""
        rubric = RUBRICS[criterion]
        levels_text = "\n".join(
            f"Score {score}: {desc}"
            for score, desc in rubric["levels"].items()
        )

        judge_prompt = f"""You are an expert evaluator. Your job is to score an AI assistant's response.

CRITERION: {rubric['description']}

SCORING RUBRIC:
{levels_text}

USER QUESTION:
{question}

AI RESPONSE:
{response}

Evaluate the response on the criterion above. You must respond with valid JSON only:
{{"score": <integer 1-5>, "reasoning": "<2-3 sentence explanation>"}}"""

        judge_response = client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": judge_prompt}],
            temperature=0.0,
            response_format={"type": "json_object"},
        )

        result = json.loads(judge_response.choices[0].message.content)
        return JudgeResult(
            criterion=criterion,
            score=result["score"],
            max_score=5,
            reasoning=result["reasoning"],
        )

    def evaluate_all(
        self, question: str, response: str, criteria: list[str] = None
    ) -> list[JudgeResult]:
        """Evaluate a response across all specified criteria."""
        criteria = criteria or list(RUBRICS.keys())
        return [self.evaluate(question, response, c) for c in criteria]


if __name__ == "__main__":
    judge = LLMJudge()

    question = "What is a Python decorator and when should you use one?"
    good_response = (
        "A Python decorator is a function that takes another function as input "
        "and extends its behavior without modifying it. You define a decorator "
        "with the @decorator_name syntax above a function definition. Use "
        "decorators when you need to add cross-cutting concerns like logging, "
        "authentication checks, or caching to multiple functions without "
        "duplicating code in each one."
    )

    results = judge.evaluate_all(question, good_response)
    for r in results:
        print(f"  {r.criterion}: {r.score}/{r.max_score} - {r.reasoning}")
```

There are a few things worth calling out in this code.

1. **Temperature is zero:** You're not asking the judge to be creative. You want the same input to produce the same score every time, or as close to it as possible.
2. **The output is structured JSON:** I learned this one the hard way. If you let the judge respond in free text, you end up writing fragile parsing code to extract the score. Force JSON output and your life gets much easier.
3. **The rubric is baked into every prompt:** The judge never uses its own idea of what good means. It always scores against your rubric and that's what makes it reproducible.

### How to Handle Judge Reliability

Even with all of that, a single judge call can be noisy. I've seen the same response score a 4 on one call and a 3 on the next. If you're making decisions based on those scores, that variance matters. Two things can help you with that.

The first is **multi-judge consensus**. This means you run the same evaluation three times and take the median. Yes, it costs 3x as much. But the scores become much more stable, and for CI/CD gating decisions, stability matters more than saving a few cents.

The second is **calibration sets**. You keep a small set of responses (maybe 20-30) where you already have reliable human scores. Run your judge on these periodically. If the judge starts disagreeing with the humans, something changed and you need to investigate.

We can look at this consensus implementation that shows how to handle that:

```py :collapsed-lines
import numpy as np


def evaluate_with_consensus(
    judge: LLMJudge,
    question: str,
    response: str,
    criterion: str,
    num_judges: int = 3,
) -> JudgeResult:
    """Run multiple judge evaluations and return the median."""
    results = [
        judge.evaluate(question, response, criterion)
        for _ in range(num_judges)
    ]
    scores = [r.score for r in results]
    median_score = int(np.median(scores))
    median_result = min(results, key=lambda r: abs(r.score - median_score))
    return JudgeResult(
        criterion=criterion,
        score=median_score,
        max_score=5,
        reasoning=f"Consensus ({scores}): {median_result.reasoning}",
    )
```

---

## How to Build Layer 3: Human Evaluation Loops

I once had an LLM judge giving a response 5/5 on accuracy, 5/5 on relevance, 4/5 on completeness. The scores looked perfect until a colleague actually read the response and said, "This is technically correct but it would confuse the hell out of anyone who isn't already an expert." And he was right.

The answer used jargon the user wouldn't know, buried the key point three paragraphs deep, and read like a textbook instead of a helpful reply.

That's the ceiling of automated evaluation. LLM judges are great at detecting factual errors and structural problems, but they have blind spots around tone, clarity for a specific audience, and the subtle difference between "correct" and "actually helpful." Those blind spots are where human evaluation comes in.

Now, to be clear, this doesn't mean hiring a team to review every single response. That doesn't scale and you don't need it. The goal is narrower: get a small batch of human scores on a regular schedule and use those scores as a reality check on your automated layers.

### How to Build a Lightweight Annotation Interface

You really don't need Label Studio or some fancy annotation platform for this. You only need a Python script that shows a response and asks for a score.

Here's how this works at a high level: the script takes a question-response pair, displays it in the terminal, asks the reviewer to score it on a 1-5 scale, and saves the result to a file. Each annotation gets stored as a single line of JSON called JSONL format which makes it easy to load back later, run analysis on, or feed into a dashboard.

```py :collapsed-lines
import json
import random
from pathlib import Path
from dataclasses import dataclass, asdict


@dataclass
class Annotation:
    """A single human annotation for an LLM response."""
    question: str
    response: str
    annotator: str
    score: int
    notes: str


class AnnotationCollector:
    """Collects and stores human evaluations."""

    def __init__(self, output_file: str = "annotations.jsonl"):
        self.output_path = Path(output_file)

    def collect_annotation(
        self, question: str, response: str, annotator: str
    ) -> Annotation:
        """Present a question-response pair and collect a human score."""
        print("\n" + "=" * 60)
        print(f"QUESTION: {question}")
        print("-" * 60)
        print(f"RESPONSE: {response}")
        print("-" * 60)
        print("Score this response (1-5):")
        print("  1 = Terrible  2 = Poor  3 = Acceptable  4 = Good  5 = Excellent")

        while True:
            try:
                score = int(input("Score: "))
                if 1 <= score <= 5:
                    break
                print("Please enter a number between 1 and 5.")
            except ValueError:
                print("Please enter a valid number.")

        notes = input("Notes (optional, press Enter to skip): ").strip()

        annotation = Annotation(
            question=question,
            response=response,
            annotator=annotator,
            score=score,
            notes=notes,
        )
        self.save(annotation)
        return annotation

    def save(self, annotation: Annotation) -> None:
        """Append annotation to JSONL file."""
        with open(self.output_path, "a") as f:
            f.write(json.dumps(asdict(annotation)) + "\n")

    def load_all(self) -> list[Annotation]:
        """Load all saved annotations."""
        annotations = []
        if self.output_path.exists():
            with open(self.output_path) as f:
                for line in f:
                    data = json.loads(line)
                    annotations.append(Annotation(**data))
        return annotations
```

Let me walk through what's happening in this script.

The `Annotation` dataclass is just a container that holds everything about a single review, the original question, the model's response, who reviewed it, the score they gave, and any notes they added. Nothing fancy, but having a structured format means you can easily compare scores across reviewers later.

The `collect_annotation` method is where the actual review happens. It prints the question and response to the terminal with some visual separators so the reviewer can read them clearly then prompts for a score.

The while true loop with input validation is important here. It keeps asking until the reviewer gives a valid number between 1 and 5 so you don't end up with garbage data in your annotations file.

The save method appends each annotation as a single JSON line to an annotations.jsonl file. I'm using JSONL (one JSON object per line) instead of a regular JSON array because it's append-friendly. You can add new annotations without reading and rewriting the entire file, which matters when you're collecting hundreds of reviews over time.

And load_all reads everything back, parsing each line into an Annotation object. This is what you'd call when you want to analyze your annotations, compare them to your LLM judge scores, or calculate agreement between reviewers.

In practice, you'd use this by feeding it a batch of question-response pairs from your production logs or golden dataset. You might run it during a weekly review session where a team member spends 30 minutes scoring 20-30 responses. That small investment gives you a reliable ground truth to calibrate your automated layers against.

### How to Calculate Inter-Annotator Agreement

Now here's a problem you'll hit quickly: you ask two people to score the same response and they give it different scores. Is the response ambiguous or is your rubric ambiguous?

You need a way to measure this, and [<VPIcon icon="fa-brands fa-wikipedia-w"/>Cohen's Kappa](https://en.wikipedia.org/wiki/Cohen%27s_kappa) is the standard tool for that. It basically tells you how much two annotators agree, adjusted for the amount of agreement you'd expect just by chance.

```py
from sklearn.metrics import cohen_kappa_score


def measure_agreement(
    scores_annotator_1: list[int], scores_annotator_2: list[int]
) -> dict:
    """Calculate inter-annotator agreement using Cohen's Kappa."""
    kappa = cohen_kappa_score(scores_annotator_1, scores_annotator_2)

    interpretation = "poor"
    if kappa > 0.8:
        interpretation = "almost perfect"
    elif kappa > 0.6:
        interpretation = "substantial"
    elif kappa > 0.4:
        interpretation = "moderate"
    elif kappa > 0.2:
        interpretation = "fair"

    exact_agreement = sum(
        a == b for a, b in zip(scores_annotator_1, scores_annotator_2)
    ) / len(scores_annotator_1)

    return {
        "cohens_kappa": round(kappa, 3),
        "interpretation": interpretation,
        "exact_agreement": round(exact_agreement, 3),
    }


if __name__ == "__main__":
    # two annotators scored the same 10 responses
    annotator_a = [5, 4, 3, 4, 5, 2, 3, 4, 5, 4]
    annotator_b = [5, 4, 4, 4, 5, 3, 3, 4, 5, 3]

    agreement = measure_agreement(annotator_a, annotator_b)
    print(f"Cohen's Kappa: {agreement['cohens_kappa']}")
    print(f"Interpretation: {agreement['interpretation']}")
    print(f"Exact Agreement: {agreement['exact_agreement']:.0%}")
```

You would want a Kappa above 0.6. Anything below that and your rubric is the problem, not your annotators. Go back and add more concrete examples to each score level. Keep refining until people consistently agree. It usually takes two or three rounds of iteration.

---

## How to Build the Regression Testing Pipeline

We can look at a scenario that's probably happened to you or other people you know: you tweak a prompt to fix one bad output you noticed. It works and that specific output is better now. You later ship it and week later, you find out the change broke three other responses you never thought to check.

This is incredibly common. The only way out is regression testing. If you've done traditional software development, you might already know what regression testing means. It's the practice of re-running a fixed set of tests every time you make a change, specifically to make sure you didn't break something that was already working.

The word regression literally means going backwards: your system was handling a question correctly and now after your change, it isn't.

In regular software, regression tests are usually unit tests or integration tests. For LLM applications, it works a bit differently. Instead of checking for exact outputs, you're scoring a batch of responses and comparing those scores against a previous run. If the scores drop, something regressed. The idea is the same but the mechanism is built around scoring rather than pass/fail assertions.

### How to Create Golden Datasets

A golden dataset is just a curated list of questions that represent what your app actually needs to handle. You run your system against this list every time something changes (new prompt, new model, or updated retrieval logic) and compare the scores to your last run.

```py :collapsed-lines
import json
from pathlib import Path
from dataclasses import dataclass, asdict


@dataclass
class GoldenExample:
    """A single test case in the golden dataset."""
    id: str
    question: str
    reference_answer: str
    category: str
    difficulty: str  # "easy", "medium", "hard"
    criteria: list[str]  # which criteria to evaluate


class GoldenDataset:
    """Manages a curated evaluation dataset."""

    def __init__(self, filepath: str = "golden_dataset.json"):
        self.filepath = Path(filepath)
        self.examples: list[GoldenExample] = []
        if self.filepath.exists():
            self.load()

    def add(self, example: GoldenExample) -> None:
        """Add a new example to the dataset."""
        self.examples.append(example)
        self.save()

    def get_by_category(self, category: str) -> list[GoldenExample]:
        """Filter examples by category."""
        return [e for e in self.examples if e.category == category]

    def save(self) -> None:
        """Persist dataset to disk."""
        data = [asdict(e) for e in self.examples]
        with open(self.filepath, "w") as f:
            json.dump(data, f, indent=2)

    def load(self) -> None:
        """Load dataset from disk."""
        with open(self.filepath) as f:
            data = json.load(f)
            self.examples = [GoldenExample(**item) for item in data]

    def summary(self) -> dict:
        """Return dataset statistics."""
        categories = {}
        for e in self.examples:
            categories[e.category] = categories.get(e.category, 0) + 1
        return {
            "total_examples": len(self.examples),
            "categories": categories,
        }
```

Some things I've learned about building these is that you should start with 50 to 100 examples. That's enough to catch meaningful regressions without making each eval run take forever.

Also, make sure you include edge cases – those weird questions that tripped up your model before. If your dataset is 90% easy questions, you won't notice when hard questions start failing.

Finally, treat this as a living document. Every time something breaks in production, turn it into a golden dataset example. Over a few months, your dataset evolves from generic test questions into a detailed map of exactly where your app is fragile.

### How to Run Evaluations in CI/CD

Now let's wire everything together. This RegressionPipeline class runs your system against the golden dataset, scores every response, and compares the results to a previous run.

```py :collapsed-lines
import json
from datetime import datetime, timezone
from dataclasses import dataclass, asdict


@dataclass
class EvalRun:
    """Records the results of one full evaluation run."""
    run_id: str
    timestamp: str
    model: str
    prompt_version: str
    total_examples: int
    avg_scores: dict  # criterion -> average score
    pass_rate: float  # percentage of examples above threshold
    failures: list[dict]  # examples that scored below threshold


class RegressionPipeline:
    """Runs evaluation against golden dataset and detects regressions."""

    def __init__(
        self,
        deterministic_eval: "DeterministicEvaluator",
        llm_judge: "LLMJudge",
        threshold: float = 3.5,
    ):
        self.det_eval = deterministic_eval
        self.judge = llm_judge
        self.threshold = threshold

    def run(
        self,
        golden_dataset: "GoldenDataset",
        generate_fn: callable,
        model_name: str,
        prompt_version: str,
    ) -> EvalRun:
        """Run full evaluation pipeline against golden dataset.

        Args:
            golden_dataset: The dataset to evaluate against.
            generate_fn: A function that takes a question string and
                         returns the model's response string.
            model_name: Identifier for the model being tested.
            prompt_version: Identifier for the prompt version.
        """
        all_scores = {}
        failures = []

        for example in golden_dataset.examples:
            # Generate response
            response = generate_fn(example.question)

            # Layer 1: Deterministic checks
            det_results = self.det_eval.run_all(response)
            det_failures = [r for r in det_results if not r.passed]

            if det_failures:
                failures.append({
                    "id": example.id,
                    "question": example.question,
                    "layer": "deterministic",
                    "details": [r.details for r in det_failures],
                })
                continue

            # Layer 2: LLM judge
            judge_results = self.judge.evaluate_all(
                example.question, response, example.criteria
            )

            for result in judge_results:
                if result.criterion not in all_scores:
                    all_scores[result.criterion] = []
                all_scores[result.criterion].append(result.score)

                if result.score < self.threshold:
                    failures.append({
                        "id": example.id,
                        "question": example.question,
                        "layer": "llm_judge",
                        "criterion": result.criterion,
                        "score": result.score,
                        "reasoning": result.reasoning,
                    })

        avg_scores = {
            criterion: sum(scores) / len(scores)
            for criterion, scores in all_scores.items()
        }

        total_evaluated = len(golden_dataset.examples)
        pass_count = total_evaluated - len(failures)

        return EvalRun(
            run_id=f"eval_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}",
            timestamp=datetime.now(timezone.utc).isoformat(),
            model=model_name,
            prompt_version=prompt_version,
            total_examples=total_evaluated,
            avg_scores=avg_scores,
            pass_rate=pass_count / total_evaluated if total_evaluated else 0,
            failures=failures,
        )

    def compare_runs(self, baseline: EvalRun, current: EvalRun) -> dict:
        """Compare two evaluation runs to detect regressions."""
        regressions = {}
        improvements = {}

        for criterion in current.avg_scores:
            if criterion in baseline.avg_scores:
                diff = current.avg_scores[criterion] - baseline.avg_scores[criterion]
                if diff < -0.2:  # Score dropped by more than 0.2
                    regressions[criterion] = {
                        "baseline": baseline.avg_scores[criterion],
                        "current": current.avg_scores[criterion],
                        "change": round(diff, 3),
                    }
                elif diff > 0.2:
                    improvements[criterion] = {
                        "baseline": baseline.avg_scores[criterion],
                        "current": current.avg_scores[criterion],
                        "change": round(diff, 3),
                    }

        return {
            "verdict": "REGRESSION" if regressions else "PASS",
            "regressions": regressions,
            "improvements": improvements,
            "pass_rate_change": current.pass_rate - baseline.pass_rate,
        }
```

Now you can hook this into your CI/CD pipeline so it runs whenever someone changes a prompt or model config. If `compare_runs` returns `REGRESSION`, the build fails. No one deploys until they figure out what went wrong.

---

## How to Know If Your AI Actually Got Better: Statistical Significance

So you tweaked your prompt and the average score went from 3.8 to 4.0. Time to celebrate, right? Maybe. Or maybe that 0.2 improvement is just random noise.

With a golden dataset of 50-100 examples, variance alone can easily produce score differences that big. You need an actual statistical test to know if the change is real.

A quick primer if you haven't done statistics in a while. A **paired t-test** is a way to compare two sets of measurements that are linked together. In our case, each pair is the same question scored under two different versions of your system: the old prompt and the new prompt.

The test looks at every pair, calculates how much the score changed for each question, and then asks: "Are these changes consistently in one direction or are they scattered randomly?"

If the changes are consistent (most questions scored higher with the new prompt), the test gives you a low p-value which means the improvement is likely real. If the changes are all over the place (some questions got better, some got worse, no clear pattern), the p-value will be high which means you can't be confident that the new version is actually better.

The reason we use a *paired* t-test instead of a regular one is that it accounts for question difficulty. Some questions are inherently harder than others, and pairing ensures we're measuring the *change per question* rather than just comparing two unrelated batches of scores.

Here's how to implement this:

```py :collapsed-lines
from scipy import stats
import numpy as np


def is_improvement_significant(
    scores_before: list[float],
    scores_after: list[float],
    alpha: float = 0.05,
) -> dict:
    """Test whether a score improvement is statistically significant.

    Uses a paired t-test since the same questions are evaluated in both runs.
    """
    t_stat, p_value = stats.ttest_rel(scores_after, scores_before)
    mean_diff = np.mean(scores_after) - np.mean(scores_before)

    return {
        "mean_before": round(np.mean(scores_before), 3),
        "mean_after": round(np.mean(scores_after), 3),
        "mean_difference": round(mean_diff, 3),
        "p_value": round(p_value, 4),
        "is_significant": p_value < alpha,
        "direction": "improvement" if mean_diff > 0 else "regression",
        "recommendation": (
            "Safe to deploy"
            if p_value < alpha and mean_diff > 0
            else "Do not deploy - change is not a significant improvement"
        ),
    }


if __name__ == "__main__":
    # scores on 20 golden examples, before and after a prompt change
    before = [3, 4, 3, 5, 4, 3, 4, 4, 3, 5, 4, 3, 4, 3, 4, 5, 3, 4, 4, 3]
    after =  [4, 4, 4, 5, 5, 3, 4, 5, 4, 5, 4, 4, 4, 4, 5, 5, 4, 4, 5, 4]

    result = is_improvement_significant(before, after)
    print(f"Mean: {result['mean_before']} -> {result['mean_after']}")
    print(f"p-value: {result['p_value']}")
    print(f"Significant: {result['is_significant']}")
    print(f"Recommendation: {result['recommendation']}")
```

If the p-value comes back below 0.05, there's less than a 5% chance the improvement is just luck. That's when you ship. Anything above that and your improvement might just be noise, so don't deploy it no matter how good the averages look.

---

## How to Put It All Together: The Complete Evaluation Architecture

Let's connect all three layers into a single orchestrator. This is the class that ties everything together. It runs deterministic checks first, escalates to LLM judging if those pass, and optionally brings in human evaluation for calibration.

```py
class EvaluationOrchestrator:
    """Coordinates all three evaluation layers into a single pipeline."""

    def __init__(self):
        self.det_eval = DeterministicEvaluator()
        self.llm_judge = LLMJudge()
        self.annotation_collector = AnnotationCollector()

    def evaluate_response(
        self,
        question: str,
        response: str,
        run_human_eval: bool = False,
    ) -> dict:
        """Run the complete evaluation pipeline on a single response."""

        # Layer 1: Deterministic (always runs, every request)
        det_results = self.det_eval.run_all(response)
        det_passed = all(r.passed for r in det_results)

        if not det_passed:
            return {
                "status": "FAIL",
                "layer": "deterministic",
                "details": [r for r in det_results if not r.passed],
                "recommendation": "Fix structural issues before deeper eval",
            }

        # Layer 2: LLM Judge (runs on sample or in CI)
        judge_results = self.llm_judge.evaluate_all(question, response)
        avg_score = sum(r.score for r in judge_results) / len(judge_results)

        if avg_score < 3.5:
            return {
                "status": "FAIL",
                "layer": "llm_judge",
                "avg_score": avg_score,
                "details": judge_results,
                "recommendation": "Response quality below threshold",
            }

        # Layer 3: Human eval (periodic calibration)
        if run_human_eval:
            annotation = self.annotation_collector.collect_annotation(
                question, response, annotator="reviewer"
            )
            return {
                "status": "PASS" if annotation.score >= 4 else "REVIEW",
                "layer": "human",
                "automated_score": avg_score,
                "human_score": annotation.score,
            }

        return {
            "status": "PASS",
            "layer": "llm_judge",
            "avg_score": avg_score,
            "details": judge_results,
        }
```

---

## What I Wish I Knew Earlier

I want to close with some things I wish someone had told me before I started building eval systems.

**First, don't build all three layers at once.** Start with just the deterministic checks, and then ship them. You'll be surprised how many issues they catch on their own, and the process of writing them forces you to actually define what correct output means for your app. Add the LLM judge when you need it and then add human eval later.

**Second, check your judge against humans once a month.** Run your LLM judge on 20-30 responses that already have human scores. If the judge has drifted more than 0.5 points on average, something changed: maybe the judge model was updated, or maybe your rubric doesn't cover a new failure mode. Either way, you need to recalibrate.

**Third, every production failure becomes a test case.** This is maybe the most useful habit. Something breaks? Great, that's a new golden dataset example. Over a few months, your dataset stops being a generic test suite and becomes a detailed map of every way your app has ever failed.

And finally, **don't chase perfect eval scores**. I've seen teams tweak prompts endlessly to push their eval scores from 4.2 to 4.5 only to discover that their rubric had a blind spot and users were still unhappy. The scores are a tool, not a goal, so human evaluation exists to catch what the numbers miss.

---

## Wrapping Up

We covered a lot of ground in this article, so let me bring it all together. The core problem is that LLM applications fail differently from traditional software. There's no crash, no error log, and no stack trace. Just a confident, well-formatted, wrong answer.

And because the outputs aren't deterministic, you can't test them with simple assertions. You need a different approach entirely.

That approach is a layered evaluation pipeline:

- **Layer 1 (Deterministic Checks)** handles the basics: is the output valid, the right length, and free of hallucinated URLs? These are fast, free, and catch more problems than you'd expect.
- **Layer 2 (LLM-as-Judge)** brings in semantic evaluation: is the response actually relevant, accurate, and complete? By giving a judge model a clear rubric with concrete scoring criteria, you get surprisingly reliable and automated quality scores.
- **Layer 3 (Human Evaluation)** keeps the whole system calibrated. A small batch of human reviews on a regular schedule catches the subtle issues that automated scoring misses, like tone, clarity, and the difference between "correct" and "genuinely helpful."

On top of those three layers, you learned how to build a regression testing pipeline with golden datasets so you can catch quality drops before they reach production. You also learned how to use statistical significance testing to make sure your improvements are real and not just noise.

If there's one thing I'd want you to take away, it's this: start small. Don't try to build all of this in a weekend. Drop the DeterministicEvaluator class into your project today: that takes five minutes and it'll immediately start catching things you're currently missing. Then add the LLM judge when you're ready for deeper evaluation. Then layer in human review and regression testing as your app matures.

The teams that ship reliable AI products aren't the ones with the fanciest models. They're the ones who built the scaffolding to know when those models are failing and who catch it before their users do.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Self-Evaluating AI System: Automated Testing and Evaluation Pipelines for LLM Applications",
  "desc": "So you shipped your AI feature and it works in demos. Your team is impressed. Then a user asks a question slightly outside your test cases and the model confidently returns something completely wrong.",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-self-evaluating-ai-system-automated-testing-and-evaluation-pipelines-for-llm-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
