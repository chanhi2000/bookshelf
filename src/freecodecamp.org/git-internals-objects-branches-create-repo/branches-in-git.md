---
lang: en-US
title: "Branches in Git"
description: "Article(s) > (2/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (2/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "Branches in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-internals-objects-branches-create-repo/branches-in-git.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-branches-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

**A branch is just a named reference to a commit**.

We could always reference a **commit** by its SHA-1 hash, but humans usually prefer other forms to name objects. A **branch** is one way to reference a **commit**, but it’s really just that.

In most repositories, the main line of development is done in a branch called <FontIcon icon="fas fa-code-branch"/>`master`. This is just a name, and it’s created when we use `git init`, making it is widely used. However, it’s by no means special, and we could use any other name we’d like.

Typically, the branch points to the latest **commit** in the line of development we are currently working on.

![A branch is just a named reference to a commit](https://freecodecamp.org/news/content/images/2020/12/image-42.png)

To create another branch, we usually use the `git branch` command. By doing that, we actually create another pointer. So if we create a branch called <FontIcon icon="fas fa-code-branch"/>`test`, by using `git branch test`, we are actually creating another pointer that points to the same **commit** as the branch we are currently on.

![Using `git branch` creates another pointer](https://freecodecamp.org/news/content/images/2020/12/image-43.png)

How does `git` know what branch we’re currently on? It keeps a special pointer called `HEAD`. Usually, `HEAD` points to a branch, which in turns points to a **commit**. In some cases, `HEAD` can also point to a **commit** directly, but we won’t focus on that.

![HEAD points to the branch we are currently on.](https://freecodecamp.org/news/content/images/2020/12/image-44.png)

To switch the active branch to be <FontIcon icon="fas fa-code-branch"/>`test`, we can use the command `git checkout test`. Now we can already guess what this command actually does — it just changes `HEAD` to point to <FontIcon icon="fas fa-code-branch"/>`test`.

![`git checkout test` changes where `HEAD` points](https://freecodecamp.org/news/content/images/2020/12/image-45.png)

We could also use `git checkout -b test` before creating the <FontIcon icon="fas fa-code-branch"/>`test` branch, which is the equivalent of running `git branch test` to create the branch, and then `git checkout test` to move `HEAD` to point to the new branch.

What happens if we make some changes and create a new **commit** using `git commit`? Which branch will the new **commit** be added to?

The answer is the <FontIcon icon="fas fa-code-branch"/>`test` branch, as this is the active branch (since `HEAD` points to it). Afterwards, the <FontIcon icon="fas fa-code-branch"/>`test` pointer will move to the newly added **commit**. Note that `HEAD` still points to <FontIcon icon="fas fa-code-branch"/>`test`.

![Every time we use `git commit`, the branch pointer moves to the newly created commit.](https://freecodecamp.org/news/content/images/2020/12/image-46.png)

So if we go back to master by `git checkout master`, we move `HEAD` to point to <FontIcon icon="fas fa-code-branch"/>`master` again.

![](https://freecodecamp.org/news/content/images/2020/12/image-47.png)

Now, if we create another **commit**, it will be added to the <FontIcon icon="fas fa-code-branch"/>`master` branch (and its parent would be **commit B2424**).

![](https://freecodecamp.org/news/content/images/2020/12/image-48.png)
