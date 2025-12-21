---
lang: en-US
title: "Revision Selection"
description: "Article(s) > (1/6) Advanced Git Tips for Python Developers"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Revision Selection"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/revision-selection.html
date: 2018-08-13
isOriginal: false
author:
  - name: Jim Anderson
    url : https://realpython.com/team/janderson/
cover: https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Advanced Git Tips for Python Developers",
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Revision Selection, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Revision Selection, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#revision-selection"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

There are several options to tell Git which revision (or commit) you want to use. We’ve already seen that we can use a full SHA (`25b09b9ccfe9110aed2d09444f1b50fa2b4c979c`) and a short SHA (`25b09b9cc`) to indicate a revision.

We’ve also seen how you can use `HEAD` or a branch name to specify a particular commit as well. There are a few other tricks that Git has up its sleeve, however.

---

## Relative Referencing

Sometimes it’s useful to be able to indicate a revision relative to a known position, like `HEAD` or a branch name. Git provides two operators that, while similar, behave slightly differently.

The first of these is the tilde (`~`) operator. Git uses tilde to point to a parent of a commit, so `HEAD~` indicates the revision before the last one committed. To move back further, you use a number after the tilde: `HEAD~3` takes you back three levels.

This works great until we run into merges. Merge commits have two parents, so the `~` just selects the first one. While that works sometimes, there are times when you want to specify the second or later parent. That’s why Git has the caret (`^`) operator.

The `^` operator moves to a specific parent of the specified revision. You use a number to indicate which parent. So `HEAD^2` tells Git to select the second parent of the last one committed, **not** the “grandparent.” It can be repeated to move back further: `HEAD^2^^` takes you back three levels, selecting the second parent on the first step. If you don’t give a number, Git assumes `1`.

:: note

Those of you using Windows will need to escape the `^` character on the DOS command line by using a second `^`.

:::

To make life even more fun and less readable, I’ll admit, Git allows you to combine these methods, so `25b09b9cc^2~3^3` is a valid way to indicate a revision if you’re walking back a tree structure with merges. It takes you to the second parent, then back three revisions from that, and then to the third parent.

---

## Revision Ranges

There are a couple of different ways to specify ranges of commits for commands like `git log`. These don’t work exactly like slices in Python, however, so be careful!

### Double Dot Notation

The “double dot” method for specifying ranges looks like it sounds: `git log b05022238cdf08..60f89368787f0e`. It’s tempting to think of this as saying “show me all commits after `b05022238cdf08` up to and including `60f89368787f0e`” and, if `b05022238cdf08` is a direct ancestor of `60f89368787f0e`, that’s exactly what it does.

:: note

For the rest of this section, I will be replacing the SHAs of individual commits with capital letters as I think that makes the diagrams a little easier to follow. We’ll use this “fake” notation later as well.

:::

It’s a bit more powerful than that, however. The double dot notation actually is showing you all commits that are included in the second commit that are not included in the first commit. Let’s look at a few diagrams to clarify:

