---
lang: en-US
title: "More Advanced Git Merge Cases"
description: "Article(s) > (6/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (6/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "More Advanced Git Merge Cases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-definitive-guide-to-git-merge/more-advanced-git-merge-cases.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-more-advanced-git-merge-cases"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

What would happen if John and Paul were to coordinate a new song, and work on it together?

In this case, John creates the first version of this song in the <VPIcon icon="fas fa-code-branch"/>`main` branch:

```sh
git checkout main
nano everyone.md
```

![The contents of `everyone.md` prior to the first commit<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-273.png)

By the way, this text is indeed taken from the version that John Lennon recorded for a demo in 1968. But this isn't an article about the Beatles, so if you're curious about the process the Beatles underwent while writing this song, you can follow the links in the appendix below.

```sh
git add everyone.md
git commit -m "Commit 10"
```

![Introducing "Commit 10"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-275.png)

Now John and Paul split. Paul creates a new verse in the beginning:

```sh
git checkout -b paul_branch_3
nano everyone.md
```

![Paul added a new verse in the beginning<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-276.png)

Also, while talking to John, they decided to change the word "feet" to "foot", so Paul adds this change as well.

And Paul adds and commits his changes to the repo:

```sh
git add everyone.md
git commit -m "Commit 11"
```

You can observe Paul's changes, by comparing this branch's state to the state of branch <VPIcon icon="fas fa-code-branch"/>`main`:

```sh
git diff main
```

![The output of `git diff main` from Paul's branch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-277.png)

Store this diff in a patch file:

```sh
git diff main > paul_3.patch
```

Now back to <VPIcon icon="fas fa-code-branch"/>`main`...

```sh
git checkout main
```

John decides to make another change, in his own new branch:

```sh
git checkout -b john_branch_3
```

And he replaces the line "Everyone had the boot in" with the line "Everyone had a wet dream". In addition, John changed the word "feet" to "foot", following his talk with Paul.

Observe the diff:

```sh
git diff main
```

![The output of `git diff main` from John's branch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-278.png)

Store this output as well:

```sh
git diff main > john_3.patch
```

Now, stage and commit:

```sh
git add everyone.md git commit -m "Commit 12"
```

This is our current history:

![The history after introducing "Commit 12"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-351.png)

Paul told John he added a new verse, so John would like to merge Paul's changes.

Can John simply apply Paul's patch?

Consider the patch again:

```sh
git diff main paul_branch_3
```

![The output of `git diff main paul_branch_3`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-277.png)

As you can see, this diff relies on the line "Everyone had the boot in", but this line no longer exists on John's branch. As a result, you could expect applying the patch to fail. Go on, give it a try:

```sh
git apply paul_3.patch
```

![Applying the patch failed<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-280.png)

Indeed, you can see that it failed.

But should it really fail? 🤔

As explained earlier, `git merge` uses a 3-way merge algorithm, and this can come in handy here. What would be the first step of this algorithm?

Well, first, Git would find the merge base - that is, the common ancestor of Paul's branch and John's branch. Consider the history:

![The history after introducing "Commit 12"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-351.png)

So the common ancestor of "Commit 11" and "Commit 12" is "Commit 10". We can verify this by running the command:

```sh
git merge-base john_branch_3 paul_branch_3
```

Now we can take the patches we generated from the diffs on both branches, and apply them to <VPIcon icon="fas fa-code-branch"/>`main`. Would that work?

First, try to apply John's patch, and then Paul's patch.

Consider the diff:

```sh
git diff main john_branch_3
```

![The output of `git diff main john_branch_3`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-278.png)

We can store it in a file:

```sh
git diff main john_branch_3 > john_3.patch
```

And I want to apply this patch on <VPIcon icon="fas fa-code-branch"/>`main`, so:

```sh
git checkout main git apply john_3.patch
```

Let's consider the result:

```sh
nano everyone.md
```

![The contents of `everyone.md` after applying John's patch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-282.png)

The line changed as expected. Nice 😎

Now, can Git apply Paul's patch? To remind you, this is the patch:

![The contents of Paul's patch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-283.png)

Well, Git **cannot** apply this patch, because this patch assumes that the line  "Everyone had the boot in" exists. Trying to apply is liable to fail:

```sh
git apply -v paul_3.branch
```

![Applying Paul's patch failed.](https://freecodecamp.org/news/content/images/2023/04/image-284.png)

What you tried to do now, applying Paul's patch on <VPIcon icon="fas fa-code-branch"/>`main` branch after applying John's patch, is the same as being on `john_branch_3`, and attempting to apply the patch, that is:

```sh
git checkout john_branch_3
git apply paul_3.patch
```

What would happen if we tried the other way around?

First, clean up the state:

```sh
git reset --hard
```

And start from Paul's branch:

```sh
git checkout paul_branch_3
```

Can we apply John's patch? As a reminder, this is the status of `everyone.md` on this branch:

![The contents of `everyone.md` on `paul_branch_3`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-285.png)

And this is John's patch:

![The contents of John's patch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-286.png)

Would applying John's patch work? 🤔 Try to answer yourself before reading on.

You can try:

```sh
git apply john_3.patch
```

![Git fails to apply John's patch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-287.png)

Well, no! Again, if you are not sure what happened, you can always ask `git apply` to be a bit more verbose:

```sh
git apply john_3.patch -v
```

![You can get more information by using the `-v` flag<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-288.png)

Git is looking for "Everyone put the feet down", but Paul has already changed this line so it now consists of the word "foot" instead of "feet". As a result, applying this patch fails.

Notice that changing the number of context lines here (that is, using `git apply` with the `-C` flag, as discussed in [**a previous post**](/freecodecamp.org/git-diff-and-patch.md)) is irrelevant - Git is unable to locate the actual line that the patch is trying to erase.

But actually, Git *can* make this work, if you just add a flag to `apply`, telling it to perform a 3-way merge under the hood:

```sh
git apply -3 john_3.patch
```

![Applying with `-3` flag succeeds<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-289.png)

And let's consider the result:

![The contents of `everyone.md` after ther merge<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-290.png)

Exactly what we wanted! You have Paul's verse (marked in the image above), and both of John's changes!

So, how was Git able to accomplish that?

Well, as I mentioned, Git really did **a 3-way merge**, and with this example, it will be a good time to dive into what this actually means.
