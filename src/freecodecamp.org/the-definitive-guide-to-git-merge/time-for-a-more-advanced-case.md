---
lang: en-US
title: "Time For a More Advanced Case"
description: "Article(s) > (3/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (3/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "Time For a More Advanced Case"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/time-for-a-more-advanced-case.html
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
  "title": "The Git Merge Handbook - Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Merge Handbook - Definitive Guide to Merging in Git"
  desc="By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a..."
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-time-for-a-more-advanced-case"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

Time to consider a more advanced case, which is probably the most common case where we use `git merge` explicitly - where you need to merge branches that *did* diverge from one another.

Assume we have two people working on this repo now, John and Paul.

John created a branch:

```sh
git checkout -b john_branch
```

![A new branch, `john_branch`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-348.png)

And John has written a new song in a new file, `lucy_in_the_sky_with_diamonds.md`. Well, I believe John Lennon didn't really write in Markdown format, or use Git for that matter, but let's pretend he did for this explanation.

```sh
git add lucy_in_the_sky_with_diamonds.md
git commit -m "Commit 5"
```

While John was working on this song, Paul was also writing, on another branch. Paul had started from <FontIcon icon="fas fa-code-branch"/>`main`:

```sh
git checkout main
```

And created his own branch:

```sh
git checkout -b paul_branch
```

And Paul wrote his song into a file:

```sh
nano penny_lane.md
```

And committed it:

```sh
git add penny_lane.md
git commit -m "Commit 6"
```

So now our history looks like this - where we have two different branches, branching out from <FontIcon icon="fas fa-code-branch"/>`main`, with different histories.

![The output of `git log` shows the history after John and Paul committed<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-203.png)

John is happy with his branch (that is, his song), so he decides to merge it into the <FontIcon icon="fas fa-code-branch"/>`main` branch:

```sh
git checkout main
git merge john_branch
```

Actually, this is a fast-forward merge, as we have learned before. You can validate that by looking at the history (using `git lol`, for example):

![Merging `john_branch` into <FontIcon icon="fas fa-code-branch"/>`main` results in a fast-forwrad merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-349.png)

At this point, Paul also wants to merge his branch into <FontIcon icon="fas fa-code-branch"/>`main`, but now a fast-forward merge is no longer relevant - there are two *different* histories here: the history of <FontIcon icon="fas fa-code-branch"/>`main`'s and that of <FontIcon icon="fas fa-code-branch"/>`paul_branch`'s. It's not that <FontIcon icon="fas fa-code-branch"/>`paul_branch` only adds commits on top of <FontIcon icon="fas fa-code-branch"/>`main` branch or vice versa.

Now things get interesting. 😎😎

First, let Git do the hard work for you. After that, we will understand what's actually happening under the hood.

```sh
git merge paul_branch
```

Consider the history now:

![When you merge <FontIcon icon="fas fa-code-branch"/>`paul_branch`, you get a new merge commit<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-206.png)

What you have is a new commit, with two parents - "Commit 5" and "Commit 6". In the working dir, you can see that both John's song as well as Paul's song are there: `ls`

![The working dir after the merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-242.png)

Nice, Git really did merge the changes for us. But how does that happen?

Undo this last commit:

```sh
git reset --hard HEAD~
```

---

## How to perform a three-way merge in Git

It's time to understand what's really happening under the hood. 😎

What Git has done here is it called a `3-way merge`. In outlining the process of a 3-way merge, I will use the term "branch" for simplicity, but you should remember you could also merge two (or more) commits that are not referenced by a branch.

The 3-way merge process includes these stages:

First, Git locates the common ancestor of the two branches. That is, the common commit from which the merging branches most recently diverged. Technically, this is actually the first commit that is reachable from both branches. This commit is then called the **merge base**.

Second, Git calculates two diffs - one diff from the merge base to the first branch, and another diff from the merge base to the second branch. Git generates patches based on those diffs.

