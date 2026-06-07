---
lang: en-US
title: "Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data"
description: "Article(s) > Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data"
icon: iconfont icon-langchain
category:
  - TypeScript
  - AI
  - LLM
  - LangChain
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data"
    - property: og:description
      content: "Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/mastra-vs-langchain-building-an-ai-agent-pipeline-and-analyzing-the-data.html
prev: /ai/langchain/articles/README.md
date: 2026-06-13
isOriginal: false
author:
  - name: Shola Jegede
    url: https://freecodecamp.org/news/author/sholajegede/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0e1e81b3-6e39-4532-a12b-e99f600e372f.png
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
  name="Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data"
  desc="A week ago, I saw this tweet: I had just shipped SupportMesh, a multi-tenant AI support platform built on Mastra, so I had opinions from production. I liked the .dowhile() loop, the typed step schem"
  url="https://freecodecamp.org/news/mastra-vs-langchain-building-an-ai-agent-pipeline-and-analyzing-the-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0e1e81b3-6e39-4532-a12b-e99f600e372f.png"/>

A week ago, I saw this tweet:

![tweet image: @omaroubari_ asking "has anyone tried mastra and langchain for agent orchestration? which is better?"](https://cdn.hashnode.com/uploads/covers/62cab1b3e62bf98e0fb0a38f/fae48919-95f1-4089-969a-98da75006424.png)

I had just shipped SupportMesh, a multi-tenant AI support platform built on Mastra, so I had opinions from production.

I liked the `.dowhile()` loop, the typed step schemas, and the way `createWorkflow` kept orchestration logic in one place. What I didn't like was the token overhead: every agent step initialises Mastra's tool loop manager regardless of whether tools are needed, and across a four-step pipeline that adds up to seconds of extra latency and thousands of extra tokens per run.

At the same time, I was looking at LangChain for a separate project I was starting. The approach is completely different from Mastra. Instead of a workflow with typed step contracts, you build a directed graph where nodes are plain async functions and state is a single shared object.

The promise is leaner execution and more explicit control over exactly what goes into each model call, which, given the token overhead I had been seeing with Mastra, was exactly the kind of thing I wanted to understand properly.

So rather than picking one based on documentation and vibes, I built the same pipeline in both and measured everything. The same five-step research and synthesis pipeline, twice, with every piece instrumented: tokens per step, latency per step, the exact prompt sent to Claude at each stage, the raw Tavily search results, and a production-grade evaluation system that actually produces varied scores rather than giving everything a 7. Then I built a real-time web dashboard on Convex and Next.js so you can run any topic yourself and see every decision both frameworks make to get there.

![Mastra vs LangChain dashboard showing both pipelines complete side by side, with Mastra scoring 9/10 in 25.2s using 9,846 tokens and LangChain scoring 8/10 in 19.8s using 7,875 tokens on the topic "What is the real cost of running AI agents in production?"](https://cdn.hashnode.com/uploads/covers/62cab1b3e62bf98e0fb0a38f/950d7575-7048-42d9-9e00-9a59446c36dd.png)

::: note Prerequisites

To follow along and run this yourself, you'll need four things:

- **Node.js 22 or later**: the pipeline packages use modern TypeScript features that require a recent Node version.
- **An Anthropic API key**: you can get one at [<VPIcon icon="fas fa-globe"/>`console.anthropic.com`](http://console.anthropic.com). Claude Haiku 4.5 is cheap enough that running this benchmark a dozen times costs a few cents.
- **A Tavily API key**: you can get one at [<VPIcon icon="fas fa-globe"/>`tavily.com`](http://tavily.com). The free tier gives you 1,000 searches a month, which is more than enough to run this benchmark repeatedly.
- **A Convex account**: you can sign up at [<VPIcon icon="fas fa-globe"/>`convex.dev`](http://convex.dev). The free tier covers everything here.

:::

Once you have those, the setup section at the end of this article walks through exactly where each one goes.

---

## The Tools We're Using

Before getting into the build, it helps to know what each tool I used is and why it's in the stack. If you're already familiar with all of these, you can skip ahead.

[<VPIcon icon="fas fa-globe"/>Mastra](https://mastra.ai) is a TypeScript-first framework for building AI-powered applications and agents. The idea is that you define individual steps with typed input and output schemas, chain them into a workflow, and the framework handles the data flow between them. It has opinions about structure, which is either a feature or a constraint depending on what you're building.

[<VPIcon icon="iconfont icon-langchain"/>LangChain](https://langchain.com) is one of the most widely used frameworks for building LLM applications. It started in Python and has a TypeScript version.

For agent orchestration specifically, the relevant piece is **LangGraph**, which is LangChain's graph-based execution layer. Instead of a workflow with typed step contracts, you build a directed graph: nodes are plain async functions, state is a single shared object that every node reads from and writes to, and the flow between nodes is controlled by edges.

[<VPIcon icon="iconfont icon-claude"/>Claude Haiku 4.5](https://anthropic.com/claude/haiku) is the model powering all agents. It is Anthropic's fastest and most cost-efficient model, which makes it the right choice here.

[<VPIcon icon="fas fa-globe"/>Tavily](https://tavily.com) is a web search API built specifically for AI agents. Unlike a general search API, it returns structured results with relevance scores and content snippets that are ready to pass directly into a model prompt. The free tier is generous enough to run this benchmark without paying anything.

I used it here because it has a clean TypeScript SDK, it works in both Mastra tools and plain LangChain nodes without any adapter layer, and the search results are consistent enough that both pipelines are working with the same quality of input.

[<VPIcon icon="fas fa-globe"/>Convex](https://convex.dev) is a real-time database with a React hook, `useQuery`, that automatically re-renders your component whenever the underlying data changes. No polling, no WebSocket setup, and no manual state syncing. When both pipelines are writing step data as they execute, the run page just updates.

[<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org) is the web framework for the dashboard. App Router, API routes for the pipeline execution, and server components where they make sense.

---

## Why This Pipeline

A simple comparison wouldn't tell me anything useful, because the difference between frameworks only shows up when you actually push them.

The pipeline I landed on has five steps:

```plaintext
Topic
  ↓
1. RESEARCH   (Tavily web search, 5 results with relevance scores)
2. ANALYSIS   (Extract 5 key findings, 3 themes, 1 central argument)
3. WRITE      (Draft a structured ~400-word report)
4. CRITIC     (Score the draft, provide dimension-level feedback)
5. LOOP       (Revise if score below 7, output if passes or 3 iterations used)
```
<!-- TODO: mermaid화 -->

I chose each step because it stresses the frameworks differently.

The research step requires a real tool call, which is where Mastra's Agent abstraction does its heaviest work. The analysis step needs structured JSON output, which tests how each framework enforces output shape. The write step has strict content requirements enforced purely through prompt engineering. The critic needs to do chain-of-thought reasoning and produce structured JSON at the same time, which turns out to be harder than it sounds. And the revision loop tests perhaps the most fundamental difference between the two frameworks: how each one expresses conditional iteration.

Taken together, this covers most of what you would actually build with an agent framework in production: tool calls, structured output, multi-step orchestration, quality evaluation, and feedback loops.

---

## The Project Structure

Everything lives in a single monorepo using npm workspaces, which means all packages share a single <VPIcon icon="fas fa-folder-open"/>`node_modules` at the root and can import each other directly:

```sh title="file structure"
mastra-vs-langchain/
├── packages/
│   ├── mastra-pipeline/          # Mastra implementation
│   ├── langchain-pipeline/       # LangChain/LangGraph implementation
│   ├── web/                      # Next.js 16 App Router dashboard
│   └── shared/                   # Shared TypeScript types
├── convex/                       # Real-time backend
└── package.json                  # Workspace root
```

The most important piece of the shared package is the `PipelineCallbacks` interface, which both pipeline implementations must satisfy. This is the contract that lets the dashboard receive live events from either framework: step starts, step completions, token counts, and Tavily results, all without knowing anything about Mastra or LangChain specifically:

```ts title="packages/shared/src/types.ts"
export interface PipelineCallbacks {
  onPipelineStart: () => Promise<string>;
  onPipelineComplete: (id: string, data: PipelineCompleteData) => Promise<void>;
  onPipelineError: (id: string, error: string) => Promise<void>;
  step: {
    onStepStart: (stepName: string, iteration: number, input: string) => Promise<string>;
    onStepComplete: (stepId: string, data: StepCompleteData) => Promise<void>;
    onStepError: (stepId: string, error: string) => Promise<void>;
  };
}
```

Every Convex write, live log entry, and token count flows through this interface. Adding a new framework to the benchmark in the future means implementing this interface and plugging it into the API route, and nothing else needs to change.

---

## Building the Mastra Pipeline

If you haven't used Mastra before, the core mental model is this: you define individual steps with typed input and output schemas, chain them together into a workflow, and Mastra manages the data flow between them.

The framework is opinionated about structure but that structure gives you type safety across the entire pipeline and makes the orchestration logic easy to read.

### The Search Tool

Mastra tools are created with `createTool`, which takes a Zod input schema and an `execute` function that receives the validated input directly:

```ts title="packages/mastra-pipeline/src/tools/search.ts"
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY! });

export let lastTavilyCapture: { query: string; results: any[] } = {
  query: "",
  results: [],
};

export function resetTavilyCapture() {
  lastTavilyCapture = { query: "", results: [] };
}

export const searchTool = createTool({
  id: "web-search",
  description: "Search the web for information on a topic",
  inputSchema: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    lastTavilyCapture = { query, results: [] };
    const results = await client.search(query, {
      maxResults: 5,
      searchDepth: "basic",
    });
    lastTavilyCapture.results = results.results;
    return { results: results.results };
  },
});
```

The `lastTavilyCapture` module-level variable is a deliberate workaround for a real constraint. Mastra's tool execution happens inside the agent's internal tool loop, which sits one layer below the workflow step.

I needed to capture the Tavily query and results for the dashboard so users can see the actual URLs and relevance scores for each run, but threading a callback through the agent's tool execution context would have required patching Mastra internals. Capturing at module scope and calling `resetTavilyCapture()` at the start of each research step is less elegant but completely reliable, and it prevents stale data from a previous run bleeding into the current one.

### The Agents

Each step in the Mastra pipeline runs as a separate `Agent` instance. One thing worth knowing if you're just getting started with Mastra is that it requires an explicit `id` field alongside `name`. If you skip it, TypeScript throws a confusing error about missing required fields that doesn't point at the actual problem:

```ts title="packages/mastra-pipeline/src/agents/researcher.ts"
export const researcherAgent = new Agent({
  name: "Researcher",
  id: "researcher",           // required in v1.41 - easy to miss
  instructions: `You are a research agent. When given a topic, use the 
  web-search tool to find 5 relevant results. Return ALL the raw search 
  results including titles, URLs, and content snippets as a formatted string.`,
  model: anthropic("claude-haiku-4-5"),
  tools: { searchTool },
});
```

The writer agent carries all its content requirements directly in the instructions rather than in a separate validation layer. This keeps the constraints in one visible place, which matters when the critic is giving feedback about which specific requirements the draft violated:

```ts title="packages/mastra-pipeline/src/agents/writer.ts"
export const writerAgent = new Agent({
  name: "Writer",
  id: "writer",
  instructions: `You are a research analyst writing for a technical audience.

STRICT REQUIREMENTS:
- Opening sentence must state a specific finding from the research.
  Never open with "X is increasingly important."
- Every paragraph makes exactly one argument. State it first.
  Support it with specific evidence.
- Name specific tools, frameworks, companies, numbers, and dates.
- Conclusion must make a specific recommendation or prediction.
  It must not restate the introduction.
- Target length: 350-450 words.

FORBIDDEN PHRASES:
"it is important to note", "it is worth noting",
"organizations must consider", "in conclusion", "in summary",
"as we look to the future", "rapidly evolving landscape",
any sentence equally true if you replaced the topic`,
  model: anthropic("claude-haiku-4-5"),
});
```

### The writeCriticStep: Why Write and Critic Live in the Same Step

While implementing Mastra, I made one architectural decision here that diverges from most tutorials, and it's worth understanding why.

Mastra's `.dowhile()` construct loops a single step until a condition is met. That's clean when you have one thing to repeat, but the revision loop needs two things: a write step followed by a critic step. You can either combine them into one step, or build a nested workflow where the inner workflow contains both steps.

A nested workflow adds a layer of complexity that doesn't buy you anything in this case, so the write and critic phases live together in `writeCriticStep`. The step runs the writer first, then immediately runs the critic on the draft, and returns a combined output that includes both the draft and the score:

```ts :collapsed-lines
const writeCriticStep = createStep({
  id: "write-critic",
  inputSchema: z.object({
    topic: z.string(),
    research: z.string(),
    analysis: z.string(),
    keyFindings: z.array(z.string()),
    mainThemes: z.array(z.string()),
    centralArgument: z.string(),
    draft: z.string().optional(),       // populated after first iteration
    score: z.number().optional(),       // populated after first iteration
    feedback: z.string().optional(),    // populated after first iteration
    iterations: z.number().optional(),
  }),
  outputSchema: z.object({
    // ... all input fields plus draft, score, feedback, iterations
  }),
  execute: async ({ inputData }) => {
    const iteration = (inputData.iterations ?? 0) + 1;

    // WRITE phase
    let writerPrompt = `Topic: "\({inputData.topic}"\n\nResearch:\n\){inputData.research}\n\nAnalysis:\n${inputData.analysis}`;
    if (inputData.feedback && inputData.draft) {
      // On revisions, the writer sees its previous attempt and the specific feedback
      writerPrompt += `\n\nPrevious draft:\n\({inputData.draft}\n\nFeedback:\n\){inputData.feedback}`;
    }

    const writeStepId = await callbacks.step.onStepStart("write", iteration, writerPrompt.slice(0, 500));
    const writerResult = await writerAgent.generate(writerPrompt);
    const draft = writerResult.text;
    await callbacks.step.onStepComplete(writeStepId, { output: draft, /* token data */ });

    // CRITIC phase: runs immediately after write, on the same draft
    const criticPrompt = `RESEARCH:\n\({inputData.research}\n\nANALYSIS:\n\){inputData.analysis}\n\nDRAFT:\n${draft}`;
    const criticStepId = await callbacks.step.onStepStart("critic", iteration, draft.slice(0, 500));
    const criticResult = await criticAgent.generate(criticPrompt);
    const parsed = extractJson(criticResult.text);
    const score = parsed?.score ?? 4;
    const feedback = parsed?.feedback ?? "Score parsing failed";
    await callbacks.step.onStepComplete(criticStepId, { output: criticResult.text, criticScore: score });

    return { ...inputData, draft, score, feedback, iterations: iteration };
  },
});
```

The `.dowhile()` condition then checks whether to loop again. It receives the output of the previous `writeCriticStep` as `inputData`, so it can read the score directly:

```ts
const workflow = createWorkflow({
  id: `research-pipeline-${Date.now()}`,  // timestamp prevents conflicts on concurrent runs
  inputSchema: z.object({ topic: z.string() }),
})
  .then(researchStep)
  .then(analysisStep)
  .dowhile(
    writeCriticStep,
    async ({ inputData }) => inputData.score < 7 && inputData.iterations < 3
  )
  .commit();
```

The `Date.now()` in the workflow ID is there because Mastra workflows with a static ID conflict when two runs start concurrently. Adding the timestamp gives each run a unique workflow instance.

### Token Capture

After any `agent.generate()` call, usage data lives on the result object. The shape changes between Mastra versions, so checking both possible field names is the safe approach:

```ts
const inputTokens =
  (result as any).usage?.promptTokens ??
  (result as any).usage?.inputTokens ??
  0;
const outputTokens =
  (result as any).usage?.completionTokens ??
  (result as any).usage?.outputTokens ??
  0;
```

---

## Building the LangChain Pipeline

LangChain/LangGraph solves the same problem with a fundamentally different mental model.

Where Mastra gives you a workflow with explicitly typed step contracts, LangGraph gives you a directed graph. Nodes are plain async functions, state is a single shared mutable object that flows through the graph, and the execution order is determined by edges rather than a chain of `.then()` calls.

### The State Annotation

Before writing any nodes, you define the shape of the shared state using `Annotation.Root`. Every node in the graph reads from and writes to this object:

```ts title="packages/langchain-pipeline/src/graph/state.ts"
export const PipelineState = Annotation.Root({
  topic: Annotation<string>(),
  research: Annotation<string>(),
  analysis: Annotation<string>(),
  draft: Annotation<string>(),
  score: Annotation<number>(),
  feedback: Annotation<string>(),
  iterations: Annotation<number>(),
  finalReport: Annotation<string>(),
  criticDimensions: Annotation<object>(),
});
```

Coming from Mastra, the difference in how data flows is significant. In Mastra, each step declares what it receives and returns, and the framework enforces that contract at the TypeScript level.

In LangGraph, any node can read or write any field in the shared state. The structure comes from the graph topology rather than the type system, which means Mastra catches data flow bugs at compile time while LangGraph makes it easier to add new fields to the pipeline without touching every step's schema.

### The Factory Pattern

LangGraph nodes are plain async functions, which is exactly what makes them lean: no framework overhead, no initialization, just your code calling the model.

The challenge is that I needed to thread callbacks and a shared token accumulator through all four nodes, and plain functions have no built-in mechanism for that.

The solution is a factory function that creates all four nodes as closures over the shared state:

```ts title="packages/langchain-pipeline/src/graph/nodes.ts"
export function createNodes(
  callbacks: PipelineCallbacks,
  acc: { inputTokens: number; outputTokens: number }
) {
  const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });

  async function researchNode(state: PipelineStateType): Promise<Partial<PipelineStateType>> {
    const stepId = await callbacks.step.onStepStart("research", 1, state.topic);
    const results = await tavilyClient.search(state.topic, { maxResults: 5, searchDepth: "basic" });
    const research = results.results
      .map((r, i) => `[\({i + 1}] \){r.title}\nURL: \({r.url}\nContent: \){r.content}`)
      .join("\n\n");
    await callbacks.step.onStepComplete(stepId, {
      output: research,
      promptSent: state.topic,
      timeMs: elapsed,
      inputTokens: 0,      // research step uses Tavily, not an LLM
      outputTokens: 0,
      model: "tavily-search",
      tavilyQuery: state.topic,
      tavilyResults: JSON.stringify(results.results),
    });
    return { research };
  }

  // analysisNode, writeNode, criticNode follow the same pattern

  return { researchNode, analysisNode, writeNode, criticNode };
}
```

Notice the research node returns 0 tokens because it calls Tavily directly without any LLM involvement, which is one of the key differences that shows up in the benchmark data. Each subsequent node accumulates tokens directly into the shared `acc` object:

```ts
const inputTokens = response.usage_metadata?.input_tokens ?? 0;
const outputTokens = response.usage_metadata?.output_tokens ?? 0;
acc.inputTokens += inputTokens;
acc.outputTokens += outputTokens;
```

LangChain's `ChatAnthropic` puts usage on `response.usage_metadata`, which is cleanly typed and requires no casting.

### The Graph and the Node Naming Collision

One thing LangGraph enforces that's easy to miss: node names can't conflict with state annotation keys. Naming a node `"research"` throws a runtime error because `state.research` already exists as a state channel, and the error message doesn't explain why. Renaming to `"researcher"` and `"analyzer"` fixes it:

```ts
export const pipeline = new StateGraph(PipelineState)
  .addNode("researcher", researchNode)   // NOT "research": conflicts with state.research
  .addNode("analyzer", analysisNode)     // NOT "analysis": conflicts with state.analysis
  .addNode("write", writeNode)
  .addNode("critic", criticNode)
  .addEdge(START, "researcher")
  .addEdge("researcher", "analyzer")
  .addEdge("analyzer", "write")
  .addEdge("write", "critic")
  .addConditionalEdges("critic", shouldRevise, {
    revise: "write",
    end: END,
  })
  .compile();
```

The revision loop in LangGraph is expressed as a conditional edge with a routing function:

```ts
function shouldRevise(state: PipelineStateType): string {
  if (state.score >= 7 || state.iterations >= 3) return "end";
  return "revise";
}
```

After every critic execution, `shouldRevise` runs and returns either `"revise"` to loop back to the write node or `"end"` to exit the graph. That's the state machine equivalent of Mastra's `.dowhile()`: the same conditional logic expressed as graph routing rather than as a named loop construct.

### The Retry Wrapper

Both frameworks hit intermittent TLS session reuse errors when making concurrent HTTPS requests. The error look like this: `SSL routines:tls_get_more_records:decryption failed or bad record mac`. A retry wrapper with linear backoff handles it:

```ts
async function retryOnFetch<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      const shouldRetry =
        e?.message?.includes("fetch") ||
        e?.message === "fetch failed" ||
        e?.message?.includes("SSL") ||
        e?.message?.includes("ECONNRESET") ||
        e?.message?.includes("other side closed") ||
        e?.cause?.code === "ECONNRESET";
      if (i < retries && shouldRetry) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw e;
    }
  }
  throw new Error("unreachable");
}
```

Every `llm.invoke()` call in the LangChain nodes is wrapped in this. In the web app's API route, there's an equivalent `retryMutation` wrapper around every Convex call for the same reason.

---

## The Critic That Gave Everything a 7 out of 10

With both pipelines running, I tested a few topics. Every score came back 7 out of 10, regardless of topic, framework, or iteration.

This is actually a well-documented failure mode called LLM-as-judge bias. When you ask a language model to assign a score from 1 to 10 without giving it structured criteria and explicit anchors for each score level, it gravitates toward 7. It's the socially safe answer: high enough to signal quality, low enough to seem fair, and it requires no real justification. The model has no incentive to discriminate because nothing in the prompt forces it to.

My original critic was this:

```plaintext
You are a critical editor. Score the draft 1-10 on accuracy,
clarity, and depth. Return { score, feedback }.
```

That single sentence was the entire prompt, so obviously it gave everything a 7. ### What Production-Grade Evaluation Actually Looks Like

The solution I used comes from the [<VPIcon icon="iconfont icon-arxiv"/>G-Eval paper](https://arxiv.org/abs/2303.16634), which is also the approach behind tools like DeepEval and RAGAS. The key insight is that you need three things working together: the judge must reason step-by-step before assigning any score, the dimensions being scored must be independent of each other, and each score level must have an explicit description of what it means, not just "1 is bad, 10 is perfect."

So, I rebuilt the critic around six mandatory steps that must all complete before a number is produced:

1. **Claim audit**: every factual claim in the report gets classified as GROUNDED (supported by a specific search result), INFERRED (reasonable extension of the research), UNSUPPORTED (no basis in the results), or HALLUCINATED (contradicts the results).
2. **Specificity audit**: every generic sentence and every forbidden phrase gets flagged explicitly.
3. **Insight audit**: checks whether the conclusion actually adds something beyond restating the introduction.
4. **Counterfactual check**: the judge must name at least one specific belief a reader would hold after reading this that they wouldn't hold from just the topic title alone. If it can't identify one, the insight score can't exceed 6.5. **Dimension scoring**: three independent scores with explicit anchors for each level.
6. **Floor rule**: if any single dimension scores 4 or below, the final score can't exceed 6 regardless of the other dimensions.

The floor rule deserves a specific explanation because it addresses a real failure mode: without it, a report that hallucinates facts could score 2 on source fidelity but still end up with a passing score on the weighted average if specificity and insight are high enough. A critical failure in one dimension should disqualify the report, not get diluted.

This is the full critic prompt, which is shared between Mastra and LangChain via a constant in <VPIcon icon="iconfont icon-typescript"/>`nodes.ts`:

```ts :collapsed-lines
const CRITIC_INSTRUCTIONS = `You are a senior research editor.
Catch the specific ways AI-generated reports fail.

STEP 1: CLAIM AUDIT
Classify every claim: [GROUNDED] [INFERRED] [UNSUPPORTED] [HALLUCINATED]

STEP 2: SPECIFICITY AUDIT
List sentences that are generic, use forbidden phrases, or make no
falsifiable claims. Forbidden phrases: "it is important to note",
"organizations must consider", "rapidly evolving", "as we look to the future"

STEP 3: INSIGHT AUDIT
Does the conclusion add anything not already in the introduction?

STEP 3.5: COUNTERFACTUAL CHECK
Name one specific belief a reader holds after reading this that they
would not hold from just the topic title. If you cannot identify one,
insight cannot exceed 6. STEP 4: SCORE EACH DIMENSION

SOURCE FIDELITY (40% weight):
5-6: Claims accurate but traced to general topic knowledge, not these specific results
7:   Most claims traceable, at least one source cited by name
8:   All major claims grounded, two or more named sources with specific details
9-10: Every claim traces to a named source, at least one statistic used

SPECIFICITY (30% weight):
5-6: Some specific claims but generic analysis between paragraphs
7:   Mostly specific, minor filler remains
8:   Every paragraph falsifiable, named entities throughout
9-10: Zero sentences survive if you swap the topic

INSIGHT (30% weight):
5-6: Some synthesis but conclusion could have been written before reading
7:   Conclusion makes a recommendation that follows from the evidence
8:   Identifies a tradeoff the reader has not considered
9-10: A senior engineer would reconsider an architectural decision after reading this

STEP 5: FLOOR RULE
If any dimension scores 4 or below, the final score cannot exceed 6. STEP 6: CALCULATE
finalScore = round((fidelity * 0.40) + (specificity * 0.30) + (insight * 0.30))

Respond ONLY with this JSON:
{
  "fidelity": <1-10>,
  "fidelityReasoning": "<one sentence>",
  "specificity": <1-10>,
  "specificityReasoning": "<one sentence>",
  "insight": <1-10>,
  "insightReasoning": "<one sentence>",
  "score": <weighted final>,
  "feedback": "<surgical: quote the specific sentence that caused the
  lowest-scoring dimension to fail, then state exactly what needs to change>"
}`;
```

### Extracting JSON from Chain-of-Thought Output

Because the critic now writes several paragraphs of reasoning before producing the JSON, `JSON.parse(result.text)` throws because the response isn't pure JSON anymore. Before I caught this and fixed it, the fallback value of `4` was returned silently on every parse failure, which meant every loop ran the full three iterations on every topic.

The fix scans the text for the last valid JSON object, working backwards through any matches because the JSON block always appears at the end after the reasoning:

```ts
function extractJson(text: string): any {
  try { return JSON.parse(text.trim()); } catch {}

  const matches = text.match(/\{[\s\S]*\}/g);
  if (matches) {
    for (let i = matches.length - 1; i >= 0; i--) {
      try { return JSON.parse(matches[i]); } catch {}
    }
  }

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) {
    try { return JSON.parse(fenced[1].trim()); } catch {}
  }

  return null;
}
```

---

## The Evaluation Bias I Almost Shipped

After the critic rebuild, things were working properly: first drafts scoring 4-6, the revision loop triggering, revisions actually improving on the previous attempt.

But a clear pattern emerged across technology topics: Mastra consistently scoring 8-9, and LangChain consistently scoring 6-7, on every single topic.

Looking at what the critic was actually rewarding revealed the problem. Source Fidelity carries 40% of the final score, and it rewards reports that cite specific named sources from the Tavily results. Mastra's reports were full of phrases like "according to Kore.ai's analysis" and "the ArXiv paper on orchestrated multi-agent systems identifies." LangChain's reports made the same points but without attributing them to specific sources.

The cause was how context flowed through each pipeline. Mastra's Agent class carries the full Tavily content (titles, URLs, content snippets) in its conversation history through the tool loop. By the time the writer agent runs, all of that source material is available in context.

The LangChain write node, on the other hand, only received `state.analysis`, which is the structured JSON extracted from the research: key findings, themes, and a central argument. By the time that JSON was produced, the specific source details had already been abstracted away. The writer had the conclusions but not the citations.

Both pipelines were correctly implemented according to each framework's idioms, but I had given them unequal inputs without realising it. The evaluation system was rewarding one framework for having more context rather than for producing a better report, and the consistent score gap across every technology topic was the signal: a genuine quality difference would vary by topic and draft, but a structural gap shows up the same way every time.

The fix was one change in the LangChain write node: pass `state.research` (the raw Tavily results) alongside `state.analysis`:

```ts
async function writeNode(state: PipelineStateType): Promise<Partial<PipelineStateType>> {
  const prompt = `You are a research analyst writing for a technical audience.

RESEARCH (raw search results -- cite specific sources by name):
${state.research}

ANALYSIS:
${state.analysis}
\({state.feedback ? `\nCRITIC FEEDBACK FROM PREVIOUS DRAFT:\n\){state.feedback}` : ""}

${WRITER_INSTRUCTIONS}

Return ONLY the report text.`;

  const response = await retryOnFetch(() => llm.invoke(prompt));
  return { draft: response.content as string, iterations: (state.iterations ?? 0) + 1 };
}
```

With both writers receiving identical source material, quality scores now reflect actual writing quality. If your evaluation system consistently favours one option across many runs, the first thing to check is whether both options have equal inputs. A structural gap produces consistent results, while a genuine quality difference varies by topic and draft quality.

---

## The Real-Time Dashboard

Running pipelines in the terminal works for your own comparisons, but it doesn't scale to a benchmark that other people can use. The dashboard needed both pipelines running in parallel, every step visible as it executes, the full prompt and response expandable per step, Tavily results with relevance score bars, token counts, a live scrolling log, and everything saved and browsable by category.

### The Convex Schema

Convex was chosen specifically for real-time capabilities: its `useQuery` hook in React subscribes to database queries and automatically re-renders when the underlying data changes, without any polling or websocket management on your end.

The schema stores every run at three levels of granularity:

```ts :collapsed-lines
steps: defineTable({
  runId: v.id("runs"),
  pipelineResultId: v.id("pipelineResults"),
  framework: v.union(v.literal("mastra"), v.literal("langchain")),
  stepName: v.union(
    v.literal("research"), v.literal("analysis"),
    v.literal("write"), v.literal("critic")
  ),
  iterationNumber: v.number(),
  status: v.union(v.literal("running"), v.literal("complete"), v.literal("error")),
  promptSent: v.optional(v.string()),
  output: v.optional(v.string()),
  timeMs: v.optional(v.number()),
  inputTokens: v.optional(v.number()),
  outputTokens: v.optional(v.number()),
  model: v.optional(v.string()),
  tavilyQuery: v.optional(v.string()),
  tavilyResults: v.optional(v.string()),
  criticScore: v.optional(v.number()),
  criticFeedback: v.optional(v.string()),
  criticDimensions: v.optional(v.object({
    fidelity: v.number(),
    specificity: v.number(),
    insight: v.number(),
    fidelityReasoning: v.string(),
    specificityReasoning: v.string(),
    insightReasoning: v.string(),
  })),
}).index("by_pipeline_result", ["pipelineResultId"]),
```

The `criticDimensions` field stores the full G-Eval breakdown so the dashboard can render individual dimension scores with colored bars and the per-dimension reasoning text.

### The Fire-and-Forget Pattern

The most important decision in the Next.js API route is returning the `runId` before either pipeline finishes. If you await both pipelines first, the browser sits waiting 30-60 seconds before it can even navigate to the run page, and the whole point of real-time updates is gone.

```ts :collapsed-lines
const activeTasks = new Map<string, Promise<void>>();

export async function POST(req: NextRequest) {
  const { topic, category } = await req.json();

  // Create the Convex records synchronously (these are fast)
  const runId = await retryMutation(() =>
    fetchMutation(api.runs.createRun, { topic, category, status: "running" })
  );
  const mastraResultId = await retryMutation(() =>
    fetchMutation(api.pipelineResults.createPipelineResult, {
      runId, framework: "mastra", status: "running", iterations: 0,
    })
  );
  const langchainResultId = await retryMutation(() =>
    fetchMutation(api.pipelineResults.createPipelineResult, {
      runId, framework: "langchain", status: "running", iterations: 0,
    })
  );

  // Start both pipelines without awaiting them
  const task = Promise.allSettled([
    withRetry(() => runMastraPipeline(topic, buildCallbacks(runId, mastraResultId, "mastra"))),
    withRetry(() => runLangChainPipeline(topic, buildCallbacks(runId, langchainResultId, "langchain"))),
  ]).then(async () => {
    await retryMutation(() =>
      fetchMutation(api.runs.updateRunStatus, { runId, status: "complete" })
    );
    activeTasks.delete(runId as string);
  });

  // Hold a reference in the Map so Node.js doesn't garbage-collect the promise
  activeTasks.set(runId as string, task);
  return NextResponse.json({ runId });   // returns immediately
}
```

On Vercel, this pattern still fails because serverless functions terminate when the route handler returns, killing any background promises. The fix is using `waitUntil` from `@vercel/functions`, which tells Vercel to keep the execution context alive until the promise resolves:

```ts
import { waitUntil } from "@vercel/functions";

waitUntil(task);
return NextResponse.json({ runId });
```

### Subscribing to Live Updates

On the run page, three Convex queries run simultaneously: the run itself, the pipeline results, and the steps for each pipeline result.

The `"skip"` sentinel is important here: it tells Convex to hold the subscription open without executing the query until a real argument is available. This prevents a race condition where the steps query fires before the pipeline result records have been created:

```ts
const mastraSteps = useQuery(
  api.steps.getStepsForPipelineResult,
  mastraResult ? { pipelineResultId: mastraResult._id } : "skip"
);
```

### Deduplicating Steps After Retries

When a pipeline fails due to a TLS error and retries from the beginning, the failed attempt's step records stay in Convex alongside the successful attempt's records. The UI would render both, creating a visible gap between the research card and the rest of the steps.

The fix groups steps by `stepName + iterationNumber` and keeps the best version of each:

```ts
const stepMap = new Map<string, Step>();
[...steps]
  .sort((a, b) => (a._creationTime ?? 0) - (b._creationTime ?? 0))
  .forEach((s) => {
    const key = `\({s.stepName}-\){s.iterationNumber}`;
    const existing = stepMap.get(key);
    if (!existing) { stepMap.set(key, s); return; }
    if (s.status === "complete") { stepMap.set(key, s); return; }
    if (existing.status !== "complete") { stepMap.set(key, s); }
  });
```

### The Live Log Auto-Scroll

Log entries are appended to the pipeline result document in Convex as an array, and the panel auto-scrolls as new entries arrive using a ref attached to an empty div at the bottom:

```ts
function LiveLogPanel({ logs }: { logs?: LogEntry[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs?.length]);

  return (
    <div className="max-h-52 overflow-y-auto font-mono text-xs">
      {logs?.map((entry, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-[#484f58]">[{fmtTs(entry.timestamp)}]</span>
          <span className={`font-bold w-14 ${tagColor(entry.tag)}`}>{entry.tag}</span>
          <span className="text-[#c9d1d9]">{entry.message}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
```

The effect dependency is `logs?.length`, so the scroll triggers every time a new log entry arrives from Convex.

---

## What the Data Actually Shows

### Speed

LangChain is 25-45% faster in every run. On shorter topics the gap narrows to 7-8 seconds, but it never reverses.

I think the reason for this is structural. Mastra's Agent class initialises its tool loop manager on every step, even when no tools are called. That means internal conversation history, tool schemas, and retry infrastructure are all set up as overhead before the actual model call happens.

Across a four-step pipeline, those 2-5 seconds per step accumulate. LangGraph nodes are plain async functions, so your code runs directly, with no framework initialisation between you and the model.

### Tokens

Mastra uses 1.5-2.5x more tokens. The research step alone accounted for most of that gap because LangChain's research node calls Tavily directly without invoking an LLM at all.

On more typical topics, Mastra runs around 6,200 tokens and LangChain around 3,900. The gap scales with how much content Tavily returns, because that content flows into Mastra's agent conversation history on every subsequent step.

### Quality

After fixing the evaluation bias, scores vary meaningfully by topic rather than by framework. Both produce high-scoring reports when the Tavily results are specific and rich. Both struggle on vague or biographical topics where the search results are generic.

A first draft scoring 7 or 8 means the research was strong and the writer made specific grounded claims. A 4 or 5 means the research returned thin results and the writer defaulted to generic observations, and the revision loop runs until either the draft improves or the iteration limit is hit.

::: note The tradeoff

Mastra handles orchestration complexity in the framework so you don't have to. You write `.dowhile()` instead of a conditional edge, typed step schemas instead of a shared mutable state object, and the framework manages conversation history and tool execution. The cost is a consistent token and latency overhead on every step.

:::

LangChain gives you the graph execution engine and leaves everything else to you: more explicit wiring to write, but leaner execution and precise control over every token that enters each model call.

---

## Try it Yourself

The live demo is at [<VPIcon icon="fas fa-globe"/>mastra-vs-langchain.vercel.app](https://mastra-vs-langchain.vercel.app) and the complete source code for this comparison is at [<VPIcon icon="iconfont icon-github"/>`sholajegede/mastra-vs-langchain`](https://github.com/sholajegede/mastra-vs-langchain). If it helped you, consider giving it a star.

```sh
git clone https://github.com/sholajegede/mastra-vs-langchain.git
cd mastra-vs-langchain
npm install
cp .env.example .env
# Add ANTHROPIC_API_KEY and TAVILY_API_KEY
npx convex dev   # Terminal 1
npm run web      # Terminal 2
```

Open `localhost:3000`, enter a topic, pick a category, and run both. Every step is visible as it happens, every token is counted, and the history page stores all previous runs by category.

If you want to take this comparison further by adding CrewAI, CopilotKit, or any other framework to the benchmark, the `PipelineCallbacks` interface in `packages/shared` is the only contract you need to implement.

::: info About Author

If this tutorial was useful, feel free to share it with others who might benefit. I’d really appreciate your thoughts. You can mention me on X at [<VPIcon icon="fa-brands fa-x-twitter"/>`wani_shola`](https://x.com/wani_shola) or [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sholajegede`)](https://linkedin.com/in/sholajegede).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mastra vs LangChain: Building an AI Agent Pipeline and Analyzing the Data",
  "desc": "A week ago, I saw this tweet: I had just shipped SupportMesh, a multi-tenant AI support platform built on Mastra, so I had opinions from production. I liked the .dowhile() loop, the typed step schem",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/mastra-vs-langchain-building-an-ai-agent-pipeline-and-analyzing-the-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
