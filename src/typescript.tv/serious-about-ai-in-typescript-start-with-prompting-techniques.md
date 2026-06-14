---
lang: en-US
title: "Serious About AI in TypeScript? Start With Prompting Techniques"
description: "Article(s) > Serious About AI in TypeScript? Start With Prompting Techniques"
icon: iconfont icon-typescript
category:
  - TypeScript
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - ai

head:
  - - meta:
    - property: og:title
      content: "Article(s) > Serious About AI in TypeScript? Start With Prompting Techniques"
    - property: og:description
      content: "Serious About AI in TypeScript? Start With Prompting Techniques"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/serious-about-ai-in-typescript-start-with-prompting-techniques.html
prev: /programming/ts/articles/README.md
date: 2026-06-19
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
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
  name="Serious About AI in TypeScript? Start With Prompting Techniques"
  desc="An AI once told me to walk to the car wash. Here is why low-context prompts produce wrong answers, and the prompting techniques that get you better TypeScript out of any model."
  url="https://typescript.tv/best-practices/serious-about-ai-in-typescript-start-with-prompting-techniques"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

An AI once told me to walk to the car wash. Here is why low-context prompts produce wrong answers, and the prompting techniques that get you better TypeScript out of any model.

Ask an AI a sloppy question and you get a confident, well written, wrong answer. I learned this the day I asked ChatGPT whether I should walk or drive to the car wash. It told me to walk, because walking would give me some healthy movement and save fuel. Reasonable advice, except it completely missed the point. The entire reason to go to a car wash is to wash your car, which means the car has to be there, which means you have to drive. The model optimized for a generic "walking is good" pattern and ignored the one fact that mattered.

---

## Why a Bad Prompt Gives a Bad Answer

That car wash answer is not a sign of a dumb model. It is a sign of a thin prompt. When you give a language model almost no context, it falls back on the most statistically common response, and the most common response to "should I walk or drive" is a lecture about exercise. The model never had a reason to notice that the destination only makes sense with the car.

Now watch what happens when I stop asking lazily and start instructing the model how to think. This is a technique called meta-prompting:

```plaintext title="meta-prompt.txt"
Should I walk or drive to the car wash? Solve as follows:
1. Rephrase the question.
2. List the knowns and unknowns.
3. Outline your approach.
4. Reason one step at a time.
5. State your recommendation.
```

With that structure, the model restates the goal (get the car cleaned), notices the unknown (am I bringing the car or not), reasons through it, and lands on the correct answer. You almost certainly need to drive, unless you happen to work at the car wash or you just feel like taking a walk. Same model, same question, completely different quality, because I told it how to reason instead of hoping it would.

