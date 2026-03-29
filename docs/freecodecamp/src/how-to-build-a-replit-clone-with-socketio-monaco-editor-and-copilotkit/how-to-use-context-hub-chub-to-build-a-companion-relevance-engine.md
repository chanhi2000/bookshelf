---
lang: en-US
title: "How to Use Context Hub (chub) to Build a Companion Relevance Engine"
description: "Article(s) > How to Use Context Hub (chub) to Build a Companion Relevance Engine"
icon: fa-brands fa-node
category:
  - Node.js
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Context Hub (chub) to Build a Companion Relevance Engine"
    - property: og:description
      content: "How to Use Context Hub (chub) to Build a Companion Relevance Engine"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-context-hub-chub-to-build-a-companion-relevance-engine.html
prev: /programming/js-node/articles/README.md
date: 2026-04-18
isOriginal: false
author:
  - name: Nataraj Sundar
    url: https://freecodecamp.org/news/author/natarajsundar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/14f9768e-436d-4c7e-b86c-3d380e821354.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="How to Use Context Hub (chub) to Build a Companion Relevance Engine"
  desc="Large language models can write code quickly, but they still misremember APIs, miss version-specific details, and forget what they learned at the end of a session. That is the problem Context Hub is t"
  url="https://freecodecamp.org/news/how-to-use-context-hub-chub-to-build-a-companion-relevance-engine"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/14f9768e-436d-4c7e-b86c-3d380e821354.png"/>

Large language models can write code quickly, but they still misremember APIs, miss version-specific details, and forget what they learned at the end of a session.

That is the problem Context Hub is trying to solve.

Context Hub (`chub`) gives coding agents curated, versioned documentation and skills that they can search and fetch through a CLI. It also gives them two learning loops: local annotations for agent memory and feedback for maintainers.

In this tutorial, you'll learn how the official `chub` workflow works, how Context Hub organizes docs and skills, how annotations and feedback create a memory loop, and how to build a [companion relevance engine (<VPIcon icon="iconfont icon-github"/>`natarajsundar/context-hub-relevance-engine`)](https://github.com/natarajsundar/context-hub-relevance-engine/) that improves retrieval without breaking the upstream content model.

This tutorial uses two public repositories side by side:

