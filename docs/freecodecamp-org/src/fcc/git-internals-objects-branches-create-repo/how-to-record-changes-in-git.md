---
lang: en-US
title: "How to Record Changes in Git"
description: "Article(s) > (3/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (3/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "How to Record Changes in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-internals-objects-branches-create-repo/how-to-record-changes-in-git.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-how-to-record-changes-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Usually, when we work on our source code we work from a **working dir**. A **working dir(ectrory)** (or **working tree**) is any directory on our file system which has a **repository** associated with it. It contains the folders and files of our project, and also a directory called `.git` that we will talk more about later.

After we make some changes, we want to record them in our **repository**. A **repository** (in short: **repo**) is a collection of **commits**, each of which is an archive of what the project’s **working tree** looked like at a past date, whether on our machine or someone else’s.

![A **repository** also includes things other than our code files, such as `HEAD`, branches, and so on.](https://freecodecamp.org/news/content/images/2020/12/image-49.png)

Unlike other, similar tools you may have used, `git` does not commit changes from the **working tree** directly into the **repository**. Instead, changes are first registered in something called the **index**, or the **staging area**.

Both of these terms refer to the same thing, and they are used often in `git`’s documentation. We will use these terms interchangeably throughout this post.

When we `checkout` a branch, `git` populates the **index** with all the file contents that were last checked out into our **working directory** and what they looked like when they were originally checked out. When we use `git commit`, the **commit** is created based on the state of the **index**.

The use of the **index** allows us to carefully prepare each **commit**. For example, we may have two files with changes since our last **commit** in our **working dir**. We may only add one of them to the **index** (using `git add`), and then use `git commit` to record this change only.

![](https://freecodecamp.org/news/content/images/2020/12/image-50.png)

Files in our **working directory** can be in one of two states: **tracked** or **untracked**.

**Tracked files** are files that `git` knows about. They either were in the last snapshot (**commit**), or they are **staged** now (that is, they are in the **staging area**).

**Untracked files** are everything else — any files in our **working directory** that were not in our last snapshot (**commit**) and are not in our **staging area**.
