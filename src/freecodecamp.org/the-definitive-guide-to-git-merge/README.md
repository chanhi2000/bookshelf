---
lang: en-US
title: "The Git Merge Handbook – Definitive Guide to Merging in Git"
description: "Article(s) > The Git Merge Handbook – Definitive Guide to Merging in Git"
icon: iconfont icon-git
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
      content: "Article(s) > The Git Merge Handbook – Definitive Guide to Merging in Git"
    - property: og:description
      content: "The Git Merge Handbook – Definitive Guide to Merging in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/
prev: /programming/git/articles/README.md
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
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Merge Handbook – Definitive Guide to Merging in Git"
  desc="By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a..."
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

By reading this post, you are going to *really* understand `git merge`, one of the most common operations you'll perform in your Git repositories.

::: note Before we start

1. I also created two videos covering the contents of this post. If you wish to watch alongside reading, you can find them here ([<FontIcon icon="fa-brands fa-youtube"/>Part 1](https://youtu.be/ZS4stBVdDII) [<FontIcon icon="fa-brands fa-youtube"/>Part 2](https://youtu.be/BCNZ5Uxctuk&t=561s)).
2. I am working on a book about Git! Are you interested in reading the initial versions and providing feedback? Send me an email: [<FontIcon icon="fas fa-envelope"/>`gitting.things@gmail.com`](mailto://gitting.things@gmail.com)

:::

OK, are you ready?

```component VPCard
{
  "title": "What is a Merge in Git?",
  "desc": "(1/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/what-is-a-merge-in-git.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Time to Get Hands-on 🙌🏻",
  "desc": "(2/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/time-to-get-hands-on.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Time For a More Advanced Case",
  "desc": "(3/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/time-for-a-more-advanced-case.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Quick recap on a three-way merge",
  "desc": "(4/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/quick-recap-on-a-three-way-merge.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Moving on 👣",
  "desc": "(5/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/moving-on.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "More Advanced Git Merge Cases",
  "desc": "(6/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/more-advanced-git-merge-cases.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How Git's 3-way Merge Algorithm Works",
  "desc": "(7/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/how-gits-3-way-merge-algorithm-works.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Resolve Merge Conflicts",
  "desc": "(8/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/how-to-resolve-merge-conflicts.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Use VS Code to Resolve Conflicts",
  "desc": "(9/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/how-to-use-vs-code-to-resolve-conflicts.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "One More Powerful Tool 🪛",
  "desc": "(10/10) The Git Merge Handbook – Definitive Guide to Merging in Git",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/one-more-powerful-tool.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```


---

## Recap

In this guide, you got an extensive overview of merging with Git. You learned that merging is the process of combining the recent changes from several branches into a single new commit. The new commit has two parents – those commits which had been the tips of the branches that were merged.

We considered a simple, fast-forward merge, which is possible when one branch diverged from the base branch, and then just added commits on top of the base branch.

We then considered three-way merges, and explained the three-stage process:

- First, Git locates the merge base. As a reminder, this is the first commit that is reachable from both branches.
- Second, Git calculates two diffs – one diff from the merge base to the *first* branch, and another diff from the merge base to the *second* branch. Git generates patches based on those diffs.
- Third and last, Git applies both patches to the merge base using a 3-way merge algorithm. The result is the state of the new, merge commit.

We dove deeper into the process of a 3-way merge, whether at a file level or a hunk level. We considered when Git is able to rely on a 3-way merge to automatically resolve conflicts, and when it just can't.

You saw the output of `git diff` when we are in a conflicting state, and how to resolve conflicts either manually or with VS Code.

There is much more to be said about merges – different merge strategies, recursive merges, and so on. Yet, after this guide, you should have a robust understanding of what merge is, and what happens under the hood in the vast majority of cases.

---

## About the Author

::: info Omer Rosenbaum

- [<FontIcon icon="fas fa-globe"/>Swimm](https://swimm.io)’s Chief Technology Officer
- Cyber training expert and Founder of Checkpoint Security Academy.
- Author of [<FontIcon icon="fas fa-globe"/>Computer Networks (in Hebrew)](https://data.cyber.org.il/networks/networks.pdf)
- [Youtube (<FontIcon icon="fa-brands fa-youtube"/>`@BriefVid`)](https://youtube.com/BriefVid)
- [Linkedin (<FontIcon icon="fa-brands fa-linkedin"/>`omer-rosenbaum-034a08b9`)](https://linkedin.com/in/omer-rosenbaum-034a08b9)

:::

---

## Additional References

<SiteInfo
  name="Git Internals"
  desc="Share your videos with friends, family, and the world"
  url="http://youtube.com/playlist?list=PL9lx0DXCC4BNUby5H58y6s2TQVLadV8v7/"
  logo="https://youtube.com/s/desktop/26a583e4/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/fWMKue-WBok/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAJFjvSSg0N5cgiDN4FcpqAUzhBOw&days_since_epoch=20092"/>

```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

<SiteInfo
  name="Git UNDO — how to rewrite Git history with confidence"
  desc="As a developer, your work with Git all the time."
  url="https://medium.com/@Omer_Rosenbaum/git-undo-how-to-rewrite-git-history-with-confidence-d4452e2969c2/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:330/0*OopxPbiQh6rpTOi_.png"/>

```component VPCard
{
  "title": "Git - Advanced Merging",
  "desc": "Merging in Git is typically fairly easy. Since Git makes it easy to merge another branch multiple times, it means that you can have a very long lived branch but you can keep it up to date as you go, solving small conflicts often, rather than be surprised by one enormous conflict at the end of the series.",
  "link": "https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging/",
  "logo": "https://git-scm.com/favicon.ico",
  "background": "rgba(227,90,58,0.2)"
}

```

<SiteInfo
  name="Live to merge, merge to live..."
  desc="New features, version control best practices and stories about the Plastic SCM development."
  url="https://blog.plasticscm.com/2010/11/live-to-merge-merge-to-live.html/"
  logo="https://plasticscm.com/favicon.ico"
  preview="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPZeFbHXL2vZJRX0-VMHqREn4OKNiaO-YqlFLLZtCs8L10XF_aYMij6Rb-eAdFY36QKK7s5_djFPgbJQeuG0zJmLnusepq9AYx5wyM37BwzXVjg2HsHBwoQQb_37AVSgsFOyhaeA/w1200-h630-p-k-no-nu/ridetolive.jpg"/>

<SiteInfo
  name="Git Pocket Guide"
  desc="ChapterÂ7.ÂMerging Merging is the process of combining the recent changes from several branches into a single new commit that is on all those branches. Most often there are …  - Selection from Git Pocket Guide [Book]"
  url="https://oreilly.com/library/view/git-pocket-guide/9781449327507/ch07.html/"
  logo="https://oreilly.com/favicon.ico"
  preview="https://oreilly.com/library/cover/9781449327507/1200w630h/"/>

<SiteInfo
  name="How trees are made | Git from the Bottom Up"
  desc="Every commit holds a single tree, but how are trees made? We know that blobs are created by stuffing the contents of your files into blobs — and that trees own blobs — but we haven’t yet seen how the tree that holds the blob is made, or how that tree gets linked to its parent commit."
  url="https://jwiegley.github.io/git-from-the-bottom-up/1-Repository/4-how-trees-are-made.html"
  logo=""
  preview=""/>

---

## Appendix – Beatles-related resources

<SiteInfo
  name="I've Got A Feeling (song)"
  desc="“I’ve Got a Feeling” is a song by the English rock band the Beatles from their 1970 album Let It Be. It was recorded on 30 January 1969 during the..."
  url="https://the-paulmccartney-project.com/song/ive-got-a-feeling/"
  logo="https://the-paulmccartney-project.com/_images/favicon-16x16.png"
  preview="https://the-paulmccartney-project.com/_images/artworks/let-it-be/main.jpg"/>

<SiteInfo
  name="Did John Lennon or Paul McCartney Write the Classic 'A Day in the Life'?"
  desc="'A Day in the Life' has been called the greatest Beatles song of all time. Here's which half of the Lennon-McCartney team was mostly behind it."
  url="https://cheatsheet.com/entertainment/did-john-lennon-or-paul-mccartney-write-the-classic-a-day-in-the-life.html/"
  logo="https://cheatsheet.com/wp-content/uploads/2021/09/favicon.png"
  preview="https://cheatsheet.com/wp-content/uploads/2019/05/beatles-sgt-peppers.jpg?w=1200"/>

<SiteInfo
  name="I've Got a Feeling Lyrics"
  desc="by John Lennon and Paul McCartney As Recorded by John Lennon (Demo 1968) Everyone had a hard year Everyone had a good time Everyone had the ..."
  url="http://lifeofthebeatles.blogspot.com/2009/06/ive-got-feeling-lyrics.html/"
  logo="https://lifeofthebeatles.blogspot.com/favicon.ico"
  preview="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOxxSZa3vJfGXT_CZ7RGP9YpWjRK72Sb-E4elsMn5Bm2U4QdJct-oBhnq2FWx3WbluFLHF-J7fcM_Lfkus6lbC_1KvmRpcvePqDmuvdfwV9CYx9x9QWznGsKO5vsk6BC0GuWmV/w1200-h630-p-k-no-nu/feeling1.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Git Merge Handbook – Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
