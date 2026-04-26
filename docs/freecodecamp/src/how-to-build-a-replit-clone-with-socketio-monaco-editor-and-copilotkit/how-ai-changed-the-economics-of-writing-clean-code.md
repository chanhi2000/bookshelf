---
lang: en-US
title: "How AI Changed the Economics of Writing Clean Code"
description: "Article(s) > How AI Changed the Economics of Writing Clean Code"
icon: fas fa-brain
category:
  - Engineering
  - Computer
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How AI Changed the Economics of Writing Clean Code"
    - property: og:description
      content: "How AI Changed the Economics of Writing Clean Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ai-changed-the-economics-of-writing-clean-code.html
prev: /ai/articles/README.md
date: 2026-04-28
isOriginal: false
author:
  - name: Aaron Yong
    url: https://freecodecamp.org/news/author/aaronhsyong/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ecb13bda-70dd-437a-8d9a-4ef8b18ccc05.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How AI Changed the Economics of Writing Clean Code"
  desc="If you've ever wanted to add an interface to a codebase and gotten pushback, you already know the argument: ”That's twice the code for the same thing.” And honestly? It was a fair point. You'd write t"
  url="https://freecodecamp.org/news/how-ai-changed-the-economics-of-writing-clean-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ecb13bda-70dd-437a-8d9a-4ef8b18ccc05.png"/>

If you've ever wanted to add an interface to a codebase and gotten pushback, you already know the argument: "That's twice the code for the same thing."

And honestly? It was a fair point. You'd write the contract — the interface, the abstract class, the protocol — and then write the implementation. Two files where one would do. That's more surface area, more indirection, and more to maintain.

The Ruby and Rails communities built an entire philosophy around this: convention over configuration, less ceremony, fewer keystrokes. If the framework could infer your intent, why spell it out?

Then AI happened.

I was recently chatting with a CEO about what current-generation software engineers get wrong, and he put it cleanly:

> "Abstract interfaces were challenging a few months ago just because it required twice as much code. But with AI, lines of code are free. The reason we still need such constructs is because at some point a human still needs to look at the code. Interfaces reduce the cognitive load."

That framing stuck with me. The cost of writing code has collapsed. The cost of reading it hasn't moved. And that asymmetry changes everything about how you should think about abstraction.

Here's what I mean.

---

## Your Brain Is the Bottleneck

This isn't a vibes argument. There's actual neuroscience behind why interfaces help.

