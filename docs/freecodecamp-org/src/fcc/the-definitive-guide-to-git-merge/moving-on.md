---
lang: en-US
title: "Moving on 👣"
description: "Article(s) > (5/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (5/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "Moving on 👣"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-definitive-guide-to-git-merge/moving-on.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-moving-on"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

Still, this was a simple case of a 3-way merge. John and Paul created different songs, so each of them touched a different file. It was pretty straightforward to execute the merge.

What about more interesting cases?

Let's assume that now John and Paul are co-authoring a new song.

So, John checkedout <VPIcon icon="fas fa-code-branch"/>`main` branch and started writing the song:

```sh
git checkout main
```

![John's new song<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-253.png)

He staged and committed it ("Commit 7"):

![John's new song is committed<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-254.png)

Now, Paul branches:

```sh
git checkout -b paul_branch_2
```

And edits the song, adding another verse:

![Paul added a new verse<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-255.png)

Of course, in the original song, we don't have the title "Paul's Verse", but I'll add it here for simplicity.

Paul stages and commits the changes:

```sh
git add a_day_in_the_life.md
git commit -m "Commit 8"
```

John also branches out from <VPIcon icon="fas fa-code-branch"/>`main` and adds a few last lines:

```sh
git checkout main
git checkout -b john_branch_2
```

![Paul committed, and now it's John's turn again<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-256.png)

![John added a few lines<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-257.png)
And he stages and commits his changes too ("Commit 9"):

![John committed his changes<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-258.png)

This is the resulting history:

![The history after John's last commit<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-350.png)

So, both Paul and John modified the same file on different branches. Will Git be successful in merging them? 🤔

Say now we don't go through `main,` but John will try to merge Paul's new branch into his branch:

```sh
git merge paul_branch_2
```

Wait!! 🤚🏻 Don't run this command! Why would you let Git do all the hard work? You are trying to understand the process here.

So, first, Git needs to find the merge base. Can you see which commit that would be?

Correct, it would be the last commit on <VPIcon icon="fas fa-code-branch"/>`main` branch, where the two diverged.

You can verify that by using:

```sh
git merge-base john_branch_2 paul_branch_2
```

![Finding the merge base<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-260.png)

Great, now Git should compute the diffs and generate the patches. You can observe the diffs directly:

```sh
git diff main paul_branch_2
```

![The output of `git diff main paul_branch_2`<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-261.png)

Will applying this patch succeed? Well, no problem, Git has all the context lines in place.

Ask Git to apply this patch:

```sh
git diff main paul_branch_2 > paul_branch_2.patch
git apply --index paul_branch_2.patch
```

And this worked, no problem at all.

Now, compute the diff between John's new branch and the merge base. Notice that you haven't committed the applied changes, so <VPIcon icon="fas fa-code-branch"/>`john_branch_2` still points at the same commit as before, "Commit 9":

```sh
git diff main john_branch_2
```

![The output of `git diff main john_branch_2`<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-262.png)

Will applying this diff work?

Well, indeed, yes. Notice that even though the line numbers have changed on the current version of the file, thanks to the context lines Git is able to locate where it needs to add these lines…

![Git can rely on the context lines<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-263.png)

Save this patch and apply it then:

```sh
git diff main john_branch_2 > john_branch_2.patch
git apply --index john_branch_2.patch
```

![Apply Paul's patch<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-264.png)

Observe the result file:

![The result after applying Paul's patch<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-265.png)

Cool, exactly what we wanted 👏🏻
You can now create the tree and relevant commit:

```sh
git write-tree
```

Don't forget to specify both parents:

```sh
git commit-tree -p paul_branch_2 -p john_branch_2 -m "Merging new changes"
```

![Creating a merge commit<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-266.png)

See how I used the branches names here? After all, they are just pointers to the commits we want.

Cool, look at the log from the new commit:

![The history after creating the merge commit<br/><Source [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII)>](https://freecodecamp.org/news/content/images/2023/04/image-270.png)

Exactly what we wanted.

You can also let Git perform the job for you. You can simply checkout <VPIcon icon="fas fa-code-branch"/>`john_branch_2`, which you haven't moved - so it still points to the same commit as it did before the merge. So all you need to do is run:

```sh
git merge paul_branch_2
```

Observe the resulting history:

![The history after letting Git perform the merge<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-271.png)

Just as before, you have a merge commit pointing to "Commit 8" and "Commit 9" as its parents. "Commit 9" is the first parent since you merged into it.

But this was still quite simple… John and Paul worked on the same file, but on very different parts. You could also directly apply Paul's changes to John's branch. If you go back to John's branch before the merge:

```sh
git reset --hard HEAD~
```

And now apply Paul's changes:

```sh
git apply --index paul_branch_2.patch
```

![Applying Paul's changes directly to John's branch<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-272.png)

You will get the same result.

But what happens when the two branches include changes on the same files, in the same locations? 🤔
