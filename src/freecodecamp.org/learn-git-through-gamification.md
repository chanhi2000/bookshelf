---
lang: en-US
title: "Learn Git through Gamification – A Visual Guide to Key Version Control Concepts"
description: "Article(s) > Learn Git through Gamification – A Visual Guide to Key Version Control Concepts"
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
      content: "Article(s) > Learn Git through Gamification – A Visual Guide to Key Version Control Concepts"
    - property: og:description
      content: "Learn Git through Gamification – A Visual Guide to Key Version Control Concepts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-git-through-gamification.html
prev: /programming/git/articles/README.md
date: 2025-03-02
isOriginal: false
author:
  - name: Jacob Stopak
    url : https://freecodecamp.org/news/author/initialcommit/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740686401633/ffd9ac3c-668a-47bf-b2ba-f7cee14e74a8.webp
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
  name="Learn Git through Gamification – A Visual Guide to Key Version Control Concepts"
  desc="Git has many concepts and commands that you’ll need to understand before you feel confident using it. Some of these concepts may sound trivial, especially to someone who has worked with Git before. But like most Git and coding concepts, even the “sim..."
  url="https://freecodecamp.org/news/learn-git-through-gamification"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740686401633/ffd9ac3c-668a-47bf-b2ba-f7cee14e74a8.webp"/>

Git has many concepts and commands that you’ll need to understand before you feel confident using it. Some of these concepts may sound trivial, especially to someone who has worked with Git before. But like most Git and coding concepts, even the “simple” ones tend to be abstract.

The three concepts that stand out to me as the most fundamental for being able to effectively work with Git at a basic level are:

1. The **working directory**
2. The **staging area**
3. The **commit history**

In this article, we’ll take a new approach to representing these three concepts: by *visualizing them in an immersive, 3D game world!*

I’ll provide a tangible, visual representation of these key Git concepts which are almost always described in an abstract and confusing way. I hope that this will make them much more intuitive for you to grasp.

---

## Visualize your Working Directory

What does your brain picture when you think of the “working directory”? I assume it’s something like a folder structure starting at the project root, containing the code files and subfolders that make up the project.

While that is a fair description of the working directory, it is a bit hard to imagine and misses the segmentation that Git applies to your project. Although the current state of your entire project, folder structure, and code files do reside in the working directory, Git doesn’t really need to do much about that unless certain *changes* are detected in those files.

