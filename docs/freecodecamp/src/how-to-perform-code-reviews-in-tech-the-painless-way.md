---
lang: en-US
title: "How to Perform Code Reviews in Tech - The Painless Way"
description: "Article(s) > How to Perform Code Reviews in Tech - The Painless Way"
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
  - code-review
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Perform Code Reviews in Tech - The Painless Way"
    - property: og:description
      content: "How to Perform Code Reviews in Tech - The Painless Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-perform-code-reviews-in-tech-the-painless-way.html
prev: /devops/github/articles/README.md
date: 2024-12-04
isOriginal: false
author: Ankur Tyagi
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733242289474/def1a314-fe64-448b-9236-f66a529e3f13.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Perform Code Reviews in Tech - The Painless Way"
  desc="Okay, I know you may be skeptical: other guides have promised painless code reviews only to reveal that their solution requires some hyper-specific tech stack or a paid developer tool. I won’t do that to you. This guide provides a straightforward and..."
  url="https://freecodecamp.org/news/how-to-perform-code-reviews-in-tech-the-painless-way"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733242289474/def1a314-fe64-448b-9236-f66a529e3f13.png"/>

Okay, I know you may be skeptical: other guides have promised painless `code reviews` only to reveal that their solution requires some hyper-specific tech stack or a paid developer tool. I won’t do that to you.

This guide provides a straightforward and flexible template for `code reviews` that you can apply to your engineering team. The **only** requirement is that your app code is `open source`.

You can test a TypeScript workflow, Java workflow, Python workflow, PHP, Ruby or even some wacky web stack you invented. And it doesn’t matter if you’re developing on Windows, Linux, or Mac. Best of all, you don’t have to perform convoluted configuration or install software beyond a `yaml`.

I’ve been in engineering for the last 15 years, and `code reviews` have a bad reputation. We’ve all witnessed or lived through horror stories where sometimes it feels like every previous line gets torn to shreds.

So, what *can* you do differently? How can you make reviewing your code painless so that even the biggest nitpick on your team has nothing but praise?

After participating in code reviews for a decade, taking code reviews less personally is **the single biggest thing you can do to improve your code.** Why? Because all software is iterative. Even “perfect” code will eventually become outdated. Instead of thinking of it like a graded assignment, think of it as a part of the process.

::: note Prerequisites**

