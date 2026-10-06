---
lang: en-US
title: "What It Actually Took to Port the GitHub Copilot Runtime to Rust"
description: "Article(s) > What It Actually Took to Port the GitHub Copilot Runtime to Rust"
icon: iconfont icon-copilot
category:
  - Rust
  - DevOps
  - Github
  - Github Copilot
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - rs
  - rust
  - devops
  - github
  - github-copilot
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What It Actually Took to Port the GitHub Copilot Runtime to Rust"
    - property: og:description
      content: "What It Actually Took to Port the GitHub Copilot Runtime to Rust"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloggithub-copilot-rust-migration-hype-vs-reality.html
prev: /programming/rust/articles/README.md
date: 2026-10-03
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_214.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rust/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github Copilot > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/github-copilot/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What It Actually Took to Port the GitHub Copilot Runtime to Rust"
  desc="GitHub ported the Copilot agent runtime from TypeScript to more than 800,000 lines of Rust, and the headlines credited one engineer and $120,000 in tokens."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloggithub-copilot-rust-migration-hype-vs-reality"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_214.png"/>

GitHub ported the Copilot agent runtime from TypeScript on Node.js to more than 800,000 lines of production Rust in about 14.5 weeks, most of it written by coding agents for roughly $120,000 in tokens. Stephen Toub drove the port, while teammates built the SDK bindings and reviewed the work. In GitHub's benchmarks, the Rust runtime ran 3x to 6x faster out-of-process and 6x to 21x faster in-process, which is still opt-in.

"Just one engineer and a team of agents ported the GitHub Copilot agent runtime to Rust, shipping 800,000 lines of production code while retaining code quality".

That's how [GitHub promoted it on X (<VPIcon icon="fa-brands fa-x-twitter"/>`github`)](https://x.com/github/status/2102103572867358977). My own video on it is called [<VPIcon icon="fa-brands fa-youtube"/>One Engineer, $120K in Token Spend, 800K Lines of Rust](https://youtu.be/dN11EApmfkM), so I'm not innocent here either.

The headline is true in a narrow sense. But Stephen Toub's full write-up, [<VPIcon icon="iconfont icon-github"/>Migrating the GitHub Copilot runtime to Rust, using Copilot](https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/), tells a more interesting story. In this issue, I want to unpack why they didn't choose .NET, how they ported it, what the performance numbers mean, and who did the work.

<VidStack src="youtube/dN11EApmfkM" />

---

## What GitHub Ported