Git detects and reports changes to the working directory with the [<FontIcon icon="fas fa-globe"/>Git status command](https://initialcommit.com/blog/git-status), which shows output like this:

```sh
git status
# 
# On branch main
# Your branch is up to date with 'origin/main'.
# 
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git restore <file>..." to discard changes in working directory)
#         modified:   main.py
#         modified:   settings.py
# 
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         one.py
#         three.py
#         two.py
# 
# no changes added to commit (use "git add" and/or "git commit -a")
```

The two relevant sections here are:

1. **Changes not staged for commit:** Lists existing files tracked by Git which currently contain code changes. In the example above, we see two “modified files”: <FontIcon icon="fa-brands fa-python"/>`main.py` and <FontIcon icon="fa-brands fa-python"/>`settings.py`.
2. **Untracked files:** Lists new files in your project that Git doesn’t know about yet. In the example above, we see three new, untracked files: <FontIcon icon="fa-brands fa-python"/>`one.py`, <FontIcon icon="fa-brands fa-python"/>`two.py`, and <FontIcon icon="fa-brands fa-python"/>`three.py`.

When it comes to understanding Git, thinking of the working directory as the changes Git sees in these two sections – **Untracked files** and **Modified files** – is quite helpful.

But the `git status` command reports these details in the terminal in a purely text-based way, which doesn’t do newer Git users any favors when it comes to wrapping their heads around Git.

Some Git GUI’s do a better job with this (they do provide a safer point-and-click interface, after all), but in my experience, none of them make things *obvious at a glance*.

Instead, imagine that as a new Git user, you saw this:

![Image captured from Devlands, the gamified Git interface and tutorial, showing the untracked files and modified files sections of the working directory wall](https://cdn.hashnode.com/res/hashnode/image/upload/v1740587730262/375bef09-b8b8-43e3-a18c-5b1e589b6097.png)

A nice big wall with clearly delineated sections for **Untracked files** and **Modified files**. Files corresponding to each section are represented as blocks on the wall within that section, clearly labelled with their filename.

More specifically, the blocks representing files <FontIcon icon="fa-brands fa-python"/>`one.py`, <FontIcon icon="fa-brands fa-python"/>`two.py`, and <FontIcon icon="fa-brands fa-python"/>`three.py` are all sitting neatly in the **Untracked files** section, and the blocks representing the files <FontIcon icon="fa-brands fa-python"/>`main.py` and <FontIcon icon="fa-brands fa-python"/>`settings.py` are in the **Modified files** section.

This makes it abundantly clear to even a total novice that Git is interpreting these files differently and categorizing them in a logical way. It takes the abstract Git concept of the “working directory” and transforms it into a form that almost anyone can wrap their heads around at a glance.

But something is missing here. Let’s say you run the command `git add one.py`. This stages the untracked file <FontIcon icon="fa-brands fa-python"/>`one.py` to be included in the next commit. What happens to the block labelled <FontIcon icon="fa-brands fa-python"/>`one.py` on the wall?

---

## Demystify your Staging Area

To answer that, let’s move on to the mysterious [<FontIcon icon="fas fa-globe"/>Git “staging area”](https://initialcommit.com/blog/git-add). But first, where exactly IS the staging area?

Well, technically any staged file changes are still just sitting in the working directory, which makes things a bit confusing.

Here is how Git reports this in the terminal:

```sh
git status
# 
# On branch main
# Your branch is up to date with 'origin/main'.
# 
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#         new file:   one.py
```

As you can see from Git’s output, it now includes the section **Changes to be committed**, which includes the file <FontIcon icon="fa-brands fa-python"/>`one.py` that was staged with the `git add` command.

But this is still a bit unclear. Are the staged file changes in <FontIcon icon="fa-brands fa-python"/>`one.py` still a part of the working directory? Or does Git store them elsewhere?

Well, the answer is… BOTH:

![Image captured from Devlands, the gamified Git interface and tutorial, adding the staged files section onto the working directory wall](https://cdn.hashnode.com/res/hashnode/image/upload/v1740592262850/dc65c06d-0ec6-4de6-bbe9-53307d523e68.png)

Here you can see that we zoomed out a bit from the previous image, to reveal a third section of the wall labeled **Staged files**.

Since we ran the command `git add one.py`, you can see that the corresponding block representing the <FontIcon icon="fa-brands fa-python"/>`one.py` file moved from the Untracked files column to the Staged files column.

This conveys quite clearly that a file sitting in the staging area is still a part of the working directory (because it is a part of the overall wall), while also being segmented into its own designated space.

From a technical perspective, Git’s staging area is just a file named **index** which lives in the <FontIcon icon="fas fa-folder-open"/>`.git/` folder. Git builds up the code changes specified by the `git add` command in this file, which is used as the source for those changes the next time the `git commit` command is run.

But from a workflow perspective, representing the staging area as a section on the “working directory wall” as in the image above makes things more intuitive to understand.

Next, let’s explore how we might visualize things once the staged changes are turned into a new Git commit and become a part of the active branch.

---

## Literally Walk through your Commit History

What does your mind’s eye see when you think of Git’s “commit history”?

Well, the prettiest way Git does it in the terminal is by using the [<FontIcon icon="fas fa-globe"/>Git log command](https://initialcommit.com/blog/git-log), such as `git log --graph --all`, which provides output like:

```plaintext :collapsed-lines title="output"
* commit 88085cff3e2d7657f26eb6479b308526df7d2bba (HEAD -> dev, origin/dev)
| Author: Jacob Stopak <jacob@initialcommit.io>
| Date:   Tue Apr 23 20:31:24 2024 -0700
|
|     Fix command as title clip, ellipses and arrow length in rebase subcommand
|
|     Signed-off-by: Jacob Stopak <jacob@initialcommit.io>
|
*   commit e264605ea26a808c34d4dc2fbc6dad65a8e28c5f
|\  Merge: cb3fa5f b8c071c
| | Author: Jacob Stopak <jacob@initialcommit.io>
| | Date:   Wed Mar 20 19:51:06 2024 -0700
| |
| |     Merge branch 'main' into dev
| |
* | commit cb3fa5f3bdbdcff3d9a8c844cda99d46bf64e337
| | Author: Jacob Stopak <jacob@initialcommit.io>
| | Date:   Sat Mar 9 22:00:49 2024 -0800
| |
| |     Add --staged flag to git restore subcommand
| |
| |     Signed-off-by: Jacob Stopak <jacob@initialcommit.io>
| |
| * commit b8c071cb9a1653748525aa01c2b6bafe06ed9100
|/  Author: Jacob Stopak <jacob@initialcommit.io>
|   Date:   Wed Mar 20 19:50:53 2024 -0700
|
|       Correct license specified in pyproject.toml from MIT to GNU GPLv2
|
|       Signed-off-by: Jacob Stopak <jacob@initialcommit.io>
|
* commit 32a3a3fca583f6c68225b974716e74b557a1a094
| Author: Jacob Stopak <49353917+initialcommit-io@users.noreply.github.com>
| Date:   Tue Aug 22 11:31:38 2023 -0700
|
|     Update README.md
```

Unfortunately, this is not so pretty at all. This long, garbled list of commit IDs, names, dates, and commit messages is definitely not something most folks would consider user-friendly.

The `--graph` option supplied above does show the commit relationships by drawing little lines connecting each commit in the terminal, but the purely text-based nature of this is just not intuitive to most people at a glance.

Now consider the following gamified representation of Git’s commit history:

![Image captured from Devlands, the gamified Git interface and tutorial, showing the project's commit history and branches](https://cdn.hashnode.com/res/hashnode/image/upload/v1740594184258/8d5a33c8-ad60-4496-a50d-a27fc6b8e752.png)

Now we’re talkin’! In this image, each Git commit is represented by a white block with a shortened 6-character commit ID.

Each white commit block points back to its parent commit with an arrow, forming very clear chains of commits that make up Git branches.

You might have noticed that some of the white commit blocks have colored blocks sitting on top of them. The green blocks are [<FontIcon icon="fas fa-globe"/>branch names](https://initialcommit.com/blog/git-branches), the yellow blocks are [<FontIcon icon="fas fa-globe"/>Git tags](https://initialcommit.com/blog/git-tag), the blue block is [Git’s HEAD pointer](https://initialcommit.com/blog/what-is-git-head), and the red blocks are remote-tracking branches. These are collectively referred to as [<FontIcon icon="fas fa-globe"/>Git refs](https://initialcommit.com/blog/what-is-git-head#git-refs-and-heads).

Besides being able to easily distinguish between them, representing ref types as different colored blocks clarifies another often-confusing Git concept. In Git, branches (along with other refs types) are just “pointers” to a specific commit. It is tempting to think of a branch as a series of connected commits that share a history – and conceptually this is correct – but in Git, a branch is really just a glorified label pointing to a specific commit.

In this gamified world, you can *literally walk through your commit history* to see, interact with, and examine the code changes in any commit.

---

## Summary

In this article, we explored how Git’s fundamental concepts - the working directory, staging area, and commit history - can be difficult to grasp due to their abstract nature.

To make these concepts more accessible, we introduced a gamified, visual approach that transforms them into something tangible: an immersive game world where files and commits are represented as interactive blocks.

By presenting Git this way, beginner coders, students, and developers of all experience levels can intuitively learn Git concepts and commands, and confidently apply them in professional projects.

---

## Try it Yourself

The images in this post were captured in [<FontIcon icon="fas fa-globe"/>Devlands](https://devlands.com), the first and only *gamified Git interface and tutorial*, which I’m building in Python.

In Devlands, not only can you walk through your codebase… You can also learn Git concepts and commands with a character-guided tutorial, simulate and run Git commands directly in the game, see their results applied in the game world in real time, and use AI to explain code you don’t understand.

If you or someone you know is a visual learner, beginner coder, or newer Git user, [<FontIcon icon="fas fa-globe"/>consider checking it out!](https://devlands.com)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Git through Gamification – A Visual Guide to Key Version Control Concepts",
  "desc": "Git has many concepts and commands that you’ll need to understand before you feel confident using it. Some of these concepts may sound trivial, especially to someone who has worked with Git before. But like most Git and coding concepts, even the “sim...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-git-through-gamification.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