In 1988, educational psychologist John Sweller introduced Cognitive Load Theory. A [<VPIcon icon="fas fa-globe"/>2022 ACM review](https://dl.acm.org/doi/full/10.1145/3483843) covers how it's been applied to computing education since.

The short version: your brain juggles three types of load when processing information. *Intrinsic* load is the inherent difficulty of the problem itself. *Extraneous* load is the noise — poorly organized information, unnecessary details, bad naming. *Germane* load is the good stuff — the mental effort you spend building useful mental models.

Here's the kicker: your working memory can only hold a handful of chunks of information at a time — cognitive scientists typically estimate somewhere between 2 and 6. Not 2 to 6 files, or 2 to 6 classes — 2 to 6 *things*.

Felienne Hermans explores this in *The Programmer's Brain* (2021), arguing that design patterns act as chunking aids. When you recognize a Strategy pattern, your brain collapses an entire class hierarchy into a single cognitive unit. The word "Strategy" replaces five classes and their relationships. That's not hand-waving about clean code — that's how human memory actually works.

And we can literally see it on brain scans. In 2021, a team led by Norman Peitek and Janet Siegmund published [<VPIcon icon="fas fa-globe"/>an fMRI study on program comprehension](https://dl.acm.org/doi/10.1109/ICSE43902.2021.00056) that won the ACM SIGSOFT Distinguished Paper Award at ICSE.

They put developers in brain scanners and watched what happened when they read code. The finding: semantic-level comprehension — understanding *what* code does — required measurably less neural activation than bottom-up syntactic parsing — tracing *how* it does it.

An interface lets you comprehend at the semantic level. `UserRepository.findById(id)` tells you everything you need to know without opening the implementation. Your brain doesn't need to hold the SQL query, the connection pool logic, the error handling, and the result mapping in working memory simultaneously. The interface compresses all of that into one chunk.

That's not elegance. That's neuroscience.

---

## The Greats Already Knew This

The case for abstraction isn't new. The people who built the foundations of computer science were making this argument before most of us were born.

Dijkstra said it with precision:

> *"The purpose of abstracting is not to be vague, but to create a new semantic level in which one can be absolutely precise."*

Abstraction isn't about hiding things from people who can't handle complexity. It's about creating a level of discourse where you can reason clearly.

David Parnas formalized information hiding in his [<VPIcon icon="fas fa-globe"/>1972 ACM paper](https://dl.acm.org/doi/10.1145/361598.361623): *"Every module is characterized by its knowledge of a design decision which it hides from all others."* He proved that decomposing systems by design decisions (rather than processing steps) produced modules that were both more flexible *and* easier to understand. Comprehensibility wasn't a bonus — it was the design criterion.

Tony Hoare argued that abstraction is the most powerful tool available to the human intellect — a way to manage complexity by focusing on what matters and ignoring what doesn't. Martin Fowler brought it down to earth:

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."

And then there's John Ousterhout, whose book *A Philosophy of Software Design* (2018) makes the connection to cognitive load explicit. His central argument: more lines of code can actually be *simpler* if they reduce cognitive load.

His concept of *deep modules* — simple interfaces hiding complex implementations — is essentially the argument that interfaces are worth their weight in code. The Unix file system API (`open`, `close`, `read`, `write`, `lseek`) is five functions hiding an enormous amount of complexity. That's a deep module. That's the goal.

The Gang of Four put it first in their book for a reason. Page one: *"Program to an interface, not an implementation."*

None of this is controversial. But it's easy to forget when your AI tool just generated 200 lines of perfectly functional inline code in three seconds.

---

## The Economics Have Flipped

Here's where the CEO's insight becomes an economic argument.

The historical case against interfaces was always about *writing cost*. Interfaces meant more code to write, more files to create, more boilerplate to maintain. The entire dynamic typing movement — Python, Ruby, JavaScript — was partly a reaction to the ceremony that languages like Java imposed. Convention over configuration. Don't Repeat Yourself. Less is more.

But ask yourself: what exactly is the cost of writing boilerplate now?

GitHub's [<VPIcon icon="iconfont icon-arxiv"/>2022 controlled study](https://arxiv.org/abs/2302.06590) found that developers using Copilot completed tasks 55% faster. The boilerplate that used to justify skipping interfaces — the extra file, the type definitions, the method signatures — takes seconds to generate. The writing cost of an interface has effectively collapsed to zero.

But again, the reading cost hasn't budged.

Robert C. Martin argued in *Clean Code* (2008) that developers spend far more time reading code than writing it — an observation he framed as a ratio of 10 to 1. You can quibble with the exact number (it's anecdotal), but the direction is consistent across studies. A [<VPIcon icon="fas fa-globe"/>large-scale field study](https://ieeexplore.ieee.org/document/7997917/) tracking 78 professional developers across 3,148 working hours found they spend roughly 58% of their time on program comprehension alone. New developer onboarding averages six weeks — most of which is spent understanding existing systems, not producing new ones.

Addy Osmani named this asymmetry perfectly. In a [<VPIcon icon="fas fa-globe"/>March 2026 piece](https://addyosmani.com/blog/comprehension-debt/), he described *comprehension debt*:

::: info From *Comprehension Debt - the hidden cost of AI generated code.* by Addy Osmani (<VPIcon icon="fas fa-globe"/><code>addyosmani.com</code>)

> "When a developer on your team writes code, the human review process has always been a bottleneck — but a productive and educational one. Reading their PR forces comprehension. AI-generated code breaks that feedback loop. The volume is too high."

<SiteInfo
  name="Comprehension Debt - the hidden cost of AI generated code."
  desc="Comprehension debt is the hidden cost to human intelligence and memory resulting from excessive reliance on AI and automation. For engineers, it applies most to agentic engineering. There’s a cost that doesn’t show up in your velocity metrics when teams go deep on AI coding tools. Especially when its tedious to review all the code the AI generates. This cost accumulates steadily, and eventually it has to be paid - with interest. It’s called comprehension debt or cognitive debt."
  url="https://addyosmani.com/blog/comprehension-debt//"
  logo="https://addyosmani.com/assets/images/favicons/favicon-16x16.png"
  preview="https://addyosmani.com/assets/images/comprehension.jpg"/>

:::

The output looks clean, passes linting, follows conventions — precisely the signals that historically triggered merge confidence. But comprehension debt is distinct from technical debt because it accumulates invisibly — your velocity metrics, your DORA scores, your PR counts all look fine while your team's actual understanding of the codebase quietly erodes.

So here's the math: AI reduced the cost of writing abstractions to near zero. The cost of *not* having them — in human reading time, onboarding friction, and comprehension debt — hasn't changed at all. The break-even point for "is this interface worth it?" just shifted massively in favor of "yes."

---

## The Data Backs It Up

This isn't theoretical. We have data on what happens when AI generates code without good abstractions.

[<VPIcon icon="fas fa-globe"/>GitClear analyzed 211 million changed lines of code](https://gitclear.com/ai_assistant_code_quality_2025_research) between 2020 and 2024. Their findings: code churn — lines reverted or updated within two weeks — doubled compared to the pre-AI baseline. Copy-pasted code blocks rose from 8.3% to 12.3%. And refactoring-associated changes dropped from 25% to under 10%.

AI-generated code, as they put it, "resembles an itinerant contributor, prone to violate the DRY-ness of the repos visited."

The [<VPIcon icon="fas fa-globe"/>METR study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (2025) found something even more striking. Experienced open-source developers *predicted* AI would make them 24% faster. They *perceived* being 20% faster while using it. They were actually 19% slower. The perception gap is the story — you *feel* productive while generating code that creates more work downstream.

And then there's a study from Anthropic (yes, the company that makes Claude — full disclosure). They observed 52 software engineers learning a new library. The AI-assisted group completed tasks at the same speed, but scored [<VPIcon icon="iconfont icon-arxiv"/>17% lower on comprehension quizzes](https://arxiv.org/abs/2601.20245) afterward — 50% versus 67%. The biggest declines were in debugging ability. You can ship code you don't understand. You can't debug code you don't understand.

Kent Beck [<VPIcon icon="fas fa-globe"/>put it bluntly](https://tidyfirst.substack.com/p/90-of-my-skills-are-now-worth-0): "The value of 90% of my skills just dropped to $0. The leverage for the remaining 10% went up 1000x." What that remaining 10% is, he leaves deliberately open — but it's hard to read that and not think about system design.

---

## The Contrarian Case (And Why It Actually Agrees)

I'd be dishonest if I didn't address the people who argue against abstraction. And some of them are very smart.

Casey Muratori's [<VPIcon icon="fas fa-globe"/>"Clean Code, Horrible Performance"](https://computerenhance.com/p/clean-code-horrible-performance) demonstrated that polymorphism and virtual dispatch can make code 10 to 15 times slower than straightforward procedural alternatives.

His benchmark is real. If you're writing a game engine or a high-frequency trading system, abstract interfaces on your hot path will cost you.

Dan Abramov wrote [<VPIcon icon="fas fa-globe"/>"Goodbye, Clean Code"](https://overreacted.io/goodbye-clean-code/) after watching a premature abstraction make his codebase harder to modify:

::: info From *Goodbye, Clean Code* by Dan Abramov (<VPIcon icon="fas fa-globe"/><code>overreacted.io</code>)

> "My code traded the ability to change requirements for reduced duplication, and it was not a good trade."

<SiteInfo
  name="Goodbye, Clean Code — overreacted"
  desc="Let clean code guide you. Then let it go."
  url="https://overreacted.io/goodbye-clean-code//"
  logo="https://overreacted.io/icon.png?e0852c1e2c7f0e65"
  preview="https://overreacted.io/goodbye-clean-code/opengraph-image?5b0b970dfd19bb8c"/>

:::

Sandi Metz [<VPIcon icon="fas fa-globe"/>put it more sharply](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction): 

::: info From *The Wrong Abstraction* by Sandi Metz (<VPIcon icon="fas fa-globe"/><code>sandimetz.com</code>)

> "Duplication is far cheaper than the wrong abstraction."

```component VPCard
{
  "title": "The Wrong Abstraction — Sandi Metz",
  "desc": "I've been thinking about the consequences of the ”wrong abstraction.” My RailsConf 2014 ”all the little things” talk included a section where I asserted: > duplication is far cheaper than the wrong abstraction  And in the summary, I went on to advise: > ",
  "link": "https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction/",
  "logo": "https://images.squarespace-cdn.com/content/v1/537c0374e4b0f52ed92942e6/1406474770525-RW497M76YHQT582GRBCV/favicon.ico",
  "background": "rgba(33,33,33,0.2)"
}
```

:::

And Rich Hickey, in his talk [<VPIcon icon="fas fa-globe"/>"Simple Made Easy"](https://infoq.com/presentations/Simple-Made-Easy/), draws the critical distinction: *simple* (not intertwined) is not the same as *easy* (familiar). Wrong abstractions *complect* — they braid concerns together rather than separating them.

Here's the thing: none of these are arguments against abstraction. They're arguments against *bad* abstraction.

Muratori's performance argument applies to hot paths in performance-critical systems — not to your REST API's service layer. Abramov and Metz argue against *premature* abstraction — pulling patterns out before you understand the domain. And Hickey's entire talk is a case *for* the right abstractions, the ones that genuinely decompose rather than complect.

The irony is that in an AI-assisted world, these arguments are *easier* to address. You can generate the explicit, unabstracted version first. Let it stabilize. Watch the patterns emerge. Then extract the abstraction — with AI handling the mechanical refactoring. The cost of the "duplicate first, abstract later" approach just dropped to near zero.

---

## What This Means for You

If you're writing code with AI tools — and at this point, [<VPIcon icon="fa-brands fa-stack-overflow"/>most of us are](https://survey.stackoverflow.co/2024/ai) — the temptation is to let the AI produce whatever it produces and move on. It works. It passes the tests. Ship it.

But "it works" is table stakes. The harder question is: can the next person who opens this code understand it in under five minutes? Can *you* understand it in six months?

Interfaces aren't about making code prettier or satisfying some abstract (pun intended) design principle. They're compression algorithms for human cognition. They let your brain operate at the semantic level instead of the syntactic level. And now that AI has eliminated the only real cost of creating them — the boilerplate — there's no economic argument left for skipping them.

The rules haven't changed. The excuse has just expired.

::: info References

**Academic Papers**

<SiteInfo
  name="Cognitive Load Theory in Computing Education Research: A Review | ACM Transactions on Computing Education"
  desc="One of the most commonly cited theories in computing education research is cognitive load theory (CLT), which explains how learning is affected by the bottleneck of human working memory and how teaching may work around that limitation. The theory has ..."
  url="https://dl.acm.org/doi/10.1145/3483843/"
  logo="https://dl.acm.org/pb-assets/head-metadata/favicon-16x16-1574252172937.png"
  preview="https://dl.acm.org/cms/asset/10c0003b-e239-4716-9349-8791cc54f8d9/3561990.cover.jpg"/>

<SiteInfo
  name="On the criteria to be used in decomposing systems into modules | Communications of the ACM"
  desc="This paper discusses modularization as a mechanism for improving the flexibility and comprehensibility of a system while allowing the shortening of its development time. The effectiveness of a “modularization” is dependent upon the criteria used in ..."
  url="https://dl.acm.org/doi/10.1145/361598.361623/"
  logo="https://dl.acm.org/pb-assets/head-metadata/favicon-16x16-1574252172937.png"
  preview="https://dl.acm.org/cms/asset/a90324c9-8e31-4235-b95f-92127b0aedef/361598.cover.jpg"/>

<PDF url="https://arxiv.org/pdf/2302.06590" />
<!-- Peng, S., Kalliamvakou, E., Cihon, P., & Demirer, M. (2023). "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot." *arXiv:2302.06590*. -->
<PDF url="https://arxiv.org/pdf/2601.20245" />
<!-- Shen, J.H. & Tamkin, A. (2026). "How AI Impacts Skill Formation." *arXiv:2601.20245*. -->
<SiteInfo
  name="Measuring Program Comprehension: A Large-Scale Field Study with Professionals"
  desc="During software development and maintenance, developers spend a considerable amount of time on program comprehension activities. Previous studies show that program comprehension takes up as much as half of a developer's time. However, most of these studies are performed in a controlled setting, or with a small number of participants, and investigate the program comprehension activities only within the IDEs. However, developers' program comprehension activities go well beyond their IDE interactions. In this paper, we extend our ActivitySpace framework to collect and analyze Human-Computer Interaction (HCI) ..."
  url="https://ieeexplore.ieee.org/document/7997917/"
  logo="https://ieeexplore.ieee.org/assets/img/favicon.ico"
  preview="https://ieeexplore.ieee.org/assets/img/ieee_logo_smedia_200X200.png"/>
<!-- Xia, X., Bao, L., Lo, D., Xing, Z., Hassan, A.E., & Li, S. (2018). "Measuring Program Comprehension: A Large-Scale Field Study with Professionals." *IEEE Transactions on Software Engineering, 44*(10), 951–976. -->
<SiteInfo
  name="Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
  desc="We conduct a randomized controlled trial (RCT) to understand how early-2025 AI tools affect the productivity of experienced open-source developers working on their own repositories. Surprisingly, we find that when developers use AI tools, they take 19% longer than without—AI makes them slower. We view this result as a snapshot of early-2025 AI capabilities in one relevant setting; as these systems continue to rapidly evolve, we plan on continuing to use this methodology to help estimate AI acceleration from AI R&D automation."
  url="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study//"
  logo="https://metr.org/assets/images/favicon/favicon.png"
  preview="https://metr.org/assets/images/logo/og-image-logo.png"/>
<!-- - METR. (2025). "Measuring the Impact of Early 2025 AI on Experienced Open Source Developer Productivity." *metr.org*. -->

**Talks and Blog Posts**

<SiteInfo
  name="Simple Made Easy "
  desc="Rich Hickey emphasizes simplicity’s virtues over easiness’, showing that while many choose easiness they may end up with complexity, and the better way is to choose easiness along the simplicity path."
  url="https://infoq.com/presentations/Simple-Made-Easy//"
  logo="https://cdn.infoq.com/statics_s1_20260421232814/favicon.ico"
  preview="https://res.infoq.com/presentations/Simple-Made-Easy/en/mediumimage/rich-hickey-big.jpg"/>

<SiteInfo
  name="90% of My Skills Are Now Worth $0"
  desc="...but the other 10% are worth 1000x"
  url="https://tidyfirst.substack.com/p/90-of-my-skills-are-now-worth-0/"
  logo="https://substackcdn.com/icons/substack/icon.svg"
  preview="https://substackcdn.com/image/fetch/$s_!mPBL!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12f1f754-77a0-489b-8050-16e209721f0b_587x328.png"/>

<SiteInfo
  name="Comprehension Debt - the hidden cost of AI generated code."
  desc="Comprehension debt is the hidden cost to human intelligence and memory resulting from excessive reliance on AI and automation. For engineers, it applies most to agentic engineering. There’s a cost that doesn’t show up in your velocity metrics when teams go deep on AI coding tools. Especially when its tedious to review all the code the AI generates. This cost accumulates steadily, and eventually it has to be paid - with interest. It’s called comprehension debt or cognitive debt."
  url="https://addyosmani.com/blog/comprehension-debt//"
  logo="https://addyosmani.com/assets/images/favicons/favicon-16x16.png"
  preview="https://addyosmani.com/assets/images/comprehension.jpg"/>

<SiteInfo
  name="“Clean” Code, Horrible Performance"
  desc="Many programming ”best practices” taught today are performance disasters waiting to happen."
  url="https://computerenhance.com/p/clean-code-horrible-performance/"
  logo="https://substackcdn.com/image/fetch/$s_!TgJj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2e059d6-36c1-4b2e-92e4-285008802d28%2Ffavicon-48x48.png"
  preview="https://substackcdn.com/image/youtube/w_728,c_limit/tD5NrevFtbU"/>

<SiteInfo
  name="Goodbye, Clean Code — overreacted"
  desc="Let clean code guide you. Then let it go."
  url="https://overreacted.io/goodbye-clean-code//"
  logo="https://overreacted.io/icon.png?e0852c1e2c7f0e65"
  preview="https://overreacted.io/goodbye-clean-code/opengraph-image?5b0b970dfd19bb8c"/>

```component VPCard
{
  "title": "The Wrong Abstraction — Sandi Metz",
  "desc": "I've been thinking about the consequences of the ”wrong abstraction.” My RailsConf 2014 ”all the little things” talk included a section where I asserted: > duplication is far cheaper than the wrong abstraction  And in the summary, I went on to advise: > ",
  "link": "https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction/",
  "logo": "https://images.squarespace-cdn.com/content/v1/537c0374e4b0f52ed92942e6/1406474770525-RW497M76YHQT582GRBCV/favicon.ico",
  "background": "rgba(33,33,33,0.2)"
}
```

```component VPCard
{
  "title": "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones - GitClear",
  "desc": "Emerging trends: 4x more code cloning, "copy/paste" exceeds "moved" code for first time in history. Includes 2025 projections",
  "link": "https://gitclear.com/ai_assistant_code_quality_2025_research/",
  "logo": "https://gitclear.com/favicon.ico",
  "background": "rgba(121,172,245,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How AI Changed the Economics of Writing Clean Code",
  "desc": "If you've ever wanted to add an interface to a codebase and gotten pushback, you already know the argument: ”That's twice the code for the same thing.” And honestly? It was a fair point. You'd write t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ai-changed-the-economics-of-writing-clean-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
