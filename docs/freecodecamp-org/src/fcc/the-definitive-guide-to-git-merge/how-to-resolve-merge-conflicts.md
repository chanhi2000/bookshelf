---
lang: en-US
title: "How to Resolve Merge Conflicts"
description: "Article(s) > (8/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (8/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "How to Resolve Merge Conflicts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-definitive-guide-to-git-merge/how-to-resolve-merge-conflicts.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-how-to-resolve-merge-conflicts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

By following so far, you should understand the basics of `git merge`, and how Git can automatically resolve some conflicts. You also understand what cases are automatically resolved.

Next, let's consider a more advanced case.

Say Paul and John keep working on this song.

Paul creates a new branch:

```sh
git checkout -b paul_branch_4
```

And he decides to add some "Yeah"s to the song, so he changes this verse as follows:

![Paul's additions<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-305.png)

So Paul stages and commits these changes:

```sh
git add everyone.md
git commit -m "Commit 13"
```

Paul also creates another song, <VPIcon icon="fa-brands fa-markdown"/>`let_it_be.md` and adds it to the repo:

```sh
git add let_it_be.md git commit -m "Commit 14"
```

This is the history:

![The history after Paul introduced "Commit 14"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-356.png)

Back to <VPIcon icon="fas fa-code-branch"/>`main`:

```sh
git checkout main
```

John also branches out:

```sh
git checkout -b john_branch_4
```

And John also works on the song "Everyone had a hard year", later to be called "I've got a feeling" (again, this is not an article about the Beatles, so I won't elaborate on it here. See the appendix if you are curious).

John decides to change all occurrences of "Everyone" to "Everybody":

![John changes al occurrences of "Everyone" to "Everybody"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-307.png)

He stages and commits this song to the repo:

```sh
git add everyone.md
git commit -m "Commit 15"
```

Nice. Now John also creates another song, <VPIcon icon="fa-brands fa-markdown"/>`across_the_universe.md`. He adds it to the repo as well:

```sh
git add across_the_universe.md
git commit -m "Commit 16"
```

Observe the history again:

![The history after John introduced "Commit 16"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-308.png)

You can see that the history diverges from <VPIcon icon="fas fa-code-branch"/>`main`, to two different branches - <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`, and <VPIcon icon="fas fa-code-branch"/>`john_branch_4`.

At this point, John would like to merge the changes introduced by Paul.

What is going to happen here?

Remember the changes introduced by Paul:

```sh
git diff main paul_branch_4
```

![The output of `git diff main paul_branch_4`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-309.png)

What do you think? Will merge work? 🤔

Try it out:

```sh
git merge paul_branch_4
```

![A merge conflict<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-311.png)

We have a conflict! 🥁

It seems that Git cannot merge these branches on its own. You can get an overview of the merge state, using `git status`:

![The output of `git status` right after the `merge` operation<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-310.png)

The changes that Git had no problem resolving are staged for commit. And there is a separate section for "unmerged paths" - these are files with conflicts that Git could not resolve on its own.

It's time to understand why and when these conflicts happen, how to resolve them, and also how Git handles them under the hood.
Alright then! I hope you are at least as excited as I am. 😇

Let's recall what we know about 3-way merges:

First, Git will look for the merge base - the common ancestor of <VPIcon icon="fas fa-code-branch"/>`john_branch_4` and <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`. Which commit would that be?

Correct, it would be the tip of <VPIcon icon="fas fa-code-branch"/>`main` branch, the commit in which we merged <VPIcon icon="fas fa-code-branch"/>`john_branch_3` into <VPIcon icon="fas fa-code-branch"/>`paul_branch_3`.

Again, if you are not sure, you can verify that by running:

```sh
git merge-base john_branch_4 paul_branch_4
```

And at the current state, `git status` knows which files are staged and which aren't.

Consider the process for each file, which is the same as the 3-way merge algorithm we considered per line, but on a file's level:

<VPIcon icon="fa-brands fa-markdown"/>`across_the_universe.md` exists on John's branch, but doesn't exist on the merge base or on Paul's branch. So Git chooses to include this file. Since you are already on John's branch and this file is included in the tip of this branch, it is not mentioned by `git status`.

<VPIcon icon="fa-brands fa-markdown"/>`let_it_be.md` exists on Paul's branch, but doesn't exist on the merge-base or John's branch. So `git merge` "chooses" to include it.

What about <VPIcon icon="fa-brands fa-markdown"/>`everyone.md`? Well, here we have three different states of this file: its state on the merge base, its state on John's branch, and its state on Paul's branch. While performing a `merge`, Git stores all of these versions on the **index**.

Let's observe that by looking directly at the index with the command `git ls-files`:

```sh
git ls-files -s --abbrev
```

![The output of `git ls-files -s --abbrev` after the merge operation<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-312.png)

You can see that <VPIcon icon="fa-brands fa-markdown"/>`everyone.md` has three different entries. Git assigns each version a number that represents the "stage" of the file, and this is a distinct property of an index entry, alongside the file's name and the mode bits (I covered the index in [a previous post (<VPIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/a-visualized-intro-to-git-internals-objects-and-branches-68df85864037)).

When there is no merge conflict regarding a file, its "stage" is `0`. This is indeed the state for <VPIcon icon="fa-brands fa-markdown"/>`across_the_universe.md`, and for <VPIcon icon="fa-brands fa-markdown"/>`let_it_be.md`.

On a conflict's state, we have:

* Stage `1` - which is the merge base.
* Stage `2` - which is "your" version. That is, the version of the file on the branch you are merging *into*. In our example, this would be <VPIcon icon="fas fa-code-branch"/>`john_branch_4`.
* Stage `3` - which is "their" version, also called the `MERGE_HEAD`. That is, the version on the branch you are merging (into the current branch). In our example, that is <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`.

To observe the file's contents in a specific stage, you can use a command I introduced in [a previous post (<VPIcon icon="fa-brands fa-medium"/>`swimm`)](https://medium.com/swimm/getting-hardcore-creating-a-repo-from-scratch-cc747edbb11c), `git cat-file`, and provide the blob's SHA:

```sh
git cat-file -p
```

![Using `git cat-file` to present the content of the file on John's branch, right from its state in the index<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-313.png)

And indeed, this is the content we expected - from John's branch, where the lines start with "Everybody" rather than "Everyone".

A nice trick that allows you to see the content quickly without providing the blob's SHA-1 value, is by using `git show`, like so:

```sh
git show ::everyone.md
```

For example, to get the content of the same version as with `git cat-file -p <BLOB_SHA_FOR_STAGE_2>`, you can write `git show :2:everyone.md`.

Git records the three states of the three commits into the index in this way at the start of the merge. It then follows the three-way merge algorithm to quickly resolve the simple cases:

In case all three stages match, then the selection is trivial.

If one side made a change while the other did nothing - that is, stage 1 matches stage 2, then we choose stage 3 - or vice versa. That's exactly what happened with <VPIcon icon="fa-brands fa-markdown"/>`let_it_be.md` and <VPIcon icon="fa-brands fa-markdown"/>`across_the_universe.md`.

In case of a deletion on the incoming branch, for example, and given there were no changes on the current branch, then we would see that stage 1 matches stage 2, but there is no stage 3. In this case, `git merge` removes the file for the merged version.

What's really cool here is that for matching, Git doesn't need the actual files. Rather, it can rely on the SHA-1 values of the corresponding blobs. This way, Git can easily detect the state a file is in.

![Git performs the same 3-way merge algorithm on a files level<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-352.png)

Cool, so for <VPIcon icon="fa-brands fa-markdown"/>`everyone.md` you have this special case - where stage 1, stage 2 and stage 3 are all different from one another. That is, they have different blob SHAs. It's time to go deeper and understand the merge conflict. 😊

One way to do that would be to simply use `git diff`. In [**a previous post**](/freecodecamp.org/git-diff-and-patch.md), we examined `git diff` in detail, and saw that it shows the differences between various combinations of the working tree, index or commits. 

But `git diff` also has a special mode for helping with merge conflicts:

`git diff`

![The output of `git diff` during a conflict<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-314.png)

This output may be confusing at first, but once you get used to it, it's pretty clear. Let's start by understanding it, and then see how you can resolve conflicts with other, more visual tools.

The conflicted section is separated by the "equal" marks (====), and marked with the corresponding branches. In this context, "ours" is the current branch. In this example, that would be <VPIcon icon="fas fa-code-branch"/>`john_branch_4`, the branch that `HEAD` was pointing to when we initiated the `git merge` command. "Theirs" is the `MERGE_HEAD`, the branch that we are merging in - in this case, <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`.

So `git diff` without any special flags shows changes between the working tree and the index, which in this case are the conflicts yet to be resolved. The output doesn't include staged changes, which is very convenient for resolving the conflict.

Time to resolve this manually. Fun!

So, why is this a conflict?

For Git, Paul and John made different changes to the same line, for a few lines. John changed it to one thing, and Paul changed it to another thing. Git cannot decide which one is correct.

This is not the case for the last lines, like the line that used to be "Everyone had a hard year" on the merge base. Paul hasn't changed this line, or the lines surrounding it, so its version on <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`, or "theirs" in our case, agrees with the merge_base. Yet John's version, "ours", is different. Thus `git merge` can easily decide to take this version.

But what about the conflicted lines?

In this case, I know what I want, and that is actually a combination of these lines. I want the lines to start with `Everybody`, following John's change, but also to include Paul's "yeah"s. So go ahead and create the desired version by editing <VPIcon icon="fa-brands fa-markdown"/>`everyone.md`:
`nano everyone.md`

![Editing the file manually to achieve the desired state<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-315.png)

To compare the result file to what you had in the branch prior to the merge, you can run:

```sh
git diff --ours
```

Similarly, if you wish to see how the result of the merge differs from the branch you merged into our branch, you can run:

```sh
git diff --theirs
```

You can even see how the result is different from both sides using:

```sh
git diff --base
```

Now you can stage the fixed version:

```sh
git add everyone.md
```

After staging, if you look at `git status`, you will see no conflicts:

![After staging the fixed version <VPIcon icon="fa-brands fa-markdown"/>`everyone.md`, there are no conflicts<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-316.png)

You can now simply use `git commit`, and Git will present you with a commit message containing details about the merge. You can modify it if you like, or leave it as is. Regardless of the commit message, Git will create a "merge commit" - that is, a commit with more than one parent. 

To validate that, consider the history:

![The history after completing the merge operation<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-317.png)

<VPIcon icon="fas fa-code-branch"/>`john_branch_4` now points to the new merge commit. The incoming branch, "theirs", in this case, <VPIcon icon="fas fa-code-branch"/>`paul_branch_4`, stays where it was.
