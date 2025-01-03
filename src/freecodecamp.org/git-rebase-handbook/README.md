---
lang: en-US
title: "The Git Rebase Handbook – A Definitive Guide to Rebasing"
description: "Article(s) > The Git Rebase Handbook – A Definitive Guide to Rebasing"
icon: iconfont icon-git
category:
  - Git
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Git Rebase Handbook – A Definitive Guide to Rebasing"
    - property: og:description
      content: "The Git Rebase Handbook – A Definitive Guide to Rebasing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/
prev: /programming/git/articles/README.md
date: 2023-07-03
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png
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
  name="The Git Rebase Handbook – A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

One of the most powerful tools a developer can have in their toolbox is `git rebase`. Yet it is notorious for being complex and misunderstood.

The truth is, if you understand what it *actually* does, `git rebase` is a very elegant, and straightforward tool to achieve so many different things in Git.

In previous posts, you understood [**what Git diffs are**](/freecodecamp.org/git-diff-and-patch.md), [**what a merge is**](/freecodecamp.org/the-definitive-guide-to-git-merge/what-is-a-merge-in-git.md), and [**how Git resolves merge conflicts**](/freecodecamp.org/the-definitive-guide-to-git-merge/how-to-resolve-merge-conflicts.md). In this post, you will understand what Git rebase is, why it's different from merge, and how to rebase with confidence 💪🏻

::: note Notes before we start

1. I also created a video covering the contents of this post. If you wish to watch alongside reading, you can find it [<FontIcon icon="fa-brands fa-youtube"/>here](https://youtu.be/3VFsitGUB3s).
2. If you want to play around with the repository I used and try out the commands for yourself, you can get the repo [here (<FontIcon icon="iconfont icon-github"/>`Omerr/rebase_playground`)](https://github.com/Omerr/rebase_playground).
3. I am working on a book about Git! Are you interested in reading the initial versions and providing feedback? Send me an [<FontIcon icon="fas fa-envelope"/>email](mailto://gitting.things@gmail.com)

:::

```component VPCard
{
  "title": "What is Git Merge?",
  "desc": "(1/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/what-is-git-merge.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "cherry-pick as a Basis for Rebase",
  "desc": "(2/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/cherry-pick-as-a-basis-for-rebase.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Time to Get Hands-On with Rebase",
  "desc": "(3/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/time-to-get-hands-on-with-rebase.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Advanced Rebasing in Git",
  "desc": "(4/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/advanced-rebasing-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to rebase on a single branch",
  "desc": "(5/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/how-to-rebase-on-a-single-branch.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "More Rebase Use Cases + More Practice",
  "desc": "(6/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/more-rebase-use-cases-more-practice.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "A Note About Conflicts",
  "desc": "(7/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/a-note-about-conflicts.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Zooming Out for the Big Picture",
  "desc": "(8/8) The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "link": "/freecodecamp.org/git-rebase-handbook/zooming-out-for-the-big-picture.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Recap

In this tutorial, you learned about `git rebase`, a super-powerful tool to rewrite history in Git. You considered a few use cases where `git rebase` can be helpful, and how to use it with one, two, or three parameters, with and without the `--onto` switch.

I hope I was able to convince you that `git rebase` is powerful – but also that it is quite simple once you get the gist. It is a tool to "copy-paste" commits (or, more accurately, patches). And it's a useful tool to have under your belt.

::: info Omer Rosenbaum

- [<FontIcon icon="fas fa-globe"/>Swimm](https://swimm.io)’s Chief Technology Officer
- Cyber training expert and Founder of Checkpoint Security Academy.
- Author of [<FontIcon icon="fas fa-globe"/>Computer Networks (in Hebrew)](https://data.cyber.org.il/networks/networks.pdf)
- [Youtube (<FontIcon icon="fa-brands fa-youtube"/>`@BriefVid`)](https://youtube.com/BriefVid)
- [Linkedin (<FontIcon icon="fa-brands fa-linkedin"/>`omer-rosenbaum-034a08b9`)](https://linkedin.com/in/omer-rosenbaum-034a08b9)

<SiteInfo
  name="Swimm: AI Code Documentation And Knowledge Sharing"
  desc="Swimm helps enterprise software organizations document and understand big, complex, and legacy codebases."
  url="https://swimm.io/"
  logo="https://swimm.io/wp-content/uploads/2023/03/cropped-favicon-192x192.png"
  preview="https://swimm.io/wp-content/uploads/2024/01/HP-featured.png"/>

<PDF url="https://data.cyber.org.il/networks/networks.pdf" />

:::

### Additional Resources

<SiteInfo
  name="Git Internals"
  desc="Share your videos with friends, family, and the world"
  url="http://youtube.com/playlist?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7/"
  logo="https://youtube.com/s/desktop/b5305900/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/fWMKue-WBok/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAJFjvSSg0N5cgiDN4FcpqAUzhBOw&days_since_epoch=20097"/>

```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

<SiteInfo
  name="Git UNDO — how to rewrite Git history with confidence"
  desc="As a developer, your work with Git all the time."
  url="https://medium.com/@Omer_Rosenbaum/git-undo-how-to-rewrite-git-history-with-confidence-d4452e2969c2/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:330/0*OopxPbiQh6rpTOi_.png"/>

<SiteInfo
  name="Git - Rebasing"
  desc="In Git, there are two main ways to integrate changes from one branch into another: the merge and the rebase. In this section you’ll learn what rebasing is, how to do it, why it’s a pretty amazing tool, and in what cases you won’t want to use it."
  url="https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
  logo="http://git-scm.com/favicon.ico"
  preview="https://git-scm.com/book/en/v2/images/basic-rebase-1.png"/>

<SiteInfo
  name="Branching and the power of rebase | Git from the Bottom Up"
  desc="One of Git’s most capable commands for manipulating commits is the innocently-named rebase command. Basically, every branch you work from has one or more “base commits”: the commits that branch was born from. Take the following typical scenario, for example..."
  url="https://jwiegley.github.io/git-from-the-bottom-up/1-Repository/7-branching-and-the-power-of-rebase.html"
  logo=""
  preview="https://jwiegley.github.io/git-from-the-bottom-up/images/branching.png"/>

<SiteInfo
  name="Interactive rebasing | Git from the Bottom Up"
  desc="When rebase was run above, it automatically rewrote all the commits from W to Z in order to rebase the Z branch onto the D commit (i.e., the head commit of the D branch). You can, however, take complete control over how this rewriting is done. If you supply..."
  url="https://jwiegley.github.io/git-from-the-bottom-up/1-Repository/8-interactive-rebasing.html"
  logo=""
  preview="https://jwiegley.github.io/git-from-the-bottom-up/images/branching.png"/>

<SiteInfo
  name="Git rebase --onto an overview"
  desc="Removing commits from a current branch or changing parent branch."
  url="https://womanonrails.com/git-rebase-onto/"
  logo="https://womanonrails.com/favicon.png"
  preview="https://womanonrails.com/images/git-rebase-onto/git-rebase-onto.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
