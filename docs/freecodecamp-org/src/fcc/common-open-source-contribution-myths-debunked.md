---
lang: en-US
title: "Common Open Source Contribution Myths – Debunked"
description: "Article(s) > Common Open Source Contribution Myths – Debunked"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Common Open Source Contribution Myths – Debunked"
    - property: og:description
      content: "Common Open Source Contribution Myths – Debunked"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/common-open-source-contribution-myths-debunked.html
prev: /devops/github/articles/README.md
date: 2025-09-02
isOriginal: false
author:
  - name: Orim Dominic Adah
    url : https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756821843592/e345ed9b-4cae-4273-b677-05e7047be8b7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Common Open Source Contribution Myths – Debunked"
  desc="Many developers shy away from contributing to open source, as it can be intimidating and hard to get started. Even though your contributions might seem inconsequential at first, they can potentially have a huge impact on your career. In this article,..."
  url="https://freecodecamp.org/news/common-open-source-contribution-myths-debunked"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756821843592/e345ed9b-4cae-4273-b677-05e7047be8b7.png"/>

Many developers shy away from contributing to open source, as it can be intimidating and hard to get started. Even though your contributions might seem inconsequential at first, they can potentially have a huge impact on your career.

In this article, we’ll discuss some common misconceptions that might be holding you back from contributing to open source. I’ll show you what you’re missing out on, and give you some advice to help you begin.

---

## What is Open Source?

Open source refers to software that has its code publicly available for viewing, modification, and use. The code is usually hosted on platforms like GitHub where developers can contribute to the codebase and share their expertise with the project.

Although open source software code is publicly accessible, it doesn’t mean that the software has to be free. Creators of the software can make money by charging a fee for things like optional plugins, consultation about the software, and so on.

