---
lang: en-US
title: "Advanced Rebasing in Git"
description: "Article(s) > (4/8) The Git Rebase Handbook – A Definitive Guide to Rebasing"
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
      content: "Article(s) > (4/8) The Git Rebase Handbook – A Definitive Guide to Rebasing"
    - property: og:description
      content: "Advanced Rebasing in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/advanced-rebasing-in-git.html
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
  "title": "The Git Rebase Handbook – A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Rebase Handbook – A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-advanced-rebasing-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

Now that you understand the basics of rebase, it is time to consider more advanced cases, where additional switches and arguments to the `rebase` command will come in handy.

In the previous example, when you only said `rebase` (without additional switches), Git replayed all the commits from the common ancestor to the tip of the current branch.

But rebase is a super-power, it's an almighty command capable of…well, rewriting history. And it can come in handy if you want to modify history to make it your own.

Undo the last merge by making <FontIcon icon="fa-brands fa-code-branch"/>`main` point to "Commit 4" again:

```sh
git reset -–hard <ORIGINAL_COMMIT 4>
```

!["Undoing" the last merge operation<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-238.png)

And undo the rebasing by using:

```sh
git checkout paul_branch
git reset -–hard <ORIGINAL_COMMIT 9>
```

!["Undoing" the rebase operation<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-239.png)

Notice that you got to exactly the same history you used to have:

![Visualizing the history after "undoing" the rebase operation<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-240.png)

Again, to be clear, "Commit 9" doesn't just disappear when it's not reachable from the current `HEAD`. Rather, it's still stored in the object database. And as you used `git reset` now to change `HEAD` to point to this commit, you were able to retrieve it, and also its parent commits since they are also stored in the database. Pretty cool, huh? 😎

OK, quickly view the changes that Paul introduced:

```sh
git show HEAD
```

![`git show HEAD` shows the patch introduced by "Commit 9"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-241.png)

Keep going backwards in the commit graph:

```sh
git show HEAD~
```

![`git show HEAD~` (same as `git show HEAD~1`) shows the patch introduced by "Commit 8"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-242.png)

And one commit further:

```sh
git show HEAD~2
```

![`git show HEAD~2` shows the patch introduced by "Commit 7"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-243.png)

So, these changes are nice, but perhaps Paul doesn't want this kind of history. Rather, he wants it to seem as if he introduced the changes in "Commit 7" and "Commit 8" as a single commit.

For that, you can use an **interactive** rebase. To do that, we add the `-i` (or `--interactive`) switch to the `rebase` command:

```sh
git rebase -i <SHA_OF_COMMIT_4>
```

Or, since <FontIcon icon="fa-brands fa-code-branch"/>`main` is pointing to "Commit 4", we can simply run:

```sh
git rebase -i main
```

By running this command, you tell Git to use a new base, "Commit 4". So you are asking Git to go back to all commits that were introduced after "Commit 4" and that are reachable from the current `HEAD`, and replay those commits.

For every commit that is replayed, Git asks us what we'd like to do with it:

![`git rebase -i main` prompts you to select what to do with each commit<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-250.png)

In this context it's useful to think of a commit as a patch. That is, "Commit 7" as in "the patch that "Commit 7" introduced on top of its parent".

One option is to use `pick`. This is the default behavior, which tells Git to replay the changes introduced in this commit. In this case, if you just leave it as is – and `pick` all commits – you will get the same history, and Git won't even create new commit objects.

Another option is `squash`. A *squashed* commit will have its contents "folded" into the contents of the commit preceding it. So in our case, Paul would like to squash "Commit 8" into "Commit 7":

![Squashing "Commit 8" into "Commit 7"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-251.png)

As you can see, `git rebase -i` provides additional options, but we won't go into all of them in this post. If you allow the rebase to run, you will get prompted to select a commit message for the newly created commit (that is, the one that introduced the changes of both "Commit 7" and "Commit 8"):

![Providing the commit message: `Commits 7+8`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-252.png)

And look at the history:

![The history after the interactive rebase<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-253.png)