The **Copilot runtime** is the agent harness behind the [GitHub Copilot SDK (<VPIcon icon="iconfont icon-github"/>`github/copilot-sdk`)](https://github.com/github/copilot-sdk). It runs sessions, tools, MCP servers, and model calls. The [<VPIcon icon="iconfont icon-github"/>Copilot CLI](https://github.com/features/copilot/cli) uses it, and so do VS Code, Visual Studio, Copilot Studio, and the Copilot features in Excel, Outlook, PowerPoint, and Word.

It started in [<VPIcon icon="iconfont icon-typescript"/>TypeScript](https://typescriptlang.org/) on [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/). Every SDK, TypeScript included, talked to it by launching the CLI as a child process and sending JSON-RPC over stdio. The C#, Python, Go, Java, and Rust clients each paid for a second language runtime, "on the order of 100 MB of working set minimum", and every deployment had at least two processes to supervise.

GitHub wanted a runtime that all six SDK languages could load **in-process** through their FFI mechanisms, with minimal dependencies, low overhead, and less supply chain risk. They chose [<VPIcon icon="iconfont icon-rust"/>Rust](https://rust-lang.org/), citing those requirements plus "softer reasons (such as team experience and industry direction)".

![Copilot runtime architecture before and after the Rust port. Before, each SDK launched the CLI as a separate Node.js process. After, SDKs host the Rust runtime either in-process through FFI or out-of-process.<br/>Source: [<VPIcon icon="iconfont icon-github"/>Migrating the GitHub Copilot runtime to Rust, using Copilot](https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/)](https://github.blog/wp-content/uploads/2026/09/architecture-before-after.svg)

---

## Why Not .NET?

This is the part that upset the .NET community.

Why didn't Microsoft use C# and .NET for the runtime migration instead of Rust?

I get the sentiment. Microsoft created C# and .NET, and this comes a year and a half after the TypeScript team [<VPIcon icon="fa-brands fa-microsoft"/>announced its port of the compiler to Go](https://devblogs.microsoft.com/typescript/typescript-native-port/). Toub, who led the port, also writes the yearly [<VPIcon icon="fa-brands fa-microsoft"/>Performance Improvements in .NET**](https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-10/) posts.

GitHub's post doesn't explain why the runtime isn't C#, but remember the in-process requirement. Rust compiles to a plain native library with a C ABI that a .NET app, a JVM, a Python interpreter, or a Go binary can load, and **no garbage collector** comes along with it.

You can export C functions from a .NET library with [<VPIcon icon="fa-brands fa-microsoft"/>Native AOT](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/interop), but each of those libraries brings its own GC heap and GC threads into the host process. I love C#, but I suspect the garbage collector was one of the things they wanted to avoid when the host already runs its own runtime. The C# SDK can now load the Rust runtime in-process through P/Invoke, as an opt-in, experimental feature.

I've also seen people argue this was partly a marketing push to get Rust developers onto Copilot. I can't tell, but I'm writing about Rust right now, so maybe it worked.

Does Microsoft have to use .NET for everything? I don't think so. Rust was a good fit for GitHub's use case, and that doesn't mean you should stop using .NET for your own systems.

Microsoft is a big company with teams that specialize in Rust, TypeScript, C#, Java, and C++, and it still runs plenty of its own services on .NET.

---

## Porting Without Stopping the Team

GitHub didn't freeze the codebase or port on a long-lived branch. Each pull request replaced one TypeScript component or slice with a thin shim that called into Rust, and deleted the old TypeScript in the same change. Every end-to-end test across the CLI and SDKs ran against the new Rust code, and if a required test failed, the pull request didn't land.

That's the [**strangler fig pattern**](/milanjovanovic.tech/strangler-fig-modular-monolith-migration.md) applied inside a single codebase. Between May 12 and August 21, 128 port pull requests landed in <VPIcon icon="fas fa-code-branch"/>`main`, and the CLI shipped 135 releases along the way.

Each release carried a small set of newly ported components to real users, mostly inside Microsoft and GitHub. Reported issues were easier to trace back to a recent port, which is why Toub calls the slower, incremental rollout a feature.

---

## What the Performance Numbers Mean

Toub benchmarked through the C# SDK against a deterministic chat server on localhost, so model inference and network latency aren't part of these numbers:

Copilot runtime benchmarks through the C# SDK, as reported by GitHub. The TypeScript baseline is from May 12, the Rust runs are from August 21, and speedups are relative to the baseline.

| **Scenario** | **TypeScript** | **Rust, out-of-process** | **Rust, in-process** |
| ---: | :---: | :---: | :---: |
| Client, session, one turn | 5.25 s | 1.33 s (4.0x) | 292 ms (18.0x) |
| Resume a 32-turn session | 5.64 s | 1.52 s (3.7x) | 264 ms (21.4x) |
| Ten concurrent client lifecycles | 12.34 s | 4.18 s (3.0x) | 742 ms (16.6x) |
| 1,000 one-turn session lifecycles | 132.52 s | 22.53 s (5.9x) | 20.93 s (6.3x) |

So was the migration a success? Based on these numbers, absolutely.

Out-of-process, the Rust runtime is **3x to 6x faster** with the same process boundary. That's the language change plus everything else that landed in those 14.5 weeks, and Toub points out that this compares shipped systems, not languages in isolation.

The bigger jump comes from the architecture change Rust made practical. In-process, the SDK no longer launches a child process at all. Memory follows the same pattern: ten concurrent clients added 1,383 MB with the TypeScript process tree, 247 MB with Rust out-of-process, and 126 MB in-process.

The last row is the exception: across 1,000 session lifecycles, the two modes land close together (5.9x and 6.3x). My read is that most of the in-process win comes from not starting a separate process for each client, and that cost matters less once the client is running.

---

## One Engineer and $120,000?

The "one engineer" is Toub, a Distinguished Engineer at Microsoft. He's basically a legend in the .NET world, and definitely not your average engineer.

He also wasn't alone, and his post has a section saying so. It credits Steve Sanderson with a temporary cross-process interop layer and five of the six SDK bindings, Ed Burns with the sixth, and others with packaging, build times, build caching, and many pull request reviews. During the port, "tens of agentically assisted developers merging hundreds of pull requests per week" kept adding TypeScript that the port had to absorb.

Microsoft's market cap was around $3.8 trillion at the end of September, so $120,000 in tokens is pocket change for them.

The most telling chart in the post shows what Toub's own messages to the agents were for. Of the roughly 2,600 he typed or spoke, about 63% went to review, testing, and CI, to challenging technical or design decisions, and to pushing agents that stopped before the job was done.

![Intent of 2,639 human-authored messages during the port: 31.0 percent review, testing, and CI, 17.4 percent challenging technical or design decisions, and 15.0 percent pushing for completeness.<br/>Source: [<VPIcon icon="iconfont icon-github"/>Migrating the GitHub Copilot runtime to Rust, using Copilot](https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/)](https://github.blog/wp-content/uploads/2026/09/user-message-intents.svg)

---

## No Human Read All 800,000 Lines of Rust

In July, [Uncle Bob said he stopped reading the code his agents write (<VPIcon icon="fa-brands fa-x-twitter"/>`unclebobmartin`)](https://x.com//status/2080257779395154409), and developers have argued about it ever since. I [<VPIcon icon="fa-brands fa-youtube"/>made a video about it](https://youtu.be/sClTAvkQDOU) at the time.

Do you think anyone at GitHub read all 832,378 lines of Rust? If you think the answer is yes, I've got a bridge to sell you.

They built a review system around the agents instead. Toub's `rust-rebase-review` skill tells the main agent to rebase the port onto <VPIcon icon="fas fa-code-branch"/>`main`, then launch reviewer subagents on three different models (Claude Opus 5, GPT-5.6 Sol, and Grok 4.6). Each one compares the old TypeScript with the new Rust line by line, and the loop repeats until every review comes back clean.

One rule in that skill guards the tests:

```md
- Validate that no E2E tests have been deleted or changed. Such changes are
  an indication of a porting bug.
```

Toub split the review into layers:

> For my review, I focused on architecture, design, conventions, and approach. The agents did the exhaustive old-versus-new comparisons; tests and static analysis checked mechanically enforceable properties; human reviewers concentrated on architecture, API contracts, risk, and any suspicious places surfaced by those other layers.

![A port pull request passes through four review layers before it merges: reviewer agents on three models compare old TypeScript with new Rust, tests and static analysis check mechanical properties, human reviewers look at architecture, API contracts, and risk, and Stephen Toub makes the merge decision.](https://milanjovanovic.tech/blogs/mnw_214/review_layers.png)

His summary of the job:

> The agents changed the amount of code one engineer could supervise. They did not remove the need for an engineer who understood the system and could vouch for the direction, the guardrails, and the release.

So your job as an engineer changes. The agents generate the code, and you're the one guiding them. You set the guardrails, give feedback, change direction, and decide when an implementation is bad enough to throw away and start over.

That takes a solid grasp of software architecture, distributed systems, and testing. I made the same point in [**Four Years of Writing Every Week**](/milanjovanovic.tech/four-years-of-writing-every-week.md): I ask the same review questions whether a human or an agent wrote the code.

---

## Meanwhile, at Rails World

A week after GitHub's post, DHH opened [<VPIcon icon="iconfont icon-ruby"/>Rails World 2026](https://rubyonrails.org/world/2026) in Austin with a [<VPIcon icon="fa-brands fa-youtube"/>keynote](https://youtu.be/vDjW_dRyKXY) that sent a lot of Rails developers off the rails (pun intended).

He said 37signals is done writing code by hand as a normal part of the job, and that he has retired from being a professional programmer. He also said he hates looking at Rust code, then added: "Rust is amazing if you never, ever, ever have to look at it yourself. Agents like Rust." I haven't written any Rust myself, and I don't want to.

DHH's Rust quote is close to how GitHub ran this port. Agents wrote the Rust and did the line-by-line comparison against the TypeScript, but Toub still reviewed the high-risk areas himself.

---

## Where This Is Going

In a little over three months, a runtime that VS Code, Visual Studio, and Office depend on moved to a different language while the team kept shipping, and it got faster and lighter. Toub estimates the same project would have taken a whole team a year or two before agents, and a proposal like that would have lost to feature work.

DHH closed his keynote by saying that nobody knows anything about the future, so the rational choice is to be happy about it. I'm in that camp.

I use agents for all sorts of things, including [**small tools I build for myself**](/milanjovanovic.tech/speech-to-text-in-dotnet-with-assemblyai.md), and whether those tools are written in .NET or Rust matters less and less. I think what we can already do with agents is mind-blowing, and they're only going to get better. I expect engineers who understand the systems they're building to get a lot more done.

How do you see the next few years playing out for developers, and are you as optimistic as I am? Let me know in the comments.

---

## Frequently Asked Questions

::: details Why did GitHub port the Copilot runtime from TypeScript to Rust?

The runtime ran on Node.js, so every Copilot SDK client, in all six languages, had to launch the Copilot CLI as a separate Node.js process and talk to it over JSON-RPC. GitHub wanted a runtime with minimal dependencies and overhead that all six SDKs could load in-process through a C ABI. It chose Rust for those requirements plus softer reasons, such as team experience and industry direction.

:::

::: details Did one engineer really port GitHub Copilot to Rust?

Mostly, with help. Stephen Toub, a Distinguished Engineer at Microsoft, drove the port with coding agents over about 14.5 weeks and estimates it took about three weeks of his own time. Teammates built a temporary cross-process interop layer, the SDK bindings, packaging, and build improvements, and reviewed pull requests while other developers kept shipping features.

:::

::: details How much did the Copilot Rust migration cost?

About $120,000 in token spend for roughly 136.3 billion tokens, most of them cached input reads, plus about three weeks of the lead engineer. Only the token spend Toub attributed to the port and his own time are counted, so teammate time and reviews are not in it. Toub estimates the same project would have taken a whole team of developers a year or two before agents.

:::

::: details How much faster is the Rust Copilot runtime?

In GitHub benchmarks through the C# SDK, the Rust runtime was 3x to 6x faster out-of-process and 6x to 21x faster in-process (an opt-in mode) than the TypeScript baseline, depending on the scenario. Memory added by ten concurrent clients dropped from 1,383 MB to 126 MB in-process. The tests excluded model inference and network latency.

:::

::: details Why did Microsoft not use C# for the Copilot runtime?

The GitHub post does not discuss C# as an option for the runtime. Its requirements centered on loading the runtime inside other processes in six languages through a C ABI, with low overhead and predictable resource use. One likely factor: Rust compiles to a native library with no garbage collector, while every Native AOT .NET library brings its own GC heap and GC threads into the host.

:::

::: details Did anyone review 800,000 lines of AI-generated Rust?

Not line by line. Reviewer agents on three different models compared the old TypeScript with the new Rust, tests and static analysis checked what could be checked mechanically, and human reviewers focused on architecture, API contracts, and risk. Stephen Toub manually reviewed high-risk areas and made the final merge decisions.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What It Actually Took to Port the GitHub Copilot Runtime to Rust",
  "desc": "GitHub ported the Copilot agent runtime from TypeScript to more than 800,000 lines of Rust, and the headlines credited one engineer and $120,000 in tokens.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloggithub-copilot-rust-migration-hype-vs-reality.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
