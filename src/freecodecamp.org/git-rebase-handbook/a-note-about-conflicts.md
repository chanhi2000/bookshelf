---
lang: en-US
title: "A Note About Conflicts"
description: "Article(s) > (7/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (7/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "A Note About Conflicts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/a-note-about-conflicts.html
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
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-a-note-about-conflicts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

Note that when performing a rebase, you may run into conflicts just as when merging. You may have conflicts because when rebasing, you are trying to apply patches on a different base, perhaps where the patches do not apply.

For example, consider the previous repository again, and specifically, consider the change introduced in "Commit 12", pointed to by <FontIcon icon="fa-brands fa-code-branch"/>`main`:

```sh
git show main
```

![The patch introduced in "Commit 12"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-289.png)

I already covered the format of `git diff` in detail in [**a previous post**](/freecodecamp.org/git-diff-and-patch.md), but as a quick reminder, this commit instructs Git to add a line after the two lines of context:

And before these three lines of context:

```py
def new_feature():
  print('new feature')
```

Say you are trying to rebase "Commit 12" onto another commit. If, for some reason, these context lines don't exist as they do in the patch on the commit you are rebasing *onto*, then you will have a conflict. To learn more about conflicts and how to resolve them, see [**this guide**](/freecodecamp.org/the-definitive-guide-to-git-merge/README.md).