This is exactly the gap between a junior and a senior when working with AI on TypeScript. The model is not the bottleneck. Your instructions are. The rest of this article walks through eleven prompting techniques, what the research actually says about each one, and how to apply them when you write TypeScript with an assistant like [<VPIcon icon="iconfont icon-claude"/>Claude](https://anthropic.com/claude) or [<VPIcon icon="iconfont icon-openai"/>ChatGPT](https://chatgpt.com/).

---

## Prompting Techniques

What follows are eleven techniques, ordered roughly from the simplest to the most elaborate. Each one includes what it is, what the research says, a TypeScript example, and when it earns its keep.

### Zero-Shot Prompting

Zero-shot prompting means you ask for a task with no examples at all and let the model lean entirely on what it learned during training. [<VPIcon icon="iconfont icon-ibm"/>IBM describes it](https://ibm.com/think/topics/prompt-engineering-techniques) as performing a task "without any prior examples," relying purely on pretrained knowledge.

This is the default way most people prompt:

```plaintext title="zero-shot.txt"
Write a TypeScript debounce function that is fully typed and preserves
the parameter types of the wrapped function.
```

A capable model produces a clean generic `debounce` here without any help, because the internet is full of debounce implementations. Zero-shot is the right tool when the task is conventional and you do not care about matching a specific style. It starts to fail the moment your problem is unusual or depends on conventions the model has never seen, which is where the next techniques earn their keep.

### Lazy Prompting

Lazy prompting is the deliberate cousin of zero-shot, a term popularized by [<VPIcon icon="fas fa-globe"/>Andrew Ng](https://deeplearning.ai/the-batch/). The idea is to paste in the raw material with almost no instructions and trust the model to infer what you want from context. The classic move is dropping a compiler error straight into the chat with no explanation:

```plaintext title="lazy-prompt.txt"
src/user.ts:14:3 - error TS2532: Object is possibly 'undefined'.
```

Often that is enough. The error code and message carry so much signal that the model knows exactly what you want, which is a fix and an explanation. Lazy prompting is wonderful for speed when the context is self explanatory, such as a stack trace, a failing test, or a `tsc` error. It breaks down when the model genuinely cannot guess your intent. Pasting a 400 line file with the word "fix" tells the model nothing about what "fixed" means to you, and you will get a confident guess that solves the wrong problem.

### Few-Shot Prompting

Few-shot prompting hands the model a handful of examples inside the prompt so it can pattern match your intent. The technique paper known as [<VPIcon icon="iconfont icon-arxiv"/>The Prompt Report](https://arxiv.org/abs/2406.06608) defines it as learning to complete a task "with only a few examples," a behavior researchers call in-context learning.

This is my go-to for forcing the model to respect conventions that live only in my codebase. Suppose every [<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev/) schema in my project follows a naming and export pattern. I show two examples, then ask for a third.

```ts title="few-shot.ts"
// Example 1
export const userSchema = z.object({ id: z.string().uuid(), name: z.string() });
export type User = z.infer<typeof userSchema>;
 
// Example 2
export const postSchema = z.object({ id: z.string().uuid(), title: z.string() });
export type Post = z.infer<typeof postSchema>;
 
// Now generate the same pattern for a "Comment" with id, body, and authorId.
```

The two exemplars do more than any paragraph of description could. The model copies the export style, the `z.infer` pairing, and the naming, because it has concrete patterns to imitate. The limitation is that examples teach format and style far better than they teach reasoning. Few-shot alone is not enough for hard multi-step logic, a gap that [<VPIcon icon="iconfont icon-arxiv"/>Wei and colleagues documented](https://arxiv.org/abs/2201.11903) when few-shot prompting failed on grade-school math word problems. That failure is what motivated the next technique.

### Chain-of-Thought (CoT)

Chain-of-thought prompting asks the model to produce intermediate reasoning steps before committing to an answer. Wei and colleagues showed that providing these "intermediate reasoning steps significantly improves" performance on complex reasoning tasks. The everyday version is simply adding "think step by step" to your prompt.

For TypeScript, this shines when you are untangling a gnarly generic or a type error that does not have an obvious cause.

```plaintext title="cot-prompt.txt"
This conditional type resolves to `never` and I do not understand why.
Walk through the type resolution step by step, explaining what each
branch evaluates to, before you suggest a fix.
```

By forcing the model to narrate the type resolution, you both get a better fix and a fix you can actually verify, because the reasoning is visible. Two caveats come straight from the research. Chain-of-thought is an emergent ability that shows up in large models (roughly 100 billion parameters and above) and can actually degrade the output of smaller models. In the original experiments, a 540 billion parameter model jumped from around 18 percent to around 57 percent on a math benchmark once chain-of-thought was applied. On a tiny local model, the same prompt can make things worse, so match the technique to the model.

### Self-Consistency

Self-consistency takes chain-of-thought and runs it several times. Instead of greedily accepting the first reasoning path, you sample several diverse paths and take the answer that shows up most often. [<VPIcon icon="fas fa-globe"/>Wang and colleagues](https://openreview.net/forum?id=1PL1NIMMrw) describe sampling a "diverse set of reasoning paths" and then selecting the "most consistent answer" by majority vote.

You can apply this by hand on a high stakes decision. When I am unsure how to type a tricky API boundary, I ask for three independent attempts and look for consensus.

```plaintext title="self-consistency.txt"
Propose three independent ways to type this event-emitter API so that
the listener payload is inferred from the event name. Solve each one
from scratch without referring to the others, then tell me which
approach the majority of your attempts converged on and why.
```

When two or three of the attempts arrive at the same shape, my confidence goes up. When they all disagree, that disagreement is itself a signal that the problem is genuinely ambiguous and deserves a human decision. The obvious cost is that you pay for several runs instead of one, so I reserve this for decisions that are expensive to get wrong.

### Least-to-Most (LtM)

Least-to-most prompting splits a hard problem into smaller subproblems, then solves them in order, feeding each answer into the next. [<VPIcon icon="iconfont icon-arxiv"/>Zhou and colleagues](https://arxiv.org/abs/2205.10625) describe a two-stage process that first decomposes the problem without solving it, then solves each piece sequentially using the answers from earlier pieces.

The headline result is that this generalizes to problems harder than the examples you showed. On the [<VPIcon icon="iconfont icon-arxiv"/>SCAN](https://arxiv.org/abs/1711.00350) compositional generalization benchmark, the same researchers reported a model reaching at least 99 percent accuracy with 14 examples using least-to-most, compared to only 16 percent with chain-of-thought.

For a real feature, I let the model lay out the dependency chain before writing a line of code:

```plaintext title="least-to-most.txt"
I want to add CSV export to my TypeScript app. First, list the
subproblems in dependency order without solving them. Then solve them
one at a time, using the result of each step as input to the next:
the row type, the serializer, the streaming response, and the test.
```

Because each step builds on a concrete prior answer, the serializer actually matches the row type and the test actually matches the serializer. This is the technique I reach for when a task is too big to one-shot but has a clear internal order.

### Multi-Task Prompting

Multi-task prompting bundles several related requests into a single prompt so the model handles them together with shared context. Rather than three round trips, you ask once:

```plaintext title="multi-task.txt"
For the function below: (1) add precise parameter and return types,
(2) write a TSDoc comment with an @example, and (3) generate a Vitest
test covering the empty-input and happy-path cases.
```

The win is efficiency, since the model loads the function into context once and reuses that understanding across all three jobs, and the outputs stay consistent with each other. The risk is dilution. Pack in too many unrelated tasks and the quality of each one drops as the model spreads its attention thin. I keep the tasks tightly related, as above, where types, docs, and tests all revolve around the same function.

### Role Prompting

Role prompting assigns the model a persona, such as "you are a strict TypeScript reviewer who hates the `any` type." It is probably the most repeated piece of prompting advice on the internet, which makes the research finding genuinely surprising. A [<VPIcon icon="iconfont icon-arxiv"/>study by Zheng and colleagues](https://arxiv.org/abs/2311.10054) tested 162 personas across thousands of questions and nine models, and found that adding a persona does not improve accuracy on objective tasks, and in some cases lowers it.

So I no longer use roles to make answers more correct, because the evidence says that does not work. A role that is too strict can even backfire into a refusal. Tell the model "you are a TypeScript reviewer" and then ask a quick Python question, and it may reply "I cannot help with Python coding questions." You built a fence and then walked into it. I now use roles only to shape tone, format, and emphasis:

```plaintext title="role-prompt.txt"
Act as a TypeScript reviewer who prioritizes readability over cleverness.
Review this pull request and phrase every comment as an actionable suggestion.
```

Here the persona is steering style, not facts. It nudges the model toward readability oriented, suggestion shaped feedback. If you instead want the review to actually catch more bugs, lean on chain-of-thought and concrete examples rather than a job title, because that is where the measured gains come from.

Where a persona really earns its place is in a dedicated skill you build for an AI, the kind of reusable instruction set that ships with an assistant. There you want a consistent look and feel across every response, so a well defined role keeps the tone, vocabulary, and formatting uniform no matter who triggers the skill.

### Meta-Prompting

Meta-prompting is prompting about the structure of the thinking rather than the content of the answer. The car wash fix from the start of this article is meta-prompting in action, since I told the model to restate, identify knowns, outline a strategy, reason step by step, and only then answer. A second flavor of meta-prompting is asking the model to write or improve the prompt itself.

For architecture decisions, the procedural version is my default:

```plaintext title="meta-prompt-ts.txt"
Should I model these states as a discriminated union or a class
hierarchy? Solve as follows: restate the problem, list the knowns and
unknowns, outline the trade-offs, reason step by step, then give a
recommendation with the deciding factor stated explicitly.
```

The second flavor is almost a cheat code. When I do not know how to ask for something, I ask the model to write the prompt for me, then I run that prompt.

### Tree-of-Thought (ToT)

Tree-of-thought generalizes chain-of-thought from a single line of reasoning into a branching tree. [<VPIcon icon="iconfont icon-arxiv"/><VPIcon icon="fa-brands fa-wikipedia-w"/>Yao and colleagues](https://arxiv.org/abs/2305.10601) describe the model exploring multiple "thoughts," self-evaluating each branch, and "looking ahead or backtracking" using classic search strategies like breadth-first and depth-first traversal. Their benchmark was the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Game of 24](https://en.wikipedia.org/wiki/24_(puzzle)), a math puzzle where you combine four numbers with addition, subtraction, multiplication, and division to reach exactly 24, using each number once. On that task, a strong model solved 4 percent of the hard cases with chain-of-thought and 74 percent with tree-of-thought.

That power has a price. Exploring and scoring many branches can cost between 5 and 100 times more tokens than a single chain-of-thought pass, so I save it for design problems with several plausible paths:

```plaintext title="tree-of-thought.txt"
I need to design the state management for a multi-step form wizard in
TypeScript. Generate three distinct architectural approaches. For each,
evaluate the trade-offs in type safety and testability, prune the
weakest, then expand the most promising one into a concrete design.
```

By asking the model to branch, evaluate, and prune, you get a reasoned recommendation instead of the first idea that came to mind. For a quick bug fix this is overkill, but for a decision you will live with for months it can be worth every token.

It is worth mentioning that Tree-of-thought is not an agentic loop. It explores internal thoughts that the model scores itself, steered by a fixed search strategy. An agent loops over real actions, runs a tool, observes the result, then decides the next step. Tree-of-thought is a way of thinking, not a way of acting, even though you can use it inside an agent's reasoning step.

### Graph-of-Thought (GoT)

Graph-of-thought is the most general technique in this list. [<VPIcon icon="iconfont icon-arxiv"/>Besta and colleagues](https://arxiv.org/abs/2308.09687) model reasoning as an arbitrary graph where individual thoughts are vertices and their dependencies are edges, which allows aggregating several thoughts into one, looping back with feedback, and revisiting earlier conclusions. It is the most expressive structure and also carries the highest overhead.

In day-to-day TypeScript work you rarely orchestrate a full reasoning graph by hand, but the mental model is useful for large, interconnected refactors where pieces depend on each other in both directions:

```plaintext title="graph-of-thought.txt"
I am migrating this module from REST to tRPC. Map the work as a
dependency graph: identify each unit of work, note which units depend
on which, then merge the overlapping type definitions into a shared
set before generating the final migration plan.
```

The value here is the aggregation and feedback that a straight line or even a tree cannot express, since the shared types feed back into multiple branches at once. Treat graph-of-thought as the heavyweight option you reach for only when the problem genuinely has that interconnected shape, because of the coordination cost.

---

## Choosing the Right Technique

The techniques are not competitors, they are a toolbox, and good TypeScript work usually combines a few of them. You might use few-shot to lock in your conventions, chain-of-thought to reason through a type error, and meta-prompting to structure the whole request. Here is a quick map from situation to technique.

| Situation | Reach for |
| --- | --- |
| Build a utility widely known in the internet | Zero-shot |
| Paste a `tsc` error or failing test | Lazy prompting |
| Generate code that matches your repository style | Few-shot |
| Debug a `never` type or a tricky generic | Chain-of-thought |
| Decide how to type an ambiguous API boundary | Self-consistency |
| Build a feature with ordered subtasks | Least-to-most |
| Add types, docs, and a test in one pass | Multi-task |
| Set the tone of a code review or a reusable skill | Role prompting |
| Structure an architecture decision | Meta-prompting |
| Compare several designs for a module | Tree-of-thought |
| Plan a migration with interdependent types | Graph-of-thought |

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Serious About AI in TypeScript? Start With Prompting Techniques",
  "desc": "An AI once told me to walk to the car wash. Here is why low-context prompts produce wrong answers, and the prompting techniques that get you better TypeScript out of any model.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/serious-about-ai-in-typescript-start-with-prompting-techniques.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
