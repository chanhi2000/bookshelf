---
lang: en-US
title: "Time to Get Hands-On with Rebase"
description: "Article(s) > (3/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (3/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "Time to Get Hands-On with Rebase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/time-to-get-hands-on-with-rebase.html
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
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-time-to-get-hands-on-with-rebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

Start from Paul's branch:

```sh
git checkout paul_branch
```

This is the history:

![Commit history before performing `git rebase`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-206.png)

And now, to the exciting part:

```sh
git rebase john_branch
```

And observe the history:

![The history after rebasing<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-207.png)

::: note <code>gg</code>

`gg` is an [alias for an external tool (<VPIcon icon="iconfont icon-github"/>`mlange-42/git-graph`)](https://github.com/mlange-42/git-graph) I introduced [<VPIcon icon="fa-brands fa-youtube"/>in the video](https://youtu.be/3VFsitGUB3s).

<SiteInfo
  name="mlange-42/git-graph"
  desc="Command line tool to show clear git graphs arranged for your branching model"
  url="https://github.com/mlange-42/git-graph/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/319462847/66d33300-4713-11eb-8217-5c49f8daa732"/>

:::

<VidStack src="youtube/3VFsitGUB3s" />

So whereas with `git merge` you added to the history, with `git rebase` you **rewrite history**. You create **new** commit objects. In addition, the result is a linear history graph - rather than a diverging graph.

![The history after rebasing<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-209.png)

In essence, we "copied" the commits that were on <VPIcon icon="fas fa-code-branch"/>`paul_branch` and introduced after "Commit 4", and "pasted" them on top of <VPIcon icon="fas fa-code-branch"/>`john_branch`.

The command is called "rebase", because it changes the base commit of the branch it's run from. That is, in your case, before running `git rebase`, the base of <VPIcon icon="fas fa-code-branch"/>`paul_branch` was "Commit 4" - as this is where the branch was "born" (from <VPIcon icon="fa-brands fa-code-branch"/>`main`). With `rebase`, you asked Git to give it another base - that is, pretend as if it had been born from "Commit 6".

To do that, Git took what used to be "Commit 7", and "replayed" the changes introduced in this commit onto "Commit 6", and then created a new commit object. This object differs from the original "Commit 7" in three aspects:

1. It has a different timestamp.
2. It has a different parent commit - "Commit 6" rather than "Commit 4".
3. The [**tree object**](/freecodecamp.org/git-internals-objects-branches-create-repo/git-objects-blob-tree-and-commit.md) it is pointing to is different - as the changes were introduced to the tree pointed to by "Commit 6", and not the tree pointed to by "Commit 4".

Notice the last commit here, "Commit 9'". The snapshot it represents (that is, the [**tree**](/freecodecamp.org/git-internals-objects-branches-create-repo/git-objects-blob-tree-and-commit.md) that it points to) is exactly the same tree you would get by merging the two branches. The state of the files in your Git repository would be **the same** as if you used `git merge`. It's only the history that is different, and the commit objects of course.

Now, you can simply use:

```sh
git checkout main
git merge paul_branch
```

Hm.... What would happen if you ran this last command? 🤔 Consider the commit history again, after checking out <VPIcon icon="fa-brands fa-code-branch"/>`main`:

![The history after rebasing and checking out <VPIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-210.png)

What would it mean to merge <VPIcon icon="fa-brands fa-code-branch"/>`main` and <VPIcon icon="fas fa-code-branch"/>`paul_branch`?

Indeed, Git can simply perform a fast-forward merge, as the history is completely linear (if you need a reminder about fast forward merges, check out [this post](https://freecodecamp.org/news/the-definitive-guide-to-git-merge/#timetogethandson)). As a result, <VPIcon icon="fa-brands fa-code-branch"/>`main` and <VPIcon icon="fas fa-code-branch"/>`paul_branch` now point to the same commit:

![The result of a fast-forward merge<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-211.png)