Third, Git applies both patches to the merge base using a 3-way merge algorithm. The result is the state of the new, merge commit.

![The three steps of the 3-way merge algorithm: (1) locate the common ancestor; (2) calculate diffs from the merge base to the first branch, and from the merge base to the second branch; (3) apply both patches together<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-357.png)

So, back to our example.

In the first step, Git looks from both branches - <FontIcon icon="fas fa-code-branch"/>`main` and <FontIcon icon="fas fa-code-branch"/>`paul_branch` - and traverses the history to find the first commit that is reachable from both. In this case, this would be...which commit?

Correct, "Commit 4".

If you are not sure, you can always ask Git directly:

```sh
git merge-base main paul_branch
```

By the way, this is the most common and simple case, where we have a single obvious choice for the merge base. In more complicated cases, there may be multiple possibilities for a merge base, but this is a topic for another post.

In the second step, Git calculates the diffs. So it first calculates the diff between "Commit 4" and "Commit 5":

```sh
git diff 4f90a62 4683aef
```

(The SHA-1 values will be different on your machine)

![The diff between "Commit 4" and "Commit 5"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-247.png)

If you don't feel comfortable with the output of `git diff`, please read [the previous post](https://freecodecamp.org/news/git-diff-and-patch/) where I described it in detail.

You can store that diff to a file:

```sh
git diff 4f90a62 4683aef > john_branch_diff.patch
```

Next, Git calculates the diff between "Commit 4" and "Commit 6":

```sh
git diff 4f90a62 c5e4951
```

![The diff between "Commit 4" and "Commit 6"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-249.png)

Write this one to a file as well:

```sh
git diff 4f90a62 c5e4951 > paul_branch_diff.patch
```

Now Git applies those patches on the merge base.

First, try that out directly - just apply the patches (I will walk you through it in a moment). This is *not* what Git really does under the hood, but it will help you gain a better understanding of why Git needs to do something different.

Checkout the merge base first, that is, "Commit 4":

```sh
git checkout 4f90a62
```

And apply John's patch first:

```sh
git apply --index john_branch_diff.patch
```

Notice that for now there is no merge commit. `git apply` updates the working dir as well as the index, as we used the `--index` switch.

You can observe the status using `git status`:

![Applying John's patch on "Commit 4"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-250.png)

So now John's new song is incorporated into the index. Apply the other patch:

`git apply --index paul_branch_diff.patch`

As a result, the index contains changes from both branches.

Now it's time to commit your merge. Since the porcelain command `git commit` always generates a commit with a *single* parent, you would need the underlying plumbing command - `git commit-tree`.

If you need a reminder about porcelain vs plumbing commands, check out [the post where I explained these terms, and created an entire repo from scratch (<FontIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/getting-hardcore-creating-a-repo-from-scratch-cc747edbb11c).

Remember that [every Git commit object points to a single tree (<FontIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/a-visualized-intro-to-git-internals-objects-and-branches-68df85864037). So you need to record the contents of the index in a tree:

```sh
git write-tree
```

Now you get the SHA-1 value of the created tree, and you can create a commit object using `git commit-tree`:

```sh
git commit-tree <TREE_SHA> -p <COMMIT_4> -p <COMMIT_5> -m "Merge commit!"
```

![Creating a merge commit<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-251.png)

Great, so you have created a commit object 💪🏻

Recall that `git merge` also changes `HEAD` to point to the new merge commit object. So you can simply do the same: `git reset --hard db315a`

If you look at the history now:

![The history after creating a merge commit and resetting `HEAD`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-252.png)

You can see that you've reached the same result as the merge done by Git, with the exception of the timestamp and thus the SHA-1 value, of course.

So you got to merge both the **contents** of the two commits - that is, the state of the files, and also the **history** of those commits - by creating a merge commit that points to both histories.

In this simple case, you could actually just apply the patches using `git apply`, and everything worked quite well.
