---
lang: en-US
title: "How to Set Up .git"
description: "Article(s) > (5/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (5/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "How to Set Up .git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-internals-objects-branches-create-repo/how-to-set-up-git.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-how-to-set-up-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Let’s create a new directory, and run `git status` within it:

![](https://freecodecamp.org/news/content/images/2020/12/image-106.png)

Alright, so `git` seems unhappy as we don’t have a <VPIcon icon="fas fa-folder-open"/>`.git` folder. The natural thing to do would be to simply create that directory:

![](https://freecodecamp.org/news/content/images/2020/12/image-107.png)

Apparently, creating a <VPIcon icon="fas fa-folder-open"/>`.git` directory is just not enough. We need to add some content to that directory.

**A** **git repository has two** main **components**:

1. A collection of objects — **blobs**, **trees,** and **commits**.
2. A system of naming those objects — called **references**.

A **repository** may also contain other things, such as git hooks, but at the very least — it must include objects and references.

Let’s create a directory for the objects at <VPIcon icon="fas fa-folder-open"/>`.git\objects` and a directory for the references (in short: **refs**) at <VPIcon icon="fas fa-folder-open"/>`.git\refs` (on UNIX -based systems — <VPIcon icon="fas fa-folder-open"/>`.git/objects` and <VPIcon icon="fas fa-folder-open"/>`.git/refs`, respectively).

![](https://freecodecamp.org/news/content/images/2020/12/image-108.png)

One type of reference is **branches**. Internally, `git` calls **branches** by the name **heads**. So we will create a directory for them — <VPIcon icon="fas fa-folder-open"/>`.git\refs\heads`.

![](https://freecodecamp.org/news/content/images/2020/12/image-109.png)

![This still doesn’t change our `git status`](https://freecodecamp.org/news/content/images/2020/12/image-110.png)

How does `git` know where to start when looking for a **commit** in the **repository**? As I explained earlier, it looks for `HEAD`, which points to the current active branch (or **commit**, in some cases).

So, we need to create the `HEAD`, which is just a file residing at <VPIcon icon="fas fa-folder-open"/>`.git\HEAD`. We can apply the following:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```batch
ECHO ref: refs/heads/master > .git\HEAD`
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
echo "ref: refs/heads/master" > .git/HEAD
```

:::

⭐ So we now know how `HEAD` is implemented — it’s simply a file, and its contents describe what it points to.

![Following the command above, `git status` seems to change its mind:](https://freecodecamp.org/news/content/images/2020/12/image-111.png)

Notice that `git` believes we are on a branch called <VPIcon icon="fas fa-code-branch"/>`master`, even though we haven’t created this branch. As mentioned before, <VPIcon icon="fas fa-code-branch"/>`master` is just a name. We could also make `git` believe we are on a branch called <VPIcon icon="fas fa-code-branch"/>`banana` if we wanted to:

![🍌](https://freecodecamp.org/news/content/images/2020/12/image-112.png)

We will switch back to <VPIcon icon="fas fa-code-branch"/>`master` for the rest of this post, just to adhere to the normal convention.

Now that we have our <VPIcon icon="fas fa-folder-open"/>`.git` directory ready, can we work our way to make a **commit** (again, without using `git add` or `git commit`).