![Branch1-A->B->C, Branch2 A->D->E->F](https://files.realpython.com/media/drawio-git-diff-example-big.95fa2c7990ad.png)

As you can see, we have two branches in our example repo, <VPIcon icon="fas fa-code-branch"/>`branch1` and <VPIcon icon="fas fa-code-branch"/>`branch2`, which diverged after commit `A`. For starters, let’s look at the simple situation. I’ve modified the log output so that it matches the diagram:

```sh
git log --oneline D..F
# 
# E "Commit message for E"
# F "Commit message for F"
```

`D..F` gives you all of the commits on <VPIcon icon="fas fa-code-branch"/>`branch2` **after** commit `D`.

A more interesting example, and one I learned about while writing this tutorial, is the following:

```sh
git log --oneline C..F
# 
# D "Commit message for D"
# E "Commit message for E"
# F "Commit message for F"
```

This shows the commits that are part of commit `F` that are not part of commit `C`. Because of the structure here, there is not a before/after relationship to these commits because they are on different branches.

::: details Exercise: Double Dot Notation

What do you think you’ll get if you reverse the order of `C` and `F`?

**Solution: Double Dot Notation**

```sh
git log --oneline F..C
# 
# B "Commit message for B"
# C "Commit message for C"
```

:::

### Triple Dot

Triple dot notation uses, you guessed it, three dots between the revision specifiers. This works in a similar manner to the double dot notation except that it shows all commits that are in **either** revision that are not included in **both** revisions. For our diagram above, using `C...F` shows you this:

```sh
git log --oneline C...F
# 
# D "Commit message for D"
# E "Commit message for E"
# F "Commit message for F"
# B "Commit message for B"
# C "Commit message for C"
```

Double and triple dot notation can be quite powerful when you want to use a range of commits for a command, but they’re not as straightforward as many people think.

#### Branches vs. HEAD vs. SHA

This is probably a good time to review what branches are in Git and how they relate to SHAs and HEAD.

`HEAD` is the name Git uses to refer to “where your file system is pointing right now.” Most of the time, this will be pointing to a named branch, but it does not have to be. To look at these ideas, let’s walk through an example. Suppose your history looks like this:

![Four Commits With No Branches](https://files.realpython.com/media/drawio-git-branch-step1-big.a431ad80dd56.png)

At this point, you discover that you accidentally committed a Python logging statement in commit B. Rats. Now, most people would add a new commit, `E`, push that to <VPIcon icon="fas fa-code-branch"/>`master` and be done. But you are learning Git and want to fix this the hard way and hide the fact that you made a mistake in the history.

So you move `HEAD` back to `B` using `git checkout B`, which looks like this:

![Four Commits, HEAD Points to Second Commit](https://files.realpython.com/media/drawio-git-branch-step2-big.6c63995367f6.png)

You can see that <VPIcon icon="fas fa-code-branch"/>`master` hasn’t changed position, but `HEAD` now points to `B`. In the Intro to Git tutorial, we talked about the “detached HEAD” state. This is that state again!

Since you want to commit changes, you create a new branch with `git checkout -b temp`:

![New Branch temp Points To Second Commit](https://files.realpython.com/media/drawio-git-branch-step3-big.94c7e15609ce.png)

Now you edit the file and remove the offending log statement. Once that is done, you use `git add` and `git commit --amend` to modify commit `B`:

![New Commit B' Added](https://files.realpython.com/media/drawio-git-branch-step4-big.7061c3167421.png)

Whoa! There’s a new commit here called `B'`. Just like `B`, it has `A` as its parent, but `C` doesn’t know anything about it. Now we want master to be based on this new commit, `B'`.

Because you have a sharp memory, you remember that the rebase command does just that. So you get back to the <VPIcon icon="fas fa-code-branch"/>`master` branch by typing `git checkout master`:

![HEAD Moved Back To master](https://files.realpython.com/media/drawio-git-branch-step5-big.29af45f4ac7c.png)

Once you’re on master, you can use `git rebase temp` to replay `C` and `D` on top of `B`:

![master Rebased On B'](https://files.realpython.com/media/drawio-git-branch-step6-big1.b74a8ab128c4.png)

You can see that the rebase created commits `C'` and `D'`. `C'` still has the same changes that `C` has, and `D'` has the same changes as `D`, but they have different SHAs because they are now based on `B'` instead of `B`.

As I mentioned earlier, you normally wouldn’t go to this much trouble just to fix an errant log statement, but there are times when this approach could be useful, and it does illustrate the differences between `HEAD`, commits, and branches.

::: info More

Git has even more tricks up its sleeve, but I’ll stop here as I’ve rarely seen the other methods used in the wild. If you’d like to learn about how to do similar operations with more than two branches, checkout the excellent write-up on Revision Selection in the [<VPIcon icon="iconfont icon-git"/>Pro Git book](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection).

:::
