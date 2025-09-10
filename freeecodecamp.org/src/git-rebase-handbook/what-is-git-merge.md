---
lang: en-US
title: "What is Git Merge?"
description: "Article(s) > (1/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (1/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "What is Git Merge?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/what-is-git-merge.html
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
  "title": "The Git Rebase Handbook - A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Rebase Handbook - A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-what-is-git-merge"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

Under the hood, `git rebase` and `git merge` are very, very different things. Then why do people compare them all the time?

The reason is their usage. When working with Git, we usually work in different branches and introduce changes to those branches.

In [**a previous tutorial**](/freecodecamp.org/the-definitive-guide-to-git-merge/how-gits-3-way-merge-algorithm-works.md), I gave an example where John and Paul (of the Beatles) were co-authoring a new song. They started from the <VPIcon icon="fa-brands fa-code-branch"/>`main` branch, and then each diverged, modified the lyrics and committed their changes.

Then, the two wanted to integrate their changes, which is something that happens very frequently when working with Git.

![A diverging history - <VPIcon icon="fas fa-code-branch"/>`paul_branch` and <VPIcon icon="fas fa-code-branch"/>`john_branch` diverged from <VPIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-197.png)

There are two main ways to integrate changes introduced in different branches in Git, or in other words, different commits and commit histories. These are merge and rebase.

[**In a previous tutorial**](/freecodecamp.org/the-definitive-guide-to-git-merge/README.md), we got to know `git merge` pretty well. We saw that when performing a merge, we create a **merge commit** - where the contents of this commit are a combination of the two branches, and it also has two parents, one in each branch.

So, say you are on the branch <VPIcon icon="fas fa-code-branch"/>`john_branch` (assuming the history depicted in the drawing above), and you run `git merge paul_branch`. You will get to this state - where on <VPIcon icon="fas fa-code-branch"/>`john_branch`, there is a new commit with two parents. The first one will be the commit on <VPIcon icon="fas fa-code-branch"/>`john_branch` branch where `HEAD` was pointing to before performing the merge, in this case - "Commit 6". The second will be the commit pointed to by <VPIcon icon="fas fa-code-branch"/>`paul_branch`, "Commit 9".

![The result of running `git merge paul_branch`: a new Merge Commit with two parents<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-196.png)

Look again at the history graph: you created a **diverged** history. You can actually see where it branched and where it merged again.

So when using `git merge`, you do not rewrite history - but rather, you add a commit to the existing history. And specifically, a commit that creates a diverged history.

::: important How is <code>git rebase</code> Different from <code>git merge</code>?

When using `git rebase`, something different happens. 🥁

Let's start with the big picture: if you are on <VPIcon icon="fas fa-code-branch"/>`paul_branch`, and use `git rebase john_branch`, Git goes to the common ancestor of John's branch and Paul's branch. Then it takes the patches introduced in the commits on Paul's branch, and applies those changes to John's branch.

So here, you use `rebase` to take the changes that were committed on one branch - Paul's branch - and replay them on a different branch, <VPIcon icon="fas fa-code-branch"/>`john_branch`.

![The result of running `git rebase john_branch`: the commits on <VPIcon icon="fas fa-code-branch"/>`paul_branch` were "replayed" on top of <VPIcon icon="fas fa-code-branch"/>`john_branch`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-198.png)

:::

Wait, what does that mean? 🤔

We will now take this bit by bit to make sure you fully understand what's happening under the hood 😎