Exactly as we wanted! We have on <FontIcon icon="fas fa-code-branch"/>`paul_branch` "Commit 9" (of course, it's a different object than the original "Commit 9"). This points to "Commits 7+8", which is a single commit introducing the changes of both the original "Commit 7" and the original "Commit 8". This commit's parent is "Commit 4", where <FontIcon icon="fa-brands fa-code-branch"/>`main` is pointing to. You have <FontIcon icon="fas fa-code-branch"/>`john_branch`.

![The history after the interactive rebase - visualized<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-254.png)

Oh wow, isn't that cool? 😎

`git rebase` grants you unlimited control over the shape of any branch. You can use it to reorder commits, or to remove incorrect changes, or modify a change in retrospect. Alternatively, you could perhaps move the base of your branch onto another commit, any commit that you wish.

---

## How to Use the `--onto` Switch of `git rebase`

Let's consider one more example. Get to <FontIcon icon="fa-brands fa-code-branch"/>`main` again:

```sh
git checkout main
```

And delete the pointers to <FontIcon icon="fas fa-code-branch"/>`paul_branch` and <FontIcon icon="fas fa-code-branch"/>`john_branch` so you don't see them in the commit graph anymore:

```sh
git branch -D paul_branch
git branch -D john_branch
```

And now branch from <FontIcon icon="fa-brands fa-code-branch"/>`main` to a new branch:

```sh
git checkout -b new_branch
```

![Creating <FontIcon icon="fas fa-code-branch"/>`new_branch` that diverges from <FontIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-255.png)

![A clean history with <FontIcon icon="fas fa-code-branch"/>`new_branch` that diverges from <FontIcon icon="fa-brands fa-code-branch"/>`main`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-256.png)

Now, add a few changes here and commit them:

```sh
nano code.py
```

![Adding the function <FontIcon icon="fas fa-code-branch"/>`new_branch` to <FontIcon icon="fa-brands fa-youtube"/>`code.py`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-257.png)

```sh
git add code.py
git commit -m "Commit 10"
```

Get back to <FontIcon icon="fa-brands fa-code-branch"/>`main`:

```sh
git checkout main
```

And introduce another change:

![Added a docstring at the beginning of the file<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-258.png)

Time to stage and commit these changes:

```sh
git add code.py
git commit -m "Commit 11"
```

And yet another change:

![Added `@Author` to the docstring<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-259.png)

Commit this change as well:

```sh
git add code.py
git commit -m "Commit 12"
```

Oh wait, now I realize that I wanted you to make the changes introduced in "Commit 11" as a part of the <FontIcon icon="fas fa-code-branch"/>`new_branch`. Ugh. What can you do? 🤔

Consider the history:

![The history after introducing "Commit 12"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-260.png)

What I want is, instead of having "Commit 10" reside only on the <FontIcon icon="fa-brands fa-code-branch"/>`main` branch, I want it to be on both the <FontIcon icon="fa-brands fa-code-branch"/>`main` branch as well as the <FontIcon icon="fas fa-code-branch"/>`new_branch`. Visually, I would want to move it down the graph here:

![Visually, I want you to "push" "Commit 10"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-261.png)

Can you see where I am going? 😇

Well, as we understand, rebase allows us to basically *replay* the changes introduced in <FontIcon icon="fas fa-code-branch"/>`new_branch`, those introduced in "Commit 10", as if they had been originally conducted on "Commit 11", rather than "Commit 4".

To do that, you can use other arguments of `git rebase`. You'd tell Git that you want to take all the history introduced between the common ancestor of <FontIcon icon="fa-brands fa-code-branch"/>`main` and <FontIcon icon="fas fa-code-branch"/>`new_branch`, which is "Commit 4", and have the new base for that history be "Commit 11". To do that, use:

```sh
git rebase -–onto <SHA_OF_COMMIT_11> main new_branch
```

![The history before and after the rebase, "Commit 10" has been "pushed"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-262.png)

And look at our beautiful history! 😍

![The history before and after the rebase, "Commit 10" has been "pushed"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-263.png)

Let's consider another case.

Say I started working on a branch, and by mistake I started working from <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`, rather than from <FontIcon icon="fa-brands fa-code-branch"/>`main`.

So to emulate this, create <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`:

```sh
git checkout main
git checkout -b feature_branch_1
```

And erase <FontIcon icon="fas fa-code-branch"/>`new_branch` so you don't see it in the graph anymore:

```sh
git branch -D new_branch
```

Create a simple Python file called <FontIcon icon="fa-brands fa-youtube"/>`1.py`:

![A new file, <FontIcon icon="fa-brands fa-youtube"/>`1.py`, with `print('Hello world!')`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-264.png)

Stage and commit this file:

```sh
git add 1.py
git commit -m  "Commit 13"
```

Now branched out (by mistake) from <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`:

```sh
git checkout -b feature_branch_2
```

And create another file, <FontIcon icon="fa-brands fa-youtube"/>`2.py`:

![Creating <FontIcon icon="fa-brands fa-youtube"/>`2.py`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-265.png)

Stage and commit this file as well:

```sh
git add 2.py
git commit -m  "Commit 14"
```

And introduce some more code to <FontIcon icon="fa-brands fa-youtube"/>`2.py`:

![Modifying <FontIcon icon="fa-brands fa-youtube"/>`2.py`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-266.png)

Stage and commit these changes too:

```sh
git add 2.py
git commit -m  "Commit 15"
```

So far you should have this history:

![The history after introducing "Commit 15"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-267.png)

Get back to <FontIcon icon="fas fa-code-branch"/>`feature_branch_1` and edit <FontIcon icon="fa-brands fa-youtube"/>`1.py`:

```sh
git checkout feature_branch_1
```

![Modifying <FontIcon icon="fa-brands fa-youtube"/>`1.py`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-268.png)

Now stage and commit:

```sh
git add 1.py
git commit -m  "Commit 16"
```

Your history should look like this:

![The history after introducing "Commit 16"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-270.png)

Say now you realize, you've made a mistake. You actually wanted <FontIcon icon="fas fa-code-branch"/>`feature_branch_2` to be born from the <FontIcon icon="fa-brands fa-code-branch"/>`main` branch, rather than from <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`.

How can you achieve that? 🤔

Try to think about it given the history graph and what you've learned about the `--onto` flag for the `rebase` command.

Well, you want to "replace" the parent of your first commit on <FontIcon icon="fas fa-code-branch"/>`feature_branch_2`, which is "Commit 14", to be on top of <FontIcon icon="fa-brands fa-code-branch"/>`main` branch, in this case, "Commit 12", rather than the beginning of <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`, in this case, "Commit 13". So again, you will be creating a *new base,* this time for the first commit on <FontIcon icon="fas fa-code-branch"/>`feature_branch_2`.

![You want to move around "Commit 14" and "Commit 15"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-271.png)

How would you do that?

First, switch to <FontIcon icon="fas fa-code-branch"/>`feature_branch_2`:

```sh
git checkout feature_branch_2
```

And now you can use:

```sh
git rebase -–onto main <SHA_OF_COMMIT_13>
```

As a result, you have <FontIcon icon="fas fa-code-branch"/>`feature_branch_2` based on <FontIcon icon="fa-brands fa-code-branch"/>`main` rather than <FontIcon icon="fas fa-code-branch"/>`feature_branch_1`:

![The commit history after performing rebase<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-272.png)

The syntax is of the command is:

```sh
git rebase --onto <NEW_PARENT> <OLD_PARENT>
```