This tutorial uses free, open-source tools. You’ll need to have a [<VPIcon icon="iconfont icon-github"/>GitHub account](https://github.com/tyaga001) to help you make your code reviews more pleasant and valuable.

:::

---

## What is a Code Review?

The term “[<VPIcon icon="fa-brands fa-wikipedia-w"/>code review](https://en.wikipedia.org/wiki/Code_review)” can refer to various activities, from simply reading code over your teammate’s shoulder to a 10-person meeting where you dissect code line by line. I use the term to refer to a formal and written process, but not so heavyweight as a series of in-person code inspection meetings.

In a project where you work on a repository with other developers, after you complete your work, you commit, push, and create a pull request on the VCS, most likely using Git commands. Then, everyone reviews the pull request to determine whether it’s okay to use. If so, they approve it, and that code gets used in the project.

---

## What is the Purpose of a Code Review?

Code Reviews are a tool for *knowledge transfer*. They help make devs more efficient when doing maintenance on a part of the system they didn't write.

When you review a pull request, it’s an opportunity to iron out issues before they become technical debt.

Code reviews can also be a good setting for mentoring junior developers.

Now, let’s discuss what is **not** the purpose of a code review:

- Finding bugs. That's what tests (unit, integration, e2e, api, and so on…)are for.

Nitpicking on style issues - settle for one style and use formatters or AI tools to enforce it. Just keep in mind that there are many things that an AI tool cannot check. Code reviews are an excellent place to ensure the code is sufficiently documented or self-documenting.

Do you want to know how you can check this? Return to the code you wrote 6-12 months ago and try to understand what it was written to do.

If you understand it quickly, that means it's readable, and the code review was done properly and in a helpful manner.

---

## Why is Doing **Code Reviews** Hard?

Despite their importance, many devs don’t like doing code reviews - in part because they can be challenging, especially if you’re not following best practices.

Here are some pain points I’ve observed during my years of participating in code reviews:

- When people talk about code reviews, they focus on the reviewer. But the developer who writes the code is just as crucial to the review as the person who reads it.
- Doing a code review is not an automatic routine for a developer.
- The reviewer may sometimes just do a partial review and add new comments at every pass, even on code in the previous review(s) that remained untouched.
- Sometimes, the code reviewer may not clearly express their expectations.
- Multiple code reviewers can often have diverging opinions, leading to (too) long discussions.
- The developer does not understand the comments from reviewers and requires back-and-forth discussions.
- The developer addresses code review comments differently than agreed upon during the review process.

These pain points often bottleneck our development velocity. But recent advances in AI-assisted code review tools have started addressing these common friction points in our PR workflows.

Let's explore how AI-powered tools, along with some best practices, can address these review challenges and optimize your development workflow.

---

## Can AI Replace Code Reviews?

While AI hasn’t replaced human code reviews, it is a powerful force multiplier in the review process.

Here's how: AI code reviews excel as a preliminary screening tool, catching common issues before human reviewers see the code. This becomes especially valuable in open-source projects where maintainer bandwidth is limited.

I recently started using AI code reviews on a case-by-case basis for my projects.

AI tools improve my existing workflows, reduce failure rates by detecting logic errors early on, and boost productivity. So I’ve added it to my CI/CD pipelines. It doesn't have to be perfect at detecting logic errors, as long as its false positive rate is very low (ideally as close to 0 as possible).

Most importantly, AI reviews respect the golden rule of 'value your reviewer's time' by handling routine checks. This allows human reviewers to focus on architecture, business logic, and complex edge cases.

This approach positions AI as a complementary tool that augments rather than replaces human expertise in the code review process.

---

## What to Focus on During a Code Review

When reviewing code, try to prioritise what matters most using the Code Review Pyramid. This is a framework that helps you focus your attention where it creates the most value.

Think of it like building a house — start with the foundation before worrying about paint colours.

The pyramid has five layers, from most critical (bottom) to least critical (top):

1. **API Semantics**: Core design decisions that affect users
2. **Implementation Semantics**: The code's functionality, security, and performance
3. **Documentation**: Clear explanation of how to use the code
4. **Tests**: Verification that everything works as intended
5. **Code Style**: Formatting and naming conventions

::: info

Source: [The Code Review Pyramid by Gunnar Morling](https://morling.dev/blog/the-code-review-pyramid/)

```component VPCard
{
  "title": "The Code Review Pyramid",
  "desc": "When it comes to code reviews, it’s a common phenomenon that there is much focus and long-winded discussions around mundane aspects like code formatting and style, whereas important aspects (does the code change do what it is supposed to do, is it performant, is it backwards-compatible for existing clients, and many others) tend to get less attention. To raise awareness for the issue and providing some guidance on aspects to focus on, I shared a small visual on Twitter the other day, which I called the ”Code Review Pyramid”.",
  "link": "https://morling.dev/blog/the-code-review-pyramid/",
  "logo": "https://morling.dev/images/gunnar_morling.jpg",
  "background": "rgba(131,184,72,0.2)"
}
```

:::

Remember: if you want to catch issues/bugs, there are more appropriate processes for that. That is why we have automated testing, canary releases, testing environments, and so on.

In my personal opinion, using code reviews as a bug catching tool is somewhat of an anti-pattern where you're compensating for a development process that may be lacking some key steps/processes.

To me, a `code review` is much more about managing technical `debt` and ensuring that quality is produced, while shipping more features.

In doing a code review, you should make sure that:

- The code is readable
- It has appropriate unit tests
- The developer used clear names for everything
- The code is well-designed and isn’t more complex than it needs to be
- Test cases make sense and have comprehensive coverage
- It’s something the team can maintain in the long run
- There are no architectural issues that will block the team
- The code fits the team's idea of quality
- You’re thinking about what you can learn from the PR
- You’re sharing any knowledge the developer might use in their PR
- You’re thinking about how you can empower the dev through your positive feedback
- The PR has a clear changelist description

---

## Code Review Best Practices And Process

There is no general rule in engineering for code reviews, as what you’ll need to focus on depends on many factors. You can and should set up the process according to your company standards and way of working as a team.

Here are some factors you’ll need to think about before setting up a code review process:

- The size and type of company you’re in (for example a startup vs a large corporation)
- The number of developers on your team
- Your budget
- The timeframe you’re working with
- Your and your team’s workloads
- The complexity of the code
- The abilities and skills of the reviewer(s)
- The availability of the reviewer(s)

As an example, at my work we have a very simple rule: **all** **code** **changes must be reviewed by at least one developer** before a merge or a commit to the trunk.

Code reviews need a systematic approach, but maintaining consistency across every PR is challenging. It’s useful to let computers handle repetitive checks (style, formatting) while humans focus on what matters most: architecture and logic. This balanced approach makes reviews both thorough and sustainable.

**Take a look at this example**. It shows how we can optimize our `code review` process by intelligently delegating tasks between humans and automated tools. The diagram below illustrates a typical code style review workflow, comparing manual human review steps against automated tooling.

![Human vs Automated Code Style Review Process - showing why formatting checks should be automated](https://cdn.hashnode.com/res/hashnode/image/upload/v1731490662335/8b0e9e27-c31b-409f-9c9e-fd1a33195d9b.png)

The diagram shows a real problem we all face in code reviews. See the left side? That's we humans doing manual formatting checks: finding weird spaces, fixing indents, writing comments about it... pretty tedious stuff. But check out the right side: that's where tools like `Prettier` just fix these formatting issues automatically.

No meetings, no back-and-forth - just done. That's why I started using `CodeRabbit`, which is a dev tool that caught my attention recently.

---

## What is CodeRabbit?

The CodeRabbit docs describe the tool pretty effectively, so I’ll just leave this here:

::: info

> [**CodeRabbit**](https://coderabbit.ai/) is an AI-powered code reviewer that delivers context-aware feedback on pull requests within minutes, reducing the time and effort needed for manual code reviews. It provides a fresh perspective and catches issues that are often missed, enhancing the overall review quality. - from the CodeRabbit docs

![what is CodeRabbit - home page](https://cdn.hashnode.com/res/hashnode/image/upload/v1731326629130/933c46f2-a24c-4e08-a470-8449e96387aa.png)

:::

### How Does CodeRabbit Help?

Let me walk you through a real example. When you submit a PR, CodeRabbit:

#### 1. Performs a PR summary on the fly

- First, it gives you a quick overview of what changed.
- It also explains the impact in plain English (great for non-tech folks in your team).
- Then it includes a detailed walkthrough of file changes.

![Pull Request Summary](https://cdn.hashnode.com/res/hashnode/image/upload/v1732879970322/c671b932-25b1-474c-8cae-c393cb1706b8.png)

#### 2. Does a “Smart Code Review”

- It drops comments right on the specific lines that need attention.
- It also suggests fixes in diff format that you can apply them with one click.
- And it shows what commits and files it checked (which is helpful for tracking review coverage).

![Smart Code Reviews](https://cdn.hashnode.com/res/hashnode/image/upload/v1732880687958/8d0e1ce5-cb23-4c62-b9ba-823f3a59845e.png)

#### 3. Give you interactive feedback

- You can chat with it right in the PR comments.
- You can ask it questions about specific code changes to get more details.
- And it remembers your team's patterns and preferences which is super helpful for consistency’s sake (which I discussed above).

![chat with coderabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1732880617364/9e246445-1d43-45f1-b4af-62d9f013d76a.png)

#### 4. Extra Helpful Features

- CodeRabbit validates changes against linked GitHub/GitLab issues.
- It creates sequence diagrams to visualize changes.
- And it can perform one-click fixes on applications for simple issues.

![sequence diagrams by coderabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1732880539024/412d6c15-d691-4b65-b335-2e04b04a55e1.png)

![Code reviews done by CodeRabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1731322941721/9e7c5e9a-ac02-458b-9de3-4cf92232786d.png)

I first discovered `CodeRabbit` last month while I was searching for something else on GitHub. I accidentally came across it and I was surprised by how many people are already using it.

![how many projects are already using coderabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1731323088015/12db3391-bad0-45a7-908d-2c34391a7803.png)

I instantly signed up because I was looking for exactly such a solution which could help me and my team out with our reviews.

I read through [<VPIcon icon="fas fa-globe"/>the CodeRabbit docs](https://docs.coderabbit.ai/) and was very impressed.

Getting started using it is pretty much a plug and play process.

In the next section, we’ll go through the quick steps you can follow to enable CodeRabbit using an example repo.

- Sign up at [<VPIcon icon="fas fa-globe"/>coderabbit.ai](http://coderabbit.ai) using your GitHub account.
- Go to Add Your Repository.
- And that's it. CodeRabbit starts reviewing your PRs automatically.

### A GitHub Repo to Test

As an example **GitHub** **repo** to test, we’ll use [<VPIcon icon="fas fa-globe"/>devtoolsacademy](https://devtoolsacademy.com/): my blog on everything about awesome developer tools.

First, visit the [<VPIcon icon="fas fa-globe"/>CodeRabbit login page](https://app.coderabbit.ai/login) and login via GitHub.

![login - coderabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1732880133507/959c0521-eddf-4026-bf33-64b415f4d9b3.png)

Next, add CodeRabbit to some of your public GitHub repositories.

![how-to-add-a-public-repo-to-use-coderabbit](https://cdn.hashnode.com/res/hashnode/image/upload/v1731327118318/7329afd5-af9c-4e54-9aba-6720cd00b8ca.png)

Now, CodeRabbit is fully integrated and ready to do code reviews on your selected repo.

Yes: it’s that simple and fast. And in my opinion, it’s one of the main reasons the tool is so useful.

Here are some sample PRs for you to check out:

- [<VPIcon icon="iconfont icon-github"/>`tyaga001/devtoolsacademy/pull/10`](https://github.com/tyaga001/devtoolsacademy/pull/10)
- [<VPIcon icon="iconfont icon-github"/>`tyaga001/devtoolsacademy/pull/13`](https://github.com/tyaga001/devtoolsacademy/pull/13)
- [<VPIcon icon="iconfont icon-github"/>`sartography/spiff-arena`#1233 (comment)](https://github.com/sartography/spiff-arena/pull/1233#discussion_r1529013218)
- [<VPIcon icon="iconfont icon-github"/>`kmesiab/equilibria`#1 (comment)](https://github.com/kmesiab/equilibria/pull/1#discussion_r1505474270)
- [<VPIcon icon="iconfont icon-github"/>`kamiazya/web-csv-toolbox`#60 (comment)](https://github.com/kamiazya/web-csv-toolbox/pull/60#discussion_r1453463448)
- [<VPIcon icon="iconfont icon-github"/>`openreplay/openreplay`#1858 (comment)](https://github.com/openreplay/openreplay/pull/1858#discussion_r1467629285)
- [<VPIcon icon="iconfont icon-github"/>`ls1intum/Artemis`#8037 (comment)](https://github.com/ls1intum/Artemis/pull/8037#discussion_r1494109998)

::: info Additional Examples

check all the open source examples of code reviews done by [<VPIcon icon="iconfont icon-github"/>CodeRabbit](https://github.com/search?q=coderabbitai&type=pullrequests).

<SiteInfo
  name="Build software better, together"
  desc="GitHub is where people build software. More than 100 million people use GitHub to discover, fork, and contribute to over 420 million projects."
  url="https://github.com/search?q=coderabbitai&type=pullrequests"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/github-octocat-13c86b8b336d.png"/>

:::

---

## Conclusion

Everyone’s code needs reviewing. Just because someone is the most senior person on the team does not mean that their code doesn’t need to be reviewed.

In this article, I talked about code reviews along with some common pain points. I then showed you how you can leverage CodeRabbit to iterate quickly through your code reviews and focus more on business.

### Further reading

In this article I talked about basic intro to CodeRabbit, because that was my use case with my [<VPIcon icon="fas fa-globe"/>blog](https://devtoolsacademy.com/).

For more advanced functionality, check out the official CodeRabbit [<VPIcon icon="fas fa-globe"/>docs](https://docs.coderabbit.ai/) or read their [<VPIcon icon="fas fa-globe"/>blog](https://coderabbit.ai/blog).

### Before I End

I hope you found it helpful learning how to use AI tools for code reviews.

If you like my writing, these are some of my other most recent articles.

- [<VPIcon icon="fas fa-globe"/>**Neon Postgres vs Supabase**](https://devtoolsacademy.com/blog/neon-vs-supabase)
- [<VPIcon icon="fas fa-globe"/>**MongoDB vs. PostgreSQL**](https://devtoolsacademy.com/blog/mongoDB-vs-postgreSQL)
- [<VPIcon icon="fas fa-globe"/>Supabase vs Clerk](https://devtoolsacademy.com/blog/supabase-vs-clerk)
- [How I Built a Video Conferencing App with Stream and Next.js](/freecodecamp.org/how-i-built-a-custom-video-conferencing-app-with-stream-and-nextjs/#heading-next-steps.md)
- [How to Implement Fine-Grained Authorization in Java](/freecodecamp.org/fine-grained-authorization-in-java-and-springboot.md)

Follow me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`theankurtyagi`)](https://x.com/theankurtyagi) to stay updated on my open source projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Perform Code Reviews in Tech - The Painless Way",
  "desc": "Okay, I know you may be skeptical: other guides have promised painless code reviews only to reveal that their solution requires some hyper-specific tech stack or a paid developer tool. I won’t do that to you. This guide provides a straightforward and...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-perform-code-reviews-in-tech-the-painless-way.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
