---
lang: en-US
title: "Time to Get Hands-on 🙌🏻"
description: "Article(s) > (2/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
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
      content: "Article(s) > (2/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
    - property: og:description
      content: "Time to Get Hands-on 🙌🏻"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/time-to-get-hands-on.html
date: 2023-04-28
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Git Merge Handbook – Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Merge Handbook – Definitive Guide to Merging in Git"
  desc="By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a..."
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-time-to-get-hands-on"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

OK, so let's say I have this simple repository here, with a branch called <FontIcon icon="fas fa-code-branch"/>`main`, and a few commits with the commit messages of "Commit 1", "Commit 2" and "Commit 3":

![A simple repository with three commits<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-141.png)

Next, create a feature branch by typing `git branch new_feature`:

![Creating a new branch with `git branch` <br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-142.png)

And switch `HEAD` to point to this new branch, by using `git checkout new_feature`. You can look at the outcome by using `git log`:

![The output of `git log` after using `git checkout new_feature`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-143.png)

As a reminder, you could also write `git checkout -b new_feature`, which would both create a new branch and change `HEAD` to point to this new branch.

If you need a reminder about branches and how they're implemented under the hood, please check out [**a previous post on the subject**](/freecodecamp.org/git-internals-objects-branches-create-repo/README.md). Yes, check out. Pun intended 😇

Now, on the <FontIcon icon="fas fa-code-branch"/>`new_feature` branch, implement a new feature. In this example I will edit an existing file that looks like this before the edit:

![<FontIcon icon="fa-brands fa-python"/>`code.py` before editing it<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-144.png)

And I will now edit it to include a new function:

![Implementing <FontIcon icon="fas fa-code-branch"/>`new_feature`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-145.png)

And thankfully, this is not a programming tutorial, so this function is legit 😇  

Next, stage and commit this change:

![Committing the changes to "Commit 4"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-146.png)

Looking at the history, you have the branch <FontIcon icon="fas fa-code-branch"/>`new_feature`, now pointing to "Commit 4", which points to its parent, "Commit 3". The branch <FontIcon icon="fas fa-code-branch"/>`main` is also pointing to "Commit 3".

Time to merge the new feature! That is, merge these two branches, <FontIcon icon="fas fa-code-branch"/>`main` and <FontIcon icon="fas fa-code-branch"/>`new_feature`. Or, in Git's lingo, merge <FontIcon icon="fas fa-code-branch"/>`new_feature` *into* <FontIcon icon="fas fa-code-branch"/>`main`. This means merging "Commit 4" and "Commit 3". This is pretty trivial, as after all, "Commit 3" is an ancestor of "Commit 4".

Check out the main branch (with `git checkout main`), and perform the merge by using `git merge new_feature`:

![Merging <FontIcon icon="fas fa-code-branch"/>`new_feature` into <FontIcon icon="fas fa-code-branch"/>`main`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-197.png)

Since <FontIcon icon="fas fa-code-branch"/>`new_feature` never really *diverged* from <FontIcon icon="fas fa-code-branch"/>`main`, Git could just perform a fast-forward merge. So what happened here? Consider the history:

![The result of a fast-forward merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/05/image--7-.png)

Even though you used `git merge`, there was no actual merging here. Actually, Git did something very simple – it reset the <FontIcon icon="fas fa-code-branch"/>`main` branch to point to the same commit as the branch <FontIcon icon="fas fa-code-branch"/>`new_feature`.

In case you don't want that to happen, but rather you want Git to really perform a merge, you could either change Git's configuration, or run the `merge` command with the `--no-ff` flag.

First, undo the last commit:

```sh
git reset --hard HEAD~1
```

If this way of using reset is not clear to you, feel free to check out [a post where I covered `git reset` in depth](https://medium.com/@Omer_Rosenbaum/git-undo-how-to-rewrite-git-history-with-confidence-d4452e2969c2). It is not crucial for this introduction of `merge`, though. For now, it's important to understand that it basically undoes the merge operation.

Just to clarify, now if you checked out <FontIcon icon="fas fa-code-branch"/>`new_feature` again:

```sh
git checkout new_feature
```

The history would look just like before the merge:

![The history after using `git reset --hard HEAD~1`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/05/image--8-.png)

Next, perform the merge with the `--no-fast-forward` flag (`--no-ff for short`):

```sh
git checkout main
git merge new_feature --no-ff
```

Now, if we look at the history using `git log`:

![History after merging with the `--no-ff` flag<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-200.png)

(`git log` is an alias I added to Git to visibly see the history in a graphical manner. You can find it [here](https://gist.github.com/Omerr/8134a61b56ca82dd90e546e7ef04eb77)).

Considering this history, you can see Git created a new commit, a merge commit.

If you consider this commit a bit closer:

```sh
git log -n1
```

![The merge commit has two parents<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-201.png)

You will see that this commit actually has two parents – "Commit 4", which was the commit that <FontIcon icon="fas fa-code-branch"/>`new_feature` pointed to when you ran `git merge`, and "Commit 3", which was the commit that <FontIcon icon="fas fa-code-branch"/>`main` pointed to. So a merge commit has two parents: the two commits it merged.

The merge commit shows us the concept of merge quite well. Git takes two commits, usually referenced by two different branches, and merges them together.

After the merge, as you started the process from <FontIcon icon="fas fa-code-branch"/>`main`, you are still on <FontIcon icon="fas fa-code-branch"/>`main`, and the history from <FontIcon icon="fas fa-code-branch"/>`new_feature` has been merged into this branch. Since you started with <FontIcon icon="fas fa-code-branch"/>`main`, then "Commit 3", which <FontIcon icon="fas fa-code-branch"/>`main` pointed to, is the first parent of the merge commit, whereas "Commit 4", which you merged *into* <FontIcon icon="fas fa-code-branch"/>`main`, is the second parent of the merge commit.

Notice that you started on <FontIcon icon="fas fa-code-branch"/>`main` when it pointed to "Commit 3", and Git went quite a long way for you. It changed the working tree, the index, and also `HEAD` and created a new commit object. At least when you use `git merge` without the `--no-commit` flag and when it's not a fast-forward merge, Git does all of that.

This was a super simple case, where the branches you merged didn't diverge at all.

By the way, you can use `git merge` to merge more than two commits – actually, any number of commits. This is rarely done and I don't see a good reason to elaborate on it here.

Another way to think of `git merge` is by joining two or more *development histories* together. That is, when you merge, you incorporate changes from the named commits, since the time their histories diverged *from* the current branch, *into* the current branch. I used the term `branch` here, but I am stressing this again – we are actually merging commits.
