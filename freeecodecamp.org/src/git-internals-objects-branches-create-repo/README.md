---
lang: en-US
title: "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
description: "Article(s) > A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-internals-objects-branches-create-repo/
prev: /programming/git/articles/README.md
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
  name="A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
  desc="Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how"
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Many of us use `git` on a daily basis. But how many of us know what goes on under the hood?

For example, what happens when we use `git commit`? What is stored between commits? Is it just a diff between the current and previous commit? If so, how is the diff encoded? Or is an entire snapshot of the repo stored each time? What really happens when we use `git init`?

Many people who use `git` don’t know the answers to the questions above. But does it really matter?

First, as professionals, we should strive to understand the tools we use, especially if we use them all the time — like `git`.

But even more acutely, I've found that understanding how git actually works is useful in many scenarios — whether it’s resolving merge conflicts, looking to conduct an interesting rebase, or even just when something goes slightly wrong.

You’ll benefit from this post if you’re experienced enough with `git` to feel comfortable with commands such as `git pull` ,`git push` ,`git add` or `git commit`.

Still, we will start with an overview to make sure we are on the same page regarding the mechanisms of `git`, and specifically, the terms used throughout this post.

I also uploaded a YouTube series covering this post — you are welcome to watch it [<VPIcon icon="fa-brands fa-youtube"/>here](https://youtube.com/playlist?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7).

<SiteInfo
  name="Git Internals"
  desc="Share your videos with friends, family, and the world"
  url="http://youtube.com/playlist?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7/"
  logo="https://youtube.com/s/desktop/26a583e4/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/fWMKue-WBok/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAJFjvSSg0N5cgiDN4FcpqAUzhBOw&days_since_epoch=20092"/>

## What to expect from this tutorial

We will get a rare understanding of what goes on under the hood of what we do almost daily.

We will start by covering objects — **blobs, trees,** and **commits.** We will then briefly discuss **branches** and how they are implemented. We will dive into the **working directory, staging area** and **repository**.

And we will make sure we understand how these terms relate to the `git` commands we know and use to create a new repository.

Next, will create a repository from scratch — without using `git init`, `git add`, or `git commit`. This will allow us to **deepen our understanding of what is happening under the hood** when we work with `git`.

We will also create new branches, switch branches, and create additional commits — all without using `git branch` or `git checkout`.

By the end of this post, **you will feel like you _understand_** `**git**`. Are you up for it? 😎

```component VPCard
{
  "title": "Git Objects — blob, tree and commit",
  "desc": "(1/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/git-objects-blob-tree-and-commit.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Branches in Git",
  "desc": "(2/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/branches-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Record Changes in Git",
  "desc": "(3/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-record-changes-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create a Repo — The Conventional Way",
  "desc": "(4/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-create-a-repo-the-conventional-way.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Time to get hard core

So far we've covered some Git fundamentals, and now we’re ready to really *Git going.*

In order to deeply understand how `git` works, we will create a **repository**, but this time — we'll build it from scratch.

We won’t use `git init`, `git add` or `git commit` which will enable us to get a better hands-on understanding of the process.

```component VPCard
{
  "title": "How to Set Up .git",
  "desc": "(5/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-set-up-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Plumbing vs Porcelain Commands in Git",
  "desc": "(6/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/plumbing-vs-porcelain-commands-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create Objects in Git",
  "desc": "(7/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-create-objects-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Work with Branches in Git — Under the Hood",
  "desc": "(8/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-work-with-branches-in-git-under-the-hood.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Summary

This post introduced you to the internals of `git`. We started by covering the basic objects — **blobs**, **trees,** and **commits**.

We learned that a **blob** holds the contents of a file. A **tree** is a directory-listing, containing **blobs** and/or sub-**trees**. A **commit** is a snapshot of our working directory, with some meta-data such as the time or the commit message.

We then discussed **branches** and explained that they are nothing but a named reference to a **commit**.

We went on to describe the **working directory**, a directory that has a repository associated with it, the **staging area (index)** which holds the **tree** for the next **commit**, and the **repository**, which is a collection of **commits**.

We clarified how these terms relate to `git` commands we know by creating a new repository and committing a file using the well-known `git init`, `git add`, and `git commit`.

Then, we fearlessly deep-dived into `git`. We stopped using porcelain commands and switched to plumbing commands.

By using `echo` and low-level commands such as `git hash-object`, we were able to create a **blob**, add it to the **index**, create a **tree** of the **index**, and create a **commit** object pointing to that **tree**.

We were also able to create and switch between **branches**. Kudos to those of you who tried this on their own!👏

Hopefully, after following this post you feel you’ve deepened your understanding of what is happening under the hood when working with `git`.

**Thanks for reading!** If you enjoyed this article, you can read more on this topic on the [<VPIcon icon="fas fa-globe"/>swimm.io blog](http://swimm.io/).

::: info Omer Rosenbaum

- [<VPIcon icon="fas fa-globe"/>Swimm](https://swimm.io)’s Chief Technology Officer
- Cyber training expert and Founder of Checkpoint Security Academy.
- Author of [<VPIcon icon="fas fa-globe"/>Computer Networks (in Hebrew)](https://data.cyber.org.il/networks/networks.pdf)
- [Youtube (<VPIcon icon="fa-brands fa-youtube"/>`@BriefVid`)](https://youtube.com/BriefVid)
- [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`omer-rosenbaum-034a08b9`)](https://linkedin.com/in/omer-rosenbaum-034a08b9)

:::

---

## Additional References

A lot has been written and said about `git`. Specifically, I found these references to be useful:

<SiteInfo
  name="Git Internals"
  desc="Share your videos with friends, family, and the world"
  url="http://youtube.com/playlist?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7/"
  logo="https://youtube.com/s/desktop/26a583e4/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/fWMKue-WBok/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAJFjvSSg0N5cgiDN4FcpqAUzhBOw&days_since_epoch=20092"/>

<VidStack src="youtube/MYP56QJpDr4" />

<SiteInfo
  name="Git from the Bottom Up"
  desc="Welcome to the world of Git. I hope this document will help to advance your understanding of this powerful content tracking system, and reveal a bit of the simplicity underlying it — however dizzying its array of options may seem from the outside."
  url="https://jwiegley.github.io/git-from-the-bottom-up/"
  logo=""
  preview="https://jwiegley.github.io/git-from-the-bottom-up/images/lifecycle.png"/>

```component VPCard
{
  "title": "Git - Git Objects",
  "desc": "Git is a content-addressable filesystem. Great. What does that mean? It means that at the core of Git is a simple key-value data store. What this means is that you can insert any kind of content into a Git repository, for which Git will hand you back a unique key you can use later to retrieve that content.",
  "link": "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects/",
  "logo": "https://git-scm.com/favicon.ico",
  "background": "rgba(227,90,56,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-internals-objects-branches-create-repo/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
