---
lang: en-US
title: "Git workflow strategies for multiple teams"
description: "Article(s) > Git workflow strategies for multiple teams"
icon: iconfont icon-git
category:
  - Git
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Git workflow strategies for multiple teams"
    - property: og:description
      content: "Git workflow strategies for multiple teams"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository.html
prev: /programming/git/articles/README.md
date: 2022-04-28
isOriginal: false
author:
  - name: Fernando Doglio
    url : https://blog.logrocket.com/author/fernandodoglio/
cover: /assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Git workflow strategies for multiple teams"
  desc="Get practical Git workflow strategies designed to enable multiple teams to successfully work in a single repository."
  url="https://blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/banner.png"/>

::: note Editor’s note

This article was updated on 12 May 2022 to include information on using Git workflows to handle hotfixes.

:::

![Git Workflow](/assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/banner.png)

Stop me if you’ve lived it before: you’re either a part of or are currently [managing a big team of developers](https://blog.logrocket.com/product-management/what-does-a-product-manager-do-role-responsibilities/) who don’t all work using the same tech stack. Why? Well, your team is probably comprised of backend developers working on Java or Node.js, frontend devs working on Angular, React, or Vue.js, and you may even have a couple of data scientists working in Python.
<!-- TODO: /blog.logrocket.com/what-does-a-product-manager-do-role-responsibilities.md -->


On top of that, everyone said they know how to use Git, but in reality, they don’t. They usually deal with version control using their IDE of choice, clicking options without knowing exactly what they do.

Normally, reason would dictate that these teams handle their source code separately, which means using different repositories for each codebase. That would also give them the ability to have individual development flows, independent of each other.

That being said, often luck is not on your side, and you’re left with a single repository and three different teams, trying to learn how to work together. In this particular article, I’m going to tackle this scenario, but solely from the source control point of view. In other words, how to create a useful development flow that allows everyone to work together without messing up each other’s code.

---

## Traditional branching model

In 2010, Vincent Driessen published a [<VPIcon icon="fas fa-globe"/>very interesting article](https://nvie.com/posts/a-successful-git-branching-model/), describing an approach to handling version control with Git in development teams.

Essentially, what that article proposed (without all of the bells and whistles, if you want all the details, go directly to the article) was that you’d:

- Create one branch for each feature you need to work on. These branches will come from a base development branch, where all the dev code resides
- Each developer will work on their respective feature branches until they are considered ready
- Once ready, they’ll be merged back to their source
- When all features are ready, you’ll create a release branch from development, where only bug fixes will be accepted to ensure no half-finished features are deployed

That’s the flow, in a nutshell. There are a few other considerations when it comes to tagging and hotfixes, but I’ll let you read the original article for that.

So, just like many others, I took that approach to heart, and it works very well (in my humble opinion) with homogenous teams when they all work as one on the same code.

The problem comes, when that is no longer the reality.

And don’t get me wrong, the model still works if your team is proficient with the tool. If they know what it means to pull versus fetch from a repository, or how to deal with merge conflicts correctly, then, by all means, use this model.

Sadly, this is not the case all of the time, too many developers tend to gloss over the documentation of Git when they need to use it. This causes either minor problems when the teams are small enough or it forces them to elect teammates to take on the responsibility of doing all merges.

Maybe you’ve been there as well — you have some devs on your team that know the tool very well and understand what happens when they use it, so they tend to be the ones that handle the most complicated tasks.

For example, you might have these devs creating the feature branches at the [start of the sprint](https://blog.logrocket.com/product-management/what-is-sprint-planning-guide-meeting-agenda-cheat-sheet/) and then taking care of the merges once the others deem the code ready.
<!-- TODO: /blog.logrocket.com/what-is-sprint-planning-guide-meeting-agenda-cheat-sheet.md -->

This might be a setup that works in some cases, but no doubt, it’ll add a lot of responsibility to those specific individuals and it will definitely take time away from their development.

So, what’s the worst that can happen if we don’t try to adjust our Git flow?

---

## Common Git workflow problems to avoid

Let me share a few examples I’ve lived through that led me to come up with a new Git workflow approach.

### Chaining branches

The flow dictates that every new branch needs to come from the main development branch, this is to avoid bringing incomplete code with us from other half-finished branches. The problem here is developers who are not paying attention when creating their branches and using another, maybe use an older branch as a source by mistake.

Now they’re trying to merge their complete code into development and, understandably, are having a lot of merge conflicts. This gets even worse if the developer just accepts their version of the code to resolve it since, in their mind, their work is the latest.

Once this is all said and done, they’ve uploaded their code, yes, but in the process, they also overwrote the newest version of the other team’s code with older, unfinished versions of it.

Let’s look at it using a very simple diagram:

![Git Workflow Diagram Showing Chaining Branches](/assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/1*olclSesYiEh1Ew80hlBoRQ.png)

In the end, the code that gets merged from branch F2 had the unfinished code from F1. And because all teams share the same repository, F1 could have been a frontend-specific branch and the F2 could be for the backend team. Can you imagine the chaos that comes from having someone from backend messing up the code for the frontend? It’s not pretty, I can tell you.

### Premature merges

Similar to the previous problem, if you merge into development your unfinished feature branch just to see how that would work, or (even worse) to make sure there are no conflicts, you’re essentially poisoning the main branch with your unfinished code.

The next developer that comes and creates a brand new branch from the base one, like they’re supposed to, will be carrying your code. And when they decide to merge it back, assuming you’ve already finished your code and merged it before them, they’ll be having to solve merge conflicts for your code—and not theirs! **#WTF**

Check out the next flow diagram showing this exact case:

![Git Workflow Diagram Showing Premature Merges](/assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/1*dBhtQJ9jUYf-WFPe6_PZjQ.png)

In the end, the results are the same as before, you’re affecting other people’s work without even realizing it. In fact, these problems can remain unseen until they hit production, so you need to be extra careful with the way you handle code.

There are other ways to screw up your coworkers’ code, but they are somewhat related to these two examples, and as you are probably guessing by now, the actual challenge is not with the flow itself but rather with the team.

The ultimate fix for this is training the developers involved so they don’t keep making the same mistakes, but if you can’t, or they won’t learn (after all, to err is human) the other option that you have is to adjust your flow in a way you can minimize the damage done.

---

## New Git workflow approach

What I tried to achieve with this flow was to narrow down the area of effect a mistake can have. By compartmentalizing the code into very segregated branches, if someone forgets something, or simply doesn’t want to play by the rules, they’ll only affect their immediate teammates and not the rest of the teams.

Problems are impossible to avoid, the key here is to not let them spread into other teams, because then, fixing them becomes a project-wide task, while if it’s just a frontend or backend issue, that team can take care of it on their own.

Let’s now look at how this flow would look for a two-team composition; you can easily extrapolate to any number of sub-teams inside your project:

![Git Workflow Diagram Showing New Approach](/assets/image/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository/1*itpxDlI13ocyw5n1dRkAWQ.png)

That’s a lot of lines, I know, but bear with me for a second.

The flow tries to show how two teams (T1 and T2) would work within a sprint’s worth of time, in two different features (F1 and F2).

Just so everything is clear, here are the details:

- Dotted arrows are merges that happen automatically
- T1Dev and T2Dev are development branches for each team individually. The code within them should not mix — that’s the whole point. This is like mixing frontend code and data science code (you just don’t do it)
- T1Stable and T2Stable are copies of the corresponding T1Dev and T2Dev but they only contain code that is stable. This is ensured because merges into these branches happen only when their features are closed (meaning the QA team has approved them)
- At the start of each sprint, a tag is created for each team from their corresponding stable branches
- New feature branches are created from the tag of the current sprint
- Whatever gets merged into the base development branch, is tested by the developer. If it is working as expected, a merge command is issued so the code is merged in the QA branch (and subsequently deployed into that environment for that team to test)
- At the [end of the sprint](https://blog.logrocket.com/product-management/what-is-a-sprint-retrospective-agile/), the stable code gets deployed into production (by merging it into the PROD branch)
<!-- TODO: /blog.logrocket.com/what-is-a-sprint-retrospective-agile.md -->

I know that sounds like a lot and might look like too much to handle, but it helps prevent a lot of disasters.

Let me explain.

Tags make sure all of your branches created within a sprint will contain the same origin code. This is very important because if you don’t, you could potentially create a new branch one week into the sprint with the content of any partial test any other teammates of yours could have merged into your team’s development branch. This basically prevents you from unwillingly promoting unfinished code from others while merging yours.

Stable branches help you in the process of promoting code into production (or possibly a step before that, UAT). You see, in an ideal world, you’d just promote your QA branch into the next environment. But in reality, there can always be carryover, either due to unfinished features, or bugged ones.

Whatever the case may be, those pieces of code are not good enough to get out of QA and into production, so when setting up the next deployment, you’ll need to hand-pick your branches, only those which got approved. This way, you already have a branch for each team that is already pre-approved, so all you have to do is merge these branches into production and you’re ready.

Individual development branches (T1Dev and T2Dev in the example above) help isolate the code. You see, merging code into these branches needs to be done by the developers themselves and, as we discussed at the start of this article, you can’t always trust in their ability to do so correctly. By having individual development branches, you make sure that if they make any mistakes, they will only affect their team and not the entire project.

Depending on the size of the features, you might need to create several individual branches from your feature branch. You might structure your local development workflow however you see fit, just remember one thing: anything you do needs to come from and go into the feature branch, that’s it.

---

## Hotfix workflow

When you’re in a situation where there is an urgent bug fix, the best course of action is to create a hotfix branch. This branch is usually created from the master branch or a stable release branch. When the application is patched it will be merged back into the master or main branch, which represents the linear release timeline of the application.

Here’s the thing with hotfixes, while active development ceases after the release date, the production branch is still being updated by bug fixes.

Here are some tips to keep in mind when setting up a Hotfix workflow:

- A hotfix branch is created from the main or master branch
- Only commits that directly address the bug in the application should be allowed on the hotfix branch
- Other feature enhancements and minor changes should not be part of the commit
- The hotfix branch should be merged with the development branch and then tested by QA
- Once QA signs off the build, it can be merged into the main branch and then pushed to the production environment
- As an alternative option, the commit can be cherry picked into the main branch and development branch.

A hotfix branch allows a team to continue working on the development or feature branch, while another team is busy fixing the bug. If a developer tries to merge their feature branch to development and there are merge conflicts, there’s a small chance that they might accept their own changes and accidentally revert the bug fix. Therefore, all feature branches should be periodically updated with the development branch to ensure that the latest code gets shipped back to the development branch.

---

## Additional Git workflow recommendations

Here are a few more recommendations outside of the flow. Although the flow by itself will help limit the area of effect of any unintentional mistake your team or teammates can make, there are other recommendations that go hand-in-hand with it and can help prevent them even more.

### Document the flow

Development flows need to be documented, especially complex ones. Everyone needs to be able to understand exactly what needs to happen when, and more importantly how to do it.

In other words, don’t be afraid to write foolproof documents, that lead the developers by the hand. It might sound like a lot, but you’ll write it once and use it often, especially at the start of your project and with every new dev joining it afterward.

Having step-by-step descriptions helps them to avoid guessing how to perform pulls or merges, and gives them a standardized way of handling those tasks, that way if there is any doubt, anyone will be able to answer it.

### Discuss the flow

Another form of documentation is face-to-face Q&As when possible, or at least over hangouts or any other type of live gathering of members, where everyone can voice their doubts.

Sometimes those doubts will highlight flaws in your plan so, on the flip side, be open to changes.  
Just like they need to be open to following your lead (if you’re the one crafting the flow), you need to be open to possible overlooks on your part, or even improvements you’ve missed. Be aware these things can happen, and try to review the plan with the members of your team that are more versed in Git before releasing it to everyone. If they’re OK with it, there’s a very good chance, everyone else will be too.

### Don’t be afraid to enforce some standards

Again, sometimes problems come from freedom of action. If the developers working with Git don’t really understand how it works but try to compensate for that by using external tools, they might end up causing more trouble than they would without the tools.

In an effort to avoid this, feel free to enforce the Git client they need to use, the environment they need to work on, the folder structure, or whatever you feel might simplify their tasks in regards to handling source control. I [**wrote an article**](/blog.logrocket.com/standards-and-why-you-need-them.md) on the kind of standards you’d benefit from implementing, in case you’re interested in knowing more about this subject.

One of my go-tos here is enforcing the use of CLI client that comes with inbuilt Git, and then list, in the step-by-step documentation every command they need to enter. This way, the task becomes a no-brainer for everyone (which is the ideal scenario, having your devs worry about lines of codes, not lines of Git).

---

## Final words

That’s it for this article; thanks for reading up to this point, and remember:

- Not everyone knows enough about Git to be left alone with it
- Not everyone will admit to that
- Standard Git flows aren’t always the right choice for your team
- You should aim to have a flow that minimizes collateral damage when problems happen (and they will)
- You should also aim to train your team in the usage of Git. It might not look like it at first, but it’s an investment that will save you from missing delivery dates due to incorrectly done merges
- Try to provide as much documentation on the process as you can, and be open to it being a live document, ever growing and ever changing

Thanks again for reading. If you’d like, please leave a comment with similar stories on what kind of problems have you encountered in the past due to the misuse of Git, or different flows you used to avoid them.

Until the next one!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Git workflow strategies for multiple teams",
  "desc": "Get practical Git workflow strategies designed to enable multiple teams to successfully work in a single repository.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/git-workflow-strategies-multiple-teams-single-repository.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