- the official upstream project: [andrewyng/context-hub (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub)
- the companion implementation for this article:

<SiteInfo
  name="natarajsundar/context-hub-relevance-engine: A production-oriented relevance engine for Context Hub that improves multi-term query retrieval using hybrid search, coverage-aware scoring, and lightweight reranking.  This repository demonstrates how to move beyond baseline lexical search by combining BM25-style matching with semantic signals and query coverage heuristics to improve precision."
  desc="A production-oriented relevance engine for Context Hub that improves multi-term query retrieval using hybrid search, coverage-aware scoring, and lightweight reranking.  This repository demonstrates..."
  url="https://github.com/natarajsundar/context-hub-relevance-engine/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/930a5d870859038a36f5ee1d38ce9ec7de97dfd8056b8063f6ac9c47d07c06ab/natarajsundar/context-hub-relevance-engine"/>

I've also opened a corresponding upstream pull request from my fork to the main project. If you want to track that work from the article, use the upstream pull request list filtered by author: [`andrewyng/context-hub` pull requests by `natarajsundar` (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/pulls?q=is%3Apr+author%3Anatarajsundar).

::: info What We'll Build

By the end of this tutorial, you'll have:

- a clear mental model for how Context Hub works
- a working local install of the official `chub` CLI
- a repeatable workflow for search, fetch, annotations, and feedback
- a companion repo that adds an additive reranking layer on top of a Context-Hub-style content tree
- a small benchmark and local comparison UI you can run end to end
- a clear bridge between the companion repo and the smaller upstream PR

:::

::: note Prerequisites

Before you start, make sure you have:

- Node.js 18 or newer
- npm
- comfort with the terminal
- basic familiarity with Markdown

:::

---

## How to Understand Context Hub

Context Hub is easiest to understand as a workflow for turning fast-moving documentation into a reliable input for coding agents.

Instead of asking an agent to rely on whatever it remembers from training data, you give it a predictable contract:

1. search for the right entry
2. fetch the right doc or skill
3. write code against that curated content
4. save local lessons as annotations
5. send doc-quality feedback back to maintainers

![Diagram showing the Context Hub loop from developer prompt to agent search and fetch, then annotations and maintainer feedback.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/09d75c85-fbb0-4c9a-86d5-8acdff4e1abf.png)
<!-- TODO: mermaid화-->

That system boundary matters.

It makes the agent easier to audit, easier to improve, and easier to extend. It also keeps the interface small enough that you can reason about where the failures happen. If the agent still misses the answer, you can ask whether the problem happened during search, fetch, context selection, or generation.

---

## How to Understand the Official Repo, the Companion repo, and the Upstream PR

This tutorial is intentionally split across two codebases and one contribution path.

The official upstream project, [<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`](https://github.com/andrewyng/context-hub), is the source of truth for the real CLI, the content model, and the documented workflows. That's the codebase you should use to learn how `chub` works today.

The companion repository, [<VPIcon icon="iconfont icon-github"/>`natarajsundar/context-hub-relevance-engine`](https://github.com/natarajsundar/context-hub-relevance-engine/), is where the relevant ideas in this article are made concrete. It's a companion implementation, not a replacement product. Its job is to make retrieval tradeoffs visible, measurable, and easy to run locally.

The upstream PR is the bridge between those two worlds. The companion repo is where you can iterate faster on benchmarks, reranking, and the comparison UI. The upstream PR is where the smallest reviewable slices can be proposed back to the main project. You can track that thread here: [upstream PR search filtered by author (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/pulls?q=is%3Apr+author%3Anatarajsundar).

That three-part framing keeps the article honest:

- **use the upstream repo** to understand the current system
- **use the companion repo** to explore relevant improvements end to end
- **use the upstream PR** to show how a larger idea can be broken into reviewable pieces

---

## How to Install and Use the Official CLI

The official quick start is intentionally small.

```sh
npm ㅑ -g @aisuite/chub
```

Once the CLI is installed, you can search for what is available and fetch a specific entry:

```sh
chub search openai
chub get openai/chat --lang py
```

That's the happy path, but it helps to think through the request flow.

![Sequence diagram showing the developer asking the agent for current docs, the agent calling chub search and chub get, and the CLI fetching docs from the registry.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/c5ff71d4-5e51-48b8-bbd3-fc2aafa93b9d.png)
<!-- TODO: mermaid화 -->

In practice, the most useful detail is that the CLI is designed for the **agent** to use, not just for the human to use by hand.

That's why the upstream CLI also ships a `get-api-docs` skill. For example, if you use Claude Code, you can copy the skill into your local project like this:

```sh
mkdir -p .claude/skills
cp $(npm root -g)/@aisuite/chub/skills/get-api-docs/SKILL.md \
.claude/skills/get-api-docs.md
```

That step teaches the agent a retrieval habit:

> Before you write code against a third-party SDK or API, use `chub` instead of guessing.

That behavioral rule is often as important as the docs themselves.

---

## How to Understand Docs, Skills, and the Content Layout

Context Hub separates content into two categories:

- **docs**, which answer “what should the agent know?”
- **skills**, which answer “how should the agent behave?”

That distinction makes the content model easier to scale. Docs can be versioned and language-specific. Skills can stay short and operational.

The directory structure is also predictable. The content guide organizes entries by author, then by `docs` or `skills`, then by entry name.

![Diagram showing the content tree from author to docs and skills, with DOC.md and SKILL.md feeding a build step that emits registry and search artifacts.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/3ac72bc2-c869-4e2e-9294-d63b35991135.png)

A small example looks like this:

```text
author/docs/payments/python/DOC.md
author/docs/payments/python/references/errors.md
author/skills/login-flows/SKILL.md
```

This is one of the reasons Context Hub is easy to work with.

The shape of the content is plain Markdown, the main entry file is predictable, and the build output is inspectable. You don't have to reverse engineer a hidden prompt layer to figure out what the agent is reading.

---

## How to Use Incremental Fetch and Layered Sources

One of the best design choices in Context Hub is that it doesn't force you to inject every file into the model on every request.

Instead, the entry file gives you the overview, and the reference files hold the deeper material.

![Diagram showing how chub get can fetch just the main entry file, a specific reference file, or the full entry directory.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/88d80a48-c991-495a-af25-14a0c0ac9868.png)
<!-- TODO: mermaid화 -->

That lets you fetch content in progressively larger slices.

```sh
chub get stripe/webhooks --lang py
chub get stripe/webhooks --lang py --file references/raw-body.md
chub get stripe/webhooks --lang py --full
```

This is a token-budget feature as much as it is a documentation feature. A good agent should first load the overview, decide what part of the task matters, and only then fetch the specific supporting file.

Context Hub also supports layered sources. You can merge public content with your own local build output through <VPIcon icon="fas fa-folder-open"/>`~/.chub/`<VPIcon icon="iconfont icon-yaml"/>`config.yaml`.

![Diagram showing community, official, and local team sources merging into one search surface for chub search and chub get.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/67465254-7a7c-4cfc-b9f0-9e94d8c3e2f3.png)
<!-- TODO: mermaid화 -->

A minimal configuration looks like this:

```yaml title="~/.chub/config.yaml"
sources:
  - name: community
    url: https://cdn.aichub.org/v1
  - name: my-team
    path: /opt/team-docs/dist
```

That means you can keep public docs in one lane and team-specific runbooks in another lane while still giving the agent one search surface.

---

## How to Use Annotations and Feedback to Create a Memory Loop

Context Hub has two different improvement channels.

Annotations are local. They help your agent remember what worked last time. Feedback is shared. It helps maintainers improve the docs for everyone.

That distinction matters because not every lesson belongs in the shared registry. Some lessons are environment-specific. Others point to content quality issues that should be fixed centrally.

![Diagram showing the agent fetch/write cycle, then branching to local annotations or maintainer feedback before the next task.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/a8514430-08cb-4085-8047-64df25c603c7.png)
<!-- TODO: mermaid화 -->

Here is what local memory looks like in practice:

```sh
chub annotate stripe/webhooks \
"Remember: Flask request.data must stay raw for Stripe signature verification."
```

And here's the feedback path:

```sh
chub feedback stripe/webhooks up
```

That loop is simple, but it's one of the most important ideas in the project. It turns a one-off debugging lesson into either persistent local memory or a signal that the shared docs need to improve.

---

## How to See Where Relevance Still Misses

The upstream project already has a real ranking story. It uses BM25 and lexical rescue so that package-like identifiers, exact tokens, and fuzzy matches still have a chance to surface.

That is a strong baseline.

But developer queries are often much messier than package names.

People search for:

- `rrf`
- `signin`
- `pg vector`
- `hnsw`
- `raw body stripe`

Those aren't “bad” queries. They're realistic shorthand.

And they expose an opportunity in the content model itself: many of the exact answers live in reference files such as <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`rrf.md`, <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`raw-body.md`, and <VPIcon icon="fas fa-folder-open"/>`references/`<VPIcon icon="fa-brands fa-markdown"/>`hnsw.md`.

So the question is not whether the current search works at all. It clearly does. The better question is this:

> How can you improve retrieval without breaking the content contract that already makes Context Hub useful?

The answer in the companion repo is to keep the current model and add a reranking layer on top of it.

---

## How the Companion Relevance Engine Improves Retrieval

The companion repository in this article is [<VPIcon icon="iconfont icon-github"/>`natarajsundar/context-hub-relevance-engine`](https://github.com/natarajsundar/context-hub-relevance-engine/).

It keeps the same broad ideas that make Context Hub attractive:

- plain Markdown content
- <VPIcon icon="fa-brands fa-markdown"/>`DOC.md` and <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` entry points
- build artifacts you can inspect
- local annotations and feedback
- progressive fetch behavior

Then it adds one new build artifact: <VPIcon icon="iconfont icon-json"/>`signals.json`.

At build time, the engine extracts extra signals such as:

- headings from the main file
- titles and tokens from reference files
- language and version metadata
- source metadata and freshness
- annotation overlap
- feedback priors

The first pass stays cheap and transparent. The reranker only runs after the baseline has done its work.

![Diagram showing the relevance pipeline from query to BM25 and lexical rescue, then synonym expansion, candidate set building, reranking signals, and final results.](https://cdn.hashnode.com/uploads/covers/694ca88d5ac09a5d68c63854/2ed2dadb-8fff-41ee-904b-0792cafcf744.png)
<!-- TODO: mermaid화 -->

That approach matters for two reasons.

First, it's additive. You don't have to redesign the content tree.

Second, it's measurable. You can define concrete failure modes, fix them one by one, and run the same benchmark every time you change the scorer.

---

## How to Run the Companion Repo End to End

Open the repository on [GitHub (<VPIcon icon="iconfont icon-github"/>`natarajsundar/context-hub-relevance-engine`)](https://github.com/natarajsundar/context-hub-relevance-engine/), clone it using GitHub’s normal clone flow, and then run the commands below from the project root.

```sh
cd context-hub-relevance-engine
npm i
npm run build
npm test
```

The repository has no third-party runtime dependencies, so `npm i` is mostly there to keep the workflow familiar. The main commands are all plain Node scripts.

### How to Reproduce a Baseline Miss

Start with the query `rrf`.

Expected output:

```sh
node bin/chub-lab.mjs search rrf --mode baseline --lang python
#
# No results.
```

Now run the improved mode.

```sh
node bin/chub-lab.mjs search rrf --mode improved --lang python
#
# langchain/retrievers [doc] score=320.24
#   Composable retrieval patterns for hybrid search, parent documents, query expansion, and reranking.
```

That win happens because the improved mode looks beyond the top-level entry description. It also sees the reference file title `rrf`, the related terms from query expansion, and the broader token overlap in the extracted signals.

### How to Reproduce a Workflow-intent Win

Try a sign-in query.

```sh
node bin/chub-lab.mjs search signin --mode baseline
node bin/chub-lab.mjs search signin --mode improved
```

The baseline misses. The improved mode returns `playwright-community/login-flows` because the reranker treats `signin`, `sign in`, `login`, and `authentication` as related intent.

### How to Test the Memory Loop

Write a local note:

```sh
node bin/chub-lab.mjs annotate stripe/webhooks \
"Remember: Flask request.data must stay raw for Stripe signature verification."
```

Then fetch the doc:

```sh
node bin/chub-lab.mjs get stripe/webhooks --lang python
```

You will see the main doc content, the list of available reference files, and the appended annotation.

That's the behavior you want from an agent memory loop: learn once, reuse many times.

### How to Run the Benchmark

Start from an empty store:

```sh
npm run reset-store
node bin/chub-lab.mjs evaluate
```

The included synthetic stress set reports the following summary with an empty store:

| Mode | Top-1 Accuracy | MRR |
| --- | --- | --- |
| baseline | 0.333 | 0.333 |
| improved | 1.000 | 1.000 |

You can also seed the store and rerun the evaluation:

```sh
npm run seed-demo
node bin/chub-lab.mjs evaluate
```

That demonstrates how annotations and feedback can push relevant entries even higher when the query overlaps with the agent’s own history.

### How to Launch the Local Comparison UI

```sh
npm run serve
```

Then open `http://localhost:8787` in your browser.

The UI lets you compare baseline and improved retrieval, inspect stored annotations and feedback, rebuild the local artifacts, and rerun the benchmark from one place.

---

## How to Read the Benchmark Honestly

The benchmark in this repo is intentionally small.

That is a feature, not a flaw.

The point is not to claim universal search quality. The point is to make a handful of realistic failure modes easy to reproduce:

- acronym queries
- shorthand workflow queries
- reference-file topic queries
- memory-aware reranking

That keeps the evaluation honest.

If a future scoring change breaks `rrf`, `signin`, or `raw body stripe`, you'll know immediately. And if you add a stronger dataset later, you can keep these tests as regression guards.

The benchmark files included in the repo are:

- <VPIcon icon="fas fa-folder-open"/>`demo/`<VPIcon icon="iconfont icon-json"/>`benchmark.json`
- <VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="iconfont icon-json"/>`benchmark-empty-store.json`
- <VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="iconfont icon-json"/>`benchmark-seeded-store.json`
- <VPIcon icon="fas fa-folder-open"/>`docs/relevance-improvement-plan.md`

---

## How to Connect the Companion Repo to the Upstream PR

A good companion repo is broad enough to explore ideas quickly. A good upstream PR is narrow enough to review.

That's why the two shouldn't be identical.

The companion repository is where you can keep the full relevance story together:

- the local comparison UI
- the synthetic benchmark
- the richer reranking signals
- the debug and explain surfaces
- the documentation that walks through tradeoffs end to end

The upstream PR should be smaller and more surgical. In practice, that usually means proposing the most reviewable slices first, such as:

1. reference-file signal extraction
2. explainable score output for debugging
3. a lightweight benchmark fixture format
4. one additive reranking hook behind a flag

That keeps the main repository maintainable while still letting the article and companion repo tell the full engineering story. The upstream thread for this work lives here: [andrewyng/context-hub pull requests by `natarajsundar` (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/pulls?q=is%3Apr+author%3Anatarajsundar).

---

## Conclusion

What makes Context Hub interesting is not just that it stores documentation. It gives you a clear system boundary for improving coding agents.

You can inspect what the agent reads. You can decide when it should retrieve. You can layer public and private sources. You can persist local lessons. And you can improve ranking without tearing the whole model apart.

The companion relevance engine shows how to keep what already works, make one part of the system measurably better, and package the result in a way other developers can run, inspect, and extend. The upstream PR, in turn, shows how to turn a broad idea into smaller pieces that are realistic to review in the main project.

---

## Diagram Attribution

All diagrams used in this article were created by the author specifically for this tutorial and its companion repository.

---

## Sources

- [Context Hub repository (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub)
- [Context Hub README (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/README.md)
- [Context Hub CLI README (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/cli/README.md)
- [Context Hub CLI reference (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/docs/cli-reference.md)
- [Context Hub content guide (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/docs/content-guide.md)
- [Context Hub bring-your-own-docs guide (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/docs/byod-guide.md)
- [Context Hub feedback and annotations guide (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/blob/main/docs/feedback-and-annotations.md)
- [Companion repository: `context-hub-relevance-engine` (<VPIcon icon="iconfont icon-github"/>`natarajsundar/context-hub-relevance-engine`)](https://github.com/natarajsundar/context-hub-relevance-engine/)
- [Upstream pull request search filtered by author (<VPIcon icon="iconfont icon-github"/>`andrewyng/context-hub`)](https://github.com/andrewyng/context-hub/pulls?q=is%3Apr+author%3Anatarajsundar)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Context Hub (chub) to Build a Companion Relevance Engine",
  "desc": "Large language models can write code quickly, but they still misremember APIs, miss version-specific details, and forget what they learned at the end of a session. That is the problem Context Hub is t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-context-hub-chub-to-build-a-companion-relevance-engine.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
