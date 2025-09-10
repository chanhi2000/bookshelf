---
lang: en-US
title: "cherry-pick as a Basis for Rebase"
description: "Article(s) > (2/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (2/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "cherry-pick as a Basis for Rebase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/cherry-pick-as-a-basis-for-rebase.html
prev: /programming/git/articles/README.md
date: 2023-07-03
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Git Rebase Handbook - A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Rebase Handbook - A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-cherry-pick-as-a-basis-for-rebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

It is useful to think of rebase as performing `git cherry-pick` - a command takes a commit, computes the *patch* this commit introduces by computing the difference between the parent's commit and the commit itself, and then `cherry-pick` "replays" this difference.

Let's do this manually.

If we look at the difference introduced by "Commit 5" by performing `git diff main <SHA_OF_COMMIT_5>`:

![Running `git diff` to observe the patch introduced by "Commit 5"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-199.png)

::: note

If you want to play around with the repository I used and try out the commands for yourself, you can get the repo [here (<VPIcon icon="iconfont icon-gtihub"/>`Omerr/rebase_playground`)](https://github.com/Omerr/rebase_playground).

<SiteInfo
  name="Omerr/rebase_playground"
  desc="A post accompanying the video tutorial: https://youtu.be/3VFsitGUB3s"
  url="https://github.com/Omerr/rebase_playground/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d70cb4055d136088c94bb5ba9af9e7c7100008934e3b68e59a6c867f0d48f707/Omerr/rebase_playground"/>

:::

You can see that in this commit, John started working on a song called "Lucy in the Sky with Diamonds":

![The output of `git diff` - the patch introduced by "Commit 5"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-200.png)

As a reminder, you can also use the command `git show` to get the same output:

```sh
git show <SHA_OF_COMMIT_5>
```

Now, if you `cherry-pick` this commit, you will introduce this change specifically, on the active branch. Switch to <VPIcon icon="fa-brands fa-code-branch"/>`main` first:

```sh
git checkout main
# or
git switch main
```

And create another branch, just to be clear:

```sh
git checkout -b my_branch
# or
git switch -c my_branch
```

![Creating `my_branch` that branches from <VPIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-201.png)

And `cherry-pick` this commit:

```sh
git cherry-pick <SHA_OF_COMMIT_5>
```

![Using `cherry-pick` to apply the changes introduced in "Commit 5" onto <VPIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-202.png)

Consider the log (output of `git lol`):

![The output of `git lol`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-205.png)

::: note

`git lol` is an alias I added to Git to visibly see the history in a graphical manner. You can find it [here (<VPIcon icon="iconfont icon-github"/>`Omerr`)](https://gist.github.com/Omerr/8134a61b56ca82dd90e546e7ef04eb77).

:::

::: info <code>git lol</code>

```sh
git log --graph \
--pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' \
--abbrev-commit
```

To configure as an alias `git lol`:

```sh
git config --global alias.lol \
"log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

:::

It seems like you *copy-pasted* "Commit 5". Remember that even though it has the same commit message, and introduces the same changes, and even points to the same tree object as the original "Commit 5" in this case - it is still a different commit object, as it was created with a different timestamp.

Looking at the changes, using `git show HEAD`:

![The output of `git show HEAD`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-204.png)

They are the same as "Commit 5"'s.

And of course, if you look at the file (say, by using `nano lucy_in_the_sky_with_diamonds.md`), it will be in the same state as it has been after the original "Commit 5".

Cool! 😎

OK, you can now remove the new branch so it doesn't appear on your history every time:

```sh
git checkout main
git branch -D my_branch
```

---

## Beyond `cherry-pick` - How to Use `git rebase`

You can look at `git rebase` as a way to perform multiple `cherry-pick`s one after the other - that is, to "replay" multiple commits. This is not the only thing you can do with `rebase`, but it's a good starting point for our explanation.

It's time to play with `git rebase`! 👏🏻👏🏻

Before, you merged <VPIcon icon="fas fa-code-branch"/>`paul_branch` into <VPIcon icon="fas fa-code-branch"/>`john_branch`. What would happen if you *rebased* <VPIcon icon="fas fa-code-branch"/>`paul_branch` on top of <VPIcon icon="fas fa-code-branch"/>`john_branch`? You would get a very different history.

In essence, it would seem as if we took the changes introduced in the commits on <VPIcon icon="fas fa-code-branch"/>`paul_branch`, and replayed them on <VPIcon icon="fas fa-code-branch"/>`john_branch`. The result would be a **linear** history.

To understand the process, I will provide the high level view, and then dive deeper into each step. The process of rebasing one branch on top of another branch is as follows:

1. Find the common ancestor.
2. Identify the commits to be "replayed".
3. For every commit `X`, compute `diff(parent(X), X)`, and store it as a `patch(X)`.
4. Move `HEAD` to the new base.
5. Apply the generated patches in order on the target branch. Each time, create a new commit object with the new state.

The process of making new commits with the same changesets as existing ones is also called **"replaying"** those commits, a term we have already used.
