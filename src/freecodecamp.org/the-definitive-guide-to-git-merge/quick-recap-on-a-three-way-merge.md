---
lang: en-US
title: "Quick recap on a three-way merge"
description: "Article(s) > (4/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (4/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "Quick recap on a three-way merge"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/quick-recap-on-a-three-way-merge.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-quick-recap-on-a-three-way-merge"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

So to quickly recap, on a three-way merge, Git:

- First, locates the merge base - the common ancestor of the two branches. That is, the first commit that is reachable from both branches.
- Second, Git calculates two diffs - one diff from the merge base to the first branch, and another diff from the merge base to the second branch.
- Third, Git applies both patches to the merge base, using a 3-way merge algorithm. I haven't explained the 3-way merge yet, but I will elaborate on that later. The result is the state of the new, merge commit.

You can also understand why it's called a "3-way merge": Git merges three different states - that of the first branch, that of the second branch, and their common ancestor. In our previous example, <FontIcon icon="fas fa-code-branch"/>`main`, <FontIcon icon="fas fa-code-branch"/>`paul_branch`, and `Commit 4`.

This is unlike, say, the fast-forward examples we saw before. The fast-forward examples are actually a case of a **two**-way merge, as Git only compares two states - for example, where <FontIcon icon="fas fa-code-branch"/>`main` pointed to, and where `john_branch` pointed to.
