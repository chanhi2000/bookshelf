---
lang: en-US
title: "GitReset Explained - How to Save the Day with the Reset Command"
description: "Article(s) > GitReset Explained - How to Save the Day with the Reset Command"
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
      content: "Article(s) > GitReset Explained - How to Save the Day with the Reset Command"
    - property: og:description
      content: "GitReset Explained - How to Save the Day with the Reset Command"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/save-the-day-with-git-reset.html
prev: /programming/git/articles/README.md
date: 2020-09-29
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://cdn-media-2.freecodecamp.org/w1280/5f9c9882740569d1a4ca1a78.jpg
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
  name="GitReset Explained - How to Save the Day with the Reset Command"
  desc="Does this sound familiar? “Help! I committed to the wrong branch!” “It happened again… Where is my commit?” Well, I’ve been there so many times. Someone calls my name for help when something goes wrong with git. And it has happened not only when I wa..."
  url="https://freecodecamp.org/news/save-the-day-with-git-reset"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-2.freecodecamp.org/w1280/5f9c9882740569d1a4ca1a78.jpg"/>

Does this sound familiar? “Help! I committed to the wrong branch!” “It happened again… Where is my commit?”

Well, I’ve been there so many times. Someone calls my name for help when something goes wrong with `git`. And it has happened not only when I was teaching students, but also while working with experienced developers.

Over time, I kind-of became “the Git guy”.

We use `git` all the time, and usually   it helps us get the work done. But sometimes, and way more often than we might want, things go wrong.

Perhaps we have committed to the wrong branch. Perhaps we lost some code that we wrote. Perhaps we committed something that we didn’t mean to.

