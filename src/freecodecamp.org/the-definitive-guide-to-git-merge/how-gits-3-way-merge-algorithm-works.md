---
lang: en-US
title: "How Git's 3-way Merge Algorithm Works"
description: "Article(s) > (7/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
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
      content: "Article(s) > (7/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
    - property: og:description
      content: "How Git's 3-way Merge Algorithm Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/how-gits-3-way-merge-algorithm-works.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-how-gits-3-way-merge-algorithm-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

Get back to the state before applying this patch:

```sh
git reset --hard
```

You have now three versions: the merge base, which is "Commit 10", Paul's branch, and John's branch. In general terms, we can say these are the `merge base`, `commit A` and `commit B`. Notice that the `merge base` is by definition an ancestor of both `commit A` and `commit B`.

To perform the merge, Git looks at the diff between the three different versions of the file in question on these three revisions. In your case, it's the file <FontIcon icon="fa-brands fa-markdown"/>`everyone.md`, and the revisions are "Commit 10", Paul's branch – that is, "Commit 11", and John's branch, that is, "Commit 12".

Git makes the merging decision based on the status of each line in each of these versions.

![The three versions considered for the 3-way merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-291.png)

In case *not* all three versions match, that is a conflict. Git can resolve many of these conflicts automatically, as we will now see.

Let's consider specific lines.

The first lines here exist only on Paul's branch:

![Lines that appear on Paul's branch only<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-292.png)

This means that the state of John's branch is equal to the state of the merge base. So the 3-way merge goes with Paul's version.

In general, if the state of the merge base is the same as `A`, the algorithm goes with `B`. The reason is that since the merge base is the ancestor of both `A` and `B`, Git assumes that this line hasn't changed in `A`, and it *has* changed in `B`, which is the most recent version for that line, and should thus be taken into account.

![If the state of the merge base is the same as `A`, and this state is different from `B`, the algorithm goes with `B`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-353.png)

Next, you can see lines where all three versions agree – they exist on the merge base, `A` and `B`, with equal data.

![Lines where all three versions agree<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-294.png)

So the algorithm has a trivial choice – just take that version.

![In case all three versions agree, the algorithm goes with that single version<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-355.png)

In a previous example, we saw that if the merge base and `A` agree, and `B`'s version is different, the algorithm picks `B`. This works in the other direction too – for example, here you have a line that exists on John's branch, different than that on the merge base and Paul's branch.

![A line where Paul's version matches the merge base's version, and John has a different version<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-296.png)

Hence, John's version is chosen.

![If the state of the merge base is the same as `B`, and this state is different from `A`, the algorithm goes with `A`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-354.png)

Now consider another case, where both `A` and `B` agree on a line, but the value they agree upon is different from the `merge base` – both John and Paul agreed to change the line "Everyone put their feet down" to "Everyone put their foot down":

![A line where Paul's version matches the John's version; yet the merge base has a different version<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-297.png)

In this case, the algorithm picks the version on both `A` and `B`.

![In case `A` and `B` agree on a version which is different from the merge base's version, the algorithm picks the version on both `A` and `B`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-352.png)

Notice this is not a democratic vote. In the previous case, the algorithm picked the minority version, as it resembled the newest version of this line. In this case, it *happens to* pick the majority – but only because `A` and `B` are the revisions that agree on the new version.

The same would happen if we used `git merge`:

```sh
git merge john_branch_3
```

Without specifying any flags, `git merge` will default to using a 3-way merge.

![By default, `git merge` uses a 3-way merge algorithm<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-302.png)

The status of <FontIcon icon="fa-brands fa-markdown"/>`everyone.md` after running the command above would be the same as the result you achieved by applying the patches with `git apply -3`.

If you consider the history:

![Git's history after performing the merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-303.png)

You will see that the merge commit indeed has two parents: the first is "Commit 11", that is, where <FontIcon icon="fas fa-code-branch"/>`paul_branch_3` pointed to before the merge. The second is "Commit 12", where <FontIcon icon="fas fa-code-branch"/>`john_branch_3` pointed to, and still points to now.

What will happen if you now merge from <FontIcon icon="fas fa-code-branch"/>`main`? That is, switch to the main branch, which is pointing to "Commit 10":

```sh
git checkout main
```

And then merge Paul's branch?

```sh
git merge paul_branch_3
```

Indeed, a fast forward, as before running this command, <FontIcon icon="fas fa-code-branch"/>`main` was an ancestor of <FontIcon icon="fas fa-code-branch"/>`paul_branch_3`.

![A fast-forward merge<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-304.png)

So, this is a 3-way merge. In general, if all versions agree on a line, then this line is used. If `A` and the `merge base` match, and `B` has another version, `B` is taken. In the opposite case, where the `merge base` and `B` match, the `A` version is selected. If `A` and `B` match, this version is taken, whether the merge base agrees or not.

This description leaves one open question though: What happens in cases where all three versions disagree?

Well, that's a conflict that Git does not resolve automatically. In these cases, Git calls for a human's help.
