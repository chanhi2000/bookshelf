---
lang: en-US
title: "Stack Overflow: When We Stop Asking"
description: "Article(s) > Stack Overflow: When We Stop Asking"
icon: fas fa-brain
category:
  - AI
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stack Overflow: When We Stop Asking"
    - property: og:description
      content: "Stack Overflow: When We Stop Asking"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/stack-overflow-when-we-stop-asking.html
prev: /ai/articles/README.md
date: 2026-05-20
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url: https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/newspaper-stack-scaled-1.png
---

# {{ $frontmatter.title }} 관련

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
  name="Stack Overflow: When We Stop Asking"
  desc="It still hits like a ton of bricks to see the steep decline in Stack Overflow questions. What does that mean about learning in our industry?"
  url="https://css-tricks.com/stack-overflow-when-we-stop-asking"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/newspaper-stack-scaled-1.png"/>

Let’s play a quick game: I’ll show a graph and try to guess what it’s about.

![Source: [<VPIcon icon="fas fa-globe"/>Data Stack Exchange](https://data.stackexchange.com/stackoverflow/query/1926661#graph)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_4CD7D9F6D63D15E0BB4DEE9C7E8B57FB6D78E90F4E1EA43D5FB77F65D6BEF1CB_1772108797606_image.png?resize=1014%2C599)

No, it isn’t a crypto coin crashing a few hours after being minted. And not, it is also not [**an oscillatory/wavy graph made with pure CSS**](/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md##aa-wavy-layouts), but a harsher truth.

I already gave it away with the title, but it still hits like a ton of bricks to know it is the steep decline in the **number of questions asked on Stack Overflow**. You can see its peak around 2014 with more than 200,000 questions asked in a single month. But now in 2026, it is struggling to even hit 3,000 questions a month.

We don’t have to be experts in the field to find out the culprit. You guessed, it’s AI… *mostly*.

While AI is painted as the Stack Overflow killer, the truth is Stack Overflow’s downfall started long before ChatGPT’s release in late 2022.

![A line chart shaped like a giant bell curve that grows expontionally between 2009 and 2016 then sharply declines over the next ten years. The chart is labelled to show the various peaks and valleys the timeline.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_4CD7D9F6D63D15E0BB4DEE9C7E8B57FB6D78E90F4E1EA43D5FB77F65D6BEF1CB_1773836280113_labelled.png?resize=1014%2C599)

By [<VPIcon icon="fa-brands fa-stack-overflow"/>community accounts](https://stackoverflow.blog/2018/04/26/stack-overflow-isnt-very-welcoming-its-time-for-that-to-change/) and also from personal experience, moderation since its peak in 2014 has been (and still is) one of the leading causes for the lack of questions.

As the site grew, Stack Overflow needed a better way to moderate the hundreds of thousands of questions asked every month: the inevitable wall that forum-based communities hit when they scale beyond a certain point. There are several ways to try to solve this, but [<VPIcon icon="fa-brands fa-stack-overflow"/>the route Stack Overflow took](https://meta.stackoverflow.com/questions/251175/stack-overflow-is-not-yet-a-vast-wasteland-a-history-of-moderator-tooling?ref=blog.pragmaticengineer.com) might not have been the best:

> On Stack Overflow, we close or delete questions that can’t be answered straight away – it’s not very sociable, but it scales wonderfully.

It’s clear Stack Overflow wasn’t focusing on the quantity of the questions but rather on the quality of them, while avoiding duplicates as much as possible. This pattern was in favor of Google searches for questions that were already answered and, hence, living on pre-answered questions instead of on users making new or duplicate ones.

It wasn’t helpful either how the community seemed to close upon itself, making it harder for beginners to even ask a question. And if you’re like me, you probably want to inquire without being told you’re stupid, as if getting punished for wanting to learn.

Generative AI was the final nail in the coffin. I can’t complain about this, as AI seemingly provides the same answers without judgment (in fact, maybe *too much* encouragement) nor delay, so I can see why people might prefer asking an LLM instead.

However, as I dug deeper into this, my concern was no longer about just Stack Overflow, but the tech ecosystem at large. Questions like, *are we still asking questions?* *Are we still seeking to be better?* Or do we all rely on LLMs, and solely on LLMs, for advice? That kept ringing in my mind as I continued my research.

I believe that, beyond the fall of Stack Overflow, those questions linger more than ever. How AI has generally impacted our workflow, how we can use it in problem-solving, and what we can do about this as developers.

---

## Problem-Solving and AI

Is AI a better programmer than you? What makes a programmer better than others is as subjective as it gets, but some are eager to say that [<VPIcon icon="fas fa-globe"/>AI can write code better than you](https://wandb.ai/telidavies/ml-news/reports/AlphaCode-DeepMind-s-Code-Competition-AI-Solves-Problems-At-Human-Level-Competency--VmlldzozMTE3Njgy#:~:text=AlphaCode's%20human%2Dlevel%20performance,optimized%20training%20data%20and%20architecture.). According to that research:

> AlphaCode achieves human-level problem solving skills and code writing ability as shown by performance in programming competitions.

At least that’s when it was tested against Codeforce’s (an online code competition site) problems, where I admit it can and will perform better than your average programmer. But most developers don’t care about Contest problems beyond a technical interview; they know being a software developer is so much more than that.

AI writing quality code is an extremely nuanced topic and lacks a decisive conclusion. However, if you take the time to research, you’ll find that AI-generated code has lots of flagrant differences. According to the [<VPIcon icon="iconfont icon-arxiv"/>research from Cornell](https://arxiv.org/abs/2508.21634):

> AI-generated code is generally simpler and more repetitive, yet more prone to unused constructs and hardcoded debugging, while human-written code exhibits greater structural complexity and a higher concentration of maintainability issues.

Okay, so it can generate simple code, but can it write *good* code? Even solve problems better than a software engineer would?

According to [<VPIcon icon="iconfont icon-arxiv"/>MIT research](https://arxiv.org/abs/2503.22625), AI can write good code, but it cannot possibly think and make decisions like a software engineer. AI cannot compete on that level yet, at least [<VPIcon icon="fa-brands fa-stack-overflow"/>without running into a lot of bugs](https://stackoverflow.blog/2026/01/28/are-bugs-and-incidents-inevitable-with-ai-coding-agents/#h2-17e392245733).

Drawing on both first-hand experience and feedback, if all you do is copy-and-paste AI-generated code without careful consideration, you are bound to hit serious bugs and possibly even vulnerabilities. In fact, [<VPIcon icon="fas fa-globe"/>VeraCode published an article](https://veracode.com/blog/ai-generated-code-security-risks/) stating that “[…] 45% of AI-generated code contains security flaws,” after testing for security vulnerabilities in 100 AI models. That’s a large percentage of code that’s flawed security-wise and would have cost implications for any user who wants to “vibe-code” without doing thorough checks.

::: info Fun fact

[<VPIcon icon="iconfont icon-github"/>GitHub released the results of its AI in software development survey in August 2024](https://github.blog/news-insights/research/survey-ai-wave-grows/), and over 97% of its respondents have used AI outside or inside their work. That’s even aside from the companies enforcing the use of AI in your current code workflow. It’s literally everywhere; there’s almost no escaping its usage

:::

But, does that mean it’s all bad? The answer to that, in my opinion, is no. According to [<VPIcon icon="fas fa-globe"/>research done by Harvard Business Review](https://hbr.org/2025/05/research-gen-ai-makes-people-more-productive-and-less-motivated), AI is effective for *helping* solve problems (let’s not also ignore the trade-off from the study that AI workflows result in less motivation). In essence, it is perhaps best used to enhance problem-solving effectiveness.

This means that, as AI is taking over industries and being incorporated into our daily work, it still won’t replace your creativity and problem-solving approach, which you would need to tackle unique everyday challenges. It’s difficult to replicate.

Like every other tool, **AI has its limits, and without human craftsmanship behind it, the tool is almost useless**. A good craftsman uses all the tools at his disposal to achieve his goals, AI being just one of them.

> “The effectiveness of the tool is determined by the skill of the craftsman who created it and the ingenuity with which he utilizes it.”
> 
> Craig D. Lounsbrough

The big danger is not just security vulnerabilities, but over-dependence on the tool, which I believe will lead to an eventual decline in the number of code craftsmen in the coming generation. How should newer and experienced developers go about this?

---

## Some Advice

Here is a list of questions I ask myself when picking up AI in my development work:

1. **Am I asking the LLM smaller, specific questions?** This way, I can verify each process step-by-step rather than eyeballing the whole system code as a whole. I’m still a developer in the sense that I am not leaving the LLM to do *all* the work.
2. **Am I evaluating the output when it’s finished?** In other words, do I understand what it did? Would I be comfortable modifying the generated code if I know a better approach, or when I have to maintain it in the future?
3. **Am I checking the tool’s references?** This may be more geared towards research instead of straight code output. Where exactly are its answers coming from? Are those good sources? Are there others? It’s important to know the tool is not citing a fictional source, but rather, coming up with modern and tried-and-true approaches.
4. **Have I tested the work?** Did the tool understand the task and consider all edge cases? This is perhaps the most important question because knowing how people use your application is something a machine is less inclined to know than a human.

---

## What happens when we stop asking?

Think about this: if we stop asking questions, how will AI be trained in the future? Technologies change and improve over time. What’s updated now will soon become old-fashioned. Take CSS, for example. With the recent CSS updates (nesting, view transitions, container queries, etc.), we are writing CSS vastly different than even a few short years ago. You wouldn’t want to be stuck with an outdated and clumsy solution trained from code written decades ago. If we stop asking questions and answering them, don’t you think that would make the LLMs lag behind? That’s just me speculating, but I think it’s easy to imagine that being the case.

We cannot deny [<VPIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow’s service over the years](https://stackoverflow.blog/2023/09/26/celebrating-15-years-of-stack-overflow/). It got us asking. It got us answering. It got us thinking. The question we should all ask ourselves is,*Will LLMs do the same?*

I’ll leave you with this quote from Stack Overflow co-founder Jeff Atwood:

::: note

> [<VPIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow is you.](https://stackoverflow.blog/2008/11/25/stack-overflow-is-you/) This is the scary part, the great leap of faith that Stack Overflow is predicated on: trusting your fellow programmers. The programmers who choose to participate in Stack Overflow are the “secret sauce” that makes it work.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stack Overflow: When We Stop Asking",
  "desc": "It still hits like a ton of bricks to see the steep decline in Stack Overflow questions. What does that mean about learning in our industry?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/stack-overflow-when-we-stop-asking.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