![Source: xkcd.com](https://freecodecamp.org/news/content/images/2020/09/xkcd_comic.png)

There are many online resources about `git`, and some of them ([<VPIcon icon="fas fa-globe"/>like this one](https://ohshitgit.com/)) actually focus on what happens in these undesired scenarios.

But I always felt these resources were lacking the *“why” *. When provided with a set of commands , what does each command do? And how did you get to these commands in the first place? ?

In [a previous post, I provided a visual intro to Git internals (<VPIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/a-visualized-intro-to-git-internals-objects-and-branches-68df85864037). While understanding the internals of `git` is useful, getting the theory is almost never enough. How do we apply our knowledge of `git`’s internals and use it to fix problems we’ve gotten ourselves into?

In this post, I would like to bridge this gap   and elaborate on the `git reset` command. We will get to understand what `git reset` does behind the scenes, and then apply this knowledge to solve various scenarios. ?

---

## Common grounds— working dir, index and repository

In order to understand the inner mechanisms of `git reset`, it is important to understand the process of recording changes within `git` . Specifically, I mean the **working dir**, the **index,** and the **repository.**

If you are confident about these terms, feel free to skip to the next section. If you would like an even deeper explanation, see this [previous post (<VPIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/a-visualized-intro-to-git-internals-objects-and-branches-68df85864037).

When we work on our source code we work from a **working dir —** any directory on our file system which has a **repository** associated with it. It contains the folders and files of our project, and also a directory called `.git`.

After we make some changes, we want to record them in our **repository**. A **repository** (**repo** for short) is a collection of **commits**, each of which is an archive of what the project’s **working tree** looked like at a past date, whether on our machine or someone else’s.

![](https://freecodecamp.org/news/content/images/2020/09/1-2.png)

Let’s create a file in the working dir and run `git status`:

![](https://freecodecamp.org/news/content/images/2020/09/2-4.png)

Yet, `git` does not commit changes from the **working tree** directly into the **repository**.

Instead, changes are first registered in something called the **index**, or the **staging area**. Both of these terms refer to the same thing, and they are used often in `git`’s documentation. We will use these terms interchangeably throughout this post.

When we use `git add`, we add files (or changes within files) to the **staging area**. Let’s use this command on the file we created earlier:

![](https://freecodecamp.org/news/content/images/2020/09/3-2.png)

As `git status` reveals, our file is **staged** (and ready “to be committed”). Yet, it is not a part of any **commit**. In other words, it is now in the **working dir**, as well as the **index**, but not in the **repository**.

![](https://freecodecamp.org/news/content/images/2020/09/6-3.png)

Next, when we use `git commit`, we create a **commit** based on the state of the **index**. So the new **commit** (commit 3 in the example below) will include the file added to the index beforehand.

![](https://freecodecamp.org/news/content/images/2020/09/7-2.png)

In other words, the **working dir** has exactly the same state as the **index** and the **repository**.

The command `git commit` also makes the current branch <VPIcon icon="fas fa-code-branch"/>`master` point to the newly created **commit** object.

![](https://freecodecamp.org/news/content/images/2020/09/8-2.png)

---

## The inner workings of git reset

I like to think of `git reset` as a command that reverses the process described above (introducing a change to the **working dir**, adding it to the **index**, and then **commit**ing it to the **repository**).

Git reset has three operating modes — `--soft`, `--mixed`, or `--hard`. I see them as three stages:

- Stage 1 — update `HEAD` — `git reset --soft`
- Stage 2 — update **index** — `git reset --mixed`
- Stage 3 — update **working dir** — `git reset --hard`

### Stage 1-update `HEAD` (`git reset --soft`)

First, `git reset` updates whatever `HEAD` points to. For `git reset --hard HEAD~1` it will move what `HEAD` points to (in the example above, <VPIcon icon="fas fa-code-branch"/>`master`) to `HEAD~1`. If the `— -soft` flag is used, `git reset` stops there.

Continuing with our example above, `HEAD` will point to `commit 2`, and thus `new_file.txt` will not be a part of the tree of the current commit. It will, however, be part of the **index** and the **working dir**.

![](https://freecodecamp.org/news/content/images/2020/09/9-2.png)

Looking at `git status`, we can see that the file is indeed staged but not committed:

![](https://freecodecamp.org/news/content/images/2020/09/10-2.png)

In other words, we reverted the process to the stage where we used `git add`, but haven’t yet used `git commit`.

### Stage 2-update index to HEAD (`git reset --mixed`)

If we use `git reset --mixed HEAD~1`, then `git` won’t stop after updating whatever `HEAD` points to ( <VPIcon icon="fas fa-code-branch"/>`master` )to `HEAD~1`. It will also update the **index** to (the already updated) `HEAD`.

In our example, that means that the **index** will have the same state as **commit 2**:

![](https://freecodecamp.org/news/content/images/2020/09/11-1.png)

So we reverted the process to the stage before using `git add` — the newly created file is now part of the working dir, but the **index** and the **repository** are not.

![](https://freecodecamp.org/news/content/images/2020/09/12-1.png)

### Stage 3-update the working dir to index (`git reset --hard`)

By using `git reset — hard HEAD~1`, after updating whatever `HEAD` points to (<VPIcon icon="fas fa-code-branch"/>`master` )to `HEAD~1`, as well as updating the **index** to (the already updated) `HEAD`, `git` will move on and update the **working dir** to look like the **index**.

In our example, that means that the **working dir** will have the same state as the **index,** which already has the same state as **commit 2**:

![](https://freecodecamp.org/news/content/images/2020/09/13-1.png)

Actually, we reverted the entire process   to even before creating <VPIcon icon="fas fa-file-lines"/>`my_file.txt`.

---

## Applying our knowledge to real-world scenarios

Now that we understand how `git reset` works, let's apply this knowledge to save our day! ?

### 1. OOPS! I committed something by mistake.

Let's consider the following scenario. We created a file with the string `This is very importnt`, staged and committed it.

![](https://freecodecamp.org/news/content/images/2020/09/14-1.png)

And then… Oops! We realized we had a typing error. ?

Well, now we know we can easily solve that. We can revert our last commit, and get the file back to the working dir using `git reset --mixed HEAD~1`. Now, we can edit the content of our file, stage and commit it again.

::: tip

in this specific case, we could also use `git commit --amend`, as described [here (<VPIcon icon="fa-brands fa-medium"/>`igor_marques`)](https://medium.com/@igor_marques/git-basics-adding-more-changes-to-your-last-commit-1629344cb9a8).

:::

### 2. OOPS! I committed something to the wrong branch — and I need it on a new branch

We’ve all been there. We did some work, and then committed it…

![](https://freecodecamp.org/news/content/images/2020/09/15-1.png)

Oh no, we committed to <VPIcon icon="fas fa-code-branch"/>`master` branch, though we should have created a new branch and then issued a pull request. ?

At this stage I find it helpful to visualze the state we’re in, and where we would like to get to:

![](https://freecodecamp.org/news/content/images/2020/09/16.png)

Actually, there are three changes between the current state and the desired one.

First, <VPIcon icon="fas fa-code-branch"/>`new` branch points to our recently added commit. Second, <VPIcon icon="fas fa-code-branch"/>`master` points to the previous commit. Third, `HEAD` points to <VPIcon icon="fas fa-code-branch"/>`new`.

We can get to the desired state by three simple steps:

First, make <VPIcon icon="fas fa-code-branch"/>`new` branch point to the recently added commit — this can be simply achieved by using `git branch new`. We therefore reach the following state:

![](https://freecodecamp.org/news/content/images/2020/09/17.png)

Second, make <VPIcon icon="fas fa-code-branch"/>`master` point to the previous commit (in other words, to `HEAD~1`). We can do that by using `git reset --hard HEAD~1`. We therefore reached the following state:

![](https://freecodecamp.org/news/content/images/2020/09/18.png)

Lastly, we would like to be on branch <VPIcon icon="fas fa-code-branch"/>`new`, that is, make `HEAD` point to <VPIcon icon="fas fa-code-branch"/>`new`. This is easily achieved by performing `git checkout new`.

All in all:

- `git branch new`
- `git reset --hard HEAD~1`
- `git checkout new`

### 3. OOPS! I committed something to the wrong branch — and I need it on another, already-existing branch

In this case, we went through the same steps as in the previous scenario — we did some work, and then committed it…

![](https://freecodecamp.org/news/content/images/2020/09/19.png)

Oh no, we committed to <VPIcon icon="fas fa-code-branch"/>`master` branch, though we should have committed to another branch that already exists. ?

Let’s get back to our drawing board:

![](https://freecodecamp.org/news/content/images/2020/09/20.png)

Again, we can see there are a few differences here.

First, we need the most recent commit to be on <VPIcon icon="fas fa-code-branch"/>`existing` branch. Since <VPIcon icon="fas fa-code-branch"/>`master` currently points to it, we can simply ask `git` to take the recent commit from <VPIcon icon="fas fa-code-branch"/>`master` branch and apply it to <VPIcon icon="fas fa-code-branch"/>`existing` branch like so:

- `git checkout existing`: switching to <VPIcon icon="fas fa-code-branch"/>`existing` branch
- `git cherry-pick master` :  applying the last commit on <VPIcon icon="fas fa-code-branch"/>`master` branch to the current (<VPIcon icon="fas fa-code-branch"/>`existing`) branch

Now, we reached the following state:

![](https://freecodecamp.org/news/content/images/2020/09/21.png)

Now we just need to make <VPIcon icon="fas fa-code-branch"/>`master` point to the previous commit, rather than the latest one. For that we can:

- `git checkout master` — change the active branch to <VPIcon icon="fas fa-code-branch"/>`master` again.
- `git reset --hard HEAD~1` — now we are back at the original branch.

![And we have reached our desired state](https://freecodecamp.org/news/content/images/2020/09/22.png)

---

## Summary

In this post, we learned how `git reset` operates, and clarified its three modes of operation — `--soft`, `--mixed`, and `--hard`.

We then applied our knowledge about `git reset` to solve some real-life issues with `git`.

By understanding the way `git` operates, we can confidently tackle all kinds of scenarios, and also  appreciate the beauty of this tool ?

In future posts, we will cover additional `git` commands and how they can help us solve all kinds of undesired situations.

::: info Omer Rosenbaum

- [<VPIcon icon="fas fa-globe"/>Swimm](https://swimm.io)’s Chief Technology Officer
- Cyber training expert and Founder of Checkpoint Security Academy.
- Author of [<VPIcon icon="fas fa-globe"/>Computer Networks (in Hebrew)](https://data.cyber.org.il/networks/networks.pdf)
- [Youtube (<VPIcon icon="fa-brands fa-youtube"/>`@BriefVid`)](https://youtube.com/BriefVid)
- [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`omer-rosenbaum-034a08b9`)](https://linkedin.com/in/omer-rosenbaum-034a08b9)

<SiteInfo
  name="Swimm: AI Code Documentation And Knowledge Sharing"
  desc="Swimm helps enterprise software organizations document and understand big, complex, and legacy codebases."
  url="https://swimm.io/"
  logo="https://swimm.io/wp-content/uploads/2023/03/cropped-favicon-192x192.png"
  preview="https://swimm.io/wp-content/uploads/2024/01/HP-featured.png"/>

<PDF url="https://data.cyber.org.il/networks/networks.pdf" />

:::

### Additional Resources

<SiteInfo
  name="Git Internals - Intro Video"
  desc="Many of us use git on a daily basis. But how many of us know what goes on under the hood?In this series, we will get a rare understanding of what goes on und..."
  url="https://youtu.be/fWMKue-WBok?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7/"
  logo="https://youtube.com/s/desktop/26a583e4/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/fWMKue-WBok/hqdefault.jpg"/>

<SiteInfo
  name="A Visualized Intro to Git Internals — Objects and Branches"
  desc="Many of us use git on a daily basis. But how many of us know what goes on under the hood? For example, what happens when we use git commit…"
  url="https://medium.com/swimm/a-visualized-intro-to-git-internals-objects-and-branches-68df85864037/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:479/1*4nBU4Vx4cYvX3Yw49WtjsA.png"/>

<SiteInfo
  name="Getting Hardcore — Creating a Repo From Scratch"
  desc="A Hands-On Intro to Git Internals"
  url="https://medium.com/swimm/getting-hardcore-creating-a-repo-from-scratch-cc747edbb11c/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*y9qUJM56oI5bXKmCOFTGCg.png"/>

```component VPCard
{
  "title": "Git - Reset Demystified",
  "desc": "Reset Demystified Before moving on to more specialized tools, let’s talk about the Git reset and checkout commands. These commands are two of the most confusing parts of Git when you first encounter them. They do so many things that it seems hopeless to actually understand them and employ them properly. For this, we recommend a simple metaphor.",
  "link": "https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified/",
  "logo": "https://git-scm.com/favicon.ico",
  "background": "rgba(227,90,56,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "GitReset Explained - How to Save the Day with the Reset Command",
  "desc": "Does this sound familiar? “Help! I committed to the wrong branch!” “It happened again… Where is my commit?” Well, I’ve been there so many times. Someone calls my name for help when something goes wrong with git. And it has happened not only when I wa...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/save-the-day-with-git-reset.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