[Nginx (<VPIcon icon="iconfont icon-github"/>`nginx`)](https://github.com/nginx) is an example of open source software that charges a fee for additional but optional plugins. [NestJS (<VPIcon icon="iconfont icon-github"/>`nestjs`)](https://github.com/nestjs) is open source too, but has an official paid course (and its maintainers charge a consultation fee for more complex uses of the software).

---

## Key Factors Influencing Open Source Contributions

In 2023, roughly [<VPIcon icon="fa-brands fa-google"/>10% of Alphabet’s full-time workforce](https://opensource.googleblog.com/2024/08/2023-open-source-contribution-report.html) actively contributed to open source projects. And according to [<VPIcon icon="fas fa-globe"/>GitHub’s 2024 Open Source Survey](https://opensourcesurvey.org/2024/), respondents reported that the top five factors that influenced their contribution to open source projects, in order of importance, were:

- Whether the project had an open source license or not. Having an open source license was considered favourable.
- The responsiveness of the project’s maintainers. Fast and positive responses are encouraging.
- A welcoming community, indicating support from the maintainers and others contributing to the project.
- The level of activity on the project – lots of activity signifies an actively maintained project (which is more rewarding and useful to work on).
- Whether the project had a contribution guide that helps developers ease into contributing to the project.

[![GitHub’s 2024 Open Source Survey - Key Factors Influencing Open Source Contributions](https://cdn.hashnode.com/res/hashnode/image/upload/v1753830717981/b753b4ae-36ec-4773-990d-dcb83a530c3f.png)](https://opensourcesurvey.org/2024/)

But even though many projects are attractive, and their maintainers are welcoming, some people still hesitate to contribute for reasons not linked to the projects themselves.

---

## Why People Hesitate to Contribute

After looking into responses from various discussions, I found that there are three primary barriers developers face when they’re considering contributing to open source:

- You feel like an impostor
- You have to do it for free
- You have a busy schedule

The rest of this article will address (and hopefully break down) these barriers. I hope that by the end, you’ll be encouraged to contribute to open source.

### You feel like an impostor

Many people think that you have to know a lot about a project to work on it, but this misconception is one of the biggest barriers that holds developers back from contributing to open source. Some people say to themselves “I don't have the experience”, “I have nothing to contribute”, “What if I break something?”, “I don’t know enough”.

Here’s some advice from [**How to Overcome Imposter Syndrome**](/freecodecamp.org/how-to-not-feel-like-an-imposter-3d41fdc91182/) that can help:
<!-- TODO:> /freecodecamp.org/how-to-not-feel-like-an-imposter.md -->

- Stop obsessing over not being good enough. It’s unproductive.
- Everyone excels at different things. You likely excel at some things that others don’t.
- Don’t compare yourself with others who are more experienced than you. In fact, stop comparing yourself with anyone else. You are unique.

Try to contribute to projects that you have used. You already understand them better than projects that you haven’t used. As a beginner, working on issues labeled “good first issue”, “up-for-grabs”, “beginner-friendly” and so on is a great place to start. If you find an issue that interests you, read the discussions under it if there are any so you can understand it better. State that you are interested in working on it and an experienced contributor will likely respond to let you know if you can proceed. They can also provide you with more information if you need it.

![Issues with labels that beginners can contribute to](https://cdn.hashnode.com/res/hashnode/image/upload/v1756458374283/cf14b8d9-b7e0-45b9-a7ca-a88e93df28c2.png)

Put in the work to resolve it yourself first, and if you have any issues, then you can ask more questions. When you try to resolve it yourself before asking questions, it tells maintainers that you have put in the effort and they will be more willing to help. It also makes your question(s) sound thoughtful and direct.

::: info How to Do Great Work by Paul Graham

> “The three most powerful motives are curiosity, delight, and the desire to do something impressive.“

:::

I shared my experience in an article titled [<VPIcon icon="fas fa-globe"/>You Don't Need to Know It All to Contribute](https://orimdominic.vercel.app/posts/you-dont-need-to-know-it-all-to-contribute/) where I found out that the author of a popular JavaScript project was not the one that wrote the TypeScript part of the project and he was happy to receive my contribution.

If you still feel like you are not good enough, try to look at it as an opportunity to learn from a codebase built by developers with a wide range of experiences and expertise. If you dive into the code and try to improve it, you’ll learn things that you won’t find in online tutorials and blog posts.

Just keep in mind that you don’t always have to contribute code. Even though the majority of contributions are usually code-based, there are other areas that need attention, too, and are often overlooked. What happens if the documentation is nonexistent or outdated? What happens when issues aren’t triaged? You can help with these issues by:

- Discussing them with project maintainers and other contributors to clarify and improve docs and other resources
- Giving feedback on pull requests
- Adding labels for organising issues into proper categories

By doing this, you provide value to these projects. What matters is your interest in solving problems and your ability to do the required research.

### You have to do it for free

Another misconception is that devs always do open source without getting paid. But this isn't true for all cases. Some open source repositories reward contributors via bounties, for example. With bounties, prize money is placed on an an issue and whoever solves it gets the prize money or reward. I earned money through this via [<VPIcon icon="fas fa-globe"/>my first contribution to Remotion](https://orimdominic.vercel.app/posts/my-first-open-source-contribution-to-remotion/).

And there are other benefits of contributing to open source projects aside from getting paid. And often, people contribute primarily for these other reasons.

For example, for beginner developers, there aren’t many opportunities to get hands-on experience building “real” projects, or to learn what working on a tech team is really like.

But by contributing to an open source project and becoming part of that community, you get to practice teamwork, contribute to code that’s constantly changing and growing, and solve real-life problems. This gives you valuable experience that’ll help prepare you for the workforce (and that you can put on your résumé). The image below is a screenshot of two people who received a [<VPIcon icon="fas fa-globe"/>scholarship from the Linux Foundation](https://training.linuxfoundation.org/blog/500-promising-individuals-worldwide-receive-linux-foundation-it-training-certification-scholarships/) for their contributions to open source.

![Screenshot of open source scholarship winners](https://cdn.hashnode.com/res/hashnode/image/upload/v1756482636970/e3fe1fad-7edb-4748-b760-00e054dd4e61.png)

So as you can see, even if you don’t get monetary rewards, contributing to open source presents many other opportunities. You get to:

- Work with people from diverse cultures
- Develop clear written technical communication skills
- Improve your knowledge of various tools/frameworks
- Prove yourself to be a self-motivated developer
- Work asynchronously with people across multiple time zones

You also get the opportunity to network with other developers and grow your reputation and credibility in the software development space. [Prosper Otemuyiwa (<VPIcon icon="iconfont icon-github"/>`unicodeveloper`)](https://github.com/unicodeveloper) and [Anthony Fu (<VPIcon icon="iconfont icon-github"/>`antfu`)](https://github.com/antfu) are great examples and beneficiaries of this type of career growth.

### You have a busy schedule

Having other pressing commitments is a reasonable barrier to contributing to open source. We’re all human, and our resources (time and energy) are limited – so we have to manage them judiciously.

But have you considered what would happen if the open source project that you use had a serious bug that affects your performance or deliverables at work? What happens when the problem you are trying to solve at work requires expert knowledge of that open source project that you heavily depend on?

Contributing to open source projects in the little ways that you can will give you insight into how the projects work. Since you have to maintain a rapport with other developers on the project, you’ll form a professional bond with them and they’ll be glad to help you out if you have questions or require expert opinions on the project. If you are a major contributor, you may have the chance to influence the project’s roadmap.

Continuing to develop your skills is paramount to you as a developer. If you can make time to improve your skills, then you can make time to contribute to open source because it offers more rewards than just skill improvement. You can start small – try dedicating, for example, one hour a week before work, or a couple hours on the weekend. Then you can ramp up once you get into the rhythm and find more time. Contributing to open source doesn’t have to be overly demanding.

You’re already solving problems. Why not solve them in a visible way that helps others and builds your own credibility?

---

## Start Contributing to Open Source Today

We all should contribute to open source one way or another. If you feel that you don’t know enough, just keep in mind that other people feel (or felt, before starting) the same way. And know that nobody can claim to know it all – not even the founder of the project. So don’t let the feeling of impostor syndrome hold you back.

Remember also that Rome was not built in a day. It wasn’t also built by one person’s hand – but by countless laborers over many centuries and millennia. You could be part of building the next great open source project (or helping maintain the many great ones that are already out there and need your help).

So consider contributing today by visiting the issues tab of any of the open source projects that you use extensively and pick up something. You can find links to beginner-level issues from the following websites:

<SiteInfo
  name="Good First Issue: Make your first open-source contribution"
  desc="Making your first open-source contribution is easier than you think. Good First Issue is a curated list of issues from popular open-source projects that you can easily fix. Start today!"
  url="https://goodfirstissue.dev/"
  logo="https://goodfirstissue.dev/favicon-16x16.png"
  preview="https://goodfirstissue.dev/images/meta.jpg"/>

<SiteInfo
  name="Up For Grabs"
  desc="Want to contribute to open source, but not sure where to start?"
  url="https://up-for-grabs.net/"
  logo="https://up-for-grabs.net/icons/favicon-32x32.png"
  preview="https://up-for-grabs.net/images/logo.png"/>

```component VPCard
{
  "title": "Get Started Contributing to Open Source Projects | CodeTriage",
  "desc": "Discover the easiest way to get started contributing to open source. Over 95,208 devs are helping 9,464 projects with our free, community developed tools",
  "link": "https://codetriage.com",
  "logo": "https://codetriage.com/assets/favicon-3f3e475345be27562adee9d8e596a032785e3efd4496111cab0b1fe0a81ad722.ico",
  "background": "rgba(65,176,191,0.2)"
}
```

<SiteInfo
  name="Find Open Source Projects That Match Your Skills | OnlyDust"
  desc="OnlyDust helps developers find open source projects and issues that match their skills and interests. Join active ecosystems and start contributing today."
  url="https://onlydust.com/"
  logo="https://onlydust.com/favicon.ico"
  preview="https://onlydust.com/opengraph-image-de5648?2296e36b51a7e9f0"/>

If you see an issue that you are interested in, take the following steps as a new contributor:

- Look for a <VPIcon icon="fa-brands fa-markdown"/>`CONTRIBUTING.md` file and read it for guidance on how to contribute
- Clone the repository and set it up locally
- State your intention to work on the issue by making a comment on the issue

Ask a question if an issue is unclear to you and you’ll get guidance.

Good luck on your open source journey!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Common Open Source Contribution Myths – Debunked",
  "desc": "Many developers shy away from contributing to open source, as it can be intimidating and hard to get started. Even though your contributions might seem inconsequential at first, they can potentially have a huge impact on your career. In this article,...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/common-open-source-contribution-myths-debunked.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
