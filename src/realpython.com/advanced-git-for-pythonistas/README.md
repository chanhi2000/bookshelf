---
lang: en-US
title: "Advanced Git Tips for Python Developers"
description: "Article(s) > Advanced Git Tips for Python Developers"
icon: iconfont icon-git
category:
  - Git
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - git
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Advanced Git Tips for Python Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/
prev: /programming/git/articles/README.md
date: 2018-08-13
isOriginal: false
author:
  - name: Jim Anderson
    url : https://realpython.com/team/janderson/
cover: https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg
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

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, changing history, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

If you’ve done a little work in Git and are starting to understand the basics we covered in [**our introduction to Git**](/realpython.com/python-git-github-intro.md), but you want to learn to be more efficient and have more control, then this is the place for you!

In this tutorial, we’ll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, changing history, and how to clean up the mess if something doesn’t work out.

This article assumes you’ve worked through our first Git tutorial or at a minimum understand the basics of what Git is and how it works.

There’s a lot of ground to cover, so let’s get going.

```component VPCard
{
  "title": "Revision Selection",
  "desc": "(1/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/revision-selection.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Handling Interruptions: git stash",
  "desc": "(2/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/handling-interruptions-git-stash.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Comparing Revisions: git diff",
  "desc": "(3/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/comparing-revisions-git-diff.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "git difftool",
  "desc": "(4/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/git-difftool.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Changing History",
  "desc": "(5/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/changing-history.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Resolving Merge Conflicts",
  "desc": "(6/6) Advanced Git Tips for Python Developers",
  "link": "/realpython.com/advanced-git-for-pythonistas/resolving-merge-conflicts.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

You’ve covered a lot of ground in these tutorials, but there is so much more to Git. If you’d like to take a deeper dive into Git, I can recommend these resources:

- The Real Python Podcast [<FontIcon icon="fas fa-globe"/>Episode 179: Improving Your Git Developer Experience in Python](https://realpython.com/podcasts/rpp/179/) with Adam Johnson will help you become more efficient with the Git command line.
- The free, on-line, [<FontIcon icon="iconfont icon-git"/>Pro Git](https://git-scm.com/book/en/v2) is a very handy reference.
- For those of you who like to read on paper, there’s a print version of [<FontIcon icon="fas fa-globe"/>Pro Git](https://realpython.com/asins/1484200772/), and I found O’Reilly’s [<FontIcon icon="fas fa-globe"/>Version Control with Git](https://realpython.com/asins/1449316387/) to be useful when I read it.
- `--help` is useful for any of the subcommands you know. `git diff --help` produces almost 1000 lines of information. While portions of these are quite detailed, and some of them assume a deep knowledge of Git, reading the help for commands you use frequently can teach you new tricks on how to use them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Advanced Git Tips for Python Developers",
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, changing history, and how to clean up the mess if something doesn't work out.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
