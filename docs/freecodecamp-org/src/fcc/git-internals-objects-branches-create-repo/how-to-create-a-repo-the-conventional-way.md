---
lang: en-US
title: "How to Create a Repo — The Conventional Way"
description: "Article(s) > (4/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (4/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "How to Create a Repo — The Conventional Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-internals-objects-branches-create-repo/how-to-create-a-repo-the-conventional-way.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-how-to-create-a-repo-the-conventional-way"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Let’s make sure that we understand how the terms we’ve introduced relate to the process of creating a **repository**. This is just a quick high-level view, before we dive much deeper into this process.

Note — most posts with shell commands show UNIX commands. I will provide commands for both Windows and UNIX, with screenshots from Windows, for the sake of variance. When the commands are exactly the same, I will provide them only once.

We will initialize a new **repository** using `git init repo_1`, and then change our directory to that of the repository using `cd repo_1`. By using `tree /f .git` we can see that running `git init` resulted in quite a few sub-directories inside `.git`. (The flag `/f` includes files in `tree`’s output).

![Image](https://freecodecamp.org/news/content/images/2020/12/image-51.png)

Let's create a file inside the `repo_1` directory:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-52.png)

On a Linux system:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-53.png)

This file is within our **working directory**. Yet, since we haven’t added it to the **staging area**, it is currently **untracked**. Let's verify using `git status`:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-54.png) *The new file is untracked as we haven’t added it to the staging area, and it wasn’t included in a previous commit*

We can now add this file to the **staging area** by using `git add new_file.txt`. We can verify that it has been staged by running `git status`:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-55.png) *Adding the new file to the staging area*

We can now create a **commit** using `git commit`:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-56.png)

Has something changed within `.git` directory? Let’s run `tree /f .git` to check:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-57.png) *A lot of things have changed within `.git`*

Apparently, quite a lot has changed. It's time to dive deeper into the structure of `.git` and understand what is going on under the hood when we run `git init`, `git add` or `git commit`.
