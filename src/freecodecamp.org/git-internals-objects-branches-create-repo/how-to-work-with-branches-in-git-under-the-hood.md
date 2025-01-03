---
lang: en-US
title: "How to Work with Branches in Git — Under the Hood"
description: "Article(s) > (8/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (8/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "How to Work with Branches in Git — Under the Hood"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-work-with-branches-in-git-under-the-hood.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-how-to-work-with-branches-in-git-under-the-hood"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Just as we’ve created a **repository** and a **commit** without using `git init`, `git add` or `git commit`, now we will create and switch between **branches** without using porcelain commands (`git branch` or `git checkout`).

It’s perfectly understandable if you are excited, I am too 🙂

**Let’s start:**

So far we only have one **branch**, named <FontIcon icon="fas fa-code-branch"/>`master`. To create another one with the name <FontIcon icon="fas fa-code-branch"/>`test` (as the equivalent of `git branch test`), we would need to simply create a file named <FontIcon icon="fas fa-code-branch"/>`test` within <FontIcon icon="fas fa-folder-open"/>`.git\refs\heads`, and the contents of that file would be the same **commit**’s hash as the <FontIcon icon="fas fa-code-branch"/>`master` points to.

![Image](https://freecodecamp.org/news/content/images/2020/12/image-130.png)

If we use `git log`, we can see that this is indeed the case

![both <FontIcon icon="fas fa-code-branch"/>`master` and <FontIcon icon="fas fa-code-branch"/>`test` point to this **commit**](https://freecodecamp.org/news/content/images/2020/12/image-131.png)

Let’s also switch to our newly created branch (the equivalent of `git checkout test`). For that, we should change `HEAD` to point to our new branch:

![Switching to branch <FontIcon icon="fas fa-code-branch"/>`test` by changing `HEAD`](https://freecodecamp.org/news/content/images/2020/12/image-132.png)

As we can see, both `git status` and `git log` confirm that `HEAD` now points to <FontIcon icon="fas fa-code-branch"/>`test`, which is, therefore, the active branch.

![We can now use the commands we have already used to create another file and add it to the index](https://freecodecamp.org/news/content/images/2020/12/image-133.png)

Using the commands above, we have created a file named `test.txt`, with the content of `Testing`, created a corresponding **blob,** and added it to the **index**. We also created a **tree** representing the **index**.

It’s now time to create a **commit** referencing this **tree**. This time, we should also specify the *parent* of this **commit** — which would be the previous **commit**. We specify the parent using the `-p` switch of `git commit-tree`:

![](https://freecodecamp.org/news/content/images/2020/12/image-136.png)

![We have just created a **commit**, with a **tree** as well as a parent, as we can see](https://freecodecamp.org/news/content/images/2020/12/image-139.png)

Will `git log` show us the new **commit**?

![](https://freecodecamp.org/news/content/images/2020/12/image-138.png)

As we can see, `git log` doesn’t show anything new. Why is that? 🤔 Remember that `git log` traces the **branches** to find relevant commits to show. It shows us now <FontIcon icon="fas fa-code-branch"/>`test` and the **commit** it points to, and it also shows <FontIcon icon="fas fa-code-branch"/>`master` which points to the same **commit**.

That’s right — we need to change <FontIcon icon="fas fa-code-branch"/>`test` to point to our new **commit**. We can do that by simply changing the contents of <FontIcon icon="fas fa-folder-open"/>`.git\refs\heads\test`:

![Image](https://freecodecamp.org/news/content/images/2020/12/image-140.png)

It worked! 🎉🥂

`git log` goes to `HEAD`, which tells it to go to the branch <FontIcon icon="fas fa-code-branch"/>`test`, which points to **commit** `465...5e`, which links back to its parent **commit** `80e...8f`.

Feel free to admire the beauty, we *git* you. 😊
