---
lang: en-US
title: "What is a Merge in Git?"
description: "Article(s) > (1/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
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
      content: "Article(s) > (1/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "What is a Merge in Git?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/what-is-a-merge-in-git.html
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
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-what-is-a-merge-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

Merging is the process of combining the recent changes from several branches into a single new commit that will be on all those branches.

In a way, merging is the complement of branching in version control: a branch allows you to work simultaneously with others on a particular set of files, whereas a merge allows you to later combine separate work on branches that diverged from a common ancestor commit.

OK, let's take this bit by bit.

Remember that in Git, [**a branch is just a name pointing to a single commit**](/freecodecamp.org/git-internals-objects-branches-create-repo/README.md). When we think about commits as being "on" a specific branch, they are actually reachable through the parent chain from the commit that the branch is pointing to.

That is, if you consider this commit graph:

![Commit graph with two pointers<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/ZS4stBVdDII&)>](https://freecodecamp.org/news/content/images/2023/04/image-140.png)

You see the branch <VPIcon icon="fas fa-code-branch"/>`feature_1`, which points to a commit with the SHA-1 value of `ba0d2`. Of course, as in other posts, I only write the first 5 digits of the SHA-1 value.

Notice that commit `54a9d` is also on this branch, as it is the parent commit of `ba0d2`. So if you start from the pointer of <VPIcon icon="fas fa-code-branch"/>`feature_1`, you get to `ba0d2`, which then points to `54a9d`.

When you merge with Git, you merge **commits**. Almost always, we merge two commits by referring to them with the branch names that point to them. Thus we say we "merge branches" - though under the hood, we actually merge commits.
