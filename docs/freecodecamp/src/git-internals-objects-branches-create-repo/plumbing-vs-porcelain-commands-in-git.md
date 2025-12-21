---
lang: en-US
title: "Plumbing vs Porcelain Commands in Git"
description: "Article(s) > (6/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (6/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "Plumbing vs Porcelain Commands in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-internals-objects-branches-create-repo/plumbing-vs-porcelain-commands-in-git.html
date: 2020-12-15
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
  desc="Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how"
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-plumbing-vs-porcelain-commands-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

At this point, it would be helpful to make a distinction between two types of `git` commands: **plumbing** and **porcelain**. The application of the terms oddly comes from toilets (yeah, these — 🚽), traditionally made of porcelain, and the infrastructure of plumbing (pipes and drains).

We can say that the porcelain layer provides a user-friendly interface to the plumbing. Most people only deal with the porcelain. Yet, when things go (terribly) wrong, and someone wants to understand why, they would have to roll-up their sleeves to check the plumbing. (Note: these terms are not mine, they are used very widely in `git`).

`git` uses this terminology as an analogy to separate the low-level commands that users don’t usually need to use directly (“plumbing” commands) from the more user-friendly high level commands (“porcelain” commands).

So far, we have dealt with porcelain commands — `git init`, `git add` or `git commit`. Next, we transition to plumbing commands.
